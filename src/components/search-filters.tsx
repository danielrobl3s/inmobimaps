"use client"

import { useState } from "react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Calendar } from "../components/ui"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, ChevronDown, SearchIcon, SlidersHorizontal, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Globe } from "lucide-react"

export default function SearchFilters() {
  const [location, setLocation] = useState("Melbourne, AU")
  const [dateRange, setDateRange] = useState({
    from: new Date(2025, 4, 16),
    to: new Date(2025, 4, 18),
  })
  const [price, setPrice] = useState("Any price")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("date")
  const [viewMode, setViewMode] = useState("list")

  return (
    <div className="px-4 py-4 border-b bg-white/80 backdrop-blur-sm sticky top-[73px] md:top-[81px] z-10">
      <div className="flex flex-wrap gap-2 mb-5">
        {/* Location Selector */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="h-10 gap-2 border-gray-300 rounded-full px-4 hover:bg-gray-50 transition-colors"
            >
              <Globe className="h-4 w-4 text-gray-500" />
              <span>{location}</span>
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[300px] p-0" align="start">
            <div className="p-4">
              <div className="space-y-2">
                <h4 className="font-medium">Popular locations</h4>
                <Button variant="ghost" className="w-full justify-start" onClick={() => setLocation("Melbourne, AU")}>
                  Melbourne, Australia
                </Button>
                <Button variant="ghost" className="w-full justify-start" onClick={() => setLocation("Sydney, AU")}>
                  Sydney, Australia
                </Button>
                <Button variant="ghost" className="w-full justify-start" onClick={() => setLocation("Brisbane, AU")}>
                  Brisbane, Australia
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        {/* Date Range Picker */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="h-10 border-gray-300 rounded-full px-4 hover:bg-gray-50 transition-colors"
            >
              <CalendarIcon className="h-4 w-4 mr-2 text-gray-500" />
              {dateRange.from ? (
                dateRange.to ? (
                  <>
                    {format(dateRange.from, "MMM d")} - {format(dateRange.to, "MMM d")}
                  </>
                ) : (
                  format(dateRange.from, "MMM d")
                )
              ) : (
                "Select dates"
              )}
              <ChevronDown className="h-4 w-4 ml-2 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={dateRange.from}
              selected={dateRange}
              onSelect={(range) => range && setDateRange(range)}
              numberOfMonths={2}
              className="rounded-md border shadow-lg"
            />
          </PopoverContent>
        </Popover>

        {/* Price Filter */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="h-10 border-gray-300 rounded-full px-4 hover:bg-gray-50 transition-colors"
            >
              <span>{price}</span>
              <ChevronDown className="h-4 w-4 ml-2 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[280px]" align="start">
            <div className="space-y-4 p-1">
              <h4 className="font-medium">Price range</h4>
              <div className="flex gap-4">
                <div className="grid gap-2 flex-1">
                  <label htmlFor="min-price" className="text-sm text-gray-500">
                    Min price
                  </label>
                  <Input id="min-price" placeholder="$" className="h-9" />
                </div>
                <div className="grid gap-2 flex-1">
                  <label htmlFor="max-price" className="text-sm text-gray-500">
                    Max price
                  </label>
                  <Input id="max-price" placeholder="$" className="h-9" />
                </div>
              </div>
              <Button className="w-full">Apply</Button>
            </div>
          </PopoverContent>
        </Popover>

        {/* More Filters */}
        <Button variant="outline" className="h-10 border-gray-300 rounded-full px-4 hover:bg-gray-50 transition-colors">
          <SlidersHorizontal className="h-4 w-4 mr-2 text-gray-500" />
          More filters
        </Button>
      </div>

      {/* Search Bar */}
      <div className="flex gap-2 mb-5">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 border-gray-300 focus-visible:ring-gray-400 rounded-md"
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0 hover:bg-gray-100 rounded-full"
              onClick={() => setSearchQuery("")}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        <Button variant="default" className="bg-rose-600 hover:bg-rose-700 text-white rounded-md">
          Search
        </Button>
        <Button variant="outline" className="border-gray-300 rounded-md hover:bg-gray-50">
          Clear
        </Button>
      </div>

      {/* Sort and View Options */}
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Button
            variant={sortBy === "date" ? "default" : "outline"}
            size="sm"
            onClick={() => setSortBy("date")}
            className={cn(
              "text-sm rounded-full px-4 transition-all",
              sortBy === "date" ? "bg-gray-900 hover:bg-gray-800 text-white" : "border-gray-300 hover:bg-gray-50",
            )}
          >
            Sort by date
          </Button>
          <Button
            variant={sortBy === "price" ? "default" : "outline"}
            size="sm"
            onClick={() => setSortBy("price")}
            className={cn(
              "text-sm rounded-full px-4 transition-all",
              sortBy === "price" ? "bg-gray-900 hover:bg-gray-800 text-white" : "border-gray-300 hover:bg-gray-50",
            )}
          >
            Sort by price
          </Button>
        </div>
        <div className="flex gap-1 bg-gray-100 p-1 rounded-md">
          <Button
            variant={viewMode === "list" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("list")}
            className={cn(
              "text-sm rounded-md",
              viewMode === "list" ? "bg-white shadow-sm" : "bg-transparent hover:bg-gray-200",
            )}
          >
            List
          </Button>
          <Button
            variant={viewMode === "grid" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("grid")}
            className={cn(
              "text-sm rounded-md",
              viewMode === "grid" ? "bg-white shadow-sm" : "bg-transparent hover:bg-gray-200",
            )}
          >
            Grid
          </Button>
        </div>
      </div>
    </div>
  )
}
