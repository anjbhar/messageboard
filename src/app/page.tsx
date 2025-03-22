import { boards } from './config/boards'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card"

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-8">Message Boards</h1>
        <div className="grid gap-4">
          {boards.map((board) => (
            <Link key={board.id} href={`/board/${board.slug}`}>
              <Card className="hover:bg-gray-50 transition-colors">
                <CardHeader>
                  <CardTitle>{board.name}</CardTitle>
                  <CardDescription>{board.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
