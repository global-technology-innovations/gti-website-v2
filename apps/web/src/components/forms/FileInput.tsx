"use client";

import { cn } from "@/lib/utils";
import { Upload, X } from "lucide-react";
import { useCallback, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { Button } from "../ui/button";

export default function FileInput({
	onFileSelect,
	selectedFile,
	maxSize = 10 * 1024 * 1024, // 10MB
	className,
	dropzoneClassName,
	selectedFileClassName,
	textClassName,
	dragDropText,
	fileSelectedText,
	fileTooLargeText,
	invalidFileTypeText,
	hasError = false,
}: FileInputProps) {
	const [error, setError] = useState<string | null>(null);
	const croppedFileName =
		(selectedFile?.name || "").length > 30 ? (selectedFile?.name || "").substring(0, 30) + "..." : selectedFile?.name || "";

	const onDrop = useCallback(
		(acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
			setError(null);

			if (rejectedFiles.length > 0) {
				const rejection = rejectedFiles[0];
				if (rejection.errors.some((error) => error.code === "file-too-large")) {
					setError(fileTooLargeText);
				} else if (rejection.errors.some((error) => error.code === "file-invalid-type")) {
					setError(invalidFileTypeText);
				}
				return;
			}

			if (acceptedFiles.length > 0) {
				onFileSelect(acceptedFiles[0]);
			}
		},
		[onFileSelect, fileTooLargeText, invalidFileTypeText]
	);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: {
			"application/pdf": [".pdf"],
			"application/msword": [".doc"],
			"application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
		},
		maxSize,
		multiple: false,
	});

	const handleRemoveFile = () => {
		onFileSelect(null);
		setError(null);
	};

	return (
		<div className={cn("space-y-2 w-full", className)}>
			{!selectedFile ? (
				<div
					{...getRootProps()}
					className={cn(
						"w-full rounded-md border-2 border-dashed p-6 text-center cursor-pointer transition-colors",
						isDragActive
							? "border-secondary bg-accent"
							: hasError
								? "border-destructive bg-destructive/5"
								: "border-border hover:border-secondary hover:bg-background",
						dropzoneClassName
					)}
				>
					<input {...getInputProps()} />
					<Upload className="mx-auto mb-2 h-8 w-8 text-primary-foreground" />
					<p className={cn("text-sm text-primary-foreground", textClassName)}>{dragDropText}</p>
				</div>
			) : (
				<div className={cn("w-full rounded-md border px-4 py-3", selectedFileClassName)}>
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2 min-w-0 flex-1">
							<Upload className="h-4 w-4 flex-shrink-0 text-primary-foreground" />
							<span className={cn("text-sm text-primary-foreground", textClassName)}>
								{fileSelectedText(croppedFileName)}
							</span>
						</div>
						<Button
							type="button"
							variant="outline"
							onClick={handleRemoveFile}
							className="text-destructive hover:bg-destructive/5 hover:text-destructive border-none"
						>
							<X className="h-4 w-4" />
						</Button>
					</div>
				</div>
			)}

			{error && <p className="text-xs text-destructive mt-1 mb-0">{error}</p>}
		</div>
	);
}

interface FileInputProps {
	onFileSelect: (file: File | null) => void;
	selectedFile: File | null;
	maxSize?: number;
	className?: string;
	dropzoneClassName?: string;
	selectedFileClassName?: string;
	textClassName?: string;
	dragDropText: string;
	fileSelectedText: (fileName: string) => string;
	fileTooLargeText: string;
	invalidFileTypeText: string;
	hasError?: boolean;
}
