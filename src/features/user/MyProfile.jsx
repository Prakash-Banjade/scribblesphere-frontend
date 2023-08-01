import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import profile from '../../assets/profileHolder.webp'
import { useGetMyDetailsQuery, useSetMyDetailsMutation } from "../user/userApiSlice";
import Loader from "../../components/Loader";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import Button from "@mui/material/Button";
import useAuth from "../../hooks/useAuth";
import useAppTheme from "../../hooks/useAppTheme";
import { useSnackbar } from 'notistack';


const MyProfile = () => {
  const { fullname, email } = useAuth();
  // const [successMsg, setSuccessMst]

  const [detailState, setDetailState] = useState({});

  const [formDetails, setFormDetails] = useState({
    fullname: '',
    address: '',
    profession: '',
    writesOn: '',
    socialLinks: '',
    description: '',
  })

  const handleFormDetailsChange = e => {
    const { value, name } = e.target;
    setFormDetails(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const myDetails = useGetMyDetailsQuery();
  const [setMyDetails, setDetails] = useSetMyDetailsMutation();

  useEffect(() => {
    if (!myDetails.isLoading && !myDetails.isError) {
      setDetailState({
        ...myDetails?.data,
        writesOn: myDetails?.data?.details?.writesOn?.length ? myDetails?.data?.details.writesOn : ''
      } || {});
      setFormDetails(prev => ({
        ...prev,
        ...myDetails?.data?.details,
        fullname,
        writesOn: myDetails?.data?.details?.writesOn?.length ? myDetails?.data?.details.writesOn : ''
      }))
    }
  }, [myDetails.isLoading, myDetails.isError, myDetails.data]);

  const [activeTab, setActiveTab] = useState(1);

  const handleChange = (event, newActiveTab) => {
    setActiveTab(newActiveTab);
  };

  const WritesOn = ({ tags }) => {
    return (
      <li>
        {tags?.map((tag) => (
          <span key={tag}>#{tag}</span>
        ))}
      </li>
    );
  };

  const { dark } = useAppTheme();

  const { enqueueSnackbar } = useSnackbar();

  const handleClick = (message, variant) => {
    enqueueSnackbar(message, { variant });
  };
  
  const handleSaveClick = async (e) => {
    e.preventDefault();
    const writesOnArr = formDetails?.writesOn
      ? formDetails.writesOn
        .replace(/\s/g, "")
        .split(",")
        .filter((writesOn) => writesOn !== "")
      : []

    try {
      const response = await setMyDetails({ ...formDetails, writesOn: writesOnArr })
      // console.log(response);
      if (setDetails.isSuccess)
        handleClick(response?.data?.message || 'Message', 'success');
      else if (response?.error?.data) {
        handleClick(response?.error?.data?.message || 'Message', 'error');
      }else {
        handleClick('An error occurred. Try again', 'error');
      }
      console.log(setDetails)

      console.log(response)
    } catch (e) {
      console.log(e)
      handleClick(e.message, 'error');
    }
  }


  if (myDetails.isLoading) return <Loader />;
  if (myDetails.isError) return <h1 style={{ color: 'var(--text-200)' }}>An error occurred</h1>

  return (
    <div className="wrapper">
      <section className="lg:p-6 md:p-5 p-2 lg:pb-0 md:pb-0 pb-0 border rounded-md" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--line-color)' }}>
        <header className="flex gap-3 flex-col">
          <h2 className="md:text-2xl text-xl font-medium font-blog" style={{ color: 'var(--text-200)' }}>My Profile</h2>
          <p className="md:text-sm text-xs font-light font-blog" style={{ color: 'var(--text-400)' }}>Manage Profile</p>
        </header>

        <section className="flex gap-3 mt-8 flex-wrap">
          <img src={profile} alt="profile image" className="self-start sm:w-[80px] w-[50px] aspect-square" />

          <div className="flex flex-col sm:gap-2">
            <h1 className="sm:text-2xl text-xl" style={{ color: 'var(--text-200)' }}>{fullname}</h1>
            <h2 className="sm:text-base text-sm font-light" style={{ color: 'var(--text-300)' }}>{email}</h2>
          </div>
        </section>

        <section className="followers flex items-center gap-8 font-light mt-6">
          <p style={{ color: 'var(--text-300)' }}><strong className="font-medium">{detailState.followers}</strong> followers</p>
          <p style={{ color: 'var(--text-300)' }}><strong className="font-medium">{detailState.following}</strong> following</p>
        </section>

        <section className="tabs mt-4">
          <Tabs
            value={activeTab}
            onChange={handleChange}
            // textColor={dark? '#f2f5f' : '#222'}
            sx={{ color: 'white' }}
            aria-label="profile tab switching"
          >
            <Tab value={1} label="Profile" />
            <Tab value={2} label="Password & Security" />
          </Tabs>
        </section>

      </section>

      <section className="lg:p-6 md:p-5 p-2 xl:mt-5 lg:mt-4 md:mt-3 mt-2 border rounded-md" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--line-color)' }}>

        <div>
          <h2 className="md:text-xl text-base font-medium font-blog" style={{ color: 'var(--text-200)' }}>Profile Picture</h2>
          <p className="md:text-sm text-xs font-light font-blog" style={{ color: 'var(--text-400)' }}>Photo helps other users and creators recognize you easily</p>
        </div>

        <section className="flex gap-3 mt-5 flex-wrap">
          <img src={profile} alt="profile image" className="self-start sm:w-[80px] w-[50px] aspect-square" />

          <div className="flex gap-3 items-center">
            <button type="button" className={`font-normal px-3 py-2 text-primary rounded-md ${dark ? 'hover:bg-[#232323]' : 'hover:bg-slate-100'}`} title="View profile picture">View</button>
            <div className="h-[4px] w-[4px]" style={{ background: 'var(--line-color)' }}></div>
            <button type="button" className={`font-normal px-3 py-2 text-[#1e90ff] rounded-md ${dark ? 'hover:bg-[#232323]' : 'hover:bg-slate-100'}`} title="Upload new profile picture">Change</button>
            <div className="h-[4px] w-[4px]" style={{ background: 'var(--line-color)' }}></div>
            <button type="button" className={`font-normal px-3 py-2 text-red-500 rounded-md ${dark ? 'hover:bg-[#232323]' : 'hover:bg-slate-100'}`} title="Remove current profile picture">Remove</button>
          </div>
        </section>


        <form className="flex flex-wrap gap-7 font-blog mt-6" style={{ color: 'var(--text-200)' }}>
          <div className="form-control flex flex-col gap-1 grow shrink basis-[300px]">
            <label htmlFor="fullname">Your full name</label>
            <input type="text" name="fullname" id="fullname" value={formDetails.fullname} onChange={handleFormDetailsChange} className={`px-3 py-2 text-sm border hover:border-primary ${dark ? 'border-lineColorDark' : 'border-lineColorLight'} focus:outline-primary rounded-md placeholder:text-sm placeholder:font-light`} style={{ background: 'var(--bg-primary)' }} placeholder="eg. Prakash Banjade" />
          </div>
          <div className="form-control flex flex-col gap-1 grow shrink basis-[300px]">
            <label htmlFor="address">Address</label>
            <input type="text" name="address" id="address" value={formDetails.address} onChange={handleFormDetailsChange} className={`px-3 py-2 text-sm border hover:border-primary ${dark ? 'border-lineColorDark' : 'border-lineColorLight'} focus:outline-primary rounded-md placeholder:text-sm placeholder:font-light`} style={{ background: 'var(--bg-primary)' }} placeholder="eg. New York City" />
          </div>
          <div className="form-control flex flex-col gap-1 grow shrink basis-[300px]">
            <label htmlFor="profession">Profession</label>
            <input type="text" name="profession" id="profession" value={formDetails.profession} onChange={handleFormDetailsChange} className={`px-3 py-2 text-sm border hover:border-primary ${dark ? 'border-lineColorDark' : 'border-lineColorLight'} focus:outline-primary rounded-md placeholder:text-sm placeholder:font-light`} style={{ background: 'var(--bg-primary)' }} placeholder="eg. DevOps Engineer" />
          </div>
          <div className="form-control flex flex-col gap-1 grow shrink basis-[300px]">
            <label htmlFor="writesOn">Generally writes on</label>
            <input type="text" name="writesOn" id="writesOn" value={formDetails.writesOn} onChange={handleFormDetailsChange} className={`px-3 py-2 text-sm border hover:border-primary ${dark ? 'border-lineColorDark' : 'border-lineColorLight'} focus:outline-primary rounded-md placeholder:text-sm placeholder:font-light`} style={{ background: 'var(--bg-primary)' }} placeholder="eg. Docker, Kubernetis, Node.js" />
          </div>
          <div className="form-control flex flex-col gap-1 grow shrink basis-[300px]">
            <label htmlFor="socialLinks">Social Links</label>
            <input type="text" name="socialLinks" id="socialLinks" value={formDetails.socialLinks} onChange={handleFormDetailsChange} className={`px-3 py-2 text-sm border hover:border-primary ${dark ? 'border-lineColorDark' : 'border-lineColorLight'} focus:outline-primary rounded-md placeholder:text-sm placeholder:font-light`} style={{ background: 'var(--bg-primary)' }} disabled placeholder="In Progress!" />
          </div>
          <div className="form-control flex flex-col flex-1 gap-1 grow shrink basis-[100%]">
            <label htmlFor="description">Something about you</label>
            <textarea name="description" rows="5" id="description" value={formDetails.description} onChange={handleFormDetailsChange} className={`px-3 py-2 text-sm border hover:border-primary ${dark ? 'border-lineColorDark' : 'border-lineColorLight'} focus:outline-primary rounded-md leading-5 placeholder:text-sm placeholder:font-light`} style={{ background: 'var(--bg-primary)' }} placeholder="eg. I am a professional DevOps Engineer at ABC Tech. I love teaching and writing blog articles on my knowledge and experience. Also I love dogs." />
          </div>

          <Button type="submit" disabled={setDetails.isLoading} variant="contained" onClick={handleSaveClick} sx={{ marginLeft: 'auto', color: 'white', '&:disabled': { backgroundColor: '#565656' }, minWidth: '40px' }}>{setDetails.isLoading ? 'Saving...' : 'Save Changes'}</Button>

        </form>




      </section>

    </div>
  );
};

export default MyProfile;
