import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class Notification {
	@Field()
	_id: string;

	@Field()
	text: string;

	@Field()
	createdBy: string;

	@Field(() => Date)
	date: Date;
}

export interface NotificationPayload {
	_id: string;
	text: string;
	createdBy: string;
}
