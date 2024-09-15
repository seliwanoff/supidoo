import React, { useState } from "react";
import "../css/sidebar.css";

interface SidebarProps {
  openModal: (content: string) => void;
  setCurrentTab: (content: number) => void;
  user: any;
  modalIsOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({
  openModal,
  setCurrentTab,
  user,
  modalIsOpen,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    { name: "Profile", content: "Details about Supidoo " },
    { name: "Security", content: "Protect yourself from intruders" },
    { name: "Privacy & Policy", content: "Our contract with you" },
    { name: "T&C", content: "Our contract with you" },
  ];

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <div className="toggle-btn" onClick={toggleSidebar}>
        {isOpen ? "◀" : "▶"}
      </div>
      {isOpen && (
        <>
          <div className="profile">
            <h3>{user?.data.username}</h3>
            <p>Account Details</p>
          </div>
          <ul>
            {menuItems.map((item, index) => (
              <li
                key={index}
                onClick={() => {
                  if (index === 2) {
                    window.open("/privacy", "_blank");
                  } else if (index === 3) {
                    window.open("/term", "_blank");
                  }
                  {
                    openModal(item.content);
                    setCurrentTab(index);
                    toggleSidebar();
                  }
                }}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Sidebar;
