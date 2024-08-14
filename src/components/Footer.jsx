import '/src/Css/Footer.css';

function Footer() {
    return (
        <footer className="footer">
    <div className="container">
        <div className="footer-row">
            <div className="footer-column">
                <h4>About Us</h4>
                <ul className="footer-links">
                    <li><a href="#">Our Story</a></li>
                    <li><a href="#">Vision</a></li>
                    <li><a href="#">Team</a></li>
                </ul>
            </div>
            <div className="footer-column">
                <h4>Services</h4>
                <ul className="footer-links">
                    <li><a href="#">Service 1</a></li>
                    <li><a href="#">Service 2</a></li>

                </ul>
            </div>
            <div className="footer-column">
                <h4>Quick Links</h4>
                <ul className="footer-links">
                    <li><a href="#">Home</a></li>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Contact</a></li>
                </ul>
            </div>
            <div className="footer-column">
                <h4>Follow Us</h4>
                <div className="social-icons">
                    <a href="#" className="icon"><i className="fab fa-facebook-f"></i></a>
                    <a href="#" className="icon"><i className="fab fa-twitter"></i></a>
                    <a href="#" className="icon"><i className="fab fa-instagram"></i></a>
                    <a href="#" className="icon"><i className="fab fa-linkedin-in"></i></a>
                </div>
            </div>
        </div>
        <div className="footer-bottom">
            <p>&copy; 2024 WebsiteName. All rights reserved.</p>
        </div>
    </div>
</footer>


            /*<p>&cope; {new Date().getFullYear()} Your website name</p>*/
        
    );
}

export default Footer