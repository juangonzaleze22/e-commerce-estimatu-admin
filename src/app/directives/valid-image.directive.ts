import { Directive, ElementRef, HostListener, Input, OnInit, SimpleChanges } from '@angular/core';
import { GlobalService } from '../services/global.service';

@Directive({
  selector: '[validImage]'
})
export class ValidImageDirective implements OnInit{

  @Input() src;

  constructor(
    private elementRef: ElementRef,
    private global: GlobalService
    ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['src']){
      const firstChange = changes['src'].firstChange
      const element = this.elementRef.nativeElement;
      element.src = firstChange?  this.global.urlImage + this.src : this.global.urlImage + changes['src'].currentValue
    }
  }

  ngOnInit() {
    const element = this.elementRef.nativeElement;
    if (element.src == 'undefined'){ 
      element.src = '../assets/images/pro3/34.jpg';
    }
  }

  @HostListener('error')
  initialImage(){
    const element = this.elementRef.nativeElement;
    element.src = '../assets/images/pro3/34.jpg';
  }


}
