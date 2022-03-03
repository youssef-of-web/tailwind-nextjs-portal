import { GET_ERRORS_AUTH } from '../types'

const initialState = {}
export default function(state = initialState, action){
 switch (action.type) {
     case GET_ERRORS_AUTH:
         return action.payload
 
     default:
         return state
 }
}