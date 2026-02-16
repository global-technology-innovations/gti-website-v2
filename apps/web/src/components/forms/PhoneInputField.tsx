"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { ControllerRenderProps } from "react-hook-form";
import { FormData } from "./ContactForm";

// Динамічний імпорт PhoneInput без SSR
const PhoneInput = dynamic(() => import("react-phone-number-input"), {
	ssr: false,
	loading: () => (
		<input
			type="tel"
			placeholder="+380973737240"
			className="w-full rounded-md border px-4 py-3 text-sm focus:outline-none mt-3 border-input focus:ring-2 focus:ring-blue-500"
			disabled
		/>
	),
});

interface PhoneInputFieldProps extends ControllerRenderProps<FormData, "phone"> {
	hasError?: boolean;
	id?: string;
	"aria-invalid"?: boolean;
	"aria-describedby"?: string;
}

export default function PhoneInputField({
	value,
	onChange,
	hasError = false,
	id,
	"aria-invalid": ariaInvalid,
	"aria-describedby": ariaDescribedBy,
}: PhoneInputFieldProps) {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) {
		return (
			<input
				type="tel"
				id={id}
				placeholder="+___ __ ___ __ __"
				aria-invalid={ariaInvalid}
				aria-describedby={ariaDescribedBy}
				className={`w-full rounded-2xl border px-4 py-3 text-sm text-primary-foreground placeholder:text-primary-foreground focus:outline-none ${
					hasError
						? "border-red-500 focus:ring-2 focus:ring-red-500"
						: "border-input focus:ring-2 focus:ring-blue-500"
				}`}
				readOnly
			/>
		);
	}

	return (
		<PhoneInput
			value={value}
			onChange={onChange}
			international
			defaultCountry="UA"
			placeholder="+___ __ ___ __ __"
			id={id}
			aria-invalid={ariaInvalid}
			aria-describedby={ariaDescribedBy}
			className={`w-full rounded-2xl border text-sm pl-4 focus:outline-none mb-0 mt-3 ${
				hasError
					? "border-red-500 focus:ring-2 focus:ring-red-500"
					: "!border-input !focus:ring-2 !focus:ring-blue-500"
			}`}
		/>
	);
}
