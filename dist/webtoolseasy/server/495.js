"use strict";
exports.id = 495;
exports.ids = [495];
exports.modules = {

/***/ 12674:
/*!********************************************************************!*\
  !*** ./src/app/modules/follow-buttons/follow-buttons.component.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FollowButtonsComponent: () => (/* binding */ FollowButtonsComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 59936);
/* harmony import */ var src_app_service_platform_metadata_platform_metadata_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/service/platform-metadata/platform-metadata.service */ 26363);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 34228);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/icon */ 59049);




function FollowButtonsComponent_mat_icon_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "mat-icon", 8);
  }
}
function FollowButtonsComponent_mat_icon_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "mat-icon", 9);
  }
}
function FollowButtonsComponent_mat_icon_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "mat-icon", 10);
  }
}
let FollowButtonsComponent = /*#__PURE__*/(() => {
  var _class;
  class FollowButtonsComponent {
    constructor(platformMetaDataService) {
      this.platformMetaDataService = platformMetaDataService;
    }
  }
  _class = FollowButtonsComponent;
  _class.ɵfac = function FollowButtonsComponent_Factory(t) {
    return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](src_app_service_platform_metadata_platform_metadata_service__WEBPACK_IMPORTED_MODULE_0__.PlatformMetadataService));
  };
  _class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
    type: _class,
    selectors: [["app-follow-buttons"]],
    decls: 10,
    vars: 3,
    consts: [[1, "flex-display", "flex-column-flow", "flex-center", "flex-align-center", "flex-gap-medium"], [1, "flex-display", "flex-row-flow", 2, "gap", "20px"], ["href", "https://www.linkedin.com/company/webtoolseasy/", "target", "_blank"], ["svgIcon", "share-linkedin", 4, "ngIf"], ["href", "https://www.facebook.com/people/Webtoolseasy/100088911459047/", "target", "_blank"], ["svgIcon", "share-fb", 4, "ngIf"], ["href", "https://twitter.com/webtoolseasy", "target", "_blank"], ["svgIcon", "share-twitter", 4, "ngIf"], ["svgIcon", "share-linkedin"], ["svgIcon", "share-fb"], ["svgIcon", "share-twitter"]],
    template: function FollowButtonsComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0)(1, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "FOLLOW US");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 1)(4, "a", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](5, FollowButtonsComponent_mat_icon_5_Template, 1, 0, "mat-icon", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "a", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](7, FollowButtonsComponent_mat_icon_7_Template, 1, 0, "mat-icon", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "a", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](9, FollowButtonsComponent_mat_icon_9_Template, 1, 0, "mat-icon", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.platformMetaDataService.isPlatformBrowser);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.platformMetaDataService.isPlatformBrowser);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.platformMetaDataService.isPlatformBrowser);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.NgIf, _angular_material_icon__WEBPACK_IMPORTED_MODULE_3__.MatIcon],
    styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
  });
  return FollowButtonsComponent;
})();

/***/ }),

/***/ 48197:
/*!*****************************************************************!*\
  !*** ./src/app/modules/follow-buttons/follow-buttons.module.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FollowButtonsModule: () => (/* binding */ FollowButtonsModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 34228);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/icon */ 59049);
/* harmony import */ var _follow_buttons_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./follow-buttons.component */ 12674);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 59936);




let FollowButtonsModule = /*#__PURE__*/(() => {
  var _class;
  class FollowButtonsModule {}
  _class = FollowButtonsModule;
  _class.ɵfac = function FollowButtonsModule_Factory(t) {
    return new (t || _class)();
  };
  _class.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
    type: _class
  });
  _class.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_3__.MatIconModule]
  });
  return FollowButtonsModule;
})();
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](FollowButtonsModule, {
    declarations: [_follow_buttons_component__WEBPACK_IMPORTED_MODULE_0__.FollowButtonsComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_3__.MatIconModule],
    exports: [_follow_buttons_component__WEBPACK_IMPORTED_MODULE_0__.FollowButtonsComponent]
  });
})();

/***/ }),

/***/ 92603:
/*!*****************************************************!*\
  !*** ./src/app/modules/home/home-routing.module.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HomeRoutingModule: () => (/* binding */ HomeRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 68804);
/* harmony import */ var _home_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./home.component */ 98622);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 59936);




const routes = [{
  path: '',
  component: _home_component__WEBPACK_IMPORTED_MODULE_0__.HomeComponent
}];
let HomeRoutingModule = /*#__PURE__*/(() => {
  var _class;
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
  return HomeRoutingModule;
})();
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](HomeRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
})();

/***/ }),

/***/ 98622:
/*!************************************************!*\
  !*** ./src/app/modules/home/home.component.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HomeComponent: () => (/* binding */ HomeComponent)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ 34228);
/* harmony import */ var src_environments_component_config_home_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/environments/component-config/home/config */ 42101);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 59936);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/platform-browser */ 41081);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/icon */ 59049);
/* harmony import */ var src_app_service_meta_config_meta_config_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/service/meta-config/meta-config.service */ 87436);
/* harmony import */ var src_app_service_icon_config_icon_config_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/service/icon-config/icon-config.service */ 44095);
/* harmony import */ var src_app_service_platform_metadata_platform_metadata_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/service/platform-metadata/platform-metadata.service */ 26363);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/router */ 68804);
/* harmony import */ var _follow_buttons_follow_buttons_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../follow-buttons/follow-buttons.component */ 12674);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/button */ 63490);












function HomeComponent_mat_icon_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](0, "mat-icon", 6);
  }
}
let HomeComponent = /*#__PURE__*/(() => {
  var _class;
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
  return HomeComponent;
})();

/***/ }),

/***/ 13495:
/*!*********************************************!*\
  !*** ./src/app/modules/home/home.module.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HomeModule: () => (/* binding */ HomeModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 34228);
/* harmony import */ var _home_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./home-routing.module */ 92603);
/* harmony import */ var _home_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./home.component */ 98622);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/button */ 63490);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/icon */ 59049);
/* harmony import */ var src_app_modules_follow_buttons_follow_buttons_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/modules/follow-buttons/follow-buttons.module */ 48197);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 59936);







let HomeModule = /*#__PURE__*/(() => {
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
  return HomeModule;
})();
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](HomeModule, {
    declarations: [_home_component__WEBPACK_IMPORTED_MODULE_1__.HomeComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule, _home_routing_module__WEBPACK_IMPORTED_MODULE_0__.HomeRoutingModule, src_app_modules_follow_buttons_follow_buttons_module__WEBPACK_IMPORTED_MODULE_2__.FollowButtonsModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__.MatIconModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_6__.MatButtonModule]
  });
})();

/***/ }),

/***/ 44095:
/*!************************************************************!*\
  !*** ./src/app/service/icon-config/icon-config.service.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   IconConfigService: () => (/* binding */ IconConfigService)
/* harmony export */ });
/* harmony import */ var _Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 70734);
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/environments/environment */ 56316);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 59936);



let IconConfigService = /*#__PURE__*/(() => {
  var _class;
  class IconConfigService {
    registerCustomIcon(iconConfig, matIconRegistry, domSanitizer) {
      return (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
        matIconRegistry.addSvgIcon(iconConfig.iconName, domSanitizer.bypassSecurityTrustResourceUrl(`
        ${src_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.baseIconsPathUrl}${iconConfig.iconRelativeUrl}?${src_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.queryHash}`));
      })();
    }
  }
  _class = IconConfigService;
  _class.ɵfac = function IconConfigService_Factory(t) {
    return new (t || _class)();
  };
  _class.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
    token: _class,
    factory: _class.ɵfac,
    providedIn: 'root'
  });
  return IconConfigService;
})();

/***/ }),

/***/ 87436:
/*!************************************************************!*\
  !*** ./src/app/service/meta-config/meta-config.service.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MetaConfigService: () => (/* binding */ MetaConfigService)
/* harmony export */ });
/* harmony import */ var _Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 70734);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 59936);


let MetaConfigService = /*#__PURE__*/(() => {
  var _class;
  class MetaConfigService {
    /**
     * set following page metadata
     *
     * 1. title
     * 2. meta
     * 3. canonical url
     * 4. og:graph meta tags
     */
    updatePageMetaData(applicationConfig, titleService, metaService, document) {
      return (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
        titleService.setTitle(applicationConfig.pageTitle);
        applicationConfig.metaTags.forEach(metaDefinition => {
          metaService.updateTag(metaDefinition);
        });
        /**
         * set canonical url
         */
        let linkElement = document.querySelector(`link[rel='canonical']`) || null;
        if (linkElement == null) {
          linkElement = document.createElement('link');
          document.head.appendChild(linkElement);
        }
        linkElement.setAttribute('rel', 'canonical');
        linkElement.setAttribute('href', `https://webtoolseasy.com${applicationConfig.navigationUrl}`);
      })();
    }
  }
  _class = MetaConfigService;
  _class.ɵfac = function MetaConfigService_Factory(t) {
    return new (t || _class)();
  };
  _class.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
    token: _class,
    factory: _class.ɵfac,
    providedIn: 'root'
  });
  return MetaConfigService;
})();

/***/ }),

/***/ 26363:
/*!************************************************************************!*\
  !*** ./src/app/service/platform-metadata/platform-metadata.service.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PlatformMetadataService: () => (/* binding */ PlatformMetadataService)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ 34228);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 59936);



let PlatformMetadataService = /*#__PURE__*/(() => {
  var _class;
  class PlatformMetadataService {
    constructor(platformId) {
      this.platformId = platformId;
      this.isPlatformBrowser = true;
      this.isPlatformBrowser = (0,_angular_common__WEBPACK_IMPORTED_MODULE_0__.isPlatformBrowser)(platformId);
    }
  }
  _class = PlatformMetadataService;
  _class.ɵfac = function PlatformMetadataService_Factory(t) {
    return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.PLATFORM_ID));
  };
  _class.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
    token: _class,
    factory: _class.ɵfac,
    providedIn: 'root'
  });
  return PlatformMetadataService;
})();

/***/ }),

/***/ 42101:
/*!**********************************************************!*\
  !*** ./src/environments/component-config/home/config.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   componentConfig: () => (/* binding */ componentConfig)
/* harmony export */ });
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/environments/environment */ 56316);

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

/***/ }),

/***/ 5612:
/*!*****************************************************!*\
  !*** ./node_modules/@angular/cdk/fesm2022/a11y.mjs ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A11yModule: () => (/* binding */ A11yModule),
/* harmony export */   ActiveDescendantKeyManager: () => (/* binding */ ActiveDescendantKeyManager),
/* harmony export */   AriaDescriber: () => (/* binding */ AriaDescriber),
/* harmony export */   CDK_DESCRIBEDBY_HOST_ATTRIBUTE: () => (/* binding */ CDK_DESCRIBEDBY_HOST_ATTRIBUTE),
/* harmony export */   CDK_DESCRIBEDBY_ID_PREFIX: () => (/* binding */ CDK_DESCRIBEDBY_ID_PREFIX),
/* harmony export */   CdkAriaLive: () => (/* binding */ CdkAriaLive),
/* harmony export */   CdkMonitorFocus: () => (/* binding */ CdkMonitorFocus),
/* harmony export */   CdkTrapFocus: () => (/* binding */ CdkTrapFocus),
/* harmony export */   ConfigurableFocusTrap: () => (/* binding */ ConfigurableFocusTrap),
/* harmony export */   ConfigurableFocusTrapFactory: () => (/* binding */ ConfigurableFocusTrapFactory),
/* harmony export */   EventListenerFocusTrapInertStrategy: () => (/* binding */ EventListenerFocusTrapInertStrategy),
/* harmony export */   FOCUS_MONITOR_DEFAULT_OPTIONS: () => (/* binding */ FOCUS_MONITOR_DEFAULT_OPTIONS),
/* harmony export */   FOCUS_TRAP_INERT_STRATEGY: () => (/* binding */ FOCUS_TRAP_INERT_STRATEGY),
/* harmony export */   FocusKeyManager: () => (/* binding */ FocusKeyManager),
/* harmony export */   FocusMonitor: () => (/* binding */ FocusMonitor),
/* harmony export */   FocusTrap: () => (/* binding */ FocusTrap),
/* harmony export */   FocusTrapFactory: () => (/* binding */ FocusTrapFactory),
/* harmony export */   HighContrastModeDetector: () => (/* binding */ HighContrastModeDetector),
/* harmony export */   INPUT_MODALITY_DETECTOR_DEFAULT_OPTIONS: () => (/* binding */ INPUT_MODALITY_DETECTOR_DEFAULT_OPTIONS),
/* harmony export */   INPUT_MODALITY_DETECTOR_OPTIONS: () => (/* binding */ INPUT_MODALITY_DETECTOR_OPTIONS),
/* harmony export */   InputModalityDetector: () => (/* binding */ InputModalityDetector),
/* harmony export */   InteractivityChecker: () => (/* binding */ InteractivityChecker),
/* harmony export */   IsFocusableConfig: () => (/* binding */ IsFocusableConfig),
/* harmony export */   LIVE_ANNOUNCER_DEFAULT_OPTIONS: () => (/* binding */ LIVE_ANNOUNCER_DEFAULT_OPTIONS),
/* harmony export */   LIVE_ANNOUNCER_ELEMENT_TOKEN: () => (/* binding */ LIVE_ANNOUNCER_ELEMENT_TOKEN),
/* harmony export */   LIVE_ANNOUNCER_ELEMENT_TOKEN_FACTORY: () => (/* binding */ LIVE_ANNOUNCER_ELEMENT_TOKEN_FACTORY),
/* harmony export */   ListKeyManager: () => (/* binding */ ListKeyManager),
/* harmony export */   LiveAnnouncer: () => (/* binding */ LiveAnnouncer),
/* harmony export */   MESSAGES_CONTAINER_ID: () => (/* binding */ MESSAGES_CONTAINER_ID),
/* harmony export */   addAriaReferencedId: () => (/* binding */ addAriaReferencedId),
/* harmony export */   getAriaReferenceIds: () => (/* binding */ getAriaReferenceIds),
/* harmony export */   isFakeMousedownFromScreenReader: () => (/* binding */ isFakeMousedownFromScreenReader),
/* harmony export */   isFakeTouchstartFromScreenReader: () => (/* binding */ isFakeTouchstartFromScreenReader),
/* harmony export */   removeAriaReferencedId: () => (/* binding */ removeAriaReferencedId)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 34228);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 59936);
/* harmony import */ var _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/cdk/platform */ 92237);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 85028);
/* harmony import */ var _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/cdk/keycodes */ 31998);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ 33410);
/* harmony import */ var _angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/cdk/coercion */ 45029);
/* harmony import */ var _angular_cdk_observers__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/cdk/observers */ 24819);
/* harmony import */ var _angular_cdk_layout__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/cdk/layout */ 93975);













/** IDs are delimited by an empty space, as per the spec. */
const ID_DELIMITER = ' ';
/**
 * Adds the given ID to the specified ARIA attribute on an element.
 * Used for attributes such as aria-labelledby, aria-owns, etc.
 */
function addAriaReferencedId(el, attr, id) {
  const ids = getAriaReferenceIds(el, attr);
  if (ids.some(existingId => existingId.trim() == id.trim())) {
    return;
  }
  ids.push(id.trim());
  el.setAttribute(attr, ids.join(ID_DELIMITER));
}
/**
 * Removes the given ID from the specified ARIA attribute on an element.
 * Used for attributes such as aria-labelledby, aria-owns, etc.
 */
function removeAriaReferencedId(el, attr, id) {
  const ids = getAriaReferenceIds(el, attr);
  const filteredIds = ids.filter(val => val != id.trim());
  if (filteredIds.length) {
    el.setAttribute(attr, filteredIds.join(ID_DELIMITER));
  } else {
    el.removeAttribute(attr);
  }
}
/**
 * Gets the list of IDs referenced by the given ARIA attribute on an element.
 * Used for attributes such as aria-labelledby, aria-owns, etc.
 */
function getAriaReferenceIds(el, attr) {
  // Get string array of all individual ids (whitespace delimited) in the attribute value
  return (el.getAttribute(attr) || '').match(/\S+/g) || [];
}

/**
 * ID used for the body container where all messages are appended.
 * @deprecated No longer being used. To be removed.
 * @breaking-change 14.0.0
 */
const MESSAGES_CONTAINER_ID = 'cdk-describedby-message-container';
/**
 * ID prefix used for each created message element.
 * @deprecated To be turned into a private variable.
 * @breaking-change 14.0.0
 */
const CDK_DESCRIBEDBY_ID_PREFIX = 'cdk-describedby-message';
/**
 * Attribute given to each host element that is described by a message element.
 * @deprecated To be turned into a private variable.
 * @breaking-change 14.0.0
 */
const CDK_DESCRIBEDBY_HOST_ATTRIBUTE = 'cdk-describedby-host';
/** Global incremental identifier for each registered message element. */
let nextId = 0;
/**
 * Utility that creates visually hidden elements with a message content. Useful for elements that
 * want to use aria-describedby to further describe themselves without adding additional visual
 * content.
 */
let AriaDescriber = /*#__PURE__*/(() => {
  var _class;
  class AriaDescriber {
    constructor(_document,
    /**
     * @deprecated To be turned into a required parameter.
     * @breaking-change 14.0.0
     */
    _platform) {
      this._platform = _platform;
      /** Map of all registered message elements that have been placed into the document. */
      this._messageRegistry = new Map();
      /** Container for all registered messages. */
      this._messagesContainer = null;
      /** Unique ID for the service. */
      this._id = `${nextId++}`;
      this._document = _document;
      this._id = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_angular_core__WEBPACK_IMPORTED_MODULE_0__.APP_ID) + '-' + nextId++;
    }
    describe(hostElement, message, role) {
      if (!this._canBeDescribed(hostElement, message)) {
        return;
      }
      const key = getKey(message, role);
      if (typeof message !== 'string') {
        // We need to ensure that the element has an ID.
        setMessageId(message, this._id);
        this._messageRegistry.set(key, {
          messageElement: message,
          referenceCount: 0
        });
      } else if (!this._messageRegistry.has(key)) {
        this._createMessageElement(message, role);
      }
      if (!this._isElementDescribedByMessage(hostElement, key)) {
        this._addMessageReference(hostElement, key);
      }
    }
    removeDescription(hostElement, message, role) {
      if (!message || !this._isElementNode(hostElement)) {
        return;
      }
      const key = getKey(message, role);
      if (this._isElementDescribedByMessage(hostElement, key)) {
        this._removeMessageReference(hostElement, key);
      }
      // If the message is a string, it means that it's one that we created for the
      // consumer so we can remove it safely, otherwise we should leave it in place.
      if (typeof message === 'string') {
        const registeredMessage = this._messageRegistry.get(key);
        if (registeredMessage && registeredMessage.referenceCount === 0) {
          this._deleteMessageElement(key);
        }
      }
      if (this._messagesContainer?.childNodes.length === 0) {
        this._messagesContainer.remove();
        this._messagesContainer = null;
      }
    }
    /** Unregisters all created message elements and removes the message container. */
    ngOnDestroy() {
      const describedElements = this._document.querySelectorAll(`[${CDK_DESCRIBEDBY_HOST_ATTRIBUTE}="${this._id}"]`);
      for (let i = 0; i < describedElements.length; i++) {
        this._removeCdkDescribedByReferenceIds(describedElements[i]);
        describedElements[i].removeAttribute(CDK_DESCRIBEDBY_HOST_ATTRIBUTE);
      }
      this._messagesContainer?.remove();
      this._messagesContainer = null;
      this._messageRegistry.clear();
    }
    /**
     * Creates a new element in the visually hidden message container element with the message
     * as its content and adds it to the message registry.
     */
    _createMessageElement(message, role) {
      const messageElement = this._document.createElement('div');
      setMessageId(messageElement, this._id);
      messageElement.textContent = message;
      if (role) {
        messageElement.setAttribute('role', role);
      }
      this._createMessagesContainer();
      this._messagesContainer.appendChild(messageElement);
      this._messageRegistry.set(getKey(message, role), {
        messageElement,
        referenceCount: 0
      });
    }
    /** Deletes the message element from the global messages container. */
    _deleteMessageElement(key) {
      this._messageRegistry.get(key)?.messageElement?.remove();
      this._messageRegistry.delete(key);
    }
    /** Creates the global container for all aria-describedby messages. */
    _createMessagesContainer() {
      if (this._messagesContainer) {
        return;
      }
      const containerClassName = 'cdk-describedby-message-container';
      const serverContainers = this._document.querySelectorAll(`.${containerClassName}[platform="server"]`);
      for (let i = 0; i < serverContainers.length; i++) {
        // When going from the server to the client, we may end up in a situation where there's
        // already a container on the page, but we don't have a reference to it. Clear the
        // old container so we don't get duplicates. Doing this, instead of emptying the previous
        // container, should be slightly faster.
        serverContainers[i].remove();
      }
      const messagesContainer = this._document.createElement('div');
      // We add `visibility: hidden` in order to prevent text in this container from
      // being searchable by the browser's Ctrl + F functionality.
      // Screen-readers will still read the description for elements with aria-describedby even
      // when the description element is not visible.
      messagesContainer.style.visibility = 'hidden';
      // Even though we use `visibility: hidden`, we still apply `cdk-visually-hidden` so that
      // the description element doesn't impact page layout.
      messagesContainer.classList.add(containerClassName);
      messagesContainer.classList.add('cdk-visually-hidden');
      // @breaking-change 14.0.0 Remove null check for `_platform`.
      if (this._platform && !this._platform.isBrowser) {
        messagesContainer.setAttribute('platform', 'server');
      }
      this._document.body.appendChild(messagesContainer);
      this._messagesContainer = messagesContainer;
    }
    /** Removes all cdk-describedby messages that are hosted through the element. */
    _removeCdkDescribedByReferenceIds(element) {
      // Remove all aria-describedby reference IDs that are prefixed by CDK_DESCRIBEDBY_ID_PREFIX
      const originalReferenceIds = getAriaReferenceIds(element, 'aria-describedby').filter(id => id.indexOf(CDK_DESCRIBEDBY_ID_PREFIX) != 0);
      element.setAttribute('aria-describedby', originalReferenceIds.join(' '));
    }
    /**
     * Adds a message reference to the element using aria-describedby and increments the registered
     * message's reference count.
     */
    _addMessageReference(element, key) {
      const registeredMessage = this._messageRegistry.get(key);
      // Add the aria-describedby reference and set the
      // describedby_host attribute to mark the element.
      addAriaReferencedId(element, 'aria-describedby', registeredMessage.messageElement.id);
      element.setAttribute(CDK_DESCRIBEDBY_HOST_ATTRIBUTE, this._id);
      registeredMessage.referenceCount++;
    }
    /**
     * Removes a message reference from the element using aria-describedby
     * and decrements the registered message's reference count.
     */
    _removeMessageReference(element, key) {
      const registeredMessage = this._messageRegistry.get(key);
      registeredMessage.referenceCount--;
      removeAriaReferencedId(element, 'aria-describedby', registeredMessage.messageElement.id);
      element.removeAttribute(CDK_DESCRIBEDBY_HOST_ATTRIBUTE);
    }
    /** Returns true if the element has been described by the provided message ID. */
    _isElementDescribedByMessage(element, key) {
      const referenceIds = getAriaReferenceIds(element, 'aria-describedby');
      const registeredMessage = this._messageRegistry.get(key);
      const messageId = registeredMessage && registeredMessage.messageElement.id;
      return !!messageId && referenceIds.indexOf(messageId) != -1;
    }
    /** Determines whether a message can be described on a particular element. */
    _canBeDescribed(element, message) {
      if (!this._isElementNode(element)) {
        return false;
      }
      if (message && typeof message === 'object') {
        // We'd have to make some assumptions about the description element's text, if the consumer
        // passed in an element. Assume that if an element is passed in, the consumer has verified
        // that it can be used as a description.
        return true;
      }
      const trimmedMessage = message == null ? '' : `${message}`.trim();
      const ariaLabel = element.getAttribute('aria-label');
      // We shouldn't set descriptions if they're exactly the same as the `aria-label` of the
      // element, because screen readers will end up reading out the same text twice in a row.
      return trimmedMessage ? !ariaLabel || ariaLabel.trim() !== trimmedMessage : false;
    }
    /** Checks whether a node is an Element node. */
    _isElementNode(element) {
      return element.nodeType === this._document.ELEMENT_NODE;
    }
  }
  _class = AriaDescriber;
  _class.ɵfac = function _class_Factory(t) {
    return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common__WEBPACK_IMPORTED_MODULE_1__.DOCUMENT), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_2__.Platform));
  };
  _class.ɵprov = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
    token: _class,
    factory: _class.ɵfac,
    providedIn: 'root'
  });
  return AriaDescriber;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
/** Gets a key that can be used to look messages up in the registry. */
function getKey(message, role) {
  return typeof message === 'string' ? `${role || ''}/${message}` : message;
}
/** Assigns a unique ID to an element, if it doesn't have one already. */
function setMessageId(element, serviceId) {
  if (!element.id) {
    element.id = `${CDK_DESCRIBEDBY_ID_PREFIX}-${serviceId}-${nextId++}`;
  }
}

/**
 * This class manages keyboard events for selectable lists. If you pass it a query list
 * of items, it will set the active item correctly when arrow events occur.
 */
class ListKeyManager {
  constructor(_items) {
    this._items = _items;
    this._activeItemIndex = -1;
    this._activeItem = null;
    this._wrap = false;
    this._letterKeyStream = new rxjs__WEBPACK_IMPORTED_MODULE_3__.Subject();
    this._typeaheadSubscription = rxjs__WEBPACK_IMPORTED_MODULE_3__.Subscription.EMPTY;
    this._vertical = true;
    this._allowedModifierKeys = [];
    this._homeAndEnd = false;
    this._pageUpAndDown = {
      enabled: false,
      delta: 10
    };
    /**
     * Predicate function that can be used to check whether an item should be skipped
     * by the key manager. By default, disabled items are skipped.
     */
    this._skipPredicateFn = item => item.disabled;
    // Buffer for the letters that the user has pressed when the typeahead option is turned on.
    this._pressedLetters = [];
    /**
     * Stream that emits any time the TAB key is pressed, so components can react
     * when focus is shifted off of the list.
     */
    this.tabOut = new rxjs__WEBPACK_IMPORTED_MODULE_3__.Subject();
    /** Stream that emits whenever the active item of the list manager changes. */
    this.change = new rxjs__WEBPACK_IMPORTED_MODULE_3__.Subject();
    // We allow for the items to be an array because, in some cases, the consumer may
    // not have access to a QueryList of the items they want to manage (e.g. when the
    // items aren't being collected via `ViewChildren` or `ContentChildren`).
    if (_items instanceof _angular_core__WEBPACK_IMPORTED_MODULE_0__.QueryList) {
      this._itemChangesSubscription = _items.changes.subscribe(newItems => {
        if (this._activeItem) {
          const itemArray = newItems.toArray();
          const newIndex = itemArray.indexOf(this._activeItem);
          if (newIndex > -1 && newIndex !== this._activeItemIndex) {
            this._activeItemIndex = newIndex;
          }
        }
      });
    }
  }
  /**
   * Sets the predicate function that determines which items should be skipped by the
   * list key manager.
   * @param predicate Function that determines whether the given item should be skipped.
   */
  skipPredicate(predicate) {
    this._skipPredicateFn = predicate;
    return this;
  }
  /**
   * Configures wrapping mode, which determines whether the active item will wrap to
   * the other end of list when there are no more items in the given direction.
   * @param shouldWrap Whether the list should wrap when reaching the end.
   */
  withWrap(shouldWrap = true) {
    this._wrap = shouldWrap;
    return this;
  }
  /**
   * Configures whether the key manager should be able to move the selection vertically.
   * @param enabled Whether vertical selection should be enabled.
   */
  withVerticalOrientation(enabled = true) {
    this._vertical = enabled;
    return this;
  }
  /**
   * Configures the key manager to move the selection horizontally.
   * Passing in `null` will disable horizontal movement.
   * @param direction Direction in which the selection can be moved.
   */
  withHorizontalOrientation(direction) {
    this._horizontal = direction;
    return this;
  }
  /**
   * Modifier keys which are allowed to be held down and whose default actions will be prevented
   * as the user is pressing the arrow keys. Defaults to not allowing any modifier keys.
   */
  withAllowedModifierKeys(keys) {
    this._allowedModifierKeys = keys;
    return this;
  }
  /**
   * Turns on typeahead mode which allows users to set the active item by typing.
   * @param debounceInterval Time to wait after the last keystroke before setting the active item.
   */
  withTypeAhead(debounceInterval = 200) {
    if ((typeof ngDevMode === 'undefined' || ngDevMode) && this._items.length && this._items.some(item => typeof item.getLabel !== 'function')) {
      throw Error('ListKeyManager items in typeahead mode must implement the `getLabel` method.');
    }
    this._typeaheadSubscription.unsubscribe();
    // Debounce the presses of non-navigational keys, collect the ones that correspond to letters
    // and convert those letters back into a string. Afterwards find the first item that starts
    // with that string and select it.
    this._typeaheadSubscription = this._letterKeyStream.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.tap)(letter => this._pressedLetters.push(letter)), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.debounceTime)(debounceInterval), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.filter)(() => this._pressedLetters.length > 0), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.map)(() => this._pressedLetters.join(''))).subscribe(inputString => {
      const items = this._getItemsArray();
      // Start at 1 because we want to start searching at the item immediately
      // following the current active item.
      for (let i = 1; i < items.length + 1; i++) {
        const index = (this._activeItemIndex + i) % items.length;
        const item = items[index];
        if (!this._skipPredicateFn(item) && item.getLabel().toUpperCase().trim().indexOf(inputString) === 0) {
          this.setActiveItem(index);
          break;
        }
      }
      this._pressedLetters = [];
    });
    return this;
  }
  /** Cancels the current typeahead sequence. */
  cancelTypeahead() {
    this._pressedLetters = [];
    return this;
  }
  /**
   * Configures the key manager to activate the first and last items
   * respectively when the Home or End key is pressed.
   * @param enabled Whether pressing the Home or End key activates the first/last item.
   */
  withHomeAndEnd(enabled = true) {
    this._homeAndEnd = enabled;
    return this;
  }
  /**
   * Configures the key manager to activate every 10th, configured or first/last element in up/down direction
   * respectively when the Page-Up or Page-Down key is pressed.
   * @param enabled Whether pressing the Page-Up or Page-Down key activates the first/last item.
   * @param delta Whether pressing the Home or End key activates the first/last item.
   */
  withPageUpDown(enabled = true, delta = 10) {
    this._pageUpAndDown = {
      enabled,
      delta
    };
    return this;
  }
  setActiveItem(item) {
    const previousActiveItem = this._activeItem;
    this.updateActiveItem(item);
    if (this._activeItem !== previousActiveItem) {
      this.change.next(this._activeItemIndex);
    }
  }
  /**
   * Sets the active item depending on the key event passed in.
   * @param event Keyboard event to be used for determining which element should be active.
   */
  onKeydown(event) {
    const keyCode = event.keyCode;
    const modifiers = ['altKey', 'ctrlKey', 'metaKey', 'shiftKey'];
    const isModifierAllowed = modifiers.every(modifier => {
      return !event[modifier] || this._allowedModifierKeys.indexOf(modifier) > -1;
    });
    switch (keyCode) {
      case _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_5__.TAB:
        this.tabOut.next();
        return;
      case _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_5__.DOWN_ARROW:
        if (this._vertical && isModifierAllowed) {
          this.setNextItemActive();
          break;
        } else {
          return;
        }
      case _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_5__.UP_ARROW:
        if (this._vertical && isModifierAllowed) {
          this.setPreviousItemActive();
          break;
        } else {
          return;
        }
      case _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_5__.RIGHT_ARROW:
        if (this._horizontal && isModifierAllowed) {
          this._horizontal === 'rtl' ? this.setPreviousItemActive() : this.setNextItemActive();
          break;
        } else {
          return;
        }
      case _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_5__.LEFT_ARROW:
        if (this._horizontal && isModifierAllowed) {
          this._horizontal === 'rtl' ? this.setNextItemActive() : this.setPreviousItemActive();
          break;
        } else {
          return;
        }
      case _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_5__.HOME:
        if (this._homeAndEnd && isModifierAllowed) {
          this.setFirstItemActive();
          break;
        } else {
          return;
        }
      case _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_5__.END:
        if (this._homeAndEnd && isModifierAllowed) {
          this.setLastItemActive();
          break;
        } else {
          return;
        }
      case _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_5__.PAGE_UP:
        if (this._pageUpAndDown.enabled && isModifierAllowed) {
          const targetIndex = this._activeItemIndex - this._pageUpAndDown.delta;
          this._setActiveItemByIndex(targetIndex > 0 ? targetIndex : 0, 1);
          break;
        } else {
          return;
        }
      case _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_5__.PAGE_DOWN:
        if (this._pageUpAndDown.enabled && isModifierAllowed) {
          const targetIndex = this._activeItemIndex + this._pageUpAndDown.delta;
          const itemsLength = this._getItemsArray().length;
          this._setActiveItemByIndex(targetIndex < itemsLength ? targetIndex : itemsLength - 1, -1);
          break;
        } else {
          return;
        }
      default:
        if (isModifierAllowed || (0,_angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_5__.hasModifierKey)(event, 'shiftKey')) {
          // Attempt to use the `event.key` which also maps it to the user's keyboard language,
          // otherwise fall back to resolving alphanumeric characters via the keyCode.
          if (event.key && event.key.length === 1) {
            this._letterKeyStream.next(event.key.toLocaleUpperCase());
          } else if (keyCode >= _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_5__.A && keyCode <= _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_5__.Z || keyCode >= _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_5__.ZERO && keyCode <= _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_5__.NINE) {
            this._letterKeyStream.next(String.fromCharCode(keyCode));
          }
        }
        // Note that we return here, in order to avoid preventing
        // the default action of non-navigational keys.
        return;
    }
    this._pressedLetters = [];
    event.preventDefault();
  }
  /** Index of the currently active item. */
  get activeItemIndex() {
    return this._activeItemIndex;
  }
  /** The active item. */
  get activeItem() {
    return this._activeItem;
  }
  /** Gets whether the user is currently typing into the manager using the typeahead feature. */
  isTyping() {
    return this._pressedLetters.length > 0;
  }
  /** Sets the active item to the first enabled item in the list. */
  setFirstItemActive() {
    this._setActiveItemByIndex(0, 1);
  }
  /** Sets the active item to the last enabled item in the list. */
  setLastItemActive() {
    this._setActiveItemByIndex(this._items.length - 1, -1);
  }
  /** Sets the active item to the next enabled item in the list. */
  setNextItemActive() {
    this._activeItemIndex < 0 ? this.setFirstItemActive() : this._setActiveItemByDelta(1);
  }
  /** Sets the active item to a previous enabled item in the list. */
  setPreviousItemActive() {
    this._activeItemIndex < 0 && this._wrap ? this.setLastItemActive() : this._setActiveItemByDelta(-1);
  }
  updateActiveItem(item) {
    const itemArray = this._getItemsArray();
    const index = typeof item === 'number' ? item : itemArray.indexOf(item);
    const activeItem = itemArray[index];
    // Explicitly check for `null` and `undefined` because other falsy values are valid.
    this._activeItem = activeItem == null ? null : activeItem;
    this._activeItemIndex = index;
  }
  /** Cleans up the key manager. */
  destroy() {
    this._typeaheadSubscription.unsubscribe();
    this._itemChangesSubscription?.unsubscribe();
    this._letterKeyStream.complete();
    this.tabOut.complete();
    this.change.complete();
    this._pressedLetters = [];
  }
  /**
   * This method sets the active item, given a list of items and the delta between the
   * currently active item and the new active item. It will calculate differently
   * depending on whether wrap mode is turned on.
   */
  _setActiveItemByDelta(delta) {
    this._wrap ? this._setActiveInWrapMode(delta) : this._setActiveInDefaultMode(delta);
  }
  /**
   * Sets the active item properly given "wrap" mode. In other words, it will continue to move
   * down the list until it finds an item that is not disabled, and it will wrap if it
   * encounters either end of the list.
   */
  _setActiveInWrapMode(delta) {
    const items = this._getItemsArray();
    for (let i = 1; i <= items.length; i++) {
      const index = (this._activeItemIndex + delta * i + items.length) % items.length;
      const item = items[index];
      if (!this._skipPredicateFn(item)) {
        this.setActiveItem(index);
        return;
      }
    }
  }
  /**
   * Sets the active item properly given the default mode. In other words, it will
   * continue to move down the list until it finds an item that is not disabled. If
   * it encounters either end of the list, it will stop and not wrap.
   */
  _setActiveInDefaultMode(delta) {
    this._setActiveItemByIndex(this._activeItemIndex + delta, delta);
  }
  /**
   * Sets the active item to the first enabled item starting at the index specified. If the
   * item is disabled, it will move in the fallbackDelta direction until it either
   * finds an enabled item or encounters the end of the list.
   */
  _setActiveItemByIndex(index, fallbackDelta) {
    const items = this._getItemsArray();
    if (!items[index]) {
      return;
    }
    while (this._skipPredicateFn(items[index])) {
      index += fallbackDelta;
      if (!items[index]) {
        return;
      }
    }
    this.setActiveItem(index);
  }
  /** Returns the items as an array. */
  _getItemsArray() {
    return this._items instanceof _angular_core__WEBPACK_IMPORTED_MODULE_0__.QueryList ? this._items.toArray() : this._items;
  }
}
class ActiveDescendantKeyManager extends ListKeyManager {
  setActiveItem(index) {
    if (this.activeItem) {
      this.activeItem.setInactiveStyles();
    }
    super.setActiveItem(index);
    if (this.activeItem) {
      this.activeItem.setActiveStyles();
    }
  }
}
class FocusKeyManager extends ListKeyManager {
  constructor() {
    super(...arguments);
    this._origin = 'program';
  }
  /**
   * Sets the focus origin that will be passed in to the items for any subsequent `focus` calls.
   * @param origin Focus origin to be used when focusing items.
   */
  setFocusOrigin(origin) {
    this._origin = origin;
    return this;
  }
  setActiveItem(item) {
    super.setActiveItem(item);
    if (this.activeItem) {
      this.activeItem.focus(this._origin);
    }
  }
}

/**
 * Configuration for the isFocusable method.
 */
class IsFocusableConfig {
  constructor() {
    /**
     * Whether to count an element as focusable even if it is not currently visible.
     */
    this.ignoreVisibility = false;
  }
}
// The InteractivityChecker leans heavily on the ally.js accessibility utilities.
// Methods like `isTabbable` are only covering specific edge-cases for the browsers which are
// supported.
/**
 * Utility for checking the interactivity of an element, such as whether is is focusable or
 * tabbable.
 */
let InteractivityChecker = /*#__PURE__*/(() => {
  var _class2;
  class InteractivityChecker {
    constructor(_platform) {
      this._platform = _platform;
    }
    /**
     * Gets whether an element is disabled.
     *
     * @param element Element to be checked.
     * @returns Whether the element is disabled.
     */
    isDisabled(element) {
      // This does not capture some cases, such as a non-form control with a disabled attribute or
      // a form control inside of a disabled form, but should capture the most common cases.
      return element.hasAttribute('disabled');
    }
    /**
     * Gets whether an element is visible for the purposes of interactivity.
     *
     * This will capture states like `display: none` and `visibility: hidden`, but not things like
     * being clipped by an `overflow: hidden` parent or being outside the viewport.
     *
     * @returns Whether the element is visible.
     */
    isVisible(element) {
      return hasGeometry(element) && getComputedStyle(element).visibility === 'visible';
    }
    /**
     * Gets whether an element can be reached via Tab key.
     * Assumes that the element has already been checked with isFocusable.
     *
     * @param element Element to be checked.
     * @returns Whether the element is tabbable.
     */
    isTabbable(element) {
      // Nothing is tabbable on the server 😎
      if (!this._platform.isBrowser) {
        return false;
      }
      const frameElement = getFrameElement(getWindow(element));
      if (frameElement) {
        // Frame elements inherit their tabindex onto all child elements.
        if (getTabIndexValue(frameElement) === -1) {
          return false;
        }
        // Browsers disable tabbing to an element inside of an invisible frame.
        if (!this.isVisible(frameElement)) {
          return false;
        }
      }
      let nodeName = element.nodeName.toLowerCase();
      let tabIndexValue = getTabIndexValue(element);
      if (element.hasAttribute('contenteditable')) {
        return tabIndexValue !== -1;
      }
      if (nodeName === 'iframe' || nodeName === 'object') {
        // The frame or object's content may be tabbable depending on the content, but it's
        // not possibly to reliably detect the content of the frames. We always consider such
        // elements as non-tabbable.
        return false;
      }
      // In iOS, the browser only considers some specific elements as tabbable.
      if (this._platform.WEBKIT && this._platform.IOS && !isPotentiallyTabbableIOS(element)) {
        return false;
      }
      if (nodeName === 'audio') {
        // Audio elements without controls enabled are never tabbable, regardless
        // of the tabindex attribute explicitly being set.
        if (!element.hasAttribute('controls')) {
          return false;
        }
        // Audio elements with controls are by default tabbable unless the
        // tabindex attribute is set to `-1` explicitly.
        return tabIndexValue !== -1;
      }
      if (nodeName === 'video') {
        // For all video elements, if the tabindex attribute is set to `-1`, the video
        // is not tabbable. Note: We cannot rely on the default `HTMLElement.tabIndex`
        // property as that one is set to `-1` in Chrome, Edge and Safari v13.1. The
        // tabindex attribute is the source of truth here.
        if (tabIndexValue === -1) {
          return false;
        }
        // If the tabindex is explicitly set, and not `-1` (as per check before), the
        // video element is always tabbable (regardless of whether it has controls or not).
        if (tabIndexValue !== null) {
          return true;
        }
        // Otherwise (when no explicit tabindex is set), a video is only tabbable if it
        // has controls enabled. Firefox is special as videos are always tabbable regardless
        // of whether there are controls or not.
        return this._platform.FIREFOX || element.hasAttribute('controls');
      }
      return element.tabIndex >= 0;
    }
    /**
     * Gets whether an element can be focused by the user.
     *
     * @param element Element to be checked.
     * @param config The config object with options to customize this method's behavior
     * @returns Whether the element is focusable.
     */
    isFocusable(element, config) {
      // Perform checks in order of left to most expensive.
      // Again, naive approach that does not capture many edge cases and browser quirks.
      return isPotentiallyFocusable(element) && !this.isDisabled(element) && (config?.ignoreVisibility || this.isVisible(element));
    }
  }
  _class2 = InteractivityChecker;
  _class2.ɵfac = function _class2_Factory(t) {
    return new (t || _class2)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_2__.Platform));
  };
  _class2.ɵprov = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
    token: _class2,
    factory: _class2.ɵfac,
    providedIn: 'root'
  });
  return InteractivityChecker;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
/**
 * Returns the frame element from a window object. Since browsers like MS Edge throw errors if
 * the frameElement property is being accessed from a different host address, this property
 * should be accessed carefully.
 */
function getFrameElement(window) {
  try {
    return window.frameElement;
  } catch {
    return null;
  }
}
/** Checks whether the specified element has any geometry / rectangles. */
function hasGeometry(element) {
  // Use logic from jQuery to check for an invisible element.
  // See https://github.com/jquery/jquery/blob/master/src/css/hiddenVisibleSelectors.js#L12
  return !!(element.offsetWidth || element.offsetHeight || typeof element.getClientRects === 'function' && element.getClientRects().length);
}
/** Gets whether an element's  */
function isNativeFormElement(element) {
  let nodeName = element.nodeName.toLowerCase();
  return nodeName === 'input' || nodeName === 'select' || nodeName === 'button' || nodeName === 'textarea';
}
/** Gets whether an element is an `<input type="hidden">`. */
function isHiddenInput(element) {
  return isInputElement(element) && element.type == 'hidden';
}
/** Gets whether an element is an anchor that has an href attribute. */
function isAnchorWithHref(element) {
  return isAnchorElement(element) && element.hasAttribute('href');
}
/** Gets whether an element is an input element. */
function isInputElement(element) {
  return element.nodeName.toLowerCase() == 'input';
}
/** Gets whether an element is an anchor element. */
function isAnchorElement(element) {
  return element.nodeName.toLowerCase() == 'a';
}
/** Gets whether an element has a valid tabindex. */
function hasValidTabIndex(element) {
  if (!element.hasAttribute('tabindex') || element.tabIndex === undefined) {
    return false;
  }
  let tabIndex = element.getAttribute('tabindex');
  return !!(tabIndex && !isNaN(parseInt(tabIndex, 10)));
}
/**
 * Returns the parsed tabindex from the element attributes instead of returning the
 * evaluated tabindex from the browsers defaults.
 */
function getTabIndexValue(element) {
  if (!hasValidTabIndex(element)) {
    return null;
  }
  // See browser issue in Gecko https://bugzilla.mozilla.org/show_bug.cgi?id=1128054
  const tabIndex = parseInt(element.getAttribute('tabindex') || '', 10);
  return isNaN(tabIndex) ? -1 : tabIndex;
}
/** Checks whether the specified element is potentially tabbable on iOS */
function isPotentiallyTabbableIOS(element) {
  let nodeName = element.nodeName.toLowerCase();
  let inputType = nodeName === 'input' && element.type;
  return inputType === 'text' || inputType === 'password' || nodeName === 'select' || nodeName === 'textarea';
}
/**
 * Gets whether an element is potentially focusable without taking current visible/disabled state
 * into account.
 */
function isPotentiallyFocusable(element) {
  // Inputs are potentially focusable *unless* they're type="hidden".
  if (isHiddenInput(element)) {
    return false;
  }
  return isNativeFormElement(element) || isAnchorWithHref(element) || element.hasAttribute('contenteditable') || hasValidTabIndex(element);
}
/** Gets the parent window of a DOM node with regards of being inside of an iframe. */
function getWindow(node) {
  // ownerDocument is null if `node` itself *is* a document.
  return node.ownerDocument && node.ownerDocument.defaultView || window;
}

/**
 * Class that allows for trapping focus within a DOM element.
 *
 * This class currently uses a relatively simple approach to focus trapping.
 * It assumes that the tab order is the same as DOM order, which is not necessarily true.
 * Things like `tabIndex > 0`, flex `order`, and shadow roots can cause the two to be misaligned.
 *
 * @deprecated Use `ConfigurableFocusTrap` instead.
 * @breaking-change 11.0.0
 */
class FocusTrap {
  /** Whether the focus trap is active. */
  get enabled() {
    return this._enabled;
  }
  set enabled(value) {
    this._enabled = value;
    if (this._startAnchor && this._endAnchor) {
      this._toggleAnchorTabIndex(value, this._startAnchor);
      this._toggleAnchorTabIndex(value, this._endAnchor);
    }
  }
  constructor(_element, _checker, _ngZone, _document, deferAnchors = false) {
    this._element = _element;
    this._checker = _checker;
    this._ngZone = _ngZone;
    this._document = _document;
    this._hasAttached = false;
    // Event listeners for the anchors. Need to be regular functions so that we can unbind them later.
    this.startAnchorListener = () => this.focusLastTabbableElement();
    this.endAnchorListener = () => this.focusFirstTabbableElement();
    this._enabled = true;
    if (!deferAnchors) {
      this.attachAnchors();
    }
  }
  /** Destroys the focus trap by cleaning up the anchors. */
  destroy() {
    const startAnchor = this._startAnchor;
    const endAnchor = this._endAnchor;
    if (startAnchor) {
      startAnchor.removeEventListener('focus', this.startAnchorListener);
      startAnchor.remove();
    }
    if (endAnchor) {
      endAnchor.removeEventListener('focus', this.endAnchorListener);
      endAnchor.remove();
    }
    this._startAnchor = this._endAnchor = null;
    this._hasAttached = false;
  }
  /**
   * Inserts the anchors into the DOM. This is usually done automatically
   * in the constructor, but can be deferred for cases like directives with `*ngIf`.
   * @returns Whether the focus trap managed to attach successfully. This may not be the case
   * if the target element isn't currently in the DOM.
   */
  attachAnchors() {
    // If we're not on the browser, there can be no focus to trap.
    if (this._hasAttached) {
      return true;
    }
    this._ngZone.runOutsideAngular(() => {
      if (!this._startAnchor) {
        this._startAnchor = this._createAnchor();
        this._startAnchor.addEventListener('focus', this.startAnchorListener);
      }
      if (!this._endAnchor) {
        this._endAnchor = this._createAnchor();
        this._endAnchor.addEventListener('focus', this.endAnchorListener);
      }
    });
    if (this._element.parentNode) {
      this._element.parentNode.insertBefore(this._startAnchor, this._element);
      this._element.parentNode.insertBefore(this._endAnchor, this._element.nextSibling);
      this._hasAttached = true;
    }
    return this._hasAttached;
  }
  /**
   * Waits for the zone to stabilize, then focuses the first tabbable element.
   * @returns Returns a promise that resolves with a boolean, depending
   * on whether focus was moved successfully.
   */
  focusInitialElementWhenReady(options) {
    return new Promise(resolve => {
      this._executeOnStable(() => resolve(this.focusInitialElement(options)));
    });
  }
  /**
   * Waits for the zone to stabilize, then focuses
   * the first tabbable element within the focus trap region.
   * @returns Returns a promise that resolves with a boolean, depending
   * on whether focus was moved successfully.
   */
  focusFirstTabbableElementWhenReady(options) {
    return new Promise(resolve => {
      this._executeOnStable(() => resolve(this.focusFirstTabbableElement(options)));
    });
  }
  /**
   * Waits for the zone to stabilize, then focuses
   * the last tabbable element within the focus trap region.
   * @returns Returns a promise that resolves with a boolean, depending
   * on whether focus was moved successfully.
   */
  focusLastTabbableElementWhenReady(options) {
    return new Promise(resolve => {
      this._executeOnStable(() => resolve(this.focusLastTabbableElement(options)));
    });
  }
  /**
   * Get the specified boundary element of the trapped region.
   * @param bound The boundary to get (start or end of trapped region).
   * @returns The boundary element.
   */
  _getRegionBoundary(bound) {
    // Contains the deprecated version of selector, for temporary backwards comparability.
    const markers = this._element.querySelectorAll(`[cdk-focus-region-${bound}], ` + `[cdkFocusRegion${bound}], ` + `[cdk-focus-${bound}]`);
    if (typeof ngDevMode === 'undefined' || ngDevMode) {
      for (let i = 0; i < markers.length; i++) {
        // @breaking-change 8.0.0
        if (markers[i].hasAttribute(`cdk-focus-${bound}`)) {
          console.warn(`Found use of deprecated attribute 'cdk-focus-${bound}', ` + `use 'cdkFocusRegion${bound}' instead. The deprecated ` + `attribute will be removed in 8.0.0.`, markers[i]);
        } else if (markers[i].hasAttribute(`cdk-focus-region-${bound}`)) {
          console.warn(`Found use of deprecated attribute 'cdk-focus-region-${bound}', ` + `use 'cdkFocusRegion${bound}' instead. The deprecated attribute ` + `will be removed in 8.0.0.`, markers[i]);
        }
      }
    }
    if (bound == 'start') {
      return markers.length ? markers[0] : this._getFirstTabbableElement(this._element);
    }
    return markers.length ? markers[markers.length - 1] : this._getLastTabbableElement(this._element);
  }
  /**
   * Focuses the element that should be focused when the focus trap is initialized.
   * @returns Whether focus was moved successfully.
   */
  focusInitialElement(options) {
    // Contains the deprecated version of selector, for temporary backwards comparability.
    const redirectToElement = this._element.querySelector(`[cdk-focus-initial], ` + `[cdkFocusInitial]`);
    if (redirectToElement) {
      // @breaking-change 8.0.0
      if ((typeof ngDevMode === 'undefined' || ngDevMode) && redirectToElement.hasAttribute(`cdk-focus-initial`)) {
        console.warn(`Found use of deprecated attribute 'cdk-focus-initial', ` + `use 'cdkFocusInitial' instead. The deprecated attribute ` + `will be removed in 8.0.0`, redirectToElement);
      }
      // Warn the consumer if the element they've pointed to
      // isn't focusable, when not in production mode.
      if ((typeof ngDevMode === 'undefined' || ngDevMode) && !this._checker.isFocusable(redirectToElement)) {
        console.warn(`Element matching '[cdkFocusInitial]' is not focusable.`, redirectToElement);
      }
      if (!this._checker.isFocusable(redirectToElement)) {
        const focusableChild = this._getFirstTabbableElement(redirectToElement);
        focusableChild?.focus(options);
        return !!focusableChild;
      }
      redirectToElement.focus(options);
      return true;
    }
    return this.focusFirstTabbableElement(options);
  }
  /**
   * Focuses the first tabbable element within the focus trap region.
   * @returns Whether focus was moved successfully.
   */
  focusFirstTabbableElement(options) {
    const redirectToElement = this._getRegionBoundary('start');
    if (redirectToElement) {
      redirectToElement.focus(options);
    }
    return !!redirectToElement;
  }
  /**
   * Focuses the last tabbable element within the focus trap region.
   * @returns Whether focus was moved successfully.
   */
  focusLastTabbableElement(options) {
    const redirectToElement = this._getRegionBoundary('end');
    if (redirectToElement) {
      redirectToElement.focus(options);
    }
    return !!redirectToElement;
  }
  /**
   * Checks whether the focus trap has successfully been attached.
   */
  hasAttached() {
    return this._hasAttached;
  }
  /** Get the first tabbable element from a DOM subtree (inclusive). */
  _getFirstTabbableElement(root) {
    if (this._checker.isFocusable(root) && this._checker.isTabbable(root)) {
      return root;
    }
    const children = root.children;
    for (let i = 0; i < children.length; i++) {
      const tabbableChild = children[i].nodeType === this._document.ELEMENT_NODE ? this._getFirstTabbableElement(children[i]) : null;
      if (tabbableChild) {
        return tabbableChild;
      }
    }
    return null;
  }
  /** Get the last tabbable element from a DOM subtree (inclusive). */
  _getLastTabbableElement(root) {
    if (this._checker.isFocusable(root) && this._checker.isTabbable(root)) {
      return root;
    }
    // Iterate in reverse DOM order.
    const children = root.children;
    for (let i = children.length - 1; i >= 0; i--) {
      const tabbableChild = children[i].nodeType === this._document.ELEMENT_NODE ? this._getLastTabbableElement(children[i]) : null;
      if (tabbableChild) {
        return tabbableChild;
      }
    }
    return null;
  }
  /** Creates an anchor element. */
  _createAnchor() {
    const anchor = this._document.createElement('div');
    this._toggleAnchorTabIndex(this._enabled, anchor);
    anchor.classList.add('cdk-visually-hidden');
    anchor.classList.add('cdk-focus-trap-anchor');
    anchor.setAttribute('aria-hidden', 'true');
    return anchor;
  }
  /**
   * Toggles the `tabindex` of an anchor, based on the enabled state of the focus trap.
   * @param isEnabled Whether the focus trap is enabled.
   * @param anchor Anchor on which to toggle the tabindex.
   */
  _toggleAnchorTabIndex(isEnabled, anchor) {
    // Remove the tabindex completely, rather than setting it to -1, because if the
    // element has a tabindex, the user might still hit it when navigating with the arrow keys.
    isEnabled ? anchor.setAttribute('tabindex', '0') : anchor.removeAttribute('tabindex');
  }
  /**
   * Toggles the`tabindex` of both anchors to either trap Tab focus or allow it to escape.
   * @param enabled: Whether the anchors should trap Tab.
   */
  toggleAnchors(enabled) {
    if (this._startAnchor && this._endAnchor) {
      this._toggleAnchorTabIndex(enabled, this._startAnchor);
      this._toggleAnchorTabIndex(enabled, this._endAnchor);
    }
  }
  /** Executes a function when the zone is stable. */
  _executeOnStable(fn) {
    if (this._ngZone.isStable) {
      fn();
    } else {
      this._ngZone.onStable.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.take)(1)).subscribe(fn);
    }
  }
}
/**
 * Factory that allows easy instantiation of focus traps.
 * @deprecated Use `ConfigurableFocusTrapFactory` instead.
 * @breaking-change 11.0.0
 */
let FocusTrapFactory = /*#__PURE__*/(() => {
  var _class3;
  class FocusTrapFactory {
    constructor(_checker, _ngZone, _document) {
      this._checker = _checker;
      this._ngZone = _ngZone;
      this._document = _document;
    }
    /**
     * Creates a focus-trapped region around the given element.
     * @param element The element around which focus will be trapped.
     * @param deferCaptureElements Defers the creation of focus-capturing elements to be done
     *     manually by the user.
     * @returns The created focus trap instance.
     */
    create(element, deferCaptureElements = false) {
      return new FocusTrap(element, this._checker, this._ngZone, this._document, deferCaptureElements);
    }
  }
  _class3 = FocusTrapFactory;
  _class3.ɵfac = function _class3_Factory(t) {
    return new (t || _class3)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](InteractivityChecker), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.NgZone), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common__WEBPACK_IMPORTED_MODULE_1__.DOCUMENT));
  };
  _class3.ɵprov = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
    token: _class3,
    factory: _class3.ɵfac,
    providedIn: 'root'
  });
  return FocusTrapFactory;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
/** Directive for trapping focus within a region. */
let CdkTrapFocus = /*#__PURE__*/(() => {
  var _class4;
  class CdkTrapFocus {
    /** Whether the focus trap is active. */
    get enabled() {
      return this.focusTrap.enabled;
    }
    set enabled(value) {
      this.focusTrap.enabled = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_6__.coerceBooleanProperty)(value);
    }
    /**
     * Whether the directive should automatically move focus into the trapped region upon
     * initialization and return focus to the previous activeElement upon destruction.
     */
    get autoCapture() {
      return this._autoCapture;
    }
    set autoCapture(value) {
      this._autoCapture = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_6__.coerceBooleanProperty)(value);
    }
    constructor(_elementRef, _focusTrapFactory,
    /**
     * @deprecated No longer being used. To be removed.
     * @breaking-change 13.0.0
     */
    _document) {
      this._elementRef = _elementRef;
      this._focusTrapFactory = _focusTrapFactory;
      /** Previously focused element to restore focus to upon destroy when using autoCapture. */
      this._previouslyFocusedElement = null;
      this.focusTrap = this._focusTrapFactory.create(this._elementRef.nativeElement, true);
    }
    ngOnDestroy() {
      this.focusTrap.destroy();
      // If we stored a previously focused element when using autoCapture, return focus to that
      // element now that the trapped region is being destroyed.
      if (this._previouslyFocusedElement) {
        this._previouslyFocusedElement.focus();
        this._previouslyFocusedElement = null;
      }
    }
    ngAfterContentInit() {
      this.focusTrap.attachAnchors();
      if (this.autoCapture) {
        this._captureFocus();
      }
    }
    ngDoCheck() {
      if (!this.focusTrap.hasAttached()) {
        this.focusTrap.attachAnchors();
      }
    }
    ngOnChanges(changes) {
      const autoCaptureChange = changes['autoCapture'];
      if (autoCaptureChange && !autoCaptureChange.firstChange && this.autoCapture && this.focusTrap.hasAttached()) {
        this._captureFocus();
      }
    }
    _captureFocus() {
      this._previouslyFocusedElement = (0,_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_2__._getFocusedElementPierceShadowDom)();
      this.focusTrap.focusInitialElementWhenReady();
    }
  }
  _class4 = CdkTrapFocus;
  _class4.ɵfac = function _class4_Factory(t) {
    return new (t || _class4)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](FocusTrapFactory), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_1__.DOCUMENT));
  };
  _class4.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
    type: _class4,
    selectors: [["", "cdkTrapFocus", ""]],
    inputs: {
      enabled: ["cdkTrapFocus", "enabled"],
      autoCapture: ["cdkTrapFocusAutoCapture", "autoCapture"]
    },
    exportAs: ["cdkTrapFocus"],
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵNgOnChangesFeature"]]
  });
  return CdkTrapFocus;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();

/**
 * Class that allows for trapping focus within a DOM element.
 *
 * This class uses a strategy pattern that determines how it traps focus.
 * See FocusTrapInertStrategy.
 */
class ConfigurableFocusTrap extends FocusTrap {
  /** Whether the FocusTrap is enabled. */
  get enabled() {
    return this._enabled;
  }
  set enabled(value) {
    this._enabled = value;
    if (this._enabled) {
      this._focusTrapManager.register(this);
    } else {
      this._focusTrapManager.deregister(this);
    }
  }
  constructor(_element, _checker, _ngZone, _document, _focusTrapManager, _inertStrategy, config) {
    super(_element, _checker, _ngZone, _document, config.defer);
    this._focusTrapManager = _focusTrapManager;
    this._inertStrategy = _inertStrategy;
    this._focusTrapManager.register(this);
  }
  /** Notifies the FocusTrapManager that this FocusTrap will be destroyed. */
  destroy() {
    this._focusTrapManager.deregister(this);
    super.destroy();
  }
  /** @docs-private Implemented as part of ManagedFocusTrap. */
  _enable() {
    this._inertStrategy.preventFocus(this);
    this.toggleAnchors(true);
  }
  /** @docs-private Implemented as part of ManagedFocusTrap. */
  _disable() {
    this._inertStrategy.allowFocus(this);
    this.toggleAnchors(false);
  }
}

/** The injection token used to specify the inert strategy. */
const FOCUS_TRAP_INERT_STRATEGY = /*#__PURE__*/new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken('FOCUS_TRAP_INERT_STRATEGY');

/**
 * Lightweight FocusTrapInertStrategy that adds a document focus event
 * listener to redirect focus back inside the FocusTrap.
 */
class EventListenerFocusTrapInertStrategy {
  constructor() {
    /** Focus event handler. */
    this._listener = null;
  }
  /** Adds a document event listener that keeps focus inside the FocusTrap. */
  preventFocus(focusTrap) {
    // Ensure there's only one listener per document
    if (this._listener) {
      focusTrap._document.removeEventListener('focus', this._listener, true);
    }
    this._listener = e => this._trapFocus(focusTrap, e);
    focusTrap._ngZone.runOutsideAngular(() => {
      focusTrap._document.addEventListener('focus', this._listener, true);
    });
  }
  /** Removes the event listener added in preventFocus. */
  allowFocus(focusTrap) {
    if (!this._listener) {
      return;
    }
    focusTrap._document.removeEventListener('focus', this._listener, true);
    this._listener = null;
  }
  /**
   * Refocuses the first element in the FocusTrap if the focus event target was outside
   * the FocusTrap.
   *
   * This is an event listener callback. The event listener is added in runOutsideAngular,
   * so all this code runs outside Angular as well.
   */
  _trapFocus(focusTrap, event) {
    const target = event.target;
    const focusTrapRoot = focusTrap._element;
    // Don't refocus if target was in an overlay, because the overlay might be associated
    // with an element inside the FocusTrap, ex. mat-select.
    if (target && !focusTrapRoot.contains(target) && !target.closest?.('div.cdk-overlay-pane')) {
      // Some legacy FocusTrap usages have logic that focuses some element on the page
      // just before FocusTrap is destroyed. For backwards compatibility, wait
      // to be sure FocusTrap is still enabled before refocusing.
      setTimeout(() => {
        // Check whether focus wasn't put back into the focus trap while the timeout was pending.
        if (focusTrap.enabled && !focusTrapRoot.contains(focusTrap._document.activeElement)) {
          focusTrap.focusFirstTabbableElement();
        }
      });
    }
  }
}

/** Injectable that ensures only the most recently enabled FocusTrap is active. */
let FocusTrapManager = /*#__PURE__*/(() => {
  var _class5;
  class FocusTrapManager {
    constructor() {
      // A stack of the FocusTraps on the page. Only the FocusTrap at the
      // top of the stack is active.
      this._focusTrapStack = [];
    }
    /**
     * Disables the FocusTrap at the top of the stack, and then pushes
     * the new FocusTrap onto the stack.
     */
    register(focusTrap) {
      // Dedupe focusTraps that register multiple times.
      this._focusTrapStack = this._focusTrapStack.filter(ft => ft !== focusTrap);
      let stack = this._focusTrapStack;
      if (stack.length) {
        stack[stack.length - 1]._disable();
      }
      stack.push(focusTrap);
      focusTrap._enable();
    }
    /**
     * Removes the FocusTrap from the stack, and activates the
     * FocusTrap that is the new top of the stack.
     */
    deregister(focusTrap) {
      focusTrap._disable();
      const stack = this._focusTrapStack;
      const i = stack.indexOf(focusTrap);
      if (i !== -1) {
        stack.splice(i, 1);
        if (stack.length) {
          stack[stack.length - 1]._enable();
        }
      }
    }
  }
  _class5 = FocusTrapManager;
  _class5.ɵfac = function _class5_Factory(t) {
    return new (t || _class5)();
  };
  _class5.ɵprov = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
    token: _class5,
    factory: _class5.ɵfac,
    providedIn: 'root'
  });
  return FocusTrapManager;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();

/** Factory that allows easy instantiation of configurable focus traps. */
let ConfigurableFocusTrapFactory = /*#__PURE__*/(() => {
  var _class6;
  class ConfigurableFocusTrapFactory {
    constructor(_checker, _ngZone, _focusTrapManager, _document, _inertStrategy) {
      this._checker = _checker;
      this._ngZone = _ngZone;
      this._focusTrapManager = _focusTrapManager;
      this._document = _document;
      // TODO split up the strategies into different modules, similar to DateAdapter.
      this._inertStrategy = _inertStrategy || new EventListenerFocusTrapInertStrategy();
    }
    create(element, config = {
      defer: false
    }) {
      let configObject;
      if (typeof config === 'boolean') {
        configObject = {
          defer: config
        };
      } else {
        configObject = config;
      }
      return new ConfigurableFocusTrap(element, this._checker, this._ngZone, this._document, this._focusTrapManager, this._inertStrategy, configObject);
    }
  }
  _class6 = ConfigurableFocusTrapFactory;
  _class6.ɵfac = function _class6_Factory(t) {
    return new (t || _class6)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](InteractivityChecker), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.NgZone), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](FocusTrapManager), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common__WEBPACK_IMPORTED_MODULE_1__.DOCUMENT), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](FOCUS_TRAP_INERT_STRATEGY, 8));
  };
  _class6.ɵprov = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
    token: _class6,
    factory: _class6.ɵfac,
    providedIn: 'root'
  });
  return ConfigurableFocusTrapFactory;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();

/** Gets whether an event could be a faked `mousedown` event dispatched by a screen reader. */
function isFakeMousedownFromScreenReader(event) {
  // Some screen readers will dispatch a fake `mousedown` event when pressing enter or space on
  // a clickable element. We can distinguish these events when both `offsetX` and `offsetY` are
  // zero or `event.buttons` is zero, depending on the browser:
  // - `event.buttons` works on Firefox, but fails on Chrome.
  // - `offsetX` and `offsetY` work on Chrome, but fail on Firefox.
  // Note that there's an edge case where the user could click the 0x0 spot of the
  // screen themselves, but that is unlikely to contain interactive elements.
  return event.buttons === 0 || event.offsetX === 0 && event.offsetY === 0;
}
/** Gets whether an event could be a faked `touchstart` event dispatched by a screen reader. */
function isFakeTouchstartFromScreenReader(event) {
  const touch = event.touches && event.touches[0] || event.changedTouches && event.changedTouches[0];
  // A fake `touchstart` can be distinguished from a real one by looking at the `identifier`
  // which is typically >= 0 on a real device versus -1 from a screen reader. Just to be safe,
  // we can also look at `radiusX` and `radiusY`. This behavior was observed against a Windows 10
  // device with a touch screen running NVDA v2020.4 and Firefox 85 or Chrome 88.
  return !!touch && touch.identifier === -1 && (touch.radiusX == null || touch.radiusX === 1) && (touch.radiusY == null || touch.radiusY === 1);
}

/**
 * Injectable options for the InputModalityDetector. These are shallowly merged with the default
 * options.
 */
const INPUT_MODALITY_DETECTOR_OPTIONS = /*#__PURE__*/new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken('cdk-input-modality-detector-options');
/**
 * Default options for the InputModalityDetector.
 *
 * Modifier keys are ignored by default (i.e. when pressed won't cause the service to detect
 * keyboard input modality) for two reasons:
 *
 * 1. Modifier keys are commonly used with mouse to perform actions such as 'right click' or 'open
 *    in new tab', and are thus less representative of actual keyboard interaction.
 * 2. VoiceOver triggers some keyboard events when linearly navigating with Control + Option (but
 *    confusingly not with Caps Lock). Thus, to have parity with other screen readers, we ignore
 *    these keys so as to not update the input modality.
 *
 * Note that we do not by default ignore the right Meta key on Safari because it has the same key
 * code as the ContextMenu key on other browsers. When we switch to using event.key, we can
 * distinguish between the two.
 */
const INPUT_MODALITY_DETECTOR_DEFAULT_OPTIONS = {
  ignoreKeys: [_angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_5__.ALT, _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_5__.CONTROL, _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_5__.MAC_META, _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_5__.META, _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_5__.SHIFT]
};
/**
 * The amount of time needed to pass after a touchstart event in order for a subsequent mousedown
 * event to be attributed as mouse and not touch.
 *
 * This is the value used by AngularJS Material. Through trial and error (on iPhone 6S) they found
 * that a value of around 650ms seems appropriate.
 */
const TOUCH_BUFFER_MS = 650;
/**
 * Event listener options that enable capturing and also mark the listener as passive if the browser
 * supports it.
 */
const modalityEventListenerOptions = /*#__PURE__*/(0,_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_2__.normalizePassiveListenerOptions)({
  passive: true,
  capture: true
});
/**
 * Service that detects the user's input modality.
 *
 * This service does not update the input modality when a user navigates with a screen reader
 * (e.g. linear navigation with VoiceOver, object navigation / browse mode with NVDA, virtual PC
 * cursor mode with JAWS). This is in part due to technical limitations (i.e. keyboard events do not
 * fire as expected in these modes) but is also arguably the correct behavior. Navigating with a
 * screen reader is akin to visually scanning a page, and should not be interpreted as actual user
 * input interaction.
 *
 * When a user is not navigating but *interacting* with a screen reader, this service attempts to
 * update the input modality to keyboard, but in general this service's behavior is largely
 * undefined.
 */
let InputModalityDetector = /*#__PURE__*/(() => {
  var _class7;
  class InputModalityDetector {
    /** The most recently detected input modality. */
    get mostRecentModality() {
      return this._modality.value;
    }
    constructor(_platform, ngZone, document, options) {
      this._platform = _platform;
      /**
       * The most recently detected input modality event target. Is null if no input modality has been
       * detected or if the associated event target is null for some unknown reason.
       */
      this._mostRecentTarget = null;
      /** The underlying BehaviorSubject that emits whenever an input modality is detected. */
      this._modality = new rxjs__WEBPACK_IMPORTED_MODULE_3__.BehaviorSubject(null);
      /**
       * The timestamp of the last touch input modality. Used to determine whether mousedown events
       * should be attributed to mouse or touch.
       */
      this._lastTouchMs = 0;
      /**
       * Handles keydown events. Must be an arrow function in order to preserve the context when it gets
       * bound.
       */
      this._onKeydown = event => {
        // If this is one of the keys we should ignore, then ignore it and don't update the input
        // modality to keyboard.
        if (this._options?.ignoreKeys?.some(keyCode => keyCode === event.keyCode)) {
          return;
        }
        this._modality.next('keyboard');
        this._mostRecentTarget = (0,_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_2__._getEventTarget)(event);
      };
      /**
       * Handles mousedown events. Must be an arrow function in order to preserve the context when it
       * gets bound.
       */
      this._onMousedown = event => {
        // Touches trigger both touch and mouse events, so we need to distinguish between mouse events
        // that were triggered via mouse vs touch. To do so, check if the mouse event occurs closely
        // after the previous touch event.
        if (Date.now() - this._lastTouchMs < TOUCH_BUFFER_MS) {
          return;
        }
        // Fake mousedown events are fired by some screen readers when controls are activated by the
        // screen reader. Attribute them to keyboard input modality.
        this._modality.next(isFakeMousedownFromScreenReader(event) ? 'keyboard' : 'mouse');
        this._mostRecentTarget = (0,_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_2__._getEventTarget)(event);
      };
      /**
       * Handles touchstart events. Must be an arrow function in order to preserve the context when it
       * gets bound.
       */
      this._onTouchstart = event => {
        // Same scenario as mentioned in _onMousedown, but on touch screen devices, fake touchstart
        // events are fired. Again, attribute to keyboard input modality.
        if (isFakeTouchstartFromScreenReader(event)) {
          this._modality.next('keyboard');
          return;
        }
        // Store the timestamp of this touch event, as it's used to distinguish between mouse events
        // triggered via mouse vs touch.
        this._lastTouchMs = Date.now();
        this._modality.next('touch');
        this._mostRecentTarget = (0,_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_2__._getEventTarget)(event);
      };
      this._options = {
        ...INPUT_MODALITY_DETECTOR_DEFAULT_OPTIONS,
        ...options
      };
      // Skip the first emission as it's null.
      this.modalityDetected = this._modality.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.skip)(1));
      this.modalityChanged = this.modalityDetected.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.distinctUntilChanged)());
      // If we're not in a browser, this service should do nothing, as there's no relevant input
      // modality to detect.
      if (_platform.isBrowser) {
        ngZone.runOutsideAngular(() => {
          document.addEventListener('keydown', this._onKeydown, modalityEventListenerOptions);
          document.addEventListener('mousedown', this._onMousedown, modalityEventListenerOptions);
          document.addEventListener('touchstart', this._onTouchstart, modalityEventListenerOptions);
        });
      }
    }
    ngOnDestroy() {
      this._modality.complete();
      if (this._platform.isBrowser) {
        document.removeEventListener('keydown', this._onKeydown, modalityEventListenerOptions);
        document.removeEventListener('mousedown', this._onMousedown, modalityEventListenerOptions);
        document.removeEventListener('touchstart', this._onTouchstart, modalityEventListenerOptions);
      }
    }
  }
  _class7 = InputModalityDetector;
  _class7.ɵfac = function _class7_Factory(t) {
    return new (t || _class7)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_2__.Platform), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.NgZone), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common__WEBPACK_IMPORTED_MODULE_1__.DOCUMENT), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](INPUT_MODALITY_DETECTOR_OPTIONS, 8));
  };
  _class7.ɵprov = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
    token: _class7,
    factory: _class7.ɵfac,
    providedIn: 'root'
  });
  return InputModalityDetector;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
const LIVE_ANNOUNCER_ELEMENT_TOKEN = /*#__PURE__*/new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken('liveAnnouncerElement', {
  providedIn: 'root',
  factory: LIVE_ANNOUNCER_ELEMENT_TOKEN_FACTORY
});
/** @docs-private */
function LIVE_ANNOUNCER_ELEMENT_TOKEN_FACTORY() {
  return null;
}
/** Injection token that can be used to configure the default options for the LiveAnnouncer. */
const LIVE_ANNOUNCER_DEFAULT_OPTIONS = /*#__PURE__*/new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken('LIVE_ANNOUNCER_DEFAULT_OPTIONS');
let uniqueIds = 0;
let LiveAnnouncer = /*#__PURE__*/(() => {
  var _class8;
  class LiveAnnouncer {
    constructor(elementToken, _ngZone, _document, _defaultOptions) {
      this._ngZone = _ngZone;
      this._defaultOptions = _defaultOptions;
      // We inject the live element and document as `any` because the constructor signature cannot
      // reference browser globals (HTMLElement, Document) on non-browser environments, since having
      // a class decorator causes TypeScript to preserve the constructor signature types.
      this._document = _document;
      this._liveElement = elementToken || this._createLiveElement();
    }
    announce(message, ...args) {
      const defaultOptions = this._defaultOptions;
      let politeness;
      let duration;
      if (args.length === 1 && typeof args[0] === 'number') {
        duration = args[0];
      } else {
        [politeness, duration] = args;
      }
      this.clear();
      clearTimeout(this._previousTimeout);
      if (!politeness) {
        politeness = defaultOptions && defaultOptions.politeness ? defaultOptions.politeness : 'polite';
      }
      if (duration == null && defaultOptions) {
        duration = defaultOptions.duration;
      }
      // TODO: ensure changing the politeness works on all environments we support.
      this._liveElement.setAttribute('aria-live', politeness);
      if (this._liveElement.id) {
        this._exposeAnnouncerToModals(this._liveElement.id);
      }
      // This 100ms timeout is necessary for some browser + screen-reader combinations:
      // - Both JAWS and NVDA over IE11 will not announce anything without a non-zero timeout.
      // - With Chrome and IE11 with NVDA or JAWS, a repeated (identical) message won't be read a
      //   second time without clearing and then using a non-zero delay.
      // (using JAWS 17 at time of this writing).
      return this._ngZone.runOutsideAngular(() => {
        if (!this._currentPromise) {
          this._currentPromise = new Promise(resolve => this._currentResolve = resolve);
        }
        clearTimeout(this._previousTimeout);
        this._previousTimeout = setTimeout(() => {
          this._liveElement.textContent = message;
          if (typeof duration === 'number') {
            this._previousTimeout = setTimeout(() => this.clear(), duration);
          }
          this._currentResolve();
          this._currentPromise = this._currentResolve = undefined;
        }, 100);
        return this._currentPromise;
      });
    }
    /**
     * Clears the current text from the announcer element. Can be used to prevent
     * screen readers from reading the text out again while the user is going
     * through the page landmarks.
     */
    clear() {
      if (this._liveElement) {
        this._liveElement.textContent = '';
      }
    }
    ngOnDestroy() {
      clearTimeout(this._previousTimeout);
      this._liveElement?.remove();
      this._liveElement = null;
      this._currentResolve?.();
      this._currentPromise = this._currentResolve = undefined;
    }
    _createLiveElement() {
      const elementClass = 'cdk-live-announcer-element';
      const previousElements = this._document.getElementsByClassName(elementClass);
      const liveEl = this._document.createElement('div');
      // Remove any old containers. This can happen when coming in from a server-side-rendered page.
      for (let i = 0; i < previousElements.length; i++) {
        previousElements[i].remove();
      }
      liveEl.classList.add(elementClass);
      liveEl.classList.add('cdk-visually-hidden');
      liveEl.setAttribute('aria-atomic', 'true');
      liveEl.setAttribute('aria-live', 'polite');
      liveEl.id = `cdk-live-announcer-${uniqueIds++}`;
      this._document.body.appendChild(liveEl);
      return liveEl;
    }
    /**
     * Some browsers won't expose the accessibility node of the live announcer element if there is an
     * `aria-modal` and the live announcer is outside of it. This method works around the issue by
     * pointing the `aria-owns` of all modals to the live announcer element.
     */
    _exposeAnnouncerToModals(id) {
      // TODO(http://github.com/angular/components/issues/26853): consider de-duplicating this with
      // the `SnakBarContainer` and other usages.
      //
      // Note that the selector here is limited to CDK overlays at the moment in order to reduce the
      // section of the DOM we need to look through. This should cover all the cases we support, but
      // the selector can be expanded if it turns out to be too narrow.
      const modals = this._document.querySelectorAll('body > .cdk-overlay-container [aria-modal="true"]');
      for (let i = 0; i < modals.length; i++) {
        const modal = modals[i];
        const ariaOwns = modal.getAttribute('aria-owns');
        if (!ariaOwns) {
          modal.setAttribute('aria-owns', id);
        } else if (ariaOwns.indexOf(id) === -1) {
          modal.setAttribute('aria-owns', ariaOwns + ' ' + id);
        }
      }
    }
  }
  _class8 = LiveAnnouncer;
  _class8.ɵfac = function _class8_Factory(t) {
    return new (t || _class8)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](LIVE_ANNOUNCER_ELEMENT_TOKEN, 8), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.NgZone), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common__WEBPACK_IMPORTED_MODULE_1__.DOCUMENT), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](LIVE_ANNOUNCER_DEFAULT_OPTIONS, 8));
  };
  _class8.ɵprov = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
    token: _class8,
    factory: _class8.ɵfac,
    providedIn: 'root'
  });
  return LiveAnnouncer;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
/**
 * A directive that works similarly to aria-live, but uses the LiveAnnouncer to ensure compatibility
 * with a wider range of browsers and screen readers.
 */
let CdkAriaLive = /*#__PURE__*/(() => {
  var _class9;
  class CdkAriaLive {
    /** The aria-live politeness level to use when announcing messages. */
    get politeness() {
      return this._politeness;
    }
    set politeness(value) {
      this._politeness = value === 'off' || value === 'assertive' ? value : 'polite';
      if (this._politeness === 'off') {
        if (this._subscription) {
          this._subscription.unsubscribe();
          this._subscription = null;
        }
      } else if (!this._subscription) {
        this._subscription = this._ngZone.runOutsideAngular(() => {
          return this._contentObserver.observe(this._elementRef).subscribe(() => {
            // Note that we use textContent here, rather than innerText, in order to avoid a reflow.
            const elementText = this._elementRef.nativeElement.textContent;
            // The `MutationObserver` fires also for attribute
            // changes which we don't want to announce.
            if (elementText !== this._previousAnnouncedText) {
              this._liveAnnouncer.announce(elementText, this._politeness, this.duration);
              this._previousAnnouncedText = elementText;
            }
          });
        });
      }
    }
    constructor(_elementRef, _liveAnnouncer, _contentObserver, _ngZone) {
      this._elementRef = _elementRef;
      this._liveAnnouncer = _liveAnnouncer;
      this._contentObserver = _contentObserver;
      this._ngZone = _ngZone;
      this._politeness = 'polite';
    }
    ngOnDestroy() {
      if (this._subscription) {
        this._subscription.unsubscribe();
      }
    }
  }
  _class9 = CdkAriaLive;
  _class9.ɵfac = function _class9_Factory(t) {
    return new (t || _class9)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](LiveAnnouncer), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_cdk_observers__WEBPACK_IMPORTED_MODULE_7__.ContentObserver), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.NgZone));
  };
  _class9.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
    type: _class9,
    selectors: [["", "cdkAriaLive", ""]],
    inputs: {
      politeness: ["cdkAriaLive", "politeness"],
      duration: ["cdkAriaLiveDuration", "duration"]
    },
    exportAs: ["cdkAriaLive"]
  });
  return CdkAriaLive;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();

/** InjectionToken for FocusMonitorOptions. */
const FOCUS_MONITOR_DEFAULT_OPTIONS = /*#__PURE__*/new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken('cdk-focus-monitor-default-options');
/**
 * Event listener options that enable capturing and also
 * mark the listener as passive if the browser supports it.
 */
const captureEventListenerOptions = /*#__PURE__*/(0,_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_2__.normalizePassiveListenerOptions)({
  passive: true,
  capture: true
});
/** Monitors mouse and keyboard events to determine the cause of focus events. */
let FocusMonitor = /*#__PURE__*/(() => {
  var _class10;
  class FocusMonitor {
    constructor(_ngZone, _platform, _inputModalityDetector, /** @breaking-change 11.0.0 make document required */
    document, options) {
      this._ngZone = _ngZone;
      this._platform = _platform;
      this._inputModalityDetector = _inputModalityDetector;
      /** The focus origin that the next focus event is a result of. */
      this._origin = null;
      /** Whether the window has just been focused. */
      this._windowFocused = false;
      /**
       * Whether the origin was determined via a touch interaction. Necessary as properly attributing
       * focus events to touch interactions requires special logic.
       */
      this._originFromTouchInteraction = false;
      /** Map of elements being monitored to their info. */
      this._elementInfo = new Map();
      /** The number of elements currently being monitored. */
      this._monitoredElementCount = 0;
      /**
       * Keeps track of the root nodes to which we've currently bound a focus/blur handler,
       * as well as the number of monitored elements that they contain. We have to treat focus/blur
       * handlers differently from the rest of the events, because the browser won't emit events
       * to the document when focus moves inside of a shadow root.
       */
      this._rootNodeFocusListenerCount = new Map();
      /**
       * Event listener for `focus` events on the window.
       * Needs to be an arrow function in order to preserve the context when it gets bound.
       */
      this._windowFocusListener = () => {
        // Make a note of when the window regains focus, so we can
        // restore the origin info for the focused element.
        this._windowFocused = true;
        this._windowFocusTimeoutId = window.setTimeout(() => this._windowFocused = false);
      };
      /** Subject for stopping our InputModalityDetector subscription. */
      this._stopInputModalityDetector = new rxjs__WEBPACK_IMPORTED_MODULE_3__.Subject();
      /**
       * Event listener for `focus` and 'blur' events on the document.
       * Needs to be an arrow function in order to preserve the context when it gets bound.
       */
      this._rootNodeFocusAndBlurListener = event => {
        const target = (0,_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_2__._getEventTarget)(event);
        // We need to walk up the ancestor chain in order to support `checkChildren`.
        for (let element = target; element; element = element.parentElement) {
          if (event.type === 'focus') {
            this._onFocus(event, element);
          } else {
            this._onBlur(event, element);
          }
        }
      };
      this._document = document;
      this._detectionMode = options?.detectionMode || 0 /* FocusMonitorDetectionMode.IMMEDIATE */;
    }

    monitor(element, checkChildren = false) {
      const nativeElement = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_6__.coerceElement)(element);
      // Do nothing if we're not on the browser platform or the passed in node isn't an element.
      if (!this._platform.isBrowser || nativeElement.nodeType !== 1) {
        // Note: we don't want the observable to emit at all so we don't pass any parameters.
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)();
      }
      // If the element is inside the shadow DOM, we need to bind our focus/blur listeners to
      // the shadow root, rather than the `document`, because the browser won't emit focus events
      // to the `document`, if focus is moving within the same shadow root.
      const rootNode = (0,_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_2__._getShadowRoot)(nativeElement) || this._getDocument();
      const cachedInfo = this._elementInfo.get(nativeElement);
      // Check if we're already monitoring this element.
      if (cachedInfo) {
        if (checkChildren) {
          // TODO(COMP-318): this can be problematic, because it'll turn all non-checkChildren
          // observers into ones that behave as if `checkChildren` was turned on. We need a more
          // robust solution.
          cachedInfo.checkChildren = true;
        }
        return cachedInfo.subject;
      }
      // Create monitored element info.
      const info = {
        checkChildren: checkChildren,
        subject: new rxjs__WEBPACK_IMPORTED_MODULE_3__.Subject(),
        rootNode
      };
      this._elementInfo.set(nativeElement, info);
      this._registerGlobalListeners(info);
      return info.subject;
    }
    stopMonitoring(element) {
      const nativeElement = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_6__.coerceElement)(element);
      const elementInfo = this._elementInfo.get(nativeElement);
      if (elementInfo) {
        elementInfo.subject.complete();
        this._setClasses(nativeElement);
        this._elementInfo.delete(nativeElement);
        this._removeGlobalListeners(elementInfo);
      }
    }
    focusVia(element, origin, options) {
      const nativeElement = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_6__.coerceElement)(element);
      const focusedElement = this._getDocument().activeElement;
      // If the element is focused already, calling `focus` again won't trigger the event listener
      // which means that the focus classes won't be updated. If that's the case, update the classes
      // directly without waiting for an event.
      if (nativeElement === focusedElement) {
        this._getClosestElementsInfo(nativeElement).forEach(([currentElement, info]) => this._originChanged(currentElement, origin, info));
      } else {
        this._setOrigin(origin);
        // `focus` isn't available on the server
        if (typeof nativeElement.focus === 'function') {
          nativeElement.focus(options);
        }
      }
    }
    ngOnDestroy() {
      this._elementInfo.forEach((_info, element) => this.stopMonitoring(element));
    }
    /** Access injected document if available or fallback to global document reference */
    _getDocument() {
      return this._document || document;
    }
    /** Use defaultView of injected document if available or fallback to global window reference */
    _getWindow() {
      const doc = this._getDocument();
      return doc.defaultView || window;
    }
    _getFocusOrigin(focusEventTarget) {
      if (this._origin) {
        // If the origin was realized via a touch interaction, we need to perform additional checks
        // to determine whether the focus origin should be attributed to touch or program.
        if (this._originFromTouchInteraction) {
          return this._shouldBeAttributedToTouch(focusEventTarget) ? 'touch' : 'program';
        } else {
          return this._origin;
        }
      }
      // If the window has just regained focus, we can restore the most recent origin from before the
      // window blurred. Otherwise, we've reached the point where we can't identify the source of the
      // focus. This typically means one of two things happened:
      //
      // 1) The element was programmatically focused, or
      // 2) The element was focused via screen reader navigation (which generally doesn't fire
      //    events).
      //
      // Because we can't distinguish between these two cases, we default to setting `program`.
      if (this._windowFocused && this._lastFocusOrigin) {
        return this._lastFocusOrigin;
      }
      // If the interaction is coming from an input label, we consider it a mouse interactions.
      // This is a special case where focus moves on `click`, rather than `mousedown` which breaks
      // our detection, because all our assumptions are for `mousedown`. We need to handle this
      // special case, because it's very common for checkboxes and radio buttons.
      if (focusEventTarget && this._isLastInteractionFromInputLabel(focusEventTarget)) {
        return 'mouse';
      }
      return 'program';
    }
    /**
     * Returns whether the focus event should be attributed to touch. Recall that in IMMEDIATE mode, a
     * touch origin isn't immediately reset at the next tick (see _setOrigin). This means that when we
     * handle a focus event following a touch interaction, we need to determine whether (1) the focus
     * event was directly caused by the touch interaction or (2) the focus event was caused by a
     * subsequent programmatic focus call triggered by the touch interaction.
     * @param focusEventTarget The target of the focus event under examination.
     */
    _shouldBeAttributedToTouch(focusEventTarget) {
      // Please note that this check is not perfect. Consider the following edge case:
      //
      // <div #parent tabindex="0">
      //   <div #child tabindex="0" (click)="#parent.focus()"></div>
      // </div>
      //
      // Suppose there is a FocusMonitor in IMMEDIATE mode attached to #parent. When the user touches
      // #child, #parent is programmatically focused. This code will attribute the focus to touch
      // instead of program. This is a relatively minor edge-case that can be worked around by using
      // focusVia(parent, 'program') to focus #parent.
      return this._detectionMode === 1 /* FocusMonitorDetectionMode.EVENTUAL */ || !!focusEventTarget?.contains(this._inputModalityDetector._mostRecentTarget);
    }
    /**
     * Sets the focus classes on the element based on the given focus origin.
     * @param element The element to update the classes on.
     * @param origin The focus origin.
     */
    _setClasses(element, origin) {
      element.classList.toggle('cdk-focused', !!origin);
      element.classList.toggle('cdk-touch-focused', origin === 'touch');
      element.classList.toggle('cdk-keyboard-focused', origin === 'keyboard');
      element.classList.toggle('cdk-mouse-focused', origin === 'mouse');
      element.classList.toggle('cdk-program-focused', origin === 'program');
    }
    /**
     * Updates the focus origin. If we're using immediate detection mode, we schedule an async
     * function to clear the origin at the end of a timeout. The duration of the timeout depends on
     * the origin being set.
     * @param origin The origin to set.
     * @param isFromInteraction Whether we are setting the origin from an interaction event.
     */
    _setOrigin(origin, isFromInteraction = false) {
      this._ngZone.runOutsideAngular(() => {
        this._origin = origin;
        this._originFromTouchInteraction = origin === 'touch' && isFromInteraction;
        // If we're in IMMEDIATE mode, reset the origin at the next tick (or in `TOUCH_BUFFER_MS` ms
        // for a touch event). We reset the origin at the next tick because Firefox focuses one tick
        // after the interaction event. We wait `TOUCH_BUFFER_MS` ms before resetting the origin for
        // a touch event because when a touch event is fired, the associated focus event isn't yet in
        // the event queue. Before doing so, clear any pending timeouts.
        if (this._detectionMode === 0 /* FocusMonitorDetectionMode.IMMEDIATE */) {
          clearTimeout(this._originTimeoutId);
          const ms = this._originFromTouchInteraction ? TOUCH_BUFFER_MS : 1;
          this._originTimeoutId = setTimeout(() => this._origin = null, ms);
        }
      });
    }
    /**
     * Handles focus events on a registered element.
     * @param event The focus event.
     * @param element The monitored element.
     */
    _onFocus(event, element) {
      // NOTE(mmalerba): We currently set the classes based on the focus origin of the most recent
      // focus event affecting the monitored element. If we want to use the origin of the first event
      // instead we should check for the cdk-focused class here and return if the element already has
      // it. (This only matters for elements that have includesChildren = true).
      // If we are not counting child-element-focus as focused, make sure that the event target is the
      // monitored element itself.
      const elementInfo = this._elementInfo.get(element);
      const focusEventTarget = (0,_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_2__._getEventTarget)(event);
      if (!elementInfo || !elementInfo.checkChildren && element !== focusEventTarget) {
        return;
      }
      this._originChanged(element, this._getFocusOrigin(focusEventTarget), elementInfo);
    }
    /**
     * Handles blur events on a registered element.
     * @param event The blur event.
     * @param element The monitored element.
     */
    _onBlur(event, element) {
      // If we are counting child-element-focus as focused, make sure that we aren't just blurring in
      // order to focus another child of the monitored element.
      const elementInfo = this._elementInfo.get(element);
      if (!elementInfo || elementInfo.checkChildren && event.relatedTarget instanceof Node && element.contains(event.relatedTarget)) {
        return;
      }
      this._setClasses(element);
      this._emitOrigin(elementInfo, null);
    }
    _emitOrigin(info, origin) {
      if (info.subject.observers.length) {
        this._ngZone.run(() => info.subject.next(origin));
      }
    }
    _registerGlobalListeners(elementInfo) {
      if (!this._platform.isBrowser) {
        return;
      }
      const rootNode = elementInfo.rootNode;
      const rootNodeFocusListeners = this._rootNodeFocusListenerCount.get(rootNode) || 0;
      if (!rootNodeFocusListeners) {
        this._ngZone.runOutsideAngular(() => {
          rootNode.addEventListener('focus', this._rootNodeFocusAndBlurListener, captureEventListenerOptions);
          rootNode.addEventListener('blur', this._rootNodeFocusAndBlurListener, captureEventListenerOptions);
        });
      }
      this._rootNodeFocusListenerCount.set(rootNode, rootNodeFocusListeners + 1);
      // Register global listeners when first element is monitored.
      if (++this._monitoredElementCount === 1) {
        // Note: we listen to events in the capture phase so we
        // can detect them even if the user stops propagation.
        this._ngZone.runOutsideAngular(() => {
          const window = this._getWindow();
          window.addEventListener('focus', this._windowFocusListener);
        });
        // The InputModalityDetector is also just a collection of global listeners.
        this._inputModalityDetector.modalityDetected.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.takeUntil)(this._stopInputModalityDetector)).subscribe(modality => {
          this._setOrigin(modality, true /* isFromInteraction */);
        });
      }
    }

    _removeGlobalListeners(elementInfo) {
      const rootNode = elementInfo.rootNode;
      if (this._rootNodeFocusListenerCount.has(rootNode)) {
        const rootNodeFocusListeners = this._rootNodeFocusListenerCount.get(rootNode);
        if (rootNodeFocusListeners > 1) {
          this._rootNodeFocusListenerCount.set(rootNode, rootNodeFocusListeners - 1);
        } else {
          rootNode.removeEventListener('focus', this._rootNodeFocusAndBlurListener, captureEventListenerOptions);
          rootNode.removeEventListener('blur', this._rootNodeFocusAndBlurListener, captureEventListenerOptions);
          this._rootNodeFocusListenerCount.delete(rootNode);
        }
      }
      // Unregister global listeners when last element is unmonitored.
      if (! --this._monitoredElementCount) {
        const window = this._getWindow();
        window.removeEventListener('focus', this._windowFocusListener);
        // Equivalently, stop our InputModalityDetector subscription.
        this._stopInputModalityDetector.next();
        // Clear timeouts for all potentially pending timeouts to prevent the leaks.
        clearTimeout(this._windowFocusTimeoutId);
        clearTimeout(this._originTimeoutId);
      }
    }
    /** Updates all the state on an element once its focus origin has changed. */
    _originChanged(element, origin, elementInfo) {
      this._setClasses(element, origin);
      this._emitOrigin(elementInfo, origin);
      this._lastFocusOrigin = origin;
    }
    /**
     * Collects the `MonitoredElementInfo` of a particular element and
     * all of its ancestors that have enabled `checkChildren`.
     * @param element Element from which to start the search.
     */
    _getClosestElementsInfo(element) {
      const results = [];
      this._elementInfo.forEach((info, currentElement) => {
        if (currentElement === element || info.checkChildren && currentElement.contains(element)) {
          results.push([currentElement, info]);
        }
      });
      return results;
    }
    /**
     * Returns whether an interaction is likely to have come from the user clicking the `label` of
     * an `input` or `textarea` in order to focus it.
     * @param focusEventTarget Target currently receiving focus.
     */
    _isLastInteractionFromInputLabel(focusEventTarget) {
      const {
        _mostRecentTarget: mostRecentTarget,
        mostRecentModality
      } = this._inputModalityDetector;
      // If the last interaction used the mouse on an element contained by one of the labels
      // of an `input`/`textarea` that is currently focused, it is very likely that the
      // user redirected focus using the label.
      if (mostRecentModality !== 'mouse' || !mostRecentTarget || mostRecentTarget === focusEventTarget || focusEventTarget.nodeName !== 'INPUT' && focusEventTarget.nodeName !== 'TEXTAREA' || focusEventTarget.disabled) {
        return false;
      }
      const labels = focusEventTarget.labels;
      if (labels) {
        for (let i = 0; i < labels.length; i++) {
          if (labels[i].contains(mostRecentTarget)) {
            return true;
          }
        }
      }
      return false;
    }
  }
  _class10 = FocusMonitor;
  _class10.ɵfac = function _class10_Factory(t) {
    return new (t || _class10)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.NgZone), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_2__.Platform), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](InputModalityDetector), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common__WEBPACK_IMPORTED_MODULE_1__.DOCUMENT, 8), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](FOCUS_MONITOR_DEFAULT_OPTIONS, 8));
  };
  _class10.ɵprov = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
    token: _class10,
    factory: _class10.ɵfac,
    providedIn: 'root'
  });
  return FocusMonitor;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
/**
 * Directive that determines how a particular element was focused (via keyboard, mouse, touch, or
 * programmatically) and adds corresponding classes to the element.
 *
 * There are two variants of this directive:
 * 1) cdkMonitorElementFocus: does not consider an element to be focused if one of its children is
 *    focused.
 * 2) cdkMonitorSubtreeFocus: considers an element focused if it or any of its children are focused.
 */
let CdkMonitorFocus = /*#__PURE__*/(() => {
  var _class11;
  class CdkMonitorFocus {
    constructor(_elementRef, _focusMonitor) {
      this._elementRef = _elementRef;
      this._focusMonitor = _focusMonitor;
      this._focusOrigin = null;
      this.cdkFocusChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    }
    get focusOrigin() {
      return this._focusOrigin;
    }
    ngAfterViewInit() {
      const element = this._elementRef.nativeElement;
      this._monitorSubscription = this._focusMonitor.monitor(element, element.nodeType === 1 && element.hasAttribute('cdkMonitorSubtreeFocus')).subscribe(origin => {
        this._focusOrigin = origin;
        this.cdkFocusChange.emit(origin);
      });
    }
    ngOnDestroy() {
      this._focusMonitor.stopMonitoring(this._elementRef);
      if (this._monitorSubscription) {
        this._monitorSubscription.unsubscribe();
      }
    }
  }
  _class11 = CdkMonitorFocus;
  _class11.ɵfac = function _class11_Factory(t) {
    return new (t || _class11)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](FocusMonitor));
  };
  _class11.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
    type: _class11,
    selectors: [["", "cdkMonitorElementFocus", ""], ["", "cdkMonitorSubtreeFocus", ""]],
    outputs: {
      cdkFocusChange: "cdkFocusChange"
    },
    exportAs: ["cdkMonitorFocus"]
  });
  return CdkMonitorFocus;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();

/** CSS class applied to the document body when in black-on-white high-contrast mode. */
const BLACK_ON_WHITE_CSS_CLASS = 'cdk-high-contrast-black-on-white';
/** CSS class applied to the document body when in white-on-black high-contrast mode. */
const WHITE_ON_BLACK_CSS_CLASS = 'cdk-high-contrast-white-on-black';
/** CSS class applied to the document body when in high-contrast mode. */
const HIGH_CONTRAST_MODE_ACTIVE_CSS_CLASS = 'cdk-high-contrast-active';
/**
 * Service to determine whether the browser is currently in a high-contrast-mode environment.
 *
 * Microsoft Windows supports an accessibility feature called "High Contrast Mode". This mode
 * changes the appearance of all applications, including web applications, to dramatically increase
 * contrast.
 *
 * IE, Edge, and Firefox currently support this mode. Chrome does not support Windows High Contrast
 * Mode. This service does not detect high-contrast mode as added by the Chrome "High Contrast"
 * browser extension.
 */
let HighContrastModeDetector = /*#__PURE__*/(() => {
  var _class12;
  class HighContrastModeDetector {
    constructor(_platform, document) {
      this._platform = _platform;
      this._document = document;
      this._breakpointSubscription = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_angular_cdk_layout__WEBPACK_IMPORTED_MODULE_8__.BreakpointObserver).observe('(forced-colors: active)').subscribe(() => {
        if (this._hasCheckedHighContrastMode) {
          this._hasCheckedHighContrastMode = false;
          this._applyBodyHighContrastModeCssClasses();
        }
      });
    }
    /** Gets the current high-contrast-mode for the page. */
    getHighContrastMode() {
      if (!this._platform.isBrowser) {
        return 0 /* HighContrastMode.NONE */;
      }
      // Create a test element with an arbitrary background-color that is neither black nor
      // white; high-contrast mode will coerce the color to either black or white. Also ensure that
      // appending the test element to the DOM does not affect layout by absolutely positioning it
      const testElement = this._document.createElement('div');
      testElement.style.backgroundColor = 'rgb(1,2,3)';
      testElement.style.position = 'absolute';
      this._document.body.appendChild(testElement);
      // Get the computed style for the background color, collapsing spaces to normalize between
      // browsers. Once we get this color, we no longer need the test element. Access the `window`
      // via the document so we can fake it in tests. Note that we have extra null checks, because
      // this logic will likely run during app bootstrap and throwing can break the entire app.
      const documentWindow = this._document.defaultView || window;
      const computedStyle = documentWindow && documentWindow.getComputedStyle ? documentWindow.getComputedStyle(testElement) : null;
      const computedColor = (computedStyle && computedStyle.backgroundColor || '').replace(/ /g, '');
      testElement.remove();
      switch (computedColor) {
        // Pre Windows 11 dark theme.
        case 'rgb(0,0,0)':
        // Windows 11 dark themes.
        case 'rgb(45,50,54)':
        case 'rgb(32,32,32)':
          return 2 /* HighContrastMode.WHITE_ON_BLACK */;
        // Pre Windows 11 light theme.
        case 'rgb(255,255,255)':
        // Windows 11 light theme.
        case 'rgb(255,250,239)':
          return 1 /* HighContrastMode.BLACK_ON_WHITE */;
      }

      return 0 /* HighContrastMode.NONE */;
    }

    ngOnDestroy() {
      this._breakpointSubscription.unsubscribe();
    }
    /** Applies CSS classes indicating high-contrast mode to document body (browser-only). */
    _applyBodyHighContrastModeCssClasses() {
      if (!this._hasCheckedHighContrastMode && this._platform.isBrowser && this._document.body) {
        const bodyClasses = this._document.body.classList;
        bodyClasses.remove(HIGH_CONTRAST_MODE_ACTIVE_CSS_CLASS, BLACK_ON_WHITE_CSS_CLASS, WHITE_ON_BLACK_CSS_CLASS);
        this._hasCheckedHighContrastMode = true;
        const mode = this.getHighContrastMode();
        if (mode === 1 /* HighContrastMode.BLACK_ON_WHITE */) {
          bodyClasses.add(HIGH_CONTRAST_MODE_ACTIVE_CSS_CLASS, BLACK_ON_WHITE_CSS_CLASS);
        } else if (mode === 2 /* HighContrastMode.WHITE_ON_BLACK */) {
          bodyClasses.add(HIGH_CONTRAST_MODE_ACTIVE_CSS_CLASS, WHITE_ON_BLACK_CSS_CLASS);
        }
      }
    }
  }
  _class12 = HighContrastModeDetector;
  _class12.ɵfac = function _class12_Factory(t) {
    return new (t || _class12)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_2__.Platform), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common__WEBPACK_IMPORTED_MODULE_1__.DOCUMENT));
  };
  _class12.ɵprov = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
    token: _class12,
    factory: _class12.ɵfac,
    providedIn: 'root'
  });
  return HighContrastModeDetector;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
let A11yModule = /*#__PURE__*/(() => {
  var _class13;
  class A11yModule {
    constructor(highContrastModeDetector) {
      highContrastModeDetector._applyBodyHighContrastModeCssClasses();
    }
  }
  _class13 = A11yModule;
  _class13.ɵfac = function _class13_Factory(t) {
    return new (t || _class13)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](HighContrastModeDetector));
  };
  _class13.ɵmod = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
    type: _class13
  });
  _class13.ɵinj = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
    imports: [_angular_cdk_observers__WEBPACK_IMPORTED_MODULE_7__.ObserversModule]
  });
  return A11yModule;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();

/**
 * Generated bundle index. Do not edit.
 */



/***/ }),

/***/ 29988:
/*!*****************************************************!*\
  !*** ./node_modules/@angular/cdk/fesm2022/bidi.mjs ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BidiModule: () => (/* binding */ BidiModule),
/* harmony export */   DIR_DOCUMENT: () => (/* binding */ DIR_DOCUMENT),
/* harmony export */   Dir: () => (/* binding */ Dir),
/* harmony export */   Directionality: () => (/* binding */ Directionality)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 59936);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 34228);




/**
 * Injection token used to inject the document into Directionality.
 * This is used so that the value can be faked in tests.
 *
 * We can't use the real document in tests because changing the real `dir` causes geometry-based
 * tests in Safari to fail.
 *
 * We also can't re-provide the DOCUMENT token from platform-browser because the unit tests
 * themselves use things like `querySelector` in test code.
 *
 * This token is defined in a separate file from Directionality as a workaround for
 * https://github.com/angular/angular/issues/22559
 *
 * @docs-private
 */
const DIR_DOCUMENT = /*#__PURE__*/new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken('cdk-dir-doc', {
  providedIn: 'root',
  factory: DIR_DOCUMENT_FACTORY
});
/** @docs-private */
function DIR_DOCUMENT_FACTORY() {
  return (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_angular_common__WEBPACK_IMPORTED_MODULE_1__.DOCUMENT);
}

/** Regex that matches locales with an RTL script. Taken from `goog.i18n.bidi.isRtlLanguage`. */
const RTL_LOCALE_PATTERN = /^(ar|ckb|dv|he|iw|fa|nqo|ps|sd|ug|ur|yi|.*[-_](Adlm|Arab|Hebr|Nkoo|Rohg|Thaa))(?!.*[-_](Latn|Cyrl)($|-|_))($|-|_)/i;
/** Resolves a string value to a specific direction. */
function _resolveDirectionality(rawValue) {
  const value = rawValue?.toLowerCase() || '';
  if (value === 'auto' && typeof navigator !== 'undefined' && navigator?.language) {
    return RTL_LOCALE_PATTERN.test(navigator.language) ? 'rtl' : 'ltr';
  }
  return value === 'rtl' ? 'rtl' : 'ltr';
}
/**
 * The directionality (LTR / RTL) context for the application (or a subtree of it).
 * Exposes the current direction and a stream of direction changes.
 */
let Directionality = /*#__PURE__*/(() => {
  var _class;
  class Directionality {
    constructor(_document) {
      /** The current 'ltr' or 'rtl' value. */
      this.value = 'ltr';
      /** Stream that emits whenever the 'ltr' / 'rtl' state changes. */
      this.change = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
      if (_document) {
        const bodyDir = _document.body ? _document.body.dir : null;
        const htmlDir = _document.documentElement ? _document.documentElement.dir : null;
        this.value = _resolveDirectionality(bodyDir || htmlDir || 'ltr');
      }
    }
    ngOnDestroy() {
      this.change.complete();
    }
  }
  _class = Directionality;
  _class.ɵfac = function _class_Factory(t) {
    return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](DIR_DOCUMENT, 8));
  };
  _class.ɵprov = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
    token: _class,
    factory: _class.ɵfac,
    providedIn: 'root'
  });
  return Directionality;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();

/**
 * Directive to listen for changes of direction of part of the DOM.
 *
 * Provides itself as Directionality such that descendant directives only need to ever inject
 * Directionality to get the closest direction.
 */
let Dir = /*#__PURE__*/(() => {
  var _class2;
  class Dir {
    constructor() {
      /** Normalized direction that accounts for invalid/unsupported values. */
      this._dir = 'ltr';
      /** Whether the `value` has been set to its initial value. */
      this._isInitialized = false;
      /** Event emitted when the direction changes. */
      this.change = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    }
    /** @docs-private */
    get dir() {
      return this._dir;
    }
    set dir(value) {
      const previousValue = this._dir;
      // Note: `_resolveDirectionality` resolves the language based on the browser's language,
      // whereas the browser does it based on the content of the element. Since doing so based
      // on the content can be expensive, for now we're doing the simpler matching.
      this._dir = _resolveDirectionality(value);
      this._rawDir = value;
      if (previousValue !== this._dir && this._isInitialized) {
        this.change.emit(this._dir);
      }
    }
    /** Current layout direction of the element. */
    get value() {
      return this.dir;
    }
    /** Initialize once default value has been set. */
    ngAfterContentInit() {
      this._isInitialized = true;
    }
    ngOnDestroy() {
      this.change.complete();
    }
  }
  _class2 = Dir;
  _class2.ɵfac = function _class2_Factory(t) {
    return new (t || _class2)();
  };
  _class2.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
    type: _class2,
    selectors: [["", "dir", ""]],
    hostVars: 1,
    hostBindings: function _class2_HostBindings(rf, ctx) {
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattribute"]("dir", ctx._rawDir);
      }
    },
    inputs: {
      dir: "dir"
    },
    outputs: {
      change: "dirChange"
    },
    exportAs: ["dir"],
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([{
      provide: Directionality,
      useExisting: _class2
    }])]
  });
  return Dir;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
let BidiModule = /*#__PURE__*/(() => {
  var _class3;
  class BidiModule {}
  _class3 = BidiModule;
  _class3.ɵfac = function _class3_Factory(t) {
    return new (t || _class3)();
  };
  _class3.ɵmod = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
    type: _class3
  });
  _class3.ɵinj = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({});
  return BidiModule;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();

/**
 * Generated bundle index. Do not edit.
 */



/***/ }),

/***/ 41172:
/*!****************************************************!*\
  !*** ./node_modules/@angular/cdk/fesm2022/cdk.mjs ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   VERSION: () => (/* binding */ VERSION)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 59936);


/** Current version of the Angular Component Development Kit. */
const VERSION = /*#__PURE__*/new _angular_core__WEBPACK_IMPORTED_MODULE_0__.Version('16.2.1');


/***/ }),

/***/ 45029:
/*!*********************************************************!*\
  !*** ./node_modules/@angular/cdk/fesm2022/coercion.mjs ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   _isNumberValue: () => (/* binding */ _isNumberValue),
/* harmony export */   coerceArray: () => (/* binding */ coerceArray),
/* harmony export */   coerceBooleanProperty: () => (/* binding */ coerceBooleanProperty),
/* harmony export */   coerceCssPixelValue: () => (/* binding */ coerceCssPixelValue),
/* harmony export */   coerceElement: () => (/* binding */ coerceElement),
/* harmony export */   coerceNumberProperty: () => (/* binding */ coerceNumberProperty),
/* harmony export */   coerceStringArray: () => (/* binding */ coerceStringArray)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 59936);


/** Coerces a data-bound value (typically a string) to a boolean. */
function coerceBooleanProperty(value) {
  return value != null && `${value}` !== 'false';
}
function coerceNumberProperty(value, fallbackValue = 0) {
  return _isNumberValue(value) ? Number(value) : fallbackValue;
}
/**
 * Whether the provided value is considered a number.
 * @docs-private
 */
function _isNumberValue(value) {
  // parseFloat(value) handles most of the cases we're interested in (it treats null, empty string,
  // and other non-number values as NaN, where Number just uses 0) but it considers the string
  // '123hello' to be a valid number. Therefore we also check if Number(value) is NaN.
  return !isNaN(parseFloat(value)) && !isNaN(Number(value));
}
function coerceArray(value) {
  return Array.isArray(value) ? value : [value];
}

/** Coerces a value to a CSS pixel value. */
function coerceCssPixelValue(value) {
  if (value == null) {
    return '';
  }
  return typeof value === 'string' ? value : `${value}px`;
}

/**
 * Coerces an ElementRef or an Element into an element.
 * Useful for APIs that can accept either a ref or the native element itself.
 */
function coerceElement(elementOrRef) {
  return elementOrRef instanceof _angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef ? elementOrRef.nativeElement : elementOrRef;
}

/**
 * Coerces a value to an array of trimmed non-empty strings.
 * Any input that is not an array, `null` or `undefined` will be turned into a string
 * via `toString()` and subsequently split with the given separator.
 * `null` and `undefined` will result in an empty array.
 * This results in the following outcomes:
 * - `null` -&gt; `[]`
 * - `[null]` -&gt; `["null"]`
 * - `["a", "b ", " "]` -&gt; `["a", "b"]`
 * - `[1, [2, 3]]` -&gt; `["1", "2,3"]`
 * - `[{ a: 0 }]` -&gt; `["[object Object]"]`
 * - `{ a: 0 }` -&gt; `["[object", "Object]"]`
 *
 * Useful for defining CSS classes or table columns.
 * @param value the value to coerce into an array of strings
 * @param separator split-separator if value isn't an array
 */
function coerceStringArray(value, separator = /\s+/) {
  const result = [];
  if (value != null) {
    const sourceValues = Array.isArray(value) ? value : `${value}`.split(separator);
    for (const sourceValue of sourceValues) {
      const trimmedString = `${sourceValue}`.trim();
      if (trimmedString) {
        result.push(trimmedString);
      }
    }
  }
  return result;
}


/***/ }),

/***/ 31998:
/*!*********************************************************!*\
  !*** ./node_modules/@angular/cdk/fesm2022/keycodes.mjs ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ A),
/* harmony export */   ALT: () => (/* binding */ ALT),
/* harmony export */   APOSTROPHE: () => (/* binding */ APOSTROPHE),
/* harmony export */   AT_SIGN: () => (/* binding */ AT_SIGN),
/* harmony export */   B: () => (/* binding */ B),
/* harmony export */   BACKSLASH: () => (/* binding */ BACKSLASH),
/* harmony export */   BACKSPACE: () => (/* binding */ BACKSPACE),
/* harmony export */   C: () => (/* binding */ C),
/* harmony export */   CAPS_LOCK: () => (/* binding */ CAPS_LOCK),
/* harmony export */   CLOSE_SQUARE_BRACKET: () => (/* binding */ CLOSE_SQUARE_BRACKET),
/* harmony export */   COMMA: () => (/* binding */ COMMA),
/* harmony export */   CONTEXT_MENU: () => (/* binding */ CONTEXT_MENU),
/* harmony export */   CONTROL: () => (/* binding */ CONTROL),
/* harmony export */   D: () => (/* binding */ D),
/* harmony export */   DASH: () => (/* binding */ DASH),
/* harmony export */   DELETE: () => (/* binding */ DELETE),
/* harmony export */   DOWN_ARROW: () => (/* binding */ DOWN_ARROW),
/* harmony export */   E: () => (/* binding */ E),
/* harmony export */   EIGHT: () => (/* binding */ EIGHT),
/* harmony export */   END: () => (/* binding */ END),
/* harmony export */   ENTER: () => (/* binding */ ENTER),
/* harmony export */   EQUALS: () => (/* binding */ EQUALS),
/* harmony export */   ESCAPE: () => (/* binding */ ESCAPE),
/* harmony export */   F: () => (/* binding */ F),
/* harmony export */   F1: () => (/* binding */ F1),
/* harmony export */   F10: () => (/* binding */ F10),
/* harmony export */   F11: () => (/* binding */ F11),
/* harmony export */   F12: () => (/* binding */ F12),
/* harmony export */   F2: () => (/* binding */ F2),
/* harmony export */   F3: () => (/* binding */ F3),
/* harmony export */   F4: () => (/* binding */ F4),
/* harmony export */   F5: () => (/* binding */ F5),
/* harmony export */   F6: () => (/* binding */ F6),
/* harmony export */   F7: () => (/* binding */ F7),
/* harmony export */   F8: () => (/* binding */ F8),
/* harmony export */   F9: () => (/* binding */ F9),
/* harmony export */   FF_EQUALS: () => (/* binding */ FF_EQUALS),
/* harmony export */   FF_MINUS: () => (/* binding */ FF_MINUS),
/* harmony export */   FF_MUTE: () => (/* binding */ FF_MUTE),
/* harmony export */   FF_SEMICOLON: () => (/* binding */ FF_SEMICOLON),
/* harmony export */   FF_VOLUME_DOWN: () => (/* binding */ FF_VOLUME_DOWN),
/* harmony export */   FF_VOLUME_UP: () => (/* binding */ FF_VOLUME_UP),
/* harmony export */   FIRST_MEDIA: () => (/* binding */ FIRST_MEDIA),
/* harmony export */   FIVE: () => (/* binding */ FIVE),
/* harmony export */   FOUR: () => (/* binding */ FOUR),
/* harmony export */   G: () => (/* binding */ G),
/* harmony export */   H: () => (/* binding */ H),
/* harmony export */   HOME: () => (/* binding */ HOME),
/* harmony export */   I: () => (/* binding */ I),
/* harmony export */   INSERT: () => (/* binding */ INSERT),
/* harmony export */   J: () => (/* binding */ J),
/* harmony export */   K: () => (/* binding */ K),
/* harmony export */   L: () => (/* binding */ L),
/* harmony export */   LAST_MEDIA: () => (/* binding */ LAST_MEDIA),
/* harmony export */   LEFT_ARROW: () => (/* binding */ LEFT_ARROW),
/* harmony export */   M: () => (/* binding */ M),
/* harmony export */   MAC_ENTER: () => (/* binding */ MAC_ENTER),
/* harmony export */   MAC_META: () => (/* binding */ MAC_META),
/* harmony export */   MAC_WK_CMD_LEFT: () => (/* binding */ MAC_WK_CMD_LEFT),
/* harmony export */   MAC_WK_CMD_RIGHT: () => (/* binding */ MAC_WK_CMD_RIGHT),
/* harmony export */   META: () => (/* binding */ META),
/* harmony export */   MUTE: () => (/* binding */ MUTE),
/* harmony export */   N: () => (/* binding */ N),
/* harmony export */   NINE: () => (/* binding */ NINE),
/* harmony export */   NUMPAD_DIVIDE: () => (/* binding */ NUMPAD_DIVIDE),
/* harmony export */   NUMPAD_EIGHT: () => (/* binding */ NUMPAD_EIGHT),
/* harmony export */   NUMPAD_FIVE: () => (/* binding */ NUMPAD_FIVE),
/* harmony export */   NUMPAD_FOUR: () => (/* binding */ NUMPAD_FOUR),
/* harmony export */   NUMPAD_MINUS: () => (/* binding */ NUMPAD_MINUS),
/* harmony export */   NUMPAD_MULTIPLY: () => (/* binding */ NUMPAD_MULTIPLY),
/* harmony export */   NUMPAD_NINE: () => (/* binding */ NUMPAD_NINE),
/* harmony export */   NUMPAD_ONE: () => (/* binding */ NUMPAD_ONE),
/* harmony export */   NUMPAD_PERIOD: () => (/* binding */ NUMPAD_PERIOD),
/* harmony export */   NUMPAD_PLUS: () => (/* binding */ NUMPAD_PLUS),
/* harmony export */   NUMPAD_SEVEN: () => (/* binding */ NUMPAD_SEVEN),
/* harmony export */   NUMPAD_SIX: () => (/* binding */ NUMPAD_SIX),
/* harmony export */   NUMPAD_THREE: () => (/* binding */ NUMPAD_THREE),
/* harmony export */   NUMPAD_TWO: () => (/* binding */ NUMPAD_TWO),
/* harmony export */   NUMPAD_ZERO: () => (/* binding */ NUMPAD_ZERO),
/* harmony export */   NUM_CENTER: () => (/* binding */ NUM_CENTER),
/* harmony export */   NUM_LOCK: () => (/* binding */ NUM_LOCK),
/* harmony export */   O: () => (/* binding */ O),
/* harmony export */   ONE: () => (/* binding */ ONE),
/* harmony export */   OPEN_SQUARE_BRACKET: () => (/* binding */ OPEN_SQUARE_BRACKET),
/* harmony export */   P: () => (/* binding */ P),
/* harmony export */   PAGE_DOWN: () => (/* binding */ PAGE_DOWN),
/* harmony export */   PAGE_UP: () => (/* binding */ PAGE_UP),
/* harmony export */   PAUSE: () => (/* binding */ PAUSE),
/* harmony export */   PERIOD: () => (/* binding */ PERIOD),
/* harmony export */   PLUS_SIGN: () => (/* binding */ PLUS_SIGN),
/* harmony export */   PRINT_SCREEN: () => (/* binding */ PRINT_SCREEN),
/* harmony export */   Q: () => (/* binding */ Q),
/* harmony export */   QUESTION_MARK: () => (/* binding */ QUESTION_MARK),
/* harmony export */   R: () => (/* binding */ R),
/* harmony export */   RIGHT_ARROW: () => (/* binding */ RIGHT_ARROW),
/* harmony export */   S: () => (/* binding */ S),
/* harmony export */   SCROLL_LOCK: () => (/* binding */ SCROLL_LOCK),
/* harmony export */   SEMICOLON: () => (/* binding */ SEMICOLON),
/* harmony export */   SEVEN: () => (/* binding */ SEVEN),
/* harmony export */   SHIFT: () => (/* binding */ SHIFT),
/* harmony export */   SINGLE_QUOTE: () => (/* binding */ SINGLE_QUOTE),
/* harmony export */   SIX: () => (/* binding */ SIX),
/* harmony export */   SLASH: () => (/* binding */ SLASH),
/* harmony export */   SPACE: () => (/* binding */ SPACE),
/* harmony export */   T: () => (/* binding */ T),
/* harmony export */   TAB: () => (/* binding */ TAB),
/* harmony export */   THREE: () => (/* binding */ THREE),
/* harmony export */   TILDE: () => (/* binding */ TILDE),
/* harmony export */   TWO: () => (/* binding */ TWO),
/* harmony export */   U: () => (/* binding */ U),
/* harmony export */   UP_ARROW: () => (/* binding */ UP_ARROW),
/* harmony export */   V: () => (/* binding */ V),
/* harmony export */   VOLUME_DOWN: () => (/* binding */ VOLUME_DOWN),
/* harmony export */   VOLUME_UP: () => (/* binding */ VOLUME_UP),
/* harmony export */   W: () => (/* binding */ W),
/* harmony export */   X: () => (/* binding */ X),
/* harmony export */   Y: () => (/* binding */ Y),
/* harmony export */   Z: () => (/* binding */ Z),
/* harmony export */   ZERO: () => (/* binding */ ZERO),
/* harmony export */   hasModifierKey: () => (/* binding */ hasModifierKey)
/* harmony export */ });
const MAC_ENTER = 3;
const BACKSPACE = 8;
const TAB = 9;
const NUM_CENTER = 12;
const ENTER = 13;
const SHIFT = 16;
const CONTROL = 17;
const ALT = 18;
const PAUSE = 19;
const CAPS_LOCK = 20;
const ESCAPE = 27;
const SPACE = 32;
const PAGE_UP = 33;
const PAGE_DOWN = 34;
const END = 35;
const HOME = 36;
const LEFT_ARROW = 37;
const UP_ARROW = 38;
const RIGHT_ARROW = 39;
const DOWN_ARROW = 40;
const PLUS_SIGN = 43;
const PRINT_SCREEN = 44;
const INSERT = 45;
const DELETE = 46;
const ZERO = 48;
const ONE = 49;
const TWO = 50;
const THREE = 51;
const FOUR = 52;
const FIVE = 53;
const SIX = 54;
const SEVEN = 55;
const EIGHT = 56;
const NINE = 57;
const FF_SEMICOLON = 59; // Firefox (Gecko) fires this for semicolon instead of 186
const FF_EQUALS = 61; // Firefox (Gecko) fires this for equals instead of 187
const QUESTION_MARK = 63;
const AT_SIGN = 64;
const A = 65;
const B = 66;
const C = 67;
const D = 68;
const E = 69;
const F = 70;
const G = 71;
const H = 72;
const I = 73;
const J = 74;
const K = 75;
const L = 76;
const M = 77;
const N = 78;
const O = 79;
const P = 80;
const Q = 81;
const R = 82;
const S = 83;
const T = 84;
const U = 85;
const V = 86;
const W = 87;
const X = 88;
const Y = 89;
const Z = 90;
const META = 91; // WIN_KEY_LEFT
const MAC_WK_CMD_LEFT = 91;
const MAC_WK_CMD_RIGHT = 93;
const CONTEXT_MENU = 93;
const NUMPAD_ZERO = 96;
const NUMPAD_ONE = 97;
const NUMPAD_TWO = 98;
const NUMPAD_THREE = 99;
const NUMPAD_FOUR = 100;
const NUMPAD_FIVE = 101;
const NUMPAD_SIX = 102;
const NUMPAD_SEVEN = 103;
const NUMPAD_EIGHT = 104;
const NUMPAD_NINE = 105;
const NUMPAD_MULTIPLY = 106;
const NUMPAD_PLUS = 107;
const NUMPAD_MINUS = 109;
const NUMPAD_PERIOD = 110;
const NUMPAD_DIVIDE = 111;
const F1 = 112;
const F2 = 113;
const F3 = 114;
const F4 = 115;
const F5 = 116;
const F6 = 117;
const F7 = 118;
const F8 = 119;
const F9 = 120;
const F10 = 121;
const F11 = 122;
const F12 = 123;
const NUM_LOCK = 144;
const SCROLL_LOCK = 145;
const FIRST_MEDIA = 166;
const FF_MINUS = 173;
const MUTE = 173; // Firefox (Gecko) fires 181 for MUTE
const VOLUME_DOWN = 174; // Firefox (Gecko) fires 182 for VOLUME_DOWN
const VOLUME_UP = 175; // Firefox (Gecko) fires 183 for VOLUME_UP
const FF_MUTE = 181;
const FF_VOLUME_DOWN = 182;
const LAST_MEDIA = 183;
const FF_VOLUME_UP = 183;
const SEMICOLON = 186; // Firefox (Gecko) fires 59 for SEMICOLON
const EQUALS = 187; // Firefox (Gecko) fires 61 for EQUALS
const COMMA = 188;
const DASH = 189; // Firefox (Gecko) fires 173 for DASH/MINUS
const PERIOD = 190;
const SLASH = 191;
const APOSTROPHE = 192;
const TILDE = 192;
const OPEN_SQUARE_BRACKET = 219;
const BACKSLASH = 220;
const CLOSE_SQUARE_BRACKET = 221;
const SINGLE_QUOTE = 222;
const MAC_META = 224;

/**
 * Checks whether a modifier key is pressed.
 * @param event Event to be checked.
 */
function hasModifierKey(event, ...modifiers) {
  if (modifiers.length) {
    return modifiers.some(modifier => event[modifier]);
  }
  return event.altKey || event.shiftKey || event.ctrlKey || event.metaKey;
}

/**
 * Generated bundle index. Do not edit.
 */



/***/ }),

/***/ 93975:
/*!*******************************************************!*\
  !*** ./node_modules/@angular/cdk/fesm2022/layout.mjs ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BreakpointObserver: () => (/* binding */ BreakpointObserver),
/* harmony export */   Breakpoints: () => (/* binding */ Breakpoints),
/* harmony export */   LayoutModule: () => (/* binding */ LayoutModule),
/* harmony export */   MediaMatcher: () => (/* binding */ MediaMatcher)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 59936);
/* harmony import */ var _angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/cdk/coercion */ 45029);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 85028);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ 33410);
/* harmony import */ var _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/cdk/platform */ 92237);






let LayoutModule = /*#__PURE__*/(() => {
  var _class;
  class LayoutModule {}
  _class = LayoutModule;
  _class.ɵfac = function _class_Factory(t) {
    return new (t || _class)();
  };
  _class.ɵmod = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
    type: _class
  });
  _class.ɵinj = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({});
  return LayoutModule;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();

/** Global registry for all dynamically-created, injected media queries. */
const mediaQueriesForWebkitCompatibility = /*#__PURE__*/new Set();
/** Style tag that holds all of the dynamically-created media queries. */
let mediaQueryStyleNode;
/** A utility for calling matchMedia queries. */
let MediaMatcher = /*#__PURE__*/(() => {
  var _class2;
  class MediaMatcher {
    constructor(_platform, _nonce) {
      this._platform = _platform;
      this._nonce = _nonce;
      this._matchMedia = this._platform.isBrowser && window.matchMedia ?
      // matchMedia is bound to the window scope intentionally as it is an illegal invocation to
      // call it from a different scope.
      window.matchMedia.bind(window) : noopMatchMedia;
    }
    /**
     * Evaluates the given media query and returns the native MediaQueryList from which results
     * can be retrieved.
     * Confirms the layout engine will trigger for the selector query provided and returns the
     * MediaQueryList for the query provided.
     */
    matchMedia(query) {
      if (this._platform.WEBKIT || this._platform.BLINK) {
        createEmptyStyleRule(query, this._nonce);
      }
      return this._matchMedia(query);
    }
  }
  _class2 = MediaMatcher;
  _class2.ɵfac = function _class2_Factory(t) {
    return new (t || _class2)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_1__.Platform), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.CSP_NONCE, 8));
  };
  _class2.ɵprov = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
    token: _class2,
    factory: _class2.ɵfac,
    providedIn: 'root'
  });
  return MediaMatcher;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
/**
 * Creates an empty stylesheet that is used to work around browser inconsistencies related to
 * `matchMedia`. At the time of writing, it handles the following cases:
 * 1. On WebKit browsers, a media query has to have at least one rule in order for `matchMedia`
 * to fire. We work around it by declaring a dummy stylesheet with a `@media` declaration.
 * 2. In some cases Blink browsers will stop firing the `matchMedia` listener if none of the rules
 * inside the `@media` match existing elements on the page. We work around it by having one rule
 * targeting the `body`. See https://github.com/angular/components/issues/23546.
 */
function createEmptyStyleRule(query, nonce) {
  if (mediaQueriesForWebkitCompatibility.has(query)) {
    return;
  }
  try {
    if (!mediaQueryStyleNode) {
      mediaQueryStyleNode = document.createElement('style');
      if (nonce) {
        mediaQueryStyleNode.nonce = nonce;
      }
      mediaQueryStyleNode.setAttribute('type', 'text/css');
      document.head.appendChild(mediaQueryStyleNode);
    }
    if (mediaQueryStyleNode.sheet) {
      mediaQueryStyleNode.sheet.insertRule(`@media ${query} {body{ }}`, 0);
      mediaQueriesForWebkitCompatibility.add(query);
    }
  } catch (e) {
    console.error(e);
  }
}
/** No-op matchMedia replacement for non-browser platforms. */
function noopMatchMedia(query) {
  // Use `as any` here to avoid adding additional necessary properties for
  // the noop matcher.
  return {
    matches: query === 'all' || query === '',
    media: query,
    addListener: () => {},
    removeListener: () => {}
  };
}

/** Utility for checking the matching state of @media queries. */
let BreakpointObserver = /*#__PURE__*/(() => {
  var _class3;
  class BreakpointObserver {
    constructor(_mediaMatcher, _zone) {
      this._mediaMatcher = _mediaMatcher;
      this._zone = _zone;
      /**  A map of all media queries currently being listened for. */
      this._queries = new Map();
      /** A subject for all other observables to takeUntil based on. */
      this._destroySubject = new rxjs__WEBPACK_IMPORTED_MODULE_2__.Subject();
    }
    /** Completes the active subject, signalling to all other observables to complete. */
    ngOnDestroy() {
      this._destroySubject.next();
      this._destroySubject.complete();
    }
    /**
     * Whether one or more media queries match the current viewport size.
     * @param value One or more media queries to check.
     * @returns Whether any of the media queries match.
     */
    isMatched(value) {
      const queries = splitQueries((0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_3__.coerceArray)(value));
      return queries.some(mediaQuery => this._registerQuery(mediaQuery).mql.matches);
    }
    /**
     * Gets an observable of results for the given queries that will emit new results for any changes
     * in matching of the given queries.
     * @param value One or more media queries to check.
     * @returns A stream of matches for the given queries.
     */
    observe(value) {
      const queries = splitQueries((0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_3__.coerceArray)(value));
      const observables = queries.map(query => this._registerQuery(query).observable);
      let stateObservable = (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.combineLatest)(observables);
      // Emit the first state immediately, and then debounce the subsequent emissions.
      stateObservable = (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.concat)(stateObservable.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.take)(1)), stateObservable.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.skip)(1), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.debounceTime)(0)));
      return stateObservable.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.map)(breakpointStates => {
        const response = {
          matches: false,
          breakpoints: {}
        };
        breakpointStates.forEach(({
          matches,
          query
        }) => {
          response.matches = response.matches || matches;
          response.breakpoints[query] = matches;
        });
        return response;
      }));
    }
    /** Registers a specific query to be listened for. */
    _registerQuery(query) {
      // Only set up a new MediaQueryList if it is not already being listened for.
      if (this._queries.has(query)) {
        return this._queries.get(query);
      }
      const mql = this._mediaMatcher.matchMedia(query);
      // Create callback for match changes and add it is as a listener.
      const queryObservable = new rxjs__WEBPACK_IMPORTED_MODULE_2__.Observable(observer => {
        // Listener callback methods are wrapped to be placed back in ngZone. Callbacks must be placed
        // back into the zone because matchMedia is only included in Zone.js by loading the
        // webapis-media-query.js file alongside the zone.js file.  Additionally, some browsers do not
        // have MediaQueryList inherit from EventTarget, which causes inconsistencies in how Zone.js
        // patches it.
        const handler = e => this._zone.run(() => observer.next(e));
        mql.addListener(handler);
        return () => {
          mql.removeListener(handler);
        };
      }).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.startWith)(mql), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.map)(({
        matches
      }) => ({
        query,
        matches
      })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.takeUntil)(this._destroySubject));
      // Add the MediaQueryList to the set of queries.
      const output = {
        observable: queryObservable,
        mql
      };
      this._queries.set(query, output);
      return output;
    }
  }
  _class3 = BreakpointObserver;
  _class3.ɵfac = function _class3_Factory(t) {
    return new (t || _class3)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](MediaMatcher), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.NgZone));
  };
  _class3.ɵprov = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
    token: _class3,
    factory: _class3.ɵfac,
    providedIn: 'root'
  });
  return BreakpointObserver;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
/**
 * Split each query string into separate query strings if two queries are provided as comma
 * separated.
 */
function splitQueries(queries) {
  return queries.map(query => query.split(',')).reduce((a1, a2) => a1.concat(a2)).map(query => query.trim());
}

// PascalCase is being used as Breakpoints is used like an enum.
// tslint:disable-next-line:variable-name
const Breakpoints = {
  XSmall: '(max-width: 599.98px)',
  Small: '(min-width: 600px) and (max-width: 959.98px)',
  Medium: '(min-width: 960px) and (max-width: 1279.98px)',
  Large: '(min-width: 1280px) and (max-width: 1919.98px)',
  XLarge: '(min-width: 1920px)',
  Handset: '(max-width: 599.98px) and (orientation: portrait), ' + '(max-width: 959.98px) and (orientation: landscape)',
  Tablet: '(min-width: 600px) and (max-width: 839.98px) and (orientation: portrait), ' + '(min-width: 960px) and (max-width: 1279.98px) and (orientation: landscape)',
  Web: '(min-width: 840px) and (orientation: portrait), ' + '(min-width: 1280px) and (orientation: landscape)',
  HandsetPortrait: '(max-width: 599.98px) and (orientation: portrait)',
  TabletPortrait: '(min-width: 600px) and (max-width: 839.98px) and (orientation: portrait)',
  WebPortrait: '(min-width: 840px) and (orientation: portrait)',
  HandsetLandscape: '(max-width: 959.98px) and (orientation: landscape)',
  TabletLandscape: '(min-width: 960px) and (max-width: 1279.98px) and (orientation: landscape)',
  WebLandscape: '(min-width: 1280px) and (orientation: landscape)'
};

/**
 * Generated bundle index. Do not edit.
 */



/***/ }),

/***/ 24819:
/*!**********************************************************!*\
  !*** ./node_modules/@angular/cdk/fesm2022/observers.mjs ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CdkObserveContent: () => (/* binding */ CdkObserveContent),
/* harmony export */   ContentObserver: () => (/* binding */ ContentObserver),
/* harmony export */   MutationObserverFactory: () => (/* binding */ MutationObserverFactory),
/* harmony export */   ObserversModule: () => (/* binding */ ObserversModule)
/* harmony export */ });
/* harmony import */ var _angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/cdk/coercion */ 45029);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 59936);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 85028);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 33410);






/**
 * Factory that creates a new MutationObserver and allows us to stub it out in unit tests.
 * @docs-private
 */
let MutationObserverFactory = /*#__PURE__*/(() => {
  var _class;
  class MutationObserverFactory {
    create(callback) {
      return typeof MutationObserver === 'undefined' ? null : new MutationObserver(callback);
    }
  }
  _class = MutationObserverFactory;
  _class.ɵfac = function _class_Factory(t) {
    return new (t || _class)();
  };
  _class.ɵprov = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
    token: _class,
    factory: _class.ɵfac,
    providedIn: 'root'
  });
  return MutationObserverFactory;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
/** An injectable service that allows watching elements for changes to their content. */
let ContentObserver = /*#__PURE__*/(() => {
  var _class2;
  class ContentObserver {
    constructor(_mutationObserverFactory) {
      this._mutationObserverFactory = _mutationObserverFactory;
      /** Keeps track of the existing MutationObservers so they can be reused. */
      this._observedElements = new Map();
    }
    ngOnDestroy() {
      this._observedElements.forEach((_, element) => this._cleanupObserver(element));
    }
    observe(elementOrRef) {
      const element = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_1__.coerceElement)(elementOrRef);
      return new rxjs__WEBPACK_IMPORTED_MODULE_2__.Observable(observer => {
        const stream = this._observeElement(element);
        const subscription = stream.subscribe(observer);
        return () => {
          subscription.unsubscribe();
          this._unobserveElement(element);
        };
      });
    }
    /**
     * Observes the given element by using the existing MutationObserver if available, or creating a
     * new one if not.
     */
    _observeElement(element) {
      if (!this._observedElements.has(element)) {
        const stream = new rxjs__WEBPACK_IMPORTED_MODULE_2__.Subject();
        const observer = this._mutationObserverFactory.create(mutations => stream.next(mutations));
        if (observer) {
          observer.observe(element, {
            characterData: true,
            childList: true,
            subtree: true
          });
        }
        this._observedElements.set(element, {
          observer,
          stream,
          count: 1
        });
      } else {
        this._observedElements.get(element).count++;
      }
      return this._observedElements.get(element).stream;
    }
    /**
     * Un-observes the given element and cleans up the underlying MutationObserver if nobody else is
     * observing this element.
     */
    _unobserveElement(element) {
      if (this._observedElements.has(element)) {
        this._observedElements.get(element).count--;
        if (!this._observedElements.get(element).count) {
          this._cleanupObserver(element);
        }
      }
    }
    /** Clean up the underlying MutationObserver for the specified element. */
    _cleanupObserver(element) {
      if (this._observedElements.has(element)) {
        const {
          observer,
          stream
        } = this._observedElements.get(element);
        if (observer) {
          observer.disconnect();
        }
        stream.complete();
        this._observedElements.delete(element);
      }
    }
  }
  _class2 = ContentObserver;
  _class2.ɵfac = function _class2_Factory(t) {
    return new (t || _class2)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](MutationObserverFactory));
  };
  _class2.ɵprov = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
    token: _class2,
    factory: _class2.ɵfac,
    providedIn: 'root'
  });
  return ContentObserver;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
/**
 * Directive that triggers a callback whenever the content of
 * its associated element has changed.
 */
let CdkObserveContent = /*#__PURE__*/(() => {
  var _class3;
  class CdkObserveContent {
    /**
     * Whether observing content is disabled. This option can be used
     * to disconnect the underlying MutationObserver until it is needed.
     */
    get disabled() {
      return this._disabled;
    }
    set disabled(value) {
      this._disabled = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_1__.coerceBooleanProperty)(value);
      this._disabled ? this._unsubscribe() : this._subscribe();
    }
    /** Debounce interval for emitting the changes. */
    get debounce() {
      return this._debounce;
    }
    set debounce(value) {
      this._debounce = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_1__.coerceNumberProperty)(value);
      this._subscribe();
    }
    constructor(_contentObserver, _elementRef, _ngZone) {
      this._contentObserver = _contentObserver;
      this._elementRef = _elementRef;
      this._ngZone = _ngZone;
      /** Event emitted for each change in the element's content. */
      this.event = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
      this._disabled = false;
      this._currentSubscription = null;
    }
    ngAfterContentInit() {
      if (!this._currentSubscription && !this.disabled) {
        this._subscribe();
      }
    }
    ngOnDestroy() {
      this._unsubscribe();
    }
    _subscribe() {
      this._unsubscribe();
      const stream = this._contentObserver.observe(this._elementRef);
      // TODO(mmalerba): We shouldn't be emitting on this @Output() outside the zone.
      // Consider brining it back inside the zone next time we're making breaking changes.
      // Bringing it back inside can cause things like infinite change detection loops and changed
      // after checked errors if people's code isn't handling it properly.
      this._ngZone.runOutsideAngular(() => {
        this._currentSubscription = (this.debounce ? stream.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.debounceTime)(this.debounce)) : stream).subscribe(this.event);
      });
    }
    _unsubscribe() {
      this._currentSubscription?.unsubscribe();
    }
  }
  _class3 = CdkObserveContent;
  _class3.ɵfac = function _class3_Factory(t) {
    return new (t || _class3)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](ContentObserver), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.NgZone));
  };
  _class3.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
    type: _class3,
    selectors: [["", "cdkObserveContent", ""]],
    inputs: {
      disabled: ["cdkObserveContentDisabled", "disabled"],
      debounce: "debounce"
    },
    outputs: {
      event: "cdkObserveContent"
    },
    exportAs: ["cdkObserveContent"]
  });
  return CdkObserveContent;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
let ObserversModule = /*#__PURE__*/(() => {
  var _class4;
  class ObserversModule {}
  _class4 = ObserversModule;
  _class4.ɵfac = function _class4_Factory(t) {
    return new (t || _class4)();
  };
  _class4.ɵmod = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
    type: _class4
  });
  _class4.ɵinj = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
    providers: [MutationObserverFactory]
  });
  return ObserversModule;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();

/**
 * Generated bundle index. Do not edit.
 */



/***/ }),

/***/ 92237:
/*!*********************************************************!*\
  !*** ./node_modules/@angular/cdk/fesm2022/platform.mjs ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Platform: () => (/* binding */ Platform),
/* harmony export */   PlatformModule: () => (/* binding */ PlatformModule),
/* harmony export */   _getEventTarget: () => (/* binding */ _getEventTarget),
/* harmony export */   _getFocusedElementPierceShadowDom: () => (/* binding */ _getFocusedElementPierceShadowDom),
/* harmony export */   _getShadowRoot: () => (/* binding */ _getShadowRoot),
/* harmony export */   _isTestEnvironment: () => (/* binding */ _isTestEnvironment),
/* harmony export */   _supportsShadowDom: () => (/* binding */ _supportsShadowDom),
/* harmony export */   getRtlScrollAxisType: () => (/* binding */ getRtlScrollAxisType),
/* harmony export */   getSupportedInputTypes: () => (/* binding */ getSupportedInputTypes),
/* harmony export */   normalizePassiveListenerOptions: () => (/* binding */ normalizePassiveListenerOptions),
/* harmony export */   supportsPassiveEventListeners: () => (/* binding */ supportsPassiveEventListeners),
/* harmony export */   supportsScrollBehavior: () => (/* binding */ supportsScrollBehavior)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 59936);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ 34228);




// Whether the current platform supports the V8 Break Iterator. The V8 check
// is necessary to detect all Blink based browsers.
let hasV8BreakIterator;
// We need a try/catch around the reference to `Intl`, because accessing it in some cases can
// cause IE to throw. These cases are tied to particular versions of Windows and can happen if
// the consumer is providing a polyfilled `Map`. See:
// https://github.com/Microsoft/ChakraCore/issues/3189
// https://github.com/angular/components/issues/15687
try {
  hasV8BreakIterator = typeof Intl !== 'undefined' && Intl.v8BreakIterator;
} catch {
  hasV8BreakIterator = false;
}
/**
 * Service to detect the current platform by comparing the userAgent strings and
 * checking browser-specific global properties.
 */
let Platform = /*#__PURE__*/(() => {
  var _class;
  class Platform {
    constructor(_platformId) {
      this._platformId = _platformId;
      // We want to use the Angular platform check because if the Document is shimmed
      // without the navigator, the following checks will fail. This is preferred because
      // sometimes the Document may be shimmed without the user's knowledge or intention
      /** Whether the Angular application is being rendered in the browser. */
      this.isBrowser = this._platformId ? (0,_angular_common__WEBPACK_IMPORTED_MODULE_0__.isPlatformBrowser)(this._platformId) : typeof document === 'object' && !!document;
      /** Whether the current browser is Microsoft Edge. */
      this.EDGE = this.isBrowser && /(edge)/i.test(navigator.userAgent);
      /** Whether the current rendering engine is Microsoft Trident. */
      this.TRIDENT = this.isBrowser && /(msie|trident)/i.test(navigator.userAgent);
      // EdgeHTML and Trident mock Blink specific things and need to be excluded from this check.
      /** Whether the current rendering engine is Blink. */
      this.BLINK = this.isBrowser && !!(window.chrome || hasV8BreakIterator) && typeof CSS !== 'undefined' && !this.EDGE && !this.TRIDENT;
      // Webkit is part of the userAgent in EdgeHTML, Blink and Trident. Therefore we need to
      // ensure that Webkit runs standalone and is not used as another engine's base.
      /** Whether the current rendering engine is WebKit. */
      this.WEBKIT = this.isBrowser && /AppleWebKit/i.test(navigator.userAgent) && !this.BLINK && !this.EDGE && !this.TRIDENT;
      /** Whether the current platform is Apple iOS. */
      this.IOS = this.isBrowser && /iPad|iPhone|iPod/.test(navigator.userAgent) && !('MSStream' in window);
      // It's difficult to detect the plain Gecko engine, because most of the browsers identify
      // them self as Gecko-like browsers and modify the userAgent's according to that.
      // Since we only cover one explicit Firefox case, we can simply check for Firefox
      // instead of having an unstable check for Gecko.
      /** Whether the current browser is Firefox. */
      this.FIREFOX = this.isBrowser && /(firefox|minefield)/i.test(navigator.userAgent);
      /** Whether the current platform is Android. */
      // Trident on mobile adds the android platform to the userAgent to trick detections.
      this.ANDROID = this.isBrowser && /android/i.test(navigator.userAgent) && !this.TRIDENT;
      // Safari browsers will include the Safari keyword in their userAgent. Some browsers may fake
      // this and just place the Safari keyword in the userAgent. To be more safe about Safari every
      // Safari browser should also use Webkit as its layout engine.
      /** Whether the current browser is Safari. */
      this.SAFARI = this.isBrowser && /safari/i.test(navigator.userAgent) && this.WEBKIT;
    }
  }
  _class = Platform;
  _class.ɵfac = function _class_Factory(t) {
    return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.PLATFORM_ID));
  };
  _class.ɵprov = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
    token: _class,
    factory: _class.ɵfac,
    providedIn: 'root'
  });
  return Platform;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
let PlatformModule = /*#__PURE__*/(() => {
  var _class2;
  class PlatformModule {}
  _class2 = PlatformModule;
  _class2.ɵfac = function _class2_Factory(t) {
    return new (t || _class2)();
  };
  _class2.ɵmod = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
    type: _class2
  });
  _class2.ɵinj = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({});
  return PlatformModule;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();

/** Cached result Set of input types support by the current browser. */
let supportedInputTypes;
/** Types of `<input>` that *might* be supported. */
const candidateInputTypes = [
// `color` must come first. Chrome 56 shows a warning if we change the type to `color` after
// first changing it to something else:
// The specified value "" does not conform to the required format.
// The format is "#rrggbb" where rr, gg, bb are two-digit hexadecimal numbers.
'color', 'button', 'checkbox', 'date', 'datetime-local', 'email', 'file', 'hidden', 'image', 'month', 'number', 'password', 'radio', 'range', 'reset', 'search', 'submit', 'tel', 'text', 'time', 'url', 'week'];
/** @returns The input types supported by this browser. */
function getSupportedInputTypes() {
  // Result is cached.
  if (supportedInputTypes) {
    return supportedInputTypes;
  }
  // We can't check if an input type is not supported until we're on the browser, so say that
  // everything is supported when not on the browser. We don't use `Platform` here since it's
  // just a helper function and can't inject it.
  if (typeof document !== 'object' || !document) {
    supportedInputTypes = new Set(candidateInputTypes);
    return supportedInputTypes;
  }
  let featureTestInput = document.createElement('input');
  supportedInputTypes = new Set(candidateInputTypes.filter(value => {
    featureTestInput.setAttribute('type', value);
    return featureTestInput.type === value;
  }));
  return supportedInputTypes;
}

/** Cached result of whether the user's browser supports passive event listeners. */
let supportsPassiveEvents;
/**
 * Checks whether the user's browser supports passive event listeners.
 * See: https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md
 */
function supportsPassiveEventListeners() {
  if (supportsPassiveEvents == null && typeof window !== 'undefined') {
    try {
      window.addEventListener('test', null, Object.defineProperty({}, 'passive', {
        get: () => supportsPassiveEvents = true
      }));
    } finally {
      supportsPassiveEvents = supportsPassiveEvents || false;
    }
  }
  return supportsPassiveEvents;
}
/**
 * Normalizes an `AddEventListener` object to something that can be passed
 * to `addEventListener` on any browser, no matter whether it supports the
 * `options` parameter.
 * @param options Object to be normalized.
 */
function normalizePassiveListenerOptions(options) {
  return supportsPassiveEventListeners() ? options : !!options.capture;
}

/** Cached result of the way the browser handles the horizontal scroll axis in RTL mode. */
let rtlScrollAxisType;
/** Cached result of the check that indicates whether the browser supports scroll behaviors. */
let scrollBehaviorSupported;
/** Check whether the browser supports scroll behaviors. */
function supportsScrollBehavior() {
  if (scrollBehaviorSupported == null) {
    // If we're not in the browser, it can't be supported. Also check for `Element`, because
    // some projects stub out the global `document` during SSR which can throw us off.
    if (typeof document !== 'object' || !document || typeof Element !== 'function' || !Element) {
      scrollBehaviorSupported = false;
      return scrollBehaviorSupported;
    }
    // If the element can have a `scrollBehavior` style, we can be sure that it's supported.
    if ('scrollBehavior' in document.documentElement.style) {
      scrollBehaviorSupported = true;
    } else {
      // At this point we have 3 possibilities: `scrollTo` isn't supported at all, it's
      // supported but it doesn't handle scroll behavior, or it has been polyfilled.
      const scrollToFunction = Element.prototype.scrollTo;
      if (scrollToFunction) {
        // We can detect if the function has been polyfilled by calling `toString` on it. Native
        // functions are obfuscated using `[native code]`, whereas if it was overwritten we'd get
        // the actual function source. Via https://davidwalsh.name/detect-native-function. Consider
        // polyfilled functions as supporting scroll behavior.
        scrollBehaviorSupported = !/\{\s*\[native code\]\s*\}/.test(scrollToFunction.toString());
      } else {
        scrollBehaviorSupported = false;
      }
    }
  }
  return scrollBehaviorSupported;
}
/**
 * Checks the type of RTL scroll axis used by this browser. As of time of writing, Chrome is NORMAL,
 * Firefox & Safari are NEGATED, and IE & Edge are INVERTED.
 */
function getRtlScrollAxisType() {
  // We can't check unless we're on the browser. Just assume 'normal' if we're not.
  if (typeof document !== 'object' || !document) {
    return 0 /* RtlScrollAxisType.NORMAL */;
  }

  if (rtlScrollAxisType == null) {
    // Create a 1px wide scrolling container and a 2px wide content element.
    const scrollContainer = document.createElement('div');
    const containerStyle = scrollContainer.style;
    scrollContainer.dir = 'rtl';
    containerStyle.width = '1px';
    containerStyle.overflow = 'auto';
    containerStyle.visibility = 'hidden';
    containerStyle.pointerEvents = 'none';
    containerStyle.position = 'absolute';
    const content = document.createElement('div');
    const contentStyle = content.style;
    contentStyle.width = '2px';
    contentStyle.height = '1px';
    scrollContainer.appendChild(content);
    document.body.appendChild(scrollContainer);
    rtlScrollAxisType = 0 /* RtlScrollAxisType.NORMAL */;
    // The viewport starts scrolled all the way to the right in RTL mode. If we are in a NORMAL
    // browser this would mean that the scrollLeft should be 1. If it's zero instead we know we're
    // dealing with one of the other two types of browsers.
    if (scrollContainer.scrollLeft === 0) {
      // In a NEGATED browser the scrollLeft is always somewhere in [-maxScrollAmount, 0]. For an
      // INVERTED browser it is always somewhere in [0, maxScrollAmount]. We can determine which by
      // setting to the scrollLeft to 1. This is past the max for a NEGATED browser, so it will
      // return 0 when we read it again.
      scrollContainer.scrollLeft = 1;
      rtlScrollAxisType = scrollContainer.scrollLeft === 0 ? 1 /* RtlScrollAxisType.NEGATED */ : 2 /* RtlScrollAxisType.INVERTED */;
    }

    scrollContainer.remove();
  }
  return rtlScrollAxisType;
}
let shadowDomIsSupported;
/** Checks whether the user's browser support Shadow DOM. */
function _supportsShadowDom() {
  if (shadowDomIsSupported == null) {
    const head = typeof document !== 'undefined' ? document.head : null;
    shadowDomIsSupported = !!(head && (head.createShadowRoot || head.attachShadow));
  }
  return shadowDomIsSupported;
}
/** Gets the shadow root of an element, if supported and the element is inside the Shadow DOM. */
function _getShadowRoot(element) {
  if (_supportsShadowDom()) {
    const rootNode = element.getRootNode ? element.getRootNode() : null;
    // Note that this should be caught by `_supportsShadowDom`, but some
    // teams have been able to hit this code path on unsupported browsers.
    if (typeof ShadowRoot !== 'undefined' && ShadowRoot && rootNode instanceof ShadowRoot) {
      return rootNode;
    }
  }
  return null;
}
/**
 * Gets the currently-focused element on the page while
 * also piercing through Shadow DOM boundaries.
 */
function _getFocusedElementPierceShadowDom() {
  let activeElement = typeof document !== 'undefined' && document ? document.activeElement : null;
  while (activeElement && activeElement.shadowRoot) {
    const newActiveElement = activeElement.shadowRoot.activeElement;
    if (newActiveElement === activeElement) {
      break;
    } else {
      activeElement = newActiveElement;
    }
  }
  return activeElement;
}
/** Gets the target of an event while accounting for Shadow DOM. */
function _getEventTarget(event) {
  // If an event is bound outside the Shadow DOM, the `event.target` will
  // point to the shadow root so we have to use `composedPath` instead.
  return event.composedPath ? event.composedPath()[0] : event.target;
}

/** Gets whether the code is currently running in a test environment. */
function _isTestEnvironment() {
  // We can't use `declare const` because it causes conflicts inside Google with the real typings
  // for these symbols and we can't read them off the global object, because they don't appear to
  // be attached there for some runners like Jest.
  // (see: https://github.com/angular/components/issues/23365#issuecomment-938146643)
  return (
    // @ts-ignore
    typeof __karma__ !== 'undefined' && !!__karma__ ||
    // @ts-ignore
    typeof jasmine !== 'undefined' && !!jasmine ||
    // @ts-ignore
    typeof jest !== 'undefined' && !!jest ||
    // @ts-ignore
    typeof Mocha !== 'undefined' && !!Mocha
  );
}

/**
 * Generated bundle index. Do not edit.
 */



/***/ }),

/***/ 63490:
/*!************************************************************!*\
  !*** ./node_modules/@angular/material/fesm2022/button.mjs ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MAT_FAB_DEFAULT_OPTIONS: () => (/* binding */ MAT_FAB_DEFAULT_OPTIONS),
/* harmony export */   MAT_FAB_DEFAULT_OPTIONS_FACTORY: () => (/* binding */ MAT_FAB_DEFAULT_OPTIONS_FACTORY),
/* harmony export */   MatAnchor: () => (/* binding */ MatAnchor),
/* harmony export */   MatButton: () => (/* binding */ MatButton),
/* harmony export */   MatButtonModule: () => (/* binding */ MatButtonModule),
/* harmony export */   MatFabAnchor: () => (/* binding */ MatFabAnchor),
/* harmony export */   MatFabButton: () => (/* binding */ MatFabButton),
/* harmony export */   MatIconAnchor: () => (/* binding */ MatIconAnchor),
/* harmony export */   MatIconButton: () => (/* binding */ MatIconButton),
/* harmony export */   MatMiniFabAnchor: () => (/* binding */ MatMiniFabAnchor),
/* harmony export */   MatMiniFabButton: () => (/* binding */ MatMiniFabButton)
/* harmony export */ });
/* harmony import */ var _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/cdk/platform */ 92237);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser/animations */ 59936);
/* harmony import */ var _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/cdk/a11y */ 5612);
/* harmony import */ var _angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/cdk/coercion */ 45029);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/material/core */ 56381);








/** Inputs common to all buttons. */
const _c0 = ["mat-button", ""];
const _c1 = [[["", 8, "material-icons", 3, "iconPositionEnd", ""], ["mat-icon", 3, "iconPositionEnd", ""], ["", "matButtonIcon", "", 3, "iconPositionEnd", ""]], "*", [["", "iconPositionEnd", "", 8, "material-icons"], ["mat-icon", "iconPositionEnd", ""], ["", "matButtonIcon", "", "iconPositionEnd", ""]]];
const _c2 = [".material-icons:not([iconPositionEnd]), mat-icon:not([iconPositionEnd]), [matButtonIcon]:not([iconPositionEnd])", "*", ".material-icons[iconPositionEnd], mat-icon[iconPositionEnd], [matButtonIcon][iconPositionEnd]"];
const _c3 = ".mdc-touch-target-wrapper{display:inline}.mdc-elevation-overlay{position:absolute;border-radius:inherit;pointer-events:none;opacity:var(--mdc-elevation-overlay-opacity, 0);transition:opacity 280ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-button{position:relative;display:inline-flex;align-items:center;justify-content:center;box-sizing:border-box;min-width:64px;border:none;outline:none;line-height:inherit;user-select:none;-webkit-appearance:none;overflow:visible;vertical-align:middle;background:rgba(0,0,0,0)}.mdc-button .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}.mdc-button::-moz-focus-inner{padding:0;border:0}.mdc-button:active{outline:none}.mdc-button:hover{cursor:pointer}.mdc-button:disabled{cursor:default;pointer-events:none}.mdc-button[hidden]{display:none}.mdc-button .mdc-button__icon{margin-left:0;margin-right:8px;display:inline-block;position:relative;vertical-align:top}[dir=rtl] .mdc-button .mdc-button__icon,.mdc-button .mdc-button__icon[dir=rtl]{margin-left:8px;margin-right:0}.mdc-button .mdc-button__progress-indicator{font-size:0;position:absolute;transform:translate(-50%, -50%);top:50%;left:50%;line-height:initial}.mdc-button .mdc-button__label{position:relative}.mdc-button .mdc-button__focus-ring{pointer-events:none;border:2px solid rgba(0,0,0,0);border-radius:6px;box-sizing:content-box;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);height:calc(\n      100% + 4px\n    );width:calc(\n      100% + 4px\n    );display:none}@media screen and (forced-colors: active){.mdc-button .mdc-button__focus-ring{border-color:CanvasText}}.mdc-button .mdc-button__focus-ring::after{content:\"\";border:2px solid rgba(0,0,0,0);border-radius:8px;display:block;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);height:calc(100% + 4px);width:calc(100% + 4px)}@media screen and (forced-colors: active){.mdc-button .mdc-button__focus-ring::after{border-color:CanvasText}}@media screen and (forced-colors: active){.mdc-button.mdc-ripple-upgraded--background-focused .mdc-button__focus-ring,.mdc-button:not(.mdc-ripple-upgraded):focus .mdc-button__focus-ring{display:block}}.mdc-button .mdc-button__touch{position:absolute;top:50%;height:48px;left:0;right:0;transform:translateY(-50%)}.mdc-button__label+.mdc-button__icon{margin-left:8px;margin-right:0}[dir=rtl] .mdc-button__label+.mdc-button__icon,.mdc-button__label+.mdc-button__icon[dir=rtl]{margin-left:0;margin-right:8px}svg.mdc-button__icon{fill:currentColor}.mdc-button--touch{margin-top:6px;margin-bottom:6px}.mdc-button{padding:0 8px 0 8px}.mdc-button--unelevated{transition:box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);padding:0 16px 0 16px}.mdc-button--unelevated.mdc-button--icon-trailing{padding:0 12px 0 16px}.mdc-button--unelevated.mdc-button--icon-leading{padding:0 16px 0 12px}.mdc-button--raised{transition:box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);padding:0 16px 0 16px}.mdc-button--raised.mdc-button--icon-trailing{padding:0 12px 0 16px}.mdc-button--raised.mdc-button--icon-leading{padding:0 16px 0 12px}.mdc-button--outlined{border-style:solid;transition:border 280ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-button--outlined .mdc-button__ripple{border-style:solid;border-color:rgba(0,0,0,0)}.mat-mdc-button{height:var(--mdc-text-button-container-height, 36px);border-radius:var(--mdc-text-button-container-shape, var(--mdc-shape-small, 4px))}.mat-mdc-button:not(:disabled){color:var(--mdc-text-button-label-text-color, inherit)}.mat-mdc-button:disabled{color:var(--mdc-text-button-disabled-label-text-color, rgba(0, 0, 0, 0.38))}.mat-mdc-button .mdc-button__ripple{border-radius:var(--mdc-text-button-container-shape, var(--mdc-shape-small, 4px))}.mat-mdc-unelevated-button{height:var(--mdc-filled-button-container-height, 36px);border-radius:var(--mdc-filled-button-container-shape, var(--mdc-shape-small, 4px))}.mat-mdc-unelevated-button:not(:disabled){background-color:var(--mdc-filled-button-container-color, transparent)}.mat-mdc-unelevated-button:disabled{background-color:var(--mdc-filled-button-disabled-container-color, rgba(0, 0, 0, 0.12))}.mat-mdc-unelevated-button:not(:disabled){color:var(--mdc-filled-button-label-text-color, inherit)}.mat-mdc-unelevated-button:disabled{color:var(--mdc-filled-button-disabled-label-text-color, rgba(0, 0, 0, 0.38))}.mat-mdc-unelevated-button .mdc-button__ripple{border-radius:var(--mdc-filled-button-container-shape, var(--mdc-shape-small, 4px))}.mat-mdc-raised-button{height:var(--mdc-protected-button-container-height, 36px);border-radius:var(--mdc-protected-button-container-shape, var(--mdc-shape-small, 4px));box-shadow:var(--mdc-protected-button-container-elevation, 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12))}.mat-mdc-raised-button:not(:disabled){background-color:var(--mdc-protected-button-container-color, transparent)}.mat-mdc-raised-button:disabled{background-color:var(--mdc-protected-button-disabled-container-color, rgba(0, 0, 0, 0.12))}.mat-mdc-raised-button:not(:disabled){color:var(--mdc-protected-button-label-text-color, inherit)}.mat-mdc-raised-button:disabled{color:var(--mdc-protected-button-disabled-label-text-color, rgba(0, 0, 0, 0.38))}.mat-mdc-raised-button .mdc-button__ripple{border-radius:var(--mdc-protected-button-container-shape, var(--mdc-shape-small, 4px))}.mat-mdc-raised-button.mdc-ripple-upgraded--background-focused,.mat-mdc-raised-button:not(.mdc-ripple-upgraded):focus{box-shadow:var(--mdc-protected-button-focus-container-elevation, 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12))}.mat-mdc-raised-button:hover{box-shadow:var(--mdc-protected-button-hover-container-elevation, 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12))}.mat-mdc-raised-button:not(:disabled):active{box-shadow:var(--mdc-protected-button-pressed-container-elevation, 0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12))}.mat-mdc-raised-button:disabled{box-shadow:var(--mdc-protected-button-disabled-container-elevation, 0px 0px 0px 0px rgba(0, 0, 0, 0.2), 0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 0px 0px 0px rgba(0, 0, 0, 0.12))}.mat-mdc-outlined-button{height:var(--mdc-outlined-button-container-height, 36px);border-radius:var(--mdc-outlined-button-container-shape, var(--mdc-shape-small, 4px));padding:0 15px 0 15px;border-width:var(--mdc-outlined-button-outline-width, 1px)}.mat-mdc-outlined-button:not(:disabled){color:var(--mdc-outlined-button-label-text-color, inherit)}.mat-mdc-outlined-button:disabled{color:var(--mdc-outlined-button-disabled-label-text-color, rgba(0, 0, 0, 0.38))}.mat-mdc-outlined-button .mdc-button__ripple{border-radius:var(--mdc-outlined-button-container-shape, var(--mdc-shape-small, 4px))}.mat-mdc-outlined-button:not(:disabled){border-color:var(--mdc-outlined-button-outline-color, rgba(0, 0, 0, 0.12))}.mat-mdc-outlined-button:disabled{border-color:var(--mdc-outlined-button-disabled-outline-color, rgba(0, 0, 0, 0.12))}.mat-mdc-outlined-button.mdc-button--icon-trailing{padding:0 11px 0 15px}.mat-mdc-outlined-button.mdc-button--icon-leading{padding:0 15px 0 11px}.mat-mdc-outlined-button .mdc-button__ripple{top:-1px;left:-1px;bottom:-1px;right:-1px;border-width:var(--mdc-outlined-button-outline-width, 1px)}.mat-mdc-outlined-button .mdc-button__touch{left:calc(-1 * var(--mdc-outlined-button-outline-width, 1px));width:calc(100% + 2 * var(--mdc-outlined-button-outline-width, 1px))}.mat-mdc-button,.mat-mdc-unelevated-button,.mat-mdc-raised-button,.mat-mdc-outlined-button{-webkit-tap-highlight-color:rgba(0,0,0,0)}.mat-mdc-button .mat-mdc-button-ripple,.mat-mdc-button .mat-mdc-button-persistent-ripple,.mat-mdc-button .mat-mdc-button-persistent-ripple::before,.mat-mdc-unelevated-button .mat-mdc-button-ripple,.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple,.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple::before,.mat-mdc-raised-button .mat-mdc-button-ripple,.mat-mdc-raised-button .mat-mdc-button-persistent-ripple,.mat-mdc-raised-button .mat-mdc-button-persistent-ripple::before,.mat-mdc-outlined-button .mat-mdc-button-ripple,.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple,.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple::before{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mat-mdc-button .mat-mdc-button-ripple,.mat-mdc-unelevated-button .mat-mdc-button-ripple,.mat-mdc-raised-button .mat-mdc-button-ripple,.mat-mdc-outlined-button .mat-mdc-button-ripple{overflow:hidden}.mat-mdc-button .mat-mdc-button-persistent-ripple::before,.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple::before,.mat-mdc-raised-button .mat-mdc-button-persistent-ripple::before,.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple::before{content:\"\";opacity:0;background-color:var(--mat-mdc-button-persistent-ripple-color)}.mat-mdc-button .mat-ripple-element,.mat-mdc-unelevated-button .mat-ripple-element,.mat-mdc-raised-button .mat-ripple-element,.mat-mdc-outlined-button .mat-ripple-element{background-color:var(--mat-mdc-button-ripple-color)}.mat-mdc-button .mdc-button__label,.mat-mdc-unelevated-button .mdc-button__label,.mat-mdc-raised-button .mdc-button__label,.mat-mdc-outlined-button .mdc-button__label{z-index:1}.mat-mdc-button .mat-mdc-focus-indicator,.mat-mdc-unelevated-button .mat-mdc-focus-indicator,.mat-mdc-raised-button .mat-mdc-focus-indicator,.mat-mdc-outlined-button .mat-mdc-focus-indicator{top:0;left:0;right:0;bottom:0;position:absolute}.mat-mdc-button:focus .mat-mdc-focus-indicator::before,.mat-mdc-unelevated-button:focus .mat-mdc-focus-indicator::before,.mat-mdc-raised-button:focus .mat-mdc-focus-indicator::before,.mat-mdc-outlined-button:focus .mat-mdc-focus-indicator::before{content:\"\"}.mat-mdc-button[disabled],.mat-mdc-unelevated-button[disabled],.mat-mdc-raised-button[disabled],.mat-mdc-outlined-button[disabled]{cursor:default;pointer-events:none}.mat-mdc-button .mat-mdc-button-touch-target,.mat-mdc-unelevated-button .mat-mdc-button-touch-target,.mat-mdc-raised-button .mat-mdc-button-touch-target,.mat-mdc-outlined-button .mat-mdc-button-touch-target{position:absolute;top:50%;height:48px;left:0;right:0;transform:translateY(-50%)}.mat-mdc-button._mat-animation-noopable,.mat-mdc-unelevated-button._mat-animation-noopable,.mat-mdc-raised-button._mat-animation-noopable,.mat-mdc-outlined-button._mat-animation-noopable{transition:none !important;animation:none !important}.mat-mdc-button>.mat-icon{margin-left:0;margin-right:8px;display:inline-block;position:relative;vertical-align:top;font-size:1.125rem;height:1.125rem;width:1.125rem}[dir=rtl] .mat-mdc-button>.mat-icon,.mat-mdc-button>.mat-icon[dir=rtl]{margin-left:8px;margin-right:0}.mat-mdc-button .mdc-button__label+.mat-icon{margin-left:8px;margin-right:0}[dir=rtl] .mat-mdc-button .mdc-button__label+.mat-icon,.mat-mdc-button .mdc-button__label+.mat-icon[dir=rtl]{margin-left:0;margin-right:8px}.mat-mdc-unelevated-button>.mat-icon,.mat-mdc-raised-button>.mat-icon,.mat-mdc-outlined-button>.mat-icon{margin-left:0;margin-right:8px;display:inline-block;position:relative;vertical-align:top;font-size:1.125rem;height:1.125rem;width:1.125rem;margin-left:-4px;margin-right:8px}[dir=rtl] .mat-mdc-unelevated-button>.mat-icon,[dir=rtl] .mat-mdc-raised-button>.mat-icon,[dir=rtl] .mat-mdc-outlined-button>.mat-icon,.mat-mdc-unelevated-button>.mat-icon[dir=rtl],.mat-mdc-raised-button>.mat-icon[dir=rtl],.mat-mdc-outlined-button>.mat-icon[dir=rtl]{margin-left:8px;margin-right:0}[dir=rtl] .mat-mdc-unelevated-button>.mat-icon,[dir=rtl] .mat-mdc-raised-button>.mat-icon,[dir=rtl] .mat-mdc-outlined-button>.mat-icon,.mat-mdc-unelevated-button>.mat-icon[dir=rtl],.mat-mdc-raised-button>.mat-icon[dir=rtl],.mat-mdc-outlined-button>.mat-icon[dir=rtl]{margin-left:8px;margin-right:-4px}.mat-mdc-unelevated-button .mdc-button__label+.mat-icon,.mat-mdc-raised-button .mdc-button__label+.mat-icon,.mat-mdc-outlined-button .mdc-button__label+.mat-icon{margin-left:8px;margin-right:-4px}[dir=rtl] .mat-mdc-unelevated-button .mdc-button__label+.mat-icon,[dir=rtl] .mat-mdc-raised-button .mdc-button__label+.mat-icon,[dir=rtl] .mat-mdc-outlined-button .mdc-button__label+.mat-icon,.mat-mdc-unelevated-button .mdc-button__label+.mat-icon[dir=rtl],.mat-mdc-raised-button .mdc-button__label+.mat-icon[dir=rtl],.mat-mdc-outlined-button .mdc-button__label+.mat-icon[dir=rtl]{margin-left:-4px;margin-right:8px}.mat-mdc-outlined-button .mat-mdc-button-ripple,.mat-mdc-outlined-button .mdc-button__ripple{top:-1px;left:-1px;bottom:-1px;right:-1px;border-width:-1px}.mat-mdc-unelevated-button .mat-mdc-focus-indicator::before,.mat-mdc-raised-button .mat-mdc-focus-indicator::before{margin:calc(calc(var(--mat-mdc-focus-indicator-border-width, 3px) + 2px) * -1)}.mat-mdc-outlined-button .mat-mdc-focus-indicator::before{margin:calc(calc(var(--mat-mdc-focus-indicator-border-width, 3px) + 3px) * -1)}";
const _c4 = ".cdk-high-contrast-active .mat-mdc-button:not(.mdc-button--outlined),.cdk-high-contrast-active .mat-mdc-unelevated-button:not(.mdc-button--outlined),.cdk-high-contrast-active .mat-mdc-raised-button:not(.mdc-button--outlined),.cdk-high-contrast-active .mat-mdc-outlined-button:not(.mdc-button--outlined),.cdk-high-contrast-active .mat-mdc-icon-button{outline:solid 1px}";
const _c5 = ["mat-fab", ""];
const _c6 = ["mat-mini-fab", ""];
const _c7 = ".mdc-touch-target-wrapper{display:inline}.mdc-elevation-overlay{position:absolute;border-radius:inherit;pointer-events:none;opacity:var(--mdc-elevation-overlay-opacity);transition:opacity 280ms cubic-bezier(0.4, 0, 0.2, 1);background-color:var(--mdc-elevation-overlay-color)}.mdc-fab{position:relative;display:inline-flex;position:relative;align-items:center;justify-content:center;box-sizing:border-box;width:56px;height:56px;padding:0;border:none;fill:currentColor;text-decoration:none;cursor:pointer;user-select:none;-moz-appearance:none;-webkit-appearance:none;overflow:visible;transition:box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1),opacity 15ms linear 30ms,transform 270ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-fab .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}.mdc-fab[hidden]{display:none}.mdc-fab::-moz-focus-inner{padding:0;border:0}.mdc-fab:hover{box-shadow:0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12)}.mdc-fab.mdc-ripple-upgraded--background-focused,.mdc-fab:not(.mdc-ripple-upgraded):focus{box-shadow:0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12)}.mdc-fab .mdc-fab__focus-ring{position:absolute}.mdc-fab.mdc-ripple-upgraded--background-focused .mdc-fab__focus-ring,.mdc-fab:not(.mdc-ripple-upgraded):focus .mdc-fab__focus-ring{pointer-events:none;border:2px solid rgba(0,0,0,0);border-radius:6px;box-sizing:content-box;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);height:calc(\n      100% + 4px\n    );width:calc(\n      100% + 4px\n    )}@media screen and (forced-colors: active){.mdc-fab.mdc-ripple-upgraded--background-focused .mdc-fab__focus-ring,.mdc-fab:not(.mdc-ripple-upgraded):focus .mdc-fab__focus-ring{border-color:CanvasText}}.mdc-fab.mdc-ripple-upgraded--background-focused .mdc-fab__focus-ring::after,.mdc-fab:not(.mdc-ripple-upgraded):focus .mdc-fab__focus-ring::after{content:\"\";border:2px solid rgba(0,0,0,0);border-radius:8px;display:block;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);height:calc(100% + 4px);width:calc(100% + 4px)}@media screen and (forced-colors: active){.mdc-fab.mdc-ripple-upgraded--background-focused .mdc-fab__focus-ring::after,.mdc-fab:not(.mdc-ripple-upgraded):focus .mdc-fab__focus-ring::after{border-color:CanvasText}}.mdc-fab:active,.mdc-fab:focus:active{box-shadow:0px 7px 8px -4px rgba(0, 0, 0, 0.2), 0px 12px 17px 2px rgba(0, 0, 0, 0.14), 0px 5px 22px 4px rgba(0, 0, 0, 0.12)}.mdc-fab:active,.mdc-fab:focus{outline:none}.mdc-fab:hover{cursor:pointer}.mdc-fab>svg{width:100%}.mdc-fab--mini{width:40px;height:40px}.mdc-fab--extended{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:var(--mdc-typography-button-font-family);font-size:var(--mdc-typography-button-font-size);line-height:var(--mdc-typography-button-line-height);font-weight:var(--mdc-typography-button-font-weight);letter-spacing:var(--mdc-typography-button-letter-spacing);text-decoration:var(--mdc-typography-button-text-decoration);text-transform:var(--mdc-typography-button-text-transform);border-radius:24px;padding-left:20px;padding-right:20px;width:auto;max-width:100%;height:48px;line-height:normal}.mdc-fab--extended .mdc-fab__ripple{border-radius:24px}.mdc-fab--extended .mdc-fab__icon{margin-left:calc(12px - 20px);margin-right:12px}[dir=rtl] .mdc-fab--extended .mdc-fab__icon,.mdc-fab--extended .mdc-fab__icon[dir=rtl]{margin-left:12px;margin-right:calc(12px - 20px)}.mdc-fab--extended .mdc-fab__label+.mdc-fab__icon{margin-left:12px;margin-right:calc(12px - 20px)}[dir=rtl] .mdc-fab--extended .mdc-fab__label+.mdc-fab__icon,.mdc-fab--extended .mdc-fab__label+.mdc-fab__icon[dir=rtl]{margin-left:calc(12px - 20px);margin-right:12px}.mdc-fab--touch{margin-top:4px;margin-bottom:4px;margin-right:4px;margin-left:4px}.mdc-fab--touch .mdc-fab__touch{position:absolute;top:50%;height:48px;left:50%;width:48px;transform:translate(-50%, -50%)}.mdc-fab::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:1px solid rgba(0,0,0,0);border-radius:inherit;content:\"\";pointer-events:none}@media screen and (forced-colors: active){.mdc-fab::before{border-color:CanvasText}}.mdc-fab__label{justify-content:flex-start;text-overflow:ellipsis;white-space:nowrap;overflow-x:hidden;overflow-y:visible}.mdc-fab__icon{transition:transform 180ms 90ms cubic-bezier(0, 0, 0.2, 1);fill:currentColor;will-change:transform}.mdc-fab .mdc-fab__icon{display:inline-flex;align-items:center;justify-content:center}.mdc-fab--exited{transform:scale(0);opacity:0;transition:opacity 15ms linear 150ms,transform 180ms 0ms cubic-bezier(0.4, 0, 1, 1)}.mdc-fab--exited .mdc-fab__icon{transform:scale(0);transition:transform 135ms 0ms cubic-bezier(0.4, 0, 1, 1)}.mat-mdc-fab,.mat-mdc-mini-fab{background-color:var(--mdc-fab-container-color);--mdc-fab-container-shape:50%;--mdc-fab-icon-size:24px}.mat-mdc-fab .mdc-fab__icon,.mat-mdc-mini-fab .mdc-fab__icon{width:var(--mdc-fab-icon-size);height:var(--mdc-fab-icon-size);font-size:var(--mdc-fab-icon-size)}.mat-mdc-fab:not(:disabled) .mdc-fab__icon,.mat-mdc-mini-fab:not(:disabled) .mdc-fab__icon{color:var(--mdc-fab-icon-color)}.mat-mdc-fab:not(.mdc-fab--extended),.mat-mdc-mini-fab:not(.mdc-fab--extended){border-radius:var(--mdc-fab-container-shape)}.mat-mdc-fab:not(.mdc-fab--extended) .mdc-fab__ripple,.mat-mdc-mini-fab:not(.mdc-fab--extended) .mdc-fab__ripple{border-radius:var(--mdc-fab-container-shape)}.mat-mdc-extended-fab{font-family:var(--mdc-extended-fab-label-text-font);font-size:var(--mdc-extended-fab-label-text-size);font-weight:var(--mdc-extended-fab-label-text-weight);letter-spacing:var(--mdc-extended-fab-label-text-tracking)}.mat-mdc-fab,.mat-mdc-mini-fab{-webkit-tap-highlight-color:rgba(0,0,0,0);box-shadow:0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);color:var(--mat-mdc-fab-color, inherit);flex-shrink:0}.mat-mdc-fab .mat-mdc-button-ripple,.mat-mdc-fab .mat-mdc-button-persistent-ripple,.mat-mdc-fab .mat-mdc-button-persistent-ripple::before,.mat-mdc-mini-fab .mat-mdc-button-ripple,.mat-mdc-mini-fab .mat-mdc-button-persistent-ripple,.mat-mdc-mini-fab .mat-mdc-button-persistent-ripple::before{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mat-mdc-fab .mat-mdc-button-ripple,.mat-mdc-mini-fab .mat-mdc-button-ripple{overflow:hidden}.mat-mdc-fab .mat-mdc-button-persistent-ripple::before,.mat-mdc-mini-fab .mat-mdc-button-persistent-ripple::before{content:\"\";opacity:0;background-color:var(--mat-mdc-button-persistent-ripple-color)}.mat-mdc-fab .mat-ripple-element,.mat-mdc-mini-fab .mat-ripple-element{background-color:var(--mat-mdc-button-ripple-color)}.mat-mdc-fab .mdc-button__label,.mat-mdc-mini-fab .mdc-button__label{z-index:1}.mat-mdc-fab .mat-mdc-focus-indicator,.mat-mdc-mini-fab .mat-mdc-focus-indicator{top:0;left:0;right:0;bottom:0;position:absolute}.mat-mdc-fab:focus .mat-mdc-focus-indicator::before,.mat-mdc-mini-fab:focus .mat-mdc-focus-indicator::before{content:\"\"}.mat-mdc-fab .mat-mdc-button-touch-target,.mat-mdc-mini-fab .mat-mdc-button-touch-target{position:absolute;top:50%;height:48px;left:50%;width:48px;transform:translate(-50%, -50%)}.mat-mdc-fab._mat-animation-noopable,.mat-mdc-mini-fab._mat-animation-noopable{transition:none !important;animation:none !important}.mat-mdc-fab:hover,.mat-mdc-fab:focus,.mat-mdc-mini-fab:hover,.mat-mdc-mini-fab:focus{box-shadow:0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12)}.mat-mdc-fab:active,.mat-mdc-fab:focus:active,.mat-mdc-mini-fab:active,.mat-mdc-mini-fab:focus:active{box-shadow:0px 7px 8px -4px rgba(0, 0, 0, 0.2), 0px 12px 17px 2px rgba(0, 0, 0, 0.14), 0px 5px 22px 4px rgba(0, 0, 0, 0.12)}.mat-mdc-fab[disabled],.mat-mdc-mini-fab[disabled]{cursor:default;pointer-events:none;box-shadow:0px 0px 0px 0px rgba(0, 0, 0, 0.2), 0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 0px 0px 0px rgba(0, 0, 0, 0.12)}.mat-mdc-fab:not(.mdc-ripple-upgraded):focus::before,.mat-mdc-mini-fab:not(.mdc-ripple-upgraded):focus::before{background:rgba(0,0,0,0);opacity:1}.mat-mdc-fab .mat-icon,.mat-mdc-fab .material-icons,.mat-mdc-mini-fab .mat-icon,.mat-mdc-mini-fab .material-icons{transition:transform 180ms 90ms cubic-bezier(0, 0, 0.2, 1);fill:currentColor;will-change:transform}.mat-mdc-fab .mat-mdc-focus-indicator::before,.mat-mdc-mini-fab .mat-mdc-focus-indicator::before{margin:calc(calc(var(--mat-mdc-focus-indicator-border-width, 3px) + 2px) * -1)}.mat-mdc-extended-fab>.mat-icon,.mat-mdc-extended-fab>.material-icons{margin-left:calc(12px - 20px);margin-right:12px}[dir=rtl] .mat-mdc-extended-fab>.mat-icon,[dir=rtl] .mat-mdc-extended-fab>.material-icons,.mat-mdc-extended-fab>.mat-icon[dir=rtl],.mat-mdc-extended-fab>.material-icons[dir=rtl]{margin-left:12px;margin-right:calc(12px - 20px)}.mat-mdc-extended-fab .mdc-button__label+.mat-icon,.mat-mdc-extended-fab .mdc-button__label+.material-icons{margin-left:12px;margin-right:calc(12px - 20px)}[dir=rtl] .mat-mdc-extended-fab .mdc-button__label+.mat-icon,[dir=rtl] .mat-mdc-extended-fab .mdc-button__label+.material-icons,.mat-mdc-extended-fab .mdc-button__label+.mat-icon[dir=rtl],.mat-mdc-extended-fab .mdc-button__label+.material-icons[dir=rtl]{margin-left:calc(12px - 20px);margin-right:12px}.mat-mdc-extended-fab .mat-mdc-button-touch-target{width:100%}";
const _c8 = ["mat-icon-button", ""];
const _c9 = ["*"];
const _c10 = ".mdc-icon-button{display:inline-block;position:relative;box-sizing:border-box;border:none;outline:none;background-color:rgba(0,0,0,0);fill:currentColor;color:inherit;text-decoration:none;cursor:pointer;user-select:none;z-index:0;overflow:visible}.mdc-icon-button .mdc-icon-button__touch{position:absolute;top:50%;height:48px;left:50%;width:48px;transform:translate(-50%, -50%)}@media screen and (forced-colors: active){.mdc-icon-button.mdc-ripple-upgraded--background-focused .mdc-icon-button__focus-ring,.mdc-icon-button:not(.mdc-ripple-upgraded):focus .mdc-icon-button__focus-ring{display:block}}.mdc-icon-button:disabled{cursor:default;pointer-events:none}.mdc-icon-button[hidden]{display:none}.mdc-icon-button--display-flex{align-items:center;display:inline-flex;justify-content:center}.mdc-icon-button__focus-ring{pointer-events:none;border:2px solid rgba(0,0,0,0);border-radius:6px;box-sizing:content-box;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);height:100%;width:100%;display:none}@media screen and (forced-colors: active){.mdc-icon-button__focus-ring{border-color:CanvasText}}.mdc-icon-button__focus-ring::after{content:\"\";border:2px solid rgba(0,0,0,0);border-radius:8px;display:block;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);height:calc(100% + 4px);width:calc(100% + 4px)}@media screen and (forced-colors: active){.mdc-icon-button__focus-ring::after{border-color:CanvasText}}.mdc-icon-button__icon{display:inline-block}.mdc-icon-button__icon.mdc-icon-button__icon--on{display:none}.mdc-icon-button--on .mdc-icon-button__icon{display:none}.mdc-icon-button--on .mdc-icon-button__icon.mdc-icon-button__icon--on{display:inline-block}.mdc-icon-button__link{height:100%;left:0;outline:none;position:absolute;top:0;width:100%}.mat-mdc-icon-button{height:var(--mdc-icon-button-state-layer-size);width:var(--mdc-icon-button-state-layer-size);color:var(--mdc-icon-button-icon-color);--mdc-icon-button-state-layer-size:48px;--mdc-icon-button-icon-size:24px;--mdc-icon-button-disabled-icon-color:black;--mdc-icon-button-disabled-icon-opacity:0.38}.mat-mdc-icon-button .mdc-button__icon{font-size:var(--mdc-icon-button-icon-size)}.mat-mdc-icon-button svg,.mat-mdc-icon-button img{width:var(--mdc-icon-button-icon-size);height:var(--mdc-icon-button-icon-size)}.mat-mdc-icon-button:disabled{opacity:var(--mdc-icon-button-disabled-icon-opacity)}.mat-mdc-icon-button:disabled{color:var(--mdc-icon-button-disabled-icon-color)}.mat-mdc-icon-button{padding:12px;font-size:var(--mdc-icon-button-icon-size);border-radius:50%;flex-shrink:0;text-align:center;-webkit-tap-highlight-color:rgba(0,0,0,0)}.mat-mdc-icon-button svg{vertical-align:baseline}.mat-mdc-icon-button[disabled]{cursor:default;pointer-events:none;opacity:1}.mat-mdc-icon-button .mat-mdc-button-ripple,.mat-mdc-icon-button .mat-mdc-button-persistent-ripple,.mat-mdc-icon-button .mat-mdc-button-persistent-ripple::before{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mat-mdc-icon-button .mat-mdc-button-ripple{overflow:hidden}.mat-mdc-icon-button .mat-mdc-button-persistent-ripple::before{content:\"\";opacity:0;background-color:var(--mat-mdc-button-persistent-ripple-color)}.mat-mdc-icon-button .mat-ripple-element{background-color:var(--mat-mdc-button-ripple-color)}.mat-mdc-icon-button .mdc-button__label{z-index:1}.mat-mdc-icon-button .mat-mdc-focus-indicator{top:0;left:0;right:0;bottom:0;position:absolute}.mat-mdc-icon-button:focus .mat-mdc-focus-indicator::before{content:\"\"}.mat-mdc-icon-button .mat-mdc-button-touch-target{position:absolute;top:50%;height:48px;left:50%;width:48px;transform:translate(-50%, -50%)}.mat-mdc-icon-button._mat-animation-noopable{transition:none !important;animation:none !important}.mat-mdc-icon-button .mat-mdc-button-persistent-ripple{border-radius:50%}.mat-mdc-icon-button.mat-unthemed:not(.mdc-ripple-upgraded):focus::before,.mat-mdc-icon-button.mat-primary:not(.mdc-ripple-upgraded):focus::before,.mat-mdc-icon-button.mat-accent:not(.mdc-ripple-upgraded):focus::before,.mat-mdc-icon-button.mat-warn:not(.mdc-ripple-upgraded):focus::before{background:rgba(0,0,0,0);opacity:1}";
const MAT_BUTTON_INPUTS = ['disabled', 'disableRipple', 'color'];
/** Shared host configuration for all buttons */
const MAT_BUTTON_HOST = {
  '[attr.disabled]': 'disabled || null',
  '[class._mat-animation-noopable]': '_animationMode === "NoopAnimations"',
  // MDC automatically applies the primary theme color to the button, but we want to support
  // an unthemed version. If color is undefined, apply a CSS class that makes it easy to
  // select and style this "theme".
  '[class.mat-unthemed]': '!color',
  // Add a class that applies to all buttons. This makes it easier to target if somebody
  // wants to target all Material buttons.
  '[class.mat-mdc-button-base]': 'true'
};
/** List of classes to add to buttons instances based on host attribute selector. */
const HOST_SELECTOR_MDC_CLASS_PAIR = [{
  selector: 'mat-button',
  mdcClasses: ['mdc-button', 'mat-mdc-button']
}, {
  selector: 'mat-flat-button',
  mdcClasses: ['mdc-button', 'mdc-button--unelevated', 'mat-mdc-unelevated-button']
}, {
  selector: 'mat-raised-button',
  mdcClasses: ['mdc-button', 'mdc-button--raised', 'mat-mdc-raised-button']
}, {
  selector: 'mat-stroked-button',
  mdcClasses: ['mdc-button', 'mdc-button--outlined', 'mat-mdc-outlined-button']
}, {
  selector: 'mat-fab',
  mdcClasses: ['mdc-fab', 'mat-mdc-fab']
}, {
  selector: 'mat-mini-fab',
  mdcClasses: ['mdc-fab', 'mdc-fab--mini', 'mat-mdc-mini-fab']
}, {
  selector: 'mat-icon-button',
  mdcClasses: ['mdc-icon-button', 'mat-mdc-icon-button']
}];
// Boilerplate for applying mixins to MatButton.
/** @docs-private */
const _MatButtonMixin = /*#__PURE__*/(0,_angular_material_core__WEBPACK_IMPORTED_MODULE_0__.mixinColor)( /*#__PURE__*/(0,_angular_material_core__WEBPACK_IMPORTED_MODULE_0__.mixinDisabled)( /*#__PURE__*/(0,_angular_material_core__WEBPACK_IMPORTED_MODULE_0__.mixinDisableRipple)(class {
  constructor(_elementRef) {
    this._elementRef = _elementRef;
  }
})));
/** Base class for all buttons.  */
let MatButtonBase = /*#__PURE__*/(() => {
  var _class;
  class MatButtonBase extends _MatButtonMixin {
    /**
     * Reference to the MatRipple instance of the button.
     * @deprecated Considered an implementation detail. To be removed.
     * @breaking-change 17.0.0
     */
    get ripple() {
      return this._rippleLoader?.getRipple(this._elementRef.nativeElement);
    }
    set ripple(v) {
      this._rippleLoader?.attachRipple(this._elementRef.nativeElement, v);
    }
    // We override `disableRipple` and `disabled` so we can hook into
    // their setters and update the ripple disabled state accordingly.
    /** Whether the ripple effect is disabled or not. */
    get disableRipple() {
      return this._disableRipple;
    }
    set disableRipple(value) {
      this._disableRipple = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_1__.coerceBooleanProperty)(value);
      this._updateRippleDisabled();
    }
    get disabled() {
      return this._disabled;
    }
    set disabled(value) {
      this._disabled = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_1__.coerceBooleanProperty)(value);
      this._updateRippleDisabled();
    }
    constructor(elementRef, _platform, _ngZone, _animationMode) {
      super(elementRef);
      this._platform = _platform;
      this._ngZone = _ngZone;
      this._animationMode = _animationMode;
      this._focusMonitor = (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.inject)(_angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_3__.FocusMonitor);
      /**
       * Handles the lazy creation of the MatButton ripple.
       * Used to improve initial load time of large applications.
       */
      this._rippleLoader = (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.inject)(_angular_material_core__WEBPACK_IMPORTED_MODULE_0__.MatRippleLoader);
      /** Whether this button is a FAB. Used to apply the correct class on the ripple. */
      this._isFab = false;
      this._disableRipple = false;
      this._disabled = false;
      this._rippleLoader?.configureRipple(this._elementRef.nativeElement, {
        className: 'mat-mdc-button-ripple'
      });
      const classList = elementRef.nativeElement.classList;
      // For each of the variant selectors that is present in the button's host
      // attributes, add the correct corresponding MDC classes.
      for (const pair of HOST_SELECTOR_MDC_CLASS_PAIR) {
        if (this._hasHostAttributes(pair.selector)) {
          pair.mdcClasses.forEach(className => {
            classList.add(className);
          });
        }
      }
    }
    ngAfterViewInit() {
      this._focusMonitor.monitor(this._elementRef, true);
    }
    ngOnDestroy() {
      this._focusMonitor.stopMonitoring(this._elementRef);
    }
    /** Focuses the button. */
    focus(_origin = 'program', options) {
      if (_origin) {
        this._focusMonitor.focusVia(this._elementRef.nativeElement, _origin, options);
      } else {
        this._elementRef.nativeElement.focus(options);
      }
    }
    /** Gets whether the button has one of the given attributes. */
    _hasHostAttributes(...attributes) {
      return attributes.some(attribute => this._elementRef.nativeElement.hasAttribute(attribute));
    }
    _updateRippleDisabled() {
      this._rippleLoader?.setDisabled(this._elementRef.nativeElement, this.disableRipple || this.disabled);
    }
  }
  _class = MatButtonBase;
  _class.ɵfac = function _class_Factory(t) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinvalidFactory"]();
  };
  _class.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineDirective"]({
    type: _class,
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵInheritDefinitionFeature"]]
  });
  return MatButtonBase;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
/** Shared inputs by buttons using the `<a>` tag */
const MAT_ANCHOR_INPUTS = ['disabled', 'disableRipple', 'color', 'tabIndex'];
/** Shared host configuration for buttons using the `<a>` tag. */
const MAT_ANCHOR_HOST = {
  '[attr.disabled]': 'disabled || null',
  '[class._mat-animation-noopable]': '_animationMode === "NoopAnimations"',
  // Note that we ignore the user-specified tabindex when it's disabled for
  // consistency with the `mat-button` applied on native buttons where even
  // though they have an index, they're not tabbable.
  '[attr.tabindex]': 'disabled ? -1 : tabIndex',
  '[attr.aria-disabled]': 'disabled.toString()',
  // MDC automatically applies the primary theme color to the button, but we want to support
  // an unthemed version. If color is undefined, apply a CSS class that makes it easy to
  // select and style this "theme".
  '[class.mat-unthemed]': '!color',
  // Add a class that applies to all buttons. This makes it easier to target if somebody
  // wants to target all Material buttons.
  '[class.mat-mdc-button-base]': 'true'
};
/**
 * Anchor button base.
 */
let MatAnchorBase = /*#__PURE__*/(() => {
  var _class2;
  class MatAnchorBase extends MatButtonBase {
    constructor(elementRef, platform, ngZone, animationMode) {
      super(elementRef, platform, ngZone, animationMode);
      this._haltDisabledEvents = event => {
        // A disabled button shouldn't apply any actions
        if (this.disabled) {
          event.preventDefault();
          event.stopImmediatePropagation();
        }
      };
    }
    ngOnInit() {
      this._ngZone.runOutsideAngular(() => {
        this._elementRef.nativeElement.addEventListener('click', this._haltDisabledEvents);
      });
    }
    ngOnDestroy() {
      super.ngOnDestroy();
      this._elementRef.nativeElement.removeEventListener('click', this._haltDisabledEvents);
    }
  }
  _class2 = MatAnchorBase;
  _class2.ɵfac = function _class2_Factory(t) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinvalidFactory"]();
  };
  _class2.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineDirective"]({
    type: _class2,
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵInheritDefinitionFeature"]]
  });
  return MatAnchorBase;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();

/**
 * Material Design button component. Users interact with a button to perform an action.
 * See https://material.io/components/buttons
 *
 * The `MatButton` class applies to native button elements and captures the appearances for
 * "text button", "outlined button", and "contained button" per the Material Design
 * specification. `MatButton` additionally captures an additional "flat" appearance, which matches
 * "contained" but without elevation.
 */
let MatButton = /*#__PURE__*/(() => {
  var _class3;
  class MatButton extends MatButtonBase {
    constructor(elementRef, platform, ngZone, animationMode) {
      super(elementRef, platform, ngZone, animationMode);
    }
  }
  _class3 = MatButton;
  _class3.ɵfac = function _class3_Factory(t) {
    return new (t || _class3)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__.Platform), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgZone), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__.ANIMATION_MODULE_TYPE, 8));
  };
  _class3.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
    type: _class3,
    selectors: [["button", "mat-button", ""], ["button", "mat-raised-button", ""], ["button", "mat-flat-button", ""], ["button", "mat-stroked-button", ""]],
    hostVars: 7,
    hostBindings: function _class3_HostBindings(rf, ctx) {
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵattribute"]("disabled", ctx.disabled || null);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassProp"]("_mat-animation-noopable", ctx._animationMode === "NoopAnimations")("mat-unthemed", !ctx.color)("mat-mdc-button-base", true);
      }
    },
    inputs: {
      disabled: "disabled",
      disableRipple: "disableRipple",
      color: "color"
    },
    exportAs: ["matButton"],
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵInheritDefinitionFeature"]],
    attrs: _c0,
    ngContentSelectors: _c2,
    decls: 7,
    vars: 4,
    consts: [[1, "mat-mdc-button-persistent-ripple"], [1, "mdc-button__label"], [1, "mat-mdc-focus-indicator"], [1, "mat-mdc-button-touch-target"]],
    template: function _class3_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵprojectionDef"](_c1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "span", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵprojection"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "span", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵprojection"](3, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵprojection"](4, 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](5, "span", 2)(6, "span", 3);
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassProp"]("mdc-button__ripple", !ctx._isFab)("mdc-fab__ripple", ctx._isFab);
      }
    },
    styles: [".mdc-touch-target-wrapper{display:inline}.mdc-elevation-overlay{position:absolute;border-radius:inherit;pointer-events:none;opacity:var(--mdc-elevation-overlay-opacity, 0);transition:opacity 280ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-button{position:relative;display:inline-flex;align-items:center;justify-content:center;box-sizing:border-box;min-width:64px;border:none;outline:none;line-height:inherit;user-select:none;-webkit-appearance:none;overflow:visible;vertical-align:middle;background:rgba(0,0,0,0)}.mdc-button .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}.mdc-button::-moz-focus-inner{padding:0;border:0}.mdc-button:active{outline:none}.mdc-button:hover{cursor:pointer}.mdc-button:disabled{cursor:default;pointer-events:none}.mdc-button[hidden]{display:none}.mdc-button .mdc-button__icon{margin-left:0;margin-right:8px;display:inline-block;position:relative;vertical-align:top}[dir=rtl] .mdc-button .mdc-button__icon,.mdc-button .mdc-button__icon[dir=rtl]{margin-left:8px;margin-right:0}.mdc-button .mdc-button__progress-indicator{font-size:0;position:absolute;transform:translate(-50%, -50%);top:50%;left:50%;line-height:initial}.mdc-button .mdc-button__label{position:relative}.mdc-button .mdc-button__focus-ring{pointer-events:none;border:2px solid rgba(0,0,0,0);border-radius:6px;box-sizing:content-box;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);height:calc(\n      100% + 4px\n    );width:calc(\n      100% + 4px\n    );display:none}@media screen and (forced-colors: active){.mdc-button .mdc-button__focus-ring{border-color:CanvasText}}.mdc-button .mdc-button__focus-ring::after{content:\"\";border:2px solid rgba(0,0,0,0);border-radius:8px;display:block;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);height:calc(100% + 4px);width:calc(100% + 4px)}@media screen and (forced-colors: active){.mdc-button .mdc-button__focus-ring::after{border-color:CanvasText}}@media screen and (forced-colors: active){.mdc-button.mdc-ripple-upgraded--background-focused .mdc-button__focus-ring,.mdc-button:not(.mdc-ripple-upgraded):focus .mdc-button__focus-ring{display:block}}.mdc-button .mdc-button__touch{position:absolute;top:50%;height:48px;left:0;right:0;transform:translateY(-50%)}.mdc-button__label+.mdc-button__icon{margin-left:8px;margin-right:0}[dir=rtl] .mdc-button__label+.mdc-button__icon,.mdc-button__label+.mdc-button__icon[dir=rtl]{margin-left:0;margin-right:8px}svg.mdc-button__icon{fill:currentColor}.mdc-button--touch{margin-top:6px;margin-bottom:6px}.mdc-button{padding:0 8px 0 8px}.mdc-button--unelevated{transition:box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);padding:0 16px 0 16px}.mdc-button--unelevated.mdc-button--icon-trailing{padding:0 12px 0 16px}.mdc-button--unelevated.mdc-button--icon-leading{padding:0 16px 0 12px}.mdc-button--raised{transition:box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);padding:0 16px 0 16px}.mdc-button--raised.mdc-button--icon-trailing{padding:0 12px 0 16px}.mdc-button--raised.mdc-button--icon-leading{padding:0 16px 0 12px}.mdc-button--outlined{border-style:solid;transition:border 280ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-button--outlined .mdc-button__ripple{border-style:solid;border-color:rgba(0,0,0,0)}.mat-mdc-button{height:var(--mdc-text-button-container-height, 36px);border-radius:var(--mdc-text-button-container-shape, var(--mdc-shape-small, 4px))}.mat-mdc-button:not(:disabled){color:var(--mdc-text-button-label-text-color, inherit)}.mat-mdc-button:disabled{color:var(--mdc-text-button-disabled-label-text-color, rgba(0, 0, 0, 0.38))}.mat-mdc-button .mdc-button__ripple{border-radius:var(--mdc-text-button-container-shape, var(--mdc-shape-small, 4px))}.mat-mdc-unelevated-button{height:var(--mdc-filled-button-container-height, 36px);border-radius:var(--mdc-filled-button-container-shape, var(--mdc-shape-small, 4px))}.mat-mdc-unelevated-button:not(:disabled){background-color:var(--mdc-filled-button-container-color, transparent)}.mat-mdc-unelevated-button:disabled{background-color:var(--mdc-filled-button-disabled-container-color, rgba(0, 0, 0, 0.12))}.mat-mdc-unelevated-button:not(:disabled){color:var(--mdc-filled-button-label-text-color, inherit)}.mat-mdc-unelevated-button:disabled{color:var(--mdc-filled-button-disabled-label-text-color, rgba(0, 0, 0, 0.38))}.mat-mdc-unelevated-button .mdc-button__ripple{border-radius:var(--mdc-filled-button-container-shape, var(--mdc-shape-small, 4px))}.mat-mdc-raised-button{height:var(--mdc-protected-button-container-height, 36px);border-radius:var(--mdc-protected-button-container-shape, var(--mdc-shape-small, 4px));box-shadow:var(--mdc-protected-button-container-elevation, 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12))}.mat-mdc-raised-button:not(:disabled){background-color:var(--mdc-protected-button-container-color, transparent)}.mat-mdc-raised-button:disabled{background-color:var(--mdc-protected-button-disabled-container-color, rgba(0, 0, 0, 0.12))}.mat-mdc-raised-button:not(:disabled){color:var(--mdc-protected-button-label-text-color, inherit)}.mat-mdc-raised-button:disabled{color:var(--mdc-protected-button-disabled-label-text-color, rgba(0, 0, 0, 0.38))}.mat-mdc-raised-button .mdc-button__ripple{border-radius:var(--mdc-protected-button-container-shape, var(--mdc-shape-small, 4px))}.mat-mdc-raised-button.mdc-ripple-upgraded--background-focused,.mat-mdc-raised-button:not(.mdc-ripple-upgraded):focus{box-shadow:var(--mdc-protected-button-focus-container-elevation, 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12))}.mat-mdc-raised-button:hover{box-shadow:var(--mdc-protected-button-hover-container-elevation, 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12))}.mat-mdc-raised-button:not(:disabled):active{box-shadow:var(--mdc-protected-button-pressed-container-elevation, 0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12))}.mat-mdc-raised-button:disabled{box-shadow:var(--mdc-protected-button-disabled-container-elevation, 0px 0px 0px 0px rgba(0, 0, 0, 0.2), 0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 0px 0px 0px rgba(0, 0, 0, 0.12))}.mat-mdc-outlined-button{height:var(--mdc-outlined-button-container-height, 36px);border-radius:var(--mdc-outlined-button-container-shape, var(--mdc-shape-small, 4px));padding:0 15px 0 15px;border-width:var(--mdc-outlined-button-outline-width, 1px)}.mat-mdc-outlined-button:not(:disabled){color:var(--mdc-outlined-button-label-text-color, inherit)}.mat-mdc-outlined-button:disabled{color:var(--mdc-outlined-button-disabled-label-text-color, rgba(0, 0, 0, 0.38))}.mat-mdc-outlined-button .mdc-button__ripple{border-radius:var(--mdc-outlined-button-container-shape, var(--mdc-shape-small, 4px))}.mat-mdc-outlined-button:not(:disabled){border-color:var(--mdc-outlined-button-outline-color, rgba(0, 0, 0, 0.12))}.mat-mdc-outlined-button:disabled{border-color:var(--mdc-outlined-button-disabled-outline-color, rgba(0, 0, 0, 0.12))}.mat-mdc-outlined-button.mdc-button--icon-trailing{padding:0 11px 0 15px}.mat-mdc-outlined-button.mdc-button--icon-leading{padding:0 15px 0 11px}.mat-mdc-outlined-button .mdc-button__ripple{top:-1px;left:-1px;bottom:-1px;right:-1px;border-width:var(--mdc-outlined-button-outline-width, 1px)}.mat-mdc-outlined-button .mdc-button__touch{left:calc(-1 * var(--mdc-outlined-button-outline-width, 1px));width:calc(100% + 2 * var(--mdc-outlined-button-outline-width, 1px))}.mat-mdc-button,.mat-mdc-unelevated-button,.mat-mdc-raised-button,.mat-mdc-outlined-button{-webkit-tap-highlight-color:rgba(0,0,0,0)}.mat-mdc-button .mat-mdc-button-ripple,.mat-mdc-button .mat-mdc-button-persistent-ripple,.mat-mdc-button .mat-mdc-button-persistent-ripple::before,.mat-mdc-unelevated-button .mat-mdc-button-ripple,.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple,.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple::before,.mat-mdc-raised-button .mat-mdc-button-ripple,.mat-mdc-raised-button .mat-mdc-button-persistent-ripple,.mat-mdc-raised-button .mat-mdc-button-persistent-ripple::before,.mat-mdc-outlined-button .mat-mdc-button-ripple,.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple,.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple::before{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mat-mdc-button .mat-mdc-button-ripple,.mat-mdc-unelevated-button .mat-mdc-button-ripple,.mat-mdc-raised-button .mat-mdc-button-ripple,.mat-mdc-outlined-button .mat-mdc-button-ripple{overflow:hidden}.mat-mdc-button .mat-mdc-button-persistent-ripple::before,.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple::before,.mat-mdc-raised-button .mat-mdc-button-persistent-ripple::before,.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple::before{content:\"\";opacity:0;background-color:var(--mat-mdc-button-persistent-ripple-color)}.mat-mdc-button .mat-ripple-element,.mat-mdc-unelevated-button .mat-ripple-element,.mat-mdc-raised-button .mat-ripple-element,.mat-mdc-outlined-button .mat-ripple-element{background-color:var(--mat-mdc-button-ripple-color)}.mat-mdc-button .mdc-button__label,.mat-mdc-unelevated-button .mdc-button__label,.mat-mdc-raised-button .mdc-button__label,.mat-mdc-outlined-button .mdc-button__label{z-index:1}.mat-mdc-button .mat-mdc-focus-indicator,.mat-mdc-unelevated-button .mat-mdc-focus-indicator,.mat-mdc-raised-button .mat-mdc-focus-indicator,.mat-mdc-outlined-button .mat-mdc-focus-indicator{top:0;left:0;right:0;bottom:0;position:absolute}.mat-mdc-button:focus .mat-mdc-focus-indicator::before,.mat-mdc-unelevated-button:focus .mat-mdc-focus-indicator::before,.mat-mdc-raised-button:focus .mat-mdc-focus-indicator::before,.mat-mdc-outlined-button:focus .mat-mdc-focus-indicator::before{content:\"\"}.mat-mdc-button[disabled],.mat-mdc-unelevated-button[disabled],.mat-mdc-raised-button[disabled],.mat-mdc-outlined-button[disabled]{cursor:default;pointer-events:none}.mat-mdc-button .mat-mdc-button-touch-target,.mat-mdc-unelevated-button .mat-mdc-button-touch-target,.mat-mdc-raised-button .mat-mdc-button-touch-target,.mat-mdc-outlined-button .mat-mdc-button-touch-target{position:absolute;top:50%;height:48px;left:0;right:0;transform:translateY(-50%)}.mat-mdc-button._mat-animation-noopable,.mat-mdc-unelevated-button._mat-animation-noopable,.mat-mdc-raised-button._mat-animation-noopable,.mat-mdc-outlined-button._mat-animation-noopable{transition:none !important;animation:none !important}.mat-mdc-button>.mat-icon{margin-left:0;margin-right:8px;display:inline-block;position:relative;vertical-align:top;font-size:1.125rem;height:1.125rem;width:1.125rem}[dir=rtl] .mat-mdc-button>.mat-icon,.mat-mdc-button>.mat-icon[dir=rtl]{margin-left:8px;margin-right:0}.mat-mdc-button .mdc-button__label+.mat-icon{margin-left:8px;margin-right:0}[dir=rtl] .mat-mdc-button .mdc-button__label+.mat-icon,.mat-mdc-button .mdc-button__label+.mat-icon[dir=rtl]{margin-left:0;margin-right:8px}.mat-mdc-unelevated-button>.mat-icon,.mat-mdc-raised-button>.mat-icon,.mat-mdc-outlined-button>.mat-icon{margin-left:0;margin-right:8px;display:inline-block;position:relative;vertical-align:top;font-size:1.125rem;height:1.125rem;width:1.125rem;margin-left:-4px;margin-right:8px}[dir=rtl] .mat-mdc-unelevated-button>.mat-icon,[dir=rtl] .mat-mdc-raised-button>.mat-icon,[dir=rtl] .mat-mdc-outlined-button>.mat-icon,.mat-mdc-unelevated-button>.mat-icon[dir=rtl],.mat-mdc-raised-button>.mat-icon[dir=rtl],.mat-mdc-outlined-button>.mat-icon[dir=rtl]{margin-left:8px;margin-right:0}[dir=rtl] .mat-mdc-unelevated-button>.mat-icon,[dir=rtl] .mat-mdc-raised-button>.mat-icon,[dir=rtl] .mat-mdc-outlined-button>.mat-icon,.mat-mdc-unelevated-button>.mat-icon[dir=rtl],.mat-mdc-raised-button>.mat-icon[dir=rtl],.mat-mdc-outlined-button>.mat-icon[dir=rtl]{margin-left:8px;margin-right:-4px}.mat-mdc-unelevated-button .mdc-button__label+.mat-icon,.mat-mdc-raised-button .mdc-button__label+.mat-icon,.mat-mdc-outlined-button .mdc-button__label+.mat-icon{margin-left:8px;margin-right:-4px}[dir=rtl] .mat-mdc-unelevated-button .mdc-button__label+.mat-icon,[dir=rtl] .mat-mdc-raised-button .mdc-button__label+.mat-icon,[dir=rtl] .mat-mdc-outlined-button .mdc-button__label+.mat-icon,.mat-mdc-unelevated-button .mdc-button__label+.mat-icon[dir=rtl],.mat-mdc-raised-button .mdc-button__label+.mat-icon[dir=rtl],.mat-mdc-outlined-button .mdc-button__label+.mat-icon[dir=rtl]{margin-left:-4px;margin-right:8px}.mat-mdc-outlined-button .mat-mdc-button-ripple,.mat-mdc-outlined-button .mdc-button__ripple{top:-1px;left:-1px;bottom:-1px;right:-1px;border-width:-1px}.mat-mdc-unelevated-button .mat-mdc-focus-indicator::before,.mat-mdc-raised-button .mat-mdc-focus-indicator::before{margin:calc(calc(var(--mat-mdc-focus-indicator-border-width, 3px) + 2px) * -1)}.mat-mdc-outlined-button .mat-mdc-focus-indicator::before{margin:calc(calc(var(--mat-mdc-focus-indicator-border-width, 3px) + 3px) * -1)}", ".cdk-high-contrast-active .mat-mdc-button:not(.mdc-button--outlined),.cdk-high-contrast-active .mat-mdc-unelevated-button:not(.mdc-button--outlined),.cdk-high-contrast-active .mat-mdc-raised-button:not(.mdc-button--outlined),.cdk-high-contrast-active .mat-mdc-outlined-button:not(.mdc-button--outlined),.cdk-high-contrast-active .mat-mdc-icon-button{outline:solid 1px}"],
    encapsulation: 2,
    changeDetection: 0
  });
  return MatButton;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
/**
 * Material Design button component for anchor elements. Anchor elements are used to provide
 * links for the user to navigate across different routes or pages.
 * See https://material.io/components/buttons
 *
 * The `MatAnchor` class applies to native anchor elements and captures the appearances for
 * "text button", "outlined button", and "contained button" per the Material Design
 * specification. `MatAnchor` additionally captures an additional "flat" appearance, which matches
 * "contained" but without elevation.
 */
let MatAnchor = /*#__PURE__*/(() => {
  var _class4;
  class MatAnchor extends MatAnchorBase {
    constructor(elementRef, platform, ngZone, animationMode) {
      super(elementRef, platform, ngZone, animationMode);
    }
  }
  _class4 = MatAnchor;
  _class4.ɵfac = function _class4_Factory(t) {
    return new (t || _class4)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__.Platform), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgZone), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__.ANIMATION_MODULE_TYPE, 8));
  };
  _class4.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
    type: _class4,
    selectors: [["a", "mat-button", ""], ["a", "mat-raised-button", ""], ["a", "mat-flat-button", ""], ["a", "mat-stroked-button", ""]],
    hostVars: 9,
    hostBindings: function _class4_HostBindings(rf, ctx) {
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵattribute"]("disabled", ctx.disabled || null)("tabindex", ctx.disabled ? -1 : ctx.tabIndex)("aria-disabled", ctx.disabled.toString());
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassProp"]("_mat-animation-noopable", ctx._animationMode === "NoopAnimations")("mat-unthemed", !ctx.color)("mat-mdc-button-base", true);
      }
    },
    inputs: {
      disabled: "disabled",
      disableRipple: "disableRipple",
      color: "color",
      tabIndex: "tabIndex"
    },
    exportAs: ["matButton", "matAnchor"],
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵInheritDefinitionFeature"]],
    attrs: _c0,
    ngContentSelectors: _c2,
    decls: 7,
    vars: 4,
    consts: [[1, "mat-mdc-button-persistent-ripple"], [1, "mdc-button__label"], [1, "mat-mdc-focus-indicator"], [1, "mat-mdc-button-touch-target"]],
    template: function _class4_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵprojectionDef"](_c1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "span", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵprojection"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "span", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵprojection"](3, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵprojection"](4, 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](5, "span", 2)(6, "span", 3);
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassProp"]("mdc-button__ripple", !ctx._isFab)("mdc-fab__ripple", ctx._isFab);
      }
    },
    styles: [_c3, _c4],
    encapsulation: 2,
    changeDetection: 0
  });
  return MatAnchor;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();

/** Injection token to be used to override the default options for FAB. */
const MAT_FAB_DEFAULT_OPTIONS = /*#__PURE__*/new _angular_core__WEBPACK_IMPORTED_MODULE_2__.InjectionToken('mat-mdc-fab-default-options', {
  providedIn: 'root',
  factory: MAT_FAB_DEFAULT_OPTIONS_FACTORY
});
/** @docs-private */
function MAT_FAB_DEFAULT_OPTIONS_FACTORY() {
  return {
    // The FAB by default has its color set to accent.
    color: 'accent'
  };
}
// Default FAB configuration.
const defaults = /*#__PURE__*/MAT_FAB_DEFAULT_OPTIONS_FACTORY();
let buttonInputs = [...MAT_ANCHOR_INPUTS, 'extended'];
/**
 * Material Design floating action button (FAB) component. These buttons represent the primary
 * or most common action for users to interact with.
 * See https://material.io/components/buttons-floating-action-button/
 *
 * The `MatFabButton` class has two appearances: normal and extended.
 */
let MatFabButton = /*#__PURE__*/(() => {
  var _class5;
  class MatFabButton extends MatButtonBase {
    get extended() {
      return this._extended;
    }
    set extended(value) {
      this._extended = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_1__.coerceBooleanProperty)(value);
    }
    constructor(elementRef, platform, ngZone, animationMode, _options) {
      super(elementRef, platform, ngZone, animationMode);
      this._options = _options;
      this._isFab = true;
      this._options = this._options || defaults;
      this.color = this.defaultColor = this._options.color || defaults.color;
    }
  }
  _class5 = MatFabButton;
  _class5.ɵfac = function _class5_Factory(t) {
    return new (t || _class5)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__.Platform), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgZone), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__.ANIMATION_MODULE_TYPE, 8), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](MAT_FAB_DEFAULT_OPTIONS, 8));
  };
  _class5.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
    type: _class5,
    selectors: [["button", "mat-fab", ""]],
    hostVars: 11,
    hostBindings: function _class5_HostBindings(rf, ctx) {
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵattribute"]("disabled", ctx.disabled || null);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassProp"]("_mat-animation-noopable", ctx._animationMode === "NoopAnimations")("mat-unthemed", !ctx.color)("mat-mdc-button-base", true)("mdc-fab--extended", ctx.extended)("mat-mdc-extended-fab", ctx.extended);
      }
    },
    inputs: {
      disabled: "disabled",
      disableRipple: "disableRipple",
      color: "color",
      tabIndex: "tabIndex",
      extended: "extended"
    },
    exportAs: ["matButton"],
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵInheritDefinitionFeature"]],
    attrs: _c5,
    ngContentSelectors: _c2,
    decls: 7,
    vars: 4,
    consts: [[1, "mat-mdc-button-persistent-ripple"], [1, "mdc-button__label"], [1, "mat-mdc-focus-indicator"], [1, "mat-mdc-button-touch-target"]],
    template: function _class5_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵprojectionDef"](_c1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "span", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵprojection"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "span", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵprojection"](3, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵprojection"](4, 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](5, "span", 2)(6, "span", 3);
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassProp"]("mdc-button__ripple", !ctx._isFab)("mdc-fab__ripple", ctx._isFab);
      }
    },
    styles: [".mdc-touch-target-wrapper{display:inline}.mdc-elevation-overlay{position:absolute;border-radius:inherit;pointer-events:none;opacity:var(--mdc-elevation-overlay-opacity);transition:opacity 280ms cubic-bezier(0.4, 0, 0.2, 1);background-color:var(--mdc-elevation-overlay-color)}.mdc-fab{position:relative;display:inline-flex;position:relative;align-items:center;justify-content:center;box-sizing:border-box;width:56px;height:56px;padding:0;border:none;fill:currentColor;text-decoration:none;cursor:pointer;user-select:none;-moz-appearance:none;-webkit-appearance:none;overflow:visible;transition:box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1),opacity 15ms linear 30ms,transform 270ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-fab .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}.mdc-fab[hidden]{display:none}.mdc-fab::-moz-focus-inner{padding:0;border:0}.mdc-fab:hover{box-shadow:0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12)}.mdc-fab.mdc-ripple-upgraded--background-focused,.mdc-fab:not(.mdc-ripple-upgraded):focus{box-shadow:0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12)}.mdc-fab .mdc-fab__focus-ring{position:absolute}.mdc-fab.mdc-ripple-upgraded--background-focused .mdc-fab__focus-ring,.mdc-fab:not(.mdc-ripple-upgraded):focus .mdc-fab__focus-ring{pointer-events:none;border:2px solid rgba(0,0,0,0);border-radius:6px;box-sizing:content-box;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);height:calc(\n      100% + 4px\n    );width:calc(\n      100% + 4px\n    )}@media screen and (forced-colors: active){.mdc-fab.mdc-ripple-upgraded--background-focused .mdc-fab__focus-ring,.mdc-fab:not(.mdc-ripple-upgraded):focus .mdc-fab__focus-ring{border-color:CanvasText}}.mdc-fab.mdc-ripple-upgraded--background-focused .mdc-fab__focus-ring::after,.mdc-fab:not(.mdc-ripple-upgraded):focus .mdc-fab__focus-ring::after{content:\"\";border:2px solid rgba(0,0,0,0);border-radius:8px;display:block;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);height:calc(100% + 4px);width:calc(100% + 4px)}@media screen and (forced-colors: active){.mdc-fab.mdc-ripple-upgraded--background-focused .mdc-fab__focus-ring::after,.mdc-fab:not(.mdc-ripple-upgraded):focus .mdc-fab__focus-ring::after{border-color:CanvasText}}.mdc-fab:active,.mdc-fab:focus:active{box-shadow:0px 7px 8px -4px rgba(0, 0, 0, 0.2), 0px 12px 17px 2px rgba(0, 0, 0, 0.14), 0px 5px 22px 4px rgba(0, 0, 0, 0.12)}.mdc-fab:active,.mdc-fab:focus{outline:none}.mdc-fab:hover{cursor:pointer}.mdc-fab>svg{width:100%}.mdc-fab--mini{width:40px;height:40px}.mdc-fab--extended{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:var(--mdc-typography-button-font-family);font-size:var(--mdc-typography-button-font-size);line-height:var(--mdc-typography-button-line-height);font-weight:var(--mdc-typography-button-font-weight);letter-spacing:var(--mdc-typography-button-letter-spacing);text-decoration:var(--mdc-typography-button-text-decoration);text-transform:var(--mdc-typography-button-text-transform);border-radius:24px;padding-left:20px;padding-right:20px;width:auto;max-width:100%;height:48px;line-height:normal}.mdc-fab--extended .mdc-fab__ripple{border-radius:24px}.mdc-fab--extended .mdc-fab__icon{margin-left:calc(12px - 20px);margin-right:12px}[dir=rtl] .mdc-fab--extended .mdc-fab__icon,.mdc-fab--extended .mdc-fab__icon[dir=rtl]{margin-left:12px;margin-right:calc(12px - 20px)}.mdc-fab--extended .mdc-fab__label+.mdc-fab__icon{margin-left:12px;margin-right:calc(12px - 20px)}[dir=rtl] .mdc-fab--extended .mdc-fab__label+.mdc-fab__icon,.mdc-fab--extended .mdc-fab__label+.mdc-fab__icon[dir=rtl]{margin-left:calc(12px - 20px);margin-right:12px}.mdc-fab--touch{margin-top:4px;margin-bottom:4px;margin-right:4px;margin-left:4px}.mdc-fab--touch .mdc-fab__touch{position:absolute;top:50%;height:48px;left:50%;width:48px;transform:translate(-50%, -50%)}.mdc-fab::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:1px solid rgba(0,0,0,0);border-radius:inherit;content:\"\";pointer-events:none}@media screen and (forced-colors: active){.mdc-fab::before{border-color:CanvasText}}.mdc-fab__label{justify-content:flex-start;text-overflow:ellipsis;white-space:nowrap;overflow-x:hidden;overflow-y:visible}.mdc-fab__icon{transition:transform 180ms 90ms cubic-bezier(0, 0, 0.2, 1);fill:currentColor;will-change:transform}.mdc-fab .mdc-fab__icon{display:inline-flex;align-items:center;justify-content:center}.mdc-fab--exited{transform:scale(0);opacity:0;transition:opacity 15ms linear 150ms,transform 180ms 0ms cubic-bezier(0.4, 0, 1, 1)}.mdc-fab--exited .mdc-fab__icon{transform:scale(0);transition:transform 135ms 0ms cubic-bezier(0.4, 0, 1, 1)}.mat-mdc-fab,.mat-mdc-mini-fab{background-color:var(--mdc-fab-container-color);--mdc-fab-container-shape:50%;--mdc-fab-icon-size:24px}.mat-mdc-fab .mdc-fab__icon,.mat-mdc-mini-fab .mdc-fab__icon{width:var(--mdc-fab-icon-size);height:var(--mdc-fab-icon-size);font-size:var(--mdc-fab-icon-size)}.mat-mdc-fab:not(:disabled) .mdc-fab__icon,.mat-mdc-mini-fab:not(:disabled) .mdc-fab__icon{color:var(--mdc-fab-icon-color)}.mat-mdc-fab:not(.mdc-fab--extended),.mat-mdc-mini-fab:not(.mdc-fab--extended){border-radius:var(--mdc-fab-container-shape)}.mat-mdc-fab:not(.mdc-fab--extended) .mdc-fab__ripple,.mat-mdc-mini-fab:not(.mdc-fab--extended) .mdc-fab__ripple{border-radius:var(--mdc-fab-container-shape)}.mat-mdc-extended-fab{font-family:var(--mdc-extended-fab-label-text-font);font-size:var(--mdc-extended-fab-label-text-size);font-weight:var(--mdc-extended-fab-label-text-weight);letter-spacing:var(--mdc-extended-fab-label-text-tracking)}.mat-mdc-fab,.mat-mdc-mini-fab{-webkit-tap-highlight-color:rgba(0,0,0,0);box-shadow:0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);color:var(--mat-mdc-fab-color, inherit);flex-shrink:0}.mat-mdc-fab .mat-mdc-button-ripple,.mat-mdc-fab .mat-mdc-button-persistent-ripple,.mat-mdc-fab .mat-mdc-button-persistent-ripple::before,.mat-mdc-mini-fab .mat-mdc-button-ripple,.mat-mdc-mini-fab .mat-mdc-button-persistent-ripple,.mat-mdc-mini-fab .mat-mdc-button-persistent-ripple::before{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mat-mdc-fab .mat-mdc-button-ripple,.mat-mdc-mini-fab .mat-mdc-button-ripple{overflow:hidden}.mat-mdc-fab .mat-mdc-button-persistent-ripple::before,.mat-mdc-mini-fab .mat-mdc-button-persistent-ripple::before{content:\"\";opacity:0;background-color:var(--mat-mdc-button-persistent-ripple-color)}.mat-mdc-fab .mat-ripple-element,.mat-mdc-mini-fab .mat-ripple-element{background-color:var(--mat-mdc-button-ripple-color)}.mat-mdc-fab .mdc-button__label,.mat-mdc-mini-fab .mdc-button__label{z-index:1}.mat-mdc-fab .mat-mdc-focus-indicator,.mat-mdc-mini-fab .mat-mdc-focus-indicator{top:0;left:0;right:0;bottom:0;position:absolute}.mat-mdc-fab:focus .mat-mdc-focus-indicator::before,.mat-mdc-mini-fab:focus .mat-mdc-focus-indicator::before{content:\"\"}.mat-mdc-fab .mat-mdc-button-touch-target,.mat-mdc-mini-fab .mat-mdc-button-touch-target{position:absolute;top:50%;height:48px;left:50%;width:48px;transform:translate(-50%, -50%)}.mat-mdc-fab._mat-animation-noopable,.mat-mdc-mini-fab._mat-animation-noopable{transition:none !important;animation:none !important}.mat-mdc-fab:hover,.mat-mdc-fab:focus,.mat-mdc-mini-fab:hover,.mat-mdc-mini-fab:focus{box-shadow:0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12)}.mat-mdc-fab:active,.mat-mdc-fab:focus:active,.mat-mdc-mini-fab:active,.mat-mdc-mini-fab:focus:active{box-shadow:0px 7px 8px -4px rgba(0, 0, 0, 0.2), 0px 12px 17px 2px rgba(0, 0, 0, 0.14), 0px 5px 22px 4px rgba(0, 0, 0, 0.12)}.mat-mdc-fab[disabled],.mat-mdc-mini-fab[disabled]{cursor:default;pointer-events:none;box-shadow:0px 0px 0px 0px rgba(0, 0, 0, 0.2), 0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 0px 0px 0px rgba(0, 0, 0, 0.12)}.mat-mdc-fab:not(.mdc-ripple-upgraded):focus::before,.mat-mdc-mini-fab:not(.mdc-ripple-upgraded):focus::before{background:rgba(0,0,0,0);opacity:1}.mat-mdc-fab .mat-icon,.mat-mdc-fab .material-icons,.mat-mdc-mini-fab .mat-icon,.mat-mdc-mini-fab .material-icons{transition:transform 180ms 90ms cubic-bezier(0, 0, 0.2, 1);fill:currentColor;will-change:transform}.mat-mdc-fab .mat-mdc-focus-indicator::before,.mat-mdc-mini-fab .mat-mdc-focus-indicator::before{margin:calc(calc(var(--mat-mdc-focus-indicator-border-width, 3px) + 2px) * -1)}.mat-mdc-extended-fab>.mat-icon,.mat-mdc-extended-fab>.material-icons{margin-left:calc(12px - 20px);margin-right:12px}[dir=rtl] .mat-mdc-extended-fab>.mat-icon,[dir=rtl] .mat-mdc-extended-fab>.material-icons,.mat-mdc-extended-fab>.mat-icon[dir=rtl],.mat-mdc-extended-fab>.material-icons[dir=rtl]{margin-left:12px;margin-right:calc(12px - 20px)}.mat-mdc-extended-fab .mdc-button__label+.mat-icon,.mat-mdc-extended-fab .mdc-button__label+.material-icons{margin-left:12px;margin-right:calc(12px - 20px)}[dir=rtl] .mat-mdc-extended-fab .mdc-button__label+.mat-icon,[dir=rtl] .mat-mdc-extended-fab .mdc-button__label+.material-icons,.mat-mdc-extended-fab .mdc-button__label+.mat-icon[dir=rtl],.mat-mdc-extended-fab .mdc-button__label+.material-icons[dir=rtl]{margin-left:calc(12px - 20px);margin-right:12px}.mat-mdc-extended-fab .mat-mdc-button-touch-target{width:100%}"],
    encapsulation: 2,
    changeDetection: 0
  });
  return MatFabButton;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
/**
 * Material Design mini floating action button (FAB) component. These buttons represent the primary
 * or most common action for users to interact with.
 * See https://material.io/components/buttons-floating-action-button/
 */
let MatMiniFabButton = /*#__PURE__*/(() => {
  var _class6;
  class MatMiniFabButton extends MatButtonBase {
    constructor(elementRef, platform, ngZone, animationMode, _options) {
      super(elementRef, platform, ngZone, animationMode);
      this._options = _options;
      this._isFab = true;
      this._options = this._options || defaults;
      this.color = this.defaultColor = this._options.color || defaults.color;
    }
  }
  _class6 = MatMiniFabButton;
  _class6.ɵfac = function _class6_Factory(t) {
    return new (t || _class6)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__.Platform), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgZone), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__.ANIMATION_MODULE_TYPE, 8), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](MAT_FAB_DEFAULT_OPTIONS, 8));
  };
  _class6.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
    type: _class6,
    selectors: [["button", "mat-mini-fab", ""]],
    hostVars: 7,
    hostBindings: function _class6_HostBindings(rf, ctx) {
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵattribute"]("disabled", ctx.disabled || null);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassProp"]("_mat-animation-noopable", ctx._animationMode === "NoopAnimations")("mat-unthemed", !ctx.color)("mat-mdc-button-base", true);
      }
    },
    inputs: {
      disabled: "disabled",
      disableRipple: "disableRipple",
      color: "color"
    },
    exportAs: ["matButton"],
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵInheritDefinitionFeature"]],
    attrs: _c6,
    ngContentSelectors: _c2,
    decls: 7,
    vars: 4,
    consts: [[1, "mat-mdc-button-persistent-ripple"], [1, "mdc-button__label"], [1, "mat-mdc-focus-indicator"], [1, "mat-mdc-button-touch-target"]],
    template: function _class6_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵprojectionDef"](_c1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "span", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵprojection"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "span", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵprojection"](3, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵprojection"](4, 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](5, "span", 2)(6, "span", 3);
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassProp"]("mdc-button__ripple", !ctx._isFab)("mdc-fab__ripple", ctx._isFab);
      }
    },
    styles: [_c7],
    encapsulation: 2,
    changeDetection: 0
  });
  return MatMiniFabButton;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
/**
 * Material Design floating action button (FAB) component for anchor elements. Anchor elements
 * are used to provide links for the user to navigate across different routes or pages.
 * See https://material.io/components/buttons-floating-action-button/
 *
 * The `MatFabAnchor` class has two appearances: normal and extended.
 */
let MatFabAnchor = /*#__PURE__*/(() => {
  var _class7;
  class MatFabAnchor extends MatAnchor {
    get extended() {
      return this._extended;
    }
    set extended(value) {
      this._extended = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_1__.coerceBooleanProperty)(value);
    }
    constructor(elementRef, platform, ngZone, animationMode, _options) {
      super(elementRef, platform, ngZone, animationMode);
      this._options = _options;
      this._isFab = true;
      this._options = this._options || defaults;
      this.color = this.defaultColor = this._options.color || defaults.color;
    }
  }
  _class7 = MatFabAnchor;
  _class7.ɵfac = function _class7_Factory(t) {
    return new (t || _class7)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__.Platform), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgZone), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__.ANIMATION_MODULE_TYPE, 8), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](MAT_FAB_DEFAULT_OPTIONS, 8));
  };
  _class7.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
    type: _class7,
    selectors: [["a", "mat-fab", ""]],
    hostVars: 13,
    hostBindings: function _class7_HostBindings(rf, ctx) {
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵattribute"]("disabled", ctx.disabled || null)("tabindex", ctx.disabled ? -1 : ctx.tabIndex)("aria-disabled", ctx.disabled.toString());
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassProp"]("_mat-animation-noopable", ctx._animationMode === "NoopAnimations")("mat-unthemed", !ctx.color)("mat-mdc-button-base", true)("mdc-fab--extended", ctx.extended)("mat-mdc-extended-fab", ctx.extended);
      }
    },
    inputs: {
      disabled: "disabled",
      disableRipple: "disableRipple",
      color: "color",
      tabIndex: "tabIndex",
      extended: "extended"
    },
    exportAs: ["matButton", "matAnchor"],
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵInheritDefinitionFeature"]],
    attrs: _c5,
    ngContentSelectors: _c2,
    decls: 7,
    vars: 4,
    consts: [[1, "mat-mdc-button-persistent-ripple"], [1, "mdc-button__label"], [1, "mat-mdc-focus-indicator"], [1, "mat-mdc-button-touch-target"]],
    template: function _class7_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵprojectionDef"](_c1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "span", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵprojection"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "span", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵprojection"](3, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵprojection"](4, 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](5, "span", 2)(6, "span", 3);
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassProp"]("mdc-button__ripple", !ctx._isFab)("mdc-fab__ripple", ctx._isFab);
      }
    },
    styles: [_c7],
    encapsulation: 2,
    changeDetection: 0
  });
  return MatFabAnchor;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
/**
 * Material Design mini floating action button (FAB) component for anchor elements. Anchor elements
 * are used to provide links for the user to navigate across different routes or pages.
 * See https://material.io/components/buttons-floating-action-button/
 */
let MatMiniFabAnchor = /*#__PURE__*/(() => {
  var _class8;
  class MatMiniFabAnchor extends MatAnchor {
    constructor(elementRef, platform, ngZone, animationMode, _options) {
      super(elementRef, platform, ngZone, animationMode);
      this._options = _options;
      this._isFab = true;
      this._options = this._options || defaults;
      this.color = this.defaultColor = this._options.color || defaults.color;
    }
  }
  _class8 = MatMiniFabAnchor;
  _class8.ɵfac = function _class8_Factory(t) {
    return new (t || _class8)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__.Platform), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgZone), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__.ANIMATION_MODULE_TYPE, 8), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](MAT_FAB_DEFAULT_OPTIONS, 8));
  };
  _class8.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
    type: _class8,
    selectors: [["a", "mat-mini-fab", ""]],
    hostVars: 9,
    hostBindings: function _class8_HostBindings(rf, ctx) {
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵattribute"]("disabled", ctx.disabled || null)("tabindex", ctx.disabled ? -1 : ctx.tabIndex)("aria-disabled", ctx.disabled.toString());
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassProp"]("_mat-animation-noopable", ctx._animationMode === "NoopAnimations")("mat-unthemed", !ctx.color)("mat-mdc-button-base", true);
      }
    },
    inputs: {
      disabled: "disabled",
      disableRipple: "disableRipple",
      color: "color",
      tabIndex: "tabIndex"
    },
    exportAs: ["matButton", "matAnchor"],
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵInheritDefinitionFeature"]],
    attrs: _c6,
    ngContentSelectors: _c2,
    decls: 7,
    vars: 4,
    consts: [[1, "mat-mdc-button-persistent-ripple"], [1, "mdc-button__label"], [1, "mat-mdc-focus-indicator"], [1, "mat-mdc-button-touch-target"]],
    template: function _class8_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵprojectionDef"](_c1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "span", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵprojection"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "span", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵprojection"](3, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵprojection"](4, 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](5, "span", 2)(6, "span", 3);
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassProp"]("mdc-button__ripple", !ctx._isFab)("mdc-fab__ripple", ctx._isFab);
      }
    },
    styles: [_c7],
    encapsulation: 2,
    changeDetection: 0
  });
  return MatMiniFabAnchor;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();

/**
 * Material Design icon button component. This type of button displays a single interactive icon for
 * users to perform an action.
 * See https://material.io/develop/web/components/buttons/icon-buttons/
 */
let MatIconButton = /*#__PURE__*/(() => {
  var _class9;
  class MatIconButton extends MatButtonBase {
    constructor(elementRef, platform, ngZone, animationMode) {
      super(elementRef, platform, ngZone, animationMode);
      this._rippleLoader.configureRipple(this._elementRef.nativeElement, {
        centered: true
      });
    }
  }
  _class9 = MatIconButton;
  _class9.ɵfac = function _class9_Factory(t) {
    return new (t || _class9)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__.Platform), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgZone), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__.ANIMATION_MODULE_TYPE, 8));
  };
  _class9.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
    type: _class9,
    selectors: [["button", "mat-icon-button", ""]],
    hostVars: 7,
    hostBindings: function _class9_HostBindings(rf, ctx) {
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵattribute"]("disabled", ctx.disabled || null);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassProp"]("_mat-animation-noopable", ctx._animationMode === "NoopAnimations")("mat-unthemed", !ctx.color)("mat-mdc-button-base", true);
      }
    },
    inputs: {
      disabled: "disabled",
      disableRipple: "disableRipple",
      color: "color"
    },
    exportAs: ["matButton"],
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵInheritDefinitionFeature"]],
    attrs: _c8,
    ngContentSelectors: _c9,
    decls: 4,
    vars: 0,
    consts: [[1, "mat-mdc-button-persistent-ripple", "mdc-icon-button__ripple"], [1, "mat-mdc-focus-indicator"], [1, "mat-mdc-button-touch-target"]],
    template: function _class9_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵprojectionDef"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "span", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵprojection"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](2, "span", 1)(3, "span", 2);
      }
    },
    styles: [".mdc-icon-button{display:inline-block;position:relative;box-sizing:border-box;border:none;outline:none;background-color:rgba(0,0,0,0);fill:currentColor;color:inherit;text-decoration:none;cursor:pointer;user-select:none;z-index:0;overflow:visible}.mdc-icon-button .mdc-icon-button__touch{position:absolute;top:50%;height:48px;left:50%;width:48px;transform:translate(-50%, -50%)}@media screen and (forced-colors: active){.mdc-icon-button.mdc-ripple-upgraded--background-focused .mdc-icon-button__focus-ring,.mdc-icon-button:not(.mdc-ripple-upgraded):focus .mdc-icon-button__focus-ring{display:block}}.mdc-icon-button:disabled{cursor:default;pointer-events:none}.mdc-icon-button[hidden]{display:none}.mdc-icon-button--display-flex{align-items:center;display:inline-flex;justify-content:center}.mdc-icon-button__focus-ring{pointer-events:none;border:2px solid rgba(0,0,0,0);border-radius:6px;box-sizing:content-box;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);height:100%;width:100%;display:none}@media screen and (forced-colors: active){.mdc-icon-button__focus-ring{border-color:CanvasText}}.mdc-icon-button__focus-ring::after{content:\"\";border:2px solid rgba(0,0,0,0);border-radius:8px;display:block;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);height:calc(100% + 4px);width:calc(100% + 4px)}@media screen and (forced-colors: active){.mdc-icon-button__focus-ring::after{border-color:CanvasText}}.mdc-icon-button__icon{display:inline-block}.mdc-icon-button__icon.mdc-icon-button__icon--on{display:none}.mdc-icon-button--on .mdc-icon-button__icon{display:none}.mdc-icon-button--on .mdc-icon-button__icon.mdc-icon-button__icon--on{display:inline-block}.mdc-icon-button__link{height:100%;left:0;outline:none;position:absolute;top:0;width:100%}.mat-mdc-icon-button{height:var(--mdc-icon-button-state-layer-size);width:var(--mdc-icon-button-state-layer-size);color:var(--mdc-icon-button-icon-color);--mdc-icon-button-state-layer-size:48px;--mdc-icon-button-icon-size:24px;--mdc-icon-button-disabled-icon-color:black;--mdc-icon-button-disabled-icon-opacity:0.38}.mat-mdc-icon-button .mdc-button__icon{font-size:var(--mdc-icon-button-icon-size)}.mat-mdc-icon-button svg,.mat-mdc-icon-button img{width:var(--mdc-icon-button-icon-size);height:var(--mdc-icon-button-icon-size)}.mat-mdc-icon-button:disabled{opacity:var(--mdc-icon-button-disabled-icon-opacity)}.mat-mdc-icon-button:disabled{color:var(--mdc-icon-button-disabled-icon-color)}.mat-mdc-icon-button{padding:12px;font-size:var(--mdc-icon-button-icon-size);border-radius:50%;flex-shrink:0;text-align:center;-webkit-tap-highlight-color:rgba(0,0,0,0)}.mat-mdc-icon-button svg{vertical-align:baseline}.mat-mdc-icon-button[disabled]{cursor:default;pointer-events:none;opacity:1}.mat-mdc-icon-button .mat-mdc-button-ripple,.mat-mdc-icon-button .mat-mdc-button-persistent-ripple,.mat-mdc-icon-button .mat-mdc-button-persistent-ripple::before{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mat-mdc-icon-button .mat-mdc-button-ripple{overflow:hidden}.mat-mdc-icon-button .mat-mdc-button-persistent-ripple::before{content:\"\";opacity:0;background-color:var(--mat-mdc-button-persistent-ripple-color)}.mat-mdc-icon-button .mat-ripple-element{background-color:var(--mat-mdc-button-ripple-color)}.mat-mdc-icon-button .mdc-button__label{z-index:1}.mat-mdc-icon-button .mat-mdc-focus-indicator{top:0;left:0;right:0;bottom:0;position:absolute}.mat-mdc-icon-button:focus .mat-mdc-focus-indicator::before{content:\"\"}.mat-mdc-icon-button .mat-mdc-button-touch-target{position:absolute;top:50%;height:48px;left:50%;width:48px;transform:translate(-50%, -50%)}.mat-mdc-icon-button._mat-animation-noopable{transition:none !important;animation:none !important}.mat-mdc-icon-button .mat-mdc-button-persistent-ripple{border-radius:50%}.mat-mdc-icon-button.mat-unthemed:not(.mdc-ripple-upgraded):focus::before,.mat-mdc-icon-button.mat-primary:not(.mdc-ripple-upgraded):focus::before,.mat-mdc-icon-button.mat-accent:not(.mdc-ripple-upgraded):focus::before,.mat-mdc-icon-button.mat-warn:not(.mdc-ripple-upgraded):focus::before{background:rgba(0,0,0,0);opacity:1}", _c4],
    encapsulation: 2,
    changeDetection: 0
  });
  return MatIconButton;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
/**
 * Material Design icon button component for anchor elements. This button displays a single
 * interaction icon that allows users to navigate across different routes or pages.
 * See https://material.io/develop/web/components/buttons/icon-buttons/
 */
let MatIconAnchor = /*#__PURE__*/(() => {
  var _class10;
  class MatIconAnchor extends MatAnchorBase {
    constructor(elementRef, platform, ngZone, animationMode) {
      super(elementRef, platform, ngZone, animationMode);
    }
  }
  _class10 = MatIconAnchor;
  _class10.ɵfac = function _class10_Factory(t) {
    return new (t || _class10)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__.Platform), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgZone), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__.ANIMATION_MODULE_TYPE, 8));
  };
  _class10.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
    type: _class10,
    selectors: [["a", "mat-icon-button", ""]],
    hostVars: 9,
    hostBindings: function _class10_HostBindings(rf, ctx) {
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵattribute"]("disabled", ctx.disabled || null)("tabindex", ctx.disabled ? -1 : ctx.tabIndex)("aria-disabled", ctx.disabled.toString());
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassProp"]("_mat-animation-noopable", ctx._animationMode === "NoopAnimations")("mat-unthemed", !ctx.color)("mat-mdc-button-base", true);
      }
    },
    inputs: {
      disabled: "disabled",
      disableRipple: "disableRipple",
      color: "color",
      tabIndex: "tabIndex"
    },
    exportAs: ["matButton", "matAnchor"],
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵInheritDefinitionFeature"]],
    attrs: _c8,
    ngContentSelectors: _c2,
    decls: 7,
    vars: 4,
    consts: [[1, "mat-mdc-button-persistent-ripple"], [1, "mdc-button__label"], [1, "mat-mdc-focus-indicator"], [1, "mat-mdc-button-touch-target"]],
    template: function _class10_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵprojectionDef"](_c1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "span", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵprojection"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "span", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵprojection"](3, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵprojection"](4, 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](5, "span", 2)(6, "span", 3);
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassProp"]("mdc-button__ripple", !ctx._isFab)("mdc-fab__ripple", ctx._isFab);
      }
    },
    styles: [_c10, _c4],
    encapsulation: 2,
    changeDetection: 0
  });
  return MatIconAnchor;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
let MatButtonModule = /*#__PURE__*/(() => {
  var _class11;
  class MatButtonModule {}
  _class11 = MatButtonModule;
  _class11.ɵfac = function _class11_Factory(t) {
    return new (t || _class11)();
  };
  _class11.ɵmod = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
    type: _class11
  });
  _class11.ɵinj = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
    imports: [_angular_material_core__WEBPACK_IMPORTED_MODULE_0__.MatCommonModule, _angular_material_core__WEBPACK_IMPORTED_MODULE_0__.MatRippleModule, _angular_material_core__WEBPACK_IMPORTED_MODULE_0__.MatCommonModule]
  });
  return MatButtonModule;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();

/**
 * Generated bundle index. Do not edit.
 */



/***/ }),

/***/ 56381:
/*!**********************************************************!*\
  !*** ./node_modules/@angular/material/fesm2022/core.mjs ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AnimationCurves: () => (/* binding */ AnimationCurves),
/* harmony export */   AnimationDurations: () => (/* binding */ AnimationDurations),
/* harmony export */   DateAdapter: () => (/* binding */ DateAdapter),
/* harmony export */   ErrorStateMatcher: () => (/* binding */ ErrorStateMatcher),
/* harmony export */   MATERIAL_SANITY_CHECKS: () => (/* binding */ MATERIAL_SANITY_CHECKS),
/* harmony export */   MAT_DATE_FORMATS: () => (/* binding */ MAT_DATE_FORMATS),
/* harmony export */   MAT_DATE_LOCALE: () => (/* binding */ MAT_DATE_LOCALE),
/* harmony export */   MAT_DATE_LOCALE_FACTORY: () => (/* binding */ MAT_DATE_LOCALE_FACTORY),
/* harmony export */   MAT_NATIVE_DATE_FORMATS: () => (/* binding */ MAT_NATIVE_DATE_FORMATS),
/* harmony export */   MAT_OPTGROUP: () => (/* binding */ MAT_OPTGROUP),
/* harmony export */   MAT_OPTION_PARENT_COMPONENT: () => (/* binding */ MAT_OPTION_PARENT_COMPONENT),
/* harmony export */   MAT_RIPPLE_GLOBAL_OPTIONS: () => (/* binding */ MAT_RIPPLE_GLOBAL_OPTIONS),
/* harmony export */   MatCommonModule: () => (/* binding */ MatCommonModule),
/* harmony export */   MatLine: () => (/* binding */ MatLine),
/* harmony export */   MatLineModule: () => (/* binding */ MatLineModule),
/* harmony export */   MatNativeDateModule: () => (/* binding */ MatNativeDateModule),
/* harmony export */   MatOptgroup: () => (/* binding */ MatOptgroup),
/* harmony export */   MatOption: () => (/* binding */ MatOption),
/* harmony export */   MatOptionModule: () => (/* binding */ MatOptionModule),
/* harmony export */   MatOptionSelectionChange: () => (/* binding */ MatOptionSelectionChange),
/* harmony export */   MatPseudoCheckbox: () => (/* binding */ MatPseudoCheckbox),
/* harmony export */   MatPseudoCheckboxModule: () => (/* binding */ MatPseudoCheckboxModule),
/* harmony export */   MatRipple: () => (/* binding */ MatRipple),
/* harmony export */   MatRippleLoader: () => (/* binding */ MatRippleLoader),
/* harmony export */   MatRippleModule: () => (/* binding */ MatRippleModule),
/* harmony export */   NativeDateAdapter: () => (/* binding */ NativeDateAdapter),
/* harmony export */   NativeDateModule: () => (/* binding */ NativeDateModule),
/* harmony export */   RippleRef: () => (/* binding */ RippleRef),
/* harmony export */   RippleRenderer: () => (/* binding */ RippleRenderer),
/* harmony export */   ShowOnDirtyErrorStateMatcher: () => (/* binding */ ShowOnDirtyErrorStateMatcher),
/* harmony export */   VERSION: () => (/* binding */ VERSION),
/* harmony export */   _MatOptgroupBase: () => (/* binding */ _MatOptgroupBase),
/* harmony export */   _MatOptionBase: () => (/* binding */ _MatOptionBase),
/* harmony export */   _countGroupLabelsBeforeOption: () => (/* binding */ _countGroupLabelsBeforeOption),
/* harmony export */   _getOptionScrollPosition: () => (/* binding */ _getOptionScrollPosition),
/* harmony export */   defaultRippleAnimationConfig: () => (/* binding */ defaultRippleAnimationConfig),
/* harmony export */   mixinColor: () => (/* binding */ mixinColor),
/* harmony export */   mixinDisableRipple: () => (/* binding */ mixinDisableRipple),
/* harmony export */   mixinDisabled: () => (/* binding */ mixinDisabled),
/* harmony export */   mixinErrorState: () => (/* binding */ mixinErrorState),
/* harmony export */   mixinInitialized: () => (/* binding */ mixinInitialized),
/* harmony export */   mixinTabIndex: () => (/* binding */ mixinTabIndex),
/* harmony export */   setLines: () => (/* binding */ setLines)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser/animations */ 59936);
/* harmony import */ var _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/cdk/a11y */ 5612);
/* harmony import */ var _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/cdk/bidi */ 29988);
/* harmony import */ var _angular_cdk__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/cdk */ 41172);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 34228);
/* harmony import */ var _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/cdk/platform */ 92237);
/* harmony import */ var _angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/cdk/coercion */ 45029);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ 85028);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs/operators */ 33410);
/* harmony import */ var _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/cdk/keycodes */ 31998);
var _class11;
















/** Current version of Angular Material. */
const _c0 = ["*", [["mat-option"], ["ng-container"]]];
const _c1 = ["*", "mat-option, ng-container"];
const _c2 = ["text"];
function _class19_mat_pseudo_checkbox_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "mat-pseudo-checkbox", 6);
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", ctx_r0.disabled)("state", ctx_r0.selected ? "checked" : "unchecked");
  }
}
function _class19_mat_pseudo_checkbox_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "mat-pseudo-checkbox", 7);
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", ctx_r2.disabled);
  }
}
function _class19_span_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("(", ctx_r3.group.label, ")");
  }
}
const _c3 = [[["mat-icon"]], "*"];
const _c4 = ["mat-icon", "*"];
const VERSION = /*#__PURE__*/new _angular_core__WEBPACK_IMPORTED_MODULE_0__.Version('16.2.1');

/** @docs-private */
let AnimationCurves = /*#__PURE__*/(() => {
  var _class;
  class AnimationCurves {}
  _class = AnimationCurves;
  _class.STANDARD_CURVE = 'cubic-bezier(0.4,0.0,0.2,1)';
  _class.DECELERATION_CURVE = 'cubic-bezier(0.0,0.0,0.2,1)';
  _class.ACCELERATION_CURVE = 'cubic-bezier(0.4,0.0,1,1)';
  _class.SHARP_CURVE = 'cubic-bezier(0.4,0.0,0.6,1)';
  return AnimationCurves;
})();
/** @docs-private */
let AnimationDurations = /*#__PURE__*/(() => {
  var _class2;
  class AnimationDurations {}
  _class2 = AnimationDurations;
  _class2.COMPLEX = '375ms';
  _class2.ENTERING = '225ms';
  _class2.EXITING = '195ms';
  return AnimationDurations;
})();
/** @docs-private */
function MATERIAL_SANITY_CHECKS_FACTORY() {
  return true;
}
/** Injection token that configures whether the Material sanity checks are enabled. */
const MATERIAL_SANITY_CHECKS = /*#__PURE__*/new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken('mat-sanity-checks', {
  providedIn: 'root',
  factory: MATERIAL_SANITY_CHECKS_FACTORY
});
/**
 * Module that captures anything that should be loaded and/or run for *all* Angular Material
 * components. This includes Bidi, etc.
 *
 * This module should be imported to each top-level component module (e.g., MatTabsModule).
 */
let MatCommonModule = /*#__PURE__*/(() => {
  var _class3;
  class MatCommonModule {
    constructor(highContrastModeDetector, _sanityChecks, _document) {
      this._sanityChecks = _sanityChecks;
      this._document = _document;
      /** Whether we've done the global sanity checks (e.g. a theme is loaded, there is a doctype). */
      this._hasDoneGlobalChecks = false;
      // While A11yModule also does this, we repeat it here to avoid importing A11yModule
      // in MatCommonModule.
      highContrastModeDetector._applyBodyHighContrastModeCssClasses();
      if (!this._hasDoneGlobalChecks) {
        this._hasDoneGlobalChecks = true;
        if (typeof ngDevMode === 'undefined' || ngDevMode) {
          // Inject in here so the reference to `Platform` can be removed in production mode.
          const platform = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_1__.Platform, {
            optional: true
          });
          if (this._checkIsEnabled('doctype')) {
            _checkDoctypeIsDefined(this._document);
          }
          if (this._checkIsEnabled('theme')) {
            _checkThemeIsPresent(this._document, !!platform?.isBrowser);
          }
          if (this._checkIsEnabled('version')) {
            _checkCdkVersionMatch();
          }
        }
      }
    }
    /** Gets whether a specific sanity check is enabled. */
    _checkIsEnabled(name) {
      if ((0,_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_1__._isTestEnvironment)()) {
        return false;
      }
      if (typeof this._sanityChecks === 'boolean') {
        return this._sanityChecks;
      }
      return !!this._sanityChecks[name];
    }
  }
  _class3 = MatCommonModule;
  _class3.ɵfac = function _class3_Factory(t) {
    return new (t || _class3)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_2__.HighContrastModeDetector), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](MATERIAL_SANITY_CHECKS, 8), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common__WEBPACK_IMPORTED_MODULE_3__.DOCUMENT));
  };
  _class3.ɵmod = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
    type: _class3
  });
  _class3.ɵinj = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
    imports: [_angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_4__.BidiModule, _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_4__.BidiModule]
  });
  return MatCommonModule;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
/** Checks that the page has a doctype. */
function _checkDoctypeIsDefined(doc) {
  if (!doc.doctype) {
    console.warn('Current document does not have a doctype. This may cause ' + 'some Angular Material components not to behave as expected.');
  }
}
/** Checks that a theme has been included. */
function _checkThemeIsPresent(doc, isBrowser) {
  // We need to assert that the `body` is defined, because these checks run very early
  // and the `body` won't be defined if the consumer put their scripts in the `head`.
  if (!doc.body || !isBrowser) {
    return;
  }
  const testElement = doc.createElement('div');
  testElement.classList.add('mat-theme-loaded-marker');
  doc.body.appendChild(testElement);
  const computedStyle = getComputedStyle(testElement);
  // In some situations the computed style of the test element can be null. For example in
  // Firefox, the computed style is null if an application is running inside of a hidden iframe.
  // See: https://bugzilla.mozilla.org/show_bug.cgi?id=548397
  if (computedStyle && computedStyle.display !== 'none') {
    console.warn('Could not find Angular Material core theme. Most Material ' + 'components may not work as expected. For more info refer ' + 'to the theming guide: https://material.angular.io/guide/theming');
  }
  testElement.remove();
}
/** Checks whether the Material version matches the CDK version. */
function _checkCdkVersionMatch() {
  if (VERSION.full !== _angular_cdk__WEBPACK_IMPORTED_MODULE_5__.VERSION.full) {
    console.warn('The Angular Material version (' + VERSION.full + ') does not match ' + 'the Angular CDK version (' + _angular_cdk__WEBPACK_IMPORTED_MODULE_5__.VERSION.full + ').\n' + 'Please ensure the versions of these two packages exactly match.');
  }
}
function mixinDisabled(base) {
  return class extends base {
    get disabled() {
      return this._disabled;
    }
    set disabled(value) {
      this._disabled = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_6__.coerceBooleanProperty)(value);
    }
    constructor(...args) {
      super(...args);
      this._disabled = false;
    }
  };
}
function mixinColor(base, defaultColor) {
  return class extends base {
    get color() {
      return this._color;
    }
    set color(value) {
      const colorPalette = value || this.defaultColor;
      if (colorPalette !== this._color) {
        if (this._color) {
          this._elementRef.nativeElement.classList.remove(`mat-${this._color}`);
        }
        if (colorPalette) {
          this._elementRef.nativeElement.classList.add(`mat-${colorPalette}`);
        }
        this._color = colorPalette;
      }
    }
    constructor(...args) {
      super(...args);
      this.defaultColor = defaultColor;
      // Set the default color that can be specified from the mixin.
      this.color = defaultColor;
    }
  };
}
function mixinDisableRipple(base) {
  return class extends base {
    /** Whether the ripple effect is disabled or not. */
    get disableRipple() {
      return this._disableRipple;
    }
    set disableRipple(value) {
      this._disableRipple = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_6__.coerceBooleanProperty)(value);
    }
    constructor(...args) {
      super(...args);
      this._disableRipple = false;
    }
  };
}
function mixinTabIndex(base, defaultTabIndex = 0) {
  return class extends base {
    get tabIndex() {
      return this.disabled ? -1 : this._tabIndex;
    }
    set tabIndex(value) {
      // If the specified tabIndex value is null or undefined, fall back to the default value.
      this._tabIndex = value != null ? (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_6__.coerceNumberProperty)(value) : this.defaultTabIndex;
    }
    constructor(...args) {
      super(...args);
      this._tabIndex = defaultTabIndex;
      this.defaultTabIndex = defaultTabIndex;
    }
  };
}
function mixinErrorState(base) {
  return class extends base {
    /** Updates the error state based on the provided error state matcher. */
    updateErrorState() {
      const oldState = this.errorState;
      const parent = this._parentFormGroup || this._parentForm;
      const matcher = this.errorStateMatcher || this._defaultErrorStateMatcher;
      const control = this.ngControl ? this.ngControl.control : null;
      const newState = matcher.isErrorState(control, parent);
      if (newState !== oldState) {
        this.errorState = newState;
        this.stateChanges.next();
      }
    }
    constructor(...args) {
      super(...args);
      /** Whether the component is in an error state. */
      this.errorState = false;
    }
  };
}

/** Mixin to augment a directive with an initialized property that will emits when ngOnInit ends. */
function mixinInitialized(base) {
  return class extends base {
    constructor(...args) {
      super(...args);
      /** Whether this directive has been marked as initialized. */
      this._isInitialized = false;
      /**
       * List of subscribers that subscribed before the directive was initialized. Should be notified
       * during _markInitialized. Set to null after pending subscribers are notified, and should
       * not expect to be populated after.
       */
      this._pendingSubscribers = [];
      /**
       * Observable stream that emits when the directive initializes. If already initialized, the
       * subscriber is stored to be notified once _markInitialized is called.
       */
      this.initialized = new rxjs__WEBPACK_IMPORTED_MODULE_7__.Observable(subscriber => {
        // If initialized, immediately notify the subscriber. Otherwise store the subscriber to notify
        // when _markInitialized is called.
        if (this._isInitialized) {
          this._notifySubscriber(subscriber);
        } else {
          this._pendingSubscribers.push(subscriber);
        }
      });
    }
    /**
     * Marks the state as initialized and notifies pending subscribers. Should be called at the end
     * of ngOnInit.
     * @docs-private
     */
    _markInitialized() {
      if (this._isInitialized && (typeof ngDevMode === 'undefined' || ngDevMode)) {
        throw Error('This directive has already been marked as initialized and ' + 'should not be called twice.');
      }
      this._isInitialized = true;
      this._pendingSubscribers.forEach(this._notifySubscriber);
      this._pendingSubscribers = null;
    }
    /** Emits and completes the subscriber stream (should only emit once). */
    _notifySubscriber(subscriber) {
      subscriber.next();
      subscriber.complete();
    }
  };
}

/** InjectionToken for datepicker that can be used to override default locale code. */
const MAT_DATE_LOCALE = /*#__PURE__*/new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken('MAT_DATE_LOCALE', {
  providedIn: 'root',
  factory: MAT_DATE_LOCALE_FACTORY
});
/** @docs-private */
function MAT_DATE_LOCALE_FACTORY() {
  return (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_angular_core__WEBPACK_IMPORTED_MODULE_0__.LOCALE_ID);
}
/** Adapts type `D` to be usable as a date by cdk-based components that work with dates. */
class DateAdapter {
  constructor() {
    this._localeChanges = new rxjs__WEBPACK_IMPORTED_MODULE_7__.Subject();
    /** A stream that emits when the locale changes. */
    this.localeChanges = this._localeChanges;
  }
  /**
   * Given a potential date object, returns that same date object if it is
   * a valid date, or `null` if it's not a valid date.
   * @param obj The object to check.
   * @returns A date or `null`.
   */
  getValidDateOrNull(obj) {
    return this.isDateInstance(obj) && this.isValid(obj) ? obj : null;
  }
  /**
   * Attempts to deserialize a value to a valid date object. This is different from parsing in that
   * deserialize should only accept non-ambiguous, locale-independent formats (e.g. a ISO 8601
   * string). The default implementation does not allow any deserialization, it simply checks that
   * the given value is already a valid date object or null. The `<mat-datepicker>` will call this
   * method on all of its `@Input()` properties that accept dates. It is therefore possible to
   * support passing values from your backend directly to these properties by overriding this method
   * to also deserialize the format used by your backend.
   * @param value The value to be deserialized into a date object.
   * @returns The deserialized date object, either a valid date, null if the value can be
   *     deserialized into a null date (e.g. the empty string), or an invalid date.
   */
  deserialize(value) {
    if (value == null || this.isDateInstance(value) && this.isValid(value)) {
      return value;
    }
    return this.invalid();
  }
  /**
   * Sets the locale used for all dates.
   * @param locale The new locale.
   */
  setLocale(locale) {
    this.locale = locale;
    this._localeChanges.next();
  }
  /**
   * Compares two dates.
   * @param first The first date to compare.
   * @param second The second date to compare.
   * @returns 0 if the dates are equal, a number less than 0 if the first date is earlier,
   *     a number greater than 0 if the first date is later.
   */
  compareDate(first, second) {
    return this.getYear(first) - this.getYear(second) || this.getMonth(first) - this.getMonth(second) || this.getDate(first) - this.getDate(second);
  }
  /**
   * Checks if two dates are equal.
   * @param first The first date to check.
   * @param second The second date to check.
   * @returns Whether the two dates are equal.
   *     Null dates are considered equal to other null dates.
   */
  sameDate(first, second) {
    if (first && second) {
      let firstValid = this.isValid(first);
      let secondValid = this.isValid(second);
      if (firstValid && secondValid) {
        return !this.compareDate(first, second);
      }
      return firstValid == secondValid;
    }
    return first == second;
  }
  /**
   * Clamp the given date between min and max dates.
   * @param date The date to clamp.
   * @param min The minimum value to allow. If null or omitted no min is enforced.
   * @param max The maximum value to allow. If null or omitted no max is enforced.
   * @returns `min` if `date` is less than `min`, `max` if date is greater than `max`,
   *     otherwise `date`.
   */
  clampDate(date, min, max) {
    if (min && this.compareDate(date, min) < 0) {
      return min;
    }
    if (max && this.compareDate(date, max) > 0) {
      return max;
    }
    return date;
  }
}
const MAT_DATE_FORMATS = /*#__PURE__*/new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken('mat-date-formats');

/**
 * Matches strings that have the form of a valid RFC 3339 string
 * (https://tools.ietf.org/html/rfc3339). Note that the string may not actually be a valid date
 * because the regex will match strings an with out of bounds month, date, etc.
 */
const ISO_8601_REGEX = /^\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|(?:(?:\+|-)\d{2}:\d{2}))?)?$/;
/** Creates an array and fills it with values. */
function range(length, valueFunction) {
  const valuesArray = Array(length);
  for (let i = 0; i < length; i++) {
    valuesArray[i] = valueFunction(i);
  }
  return valuesArray;
}
/** Adapts the native JS Date for use with cdk-based components that work with dates. */
let NativeDateAdapter = /*#__PURE__*/(() => {
  var _class4;
  class NativeDateAdapter extends DateAdapter {
    constructor(matDateLocale,
    /**
     * @deprecated No longer being used. To be removed.
     * @breaking-change 14.0.0
     */
    _platform) {
      super();
      /**
       * @deprecated No longer being used. To be removed.
       * @breaking-change 14.0.0
       */
      this.useUtcForDisplay = false;
      super.setLocale(matDateLocale);
    }
    getYear(date) {
      return date.getFullYear();
    }
    getMonth(date) {
      return date.getMonth();
    }
    getDate(date) {
      return date.getDate();
    }
    getDayOfWeek(date) {
      return date.getDay();
    }
    getMonthNames(style) {
      const dtf = new Intl.DateTimeFormat(this.locale, {
        month: style,
        timeZone: 'utc'
      });
      return range(12, i => this._format(dtf, new Date(2017, i, 1)));
    }
    getDateNames() {
      const dtf = new Intl.DateTimeFormat(this.locale, {
        day: 'numeric',
        timeZone: 'utc'
      });
      return range(31, i => this._format(dtf, new Date(2017, 0, i + 1)));
    }
    getDayOfWeekNames(style) {
      const dtf = new Intl.DateTimeFormat(this.locale, {
        weekday: style,
        timeZone: 'utc'
      });
      return range(7, i => this._format(dtf, new Date(2017, 0, i + 1)));
    }
    getYearName(date) {
      const dtf = new Intl.DateTimeFormat(this.locale, {
        year: 'numeric',
        timeZone: 'utc'
      });
      return this._format(dtf, date);
    }
    getFirstDayOfWeek() {
      // We can't tell using native JS Date what the first day of the week is, we default to Sunday.
      return 0;
    }
    getNumDaysInMonth(date) {
      return this.getDate(this._createDateWithOverflow(this.getYear(date), this.getMonth(date) + 1, 0));
    }
    clone(date) {
      return new Date(date.getTime());
    }
    createDate(year, month, date) {
      if (typeof ngDevMode === 'undefined' || ngDevMode) {
        // Check for invalid month and date (except upper bound on date which we have to check after
        // creating the Date).
        if (month < 0 || month > 11) {
          throw Error(`Invalid month index "${month}". Month index has to be between 0 and 11.`);
        }
        if (date < 1) {
          throw Error(`Invalid date "${date}". Date has to be greater than 0.`);
        }
      }
      let result = this._createDateWithOverflow(year, month, date);
      // Check that the date wasn't above the upper bound for the month, causing the month to overflow
      if (result.getMonth() != month && (typeof ngDevMode === 'undefined' || ngDevMode)) {
        throw Error(`Invalid date "${date}" for month with index "${month}".`);
      }
      return result;
    }
    today() {
      return new Date();
    }
    parse(value, parseFormat) {
      // We have no way using the native JS Date to set the parse format or locale, so we ignore these
      // parameters.
      if (typeof value == 'number') {
        return new Date(value);
      }
      return value ? new Date(Date.parse(value)) : null;
    }
    format(date, displayFormat) {
      if (!this.isValid(date)) {
        throw Error('NativeDateAdapter: Cannot format invalid date.');
      }
      const dtf = new Intl.DateTimeFormat(this.locale, {
        ...displayFormat,
        timeZone: 'utc'
      });
      return this._format(dtf, date);
    }
    addCalendarYears(date, years) {
      return this.addCalendarMonths(date, years * 12);
    }
    addCalendarMonths(date, months) {
      let newDate = this._createDateWithOverflow(this.getYear(date), this.getMonth(date) + months, this.getDate(date));
      // It's possible to wind up in the wrong month if the original month has more days than the new
      // month. In this case we want to go to the last day of the desired month.
      // Note: the additional + 12 % 12 ensures we end up with a positive number, since JS % doesn't
      // guarantee this.
      if (this.getMonth(newDate) != ((this.getMonth(date) + months) % 12 + 12) % 12) {
        newDate = this._createDateWithOverflow(this.getYear(newDate), this.getMonth(newDate), 0);
      }
      return newDate;
    }
    addCalendarDays(date, days) {
      return this._createDateWithOverflow(this.getYear(date), this.getMonth(date), this.getDate(date) + days);
    }
    toIso8601(date) {
      return [date.getUTCFullYear(), this._2digit(date.getUTCMonth() + 1), this._2digit(date.getUTCDate())].join('-');
    }
    /**
     * Returns the given value if given a valid Date or null. Deserializes valid ISO 8601 strings
     * (https://www.ietf.org/rfc/rfc3339.txt) into valid Dates and empty string into null. Returns an
     * invalid date for all other values.
     */
    deserialize(value) {
      if (typeof value === 'string') {
        if (!value) {
          return null;
        }
        // The `Date` constructor accepts formats other than ISO 8601, so we need to make sure the
        // string is the right format first.
        if (ISO_8601_REGEX.test(value)) {
          let date = new Date(value);
          if (this.isValid(date)) {
            return date;
          }
        }
      }
      return super.deserialize(value);
    }
    isDateInstance(obj) {
      return obj instanceof Date;
    }
    isValid(date) {
      return !isNaN(date.getTime());
    }
    invalid() {
      return new Date(NaN);
    }
    /** Creates a date but allows the month and date to overflow. */
    _createDateWithOverflow(year, month, date) {
      // Passing the year to the constructor causes year numbers <100 to be converted to 19xx.
      // To work around this we use `setFullYear` and `setHours` instead.
      const d = new Date();
      d.setFullYear(year, month, date);
      d.setHours(0, 0, 0, 0);
      return d;
    }
    /**
     * Pads a number to make it two digits.
     * @param n The number to pad.
     * @returns The padded number.
     */
    _2digit(n) {
      return ('00' + n).slice(-2);
    }
    /**
     * When converting Date object to string, javascript built-in functions may return wrong
     * results because it applies its internal DST rules. The DST rules around the world change
     * very frequently, and the current valid rule is not always valid in previous years though.
     * We work around this problem building a new Date object which has its internal UTC
     * representation with the local date and time.
     * @param dtf Intl.DateTimeFormat object, containing the desired string format. It must have
     *    timeZone set to 'utc' to work fine.
     * @param date Date from which we want to get the string representation according to dtf
     * @returns A Date object with its UTC representation based on the passed in date info
     */
    _format(dtf, date) {
      // Passing the year to the constructor causes year numbers <100 to be converted to 19xx.
      // To work around this we use `setUTCFullYear` and `setUTCHours` instead.
      const d = new Date();
      d.setUTCFullYear(date.getFullYear(), date.getMonth(), date.getDate());
      d.setUTCHours(date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());
      return dtf.format(d);
    }
  }
  _class4 = NativeDateAdapter;
  _class4.ɵfac = function _class4_Factory(t) {
    return new (t || _class4)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](MAT_DATE_LOCALE, 8), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_1__.Platform));
  };
  _class4.ɵprov = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
    token: _class4,
    factory: _class4.ɵfac
  });
  return NativeDateAdapter;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
const MAT_NATIVE_DATE_FORMATS = {
  parse: {
    dateInput: null
  },
  display: {
    dateInput: {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric'
    },
    monthYearLabel: {
      year: 'numeric',
      month: 'short'
    },
    dateA11yLabel: {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    },
    monthYearA11yLabel: {
      year: 'numeric',
      month: 'long'
    }
  }
};
let NativeDateModule = /*#__PURE__*/(() => {
  var _class5;
  class NativeDateModule {}
  _class5 = NativeDateModule;
  _class5.ɵfac = function _class5_Factory(t) {
    return new (t || _class5)();
  };
  _class5.ɵmod = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
    type: _class5
  });
  _class5.ɵinj = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
    providers: [{
      provide: DateAdapter,
      useClass: NativeDateAdapter
    }]
  });
  return NativeDateModule;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
let MatNativeDateModule = /*#__PURE__*/(() => {
  var _class6;
  class MatNativeDateModule {}
  _class6 = MatNativeDateModule;
  _class6.ɵfac = function _class6_Factory(t) {
    return new (t || _class6)();
  };
  _class6.ɵmod = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
    type: _class6
  });
  _class6.ɵinj = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
    providers: [{
      provide: MAT_DATE_FORMATS,
      useValue: MAT_NATIVE_DATE_FORMATS
    }],
    imports: [NativeDateModule]
  });
  return MatNativeDateModule;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();

/** Error state matcher that matches when a control is invalid and dirty. */
let ShowOnDirtyErrorStateMatcher = /*#__PURE__*/(() => {
  var _class7;
  class ShowOnDirtyErrorStateMatcher {
    isErrorState(control, form) {
      return !!(control && control.invalid && (control.dirty || form && form.submitted));
    }
  }
  _class7 = ShowOnDirtyErrorStateMatcher;
  _class7.ɵfac = function _class7_Factory(t) {
    return new (t || _class7)();
  };
  _class7.ɵprov = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
    token: _class7,
    factory: _class7.ɵfac
  });
  return ShowOnDirtyErrorStateMatcher;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
/** Provider that defines how form controls behave with regards to displaying error messages. */
let ErrorStateMatcher = /*#__PURE__*/(() => {
  var _class8;
  class ErrorStateMatcher {
    isErrorState(control, form) {
      return !!(control && control.invalid && (control.touched || form && form.submitted));
    }
  }
  _class8 = ErrorStateMatcher;
  _class8.ɵfac = function _class8_Factory(t) {
    return new (t || _class8)();
  };
  _class8.ɵprov = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
    token: _class8,
    factory: _class8.ɵfac,
    providedIn: 'root'
  });
  return ErrorStateMatcher;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();

/**
 * Shared directive to count lines inside a text area, such as a list item.
 * Line elements can be extracted with a @ContentChildren(MatLine) query, then
 * counted by checking the query list's length.
 */
let MatLine = /*#__PURE__*/(() => {
  var _class9;
  class MatLine {}
  _class9 = MatLine;
  _class9.ɵfac = function _class9_Factory(t) {
    return new (t || _class9)();
  };
  _class9.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
    type: _class9,
    selectors: [["", "mat-line", ""], ["", "matLine", ""]],
    hostAttrs: [1, "mat-line"]
  });
  return MatLine;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
/**
 * Helper that takes a query list of lines and sets the correct class on the host.
 * @docs-private
 */
function setLines(lines, element, prefix = 'mat') {
  // Note: doesn't need to unsubscribe, because `changes`
  // gets completed by Angular when the view is destroyed.
  lines.changes.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.startWith)(lines)).subscribe(({
    length
  }) => {
    setClass(element, `${prefix}-2-line`, false);
    setClass(element, `${prefix}-3-line`, false);
    setClass(element, `${prefix}-multi-line`, false);
    if (length === 2 || length === 3) {
      setClass(element, `${prefix}-${length}-line`, true);
    } else if (length > 3) {
      setClass(element, `${prefix}-multi-line`, true);
    }
  });
}
/** Adds or removes a class from an element. */
function setClass(element, className, isAdd) {
  element.nativeElement.classList.toggle(className, isAdd);
}
let MatLineModule = /*#__PURE__*/(() => {
  var _class10;
  class MatLineModule {}
  _class10 = MatLineModule;
  _class10.ɵfac = function _class10_Factory(t) {
    return new (t || _class10)();
  };
  _class10.ɵmod = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
    type: _class10
  });
  _class10.ɵinj = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
    imports: [MatCommonModule, MatCommonModule]
  });
  return MatLineModule;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();

/**
 * Reference to a previously launched ripple element.
 */
class RippleRef {
  constructor(_renderer, /** Reference to the ripple HTML element. */
  element, /** Ripple configuration used for the ripple. */
  config, /* Whether animations are forcibly disabled for ripples through CSS. */
  _animationForciblyDisabledThroughCss = false) {
    this._renderer = _renderer;
    this.element = element;
    this.config = config;
    this._animationForciblyDisabledThroughCss = _animationForciblyDisabledThroughCss;
    /** Current state of the ripple. */
    this.state = 3 /* RippleState.HIDDEN */;
  }
  /** Fades out the ripple element. */
  fadeOut() {
    this._renderer.fadeOutRipple(this);
  }
}

/** Options used to bind a passive capturing event. */
const passiveCapturingEventOptions$1 = /*#__PURE__*/(0,_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_1__.normalizePassiveListenerOptions)({
  passive: true,
  capture: true
});
/** Manages events through delegation so that as few event handlers as possible are bound. */
class RippleEventManager {
  constructor() {
    this._events = new Map();
    /** Event handler that is bound and which dispatches the events to the different targets. */
    this._delegateEventHandler = event => {
      const target = (0,_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_1__._getEventTarget)(event);
      if (target) {
        this._events.get(event.type)?.forEach((handlers, element) => {
          if (element === target || element.contains(target)) {
            handlers.forEach(handler => handler.handleEvent(event));
          }
        });
      }
    };
  }
  /** Adds an event handler. */
  addHandler(ngZone, name, element, handler) {
    const handlersForEvent = this._events.get(name);
    if (handlersForEvent) {
      const handlersForElement = handlersForEvent.get(element);
      if (handlersForElement) {
        handlersForElement.add(handler);
      } else {
        handlersForEvent.set(element, new Set([handler]));
      }
    } else {
      this._events.set(name, new Map([[element, new Set([handler])]]));
      ngZone.runOutsideAngular(() => {
        document.addEventListener(name, this._delegateEventHandler, passiveCapturingEventOptions$1);
      });
    }
  }
  /** Removes an event handler. */
  removeHandler(name, element, handler) {
    const handlersForEvent = this._events.get(name);
    if (!handlersForEvent) {
      return;
    }
    const handlersForElement = handlersForEvent.get(element);
    if (!handlersForElement) {
      return;
    }
    handlersForElement.delete(handler);
    if (handlersForElement.size === 0) {
      handlersForEvent.delete(element);
    }
    if (handlersForEvent.size === 0) {
      this._events.delete(name);
      document.removeEventListener(name, this._delegateEventHandler, passiveCapturingEventOptions$1);
    }
  }
}

/**
 * Default ripple animation configuration for ripples without an explicit
 * animation config specified.
 */
const defaultRippleAnimationConfig = {
  enterDuration: 225,
  exitDuration: 150
};
/**
 * Timeout for ignoring mouse events. Mouse events will be temporary ignored after touch
 * events to avoid synthetic mouse events.
 */
const ignoreMouseEventsTimeout = 800;
/** Options used to bind a passive capturing event. */
const passiveCapturingEventOptions = /*#__PURE__*/(0,_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_1__.normalizePassiveListenerOptions)({
  passive: true,
  capture: true
});
/** Events that signal that the pointer is down. */
const pointerDownEvents = ['mousedown', 'touchstart'];
/** Events that signal that the pointer is up. */
const pointerUpEvents = ['mouseup', 'mouseleave', 'touchend', 'touchcancel'];
/**
 * Helper service that performs DOM manipulations. Not intended to be used outside this module.
 * The constructor takes a reference to the ripple directive's host element and a map of DOM
 * event handlers to be installed on the element that triggers ripple animations.
 * This will eventually become a custom renderer once Angular support exists.
 * @docs-private
 */
class RippleRenderer {
  constructor(_target, _ngZone, elementOrElementRef, _platform) {
    this._target = _target;
    this._ngZone = _ngZone;
    this._platform = _platform;
    /** Whether the pointer is currently down or not. */
    this._isPointerDown = false;
    /**
     * Map of currently active ripple references.
     * The ripple reference is mapped to its element event listeners.
     * The reason why `| null` is used is that event listeners are added only
     * when the condition is truthy (see the `_startFadeOutTransition` method).
     */
    this._activeRipples = new Map();
    /** Whether pointer-up event listeners have been registered. */
    this._pointerUpEventsRegistered = false;
    // Only do anything if we're on the browser.
    if (_platform.isBrowser) {
      this._containerElement = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_6__.coerceElement)(elementOrElementRef);
    }
  }
  /**
   * Fades in a ripple at the given coordinates.
   * @param x Coordinate within the element, along the X axis at which to start the ripple.
   * @param y Coordinate within the element, along the Y axis at which to start the ripple.
   * @param config Extra ripple options.
   */
  fadeInRipple(x, y, config = {}) {
    const containerRect = this._containerRect = this._containerRect || this._containerElement.getBoundingClientRect();
    const animationConfig = {
      ...defaultRippleAnimationConfig,
      ...config.animation
    };
    if (config.centered) {
      x = containerRect.left + containerRect.width / 2;
      y = containerRect.top + containerRect.height / 2;
    }
    const radius = config.radius || distanceToFurthestCorner(x, y, containerRect);
    const offsetX = x - containerRect.left;
    const offsetY = y - containerRect.top;
    const enterDuration = animationConfig.enterDuration;
    const ripple = document.createElement('div');
    ripple.classList.add('mat-ripple-element');
    ripple.style.left = `${offsetX - radius}px`;
    ripple.style.top = `${offsetY - radius}px`;
    ripple.style.height = `${radius * 2}px`;
    ripple.style.width = `${radius * 2}px`;
    // If a custom color has been specified, set it as inline style. If no color is
    // set, the default color will be applied through the ripple theme styles.
    if (config.color != null) {
      ripple.style.backgroundColor = config.color;
    }
    ripple.style.transitionDuration = `${enterDuration}ms`;
    this._containerElement.appendChild(ripple);
    // By default the browser does not recalculate the styles of dynamically created
    // ripple elements. This is critical to ensure that the `scale` animates properly.
    // We enforce a style recalculation by calling `getComputedStyle` and *accessing* a property.
    // See: https://gist.github.com/paulirish/5d52fb081b3570c81e3a
    const computedStyles = window.getComputedStyle(ripple);
    const userTransitionProperty = computedStyles.transitionProperty;
    const userTransitionDuration = computedStyles.transitionDuration;
    // Note: We detect whether animation is forcibly disabled through CSS (e.g. through
    // `transition: none` or `display: none`). This is technically unexpected since animations are
    // controlled through the animation config, but this exists for backwards compatibility. This
    // logic does not need to be super accurate since it covers some edge cases which can be easily
    // avoided by users.
    const animationForciblyDisabledThroughCss = userTransitionProperty === 'none' ||
    // Note: The canonical unit for serialized CSS `<time>` properties is seconds. Additionally
    // some browsers expand the duration for every property (in our case `opacity` and `transform`).
    userTransitionDuration === '0s' || userTransitionDuration === '0s, 0s' ||
    // If the container is 0x0, it's likely `display: none`.
    containerRect.width === 0 && containerRect.height === 0;
    // Exposed reference to the ripple that will be returned.
    const rippleRef = new RippleRef(this, ripple, config, animationForciblyDisabledThroughCss);
    // Start the enter animation by setting the transform/scale to 100%. The animation will
    // execute as part of this statement because we forced a style recalculation before.
    // Note: We use a 3d transform here in order to avoid an issue in Safari where
    // the ripples aren't clipped when inside the shadow DOM (see #24028).
    ripple.style.transform = 'scale3d(1, 1, 1)';
    rippleRef.state = 0 /* RippleState.FADING_IN */;
    if (!config.persistent) {
      this._mostRecentTransientRipple = rippleRef;
    }
    let eventListeners = null;
    // Do not register the `transition` event listener if fade-in and fade-out duration
    // are set to zero. The events won't fire anyway and we can save resources here.
    if (!animationForciblyDisabledThroughCss && (enterDuration || animationConfig.exitDuration)) {
      this._ngZone.runOutsideAngular(() => {
        const onTransitionEnd = () => this._finishRippleTransition(rippleRef);
        const onTransitionCancel = () => this._destroyRipple(rippleRef);
        ripple.addEventListener('transitionend', onTransitionEnd);
        // If the transition is cancelled (e.g. due to DOM removal), we destroy the ripple
        // directly as otherwise we would keep it part of the ripple container forever.
        // https://www.w3.org/TR/css-transitions-1/#:~:text=no%20longer%20in%20the%20document.
        ripple.addEventListener('transitioncancel', onTransitionCancel);
        eventListeners = {
          onTransitionEnd,
          onTransitionCancel
        };
      });
    }
    // Add the ripple reference to the list of all active ripples.
    this._activeRipples.set(rippleRef, eventListeners);
    // In case there is no fade-in transition duration, we need to manually call the transition
    // end listener because `transitionend` doesn't fire if there is no transition.
    if (animationForciblyDisabledThroughCss || !enterDuration) {
      this._finishRippleTransition(rippleRef);
    }
    return rippleRef;
  }
  /** Fades out a ripple reference. */
  fadeOutRipple(rippleRef) {
    // For ripples already fading out or hidden, this should be a noop.
    if (rippleRef.state === 2 /* RippleState.FADING_OUT */ || rippleRef.state === 3 /* RippleState.HIDDEN */) {
      return;
    }
    const rippleEl = rippleRef.element;
    const animationConfig = {
      ...defaultRippleAnimationConfig,
      ...rippleRef.config.animation
    };
    // This starts the fade-out transition and will fire the transition end listener that
    // removes the ripple element from the DOM.
    rippleEl.style.transitionDuration = `${animationConfig.exitDuration}ms`;
    rippleEl.style.opacity = '0';
    rippleRef.state = 2 /* RippleState.FADING_OUT */;
    // In case there is no fade-out transition duration, we need to manually call the
    // transition end listener because `transitionend` doesn't fire if there is no transition.
    if (rippleRef._animationForciblyDisabledThroughCss || !animationConfig.exitDuration) {
      this._finishRippleTransition(rippleRef);
    }
  }
  /** Fades out all currently active ripples. */
  fadeOutAll() {
    this._getActiveRipples().forEach(ripple => ripple.fadeOut());
  }
  /** Fades out all currently active non-persistent ripples. */
  fadeOutAllNonPersistent() {
    this._getActiveRipples().forEach(ripple => {
      if (!ripple.config.persistent) {
        ripple.fadeOut();
      }
    });
  }
  /** Sets up the trigger event listeners */
  setupTriggerEvents(elementOrElementRef) {
    const element = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_6__.coerceElement)(elementOrElementRef);
    if (!this._platform.isBrowser || !element || element === this._triggerElement) {
      return;
    }
    // Remove all previously registered event listeners from the trigger element.
    this._removeTriggerEvents();
    this._triggerElement = element;
    // Use event delegation for the trigger events since they're
    // set up during creation and are performance-sensitive.
    pointerDownEvents.forEach(type => {
      RippleRenderer._eventManager.addHandler(this._ngZone, type, element, this);
    });
  }
  /**
   * Handles all registered events.
   * @docs-private
   */
  handleEvent(event) {
    if (event.type === 'mousedown') {
      this._onMousedown(event);
    } else if (event.type === 'touchstart') {
      this._onTouchStart(event);
    } else {
      this._onPointerUp();
    }
    // If pointer-up events haven't been registered yet, do so now.
    // We do this on-demand in order to reduce the total number of event listeners
    // registered by the ripples, which speeds up the rendering time for large UIs.
    if (!this._pointerUpEventsRegistered) {
      // The events for hiding the ripple are bound directly on the trigger, because:
      // 1. Some of them occur frequently (e.g. `mouseleave`) and any advantage we get from
      // delegation will be diminished by having to look through all the data structures often.
      // 2. They aren't as performance-sensitive, because they're bound only after the user
      // has interacted with an element.
      this._ngZone.runOutsideAngular(() => {
        pointerUpEvents.forEach(type => {
          this._triggerElement.addEventListener(type, this, passiveCapturingEventOptions);
        });
      });
      this._pointerUpEventsRegistered = true;
    }
  }
  /** Method that will be called if the fade-in or fade-in transition completed. */
  _finishRippleTransition(rippleRef) {
    if (rippleRef.state === 0 /* RippleState.FADING_IN */) {
      this._startFadeOutTransition(rippleRef);
    } else if (rippleRef.state === 2 /* RippleState.FADING_OUT */) {
      this._destroyRipple(rippleRef);
    }
  }
  /**
   * Starts the fade-out transition of the given ripple if it's not persistent and the pointer
   * is not held down anymore.
   */
  _startFadeOutTransition(rippleRef) {
    const isMostRecentTransientRipple = rippleRef === this._mostRecentTransientRipple;
    const {
      persistent
    } = rippleRef.config;
    rippleRef.state = 1 /* RippleState.VISIBLE */;
    // When the timer runs out while the user has kept their pointer down, we want to
    // keep only the persistent ripples and the latest transient ripple. We do this,
    // because we don't want stacked transient ripples to appear after their enter
    // animation has finished.
    if (!persistent && (!isMostRecentTransientRipple || !this._isPointerDown)) {
      rippleRef.fadeOut();
    }
  }
  /** Destroys the given ripple by removing it from the DOM and updating its state. */
  _destroyRipple(rippleRef) {
    const eventListeners = this._activeRipples.get(rippleRef) ?? null;
    this._activeRipples.delete(rippleRef);
    // Clear out the cached bounding rect if we have no more ripples.
    if (!this._activeRipples.size) {
      this._containerRect = null;
    }
    // If the current ref is the most recent transient ripple, unset it
    // avoid memory leaks.
    if (rippleRef === this._mostRecentTransientRipple) {
      this._mostRecentTransientRipple = null;
    }
    rippleRef.state = 3 /* RippleState.HIDDEN */;
    if (eventListeners !== null) {
      rippleRef.element.removeEventListener('transitionend', eventListeners.onTransitionEnd);
      rippleRef.element.removeEventListener('transitioncancel', eventListeners.onTransitionCancel);
    }
    rippleRef.element.remove();
  }
  /** Function being called whenever the trigger is being pressed using mouse. */
  _onMousedown(event) {
    // Screen readers will fire fake mouse events for space/enter. Skip launching a
    // ripple in this case for consistency with the non-screen-reader experience.
    const isFakeMousedown = (0,_angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_2__.isFakeMousedownFromScreenReader)(event);
    const isSyntheticEvent = this._lastTouchStartEvent && Date.now() < this._lastTouchStartEvent + ignoreMouseEventsTimeout;
    if (!this._target.rippleDisabled && !isFakeMousedown && !isSyntheticEvent) {
      this._isPointerDown = true;
      this.fadeInRipple(event.clientX, event.clientY, this._target.rippleConfig);
    }
  }
  /** Function being called whenever the trigger is being pressed using touch. */
  _onTouchStart(event) {
    if (!this._target.rippleDisabled && !(0,_angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_2__.isFakeTouchstartFromScreenReader)(event)) {
      // Some browsers fire mouse events after a `touchstart` event. Those synthetic mouse
      // events will launch a second ripple if we don't ignore mouse events for a specific
      // time after a touchstart event.
      this._lastTouchStartEvent = Date.now();
      this._isPointerDown = true;
      // Use `changedTouches` so we skip any touches where the user put
      // their finger down, but used another finger to tap the element again.
      const touches = event.changedTouches;
      // According to the typings the touches should always be defined, but in some cases
      // the browser appears to not assign them in tests which leads to flakes.
      if (touches) {
        for (let i = 0; i < touches.length; i++) {
          this.fadeInRipple(touches[i].clientX, touches[i].clientY, this._target.rippleConfig);
        }
      }
    }
  }
  /** Function being called whenever the trigger is being released. */
  _onPointerUp() {
    if (!this._isPointerDown) {
      return;
    }
    this._isPointerDown = false;
    // Fade-out all ripples that are visible and not persistent.
    this._getActiveRipples().forEach(ripple => {
      // By default, only ripples that are completely visible will fade out on pointer release.
      // If the `terminateOnPointerUp` option is set, ripples that still fade in will also fade out.
      const isVisible = ripple.state === 1 /* RippleState.VISIBLE */ || ripple.config.terminateOnPointerUp && ripple.state === 0 /* RippleState.FADING_IN */;
      if (!ripple.config.persistent && isVisible) {
        ripple.fadeOut();
      }
    });
  }
  _getActiveRipples() {
    return Array.from(this._activeRipples.keys());
  }
  /** Removes previously registered event listeners from the trigger element. */
  _removeTriggerEvents() {
    const trigger = this._triggerElement;
    if (trigger) {
      pointerDownEvents.forEach(type => RippleRenderer._eventManager.removeHandler(type, trigger, this));
      if (this._pointerUpEventsRegistered) {
        pointerUpEvents.forEach(type => trigger.removeEventListener(type, this, passiveCapturingEventOptions));
      }
    }
  }
}
/**
 * Returns the distance from the point (x, y) to the furthest corner of a rectangle.
 */
_class11 = RippleRenderer;
_class11._eventManager = /*#__PURE__*/new RippleEventManager();
function distanceToFurthestCorner(x, y, rect) {
  const distX = Math.max(Math.abs(x - rect.left), Math.abs(x - rect.right));
  const distY = Math.max(Math.abs(y - rect.top), Math.abs(y - rect.bottom));
  return Math.sqrt(distX * distX + distY * distY);
}

/** Injection token that can be used to specify the global ripple options. */
const MAT_RIPPLE_GLOBAL_OPTIONS = /*#__PURE__*/new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken('mat-ripple-global-options');
let MatRipple = /*#__PURE__*/(() => {
  var _class12;
  class MatRipple {
    /**
     * Whether click events will not trigger the ripple. Ripples can be still launched manually
     * by using the `launch()` method.
     */
    get disabled() {
      return this._disabled;
    }
    set disabled(value) {
      if (value) {
        this.fadeOutAllNonPersistent();
      }
      this._disabled = value;
      this._setupTriggerEventsIfEnabled();
    }
    /**
     * The element that triggers the ripple when click events are received.
     * Defaults to the directive's host element.
     */
    get trigger() {
      return this._trigger || this._elementRef.nativeElement;
    }
    set trigger(trigger) {
      this._trigger = trigger;
      this._setupTriggerEventsIfEnabled();
    }
    constructor(_elementRef, ngZone, platform, globalOptions, _animationMode) {
      this._elementRef = _elementRef;
      this._animationMode = _animationMode;
      /**
       * If set, the radius in pixels of foreground ripples when fully expanded. If unset, the radius
       * will be the distance from the center of the ripple to the furthest corner of the host element's
       * bounding rectangle.
       */
      this.radius = 0;
      this._disabled = false;
      /** @docs-private Whether ripple directive is initialized and the input bindings are set. */
      this._isInitialized = false;
      this._globalOptions = globalOptions || {};
      this._rippleRenderer = new RippleRenderer(this, ngZone, _elementRef, platform);
    }
    ngOnInit() {
      this._isInitialized = true;
      this._setupTriggerEventsIfEnabled();
    }
    ngOnDestroy() {
      this._rippleRenderer._removeTriggerEvents();
    }
    /** Fades out all currently showing ripple elements. */
    fadeOutAll() {
      this._rippleRenderer.fadeOutAll();
    }
    /** Fades out all currently showing non-persistent ripple elements. */
    fadeOutAllNonPersistent() {
      this._rippleRenderer.fadeOutAllNonPersistent();
    }
    /**
     * Ripple configuration from the directive's input values.
     * @docs-private Implemented as part of RippleTarget
     */
    get rippleConfig() {
      return {
        centered: this.centered,
        radius: this.radius,
        color: this.color,
        animation: {
          ...this._globalOptions.animation,
          ...(this._animationMode === 'NoopAnimations' ? {
            enterDuration: 0,
            exitDuration: 0
          } : {}),
          ...this.animation
        },
        terminateOnPointerUp: this._globalOptions.terminateOnPointerUp
      };
    }
    /**
     * Whether ripples on pointer-down are disabled or not.
     * @docs-private Implemented as part of RippleTarget
     */
    get rippleDisabled() {
      return this.disabled || !!this._globalOptions.disabled;
    }
    /** Sets up the trigger event listeners if ripples are enabled. */
    _setupTriggerEventsIfEnabled() {
      if (!this.disabled && this._isInitialized) {
        this._rippleRenderer.setupTriggerEvents(this.trigger);
      }
    }
    /** Launches a manual ripple at the specified coordinated or just by the ripple config. */
    launch(configOrX, y = 0, config) {
      if (typeof configOrX === 'number') {
        return this._rippleRenderer.fadeInRipple(configOrX, y, {
          ...this.rippleConfig,
          ...config
        });
      } else {
        return this._rippleRenderer.fadeInRipple(0, 0, {
          ...this.rippleConfig,
          ...configOrX
        });
      }
    }
  }
  _class12 = MatRipple;
  _class12.ɵfac = function _class12_Factory(t) {
    return new (t || _class12)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.NgZone), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_1__.Platform), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](MAT_RIPPLE_GLOBAL_OPTIONS, 8), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ANIMATION_MODULE_TYPE, 8));
  };
  _class12.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
    type: _class12,
    selectors: [["", "mat-ripple", ""], ["", "matRipple", ""]],
    hostAttrs: [1, "mat-ripple"],
    hostVars: 2,
    hostBindings: function _class12_HostBindings(rf, ctx) {
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("mat-ripple-unbounded", ctx.unbounded);
      }
    },
    inputs: {
      color: ["matRippleColor", "color"],
      unbounded: ["matRippleUnbounded", "unbounded"],
      centered: ["matRippleCentered", "centered"],
      radius: ["matRippleRadius", "radius"],
      animation: ["matRippleAnimation", "animation"],
      disabled: ["matRippleDisabled", "disabled"],
      trigger: ["matRippleTrigger", "trigger"]
    },
    exportAs: ["matRipple"]
  });
  return MatRipple;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
let MatRippleModule = /*#__PURE__*/(() => {
  var _class13;
  class MatRippleModule {}
  _class13 = MatRippleModule;
  _class13.ɵfac = function _class13_Factory(t) {
    return new (t || _class13)();
  };
  _class13.ɵmod = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
    type: _class13
  });
  _class13.ɵinj = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
    imports: [MatCommonModule, MatCommonModule]
  });
  return MatRippleModule;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();

/**
 * Component that shows a simplified checkbox without including any kind of "real" checkbox.
 * Meant to be used when the checkbox is purely decorative and a large number of them will be
 * included, such as for the options in a multi-select. Uses no SVGs or complex animations.
 * Note that theming is meant to be handled by the parent element, e.g.
 * `mat-primary .mat-pseudo-checkbox`.
 *
 * Note that this component will be completely invisible to screen-reader users. This is *not*
 * interchangeable with `<mat-checkbox>` and should *not* be used if the user would directly
 * interact with the checkbox. The pseudo-checkbox should only be used as an implementation detail
 * of more complex components that appropriately handle selected / checked state.
 * @docs-private
 */
let MatPseudoCheckbox = /*#__PURE__*/(() => {
  var _class14;
  class MatPseudoCheckbox {
    constructor(_animationMode) {
      this._animationMode = _animationMode;
      /** Display state of the checkbox. */
      this.state = 'unchecked';
      /** Whether the checkbox is disabled. */
      this.disabled = false;
      /**
       * Appearance of the pseudo checkbox. Default appearance of 'full' renders a checkmark/mixedmark
       * indicator inside a square box. 'minimal' appearance only renders the checkmark/mixedmark.
       */
      this.appearance = 'full';
    }
  }
  _class14 = MatPseudoCheckbox;
  _class14.ɵfac = function _class14_Factory(t) {
    return new (t || _class14)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ANIMATION_MODULE_TYPE, 8));
  };
  _class14.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
    type: _class14,
    selectors: [["mat-pseudo-checkbox"]],
    hostAttrs: [1, "mat-pseudo-checkbox"],
    hostVars: 12,
    hostBindings: function _class14_HostBindings(rf, ctx) {
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("mat-pseudo-checkbox-indeterminate", ctx.state === "indeterminate")("mat-pseudo-checkbox-checked", ctx.state === "checked")("mat-pseudo-checkbox-disabled", ctx.disabled)("mat-pseudo-checkbox-minimal", ctx.appearance === "minimal")("mat-pseudo-checkbox-full", ctx.appearance === "full")("_mat-animation-noopable", ctx._animationMode === "NoopAnimations");
      }
    },
    inputs: {
      state: "state",
      disabled: "disabled",
      appearance: "appearance"
    },
    decls: 0,
    vars: 0,
    template: function _class14_Template(rf, ctx) {},
    styles: [".mat-pseudo-checkbox{border-radius:2px;cursor:pointer;display:inline-block;vertical-align:middle;box-sizing:border-box;position:relative;flex-shrink:0;transition:border-color 90ms cubic-bezier(0, 0, 0.2, 0.1),background-color 90ms cubic-bezier(0, 0, 0.2, 0.1)}.mat-pseudo-checkbox::after{position:absolute;opacity:0;content:\"\";border-bottom:2px solid currentColor;transition:opacity 90ms cubic-bezier(0, 0, 0.2, 0.1)}.mat-pseudo-checkbox._mat-animation-noopable{transition:none !important;animation:none !important}.mat-pseudo-checkbox._mat-animation-noopable::after{transition:none}.mat-pseudo-checkbox-disabled{cursor:default}.mat-pseudo-checkbox-indeterminate::after{left:1px;opacity:1;border-radius:2px}.mat-pseudo-checkbox-checked::after{left:1px;border-left:2px solid currentColor;transform:rotate(-45deg);opacity:1;box-sizing:content-box}.mat-pseudo-checkbox-full{border:2px solid}.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked,.mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate{border-color:rgba(0,0,0,0)}.mat-pseudo-checkbox{width:18px;height:18px}.mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-checked::after{width:14px;height:6px;transform-origin:center;top:-4.2426406871px;left:0;bottom:0;right:0;margin:auto}.mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-indeterminate::after{top:8px;width:16px}.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked::after{width:10px;height:4px;transform-origin:center;top:-2.8284271247px;left:0;bottom:0;right:0;margin:auto}.mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate::after{top:6px;width:12px}"],
    encapsulation: 2,
    changeDetection: 0
  });
  return MatPseudoCheckbox;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
let MatPseudoCheckboxModule = /*#__PURE__*/(() => {
  var _class15;
  class MatPseudoCheckboxModule {}
  _class15 = MatPseudoCheckboxModule;
  _class15.ɵfac = function _class15_Factory(t) {
    return new (t || _class15)();
  };
  _class15.ɵmod = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
    type: _class15
  });
  _class15.ɵinj = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
    imports: [MatCommonModule]
  });
  return MatPseudoCheckboxModule;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();

/**
 * Injection token used to provide the parent component to options.
 */
const MAT_OPTION_PARENT_COMPONENT = /*#__PURE__*/new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken('MAT_OPTION_PARENT_COMPONENT');

// Notes on the accessibility pattern used for `mat-optgroup`.
// The option group has two different "modes": regular and inert. The regular mode uses the
// recommended a11y pattern which has `role="group"` on the group element with `aria-labelledby`
// pointing to the label. This works for `mat-select`, but it seems to hit a bug for autocomplete
// under VoiceOver where the group doesn't get read out at all. The bug appears to be that if
// there's __any__ a11y-related attribute on the group (e.g. `role` or `aria-labelledby`),
// VoiceOver on Safari won't read it out.
// We've introduced the `inert` mode as a workaround. Under this mode, all a11y attributes are
// removed from the group, and we get the screen reader to read out the group label by mirroring it
// inside an invisible element in the option. This is sub-optimal, because the screen reader will
// repeat the group label on each navigation, whereas the default pattern only reads the group when
// the user enters a new group. The following alternate approaches were considered:
// 1. Reading out the group label using the `LiveAnnouncer` solves the problem, but we can't control
//    when the text will be read out so sometimes it comes in too late or never if the user
//    navigates quickly.
// 2. `<mat-option aria-describedby="groupLabel"` - This works on Safari, but VoiceOver in Chrome
//    won't read out the description at all.
// 3. `<mat-option aria-labelledby="optionLabel groupLabel"` - This works on Chrome, but Safari
//     doesn't read out the text at all. Furthermore, on
// Boilerplate for applying mixins to MatOptgroup.
/** @docs-private */
const _MatOptgroupMixinBase = /*#__PURE__*/mixinDisabled(class {});
// Counter for unique group ids.
let _uniqueOptgroupIdCounter = 0;
let _MatOptgroupBase = /*#__PURE__*/(() => {
  var _class16;
  class _MatOptgroupBase extends _MatOptgroupMixinBase {
    constructor(parent) {
      super();
      /** Unique id for the underlying label. */
      this._labelId = `mat-optgroup-label-${_uniqueOptgroupIdCounter++}`;
      this._inert = parent?.inertGroups ?? false;
    }
  }
  _class16 = _MatOptgroupBase;
  _class16.ɵfac = function _class16_Factory(t) {
    return new (t || _class16)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](MAT_OPTION_PARENT_COMPONENT, 8));
  };
  _class16.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
    type: _class16,
    inputs: {
      label: "label"
    },
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]]
  });
  return _MatOptgroupBase;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
/**
 * Injection token that can be used to reference instances of `MatOptgroup`. It serves as
 * alternative token to the actual `MatOptgroup` class which could cause unnecessary
 * retention of the class and its component metadata.
 */
const MAT_OPTGROUP = /*#__PURE__*/new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken('MatOptgroup');
/**
 * Component that is used to group instances of `mat-option`.
 */
let MatOptgroup = /*#__PURE__*/(() => {
  var _class17;
  class MatOptgroup extends _MatOptgroupBase {}
  _class17 = MatOptgroup;
  _class17.ɵfac = /* @__PURE__ */function () {
    let ɵ_class17_BaseFactory;
    return function _class17_Factory(t) {
      return (ɵ_class17_BaseFactory || (ɵ_class17_BaseFactory = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetInheritedFactory"](_class17)))(t || _class17);
    };
  }();
  _class17.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
    type: _class17,
    selectors: [["mat-optgroup"]],
    hostAttrs: [1, "mat-mdc-optgroup"],
    hostVars: 3,
    hostBindings: function _class17_HostBindings(rf, ctx) {
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattribute"]("role", ctx._inert ? null : "group")("aria-disabled", ctx._inert ? null : ctx.disabled.toString())("aria-labelledby", ctx._inert ? null : ctx._labelId);
      }
    },
    inputs: {
      disabled: "disabled"
    },
    exportAs: ["matOptgroup"],
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([{
      provide: MAT_OPTGROUP,
      useExisting: _class17
    }]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]],
    ngContentSelectors: _c1,
    decls: 5,
    vars: 4,
    consts: [["role", "presentation", 1, "mat-mdc-optgroup-label", 3, "id"], [1, "mdc-list-item__primary-text"]],
    template: function _class17_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojectionDef"](_c0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span", 0)(1, "span", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](4, 1);
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("mdc-list-item--disabled", ctx.disabled);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("id", ctx._labelId);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("", ctx.label, " ");
      }
    },
    styles: [".mat-mdc-optgroup{color:var(--mat-optgroup-label-text-color);font-family:var(--mat-optgroup-label-text-font);line-height:var(--mat-optgroup-label-text-line-height);font-size:var(--mat-optgroup-label-text-size);letter-spacing:var(--mat-optgroup-label-text-tracking);font-weight:var(--mat-optgroup-label-text-weight)}.mat-mdc-optgroup-label{display:flex;position:relative;align-items:center;justify-content:flex-start;overflow:hidden;padding:0;padding-left:16px;padding-right:16px;min-height:48px}.mat-mdc-optgroup-label:focus{outline:none}[dir=rtl] .mat-mdc-optgroup-label,.mat-mdc-optgroup-label[dir=rtl]{padding-left:16px;padding-right:16px}.mat-mdc-optgroup-label.mdc-list-item--disabled{opacity:.38}.mat-mdc-optgroup-label .mdc-list-item__primary-text{font-size:inherit;font-weight:inherit;letter-spacing:inherit;line-height:inherit;font-family:inherit;text-decoration:inherit;text-transform:inherit;white-space:normal}"],
    encapsulation: 2,
    changeDetection: 0
  });
  return MatOptgroup;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();

/**
 * Option IDs need to be unique across components, so this counter exists outside of
 * the component definition.
 */
let _uniqueIdCounter = 0;
/** Event object emitted by MatOption when selected or deselected. */
class MatOptionSelectionChange {
  constructor( /** Reference to the option that emitted the event. */
  source, /** Whether the change in the option's value was a result of a user action. */
  isUserInput = false) {
    this.source = source;
    this.isUserInput = isUserInput;
  }
}
let _MatOptionBase = /*#__PURE__*/(() => {
  var _class18;
  class _MatOptionBase {
    /** Whether the wrapping component is in multiple selection mode. */
    get multiple() {
      return this._parent && this._parent.multiple;
    }
    /** Whether or not the option is currently selected. */
    get selected() {
      return this._selected;
    }
    /** Whether the option is disabled. */
    get disabled() {
      return this.group && this.group.disabled || this._disabled;
    }
    set disabled(value) {
      this._disabled = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_6__.coerceBooleanProperty)(value);
    }
    /** Whether ripples for the option are disabled. */
    get disableRipple() {
      return !!(this._parent && this._parent.disableRipple);
    }
    /** Whether to display checkmark for single-selection. */
    get hideSingleSelectionIndicator() {
      return !!(this._parent && this._parent.hideSingleSelectionIndicator);
    }
    constructor(_element, _changeDetectorRef, _parent, group) {
      this._element = _element;
      this._changeDetectorRef = _changeDetectorRef;
      this._parent = _parent;
      this.group = group;
      this._selected = false;
      this._active = false;
      this._disabled = false;
      this._mostRecentViewValue = '';
      /** The unique ID of the option. */
      this.id = `mat-option-${_uniqueIdCounter++}`;
      /** Event emitted when the option is selected or deselected. */
      // tslint:disable-next-line:no-output-on-prefix
      this.onSelectionChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
      /** Emits when the state of the option changes and any parents have to be notified. */
      this._stateChanges = new rxjs__WEBPACK_IMPORTED_MODULE_7__.Subject();
    }
    /**
     * Whether or not the option is currently active and ready to be selected.
     * An active option displays styles as if it is focused, but the
     * focus is actually retained somewhere else. This comes in handy
     * for components like autocomplete where focus must remain on the input.
     */
    get active() {
      return this._active;
    }
    /**
     * The displayed value of the option. It is necessary to show the selected option in the
     * select's trigger.
     */
    get viewValue() {
      // TODO(kara): Add input property alternative for node envs.
      return (this._text?.nativeElement.textContent || '').trim();
    }
    /** Selects the option. */
    select(emitEvent = true) {
      if (!this._selected) {
        this._selected = true;
        this._changeDetectorRef.markForCheck();
        if (emitEvent) {
          this._emitSelectionChangeEvent();
        }
      }
    }
    /** Deselects the option. */
    deselect(emitEvent = true) {
      if (this._selected) {
        this._selected = false;
        this._changeDetectorRef.markForCheck();
        if (emitEvent) {
          this._emitSelectionChangeEvent();
        }
      }
    }
    /** Sets focus onto this option. */
    focus(_origin, options) {
      // Note that we aren't using `_origin`, but we need to keep it because some internal consumers
      // use `MatOption` in a `FocusKeyManager` and we need it to match `FocusableOption`.
      const element = this._getHostElement();
      if (typeof element.focus === 'function') {
        element.focus(options);
      }
    }
    /**
     * This method sets display styles on the option to make it appear
     * active. This is used by the ActiveDescendantKeyManager so key
     * events will display the proper options as active on arrow key events.
     */
    setActiveStyles() {
      if (!this._active) {
        this._active = true;
        this._changeDetectorRef.markForCheck();
      }
    }
    /**
     * This method removes display styles on the option that made it appear
     * active. This is used by the ActiveDescendantKeyManager so key
     * events will display the proper options as active on arrow key events.
     */
    setInactiveStyles() {
      if (this._active) {
        this._active = false;
        this._changeDetectorRef.markForCheck();
      }
    }
    /** Gets the label to be used when determining whether the option should be focused. */
    getLabel() {
      return this.viewValue;
    }
    /** Ensures the option is selected when activated from the keyboard. */
    _handleKeydown(event) {
      if ((event.keyCode === _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_9__.ENTER || event.keyCode === _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_9__.SPACE) && !(0,_angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_9__.hasModifierKey)(event)) {
        this._selectViaInteraction();
        // Prevent the page from scrolling down and form submits.
        event.preventDefault();
      }
    }
    /**
     * `Selects the option while indicating the selection came from the user. Used to
     * determine if the select's view -> model callback should be invoked.`
     */
    _selectViaInteraction() {
      if (!this.disabled) {
        this._selected = this.multiple ? !this._selected : true;
        this._changeDetectorRef.markForCheck();
        this._emitSelectionChangeEvent(true);
      }
    }
    /** Returns the correct tabindex for the option depending on disabled state. */
    // This method is only used by `MatLegacyOption`. Keeping it here to avoid breaking the types.
    // That's because `MatLegacyOption` use `MatOption` type in a few places such as
    // `MatOptionSelectionChange`. It is safe to delete this when `MatLegacyOption` is deleted.
    _getTabIndex() {
      return this.disabled ? '-1' : '0';
    }
    /** Gets the host DOM element. */
    _getHostElement() {
      return this._element.nativeElement;
    }
    ngAfterViewChecked() {
      // Since parent components could be using the option's label to display the selected values
      // (e.g. `mat-select`) and they don't have a way of knowing if the option's label has changed
      // we have to check for changes in the DOM ourselves and dispatch an event. These checks are
      // relatively cheap, however we still limit them only to selected options in order to avoid
      // hitting the DOM too often.
      if (this._selected) {
        const viewValue = this.viewValue;
        if (viewValue !== this._mostRecentViewValue) {
          if (this._mostRecentViewValue) {
            this._stateChanges.next();
          }
          this._mostRecentViewValue = viewValue;
        }
      }
    }
    ngOnDestroy() {
      this._stateChanges.complete();
    }
    /** Emits the selection change event. */
    _emitSelectionChangeEvent(isUserInput = false) {
      this.onSelectionChange.emit(new MatOptionSelectionChange(this, isUserInput));
    }
  }
  _class18 = _MatOptionBase;
  _class18.ɵfac = function _class18_Factory(t) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinvalidFactory"]();
  };
  _class18.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
    type: _class18,
    viewQuery: function _class18_Query(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c2, 7);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx._text = _t.first);
      }
    },
    inputs: {
      value: "value",
      id: "id",
      disabled: "disabled"
    },
    outputs: {
      onSelectionChange: "onSelectionChange"
    }
  });
  return _MatOptionBase;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
/**
 * Single option inside of a `<mat-select>` element.
 */
let MatOption = /*#__PURE__*/(() => {
  var _class19;
  class MatOption extends _MatOptionBase {
    constructor(element, changeDetectorRef, parent, group) {
      super(element, changeDetectorRef, parent, group);
    }
  }
  _class19 = MatOption;
  _class19.ɵfac = function _class19_Factory(t) {
    return new (t || _class19)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](MAT_OPTION_PARENT_COMPONENT, 8), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](MAT_OPTGROUP, 8));
  };
  _class19.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
    type: _class19,
    selectors: [["mat-option"]],
    hostAttrs: ["role", "option", 1, "mat-mdc-option", "mdc-list-item"],
    hostVars: 11,
    hostBindings: function _class19_HostBindings(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function _class19_click_HostBindingHandler() {
          return ctx._selectViaInteraction();
        })("keydown", function _class19_keydown_HostBindingHandler($event) {
          return ctx._handleKeydown($event);
        });
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵhostProperty"]("id", ctx.id);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattribute"]("aria-selected", ctx.selected)("aria-disabled", ctx.disabled.toString());
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("mdc-list-item--selected", ctx.selected)("mat-mdc-option-multiple", ctx.multiple)("mat-mdc-option-active", ctx.active)("mdc-list-item--disabled", ctx.disabled);
      }
    },
    exportAs: ["matOption"],
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]],
    ngContentSelectors: _c4,
    decls: 8,
    vars: 5,
    consts: [["class", "mat-mdc-option-pseudo-checkbox", "aria-hidden", "true", 3, "disabled", "state", 4, "ngIf"], [1, "mdc-list-item__primary-text"], ["text", ""], ["class", "mat-mdc-option-pseudo-checkbox", "state", "checked", "aria-hidden", "true", "appearance", "minimal", 3, "disabled", 4, "ngIf"], ["class", "cdk-visually-hidden", 4, "ngIf"], ["aria-hidden", "true", "mat-ripple", "", 1, "mat-mdc-option-ripple", "mat-mdc-focus-indicator", 3, "matRippleTrigger", "matRippleDisabled"], ["aria-hidden", "true", 1, "mat-mdc-option-pseudo-checkbox", 3, "disabled", "state"], ["state", "checked", "aria-hidden", "true", "appearance", "minimal", 1, "mat-mdc-option-pseudo-checkbox", 3, "disabled"], [1, "cdk-visually-hidden"]],
    template: function _class19_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojectionDef"](_c3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, _class19_mat_pseudo_checkbox_0_Template, 1, 2, "mat-pseudo-checkbox", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "span", 1, 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](4, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, _class19_mat_pseudo_checkbox_5_Template, 1, 1, "mat-pseudo-checkbox", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](6, _class19_span_6_Template, 2, 1, "span", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](7, "div", 5);
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.multiple);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx.multiple && ctx.selected && !ctx.hideSingleSelectionIndicator);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.group && ctx.group._inert);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("matRippleTrigger", ctx._getHostElement())("matRippleDisabled", ctx.disabled || ctx.disableRipple);
      }
    },
    dependencies: [MatRipple, _angular_common__WEBPACK_IMPORTED_MODULE_3__.NgIf, MatPseudoCheckbox],
    styles: [".mat-mdc-option{display:flex;position:relative;align-items:center;justify-content:flex-start;overflow:hidden;padding:0;padding-left:16px;padding-right:16px;-webkit-user-select:none;user-select:none;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;cursor:pointer;-webkit-tap-highlight-color:rgba(0,0,0,0);color:var(--mat-option-label-text-color);font-family:var(--mat-option-label-text-font);line-height:var(--mat-option-label-text-line-height);font-size:var(--mat-option-label-text-size);letter-spacing:var(--mat-option-label-text-tracking);font-weight:var(--mat-option-label-text-weight);min-height:48px}.mat-mdc-option:focus{outline:none}[dir=rtl] .mat-mdc-option,.mat-mdc-option[dir=rtl]{padding-left:16px;padding-right:16px}.mat-mdc-option:hover:not(.mdc-list-item--disabled){background-color:var(--mat-option-hover-state-layer-color)}.mat-mdc-option:focus.mdc-list-item,.mat-mdc-option.mat-mdc-option-active.mdc-list-item{background-color:var(--mat-option-focus-state-layer-color)}.mat-mdc-option.mdc-list-item--selected:not(.mdc-list-item--disabled) .mdc-list-item__primary-text{color:var(--mat-option-selected-state-label-text-color)}.mat-mdc-option.mdc-list-item--selected:not(.mdc-list-item--disabled):not(.mat-mdc-option-multiple){background-color:var(--mat-option-selected-state-layer-color)}.mat-mdc-option.mdc-list-item{align-items:center}.mat-mdc-option.mdc-list-item--disabled{cursor:default;pointer-events:none}.mat-mdc-option.mdc-list-item--disabled .mat-mdc-option-pseudo-checkbox,.mat-mdc-option.mdc-list-item--disabled .mdc-list-item__primary-text,.mat-mdc-option.mdc-list-item--disabled>mat-icon{opacity:.38}.mat-mdc-optgroup .mat-mdc-option:not(.mat-mdc-option-multiple){padding-left:32px}[dir=rtl] .mat-mdc-optgroup .mat-mdc-option:not(.mat-mdc-option-multiple){padding-left:16px;padding-right:32px}.mat-mdc-option .mat-icon,.mat-mdc-option .mat-pseudo-checkbox-full{margin-right:16px;flex-shrink:0}[dir=rtl] .mat-mdc-option .mat-icon,[dir=rtl] .mat-mdc-option .mat-pseudo-checkbox-full{margin-right:0;margin-left:16px}.mat-mdc-option .mat-pseudo-checkbox-minimal{margin-left:16px;flex-shrink:0}[dir=rtl] .mat-mdc-option .mat-pseudo-checkbox-minimal{margin-right:16px;margin-left:0}.mat-mdc-option .mat-mdc-option-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none}.mat-mdc-option .mdc-list-item__primary-text{white-space:normal;font-size:inherit;font-weight:inherit;letter-spacing:inherit;line-height:inherit;font-family:inherit;text-decoration:inherit;text-transform:inherit;margin-right:auto}[dir=rtl] .mat-mdc-option .mdc-list-item__primary-text{margin-right:0;margin-left:auto}.cdk-high-contrast-active .mat-mdc-option.mdc-list-item--selected:not(.mat-mdc-option-multiple)::after{content:\"\";position:absolute;top:50%;right:16px;transform:translateY(-50%);width:10px;height:0;border-bottom:solid 10px;border-radius:10px}[dir=rtl] .cdk-high-contrast-active .mat-mdc-option.mdc-list-item--selected:not(.mat-mdc-option-multiple)::after{right:auto;left:16px}.mat-mdc-option-active .mat-mdc-focus-indicator::before{content:\"\"}"],
    encapsulation: 2,
    changeDetection: 0
  });
  return MatOption;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
/**
 * Counts the amount of option group labels that precede the specified option.
 * @param optionIndex Index of the option at which to start counting.
 * @param options Flat list of all of the options.
 * @param optionGroups Flat list of all of the option groups.
 * @docs-private
 */
function _countGroupLabelsBeforeOption(optionIndex, options, optionGroups) {
  if (optionGroups.length) {
    let optionsArray = options.toArray();
    let groups = optionGroups.toArray();
    let groupCounter = 0;
    for (let i = 0; i < optionIndex + 1; i++) {
      if (optionsArray[i].group && optionsArray[i].group === groups[groupCounter]) {
        groupCounter++;
      }
    }
    return groupCounter;
  }
  return 0;
}
/**
 * Determines the position to which to scroll a panel in order for an option to be into view.
 * @param optionOffset Offset of the option from the top of the panel.
 * @param optionHeight Height of the options.
 * @param currentScrollPosition Current scroll position of the panel.
 * @param panelHeight Height of the panel.
 * @docs-private
 */
function _getOptionScrollPosition(optionOffset, optionHeight, currentScrollPosition, panelHeight) {
  if (optionOffset < currentScrollPosition) {
    return optionOffset;
  }
  if (optionOffset + optionHeight > currentScrollPosition + panelHeight) {
    return Math.max(0, optionOffset - panelHeight + optionHeight);
  }
  return currentScrollPosition;
}
let MatOptionModule = /*#__PURE__*/(() => {
  var _class20;
  class MatOptionModule {}
  _class20 = MatOptionModule;
  _class20.ɵfac = function _class20_Factory(t) {
    return new (t || _class20)();
  };
  _class20.ɵmod = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
    type: _class20
  });
  _class20.ɵinj = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
    imports: [MatRippleModule, _angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, MatCommonModule, MatPseudoCheckboxModule]
  });
  return MatOptionModule;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();

/** The options for the MatRippleLoader's event listeners. */
const eventListenerOptions = {
  capture: true
};
/** The events that should trigger the initialization of the ripple. */
const rippleInteractionEvents = ['focus', 'click', 'mouseenter', 'touchstart'];
/** The attribute attached to a component whose ripple has not yet been initialized. */
const matRippleUninitialized = 'mat-ripple-loader-uninitialized';
/** Additional classes that should be added to the ripple when it is rendered. */
const matRippleClassName = 'mat-ripple-loader-class-name';
/** Whether the ripple should be centered. */
const matRippleCentered = 'mat-ripple-loader-centered';
/** Whether the ripple should be disabled. */
const matRippleDisabled = 'mat-ripple-loader-disabled';
/**
 * Handles attaching ripples on demand.
 *
 * This service allows us to avoid eagerly creating & attaching MatRipples.
 * It works by creating & attaching a ripple only when a component is first interacted with.
 */
let MatRippleLoader = /*#__PURE__*/(() => {
  var _class21;
  class MatRippleLoader {
    constructor() {
      this._document = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_angular_common__WEBPACK_IMPORTED_MODULE_3__.DOCUMENT, {
        optional: true
      });
      this._animationMode = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_angular_core__WEBPACK_IMPORTED_MODULE_0__.ANIMATION_MODULE_TYPE, {
        optional: true
      });
      this._globalRippleOptions = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(MAT_RIPPLE_GLOBAL_OPTIONS, {
        optional: true
      });
      this._platform = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_1__.Platform);
      this._ngZone = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_angular_core__WEBPACK_IMPORTED_MODULE_0__.NgZone);
      /** Handles creating and attaching component internals when a component it is initially interacted with. */
      this._onInteraction = event => {
        if (!(event.target instanceof HTMLElement)) {
          return;
        }
        const eventTarget = event.target;
        // TODO(wagnermaciel): Consider batching these events to improve runtime performance.
        const element = eventTarget.closest(`[${matRippleUninitialized}]`);
        if (element) {
          this.createRipple(element);
        }
      };
      this._ngZone.runOutsideAngular(() => {
        for (const event of rippleInteractionEvents) {
          this._document?.addEventListener(event, this._onInteraction, eventListenerOptions);
        }
      });
    }
    ngOnDestroy() {
      for (const event of rippleInteractionEvents) {
        this._document?.removeEventListener(event, this._onInteraction, eventListenerOptions);
      }
    }
    /**
     * Configures the ripple that will be rendered by the ripple loader.
     *
     * Stores the given information about how the ripple should be configured on the host
     * element so that it can later be retrived & used when the ripple is actually created.
     */
    configureRipple(host, config) {
      // Indicates that the ripple has not yet been rendered for this component.
      host.setAttribute(matRippleUninitialized, '');
      // Store the additional class name(s) that should be added to the ripple element.
      if (config.className || !host.hasAttribute(matRippleClassName)) {
        host.setAttribute(matRippleClassName, config.className || '');
      }
      // Store whether the ripple should be centered.
      if (config.centered) {
        host.setAttribute(matRippleCentered, '');
      }
      if (config.disabled) {
        host.setAttribute(matRippleDisabled, '');
      }
    }
    /** Returns the ripple instance for the given host element. */
    getRipple(host) {
      if (host.matRipple) {
        return host.matRipple;
      }
      return this.createRipple(host);
    }
    /** Sets the disabled state on the ripple instance corresponding to the given host element. */
    setDisabled(host, disabled) {
      const ripple = host.matRipple;
      // If the ripple has already been instantiated, just disable it.
      if (ripple) {
        ripple.disabled = disabled;
        return;
      }
      // Otherwise, set an attribute so we know what the
      // disabled state should be when the ripple is initialized.
      if (disabled) {
        host.setAttribute(matRippleDisabled, '');
      } else {
        host.removeAttribute(matRippleDisabled);
      }
    }
    /** Creates a MatRipple and appends it to the given element. */
    createRipple(host) {
      if (!this._document) {
        return;
      }
      // Create the ripple element.
      host.querySelector('.mat-ripple')?.remove();
      const rippleEl = this._document.createElement('span');
      rippleEl.classList.add('mat-ripple', host.getAttribute(matRippleClassName));
      host.append(rippleEl);
      // Create the MatRipple.
      const ripple = new MatRipple(new _angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef(rippleEl), this._ngZone, this._platform, this._globalRippleOptions ? this._globalRippleOptions : undefined, this._animationMode ? this._animationMode : undefined);
      ripple._isInitialized = true;
      ripple.trigger = host;
      ripple.centered = host.hasAttribute(matRippleCentered);
      ripple.disabled = host.hasAttribute(matRippleDisabled);
      this.attachRipple(host, ripple);
      return ripple;
    }
    attachRipple(host, ripple) {
      host.removeAttribute(matRippleUninitialized);
      host.matRipple = ripple;
    }
  }
  _class21 = MatRippleLoader;
  _class21.ɵfac = function _class21_Factory(t) {
    return new (t || _class21)();
  };
  _class21.ɵprov = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
    token: _class21,
    factory: _class21.ɵfac,
    providedIn: 'root'
  });
  return MatRippleLoader;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();

/**
 * Generated bundle index. Do not edit.
 */



/***/ }),

/***/ 59049:
/*!**********************************************************!*\
  !*** ./node_modules/@angular/material/fesm2022/icon.mjs ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ICON_REGISTRY_PROVIDER: () => (/* binding */ ICON_REGISTRY_PROVIDER),
/* harmony export */   ICON_REGISTRY_PROVIDER_FACTORY: () => (/* binding */ ICON_REGISTRY_PROVIDER_FACTORY),
/* harmony export */   MAT_ICON_DEFAULT_OPTIONS: () => (/* binding */ MAT_ICON_DEFAULT_OPTIONS),
/* harmony export */   MAT_ICON_LOCATION: () => (/* binding */ MAT_ICON_LOCATION),
/* harmony export */   MAT_ICON_LOCATION_FACTORY: () => (/* binding */ MAT_ICON_LOCATION_FACTORY),
/* harmony export */   MatIcon: () => (/* binding */ MatIcon),
/* harmony export */   MatIconModule: () => (/* binding */ MatIconModule),
/* harmony export */   MatIconRegistry: () => (/* binding */ MatIconRegistry),
/* harmony export */   getMatIconFailedToSanitizeLiteralError: () => (/* binding */ getMatIconFailedToSanitizeLiteralError),
/* harmony export */   getMatIconFailedToSanitizeUrlError: () => (/* binding */ getMatIconFailedToSanitizeUrlError),
/* harmony export */   getMatIconNameNotFoundError: () => (/* binding */ getMatIconNameNotFoundError),
/* harmony export */   getMatIconNoHttpProviderError: () => (/* binding */ getMatIconNoHttpProviderError)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 59936);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/core */ 56381);
/* harmony import */ var _angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/cdk/coercion */ 45029);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 34228);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 85028);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 33410);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ 56448);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/platform-browser */ 41081);












/**
 * The Trusted Types policy, or null if Trusted Types are not
 * enabled/supported, or undefined if the policy has not been created yet.
 */
const _c0 = ["*"];
let policy;
/**
 * Returns the Trusted Types policy, or null if Trusted Types are not
 * enabled/supported. The first call to this function will create the policy.
 */
function getPolicy() {
  if (policy === undefined) {
    policy = null;
    if (typeof window !== 'undefined') {
      const ttWindow = window;
      if (ttWindow.trustedTypes !== undefined) {
        policy = ttWindow.trustedTypes.createPolicy('angular#components', {
          createHTML: s => s
        });
      }
    }
  }
  return policy;
}
/**
 * Unsafely promote a string to a TrustedHTML, falling back to strings when
 * Trusted Types are not available.
 * @security This is a security-sensitive function; any use of this function
 * must go through security review. In particular, it must be assured that the
 * provided string will never cause an XSS vulnerability if used in a context
 * that will be interpreted as HTML by a browser, e.g. when assigning to
 * element.innerHTML.
 */
function trustedHTMLFromString(html) {
  return getPolicy()?.createHTML(html) || html;
}

/**
 * Returns an exception to be thrown in the case when attempting to
 * load an icon with a name that cannot be found.
 * @docs-private
 */
function getMatIconNameNotFoundError(iconName) {
  return Error(`Unable to find icon with the name "${iconName}"`);
}
/**
 * Returns an exception to be thrown when the consumer attempts to use
 * `<mat-icon>` without including @angular/common/http.
 * @docs-private
 */
function getMatIconNoHttpProviderError() {
  return Error('Could not find HttpClient provider for use with Angular Material icons. ' + 'Please include the HttpClientModule from @angular/common/http in your ' + 'app imports.');
}
/**
 * Returns an exception to be thrown when a URL couldn't be sanitized.
 * @param url URL that was attempted to be sanitized.
 * @docs-private
 */
function getMatIconFailedToSanitizeUrlError(url) {
  return Error(`The URL provided to MatIconRegistry was not trusted as a resource URL ` + `via Angular's DomSanitizer. Attempted URL was "${url}".`);
}
/**
 * Returns an exception to be thrown when a HTML string couldn't be sanitized.
 * @param literal HTML that was attempted to be sanitized.
 * @docs-private
 */
function getMatIconFailedToSanitizeLiteralError(literal) {
  return Error(`The literal provided to MatIconRegistry was not trusted as safe HTML by ` + `Angular's DomSanitizer. Attempted literal was "${literal}".`);
}
/**
 * Configuration for an icon, including the URL and possibly the cached SVG element.
 * @docs-private
 */
class SvgIconConfig {
  constructor(url, svgText, options) {
    this.url = url;
    this.svgText = svgText;
    this.options = options;
  }
}
/**
 * Service to register and display icons used by the `<mat-icon>` component.
 * - Registers icon URLs by namespace and name.
 * - Registers icon set URLs by namespace.
 * - Registers aliases for CSS classes, for use with icon fonts.
 * - Loads icons from URLs and extracts individual icons from icon sets.
 */
let MatIconRegistry = /*#__PURE__*/(() => {
  var _class;
  class MatIconRegistry {
    constructor(_httpClient, _sanitizer, document, _errorHandler) {
      this._httpClient = _httpClient;
      this._sanitizer = _sanitizer;
      this._errorHandler = _errorHandler;
      /**
       * URLs and cached SVG elements for individual icons. Keys are of the format "[namespace]:[icon]".
       */
      this._svgIconConfigs = new Map();
      /**
       * SvgIconConfig objects and cached SVG elements for icon sets, keyed by namespace.
       * Multiple icon sets can be registered under the same namespace.
       */
      this._iconSetConfigs = new Map();
      /** Cache for icons loaded by direct URLs. */
      this._cachedIconsByUrl = new Map();
      /** In-progress icon fetches. Used to coalesce multiple requests to the same URL. */
      this._inProgressUrlFetches = new Map();
      /** Map from font identifiers to their CSS class names. Used for icon fonts. */
      this._fontCssClassesByAlias = new Map();
      /** Registered icon resolver functions. */
      this._resolvers = [];
      /**
       * The CSS classes to apply when an `<mat-icon>` component has no icon name, url, or font
       * specified. The default 'material-icons' value assumes that the material icon font has been
       * loaded as described at https://google.github.io/material-design-icons/#icon-font-for-the-web
       */
      this._defaultFontSetClass = ['material-icons', 'mat-ligature-font'];
      this._document = document;
    }
    /**
     * Registers an icon by URL in the default namespace.
     * @param iconName Name under which the icon should be registered.
     * @param url
     */
    addSvgIcon(iconName, url, options) {
      return this.addSvgIconInNamespace('', iconName, url, options);
    }
    /**
     * Registers an icon using an HTML string in the default namespace.
     * @param iconName Name under which the icon should be registered.
     * @param literal SVG source of the icon.
     */
    addSvgIconLiteral(iconName, literal, options) {
      return this.addSvgIconLiteralInNamespace('', iconName, literal, options);
    }
    /**
     * Registers an icon by URL in the specified namespace.
     * @param namespace Namespace in which the icon should be registered.
     * @param iconName Name under which the icon should be registered.
     * @param url
     */
    addSvgIconInNamespace(namespace, iconName, url, options) {
      return this._addSvgIconConfig(namespace, iconName, new SvgIconConfig(url, null, options));
    }
    /**
     * Registers an icon resolver function with the registry. The function will be invoked with the
     * name and namespace of an icon when the registry tries to resolve the URL from which to fetch
     * the icon. The resolver is expected to return a `SafeResourceUrl` that points to the icon,
     * an object with the icon URL and icon options, or `null` if the icon is not supported. Resolvers
     * will be invoked in the order in which they have been registered.
     * @param resolver Resolver function to be registered.
     */
    addSvgIconResolver(resolver) {
      this._resolvers.push(resolver);
      return this;
    }
    /**
     * Registers an icon using an HTML string in the specified namespace.
     * @param namespace Namespace in which the icon should be registered.
     * @param iconName Name under which the icon should be registered.
     * @param literal SVG source of the icon.
     */
    addSvgIconLiteralInNamespace(namespace, iconName, literal, options) {
      const cleanLiteral = this._sanitizer.sanitize(_angular_core__WEBPACK_IMPORTED_MODULE_0__.SecurityContext.HTML, literal);
      // TODO: add an ngDevMode check
      if (!cleanLiteral) {
        throw getMatIconFailedToSanitizeLiteralError(literal);
      }
      // Security: The literal is passed in as SafeHtml, and is thus trusted.
      const trustedLiteral = trustedHTMLFromString(cleanLiteral);
      return this._addSvgIconConfig(namespace, iconName, new SvgIconConfig('', trustedLiteral, options));
    }
    /**
     * Registers an icon set by URL in the default namespace.
     * @param url
     */
    addSvgIconSet(url, options) {
      return this.addSvgIconSetInNamespace('', url, options);
    }
    /**
     * Registers an icon set using an HTML string in the default namespace.
     * @param literal SVG source of the icon set.
     */
    addSvgIconSetLiteral(literal, options) {
      return this.addSvgIconSetLiteralInNamespace('', literal, options);
    }
    /**
     * Registers an icon set by URL in the specified namespace.
     * @param namespace Namespace in which to register the icon set.
     * @param url
     */
    addSvgIconSetInNamespace(namespace, url, options) {
      return this._addSvgIconSetConfig(namespace, new SvgIconConfig(url, null, options));
    }
    /**
     * Registers an icon set using an HTML string in the specified namespace.
     * @param namespace Namespace in which to register the icon set.
     * @param literal SVG source of the icon set.
     */
    addSvgIconSetLiteralInNamespace(namespace, literal, options) {
      const cleanLiteral = this._sanitizer.sanitize(_angular_core__WEBPACK_IMPORTED_MODULE_0__.SecurityContext.HTML, literal);
      if (!cleanLiteral) {
        throw getMatIconFailedToSanitizeLiteralError(literal);
      }
      // Security: The literal is passed in as SafeHtml, and is thus trusted.
      const trustedLiteral = trustedHTMLFromString(cleanLiteral);
      return this._addSvgIconSetConfig(namespace, new SvgIconConfig('', trustedLiteral, options));
    }
    /**
     * Defines an alias for CSS class names to be used for icon fonts. Creating an matIcon
     * component with the alias as the fontSet input will cause the class name to be applied
     * to the `<mat-icon>` element.
     *
     * If the registered font is a ligature font, then don't forget to also include the special
     * class `mat-ligature-font` to allow the usage via attribute. So register like this:
     *
     * ```ts
     * iconRegistry.registerFontClassAlias('f1', 'font1 mat-ligature-font');
     * ```
     *
     * And use like this:
     *
     * ```html
     * <mat-icon fontSet="f1" fontIcon="home"></mat-icon>
     * ```
     *
     * @param alias Alias for the font.
     * @param classNames Class names override to be used instead of the alias.
     */
    registerFontClassAlias(alias, classNames = alias) {
      this._fontCssClassesByAlias.set(alias, classNames);
      return this;
    }
    /**
     * Returns the CSS class name associated with the alias by a previous call to
     * registerFontClassAlias. If no CSS class has been associated, returns the alias unmodified.
     */
    classNameForFontAlias(alias) {
      return this._fontCssClassesByAlias.get(alias) || alias;
    }
    /**
     * Sets the CSS classes to be used for icon fonts when an `<mat-icon>` component does not
     * have a fontSet input value, and is not loading an icon by name or URL.
     */
    setDefaultFontSetClass(...classNames) {
      this._defaultFontSetClass = classNames;
      return this;
    }
    /**
     * Returns the CSS classes to be used for icon fonts when an `<mat-icon>` component does not
     * have a fontSet input value, and is not loading an icon by name or URL.
     */
    getDefaultFontSetClass() {
      return this._defaultFontSetClass;
    }
    /**
     * Returns an Observable that produces the icon (as an `<svg>` DOM element) from the given URL.
     * The response from the URL may be cached so this will not always cause an HTTP request, but
     * the produced element will always be a new copy of the originally fetched icon. (That is,
     * it will not contain any modifications made to elements previously returned).
     *
     * @param safeUrl URL from which to fetch the SVG icon.
     */
    getSvgIconFromUrl(safeUrl) {
      const url = this._sanitizer.sanitize(_angular_core__WEBPACK_IMPORTED_MODULE_0__.SecurityContext.RESOURCE_URL, safeUrl);
      if (!url) {
        throw getMatIconFailedToSanitizeUrlError(safeUrl);
      }
      const cachedIcon = this._cachedIconsByUrl.get(url);
      if (cachedIcon) {
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.of)(cloneSvg(cachedIcon));
      }
      return this._loadSvgIconFromConfig(new SvgIconConfig(safeUrl, null)).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(svg => this._cachedIconsByUrl.set(url, svg)), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.map)(svg => cloneSvg(svg)));
    }
    /**
     * Returns an Observable that produces the icon (as an `<svg>` DOM element) with the given name
     * and namespace. The icon must have been previously registered with addIcon or addIconSet;
     * if not, the Observable will throw an error.
     *
     * @param name Name of the icon to be retrieved.
     * @param namespace Namespace in which to look for the icon.
     */
    getNamedSvgIcon(name, namespace = '') {
      const key = iconKey(namespace, name);
      let config = this._svgIconConfigs.get(key);
      // Return (copy of) cached icon if possible.
      if (config) {
        return this._getSvgFromConfig(config);
      }
      // Otherwise try to resolve the config from one of the resolver functions.
      config = this._getIconConfigFromResolvers(namespace, name);
      if (config) {
        this._svgIconConfigs.set(key, config);
        return this._getSvgFromConfig(config);
      }
      // See if we have any icon sets registered for the namespace.
      const iconSetConfigs = this._iconSetConfigs.get(namespace);
      if (iconSetConfigs) {
        return this._getSvgFromIconSetConfigs(name, iconSetConfigs);
      }
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.throwError)(getMatIconNameNotFoundError(key));
    }
    ngOnDestroy() {
      this._resolvers = [];
      this._svgIconConfigs.clear();
      this._iconSetConfigs.clear();
      this._cachedIconsByUrl.clear();
    }
    /**
     * Returns the cached icon for a SvgIconConfig if available, or fetches it from its URL if not.
     */
    _getSvgFromConfig(config) {
      if (config.svgText) {
        // We already have the SVG element for this icon, return a copy.
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.of)(cloneSvg(this._svgElementFromConfig(config)));
      } else {
        // Fetch the icon from the config's URL, cache it, and return a copy.
        return this._loadSvgIconFromConfig(config).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.map)(svg => cloneSvg(svg)));
      }
    }
    /**
     * Attempts to find an icon with the specified name in any of the SVG icon sets.
     * First searches the available cached icons for a nested element with a matching name, and
     * if found copies the element to a new `<svg>` element. If not found, fetches all icon sets
     * that have not been cached, and searches again after all fetches are completed.
     * The returned Observable produces the SVG element if possible, and throws
     * an error if no icon with the specified name can be found.
     */
    _getSvgFromIconSetConfigs(name, iconSetConfigs) {
      // For all the icon set SVG elements we've fetched, see if any contain an icon with the
      // requested name.
      const namedIcon = this._extractIconWithNameFromAnySet(name, iconSetConfigs);
      if (namedIcon) {
        // We could cache namedIcon in _svgIconConfigs, but since we have to make a copy every
        // time anyway, there's probably not much advantage compared to just always extracting
        // it from the icon set.
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.of)(namedIcon);
      }
      // Not found in any cached icon sets. If there are icon sets with URLs that we haven't
      // fetched, fetch them now and look for iconName in the results.
      const iconSetFetchRequests = iconSetConfigs.filter(iconSetConfig => !iconSetConfig.svgText).map(iconSetConfig => {
        return this._loadSvgIconSetFromConfig(iconSetConfig).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.catchError)(err => {
          const url = this._sanitizer.sanitize(_angular_core__WEBPACK_IMPORTED_MODULE_0__.SecurityContext.RESOURCE_URL, iconSetConfig.url);
          // Swallow errors fetching individual URLs so the
          // combined Observable won't necessarily fail.
          const errorMessage = `Loading icon set URL: ${url} failed: ${err.message}`;
          this._errorHandler.handleError(new Error(errorMessage));
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.of)(null);
        }));
      });
      // Fetch all the icon set URLs. When the requests complete, every IconSet should have a
      // cached SVG element (unless the request failed), and we can check again for the icon.
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.forkJoin)(iconSetFetchRequests).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.map)(() => {
        const foundIcon = this._extractIconWithNameFromAnySet(name, iconSetConfigs);
        // TODO: add an ngDevMode check
        if (!foundIcon) {
          throw getMatIconNameNotFoundError(name);
        }
        return foundIcon;
      }));
    }
    /**
     * Searches the cached SVG elements for the given icon sets for a nested icon element whose "id"
     * tag matches the specified name. If found, copies the nested element to a new SVG element and
     * returns it. Returns null if no matching element is found.
     */
    _extractIconWithNameFromAnySet(iconName, iconSetConfigs) {
      // Iterate backwards, so icon sets added later have precedence.
      for (let i = iconSetConfigs.length - 1; i >= 0; i--) {
        const config = iconSetConfigs[i];
        // Parsing the icon set's text into an SVG element can be expensive. We can avoid some of
        // the parsing by doing a quick check using `indexOf` to see if there's any chance for the
        // icon to be in the set. This won't be 100% accurate, but it should help us avoid at least
        // some of the parsing.
        if (config.svgText && config.svgText.toString().indexOf(iconName) > -1) {
          const svg = this._svgElementFromConfig(config);
          const foundIcon = this._extractSvgIconFromSet(svg, iconName, config.options);
          if (foundIcon) {
            return foundIcon;
          }
        }
      }
      return null;
    }
    /**
     * Loads the content of the icon URL specified in the SvgIconConfig and creates an SVG element
     * from it.
     */
    _loadSvgIconFromConfig(config) {
      return this._fetchIcon(config).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(svgText => config.svgText = svgText), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.map)(() => this._svgElementFromConfig(config)));
    }
    /**
     * Loads the content of the icon set URL specified in the
     * SvgIconConfig and attaches it to the config.
     */
    _loadSvgIconSetFromConfig(config) {
      if (config.svgText) {
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.of)(null);
      }
      return this._fetchIcon(config).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(svgText => config.svgText = svgText));
    }
    /**
     * Searches the cached element of the given SvgIconConfig for a nested icon element whose "id"
     * tag matches the specified name. If found, copies the nested element to a new SVG element and
     * returns it. Returns null if no matching element is found.
     */
    _extractSvgIconFromSet(iconSet, iconName, options) {
      // Use the `id="iconName"` syntax in order to escape special
      // characters in the ID (versus using the #iconName syntax).
      const iconSource = iconSet.querySelector(`[id="${iconName}"]`);
      if (!iconSource) {
        return null;
      }
      // Clone the element and remove the ID to prevent multiple elements from being added
      // to the page with the same ID.
      const iconElement = iconSource.cloneNode(true);
      iconElement.removeAttribute('id');
      // If the icon node is itself an <svg> node, clone and return it directly. If not, set it as
      // the content of a new <svg> node.
      if (iconElement.nodeName.toLowerCase() === 'svg') {
        return this._setSvgAttributes(iconElement, options);
      }
      // If the node is a <symbol>, it won't be rendered so we have to convert it into <svg>. Note
      // that the same could be achieved by referring to it via <use href="#id">, however the <use>
      // tag is problematic on Firefox, because it needs to include the current page path.
      if (iconElement.nodeName.toLowerCase() === 'symbol') {
        return this._setSvgAttributes(this._toSvgElement(iconElement), options);
      }
      // createElement('SVG') doesn't work as expected; the DOM ends up with
      // the correct nodes, but the SVG content doesn't render. Instead we
      // have to create an empty SVG node using innerHTML and append its content.
      // Elements created using DOMParser.parseFromString have the same problem.
      // http://stackoverflow.com/questions/23003278/svg-innerhtml-in-firefox-can-not-display
      const svg = this._svgElementFromString(trustedHTMLFromString('<svg></svg>'));
      // Clone the node so we don't remove it from the parent icon set element.
      svg.appendChild(iconElement);
      return this._setSvgAttributes(svg, options);
    }
    /**
     * Creates a DOM element from the given SVG string.
     */
    _svgElementFromString(str) {
      const div = this._document.createElement('DIV');
      div.innerHTML = str;
      const svg = div.querySelector('svg');
      // TODO: add an ngDevMode check
      if (!svg) {
        throw Error('<svg> tag not found');
      }
      return svg;
    }
    /**
     * Converts an element into an SVG node by cloning all of its children.
     */
    _toSvgElement(element) {
      const svg = this._svgElementFromString(trustedHTMLFromString('<svg></svg>'));
      const attributes = element.attributes;
      // Copy over all the attributes from the `symbol` to the new SVG, except the id.
      for (let i = 0; i < attributes.length; i++) {
        const {
          name,
          value
        } = attributes[i];
        if (name !== 'id') {
          svg.setAttribute(name, value);
        }
      }
      for (let i = 0; i < element.childNodes.length; i++) {
        if (element.childNodes[i].nodeType === this._document.ELEMENT_NODE) {
          svg.appendChild(element.childNodes[i].cloneNode(true));
        }
      }
      return svg;
    }
    /**
     * Sets the default attributes for an SVG element to be used as an icon.
     */
    _setSvgAttributes(svg, options) {
      svg.setAttribute('fit', '');
      svg.setAttribute('height', '100%');
      svg.setAttribute('width', '100%');
      svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
      svg.setAttribute('focusable', 'false'); // Disable IE11 default behavior to make SVGs focusable.
      if (options && options.viewBox) {
        svg.setAttribute('viewBox', options.viewBox);
      }
      return svg;
    }
    /**
     * Returns an Observable which produces the string contents of the given icon. Results may be
     * cached, so future calls with the same URL may not cause another HTTP request.
     */
    _fetchIcon(iconConfig) {
      const {
        url: safeUrl,
        options
      } = iconConfig;
      const withCredentials = options?.withCredentials ?? false;
      if (!this._httpClient) {
        throw getMatIconNoHttpProviderError();
      }
      // TODO: add an ngDevMode check
      if (safeUrl == null) {
        throw Error(`Cannot fetch icon from URL "${safeUrl}".`);
      }
      const url = this._sanitizer.sanitize(_angular_core__WEBPACK_IMPORTED_MODULE_0__.SecurityContext.RESOURCE_URL, safeUrl);
      // TODO: add an ngDevMode check
      if (!url) {
        throw getMatIconFailedToSanitizeUrlError(safeUrl);
      }
      // Store in-progress fetches to avoid sending a duplicate request for a URL when there is
      // already a request in progress for that URL. It's necessary to call share() on the
      // Observable returned by http.get() so that multiple subscribers don't cause multiple XHRs.
      const inProgressFetch = this._inProgressUrlFetches.get(url);
      if (inProgressFetch) {
        return inProgressFetch;
      }
      const req = this._httpClient.get(url, {
        responseType: 'text',
        withCredentials
      }).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.map)(svg => {
        // Security: This SVG is fetched from a SafeResourceUrl, and is thus
        // trusted HTML.
        return trustedHTMLFromString(svg);
      }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.finalize)(() => this._inProgressUrlFetches.delete(url)), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.share)());
      this._inProgressUrlFetches.set(url, req);
      return req;
    }
    /**
     * Registers an icon config by name in the specified namespace.
     * @param namespace Namespace in which to register the icon config.
     * @param iconName Name under which to register the config.
     * @param config Config to be registered.
     */
    _addSvgIconConfig(namespace, iconName, config) {
      this._svgIconConfigs.set(iconKey(namespace, iconName), config);
      return this;
    }
    /**
     * Registers an icon set config in the specified namespace.
     * @param namespace Namespace in which to register the icon config.
     * @param config Config to be registered.
     */
    _addSvgIconSetConfig(namespace, config) {
      const configNamespace = this._iconSetConfigs.get(namespace);
      if (configNamespace) {
        configNamespace.push(config);
      } else {
        this._iconSetConfigs.set(namespace, [config]);
      }
      return this;
    }
    /** Parses a config's text into an SVG element. */
    _svgElementFromConfig(config) {
      if (!config.svgElement) {
        const svg = this._svgElementFromString(config.svgText);
        this._setSvgAttributes(svg, config.options);
        config.svgElement = svg;
      }
      return config.svgElement;
    }
    /** Tries to create an icon config through the registered resolver functions. */
    _getIconConfigFromResolvers(namespace, name) {
      for (let i = 0; i < this._resolvers.length; i++) {
        const result = this._resolvers[i](name, namespace);
        if (result) {
          return isSafeUrlWithOptions(result) ? new SvgIconConfig(result.url, null, result.options) : new SvgIconConfig(result, null);
        }
      }
      return undefined;
    }
  }
  _class = MatIconRegistry;
  _class.ɵfac = function _class_Factory(t) {
    return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_3__.HttpClient, 8), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__.DomSanitizer), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common__WEBPACK_IMPORTED_MODULE_5__.DOCUMENT, 8), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ErrorHandler));
  };
  _class.ɵprov = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
    token: _class,
    factory: _class.ɵfac,
    providedIn: 'root'
  });
  return MatIconRegistry;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
/** @docs-private */
function ICON_REGISTRY_PROVIDER_FACTORY(parentRegistry, httpClient, sanitizer, errorHandler, document) {
  return parentRegistry || new MatIconRegistry(httpClient, sanitizer, document, errorHandler);
}
/** @docs-private */
const ICON_REGISTRY_PROVIDER = {
  // If there is already an MatIconRegistry available, use that. Otherwise, provide a new one.
  provide: MatIconRegistry,
  deps: [[/*#__PURE__*/new _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional(), /*#__PURE__*/new _angular_core__WEBPACK_IMPORTED_MODULE_0__.SkipSelf(), MatIconRegistry], [/*#__PURE__*/new _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional(), _angular_common_http__WEBPACK_IMPORTED_MODULE_3__.HttpClient], _angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__.DomSanitizer, _angular_core__WEBPACK_IMPORTED_MODULE_0__.ErrorHandler, [/*#__PURE__*/new _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional(), _angular_common__WEBPACK_IMPORTED_MODULE_5__.DOCUMENT]],
  useFactory: ICON_REGISTRY_PROVIDER_FACTORY
};
/** Clones an SVGElement while preserving type information. */
function cloneSvg(svg) {
  return svg.cloneNode(true);
}
/** Returns the cache key to use for an icon namespace and name. */
function iconKey(namespace, name) {
  return namespace + ':' + name;
}
function isSafeUrlWithOptions(value) {
  return !!(value.url && value.options);
}

// Boilerplate for applying mixins to MatIcon.
/** @docs-private */
const _MatIconBase = /*#__PURE__*/(0,_angular_material_core__WEBPACK_IMPORTED_MODULE_6__.mixinColor)(class {
  constructor(_elementRef) {
    this._elementRef = _elementRef;
  }
});
/** Injection token to be used to override the default options for `mat-icon`. */
const MAT_ICON_DEFAULT_OPTIONS = /*#__PURE__*/new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken('MAT_ICON_DEFAULT_OPTIONS');
/**
 * Injection token used to provide the current location to `MatIcon`.
 * Used to handle server-side rendering and to stub out during unit tests.
 * @docs-private
 */
const MAT_ICON_LOCATION = /*#__PURE__*/new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken('mat-icon-location', {
  providedIn: 'root',
  factory: MAT_ICON_LOCATION_FACTORY
});
/** @docs-private */
function MAT_ICON_LOCATION_FACTORY() {
  const _document = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_angular_common__WEBPACK_IMPORTED_MODULE_5__.DOCUMENT);
  const _location = _document ? _document.location : null;
  return {
    // Note that this needs to be a function, rather than a property, because Angular
    // will only resolve it once, but we want the current path on each call.
    getPathname: () => _location ? _location.pathname + _location.search : ''
  };
}
/** SVG attributes that accept a FuncIRI (e.g. `url(<something>)`). */
const funcIriAttributes = ['clip-path', 'color-profile', 'src', 'cursor', 'fill', 'filter', 'marker', 'marker-start', 'marker-mid', 'marker-end', 'mask', 'stroke'];
/** Selector that can be used to find all elements that are using a `FuncIRI`. */
const funcIriAttributeSelector = /*#__PURE__*/ /*#__PURE__*/funcIriAttributes.map(attr => `[${attr}]`).join(', ');
/** Regex that can be used to extract the id out of a FuncIRI. */
const funcIriPattern = /^url\(['"]?#(.*?)['"]?\)$/;
/**
 * Component to display an icon. It can be used in the following ways:
 *
 * - Specify the svgIcon input to load an SVG icon from a URL previously registered with the
 *   addSvgIcon, addSvgIconInNamespace, addSvgIconSet, or addSvgIconSetInNamespace methods of
 *   MatIconRegistry. If the svgIcon value contains a colon it is assumed to be in the format
 *   "[namespace]:[name]", if not the value will be the name of an icon in the default namespace.
 *   Examples:
 *     `<mat-icon svgIcon="left-arrow"></mat-icon>
 *     <mat-icon svgIcon="animals:cat"></mat-icon>`
 *
 * - Use a font ligature as an icon by putting the ligature text in the `fontIcon` attribute or the
 *   content of the `<mat-icon>` component. If you register a custom font class, don't forget to also
 *   include the special class `mat-ligature-font`. It is recommended to use the attribute alternative
 *   to prevent the ligature text to be selectable and to appear in search engine results.
 *   By default, the Material icons font is used as described at
 *   http://google.github.io/material-design-icons/#icon-font-for-the-web. You can specify an
 *   alternate font by setting the fontSet input to either the CSS class to apply to use the
 *   desired font, or to an alias previously registered with MatIconRegistry.registerFontClassAlias.
 *   Examples:
 *     `<mat-icon fontIcon="home"></mat-icon>
 *     <mat-icon>home</mat-icon>
 *     <mat-icon fontSet="myfont" fontIcon="sun"></mat-icon>
 *     <mat-icon fontSet="myfont">sun</mat-icon>`
 *
 * - Specify a font glyph to be included via CSS rules by setting the fontSet input to specify the
 *   font, and the fontIcon input to specify the icon. Typically the fontIcon will specify a
 *   CSS class which causes the glyph to be displayed via a :before selector, as in
 *   https://fortawesome.github.io/Font-Awesome/examples/
 *   Example:
 *     `<mat-icon fontSet="fa" fontIcon="alarm"></mat-icon>`
 */
let MatIcon = /*#__PURE__*/(() => {
  var _class2;
  class MatIcon extends _MatIconBase {
    /**
     * Whether the icon should be inlined, automatically sizing the icon to match the font size of
     * the element the icon is contained in.
     */
    get inline() {
      return this._inline;
    }
    set inline(inline) {
      this._inline = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_7__.coerceBooleanProperty)(inline);
    }
    /** Name of the icon in the SVG icon set. */
    get svgIcon() {
      return this._svgIcon;
    }
    set svgIcon(value) {
      if (value !== this._svgIcon) {
        if (value) {
          this._updateSvgIcon(value);
        } else if (this._svgIcon) {
          this._clearSvgElement();
        }
        this._svgIcon = value;
      }
    }
    /** Font set that the icon is a part of. */
    get fontSet() {
      return this._fontSet;
    }
    set fontSet(value) {
      const newValue = this._cleanupFontValue(value);
      if (newValue !== this._fontSet) {
        this._fontSet = newValue;
        this._updateFontIconClasses();
      }
    }
    /** Name of an icon within a font set. */
    get fontIcon() {
      return this._fontIcon;
    }
    set fontIcon(value) {
      const newValue = this._cleanupFontValue(value);
      if (newValue !== this._fontIcon) {
        this._fontIcon = newValue;
        this._updateFontIconClasses();
      }
    }
    constructor(elementRef, _iconRegistry, ariaHidden, _location, _errorHandler, defaults) {
      super(elementRef);
      this._iconRegistry = _iconRegistry;
      this._location = _location;
      this._errorHandler = _errorHandler;
      this._inline = false;
      this._previousFontSetClass = [];
      /** Subscription to the current in-progress SVG icon request. */
      this._currentIconFetch = rxjs__WEBPACK_IMPORTED_MODULE_1__.Subscription.EMPTY;
      if (defaults) {
        if (defaults.color) {
          this.color = this.defaultColor = defaults.color;
        }
        if (defaults.fontSet) {
          this.fontSet = defaults.fontSet;
        }
      }
      // If the user has not explicitly set aria-hidden, mark the icon as hidden, as this is
      // the right thing to do for the majority of icon use-cases.
      if (!ariaHidden) {
        elementRef.nativeElement.setAttribute('aria-hidden', 'true');
      }
    }
    /**
     * Splits an svgIcon binding value into its icon set and icon name components.
     * Returns a 2-element array of [(icon set), (icon name)].
     * The separator for the two fields is ':'. If there is no separator, an empty
     * string is returned for the icon set and the entire value is returned for
     * the icon name. If the argument is falsy, returns an array of two empty strings.
     * Throws an error if the name contains two or more ':' separators.
     * Examples:
     *   `'social:cake' -> ['social', 'cake']
     *   'penguin' -> ['', 'penguin']
     *   null -> ['', '']
     *   'a:b:c' -> (throws Error)`
     */
    _splitIconName(iconName) {
      if (!iconName) {
        return ['', ''];
      }
      const parts = iconName.split(':');
      switch (parts.length) {
        case 1:
          return ['', parts[0]];
        // Use default namespace.
        case 2:
          return parts;
        default:
          throw Error(`Invalid icon name: "${iconName}"`);
        // TODO: add an ngDevMode check
      }
    }

    ngOnInit() {
      // Update font classes because ngOnChanges won't be called if none of the inputs are present,
      // e.g. <mat-icon>arrow</mat-icon> In this case we need to add a CSS class for the default font.
      this._updateFontIconClasses();
    }
    ngAfterViewChecked() {
      const cachedElements = this._elementsWithExternalReferences;
      if (cachedElements && cachedElements.size) {
        const newPath = this._location.getPathname();
        // We need to check whether the URL has changed on each change detection since
        // the browser doesn't have an API that will let us react on link clicks and
        // we can't depend on the Angular router. The references need to be updated,
        // because while most browsers don't care whether the URL is correct after
        // the first render, Safari will break if the user navigates to a different
        // page and the SVG isn't re-rendered.
        if (newPath !== this._previousPath) {
          this._previousPath = newPath;
          this._prependPathToReferences(newPath);
        }
      }
    }
    ngOnDestroy() {
      this._currentIconFetch.unsubscribe();
      if (this._elementsWithExternalReferences) {
        this._elementsWithExternalReferences.clear();
      }
    }
    _usingFontIcon() {
      return !this.svgIcon;
    }
    _setSvgElement(svg) {
      this._clearSvgElement();
      // Note: we do this fix here, rather than the icon registry, because the
      // references have to point to the URL at the time that the icon was created.
      const path = this._location.getPathname();
      this._previousPath = path;
      this._cacheChildrenWithExternalReferences(svg);
      this._prependPathToReferences(path);
      this._elementRef.nativeElement.appendChild(svg);
    }
    _clearSvgElement() {
      const layoutElement = this._elementRef.nativeElement;
      let childCount = layoutElement.childNodes.length;
      if (this._elementsWithExternalReferences) {
        this._elementsWithExternalReferences.clear();
      }
      // Remove existing non-element child nodes and SVGs, and add the new SVG element. Note that
      // we can't use innerHTML, because IE will throw if the element has a data binding.
      while (childCount--) {
        const child = layoutElement.childNodes[childCount];
        // 1 corresponds to Node.ELEMENT_NODE. We remove all non-element nodes in order to get rid
        // of any loose text nodes, as well as any SVG elements in order to remove any old icons.
        if (child.nodeType !== 1 || child.nodeName.toLowerCase() === 'svg') {
          child.remove();
        }
      }
    }
    _updateFontIconClasses() {
      if (!this._usingFontIcon()) {
        return;
      }
      const elem = this._elementRef.nativeElement;
      const fontSetClasses = (this.fontSet ? this._iconRegistry.classNameForFontAlias(this.fontSet).split(/ +/) : this._iconRegistry.getDefaultFontSetClass()).filter(className => className.length > 0);
      this._previousFontSetClass.forEach(className => elem.classList.remove(className));
      fontSetClasses.forEach(className => elem.classList.add(className));
      this._previousFontSetClass = fontSetClasses;
      if (this.fontIcon !== this._previousFontIconClass && !fontSetClasses.includes('mat-ligature-font')) {
        if (this._previousFontIconClass) {
          elem.classList.remove(this._previousFontIconClass);
        }
        if (this.fontIcon) {
          elem.classList.add(this.fontIcon);
        }
        this._previousFontIconClass = this.fontIcon;
      }
    }
    /**
     * Cleans up a value to be used as a fontIcon or fontSet.
     * Since the value ends up being assigned as a CSS class, we
     * have to trim the value and omit space-separated values.
     */
    _cleanupFontValue(value) {
      return typeof value === 'string' ? value.trim().split(' ')[0] : value;
    }
    /**
     * Prepends the current path to all elements that have an attribute pointing to a `FuncIRI`
     * reference. This is required because WebKit browsers require references to be prefixed with
     * the current path, if the page has a `base` tag.
     */
    _prependPathToReferences(path) {
      const elements = this._elementsWithExternalReferences;
      if (elements) {
        elements.forEach((attrs, element) => {
          attrs.forEach(attr => {
            element.setAttribute(attr.name, `url('${path}#${attr.value}')`);
          });
        });
      }
    }
    /**
     * Caches the children of an SVG element that have `url()`
     * references that we need to prefix with the current path.
     */
    _cacheChildrenWithExternalReferences(element) {
      const elementsWithFuncIri = element.querySelectorAll(funcIriAttributeSelector);
      const elements = this._elementsWithExternalReferences = this._elementsWithExternalReferences || new Map();
      for (let i = 0; i < elementsWithFuncIri.length; i++) {
        funcIriAttributes.forEach(attr => {
          const elementWithReference = elementsWithFuncIri[i];
          const value = elementWithReference.getAttribute(attr);
          const match = value ? value.match(funcIriPattern) : null;
          if (match) {
            let attributes = elements.get(elementWithReference);
            if (!attributes) {
              attributes = [];
              elements.set(elementWithReference, attributes);
            }
            attributes.push({
              name: attr,
              value: match[1]
            });
          }
        });
      }
    }
    /** Sets a new SVG icon with a particular name. */
    _updateSvgIcon(rawName) {
      this._svgNamespace = null;
      this._svgName = null;
      this._currentIconFetch.unsubscribe();
      if (rawName) {
        const [namespace, iconName] = this._splitIconName(rawName);
        if (namespace) {
          this._svgNamespace = namespace;
        }
        if (iconName) {
          this._svgName = iconName;
        }
        this._currentIconFetch = this._iconRegistry.getNamedSvgIcon(iconName, namespace).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.take)(1)).subscribe(svg => this._setSvgElement(svg), err => {
          const errorMessage = `Error retrieving icon ${namespace}:${iconName}! ${err.message}`;
          this._errorHandler.handleError(new Error(errorMessage));
        });
      }
    }
  }
  _class2 = MatIcon;
  _class2.ɵfac = function _class2_Factory(t) {
    return new (t || _class2)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](MatIconRegistry), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinjectAttribute"]('aria-hidden'), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](MAT_ICON_LOCATION), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ErrorHandler), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](MAT_ICON_DEFAULT_OPTIONS, 8));
  };
  _class2.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
    type: _class2,
    selectors: [["mat-icon"]],
    hostAttrs: ["role", "img", 1, "mat-icon", "notranslate"],
    hostVars: 8,
    hostBindings: function _class2_HostBindings(rf, ctx) {
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattribute"]("data-mat-icon-type", ctx._usingFontIcon() ? "font" : "svg")("data-mat-icon-name", ctx._svgName || ctx.fontIcon)("data-mat-icon-namespace", ctx._svgNamespace || ctx.fontSet)("fontIcon", ctx._usingFontIcon() ? ctx.fontIcon : null);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("mat-icon-inline", ctx.inline)("mat-icon-no-color", ctx.color !== "primary" && ctx.color !== "accent" && ctx.color !== "warn");
      }
    },
    inputs: {
      color: "color",
      inline: "inline",
      svgIcon: "svgIcon",
      fontSet: "fontSet",
      fontIcon: "fontIcon"
    },
    exportAs: ["matIcon"],
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function _class2_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojectionDef"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](0);
      }
    },
    styles: ["mat-icon,mat-icon.mat-primary,mat-icon.mat-accent,mat-icon.mat-warn{color:var(--mat-icon-color)}.mat-icon{-webkit-user-select:none;user-select:none;background-repeat:no-repeat;display:inline-block;fill:currentColor;height:24px;width:24px;overflow:hidden}.mat-icon.mat-icon-inline{font-size:inherit;height:inherit;line-height:inherit;width:inherit}.mat-icon.mat-ligature-font[fontIcon]::before{content:attr(fontIcon)}[dir=rtl] .mat-icon-rtl-mirror{transform:scale(-1, 1)}.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon,.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon{display:block}.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon-button .mat-icon,.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon-button .mat-icon{margin:auto}"],
    encapsulation: 2,
    changeDetection: 0
  });
  return MatIcon;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
let MatIconModule = /*#__PURE__*/(() => {
  var _class3;
  class MatIconModule {}
  _class3 = MatIconModule;
  _class3.ɵfac = function _class3_Factory(t) {
    return new (t || _class3)();
  };
  _class3.ɵmod = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
    type: _class3
  });
  _class3.ɵinj = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
    imports: [_angular_material_core__WEBPACK_IMPORTED_MODULE_6__.MatCommonModule, _angular_material_core__WEBPACK_IMPORTED_MODULE_6__.MatCommonModule]
  });
  return MatIconModule;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();

/**
 * Generated bundle index. Do not edit.
 */



/***/ })

};
;
//# sourceMappingURL=495.js.map