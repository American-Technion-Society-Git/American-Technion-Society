import React, { useState } from 'react'
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../Firebase';
import parse from 'html-react-parser';

const PendingTable = ({ data }) => {

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const filteredUsers = data.filter(
    (data) =>
      data.quote.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = searchTerm === "" ? Math.ceil(data.length / itemsPerPage) :
    Math.ceil(filteredUsers.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to the first page when the search term changes
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`${currentPage === i ? "btn btn-accent" : "btn btn-secondary"}`}>
          {i}
        </button>
      );
    }
    return pageNumbers;
  };


  const updateCommunity = async (id) => {
    const findingData = data.find((res) => {
      return res.id === id
    })
    const approving_obj = { ...findingData, approved: true }

    const approvingData = doc(db, "testimonials", approving_obj.id);
    await updateDoc(approvingData, approving_obj);
  }

  const deleteCommunity = async (id) => {

    const deleteReq = await deleteDoc(doc(db, "testimonials", id));

  }

  return (
    <div className='table_cards'>
      <div className="table">
        <div className="entries">
          <p>
            Show
            <select class="form-select" aria-label="Default select example" value={itemsPerPage}
              onChange={(e) => setItemsPerPage(e.target.value)}>
              <option value="5" selected>5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
            Entries
          </p>
          <span className="ent-txt">
            <input
              value={searchTerm}
              onChange={handleSearchChange}
              type="search"
              className="input"
              placeholder="Search"
            />
          </span>
        </div>
        <div className="table-container">
          <div className='table_row'>
            {currentItems.map((item, i) => (
              <div key={i} className="table_card">
                <div className='thumb'>
                  <img src={item.featured_image} alt="" className="table_img" />
                </div>
                <div className='details'>
                  <div className="cluster">
                    <p className="heading_small">Name</p>
                    <p>
                      {item.name}
                    </p>
                  </div>
                  <div className="cluster">
                    <p className="heading_small">Description</p>
                    <p className="description">
                     {parse(`${item.quote}`)} 
                    </p>
                  </div>
                </div>
                <div className='actions'>
                  {item.id && <button className='btn btn-ghost' onClick={() => updateCommunity(item.id)}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.5 17L4.5 12" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M19.5 7L9.5 17" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                  </button>}
                  {item.id && <button className='btn btn-ghost' onClick={() => deleteCommunity(item.id)}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18 5.91L6 18.09" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M6 5.91L18 18.09" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                  </button>}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='pagination-container'>
          <p>
            Showing {indexOfFirstItem + 1} to  {currentPage === totalPages ? data.length : indexOfLastItem} of {data.length}{" "}
            entries
          </p>
          <div className="pagination">
            <button
              className="btn btn-secondary"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}>
              Previous
            </button>
            {renderPageNumbers()}
            <button
              className="btn btn-secondary"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PendingTable
