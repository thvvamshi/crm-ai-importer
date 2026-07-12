import { InferSchemaType, Schema, model } from "mongoose";

const leadSchema = new Schema(
  {
    importId: {
      type: Schema.Types.ObjectId,
      ref: "Import",
      required: true,
      index: true,
    },

    // Lead creation date from the imported CSV
    leadCreatedAt: {
      type: Date,
      default: null,
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
      index: true,
    },

    countryCode: {
      type: String,
      trim: true,
      default: null,
    },

    mobileWithoutCountryCode: {
      type: String,
      trim: true,
      default: null,
      index: true,
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

    crmStatus: {
      type: String,
      enum: ["GOOD_LEAD_FOLLOW_UP", "DID_NOT_CONNECT", "BAD_LEAD", "SALE_DONE"],
      default: null,
    },

    crmNote: {
      type: String,
      trim: true,
      default: null,
    },

    dataSource: {
      type: String,
      enum: [
        "leads_on_demand",
        "meridian_tower",
        "eden_park",
        "varah_swamy",
        "sarjapur_plots",
      ],
      default: null,
    },

    possessionTime: {
      type: String,
      trim: true,
      default: null,
    },

    description: {
      type: String,
      trim: true,
      default: null,
    },
  },
  {
    collection: "leads",
    timestamps: true, // MongoDB document createdAt & updatedAt
    versionKey: false,
  },
);

/**
 * Prevent duplicate email addresses within the same import.
 */
leadSchema.index(
  {
    importId: 1,
    email: 1,
  },
  {
    unique: true,
    sparse: true,
    name: "uniq_import_email",
  },
);

/**
 * Prevent duplicate phone numbers within the same import.
 */
leadSchema.index(
  {
    importId: 1,
    mobileWithoutCountryCode: 1,
  },
  {
    unique: true,
    sparse: true,
    name: "uniq_import_mobile",
  },
);

export type LeadDocument = InferSchemaType<typeof leadSchema>;

export const LeadModel = model<LeadDocument>("Lead", leadSchema);
