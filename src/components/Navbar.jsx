import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    const [currentPage,setCurrentPage] = useState('new')

    const inactive = 'nav-link'
    const active = 'nav-link active'

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container-fluid">
                <a className="navbar-brand">Parley</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link 
                            to={'/new'} 
                            onClick={() => setCurrentPage('new')} 
                            className={currentPage === 'new' ? active : inactive}
                            >Crear Parley</Link>
                    </li>
                    <li className="nav-item">
                        <Link 
                            onClick={() => setCurrentPage('list')} 
                            className={currentPage === 'list' ? active: inactive}
                            to={'/list'} 
                           >Lista</Link>
                    </li>
                </ul>
                </div>
            </div>
        </nav>
    )
}
export default Navbar;