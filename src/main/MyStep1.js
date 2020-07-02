const { BatchStep } = require("batch-engine");

/**
 * This will be our first step in the chain.
 */
class MyStep1 extends BatchStep {
  
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
       *  We will use a setTimeout only to emulate some async task in the range of [0-1000]ms.
       *  WE DO NOT HAVE TO DO THIS IN A REAL BATCH!
       */
      setTimeout(() => {
        
        /**
         * This algorithm will accumulate the payloads joining the results in this way.
         * record1-record2-record3
         */
        let acc =  "";
        for(let i = 0; i < previousStepPayloadAcc.length; i++){
          if(i !== 0){
            acc = acc + "-" + previousStepPayloadAcc[i];
          }
          else {
            acc = previousStepPayloadAcc[i];
          }
        }
        
        /**
         * We can resolve the task when this is completed!
         */
        resolve(acc);

      }, Math.random() * 1000);
    });
  }
}

module.exports = MyStep1;