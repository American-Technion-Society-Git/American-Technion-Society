import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import { GiHamburgerMenu } from "react-icons/gi";

const Header = ({ current }) => {
  const [toggle, setToggle] = useState(false);
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    });
  }

  return (
    <div className="header text-white sticky top-0 left-0 z-50">
      {/* Big Screens  */}
      <div className="hidden lg:flex items-center justify-between bg-[#002147]">
        <div className="ml-4 py-1">
          <Link className="" to="/" onClick={scrollToTop}>
            <img src={logo} alt="" className="w-[184px] h-[56.54px]" />
          </Link>
        </div>

        <div className="flex gap-4">
          <Link
            className={`text-white ${
              current === "100" ? "underline underline-offset-4" : ""
            }`}
            to="/100-years-of-innovation"
            onClick={scrollToTop}
          >
            100 Years of Innovation
          </Link>
          <Link
            className={`text-white ${
              current === "Stories" ? "underline underline-offset-4" : ""
            }`}
            to="/ats-family"
            onClick={scrollToTop}
          >
            Technion Stories
          </Link>
          <a
            className={`text-white`}
            target="_blank"
            href="https://ats.org/centennial/"
          >
            Centennial Campaign
          </a>
          <Link
            className={`text-white ${
              current === "Next" ? "underline underline-offset-4" : ""
            }`}
            to="/reimagining-the-next-100-years"
            onClick={scrollToTop}
          >
            Reimagining the Next 100 Years
          </Link>
        </div>

        <a
          href="https://secure.ats.org/page/61000/donate/1"
          className="py-4 px-4 bg-[#AA9767] font-semibold transition-colors text-white cursor-pointer hover:bg-[#002147]"
        >
          Donate Now
        </a>
      </div>

      {/* Small Screens  */}
      <div className="lg:hidden items-center justify-between bg-[#002147]">
        <div className="flex justify-between items-center pr-4">
          <div className="ml-4 py-1">
            <Link className="" to="/">
              <img src={logo} alt="" className="w-[184px] h-[56.54px]" />
            </Link>
          </div>
          <div>
            <GiHamburgerMenu
              size={28}
              className="text-white"
              onClick={() => setToggle(!toggle)}
            />
          </div>
        </div>
        {toggle && (
          <div className="absolute z-50 bg-[#002147] w-full drop-shadow-xl">
            <div className="flex flex-col ">
              <Link
                className={`text-white text-xl border-y py-4 px-4 ${
                  current === "100" ? "" : ""
                }`}
                to="/100-years-of-innovation"
                onClick={scrollToTop}
              >
                100 Years of Innovation
              </Link>
              <Link
                className={`text-white text-xl border-b py-4 px-4 ${
                  current === "Stories" ? "" : ""
                }`}
                to="/ats-family"
                onClick={scrollToTop}
              >
                Technion Stories
              </Link>
              <a
                className={`text-white text-xl border-b py-4 px-4 `}
                target="_blank"
                href="https://ats.org/centennial/"
              >
                Centennial Campaign
              </a>
              <Link
                className={`text-white text-xl border-b py-4 px-4 ${
                  current === "Next" ? "" : ""
                }`}
                to="/reimagining-the-next-100-years"
                onClick={scrollToTop}
              >
                Reimagining the Next 100 Years
              </Link>
              <a
                href="https://secure.ats.org/page/64224/donate/1?supporter.appealCode=FY24_Centennial_Web-ATSButton-Default_All_Give&en_og_source=FY24_Centennial_Web-ATSButton-Default_All_Give&utm_source=ATSButton-Default&utm_medium=Web&utm_campaign=Centennial&utm_content=All&utm_term=Give"
                className="text-xl py-4 px-4 bg-[#AA9767] font-semibold text-white"
              >
                Donate Now
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
