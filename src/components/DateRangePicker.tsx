"use client"

import { DatePicker } from "antd"
import type { Dayjs } from "dayjs"
import "./DateRangePicker.css"

const { RangePicker } = DatePicker

interface DateRangePickerProps {
  dateRange: [Date | null, Date | null] | null
  onDateRangeChange: (dates: [Date | null, Date | null] | null) => void
}

export function DateRangePicker({ dateRange, onDateRangeChange }: DateRangePickerProps) {
  const handleChange = (dates: null | [Dayjs | null, Dayjs | null]) => {
    if (!dates) {
      onDateRangeChange(null)
      return
    }
    
    const [start, end] = dates
    onDateRangeChange([
      start ? start.toDate() : null,
      end ? end.toDate() : null
    ])
  }

  const dateRender = (current: Dayjs) => {
    const formattedDate = current.format('MMMM DD, YYYY')
    return (
      <div className="ant-picker-cell-inner" aria-label={formattedDate}>
        {current.date()}
      </div>
    )
  }

  return (
    <RangePicker
      className="w-full h-10"
      placeholder={["Start Date", "End Date"]}
      onChange={handleChange}
      format="MMM DD, YYYY"
      placement="topLeft"
      allowClear
      dateRender={dateRender}
    />
  )
}
