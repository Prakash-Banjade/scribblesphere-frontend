import React from "react";
import Logo from "../../assets/logo-watermark.svg";
import { Link } from "react-router-dom";
import { Button } from '@mui/material'
import { IoIosArrowForward } from 'react-icons/io'

const Public_hero = () => {

  return (
    <main className="public_main px-4 min-h-[450px] relative">
      <div className="background absolute w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
        <img src={Logo} className="w-[80%] block mx-auto opacity-10" draggable="false" alt="Logo" />
      </div>
      <header className="pt-[10%]">
        <h1 className=" text-center lg:text-7xl md:text-5xl text-4xl max-w-[30ch] mx-auto" >
          Connect, Explore, and Enrich <span className="hidden sm:inline">: Your Portal to Captivating Articles</span>
        </h1>
        <p className="text-center mt-5 mx-auto">
          <span>ScribbleSphere</span>: Unleash Your Writing Potential
        </p>

        <Button component={Link} to="/login" variant="contained">Start Writing
          <span className="text-xl">
            <IoIosArrowForward />
          </span>
        </Button>
      </header>
    </main>
  );
};

export default Public_hero;
