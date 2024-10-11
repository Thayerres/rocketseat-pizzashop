import { api } from "@/lib/axios";

export interface GetMonthOrdersAmountRespones {
	amount: number;
	diffFromLastMonth: number;
}

export async function GetMonthOrdersAmount() {
	const response = await api.get<GetMonthOrdersAmountRespones>(
		"/metrics/month-orders-amount",
	);

	return response.data;
}
