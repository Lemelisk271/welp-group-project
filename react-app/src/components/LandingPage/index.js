import "./LandingPage.css"
import Footer from "../Footer";

export default function LandingPage() {
    return (
        <>
        <div className="landing-page hero-bar">
        </div>
        <div className="landing-page-card-container">
            <h2 className="landing-page-card-header">Recent Activity</h2>
            {/* Map over query results for recent reviews */}
            <div className="landing-page-card">
                <div className="landing-page-card-header">
                    <h4>Username</h4>
                    <p>Wrote a review</p>
                </div>
                <img className="landing-page-card-image" src="https://picsum.photos/200/300.jpg" />
                <div className="landing-page-card-details">
                    <h4>Business Name</h4>
                    <p>Star Rating</p>
                    <p>Review Here</p>
                </div>
            </div>
        </div>
        <hr></hr>
        <div className="landing-page-categories-container">
            {/* Map over query results for categories */}
            <h2 className="landing-page-categories-header">Categories</h2>
            <div className="landing-page-categories-buttons">
                <div className="landing-page-category">
                    Restaurants
                </div>
            </div>
        </div>
        <div>

        </div>
        </>
    )
}