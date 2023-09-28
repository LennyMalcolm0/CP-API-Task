import React, { useState } from "react";
import { QuestionTemplate, QuestionType } from "../dataTypes";
import QuestionChoice from "./QuestionChoice";
import { SetStateAction } from 'react';
import { useFormik } from "formik";
import * as yup from 'yup';

interface FormQuestionProps {
    question: QuestionTemplate;
    existingQuestions: QuestionTemplate[];
    questionIndex: number;
    setQuestionsArray: React.Dispatch<SetStateAction<QuestionTemplate[]>>;
    onEdit: (questions: QuestionTemplate[]) => Promise<boolean>;
    lastField?: boolean;
}
const questionSchema = yup.object().shape({
    question: yup.string().trim().required("Question is required"),
    maxChoice: yup.number().optional(),
    disqualify: yup.boolean().optional(),
    other: yup.boolean().optional(),
});

const FormQuestion = ({ 
    question, 
    existingQuestions,
    questionIndex,
    setQuestionsArray,
    onEdit,
    lastField,
}: FormQuestionProps) => {

    const [editMode, setEditMode] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [choiceOptions, setChoiceOptions] = 
        useState<string[] | undefined>(
            question.choices?.length && question.choices.length > 0 ? question.choices : [""]
        );

    const resolveOnEdit = (questions: QuestionTemplate[]) => {
        onEdit(questions).then(success => {
            if (success) {
                setQuestionsArray(questions);
                setEditMode(false);
                setUploading(false);
            } else {
                setUploading(false);
                alert("Something went wrong! Please try again.");
            }
        })
    };

    const formik = useFormik({
        initialValues: {
            question: question.question,
            maxChoice: question.maxChoice,
            disqualify: question.disqualify,
            other: question.other,
        },
        validationSchema: questionSchema,
        onSubmit: (values) => {
            const updatedQuestions: QuestionTemplate[] = [];
            setUploading(true);

            for (let i = 0; i < existingQuestions.length; i++) {
                // I used index instead of the question 'id' because it's a mock server
                if (i === questionIndex) {
                    updatedQuestions.push({
                        ...values,
                        type: question.type as QuestionType,
                        choices: (question.type === "Dropdown" || question.type === "MultipleChoice") ? choiceOptions : []
                    })
                } else {
                    updatedQuestions.push(existingQuestions[i]);
                }
            }

            resolveOnEdit(updatedQuestions);
        },
    });

    const deleteQuestion = () => {
        setUploading(true);
        const filteredQuestions = existingQuestions.filter((question, index) => {
            return index !== questionIndex ? question : null
        })

        resolveOnEdit(filteredQuestions);
    };

    return (  
        <div className={`w-full pb-6 mb-5 ${!lastField && "border-b border-[#C4C4C4]"}`}>
            <h3 className="text-sm text-[#979797] font-medium mb-2">{question.type}</h3>
            <div className="w-full flex items-start justify-between">
                <div className="max-w-[80%] text-xl font-semibold line-clamp-2">{question.question}</div>
                {!editMode ? (
                    <img 
                        src="/edit.svg" 
                        alt="Edit" 
                        className="mt-2 cursor-pointer" 
                        onClick={() => setEditMode(true)}
                    />
                ):(<>
                    {!uploading &&
                        <span 
                            onClick={() => setEditMode(false)} 
                            className="text-xl font-semibold scale-[1.5] cursor-pointer rotate-45"
                        >+</span>
                    }
                </>)}
            </div>

            {editMode && 
                <form onSubmit={formik.handleSubmit} className="mt-6">
                    <div className="w-full mb-5">
                        <label htmlFor="type" className="text-xl font-semibold">Question</label>
                        <input 
                            type="text" 
                            placeholder="Type here"
                            name="question"
                            value={formik.values.question}
                            onChange={formik.handleChange}
                            className="w-full h-[68px] px-6 rounded-[5px] border border-black text-sm 
                            flex items-center justify-between placeholder:text-[#979797] mt-2"
                        />
                        {formik.errors.question &&
                            <div className="text-red-500 text-sm">{formik.errors.question}</div>
                        }
                    </div>

                    {(question.type === "MultipleChoice" || question.type === "Dropdown") &&
                        <QuestionChoice 
                            options={choiceOptions as string[]}
                            setOptions={setChoiceOptions as React.Dispatch<SetStateAction<string[]>>}
                            checkBoxDefaultValue={question.other}
                        />
                    }

                    {(question.type === "MultipleChoice") && <>
                        <label htmlFor="type" className="text-xl font-semibold">Max Choice Allowed</label>
                        <input 
                            type="number" 
                            placeholder="Enter number of choice allowed here"
                            name='maxChoice'
                            value={formik.values.maxChoice}
                            onChange={formik.handleChange}
                            className="w-full h-[68px] px-6 rounded-[5px] border border-black 
                            text-sm placeholder:text-[#979797] flex items-center justify-between mt-2 mb-7" 
                        />
                    </>}

                    {(question.type === "YesNo") &&
                        <span className="flex items-center gap-3 px-4">
                            <input 
                                type="checkbox" 
                                name="checkbox" 
                                defaultChecked={question.disqualify === true}
                                value={"yes"}
                                onChange={() => {
                                    formik.setFieldValue("disqualify", !formik.values.disqualify)
                                }}
                                className="accent-[#087B2F] scale-[1.3] z-[11]" 
                            />
                            <label htmlFor="checkbox" className="text-[15px]">Disqualify candidate if the answer is no</label>
                        </span>
                    }

                    <div className={`flex items-center justify-between mt-8 ${uploading && "opacity-90 animate-pulse"}`}>
                        <button
                            type="button"
                            disabled={uploading} 
                            onClick={deleteQuestion}
                            className="w-fit flex items-center gap-1"
                        >
                            <img src="/cancel.svg" alt="Cancel" />
                            <div className="text-[15px] text-[#A80000] font-semibold">Delete question</div>
                        </button>

                        <button 
                            type="submit"
                            disabled={uploading}
                            className="px-3 py-2 rounded-[5px] bg-[#087B2F] text-sm text-white font-semibold"
                        >Save</button>
                    </div>
                </form>
            }
        </div>
    );
}
 
export default FormQuestion;