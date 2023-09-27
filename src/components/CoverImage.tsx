import { useContext, useEffect, useRef, useState } from "react";
import CardContainer from "./CardContainer";
import { FormDataContext } from "../App";
import { HttpClient } from "../axiosRequest";

const CoverImage = () => {
    const formData = useContext(FormDataContext);
    const [coverImageUrl, setCoverImageUrl] = useState(
        formData?.attributes.coverImage || ""
    );
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (!formData) return;
        setCoverImageUrl(formData?.attributes.coverImage || "");
    }, [formData])

    const openFile = () => {
        if (!fileInputRef || !fileInputRef.current) return;
        fileInputRef.current.click();
    };

    const deleteFile = () => {
        if (!fileInputRef || !fileInputRef.current) return;
        fileInputRef.current.value = "";
        setCoverImageUrl("");
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const maxFileSize = 1024 * 1024; // 1 megabytes

        if (e.target.files[0].size > maxFileSize) {
            alert('File is too large!');
            e.target.value = '';
            return;
        }
        setUploading(true);
        const imageUrl = URL.createObjectURL(e.target.files[0]);

        const requestBody = formData;
        if (!requestBody) return;
        requestBody.attributes = {
            ...requestBody.attributes,
            coverImage: imageUrl
        }
        
        await HttpClient.put(
            "/api/144.9397931391233/programs/mock/application-form", 
            { data: requestBody }
        )

        setCoverImageUrl(imageUrl);
        setUploading(false);
    };

    return (  
        <CardContainer 
            title="Upload cover image"
            content={(<>
                {uploading ? (
                    <div className="h-[250px] grid place-content-center text-xl font-medium">Uploading...</div>
                ):(<>
                    <div 
                        onClick={openFile} 
                        className={`${coverImageUrl && "hidden"} w-[512px] px-4 py-[56px] relative mx-auto 
                        my-[55px] rounded-[5px] border border-black border-dashed text-center cursor-pointer`}
                    >
                        <img src="/upload.svg" alt="Upload" className="mx-auto" />
                        <div className="text-sm font-semibold mt-1">Upload cover image</div>
                        <div className="text-sm text-[#979797] font-medium">16:9 ratio is recommended. Max image size 1mb</div>
                        <input 
                            type="file" 
                            className="h-0 w-0 absolute" 
                            accept="image/svg+xml, image/png, image/jpeg"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                        />
                    </div>

                    <div className={`${!coverImageUrl && "hidden"} w-full`}>
                        <img 
                            src={coverImageUrl}
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
                </>)}
            </>)}
        />
    );
}
 
export default CoverImage;