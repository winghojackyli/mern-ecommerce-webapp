import React from "react";
import "./Topbar.css";
import {
  NotificationsNone,
  Language,
  Settings,
  ExitToApp,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/apiCalls";

export default function Topbar() {
  const dispatch = useDispatch();
  const handleLogout = () => {
    logout(dispatch);
  };
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <div className="topLeft">
            <span className="logo">Admin</span>
          </div>
        </Link>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">3</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Settings />
          </div>
          <div className="topbarIconContainer" onClick={handleLogout}>
            <ExitToApp />
          </div>
          <img
            src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
            alt=""
            className="topAvatar"
          />
        </div>
      </div>
    </div>
  );
}
