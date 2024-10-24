import Image from "next/image";
import styles from "./page.module.css";
// app/page.js

export default function Home() {
    return (
        <div className="d-flex flex-column min-vh-100">
            {/* Navbar */}
            {/*
            <nav className="navbar navbar-expand-lg navbar-dark">
            */}
	    <nav className="navbar bg-primary" data-bs-theme="dark">
                <div className="container">
                    <a className="navbar-brand" href="#">My Next.js App</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Features</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Contact</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="container mt-5 flex-grow-1">
                <div className="jumbotron">
                    <h1 className="display-4">Welcome to frontendnext App!</h1>
                    <p className="lead">
                        This is a simple Jumbotron component styled with Bootstrap's Sandstone theme.
                    </p>
                    <hr className="my-4" />
                    <p>
                        Explore the features of this app and enjoy a stylish experience thanks to Bootstrap
                        and Bootswatch's Sandstone theme.
                    </p>
                </div>
		    {false &&
		    <div>
			<a href="#" className="btn btn-primary">Primary</a>
			<a href="#" className="btn btn-secondary">Secondary</a>
			<a href="#" className="btn btn-success">Success</a>
			<a href="#" className="btn btn-info">Info</a>
			<a href="#" className="btn btn-warning">Warning</a>
			<a href="#" className="btn btn-danger">Danger</a>
		    </div>
	    }
	    {false &&
	    <div className="alert alert-dismissible alert-warning">
	      <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
	      <h4 className="alert-heading">Warning!</h4>
	      <p className="mb-0">Best check yo self, you're not looking too good. Nulla vitae elit libero, a pharetra augue. Praesent commodo cursus magna, <a href="#" className="alert-link">vel scelerisque nisl consectetur et</a>.</p>
	    </div>
	    }


<table className="table table-hover">
	      <thead>
	        <tr>
	          <th scope="col">Type</th>
	          <th scope="col">Column heading</th>
	          <th scope="col">Column heading</th>
	          <th scope="col">Column heading</th>
	        </tr>
	      </thead>
	      <tbody>
	        <tr className="table-active">
	          <th scope="row">Active</th>
	          <td>Column content</td>
	          <td>Column content</td>
	          <td>Column content</td>
	        </tr>
	        <tr>
	          <th scope="row">Default</th>
	          <td>Column content</td>
	          <td>Column content</td>
	          <td>Column content</td>
    </tr>
    <tr className="table-primary">
      <th scope="row">Primary</th>
      <td>Column content</td>
      <td>Column content</td>
      <td>Column content</td>
    </tr>
    <tr className="table-secondary">
      <th scope="row">Secondary</th>
      <td>Column content</td>
      <td>Column content</td>
      <td>Column content</td>
    </tr>
    <tr className="table-success">
      <th scope="row">Success</th>
      <td>Column content</td>
      <td>Column content</td>
      <td>Column content</td>
    </tr>
	        <tr className="table-danger">
	          <th scope="row">Danger</th>
      <td>Column content</td>
      <td>Column content</td>
      <td>Column content</td>
    </tr>
    <tr className="table-warning">
      <th scope="row">Warning</th>
      <td>Column content</td>
      <td>Column content</td>
      <td>Column content</td>
    </tr>
    <tr className="table-info">
      <th scope="row">Info</th>
      <td>Column content</td>
      <td>Column content</td>
      <td>Column content</td>
    </tr>
    <tr className="table-light">
      <th scope="row">Light</th>
      <td>Column content</td>
      <td>Column content</td>
      <td>Column content</td>
    </tr>
    <tr className="table-dark">
      <th scope="row">Dark</th>
      <td>Column content</td>
      <td>Column content</td>
      <td>Column content</td>
    </tr>
  </tbody>
</table>



            </div>





            {/* Footer */}
            {/*
            <footer className="bg-dark text-white text-center py-3 mt-auto" data-bs-theme="dark">
		*/}
	     <footer className="bg-primary text-white text-center py-3 mt-auto">
                <div className="container">
                    <p className="mb-0">© 2024 My Next.js App. All rights reserved.</p>
                    <p className="mb-0">Random footer text goes here.</p>
                </div>
            </footer>
        </div>
    );
}
/*

export default function Home() {
    return (
        <div className="container mt-5">
            <div className="jumbotron">
                <h1 className="display-4">Welcome to My Next.js App!</h1>
                <p className="lead">
                    This is a simple Jumbotron component styled with Bootstrap's Sandstone theme.
                </p>
                <hr className="my-4" />
                <p>
                    Explore the features of this app and enjoy a stylish experience thanks to Bootstrap
                    and Bootswatch's Sandstone theme.
                </p>
            </div>
        </div>
    );
}
*/

/*
export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol>
          <li>
            Get started by editing <code>src/app/page.js</code>.
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

        <div className={styles.ctas}>
          <a
            className={styles.primary}
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className={styles.logo}
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondary}
          >
            Read our docs
          </a>
        </div>
      </main>
      <footer className={styles.footer}>
        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
*/
