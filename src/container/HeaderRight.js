import React, { useContext } from "react";
import "../App.css";
import Avatar from "@mui/material/Avatar";
import MoreVertSharpIcon from "@mui/icons-material/MoreVertSharp";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import AttachFileTwoToneIcon from "@mui/icons-material/AttachFileTwoTone";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { MyContext } from "../App";

const HeaderRight = () => {
  const {
    lastSeen,
    headerName,
    stylesWidth,
    setStyleWidth,
    setDisplayPartTwoFour,
  } = useContext(MyContext);
  const windowWidth = window.innerWidth;
  if (windowWidth > 600) {
    setStyleWidth(false);
    setDisplayPartTwoFour(false);
  }
  console.log("headerName: ", headerName);
  const handleImgClick = () => {
    setStyleWidth(false);
    setDisplayPartTwoFour(true);
    console.log("setting is done");
  };
  return (
    <div className="HeaderRight">
      <div className="HeaderLeft">
        <img
          style={!stylesWidth ? { display: "none" } : { marginRight: "0px" }}
          alt="hello"
          src=""
        />
        <div>
          <Avatar alt="Remy Sharp" src="" className="header3part" />
        </div>
        <div>
          <h2 style={{ margin: 0, marginLeft: "20px" }}>{headerName}</h2>
          <p style={{ margin: 0, marginLeft: "20px", fontSize: "10px" }}>
            {lastSeen}
          </p>
        </div>
      </div>
      <div className="headerLeft2part">
        <SearchSharpIcon className="header2part" />
        <AttachFileTwoToneIcon className="header2part" />
        <MoreVertSharpIcon className="header2part" />
      </div>
    </div>
  );
};
export default HeaderRight;
