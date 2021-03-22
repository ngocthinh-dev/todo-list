import React, { useState } from 'react';
import {
	TodoItemText,
	TodoIcon,
	TodoItemContent,
	TodoImg,
	DeleteIcon,
	TodoInput,
	TodoItemDiv,
} from './TodoItem.styles';

function TodoItem({
	todo,
	index,
	callbackSuccess,
	callbackDelete,
	callbackEdit,
}) {
	const [isEdit, setIsEdit] = useState(false);
	const [editValue, setEditValue] = useState('');

	const handleClickSuccess = (index) => {
		callbackSuccess(index);
	};

	const handleDeleteTodo = (index) => {
		callbackDelete(index);
	};

	const handleEdit = (value) => {
		setEditValue(value);
		setIsEdit(!isEdit);
	};

	const handleSubmitEdit = (e) => {
		if (e.keyCode === 13) {
			if (editValue.trim()) {
				callbackEdit(index, editValue);
				setIsEdit(!isEdit);
			}
		}
	};

	return (
		<TodoItemContent>
			<TodoIcon marginLeft="10px" onClick={() => handleClickSuccess(index)}>
				<TodoImg
					opacity="0.5"
					width="35px"
					height="35px"
					src="https://www.flaticon.com/svg/vstatic/svg/3515/3515278.svg?token=exp=1616387853~hmac=ae7f970157d4309690a093a214e951cc"
				/>

				{todo.isFinished && (
					<TodoImg
						position="absolute"
						width="20px"
						height="20px"
						src="https://www.flaticon.com/svg/vstatic/svg/1828/1828643.svg?token=exp=1616399481~hmac=e96976151fbe6f442b52e0d64e26875a"
					/>
				)}
			</TodoIcon>
			<TodoItemDiv onDoubleClick={() => handleEdit(todo.name)}>
				{isEdit ? (
					<TodoInput
						onKeyDown={(e) => handleSubmitEdit(e)}
						onChange={(e) => setEditValue(e.target.value)}
						value={editValue}
					/>
				) : (
					<TodoItemText
						color={todo.isFinished ? '#ccc' : '#000'}
						line={todo.isFinished ? 'line-through' : 'none'}
					>
						{todo.name}
					</TodoItemText>
				)}
			</TodoItemDiv>
			<DeleteIcon display="none" onClick={() => handleDeleteTodo(index)}>
				<TodoImg
					width="15px"
					height="15px"
					src="https://www.flaticon.com/svg/vstatic/svg/864/864393.svg?token=exp=1616387834~hmac=981ac7942cb2534a7a35b7b70e18eaa2"
				></TodoImg>
			</DeleteIcon>
		</TodoItemContent>
	);
}

export default TodoItem;
