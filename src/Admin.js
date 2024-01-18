import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAuth, signOut } from "firebase/auth";
import ApprovedTable from './tables/ApprovedTable';
import PendingTable from './tables/PendingTable';
import BlogForm from './forms/BlogForm';
import BlogTable from './tables/BlogTable';
import RoadMapForm from './forms/RoadMapForm';
import RoadMapTable from './tables/RoadMapTable';
import ValuesForm from './forms/ValuesForm';
import ValuesTable from './tables/ValuesTable';
import logo from './assets/footer_logo.png';
import Blog100Year from './forms/Blog(100Year)';
import Blog100YearTable from './tables/Blog(100Year)Table';



const Admin = ({ data, blog, roadmap, values, yearsBlog }) => {


    const [approved, setApproved] = useState([]);
    const [pending, setPending] = useState([])

    const navigate = useNavigate()

     // Checking Admin
     useEffect(() => {
        const user = localStorage.getItem("accessToken")
        !user && navigate('/login')
        user == null && navigate('/login')
    }, [])


    // Logout Funtion
    const SignOut = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            localStorage.removeItem('accessToken')
            navigate('/login')
        }).catch((error) => {
            console.log(error)
        });
    }

    useEffect(() => {
        const seperatingData = () => {
            setApproved(data.filter((res) => res.approved === true))
            setPending(data.filter((res) => res.approved === false))
        }

        seperatingData()
    }, [data])



    return (
        <div>



            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px", background: "#114A99" }}>
                <img className='logo_admin img-fluid' style={{ maxHeight: "60px" }} src={logo} />
                <button className='btn btn-secondary' onClick={() => { SignOut() }}> Sign Out</button>
            </div>
            <div className='admin_grid'>
                <div className='table_grid'>
                    <div className='table_header'>
                        <h3>Stories</h3>
                    </div>
                    <ul className="nav" id="pills-tab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button className="btn btn-primary active" id="pills-approved-tab" data-bs-toggle="pill" data-bs-target="#pills-approved" type="button" role="tab" aria-controls="pills-approved" aria-selected="true">Approved <span>{approved.length}</span></button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="btn btn-primary" id="pills-pending-tab" data-bs-toggle="pill" data-bs-target="#pills-pending" type="button" role="tab" aria-controls="pills-pending" aria-selected="false">Pending <span>{pending.length}</span></button>
                        </li>
                    </ul>
                    <div className="tab-content" id="pills-tabContent">
                        <div className="tab-pane fade" id="pills-pending" role="tabpanel" aria-labelledby="pills-pending-tab">
                            <PendingTable data={pending} />
                        </div>
                        <div className="tab-pane fade show active" id="pills-approved" role="tabpanel" aria-labelledby="pills-approved-tab">
                            <ApprovedTable data={approved} />
                        </div>
                    </div>
                </div>
                <div className='table_grid'>
                    <BlogForm />
                    <BlogTable data={blog} />
                </div>
                <div className='table_grid'>
                    <RoadMapForm />
                    <RoadMapTable data={roadmap} />
                </div>
                <div className='table_grid'>
                    <ValuesForm />
                    <ValuesTable data={values} />
                </div>
                <div className='table_grid'>
                    <Blog100Year />
                    <Blog100YearTable data={yearsBlog} />
                </div>
            </div>
        </div>
    )
}

export default Admin
