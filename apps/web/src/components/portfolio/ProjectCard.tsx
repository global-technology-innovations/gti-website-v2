"use client";

import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components";
import { Link } from "@/i18n/navigation";
import { STRAPI_API_URL } from "@/lib/api";
import { StrapiProject } from "@/types/strapi";
import { format } from "date-fns";
import { cs, de, enUS, fr, sk, uk } from "date-fns/locale";
import { Calendar, MapPin } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

interface ProjectCardProps {
  project: StrapiProject;
  locale: string;
}

const localeMap = {
  uk: uk,
  sk: sk,
  cs: cs,
  en: enUS,
  fr: fr,
  de: de,
};

export function ProjectCard({ project, locale }: ProjectCardProps) {
  const t = useTranslations("PortfolioPage.ProjectCard");
  const mainImageUrl = project.attributes.mainImage?.data?.attributes?.url;
  const imageSrc = mainImageUrl
    ? mainImageUrl.startsWith("http")
      ? mainImageUrl
      : `${STRAPI_API_URL.replace("/api", "")}${mainImageUrl}`
    : "/placeholder.png";

  const slug = project.attributes.slug || `project-${project.id}`;

  // Format dates
  const dateLocale = localeMap[locale as keyof typeof localeMap] || uk;
  const startDate = project.attributes.startDate
    ? format(new Date(project.attributes.startDate), "LLLL yyyy", {
        locale: dateLocale,
      })
    : null;
  const endDate = project.attributes.endDate
    ? format(new Date(project.attributes.endDate), "LLLL yyyy", {
        locale: dateLocale,
      })
    : null;

  const formattedDate = startDate
    ? endDate
      ? `${startDate} - ${endDate}`
      : startDate
    : t("dateNotAvailable");

  // Get status translation key
  const statusKey =
    project.attributes.status === "completed"
      ? "completed"
      : project.attributes.status === "in-progress"
        ? "inProgress"
        : "planned";

  // Get status color classes
  const getStatusColorClasses = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "in-progress":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "planned":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <Card className="flex flex-col justify-between h-full group transition-all duration-300">
      <div className="flex flex-col gap-2">
        {/* Image */}
        <div className="relative w-full h-56 overflow-hidden">
          <Image
            src={imageSrc}
            alt={project.attributes.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            loading="lazy"
          />
          {/* Status Badge */}
          <Badge
            className={`absolute top-3 right-3 border ${getStatusColorClasses(project.attributes.status)}`}
            variant="outline"
          >
            {t(`status.${statusKey}`)}
          </Badge>
        </div>

        {/* Content */}
        <CardHeader className="flex flex-col gap-2 items-start">
          <CardTitle className="text-xl font-bold line-clamp-2 group-hover:text-primary transition-colors">
            {project.attributes.title}
          </CardTitle>
          <CardDescription className="line-clamp-3 text-base">
            {project.attributes.shortDescription}
          </CardDescription>
        </CardHeader>

        {/* Meta Info */}
        <CardContent className="space-y-2 pb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>{project.attributes.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>{formattedDate}</span>
          </div>
          {project.attributes.category && (
            <Badge variant="outline" className="mt-2">
              {project.attributes.category}
            </Badge>
          )}
        </CardContent>
      </div>

      {/* Footer */}
      <CardFooter className="pt-0">
        <Button
          asChild
          className="w-full group-hover:bg-primary/90"
          variant="default"
        >
          <Link href={`/portfolio/${slug}`}>{t("viewDetails")}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
