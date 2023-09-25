import { useState } from 'react';
interface ToggleButtonProps {
    checked: boolean;
}
const ToggleButton = ({checked}: ToggleButtonProps) => {
    const [show, setShow] = useState(checked);

    return (  
        <span 
            onClick={() => setShow(prev => !prev)} 
            className="flex items-center gap-2 cursor-pointer"
        >
            <span className="h-6 w-[45px] rounded-full border border-[#D4D4D4] relative overflow-hidden">
                <input 
                    type="checkbox" 
                    name="show" 
                    value={show ? "yes" : "no"} 
                    className="absolute h-0 w-0" 
                />
                <span className={`w-full h-full absolute ${show ? "bg-transparent" : "bg-[#087B2F]"}`} />
                <span className={`w-2/5 h-[70%] rounded-full absolute top-[3.8px] ${show ? "right-1 bg-[#D4D4D4]" : "left-1 bg-white"} `} />
            </span>
            <label 
                htmlFor="show" 
                className="w-[35px] text-end font-notoSans text-[#666666] cursor-pointer"
            >
                {show ? "Hide": "Show"}
            </label>
        </span>
    );
}
 
export default ToggleButton;