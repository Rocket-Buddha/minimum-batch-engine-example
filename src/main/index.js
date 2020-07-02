
const MyBatchJob = require('./MyBatchJob');
const MyStep1 = require("./MyStep1");
const MyStep2 = require("./MyStep2");
const MyStep3 = require("./MyStep3");
const MyStep4 = require("./MyStep4");

/**
 * OKAY! Let's run our batch! 8) 
 * Let's use the batch job builder.
 */

(new MyBatchJob.Builder(MyBatchJob))
  .concurrencyMultiplier(1)
  .name('minimum-batch-engine-example')
  .addStep(new MyStep1("Join 3 numbers using -", 3))
  .addStep(new MyStep2("Join 2 number using **", 2))
  .addStep(new MyStep3("Join 4 numbers using |||", 4))
  .addStep(new MyStep4("Join all of this in an output file", 1))
  .build()
  .run();

  /**
   * What is the concurrencyMultiplier(8)?!
   * 
   *  We are doing a chain of steps, so:
   * 
   *  The first step will accumulate 3 payloads before execute.
   * 
   *  The second step will accumulate 2 payloads before execute
   *  (but it will only receive a payload after 3 incoming messages to step 1).
   * 
   *  The third step will accumulate 4 payloads before execute
   *  (but it will only receive a payload after 2 incoming messages to step 2).
   * 
   *  The fourth step will accumulate 1 payloads before execute
   *  (but it will only receive a payload after 4 incoming messages to step 3).
   * 
   *  So basically we need to execute all the chain in a performing way: 
   *  at least: 3*2*4*1 = 24 messages.
   *  
   *  So basically concurrencyMultiplier defines how many times 
   *  do want have this quantity of messages being processed at the same time.
   * 
   *  So if you set this in 2, you will have 48 messages that are being processed at the same time.
   *
   */