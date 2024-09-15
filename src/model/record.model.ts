import mongoose, { Document, Model, Schema } from "mongoose";

export interface IRecord extends Document {
  name: string;
  position: string;
  level: string;
}

const RecordSchema: Schema<IRecord> = new Schema({
  name: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
});

export const RECORD: Model<IRecord> = mongoose.model<IRecord>(
  "record",
  RecordSchema
);
