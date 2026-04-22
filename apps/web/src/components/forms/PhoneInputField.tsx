"use client";

import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { ControllerRenderProps } from "react-hook-form";
import { FormData } from "./ContactForm";
import styles from "./PhoneInputField.module.css";

const DEFAULT_PHONE_PLACEHOLDER = "+___ __ ___ __ __";

// Динамічний імпорт PhoneInput без SSR
const PhoneInput = dynamic(() => import("react-phone-number-input"), {
	ssr: false,
	loading: () => (
		<input
			type="tel"
			placeholder={DEFAULT_PHONE_PLACEHOLDER}
			className="mt-3 w-full rounded-md border border-input px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring/20"
			disabled
		/>
	),
});

interface PhoneInputFieldProps extends ControllerRenderProps<FormData, "phone"> {
	hasError?: boolean;
	id?: string;
	"aria-invalid"?: boolean;
	"aria-describedby"?: string;
	className?: string;
	placeholder?: string;
}

export default function PhoneInputField({
	value,
	onChange,
	hasError = false,
	id,
	"aria-invalid": ariaInvalid,
	"aria-describedby": ariaDescribedBy,
	className,
	placeholder = DEFAULT_PHONE_PLACEHOLDER,
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
				placeholder={placeholder}
				aria-invalid={ariaInvalid}
				aria-describedby={ariaDescribedBy}
				className={`w-full rounded-2xl border px-4 py-3 text-sm text-primary-foreground placeholder:text-primary-foreground focus:outline-none ${
					hasError ? "border-destructive focus:ring-2 focus:ring-destructive/30" : "border-input focus:ring-2 focus:ring-ring/20"
				} ${className || ""}`}
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
			placeholder={placeholder}
			id={id}
			aria-invalid={ariaInvalid}
			aria-describedby={ariaDescribedBy}
			className={cn(
				styles.phoneInputRoot,
				"w-full rounded-2xl border text-sm pl-4 focus:outline-none mb-0",
				hasError ? "border-destructive focus:ring-2 focus:ring-destructive/30" : "!border-input !focus:ring-2 !focus:ring-ring/20",
				className
			)}
		/>
	);
}
