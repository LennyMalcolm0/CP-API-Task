import { useState } from "react";
import AddQuestionPopup from "../components/AddQuestionPopup";
import CardContainer from "../components/CardContainer";
import CustomizedQuestion from "../components/CustomizedQuestion";

const AdditionalQuestions = () => {
    const [showAddQuestionPopup, setShowAddQuestionPopup] = useState(false);

    return (  
        <>
        <CardContainer
            title="Additional Questions"
            content={(
                <div className="px-[30px] pt-5 pb-10">
                    <CustomizedQuestion 
                        question={{
                            type: "Dropdown",
                            question: "Hello baby validation rules described in your API description document?",
                            choices: ["Hello", "What's up", "Hola"]
                        }}
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
 
export default AdditionalQuestions;