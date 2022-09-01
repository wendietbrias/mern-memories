import { useSelector, useDispatch } from "react-redux";
import { GoogleLogin } from "@react-oauth/google";
import { useEffect, useState } from "react";
import { SignInHandler, SignUpHandler } from "../action/Auth";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Auth = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [isSignUp, setIsSignUp] = useState(false);
  const [seePass, setSeePass] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignUp) {
      return dispatch(SignUpHandler(formData));
    }
    dispatch(SignInHandler(formData));
  };

  useEffect(() => {
    if (auth) {
      window.location.href = "http://localhost:3000";
    }
  }, [auth]);

  return (
    <div className="w-[40%] rounded-md py-7 px-7 mx-auto mt-12 shadow-md bg-white">
      <h2 className="text-2xl text-center capitalize font-semibold">
        Authentication
      </h2>
      <form onSubmit={handleSubmit} className="mt-7">
        {isSignUp ? (
          <input
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
            name="name"
            type="text"
            placeholder="Enter name..."
            className="w-full mb-3 rounded-sm outline-none focus:ring-1 focus:ring-blue-300 border border-slate-300 py-2 px-2"
          />
        ) : null}
        <input
          onChange={(e) =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
          name="email"
          type="email"
          placeholder="Enter email..."
          className="w-full rounded-sm outline-none focus:ring-1 focus:ring-blue-300 border border-slate-300 py-2 px-2"
        />
        <div className="mt-3  relative">
          <button
            type="button"
            onClick={() => setSeePass(!seePass)}
            className="absolute right-3 top-3 text-slate-500 text-xl"
          >
            {seePass ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
          </button>
          <input
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
            name="password"
            type={seePass ? "password" : "text"}
            placeholder="Enter password..."
            className="w-full rounded-sm outline-none focus:ring-1 focus:ring-blue-300 border border-slate-300 py-2 px-2"
          />
        </div>
        <button className="w-full bg-blue-400 text-white font-semibold text-md py-2 rounded-md mt-5">
          {isSignUp ? "Register" : "Login"}
        </button>
      </form>
      {isSignUp ? null : (
        <button className="w-full mt-2">
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              console.log(credentialResponse);
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </button>
      )}
      <button
        onClick={() => setIsSignUp(!isSignUp)}
        className="text-right w-full mt-4 text-gray-400"
      >
        {isSignUp
          ? "Already have account? Login"
          : "Don't have account?Register"}
      </button>
    </div>
  );
};

export default Auth;
