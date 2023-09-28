import { useContext, useEffect, useState } from "react";
import AddQuestionPopup from "../components/AddQuestionPopup";
import CardContainer from "../components/CardContainer";
import FormQuestion from "../components/FormQuestion";
import { FormDataContext } from "../App";
import { QuestionTemplate } from "../dataTypes";
import { HttpClient } from "../axiosRequest";

const AdditionalQuestions = () => {
    const formData = useContext(FormDataContext);
    const [showAddQuestionPopup, setShowAddQuestionPopup] = useState(false);
    const [customisedQuestions, setCustomizedQuestions] = useState<QuestionTemplate[]>([]);

    useEffect(() => {
        if (!formData) return;
        setCustomizedQuestions(formData?.attributes.customisedQuestions || []);
    }, [formData])

    const updateCustomizedQuestions = async (customisedQuestions: QuestionTemplate[]) => {
        if (!formData) return false;

        const requestBody = formData;
        if (!requestBody.attributes.customisedQuestions) return false;
        requestBody.attributes.customisedQuestions = customisedQuestions;

        const { error } = await HttpClient.put(
            "/api/144.9397931391233/programs/mock/application-form", 
            { data: requestBody }
        )

        if (error) {
            return false
        } else {
            return true
        }
    };

    return (  
        <>
        <CardContainer
            title="Additional Questions"
            content={(
                <div className="px-[30px] pt-5 pb-10">
                    {customisedQuestions.map((question, index) => (
                        <FormQuestion 
                            key={question.id}
                            question={question}
                            questionIndex={index}
                            existingQuestions={customisedQuestions}
                            onEdit={updateCustomizedQuestions}
                            setQuestionsArray={setCustomizedQuestions}
                        />
                    ))}

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
            <AddQuestionPopup 
                existingQuestions={customisedQuestions}
                setShowPopup={setShowAddQuestionPopup} 
                onSave={updateCustomizedQuestions}
                setQuestionsArray={setCustomizedQuestions}
            />
        }
        </>
    );
}
 
export default AdditionalQuestions;