const ToDo = () => {
    const [tasks, setTasks] = React.useState([]);
    const [inputValue, setInputValue] = React.useState('');
    const [editingTask, setEditingTask] = React.useState(null);
  
    // Load tasks from local storage on initial render
    React.useEffect(() => {
      const storedTasks = window.localStorage.getItem('tasks');
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    }, []);
  
    // Save tasks to local storage when the tasks array changes
    React.useEffect(() => {
      window.localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);
  
    const handleSubmit = (event) => {
        event.preventDefault();
        setTasks([...tasks, { text: inputValue, completed: false }]);
        setInputValue('');
      };
    
      const handleChange = (event) => {
        setInputValue(event.target.value);
      };
    
      const handleDelete = (index) => {
        const newTasks = [...tasks];
        newTasks.splice(index, 1);
        setTasks(newTasks);
      };
    
      const handleEdit = (index) => {
        setEditingTask(index);
      };
    
      const handleCancel = () => {
        setEditingTask(null);
      };
    
      const handleSave = (index, value) => {
        const newTasks = [...tasks];
        newTasks[index] = value;
        setTasks(newTasks);
        setEditingTask(null);
      };
    
      const handleComplete = (index) => {
        const newTasks = [...tasks];
        newTasks[index] = { ...newTasks[index], completed: !newTasks[index].completed };
        setTasks(newTasks);
      };
    
      return React.createElement('div', {},
        React.createElement('form', { onSubmit: handleSubmit },
          React.createElement('input', { type: 'text', placeholder: 'New Task', value: inputValue, onChange: handleChange }),
          React.createElement('button', { type: 'submit' }, '+')
        ),
        React.createElement('h3', {}, 'YOUR TODO LIST :'),
        React.createElement('ul', {}, tasks.map((task, index) =>
          editingTask === index ?
            React.createElement('li', {},
              React.createElement('input', { type: 'text', defaultValue: task.text, onBlur: (event) => handleSave(index, { ...task, text: event.target.value }) }),
              React.createElement('button', { onClick: handleCancel }, 'Cancel')
            ) :
            React.createElement('li', { style: { textDecoration: task.completed ? 'line-through' : 'none' } },
              React.createElement('input', { type: 'checkbox', checked: task.completed, onChange: () => handleComplete(index) }),
              task.text,
              React.createElement('button', { className: 'buttons', onClick: () => handleEdit(index) }, 'Edit'),
              React.createElement('button', { className: 'buttonss', onClick: () => handleDelete(index) }, 'X')
            )
        ))
      );
    };
    
    ReactDOM.render(React.createElement(ToDo), document.getElementById('root'));
      