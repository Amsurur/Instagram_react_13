import React, { useEffect, useState } from "react";
import arrow from "../../assets/message/Vector.svg";
import avatar from "../../assets/message/avatar.png";
import messageicon from "../../assets/message/free-icon-messenger-1384074 1.svg";
import {
  AppBar,
  Box,
  Button,
  Divider,
  FormControlLabel,
  List,
  ListItemButton,
  ListItemText,
  Menu,
  Modal,
  Slide,
  Switch,
  Toolbar,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ringtoneSound from "./r.mp3";

import "./style.css";
import {
  addchat,
  chatData,
  deleteChat,
  deleteMessage,
  getData,
} from "../../api/Message/messageApi";
import { Data } from "../../api/Message/messageApi";
import { getToken } from "../../utils/token";
import CallIcon from "@mui/icons-material/Call";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import SendIcon from "@mui/icons-material/Send";
import SentimentSatisfiedAltOutlinedIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import MicNoneOutlinedIcon from "@mui/icons-material/MicNoneOutlined";
import { axiosRequest } from "../../utils/axiosRequest";
import { blue, green } from "@mui/material/colors";
import Webcam from "react-webcam";
import { AudioRecorder } from "react-audio-voice-recorder";
import { Link } from "react-router-dom";

const addAudioElement = (blob) => {
  const url = URL.createObjectURL(blob);
  const audio = document.createElement("audio");
  audio.src = url;
  audio.controls = true;
  document.body.appendChild(audio);
};

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  borderRadius: "12px",
  boxShadow: 24,
  display: "flex",
  flexDirection: "column",
};

const style1 = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 250,
  bgcolor: "white",
  borderRadius: "5px",
  boxShadow: 10,
  p: 4,
  border: "none",
};
const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const Transition2 = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Message = () => {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(null);
  const [chathiden, setChatHiden] = useState(false);
  const [message1, setMessage1] = useState("");
  const [messageidx, setMessageidx] = useState(null);
  const [chatIdx, setChatIdx] = useState(null);
  const [chatIdx2, setChatIdx2] = useState(null);
  const [open4, setOpen4] = useState(null);
  const [modal, setmodal] = useState(false);
  const [call, setCall] = useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open1, setOpen1] = useState(false);
  const [idx1, setidx1] = useState(null);
  const [name, setName] = useState(null);
  const [avatar1, setAvatar1] = useState(null);
  const [messageId, setMessageId] = useState(null);
  const [liked, setLiked] = useState(false);
  const [copied, setCopied] = useState(false);
  const [like, setLike] = useState([]);
  const [anchorEl, setAnchorEl] = useState(false);
  const [open12, setOpen12] = useState(false);
  const [open13, setOpen13] = useState(false);
  const [name2, setName2] = useState(false);
  const [audio, setAudio] = useState(null);
  const [a, setA] = useState("");
  const [iid, setIid] = useState("");

  let data = useSelector((state1) => state1.message.data);
  let chatdata = useSelector((state1) => state1.message.data1);
  let chattext = useSelector((state1) => state1.message.data2);
  let chattext2 = useSelector((state1) => state1.message.data3);

  const handleDoubleClick = () => {
    setLiked(!liked);
    setChatIdx2(e.messageId);
  };

  const handleClickOpen12 = () => {
    setOpen12(true);
    playAudio();
  };

  const handleClose12 = () => {
    setOpen12(false);
    stopAudio();
  };
  const handleClickOpen13 = () => {
    setOpen13(true);
    playAudio();
  };

  const handleClose13 = () => {
    setOpen13(false);
    stopAudio();
  };

  const playAudio = () => {
    const audioElement = new Audio(ringtoneSound);
    audioElement.loop = true;
    audioElement.play();
    setAudio(audioElement);
  };

  const stopAudio = () => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  };
  const open5 = Boolean(anchorEl);
  const handleClick5 = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose5 = () => {
    setAnchorEl(false);
  };

  const handleCopy = () => {
    const textToCopy = chatIdx;
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => console.error("Error copying text: ", err));
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3600);
  };

  let dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen1 = () => setOpen1(true);
  const handleOpen4 = () => setOpen4(true);
  const handleClose1 = () => setOpen1(false);
  const handleClose4 = () => setOpen4(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => {
    setOpen2(false);
  };

  async function sendMessage(e) {
    e.preventDefault();
    message1.trim();
    try {
      const obj = {
        chatId: idx1,
        messageText: message1,
      };
      const { data } = await axiosRequest.post(`Chat/send-message`, obj);

      dispatch(chatData(id));

      setMessage1("");
    } catch (error) {
      console.log(error);
    }
  }

  let ADHAM = getToken();
  console.log(ADHAM);
  useEffect(() => {
    dispatch(getData());
    dispatch(chatData(id));
    dispatch(Data());
  }, [id, dispatch]);
  const [minutesAgo, setMinutesAgo] = useState(0);

  useEffect(() => {
    if (chattext && chattext.length > 0) {
      const lastMessage = chattext[chattext.length - 1];
      const sentTime = new Date(lastMessage.sendMassageDate);
      const currentTime = new Date();
      const difference = currentTime.getTime() - sentTime.getTime();
      const minutes = Math.floor(difference / (1000 * 60));
      setMinutesAgo(minutes);
    }
  }, [chattext]);

  return (
    <div className="overflow-y-none">
      <div className="flex font-mono z-[10000]">
        <section className="ml-[5px] w-[25%]  px-[20px]  pt-[50px]  border-x-[2px] border-gray-300">
          <div className="flex justify-between  ">
            <p className="flex text-[20px] font-bold cursor-pointer">
              <span>{ADHAM.name}</span>
              <span className=" relative top-3 left-2">
                <img src={arrow} alt="" />
              </span>
            </p>

            <p className="pt-[5px] cursor-pointer" onClick={handleClickOpen}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                color="blue"
                fill="currentColor"
                class="bi bi-pencil-square"
                viewBox="0 0 16 16"
              >
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                <path
                  fill-rule="evenodd"
                  d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                />
              </svg>
            </p>
          </div>
          <div className="  mt-[10%]  py-[10px]">
            {chatdata?.map((e) => {
              console.log(a);
              console.log("f");
              return (
                <div
                  onClick={() => {
                    setId(e.chatId),
                      setChatHiden(true),
                      setidx1(e.chatId),
                      setName(e.receiveUser.userName),
                      setAvatar1(e.receiveUser.userPhoto);
                    setName2(e.receiveUser.fullname);
                    setIid(e.receiveUser.userId);
                  }}
                  className="hover:bg-gray-100  rounded-md pt-[5%] pl-[5%]  flex pb-5 cursor-pointer"
                  key={e.chatId}
                >
                  <div>
                    <img
                      src={
                        e.receiveUser.userPhoto === ""
                          ? avatar
                          : `${import.meta.env.VITE_APP_FILES_URL}${
                              e.receiveUser.userPhoto
                            }`
                      }
                      alt=""
                      className="rounded-full h-[45px] w-[45px]"
                    />
                  </div>
                  <div className="pl-[10px] ">
                    <p className="text-[16px]">{e.receiveUser.fullname}</p>
                    <p className="text-[14px] text-[gray]">
                      {e.receiveUser.userName}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
        <section className=" w-[75%] h-[100vh] overflow-y-none ">
          {!chathiden ? (
            <div className="h-[400px] p-[20px] mt-[25%]">
              <img
                src={messageicon}
                alt=""
                className="w-[200px] h-[200px] m-auto  py-2"
              />
              <p className="text-center font-medium text-[20px]">
                Your messages
              </p>
              <p className="text-center font-medium text-[16px] text-gray-400">
                Send private photos and messages to a friend or group
              </p>
              <p className="m-auto w-[200px] h-[50px] pt-[20px]">
                <Button
                  variant="contained"
                  size="large"
                  className="m-auto w-[200px] h-[50px]"
                  onClick={handleClickOpen}
                >
                  Send message
                </Button>
              </p>
            </div>
          ) : (
            <div className="overflow-y-none">
              <div className="w-[100%] border-b-2 border-b-gray-300 py-[15px]">
                <div className="w-[95%] m-auto ">
                  <div className="flex justify-between w-[100%] m-auto  ">
                    <div
                      className="flex items-center w-[80%] cursor-pointer"
                      onClick={() => setmodal(true)}
                    >
                      <img
                        src={
                          avatar1 === ""
                            ? avatar
                            : `${import.meta.env.VITE_APP_FILES_URL}${avatar1}`
                        }
                        alt=""
                        className="w-[50px] h-[50px] rounded-[50%]"
                      />
                      <div className="ml-[2%]">
                        <p className="text-[16px] font-[600]">{name}</p>

                        <p className="text-[16px] font-[600]"></p>
                        <p className="text-[#A7B1BE] text-[14px] font-mono">
                          {minutesAgo === 0 ? (
                            <p>Just now</p>
                          ) : (
                            <p>{minutesAgo} minute(s) ago</p>
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="w-[15%] flex justify-between items-center">
                      <CallIcon
                        onClick={handleClickOpen13}
                        className="cursor-pointer hover:bg-gray-100 rounded-full "
                      />
                      <VideocamOutlinedIcon
                        onClick={handleClickOpen12}
                        className="cursor-pointer hover:bg-gray-100 rounded-full "
                      />
                      <InfoOutlinedIcon
                        onClick={() => setmodal(true)}
                        className="cursor-pointer hover:bg-gray-100 rounded-full "
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="overflow-y-scroll h-[80vh]">
                {chattext?.map((e) => {
                  console.log(chattext);
                  if (e.userId == getToken().sid) {
                    return (
                      <div className="w-[100%] flex text-start justify-end items-center">
                        <p
                          onClick={() => {
                            handleOpen1(),
                              setMessageidx(e.messageId),
                              setidx1(e.chatId);
                            setChatIdx(e.messageText);
                          }}
                          className="cursor-pointer card1 font-[700] text-[#A7B1BE] mt-[1%] pr-[5px] rounded-[50px] text-[20px] mx-1  "
                        >
                          ...
                        </p>

                        <div
                          className={`cursor-pointer card bg-blue-500 text-end flex flex-wrap p-[8px] font-[600] mr-[1%] rounded-[10px_10px_0px_10px] gap-2 text-[16px] text-[white] mt-[2%]`}
                          onDoubleClick={() => {
                            setLike(like.length == 0 ? [e.messageId] : []);
                            handleDoubleClick();
                          }}
                        >
                          <p className=" flex   flex-row-reverse">
                            {e.messageText}
                            <span className=" -mr-[5%] relative top-6">
                              {like.map((likeId, index) => {
                                if (likeId === e.messageId) {
                                  return (
                                    <p className=" bg-gray-300 h-[20px] py-1  w-[30px] px-2 rounded-xl">
                                      <svg
                                        key={index}
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="14"
                                        height="14"
                                        color="red"
                                        fill="currentColor"
                                        className="bi bi-heart-fill"
                                        viewBox="0 0 16 16"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"
                                        />
                                      </svg>
                                    </p>
                                  );
                                } else {
                                  return null;
                                }
                              })}
                            </span>
                          </p>
                        </div>
                      </div>
                    );
                  } else {
                    return (
                      <div className="w-[95%] flex text-start items-center ml-[10px] ">
                        <img
                          src={
                            e.userPhoto === ""
                              ? avatar
                              : `${import.meta.env.VITE_APP_FILES_URL}${
                                  e.userPhoto
                                }`
                          }
                          alt=""
                          className="rounded-full h-[30px] w-[30px]"
                        />

                        <div
                          onDoubleClick={() => {
                            setLike(like.length == 0 ? [e.messageId] : []);
                            handleDoubleClick();
                          }}
                          className="card bg-[#eceff2] ml-[1%] text-end flex flex-wrap p-[8px] font-[600] rounded-[0px_10px_10px_10px] gap-2 text-[16px] text-[#475569] mt-[2%]"
                        >
                          <p className="flex">
                            {e.messageText}
                            <span className=" -ml-[5%] relative top-6">
                              {like.map((likeId, index) => {
                                if (likeId === e.messageId) {
                                  return (
                                    <p className=" bg-gray-300 h-[25px] py-1 border-white border-[3px]  w-[35px] px-2 rounded-xl">
                                      <svg
                                        key={index}
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="14"
                                        height="14"
                                        color="red"
                                        fill="currentColor"
                                        className="bi bi-heart-fill"
                                        viewBox="0 0 16 16"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"
                                        />
                                      </svg>
                                    </p>
                                  );
                                } else {
                                  return null;
                                }
                              })}
                            </span>
                          </p>
                        </div>
                        <p
                          onClick={() => {
                            handleOpen4(),
                              setMessageidx(e.messageId),
                              setidx1(e.chatId),
                              setChatIdx(e.messageText);
                          }}
                          className=" cursor-pointer card1 font-[700] text-[#A7B1BE] mt-[1%] pr-[5px] rounded-[50px] text-[20px] mx-1 "
                        >
                          ...
                        </p>
                        <div className="ml-[1%]"></div>
                      </div>
                    );
                  }
                })}
              </div>
              <div className="pt-3">
                <form
                  onSubmit={sendMessage}
                  className="w-[95%]   pl-[2%] flex items-center m-auto border-2  rounded-[50px]"
                >
                  <div className="flex gap-5 justify-between">
                    <SentimentSatisfiedAltOutlinedIcon
                      className="cursor-pointer hover:bg-gray-100 rounded-full "
                      onClick={handleClick5}
                      sx={{ paddingLeft: 0, fontSize: 40 }}
                    />
                    <React.StrictMode>
                      <AudioRecorder
                        className="pt-[10px]"
                        onRecordingComplete={addAudioElement}
                        audioTrackConstraints={{
                          noiseSuppression: true,
                          echoCancellation: true,
                        }}
                        downloadOnSavePress={true}
                        downloadFileExtension="webm"
                      />
                    </React.StrictMode>
                  </div>
                  <input
                    type="text"
                    className=" outline-none text-[16px] pl-[10px] py-3 mx-4 w-[80%]"
                    value={message1}
                    onChange={(event) => setMessage1(event.target.value)}
                    placeholder="Write a message..."
                  />

                  {message1.trim().length > 0 ? (
                    <div className="">
                      <button
                        type="submit"
                        onClick={(e) => sendMessage(e)}
                        className="text-[#15bdff] flex items-center ml-[15%] font-mono font-[700]"
                      >
                        Send
                        <SendIcon sx={{ paddingLeft: 1, fontSize: 30 }} />
                      </button>
                    </div>
                  ) : (
                    <div className="ml-[4%] w-[8%] flex justify-between"></div>
                  )}
                </form>
              </div>
            </div>
          )}
        </section>
      </div>

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          New message
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <div>
            <input
              type="search"
              // value={search}
              // onChange={(e) => setSearch(e.target.value)}
              onInput={(e) => dispatch(getData(e.target.value))}
              className="w-[500px] rounded-md text-[gray] px-[25px] py-[10px]  bg-gray-200"
              placeholder="Search..."
            />
            <div className=" mt-[20px] h-[15%]">
              {data?.map((e) => {
                return (
                  <div key={e.id} className="flex justify-between ">
                    <div className="flex pb-5">
                      <div>
                        <img
                          src={
                            e.avatar === ""
                              ? avatar
                              : `${import.meta.env.VITE_APP_FILES_URL}${
                                  e.avatar
                                }`
                          }
                          alt=""
                          className="rounded-full h-[45px] w-[45px]"
                        />
                      </div>
                      <div className="pl-[10px] ">
                        <p className="text-[16px]">{e.fullName}</p>
                        <p className="text-[14px] text-[gray]">{e.userName}</p>
                      </div>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        className="h-[15px] w-[15px] mt-3 rounded-full"
                        onChange={() => dispatch(addchat(e.id))}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            size="large"
            className="w-full"
            onClick={handleClose}
          >
            Create Chate
          </Button>
        </DialogActions>
      </BootstrapDialog>
      <Modal
        open={open4}
        onClose={handleClose4}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style1}>
          <div className="w-[100%]">
            <p className="  flex text-[18px] mt-[4%] pt-[5px] border-t">
              Send Message
              <p className=" -rotate-12">
                {" "}
                <SendIcon
                  sx={{
                    paddingLeft: 1,
                    fontSize: 30,
                    color: blue[300],
                  }}
                />
              </p>
            </p>
            <p className="  flex border-t text-[18px] mt-[4%] pt-[5px]">
              <button onClick={handleCopy}>Copy</button>
              {copied && (
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    color="green"
                    fill="currentColor"
                    class="bi bi-check"
                    viewBox="0 0 16 16"
                  >
                    <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z" />
                  </svg>
                </span>
              )}
            </p>
          </div>
        </Box>
      </Modal>
      <Modal
        open={open1}
        onClose={handleClose1}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style1}>
          <div className="w-[100%]">
            <p className="  flex text-[18px] mt-[4%] pt-[5px] border-t">
              Send Message
              <p className=" -rotate-12">
                {" "}
                <SendIcon
                  sx={{
                    paddingLeft: 1,
                    fontSize: 30,
                    color: blue[300],
                  }}
                />
              </p>
            </p>
            <p className="  flex border-t text-[18px] mt-[4%] pt-[5px]">
              <button onClick={handleCopy}>Copy</button>
              {copied && (
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    color="green"
                    height="24"
                    fill="currentColor"
                    class="bi bi-check"
                    viewBox="0 0 16 16"
                  >
                    <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z" />
                  </svg>
                </span>
              )}
            </p>
          </div>
          <div className="w-[100%]">
            <p
              onClick={() => {
                dispatch(
                  deleteMessage({
                    id: messageidx,
                    chatId: idx1,
                  })
                ),
                  handleClose1(false);
              }}
              className="text-red-500 cursor-pointer  flex text-[18px] mt-[4%] pt-[5px] border-t"
            >
              Delete Message
            </p>
          </div>
        </Box>
      </Modal>
      <Modal
        open={open2}
        onClose={handleClose2}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="text-center px-[40px] py-[25px]">
            <p className="text-[21px] mb-[5px]">Delete chat forever?</p>
          </div>
          <button
            onClick={() => {
              {
                setChatHiden(false), handleClose2(), dispatch(deleteChat(idx1));
              }
            }}
            className="py-[13px] border-t border-[#cecece] text-red-500 font-[600]"
          >
            Delete forever
          </button>
          <button
            onClick={handleClose2}
            className="py-[13px] border-t border-[#cecece]"
          >
            Not now
          </button>
        </Box>
      </Modal>
      <Dialog
        fullScreen
        open={open12}
        onClose={handleClose12}
        TransitionComponent={Transition}
        PaperProps={{ style: { backgroundColor: "rgba(0, 0, 0, 0.7)" } }}
      >
        <div>
          {" "}
          <img
            src={
              avatar1 === ""
                ? avatar
                : `${import.meta.env.VITE_APP_FILES_URL}${avatar1}`
            }
            alt=""
            className="w-[150px] m-auto mt-[10%] h-[150px] rounded-[50%]"
          />
          <p
            className="text-[28px] text-center text-white mb-[25%] font-[600]"
            style={{ letterSpacing: "3px" }}
          >
            {name2}
            <span
              style={{ letterSpacing: "0px" }}
              className=" block text-[14px] text-center ml-2 text-gray-300 font-[300]"
            >
              Вызов...
            </span>
          </p>
        </div>
        <div className="flex w-[15%] m-auto justify-between">
          <p className=" bg-gray-300 w-[50px] h-[50px]  p-[10px] rounded-full">
            <svg
              viewBox="0 0 36 36"
              width="32"
              height="32"
              fill="currentColor"
              class="x19dipnz x1lliihq x1k90msu x2h7rmj x1qfuztq"
            >
              <path d="M30 9a2 2 0 0 0-2-2H14a2 2 0 0 0-2 2v3a1 1 0 0 0 1 1h9a4 4 0 0 1 4 4v3a1 1 0 0 0 1 1h1a2 2 0 0 0 2-2V9z"></path>
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M6 17c0-1.105.948-2 2.118-2h13.764c1.17 0 2.118.895 2.118 2v10c0 1.105-.948 2-2.118 2H8.118C6.948 29 6 28.105 6 27V17zm12.283.295a1.013 1.013 0 0 1 1.426-.004c.39.391.38 1.028-.01 1.42l-3.114 3.112a.25.25 0 0 0 0 .354l3.113 3.113c.391.39.402 1.028.01 1.419-.39.39-1.034.387-1.425-.004l-3.113-3.113a.25.25 0 0 0-.353 0l-3.107 3.106c-.39.391-1.028.402-1.419.01a1.013 1.013 0 0 1 .004-1.425l3.107-3.106a.25.25 0 0 0 0-.354l-3.107-3.106a1.013 1.013 0 0 1-.004-1.426c.391-.39 1.028-.38 1.42.01l3.106 3.107a.25.25 0 0 0 .353 0l3.113-3.113z"
              ></path>
            </svg>
          </p>
          <p className=" bg-gray-300 w-[50px] h-[50px]  p-[10px] rounded-full">
            <svg
              viewBox="0 0 36 36"
              fill="currentColor"
              width="32"
              height="32"
              class="x19dipnz x1lliihq x1k90msu x2h7rmj x1qfuztq"
            >
              <path d="M4.366 29.135a1.25 1.25 0 0 1-.043-1.723l19.59-19.589a1.25 1.25 0 0 1 1.722 1.81l-2.196 2.197A1.5 1.5 0 0 0 23 12.89v9.61a4 4 0 0 1-4 4H9.39a1.5 1.5 0 0 0-1.06.44l-2.196 2.195a1.25 1.25 0 0 1-1.768 0zM16.89 9.5a.75.75 0 0 1 .53 1.28L6.28 21.92A.75.75 0 0 1 5 21.39V13.5a4 4 0 0 1 4-4h7.89zM25.829 21.532l3.723 1.861A1 1 0 0 0 31 22.5V13.5a1 1 0 0 0-1.448-.894l-3.723 1.861A1.5 1.5 0 0 0 25 15.81v4.38a1.5 1.5 0 0 0 .829 1.342z"></path>
            </svg>
          </p>
          <p className=" bg-gray-300 w-[50px] h-[50px]  p-2 rounded-full">
            <svg
              color="white"
              class="x19dipnz x1lliihq x1k90msu x2h7rmj x1qfuztq"
              viewBox="6 6 36 36"
            >
              <path
                class="x1labep9 x19991ni x9lcvmn"
                d="M20 34h8a1 1 0 0 1 0 2h-8a1 1 0 0 1 0-2m4-5.5a5 5 0 0 1-5-5V17a5 5 0 0 1 10 0v6.5a5 5 0 0 1-5 5m0 4a9 9 0 0 1-9-9 1 1 0 0 1 2 0 7 7 0 1 0 14 0 1 1 0 0 1 2 0 9 9 0 0 1-9 9"
                fill="url(#gradientFill)"
              ></path>
              <defs>
                <linearGradient
                  id="gradientFill"
                  x1="0"
                  x2="0"
                  y1="0"
                  y2="100%"
                >
                  <stop offset="100%" stop-color="var(--always-white)"></stop>
                  <stop offset="0%"></stop>
                </linearGradient>
              </defs>
            </svg>
          </p>
          <p
            onClick={handleClose12}
            className=" bg-red-500 w-[50px] h-[50px]  p-2 rounded-full"
          >
            <svg
              viewBox="0 0 36 36"
              fill="currentColor"
              width="32"
              height="32"
              color="white"
              class="x19dipnz x1lliihq x1k90msu x2h7rmj x1qfuztq"
            >
              <path d="M4.865 18.073c-.522 1.043-.396 2.26-.146 3.4a2.12 2.12 0 0 0 1.547 1.602c.403.099.812.175 1.234.175 1.276 0 2.505-.2 3.659-.568.642-.205 1.085-.775 1.206-1.438l.472-2.599a.488.488 0 0 1 .28-.36A11.959 11.959 0 0 1 18 17.25c1.739 0 3.392.37 4.883 1.035.148.066.251.202.28.36l.472 2.599c.12.663.564 1.233 1.206 1.438 1.154.369 2.383.568 3.66.568.421 0 .83-.077 1.233-.175a2.12 2.12 0 0 0 1.547-1.601c.25-1.14.377-2.358-.146-3.401-1.722-3.44-7.06-5.323-13.135-5.323S6.587 14.633 4.865 18.073z"></path>
            </svg>
          </p>
        </div>

        <Webcam
          mirrored={true}
          height={350}
          width={350}
          className=" absolute right-[10px] rounded-xl bottom-[10px]"
        />
        <ArrowForwardIosIcon className="absolute text-slate-300  right-[19%] rounded-xl bottom-[12%]" />
      </Dialog>
      <Dialog
        fullScreen
        open={open13}
        onClose={handleClose13}
        TransitionComponent={Transition2}
        PaperProps={{ style: { backgroundColor: "rgba(0, 0, 0, 0.7)" } }}
      >
        <div>
          {" "}
          <img
            src={
              avatar1 === ""
                ? avatar
                : `${import.meta.env.VITE_APP_FILES_URL}${avatar1}`
            }
            alt=""
            className="w-[150px] m-auto mt-[10%] h-[150px] rounded-[50%]"
          />
          <p
            className="text-[28px] text-center text-white mb-[25%] font-[600]"
            style={{ letterSpacing: "3px" }}
          >
            {name2}
            <span
              style={{ letterSpacing: "0px" }}
              className=" block text-[14px] text-center ml-2 text-gray-300 font-[300]"
            >
              Вызов...
            </span>
          </p>
        </div>
        <div className="flex w-[15%] m-auto justify-between">
          <p className=" bg-gray-300 w-[50px] h-[50px]  p-[10px] rounded-full">
            <svg
              viewBox="0 0 36 36"
              width="32"
              height="32"
              fill="currentColor"
              class="x19dipnz x1lliihq x1k90msu x2h7rmj x1qfuztq"
            >
              <path d="M30 9a2 2 0 0 0-2-2H14a2 2 0 0 0-2 2v3a1 1 0 0 0 1 1h9a4 4 0 0 1 4 4v3a1 1 0 0 0 1 1h1a2 2 0 0 0 2-2V9z"></path>
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M6 17c0-1.105.948-2 2.118-2h13.764c1.17 0 2.118.895 2.118 2v10c0 1.105-.948 2-2.118 2H8.118C6.948 29 6 28.105 6 27V17zm12.283.295a1.013 1.013 0 0 1 1.426-.004c.39.391.38 1.028-.01 1.42l-3.114 3.112a.25.25 0 0 0 0 .354l3.113 3.113c.391.39.402 1.028.01 1.419-.39.39-1.034.387-1.425-.004l-3.113-3.113a.25.25 0 0 0-.353 0l-3.107 3.106c-.39.391-1.028.402-1.419.01a1.013 1.013 0 0 1 .004-1.425l3.107-3.106a.25.25 0 0 0 0-.354l-3.107-3.106a1.013 1.013 0 0 1-.004-1.426c.391-.39 1.028-.38 1.42.01l3.106 3.107a.25.25 0 0 0 .353 0l3.113-3.113z"
              ></path>
            </svg>
          </p>
          <p className=" bg-gray-300 w-[50px] h-[50px]  p-[10px] rounded-full">
            <svg
              viewBox="0 0 36 36"
              fill="currentColor"
              width="32"
              height="32"
              class="x19dipnz x1lliihq x1k90msu x2h7rmj x1qfuztq"
            >
              <path d="M4.366 29.135a1.25 1.25 0 0 1-.043-1.723l19.59-19.589a1.25 1.25 0 0 1 1.722 1.81l-2.196 2.197A1.5 1.5 0 0 0 23 12.89v9.61a4 4 0 0 1-4 4H9.39a1.5 1.5 0 0 0-1.06.44l-2.196 2.195a1.25 1.25 0 0 1-1.768 0zM16.89 9.5a.75.75 0 0 1 .53 1.28L6.28 21.92A.75.75 0 0 1 5 21.39V13.5a4 4 0 0 1 4-4h7.89zM25.829 21.532l3.723 1.861A1 1 0 0 0 31 22.5V13.5a1 1 0 0 0-1.448-.894l-3.723 1.861A1.5 1.5 0 0 0 25 15.81v4.38a1.5 1.5 0 0 0 .829 1.342z"></path>
            </svg>
          </p>
          <p className=" bg-gray-300 w-[50px] h-[50px]  p-2 rounded-full">
            <svg
              color="white"
              class="x19dipnz x1lliihq x1k90msu x2h7rmj x1qfuztq"
              viewBox="6 6 36 36"
            >
              <path
                class="x1labep9 x19991ni x9lcvmn"
                d="M20 34h8a1 1 0 0 1 0 2h-8a1 1 0 0 1 0-2m4-5.5a5 5 0 0 1-5-5V17a5 5 0 0 1 10 0v6.5a5 5 0 0 1-5 5m0 4a9 9 0 0 1-9-9 1 1 0 0 1 2 0 7 7 0 1 0 14 0 1 1 0 0 1 2 0 9 9 0 0 1-9 9"
                fill="url(#gradientFill)"
              ></path>
              <defs>
                <linearGradient
                  id="gradientFill"
                  x1="0"
                  x2="0"
                  y1="0"
                  y2="100%"
                >
                  <stop offset="100%" stop-color="var(--always-white)"></stop>
                  <stop offset="0%"></stop>
                </linearGradient>
              </defs>
            </svg>
          </p>
          <p
            onClick={handleClose13}
            className=" bg-red-500 w-[50px] h-[50px]  p-2 rounded-full"
          >
            <svg
              viewBox="0 0 36 36"
              fill="currentColor"
              width="32"
              height="32"
              color="white"
              class="x19dipnz x1lliihq x1k90msu x2h7rmj x1qfuztq"
            >
              <path d="M4.865 18.073c-.522 1.043-.396 2.26-.146 3.4a2.12 2.12 0 0 0 1.547 1.602c.403.099.812.175 1.234.175 1.276 0 2.505-.2 3.659-.568.642-.205 1.085-.775 1.206-1.438l.472-2.599a.488.488 0 0 1 .28-.36A11.959 11.959 0 0 1 18 17.25c1.739 0 3.392.37 4.883 1.035.148.066.251.202.28.36l.472 2.599c.12.663.564 1.233 1.206 1.438 1.154.369 2.383.568 3.66.568.421 0 .83-.077 1.233-.175a2.12 2.12 0 0 0 1.547-1.601c.25-1.14.377-2.358-.146-3.401-1.722-3.44-7.06-5.323-13.135-5.323S6.587 14.633 4.865 18.073z"></path>
            </svg>
          </p>
        </div>
      </Dialog>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open5}
        onClose={handleClose5}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <div className="w-[300px] h-[100px] ">
          <div className=" h-[30px] flex">
            <p
              onClick={() => setMessage1(message1 + "😂")}
              className="w-[30px] h-[30px] hover:bg-[#80808029] cursor-pointer flex items-center justify-center rounded"
            >
              😂
            </p>
            <p
              onClick={() => setMessage1(message1 + "😳")}
              className="w-[30px] h-[30px] hover:bg-[#80808029] cursor-pointer flex items-center justify-center rounded"
            >
              😳
            </p>
            <p
              onClick={() => setMessage1(message1 + "😒")}
              className="w-[30px] h-[30px] hover:bg-[#80808029] cursor-pointer flex items-center justify-center rounded"
            >
              😒
            </p>
            <p
              onClick={() => setMessage1(message1 + "😔")}
              className="w-[30px] h-[30px] hover:bg-[#80808029] cursor-pointer flex items-center justify-center rounded"
            >
              😔
            </p>
            <p
              onClick={() => setMessage1(message1 + "😃")}
              className="w-[30px] h-[30px] hover:bg-[#80808029] cursor-pointer flex items-center justify-center rounded"
            >
              😃
            </p>
            <p
              onClick={() => setMessage1(message1 + "😡")}
              className="w-[30px] h-[30px] hover:bg-[#80808029] cursor-pointer flex items-center justify-center rounded"
            >
              😡
            </p>
            <p
              onClick={() => setMessage1(message1 + "😏")}
              className="w-[30px] h-[30px] hover:bg-[#80808029] cursor-pointer flex items-center justify-center rounded"
            >
              😏
            </p>
            <p
              onClick={() => setMessage1(message1 + "🙈")}
              className="w-[30px] h-[30px] hover:bg-[#80808029] cursor-pointer flex items-center justify-center rounded"
            >
              🙈
            </p>
            <p
              onClick={() => setMessage1(message1 + "😘")}
              className="w-[30px] h-[30px] hover:bg-[#80808029] cursor-pointer flex items-center justify-center rounded"
            >
              😘
            </p>
            <p
              onClick={() => setMessage1(message1 + "👍")}
              className="w-[30px] h-[30px] hover:bg-[#80808029] cursor-pointer flex items-center justify-center rounded"
            >
              👍
            </p>
          </div>
          <div className="h-[30px] flex">
            <p
              onClick={() => setMessage1(message1 + "😞")}
              className="w-[30px] h-[30px] hover:bg-[#80808029] cursor-pointer flex items-center justify-center rounded"
            >
              😞
            </p>
            <p
              onClick={() => setMessage1(message1 + "😱")}
              className="w-[30px] h-[30px] hover:bg-[#80808029] cursor-pointer flex items-center justify-center rounded"
            >
              😱
            </p>
            <p
              onClick={() => setMessage1(message1 + "😝")}
              className="w-[30px] h-[30px] hover:bg-[#80808029] cursor-pointer flex items-center justify-center rounded"
            >
              😝
            </p>
            <p
              onClick={() => setMessage1(message1 + "😢")}
              className="w-[30px] h-[30px] hover:bg-[#80808029] cursor-pointer flex items-center justify-center rounded"
            >
              😢
            </p>
            <p
              onClick={() => setMessage1(message1 + "😉")}
              className="w-[30px] h-[30px] hover:bg-[#80808029] cursor-pointer flex items-center justify-center rounded"
            >
              😉
            </p>
            <p
              onClick={() => setMessage1(message1 + "❤")}
              className="w-[30px] h-[30px] hover:bg-[#80808029] cursor-pointer flex items-center justify-center rounded"
            >
              ❤
            </p>
            <p
              onClick={() => setMessage1(message1 + "😍")}
              className="w-[30px] h-[30px] hover:bg-[#80808029] cursor-pointer flex items-center justify-center rounded"
            >
              😍
            </p>
            <p
              onClick={() => setMessage1(message1 + "😊")}
              className="w-[30px] h-[30px] hover:bg-[#80808029] cursor-pointer flex items-center justify-center rounded"
            >
              😊
            </p>
            <p
              onClick={() => setMessage1(message1 + "😁")}
              className="w-[30px] h-[30px] hover:bg-[#80808029] cursor-pointer flex items-center justify-center rounded"
            >
              😁
            </p>
            <p
              onClick={() => setMessage1(message1 + "😄")}
              className="w-[30px] h-[30px] hover:bg-[#80808029] cursor-pointer flex items-center justify-center rounded"
            >
              😄
            </p>
          </div>
          <div className="h-[30px] flex">
            <p
              onClick={() => setMessage1(message1 + "💕")}
              className="w-[30px] h-[30px] hover:bg-[#80808029] cursor-pointer flex items-center justify-center rounded"
            >
              💕
            </p>
            <p
              onClick={() => setMessage1(message1 + "🤦‍♂️")}
              className="w-[30px] h-[30px] hover:bg-[#80808029] cursor-pointer flex items-center justify-center rounded"
            >
              🤦‍♂️
            </p>
            <p
              onClick={() => setMessage1(message1 + "🥶")}
              className="w-[30px] h-[30px] hover:bg-[#80808029] cursor-pointer flex items-center justify-center rounded"
            >
              🥶
            </p>
            <p
              onClick={() => setMessage1(message1 + "🤑")}
              className="w-[30px] h-[30px] hover:bg-[#80808029] cursor-pointer flex items-center justify-center rounded"
            >
              🤑
            </p>
            <p
              onClick={() => setMessage1(message1 + "🤯")}
              className="w-[30px] h-[30px] hover:bg-[#80808029] cursor-pointer flex items-center justify-center rounded"
            >
              🤯
            </p>
            <p
              onClick={() => setMessage1(message1 + "🤭")}
              className="w-[30px] h-[30px] hover:bg-[#80808029] cursor-pointer flex items-center justify-center rounded"
            >
              🤭
            </p>
            <p
              onClick={() => setMessage1(message1 + "😴")}
              className="w-[30px] h-[30px] hover:bg-[#80808029] cursor-pointer flex items-center justify-center rounded"
            >
              😴
            </p>
            <p
              onClick={() => setMessage1(message1 + "🤒")}
              className="w-[30px] h-[30px] hover:bg-[#80808029] cursor-pointer flex items-center justify-center rounded"
            >
              🤒
            </p>
            <p
              onClick={() => setMessage1(message1 + "🐊")}
              className="w-[30px] h-[30px] hover:bg-[#80808029] cursor-pointer flex items-center justify-center rounded"
            >
              🐊
            </p>
            <p
              onClick={() => setMessage1(message1 + "🙄")}
              className="w-[30px] h-[30px] hover:bg-[#80808029] cursor-pointer flex items-center justify-center rounded"
            >
              🙄
            </p>
          </div>
        </div>
      </Menu>

      {modal ? (
        <div className=" overflow-hidden   font-mono">
          <div className="open h-[100%] w-[25%] left-[75%] absolute top-0 border shadow-gray-400 shadow-xl bg-transparent backdrop-blur-xl bprder-black">
            <div className="w-[90%] mt-[6%] m-auto flex justify-between">
              <p className="font-[500] text-[22px]  ">Information</p>
              <p className=" cursor-pointer" onClick={() => setmodal(false)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  class="bi bi-x-lg"
                  viewBox="0 0 16 16"
                >
                  <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                </svg>
              </p>
            </div>
            <div className="w-[100%] pb-[20px] border-b">
              <div className="w-[90%] m-auto flex mt-[12%]  justify-between">
                <p className=" w-[80%] text-[18px] text-gray-400 ">
                  Turn off message notifications
                </p>
                <FormControlLabel
                  control={<IOSSwitch sx={{ m: 0 }} defaultChecked />}
                />
              </div>
            </div>
            <div className="w-[90%] m-auto mt-[7%]">
              <p className="font-[700] text-[20px] font-mono mb-[2%] ">Users</p>
              <div className="flex items-center w-[80%] mt-[5%]">
                <div className="ml-[2%]">
                  <div className=" items-center w-[100%]">
                    <img
                      src={
                        avatar1 === ""
                          ? avatar
                          : `${import.meta.env.VITE_APP_FILES_URL}${avatar1}`
                      }
                      alt=""
                      className="w-[80px] h-[80px] rounded-[50%]"
                    />
                    <div className="ml-[2%]">
                      <Link to={`/basic/user/${iid}`}>
                        <p className="text-[24px] font-[600] pt-[20px]">
                          {name}
                        </p>
                      </Link>

                      <p className="text-[16px] font-[600]"></p>
                    </div>
                  </div>

                  <p className="text-[#A7B1BE] pt-[20px] text-[14px] font-mono">
                    Active one minute ago
                  </p>
                </div>
              </div>
            </div>

            <div className="w-[100%]  border-t pt-[5px] mt-[44%]">
              <div className="w-[90%] m-auto ">
                <button className="text-red-500  block text-[20px] mt-[5%]">
                  Punishment
                </button>
                <button className="text-red-500  block text-[20px] mt-[5%]">
                  Block User
                </button>
                <button
                  className="text-red-500  block text-[20px] mt-[5%]"
                  onClick={() => {
                    setmodal(false), handleOpen2();
                  }}
                >
                  Delete Chat
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Message;
