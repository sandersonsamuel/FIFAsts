import { Navbar } from "react-bootstrap"
import { auth } from "../configs/FireBase"
import { signOut } from 'firebase/auth'
import '../App.css'
function NavBar(){

    const logOut = async() => {
        try {
            await signOut(auth)
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <>
            <Navbar expand="lg" bg="light" className="w-100 p-3 my-1 px-3 px-md-5 bg-dark text-end justify-content-between">
                <div className="d-flex align-items-center gap-3">
                    <img src={auth.currentUser.photoURL} alt="img do usuário" style={{width: 40}}/>
                    <h4 className="m-0">{auth.currentUser.displayName}</h4>
                </div>

                <button onClick={logOut} className="btn btn-danger">Sair</button>
            </Navbar>
        </>
    )
}

export default NavBar