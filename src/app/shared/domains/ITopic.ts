export interface ITopic {
  topicName: string;
  totalPartitions: number;
  totalMessages: number;
  consumers: string[];
}
