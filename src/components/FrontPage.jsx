import React from 'react';
import { Link } from 'react-router-dom';
import '/src/Css/FrontPage.css';

const Homepage = () => {
    return (
    
      <body>
            <header>
                {/*<img className="logo" src="Images/AogC.jpg" alt="logo"></img>*/}
                <nav>
                    <ul className="nav_links">
                        <li><a href="#">About us</a></li>
                        <li><a href="#">Random</a></li>
                        <li><a href="#">Login</a></li>
                    </ul>             
                </nav>
                <a className="cta" href="#"><button>Contact</button></a>          
            </header>
      </body>  
    );
};

export default Homepage;