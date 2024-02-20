abstract type GradMode end

struct NaiveAD <: GradMode end
struct GeomSum <: GradMode end
struct ManualIter <: GradMode end
struct LinSolve <: GradMode end

# Algorithm struct containing parameters for PEPS optimization
# TODO: have an interface for general cost functions? (could merge energyfun and reuse_env)
@kwdef struct PEPSOptimize{G<:GradMode}
    optimizer::OptimKit.OptimizationAlgorithm = LBFGS(
        4; maxiter=100, gradtol=1e-4, verbosity=2
    )
    energyfun::Function = next_neighbor_energy  # Energy function returning real scalar
    reuse_env::Bool = true  # Reuse environment of previous optimization as initial guess for next
    fpgrad_tol::Float64 = Defaults.grad_tol  # Convergence tolerance for gradient FP iteration
    fpgrad_maxiter::Int = Defaults.grad_maxiter  # Maximal number  of FP iterations
    verbose::Int = 0
end

# Find ground-state PEPS, environment and energy
function groundsearch(
    H, ctmalg::CTMRG, optalg::PEPSOptimize, ψinit::InfinitePEPS, envinit::CTMRGEnv
)
    (peps₀, env₀), E₀, ∂E, info = optimize(
        x -> ctmrg_gradient(x, H, ctmalg, optalg),
        (ψinit, envinit),
        optalg.optimizer;
        inner=my_inner,
        retract=my_retract,
        (add!)=my_add!,
        (scale!)=my_scale!,
    )
    return (; peps₀, env₀, E₀, ∂E, info)
end

# Function returning energy and CTMRG gradient for each optimization step
function ctmrg_gradient(x, H, ctmalg::CTMRG, optalg::PEPSOptimize)
    peps, env = x
    cfun = optalg.reuse_env ? costfun! : costfun
    E = cfun(peps, env, H, ctmalg, optalg)
    ∂E∂A = gradient(cfun, peps, env, H, ctmalg, optalg)[1]
    @assert !isnan(norm(∂E∂A))
    return E, ∂E∂A
end

# Energy cost function with proper backwards rule depending only on final CTMRG fixed-point
# Mutates environment to reuse previous environments in optimization
function costfun!(peps, env, H, ctmalg::CTMRG, optalg::PEPSOptimize)
    env′ = leading_boundary(peps, ctmalg, env)
    @diffset env = env′
    return optalg.energyfun(peps, env′, H)
end

# Non-mutating version, recomputing environment from random initial guess in every optimization step
function costfun(peps, env, H, ctmalg::CTMRG, optalg::PEPSOptimize)
    env′ = deepcopy(env)  # Create copy to make non-mutating
    return costfun!(peps, env′, H, ctmalg, optalg)
end

# Energy gradient backwards rule (does not apply to NaiveAD gradient mode)
function ChainRulesCore.rrule(
    ::typeof(costfun!), peps, env, H, ctmalg::CTMRG, optalg::PEPSOptimize{G}
) where {G<:Union{GeomSum,ManualIter,LinSolve}}
    env = leading_boundary(peps, env, ctmalg)
    E, Egrad = withgradient(optalg.energyfun, peps, env, H)
    ∂F∂x = CTMRGEnv(Egrad[2]...)
    _, xvjp = pullback(ctmrg_gauged_iter, peps, env, ctmalg)
    ∂f∂A(v) = xvjp(v)[1]
    ∂f∂x(v) = CTMRGEnv(xvjp(v)[2]...)  # Function wrapper to compute v*∂f∂A vJP as CTMRGEnv

    function costfun!_pullback(_)
        y₀ = CTMRGEnv(peps, dim(space(env.edges[1])[1]))
        dx, = fpgrad(∂F∂x, ∂f∂x, ∂f∂A, y₀, optalg)
        return NoTangent(), Egrad[1] + dx, NoTangent(), NoTangent(), NoTangent()
    end

    return E, costfun!_pullback
end

# Contraction of CTMRGEnv and PEPS tensors with open physical bonds
function one_site_rho(peps::InfinitePEPS, env::CTMRGEnv{C,T}) where {C,T}
    ρunitcell = similar(peps.A, tensormaptype(spacetype(C), 1, 1, storagetype(C)))

    for r in size(env.corners, 2), c in size(env.corners, 3)
        @tensor ρ[-1; -2] :=
            env.corners[NORTHWEST, r, c][1; 2] *
            env.edges[NORTH, r, c][2 3 4; 5] *
            env.corners[NORTHEAST, r, c][5; 6] *
            env.edges[EAST, r, c][6 7 8; 9] *
            env.corners[SOUTHEAST, r, c][9; 10] *
            env.edges[SOUTH, r, c][10 11 12; 13] *
            env.corners[SOUTHWEST, r, c][13; 14] *
            env.edges[WEST, r, c][14 15 16; 1] *
            peps[r, c][-1; 3 7 11 15] *
            conj(peps[r, c][-2; 4 8 12 16])
        @diffset ρunitcell[r, c] = ρ
    end

    return ρunitcell
end

# Horizontally extended contraction of CTMRGEnv and PEPS tensors with open physical bonds
function two_site_rho(peps::InfinitePEPS, env::CTMRGEnv{C,T}) where {C,T}
    ρunitcell = similar(peps.A, tensormaptype(spacetype(C), 2, 2, storagetype(C)))

    for r in size(env.corners, 2), c in size(env.corners, 3)
        cnext = _next(c, size(peps, 2))
        @tensor ρ[-11 -20; -12 -18] :=
            env.corners[NORTHWEST, r, c][1; 3] *
            env.edges[NORTH, r, c][3 5 8; 13] *
            env.edges[NORTH, r, cnext][13 16 22; 23] *
            env.corners[NORTHEAST, r, cnext][23; 24] *
            env.edges[EAST, r, cnext][24 25 26; 27] *
            env.corners[SOUTHEAST, r, cnext][27; 28] *
            env.edges[SOUTH, r, cnext][28 17 21; 14] *
            env.edges[SOUTH, r, c][14 6 10; 4] *
            env.corners[SOUTHWEST, r, c][4; 2] *
            env.edges[WEST, r, c][2 7 9; 1] *
            peps[r, c][-12; 5 15 6 7] *
            conj(peps[r, c][-11; 8 19 10 9]) *
            peps[r, cnext][-18; 16 25 17 15] *
            conj(peps[r, cnext][-20; 22 26 21 19])
        @diffset ρunitcell[r, c] = ρ
    end

    return ρunitcell
end

# 1-site operator expectation values on unit cell
function MPSKit.expectation_value(
    peps::InfinitePEPS, env::CTMRGEnv, op::AbstractTensorMap{S,1,1}
) where {S<:ElementarySpace}
    result = similar(peps.A, eltype(op))
    ρ = one_site_rho(peps, env)

    for r in 1:size(peps, 1), c in 1:size(peps, 2)
        o = @tensor ρ[r, c][1; 2] * op[1; 2]
        n = @tensor ρ[r, c][1; 1]
        @diffset result[r, c] = o / n
    end

    return result
end

# 2-site operator expectation values on unit cell
function MPSKit.expectation_value(
    peps::InfinitePEPS, env::CTMRGEnv, op::AbstractTensorMap{S,2,2}
) where {S<:ElementarySpace}
    result = similar(peps.A, eltype(op))
    ρ = two_site_rho(peps, env)

    for r in 1:size(peps, 1), c in 1:size(peps, 2)
        o = @tensor ρ[r, c][1 2; 3 4] * op[1 2; 3 4]
        n = @tensor ρ[r, c][1 2; 1 2]
        @diffset result[r, c] = o / n
    end

    return result
end

# ⟨H⟩ from vertical and horizontal next-neighbor contributions
function next_neighbor_energy(
    peps::InfinitePEPS, env::CTMRGEnv, H::AbstractTensorMap{S,2,2}
) where {S<:ElementarySpace}
    Eh = sum(expectation_value(peps, env, H))
    Ev = sum(expectation_value(rotl90(peps), rotl90(env), H))
    return real(Eh + Ev)
end

# Compute energy and energy gradient, by explicitly evaluating geometric series
function fpgrad(∂F∂x, ∂f∂x, ∂f∂A, _, alg::PEPSOptimize{GeomSum})
    g = ∂F∂x
    dx = ∂f∂A(g)  # n=0 term: ∂F∂x ∂f∂A
    err = 0.0
    for i in 1:(alg.maxiter)
        updateenv!(g, ∂f∂x(g))
        Σₙ = ∂f∂A(g)
        dx += Σₙ
        err = norm(Σₙ)  # TODO: normalize this error?
        alg.verbose && @show err
        err < alg.tol && break

        if i == alg.maxiter
            @warn "gradient fixed-point iteration reached maximal number of iterations at ‖Σₙ‖ = $(norm(Σₙ))"
        end
    end
    return dx, err
end

# Manual iteration to solve gradient linear problem
function fpgrad(∂F∂x, ∂f∂x, ∂f∂A, y₀, alg::PEPSOptimize{ManualIter})
    y = deepcopy(y₀)  # Do not mutate y₀
    err = 0.0
    for i in 1:(alg.maxiter)
        y′ = ∂F∂x + ∂f∂x(y)
        norma = norm(y.corners[NORTHWEST])
        err = norm(y′.corners[NORTHWEST] - y.corners[NORTHWEST]) / norma  # Normalize error to get comparable convergence tolerance
        alg.verbose && @show err
        updateenv!(y, y′)
        err < alg.tol && break

        if i == alg.maxiter
            @warn "gradient fixed-point iteration reached maximal number of iterations at ‖Cᵢ₊₁ - Cᵢ‖ = $err"
        end
    end
    return ∂f∂A(y), err
end

# Use proper iterative solver to solve gradient problem
function fpgrad(∂F∂x, ∂f∂x, ∂f∂A, y₀, alg::PEPSOptimize)
    # spaces = [space.(getfield(∂F∂x, f)) for f in fieldnames(CTMRGEnv)]
    # sizes = [map(x -> size(x.data), getfield(∂F∂x, f)) for f in fieldnames(CTMRGEnv)]
    # op = LinearMap(vecdim(∂F∂x)) do v
    #     env = unvec(v, spaces..., sizes...)
    #     x = env - ∂f∂x(env)
    #     vec(x)
    # end
    # envvec = vec(y₀)
    # info = gmres!(envvec, op, vec(∂F∂x); reltol=alg.grad_convtol, maxiter=alg.grad_maxiter)
    # y = unvec(envvec, spaces..., sizes...)

    # ∂f∂A(y), info
end

# Update PEPS unit cell in non-mutating way
function my_retract(x, dx, α)
    peps = deepcopy(x[1])
    peps.A .+= dx.A .* α
    env = deepcopy(x[2])
    return (peps, env), dx
end

# Take real valued part of standard dot product
my_inner(_, η₁, η₂) = real(dot(η₁, η₂))

# Add unit cell elements element-wise
function my_add!(Y, X, a)
    Y.A .+= X.A .* a
    return Y
end

# Scale all unit cell elements
function my_scale!(η, β)
    rmul!(η.A, β)
    return η
end

# my_retract is not an in place function which should not change x
# function my_retract(x, dx, α::Number)
#     (ϕ, env0) = x
#     ψ = deepcopy(ϕ)
#     env = deepcopy(env0)
#     ψ.A .+= dx.A .* α
#     #env = leading_boundary(ψ, alg_ctm,env)
#     return (ψ, env), dx
# end

# my_inner(x, dx1, dx2) = real(dot(dx1, dx2))
