"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, MapPin, School as SchoolIcon, X } from "lucide-react";
import {
  states,
  cities,
  areas,
  schools,
  schoolSlug,
  schoolLocation,
} from "@/lib/data";

type Step = "state" | "city" | "area" | "school";

export function SchoolFinder() {
  const [stateId, setStateId] = useState<string>();
  const [cityId, setCityId] = useState<string>();
  const [areaId, setAreaId] = useState<string>();

  const step: Step = !stateId
    ? "state"
    : !cityId
      ? "city"
      : !areaId
        ? "area"
        : "school";

  const cityList = cities.filter((c) => c.stateId === stateId);
  const areaList = areas.filter((a) => a.cityId === cityId);
  const schoolList = schools.filter((s) => s.areaId === areaId);

  const crumbs = [
    stateId && {
      label: states.find((s) => s.id === stateId)!.name,
      reset: () => {
        setStateId(undefined);
        setCityId(undefined);
        setAreaId(undefined);
      },
    },
    cityId && {
      label: cities.find((c) => c.id === cityId)!.name,
      reset: () => {
        setCityId(undefined);
        setAreaId(undefined);
      },
    },
    areaId && {
      label: areas.find((a) => a.id === areaId)!.name,
      reset: () => setAreaId(undefined),
    },
  ].filter(Boolean) as { label: string; reset: () => void }[];

  const TITLES: Record<Step, string> = {
    state: "Select your state",
    city: "Select your city",
    area: "Select your area",
    school: "Select your school",
  };

  return (
    <div className="rounded-card border border-line bg-white p-6 shadow-sm">
      {/* Breadcrumb */}
      {crumbs.length > 0 && (
        <div className="mb-5 flex flex-wrap gap-2">
          {crumbs.map((c, i) => (
            <button
              key={i}
              onClick={c.reset}
              className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3 py-1 text-sm font-semibold text-primary"
            >
              {c.label}
              <X className="size-3.5" />
            </button>
          ))}
        </div>
      )}

      <h3 className="mb-4 text-lg font-bold text-ink">{TITLES[step]}</h3>

      {step === "state" && (
        <OptionList
          items={states.map((s) => ({ id: s.id, label: s.name }))}
          onPick={setStateId}
        />
      )}
      {step === "city" && (
        <OptionList
          items={cityList.map((c) => ({ id: c.id, label: c.name }))}
          onPick={setCityId}
        />
      )}
      {step === "area" && (
        <OptionList
          items={areaList.map((a) => ({ id: a.id, label: a.name }))}
          onPick={setAreaId}
        />
      )}
      {step === "school" && (
        <ul className="flex flex-col gap-2">
          {schoolList.map((s) => (
            <li key={s.id}>
              <Link
                href={`/schools/${schoolSlug(s)}`}
                className="flex items-center gap-3 rounded-xl border border-line bg-white p-4 transition-colors hover:border-primary hover:bg-primary-soft/40"
              >
                <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-primary">
                  <SchoolIcon className="size-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold text-ink">{s.name}</span>
                  <span className="flex items-center gap-1 text-sm text-ink-soft">
                    <MapPin className="size-3.5" /> {schoolLocation(s)}
                  </span>
                </span>
                <ChevronRight className="size-5 text-ink-faint" />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function OptionList({
  items,
  onPick,
}: {
  items: { id: string; label: string }[];
  onPick: (id: string) => void;
}) {
  return (
    <ul className="grid gap-2 sm:grid-cols-2">
      {items.map((it) => (
        <li key={it.id}>
          <button
            onClick={() => onPick(it.id)}
            className="flex w-full items-center justify-between rounded-xl border border-line bg-white px-4 py-3 text-left font-medium text-ink transition-colors hover:border-primary hover:bg-primary-soft/40"
          >
            {it.label}
            <ChevronRight className="size-5 text-ink-faint" />
          </button>
        </li>
      ))}
    </ul>
  );
}
