import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET

  if (!SIGNING_SECRET) {
    throw new Error('Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local')
  }

  // Create new Svix instance with secret
  const wh = new Webhook(SIGNING_SECRET)

  console.log("Clerk webhook here")

  // Get headers
  const headerPayload = await headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response(JSON.stringify({ error: 'Error: Missing Svix headers' }), {
      status: 400,
    })
  }

  // Get body
  const payload = await req.json()
  const body = JSON.stringify(payload)

  let evt: WebhookEvent

  // Verify payload with headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error: Could not verify webhook:', err)
    return new Response(JSON.stringify({ error: 'Error: Verification error' }), {
      status: 400,
    })
  }

  // Do something with payload
  // For this guide, log payload to console
  const eventType = evt.type

  if (eventType == 'user.created' || eventType == 'user.updated') {
    const { id, ...attr } = evt.data;
    
    await prisma.user.upsert({
        where: { email: attr.email_addresses[0].email_address as string},
        create: {
            clerkId: id as string,
            username: attr.username as string,
            email: attr.email_addresses[0].email_address as string
        },
        update: {
            username: attr.username as string,
            email: attr.email_addresses[0].email_address as string
        }
    })

  }

  return new Response(JSON.stringify({ message: 'Webhook received' }), { status: 200 })
}