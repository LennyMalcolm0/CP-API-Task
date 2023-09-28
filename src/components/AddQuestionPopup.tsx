import { SetStateAction, useEffect, useRef, useState } from 'react';
import QuestionChoice from "./QuestionChoice";
import { QuestionTemplate, QuestionType } from '../dataTypes';
import * as yup from 'yup';
import { useFormik } from 'formik';

interface AddQuestionPopupProps {
    existingQuestions: QuestionTemplate[];
    setShowPopup: React.Dispatch<SetStateAction<boolean>>;
    setQuestionsArray: React.Dispatch<SetStateAction<QuestionTemplate[]>>;
    onSave: (questions: QuestionTemplate[]) => Promise<boolean>;
}
const questionSchema = yup.object().shape({
    type: yup.string().trim().required("Type is required"),
    question: yup.string().trim().required("Question is required"),
    maxChoice: yup.number().optional(),
    disqualify: yup.boolean().optional(),
    other: yup.boolean().optional(),
});

const AddQuestionPopup = ({existingQuestions, setQuestionsArray, setShowPopup, onSave}: AddQuestionPopupProps) => {
    const [questionType, setQuestionType] = useState("");
    const [choiceOptions, setChoiceOptions] = useState<string[]>([""]);
    const [showQuestionTypesDropdown, setShowQuestionTypesDropdown] = useState(false);
    const [submitButtonClicked, setSubmitButtonClicked] = useState(false);
    const [uploading, setUploading] = useState(false);

    const handleTypeChange = (value: string, type: string) => {
        setQuestionType(value);
        formik.setFieldValue("type", type);
        formik.setFieldValue("disqualify", false);
        formik.setFieldValue("other", false);
        setShowQuestionTypesDropdown(prev => !prev);
    };

    const formik = useFormik({
        initialValues: {
            type: "",
            question: "",
            maxChoice: undefined,
            disqualify: false,
            other: false,
        },
        validationSchema: questionSchema,
        onSubmit: (values) => {
            setUploading(true);
            
            const newQuestion: QuestionTemplate = {
                ...values,
                type: values.type as QuestionType,
                choices: (values.type === "Dropdown" || values.type === "MultipleChoice") ? choiceOptions : []
            }
            const updatedQuestions = existingQuestions.concat(newQuestion);

            onSave(updatedQuestions).then(success => {
                if (success) {
                    setQuestionsArray(updatedQuestions);
                    setUploading(false);
                    setShowPopup(false);
                } else {
                    setUploading(false);
                    alert("Something went wrong! Please try again.");
                }
            })
        },
    });

    const questionBoxRef = useRef<HTMLFormElement>(null);
    useEffect(() => {
        const handleClickOutsideQuestionBox = (event: MouseEvent) => {
            if (questionBoxRef.current && !questionBoxRef.current.contains(event.target as Node)) {
                setShowPopup(false);
            }
        };
    
        document.addEventListener("mousedown", handleClickOutsideQuestionBox);
    
        return () => {
            document.removeEventListener("mousedown", handleClickOutsideQuestionBox);
        };
    }, [questionBoxRef, setShowPopup]);

    return (  
        <div className="fixed inset-0 z-[999999] w-screen h-screen bg-[#1A1B1B] bg-opacity-70 grid place-content-center">
            <form 
                onSubmit={formik.handleSubmit} 
                ref={questionBoxRef}
                className="w-[595px] max-h-[90vh] rounded-[20px] bg-white flex flex-col overflow-hidden"
            >
                <div className="w-full p-8 rounded-t-[20px] text-[25px] font-semibold capitalize bg-[#D0F7FA]">Question</div>

                <div className="w-full px-7 pt-8 pb-10 overflow-auto">
                    <>
                        <label htmlFor="type" className="text-xl font-semibold">Type</label>
                        <div className="relative mt-2 mb-5" id="type">
                            <div 
                                onClick={() => setShowQuestionTypesDropdown(prev => !prev)} 
                                className={`w-full h-[68px] px-6 rounded-[5px] border border-black text-sm 
                                    ${!questionType && "text-[#979797]"} flex items-center justify-between cursor-pointer`
                                }
                            >
                                <span>{questionType || "Select Type"}</span>
                                <img src="/arrow-down.svg" alt="Arrow down" className={`${showQuestionTypesDropdown && "-rotate-[180deg]"}`} />
                            </div>

                            {showQuestionTypesDropdown &&
                                <div className="absolute z-[99999] w-full py-1 bg-white rounded-[5px] shadow-[0px_1px_18px_0px_rgba(0,0,0,0.12)]">
                                    {questionTypes.map((questionType, index) => (
                                        <div 
                                            key={index}
                                            onClick={() => handleTypeChange(questionType.value, questionType.type)}
                                            className="h-[44px] w-full px-6 cursor-pointer hover:bg-[#9C4DE2] hover:text-white flex items-center"
                                        >{questionType.title}</div>
                                    ))}
                                </div>
                            }

                            {(formik.errors.type && submitButtonClicked) &&
                                <span className="text-red-500 text-sm">{formik.errors.type}</span>
                            }
                        </div>
                    </>
                    
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
                        {(formik.errors.question && submitButtonClicked) &&
                            <div className="text-red-500 text-sm">{formik.errors.question}</div>
                        }
                    </div>

                    {(questionType === questionTypes[3].value || questionType === questionTypes[4].value) &&
                        <QuestionChoice 
                            options={choiceOptions}
                            setOptions={setChoiceOptions}
                            checkBoxOnChange={() => {
                                formik.setFieldValue("other", !formik.values.other)
                            }}
                        />
                    }

                    {questionType === questionTypes[4].value && <>
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

                    {questionType === questionTypes[2].value &&
                        <span className="flex items-center gap-3 px-4">
                            <input 
                                type="checkbox" 
                                name="checkbox" 
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
                            onClick={() => setShowPopup(false)}
                            className="w-fit flex items-center gap-1"
                        >
                            <img src="/cancel.svg" />
                            <div className="text-[15px] text-[#A80000] font-semibold">Delete question</div>
                        </button>

                        <button 
                            type="submit" 
                            disabled={uploading}
                            onClick={() => setSubmitButtonClicked(true)}
                            className="px-3 py-2 rounded-[5px] bg-[#087B2F] text-sm text-white font-semibold"
                        >Save</button>
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