import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
// app/page.js
export const metadata = {
    title: 'Next/Django Demo - Index',
};
export default function Home() {
    return (
        <div className="d-flex flex-column min-vh-100">
	{/* Navbar */}
	<Navbar />
            {/* Main Content */}
            <div className="container mt-5 flex-grow-1">
                <div className="jumbotron">
                    <h1 className="display-4">Welcome to frontendnext App!</h1>
                    <p className="lead">
                        This is a Foo.
                    </p>
                    <hr className="my-4" />
                    <p>
                        Explore the features of this app and enjoy a stylish experience thanks to Bootstrap
                        and Bootswatch's Sandstone theme.
                    </p>
                </div>
            </div>
            {/* Footer */}
	    <Footer />
        </div>
    );
}
