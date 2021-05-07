const redux = require("redux")
const thunkMiddleware = require("redux-thunk").default
const createStore = redux.createStore ;
const applyMiddleware = redux.applyMiddleware;
const axios = require("axios")



const initailState = {
	loading : false ,
	users : [] , 
	error :  ""
}

const FETCH_USESRS_REQUEST = "FETCH_USESRS_REQUEST";
const FETCH_USESRS_SUCCESS = "FETCH_USESRS_SUCCESS";
const FETCH_USESRS_FAILURE = "FETCH_USESRS_FAILURE";

const fetchUsersRequest = ()=> {
return	{type : FETCH_USESRS_REQUEST}
}
const fetchUsersSuccess = (users)=>{
	return {
		type : FETCH_USESRS_SUCCESS ,
		payload  : users
	}

}
const fetchUsersError = error =>{
	return {
		type : FETCH_USESRS_FAILURE ,
		payload : error
	}
}
const fetchUsers = ()=>{
	return function(dispatch){
		dispatch(fetchUsersRequest())
		axios.get("https://jsonplaceholder.typicode.com/users").then(res=>{
			const users = res.data.map(item=> item.name)
			dispatch(fetchUsersSuccess(users))
		}).catch(err=>{
			const message = err.message ;
			dispatch(fetchUsersError(message))
		})
	}
}
const reducer = (state = initailState , action )=>{
	switch(action.type){
		case FETCH_USESRS_REQUEST: return{
			...state , 
			loading : true, 

		}
		case FETCH_USESRS_SUCCESS : return {
			loading : false , 
			users : action.payload , 
			error : ""
		}
		case FETCH_USESRS_FAILURE : return {
			loading : false ,
			users : [] ,
			error : action.payload
		}
	}
}

const store = createStore(reducer, applyMiddleware(thunkMiddleware))
store.subscribe(()=>console.log(store.getState()));
store.dispatch(fetchUsers())