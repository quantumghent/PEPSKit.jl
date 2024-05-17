var documenterSearchIndex = {"docs":
[{"location":"lib/lib/#Library","page":"Library","title":"Library","text":"","category":"section"},{"location":"lib/lib/","page":"Library","title":"Library","text":"Modules = [PEPSKit, PEPSKit.Defaults]\nFilter = t -> !(t in [PEPSKit.PEPS_∂∂AC, PEPSKit.PEPS_∂∂C, PEPSKit.PEPO_∂∂AC, PEPSKit.PEPO_∂∂C])","category":"page"},{"location":"lib/lib/#PEPSKit.AbstractPEPO","page":"Library","title":"PEPSKit.AbstractPEPO","text":"abstract type AbstractPEPO end\n\nAbstract supertype for a 2D projected entangled-pair operator.\n\n\n\n\n\n","category":"type"},{"location":"lib/lib/#PEPSKit.AbstractPEPS","page":"Library","title":"PEPSKit.AbstractPEPS","text":"abstract type AbstractPEPS end\n\nAbstract supertype for a 2D projected entangled-pair state.\n\n\n\n\n\n","category":"type"},{"location":"lib/lib/#PEPSKit.CTMRG","page":"Library","title":"PEPSKit.CTMRG","text":"struct CTMRG(; trscheme = TensorKit.notrunc(), tol = Defaults.ctmrg_tol,\n             maxiter = Defaults.ctmrg_maxiter, miniter = Defaults.ctmrg_miniter,\n             verbosity = 0, fixedspace = false)\n\nAlgorithm struct that represents the CTMRG algorithm for contracting infinite PEPS. The projector bond dimensions are set via trscheme which controls the truncation properties inside of TensorKit.tsvd. Each CTMRG run is converged up to tol where the singular value convergence of the corners as well as the norm is checked. The maximal and minimal number of CTMRG iterations is set with maxiter and miniter. Different levels of output information are printed depending on verbosity (0, 1 or 2). Regardless of the truncation scheme, the space can be kept fixed with fixedspace.\n\n\n\n\n\n","category":"type"},{"location":"lib/lib/#PEPSKit.CTMRGEnv","page":"Library","title":"PEPSKit.CTMRGEnv","text":"struct CTMRGEnv{C,T}\n\nCorner transfer-matrix environment containing unit-cell arrays of corner and edge tensors.\n\n\n\n\n\n","category":"type"},{"location":"lib/lib/#PEPSKit.CTMRGEnv-Union{Tuple{InfinitePEPS{P}}, Tuple{P}} where P","page":"Library","title":"PEPSKit.CTMRGEnv","text":"CTMRGEnv(peps::InfinitePEPS{P}; Venv=oneunit(spacetype(P)))\n\nCreate a random CTMRG environment from a PEPS tensor. The environment bond dimension defaults to one and can be specified using the Venv space.\n\n\n\n\n\n","category":"method"},{"location":"lib/lib/#PEPSKit.GeomSum","page":"Library","title":"PEPSKit.GeomSum","text":"struct GeomSum <: GradMode\n\nGradient mode for CTMRG using explicit evaluation of the geometric sum.\n\n\n\n\n\n","category":"type"},{"location":"lib/lib/#PEPSKit.InfinitePEPO","page":"Library","title":"PEPSKit.InfinitePEPO","text":"struct InfinitePEPO{T<:PEPOTensor}\n\nRepresents an infinite projected entangled-pair operator (PEPO) on a 3D cubic lattice.\n\n\n\n\n\n","category":"type"},{"location":"lib/lib/#PEPSKit.InfinitePEPO-Tuple{T} where T<:(TensorKit.AbstractTensorMap{S, 2, 4} where S<:TensorKit.ElementarySpace)","page":"Library","title":"PEPSKit.InfinitePEPO","text":"InfinitePEPO(A; unitcell=(1, 1, 1))\n\nCreate an InfinitePEPO by specifying a tensor and unit cell.\n\n\n\n\n\n","category":"method"},{"location":"lib/lib/#PEPSKit.InfinitePEPO-Union{Tuple{AbstractArray{T, 3}}, Tuple{T}} where T<:(TensorKit.AbstractTensorMap{S, 2, 4} where S<:TensorKit.ElementarySpace)","page":"Library","title":"PEPSKit.InfinitePEPO","text":"InfinitePEPO(A::AbstractArray{T, 3})\n\nAllow users to pass in an array of tensors.\n\n\n\n\n\n","category":"method"},{"location":"lib/lib/#PEPSKit.InfinitePEPO-Union{Tuple{A}, Tuple{A, A}, Tuple{A, A, A}} where A<:(AbstractArray{<:TensorKit.ElementarySpace, 3})","page":"Library","title":"PEPSKit.InfinitePEPO","text":"InfinitePEPO(f=randn, T=ComplexF64, Pspaces, Nspaces, Espaces)\n\nAllow users to pass in arrays of spaces.\n\n\n\n\n\n","category":"method"},{"location":"lib/lib/#PEPSKit.InfinitePEPO-Union{Tuple{S}, Tuple{S, S}, Tuple{S, S, S}} where S<:TensorKit.ElementarySpace","page":"Library","title":"PEPSKit.InfinitePEPO","text":"InfinitePEPO(f=randn, T=ComplexF64, Pspace, Nspace, [Espace]; unitcell=(1,1,1))\n\nCreate an InfinitePEPO by specifying its spaces and unit cell.\n\n\n\n\n\n","category":"method"},{"location":"lib/lib/#PEPSKit.InfinitePEPS","page":"Library","title":"PEPSKit.InfinitePEPS","text":"struct InfinitePEPS{T<:PEPSTensor}\n\nRepresents an infinite projected entangled-pair state on a 2D square lattice.\n\n\n\n\n\n","category":"type"},{"location":"lib/lib/#PEPSKit.InfinitePEPS-Tuple{T} where T<:(TensorKit.AbstractTensorMap{S, 1, 4} where S<:TensorKit.ElementarySpace)","page":"Library","title":"PEPSKit.InfinitePEPS","text":"InfinitePEPS(A; unitcell=(1, 1))\n\nCreate an InfinitePEPS by specifying a tensor and unit cell.\n\n\n\n\n\n","category":"method"},{"location":"lib/lib/#PEPSKit.InfinitePEPS-Union{Tuple{AbstractMatrix{T}}, Tuple{T}} where T<:(TensorKit.AbstractTensorMap{S, 1, 4} where S<:TensorKit.ElementarySpace)","page":"Library","title":"PEPSKit.InfinitePEPS","text":"InfinitePEPS(A::AbstractArray{T, 2})\n\nAllow users to pass in an array of tensors.\n\n\n\n\n\n","category":"method"},{"location":"lib/lib/#PEPSKit.InfinitePEPS-Union{Tuple{A}, Tuple{A, A, A}} where A<:(AbstractMatrix{<:Union{Int64, TensorKit.ElementarySpace}})","page":"Library","title":"PEPSKit.InfinitePEPS","text":"InfinitePEPS(f=randn, T=ComplexF64, Pspaces, Nspaces, Espaces)\n\nAllow users to pass in arrays of spaces.\n\n\n\n\n\n","category":"method"},{"location":"lib/lib/#PEPSKit.InfinitePEPS-Union{Tuple{S}, Tuple{S, S}, Tuple{S, S, S}} where S<:Union{Int64, TensorKit.ElementarySpace}","page":"Library","title":"PEPSKit.InfinitePEPS","text":"InfinitePEPS(f=randn, T=ComplexF64, Pspace, Nspace, [Espace]; unitcell=(1,1))\n\nCreate an InfinitePEPS by specifying its spaces and unit cell. Spaces can be specified either via Int or via ElementarySpace.\n\n\n\n\n\n","category":"method"},{"location":"lib/lib/#PEPSKit.InfiniteTransferPEPO","page":"Library","title":"PEPSKit.InfiniteTransferPEPO","text":"InfiniteTransferPEPO{T,O}\n\nRepresents an infinite transfer operator corresponding to a single row of a partition function which corresponds to the expectation value of an InfinitePEPO between 'ket' and 'bra' InfinitePEPS states.\n\n\n\n\n\n","category":"type"},{"location":"lib/lib/#PEPSKit.InfiniteTransferPEPO-Tuple{InfinitePEPS, InfinitePEPO, Any, Any}","page":"Library","title":"PEPSKit.InfiniteTransferPEPO","text":"InfiniteTransferPEPO(T::InfinitePEPS, O::InfinitePEPO, dir, row)\n\nConstructs a transfer operator corresponding to a single row of a partition function representing the expectation value of O for the state T. The partition function is first rotated such that the direction dir faces north, after which its rowth row from the north is selected.\n\n\n\n\n\n","category":"method"},{"location":"lib/lib/#PEPSKit.InfiniteTransferPEPS","page":"Library","title":"PEPSKit.InfiniteTransferPEPS","text":"InfiniteTransferPEPS{T}\n\nRepresents an infinite transfer operator corresponding to a single row of a partition function which corresponds to the overlap between 'ket' and 'bra' InfinitePEPS states.\n\n\n\n\n\n","category":"type"},{"location":"lib/lib/#PEPSKit.InfiniteTransferPEPS-Tuple{InfinitePEPS, Any, Any}","page":"Library","title":"PEPSKit.InfiniteTransferPEPS","text":"InfiniteTransferPEPS(T::InfinitePEPS, dir, row)\n\nConstructs a transfer operator corresponding to a single row of a partition function representing the norm of the state T. The partition function is first rotated such that the direction dir faces north, after which its rowth row from the north is selected.\n\n\n\n\n\n","category":"method"},{"location":"lib/lib/#PEPSKit.ManualIter","page":"Library","title":"PEPSKit.ManualIter","text":"struct ManualIter <: GradMode\n\nGradient mode for CTMRG using manual iteration to solve the linear problem.\n\n\n\n\n\n","category":"type"},{"location":"lib/lib/#PEPSKit.NLocalOperator","page":"Library","title":"PEPSKit.NLocalOperator","text":"struct NLocalOperator{I<:AbstractInteraction}\n\nOperator in form of a AbstractTensorMap which is parametrized by an interaction type. Mostly, this is used to define Hamiltonian terms and observables.\n\n\n\n\n\n","category":"type"},{"location":"lib/lib/#PEPSKit.NaiveAD","page":"Library","title":"PEPSKit.NaiveAD","text":"struct NaiveAD <: GradMode\n\nGradient mode for CTMRG using AD.\n\n\n\n\n\n","category":"type"},{"location":"lib/lib/#PEPSKit.NearestNeighbor","page":"Library","title":"PEPSKit.NearestNeighbor","text":"struct NearestNeighbor <: AbstractInteraction\n\nInteraction representing nearest neighbor terms that act on two adjacent sites.\n\n\n\n\n\n","category":"type"},{"location":"lib/lib/#PEPSKit.OnSite","page":"Library","title":"PEPSKit.OnSite","text":"struct OnSite <: AbstractInteraction\n\nTrivial interaction representing terms that act on one isolated site.\n\n\n\n\n\n","category":"type"},{"location":"lib/lib/#PEPSKit.PEPOTensor","page":"Library","title":"PEPSKit.PEPOTensor","text":"const PEPOTensor{S}\n\nDefault type for PEPO tensors with a single incoming and outgoing physical index, and 4 virtual indices, conventionally ordered as: O : P ⊗ P' ← N ⊗ E ⊗ S ⊗ W.\n\n\n\n\n\n","category":"type"},{"location":"lib/lib/#PEPSKit.PEPSOptimize","page":"Library","title":"PEPSKit.PEPSOptimize","text":"PEPSOptimize{G}(; boundary_alg = CTMRG(), optimizer::OptimKit.OptimizationAlgorithm = LBFGS()\n                reuse_env::Bool = true, gradient_alg::G, verbosity::Int = 0)\n\nAlgorithm struct that represent PEPS ground-state optimization using AD. Set the algorithm to contract the infinite PEPS in boundary_alg; currently only CTMRG is supported. The optimizer computes the gradient directions based on the CTMRG gradient and updates the PEPS parameters. In this optimization, the CTMRG runs can be started on the converged environments of the previous optimizer step by setting reuse_env to true. Otherwise a random environment is used at each step. The CTMRG gradient itself is computed using the gradient_alg algorithm. Different levels of output verbosity can be activated using verbosity (0, 1 or 2).\n\n\n\n\n\n","category":"type"},{"location":"lib/lib/#PEPSKit.PEPSTensor","page":"Library","title":"PEPSKit.PEPSTensor","text":"const PEPSTensor{S}\n\nDefault type for PEPS tensors with a single physical index, and 4 virtual indices, conventionally ordered as: T : P ← N ⊗ E ⊗ S ⊗ W.\n\n\n\n\n\n","category":"type"},{"location":"lib/lib/#PEPSKit.PEPSTensor-Union{Tuple{S}, Tuple{T}, Tuple{Any, Type{T}, S, S}, Tuple{Any, Type{T}, S, S, S}, Tuple{Any, Type{T}, Vararg{S, 4}}, Tuple{Any, Type{T}, Vararg{S, 5}}} where {T, S<:TensorKit.ElementarySpace}","page":"Library","title":"PEPSKit.PEPSTensor","text":"PEPSTensor(f, ::Type{T}, Pspace::S, Nspace::S,\n           [Espace::S], [Sspace::S], [Wspace::S]) where {T,S<:ElementarySpace}\nPEPSTensor(f, ::Type{T}, Pspace::Int, Nspace::Int,\n           [Espace::Int], [Sspace::Int], [Wspace::Int]) where {T}\n\nConstruct a PEPS tensor based on the physical, north, east, west and south spaces. Alternatively, only the space dimensions can be provided and ℂ is assumed as the field. The tensor elements are generated based on f and the element type is specified in T.\n\n\n\n\n\n","category":"method"},{"location":"lib/lib/#PEPSKit.TransferPEPOMultiline","page":"Library","title":"PEPSKit.TransferPEPOMultiline","text":"const TransferPEPOMultiline = MPSKit.Multiline{<:InfiniteTransferPEPO}\n\nType that represents a multi-line transfer operator, where each line each corresponds to a row of a partition function encoding the overlap of an InfinitePEPO between 'ket' and 'bra' InfinitePEPS states.\n\n\n\n\n\n","category":"type"},{"location":"lib/lib/#PEPSKit.TransferPEPOMultiline-Tuple{InfinitePEPS, InfinitePEPO, Any}","page":"Library","title":"PEPSKit.TransferPEPOMultiline","text":"TransferPEPOMultiline(T::InfinitePEPS, O::InfinitePEPO, dir)\n\nConstruct a multi-row transfer operator corresponding to the partition function representing the expectation value of O for the state T. The partition function is first rotated such that the direction dir faces north.\n\n\n\n\n\n","category":"method"},{"location":"lib/lib/#PEPSKit.TransferPEPSMultiline","page":"Library","title":"PEPSKit.TransferPEPSMultiline","text":"const TransferPEPSMultiline = MPSKit.Multiline{<:InfiniteTransferPEPS}\n\nType that represents a multi-line transfer operator, where each line each corresponds to a row of a partition function encoding the overlap between 'ket' and 'bra' InfinitePEPS states.\n\n\n\n\n\n","category":"type"},{"location":"lib/lib/#PEPSKit.TransferPEPSMultiline-Tuple{InfinitePEPS, Any}","page":"Library","title":"PEPSKit.TransferPEPSMultiline","text":"TransferPEPSMultiline(T::InfinitePEPS, dir)\n\nConstruct a multi-row transfer operator corresponding to the partition function representing the norm of the state T. The partition function is first rotated such that the direction dir faces north.\n\n\n\n\n\n","category":"method"},{"location":"lib/lib/#MPSKit.expectation_value-Tuple{Any, Any}","page":"Library","title":"MPSKit.expectation_value","text":"MPSKit.expectation_value(st::InfiniteMPS, op::Union{InfiniteTransferPEPS,InfiniteTransferPEPO})\nMPSKit.expectation_value(st::MPSMultiline, op::Union{TransferPEPSMultiline,TransferPEPOMultiline})\n\nCompute expectation value of the transfer operator op for the state st for each site in the unit cell.\n\n\n\n\n\n","category":"method"},{"location":"lib/lib/#MPSKit.expectation_value-Tuple{InfinitePEPS, Any, NLocalOperator}","page":"Library","title":"MPSKit.expectation_value","text":"MPSKit.expectation_value(peps::InfinitePEPS, env, O::NLocalOperator)\n\nEvaluate the expectation value of any NLocalOperator on each unit-cell entry of peps and env.\n\n\n\n\n\n","category":"method"},{"location":"lib/lib/#MPSKit.leading_boundary-Tuple{Any, Any, Any}","page":"Library","title":"MPSKit.leading_boundary","text":"MPSKit.leading_boundary(\n    st::InfiniteMPS, op::Union{InfiniteTransferPEPS,InfiniteTransferPEPO}, alg, [envs]\n)\nMPSKit.leading_boundary(\n    st::MPSMulitline, op::Union{TransferPEPSMultiline,TransferPEPOMultiline}, alg, [envs]\n)\n\nApproximate the leading boundary MPS eigenvector for the transfer operator op using st as initial guess.\n\n\n\n\n\n","category":"method"},{"location":"lib/lib/#MPSKit.leading_boundary-Tuple{Any, CTMRG}","page":"Library","title":"MPSKit.leading_boundary","text":"MPSKit.leading_boundary([envinit], state, alg::CTMRG)\n\nContract state using CTMRG and return the CTM environment. Per default, a random initial environment is used.\n\n\n\n\n\n","category":"method"},{"location":"lib/lib/#PEPSKit._rrule-Tuple{Nothing, ChainRulesCore.RuleConfig, Any, Vararg{Any}}","page":"Library","title":"PEPSKit._rrule","text":"_rrule(alg_rrule, config, f, args...; kwargs...) -> ∂f, ∂args...\n\nCustomize the pullback of a function f. This function can specialize on its first argument in order to have multiple implementations for a pullback. If no specialization is needed, the default alg_rrule=nothing results in the default AD pullback.\n\nwarning: Warning\nNo tangent is expected for the alg_rrule argument\n\n\n\n\n\n","category":"method"},{"location":"lib/lib/#PEPSKit.check_elementwise_convergence-Tuple{CTMRGEnv, CTMRGEnv}","page":"Library","title":"PEPSKit.check_elementwise_convergence","text":"check_elementwise_convergence(envfinal, envfix; atol=1e-6)\n\nCheck if the element-wise difference of the corner and edge tensors of the final and fixed CTMRG environments are below some tolerance.\n\n\n\n\n\n","category":"method"},{"location":"lib/lib/#PEPSKit.costfun-Tuple{InfinitePEPS, Any, NLocalOperator{NearestNeighbor}}","page":"Library","title":"PEPSKit.costfun","text":"costfun(peps::InfinitePEPS, env, op::NLocalOperator{NearestNeighbor})\n\nCompute the expectation value of a nearest-neighbor operator. This is used to evaluate and differentiate the energy in ground-state PEPS optimizations.\n\n\n\n\n\n","category":"method"},{"location":"lib/lib/#PEPSKit.ctmrg_iter-Union{Tuple{T}, Tuple{C}, Tuple{Any, CTMRGEnv{C, T}, CTMRG}} where {C, T}","page":"Library","title":"PEPSKit.ctmrg_iter","text":"ctmrg_iter(state, env::CTMRGEnv{C,T}, alg::CTMRG) where {C,T}\n\nPerform one iteration of CTMRG that maps the state and env to a new environment, and also return the truncation error. One CTMRG iteration consists of four left_move calls and 90 degree rotations, such that the environment is grown and renormalized in all four directions.\n\n\n\n\n\n","category":"method"},{"location":"lib/lib/#PEPSKit.fixedpoint-Union{Tuple{T}, Tuple{InfinitePEPS{T}, Any, PEPSOptimize}, Tuple{InfinitePEPS{T}, Any, PEPSOptimize, CTMRGEnv}} where T","page":"Library","title":"PEPSKit.fixedpoint","text":"fixedpoint(ψ₀::InfinitePEPS{T}, H, alg::PEPSOptimize, [env₀::CTMRGEnv]) where {T}\n\nOptimize ψ₀ with respect to the Hamiltonian H according to the parameters supplied in alg. The initial environment env₀ serves as an initial guess for the first CTMRG run. By default, a random initial environment is used.\n\n\n\n\n\n","category":"method"},{"location":"lib/lib/#PEPSKit.fpgrad","page":"Library","title":"PEPSKit.fpgrad","text":"fpgrad(∂F∂x, ∂f∂x, ∂f∂A, y0, alg)\n\nCompute the gradient of the cost function for CTMRG by solving the following equation:\n\ndx = ∑ₙ (∂f∂x)ⁿ ∂f∂A dA = (1 - ∂f∂x)⁻¹ ∂f∂A dA\n\nwhere ∂F∂x is the gradient of the cost function with respect to the PEPS tensors, ∂f∂x is the partial gradient of the CTMRG iteration with respect to the environment tensors, ∂f∂A is the partial gradient of the CTMRG iteration with respect to the PEPS tensors, and y0 is the initial guess for the fixed-point iteration. The function returns the gradient dx of the fixed-point iteration.\n\n\n\n\n\n","category":"function"},{"location":"lib/lib/#PEPSKit.gauge_fix-Union{Tuple{T}, Tuple{C}, Tuple{CTMRGEnv{C, T}, CTMRGEnv{C, T}}} where {C, T}","page":"Library","title":"PEPSKit.gauge_fix","text":"gauge_fix(envprev::CTMRGEnv{C,T}, envfinal::CTMRGEnv{C,T}) where {C,T}\n\nFix the gauge of envfinal based on the previous environment envprev. This assumes that the envfinal is the result of one CTMRG iteration on envprev. Given that the CTMRG run is converged, the returned environment will be element-wise converged to envprev.\n\n\n\n\n\n","category":"method"},{"location":"lib/lib/#PEPSKit.hook_pullback-Tuple{Any, Vararg{Any}}","page":"Library","title":"PEPSKit.hook_pullback","text":"hook_pullback(f, args...; alg_rrule=nothing, kwargs...)\n\nWrapper function to customize the pullback of a function f. This function is equivalent to f(args...; kwargs...), but the pullback can be customized by implementing the following function:\n\n_rrule(alg_rrule, config, f, args...; kwargs...) -> NoTangent(), ∂f, ∂args...\n\nThis function can specialize on its first argument in order to customize the pullback. If no specialization is needed, the default alg_rrule=nothing results in the default AD pullback.\n\nSee also _rrule.\n\n\n\n\n\n","category":"method"},{"location":"lib/lib/#PEPSKit.initializeMPS-Union{Tuple{S}, Tuple{InfiniteTransferPEPS, AbstractVector{S}}} where S","page":"Library","title":"PEPSKit.initializeMPS","text":"initializeMPS(\n    O::Union{InfiniteTransferPEPS,InfiniteTransferPEPO},\n    virtualspaces::AbstractArray{<:ElementarySpace,1}\n)\ninitializeMPS(\n    O::Union{TransferPEPSMultiline,TransferPEPOMultiline},\n    virtualspaces::AbstractArray{<:ElementarySpace,2}\n)\n\nInialize a boundary MPS for the transfer operator O by specifying an array of virtual spaces consistent with the unit cell.\n\n\n\n\n\n","category":"method"},{"location":"lib/lib/#PEPSKit.left_move-Union{Tuple{T}, Tuple{C}, Tuple{Any, CTMRGEnv{C, T}, CTMRG}} where {C, T}","page":"Library","title":"PEPSKit.left_move","text":"left_move(state, env::CTMRGEnv{C,T}, alg::CTMRG) where {C,T}\n\nGrow, project and renormalize the environment env in west direction. Return the updated environment as well as the projectors and truncation error.\n\n\n\n\n\n","category":"method"},{"location":"lib/lib/#PEPSKit.operator_env","page":"Library","title":"PEPSKit.operator_env","text":"operator_env(peps::InfinitePEPS, env::CTMRGEnv, ::AbstractInteraction)\n\nContract a PEPS and a CTMRG environment to form an operator environment. The open bonds correspond to the indices of an operator with the specified AbstractInteraction type.\n\n\n\n\n\n","category":"function"},{"location":"lib/lib/#PEPSKit.projector_type-Tuple{DataType, Any}","page":"Library","title":"PEPSKit.projector_type","text":"projector_type(T::DataType, size)\n\nCreate two arrays of specified size that contain undefined tensors representing left and right acting projectors, respectively. The projector types are inferred from the TensorMap type T which avoids having to recompute transpose tensors.\n\n\n\n\n\n","category":"method"},{"location":"lib/lib/#PEPSKit.rotate_north-Tuple{Any, Any}","page":"Library","title":"PEPSKit.rotate_north","text":"rotate_north(t, dir)\n\nRotate north direction of t to dir by successive applications of rotl90.\n\n\n\n\n\n","category":"method"},{"location":"lib/lib/#PEPSKit.@diffset-Tuple{Any}","page":"Library","title":"PEPSKit.@diffset","text":"@diffset assign\n\nHelper macro which allows in-place operations in the forward-pass of Zygote, but resorts to non-mutating operations in the backwards-pass. The expression assign should assign an object to an pre-existing AbstractArray and the use of updating operators is also possible. This is especially needed when in-place assigning tensors to unit-cell arrays of environments.\n\n\n\n\n\n","category":"macro"},{"location":"lib/lib/#PEPSKit.@showtypeofgrad-Tuple{Any}","page":"Library","title":"PEPSKit.@showtypeofgrad","text":"@showtypeofgrad(x)\n\nMacro utility to show to type of the gradient that is about to accumulate for x.\n\nSee also Zygote.@showgrad.\n\n\n\n\n\n","category":"macro"},{"location":"lib/lib/#PEPSKit.Defaults","page":"Library","title":"PEPSKit.Defaults","text":"module Defaults\n    const ctmrg_maxiter = 100\n    const ctmrg_miniter = 4\n    const ctmrg_tol = 1e-12\n    const fpgrad_maxiter = 100\n    const fpgrad_tol = 1e-6\nend\n\nModule containing default values that represent typical algorithm parameters.\n\nctmrg_maxiter = 100: Maximal number of CTMRG iterations per run\nctmrg_miniter = 4: Minimal number of CTMRG carried out\nctmrg_tol = 1e-12: Tolerance checking singular value and norm convergence\nfpgrad_maxiter = 100: Maximal number of iterations for computing the CTMRG fixed-point gradient\nfpgrad_tol = 1e-6: Convergence tolerance for the fixed-point gradient iteration\n\n\n\n\n\n","category":"module"},{"location":"man/intro/","page":"Manual","title":"Manual","text":"Coming soon.","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"For now, refer to the examples folder on GitHub.","category":"page"},{"location":"#PEPSKit.jl","page":"Home","title":"PEPSKit.jl","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Tools for working with projected entangled-pair states","category":"page"},{"location":"","page":"Home","title":"Home","text":"It contracts, it optimizes, it may break.","category":"page"},{"location":"#Installation","page":"Home","title":"Installation","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"The package can be installed through the Julia general registry, via the package manager:","category":"page"},{"location":"","page":"Home","title":"Home","text":"pkg> add PEPSKit","category":"page"},{"location":"#Quickstart","page":"Home","title":"Quickstart","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"After following the installation process, it should now be possible to load the packages and start simulating. For example, in order to obtain the groundstate of the 2D Heisenberg model, we can use the following code:","category":"page"},{"location":"","page":"Home","title":"Home","text":"using TensorKit, PEPSKit, KrylovKit, OptimKit\n\n# constructing the Hamiltonian:\nJx, Jy, Jz = (-1, 1, -1) # sublattice rotation to obtain single-site unit cell\nphysical_space = ComplexSpace(2)\nT = ComplexF64\nσx = TensorMap(T[0 1; 1 0], physical_space, physical_space)\nσy = TensorMap(T[0 im; -im 0], physical_space, physical_space)\nσz = TensorMap(T[1 0; 0 -1], physical_space, physical_space)\nH = (Jx * σx ⊗ σx) + (Jy * σy ⊗ σy) + (Jz * σz ⊗ σz)\nHeisenberg_hamiltonian = NLocalOperator{NearestNeighbor}(H / 4)\n\n# configuring the parameters\nD = 2\nchi = 20\nctm_alg = CTMRG(; trscheme = truncdim(chi), tol=1e-20, miniter=4, maxiter=100, verbosity=1)\nopt_alg = PEPSOptimize(;\n    boundary_alg=ctm_alg,\n    optimizer=LBFGS(4; maxiter=100, gradtol=1e-4, verbosity=2),\n    gradient_alg=GMRES(; tol=1e-6, maxiter=100),\n    reuse_env=true,\n    verbosity=2,\n)\n\n# ground state search\nstate = InfinitePEPS(2, D)\nctm = leading_boundary(CTMRGEnv(state; Venv=ComplexSpace(chi)), state, ctm_alg)\nresult = fixedpoint(state, Heisenberg_hamiltonian, opt_alg, ctm)\n\n@show result.E # -0.6625...","category":"page"}]
}
