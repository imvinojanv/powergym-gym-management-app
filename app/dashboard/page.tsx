import UserRegistration from "@/components/user-registration";
import { UserButton } from "@clerk/nextjs";

const DashboardPage = () => {
  // Fetch the user registration data from the database

  // Check user already registered

  // If not, Write the logic to show the form (use boolean 'isCompleted' like this)

  return (
    <div>
      <div className="h-full text-2xl mt-12 flex flex-col justify-center items-center">
        Dashboard
        <UserRegistration />
      </div>
    </div>
  )
}

export default DashboardPage