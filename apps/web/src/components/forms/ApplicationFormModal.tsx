"use client";

import {
	Button,
	Checkbox,
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	Input,
	Textarea,
} from "@/components";
import { cn } from "@/lib/utils";
import useCreateApplication from "@/queries/useApplicationQuery";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import FileInput from "./FileInput";
import PhoneInputField from "./PhoneInputField";
import { SuccessMessage } from "./SuccessMessage";

export function ApplicationFormModal({
	jobId,
	triggerLabel,
	title,
}: {
	jobId: number;
	triggerLabel?: string;
	title?: string;
}) {
	const t = useTranslations("ApplicationFormModal");
	const [open, setOpen] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [fileState, setFileState] = useState<FileState>({ selectedFile: null });

	const {
		register,
		handleSubmit,
		control,
		reset,
		formState: { errors },
	} = useForm<FormValues>();

	const createApp = useCreateApplication();

	const onSubmit = async (data: FormValues) => {
		try {
			const cvFile = fileState.selectedFile;

			await createApp.mutateAsync({
				name: data.name,
				email: data.email,
				phone: data.phone,
				coverText: data.coverText,
				job: jobId,
				cvFile,
			});

			setIsSubmitted(true);
			reset();
			setFileState({ selectedFile: null });

			setTimeout(() => {
				setIsSubmitted(false);
				setOpen(false);
			}, 3000);
		} catch (e) {
			console.error(e);
		}
	};

	const isPending = createApp.isPending;

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button className="mt-2">{triggerLabel || t("triggerLabel")}</Button>
			</DialogTrigger>

			<DialogContent className="sm:max-w-lg">
				{!isSubmitted && (
					<DialogHeader>
						<DialogTitle>{title || t("title")}</DialogTitle>
					</DialogHeader>
				)}

				{isSubmitted ? (
					<SuccessMessage translationKey="ApplicationFormModal" />
				) : (
					<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
						{/* Name */}
						<Input
							id="application-name"
							placeholder={t("namePlaceholder")}
							aria-invalid={!!errors.name}
							aria-describedby={errors.name ? "name-error" : undefined}
							className={cn(
								"w-full rounded-md border px-4 py-3 text-sm focus:outline-none",
								errors.name
									? "border-red-500 focus:ring-2 focus:ring-red-500"
									: "border-input focus:ring-1 focus:ring-blue-500"
							)}
							{...register("name", { required: t("nameError") })}
						/>
						{errors.name && (
							<p
								id="name-error"
								role="status"
								aria-live="polite"
								className="!text-xs !text-red-500 mt-1 mb-0"
							>
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
									aria-describedby={errors.phone ? "phone-error" : undefined}
									id="application-phone"
								/>
							)}
						/>
						{errors.phone && (
							<p
								id="phone-error"
								role="status"
								aria-live="polite"
								className="!text-xs !text-red-500 mt-1 mb-0"
							>
								{errors.phone.message}
							</p>
						)}

						{/* Email */}
						<Input
							id="application-email"
							type="email"
							placeholder={t("emailPlaceholder")}
							aria-invalid={!!errors.email}
							aria-describedby={errors.email ? "email-error" : undefined}
							className={cn(
								"w-full rounded-md border px-4 py-3 text-sm focus:outline-none mt-3",
								errors.email
									? "border-red-500 focus:ring-2 focus:ring-red-500"
									: "border-input focus:ring-1 focus:ring-blue-500"
							)}
							{...register("email", {
								pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: t("emailError") },
							})}
						/>
						{errors.email && (
							<p
								id="email-error"
								role="status"
								aria-live="polite"
								className="!text-xs !text-red-500 mt-1 mb-0"
							>
								{t("emailError")}
							</p>
						)}

						{/* Cover Letter */}
						<Textarea
							id="application-cover"
							placeholder={t("coverPlaceholder")}
							aria-invalid={!!errors.coverText}
							aria-describedby={errors.coverText ? "cover-error" : undefined}
							className={cn(
								"w-full rounded-md border px-4 py-3 text-sm h-32 resize-none focus:outline-none mt-3",
								errors.coverText
									? "border-red-500 focus:ring-2 focus:ring-red-500"
									: "border-input focus:ring-1 focus:ring-blue-500"
							)}
							{...register("coverText", { required: t("coverError") })}
						/>
						{errors.coverText && (
							<p
								id="cover-error"
								role="status"
								aria-live="polite"
								className="!text-xs !text-red-500 mt-1 mb-0"
							>
								{t("coverError")}
							</p>
						)}

						{/* CV */}
						<FileInput
							onFileSelect={(file) => setFileState({ selectedFile: file })}
							selectedFile={fileState.selectedFile}
							className="mt-3"
							dragDropText={t("fileInput.dragDropText")}
							fileSelectedText={(fileName: string) => t("fileInput.fileSelected", { fileName })}
							fileTooLargeText={t("fileInput.fileTooLarge")}
							invalidFileTypeText={t("fileInput.invalidFileType")}
						/>

						{/* Privacy Consent */}
						<div className="flex items-start space-x-2 mt-3 mb-0">
							<Controller
								name="privacyConsent"
								control={control}
								rules={{ required: t("privacyError") }}
								render={({ field }) => (
									<Checkbox
										id="privacy-consent"
										checked={field.value}
										onCheckedChange={(val) => field.onChange(!!val)}
										aria-invalid={!!errors.privacyConsent}
										aria-describedby={errors.privacyConsent ? "privacy-error" : undefined}
										className="mt-1"
									/>
								)}
							/>
							<label
								htmlFor="privacy-consent"
								className="text-sm text-gray-700 leading-relaxed cursor-pointer"
							>
								{t("privacyConsentStart")}{" "}
								<Link
									href="/privacy-policy"
									className="text-blue-600 hover:underline font-medium"
									target="_blank"
									rel="noopener noreferrer"
								>
									{t("privacyConsentLink")}
								</Link>
								{t("privacyConsentEnd") && ` ${t("privacyConsentEnd")}`}
							</label>
						</div>
						{errors.privacyConsent && (
							<p
								id="privacy-error"
								role="status"
								aria-live="polite"
								className="!text-xs !text-red-500 mt-1 mb-0"
							>
								{t("privacyError")}
							</p>
						)}

						{/* Submit Button */}
						<Button
							type="submit"
							disabled={isPending}
							className="w-full text-white font-bold text-sm py-3 mt-4 rounded-md transition"
						>
							{isPending ? t("sendingButton") : t("submitButton")}
						</Button>
					</form>
				)}

				{createApp.isError && (
					<p className="text-red-500 mt-2">
						{t("errorMessage")} {(createApp.error as Error)?.message}
					</p>
				)}
			</DialogContent>
		</Dialog>
	);
}

interface FormValues {
	name: string;
	email: string;
	phone: string;
	coverText: string;
	cv?: FileList;
	privacyConsent: boolean;
}

interface FileState {
	selectedFile: File | null;
}
