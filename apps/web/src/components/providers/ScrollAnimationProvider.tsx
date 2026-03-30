"use client";

import { useEffect } from "react";

const ANIMATION_SELECTOR = ".animate-slide-left, .animate-slide-up, .animate-slide-bottom, .animate-slide-right";

export function ScrollAnimationProvider() {
	useEffect(() => {
		if (typeof window === "undefined") return;

		const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		const observedElements = new WeakSet<Element>();

		const intersectionObserver = reduceMotion
			? null
			: new IntersectionObserver(
					(entries, observer) => {
						entries.forEach((entry) => {
							if (!entry.isIntersecting) return;

							entry.target.classList.add("animate-in-view");
							observer.unobserve(entry.target);
						});
					},
					{ threshold: 0.2 }
				);

		const registerElement = (element: Element) => {
			if (observedElements.has(element)) return;

			observedElements.add(element);

			if (reduceMotion) {
				element.classList.add("animate-in-view");
				return;
			}

			intersectionObserver?.observe(element);
		};

		const registerTree = (root: ParentNode) => {
			if (root instanceof Element && root.matches(ANIMATION_SELECTOR)) {
				registerElement(root);
			}

			root.querySelectorAll?.(ANIMATION_SELECTOR).forEach(registerElement);
		};

		registerTree(document);

		const mutationObserver = new MutationObserver((mutations) => {
			mutations.forEach((mutation) => {
				mutation.addedNodes.forEach((node) => {
					if (!(node instanceof Element)) return;
					registerTree(node);
				});
			});
		});

		mutationObserver.observe(document.body, {
			childList: true,
			subtree: true,
		});

		return () => {
			mutationObserver.disconnect();
			intersectionObserver?.disconnect();
		};
	}, []);

	return null;
}
