import CardContainer from "../components/CardContainer";

const AdditionalQuestions = () => {
    return (  
        <CardContainer
            title="Additional Questions"
            content={(
                <div className="px-[30px] pt-5 pb-10">
                    <div className="w-fit flex items-center gap-3 text-[15px] font-semibold mt-3 cursor-pointer">
                        <img src="/plus.svg" alt="Plus" className="h-5" />
                        <span>Add a question</span>
                    </div>
                </div>
            )}
        />
    );
}
 
export default AdditionalQuestions;