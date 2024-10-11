export interface ITopic {
  topicName: string;
  totalPartitions: number;
  totalMessages: number;
  consumers: {
    threadCount: number;
    consumerGroup: string;
  }[];
}