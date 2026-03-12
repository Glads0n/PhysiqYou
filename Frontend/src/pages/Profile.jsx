import { useEffect, useState } from "react";
import api from "../api/axios";
import "./Profile.css";

export default function Profile() {

  const [profile, setProfile] = useState({});
  const [user, setUser] = useState({});

  const [editProfile, setEditProfile] = useState(false);
  const [editUser, setEditUser] = useState(false);

useEffect(() => {

  const loadProfile = async () => {
    try {
      const res = await api.get("profile/");

      setProfile(res.data.profile);
      setUser(res.data.user);

    } catch (error) {
      console.error("Failed to fetch profile:", error);
    }
  };

  loadProfile();

}, []);

  const handleProfileChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  const handleUserChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const saveProfile = async () => {

    try {
      await api.put("profile/update/", {
        profile: profile,
        user: user
      });

      setEditProfile(false);
      setEditUser(false);

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="profile-container">

      <h1>My Profile</h1>

      {/* FITNESS PROFILE CARD */}

      <div className="profile-card">

        <div className="card-header">
          <h2>Fitness Profile</h2>

          {!editProfile ? (
            <button className="edit-btn" onClick={() => setEditProfile(true)}>
              Edit
            </button>
          ) : (
            <div className="card-actions">
              <button className="save-btn" onClick={saveProfile}>Save</button>
              <button className="cancel-btn" onClick={() => setEditProfile(false)}>Cancel</button>
            </div>
          )}

        </div>

        <div className="profile-grid">

          <label>Age</label>
          <input
            name="age"
            value={profile.age || ""}
            disabled={!editProfile}
            onChange={handleProfileChange}
          />

          <label>Gender</label>
          <input
            name="gender"
            value={profile.gender || ""}
            disabled={!editProfile}
            onChange={handleProfileChange}
          />

          <label>Height (cm)</label>
          <input
            name="height"
            value={profile.height || ""}
            disabled={!editProfile}
            onChange={handleProfileChange}
          />

          <label>Current Weight</label>
          <input
            name="current_weight"
            value={profile.current_weight || ""}
            disabled={!editProfile}
            onChange={handleProfileChange}
          />

          <label>Target Weight</label>
          <input
            name="target_weight"
            value={profile.target_weight || ""}
            disabled={!editProfile}
            onChange={handleProfileChange}
          />

          <label>Activity Level</label>
          <input
            name="activity_level"
            value={profile.activity_level || ""}
            disabled={!editProfile}
            onChange={handleProfileChange}
          />

          <label>Goal Type</label>
          <input
            name="goal_type"
            value={profile.goal_type || ""}
            disabled={!editProfile}
            onChange={handleProfileChange}
          />

        </div>

      </div>


      {/* USER INFO CARD */}

      <div className="profile-card">

        <div className="card-header">

          <h2>Personal Information</h2>

          {!editUser ? (
            <button className="edit-btn" onClick={() => setEditUser(true)}>
              Edit
            </button>
          ) : (
            <div className="card-actions">
              <button className="save-btn" onClick={saveProfile}>Save</button>
              <button className="cancel-btn" onClick={() => setEditUser(false)}>Cancel</button>
            </div>
          )}

        </div>

        <div className="profile-grid">

          <label>Username</label>
          <input
            name="username"
            value={user.username || ""}
            disabled={!editUser}
            onChange={handleUserChange}
          />

          <label>Email</label>
          <input
            name="email"
            value={user.email || ""}
            disabled
          />

        </div>

      </div>

    </div>
  );
}