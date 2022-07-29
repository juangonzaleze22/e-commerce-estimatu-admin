import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-details-product',
  templateUrl: './details-product.component.html',
  styleUrls: ['./details-product.component.scss']
})
export class DetailsProductComponent implements OnInit {

  subscription: Subscription
  product: any;
  imgActiveCarousel: '';
  selectedPrice;


  tabs: number = 1;

  customOptions = {
    loop: false,
    dots: true,
    navText: ["", ""],
    responsive: {
      940: {
        items: 4
      },
      767: {
        items: 4
      }
    },
    nav: false,
    mouseDrag : true
  }

  constructor(
    public global: GlobalService,
    private activateRouter: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.subscription = this.activateRouter.params.subscribe(params => {
      const id = params['id'];
      this.getProduct(id);
    })

  }

 

  async getProduct(id: string){
    
    const data = { 
      idProduct: id
    }

   await this.global.postService('products/getProductById', data).subscribe(data => {
      if (data['status'] === 'success') {
        this.product = data['data'];
        this.imgActiveCarousel = this.product.imagenes[0] ? this.product.imagenes[0] : null;
        this.selectedPrice = this.product.sizes[0]
      } 
    })
  }

  selectedImage(src){ 
    console.log('selectedImage', src)
    this.imgActiveCarousel = src;
  }

  onSelectedPrice($event){
    this.selectedPrice = $event
  }

  calcDiscount(price, discount){
    if (discount == ''){
      return false;
    }
    const result = parseInt(price) - (parseInt(price) * (parseInt(discount) / 100));
    return result
  }

  /* destroy subscription */
  
  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
  

}
