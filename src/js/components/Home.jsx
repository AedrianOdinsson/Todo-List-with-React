import React from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
import { useState } from "react";
const TodoList = () => {

	const [tareas, setTareas] = useState([])
	const [inputText, setInputText] = useState("");
	const borrarTarea = (id) => {
		setTareas(tareas.filter((tarea) => tarea.id !== id));
	};

	const agregarTarea = () => {
		const nuevaTarea = {
			id: Date.now(),
			texto: inputText,
			done: false
		};
		setTareas([...tareas, nuevaTarea]);
		setInputText("");
	};

	return (
		<div>
			<input
				value={inputText}
				onChange={(event) => setInputText(event.target.value)}
				onKeyDown={(event) => {
					if (event.key === "Enter") {
						agregarTarea();
					}
				}}
			/>

			<button onClick={agregarTarea}>Add</button>

			{tareas.length === 0 && <p>No hay tareas, añadir tareas</p>}

			{tareas.map((tarea) => {
				return (
					<div key={tarea.id} className="tarea">
						{tarea.texto}
						<button className="delete-btn" onClick={() => borrarTarea(tarea.id)}>❌</button>
					</div>

				);
			})}

		</div>
	)
}

export default TodoList;