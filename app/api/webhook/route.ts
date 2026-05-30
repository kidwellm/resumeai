import { stripe } from '@/lib/stripe';
import { NextResponse } from 'next/server';
export async function POST(req: Request) {
const body = await req.text();
const sig = req.headers.get('stripe-signature')!;
let event;
try {
event = stripe.webhooks.constructEvent(
body,
sig,
process.env.STRIPE_WEBHOOK_SECRET!
);
} catch (err) {
return NextResponse.json({ error: 'Webhook error' }, { status: 400 });
}
if (event.type === 'checkout.session.completed') {
const session = event.data.object;
console.log('Payment successful!', session);
// TODO: save subscription to your database here
}
if (event.type === 'customer.subscription.deleted') {
console.log('Subscription cancelled');
// TODO: remove subscription from your database here
}
return NextResponse.json({ received: true });
}