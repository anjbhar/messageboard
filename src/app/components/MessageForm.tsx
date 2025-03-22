'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { Textarea } from "@/app/components/ui/textarea"
import { Input } from "@/app/components/ui/input"
import { ChangeEvent } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog"

interface MessageFormProps {
  boardId: string
}

export default function MessageForm({ boardId }: MessageFormProps) {
  const [newMessage, setNewMessage] = useState('')
  const [author, setAuthor] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [open, setOpen] = useState(false)
  const router = useRouter()

  async function addMessage(e: React.FormEvent) {
    e.preventDefault()
    if (!newMessage.trim() || !author.trim()) return

    try {
      console.log('Posting message to board:', boardId)
      const { error } = await supabase
        .from('messages')
        .insert([{ 
          content: newMessage,
          author: author,
          board_id: boardId
        }])

      if (error) {
        console.error('Error posting message:', error)
        throw error
      }
      
      setNewMessage('')
      setAuthor('')
      setOpen(false)
      router.refresh()
    } catch (error) {
      console.error('Error adding message:', error)
      setError('Failed to post message. Please try again.')
    }
  }

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Message Board</CardTitle>
        <CardDescription>Share your thoughts with the community</CardDescription>
      </CardHeader>
      
      <CardContent>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="w-full">Post a Message</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Post a Message to {boardId}</DialogTitle>
              <DialogDescription>
                Share your thoughts with the community. Click post when you're done.
              </DialogDescription>
            </DialogHeader>
            
            {error && (
              <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
                {error}
              </div>
            )}

            <form onSubmit={addMessage} className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="text"
                  value={author}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setAuthor(e.target.value)}
                  placeholder="Your name..."
                  className="w-full"
                />
                <Textarea
                  value={newMessage}
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setNewMessage(e.target.value)}
                  placeholder="Write your message..."
                  rows={3}
                  className="w-full resize-none"
                />
              </div>
              <Button type="submit" className="w-full">
                Post Message
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
} 