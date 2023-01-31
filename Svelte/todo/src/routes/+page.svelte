<!-- ToDo App created by Anita Aksentowicz based on mdn web docs tutorial:-->
<!-- https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Svelte_Todo_list_beginning -->
<script>
    import { onMount } from 'svelte';
  
    let todos = [];
    let currentTodo = '';
    let currentTodoText = '';
  
    onMount(async () => {
      const storedTodos = window.localStorage.getItem('todos');
      if (storedTodos) {
        todos = JSON.parse(storedTodos);
      }
    });
  
    function addTodo() {
      todos = [...todos, { text: currentTodo, completed: false }];
      saveTodos()
      currentTodo = '';
    }
  
    function removeTodo(index) {
      todos = todos.filter((_, i) => i !== index);
      saveTodos()
    }
  
    function updateTodo(index, newValue) {
      todos = todos.map((t, i) => (i === index ? { ...t, text: newValue } : t));
      saveTodos()
    }
  
    function toggleTodo(index) {
      todos = todos.map((t, i) => (i === index ? { ...t, completed: true } : t));
      saveTodos()
    }
  
    function saveTodos() {
      window.localStorage.setItem('todos', JSON.stringify(todos));
    }
  </script>
  
  <!-- CSS -->
  <style>
body{
  background-color: darkgrey;
}

    ul {
      list-style: none;
      margin: 0;
      padding: 0;
    }
  
    .completed {
      text-decoration: line-through;
    }

    .logo{
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: 8px;
  margin-bottom: 20px;
}

main{
	font: 14px 'Helvetica Neue', Helvetica, Arial, sans-serif;
	line-height: 1.4em;
	min-width: 230px;
	max-width: 550px;
	margin: 0 auto;
	-webkit-font-smoothing: antialiased;
	font-weight: 300;
}

.todoapp {
	background: white;
	margin: 30px 0 40px 0;
	padding: 15px;
	position: relative;
	box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2),
	            0 25px 50px 0 rgba(0, 0, 0, 0.1);
}

.addtask{
  width: auto;
	font-size: 1.125rem;
	padding: 1rem 1.5rem;
	background-color: #FFF;
	border-radius: 0.5rem;
	box-shadow: 0px 0px 4px;
	margin-bottom: 1.5rem;
}

.submit{
  width: auto;
	font-size: 1.125rem;
	padding: 1rem 1.5rem;
	color: white;
	background-color: orangered;
	border-radius: 0.5rem;
	margin-bottom: 1.5rem;
}

.app{
  text-align: center;
}

.buttonn{
  color: white;
    background-color: orangered;
   font-size: 15px;
   border: none;
   border-radius: 0.5rem;
    padding: 6px;
    margin-left: 5px;
}

input[type="checkbox"]{
    -ms-transform: scale(2); /* IE */
  -moz-transform: scale(2); /* FF */
  -webkit-transform: scale(2); /* Safari and Chrome */
  -o-transform: scale(2); /* Opera */
  transform: scale(2);
  padding: 10px;
  margin-right: 12px;
}

li{
  font-size: 20px;
  margin-bottom: 10px;
}

.list{
  text-align: left;
  margin-left: 80px;
  margin-right: 80px;
}

.info {
	margin: 65px auto 0;
	color: white;
	font-size: 10px;
	text-align: center;
}

.info p {
	line-height: 1;
}

.info a {
	color: inherit;
	text-decoration: none;
	font-weight: 400;
}

.info a:hover {
	text-decoration: underline;
}

.right{
  float:right;
	display: inline;
}

  </style>

<!-- Structure -->
  <body>
  <main>
    <section class="todoapp">
      <!-- Logo -->
      <div class="logo">
        <img src="/images/svelte.png" alt="Svelte LOGO" height="100">
        </div>
      <div class="app">
        <!-- New Task -->
  <form on:submit|preventDefault={addTodo}>
    <input type="text" bind:value={currentTodo}  class="addtask" required/>
    <button class="submit" type="submit">+</button>
  </form>
  <!-- Tasks List -->
  <h1>YOUR TODO LIST :</h1>
  <div class="list">
  <ul>
    {#each todos as todo, index}
      {#if todo.editing}
        <li class:completed={todo.completed}>
          <input type="checkbox" class="done" bind:checked={todo.completed} on:change={() => toggleTodo(index)} />
          <input type="text" bind:value={currentTodoText} on:input={() => updateTodo(index, currentTodoText)}/>
          <button type="button" class="buttonn" on:click={() => (todo.editing = false) || saveTodos()} >
            ✔
          </button>
        </li>
      {:else}
      {#if !todo.editing}
        <li on:dblclick={() => (todo.editing = true)} class:completed={todo.completed}>
          <input type="checkbox" bind:checked={todo.completed} on:change={() => toggleTodo(index)} />
          {todo.text}
          <div class="right">
          <button type="button" class="buttonn" on:click={() => (todo.editing = true)} class:completed={todo.completed}>
            ✎
          </button>
          <button type="button" class="buttonn" on:click={() => removeTodo(index)}>
            ✖
          </button>
        </div>
        </li>
        {/if}
      {/if}
    {/each}
  </ul>
</div>
</div>
</section>
<!-- Footer -->
<footer class="info">
  <p>Created by Anita Aksentowicz</p>
  <p>Based on <a href="https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Svelte_Todo_list_beginning">mdn web docs tutorial</a></p>
</footer>
</main>
</body>

  
  
  
 
  