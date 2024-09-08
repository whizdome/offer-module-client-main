import { FaSpinner } from "react-icons/fa6";

export default function Loading() {
	return (
		<div className="w-full min-h-screen flex flex-col justify-center items-center text-center">
			<h2 className="text-ap-grey-950 text-2xl font-semibold animate-spin">
				<FaSpinner />
			</h2>
		</div>
	);
}
