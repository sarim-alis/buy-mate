import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"
import { format } from "date-fns"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function HoverDay({
  day,
  children,
  className,
  ...props
}: React.ComponentProps<"td"> & { day: { date: Date } }) {
  const [showTooltip, setShowTooltip] = React.useState(false)
  const formattedDate = format(day.date, "MMMM d, yyyy")

  return (
    <td
      className={cn(className, "relative group")}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      {...props}
    >
      {children}
      {showTooltip && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 pointer-events-none">
          <div className="bg-indigo-600 text-white text-xs font-medium px-3 py-1.5 rounded-md shadow-lg whitespace-nowrap animate-in fade-in zoom-in-95 duration-150">
            {formattedDate}
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-indigo-600" />
          </div>
        </div>
      )}
    </td>
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
        months: "flex flex-col sm:flex-row gap-4",
        month: "space-y-4",

        caption: "flex justify-center pt-2 relative items-center",
        caption_label: "text-sm font-medium text-foreground",

        nav: "flex items-center gap-1",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),

        table: "w-full border-collapse",

        head_row: "hidden",
        head_cell: "hidden",

        row: "grid grid-cols-7 mt-2",
        cell: "relative p-0 text-center",

        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal hover:bg-indigo-50 hover:text-indigo-700 dark:hover:bg-indigo-950 dark:hover:text-indigo-300 transition-colors"
        ),

        day_selected:
          "bg-indigo-600 text-white hover:bg-indigo-700 hover:text-white focus:bg-indigo-600 focus:text-white dark:bg-indigo-600 dark:text-white dark:hover:bg-indigo-700",

        day_today:
          "border-2 border-indigo-500 dark:border-indigo-400 font-bold text-indigo-600 dark:text-indigo-400",

        day_outside: "text-muted-foreground opacity-40",

        day_disabled: "text-muted-foreground opacity-30",

        day_range_middle:
          "aria-selected:bg-indigo-100 dark:aria-selected:bg-indigo-900/50 aria-selected:text-indigo-900 dark:aria-selected:text-indigo-100",

        day_range_start: "rounded-l-md",
        day_range_end: "rounded-r-md",

        day_hidden: "invisible",

        ...classNames,
      }}
      components={{
        Day: HoverDay as any,
        Chevron: ({ orientation }) =>
          orientation === "left" ? (
            <ChevronLeft className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          ),
      }}
      {...props}
    />
  )
}

Calendar.displayName = "Calendar"
export { Calendar }