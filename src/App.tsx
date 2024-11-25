import React, { useState } from 'react'
import styled from 'styled-components'
import Form from './components/formContainer'
import { Project } from './types'
import arrProjects from './data/posts.json'

//создаем стили прям здесь, чтобы можно было это переиспользовать в другой работе, например
//styled нужно установить в терминале с помощью команды npm install styled-components и импортируем его
const Conteiner = styled.div`
  margin: 0 auto;
  max-width: 900px;
  height: auto;
  background-color: #94d2f5;
  border-radius: 15px;
  padding: 40px;
  @media(max-width: 400px) {
    max-width: 47vw;
  }
`
const Tittle = styled.h1 `
  font-size: 3em;
    @media(max-width: 400px) {
    font-size: 2em;
  }
`
//функция возвращает React.FC (функциональный компонент)
const App:React.FC = () => {  
  //создаем наполнение карточек, с помощью useState мы создаем переменную, через кот мы можем
  // достать информацию (posts) и функицю, через которую меня меняем значение (setPosts)
  //<Project[]> - список типизации ts, (arrProjects.project) - это наш массив json
  const[posts, setPosts] = useState<Project[]>(arrProjects.project)
//удаление поста, фильтруем по ИД и удаляем его (эту функцию передаем в formContainer)
  const handleDel = (id: number) => {
    setPosts(posts.filter((post) => post.id !== id))
  }
  
  return (
    <Conteiner>
      <Tittle>Посты</Tittle>
      {/* помещаем информацию наших карточек с помощью перебора массива и вставляем данные в форму*/}
      {posts.map((post) =>(
        <Form
      // key является обязательным элементом
        key={post.id}
        //передаем данные из компонента(Form)
        id={post.id}
        name={post.name}
        tittle={post.tittle}
        onDelete={handleDel}
        />
      ))}
    </Conteiner>
  )
}

export default App
