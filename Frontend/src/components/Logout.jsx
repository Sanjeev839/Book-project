import React, { useContext } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../Context/Context';

const LogoutButton = () => {
  const { logout } = useContext(SearchContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("LOGGED OUT SUCCESSFULLY");
    navigate('/');
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={true} />
      <button
        onClick={handleLogout}
        className="mt-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 duration-300"
      >
        Logout
      </button>
    </>
  );
};

export default LogoutButton;
