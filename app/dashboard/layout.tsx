import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";

const DashboardLayout = ({
    children
}: {
    children: React.ReactNode
}) => {
    return (
        <div className="relative bg-[#F1F5F9] min-h-screen">
            <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0">
                <Sidebar />
            </div>
            <main className="h-full md:pl-72">
                <Navbar />
                {children}
            </main>
        </div>
    )
}

export default DashboardLayout;