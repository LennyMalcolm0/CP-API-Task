interface CardContainerProps {
    title: string;
    content: React.ReactNode;
}
const CardContainer = ({title, content}: CardContainerProps) => {
    return (  
        <div className="w-[595px] rounded-[20px] overflow-hidden shadow-[3px_3px_14px_0px_rgba(190,190,190,0.30)]">
            <div className="w-full p-8 text-[25px] font-semibold capitalize bg-[#D0F7FA]">{title}</div>
            <div className="w-full">
                {content}
            </div>
        </div>
    );
}
 
export default CardContainer;