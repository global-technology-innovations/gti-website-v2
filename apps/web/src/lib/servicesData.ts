import {
	LucideIcon,
	Brush,
	BrickWall,
	CircleDollarSign,
	Construction,
	Hammer,
	Home,
	House,
	Layers,
	PaintRoller,
	// Road,
	Ruler,
	Wallpaper,
} from "lucide-react";

export interface Service {
	title: string;
	slug: string;
	shortDescription: string;
	fullDescription: string;
	image: string;
	icon: LucideIcon;
	examples: string[];
}

export const services: Service[] = [
	{
		title: "Шпаклівка",
		slug: "shpaklivka",
		shortDescription: "Вирівнювання стін та підготовка до фарбування",
		fullDescription:
			"Проводимо шпаклювання стін і стель для створення ідеально гладкої поверхні перед фарбуванням чи іншими видами оздоблення.",
		image: "/hero-bg.png",
		icon: PaintRoller,
		examples: ["Вирівнювання стін", "Фінішне шпаклювання"],
	},
	{
		title: "Штукатурка",
		slug: "shtukaturka",
		shortDescription: "Внутрішні та зовнішні штукатурні роботи",
		fullDescription:
			"Застосовуємо сучасні штукатурні суміші для створення міцних та рівних поверхонь як всередині, так і зовні будівель.",
		image: "/hero-bg.png",
		icon: Ruler,
		examples: ["Вирівнювання фасадів", "Чорнова штукатурка"],
	},
	{
		title: "Монолітні роботи",
		slug: "monolit",
		shortDescription: "Армування та бетонування конструкцій",
		fullDescription:
			"Виконуємо повний цикл монолітних робіт: армування, встановлення опалубки та бетонування елементів будь-якої складності.",
		image: "/hero-bg.png",
		icon: Construction,
		examples: ["Опалубка фундаментів", "Бетонування перекриттів"],
	},
	{
		title: "Монтаж гіпсокартону",
		slug: "hypsokarton",
		shortDescription: "Перегородки, стелі, конструкції з ГКЛ",
		fullDescription:
			"Професійно монтуємо гіпсокартонні конструкції: перегородки, багаторівневі стелі та декоративні елементи.",
		image: "/hero-bg.png",
		icon: Layers,
		examples: ["Перегородки", "Арки з ГКЛ"],
	},
	{
		title: "Укладання бруківки",
		slug: "bruschatka",
		shortDescription: "Доріжки, парковки, подвірʼя",
		fullDescription:
			"Влаштовуємо надійне бруківкове покриття для доріжок, дворів та парковок з урахуванням навантажень та дизайну.",
		image: "/hero-bg.png",
		icon: Layers,
		examples: ["Садові доріжки", "Парковки"],
	},
	{
		title: "Укладання паркету",
		slug: "parket",
		shortDescription: "Укладання та реставрація паркету",
		fullDescription:
			"Монтуємо паркетні підлоги, проводимо циклевання та відновлення старих покриттів з натурального дерева.",
		image: "/hero-bg.png",
		icon: Home,
		examples: ["Циклювання", "Паркетні дошки"],
	},
	{
		title: "Малярні роботи",
		slug: "malyarka",
		shortDescription: "Фарбування стін, стель, фасадів",
		fullDescription:
			"Забезпечуємо якісне фарбування будь-яких поверхонь з використанням екологічних матеріалів та сучасних технологій.",
		image: "/hero-bg.png",
		icon: Brush,
		examples: ["Фарбування фасадів", "Декоративне фарбування"],
	},
	{
		title: "Оздоблення фасадів",
		slug: "fasady",
		shortDescription: "Теплоізоляція, декоративна штукатурка",
		fullDescription:
			"Комплексно утеплюємо та оздоблюємо фасади, надаючи будівлі привабливий вигляд і додатковий захист від зовнішніх факторів.",
		image: "/hero-bg.png",
		icon: House,
		examples: ["Монтаж утеплювача", "Декоративна штукатурка"],
	},
	{
		title: "Плиточні роботи",
		slug: "plytka",
		shortDescription: "Кухні, ванни, підлога, стіни",
		fullDescription:
			"Виконуємо укладання керамічної, керамогранітної та мозаїчної плитки на підлоги та стіни будь-яких приміщень.",
		image: "/hero-bg.png",
		icon: BrickWall,
		examples: ["Плитка у ванній", "Фартухи кухонь"],
	},
	{
		title: "Мурування",
		slug: "murovka",
		shortDescription: "Зведення стін, перегородок, огорож",
		fullDescription:
			"Професійно зводимо цегляні та блочні стіни, перегородки і огорожі з дотриманням технологічних норм.",
		image: "/hero-bg.png",
		icon: Hammer,
		examples: ["Несучі стіни", "Перегородки"],
	},
	{
		title: "Монтаж клінкеру",
		slug: "klinker",
		shortDescription: "Оздоблення фасаду клінкерною плиткою",
		fullDescription:
			"Монтуємо клінкерну плитку, що надає фасадам довговічність та естетичний вигляд навіть в умовах агресивного середовища.",
		image: "/hero-bg.png",
		icon: BrickWall,
		examples: ["Клінкер на фасадах", "Декоративні вставки"],
	},
	{
		title: "Покрівельні роботи",
		slug: "krishi",
		shortDescription: "Монтаж і ремонт дахів",
		fullDescription:
			"Виконуємо монтаж нових та ремонт існуючих дахів, забезпечуючи надійний захист будівлі від негоди.",
		image: "/hero-bg.png",
		icon: House,
		examples: ["Монтаж металочерепиці", "Ремонт покрівлі"],
	},
	{
		title: "Поклейка шпалер",
		slug: "shpalery",
		shortDescription: "Робота з будь-якими видами шпалер",
		fullDescription:
			"Наклеюємо паперові, флізелінові та текстильні шпалери з підгонкою малюнка та якісною підготовкою поверхні.",
		image: "/hero-bg.png",
		icon: Wallpaper,
		examples: ["Флізелінові шпалери", "Фотообої"],
	},
	{
		title: "Внутрішні роботи",
		slug: "vnutrishni",
		shortDescription: "Комплексний ремонт приміщень",
		fullDescription:
			"Здійснюємо внутрішні ремонтні роботи під ключ: від чорнових до фінішних етапів з урахуванням побажань клієнта.",
		image: "/hero-bg.png",
		icon: Home,
		examples: ["Демонтаж старих покриттів", "Монтаж підлог"],
	},
	{
		title: "Зовнішні роботи",
		slug: "zovnishni",
		shortDescription: "Фасадні, покрівельні, благоустрій",
		fullDescription:
			"Виконуємо фасадні та покрівельні роботи, облаштовуємо прилеглі території, створюючи завершений зовнішній вигляд об'єкта.",
		image: "/hero-bg.png",
		icon: House,
		examples: ["Благоустрій дворів", "Фасадні ремонти"],
	},
	{
		title: "Дорожні роботи",
		slug: "dorozhni",
		shortDescription: "Дорожнє покриття, бордюри, бруківка",
		fullDescription:
			"Будуємо та ремонтуємо дороги, тротуари й майданчики з урахуванням вимог до навантаження та довговічності.",
		image: "/hero-bg.png",
		icon: House,
		examples: ["Асфальтування", "Монтаж бордюрів"],
	},
	{
		title: "Квартира під ключ",
		slug: "pid-klyuch",
		shortDescription: "Повний ремонт + меблювання та закупівля матеріалів",
		fullDescription:
			"Беремо на себе весь процес ремонту квартири: від проектування та закупівлі матеріалів до меблювання і здачі об'єкта.",
		image: "/hero-bg.png",
		icon: CircleDollarSign,
		examples: ["Дизайн-проект", "Комплектація меблями"],
	},
];
export const getServiceBySlug = (slug: string) => services.find((service) => service.slug === slug);
