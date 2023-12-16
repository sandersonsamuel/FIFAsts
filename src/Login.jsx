import './App.css'
import { auth, googleProvider } from './configs/FireBase.jsx'
import { signInWithPopup } from 'firebase/auth'
import logoFFsts from './assets/LOGO_FFsts.svg'

function Login(){

    const sigInGoogle = async() => {
        try {
            await signInWithPopup(auth, googleProvider)
            console.log(auth.currentUser)
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <div className='contLogin d-flex align-items-center flex-column bg-dark text-light'>
            <img className='mt-5' src={logoFFsts} alt="Logo FIFA STATS escrito" style={{width: 600}} />
            <div className='d-flex justify-content-center align-items-center flex-column mt-5 gap-3'>
                <h1>Entre com o Google</h1>
                <button 
                onClick={sigInGoogle}
                className='btn btn-primary d-flex gap-3 btn-lg align-items-center'>
                    <i className="fa-brands fa-google"></i>Entrar
                </button>
            </div>
        </div>
    )
}

export default Login