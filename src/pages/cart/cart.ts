import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

import {FirebaseListObservable} from 'angularfire2/database';
import {CartService} from '../../providers/cart.service';
import {AuthService} from '../../providers/auth.service';

import {BillingPage} from '../billing/billing';

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
  providers: [CartService, AuthService]
})

export class CartPage {

  userId = '';
  finalItemList = '';
  cart: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public cartService: CartService,
              public authService: AuthService) {
    cartService.loadCartList(this.authService.getLoggedUID());
    this.userId = this.authService.getLoggedUID();
    this.cart = this.cartService.cartItems;
  }

  ionViewDidLoad() {
    this.cartService.getCartList(this.userId).then(items => {
      for(let i=0;i<items.length;i++){
        let tmpString = 'name: '+ items[i].name +'\n' +
          'price: '+ items[i].price +'\n' +
          'quantity: '+ items[i].quantity+'\n\n';
        this.finalItemList += tmpString;
      }
    })
    // console.log(await this.cartService.loadOrders(this.userId));
    // this.test = this.cartService.loadCartList(this.userId);
  }


  increment(item: any): void {
    this.cartService.incrementCartItem(this.authService.getLoggedUID(), item);
  }

  decrement(item: any): void {
    this.cartService.decrementCartItem(this.authService.getLoggedUID(), item);
  }

  remove(item: any): void {
    this.cartService.removeCartItem(this.authService.getLoggedUID(), item.$key);
  }

  async checkout() {
    this.navCtrl.push(BillingPage,this.finalItemList);
  }

  goBack() {
    this.navCtrl.pop();
  }

}
