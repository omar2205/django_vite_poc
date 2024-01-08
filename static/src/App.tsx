import { EventHandler, FormEventHandler, useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/public/vite.svg'
import './App.css'

import React from 'react'
import { getCookie } from './utils';

function rand_str(n = 8) {
  let result = "";

  let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < n; i++) {
 
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
 
  return result;
}

function ResultRender({res}) {
  return <div className='result'>
    <h3>{res.title}</h3>
    <p>{res.description}</p>
  </div>
}

function App() {
  const [res, setRes] = useState([])
  async function handle_submit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const q = form.elements['q'].value
    
    const res = await fetch('/search?q='+q, {
      method: 'POST',
      headers: {
        'X-CSRFToken': getCookie('csrftoken') || '',
      }
    })
      .then(r => r.json())

    if (res.error) return

    setRes(res.results)
  }
  return (
    <>
      <form onSubmit={handle_submit}>
        <input type="text" name="q" placeholder="Search..." />
        <button>Search</button>
      </form>
      <div className="results">
        {res.map(r => <ResultRender key={rand_str(12)} res={r} />)}
      </div>
    </>
  )
}

export default App
