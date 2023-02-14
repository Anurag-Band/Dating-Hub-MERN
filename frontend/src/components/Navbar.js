import {
  AppBar,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../features/user/userSlice";
import Logo from "../assets/Logo.png";
import { CircleNotifications, Favorite } from "@mui/icons-material";

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user, notifications } = useSelector(
    (state) => state.user
  );

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  // const [isNotificationReceived, setIsNotification]

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
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 7,
          }}
        >
          <Box>
            {isAuthenticated && (
              <Box>
                <IconButton
                  id='basic-button'
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup='true'
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                >
                  <CircleNotifications
                    sx={{
                      fontSize: 33,
                    }}
                  />
                  {`${notifications?.length}`}
                </IconButton>
                <Menu
                  id='basic-menu'
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                  sx={{
                    gap: 1,
                  }}
                >
                  {notifications?.length === 0 && (
                    <MenuItem>No Notifications</MenuItem>
                  )}
                  {notifications?.length > 0 &&
                    notifications?.map((notif, index) =>
                      notif.type === "Liked" ? (
                        <MenuItem
                          key={index}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                            padding: "11px 15px",
                          }}
                        >
                          <Favorite
                            sx={{
                              color: "red",
                              fontSize: "34px",
                              margin: "0 9px",
                            }}
                          />
                          <Typography>
                            {`${notif.type} by @${notif.senderUser.username}`}
                          </Typography>
                        </MenuItem>
                      ) : (
                        <MenuItem
                          key={index}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                          }}
                        >
                          <img
                            src={notif?.senderUser?.profilePic}
                            alt={notif?.senderUser?.username}
                            style={{
                              width: "3rem",
                            }}
                          />
                          <Typography>
                            {`${notif.type} by @${notif.senderUser.username}`}
                          </Typography>
                        </MenuItem>
                      )
                    )}
                </Menu>
              </Box>
            )}
          </Box>
          <Box>
            {isAuthenticated && (
              <Tooltip title={"Log Out"}>
                <img
                  src={user?.profilePic}
                  alt={user?.username}
                  style={{
                    width: "4rem",
                    height: "4rem",
                    objectFit: "cover",
                    borderRadius: "100%",
                  }}
                  onClick={handleLogOut}
                />
              </Tooltip>
            )}
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
