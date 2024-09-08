"use client";
import { Loader } from "@/assets";
import React, { useState } from "react";

const ShareholderSearch = () => {
	// script.js

	const [query, setQuery] = useState("");
	const [items, setItems] = useState<
		{ fullName: string; registrarAccount: string }[]
	>([]);

	const [loading, setLoading] = useState(false); // Loading state

	const fetchItems = async (query: string) => {
		setLoading(true); // Start loading
		try {
			const apiUrl = `https://invearn2-coreapi-dev.azurewebsites.net/api/UnclaimedDividend/GetUnclaimedDividends?FullName=${query}`;
			const response = await fetch(apiUrl);
			const data = await response.json();
			console.log("Fetched items:", data);
			setItems(data.payload.items);
		} catch (error) {
			console.error("Error fetching items:", error);
		} finally {
			setLoading(false); // Stop loading
		}
	};

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newQuery = event.target.value.trim();
		setQuery(newQuery);

		if (newQuery.length >= 2) {
			fetchItems(newQuery);
		} else {
			setItems([]); // Clear items if query is too short
		}
	};

	const selectItem = (item: { fullName: string; registrarAccount: string }) => {
		setQuery(item.fullName); // Update input value with selected item
		window.open(
			"https://docuhub3.nibss-plc.com.ng/edmms/self-service",
			"_blank"
		); // Opens the URL in a new tab
		setItems([]); // Clear the autocomplete list after selection
	};

	return (
		<div className="bg-[#f4f4f4] w-screen h-screen flex flex-col items-center ">
			<div className="search-container text-black space-y-2 mt-32">
				<h1 className="text-3xl font-medium">Unclaimed Dividend Finder</h1>

				<input
					type="text"
					id="search-input"
					placeholder="Search for your name..."
					value={query}
					onChange={handleInputChange}
					autoComplete="off"
				/>
				<p className="cta">*click on your name to mandate your account</p>
				{loading && (
					<div className=" w-full flex justify-center">
						<div className="mx-auto">
							<Loader />
						</div>
					</div>
				)}
				{/* Display autocomplete list only when there are items and not loading */}
				{!loading && items.length > 0 && (
					<div id="autocomplete-list" className="autocomplete-items">
						{items.map((item, index) => (
							<div
								key={index}
								className="autocomplete-item"
								onClick={() => selectItem(item)}
							>
								{item.fullName} - {item.registrarAccount}
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default ShareholderSearch;
