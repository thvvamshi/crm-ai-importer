import { InferSchemaType, Schema, model } from "mongoose";

export enum ImportStatus {
  UPLOADED = "UPLOADED",
  PREVIEW_READY = "PREVIEW_READY",
  QUEUED = "QUEUED",
  PROCESSING = "PROCESSING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  CANCELLED = "CANCELLED",
}

const importSchema = new Schema(
  {
    originalFilename: {
      type: String,
      required: true,
      trim: true,
    },

    storedFilename: {
      type: String,
      required: true,
      trim: true,
    },

    filePath: {
      type: String,
      required: true,
    },

    fileSize: {
      type: Number,
      required: true,
      min: 0,
    },

    mimeType: {
      type: String,
      required: true,
    },

    totalRows: {
      type: Number,
      default: 0,
      min: 0,
    },

    processedRows: {
      type: Number,
      default: 0,
      min: 0,
    },

    skippedRows: {
      type: Number,
      default: 0,
      min: 0,
    },

    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    status: {
      type: String,
      enum: Object.values(ImportStatus),
      default: ImportStatus.PREVIEW_READY,
      index: true,
    },
  },
  {
    collection: "imports",
    timestamps: true,
    versionKey: false,
    minimize: false,
  }
);

importSchema.index({ createdAt: -1 });

export type ImportDocument = InferSchemaType<typeof importSchema>;

export const ImportModel = model("Import", importSchema);