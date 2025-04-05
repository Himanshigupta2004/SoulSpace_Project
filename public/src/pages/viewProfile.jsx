import React from "react";
import styled from "styled-components";
import { useUserContext } from "../context/userContext";

export default function ViewProfile() {
  const { user } = useUserContext();

  if (!user) {
    return (
      <ProfileContainer>
        <h1>No User Logged In</h1>
        <p>Please log in to view your profile.</p>
      </ProfileContainer>
    );
  }

  return (
    <ProfileContainer>
      <div className="profile-card">
        <h1>User Profile</h1>
        <img
          src={`data:image/svg+xml;base64,${user.avatarImage}`}
          alt="Avatar"
          className="avatar"
        />
        <div className="details">
          <p>
            <strong>Username:</strong> {user.username}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>User ID:</strong> {user._id}
          </p>
          <p>
            <strong>Avatar Set:</strong>{" "}
            {user.isAvatarImageSet ? "Yes" : "No"}
          </p>
        </div>
      </div>
    </ProfileContainer>
  );
}

const ProfileContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f4f8;
  color: #333;

  .profile-card {
    background: white;
    border-radius: 8px;
    padding: 2rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
    width: 300px;

    h1 {
      margin-bottom: 1rem;
      font-size: 1.5rem;
      color: #3c096c;
    }

    .avatar {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      margin-bottom: 1rem;
      border: 2px solid #3c096c;
    }

    .details {
      text-align: left;

      p {
        margin: 0.5rem 0;
        strong {
          color: #3c096c;
        }
      }
    }
  }
`;
