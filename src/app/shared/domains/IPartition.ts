export interface Partition {
  size: number;
  lastOffset: number;
  replicaNodes: number[];
  leaderNode: number;
  offlineReplicaNodes: number[];
  firstOffset: number;
  inSyncReplicaNodes: number[];
}

export interface Topic {
  [partitionKey: string]: Partition;
}

export interface KafkaTopics {
  [topicName: string]: Topic;
}
