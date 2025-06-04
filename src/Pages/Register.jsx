import Lottie from "lottie-react";
import login from "../Login.json";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import { toast } from "react-toastify";

const Register = () => {
  const { createUser, setUser, updateUserProfile } = useContext(AuthContext);
  const [inputType, setInputType] = useState("password");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = new FormData(e.target);
    const name = form.get("name");
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/;

    const email = form.get("email");
    const password = form.get("password");
    const photo = form.get("photo");

    if (!passwordRegex.test(password)) {
      toast.error(
        "Password must be at least 6 characters one uper case and one lower case character"
      );
      return;
    }

    createUser(email, password)
      .then((result) => {
        setUser(result.user);
        updateUserProfile({ displayName: name, photoURL: photo }).then(() => {
          navigate("/");
        });
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <Lottie className="w-full" animationData={login} />
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form className="card-body" onSubmit={handleSubmit}>
            <fieldset className="fieldset">
              <label className="fieldset-label">Name</label>
              <input
                type="text"
                name="name"
                className="input"
                placeholder="Name"
              />
              <fieldset className="fieldset relative">
                <label className="fieldset-label">Photo URL</label>
                <input
                  type="text"
                  name="photo"
                  className="input"
                  placeholder="Photo URL"
                />
              </fieldset>
            </fieldset>
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
                <a className="link link-hover font-semibold text-gray-500">
                  Forgot password?
                </a>
              </div>
            </fieldset>
            <div className="flex flex-col space-y-4">
              <button className="btn btn-neutral mt-4">Register</button>

              <Link
                className="text-center font-semibold text-gray-500"
                to="/login"
              >
                Already Have An Account ?{" "}
                <span className="text-red-600">Login</span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
