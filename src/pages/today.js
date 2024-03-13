import Head from "next/head";
import { MdAdd } from "react-icons/md";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Todos from "@/components/Todos";
import Form from "@/components/Form";
import { useState } from "react";
const inter = Inter({ subsets: ["latin"] });

export default function Home(props) {
  const [show, setShow]=useState(false)
  
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
      <Todos todos={props.todos} show={() => setShow(prev => !prev)} />
      {!show && <button onClick={()=>{setShow(true)}} className={`${styles.button}`}><MdAdd />Add todo</button>}
      {show && <Form show={() => setShow(prev => !prev)}></Form>}
      </main>
    </>
  );
}

export async function getServerSideProps() {
  try {
    const res = await fetch('http://localhost:3000/api/get-todos'); 
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    const result = await res.json();
    const data=result.filter((todo)=>{
        return todo.done===false
    })
    return {
      props: {
        todos: data.result.map((todo) => ({
          id: todo._id.toString(),
          name: todo.name,
          description: todo.description,
          done:todo.done
        })),
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        todos: []
      },
      
    };
  }
}
