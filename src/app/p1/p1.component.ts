import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {WvService} from "../s/wv/wv.service";
import {PipeBendCnc} from "../model/pipe-bend-cnc";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-p1',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './p1.component.html',
  styleUrl: './p1.component.css'
})
export class P1Component implements AfterViewInit {
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
      }
    });

    wv.pipe_bend_cncs$.subscribe(v => {
      this.pipe_bend_cncs = v;
    });
    wv.tot_len$.subscribe(v => {
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

  protected readonly Math = Math;

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
}
