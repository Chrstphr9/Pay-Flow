export interface LineItem {
    id: string;
    description: string;
    qty: number;
    rate: number;
  }
  
  export const VAT_RATE = 0.075; // 7.5% — Nigerian standard VAT rate
  
  export const CURRENCIES = [
    { code: "NGN", label: "NGN · Nigerian naira", symbol: "₦" },
    { code: "USD", label: "USD · US dollar", symbol: "$" },
    { code: "GBP", label: "GBP · British pound", symbol: "£" },
    { code: "EUR", label: "EUR · Euro", symbol: "€" },
  ] as const;
  
  export type CurrencyCode = (typeof CURRENCIES)[number]["code"];
  
  /** Amount for a single line item: qty × rate. */
  export function calculateLineAmount(qty: number, rate: number): number {
    const safeQty = Number.isFinite(qty) ? qty : 0;
    const safeRate = Number.isFinite(rate) ? rate : 0;
    return safeQty * safeRate;
  }
  
  /** Sum of every line item's amount. */
  export function calculateSubtotal(items: LineItem[]): number {
    return items.reduce((sum, item) => sum + calculateLineAmount(item.qty, item.rate), 0);
  }
  
  /** VAT owed on a subtotal, at the given rate (defaults to 7.5%). */
  export function calculateVAT(subtotal: number, rate: number = VAT_RATE): number {
    return subtotal * rate;
  }
  
  /** Subtotal + VAT. */
  export function calculateTotal(subtotal: number, vat: number): number {
    return subtotal + vat;
  }
  
  /** Runs subtotal → VAT → total in one call, so callers don't chain manually. */
  export function calculateInvoiceTotals(items: LineItem[], vatRate: number = VAT_RATE) {
    const subtotal = calculateSubtotal(items);
    const vat = calculateVAT(subtotal, vatRate);
    const total = calculateTotal(subtotal, vat);
    return { subtotal, vat, total };
  }
  
  /** Formats a number as currency using the given ISO code (defaults to NGN). */
  export function formatCurrency(value: number, currency: CurrencyCode = "NGN"): string {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(Number.isFinite(value) ? value : 0);
  }
  
  /** Suggests the next invoice number given the last one issued, e.g. PF-2024-019 -> PF-2024-020. */
  export function nextInvoiceNumber(lastNumber: string): string {
    const match = lastNumber.match(/^(.*?)(\d+)$/);
    if (!match) return lastNumber;
    const [, prefix, digits] = match;
    const next = (parseInt(digits, 10) + 1).toString().padStart(digits.length, "0");
    return `${prefix}${next}`;
  }
  
  /** Days between issue date and due date — used for the "paid faster" hint and validation. */
  export function daysUntilDue(issueDate: string, dueDate: string): number | null {
    const issue = new Date(issueDate);
    const due = new Date(dueDate);
    if (Number.isNaN(issue.getTime()) || Number.isNaN(due.getTime())) return null;
    const msPerDay = 1000 * 60 * 60 * 24;
    return Math.round((due.getTime() - issue.getTime()) / msPerDay);
  }
  
  /** True when dueDate is on/after issueDate — used for form validation. */
  export function isDueDateValid(issueDate: string, dueDate: string): boolean {
    const days = daysUntilDue(issueDate, dueDate);
    return days !== null && days >= 0;
  }
  
  export function createEmptyLineItem(id: string): LineItem {
    return { id, description: "", qty: 1, rate: 0 };
  }