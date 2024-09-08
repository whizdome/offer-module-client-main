"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, HTMLMotionProps, motion } from "framer-motion";
import clsx from "clsx";

interface WordRotateProps {
	words: string[];
	duration?: number;
	framerProps?: HTMLMotionProps<"h1">;
	className?: string;
}

export default function WordRotate({
	words,
	duration = 2500,
	framerProps = {
		initial: { opacity: 0, y: 50 },
		animate: { opacity: 1, y: 0 },
		exit: { opacity: 0, y: -50 },
		transition: { duration: 0.25, ease: "easeOut" },
	},
	className,
}: WordRotateProps) {
	const [index, setIndex] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setIndex((prevIndex) => (prevIndex + 1) % words.length);
		}, duration);

		// Clean up interval on unmount
		return () => clearInterval(interval);
	}, [words, duration]);

	return (
		<span className="overflow-hidden">
			<AnimatePresence mode="popLayout">
				<motion.span
					key={words[index]}
					className={clsx(className)}
					{...framerProps}
				>
					{words[index]}
				</motion.span>
			</AnimatePresence>
		</span>
	);
}
