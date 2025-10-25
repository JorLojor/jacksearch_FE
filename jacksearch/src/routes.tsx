import { lazy, Suspense } from "react";
import { createBrowserRouter, Outlet } from "react-router-dom";

// import Navbar from "./components/Navbar";

const HomePage = lazy(() => import("./pages/home/index"));
const NotFoundPage = lazy(() => import("./pages/not-found"));

function RootLayout() {
	return (
		<div className="min-h-screen bg-gray-50 text-gray-900">
			{/* <Navbar /> */}
			<main>
				<Outlet />
			</main>
		</div>
	);
}

function Loader({ children }: { children: React.ReactNode }) {
	return (
		<Suspense fallback={<div className="p-6 text-center">Loading…</div>}>
			{children}
		</Suspense>
	);
}

export const router = createBrowserRouter([
	{
		path: "/",
		element: (
			<Loader>
				<RootLayout />
			</Loader>
		),
		errorElement: (
			<Loader>
				<NotFoundPage />
			</Loader>
		),
		children: [
			{
				index: true,
				element: (
					<Loader>
						<HomePage />
					</Loader>
				),
			},
			{
				path: "*",
				element: (
					<Loader>
						<NotFoundPage />
					</Loader>
				),
			},
		],
	},
]);
