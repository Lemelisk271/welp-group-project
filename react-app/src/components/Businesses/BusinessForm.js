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
            !price
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
            setPrice(businessData?.price);
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
            price,
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
                                <option value="United States">
                                    United States
                                </option>
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
                        <input
                            className="business-form-address-city"
                            type="number"
                            placeholder="Price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
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
