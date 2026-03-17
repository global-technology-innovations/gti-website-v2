// Direct path to avoid circular dependency: hero → @/components → hero
import { Reveal } from "@/components/animations";
import { Card } from "@/components/ui";
import Image from "next/image";

const PRINCIPLES = [
	{
		title: "Довіра та надійність",
		description: "Будуємо довірчі відносини з клієнтами, дотримуємось всіх зобов'язань та забезпечуємо прозорість на всіх етапах.",
		icon: "/icons/crown-line.svg",
	},
	{
		title: "Бездоганна якість",
		description:
			"Використовуємо тільки сертифіковані матеріали та сучасні технології. Кожен проєкт проходить багаторівневий контроль якості.",
		icon: "/icons/layers.svg",
	},
	{
		title: "Інновації та розвиток",
		description: "Постійно вдосконалюємо методи роботи, впроваджуємо нові технології та слідкуємо за тенденціями у будівництві.",
		icon: "/icons/share-circle.svg",
	},
	{
		title: "Прагнення до досконалості",
		description: "Кожен проєкт виконуємо з максимальною увагою до деталей, прагнучи перевищити очікування клієнтів.",
		icon: "/icons/chart-square.svg",
	},
	{
		title: "Екологічність",
		description: "Турбуємося про навколишнє середовище, використовуємо екологічні матеріали та енергоефективні рішення.",
		icon: "/icons/paw.svg",
	},
	{
		title: "Командна робота",
		description: "Цінуємо кожного члена команди, підтримуємо професійний розвиток та створюємо комфортні умови для роботи.",
		icon: "/icons/mask-happly.svg",
	},
] as const;

export function PrinciplesSection() {
	return (
		<Reveal>
			<section className="relative container mx-auto rounded-3xl pb-22">
				<div className="flex flex-col items-center justify-center mx-4">
					<h2 className="h3 !font-bold text-primary uppercase">
						Принципи, якими ми <span className="text-secondary">керуємося</span>
					</h2>
					<p className="text-primary-foreground mt-4">
						Ми дотримуємося принципів, які визначають наш підхід до роботи, взаємодію з клієнтами та результат кожного проєкту.
					</p>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 pt-12 mx-4 ">
					{PRINCIPLES.map((principle, index) => (
						<Card key={index} variant="default" className="items-center text-center">
							<div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-4 mx-auto">
								<Image src={principle.icon} alt="" width={24} height={24} className="text-primary" aria-hidden />
							</div>
							<h3 className="!text-lg !leading-normal !font-bold text-primary uppercase">{principle.title}</h3>
							<p className="text-primary-foreground mt-2 text-sm">{principle.description}</p>
						</Card>
					))}
				</div>
			</section>
		</Reveal>
	);
}
