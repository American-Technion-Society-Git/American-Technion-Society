import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Home from './Home';
import { Routes, Route } from 'react-router-dom';
import SignIn from './SignIn';
import { collection, onSnapshot, getDocs } from "firebase/firestore";
import { db } from './Firebase';
import './App.scss';
import Admin from './Admin';
import About from './pages/About';
import NextYears from './pages/NextYears';

import Family from './pages/Family';
import Stories from './pages/Stories';

import { IoIosArrowUp } from "react-icons/io";

function App() {

  const navigate = useNavigate()

  // useEffect(() => {
  //   // navigate('https://ats.org/centennial/')
   // window.location.href = 'https://ats.org/centennial/'
  // }, [])
  

  const [data, setData] = useState([]);
  const [blog, setBlog] = useState([]);
  const [yearsBlog, setYearsBlog] = useState([]);
  const [roadmap, setRoadmap] = useState([]);
  const [values, setValues] = useState([]);


  useEffect(() => {
    // Clear cookies
    document.cookie.split(";").forEach((cookie) => {
      document.cookie = cookie.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
    // Clear local storage
    localStorage.clear();
    // Clear cache
    window.caches.keys().then((keys) => {
      keys.forEach((key) => {
        window.caches.delete(key);
      });
    });
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      let dataList = [];

      try {
        const dataRef = collection(db, "testimonials");

        // Listen for changes in the "communities" collection
        const dataUnsubscribe = onSnapshot(dataRef, (snapshot) => {
          dataList = snapshot.docs.map((doc) => doc.data());
          setData(dataList);
        });

        // Cleanup the listeners when the component unmounts
        return () => {
          dataUnsubscribe();
        };
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      let dataList = [];

      try {
        const dataRef = collection(db, "blogData")

        // Listen for changes in the "communities" collection
        const dataUnsubscribe = onSnapshot(dataRef, (snapshot) => {
          dataList = snapshot.docs.map((doc) => doc.data());
          setBlog(dataList);
        });

        // Cleanup the listeners when the component unmounts
        return () => {
          dataUnsubscribe();
        };
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      let dataList = [];

      try {
        const dataRef = collection(db, "roadmap")

        // Listen for changes in the "communities" collection
        const dataUnsubscribe = onSnapshot(dataRef, (snapshot) => {
          dataList = snapshot.docs.map((doc) => doc.data());
          setRoadmap(dataList);
        });

        // Cleanup the listeners when the component unmounts
        return () => {
          dataUnsubscribe();
        };
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      let dataList = [];

      try {
        const dataRef = collection(db, "values")

        // Listen for changes in the "communities" collection
        const dataUnsubscribe = onSnapshot(dataRef, (snapshot) => {
          dataList = snapshot.docs.map((doc) => doc.data());
          setValues(dataList);
        });

        // Cleanup the listeners when the component unmounts
        return () => {
          dataUnsubscribe();
        };
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      let dataList = [];

      try {
        const dataRef = collection(db, "blog100YearData")

        // Listen for changes in the "communities" collection
        const dataUnsubscribe = onSnapshot(dataRef, (snapshot) => {
          dataList = snapshot.docs.map((doc) => doc.data());
          setYearsBlog(dataList);
          console.log(dataList)
        });

        // Cleanup the listeners when the component unmounts
        return () => {
          dataUnsubscribe();
        };
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const roadmapData = roadmap.sort((a, b) => parseInt(a.year) - parseInt(b.year))

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  console.log(blog)

  return (
    <div className="App">
    {
     <Routes>
        <Route path='/' element={<Home data={data} blog={yearsBlog} roadmap={roadmapData} values={values} />} />
        <Route path='/login' element={<SignIn />} />
        <Route path='/admin' element={<Admin data={data} blog={blog} yearsBlog={yearsBlog} roadmap={roadmapData} values={values} />} />
        <Route path='/100-years-of-innovation' element={<About blog={blog} roadmap={roadmapData} />} />
        <Route path='/ats-family' element={<Family data={data} />} />
        <Route path='/mystory' element={<Stories />}/>
        <Route path='/reimagining-the-next-100-years' element={<NextYears blog={yearsBlog} />} />
      </Routes>
    }
    {isScrolled && (
        <div 
        className='fixed bottom-8 right-8 z-50 cursor-pointer'
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <IoIosArrowUp 
          size={35}
          className='font-bold text-[#AA9767] border-[3px] border-[#AA9767]'
        />
      </div>
  
    )}
    </div>
  );
}

export default App;
