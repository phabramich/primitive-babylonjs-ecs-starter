import Entity from "./entity";
import { Message, MessageHandler } from "./message";

export default abstract class Component {
  protected _parentEntity: Entity

  public setParentEntity(p: Entity): void {
    this._parentEntity = p;
  }

  public initComponent(): void {};

  public getComponent<T extends Component>(n: string): T | null {
    return this._parentEntity.getComponent(n);
  }

  public findEntity(n: string): Entity | undefined {
    return this._parentEntity.findEntity(n);
  }

  public abstract clone(): Component;

  public broadcast(m: Message): void {
    this._parentEntity.broadcast(m);
  }

  protected _registerHandler(topic: string, h: MessageHandler) {
    this._parentEntity.registerHandler(topic, h);
  }

  protected abstract _onDestroy(): void;

  public destroy(): void {
    this._onDestroy();
  }
};
