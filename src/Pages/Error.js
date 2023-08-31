import error from "../Images/page-not-found.svg";

export const ErrorPage = () => {
  return (
    <>
      <img src={error} alt="404 Page Not Found" className="top-shift" />
      <h2>404 Page Not Found</h2>
      <p>
        We could not find the page you were looking for. But here's some mint
        tea. Enjoy!
      </p>
    </>
  );
};
