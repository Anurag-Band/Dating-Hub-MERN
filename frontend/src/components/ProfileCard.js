import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import { CardActions, Tooltip } from "@mui/material";
import { Block, Favorite, VolunteerActivism } from "@mui/icons-material";
import { useSelector } from "react-redux";
import axios from "axios";
import { ErrorToast, SuccessToast } from "../utils/CustomToast";

export default function ProfileCard({ prof }) {
  const { user } = useSelector((state) => state.user);

  const [hasLiked, setHasLiked] = useState(false);
  const [hasSuperLiked, setHasSuperLiked] = useState(false);
  const [hasBlocked, setBlocked] = useState(false);

  const handleUserLike = async () => {
    try {
      const { data } = await axios.put(`/api/v1/user/like/${prof?._id}`);

      if (data.isLiked) {
        setHasLiked(true);
        SuccessToast(data.message);
      } else {
        setHasLiked(false);
        SuccessToast(data.message);
      }
    } catch (error) {
      ErrorToast(error.response.data.message);
    }
  };

  const handleUserSuperLike = async () => {
    try {
      const { data } = await axios.put(`/api/v1/user/super-like/${prof?._id}`);

      if (data.isSuperLiked) {
        setHasSuperLiked(true);
        SuccessToast(data.message);
      } else {
        setHasSuperLiked(false);
        SuccessToast(data.message);
      }
    } catch (error) {
      ErrorToast(error.response.data.message);
    }
  };

  const handleUserBlock = async () => {
    try {
      const { data } = await axios.put(`/api/v1/user/block/${prof?._id}`);

      if (data.isBlocked) {
        setBlocked(true);
        SuccessToast(data.message);
      } else {
        setBlocked(false);
        SuccessToast(data.message);
      }
    } catch (error) {
      ErrorToast(error.response.data.message);
    }
  };

  useEffect(() => {
    setHasLiked(prof?.likes.includes(user?._id));
    setHasSuperLiked(prof?.superLikes.includes(user?._id));
    setBlocked(prof?.blockedBy.includes(user?._id));

    // eslint-disable-next-line
  }, [user]);

  return (
    <Card
      sx={{
        margin: "0 auto",
        bgcolor: "#ffffff",
        width: { xs: "90vw", sm: "70vw", md: "40vw" },
      }}
    >
      <CardHeader title={`@${prof?.username}`} />
      <CardMedia
        component='img'
        sx={{
          objectFit: "contain",
          width: "100%",
          height: "100%",
        }}
        image={prof?.profilePic}
        alt={prof?.username}
      />
      <CardActions
        sx={{
          gap: 1,
        }}
      >
        <IconButton aria-label='like' onClick={handleUserLike}>
          <Tooltip title='Like'>
            {hasLiked ? (
              <Favorite
                sx={{
                  color: "red",
                }}
              />
            ) : (
              <Favorite
                sx={{
                  color: "grey",
                }}
              />
            )}
          </Tooltip>
        </IconButton>
        <IconButton aria-label='super like' onClick={handleUserSuperLike}>
          <Tooltip title='Super Like'>
            {hasSuperLiked ? (
              <VolunteerActivism
                sx={{
                  color: "red",
                }}
              />
            ) : (
              <VolunteerActivism
                sx={{
                  color: "grey",
                }}
              />
            )}
          </Tooltip>
        </IconButton>
        <IconButton aria-label='block' onClick={handleUserBlock}>
          <Tooltip title='Block'>
            {hasBlocked ? (
              <Block
                sx={{
                  color: "red",
                }}
              />
            ) : (
              <Block
                sx={{
                  color: "grey",
                }}
              />
            )}
          </Tooltip>
        </IconButton>
      </CardActions>
    </Card>
  );
}
