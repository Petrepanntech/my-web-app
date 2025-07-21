import DashboardAuthWrapper from "@/components/auth/DashboardAuthWrapper";

export default function Page() {
    return (
        <DashboardAuthWrapper requiredRole="business">
            <div className="container py-8">
                <h1 className="text-3xl font-bold">MOU Management</h1>
            </div>
        </DashboardAuthWrapper>
    );
}
