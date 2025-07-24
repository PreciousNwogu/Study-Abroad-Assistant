"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Star, Users } from "lucide-react";
import {
  getPopularCountries,
  getCountriesByRegion,
  regions,
  hasAgentSupport,
  type Country,
} from "@/lib/country-utils";

interface EnhancedCountrySelectorProps {
  onSelect: (country: string) => void;
  selectedCountry?: string;
  showRegions?: boolean;
  showPopularFirst?: boolean;
}

export function EnhancedCountrySelector({
  onSelect,
  selectedCountry,
  showRegions = true,
  showPopularFirst = true,
}: EnhancedCountrySelectorProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  const popularCountries = getPopularCountries();

  const getFilteredCountries = () => {
    let countries: Country[] = [];

    if (selectedRegion) {
      countries = getCountriesByRegion(selectedRegion);
    } else if (showPopularFirst && !searchQuery) {
      countries = popularCountries;
    } else {
      countries = regions.flatMap((region) => region.countries);
    }

    if (searchQuery) {
      countries = countries.filter((country) =>
        country.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return countries;
  };

  const filteredCountries = getFilteredCountries();

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search for a country..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Region Filter */}
      {showRegions && !searchQuery && (
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-gray-700">
            Filter by Region
          </h3>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedRegion === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedRegion(null)}
            >
              All Regions
            </Button>
            {regions.map((region) => (
              <Button
                key={region.name}
                variant={selectedRegion === region.name ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedRegion(region.name)}
              >
                {region.name}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Popular Countries Banner */}
      {showPopularFirst && !selectedRegion && !searchQuery && (
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500 fill-current" />
              Popular Study Destinations
            </CardTitle>
          </CardHeader>
        </Card>
      )}

      {/* Countries Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {filteredCountries.map((country) => {
          const isSelected = selectedCountry === country.name;
          const agentSupported = hasAgentSupport(country.name);

          return (
            <Button
              key={country.code}
              onClick={() => onSelect(country.name)}
              variant={isSelected ? "default" : "outline"}
              className={`
                justify-start h-auto p-4 text-left
                ${isSelected ? "ring-2 ring-blue-500" : ""}
                ${
                  agentSupported
                    ? "border-green-200 hover:border-green-300"
                    : ""
                }
              `}
            >
              <span className="flex items-center justify-between w-full">
                <span className="flex items-center space-x-3">
                  <span className="text-2xl">{country.flag}</span>
                  <span>
                    <span className="font-medium block">{country.name}</span>
                    <span className="text-xs text-gray-500 block">
                      {country.region}
                    </span>
                  </span>
                </span>
                <span className="flex flex-col items-end space-y-1">
                  {country.popular && (
                    <Badge variant="secondary" className="text-xs">
                      <Star className="h-3 w-3 mr-1" />
                      Popular
                    </Badge>
                  )}
                  {agentSupported && (
                    <Badge
                      variant="outline"
                      className="text-xs border-green-500 text-green-700"
                    >
                      <Users className="h-3 w-3 mr-1" />
                      Agents Available
                    </Badge>
                  )}
                </span>
              </span>
            </Button>
          );
        })}
      </div>

      {/* No Results */}
      {filteredCountries.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>No countries found matching your search.</p>
          <Button
            variant="link"
            onClick={() => {
              setSearchQuery("");
              setSelectedRegion(null);
            }}
          >
            Clear filters
          </Button>
        </div>
      )}

      {/* Agent Support Notice */}
      <Card className="bg-gray-50 border-gray-200">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-3">
            <Users className="h-5 w-5 text-blue-600 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-gray-900 mb-1">
                Professional Agent Support
              </p>
              <div className="text-gray-600">
                Countries with{" "}
                <Badge
                  variant="outline"
                  className="border-green-500 text-green-700 text-xs"
                >
                  Agents Available
                </Badge>{" "}
                have dedicated visa and admission specialists who will
                personally handle your application.
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
