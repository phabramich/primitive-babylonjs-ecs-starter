import "babylonjs"
import EntitySystemManager from "./base-abstract-classes/entity-system-manager";
import Entity from "./base-abstract-classes/entity";
import BoxComponent from "./demo/box-component";
import RotateAroundTransformnode from "./demo/rotate-around-component";
import SceneNodeComponent from "./vital-components/scene-node-component";
import RotateAroundSystem from "./demo/rotate-system";

export default class App {
  public canvas: HTMLCanvasElement;
  public engine: BABYLON.Engine;
  private _scene: BABYLON.Scene
  private _entityManager: EntitySystemManager;
  constructor() {
    this._Initialize();
  }

  _Initialize() {
    const canvas = document.getElementById('babylon-canvas') as HTMLCanvasElement;
    this.canvas = canvas;
    this.engine = new BABYLON.Engine(this.canvas);
    this._scene = new BABYLON.Scene(this.engine);

    this._CreateEnvironment();

    this._entityManager = new EntitySystemManager();

    this._LoadDemo();

    this.engine.runRenderLoop(() => {
      this._scene.render();
      this._Step(this._scene.getAnimationRatio());
    });
  }

  _CreateEnvironment() {
    this._scene.createDefaultCameraOrLight(false, true, true);
    this._scene.createDefaultEnvironment();
  }

  _LoadDemo() {
    const e = new Entity("box1");
    e.AddComponent(new SceneNodeComponent(new BABYLON.Vector3(0, 1, 2), this._scene))
    e.AddComponent(new BoxComponent({ startingPosition: new BABYLON.Vector3(0, -1, -2) }));
    e.AddComponent(new RotateAroundTransformnode(1));
    this._entityManager.Add(e);

    const e2 = new Entity("box2");
    e2.AddComponent(new SceneNodeComponent(new BABYLON.Vector3(2, 2, 2), this._scene))
    e2.AddComponent(new BoxComponent({ startingPosition: new BABYLON.Vector3() }));
    e2.AddComponent(new RotateAroundTransformnode(10));
    this._entityManager.Add(e2);

    const e3 = new Entity("box3");
    e3.AddComponent(new SceneNodeComponent(new BABYLON.Vector3(0, 1, 0), this._scene))
    e3.AddComponent(new BoxComponent({ startingPosition: new BABYLON.Vector3(2, 2, 2) }));
    e3.AddComponent(new RotateAroundTransformnode(2));
    this._entityManager.Add(e3);

    this._entityManager.AddSystem(new RotateAroundSystem());
  }

  _Step(animRatio: number) {
    this._entityManager.Update(animRatio);
  }
}
