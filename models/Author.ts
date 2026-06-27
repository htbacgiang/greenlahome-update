import { Schema, models, model, ObjectId, Model } from "mongoose";

export interface AuthorModelSchema {
  _id: ObjectId;
  name: string;
  avatar?: { url: string; public_id?: string | null };
  biography?: string;
  role?: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

const AuthorSchema = new Schema<AuthorModelSchema>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    avatar: {
      type: Object,
      url: String,
      public_id: String,
    },
    biography: {
      type: String,
      trim: true,
      default: "",
    },
    role: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Author = models?.Author || model("Author", AuthorSchema);

export default Author as Model<AuthorModelSchema>;
