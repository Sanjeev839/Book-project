import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const onSubmit = async (data) => {
    const userInfo = {
      name: data.fullname,
      email: data.email,
      password: data.password,
    };
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/users/signup",
        userInfo
      );
      localStorage.setItem("user", JSON.stringify(response.data.message));
      
      
      // window.location.reload();
      setTimeout(()=>{
        toast.success("SIGNED IN SUCCESSFULLY");
      },1000)
      reset();
      navigate(from, { replace: true });
      window.location.reload();
    } catch (error) {
      console.log(error.message);
      toast.error("Signup failed. Please try again.");
    }
  };

  return (
    <>
      <div className="flex h-screen items-center justify-center">
        <Toaster position="top-right" reverseOrder={true} />
        <div className=" w-[600px] ">
          <div className="modal-box">
            <form onSubmit={handleSubmit(onSubmit)} method="dialog">
            <button
                onClick={() => navigate("/")}
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              >
                ✕
              </button>
              <h3 className="font-bold text-lg">Signup</h3>
              <div className="mt-4 space-y-2">
                <span>Name</span>
                <br />
                <input
                  type="text"
                  placeholder="Enter your fullname"
                  className="w-80 px-3 py-1 border rounded-md outline-none"
                  {...register("fullname", { required: true })}
                />
                <br />
                {errors.fullname && (
                  <span className="text-sm text-red-500">This field is required</span>
                )}
              </div>
              <div className="mt-4 space-y-2">
                <span>Email</span>
                <br />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-80 px-3 py-1 border rounded-md outline-none"
                  {...register("email", { required: true })}
                />
                <br />
                {errors.email && (
                  <span className="text-sm text-red-500">This field is required</span>
                )}
              </div>
              <div className="mt-4 space-y-2">
                <span>Password</span>
                <br />
                <input
                  type="text"
                  placeholder="Enter your password"
                  className="w-80 px-3 py-1 border rounded-md outline-none"
                  {...register("password", { required: true })}
                />
                <br />
                {errors.password && (
                  <span className="text-sm text-red-500">This field is required</span>
                )}
              </div>
              <div className="flex justify-center mt-4">
                <button className="bg-pink-500 text-white rounded-md px-3 py-1 hover:bg-pink-700 duration-200">
                  Signup
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
