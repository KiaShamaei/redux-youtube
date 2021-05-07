const redux = require("redux");

const BUY_CAKE = "BUY_CAKE";
const BUY_ICE = "BUY_ICE";
const createStore = redux.createStore;
function buycake() {
  return {
    type: BUY_CAKE,
    info: "first redux action",
  };
}
function buyIce() {
  return {
    type: BUY_ICE,
  };
}
const initialStateCake = {
	numOfCake: 10
 
};
const initialStateIce = {
	
	numOfIce: 10
}
const reducerCake = (state = initialStateCake, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return {
        ...state,
        numOfCake: state.numOfCake - 1,
      };
  
    default:
      return state;
  }
};
const reducerIce = (state = initialStateIce , action)=>{
	switch(action.type){
		case BUY_ICE:
			return {
			  ...state,
			  numOfIce: state.numOfIce - 1,
			};
			default : 
			return state ;
	}
}
// if we have more than one reducer must set combineReducer method in redux which accept obj as arguman 
// const store = createStore(reducer);
const rootReducer = redux.combineReducers({
	cake : reducerCake ,
	icecream : reducerIce
});
const store = redux.createStore(rootReducer);

console.log(store.getState());
const unsubscribe = store.subscribe(() =>
  console.log("update state", store.getState())
);
store.dispatch(buycake());
store.dispatch(buycake());
store.dispatch(buyIce());
store.dispatch(buyIce());
unsubscribe();
