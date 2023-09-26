import { useState } from "react";
import AddQuestionPopup from "../components/AddQuestionPopup";
import CardContainer from "../components/CardContainer";

const AdditionalQuestions = () => {
    const [showAddQuestionPopup, setShowAddQuestionPopup] = useState(false);

    return (  
        <>
        <CardContainer
            title="Additional Questions"
            content={(
                <div className="px-[30px] pt-5 pb-10">
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
 
export default AdditionalQuestions;