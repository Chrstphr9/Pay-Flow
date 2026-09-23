"use client";

import { Check, Send } from "lucide-react";
import { formatCurrency, VAT_RATE, type CurrencyCode } from "@/lib/invoice-math";

interface SummaryPanelProps {
  subtotal: number;
  vat: number;
  total: number;
  currency: CurrencyCode;
  onSaveDraft: () => void;
  onSaveAndSend: () => void;
  saving?: boolean;
}

export function SummaryPanel({
  subtotal,
  vat,
  total,
  currency,
  onSaveDraft,
  onSaveAndSend,
  saving = false,
}: SummaryPanelProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="card-payflow rounded-2xl border border-payflow-light/40 bg-white p-4 sm:p-6">
        <p className="text-sm font-medium text-payflow-dark">Summary</p>

        <div className="mt-4 flex flex-col gap-2.5 text-sm">
          <div className="flex justify-between">
            <span className="text-payflow-accent">Subtotal</span>
            <span className="text-payflow-dark">{formatCurrency(subtotal, currency)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-payflow-accent">VAT ({(VAT_RATE * 100).toFixed(1)}%)</span>
            <span className="text-payflow-dark">{formatCurrency(vat, currency)}</span>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-payflow-light/40 pt-4">
          <span className="text-sm font-medium text-payflow-dark">Total</span>
          <span className="text-lg font-semibold text-payflow-orange">
            {formatCurrency(total, currency)}
          </span>
        </div>

        <div className="mt-5 flex flex-col gap-2">
          <button
            type="button"
            onClick={onSaveDraft}
            disabled={saving}
            className="btn-payflow-primary flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium disabled:opacity-60"
          >
            <Check className="h-4 w-4" strokeWidth={2} />
            Save as draft
          </button>
          <button
            type="button"
            onClick={onSaveAndSend}
            disabled={saving}
            className="flex items-center justify-center gap-2 rounded-lg bg-payflow-dark py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            <Send className="h-4 w-4" strokeWidth={1.75} />
            Save and send
          </button>
        </div>
      </div>

      <div className="rounded-2xl bg-payflow-light/15 p-4">
        <p className="text-xs font-medium text-payflow-dark">A quick note</p>
        <p className="mt-1 text-xs leading-relaxed text-payflow-accent">
          Invoices with a clear due date and payment link are paid 2.3 days faster on average.
        </p>
      </div>
    </div>
  );
}