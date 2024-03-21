import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, IconButton, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { AiFillLike } from "react-icons/ai";



export default function Postcard({
  title,
  description,
  image,
  username,
  time,
  id,
  isUser
}) {
  const navigate = useNavigate();
  const [like,setLike]=React.useState(0)
  const [input,setInput]=React.useState("")
  const [comments,setComments]=React.useState([])

  const handleEdit = () => {
    navigate(`/post-details/${id}`);
  };
  

  const handledelete = async () => {
    window.location.reload();
    try {
      const { data } = await axios.delete(
        `http://localhost:5000/api/v1/post/delete-post/${id}`
      );

      toast.success("Post deleted");
      window.location.reload();
      navigate("/posts");
    } catch (error) {
      console.log(error);
    }
  };

  const handlelike=async()=>{  
    setLike(like+1)
  }
  const handlecomment=(e)=>{
    e.preventDefault();
    setComments((prev)=>{
      return [...prev, input]
    })
    setInput("")
  }
  return (
    <Card
      sx={{
        width: "40%",
        margin: "auto",
        mt: 2,
        padding: 2,
        boxShadow: "5px 5px 10px #ccc",
        ":hover:": {
          boxShadow: "10px 10px 20px #ccc",
        },
      }}>
      
        <Box display={"flex"}>
          <IconButton onClick={handleEdit} sx={{ marginLeft: "auto" }}>
            <ModeEditIcon color="info"/>
          </IconButton>
          <IconButton onClick={handledelete}>
            <DeleteIcon color="error"/>
          </IconButton>
        </Box>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {username}
          </Avatar>
        }
        title={username}
        subheader={time}
      />
      <CardMedia component="img" height="194" image={image} alt="Paella dish" />
      <CardContent>
        <Typography variant="h6" color="text.secondary">
          Title:{title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>


      <Typography variant="body2" color="text.secondary">
          Comments
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {comments}
        </Typography>
      <IconButton onClick={handlelike}>
            <AiFillLike color="gray"/><Typography variant="h6" color="text.secondary">
          {like}
        </Typography>
          </IconButton>
          <TextField
          value={input}
          onChange={(e)=>setInput(e.target.value)}
            variant="outlined"
            placeholder="Add Comment"
          />
          <Button
            sx={{ ml: 3 }}
            type="submit"
            variant="contained"
            color="warning"
            onClick={handlecomment}>
            Send
          </Button>
    </Card>
  );
}
