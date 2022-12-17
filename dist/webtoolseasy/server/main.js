/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 21998:
/*!********************************!*\
  !*** ./src/app/@types/file.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FileDataType": () => (/* binding */ FileDataType)
/* harmony export */ });
var FileDataType;
(function (FileDataType) {
  FileDataType["IMAGE"] = "image";
})(FileDataType || (FileDataType = {}));

/***/ }),

/***/ 34621:
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppRoutingModule": () => (/* binding */ AppRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ 41444);
/* harmony import */ var _components_home_home_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/home/home.component */ 18084);
/* harmony import */ var _modules_app_directory_app_directory_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/app-directory/app-directory.module */ 58769);
/* harmony import */ var _modules_image_compression_image_compression_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/image-compression/image-compression.module */ 96886);
/* harmony import */ var _modules_json_formatter_json_formatter_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/json-formatter/json-formatter.module */ 6467);
/* harmony import */ var _modules_jwt_jwt_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/jwt/jwt.module */ 84689);
/* harmony import */ var _modules_uuid_uuid_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/uuid/uuid.module */ 51535);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 4009);









const routes = [{
  path: '',
  component: _components_home_home_component__WEBPACK_IMPORTED_MODULE_0__.HomeComponent
}, {
  path: 'tools',
  loadChildren: () => _modules_app_directory_app_directory_module__WEBPACK_IMPORTED_MODULE_1__.AppDirectoryModule
}, {
  path: 'tools/uuid',
  loadChildren: () => _modules_uuid_uuid_module__WEBPACK_IMPORTED_MODULE_5__.UuidModule
}, {
  path: 'tools/jwt',
  loadChildren: () => _modules_jwt_jwt_module__WEBPACK_IMPORTED_MODULE_4__.JwtModule
}, {
  path: 'tools/json-formatter',
  loadChildren: () => _modules_json_formatter_json_formatter_module__WEBPACK_IMPORTED_MODULE_3__.JsonFormatterModule
}, {
  path: 'tools/image-compress',
  loadChildren: () => _modules_image_compression_image_compression_module__WEBPACK_IMPORTED_MODULE_2__.ImageCompressionModule
}];
class AppRoutingModule {}
AppRoutingModule.ɵfac = function AppRoutingModule_Factory(t) {
  return new (t || AppRoutingModule)();
};
AppRoutingModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineNgModule"]({
  type: AppRoutingModule
});
AppRoutingModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjector"]({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_7__.RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
  }), _angular_router__WEBPACK_IMPORTED_MODULE_7__.RouterModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵsetNgModuleScope"](AppRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_7__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_7__.RouterModule]
  });
})();

/***/ }),

/***/ 59229:
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppComponent": () => (/* binding */ AppComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 4009);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ 41444);


class AppComponent {
  constructor() {
    this.title = 'webtoolseasy';
  }
}
AppComponent.ɵfac = function AppComponent_Factory(t) {
  return new (t || AppComponent)();
};
AppComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: AppComponent,
  selectors: [["app-root"]],
  decls: 1,
  vars: 0,
  template: function AppComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "router-outlet");
    }
  },
  dependencies: [_angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterOutlet],
  styles: ["\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ }),

/***/ 63370:
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppModule": () => (/* binding */ AppModule)
/* harmony export */ });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/platform-browser */ 55806);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common/http */ 8746);
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app-routing.module */ 34621);
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app.component */ 59229);
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/platform-browser/animations */ 89166);
/* harmony import */ var ngx_google_analytics__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ngx-google-analytics */ 28630);
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/environments/environment */ 97354);
/* harmony import */ var _components_home_home_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/home/home.component */ 18084);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/icon */ 95359);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/button */ 40510);
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/list */ 44182);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 4009);














class AppModule {}
AppModule.ɵfac = function AppModule_Factory(t) {
  return new (t || AppModule)();
};
AppModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({
  type: AppModule,
  bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_1__.AppComponent]
});
AppModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({
  imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__.BrowserModule.withServerTransition({
    appId: 'webtoolseasyApp'
  }), _app_routing_module__WEBPACK_IMPORTED_MODULE_0__.AppRoutingModule, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__.BrowserAnimationsModule, _angular_common_http__WEBPACK_IMPORTED_MODULE_7__.HttpClientModule, ngx_google_analytics__WEBPACK_IMPORTED_MODULE_8__.NgxGoogleAnalyticsModule.forRoot(src_environments_environment__WEBPACK_IMPORTED_MODULE_2__.environment.gaCode), ngx_google_analytics__WEBPACK_IMPORTED_MODULE_8__.NgxGoogleAnalyticsRouterModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_9__.MatIconModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_10__.MatButtonModule, _angular_material_list__WEBPACK_IMPORTED_MODULE_11__.MatListModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](AppModule, {
    declarations: [_app_component__WEBPACK_IMPORTED_MODULE_1__.AppComponent, _components_home_home_component__WEBPACK_IMPORTED_MODULE_3__.HomeComponent],
    imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__.BrowserModule, _app_routing_module__WEBPACK_IMPORTED_MODULE_0__.AppRoutingModule, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__.BrowserAnimationsModule, _angular_common_http__WEBPACK_IMPORTED_MODULE_7__.HttpClientModule, ngx_google_analytics__WEBPACK_IMPORTED_MODULE_8__.NgxGoogleAnalyticsModule, ngx_google_analytics__WEBPACK_IMPORTED_MODULE_8__.NgxGoogleAnalyticsRouterModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_9__.MatIconModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_10__.MatButtonModule, _angular_material_list__WEBPACK_IMPORTED_MODULE_11__.MatListModule]
  });
})();

/***/ }),

/***/ 84362:
/*!**************************************!*\
  !*** ./src/app/app.server.module.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppServerModule": () => (/* binding */ AppServerModule)
/* harmony export */ });
/* harmony import */ var _angular_platform_server__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-server */ 78163);
/* harmony import */ var _app_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app.module */ 63370);
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app.component */ 59229);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 4009);




class AppServerModule {}
AppServerModule.ɵfac = function AppServerModule_Factory(t) {
  return new (t || AppServerModule)();
};
AppServerModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
  type: AppServerModule,
  bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_1__.AppComponent]
});
AppServerModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
  imports: [_app_module__WEBPACK_IMPORTED_MODULE_0__.AppModule, _angular_platform_server__WEBPACK_IMPORTED_MODULE_3__.ServerModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](AppServerModule, {
    imports: [_app_module__WEBPACK_IMPORTED_MODULE_0__.AppModule, _angular_platform_server__WEBPACK_IMPORTED_MODULE_3__.ServerModule]
  });
})();

/***/ }),

/***/ 12178:
/*!****************************************!*\
  !*** ./src/app/base/base.component.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BaseComponent": () => (/* binding */ BaseComponent)
/* harmony export */ });
class BaseComponent {
  constructor(router, configService, contextService, titleService, metaService, document) {
    this.tags = [];
    this.router = router;
    this.configService = configService;
    this.contextService = contextService;
    this.titleService = titleService;
    this.metaService = metaService;
    this.document = document;
  }
  navigateByAppId(applicationId) {
    if (this.configService.getApplicationConfig(applicationId)?.navigationUrl !== '') {
      this.router.navigateByUrl(this.configService.getApplicationConfig(applicationId)?.navigationUrl);
    }
  }
  /**
   * set following page metadata
   *
   * 1. title
   * 2. meta
   * 3. canonical url
   *
   */
  updatePageMetaData() {
    const applicationConfig = this.configService.getApplicationConfig(this.contextService.getCurrentAppId());
    this.titleService.setTitle(applicationConfig.pageTitle);
    applicationConfig.metaTags.forEach(metaDefinition => {
      this.metaService.removeTag(`name=${metaDefinition.name}`);
      this.metaService.addTag(metaDefinition);
    });
    /**
     * set canonical url
     */
    let linkElement = this.document.querySelector(`link[rel='canonical']`) || null;
    if (linkElement == null) {
      linkElement = this.document.createElement('link');
      this.document.head.appendChild(linkElement);
    }
    linkElement.setAttribute('rel', 'canonical');
    linkElement.setAttribute('href', `https://webtoolseasy.com${applicationConfig.navigationUrl}`);
  }
  onAppClick(event) {
    event.stopPropagation();
  }
}

/***/ }),

/***/ 772:
/*!*********************************************************************!*\
  !*** ./src/app/components/app-directory/app-directory.component.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppDirectoryComponent": () => (/* binding */ AppDirectoryComponent)
/* harmony export */ });
/* harmony import */ var src_app_base_base_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/base/base.component */ 12178);
/* harmony import */ var src_app_service_util_logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/service/util/logger */ 62003);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ 97191);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 4009);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 41444);
/* harmony import */ var src_app_service_common_config_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/service/common/config.service */ 56021);
/* harmony import */ var src_app_service_context_context_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/service/context/context.service */ 36903);
/* harmony import */ var src_app_service_icon_app_icon_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/service/icon/app-icon.service */ 90714);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/platform-browser */ 55806);
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/toolbar */ 86452);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/icon */ 95359);
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/card */ 20981);













function AppDirectoryComponent_div_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AppDirectoryComponent_div_8_Template_div_click_0_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r3);
      const application_r1 = restoredCtx.$implicit;
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r2.navigateByAppId(application_r1.applicationId));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "mat-card")(2, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](3, "mat-icon", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](4, "a", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AppDirectoryComponent_div_8_Template_a_click_4_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r3);
      const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r4.onAppClick($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const application_r1 = ctx.$implicit;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    let tmp_1_0;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpropertyInterpolate"]("svgIcon", application_r1.iconName);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpropertyInterpolate"]("routerLink", (tmp_1_0 = ctx_r0.configService.getApplicationConfig(application_r1.applicationId)) == null ? null : tmp_1_0.navigationUrl);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("replaceUrl", true);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](application_r1.displayText);
  }
}
class AppDirectoryComponent extends src_app_base_base_component__WEBPACK_IMPORTED_MODULE_0__.BaseComponent {
  constructor(router, configService, contextService, appIconService, titleService, metaService, document) {
    super(router, configService, contextService, titleService, metaService, document);
    this.assetsPath = '../../../assets/';
    /**
     * application config for composing UI
     */
    this.appsConfig = [{
      applicationId: 'uuid',
      displayText: 'Online UUID Generator',
      iconName: 'uuid-icon'
    }, {
      applicationId: 'jwt',
      displayText: 'Online JWT Decoder',
      iconName: 'jwt-icon'
    }, {
      applicationId: 'jsonformatter',
      displayText: 'Online JSON Formatter',
      iconName: 'json-icon'
    }, {
      applicationId: 'imagecompress',
      displayText: 'Online Image Compressor',
      iconName: 'image-compress-icon'
    }, {
      applicationId: 'soon',
      displayText: 'More Tools Coming Soon',
      iconName: 'soon-icon'
    }];
    this.contextService.setCurrentAppId('tools');
    this.updatePageMetaData();
  }
  ngOnInit() {
    src_app_service_util_logger__WEBPACK_IMPORTED_MODULE_1__.LogUtils.info('app directory component has been rendered');
  }
}
AppDirectoryComponent.ɵfac = function AppDirectoryComponent_Factory(t) {
  return new (t || AppDirectoryComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_6__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](src_app_service_common_config_service__WEBPACK_IMPORTED_MODULE_2__.ConfigService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](src_app_service_context_context_service__WEBPACK_IMPORTED_MODULE_3__.ContextService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](src_app_service_icon_app_icon_service__WEBPACK_IMPORTED_MODULE_4__.AppIconService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_7__.Title), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_7__.Meta), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_8__.DOCUMENT));
};
AppDirectoryComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({
  type: AppDirectoryComponent,
  selectors: [["app-app-directory"]],
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵInheritDefinitionFeature"]],
  decls: 9,
  vars: 1,
  consts: [[1, "full-height", "flex-display", "flex-column-flow", "no-y-scroll"], [1, "header-div"], ["color", "primary"], ["svgIcon", "app-icon", 1, "app-icon", "pointer-cursor"], [1, "header-font"], [1, "flex-full-height", "app-background"], ["id", "apps-container", 1, "apps-container", "pointer-cursor"], ["class", "application", 3, "click", 4, "ngFor", "ngForOf"], [1, "application", 3, "click"], [1, "flex-display", "flex-column-flow", "flex-center", "flex-align-center", "app-card"], [1, "pointer-cursor", 2, "transform", "scale(2)", "margin-top", "10px", "margin-bottom", "15px", 3, "svgIcon"], [3, "replaceUrl", "routerLink", "click"]],
  template: function AppDirectoryComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "mat-toolbar", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](3, "mat-icon", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](4, "span", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](5, "WebToolsEasy");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](6, "div", 5)(7, "div", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](8, AppDirectoryComponent_div_8_Template, 6, 4, "div", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](8);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngForOf", ctx.appsConfig);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_8__.NgForOf, _angular_router__WEBPACK_IMPORTED_MODULE_6__.RouterLink, _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_9__.MatToolbar, _angular_material_icon__WEBPACK_IMPORTED_MODULE_10__.MatIcon, _angular_material_card__WEBPACK_IMPORTED_MODULE_11__.MatCard],
  styles: [".apps-container[_ngcontent-%COMP%] {\n  margin: 10px;\n  display: flex;\n  flex-wrap: wrap;\n}\n\n.application[_ngcontent-%COMP%] {\n  border-radius: 10px;\n  margin: 10px;\n}\n\n@media screen and (max-width: 735px) {\n  .application[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n}\n.app-card[_ngcontent-%COMP%] {\n  margin: 15px;\n}\n\n@media screen and (max-width: 735px) {\n  .app-card[_ngcontent-%COMP%] {\n    flex-direction: row;\n  }\n  .app-card[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n    margin-right: 20px;\n  }\n}\n/*# sourceURL=webpack://./src/app/components/app-directory/app-directory.component.scss */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29tcG9uZW50cy9hcHAtZGlyZWN0b3J5L2FwcC1kaXJlY3RvcnkuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxZQUFBO0VBQ0EsYUFBQTtFQUNBLGVBQUE7QUFDRjs7QUFFQTtFQUNFLG1CQUFBO0VBQ0EsWUFBQTtBQUNGOztBQUVBO0VBQ0U7SUFDRSxXQUFBO0VBQ0Y7QUFDRjtBQUVBO0VBQ0UsWUFBQTtBQUFGOztBQUdBO0VBQ0U7SUFDRSxtQkFBQTtFQUFGO0VBRUE7SUFDRSxrQkFBQTtFQUFGO0FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIuYXBwcy1jb250YWluZXIge1xuICBtYXJnaW46IDEwcHg7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtd3JhcDogd3JhcDtcbn1cblxuLmFwcGxpY2F0aW9uIHtcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgbWFyZ2luOiAxMHB4O1xufVxuXG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA3MzVweCkge1xuICAuYXBwbGljYXRpb24ge1xuICAgIHdpZHRoOiAxMDAlO1xuICB9XG59XG4uYXBwLWNhcmQge1xuICBtYXJnaW46IDE1cHg7XG59XG5cbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDczNXB4KSB7XG4gIC5hcHAtY2FyZCB7XG4gICAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgfVxuICAuYXBwLWNhcmQgbWF0LWljb24ge1xuICAgIG1hcmdpbi1yaWdodDogMjBweDtcbiAgfVxufSJdLCJzb3VyY2VSb290IjoiIn0= */"]
});

/***/ }),

/***/ 74917:
/*!*****************************************************************************!*\
  !*** ./src/app/components/compress-settings/compress-settings.component.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CompressSettingsComponent": () => (/* binding */ CompressSettingsComponent)
/* harmony export */ });
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/dialog */ 92889);
/* harmony import */ var src_app_service_util_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/service/util/logger */ 62003);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 4009);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/button */ 40510);
/* harmony import */ var _angular_material_slider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/slider */ 5818);






class CompressSettingsComponent {
  constructor(dialogRef, data) {
    this.dialogRef = dialogRef;
    this.maxFileSize = data.maxFileSize;
    this.oldFileSize = data.file.size;
    this.fileId = data.id;
    this.compressionRate = data.compressionRate;
  }
  ngOnInit() {
    src_app_service_util_logger__WEBPACK_IMPORTED_MODULE_0__.LogUtils.info('compression settings component has been rendered');
  }
  onCompressionRateChange(event) {
    this.compressionRate = event.target.value;
    const compressionRatio = 100 - event.target.value;
    this.maxFileSize = compressionRatio / 100 * this.oldFileSize;
  }
  /**
   * format size in to higher terms
   * @param bytes
   * @param decimals
   * @returns
   */
  formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
  applySettings() {
    const imageCompressSettings = {
      fileId: this.fileId,
      compressionRate: this.compressionRate,
      maxFileSize: this.maxFileSize
    };
    this.dialogRef.close(imageCompressSettings);
  }
  cancelDialog() {
    this.dialogRef.close();
  }
}
CompressSettingsComponent.ɵfac = function CompressSettingsComponent_Factory(t) {
  return new (t || CompressSettingsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__.MatDialogRef), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__.MAT_DIALOG_DATA));
};
CompressSettingsComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
  type: CompressSettingsComponent,
  selectors: [["app-compress-settings"]],
  decls: 23,
  vars: 4,
  consts: [[1, "flex-display", "flex-column-flow", "flex-center", "flex-align-center", 2, "margin", "20px"], [1, "flex-display", "flex-row-flow", "flex-align-center", "full-width"], [1, "bold-text", 2, "margin-right", "5px"], ["min", "10", "max", "80", "step", "1", "color", "primary", 2, "margin-right", "5px", 3, "input"], ["matSliderThumb", "", 3, "value"], [1, "bold-text"], [1, "flex-display", "flex-row-flow", "flex-align-center", "full-width", 2, "margin-bottom", "5px"], [1, "flex-display", "flex-row-flow", "flex-align-center", "full-width", 2, "margin-bottom", "10px"], [1, "flex-display", "flex-row-flow", "flex"], ["mat-raised-button", "", "color", "primary", 2, "margin-right", "10px", 3, "click"], ["mat-raised-button", "", "color", "primary", 3, "click"]],
  template: function CompressSettingsComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "span", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "Compress %:");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "mat-slider", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("input", function CompressSettingsComponent_Template_mat_slider_input_4_listener($event) {
        return ctx.onCompressionRateChange($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](5, "input", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "span", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "div", 6)(9, "span", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](10, "Compress File Size:");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "span");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](12);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](13, "div", 7)(14, "span", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](15, "Old File Size:");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](16, "span");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](17);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](18, "div", 8)(19, "button", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function CompressSettingsComponent_Template_button_click_19_listener() {
        return ctx.applySettings();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](20, " Apply Settings ");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](21, "button", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function CompressSettingsComponent_Template_button_click_21_listener() {
        return ctx.cancelDialog();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](22, " Cancel ");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value", ctx.compressionRate);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("", ctx.compressionRate, "%");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx.formatBytes(ctx.maxFileSize));
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx.formatBytes(ctx.oldFileSize));
    }
  },
  dependencies: [_angular_material_button__WEBPACK_IMPORTED_MODULE_3__.MatButton, _angular_material_slider__WEBPACK_IMPORTED_MODULE_4__.MatSlider, _angular_material_slider__WEBPACK_IMPORTED_MODULE_4__.MatSliderThumb],
  styles: ["\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ }),

/***/ 18084:
/*!***************************************************!*\
  !*** ./src/app/components/home/home.component.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HomeComponent": () => (/* binding */ HomeComponent)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ 97191);
/* harmony import */ var src_app_base_base_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/base/base.component */ 12178);
/* harmony import */ var src_app_service_util_logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/service/util/logger */ 62003);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 4009);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 41444);
/* harmony import */ var src_app_service_common_config_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/service/common/config.service */ 56021);
/* harmony import */ var src_app_service_context_context_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/service/context/context.service */ 36903);
/* harmony import */ var src_app_service_icon_app_icon_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/service/icon/app-icon.service */ 90714);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/platform-browser */ 55806);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/icon */ 95359);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/button */ 40510);
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/list */ 44182);












class HomeComponent extends src_app_base_base_component__WEBPACK_IMPORTED_MODULE_0__.BaseComponent {
  constructor(router, configService, contextService, appIconService, titleService, metaService, document) {
    super(router, configService, contextService, titleService, metaService, document);
    this.contextService.setCurrentAppId('home');
    this.updatePageMetaData();
  }
  ngOnInit() {
    src_app_service_util_logger__WEBPACK_IMPORTED_MODULE_1__.LogUtils.info('home component has been rendered');
  }
}
HomeComponent.ɵfac = function HomeComponent_Factory(t) {
  return new (t || HomeComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_6__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](src_app_service_common_config_service__WEBPACK_IMPORTED_MODULE_2__.ConfigService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](src_app_service_context_context_service__WEBPACK_IMPORTED_MODULE_3__.ContextService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](src_app_service_icon_app_icon_service__WEBPACK_IMPORTED_MODULE_4__.AppIconService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_7__.Title), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_7__.Meta), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_8__.DOCUMENT));
};
HomeComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({
  type: HomeComponent,
  selectors: [["app-home"]],
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵInheritDefinitionFeature"]],
  decls: 34,
  vars: 5,
  consts: [[1, "full-height", "no-scroll", "flex-display", "parent-div"], [1, "flex-display", "flex-column-flow", "flex-align-center", "flex-center", "parent-view-div"], [1, "flex-display", "flex-column-flow", "flex-center", "flex-align-center", "full-width", "icon-div"], ["svgIcon", "app-icon"], [1, "header-font", "bold-text", "app-name", 2, "margin-bottom", "20px"], [2, "margin-bottom", "10px"], ["mat-stroked-button", "", "color", "primary", "matTooltip", "select images to compress", "routerLink", "/tools", 2, "width", "200px", 3, "replaceUrl"], [1, "flex-display", "flex-column-flow", "flex-center", "flex-align-center", "flex-full-height", "parent-view-div", "app-links"], [1, "header-font", "bold-text", 2, "font-size", "large"], ["role", "list"], ["role", "listitem"], [1, "flex-display", "flex-row-flow", "flex-align-center"], ["svgIcon", "uuid-icon", 2, "margin", "15px", "transform", "scale(1.5)"], ["routerLink", "/tools/uuid", 3, "replaceUrl"], ["svgIcon", "jwt-icon", 2, "margin", "15px", "transform", "scale(1.5)"], ["routerLink", "/tools/jwt", 3, "replaceUrl"], ["svgIcon", "json-icon", 2, "margin", "15px", "transform", "scale(1.5)"], ["routerLink", "/tools/json-formatter", 3, "replaceUrl"], ["svgIcon", "image-compress-icon", 2, "margin", "15px", "transform", "scale(1.5)"], ["routerLink", "/tools/image-compress", 3, "replaceUrl"]],
  template: function HomeComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "div", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](3, "mat-icon", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](4, "span", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](5, "Web Tools Easy");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](6, "span", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](7, "Super easy web tools to make work easier");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](8, "button", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](9, " Get Started ");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](10, "div", 7)(11, "span", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](12, "Tools Directory");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](13, "mat-list", 9)(14, "mat-list-item", 10)(15, "div", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](16, "mat-icon", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](17, "a", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](18, "Online UUID Generator");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](19, "mat-list-item", 10)(20, "div", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](21, "mat-icon", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](22, "a", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](23, "Online JWT Decoder");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](24, "mat-list-item", 10)(25, "div", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](26, "mat-icon", 16);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](27, "a", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](28, "Online JSON Formatter");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](29, "mat-list-item", 10)(30, "div", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](31, "mat-icon", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](32, "a", 19);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](33, "Online Image Compressor");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()()()()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](8);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("replaceUrl", true);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](9);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("replaceUrl", true);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("replaceUrl", true);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("replaceUrl", true);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("replaceUrl", true);
    }
  },
  dependencies: [_angular_router__WEBPACK_IMPORTED_MODULE_6__.RouterLink, _angular_material_icon__WEBPACK_IMPORTED_MODULE_9__.MatIcon, _angular_material_button__WEBPACK_IMPORTED_MODULE_10__.MatButton, _angular_material_list__WEBPACK_IMPORTED_MODULE_11__.MatList, _angular_material_list__WEBPACK_IMPORTED_MODULE_11__.MatListItem],
  styles: [".icon-div[_ngcontent-%COMP%] {\n  height: 300px;\n}\n\n.parent-div[_ngcontent-%COMP%] {\n  flex-flow: row;\n}\n\n.icon-div[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  transform: scale(10);\n}\n\n.app-name[_ngcontent-%COMP%] {\n  font-size: xxx-large;\n}\n\n.parent-view-div[_ngcontent-%COMP%] {\n  width: 50%;\n}\n\n@media screen and (max-width: 735px) {\n  .icon-div[_ngcontent-%COMP%] {\n    height: 150px;\n  }\n  .icon-div[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n    transform: scale(5);\n  }\n  .app-name[_ngcontent-%COMP%] {\n    font-size: x-large;\n  }\n  .parent-div[_ngcontent-%COMP%] {\n    flex-flow: column;\n  }\n  .parent-view-div[_ngcontent-%COMP%] {\n    width: 100%;\n    height: 50%;\n  }\n  .app-links[_ngcontent-%COMP%] {\n    justify-content: start;\n  }\n}\n/*# sourceURL=webpack://./src/app/components/home/home.component.scss */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29tcG9uZW50cy9ob21lL2hvbWUuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxhQUFBO0FBQ0Y7O0FBRUE7RUFDRSxjQUFBO0FBQ0Y7O0FBRUE7RUFDRSxvQkFBQTtBQUNGOztBQUVBO0VBQ0Usb0JBQUE7QUFDRjs7QUFFQTtFQUNFLFVBQUE7QUFDRjs7QUFFQTtFQUNFO0lBQ0UsYUFBQTtFQUNGO0VBQ0E7SUFDRSxtQkFBQTtFQUNGO0VBQ0E7SUFDRSxrQkFBQTtFQUNGO0VBQ0E7SUFDRSxpQkFBQTtFQUNGO0VBQ0E7SUFDRSxXQUFBO0lBQ0EsV0FBQTtFQUNGO0VBQ0E7SUFDRSxzQkFBQTtFQUNGO0FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIuaWNvbi1kaXYge1xuICBoZWlnaHQ6IDMwMHB4O1xufVxuXG4ucGFyZW50LWRpdiB7XG4gIGZsZXgtZmxvdzogcm93O1xufVxuXG4uaWNvbi1kaXYgbWF0LWljb24ge1xuICB0cmFuc2Zvcm06IHNjYWxlKDEwKTtcbn1cblxuLmFwcC1uYW1lIHtcbiAgZm9udC1zaXplOiB4eHgtbGFyZ2U7XG59XG5cbi5wYXJlbnQtdmlldy1kaXYge1xuICB3aWR0aDogNTAlO1xufVxuXG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA3MzVweCkge1xuICAuaWNvbi1kaXYge1xuICAgIGhlaWdodDogMTUwcHg7XG4gIH1cbiAgLmljb24tZGl2IG1hdC1pY29uIHtcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDUpO1xuICB9XG4gIC5hcHAtbmFtZSB7XG4gICAgZm9udC1zaXplOiB4LWxhcmdlO1xuICB9XG4gIC5wYXJlbnQtZGl2IHtcbiAgICBmbGV4LWZsb3c6IGNvbHVtbjtcbiAgfVxuICAucGFyZW50LXZpZXctZGl2IHtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBoZWlnaHQ6IDUwJTtcbiAgfVxuICAuYXBwLWxpbmtzIHtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHN0YXJ0O1xuICB9XG59Il0sInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ }),

/***/ 72099:
/*!*****************************************************************************!*\
  !*** ./src/app/components/image-compression/image-compression.component.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ImageCompressionComponent": () => (/* binding */ ImageCompressionComponent)
/* harmony export */ });
/* harmony import */ var _Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 70734);
/* harmony import */ var src_app_types_file__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/@types/file */ 21998);
/* harmony import */ var src_app_base_base_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/base/base.component */ 12178);
/* harmony import */ var src_app_service_util_logger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/service/util/logger */ 62003);
/* harmony import */ var browser_image_compression__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! browser-image-compression */ 50428);
/* harmony import */ var jszip__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! jszip */ 92953);
/* harmony import */ var jszip__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(jszip__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! rxjs */ 47401);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(rxjs__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _angular_cdk_layout__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/cdk/layout */ 71368);
/* harmony import */ var _compress_settings_compress_settings_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../compress-settings/compress-settings.component */ 74917);
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! uuid */ 64890);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/common */ 97191);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/core */ 4009);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/router */ 41444);
/* harmony import */ var src_app_service_common_config_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/service/common/config.service */ 56021);
/* harmony import */ var src_app_service_context_context_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/service/context/context.service */ 36903);
/* harmony import */ var src_app_service_icon_app_icon_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/service/icon/app-icon.service */ 90714);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/platform-browser */ 55806);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/dialog */ 92889);
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/material/toolbar */ 86452);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/material/icon */ 95359);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/material/button */ 40510);
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/material/card */ 20981);
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @angular/material/tooltip */ 49115);

























const _c0 = ["inputFiles"];
function ImageCompressionComponent_div_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "div", 19)(1, "mat-icon", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](2, "collections");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](3, "span", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](4, "Drag & drop files here");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](5, "span", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](6, "or");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](7, "button", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function ImageCompressionComponent_div_16_Template_button_click_7_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r5);
      const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵresetView"](ctx_r4.openFileDialog());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](8, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](9, "file_upload");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](10, " Browse for files ");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
  }
}
function ImageCompressionComponent_div_17_button_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "button", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function ImageCompressionComponent_div_17_button_5_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r9);
      const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵresetView"](ctx_r8.startCompressAll());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](1, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](2, "play_arrow");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](3, " Compress All ");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
  }
}
function ImageCompressionComponent_div_17_button_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "button", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function ImageCompressionComponent_div_17_button_6_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r11);
      const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵresetView"](ctx_r10.downloadAll());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](1, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](2, "file_download");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](3, " Download Zip ");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
  }
}
const _c1 = function (a1) {
  return {
    margin: "10px",
    "justify-content": a1
  };
};
function ImageCompressionComponent_div_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "div", 24)(1, "button", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function ImageCompressionComponent_div_17_Template_button_click_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r13);
      const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵresetView"](ctx_r12.openFileDialog());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](2, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](3, "file_upload");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](4, " Select Images ");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](5, ImageCompressionComponent_div_17_button_5_Template, 4, 0, "button", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](6, ImageCompressionComponent_div_17_button_6_Template, 4, 0, "button", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngStyle", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpureFunction1"](3, _c1, ctx_r2.fileList.length > 0 ? "end" : "center"));
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", ctx_r2.fileList.length > 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", ctx_r2.isDownloadAllActive && !ctx_r2.isMobile);
  }
}
function ImageCompressionComponent_div_18_mat_card_1_span_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "span", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const file_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]().$implicit;
    const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate2"]("", ctx_r16.formatBytes(file_r15.file.size), " -> ", ctx_r16.formatBytes(file_r15.compressedData == null ? null : file_r15.compressedData.size), "");
  }
}
function ImageCompressionComponent_div_18_mat_card_1_span_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "span", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const file_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](file_r15.error);
  }
}
function ImageCompressionComponent_div_18_mat_card_1_span_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "span", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const file_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"]("Progress: ", file_r15.compressProgress, " %");
  }
}
function ImageCompressionComponent_div_18_mat_card_1_mat_icon_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r28 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "mat-icon", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function ImageCompressionComponent_div_18_mat_card_1_mat_icon_11_Template_mat_icon_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r28);
      const file_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]().$implicit;
      const ctx_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵresetView"](ctx_r26.openSettingsDialog(file_r15));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
  }
}
function ImageCompressionComponent_div_18_mat_card_1_mat_icon_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r31 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "mat-icon", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function ImageCompressionComponent_div_18_mat_card_1_mat_icon_12_Template_mat_icon_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r31);
      const file_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]().$implicit;
      const ctx_r29 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵresetView"](ctx_r29.compressImage(file_r15));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
  }
}
function ImageCompressionComponent_div_18_mat_card_1_mat_icon_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r34 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "mat-icon", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function ImageCompressionComponent_div_18_mat_card_1_mat_icon_13_Template_mat_icon_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r34);
      const file_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]().$implicit;
      const ctx_r32 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵresetView"](ctx_r32.downloadImage(file_r15));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
  }
}
function ImageCompressionComponent_div_18_mat_card_1_mat_icon_14_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "mat-icon", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](1, "error");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
  }
}
function ImageCompressionComponent_div_18_mat_card_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "mat-card", 32)(1, "div", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](2, "mat-icon", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](3, "div", 35)(4, "span", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](6, ImageCompressionComponent_div_18_mat_card_1_span_6_Template, 2, 2, "span", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](7, ImageCompressionComponent_div_18_mat_card_1_span_7_Template, 2, 1, "span", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](8, "span", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](9, "div", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](10, ImageCompressionComponent_div_18_mat_card_1_span_10_Template, 2, 1, "span", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](11, ImageCompressionComponent_div_18_mat_card_1_mat_icon_11_Template, 1, 0, "mat-icon", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](12, ImageCompressionComponent_div_18_mat_card_1_mat_icon_12_Template, 1, 0, "mat-icon", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](13, ImageCompressionComponent_div_18_mat_card_1_mat_icon_13_Template, 1, 0, "mat-icon", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](14, ImageCompressionComponent_div_18_mat_card_1_mat_icon_14_Template, 2, 0, "mat-icon", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const file_r15 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](file_r15.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", file_r15.isCompressed);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", file_r15.error !== undefined);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", file_r15.inProgress);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", file_r15.isValid);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", !file_r15.isCompressed && file_r15.isValid);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", file_r15.isCompressed);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", !file_r15.isValid);
  }
}
function ImageCompressionComponent_div_18_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "div", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](1, ImageCompressionComponent_div_18_mat_card_1_Template, 15, 8, "mat-card", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngForOf", ctx_r3.fileList);
  }
}
class ImageCompressionComponent extends src_app_base_base_component__WEBPACK_IMPORTED_MODULE_2__.BaseComponent {
  constructor(router, configService, contextService, appIconService, titleService, metaService, renderer, zoneRef, breakpointObserver, dialog, document) {
    super(router, configService, contextService, titleService, metaService, document);
    this.renderer = renderer;
    this.zoneRef = zoneRef;
    this.dialog = dialog;
    this.fileList = [];
    this.destroyed = new rxjs__WEBPACK_IMPORTED_MODULE_11__.Subject();
    this.isDownloadAllActive = false;
    this.contextService.setCurrentAppId('imagecompress');
    this.updatePageMetaData();
    this.tags = this.configService.getApplicationConfig(this.contextService.getCurrentAppId())?.tags;
    breakpointObserver.observe([_angular_cdk_layout__WEBPACK_IMPORTED_MODULE_12__.Breakpoints.Handset, _angular_cdk_layout__WEBPACK_IMPORTED_MODULE_12__.Breakpoints.Web]).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_11__.takeUntil)(this.destroyed)).subscribe(result => {
      this.isMobile = breakpointObserver.isMatched('(max-width: 735px)');
      src_app_service_util_logger__WEBPACK_IMPORTED_MODULE_3__.LogUtils.info(`mobile view: ${this.isMobile}`);
    });
  }
  ngOnInit() {
    src_app_service_util_logger__WEBPACK_IMPORTED_MODULE_3__.LogUtils.info('image compression component has rendered');
  }
  ngAfterViewInit() {
    this.zipBuilder = new jszip__WEBPACK_IMPORTED_MODULE_5__();
  }
  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }
  openFileDialog() {
    var _this = this;
    return (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this.renderer.selectRootElement(_this.inputFiles.nativeElement, true).click();
    })();
  }
  /**
   * open settings dialog
   * @param file
   */
  openSettingsDialog(file) {
    var _this2 = this;
    return (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this2.closeDialog();
      const dialogConfig = {
        data: file
      };
      _this2.activeDialog = _this2.dialog.open(_compress_settings_compress_settings_component__WEBPACK_IMPORTED_MODULE_6__.CompressSettingsComponent, dialogConfig);
      /**
       * subscribe dialog close event
       */
      _this2.activeDialog.afterClosed().subscribe(_this2.handleSettingsChange.bind(_this2));
    })();
  }
  closeDialog(data = {}) {
    var _this3 = this;
    return (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (_this3.activeDialog) {
        _this3.activeDialog.close(data);
      }
    })();
  }
  /**
   * handle compression rate change event
   * @param data
   */
  handleSettingsChange(data = {}) {
    var _this4 = this;
    return (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      src_app_service_util_logger__WEBPACK_IMPORTED_MODULE_3__.LogUtils.info(`settings dialog closed with data: ${JSON.stringify(data)}`);
      /**
       * process only if some settings has been changed
       */
      if (Object.keys(data).length > 0) {
        const compressSettings = data;
        _this4.zoneRef.run(() => {
          const fileData = _this4.fileList.find(fileData => fileData.id === compressSettings.fileId);
          if (fileData.compressionRate !== compressSettings.compressionRate) {
            fileData.isCompressed = false;
          }
          fileData.compressionRate = compressSettings.compressionRate;
          fileData.maxFileSize = compressSettings.maxFileSize;
          fileData.compressOptions = {
            ...fileData.compressOptions,
            maxSizeMB: compressSettings.maxFileSize / 1024 / 1024
          };
        });
      }
    })();
  }
  /**
   * file drop event handler
   * @param event
   */
  dropHandler(event) {
    var _this5 = this;
    return (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      // Prevent default behavior (Prevent file from being opened)
      event.preventDefault();
      if (event.dataTransfer.items) {
        // Use DataTransferItemList interface to access the file(s)
        [...event.dataTransfer.items].filter(item => item.kind === 'file').map(item => item.getAsFile()).forEach( /*#__PURE__*/function () {
          var _ref = (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (file) {
            return yield _this5.addFileToCompress(file);
          });
          return function (_x) {
            return _ref.apply(this, arguments);
          };
        }());
      } else {
        // Use DataTransfer interface to access the file(s)
        [...event.dataTransfer.files].forEach( /*#__PURE__*/function () {
          var _ref2 = (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (file) {
            return yield _this5.addFileToCompress(file);
          });
          return function (_x2) {
            return _ref2.apply(this, arguments);
          };
        }());
      }
      yield _this5.sortFiles();
    })();
  }
  /**
   * handle drag over event
   * @param event
   */
  dragOverHandler(event) {
    return (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      // Prevent default behavior (Prevent file from being opened)
      event.preventDefault();
    })();
  }
  sortFiles() {
    var _this6 = this;
    return (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      /**
       * sorting the list to keep invalid files at one end
       */
      _this6.fileList = _this6.fileList.sort((value1, value2) => {
        if (value2.isValid) {
          return 1;
        }
        if (value1.isValid) {
          return -1;
        }
        return 0;
      });
    })();
  }
  addFileToCompress(file) {
    var _this7 = this;
    return (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this7.fileList.push({
        id: (0,uuid__WEBPACK_IMPORTED_MODULE_13__["default"])(),
        file: file,
        type: src_app_types_file__WEBPACK_IMPORTED_MODULE_1__.FileDataType.IMAGE,
        inProgress: false,
        compressProgress: 0,
        isCompressed: false,
        name: file.name,
        isValid: _this7.isValidFileFormat(file),
        error: _this7.isValidFileFormat(file) ? undefined : '* error: invalid file type',
        compressOptions: {
          signal: new AbortController().signal,
          maxSizeMB: 0.9 * file.size / 1024 / 1024
        },
        compressionRate: 10,
        maxFileSize: 0.9 * file.size
      });
    })();
  }
  selectFiles(event) {
    var _this8 = this;
    return (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      for (const file of event.target.files) {
        yield _this8.addFileToCompress(file);
      }
      yield _this8.sortFiles();
    })();
  }
  startCompressAll() {
    var _this9 = this;
    return (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this9.fileList.filter(fileData => fileData.isValid).forEach(fileData => _this9.compressImage(fileData));
    })();
  }
  compressImage(fileData) {
    var _this10 = this;
    return (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this10.zoneRef.run( /*#__PURE__*/(0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
        fileData.inProgress = true;
        fileData.compressProgress = 0;
        fileData.error = undefined;
        try {
          fileData.compressedData = yield (0,browser_image_compression__WEBPACK_IMPORTED_MODULE_4__["default"])(fileData.file, {
            ...fileData.compressOptions,
            onProgress: progress => {
              fileData.compressProgress = progress;
            }
          });
          fileData.isCompressed = true;
          fileData.inProgress = false;
          _this10.isDownloadAllActive = true;
        } catch (error) {
          src_app_service_util_logger__WEBPACK_IMPORTED_MODULE_3__.LogUtils.error(`error while compressing image with name: ${fileData.file.name}`);
          fileData.inProgress = false;
          fileData.isCompressed = false;
          fileData.error = '* compression error';
        }
      }));
    })();
  }
  downloadAll() {
    var _this11 = this;
    return (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this11.fileList.filter(fileData => fileData.isValid).forEach(fileData => _this11.zipBuilder.file(fileData.name, fileData.compressedData, {
        binary: true
      }));
      const zipFileData = yield _this11.zipBuilder.generateAsync({
        type: 'blob'
      });
      _this11.downloadFile('compress-images.zip', zipFileData);
    })();
  }
  downloadImage(fileData) {
    var _this12 = this;
    return (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const fileName = fileData.name.substring(0, fileData.file.name.lastIndexOf('.')) || fileData.name;
      const extension = fileData.file.name.split('.').pop();
      yield _this12.downloadFile(`${fileName}-compressed.${extension}`, fileData.compressedData);
    })();
  }
  downloadFile(fileName, fileContent) {
    var _this13 = this;
    return (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const downloadAnchor = _this13.renderer.createElement('a');
      _this13.renderer.setProperty(downloadAnchor, 'href', URL.createObjectURL(fileContent));
      _this13.renderer.setProperty(downloadAnchor, 'download', fileName);
      downloadAnchor.click();
    })();
  }
  isValidFileFormat(file) {
    return ['image/jpeg', 'image/png'].includes(file.type);
  }
  /**
   * format size in to higher terms
   * @param bytes
   * @param decimals
   * @returns
   */
  formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
  showInfo(fileData) {}
}
ImageCompressionComponent.ɵfac = function ImageCompressionComponent_Factory(t) {
  return new (t || ImageCompressionComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_14__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](src_app_service_common_config_service__WEBPACK_IMPORTED_MODULE_7__.ConfigService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](src_app_service_context_context_service__WEBPACK_IMPORTED_MODULE_8__.ContextService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](src_app_service_icon_app_icon_service__WEBPACK_IMPORTED_MODULE_9__.AppIconService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_15__.Title), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_15__.Meta), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_10__.Renderer2), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_10__.NgZone), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_angular_cdk_layout__WEBPACK_IMPORTED_MODULE_12__.BreakpointObserver), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_16__.MatDialog), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_17__.DOCUMENT));
};
ImageCompressionComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdefineComponent"]({
  type: ImageCompressionComponent,
  selectors: [["app-image-compression"]],
  viewQuery: function ImageCompressionComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵviewQuery"](_c0, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵloadQuery"]()) && (ctx.inputFiles = _t.first);
    }
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵInheritDefinitionFeature"]],
  decls: 33,
  vars: 5,
  consts: [[1, "full-height", "flex-display", "flex-column-flow", "no-y-scroll"], [1, "header-div"], ["color", "primary"], ["mat-icon-button", "", "aria-label", "app icon button", "routerLink", "/tools", 3, "replaceUrl"], ["svgIcon", "app-icon", 1, "app-icon"], [1, "header-font", "flex-full-height"], ["mat-icon-button", "", "aria-label", "home icon button", "routerLink", "/tools", 3, "replaceUrl"], [1, "flex-full-height", "flex-display", "flex-column-flow", "flex-align-center", 2, "padding", "10px"], [1, "header-font", "bold-text", "heading-font", 2, "margin", "20px"], ["type", "file", "multiple", "", 2, "display", "none", 3, "change"], ["inputFiles", ""], [1, "flex-display", "flex-column-flow", "flex-align-center", "image-list-parent", 2, "margin-bottom", "10px", 3, "drop", "dragover"], ["class", "flex-display flex-column-flow flex-center flex-align-center image-drag-div", 4, "ngIf"], ["class", "flex-display flex-row-flow flex-center full-width", 3, "ngStyle", 4, "ngIf"], ["class", "full-width flex-display flex-column-flow y-scroll file-list-div no-scroll", 4, "ngIf"], [1, "flex-display", "flex-row-flow", 2, "margin-left", "10px", "margin-right", "10px"], [1, "bold-text", 2, "margin-right", "5px"], [1, "flex-display", "flex-row-flow", "flex-center", 2, "margin", "20px", "flex-wrap", "wrap"], [1, "tags-class"], [1, "flex-display", "flex-column-flow", "flex-center", "flex-align-center", "image-drag-div"], [2, "transform", "scale(2)", "margin-bottom", "10px"], [1, "header-font", 2, "margin-bottom", "20px", "font-size", "large"], [1, "header-font", 2, "margin-bottom", "10px", "font-size", "large"], ["mat-raised-button", "", "color", "primary", "matTooltip", "select images to compress", 3, "click"], [1, "flex-display", "flex-row-flow", "flex-center", "full-width", 3, "ngStyle"], ["mat-raised-button", "", "color", "primary", "matTooltip", "select images to compress", 2, "margin-right", "10px", 3, "click"], ["mat-raised-button", "", "color", "primary", "matTooltip", "compress all images", 3, "click", 4, "ngIf"], ["mat-raised-button", "", "color", "primary", "style", "margin-left: 10px", "matTooltip", "download all images", 3, "click", 4, "ngIf"], ["mat-raised-button", "", "color", "primary", "matTooltip", "compress all images", 3, "click"], ["mat-raised-button", "", "color", "primary", "matTooltip", "download all images", 2, "margin-left", "10px", 3, "click"], [1, "full-width", "flex-display", "flex-column-flow", "y-scroll", "file-list-div", "no-scroll"], ["style", "margin-bottom: 10px; border: 1px solid black", 4, "ngFor", "ngForOf"], [2, "margin-bottom", "10px", "border", "1px solid black"], [1, "flex-display", "flex-row-flow", "flex-align-center", 2, "margin", "15px"], ["svgIcon", "image-file-icon", 1, "app-icon", "pointer-cursor"], [1, "flex-display", "flex-column-flow", "header-font", "file-name-div"], [1, "bold-text"], ["class", "bold-text header-font", "style", "color: #ff4081", 4, "ngIf"], ["class", "bold-text", "style", "color: red", 4, "ngIf"], [1, "flex-full-height"], [1, "flex-display", "flex-row-flow", "flex-align-center", "flex-center"], ["style", "margin-right: 10px", 4, "ngIf"], ["svgIcon", "settings-icon", "class", "pointer-cursor", "style", "margin-right: 10px", "matTooltip", "change compression settings", 3, "click", 4, "ngIf"], ["svgIcon", "compress-icon", "class", "pointer-cursor", "style", "margin-right: 10px", "matTooltip", "compress image", 3, "click", 4, "ngIf"], ["svgIcon", "download-icon", "class", "pointer-cursor", "matTooltip", "download compressed image", 3, "click", 4, "ngIf"], ["class", "pointer-cursor", "color", "warn", "matTooltip", "only image files can be compressed", "style", "transform: scale(1.5)", 4, "ngIf"], [1, "bold-text", "header-font", 2, "color", "#ff4081"], [1, "bold-text", 2, "color", "red"], [2, "margin-right", "10px"], ["svgIcon", "settings-icon", "matTooltip", "change compression settings", 1, "pointer-cursor", 2, "margin-right", "10px", 3, "click"], ["svgIcon", "compress-icon", "matTooltip", "compress image", 1, "pointer-cursor", 2, "margin-right", "10px", 3, "click"], ["svgIcon", "download-icon", "matTooltip", "download compressed image", 1, "pointer-cursor", 3, "click"], ["color", "warn", "matTooltip", "only image files can be compressed", 1, "pointer-cursor", 2, "transform", "scale(1.5)"]],
  template: function ImageCompressionComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "mat-toolbar", 2)(3, "button", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](4, "mat-icon", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](5, "span", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](6, "WebToolsEasy");
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](7, "button", 6)(8, "mat-icon");
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](9, "home");
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](10, "div", 7)(11, "span", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](12, "Compress Image Online");
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](13, "input", 9, 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("change", function ImageCompressionComponent_Template_input_change_13_listener($event) {
        return ctx.selectFiles($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](15, "div", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("drop", function ImageCompressionComponent_Template_div_drop_15_listener($event) {
        return ctx.dropHandler($event);
      })("dragover", function ImageCompressionComponent_Template_div_dragover_15_listener($event) {
        return ctx.dragOverHandler($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](16, ImageCompressionComponent_div_16_Template, 11, 0, "div", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](17, ImageCompressionComponent_div_17_Template, 7, 5, "div", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](18, ImageCompressionComponent_div_18_Template, 2, 1, "div", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](19, "div", 15)(20, "span", 16);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](21, "NOTE:");
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](22, "span");
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](23, "Only JPEG or PNG images can be compressed");
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](24, "div", 17)(25, "div", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](26, "image");
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](27, "div", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](28, "image compression");
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](29, "div", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](30, "image compressor");
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](31, "div", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](32, "compression");
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("replaceUrl", true);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("replaceUrl", true);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](9);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", ctx.fileList.length === 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", ctx.fileList.length > 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", ctx.fileList.length > 0);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_17__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_17__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_17__.NgStyle, _angular_router__WEBPACK_IMPORTED_MODULE_14__.RouterLink, _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_18__.MatToolbar, _angular_material_icon__WEBPACK_IMPORTED_MODULE_19__.MatIcon, _angular_material_button__WEBPACK_IMPORTED_MODULE_20__.MatButton, _angular_material_button__WEBPACK_IMPORTED_MODULE_20__.MatIconButton, _angular_material_card__WEBPACK_IMPORTED_MODULE_21__.MatCard, _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_22__.MatTooltip],
  styles: [".image-list-parent[_ngcontent-%COMP%] {\n  width: 80%;\n}\n\n@media screen and (max-width: 735px) {\n  .image-list-parent[_ngcontent-%COMP%] {\n    width: 90%;\n  }\n}\n.file-list-div[_ngcontent-%COMP%] {\n  max-height: 400px;\n}\n\n@media screen and (max-width: 735px) {\n  .file-list-div[_ngcontent-%COMP%] {\n    max-height: 300px;\n  }\n}\n.image-drag-div[_ngcontent-%COMP%] {\n  width: 70%;\n  padding: 30px;\n  border: 1px solid black;\n  border-radius: 10px;\n}\n\n@media screen and (max-width: 735px) {\n  .file-name-div[_ngcontent-%COMP%] {\n    width: 60%;\n    overflow-x: hidden;\n  }\n  .image-drag-div[_ngcontent-%COMP%] {\n    width: 90%;\n  }\n}\n/*# sourceURL=webpack://./src/app/components/image-compression/image-compression.component.scss */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29tcG9uZW50cy9pbWFnZS1jb21wcmVzc2lvbi9pbWFnZS1jb21wcmVzc2lvbi5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLFVBQUE7QUFDRjs7QUFFQTtFQUNFO0lBQ0UsVUFBQTtFQUNGO0FBQ0Y7QUFFQTtFQUNFLGlCQUFBO0FBQUY7O0FBR0E7RUFDRTtJQUNFLGlCQUFBO0VBQUY7QUFDRjtBQUdBO0VBQ0UsVUFBQTtFQUNBLGFBQUE7RUFDQSx1QkFBQTtFQUNBLG1CQUFBO0FBREY7O0FBSUE7RUFDRTtJQUNFLFVBQUE7SUFDQSxrQkFBQTtFQURGO0VBR0E7SUFDRSxVQUFBO0VBREY7QUFDRiIsInNvdXJjZXNDb250ZW50IjpbIi5pbWFnZS1saXN0LXBhcmVudCB7XG4gIHdpZHRoOiA4MCU7XG59XG5cbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDczNXB4KSB7XG4gIC5pbWFnZS1saXN0LXBhcmVudCB7XG4gICAgd2lkdGg6IDkwJTtcbiAgfVxufVxuLmZpbGUtbGlzdC1kaXYge1xuICBtYXgtaGVpZ2h0OiA0MDBweDtcbn1cblxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogNzM1cHgpIHtcbiAgLmZpbGUtbGlzdC1kaXYge1xuICAgIG1heC1oZWlnaHQ6IDMwMHB4O1xuICB9XG59XG4uaW1hZ2UtZHJhZy1kaXYge1xuICB3aWR0aDogNzAlO1xuICBwYWRkaW5nOiAzMHB4O1xuICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcbn1cblxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogNzM1cHgpIHtcbiAgLmZpbGUtbmFtZS1kaXYge1xuICAgIHdpZHRoOiA2MCU7XG4gICAgb3ZlcmZsb3cteDogaGlkZGVuO1xuICB9XG4gIC5pbWFnZS1kcmFnLWRpdiB7XG4gICAgd2lkdGg6IDkwJTtcbiAgfVxufSJdLCJzb3VyY2VSb290IjoiIn0= */"]
});

/***/ }),

/***/ 16406:
/*!***********************************************************************!*\
  !*** ./src/app/components/json-formatter/json-formatter.component.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "JsonFormatterComponent": () => (/* binding */ JsonFormatterComponent)
/* harmony export */ });
/* harmony import */ var src_app_base_base_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/base/base.component */ 12178);
/* harmony import */ var src_app_service_util_logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/service/util/logger */ 62003);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ 97191);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 4009);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 41444);
/* harmony import */ var src_app_service_common_config_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/service/common/config.service */ 56021);
/* harmony import */ var src_app_service_context_context_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/service/context/context.service */ 36903);
/* harmony import */ var _angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/cdk/clipboard */ 24654);
/* harmony import */ var src_app_service_icon_app_icon_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/service/icon/app-icon.service */ 90714);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/platform-browser */ 55806);
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/toolbar */ 86452);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/icon */ 95359);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/button */ 40510);














const _c0 = ["rawJsonDiv"];
const _c1 = ["formattedJsonDiv"];
function JsonFormatterComponent_div_23_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 25)(1, "mat-icon", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](2, "error");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "span", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](4, "json string is invalid");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
  }
}
class JsonFormatterComponent extends src_app_base_base_component__WEBPACK_IMPORTED_MODULE_0__.BaseComponent {
  constructor(router, configService, contextService, clipboard, appIconService, renderer, titleService, metaService, document) {
    super(router, configService, contextService, titleService, metaService, document);
    this.clipboard = clipboard;
    this.renderer = renderer;
    this.isJsonValid = true;
    this.rawJson = `{"role":"admin","issuer":"sample issuer","username":"username@webtoolseasy.com","exp":1668942423,"iat":1668942423,"colors":{"primary":"indigo","warn":"red","accent":"pink"}}`;
    this.formattedJson = '';
    this.tabSpaceValue = '   ';
    this.contextService.setCurrentAppId('jsonformatter');
    this.updatePageMetaData();
    this.tags = this.configService.getApplicationConfig(this.contextService.getCurrentAppId())?.tags;
  }
  ngOnInit() {
    src_app_service_util_logger__WEBPACK_IMPORTED_MODULE_1__.LogUtils.info('json formatter componet has rendered');
  }
  ngAfterViewInit() {
    /**
     * format default json
     */
    this.formattedJson = JSON.stringify(JSON.parse(this.rawJson), null, this.tabSpaceValue);
    this.updateRawJson(this.rawJson);
    this.updateFormattedJson(this.formattedJson);
  }
  rawJsonChange() {
    src_app_service_util_logger__WEBPACK_IMPORTED_MODULE_1__.LogUtils.info(`encoded token has changed with value: ${this.rawJsonDiv.nativeElement.innerText}`);
    this.formatJson(this.rawJsonDiv.nativeElement.innerText);
  }
  onJsonPaste(event) {
    event.preventDefault();
    const pastedData = (event.clipboardData || window.clipboardData).getData('text');
    this.updateRawJson(pastedData);
    this.formatJson(pastedData);
  }
  formatJson(rawJsonValue) {
    try {
      this.rawJson = rawJsonValue;
      this.formattedJson = JSON.stringify(JSON.parse(rawJsonValue), null, this.tabSpaceValue);
      this.isJsonValid = true;
      this.updateFormattedJson(this.formattedJson);
    } catch (error) {
      src_app_service_util_logger__WEBPACK_IMPORTED_MODULE_1__.LogUtils.error(`error occured while decoding token: ${this.rawJson}`);
      this.isJsonValid = false;
    }
  }
  updateRawJson(rawJson) {
    this.renderer.setProperty(this.rawJsonDiv.nativeElement, 'innerText', rawJson);
  }
  updateFormattedJson(formattedJson) {
    this.renderer.setProperty(this.formattedJsonDiv.nativeElement, 'innerHTML', `<pre>${formattedJson}</pre>`);
  }
  copyFormattedJson() {
    this.clipboard.copy(this.formattedJson);
  }
}
JsonFormatterComponent.ɵfac = function JsonFormatterComponent_Factory(t) {
  return new (t || JsonFormatterComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_6__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](src_app_service_common_config_service__WEBPACK_IMPORTED_MODULE_2__.ConfigService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](src_app_service_context_context_service__WEBPACK_IMPORTED_MODULE_3__.ContextService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_7__.Clipboard), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](src_app_service_icon_app_icon_service__WEBPACK_IMPORTED_MODULE_4__.AppIconService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_5__.Renderer2), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_8__.Title), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_8__.Meta), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_9__.DOCUMENT));
};
JsonFormatterComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({
  type: JsonFormatterComponent,
  selectors: [["app-json-formatter"]],
  viewQuery: function JsonFormatterComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵviewQuery"](_c0, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵviewQuery"](_c1, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵloadQuery"]()) && (ctx.rawJsonDiv = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵloadQuery"]()) && (ctx.formattedJsonDiv = _t.first);
    }
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵInheritDefinitionFeature"]],
  decls: 48,
  vars: 3,
  consts: [[1, "full-height", "flex-display", "flex-column-flow", "no-y-scroll"], [1, "header-div"], ["color", "primary"], ["mat-icon-button", "", "aria-label", "app icon button", "routerLink", "/tools", 3, "replaceUrl"], ["svgIcon", "app-icon", 1, "app-icon"], [1, "header-font", "flex-full-height"], ["mat-icon-button", "", "aria-label", "home icon button", "routerLink", "/tools", 3, "replaceUrl"], [1, "flex-display", "flex-column-flow", "flex-align-center"], [1, "header-font", "bold-text", "heading-font", 2, "margin", "20px"], [1, "flex-display", "flex-row-flow", "flex-center", "flex-align-center", "token-area-container", "full-width", 2, "margin-bottom", "10px"], [1, "flex-display", "flex-column-flow", "encoded-token-field", "token-parent-div"], [1, "flex-display", "flex-row-flow", "flex-align-center"], [1, "header-font", "div-label", 2, "margin-bottom", "5px", "margin-right", "5px"], ["contentEditable", "true", 1, "token-area-class", "encoded-token-field", "y-scroll", "full-height", "full-width", 2, "color", "indigo", 3, "input", "paste"], ["rawJsonDiv", ""], ["class", "flex-display flex-row-flow", "style", "margin-top: 10px", 4, "ngIf"], [1, "flex-display", "flex-column-flow", "token-parent-div"], [1, "header-font", "div-label", 2, "margin-bottom", "5px"], ["contenteditable", "true", 1, "token-area-class", "y-scroll", "full-height", "full-width", 2, "color", "deeppink"], ["formattedJsonDiv", ""], ["mat-raised-button", "", "color", "primary", 2, "margin-bottom", "10px", 3, "click"], [1, "flex-display", "flex-row-flow", "flex-center", 2, "margin-left", "10px", "margin-right", "10px"], [1, "bold-text", 2, "margin-right", "5px"], [1, "flex-display", "flex-row-flow", "flex-center", 2, "margin", "20px", "flex-wrap", "wrap"], [1, "tags-class"], [1, "flex-display", "flex-row-flow", 2, "margin-top", "10px"], ["color", "warn", 2, "transform", "scale(2)", "margin-right", "15px"], [1, "header-font", 2, "color", "red"]],
  template: function JsonFormatterComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "mat-toolbar", 2)(3, "button", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](4, "mat-icon", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](5, "span", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](6, "WebToolsEasy");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](7, "button", 6)(8, "mat-icon");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](9, "home");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](10, "div", 7)(11, "span", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](12, "Format JSON Online");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](13, "div", 9)(14, "div", 10)(15, "div", 11)(16, "span", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](17, "JSON String");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](18, "span");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](19, "(Paste JSON Here)");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](20, "div", 13, 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("input", function JsonFormatterComponent_Template_div_input_20_listener() {
        return ctx.rawJsonChange();
      })("paste", function JsonFormatterComponent_Template_div_paste_20_listener($event) {
        return ctx.onJsonPaste($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](22, "span");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](23, JsonFormatterComponent_div_23_Template, 5, 0, "div", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](24, "div", 16)(25, "span", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](26, "Formatted JSON");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](27, "div", 18, 19);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](29, "span");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](30, "button", 20);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function JsonFormatterComponent_Template_button_click_30_listener() {
        return ctx.copyFormattedJson();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](31, "mat-icon");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](32, "content_copy");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](33, " Copy Formatted JSON ");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](34, "div", 21)(35, "span", 22);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](36, "NOTE:");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](37, "span");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](38, " No server is involved. Json string formatting is being done in browser only");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](39, "div", 23)(40, "div", 24);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](41, "json");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](42, "div", 24);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](43, "json formatter");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](44, "div", 24);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](45, "json beautify");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](46, "div", 24);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](47, "programming");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("replaceUrl", true);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("replaceUrl", true);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](16);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", !ctx.isJsonValid);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_9__.NgIf, _angular_router__WEBPACK_IMPORTED_MODULE_6__.RouterLink, _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_10__.MatToolbar, _angular_material_icon__WEBPACK_IMPORTED_MODULE_11__.MatIcon, _angular_material_button__WEBPACK_IMPORTED_MODULE_12__.MatButton, _angular_material_button__WEBPACK_IMPORTED_MODULE_12__.MatIconButton],
  styles: ["@media screen and (max-width: 735px) {\n  .token-area-container[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n}\n@media screen and (min-width: 735px) {\n  .encoded-token-field[_ngcontent-%COMP%] {\n    margin-right: 30px;\n  }\n}\n@media screen and (max-width: 735px) {\n  .encoded-token-field[_ngcontent-%COMP%] {\n    margin-bottom: 20px;\n  }\n}\n.token-parent-div[_ngcontent-%COMP%] {\n  width: 40%;\n  height: 30em;\n}\n\n@media screen and (max-width: 735px) {\n  .token-parent-div[_ngcontent-%COMP%] {\n    height: 10em;\n    width: 80%;\n    font-size: larger;\n  }\n}\n.div-label[_ngcontent-%COMP%] {\n  font-size: x-large;\n}\n\n@media screen and (max-width: 735px) {\n  .div-label[_ngcontent-%COMP%] {\n    font-size: large;\n  }\n}\n.token-area-class[_ngcontent-%COMP%] {\n  border: 1px solid black;\n  border-radius: 10px;\n  padding: 10px;\n  overflow-wrap: break-word;\n}\n\n@media screen and (min-width: 735px) {\n  .token-area-class[_ngcontent-%COMP%] {\n    font-size: large;\n  }\n}\n@media screen and (max-width: 735px) {\n  .token-area-class[_ngcontent-%COMP%] {\n    font-size: larger;\n  }\n}\n/*# sourceURL=webpack://./src/app/components/json-formatter/json-formatter.component.scss */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29tcG9uZW50cy9qc29uLWZvcm1hdHRlci9qc29uLWZvcm1hdHRlci5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFO0lBQ0Usc0JBQUE7RUFDRjtBQUNGO0FBRUE7RUFDRTtJQUNFLGtCQUFBO0VBQUY7QUFDRjtBQUdBO0VBQ0U7SUFDRSxtQkFBQTtFQURGO0FBQ0Y7QUFJQTtFQUNFLFVBQUE7RUFDQSxZQUFBO0FBRkY7O0FBS0E7RUFDRTtJQUNFLFlBQUE7SUFDQSxVQUFBO0lBQ0EsaUJBQUE7RUFGRjtBQUNGO0FBS0E7RUFDRSxrQkFBQTtBQUhGOztBQU1BO0VBQ0U7SUFDRSxnQkFBQTtFQUhGO0FBQ0Y7QUFNQTtFQUNFLHVCQUFBO0VBQ0EsbUJBQUE7RUFDQSxhQUFBO0VBQ0EseUJBQUE7QUFKRjs7QUFPQTtFQUNFO0lBQ0UsZ0JBQUE7RUFKRjtBQUNGO0FBT0E7RUFDRTtJQUNFLGlCQUFBO0VBTEY7QUFDRiIsInNvdXJjZXNDb250ZW50IjpbIkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDczNXB4KSB7XG4gIC50b2tlbi1hcmVhLWNvbnRhaW5lciB7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgfVxufVxuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNzM1cHgpIHtcbiAgLmVuY29kZWQtdG9rZW4tZmllbGQge1xuICAgIG1hcmdpbi1yaWdodDogMzBweDtcbiAgfVxufVxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogNzM1cHgpIHtcbiAgLmVuY29kZWQtdG9rZW4tZmllbGQge1xuICAgIG1hcmdpbi1ib3R0b206IDIwcHg7XG4gIH1cbn1cbi50b2tlbi1wYXJlbnQtZGl2IHtcbiAgd2lkdGg6IDQwJTtcbiAgaGVpZ2h0OiAzMGVtO1xufVxuXG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA3MzVweCkge1xuICAudG9rZW4tcGFyZW50LWRpdiB7XG4gICAgaGVpZ2h0OiAxMGVtO1xuICAgIHdpZHRoOiA4MCU7XG4gICAgZm9udC1zaXplOiBsYXJnZXI7XG4gIH1cbn1cbi5kaXYtbGFiZWwge1xuICBmb250LXNpemU6IHgtbGFyZ2U7XG59XG5cbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDczNXB4KSB7XG4gIC5kaXYtbGFiZWwge1xuICAgIGZvbnQtc2l6ZTogbGFyZ2U7XG4gIH1cbn1cbi50b2tlbi1hcmVhLWNsYXNzIHtcbiAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gIHBhZGRpbmc6IDEwcHg7XG4gIG92ZXJmbG93LXdyYXA6IGJyZWFrLXdvcmQ7XG59XG5cbkBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDczNXB4KSB7XG4gIC50b2tlbi1hcmVhLWNsYXNzIHtcbiAgICBmb250LXNpemU6IGxhcmdlO1xuICB9XG59XG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA3MzVweCkge1xuICAudG9rZW4tYXJlYS1jbGFzcyB7XG4gICAgZm9udC1zaXplOiBsYXJnZXI7XG4gIH1cbn0iXSwic291cmNlUm9vdCI6IiJ9 */"]
});

/***/ }),

/***/ 60297:
/*!*************************************************!*\
  !*** ./src/app/components/jwt/jwt.component.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "JwtComponent": () => (/* binding */ JwtComponent)
/* harmony export */ });
/* harmony import */ var src_app_base_base_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/base/base.component */ 12178);
/* harmony import */ var src_app_service_util_logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/service/util/logger */ 62003);
/* harmony import */ var _auth0_angular_jwt__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @auth0/angular-jwt */ 16183);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common */ 97191);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 4009);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ 41444);
/* harmony import */ var src_app_service_common_config_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/service/common/config.service */ 56021);
/* harmony import */ var src_app_service_context_context_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/service/context/context.service */ 36903);
/* harmony import */ var _angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/cdk/clipboard */ 24654);
/* harmony import */ var src_app_service_icon_app_icon_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/service/icon/app-icon.service */ 90714);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/platform-browser */ 55806);
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/toolbar */ 86452);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/icon */ 95359);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/button */ 40510);















const _c0 = ["encodedDiv"];
const _c1 = ["decodedDiv"];
function JwtComponent_div_24_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 28)(1, "mat-icon", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](2, "error");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "span", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](4, "token is invalid");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
  }
}
class JwtComponent extends src_app_base_base_component__WEBPACK_IMPORTED_MODULE_0__.BaseComponent {
  constructor(router, configService, contextService, clipboard, appIconService, renderer, titleService, metaService, document) {
    super(router, configService, contextService, titleService, metaService, document);
    this.clipboard = clipboard;
    this.renderer = renderer;
    this.isTokenValid = true;
    this.tabSpaceValue = '  ';
    this.encodedToken = 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJTYW1wbGUgSXNzdWVyIiwiVXNlcm5hbWUiOiJ1c2VybmFtZUB3ZWJ0b29sc2Vhc3kuY29tIiwiZXhwIjoxNjY4OTQyNDIzLCJpYXQiOjE2Njg5NDI0MjN9.WuKjPKbgXqh_DkGd0aEBQr305Rn8EkMLvd0W7LRE-JM';
    this.decodedToken = '';
    this.contextService.setCurrentAppId('jwt');
    this.updatePageMetaData();
    this.tags = this.configService.getApplicationConfig(this.contextService.getCurrentAppId())?.tags;
    this.jwtDecoder = new _auth0_angular_jwt__WEBPACK_IMPORTED_MODULE_6__.JwtHelperService();
    this.decodedToken = JSON.stringify(this.jwtDecoder.decodeToken(this.encodedToken), null, this.tabSpaceValue);
  }
  ngOnInit() {
    src_app_service_util_logger__WEBPACK_IMPORTED_MODULE_1__.LogUtils.info('jwt component has rendered');
  }
  ngAfterViewInit() {
    this.updateEncodedToken(this.encodedToken);
    this.updateDecodedToken(this.decodedToken);
  }
  encodedInputChange(event) {
    src_app_service_util_logger__WEBPACK_IMPORTED_MODULE_1__.LogUtils.info(`encoded token has changed with value: ${this.encodedDiv.nativeElement.innerText}`);
    this.decodeUpdatedToken(this.encodedDiv.nativeElement.innerText);
  }
  onTokenPaste(event) {
    event.preventDefault();
    const pastedData = (event.clipboardData || window.clipboardData).getData('text');
    this.updateEncodedToken(pastedData);
    this.decodeUpdatedToken(pastedData);
  }
  decodeUpdatedToken(encodedTokenValue) {
    try {
      this.encodedToken = encodedTokenValue;
      const decodedTokenValue = this.jwtDecoder.decodeToken(encodedTokenValue);
      this.isTokenValid = true;
      this.decodedToken = JSON.stringify(decodedTokenValue, null, this.tabSpaceValue);
      this.updateDecodedToken(this.decodedToken);
    } catch (error) {
      src_app_service_util_logger__WEBPACK_IMPORTED_MODULE_1__.LogUtils.error(`error occured while decoding token: ${this.encodedToken}`);
      this.isTokenValid = false;
    }
  }
  updateEncodedToken(encodedToken) {
    this.renderer.setProperty(this.encodedDiv.nativeElement, 'innerText', encodedToken);
  }
  updateDecodedToken(decodedToken) {
    this.renderer.setProperty(this.decodedDiv.nativeElement, 'innerHTML', `<pre>${decodedToken}</pre>`);
  }
  copyDecodedToken() {
    this.clipboard.copy(this.decodedToken);
  }
}
JwtComponent.ɵfac = function JwtComponent_Factory(t) {
  return new (t || JwtComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_7__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](src_app_service_common_config_service__WEBPACK_IMPORTED_MODULE_2__.ConfigService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](src_app_service_context_context_service__WEBPACK_IMPORTED_MODULE_3__.ContextService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_8__.Clipboard), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](src_app_service_icon_app_icon_service__WEBPACK_IMPORTED_MODULE_4__.AppIconService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_5__.Renderer2), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_9__.Title), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_9__.Meta), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_10__.DOCUMENT));
};
JwtComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({
  type: JwtComponent,
  selectors: [["app-jwt"]],
  viewQuery: function JwtComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵviewQuery"](_c0, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵviewQuery"](_c1, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵloadQuery"]()) && (ctx.encodedDiv = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵloadQuery"]()) && (ctx.decodedDiv = _t.first);
    }
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵInheritDefinitionFeature"]],
  decls: 57,
  vars: 3,
  consts: [[1, "full-height", "flex-display", "flex-column-flow", "no-y-scroll"], [1, "header-div"], ["color", "primary"], ["mat-icon-button", "", "aria-label", "app icon button", "routerLink", "/tools", 3, "replaceUrl"], ["svgIcon", "app-icon", 1, "app-icon"], [1, "header-font", "flex-full-height"], ["mat-icon-button", "", "aria-label", "home icon button", "routerLink", "/tools", 3, "replaceUrl"], [1, "flex-display", "flex-column-flow", "flex-align-center"], [1, "header-font", "bold-text", "heading-font", 2, "margin", "20px"], [1, "flex-display", "flex-row-flow", "flex-center", "flex-align-center", "token-area-container", "full-width", 2, "margin-bottom", "10px"], [1, "flex-display", "flex-column-flow", "encoded-token-field", "token-parent-div"], [1, "flex-display", "flex-row-flow", "flex-align-center"], [1, "header-font", "div-label", 2, "margin-bottom", "5px", "margin-right", "5px"], ["contentEditable", "true", 1, "token-area-class", "encoded-token-field", "y-scroll", "full-height", "full-width", 2, "color", "indigo", 3, "input", "paste"], ["encodedDiv", ""], ["encodedValue", ""], ["class", "flex-display flex-row-flow", "style", "margin-top: 10px", 4, "ngIf"], [1, "flex-display", "flex-column-flow", "token-parent-div"], [1, "header-font", "div-label", 2, "margin-bottom", "5px"], ["contenteditable", "true", 1, "token-area-class", "y-scroll", "full-height", "full-width", 2, "color", "deeppink"], ["decodedDiv", ""], ["decodedValue", ""], ["mat-raised-button", "", "color", "primary", 2, "margin-bottom", "10px", 3, "click"], [1, "flex-display", "flex-row-flow", "flex-center", 2, "margin-left", "10px", "margin-right", "10px"], [1, "bold-text", 2, "margin-right", "5px"], [1, "flex-display", "flex-column-flow"], [1, "flex-display", "flex-row-flow", "flex-center", 2, "margin", "20px", "flex-wrap", "wrap"], [1, "tags-class"], [1, "flex-display", "flex-row-flow", 2, "margin-top", "10px"], ["color", "warn", 2, "transform", "scale(2)", "margin-right", "15px"], [1, "header-font", 2, "color", "red"]],
  template: function JwtComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "mat-toolbar", 2)(3, "button", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](4, "mat-icon", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](5, "span", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](6, "WebToolsEasy");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](7, "button", 6)(8, "mat-icon");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](9, "home");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](10, "div", 7)(11, "span", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](12, "Decode JWT Online");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](13, "div", 9)(14, "div", 10)(15, "div", 11)(16, "span", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](17, "Encoded Token");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](18, "span");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](19, "(Paste Token Here)");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](20, "div", 13, 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("input", function JwtComponent_Template_div_input_20_listener($event) {
        return ctx.encodedInputChange($event);
      })("paste", function JwtComponent_Template_div_paste_20_listener($event) {
        return ctx.onTokenPaste($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](22, "span", null, 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](24, JwtComponent_div_24_Template, 5, 0, "div", 16);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](25, "div", 17)(26, "span", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](27, "Decoded Token");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](28, "div", 19, 20);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](30, "span", null, 21);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](32, "button", 22);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function JwtComponent_Template_button_click_32_listener() {
        return ctx.copyDecodedToken();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](33, "mat-icon");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](34, "content_copy");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](35, " Copy Decoded Token ");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](36, "div", 23)(37, "span", 24);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](38, "NOTE:");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](39, "div", 25)(40, "span");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](41, " 1. Token is being decoded using HS256 Algorithm.");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](42, "span");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](43, " 2. Token is being decoded in browser only. No server is involved.");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](44, "div", 26)(45, "div", 27);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](46, "jwt");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](47, "div", 27);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](48, "json web token");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](49, "div", 27);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](50, "jwt token");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](51, "div", 27);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](52, "jwt decoder");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](53, "div", 27);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](54, "hs256 decode");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](55, "div", 27);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](56, "programming");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("replaceUrl", true);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("replaceUrl", true);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](17);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", !ctx.isTokenValid);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_10__.NgIf, _angular_router__WEBPACK_IMPORTED_MODULE_7__.RouterLink, _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_11__.MatToolbar, _angular_material_icon__WEBPACK_IMPORTED_MODULE_12__.MatIcon, _angular_material_button__WEBPACK_IMPORTED_MODULE_13__.MatButton, _angular_material_button__WEBPACK_IMPORTED_MODULE_13__.MatIconButton],
  styles: ["@media screen and (max-width: 735px) {\n  .token-area-container[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n}\n@media screen and (min-width: 735px) {\n  .encoded-token-field[_ngcontent-%COMP%] {\n    margin-right: 30px;\n  }\n}\n@media screen and (max-width: 735px) {\n  .encoded-token-field[_ngcontent-%COMP%] {\n    margin-bottom: 20px;\n  }\n}\n.token-parent-div[_ngcontent-%COMP%] {\n  width: 40%;\n  height: 30em;\n}\n\n@media screen and (max-width: 735px) {\n  .token-parent-div[_ngcontent-%COMP%] {\n    height: 10em;\n    width: 80%;\n    font-size: larger;\n  }\n}\n.div-label[_ngcontent-%COMP%] {\n  font-size: x-large;\n}\n\n@media screen and (max-width: 735px) {\n  .div-label[_ngcontent-%COMP%] {\n    font-size: large;\n  }\n}\n.token-area-class[_ngcontent-%COMP%] {\n  border: 1px solid black;\n  border-radius: 10px;\n  padding: 10px;\n  overflow-wrap: break-word;\n}\n\n@media screen and (min-width: 735px) {\n  .token-area-class[_ngcontent-%COMP%] {\n    font-size: large;\n  }\n}\n@media screen and (max-width: 735px) {\n  .token-area-class[_ngcontent-%COMP%] {\n    font-size: larger;\n  }\n}\n/*# sourceURL=webpack://./src/app/components/jwt/jwt.component.scss */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29tcG9uZW50cy9qd3Qvand0LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0U7SUFDRSxzQkFBQTtFQUNGO0FBQ0Y7QUFFQTtFQUNFO0lBQ0Usa0JBQUE7RUFBRjtBQUNGO0FBR0E7RUFDRTtJQUNFLG1CQUFBO0VBREY7QUFDRjtBQUlBO0VBQ0UsVUFBQTtFQUNBLFlBQUE7QUFGRjs7QUFLQTtFQUNFO0lBQ0UsWUFBQTtJQUNBLFVBQUE7SUFDQSxpQkFBQTtFQUZGO0FBQ0Y7QUFLQTtFQUNFLGtCQUFBO0FBSEY7O0FBTUE7RUFDRTtJQUNFLGdCQUFBO0VBSEY7QUFDRjtBQU1BO0VBQ0UsdUJBQUE7RUFDQSxtQkFBQTtFQUNBLGFBQUE7RUFDQSx5QkFBQTtBQUpGOztBQU9BO0VBQ0U7SUFDRSxnQkFBQTtFQUpGO0FBQ0Y7QUFPQTtFQUNFO0lBQ0UsaUJBQUE7RUFMRjtBQUNGIiwic291cmNlc0NvbnRlbnQiOlsiQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogNzM1cHgpIHtcbiAgLnRva2VuLWFyZWEtY29udGFpbmVyIHtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICB9XG59XG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA3MzVweCkge1xuICAuZW5jb2RlZC10b2tlbi1maWVsZCB7XG4gICAgbWFyZ2luLXJpZ2h0OiAzMHB4O1xuICB9XG59XG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA3MzVweCkge1xuICAuZW5jb2RlZC10b2tlbi1maWVsZCB7XG4gICAgbWFyZ2luLWJvdHRvbTogMjBweDtcbiAgfVxufVxuLnRva2VuLXBhcmVudC1kaXYge1xuICB3aWR0aDogNDAlO1xuICBoZWlnaHQ6IDMwZW07XG59XG5cbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDczNXB4KSB7XG4gIC50b2tlbi1wYXJlbnQtZGl2IHtcbiAgICBoZWlnaHQ6IDEwZW07XG4gICAgd2lkdGg6IDgwJTtcbiAgICBmb250LXNpemU6IGxhcmdlcjtcbiAgfVxufVxuLmRpdi1sYWJlbCB7XG4gIGZvbnQtc2l6ZTogeC1sYXJnZTtcbn1cblxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogNzM1cHgpIHtcbiAgLmRpdi1sYWJlbCB7XG4gICAgZm9udC1zaXplOiBsYXJnZTtcbiAgfVxufVxuLnRva2VuLWFyZWEtY2xhc3Mge1xuICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgcGFkZGluZzogMTBweDtcbiAgb3ZlcmZsb3ctd3JhcDogYnJlYWstd29yZDtcbn1cblxuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNzM1cHgpIHtcbiAgLnRva2VuLWFyZWEtY2xhc3Mge1xuICAgIGZvbnQtc2l6ZTogbGFyZ2U7XG4gIH1cbn1cbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDczNXB4KSB7XG4gIC50b2tlbi1hcmVhLWNsYXNzIHtcbiAgICBmb250LXNpemU6IGxhcmdlcjtcbiAgfVxufSJdLCJzb3VyY2VSb290IjoiIn0= */"]
});

/***/ }),

/***/ 7938:
/*!***************************************************!*\
  !*** ./src/app/components/uuid/uuid.component.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UuidComponent": () => (/* binding */ UuidComponent)
/* harmony export */ });
/* harmony import */ var src_app_base_base_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/base/base.component */ 12178);
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! uuid */ 64890);
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! uuid */ 55071);
/* harmony import */ var src_app_service_util_logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/service/util/logger */ 62003);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/common */ 97191);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 4009);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ 41444);
/* harmony import */ var src_app_service_common_config_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/service/common/config.service */ 56021);
/* harmony import */ var src_app_service_context_context_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/service/context/context.service */ 36903);
/* harmony import */ var _angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/cdk/clipboard */ 24654);
/* harmony import */ var src_app_service_icon_app_icon_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/service/icon/app-icon.service */ 90714);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/platform-browser */ 55806);
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/toolbar */ 86452);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/icon */ 95359);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/button */ 40510);
/* harmony import */ var _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/button-toggle */ 87915);















class UuidComponent extends src_app_base_base_component__WEBPACK_IMPORTED_MODULE_0__.BaseComponent {
  constructor(router, configService, contextService, clipboard, appIconService, titleService, metaService, document) {
    super(router, configService, contextService, titleService, metaService, document);
    this.clipboard = clipboard;
    this.currentUUID = (0,uuid__WEBPACK_IMPORTED_MODULE_5__["default"])();
    this.selectedVersion = 'V4';
    this.displayData = new Map();
    this.contextService.setCurrentAppId('uuid');
    this.updatePageMetaData();
    this.tags = this.configService.getApplicationConfig(this.contextService.getCurrentAppId())?.tags;
    this.displayData.set('V1', {
      description: 'Version-1 UUIDs are generated from a time and a node ID (usually the MAC address).'
    });
    this.displayData.set('V4', {
      description: 'Version-4 UUIDs are generated using a random or pseudo-random number.'
    });
    this.description = this.displayData.get('V4').description;
  }
  ngOnInit() {
    src_app_service_util_logger__WEBPACK_IMPORTED_MODULE_1__.LogUtils.info('uuid component has been rendered');
  }
  changeVersion(selectedVersion) {
    this.selectedVersion = selectedVersion;
    this.description = this.displayData.get(selectedVersion).description;
  }
  generateUUID() {
    switch (this.selectedVersion) {
      case 'V1':
        this.currentUUID = (0,uuid__WEBPACK_IMPORTED_MODULE_6__["default"])();
        break;
      case 'V4':
        this.currentUUID = (0,uuid__WEBPACK_IMPORTED_MODULE_5__["default"])();
        break;
      default:
        this.currentUUID = (0,uuid__WEBPACK_IMPORTED_MODULE_5__["default"])();
    }
  }
  copyGeneratedId() {
    this.clipboard.copy(this.currentUUID);
  }
}
UuidComponent.ɵfac = function UuidComponent_Factory(t) {
  return new (t || UuidComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_8__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](src_app_service_common_config_service__WEBPACK_IMPORTED_MODULE_2__.ConfigService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](src_app_service_context_context_service__WEBPACK_IMPORTED_MODULE_3__.ContextService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_9__.Clipboard), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](src_app_service_icon_app_icon_service__WEBPACK_IMPORTED_MODULE_4__.AppIconService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_10__.Title), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_10__.Meta), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_11__.DOCUMENT));
};
UuidComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineComponent"]({
  type: UuidComponent,
  selectors: [["app-uuid"]],
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵInheritDefinitionFeature"]],
  decls: 54,
  vars: 5,
  consts: [[1, "full-height", "flex-display", "flex-column-flow", "no-y-scroll"], [1, "header-div"], ["color", "primary"], ["mat-icon-button", "", "aria-label", "app icon button", "routerLink", "/tools", 3, "replaceUrl"], ["svgIcon", "app-icon", 1, "app-icon"], [1, "header-font", "flex-full-height"], ["mat-icon-button", "", "aria-label", "home icon button", "routerLink", "/tools", 3, "replaceUrl"], [1, "flex-display", "flex-column-flow", "flex-align-center"], [1, "header-font", "bold-text", "uuid-font", 2, "margin", "20px"], [1, "flex-display", "flex-row-flow", "flex-center", "flex-align-center", "uid-div", 2, "margin-bottom", "20px"], [1, "uuid-container", "flex-display", "flex-column-flow", "flex-center", "flex-align-center"], [1, "uuid-font", 2, "color", "#ff4081"], ["mat-raised-button", "", "color", "primary", 3, "click"], ["mat-raised-button", "", "color", "primary", 2, "margin-bottom", "20px", 3, "click"], ["name", "uuidVersion", "aria-label", "UUID Version", "value", "V4", 2, "margin-bottom", "20px", 3, "click"], ["group", "matButtonToggleGroup"], ["value", "V1"], [1, "bold-text"], ["value", "V4"], [1, "bold-text", "header-font", 2, "margin-bottom", "10px", "font-size", "large"], [2, "padding-left", "10px"], [1, "flex-display", "flex-row-flow", "flex-center", 2, "margin-left", "10px", "margin-right", "10px"], [1, "bold-text", 2, "margin-right", "5px"], [1, "flex-display", "flex-row-flow", "flex-center", 2, "margin", "20px", "flex-wrap", "wrap"], [1, "tags-class"]],
  template: function UuidComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "mat-toolbar", 2)(3, "button", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](4, "mat-icon", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](5, "span", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](6, "WebToolsEasy");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](7, "button", 6)(8, "mat-icon");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](9, "home");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](10, "div", 7)(11, "span", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](12, "Generate UUID Online");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](13, "div", 9)(14, "div", 10)(15, "span", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](16);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](17, "button", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function UuidComponent_Template_button_click_17_listener() {
        return ctx.copyGeneratedId();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](18, "mat-icon");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](19, "content_copy");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](20, " Copy ");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](21, "div", 7)(22, "button", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function UuidComponent_Template_button_click_22_listener() {
        return ctx.generateUUID();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](23, "mat-icon");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](24, "repeat");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](25, " Generate Again ");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](26, "mat-button-toggle-group", 14, 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function UuidComponent_Template_mat_button_toggle_group_click_26_listener() {
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r1);
        const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵreference"](27);
        return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx.changeVersion(_r0.value));
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](28, "mat-button-toggle", 16)(29, "span", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](30, "version 1");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](31, "mat-button-toggle", 18)(32, "span", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](33, "version 4");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](34, "span", 19);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](35);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](36, "span", 20);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](37);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](38, "div", 21)(39, "span", 22);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](40, "NOTE:");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](41, "span");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](42, " UUID generation is being done in browser only. No server is involved.");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](43, "div", 23)(44, "div", 24);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](45, "uuid");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](46, "div", 24);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](47, "unique identifier");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](48, "div", 24);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](49, "id generator");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](50, "div", 24);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](51, "uuid generator");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](52, "div", 24);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](53, "programming");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("replaceUrl", true);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("replaceUrl", true);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](9);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](ctx.currentUUID);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](19);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"]("What is UUID ", ctx.selectedVersion, "?");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](ctx.description);
    }
  },
  dependencies: [_angular_router__WEBPACK_IMPORTED_MODULE_8__.RouterLink, _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_12__.MatToolbar, _angular_material_icon__WEBPACK_IMPORTED_MODULE_13__.MatIcon, _angular_material_button__WEBPACK_IMPORTED_MODULE_14__.MatButton, _angular_material_button__WEBPACK_IMPORTED_MODULE_14__.MatIconButton, _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_15__.MatButtonToggleGroup, _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_15__.MatButtonToggle],
  styles: [".uuid-container[_ngcontent-%COMP%] {\n  padding: 10px;\n  border-radius: 10px;\n}\n\n@media screen and (min-width: 735px) {\n  .uuid-container[_ngcontent-%COMP%] {\n    margin-right: 10px;\n  }\n}\n@media screen and (max-width: 735px) {\n  .uuid-container[_ngcontent-%COMP%] {\n    margin-bottom: 10px;\n  }\n}\n.uuid-font[_ngcontent-%COMP%] {\n  font-size: xx-large;\n}\n\n@media screen and (max-width: 735px) {\n  .uuid-font[_ngcontent-%COMP%] {\n    font-size: large;\n  }\n}\n@media screen and (max-width: 735px) {\n  .uid-div[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n}\n/*# sourceURL=webpack://./src/app/components/uuid/uuid.component.scss */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29tcG9uZW50cy91dWlkL3V1aWQuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFFRSxhQUFBO0VBQ0EsbUJBQUE7QUFBRjs7QUFHQTtFQUNFO0lBQ0Usa0JBQUE7RUFBRjtBQUNGO0FBR0E7RUFDSTtJQUNFLG1CQUFBO0VBREo7QUFDRjtBQUlBO0VBQ0UsbUJBQUE7QUFGRjs7QUFLQTtFQUNFO0lBQ0UsZ0JBQUE7RUFGRjtBQUNGO0FBS0E7RUFDRTtJQUNFLHNCQUFBO0VBSEY7QUFDRiIsInNvdXJjZXNDb250ZW50IjpbIi51dWlkLWNvbnRhaW5lciB7XG4gIHBhZGRpbmc6IDEwcHg7XG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XG59XG5cbkBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDczNXB4KSB7XG4gIC51dWlkLWNvbnRhaW5lciB7XG4gICAgbWFyZ2luLXJpZ2h0OiAxMHB4O1xuICB9XG59XG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA3MzVweCkge1xuICAudXVpZC1jb250YWluZXIge1xuICAgIG1hcmdpbi1ib3R0b206IDEwcHg7XG4gIH1cbn1cbi51dWlkLWZvbnQge1xuICBmb250LXNpemU6IHh4LWxhcmdlO1xufVxuXG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA3MzVweCkge1xuICAudXVpZC1mb250IHtcbiAgICBmb250LXNpemU6IGxhcmdlO1xuICB9XG59XG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA3MzVweCkge1xuICAudWlkLWRpdiB7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgfVxufSJdLCJzb3VyY2VSb290IjoiIn0= */"]
});

/***/ }),

/***/ 55982:
/*!***********************************************************************!*\
  !*** ./src/app/modules/app-directory/app-directory-routing.module.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppDirectoryRoutingModule": () => (/* binding */ AppDirectoryRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 41444);
/* harmony import */ var src_app_components_app_directory_app_directory_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/components/app-directory/app-directory.component */ 772);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 4009);




const routes = [{
  path: '',
  component: src_app_components_app_directory_app_directory_component__WEBPACK_IMPORTED_MODULE_0__.AppDirectoryComponent
}];
class AppDirectoryRoutingModule {}
AppDirectoryRoutingModule.ɵfac = function AppDirectoryRoutingModule_Factory(t) {
  return new (t || AppDirectoryRoutingModule)();
};
AppDirectoryRoutingModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
  type: AppDirectoryRoutingModule
});
AppDirectoryRoutingModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](AppDirectoryRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
})();

/***/ }),

/***/ 58769:
/*!***************************************************************!*\
  !*** ./src/app/modules/app-directory/app-directory.module.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppDirectoryModule": () => (/* binding */ AppDirectoryModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 97191);
/* harmony import */ var _app_directory_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app-directory-routing.module */ 55982);
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/toolbar */ 86452);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/icon */ 95359);
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/card */ 20981);
/* harmony import */ var src_app_components_app_directory_app_directory_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/components/app-directory/app-directory.component */ 772);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 4009);







class AppDirectoryModule {}
AppDirectoryModule.ɵfac = function AppDirectoryModule_Factory(t) {
  return new (t || AppDirectoryModule)();
};
AppDirectoryModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
  type: AppDirectoryModule
});
AppDirectoryModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _app_directory_routing_module__WEBPACK_IMPORTED_MODULE_0__.AppDirectoryRoutingModule, _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_4__.MatToolbarModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__.MatIconModule, _angular_material_card__WEBPACK_IMPORTED_MODULE_6__.MatCardModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](AppDirectoryModule, {
    declarations: [src_app_components_app_directory_app_directory_component__WEBPACK_IMPORTED_MODULE_1__.AppDirectoryComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _app_directory_routing_module__WEBPACK_IMPORTED_MODULE_0__.AppDirectoryRoutingModule, _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_4__.MatToolbarModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__.MatIconModule, _angular_material_card__WEBPACK_IMPORTED_MODULE_6__.MatCardModule]
  });
})();

/***/ }),

/***/ 78370:
/*!*******************************************************************************!*\
  !*** ./src/app/modules/image-compression/image-compression-routing.module.ts ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ImageCompressionRoutingModule": () => (/* binding */ ImageCompressionRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 41444);
/* harmony import */ var src_app_components_image_compression_image_compression_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/components/image-compression/image-compression.component */ 72099);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 4009);




const routes = [{
  path: '',
  component: src_app_components_image_compression_image_compression_component__WEBPACK_IMPORTED_MODULE_0__.ImageCompressionComponent
}];
class ImageCompressionRoutingModule {}
ImageCompressionRoutingModule.ɵfac = function ImageCompressionRoutingModule_Factory(t) {
  return new (t || ImageCompressionRoutingModule)();
};
ImageCompressionRoutingModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
  type: ImageCompressionRoutingModule
});
ImageCompressionRoutingModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](ImageCompressionRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
})();

/***/ }),

/***/ 96886:
/*!***********************************************************************!*\
  !*** ./src/app/modules/image-compression/image-compression.module.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ImageCompressionModule": () => (/* binding */ ImageCompressionModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 97191);
/* harmony import */ var _image_compression_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./image-compression-routing.module */ 78370);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/button */ 40510);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/icon */ 95359);
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/toolbar */ 86452);
/* harmony import */ var src_app_components_image_compression_image_compression_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/components/image-compression/image-compression.component */ 72099);
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/card */ 20981);
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/tooltip */ 49115);
/* harmony import */ var _angular_cdk_layout__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/cdk/layout */ 71368);
/* harmony import */ var _angular_material_slider__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/slider */ 5818);
/* harmony import */ var src_app_components_compress_settings_compress_settings_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/components/compress-settings/compress-settings.component */ 74917);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/dialog */ 92889);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 4009);













class ImageCompressionModule {}
ImageCompressionModule.ɵfac = function ImageCompressionModule_Factory(t) {
  return new (t || ImageCompressionModule)();
};
ImageCompressionModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({
  type: ImageCompressionModule
});
ImageCompressionModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule, _image_compression_routing_module__WEBPACK_IMPORTED_MODULE_0__.ImageCompressionRoutingModule, _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_5__.MatToolbarModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_6__.MatIconModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_7__.MatButtonModule, _angular_material_card__WEBPACK_IMPORTED_MODULE_8__.MatCardModule, _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_9__.MatTooltipModule, _angular_cdk_layout__WEBPACK_IMPORTED_MODULE_10__.LayoutModule, _angular_material_slider__WEBPACK_IMPORTED_MODULE_11__.MatSliderModule, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_12__.MatDialogModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](ImageCompressionModule, {
    declarations: [src_app_components_image_compression_image_compression_component__WEBPACK_IMPORTED_MODULE_1__.ImageCompressionComponent, src_app_components_compress_settings_compress_settings_component__WEBPACK_IMPORTED_MODULE_2__.CompressSettingsComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule, _image_compression_routing_module__WEBPACK_IMPORTED_MODULE_0__.ImageCompressionRoutingModule, _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_5__.MatToolbarModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_6__.MatIconModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_7__.MatButtonModule, _angular_material_card__WEBPACK_IMPORTED_MODULE_8__.MatCardModule, _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_9__.MatTooltipModule, _angular_cdk_layout__WEBPACK_IMPORTED_MODULE_10__.LayoutModule, _angular_material_slider__WEBPACK_IMPORTED_MODULE_11__.MatSliderModule, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_12__.MatDialogModule]
  });
})();

/***/ }),

/***/ 57952:
/*!*************************************************************************!*\
  !*** ./src/app/modules/json-formatter/json-formatter-routing.module.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "JsonFormatterRoutingModule": () => (/* binding */ JsonFormatterRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 41444);
/* harmony import */ var src_app_components_json_formatter_json_formatter_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/components/json-formatter/json-formatter.component */ 16406);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 4009);




const routes = [{
  path: '',
  component: src_app_components_json_formatter_json_formatter_component__WEBPACK_IMPORTED_MODULE_0__.JsonFormatterComponent
}];
class JsonFormatterRoutingModule {}
JsonFormatterRoutingModule.ɵfac = function JsonFormatterRoutingModule_Factory(t) {
  return new (t || JsonFormatterRoutingModule)();
};
JsonFormatterRoutingModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
  type: JsonFormatterRoutingModule
});
JsonFormatterRoutingModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](JsonFormatterRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
})();

/***/ }),

/***/ 6467:
/*!*****************************************************************!*\
  !*** ./src/app/modules/json-formatter/json-formatter.module.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "JsonFormatterModule": () => (/* binding */ JsonFormatterModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 97191);
/* harmony import */ var _json_formatter_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./json-formatter-routing.module */ 57952);
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/toolbar */ 86452);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/icon */ 95359);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/button */ 40510);
/* harmony import */ var _angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/cdk/clipboard */ 24654);
/* harmony import */ var src_app_components_json_formatter_json_formatter_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/components/json-formatter/json-formatter.component */ 16406);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 4009);








class JsonFormatterModule {}
JsonFormatterModule.ɵfac = function JsonFormatterModule_Factory(t) {
  return new (t || JsonFormatterModule)();
};
JsonFormatterModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
  type: JsonFormatterModule
});
JsonFormatterModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _json_formatter_routing_module__WEBPACK_IMPORTED_MODULE_0__.JsonFormatterRoutingModule, _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_4__.MatToolbarModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__.MatIconModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_6__.MatButtonModule, _angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_7__.ClipboardModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](JsonFormatterModule, {
    declarations: [src_app_components_json_formatter_json_formatter_component__WEBPACK_IMPORTED_MODULE_1__.JsonFormatterComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _json_formatter_routing_module__WEBPACK_IMPORTED_MODULE_0__.JsonFormatterRoutingModule, _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_4__.MatToolbarModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__.MatIconModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_6__.MatButtonModule, _angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_7__.ClipboardModule]
  });
})();

/***/ }),

/***/ 95154:
/*!***************************************************!*\
  !*** ./src/app/modules/jwt/jwt-routing.module.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "JwtRoutingModule": () => (/* binding */ JwtRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 41444);
/* harmony import */ var src_app_components_jwt_jwt_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/components/jwt/jwt.component */ 60297);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 4009);




const routes = [{
  path: '',
  component: src_app_components_jwt_jwt_component__WEBPACK_IMPORTED_MODULE_0__.JwtComponent
}];
class JwtRoutingModule {}
JwtRoutingModule.ɵfac = function JwtRoutingModule_Factory(t) {
  return new (t || JwtRoutingModule)();
};
JwtRoutingModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
  type: JwtRoutingModule
});
JwtRoutingModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](JwtRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
})();

/***/ }),

/***/ 84689:
/*!*******************************************!*\
  !*** ./src/app/modules/jwt/jwt.module.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "JwtModule": () => (/* binding */ JwtModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 97191);
/* harmony import */ var _jwt_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./jwt-routing.module */ 95154);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/button */ 40510);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/icon */ 95359);
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/toolbar */ 86452);
/* harmony import */ var _angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/cdk/clipboard */ 24654);
/* harmony import */ var src_app_components_jwt_jwt_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/components/jwt/jwt.component */ 60297);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 4009);








class JwtModule {}
JwtModule.ɵfac = function JwtModule_Factory(t) {
  return new (t || JwtModule)();
};
JwtModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
  type: JwtModule
});
JwtModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _jwt_routing_module__WEBPACK_IMPORTED_MODULE_0__.JwtRoutingModule, _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_4__.MatToolbarModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__.MatIconModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_6__.MatButtonModule, _angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_7__.ClipboardModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](JwtModule, {
    declarations: [src_app_components_jwt_jwt_component__WEBPACK_IMPORTED_MODULE_1__.JwtComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _jwt_routing_module__WEBPACK_IMPORTED_MODULE_0__.JwtRoutingModule, _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_4__.MatToolbarModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__.MatIconModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_6__.MatButtonModule, _angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_7__.ClipboardModule]
  });
})();

/***/ }),

/***/ 68737:
/*!*****************************************************!*\
  !*** ./src/app/modules/uuid/uuid-routing.module.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UuidRoutingModule": () => (/* binding */ UuidRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 41444);
/* harmony import */ var src_app_components_uuid_uuid_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/components/uuid/uuid.component */ 7938);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 4009);




const routes = [{
  path: '',
  component: src_app_components_uuid_uuid_component__WEBPACK_IMPORTED_MODULE_0__.UuidComponent
}];
class UuidRoutingModule {}
UuidRoutingModule.ɵfac = function UuidRoutingModule_Factory(t) {
  return new (t || UuidRoutingModule)();
};
UuidRoutingModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
  type: UuidRoutingModule
});
UuidRoutingModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](UuidRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
})();

/***/ }),

/***/ 51535:
/*!*********************************************!*\
  !*** ./src/app/modules/uuid/uuid.module.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UuidModule": () => (/* binding */ UuidModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 97191);
/* harmony import */ var _uuid_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./uuid-routing.module */ 68737);
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/toolbar */ 86452);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/icon */ 95359);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/button */ 40510);
/* harmony import */ var _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/button-toggle */ 87915);
/* harmony import */ var _angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/cdk/clipboard */ 24654);
/* harmony import */ var src_app_components_uuid_uuid_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/components/uuid/uuid.component */ 7938);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 4009);









class UuidModule {}
UuidModule.ɵfac = function UuidModule_Factory(t) {
  return new (t || UuidModule)();
};
UuidModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
  type: UuidModule
});
UuidModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _uuid_routing_module__WEBPACK_IMPORTED_MODULE_0__.UuidRoutingModule, _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_4__.MatToolbarModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__.MatIconModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_6__.MatButtonModule, _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_7__.MatButtonToggleModule, _angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_8__.ClipboardModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](UuidModule, {
    declarations: [src_app_components_uuid_uuid_component__WEBPACK_IMPORTED_MODULE_1__.UuidComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _uuid_routing_module__WEBPACK_IMPORTED_MODULE_0__.UuidRoutingModule, _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_4__.MatToolbarModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__.MatIconModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_6__.MatButtonModule, _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_7__.MatButtonToggleModule, _angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_8__.ClipboardModule]
  });
})();

/***/ }),

/***/ 56021:
/*!**************************************************!*\
  !*** ./src/app/service/common/config.service.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ConfigService": () => (/* binding */ ConfigService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 4009);

class ConfigService {
  constructor() {
    this.applicationConfig = new Map();
    this.applicationConfig.set('home', {
      navigationUrl: '',
      pageTitle: 'Online Web Tools | Web Tools Easy',
      metaTags: [{
        name: 'description',
        content: 'Home page of WebToolsEasy'
      }, {
        name: 'keywords',
        content: 'Web Tools Online, JWT, UUID, JSON, Image Compression'
      }, {
        name: 'author',
        content: 'Gaurav Kumar Yadav'
      }, {
        name: 'robots',
        content: 'index, follow'
      }],
      tags: []
    });
    this.applicationConfig.set('tools', {
      navigationUrl: '/tools',
      pageTitle: 'Tools Home | Web Tools Easy',
      metaTags: [{
        name: 'description',
        content: 'Tools directory of WebToolsEasy | UUID Generator | JWT Decoder | JSON Formatter | Image Compressor'
      }, {
        name: 'keywords',
        content: 'JWT, UUID, WebToolsEasy'
      }, {
        name: 'author',
        content: 'Gaurav Kumar Yadav'
      }, {
        name: 'robots',
        content: 'index, follow'
      }],
      tags: []
    });
    this.applicationConfig.set('uuid', {
      navigationUrl: '/tools/uuid',
      pageTitle: 'UUID Generator | Web Tools Easy',
      metaTags: [{
        name: 'description',
        content: 'Online UUID Generator'
      }, {
        name: 'keywords',
        content: 'UUID Generator, Generate UUID Online, UUID'
      }, {
        name: 'author',
        content: 'Gaurav Kumar Yadav'
      }, {
        name: 'robots',
        content: 'index, follow'
      }],
      tags: ['uuid', 'unique identifier', 'id generator', 'uuid generator', 'programming']
    });
    this.applicationConfig.set('jwt', {
      navigationUrl: '/tools/jwt',
      pageTitle: 'JWT Decoder | Web Tools Easy',
      metaTags: [{
        name: 'description',
        content: 'Online JWT Decoder'
      }, {
        name: 'keywords',
        content: 'JWT Decoder, Decode JWT Online, JSON Web Token'
      }, {
        name: 'author',
        content: 'Gaurav Kumar Yadav'
      }, {
        name: 'robots',
        content: 'index, follow'
      }],
      tags: ['jwt', 'json web token', 'jwt token', 'jwt decoder', 'hs256 decode', 'programming']
    });
    this.applicationConfig.set('jsonformatter', {
      navigationUrl: '/tools/json-formatter',
      pageTitle: 'JSON Formatter | Web Tools Easy',
      metaTags: [{
        name: 'description',
        content: 'Online JSON Formatter'
      }, {
        name: 'keywords',
        content: 'JSON Formatter, Format JSON Online, JSON'
      }, {
        name: 'author',
        content: 'Gaurav Kumar Yadav'
      }, {
        name: 'robots',
        content: 'index, follow'
      }],
      tags: ['json', 'json formatter', 'json beautify', 'programming']
    });
    this.applicationConfig.set('imagecompress', {
      navigationUrl: '/tools/image-compress',
      pageTitle: 'Image Compression | Web Tools Easy',
      metaTags: [{
        name: 'description',
        content: 'Online Image Compression. Select multiple JPEG, PNG images and compress for free'
      }, {
        name: 'keywords',
        content: 'Image Compressor, Image Compression Online, Compression, Image'
      }, {
        name: 'author',
        content: 'Gaurav Kumar Yadav'
      }, {
        name: 'robots',
        content: 'index, follow'
      }],
      tags: ['image', 'image compression', 'image compressor', 'compression']
    });
    this.applicationConfig.set('soon', {
      navigationUrl: '',
      pageTitle: '',
      metaTags: [],
      tags: []
    });
  }
  getApplicationConfig(applicationId) {
    return this.applicationConfig.get(applicationId);
  }
}
ConfigService.ɵfac = function ConfigService_Factory(t) {
  return new (t || ConfigService)();
};
ConfigService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
  token: ConfigService,
  factory: ConfigService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 36903:
/*!****************************************************!*\
  !*** ./src/app/service/context/context.service.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ContextService": () => (/* binding */ ContextService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 4009);

class ContextService {
  constructor() {
    this.applicationId = 'home';
  }
  getCurrentAppId() {
    return this.applicationId;
  }
  setCurrentAppId(applicationId) {
    this.applicationId = applicationId;
  }
}
ContextService.ɵfac = function ContextService_Factory(t) {
  return new (t || ContextService)();
};
ContextService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
  token: ContextService,
  factory: ContextService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 90714:
/*!**************************************************!*\
  !*** ./src/app/service/icon/app-icon.service.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppIconService": () => (/* binding */ AppIconService)
/* harmony export */ });
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/environments/environment */ 97354);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 4009);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/icon */ 95359);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ 55806);




class AppIconService {
  constructor(matIconRegistry, domSanitizer) {
    this.matIconRegistry = matIconRegistry;
    this.domSanitizer = domSanitizer;
    this.iconsPath = `${src_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.hostname}assets/images/icons/`;
    this.iconsConfig = [{
      iconName: 'app-icon',
      iconRelativeUrl: 'app-icon.svg'
    }, {
      iconName: 'uuid-icon',
      iconRelativeUrl: 'uuid-icon.svg'
    }, {
      iconName: 'jwt-icon',
      iconRelativeUrl: 'jwt-icon.svg'
    }, {
      iconName: 'soon-icon',
      iconRelativeUrl: 'soon-icon.svg'
    }, {
      iconName: 'json-icon',
      iconRelativeUrl: 'json-icon.svg'
    }, {
      iconName: 'image-compress-icon',
      iconRelativeUrl: 'image-compress-icon.svg'
    }, {
      iconName: 'image-file-icon',
      iconRelativeUrl: 'image-file.svg'
    }, {
      iconName: 'download-icon',
      iconRelativeUrl: 'download.svg'
    }, {
      iconName: 'compress-icon',
      iconRelativeUrl: 'compress-icon.svg'
    }, {
      iconName: 'info-icon',
      iconRelativeUrl: 'info.svg'
    }, {
      iconName: 'settings-icon',
      iconRelativeUrl: 'settings.svg'
    }];
    this.iconsConfig.forEach(iconConfig => this.matIconRegistry.addSvgIcon(iconConfig.iconName, this.domSanitizer.bypassSecurityTrustResourceUrl(this.iconsPath + iconConfig.iconRelativeUrl)));
  }
}
AppIconService.ɵfac = function AppIconService_Factory(t) {
  return new (t || AppIconService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_material_icon__WEBPACK_IMPORTED_MODULE_2__.MatIconRegistry), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__.DomSanitizer));
};
AppIconService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
  token: AppIconService,
  factory: AppIconService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 62003:
/*!****************************************!*\
  !*** ./src/app/service/util/logger.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LogUtils": () => (/* binding */ LogUtils)
/* harmony export */ });
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/environments/environment */ 97354);

class LogUtils {
  static info(message) {
    if (!src_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.production) {
      console.log(message);
    }
  }
  static debug(message) {
    if (!src_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.production) {
      console.log(message);
    }
  }
  static error(message) {
    console.log(message);
  }
}

/***/ }),

/***/ 97354:
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "environment": () => (/* binding */ environment)
/* harmony export */ });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
  production: false,
  gaCode: 'G-XXXXX',
  hostname: 'http://localhost:4200/'
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

/***/ }),

/***/ 23149:
/*!****************************!*\
  !*** ./src/main.server.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppServerModule": () => (/* reexport safe */ _app_app_server_module__WEBPACK_IMPORTED_MODULE_0__.AppServerModule)
/* harmony export */ });
/* harmony import */ var _app_app_server_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app/app.server.module */ 84362);


/***/ }),

/***/ 53226:
/*!*******************!*\
  !*** ./server.ts ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppServerModule": () => (/* reexport safe */ _src_main_server__WEBPACK_IMPORTED_MODULE_5__.AppServerModule),
/* harmony export */   "app": () => (/* binding */ app),
/* harmony export */   "renderModule": () => (/* reexport safe */ _angular_platform_server__WEBPACK_IMPORTED_MODULE_7__.renderModule),
/* harmony export */   "ɵSERVER_CONTEXT": () => (/* reexport safe */ _angular_platform_server__WEBPACK_IMPORTED_MODULE_7__["ɵSERVER_CONTEXT"])
/* harmony export */ });
/* harmony import */ var zone_js_node__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zone.js/node */ 29810);
/* harmony import */ var zone_js_node__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zone_js_node__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 97191);
/* harmony import */ var _nguniversal_express_engine__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nguniversal/express-engine */ 65663);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! express */ 1898);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! fs */ 57147);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! path */ 71017);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _src_main_server__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./src/main.server */ 23149);
/* harmony import */ var _angular_platform_server__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/platform-server */ 78163);







// The Express app is exported so that it can be used by serverless Functions.
function app() {
  const server = express__WEBPACK_IMPORTED_MODULE_2__();
  const distFolder = (0,path__WEBPACK_IMPORTED_MODULE_4__.join)(process.cwd(), 'dist/webtoolseasy/browser');
  const indexHtml = (0,fs__WEBPACK_IMPORTED_MODULE_3__.existsSync)((0,path__WEBPACK_IMPORTED_MODULE_4__.join)(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';
  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/main/modules/express-engine)
  server.engine('html', (0,_nguniversal_express_engine__WEBPACK_IMPORTED_MODULE_1__.ngExpressEngine)({
    bootstrap: _src_main_server__WEBPACK_IMPORTED_MODULE_5__.AppServerModule
  }));
  server.set('view engine', 'html');
  server.set('views', distFolder);
  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get('*.*', express__WEBPACK_IMPORTED_MODULE_2__["static"](distFolder, {
    maxAge: '1y'
  }));
  // All regular routes use the Universal engine
  server.get('*', (req, res) => {
    res.render(indexHtml, {
      req,
      providers: [{
        provide: _angular_common__WEBPACK_IMPORTED_MODULE_6__.APP_BASE_HREF,
        useValue: req.baseUrl
      }]
    });
  });
  return server;
}
function run() {
  const port = process.env['PORT'] || 4200;
  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`webtoolseasy server started at port: ${port}`);
  });
}
const mainModule = require.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}


  // EXPORTS added by @angular-devkit/build-angular
  
  

/***/ }),

/***/ 18967:
/*!****************************************!*\
  !*** ./node_modules/express/lib/ sync ***!
  \****************************************/
/***/ ((module) => {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = () => ([]);
webpackEmptyContext.resolve = webpackEmptyContext;
webpackEmptyContext.id = 18967;
module.exports = webpackEmptyContext;

/***/ }),

/***/ 50852:
/*!******************************!*\
  !*** external "async_hooks" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("async_hooks");

/***/ }),

/***/ 14300:
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("buffer");

/***/ }),

/***/ 6113:
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ 82361:
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("events");

/***/ }),

/***/ 57147:
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ 13685:
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ 95687:
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("https");

/***/ }),

/***/ 41808:
/*!**********************!*\
  !*** external "net" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("net");

/***/ }),

/***/ 22037:
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("os");

/***/ }),

/***/ 71017:
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ 63477:
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("querystring");

/***/ }),

/***/ 12781:
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ 71576:
/*!*********************************!*\
  !*** external "string_decoder" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = require("string_decoder");

/***/ }),

/***/ 39512:
/*!*************************!*\
  !*** external "timers" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("timers");

/***/ }),

/***/ 76224:
/*!**********************!*\
  !*** external "tty" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("tty");

/***/ }),

/***/ 57310:
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("url");

/***/ }),

/***/ 73837:
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ }),

/***/ 59796:
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// the startup function
/******/ 	__webpack_require__.x = () => {
/******/ 		// Load entry module and return exports
/******/ 		// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 		__webpack_require__.O(undefined, [736], () => (__webpack_require__(76353)))
/******/ 		var __webpack_exports__ = __webpack_require__.O(undefined, [736], () => (__webpack_require__(53226)))
/******/ 		__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 		return __webpack_exports__;
/******/ 	};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks and sibling chunks for the entrypoint
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + "vendor" + ".js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get mini-css chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks and sibling chunks for the entrypoint
/******/ 		__webpack_require__.miniCssF = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return undefined;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "";
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/require chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded chunks
/******/ 		// "1" means "loaded", otherwise not loaded yet
/******/ 		var installedChunks = {
/******/ 			179: 1
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.O.require = (chunkId) => (installedChunks[chunkId]);
/******/ 		
/******/ 		var installChunk = (chunk) => {
/******/ 			var moreModules = chunk.modules, chunkIds = chunk.ids, runtime = chunk.runtime;
/******/ 			for(var moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) runtime(__webpack_require__);
/******/ 			for(var i = 0; i < chunkIds.length; i++)
/******/ 				installedChunks[chunkIds[i]] = 1;
/******/ 			__webpack_require__.O();
/******/ 		};
/******/ 		
/******/ 		// require() chunk loading for javascript
/******/ 		__webpack_require__.f.require = (chunkId, promises) => {
/******/ 			// "1" is the signal for "already loaded"
/******/ 			if(!installedChunks[chunkId]) {
/******/ 				if(true) { // all chunks have JS
/******/ 					installChunk(require("./" + __webpack_require__.u(chunkId)));
/******/ 				} else installedChunks[chunkId] = 1;
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		// no external install chunk
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/startup chunk dependencies */
/******/ 	(() => {
/******/ 		var next = __webpack_require__.x;
/******/ 		__webpack_require__.x = () => {
/******/ 			__webpack_require__.e(736);
/******/ 			return next();
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// run startup
/******/ 	var __webpack_exports__ = __webpack_require__.x();
/******/ 	var __webpack_export_target__ = exports;
/******/ 	for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
/******/ 	if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ 	
/******/ })()
;
//# sourceMappingURL=main.js.map