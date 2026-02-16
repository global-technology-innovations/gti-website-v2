"use client";

import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

type RevealProps = {
	children: ReactNode;
	direction?: "up" | "down" | "left" | "right";
	delay?: number;
};

const getVariants = (direction: RevealProps["direction"]): Variants => {
	switch (direction) {
		case "up":
			return {
				hidden: { opacity: 0, y: 30 },
				visible: { opacity: 1, y: 0 },
			};
		case "down":
			return {
				hidden: { opacity: 0, y: -30 },
				visible: { opacity: 1, y: 0 },
			};
		case "left":
			return {
				hidden: { opacity: 0, x: 30 },
				visible: { opacity: 1, x: 0 },
			};
		case "right":
			return {
				hidden: { opacity: 0, x: -30 },
				visible: { opacity: 1, x: 0 },
			};
		default:
			return {
				hidden: { opacity: 0, y: 30 },
				visible: { opacity: 1, y: 0 },
			};
	}
};

export function Reveal({ children, direction = "up", delay = 0 }: RevealProps) {
	const variants = getVariants(direction);

	return (
		<motion.div
			variants={variants}
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, amount: 0.2 }}
			transition={{ duration: 1, delay }}
		>
			{children}
		</motion.div>
	);
}
