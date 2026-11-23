
import { Order,  OrderPayload, OrderStatus, User} from "./types";

const KEY = "ateliergo:orders";

const delay = (ms = 300) => new Promise((r) => setTimeout(r, ms));

const read = (): Order[] => {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]");
  } catch {
    return [];
  }
};

const write = (list: Order[]) =>
  localStorage.setItem(KEY, JSON.stringify(list));

const newestFirst = (a: Order, b: Order) =>
  b.createdAt.localeCompare(a.createdAt);

export async function createOrder(
  user: User,
  payload: OrderPayload
): Promise<Order> {
  await delay(400);
  // BACKEND ULANGANDA: POST /orders
  const order: Order = {
    id: crypto.randomUUID(),
    ...payload,
    clientId: user.id,
    clientName: user.name,
    clientPhone: user.phone,
    status: "new",
    createdAt: new Date().toISOString(),
  };
  write([order, ...read()]);
  return order;
}

export async function getTailorOrders(tailorId: string): Promise<Order[]> {
  await delay();
  // BACKEND ULANGANDA: GET /orders/incoming
  return read().filter((o) => o.tailorId === tailorId).sort(newestFirst);
}

export async function getClientOrders(clientId: string): Promise<Order[]> {
  await delay();
  // BACKEND ULANGANDA: GET /orders/mine
  return read().filter((o) => o.clientId === clientId).sort(newestFirst);
}

export async function updateOrderStatus(id: string, status: OrderStatus) {
  await delay(200);
  // BACKEND ULANGANDA: PATCH /orders/:id { status }
  write(read().map((o) => (o.id === id ? { ...o, status } : o)));
}