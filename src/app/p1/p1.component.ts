import {AfterViewInit, Component, ElementRef, inject, Input, ViewChild, ViewEncapsulation} from '@angular/core';
import {WvService} from "../s/wv/wv.service";
import {BendParameters, PipeBendCnc} from "../model/pipe-bend-cnc";
import {NgClass} from "@angular/common";
import {CdkCopyToClipboard} from "@angular/cdk/clipboard";
import {MatTooltip} from "@angular/material/tooltip";
import {Analytics, logEvent} from "@angular/fire/analytics";
import {FormsModule} from "@angular/forms";
import {NgbDropdown, NgbDropdownItem, NgbDropdownMenu, NgbDropdownToggle} from "@ng-bootstrap/ng-bootstrap";


@Component({
  selector: 'app-p1',
  standalone: true,
  imports: [
    NgClass,
    CdkCopyToClipboard,
    MatTooltip,
    FormsModule,
    NgbDropdownItem,
    NgbDropdownMenu,
    NgbDropdown,
    NgbDropdownToggle,

  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './p1.component.html',
  styleUrl: './p1.component.css'
})
export class P1Component implements AfterViewInit {
  dorn_dir_checked: boolean = true;

  protected readonly Math = Math;
  private analytics: Analytics = inject(Analytics);


  //private analytics2 = inject(analyticsInstanceFactory) as AngularFireAnalytics;
  email = "sophistry.no@gmail.com";
  wa_loaded = false;
  totlen = 0.0;
  selected_id = -1;
  selected_op = 0;
  bend_parameters = new BendParameters(0.0, 0.0, 0.0);
  pipe_bend_cncs: Array<PipeBendCnc> = new Array<PipeBendCnc>();
  stp_arr: Uint8Array = new Uint8Array();
  curr_bend_step = -1;
  @ViewChild("fileinput")
  fileinput!: ElementRef;

  constructor(public wv: WvService) {
    wv.stp_file.subscribe(v => {
      this.stp_arr = v;
      this.curr_bend_step = -1;
    });

    wv.wa_loaded$.subscribe(v => {
      this.wa_loaded = v;
      if (this.wa_loaded) {
        this.wv.run_app();
        this.downloademoFile('5');

      }
    });

    WvService.bend_parameters$.subscribe(v => {
      this.bend_parameters = v;
    });

    WvService.pipe_bend_cncs$.subscribe(v => {
      this.pipe_bend_cncs = v;
    });
    WvService.tot_len$.subscribe(v => {
      this.totlen = v;
    });

    WvService.selected_id$.subscribe(v => {
      this.selected_id = v;
      if(this.selected_id %2==0) {
        this.selected_op = 1;
      }else{
        this.selected_op = 3;
      }
    });

    WvService.remote_bend_step$.subscribe(v => {
      this.tableHighliter(v);
    });
  }

  ngAfterViewInit(): void {
    this.wv.load_wa();

    logEvent(this.analytics, 'notification_received');
    //, readonly analytics: AngularFireAnalytics
    //  this.analytics.logEvent('app_open', {"component"
  }

  LoadStepFile() {
    this.fileinput.nativeElement.click();
  }

  onChangeFileInput() {
    this.dorn_dir_checked = true;
    const files: { [key: string]: File } = this.fileinput.nativeElement.files;
    let file: File = files[0];
    file.arrayBuffer().then(buff => {
      let arr = new Uint8Array(buff);
      this.wv.load_stp_file(arr);
    })
  }

  tableHighliter(step: number) {
    if (step == 0) {
      this.selected_id = 0;
      this.selected_op = 0;
    }

    if (step != -1) {
      if (this.selected_op == 1) {
      } else if (this.selected_op == 2) {
        this.selected_id = this.selected_id + 1;
      } else if (this.selected_op == 3) {
        this.selected_id = this.selected_id + 1;
        this.selected_op = 0;
      }
      this.selected_op = this.selected_op + 1;
    }

  }


  getOutD(): number {
    if (this.pipe_bend_cncs.length == 0) {
      return 0.0;
    } else {
      return this.pipe_bend_cncs[0].outd;
    }
  }

  onCncTableRowClick1(cnc: PipeBendCnc) {
    //this.selected_id=cnc.id1;
    this.wv.on_select_by_id(cnc.id1);
    console.log(cnc.id1);
  }

  onCncTableRowClick2(cnc: PipeBendCnc) {
    //this.selected_id=cnc.id2;
    console.log(cnc.id2);
    this.wv.on_select_by_id(cnc.id2);
  }

  saveObjFile() {
    if (WvService.obj_file.length > 0) {
      console.log("Ready to save obj " + WvService.obj_file.length);
      var blob = new Blob([WvService.obj_file], {type: 'text/plain'});
      var link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = "result.obj";
      link.click();
    }
  }

  saveCsvFile() {
    var counter = 1;
    var s = "";
    if (this.pipe_bend_cncs.length > 0) {
      let last = this.pipe_bend_cncs[this.pipe_bend_cncs.length - 1];

      for (var i = 0; i < this.pipe_bend_cncs.length - 1; i++) {
        let v = this.pipe_bend_cncs[i];
        s = s + counter + ";";//0
        s = s + v.l + ";";
        s = s + v.r + ";";
        s = s + v.a + ";";
        s = s + v.clr + ";";
        s = s + "0\r\n";
        counter = counter + 1;
      }
      s = s + counter + ";";//0
      s = s + last.l + ";";
      s = s + "\r\n";
    }
    if (s.length > 0) {
      var blob = new Blob([s], {type: 'text/plain'});
      var link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = "result.csv";
      link.click();
    }
  }

  downloadZipFile() {
    let link = document.createElement("a");
    link.href = "demos/demos.zip";
    link.type = "application/zip";
    link.click();
  }

  simulate() {
    this.wv.on_select_by_table(-1);
    this.wv.send_simulate_cmd();
  }
  downloademoFile(num: string) {
    this.dorn_dir_checked = true;
    this.wv.load_demo_file(num);
  }

  reverse() {
    this.wv.on_reverse();
  }

  on_change_dorn() {
    //let elem: HTMLInputElement =this.dornchangedir.nativeElement as HTMLInputElement;
    this.wv.on_reverse_dorn();
  }

  clrChanged() {
    this.wv.on_upload_lra_commands(this.pipe_bend_cncs);
  }

  on_delete_cnc(cnc: PipeBendCnc) {
    let new_cncs: Array<PipeBendCnc> = new Array<PipeBendCnc>();
    var counter = 0;
    if (this.pipe_bend_cncs.length > 2) {
      this.pipe_bend_cncs.forEach(c => {
        if (c.id1 != cnc.id1) {
          c.id1 = counter;
          counter = counter + 1;
          c.id2 = counter;
          counter = counter + 1;
          new_cncs.push(c);
        }
      });
      this.wv.on_upload_lra_commands(new_cncs);
    }
  }

  on_add_cnc(cnc: PipeBendCnc) {
    let new_cncs: Array<PipeBendCnc> = new Array<PipeBendCnc>();
    let new_cncs2: Array<PipeBendCnc> = new Array<PipeBendCnc>();
    var counter = 0;
    this.pipe_bend_cncs.forEach(c => {
      if (c.id1 == cnc.id1) {
        let c1 = Object.assign({}, c);
        let c2 = Object.assign({}, c);
        new_cncs.push(c1);
        new_cncs.push(c2);
      } else {
        new_cncs.push(c);
      }
    });
    new_cncs.forEach(c => {
      c.id1 = counter;
      counter = counter + 1;
      c.id2 = counter;
      counter = counter + 1;
      new_cncs2.push(c);
    });

    console.log(new_cncs.length + ' ' + this.pipe_bend_cncs.length);
    this.wv.on_upload_lra_commands(new_cncs2);
  }

  new_from_template() {
    let new_cncs: Array<PipeBendCnc> = new Array<PipeBendCnc>();
    let c1 = new PipeBendCnc(
      0,
      1,
      350.0,
      (Math.PI / 2.0) * 20.0,
      0.0,
      90.0,
      90.0,
      20.0);

    let c2 = new PipeBendCnc(
      0,
      1,
      350.0,
      (Math.PI / 2.0) * 20.0,
      0.0,
      90.0,
      90.0,
      20.0);

    let c3 = new PipeBendCnc(
      2,
      3,
      350.0,
      0.0,
      0.0,
      0.0,
      0.0,
      20.0);
    new_cncs.push(c1);
    new_cncs.push(c2);
    new_cncs.push(c3);
    this.wv.on_upload_lra_commands(new_cncs);
  }

  diamChanged($event: any) {
    let v = $event.target.value as number;
    if (v > 1.0) {
      let new_cncs: Array<PipeBendCnc> = new Array<PipeBendCnc>();
      this.pipe_bend_cncs.forEach(c => {
        c.outd = v;
        new_cncs.push(c);
      });
      this.wv.on_upload_lra_commands(new_cncs);
    }

  }

  stright_speedChanged($event: any) {
    let v = $event.target.value as number;
    let params = new BendParameters(v, this.bend_parameters.rotate_speed, this.bend_parameters.angle_speed);
    this.wv.on_change_bend_parameters(params);
  }

  rotate_speedChanged($event: any) {
    let v = $event.target.value as number;
    let params = new BendParameters(this.bend_parameters.stright_speed, v, this.bend_parameters.angle_speed);
    this.wv.on_change_bend_parameters(params);
  }

  angle_speedChanged($event: any) {
    let v = $event.target.value as number;
    let params = new BendParameters(this.bend_parameters.stright_speed, this.bend_parameters.rotate_speed,v);
    this.wv.on_change_bend_parameters(params);
  }

  select_by_table(id: number) {
    this.wv.on_select_by_table(id);
  }
}
