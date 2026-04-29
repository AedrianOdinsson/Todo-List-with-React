import { useState, useEffect } from "react";

//create your first component
const TodoList = () => {

	const [userInput, setUserInput] = useState("");
	const [user, setUser] = useState(localStorage.getItem("todoUser"));
	const [mostrarModal, setMostrarModal] = useState(true);
	const [tareas, setTareas] = useState([]);
	const [inputText, setInputText] = useState("");


	useEffect(() => {
		if (user) {
			setMostrarModal(false);
		}
	}, [user]);

	const borrarTarea = (id) => {
		setTareas(tareas.filter((tarea) => tarea.id !== id));
	};

	const agregarTarea = async () => {
		if (inputText.trim() === "") return;

		const nuevaTarea = {
			label: inputText,
			is_done: false
		};
		setTareas([...tareas, nuevaTarea]);
		setInputText("");
	};


	return (
		<div>
			{mostrarModal &&
				<div className="modal-fondo">
					<div className="modal-contenido">
						<h2>Crear Usuario</h2>
						<input
							type="text"
							placeholder="Escribe tu nombre de usuario"
							value={userInput}
							onChange={(e) => setUserInput(e.target.value)}
						/>

						<button>Crear Usuario</button>
					</div>
				</div>
			}
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
						{tarea.label}
						<button className="delete-btn" onClick={() => borrarTarea(tarea.id)}>❌</button>
					</div>

				);
			})}

		</div>
	)
}

const Home = () => {

	const [list, setList] = useState([])

	async function Todo() {
		let result = await fetch("https://playground.4geeks.com/todo/users/%C3%81drianSS") // Lo lee -> Pending...
		let data = await result.json()  // Usar await - Abrir contenido

		setList(data.results)

	}

	useEffect(() => {
		Todo()
	}, [])

	return (
		<div className="text-center">
			<h1></h1>

			<div className="card-container">
				{
					list.map((e) => {

						return (

							<div class="card" >
								<img src={e.image} class="card-img-top" alt="..." />
								<div class="card-body">
									<h5 class="card-title">{e.name}</h5>
									<p class="card-text">{e.status}</p>
								</div>
							</div>
						)
					})
				}

			</div>


		</div>
	);
};

export default TodoList;