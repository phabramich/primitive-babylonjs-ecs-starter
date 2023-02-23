import Component from "./component";

export default class Gravity extends Component {
  speed: number;
  constructor(speed: number) {
    super();
    this.speed = speed;
  }
  InitComponent() {}
}
