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
          class="fa-solid fa-circle-xmark cross"
          onClick={(event) => {
            event.stopPropagation();
            setShowModal(false);
          }}
        ></i>
        <img src={screenshot} alt="screenshot" />
        <div>
          <h3>Screenshot Successfully Captured!</h3>
          <p>You can now go check it your cube.</p>
        </div>
      </div>
      <div className="line"></div>{" "}
    </div>
  );
};
