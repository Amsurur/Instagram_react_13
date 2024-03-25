import img1 from "../../assets/images/profileImg.png";
import img3 from "../../assets/images/pic1.png";
import img4 from "../../assets/images/pic2.png";
import img5 from "../../assets/images/pic3.png";
import img6 from "../../assets/images/pic4.png";
import img8 from "../../assets/images/pic6.png";
import img9 from "../../assets/images/image 77.png";
import img10 from "../../assets/images/image 78.png";
import img11 from "../../assets/images/image 79.png";
import img2 from "../../assets/icons/settings.png";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useState } from "react";

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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <div className="flex ml-[-200px] mt-[45px] gap-[30px]">
        <div>
          <img src={img1} alt="" />
        </div>
        <div>
          <div className="pt-[20px] flex items-start w-[450px] justify-between">
            <h1 className="font-bold text-[19px]">terrylucas</h1>
            <div className="flex gap-[10px] mt-[-5px] items-center">
              <button className="bg-[whitesmoke] w-[100px] h-[35px] rounded">
                Edit profile
              </button>
              <button className="bg-[whitesmoke] rounded w-[130px] h-[35px] ">
                View archive
              </button>
              <img src={img2} alt="" />
            </div>
          </div>
          <div className="flex gap-[28px] mt-[20px] ">
            <p>
              <span className="font-bold text-[17px]">0</span> posts
            </p>
            <p>
              <span className="font-bold text-[17px]">250</span> followers
            </p>
            <p>
              <span className="font-bold text-[17px]">188</span> following
            </p>
          </div>
          <h1 className="mt-[20px] text-[19px] font-bold">Terry Lucas</h1>
        </div>
      </div>

      <div className="flex ml-[-190px] mt-[45px] gap-[20px]">
        <div className="text-center">
          <img src={img3} alt="" />
          <p>terrylucas</p>
        </div>
        <div className="text-center">
          <img src={img4} alt="" />
          <p>LauraMatt...</p>
        </div>
        <div className="text-center">
          <img src={img5} alt="" />
          <p>harryprescott</p>
        </div>
        <div className="text-center">
          <img src={img6} alt="" />
          <p>ednamanz</p>
        </div>
        <div className="text-center">
          <img src={img8} alt="" />
          <p>NEw</p>
        </div>
      </div>

      <Box sx={{ width: "100%", mt: "50px", ml: "-50px" }}>
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
      </Box>
    </div>
  );
};

export default Profile;
