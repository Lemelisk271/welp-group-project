import React from "react";
import "./Footer.css";

// function Navigation({ isLoaded }) {
//   const sessionUser = useSelector((state) => state.session.user);

export default function Footer() {
    return (
      <>
        <div className="footer-container">
            <div className="footer-links">
                <h4 className="footer-links-title">About</h4>
                <a href="/">About Welp</a>
                <a href="/">Careers</a>
                <a href="/">Press</a>
                <a href="/">Investor Relations</a>
                <a href="/">Trust & Safety</a>
                <a href="/">Content Guidelines</a>
                <a href="/">Accessibility Statement</a>
                <a href="/">Terms of Service</a>
                <a href="/">Privacy Policy</a>
                <a href="/">Ad Choices</a>
                <a href="/">Your Privacy Policy</a>
            </div>
            <div className="footer-links">
            <h4 className="footer-links-title">Discover</h4>
                <a href="/">Welp Project Cost Guides</a>
                <a href="/">Collections</a>
                <a href="/">Talk</a>
                <a href="/">Events</a>
                <a href="/">Yelp Blog</a>
                <a href="/">Support</a>
                <a href="/">Welp Mobile</a>
                <a href="/">Developers</a>
                <a href="/">RSS</a>
            </div>
            <div className="footer-links">
            <h4 className="footer-links-title">Welp for Business</h4>
                <a href="/">Welp for Business</a>
                <a href="/">Business Owner Login</a>
                <a href="/">Claim your Business Page</a>
                <a href="/">Advertise on Welp</a>
                <a href="/">Welp for Restaurant Owners</a>
                <a href="/">Table Management</a>
                <a href="/">Business Success Stories</a>
                <a href="/">Business Support</a>
                <a href="/">Welp Blog for Business</a>
            </div>
            <div className="footer-links">
            <h4 className="footer-links-title">Languages</h4>
                <a href="/">English</a>
            <h4 className="footer-links-title">Countries</h4>
                <a href="/">United States</a>
            </div>
        </div>
      </>
    );
}
