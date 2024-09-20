import type { Order } from "@entity/order";
import { Memo } from "../Memo";

export const memoOrders = new Memo<Order[]>()