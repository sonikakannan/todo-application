import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, IconButton, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { TfiMenuAlt } from "react-icons/tfi";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import logo from "../assets/logo.png";

const Navbar = ({ toggleSidebar }) => {
 

  return (
    <AppBar
      position="static"
      sx={{
        background:'#FBFDFC',
        color:'#000'
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Left Side */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton color="inherit" onClick={toggleSidebar}>
            <MenuIcon />
          </IconButton>
          <img src={logo} alt="Logo" style={{ width: 80 }} />
        </Box>

        {/* Right Side */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <IconButton color="inherit">
            <SearchIcon />
          </IconButton>
          <IconButton color="inherit">
            <TfiMenuAlt />
          </IconButton>
          <IconButton color="inherit" onClick={() => setDarkMode(!darkMode)}>
             <DarkModeIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
