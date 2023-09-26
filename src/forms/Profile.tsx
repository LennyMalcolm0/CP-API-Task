import { useState } from "react";
import CardContainer from "../components/CardContainer";
import DefaultFields from "../components/DefaultFields";
import AddQuestionPopup from "../components/AddQuestionPopup";

const Profile = () => {
    const [showAddQuestionPopup, setShowAddQuestionPopup] = useState(false);
    
    return (  
        <>
        <CardContainer
            title="Profile"
            content={(
                <div className="px-[30px] pt-5 pb-10">
                    <DefaultFields 
                        label="Education"
                        checkBoxLabel="Mandatory"
                    />
                    <DefaultFields 
                        label="Experience"
                        checkBoxLabel="Mandatory"
                    />
                    <DefaultFields 
                        label="Resume"
                        checkBoxLabel="Mandatory"
                        lastField
                    />
                    <div
                        onClick={() => setShowAddQuestionPopup(true)} 
                        className="w-fit flex items-center gap-3 text-[15px] font-semibold mt-3 cursor-pointer"
                    >
                        <img src="/plus.svg" alt="Plus" className="h-5" />
                        <span>Add a question</span>
                    </div>
                </div>
            )}
        />

        {showAddQuestionPopup && 
            <AddQuestionPopup setShowPopup={setShowAddQuestionPopup} />
        }
        </>
    );
}
 
export default Profile;