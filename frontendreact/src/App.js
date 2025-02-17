import './App.css';
import Navbar from "./components/Navbar";
//import Footer from "./components/Footer";

function App() {
  return (
        <div className="d-flex flex-column min-vh-100">
            {/* Navbar */}
            <Navbar />
            {/* Main Content */}
            <div className="container mt-5 flex-grow-1">
                <div className="jumbotron">
                    <h1 className="display-4">OAuth for React/Django</h1>
                    <p className="lead">
                        This is a 'todo' app to demonstrate the use of OAuth in a React/Django app. 
                    </p>
                    <p>
                        See the project at <a href="https://github.com/shearichard/django-react-todo-demo">django-react-todo-demo</a>.
                    </p>
                </div>
            </div>
            {/* Footer */}
        </div>
  );
}

export default App;
