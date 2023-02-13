import { Box, Container, CssBaseline } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { getUserProfiles } from "../features/user/userSlice";
import Loader from "../assets/loading.svg";
import ProfileCard from "../components/ProfileCard";

export default function Home() {
  const dispatch = useDispatch();
  const { allUserProfiles, status } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUserProfiles());
  }, [dispatch]);

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
          <ProfileCard key={prof._id} prof={prof} />
        ))}
      </Box>
    </Container>
  );
}
