import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom"
import "./LandingPage.css";

export default function LandingPage() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [recentActivity, setRecentActivity] = useState([]);
    const [randomCategories, setRandomCategories] = useState([]);
    const history = useHistory();

    useEffect(() => {
        const getRecentActivity = async () => {
            const reviews = await fetch(`/api/review/recent`);
            const reviewData = await reviews.json();
            setRecentActivity(reviewData.reviews);
        };
        getRecentActivity();

        const getRandomCategories = async () => {
            const categories = await fetch(`/api/business/categories`);
            const categoriesData = await categories.json();
            setRandomCategories(categoriesData.categories);
        };
        getRandomCategories();
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <div className="hero-bar"></div>
            <div className="landing-page-card-section">
                <h2 className="no-margin">Recent Activity</h2>
                <div className="landing-page-card-container">
                    {recentActivity.map(
                        ({
                            reviewId,
                            businessName,
                            userName,
                            stars,
                            review,
                            date,
                        }) => (
                            <div className="landing-page-card" key={reviewId}>
                                <div className="landing-page-card-header">
                                    <h4 className="no-margin">{userName}</h4>
                                    <p>Wrote a review</p>
                                </div>
                                <div className="card-image-container">
                                    <img
                                        src="https://picsum.photos/400/300.jpg"
                                        alt="Landing Page"
                                    />
                                </div>
                                <div className="landing-page-card-details">
                                    <h4 className="no-margin">
                                        {businessName}
                                    </h4>
                                    {/* <p>{date}</p> */}
                                    <div className="landing-page-stars">
                                        <div
                                            className={
                                                stars >= 1 ? "filled" : "empty"
                                            }
                                        >
                                            <i className="fa-solid fa-star"></i>
                                        </div>
                                        <div
                                            className={
                                                stars >= 2 ? "filled" : "empty"
                                            }
                                        >
                                            <i className="fa-solid fa-star"></i>
                                        </div>
                                        <div
                                            className={
                                                stars >= 3 ? "filled" : "empty"
                                            }
                                        >
                                            <i className="fa-solid fa-star"></i>
                                        </div>
                                        <div
                                            className={
                                                stars >= 4 ? "filled" : "empty"
                                            }
                                        >
                                            <i className="fa-solid fa-star"></i>
                                        </div>
                                        <div
                                            className={
                                                stars >= 5 ? "filled" : "empty"
                                            }
                                        >
                                            <i className="fa-solid fa-star"></i>
                                        </div>
                                    </div>
                                    {/* <p className="">{stars}</p> */}
                                    <p>{review.substring(0, 80)}...</p>
                                </div>
                            </div>
                        )
                    )}
                </div>
                <hr></hr>
                <h2 className="landing-page-categories-header">Categories</h2>
                <div className="landing-page-card-container">
                    {randomCategories.map(({ id, category }) => (
                        <div key={id} className="landing-page-category-card" onClick={() => history.push('/business')}>
                            <h4>{category}</h4>
                            <div className="category-image">
                                <i className="fa-solid fa-utensils"></i>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
