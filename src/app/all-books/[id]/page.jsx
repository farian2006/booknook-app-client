"use cache";
import Image from "next/image";
import React from "react";
import { FaFileInvoice } from "react-icons/fa";

import BorrowBookDialog from "../../../components/BorrowBookDialog";

export const instant = false;

const BooksDetailsPage = async ({ params }) => {
  const { id } = await params;
  const res = await fetch(`http://localhost:5000/books/${id}`, {
    cache: "no-store",
  });
  const book = await res.json();

  return (
    <div className="w-full max-w-6xl mx-auto bg-white rounded-3xl shadow-lg p-8 md:p-10">
      <div className="grid grid-cols-1 md:grid-cols-[380px_1fr] gap-10 items-center">
        <div className="flex justify-center">
          <Image
            src={book.imageUrl}
            alt="Books Image"
            width={200}
            height={200}
            className="w-70 h-100 object-cover rounded-2xl shadow-lg"
          />
        </div>

        <div className="flex flex-col gap-5">
          <p className="w-fit px-4 py-2 rounded-full bg-purple-100 text-purple-700 font-semibold">
            {book.category}
          </p>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            {book.title}
          </h1>

          <p className="text-xl font-semibold text-gray-800">{book.author}</p>

          <div className="flex flex-col gap-3 bg-purple-50 rounded-2xl p-6">
            <div className="flex items-center gap-3">
              <FaFileInvoice className="text-xl text-purple-700" />
              <p className="text-xl font-semibold text-gray-900">Description</p>
            </div>

            <p className="text-gray-700 leading-7">{book.description}</p>
          </div>
        </div>
      </div>

      <hr className="my-8 border-gray-200" />

      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <p className="text-sm text-gray-500 mb-1">Added by</p>

          <p className="text-xl font-bold text-gray-900">{book.userName}</p>

          <p className="text-gray-500">{book.email}</p>
        </div>

        <div className= "flex justify-center md:justify-end">
          <BorrowBookDialog book={book} />
        </div>
      </div>
    </div>
  );
};

export default BooksDetailsPage;
