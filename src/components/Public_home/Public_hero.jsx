import React from "react";
import Logo from "../../assets/logo-watermark.svg";
import { Link } from "react-router-dom";
import { Button } from '@mui/material'
import { IoIosArrowForward } from 'react-icons/io'
import Public_trustAndVerified from "./Public_trustAndVerified";
import useAppTheme from "../../hooks/useAppTheme";
import {SiAzuredataexplorer} from 'react-icons/si'

const Public_hero = () => {
  const { dark } = useAppTheme();

  return (
    <main className="public_main px-4 relative">
      {/* <div className="background absolute w-full -translate-x-1/2 -translate-y-1/2 top-[25%] left-1/2">
        <img src={Logo} className="sm:w-[70%] w-full block mx-auto opacity-10" draggable="false" alt="Logo" />
      </div> */}
      <header className="main_head pt-[10%]">
        <h1 className=" text-center md:text-7xl flex items-center justify-center text-4xl max-w-[30ch] mx-auto font-secondary" >
          <span>Connect.</span><span>Explore.</span><span>Enrich.</span>
        </h1>
        <p className="text-center mt-5 mx-auto">
          Your portal to captivating articles<br />
          <span>ScribbleSphere</span>: Unleash Your Writing Potential
        </p>

        <div className="actions flex items-center gap-5 justify-center">
          <Button component={Link} to="/login" variant="contained" sx={{ color: '#1e90ff' }}>Explore
          <span className="text-xl">
            <SiAzuredataexplorer />
          </span>
          </Button>

          <Button component={Link} to="/login" variant="contained" sx={{ color: '#1e90ff' }}>Start Writing
            <span className="text-xl">
              <IoIosArrowForward />
            </span>
          </Button>
        </div>
      </header>

      <Public_trustAndVerified styles="md:mt-[200px] mt-[100px]" />

    </main>
  );
};

export default Public_hero;
