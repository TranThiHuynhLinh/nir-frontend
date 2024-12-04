"use client"
import { Bar, BarChart, CartesianGrid, XAxis, Tooltip, YAxis } from "recharts"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltipContent,
} from "@/components/ui/chart"
export const MultipleBarChart = ({
    data,
    title,
    className,
}: {
    data: IDataMultipleBarChart[]
    title: string
    className?: string
}) => {
    const chartConfig: ChartConfig = {
        min: { label: "Min", color: "hsl(var(--chart-1))" },
        max: { label: "Max", color: "hsl(var(--chart-2))" },
        mean: { label: "Mean", color: "hsl(var(--chart-3))" },
        median: { label: "Median", color: "hsl(var(--chart-4))" },
    }
    const chartData = data.map((item) => ({
        name: item.name,
        min: item.min,
        max: item.max,
        mean: item.mean,
        median: item.median,
    }))

    return (
        <Card className={`bg-light-card w-full ${className}`}>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart width={300} height={300} data={chartData}>
                        <CartesianGrid vertical={false} />
                        <YAxis scale="log" domain={["auto", "auto"]} />
                        <XAxis
                            dataKey="name"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                        />
                        <Tooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Bar
                            dataKey="min"
                            fill={chartConfig.min.color}
                            radius={8}
                        />
                        <Bar
                            dataKey="max"
                            fill={chartConfig.max.color}
                            radius={8}
                        />
                        <Bar
                            dataKey="mean"
                            fill={chartConfig.mean.color}
                            radius={8}
                        />
                        <Bar
                            dataKey="median"
                            fill={chartConfig.median.color}
                            radius={8}
                        />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
