import CardContainer from "../components/CardContainer";
import DefaultFields from "../components/DefaultFields";

const PersonalInformation = () => {
    return (  
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
                    />
                    <DefaultFields 
                        label="Nationality"
                        checkBoxLabel="Internal"
                    />
                    <DefaultFields 
                        label="Current Residence"
                        checkBoxLabel="Internal"
                    />
                    <DefaultFields 
                        label="ID Number"
                        checkBoxLabel="Internal"
                    />
                    <DefaultFields 
                        label="Date of Birth"
                        checkBoxLabel="Internal"
                    />
                    <DefaultFields 
                        label="Gender"
                        checkBoxLabel="Internal"
                        lastField
                    />
                    <div className="w-fit flex items-center gap-3 text-[15px] font-semibold mt-3 cursor-pointer">
                        <img src="/plus.svg" alt="Plus" className="h-5" />
                        <span>Add a question</span>
                    </div>
                </div>
            )}
        />
    );
}
 
export default PersonalInformation;