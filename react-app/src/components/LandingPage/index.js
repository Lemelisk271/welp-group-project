import { useEffect, useState } from "react";
import "./LandingPage.css";

export default function LandingPage() {
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    const getRecentActivity = async () => {
      const reviews = await fetch(`/api/review/recent`);
      const reviewData = await reviews.json();
      setRecentActivity(reviewData.reviews);
      // console.log("Recent Activity ==>", recentActivity);
    };
    getRecentActivity();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="hero-bar"></div>
      <div className="landing-page-card-section">
                  <h2 className="no-margin">Recent Activity</h2>
      <div className="landing-page-card-container">
          {/* Map over query results for recent reviews */}
          {recentActivity.map(({ businessName, userName, stars, review, date }) => (
            // console.log("Mapped Activity ==>", activity)
            <div className="landing-page-card" key={userName}>
              <div className="landing-page-card-header">
                <h4>{userName}</h4>
                <p>Wrote a review</p>
              </div>
              <div className="card-image-container">
              <img
                src="https://picsum.photos/400/300.jpg"
                alt="Landing Page"
              />
              </div>
              <div className="landing-page-card-details">
                <h4>{businessName}</h4>
                {/* <p>{date}</p> */}
                <p>{stars}</p>
                <p>{review.substring(0,80)}...</p>
              </div>
            </div>
          ))}
      </div>
      <hr></hr>
      <div className="landing-page-categories-container">
        {/* Map over query results for categories */}
        <h2 className="landing-page-categories-header">Categories</h2>
        <div className="landing-page-categories-buttons">
          <div className="landing-page-category">Restaurants</div>
        </div>
      </div>
      </div>
    </>
  );
}
