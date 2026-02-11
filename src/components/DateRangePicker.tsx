"use client"

import * as React from "react"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DateRangePickerProps {
  dateRange: DateRange | undefined
  onDateRangeChange: (range: DateRange | undefined) => void
}

export function DateRangePicker({ dateRange, onDateRangeChange }: DateRangePickerProps) {
  const [hoveredDate, setHoveredDate] = React.useState<Date | null>(null)

  return (
    <div className="relative">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !dateRange && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dateRange?.from ? (
              dateRange.to ? (
                <>
                  {format(dateRange.from, "LLL dd, y")} -{" "}
                  {format(dateRange.to, "LLL dd, y")}
                </>
              ) : (
                format(dateRange.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="relative">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={dateRange?.from}
              selected={dateRange}
              onSelect={onDateRangeChange}
              numberOfMonths={2}
              modifiers={{
                hovered: hoveredDate ? [hoveredDate] : [],
              }}
              onDayMouseEnter={(day) => setHoveredDate(day)}
              onDayMouseLeave={() => setHoveredDate(null)}
            />
            {hoveredDate && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-popover border rounded-md shadow-lg px-3 py-2 text-sm pointer-events-none z-10">
                <p className="font-medium text-popover-foreground">
                  {format(hoveredDate, "EEEE, MMMM d, yyyy")}
                </p>
              </div>
            )}
          </div>
          {dateRange?.from && (
            <div className="p-3 border-t">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => onDateRangeChange(undefined)}
              >
                Clear dates
              </Button>
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  )
}
