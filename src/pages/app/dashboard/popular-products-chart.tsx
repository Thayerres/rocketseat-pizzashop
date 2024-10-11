import { getPopularProduct } from "@/api/get-popular-products";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type ChartConfig, ChartContainer } from "@/components/ui/chart";
import { useQuery } from "@tanstack/react-query";
import { BarChart, Loader2 } from "lucide-react";
import { Cell, Pie, PieChart } from "recharts";
import colors from "tailwindcss/colors";

const COLORS = [
	colors.sky[500],
	colors.amber[500],
	colors.violet[500],
	colors.emerald[500],
	colors.rose[500],
];

const chartConfig = {
	desktop: {
		label: "Desktop",
		color: "#2563eb",
	},
	mobile: {
		label: "Mobile",
		color: "#60a5fa",
	},
} satisfies ChartConfig;

export function PopularProductsChart() {
	const { data: popularProducts } = useQuery({
		queryKey: ["metrics", "popular-products"],
		queryFn: getPopularProduct,
	});

	return (
		<Card className="col-span-3">
			<CardHeader className="pb-8">
				<div className="flex items-center justify-between">
					<CardTitle className="text-base font-medium">
						Produtos populares
					</CardTitle>
					<BarChart className="h-4 w-4 text-muted-foreground" />
				</div>
			</CardHeader>
			<CardContent>
				{popularProducts ? (
					<ChartContainer config={chartConfig} className="h-[240px] w-full">
						<PieChart style={{ fontSize: 12 }}>
							<Pie
								data={popularProducts}
								dataKey="amount"
								nameKey="product"
								cx="50%"
								cy="50%"
								outerRadius={86}
								innerRadius={64}
								strokeWidth={8}
								labelLine={false}
								label={({
									cx,
									cy,
									midAngle,
									innerRadius,
									outerRadius,
									value,
									index,
								}) => {
									const RADIAN = Math.PI / 180;
									const radius = 12 + innerRadius + (outerRadius - innerRadius);
									const x = cx + radius * Math.cos(-midAngle * RADIAN);
									const y = cy + radius * Math.sin(-midAngle * RADIAN);

									return (
										<text
											x={x}
											y={y}
											className="fill-muted-foreground text-xs"
											textAnchor={x > cx ? "start" : "end"}
											dominantBaseline="central"
										>
											{popularProducts[index].product.length > 12
												? popularProducts[index].product
														.substring(0, 12)
														.concat("...")
												: popularProducts[index].product}{" "}
											({value})
										</text>
									);
								}}
							>
								{popularProducts.map((_, index) => {
									return (
										<Cell
											key={`cell-${index}`}
											fill={COLORS[index]}
											className="stroke-background hover:opacity-80"
											stroke=""
										/>
									);
								})}
							</Pie>
						</PieChart>
					</ChartContainer>
				) : (
					<div className="flex h-[240px] w-full items-center justify-center">
						<Loader2 className="h-8 w-8 text-muted-foreground animate-spin" />
					</div>
				)}
			</CardContent>
		</Card>
	);
}