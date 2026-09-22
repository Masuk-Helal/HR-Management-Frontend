import React, { useEffect, useState } from "react";
import { baseUrl } from "../services/BaseUrl";
// import BookCard from "../component/BookCard";

const BrowseBook = () => {
  // const [featureBooks, SetFeatureBook] = useState([]);

  // useEffect(() => {
  //   fetch(`${baseUrl}/books/all`)
  //     .then((res) => res.json())
  //     .then((data) => SetFeatureBook(data));
  // }, []);
  return (
    <div>
      <h1 className="text-center text-4xl font-bold py-16">Feature Bookssssss</h1>
      <div className="grid grid-cols-3 gap-12 px-24">
        {/* {featureBooks.map((book) => (
          <BookCard book={book} id={book.id}></BookCard>
        ))} */}
      </div>
    </div>
  );
};

export default BrowseBook;
