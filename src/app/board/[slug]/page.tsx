import { boards } from '@/app/config/boards'
import { notFound } from 'next/navigation'
import { useParams } from 'next/navigation'
import MessageForm from '@/components/MessageForm'
import MessageList from '@/components/MessageList'

interface BoardPageProps {
  params: {
    slug: string
  }
}

export default async function BoardPage({ params }: BoardPageProps) {
  const p = await params
  const board = boards.find(b => b.slug === p.slug)
  
  if (!board) {
    notFound()
  } 

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-2">{board.name}</h1>         
        <MessageForm boardId={board.id} />
      </div>
      <div className="max-w-4xl mx-auto p-4">
        <MessageList boardId={board.id} />
      </div>
    </main>
  )
} 