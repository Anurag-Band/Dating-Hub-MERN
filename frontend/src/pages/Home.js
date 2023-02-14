import { Box, Container, CssBaseline } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { getUserProfiles, setNotifications } from "../features/user/userSlice";
import Loader from "../assets/loading.svg";
import ProfileCard from "../components/ProfileCard";

import io from "socket.io-client";
const ENDPOINT = process.env.REACT_APP_SOCKET_ENDPOINT;
let socket;

export default function Home() {
  const dispatch = useDispatch();
  const { allUserProfiles, status, user } = useSelector((state) => state.user);

  const [isJoined, setIsJoined] = useState(false);
  // eslint-disable-next-line
  const [socketConnected, setSocketConnected] = useState(false);

  useEffect(() => {
    if (!user) return;
    socket = io(ENDPOINT);
    if (user && !isJoined) {
      socket.emit("setup", user);
      socket.on("connected", () => setSocketConnected(true));
      socket.emit("join session", user._id);
      setIsJoined(true);
    }

    // eslint-disable-next-line
  }, [user]);

  useEffect(() => {
    dispatch(getUserProfiles());
  }, [dispatch]);

  useEffect(() => {
    socket.on("like recieved", (newLikeRecieved) => {
      dispatch(setNotifications(newLikeRecieved));
    });
  });

  useEffect(() => {
    socket.on("super like recieved", (newSuperLikeRecieved) => {
      dispatch(setNotifications(newSuperLikeRecieved));
    });
  });

  return (
    <Container
      component='main'
      sx={{
        width: "100%",
        height: "100%",
      }}
    >
      <CssBaseline />
      <Box
        component='main'
        sx={{
          paddingTop: 8,
          paddingBottom: 8,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {status === "LOADING" && <img src={Loader} alt='Loading...' />}
        {allUserProfiles?.map((prof) => (
          <ProfileCard key={prof._id} prof={prof} socket={socket} />
        ))}
      </Box>
    </Container>
  );
}
