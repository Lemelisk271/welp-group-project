import { useEffect, useState } from "react";
import "./LandingPage.css";

export default function LandingPage() {
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    const getRecentActivity = async () => {
      const businesses = await fetch(`/api/business/16`);
      const businessesData = await businesses.json();
      setRecentActivity(businessesData.reviews);
      console.log("Recent Activity ==>", recentActivity);
    };
    getRecentActivity();
  }, []);

  return (
    <>
      <div className="hero-bar"></div>
      <div className="landing-page-card-container">
        <h2 className="landing-page-card-header">Recent Activity</h2>
        <div className="landing-page-activity-cards">
          {/* Map over query results for recent reviews */}
          {recentActivity.map(({ businessId, stars, review, userId }) => (
            // console.log("Mapped Activity ==>", activity)
            <>
              <div className="landing-page-card">
                <div className="landing-page-card-header">
                  <h4>{userId}</h4>
                  <p>Wrote a review</p>
                </div>
                <img
                  className="landing-page-card-image"
                  src="https://picsum.photos/200/300.jpg"
                  alt="Landing Page"
                />
                <div className="landing-page-card-details">
                  <h4>{businessId}</h4>
                  <p>{stars}</p>
                  <p>{review.substring(0,80)}...</p>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
      <hr></hr>
      <div className="landing-page-categories-container">
        {/* Map over query results for categories */}
        <h2 className="landing-page-categories-header">Categories</h2>
        <div className="landing-page-categories-buttons">
          <div className="landing-page-category">Restaurants</div>
        </div>
      </div>
    </>
  );
}
