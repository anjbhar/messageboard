import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface Message {
  id: number
  content: string
  author: string
  created_at: string
}

interface MessageListProps {
  messages: Message[]
}

export default function MessageList({ messages }: MessageListProps) {
  return (
    <div className="space-y-4">
      {messages.map(message => (
        <Card key={message.id}>
          <CardHeader>
            <CardTitle className="text-lg">{message.author}</CardTitle>
            <CardDescription>
              {new Date(message.created_at).toLocaleDateString()} at {new Date(message.created_at).toLocaleTimeString()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 whitespace-pre-wrap">{message.content}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
} 