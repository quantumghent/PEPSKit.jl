#=
This file allows us to call approximate(init,line_of_peps_tensors,state,alg)
and have it work
=#
struct LineEnv{S,P<:PEPSType, C<:MPSKit.GenericMPSTensor} <: Cache
    above :: S #assumed not to change
    middle :: Vector{P}

    ldependencies::Vector{C} #the data we used to calculate leftenvs/rightenvs
    rdependencies::Vector{C}

    leftenvs::Vector{C}
    rightenvs::Vector{C}
end

function params(below::S,middle::Vector{P},above::S,leftstart::C,rightstart::C) where S <: Union{<:FiniteMPS,<:MPSComoving} where {C <: MPSKit.GenericMPSTensor,P<:PEPSType}
    leftenvs = [leftstart]
    rightenvs = [rightstart]

    for i in 1:length(above)
        push!(leftenvs,similar(leftstart))
        push!(rightenvs,similar(rightstart))
    end

    return LineEnv{S,P,C}(above,middle,similar.(below.site_tensors),similar.(below.site_tensors),leftenvs,reverse(rightenvs))
end

function params(below::S,middle::Vector{P},above::S) where {S <: FiniteMPS,P<:PEPSType}
    #this is wrong
    left_tracer = isomorphism(space(middle[1],1)',space(middle[1],1)')
    right_tracer = isomorphism(space(middle[end],3)',space(middle[end],3)')
    @tensor leftstart[-1 -2 -3; -4]:=l_LL(above)[-1,-4]*left_tracer[-2,-3]
    @tensor rightstart[-1 -2 -3; -4]:=r_RR(above)[-1;-4]*right_tracer[-2,-3]
    params(below,middle,above,leftstart,rightstart);
end

#notify the cache that we updated in-place, so it should invalidate the dependencies
function poison!(ca::LineEnv,ind)
    ca.ldependencies[ind] = similar(ca.ldependencies[ind])
    ca.rdependencies[ind] = similar(ca.rdependencies[ind])
end


#rightenv[ind] will be contracteable with the tensor on site [ind]
function rightenv(ca::LineEnv,ind,state)
    a = findfirst(i -> !(state.AR[i] === ca.rdependencies[i]), length(state):-1:(ind+1))
    a = a == nothing ? nothing : length(state)-a+1

    if a != nothing
        #we need to recalculate
        for j = a:-1:ind+1
            ca.rightenvs[j] = transfer_right(ca.rightenvs[j+1],ca.middle[j],ca.above.AR[j],state.AR[j])
            ca.rdependencies[j] = state.AR[j]
        end
    end

    return ca.rightenvs[ind+1]
end

function leftenv(ca::LineEnv,ind,state)
    a = findfirst(i -> !(state.AL[i] === ca.ldependencies[i]), 1:(ind-1))

    if a != nothing
        #we need to recalculate
        for j = a:ind-1
            ca.leftenvs[j+1] = transfer_left(ca.leftenvs[j],ca.middle[j],ca.above.AL[j],state.AL[j])
            ca.ldependencies[j] = state.AL[j]
        end
    end

    return ca.leftenvs[ind]
end


function downproject2(pos::Int,below,middle,above,pars)
    @tensor toret[-1 -2 -3; -4 -5 -6]:=leftenv(pars,pos,below)[-1,1,2,3]*above.AC[pos][3,4,5,6]*above.AR[pos+1][6,7,8,9]*rightenv(pars,pos+1,below)[9,10,11,-6]*
    middle[pos][1,-2,12,4,13]*conj(middle[pos][2,-3,14,5,13])*middle[pos+1][12,-4,10,7,15]*conj(middle[pos+1][14,-5,11,8,15])
end