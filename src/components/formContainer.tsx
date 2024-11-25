import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import MenuButton from './menuButton'

//создаем пропсы. Указываем интерфейс для пропсов (мы принимаем название переменной: тип)
interface ButtonProps {
    id: number;
    name: string;
    tittle: string;
    onDelete: (id: number) => void; //функ из App, которая принимает ИД, но ничего не возвращает
}

const FormCard = styled.div`
    border-radius: 11px;
    padding: 16px;
    margin: 16px;
    width: 400px;
    position: relative;
    background: #ffffff;
    box-shadow: 0 6px 10px rgb(0 0 0 / 27%);
    color: black;
      @media(max-width: 400px) {
    max-width: 47vw;
  }
`

const MenuButtons = styled.button`
    position: absolute;
    background: none;
    border: none;
    font-size: 20px;
    right: 10px;
`

//реализация самой карточки
//наша функция принимает пропсы (прописаны выше)
const Form: React.FC<ButtonProps> = ({
    id, name, tittle, onDelete,
}) => {
    //состояние нашей меню
    //указываем в хуке, что данная переменная имеет булевое значение и оно по умолчанию false
        const [menuVisible, setMenuVisible] = useState<boolean>(false)
        //Добавление в избранное
        const [favorite, setFavorite] = useState<boolean>(false)
        const [postContent, setPostContent] = useState<string>(tittle)
        const menuRef = useRef<HTMLDivElement>(null)
       
        //функция для скрытия и открытия меню    
        const toggleMenu = () => {
            //фызываем функию и меняем на обратное
            setMenuVisible(!menuVisible)
        }
        const clickOutside = (ev: MouseEvent) => {
            if (
                menuRef.current && !menuRef.current.contains(ev.target as Node)
            )
            setMenuVisible(false)
        }

        useEffect(() => {
            if(menuVisible) {
                document.addEventListener('mousedown', clickOutside)
            } return () => {
                document.removeEventListener('mousedown', clickOutside)
            }
        }, [menuVisible])

        //Редактирование поста
        const addEdit = () => {
            //Вызываем промт с текстом 'Отредактируйте текст поста' и выводим старый текст поста
            const newContent = prompt('Отредактируйте текст поста', postContent)
            //если что-то поменяли, то текст меняется
            if (newContent?.trim()) {
                setPostContent(newContent)
            }
        }

        //Удаление поста
        const handleDel = () => {
            //выводим вопрос в сплывающее окно и удаляем по ИД c помощью функции из App
            if (window.confirm('Вы точно хотите удалить этот посто?')) {
                onDelete(id)
            }
        }

        //Добавление в избранное
        const handleFavorite = () => {
            setFavorite(!favorite)
        }

    return (
        <FormCard>
            {/* можем вставить данные благодаря пропсам */}
            <h2>{name}</h2>
            <p>{postContent}</p> 
            {/* если мы нажмем на избранное, то отображается 'В избранном', если нет, то ничего */}
            <p>{favorite ? 'В избранном' : ''}</p>
            {/* Отображаем кнопку меню  */}
            <MenuButtons onClick={toggleMenu}>⋮</MenuButtons>
            {/* с помощью onClick при нажатии у нас открывается меню. Для этого создается отдельный компонент menuButton */}
           {/* если menuVisible tru, то меню отображается, если нет, то скрыт */}
            {menuVisible && (
                <div ref={menuRef}>
                    {/* Вызываем компонент */}
                    <MenuButton
                        onEdit={addEdit}
                        onDel={handleDel}
                        onFavorite={handleFavorite} />
                </div>
            )}
        </FormCard>
    )
}

export default Form;