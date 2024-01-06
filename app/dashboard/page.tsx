import { UserButton } from "@clerk/nextjs";

const DashboardPage = () => {
  return (
    <div>
      DashboardPage
      <UserButton afterSignOutUrl="/"/>
    </div>
  )
}

export default DashboardPage