import Link from "next/link"

export default function Home() {
  return (
    <div className="flex justify-center flex-col items-center">
        <h2>LandingPage</h2>
        <Link href='/dashboard'>
            <button className="p-3 bg-green-500 mt-10">
                Go to Dashboard
            </button>
        </Link>
    </div>
  )
}
