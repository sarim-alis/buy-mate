import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker, DayContentProps } from "react-day-picker"
import { format } from "date-fns"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function HoverDayContent(props: DayContentProps) {
  const [showTooltip, setShowTooltip] = React.useState(false)
  const formattedDate = format(props.date, "MMMM d, yyyy")

  return (
    <span
      className="relative"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {props.date.getDate()}
      {showTooltip && (
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 pointer-events-none">
          <span className="block bg-indigo-600 text-white text-xs font-medium px-3 py-1.5 rounded-md shadow-lg whitespace-nowrap">
            {formattedDate}
            <span className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-indigo-600" />
          </span>
        </span>
      )}
    </span>
  )
}

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3 bg-background text-foreground", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-x-4 space-y-4 sm:space-y-0",
        month: "space-y-4",

        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium text-foreground",

        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",

        table: "w-full border-collapse space-y-1",

        head_row: "hidden",
        head_cell: "hidden",

        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-indigo-100 dark:[&:has([aria-selected])]:bg-indigo-900/30 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",

        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-indigo-50 hover:text-indigo-700 dark:hover:bg-indigo-950 dark:hover:text-indigo-300 transition-colors"
        ),

        day_range_start: "day-range-start",
        day_range_end: "day-range-end",

        day_selected:
          "bg-indigo-600 text-white hover:bg-indigo-700 hover:text-white focus:bg-indigo-600 focus:text-white dark:bg-indigo-600 dark:text-white dark:hover:bg-indigo-700",

        day_today:
          "border-2 border-indigo-500 dark:border-indigo-400 font-bold text-indigo-600 dark:text-indigo-400",

        day_outside:
          "day-outside text-muted-foreground opacity-50 aria-selected:bg-indigo-100/50 dark:aria-selected:bg-indigo-900/20 aria-selected:text-muted-foreground aria-selected:opacity-30",

        day_disabled: "text-muted-foreground opacity-50",

        day_range_middle:
          "aria-selected:bg-indigo-100 dark:aria-selected:bg-indigo-900/50 aria-selected:text-indigo-900 dark:aria-selected:text-indigo-100",

        day_hidden: "invisible",

        ...classNames,
      }}
      components={{
        DayContent: HoverDayContent,
        IconLeft: () => <ChevronLeft className="h-4 w-4" />,
        IconRight: () => <ChevronRight className="h-4 w-4" />,
      }}
      {...props}
    />
  )
}

Calendar.displayName = "Calendar"
export { Calendar }