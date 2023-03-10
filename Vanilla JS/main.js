window.addEventListener('load', () => {
	tasks = JSON.parse(localStorage.getItem('tasks')) || [];
	const newTaskForm = document.querySelector('#new-task');

	newTaskForm.addEventListener('submit', e => {
		e.preventDefault();

		const task = {
			content: e.target.elements.content.value,
			done: false,
			createdAt: new Date().getTime()
		}

		tasks.push(task);

		localStorage.setItem('tasks', JSON.stringify(tasks));

		// Reset the form
		e.target.reset();

		DisplayTasks()
	})

	DisplayTasks()
})

function DisplayTasks () {
	const tasksList = document.querySelector('#tasks-list');
	tasksList.innerHTML = "";

	tasks.forEach(task => {
		const taskItem = document.createElement('div');
		taskItem.classList.add('todo-item');

		const label = document.createElement('label');
		const input = document.createElement('input');
		const span = document.createElement('span');
		const content = document.createElement('div');
		const actions = document.createElement('div');
		const edit = document.createElement('button');
		const deleteButton = document.createElement('button');

		input.type = 'checkbox';
		input.checked = task.done;
		span.classList;
		content.classList.add('todo-content');
		actions.classList.add('actions');
		edit.classList.add('edit');
		deleteButton.classList.add('delete');

		content.innerHTML = `<input type="text" value="${task.content}" readonly>`;
		edit.innerHTML = '✎';
		deleteButton.innerHTML = '✖';

		label.appendChild(input);
		label.appendChild(span);
		actions.appendChild(edit);
		actions.appendChild(deleteButton);
		taskItem.appendChild(label);
		taskItem.appendChild(content);
		taskItem.appendChild(actions);

		tasksList.appendChild(taskItem);

		if (task.done) {
			taskItem.classList.add('done');
		}
		
		input.addEventListener('change', (e) => {
			task.done = e.target.checked;
			localStorage.setItem('tasks', JSON.stringify(tasks));

			if (task.done) {
				taskItem.classList.add('done');
			} else {
				taskItem.classList.remove('done');
			}

			DisplayTasks()

		})

		edit.addEventListener('click', (e) => {
			const input = content.querySelector('input');
			input.removeAttribute('readonly');
			input.focus();
			input.addEventListener('blur', (e) => {
				input.setAttribute('readonly', true);
				task.content = e.target.value;
				localStorage.setItem('tasks', JSON.stringify(tasks));
				DisplayTasks()

			})
		})

		deleteButton.addEventListener('click', (e) => {
			tasks = tasks.filter(t => t != task);
			localStorage.setItem('tasks', JSON.stringify(tasks));
			DisplayTasks()
		})

	})
}