"use client";

import React from "react";
import Script from "next/script";

const GoogleAnalytics = () => {
	return (
		<>
			<Script
				strategy="lazyOnload"
				src={`https://www.googletagmanager.com/gtag/js?id=G-FB94KEN94N`}
			/>

			<Script id="" strategy="lazyOnload">
				{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-FB94KEN94N', {
          page_path: window.location.pathname,
          });
        `}
			</Script>
			<Script
				strategy="lazyOnload"
				src={`https://www.googletagmanager.com/gtag/js?id=GTM-TS7S9JF6`}
			/>

			<Script id="" strategy="lazyOnload">
				{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'GTM-TS7S9JF6', {
          page_path: window.location.pathname,
          });
        `}
			</Script>
		</>
	);
};

export default GoogleAnalytics;
