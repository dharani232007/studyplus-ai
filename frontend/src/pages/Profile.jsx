


import { useEffect, useState, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar"; // 1. Imported the header navbar component

import {
  getProfile,
  updateProfile,
  updateEducation,
  updatePreferences,
  uploadProfileImage
} from "../api/profileApi";

import "../styles/profile.css";

export default function Profile() {
  const { user } = useAuth();
  const fileInputRef = useRef(null);

  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState({});
  const [uploadStatus, setUploadStatus] = useState(""); 

  useEffect(() => {
    if (user?.userId) {
      loadProfile();
    }
  }, [user]);

  const loadProfile = async () => {
    try {
      const data = await getProfile(user.userId);
      setProfile(data || {});
    } catch (error) {
      console.error("Error loading profile:", error);
    }
  };

  const handleEditClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0]; 
    if (!selectedFile) return;

    setProfile((prev) => ({
      ...prev,
      profileImage: URL.createObjectURL(selectedFile)
    }));

    try {
      setUploadStatus("Uploading..."); 
      await uploadProfileImage(user.userId, selectedFile);
      await loadProfile(); 
      setUploadStatus("Image uploaded successfully! ✅");

      setTimeout(() => {
        setUploadStatus("");
      }, 3000);
    } catch (error) {
      console.error("Image upload failed:", error);
      setUploadStatus("Upload failed. Please try again. ❌");
    }
  };

  const saveBasic = async () => {
    try {
      await updateProfile(user.userId, { bio: profile.bio || "" });
      setStep(2); // Switches smoothly to Step 2 card
    } catch (error) {
      console.error("Error saving basic profile:", error);
    }
  };

  const saveEducation = async () => {
    try {
      await updateEducation(user.userId, {
        role: profile.role || "",
        collegeOrCompany: profile.collegeOrCompany || "",
        department: profile.department || "",
        yearOfStudy: profile.yearOfStudy || "",
        domainInterest: profile.domainInterest || "",
        careerGoal: profile.careerGoal || "",
        skillLevel: profile.skillLevel || ""
      });
      setStep(3); // Switches smoothly to Step 3 card
    } catch (error) {
      console.error("Error saving education details:", error);
    }
  };

  const savePreference = async () => {
    try {
      await updatePreferences(user.userId, {
        dailyStudyGoal: profile.dailyStudyGoal || "",
        availableHours: profile.availableHours || "",
        preferredLearningStyle: profile.preferredLearningStyle || ""
      });
      alert("Profile Completed Successfully!");
    } catch (error) {
      console.error("Error saving preferences:", error);
    }
  };

  return (
    <div className="profile-layout-container">
      {/* 2. Placed Navbar outside the steps container so it never disappears */}
      <Navbar /> 

      <div className="profile-page">
        {step === 1 && (
          <div className="card">
            <h2>Basic Profile</h2>

            {uploadStatus && (
              <div className={`upload-alert ${uploadStatus.includes("successfully") ? "success" : "loading"}`}>
                {uploadStatus}
              </div>
            )}

            <div className="avatar-container">
              <img
                className="avatar"
                src={
                  profile.profileImage ||
                  "https://flaticon.com"
                }
                alt="Profile"
              />
              <button 
                type="button" 
                className="edit-avatar-badge" 
                onClick={handleEditClick}
              >
                ✏️
              </button>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
                accept="image/*"
              />
            </div>

            <input value={profile.name || ""} disabled placeholder="Name" />
            <input value={profile.email || ""} disabled placeholder="Email" />

            <textarea
              placeholder="Bio"
              value={profile.bio || ""}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  bio: e.target.value
                })
              }
            />

            <button onClick={saveBasic}>Save & Next</button>
          </div>
        )}

        {step === 2 && (
          <div className="card">
            <h2>Education & Career</h2>

            <input
              placeholder="Role"
              value={profile.role || ""} // 3. Added complete value matching
              onChange={(e) =>
                setProfile({
                  ...profile,
                  role: e.target.value
                })
              }
            />

            <input
              placeholder="College"
              value={profile.collegeOrCompany || ""}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  collegeOrCompany: e.target.value
                })
              }
            />

            <input
              placeholder="Department"
              value={profile.department || ""}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  department: e.target.value
                })
              }
            />

            <input
              placeholder="Year"
              value={profile.yearOfStudy || ""}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  yearOfStudy: e.target.value
                })
              }
            />

            <input
              placeholder="Domain"
              value={profile.domainInterest || ""}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  domainInterest: e.target.value
                })
              }
            />

            <input
              placeholder="Career Goal"
              value={profile.careerGoal || ""}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  careerGoal: e.target.value
                })
              }
            />

            <input
              placeholder="Skill Level"
              value={profile.skillLevel || ""}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  skillLevel: e.target.value
                })
              }
            />

            {/* Structured action buttons so they look professional next to each other */}
            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <button
                type="button"
                style={{ background: "#6b7280" }}
                onClick={() => setStep(1)}
              >
                Back
              </button>
              <button
                type="button"
                style={{ flex: 1 }}
                onClick={saveEducation}
              >
                Save & Next
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="card">
            <h2>Learning Preferences</h2>

            <input
              placeholder="Daily Goal"
              value={profile.dailyStudyGoal || ""}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  dailyStudyGoal: e.target.value
                })
              }
            />

            <input
              placeholder="Hours"
              value={profile.availableHours || ""}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  availableHours: e.target.value
                })
              }
            />

            <input
              placeholder="Learning Style"
              value={profile.preferredLearningStyle || ""}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  preferredLearningStyle: e.target.value
                })
              }
            />

            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <button
                type="button"
                style={{ background: "#6b7280" }}
                onClick={() => setStep(2)}
              >
                Back
              </button>
              <button
                type="button"
                style={{ flex: 1 }}
                onClick={savePreference}
              >
                Complete Profile
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
