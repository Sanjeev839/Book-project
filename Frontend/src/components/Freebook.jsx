import React, { useContext, useEffect, useState } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Cards from './Cards';
import axios from 'axios';
import { SearchContext } from '../Context/Context';

const Freebook = () => {
  const [books, setBooks] = useState([]);
  const { searchQuery } = useContext(SearchContext);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/v1/books/");
        if (Array.isArray(response.data.message)) {
          const freeBooks = response.data.message.filter((item) => item.category === "FREE");
          setBooks(freeBooks); // Set state with the nested array
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

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
        <div>
          <h1 className="font-semibold text-xl pb-2">Free Offered Courses</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Accusantium veritatis alias pariatur ad dolor repudiandae eligendi
            corporis nulla non suscipit, iure neque earum?
          </p>
        </div>

        <div>
          {filteredBooks.length > 0 ? (
            <Slider {...settings}>
              {filteredBooks.map((item) => (
                <Cards item={item} key={item._id} />
              ))}
            </Slider>
          ) : (
            <p>No books available</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Freebook;
