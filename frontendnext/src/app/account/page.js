"use client";

import { useState, useEffect } from "react";

import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
//
import { URLs } from './allauth/lib/allauth'
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
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// app/page.js
//export const metadata = {
//    title: 'Next/Django Demo - Account',
//};
//
function Button (props) {
    return <button className='btn btn-primary' {...props}>{props.children}</button>
}
//
const useSessionStorage = (name) => {
  //Custome Hook found in https://stackoverflow.com/a/68847097/364088
  const [value, setValue] = useState('')
  useEffect(() => {
    setValue(sessionStorage.getItem(name))
  }, [])
  return value
}
//
export default function Home() {
    function useSessionStorage(key) {
        const [value, setValue] = useState(null);

        useEffect(() => {
              if (typeof window !== 'undefined') {
                      setValue(sessionStorage.getItem(key));
                    }
            }, [key]);

        return value;
    }
    //
    function useSafeStorage(key, initialValue) {
        const [storedValue, setStoredValue] = useState(() => {
              try {
                      const item = window.localStorage.getItem(key);
                      return item ? JSON.parse(item) : initialValue;
                    } catch (error) {
                            console.warn(`Error reading key "${key}" from localStorage`, error);
                            return initialValue;
                          }
            });

        const setValue = (value) => {
              try {
                      const valueToStore = value instanceof Function ? value(storedValue) : value;
                      setStoredValue(valueToStore);
                      window.localStorage.setItem(key, JSON.stringify(valueToStore));
                    } catch (error) {
                            console.warn(`Error setting key "${key}" to localStorage`, error);
                          }
            };

        const removeValue = () => {
              try {
                      window.localStorage.removeItem(key);
                      setStoredValue(initialValue);
                    } catch (error) {
                            console.warn(`Error removing key "${key}" from localStorage`, error);
                          }
            };

        return [storedValue, setValue, removeValue];
    }
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
              <Button onClick={() => redirectToProvider(provider.id, props.callbackURL, props.process)}>{provider.name}</Button>
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
