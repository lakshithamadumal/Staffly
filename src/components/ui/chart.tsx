"use client"

import * as React from "react"
import * as RechartsPrimitive from "recharts"

import { cn } from "@/lib/utils"

// Format: { [key in string]: { label?: React.ReactNode; color?: string; icon?: React.ComponentType } }
export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode
    icon?: React.ComponentType
    color?: string
    theme?: Record<string, string>
  }
}

type ChartContextProps = {
  config: ChartConfig
}

const ChartContext = React.createContext<ChartContextProps | null>(null)

function useChart() {
  const context = React.useContext(ChartContext)
  if (!context) {
    throw new Error("useChart must be used within a ChartContainer.")
  }
  return context
}

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    config: ChartConfig
    children: React.ComponentProps<
      typeof RechartsPrimitive.ResponsiveContainer
    >["children"]
  }
>(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = React.useId()
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        ref={ref}
        data-chart={chartId}
        className={cn(
          "flex aspect-video justify-center text-xs [&_.recharts-cartesian-grid-horizontal_line]:stroke-zinc-800/60 [&_.recharts-cartesian-grid-vertical_line]:stroke-zinc-800/60 [&_.recharts-curve.recharts-area]:fill-opacity-50 [&_.recharts-active-dot_circle]:stroke-[#161618] [&_.recharts-active-dot_circle]:stroke-2 [&_.recharts-active-dot_circle]:fill-white [&_.recharts-sector]:stroke-[#161618] [&_.recharts-sector]:stroke-2 [&_.recharts-sector]:fill-zinc-300 [&_.recharts-surface]:outline-none [&_.recharts-surface]:ring-0 [&_.recharts-dot]:stroke-[#161618] [&_.recharts-dot]:stroke-2 [&_.recharts-dot]:fill-zinc-400 [&_.recharts-legend-item]:inline-flex [&_.recharts-legend-item]:items-center [&_.recharts-legend-item]:gap-1.5 [&_.recharts-legend-item_svg]:size-3 [&_.recharts-legend-item_svg]:shrink-0 [&_.recharts-legend-item_svg]:rounded-[2px] [&_.recharts-legend-item_svg]:text-zinc-500 [&_.recharts-cartesian-axis-tick_text]:fill-zinc-500 [&_.recharts-cartesian-axis-tick_text]:font-medium [&_.recharts-cartesian-axis-tick_text]:tabular-nums",
          className
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  )
})
ChartContainer.displayName = "ChartContainer"

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(
    ([, config]) => config.color || config.theme
  )

  if (!colorConfig.length) {
    return null
  }

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
[data-chart=${id}] {
${colorConfig
  .map(([key, config]) => {
    const color = config.color
    return color ? `--color-${key}: ${color};` : ""
  })
  .join("\n")}
}
`,
      }}
    />
  )
}

const ChartTooltip = RechartsPrimitive.Tooltip

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    active?: boolean
    payload?: any[]
    label?: string
    labelFormatter?: (label: any, payload: any[]) => React.ReactNode
    labelClassName?: string
    formatter?: (value: any, name: any, item: any, index: any, payload: any[]) => React.ReactNode
    indicator?: "line" | "dot" | "dashed"
    hideLabel?: boolean
    hideIndicator?: boolean
    nameKey?: string
    labelKey?: string
  }
>(
  (
    {
      active,
      payload,
      label,
      labelFormatter,
      labelClassName,
      formatter,
      indicator = "dot",
      hideLabel = false,
      hideIndicator = false,
      nameKey,
      labelKey,
      className,
    },
    ref
  ) => {
    const { config } = useChart()

    const tooltipLabel = React.useMemo(() => {
      if (hideLabel || !payload?.length) {
        return null
      }

      const [item] = payload
      const key = `${labelKey || item.dataKey || item.name || "value"}`
      const itemConfig = config[key]
      const value =
        typeof labelKey === "string"
          ? config[labelKey]?.label || label
          : itemConfig?.label || label

      if (labelFormatter) {
        return (
          <div className={cn("font-medium text-zinc-300", labelClassName)}>
            {labelFormatter(value, payload)}
          </div>
        )
      }

      if (!value) {
        return null
      }

      return <div className={cn("font-medium text-zinc-300", labelClassName)}>{value}</div>
    }, [
      label,
      labelFormatter,
      labelClassName,
      payload,
      hideLabel,
      labelKey,
      config,
    ])

    if (!active || !payload?.length) {
      return null
    }

    const nestFormatter = (item: any, index: number) => {
      const key = `${nameKey || item.name || item.dataKey || "value"}`
      const itemConfig = config[key]
      const name = itemConfig?.label || item.name

      return (
        <div key={item.dataKey || index} className="flex items-center gap-1.5 text-zinc-400">
          {!hideIndicator && (
            <div
              className={cn(
                "h-2 w-2 shrink-0 rounded-[2px]",
                indicator === "dot" && "rounded-full",
                indicator === "dashed" && "border-b border-dashed",
                "bg-[var(--color-value)]"
              )}
              style={
                {
                  "--color-value": item.color || item.payload.fill,
                } as React.CSSProperties
              }
            />
          )}
          <div className="flex flex-1 justify-between gap-4 leading-none">
            <span>{name}</span>
            <span className="font-medium tabular-nums text-zinc-100">
              {item.value}
            </span>
          </div>
        </div>
      )
    }

    return (
      <div
        ref={ref}
        className={cn(
          "grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-zinc-800 bg-[#161618] px-2.5 py-1.5 text-xs shadow-xl text-zinc-100",
          className
        )}
      >
        {tooltipLabel}
        <div className="grid gap-1.5">
          {payload.map((item, index) => nestFormatter(item, index))}
        </div>
      </div>
    )
  }
)
ChartTooltipContent.displayName = "ChartTooltipContent"

const ChartLegend = RechartsPrimitive.Legend

const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    payload?: any[]
    verticalAlign?: "top" | "bottom"
    hideIcon?: boolean
    nameKey?: string
  }
>(({ className, hideIcon = false, payload, verticalAlign = "bottom", nameKey }, ref) => {
  const { config } = useChart()

  if (!payload?.length) {
    return null
  }

  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center justify-center gap-4",
        verticalAlign === "top" ? "pb-3" : "pt-3",
        className
      )}
    >
      {payload.map((item, index) => {
        const key = `${nameKey || item.dataKey || item.name || "value"}`
        const itemConfig = config[key]
        return (
          <div
            key={item.value || index}
            className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-100 transition-colors"
          >
            {!hideIcon && (
              <div
                className="h-2 w-2 shrink-0 rounded-[2px]"
                style={{
                  backgroundColor: item.color || item.payload.fill,
                }}
              />
            )}
            <span>{itemConfig?.label || item.value}</span>
          </div>
        )
      })}
    </div>
  )
})
ChartLegendContent.displayName = "ChartLegendContent"

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
}
