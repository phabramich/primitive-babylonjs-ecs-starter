import { Quaternion, Scene, TransformNode, Vector3 } from "babylonjs";
import Component from "../core/component";
import Entity from "../core/entity";
import { MessageType } from "../core/message";

export type TransformComponentArgs = {
  initialPosition?: Vector3;
  initialRotation?: Quaternion;
  parent?: TransformNode;
}

export default class Transform extends Component {
  private _transformNode: TransformNode

  public position: Vector3;

  public rotationQuaternion: Quaternion;

  public parent: TransformNode | null;

  private _scene: Scene;

  constructor(args: TransformComponentArgs, scene: Scene) {
    super();
    this.parent = args.parent ?? null;
    this.position = args.initialPosition?.clone() ?? new Vector3();
    this.rotationQuaternion = args.initialRotation?.clone() ?? new Quaternion();
    this._scene = scene;
  }

  public initComponent(): void {
    this._transformNode = new TransformNode(this._parentEntity.name, this._scene);
    this._transformNode.parent = this.parent;
    this._transformNode.position = this.position;
    this._transformNode.rotationQuaternion = this.rotationQuaternion;
  }

  public setParent(newParent: TransformNode | Entity): void {
    if (newParent instanceof TransformNode) {
      this.parent = newParent;
    }
    if (newParent instanceof Entity) {
      const parentTrComp: Transform | null = newParent.getComponent<Transform>("Transform");
      if (!parentTrComp) {
        return;
      }
      this.parent = parentTrComp.getTransformnode();
    }
    this.broadcast({
      type: MessageType.setParentNode,
      payload: newParent
    })
  }

  public addPosition(p: Vector3): void {
    this.position.addInPlace(p);
    this.broadcast({
        type: MessageType.updatePosition,
        payload: this.position,
    });
  }

  public addRotation(r: Quaternion): void {
    // Actually it is guaranteed that the quaternion will be set -- we did it ourselves
    this._transformNode.rotationQuaternion?.multiplyInPlace(r);
    this.broadcast({
        type: MessageType.updateRotation,
        payload: this.rotationQuaternion,
    });
  }

  public setPosition(p: Vector3): void {
    this.position.copyFrom(p);
    this.broadcast({
        type: MessageType.updatePosition,
        payload: this.position,
    });
  }

  public setRotation(r: Quaternion): void {
    // Actually it is guaranteed that the quaternion will be set -- we did it ourselves
    this._transformNode.rotationQuaternion?.copyFrom(r);
    this.broadcast({
        type: MessageType.updateRotation,
        payload: this.rotationQuaternion,
    });
  }

  public getTransformnode(): TransformNode {
    return this._transformNode;
  }

  public clone(): Transform {
    const cloned: Transform = new Transform({initialPosition: this.position, initialRotation: this.rotationQuaternion, parent: this.parent ?? undefined}, this._scene)
    return cloned;
  }

  protected _onDestroy(): void {
    this._transformNode.dispose();
  }
}
