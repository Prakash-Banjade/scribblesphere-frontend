import { createContext, useState, useEffect, useCallback } from 'react'

const LayoutContext = createContext();

export const LayoutProvider = ({ children }) => {
    const [chatSidebar, setChatSidebar] = useState(false);
    const toggleChatSidebar = () => setChatSidebar(prev => !prev)
    const [activeTab, setActiveTab] = useState(1);
    const [selectedUser, setSelectedUser] = useState(null);
    const [bgWhite, setBgWhite] = useState(false)


    return (
        <LayoutContext.Provider value={{ chatSidebar, toggleChatSidebar, setChatSidebar, activeTab, setActiveTab, selectedUser, setSelectedUser, bgWhite, setBgWhite }}>
            {children}
        </LayoutContext.Provider>
    );
}

export default LayoutContext;