import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold">Payflow</h1>
      <Button asChild>
        <Link href="/login">Log In</Link>
      </Button>
    </main>
  )
}
