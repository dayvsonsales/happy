import Bee from "bee-queue";

import redisConfig from "../config/redis";
import ResetPasswordMail from "../jobs/ResetPasswordMail";
import BeeQueue from "bee-queue";

const jobs = [ResetPasswordMail];

interface QueueBody {
  bee: Bee;
  handle(mailData: any): Promise<void>;
}

type QueueData = {
  [key: string]: QueueBody;
};

class Queue {
  private queues: QueueData;

  constructor() {
    this.queues = {};

    this.init();
  }

  init() {
    jobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        bee: new Bee(key, {
          redis: redisConfig,
        }),
        handle,
      };
    });
  }

  add(key: string, data: any) {
    return this.queues[key].bee.createJob(data).save();
  }

  processQueue() {
    jobs.forEach((job) => {
      const { bee, handle } = this.queues[job.key];

      bee.on("failed", this.handleFailure).process(handle);
    });
  }

  handleFailure(job: BeeQueue.Job<any>, err: Error) {
    console.log(`Queue ${job.queue.name}: FAILED`, err);
  }
}

export default new Queue();
