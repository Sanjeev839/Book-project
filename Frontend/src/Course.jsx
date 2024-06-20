import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Cards from '../src/components/Cards';
import axios from 'axios';
import { SearchContext } from './Context/Context';

const Course = () => {
  const [books, setBooks] = useState([]);
  const { searchQuery } = useContext(SearchContext);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/v1/books/");
        if (Array.isArray(response.data.message)) {
          setBooks(response.data.message); // Set state with the array
        } else {
          console.error("Error: response.data.message is not an array", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  const filteredBooks = books.filter((book) =>
    book.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
        <div className="mt-28 items-center justify-center text-center">
          <h1 className="text-2xl md:text-4xl">
            We're delighted to have you{" "}
            <span className="text-pink-500">Here! :)</span>
          </h1>
          <p className="mt-12">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro,
            assumenda? Repellendus, iste corrupti? Tempore laudantium
            repellendus accusamus accusantium sed architecto odio, nisi expedita
            quas quidem nesciunt debitis dolore non aspernatur praesentium
            assumenda sint quibusdam, perspiciatis, explicabo sequi fugiat amet
            animi eos aut. Nobis quisquam reiciendis sunt quis sed magnam
            consequatur!
          </p>
          <Link to="/Add">
            <button className="mt-6 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300">
              Add Your Book
            </button>
          </Link>
        </div>

        {filteredBooks.length > 0 ? (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-4">
            {filteredBooks.map((item) => (
              <Cards item={item} key={item._id} />
            ))}
          </div>
        ) : (
          <p className="mt-12 text-center">No books available</p>
        )}
      </div>
    </>
  );
}

export default Course;
