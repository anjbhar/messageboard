import { createClient } from '@supabase/supabase-js'
import MessageList from './components/MessageList'
import MessageForm from './components/MessageForm'
import { revalidatePath } from 'next/cache'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default async function Home() {
  const { data: messages } = await supabase
    .from('messages')
    .select('*')
    .order('created_at', { ascending: false })

  async function handleMessageSent() {
    'use server'
    revalidatePath('/')
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto p-4">
        <MessageForm onMessageSent={handleMessageSent} />
        <MessageList messages={messages || []} />
      </div>
    </main>
  )
}
