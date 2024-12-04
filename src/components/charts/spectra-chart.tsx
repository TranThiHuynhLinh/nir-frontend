"use client"

import { Card, CardContent } from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

const chartConfig = {
    spectra: {
        label: "Spectra",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig

export const SpectraChart = ({
    spectra,
    className,
}: {
    spectra: ISpectraRes
    className?: string
}) => {
    // Use the data from the first spectra as an example
    const chartData = spectra.data.map((value, index) => ({
        point: index + 1, // Assuming each point corresponds to an index
        value,
    }))

    return (
        <Card className={`w-full bg-light-card ${className}`}>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <AreaChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            left: 12,
                            right: 12,
                            top: 16,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="point"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => `P${value}`}
                        />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                        <defs>
                            <linearGradient id="fillSpectra" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor="var(--color-spectra)"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--color-spectra)"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                        </defs>
                        <Area
                            dataKey="value"
                            type="natural"
                            fill="url(#fillSpectra)"
                            fillOpacity={0.4}
                            stroke="var(--color-spectra)"
                            stackId="a"
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
