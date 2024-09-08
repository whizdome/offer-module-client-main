export const maskPhoneNumber = (phoneNumber?: string): string => {
	if (phoneNumber) {
		if (phoneNumber.length < 4) return phoneNumber;
		return "******" + phoneNumber.slice(-4);
	}
	return "";
};

export const maskEmailAddress = (email?: string): string => {
	if (email) {
		const [localPart, domain] = email.split("@");
		const maskLength = Math.max(localPart.length - 4, 0);
		return "******" + localPart.slice(maskLength) + "@" + domain;
	}
	return "";
};

export const formatToCurrency = (num: any, p: number) => {
	let num_ = num
		? Number(num)
				.toFixed(p)
				.replace(/\d(?=(\d{3})+\.)/g, "$&,")
		: num;
	return num_;
};

export const currencyFormatter = (value: any) => {
	let numberValue = 0;

	if (typeof value === "string") {
		numberValue = parseFloat(value);
	} else {
		numberValue = value;
	}

	// Check if the value is a valid number
	if (isNaN(numberValue)) {
		return "0";
	}
	if (!numberValue) {
		return "0";
	}

	return numberValue.toLocaleString("en-US", {
		style: "decimal",
		minimumFractionDigits: 0,
		maximumFractionDigits: 2,
	});
};
export const camelCaseToCapitalized = (str: string): string => {
	// Split the camelCase string into words
	const words = str.replace(/([a-z])([A-Z])/g, "$1 $2").split(" ");

	// Capitalize the first letter of each word
	const capitalizedWords = words.map(
		(word) => word.charAt(0).toUpperCase() + word.slice(1)
	);

	// Join the words with spaces
	return capitalizedWords.join(" ");
};

export const getInitials = (name: string): string => {
	const words = name?.split(" ");
	return words
		?.map((word) => word[0])
		.join("")
		.slice(0, 2);
};
