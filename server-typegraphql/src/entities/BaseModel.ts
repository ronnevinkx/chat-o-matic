import { modelOptions, prop as Property } from '@typegoose/typegoose';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
@modelOptions({ schemaOptions: { timestamps: true } })
export class BaseModel {
	@Field()
	@Property()
	createdAt: Date;

	@Field()
	@Property()
	updatedAt: Date;
}
