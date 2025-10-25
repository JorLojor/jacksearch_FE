import { Link } from "react-router-dom";
import logo from "../assets/Logo.webp";
import { Button } from "./button";

export default function Navbar() {
	return (
		<header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-slate-200 transition-all duration-300">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
				<Link
					to="/"
					className="flex items-center gap-2 group"
				>
					<img
						src={logo}
						alt="Logo"
						className="h-8 w-8 rounded-2xl object-contain"
					/>
					<div className="leading-tight">
						<p className="font-semibold tracking-tight">Invix</p>
						<p className="text-[11px] text-slate-500">Digital Invitation</p>
					</div>
				</Link>

				<Button
					asChild
					className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-blue-700 transition-all"
				>
					<a
						href="https://wa.me/6285157609919?text=Halo%20Invix%2C%20saya%20ingin%20konsultasi%20undangan"
						target="_blank"
						rel="noopener noreferrer"
						className="flex items-center"
					>
						Contact Us
						<ArrowIcon />
					</a>
				</Button>
			</div>
		</header>
	);
}

function ArrowIcon() {
	return (
		<svg
			viewBox="0 0 24 24"
			className="h-4 w-4"
			aria-hidden="true"
			focusable="false"
		>
			<path
				fill="currentColor"
				d="m13.5 5-1.4 1.4L16.7 11H4v2h12.7l-4.6 4.6l1.4 1.4L21 12z"
			/>
		</svg>
	);
}
