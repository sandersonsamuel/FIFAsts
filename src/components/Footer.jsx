import LogoFFsts from '../assets/LOGO_FFsts.svg'

function Footer(){

    return(
        
    <footer className="d-flex flex-wrap justify-content-between align-items-center p-5 mt-5 border-top bg-dark text-light">
        <div className="col-md-4">
            <a href="#" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
                <img className="bi" width="100" src={LogoFFsts}></img>
            </a>
        </div>

        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
            <li className="ms-3"><a className="text-muted" href="https://github.com/sandersonsamuel"><i className="fa-brands fa-github fa-2xl" style={{color: "#ffffff"}}></i></a></li>
        </ul>
    </footer>
    )
}

export default Footer