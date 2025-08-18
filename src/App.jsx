import React, { useState } from "react";
import styles from "./Style.module.css";
import { v4 as uuidv4 } from "uuid";

const App = () => {
	const [task, setTask] = useState([]);
	const [newTodo, setNewTodo] = useState("");
	const [warning, setWarning] = useState("");

	//For adding task in the list
	const addTaskHandler = () => {
		if (newTodo.trim() === "") {
			setWarning("Please Enter a valid Task!");
		} else {
			const newTask = { task: newTodo, id: uuidv4() }; // Create task with ID
			setTask((prevTask) => [...prevTask, newTask]);
			setNewTodo("");
			setWarning("");
			setCheckboxes((prev) => ({ ...prev, [newTask.id]: false }));//initialize the checkbox unchecked
		}
	};

	//Deleting the task using filter
	const deleteHandler = (id) => {
		setTask((prevTask) => prevTask.filter((task) => task.id !== id));
		setCheckboxes((prev) => {
			const updated = { ...prev };
			delete updated[id]; // Remove checkbox state for deleted task
			return updated;
		});
	};

	const changeValue = (e) => {
		setNewTodo(e.target.value);
		setWarning("");
	};
	const [checkboxes, setCheckboxes] = useState({});

	const toggleCheckboxes = (id) => {
		setCheckboxes((prev) => ({
			...prev,
			[id]: !prev[id], // Toggle checkbox state for specific task ID
		}));
	};

	return (
		<div className="bg-linear-to-b from-slate-400 to to-slate-900/80 min-h-screen  w-full flex justify-center ">
			<div className="bg-stone-300 h-full my-20 max-w-150 py-5 px-3 rounded-2xl md:px-10 overflow-y-auto ">
				<h1 className="text-center p-2  mb-5 bg-linear-to-r from-pink-500 to-violet-500 bg-clip-text text-3xl font-extrabold text-transparent">
					To Do List App
				</h1>
				<div className="flex items-center">
					<input
						className="bg-zinc-500/40 pl-5 text-xl font-semibold placeholder:text-zinc-600  focus:bg-white  rounded  border-zinc-400 hover:bg-zinc-400  border placeholder:[text-lg] outline-0 caret-red-500 focus:border-pink-400 mr-3 mb-2 h-9"
						type="text"
						placeholder="Enter task"
						maxLength={40}
						value={newTodo}
						onChange={changeValue}
						onKeyDown={(keydown) => {
							if (keydown.key === "Enter") addTaskHandler();
						}}
					/>
					<button
						onClick={addTaskHandler}
						className={`bg-blue-400 text-sm font-semibold hover:bg-blue-500 text-zinc-200 px-2 py-1 -translate-y-1 rounded-md cursor-pointer  `}
					>
						Add
					</button>
				</div>

				<div>
					<h1 className="text-red-600 -translate-y-2 pl-2 font-semibold">
						{warning}
					</h1>
				</div>
				{/*Here the task list is added */}
				{task.map((item) => (
					<div key={item.id}>
						<ul className="flex items-center pl-3">
							<input
								onChange={() => toggleCheckboxes(item.id)}
								className="h-5 w-5 mr-2  accent-pink-500 "
								type="checkbox"
							/>
							<li
								className={`truncate capitalize mb-4 text-2xl font-semibold translate-y-2 ${
									checkboxes[item.id]
										? "line-through decoration-rose-500 decoration-5"
										: ""
								}  ${styles.eagle} `}
							>
								{item.task}
							</li>
							<button
								onClick={() => deleteHandler(item.id)}
								className="bg-red-700/90 rounded-lg px-2 py-0.5 ml-3 outline outline-zinc-700/50 text-zinc-200 font-semibold cursor-pointer"
							>
								Delete
							</button>
						</ul>
					</div>
				))}
			</div>
		</div>
	);
};

export default App;
