"use client";
import React from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
export default function Home() {
	const { data: session, status } = useSession();
	console.log(session, status);
	React.useEffect(() => {
		console.log(session);
	}, [session]);
	return (
		<main className='flex min-h-screen flex-col items-center justify-center p-24'>
			<div><>Main Page - {session?.user?.username || "NO USER FOUND"}</></div>
		</main>
	);
}
