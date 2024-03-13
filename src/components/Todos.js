
import styles from './todos.module.css'
import Todo from './Todo';
const Todos = (props) => {
    return (
    <ul className={`${styles.list}`}>
     { props.todos.map((todo)=>{
      return (
        <Todo todo={todo}></Todo>
      )
     })  }   
    </ul>
  )
}

export default Todos