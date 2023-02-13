import { AppBar, Button, Menu, MenuItem, Toolbar } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../features/user/userSlice";
import Logo from "../assets/Logo.png";

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    setAnchorEl(null);
    dispatch(logoutUser());

    navigate("/login");
  };

  return (
    <AppBar
      position='relative'
      sx={{
        width: "100%",
        overflowX: "hidden",
        position: "sticky",
        top: 0,
        zIndex: 999,
        bgcolor: "#ffc6e9",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <img
          src={Logo}
          alt='Dating Hub'
          style={{
            width: "18rem",
          }}
        />
        {isAuthenticated && (
          <Box>
            <Button
              id='basic-button'
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup='true'
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <img
                src={user?.profilePic}
                alt={user?.username}
                style={{
                  width: "4rem",
                  height: "4rem",
                  objectFit: "cover",
                  borderRadius: "100%",
                }}
              />
            </Button>
            <Menu
              id='basic-menu'
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem>{`@${user?.username}`}</MenuItem>
              <MenuItem onClick={handleLogOut}>Logout</MenuItem>
            </Menu>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
