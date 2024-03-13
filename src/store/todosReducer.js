import { createSlice } from "@reduxjs/toolkit";

const todosSlice=createSlice({
    name:'todos',
    initialState:{todos:[]},
    reducers:{
        addTodo(state,action){
            const index=state.todos.findIndex((todo)=>{
                return todo.id===action.payload.id
            })
            if(index!==-1){
                state.todos.push(action.payload)
            }else{
                return state
            }
        },
        removeTodo(state,action){
            const index=state.todos.findIndex((todo)=>{
                return todo.id===action.payload.id
            })
            if(index!==-1){
                state.todos=state.todos.filter((todo)=>{
                    return todo.id!==action.payload.id
                })
            }else{
                return state
            }
        }
    }
})
export const todosActions=todosSlice.actions
export default todosSlice.reducer