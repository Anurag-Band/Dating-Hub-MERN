import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, loadUser } from "./features/user/userSlice";
import { useEffect } from "react";
import { store } from "./store/store";
import { Box } from "@mui/material";
import { ToastContainer } from "react-toastify";

function App() {
  const dispatch = useDispatch();
  const { status, errorMessage } = useSelector((state) => state.user);
  useEffect(() => {
    store.dispatch(loadUser());
  }, [dispatch]);

  useEffect(() => {
    if (status === "ERROR") {
      setTimeout(() => {
        dispatch(clearErrors());
      }, 2000);
    }
  }, [status, dispatch, errorMessage]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#fff5fb",
      }}
    >
      <Navbar />
      <Routes>
        <Route>
          <Route path='/login' element={<LogIn />} />
          <Route path='/signup' element={<SignUp />} />
        </Route>
        {/* USER protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path='/' element={<Home />} />
        </Route>
      </Routes>
      <ToastContainer />
    </Box>
  );
}

export default App;
