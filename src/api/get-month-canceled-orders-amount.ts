import { api } from "@/lib/axios";

export interface GetMonthCanceledOrdersAmountRespones {
	amount: number;
	diffFromLastMonth: number;
}

export async function GetMonthCanceledOrdersAmount() {
	const response = await api.get<GetMonthCanceledOrdersAmountRespones>(
		"/metrics/month-canceled-orders-amount",
	);

	return response.data;
}
