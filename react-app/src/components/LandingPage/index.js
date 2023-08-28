import "./LandingPage.css"
import Navigation from "../Navigation";

export default function LandingPage() {
    return (
        <>
        <div className="landing-page hero-bar">
        </div>
        <div className="landing-page card-container">
            <h2 className="landing-page-card-header">Your Next Review Awaits</h2>
            {/* Map over query results for businesses to review */}
            <div className="landing-page-card">
                <div className="landing-page-card-image">
                    <img src="https://placehold.co/200x200.png?text=Preview+Image" />
                </div>
                <div className="landing-page-card-details">
                    <h3>Business Name</h3>
                    <p>Do you recommend this business?</p>
                    <p>Insert Star Rating Here</p>
                </div>
            </div>
        </div>
        </>
    )
}