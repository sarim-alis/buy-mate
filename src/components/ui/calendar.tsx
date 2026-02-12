import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row gap-4",
        month: "space-y-4",

        caption: "flex justify-center pt-2 relative items-center",
        caption_label: "text-sm font-medium",

        nav: "flex items-center gap-1",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),

        table: "w-full border-collapse",

        /* ✅ FIXED GRID */
        head_row: "grid grid-cols-7",
        head_cell:
          "text-muted-foreground text-center text-[0.8rem] font-normal",

        row: "grid grid-cols-7 mt-2",
        cell: "relative p-0 text-center",

        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal hover:bg-accent hover:text-accent-foreground"
        ),

        day_selected:
          "bg-indigo-600 text-white hover:bg-indigo-700 hover:text-white focus:bg-indigo-600 focus:text-white dark:bg-indigo-600 dark:text-white dark:hover:bg-indigo-700",

        day_today:
          "border border-indigo-400 dark:border-indigo-500 font-semibold",

        day_outside: "text-muted-foreground opacity-40",

        day_disabled: "text-muted-foreground opacity-30",

        day_range_middle:
          "aria-selected:bg-indigo-100 dark:aria-selected:bg-indigo-900 aria-selected:text-foreground",

        day_hidden: "invisible",

        ...classNames,
      }}

      /* ✅ REQUIRED IN v9 */
      components={{
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