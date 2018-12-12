import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: "./slider.component.html",
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  @Input() widhtMin: number;
  constructor() { }

  ngOnInit() {
    console.log(this.widhtMin);
  }
  try(value: number): void {
    console.log(value);
  }

}
