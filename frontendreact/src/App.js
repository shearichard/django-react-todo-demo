import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from "./components/Navbar";
import About from "./about/page";
import MyToDos from "./mytodos/page";
import AuthDiagnostics from "./mytodos/page";
//import Footer from "./components/Footer";

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/mytodos" element={<MyToDos />} />
        <Route path="/authdiagnostics" element={<AuthDiagnostics />} />
      </Routes>
    </Router>
  )
}
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
function Home() {
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
  )
}

export default App;
