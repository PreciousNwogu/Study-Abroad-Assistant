"use client";

import { Button } from "@/components/ui/button";
import { countries } from "@/lib/country-utils";

interface CountrySelectorProps {
  onSelect: (country: string) => void;
}

export function CountrySelector({ onSelect }: CountrySelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-2 mt-3">
      {countries.map((country) => (
        <Button
          key={country.code}
          onClick={() => onSelect(country.name)}
          variant="outline"
          className="justify-start hover:bg-blue-50"
        >
          <span className="mr-2 text-lg">{country.flag}</span>
          {country.name}
        </Button>
      ))}
    </div>
  );
}
