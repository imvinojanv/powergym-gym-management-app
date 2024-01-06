"use client"

import Image from "next/image";
import Link from "next/link";
import { usePathname } from 'next/navigation'

const sidebarLinks = [
    { href: '/dashboard', label: 'Overview', icon: `/icons/dashboard.svg` },
    { href: '/workout', label: 'Workout', icon: `/icons/workout.svg` },
    { href: '/diet-plan', label: 'Diet Plan', icon: `/icons/diet-plan.svg` },
    { href: '/attendance', label: 'Attendance', icon: `/icons/attendance.svg` },
    { href: '/goal', label: 'Goal', icon: `/icons/goal.svg` },
    { href: '/schedule', label: 'Schedule', icon: `/icons/schedule.svg` },
    { href: '/progres', label: 'Progres', icon: `/icons/progres.svg` },
]

const Sidebar = () => {
    const pathname = usePathname();

    return (
        <div className="space-y-4 pt-4 flex flex-col h-full bg-white text-[#475569] app__sidebar">
            <div className="p-6 flex-1">
                <Link href="/dashboard" className='flex justify-center items-center mb-9'>
                    <div className="relative">
                        <Image
                            src='/images/logo.png'
                            alt="Logo"
                            width={220}
                            height={220}
                        />
                    </div>
                </Link>
                <hr className="mb-9 border-[#E2E8F0] border-b-[1.5px] rounded-md" />
                <div className="space-y-2">
                    {sidebarLinks.map((route) => (
                        <Link
                            href={route.href}
                            key={route.href}
                            className={`
                            text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:bg-[#47556926] rounded-lg
                            ${pathname === route.href && 'text-white bg-[#F97316] hover:bg-[#F97316]'}
                        `}
                        >
                            <div className='flex items-center flex-1 font-medium'>
                                <Image src={route.icon} alt="" width={20} height={20} className={`h-5 w-5 mr-3 ${pathname === route.href && 'app__active-sidebar-icon'}`} />
                                {route.label}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <Link href='/upgrade' className="p-3">
                <Image
                    src='/images/upgrade.png'
                    alt="Upgrade"
                    width={200}
                    height={200}
                    className="w-full"
                />
            </Link>
            {/* <div className="p-6">
            <div className={`
                    text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:bg-[#47556926] rounded-lg
                    ${pathname === '/support' && 'text-white bg-[#F97316] hover:bg-[#F97316]'}
                `}
            >
                <div className='flex items-center flex-1 font-medium'>
                    <Image src={support} className={`h-5 w-5 mr-3 ${pathname === '/support' && 'app__active-sidebar-icon'}`}/>
                    Support
                </div>
            </div>
        </div> */}
        </div>
    )
}

export default Sidebar