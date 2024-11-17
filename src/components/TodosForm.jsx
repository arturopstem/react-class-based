import { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';

class TodosForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputVal: '',
      btnDisabled: true,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(e) {
    const isInputEmpty = !e.target.value.trim();

    this.setState((state) => ({
      ...state,
      inputVal: e.target.value,
      btnDisabled: isInputEmpty,
    }));
  }

  handleSubmit(e) {
    e.preventDefault();
    const newTodo = { id: uuidv4(), task: this.state.inputVal };
    const nextTodos = [...this.props.todos];

    nextTodos.push(newTodo);
    this.props.setTodos(nextTodos);
    this.setState((state) => ({ ...state, inputVal: '', btnDisabled: true }));
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="task-entry">Enter a task: </label>
        <input
          type="text"
          id="task-entry"
          name="task-entry"
          value={this.state.inputVal}
          onChange={this.handleInputChange}
          autoComplete="off"
        />
        <button type="submit" disabled={this.state.btnDisabled}>
          Add
        </button>
      </form>
    );
  }
}

export default TodosForm;
