"use client";

interface Props {
	icon: React.JSX.Element;
	list: ListProps[];
}

interface ListProps {
	title?: string;
	description?: React.JSX.Element;
}

const InfoBox: React.FC<Props> = ({ icon, list }) => {
	return (
		<div className="bg-white border border-ap-grey-100 shadow-xl px-6 py-4 flex flex-col gap-4">
			{list.map((item: ListProps, idx: number) => (
				<div className="flex gap-2" key={idx}>
					<div className="">{icon}</div>
					<div className="">
						<p className="text-ap-grey-800 text-lg font-medium">
							{item?.title}
						</p>
						<p className="text-ap-grey-400">{item?.description}</p>
					</div>
				</div>
			))}
		</div>
	);
};

export default InfoBox;
