import img8 from "../../assets/images/pic6.png";
import PropTypes from "prop-types"; 
import Logo from "../../assets/icons/Carousel.png";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import { Fragment, useEffect, useRef, useState } from "react";
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from "react-redux";
import { store } from "../../store/store";
import { GetPostByUser, getFollowings, getProfileById, putProfileImage } from "../../api/profile/profile";
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

const Profile = () => {
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState('paper');


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

  const [editImageProfile, setEditImageProfile] = useState(false)
  const handleOpenEditImageProfile = () => setEditImageProfile(true)
  const handleCloseEditImageProfile = () => setEditImageProfile(false)
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

  const dispatch = useDispatch()
  const [search, setSearch] = useState("");

  const [imageEdit, setImageEdit] = useState("");




  const [menuProfile, setMenuProfile] = useState(false);
  const handleOpenProfile = () => setMenuProfile(true);
  const handleCloseProfile = () => setMenuProfile(false);

  const userProfile = useSelector((store) => store.profile.userProfile)
  const postUser = useSelector((store) => store.profile.postUser);
  const followingsUser = useSelector((store) => store.profile.followingsUser);
  const followersUser = useSelector((store) => store.profile.followersUser);


  console.log(userProfile)



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




  useEffect(() => {
    dispatch(getProfileById(getToken().sid))
    dispatch(GetPostByUser(getToken().sid))
    dispatch(getFollowings(getToken().sid))
  }, [dispatch],
    getProfileById())



  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <div className="flex ml-[-100px] justify-between items-center">
        <div className="w-[40%] mt-[100px]">
          <img
            onClick={() => handleOpenEditImageProfile()}
            className="w-[170px] rounded-full cursor-pointer  h-[170px] object-cover"
            src={
              userProfile.image !== ""
                ? `${import.meta.env.VITE_APP_FILES_URL}${userProfile?.image}`
                : "data:image/jpeg;base64,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"
            }
            alt=""
          />
        </div>
        <div className="w-[70%] mt-[100px] ">
          <div className="flex  w-[98%]  items-center gap-[60px]">
            <div>
              <h1 className="text-[19px] font-[700] font-sans">
                {userProfile?.userName}
              </h1>
            </div>
            <div className="flex items-center gap-[20px] h-[50px]">
              <NavLink to="/basic/profile/editProfile">
                <button
                  onClick={() => {
                    getProfileById(getToken().sid);
                  }}
                  className="w-[120px]  text-[16px] h-[40px] bg-[whitesmoke] rounded-xl font-sans font-[700]"
                >
                  Edit profile
                </button>
              </NavLink>

              <button className="w-[120px] text-[16px] h-[40px] bg-[whitesmoke] rounded-xl font-sans font-[700]">
                View archive
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
                  {userProfile.postCount}
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
                  {userProfile.subscribersCount}
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
                  {userProfile.subscriptionsCount}
                </span>
                following
              </h1>
            </div>
          </div>
          <div className="w-[70%] mt-[20px] mb-[15px]">
            <h1 className="text-[19px] font-[700]  text-[#323131] font-sans">
              {userProfile.fullName}
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
                icon={<ArticleIcon sx={{ width: "40px", height: "40px" }} />}
                sx={{
                  marginLeft: "250px",
                  fontSize: "18px",
                  fontWeight: "600",
                }}
                label="posts"
                value="1"
              />
              <Tab
                sx={{
                  fontSize: "18px",
                  fontWeight: "600",
                  marginLeft: "30px",
                }}
                icon={
                  <BookmarkBorderIcon
                    sx={{
                      width: "37px",
                      height: "37px",
                    }}
                  />
                }
                label="Saved"
                value="2"
              />
              <Tab
                sx={{
                  fontSize: "18px",
                  fontWeight: "600",
                  marginLeft: "30px",
                }}
                icon={
                  <PersonIcon
                    sx={{
                      width: "37px",
                      height: "37px",
                    }}
                  />
                }
                label="Tagged"
                value="3"
              />
            </TabList>
          </Box>
          <TabPanel sx={{ width: "800px", marginLeft: "100px" }} value="1">
            <div className="flex gap-[0.6%] items-center flex-wrap">
              {postUser?.map((elem) => {
                return (
                  <div
                    onClick={() => {
                      handleOpenPost(elem),
                        setIdx(el.postId),
                        dispatch(getPostById(elem.postId));
                    }}
                    className="w-[200px] mt-[10px] h-[200px] cursor-pointer bg-[whitesmoke] rounded-lg   "
                  >
                    {elem.images.map((image, index) => (
                      <img
                        className="w-[100%] h-[100%] rounded-md object-cover"
                        src={`${import.meta.env.VITE_APP_FILES_URL}/${elem.images[0]
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
                      {elem.images.map((image, index) => (
                        <img
                          className="w-[100%] h-[100%] rounded-md object-cover"
                          src={`${import.meta.env.VITE_APP_FILES_URL}/${elem.images[0]
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
          <TabPanel sx={{ width: "800px", marginLeft:"100px" }} value="3">
            <div className="flex gap-[0.6%] items-center flex-wrap">
              {postUser?.map((elem) => {
                return (
                  <div
                    onClick={() => handleOpenModalProfile(elem)}
                    className="w-[200px] h-[200px] mt-[10px] bg-[whitesmoke] rounded-md  "
                  >
                    {elem.images.map((image, index) => (
                      <img
                        className="w-[100%] h-[100%] rounded-md object-cover"
                        src={`${import.meta.env.VITE_APP_FILES_URL}/${elem.images[0]
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
                                    ? `${import.meta.env.VITE_APP_FILES_URL}/${e.userShortInfo.userPhoto
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
                                      ? `${import.meta.env.VITE_APP_FILES_URL
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

export default Profile;



{/* <Box sx={{ width: "100%", mt: "50px", ml: "-50px" }}>
        <Box sx={{ borderTop: 1, borderColor: "divider", pl: "50px" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Item One" {...a11yProps(0)} />
            <Tab label="Item Two" {...a11yProps(1)} />
            <Tab label="Item Three" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <div className="text-center">
            <img className="m-auto" src={img9} alt="" />
            <h1 className="font-bold mt-[10px]">Share Photos</h1>
            <p className="text-[gray] text-[15px] mb-[15px]">
              When you share photos, they will appear on your profile{" "}
            </p>
            <h1 className="font-bold text-[#3B82F6]">Share tou first photo</h1>
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <div className="text-center">
            <img className="m-auto" src={img10} alt="" />
            <h1 className="font-bold mt-[10px]">You saves</h1>
            <p className="text-[gray] text-[15px] mb-[15px]">
              Only you can see what you've saved{" "}
            </p>
            <h1 className="font-bold text-[#3B82F6]">+ New collection</h1>
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <div className="text-center">
            <img className="m-auto" src={img11} alt="" />
            <h1 className="font-bold mt-[10px]">You have not tagged</h1>
            <p className="text-[gray] text-[15px] mb-[15px]">
              Here show the photos and videos in which you have been tagged{" "}
            </p>
          </div>
        </CustomTabPanel>
      </Box> */}