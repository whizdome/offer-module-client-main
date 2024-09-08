"use client";

import React, { FC } from "react";
import { Modal } from "antd";
import AppButton from "../button";
import { ButtonSize, ButtonState } from "../button/enum";

export interface IProps {
	type: string;
	open: boolean;
	handleOk: () => void;
	handleCancel: () => void;
}

const TermsAndPrivacyModal: FC<IProps> = ({
	type,
	open,
	handleOk,
	handleCancel,
}) => {
	const termsContent = `
		Please read these Terms and Conditions carefully before you become a business or personal user of Invearn (hereinafter referred to as the “Platform”).

			Introductions

			Welcome to Invearn digital offering platform, an application powered by Africa Prudential Plc, hereinafter referred to as the “Platform” (which expression shall, where the context so admits, include its successors-in-title and assigns).

			By using this Platform, you acknowledge and agree to comply with and be bound by the following terms and conditions governing Invearn's relationship with you in relation to this Platform. These Terms and Conditions are for an indefinite term and legally binding, so please read them through carefully before accessing this Platform.

			The onus is on you to access these Terms and Conditions, as well as any amendments made thereto. If you are not agreeable to these Terms and Conditions, you may not access this Platform.

			These Terms and Conditions are specific and apply to your use of this Platform. Any changes to these Terms and Conditions will be updated on this Platform and will be displayed when you access it.

			Definitions

			To use this Platform, you confirm that:

			a. You are 18 years of age or above. In the event that you are below 18 years of age, you are visiting the Platform at your own risk and warrant that you have been advised accordingly and are acting with the direction of your parents or guardian.

			b. If your bank details are for a bank in Nigeria, have your bank details registered with NIBSS under the BVN service.

			c. That you have a valid email address and contact telephone number.

			d. In respect of purchase of shares under any Offer, the Issuer and the Issuing Houses are entitled in their absolute discretion to accept or reject your application.

			e. You have attached the amount payable in full on the application for the number of ordinary shares of the Issuer.

			f. You agree to accept the same or any smaller number of shares in respect of which allotment may be made based upon the terms of the Pricing Supplement.

			g. You have been provided with sufficient opportunity to access the Offer documents and the information disclosed therein.

			h. You have read a copy of the Pricing Supplement for the Offer, issued by the Issuing Houses on behalf of the Issuer.

			i. You are able to enter into legally binding contracts, and you agree that this Agreement legally binds you in the same manner that a signed, written, paper contract does. You may not use the Platform or Services in any manner or attempt to access the Platform or any Service if you are not willing to be bound and abide by this Agreement.

			j. We are not responsible for the financial or other products and services or for the accuracy of the data obtained from third party sites that are displayed or reported through our Platform or any of our Services. While the Platform and Services provided by Invearn may provide significant assistance in submitting your application for the Offer, you should consult with a professional financial advisor before making investment decisions.

			k. We reserve the right to change or modify this Agreement or our Privacy Policy, or modify or discontinue any portion of the Services or features and functionality provided through the Platform, from time to time. If we decide to change this Agreement or our Privacy Policy, we will post such changes on the Platform or on our website, and such changes will be effective at such time. We reserve the right to modify or discontinue your access to the

			Platform or portion thereof, or any Service, without prior notice or reason to you. You agree that we shall not be liable to you or any third party for any modification of the Platform, the Services, this Agreement, or your access to the Platform or Services.

			l. The Platform is only intended for use by persons located in Nigeria Invearn makes no representation that the Platform is appropriate or available for use outside Nigeria. Similarly, Invearn makes no representations that accessing the Platform from locations outside Nigeria is legal or permissible under local law.

			m. You will comply with all applicable laws, including, without limitation, privacy laws, intellectual property laws, anti-spam laws, export control laws, tax laws, and regulatory requirements.

			n. That information inputted on the Platform are true, accurate and complete in all material respect

			You hereby confirm that in consideration of Invearn providing you access to the Platform, you have read, understood, and agreed to be bound by these Terms and Conditions each time you access this Platform.

			Registrations and Confirmation

			By registering for the services provided through this Platform, you agree to pay any fees that are due in respect of any such service that you use. Where any service for which you register on or through this Platform is provided by or with a service provider, agent, or partner of Invearn, you agree that you will observe any additional terms and conditions associated with the part of the service provided by them.

			By registering on this Platform, you warrant to Invearn that all the information provided by you is true, complete, and accurate in all respects. Invearn will take all information supplied via this Platform at face value and shall not be responsible for any inaccurate, untrue, or false information or any information supplied under false pretenses.

			Application for and Use of the Platform

			a. Invearn reserves the right, at its sole discretion, to refuse to act on your registration application and/or updates of your registration data made via this Platform.

			b. If your registration application is accepted, you agree to receive marketing and promotional materials via email broadcast unless you have selected not to receive these materials; and consent that your registration details will be utilized by Invearn as the service provider when you register and log in to the Platform using your registration User ID for the subscription.

			c. Your consent to receive marketing and promotional materials electronically will remain in effect until you revoke such consent. To unsubscribe or revoke your consent to receive these electronic notifications, you will need to apply the unsubscribe option made available within this Platform. Please note that it may take some time for us to update our records to ensure your new choices are respected.

			d. You must ensure that you update your details (including any change in your email address) on the Platform immediately whenever any such change occurs.

			Invearn's Obligations to Retain your Personal Information and your Access to and Control of such Personal Information

			Invearn keeps your Personal Information in line with set periods calculated using the following applicable criteria:

			a. How long you have been a customer with us, the types of products or services we provide you, and when you will stop being our customer.

			b. After you have stopped being our customer, for how long it is reasonable for us to retain your records to show we have met the obligations we have to you and by law.

			c. Any time limits for making a claim.

			d. Any period for keeping your personal information which are set by law or recommended by the relevant regulators, professional bodies, or associations, or is in line with best practice.

			e. The nature of any contract we have in place with you.

			f. The terms of any consent given by you.

			g. Any relevant proceedings that apply.

			h. Our legitimate interests as a business.

			The retention period is to enable Invearn to use the personal data for the necessary legitimate purposes identified in full compliance with the legal and regulatory requirements. When Invearn no longer needs to use your personal information, we will delete it from our systems and records, and/or take steps to anonymize the said personal information so that you cannot be identified or linked to the said personal information.

			Access to and Control over Information

			In respect of your Personal Information with us, you can do the following at any time by contacting us:

			a. If allowable, see what Personal Information we have about you, if any. Change/correct any Personal Information we have about you after providing the required documentation and if it is within your purview to change/correct.

			b. If allowable, and subject to points a - h above, have us delete any Personal Information we have about you.

			c. Request for contact details of the data protection officer, where applicable. If allowable, request for the purpose of the processing as well as the legal basis for processing.

			d. If allowable, request for information about interests, if the processing is based on the legitimate interests of Invearn or a third party.

			e. If allowable, request for the categories of personal data collected, stored, and processed.

			f. If allowable, request for recipient(s) or categories of recipients that the data is/will be disclosed to.

			g. Information about how we intend to securely transfer the personal data to a third party or international organization.

			Request for the duration of data retention and Electronic Disclosure Consent

			By providing your email to enroll for use of our Services and/or Platform, you consent to receive all notices and information regarding our Services and other offerings electronically. Electronic communications may be posted on our Platform and/or delivered to your registered e-mail address. All communications in electronic format will be considered to be in “writing,” and to have been received no later than five (5) business days after posting or dissemination, whether or not you have received or retrieved the communication. Your consent to receive communications electronically is valid until you end your relationship with Invearn.

			It is your responsibility to provide us with true, accurate and complete email addresses, contact and other information related to this disclosure and to maintain and update promptly any changes in this information. You may print a copy of any electronic communications and retain it for your records. We reserve the right to terminate or change the terms and conditions on which we

			provide electronic communications and will provide you notice thereof in accordance with applicable law.

			i. Request for details and information of automated decision making, such as profiling, and any meaningful information about the logic involved, as well as the significance and expected consequences of such processing, and express any concern about our use of your Personal Information.

			Liabilities and Exclusion of Liabilities

			a. Invearn shall not be liable to you for any loss or damage you may suffer or incur as a result of your use of the Platform unless such a loss or damage results directly from the fraud or willful default of Invearn.

			b. In the event that you do not comply with any provision of these Terms and Conditions and such non-compliance results in any loss or damage to Invearn, you agree and undertake to compensate Invearn for such loss and/or damage.

			c. Any limitation or exclusion of liability under these Terms and Conditions shall only be valid to the full extent permitted by law.

			d. Invearn is entitled, at its sole discretion, to take such steps as it may consider expedient, including any steps required to comply with any law, regulation, order, directive, notice, or request from any government or regulatory authority (whether or not having the force of law).

			e. To the full extent permitted by law, Invearn shall not, in connection with the provision of the Platform, be liable for any loss, damage, or expense suffered by you or any third party by virtue of any delay in acting on any instruction or any partial completion of or failure or inability to act on any of your instructions for whatever reason (including, without limitation, any failure or error of any computer or electronic system or equipment).

			f. In no event will Invearn or its third-party providers be liable for any damages, including without limitation direct or indirect, special, incidental, punitive, or consequential damages, losses, or expenses arising out of or relating to your use of this Platform, any failure of performance, malfunction, fault in delivery, suspension, inaccuracy, termination, error, omission, interruption, defect, delay in operation or transmission, computer virus, line or system failure, unauthorized interception of information, unauthorized access or use, or other security threats relating to the Platform or any other cause in connection with the performance, operation, maintenance, use of or inability to use all or any part of the Platform, even if Invearn or their agents or advisors are advised of the possibility of such damages, losses, or expenses (past performance is no guarantee of future results).

			Security and Confidentiality

			a. You understand and agree that you are responsible for maintaining the confidentiality of your Username and password. You agree and undertake that:

			i. You will not disclose your Username and password to any other person (as a precaution, Invearn recommends changing your login credentials periodically);

			ii. You will notify Invearn immediately if you suspect that either your User ID and/or password have been lost or stolen or that any other person has obtained access to your registration details. Where you disclose (whether intentionally or unintentionally or to the extent permitted by law) either your User ID and/or password to any other person, Invearn disclaims all liability (including liability for negligence) for any loss or damage that you or any third party may suffer arising from or in connection with such disclosure or access to or use of these, and you agree and undertake to indemnify Invearn against any and all liability, costs, or damages arising out of claims or suits by third person(s) based on or relating to such access to or use of your User ID and/or password.
		`.trim();

	const privacyContent = `
		Affiliated Third Parties includes companies with which we have common ownership or management or other contractual strategic support or partnership relationships with, our advisers, consultants, bankers, vendors or sub-contractors.

		Data is information, which is stored electronically, on a computer, or in certain paper-based filing systems.

		Data Controller is a person responsible for determining the manner in which Personal Data would be processed.

		NDPR means the Nigerian Data Protection Regulations.

		NITDA means the National Information Technology Development Agency.

		Personal Data is the information relating to an identified or identifiable natural person. These include a name, gender, a photo, an email address, bank details, medical information, computer internet protocol address and any other information specific to the physical, physiological, genetic, mental, economic, cultural or social identity of that natural person.

		Processing is any activity that involves use of Personal Data. It includes obtaining, recording or holding the data, or carrying out any operation or set of operations on the data including organising, amending, recording, retrieving, using, disclosing, erasing or destroying it. Processing also includes transferring personal data to third parties.

		Sensitive Personal Data includes information about a person’s racial origin, political opinions, religious or similar beliefs, trade union membership, physical or mental health or condition or sexual life.

		Privacy Policy

		Data Collection
		1). Identity Data includes first name, last name, username or similar identifier, title, date of birth and gender.

		2). Contact Data includes residential address, email address and telephone numbers.

		3). Human Resource Data includes information on your employment history, professional and educational information submitted upon applying for employment with us.

		4).Technical Data includes internet protocol (IP) address, domain name, your login data, browser type and version, time zone setting and location, browser plug-in types and
		versions, operating system and platform, and other technology on the devices you use to access this website.

		5).Profile Data includes your username and password, purchases or orders made by you, your interests, preferences, feedback and survey responses.

		6).Usage Data includes information about how you use our website and services.

		7).Marketing and Communications Data includes your preferences in receiving marketing communications from us and our Affiliated Third Parties and your communication preferences.

		You provide this information through direct interaction when you visit our website, sign up to our newsletters or publications, request marketing materials to be sent to you, respond to surveys, complete our feedback or comment form, provide your business card to any of our staff, sign our visitor management form, complete other forms, apply for employment through our careers page, or contact us to request for any information or other correspondence by post, email, our website or otherwise.

		As you interact with our website, we will automatically collect technical data about your equipment, browsing actions and patterns. We collect this data by using cookies, and other similar technologies. Please see our cookies policy for further details.

		We do not intentionally or knowingly collect any Sensitive Personal Data. We ask that you do not send to us nor disclose such Sensitive Personal Data save where required for a specific purpose.

		Your Personal Data and How It Is Used

		· Primarily, we collect, process and store your Personal Data to help us better connect with you. The following are the purposes for which we collect your Personal Data:
		· To monitor, review, evaluate and improve your experience when you visit our website
		· To analyse the traffic on our website, including determining the number of visitors to the website and analyse how they navigate the website.
		· To invite you to complete a survey or provide feedback to us on specific matters.
		· At any time, you request information from us via a form or other electronic transmission we may use your Personal Data to fulfil that request and keep a record of such request and how it was handled, for quality assurance and service improvement purposes.
		· To keep you updated on our activities, programmes and events where your explicit consent has been given.
		· To notify you of changes to our websites or relevant processes.
		· We may also use your information or allow Affiliated Third Parties such as our affiliate companies or partners use of this Personal Data, to offer you information
		about unrelated products or services you may be interested in. We or such Affiliated Third Parties can only communicate with you if you have expressly consented to such communication and data use.
		· We may share your personal data with Affiliated Third Parties such as service providers who we have engaged to assist with providing certain services on our behalf, for which they require your personal data.
		· Where we have any contracts with you which create a commitment, we may require contact or use of your information to perform the contract.
		· To process or manage your appointments with any of our staff.
		· To fulfil legal/ regulatory obligations or to report any criminal or unethical activity.
		· To store either on our central computer system or a third-party Computer’s central computer system for archiving and back up purposes.
		· Beaware that we do not reveal identifiable information about you to our advertisers, though we may at times share statistical visitor information with our advertisers.


		Change of Purpose
		We will only use your Personal Data for the aforementioned purposes, unless we reasonably consider that we need to use it for another reason and that reason is compatible with the original purpose.
		If you wish to get an explanation as to how the processing for the new purpose is compatible with the original purpose, please contact us. If we need to use your Personal Data for an unrelated purpose, we will notify you and request for your express consent.

		Your Personal Data Rights

		Data Protection Laws provides you with certain rights in relation to the information that we collect about you.
		The right to withdraw consent previously given to us or our Affiliated Third Parties. In order to make use of your personal data, we would have obtained your consent. For consent to be valid, it must be given voluntarily. In line with regulatory requirements, consent cannot be implied, and we ensure that you have the opportunity to read our data protection privacy policy before you provide your consent. Consent in respect of Sensitive Personal Data must be explicit and will be given by you in writing to us. The consent of minors (under the age of 18) will always be protected and obtained from the minor’s representatives in accordance with applicable regulatory requirements. You can ask us or Affiliated Third Parties to stop sending you marketing messages at any time by unsubscribe or unchecking relevant boxes to adjust your marketing preferences or by following the opt-out links on any marketing message sent to you.

		The right to request that we delete your Personal Data that is in our possession, subject however to retention required for legal purposes and the time required technically to delete such information. The right to request for access to your Personal Data or object to us processing the same. Where personal data is held electronically in a structured form, such you have a right to receive that data in a common electronic format. The right to update your Personal Data that is kept with us. You may do this at any time your personal data changes and you wish to update us.

		The right to receive your Personal Data and have it transferred to another Data Controller, as applicable. The right to lodge a complaint. You may exercise any of the above stated rights following our Data Subject Access Request Procedure. Persons who have access to your Personal Data In addition to our staff who have a business need to know, the following trusted third parties have access to your information: We use a customer relationship management tool to help manage our contact database and send out email communications to you. Our Affiliate Third Parties who require your information for the same purposes described in this Policy and who have adopted similar privacy policy standards further to contractual obligations to us under a third party data processing agreement we have entered with them. Professional service providers such as IT service providers and website hosts. Regulatory authorities.

		We will transfer your Personal Data to only those Affiliated Third Parties who we are sure can offer the required level of protection to your privacy and information and who are also contractually obligated to us to do so. We do not and will not at any point in time sell your Personal Data. We require all Affiliated Third Parties to respect the security of your personal data and to treat it in accordance with the law. We do not allow our professional service providers to use your Personal Data for their own purposes and only permit them to process your Personal Data for specified purposes and in accordance with our instructions.

		Security & Confidentiality
		Information submitted by you is stored on secure servers we have which are encrypted and access is restricted to only authorised persons in charge of maintaining the servers. We have put in place physical, electronic and procedural processes that safeguard and protect your information against unauthorised access, modification or erasure. However, we cannot guarantee 100% security as no security programme is completely fool proof. In the unlikely event that we experience any breach to your personal data, such breach shall be handled in accordance with our Personal Data Breach Management Procedures. All such breaches shall be notified to the NITDA within 72 hours of occurrence and where deemed necessary, based on the severity and potential risks, we shall notify you of such occurrence, steps taken and remedies employed to prevent a reoccurrence.

		Our staff also have an obligation to maintain the confidentiality of any Personal Data held by us.
		As you know, transmission of data on the internet is never guaranteed regarding safety. It is impossible to completely guarantee your safety with electronic data and transmission. You are therefore at your own risk if you elect to transmit any data electronically.

		Transfer of Personal Data outside Nigeria

		The Personal Data we collect may be transferred to and processed in another country other than your country of residence for the purposes stated above. The data protection laws in those countries may be different from, and less stringent than the laws applicable in your country of residence.

		By accepting this Policy or by providing your Personal Data to us, you expressly consent to such transfer and Processing. We will however take all reasonable steps to ensure that your data is treated securely and transfer of your Personal Data will only be done in accordance with the requirements of applicable laws and to parties who have put in place adequate controls to secure and protect your Personal Data.

		Retention of Personal Data

		We retain your Personal Data for no longer than reasonably necessary for the purposes set out in this Policy and in accordance with legal, regulatory, tax, accounting or reporting requirements.
		We may retain your Personal Data for a longer period in the event of a complaint or if we reasonably believe there is a prospect of litigation in respect to our relationship with you.

		To determine the appropriate retention period for personal data, we consider the amount, nature and sensitivity of the Personal Data, the potential risk of harm from unauthorised use or disclosure of your Personal Data, the purposes for which we process your Personal Data and whether we can achieve those purposes through other means, and the applicable legal, regulatory, tax, accounting or other requirements.
		Where your Personal Data is contained within a document, the retention period applicable to such type of document in our document retention policy shall apply.

		This website or our email communication may include links to third party websites, plug-ins and applications. Clicking on those links or enabling those connections may allow third parties to collect or share data about you. We do not control these third-party websites and are not responsible for their privacy statements. When you leave our website, we encourage you to read the privacy policy of every website you visit.

		Cookies Policy
		Our advertisers and organisation may have the occasion to collect information in regard to your computer for our services. The information is gained in a statistical manner for our use or advertisers on our site.

		Data gathered will not identify you personally. It is strictly aggregate statistical data about our visitors and how they used our resources on the site. No identifying Personal Data will be shared at any time via cookies.

		Close to the above, data gathering can be about general online use through a cookie file. When used, cookies are automatically placed in your hard drive where information transferred to your computer can be found. These cookies are designed to help us correct and improve our site’s services for you.

		You may elect to decline all cookies via your computer or set up alerts to prompt you when websites set or access cookies. Every computer has the ability to decline file downloads like cookies. Your browser has an option to enable the declining of cookies. If you do decline cookie downloads you may be limited to certain areas of our site, as there are parts of our site that require cookies.

		Any of our advertisers may also have a use for cookies. We are not responsible, nor do we have control of the cookies downloaded from advertisements. They are downloaded only if you click on the advertisement.

		Subject Access Request Response Procedure

		Our advertisers and organisation may have the occasion to collect information in regard to your computer for our services. The information is gained in a statistical manner for our use or advertisers on our site.
		Data gathered will not identify you personally. It is strictly aggregate statistical data about our visitors and how they used our resources on the site. No identifying Personal Data will be shared at any time via cookies.

		Close to the above, data gathering can be about general online use through a cookie file. When used, cookies are automatically placed in your hard drive where information transferred to your computer can be found. These cookies are designed to help us correct and improve our site’s services for you.

		You may elect to decline all cookies via your computer or set up alerts to prompt you when websites set or access cookies. Every computer has the ability to decline file downloads like cookies. Your browser has an option to enable the declining of cookies. If you do decline cookie downloads you may be limited to certain areas of our site, as there are parts of our site that require cookies.

		Any of our advertisers may also have a use for cookies. We are not responsible, nor do we have control of the cookies downloaded from advertisements. They are downloaded only if you click on the advertisement.

		Contacting Us
		We welcome any queries, requests you may have regarding our Data Protection Privacy Policies, or our privacy practices. Please feel free to contact us at dataprotectionofficer@africaprudential.com
	`.trim();

	return (
		<Modal
			open={open}
			onOk={handleOk}
			onCancel={handleCancel}
			footer={[
				<div
					key={1}
					className="flex justify-end border-t border-[#EDEEF1] py-5 px-6 "
				>
					<AppButton
						size={ButtonSize.lg}
						variant={ButtonState.PRIMARY}
						value="Done"
						type="button"
						onClick={handleOk}
					/>
				</div>,
			]}
		>
			{type === "terms" ? (
				<div className="p-6">
					<p className="text-ap-grey-950 text-xl font-semibold">Terms of Use</p>
					<p className="text-ap-grey-500 text-base font-normal whitespace-pre-line">
						{termsContent}
					</p>
				</div>
			) : (
				<div className="p-6">
					<p className="text-ap-grey-950 text-xl font-semibold">
						Privacy policy
					</p>
					<p className="text-ap-grey-500 text-base font-normal whitespace-pre-line">
						{privacyContent}
					</p>
				</div>
			)}
		</Modal>
	);
};

export default TermsAndPrivacyModal;
