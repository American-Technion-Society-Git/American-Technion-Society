import React, { useState } from 'react'
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../Firebase';
import value_icon from '../assets/footer_logo.png';

const ValuesTable = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [updateObj, setUpdateObj] = useState({})
  const [btnDisabled, setBtnDisabled] = useState(false)

  const deleteData = async (id) => {
    const deleteReq = await deleteDoc(doc(db, "values", id));
  }



  const editData = async (id) => {
    const btn = document.getElementById("edit-ups-btn")
    const findingData = data.filter((res) => {
      return res.id == id
    })

    setUpdateObj(findingData[0])
    btn.click()
  }


  const editBlogData = async () => {
    setBtnDisabled(true)
    const updatingData = doc(db, "values", updateObj.id);
    await updateDoc(updatingData, updateObj);
    setBtnDisabled(false)
    document.getElementById("close-edit-modal").click()
  }

  return (
    <>
      <button type="button" style={{ visibility: "collapse" }} id='edit-ups-btn' className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editValuesModal">
        Edit USPs
      </button>

      <div className="modal fade" id="editValuesModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit USP Item</h5>
              <button type="button" id='close-edit-modal' className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div>
                <input className='input' placeholder='Title' value={updateObj.title} onChange={(e) => setUpdateObj({ ...updateObj, title: e.target.value })} />
                <textarea className='input' placeholder='Desciption' value={updateObj.description} onChange={(e) => setUpdateObj({ ...updateObj, description: e.target.value })}></textarea>
              </div>
            </div>
            <div className="modal-footer">
              <button className={btnDisabled ? 'btn btn-secondary disabled' : 'btn btn-secondary'} id='values-modal-btn' type="button" data-bs-dismiss="modal">Close</button>
              <button className={btnDisabled ? 'btn btn-primary disabled' : 'btn btn-primary'} onClick={() => editBlogData()} type="button" data-bs-dismiss="modal">Add USP</button>
            </div>
          </div>
        </div>
      </div>

      <div className='table_cards values'>
        <div className="table">
          <div className="table-container">
            <div className='table_row'>
              {data.map((item, i) => (
                <div key={i} className="table_card">
                  <div className='thumb'>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM15.59 10.59L12.07 14.11C11.92 14.26 11.73 14.33 11.54 14.33C11.35 14.33 11.15 14.26 11.01 14.11L9.25 12.35C8.95 12.06 8.95 11.58 9.25 11.29C9.54 11 10.02 11 10.31 11.29L11.54 12.52L14.53 9.53C14.82 9.24 15.29 9.24 15.59 9.53C15.88 9.82 15.88 10.3 15.59 10.59Z" fill="black" />
                    </svg>
                  </div>
                  <div className='details'>
                    <div className="cluster">
                      <p className="heading_small">Title</p>
                      <p className='name'>
                        {item.title}
                      </p>
                    </div>
                    <div className="cluster">
                      <p className="heading_small">Description</p>
                      <p className="description">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <div className='actions'>
                    {item.id && <button className='btn btn-ghost' onClick={() => deleteData(item.id)}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.96 5.83002H5.69V19.19C5.69 20.32 6.61001 21.24 7.74001 21.24H15.9C17.03 21.24 17.95 20.32 17.95 19.19V5.83002H17.96Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M3.78998 5.83002H20.21" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M15.08 2.73999H8.91998V5.81999H15.08V2.73999Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M9.94 9.75V17.14" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M14.05 9.75V17.14" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>}
                    {item.id && <button className='btn btn-ghost' onClick={() => editData(item.id)}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.46001 21.24L21.25 6.45L17.55 2.75L2.75999 17.54L2.75 21.25L6.46001 21.24Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M15.35 6.13L17.87 8.64999" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ValuesTable
