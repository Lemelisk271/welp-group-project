import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBusiness } from "../../store/business";

const BusinessForm = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [about, setAbout] = useState("");
  const [price, setPrice] = useState("");
  const ownerId = useSelector(state => state.session.user.id)

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
      ownerId,
    };
    await dispatch(createBusiness(newBusiness));
  };

  return (
    <>
      <p>NEW BUSINESS FORM</p>
      <form className="new-business-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="url"
          placeholder="Image Url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <input
          type="tel"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <input
          type="text"
          placeholder="State"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
        <input
          type="number"
          placeholder="Zipcode"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
        />
        <input
          type="text"
          placeholder="About"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button
          type="submit"
        //   disabled={disableLogin}
          className={`signup button`}
        >
          Create Business
        </button>
      </form>
    </>
  );
};

export default BusinessForm;
