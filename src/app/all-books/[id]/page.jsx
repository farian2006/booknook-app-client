"use cache";
import React from 'react';

const BooksDetailsPage = async ({ params }) => {
    const { id } = await params;
    const res = await fetch(`http://localhost:5000/books/${id}`)
    const book = await res.json();

    
    return (
        <div>
            
        </div>
    );
};

export default BooksDetailsPage;