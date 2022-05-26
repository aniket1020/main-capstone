import { useEffect, useState } from "react";
import "./css/EditProfile.css";
import NavBar from "./NavBar";
import Footer from "./Footer";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Image from "react-bootstrap/Image";

import { useSelector } from "react-redux";
import axios from "axios";

function EditProfile() {
  const walletAddress = useSelector((state) =>
    state.user.value ? state.user.value.walletId : null
  );
  const jwt = useSelector((state) =>
    state.accessToken.value ? state.accessToken.value : null
  );

  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const [profileImagePath, setProfileImagePath] = useState(null);
  const [profileBackgroundImagePath, setProfileBackgroundImagePath] =
    useState(null);

  const [profileImage, setProfileImage] = useState(null);
  const [profileBackgroundImage, setProfileBackgroundImage] = useState(null);

  useEffect(async () => {
    await axios
      .get("http://127.0.0.1:5000/userProfile/getUser", {
        params: {
          walletId: walletAddress,
        },
      })
      .then((res) => {
        setUser(res.data.user);

        if (res.data.user.profileImagePath)
          setProfileImagePath(
            "http://127.0.0.1:5000/" + res.data.user.profileImagePath
          );
        else setProfileImagePath(null);

        if (res.data.user.profileBackgroundImagePath)
          setProfileBackgroundImagePath(
            "http://127.0.0.1:5000/" + res.data.user.profileBackgroundImagePath
          );
        else setProfileBackgroundImagePath(null);
        setLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div className="App">Loading...</div>;
  }

  return (
    <>
      <NavBar />
      <ToastContainer
        toastStyle={{ backgroundColor: "black", color: "white" }}
      />
      <div className="profileBackground">
        <img
          className="profileBackgroundImage"
          src={
            profileBackgroundImagePath !== null
              ? profileBackgroundImagePath
              : require("./images/backgroundUserProfileImage.jpeg")
          }
          alt="no image"
        />
        <input
          type="file"
          id="bg-img"
          accept="image/*"
          onChange={(e) => {
            setProfileBackgroundImagePath(
              URL.createObjectURL(e.target.files[0])
            );
            setProfileBackgroundImage(e.target.files[0]);
          }}
          hidden
        />
        <img
          id="editProfileBackground"
          src={require("./images/verticalCross.png")}
          alt="no image"
          onClick={() => {
            document.getElementById("bg-img").click();
          }}
        />
      </div>
      <div className="userDetails">
        <div className="imageCol">
          <div className="profileImageCol">
            <Image
              className="userProfileImage"
              roundedCircle
              height={160}
              width={160}
              src={
                profileImagePath !== null
                  ? profileImagePath
                  : require("./images/profileDefault.png")
              }
              alt="no image"
            />
            <input
              type="file"
              id="profile-img"
              accept="image/*"
              onChange={(e) => {
                setProfileImagePath(URL.createObjectURL(e.target.files[0]));
                setProfileImage(e.target.files[0]);
              }}
              hidden
            />
            <img
              id="editProfileImage"
              src={require("./images/verticalCross.png")}
              alt="no image"
              onClick={(e) => {
                document.getElementById("profile-img").click();
              }}
            />
          </div>
          <div
            className="editButton"
            onClick={(e) => {
              document.getElementById("profile-img").click();
            }}
          >
            Upload from computer
          </div>
          <div
            className="editButton"
            onClick={(e) => {
              setProfileImagePath(null);
              setProfileBackgroundImagePath(null);
            }}
          >
            Reset to default
          </div>
        </div>
        <div className="userDetailsCol">
          <div className="userDetailSectionHeader">Account Information</div>
          <div className="userDetailSectionRow">
            {/* User Detail Input */}
            <div className="userDetailSectionCol">
              <div className="userDetailLabel">First Name</div>
              <div className="userDetailInput">
                <input
                  id="firstName"
                  className="userDetailInputField"
                  placeholder={user.firstName ? user.firstName : "First Name"}
                  defaultValue={user.firstName ? user.firstName : ""}
                />
              </div>
            </div>
            <div className="userDetailSectionCol">
              <div className="userDetailLabel">Last Name</div>
              <div className="userDetailInput">
                <input
                  id="lastName"
                  className="userDetailInputField"
                  placeholder={user.lastName ? user.lastName : "Last Name"}
                  defaultValue={user.lastName ? user.lastName : ""}
                />
              </div>
            </div>
          </div>
          <div className="userDetailSectionRow">
            {/* User Detail Input */}
            <div className="userDetailSectionCol">
              <div className="userDetailLabel">Email Address</div>
              <div className="userDetailInput">
                <input
                  id="email"
                  className="userDetailInputField"
                  placeholder={user.email ? user.email : "Email Address"}
                  defaultValue={user.email ? user.email : ""}
                />
              </div>
            </div>
            <div className="userDetailSectionCol">
              <div className="userDetailLabel">username</div>
              <div className="userDetailInput">
                <input
                  id="userName"
                  className="userDetailInputField"
                  placeholder={user.userName ? user.userName : "Username"}
                  defaultValue={user.userName ? user.userName : ""}
                />
              </div>
            </div>
          </div>
          <div className="userDetailSectionHeader">Social Information</div>
          <div className="userDetailSectionRow">
            {/* User Detail Input */}
            <div className="userDetailSectionCol">
              <div className="userDetailLabel">Your website</div>
              <div className="userDetailInput">
                <input
                  id="website"
                  className="userDetailInputField"
                  placeholder={user.website ? user.website : "Website"}
                  defaultValue={user.website ? user.website : ""}
                />
              </div>
            </div>
            <div className="userDetailSectionCol">
              <div className="userDetailLabel">Facebook</div>
              <div className="userDetailInput">
                <input
                  id="facebook"
                  className="userDetailInputField"
                  placeholder={user.facebook ? user.facebook : "Facebook"}
                  defaultValue={user.facebook ? user.facebook : ""}
                />
              </div>
            </div>
          </div>
          <div className="userDetailSectionRow">
            {/* User Detail Input */}
            <div className="userDetailSectionCol">
              <div className="userDetailLabel">Twitter</div>
              <div className="userDetailInput">
                <input
                  id="twitter"
                  className="userDetailInputField"
                  placeholder={user.twitter ? user.twitter : "Twitter"}
                  defaultValue={user.twitter ? user.twitter : ""}
                />
              </div>
            </div>
            <div className="userDetailSectionCol">
              <div className="userDetailLabel">Instagram</div>
              <div className="userDetailInput">
                <input
                  id="instagram"
                  className="userDetailInputField"
                  placeholder={user.instagram ? user.instagram : "Instagram"}
                  defaultValue={user.instagram ? user.instagram : ""}
                />
              </div>
            </div>
          </div>
          <div className="userDetailSectionRow">
            <div className="updateProfileSectionButton">
              <div
                className="updateProfileButton"
                onClick={() => {
                  const userData = new FormData();

                  userData.append("walletAddress", walletAddress);

                  if (profileBackgroundImage)
                    userData.append(
                      "profileBackgroundImagePath",
                      profileBackgroundImage,
                      walletAddress + "-bg.jpg"
                    );
                  else if (profileBackgroundImagePath == null)
                    userData.append("profileBackgroundImagePath", null);
                  if (profileImage)
                    userData.append(
                      "profileImagePath",
                      profileImage,
                      walletAddress + "-profile.jpg"
                    );
                  else if (profileImagePath == null)
                    userData.append("profileImagePath", null);

                  if (
                    document.getElementById("firstName").value !==
                    user.firstName
                  )
                    userData.append(
                      "firstName",
                      document.getElementById("firstName").value
                    );
                  if (
                    document.getElementById("lastName").value !== user.lastName
                  )
                    userData.append(
                      "lastName",
                      document.getElementById("lastName").value
                    );
                  if (
                    document.getElementById("userName").value !== user.userName
                  )
                    userData.append(
                      "userName",
                      document.getElementById("userName").value
                    );
                  if (document.getElementById("email").value !== user.email)
                    userData.append(
                      "email",
                      document.getElementById("email").value
                    );

                  if (document.getElementById("website").value !== user.website)
                    userData.append(
                      "website",
                      document.getElementById("website").value
                    );
                  if (
                    document.getElementById("facebook").value !== user.facebook
                  )
                    userData.append(
                      "facebook",
                      document.getElementById("facebook").value
                    );
                  if (document.getElementById("twitter").value !== user.twitter)
                    userData.append(
                      "twitter",
                      document.getElementById("twitter").value
                    );
                  if (
                    document.getElementById("instagram").value !==
                    user.instagram
                  )
                    userData.append(
                      "instagram",
                      document.getElementById("instagram").value
                    );

                  axios
                    .post("http://127.0.0.1:5000/userProfile/edit", userData, {
                      headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: "JWT " + jwt,
                      },
                    })
                    .then((res) => {
                      toast.success("Profile updated successfully", {
                        position: "bottom-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: false,
                        progress: undefined,
                      });
                    })
                    .catch((err) => {
                      toast.error("Something went wrong", {
                        position: "bottom-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: false,
                        progress: undefined,
                      });
                    });
                }}
              >
                Update Your Profile
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default EditProfile;
