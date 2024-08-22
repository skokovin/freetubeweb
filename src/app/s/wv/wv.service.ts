import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import * as WA from 'freetubew';
import {BehaviorSubject} from "rxjs";
import {read_step_file, runrust, select_by_id} from "freetubew";
import {PipeBendCnc} from "../../model/pipe-bend-cnc";

declare global {
  interface Window {
    wvservice: any;
  }
}


@Injectable({
  providedIn: 'root'
})


export class WvService {
  private wasmURL = "assets/freetubew/main_bg.wasm";
  private wa!: WA.InitOutput;
  wa_loaded$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  pipe_bend_cncs$: BehaviorSubject<Array<PipeBendCnc>> = new BehaviorSubject(new Array<PipeBendCnc>());
  tot_len$: BehaviorSubject<number> = new BehaviorSubject(0.0);
  static selected_id$: BehaviorSubject<number> = new BehaviorSubject(0);
  constructor(private http: HttpClient) {
    window.wvservice = this;
  }

  run_app() {
    runrust().then(e => {

    })
  }

  load_wa() {
    this.http.get(this.wasmURL, {responseType: 'blob'}).subscribe(async (response) => {
      response.arrayBuffer().then(buffer => {
        const binary: Uint8Array = new Uint8Array(buffer);
        console.log('loaded ' + binary.length);
        WA.default(binary).then((wa) => {
          this.wa = wa;
          this.wa_loaded$.next(true);
        });
      })
    });
  }

  load_stp_file(arr: Uint8Array) {
    console.log("LOAD_ARR " + arr.length);
    read_step_file(arr);
  }

  on_select_by_id(id:number){
   select_by_id(id);
  }


  private pipe_bend_ops(cmds: Int32Array) {
    let arr = new Array<PipeBendCnc>();
    var counter = 0;
    var totlen = 0;
    if (cmds.length >= 7) {
      for (var i = 0; i <= cmds.length - 8; i += 8) {
        let id1 = cmds[i];
        let id2 = cmds[i + 1];
        let l = cmds[i + 2] / 1000.0;
        let lt = cmds[i + 3] / 1000.0;
        let r = cmds[i + 4] / 1000.0;
        let a = cmds[i + 5] / 1000.0;
        let clr = cmds[i + 6] / 1000.0;
        let outd = cmds[i + 7] / 1000.0;
        let cnc = new PipeBendCnc(id1, id2, l, lt, r, a, clr,outd);
        counter = counter + 1;
        totlen=totlen+l+lt;
        arr.push(cnc);
        //console.log("CMDS " + id + " " + opcode + " " + value     );
      }
    }
    this.pipe_bend_cncs$.next(arr);
    this.tot_len$.next(totlen);
  }

  private pipe_obj_file(in_obj_file: Uint8Array) {
    //console.log("OBJ FILE "+obj_file.length);
    //this.obj_file = in_obj_file;
  }

  private selected_by_id(id: number){
    WvService.selected_id$.next(id);
  }


}
