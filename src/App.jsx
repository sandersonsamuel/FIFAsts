import { useState, useEffect } from 'react'
import { auth } from './configs/FireBase'
import './App.css'
import Login from './components/Login'
import Home from './Home'

function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      {
        user === null? (
          <Login/>
        ): (<Home/>)
      }
    </>
  )
}

export default App
