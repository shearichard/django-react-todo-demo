import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
// app/page.js
export const metadata = {
    title: 'Next/Django Demo - Auth',
};
export default function Home() {
    return (
        <div className="d-flex flex-column min-vh-100">
            {/* Navbar */}
            <Navbar />
            {/* Main Content */}
            <div className="container mt-5 flex-grow-1">
                <div className="jumbotron">
                    <h1 className="display-4">Authentication Diagnostics</h1>
                    <p className="lead">
                    </p>
                </div>
            </div>
            {/* Footer */}
            <Footer />
        </div>
    );
}
