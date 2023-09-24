interface AppLayoutProps {
    children: React.ReactNode;
}
const AppLayout = ({children}: AppLayoutProps) => {
    const headerItems = ["Program Detail", "Application Form", "Workflow", "Preview"];

    return (  
        <div className="h-full w-full flex">
            <nav className="h-full flex flex-col justify-between py-12 px-10 shadow-[0px_4px_23px_0px_rgba(0,0,0,0.05)]">
                <div className="flex flex-col items-center">
                    <img src="/hamburger.svg" alt="Menu" />
                    <img 
                        src="/home.svg"
                        alt="Home" 
                        className="mt-[100px] mb-[45px] scale-[0.9]"
                    />
                    <img src="/document.svg" alt="Doc" className="scale-[0.9]" />
                </div>
                <div className="p-[6px] rounded-full bg-[#1D4ED8] font-bold text-white text-center">NT</div>
            </nav>
            <section className="grow pt-28 overflow-hidden">
                <div className="px-10 flex shadow-[0px_1px_18px_0px_rgba(0,0,0,0.12)] font-inter">
                    {headerItems.map((item, index) => (
                        <div 
                            key={index} 
                            className={`h-[130px] w-[280px] cursor-pointer flex items-center
                                ${index === 1 ? "bg-[#00635B] text-white nav-arrow" : "hover:opacity-80"}
                            `}
                        >
                            <div 
                                className={`h-[78px] w-full text-xl font-medium grid place-content-center
                                    ${index !== headerItems.length - 1 && "border-r border-[#C4C4C4]"}
                                `}
                            >
                                {item}
                            </div>
                        </div>
                    ))}
                </div>

                {children}
            </section>
        </div>
    );
}
 
export default AppLayout;