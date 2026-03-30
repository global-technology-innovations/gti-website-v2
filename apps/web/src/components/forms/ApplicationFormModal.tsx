"use client";

import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import useCreateApplication from "@/queries/useApplicationQuery";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { ReactNode, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import FileInput from "./FileInput";
import PhoneInputField from "./PhoneInputField";
import { SuccessMessage } from "./SuccessMessage";

export function ApplicationFormModal({
	jobId,
	triggerLabel,
	title,
	children,
}: {
	jobId: number;
	triggerLabel?: string;
	title?: string;
	children?: ReactNode;
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
	const fieldClassName = "rounded-2xl border bg-white px-5 text-primary-foreground placeholder:text-primary-foreground shadow-none";

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				{children ? children : <Button className="mt-2">{triggerLabel || t("triggerLabel")}</Button>}
			</DialogTrigger>

			<DialogContent className="w-full border-border bg-white shadow-none rounded-[24px]">
				{!isSubmitted && (
					<DialogHeader className="mb-4">
						<DialogTitle className="h4 text-center font-bold uppercase leading-none text-primary">
							{title || t("title")}
						</DialogTitle>
					</DialogHeader>
				)}

				{isSubmitted ? (
					<SuccessMessage translationKey="ApplicationFormModal" className="py-10" />
				) : (
					<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center gap-4 ">
						<Input
							id="application-name"
							placeholder={t("namePlaceholder")}
							aria-invalid={!!errors.name}
							aria-describedby={errors.name ? "name-error" : undefined}
							className={cn(
								fieldClassName,
								errors.name
									? "border-destructive focus:ring-2 focus:ring-destructive/30"
									: "border-border focus:ring-2 focus:ring-ring/20"
							)}
							{...register("name", { required: t("nameError") })}
						/>
						{errors.name && (
							<p id="name-error" role="status" aria-live="polite" className="!text-xs !text-destructive mt-1 mb-0">
								{t("nameError")}
							</p>
						)}

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
									placeholder={t("phonePlaceholder")}
									className="border-border bg-white px-5 text-primary-foreground placeholder:text-primary-foreground"
								/>
							)}
						/>
						{errors.phone && (
							<p id="phone-error" role="status" aria-live="polite" className="!text-xs !text-destructive mt-1 mb-0">
								{errors.phone.message}
							</p>
						)}

						<Input
							id="application-email"
							type="email"
							placeholder={t("emailPlaceholder")}
							aria-invalid={!!errors.email}
							aria-describedby={errors.email ? "email-error" : undefined}
							className={cn(
								fieldClassName,
								errors.email
									? "border-destructive focus:ring-2 focus:ring-destructive/30"
									: "border-border focus:ring-2 focus:ring-ring/20"
							)}
							{...register("email", {
								pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: t("emailError") },
							})}
						/>
						{errors.email && (
							<p id="email-error" role="status" aria-live="polite" className="!text-xs !text-destructive mt-1 mb-0">
								{t("emailError")}
							</p>
						)}

						<Textarea
							id="application-cover"
							placeholder={t("coverPlaceholder")}
							aria-invalid={!!errors.coverText}
							aria-describedby={errors.coverText ? "cover-error" : undefined}
							className={cn(
								"min-h-[122px] rounded-[20px] border bg-white px-5 py-5 text-[18px] text-primary-foreground placeholder:text-primary-foreground shadow-none resize-none",
								errors.coverText
									? "border-destructive focus:ring-2 focus:ring-destructive/30"
									: "border-border focus:ring-2 focus:ring-ring/20"
							)}
							{...register("coverText", { required: t("coverError") })}
						/>
						{errors.coverText && (
							<p id="cover-error" role="status" aria-live="polite" className="!text-xs !text-destructive mt-1 mb-0">
								{t("coverError")}
							</p>
						)}

						<FileInput
							onFileSelect={(file) => setFileState({ selectedFile: file })}
							selectedFile={fileState.selectedFile}
							className="pt-1"
							dropzoneClassName="rounded-[20px] border-secondary bg-accent px-6 py-8 hover:border-secondary hover:bg-accent"
							selectedFileClassName="rounded-[20px] border-secondary bg-accent px-5 py-4"
							textClassName="text-center text-[16px] leading-[1.45] text-secondary"
							dragDropText={t("fileInput.dragDropText")}
							fileSelectedText={(fileName: string) => t("fileInput.fileSelected", { fileName })}
							fileTooLargeText={t("fileInput.fileTooLarge")}
							invalidFileTypeText={t("fileInput.invalidFileType")}
						/>

						<div className="mb-0 flex items-start gap-3 pt-2">
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
										className="mt-1 size-6 rounded-full border-border data-[state=checked]:border-secondary data-[state=checked]:bg-white data-[state=checked]:text-secondary"
									/>
								)}
							/>
							<label
								htmlFor="privacy-consent"
								className="cursor-pointer text-[14px] md:text-[15px] leading-[1.45] text-primary-foreground"
							>
								{t("privacyConsentStart")}{" "}
								<Link
									href="/privacy-policy"
									className="font-medium text-primary-foreground underline underline-offset-2 hover:text-secondary"
									target="_blank"
									rel="noopener noreferrer"
								>
									{t("privacyConsentLink")}
								</Link>
								{t("privacyConsentEnd") && ` ${t("privacyConsentEnd")}`}
							</label>
						</div>
						{errors.privacyConsent && (
							<p id="privacy-error" role="status" aria-live="polite" className="!text-xs !text-destructive mt-1 mb-0">
								{t("privacyError")}
							</p>
						)}

						<Button type="submit" disabled={isPending} variant="secondary" className="mx-auto mt-4">
							{isPending ? t("sendingButton") : t("submitButton")}
							<ArrowRight className="size-4" />
						</Button>
					</form>
				)}

				{createApp.isError && (
					<p className="text-destructive mt-2">
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
