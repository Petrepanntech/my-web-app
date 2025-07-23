import DashboardAuthWrapper from "@/components/auth/DashboardAuthWrapper";
import { ChatInterface } from "@/components/shared/ChatInterface";

export default function Page() {
    return (
        <DashboardAuthWrapper requiredRole="student">
           <ChatInterface isCommunity={true} />
        </DashboardAuthWrapper>
    );
}
