import axios from 'axios';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';

const Add = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append('image', data.image[0]);
        formData.append('author', data.author);
        formData.append('category', data.category);
        formData.append('name', data.name);
        formData.append('price', data.price);
        formData.append('id',data.id);
        try {
            const response = await axios.post('http://localhost:8080/api/v1/books/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
           
            toast.success("Mail Sent Successfully");
            reset();
            navigate(from, { replace: true });
        } catch (error) {
            console.error('Error:', error);
            toast.error("Email failed. Please try again.");
        }finally {
            setLoading(false);
          }
    };


    return (
        <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 mt-4">
            <Toaster position="top-right" reverseOrder={true} />
            <div className="flex justify-center items-center min-h-screen">
                <div className="card w-full max-w-lg shadow-lg p-8 border-[1px]">
                    <h2 className="text-2xl font-bold mb-6 text-center">Publish here</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Book-Name</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Your Name"
                                className="input input-bordered w-full"
                                {...register("name", { required: "name is required" })}
                            />
                            {errors.email && (
                                <span className="text-red-500 text-sm">{errors.email.message}</span>
                            )}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Id</span>
                            </label>
                            <input
                                type="number"
                                placeholder="Your id"
                                className="input input-bordered w-full"
                                {...register("id", { required: "id is required" })}
                            />
                            {errors.subject && (
                                <span className="text-red-500 text-sm">{errors.subject.message}</span>
                            )}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Author</span>
                            </label>
                            <input
                                placeholder="Author"
                                className="input input-bordered w-full"
                                {...register("author", { required: "author is required" })}
                            ></input>
                            {errors.message && (
                                <span className="text-red-500 text-sm">{errors.message.message}</span>
                            )}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Price</span>
                            </label>
                            <input
                                placeholder="Price"
                                className="input input-bordered w-full"
                                {...register("price", { required: "Price is required" })}
                            ></input>
                            {errors.message && (
                                <span className="text-red-500 text-sm">{errors.message.message}</span>
                            )}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Category</span>
                            </label>
                            <select
                                placeholder="Choose Category"
                                className="input input-bordered w-full"
                                {...register("category", { required: "Category is required" })}
                            >
                                <option value="FREE">FREE</option>
                                <option value="PAID">PAID</option>
                            </select>
                            {errors.message && (
                                <span className="text-red-500 text-sm">{errors.message.message}</span>
                            )}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Coverpage</span>
                            </label>

                            <input
                                type="file"
                                accept="image/*"
                                className="input input-bordered w-full"
                                {...register("image", { required: "Image is required" })}
                            
                            />
                            {errors.image && (
                                <span className="text-red-500 text-sm">{errors.image.message}</span>
                            )}
                        </div>


                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-primary w-full" disabled={loading}>
                                {loading ? "Sending..." : "Upload"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Add
