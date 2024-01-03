import React, { useState, useEffect } from 'react';
import { v4 as uuid } from "uuid";
import { setDoc, doc } from 'firebase/firestore';
import { db } from '../Firebase';

const ValuesForm = () => {
    
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [btnDisabled, setBtnDisabled] = useState(false);

    const valuesUploader = async () => {
      setBtnDisabled(true);
      const unique_id = uuid();
      const modalButton = document.getElementById('values-modal-btn');
      try {
        const docRef = await setDoc(doc(db, 'values', unique_id), {
          title: title,
          description: desc,
          id: unique_id,
        });
        setTitle('');
        setDesc('');
        modalButton.click();
        setBtnDisabled(false);
      } catch (error) {
        console.error(error);
      }
    };
  
  return (
    <React.Fragment >
        <div className='table_header'>
            <h3>USPs</h3>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#valuesModal">
                Add USPs
            </button>
        </div>
        <div className="modal fade" id="valuesModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Add USP Item</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div>
                            <input className='input' placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)}/>
                            <textarea className='input' placeholder='Desciption' value={desc} onChange={(e) => setDesc(e.target.value)}></textarea>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button className={btnDisabled ? 'btn btn-secondary disabled' : 'btn btn-secondary'} id='values-modal-btn' type="button" data-bs-dismiss="modal">Close</button>
                        <button className={btnDisabled ? 'btn btn-primary disabled' : 'btn btn-primary'} onClick={() => valuesUploader()} type="button" data-bs-dismiss="modal">Add USP</button>
                    </div>
                </div>
            </div>
        </div>
    </React.Fragment>
  )
}

export default ValuesForm