import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBusiness, updateBusiness } from "../../store/business";
import { Redirect, useHistory } from "react-router-dom";
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
    const [frontEndErrors, setFrontEndErrors] = useState({});
    const [image, setImage] = useState("");
    const [priceRating, setPriceRating] = useState("");
    const [tempRating, setTempRating] = useState(0);
    const [unavailable, setUnavailable] = useState("");
    const [disableLogin, setDisableLogin] = useState(true);
    const [disableTime, setDisableTime] = useState("");
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
        history.push("/error/not-logged-in")
      } else {
        setUserId(sessionUser.id);
      }
    }, []);
    
    const handleDateUpdate = (day, updatedValues) => {
        const set = `set${day.day}`;
        const updateClosed = { ...day, ...updatedValues };
        switch (day.day) {
            case "Mon":
                setMon(updateClosed);
                break;
            case "Tue":
                setTue(updateClosed);
                break;
            case "Wed":
                setWed(updateClosed);
                break;
            case "Thu":
                setThu(updateClosed);
                break;
            case "Fri":
                setFri(updateClosed);
                break;
            case "Sat":
                setSat(updateClosed);
                break;
            case "Sun":
                setSun(updateClosed);
                break;
            default:
                break;
        }
    };

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
    }, [name, phone, address, city, state, zipCode, priceRating]);

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
        setFrontEndErrors({});
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
        if (Object.keys(errorObj).length === 0) {
            try {
                if (businessData) {
                    newBusiness.id = businessData.id;
                    resBusiness = await dispatch(updateBusiness(newBusiness));
                    console.log("PONT1", resBusiness.errors);
                    if (resBusiness.errors) {
                        setErrors(resBusiness.errors);
                    } else {
                        history.push(`/business/${resBusiness.id}`);
                    }
                } else {
                    try {
                        resBusiness = await dispatch(
                            createBusiness(newBusiness)
                        );
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
                            } catch (err) {
                                if (err) {
                                    errorObj.image =
                                        "Something went wrong with your image upload";
                                }
                            }
                            try {
                                await Promise.all(
                                    dayList.map(async (day) => {
                                        const hoursFormData = new FormData();
                                        hoursFormData.append("day", day.day);
                                        if (day.closed) {
                                            day.open_time = "00:00";
                                            day.close_time = "00:00";
                                        }
                                        hoursFormData.append(
                                            "open_time",
                                            day.open_time
                                        );
                                        hoursFormData.append(
                                            "close_time",
                                            day.close_time
                                        );
                                        hoursFormData.append(
                                            "closed",
                                            day.closed
                                        );
                                        const addBusinessHours = await fetch(
                                            `/api/business/${resBusiness.id}/hours`,
                                            {
                                                method: "POST",
                                                body: hoursFormData,
                                            }
                                        );
                                    })
                                );
                                history.push(`/business/${resBusiness.id}`);
                            } catch (err) {
                                if (err) {
                                    console.log(err);
                                    errorObj.hours =
                                        "Something went wrong with your business hours";
                                }
                            }
                        }
                    } catch (err) {
                        console.log("ERR1", err);
                    }
                }
            } catch (err) {
                console.log("ERR2", err);
                if (err) {
                    console.log("ERR3", err);
                    // const { errors } = err;
                    // setErrors(errors);
                }
            }
        }

        setFrontEndErrors({ ...errorObj });
        console.log("FINALO FE", frontEndErrors);
        console.log("FINALO BE", errors);
        Object.values(frontEndErrors).map((error) => {
            console.log(error);
        });
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
                                We’ll use this information to help you claim
                                your Yelp page. Your business will come up
                                automatically if it is already listed.
                            </p>
                        </div>
                    )}
                    <ul>
                        {Object.values(frontEndErrors).length != 0 &&
                            Object.values(frontEndErrors).map((error, idx) => (
                                <li
                                    key={idx + 20}
                                    className="business-form-error"
                                >
                                    {error}
                                </li>
                            ))}
                        {errors &&
                            Object.values(errors).map((error, idx) => (
                                <li key={idx} className="business-form-error">
                                    {error}
                                </li>
                            ))}
                    </ul>
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
                            placeholder="Business Phone Number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
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
                                <option value="United States">
                                    United States
                                </option>
                            </select>
                        </div>
                        <textarea
                            className="full-width"
                            placeholder="Tell us a little about your business"
                            value={about}
                            onChange={(e) => setAbout(e.target.value)}
                        />
                        <div className="business-form-address">
                            <div className="price-rating">
                                {[1, 2, 3, 4, 5].map((rating) => (
                                    <div
                                        key={rating}
                                        className={`${
                                            priceRating >= rating ||
                                            tempRating >= rating
                                                ? "filled"
                                                : "empty"
                                        }`}
                                        onClick={() => {
                                            setPriceRating(rating);
                                            setTempRating(rating);
                                        }}
                                        onMouseEnter={() =>
                                            setTempRating(rating)
                                        }
                                        onMouseLeave={() => setTempRating(0)}
                                    >
                                        <i className="fa-solid fa-dollar"></i>
                                    </div>
                                ))}
                            </div>
                            {!businessData && (
                                <input
                                    className="business-form-address-street"
                                    id="image"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) =>
                                        setImage(e.target.files[0])
                                    }
                                />
                            )}
                        </div>
                        <div className="business-form-days master container">
                            <h3>Hours</h3>
                            {dayList.map((day) => (
                                <div
                                    key={day.day}
                                    className="business-form-days day container"
                                >
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
                                    <p className="business-form-days day label">
                                        {day.day}
                                    </p>
                                    <input
                                        className="business-form-days open time"
                                        type="time"
                                        value={day.open_time || ""}
                                        onChange={(e) => {
                                            handleDateUpdate(day, {
                                                open_time:
                                                    e.target.value || null,
                                            });
                                        }}
                                        disabled={day.closed}
                                    />
                                    <input
                                        className="business-form-days close time"
                                        type="time"
                                        value={day.close_time || ""}
                                        onChange={(e) => {
                                            handleDateUpdate(day, {
                                                close_time:
                                                    e.target.value || null,
                                            });
                                        }}
                                        disabled={day.closed}
                                    />
                                </div>
                            ))}
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
                    <img src="https://picsum.photos/644/631.jpg" />
                </div>
            </div>
        </>
    );
};

export default BusinessForm;
