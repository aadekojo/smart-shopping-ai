import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);


export async function POST(req: Request) {
    try{
        const body = await req.json();
        const { address, cartItems, total, email } = body;

        console.log('📦 Request received:', body);
        
        // Validate email
        if (!email || typeof email !== 'string' || !email.includes('@')) {
            console.error('❌ Invalid customer email:', email);
            return NextResponse.json({ error: 'Invalid customer email' }, { status: 400 });
          }

        
    const customerEmail = email.trim();
    const logisticsEmail = 'adekojo.abimbola@gmail.com';

    const itemList = cartItems
      .map(
        (item: any) =>
          `- ${item.name} (${item.quantity} × AED ${item.price}) from ${item.store}`
      )
      .join('\n');

    const message = `🛍 New Order Request\n\nItems:\n${itemList}\n\nAddress:\n${address}\n\nTotal: AED ${total}`;


    // Send to customer
    const customerResponse = await resend.emails.send({
        from: 'Smart Shop <onboarding@resend.dev>',
        to: customerEmail,
        subject: 'Your Order Quote Confirmation',
        text: `Thank you for shopping with us!\n\n${message}`,
      });

      console.log('✅ Customer email sent:', customerResponse);

    // Send to Deliverado
    const logisticsResponse = await resend.emails.send({
      from: 'Smart Shop <onboarding@resend.dev>',
      to: logisticsEmail,
      subject: '📦 New Delivery Request',
      text: message,
    });

    console.log('✅ Logistics email sent:', logisticsResponse);

   return NextResponse.json({ success: true });
  } catch (error) {
    console.error('❌ Email sending failed:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
