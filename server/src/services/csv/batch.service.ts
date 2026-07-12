import { AI_BATCH_SIZE } from "../../constants/ai.constants.js";

export interface BatchOptions {
  batchSize?: number;
}

const DEFAULT_BATCH_SIZE = AI_BATCH_SIZE;

class BatchService {
  createBatches<T>(items: T[], options: BatchOptions = {}): T[][] {
    const batchSize = options.batchSize ?? DEFAULT_BATCH_SIZE;

    if (batchSize <= 0) {
      throw new Error("Batch size must be greater than zero.");
    }

    const batches: T[][] = [];

    for (let index = 0; index < items.length; index += batchSize) {
      batches.push(items.slice(index, index + batchSize));
    }

    return batches;
  }
}

export const batchService = new BatchService();
