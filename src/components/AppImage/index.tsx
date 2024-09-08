import React from "react";
import Image, { ImageProps, ImageLoaderProps } from "next/image";

export default function AppImage({ ...rest }: ImageProps) {
	const customLoader = ({ src, width, quality }: ImageLoaderProps) => {
		return src
			? `${src}?w=${width}&q=${quality || 100}`
			: "/assets/empty-state.png";
	};

	return <Image loader={customLoader} {...rest} alt="" />;
}
