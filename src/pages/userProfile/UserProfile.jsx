import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getusers,
  subscribeer,
  userProf,
} from "../../reducers/userProfile/UserProfile";
import { useParams } from "react-router";

import img8 from "../../assets/images/pic6.png";
import PropTypes from "prop-types";
import Logo from "../../assets/icons/Carousel.png";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import { Fragment, useRef, useState } from "react";
import Button from "@mui/material/Button";
import { store } from "../../store/store";
import {
  GetPostByUser,
  getFollowings,
  getProfileById,
  putProfileImage,
} from "../../api/profile/profile";
import { destroyToken, getToken } from "../../utils/token";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, NavLink, useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Box from "@mui/material/Box";
import ArticleIcon from "@mui/icons-material/Article";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import PersonIcon from "@mui/icons-material/Person";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";

const style = {
  position: "absolute",
  top: "33%",
  left: "70%",
  transform: "translate(-50%, -50%)",
  width: 340,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "10px",
  outline: "none",
  p: 4,
};

const styleImageEditProfile = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "10px",
  p: 4,
};

const styleFollower = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "10px",
  p: 4,
};

const styleFollowing = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "10px",
  p: 4,
};

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const UserProfile = () => {
  const { id } = useParams();
  console.log(id);
  const data = useSelector((state) => state.userprofil.data);
  const dispatch = useDispatch();
  console.log(data);

  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState("paper");

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = useRef(null);
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const [editImageProfile, setEditImageProfile] = useState(false);
  const handleOpenEditImageProfile = () => setEditImageProfile(true);
  const handleCloseEditImageProfile = () => setEditImageProfile(false);
  const navigate = useNavigate();

  const [followingProfile, setFollowingProfile] = useState(false);
  const handleOpenFollowingProfile = () => setFollowingProfile(true);
  const handleCloseFollowingProfile = () => setFollowingProfile(false);

  const [followerProfile, setFollowerProfile] = useState(false);
  const handleOpenFollowerProfile = () => setFollowerProfile(true);
  const handleCloseFollowerProfile = () => setFollowerProfile(false);

  function logOut() {
    navigate("/");
    destroyToken("access_token");
  }

  const [search, setSearch] = useState("");

  const [imageEdit, setImageEdit] = useState("");

  const [menuProfile, setMenuProfile] = useState(false);
  const handleOpenProfile = () => setMenuProfile(true);
  const handleCloseProfile = () => setMenuProfile(false);

  const userProfile = useSelector((store) => store.profile.userProfile);
  const postUser = useSelector((store) => store.profile.postUser);
  const followingsUser = useSelector((store) => store.profile.followingsUser);
  const followersUser = useSelector((store) => store.profile.followersUser);

  console.log(userProfile);

  const [openPost, setOpenPost] = useState(false);

  const handleOpenPost = () => {
    setOpenPost(true);
  };

  const [idx, setIdx] = useState();

  const handleClick = function () {
    dispatch(
      putProfileImage({
        image: imageEdit,
      })
    );
  };

  useEffect(
    () => {
      dispatch(getProfileById(id));
      dispatch(GetPostByUser(id));
      dispatch(getFollowings(id));
    },
    [dispatch],
    getProfileById()
  );

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    dispatch(userProf(id));
  }, [dispatch, id]);

  const users = useSelector((state, action) => state.userprofil.users);
  useEffect(() => {
    dispatch(getusers());
  }, [dispatch]);
  return (
    <div>
      <div className="flex ml-[-100px] justify-between items-center">
        <div className="w-[40%] mt-[100px]">
          <img
            onClick={() => handleOpenEditImageProfile()}
            className="w-[140px] rounded-full cursor-pointer  h-[140px] object-cover"
            src={
              data?.image !== ""
                ? `${import.meta.env.VITE_APP_FILES_URL}${data?.image}`
                : "data:image/jpeg;base64,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"

              // : "https://tse4.mm.bing.net/th?id=OIP.jixXH_Els1MXBRmKFdMQPAHaHa&pid=Api&P=0&h=220"
            }
            alt=""
          />
        </div>
        <div className="w-[70%] mt-[100px] ">
          <div className="flex  w-[98%]  items-center gap-[60px]">
            <div>
              <h1 className="text-[19px] font-[700] font-sans">
                {data?.userName}
              </h1>
            </div>
            <div className="flex items-center gap-[20px] h-[50px]">
              {users?.map((el) => {
                if (el.userName == data?.userName) {
                  return (
                    <>
                      <button
                        onClick={() => dispatch(subscribeer(el.id))}
                        className="w-[120px]  text-[16px] h-[40px] bg-[whitesmoke] rounded-xl font-sans font-[700]"
                      >
                        Подписаться
                      </button>
                    </>
                  );
                }
              })}

              <button className="w-[120px] text-[16px] h-[40px] bg-[whitesmoke] rounded-xl font-sans font-[700]">
                Cообщения
              </button>
              <IconButton onClick={() => handleOpenProfile()}>
                <MenuIcon sx={{ width: "40px", height: "40px" }} />
              </IconButton>
            </div>
          </div>
          <div className="flex justify-between w-[70%] p-[0px] items-center mt-[20px] mb-[15px]">
            <div className="flex w-[32%]  hover:bg-[whitesmoke] hover:duration-700 cursor-pointer  text-center p-[5px] rounded-xl">
              <h1 className="text-[20px] text-[gray] text-center font-sans">
                <span className="text-[20px] font-[700] text-[black] pr-[5px] pl-[10px]">
                  {data?.postCount}
                </span>
                posts
              </h1>
            </div>
            <div
              onClick={() => handleOpenFollowerProfile()}
              className="w-[32%] flex  hover:bg-[whitesmoke] hover:duration-700 cursor-pointer  text-center p-[5px] rounded-xl pl-[10px]"
            >
              <h1 className="text-[20px] text-[gray] text-center font-sans ">
                <span className="text-[20px] font-[700] text-[black] pr-[5px]">
                  {data?.subscribersCount}
                </span>
                follower
              </h1>
            </div>
            <div
              onClick={() => handleOpenFollowingProfile()}
              className="w-[32%] flex  hover:bg-[whitesmoke] hover:duration-700 cursor-pointer   text-center p-[5px] rounded-xl pl-[10px]"
            >
              <h1 className="text-[20px] text-[gray] font-sans ml-[15px]">
                <span className="text-[20px] font-[700] text-[black] pr-[5px]">
                  {data?.subscriptionsCount}
                </span>
                following
              </h1>
            </div>
          </div>
          <div className="w-[70%] mt-[20px] mb-[15px]">
            <h1 className="text-[19px] font-[700]  text-[#323131] font-sans">
              {data?.fullName}
            </h1>
          </div>
        </div>
      </div>

      <div className="flex ml-[-100px] mt-[45px] mb-[20px] gap-[20px]">
        <div className="text-center">
          <img src={img8} alt="" />
          <p>NEw</p>
        </div>
      </div>

      <div className="ml-[-200px]">
        <TabContext value={value}>
          <Box
            sx={{
              borderBottom: 0,
              borderColor: "divider",
              width: "100%",
            }}
          >
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab
                icon={<ArticleIcon sx={{ width: "30px", height: "30px" }} />}
                sx={{
                  marginLeft: "250px",
                  fontSize: "16px",
                  fontWeight: "600",
                }}
                label="posts"
                value="1"
              />
              <Tab
                sx={{
                  fontSize: "16px",
                  fontWeight: "600",
                  marginLeft: "30px",
                }}
                icon={
                  <BookmarkBorderIcon
                    sx={{
                      width: "30px",
                      height: "30px",
                    }}
                  />
                }
                label="Saved"
                value="2"
              />
              <Tab
                sx={{
                  fontSize: "16px",
                  fontWeight: "600",
                  marginLeft: "30px",
                }}
                icon={
                  <PersonIcon
                    sx={{
                      width: "30px",
                      height: "30px",
                    }}
                  />
                }
                label="Tagged"
                value="3"
              />
            </TabList>
          </Box>
          <TabPanel sx={{ width: "800px" }} value="1">
            <div className="flex gap-[0.6%] items-center flex-wrap">
              {postUser?.map((elem) => {
                return (
                  <div
                    onClick={() => {
                      handleOpenPost(elem),
                        setIdx(el.postId),
                        dispatch(getPostById(elem.postId));
                    }}
                    className="w-[230px] mt-[10px] h-[230px] cursor-pointer m-auto bg-[whitesmoke] rounded-lg   "
                  >
                    {elem?.images?.map((image, index) => (
                      <img
                        className="w-[100%] h-[100%] rounded-md object-cover"
                        src={`${import.meta.env.VITE_APP_FILES_URL}/${
                          elem?.images[0]
                        }`}
                        alt=""
                      />
                    ))}
                  </div>
                );
              })}
            </div>
          </TabPanel>
          <TabPanel sx={{ width: "100%" }} value="2">
            <div>
              <div className="flex items-center justify-between">
                <h1 className="text-[20px] font-[500] text-[#3b3b3b]">
                  Only you can see what you've saved
                </h1>
                <Button sx={{ fontSize: "18px" }} variant="text">
                  <span className="text-[22px]">+</span> New collection
                </Button>
              </div>
              <div
                onClick={() => handleOpenPost()}
                className="flex gap-[0.6%] flex-wrap w-[600px] h-[500px] mt-[10px] overflow-auto"
              >
                {postUser?.map((elem) => {
                  return elem.postFavourite ? (
                    <div
                      onClick={() => handleOpenPost()}
                      className="w-[200px] mt-[0px] h-[300px] rounded-md"
                    >
                      {elem?.images?.map((image, index) => (
                        <img
                          className="w-[100%] h-[100%] rounded-md object-cover"
                          src={`${import.meta.env.VITE_APP_FILES_URL}/${
                            elem.images[0]
                          }`}
                          alt=""
                        />
                      ))}
                    </div>
                  ) : null;
                })}
              </div>
            </div>
          </TabPanel>
          <TabPanel sx={{ width: "800px" }} value="3">
            <div className="flex gap-[0.6%] items-center flex-wrap">
              {postUser?.map((elem) => {
                return (
                  <div
                    onClick={() => handleOpenModalProfile(elem)}
                    className="w-[230px] h-[230px] mt-[10px]   m-auto bg-[whitesmoke] rounded-md  "
                  >
                    {elem?.images?.map((image, index) => (
                      <img
                        className="w-[100%] h-[100%] rounded-md object-cover"
                        src={`${import.meta.env.VITE_APP_FILES_URL}/${
                          elem.images[0]
                        }`}
                        alt=""
                      />
                    ))}
                  </div>
                );
              })}
            </div>
          </TabPanel>
        </TabContext>

        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={menuProfile}
          onClose={handleCloseProfile}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={menuProfile}>
            <Box sx={style}>
              <div>
                <h1 className="p-[15px] font-[500] text-[19px] bg-[whitesmoke] hover:text-[white] mt-[10px] rounded-xl hover:bg-[#b1b0b0] hover:duration-500">
                  QR code
                </h1>
                <h1 className="p-[15px] font-[500] text-[19px] rounded-xl mt-[10px] hover:text-[white] bg-[whitesmoke] hover:bg-[#b1b0b0] hover:duration-500">
                  Notification
                </h1>
                <h1 className="p-[15px] font-[500] text-[19px] rounded-xl hover:text-[white] mt-[10px] bg-[whitesmoke] hover:bg-[#b1b0b0] hover:duration-500">
                  Settings and privacy
                </h1>
                <h1
                  onClick={() => logOut()}
                  className="p-[15px] font-[500] text-[19px] rounded-xl mt-[10px] bg-[whitesmoke] hover:bg-[#b1b0b0] hover:duration-500 text-red-500"
                >
                  Log out
                </h1>
              </div>
            </Box>
          </Fade>
        </Modal>

        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={followerProfile}
          onClose={handleCloseFollowerProfile}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={followerProfile}>
            <Box sx={styleFollower}>
              <div className="p-[0px]">
                <div className="flex justify-between items-center">
                  <h1 className="text-[19px] font-[500] text-[#424141]">
                    Followers
                  </h1>
                  <IconButton onClick={() => handleCloseFollowerProfile()}>
                    <CloseIcon />
                  </IconButton>
                </div>
                <div className="mt-[10px]">
                  <input
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                    placeholder="search..."
                    className="w-[100%] text-[gray] text-[20px] bg-[whitesmoke] h-[50px] rounded-xl outline-none pl-[10px]"
                    type="search"
                  />
                </div>
                <div>
                  <div>
                    {followingsUser
                      .filter((e) => {
                        return e.userShortInfo.userName
                          .toLowerCase()
                          .trim()
                          .includes(search);
                      })
                      .map((e) => {
                        console.log(e);
                        return (
                          <div className="flex p-[5px] rounded-xl mt-[5px] justify-between items-center bg-[whitesmoke]">
                            <div className="flex p-[5px] gap-[10px] items-center">
                              <img
                                className="w-[45px] h-[45px] rounded-full"
                                src={
                                  e.userShortInfo.userPhoto.length !== 0
                                    ? `${import.meta.env.VITE_APP_FILES_URL}/${
                                        e.userShortInfo.userPhoto
                                      }`
                                    : "https://tse4.mm.bing.net/th?id=OIP.jixXH_Els1MXBRmKFdMQPAHaHa&pid=Api&P=0&h=220"
                                }
                                alt=""
                              />
                              <div>
                                <h1 className="font-[600] text-[18px]">
                                  {e.userShortInfo.userName}
                                </h1>
                                <h1 className="font-[500] text-[16px] text-[#4a4848]">
                                  {e.userShortInfo.fullname}
                                </h1>
                              </div>
                            </div>
                            <div className="ml-[0px] mr-[10px]">
                              <button className="text-[18px] hover:bg-[#00d9ff] hover:text-[white] p-[5px] rounded-lg hover:duration-500 text-[blue]">
                                Follow
                              </button>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            </Box>
          </Fade>
        </Modal>

        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={followingProfile}
          onClose={handleCloseFollowingProfile}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={followingProfile}>
            <Box sx={styleFollowing}>
              <div>
                <div className="p-[0px]">
                  <div className="flex justify-between items-center">
                    <h1 className="text-[19px] font-[500] text-[#424141]">
                      Following
                    </h1>
                    <IconButton onClick={() => handleCloseFollowingProfile()}>
                      <CloseIcon />
                    </IconButton>
                  </div>
                  <div className="mt-[10px]">
                    <input
                      onChange={(e) => setSearch(e.target.value)}
                      value={search}
                      placeholder="search..."
                      className="w-[100%] text-[gray] text-[20px] bg-[whitesmoke] h-[50px] rounded-xl outline-none pl-[10px]"
                      type="search"
                    />
                  </div>
                  <div>
                    <div>
                      {followersUser
                        .filter((e) => {
                          return e.userShortInfo.userName
                            .toLowerCase()
                            .trim()
                            .includes(search);
                        })
                        .map((e) => {
                          console.log(e);
                          return (
                            <div className="flex p-[5px] rounded-xl mt-[5px] justify-between items-center bg-[whitesmoke]">
                              <div className="flex p-[5px] gap-[10px] items-center">
                                <img
                                  className="w-[45px] h-[45px] rounded-full"
                                  src={
                                    e.userShortInfo.userPhoto.length !== 0
                                      ? `${
                                          import.meta.env.VITE_APP_FILES_URL
                                        }/${e.userShortInfo.userPhoto}`
                                      : "https://tse4.mm.bing.net/th?id=OIP.jixXH_Els1MXBRmKFdMQPAHaHa&pid=Api&P=0&h=220"
                                  }
                                  alt=""
                                />
                                <div>
                                  <h1 className="font-[600] text-[18px]">
                                    {e.userShortInfo.userName}
                                  </h1>
                                  <h1 className="font-[500] text-[16px] text-[#4a4848]">
                                    {e.userShortInfo.fullname}
                                  </h1>
                                </div>
                              </div>
                              <div className="ml-[0px] mr-[10px]">
                                <button className="text-[18px] hover:bg-[#00d9ff] hover:text-[white] p-[5px] rounded-lg hover:duration-500 text-[blue]">
                                  Follow
                                </button>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              </div>
            </Box>
          </Fade>
        </Modal>

        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={editImageProfile}
          onClose={handleCloseEditImageProfile}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={editImageProfile}>
            <Box sx={styleImageEditProfile}>
              <div className="p-[10px]">
                <div className="w-[70%] m-[auto]">
                  <img className="w-[100%]" src={Logo} alt="" />
                </div>
                <div className="mt-[10px]">
                  <input
                    className="outline-none"
                    onChange={(e) => setImageEdit(e.target.value)}
                    type="file"
                  />
                </div>
                <div className=" h-[30vh] mt-[10px] rounded-md">
                  <img className="rounded-md" src={imageEdit} alt="" />
                </div>
                <button
                  onClick={() => handleClick()}
                  className="w-[150px] h-[50px] bg-[whitesmoke] rounded-xl"
                >
                  Submit
                </button>
              </div>
            </Box>
          </Fade>
        </Modal>
      </div>
    </div>
  );
};

export default UserProfile;
