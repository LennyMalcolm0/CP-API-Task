import { useContext, useEffect, useState } from "react";
import CardContainer from "../components/CardContainer";
import DefaultFields from "../components/DefaultFields";
import AddQuestionPopup from "../components/AddQuestionPopup";
import { FormDataContext } from "../App";
import { PersonalInformationData, QuestionTemplate } from '../dataTypes';
import FormQuestion from "../components/FormQuestion";
import { HttpClient } from "../axiosRequest";

const PersonalInformation = () => {
    const formData = useContext(FormDataContext);
    const [showAddQuestionPopup, setShowAddQuestionPopup] = useState(false);
    const [personalQuestions, setPersonalQuestions] = useState<QuestionTemplate[]>([]);
    const [personalInformation, setPersonalInformation] = 
        useState<PersonalInformationData | undefined>();

    useEffect(() => {
        if (!formData) return;
        setPersonalInformation(formData?.attributes.personalInformation);
        setPersonalQuestions(formData?.attributes.personalInformation.personalQuestions || []);
    }, [formData])

    const updatePersonalQuestions = async (personalQuestions: QuestionTemplate[]) => {
        if (!formData) return false;

        const requestBody = formData;
        requestBody.attributes.personalInformation.personalQuestions = personalQuestions;

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
            title="Personal Information"
            content={(
                <div className="px-[30px] pt-5 pb-10">
                    <DefaultFields 
                        label="First Name"
                        noInputs
                    />
                    <DefaultFields 
                        label="Last Name"
                        noInputs
                    />
                    <DefaultFields 
                        label="Email"
                        noInputs
                    />
                    <DefaultFields 
                        label="Phone"
                        labelDescription="(without dial code)"
                        checkBoxLabel="Internal"
                        checkBoxDefaultValue={personalInformation?.phoneNumber.internalUse}
                        toggleButtonDefaultValue={personalInformation?.phoneNumber.show}
                    />
                    <DefaultFields 
                        label="Nationality"
                        checkBoxLabel="Internal"
                        checkBoxDefaultValue={personalInformation?.nationality.internalUse}
                        toggleButtonDefaultValue={personalInformation?.nationality.show}
                    />
                    <DefaultFields 
                        label="Current Residence"
                        checkBoxLabel="Internal"
                        checkBoxDefaultValue={personalInformation?.currentResidence.internalUse}
                        toggleButtonDefaultValue={personalInformation?.currentResidence.show}
                    />
                    <DefaultFields 
                        label="ID Number"
                        checkBoxLabel="Internal"
                        checkBoxDefaultValue={personalInformation?.idNumber.internalUse}
                        toggleButtonDefaultValue={personalInformation?.idNumber.show}
                    />
                    <DefaultFields 
                        label="Date of Birth"
                        checkBoxLabel="Internal"
                        checkBoxDefaultValue={personalInformation?.dateOfBirth.internalUse}
                        toggleButtonDefaultValue={personalInformation?.dateOfBirth.show}
                    />
                    <DefaultFields 
                        label="Gender"
                        checkBoxLabel="Internal"
                        checkBoxDefaultValue={personalInformation?.gender.internalUse}
                        toggleButtonDefaultValue={personalInformation?.gender.show}
                        lastField
                    />

                    {personalQuestions.map((question, index) => (
                        <FormQuestion 
                            key={question.id}
                            question={question}
                            questionIndex={index}
                            existingQuestions={personalQuestions}
                            onEdit={updatePersonalQuestions}
                            setQuestionsArray={setPersonalQuestions}
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
                existingQuestions={personalQuestions}
                setShowPopup={setShowAddQuestionPopup} 
                onSave={updatePersonalQuestions}
                setQuestionsArray={setPersonalQuestions}
            />
        }
        </>
    );
}
 
export default PersonalInformation;