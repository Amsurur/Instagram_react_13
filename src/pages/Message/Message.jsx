import React, { useEffect, useState } from "react";
import arrow from "../../assets/message/Vector.svg";
import avatar from "../../assets/message/avatar.png";
import messageicon from "../../assets/message/free-icon-messenger-1384074 1.svg";
import { Box, Button, FormControlLabel, Modal, Switch } from "@mui/material";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import SettingsBackupRestoreIcon from "@mui/icons-material/SettingsBackupRestore";

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

const Message = () => {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(null);
  const [chathiden, setChatHiden] = useState(false);
  const [message1, setMessage1] = useState("");
  const [messageidx, setMessageidx] = useState(null);
  const [chatIdx, setChatIdx] = useState(null);
  const [chatIdx2, setChatIdx2] = useState(null);
  const [modal, setmodal] = useState(false);
  const [call, setCall] = useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open1, setOpen1] = useState(false);
  const [idx1, setidx1] = useState(null);
  const [name, setName] = useState(null);
  const [avatar1, setAvatar1] = useState(null);
  const [messageId, setMessageId] = useState(null);

  let data = useSelector((state) => state.message.data);
  let chatdata = useSelector((state) => state.message.data1);
  let chattext = useSelector((state) => state.message.data2);

  let a = false;

  let dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);
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
                color="rgba(37, 99, 235, 1)"
                fill="currentColor"
                class="bi bi-pencil-square"
                viewBox="0 0 16 16"
              >
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                <path
                  fill-rule="evenodd"
                  d="M1 13.5A1.5 1.5 0 0 0 2.5 15p1a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                />
              </svg>
            </p>
          </div>
          <div className="  mt-[10%]  py-[10px]">
            {chatdata?.map((e) => {
              console.log(chatdata);
              return (
                <div
                  onClick={() => {
                    setId(e.chatId),
                      setChatHiden(true),
                      setidx1(e.chatId),
                      setName(e.receiveUser.userName),
                      setAvatar1(e.receiveUser.userPhoto);
                  }}
                  className="flex pb-5 cursor-pointer"
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
                    <div className="flex items-center w-[80%]">
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
                          Active minute ago
                        </p>
                      </div>
                    </div>
                    <div className="w-[15%] flex justify-between items-center">
                      <CallIcon onClick={() => setCall(true)} />
                      <VideocamOutlinedIcon onClick={() => setCall(true)} />
                      <InfoOutlinedIcon onClick={() => setmodal(true)} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="overflow-y-scroll h-[750px]">
                {chattext?.map((e) => {
                  console.log(chattext, e.messageId);
                  if (e.userId == getToken().sid) {
                    return (
                      <div className="w-[100%] flex text-start justify-end items-center">
                        <p
                          onClick={() => {
                            handleOpen1(),
                              setMessageidx(e.messageId),
                              setidx1(e.chatId);
                          }}
                          className="card1 font-[700] text-[#A7B1BE] mt-[5px] pr-[5px] rounded-[50px] text-[20px] "
                        >
                          ...
                        </p>
                        <div className=""></div>
                        <div className="card bg-blue-500 text-end flex flex-wrap p-[8px] font-[600] mr-[1%] rounded-[10px_10px_0px_10px] gap-2 text-[16px] text-[white] mt-[2%]">
                          {e.messageText}
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

                        <div className="card bg-[#F8FAFC] ml-[1%] text-end flex flex-wrap p-[8px] font-[600] rounded-[0px_10px_10px_10px] gap-2 text-[16px] text-[#475569] mt-[2%]">
                          {e.messageText}
                        </div>
                        <p
                          onClick={() => {
                            handleOpen1(),
                              setMessageidx(e.messageId),
                              setidx1(e.chatId);
                          }}
                          className="card1 font-[700] text-[#A7B1BE] mt-[5px] pr-[5px] rounded-[50px] text-[20px] "
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
                  <SentimentSatisfiedAltOutlinedIcon
                    sx={{ paddingLeft: 1, fontSize: 35 }}
                  />
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
                        Send a message
                        <SendIcon sx={{ paddingLeft: 1, fontSize: 30 }} />
                      </button>
                    </div>
                  ) : (
                    <div className="ml-[4%]">
                      <MicNoneOutlinedIcon sx={{ fontSize: 27 }} />
                      <InsertPhotoOutlinedIcon
                        sx={{ paddingLeft: 1, fontSize: 35 }}
                      />
                    </div>
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
              Copy{" "}
              <p>
                <ContentCopyIcon
                  sx={{
                    marginLeft: 1,
                    fontSize: 25,
                    color: green[300],
                  }}
                />
              </p>
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
              className="text-red-500  flex text-[18px] mt-[4%] pt-[5px] border-t"
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
            {/* <p className="text-[grey]">
            You will not be able to undo this action. If you clear history
              search, the accounts you searched for may still
              appear in recommended results.
            </p> */}
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
              <p className="font-[700] text-[18px] font-mono mb-[2%] ">Users</p>
              <div className="flex items-center w-[80%] mt-[5%]">
                <div className="ml-[2%]">
                  <p className="text-[16px] font-[600]"></p>
                  <p className="text-[#A7B1BE] text-[14px] font-mono">Active</p>
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
