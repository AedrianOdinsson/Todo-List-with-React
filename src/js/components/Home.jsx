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

	useEffect(() => {
		if (!user) return;

		const cargarTareas = async () => {
			try {
				const response = await fetch(`https://playground.4geeks.com/todo/users/${user}`);
				const data = await response.json();
				console.log("GET tareas -> respuesta API" , data);
				if (data.todos) {
					setTareas(data.todos);
				}
			} catch (error) {
				console.error("Error cargando tareas:", error);
			}
		};

		cargarTareas();
	}, [user]);

	const borrarTarea = async (id) => {
		try {
			await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
				method: "DELETE"
			});

			// Quitamos la tarea del estado
			setTareas(tareas.filter((tarea) => tarea.id !== id));

		} catch (error) {
			console.error("Error borrando tarea:", error);
		}
	};


	const agregarTarea = async () => {
		if (inputText.trim() === "") return;

		try {
			const response = await fetch(`https://playground.4geeks.com/todo/todos/${encodeURIComponent(user)}`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					label: inputText,
					is_done: false
				})
			});

			const nuevaTarea = await response.json();

			setTareas([...tareas, nuevaTarea]);
			setInputText("");

		} catch (error) {
			console.error("Error agregando tarea:", error);
		}
	};


	const postUser = async (username) => {
		try {
			const response = await fetch(`https://playground.4geeks.com/todo/users/${username}`, {
				method: "POST",
				headers: { "Content-Type": "application/json" }
			});

			const data = await response.json();
			return data;
		} catch (error) {
			console.error("Error creando usuario:", error);
			return null;
		}
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
						<button
							onClick={async () => {
								const data = await postUser(userInput);

								if (data) {
									localStorage.setItem("todoUser", userInput);
									setUser(userInput);
									setMostrarModal(false);
								}
							}}
						>
							Crear Usuario
						</button>

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

			<button
				onClick={() => {
					localStorage.removeItem("todoUser");
					setUser(null);
					setTareas([]);
					setMostrarModal(true);
				}}
			>
				Cambiar usuario
			</button>


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
		let result = await fetch("https://playground.4geeks.com/todo/users/ÁdrianSS")
		let data = await result.json()

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