import { SetStateAction, useRef } from "react";
import CardContainer from "./CardContainer";

interface CoverImageProps {
    imageUrl: string;
    setImageUrl: React.Dispatch<SetStateAction<string>>;
    inputAttributes: React.InputHTMLAttributes<HTMLInputElement>;
}
const CoverImage = ({imageUrl, setImageUrl, inputAttributes}: CoverImageProps) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const openFile = () => {
        if (!fileInputRef || !fileInputRef.current) return;
        fileInputRef.current.click();
    };

    const deleteFile = () => {
        if (!fileInputRef || !fileInputRef.current) return;
        fileInputRef.current.value = "";
        setImageUrl("");
    };

    return (  
        <CardContainer 
            title="Upload cover image"
            content={(<>
                {!imageUrl ? (
                    <div 
                        onClick={openFile} 
                        className="w-[512px] px-4 py-[56px] relative mx-auto my-[55px] rounded-[5px] 
                        border border-black border-dashed text-center cursor-pointer"
                    >
                        <img src="/upload.svg" alt="Upload" className="mx-auto" />
                        <div className="text-sm font-semibold mt-1">Upload cover image</div>
                        <div className="text-sm text-[#979797] font-medium">16:9 ratio is recommended. Max image size 1mb</div>
                        <input 
                            type="file" 
                            className="h-0 w-0 absolute" 
                            ref={fileInputRef}
                            { ...inputAttributes }
                        />
                    </div>
                ):(
                    <div className="w-full">
                        <img 
                            src={imageUrl}
                            alt="Cover Image"
                            className="h-[320px] w-full object-cover overflow-hidden"
                        />
                        <div 
                            onClick={deleteFile} 
                            className="w-fit my-5 mx-6 flex items-center gap-1 cursor-pointer"
                        >
                            <img src="/cancel.svg" alt="Cancel" />
                            <div className="text-[15px] text-[#A80000] font-semibold">Delete & re-upload</div>
                        </div>
                    </div>
                )}
            </>)}
        />
    );
}
 
export default CoverImage;