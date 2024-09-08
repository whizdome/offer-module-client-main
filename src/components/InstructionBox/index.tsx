import { FaRegCheckCircle } from "react-icons/fa";

const InstructionBox = ({ instructions }: { instructions: string[] }) => {
	return (
		<div className="bg-white border border-ap-grey-100 shadow-xl px-6 py-4 flex flex-col gap-2">
			{instructions.map((item, idx) => (
				<div className="flex gap-2 items-center" key={idx}>
					<FaRegCheckCircle size={19} color="#43BA00" />
					<p className="text-ap-grey-700 flex-1">{item}</p>
				</div>
			))}
		</div>
	);
};

export default InstructionBox;
