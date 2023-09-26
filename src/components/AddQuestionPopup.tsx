import { useState } from 'react';
import QuestionChoice from "./QuestionChoice";

const AddQuestionPopup = () => {
    const [questionType, setQuestionType] = useState("");
    const [showQuestionTypesDropdown, setShowQuestionTypesDropdown] = useState(false);
    const [choiceOptions, setChoiceOptions] = 
        useState<(string)[]>([""]);

    return (  
        <div className="fixed inset-0 z-[999999] w-screen h-screen bg-[#1A1B1B] bg-opacity-70 grid place-content-center">
            <form className="w-[595px] max-h-[90vh] rounded-[20px] bg-white flex flex-col overflow-hidden">
                <div className="w-full p-8 rounded-t-[20px] text-[25px] font-semibold capitalize bg-[#D0F7FA]">Question</div>

                <div className="w-full px-7 pt-8 pb-10 overflow-auto">
                    <>
                        <label htmlFor="type" className="text-xl font-semibold">Type</label>
                        <div className="relative mt-2 mb-7" id="type">
                            <div 
                                onClick={() => setShowQuestionTypesDropdown(prev => !prev)} 
                                className={`w-full h-[68px] px-6 rounded-[5px] border border-black text-sm 
                                ${!questionType && "text-[#979797]"} flex items-center justify-between cursor-pointer`}
                            >
                                <span>{questionType || "Select Type"}</span>
                                <img src="/arrow-down.svg" alt="Arrow down" className={`${showQuestionTypesDropdown && "-rotate-[180deg]"}`} />
                            </div>
                            {showQuestionTypesDropdown &&
                                <div className="absolute z-[99999] w-full py-1 bg-white rounded-[5px] shadow-[0px_1px_18px_0px_rgba(0,0,0,0.12)]">
                                    {questionTypes.map((type, index) => (
                                        <div 
                                            key={index}
                                            onClick={() => {
                                                setQuestionType(type.value);
                                                setShowQuestionTypesDropdown(prev => !prev);
                                            }}
                                            className="h-[44px] w-full px-6 cursor-pointer hover:bg-[#9C4DE2] hover:text-white flex items-center"
                                        >{type.title}</div>
                                    ))}
                                </div>
                            }
                        </div>
                    </>
                    <>
                        <label htmlFor="type" className="text-xl font-semibold">Question</label>
                        <input 
                            type="text" 
                            placeholder="Type here"
                            className="w-full h-[68px] px-6 rounded-[5px] border border-black 
                            text-sm placeholder:text-[#979797] flex items-center justify-between mt-2 mb-7" 
                        />
                    </>

                    {(questionType === questionTypes[3].value || questionType === questionTypes[4].value) &&
                        <QuestionChoice 
                            options={choiceOptions}
                            setOptions={setChoiceOptions}
                        />
                    }

                    {questionType === questionTypes[4].value && <>
                        <label htmlFor="type" className="text-xl font-semibold">Max Choice Allowed</label>
                        <input 
                            type="number" 
                            placeholder="Enter number of choice allowed here"
                            className="w-full h-[68px] px-6 rounded-[5px] border border-black 
                            text-sm text-[#979797] flex items-center justify-between mt-2 mb-7" 
                        />
                    </>}

                    {questionType === questionTypes[2].value &&
                        <span className="flex items-center gap-3 px-4 mb-12">
                            <input 
                                type="checkbox" 
                                name="checkbox" 
                                value={"yes"}
                                className="accent-[#087B2F] scale-[1.3] z-[11]" 
                            />
                            <label htmlFor="checkbox" className="text-[15px]">Disqualify candidate if the answer is no</label>
                        </span>
                    }

                    <div className="flex items-center justify-between">
                        <div className="w-fit flex items-center gap-1 cursor-pointer">
                            <img src="/cancel.svg" alt="Cancel" />
                            <div className="text-[15px] text-[#A80000] font-semibold">Delete question</div>
                        </div>

                        <button className="px-3 py-2 rounded-[5px] bg-[#087B2F] text-sm text-white font-semibold">Save</button>
                    </div>
                </div>
            </form>
        </div>
    );
}
 
export default AddQuestionPopup;

const questionTypes = [
    {
        title: "Paragraph",
        value: "Paragraph",
        type: "Paragraph",
    },
    {
        title: "Short Answer",
        value: "Short Answer",
        type: "ShortAnswer",
    },
    {
        title: "Yes/No",
        value: "Yes or No",
        type: "YesNo",
    },
    {
        title: "Dropdown",
        value: "Dropdown",
        type: "Dropdown",
    },
    {
        title: "Multiple Choice",
        value: "Multiple Choice",
        type: "MultipleChoice",
    },
    {
        title: "Date",
        value: "Date",
        type: "Date",
    },
    {
        title: "Number",
        value: "Number",
        type: "Number",
    },
    {
        title: "File Upload",
        value: "File Upload",
        type: "FileUpload",
    },
]