const { BatchStep } = require("batch-engine");
const fs = require('fs');

/**
 * This will be our first step in the chain.
 */
class MyStep4 extends BatchStep {

  /**
   * We have to override the Step method of the framework BatchStep class.
   * @param {any} previousStepPayloadAcc This will be whatever that the previous step give us.
   * It will always be an array, the array length will depend of the number of tasks that we have to accumulate.
   * This is the first step, so, the engine will give us a BatchRecord extracted from the file!
   */
  async step(previousStepPayloadAcc) {

    /**
     * All the tasks should return a promise that will be executed asynchronously.
     */
    return new Promise((resolve, reject) => {

      /**
       * Let's join all of this in an output file.
       * We do not have to use setTimeout in this case because, 
       * write a file in this way already is a async task.
       */
      fs.appendFile('/home/andres/Desktop/out.log',
        String(previousStepPayloadAcc[0]) + "\n",
        (err) => {
          if (err) {
            reject(err);
          } else {
            /**
            * We can resolve the task when this is completed!
            */
            resolve();
          }
        });
    });
  }
}

module.exports = MyStep4;