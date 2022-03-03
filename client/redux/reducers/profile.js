import { GET_PROFILE, SET_PROFILE } from '../types'

const initialState = {
    profile: {}
}

export default function (state = initialState, action){
    switch (action.type) {
        case GET_PROFILE:
            return {
                ...state,
                profile: action.payload
            }
        default:
           return state
    }
}