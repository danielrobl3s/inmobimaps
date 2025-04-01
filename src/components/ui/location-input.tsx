import React, { useState } from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import {
  Command,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

// Import JSON data directly
import countries from '@/data/countries.json'
import states from '@/data/states.json'

interface Timezone {
  zoneName: string
  gmtOffset: number
  gmtOffsetName: string
  abbreviation: string
  tzName: string
}

interface CountryProps {
  id: number
  name: string
  iso3: string
  iso2: string
  numeric_code: string
  phone_code: string
  capital: string
  currency: string
  currency_name: string
  currency_symbol: string
  tld: string
  native: string
  region: string
  region_id: string
  subregion: string
  subregion_id: string
  nationality: string
  timezones: Timezone[]
  translations: Record<string, string>
  latitude: string
  longitude: string
  emoji: string
  emojiU: string
}

interface StateProps {
  id: number
  name: string
  country_id: number
  country_code: string
  country_name: string
  state_code: string
  type: string | null
  latitude: string
  longitude: string
}

interface LocationSelectorProps {
  disabled?: boolean
  onCountryChange?: (country: CountryProps | null) => void
  onStateChange?: (state: StateProps | null) => void
}

const LocationSelector = ({
  disabled,
  onCountryChange,
  onStateChange,
}: LocationSelectorProps) => {
  const [selectedCountry, setSelectedCountry] = useState<CountryProps | null>(
    {
      "id": 142,
      "name": "Mexico",
      "iso3": "MEX",
      "iso2": "MX",
      "numeric_code": "484",
      "phone_code": "52",
      "capital": "Ciudad de México",
      "currency": "MXN",
      "currency_name": "Mexican peso",
      "currency_symbol": "$",
      "tld": ".mx",
      "native": "México",
      "region": "Americas",
      "region_id": "2",
      "subregion": "Central America",
      "subregion_id": "9",
      "nationality": "Mexican",
      "timezones": [
          {
              "zoneName": "America/Bahia_Banderas",
              "gmtOffset": -21600,
              "gmtOffsetName": "UTC-06:00",
              "abbreviation": "CST",
              "tzName": "Central Standard Time (North America"
          },
          {
              "zoneName": "America/Cancun",
              "gmtOffset": -18000,
              "gmtOffsetName": "UTC-05:00",
              "abbreviation": "EST",
              "tzName": "Eastern Standard Time (North America"
          },
          {
              "zoneName": "America/Chihuahua",
              "gmtOffset": -25200,
              "gmtOffsetName": "UTC-07:00",
              "abbreviation": "MST",
              "tzName": "Mountain Standard Time (North America"
          },
          {
              "zoneName": "America/Hermosillo",
              "gmtOffset": -25200,
              "gmtOffsetName": "UTC-07:00",
              "abbreviation": "MST",
              "tzName": "Mountain Standard Time (North America"
          },
          {
              "zoneName": "America/Matamoros",
              "gmtOffset": -21600,
              "gmtOffsetName": "UTC-06:00",
              "abbreviation": "CST",
              "tzName": "Central Standard Time (North America"
          },
          {
              "zoneName": "America/Mazatlan",
              "gmtOffset": -25200,
              "gmtOffsetName": "UTC-07:00",
              "abbreviation": "MST",
              "tzName": "Mountain Standard Time (North America"
          },
          {
              "zoneName": "America/Merida",
              "gmtOffset": -21600,
              "gmtOffsetName": "UTC-06:00",
              "abbreviation": "CST",
              "tzName": "Central Standard Time (North America"
          },
          {
              "zoneName": "America/Mexico_City",
              "gmtOffset": -21600,
              "gmtOffsetName": "UTC-06:00",
              "abbreviation": "CST",
              "tzName": "Central Standard Time (North America"
          },
          {
              "zoneName": "America/Monterrey",
              "gmtOffset": -21600,
              "gmtOffsetName": "UTC-06:00",
              "abbreviation": "CST",
              "tzName": "Central Standard Time (North America"
          },
          {
              "zoneName": "America/Ojinaga",
              "gmtOffset": -25200,
              "gmtOffsetName": "UTC-07:00",
              "abbreviation": "MST",
              "tzName": "Mountain Standard Time (North America"
          },
          {
              "zoneName": "America/Tijuana",
              "gmtOffset": -28800,
              "gmtOffsetName": "UTC-08:00",
              "abbreviation": "PST",
              "tzName": "Pacific Standard Time (North America"
          }
      ],
      "translations": {
          "kr": "멕시코",
          "pt-BR": "México",
          "pt": "México",
          "nl": "Mexico",
          "hr": "Meksiko",
          "fa": "مکزیک",
          "de": "Mexiko",
          "es": "México",
          "fr": "Mexique",
          "ja": "メキシコ",
          "it": "Messico",
          "cn": "墨西哥",
          "tr": "Meksika"
      },
      "latitude": "23.00000000",
      "longitude": "-102.00000000",
      "emoji": "🇲🇽",
      "emojiU": "U+1F1F2 U+1F1FD"
  },
  )
  const [selectedState, setSelectedState] = useState<StateProps | null>(
    {
      "id": 3453,
      "name": "Durango",
      "country_id": 142,
      "country_code": "MX",
      "country_name": "Mexico",
      "state_code": "DUR",
      "type": "state",
      "latitude": "37.27528000",
      "longitude": "-107.88006670"
  },
  )
  const [openCountryDropdown, setOpenCountryDropdown] = useState(false)
  const [openStateDropdown, setOpenStateDropdown] = useState(false)

  // Cast imported JSON data to their respective types
  const countriesData = countries as CountryProps[]
  const statesData = states as StateProps[]

  // Filter states for selected country
  const availableStates = statesData.filter(
    (state) => state.country_id === selectedCountry?.id,
  )

  const handleCountrySelect = (country: CountryProps | null) => {
    console.log(country)
    setSelectedCountry(country)
    setSelectedState(null) // Reset state when country changes
    onCountryChange?.(country)
    onStateChange?.(null)
  }

  const handleStateSelect = (state: StateProps | null) => {
    console.log(state)
    setSelectedState(state)
    onStateChange?.(state)
  }

  return (
    <div className="flex gap-4">
      {/* Country Selector */}
      <Popover open={openCountryDropdown} onOpenChange={setOpenCountryDropdown}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={openCountryDropdown}
            disabled={disabled}
            className="w-full justify-between"
          >
            {selectedCountry ? (
              <div className="flex items-center gap-2">
                <span>{selectedCountry.emoji}</span>
                <span>{selectedCountry.name}</span>
              </div>
            ) : (
              <span>Select Country...</span>
            )}
            <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0">
          <Command>
            <CommandInput placeholder="Search country..." />
            <CommandList>
              <CommandEmpty>No country found.</CommandEmpty>
              <CommandGroup>
                <ScrollArea className="h-[300px]">
                  {countriesData.map((country) => (
                    <CommandItem
                      key={country.id}
                      value={country.name}
                      onSelect={() => {
                        handleCountrySelect(country)
                        setOpenCountryDropdown(false)
                      }}
                      className="flex cursor-pointer items-center justify-between text-sm"
                    >
                      <div className="flex items-center gap-2">
                        <span>{country.emoji}</span>
                        <span>{country.name}</span>
                      </div>
                      <Check
                        className={cn(
                          'h-4 w-4',
                          selectedCountry?.id === country.id
                            ? 'opacity-100'
                            : 'opacity-0',
                        )}
                      />
                    </CommandItem>
                  ))}
                  <ScrollBar orientation="vertical" />
                </ScrollArea>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {/* State Selector - Only shown if selected country has states */}
      {availableStates.length > 0 && (
        <Popover open={openStateDropdown} onOpenChange={setOpenStateDropdown}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={openStateDropdown}
              disabled={!selectedCountry}
              className="w-full justify-between"
            >
              {selectedState ? (
                <span>{selectedState.name}</span>
              ) : (
                <span>Select State...</span>
              )}
              <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[300px] p-0">
            <Command>
              <CommandInput placeholder="Search state..." />
              <CommandList>
                <CommandEmpty>No state found.</CommandEmpty>
                <CommandGroup>
                  <ScrollArea className="h-[300px]">
                    {availableStates.map((state) => (
                      <CommandItem
                        key={state.id}
                        value={state.name}
                        onSelect={() => {
                          handleStateSelect(state)
                          setOpenStateDropdown(false)
                        }}
                        className="flex cursor-pointer items-center justify-between text-sm"
                      >
                        <span>{state.name}</span>
                        <Check
                          className={cn(
                            'h-4 w-4',
                            selectedState?.id === state.id
                              ? 'opacity-100'
                              : 'opacity-0',
                          )}
                        />
                      </CommandItem>
                    ))}
                    <ScrollBar orientation="vertical" />
                  </ScrollArea>
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      )}
    </div>
  )
}

export default LocationSelector
