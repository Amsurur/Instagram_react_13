import React, { useEffect, useState } from "react";
import arrow from "../../assets/message/Vector.svg";
import avatar from "../../assets/message/avatar.png";
import messageicon from "../../assets/message/free-icon-messenger-1384074 1.svg";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { addchat, chatData, getData } from "../../api/Message/messageApi";
import { Data } from "../../api/Message/messageApi";
import { getToken } from "../../utils/token";
import CallIcon from "@mui/icons-material/Call";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import SendIcon from "@mui/icons-material/Send";
import SentimentSatisfiedAltOutlinedIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import MicNoneOutlinedIcon from "@mui/icons-material/MicNoneOutlined";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const Message = () => {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(null);
  const [chathiden, setChatHiden] = useState(false);
  let [search, setSearch] = useState("");
  const [message1, setMessage1] = useState("");
  const [chatIdx, setChatIdx] = useState(null);
  const [chatIdx1, setChatIdx1] = useState(null);
  const [chatIdx2, setChatIdx2] = useState(null);

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
  async function sendMessage(e) {
    e.preventDefault();
    if (message1.trim().length > 0) {
      try {
        console.log(chatIdx);
        // console.log(text);
        const obj = {
          chatId: chatIdx,
          messageText: message1,
        };
        const { data } = await axiosRequest.post(`Chat/send-message`, obj);
        // getMessage(chatIdx);
        dispatch(getMessage(chatIdx2));
        setMessage1("");
      } catch (error) {
        console.log(error);
      }
    } else {
      // getMessage(chatIdx);
      alert("Please enter your message");
    }
  }

  useEffect(() => {
    dispatch(getData());
    dispatch(chatData(id));
    dispatch(Data());
  }, [id, dispatch]);
  console.log(chattext);

  return (
    <div>
      <div className="flex font-mono z-[10000]">
        <section className="ml-[5px] w-[25%]  px-[20px]  pt-[50px]  border-x-[2px] border-gray-300">
          <div className="flex justify-between  ">
            <p className="flex text-[20px] font-bold cursor-pointer">
              <span>Adham</span>
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
                  d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                />
              </svg>
            </p>
          </div>
          <div className="  mt-[10%]  py-[10px]">
            {chatdata?.map((e) => {
              return (
                <div
                  onClick={() => {
                    setId(e.chatId), setChatHiden(true);
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
        <section className=" w-[75%] h-[100vh] overflow-y-scroll">
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
            <div>
              <div className="w-[100%] border-b-2 border-b-gray-300 py-[15px]">
                <div className="w-[95%] m-auto ">
                  <div className="flex justify-between w-[100%] m-auto  ">
                    <div className="flex items-center w-[80%]">
                      <img
                        src={avatar}
                        alt=""
                        className="w-[50px] h-[50px] rounded-[50%]"
                      />
                      <div className="ml-[2%]">
                        <h1 className="text-[16px] font-[600]">Adham</h1>
                        {console.log(chattext)}
                        <h1 className="text-[16px] font-[600]"></h1>
                        <p className="text-[#A7B1BE] text-[14px] font-mono">
                          Active
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
              {chattext?.map((e) => {
                if (e.userId == getToken().sid) {
                  return (
                    <div className="w-[100%] flex text-start justify-end items-center">
                      <div className=""></div>
                      <div className="card bg-blue-500 text-end flex flex-wrap p-[8px] font-[600] mr-[1%] rounded-[10px_10px_0px_10px] gap-2 text-[16px] text-[white] mt-[2%]">
                        {e.messageText}
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div className="w-[100%] flex text-start items-center ml-[10px] ">
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
                      <div className="ml-[1%]"></div>
                    </div>
                  );
                }
              })}
              <form
                onSubmit={sendMessage}
                className="w-[70%] fixed bottom-[10%] flex items-center m-auto h-[45px] border-2 border-gray-300  rounded-[10px]"
              >
                <SentimentSatisfiedAltOutlinedIcon
                  sx={{ paddingLeft: 1, fontSize: 35 }}
                />
                <input
                  type="text"
                  className=" outline-none pl-[10px] py-2 mx-4 w-[80%]"
                  value={message1}
                  onChange={(event) => setMessage1(event.target.value)}
                  placeholder="Write a message..."
                />

                {message1.trim().length > 0 ? (
                  <div className="">
                    <button
                      type="submit"
                      onClick={() => sendMessage()}
                      className="text-[#15bdff] flex items-center ml-[15%] font-mono font-[700]"
                    >
                      Opublikovat{" "}
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
    </div>
  );
};

export default Message;
