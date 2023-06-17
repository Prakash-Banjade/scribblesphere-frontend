import React from "react";
import '../../scss/Dash.scss'
import { selectCurrentEmail, selectCurrentToken, selectCurrentRoles } from "./authSlice";
import { useSelector } from "react-redux";

const Dash = () => {
  const currentUser = useSelector(selectCurrentEmail);
  
  const token = useSelector(selectCurrentToken)

  const roles = useSelector(selectCurrentRoles)

  return (
   <section className="dash-section-main">
     <div>
      <h1>Welcome {currentUser} <br/> {token} <br /> {JSON.stringify(roles)}</h1>
    </div>
   </section>
  );
};

export default Dash;
