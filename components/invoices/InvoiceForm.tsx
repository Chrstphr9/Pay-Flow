"use client";

import { useMemo, useState } from "react";
import { ArrowLeft, Eye } from "lucide-react";
import {
  CURRENCIES,
  calculateInvoiceTotals,
  createEmptyLineItem,
  isDueDateValid,
  type CurrencyCode,
  type LineItem,
} from "@/lib/invoice-math";
import { LineItemsTable } from "@/components/invoices/LineItemsTable";
import { SummaryPanel } from "@/components/invoices/SummaryPanel";

interface InvoiceDraft {
  invoiceNumber: string;
  currency: CurrencyCode;
  issueDate: string;
  dueDate: string;
  billTo: string;
  customerEmail: string;
  lineItems: LineItem[];
  note: string;
}

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function inTenDaysISO() {
  const d = new Date();
  d.setDate(d.getDate() + 10);
  return d.toISOString().slice(0, 10);
}

const INITIAL_DRAFT: InvoiceDraft = {
  invoiceNumber: "PF-2024-019",
  currency: "NGN",
  issueDate: todayISO(),
  dueDate: inTenDaysISO(),
  billTo: "",
  customerEmail: "",
  lineItems: [createEmptyLineItem("line-1")],
  note: "",
};

export function InvoiceForm() {
  const [draft, setDraft] = useState<InvoiceDraft>(INITIAL_DRAFT);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { subtotal, vat, total } = useMemo(
    () => calculateInvoiceTotals(draft.lineItems),
    [draft.lineItems]
  );

  function update<K extends keyof InvoiceDraft>(key: K, value: InvoiceDraft[K]) {
    setDraft((prev) => ({ ...prev, [key]: value }));
  }

  function validate(): boolean {
    const next: Record<string, string> = {};

    if (!draft.invoiceNumber.trim()) next.invoiceNumber = "Invoice number is required.";
    if (!draft.issueDate) next.issueDate = "Issue date is required.";
    if (!draft.dueDate) next.dueDate = "Due date is required.";
    if (draft.issueDate && draft.dueDate && !isDueDateValid(draft.issueDate, draft.dueDate)) {
      next.dueDate = "Due date can't be before the issue date.";
    }
    if (!draft.billTo.trim()) next.billTo = "Customer name is required.";
    if (!/^\S+@\S+\.\S+$/.test(draft.customerEmail)) {
      next.customerEmail = "Enter a valid email address.";
    }
    if (draft.lineItems.every((item) => !item.description.trim())) {
      next.lineItems = "Add at least one line item.";
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSave(status: "draft" | "sent") {
    if (!validate()) return;
    setSaving(true);
    try {
      // Replace with your actual invoice creation call, e.g.:
      // await fetch("/api/invoices", { method: "POST", body: JSON.stringify({ ...draft, status, subtotal, vat, total }) });
      console.log("Saving invoice", { ...draft, status, subtotal, vat, total });
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      {/* Page header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-payflow-orange">
            Invoices / New
          </p>
          <h1 className="mt-1 text-xl font-semibold text-payflow-dark sm:text-2xl">Create invoice</h1>
          <p className="mt-1 text-sm text-payflow-accent">
            Build a thoughtful, easy-to-read invoice for your customer.
          </p>
        </div>

        <div className="flex gap-3">
          <button className="btn-payflow-outline flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium lg:flex-none">
            <ArrowLeft className="h-4 w-4" strokeWidth={1.75} />
            Cancel
          </button>
          <button className="btn-payflow-outline flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium lg:flex-none">
            <Eye className="h-4 w-4" strokeWidth={1.75} />
            Preview
          </button>
        </div>
      </div>

      {/* Body: form (2 cols) + summary (1 col) — stacked until lg */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="flex flex-col gap-4 lg:col-span-2">
          {/* Invoice details */}
          <div className="card-payflow rounded-2xl border border-payflow-light/40 bg-white p-4 sm:p-6">
            <p className="text-sm font-medium text-payflow-dark">Invoice details</p>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Invoice number" required error={errors.invoiceNumber}>
                <input
                  type="text"
                  value={draft.invoiceNumber}
                  onChange={(e) => update("invoiceNumber", e.target.value)}
                  className="input-payflow rounded-lg px-3 py-2 text-sm"
                />
              </Field>
              <Field label="Currency">
                <select
                  value={draft.currency}
                  onChange={(e) => update("currency", e.target.value as CurrencyCode)}
                  className="input-payflow rounded-lg px-3 py-2 text-sm"
                >
                  {CURRENCIES.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Issue date" required error={errors.issueDate}>
                <input
                  type="date"
                  value={draft.issueDate}
                  onChange={(e) => update("issueDate", e.target.value)}
                  className="input-payflow rounded-lg px-3 py-2 text-sm"
                />
              </Field>
              <Field label="Due date" required error={errors.dueDate}>
                <input
                  type="date"
                  value={draft.dueDate}
                  onChange={(e) => update("dueDate", e.target.value)}
                  className="input-payflow rounded-lg px-3 py-2 text-sm"
                />
              </Field>
            </div>
          </div>

          {/* Customer */}
          <div className="card-payflow rounded-2xl border border-payflow-light/40 bg-white p-4 sm:p-6">
            <p className="text-sm font-medium text-payflow-dark">Customer</p>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Bill to" required error={errors.billTo}>
                <input
                  type="text"
                  value={draft.billTo}
                  onChange={(e) => update("billTo", e.target.value)}
                  placeholder="Kora Foods Limited"
                  className="input-payflow rounded-lg px-3 py-2 text-sm"
                />
              </Field>
              <Field label="Customer email" required error={errors.customerEmail}>
                <input
                  type="email"
                  value={draft.customerEmail}
                  onChange={(e) => update("customerEmail", e.target.value)}
                  placeholder="accounts@korafoods.ng"
                  className="input-payflow rounded-lg px-3 py-2 text-sm"
                />
              </Field>
            </div>
          </div>

          {/* Line items */}
          <div>
            <LineItemsTable
              items={draft.lineItems}
              currency={draft.currency}
              onChange={(items) => update("lineItems", items)}
            />
            {errors.lineItems && (
              <p className="mt-1.5 px-1 text-xs text-red-500">{errors.lineItems}</p>
            )}
          </div>

          {/* Notes and terms */}
          <div className="card-payflow rounded-2xl border border-payflow-light/40 bg-white p-4 sm:p-6">
            <p className="text-sm font-medium text-payflow-dark">Notes and terms</p>
            <div className="mt-4">
              <Field label="Message to your customer">
                <textarea
                  value={draft.note}
                  onChange={(e) => update("note", e.target.value)}
                  placeholder="Thank you for choosing Sage &amp; Finch Studio."
                  rows={4}
                  className="input-payflow resize-none rounded-lg px-3 py-2 text-sm"
                />
              </Field>
              <p className="mt-1.5 text-xs text-payflow-accent">
                This note appears at the bottom of the invoice.
              </p>
            </div>
          </div>
        </div>

        {/* Summary */}
        <SummaryPanel
          subtotal={subtotal}
          vat={vat}
          total={total}
          currency={draft.currency}
          saving={saving}
          onSaveDraft={() => handleSave("draft")}
          onSaveAndSend={() => handleSave("sent")}
        />
      </div>
    </div>
  );
}

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[11px] font-medium tracking-wide text-payflow-accent">
        {label}
        {required && <span className="text-payflow-orange"> *</span>}
      </span>
      {children}
      {error && <span className="text-xs text-red-500">{error}</span>}
    </label>
  );
}