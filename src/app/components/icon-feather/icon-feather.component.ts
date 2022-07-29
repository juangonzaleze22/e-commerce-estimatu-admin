import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-icon-feather',
  templateUrl: './icon-feather.component.html',
  styleUrls: ['./icon-feather.component.scss']
})
export class IconFeatherComponent implements OnInit {

  @Input() featherIcon: string;

  constructor() { }

  ngOnInit(): void {
  }

}
