import React, { useState } from 'react'
import styles from './todos.module.css'
import { AiTwotoneDelete } from "react-icons/ai";
const Todos = (props) => {
    const [isChecked,setChecked]=useState()
    const changeHadler=async(event,id)=>{
      setChecked((prev)=>{
        return !prev
      })
      const res=await fetch('http://localhost:3000/api/update-todo',{
      method:'PATCH',
      body:JSON.stringify({
        id:id,
        done:isChecked
      }),
      headers:{
        'Content-Type':'application/json'
      }
      })
      const data=await res.json()
      console.log('changed',data)
    }
    const deleteTodo=async(event,id)=>{
      console.log('id',id,event)
      const res=await fetch('http://localhost:3000/api/delete-todo',{
        method:'DELETE',
        body:JSON.stringify({id}),
        headers:{
          'Content-Type':'application/json'
        }
        })
        const data=await res.json()
        console.log('delete',data)
    }
  return (
    <ul className={`${styles.list}`}>
     { props.todos.map((todo)=>{
      
      return (
        <li className={`${styles.item}`} key={todo.id}>
        <input className={`${styles.checkbox}`} type='checkbox' checked={todo.done} onChange={(event)=>{changeHadler(event,todo.id)}}></input>
        <p>{todo.name}</p>
        <p>{todo.description}</p>
        <button className={`${styles.button}`} onClick={(event)=>{deleteTodo(event, todo.id)}} ><AiTwotoneDelete  className={`${styles.icon}`} /></button>
    </li>
      )
     })  }
        
    </ul>
  )
}

export default Todos