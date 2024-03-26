import React, { useState } from "react";
import { DarkModeSwitch, defaultProperties } from "react-toggle-dark-mode";
import useDarkside from "../../hooks/usedarkside";

function Switcher(){
    const [colorTheme,settheme]=useDarkside()

    const [darkside,Setdarkside]=useState(
        colorTheme==="light"?true:false
    )
    const toggleDarkMode=(checked)=>{
        settheme(colorTheme);
        Setdarkside(checked)
    }
    return(
        <div className="">
            <DarkModeSwitch
            animationProperties={defaultProperties}
            sunColor="gray"
            moonColor="gray"
                checked={darkside}
                onChange={toggleDarkMode}
                size={25}
            />
        </div>
    )
}
export default Switcher
