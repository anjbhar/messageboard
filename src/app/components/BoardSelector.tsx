'use client'

import { Button } from "@/app/components/ui/button"
import { useRouter, usePathname } from "next/navigation"

interface Board {
  id: number
  name: string
  description: string
}

interface BoardSelectorProps {
  boards: Board[]
  currentBoard: string
}

export default function BoardSelector({ boards, currentBoard }: BoardSelectorProps) {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
      {boards.map((board) => (
        <Button
          key={board.id}
          variant={currentBoard === board.name ? "default" : "outline"}
          onClick={() => router.push(`/board/${board.name}`)}
          className="whitespace-nowrap"
        >
          {board.name.charAt(0).toUpperCase() + board.name.slice(1)}
        </Button>
      ))}
    </div>
  )
} 