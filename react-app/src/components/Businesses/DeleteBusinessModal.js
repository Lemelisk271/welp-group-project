import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteBusiness } from "../../store/business";
import { useModal } from "../../context/Modal";

const DeleteBusinessModal = ({ business }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();

  const handleDelete = async (e) => {
    e.preventDefault();
    dispatch(deleteBusiness(business.id)).then(closeModal);
    history.push("/");
  };

  return (
    <>
      <div className="delete modal container">
        <h1 className="delete modal title"> Confirm Delete</h1>
        <h2 className="delete modal title">Are you sure you want to remove this business?</h2>
        <div className="delete modal button container">
          <button className="delete modal yes" onClick={handleDelete}>
            Yes (Delete Business)
          </button>
          <button className="delete modal no" onClick={closeModal}>
            No (Keep Business)
          </button>
        </div>
      </div>
    </>
  );
};

export default DeleteBusinessModal;
