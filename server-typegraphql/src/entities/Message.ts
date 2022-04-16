import { getModelForClass, prop as Property } from '@typegoose/typegoose';
import { Field, ObjectType } from 'type-graphql';

import { BaseModel } from './BaseModel';

@ObjectType()
export class Message extends BaseModel {
	@Field()
	readonly _id!: string;

	@Field()
	@Property({ required: true, trim: true, minlength: 2 })
	text!: string;

	@Field()
	@Property({ required: true, trim: true, minlength: 2 })
	createdBy!: string;
}

export const MessageModel = getModelForClass<typeof Message>(Message);
