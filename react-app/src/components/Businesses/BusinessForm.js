import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBusiness, updateBusiness } from "../../store/business";
import { useHistory } from "react-router-dom";
import { state_choices } from "./StateList";

const BusinessForm = ({ businessData }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [about, setAbout] = useState("");
  const [price, setPrice] = useState("");
  const [errors, setErrors] = useState({});
  const [image, setImage] = useState("");
  const [priceRating, setPriceRating] = useState(0);
  const [tempRating, setTempRating] = useState(0);
  const [unavailable, setUnavailable] = useState("");
  const [disableLogin, setDisableLogin] = useState(true);
  const userId = useSelector((state) => state.session.user.id);

  useEffect(() => {
    if (
      !name ||
      !phone ||
      !address ||
      !city ||
      !state ||
      !zipCode ||
      !priceRating
    ) {
      setDisableLogin(true);
      setUnavailable("unavailable");
    } else {
      setDisableLogin(false);
      setUnavailable("");
    }
  }, [name, phone, address, city, state, zipCode, price]);

  useEffect(() => {
    if (businessData) {
      setName(businessData?.name);
      setUrl(businessData?.url);
      setPhone(businessData?.phone);
      setAddress(businessData?.address);
      setState(businessData?.state);
      setCity(businessData?.city);
      setZipCode(businessData?.zip_code);
      setAbout(businessData?.about);
      setPriceRating(businessData?.price);
      if (businessData?.images?.length > 0) {
        for (let image of businessData?.images) {
          if (image.preview === true) {
            setImage(image.url);
          }
        }
      }
    }
  }, [businessData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newBusiness = {
      name,
      url,
      phone,
      address,
      city,
      state,
      zip_code: zipCode,
      about,
      price: priceRating,
      ownerId: userId,
      imgUrl: image,
      preview: true,
    };
    let resBusiness;

    try {
      if (businessData) {
        newBusiness.id = businessData.id;
        resBusiness = await dispatch(updateBusiness(newBusiness));
        if (resBusiness && !resBusiness.errors) {
          history.push(`/business/${resBusiness.id}`);
        } else {
          setErrors(errors);
        }
      } else {
        resBusiness = await dispatch(createBusiness(newBusiness));
        if (resBusiness && !resBusiness.errors) {
          history.push(`/business/${resBusiness.id}`);
        } else {
          setErrors(errors);
        }
      }
    } catch (err) {
      if (err) {
        const { errors1 } = err;
        setErrors(errors1);
      }
    }
  };

  return (
    <>
      {businessData && <h1 className="business-form title">Update {businessData.name}</h1>}
      {!businessData && <h1 className="business-form title">NEW BUSINESS FORM</h1>}

      <form className="new-business-form" onSubmit={handleSubmit}>
        <div className="new-business-form container">
          <p className="business-form label">Business Name</p>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <p className="business-form label">Website Url</p>
          <input
            type="url"
            placeholder="Website Url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <p className="business-form label">Phone</p>
          <input
            type="tel"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <p className="business-form label">Address</p>
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <p className="business-form label">City</p>
          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <p className="business-form label">State</p>
          <select className="business-form" value={state} onChange={(e) => setState(e.target.value)}>
            <option value="" disabled>
              Select
            </option>
            {state_choices.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
          <p className="business-form label">Zipcode</p>
          <input
            type="number"
            placeholder="Zipcode"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
          />
          <p className="business-form label">About</p>
          <input
            type="text"
            placeholder="About"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          />
          <p className="business-form label">Price Rating</p>
          <div className="price-rating">
            {[1, 2, 3, 4, 5].map((rating) => (
              <div
                key={rating}
                className={`${
                  priceRating >= rating || tempRating >= rating
                    ? "filled"
                    : "empty"
                }`}
                onClick={() => {
                  setPriceRating(rating);
                  setTempRating(rating);
                }}
                onMouseEnter={() => setTempRating(rating)}
                onMouseLeave={() => setTempRating(0)}
              >
                <i className="fa-solid fa-dollar"></i>
              </div>
            ))}
          </div>
          <p className="business-form label">Images</p>
          <input
            id="image"
            type="url"
            // accept="image/*"
            placeholder="Image Url"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          <button
            type="submit"
            disabled={disableLogin}
            className={`signup button ${unavailable}`}
          >
            {!businessData && "Create"}
            {businessData && "Update"}
          </button>
        </div>
      </form>
    </>
  );
};

export default BusinessForm;
