'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { ChangeEvent } from 'react'

interface MessageFormProps {
  onMessageSent: () => void
}

export default function MessageForm({ onMessageSent }: MessageFormProps) {
  const [newMessage, setNewMessage] = useState('')
  const [author, setAuthor] = useState('')
  const [error, setError] = useState<string | null>(null)

  async function addMessage(e: React.FormEvent) {
    e.preventDefault()
    if (!newMessage.trim() || !author.trim()) return

    try {
      const { error } = await supabase
        .from('messages')
        .insert([{ 
          content: newMessage,
          author: author
        }])

      if (error) throw error
      
      setNewMessage('')
      onMessageSent() // Trigger refetch of messages
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
      
      {error && (
        <CardContent>
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        </CardContent>
      )}

      <CardContent>
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
      </CardContent>
    </Card>
  )
} 