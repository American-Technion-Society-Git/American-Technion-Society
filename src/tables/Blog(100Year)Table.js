import React, { useState, useEffect } from 'react'
import { updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db, storage } from '../Firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import parse from 'html-react-parser';

const Blog100YearTable = ({ data }) => {

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState("");
    const [updateObj, setUpdateObj] = useState({});
    const [imgUpload, setImgUpload] = useState(false)
    const [fileLoader, setFileLoader] = useState(false)
    const [btnDisabled, setBtnDisabled] = useState(false)
    const [imgUploaded, setImgUploaded] = useState(false)
    const [file, setFile] = useState([])
    const [description, setDescription] = useState('')


    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const filteredUsers = data.filter(
        (data) =>
            data.description.toLowerCase().includes(searchTerm.toLowerCase())
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
    const deleteData = async (id) => {
        const deleteReq = await deleteDoc(doc(db, "blog100YearData", id));
    }

    const editData = async (id) => {
        const btn = document.getElementById("edit-100yearblog-btn")
        const findingData = data.filter((res) => {
            return res.id == id
        })

        setUpdateObj(findingData[0])
        setDescription(updateObj.description)
        btn.click()
    }


    const editBlogData = async () => {
        setBtnDisabled(true)
        const updatingData = doc(db, "blog100YearData", updateObj.id);
        await updateDoc(updatingData, { ...updateObj, description: description });
        setBtnDisabled(false)
        document.getElementById("close-edit-modal").click()
    }

    useEffect(() => {
        const uploadImg = () => {
            setImgUploaded(false)
            const uniqueName = Math.floor(Math.random() * 100 * 100000) + '-' + file.name;
            const storageRef = ref(storage, uniqueName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on('state_changed',
                (snapshot) => {

                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    setFileLoader(true)
                    setBtnDisabled(true)
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            setFileLoader(true)
                            break;
                        default:
                            break;
                    }
                },
                (error) => {
                    console.log('error');
                    console.log(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        console.log('File available at', downloadURL);
                        setFileLoader(false)
                        setUpdateObj({ ...updateObj, featured_image: downloadURL })
                        setImgUpload(false)
                        setBtnDisabled(false)
                        setImgUploaded(true)
                    });
                }
            );
        }
        imgUpload && uploadImg()
    }, [file])


    return (
        <>

        

            <button type="button" style={{ visibility: "collapse" }} id='edit-100yearblog-btn' className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#edit100YearBlogModal" onClick={() => {
                setImgUploaded(false);

            }}>
                Edit Blog Post
            </button>

            <div className="modal fade" id="edit100YearBlogModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit 100 Year Blog Post</h5>
                            <button type="button" id='close-edit-modal' className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div >
                                <br />
                                <input className='input' placeholder='Name' value={updateObj.name} onChange={(e) => setUpdateObj({ ...updateObj, name: e.target.value })} /><br />

                                <br />
                                <CKEditor
                                    editor={ClassicEditor}
                                    data={updateObj.description}
                                    onReady={(editor) => {

                                    }}
                                    onChange={(event, editor) => {
                                        const data = editor.getData();
                                        setDescription(data);
                                    }}
                                    config={{
                                        toolbar: ['heading', 'bold', 'italic', 'bulletedList', 'numberedList'],
                                    }}
                                />

                                <br />

                                <label for="100_year_blog_img_uploader" className="custom-file-upload">
                                    {
                                        imgUploaded ?
                                            "Image Uploaded"
                                            :
                                            fileLoader ?
                                                <>
                                                    <img src='https://www.superiorlawncareusa.com/wp-content/uploads/2020/05/loading-gif-png-5.gif' width={"35px"} />
                                                    Loading ...
                                                </>
                                                :
                                                <>
                                                    <img src='https://i.imgur.com/x2ct9C1.png' width={"35px"} />
                                                    Upload Image
                                                </>
                                    }


                                </label>
                                <input style={{ visibility: "hidden", position: "absolute" }} id='100_year_blog_img_uploader' type="file" onChange={(e) => {
                                    setFile(e.target.files[0])
                                    setImgUpload(true)
                                }} /><br />


                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className={btnDisabled ? 'btn btn-secondary disabled' : 'btn btn-secondary'} id='community-modal-btn' type="button" data-bs-dismiss="modal">Close</button>
                            <button className={btnDisabled ? 'btn btn-primary disabled' : 'btn btn-primary'} onClick={() => editBlogData()} type="button" data-bs-dismiss="modal">Edit 100 Year Blog Post</button>
                        </div>
                    </div>
                </div>
            </div>

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
                                            <p className="heading_small">Title</p>
                                            <p className='name'>
                                                {item.name}
                                            </p>
                                        </div>
                                        <div className="cluster">
                                            <p className="heading_small">Description</p>
                                            <p className="description">
                                                {parse(`${item.description}`)}
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
        </>
    )
}

export default Blog100YearTable
