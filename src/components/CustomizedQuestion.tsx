import React, { useState } from "react";
import { QuestionTemplate } from "../dataTypes";
import QuestionChoice from "./QuestionChoice";
import { SetStateAction } from 'react';

interface CustomizedQuestionProps {
    question: QuestionTemplate;
    lastField?: boolean;
}
const CustomizedQuestion = ({question, lastField}: CustomizedQuestionProps) => {
    const [editMode, setEditMode] = useState(false);
    const [choiceOptions, setChoiceOptions] = 
        useState<string[] | undefined>(
            question.choices?.length && question.choices?.length > 0 ? question.choices : [""]
        );

    return (  
        <div className={`w-full pb-6 mb-5 ${!lastField && "border-b border-[#C4C4C4]"}`}>
            <div className="text-sm text-[#979797] font-medium mb-2">{question.type}</div>
            <div className="w-full flex items-start justify-between">
                <div className="max-w-[80%] text-xl font-semibold line-clamp-2">{question.question}</div>
                {!editMode ? (
                    <img 
                        src="/edit.svg" 
                        alt="Edit" 
                        className="mt-2 cursor-pointer" 
                        onClick={() => setEditMode(true)}
                    />
                ):(
                    <span 
                        onClick={() => setEditMode(false)} 
                        className="text-xl font-semibold scale-[1.5] cursor-pointer rotate-45"
                    >+</span>
                )}
            </div>

            {editMode && 
                <div className="mt-6">
                    <>
                        <label htmlFor="type" className="text-xl font-semibold">Question</label>
                        <input 
                            type="text" 
                            defaultValue={question.question}
                            placeholder="Type here"
                            className="w-full h-[68px] px-6 rounded-[5px] border border-black 
                            text-sm placeholder:text-[#979797] flex items-center justify-between mt-2 mb-7" 
                        />
                    </>

                    {(question.choices?.length && question.choices?.length > 0) &&
                        <QuestionChoice 
                            options={choiceOptions as string[]}
                            setOptions={setChoiceOptions as React.Dispatch<SetStateAction<string[]>>}
                            enableOtherOption={question.other}
                        />
                    }

                    {(question.type === "MultipleChoice") && <>
                        <label htmlFor="type" className="text-xl font-semibold">Max Choice Allowed</label>
                        <input 
                            type="number" 
                            defaultValue={question.maxChoice}
                            placeholder="Enter number of choice allowed here"
                            className="w-full h-[68px] px-6 rounded-[5px] border border-black 
                            text-sm text-[#979797] flex items-center justify-between mt-2 mb-7" 
                        />
                    </>}

                    {(question.type === "YesNo") &&
                        <span className="flex items-center gap-3 px-4 mb-12">
                            <input 
                                type="checkbox" 
                                name="checkbox" 
                                defaultChecked={question.disqualify === true}
                                value={"yes"}
                                className="accent-[#087B2F] scale-[1.3] z-[11]" 
                            />
                            <label htmlFor="checkbox" className="text-[15px]">Disqualify candidate if the answer is no</label>
                        </span>
                    }

                    <div className="flex items-center justify-between">
                        <div 
                            onClick={() => setEditMode(false)}
                            className="w-fit flex items-center gap-1 cursor-pointer"
                        >
                            <img src="/cancel.svg" alt="Cancel" />
                            <div className="text-[15px] text-[#A80000] font-semibold">Delete question</div>
                        </div>

                        <button className="px-3 py-2 rounded-[5px] bg-[#087B2F] text-sm text-white font-semibold">Save</button>
                    </div>
                </div>
            }
        </div>
    );
}
 
export default CustomizedQuestion;