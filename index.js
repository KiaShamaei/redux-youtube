const redux = require('redux')


const BUY_CAKE = "BUY_CAKE"
const createStore = redux.createStore
function buycake (){
    return {
        type : BUY_CAKE ,
        info : "first redux action"
    }
}
const initialState = {

    numOfCake : 10
}
const reducer = (state = initialState , action )=>{
    debugger;
    switch ( action.type){
    
       case BUY_CAKE : return {
           ...state,
           numOfCake : state.numOfCake - 1
       } 
       default : return state;
    }
}
const store = createStore(reducer)

console.log(store.getState())
const unsubscribe = store.subscribe(()=> console.log('update state', store.getState()))
store.dispatch(buycake())
store.dispatch(buycake())
unsubscribe();

