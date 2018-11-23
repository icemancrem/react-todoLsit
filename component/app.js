(function (React){
    const todos = [
      {id: 1, title: '敲代码', completed: true},
      {id: 2, title: '敲代码', completed: false},
      {id: 3, title: '敲代码', completed: true}
    ]
  window.App = class extends React.Component{
    constructor () {
      super()
      this.state = {
        todos
      }
    }
    render(){
      return (
        <div>
          <section className="todoapp">
            <header className="header">
              <h1>todos</h1>
              <input 
              onKeyDown={this.handleNewTodoKeyDown.bind(this)}
              className="new-todo" placeholder="What needs to be done?" autoFocus />
            </header>
            {/* 判断是否有数据 */}
            {
              this.state.todos.length > 0 && (
                <div>
                  <section className="main">
                    <input id="toggle-all" className="toggle-all" type="checkbox" />
                    <label htmlFor="toggle-all">Mark all as complete</label>
                    <ul className="todo-list">
                      {this.getTodoList()}
                    </ul>
                  </section>
                  <footer className="footer">
                    <span className="todo-count"><strong>0</strong> item left</span>
                    <ul className="filters">
                      <li>
                        <a className="selected" href="#/">All</a>
                      </li>
                      <li>
                        <a href="#/active">Active</a>
                      </li>
                      <li>
                        <a href="#/completed">Completed</a>
                      </li>
                    </ul>
                    <button className="clear-completed">Clear completed</button>
                  </footer>
                </div>
              ) 
            }
          </section>
          <footer className="info">
            <p>Double-click to edit a todo</p>
            <p>Template by <a href="http://sindresorhus.com">Sindre Sorhus</a></p>
            <p>Created by <a href="http://todomvc.com">you</a></p>
            <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
          </footer>
        </div>
      )
    }
    // 遍历数组 返回一个li
    getTodoList () {
      return this.state.todos.map(todo => {
        return (
          <li className="completed" key={todo.id}>
            <div className="view">
              <input className="toggle" type="checkbox" defaultChecked />
              <label>{todo.title}</label>
              <button className="destroy"></button>
            </div>
            <input className="edit" defaultValue="Create a TodoMVC template" />
          </li>
        )
      })
    }
    // 加入新action的功能
    handleNewTodoKeyDown (event) {
      const {target, keyCode} = event
      if (keyCode != 13) {
        return
      }
      const inputText = target.value.trim()
      if (!inputText.length) {
        return
      }
      const lastTodos = this.state.todos[this.state.todos.length - 1]
      // 往数组里面加数据 这里不会触发视图更新
      this.state.todos.push({
        id: lastTodos ? lastTodos.id + 1 : 1,
        title: inputText,
        completed: false
      })
      // 通知视图更新
      this.setState({
        todos: this.state.todos
      })
      // 清空input
      target.value = ''    
    }
  }
})(React)