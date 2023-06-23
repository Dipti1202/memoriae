import {AUTH,LOGOUT} from '../constants/actionsType'

const authReducer=(state={authData:null},action)=>{
switch(action.type){
    case AUTH:
// console.log(action?.data)
// return state;
localStorage.setItem('profile',JSON.stringify({...action?.data}))
    return  {...state,authData:action?.data}
    case LOGOUT:
        localStorage.clear();
    return  {...state,authData:null}
        
// console.log(action?.data)
//     return state;
    default:
        return state;
}
}
export default authReducer;