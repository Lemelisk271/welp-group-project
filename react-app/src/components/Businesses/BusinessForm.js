import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBusiness, updateBusiness } from "../../store/business";
import { useHistory } from "react-router-dom";
import { state_choices } from "./StateList";
import "./BusinessForm.css";

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
  const [priceRating, setPriceRating] = useState("")
  const [tempRating, setTempRating] = useState(0)
  const [unavailable, setUnavailable] = useState("");
  const [disableLogin, setDisableLogin] = useState(true);
  const userId = useSelector((state) => state.session.user.id);

  useEffect(() => {
    if (!name || !phone || !address || !city || !state || !zipCode || !priceRating) {
      setDisableLogin(true);
      setUnavailable("unavailable");
    } else {
      setDisableLogin(false);
      setUnavailable("");
    }
  }, [name, phone, address, city, state, zipCode, priceRating]);

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

  const handleUrlOnChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue === "https://" || inputValue === "") {
      setUrl("https://");
    } else if (!inputValue.startsWith("https://")) {
      setUrl("https://" + inputValue);
    } else {
      setUrl(inputValue);
    }
  };

  let errorObj = {};
  const handleSubmit = async (e) => {
    e.preventDefault();
    errorObj = {};
    setErrors({});
    if (name.length > 100 || !name) {
      // errorObj.name = "Please enter a name with 100 characters or less";
      errorObj.name = "Please enter a name with 100 characters or less";
      // setErrors({
      //   ...errors,
      //   name: "Please enter a name with 100 characters or less",
      // });
    }
    if (phone.length > 14 || !phone) {
      errorObj.phone = "Enter a valid Phone Number";
      // setErrors({ ...errors, phone: "Enter a valid Phone Number" });
    }
    if (address.length > 255 || !address) {
      errorObj.address = "Enter a valid Address";
      // setErrors({ ...errors, address: "Enter a valid Address" });
    }
    if (city.length > 100 || !city) {
      errorObj.city = "Enter a valid City";
      // setErrors({ ...errors, city: "Enter a valid City" });
    }
    if (!state) {
      errorObj.state = "Please select a State";
      // setErrors({ ...errors, state: "Please select a State" });
    }
    if (zipCode.length > 5 || !zipCode) {
      errorObj.zipCode = "Enter a valid Five-Digit Zipcode";
      // setErrors({ ...errors, zipCode: "Enter a valid Five-Digit Zipcode" });
    }
    if (!about) {
      errorObj.about = "Enter a description of your business";
      // setErrors({ ...errors, about: "Enter a description of your business" });
    }
    if (!priceRating) {
      errorObj.price = "Please select an average cost";
      // setErrors({ ...errors, price: "Please select an average cost" });
    }

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
    if (Object.keys(errorObj).length === 0) {
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
          try {
          resBusiness = await dispatch(createBusiness(newBusiness));
          } catch (err) {
            console.log("ERR", err)
          }
          console.log("HELLO", resBusiness)
          if (resBusiness && !resBusiness.errors) {
            history.push(`/business/${resBusiness.id}`);
          } else {
            console.log("HELLO2", resBusiness)
            setErrors(errors);
          }
        }
      } catch (err) {
        console.log("HELLO3", err)
        if (err) {
          const { errors1 } = err;
          setErrors(errors1);
        }
      }
    }
    setErrors({ ...errorObj });
  };

  return (
    <>
      <div className="business-form-container">
        <div className="business-form-left">
          {businessData && <h1>UPDATE BUSINESS FORM</h1>}
          {!businessData && (
            <div>
              <h2>Hello! Let’s start with your business name</h2>
              <p>
                We’ll use this information to help you claim your Yelp page.
                Your business will come up automatically if it is already
                listed.
              </p>
            </div>
          )}
          {Object.keys(errorObj).length === 0 &&
            Object.values(errorObj).map((error) => {
              <p className="business-form-error">{error}</p>;
            })}
          <form className="new-business-form" onSubmit={handleSubmit}>
            <input
              className="full-width"
              type="text"
              placeholder="Your business name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {}
            <input
              className="full-width"
              type="url"
              placeholder="e.g. www.your-website.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <input
              className="full-width"
              type="tel"
              placeholder="Business phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <div className="business-form-address">
              <input
                className="business-form-address-street"
                type="text"
                placeholder="Street address (optional)"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <input
                className="business-form-address-city"
                type="text"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className="business-form-address">
              <select
                className="business-form-address-state"
                value={state}
                onChange={(e) => setState(e.target.value)}
              >
                <option value="" disabled>
                  Select a state
                </option>
                {state_choices.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
              <input
                className="business-form-address-zip"
                type="number"
                placeholder="Zipcode"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
              />
              <select
                className="business-form-address-country"
                placeholder="United States"
                // value={state}
                // onChange={(e) => setState(e.target.value)}
              >
                <option value="United States">United States</option>
                {/* {state_choices.map((state) => (
                                    <option key={state} value={state}>
                                        {state}
                                    </option>
                                ))} */}
              </select>
            </div>
            <textarea
              className="full-width"
              placeholder="Tell us a little about your business"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />
            <div className="business-form-address">
              {/* <input
                className="business-form-address-city"
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              /> */}
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
              <input
                className="business-form-address-street"
                id="image"
                type="url"
                // accept="image/*"
                placeholder="Image Url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </div>
            <button
              className="big-red-button"
              type="submit"
              disabled={disableLogin}
              // className={`signup button ${unavailable}`}
            >
              {!businessData && "Create"}
              {businessData && "Update"}
            </button>
          </form>
        </div>
        <div className="business-form-right">
          <img src="https://picsum.photos/644/631.jpg" />
        </div>
      </div>
    </>
  );
};
export default BusinessForm;
//   return (
//     <>
//       {businessData && (
//         <h1 className="business-form title">Update {businessData.name}</h1>
//       )}
//       {!businessData && (
//         <h1 className="business-form title">New Business Form</h1>
//       )}

//       <form className="new-business-form" onSubmit={handleSubmit}>
//         <div className="new-business-form container">
//           <div className="business-form error-label container">
//             <p className="business-form label">Business Name</p>
//             {errors.name && (
//               <p className="business-form-error">{errors.name}</p>
//             )}
//           </div>
//           <input
//             type="text"
//             placeholder="Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//           <div className="business-form error-label container">
//             <p className="business-form label">Website Url (Optional)</p>
//             {errors.url && <p className="business-form-error">{errors.url}</p>}
//           </div>
//           <input
//             type="url"
//             placeholder="Example: https://www.example.com"
//             value={url}
//             onChange={handleUrlOnChange}
//           />
//           <div className="business-form error-label container">
//             <p className="business-form label">Phone</p>
//             {errors.phone && (
//               <p className="business-form-error">{errors.phone}</p>
//             )}
//           </div>
//           <input
//             type="text"
//             placeholder="Phone"
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//           />
//           <div className="business-form error-label container">
//             <p className="business-form label">Address</p>
//             {errors.address && (
//               <p className="business-form-error">{errors.address}</p>
//             )}
//           </div>
//           <input
//             type="text"
//             placeholder="Address"
//             value={address}
//             onChange={(e) => setAddress(e.target.value)}
//           />
//           <div className="business-form error-label container">
//             <p className="business-form label">City</p>
//             {errors.city && (
//               <p className="business-form-error">{errors.city}</p>
//             )}
//           </div>
//           <input
//             type="text"
//             placeholder="City"
//             value={city}
//             onChange={(e) => setCity(e.target.value)}
//           />
//           <div className="business-form error-label container">
//             <p className="business-form label">State</p>
//             {errors.state && (
//               <p className="business-form-error">{errors.state}</p>
//             )}
//           </div>
//           <select
//             className="business-form"
//             value={state}
//             onChange={(e) => setState(e.target.value)}
//           >
//             <option value="" disabled>
//               Select
//             </option>
//             {state_choices.map((state) => (
//               <option key={state} value={state}>
//                 {state}
//               </option>
//             ))}
//           </select>
//           <div className="business-form error-label container">
//             <p className="business-form label">Zipcode</p>
//             {errors.zipCode && (
//               <p className="business-form-error">{errors.zipCode}</p>
//             )}
//           </div>
//           <input
//             type="number"
//             placeholder="Zipcode"
//             value={zipCode}
//             onChange={(e) => setZipCode(e.target.value)}
//           />
//           <div className="business-form error-label container">
//             <p className="business-form label">About</p>
//             {errors.about && (
//               <p className="business-form-error">{errors.about}</p>
//             )}
//           </div>
//           <input
//             type="text"
//             placeholder="About"
//             value={about}
//             onChange={(e) => setAbout(e.target.value)}
//           />
//           <div className="business-form error-label container">
//             <p className="business-form label">Price Rating</p>
//             {errors.price && (
//               <p className="business-form-error">{errors.price}</p>
//             )}
//           </div>
//           <div className="price-rating">
//             {[1, 2, 3, 4, 5].map((rating) => (
//               <div
//                 key={rating}
//                 className={`${
//                   priceRating >= rating || tempRating >= rating
//                     ? "filled"
//                     : "empty"
//                 }`}
//                 onClick={() => {
//                   setPriceRating(rating);
//                   setTempRating(rating);
//                 }}
//                 onMouseEnter={() => setTempRating(rating)}
//                 onMouseLeave={() => setTempRating(0)}
//               >
//                 <i className="fa-solid fa-dollar"></i>
//               </div>
//             ))}
//           </div>
//           <div className="business-form error-label container">
//             <p className="business-form label">Images</p>
//             {errors.images && (
//               <p className="business-form-error">{errors.images}</p>
//             )}
//           </div>
//           <input
//             id="image"
//             type="url"
//             // accept="image/*"
//             placeholder="Image Url"
//             value={image}
//             onChange={(e) => setImage(e.target.value)}
//           />
//           <button
//             type="submit"
//             disabled={disableLogin}
//             className={`signup button ${unavailable}`}
//           >
//             {!businessData && "Create"}
//             {businessData && "Update"}
//           </button>
//         </div>
//       </form>
//     </>
//   );
// };
