import type { CSSProperties } from "react";
import React from "react";
import type { CollapseProps } from "antd";
import { Collapse, theme } from "antd";
import { FaChevronDown } from "react-icons/fa6";

interface Props {
	selected: string;
}

const generalItems: (panelStyle: CSSProperties) => CollapseProps["items"] = (
	panelStyle
) => [
	{
		key: "1",
		label: (
			<span className="text-ap-grey-600 font-medium">
				What is Invearn Marketplace?
			</span>
		),
		children: (
			<span className="text-ap-grey-400 font-normal">
				Invearn Marketplace is a cutting-edge platform designed to revolutionize
				your investment experience. This platform enables users to invest in
				shares of publicly traded companies directly from the comfort of their
				home. The Invearn Marketplace is driven by the leading Share
				Registration and Data Management provider AFRICA PRUDENTIAL PLC,
				regulated and licenced by Securities and Exchange Commission (SEC)
			</span>
		),
		style: panelStyle,
	},
	{
		key: "2",
		label: (
			<span className="text-ap-grey-600 font-medium">
				Who can trade on Invearn Marketplace?
			</span>
		),
		children: (
			<span className="text-ap-grey-400 font-normal">
				Any person above 18 years of age is eligible to subscribe to an offer.
				Applicants must have a valid BVN to register and subscribe to an Offer.
				However, applicants can apply for their minor but must purchase with
				their valid custodian details.
			</span>
		),
		style: panelStyle,
	},
	{
		key: "3",
		label: (
			<span className="text-ap-grey-600 font-medium">
				Is my personal and financial information secure on Invearn Marketplace?
			</span>
		),
		children: (
			<span className="text-ap-grey-400 font-normal">
				Invearn Marketplace adheres to the data regulatory policies to safeguard
				your personal and financial data in line with the SEC regulatory
				guidelines
			</span>
		),
		style: panelStyle,
	},
	{
		key: "4",
		label: (
			<span className="text-ap-grey-600 font-medium">
				Do I still need to register on Invearn Marketplace if I am currently
				using the Invearn Mobile App?
			</span>
		),
		children: (
			<span className="text-ap-grey-400 font-normal">
				No, you can login with your invearn mobile username and password.
			</span>
		),
		style: panelStyle,
	},
	{
		key: "5",
		label: (
			<span className="text-ap-grey-600 font-medium">
				How do I contact Customer Support?
			</span>
		),
		children: (
			<span className="text-ap-grey-400 font-normal">
				You can send email to the support team at enquiries@invearn.com
			</span>
		),
		style: panelStyle,
	},
];

const offerItems: (panelStyle: CSSProperties) => CollapseProps["items"] = (
	panelStyle
) => [
	{
		key: "1",
		label: (
			<span className="text-ap-grey-600 font-medium">
				How will the shares be sold?
			</span>
		),
		children: (
			<span className="text-ap-grey-400 font-normal">
				The shares are being sold through an offer for sale to the public. The
				duration of sales is dependent on the company listing the offer of
				interest.
			</span>
		),
		style: panelStyle,
	},
	{
		key: "2",
		label: (
			<span className="text-ap-grey-600 font-medium">How much is a share?</span>
		),
		children: (
			<span className="text-ap-grey-400 font-normal">
				The price for each share is dependent on the offer of interest.
			</span>
		),
		style: panelStyle,
	},
	{
		key: "3",
		label: (
			<span className="text-ap-grey-600 font-medium">
				How many shares are being offered in this round?
			</span>
		),
		children: (
			<span className="text-ap-grey-400 font-normal">
				Shares available for purchase are dependent on the specific live offer
				you are interested in
			</span>
		),
		style: panelStyle,
	},
	{
		key: "4",
		label: (
			<span className="text-ap-grey-600 font-medium">
				How is demand determined?
			</span>
		),
		children: (
			<span className="text-ap-grey-400 font-normal">
				Demand for the Offer is the total volume of shares applied for and paid
				for by investors at the close of the Offer. If demand exceeds supply,
				i.e. the total volume exceeds the number of shares that have been
				offered, then the Offer is deemed to have been oversubscribed.
			</span>
		),
		style: panelStyle,
	},
	{
		key: "5",
		label: (
			<span className="text-ap-grey-600 font-medium">
				How long is the Offer open?
			</span>
		),
		children: (
			<span className="text-ap-grey-400 font-normal">
				The offer duration is dependent on the listed company and your offer of
				choice.
			</span>
		),
		style: panelStyle,
	},
	{
		key: "6",
		label: (
			<span className="text-ap-grey-600 font-medium">
				Who can Subscribe to the offer?
			</span>
		),
		children: (
			<span className="text-ap-grey-400 font-normal">
				Any person above 18 years of age is eligible to subscribe to an offer.
				Applicants must have a valid BVN to register and subscribe to Primary
				Offer.
			</span>
		),
		style: panelStyle,
	},
	{
		key: "7",
		label: (
			<span className="text-ap-grey-600 font-medium">
				{`I don't have a CHN and/or CSCS, can I still apply?`}
			</span>
		),
		children: (
			<span className="text-ap-grey-400 font-normal">
				Yes, if you do not have a CHN and/or CSCS account, one will be generated
				for you as part of the subscription process on Primary Offer.
			</span>
		),
		style: panelStyle,
	},
	{
		key: "8",
		label: (
			<span className="text-ap-grey-600 font-medium">
				I already have a CHN and CSCS account, what do l do?
			</span>
		),
		children: (
			<span className="text-ap-grey-400 font-normal">
				If you have a CHN and CSCS account, simply input your details in the
				relevant field and follow the offer payment process.
			</span>
		),
		style: panelStyle,
	},
	{
		key: "9",
		label: (
			<span className="text-ap-grey-600 font-medium">
				I live abroad, I am Nigerian, can I subscribe? How?
			</span>
		),
		children: (
			<span className="text-ap-grey-400 font-normal">
				Yes, you can subscribe with your valid BVN.
			</span>
		),
		style: panelStyle,
	},
	{
		key: "10",
		label: (
			<span className="text-ap-grey-600 font-medium">
				Where will my Dividend be paid to?
			</span>
		),
		children: (
			<span className="text-ap-grey-400 font-normal">
				Bank details for Dividend payment will be collected at subscription for
				future e-payments
			</span>
		),
		style: panelStyle,
	},
	{
		key: "11",
		label: (
			<span className="text-ap-grey-600 font-medium">How can I subscribe?</span>
		),
		children: (
			<span className="text-ap-grey-400 font-normal">
				Follow these steps to successfully subscribe to a public offer: <br />
				1. Go to offer.invearn.com and click on Get started.
				<br />
				2. Choose a Public Offer: Browse through the available public offers and
				select the one you want to subscribe to.
				<br />
				{`3. Select Shareholder Option: Choose the "Shareholder" option to
				Register.`}
				<br />
				{`4. Sign Up: If you don't have an account, sign up by providing your
				basic information and verifying your contact details. If you already
				have an account, skip this step.`}
				<br />
				5. Sign In: After signing up or if you already have an account, sign in
				to continue.
				<br />
				6. Provide Personal Details: Enter your BVN (Bank Verification Number),
				basic information, Next of Kin details, and your bank account details.
				<br />
				7. Specify Share Purchase Details: Indicate the number of shares you
				wish to purchase.
				<br />
				8. Make Payment: Complete the process by making payment.
			</span>
		),
		style: panelStyle,
	},
	{
		key: "12",
		label: (
			<span className="text-ap-grey-600 font-medium">
				Can I submit multiple subscriptions?
			</span>
		),
		children: (
			<span className="text-ap-grey-400 font-normal">
				You can submit multiple applications within the offer period, but they
				will be collated into one application request once the offer window has
				closed.
			</span>
		),
		style: panelStyle,
	},
	{
		key: "13",
		label: (
			<span className="text-ap-grey-600 font-medium">
				Can I change my subscription after I have submitted it?
			</span>
		),
		children: (
			<span className="text-ap-grey-400 font-normal">
				You cannot cancel or reduce the size of a subscription after payment has
				been made. However, if you would like to increase the size of your
				subscriptions before the Offer closes, you can log back into your
				account to top up on your offer and proc ed to make payment. All
				submissions and payments made under your profile before the Offer closes
				will be aggregated as one subscription under your name. Also, if you
				have not submitted your subscription, you can modify or update your
				offer subscription before the Offer closes.
			</span>
		),
		style: panelStyle,
	},
	{
		key: "14",
		label: (
			<span className="text-ap-grey-600 font-medium">
				Can I cancel my subscription?
			</span>
		),
		children: (
			<span className="text-ap-grey-400 font-normal">
				The subscription is deemed complete once payment has been made and the
				subscription confirmed submitted. Please contact the email support team
				enquiries@invearn.com if you have any issues regarding your submission.
			</span>
		),
		style: panelStyle,
	},
	{
		key: "15",
		label: (
			<span className="text-ap-grey-600 font-medium">
				Is there a minimum quantity I can apply for and/or buy? If so, what is
				the minimum?
			</span>
		),
		children: (
			<span className="text-ap-grey-400 font-normal">
				The minimum quantity of shares you can apply for depends on the offer of
				your choosing.
			</span>
		),
		style: panelStyle,
	},
	{
		key: "16",
		label: (
			<span className="text-ap-grey-600 font-medium">
				Is there a maximum quantity I can apply for and/or buy?
			</span>
		),
		children: (
			<span className="text-ap-grey-400 font-normal">
				The maximum quantity of shares you can apply for depends on the offer of
				your choosing
			</span>
		),
		style: panelStyle,
	},
	{
		key: "17",
		label: (
			<span className="text-ap-grey-600 font-medium">
				Will I receive the full amount of shares subscribed for?
			</span>
		),
		children: (
			<span className="text-ap-grey-400 font-normal">
				The allotment of shares is determined based on the level of demand for
				the Offer. If the level of demand exceeds the size of the Offer, then
				the listed company may increase the size of the Offer by up to 15%.
				However, if demand is considerably greater than supply (even after
				accommodating the additional 15%6), then investors will be granted the
				minimum application of 20 shares in full, following which the remaining
				balance shall be allotted proportionately amongst applicants.
			</span>
		),
		style: panelStyle,
	},
	{
		key: "18",
		label: (
			<span className="text-ap-grey-600 font-medium">
				When will the shares be credited to my CSCS account?
			</span>
		),
		children: (
			<span className="text-ap-grey-400 font-normal">
				The CSCS accounts of successful investors will be credited no later than
				fifteen (15) Working days from the Allotment Date.
			</span>
		),
		style: panelStyle,
	},
	{
		key: "19",
		label: (
			<span className="text-ap-grey-600 font-medium">
				How can I track my offer?
			</span>
		),
		children: (
			<span className="text-ap-grey-400 font-normal">
				After successful allotment of your share, you can track your shares
				through the registrar assigned to the company that sold the shares. You
				can visit the NGX website to confirm the assigned registrar to your
				share company.
			</span>
		),
		style: panelStyle,
	},
	{
		key: "20",
		label: (
			<span className="text-ap-grey-600 font-medium">
				How will I receive my returned money?
			</span>
		),
		children: (
			<span className="text-ap-grey-400 font-normal">
				Returned monies will be transferred to the account number stated on your
				subscription within five (5) working days of the Allotment Date.
				<br />
				{`I am unable to create an investment account as I got an error message
				'Failed BVN validation'`}
				<br />
				{`Please ensure that you have input the correct BVN details or contact
				your bank's customer care for further assistance and validation.`}
			</span>
		),
		style: panelStyle,
	},
	{
		key: "21",
		label: (
			<span className="text-ap-grey-600 font-medium">
				Could you please provide a step-by-step guide on how to register and
				apply for shares using the Invearn Marketplace app?
			</span>
		),
		children: (
			<span className="text-ap-grey-400 font-normal">
				Follow these steps to successfully subscribe to a public offer:
				<br />
				1. Go to offer.invearn.com and click on Get started
				<br />
				2. Choose a Public Offer: Browse through the available public offers and
				select the one you want to subscribe to.
				<br />
				{`3. Select Shareholder Option: Choose the "Shareholder" option to
				Register`}
				<br />
				{`4. Sign Up: If you don't have an account, sign up by providing your
				basic information and verifying your contact details. If you already
				have an account, skip this step.`}
				<br />
				5. Sign In: After signing up or if you already have an account, sign in
				to continue.
				<br />
				6. Provide Personal Details: Enter your BVN (Bank Verification Number),
				basic information, Next of Kin details, and your bank account details.
				<br />
				7. Specify Share Purchase Details: Indicate the number of shares you
				wish to purchase.
				<br />
				8. Make Payment: Complete the process by making payment.
			</span>
		),
		style: panelStyle,
	},
	{
		key: "22",
		label: (
			<span className="text-ap-grey-600 font-medium">
				I got a failed error response after funding but was debited
			</span>
		),
		children: (
			<span className="text-ap-grey-400 font-normal">
				Reversal of funds typically takes 24 working hours. However, you may
				need to contact your bank for further assistance.
			</span>
		),
		style: panelStyle,
	},
	{
		key: "23",
		label: (
			<span className="text-ap-grey-600 font-medium">
				How will I know if my transaction is successful?
			</span>
		),
		children: (
			<span className="text-ap-grey-400 font-normal">
				If you subscribe through Invearn Marketplace, you will receive
				confirmation via email advising that your application has been
				successfully submitted.
			</span>
		),
		style: panelStyle,
	},
];

const glossaryItems: (panelStyle: CSSProperties) => CollapseProps["items"] = (
	panelStyle
) => [
	{
		key: "1",
		label: (
			<span className="text-ap-grey-600 font-medium">
				What is a Public Offer?
			</span>
		),
		children: (
			<span className="text-ap-grey-400 font-normal">
				A public offer is when a listed company offers shares for sale to the
				public. The goal of public offers is to raise capital for the issuing
				company and provide investment opportunities to the public.
			</span>
		),
		style: panelStyle,
	},
	{
		key: "2",
		label: (
			<span className="text-ap-grey-600 font-medium">What is the process?</span>
		),
		children: (
			<span className="text-ap-grey-400 font-normal">
				When a company wants to conduct a public offer, the company must apply
				to the Securities and Exchange Commission (SEC), which approves the
				structure and terms of the offer. Once approval has been received, the
				company announces its intention to conduct an offer to the market and
				invites the public to participate.
			</span>
		),
		style: panelStyle,
	},
	{
		key: "3",
		label: (
			<span className="text-ap-grey-600 font-medium">
				Who are the Issuing Houses?
			</span>
		),
		children: (
			<span className="text-ap-grey-400 font-normal">
				Issuing houses are financial institutions, often investment banks or
				specialized securities firms, that assist companies in bringing
				securities to the market. They play a crucial role in the process of
				initial public offerings (IPOs) and other types of securities offerings.
			</span>
		),
		style: panelStyle,
	},
	{
		key: "4",
		label: (
			<span className="text-ap-grey-600 font-medium">
				Who are the Registrars?
			</span>
		),
		children: (
			<span className="text-ap-grey-400 font-normal">
				{`Share registrars, also known simply as registrars, are entities
				responsible for maintaining the records of a company's shareholders.
				They serve as intermediaries between the company and its shareholders,
				handling various administrative tasks related to share ownership.`}
			</span>
		),
		style: panelStyle,
	},
	{
		key: "5",
		label: (
			<span className="text-ap-grey-600 font-medium">
				What is the current market price?
			</span>
		),
		children: (
			<span className="text-ap-grey-400 font-normal">
				Shares continue to be traded on NGX, and the current market price is
				based on the listed company
			</span>
		),
		style: panelStyle,
	},
	{
		key: "6",
		label: (
			<span className="text-ap-grey-600 font-medium">
				What is a CSCS Account?
			</span>
		),
		children: (
			<span className="text-ap-grey-400 font-normal">
				The CSCS (Central Securities Clearing System) is a computerized
				depository system responsible for clearing, storing and settlement of
				securities transactions in the Nigerian Capital Market. A CSCS account
				number is created for you by your stockbroker and can be used for
				subscribing and selling securities. Accordingly, your CSCS details will
				be generated for the investors without one.
			</span>
		),
		style: panelStyle,
	},
	{
		key: "7",
		label: (
			<span className="text-ap-grey-600 font-medium">
				What’s the difference between right issues and public offer?
			</span>
		),
		children: (
			<span className="text-ap-grey-400 font-normal">
				A rights issue offers new shares to existing shareholders at a
				discounted price to raise capital, while a public offer sells new shares
				to the general public, often through an Initial Public Offering (IPO),
				to raise capital and increase market liquidity.
			</span>
		),
		style: panelStyle,
	},
	{
		key: "8",
		label: (
			<span className="text-ap-grey-600 font-medium">
				What is the basis of allotment?
			</span>
		),
		children: (
			<span className="text-ap-grey-400 font-normal">
				The shares will be allotted in line with the SEC Rules, which prescribe
				that all subscribers receive the minimum application of 20shares in
				full, following which the remaining balance shall be allotted
				proportionately amongst applicants. An expected timetable is included in
				the Pricing Supplement for guidance purposes.
			</span>
		),
		style: panelStyle,
	},
	{
		key: "9",
		label: (
			<span className="text-ap-grey-600 font-medium">
				What is an offer for sale?
			</span>
		),
		children: (
			<span className="text-ap-grey-400 font-normal">
				This is an invitation to the investing public to purchase existing
				shares in a company from its shareholders.
			</span>
		),
		style: panelStyle,
	},
];

const FAQ: React.FC<Props> = ({ selected }) => {
	const panelStyle: React.CSSProperties = {
		marginBottom: 12,
		background: "white",
		borderRadius: "1px",
		border: "none",
	};

	const renderFAQ = (type: string) => {
		if (type === "General") {
			return generalItems(panelStyle);
		} else if (type === "Offer info") {
			return offerItems(panelStyle);
		} else if (type === "Glossary") {
			return glossaryItems(panelStyle);
		}
	};

	return (
		<div className="w-full max-w-[812px]">
			<Collapse
				bordered={false}
				expandIconPosition="end"
				expandIcon={() => <FaChevronDown />}
				style={{ background: "transparent" }}
				items={renderFAQ(selected)}
			/>
		</div>
	);
};

export default FAQ;
