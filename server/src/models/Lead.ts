import { InferSchemaType, Schema, model } from "mongoose";

const leadSchema = new Schema(
  {
    importId: {
      type: Schema.Types.ObjectId,
      ref: "Import",
      required: true,
    },

    name: {
      type: String,
      trim: true,
      default: null,
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: null,
    },

    phone: {
      type: String,
      trim: true,
      default: null,
    },

    company: {
      type: String,
      trim: true,
      default: null,
    },

    city: {
      type: String,
      trim: true,
      default: null,
    },

    state: {
      type: String,
      trim: true,
      default: null,
    },

    country: {
      type: String,
      trim: true,
      default: null,
    },

    leadOwner: {
      type: String,
      trim: true,
      default: null,
    },

    remarks: {
      type: String,
      trim: true,
      default: null,
    },
  },
  {
    collection: "leads",
    timestamps: true,
    versionKey: false,
    minimize: false,
  }
);

leadSchema.index({ importId: 1 });
leadSchema.index({ email: 1 });
leadSchema.index({ importId: 1, email: 1 });

export type LeadDocument = InferSchemaType<typeof leadSchema>;

export const LeadModel = model("Lead", leadSchema);