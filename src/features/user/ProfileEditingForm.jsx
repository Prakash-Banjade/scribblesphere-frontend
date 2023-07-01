import React, {useState} from "react";

import Button from "@mui/material/Button";

const EditForm = ({details}) => {

  const [qualification, setQualification] = useState(details.qualification);
  const [writesOn, setWritesOn] = useState(details.writesOn.join(','));
//   const [socialLinks, setSocialLinks] = useState(details.socialLinks.join(','));

  const [address, setAddress] = useState(details.address);
  const [bio, setBio] = useState(details.bio);
  const [nickname, setNickname] = useState(details.nickname);


  const handleSaveEdit = (e) => {
    e.preventDefault();
  };
  
  return (
    <form
      onSubmit={handleSaveEdit}
      className="details-editing-form flex flex-column g-20"
    >
      <div className="form-field">
        <label htmlFor="bio">Tell something about you</label>
        <textarea
          id="bio"
          rows="2"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
      </div>
      <div className="form-field">
        <label htmlFor="nickname">A nickname for you</label>
        <input
          type="text"
          id="nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
      </div>
      <div className="form-field">
        <label htmlFor="address">Address</label>
        <input
          type="text"
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <div className="form-field">
        <label htmlFor="qualification">Qualification</label>
        <input
          type="text"
          id="qualification"
          value={qualification}
          onChange={(e) => setQualification(e.target.value)}
        />
      </div>
      <div className="form-field">
        <label htmlFor="writesOn">
          Mention what you write on (comma separated)
        </label>
        <input
          type="text"
          id="writesOn"
          value={writesOn}
          onChange={(e) => setWritesOn(e.target.value)}
        />
      </div>

      <Button
        variant="contained"
        type="submit"
      >
        Save changes
      </Button>
    </form>
  );
};

export default EditForm;
