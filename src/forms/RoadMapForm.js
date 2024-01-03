import React, { useState, useEffect } from 'react'
import { v4 as uuid } from "uuid";
import { setDoc, doc } from 'firebase/firestore';
import { db, storage } from '../Firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const RoadMapForm = () => {
    const [name, setName] = useState('');

    const [year, setYear] = useState('');
    const [file, setFile] = useState([]);
    const [imgRoadmapUrl, setImgRoadmapUrl] = useState('');
    const [imgRoadmapUpload, setImgRoadmapUpload] = useState(false);
    const [fileRoadmapLoader, setFileRoadmapLoader] = useState(false);
    const [btnDisabled, setBtnDisabled] = useState(false);
    const [imgRoadmapUploaded, setImgRoadmapUploaded] = useState(false);

    const renderYearContent = (year) => {
        const tooltipText = `Tooltip for year: ${year}`;
        return <span title={tooltipText}>{year}</span>;
    };
    // Uploading RoadMap Data
    const roadmapUploader = async () => {
        setBtnDisabled(true);
        const unique_id = uuid();



        const modalButton = document.getElementById('roadmap-modal-btn');
        try {
            const docRef = await setDoc(doc(db, 'roadmap', unique_id), {
                name: name,
                year: new Date(year).getFullYear(),
                featured_image: imgRoadmapUrl,
                id: unique_id,
            });
            setName('');
            setYear('');
            setImgRoadmapUrl('');
            modalButton.click();
            setBtnDisabled(false);
        } catch (error) {
            console.error(error);
        }
    };

    //  Uploading Img
    useEffect(() => {
        const uploadImg = () => {
            setImgRoadmapUploaded(false)
            const uniqueName = Math.floor(Math.random() * 100 * 100000) + '-' + file.name;
            const storageRef = ref(storage, uniqueName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    setFileRoadmapLoader(true)
                    setBtnDisabled(true)
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            setFileRoadmapLoader(true)
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
                        setFileRoadmapLoader(false)
                        setImgRoadmapUrl(downloadURL)
                        setImgRoadmapUpload(false)
                        setBtnDisabled(false)
                        setImgRoadmapUploaded(true)
                    });
                }
            );
        }
        imgRoadmapUpload && uploadImg()
    }, [file])




    return (
        <React.Fragment >
            <div className='table_header'>
                <h3>Roadmap</h3>
                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#roadmapModal" onClick={() => setImgRoadmapUploaded(false)}>
                    Add Roadmap Item
                </button>
            </div>
            <div className="modal fade" id="roadmapModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Add Roadmap Item</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div >
                                <label for="roadmap_img_uploader" class="custom-file-upload">
                                    {
                                        imgRoadmapUploaded ?
                                            "Image Uploaded"
                                            :
                                            fileRoadmapLoader ?
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

                                <DatePicker
                                    selected={year}
                                    renderYearContent={renderYearContent}
                                    showYearPicker
                                    dateFormat="yyyy"
                                    onChange={(e) => setYear(e)}
                                    placeholderText="Select Year"
                                />
                                <input className='input' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />



                                <input style={{ visibility: "hidden", position: "absolute" }} id='roadmap_img_uploader' type="file" onChange={(e) => {
                                    setFile(e.target.files[0])
                                    setImgRoadmapUpload(true)
                                }} /><br />

                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className={btnDisabled ? 'btn btn-secondary disabled' : 'btn btn-secondary'} id='roadmap-modal-btn' type="button" data-bs-dismiss="modal">Close</button>
                            <button className={btnDisabled ? 'btn btn-primary disabled' : 'btn btn-primary'} onClick={() => roadmapUploader()} type="button" data-bs-dismiss="modal">Add Roadmap Item</button>
                        </div>


                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default RoadMapForm