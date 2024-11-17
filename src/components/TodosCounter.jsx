import { Component } from 'react';

class TodosCounter extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { todos } = this.props;

    if (!todos) {
      return null;
    }

    return <p>ToDos: {todos.length}</p>;
  }
}

export default TodosCounter;
