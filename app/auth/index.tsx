import { StepProvider } from "@/context/StepContext";
import AuthLayout from "./AuthLayout";



export default function Index() {
    return (
        <StepProvider>
            <AuthLayout />
        </StepProvider>
    );
}