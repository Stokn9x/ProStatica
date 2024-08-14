import React from 'react';
import { Link } from 'react-router-dom';
import '/src/Css/FrontPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Footer from './Footer';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

const Homepage = () => {

    const controls1 = useAnimation();
    const controls2 = useAnimation();
    const controls3 = useAnimation();
    const [ref1, inView1] = useInView();
    const [ref2, inView2] = useInView();
    const [ref3, inView3] = useInView();

    const imageVariant = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    useEffect(() => {
        if (inView1) {
            controls1.start('visible');
        } else {
            controls1.start('hidden');
        }
    }, [controls1, inView1]);

    useEffect(() => {
        if (inView2) {
            controls2.start('visible');
        } else {
            controls2.start('hidden');
        }
    }, [controls2, inView2]);

    useEffect(() => {
        if (inView3) {
            controls3.start('visible');
        } else {
            controls3.start('hidden');
        }
    }, [controls3, inView3]);

    // Define animation variants for the button
    const buttonVariants = {
        hover: { scale: 1.1, backgroundColor: "#3A006C" },
        tap: { scale: 0.9 },
    };



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

            <div className="content-wrapper">
                <div className="content-desc">
                    <h1>Game Smarter, Not Harder: <br></br> Your Stats, Your Strategy,<br></br> Your Victory.</h1>
                    <motion.button
                        className="get-started-button"
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                    >
                        <Link to="/login">Get Started</Link>
                    </motion.button>
                </div>
            </div>

            <br />

            {/* Remaining sections of your page */}
            <section className="sec-01">
                <div className="container">
                    <h2 className="main-title">Reveal element on scroll</h2>
                    <div className="content">
                        <motion.div
                            className="image"
                            ref={ref1}
                            initial="hidden"
                            animate={controls1}
                            variants={imageVariant}
                        >
                            <img src="src/assets/frontpage/csgorank.png" alt="" />
                        </motion.div>
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
                        <motion.div
                            className="image"
                            ref={ref2}
                            initial="hidden"
                            animate={controls2}
                            variants={imageVariant}
                        >
                            <img src="src/assets/frontpage/stats.png" alt="" />
                        </motion.div>
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
                        <motion.div
                            className="image"
                            ref={ref3}
                            initial="hidden"
                            animate={controls3}
                            variants={imageVariant}
                        >
                            <img src="src/assets/frontpage/Maps.png" alt="" />
                        </motion.div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Homepage;
