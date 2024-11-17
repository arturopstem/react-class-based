import { Component } from 'react';

import TodosCounter from './components/TodosCounter';
import TodosForm from './components/TodosForm';
import TodoList from './components/TodosList';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [],
    };

    this.setTodos = this.setTodos.bind(this);
  }

  setTodos(nextTodos) {
    this.setState((state) => ({
      ...state,
      todos: nextTodos,
    }));
  }

  render() {
    const { todos } = this.state;
    const { setTodos } = this;

    return (
      <>
        <header>
          <h1>To-Do</h1>
        </header>
        <main>
          <TodosForm {...{ todos, setTodos }} />
          <TodosCounter {...{ todos }} />
          <TodoList {...{ todos, setTodos }} />
        </main>
        <footer></footer>
      </>
    );
  }
}

export default App;
