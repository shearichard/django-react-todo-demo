import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
// app/page.js
export const metadata = {
    title: 'Next/Django Demo - Home',
};
export default function Home() {
    return (
        <div className="d-flex flex-column min-vh-100">
  {/* Navbar */}
  <Navbar />

            {/* Main Content */}
            <div className="container mt-5 flex-grow-1">
                <div className="jumbotron">
                    <h1 className="display-4">Welcome to the Next/Django Demo App</h1>
                    <p className="lead">
                        This is a 'todo' app to demonstrate how Next and Django can work together. 
                    </p>
                    <p>
                        See the project at <a href="https://github.com/shearichard/django-react-todo-demo">django-react-todo-demo</a>.
                    </p>
                </div>
            </div>
            {/* Footer */}
      <Footer />
        </div>
    );
}
