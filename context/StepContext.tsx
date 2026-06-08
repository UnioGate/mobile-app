import { createContext, useContext, useState } from "react";

type StepContextType = {
    currentStep: number;
    setCurrentStep: (step: number) => void;
};

const StepContext = createContext<StepContextType | null>(null);

export const StepProvider = ({ children }: any) => {
    const [currentStep, setCurrentStep] = useState(1);

    return (
        <StepContext.Provider value={{ currentStep, setCurrentStep }}>
            {children}
        </StepContext.Provider>
    );
};

export const useStep = () => {
    const context = useContext(StepContext);
    if (!context) throw new Error("useStep must be used inside StepProvider");
    return context;
};