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

  useEffect(() => {
    dispatch(getData());
    dispatch(chatData(id));
    dispatch(Data());
  }, [id, dispatch]);
  console.log(chattext);

  return (
    <div>
      <div className="flex font-mono z-[10000]">
        <section className="ml-[5px] w-[25%]  px-[20px]  pt-[50px]  border-x-[1px] border-blue-300">
          <div className="flex justify-between ">
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
          <div className="  mt-[20px]  py-[10px]">
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
                    <div className="w-[100%] flex text-start items-center ">
                      <img
                        src={
                          e.userPhoto === ""
                            ? avatar
                            : `${import.meta.env.VITE_APP_FILES_URL}${
                                e.userPhoto
                              }`
                        }
                        alt=""
                        className="rounded-full h-[40px] w-[40px]"
                      />
                      <div className="card bg-[#F8FAFC] ml-[1%] text-end flex flex-wrap p-[8px] font-[600] rounded-[0px_10px_10px_10px] gap-2 text-[16px] text-[#475569] mt-[2%]">
                        {e.messageText}
                      </div>
                      <div className="ml-[1%]"></div>
                    </div>
                  );
                }
              })}
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
