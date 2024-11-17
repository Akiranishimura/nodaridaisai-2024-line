import { WebhookEvent } from '@line/bot-sdk';
import { MessageAPIResponseBase } from '@line/bot-sdk';
import eventMessages from './messages/event.json';
import informationMessages from './messages/information.json';

export const textEventHandler = async (event: WebhookEvent, accessToken: string): Promise<MessageAPIResponseBase | undefined> => {
	if (event.type !== 'message' || event.message.type !== 'text') {
		return;
	}

	const { replyToken } = event;
	const { text } = event.message;

	const messageMap = {
		'イベント情報': [eventMessages.event],
		'開催日時': [eventMessages.date],
		'テーマ': [eventMessages.theme],
		'アクセス': [eventMessages.access],
		'その他の内容': [eventMessages.other],
		'ご案内': [informationMessages.information],
		'よくあるご質問を見たい': [informationMessages.faq],
		'お手洗い、休憩スペースの場所': [informationMessages.restroom],
		'お手洗い': [informationMessages.toilet, informationMessages.map],
		'休憩スペース': [informationMessages.restspace, informationMessages.map],
		'落とし物関連': [informationMessages.lost_item],
		'落とし物をした': [informationMessages.lost_1_1, informationMessages.lost_1_2],
		'落とし物を拾った': [informationMessages.lost_2_1, informationMessages.lost_2_2],
	} as const;

	// messageMapのキーの型を定義
	type MessageKey = keyof typeof messageMap;
	// 型ガードの関数を追加
	function isMessageKey(key: string): key is MessageKey {
		return key in messageMap;
	}

	if (text in messageMap && isMessageKey(text)) {
		await replyMessage(replyToken, [...messageMap[text]], accessToken);
	}
};

export const replyMessage = async (replyToken: string, messages: any[], accessToken: string) => {
	try {
		await fetch('https://api.line.me/v2/bot/message/reply', {
			body: JSON.stringify({
				replyToken: replyToken,
				messages: messages,
			}),
			method: 'POST',
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'Content-Type': 'application/json',
			},
		});
	} catch (err: unknown) {
		console.log(err);
	}
};

