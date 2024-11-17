import { Component } from 'react';

import Todo from './Todo';

class TodoList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { todos } = this.props;

    return (
      <section>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              <Todo {...{ todo, ...this.props }} />
            </li>
          ))}
        </ul>
      </section>
    );
  }
}

export default TodoList;
