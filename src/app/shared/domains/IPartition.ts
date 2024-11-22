export interface IPartition {
  partitionName: number;
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
  [partitionKey: string]: IPartition;
}

export interface KafkaTopics {
  [topicName: string]: Topic;
}
