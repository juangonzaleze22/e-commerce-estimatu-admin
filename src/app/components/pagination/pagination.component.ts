import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';


@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnChanges {

  @Input() paginationData;

  @Output() page = new EventEmitter();

  currentPage = 1;

  pagination: any = {};

  constructor(
    
  ) { }

  ngOnChanges() {
    this.initPagination()
  }

  initPagination() {

    let { total, limit } = this.paginationData;

    this.pagination.modelCurretPage = this.currentPage;
    this.pagination.modelTotalPage = Math.ceil(total / limit);

    this.pagination.modelTotalRegistros = parseInt(total);

    this.pagination.modelFinLista = limit * this.currentPage;
    this.pagination.modelInicioLista = (this.pagination.modelFinLista - limit) + 1;

    if (this.pagination.modelFinLista > this.pagination.modelTotalRegistros) {
      this.pagination.modelFinLista = this.pagination.modelTotalRegistros
    }
  }

  paginationChange(tipo: number){
    if(tipo == 0){
      this.currentPage -= 1;
    }
    else if(tipo == 1){
      this.currentPage += 1;
    }else if(tipo == 2){
     this.currentPage = 1
    }else if(tipo == 3) {
      this.currentPage = this.pagination.modelTotalPage
    }
    this.page.emit(this.currentPage);
    this.initPagination();
  }

}
