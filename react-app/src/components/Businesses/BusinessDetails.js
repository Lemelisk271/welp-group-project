import { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBusiness, getAllBusiness } from "../../store/business";
import { ReviewContext } from "../../context/ReviewContext";
import QuestionListItem from "../QuestionListItem";
import UserReviewListItem from "../UserReviewListItem";
import OpenModalButton from "../OpenModalButton";
import PictureModal from "../PictureModal";
import BusinessImageModal from '../BusinessImageModal'
import DeleteBusinessModal from './DeleteBusinessModal'
import QuestionModal from '../QuestionModal'
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
    dispatch(getAllBusiness());
    const getReviews = async (id) => {
      const reviewData = await fetch(`/api/business/${id}/review/all`)
      const data = await reviewData.json()
      setReviews(data.reviews.sort(function(a, b) {
        return new Date(b.date) - new Date(a.date)
      }))
    }
    getReviews(id)
    // eslint-disable-next-line
  }, [dispatch, currentReview])

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
    let totalStars = 0;
    business?.reviews?.forEach((el) => {
      totalStars += el.stars;
    });
    if (business?.reviews?.length > 0 && totalStars > 0) {
      setAverageStars(
        Math.floor((totalStars / business?.reviews?.length) * 10) / 10
      );
    }

    setBusinessCategories(
      business?.categories?.map((business) => business.category)
    );
  }, [business, user, currentReview, reviews]);

  let sessionLinks;

  if (user) {
    sessionLinks = (
      <>
        <button onClick={newReview}>Write a Review</button>
        <OpenModalButton
          buttonText={"Add Photo"}
          modalComponent={<BusinessImageModal businessId={business?.id} userId={user?.id} owner={business?.ownerId === user?.id}/>}
        />
      </>
    );
  }

  let ownerLinks;

  if (isOwner) {
    ownerLinks = (
      <>
        <button onClick={editBusinessButton}>Edit {business?.name}</button>
        <OpenModalButton
          buttonText={`Delete ${business?.name}`}
          modalComponent={<DeleteBusinessModal business={business} />}
        />
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
            <QuestionListItem question={question} user={user}/>
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
    )
  }

  function newReview () {
    history.push(`/business/${business.id}/review`)
  }

  function editBusinessButton () {
    history.push(`/business/${business.id}/edit`)
  }

  return (
    <div className="businessDetails">
      {isLoaded ? (
        <>
          <div className="businessDetails-header">
            {previewImage[0]?.url ? (
              <img src={previewImage[0]?.url} alt={business.name} />
            ):(
              <>
               <img src={`https://picsum.photos/1280/720.jpg?random=${business?.id}`} alt={business?.name} />
              </>
            )}
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
                    business?.hours.sort(function(a, b) {
                      return a.dayIdx - b.dayIdx
                    }).map((el) => (
                      <li key={el.id}>
                        {el.closed ? (
                          <>
                            {el.day} - Closed
                          </>
                        ):(
                          <>
                            {el.day} - {new Date("August 19, 1975 " + el.open_time).toLocaleTimeString() + " - " + new Date("August 19, 1975 " + el.close_time).toLocaleTimeString()}
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
                  {user && <OpenModalButton
                    buttonText={`Ask a question`}
                    modalComponent={<QuestionModal business={business} user={user}/>}
                  />}
                </div>
                {questions && questions}
              </div>
              <div className="businessDetails-line"></div>
              <div className="businessDetails-reviews">{reviewElement}</div>
            </div>
            <div className="businessDetails-info">
              <div className="businessDetails-info-link">
                <a href={business.url} target="_blank" rel="noreferrer">
                  {business.name}
                </a>
                <a href={business.url} target="_blank" rel="noreferrer">
                  <i className="fa-solid fa-arrow-up-right-from-square"></i>
                </a>
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
