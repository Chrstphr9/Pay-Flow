"use client";

import { Plus, Trash2 } from "lucide-react";
import {
  calculateLineAmount,
  formatCurrency,
  type CurrencyCode,
  type LineItem,
} from "@/lib/invoice-math";

interface LineItemsTableProps {
  items: LineItem[];
  currency: CurrencyCode;
  onChange: (items: LineItem[]) => void;
}

export function LineItemsTable({ items, currency, onChange }: LineItemsTableProps) {
  function updateItem(id: string, patch: Partial<LineItem>) {
    onChange(items.map((item) => (item.id === id ? { ...item, ...patch } : item)));
  }

  function removeItem(id: string) {
    if (items.length === 1) return; // keep at least one row
    onChange(items.filter((item) => item.id !== id));
  }

  function addItem() {
    onChange([
      ...items,
      { id: crypto.randomUUID(), description: "", qty: 1, rate: 0 },
    ]);
  }

  return (
    <div className="card-payflow rounded-2xl border border-payflow-light/40 bg-white p-4 sm:p-6">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-payflow-dark">Line items</p>
        <button
          type="button"
          onClick={addItem}
          className="flex items-center gap-1.5 rounded-lg border border-payflow-light/50 px-3 py-1.5 text-xs font-medium text-payflow-dark transition-colors hover:bg-payflow-light/20"
        >
          <Plus className="h-3.5 w-3.5" strokeWidth={2} />
          Add line
        </button>
      </div>

      {/* Column labels — only meaningful once the grid layout kicks in at sm */}
      <div className="mt-4 hidden gap-3 px-1 text-[11px] font-medium tracking-wide text-payflow-accent sm:grid sm:grid-cols-[1fr_80px_140px_32px]">
        <span>Description</span>
        <span>Qty</span>
        <span>Rate</span>
        <span />
      </div>

      <div className="mt-2 flex flex-col gap-3 sm:gap-2">
        {items.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-1 gap-3 rounded-lg border border-payflow-light/30 p-3 sm:grid-cols-[1fr_80px_140px_32px] sm:items-center sm:rounded-none sm:border-0 sm:p-0"
          >
            <input
              type="text"
              value={item.description}
              onChange={(e) => updateItem(item.id, { description: e.target.value })}
              placeholder="e.g. Brand identity refresh"
              className="input-payflow rounded-lg px-3 py-2 text-sm"
            />

            {/* Qty + Rate + remove button: 3-col row on mobile, individual grid cells from sm up */}
            <div className="grid grid-cols-[1fr_1fr_32px] items-end gap-3 sm:contents">
              <label className="flex flex-col gap-1 sm:contents">
                <span className="text-[10px] font-medium uppercase tracking-wide text-payflow-accent sm:hidden">
                  Qty
                </span>
                <input
                  type="number"
                  min={0}
                  value={item.qty}
                  onChange={(e) => updateItem(item.id, { qty: Number(e.target.value) })}
                  className="input-payflow rounded-lg px-3 py-2 text-sm"
                />
              </label>

              <label className="flex flex-col gap-1 sm:contents">
                <span className="text-[10px] font-medium uppercase tracking-wide text-payflow-accent sm:hidden">
                  Rate
                </span>
                <input
                  type="number"
                  min={0}
                  value={item.rate}
                  onChange={(e) => updateItem(item.id, { rate: Number(e.target.value) })}
                  className="input-payflow rounded-lg px-3 py-2 text-sm"
                />
              </label>

              <button
                type="button"
                onClick={() => removeItem(item.id)}
                disabled={items.length === 1}
                aria-label="Remove line"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-payflow-dark/40 transition-colors hover:bg-red-50 hover:text-red-500 disabled:opacity-30 disabled:hover:bg-transparent sm:h-8 sm:w-8"
              >
                <Trash2 className="h-4 w-4" strokeWidth={1.75} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Per-row computed amount, shown once at least one line has values */}
      <div className="mt-4 flex flex-col gap-1 border-t border-payflow-light/30 pt-3">
        {items.map(
          (item) =>
            (item.description || item.qty > 0) && (
              <div key={item.id} className="flex justify-between gap-3 text-xs text-payflow-accent">
                <span className="truncate">{item.description || "Untitled line"}</span>
                <span className="shrink-0">{formatCurrency(calculateLineAmount(item.qty, item.rate), currency)}</span>
              </div>
            )
        )}
      </div>
    </div>
  );
}