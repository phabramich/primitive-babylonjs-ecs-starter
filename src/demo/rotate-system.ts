import Entity from "../base-abstract-classes/entity";
import RotateAroundTransformnode from "./rotate-around-component";
import SceneNodeComponent from '../vital-components/scene-node-component';
import System from "../base-abstract-classes/system";

export default class RotateAroundSystem extends System {
  protected _requiredComponentsNames: string[] = ["SceneNodeComponent", "RotateAroundTransformnode"];

  UpdateEntity(e: Entity, animRatio: number): void {
    const speed = e.GetComponent<RotateAroundTransformnode>("RotateAroundTransformnode").speed;
    const nodeComponent = e.GetComponent<SceneNodeComponent>("SceneNodeComponent")
    nodeComponent.SetQuaternion(nodeComponent.rotation.multiplyInPlace(BABYLON.Quaternion.FromEulerAngles(0, 0.01 * animRatio * speed, 0)));
  }
}
