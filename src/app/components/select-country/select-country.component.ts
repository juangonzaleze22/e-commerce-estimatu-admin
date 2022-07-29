import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-select-country',
  templateUrl: './select-country.component.html',
  styleUrls: ['./select-country.component.scss']
})
export class SelectCountryComponent implements OnInit {

  @Input() pais;
  @Output() paisValue = new EventEmitter;

  coutries: Array<string> = [];
  selectedCountry

  constructor(
    private global: GlobalService
  ) { }

  ngOnInit(): void {
    this.selectedCountry = this.pais;
    this.getAllCountry()
  }

  getAllCountry(){

    this.global.getService('getCountries').subscribe( resp => { 
      console.log(resp)
      if (resp['status'] == 'success'){ 
        this.coutries = resp['data'];
      }
    })
    
  }


  selectCountry(event){ 
    console.log('select', event)
    this.paisValue.emit(event)
  }

}
