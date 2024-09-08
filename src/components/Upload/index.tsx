import React from "react";
import { FiUpload } from "react-icons/fi";
import type { UploadProps } from "antd";
import { message, Upload } from "antd";

interface Props {
	multiple?: boolean;
	files: any;
	setFiles: any;
}
const { Dragger } = Upload;

const FileUpload: React.FC<Props> = ({ multiple = false, files, setFiles }) => {
	const beforeUpload = (file: any) => {
		const isJpgOrPngOrPdf = [
			"image/jpeg",
			"image/png",
			"application/pdf",
		].includes(file.type);
		if (!isJpgOrPngOrPdf) {
			message.error("You can only upload JPG/PNG/PDF files!");
			return false;
		}
		const isLt3M = file.size / 1024 / 1024 < 3;
		if (!isLt3M) {
			message.error("File must be smaller than 3MB!");
			return false;
		}
		return true;
	};

	const props: UploadProps = {
		name: "file",
		multiple: true,
		accept: "image/*,.pdf",
		defaultFileList: files,
		fileList: files,
		beforeUpload,
		listType: "picture",
		onChange(info) {
			let temp = [...info.fileList];
			// if (info?.file?.size && info?.file?.size / 1024 / 1024 > 1) {
			// 	temp = temp.filter((item) => item.uid !== info.file.uid); // Update temp with filtered items
			// }
			if (multiple) {
				setFiles(temp);
			} else {
				if (info.fileList.length > 0) {
					setFiles([info.file]);
				} else {
					setFiles([]);
				}
			}
		},
		onDrop(e) {
			console.log("Dropped files", e.dataTransfer.files);
		},
	};
	return (
		<Dragger {...props}>
			<p className="text-ap-green flex justify-center mb-3">
				<FiUpload size={16} />
			</p>
			<p className="text-ap-grey-900 text-sm font-medium">
				Drag to Drop or <span className="text-ap-green">choose file</span> to
				upload
			</p>
			<p className="text-ap-grey-400 font-normal text-[11px]">
				PNG, JPG, PDF | 3MB max.
			</p>
		</Dragger>
	);
};

export default FileUpload;
