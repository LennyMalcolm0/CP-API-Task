import ToggleButton from './ToggleButton';

interface DefaultFieldsProps {
    label: string;
    labelDescription?: string;
    checkBoxLabel?: string;
    checkBoxDefaultValue?: boolean;
    toggleButtonDefaultValue?: boolean;
    noInputs?: boolean;
    lastField?: boolean;
}
const DefaultFields = (props: DefaultFieldsProps) => {
    return (  
        <div className={`flex items-center justify-between pt-6 pb-7 ${!props.lastField && "border-b border-[#C4C4C4]"}`}>
            <div className="text-xl font-semibold">
                {props.label}
                <span className="text-[15px] font-normal pl-1">{props.labelDescription}</span>
            </div>
            {!props.noInputs &&
                <div className="flex items-center gap-[60px] text-[15px]">
                    <span className="flex items-center gap-[6px]">
                        <input 
                            type="checkbox" 
                            name="checkbox" 
                            value={"yes"}
                            defaultChecked={props.checkBoxDefaultValue === true}
                            className="accent-[#087B2F] scale-[1.3]" 
                        />
                        <label htmlFor="checkbox">{props.checkBoxLabel}</label>
                    </span>
                    
                    <ToggleButton checked={props.toggleButtonDefaultValue === true} />
                </div>
            }
        </div>
    );
}
 
export default DefaultFields;