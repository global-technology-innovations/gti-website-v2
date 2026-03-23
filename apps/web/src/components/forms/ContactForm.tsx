"use client";

import { Button, Checkbox, Input, Textarea } from "@/components";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useId } from "react";
import { Controller, useForm } from "react-hook-form";
import PhoneInputField from "./PhoneInputField";

export function ContactForm({ onSubmitAction, isSubmitting, className = "" }: ContactFormProps) {
	const t = useTranslations("ContactForm");
	const privacyId = useId();

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
			className={cn("flex flex-col bg-white rounded-2xl p-6 shadow-md w-full max-w-[650px] mx-auto gap-4", className)}
		>
			{/* honeypot */}
			<input type="text" {...register("_hp")} className="hidden" tabIndex={-1} autoComplete="off" />

			{/* Name */}
			<Input
				id="contact-name"
				placeholder={t("namePlaceholder")}
				aria-invalid={!!errors.name}
				{...register("name", { required: t("nameError") })}
				className={cn(
					errors.name ? "border-red-500 focus:ring-2 focus:ring-red-500" : "border-input focus:ring-1 focus:ring-blue-500"
				)}
			/>
			{errors.name && (
				<p id="name-error" role="status" aria-live="polite" className="!text-xs !text-red-500 mt-1">
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
					<PhoneInputField {...field} hasError={!!errors.phone} aria-invalid={!!errors.phone} id="contact-phone" />
				)}
			/>
			{errors.phone && (
				<p id="phone-error" role="status" aria-live="polite" className="!text-xs !text-red-500 mt-1">
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
				className={cn(
					"",
					errors.email ? "border-red-500 focus:ring-2 focus:ring-red-500" : "border-input focus:ring-1 focus:ring-blue-500"
				)}
			/>

			{errors.email && (
				<p id="email-error" role="status" aria-live="polite" className="!text-xs !text-red-500 mt-1">
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
					"text-primary-foreground placeholder:text-primary-foreground",
					errors.message ? "border-red-500 focus:ring-2 focus:ring-red-500" : "border-input focus:ring-1 focus:ring-blue-500"
				)}
			/>
			{errors.message && (
				<p id="message-error" role="status" aria-live="polite" className="!text-xs !text-red-500 mt-1">
					{t("messageError")}
				</p>
			)}

			{/* Privacy Consent */}
			<div className="flex items-start space-x-2">
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
							className="mt-1"
						/>
					)}
				/>
				<label htmlFor={privacyId} className="text-sm text-primary-foreground cursor-pointer">
					{t("privacyConsentStart")}{" "}
					<Link
						href="/privacy-policy"
						className="text-sm text-secondary hover:underline hover:text-secondary"
						target="_blank"
						rel="noopener noreferrer"
					>
						{t("privacyConsentLink")}
					</Link>
					{t("privacyConsentEnd") && ` ${t("privacyConsentEnd")}`}
				</label>
			</div>
			{errors.privacyConsent && (
				<p id="privacy-error" role="status" aria-live="polite" className="!text-xs !text-red-500">
					{t("privacyError")}
				</p>
			)}

			{/* Submit */}
			<Button variant="secondary" type="submit" disabled={isSubmitting} className="w-fit mx-auto mt-6">
				{isSubmitting ? "Надсилання..." : t("submitButton")}
			</Button>
		</form>
	);
}

interface ContactFormProps {
	onSubmitAction: (data: FormData, reset: () => void) => void;
	isSubmitting?: boolean;
	className?: string;
}
export interface FormData {
	name: string;
	phone: string;
	email: string;
	message: string;
	privacyConsent: boolean;
	_hp?: string;
}
