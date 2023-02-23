import "babylonjs"
import EntitySystemManager from "./entity-system-manager";
import Entity from "./entity";
import BoxComponent from "./box-component";
import Gravity from "./gravity-component";
import SceneNodeComponent from "./scene-node-component";

export default class DemoApp {
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
    this._scene.createDefaultCameraOrLight(false, true, true);
    this._scene.createDefaultEnvironment();

    this._entityManager = new EntitySystemManager();

    this._loadDemo();

    this.engine.runRenderLoop(() => {
      this._scene.render();
      const animRatio = this._scene.getAnimationRatio()
      this._Step(animRatio);
    });
  }

  _loadDemo() {
    const e = new Entity("box1");
    e.AddComponent(new SceneNodeComponent(new BABYLON.Vector3(), this._scene))
    e.AddComponent(new BoxComponent({ startingPosition: new BABYLON.Vector3() }));
    this._entityManager.Add(e);
    const e2 = new Entity("box2");
    e2.AddComponent(new SceneNodeComponent(new BABYLON.Vector3(2, 2, 2), this._scene))
    e2.AddComponent(new BoxComponent({ startingPosition: new BABYLON.Vector3() }));
    this._entityManager.Add(e2);
  }

  _Step(animRatio) {
    // this._entityManager._entities.forEach(e => {
    //   if (e.GetComponent("Gravity")) {
    //     e.GetComponent("BoxComponent").MoveDown()
    //   }
    // });

    this._entityManager.Update(animRatio);
  }
}
