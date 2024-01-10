import React,{ useState } from 'react'
import { deleteDoc,doc,updateDoc } from 'firebase/firestore';
import { db } from '../Firebase';
import parse from 'html-react-parser';


const ApprovedTable = ({data}) => {

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState("");


    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const filteredUsers =  data.filter(
      (data) =>
        data.quote.toLowerCase().includes(searchTerm.toLowerCase()) 
    );
  
    const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = searchTerm == "" ? Math.ceil(data.length / itemsPerPage) :
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


    const updateCommunity = async (id) =>{
        const findingData = data.find((res)=>{
          return res.id == id
        })   
       const approving_obj = {...findingData,approved:true}
       console.log(approving_obj)
       const approvingData = doc(db, "testimonials", approving_obj.id);
       await updateDoc(approvingData, approving_obj);
      }

      const deleteCommunity = async (id) =>{
        
        const deleteReq = await deleteDoc(doc(db, "testimonials", id));
        
    }

  return (
   <React.Fragment>
    <div className='table_cards'>
      <div className="table">
        <div className="entries">
          <p>
            Show 
            <select className="form-select" aria-label="Default select example" value={itemsPerPage}
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
                          {item.id && <button className='btn btn-ghost' onClick={()=> deleteCommunity(item.id)}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M17.96 5.83002H5.69V19.19C5.69 20.32 6.61001 21.24 7.74001 21.24H15.9C17.03 21.24 17.95 20.32 17.95 19.19V5.83002H17.96Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M3.78998 5.83002H20.21" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M15.08 2.73999H8.91998V5.81999H15.08V2.73999Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M9.94 9.75V17.14" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M14.05 9.75V17.14" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </button>}
                        </div>
                    </div>
                  ))}
            </div>
        </div>
        <div className='pagination-container'>
          <p>
            Showing {indexOfFirstItem +1} to  {currentPage === totalPages ? data.length : indexOfLastItem} of {data.length}{" "}
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
   </React.Fragment>
  )
}

export default ApprovedTable
