import Component from "../base-abstract-classes/component";

export default class SceneNodeComponent extends Component {
  transformNode: BABYLON.TransformNode

  position: BABYLON.Vector3;
  rotation: BABYLON.Quaternion;
  parent: BABYLON.TransformNode | null;
  scene: BABYLON.Scene;

  constructor(position: BABYLON.Vector3, scene: BABYLON.Scene, parent: BABYLON.TransformNode | null = null) {
    super()
    this.parent = parent;
    this.position = position;
    this.scene = scene;
  }

  InitComponent() {
    this.transformNode = new BABYLON.TransformNode(this._parentEntity.Name, this.scene);
    this.transformNode.position = this.position;
    this.transformNode.parent = this.parent;
    this.rotation = new BABYLON.Quaternion();
    this.transformNode.rotationQuaternion = this.rotation;
  }

  SetPosition(p: BABYLON.Vector3) {
    this.transformNode.position.copyFrom(p);
    this.Broadcast({
        topic: 'update.position',
        value: this.transformNode.position,
    });
  }

  SetQuaternion(r: BABYLON.Quaternion) {
    if (!this.transformNode.rotationQuaternion) {
      this.transformNode.rotationQuaternion = r;
    }
    this.transformNode.rotationQuaternion.copyFrom(r);
    this.Broadcast({
        topic: 'update.rotation',
        value: this.transformNode.rotationQuaternion,
    });
  }
}
