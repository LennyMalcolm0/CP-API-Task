import { SetStateAction } from "react";

interface QuestionChoiceProps {
    options: string[];
    setOptions: React.Dispatch<SetStateAction<string[]>>;
    enableOtherOption?: boolean;
}
const QuestionChoice = ({options, setOptions, enableOtherOption}: QuestionChoiceProps) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const value = event.target.value;
        const updatedOptions = [...options];
        updatedOptions[index] = value;
        setOptions(updatedOptions);
    };

    const addChoiceOption = (index: number) => {
        const newOptions = [ 
            ...options.slice(0, index + 1), 
            "", 
            ...options.slice(index + 1) 
        ];
        setOptions(newOptions);
    }

    const deleteChoiceOption = (optionIndex: number) => {
        if (options.length <= 1) return;
        
        const filteredOptions = options.filter((option, index) => {
            return index !== optionIndex ? option : null 
        })

        setOptions(filteredOptions);
    };

    return (  
        <div className="w-full mb-8">
            <label htmlFor="type" className="text-xl font-semibold pl-6">Choice</label>

            {options.map((option, index) => (
                <div key={index} className="w-full pr-8 flex items-center gap-3 mb-2">
                    <span 
                        onClick={() => deleteChoiceOption(index)} 
                        className="text-xl font-bold scale-x-[1.5] cursor-pointer"
                    >-</span>
                    <input 
                        type="text" 
                        placeholder="Type here"
                        value={option}
                        onChange={(e) => handleChange(e, index)}
                        className="w-full h-[68px] px-6 rounded-[5px] border border-black 
                        text-sm placeholder:text-[#979797] flex items-center justify-between mt-2" 
                    />
                    <span 
                        onClick={() => addChoiceOption(index)} 
                        className="text-xl font-semibold scale-[1.5] cursor-pointer"
                    >+</span>
                </div>
            ))}

            <span className="flex items-center gap-3 px-4 mt-5">
                <input 
                    type="checkbox" 
                    name="checkbox" 
                    defaultChecked={enableOtherOption === true}
                    value={"yes"}
                    className="accent-[#087B2F] scale-[1.3] z-[11]" 
                />
                <label htmlFor="checkbox" className="text-[15px]">Enable “Other” option</label>
            </span>
        </div>
    );
}
 
export default QuestionChoice;