import DashboardAuthWrapper from "@/components/auth/DashboardAuthWrapper";

export default function Page() {
    return (
        <DashboardAuthWrapper requiredRole="instructor">
            <div className="container py-8">
                <h1 className="text-3xl font-bold">My Students</h1>
            </div>
        </DashboardAuthWrapper>
    );
}
