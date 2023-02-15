import styles from './Checktask.module.css'
import Layer from '../../assets/Layer.svg'
import React from 'react'
import {BsCheckCircleFill, BsCircle} from "react-icons/bs";

interface TasksContent {
  title: string;
  onDeleteTask: (Comment: string) => void;
  onCheckedtaskOneMore: (comment: number) => void;
  onCheckedtaskOneLess: (comment: number) => void;
  id: any;
}

export function CheckTask({ title, onDeleteTask, onCheckedtaskOneLess, onCheckedtaskOneMore, id}: TasksContent) {

  const [isCheck, setIsCheck] = React.useState(false);

  function handleClick()  {
    setIsCheck(!isCheck)

     {isCheck == false
     ? onCheckedtaskOneMore(0)  
     : onCheckedtaskOneLess(0)
    }  
  }

  function handleDeleteTask() {
    onDeleteTask(id) 

    if (isCheck == true) {
      onCheckedtaskOneLess(0)
    }
  }
                                  
  return (
    <div className={styles.check}>
      <div onClick={() => handleClick()}> 
         {isCheck ? <BsCheckCircleFill className={styles.checkTrue}/> : <BsCircle className={styles.checkFalse}/>}
      </div>
      <span className={isCheck ? styles.textCheckTrue : undefined} onClick={() => handleClick()} key={title}>
         {title}
      </span>
      <button onClick={handleDeleteTask}><img src={Layer}/></button>      
    </div>
   )
 }
 
