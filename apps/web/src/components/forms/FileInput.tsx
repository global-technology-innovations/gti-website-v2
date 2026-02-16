"use client";

import { Button } from "@/components";
import { cn } from "@/lib/utils";
import { Upload, X } from "lucide-react";
import { useCallback, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";

export default function FileInput({
	onFileSelect,
	selectedFile,
	maxSize = 10 * 1024 * 1024, // 10MB
	className,
	dragDropText,
	fileSelectedText,
	fileTooLargeText,
	invalidFileTypeText,
	hasError = false,
}: FileInputProps) {
	const [error, setError] = useState<string | null>(null);
	const croppedFileName =
		(selectedFile?.name || "").length > 30
			? (selectedFile?.name || "").substring(0, 30) + "..."
			: selectedFile?.name || "";

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
		<div className={cn("space-y-2", className)}>
			{!selectedFile ? (
				<div
					{...getRootProps()}
					className={cn(
						"w-full rounded-md border-2 border-dashed p-6 text-center cursor-pointer transition-colors",
						isDragActive
							? "border-blue-500 bg-blue-50"
							: hasError
								? "border-red-500 bg-red-50"
								: "border-gray-300 hover:border-blue-400 hover:bg-gray-50"
					)}
				>
					<input {...getInputProps()} />
					<Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
					<p className="text-sm text-gray-600">{dragDropText}</p>
				</div>
			) : (
				<div className="w-full rounded-md border px-4 py-3">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2 min-w-0 flex-1">
							<Upload className="h-4 w-4 text-gray-500 flex-shrink-0" />
							<span className="text-sm text-gray-700">{fileSelectedText(croppedFileName)}</span>
						</div>
						<Button
							type="button"
							variant="ghost"
							onClick={handleRemoveFile}
							className="text-red-500 hover:text-red-700 hover:bg-red-50"
						>
							<X className="h-4 w-4" />
						</Button>
					</div>
				</div>
			)}

			{error && <p className="text-xs text-red-500 mt-1 mb-0">{error}</p>}
		</div>
	);
}

interface FileInputProps {
	onFileSelect: (file: File | null) => void;
	selectedFile: File | null;
	maxSize?: number;
	className?: string;
	dragDropText: string;
	fileSelectedText: (fileName: string) => string;
	fileTooLargeText: string;
	invalidFileTypeText: string;
	hasError?: boolean;
}
