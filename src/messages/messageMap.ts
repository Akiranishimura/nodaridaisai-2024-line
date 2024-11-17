import eventMessages from './event.json';
import informationMessages from './information.json';

export const messageMap = {
	//incoming message : reply message
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
export	type MessageKey = keyof typeof messageMap;
	// 型ガードの関数を追加
	export function isMessageKey(key: string): key is MessageKey {
		return key in messageMap;
	}
