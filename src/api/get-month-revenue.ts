import { api } from "@/lib/axios";

export interface GetMonthRevenueRespones {
	receipt: number;
	diffFromLastMonth: number;
}

export async function GetMonthRevenue() {
	const response = await api.get<GetMonthRevenueRespones>(
		"/metrics/month-receipt",
	);

	return response.data;
}
