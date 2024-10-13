import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import side
export default function Profile() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [newUserName, setNewUserName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    const fetchData = async () => {
      const storedUser = JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY));
      if (storedUser) {
        setUserName(storedUser.username);
        setEmail(storedUser.email);
        setAvatar(storedUser.avatarImage); // Ensure this key matches what is stored
        setNewUserName(storedUser.username);
        setNewEmail(storedUser.email);
      }
    };

    fetchData();
  }, []);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const storedUser = JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY));
      const { username } = storedUser;
      const response = await axios.patch(`/api/user/${username}`, {
        username: newUserName,
        email: newEmail,
      });

      if (response.status === 200) {
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify({ ...storedUser, username: newUserName, email: newEmail })
        );
        setUserName(newUserName);
        setEmail(newEmail);
        toast.success("Profile updated successfully!", toastOptions);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.", toastOptions);
    }
    setLoading(false);
  };

  return (
    
    <Container>
      {avatar ? (
        <img src={`data:image/svg+xml;base64,${avatar}`} alt="User Avatar" />
      ) : (
        <img src="default-avatar.png" alt="Default Avatar" />
      )}
      <h1>
        Your username is: <span>{userName}</span>
      </h1>
      <h1>
        Your email id is: <span>{email}</span>
      </h1>
      
      {/* Form for updating profile */}
      <form>
        <div>
          <label htmlFor="username">Update Username:</label>
          <input
            id="username"
            type="text"
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Update Email:</label>
          <input
            id="email"
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
        </div>
        <button type="button" onClick={handleUpdate} disabled={loading}>
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>

      <ToastContainer />
    </Container>
  
  );
}

// Styled component for Container
const Container = styled.div`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 5%;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-top: 20px;
  width: 40vw;
  height:80vh;
  margin-left: 35%;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  text-align: center;
  position: relative; /* Make sure the container is relative for the ::after element positioning */

  &::before {
    content: "";
    width: 20vw;
    height: 45vh;
    background-image: url('https://media.istockphoto.com/id/1371988825/photo/3d-man-with-ok-gesture.jpg?s=612x612&w=0&k=20&c=5ZydPoJ-DT6Tw0d7FyFr73zLK_-kwjSihCwwRaM8rCs='); 
    // background-color:black;
    background-size: cover; 
    background-position: center; 
    position: absolute;
    right: -50.5%;
    bottom: 0;
  }

  h1 {
    font-size: 1.5rem;
    margin-bottom: 10px;
  }

  span {
    font-weight: bold;
    color: #333;
  }

  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-bottom: 20px;
    object-fit: cover;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 20px;

    div {
      display: flex;
      flex-direction: column;

      label {
        font-size: 1rem;
        margin-bottom: 5px;
      }

      input {
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 1rem;
        width: 20vw;
        margin-left: 20%;
        text-align: center;
      }
    }

    button {
      background-color: #4e0eff;
      color: white;
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      cursor: pointer;
      margin-left: 38%;
      width: 10vw;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #3a0eaa;
      }

      &:disabled {
        background-color: #999;
        cursor: not-allowed;
      }
    }
  }
`;
