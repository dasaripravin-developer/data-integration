import { prop, getModelForClass } from '@typegoose/typegoose';

export class Cases {
  @prop({ required: true })
  bankName!: string;

  @prop({ required: true })
  propertyName!: string;

  @prop({ required: true })
  city!: string;

  @prop({ required: true })
  borrowerName!: string;

  @prop({ default: new Date() })
  createdAt!: Date;
}

export const CasesModel = getModelForClass(Cases);