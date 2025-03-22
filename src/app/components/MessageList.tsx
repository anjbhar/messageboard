'use server'
import { supabase } from '@/lib/supabase/server'
import { Card, CardContent } from "@/app/components/ui/card"
import { ScrollArea } from "@/app/components/ui/scroll-area"

interface Message {
  id: string
  content: string
  author: string
  created_at: string
}

interface MessageListProps {
  boardId: string
}

async function getMessages(boardId: string) {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .eq('board_id', boardId)
    .order('created_at', { ascending: false })
  if (error) {
    console.error('Error fetching messages:', error)
    throw error
  }

  return data as Message[]
}

export default async function MessageList({ boardId }: MessageListProps) {
  const messages = await getMessages(boardId)

  if (!messages.length) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-gray-500 text-center">No messages yet. Be the first to post!</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <ScrollArea className="h-[500px]"> 
      {messages.map((message) => (
        <Card key={message.id}>
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-2">
              <p className="font-medium">{message.author}</p>
              <span className="text-sm text-gray-500">
                {new Date(message.created_at).toLocaleString()}
              </span>
            </div>
            <p className="text-gray-700 whitespace-pre-wrap">{message.content}</p>
          </CardContent>
        </Card>
      ))}
      </ScrollArea>
    </div>
  )
} 