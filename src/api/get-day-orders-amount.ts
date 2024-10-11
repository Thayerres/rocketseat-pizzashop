import { api } from "@/lib/axios";

export interface GetDayOrdersAmountRespones {
	amount: number;
	diffFromYesterday: number;
}

export async function getDayOrdersAmount() {
	const response = await api.get<GetDayOrdersAmountRespones>(
		"/metrics/day-orders-amount",
	);

	return response.data;
}
