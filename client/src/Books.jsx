import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
const Books = () => {
  const [books, setBooks] = useState([])
  useEffect(() => {
    axios.get('http://localhost:3030')
      .then(res => setBooks(res.data))
      .catch(err => console.log(err))
  }, [])
  const handleDelete = (id) => {
    axios.delete('http://localhost:3030/delete/'+ id)
    .then(res => window.location.reload())
    .catch(err => console.log(err))
  }
  return (
    <div className='container mt-5'>
     <Link to="/create" className="btn btn-success mt-3">
               Create Book
               </Link>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Publisher</th>
            <th scope="col">Book Name</th>
            <th scope="col">Date</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
        {books.length > 0 ? (
         books.map(book =>(
          <tr key={book.id}>
            <td>{book.id}</td>
            <td>{book.publisher}</td>
            <td>{book.name}</td>
            <td>{book.date}</td>
            <td>
              <Link to={`/update/${book.id}`} className="btn btn-info btn-sm me-2" id='update'>Update</Link>
              <button type="button" onClick={() => handleDelete(book.id)} className="btn btn-danger btn-sm" id='delete'>Delete</button>
            </td>
          </tr>
         ))
        ):(
          <tr>
            <td colSpan="4" className='text-left'>
              No Records found <br/>
            </td>
          </tr>
          
         )}
        </tbody>
      </table>
      
    </div>
  )
}

export default Books
