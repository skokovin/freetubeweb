export class PipeBendCnc {
  id1: number;
  id2: number;
  l: number;
  lt: number;
  r: number;
  a: number;
  clr: number;
  outd: number;


  constructor(id1: number, id2: number, l: number, lt: number, r: number, a: number, clr: number, outd: number) {
    this.id1 = id1;
    this.id2 = id2;
    this.l = l;
    this.lt = lt;
    this.r = r;
    this.a = a;
    this.clr = clr;
    this.outd = outd;
  }
}


export class BendParameters {
  stright_speed: number;
  rotate_speed: number;
  angle_speed: number;

  constructor(stright_speed: number, rotate_speed: number, angle_speed: number) {
    this.stright_speed = stright_speed;
    this.rotate_speed = rotate_speed;
    this.angle_speed = angle_speed;
  }

  to_array(): Array<number> {
    return [this.stright_speed, this.rotate_speed, this.angle_speed];
  }
}
