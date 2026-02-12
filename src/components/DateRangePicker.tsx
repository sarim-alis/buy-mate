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
  dateRange: { from: Date | null; to: Date | null } | null
  onDateRangeChange: (dates: { from: Date | null; to: Date | null } | null) => void
}

export function DateRangePicker({ dateRange, onDateRangeChange }: DateRangePickerProps) {
  const [date, setDate] = React.useState<DateRange | undefined>(() => {
    if (dateRange && dateRange.from) {
      return {
        from: dateRange.from,
        to: dateRange.to || undefined,
      }
    }
    return undefined
  })

  // Sync internal state when external dateRange prop changes (e.g., clear filters)
  React.useEffect(() => {
    if (!dateRange) {
      setDate(undefined)
    } else if (dateRange.from) {
      setDate({
        from: dateRange.from,
        to: dateRange.to || undefined,
      })
    }
  }, [dateRange])

  const handleSelect = (range: DateRange | undefined) => {
    setDate(range)
    if (!range || !range.from) {
      onDateRangeChange(null)
    } else {
      onDateRangeChange({ from: range.from, to: range.to || null })
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full h-10 justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date?.from ? (
            date.to ? (
              <>
                {format(date.from, "MMM dd, yyyy")} -{" "}
                {format(date.to, "MMM dd, yyyy")}
              </>
            ) : (
              format(date.from, "MMM dd, yyyy")
            )
          ) : (
            <span>Pick a date range</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 z-[200]" align="start">
        <Calendar
          initialFocus
          mode="range"
          defaultMonth={date?.from}
          selected={date}
          onSelect={handleSelect}
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
  )
}
