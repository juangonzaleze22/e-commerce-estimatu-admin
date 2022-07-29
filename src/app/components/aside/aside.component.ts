import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent implements OnInit {

  idMenu: number;
  activeMenu: boolean;
  subscription: Subscription
  collapseMenu;
  optionMenu = [
    {
      title: 'Dashboard',
      url: '/dashboard',
      featherIcon: 'home'
    },
    {
      title: 'Products',
      url: 'none',
      featherIcon: 'box',
      collapse: false,
      subMenu: [
        {
          title: 'Category',
          url: 'category'
        },
        {
          title: 'Sub category',
          url: 'sub-category'
        },
        {
          title: 'Product list',
          url: 'list-products'
        },
        {
          title: 'Add product',
          url: 'add-product'
        }
      ]
    },
    {
      title: 'Sales',
      url: 'none',
      featherIcon: 'dollar-sign',
      collapse: false,
      subMenu: [
        {
          title: 'Orders',
          url: 'orders'
        },
        {
          title: 'Transactions',
          url: 'transactions'
        }
      ]
    },
    {
      title: 'Coupons',
      url: 'none',
      featherIcon: 'tag',
      collapse: false,
      subMenu: [
        {
          title: 'List coupons',
          url: 'list-coupons'
        },
        {
          title: 'Create coupons',
          url: 'create-coupons'
        }
      ]
    },
    {
      title: 'Pages',
      url: 'none',
      featherIcon: 'clipboard',
      collapse: false,
      subMenu: [
        {
          title: 'List pages',
          url: 'list-pages'
        },
        {
          title: 'Create pages',
          url: 'create-pages'
        }
      ]
    }, 
    {
      title: 'Media',
      url: 'media',
      featherIcon: 'camera'
    }, 
    {
      title: 'Menu',
      url: 'none',
      featherIcon: 'menu',
      collapse: false,
      subMenu: [
        {
          title: 'Menu List',
          url: 'list-menu'
        },
        {
          title: 'Create Menu',
          url: 'create-menu'
        }
      ]
    }, 
    {
      title: 'Users',
      url: 'none',
      featherIcon: 'user-plus',
      collapse: false,
      subMenu: [
        {
          title: 'User list',
          url: 'list-users'
        },
        {
          title: 'Create user',
          url: 'create-user'
        }
      ]
    }, 
    {
      title: 'Vendors',
      url: 'none',
      featherIcon: 'users',
       collapse: false,
      subMenu: [
        {
          title: 'Vendor List',
          url: 'list-vendor'
        },
        {
          title: 'Crate vendor',
          url: 'create-vendor'
        }
      ]
    }, 
    {
      title: 'Localization',
      url: 'none',
      featherIcon: 'chrome',
       collapse: false,
      subMenu: [
        {
          title: 'Translations',
          url: 'translations'
        },
        {
          title: 'Currency Rates',
          url: 'currency-rates'
        },
        {
          title: 'Taxes',
          url: 'taxes'
        }
      ]
    }, 
    {
      title: 'Reports',
      url: 'reports',
      featherIcon: 'bar-chart'
    }, 
    {
      title: 'Settings',
      url: 'none',
      featherIcon: 'settings',
      collapse: false,
      subMenu: [
        {
          title: 'Profile',
          url: 'profile'
        },
      ]
    }, 
    {
      title: 'Invoice',
      url: 'invoice',
      featherIcon: 'archive'
    }

  ]

  constructor(
    public global: GlobalService
  ) { }

  ngOnInit(): void {
    this.subscription = this.global.observable().subscribe(data => {
      this.collapseMenu = data["aside"]
    });
  }

  openMenu(item) {
    if (item.collapse == undefined) {
      this.activeMenu = true;
      this.closeCollapse()
    }
    this.optionMenu.forEach(option => {
      if (option == item && option.collapse != undefined) {
        item.collapse = !item.collapse;
        item.subMenu?.forEach(submenu => {
          submenu.collapse = false;
        })
      }
    })
    /*   this.closeCollapse() */
  }

  closeCollapse() {
    this.optionMenu.forEach(option => {
      if (option.collapse != undefined) {
        option.collapse = false;
        option.subMenu?.forEach(submenu => {
         /*  submenu.collapse = false; */
        })
      }
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
