import './App.css'
import NavBar from './components/NavBar'
import logoFFsts from './assets/LOGO_FFsts.svg'
import 'firebase/compat/database';
import DadosPartidas from './components/DadosPartidas';
import AddSts from './components/AddSts';
import Footer from './components/Footer';

function Home(){
    
    return(
        <div>
            <div className='bg-dark text-light d-flex flex-column align-items-center pb-5'>
                <NavBar/>
                <img className='my-4' src={logoFFsts} alt="Logo do Fifa stats escrito" style={{width:300}} />
                <AddSts/>
            </div>
            <DadosPartidas/>
            <Footer></Footer>
        </div>
    )
}

export default Home