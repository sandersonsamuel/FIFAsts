import { useState, useEffect } from 'react'
import AddSts from './AddSts'
import { auth } from './configs/FireBase'
import './App.css'
import Login from './Login'

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
        ): (<AddSts/>)
      }
    </>
  )
}

export default App
