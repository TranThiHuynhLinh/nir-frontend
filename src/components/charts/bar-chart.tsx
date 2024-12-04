"use client"

import {
    Bar,
    BarChart,
    CartesianGrid,
    Rectangle,
    XAxis,
    Tooltip,
} from "recharts"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltipContent,
} from "@/components/ui/chart"

export const SimpleBarChart = ({
    data,
    title,
    x,
    y,
    className,
}: {
    data: ICollectionClassifyDensityRes[]
    title: string
    x: string
    y: string
    className?: string
}) => {
    const chartConfig: ChartConfig = data.reduce((config, item, index) => {
        const colorIndex = (index % 4) + 1
        return {
            ...config,
            [item.name]: {
                label: item.name,
                color: `hsl(var(--chart-${colorIndex}))`,
            },
        }
    }, {})

    const chartData = data.map((item) => ({
        ...item,
        fill: chartConfig[item.name]?.color || "hsl(var(--chart-1))",
    }))

    return (
        <Card className={`bg-light-card w-full ${className}`}>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey={x}
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) =>
                                chartConfig[value]?.label || value
                            }
                        />
                        <Tooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Bar
                            dataKey={y}
                            strokeWidth={2}
                            radius={8}
                            fillOpacity={0.8}
                            activeIndex={2}
                            activeBar={({ ...props }) => {
                                return (
                                    <Rectangle
                                        {...props}
                                        fillOpacity={0.8}
                                        stroke={props.fill}
                                        strokeDasharray={4}
                                        strokeDashoffset={4}
                                    />
                                )
                            }}
                        />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
