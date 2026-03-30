"use client";

import { Button, Checkbox, Input, Textarea } from "@/components";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useId } from "react";
import { Controller, useForm } from "react-hook-form";
import PhoneInputField from "./PhoneInputField";

export function ContactForm({ onSubmitAction, isSubmitting, className = "", variant = "default" }: ContactFormProps) {
	const t = useTranslations("ContactForm");
	const privacyId = useId();
	const isApplicationVariant = variant === "application";
	const fieldClassName = isApplicationVariant
		? "border-border bg-white px-5 text-primary-foreground placeholder:text-primary-foreground shadow-none"
		: "";
	const fieldStateClassName = (hasError: boolean) =>
		hasError
			? isApplicationVariant
				? "border-destructive focus:ring-2 focus:ring-destructive/30"
				: "border-red-500 focus:ring-2 focus:ring-red-500"
			: isApplicationVariant
				? "border-border focus:ring-2 focus:ring-ring/20"
				: "border-input focus:ring-1 focus:ring-blue-500";
	const errorClassName = isApplicationVariant ? "!text-xs !text-destructive mt-1 mb-0" : "!text-xs !text-red-500 mt-1";

	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
		reset,
	} = useForm<FormData>({
		defaultValues: {
			name: "",
			phone: "",
			email: "",
			message: "",
			privacyConsent: false,
			_hp: "",
		},
	});

	return (
		<form
			onSubmit={handleSubmit((data) => onSubmitAction(data, reset))}
			className={cn(
				"flex w-full flex-col gap-4 bg-white",
				isApplicationVariant ? "items-center" : "mx-auto max-w-[650px] rounded-[24px] border border-input px-3 py-4 md:p-6",
				className
			)}
		>
			{/* honeypot */}
			<input type="text" {...register("_hp")} className="hidden" tabIndex={-1} autoComplete="off" />

			{/* Name */}
			<Input
				id="contact-name"
				placeholder={t("namePlaceholder")}
				aria-invalid={!!errors.name}
				{...register("name", { required: t("nameError") })}
				className={cn(fieldClassName, fieldStateClassName(!!errors.name))}
			/>
			{errors.name && (
				<p id="name-error" role="status" aria-live="polite" className={errorClassName}>
					{t("nameError")}
				</p>
			)}

			{/* Phone */}
			<Controller
				name="phone"
				control={control}
				rules={{
					required: t("phoneErrorRequired"),
					validate: (value) => (value && value.length >= 10) || t("phoneErrorPattern"),
				}}
				render={({ field }) => (
					<PhoneInputField
						{...field}
						hasError={!!errors.phone}
						aria-invalid={!!errors.phone}
						id="contact-phone"
						className={isApplicationVariant ? fieldClassName : undefined}
					/>
				)}
			/>
			{errors.phone && (
				<p id="phone-error" role="status" aria-live="polite" className={errorClassName}>
					{errors.phone.message}
				</p>
			)}

			{/* Email */}
			<Input
				id="contact-email"
				type="email"
				placeholder={t("emailPlaceholder")}
				aria-invalid={!!errors.email}
				{...register("email", {
					required: t("emailErrorRequired"),
					pattern: {
						value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
						message: t("emailError"),
					},
				})}
				className={cn(fieldClassName, fieldStateClassName(!!errors.email))}
			/>

			{errors.email && (
				<p id="email-error" role="status" aria-live="polite" className={errorClassName}>
					{errors.email.message}
				</p>
			)}

			{/* Message */}
			<Textarea
				id="contact-message"
				placeholder={t("messagePlaceholder")}
				aria-invalid={!!errors.message}
				{...register("message", { required: t("messageError") })}
				className={cn(
					isApplicationVariant
						? "min-h-[122px] border bg-white px-5 py-5 text-[18px] text-primary-foreground placeholder:text-primary-foreground shadow-none resize-none"
						: "text-primary-foreground placeholder:text-primary-foreground",
					fieldStateClassName(!!errors.message)
				)}
			/>
			{errors.message && (
				<p id="message-error" role="status" aria-live="polite" className={errorClassName}>
					{t("messageError")}
				</p>
			)}

			{/* Privacy Consent */}
			<div className={cn("flex items-start", isApplicationVariant ? "mb-0 gap-3 pt-2" : "space-x-2")}>
				<Controller
					name="privacyConsent"
					control={control}
					rules={{ required: t("privacyError") }}
					render={({ field }) => (
						<Checkbox
							id={privacyId}
							checked={!!field.value}
							onCheckedChange={(val) => field.onChange(!!val)}
							aria-invalid={!!errors.privacyConsent}
							aria-describedby={errors.privacyConsent ? "privacy-error" : undefined}
							className={cn(
								"mt-1",
								isApplicationVariant &&
									"size-6 rounded-full border-border data-[state=checked]:border-secondary data-[state=checked]:bg-white data-[state=checked]:text-secondary"
							)}
						/>
					)}
				/>
				<label
					htmlFor={privacyId}
					className={cn(
						"cursor-pointer text-primary-foreground",
						isApplicationVariant ? "text-[14px] md:text-[15px] leading-[1.45]" : "text-sm"
					)}
				>
					{t("privacyConsentStart")}{" "}
					<Link
						href="/privacy-policy"
						className={cn(
							"text-secondary hover:text-secondary",
							isApplicationVariant ? "font-medium underline underline-offset-2" : "text-sm hover:underline"
						)}
						target="_blank"
						rel="noopener noreferrer"
					>
						{t("privacyConsentLink")}
					</Link>
					{t("privacyConsentEnd") && ` ${t("privacyConsentEnd")}`}
				</label>
			</div>
			{errors.privacyConsent && (
				<p id="privacy-error" role="status" aria-live="polite" className={cn(errorClassName, isApplicationVariant && "w-full")}>
					{t("privacyError")}
				</p>
			)}

			{/* Submit */}
			<Button
				variant="secondary"
				type="submit"
				disabled={isSubmitting}
				className={cn("mx-auto w-fit", isApplicationVariant ? "mt-4" : "mt-6")}
			>
				{isSubmitting ? "Надсилання..." : t("submitButton")}
				{isApplicationVariant && <ArrowRight className="size-4" />}
			</Button>
		</form>
	);
}

interface ContactFormProps {
	onSubmitAction: (data: FormData, reset: () => void) => void;
	isSubmitting?: boolean;
	className?: string;
	variant?: "default" | "application";
}
export interface FormData {
	name: string;
	phone: string;
	email: string;
	message: string;
	privacyConsent: boolean;
	_hp?: string;
}
