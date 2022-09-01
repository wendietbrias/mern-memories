import logo from "../assets/memories.png";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import decode from "jwt-decode";

const Navbar = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);
  const decoded = auth ? decode(auth) : {};

  return (
    <nav className="w-full bg-white shadow-md py-3 px-7 rounded-lg shadow-gray-400 flex justify-between items-center">
      <Link to="/">
        <div className="flex items-center">
          <img src={logo} alt="logo" className="w-16 h-16" />
          <h5 className="font-bold text-3xl ml-3">Memories</h5>
        </div>
      </Link>
      {auth ? (
        <div className="flex items-center">
          <span className="w-10 h-10 mr-7 font-semibold bg-blue-500 uppercase text-white flex items-center justify-center rounded-full">
            {decoded?.name?.charAt(0)}
          </span>
          <h5 className="text-md font-semibold">{decoded?.email}</h5>
          <button
            onClick={() => dispatch({ type: "LOGOUT" })}
            className="bg-red-400 ml-7 text-white font-semibold  text-md py-2 px-4 rounded-md"
          >
            Logout
          </button>
        </div>
      ) : (
        <Link to="/auth">
          <button className="py-2 px-5 rounded-md bg-blue-500 text-white text-md font-semibold">
            Sign In
          </button>
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
