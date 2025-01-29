import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
//
const providers = [
  {
    "id": "google",
    "name": "Google",
    "flows": [
      "provider_redirect",
      "provider_token"
    ],
    "client_id": "334473157276-dfcfkioh8bmj9mc9mrtb3b59skdgh3cr.apps.googleusercontent.com"
  },
]

// app/page.js
export const metadata = {
    title: 'Next/Django Demo - Account',
};
export default function Home() {
    return (
        <div className="d-flex flex-column min-vh-100">
            {/* Navbar */}
            <Navbar />
            {/* Main Content */}
            <div className="container mt-5 flex-grow-1">
                <div className="jumbotron">
                    <h1 className="display-4">Authentication</h1>
                    <p className="lead">

                    </p>
                    <OptionsPanel />
                </div>
            </div>
            {/* Footer */}
            <Footer />
        </div>
    );
}
//
function OptionsPanel() {
  const hasProviders = true; 
  return (
    <>
    <h3>Social OAuth Providers</h3>
    {hasProviders
      ? <>
        <ProviderList callbackURL='/account/provider/callback' />
      </>
      : <p>There are no configured Social Auth Providers</p>}
    </>
  )
}
//
function ProviderList (props) {
  return (
    <>
      <ul>
        {providers.map(provider => {
          return (
            <li key={provider.id}>
              {/*
              <Button onClick={() => redirectToProvider(provider.id, props.callbackURL, props.process)}>{provider.name}</Button>
              */}
              <ul>{provider.client_id}</ul>
            </li>
          )
        })}
      </ul>
    </>
  )
}
//
const AuthProcess = Object.freeze({
  LOGIN: 'login',
  CONNECT: 'connect'
})
//
function postForm (action, data) {
  const f = document.createElement('form')
  f.method = 'POST'
  f.action = action

  for (const key in data) {
    const d = document.createElement('input')
    d.type = 'hidden'
    d.name = key
    d.value = data[key]
    f.appendChild(d)
  }
  document.body.appendChild(f)
  f.submit()
}
//
function redirectToProvider (providerId, callbackURL, process = AuthProcess.LOGIN) {
  postForm(URLs.REDIRECT_TO_PROVIDER, {
    provider: providerId,
    process,
    callback_url: callbackURL,
    csrfmiddlewaretoken: getCSRFToken()
  })
}
//
