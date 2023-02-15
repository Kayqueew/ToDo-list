/* import { useState } from 'react' */
import { Task } from './components/Task/Task';
import { Header } from './components/Header/Header'
import styles from './App.module.css'
import './global.css'

export function App() {
  return (
    <div>
      <Header/>
      <div className={styles.wrapper}>
        <main>
          <Task />  
        </main>
      </div>
    </div>
  )
}

