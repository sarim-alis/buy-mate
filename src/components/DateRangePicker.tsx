"use client"

import * as React from "react"
import { CalendarIcon, X } from "lucide-react"
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

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation()
    setDate(undefined)
    onDateRangeChange(null)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full h-10 justify-start text-left font-normal bg-background text-foreground border-input hover:bg-accent hover:text-accent-foreground",
            !date && "text-muted-foreground",
            date?.from && "border-indigo-300 dark:border-indigo-700"
          )}
        >
          <CalendarIcon className={cn("mr-2 h-4 w-4 shrink-0", date?.from && "text-indigo-600 dark:text-indigo-400")} />
          <span className="flex-1 truncate">
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "MMM dd, yyyy")} – {format(date.to, "MMM dd, yyyy")}
                </>
              ) : (
                format(date.from, "MMM dd, yyyy")
              )
            ) : (
              "Pick a date range"
            )}
          </span>
          {date?.from && (
            <X
              className="ml-2 h-4 w-4 shrink-0 opacity-50 hover:opacity-100 transition-opacity"
              onClick={handleClear}
            />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 z-[200] bg-background border" align="start">
        <div className="p-3 border-b bg-indigo-50/50 dark:bg-indigo-950/30">
          <p className="text-sm font-medium text-foreground">
            {date?.from ? (
              date.to ? (
                <>Selected: <span className="text-indigo-600 dark:text-indigo-400">{format(date.from, "MMM d")} – {format(date.to, "MMM d, yyyy")}</span></>
              ) : (
                <>From: <span className="text-indigo-600 dark:text-indigo-400">{format(date.from, "MMMM d, yyyy")}</span> — select end date</>
              )
            ) : (
              <span className="text-muted-foreground">Select a start date</span>
            )}
          </p>
        </div>
        <Calendar
          initialFocus
          mode="range"
          defaultMonth={date?.from}
          selected={date}
          onSelect={handleSelect}
          numberOfMonths={2}
        />
        {date?.from && (
          <div className="p-3 border-t flex justify-end">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClear}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-3.5 w-3.5 mr-1.5" />
              Clear dates
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  )
}
