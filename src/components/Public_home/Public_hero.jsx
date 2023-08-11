import React from "react";
import Logo from "../../assets/logo-watermark.svg";
import { Link } from "react-router-dom";
import {Button} from '@mui/material'
import {IoIosArrowForward} from 'react-icons/io'

const Public_hero = () => {

  return (
    <main className="public_main px-4">
      <div className="background relative flex items-start justify-center">
        <img src={Logo} className="max-w-[50%] block mx-auto -my-8 opacity-10 absolute" draggable="false" alt="Logo" />
      </div>
      <header className="pt-[10%]">
        <h1 className="font-semibold text-center max-w-[28ch] mx-auto" >
          Connect, Explore, and Enrich: Your Portal to Captivating Articles
        </h1>
        <p className="text-center mt-5 mx-auto">
          <span>ScribbleSphere</span>: Unleash Your Writing Potential
        </p>

        <Button component={Link} to="/login" variant="contained" sx={{padding: '15px 25px', textTransform: 'none', borderRadius: '500px', margin: '3rem auto 1rem auto', display: 'flex', alignItems: 'center', gap: '5px', width: 'fit-content', fontWeight: '600', fontSize:'1rem'}}>Start Writing
        <span className="text-xl">
        <IoIosArrowForward />
        </span>
        </Button>
      </header>
    </main>
  );
};

export default Public_hero;
