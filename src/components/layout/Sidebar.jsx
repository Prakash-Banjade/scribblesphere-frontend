import React from "react";
import Sidebar_chat from "./sidebars/Sidebar_chat";
import Sidebar_main from "./sidebars/Sidebar_main";
import useLayoutContext from "../../hooks/useLayoutContext";

const Sidebar = (props) => {

  const { chatSidebar } = useLayoutContext();

  return chatSidebar ? <Sidebar_chat {...props} /> : <Sidebar_main {...props} />
}

export default Sidebar;
