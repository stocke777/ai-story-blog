import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import ContextProvider from "./context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<ContextProvider>
				<body className={inter.className}>
					<Navbar />
					<div className='w-full mb-4 max-w-[1560px] mx-auto'>{children}</div>
				</body>
			</ContextProvider>
		</html>
	);
}
