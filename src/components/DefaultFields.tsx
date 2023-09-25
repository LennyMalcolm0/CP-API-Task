import ToggleButton from "./ToggleButton";

interface DefaultFieldsProps {
    label: string;
    labelDescription?: string;
    checkBoxLabel?: string;
    noInputs?: boolean;
    lastField?: boolean;
}
const DefaultFields = ({label, labelDescription, checkBoxLabel, noInputs, lastField}: DefaultFieldsProps) => {
    return (  
        <div className={`flex items-center justify-between pt-6 pb-7 ${!lastField && "border-b border-[#C4C4C4]"}`}>
            <div className="text-xl font-semibold">
                {label}
                <span className="text-[15px] font-normal pl-1">{labelDescription}</span>
            </div>
            {!noInputs &&
                <div className="flex items-center gap-[60px] text-[15px]">
                    <span className="flex items-center gap-[6px]">
                        <input 
                            type="checkbox" 
                            name="checkbox" 
                            value={"yes"}
                            className="accent-[#087B2F] scale-[1.3]" 
                        />
                        <label htmlFor="checkbox">{checkBoxLabel}</label>
                    </span>
                    
                    <ToggleButton checked />
                </div>
            }
        </div>
    );
}
 
export default DefaultFields;