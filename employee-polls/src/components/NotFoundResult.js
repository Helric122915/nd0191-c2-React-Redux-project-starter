import { useLocation } from "react-router-dom";

const NotFoundResult = () => {
  const location = useLocation();

  return (
    <div>
      <h1>404 Invalid Route: {location.pathname}</h1>
    </div>
  );
};

export default NotFoundResult;
