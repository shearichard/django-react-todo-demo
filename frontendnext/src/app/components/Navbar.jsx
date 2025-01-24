"use client";

import styles from "../page.module.css";
export default function Navbar() {
	    return (
		            <nav className="navbar bg-primary" data-bs-theme="dark">
		                <div className="container">
		                    <a className="navbar-brand" href="/">Next/Django Demo</a>
		                    <ul className="navbar-nav ms-auto d-flex flex-row">
		                        <li className="nav-item me-3">
		                            <a className="nav-link" href="/">Home</a>
		                        </li>
		                        <li className="nav-item me-3">
		                            <a className="nav-link" href="/mytodos">My Todos</a>
		                        </li>
		                        <li className="nav-item me-3">
		                            <a className="nav-link" href="/about">About</a>
		                        </li>
		                        <li className="nav-item me-3">
		                            <a className="nav-link" href="/authdiagnostics">Authentication</a>
		                        </li>
		                    </ul>
		                </div>
		            </nav>
		        );
}

