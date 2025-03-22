'use server'
import { supabase } from '@/lib/supabase/server'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

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
        <CardContent className="p-3">
          <p className="text-gray-500 text-center">No messages yet. Be the first to post!</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <ScrollArea className="max-h-96"> 
      {messages.map((message) => (
        <Card key={message.id}>
          <CardContent className="p-2">
            <div className="flex justify-between items-start mb-2">
              <p className="font-medium">{message.author}</p>
            </div>
            <p className="text-gray-700 whitespace-pre-wrap">{message.content}</p>
          </CardContent>
          <CardFooter className="p-2 text-sm text-gray-500">
            <span className="ml-auto">
              {new Date(message.created_at).toLocaleString()}
            </span>
          </CardFooter>
        </Card>
      ))}
      </ScrollArea>
    </div>
  )
} 