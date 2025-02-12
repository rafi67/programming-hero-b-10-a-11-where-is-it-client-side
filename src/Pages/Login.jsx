import Lottie from "lottie-react";
import login from "../Login.json";
import { FcGoogle } from "react-icons/fc";
import { useContext, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Login = () => {
  const { userLogin, userLoginWithGoogle, setUser, user } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const [inputType, setInputType] = useState("password");
  const [showPassword, setShowPassword] = useState(false);

  const signInWithGoogle = (e) => {
    e.preventDefault();
    userLoginWithGoogle()
      .then((result) => {
        setUser(result.user);
        navigate(location?.state ? location.state : "/");
      })
      .catch((err) => {
        toast.error(err.message);
      });
    console.log(user);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    userLogin(email, password)
      .then((result) => {
        setUser(result.user);
        navigate(location?.state ? location.state : "/");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <Lottie className="w-full" animationData={login} />
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div onSubmit={handleSubmit} className="card-body">
            <fieldset className="fieldset">
              <label className="fieldset-label">Email</label>
              <input
                type="email"
                name="email"
                className="input"
                placeholder="Email"
              />
              <fieldset className="fieldset relative">
                <label className="fieldset-label">Password</label>
                <button
                  className="cursor-pointer w-[20%] text-gray-400 hover:bg-transparent bg-transparent border-none absolute top-10 right-0"
                  onClick={(e) => {
                    e.preventDefault();
                    inputType === "password"
                      ? setInputType("text")
                      : setInputType("password");
                    setShowPassword(!showPassword);
                  }}
                >
                  {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                </button>
                <input
                  type={inputType}
                  name="password"
                  className="input"
                  placeholder="Password"
                />
              </fieldset>
              <div>
                <a className="link link-hover font-semibold text-gray-500">Forgot password?</a>
              </div>
            </fieldset>
            <div className="flex flex-col space-y-4">
              <button className="btn btn-neutral mt-4">Login</button>
              <hr className="border-gray-500" />
              <button className="btn" onClick={signInWithGoogle}>
                <FcGoogle className="text-2xl" />
                Login With Google
              </button>
              <Link className="text-center font-semibold text-gray-500">Don't Have An Account ? <span className="text-red-600">Register</span></Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
