import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {P1Component} from "./p1/p1.component";
//import {error} from "@angular/compiler-cli/src/transformers/util";
//import * as console from "node:console";

@Component({
    selector: 'app-root',
    imports: [ P1Component],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'BEND INFO EXTRACTOR';


  constructor() {

  }

  handleError(error: any): void {
    if (error['message'] && (error.message as string).startsWith("Using exceptions for control flow,")) {
    } else {
      console.log(error);
    }
  }
}
