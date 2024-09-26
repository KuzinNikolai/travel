import type { Order } from "@share/schemas"
import { Memo } from "../Memo"

export const memoOrders = new Memo<Order[]>()
