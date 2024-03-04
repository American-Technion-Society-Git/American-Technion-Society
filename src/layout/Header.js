import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";

const Header = ({current}) => {
  return (
    <div className="text-white">
      {/* Big Screens  */}
      <div className="flex items-center justify-between bg-[#002147]">
        <div className="ml-4 py-1">
          <Link className="" to="/">
            <img src={logo} alt="" className="w-[184px] h-[56.54px]" />
          </Link>
        </div>

        <div className="flex gap-4">
            <Link className={`text-white ${current === '100' ? "underline underline-offset-4" : ""}`} to="/100-years-of-innovation">100 Years of Innovation</Link>
            <Link className={`text-white ${current === 'Stories' ? "underline underline-offset-4" : ""}`} to="/ats-family">Technion Stories</Link>
            <a className={`text-white`} target='_blank' href='https://ats.org/centennial/'>Centennial Campaign</a>
            <Link className={`text-white ${current === 'Next' ? "underline underline-offset-4" : ""}`} to="/reimagining-the-next-100-years">Reimagining the Next 100 Years</Link> 
        </div>

        <div className="py-4 px-4 bg-[#AA9767] font-semibold">
            Donate Now
        </div>
      </div>
    </div>
  );
};

export default Header;
