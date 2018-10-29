webpackJsonp([10],{

/***/ 119:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BillingPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_cart_service__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_auth_service__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_customer_service__ = __webpack_require__(291);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_shared_service__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_email_composer__ = __webpack_require__(184);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__orders_orders__ = __webpack_require__(62);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var BillingPage = (function () {
    function BillingPage(navCtrl, navParams, alertCtrl, cartService, authService, custService, sharedService, emailComposer) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.cartService = cartService;
        this.authService = authService;
        this.custService = custService;
        this.sharedService = sharedService;
        this.emailComposer = emailComposer;
        this.payment_mode = "cod";
        this.delivery_details = "";
        this.custService.loadDeliveyAddress(this.authService.getLoggedUID());
        this.addresses = this.custService.deliveryAddresses;
        this.CheckoutItemsList = this.navParams.data;
        console.log(this.CheckoutItemsList);
    }
    BillingPage.prototype.pay = function () {
        var _this = this;
        if (this.payment_mode == "cod") {
            if (this.delivery_details == "" || this.delivery_details == undefined || this.delivery_details == null) {
                this.sharedService.showToast("Select/Add Adress!");
            }
            else {
                console.log('Manoj Im inside');
                console.log(this.emailComposer.isAvailable());
                this.cartService.checkout(this.authService.getLoggedUID(), this.delivery_details);
                //Email service code here
                this.emailComposer.addAlias('gmail', 'com.google.android.gm');
                var email_1 = {
                    app: 'gmail',
                    to: 'avijith90naik@gmail.com',
                    cc: '',
                    bcc: [],
                    attachments: [],
                    subject: 'Cordova Icons',
                    body: '<p>How are you? Nice greetings from Leipzig</p><p>' + this.CheckoutItemsList + '</p>',
                    isHtml: false
                };
                this.emailComposer.open(email_1);
                this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_7__orders_orders__["a" /* OrdersPage */]);
                this.emailComposer.isAvailable().then(function (available) {
                    console.log(available);
                    if (available) {
                        console.log('Shivakumar');
                        //Now we know we can send
                        // Send a text message using default options
                        _this.emailComposer.open(email_1);
                        _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_7__orders_orders__["a" /* OrdersPage */]);
                    }
                });
            }
        }
        else if (this.payment_mode == "paypal") {
            //handle this
        }
    };
    BillingPage.prototype.addAddress = function () {
        this.addressManipulation(false, null);
    };
    BillingPage.prototype.editAddress = function (address) {
        this.addressManipulation(true, address);
    };
    BillingPage.prototype.deleteAddress = function (address) {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: 'Delete this Address',
            buttons: [
                {
                    text: 'No',
                },
                {
                    text: 'Yes',
                    handler: function () {
                        _this.custService.removeAddress(_this.authService.getLoggedUID(), address.$key);
                    }
                }
            ]
        });
        confirm.present();
    };
    BillingPage.prototype.addressManipulation = function (edit, address) {
        var _this = this;
        var popup_title = "Edit Address";
        if (edit == false) {
            popup_title = "Add Address";
            address = {
                nickname: '',
                address: '',
                pincode: '',
                phone: ''
            };
        }
        var prompt = this.alertCtrl.create({
            title: popup_title,
            inputs: [
                {
                    name: 'nickname',
                    placeholder: 'Nick Name',
                    value: address.nickname
                },
                {
                    name: 'address',
                    placeholder: 'Address',
                    value: address.address
                },
                {
                    name: 'pincode',
                    placeholder: 'Pincode',
                    type: 'number',
                    value: address.pincode
                },
                {
                    name: 'phone',
                    placeholder: 'Phone',
                    type: 'number',
                    value: address.phone
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                },
                {
                    text: 'Save',
                    handler: function (data) {
                        if (!data.nickname || !data.address || !data.pincode || !data.phone) {
                            _this.sharedService.showToast("Invalid Data!");
                            event.stopPropagation(); //TODO
                        }
                        else {
                            if (edit) {
                                _this.custService.updateAddress(_this.authService.getLoggedUID(), data, address.$key);
                            }
                            else {
                                _this.custService.addAddress(_this.authService.getLoggedUID(), data);
                            }
                        }
                    }
                }
            ]
        });
        prompt.present();
    };
    return BillingPage;
}());
BillingPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-billing',template:/*ion-inline-start:"D:\Avijith\src\pages\billing\billing.html"*/'\n<ion-header>\n\n    <ion-navbar color="dark">\n        <ion-title><ion-icon name="ios-card"></ion-icon> Billing </ion-title>\n\n        <ion-buttons end>\n            <button ion-button icon-left (click)="addAddress()">\n                <ion-icon name="ios-create"></ion-icon>\n            </button>\n        </ion-buttons>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n<ion-content >\n\n    <ion-list radio-group [(ngModel)]="payment_mode">\n        <ion-item-divider color="light">Payment Mode</ion-item-divider>\n        <ion-item>\n            <ion-label>Cash on delivery</ion-label>\n            <ion-radio checked="true" value="cod"></ion-radio>\n        </ion-item>\n\n    </ion-list>\n\n\n    <ion-list radio-group  [(ngModel)]="delivery_details">\n        <ion-item-divider color="light">Delivery Details</ion-item-divider>\n        \n        <ion-item-sliding *ngFor="let address of addresses | async">\n                <ion-item>\n                    <ion-label>  \n                        <h2> <b>{{address.nickname}}</b></h2>\n                        <h3>{{address.address}}</h3>\n                        <p>Pin : {{address.pincode}} </p>\n                        <p>Phone  : {{address.phone}} </p>\n                    </ion-label>\n                    <ion-radio value="{{address.address + \' Pin: \' + address.pincode + \' Phone : \' + address.phone}}"></ion-radio>\n                </ion-item>\n                <ion-item-options side="right">\n                    <button ion-button color="primary" (click)="editAddress(address)" > <ion-icon name="md-create"></ion-icon> Edit </button>\n                    <button ion-button color="danger"  (click)="deleteAddress(address)"> <ion-icon name="ios-trash-outline"></ion-icon> Delete </button>\n                </ion-item-options>\n            </ion-item-sliding>\n\n    </ion-list>\n\n    <button ion-button icon-left block color="secondary" (click)="pay()">\n            <ion-icon name="logo-usd"></ion-icon> Pay\n    </button>\n\n</ion-content>\n'/*ion-inline-end:"D:\Avijith\src\pages\billing\billing.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_2__providers_cart_service__["a" /* CartService */], __WEBPACK_IMPORTED_MODULE_3__providers_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_4__providers_customer_service__["a" /* CustomerService */], __WEBPACK_IMPORTED_MODULE_5__providers_shared_service__["a" /* SharedService */]]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_2__providers_cart_service__["a" /* CartService */],
        __WEBPACK_IMPORTED_MODULE_3__providers_auth_service__["a" /* AuthService */],
        __WEBPACK_IMPORTED_MODULE_4__providers_customer_service__["a" /* CustomerService */],
        __WEBPACK_IMPORTED_MODULE_5__providers_shared_service__["a" /* SharedService */],
        __WEBPACK_IMPORTED_MODULE_6__ionic_native_email_composer__["a" /* EmailComposer */]])
], BillingPage);

//# sourceMappingURL=billing.js.map

/***/ }),

/***/ 120:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ForgotPassPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_auth_service__ = __webpack_require__(22);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ForgotPassPage = (function () {
    function ForgotPassPage(navCtrl, navParams, authService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.authService = authService;
    }
    ForgotPassPage.prototype.recover = function () {
        this.authService.recover(this.email);
    };
    return ForgotPassPage;
}());
ForgotPassPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-forgot-pass',template:/*ion-inline-start:"D:\Avijith\src\pages\forgot-pass\forgot-pass.html"*/'<ion-header>\n\n  <ion-navbar color="dark">\n    <ion-title>Forgot Password</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n  <ion-list>\n    \n    <ion-item>\n        <ion-input  [(ngModel)]="email" type="text" placeholder="Email" name="email"required></ion-input>\n    </ion-item>\n\n  </ion-list>\n\n  <div padding>\n    <button ion-button color="dark"  (click)="recover()"  block>Recover</button>\n  </div>\n\n</ion-content>\n'/*ion-inline-end:"D:\Avijith\src\pages\forgot-pass\forgot-pass.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_2__providers_auth_service__["a" /* AuthService */]]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_auth_service__["a" /* AuthService */]])
], ForgotPassPage);

//# sourceMappingURL=forgot-pass.js.map

/***/ }),

/***/ 121:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CartPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_cart_service__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_auth_service__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__billing_billing__ = __webpack_require__(119);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};





var CartPage = (function () {
    function CartPage(navCtrl, navParams, cartService, authService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.cartService = cartService;
        this.authService = authService;
        this.userId = '';
        this.finalItemList = '';
        cartService.loadCartList(this.authService.getLoggedUID());
        this.userId = this.authService.getLoggedUID();
        this.cart = this.cartService.cartItems;
    }
    CartPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.cartService.getCartList(this.userId).then(function (items) {
            for (var i = 0; i < items.length; i++) {
                var tmpString = 'name: "' + items[i].name + '"\n' +
                    'price: ' + items[i].price + '\n' +
                    'quantity: ' + items[i].quantity + '\n\n';
                _this.finalItemList += tmpString;
            }
        });
        // console.log(await this.cartService.loadOrders(this.userId));
        // this.test = this.cartService.loadCartList(this.userId);
    };
    CartPage.prototype.increment = function (item) {
        this.cartService.incrementCartItem(this.authService.getLoggedUID(), item);
    };
    CartPage.prototype.decrement = function (item) {
        this.cartService.decrementCartItem(this.authService.getLoggedUID(), item);
    };
    CartPage.prototype.remove = function (item) {
        this.cartService.removeCartItem(this.authService.getLoggedUID(), item.$key);
    };
    CartPage.prototype.checkout = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__billing_billing__["a" /* BillingPage */], this.finalItemList);
                return [2 /*return*/];
            });
        });
    };
    CartPage.prototype.goBack = function () {
        this.navCtrl.pop();
    };
    return CartPage;
}());
CartPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-cart',template:/*ion-inline-start:"D:\Avijith\src\pages\cart\cart.html"*/'<ion-header >\n\n  <ion-navbar color="dark">\n    <ion-title>\n        <ion-icon name="basket"></ion-icon> Cart</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content class="bg-style">\n\n        <ion-list>\n\n        <ion-item  *ngFor="let item of cart | async">\n            <ion-thumbnail item-left>\n            <img src="{{item.image}}">\n            </ion-thumbnail>\n            <h2>{{item.name}}</h2>\n            <p>${{item.price}} x {{item.quantity}} = ${{item.price * item.quantity}}</p>\n\n            <button ion-button clear item-right (click)="increment(item)" >\n              <ion-icon color="danger" style=" font-size: 25px;" name="ios-arrow-dropup-circle"></ion-icon>\n            </button>\n\n            <button ion-button clear item-right (click)="decrement(item)" >\n              <ion-icon color="danger" style=" font-size: 25px;" name="ios-arrow-dropdown-circle"></ion-icon>\n            </button>\n\n            <button style=" font-size: 20px;" ion-button clear item-right (click)="remove(item)" >\n              <ion-icon color="danger" name="ios-remove-circle"></ion-icon>\n            </button>\n        </ion-item>\n\n        <ion-item *ngIf="(cart | async)?.length" >\n            <h2>Grand Total</h2>\n            <h2 item-right >${{cartService.cartAmount}}</h2>\n        </ion-item>\n\n        <ion-item *ngIf="!(cart | async)?.length" >\n          <h2 class="center">Cart is empty</h2>\n        </ion-item>\n\n        <button fixed ion-button icon-start block color="light" *ngIf="(cart | async)?.length" (click)="checkout(cart)">\n            <ion-icon name="ios-cart"></ion-icon>\n            Checkout\n        </button>\n\n        </ion-list>\n\n\n    </ion-content>\n'/*ion-inline-end:"D:\Avijith\src\pages\cart\cart.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_2__providers_cart_service__["a" /* CartService */], __WEBPACK_IMPORTED_MODULE_3__providers_auth_service__["a" /* AuthService */]]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__providers_cart_service__["a" /* CartService */],
        __WEBPACK_IMPORTED_MODULE_3__providers_auth_service__["a" /* AuthService */]])
], CartPage);

//# sourceMappingURL=cart.js.map

/***/ }),

/***/ 122:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProductDetailsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_cart_service__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_auth_service__ = __webpack_require__(22);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ProductDetailsPage = (function () {
    function ProductDetailsPage(navCtrl, navParams, cartService, authService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.cartService = cartService;
        this.authService = authService;
    }
    ProductDetailsPage.prototype.ionViewDidLoad = function () {
        this.product = this.navParams.data;
    };
    ProductDetailsPage.prototype.goBack = function () {
        this.navCtrl.pop();
    };
    ProductDetailsPage.prototype.addToCart = function (product) {
        this.cartService.addCartItem(this.authService.getLoggedUID(), this.product);
    };
    return ProductDetailsPage;
}());
ProductDetailsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-product-details',template:/*ion-inline-start:"D:\Avijith\src\pages\product-details\product-details.html"*/'\n<ion-header>\n\n  <ion-navbar color="dark">\n    <ion-title>\n      <ion-icon name="md-checkbox-outline"></ion-icon> Product\n    </ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content class="bg-style"  >\n\n    <ion-card *ngIf=\'product\'>\n      <ion-card-header>  \n        <img src={{product.image}}/>\n      </ion-card-header>\n\n\n      <ion-card-content>\n        <h2> <b>{{product.name}} </b> </h2>\n        <p> {{product.description}} </p>\n      </ion-card-content>\n    </ion-card>\n\n    <ion-fab right bottom (click)="addToCart()">\n      <button ion-fab color="danger"><ion-icon name="ios-cart" ></ion-icon></button>\n    </ion-fab>\n\n</ion-content>\n'/*ion-inline-end:"D:\Avijith\src\pages\product-details\product-details.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_2__providers_cart_service__["a" /* CartService */], __WEBPACK_IMPORTED_MODULE_3__providers_auth_service__["a" /* AuthService */]]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__providers_cart_service__["a" /* CartService */],
        __WEBPACK_IMPORTED_MODULE_3__providers_auth_service__["a" /* AuthService */]])
], ProductDetailsPage);

//# sourceMappingURL=product-details.js.map

/***/ }),

/***/ 123:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__products_products__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_auth_service__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_shared_service__ = __webpack_require__(48);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var RegisterPage = (function () {
    function RegisterPage(navCtrl, navParams, authService, sharedService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.authService = authService;
        this.sharedService = sharedService;
        // this.authService.logout();
    }
    RegisterPage.prototype.ionViewDidLoad = function () {
        if (this.authService.isLoggedIn()) {
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__products_products__["a" /* ProductsPage */]);
        }
    };
    RegisterPage.prototype.register = function () {
        var _this = this;
        this.sharedService.showLoading();
        this.authService.signup(this.email, this.password).then(function (value) {
            _this.sharedService.hideLoading();
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__products_products__["a" /* ProductsPage */]);
        })
            .catch(function (err) {
            _this.sharedService.hideLoading();
            _this.sharedService.showToast("Something went wrong!");
        });
    };
    return RegisterPage;
}());
RegisterPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-register',template:/*ion-inline-start:"D:\Avijith\src\pages\register\register.html"*/'<ion-header>\n  <ion-navbar color="dark">\n    <ion-title>Register</ion-title>\n  </ion-navbar>\n</ion-header>\n \n<ion-content  padding>\n  <div class="login-box">\n  <ion-row>\n      <ion-col></ion-col>\n      <ion-col width-67>\n        <img src="../assets/icon/icon.png"/>\n      </ion-col>\n      <ion-col></ion-col>\n    </ion-row>\n    <form (ngSubmit)="register()" #registerForm="ngForm">\n      <ion-row>\n        <ion-col>\n          <ion-list inset>\n            \n            <ion-item>\n              <ion-input [(ngModel)]="email" type="text" placeholder="Email" name="email"required></ion-input>\n            </ion-item>\n            \n            <ion-item>\n              <ion-input [(ngModel)]="password" type="password" placeholder="Password" name="password"  required></ion-input>\n            </ion-item>\n            \n          </ion-list>\n        </ion-col>\n      </ion-row>\n      \n      <ion-row>\n        <ion-col class="signup-col">\n          <button color="dark" ion-button class="submit-btn" full type="submit" >Register</button>\n        </ion-col>\n      </ion-row>\n      \n    </form>\n  </div>\n</ion-content>'/*ion-inline-end:"D:\Avijith\src\pages\register\register.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_3__providers_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_4__providers_shared_service__["a" /* SharedService */]]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_3__providers_auth_service__["a" /* AuthService */],
        __WEBPACK_IMPORTED_MODULE_4__providers_shared_service__["a" /* SharedService */]])
], RegisterPage);

//# sourceMappingURL=register.js.map

/***/ }),

/***/ 124:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LogoutPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login_login__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_auth_service__ = __webpack_require__(22);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var LogoutPage = (function () {
    function LogoutPage(navCtrl, navParams, authService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.authService = authService;
    }
    LogoutPage.prototype.ionViewDidLoad = function () {
        this.authService.logout();
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__login_login__["a" /* LoginPage */]);
    };
    return LogoutPage;
}());
LogoutPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-logout',template:/*ion-inline-start:"D:\Avijith\src\pages\logout\logout.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title>logout</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <p> Logging Out !!</p>\n</ion-content>\n'/*ion-inline-end:"D:\Avijith\src\pages\logout\logout.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_3__providers_auth_service__["a" /* AuthService */]]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__providers_auth_service__["a" /* AuthService */]])
], LogoutPage);

//# sourceMappingURL=logout.js.map

/***/ }),

/***/ 131:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 131;

/***/ }),

/***/ 172:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/billing/billing.module": [
		319,
		9
	],
	"../pages/cart/cart.module": [
		321,
		8
	],
	"../pages/forgot-pass/forgot-pass.module": [
		320,
		7
	],
	"../pages/intro-slides/intro-slides.module": [
		322,
		6
	],
	"../pages/login/login.module": [
		323,
		5
	],
	"../pages/logout/logout.module": [
		324,
		4
	],
	"../pages/orders/orders.module": [
		325,
		3
	],
	"../pages/product-details/product-details.module": [
		326,
		2
	],
	"../pages/products/products.module": [
		327,
		1
	],
	"../pages/register/register.module": [
		328,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 172;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 22:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_auth__ = __webpack_require__(95);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AuthService = (function () {
    function AuthService(firebaseAuth) {
        this.firebaseAuth = firebaseAuth;
    }
    AuthService.prototype.signup = function (email, password) {
        return this.firebaseAuth.auth.createUserWithEmailAndPassword(email, password);
    };
    AuthService.prototype.login = function (email, password) {
        return this.firebaseAuth.auth.signInWithEmailAndPassword(email, password);
    };
    AuthService.prototype.logout = function () {
        this.firebaseAuth.auth.signOut();
    };
    AuthService.prototype.isLoggedIn = function () {
        if (this.firebaseAuth.auth.currentUser != null) {
            return true;
        }
        else {
            return false;
        }
    };
    AuthService.prototype.getLoggedUID = function () {
        return this.firebaseAuth.auth.currentUser.uid;
    };
    AuthService.prototype.recover = function (email) {
        this.firebaseAuth.auth.sendPasswordResetEmail(email);
    };
    return AuthService;
}());
AuthService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_angularfire2_auth__["a" /* AngularFireAuth */]])
], AuthService);

//# sourceMappingURL=auth.service.js.map

/***/ }),

/***/ 227:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IntroSlidesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the IntroSlidesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var IntroSlidesPage = (function () {
    function IntroSlidesPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    IntroSlidesPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad IntroSlidesPage');
    };
    return IntroSlidesPage;
}());
IntroSlidesPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-intro-slides',template:/*ion-inline-start:"D:\Avijith\src\pages\intro-slides\intro-slides.html"*/'<!--\n  Generated template for the IntroSlidesPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Introduction</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n</ion-content>\n'/*ion-inline-end:"D:\Avijith\src\pages\intro-slides\intro-slides.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]])
], IntroSlidesPage);

//# sourceMappingURL=intro-slides.js.map

/***/ }),

/***/ 228:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(229);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(245);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 245:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(317);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_intro_slides_intro_slides__ = __webpack_require__(227);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_login_login__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_logout_logout__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_register_register__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_forgot_pass_forgot_pass__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_products_products__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_product_details_product_details__ = __webpack_require__(122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_cart_cart__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_orders_orders__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_status_bar__ = __webpack_require__(225);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_splash_screen__ = __webpack_require__(226);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_billing_billing__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_angularfire2__ = __webpack_require__(318);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_angularfire2_database__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_angularfire2_auth__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__ionic_native_email_composer__ = __webpack_require__(184);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
















// Import the AF2 Module

// for AngularFireDatabase

// import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
// for AngularFireAuth

// import { AngularFireAuth } from 'angularfire2/auth';

var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_4__pages_intro_slides_intro_slides__["a" /* IntroSlidesPage */],
            __WEBPACK_IMPORTED_MODULE_5__pages_login_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_7__pages_register_register__["a" /* RegisterPage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_forgot_pass_forgot_pass__["a" /* ForgotPassPage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_products_products__["a" /* ProductsPage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_product_details_product_details__["a" /* ProductDetailsPage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_cart_cart__["a" /* CartPage */],
            __WEBPACK_IMPORTED_MODULE_12__pages_orders_orders__["a" /* OrdersPage */],
            __WEBPACK_IMPORTED_MODULE_15__pages_billing_billing__["a" /* BillingPage */],
            __WEBPACK_IMPORTED_MODULE_6__pages_logout_logout__["a" /* LogoutPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {}, {
                links: [
                    { loadChildren: '../pages/billing/billing.module#BillingPageModule', name: 'BillingPage', segment: 'billing', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/forgot-pass/forgot-pass.module#ForgotPassPageModule', name: 'ForgotPassPage', segment: 'forgot-pass', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/cart/cart.module#CartPageModule', name: 'CartPage', segment: 'cart', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/intro-slides/intro-slides.module#IntroSlidesPageModule', name: 'IntroSlidesPage', segment: 'intro-slides', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/logout/logout.module#LogoutPageModule', name: 'LogoutPage', segment: 'logout', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/orders/orders.module#OrdersPageModule', name: 'OrdersPage', segment: 'orders', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/product-details/product-details.module#ProductDetailsPageModule', name: 'ProductDetailsPage', segment: 'product-details', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/products/products.module#ProductsPageModule', name: 'ProductsPage', segment: 'products', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/register/register.module#RegisterPageModule', name: 'RegisterPage', segment: 'register', priority: 'low', defaultHistory: [] }
                ]
            }),
            __WEBPACK_IMPORTED_MODULE_16_angularfire2__["a" /* AngularFireModule */].initializeApp({
                apiKey: "AIzaSyAVbxMRWXkZS-h1FVihVryYSvu3L7N4AlY",
                authDomain: "nabardionic2.firebaseapp.com",
                databaseURL: "https://nabardionic2.firebaseio.com",
                projectId: "nabardionic2",
                storageBucket: "nabardionic2.appspot.com",
                messagingSenderId: "1004981619929"
            }),
            __WEBPACK_IMPORTED_MODULE_17_angularfire2_database__["b" /* AngularFireDatabaseModule */],
            __WEBPACK_IMPORTED_MODULE_18_angularfire2_auth__["b" /* AngularFireAuthModule */],
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_4__pages_intro_slides_intro_slides__["a" /* IntroSlidesPage */],
            __WEBPACK_IMPORTED_MODULE_5__pages_login_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_7__pages_register_register__["a" /* RegisterPage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_forgot_pass_forgot_pass__["a" /* ForgotPassPage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_products_products__["a" /* ProductsPage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_product_details_product_details__["a" /* ProductDetailsPage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_cart_cart__["a" /* CartPage */],
            __WEBPACK_IMPORTED_MODULE_12__pages_orders_orders__["a" /* OrdersPage */],
            __WEBPACK_IMPORTED_MODULE_15__pages_billing_billing__["a" /* BillingPage */],
            __WEBPACK_IMPORTED_MODULE_6__pages_logout_logout__["a" /* LogoutPage */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_13__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_14__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_19__ionic_native_email_composer__["a" /* EmailComposer */],
            { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] }
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 291:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CustomerService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_database__ = __webpack_require__(56);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var CustomerService = (function () {
    function CustomerService(db) {
        this.db = db;
    }
    CustomerService.prototype.loadDeliveyAddress = function (userid) {
        this.deliveryAddresses = this.db.list("customer/" + userid + "/address");
    };
    ;
    CustomerService.prototype.addAddress = function (userid, address) {
        this.loadDeliveyAddress(userid);
        this.deliveryAddresses.push(address);
    };
    ;
    CustomerService.prototype.removeAddress = function (userid, addressId) {
        this.loadDeliveyAddress(userid);
        this.deliveryAddresses.remove(addressId).then(function (_) { return console.log('item removed!'); });
    };
    ;
    CustomerService.prototype.updateAddress = function (userid, address, addressKey) {
        var _this = this;
        this.db.object("customer/" + userid + "/address/" + addressKey, { preserveSnapshot: true }).first().subscribe(function (data) {
            if (data.val() !== null) {
                _this.deliveryAddresses.update(addressKey, address);
            }
            else {
                console.log('No such element');
            }
        });
    };
    ;
    return CustomerService;
}());
CustomerService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_angularfire2_database__["a" /* AngularFireDatabase */]])
], CustomerService);

//# sourceMappingURL=customer.service.js.map

/***/ }),

/***/ 317:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_login_login__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_logout_logout__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_products_products__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_orders_orders__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_status_bar__ = __webpack_require__(225);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_splash_screen__ = __webpack_require__(226);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_shared_service__ = __webpack_require__(48);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var MyApp = (function () {
    function MyApp(platform, menu, statusBar, splashScreen) {
        this.platform = platform;
        this.menu = menu;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        // make HelloIonicPage the root (or first) page
        this.rootPage = __WEBPACK_IMPORTED_MODULE_2__pages_login_login__["a" /* LoginPage */];
        this.initializeApp();
        // set our app's pages
        this.pages = [
            { title: 'Products', component: __WEBPACK_IMPORTED_MODULE_4__pages_products_products__["a" /* ProductsPage */] },
            { title: 'Orders', component: __WEBPACK_IMPORTED_MODULE_5__pages_orders_orders__["a" /* OrdersPage */] },
            { title: 'Logout', component: __WEBPACK_IMPORTED_MODULE_3__pages_logout_logout__["a" /* LogoutPage */] }
        ];
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
    };
    MyApp.prototype.openPage = function (page) {
        // close the menu when clicking a link from the menu
        this.menu.close();
        // navigate to the new page if it is not the current page
        this.nav.setRoot(page.component);
    };
    return MyApp;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Nav */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Nav */])
], MyApp.prototype, "nav", void 0);
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"D:\Avijith\src\app\app.html"*/'<ion-menu [content]="content">\n\n  <ion-header>\n    <ion-toolbar color="dark" >\n      <ion-title>\n          <ion-icon name="basket"></ion-icon> NABARD\n      </ion-title>\n    </ion-toolbar>\n  </ion-header>\n\n  <ion-content>\n    <ion-list>\n      <button ion-item *ngFor="let p of pages" (click)="openPage(p)">\n        {{p.title}}\n      </button>\n    </ion-list>\n  </ion-content>\n\n</ion-menu>\n\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>\n'/*ion-inline-end:"D:\Avijith\src\app\app.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_8__providers_shared_service__["a" /* SharedService */]]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* MenuController */],
        __WEBPACK_IMPORTED_MODULE_6__ionic_native_status_bar__["a" /* StatusBar */],
        __WEBPACK_IMPORTED_MODULE_7__ionic_native_splash_screen__["a" /* SplashScreen */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 47:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CartService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_database__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_first__ = __webpack_require__(284);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_first___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_first__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_take__ = __webpack_require__(287);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_take___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_take__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_service__ = __webpack_require__(48);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};





var CartService = (function () {
    function CartService(db, sharedService) {
        this.db = db;
        this.sharedService = sharedService;
        this.cartlist = [];
        this.cartAmount = 0;
    }
    CartService.prototype.getCartList = function (userid) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var listItems;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // console.log(userid);
                        this.cartlist = [];
                        return [4 /*yield*/, this.db.list('cart/' + userid)];
                    case 1:
                        listItems = _a.sent();
                        return [4 /*yield*/, listItems.subscribe(function (rows) {
                                rows.forEach(function (row) {
                                    // console.log(row);
                                    _this.cartlist.push(row);
                                });
                                // console.log(this.cartlist);
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, this.cartlist];
                }
            });
        });
    };
    CartService.prototype.loadCartList = function (userid) {
        var _this = this;
        this.cartItems = this.db.list('cart/' + userid);
        this.cartItems.subscribe(function (rows) {
            _this.cartAmount = 0;
            rows.forEach(function (row) {
                _this.cartAmount = _this.cartAmount + (row.quantity * row.price);
            });
        }, function (err) {
            console.log('not authenticated');
        }, function () {
            console.log('done.');
        });
    };
    ;
    CartService.prototype.addCartItem = function (userid, product) {
        var _this = this;
        this.loadCartList(userid);
        this.db.object("cart/" + userid + "/" + product.$key, { preserveSnapshot: true }).first().subscribe(function (data) {
            if (data.val() !== null) {
                _this.incrementCartItem(userid, product);
            }
            else {
                _this.db.object('products/' + product.$key, { preserveSnapshot: true }).first().subscribe(function (productData) {
                    //%%%%%%%%%%%%%%%%
                    if (productData.val().stock != 0 && productData.val().available == true) {
                        var cartItem = {
                            image: product.image,
                            name: product.name,
                            price: product.price,
                            quantity: 1
                        };
                        _this.cartItems.update(product.$key, cartItem);
                        _this.sharedService.showToast("Item Added!");
                    }
                    else {
                        _this.sharedService.showToast("Item not Available");
                    }
                    //%%%%%%%%%%%%%%%%
                });
            }
        });
    };
    ;
    CartService.prototype.removeCartItem = function (userid, productId) {
        var _this = this;
        this.loadCartList(userid);
        this.cartItems.remove(productId).then(function (_) { return _this.sharedService.showToast("Item removed!"); });
    };
    ;
    CartService.prototype.decrementCartItem = function (userid, product) {
        var _this = this;
        this.loadCartList(userid);
        this.db.object("cart/" + userid + "/" + product.$key, { preserveSnapshot: true }).first().subscribe(function (data) {
            if (data.val() !== null) {
                if (data.val().quantity - 1 > 0) {
                    _this.cartItems.update(product.$key, { quantity: data.val().quantity - 1 });
                }
                else {
                    _this.removeCartItem(userid, product.$key);
                }
            }
            else {
                _this.sharedService.showToast("No such element!");
            }
        });
    };
    ;
    CartService.prototype.incrementCartItem = function (userid, product) {
        var _this = this;
        this.loadCartList(userid);
        this.db.object("cart/" + userid + "/" + product.$key, { preserveSnapshot: true }).first().subscribe(function (cartItem) {
            if (cartItem.val() !== null) {
                _this.db.object('products/' + product.$key, { preserveSnapshot: true }).first().subscribe(function (productData) {
                    //%%%%%%%%%%%%%%%%
                    if (cartItem.val().quantity + 1 <= productData.val().stock && productData.val().available == true) {
                        console.log('Incremented Quantity Successfully');
                        _this.cartItems.update(product.$key, { quantity: cartItem.val().quantity + 1 });
                    }
                    else {
                        _this.sharedService.showToast('Quality exceeds the Stock!');
                    }
                    //%%%%%%%%%%%%%%%%
                });
            }
            else {
                _this.sharedService.showToast('No such element to increment quantity!');
            }
        });
    };
    ;
    // Order services
    CartService.prototype.checkout = function (userid, deliveryDetails) {
        var _this = this;
        // Loads the subscribed cart list
        this.loadCartList(userid);
        // loads the unsubscribed cart list
        var cartItemUnsubscribed = this.db.list('cart/' + userid).take(1);
        // Add items to orders
        var orderItem = this.db.list('orders/' + userid);
        // Because subscribed cart list would prevent adding items to cart after an order is created.
        cartItemUnsubscribed.forEach(function (rows) {
            rows.forEach(function (cartItem) {
                cartItem.status = 1;
                cartItem.delivery = deliveryDetails;
                // check if product is available
                _this.db.object('products/' + cartItem.$key, { preserveSnapshot: true }).first().subscribe(function (productData) {
                    //%%%%%%%%%%%%%%%%
                    if (cartItem.quantity <= productData.val().stock && productData.val().available == true) {
                        orderItem.push(cartItem); // add the item to orders
                        _this.cartItems.remove(cartItem.$key); // remove the item from the cart
                        // decrement the item qty
                        _this.db.object('products/' + cartItem.$key + '/stock').set(productData.val().stock - cartItem.quantity);
                    }
                    //%%%%%%%%%%%%%%%%
                });
            });
        });
    };
    CartService.prototype.loadOrders = function (userid) {
        this.orderItems = this.db.list('orders/' + userid);
    };
    return CartService;
}());
CartService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_angularfire2_database__["a" /* AngularFireDatabase */],
        __WEBPACK_IMPORTED_MODULE_4__shared_service__["a" /* SharedService */]])
], CartService);

//# sourceMappingURL=cart.service.js.map

/***/ }),

/***/ 48:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SharedService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SharedService = (function () {
    function SharedService(loadingCtrl, toastCtrl) {
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.loader = this.loadingCtrl.create({
            content: "Please wait...",
            duration: 3000
        });
    }
    SharedService.prototype.showLoading = function () {
        this.loader.present();
    };
    SharedService.prototype.hideLoading = function () {
        this.loader.dismiss();
    };
    SharedService.prototype.showToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 3000
        });
        toast.present();
    };
    return SharedService;
}());
SharedService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */]])
], SharedService);

//# sourceMappingURL=shared.service.js.map

/***/ }),

/***/ 49:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProductsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__product_details_product_details__ = __webpack_require__(122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__cart_cart__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angularfire2_auth__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_cart_service__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_auth_service__ = __webpack_require__(22);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var ProductsPage = (function () {
    function ProductsPage(navCtrl, navParams, db, viewCtrl, afAuth, cartService, authService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.db = db;
        this.viewCtrl = viewCtrl;
        this.cartService = cartService;
        this.authService = authService;
        this.products = db.list('products');
        cartService.loadCartList(this.authService.getLoggedUID());
    }
    ProductsPage.prototype.ionViewDidLoad = function () {
    };
    ProductsPage.prototype.showDetails = function (product) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__product_details_product_details__["a" /* ProductDetailsPage */], product);
    };
    ProductsPage.prototype.addToCart = function (product) {
        this.cartService.addCartItem(this.authService.getLoggedUID(), product);
    };
    ProductsPage.prototype.openCart = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__cart_cart__["a" /* CartPage */]);
    };
    ProductsPage.prototype.getItems = function (event) {
        // TODO : search
    };
    ProductsPage.prototype.applyCategoryFilter = function (event) {
        // TODO : filter
    };
    return ProductsPage;
}());
ProductsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-products',template:/*ion-inline-start:"D:\Avijith\src\pages\products\products.html"*/'<ion-header>\n  <ion-navbar color="dark">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>\n      <ion-icon name="basket"></ion-icon> \n      Dekene\n    </ion-title>\n    <ion-buttons end>\n      <button ion-button icon-left (click)="openCart()">\n        <ion-icon name="cart"></ion-icon>\n        {{ (cartService.cartItems | async)?.length }} \n\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content  class="bg-style" >\n  \n  <ion-searchbar (ionInput)="getItems($event)" placeholder="Search in Dekene"></ion-searchbar>\n\n\n  <ion-item>\n    <ion-label>Category</ion-label>\n    <ion-select [(ngModel)]="category"  (ionChange)="applyCategoryFilter()" >\n      <ion-option value="all">All</ion-option>\n      <ion-option value="grocery">Grocery</ion-option>\n      <ion-option value="detergents">Detergents</ion-option>\n    </ion-select>\n  </ion-item>\n\n  <ion-list>\n\n    <ion-item *ngFor="let product of products | async">\n\n        <ion-thumbnail item-start (click)="showDetails(product)" >\n          <img src={{product.image}}>\n        </ion-thumbnail>\n\n\n        <ion-row>\n          <h2 (click)="showDetails(product)" >{{product.name}}</h2>\n        </ion-row>\n        <ion-row>\n            <p (click)="showDetails(product)"> <ion-badge color="light"> Rs {{product.price}} </ion-badge></p>\n        </ion-row>\n\n      \n        \n        <button ion-button clear item-end (click)="addToCart(product)">\n            <ion-icon style=" font-size: 25px;" name="cart" color="danger"></ion-icon>\n        </button>\n      </ion-item>\n  </ion-list>\n\n\n\n  \n</ion-content>\n'/*ion-inline-end:"D:\Avijith\src\pages\products\products.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_6__providers_cart_service__["a" /* CartService */], __WEBPACK_IMPORTED_MODULE_7__providers_auth_service__["a" /* AuthService */]]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__["a" /* AngularFireDatabase */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_5_angularfire2_auth__["a" /* AngularFireAuth */],
        __WEBPACK_IMPORTED_MODULE_6__providers_cart_service__["a" /* CartService */],
        __WEBPACK_IMPORTED_MODULE_7__providers_auth_service__["a" /* AuthService */]])
], ProductsPage);

//# sourceMappingURL=products.js.map

/***/ }),

/***/ 62:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrdersPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_cart_service__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_auth_service__ = __webpack_require__(22);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var OrdersPage = (function () {
    function OrdersPage(navCtrl, navParams, cartService, authService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.cartService = cartService;
        this.authService = authService;
        cartService.loadOrders(this.authService.getLoggedUID());
        this.orders = this.cartService.orderItems;
    }
    return OrdersPage;
}());
OrdersPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-orders',template:/*ion-inline-start:"D:\Avijith\src\pages\orders\orders.html"*/'<ion-header>\n\n  <ion-navbar  color="dark">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title><ion-icon name="ios-flash"></ion-icon>Orders</ion-title>\n    \n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content   class="bg-style" >\n    <ion-list>\n      <ion-item *ngFor="let order of orders | async" >\n        \n        <ion-thumbnail item-start >\n          <img src={{order.image}}>\n        </ion-thumbnail>\n\n        <h2>{{order.name}}</h2>\n        <p>\n          <ion-badge color="danger"> Rs {{order.price}} </ion-badge> x {{order.quantity}}\n        </p>\n        <br>\n        <ion-item style="margin: -20px;">\n          <ion-range readonly disabled min="0" max="3" step="1" snaps="true"  color="danger" ngModel="{{order.status}}" >\n            <ion-icon range-left small color="danger" name="md-cart"></ion-icon>\n            <ion-icon range-right color="danger" name="md-home"></ion-icon>\n          </ion-range>\n        </ion-item>\n\n      </ion-item>\n    </ion-list>\n\n</ion-content>\n'/*ion-inline-end:"D:\Avijith\src\pages\orders\orders.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_2__providers_cart_service__["a" /* CartService */], __WEBPACK_IMPORTED_MODULE_3__providers_auth_service__["a" /* AuthService */]]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__providers_cart_service__["a" /* CartService */],
        __WEBPACK_IMPORTED_MODULE_3__providers_auth_service__["a" /* AuthService */]])
], OrdersPage);

//# sourceMappingURL=orders.js.map

/***/ }),

/***/ 63:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__products_products__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__register_register__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__forgot_pass_forgot_pass__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_auth_service__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_shared_service__ = __webpack_require__(48);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var LoginPage = (function () {
    function LoginPage(navCtrl, navParams, authService, sharedService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.authService = authService;
        this.sharedService = sharedService;
        this.authService.logout();
    }
    LoginPage.prototype.ionViewDidLoad = function () {
        if (this.authService.isLoggedIn()) {
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__products_products__["a" /* ProductsPage */]);
        }
    };
    LoginPage.prototype.login = function () {
        var _this = this;
        this.sharedService.showLoading(); // start loading
        this.authService.login(this.email, this.password).then(function (value) {
            _this.sharedService.hideLoading(); // stop loading
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__products_products__["a" /* ProductsPage */]);
        })
            .catch(function (err) {
            _this.sharedService.hideLoading();
            _this.sharedService.showToast("Something went wrong!");
        });
    };
    LoginPage.prototype.createAccount = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__register_register__["a" /* RegisterPage */]);
    };
    LoginPage.prototype.resetPassword = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__forgot_pass_forgot_pass__["a" /* ForgotPassPage */]);
    };
    return LoginPage;
}());
LoginPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-login',template:/*ion-inline-start:"D:\Avijith\src\pages\login\login.html"*/'<ion-header>\n  <ion-navbar color="dark">\n    <ion-title>Login</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content  padding>\n    <ion-row>\n      <ion-col></ion-col>\n      <ion-col width-67>\n        <img src="../assets/icon/icon.png"/>\n      </ion-col>\n      <ion-col></ion-col>\n    </ion-row>\n    <div >\n      <form  #registerForm="ngForm">\n        <ion-row>\n          <ion-col>\n            <ion-list inset>\n              \n              <ion-item>\n                <ion-input [(ngModel)]="email" type="text" placeholder="Email" name="email" required></ion-input>\n              </ion-item>\n              \n              <ion-item>\n                <ion-input [(ngModel)]="password" type="password" placeholder="Password" name="password" required></ion-input>\n              </ion-item>\n              \n            </ion-list>\n          </ion-col>\n        </ion-row>\n        \n        <ion-row>\n          <ion-col class="signup-col">\n            <button ion-button color="dark" full (click)="login()" >Login</button>\n            <button ion-button block color="login_pasive_button" outline (click)="createAccount()" >Create New Account</button>\n            <button ion-button block color="login_pasive_button" clear (click)="resetPassword()" >Reset Password</button>\n          </ion-col>\n        </ion-row>\n        \n      </form>\n    </div>\n  </ion-content>'/*ion-inline-end:"D:\Avijith\src\pages\login\login.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_5__providers_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_6__providers_shared_service__["a" /* SharedService */]]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_5__providers_auth_service__["a" /* AuthService */],
        __WEBPACK_IMPORTED_MODULE_6__providers_shared_service__["a" /* SharedService */]])
], LoginPage);

//# sourceMappingURL=login.js.map

/***/ })

},[228]);
//# sourceMappingURL=main.js.map