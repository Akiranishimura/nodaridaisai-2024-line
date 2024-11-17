import { MessageAPIResponseBase, TextMessage, WebhookEvent } from '@line/bot-sdk';
import { Hono } from 'hono';
import { textEventHandler } from './textEventHandler';

const app = new Hono();
app.get('*', (c) => c.text('Hello World!'));

app.post('/api/webhook', async (c) => {
	const data = await c.req.json();
	const events: WebhookEvent[] = (data as any).events;
	const accessToken: string = c.env.CHANNEL_ACCESS_TOKEN;

	await Promise.all(
		events.map(async (event: WebhookEvent) => {
			try {
				await textEventHandler(event, accessToken);
			} catch (err: unknown) {
				if (err instanceof Error) {
					console.error(err);
				}
				return c.json({
					status: 'error',
				});
			}
		})
	);
	return c.json({ message: 'ok' });
});



export default app;
