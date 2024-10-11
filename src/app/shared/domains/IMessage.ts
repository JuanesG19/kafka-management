export interface IMessage {
    timestamp: string;
    partition: number;
    key?:string;
    offset: number;
    value: string;
  }