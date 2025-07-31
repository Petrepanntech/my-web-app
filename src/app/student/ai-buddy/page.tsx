
'use client';
import DashboardAuthWrapper from "@/components/auth/DashboardAuthWrapper";
import { ChatInterface } from "@/components/shared/ChatInterface";

export default function AIBuddyPage() {
    return (
         <DashboardAuthWrapper requiredRole="student">
            <div className="h-full flex flex-col bg-background">
               <ChatInterface initialActiveChatId="ai-buddy" />
            </div>
        </DashboardAuthWrapper>
    );
}
