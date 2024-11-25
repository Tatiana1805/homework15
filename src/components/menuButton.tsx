import React from 'react';
import styled from 'styled-components';

//пропсы наших функций. название функции: ()=> void (указываем, что наша функция ничего не возвращает)
interface MenuProps{
    onEdit: () => void;
    onDel: () => void;
    onFavorite: () => void;
}

const ButtonContainer = styled.div`
    position: absolute;
    top: 20px;
    right: 30px;
    gap: 7px;
    background: white;
`
const ButtonItem = styled.button`
    width: 115px;
    border: none;
    background: white;

    &:hover {
    background: #0000000f;
    }
`

const MenuButton: React.FC<MenuProps> = ({
    onEdit, onDel, onFavorite,
}) => {
    return(
        <ButtonContainer >
            {/* пункты меню, которые при клике активируют нужную нам функцию(прописаны в formContainer, 
            это происходит благодаря хуку useState, про который написано в App.tsx) */}
            <ButtonItem onClick={onEdit}>Редактирование</ButtonItem>
            <ButtonItem onClick={onDel}>Удаление</ButtonItem>
            <ButtonItem onClick={onFavorite}>В избранное</ButtonItem>
        </ButtonContainer>
    )
}

export default MenuButton;