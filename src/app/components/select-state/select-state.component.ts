import { Component, OnInit, Input,SimpleChange, Output, EventEmitter } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-select-state',
  templateUrl: './select-state.component.html',
  styleUrls: ['./select-state.component.scss']
})
export class SelectStateComponent implements OnInit {

  @Input() pais;
  @Input() estado;
  @Output() stateValue = new EventEmitter;

  states: Array<any> = [];
  selectState

  constructor(
    private global: GlobalService
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChange) {
    if (changes['pais']) {
      const isFirstChange = changes['pais'].firstChange;
      this.getStates(isFirstChange);
    }
  }

  getStates(checked) { 
      let data ={
        isoCode: this.pais,
      }
      this.global.postService(`getStatesOfCountry`, data).subscribe(resp => {
        if (resp['status'] == 'success'){ 
          this.states = resp['data'];
          if (this.states.length > 0) {
            this.selectState = checked ? this.estado : this.states[0].isoCode;
            this.selectEstado()
          }
        }
      })

  }

  selectEstado() {
    this.stateValue.emit(this.selectState);
  }


}
