import React, { useState, useRef, useEffect } from "react";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Sidebar as Sbar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { FaHome, FaStickyNote, FaStar, FaCog, FaUser } from "react-icons/fa";
import { IoMdConstruct } from "react-icons/io";

import "./sidebar.css";
interface SidebarProps {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  onRefUpdated: (ref: React.RefObject<HTMLDivElement>) => void;
}

function Sidebar({ collapsed, setCollapsed, onRefUpdated }: SidebarProps) {
  // const [collapsed, setCollapsed] = useState(false);
  const sbarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    onRefUpdated(sbarRef);
  }, [onRefUpdated]);

  return (
    <div
      ref={sbarRef}
      style={{ display: "flex", height: "100vh", width: "100%" }}
    >
      <Sbar
        collapsed={collapsed}
        backgroundColor="#04041a"
        transitionDuration={600}
        // rootStyles={{
        //   display: "flex",
        //   position: "relative",
        //   flexDirection: "column",
        //   justifyContent: "space-between",
        //   height: "100%",
        // }}
      >
        <div className="menu-title">ASSIS</div>
        <Menu
          rootStyles={{ position: "relative", top: "20%", textColor: "white" }}
        >
          <MenuItem
            className="menu-item menu-item-transition"
            component={<NavLink to="/home" />}
          >
            <FaHome /> {!collapsed && <span> Home</span>}
          </MenuItem>
          <MenuItem className="menu-item" component={<NavLink to="/notes" />}>
            <FaStickyNote /> {!collapsed && <span> Notes</span>}
          </MenuItem>
          <MenuItem
            className="menu-item"
            component={<NavLink to="/favorites" />}
          >
            <FaStar /> {!collapsed && <span> Favorites</span>}
          </MenuItem>
          <SubMenu
            className="menu-item"
            label={
              <>
                <FaCog /> {!collapsed && <span> Settings</span>}
              </>
            }
          >
            {/* <FaCog /> {!collapsed && <span> Settings</span>} */}
            <MenuItem
              component={<NavLink to="/userSettings" />}
              className="menu-item"
            >
              <FaUser /> {!collapsed && <span> User</span>}
            </MenuItem>
            <MenuItem
              component={<NavLink to="/systemSettings" />}
              className="menu-item"
            >
              <IoMdConstruct /> {!collapsed && <span> System</span>}
            </MenuItem>
          </SubMenu>
        </Menu>
        <div className="menu-footer">
          {collapsed ? "v0.1.1" : "Beta Web Version v0.1.1"}
        </div>
      </Sbar>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          height: "100%",
          position: "relative",
          // right: "8%",
          zIndex: "100",
        }}
      >
        <button
          onClick={() => setCollapsed(!collapsed)}
          style={{
            backgroundColor: "#ffffff",
            border: "none",
            cursor: "pointer",
            color: "#04041a",
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            fontWeight: "800",
            boxShadow: "0px 0px 5px rgba(0,0,0,0.5)",
            position: "absolute",
            top: "50%",
            left: collapsed ? "-20px" : "calc(100% - 20px)",
            transform: "translateY(-50%)",
            textAlign: "center",
            fontSize: "18px",
            zIndex: 2,
          }}
        >
          {collapsed ? ">" : "<"}
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
