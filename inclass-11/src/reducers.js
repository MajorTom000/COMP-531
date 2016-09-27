
const Reducer = (state =  {
	nextId: 2,
	todoItems: [
	    {id: 0, text: "This is an item", done: false},
	    {id: 1, text: "Another item", done: false}
	]
}, action) => {
	switch(action.type) {
		case 'ADD_TODO':
			state = {nextId:state.nextId+1, todoItems : [...state.todoItems, {id:state.nextId, text:action.text, done:false}]}
			// IMPLEMENT ME
		case 'REMOVE_TODO':
			state = Object.assign({},state, {todoItems: state.todoItems.filter((e)=>e.id!=action.id)})
			// IMPLEMENT ME
		case 'TOGGLE_TODO':
			state = Object.assign({}, state, {todoItems: state.todoItems.map(function(obj){
				var newobj = Object.assign({}, obj);
				if (newobj.id == action.id) newobj.done = !newobj.done;
				return newobj;
			})})
			// IMPLEMENT ME
		default: 
			return state
	}
}

export default Reducer