"use client";

import { StatusSelect } from "@/components/admin/StatusSelect";
import { formatCurrency } from "@/lib/utils";
import type { Order, OrderStatus } from "@/types/order";

export function OrderTable({
  onStatusChange,
  orders,
}: {
  onStatusChange: (reference: string, status: OrderStatus) => void;
  orders: Order[];
}) {
  return (
    <div>
      <div className="grid gap-4 md:hidden">
        {orders.map((order) => (
          <article
            className="rounded-md border border-slate-200 bg-white p-5"
            key={order.reference}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.1em] text-teal-800">
                  {order.reference}
                </p>
                <h3 className="mt-1 text-lg font-black text-slate-950">
                  {order.customer.fullName || "Not specified"}
                </h3>
              </div>
              <span className="rounded-full bg-mint-100 px-3 py-1 text-xs font-black text-teal-800">
                {order.status}
              </span>
            </div>
            <div className="mt-4 grid gap-3 text-sm text-slate-600">
              <p>
                <strong className="text-slate-950">Phone:</strong>{" "}
                {order.customer.phone}
              </p>
              <p>
                <strong className="text-slate-950">Products:</strong>{" "}
                {order.items.map((item) => item.product.name).join(", ")}
              </p>
              <p>
                <strong className="text-slate-950">Total:</strong>{" "}
                {formatCurrency(order.total)}
              </p>
              {order.paymentMethod === "Mobile money" && (
                <p>
                  <strong className="text-slate-950">Txn ID:</strong>{" "}
                  <code className="bg-slate-100 px-1 py-0.5 rounded text-xs font-mono">{order.transactionId || "N/A"}</code>
                </p>
              )}
            </div>
            <div className="mt-4">
              <StatusSelect
                onChange={(status) => onStatusChange(order.reference, status)}
                value={order.status}
              />
            </div>
          </article>
        ))}
      </div>
      <div className="hidden overflow-hidden rounded-md border border-slate-200 bg-white md:block">
        <div className="overflow-x-auto">
          <table className="min-w-[1080px] w-full border-collapse text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-[0.08em] text-slate-500">
              <tr>
                <th className="px-4 py-3">Reference</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Products</th>
                <th className="px-4 py-3">Quantity</th>
                <th className="px-4 py-3">Total</th>
                <th className="px-4 py-3">Delivery</th>
                <th className="px-4 py-3">Payment</th>
                <th className="px-4 py-3">Created</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr className="border-t border-slate-200" key={order.reference}>
                  <td className="px-4 py-4 font-black text-teal-800">
                    {order.reference}
                  </td>
                  <td className="px-4 py-4 font-bold text-slate-950">
                    {order.customer.fullName || "Not specified"}
                  </td>
                  <td className="px-4 py-4 text-slate-600">{order.customer.phone}</td>
                  <td className="px-4 py-4 text-slate-600">
                    {order.items.map((item) => item.product.name).join(", ")}
                  </td>
                  <td className="px-4 py-4 text-slate-600">
                    {order.items.reduce((total, item) => total + item.quantity, 0)}
                  </td>
                  <td className="px-4 py-4 font-black text-slate-950">
                    {formatCurrency(order.total)}
                  </td>
                  <td className="px-4 py-4 text-slate-600">
                    {order.deliveryMethod}
                  </td>
                  <td className="px-4 py-4 text-slate-600">
                    <div>{order.paymentMethod}</div>
                    {order.paymentMethod === "Mobile money" && order.transactionId && (
                      <div className="mt-0.5 text-xs text-slate-400 font-mono font-semibold">
                        ID: {order.transactionId}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-4 text-slate-600">
                    {new Intl.DateTimeFormat("en-GH", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    }).format(new Date(order.createdAt))}
                  </td>
                  <td className="px-4 py-4">
                    <StatusSelect
                      onChange={(status) => onStatusChange(order.reference, status)}
                      value={order.status}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
