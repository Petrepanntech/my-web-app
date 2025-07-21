import DashboardAuthWrapper from "@/components/auth/DashboardAuthWrapper";

export default function Page() {
    return (
        <DashboardAuthWrapper requiredRole="student">
            <div className="container py-8">
                <h1 className="text-3xl font-bold">Referrals & Wallet</h1>
            </div>
        </DashboardAuthWrapper>
    );
}
