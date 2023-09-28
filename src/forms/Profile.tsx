import { useContext, useEffect, useState } from "react";
import CardContainer from "../components/CardContainer";
import DefaultFields from "../components/DefaultFields";
import AddQuestionPopup from "../components/AddQuestionPopup";
import FormQuestion from "../components/FormQuestion";
import { ProfileData, QuestionTemplate } from "../dataTypes";
import { FormDataContext } from "../App";
import { HttpClient } from "../axiosRequest";

const Profile = () => {
    const formData = useContext(FormDataContext);
    const [showAddQuestionPopup, setShowAddQuestionPopup] = useState(false);
    const [profileQuestions, setProfileQuestions] = useState<QuestionTemplate[]>([]);
    const [profileInformation, setProfileInformation] = 
        useState<ProfileData | undefined>();

    useEffect(() => {
        if (!formData) return;
        setProfileInformation(formData?.attributes.profile);
        setProfileQuestions(formData?.attributes.profile?.profileQuestions || []);
    }, [formData])

    const updateProfileQuestions = async (profileQuestions: QuestionTemplate[]) => {
        if (!formData) return false;

        const requestBody = formData;
        if (!requestBody.attributes.profile) return false;
        requestBody.attributes.profile.profileQuestions = profileQuestions;

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
            title="Profile"
            content={(
                <div className="px-[30px] pt-5 pb-10">
                    <DefaultFields 
                        label="Education"
                        checkBoxLabel="Mandatory"
                        checkBoxDefaultValue={profileInformation?.education.mandatory}
                        toggleButtonDefaultValue={profileInformation?.education.show}
                    />
                    <DefaultFields 
                        label="Experience"
                        checkBoxLabel="Mandatory"
                        checkBoxDefaultValue={profileInformation?.experience.mandatory}
                        toggleButtonDefaultValue={profileInformation?.experience.show}
                    />
                    <DefaultFields 
                        label="Resume"
                        checkBoxLabel="Mandatory"
                        checkBoxDefaultValue={profileInformation?.resume.mandatory}
                        toggleButtonDefaultValue={profileInformation?.resume.show}
                        lastField
                    />

                    {profileQuestions.map((question, index) => (
                        <FormQuestion 
                            key={question.id}
                            question={question}
                            questionIndex={index}
                            existingQuestions={profileQuestions}
                            onEdit={updateProfileQuestions}
                            setQuestionsArray={setProfileQuestions}
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
                existingQuestions={profileQuestions}
                setShowPopup={setShowAddQuestionPopup} 
                onSave={updateProfileQuestions}
                setQuestionsArray={setProfileQuestions}
            />
        }
        </>
    );
}
 
export default Profile;