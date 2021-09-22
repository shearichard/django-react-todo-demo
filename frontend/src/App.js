// frontend/src/App.js
import React, { Component } from "react";
import Modal from "./components/Modal";
import DjangoLogo from "./components/DjangoLogo";
import ReactLogo from "./components/ReactLogo";
import InfoCircle from "./components/InfoCircle";
import Github from "./components/Github";
import axios from "axios";

class App extends Component {
  constructor(props) {
	super(props);
	this.state = {
	  viewCompleted: false,
	  activeItem: {
		title: "",
		description: "",
		completed: false
	  },
	  todoList: []
	};
  }
  componentDidMount() {
	this.refreshList();
  }
  refreshList = () => {
	axios
	  .get("http://localhost:8000/api/todos/")
	  .then(res => this.setState({ todoList: res.data }))
	  .catch(err => console.log(err));
  };
  displayCompleted = status => {
	if (status) {
	  return this.setState({ viewCompleted: true });
	}
	return this.setState({ viewCompleted: false });
  };
  renderTabList = () => {
	return (
	  <div className="my-5 tab-list">
		<span
		  onClick={() => this.displayCompleted(true)}
		  className={this.state.viewCompleted ? "active" : ""}
		>
		  complete
		</span>
		<span
		  onClick={() => this.displayCompleted(false)}
		  className={this.state.viewCompleted ? "" : "active"}
		>
		  Incomplete
		</span>
	  </div>
	);
  };
  renderItems = () => {
	const { viewCompleted } = this.state;
	const newItems = this.state.todoList.filter(
	  item => item.completed === viewCompleted
	);
	return newItems.map(item => (
	  <li
		key={item.id}
		className="list-group-item d-flex justify-content-between align-items-center"
	  >
		<span
		  className={`todo-title mr-2 ${
			this.state.viewCompleted ? "completed-todo" : ""
		  }`}
		  title={item.description}
		>
		  {item.title}
		</span>
		<span>
		  <button
			onClick={() => this.editItem(item)}
			className="btn btn-secondary mr-2"
		  >
			{" "}
			Edit{" "}
		  </button>
		  <button
			onClick={() => this.handleDelete(item)}
			className="btn btn-danger"
		  >
			Delete{" "}
		  </button>
		</span>
	  </li>
	));
  };
  toggle = () => {
	this.setState({ modal: !this.state.modal });
  };
  handleSubmit = item => {
	this.toggle();
	if (item.id) {
	  axios
		.put(`http://localhost:8000/api/todos/${item.id}/`, item)
		.then(res => this.refreshList());
	  return;
	}
	axios
	  .post("http://localhost:8000/api/todos/", item)
	  .then(res => this.refreshList());
  };
  handleDelete = item => {
	axios
	  .delete(`http://localhost:8000/api/todos/${item.id}`)
	  .then(res => this.refreshList());
  };
  createItem = () => {
	const item = { title: "", description: "", completed: false };
	this.setState({ activeItem: item, modal: !this.state.modal });
  };
  editItem = item => {
	this.setState({ activeItem: item, modal: !this.state.modal });
  };
  render() {
    const tableStyle = {
        align: "center",
        margin: "auto",
        width: "50%",
    }
    const floatRight = {
        float: "right",
        margin: "auto",
    }
    const tweakHeader = {
        display:"inherit",
    }
	return (
	  <main className="content bgdefined">
        <table style={tableStyle}>
            <tr>
                <td>
                    <ReactLogo height="5em" width="5em"  />
                    &nbsp;
                    <DjangoLogo height="8em" width="5em"  />
                </td>
                <td>
                    <span style={floatRight}><InfoCircle height="2em" width="2em" /></span>
                    &nbsp;
                    <span style={floatRight}><Github height="2em" width="2em" /></span>
                </td>
            </tr>
            <tr>
                <td colSpan={2}>
                    <h2 className="text-grey text-uppercase text-center my-4" style={tweakHeader}>React/Django Demonstrator</h2>
                    <h3 className="text-grey text-uppercase text-left my-4">Todos</h3>
                </td>
            </tr>
        </table>
		<div className="row ">
		  <div className="col-md-6 col-sm-10 mx-auto p-0">
			<div className="card p-3">
			  <div className="">
				<button onClick={this.createItem} className="btn btn-primary">
				  Add task
				</button>
			  </div>
			  {this.renderTabList()}
			  <ul className="list-group list-group-flush">
				{this.renderItems()}
			  </ul>
			</div>
		  </div>
		</div>
		{this.state.modal ? (
		  <Modal
			activeItem={this.state.activeItem}
			toggle={this.toggle}
			onSave={this.handleSubmit}
		  />
		) : null}
	  </main>
	);
  }
}
export default App;
