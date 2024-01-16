import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

type HomeProps = {
    updateusername: (updateusername: string, jwttoken: string, isLogin: string, role: string) => void;
    isLogin: string;
    username: string;
    jwttoken: string;
}

const Home: React.FC<HomeProps> = ({ updateusername, isLogin, username, jwttoken }) => {
    const navigate = useNavigate();
    const [islogin, setislogin] = useState('');
    useEffect(() => {
        const IsLogin = sessionStorage.getItem('islogin')
        if (IsLogin !== null)
            setislogin(IsLogin);
        // if(isLogin==='false'){
        //     navigate('/login');
        // }
    }, [isLogin]);
    console.log("Inside Home.tsx");
    console.log(username);
    console.log(jwttoken);


    return (
        <div>
            <div id="Home">
                {/* Image Slider */}
                <section>
                    <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-indicators">
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                        </div>
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img src="https://images.pexels.com/photos/102970/pexels-photo-102970.jpeg?cs=srgb&dl=pexels-raj-tatavarthy-102970.jpg&fm=jpg" className="d-block w-100" alt="..." />
                            </div>
                            <div className="carousel-item">
                                <img src="https://images.pexels.com/photos/2961964/pexels-photo-2961964.jpeg?auto=compress&cs=tinysrgb&w=600" className="d-block w-100" alt="..." />
                            </div>
                            <div className="carousel-item">
                                <img src="https://images.pexels.com/photos/427649/pexels-photo-427649.jpeg?auto=compress&cs=tinysrgb&w=600" className="d-block w-100" alt="..." />
                            </div>
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </section>

                {/* //Aboutpage
            //style="background-color: rgb(224, 221, 218); margin-bottom: 3px;" */}
                <section id="aboutus">
                    <br></br>
                    <div>
                        <h4 className="text-center">Welcome to TennisTimer</h4><br></br>
                        {/* //style="margin: auto;
                    padding: 50px;
                    text-align: center;" */}
                        <h6 className="text-center" >Welcome to TennisTimer,
                            your ultimate destination for a seamless tennis court booking experience! At TennisTimer, we're driven by a passion for tennis,
                            and our mission is to make court reservations effortlessly convenient. Our user-friendly interface ensures that reserving your preferred court is as easy as acing a serve,
                            with real-time updates on availability, flexible booking options to suit your schedule, and a secure payment gateway for worry-free transactions. Join our vibrant tennis community,
                            discover local events, and elevate your game to new heights. Download TennisTimer now and step onto the court with confidence, letting us handle the logistics while you focus on the joy of the game.</h6>
                    </div>


                </section>

                <section id="imagecard">
                    <div className="container mt-5">
                        <h2 className="mb-4 text-center">How TennisTimer Works</h2>

                        <div className="row">

                            <div className="col-md-4 mb-4">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">Discover Courts Easily</h5>
                                        <p className="card-text">Explore a curated list of tennis courts near you, filtering by location, amenities, and real-time availability. Our intuitive interface makes finding the perfect court a breeze.</p>
                                    </div>
                                </div>
                            </div>

                            {/* <!-- Card 2: Simple Booking Process --> */}
                            <div className="col-md-4 mb-4">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">Simple Booking Process</h5>
                                        <p className="card-text">Book your preferred tennis court with ease. Our user-friendly app allows you to select the court, choose a suitable time slot, and confirm your reservation seamlessly.</p>
                                    </div>
                                </div>
                            </div>

                            {/* <!-- Card 3: Real-Time Availability --> */}
                            <div className="col-md-4 mb-4">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">Simple Booking Process</h5>
                                        <p className="card-text">Book your preferred tennis court with ease. Our user-friendly app allows you to select the court, choose a suitable time slot, and confirm your reservation seamlessly.</p>
                                    </div>
                                </div>
                            </div>

                        </div>


                    </div>
                </section>

                {/* login link */}
                {
                    islogin === 'false' && (
                        <div className="container">
                            <div className="row">
                                <div className="col-md-4 mb-4">
                                    <img src="https://i.pinimg.com/originals/44/67/ce/4467ceda95866abb6e9060609fc81360.gif" className="mx-auto" width="500" height="150" />
                                </div>
                                <div className="col-md-4 mb-4 mt-2 text-center">
                                    <a href="/login" style={{ fontSize: 25 }}>
                                        Please Login to assess website further</a>
                                </div>
                                <div className="col-md-4 mb-4">
                                    <img src="https://i.pinimg.com/originals/44/67/ce/4467ceda95866abb6e9060609fc81360.gif" id="mirror" className="mx-auto" width="500" height="150" />
                                </div>
                            </div>
                        </div>
                    )
                }

                <br></br>

                {/* footer */}
                <footer className="text-center bg-body-tertiary">

                    <div className="container pt-4">

                        <section className="mb-4">

                            <a
                                data-mdb-ripple-init
                                className="btn btn-link btn-floating btn-lg text-body m-1"
                                href="#!"
                                role="button"
                                data-mdb-ripple-color="dark"
                            ><i className="bi bi-facebook"></i></a>


                            <a
                                data-mdb-ripple-init
                                className="btn btn-link btn-floating btn-lg text-body m-1"
                                href="#!"
                                role="button"
                                data-mdb-ripple-color="dark"
                            ><i className="bi bi-twitter"></i>
                            </a>


                            <a
                                data-mdb-ripple-init
                                className="btn btn-link btn-floating btn-lg text-body m-1"
                                href="#!"
                                role="button"
                                data-mdb-ripple-color="dark"
                            ><i className="bi bi-google"></i>
                            </a>


                            <a
                                data-mdb-ripple-init
                                className="btn btn-link btn-floating btn-lg text-body m-1"
                                href="#!"
                                role="button"
                                data-mdb-ripple-color="dark"
                            ><i className="bi bi-instagram"></i>
                            </a>


                            <a
                                data-mdb-ripple-init
                                className="btn btn-link btn-floating btn-lg text-body m-1"
                                href="#!"
                                role="button"
                                data-mdb-ripple-color="dark"
                            ><i className="bi bi-linkedin"></i>
                            </a>

                            <a
                                data-mdb-ripple-init
                                className="btn btn-link btn-floating btn-lg text-body m-1"
                                href="#!"
                                role="button"
                                data-mdb-ripple-color="dark"
                            ><i className="bi bi-github"></i>
                            </a>
                        </section>

                    </div>



                    <div className="text-center p-3">
                        © 2020 Copyright:
                        <a className="text-body" href="https://mdbootstrap.com/">MDBootstrap.com</a>
                    </div>

                </footer>
            </div>
        </div >
    )
}

export default Home