import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import '../Navbar.css'

type NavbarProps = {
    username: string;
    isLogin: string;
    role: string;
    updateusername: (updateusername: string, jwttoken: string, isLogin: string, role: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ username, isLogin, role, updateusername }) => {

    //sticky
    const [isFixed, setIsFixed] = useState(false);

    const handleScroll = () => {
        const offset = window.scrollY;
        setIsFixed(offset > 0); // Set isFixed to true when scrolling down
    };

    const navigate = useNavigate();
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
        const Username = sessionStorage.getItem('Username');
        const Islogin = sessionStorage.getItem('islogin');
        const Role = sessionStorage.getItem('role');
    })
    const Username = sessionStorage.getItem('Username');
    let Islogin = sessionStorage.getItem('islogin');
    let Role = sessionStorage.getItem('role');
    if (Islogin === null || Islogin === undefined) {
        updateusername("", "", 'false', '');
        window.location.reload();
    }
    console.log("Session Islogin from navbar");
    console.log(Islogin);
    console.log(Username);
    console.log("Role Inside Navbar");
    console.log(role);

    const logout = () => {
        updateusername("", "", 'false', '');
        navigate('/');
    }

    //CSS FIxED
    const navbarStyle: React.CSSProperties = {
        padding: '10px',
        backgroundColor: isFixed ? '#23272b' : '#23272b',
        position: isFixed ? 'fixed' : 'static',
        top: '0',
        left: '0',
        width: '100%',
        zIndex: '1000',
    };




    return (
        <div style={navbarStyle}>
            <nav className="navbar navbar-fixed-top navbar-expand-md navbar-dark bg-dark">
                <div className="container-fluid">
                    {Islogin === 'false' && (
                        <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
                            <ul className="navbar-nav me-auto">
                                <li className="nav-item active">
                                    <a className="nav-link" href="/">Home</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/">Aboutus</a>
                                </li>
                            </ul>
                        </div>
                    )}
                    {Islogin === 'true' && (
                        <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
                            <ul className="navbar-nav me-auto">
                                <li className="nav-item active">
                                    <a className="nav-link" href="/">Home</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/CourtSearch">Courts</a>
                                </li>
                                {Role == "Admin" && (
                                    <li className="nav-item">
                                        <a className="nav-link" href="/Admin">Admin</a>
                                    </li>
                                )}
                            </ul>
                        </div>
                    )}
                    {/* https://www.flaticon.com/free-icons/tennis-court */}

                    <div className="mx-auto order-0">
                        <a className="navbar-brand mx-auto" href="/">
                            {/* <img src="tennis.png" width="30" height="30" className="d-inline-block align-top" alt=""/> */}
                            TennisTimer</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target=".dual-collapse2">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    </div>
                    {Islogin === 'false' && (
                        <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
                            <ul className="navbar-nav ms-auto">
                                <li className="nav-item">
                                    <a className="nav-link" href="/register">Register</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/login">Login</a>
                                </li>
                            </ul>
                        </div>
                    )}
                    {Islogin === 'true' && (
                        <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
                            <ul className="navbar-nav ms-auto">
                                <li className="nav-item">
                                    <a className="nav-link" href="/UserProfile">Hello {Username}</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href='#' onClick={logout}>Logout</a>
                                </li>
                            </ul>
                        </div>
                    )}

                </div>
            </nav>
            {/* <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand" href="#">Navbar</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <a className="nav-item nav-link" href="#">Home</a>
                        <a className="nav-item nav-link" href="#">Features</a>
                        <a className="nav-item nav-link" href="#">Pricing</a>
                        <a className="nav-item nav-link ms-auto" href="#">Disabled</a>
                    </div>
                </div>
            </nav> */}
        </div>
    )
};


export default Navbar;