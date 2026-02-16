"use client";

import { Button, Reveal, ServiceCard, ServiceCardSkeleton } from "@/components";
import { useServicesQuery } from "@/queries";
import { useState } from "react";

const INITIAL_COUNT = 9;

export function ServicesList() {
  const [expanded, setExpanded] = useState(false);
  const { data: services, isLoading, error } = useServicesQuery();

  if (error) return <p>Помилка завантаження</p>;

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6 pt-12">
        <Reveal>
          {Array.from({ length: 5 }).map((_, index) => (
            <ServiceCardSkeleton key={index} reversed={index % 2 !== 0} />
          ))}
        </Reveal>
      </div>
    );
  }

  const displayedServices = expanded
    ? (services ?? [])
    : (services ?? []).slice(0, INITIAL_COUNT);
  const hasMore = (services?.length ?? 0) > INITIAL_COUNT;
  const showMoreButton = hasMore && !expanded;

  return (
    <div className="flex flex-col items-center py-12 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-4 gap-y-8 w-full items-stretch">
        {displayedServices.map((service) => (
          <Reveal key={service.slug}>
            <div className="h-full">
              <ServiceCard
                slug={service.slug}
                title={service.title}
                description={service.shortDescription}
                image={service.image}
              />
            </div>
          </Reveal>
        ))}
      </div>
      {showMoreButton && (
        <Button onClick={() => setExpanded(true)} className="mt-12">
          Більше сервісів
        </Button>
      )}
    </div>
  );
}
