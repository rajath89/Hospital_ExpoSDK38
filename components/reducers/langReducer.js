import { AsyncStorage } from 'react-native';
//import { defined } from 'react-native-reanimated';

const initialState={
    test:null,
    dec:null
};



const setLoginLocal = async (loginData) => {
    try {
        const value = await AsyncStorage.getItem('kannadaLang');
        console.log("val",value);
       // state.dec=value;
        return value;
       
        //return value;
    } catch (err) {
      console.log(err);
    }
  };

export default (state = initialState,action) => {
    
    switch(action.type){

        

        case 'ENGLISH':
            state.test=action.payload.split(' ')[0];
            state.dec=action.payload.split(' ')[1];
            return Object.assign({},state, {
                state
            })

        case 'KANNADA':
            state.test=action.payload.split(' ')[0];
            state.dec=action.payload.split(' ')[1];
            
           return Object.assign({},state, {
            state
        })


        case 'RAN_NUM':

           state.dec=action.payload;
            
           return Object.assign({},state, {
            state
        })
    }
     return state;
}

// // Reducers
// import { createStore, combineReducers } from "redux";
// const mathReducer = (state = {number: 0}, action) => {
//     if (action.type === ADD_NUMBER) {
//         return {...state, number: state.number + action.payload};
//     }
//     else if (action.type === SUBTRACT_NUMBER) {
//         return {...state, number: state.number - action.payload};
//     }
//     return state;
// };
// // Root Reducers
// const rootReducer = combineReducers({
//    math: mathReducer,
// });