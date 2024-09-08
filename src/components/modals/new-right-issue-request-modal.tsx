import { Modal } from "antd";
import React, { FC, useState } from "react";

export interface IProps {
	open: boolean;
	handleOk: () => void;
	handleCancel: () => void;
}

const BrokerNewRightRequestModal: FC<IProps> = ({
	open,
	handleOk,
	handleCancel,
}) => {
	const [isInValid, setIsInValid] = useState(false);
	const userInformation = {
		"Full Name": "Victor Gaga",
		"Registrar Account Number": "1234567890",
		"Right due": "450",
		"Total qualifying unit": "450",
		"Total amount due": "450",
	};

	return (
		<Modal
			open={open}
			width={424}
			onOk={handleOk}
			onCancel={handleCancel}
			footer={null}
		></Modal>
	);
};

export default BrokerNewRightRequestModal;
