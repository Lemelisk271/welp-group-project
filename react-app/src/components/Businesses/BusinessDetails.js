import { useState, useEffect, useContext } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBusiness, getAllBusiness } from "../../store/business";
import { ReviewContext } from "../../context/ReviewContext";
import QuestionListItem from "../QuestionListItem";
import UserReviewListItem from "../UserReviewListItem";
import OpenModalButton from "../OpenModalButton";
import PictureModal from "../PictureModal";
import "./BusinessDetails.css";

const BusinessDetails = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const { currentReview } = useContext(ReviewContext);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [previewImage, setPreviewImage] = useState([]);
  const [averageStars, setAverageStars] = useState(0);
  const [businessCategories, setBusinessCategories] = useState([]);
  const [reviews, setReviews] = useState([]);
  const business = useSelector((state) => state.business.singleBusiness);
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(getBusiness(id))
      .then(() => setIsLoaded(true))
      .catch(() => history.push("/notfound"));
    // dispatch(getAllBusiness());
    const getReviews = async (id) => {
      const reviewData = await fetch(`/api/business/${id}/review/all`);
      const data = await reviewData.json();
      setReviews(data.reviews);
    };

    getReviews(id);
  }, [dispatch, currentReview]);

  useEffect(() => {
    if (user?.id === business?.ownerId) {
      setIsOwner(true);
    }
    if (user?.id !== business?.ownerId) {
      setIsOwner(false);
    }
    setPreviewImage(
      business?.images?.filter((image) => image.preview === true)
    );
    console.log(business);
    let totalStars = 0;
    business?.reviews?.forEach((el) => {
      totalStars += el.stars;
    });
    if (business?.reviews?.length !== 0) {
      setAverageStars(
        Math.floor((totalStars / business?.reviews?.length) * 10) / 10
      );
    }

    setBusinessCategories(
      business?.categories?.map((business) => business.category)
    );
  }, [business, user, currentReview]);

  let sessionLinks;

  if (user) {
    sessionLinks = (
      <>
        <button>Write a Review</button>
        <button>Add Photo</button>
      </>
    );
  }

  let ownerLinks;

  if (isOwner) {
    ownerLinks = (
      <>
        <button>Edit {business?.name}</button>
        <button>Delete {business?.name}</button>
      </>
    );
  }

  let questions;

  if (business?.questions?.length <= 0) {
    questions = (
      <p>Welp users haven't asked any questions yet about {business.name}</p>
    );
  }

  if (business?.questions?.length > 0) {
    questions = (
      <ul>
        {business?.questions.map((question) => (
          <li key={question.id}>
            <QuestionListItem question={question} />
          </li>
        ))}
      </ul>
    );
  }

  let reviewElement;

  if (reviews.length === 0) {
    reviewElement = <p>Welp users haven't reviewed {business?.name} yet.</p>;
  }

  if (reviews.length > 0) {
    reviewElement = (
      <>
        {reviews.map((review) => (
          <UserReviewListItem
            key={review.id}
            review={review}
            page={"businessDetail"}
          />
        ))}
      </>
    );
  }

  return (
    <div className="businessDetails">
      {isLoaded ? (
        <>
          <div className="businessDetails-header">
            <img src={previewImage[0]?.url} alt={business.name} />
            <div className="businessDetails-header-info">
              <h2>{business.name}</h2>
              <div className="businessDetails-header-reviews">
                <div className={averageStars >= 1 ? "filled" : "empty"}>
                  <i className="fa-solid fa-star"></i>
                </div>
                <div className={averageStars >= 2 ? "filled" : "empty"}>
                  <i className="fa-solid fa-star"></i>
                </div>
                <div className={averageStars >= 3 ? "filled" : "empty"}>
                  <i className="fa-solid fa-star"></i>
                </div>
                <div className={averageStars >= 4 ? "filled" : "empty"}>
                  <i className="fa-solid fa-star"></i>
                </div>
                <div className={averageStars >= 5 ? "filled" : "empty"}>
                  <i className="fa-solid fa-star"></i>
                </div>
                <p>
                  {averageStars} ({business.reviews.length} reviews)
                </p>
              </div>
              <div className="businessDetails-header-details">
                <ul>
                  {businessCategories.map((category, i) => (
                    <li key={i} className="businessDetails-header-list">
                      {category}
                    </li>
                  ))}
                </ul>
                <div className="businessDetails-header-price">
                  <div
                    className={
                      business.price >= 1
                        ? "businessDetails-price"
                        : "businessDetails-price-hidden"
                    }
                  >
                    <i className="fa-solid fa-dollar-sign"></i>
                  </div>
                  <div
                    className={
                      business.price >= 2
                        ? "businessDetails-price"
                        : "businessDetails-price-hidden"
                    }
                  >
                    <i className="fa-solid fa-dollar-sign"></i>
                  </div>
                  <div
                    className={
                      business.price >= 3
                        ? "businessDetails-price"
                        : "businessDetails-price-hidden"
                    }
                  >
                    <i className="fa-solid fa-dollar-sign"></i>
                  </div>
                  <div
                    className={
                      business.price >= 4
                        ? "businessDetails-price"
                        : "businessDetails-price-hidden"
                    }
                  >
                    <i className="fa-solid fa-dollar-sign"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="businessDetails-pictureButton">
              <OpenModalButton
                buttonText={`View all ${business.images.length} pictures`}
                modalComponent={
                  <PictureModal
                    images={business.images}
                    owner={isOwner}
                    user={user}
                  />
                }
              />
            </div>
          </div>
          <div className="businessDetails-contentButtons">
            {user && sessionLinks}
            {isOwner && ownerLinks}
          </div>
          <div className="businessDetails-page">
            <div className="businessDetails-content">
              <h3>Location & Hours</h3>
              <div className="businessDetails-location-hours">
                <div className="businessDetails-location">
                  <i className="fa-solid fa-location-dot"></i>
                  <p>{business.address}</p>
                  <p>
                    {business.city}, {business.state}, {business.zip_code}
                  </p>
                </div>
                <ul>
                  {business?.hours &&
                    business?.hours.map((el) => (
                      <li key={el.id}>
                        {el.closed ? (
                          "Closed"
                        ) : (
                          <>
                            {el.day} -{" "}
                            {(el.open_time &&
                              new Date(
                                "August 19, 1975" + " " + el.open_time
                              ).toLocaleTimeString() + " -") ||
                              "Closed"}{" "}
                            {el.close_time &&
                              new Date(
                                "August 19, 1975" + " " + el.close_time
                              ).toLocaleTimeString()}
                          </>
                        )}
                      </li>
                    ))}
                </ul>
              </div>
              <div className="businessDetails-line"></div>
              <div className="businessDetails-amenities">
                <h3>Amenities and More</h3>
                <ul>
                  {business?.amenities?.map((amenity) => (
                    <li key={amenity.id}>
                      <img src={amenity.icon_url} alt={amenity.amenity} />
                      <p>{amenity.amenity}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="businessDetails-line"></div>
              <div className="businessDetails-about">
                <h3>About the Business</h3>
                <p>{business.about}</p>
              </div>
              <div className="businessDetails-line"></div>
              <div className="businessDetails-questions">
                <div className="businessDetails-ask">
                  <h3>Ask the Community</h3>
                  <button>
                    Ask a question <i className="fa-solid fa-plus"></i>
                  </button>
                </div>
                {questions && questions}
              </div>
              <div className="businessDetails-line"></div>
              <div className="businessDetails-reviews">{reviewElement}</div>
            </div>
            <div className="businessDetails-info">
              <div className="businessDetails-info-link">
                <Link to={business.url} target="_blank">
                  {business.name}
                </Link>
                <Link to={business.url} target="_blank">
                  <i className="fa-solid fa-arrow-up-right-from-square"></i>
                </Link>
              </div>
              <div className="businessDetails-line"></div>
              <div className="businessDetails-phone">
                <p>{business.phone}</p>
                <i className="fa-solid fa-phone"></i>
              </div>
            </div>
          </div>
        </>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};

export default BusinessDetails;
