import {AfterViewInit, Component, ElementRef, inject, ViewChild, ViewEncapsulation} from '@angular/core';
import {WvService} from "../s/wv/wv.service";
import {PipeBendCnc} from "../model/pipe-bend-cnc";
import {NgClass} from "@angular/common";
import {CdkCopyToClipboard} from "@angular/cdk/clipboard";
import {MatTooltip} from "@angular/material/tooltip";
import {Analytics} from "@angular/fire/analytics";


@Component({
  selector: 'app-p1',
  standalone: true,
  imports: [
    NgClass,
    CdkCopyToClipboard,
    MatTooltip
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './p1.component.html',
  styleUrl: './p1.component.css'
})
export class P1Component implements AfterViewInit {
  protected readonly Math = Math;
  private analytics: Analytics = inject(Analytics);

  email="sophistry.no@gmail.com";
  wa_loaded = false;
  totlen = 0.0;
  selected_id=0;
  pipe_bend_cncs: Array<PipeBendCnc> = new Array<PipeBendCnc>();
  @ViewChild("fileinput") fileinput!: ElementRef;

  constructor(public wv: WvService) {
    wv.wa_loaded$.subscribe(v => {
      this.wa_loaded = v;
      if (this.wa_loaded) {
        this.wv.run_app();
        this.downloademoFile('5');
      }
    });

    WvService.pipe_bend_cncs$.subscribe(v => {
      this.pipe_bend_cncs = v;
    });

    WvService.tot_len$.subscribe(v => {
      this.totlen = v;
    });

    WvService.selected_id$.subscribe(v => {
      this.selected_id= v;
    });
  }

  ngAfterViewInit(): void {
    this.wv.load_wa();
  }

  LoadStepFile() {
    this.fileinput.nativeElement.click();
  }

  onChangeFileInput() {
    const files: { [key: string]: File } = this.fileinput.nativeElement.files;
    let file: File = files[0];
    file.arrayBuffer().then(buff => {
      let arr = new Uint8Array(buff);
      this.wv.load_stp_file(arr);
    })
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
    if (this.pipe_bend_cncs.length > 0){
      let last = this.pipe_bend_cncs[this.pipe_bend_cncs.length - 1];

      for (var i = 0; i < this.pipe_bend_cncs.length - 1;i++) {
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
    link.download = "demos.zip";
    link.href = "assets/demos/demos.zip";
    link.click();
  }

  downloademoFile(num:string) {
    this.wv.load_demo_file(num);
  }
}
