// app/layout.js

// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <link
                    href="https://cdnjs.cloudflare.com/ajax/libs/bootswatch/5.3.0/sandstone/bootstrap.min.css"
                    rel="stylesheet"
                />
            </head>
            <body>{children}</body>
        </html>
    );
}
