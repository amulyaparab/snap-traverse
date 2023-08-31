import { useNavigate } from "react-router-dom";
import { useBox } from "../Contexts/BoxProvider";

export const NotificationModal = () => {
  const { screenshot, setShowModal } = useBox();
  const navigate = useNavigate();

  return (
    <div className="overlay" onClick={() => setShowModal(false)}>
      <div
        className="notification-modal"
        onClick={(event) => {
          event.stopPropagation();
          navigate("/cube");
        }}
      >
        <i
          className="fa-solid fa-circle-xmark cross"
          onClick={(event) => {
            event.stopPropagation();
            setShowModal(false);
          }}
        ></i>
        <img src={screenshot} alt="screenshot" />
        <div>
          <h3>Screenshot Successfully Captured!</h3>
          <p>You may now go check it on your cube.</p>
        </div>
      </div>
      <div className="line"></div>{" "}
    </div>
  );
};
