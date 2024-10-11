export interface IMessage {
    timestamp: string;
    partition: number;
    offset: number;
    value: string;
  }