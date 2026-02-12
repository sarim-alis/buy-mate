export function LoadingSpinner({ size = "default" }: { size?: "small" | "default" | "large" }) {
  const sizeClasses = {
    small: "h-12 w-12",
    default: "h-16 w-16",
    large: "h-24 w-24"
  }

  return (
    <div className="flex items-center justify-center">
      <div className={`${sizeClasses[size]} relative`}>
        <div className="absolute inset-0 rounded-full border-[6px] border-indigo-200 dark:border-indigo-900/40"></div>
        <div className="absolute inset-0 rounded-full border-[6px] border-transparent border-t-indigo-600 dark:border-t-indigo-500 animate-spin"></div>
      </div>
    </div>
  )
}

export function LoadingSpinnerWithText({ text = "Loading..." }: { text?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-6 min-h-[400px]">
      <div className="h-20 w-20 relative">
        <div className="absolute inset-0 rounded-full border-[6px] border-indigo-200 dark:border-indigo-900/40"></div>
        <div className="absolute inset-0 rounded-full border-[6px] border-transparent border-t-indigo-600 dark:border-t-indigo-500 animate-spin"></div>
      </div>
      <p className="text-base font-medium text-indigo-600 dark:text-indigo-400 animate-pulse">{text}</p>
    </div>
  )
}
