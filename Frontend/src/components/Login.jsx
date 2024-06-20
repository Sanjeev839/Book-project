import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation,Link } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useContext } from "react";
import { SearchContext } from "../Context/Context";

function Login() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const { login } = useContext(SearchContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const onSubmit = async (data) => {
    const userInfo = { email: data.email, password: data.password };
    try {
      const response = await axios.post("http://localhost:8080/api/v1/users/login", userInfo);
      login(response.data.message);
      toast.success("LOGGED IN SUCCESSFULLY");
      document.getElementById("my_modal_3").close();
      reset();
      navigate(from, { replace: true });
    } catch (error) {
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <div>
      <Toaster position="top-right" reverseOrder={true} />
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form onSubmit={handleSubmit(onSubmit)} method="dialog">
            {/* Close button */}
            <Link to="/" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</Link>
            <div className="flex justify-center">
              <h3 className="font-bold text-lg">Login</h3>
            </div>
            {/* Email input */}
            <div className="mt-4 space-y-2">
              <label htmlFor="email">Email : </label>
              <input id="email" type="email" placeholder="Enter your email" className="w-80 px-3 py-1 border rounded-md outline-none" {...register("email", { required: true })} />
              {errors.email && <span className="text-sm text-red-500">This field is required</span>}
            </div>
            {/* Password input */}
            <div className="mt-4 space-y-2">
              <label htmlFor="password">Password : </label>
              <input id="password" type="password" placeholder="Enter your password" className="w-80 px-3 py-1 border rounded-md outline-none" {...register("password", { required: true })} />
              {errors.password && <span className="text-sm text-red-500">This field is required</span>}
            </div>
            {/* Buttons and Links */}
            <div className="flex justify-around mt-6">
              <button type="submit" className="bg-pink-500 text-white rounded-md px-3 py-1 hover:bg-pink-700 duration-200">Login</button>
              <div>
                <p>Not registered?</p>
                <Link to="/signup" onClick={()=>document.getElementById("my_modal_3").close()} className="underline text-blue-500 cursor-pointer">Signup</Link>
              </div>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}

export default Login;
