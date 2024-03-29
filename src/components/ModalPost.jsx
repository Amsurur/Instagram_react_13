
import React, { useEffect } from 'react'

import Box from '@mui/material/Box';

import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";

import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import "../App.css"


import { useState } from 'react';

import log from "../assets/images/log.svg"
import { useRef } from 'react';


import Button from '@mui/material/Button';


import TextField from '@mui/material/TextField';

import { useDispatch } from 'react-redux';
import { addUser } from '../api/create/create';
import { NavLink } from 'react-router-dom';



import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

import '../App.css';


import { Pagination } from 'swiper/modules';

import  {fileToBase64} from "../utils/fileToBase64"







const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 450,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: 3,
};



const ModalPost = () => {



    const dispatch = useDispatch()




    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")

    const [img, setImg] = useState([])





    const fileInputRef = useRef(null);

    
    
    
    const [arr, setArr] = useState([])



    
    
    

    const handleFileInputChange = async (event) => {
        
        const files = event.target.files;
        let toBase64 = [];
         
        setImg(files)
        for(let i = 0; i<files.length; i++){
            console.log(files[i])
            if(files[i].type.includes("image")){

                let base64 = await fileToBase64(files[i])

                let file = {
                    type: "img",
                  src: base64
                  }

                  toBase64.push(file)
            }

            if(files[i].type.includes("video")){

                let base64 = await fileToBase64(files[i])

                let file = {
                    type: "video",
                  src: base64
                  }

                  toBase64.push(file)
            }

        }


        setArr(toBase64)
 
    }



    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [modal, setModal] = useState(false)



    return (
        <>
            <NavLink
                className={
                    "focus:bg-[#EFF6FF] focus:border-r-2 focus:text-[#3B82F6] border-[#3B82F6]"
                }
            >
                <li
                    onClick={() => { setOpen(true), setModal(false)  }}
                    className="flex items-center hover:text-[#3B82F6] w-[215px] cursor-pointer gap-[15px] rounded-[7px] p-[10px] transition-all duration-300">
                    <AddBoxOutlinedIcon />
                    <p
                        className={`${location.pathname === "/basic/message" ||
                            location.pathname === "/basic/message/newMessage" || modal
                            ? "hidden"
                            : "block"
                            }`}
                    >
                        Создать
                    </p>
                </li>
            </NavLink>


            <Modal
                open={open}
                onClose={() =>  handleClose()}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className='flex justify-between items-center'>

                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Create new post
                        </Typography>


                        <button
                            onClick={handleClose}
                            className='w-[25px] h-[25px]'>
                            <svg data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>


                    <Typography id="modal-modal-description" sx={{ mt: 3 }}>

                      

                  <div className='w-[80%] m-auto mt-[10%] h-[220px] rounded-[5px]  '>


                   <Swiper pagination={true} modules={[Pagination]} className="mySwiper">

                
                   {arr.length === 0 ? <SwiperSlide >
                    
                    <div className='w-[70%] h-[215px] '>

                    <img className=' object-cover' src={log} />

                    </div>
                    
                    </SwiperSlide>:null}         

                   
                   
                    {
                            arr?.map((bases, index) => {
                                return <SwiperSlide key={index} >

                                { bases.type === 'img' ? <img src={bases.src} />: bases.type === 'video' ? <video type="mp4" width={300} height={280} controls multiple muted  autoPlay={false}   src={bases.src} ></video> : null }
                              
                                </SwiperSlide>

                                    }
                                )
                        }
                  </Swiper>


                          </div>


{/* 
                        <div className='w-[90%] m-auto flex justify-between flex-wrap '>
                            {
                                base?.map((bases, index) => {
                                    return (
                                        <div key={index} className='w-[100px] gap-[20px_0] mt-[5%] rounded-[5px] '>

                                            <img

                                                accept="image/png,image/jpg"
                                                onChange={handleFileInputChange}

                                                className=' h-[100px] rounded-[5px] ' src={bases.length === 0 ? log : bases} alt="Uploaded" />
                                        </div>

                                    )
                                })
                            }

                        </div> */}

                    </Typography>



                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>

                        <h1 className='text-center text-[#1E293B] text-[16px] font-semibold'>Drag photos and videos here</h1>
                    </Typography>

                    <Typography id="modal-modal-description" sx={{ mt: 3 }}>

                        <div className='flex justify-center'>
                            <input
                                type="file"
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                multiple={true}
                                onChange={handleFileInputChange}
                            />


                            <button className="custom-file-input-button " onClick={() => { handleButtonClick(), setModal(true) }}>
                                Select from computer
                            </button>
                        </div>




                        {modal ? (
                            <div className='flex justify-center items-center flex-wrap '>
                                <TextField
                                    style={{ marginTop: 20 }}
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    id="outlined-basic" label="Title" variant="outlined" />
                                <TextField
                                    style={{ marginTop: 20 }}
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    id="outlined-basic" label="Content" variant="outlined" />
                                <div className='w-[90%] m-auto mt-[20px] flex justify-center'>
                                    <Button autoFocus onClick={() => { 
                                        dispatch(addUser({ title: title, content: content, files: img })), setOpen(false), setTitle(""), setContent("")}}>
                                        Save
                                    </Button>
                                </div>

                            </div>
                        ) : null}


                    </Typography>
                </Box>
            </Modal>





        </>
    )
}

export default ModalPost
