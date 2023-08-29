import { createContext, useState, useEffect, useCallback } from 'react'

const LayoutContext = createContext();

export const LayoutProvider = ({ children }) => {
    const [chatSidebar, setChatSidebar] = useState(false);
    const toggleChatSidebar = () => setChatSidebar(prev => !prev)

    return (
        <LayoutContext.Provider value={{ chatSidebar, toggleChatSidebar,setChatSidebar }}>
            {children}
        </LayoutContext.Provider>
    );
}

export default LayoutContext;