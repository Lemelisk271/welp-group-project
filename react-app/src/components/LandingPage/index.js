import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./LandingPage.css";

export default function LandingPage() {
    // const [isLoaded, setIsLoaded] = useState(false);
    const [recentActivity, setRecentActivity] = useState([]);
    const [randomCategories, setRandomCategories] = useState([]);
    const history = useHistory();

    useEffect(() => {
        const getUser = async (userId) => {
            const user = await fetch(`/api/users/${userId}`);
            const userData = await user.json();
            return userData;
        };

        const getRecentActivity = async () => {
            const reviews = await fetch(`/api/review/recent`);
            const reviewData = await reviews.json();
            for (const review of reviewData.reviews) {
                const userInfo = await getUser(review.userId);
                review.userInfo = userInfo;
            }
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
            <div className="hero-bar">
                <div className="hero-image" id="image1" />
                <div className="hero-image" id="image2" />
                <div className="hero-image" id="image3" />
            </div>
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
                            userInfo,
                        }) => (
                            <div className="landing-page-card" key={reviewId}>
                                <div className="landing-page-card-header">
                                    <div>
                                        <img
                                            className="card-profile-img"
                                            src={userInfo.profile_image}
                                            alt=""
                                        />
                                    </div>
                                    <div>
                                        <h4 className="card-user-name">
                                            {userName}
                                        </h4>
                                        <p className="no-margin">
                                            Wrote a review
                                        </p>
                                    </div>
                                </div>
                                <div
                                    className="card-image-container"
                                    onClick={() => {
                                        history.push(`/review/${reviewId}`);
                                    }}
                                >
                                    <img
                                        src="https://picsum.photos/400/300.jpg"
                                        alt="Landing Page"
                                    />
                                </div>
                                <div className="landing-page-card-details">
                                    <p
                                        className="card-business-name cursor-pointer blue-link"
                                        onClick={() => {
                                            history.push(`/review/${reviewId}`);
                                        }}
                                    >
                                        {businessName}
                                    </p>
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
                                    <p
                                        className="blue-link cursor-pointer"
                                        onClick={() => {
                                            history.push(`/review/${reviewId}`);
                                        }}
                                    >
                                        Continue reading
                                    </p>
                                </div>
                            </div>
                        )
                    )}
                </div>
                <hr></hr>
                <h2 className="landing-page-categories-header">Categories</h2>
                <div className="landing-page-card-container">
                    {randomCategories.map(({ id, category }) => (
                        <div
                            key={id}
                            className="landing-page-category-card"
                            onClick={() => history.push("/business")}
                        >
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
