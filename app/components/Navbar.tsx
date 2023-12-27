"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

type Props = {};

const navItems = [
	{ id: "home", title: "Home", href: "/home" },
	{ id: "stories", title: "Stories", href: "/stories" },
	{ id: "images", title: "Images", href: "/images" },
	{ id: "profile", title: "Profile", href: "/profile" },
];

const Navbar = (props: Props) => {
	const pathname = usePathname();
	const { status } = useSession();

	console.log(pathname);

	const handleLogout = async () => {
		await signOut({ redirect: false, callbackUrl: "/" });
		// The user is signed out, you can perform additional actions if needed
	};

	return (
		<nav className='bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700'>
			<div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
				<Link
					href='/'
					className='flex items-center space-x-3 rtl:space-x-reverse'
				>
					<img
						src='https://flowbite.com/docs/images/logo.svg'
						className='h-8'
						alt='Flowbite Logo'
					/>
					<span className='self-center text-2xl font-semibold whitespace-nowrap dark:text-white'>
						StoryMap
					</span>
				</Link>
				<button
					data-collapse-toggle='navbar-multi-level'
					type='button'
					className='inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
					aria-controls='navbar-multi-level'
					aria-expanded='false'
				>
					<span className='sr-only'>Open main menu</span>
					<svg
						className='w-5 h-5'
						aria-hidden='true'
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 17 14'
					>
						<path
							stroke='currentColor'
							strokeLinecap='round'
							d='M1 1h15M1 7h15M1 13h15'
						/>
					</svg>
				</button>
				<div
					className='hidden w-full md:block md:w-auto'
					id='navbar-multi-level'
				>
					<ul className='flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700'>
						{navItems.map((item) => {
							return (
								<li key={item.id}>
									<Link
										href={item.href}
										className={`block py-2 px-3 ${
											pathname === item.href ? "text-blue-700" : "text-white"
										} hover:text-blue-700 ease-in-out duration-200`}
										aria-current='page'
									>
										{item.title}
									</Link>
								</li>
							);
						})}
						<li key='auth'>
							{status === "authenticated" ? (
								<button onClick={handleLogout}>Logout</button>
							) : (
								<Link href={"/api/auth/signin"}>Login</Link>
							)}
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
