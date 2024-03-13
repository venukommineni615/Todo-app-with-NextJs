import { todosActions } from '@/store/todosReducer'
import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import styles from './form.module.css'
const Form = (props) => {
  const dispatch=useDispatch()
  const name=useRef()
  const description=useRef()
  const addTodo=async(event)=>{
    event.preventDefault()
      const res=await fetch('api/add-todo',{
        method:'POST',
        body:JSON.stringify({
            name:name.current.value,
            description:description.current.value,
            done:false
        }),
        headers:{
          'Content-Type':'application/json'
        }
      })
      const data=await res.json()
      console.log('added data',data.result)
      dispatch(todosActions.addTodo({id:data.result.insertedId,
      name:name.current.value,
    description:description.current.value}))
      name.current.value=''
      description.current.value=''
      props.show()
  }
  return (
    <form onSubmit={addTodo} className={`${styles.form}`}>
        <input ref={name} type='text' className={`${styles.input}`} required placeholder='work'></input>
        <input ref={description} type='text' className={`${styles.input}`} required placeholder='description'></input>
        <button type='submit' className={`${styles.button}`}>Save</button>
    </form>
  )
}

export default Form