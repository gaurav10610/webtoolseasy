"use strict";
(self["webpackChunkwebtoolseasy"] = self["webpackChunkwebtoolseasy"] || []).push([["src_app_modules_home_home_module_ts"],{

/***/ 8934:
/*!*****************************************************!*\
  !*** ./src/app/modules/home/home-routing.module.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HomeRoutingModule: () => (/* binding */ HomeRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 7947);
/* harmony import */ var _home_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./home.component */ 4269);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 1699);
var _class;




const routes = [{
  path: '',
  component: _home_component__WEBPACK_IMPORTED_MODULE_0__.HomeComponent
}];
class HomeRoutingModule {}
_class = HomeRoutingModule;
_class.ɵfac = function HomeRoutingModule_Factory(t) {
  return new (t || _class)();
};
_class.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
  type: _class
});
_class.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](HomeRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
})();

/***/ }),

/***/ 4269:
/*!************************************************!*\
  !*** ./src/app/modules/home/home.component.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HomeComponent: () => (/* binding */ HomeComponent)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var src_environments_component_config_home_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/environments/component-config/home/config */ 9808);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/platform-browser */ 6480);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/icon */ 6515);
/* harmony import */ var src_app_service_meta_config_meta_config_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/service/meta-config/meta-config.service */ 3767);
/* harmony import */ var src_app_service_icon_config_icon_config_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/service/icon-config/icon-config.service */ 3681);
/* harmony import */ var src_app_service_platform_metadata_platform_metadata_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/service/platform-metadata/platform-metadata.service */ 3242);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/router */ 7947);
/* harmony import */ var _follow_buttons_follow_buttons_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../follow-buttons/follow-buttons.component */ 9609);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/button */ 895);
var _class;












function HomeComponent_mat_icon_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](0, "mat-icon", 6);
  }
}
class HomeComponent {
  constructor(titleService, metaService, document, matIconRegistry, domSanitizer, metaConfigService, iconConfigService, platformMetaDataService) {
    this.titleService = titleService;
    this.metaService = metaService;
    this.document = document;
    this.matIconRegistry = matIconRegistry;
    this.domSanitizer = domSanitizer;
    this.metaConfigService = metaConfigService;
    this.iconConfigService = iconConfigService;
    this.platformMetaDataService = platformMetaDataService;
  }
  ngOnInit() {
    src_environments_component_config_home_config__WEBPACK_IMPORTED_MODULE_0__.componentConfig.icons.forEach(iconConfig => this.iconConfigService.registerCustomIcon(iconConfig, this.matIconRegistry, this.domSanitizer));
    this.metaConfigService.updatePageMetaData(src_environments_component_config_home_config__WEBPACK_IMPORTED_MODULE_0__.componentConfig, this.titleService, this.metaService, this.document);
  }
}
_class = HomeComponent;
_class.ɵfac = function HomeComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__.Title), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__.Meta), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_7__.DOCUMENT), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_material_icon__WEBPACK_IMPORTED_MODULE_8__.MatIconRegistry), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__.DomSanitizer), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](src_app_service_meta_config_meta_config_service__WEBPACK_IMPORTED_MODULE_1__.MetaConfigService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](src_app_service_icon_config_icon_config_service__WEBPACK_IMPORTED_MODULE_2__.IconConfigService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](src_app_service_platform_metadata_platform_metadata_service__WEBPACK_IMPORTED_MODULE_3__.PlatformMetadataService));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["app-home"]],
  decls: 10,
  vars: 2,
  consts: [[1, "full-height", "flex-display", "flex-column-flow", "flex-center", "flex-align-center", "flex-gap-medium"], [1, "flex-display", "flex-column-flow", "flex-center", "flex-align-center", "full-width", "icon-div"], ["svgIcon", "app-icon", "class", "brand-icon", 4, "ngIf"], [2, "font-family", "monospace, 'Courier New', Courier", "font-size", "xx-large", "font-weight", "bold"], ["id", "subheading"], ["mat-stroked-button", "", "color", "primary", "matTooltip", "explore web tools button", "routerLink", "/tools", 2, "width", "200px", 3, "replaceUrl"], ["svgIcon", "app-icon", 1, "brand-icon"]],
  template: function HomeComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 0)(1, "div", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](2, HomeComponent_mat_icon_2_Template, 1, 0, "mat-icon", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "h1", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](4, " WebToolsEasy ");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](5, "h2", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](6, "Free web tools to make work super easy");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](7, "button", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](8, " Explore Web Tools ");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](9, "app-follow-buttons");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.platformMetaDataService.isPlatformBrowser);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("replaceUrl", true);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_7__.NgIf, _angular_router__WEBPACK_IMPORTED_MODULE_9__.RouterLink, _follow_buttons_follow_buttons_component__WEBPACK_IMPORTED_MODULE_4__.FollowButtonsComponent, _angular_material_icon__WEBPACK_IMPORTED_MODULE_8__.MatIcon, _angular_material_button__WEBPACK_IMPORTED_MODULE_10__.MatButton],
  styles: [".icon-div[_ngcontent-%COMP%] {\n  height: 300px;\n}\n\n.brand-icon[_ngcontent-%COMP%] {\n  transform: scale(10);\n}\n\n#subheading[_ngcontent-%COMP%] {\n  font-family: monospace, \"Courier New\", Courier;\n}\n\n@media screen and (max-width: 735px) {\n  .icon-div[_ngcontent-%COMP%] {\n    height: 150px;\n  }\n  .brand-icon[_ngcontent-%COMP%] {\n    transform: scale(5);\n  }\n  #subheading[_ngcontent-%COMP%] {\n    font-size: larger;\n  }\n  .top-div[_ngcontent-%COMP%] {\n    justify-content: center;\n  }\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvbW9kdWxlcy9ob21lL2hvbWUuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxhQUFBO0FBQ0Y7O0FBRUE7RUFDRSxvQkFBQTtBQUNGOztBQUVBO0VBQ0UsOENBQUE7QUFDRjs7QUFFQTtFQUNFO0lBQ0UsYUFBQTtFQUNGO0VBQ0E7SUFDRSxtQkFBQTtFQUNGO0VBQ0E7SUFDRSxpQkFBQTtFQUNGO0VBQ0E7SUFDRSx1QkFBQTtFQUNGO0FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIuaWNvbi1kaXYge1xuICBoZWlnaHQ6IDMwMHB4O1xufVxuXG4uYnJhbmQtaWNvbiB7XG4gIHRyYW5zZm9ybTogc2NhbGUoMTApO1xufVxuXG4jc3ViaGVhZGluZyB7XG4gIGZvbnQtZmFtaWx5OiBtb25vc3BhY2UsICdDb3VyaWVyIE5ldycsIENvdXJpZXI7XG59XG5cbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDczNXB4KSB7XG4gIC5pY29uLWRpdiB7XG4gICAgaGVpZ2h0OiAxNTBweDtcbiAgfVxuICAuYnJhbmQtaWNvbiB7XG4gICAgdHJhbnNmb3JtOiBzY2FsZSg1KTtcbiAgfVxuICAjc3ViaGVhZGluZyB7XG4gICAgZm9udC1zaXplOiBsYXJnZXI7XG4gIH1cbiAgLnRvcC1kaXYge1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9 */"],
  changeDetection: 0
});

/***/ }),

/***/ 7527:
/*!*********************************************!*\
  !*** ./src/app/modules/home/home.module.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HomeModule: () => (/* binding */ HomeModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _home_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./home-routing.module */ 8934);
/* harmony import */ var _home_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./home.component */ 4269);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/button */ 895);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/icon */ 6515);
/* harmony import */ var src_app_modules_follow_buttons_follow_buttons_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/modules/follow-buttons/follow-buttons.module */ 3341);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 1699);
var _class;







class HomeModule {}
_class = HomeModule;
_class.ɵfac = function HomeModule_Factory(t) {
  return new (t || _class)();
};
_class.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({
  type: _class
});
_class.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule, _home_routing_module__WEBPACK_IMPORTED_MODULE_0__.HomeRoutingModule, src_app_modules_follow_buttons_follow_buttons_module__WEBPACK_IMPORTED_MODULE_2__.FollowButtonsModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__.MatIconModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_6__.MatButtonModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](HomeModule, {
    declarations: [_home_component__WEBPACK_IMPORTED_MODULE_1__.HomeComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule, _home_routing_module__WEBPACK_IMPORTED_MODULE_0__.HomeRoutingModule, src_app_modules_follow_buttons_follow_buttons_module__WEBPACK_IMPORTED_MODULE_2__.FollowButtonsModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__.MatIconModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_6__.MatButtonModule]
  });
})();

/***/ }),

/***/ 9808:
/*!**********************************************************!*\
  !*** ./src/environments/component-config/home/config.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   componentConfig: () => (/* binding */ componentConfig)
/* harmony export */ });
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/environments/environment */ 553);

const navigationUrl = '';
const pageTitle = 'Free Online Web Tools';
const pageDescription = 'Discover a range of free online web tools that can simplify your work and boost productivity. Try them out today!';
const imageUrl = `${src_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.screenshotsBaseUrl}/home-page.png`;
const componentConfig = {
  navigationUrl,
  pageTitle,
  metaTags: [{
    name: 'description',
    content: pageDescription
  }, {
    name: 'author',
    content: 'Gaurav Kumar Yadav'
  }, {
    name: 'robots',
    content: 'index, follow'
  }, {
    property: 'og:title',
    content: pageTitle
  }, {
    property: 'og:type',
    content: 'website'
  }, {
    property: 'og:url',
    content: `${src_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.hostname}${navigationUrl}`
  }, {
    property: 'og:image',
    content: imageUrl
  }, {
    property: 'og:image:secure_url',
    content: imageUrl
  }, {
    property: 'og:description',
    content: pageDescription
  }, {
    property: 'og:site_name',
    content: 'WebToolsEasy'
  }, {
    property: 'twitter:card',
    content: 'summary_large_image'
  }, {
    property: 'twitter:site',
    content: '@webtoolseasy'
  }, {
    property: 'twitter:title',
    content: pageTitle
  }, {
    property: 'twitter:description',
    content: pageDescription
  }, {
    property: 'twitter:image',
    content: imageUrl
  }],
  tags: [],
  relatedTools: [],
  icons: [{
    iconName: 'app-icon',
    iconRelativeUrl: 'app-icon.svg'
  }, {
    iconName: 'share-fb',
    iconRelativeUrl: 'share-fb.svg'
  }, {
    iconName: 'share-linkedin',
    iconRelativeUrl: 'share-linkedin.svg'
  }, {
    iconName: 'share-twitter',
    iconRelativeUrl: 'share-twitter.svg'
  }, {
    iconName: 'share-copy',
    iconRelativeUrl: 'share-copy.svg'
  }]
};

/***/ })

}]);
//# sourceMappingURL=src_app_modules_home_home_module_ts.77abd1b17a398f89.js.map