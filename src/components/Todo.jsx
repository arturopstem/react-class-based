import { Component } from 'react';

import '../styles/Todo.css';

class Todo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todoMode: 'display',
      inputVal: props.todo.task,
      saveBtnDisabled: true,
    };

    this.setTodoMode = this.setTodoMode.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.handleTodoInputChange = this.handleTodoInputChange.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
    this.confirmEdit = this.confirmEdit.bind(this);
  }

  setTodoMode(nextMode) {
    this.setState((state) => ({
      ...state,
      todoMode: nextMode,
    }));
  }

  deleteTodo(todoId) {
    const { todos, setTodos } = this.props;
    const nextTodos = todos.filter((todo) => todo.id !== todoId);

    setTodos(nextTodos);
  }

  handleTodoInputChange(e) {
    const { task } = this.props.todo;
    const nextInputVal = e.target.value;
    const trimmedVal = e.target.value.trim();

    this.setState((state) => ({
      ...state,
      inputVal: nextInputVal,
      saveBtnDisabled: trimmedVal === task || !trimmedVal,
    }));
  }

  cancelEdit() {
    this.setState((state) => ({
      ...state,
      inputVal: this.props.todo.task,
      saveBtnDisabled: true,
    }));
    this.setTodoMode('display');
  }

  confirmEdit(e) {
    e.preventDefault();

    const nextTask = this.state.inputVal.trim();

    if (!nextTask) {
      return;
    }

    const { todos, setTodos } = this.props;
    const todoId = this.props.todo.id;

    const nextTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        const nextTodo = { ...todo, task: nextTask };

        return nextTodo;
      }
      return todo;
    });

    setTodos(nextTodos);
    this.setTodoMode('display');
    this.setState((state) => ({
      ...state,
      inputVal: nextTask,
      saveBtnDisabled: true,
    }));
  }

  render() {
    const { todoMode, inputVal, saveBtnDisabled } = this.state;
    const { todo } = this.props;

    let todoContent = <></>;
    switch (todoMode) {
      case 'display':
        todoContent = (
          <div className="todo">
            <p className="todo__task todo__task--text">{todo.task}</p>
            <menu className="todo__menu">
              <li>
                <button
                  className="todo__button"
                  onClick={() => this.setTodoMode('edit')}
                >
                  Edit
                </button>
              </li>
              <li>
                <button
                  className="todo__button"
                  onClick={() => this.setTodoMode('delete')}
                >
                  Delete
                </button>
              </li>
            </menu>
          </div>
        );
        break;
      case 'edit':
        todoContent = (
          <form onSubmit={this.confirmEdit} className="todo">
            <input
              type="text"
              value={inputVal}
              onChange={this.handleTodoInputChange}
              autoComplete="off"
              className="todo__task todo__task--input"
            />
            <menu className="todo__menu">
              <li>
                <button
                  className="todo__button"
                  type="submit"
                  disabled={saveBtnDisabled}
                >
                  Save
                </button>
              </li>
              <li>
                <button
                  className="todo__button"
                  type="button"
                  onClick={this.cancelEdit}
                >
                  Cancel
                </button>
              </li>
            </menu>
          </form>
        );
        break;
      case 'delete':
        todoContent = (
          <div className="todo">
            <p className="todo__task todo__task--text">{todo.task}</p>
            <menu className="todo__menu">
              <li>
                <button
                  className="todo__button"
                  onClick={() => this.deleteTodo(todo.id)}
                >
                  Yes
                </button>
              </li>
              <li>
                <button
                  className="todo__button"
                  onClick={() => this.setTodoMode('display')}
                >
                  No
                </button>
              </li>
            </menu>
          </div>
        );
        break;
    }

    return todoContent;
  }
}

export default Todo;
