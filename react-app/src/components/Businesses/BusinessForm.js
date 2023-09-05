import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBusiness, updateBusiness } from "../../store/business";
import { useHistory } from "react-router-dom";
import { state_choices } from "./StateList";
import "./BusinessForm.css";
import "./Businesses.css";

const BusinessForm = ({ businessData }) => {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const [userId, setUserId] = useState(null);
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [about, setAbout] = useState("");
  const [errors, setErrors] = useState(null);
  const [timeErrors, setTimeErrors] = useState({});
  const [image, setImage] = useState("");
  const [priceRating, setPriceRating] = useState("");
  const [tempRating, setTempRating] = useState(0);
  const [unavailable, setUnavailable] = useState("");
  const [disableLogin, setDisableLogin] = useState(true);
  const [disableTime, setDisableTime] = useState("");
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [amenityOptions, setAmenityOptions] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [amenityList, setAmenityList] = useState([]);
  const [Mon, setMon] = useState({
    day: "Mon",
    closed: false,
    open_time: "09:00",
    close_time: "17:00",
  });
  const [Tue, setTue] = useState({
    day: "Tue",
    closed: false,
    open_time: "09:00",
    close_time: "17:00",
  });
  const [Wed, setWed] = useState({
    day: "Wed",
    closed: false,
    open_time: "09:00",
    close_time: "17:00",
  });
  const [Thu, setThu] = useState({
    day: "Thu",
    closed: false,
    open_time: "09:00",
    close_time: "17:00",
  });
  const [Fri, setFri] = useState({
    day: "Fri",
    closed: false,
    open_time: "09:00",
    close_time: "17:00",
  });
  const [Sat, setSat] = useState({
    day: "Sat",
    closed: true,
    open_time: null,
    close_time: null,
  });
  const [Sun, setSun] = useState({
    day: "Sun",
    closed: true,
    open_time: null,
    close_time: null,
  });
  const dayList = [Mon, Tue, Wed, Thu, Fri, Sat, Sun];

  useEffect(() => {
    if (!sessionUser || sessionUser === null) {
      history.push("/error/not-logged-in");
    } else {
      setUserId(sessionUser.id);
    }
  }, []);

  const handleDateUpdate = (day, updatedValues) => {
    let errorObj = {};
    const updateClosed = { ...day, ...updatedValues };
    switch (day.day) {
      case "Mon":
        if (day.open_time > day.close_time) {
          errorObj.Monday = "Monday - Closing time cannot be before open time.";
        } else {
          delete errorObj.Monday;
        }
        setMon(updateClosed);
        break;
      case "Tue":
        if (day.open_time > day.close_time) {
          errorObj.Tuesday =
            "Tuesday - Closing time cannot be before open time.";
        } else {
          delete errorObj.Tuesday;
        }
        setTue(updateClosed);
        break;
      case "Wed":
        if (day.open_time > day.close_time) {
          errorObj.Wednesday =
            "Wednesday - Closing time cannot be before open time.";
        } else {
          delete errorObj.Wednesday;
        }
        setWed(updateClosed);
        break;
      case "Thu":
        if (day.open_time > day.close_time) {
          errorObj.Thursday =
            "Thursday - Closing time cannot be before open time.";
        } else {
          delete errorObj.Thursday;
        }
        setThu(updateClosed);
        break;
      case "Fri":
        if (day.open_time > day.close_time) {
          errorObj.Friday = "Friday - Closing time cannot be before open time.";
        } else {
          delete errorObj.Friday;
        }
        setFri(updateClosed);
        break;
      case "Sat":
        if (day.open_time > day.close_time) {
          errorObj.Saturday =
            "Saturday - Closing time cannot be before open time.";
        } else {
          delete errorObj.Saturday;
        }
        setSat(updateClosed);
        break;
      case "Sun":
        if (day.open_time > day.close_time) {
          errorObj.Sunday = "Sunday - Closing time cannot be before open time.";
        } else {
          delete errorObj.Sunday;
        }
        setSun(updateClosed);
        break;
      default:
        break;
    }
    if (Object.keys(errorObj).length) {
      setErrors(errorObj);
      return;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
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
      const categoryObj = await fetch(`/api/business/categories/all`, {
        method: "GET",
      });
      const categoryRes = await categoryObj.json();
      setCategoryOptions(categoryRes.categories);
      const amenitiyObj = await fetch(`/api/business/amenities/all`, {
        method: "GET",
      });
      const amenitiyRes = await amenitiyObj.json();
      setAmenityOptions(amenitiyRes.amenities);
    };
    fetchData();
  }, [
    name,
    phone,
    address,
    city,
    state,
    zipCode,
    priceRating,
    categoryList,
    amenityList,
  ]);

  useEffect(() => {
    const dateObj = {};
    businessData?.hours?.forEach((day) => {
      dateObj[day.day] = day;
    });
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
      if (businessData?.amenities?.length) {
        let amenityArr = [];
        businessData?.amenities?.forEach((amenity) => {
          amenityArr.push(amenity.amenity);
        });
        setAmenityList(amenityArr);
      }
      if (businessData?.categories?.length) {
        let categoryArr = [];
        businessData?.categories?.forEach((category) => {
          categoryArr.push(category.category);
        });
        setCategoryList(categoryArr);
      }
      if (businessData?.images?.length > 0) {
        for (let image of businessData?.images) {
          if (image.preview === true) {
            setImage(image.url);
          }
        }
      }
      for (const day in dateObj) {
        if (
          !dateObj[day]?.open_time ||
          !dateObj[day]?.close_time ||
          dateObj[day]?.closed
        ) {
          delete dateObj[day].open_time;
          delete dateObj[day].close_time;
          dateObj[day].closed = true;
          switch (day) {
            case "Mon":
              setMon(dateObj[day]);
              break;
            case "Tue":
              setTue(dateObj[day]);
              break;
            case "Wed":
              setWed(dateObj[day]);
              break;
            case "Thu":
              setThu(dateObj[day]);
              break;
            case "Fri":
              setFri(dateObj[day]);
              break;
            case "Sat":
              setSat(dateObj[day]);
              break;
            case "Sun":
              setSun(dateObj[day]);
              break;
            default:
              break;
          }
        } else {
          dateObj[day].closed = false;
          switch (day) {
            case "Mon":
              setMon(dateObj[day]);
              break;
            case "Tue":
              setTue(dateObj[day]);
              break;
            case "Wed":
              setWed(dateObj[day]);
              break;
            case "Thu":
              setThu(dateObj[day]);
              break;
            case "Fri":
              setFri(dateObj[day]);
              break;
            case "Sat":
              setSat(dateObj[day]);
              break;
            case "Sun":
              setSun(dateObj[day]);
              break;
            default:
              break;
          }
        }
      }
    }
  }, [businessData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errorObj = {};
    if (name.length > 100 || !name) {
      errorObj.name = "Please enter a name with 100 characters or less";
    }
    if (phone.length > 14 || !phone) {
      errorObj.phone = "Enter a valid Phone Number";
    }
    if (address.length > 255 || !address) {
      errorObj.address = "Enter a valid Address";
    }
    if (city.length > 100 || !city) {
      errorObj.city = "Enter a valid City";
    }
    if (!state) {
      errorObj.state = "Please select a State";
    }
    if (zipCode.toString().length !== 5 || !zipCode) {
      errorObj.zipCode = "Enter a valid Five-Digit Zipcode";
    }
    if (!about) {
      errorObj.about = "Enter a description of your business";
    }
    if (!priceRating) {
      errorObj.price = "Please select an average cost";
    }

    if (Object.keys(errorObj).length) {
      setErrors(errorObj);
      return;
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
    };
    let resBusiness;
    if (!Object.keys(errorObj).length) {
      try {
        if (businessData) {
          newBusiness.id = businessData.id;
          resBusiness = await dispatch(updateBusiness(newBusiness));
          if (resBusiness.errors) {
            setErrors(resBusiness.errors);
          }
        } else {
          try {
            resBusiness = await dispatch(createBusiness(newBusiness));
            if (resBusiness.errors) {
              setErrors(resBusiness);
            } else if (resBusiness.id && !resBusiness.errors) {
              try {
                const imgFormData = new FormData();
                imgFormData.append("image", image);
                imgFormData.append("user", userId);
                const addImage = await fetch(
                  `/api/business/${resBusiness.id}/images`,
                  {
                    method: "POST",
                    body: imgFormData,
                  }
                );
                const resImage = await addImage.json();
              } catch (err) {
                if (err) {
                  errorObj.image =
                    "Something went wrong with your image upload";
                }
              }
            }
          } catch (err) {}
        }
        try {
          let curr_businessId;
          if (businessData?.id) {
            curr_businessId = businessData.id;
          } else {
            curr_businessId = resBusiness.id;
          }
          await fetch(`/api/business/${curr_businessId}/delete`, {
            method: "DELETE",
          });
          try {
            await Promise.all(
              dayList.map(async (day) => {
                const hoursFormData = new FormData();
                hoursFormData.append("day", day.day);
                if (day.closed) {
                  day.open_time = "00:00";
                  day.close_time = "00:00";
                }
                hoursFormData.append("open_time", day.open_time.slice(0, 5));
                hoursFormData.append("close_time", day.close_time.slice(0, 5));
                hoursFormData.append("closed", day.closed);
                let curr_businessId;
                if (businessData?.id) {
                  curr_businessId = businessData.id;
                } else {
                  curr_businessId = resBusiness.id;
                }
                const addBusinessHours = await fetch(
                  `/api/business/${curr_businessId}/hours`,
                  {
                    method: "POST",
                    body: hoursFormData,
                  }
                );
              })
            );
            try {
              await Promise.all(
                categoryList.map(async (category) => {
                  const categoryFormData = new FormData();
                  categoryFormData.append("category", category);
                  let curr_businessId;
                  if (businessData?.id) {
                    curr_businessId = businessData.id;
                  } else {
                    curr_businessId = resBusiness.id;
                  }
                  const addCategory = await fetch(
                    `/api/business/${curr_businessId}/categories`,
                    {
                      method: "POST",
                      body: categoryFormData,
                    }
                  );
                })
              );
              try {
                let curr_businessId;
                if (businessData?.id) {
                  curr_businessId = businessData.id;
                } else {
                  curr_businessId = resBusiness.id;
                }
                await Promise.all(
                  amenityList.map(async (amenity) => {
                    const amenityFormData = new FormData();
                    amenityFormData.append("amenity", amenity);
                    const addAmenity = await fetch(
                      `/api/business/${curr_businessId}/amenities`,
                      {
                        method: "POST",
                        body: amenityFormData,
                      }
                    );
                  })
                );
                history.push(`/business/${curr_businessId}`);
              } catch (err) {
                if (err) {
                  errorObj.amenities =
                    "Something went wrong with your amenities";
                }
              }
            } catch (err) {
              if (err) {
                errorObj.categories =
                  "Something went wrong with your categories";
              }
            }
          } catch (err) {
            if (err) {
              errorObj.hours = "Something went wrong with your business hours";
            }
          }
        } catch (err) {}
      } catch (err) {}
    }
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
          <ul>
            {errors &&
              Object.values(errors).map((error, idx) => (
                <li key={idx} className="errors">
                  {error}
                </li>
              ))}
          </ul>
          <br />
          <form
            className="new-business-form"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
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
              name="phone"
              minLength="10"
              maxLength="14"
              pattern="[0-9]{10}"
              placeholder="Business Phone Number ex:9018675309"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <div className="business-form-address">
              <input
                className="business-form-address-street"
                type="text"
                placeholder="Street address"
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
              >
                <option value="United States">United States</option>
              </select>
            </div>
            <textarea
              className="full-width"
              placeholder="Tell us a little about your business"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />
            <div className="business-form price">
              <div className="price-rating">
                <h3 className="business-form price rating label">
                  Price Rating:
                </h3>
                {[1, 2, 3, 4, 5].map((rating) => (
                  <div
                    key={rating}
                    className={`${
                      priceRating >= rating || tempRating >= rating
                        ? "filled"
                        : "empty"
                    } price container`}
                    onClick={() => {
                      setPriceRating(rating);
                      setTempRating(rating);
                    }}
                    onMouseEnter={() => setTempRating(rating)}
                    onMouseLeave={() => setTempRating(0)}
                  >
                    <i className="fa-solid fa-dollar fa-xxl business-form-price"></i>
                  </div>
                ))}
              </div>
              {!businessData && (
                <div className="business-form-image container">
                  <h3 className="business-form image label">Add Photo:</h3>
                  <input
                    className="business-form-image"
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </div>
              )}
            </div>
            <div className="business-form-days master container">
              <h3>Hours</h3>
              {dayList.map((day) => (
                <div key={day.day} className="business-form-days day container">
                  <input
                    type="checkbox"
                    className="business-form-days day checkbox"
                    checked={!day.closed}
                    value={!day.closed}
                    onChange={(e) => {
                      if (e.target.checked === false) {
                        handleDateUpdate(day, {
                          closed: !e.target.checked,
                          open_time: null,
                          close_time: null,
                        });
                      } else {
                        handleDateUpdate(day, {
                          closed: !e.target.checked,
                        });
                      }
                    }}
                  />
                  <p className="business-form-days day label">{day.day}</p>
                  <input
                    className="business-form-days open time"
                    type="time"
                    value={day.open_time || ""}
                    min="00:00"
                    max={day.close_time || "23:59"}
                    onChange={(e) => {
                      handleDateUpdate(day, {
                        open_time: e.target.value || null,
                      });
                    }}
                    disabled={day.closed}
                  />
                  <input
                    className="business-form-days close time"
                    type="time"
                    value={day.close_time || ""}
                    min={day.open_time || "00:00"}
                    max="23:59"
                    onChange={(e) => {
                      handleDateUpdate(day, {
                        close_time: e.target.value || null,
                      });
                    }}
                    disabled={day.closed}
                  />
                  <span className="valid-time"></span>
                </div>
              ))}
            </div>
            <div className="business-form-cat mastercontainer">
              {categoryOptions && (
                <>
                  <div className="business-form-cat">
                    <h3 className="cat-title">Categories</h3>
                    <div className="business-form category container">
                      {categoryOptions.map((category, idx) => (
                        <div
                          key={idx}
                          className="business-form category listing"
                        >
                          <label>
                            <input
                              key={idx * 2.01}
                              className="business-form-categories"
                              type="checkbox"
                              checked={Object.values(categoryList)?.includes(
                                category
                              )}
                              onChange={(e) => {
                                if (e.target.checked === true) {
                                  setCategoryList([...categoryList, category]);
                                } else {
                                  const updatedCategoryList =
                                    categoryList.filter(
                                      (selectedCategory) =>
                                        selectedCategory !== category
                                    );
                                  setCategoryList(updatedCategoryList);
                                }
                              }}
                            />
                            {category}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="selected">
                    <h3 className="cat-title">Selected</h3>
                    <ul>
                      {Object.values(categoryList)?.map((category, idx) => (
                        <li key={idx * 1.12}>{category}</li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
            </div>
            <div className="business-form-cat mastercontainer">
              {amenityOptions && (
                <>
                  <div className="business-form-cat">
                    <h3 className="amen-title">Amenities</h3>
                    <div className="business-form category container">
                      {amenityOptions.map((amenity, idx) => (
                        <div
                          key={idx}
                          className="business-form amenity listing"
                        >
                          <label>
                            <input
                              key={idx * 3.01}
                              className="business-form-categories"
                              type="checkbox"
                              checked={Object.values(amenityList)?.includes(
                                amenity
                              )}
                              onChange={(e) => {
                                if (e.target.checked === true) {
                                  setAmenityList([...amenityList, amenity]);
                                } else {
                                  const updatedAmenityList = amenityList.filter(
                                    (selectedAmenity) =>
                                      selectedAmenity !== amenity
                                  );
                                  setAmenityList(updatedAmenityList);
                                }
                              }}
                            />
                            {amenity}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="selected">
                    <h3 className="cat-title">Selected</h3>
                    <ul>
                      {Object.values(amenityList)?.map((amenity, idx) => (
                        <li key={idx * 1.22}>{amenity}</li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
            </div>
            <button
              className="big-red-button"
              type="submit"
              disabled={disableLogin}
            >
              {!businessData && "Create"}
              {businessData && "Update"}
            </button>
          </form>
        </div>
        <div className="business-form-right">
          <img src="https://picsum.photos/644/631.jpg" alt="" />
        </div>
      </div>
    </>
  );
};

export default BusinessForm;
