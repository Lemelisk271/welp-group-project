import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBusiness, updateBusiness } from "../../store/business";
import { useHistory } from "react-router-dom";

const BusinessForm = ({businessData}) => {
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
  const [image, setImage] = useState('')
  const [unavailable, setUnavailable] = useState("");
  const [disableLogin, setDisableLogin] = useState(true);
  const ownerId = useSelector((state) => state.session.user.id);

  useEffect(() => {
    if (!name || !phone || !address || !city || !state || !zipCode || !price) {
      setDisableLogin(true);
      setUnavailable("unavailable");
    } else {
      setDisableLogin(false);
      setUnavailable("");
    }
  }, [name, phone, address, city, state, zipCode, price]);

  useEffect(() => {

    if(businessData){
      setName(businessData?.name);
      setUrl(businessData?.url)
      setPhone(businessData?.phone)
      setAddress(businessData?.address)
      setState(businessData?.state)
      setCity(businessData?.city)
      setZipCode(businessData?.zip_code)
      setAbout(businessData?.about)
      setPrice(businessData?.price)
      for (let image of businessData?.images) {
        if (image.preview === true){
          setImage(image.url)
        }
      }
    }
  }, [businessData])

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
      imgUrl: image,
      preview: true
    };
    let resBusiness

    try {
      if(businessData){
        newBusiness.id = businessData.id
        resBusiness = await dispatch(updateBusiness(newBusiness))
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
    {businessData && <h1>UPDATE BUSINESS FORM</h1>}
    {!businessData && <h1>NEW BUSINESS FORM</h1>}

      <form className="new-business-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {}
        <input
          type="url"
          placeholder="Website Url"
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
          {businessData && "Create Business"}
          {!businessData && "Update Business"}
        </button>
      </form>
    </>
  );
};

export default BusinessForm;
