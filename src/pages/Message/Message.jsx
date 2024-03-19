import React, { useEffect, useState } from "react";
import arrow from "../../assets/message/Vector.svg";
import messageicon from "../../assets/message/free-icon-messenger-1384074 1.svg";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../../api/Message/messageApi";

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

  let dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  let data = useSelector((state) => state.message.data);

  let [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(getData(search));
  }, [search]);

  console.log(data);

  return (
    <div className="flex font-mono">
      <div className="ml-[5px] w-[25%] border px-[20px]  pt-[50px] ">
        <div className="flex justify-between ">
          <p className="flex text-[20px] font-bold">
            <span>terrylucas</span>
            <span className=" relative top-3 left-2">
              <img src={arrow} alt="" />
            </span>
          </p>
          <p className="pt-[5px]" onClick={handleClickOpen}>
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
        <div className="border  mt-[20px] "></div>
      </div>
      <div className="border w-[75%] h-[100vh] overflow-y-scroll">
        <div className=" h-[400px] p-[20px] border mt-[300px]">
          <img
            src={messageicon}
            alt=""
            className="w-[200px] h-[200px] m-auto  py-2"
          />
          <p className=" text-center font-medium text-[20px]">Your messages</p>
          <p className=" text-center font-medium text-[16px] text-gray-400">
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
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-[500px] rounded-md text-[gray] px-[25px] py-[10px]  bg-gray-200"
              placeholder="Search..."
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            size="large"
            className="w-full"
            onClick={handleClose}
          >
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
};

export default Message;
