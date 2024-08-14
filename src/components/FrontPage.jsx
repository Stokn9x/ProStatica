import React from 'react';
import { Link } from 'react-router-dom';
import '/src/Css/FrontPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Footer from './Footer';

import { motion } from "framer-motion"
const Homepage = () => {
    return (
        <div>
            <nav className="navbar">
                <div className="navdiv">
                    <div className="logo"><a href="#">WebsiteName</a></div>
                    <ul className="navbar-list">
                        <li><Link to="/profile">Home</Link></li>
                        <li><Link to="/About">About</Link></li>
                        <li><Link to="#">Contact</Link></li>
                        <li><button><Link to="/login">Login</Link></button></li>
                        <li><button><Link to="/Signup">Sign Up</Link></button></li>
                    </ul>
                </div>
            </nav>

            <section className="sec-01">
                <div className="container">
                    <h2 className="main-title">Reveal element on scroll</h2>
                    <div className="content">
                        <div className="image">
                        <img src="src/assets/frontpage/csgorank.png" alt=""></img>
                        </div>
                        <div className="text-box">
                            <h3>lorem Ipsum</h3>
                            <p> jisnfijnsifnsi jisnfijnsifnsi  jisnfijnsifnsi jisnfijnsifnsi jisnfijnsifnsi
                                jisnfijnsifnsi jisnfijnsifnsi jisnfijnsifnsi jisnfijnsifnsi
                                jisnfijnsifnsi jisnfijnsifnsi jisnfijnsifnsi jisnfijnsifnsi jisnfijnsifnsi </p>
                        </div>
                    </div>
                    <div className="media-icons">
                        <a href="#" className="icon"><i className="fab fa-facebook"></i></a>
                        <a href="#" className="icon"><i className="fab fa-instagram"></i></a>
                        <a href="#" className="icon"><i className="fab fa-twitter"></i></a>
                        <a href="#" className="icon"><i className="fab fa-linkedin"></i></a>
                    </div>
                </div>
            </section>

            <section className="sec-02">
                <div className="container">
                    <h3 className="section-title">Lorem Ipsum</h3>
                    <div className="content">
                        <div className="image">
                            <img src="src/assets/frontpage/stats.png" alt=""></img>
                        </div>
                        <div className="info">
                            <h4 className="info-title">Description</h4>
                            <p>jisnfijnsifnsi jisnfijnsifnsi  jisnfijnsifnsi jisnfijnsifnsi jisnfijnsifnsi
                                jisnfijnsifnsi jisnfijnsifnsi jisnfijnsifnsi jisnfijnsifnsi
                                jisnfijnsifnsi jisnfijnsifnsi jisnfijnsifnsi jisnfijnsifnsi jisnfijnsifnsi</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="sec-03">
                <div className="container">
                    <h3 className="section-title">Lorem Ipsum</h3>
                    <div className="content">
                        <div className="media-info">
                            <li><a href="#"><i className="fab fa-facebook"></i> Facebook</a></li>
                            <li><a href="#"><i className="fab fa-instagram"></i> Instagram</a></li>
                            <li><a href="#"><i className="fab fa-twitter"></i>Twitter</a></li>
                            <li><a href="#"><i className="fab fa-youtube"></i> Youtube</a></li>
                            <li><a href="#"><i className="fab fa-linkedin"></i> LinkedIn</a></li>
                        </div>
                        <div className="image">
                            <img src="src/assets/frontpage/Maps.png" alt=""></img>
                        </div>
                    </div>
                </div>
            </section>

            refs = React.createRef();

            <script>
                <motion.div />


            </script>


            <div className="content-wrapper">
                <div className="content-desc">
                    <h1>Game Smarter, Not Harder: Your Stats, Your Strategy, Your Victory.</h1>
                    <p>Click the button to get started.</p>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default Homepage;
