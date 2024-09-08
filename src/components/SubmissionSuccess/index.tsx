import React from "react";
import SuccessCheck from "@/assets/svg/green-check.svg";
import GooglePlayIcon from "@/assets/svg/google-play.svg";
import AppleIcon from "@/assets/svg/apple-icon.svg";
import AppButton from "../button";
import invearnPhoneGroup from "@/assets/img/invearn-phone-group.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AppImage from "../AppImage";

const SubmissionSuccess = () => {
	const router = useRouter();
	return (
		<div className="md:w-[421px] w-[90%] bg-white border border-grey-100 shadow-xl">
			<div className="px-6 py-8 flex flex-col items-center">
				<SuccessCheck />
				<p className="font-semibold text-xl text-ap-grey-950 mt-3">
					Submission Successful
				</p>
				<p className="text-ap-grey-700 text-center">
					You application has been submitted successfully and awaiting approval
					from regulatory body (SEC).{" "}
					<span className="text-ap-grey-950 font-medium">
						Proceed to your email to view your application receipt
					</span>
				</p>
			</div>
			<div className="bg-[#E7E8E0] pt-6 px-8 flex flex-col items-center">
				<p className="font-semibold text-lg text-ap-grey-950 text-center">
					Download Invearn Mobile app to track your{" "}
					<span className="text-ap-success"> Share</span>
				</p>
				<div className="flex gap-2 mt-5 mb-8">
					<Link
						href="market://details?id=com.africaprudential.invearn&showAllReviews=true"
						target="_blank"
					>
						<AppButton
							value={"Google Play"}
							icon={<GooglePlayIcon />}
							className="bg-[#252627]"
						/>
					</Link>
					<Link
						href="itms-apps://itunes.apple.com/app/viewContentsUserReviews/id6474125659?action=write-review"
						target="_blank"
					>
						<AppButton
							value={"App Store"}
							icon={<AppleIcon />}
							className="bg-[#252627]"
						/>
					</Link>
				</div>

				<AppImage
					src={invearnPhoneGroup}
					width={300}
					height={300}
					alt="invearn-phone-group"
				/>
			</div>
		</div>
	);
};

export default SubmissionSuccess;
