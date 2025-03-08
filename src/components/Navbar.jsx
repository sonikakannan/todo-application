import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, IconButton, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { TfiMenuAlt } from "react-icons/tfi";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import logo from "../assets/logo.png";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";

const Navbar = ({ toggleSidebar }) => {
  const { openSignIn } = useClerk();
  const { user } = useUser();

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
          {
            user? <UserButton/>:(
              <button
              onClick={(e) => openSignIn()}
              className="bg-green-600 text-white px-6 sm:px-9 py-2 rounded-full cursor-pointer"
            >
              Login
            </button>
            )
          }
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
