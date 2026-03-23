"use client";

import { Link } from "@/i18n/navigation";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";

interface ProjectDetailErrorStateProps {
	title: string;
	description: string;
	backLabel: string;
}

export function ProjectDetailErrorState({ title, description, backLabel }: ProjectDetailErrorStateProps) {
	return (
		<div className="mt-[75px] flex min-h-screen items-center justify-center px-6">
			<div className="max-w-md text-center">
				<AlertCircle className="mx-auto mb-4 h-16 w-16 text-destructive" />
				<h1 className="mb-2 text-3xl font-bold">{title}</h1>
				<p className="mb-6 text-muted-foreground">{description}</p>
				<Button asChild>
					<Link href="/portfolio">
						<ArrowLeft className="mr-2 h-4 w-4" />
						{backLabel}
					</Link>
				</Button>
			</div>
		</div>
	);
}
