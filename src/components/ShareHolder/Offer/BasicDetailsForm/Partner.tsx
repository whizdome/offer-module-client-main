import React, { FC, useState } from "react";
import AppSelect from "../../../inputs/AppSelect";
import TextInput from "../../../inputs/TextInput";
import AppButton from "../../../button";
import { ButtonState } from "../../../button/enum";
import { FaArrowRight, FaEdit, FaPlus } from "react-icons/fa";
import AddPartnerFormModal from "../../../modals/add-partner-form";
import { FaPencil } from "react-icons/fa6";
import { camelCaseToCapitalized } from "@/utils";
import { useCreateBasicDetailMutation } from "@/app/appApiSlice";

interface Props {
	handleProceed: () => void;
	notification: any;
}

interface IFormState {
	firstName: string;
	lastName: string;
	dateOfBirth: string;
	address: string;
	country: string;
	stateOfOrigin: string;
	city: string;
}

const BasicDetailsPartnerForm: FC<Props> = ({
	handleProceed,
	notification,
}) => {
	const [partnerModalOpen, setPartnerModalOpen] = React.useState(false);

	const [partnersList, setPartnersList] = React.useState<IFormState[]>([]);

	const [formState, setFormState] = React.useState<IFormState>({
		firstName: "",
		lastName: "",
		dateOfBirth: "",
		address: "",
		country: "",
		stateOfOrigin: "",
		city: "",
	});

	const [createBasicDetail, { isLoading }] = useCreateBasicDetailMutation();
	const openNotification = (text: string) => {
		notification.open({
			type: "error",
			content: text,
			duration: 5,
		});
	};

	const [editingIndex, setEditingIndex] = useState<number | null>(null);
	const handleEdit = (index: number, updatedPartner: IFormState) => {
		setPartnersList((prevList) =>
			prevList.map((partner, i) => (i === index ? updatedPartner : partner))
		);
		setFormState({
			firstName: "",
			lastName: "",
			dateOfBirth: "",
			address: "",
			country: "",
			stateOfOrigin: "",
			city: "",
		});
		setPartnerModalOpen(false);
		setEditingIndex(null);
	};

	const onSubmit = async () => {
		try {
			let payload = {
				basicDetailCommand: [...partnersList],
				saveForLater: false,
			};
			let res = (await createBasicDetail(payload)) as any;
			if (res?.error) {
				openNotification(res?.error?.data.description || "An Error Occured");
			} else {
				handleProceed();
			}
		} catch (error) {
			console.log("Caught Error: ", JSON.stringify(error)); // Debug
		}
	};

	return (
		<div className="sm:w-[486px] w-full px-4 space-y-4  ">
			<AddPartnerFormModal
				open={partnerModalOpen}
				handleCancel={() => {
					setPartnerModalOpen(false);
				}}
				loading={false}
				handleOk={() => {
					if (editingIndex !== null) {
						handleEdit(editingIndex, formState);
						return;
					}
					setPartnersList([...partnersList, formState]);
					setFormState({
						firstName: "",
						lastName: "",
						dateOfBirth: "",
						address: "",
						country: "",
						stateOfOrigin: "",
						city: "",
					});
					setPartnerModalOpen(false);
				}}
				formState={formState}
				setFormState={setFormState}
			/>
			<div className=" bg-white border border-ap-grey-100 shadow-xl ">
				<div className="px-6 py-4">
					<p className="text-ap-grey-950 text-lg font-semibold mt-2">
						Basic details
					</p>
					<p className="text-ap-grey-700 mt-1 mb-6">
						Kindly fill in the information below.
					</p>

					{/* <DetailsForm formState={formState} setFormState={setFormState} /> */}

					<PartnersList
						partnersList={partnersList}
						openPartnerModal={() => {
							setPartnerModalOpen(true);
						}}
						setFormState={setFormState}
						setEditingIndex={setEditingIndex}
					/>

					<AddPartnerButton
						openPartnerModal={() => {
							setFormState({
								firstName: "",
								lastName: "",
								dateOfBirth: "",
								address: "",
								country: "",
								stateOfOrigin: "",
								city: "",
							});
							setEditingIndex(null);
							setPartnerModalOpen(true);
						}}
					/>
				</div>

				<div className="border-t border-t-[#EDEEF1] py-6 flex justify-end items-center px-6">
					<AppButton
						value={"Proceed"}
						className="ml-auto"
						iconTwo={<FaArrowRight />}
						onClick={onSubmit}
						isLoading={isLoading}
						disabled={isLoading}
					/>
				</div>
			</div>
		</div>
	);
};

export default BasicDetailsPartnerForm;

const AddPartnerButton = ({
	openPartnerModal,
}: {
	openPartnerModal: () => void;
}) => {
	return (
		<>
			<div
				className="flex items-center gap-2 cursor-pointer py-2 text-ap-grey-700 "
				onClick={openPartnerModal}
			>
				<FaPlus size={17} />
				<p className="">Add partner</p>
			</div>
		</>
	);
};

const PartnersList = ({
	partnersList,
	openPartnerModal,
	setFormState,
	setEditingIndex,
}: {
	partnersList: IFormState[];
	openPartnerModal: () => void;
	setFormState: React.Dispatch<React.SetStateAction<IFormState>>;
	setEditingIndex: React.Dispatch<React.SetStateAction<number | null>>;
}) => {
	return (
		<div>
			{partnersList.map((partner, index) => (
				<div key={index} className="mb-6">
					<div className="flex gap-4 items-center mb-3">
						<p className="text-ap-grey-950">Partner {index + 1}</p>

						<div
							className="flex items-center gap-1 cursor-pointer py-2 text-ap-green "
							onClick={() => {
								openPartnerModal();
								setEditingIndex(index);
								setFormState(partner);
							}}
						>
							<FaPencil />
							<p>Edit</p>
						</div>
					</div>
					<div className="grid grid-cols-2 gap-5 ">
						{Object.entries(partner).map(([key, value]) => (
							<div key={key} className="flex flex-col">
								<p className="text-sm text-ap-grey-500 font-normal">
									{camelCaseToCapitalized(key)}
								</p>
								<p className="font-medium text-ap-grey-950">{value}</p>
							</div>
						))}
					</div>
				</div>
			))}
		</div>
	);
};
