import { useState } from 'react'
import { PlusCircle } from 'phosphor-react'
import styles from './Task.module.css'
import cliboard from '../../assets/Clipboard.svg'
import { CheckTask } from '../CheckTask/Checktask'
import { FormEvent, ChangeEvent, InvalidEvent, KeyboardEvent } from 'react'
import { v4 } from 'uuid';

interface Todo {
  id: string;
  title: string;
}

export function Task() {

  const [TaskCount, setTaskCount] = useState(0);
  const [CheckedCount, setCheckedCount] = useState(0)
  const [tasks, setTasks] = useState<Todo[]>([])
  const [newTaskText, setNewTaskText] = useState('')

  function handleCreateNewTask(event: FormEvent)  {
    event.preventDefault()
    setTasks([
       ...tasks,
       {
        id:v4(),
        title:newTaskText,
      }
    ])  
    setNewTaskText('')
  }

  function handleNewTaskChange(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('')
    setNewTaskText(event.target.value)
  }

  function handleNewTaskInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('essa campo ´e obrigatorio!!!!')
  }

  function deleteTask(taskToDelete: string)  {
    const tasksWithDeleteOne = tasks.filter(tasklist => {
      return tasklist.id != taskToDelete 
    })

    setTasks(tasksWithDeleteOne)  

    setTaskCount((state) => {
      return state - 1})
  }

  function handleTaskCount () {
    setTaskCount(TaskCount + 1)
  }

  function CheckedtaskOneMore() {
   setCheckedCount(CheckedCount + 1)
  }

  function CheckedtaskOneLess() {
    setCheckedCount(CheckedCount - 1) 
  }

  return (
  <article> 
   <div className={styles.content}>
      <header> {/* button */}
        <form onSubmit={handleCreateNewTask} className={styles.Search}>
          <textarea 
            value={newTaskText} /* valor que foi digitado */
            onChange={handleNewTaskChange}
            name='task'
            onInvalid={handleNewTaskInvalid}
            placeholder='Adicione uma nova tarefa'
            required={true}
          />
          <button type='submit' onClick={handleTaskCount} disabled={newTaskText.length == 0} > Criar <PlusCircle size={19}/></button>
        </form>
      </header>

      <main>
        <article>        
          <div className={styles.headerTasks}>
            <p>Tarefas criadas <span>{TaskCount}</span></p>
            <p>Concluídas <span> {CheckedCount} de {TaskCount}</span></p>
          </div>
        </article>
        
        {tasks.length > 0? 
        <div className={styles.Tasks}>
          {tasks.map(task => {
            return (
               <CheckTask   
                 key={task.id}
                 id={task.id}
                 title={task.title}
                 onDeleteTask={deleteTask}
                 onCheckedtaskOneMore={CheckedtaskOneMore}
                 onCheckedtaskOneLess={CheckedtaskOneLess}
               />  
            )
          })}
        </div> : 
        <div className={styles.noTask} >
          <img src={cliboard} /> 
          <p>Você ainda não tem tarefas cadastradas</p>
          <p>Crie tarefas e organize seus itens a fazer</p>
        </div>
        }
      </main>
    </div>
  </article>
  )
}

  

