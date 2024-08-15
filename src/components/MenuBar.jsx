import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './../Css/MenuBar.css';

function MenuBar() {
    const [isTeamStatsOpen, setIsTeamStatsOpen] = useState(false);

    const toggleTeamStats = () => {
        setIsTeamStatsOpen(!isTeamStatsOpen);
    };

    // Variants for sidebar animation
    const sidebarVariants = {
        hidden: { x: '-100%' },
        visible: { x: 0, transition: { duration: 0.5 } },
    };

    // Variants for the sub-menu items
    const subMenuVariants = {
        hidden: { opacity: 0, height: 0 },
        visible: {
            opacity: 1,
            height: 'auto',
            transition: { duration: 0.3 },
        },
    };

    return (
        <motion.div
            className="vertical-menu"
            initial="hidden"
            animate="visible"
            variants={sidebarVariants}
        >
            <div className="menu-header">
                <img src="path-to-your-logo.png" alt="Logo" className="logo" />
                <h3>Menu</h3>
            </div>
            <Link to="/home" className="menu-btn">Home</Link>
            <Link to="/general-stats" className="menu-btn">General stats</Link>
            <Link to="/profile" className="menu-btn">Matches</Link>
            <div className="menu-btn" onClick={toggleTeamStats}>
                Team
            </div>
            <AnimatePresence>
                {isTeamStatsOpen && (
                    <motion.div
                        className="sub-menu"
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={subMenuVariants}
                    >
                        <Link to="/team-stats" className="menu-btn sub-menu-btn">Team Overview</Link>
                        <Link to="/team-matches" className="menu-btn sub-menu-btn">Team Matches</Link>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="menu-footer">
                <a href="#"><i className="fab fa-linkedin"></i></a>
                <a href="#"><i className="fab fa-discord"></i></a>
                <a href="#"><i className="fas fa-envelope"></i></a>
                <a href="#"><i className="fab fa-twitter"></i></a>
            </div>
        </motion.div>
    );
}

export default MenuBar;
