import { useBox } from "../Contexts/BoxProvider";

export const NotificationModal = () => {
  const { screenshot, setShowModal } = useBox();
  return (
    <div className="overlay" onClick={() => setShowModal(false)}>
      <div className="notification-modal">
        <i class="fa-solid fa-circle-xmark cross"></i>
        <img src={screenshot} alt="screenshot" />
        <div>
          <h3>Screenshot Successfully Captured!</h3>
          <p>You can now go check it your cube.</p>
        </div>
      </div>
    </div>
  );
};
