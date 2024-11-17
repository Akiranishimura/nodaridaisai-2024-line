import { WebhookEvent, MessageAPIResponseBase, messagingApi } from '@line/bot-sdk';
import { isMessageKey } from './messages/messageMap';
import { messageMap } from './messages/messageMap';

export const textEventHandler = async (event: WebhookEvent, accessToken: string): Promise<MessageAPIResponseBase | undefined> => {
	if (event.type !== 'message' || event.message.type !== 'text') {
		return;
	}

	const { replyToken } = event;
	const { text } = event.message;
	const lineClient = new messagingApi.MessagingApiClient({
		channelAccessToken: accessToken,
	});

	if (text in messageMap && isMessageKey(text)) {
		await replyMessage(replyToken, [...messageMap[text]], lineClient);
	}
};

export const replyMessage = async (replyToken: string, messages: any[], lineClient: messagingApi.MessagingApiClient) => {
	try {
		await lineClient.replyMessage({
			replyToken: replyToken,
			messages: messages,
		});
	} catch (err: unknown) {
		console.log(err);
	}
};
