export interface Partition {
  nombre: string;
  size: number;
  topicName: string;
  lastOffset: number;
  replicaNodes: number;
  leaderNode: string;
  offlineReplicaNodes: number;
  firstOffset: number;
  inSyncReplicaNodes: number;
}

export interface Topic {
  [partitionKey: string]: Partition;
}

export interface KafkaTopics {
  [topicName: string]: Topic;
}
