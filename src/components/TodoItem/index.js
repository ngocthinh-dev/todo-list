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
import { Icons } from '../../themes';
import { changeType, deleteTask, editTask } from '../../actions';
import { useDispatch } from 'react-redux';

function TodoItem({ todo, index }) {
	const [isEdit, setIsEdit] = useState(false);
	const [editValue, setEditValue] = useState('');

	const dispatch = useDispatch();

	const handleEdit = (value) => {
		setEditValue(value);
		setIsEdit(!isEdit);
	};

	const handleSubmitEdit = (e) => {
		if (e.keyCode === 13) {
			if (editValue.trim()) {
				dispatch(editTask({ index, editValue }));
				setIsEdit(!isEdit);
			}
		}
	};

	return (
		<TodoItemContent>
			<TodoIcon marginLeft="10px" onClick={() => dispatch(changeType(index))}>
				<TodoImg
					opacity="0.5"
					width="35px"
					height="35px"
					src={Icons.circleIcon.default}
				/>

				{todo.isCompleted && (
					<TodoImg
						position="absolute"
						width="20px"
						height="20px"
						src={Icons.checkIcon.default}
					/>
				)}
			</TodoIcon>
			<TodoItemDiv onDoubleClick={() => handleEdit(todo.content)}>
				{isEdit ? (
					<TodoInput
						onKeyDown={(e) => handleSubmitEdit(e)}
						onChange={(e) => setEditValue(e.target.value)}
						value={editValue}
					/>
				) : (
					<TodoItemText
						color={todo.isCompleted ? '#ccc' : '#000'}
						line={todo.isCompleted ? 'line-through' : 'none'}
					>
						{todo.content}
					</TodoItemText>
				)}
			</TodoItemDiv>
			<DeleteIcon display="none" onClick={() => dispatch(deleteTask(index))}>
				<TodoImg
					width="15px"
					height="15px"
					src={Icons.cancelIcon.default}
				></TodoImg>
			</DeleteIcon>
		</TodoItemContent>
	);
}

export default TodoItem;
