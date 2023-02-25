export type Message = {
  type: string;
  payload: any;
}

export type MessageHandler = (message: Message) => void

export enum MessageType {
  setParentNode = "set.parentnode",
  updatePosition = "update.position",
  updateRotation = "update.rotation"
}
