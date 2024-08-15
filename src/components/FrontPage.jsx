import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '/src/Css/FrontPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Footer from './Footer';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Homepage = () => {
    const controls1 = useAnimation();
    const controls2 = useAnimation();
    const controls3 = useAnimation();
    const controls4 = useAnimation();
    const [ref1, inView1] = useInView();
    const [ref2, inView2] = useInView();
    const [ref3, inView3] = useInView();
    const [ref4, inView4] = useInView();

    const [userCount, setUserCount] = useState(0);
    const [demoCount, setDemoCount] = useState(0);
    const [teamCount, setTeamCount] = useState(0);

    useEffect(() => {
        // Fake API data for demo purposes, replace with real API call later
        setUserCount(4572);
        setDemoCount(12934);
        setTeamCount(534);
    }, []);

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

    useEffect(() => {
        if (inView4) {
            controls4.start('visible');
        } else {
            controls4.start('hidden');
        }
    }, [controls4, inView4]);

    // Define animation variants for the button
    const buttonVariants = {
        hover: { scale: 1.1, backgroundColor: "#3A006C" },
        tap: { scale: 0.9 },
    };

    return (
        <div>
            <nav className="navbar">
                <div className="navdiv">
                    <div className="logo"><a href="#">GameStatsHub</a></div>
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
                    <h1>Game Smarter, Not Harder:<br />Your Stats, Your Strategy,<br />Your Victory.</h1>
                    <motion.button
                        className="get-started-button"
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                    >
                        <Link to="/login">Get Started</Link>
                    </motion.button>
                </div>

                {/* Counter Box */}
                <div className="counter-box">
                    <h3>Platform Stats</h3>
                    <div className="counter">
                        <p>Users</p>
                        <h4>{userCount}</h4>
                    </div>
                    <div className="counter">
                        <p>Demos Analyzed</p>
                        <h4>{demoCount}</h4>
                    </div>
                    <div className="counter">
                        <p>Teams Created</p>
                        <h4>{teamCount}</h4>
                    </div>
                </div>
            </div>

            <br />

            {/* Remaining sections of your page */}
            <section className="sec-01">
                <div className="container">
                    <h2 className="main-title">Track Your Progress, Elevate Your Game</h2>
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
                            <h3>Analyze Your Performance</h3>
                            <p>Get in-depth insights on your gaming performance. Track your rank, win rate, and key statistics over time. Identify strengths, expose weaknesses, and make informed decisions to improve your gameplay.</p>
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
                    <h3 className="section-title">Master Your Strategy</h3>
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
                        <div className="text-box">
                            <h4 className="info-title">Understand Your Gameplay</h4>
                            <p>Dive into detailed stats that break down every match, from kill/death ratios to accuracy rates. Use these analytics to refine your strategies, optimize your playstyle, and stay ahead of the competition.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Updated section with a text box */}
            <section className="sec-04">
                <div className="container">
                    <h3 className="section-title">Build and Track Your Team</h3>
                    <div className="content">
                        <motion.div
                            className="image"
                            ref={ref4}
                            initial="hidden"
                            animate={controls4}
                            variants={imageVariant}
                        >
                            <img src="src/assets/frontpage/stats.jpg" alt="" />
                        </motion.div>
                        <div className="text-box">
                            <h4 className="info-title">Team Up for Success</h4>
                            <p>Create your own team and monitor its progress. Track each member’s performance, compare stats, and analyze your team’s overall effectiveness. Get insights into how your strategies work together and make adjustments to climb the ranks as a unit.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="sec-03">
                <div className="container">
                    <h3 className="section-title">Connect with the Community</h3>
                    <div className="content">
                        <div className="media-info">
                            <li><a href="#"><i className="fab fa-facebook"></i> Facebook</a></li>
                            <li><a href="#"><i className="fab fa-instagram"></i> Instagram</a></li>
                            <li><a href="#"><i className="fab fa-twitter"></i>Twitter</a></li>
                            <li><a href="#"><i className="fab fa-youtube"></i> YouTube</a></li>
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
}

export default Homepage;
