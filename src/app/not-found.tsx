import Link from "next/link";

export default function NotFound() {
	return (
		<div className="w-full min-h-screen flex flex-col justify-center items-center text-center">
			<h2 className="text-ap-grey-950 text-2xl font-semibold">Not Found</h2>
			<p className="text-ap-grey-500 text-base font-medium">
				Could not find requested resource
			</p>
			<Link href="/">Return Home</Link>
		</div>
	);
}
