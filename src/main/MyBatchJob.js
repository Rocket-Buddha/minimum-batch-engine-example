const { BatchJob } = require("batch-engine");
const { BatchRecord } = require("batch-engine");

/**
 * This is the main class of the batch engine, the batch job.
 */
class MyBatchJob extends BatchJob {

  /**
   * We will override the constructor only to keep a count.
   * Most of the times you will not need to do this.
   */
  constructor() {
    super();
    // This count.
    this.count = 0;
  }

  /**
   * Maybe you want to do something before the batch starts,
   * like open a file.
   * In this scenery we do not need this.
   */
  doPreBatchTasks() {
    
  }

  /**
   * Get method is an abstract method that we have to define.
   * This method is to define how batch-engine will take the next record in the batch.
   */
  async getNext() {
    /**
     * This is only for the example.
     */
    this.count++;
    /**
     * We will inject 100 records in the step chain.
     */
    if (this.count <= 100) {
      /**
       * It has to return a BatchRecord composed by an recordId and a payload.
       * Basically you will use your own record id to keep track of the record until all execution.
       * The payload is whatever you want.
       */
      return new BatchRecord(this.count, String(this.count));
    }
    /**
     * When there is no more records you will return null to let batch-engine null,
     * that this is the end.
     */
    return null;
  }

  /**
   * Maybe you want to do something before the batch exits,
   * like close a file.
   * In this scenery we do not need this.
   */
  doPostBatchTasks() {
    
  }
}

module.exports = MyBatchJob;