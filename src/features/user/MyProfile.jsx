import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetMyDetailsQuery, useSetMyDetailsMutation, useSetProfilePicMutation } from "../user/userApiSlice";
import Loader from "../../components/Loader";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import Button from "@mui/material/Button";
import useAuth from "../../hooks/useAuth";
import useAppTheme from "../../hooks/useAppTheme";
import { useSnackbar } from 'notistack';
import { BsFacebook, BsInstagram, BsTwitter, BsLinkedin } from 'react-icons/bs'
import { useSelector, useDispatch } from "react-redux";
import { setProfilePicture } from "./userSlice";
import ProfilePicture from "./ProfilePicture";

const MyProfile = () => {
  const { fullname, email } = useAuth();
  const dispatch = useDispatch();
  // const [successMsg, setSuccessMst]

  const [profileDetails, setProfileDetails] = useState({
    fullname: '',
    address: '',
    profession: '',
    writesOn: '',
    socialLinks: '',
    description: '',
  })

  const handleProfileDetailsChange = e => {
    const { value, name } = e.target;
    setProfileDetails(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const myDetails = useGetMyDetailsQuery();
  const [setMyDetails, setDetails] = useSetMyDetailsMutation();
  const [setProfilePic, profileUpload] = useSetProfilePicMutation();

  const [availableMedia, setAvailableMedia] = useState(['facebook', 'instagram', 'twitter', 'linkedin'])

  useEffect(() => {
    if (!myDetails.isLoading && !myDetails.isError) {
      const writesOn = myDetails?.data?.details?.writesOn?.length ? myDetails?.data?.details.writesOn?.join(', ') : ''

      setProfileDetails(prev => ({
        ...prev,
        ...myDetails?.data?.details,
        followers: myDetails?.data.followers,
        following: myDetails?.data.following,
        fullname,
        writesOn,
      }))

      const media = availableMedia.filter(media => !myDetails?.data?.details.socialLinks?.map(social => social.network).includes(media))
      setAvailableMedia(media);

      setSocialLink(prev => ({
        ...prev,
        network: media[0],
      }))
    }
  }, [myDetails.isLoading, myDetails.isError, myDetails.data]);

  const [activeTab, setActiveTab] = useState(1);

  const handleChange = (event, newActiveTab) => {
    setActiveTab(newActiveTab);
  };

  const mediaLogo = {
    facebook: {
      logo: <BsFacebook />,
      color: '#1877F2',
    },
    instagram: {
      logo: <BsInstagram />,
      color: '#E4405F',
    },
    linkedin: {
      logo: <BsLinkedin />,
      color: '#0A66C2',
    },
    twitter: {
      logo: <BsTwitter />,
      color: '#1DA1F2',
    }
  }

  const [socialLink, setSocialLink] = useState({
    network: 'facebook',
    link: '',
  })

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
    const writesOnArr = profileDetails?.writesOn
      ? profileDetails.writesOn
        .replace(/\s/g, "")
        .split(",")
        .filter((writesOn) => writesOn !== "")
      : []

    try {
      const response = await setMyDetails({ ...profileDetails, writesOn: writesOnArr }).unwrap();
      if (response.status === 200) {
        handleClick(response?.message || "Profile updated", 'success');
      } else {
        handleClick(response?.message || "An error occurred", 'error');
      }
    } catch (e) {
      console.log(e)
      handleClick(e.message, 'error');
    }
  }

  const [linkErr, setLinkErr] = useState(false)

  const handleLinkAdd = () => {
    const regex = /^(https?):\/\/[^\s/$.?#].[^\s]*$/
    if (!regex.test(socialLink.link)) return setLinkErr(true)

    setProfileDetails(prev => ({
      ...prev,
      socialLinks: [...prev.socialLinks, socialLink]
    }))
    setSocialLink({
      network: 'facebook',
      link: ''
    })
  }

  const handleRemoveSocialLink = (network) => {
    setProfileDetails(prev => ({
      ...prev,
      socialLinks: prev.socialLinks.filter(link => link.network !== network),
    }))
  }

  // logic for profile pic upload
  // event handler when the Image changes
  const handleProfilePicSubmit = async (e) => {
    e.preventDefault();

    const photo = e.target.files[0];

    const formData = new FormData();

    formData.append('image', photo)

    try {
      const response = await setProfilePic(formData).unwrap();
      if (response.status === 200) handleClick('Profile picture updated', 'success')
    } catch (e) {
      console.log(e)
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
          <ProfilePicture width={80} />

          <div className="flex flex-col sm:gap-2">
            <h1 className="sm:text-2xl text-xl" style={{ color: 'var(--text-200)' }}>{fullname}</h1>
            <h2 className="sm:text-base text-sm font-light" style={{ color: 'var(--text-300)' }}>{email}</h2>
          </div>
        </section>

        <section className="followers flex items-center gap-8 font-light mt-6">
          <p style={{ color: 'var(--text-300)' }}><strong className="font-medium">{profileDetails?.followers}</strong> followers</p>
          <p style={{ color: 'var(--text-300)' }}><strong className="font-medium">{profileDetails?.following}</strong> following</p>
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
          <ProfilePicture width={80} />

          <div className="flex gap-3 items-center">
            <button type="button" className={`font-normal px-3 py-2 text-primary rounded-md ${dark ? 'hover:bg-[#232323]' : 'hover:bg-slate-100'}`} title="View profile picture">View</button>
            <div className="h-[4px] w-[4px]" style={{ background: 'var(--line-color)' }}></div>
            <form onSubmit={handleProfilePicSubmit} encType="multipart/form-data">
              <label htmlFor="profile_pic_upload" className={`font-normal px-3 py-2 text-[#1e90ff] rounded-md cursor-pointer ${dark ? 'hover:bg-[#232323]' : 'hover:bg-slate-100'}`} title="Upload new profile picture">{profileUpload.isLoading ? 'Changing...' : 'Change'}</label>
              <input type="file" id="profile_pic_upload" className="sr-only" accept="image/*" onChange={handleProfilePicSubmit} />
            </form>
            <div className="h-[4px] w-[4px]" style={{ background: 'var(--line-color)' }}></div>
            <button type="button" className={`font-normal px-3 py-2 text-red-500 rounded-md ${dark ? 'hover:bg-[#232323]' : 'hover:bg-slate-100'}`} title="Remove current profile picture">Remove</button>
          </div>
        </section>


        <form className="flex flex-wrap gap-7 font-blog mt-6" style={{ color: 'var(--text-200)' }}>
          <div className="form-control flex flex-col gap-1 grow shrink basis-[300px]">
            <label className="font-light" htmlFor="fullname">Your full name</label>
            <input type="text" name="fullname" id="fullname" value={profileDetails.fullname} onChange={handleProfileDetailsChange} className={`px-3 py-2 text-sm border hover:border-primary ${dark ? 'border-lineColorDark' : 'border-lineColorLight'} focus:outline-primary rounded-md placeholder:text-xs placeholder:font-light`} style={{ background: 'var(--bg-primary)' }} placeholder="eg. Prakash Banjade" />
          </div>
          <div className="form-control flex flex-col gap-1 grow shrink basis-[300px]">
            <label className="font-light" htmlFor="address">Address</label>
            <input type="text" name="address" id="address" value={profileDetails.address} onChange={handleProfileDetailsChange} className={`px-3 py-2 text-sm border hover:border-primary ${dark ? 'border-lineColorDark' : 'border-lineColorLight'} focus:outline-primary rounded-md placeholder:text-xs placeholder:font-light`} style={{ background: 'var(--bg-primary)' }} placeholder="eg. New York City" />
          </div>
          <div className="form-control flex flex-col gap-1 grow shrink basis-[300px]">
            <label className="font-light" htmlFor="profession">Profession</label>
            <input type="text" name="profession" id="profession" value={profileDetails.profession} onChange={handleProfileDetailsChange} className={`px-3 py-2 text-sm border hover:border-primary ${dark ? 'border-lineColorDark' : 'border-lineColorLight'} focus:outline-primary rounded-md placeholder:text-xs placeholder:font-light`} style={{ background: 'var(--bg-primary)' }} placeholder="eg. DevOps Engineer" />
          </div>
          <div className="form-control flex flex-col gap-1 grow shrink basis-[300px]">
            <label className="font-light" htmlFor="writesOn">Generally writes on</label>
            <input type="text" name="writesOn" id="writesOn" value={profileDetails.writesOn} onChange={handleProfileDetailsChange} className={`px-3 py-2 text-sm border hover:border-primary ${dark ? 'border-lineColorDark' : 'border-lineColorLight'} focus:outline-primary rounded-md placeholder:text-xs placeholder:font-light`} style={{ background: 'var(--bg-primary)' }} placeholder="eg. Docker, Kubernetis, Node.js" />
          </div>

          <div className="form-control flex flex-col gap-2 grow shrink basis-[100%]">
            <div className="flex flex-col gap-2">
              <label className="font-light" htmlFor="link">Social Links</label>
              {linkErr && <small className="text-xs" style={{ color: 'var(--error-text-color)' }}>Not a valid url!</small>}
              <div className="flex gap-4 flex-wrap items-center">
                <div className="flex gap-4 items-center">
                  <span className="text-3xl" style={{ color: mediaLogo[socialLink.network]?.color }}>
                    {mediaLogo[socialLink.network]?.logo}
                  </span>
                  <select className={`px-3 py-2 text-sm border hover:border-primary ${dark ? 'border-lineColorDark' : 'border-lineColorLight'} focus:outline-primary rounded-md placeholder:text-xs placeholder:font-light cursor-pointer`} style={{ background: 'var(--bg-primary)' }} title="Select to switch platform" value={socialLink?.network} onChange={e => setSocialLink(prev => ({ ...prev, network: e.target.value }))}>

                    <option value="" disabled>Select social media platform</option>
                    {
                      availableMedia.map(media => {
                        return <option value={media} key={media}>{media[0]?.toUpperCase() + media?.slice(1)}</option>
                      })
                    }
                  </select>
                </div>
                <input type="url" name="link" id="link" value={socialLink.link} onChange={(e) => {
                  setSocialLink(prev => ({
                    ...prev,
                    link: e.target.value
                  }))
                  setLinkErr(false)
                }} className={`px-3 py-2 text-sm border grow hover:border-primary ${dark ? 'border-lineColorDark' : 'border-lineColorLight'} focus:outline-primary rounded-md placeholder:text-xs placeholder:font-light`} style={{ background: 'var(--bg-primary)' }} placeholder="URL" />
                <Button variant="contined" sx={{ color: 'white', '&:disabled': { opacity: '.6' } }} disabled={!socialLink.link} onClick={handleLinkAdd}>Add</Button>
              </div>

              <section className="flex flex-col gap-2 mt-3 pl-5">
                {Array.isArray(profileDetails?.socialLinks) && profileDetails?.socialLinks?.map((media, ind) => (
                  <div key={ind} className="flex gap-3 items-center" style={{ color: 'var(--text-200)' }}>
                    <span className="text-2xl" style={{ color: mediaLogo[media?.network]?.color }}>
                      {mediaLogo[media?.network]?.logo}
                    </span>
                    <a href={media.link} className="font-sm">{media.network[0]?.toUpperCase() + media.network?.slice(1)}</a>

                    <Button variant="outlined" color="error" sx={{ fontSize: '.7rem !important', padding: '5px 2px' }} onClick={() => handleRemoveSocialLink(media.network)}>Remove</Button>
                  </div>
                ))}
              </section>
            </div>
          </div>

          <div className="form-control flex flex-col flex-1 gap-1 grow shrink basis-[100%]">
            <label className="font-light" htmlFor="description">Something about you</label>
            <textarea name="description" rows="5" id="description" value={profileDetails.description} onChange={handleProfileDetailsChange} className={`px-3 py-2 text-sm border hover:border-primary ${dark ? 'border-lineColorDark' : 'border-lineColorLight'} focus:outline-primary rounded-md resize-none leading-5 placeholder:text-xs placeholder:font-light`} style={{ background: 'var(--bg-primary)' }} placeholder="eg. I am a professional DevOps Engineer at ABC Tech. I love teaching and writing blog articles on my knowledge and experience. Also I love dogs." />
          </div>

          <Button type="submit" disabled={setDetails.isLoading} variant="contained" onClick={handleSaveClick} sx={{ marginLeft: 'auto', color: 'white', '&:disabled': { opacity: '.6' }, minWidth: '40px' }}>{setDetails.isLoading ? 'Saving...' : 'Save Changes'}</Button>

        </form>




      </section>

    </div >
  );
};

export default MyProfile;
