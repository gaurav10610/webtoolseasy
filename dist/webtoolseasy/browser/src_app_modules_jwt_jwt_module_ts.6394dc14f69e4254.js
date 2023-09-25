"use strict";
(self["webpackChunkwebtoolseasy"] = self["webpackChunkwebtoolseasy"] || []).push([["src_app_modules_jwt_jwt_module_ts"],{

/***/ 1235:
/*!***************************************************!*\
  !*** ./src/app/modules/jwt/jwt-routing.module.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   JwtRoutingModule: () => (/* binding */ JwtRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 7947);
/* harmony import */ var _jwt_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./jwt.component */ 181);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 1699);
var _class;




const routes = [{
  path: '',
  component: _jwt_component__WEBPACK_IMPORTED_MODULE_0__.JwtComponent
}];
class JwtRoutingModule {}
_class = JwtRoutingModule;
_class.ɵfac = function JwtRoutingModule_Factory(t) {
  return new (t || _class)();
};
_class.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
  type: _class
});
_class.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](JwtRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
})();

/***/ }),

/***/ 181:
/*!**********************************************!*\
  !*** ./src/app/modules/jwt/jwt.component.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   JwtComponent: () => (/* binding */ JwtComponent)
/* harmony export */ });
/* harmony import */ var src_app_service_util_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/service/util/logger */ 4930);
/* harmony import */ var src_environments_component_config_jwt_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/environments/component-config/jwt/config */ 420);
/* harmony import */ var jose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jose */ 7020);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/cdk/clipboard */ 4362);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var ngx_json_viewer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-json-viewer */ 2335);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/icon */ 6515);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/button */ 895);
var _class;









const _c0 = ["text1AreaContent"];
const _c1 = ["text2AreaContent"];
const _c2 = ["text3AreaContent"];
function JwtComponent_span_21_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "span", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "error: token is invalid");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
class JwtComponent {
  constructor(clipboard, renderer) {
    this.clipboard = clipboard;
    this.renderer = renderer;
    this.isTokenValid = true;
    this.tabSpaceValue = '  ';
    this.encodedToken = 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJTYW1wbGUgSXNzdWVyIiwiVXNlcm5hbWUiOiJ1c2VybmFtZUB3ZWJ0b29sc2Vhc3kuY29tIiwiZXhwIjoxNjY4OTQyNDIzLCJpYXQiOjE2Njg5NDI0MjN9.WuKjPKbgXqh_DkGd0aEBQr305Rn8EkMLvd0W7LRE-JM';
    this.applicationConfig = src_environments_component_config_jwt_config__WEBPACK_IMPORTED_MODULE_1__.componentConfig;
    this.descriptionData = src_environments_component_config_jwt_config__WEBPACK_IMPORTED_MODULE_1__.descriptionData;
    this.decodedToken = (0,jose__WEBPACK_IMPORTED_MODULE_2__.decodeJwt)(this.encodedToken);
    /**
     * decoded JWT token headers
     */
    this.decodedHeaders = (0,jose__WEBPACK_IMPORTED_MODULE_2__.decodeProtectedHeader)(this.encodedToken);
  }
  ngAfterViewInit() {
    this.updateEncodedToken(this.encodedToken);
  }
  encodedInputChange() {
    this.decodeUpdatedToken(this.text1AreaContent.nativeElement.innerText);
  }
  decodeUpdatedToken(encodedTokenValue) {
    try {
      this.encodedToken = encodedTokenValue;
      /**
       * decoded JWT token
       */
      const decodedTokenValue = (0,jose__WEBPACK_IMPORTED_MODULE_2__.decodeJwt)(encodedTokenValue);
      /**
       * decoded JWT token headers
       */
      const tokenHeadersValue = (0,jose__WEBPACK_IMPORTED_MODULE_2__.decodeProtectedHeader)(encodedTokenValue);
      this.isTokenValid = true;
      this.updateDecodedToken(decodedTokenValue);
      this.updateTokenHeaders(tokenHeadersValue);
    } catch (error) {
      src_app_service_util_logger__WEBPACK_IMPORTED_MODULE_0__.LogUtils.error(`error occured while decoding token: ${this.encodedToken}`);
      src_app_service_util_logger__WEBPACK_IMPORTED_MODULE_0__.LogUtils.error(error);
      this.isTokenValid = false;
    }
  }
  updateEncodedToken(encodedToken) {
    this.renderer.setProperty(this.text1AreaContent.nativeElement, 'innerText', encodedToken);
  }
  updateDecodedToken(decodedToken) {
    this.decodedToken = decodedToken;
  }
  updateTokenHeaders(tokeanHeaders) {
    this.decodedHeaders = tokeanHeaders;
  }
  copyDecodedToken() {
    this.clipboard.copy(JSON.stringify(this.text2AreaContent.json, null, this.tabSpaceValue));
  }
  onEncodedDivClick() {
    this.text1AreaContent.nativeElement.focus();
  }
}
_class = JwtComponent;
_class.ɵfac = function JwtComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_4__.Clipboard), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_3__.Renderer2));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["app-jwt"]],
  viewQuery: function JwtComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵviewQuery"](_c0, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵviewQuery"](_c1, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵviewQuery"](_c2, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵloadQuery"]()) && (ctx.text1AreaContent = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵloadQuery"]()) && (ctx.text2AreaContent = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵloadQuery"]()) && (ctx.text3AreaContent = _t.first);
    }
  },
  decls: 26,
  vars: 5,
  consts: [[1, "flex-display", "flex-column-flow", "flex-align-center", "flex-gap-medium"], [1, "flex-display", "flex-align-center", "text-area-container", "full-width", "flex-gap-large"], [1, "flex-display", "flex-column-flow", "text-area-div", "flex-gap-medium"], [1, "div-label"], [1, "div-border", "flex-full-height", "full-width", "border-grey", "auto-scroll", "encoded-div", 2, "color", "indigo", 3, "click"], ["contenteditable", "true", 3, "input"], ["text1AreaContent", ""], [2, "font-size", "small"], [1, "div-border", "full-width", "border-grey"], [3, "json", "expanded"], ["text3AreaContent", ""], [1, "div-border", "flex-full-height", "full-width", "border-grey", "auto-scroll"], ["text2AreaContent", ""], ["class", "header-font", "style", "color: red; align-self: flex-start", 4, "ngIf"], ["mat-stroked-button", "", "color", "primary", 2, "align-self", "flex-end", 3, "click"], [1, "header-font", 2, "color", "red", "align-self", "flex-start"]],
  template: function JwtComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "span", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4, "Encoded Token (Paste Token Here)");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](5, "div", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function JwtComponent_Template_div_click_5_listener() {
        return ctx.onEncodedDivClick();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "span", 5, 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("input", function JwtComponent_Template_span_input_6_listener() {
        return ctx.encodedInputChange();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](8, "div", 2)(9, "span", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](10, "Decoded Token");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](11, "span", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](12, "Headers ( Algorithm & Token Type)");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](13, "div", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](14, "ngx-json-viewer", 9, 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](16, "span", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](17, "Token Data");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](18, "div", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](19, "ngx-json-viewer", 9, 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](21, JwtComponent_span_21_Template, 2, 0, "span", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](22, "button", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function JwtComponent_Template_button_click_22_listener() {
        return ctx.copyDecodedToken();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](23, "mat-icon");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](24, "content_copy");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](25, "Copy Decoded Token ");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](14);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("json", ctx.decodedHeaders)("expanded", true);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("json", ctx.decodedToken)("expanded", true);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", !ctx.isTokenValid);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.NgIf, ngx_json_viewer__WEBPACK_IMPORTED_MODULE_6__.NgxJsonViewerComponent, _angular_material_icon__WEBPACK_IMPORTED_MODULE_7__.MatIcon, _angular_material_button__WEBPACK_IMPORTED_MODULE_8__.MatButton],
  styles: [".div-label[_ngcontent-%COMP%] {\n  font-size: large;\n}\n\n.text-area-div[_ngcontent-%COMP%] {\n  width: 48%;\n  font-size: larger;\n  min-height: 20em;\n}\n\n.div-border[_ngcontent-%COMP%] {\n  border-radius: 4px;\n}\n\n.text-area-container[_ngcontent-%COMP%] {\n  justify-content: space-between;\n}\n\n@media screen and (min-width: 735px) {\n  .encoded-div[_ngcontent-%COMP%] {\n    padding: 10px;\n  }\n}\n[contenteditable][_ngcontent-%COMP%]:focus {\n  outline: 0px solid transparent;\n}\n\n@media screen and (max-width: 735px) {\n  .text-area-div[_ngcontent-%COMP%] {\n    width: 100%;\n    min-height: 10em;\n  }\n  .text-area-container[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvbW9kdWxlcy9qd3Qvand0LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsZ0JBQUE7QUFDRjs7QUFFQTtFQUNFLFVBQUE7RUFDQSxpQkFBQTtFQUNBLGdCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxrQkFBQTtBQUNGOztBQUVBO0VBQ0UsOEJBQUE7QUFDRjs7QUFFQTtFQUNFO0lBQ0UsYUFBQTtFQUNGO0FBQ0Y7QUFHQTtFQUNFLDhCQUFBO0FBREY7O0FBSUE7RUFDRTtJQUNFLFdBQUE7SUFDQSxnQkFBQTtFQURGO0VBR0E7SUFDRSxzQkFBQTtFQURGO0FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIuZGl2LWxhYmVsIHtcbiAgZm9udC1zaXplOiBsYXJnZTtcbn1cblxuLnRleHQtYXJlYS1kaXYge1xuICB3aWR0aDogNDglO1xuICBmb250LXNpemU6IGxhcmdlcjtcbiAgbWluLWhlaWdodDogMjBlbTtcbn1cblxuLmRpdi1ib3JkZXIge1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG59XG5cbi50ZXh0LWFyZWEtY29udGFpbmVyIHtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xufVxuXG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA3MzVweCkge1xuICAuZW5jb2RlZC1kaXYge1xuICAgIHBhZGRpbmc6IDEwcHg7XG4gIH1cbn1cblxuLy8gdG8gcmVtb3ZlIGJvcmRlciBmcm9tIGVkaXRhYmxlIHNwYW4gb3IgZGl2XG5bY29udGVudGVkaXRhYmxlXTpmb2N1cyB7XG4gIG91dGxpbmU6IDBweCBzb2xpZCB0cmFuc3BhcmVudDtcbn1cblxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogNzM1cHgpIHtcbiAgLnRleHQtYXJlYS1kaXYge1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIG1pbi1oZWlnaHQ6IDEwZW07XG4gIH1cbiAgLnRleHQtYXJlYS1jb250YWluZXIge1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
});

/***/ }),

/***/ 6917:
/*!*******************************************!*\
  !*** ./src/app/modules/jwt/jwt.module.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   JwtModule: () => (/* binding */ JwtModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _jwt_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./jwt-routing.module */ 1235);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/button */ 895);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/icon */ 6515);
/* harmony import */ var _angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/cdk/clipboard */ 4362);
/* harmony import */ var _jwt_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./jwt.component */ 181);
/* harmony import */ var ngx_json_viewer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-json-viewer */ 2335);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 1699);
var _class;








class JwtModule {}
_class = JwtModule;
_class.ɵfac = function JwtModule_Factory(t) {
  return new (t || _class)();
};
_class.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
  type: _class
});
_class.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _jwt_routing_module__WEBPACK_IMPORTED_MODULE_0__.JwtRoutingModule, ngx_json_viewer__WEBPACK_IMPORTED_MODULE_4__.NgxJsonViewerModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__.MatIconModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_6__.MatButtonModule, _angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_7__.ClipboardModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](JwtModule, {
    declarations: [_jwt_component__WEBPACK_IMPORTED_MODULE_1__.JwtComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _jwt_routing_module__WEBPACK_IMPORTED_MODULE_0__.JwtRoutingModule, ngx_json_viewer__WEBPACK_IMPORTED_MODULE_4__.NgxJsonViewerModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__.MatIconModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_6__.MatButtonModule, _angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_7__.ClipboardModule]
  });
})();

/***/ }),

/***/ 4930:
/*!****************************************!*\
  !*** ./src/app/service/util/logger.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LogUtils: () => (/* binding */ LogUtils)
/* harmony export */ });
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/environments/environment */ 553);

class LogUtils {
  static info(message, ...optionalParams) {
    if (!src_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.production) {
      if (optionalParams.length > 0) console.info(message, optionalParams);else console.info(message);
    }
  }
  static debug(message, ...optionalParams) {
    if (!src_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.production) {
      if (optionalParams.length > 0) console.debug(message, optionalParams);else console.debug(message);
    }
  }
  static error(message, ...optionalParams) {
    if (optionalParams.length > 0) console.error(message, optionalParams);else console.error(message);
  }
}

/***/ }),

/***/ 420:
/*!*********************************************************!*\
  !*** ./src/environments/component-config/jwt/config.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   componentConfig: () => (/* binding */ componentConfig),
/* harmony export */   descriptionData: () => (/* binding */ descriptionData)
/* harmony export */ });
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/environments/environment */ 553);
/* harmony import */ var src_environments_tools_directory_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/environments/tools-directory-config */ 6636);


const navigationUrl = '/tools/jwt';
const pageTitle = 'JWT Decoder: Online Tool to Decode JSON Web Tokens';
const pageDescription = 'Our free online JWT decoder tool is a quick and easy way to decode JSON Web Tokens (JWTs). Decode JWT header and body. Validate JWT Token Online.';
const imageUrl = `${src_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.screenshotsBaseUrl}/jwt-decoder.png`;
const keywords = 'JWT decoder, JWT decoder online, JWT decoder free, JWT decoder tool, decode JWT, decode JWT online, decode JWT free, JWT debugger, JSON Web Token decoder, JSON Web Token decoder online, JSON Web Token decoder free, decode JWT header, validate JWT, validate JSON Web Token';
const relatedTools = [src_environments_tools_directory_config__WEBPACK_IMPORTED_MODULE_1__.ApplicationIds.MARKDOWN_EDITOR, src_environments_tools_directory_config__WEBPACK_IMPORTED_MODULE_1__.ApplicationIds.UUID_VERSION1_GENERATOR, src_environments_tools_directory_config__WEBPACK_IMPORTED_MODULE_1__.ApplicationIds.UUID_VERSION4_GENERATOR, src_environments_tools_directory_config__WEBPACK_IMPORTED_MODULE_1__.ApplicationIds.GUID_GENERATOR];
const componentConfig = {
  mainHeading: 'JWT Decoder - Decode and Validate JSON Web Token Online',
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
  tags: keywords.split(',').map(word => word.trim()),
  icons: [],
  relatedTools: relatedTools.map(tool => src_environments_tools_directory_config__WEBPACK_IMPORTED_MODULE_1__.applicationConfig.get(tool))
};
const descriptionData = [{
  blockData: ['JSON Web Tokens (JWTs) are a popular way to encode and transmit data securely between two parties. JWTs are used in a variety of applications, such as authentication, authorization, and data sharing.', `If you need to decode a JWT, you can use our free online JWT decoder tool. It's simple to use and completely free.`, 'To use the tool, simply copy and paste your JWT into the text box. The tool will instantly decode the JWT and show you the header, payload, and signature.', `Our JWT decoder tool is perfect for developers, testers, and anyone else who needs to decode JWTs. It's also great for learning more about JWTs and how they work.`, 'No matter what your needs are, our free online JWT decoder tool is a valuable resource. Try it today and see how easy it is to use!']
}, {
  heading: 'Here are some of the benefits of using our free online JWT decoder tool:',
  listData: [`It's quick and easy to use.`, `It's completely free.`, `It's accurate and reliable.`, 'It decodes JWTs into header, payload, and signature.', `It's perfect for developers, testers, and anyone else who needs to decode JWTs.`, `It's great for learning more about JWTs and how they work.`]
}, {
  heading: 'Here are some examples of how you can use our free online JWT decoder tool:',
  listData: ['Developers can use the tool to decode JWTs that they are developing or testing.', 'Testers can use the tool to decode JWTs that they are testing.', 'Anyone can use the tool to decode JWTs that they have received or need to decode for any reason.']
}, {
  heading: 'What is a JWT?',
  blockData: ['A JSON Web Token (JWT) is an open standard (RFC 7519) for creating and verifying claims between two parties. A JWT is a string made up of three parts, separated by dots (.). The first part is the header, which contains information about the token, such as the algorithm used to sign it and the type of token. The second part is the payload, which contains the claims that are being made. The third part is the signature, which is used to verify the authenticity of the token.']
}, {
  heading: 'How to use our JWT decoder tool:',
  blockData: ['To use our JWT decoder tool, simply copy and paste your JWT into the text box and click the "Decode" button. The tool will instantly decode the JWT and show you the header, payload, and signature.']
}, {
  heading: 'Tips for using our JWT decoder tool:',
  listData: [`Make sure to copy and paste the entire JWT into the text box, including the dots (.).`, `If you are having trouble decoding a JWT, you can try using a different algorithm.`, `You can also use our JWT decoder tool to decode JWTs that are encoded in different ways, such as base64 encoded or URL safe encoded.`]
}, {
  blockData: ['We hope you find our free online JWT decoder tool helpful!']
}, {
  heading: 'References',
  links: [{
    displayText: 'Read more about JSON Web Token (JWT) at Wikipedia',
    url: 'https://en.wikipedia.org/wiki/JSON_Web_Token'
  }, {
    displayText: 'RFC 7519',
    url: 'https://www.ietf.org/rfc/rfc7519.txt'
  }]
}];

/***/ }),

/***/ 7020:
/*!*************************************************!*\
  !*** ./node_modules/jose/dist/browser/index.js ***!
  \*************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CompactEncrypt: () => (/* reexport safe */ _jwe_compact_encrypt_js__WEBPACK_IMPORTED_MODULE_9__.CompactEncrypt),
/* harmony export */   CompactSign: () => (/* reexport safe */ _jws_compact_sign_js__WEBPACK_IMPORTED_MODULE_11__.CompactSign),
/* harmony export */   EmbeddedJWK: () => (/* reexport safe */ _jwk_embedded_js__WEBPACK_IMPORTED_MODULE_17__.EmbeddedJWK),
/* harmony export */   EncryptJWT: () => (/* reexport safe */ _jwt_encrypt_js__WEBPACK_IMPORTED_MODULE_15__.EncryptJWT),
/* harmony export */   FlattenedEncrypt: () => (/* reexport safe */ _jwe_flattened_encrypt_js__WEBPACK_IMPORTED_MODULE_10__.FlattenedEncrypt),
/* harmony export */   FlattenedSign: () => (/* reexport safe */ _jws_flattened_sign_js__WEBPACK_IMPORTED_MODULE_12__.FlattenedSign),
/* harmony export */   GeneralEncrypt: () => (/* reexport safe */ _jwe_general_encrypt_js__WEBPACK_IMPORTED_MODULE_3__.GeneralEncrypt),
/* harmony export */   GeneralSign: () => (/* reexport safe */ _jws_general_sign_js__WEBPACK_IMPORTED_MODULE_13__.GeneralSign),
/* harmony export */   SignJWT: () => (/* reexport safe */ _jwt_sign_js__WEBPACK_IMPORTED_MODULE_14__.SignJWT),
/* harmony export */   UnsecuredJWT: () => (/* reexport safe */ _jwt_unsecured_js__WEBPACK_IMPORTED_MODULE_20__.UnsecuredJWT),
/* harmony export */   base64url: () => (/* reexport module object */ _util_base64url_js__WEBPACK_IMPORTED_MODULE_28__),
/* harmony export */   calculateJwkThumbprint: () => (/* reexport safe */ _jwk_thumbprint_js__WEBPACK_IMPORTED_MODULE_16__.calculateJwkThumbprint),
/* harmony export */   calculateJwkThumbprintUri: () => (/* reexport safe */ _jwk_thumbprint_js__WEBPACK_IMPORTED_MODULE_16__.calculateJwkThumbprintUri),
/* harmony export */   compactDecrypt: () => (/* reexport safe */ _jwe_compact_decrypt_js__WEBPACK_IMPORTED_MODULE_0__.compactDecrypt),
/* harmony export */   compactVerify: () => (/* reexport safe */ _jws_compact_verify_js__WEBPACK_IMPORTED_MODULE_4__.compactVerify),
/* harmony export */   createLocalJWKSet: () => (/* reexport safe */ _jwks_local_js__WEBPACK_IMPORTED_MODULE_18__.createLocalJWKSet),
/* harmony export */   createRemoteJWKSet: () => (/* reexport safe */ _jwks_remote_js__WEBPACK_IMPORTED_MODULE_19__.createRemoteJWKSet),
/* harmony export */   decodeJwt: () => (/* reexport safe */ _util_decode_jwt_js__WEBPACK_IMPORTED_MODULE_24__.decodeJwt),
/* harmony export */   decodeProtectedHeader: () => (/* reexport safe */ _util_decode_protected_header_js__WEBPACK_IMPORTED_MODULE_23__.decodeProtectedHeader),
/* harmony export */   errors: () => (/* reexport module object */ _util_errors_js__WEBPACK_IMPORTED_MODULE_25__),
/* harmony export */   exportJWK: () => (/* reexport safe */ _key_export_js__WEBPACK_IMPORTED_MODULE_21__.exportJWK),
/* harmony export */   exportPKCS8: () => (/* reexport safe */ _key_export_js__WEBPACK_IMPORTED_MODULE_21__.exportPKCS8),
/* harmony export */   exportSPKI: () => (/* reexport safe */ _key_export_js__WEBPACK_IMPORTED_MODULE_21__.exportSPKI),
/* harmony export */   flattenedDecrypt: () => (/* reexport safe */ _jwe_flattened_decrypt_js__WEBPACK_IMPORTED_MODULE_1__.flattenedDecrypt),
/* harmony export */   flattenedVerify: () => (/* reexport safe */ _jws_flattened_verify_js__WEBPACK_IMPORTED_MODULE_5__.flattenedVerify),
/* harmony export */   generalDecrypt: () => (/* reexport safe */ _jwe_general_decrypt_js__WEBPACK_IMPORTED_MODULE_2__.generalDecrypt),
/* harmony export */   generalVerify: () => (/* reexport safe */ _jws_general_verify_js__WEBPACK_IMPORTED_MODULE_6__.generalVerify),
/* harmony export */   generateKeyPair: () => (/* reexport safe */ _key_generate_key_pair_js__WEBPACK_IMPORTED_MODULE_26__.generateKeyPair),
/* harmony export */   generateSecret: () => (/* reexport safe */ _key_generate_secret_js__WEBPACK_IMPORTED_MODULE_27__.generateSecret),
/* harmony export */   importJWK: () => (/* reexport safe */ _key_import_js__WEBPACK_IMPORTED_MODULE_22__.importJWK),
/* harmony export */   importPKCS8: () => (/* reexport safe */ _key_import_js__WEBPACK_IMPORTED_MODULE_22__.importPKCS8),
/* harmony export */   importSPKI: () => (/* reexport safe */ _key_import_js__WEBPACK_IMPORTED_MODULE_22__.importSPKI),
/* harmony export */   importX509: () => (/* reexport safe */ _key_import_js__WEBPACK_IMPORTED_MODULE_22__.importX509),
/* harmony export */   jwtDecrypt: () => (/* reexport safe */ _jwt_decrypt_js__WEBPACK_IMPORTED_MODULE_8__.jwtDecrypt),
/* harmony export */   jwtVerify: () => (/* reexport safe */ _jwt_verify_js__WEBPACK_IMPORTED_MODULE_7__.jwtVerify)
/* harmony export */ });
/* harmony import */ var _jwe_compact_decrypt_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./jwe/compact/decrypt.js */ 6808);
/* harmony import */ var _jwe_flattened_decrypt_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./jwe/flattened/decrypt.js */ 9438);
/* harmony import */ var _jwe_general_decrypt_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./jwe/general/decrypt.js */ 8420);
/* harmony import */ var _jwe_general_encrypt_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./jwe/general/encrypt.js */ 5266);
/* harmony import */ var _jws_compact_verify_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./jws/compact/verify.js */ 3480);
/* harmony import */ var _jws_flattened_verify_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./jws/flattened/verify.js */ 3217);
/* harmony import */ var _jws_general_verify_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./jws/general/verify.js */ 7204);
/* harmony import */ var _jwt_verify_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./jwt/verify.js */ 2006);
/* harmony import */ var _jwt_decrypt_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./jwt/decrypt.js */ 9718);
/* harmony import */ var _jwe_compact_encrypt_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./jwe/compact/encrypt.js */ 5108);
/* harmony import */ var _jwe_flattened_encrypt_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./jwe/flattened/encrypt.js */ 7507);
/* harmony import */ var _jws_compact_sign_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./jws/compact/sign.js */ 477);
/* harmony import */ var _jws_flattened_sign_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./jws/flattened/sign.js */ 8285);
/* harmony import */ var _jws_general_sign_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./jws/general/sign.js */ 3847);
/* harmony import */ var _jwt_sign_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./jwt/sign.js */ 7403);
/* harmony import */ var _jwt_encrypt_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./jwt/encrypt.js */ 7465);
/* harmony import */ var _jwk_thumbprint_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./jwk/thumbprint.js */ 8242);
/* harmony import */ var _jwk_embedded_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./jwk/embedded.js */ 6958);
/* harmony import */ var _jwks_local_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./jwks/local.js */ 8232);
/* harmony import */ var _jwks_remote_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./jwks/remote.js */ 4349);
/* harmony import */ var _jwt_unsecured_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./jwt/unsecured.js */ 5719);
/* harmony import */ var _key_export_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./key/export.js */ 6344);
/* harmony import */ var _key_import_js__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./key/import.js */ 6606);
/* harmony import */ var _util_decode_protected_header_js__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./util/decode_protected_header.js */ 2936);
/* harmony import */ var _util_decode_jwt_js__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./util/decode_jwt.js */ 5093);
/* harmony import */ var _util_errors_js__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./util/errors.js */ 581);
/* harmony import */ var _key_generate_key_pair_js__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./key/generate_key_pair.js */ 882);
/* harmony import */ var _key_generate_secret_js__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./key/generate_secret.js */ 6302);
/* harmony import */ var _util_base64url_js__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./util/base64url.js */ 374);
































/***/ }),

/***/ 6808:
/*!***************************************************************!*\
  !*** ./node_modules/jose/dist/browser/jwe/compact/decrypt.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   compactDecrypt: () => (/* binding */ compactDecrypt)
/* harmony export */ });
/* harmony import */ var _Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 1670);
/* harmony import */ var _flattened_decrypt_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../flattened/decrypt.js */ 9438);
/* harmony import */ var _util_errors_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../util/errors.js */ 581);
/* harmony import */ var _lib_buffer_utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../lib/buffer_utils.js */ 1088);




function compactDecrypt(_x, _x2, _x3) {
  return _compactDecrypt.apply(this, arguments);
}
function _compactDecrypt() {
  _compactDecrypt = (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (jwe, key, options) {
    if (jwe instanceof Uint8Array) {
      jwe = _lib_buffer_utils_js__WEBPACK_IMPORTED_MODULE_3__.decoder.decode(jwe);
    }
    if (typeof jwe !== 'string') {
      throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_2__.JWEInvalid('Compact JWE must be a string or Uint8Array');
    }
    const {
      0: protectedHeader,
      1: encryptedKey,
      2: iv,
      3: ciphertext,
      4: tag,
      length
    } = jwe.split('.');
    if (length !== 5) {
      throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_2__.JWEInvalid('Invalid Compact JWE');
    }
    const decrypted = yield (0,_flattened_decrypt_js__WEBPACK_IMPORTED_MODULE_1__.flattenedDecrypt)({
      ciphertext,
      iv: iv || undefined,
      protected: protectedHeader || undefined,
      tag: tag || undefined,
      encrypted_key: encryptedKey || undefined
    }, key, options);
    const result = {
      plaintext: decrypted.plaintext,
      protectedHeader: decrypted.protectedHeader
    };
    if (typeof key === 'function') {
      return {
        ...result,
        key: decrypted.key
      };
    }
    return result;
  });
  return _compactDecrypt.apply(this, arguments);
}

/***/ }),

/***/ 5108:
/*!***************************************************************!*\
  !*** ./node_modules/jose/dist/browser/jwe/compact/encrypt.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CompactEncrypt: () => (/* binding */ CompactEncrypt)
/* harmony export */ });
/* harmony import */ var _Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 1670);
/* harmony import */ var _flattened_encrypt_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../flattened/encrypt.js */ 7507);


class CompactEncrypt {
  constructor(plaintext) {
    this._flattened = new _flattened_encrypt_js__WEBPACK_IMPORTED_MODULE_1__.FlattenedEncrypt(plaintext);
  }
  setContentEncryptionKey(cek) {
    this._flattened.setContentEncryptionKey(cek);
    return this;
  }
  setInitializationVector(iv) {
    this._flattened.setInitializationVector(iv);
    return this;
  }
  setProtectedHeader(protectedHeader) {
    this._flattened.setProtectedHeader(protectedHeader);
    return this;
  }
  setKeyManagementParameters(parameters) {
    this._flattened.setKeyManagementParameters(parameters);
    return this;
  }
  encrypt(key, options) {
    var _this = this;
    return (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const jwe = yield _this._flattened.encrypt(key, options);
      return [jwe.protected, jwe.encrypted_key, jwe.iv, jwe.ciphertext, jwe.tag].join('.');
    })();
  }
}

/***/ }),

/***/ 9438:
/*!*****************************************************************!*\
  !*** ./node_modules/jose/dist/browser/jwe/flattened/decrypt.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   flattenedDecrypt: () => (/* binding */ flattenedDecrypt)
/* harmony export */ });
/* harmony import */ var _Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 1670);
/* harmony import */ var _runtime_base64url_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../runtime/base64url.js */ 9485);
/* harmony import */ var _runtime_decrypt_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../runtime/decrypt.js */ 56);
/* harmony import */ var _runtime_zlib_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../runtime/zlib.js */ 2516);
/* harmony import */ var _util_errors_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../util/errors.js */ 581);
/* harmony import */ var _lib_is_disjoint_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../lib/is_disjoint.js */ 6411);
/* harmony import */ var _lib_is_object_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../lib/is_object.js */ 7157);
/* harmony import */ var _lib_decrypt_key_management_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../lib/decrypt_key_management.js */ 7625);
/* harmony import */ var _lib_buffer_utils_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../lib/buffer_utils.js */ 1088);
/* harmony import */ var _lib_cek_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../lib/cek.js */ 9335);
/* harmony import */ var _lib_validate_crit_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../lib/validate_crit.js */ 8859);
/* harmony import */ var _lib_validate_algorithms_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../lib/validate_algorithms.js */ 652);












function flattenedDecrypt(_x, _x2, _x3) {
  return _flattenedDecrypt.apply(this, arguments);
}
function _flattenedDecrypt() {
  _flattenedDecrypt = (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (jwe, key, options) {
    var _a;
    if (!(0,_lib_is_object_js__WEBPACK_IMPORTED_MODULE_6__["default"])(jwe)) {
      throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_4__.JWEInvalid('Flattened JWE must be an object');
    }
    if (jwe.protected === undefined && jwe.header === undefined && jwe.unprotected === undefined) {
      throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_4__.JWEInvalid('JOSE Header missing');
    }
    if (typeof jwe.iv !== 'string') {
      throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_4__.JWEInvalid('JWE Initialization Vector missing or incorrect type');
    }
    if (typeof jwe.ciphertext !== 'string') {
      throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_4__.JWEInvalid('JWE Ciphertext missing or incorrect type');
    }
    if (typeof jwe.tag !== 'string') {
      throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_4__.JWEInvalid('JWE Authentication Tag missing or incorrect type');
    }
    if (jwe.protected !== undefined && typeof jwe.protected !== 'string') {
      throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_4__.JWEInvalid('JWE Protected Header incorrect type');
    }
    if (jwe.encrypted_key !== undefined && typeof jwe.encrypted_key !== 'string') {
      throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_4__.JWEInvalid('JWE Encrypted Key incorrect type');
    }
    if (jwe.aad !== undefined && typeof jwe.aad !== 'string') {
      throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_4__.JWEInvalid('JWE AAD incorrect type');
    }
    if (jwe.header !== undefined && !(0,_lib_is_object_js__WEBPACK_IMPORTED_MODULE_6__["default"])(jwe.header)) {
      throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_4__.JWEInvalid('JWE Shared Unprotected Header incorrect type');
    }
    if (jwe.unprotected !== undefined && !(0,_lib_is_object_js__WEBPACK_IMPORTED_MODULE_6__["default"])(jwe.unprotected)) {
      throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_4__.JWEInvalid('JWE Per-Recipient Unprotected Header incorrect type');
    }
    let parsedProt;
    if (jwe.protected) {
      try {
        const protectedHeader = (0,_runtime_base64url_js__WEBPACK_IMPORTED_MODULE_1__.decode)(jwe.protected);
        parsedProt = JSON.parse(_lib_buffer_utils_js__WEBPACK_IMPORTED_MODULE_8__.decoder.decode(protectedHeader));
      } catch (_b) {
        throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_4__.JWEInvalid('JWE Protected Header is invalid');
      }
    }
    if (!(0,_lib_is_disjoint_js__WEBPACK_IMPORTED_MODULE_5__["default"])(parsedProt, jwe.header, jwe.unprotected)) {
      throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_4__.JWEInvalid('JWE Protected, JWE Unprotected Header, and JWE Per-Recipient Unprotected Header Parameter names must be disjoint');
    }
    const joseHeader = {
      ...parsedProt,
      ...jwe.header,
      ...jwe.unprotected
    };
    (0,_lib_validate_crit_js__WEBPACK_IMPORTED_MODULE_10__["default"])(_util_errors_js__WEBPACK_IMPORTED_MODULE_4__.JWEInvalid, new Map(), options === null || options === void 0 ? void 0 : options.crit, parsedProt, joseHeader);
    if (joseHeader.zip !== undefined) {
      if (!parsedProt || !parsedProt.zip) {
        throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_4__.JWEInvalid('JWE "zip" (Compression Algorithm) Header MUST be integrity protected');
      }
      if (joseHeader.zip !== 'DEF') {
        throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_4__.JOSENotSupported('Unsupported JWE "zip" (Compression Algorithm) Header Parameter value');
      }
    }
    const {
      alg,
      enc
    } = joseHeader;
    if (typeof alg !== 'string' || !alg) {
      throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_4__.JWEInvalid('missing JWE Algorithm (alg) in JWE Header');
    }
    if (typeof enc !== 'string' || !enc) {
      throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_4__.JWEInvalid('missing JWE Encryption Algorithm (enc) in JWE Header');
    }
    const keyManagementAlgorithms = options && (0,_lib_validate_algorithms_js__WEBPACK_IMPORTED_MODULE_11__["default"])('keyManagementAlgorithms', options.keyManagementAlgorithms);
    const contentEncryptionAlgorithms = options && (0,_lib_validate_algorithms_js__WEBPACK_IMPORTED_MODULE_11__["default"])('contentEncryptionAlgorithms', options.contentEncryptionAlgorithms);
    if (keyManagementAlgorithms && !keyManagementAlgorithms.has(alg)) {
      throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_4__.JOSEAlgNotAllowed('"alg" (Algorithm) Header Parameter not allowed');
    }
    if (contentEncryptionAlgorithms && !contentEncryptionAlgorithms.has(enc)) {
      throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_4__.JOSEAlgNotAllowed('"enc" (Encryption Algorithm) Header Parameter not allowed');
    }
    let encryptedKey;
    if (jwe.encrypted_key !== undefined) {
      encryptedKey = (0,_runtime_base64url_js__WEBPACK_IMPORTED_MODULE_1__.decode)(jwe.encrypted_key);
    }
    let resolvedKey = false;
    if (typeof key === 'function') {
      key = yield key(parsedProt, jwe);
      resolvedKey = true;
    }
    let cek;
    try {
      cek = yield (0,_lib_decrypt_key_management_js__WEBPACK_IMPORTED_MODULE_7__["default"])(alg, key, encryptedKey, joseHeader, options);
    } catch (err) {
      if (err instanceof TypeError || err instanceof _util_errors_js__WEBPACK_IMPORTED_MODULE_4__.JWEInvalid || err instanceof _util_errors_js__WEBPACK_IMPORTED_MODULE_4__.JOSENotSupported) {
        throw err;
      }
      cek = (0,_lib_cek_js__WEBPACK_IMPORTED_MODULE_9__["default"])(enc);
    }
    const iv = (0,_runtime_base64url_js__WEBPACK_IMPORTED_MODULE_1__.decode)(jwe.iv);
    const tag = (0,_runtime_base64url_js__WEBPACK_IMPORTED_MODULE_1__.decode)(jwe.tag);
    const protectedHeader = _lib_buffer_utils_js__WEBPACK_IMPORTED_MODULE_8__.encoder.encode((_a = jwe.protected) !== null && _a !== void 0 ? _a : '');
    let additionalData;
    if (jwe.aad !== undefined) {
      additionalData = (0,_lib_buffer_utils_js__WEBPACK_IMPORTED_MODULE_8__.concat)(protectedHeader, _lib_buffer_utils_js__WEBPACK_IMPORTED_MODULE_8__.encoder.encode('.'), _lib_buffer_utils_js__WEBPACK_IMPORTED_MODULE_8__.encoder.encode(jwe.aad));
    } else {
      additionalData = protectedHeader;
    }
    let plaintext = yield (0,_runtime_decrypt_js__WEBPACK_IMPORTED_MODULE_2__["default"])(enc, cek, (0,_runtime_base64url_js__WEBPACK_IMPORTED_MODULE_1__.decode)(jwe.ciphertext), iv, tag, additionalData);
    if (joseHeader.zip === 'DEF') {
      plaintext = yield ((options === null || options === void 0 ? void 0 : options.inflateRaw) || _runtime_zlib_js__WEBPACK_IMPORTED_MODULE_3__.inflate)(plaintext);
    }
    const result = {
      plaintext
    };
    if (jwe.protected !== undefined) {
      result.protectedHeader = parsedProt;
    }
    if (jwe.aad !== undefined) {
      result.additionalAuthenticatedData = (0,_runtime_base64url_js__WEBPACK_IMPORTED_MODULE_1__.decode)(jwe.aad);
    }
    if (jwe.unprotected !== undefined) {
      result.sharedUnprotectedHeader = jwe.unprotected;
    }
    if (jwe.header !== undefined) {
      result.unprotectedHeader = jwe.header;
    }
    if (resolvedKey) {
      return {
        ...result,
        key
      };
    }
    return result;
  });
  return _flattenedDecrypt.apply(this, arguments);
}

/***/ }),

/***/ 7507:
/*!*****************************************************************!*\
  !*** ./node_modules/jose/dist/browser/jwe/flattened/encrypt.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FlattenedEncrypt: () => (/* binding */ FlattenedEncrypt),
/* harmony export */   unprotected: () => (/* binding */ unprotected)
/* harmony export */ });
/* harmony import */ var _Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 1670);
/* harmony import */ var _runtime_base64url_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../runtime/base64url.js */ 9485);
/* harmony import */ var _runtime_encrypt_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../runtime/encrypt.js */ 9562);
/* harmony import */ var _runtime_zlib_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../runtime/zlib.js */ 2516);
/* harmony import */ var _lib_iv_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../lib/iv.js */ 3763);
/* harmony import */ var _lib_encrypt_key_management_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../lib/encrypt_key_management.js */ 2542);
/* harmony import */ var _util_errors_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../util/errors.js */ 581);
/* harmony import */ var _lib_is_disjoint_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../lib/is_disjoint.js */ 6411);
/* harmony import */ var _lib_buffer_utils_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../lib/buffer_utils.js */ 1088);
/* harmony import */ var _lib_validate_crit_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../lib/validate_crit.js */ 8859);










const unprotected = Symbol();
class FlattenedEncrypt {
  constructor(plaintext) {
    if (!(plaintext instanceof Uint8Array)) {
      throw new TypeError('plaintext must be an instance of Uint8Array');
    }
    this._plaintext = plaintext;
  }
  setKeyManagementParameters(parameters) {
    if (this._keyManagementParameters) {
      throw new TypeError('setKeyManagementParameters can only be called once');
    }
    this._keyManagementParameters = parameters;
    return this;
  }
  setProtectedHeader(protectedHeader) {
    if (this._protectedHeader) {
      throw new TypeError('setProtectedHeader can only be called once');
    }
    this._protectedHeader = protectedHeader;
    return this;
  }
  setSharedUnprotectedHeader(sharedUnprotectedHeader) {
    if (this._sharedUnprotectedHeader) {
      throw new TypeError('setSharedUnprotectedHeader can only be called once');
    }
    this._sharedUnprotectedHeader = sharedUnprotectedHeader;
    return this;
  }
  setUnprotectedHeader(unprotectedHeader) {
    if (this._unprotectedHeader) {
      throw new TypeError('setUnprotectedHeader can only be called once');
    }
    this._unprotectedHeader = unprotectedHeader;
    return this;
  }
  setAdditionalAuthenticatedData(aad) {
    this._aad = aad;
    return this;
  }
  setContentEncryptionKey(cek) {
    if (this._cek) {
      throw new TypeError('setContentEncryptionKey can only be called once');
    }
    this._cek = cek;
    return this;
  }
  setInitializationVector(iv) {
    if (this._iv) {
      throw new TypeError('setInitializationVector can only be called once');
    }
    this._iv = iv;
    return this;
  }
  encrypt(key, options) {
    var _this = this;
    return (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (!_this._protectedHeader && !_this._unprotectedHeader && !_this._sharedUnprotectedHeader) {
        throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_6__.JWEInvalid('either setProtectedHeader, setUnprotectedHeader, or sharedUnprotectedHeader must be called before #encrypt()');
      }
      if (!(0,_lib_is_disjoint_js__WEBPACK_IMPORTED_MODULE_7__["default"])(_this._protectedHeader, _this._unprotectedHeader, _this._sharedUnprotectedHeader)) {
        throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_6__.JWEInvalid('JWE Protected, JWE Shared Unprotected and JWE Per-Recipient Header Parameter names must be disjoint');
      }
      const joseHeader = {
        ..._this._protectedHeader,
        ..._this._unprotectedHeader,
        ..._this._sharedUnprotectedHeader
      };
      (0,_lib_validate_crit_js__WEBPACK_IMPORTED_MODULE_9__["default"])(_util_errors_js__WEBPACK_IMPORTED_MODULE_6__.JWEInvalid, new Map(), options === null || options === void 0 ? void 0 : options.crit, _this._protectedHeader, joseHeader);
      if (joseHeader.zip !== undefined) {
        if (!_this._protectedHeader || !_this._protectedHeader.zip) {
          throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_6__.JWEInvalid('JWE "zip" (Compression Algorithm) Header MUST be integrity protected');
        }
        if (joseHeader.zip !== 'DEF') {
          throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_6__.JOSENotSupported('Unsupported JWE "zip" (Compression Algorithm) Header Parameter value');
        }
      }
      const {
        alg,
        enc
      } = joseHeader;
      if (typeof alg !== 'string' || !alg) {
        throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_6__.JWEInvalid('JWE "alg" (Algorithm) Header Parameter missing or invalid');
      }
      if (typeof enc !== 'string' || !enc) {
        throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_6__.JWEInvalid('JWE "enc" (Encryption Algorithm) Header Parameter missing or invalid');
      }
      let encryptedKey;
      if (alg === 'dir') {
        if (_this._cek) {
          throw new TypeError('setContentEncryptionKey cannot be called when using Direct Encryption');
        }
      } else if (alg === 'ECDH-ES') {
        if (_this._cek) {
          throw new TypeError('setContentEncryptionKey cannot be called when using Direct Key Agreement');
        }
      }
      let cek;
      {
        let parameters;
        ({
          cek,
          encryptedKey,
          parameters
        } = yield (0,_lib_encrypt_key_management_js__WEBPACK_IMPORTED_MODULE_5__["default"])(alg, enc, key, _this._cek, _this._keyManagementParameters));
        if (parameters) {
          if (options && unprotected in options) {
            if (!_this._unprotectedHeader) {
              _this.setUnprotectedHeader(parameters);
            } else {
              _this._unprotectedHeader = {
                ..._this._unprotectedHeader,
                ...parameters
              };
            }
          } else {
            if (!_this._protectedHeader) {
              _this.setProtectedHeader(parameters);
            } else {
              _this._protectedHeader = {
                ..._this._protectedHeader,
                ...parameters
              };
            }
          }
        }
      }
      _this._iv || (_this._iv = (0,_lib_iv_js__WEBPACK_IMPORTED_MODULE_4__["default"])(enc));
      let additionalData;
      let protectedHeader;
      let aadMember;
      if (_this._protectedHeader) {
        protectedHeader = _lib_buffer_utils_js__WEBPACK_IMPORTED_MODULE_8__.encoder.encode((0,_runtime_base64url_js__WEBPACK_IMPORTED_MODULE_1__.encode)(JSON.stringify(_this._protectedHeader)));
      } else {
        protectedHeader = _lib_buffer_utils_js__WEBPACK_IMPORTED_MODULE_8__.encoder.encode('');
      }
      if (_this._aad) {
        aadMember = (0,_runtime_base64url_js__WEBPACK_IMPORTED_MODULE_1__.encode)(_this._aad);
        additionalData = (0,_lib_buffer_utils_js__WEBPACK_IMPORTED_MODULE_8__.concat)(protectedHeader, _lib_buffer_utils_js__WEBPACK_IMPORTED_MODULE_8__.encoder.encode('.'), _lib_buffer_utils_js__WEBPACK_IMPORTED_MODULE_8__.encoder.encode(aadMember));
      } else {
        additionalData = protectedHeader;
      }
      let ciphertext;
      let tag;
      if (joseHeader.zip === 'DEF') {
        const deflated = yield ((options === null || options === void 0 ? void 0 : options.deflateRaw) || _runtime_zlib_js__WEBPACK_IMPORTED_MODULE_3__.deflate)(_this._plaintext);
        ({
          ciphertext,
          tag
        } = yield (0,_runtime_encrypt_js__WEBPACK_IMPORTED_MODULE_2__["default"])(enc, deflated, cek, _this._iv, additionalData));
      } else {
        ;
        ({
          ciphertext,
          tag
        } = yield (0,_runtime_encrypt_js__WEBPACK_IMPORTED_MODULE_2__["default"])(enc, _this._plaintext, cek, _this._iv, additionalData));
      }
      const jwe = {
        ciphertext: (0,_runtime_base64url_js__WEBPACK_IMPORTED_MODULE_1__.encode)(ciphertext),
        iv: (0,_runtime_base64url_js__WEBPACK_IMPORTED_MODULE_1__.encode)(_this._iv),
        tag: (0,_runtime_base64url_js__WEBPACK_IMPORTED_MODULE_1__.encode)(tag)
      };
      if (encryptedKey) {
        jwe.encrypted_key = (0,_runtime_base64url_js__WEBPACK_IMPORTED_MODULE_1__.encode)(encryptedKey);
      }
      if (aadMember) {
        jwe.aad = aadMember;
      }
      if (_this._protectedHeader) {
        jwe.protected = _lib_buffer_utils_js__WEBPACK_IMPORTED_MODULE_8__.decoder.decode(protectedHeader);
      }
      if (_this._sharedUnprotectedHeader) {
        jwe.unprotected = _this._sharedUnprotectedHeader;
      }
      if (_this._unprotectedHeader) {
        jwe.header = _this._unprotectedHeader;
      }
      return jwe;
    })();
  }
}

/***/ }),

/***/ 8420:
/*!***************************************************************!*\
  !*** ./node_modules/jose/dist/browser/jwe/general/decrypt.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   generalDecrypt: () => (/* binding */ generalDecrypt)
/* harmony export */ });
/* harmony import */ var _Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 1670);
/* harmony import */ var _flattened_decrypt_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../flattened/decrypt.js */ 9438);
/* harmony import */ var _util_errors_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../util/errors.js */ 581);
/* harmony import */ var _lib_is_object_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../lib/is_object.js */ 7157);




function generalDecrypt(_x, _x2, _x3) {
  return _generalDecrypt.apply(this, arguments);
}
function _generalDecrypt() {
  _generalDecrypt = (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (jwe, key, options) {
    if (!(0,_lib_is_object_js__WEBPACK_IMPORTED_MODULE_3__["default"])(jwe)) {
      throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_2__.JWEInvalid('General JWE must be an object');
    }
    if (!Array.isArray(jwe.recipients) || !jwe.recipients.every(_lib_is_object_js__WEBPACK_IMPORTED_MODULE_3__["default"])) {
      throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_2__.JWEInvalid('JWE Recipients missing or incorrect type');
    }
    if (!jwe.recipients.length) {
      throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_2__.JWEInvalid('JWE Recipients has no members');
    }
    for (const recipient of jwe.recipients) {
      try {
        return yield (0,_flattened_decrypt_js__WEBPACK_IMPORTED_MODULE_1__.flattenedDecrypt)({
          aad: jwe.aad,
          ciphertext: jwe.ciphertext,
          encrypted_key: recipient.encrypted_key,
          header: recipient.header,
          iv: jwe.iv,
          protected: jwe.protected,
          tag: jwe.tag,
          unprotected: jwe.unprotected
        }, key, options);
      } catch (_a) {}
    }
    throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_2__.JWEDecryptionFailed();
  });
  return _generalDecrypt.apply(this, arguments);
}

/***/ }),

/***/ 5266:
/*!***************************************************************!*\
  !*** ./node_modules/jose/dist/browser/jwe/general/encrypt.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GeneralEncrypt: () => (/* binding */ GeneralEncrypt)
/* harmony export */ });
/* harmony import */ var _Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 1670);
/* harmony import */ var _flattened_encrypt_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../flattened/encrypt.js */ 7507);
/* harmony import */ var _util_errors_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../util/errors.js */ 581);
/* harmony import */ var _lib_cek_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../lib/cek.js */ 9335);
/* harmony import */ var _lib_is_disjoint_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../lib/is_disjoint.js */ 6411);
/* harmony import */ var _lib_encrypt_key_management_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../lib/encrypt_key_management.js */ 2542);
/* harmony import */ var _runtime_base64url_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../runtime/base64url.js */ 9485);
/* harmony import */ var _lib_validate_crit_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../lib/validate_crit.js */ 8859);








class IndividualRecipient {
  constructor(enc, key, options) {
    this.parent = enc;
    this.key = key;
    this.options = options;
  }
  setUnprotectedHeader(unprotectedHeader) {
    if (this.unprotectedHeader) {
      throw new TypeError('setUnprotectedHeader can only be called once');
    }
    this.unprotectedHeader = unprotectedHeader;
    return this;
  }
  addRecipient(...args) {
    return this.parent.addRecipient(...args);
  }
  encrypt(...args) {
    return this.parent.encrypt(...args);
  }
  done() {
    return this.parent;
  }
}
class GeneralEncrypt {
  constructor(plaintext) {
    this._recipients = [];
    this._plaintext = plaintext;
  }
  addRecipient(key, options) {
    const recipient = new IndividualRecipient(this, key, {
      crit: options === null || options === void 0 ? void 0 : options.crit
    });
    this._recipients.push(recipient);
    return recipient;
  }
  setProtectedHeader(protectedHeader) {
    if (this._protectedHeader) {
      throw new TypeError('setProtectedHeader can only be called once');
    }
    this._protectedHeader = protectedHeader;
    return this;
  }
  setSharedUnprotectedHeader(sharedUnprotectedHeader) {
    if (this._unprotectedHeader) {
      throw new TypeError('setSharedUnprotectedHeader can only be called once');
    }
    this._unprotectedHeader = sharedUnprotectedHeader;
    return this;
  }
  setAdditionalAuthenticatedData(aad) {
    this._aad = aad;
    return this;
  }
  encrypt(options) {
    var _this = this;
    return (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      var _a, _b, _c;
      if (!_this._recipients.length) {
        throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_2__.JWEInvalid('at least one recipient must be added');
      }
      options = {
        deflateRaw: options === null || options === void 0 ? void 0 : options.deflateRaw
      };
      if (_this._recipients.length === 1) {
        const [recipient] = _this._recipients;
        const flattened = yield new _flattened_encrypt_js__WEBPACK_IMPORTED_MODULE_1__.FlattenedEncrypt(_this._plaintext).setAdditionalAuthenticatedData(_this._aad).setProtectedHeader(_this._protectedHeader).setSharedUnprotectedHeader(_this._unprotectedHeader).setUnprotectedHeader(recipient.unprotectedHeader).encrypt(recipient.key, {
          ...recipient.options,
          ...options
        });
        let jwe = {
          ciphertext: flattened.ciphertext,
          iv: flattened.iv,
          recipients: [{}],
          tag: flattened.tag
        };
        if (flattened.aad) jwe.aad = flattened.aad;
        if (flattened.protected) jwe.protected = flattened.protected;
        if (flattened.unprotected) jwe.unprotected = flattened.unprotected;
        if (flattened.encrypted_key) jwe.recipients[0].encrypted_key = flattened.encrypted_key;
        if (flattened.header) jwe.recipients[0].header = flattened.header;
        return jwe;
      }
      let enc;
      for (let i = 0; i < _this._recipients.length; i++) {
        const recipient = _this._recipients[i];
        if (!(0,_lib_is_disjoint_js__WEBPACK_IMPORTED_MODULE_4__["default"])(_this._protectedHeader, _this._unprotectedHeader, recipient.unprotectedHeader)) {
          throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_2__.JWEInvalid('JWE Protected, JWE Shared Unprotected and JWE Per-Recipient Header Parameter names must be disjoint');
        }
        const joseHeader = {
          ..._this._protectedHeader,
          ..._this._unprotectedHeader,
          ...recipient.unprotectedHeader
        };
        const {
          alg
        } = joseHeader;
        if (typeof alg !== 'string' || !alg) {
          throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_2__.JWEInvalid('JWE "alg" (Algorithm) Header Parameter missing or invalid');
        }
        if (alg === 'dir' || alg === 'ECDH-ES') {
          throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_2__.JWEInvalid('"dir" and "ECDH-ES" alg may only be used with a single recipient');
        }
        if (typeof joseHeader.enc !== 'string' || !joseHeader.enc) {
          throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_2__.JWEInvalid('JWE "enc" (Encryption Algorithm) Header Parameter missing or invalid');
        }
        if (!enc) {
          enc = joseHeader.enc;
        } else if (enc !== joseHeader.enc) {
          throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_2__.JWEInvalid('JWE "enc" (Encryption Algorithm) Header Parameter must be the same for all recipients');
        }
        (0,_lib_validate_crit_js__WEBPACK_IMPORTED_MODULE_7__["default"])(_util_errors_js__WEBPACK_IMPORTED_MODULE_2__.JWEInvalid, new Map(), recipient.options.crit, _this._protectedHeader, joseHeader);
        if (joseHeader.zip !== undefined) {
          if (!_this._protectedHeader || !_this._protectedHeader.zip) {
            throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_2__.JWEInvalid('JWE "zip" (Compression Algorithm) Header MUST be integrity protected');
          }
        }
      }
      const cek = (0,_lib_cek_js__WEBPACK_IMPORTED_MODULE_3__["default"])(enc);
      let jwe = {
        ciphertext: '',
        iv: '',
        recipients: [],
        tag: ''
      };
      for (let i = 0; i < _this._recipients.length; i++) {
        const recipient = _this._recipients[i];
        const target = {};
        jwe.recipients.push(target);
        const joseHeader = {
          ..._this._protectedHeader,
          ..._this._unprotectedHeader,
          ...recipient.unprotectedHeader
        };
        const p2c = joseHeader.alg.startsWith('PBES2') ? 2048 + i : undefined;
        if (i === 0) {
          const flattened = yield new _flattened_encrypt_js__WEBPACK_IMPORTED_MODULE_1__.FlattenedEncrypt(_this._plaintext).setAdditionalAuthenticatedData(_this._aad).setContentEncryptionKey(cek).setProtectedHeader(_this._protectedHeader).setSharedUnprotectedHeader(_this._unprotectedHeader).setUnprotectedHeader(recipient.unprotectedHeader).setKeyManagementParameters({
            p2c
          }).encrypt(recipient.key, {
            ...recipient.options,
            ...options,
            [_flattened_encrypt_js__WEBPACK_IMPORTED_MODULE_1__.unprotected]: true
          });
          jwe.ciphertext = flattened.ciphertext;
          jwe.iv = flattened.iv;
          jwe.tag = flattened.tag;
          if (flattened.aad) jwe.aad = flattened.aad;
          if (flattened.protected) jwe.protected = flattened.protected;
          if (flattened.unprotected) jwe.unprotected = flattened.unprotected;
          target.encrypted_key = flattened.encrypted_key;
          if (flattened.header) target.header = flattened.header;
          continue;
        }
        const {
          encryptedKey,
          parameters
        } = yield (0,_lib_encrypt_key_management_js__WEBPACK_IMPORTED_MODULE_5__["default"])(((_a = recipient.unprotectedHeader) === null || _a === void 0 ? void 0 : _a.alg) || ((_b = _this._protectedHeader) === null || _b === void 0 ? void 0 : _b.alg) || ((_c = _this._unprotectedHeader) === null || _c === void 0 ? void 0 : _c.alg), enc, recipient.key, cek, {
          p2c
        });
        target.encrypted_key = (0,_runtime_base64url_js__WEBPACK_IMPORTED_MODULE_6__.encode)(encryptedKey);
        if (recipient.unprotectedHeader || parameters) target.header = {
          ...recipient.unprotectedHeader,
          ...parameters
        };
      }
      return jwe;
    })();
  }
}

/***/ }),

/***/ 6958:
/*!********************************************************!*\
  !*** ./node_modules/jose/dist/browser/jwk/embedded.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EmbeddedJWK: () => (/* binding */ EmbeddedJWK)
/* harmony export */ });
/* harmony import */ var _Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 1670);
/* harmony import */ var _key_import_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../key/import.js */ 6606);
/* harmony import */ var _lib_is_object_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/is_object.js */ 7157);
/* harmony import */ var _util_errors_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util/errors.js */ 581);




function EmbeddedJWK(_x, _x2) {
  return _EmbeddedJWK.apply(this, arguments);
}
function _EmbeddedJWK() {
  _EmbeddedJWK = (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (protectedHeader, token) {
    const joseHeader = {
      ...protectedHeader,
      ...(token === null || token === void 0 ? void 0 : token.header)
    };
    if (!(0,_lib_is_object_js__WEBPACK_IMPORTED_MODULE_2__["default"])(joseHeader.jwk)) {
      throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_3__.JWSInvalid('"jwk" (JSON Web Key) Header Parameter must be a JSON object');
    }
    const key = yield (0,_key_import_js__WEBPACK_IMPORTED_MODULE_1__.importJWK)({
      ...joseHeader.jwk,
      ext: true
    }, joseHeader.alg, true);
    if (key instanceof Uint8Array || key.type !== 'public') {
      throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_3__.JWSInvalid('"jwk" (JSON Web Key) Header Parameter must be a public key');
    }
    return key;
  });
  return _EmbeddedJWK.apply(this, arguments);
}

/***/ }),

/***/ 8242:
/*!**********************************************************!*\
  !*** ./node_modules/jose/dist/browser/jwk/thumbprint.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   calculateJwkThumbprint: () => (/* binding */ calculateJwkThumbprint),
/* harmony export */   calculateJwkThumbprintUri: () => (/* binding */ calculateJwkThumbprintUri)
/* harmony export */ });
/* harmony import */ var _Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 1670);
/* harmony import */ var _runtime_digest_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../runtime/digest.js */ 1996);
/* harmony import */ var _runtime_base64url_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../runtime/base64url.js */ 9485);
/* harmony import */ var _util_errors_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util/errors.js */ 581);
/* harmony import */ var _lib_buffer_utils_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../lib/buffer_utils.js */ 1088);
/* harmony import */ var _lib_is_object_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../lib/is_object.js */ 7157);






const check = (value, description) => {
  if (typeof value !== 'string' || !value) {
    throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_3__.JWKInvalid(`${description} missing or invalid`);
  }
};
function calculateJwkThumbprint(_x, _x2) {
  return _calculateJwkThumbprint.apply(this, arguments);
}
function _calculateJwkThumbprint() {
  _calculateJwkThumbprint = (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (jwk, digestAlgorithm) {
    if (!(0,_lib_is_object_js__WEBPACK_IMPORTED_MODULE_5__["default"])(jwk)) {
      throw new TypeError('JWK must be an object');
    }
    digestAlgorithm !== null && digestAlgorithm !== void 0 ? digestAlgorithm : digestAlgorithm = 'sha256';
    if (digestAlgorithm !== 'sha256' && digestAlgorithm !== 'sha384' && digestAlgorithm !== 'sha512') {
      throw new TypeError('digestAlgorithm must one of "sha256", "sha384", or "sha512"');
    }
    let components;
    switch (jwk.kty) {
      case 'EC':
        check(jwk.crv, '"crv" (Curve) Parameter');
        check(jwk.x, '"x" (X Coordinate) Parameter');
        check(jwk.y, '"y" (Y Coordinate) Parameter');
        components = {
          crv: jwk.crv,
          kty: jwk.kty,
          x: jwk.x,
          y: jwk.y
        };
        break;
      case 'OKP':
        check(jwk.crv, '"crv" (Subtype of Key Pair) Parameter');
        check(jwk.x, '"x" (Public Key) Parameter');
        components = {
          crv: jwk.crv,
          kty: jwk.kty,
          x: jwk.x
        };
        break;
      case 'RSA':
        check(jwk.e, '"e" (Exponent) Parameter');
        check(jwk.n, '"n" (Modulus) Parameter');
        components = {
          e: jwk.e,
          kty: jwk.kty,
          n: jwk.n
        };
        break;
      case 'oct':
        check(jwk.k, '"k" (Key Value) Parameter');
        components = {
          k: jwk.k,
          kty: jwk.kty
        };
        break;
      default:
        throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_3__.JOSENotSupported('"kty" (Key Type) Parameter missing or unsupported');
    }
    const data = _lib_buffer_utils_js__WEBPACK_IMPORTED_MODULE_4__.encoder.encode(JSON.stringify(components));
    return (0,_runtime_base64url_js__WEBPACK_IMPORTED_MODULE_2__.encode)(yield (0,_runtime_digest_js__WEBPACK_IMPORTED_MODULE_1__["default"])(digestAlgorithm, data));
  });
  return _calculateJwkThumbprint.apply(this, arguments);
}
function calculateJwkThumbprintUri(_x3, _x4) {
  return _calculateJwkThumbprintUri.apply(this, arguments);
}
function _calculateJwkThumbprintUri() {
  _calculateJwkThumbprintUri = (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (jwk, digestAlgorithm) {
    digestAlgorithm !== null && digestAlgorithm !== void 0 ? digestAlgorithm : digestAlgorithm = 'sha256';
    const thumbprint = yield calculateJwkThumbprint(jwk, digestAlgorithm);
    return `urn:ietf:params:oauth:jwk-thumbprint:sha-${digestAlgorithm.slice(-3)}:${thumbprint}`;
  });
  return _calculateJwkThumbprintUri.apply(this, arguments);
}

/***/ }),

/***/ 8232:
/*!******************************************************!*\
  !*** ./node_modules/jose/dist/browser/jwks/local.js ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LocalJWKSet: () => (/* binding */ LocalJWKSet),
/* harmony export */   createLocalJWKSet: () => (/* binding */ createLocalJWKSet),
/* harmony export */   isJWKSLike: () => (/* binding */ isJWKSLike)
/* harmony export */ });
/* harmony import */ var _Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 1670);
/* harmony import */ var _Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_awaitAsyncGenerator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/awaitAsyncGenerator.js */ 7535);
/* harmony import */ var _Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_wrapAsyncGenerator_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/wrapAsyncGenerator.js */ 6865);
/* harmony import */ var _key_import_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../key/import.js */ 6606);
/* harmony import */ var _util_errors_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../util/errors.js */ 581);
/* harmony import */ var _lib_is_object_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../lib/is_object.js */ 7157);






function getKtyFromAlg(alg) {
  switch (typeof alg === 'string' && alg.slice(0, 2)) {
    case 'RS':
    case 'PS':
      return 'RSA';
    case 'ES':
      return 'EC';
    case 'Ed':
      return 'OKP';
    default:
      throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_4__.JOSENotSupported('Unsupported "alg" value for a JSON Web Key Set');
  }
}
function isJWKSLike(jwks) {
  return jwks && typeof jwks === 'object' && Array.isArray(jwks.keys) && jwks.keys.every(isJWKLike);
}
function isJWKLike(key) {
  return (0,_lib_is_object_js__WEBPACK_IMPORTED_MODULE_5__["default"])(key);
}
function clone(obj) {
  if (typeof structuredClone === 'function') {
    return structuredClone(obj);
  }
  return JSON.parse(JSON.stringify(obj));
}
class LocalJWKSet {
  constructor(jwks) {
    this._cached = new WeakMap();
    if (!isJWKSLike(jwks)) {
      throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_4__.JWKSInvalid('JSON Web Key Set malformed');
    }
    this._jwks = clone(jwks);
  }
  getKey(protectedHeader, token) {
    var _this = this;
    return (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const {
        alg,
        kid
      } = {
        ...protectedHeader,
        ...(token === null || token === void 0 ? void 0 : token.header)
      };
      const kty = getKtyFromAlg(alg);
      const candidates = _this._jwks.keys.filter(jwk => {
        let candidate = kty === jwk.kty;
        if (candidate && typeof kid === 'string') {
          candidate = kid === jwk.kid;
        }
        if (candidate && typeof jwk.alg === 'string') {
          candidate = alg === jwk.alg;
        }
        if (candidate && typeof jwk.use === 'string') {
          candidate = jwk.use === 'sig';
        }
        if (candidate && Array.isArray(jwk.key_ops)) {
          candidate = jwk.key_ops.includes('verify');
        }
        if (candidate && alg === 'EdDSA') {
          candidate = jwk.crv === 'Ed25519' || jwk.crv === 'Ed448';
        }
        if (candidate) {
          switch (alg) {
            case 'ES256':
              candidate = jwk.crv === 'P-256';
              break;
            case 'ES256K':
              candidate = jwk.crv === 'secp256k1';
              break;
            case 'ES384':
              candidate = jwk.crv === 'P-384';
              break;
            case 'ES512':
              candidate = jwk.crv === 'P-521';
              break;
          }
        }
        return candidate;
      });
      const {
        0: jwk,
        length
      } = candidates;
      if (length === 0) {
        throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_4__.JWKSNoMatchingKey();
      } else if (length !== 1) {
        const error = new _util_errors_js__WEBPACK_IMPORTED_MODULE_4__.JWKSMultipleMatchingKeys();
        const {
          _cached
        } = _this;
        error[Symbol.asyncIterator] = /*#__PURE__*/(0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_wrapAsyncGenerator_js__WEBPACK_IMPORTED_MODULE_2__["default"])(function* () {
          for (const jwk of candidates) {
            try {
              yield yield (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_awaitAsyncGenerator_js__WEBPACK_IMPORTED_MODULE_1__["default"])(importWithAlgCache(_cached, jwk, alg));
            } catch (_a) {
              continue;
            }
          }
        });
        throw error;
      }
      return importWithAlgCache(_this._cached, jwk, alg);
    })();
  }
}
function importWithAlgCache(_x, _x2, _x3) {
  return _importWithAlgCache.apply(this, arguments);
}
function _importWithAlgCache() {
  _importWithAlgCache = (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (cache, jwk, alg) {
    const cached = cache.get(jwk) || cache.set(jwk, {}).get(jwk);
    if (cached[alg] === undefined) {
      const key = yield (0,_key_import_js__WEBPACK_IMPORTED_MODULE_3__.importJWK)({
        ...jwk,
        ext: true
      }, alg);
      if (key instanceof Uint8Array || key.type !== 'public') {
        throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_4__.JWKSInvalid('JSON Web Key Set members must be public keys');
      }
      cached[alg] = key;
    }
    return cached[alg];
  });
  return _importWithAlgCache.apply(this, arguments);
}
function createLocalJWKSet(jwks) {
  const set = new LocalJWKSet(jwks);
  return /*#__PURE__*/function () {
    var _ref2 = (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (protectedHeader, token) {
      return set.getKey(protectedHeader, token);
    });
    return function (_x4, _x5) {
      return _ref2.apply(this, arguments);
    };
  }();
}

/***/ }),

/***/ 4349:
/*!*******************************************************!*\
  !*** ./node_modules/jose/dist/browser/jwks/remote.js ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createRemoteJWKSet: () => (/* binding */ createRemoteJWKSet)
/* harmony export */ });
/* harmony import */ var _Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 1670);
/* harmony import */ var _runtime_fetch_jwks_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../runtime/fetch_jwks.js */ 2143);
/* harmony import */ var _util_errors_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/errors.js */ 581);
/* harmony import */ var _local_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./local.js */ 8232);




function isCloudflareWorkers() {
  return typeof WebSocketPair !== 'undefined' || typeof navigator !== 'undefined' && navigator.userAgent === 'Cloudflare-Workers' || typeof EdgeRuntime !== 'undefined' && EdgeRuntime === 'vercel';
}
class RemoteJWKSet extends _local_js__WEBPACK_IMPORTED_MODULE_3__.LocalJWKSet {
  constructor(url, options) {
    super({
      keys: []
    });
    this._jwks = undefined;
    if (!(url instanceof URL)) {
      throw new TypeError('url must be an instance of URL');
    }
    this._url = new URL(url.href);
    this._options = {
      agent: options === null || options === void 0 ? void 0 : options.agent,
      headers: options === null || options === void 0 ? void 0 : options.headers
    };
    this._timeoutDuration = typeof (options === null || options === void 0 ? void 0 : options.timeoutDuration) === 'number' ? options === null || options === void 0 ? void 0 : options.timeoutDuration : 5000;
    this._cooldownDuration = typeof (options === null || options === void 0 ? void 0 : options.cooldownDuration) === 'number' ? options === null || options === void 0 ? void 0 : options.cooldownDuration : 30000;
    this._cacheMaxAge = typeof (options === null || options === void 0 ? void 0 : options.cacheMaxAge) === 'number' ? options === null || options === void 0 ? void 0 : options.cacheMaxAge : 600000;
  }
  coolingDown() {
    return typeof this._jwksTimestamp === 'number' ? Date.now() < this._jwksTimestamp + this._cooldownDuration : false;
  }
  fresh() {
    return typeof this._jwksTimestamp === 'number' ? Date.now() < this._jwksTimestamp + this._cacheMaxAge : false;
  }
  getKey(protectedHeader, token) {
    var _superprop_getGetKey = () => super.getKey,
      _this = this;
    return (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (!_this._jwks || !_this.fresh()) {
        yield _this.reload();
      }
      try {
        return yield _superprop_getGetKey().call(_this, protectedHeader, token);
      } catch (err) {
        if (err instanceof _util_errors_js__WEBPACK_IMPORTED_MODULE_2__.JWKSNoMatchingKey) {
          if (_this.coolingDown() === false) {
            yield _this.reload();
            return _superprop_getGetKey().call(_this, protectedHeader, token);
          }
        }
        throw err;
      }
    })();
  }
  reload() {
    var _this2 = this;
    return (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (_this2._pendingFetch && isCloudflareWorkers()) {
        _this2._pendingFetch = undefined;
      }
      _this2._pendingFetch || (_this2._pendingFetch = (0,_runtime_fetch_jwks_js__WEBPACK_IMPORTED_MODULE_1__["default"])(_this2._url, _this2._timeoutDuration, _this2._options).then(json => {
        if (!(0,_local_js__WEBPACK_IMPORTED_MODULE_3__.isJWKSLike)(json)) {
          throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_2__.JWKSInvalid('JSON Web Key Set malformed');
        }
        _this2._jwks = {
          keys: json.keys
        };
        _this2._jwksTimestamp = Date.now();
        _this2._pendingFetch = undefined;
      }).catch(err => {
        _this2._pendingFetch = undefined;
        throw err;
      }));
      yield _this2._pendingFetch;
    })();
  }
}
function createRemoteJWKSet(url, options) {
  const set = new RemoteJWKSet(url, options);
  return /*#__PURE__*/function () {
    var _ref = (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (protectedHeader, token) {
      return set.getKey(protectedHeader, token);
    });
    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();
}

/***/ }),

/***/ 477:
/*!************************************************************!*\
  !*** ./node_modules/jose/dist/browser/jws/compact/sign.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CompactSign: () => (/* binding */ CompactSign)
/* harmony export */ });
/* harmony import */ var _Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 1670);
/* harmony import */ var _flattened_sign_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../flattened/sign.js */ 8285);


class CompactSign {
  constructor(payload) {
    this._flattened = new _flattened_sign_js__WEBPACK_IMPORTED_MODULE_1__.FlattenedSign(payload);
  }
  setProtectedHeader(protectedHeader) {
    this._flattened.setProtectedHeader(protectedHeader);
    return this;
  }
  sign(key, options) {
    var _this = this;
    return (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const jws = yield _this._flattened.sign(key, options);
      if (jws.payload === undefined) {
        throw new TypeError('use the flattened module for creating JWS with b64: false');
      }
      return `${jws.protected}.${jws.payload}.${jws.signature}`;
    })();
  }
}

/***/ }),

/***/ 3480:
/*!**************************************************************!*\
  !*** ./node_modules/jose/dist/browser/jws/compact/verify.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   compactVerify: () => (/* binding */ compactVerify)
/* harmony export */ });
/* harmony import */ var _Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 1670);
/* harmony import */ var _flattened_verify_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../flattened/verify.js */ 3217);
/* harmony import */ var _util_errors_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../util/errors.js */ 581);
/* harmony import */ var _lib_buffer_utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../lib/buffer_utils.js */ 1088);




function compactVerify(_x, _x2, _x3) {
  return _compactVerify.apply(this, arguments);
}
function _compactVerify() {
  _compactVerify = (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (jws, key, options) {
    if (jws instanceof Uint8Array) {
      jws = _lib_buffer_utils_js__WEBPACK_IMPORTED_MODULE_3__.decoder.decode(jws);
    }
    if (typeof jws !== 'string') {
      throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_2__.JWSInvalid('Compact JWS must be a string or Uint8Array');
    }
    const {
      0: protectedHeader,
      1: payload,
      2: signature,
      length
    } = jws.split('.');
    if (length !== 3) {
      throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_2__.JWSInvalid('Invalid Compact JWS');
    }
    const verified = yield (0,_flattened_verify_js__WEBPACK_IMPORTED_MODULE_1__.flattenedVerify)({
      payload,
      protected: protectedHeader,
      signature
    }, key, options);
    const result = {
      payload: verified.payload,
      protectedHeader: verified.protectedHeader
    };
    if (typeof key === 'function') {
      return {
        ...result,
        key: verified.key
      };
    }
    return result;
  });
  return _compactVerify.apply(this, arguments);
}

/***/ }),

/***/ 8285:
/*!**************************************************************!*\
  !*** ./node_modules/jose/dist/browser/jws/flattened/sign.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FlattenedSign: () => (/* binding */ FlattenedSign)
/* harmony export */ });
/* harmony import */ var _Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 1670);
/* harmony import */ var _runtime_base64url_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../runtime/base64url.js */ 9485);
/* harmony import */ var _runtime_sign_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../runtime/sign.js */ 3393);
/* harmony import */ var _lib_is_disjoint_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../lib/is_disjoint.js */ 6411);
/* harmony import */ var _util_errors_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../util/errors.js */ 581);
/* harmony import */ var _lib_buffer_utils_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../lib/buffer_utils.js */ 1088);
/* harmony import */ var _lib_check_key_type_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../lib/check_key_type.js */ 2667);
/* harmony import */ var _lib_validate_crit_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../lib/validate_crit.js */ 8859);








class FlattenedSign {
  constructor(payload) {
    if (!(payload instanceof Uint8Array)) {
      throw new TypeError('payload must be an instance of Uint8Array');
    }
    this._payload = payload;
  }
  setProtectedHeader(protectedHeader) {
    if (this._protectedHeader) {
      throw new TypeError('setProtectedHeader can only be called once');
    }
    this._protectedHeader = protectedHeader;
    return this;
  }
  setUnprotectedHeader(unprotectedHeader) {
    if (this._unprotectedHeader) {
      throw new TypeError('setUnprotectedHeader can only be called once');
    }
    this._unprotectedHeader = unprotectedHeader;
    return this;
  }
  sign(key, options) {
    var _this = this;
    return (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (!_this._protectedHeader && !_this._unprotectedHeader) {
        throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_4__.JWSInvalid('either setProtectedHeader or setUnprotectedHeader must be called before #sign()');
      }
      if (!(0,_lib_is_disjoint_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_this._protectedHeader, _this._unprotectedHeader)) {
        throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_4__.JWSInvalid('JWS Protected and JWS Unprotected Header Parameter names must be disjoint');
      }
      const joseHeader = {
        ..._this._protectedHeader,
        ..._this._unprotectedHeader
      };
      const extensions = (0,_lib_validate_crit_js__WEBPACK_IMPORTED_MODULE_7__["default"])(_util_errors_js__WEBPACK_IMPORTED_MODULE_4__.JWSInvalid, new Map([['b64', true]]), options === null || options === void 0 ? void 0 : options.crit, _this._protectedHeader, joseHeader);
      let b64 = true;
      if (extensions.has('b64')) {
        b64 = _this._protectedHeader.b64;
        if (typeof b64 !== 'boolean') {
          throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_4__.JWSInvalid('The "b64" (base64url-encode payload) Header Parameter must be a boolean');
        }
      }
      const {
        alg
      } = joseHeader;
      if (typeof alg !== 'string' || !alg) {
        throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_4__.JWSInvalid('JWS "alg" (Algorithm) Header Parameter missing or invalid');
      }
      (0,_lib_check_key_type_js__WEBPACK_IMPORTED_MODULE_6__["default"])(alg, key, 'sign');
      let payload = _this._payload;
      if (b64) {
        payload = _lib_buffer_utils_js__WEBPACK_IMPORTED_MODULE_5__.encoder.encode((0,_runtime_base64url_js__WEBPACK_IMPORTED_MODULE_1__.encode)(payload));
      }
      let protectedHeader;
      if (_this._protectedHeader) {
        protectedHeader = _lib_buffer_utils_js__WEBPACK_IMPORTED_MODULE_5__.encoder.encode((0,_runtime_base64url_js__WEBPACK_IMPORTED_MODULE_1__.encode)(JSON.stringify(_this._protectedHeader)));
      } else {
        protectedHeader = _lib_buffer_utils_js__WEBPACK_IMPORTED_MODULE_5__.encoder.encode('');
      }
      const data = (0,_lib_buffer_utils_js__WEBPACK_IMPORTED_MODULE_5__.concat)(protectedHeader, _lib_buffer_utils_js__WEBPACK_IMPORTED_MODULE_5__.encoder.encode('.'), payload);
      const signature = yield (0,_runtime_sign_js__WEBPACK_IMPORTED_MODULE_2__["default"])(alg, key, data);
      const jws = {
        signature: (0,_runtime_base64url_js__WEBPACK_IMPORTED_MODULE_1__.encode)(signature),
        payload: ''
      };
      if (b64) {
        jws.payload = _lib_buffer_utils_js__WEBPACK_IMPORTED_MODULE_5__.decoder.decode(payload);
      }
      if (_this._unprotectedHeader) {
        jws.header = _this._unprotectedHeader;
      }
      if (_this._protectedHeader) {
        jws.protected = _lib_buffer_utils_js__WEBPACK_IMPORTED_MODULE_5__.decoder.decode(protectedHeader);
      }
      return jws;
    })();
  }
}

/***/ }),

/***/ 3217:
/*!****************************************************************!*\
  !*** ./node_modules/jose/dist/browser/jws/flattened/verify.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   flattenedVerify: () => (/* binding */ flattenedVerify)
/* harmony export */ });
/* harmony import */ var _Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 1670);
/* harmony import */ var _runtime_base64url_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../runtime/base64url.js */ 9485);
/* harmony import */ var _runtime_verify_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../runtime/verify.js */ 5958);
/* harmony import */ var _util_errors_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../util/errors.js */ 581);
/* harmony import */ var _lib_buffer_utils_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../lib/buffer_utils.js */ 1088);
/* harmony import */ var _lib_is_disjoint_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../lib/is_disjoint.js */ 6411);
/* harmony import */ var _lib_is_object_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../lib/is_object.js */ 7157);
/* harmony import */ var _lib_check_key_type_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../lib/check_key_type.js */ 2667);
/* harmony import */ var _lib_validate_crit_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../lib/validate_crit.js */ 8859);
/* harmony import */ var _lib_validate_algorithms_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../lib/validate_algorithms.js */ 652);










function flattenedVerify(_x, _x2, _x3) {
  return _flattenedVerify.apply(this, arguments);
}
function _flattenedVerify() {
  _flattenedVerify = (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (jws, key, options) {
    var _a;
    if (!(0,_lib_is_object_js__WEBPACK_IMPORTED_MODULE_6__["default"])(jws)) {
      throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_3__.JWSInvalid('Flattened JWS must be an object');
    }
    if (jws.protected === undefined && jws.header === undefined) {
      throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_3__.JWSInvalid('Flattened JWS must have either of the "protected" or "header" members');
    }
    if (jws.protected !== undefined && typeof jws.protected !== 'string') {
      throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_3__.JWSInvalid('JWS Protected Header incorrect type');
    }
    if (jws.payload === undefined) {
      throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_3__.JWSInvalid('JWS Payload missing');
    }
    if (typeof jws.signature !== 'string') {
      throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_3__.JWSInvalid('JWS Signature missing or incorrect type');
    }
    if (jws.header !== undefined && !(0,_lib_is_object_js__WEBPACK_IMPORTED_MODULE_6__["default"])(jws.header)) {
      throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_3__.JWSInvalid('JWS Unprotected Header incorrect type');
    }
    let parsedProt = {};
    if (jws.protected) {
      try {
        const protectedHeader = (0,_runtime_base64url_js__WEBPACK_IMPORTED_MODULE_1__.decode)(jws.protected);
        parsedProt = JSON.parse(_lib_buffer_utils_js__WEBPACK_IMPORTED_MODULE_4__.decoder.decode(protectedHeader));
      } catch (_b) {
        throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_3__.JWSInvalid('JWS Protected Header is invalid');
      }
    }
    if (!(0,_lib_is_disjoint_js__WEBPACK_IMPORTED_MODULE_5__["default"])(parsedProt, jws.header)) {
      throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_3__.JWSInvalid('JWS Protected and JWS Unprotected Header Parameter names must be disjoint');
    }
    const joseHeader = {
      ...parsedProt,
      ...jws.header
    };
    const extensions = (0,_lib_validate_crit_js__WEBPACK_IMPORTED_MODULE_8__["default"])(_util_errors_js__WEBPACK_IMPORTED_MODULE_3__.JWSInvalid, new Map([['b64', true]]), options === null || options === void 0 ? void 0 : options.crit, parsedProt, joseHeader);
    let b64 = true;
    if (extensions.has('b64')) {
      b64 = parsedProt.b64;
      if (typeof b64 !== 'boolean') {
        throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_3__.JWSInvalid('The "b64" (base64url-encode payload) Header Parameter must be a boolean');
      }
    }
    const {
      alg
    } = joseHeader;
    if (typeof alg !== 'string' || !alg) {
      throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_3__.JWSInvalid('JWS "alg" (Algorithm) Header Parameter missing or invalid');
    }
    const algorithms = options && (0,_lib_validate_algorithms_js__WEBPACK_IMPORTED_MODULE_9__["default"])('algorithms', options.algorithms);
    if (algorithms && !algorithms.has(alg)) {
      throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_3__.JOSEAlgNotAllowed('"alg" (Algorithm) Header Parameter not allowed');
    }
    if (b64) {
      if (typeof jws.payload !== 'string') {
        throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_3__.JWSInvalid('JWS Payload must be a string');
      }
    } else if (typeof jws.payload !== 'string' && !(jws.payload instanceof Uint8Array)) {
      throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_3__.JWSInvalid('JWS Payload must be a string or an Uint8Array instance');
    }
    let resolvedKey = false;
    if (typeof key === 'function') {
      key = yield key(parsedProt, jws);
      resolvedKey = true;
    }
    (0,_lib_check_key_type_js__WEBPACK_IMPORTED_MODULE_7__["default"])(alg, key, 'verify');
    const data = (0,_lib_buffer_utils_js__WEBPACK_IMPORTED_MODULE_4__.concat)(_lib_buffer_utils_js__WEBPACK_IMPORTED_MODULE_4__.encoder.encode((_a = jws.protected) !== null && _a !== void 0 ? _a : ''), _lib_buffer_utils_js__WEBPACK_IMPORTED_MODULE_4__.encoder.encode('.'), typeof jws.payload === 'string' ? _lib_buffer_utils_js__WEBPACK_IMPORTED_MODULE_4__.encoder.encode(jws.payload) : jws.payload);
    const signature = (0,_runtime_base64url_js__WEBPACK_IMPORTED_MODULE_1__.decode)(jws.signature);
    const verified = yield (0,_runtime_verify_js__WEBPACK_IMPORTED_MODULE_2__["default"])(alg, key, signature, data);
    if (!verified) {
      throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_3__.JWSSignatureVerificationFailed();
    }
    let payload;
    if (b64) {
      payload = (0,_runtime_base64url_js__WEBPACK_IMPORTED_MODULE_1__.decode)(jws.payload);
    } else if (typeof jws.payload === 'string') {
      payload = _lib_buffer_utils_js__WEBPACK_IMPORTED_MODULE_4__.encoder.encode(jws.payload);
    } else {
      payload = jws.payload;
    }
    const result = {
      payload
    };
    if (jws.protected !== undefined) {
      result.protectedHeader = parsedProt;
    }
    if (jws.header !== undefined) {
      result.unprotectedHeader = jws.header;
    }
    if (resolvedKey) {
      return {
        ...result,
        key
      };
    }
    return result;
  });
  return _flattenedVerify.apply(this, arguments);
}

/***/ }),

/***/ 3847:
/*!************************************************************!*\
  !*** ./node_modules/jose/dist/browser/jws/general/sign.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GeneralSign: () => (/* binding */ GeneralSign)
/* harmony export */ });
/* harmony import */ var _Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 1670);
/* harmony import */ var _flattened_sign_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../flattened/sign.js */ 8285);
/* harmony import */ var _util_errors_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../util/errors.js */ 581);



class IndividualSignature {
  constructor(sig, key, options) {
    this.parent = sig;
    this.key = key;
    this.options = options;
  }
  setProtectedHeader(protectedHeader) {
    if (this.protectedHeader) {
      throw new TypeError('setProtectedHeader can only be called once');
    }
    this.protectedHeader = protectedHeader;
    return this;
  }
  setUnprotectedHeader(unprotectedHeader) {
    if (this.unprotectedHeader) {
      throw new TypeError('setUnprotectedHeader can only be called once');
    }
    this.unprotectedHeader = unprotectedHeader;
    return this;
  }
  addSignature(...args) {
    return this.parent.addSignature(...args);
  }
  sign(...args) {
    return this.parent.sign(...args);
  }
  done() {
    return this.parent;
  }
}
class GeneralSign {
  constructor(payload) {
    this._signatures = [];
    this._payload = payload;
  }
  addSignature(key, options) {
    const signature = new IndividualSignature(this, key, options);
    this._signatures.push(signature);
    return signature;
  }
  sign() {
    var _this = this;
    return (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (!_this._signatures.length) {
        throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_2__.JWSInvalid('at least one signature must be added');
      }
      const jws = {
        signatures: [],
        payload: ''
      };
      for (let i = 0; i < _this._signatures.length; i++) {
        const signature = _this._signatures[i];
        const flattened = new _flattened_sign_js__WEBPACK_IMPORTED_MODULE_1__.FlattenedSign(_this._payload);
        flattened.setProtectedHeader(signature.protectedHeader);
        flattened.setUnprotectedHeader(signature.unprotectedHeader);
        const {
          payload,
          ...rest
        } = yield flattened.sign(signature.key, signature.options);
        if (i === 0) {
          jws.payload = payload;
        } else if (jws.payload !== payload) {
          throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_2__.JWSInvalid('inconsistent use of JWS Unencoded Payload (RFC7797)');
        }
        jws.signatures.push(rest);
      }
      return jws;
    })();
  }
}

/***/ }),

/***/ 7204:
/*!**************************************************************!*\
  !*** ./node_modules/jose/dist/browser/jws/general/verify.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   generalVerify: () => (/* binding */ generalVerify)
/* harmony export */ });
/* harmony import */ var _Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 1670);
/* harmony import */ var _flattened_verify_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../flattened/verify.js */ 3217);
/* harmony import */ var _util_errors_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../util/errors.js */ 581);
/* harmony import */ var _lib_is_object_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../lib/is_object.js */ 7157);




function generalVerify(_x, _x2, _x3) {
  return _generalVerify.apply(this, arguments);
}
function _generalVerify() {
  _generalVerify = (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (jws, key, options) {
    if (!(0,_lib_is_object_js__WEBPACK_IMPORTED_MODULE_3__["default"])(jws)) {
      throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_2__.JWSInvalid('General JWS must be an object');
    }
    if (!Array.isArray(jws.signatures) || !jws.signatures.every(_lib_is_object_js__WEBPACK_IMPORTED_MODULE_3__["default"])) {
      throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_2__.JWSInvalid('JWS Signatures missing or incorrect type');
    }
    for (const signature of jws.signatures) {
      try {
        return yield (0,_flattened_verify_js__WEBPACK_IMPORTED_MODULE_1__.flattenedVerify)({
          header: signature.header,
          payload: jws.payload,
          protected: signature.protected,
          signature: signature.signature
        }, key, options);
      } catch (_a) {}
    }
    throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_2__.JWSSignatureVerificationFailed();
  });
  return _generalVerify.apply(this, arguments);
}

/***/ }),

/***/ 9718:
/*!*******************************************************!*\
  !*** ./node_modules/jose/dist/browser/jwt/decrypt.js ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   jwtDecrypt: () => (/* binding */ jwtDecrypt)
/* harmony export */ });
/* harmony import */ var _Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 1670);
/* harmony import */ var _jwe_compact_decrypt_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../jwe/compact/decrypt.js */ 6808);
/* harmony import */ var _lib_jwt_claims_set_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/jwt_claims_set.js */ 5525);
/* harmony import */ var _util_errors_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util/errors.js */ 581);




function jwtDecrypt(_x, _x2, _x3) {
  return _jwtDecrypt.apply(this, arguments);
}
function _jwtDecrypt() {
  _jwtDecrypt = (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (jwt, key, options) {
    const decrypted = yield (0,_jwe_compact_decrypt_js__WEBPACK_IMPORTED_MODULE_1__.compactDecrypt)(jwt, key, options);
    const payload = (0,_lib_jwt_claims_set_js__WEBPACK_IMPORTED_MODULE_2__["default"])(decrypted.protectedHeader, decrypted.plaintext, options);
    const {
      protectedHeader
    } = decrypted;
    if (protectedHeader.iss !== undefined && protectedHeader.iss !== payload.iss) {
      throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_3__.JWTClaimValidationFailed('replicated "iss" claim header parameter mismatch', 'iss', 'mismatch');
    }
    if (protectedHeader.sub !== undefined && protectedHeader.sub !== payload.sub) {
      throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_3__.JWTClaimValidationFailed('replicated "sub" claim header parameter mismatch', 'sub', 'mismatch');
    }
    if (protectedHeader.aud !== undefined && JSON.stringify(protectedHeader.aud) !== JSON.stringify(payload.aud)) {
      throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_3__.JWTClaimValidationFailed('replicated "aud" claim header parameter mismatch', 'aud', 'mismatch');
    }
    const result = {
      payload,
      protectedHeader
    };
    if (typeof key === 'function') {
      return {
        ...result,
        key: decrypted.key
      };
    }
    return result;
  });
  return _jwtDecrypt.apply(this, arguments);
}

/***/ }),

/***/ 7465:
/*!*******************************************************!*\
  !*** ./node_modules/jose/dist/browser/jwt/encrypt.js ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EncryptJWT: () => (/* binding */ EncryptJWT)
/* harmony export */ });
/* harmony import */ var _Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 1670);
/* harmony import */ var _jwe_compact_encrypt_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../jwe/compact/encrypt.js */ 5108);
/* harmony import */ var _lib_buffer_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/buffer_utils.js */ 1088);
/* harmony import */ var _produce_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./produce.js */ 9897);




class EncryptJWT extends _produce_js__WEBPACK_IMPORTED_MODULE_3__.ProduceJWT {
  setProtectedHeader(protectedHeader) {
    if (this._protectedHeader) {
      throw new TypeError('setProtectedHeader can only be called once');
    }
    this._protectedHeader = protectedHeader;
    return this;
  }
  setKeyManagementParameters(parameters) {
    if (this._keyManagementParameters) {
      throw new TypeError('setKeyManagementParameters can only be called once');
    }
    this._keyManagementParameters = parameters;
    return this;
  }
  setContentEncryptionKey(cek) {
    if (this._cek) {
      throw new TypeError('setContentEncryptionKey can only be called once');
    }
    this._cek = cek;
    return this;
  }
  setInitializationVector(iv) {
    if (this._iv) {
      throw new TypeError('setInitializationVector can only be called once');
    }
    this._iv = iv;
    return this;
  }
  replicateIssuerAsHeader() {
    this._replicateIssuerAsHeader = true;
    return this;
  }
  replicateSubjectAsHeader() {
    this._replicateSubjectAsHeader = true;
    return this;
  }
  replicateAudienceAsHeader() {
    this._replicateAudienceAsHeader = true;
    return this;
  }
  encrypt(key, options) {
    var _this = this;
    return (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const enc = new _jwe_compact_encrypt_js__WEBPACK_IMPORTED_MODULE_1__.CompactEncrypt(_lib_buffer_utils_js__WEBPACK_IMPORTED_MODULE_2__.encoder.encode(JSON.stringify(_this._payload)));
      if (_this._replicateIssuerAsHeader) {
        _this._protectedHeader = {
          ..._this._protectedHeader,
          iss: _this._payload.iss
        };
      }
      if (_this._replicateSubjectAsHeader) {
        _this._protectedHeader = {
          ..._this._protectedHeader,
          sub: _this._payload.sub
        };
      }
      if (_this._replicateAudienceAsHeader) {
        _this._protectedHeader = {
          ..._this._protectedHeader,
          aud: _this._payload.aud
        };
      }
      enc.setProtectedHeader(_this._protectedHeader);
      if (_this._iv) {
        enc.setInitializationVector(_this._iv);
      }
      if (_this._cek) {
        enc.setContentEncryptionKey(_this._cek);
      }
      if (_this._keyManagementParameters) {
        enc.setKeyManagementParameters(_this._keyManagementParameters);
      }
      return enc.encrypt(key, options);
    })();
  }
}

/***/ }),

/***/ 9897:
/*!*******************************************************!*\
  !*** ./node_modules/jose/dist/browser/jwt/produce.js ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ProduceJWT: () => (/* binding */ ProduceJWT)
/* harmony export */ });
/* harmony import */ var _lib_epoch_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/epoch.js */ 3805);
/* harmony import */ var _lib_is_object_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/is_object.js */ 7157);
/* harmony import */ var _lib_secs_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/secs.js */ 2112);



class ProduceJWT {
  constructor(payload) {
    if (!(0,_lib_is_object_js__WEBPACK_IMPORTED_MODULE_1__["default"])(payload)) {
      throw new TypeError('JWT Claims Set MUST be an object');
    }
    this._payload = payload;
  }
  setIssuer(issuer) {
    this._payload = {
      ...this._payload,
      iss: issuer
    };
    return this;
  }
  setSubject(subject) {
    this._payload = {
      ...this._payload,
      sub: subject
    };
    return this;
  }
  setAudience(audience) {
    this._payload = {
      ...this._payload,
      aud: audience
    };
    return this;
  }
  setJti(jwtId) {
    this._payload = {
      ...this._payload,
      jti: jwtId
    };
    return this;
  }
  setNotBefore(input) {
    if (typeof input === 'number') {
      this._payload = {
        ...this._payload,
        nbf: input
      };
    } else {
      this._payload = {
        ...this._payload,
        nbf: (0,_lib_epoch_js__WEBPACK_IMPORTED_MODULE_0__["default"])(new Date()) + (0,_lib_secs_js__WEBPACK_IMPORTED_MODULE_2__["default"])(input)
      };
    }
    return this;
  }
  setExpirationTime(input) {
    if (typeof input === 'number') {
      this._payload = {
        ...this._payload,
        exp: input
      };
    } else {
      this._payload = {
        ...this._payload,
        exp: (0,_lib_epoch_js__WEBPACK_IMPORTED_MODULE_0__["default"])(new Date()) + (0,_lib_secs_js__WEBPACK_IMPORTED_MODULE_2__["default"])(input)
      };
    }
    return this;
  }
  setIssuedAt(input) {
    if (typeof input === 'undefined') {
      this._payload = {
        ...this._payload,
        iat: (0,_lib_epoch_js__WEBPACK_IMPORTED_MODULE_0__["default"])(new Date())
      };
    } else {
      this._payload = {
        ...this._payload,
        iat: input
      };
    }
    return this;
  }
}

/***/ }),

/***/ 7403:
/*!****************************************************!*\
  !*** ./node_modules/jose/dist/browser/jwt/sign.js ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SignJWT: () => (/* binding */ SignJWT)
/* harmony export */ });
/* harmony import */ var _Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 1670);
/* harmony import */ var _jws_compact_sign_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../jws/compact/sign.js */ 477);
/* harmony import */ var _util_errors_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/errors.js */ 581);
/* harmony import */ var _lib_buffer_utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../lib/buffer_utils.js */ 1088);
/* harmony import */ var _produce_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./produce.js */ 9897);





class SignJWT extends _produce_js__WEBPACK_IMPORTED_MODULE_4__.ProduceJWT {
  setProtectedHeader(protectedHeader) {
    this._protectedHeader = protectedHeader;
    return this;
  }
  sign(key, options) {
    var _this = this;
    return (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      var _a;
      const sig = new _jws_compact_sign_js__WEBPACK_IMPORTED_MODULE_1__.CompactSign(_lib_buffer_utils_js__WEBPACK_IMPORTED_MODULE_3__.encoder.encode(JSON.stringify(_this._payload)));
      sig.setProtectedHeader(_this._protectedHeader);
      if (Array.isArray((_a = _this._protectedHeader) === null || _a === void 0 ? void 0 : _a.crit) && _this._protectedHeader.crit.includes('b64') && _this._protectedHeader.b64 === false) {
        throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_2__.JWTInvalid('JWTs MUST NOT use unencoded payload');
      }
      return sig.sign(key, options);
    })();
  }
}

/***/ }),

/***/ 5719:
/*!*********************************************************!*\
  !*** ./node_modules/jose/dist/browser/jwt/unsecured.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UnsecuredJWT: () => (/* binding */ UnsecuredJWT)
/* harmony export */ });
/* harmony import */ var _runtime_base64url_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../runtime/base64url.js */ 9485);
/* harmony import */ var _lib_buffer_utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/buffer_utils.js */ 1088);
/* harmony import */ var _util_errors_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/errors.js */ 581);
/* harmony import */ var _lib_jwt_claims_set_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../lib/jwt_claims_set.js */ 5525);
/* harmony import */ var _produce_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./produce.js */ 9897);





class UnsecuredJWT extends _produce_js__WEBPACK_IMPORTED_MODULE_4__.ProduceJWT {
  encode() {
    const header = _runtime_base64url_js__WEBPACK_IMPORTED_MODULE_0__.encode(JSON.stringify({
      alg: 'none'
    }));
    const payload = _runtime_base64url_js__WEBPACK_IMPORTED_MODULE_0__.encode(JSON.stringify(this._payload));
    return `${header}.${payload}.`;
  }
  static decode(jwt, options) {
    if (typeof jwt !== 'string') {
      throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_2__.JWTInvalid('Unsecured JWT must be a string');
    }
    const {
      0: encodedHeader,
      1: encodedPayload,
      2: signature,
      length
    } = jwt.split('.');
    if (length !== 3 || signature !== '') {
      throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_2__.JWTInvalid('Invalid Unsecured JWT');
    }
    let header;
    try {
      header = JSON.parse(_lib_buffer_utils_js__WEBPACK_IMPORTED_MODULE_1__.decoder.decode(_runtime_base64url_js__WEBPACK_IMPORTED_MODULE_0__.decode(encodedHeader)));
      if (header.alg !== 'none') throw new Error();
    } catch (_a) {
      throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_2__.JWTInvalid('Invalid Unsecured JWT');
    }
    const payload = (0,_lib_jwt_claims_set_js__WEBPACK_IMPORTED_MODULE_3__["default"])(header, _runtime_base64url_js__WEBPACK_IMPORTED_MODULE_0__.decode(encodedPayload), options);
    return {
      payload,
      header
    };
  }
}

/***/ }),

/***/ 2006:
/*!******************************************************!*\
  !*** ./node_modules/jose/dist/browser/jwt/verify.js ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   jwtVerify: () => (/* binding */ jwtVerify)
/* harmony export */ });
/* harmony import */ var _Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 1670);
/* harmony import */ var _jws_compact_verify_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../jws/compact/verify.js */ 3480);
/* harmony import */ var _lib_jwt_claims_set_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/jwt_claims_set.js */ 5525);
/* harmony import */ var _util_errors_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util/errors.js */ 581);




function jwtVerify(_x, _x2, _x3) {
  return _jwtVerify.apply(this, arguments);
}
function _jwtVerify() {
  _jwtVerify = (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (jwt, key, options) {
    var _a;
    const verified = yield (0,_jws_compact_verify_js__WEBPACK_IMPORTED_MODULE_1__.compactVerify)(jwt, key, options);
    if (((_a = verified.protectedHeader.crit) === null || _a === void 0 ? void 0 : _a.includes('b64')) && verified.protectedHeader.b64 === false) {
      throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_3__.JWTInvalid('JWTs MUST NOT use unencoded payload');
    }
    const payload = (0,_lib_jwt_claims_set_js__WEBPACK_IMPORTED_MODULE_2__["default"])(verified.protectedHeader, verified.payload, options);
    const result = {
      payload,
      protectedHeader: verified.protectedHeader
    };
    if (typeof key === 'function') {
      return {
        ...result,
        key: verified.key
      };
    }
    return result;
  });
  return _jwtVerify.apply(this, arguments);
}

/***/ }),

/***/ 6344:
/*!******************************************************!*\
  !*** ./node_modules/jose/dist/browser/key/export.js ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   exportJWK: () => (/* binding */ exportJWK),
/* harmony export */   exportPKCS8: () => (/* binding */ exportPKCS8),
/* harmony export */   exportSPKI: () => (/* binding */ exportSPKI)
/* harmony export */ });
/* harmony import */ var _Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 1670);
/* harmony import */ var _runtime_asn1_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../runtime/asn1.js */ 3937);
/* harmony import */ var _runtime_key_to_jwk_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../runtime/key_to_jwk.js */ 3063);




function exportSPKI(_x) {
  return _exportSPKI.apply(this, arguments);
}
function _exportSPKI() {
  _exportSPKI = (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (key) {
    return (0,_runtime_asn1_js__WEBPACK_IMPORTED_MODULE_1__.toSPKI)(key);
  });
  return _exportSPKI.apply(this, arguments);
}
function exportPKCS8(_x2) {
  return _exportPKCS.apply(this, arguments);
}
function _exportPKCS() {
  _exportPKCS = (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (key) {
    return (0,_runtime_asn1_js__WEBPACK_IMPORTED_MODULE_1__.toPKCS8)(key);
  });
  return _exportPKCS.apply(this, arguments);
}
function exportJWK(_x3) {
  return _exportJWK.apply(this, arguments);
}
function _exportJWK() {
  _exportJWK = (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (key) {
    return (0,_runtime_key_to_jwk_js__WEBPACK_IMPORTED_MODULE_2__["default"])(key);
  });
  return _exportJWK.apply(this, arguments);
}

/***/ }),

/***/ 882:
/*!*****************************************************************!*\
  !*** ./node_modules/jose/dist/browser/key/generate_key_pair.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   generateKeyPair: () => (/* binding */ generateKeyPair)
/* harmony export */ });
/* harmony import */ var _Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 1670);
/* harmony import */ var _runtime_generate_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../runtime/generate.js */ 58);


function generateKeyPair(_x, _x2) {
  return _generateKeyPair.apply(this, arguments);
}
function _generateKeyPair() {
  _generateKeyPair = (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (alg, options) {
    return (0,_runtime_generate_js__WEBPACK_IMPORTED_MODULE_1__.generateKeyPair)(alg, options);
  });
  return _generateKeyPair.apply(this, arguments);
}

/***/ }),

/***/ 6302:
/*!***************************************************************!*\
  !*** ./node_modules/jose/dist/browser/key/generate_secret.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   generateSecret: () => (/* binding */ generateSecret)
/* harmony export */ });
/* harmony import */ var _Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 1670);
/* harmony import */ var _runtime_generate_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../runtime/generate.js */ 58);


function generateSecret(_x, _x2) {
  return _generateSecret.apply(this, arguments);
}
function _generateSecret() {
  _generateSecret = (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (alg, options) {
    return (0,_runtime_generate_js__WEBPACK_IMPORTED_MODULE_1__.generateSecret)(alg, options);
  });
  return _generateSecret.apply(this, arguments);
}

/***/ }),

/***/ 6606:
/*!******************************************************!*\
  !*** ./node_modules/jose/dist/browser/key/import.js ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   importJWK: () => (/* binding */ importJWK),
/* harmony export */   importPKCS8: () => (/* binding */ importPKCS8),
/* harmony export */   importSPKI: () => (/* binding */ importSPKI),
/* harmony export */   importX509: () => (/* binding */ importX509)
/* harmony export */ });
/* harmony import */ var _Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 1670);
/* harmony import */ var _runtime_base64url_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../runtime/base64url.js */ 9485);
/* harmony import */ var _runtime_asn1_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../runtime/asn1.js */ 3937);
/* harmony import */ var _runtime_jwk_to_key_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../runtime/jwk_to_key.js */ 4475);
/* harmony import */ var _util_errors_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../util/errors.js */ 581);
/* harmony import */ var _lib_is_object_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../lib/is_object.js */ 7157);






function importSPKI(_x, _x2, _x3) {
  return _importSPKI.apply(this, arguments);
}
function _importSPKI() {
  _importSPKI = (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (spki, alg, options) {
    if (typeof spki !== 'string' || spki.indexOf('-----BEGIN PUBLIC KEY-----') !== 0) {
      throw new TypeError('"spki" must be SPKI formatted string');
    }
    return (0,_runtime_asn1_js__WEBPACK_IMPORTED_MODULE_2__.fromSPKI)(spki, alg, options);
  });
  return _importSPKI.apply(this, arguments);
}
function importX509(_x4, _x5, _x6) {
  return _importX.apply(this, arguments);
}
function _importX() {
  _importX = (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (x509, alg, options) {
    if (typeof x509 !== 'string' || x509.indexOf('-----BEGIN CERTIFICATE-----') !== 0) {
      throw new TypeError('"x509" must be X.509 formatted string');
    }
    return (0,_runtime_asn1_js__WEBPACK_IMPORTED_MODULE_2__.fromX509)(x509, alg, options);
  });
  return _importX.apply(this, arguments);
}
function importPKCS8(_x7, _x8, _x9) {
  return _importPKCS.apply(this, arguments);
}
function _importPKCS() {
  _importPKCS = (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (pkcs8, alg, options) {
    if (typeof pkcs8 !== 'string' || pkcs8.indexOf('-----BEGIN PRIVATE KEY-----') !== 0) {
      throw new TypeError('"pkcs8" must be PKCS#8 formatted string');
    }
    return (0,_runtime_asn1_js__WEBPACK_IMPORTED_MODULE_2__.fromPKCS8)(pkcs8, alg, options);
  });
  return _importPKCS.apply(this, arguments);
}
function importJWK(_x10, _x11, _x12) {
  return _importJWK.apply(this, arguments);
}
function _importJWK() {
  _importJWK = (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (jwk, alg, octAsKeyObject) {
    var _a;
    if (!(0,_lib_is_object_js__WEBPACK_IMPORTED_MODULE_5__["default"])(jwk)) {
      throw new TypeError('JWK must be an object');
    }
    alg || (alg = jwk.alg);
    switch (jwk.kty) {
      case 'oct':
        if (typeof jwk.k !== 'string' || !jwk.k) {
          throw new TypeError('missing "k" (Key Value) Parameter value');
        }
        octAsKeyObject !== null && octAsKeyObject !== void 0 ? octAsKeyObject : octAsKeyObject = jwk.ext !== true;
        if (octAsKeyObject) {
          return (0,_runtime_jwk_to_key_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
            ...jwk,
            alg,
            ext: (_a = jwk.ext) !== null && _a !== void 0 ? _a : false
          });
        }
        return (0,_runtime_base64url_js__WEBPACK_IMPORTED_MODULE_1__.decode)(jwk.k);
      case 'RSA':
        if (jwk.oth !== undefined) {
          throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_4__.JOSENotSupported('RSA JWK "oth" (Other Primes Info) Parameter value is not supported');
        }
      case 'EC':
      case 'OKP':
        return (0,_runtime_jwk_to_key_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
          ...jwk,
          alg
        });
      default:
        throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_4__.JOSENotSupported('Unsupported "kty" (Key Type) Parameter value');
    }
  });
  return _importJWK.apply(this, arguments);
}

/***/ }),

/***/ 8643:
/*!********************************************************!*\
  !*** ./node_modules/jose/dist/browser/lib/aesgcmkw.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   unwrap: () => (/* binding */ unwrap),
/* harmony export */   wrap: () => (/* binding */ wrap)
/* harmony export */ });
/* harmony import */ var _Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 1670);
/* harmony import */ var _runtime_encrypt_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../runtime/encrypt.js */ 9562);
/* harmony import */ var _runtime_decrypt_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../runtime/decrypt.js */ 56);
/* harmony import */ var _iv_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./iv.js */ 3763);
/* harmony import */ var _runtime_base64url_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../runtime/base64url.js */ 9485);





function wrap(_x, _x2, _x3, _x4) {
  return _wrap.apply(this, arguments);
}
function _wrap() {
  _wrap = (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (alg, key, cek, iv) {
    const jweAlgorithm = alg.slice(0, 7);
    iv || (iv = (0,_iv_js__WEBPACK_IMPORTED_MODULE_3__["default"])(jweAlgorithm));
    const {
      ciphertext: encryptedKey,
      tag
    } = yield (0,_runtime_encrypt_js__WEBPACK_IMPORTED_MODULE_1__["default"])(jweAlgorithm, cek, key, iv, new Uint8Array(0));
    return {
      encryptedKey,
      iv: (0,_runtime_base64url_js__WEBPACK_IMPORTED_MODULE_4__.encode)(iv),
      tag: (0,_runtime_base64url_js__WEBPACK_IMPORTED_MODULE_4__.encode)(tag)
    };
  });
  return _wrap.apply(this, arguments);
}
function unwrap(_x5, _x6, _x7, _x8, _x9) {
  return _unwrap.apply(this, arguments);
}
function _unwrap() {
  _unwrap = (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (alg, key, encryptedKey, iv, tag) {
    const jweAlgorithm = alg.slice(0, 7);
    return (0,_runtime_decrypt_js__WEBPACK_IMPORTED_MODULE_2__["default"])(jweAlgorithm, key, encryptedKey, iv, tag, new Uint8Array(0));
  });
  return _unwrap.apply(this, arguments);
}

/***/ }),

/***/ 1088:
/*!************************************************************!*\
  !*** ./node_modules/jose/dist/browser/lib/buffer_utils.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   concat: () => (/* binding */ concat),
/* harmony export */   concatKdf: () => (/* binding */ concatKdf),
/* harmony export */   decoder: () => (/* binding */ decoder),
/* harmony export */   encoder: () => (/* binding */ encoder),
/* harmony export */   lengthAndInput: () => (/* binding */ lengthAndInput),
/* harmony export */   p2s: () => (/* binding */ p2s),
/* harmony export */   uint32be: () => (/* binding */ uint32be),
/* harmony export */   uint64be: () => (/* binding */ uint64be)
/* harmony export */ });
/* harmony import */ var _Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 1670);
/* harmony import */ var _runtime_digest_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../runtime/digest.js */ 1996);


const encoder = new TextEncoder();
const decoder = new TextDecoder();
const MAX_INT32 = 2 ** 32;
function concat(...buffers) {
  const size = buffers.reduce((acc, {
    length
  }) => acc + length, 0);
  const buf = new Uint8Array(size);
  let i = 0;
  buffers.forEach(buffer => {
    buf.set(buffer, i);
    i += buffer.length;
  });
  return buf;
}
function p2s(alg, p2sInput) {
  return concat(encoder.encode(alg), new Uint8Array([0]), p2sInput);
}
function writeUInt32BE(buf, value, offset) {
  if (value < 0 || value >= MAX_INT32) {
    throw new RangeError(`value must be >= 0 and <= ${MAX_INT32 - 1}. Received ${value}`);
  }
  buf.set([value >>> 24, value >>> 16, value >>> 8, value & 0xff], offset);
}
function uint64be(value) {
  const high = Math.floor(value / MAX_INT32);
  const low = value % MAX_INT32;
  const buf = new Uint8Array(8);
  writeUInt32BE(buf, high, 0);
  writeUInt32BE(buf, low, 4);
  return buf;
}
function uint32be(value) {
  const buf = new Uint8Array(4);
  writeUInt32BE(buf, value);
  return buf;
}
function lengthAndInput(input) {
  return concat(uint32be(input.length), input);
}
function concatKdf(_x, _x2, _x3) {
  return _concatKdf.apply(this, arguments);
}
function _concatKdf() {
  _concatKdf = (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (secret, bits, value) {
    const iterations = Math.ceil((bits >> 3) / 32);
    const res = new Uint8Array(iterations * 32);
    for (let iter = 0; iter < iterations; iter++) {
      const buf = new Uint8Array(4 + secret.length + value.length);
      buf.set(uint32be(iter + 1));
      buf.set(secret, 4);
      buf.set(value, 4 + secret.length);
      res.set(yield (0,_runtime_digest_js__WEBPACK_IMPORTED_MODULE_1__["default"])('sha256', buf), iter * 32);
    }
    return res.slice(0, bits >> 3);
  });
  return _concatKdf.apply(this, arguments);
}

/***/ }),

/***/ 9335:
/*!***************************************************!*\
  !*** ./node_modules/jose/dist/browser/lib/cek.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   bitLength: () => (/* binding */ bitLength),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _util_errors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/errors.js */ 581);
/* harmony import */ var _runtime_random_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../runtime/random.js */ 5366);


function bitLength(alg) {
  switch (alg) {
    case 'A128GCM':
      return 128;
    case 'A192GCM':
      return 192;
    case 'A256GCM':
    case 'A128CBC-HS256':
      return 256;
    case 'A192CBC-HS384':
      return 384;
    case 'A256CBC-HS512':
      return 512;
    default:
      throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_0__.JOSENotSupported(`Unsupported JWE Algorithm: ${alg}`);
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (alg => (0,_runtime_random_js__WEBPACK_IMPORTED_MODULE_1__["default"])(new Uint8Array(bitLength(alg) >> 3)));

/***/ }),

/***/ 8656:
/*!***************************************************************!*\
  !*** ./node_modules/jose/dist/browser/lib/check_iv_length.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _util_errors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/errors.js */ 581);
/* harmony import */ var _iv_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./iv.js */ 3763);


const checkIvLength = (enc, iv) => {
  if (iv.length << 3 !== (0,_iv_js__WEBPACK_IMPORTED_MODULE_1__.bitLength)(enc)) {
    throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_0__.JWEInvalid('Invalid Initialization Vector length');
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (checkIvLength);

/***/ }),

/***/ 2667:
/*!**************************************************************!*\
  !*** ./node_modules/jose/dist/browser/lib/check_key_type.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _invalid_key_input_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./invalid_key_input.js */ 44);
/* harmony import */ var _runtime_is_key_like_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../runtime/is_key_like.js */ 5352);


const symmetricTypeCheck = (alg, key) => {
  if (key instanceof Uint8Array) return;
  if (!(0,_runtime_is_key_like_js__WEBPACK_IMPORTED_MODULE_1__["default"])(key)) {
    throw new TypeError((0,_invalid_key_input_js__WEBPACK_IMPORTED_MODULE_0__.withAlg)(alg, key, ..._runtime_is_key_like_js__WEBPACK_IMPORTED_MODULE_1__.types, 'Uint8Array'));
  }
  if (key.type !== 'secret') {
    throw new TypeError(`${_runtime_is_key_like_js__WEBPACK_IMPORTED_MODULE_1__.types.join(' or ')} instances for symmetric algorithms must be of type "secret"`);
  }
};
const asymmetricTypeCheck = (alg, key, usage) => {
  if (!(0,_runtime_is_key_like_js__WEBPACK_IMPORTED_MODULE_1__["default"])(key)) {
    throw new TypeError((0,_invalid_key_input_js__WEBPACK_IMPORTED_MODULE_0__.withAlg)(alg, key, ..._runtime_is_key_like_js__WEBPACK_IMPORTED_MODULE_1__.types));
  }
  if (key.type === 'secret') {
    throw new TypeError(`${_runtime_is_key_like_js__WEBPACK_IMPORTED_MODULE_1__.types.join(' or ')} instances for asymmetric algorithms must not be of type "secret"`);
  }
  if (usage === 'sign' && key.type === 'public') {
    throw new TypeError(`${_runtime_is_key_like_js__WEBPACK_IMPORTED_MODULE_1__.types.join(' or ')} instances for asymmetric algorithm signing must be of type "private"`);
  }
  if (usage === 'decrypt' && key.type === 'public') {
    throw new TypeError(`${_runtime_is_key_like_js__WEBPACK_IMPORTED_MODULE_1__.types.join(' or ')} instances for asymmetric algorithm decryption must be of type "private"`);
  }
  if (key.algorithm && usage === 'verify' && key.type === 'private') {
    throw new TypeError(`${_runtime_is_key_like_js__WEBPACK_IMPORTED_MODULE_1__.types.join(' or ')} instances for asymmetric algorithm verifying must be of type "public"`);
  }
  if (key.algorithm && usage === 'encrypt' && key.type === 'private') {
    throw new TypeError(`${_runtime_is_key_like_js__WEBPACK_IMPORTED_MODULE_1__.types.join(' or ')} instances for asymmetric algorithm encryption must be of type "public"`);
  }
};
const checkKeyType = (alg, key, usage) => {
  const symmetric = alg.startsWith('HS') || alg === 'dir' || alg.startsWith('PBES2') || /^A\d{3}(?:GCM)?KW$/.test(alg);
  if (symmetric) {
    symmetricTypeCheck(alg, key);
  } else {
    asymmetricTypeCheck(alg, key, usage);
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (checkKeyType);

/***/ }),

/***/ 9639:
/*!*********************************************************!*\
  !*** ./node_modules/jose/dist/browser/lib/check_p2s.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ checkP2s)
/* harmony export */ });
/* harmony import */ var _util_errors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/errors.js */ 581);

function checkP2s(p2s) {
  if (!(p2s instanceof Uint8Array) || p2s.length < 8) {
    throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_0__.JWEInvalid('PBES2 Salt Input must be 8 or more octets');
  }
}

/***/ }),

/***/ 3513:
/*!**********************************************************!*\
  !*** ./node_modules/jose/dist/browser/lib/crypto_key.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   checkEncCryptoKey: () => (/* binding */ checkEncCryptoKey),
/* harmony export */   checkSigCryptoKey: () => (/* binding */ checkSigCryptoKey)
/* harmony export */ });
function unusable(name, prop = 'algorithm.name') {
  return new TypeError(`CryptoKey does not support this operation, its ${prop} must be ${name}`);
}
function isAlgorithm(algorithm, name) {
  return algorithm.name === name;
}
function getHashLength(hash) {
  return parseInt(hash.name.slice(4), 10);
}
function getNamedCurve(alg) {
  switch (alg) {
    case 'ES256':
      return 'P-256';
    case 'ES384':
      return 'P-384';
    case 'ES512':
      return 'P-521';
    default:
      throw new Error('unreachable');
  }
}
function checkUsage(key, usages) {
  if (usages.length && !usages.some(expected => key.usages.includes(expected))) {
    let msg = 'CryptoKey does not support this operation, its usages must include ';
    if (usages.length > 2) {
      const last = usages.pop();
      msg += `one of ${usages.join(', ')}, or ${last}.`;
    } else if (usages.length === 2) {
      msg += `one of ${usages[0]} or ${usages[1]}.`;
    } else {
      msg += `${usages[0]}.`;
    }
    throw new TypeError(msg);
  }
}
function checkSigCryptoKey(key, alg, ...usages) {
  switch (alg) {
    case 'HS256':
    case 'HS384':
    case 'HS512':
      {
        if (!isAlgorithm(key.algorithm, 'HMAC')) throw unusable('HMAC');
        const expected = parseInt(alg.slice(2), 10);
        const actual = getHashLength(key.algorithm.hash);
        if (actual !== expected) throw unusable(`SHA-${expected}`, 'algorithm.hash');
        break;
      }
    case 'RS256':
    case 'RS384':
    case 'RS512':
      {
        if (!isAlgorithm(key.algorithm, 'RSASSA-PKCS1-v1_5')) throw unusable('RSASSA-PKCS1-v1_5');
        const expected = parseInt(alg.slice(2), 10);
        const actual = getHashLength(key.algorithm.hash);
        if (actual !== expected) throw unusable(`SHA-${expected}`, 'algorithm.hash');
        break;
      }
    case 'PS256':
    case 'PS384':
    case 'PS512':
      {
        if (!isAlgorithm(key.algorithm, 'RSA-PSS')) throw unusable('RSA-PSS');
        const expected = parseInt(alg.slice(2), 10);
        const actual = getHashLength(key.algorithm.hash);
        if (actual !== expected) throw unusable(`SHA-${expected}`, 'algorithm.hash');
        break;
      }
    case 'EdDSA':
      {
        if (key.algorithm.name !== 'Ed25519' && key.algorithm.name !== 'Ed448') {
          throw unusable('Ed25519 or Ed448');
        }
        break;
      }
    case 'ES256':
    case 'ES384':
    case 'ES512':
      {
        if (!isAlgorithm(key.algorithm, 'ECDSA')) throw unusable('ECDSA');
        const expected = getNamedCurve(alg);
        const actual = key.algorithm.namedCurve;
        if (actual !== expected) throw unusable(expected, 'algorithm.namedCurve');
        break;
      }
    default:
      throw new TypeError('CryptoKey does not support this operation');
  }
  checkUsage(key, usages);
}
function checkEncCryptoKey(key, alg, ...usages) {
  switch (alg) {
    case 'A128GCM':
    case 'A192GCM':
    case 'A256GCM':
      {
        if (!isAlgorithm(key.algorithm, 'AES-GCM')) throw unusable('AES-GCM');
        const expected = parseInt(alg.slice(1, 4), 10);
        const actual = key.algorithm.length;
        if (actual !== expected) throw unusable(expected, 'algorithm.length');
        break;
      }
    case 'A128KW':
    case 'A192KW':
    case 'A256KW':
      {
        if (!isAlgorithm(key.algorithm, 'AES-KW')) throw unusable('AES-KW');
        const expected = parseInt(alg.slice(1, 4), 10);
        const actual = key.algorithm.length;
        if (actual !== expected) throw unusable(expected, 'algorithm.length');
        break;
      }
    case 'ECDH':
      {
        switch (key.algorithm.name) {
          case 'ECDH':
          case 'X25519':
          case 'X448':
            break;
          default:
            throw unusable('ECDH, X25519, or X448');
        }
        break;
      }
    case 'PBES2-HS256+A128KW':
    case 'PBES2-HS384+A192KW':
    case 'PBES2-HS512+A256KW':
      if (!isAlgorithm(key.algorithm, 'PBKDF2')) throw unusable('PBKDF2');
      break;
    case 'RSA-OAEP':
    case 'RSA-OAEP-256':
    case 'RSA-OAEP-384':
    case 'RSA-OAEP-512':
      {
        if (!isAlgorithm(key.algorithm, 'RSA-OAEP')) throw unusable('RSA-OAEP');
        const expected = parseInt(alg.slice(9), 10) || 1;
        const actual = getHashLength(key.algorithm.hash);
        if (actual !== expected) throw unusable(`SHA-${expected}`, 'algorithm.hash');
        break;
      }
    default:
      throw new TypeError('CryptoKey does not support this operation');
  }
  checkUsage(key, usages);
}

/***/ }),

/***/ 7625:
/*!**********************************************************************!*\
  !*** ./node_modules/jose/dist/browser/lib/decrypt_key_management.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 1670);
/* harmony import */ var _runtime_aeskw_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../runtime/aeskw.js */ 2339);
/* harmony import */ var _runtime_ecdhes_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../runtime/ecdhes.js */ 8836);
/* harmony import */ var _runtime_pbes2kw_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../runtime/pbes2kw.js */ 8368);
/* harmony import */ var _runtime_rsaes_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../runtime/rsaes.js */ 5103);
/* harmony import */ var _runtime_base64url_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../runtime/base64url.js */ 9485);
/* harmony import */ var _util_errors_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../util/errors.js */ 581);
/* harmony import */ var _lib_cek_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../lib/cek.js */ 9335);
/* harmony import */ var _key_import_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../key/import.js */ 6606);
/* harmony import */ var _check_key_type_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./check_key_type.js */ 2667);
/* harmony import */ var _is_object_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./is_object.js */ 7157);
/* harmony import */ var _aesgcmkw_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./aesgcmkw.js */ 8643);












function decryptKeyManagement(_x, _x2, _x3, _x4, _x5) {
  return _decryptKeyManagement.apply(this, arguments);
}
function _decryptKeyManagement() {
  _decryptKeyManagement = (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (alg, key, encryptedKey, joseHeader, options) {
    (0,_check_key_type_js__WEBPACK_IMPORTED_MODULE_9__["default"])(alg, key, 'decrypt');
    switch (alg) {
      case 'dir':
        {
          if (encryptedKey !== undefined) throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_6__.JWEInvalid('Encountered unexpected JWE Encrypted Key');
          return key;
        }
      case 'ECDH-ES':
        if (encryptedKey !== undefined) throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_6__.JWEInvalid('Encountered unexpected JWE Encrypted Key');
      case 'ECDH-ES+A128KW':
      case 'ECDH-ES+A192KW':
      case 'ECDH-ES+A256KW':
        {
          if (!(0,_is_object_js__WEBPACK_IMPORTED_MODULE_10__["default"])(joseHeader.epk)) throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_6__.JWEInvalid(`JOSE Header "epk" (Ephemeral Public Key) missing or invalid`);
          if (!_runtime_ecdhes_js__WEBPACK_IMPORTED_MODULE_2__.ecdhAllowed(key)) throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_6__.JOSENotSupported('ECDH with the provided key is not allowed or not supported by your javascript runtime');
          const epk = yield (0,_key_import_js__WEBPACK_IMPORTED_MODULE_8__.importJWK)(joseHeader.epk, alg);
          let partyUInfo;
          let partyVInfo;
          if (joseHeader.apu !== undefined) {
            if (typeof joseHeader.apu !== 'string') throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_6__.JWEInvalid(`JOSE Header "apu" (Agreement PartyUInfo) invalid`);
            partyUInfo = (0,_runtime_base64url_js__WEBPACK_IMPORTED_MODULE_5__.decode)(joseHeader.apu);
          }
          if (joseHeader.apv !== undefined) {
            if (typeof joseHeader.apv !== 'string') throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_6__.JWEInvalid(`JOSE Header "apv" (Agreement PartyVInfo) invalid`);
            partyVInfo = (0,_runtime_base64url_js__WEBPACK_IMPORTED_MODULE_5__.decode)(joseHeader.apv);
          }
          const sharedSecret = yield _runtime_ecdhes_js__WEBPACK_IMPORTED_MODULE_2__.deriveKey(epk, key, alg === 'ECDH-ES' ? joseHeader.enc : alg, alg === 'ECDH-ES' ? (0,_lib_cek_js__WEBPACK_IMPORTED_MODULE_7__.bitLength)(joseHeader.enc) : parseInt(alg.slice(-5, -2), 10), partyUInfo, partyVInfo);
          if (alg === 'ECDH-ES') return sharedSecret;
          if (encryptedKey === undefined) throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_6__.JWEInvalid('JWE Encrypted Key missing');
          return (0,_runtime_aeskw_js__WEBPACK_IMPORTED_MODULE_1__.unwrap)(alg.slice(-6), sharedSecret, encryptedKey);
        }
      case 'RSA1_5':
      case 'RSA-OAEP':
      case 'RSA-OAEP-256':
      case 'RSA-OAEP-384':
      case 'RSA-OAEP-512':
        {
          if (encryptedKey === undefined) throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_6__.JWEInvalid('JWE Encrypted Key missing');
          return (0,_runtime_rsaes_js__WEBPACK_IMPORTED_MODULE_4__.decrypt)(alg, key, encryptedKey);
        }
      case 'PBES2-HS256+A128KW':
      case 'PBES2-HS384+A192KW':
      case 'PBES2-HS512+A256KW':
        {
          if (encryptedKey === undefined) throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_6__.JWEInvalid('JWE Encrypted Key missing');
          if (typeof joseHeader.p2c !== 'number') throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_6__.JWEInvalid(`JOSE Header "p2c" (PBES2 Count) missing or invalid`);
          const p2cLimit = (options === null || options === void 0 ? void 0 : options.maxPBES2Count) || 10000;
          if (joseHeader.p2c > p2cLimit) throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_6__.JWEInvalid(`JOSE Header "p2c" (PBES2 Count) out is of acceptable bounds`);
          if (typeof joseHeader.p2s !== 'string') throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_6__.JWEInvalid(`JOSE Header "p2s" (PBES2 Salt) missing or invalid`);
          return (0,_runtime_pbes2kw_js__WEBPACK_IMPORTED_MODULE_3__.decrypt)(alg, key, encryptedKey, joseHeader.p2c, (0,_runtime_base64url_js__WEBPACK_IMPORTED_MODULE_5__.decode)(joseHeader.p2s));
        }
      case 'A128KW':
      case 'A192KW':
      case 'A256KW':
        {
          if (encryptedKey === undefined) throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_6__.JWEInvalid('JWE Encrypted Key missing');
          return (0,_runtime_aeskw_js__WEBPACK_IMPORTED_MODULE_1__.unwrap)(alg, key, encryptedKey);
        }
      case 'A128GCMKW':
      case 'A192GCMKW':
      case 'A256GCMKW':
        {
          if (encryptedKey === undefined) throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_6__.JWEInvalid('JWE Encrypted Key missing');
          if (typeof joseHeader.iv !== 'string') throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_6__.JWEInvalid(`JOSE Header "iv" (Initialization Vector) missing or invalid`);
          if (typeof joseHeader.tag !== 'string') throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_6__.JWEInvalid(`JOSE Header "tag" (Authentication Tag) missing or invalid`);
          const iv = (0,_runtime_base64url_js__WEBPACK_IMPORTED_MODULE_5__.decode)(joseHeader.iv);
          const tag = (0,_runtime_base64url_js__WEBPACK_IMPORTED_MODULE_5__.decode)(joseHeader.tag);
          return (0,_aesgcmkw_js__WEBPACK_IMPORTED_MODULE_11__.unwrap)(alg, key, encryptedKey, iv, tag);
        }
      default:
        {
          throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_6__.JOSENotSupported('Invalid or unsupported "alg" (JWE Algorithm) header value');
        }
    }
  });
  return _decryptKeyManagement.apply(this, arguments);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (decryptKeyManagement);

/***/ }),

/***/ 2542:
/*!**********************************************************************!*\
  !*** ./node_modules/jose/dist/browser/lib/encrypt_key_management.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 1670);
/* harmony import */ var _runtime_aeskw_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../runtime/aeskw.js */ 2339);
/* harmony import */ var _runtime_ecdhes_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../runtime/ecdhes.js */ 8836);
/* harmony import */ var _runtime_pbes2kw_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../runtime/pbes2kw.js */ 8368);
/* harmony import */ var _runtime_rsaes_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../runtime/rsaes.js */ 5103);
/* harmony import */ var _runtime_base64url_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../runtime/base64url.js */ 9485);
/* harmony import */ var _lib_cek_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../lib/cek.js */ 9335);
/* harmony import */ var _util_errors_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../util/errors.js */ 581);
/* harmony import */ var _key_export_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../key/export.js */ 6344);
/* harmony import */ var _check_key_type_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./check_key_type.js */ 2667);
/* harmony import */ var _aesgcmkw_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./aesgcmkw.js */ 8643);











function encryptKeyManagement(_x, _x2, _x3, _x4) {
  return _encryptKeyManagement.apply(this, arguments);
}
function _encryptKeyManagement() {
  _encryptKeyManagement = (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (alg, enc, key, providedCek, providedParameters = {}) {
    let encryptedKey;
    let parameters;
    let cek;
    (0,_check_key_type_js__WEBPACK_IMPORTED_MODULE_9__["default"])(alg, key, 'encrypt');
    switch (alg) {
      case 'dir':
        {
          cek = key;
          break;
        }
      case 'ECDH-ES':
      case 'ECDH-ES+A128KW':
      case 'ECDH-ES+A192KW':
      case 'ECDH-ES+A256KW':
        {
          if (!_runtime_ecdhes_js__WEBPACK_IMPORTED_MODULE_2__.ecdhAllowed(key)) {
            throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_7__.JOSENotSupported('ECDH with the provided key is not allowed or not supported by your javascript runtime');
          }
          const {
            apu,
            apv
          } = providedParameters;
          let {
            epk: ephemeralKey
          } = providedParameters;
          ephemeralKey || (ephemeralKey = (yield _runtime_ecdhes_js__WEBPACK_IMPORTED_MODULE_2__.generateEpk(key)).privateKey);
          const {
            x,
            y,
            crv,
            kty
          } = yield (0,_key_export_js__WEBPACK_IMPORTED_MODULE_8__.exportJWK)(ephemeralKey);
          const sharedSecret = yield _runtime_ecdhes_js__WEBPACK_IMPORTED_MODULE_2__.deriveKey(key, ephemeralKey, alg === 'ECDH-ES' ? enc : alg, alg === 'ECDH-ES' ? (0,_lib_cek_js__WEBPACK_IMPORTED_MODULE_6__.bitLength)(enc) : parseInt(alg.slice(-5, -2), 10), apu, apv);
          parameters = {
            epk: {
              x,
              crv,
              kty
            }
          };
          if (kty === 'EC') parameters.epk.y = y;
          if (apu) parameters.apu = (0,_runtime_base64url_js__WEBPACK_IMPORTED_MODULE_5__.encode)(apu);
          if (apv) parameters.apv = (0,_runtime_base64url_js__WEBPACK_IMPORTED_MODULE_5__.encode)(apv);
          if (alg === 'ECDH-ES') {
            cek = sharedSecret;
            break;
          }
          cek = providedCek || (0,_lib_cek_js__WEBPACK_IMPORTED_MODULE_6__["default"])(enc);
          const kwAlg = alg.slice(-6);
          encryptedKey = yield (0,_runtime_aeskw_js__WEBPACK_IMPORTED_MODULE_1__.wrap)(kwAlg, sharedSecret, cek);
          break;
        }
      case 'RSA1_5':
      case 'RSA-OAEP':
      case 'RSA-OAEP-256':
      case 'RSA-OAEP-384':
      case 'RSA-OAEP-512':
        {
          cek = providedCek || (0,_lib_cek_js__WEBPACK_IMPORTED_MODULE_6__["default"])(enc);
          encryptedKey = yield (0,_runtime_rsaes_js__WEBPACK_IMPORTED_MODULE_4__.encrypt)(alg, key, cek);
          break;
        }
      case 'PBES2-HS256+A128KW':
      case 'PBES2-HS384+A192KW':
      case 'PBES2-HS512+A256KW':
        {
          cek = providedCek || (0,_lib_cek_js__WEBPACK_IMPORTED_MODULE_6__["default"])(enc);
          const {
            p2c,
            p2s
          } = providedParameters;
          ({
            encryptedKey,
            ...parameters
          } = yield (0,_runtime_pbes2kw_js__WEBPACK_IMPORTED_MODULE_3__.encrypt)(alg, key, cek, p2c, p2s));
          break;
        }
      case 'A128KW':
      case 'A192KW':
      case 'A256KW':
        {
          cek = providedCek || (0,_lib_cek_js__WEBPACK_IMPORTED_MODULE_6__["default"])(enc);
          encryptedKey = yield (0,_runtime_aeskw_js__WEBPACK_IMPORTED_MODULE_1__.wrap)(alg, key, cek);
          break;
        }
      case 'A128GCMKW':
      case 'A192GCMKW':
      case 'A256GCMKW':
        {
          cek = providedCek || (0,_lib_cek_js__WEBPACK_IMPORTED_MODULE_6__["default"])(enc);
          const {
            iv
          } = providedParameters;
          ({
            encryptedKey,
            ...parameters
          } = yield (0,_aesgcmkw_js__WEBPACK_IMPORTED_MODULE_10__.wrap)(alg, key, cek, iv));
          break;
        }
      default:
        {
          throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_7__.JOSENotSupported('Invalid or unsupported "alg" (JWE Algorithm) header value');
        }
    }
    return {
      cek,
      encryptedKey,
      parameters
    };
  });
  return _encryptKeyManagement.apply(this, arguments);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (encryptKeyManagement);

/***/ }),

/***/ 3805:
/*!*****************************************************!*\
  !*** ./node_modules/jose/dist/browser/lib/epoch.js ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (date => Math.floor(date.getTime() / 1000));

/***/ }),

/***/ 6711:
/*!**********************************************************!*\
  !*** ./node_modules/jose/dist/browser/lib/format_pem.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((b64, descriptor) => {
  const newlined = (b64.match(/.{1,64}/g) || []).join('\n');
  return `-----BEGIN ${descriptor}-----\n${newlined}\n-----END ${descriptor}-----`;
});

/***/ }),

/***/ 44:
/*!*****************************************************************!*\
  !*** ./node_modules/jose/dist/browser/lib/invalid_key_input.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   withAlg: () => (/* binding */ withAlg)
/* harmony export */ });
function message(msg, actual, ...types) {
  if (types.length > 2) {
    const last = types.pop();
    msg += `one of type ${types.join(', ')}, or ${last}.`;
  } else if (types.length === 2) {
    msg += `one of type ${types[0]} or ${types[1]}.`;
  } else {
    msg += `of type ${types[0]}.`;
  }
  if (actual == null) {
    msg += ` Received ${actual}`;
  } else if (typeof actual === 'function' && actual.name) {
    msg += ` Received function ${actual.name}`;
  } else if (typeof actual === 'object' && actual != null) {
    if (actual.constructor && actual.constructor.name) {
      msg += ` Received an instance of ${actual.constructor.name}`;
    }
  }
  return msg;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((actual, ...types) => {
  return message('Key must be ', actual, ...types);
});
function withAlg(alg, actual, ...types) {
  return message(`Key for the ${alg} algorithm must be `, actual, ...types);
}

/***/ }),

/***/ 6411:
/*!***********************************************************!*\
  !*** ./node_modules/jose/dist/browser/lib/is_disjoint.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const isDisjoint = (...headers) => {
  const sources = headers.filter(Boolean);
  if (sources.length === 0 || sources.length === 1) {
    return true;
  }
  let acc;
  for (const header of sources) {
    const parameters = Object.keys(header);
    if (!acc || acc.size === 0) {
      acc = new Set(parameters);
      continue;
    }
    for (const parameter of parameters) {
      if (acc.has(parameter)) {
        return false;
      }
      acc.add(parameter);
    }
  }
  return true;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isDisjoint);

/***/ }),

/***/ 7157:
/*!*********************************************************!*\
  !*** ./node_modules/jose/dist/browser/lib/is_object.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ isObject)
/* harmony export */ });
function isObjectLike(value) {
  return typeof value === 'object' && value !== null;
}
function isObject(input) {
  if (!isObjectLike(input) || Object.prototype.toString.call(input) !== '[object Object]') {
    return false;
  }
  if (Object.getPrototypeOf(input) === null) {
    return true;
  }
  let proto = input;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }
  return Object.getPrototypeOf(input) === proto;
}

/***/ }),

/***/ 3763:
/*!**************************************************!*\
  !*** ./node_modules/jose/dist/browser/lib/iv.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   bitLength: () => (/* binding */ bitLength),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _util_errors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/errors.js */ 581);
/* harmony import */ var _runtime_random_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../runtime/random.js */ 5366);


function bitLength(alg) {
  switch (alg) {
    case 'A128GCM':
    case 'A128GCMKW':
    case 'A192GCM':
    case 'A192GCMKW':
    case 'A256GCM':
    case 'A256GCMKW':
      return 96;
    case 'A128CBC-HS256':
    case 'A192CBC-HS384':
    case 'A256CBC-HS512':
      return 128;
    default:
      throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_0__.JOSENotSupported(`Unsupported JWE Algorithm: ${alg}`);
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (alg => (0,_runtime_random_js__WEBPACK_IMPORTED_MODULE_1__["default"])(new Uint8Array(bitLength(alg) >> 3)));

/***/ }),

/***/ 5525:
/*!**************************************************************!*\
  !*** ./node_modules/jose/dist/browser/lib/jwt_claims_set.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _util_errors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/errors.js */ 581);
/* harmony import */ var _buffer_utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./buffer_utils.js */ 1088);
/* harmony import */ var _epoch_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./epoch.js */ 3805);
/* harmony import */ var _secs_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./secs.js */ 2112);
/* harmony import */ var _is_object_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./is_object.js */ 7157);





const normalizeTyp = value => value.toLowerCase().replace(/^application\//, '');
const checkAudiencePresence = (audPayload, audOption) => {
  if (typeof audPayload === 'string') {
    return audOption.includes(audPayload);
  }
  if (Array.isArray(audPayload)) {
    return audOption.some(Set.prototype.has.bind(new Set(audPayload)));
  }
  return false;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((protectedHeader, encodedPayload, options = {}) => {
  const {
    typ
  } = options;
  if (typ && (typeof protectedHeader.typ !== 'string' || normalizeTyp(protectedHeader.typ) !== normalizeTyp(typ))) {
    throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_0__.JWTClaimValidationFailed('unexpected "typ" JWT header value', 'typ', 'check_failed');
  }
  let payload;
  try {
    payload = JSON.parse(_buffer_utils_js__WEBPACK_IMPORTED_MODULE_1__.decoder.decode(encodedPayload));
  } catch (_a) {}
  if (!(0,_is_object_js__WEBPACK_IMPORTED_MODULE_4__["default"])(payload)) {
    throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_0__.JWTInvalid('JWT Claims Set must be a top-level JSON object');
  }
  const {
    requiredClaims = [],
    issuer,
    subject,
    audience,
    maxTokenAge
  } = options;
  if (maxTokenAge !== undefined) requiredClaims.push('iat');
  if (audience !== undefined) requiredClaims.push('aud');
  if (subject !== undefined) requiredClaims.push('sub');
  if (issuer !== undefined) requiredClaims.push('iss');
  for (const claim of new Set(requiredClaims.reverse())) {
    if (!(claim in payload)) {
      throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_0__.JWTClaimValidationFailed(`missing required "${claim}" claim`, claim, 'missing');
    }
  }
  if (issuer && !(Array.isArray(issuer) ? issuer : [issuer]).includes(payload.iss)) {
    throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_0__.JWTClaimValidationFailed('unexpected "iss" claim value', 'iss', 'check_failed');
  }
  if (subject && payload.sub !== subject) {
    throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_0__.JWTClaimValidationFailed('unexpected "sub" claim value', 'sub', 'check_failed');
  }
  if (audience && !checkAudiencePresence(payload.aud, typeof audience === 'string' ? [audience] : audience)) {
    throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_0__.JWTClaimValidationFailed('unexpected "aud" claim value', 'aud', 'check_failed');
  }
  let tolerance;
  switch (typeof options.clockTolerance) {
    case 'string':
      tolerance = (0,_secs_js__WEBPACK_IMPORTED_MODULE_3__["default"])(options.clockTolerance);
      break;
    case 'number':
      tolerance = options.clockTolerance;
      break;
    case 'undefined':
      tolerance = 0;
      break;
    default:
      throw new TypeError('Invalid clockTolerance option type');
  }
  const {
    currentDate
  } = options;
  const now = (0,_epoch_js__WEBPACK_IMPORTED_MODULE_2__["default"])(currentDate || new Date());
  if ((payload.iat !== undefined || maxTokenAge) && typeof payload.iat !== 'number') {
    throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_0__.JWTClaimValidationFailed('"iat" claim must be a number', 'iat', 'invalid');
  }
  if (payload.nbf !== undefined) {
    if (typeof payload.nbf !== 'number') {
      throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_0__.JWTClaimValidationFailed('"nbf" claim must be a number', 'nbf', 'invalid');
    }
    if (payload.nbf > now + tolerance) {
      throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_0__.JWTClaimValidationFailed('"nbf" claim timestamp check failed', 'nbf', 'check_failed');
    }
  }
  if (payload.exp !== undefined) {
    if (typeof payload.exp !== 'number') {
      throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_0__.JWTClaimValidationFailed('"exp" claim must be a number', 'exp', 'invalid');
    }
    if (payload.exp <= now - tolerance) {
      throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_0__.JWTExpired('"exp" claim timestamp check failed', 'exp', 'check_failed');
    }
  }
  if (maxTokenAge) {
    const age = now - payload.iat;
    const max = typeof maxTokenAge === 'number' ? maxTokenAge : (0,_secs_js__WEBPACK_IMPORTED_MODULE_3__["default"])(maxTokenAge);
    if (age - tolerance > max) {
      throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_0__.JWTExpired('"iat" claim timestamp check failed (too far in the past)', 'iat', 'check_failed');
    }
    if (age < 0 - tolerance) {
      throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_0__.JWTClaimValidationFailed('"iat" claim timestamp check failed (it should be in the past)', 'iat', 'check_failed');
    }
  }
  return payload;
});

/***/ }),

/***/ 2112:
/*!****************************************************!*\
  !*** ./node_modules/jose/dist/browser/lib/secs.js ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const minute = 60;
const hour = minute * 60;
const day = hour * 24;
const week = day * 7;
const year = day * 365.25;
const REGEX = /^(\d+|\d+\.\d+) ?(seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)$/i;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (str => {
  const matched = REGEX.exec(str);
  if (!matched) {
    throw new TypeError('Invalid time period format');
  }
  const value = parseFloat(matched[1]);
  const unit = matched[2].toLowerCase();
  switch (unit) {
    case 'sec':
    case 'secs':
    case 'second':
    case 'seconds':
    case 's':
      return Math.round(value);
    case 'minute':
    case 'minutes':
    case 'min':
    case 'mins':
    case 'm':
      return Math.round(value * minute);
    case 'hour':
    case 'hours':
    case 'hr':
    case 'hrs':
    case 'h':
      return Math.round(value * hour);
    case 'day':
    case 'days':
    case 'd':
      return Math.round(value * day);
    case 'week':
    case 'weeks':
    case 'w':
      return Math.round(value * week);
    default:
      return Math.round(value * year);
  }
});

/***/ }),

/***/ 652:
/*!*******************************************************************!*\
  !*** ./node_modules/jose/dist/browser/lib/validate_algorithms.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const validateAlgorithms = (option, algorithms) => {
  if (algorithms !== undefined && (!Array.isArray(algorithms) || algorithms.some(s => typeof s !== 'string'))) {
    throw new TypeError(`"${option}" option must be an array of strings`);
  }
  if (!algorithms) {
    return undefined;
  }
  return new Set(algorithms);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (validateAlgorithms);

/***/ }),

/***/ 8859:
/*!*************************************************************!*\
  !*** ./node_modules/jose/dist/browser/lib/validate_crit.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _util_errors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/errors.js */ 581);

function validateCrit(Err, recognizedDefault, recognizedOption, protectedHeader, joseHeader) {
  if (joseHeader.crit !== undefined && protectedHeader.crit === undefined) {
    throw new Err('"crit" (Critical) Header Parameter MUST be integrity protected');
  }
  if (!protectedHeader || protectedHeader.crit === undefined) {
    return new Set();
  }
  if (!Array.isArray(protectedHeader.crit) || protectedHeader.crit.length === 0 || protectedHeader.crit.some(input => typeof input !== 'string' || input.length === 0)) {
    throw new Err('"crit" (Critical) Header Parameter MUST be an array of non-empty strings when present');
  }
  let recognized;
  if (recognizedOption !== undefined) {
    recognized = new Map([...Object.entries(recognizedOption), ...recognizedDefault.entries()]);
  } else {
    recognized = recognizedDefault;
  }
  for (const parameter of protectedHeader.crit) {
    if (!recognized.has(parameter)) {
      throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_0__.JOSENotSupported(`Extension Header Parameter "${parameter}" is not recognized`);
    }
    if (joseHeader[parameter] === undefined) {
      throw new Err(`Extension Header Parameter "${parameter}" is missing`);
    } else if (recognized.get(parameter) && protectedHeader[parameter] === undefined) {
      throw new Err(`Extension Header Parameter "${parameter}" MUST be integrity protected`);
    }
  }
  return new Set(protectedHeader.crit);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (validateCrit);

/***/ }),

/***/ 2339:
/*!*********************************************************!*\
  !*** ./node_modules/jose/dist/browser/runtime/aeskw.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   unwrap: () => (/* binding */ unwrap),
/* harmony export */   wrap: () => (/* binding */ wrap)
/* harmony export */ });
/* harmony import */ var _Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 1670);
/* harmony import */ var _bogus_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bogus.js */ 6545);
/* harmony import */ var _webcrypto_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./webcrypto.js */ 1460);
/* harmony import */ var _lib_crypto_key_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../lib/crypto_key.js */ 3513);
/* harmony import */ var _lib_invalid_key_input_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../lib/invalid_key_input.js */ 44);
/* harmony import */ var _is_key_like_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./is_key_like.js */ 5352);






function checkKeySize(key, alg) {
  if (key.algorithm.length !== parseInt(alg.slice(1, 4), 10)) {
    throw new TypeError(`Invalid key size for alg: ${alg}`);
  }
}
function getCryptoKey(key, alg, usage) {
  if ((0,_webcrypto_js__WEBPACK_IMPORTED_MODULE_2__.isCryptoKey)(key)) {
    (0,_lib_crypto_key_js__WEBPACK_IMPORTED_MODULE_3__.checkEncCryptoKey)(key, alg, usage);
    return key;
  }
  if (key instanceof Uint8Array) {
    return _webcrypto_js__WEBPACK_IMPORTED_MODULE_2__["default"].subtle.importKey('raw', key, 'AES-KW', true, [usage]);
  }
  throw new TypeError((0,_lib_invalid_key_input_js__WEBPACK_IMPORTED_MODULE_4__["default"])(key, ..._is_key_like_js__WEBPACK_IMPORTED_MODULE_5__.types, 'Uint8Array'));
}
const wrap = /*#__PURE__*/function () {
  var _ref = (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (alg, key, cek) {
    const cryptoKey = yield getCryptoKey(key, alg, 'wrapKey');
    checkKeySize(cryptoKey, alg);
    const cryptoKeyCek = yield _webcrypto_js__WEBPACK_IMPORTED_MODULE_2__["default"].subtle.importKey('raw', cek, ..._bogus_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
    return new Uint8Array(yield _webcrypto_js__WEBPACK_IMPORTED_MODULE_2__["default"].subtle.wrapKey('raw', cryptoKeyCek, cryptoKey, 'AES-KW'));
  });
  return function wrap(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
const unwrap = /*#__PURE__*/function () {
  var _ref2 = (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (alg, key, encryptedKey) {
    const cryptoKey = yield getCryptoKey(key, alg, 'unwrapKey');
    checkKeySize(cryptoKey, alg);
    const cryptoKeyCek = yield _webcrypto_js__WEBPACK_IMPORTED_MODULE_2__["default"].subtle.unwrapKey('raw', encryptedKey, cryptoKey, 'AES-KW', ..._bogus_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
    return new Uint8Array(yield _webcrypto_js__WEBPACK_IMPORTED_MODULE_2__["default"].subtle.exportKey('raw', cryptoKeyCek));
  });
  return function unwrap(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

/***/ }),

/***/ 3937:
/*!********************************************************!*\
  !*** ./node_modules/jose/dist/browser/runtime/asn1.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fromPKCS8: () => (/* binding */ fromPKCS8),
/* harmony export */   fromSPKI: () => (/* binding */ fromSPKI),
/* harmony export */   fromX509: () => (/* binding */ fromX509),
/* harmony export */   toPKCS8: () => (/* binding */ toPKCS8),
/* harmony export */   toSPKI: () => (/* binding */ toSPKI)
/* harmony export */ });
/* harmony import */ var _Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 1670);
/* harmony import */ var _webcrypto_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./webcrypto.js */ 1460);
/* harmony import */ var _lib_invalid_key_input_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/invalid_key_input.js */ 44);
/* harmony import */ var _base64url_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./base64url.js */ 9485);
/* harmony import */ var _lib_format_pem_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../lib/format_pem.js */ 6711);
/* harmony import */ var _util_errors_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../util/errors.js */ 581);
/* harmony import */ var _is_key_like_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./is_key_like.js */ 5352);







const genericExport = /*#__PURE__*/function () {
  var _ref = (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (keyType, keyFormat, key) {
    if (!(0,_webcrypto_js__WEBPACK_IMPORTED_MODULE_1__.isCryptoKey)(key)) {
      throw new TypeError((0,_lib_invalid_key_input_js__WEBPACK_IMPORTED_MODULE_2__["default"])(key, ..._is_key_like_js__WEBPACK_IMPORTED_MODULE_6__.types));
    }
    if (!key.extractable) {
      throw new TypeError('CryptoKey is not extractable');
    }
    if (key.type !== keyType) {
      throw new TypeError(`key is not a ${keyType} key`);
    }
    return (0,_lib_format_pem_js__WEBPACK_IMPORTED_MODULE_4__["default"])((0,_base64url_js__WEBPACK_IMPORTED_MODULE_3__.encodeBase64)(new Uint8Array(yield _webcrypto_js__WEBPACK_IMPORTED_MODULE_1__["default"].subtle.exportKey(keyFormat, key))), `${keyType.toUpperCase()} KEY`);
  });
  return function genericExport(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
const toSPKI = key => {
  return genericExport('public', 'spki', key);
};
const toPKCS8 = key => {
  return genericExport('private', 'pkcs8', key);
};
const findOid = (keyData, oid, from = 0) => {
  if (from === 0) {
    oid.unshift(oid.length);
    oid.unshift(0x06);
  }
  let i = keyData.indexOf(oid[0], from);
  if (i === -1) return false;
  const sub = keyData.subarray(i, i + oid.length);
  if (sub.length !== oid.length) return false;
  return sub.every((value, index) => value === oid[index]) || findOid(keyData, oid, i + 1);
};
const getNamedCurve = keyData => {
  switch (true) {
    case findOid(keyData, [0x2a, 0x86, 0x48, 0xce, 0x3d, 0x03, 0x01, 0x07]):
      return 'P-256';
    case findOid(keyData, [0x2b, 0x81, 0x04, 0x00, 0x22]):
      return 'P-384';
    case findOid(keyData, [0x2b, 0x81, 0x04, 0x00, 0x23]):
      return 'P-521';
    case findOid(keyData, [0x2b, 0x65, 0x6e]):
      return 'X25519';
    case findOid(keyData, [0x2b, 0x65, 0x6f]):
      return 'X448';
    case findOid(keyData, [0x2b, 0x65, 0x70]):
      return 'Ed25519';
    case findOid(keyData, [0x2b, 0x65, 0x71]):
      return 'Ed448';
    default:
      throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_5__.JOSENotSupported('Invalid or unsupported EC Key Curve or OKP Key Sub Type');
  }
};
const genericImport = /*#__PURE__*/function () {
  var _ref2 = (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (replace, keyFormat, pem, alg, options) {
    var _a;
    let algorithm;
    let keyUsages;
    const keyData = new Uint8Array(atob(pem.replace(replace, '')).split('').map(c => c.charCodeAt(0)));
    const isPublic = keyFormat === 'spki';
    switch (alg) {
      case 'PS256':
      case 'PS384':
      case 'PS512':
        algorithm = {
          name: 'RSA-PSS',
          hash: `SHA-${alg.slice(-3)}`
        };
        keyUsages = isPublic ? ['verify'] : ['sign'];
        break;
      case 'RS256':
      case 'RS384':
      case 'RS512':
        algorithm = {
          name: 'RSASSA-PKCS1-v1_5',
          hash: `SHA-${alg.slice(-3)}`
        };
        keyUsages = isPublic ? ['verify'] : ['sign'];
        break;
      case 'RSA-OAEP':
      case 'RSA-OAEP-256':
      case 'RSA-OAEP-384':
      case 'RSA-OAEP-512':
        algorithm = {
          name: 'RSA-OAEP',
          hash: `SHA-${parseInt(alg.slice(-3), 10) || 1}`
        };
        keyUsages = isPublic ? ['encrypt', 'wrapKey'] : ['decrypt', 'unwrapKey'];
        break;
      case 'ES256':
        algorithm = {
          name: 'ECDSA',
          namedCurve: 'P-256'
        };
        keyUsages = isPublic ? ['verify'] : ['sign'];
        break;
      case 'ES384':
        algorithm = {
          name: 'ECDSA',
          namedCurve: 'P-384'
        };
        keyUsages = isPublic ? ['verify'] : ['sign'];
        break;
      case 'ES512':
        algorithm = {
          name: 'ECDSA',
          namedCurve: 'P-521'
        };
        keyUsages = isPublic ? ['verify'] : ['sign'];
        break;
      case 'ECDH-ES':
      case 'ECDH-ES+A128KW':
      case 'ECDH-ES+A192KW':
      case 'ECDH-ES+A256KW':
        {
          const namedCurve = getNamedCurve(keyData);
          algorithm = namedCurve.startsWith('P-') ? {
            name: 'ECDH',
            namedCurve
          } : {
            name: namedCurve
          };
          keyUsages = isPublic ? [] : ['deriveBits'];
          break;
        }
      case 'EdDSA':
        algorithm = {
          name: getNamedCurve(keyData)
        };
        keyUsages = isPublic ? ['verify'] : ['sign'];
        break;
      default:
        throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_5__.JOSENotSupported('Invalid or unsupported "alg" (Algorithm) value');
    }
    return _webcrypto_js__WEBPACK_IMPORTED_MODULE_1__["default"].subtle.importKey(keyFormat, keyData, algorithm, (_a = options === null || options === void 0 ? void 0 : options.extractable) !== null && _a !== void 0 ? _a : false, keyUsages);
  });
  return function genericImport(_x4, _x5, _x6, _x7, _x8) {
    return _ref2.apply(this, arguments);
  };
}();
const fromPKCS8 = (pem, alg, options) => {
  return genericImport(/(?:-----(?:BEGIN|END) PRIVATE KEY-----|\s)/g, 'pkcs8', pem, alg, options);
};
const fromSPKI = (pem, alg, options) => {
  return genericImport(/(?:-----(?:BEGIN|END) PUBLIC KEY-----|\s)/g, 'spki', pem, alg, options);
};
function getElement(seq) {
  let result = [];
  let next = 0;
  while (next < seq.length) {
    let nextPart = parseElement(seq.subarray(next));
    result.push(nextPart);
    next += nextPart.byteLength;
  }
  return result;
}
function parseElement(bytes) {
  let position = 0;
  let tag = bytes[0] & 0x1f;
  position++;
  if (tag === 0x1f) {
    tag = 0;
    while (bytes[position] >= 0x80) {
      tag = tag * 128 + bytes[position] - 0x80;
      position++;
    }
    tag = tag * 128 + bytes[position] - 0x80;
    position++;
  }
  let length = 0;
  if (bytes[position] < 0x80) {
    length = bytes[position];
    position++;
  } else if (length === 0x80) {
    length = 0;
    while (bytes[position + length] !== 0 || bytes[position + length + 1] !== 0) {
      if (length > bytes.byteLength) {
        throw new TypeError('invalid indefinite form length');
      }
      length++;
    }
    const byteLength = position + length + 2;
    return {
      byteLength,
      contents: bytes.subarray(position, position + length),
      raw: bytes.subarray(0, byteLength)
    };
  } else {
    let numberOfDigits = bytes[position] & 0x7f;
    position++;
    length = 0;
    for (let i = 0; i < numberOfDigits; i++) {
      length = length * 256 + bytes[position];
      position++;
    }
  }
  const byteLength = position + length;
  return {
    byteLength,
    contents: bytes.subarray(position, byteLength),
    raw: bytes.subarray(0, byteLength)
  };
}
function spkiFromX509(buf) {
  const tbsCertificate = getElement(getElement(parseElement(buf).contents)[0].contents);
  return (0,_base64url_js__WEBPACK_IMPORTED_MODULE_3__.encodeBase64)(tbsCertificate[tbsCertificate[0].raw[0] === 0xa0 ? 6 : 5].raw);
}
function getSPKI(x509) {
  const pem = x509.replace(/(?:-----(?:BEGIN|END) CERTIFICATE-----|\s)/g, '');
  const raw = (0,_base64url_js__WEBPACK_IMPORTED_MODULE_3__.decodeBase64)(pem);
  return (0,_lib_format_pem_js__WEBPACK_IMPORTED_MODULE_4__["default"])(spkiFromX509(raw), 'PUBLIC KEY');
}
const fromX509 = (pem, alg, options) => {
  let spki;
  try {
    spki = getSPKI(pem);
  } catch (cause) {
    throw new TypeError('failed to parse the X.509 certificate', {
      cause
    });
  }
  return fromSPKI(spki, alg, options);
};

/***/ }),

/***/ 9485:
/*!*************************************************************!*\
  !*** ./node_modules/jose/dist/browser/runtime/base64url.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   decode: () => (/* binding */ decode),
/* harmony export */   decodeBase64: () => (/* binding */ decodeBase64),
/* harmony export */   encode: () => (/* binding */ encode),
/* harmony export */   encodeBase64: () => (/* binding */ encodeBase64)
/* harmony export */ });
/* harmony import */ var _lib_buffer_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/buffer_utils.js */ 1088);

const encodeBase64 = input => {
  let unencoded = input;
  if (typeof unencoded === 'string') {
    unencoded = _lib_buffer_utils_js__WEBPACK_IMPORTED_MODULE_0__.encoder.encode(unencoded);
  }
  const CHUNK_SIZE = 0x8000;
  const arr = [];
  for (let i = 0; i < unencoded.length; i += CHUNK_SIZE) {
    arr.push(String.fromCharCode.apply(null, unencoded.subarray(i, i + CHUNK_SIZE)));
  }
  return btoa(arr.join(''));
};
const encode = input => {
  return encodeBase64(input).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
};
const decodeBase64 = encoded => {
  const binary = atob(encoded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
};
const decode = input => {
  let encoded = input;
  if (encoded instanceof Uint8Array) {
    encoded = _lib_buffer_utils_js__WEBPACK_IMPORTED_MODULE_0__.decoder.decode(encoded);
  }
  encoded = encoded.replace(/-/g, '+').replace(/_/g, '/').replace(/\s/g, '');
  try {
    return decodeBase64(encoded);
  } catch (_a) {
    throw new TypeError('The input to be decoded is not correctly encoded.');
  }
};

/***/ }),

/***/ 6545:
/*!*********************************************************!*\
  !*** ./node_modules/jose/dist/browser/runtime/bogus.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const bogusWebCrypto = [{
  hash: 'SHA-256',
  name: 'HMAC'
}, true, ['sign']];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (bogusWebCrypto);

/***/ }),

/***/ 7843:
/*!********************************************************************!*\
  !*** ./node_modules/jose/dist/browser/runtime/check_cek_length.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _util_errors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/errors.js */ 581);

const checkCekLength = (cek, expected) => {
  const actual = cek.byteLength << 3;
  if (actual !== expected) {
    throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_0__.JWEInvalid(`Invalid Content Encryption Key length. Expected ${expected} bits, got ${actual} bits`);
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (checkCekLength);

/***/ }),

/***/ 9397:
/*!********************************************************************!*\
  !*** ./node_modules/jose/dist/browser/runtime/check_key_length.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((alg, key) => {
  if (alg.startsWith('RS') || alg.startsWith('PS')) {
    const {
      modulusLength
    } = key.algorithm;
    if (typeof modulusLength !== 'number' || modulusLength < 2048) {
      throw new TypeError(`${alg} requires key modulusLength to be 2048 bits or larger`);
    }
  }
});

/***/ }),

/***/ 56:
/*!***********************************************************!*\
  !*** ./node_modules/jose/dist/browser/runtime/decrypt.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 1670);
/* harmony import */ var _lib_buffer_utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/buffer_utils.js */ 1088);
/* harmony import */ var _lib_check_iv_length_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/check_iv_length.js */ 8656);
/* harmony import */ var _check_cek_length_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./check_cek_length.js */ 7843);
/* harmony import */ var _timing_safe_equal_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./timing_safe_equal.js */ 2125);
/* harmony import */ var _util_errors_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../util/errors.js */ 581);
/* harmony import */ var _webcrypto_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./webcrypto.js */ 1460);
/* harmony import */ var _lib_crypto_key_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../lib/crypto_key.js */ 3513);
/* harmony import */ var _lib_invalid_key_input_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../lib/invalid_key_input.js */ 44);
/* harmony import */ var _is_key_like_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./is_key_like.js */ 5352);










function cbcDecrypt(_x, _x2, _x3, _x4, _x5, _x6) {
  return _cbcDecrypt.apply(this, arguments);
}
function _cbcDecrypt() {
  _cbcDecrypt = (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (enc, cek, ciphertext, iv, tag, aad) {
    if (!(cek instanceof Uint8Array)) {
      throw new TypeError((0,_lib_invalid_key_input_js__WEBPACK_IMPORTED_MODULE_8__["default"])(cek, 'Uint8Array'));
    }
    const keySize = parseInt(enc.slice(1, 4), 10);
    const encKey = yield _webcrypto_js__WEBPACK_IMPORTED_MODULE_6__["default"].subtle.importKey('raw', cek.subarray(keySize >> 3), 'AES-CBC', false, ['decrypt']);
    const macKey = yield _webcrypto_js__WEBPACK_IMPORTED_MODULE_6__["default"].subtle.importKey('raw', cek.subarray(0, keySize >> 3), {
      hash: `SHA-${keySize << 1}`,
      name: 'HMAC'
    }, false, ['sign']);
    const macData = (0,_lib_buffer_utils_js__WEBPACK_IMPORTED_MODULE_1__.concat)(aad, iv, ciphertext, (0,_lib_buffer_utils_js__WEBPACK_IMPORTED_MODULE_1__.uint64be)(aad.length << 3));
    const expectedTag = new Uint8Array((yield _webcrypto_js__WEBPACK_IMPORTED_MODULE_6__["default"].subtle.sign('HMAC', macKey, macData)).slice(0, keySize >> 3));
    let macCheckPassed;
    try {
      macCheckPassed = (0,_timing_safe_equal_js__WEBPACK_IMPORTED_MODULE_4__["default"])(tag, expectedTag);
    } catch (_a) {}
    if (!macCheckPassed) {
      throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_5__.JWEDecryptionFailed();
    }
    let plaintext;
    try {
      plaintext = new Uint8Array(yield _webcrypto_js__WEBPACK_IMPORTED_MODULE_6__["default"].subtle.decrypt({
        iv,
        name: 'AES-CBC'
      }, encKey, ciphertext));
    } catch (_b) {}
    if (!plaintext) {
      throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_5__.JWEDecryptionFailed();
    }
    return plaintext;
  });
  return _cbcDecrypt.apply(this, arguments);
}
function gcmDecrypt(_x7, _x8, _x9, _x10, _x11, _x12) {
  return _gcmDecrypt.apply(this, arguments);
}
function _gcmDecrypt() {
  _gcmDecrypt = (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (enc, cek, ciphertext, iv, tag, aad) {
    let encKey;
    if (cek instanceof Uint8Array) {
      encKey = yield _webcrypto_js__WEBPACK_IMPORTED_MODULE_6__["default"].subtle.importKey('raw', cek, 'AES-GCM', false, ['decrypt']);
    } else {
      (0,_lib_crypto_key_js__WEBPACK_IMPORTED_MODULE_7__.checkEncCryptoKey)(cek, enc, 'decrypt');
      encKey = cek;
    }
    try {
      return new Uint8Array(yield _webcrypto_js__WEBPACK_IMPORTED_MODULE_6__["default"].subtle.decrypt({
        additionalData: aad,
        iv,
        name: 'AES-GCM',
        tagLength: 128
      }, encKey, (0,_lib_buffer_utils_js__WEBPACK_IMPORTED_MODULE_1__.concat)(ciphertext, tag)));
    } catch (_a) {
      throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_5__.JWEDecryptionFailed();
    }
  });
  return _gcmDecrypt.apply(this, arguments);
}
const decrypt = /*#__PURE__*/function () {
  var _ref = (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (enc, cek, ciphertext, iv, tag, aad) {
    if (!(0,_webcrypto_js__WEBPACK_IMPORTED_MODULE_6__.isCryptoKey)(cek) && !(cek instanceof Uint8Array)) {
      throw new TypeError((0,_lib_invalid_key_input_js__WEBPACK_IMPORTED_MODULE_8__["default"])(cek, ..._is_key_like_js__WEBPACK_IMPORTED_MODULE_9__.types, 'Uint8Array'));
    }
    (0,_lib_check_iv_length_js__WEBPACK_IMPORTED_MODULE_2__["default"])(enc, iv);
    switch (enc) {
      case 'A128CBC-HS256':
      case 'A192CBC-HS384':
      case 'A256CBC-HS512':
        if (cek instanceof Uint8Array) (0,_check_cek_length_js__WEBPACK_IMPORTED_MODULE_3__["default"])(cek, parseInt(enc.slice(-3), 10));
        return cbcDecrypt(enc, cek, ciphertext, iv, tag, aad);
      case 'A128GCM':
      case 'A192GCM':
      case 'A256GCM':
        if (cek instanceof Uint8Array) (0,_check_cek_length_js__WEBPACK_IMPORTED_MODULE_3__["default"])(cek, parseInt(enc.slice(1, 4), 10));
        return gcmDecrypt(enc, cek, ciphertext, iv, tag, aad);
      default:
        throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_5__.JOSENotSupported('Unsupported JWE Content Encryption Algorithm');
    }
  });
  return function decrypt(_x13, _x14, _x15, _x16, _x17, _x18) {
    return _ref.apply(this, arguments);
  };
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (decrypt);

/***/ }),

/***/ 1996:
/*!**********************************************************!*\
  !*** ./node_modules/jose/dist/browser/runtime/digest.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 1670);
/* harmony import */ var _webcrypto_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./webcrypto.js */ 1460);


const digest = /*#__PURE__*/function () {
  var _ref = (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (algorithm, data) {
    const subtleDigest = `SHA-${algorithm.slice(-3)}`;
    return new Uint8Array(yield _webcrypto_js__WEBPACK_IMPORTED_MODULE_1__["default"].subtle.digest(subtleDigest, data));
  });
  return function digest(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (digest);

/***/ }),

/***/ 8836:
/*!**********************************************************!*\
  !*** ./node_modules/jose/dist/browser/runtime/ecdhes.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   deriveKey: () => (/* binding */ deriveKey),
/* harmony export */   ecdhAllowed: () => (/* binding */ ecdhAllowed),
/* harmony export */   generateEpk: () => (/* binding */ generateEpk)
/* harmony export */ });
/* harmony import */ var _Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 1670);
/* harmony import */ var _lib_buffer_utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/buffer_utils.js */ 1088);
/* harmony import */ var _webcrypto_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./webcrypto.js */ 1460);
/* harmony import */ var _lib_crypto_key_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../lib/crypto_key.js */ 3513);
/* harmony import */ var _lib_invalid_key_input_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../lib/invalid_key_input.js */ 44);
/* harmony import */ var _is_key_like_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./is_key_like.js */ 5352);






function deriveKey(_x, _x2, _x3, _x4) {
  return _deriveKey.apply(this, arguments);
}
function _deriveKey() {
  _deriveKey = (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (publicKey, privateKey, algorithm, keyLength, apu = new Uint8Array(0), apv = new Uint8Array(0)) {
    if (!(0,_webcrypto_js__WEBPACK_IMPORTED_MODULE_2__.isCryptoKey)(publicKey)) {
      throw new TypeError((0,_lib_invalid_key_input_js__WEBPACK_IMPORTED_MODULE_4__["default"])(publicKey, ..._is_key_like_js__WEBPACK_IMPORTED_MODULE_5__.types));
    }
    (0,_lib_crypto_key_js__WEBPACK_IMPORTED_MODULE_3__.checkEncCryptoKey)(publicKey, 'ECDH');
    if (!(0,_webcrypto_js__WEBPACK_IMPORTED_MODULE_2__.isCryptoKey)(privateKey)) {
      throw new TypeError((0,_lib_invalid_key_input_js__WEBPACK_IMPORTED_MODULE_4__["default"])(privateKey, ..._is_key_like_js__WEBPACK_IMPORTED_MODULE_5__.types));
    }
    (0,_lib_crypto_key_js__WEBPACK_IMPORTED_MODULE_3__.checkEncCryptoKey)(privateKey, 'ECDH', 'deriveBits');
    const value = (0,_lib_buffer_utils_js__WEBPACK_IMPORTED_MODULE_1__.concat)((0,_lib_buffer_utils_js__WEBPACK_IMPORTED_MODULE_1__.lengthAndInput)(_lib_buffer_utils_js__WEBPACK_IMPORTED_MODULE_1__.encoder.encode(algorithm)), (0,_lib_buffer_utils_js__WEBPACK_IMPORTED_MODULE_1__.lengthAndInput)(apu), (0,_lib_buffer_utils_js__WEBPACK_IMPORTED_MODULE_1__.lengthAndInput)(apv), (0,_lib_buffer_utils_js__WEBPACK_IMPORTED_MODULE_1__.uint32be)(keyLength));
    let length;
    if (publicKey.algorithm.name === 'X25519') {
      length = 256;
    } else if (publicKey.algorithm.name === 'X448') {
      length = 448;
    } else {
      length = Math.ceil(parseInt(publicKey.algorithm.namedCurve.substr(-3), 10) / 8) << 3;
    }
    const sharedSecret = new Uint8Array(yield _webcrypto_js__WEBPACK_IMPORTED_MODULE_2__["default"].subtle.deriveBits({
      name: publicKey.algorithm.name,
      public: publicKey
    }, privateKey, length));
    return (0,_lib_buffer_utils_js__WEBPACK_IMPORTED_MODULE_1__.concatKdf)(sharedSecret, keyLength, value);
  });
  return _deriveKey.apply(this, arguments);
}
function generateEpk(_x5) {
  return _generateEpk.apply(this, arguments);
}
function _generateEpk() {
  _generateEpk = (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (key) {
    if (!(0,_webcrypto_js__WEBPACK_IMPORTED_MODULE_2__.isCryptoKey)(key)) {
      throw new TypeError((0,_lib_invalid_key_input_js__WEBPACK_IMPORTED_MODULE_4__["default"])(key, ..._is_key_like_js__WEBPACK_IMPORTED_MODULE_5__.types));
    }
    return _webcrypto_js__WEBPACK_IMPORTED_MODULE_2__["default"].subtle.generateKey(key.algorithm, true, ['deriveBits']);
  });
  return _generateEpk.apply(this, arguments);
}
function ecdhAllowed(key) {
  if (!(0,_webcrypto_js__WEBPACK_IMPORTED_MODULE_2__.isCryptoKey)(key)) {
    throw new TypeError((0,_lib_invalid_key_input_js__WEBPACK_IMPORTED_MODULE_4__["default"])(key, ..._is_key_like_js__WEBPACK_IMPORTED_MODULE_5__.types));
  }
  return ['P-256', 'P-384', 'P-521'].includes(key.algorithm.namedCurve) || key.algorithm.name === 'X25519' || key.algorithm.name === 'X448';
}

/***/ }),

/***/ 9562:
/*!***********************************************************!*\
  !*** ./node_modules/jose/dist/browser/runtime/encrypt.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 1670);
/* harmony import */ var _lib_buffer_utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/buffer_utils.js */ 1088);
/* harmony import */ var _lib_check_iv_length_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/check_iv_length.js */ 8656);
/* harmony import */ var _check_cek_length_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./check_cek_length.js */ 7843);
/* harmony import */ var _webcrypto_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./webcrypto.js */ 1460);
/* harmony import */ var _lib_crypto_key_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../lib/crypto_key.js */ 3513);
/* harmony import */ var _lib_invalid_key_input_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../lib/invalid_key_input.js */ 44);
/* harmony import */ var _util_errors_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../util/errors.js */ 581);
/* harmony import */ var _is_key_like_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./is_key_like.js */ 5352);









function cbcEncrypt(_x, _x2, _x3, _x4, _x5) {
  return _cbcEncrypt.apply(this, arguments);
}
function _cbcEncrypt() {
  _cbcEncrypt = (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (enc, plaintext, cek, iv, aad) {
    if (!(cek instanceof Uint8Array)) {
      throw new TypeError((0,_lib_invalid_key_input_js__WEBPACK_IMPORTED_MODULE_6__["default"])(cek, 'Uint8Array'));
    }
    const keySize = parseInt(enc.slice(1, 4), 10);
    const encKey = yield _webcrypto_js__WEBPACK_IMPORTED_MODULE_4__["default"].subtle.importKey('raw', cek.subarray(keySize >> 3), 'AES-CBC', false, ['encrypt']);
    const macKey = yield _webcrypto_js__WEBPACK_IMPORTED_MODULE_4__["default"].subtle.importKey('raw', cek.subarray(0, keySize >> 3), {
      hash: `SHA-${keySize << 1}`,
      name: 'HMAC'
    }, false, ['sign']);
    const ciphertext = new Uint8Array(yield _webcrypto_js__WEBPACK_IMPORTED_MODULE_4__["default"].subtle.encrypt({
      iv,
      name: 'AES-CBC'
    }, encKey, plaintext));
    const macData = (0,_lib_buffer_utils_js__WEBPACK_IMPORTED_MODULE_1__.concat)(aad, iv, ciphertext, (0,_lib_buffer_utils_js__WEBPACK_IMPORTED_MODULE_1__.uint64be)(aad.length << 3));
    const tag = new Uint8Array((yield _webcrypto_js__WEBPACK_IMPORTED_MODULE_4__["default"].subtle.sign('HMAC', macKey, macData)).slice(0, keySize >> 3));
    return {
      ciphertext,
      tag
    };
  });
  return _cbcEncrypt.apply(this, arguments);
}
function gcmEncrypt(_x6, _x7, _x8, _x9, _x10) {
  return _gcmEncrypt.apply(this, arguments);
}
function _gcmEncrypt() {
  _gcmEncrypt = (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (enc, plaintext, cek, iv, aad) {
    let encKey;
    if (cek instanceof Uint8Array) {
      encKey = yield _webcrypto_js__WEBPACK_IMPORTED_MODULE_4__["default"].subtle.importKey('raw', cek, 'AES-GCM', false, ['encrypt']);
    } else {
      (0,_lib_crypto_key_js__WEBPACK_IMPORTED_MODULE_5__.checkEncCryptoKey)(cek, enc, 'encrypt');
      encKey = cek;
    }
    const encrypted = new Uint8Array(yield _webcrypto_js__WEBPACK_IMPORTED_MODULE_4__["default"].subtle.encrypt({
      additionalData: aad,
      iv,
      name: 'AES-GCM',
      tagLength: 128
    }, encKey, plaintext));
    const tag = encrypted.slice(-16);
    const ciphertext = encrypted.slice(0, -16);
    return {
      ciphertext,
      tag
    };
  });
  return _gcmEncrypt.apply(this, arguments);
}
const encrypt = /*#__PURE__*/function () {
  var _ref = (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (enc, plaintext, cek, iv, aad) {
    if (!(0,_webcrypto_js__WEBPACK_IMPORTED_MODULE_4__.isCryptoKey)(cek) && !(cek instanceof Uint8Array)) {
      throw new TypeError((0,_lib_invalid_key_input_js__WEBPACK_IMPORTED_MODULE_6__["default"])(cek, ..._is_key_like_js__WEBPACK_IMPORTED_MODULE_8__.types, 'Uint8Array'));
    }
    (0,_lib_check_iv_length_js__WEBPACK_IMPORTED_MODULE_2__["default"])(enc, iv);
    switch (enc) {
      case 'A128CBC-HS256':
      case 'A192CBC-HS384':
      case 'A256CBC-HS512':
        if (cek instanceof Uint8Array) (0,_check_cek_length_js__WEBPACK_IMPORTED_MODULE_3__["default"])(cek, parseInt(enc.slice(-3), 10));
        return cbcEncrypt(enc, plaintext, cek, iv, aad);
      case 'A128GCM':
      case 'A192GCM':
      case 'A256GCM':
        if (cek instanceof Uint8Array) (0,_check_cek_length_js__WEBPACK_IMPORTED_MODULE_3__["default"])(cek, parseInt(enc.slice(1, 4), 10));
        return gcmEncrypt(enc, plaintext, cek, iv, aad);
      default:
        throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_7__.JOSENotSupported('Unsupported JWE Content Encryption Algorithm');
    }
  });
  return function encrypt(_x11, _x12, _x13, _x14, _x15) {
    return _ref.apply(this, arguments);
  };
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (encrypt);

/***/ }),

/***/ 2143:
/*!**************************************************************!*\
  !*** ./node_modules/jose/dist/browser/runtime/fetch_jwks.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 1670);
/* harmony import */ var _util_errors_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/errors.js */ 581);


const fetchJwks = /*#__PURE__*/function () {
  var _ref = (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (url, timeout, options) {
    let controller;
    let id;
    let timedOut = false;
    if (typeof AbortController === 'function') {
      controller = new AbortController();
      id = setTimeout(() => {
        timedOut = true;
        controller.abort();
      }, timeout);
    }
    const response = yield fetch(url.href, {
      signal: controller ? controller.signal : undefined,
      redirect: 'manual',
      headers: options.headers
    }).catch(err => {
      if (timedOut) throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_1__.JWKSTimeout();
      throw err;
    });
    if (id !== undefined) clearTimeout(id);
    if (response.status !== 200) {
      throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_1__.JOSEError('Expected 200 OK from the JSON Web Key Set HTTP response');
    }
    try {
      return yield response.json();
    } catch (_a) {
      throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_1__.JOSEError('Failed to parse the JSON Web Key Set HTTP response as JSON');
    }
  });
  return function fetchJwks(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (fetchJwks);

/***/ }),

/***/ 58:
/*!************************************************************!*\
  !*** ./node_modules/jose/dist/browser/runtime/generate.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   generateKeyPair: () => (/* binding */ generateKeyPair),
/* harmony export */   generateSecret: () => (/* binding */ generateSecret)
/* harmony export */ });
/* harmony import */ var _Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 1670);
/* harmony import */ var _webcrypto_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./webcrypto.js */ 1460);
/* harmony import */ var _util_errors_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/errors.js */ 581);
/* harmony import */ var _random_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./random.js */ 5366);




function generateSecret(_x, _x2) {
  return _generateSecret.apply(this, arguments);
}
function _generateSecret() {
  _generateSecret = (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (alg, options) {
    var _a;
    let length;
    let algorithm;
    let keyUsages;
    switch (alg) {
      case 'HS256':
      case 'HS384':
      case 'HS512':
        length = parseInt(alg.slice(-3), 10);
        algorithm = {
          name: 'HMAC',
          hash: `SHA-${length}`,
          length
        };
        keyUsages = ['sign', 'verify'];
        break;
      case 'A128CBC-HS256':
      case 'A192CBC-HS384':
      case 'A256CBC-HS512':
        length = parseInt(alg.slice(-3), 10);
        return (0,_random_js__WEBPACK_IMPORTED_MODULE_3__["default"])(new Uint8Array(length >> 3));
      case 'A128KW':
      case 'A192KW':
      case 'A256KW':
        length = parseInt(alg.slice(1, 4), 10);
        algorithm = {
          name: 'AES-KW',
          length
        };
        keyUsages = ['wrapKey', 'unwrapKey'];
        break;
      case 'A128GCMKW':
      case 'A192GCMKW':
      case 'A256GCMKW':
      case 'A128GCM':
      case 'A192GCM':
      case 'A256GCM':
        length = parseInt(alg.slice(1, 4), 10);
        algorithm = {
          name: 'AES-GCM',
          length
        };
        keyUsages = ['encrypt', 'decrypt'];
        break;
      default:
        throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_2__.JOSENotSupported('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
    }
    return _webcrypto_js__WEBPACK_IMPORTED_MODULE_1__["default"].subtle.generateKey(algorithm, (_a = options === null || options === void 0 ? void 0 : options.extractable) !== null && _a !== void 0 ? _a : false, keyUsages);
  });
  return _generateSecret.apply(this, arguments);
}
function getModulusLengthOption(options) {
  var _a;
  const modulusLength = (_a = options === null || options === void 0 ? void 0 : options.modulusLength) !== null && _a !== void 0 ? _a : 2048;
  if (typeof modulusLength !== 'number' || modulusLength < 2048) {
    throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_2__.JOSENotSupported('Invalid or unsupported modulusLength option provided, 2048 bits or larger keys must be used');
  }
  return modulusLength;
}
function generateKeyPair(_x3, _x4) {
  return _generateKeyPair.apply(this, arguments);
}
function _generateKeyPair() {
  _generateKeyPair = (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (alg, options) {
    var _a, _b, _c;
    let algorithm;
    let keyUsages;
    switch (alg) {
      case 'PS256':
      case 'PS384':
      case 'PS512':
        algorithm = {
          name: 'RSA-PSS',
          hash: `SHA-${alg.slice(-3)}`,
          publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
          modulusLength: getModulusLengthOption(options)
        };
        keyUsages = ['sign', 'verify'];
        break;
      case 'RS256':
      case 'RS384':
      case 'RS512':
        algorithm = {
          name: 'RSASSA-PKCS1-v1_5',
          hash: `SHA-${alg.slice(-3)}`,
          publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
          modulusLength: getModulusLengthOption(options)
        };
        keyUsages = ['sign', 'verify'];
        break;
      case 'RSA-OAEP':
      case 'RSA-OAEP-256':
      case 'RSA-OAEP-384':
      case 'RSA-OAEP-512':
        algorithm = {
          name: 'RSA-OAEP',
          hash: `SHA-${parseInt(alg.slice(-3), 10) || 1}`,
          publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
          modulusLength: getModulusLengthOption(options)
        };
        keyUsages = ['decrypt', 'unwrapKey', 'encrypt', 'wrapKey'];
        break;
      case 'ES256':
        algorithm = {
          name: 'ECDSA',
          namedCurve: 'P-256'
        };
        keyUsages = ['sign', 'verify'];
        break;
      case 'ES384':
        algorithm = {
          name: 'ECDSA',
          namedCurve: 'P-384'
        };
        keyUsages = ['sign', 'verify'];
        break;
      case 'ES512':
        algorithm = {
          name: 'ECDSA',
          namedCurve: 'P-521'
        };
        keyUsages = ['sign', 'verify'];
        break;
      case 'EdDSA':
        keyUsages = ['sign', 'verify'];
        const crv = (_a = options === null || options === void 0 ? void 0 : options.crv) !== null && _a !== void 0 ? _a : 'Ed25519';
        switch (crv) {
          case 'Ed25519':
          case 'Ed448':
            algorithm = {
              name: crv
            };
            break;
          default:
            throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_2__.JOSENotSupported('Invalid or unsupported crv option provided');
        }
        break;
      case 'ECDH-ES':
      case 'ECDH-ES+A128KW':
      case 'ECDH-ES+A192KW':
      case 'ECDH-ES+A256KW':
        {
          keyUsages = ['deriveKey', 'deriveBits'];
          const crv = (_b = options === null || options === void 0 ? void 0 : options.crv) !== null && _b !== void 0 ? _b : 'P-256';
          switch (crv) {
            case 'P-256':
            case 'P-384':
            case 'P-521':
              {
                algorithm = {
                  name: 'ECDH',
                  namedCurve: crv
                };
                break;
              }
            case 'X25519':
            case 'X448':
              algorithm = {
                name: crv
              };
              break;
            default:
              throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_2__.JOSENotSupported('Invalid or unsupported crv option provided, supported values are P-256, P-384, P-521, X25519, and X448');
          }
          break;
        }
      default:
        throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_2__.JOSENotSupported('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
    }
    return _webcrypto_js__WEBPACK_IMPORTED_MODULE_1__["default"].subtle.generateKey(algorithm, (_c = options === null || options === void 0 ? void 0 : options.extractable) !== null && _c !== void 0 ? _c : false, keyUsages);
  });
  return _generateKeyPair.apply(this, arguments);
}

/***/ }),

/***/ 5833:
/*!***********************************************************************!*\
  !*** ./node_modules/jose/dist/browser/runtime/get_sign_verify_key.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getCryptoKey)
/* harmony export */ });
/* harmony import */ var _webcrypto_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./webcrypto.js */ 1460);
/* harmony import */ var _lib_crypto_key_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/crypto_key.js */ 3513);
/* harmony import */ var _lib_invalid_key_input_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/invalid_key_input.js */ 44);
/* harmony import */ var _is_key_like_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./is_key_like.js */ 5352);




function getCryptoKey(alg, key, usage) {
  if ((0,_webcrypto_js__WEBPACK_IMPORTED_MODULE_0__.isCryptoKey)(key)) {
    (0,_lib_crypto_key_js__WEBPACK_IMPORTED_MODULE_1__.checkSigCryptoKey)(key, alg, usage);
    return key;
  }
  if (key instanceof Uint8Array) {
    if (!alg.startsWith('HS')) {
      throw new TypeError((0,_lib_invalid_key_input_js__WEBPACK_IMPORTED_MODULE_2__["default"])(key, ..._is_key_like_js__WEBPACK_IMPORTED_MODULE_3__.types));
    }
    return _webcrypto_js__WEBPACK_IMPORTED_MODULE_0__["default"].subtle.importKey('raw', key, {
      hash: `SHA-${alg.slice(-3)}`,
      name: 'HMAC'
    }, false, [usage]);
  }
  throw new TypeError((0,_lib_invalid_key_input_js__WEBPACK_IMPORTED_MODULE_2__["default"])(key, ..._is_key_like_js__WEBPACK_IMPORTED_MODULE_3__.types, 'Uint8Array'));
}

/***/ }),

/***/ 5352:
/*!***************************************************************!*\
  !*** ./node_modules/jose/dist/browser/runtime/is_key_like.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   types: () => (/* binding */ types)
/* harmony export */ });
/* harmony import */ var _webcrypto_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./webcrypto.js */ 1460);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (key => {
  return (0,_webcrypto_js__WEBPACK_IMPORTED_MODULE_0__.isCryptoKey)(key);
});
const types = ['CryptoKey'];

/***/ }),

/***/ 4475:
/*!**************************************************************!*\
  !*** ./node_modules/jose/dist/browser/runtime/jwk_to_key.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 1670);
/* harmony import */ var _webcrypto_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./webcrypto.js */ 1460);
/* harmony import */ var _util_errors_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/errors.js */ 581);
/* harmony import */ var _base64url_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./base64url.js */ 9485);




function subtleMapping(jwk) {
  let algorithm;
  let keyUsages;
  switch (jwk.kty) {
    case 'oct':
      {
        switch (jwk.alg) {
          case 'HS256':
          case 'HS384':
          case 'HS512':
            algorithm = {
              name: 'HMAC',
              hash: `SHA-${jwk.alg.slice(-3)}`
            };
            keyUsages = ['sign', 'verify'];
            break;
          case 'A128CBC-HS256':
          case 'A192CBC-HS384':
          case 'A256CBC-HS512':
            throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_2__.JOSENotSupported(`${jwk.alg} keys cannot be imported as CryptoKey instances`);
          case 'A128GCM':
          case 'A192GCM':
          case 'A256GCM':
          case 'A128GCMKW':
          case 'A192GCMKW':
          case 'A256GCMKW':
            algorithm = {
              name: 'AES-GCM'
            };
            keyUsages = ['encrypt', 'decrypt'];
            break;
          case 'A128KW':
          case 'A192KW':
          case 'A256KW':
            algorithm = {
              name: 'AES-KW'
            };
            keyUsages = ['wrapKey', 'unwrapKey'];
            break;
          case 'PBES2-HS256+A128KW':
          case 'PBES2-HS384+A192KW':
          case 'PBES2-HS512+A256KW':
            algorithm = {
              name: 'PBKDF2'
            };
            keyUsages = ['deriveBits'];
            break;
          default:
            throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_2__.JOSENotSupported('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
        }
        break;
      }
    case 'RSA':
      {
        switch (jwk.alg) {
          case 'PS256':
          case 'PS384':
          case 'PS512':
            algorithm = {
              name: 'RSA-PSS',
              hash: `SHA-${jwk.alg.slice(-3)}`
            };
            keyUsages = jwk.d ? ['sign'] : ['verify'];
            break;
          case 'RS256':
          case 'RS384':
          case 'RS512':
            algorithm = {
              name: 'RSASSA-PKCS1-v1_5',
              hash: `SHA-${jwk.alg.slice(-3)}`
            };
            keyUsages = jwk.d ? ['sign'] : ['verify'];
            break;
          case 'RSA-OAEP':
          case 'RSA-OAEP-256':
          case 'RSA-OAEP-384':
          case 'RSA-OAEP-512':
            algorithm = {
              name: 'RSA-OAEP',
              hash: `SHA-${parseInt(jwk.alg.slice(-3), 10) || 1}`
            };
            keyUsages = jwk.d ? ['decrypt', 'unwrapKey'] : ['encrypt', 'wrapKey'];
            break;
          default:
            throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_2__.JOSENotSupported('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
        }
        break;
      }
    case 'EC':
      {
        switch (jwk.alg) {
          case 'ES256':
            algorithm = {
              name: 'ECDSA',
              namedCurve: 'P-256'
            };
            keyUsages = jwk.d ? ['sign'] : ['verify'];
            break;
          case 'ES384':
            algorithm = {
              name: 'ECDSA',
              namedCurve: 'P-384'
            };
            keyUsages = jwk.d ? ['sign'] : ['verify'];
            break;
          case 'ES512':
            algorithm = {
              name: 'ECDSA',
              namedCurve: 'P-521'
            };
            keyUsages = jwk.d ? ['sign'] : ['verify'];
            break;
          case 'ECDH-ES':
          case 'ECDH-ES+A128KW':
          case 'ECDH-ES+A192KW':
          case 'ECDH-ES+A256KW':
            algorithm = {
              name: 'ECDH',
              namedCurve: jwk.crv
            };
            keyUsages = jwk.d ? ['deriveBits'] : [];
            break;
          default:
            throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_2__.JOSENotSupported('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
        }
        break;
      }
    case 'OKP':
      {
        switch (jwk.alg) {
          case 'EdDSA':
            algorithm = {
              name: jwk.crv
            };
            keyUsages = jwk.d ? ['sign'] : ['verify'];
            break;
          case 'ECDH-ES':
          case 'ECDH-ES+A128KW':
          case 'ECDH-ES+A192KW':
          case 'ECDH-ES+A256KW':
            algorithm = {
              name: jwk.crv
            };
            keyUsages = jwk.d ? ['deriveBits'] : [];
            break;
          default:
            throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_2__.JOSENotSupported('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
        }
        break;
      }
    default:
      throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_2__.JOSENotSupported('Invalid or unsupported JWK "kty" (Key Type) Parameter value');
  }
  return {
    algorithm,
    keyUsages
  };
}
const parse = /*#__PURE__*/function () {
  var _ref = (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (jwk) {
    var _a, _b;
    if (!jwk.alg) {
      throw new TypeError('"alg" argument is required when "jwk.alg" is not present');
    }
    const {
      algorithm,
      keyUsages
    } = subtleMapping(jwk);
    const rest = [algorithm, (_a = jwk.ext) !== null && _a !== void 0 ? _a : false, (_b = jwk.key_ops) !== null && _b !== void 0 ? _b : keyUsages];
    if (algorithm.name === 'PBKDF2') {
      return _webcrypto_js__WEBPACK_IMPORTED_MODULE_1__["default"].subtle.importKey('raw', (0,_base64url_js__WEBPACK_IMPORTED_MODULE_3__.decode)(jwk.k), ...rest);
    }
    const keyData = {
      ...jwk
    };
    delete keyData.alg;
    delete keyData.use;
    return _webcrypto_js__WEBPACK_IMPORTED_MODULE_1__["default"].subtle.importKey('jwk', keyData, ...rest);
  });
  return function parse(_x) {
    return _ref.apply(this, arguments);
  };
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (parse);

/***/ }),

/***/ 3063:
/*!**************************************************************!*\
  !*** ./node_modules/jose/dist/browser/runtime/key_to_jwk.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 1670);
/* harmony import */ var _webcrypto_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./webcrypto.js */ 1460);
/* harmony import */ var _lib_invalid_key_input_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/invalid_key_input.js */ 44);
/* harmony import */ var _base64url_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./base64url.js */ 9485);
/* harmony import */ var _is_key_like_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./is_key_like.js */ 5352);





const keyToJWK = /*#__PURE__*/function () {
  var _ref = (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (key) {
    if (key instanceof Uint8Array) {
      return {
        kty: 'oct',
        k: (0,_base64url_js__WEBPACK_IMPORTED_MODULE_3__.encode)(key)
      };
    }
    if (!(0,_webcrypto_js__WEBPACK_IMPORTED_MODULE_1__.isCryptoKey)(key)) {
      throw new TypeError((0,_lib_invalid_key_input_js__WEBPACK_IMPORTED_MODULE_2__["default"])(key, ..._is_key_like_js__WEBPACK_IMPORTED_MODULE_4__.types, 'Uint8Array'));
    }
    if (!key.extractable) {
      throw new TypeError('non-extractable CryptoKey cannot be exported as a JWK');
    }
    const {
      ext,
      key_ops,
      alg,
      use,
      ...jwk
    } = yield _webcrypto_js__WEBPACK_IMPORTED_MODULE_1__["default"].subtle.exportKey('jwk', key);
    return jwk;
  });
  return function keyToJWK(_x) {
    return _ref.apply(this, arguments);
  };
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (keyToJWK);

/***/ }),

/***/ 8368:
/*!***********************************************************!*\
  !*** ./node_modules/jose/dist/browser/runtime/pbes2kw.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   decrypt: () => (/* binding */ decrypt),
/* harmony export */   encrypt: () => (/* binding */ encrypt)
/* harmony export */ });
/* harmony import */ var _Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 1670);
/* harmony import */ var _random_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./random.js */ 5366);
/* harmony import */ var _lib_buffer_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/buffer_utils.js */ 1088);
/* harmony import */ var _base64url_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./base64url.js */ 9485);
/* harmony import */ var _aeskw_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./aeskw.js */ 2339);
/* harmony import */ var _lib_check_p2s_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../lib/check_p2s.js */ 9639);
/* harmony import */ var _webcrypto_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./webcrypto.js */ 1460);
/* harmony import */ var _lib_crypto_key_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../lib/crypto_key.js */ 3513);
/* harmony import */ var _lib_invalid_key_input_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../lib/invalid_key_input.js */ 44);
/* harmony import */ var _is_key_like_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./is_key_like.js */ 5352);










function getCryptoKey(key, alg) {
  if (key instanceof Uint8Array) {
    return _webcrypto_js__WEBPACK_IMPORTED_MODULE_6__["default"].subtle.importKey('raw', key, 'PBKDF2', false, ['deriveBits']);
  }
  if ((0,_webcrypto_js__WEBPACK_IMPORTED_MODULE_6__.isCryptoKey)(key)) {
    (0,_lib_crypto_key_js__WEBPACK_IMPORTED_MODULE_7__.checkEncCryptoKey)(key, alg, 'deriveBits', 'deriveKey');
    return key;
  }
  throw new TypeError((0,_lib_invalid_key_input_js__WEBPACK_IMPORTED_MODULE_8__["default"])(key, ..._is_key_like_js__WEBPACK_IMPORTED_MODULE_9__.types, 'Uint8Array'));
}
function deriveKey(_x, _x2, _x3, _x4) {
  return _deriveKey.apply(this, arguments);
}
function _deriveKey() {
  _deriveKey = (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (p2s, alg, p2c, key) {
    (0,_lib_check_p2s_js__WEBPACK_IMPORTED_MODULE_5__["default"])(p2s);
    const salt = (0,_lib_buffer_utils_js__WEBPACK_IMPORTED_MODULE_2__.p2s)(alg, p2s);
    const keylen = parseInt(alg.slice(13, 16), 10);
    const subtleAlg = {
      hash: `SHA-${alg.slice(8, 11)}`,
      iterations: p2c,
      name: 'PBKDF2',
      salt
    };
    const wrapAlg = {
      length: keylen,
      name: 'AES-KW'
    };
    const cryptoKey = yield getCryptoKey(key, alg);
    if (cryptoKey.usages.includes('deriveBits')) {
      return new Uint8Array(yield _webcrypto_js__WEBPACK_IMPORTED_MODULE_6__["default"].subtle.deriveBits(subtleAlg, cryptoKey, keylen));
    }
    if (cryptoKey.usages.includes('deriveKey')) {
      return _webcrypto_js__WEBPACK_IMPORTED_MODULE_6__["default"].subtle.deriveKey(subtleAlg, cryptoKey, wrapAlg, false, ['wrapKey', 'unwrapKey']);
    }
    throw new TypeError('PBKDF2 key "usages" must include "deriveBits" or "deriveKey"');
  });
  return _deriveKey.apply(this, arguments);
}
const encrypt = /*#__PURE__*/function () {
  var _ref = (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (alg, key, cek, p2c = 2048, p2s = (0,_random_js__WEBPACK_IMPORTED_MODULE_1__["default"])(new Uint8Array(16))) {
    const derived = yield deriveKey(p2s, alg, p2c, key);
    const encryptedKey = yield (0,_aeskw_js__WEBPACK_IMPORTED_MODULE_4__.wrap)(alg.slice(-6), derived, cek);
    return {
      encryptedKey,
      p2c,
      p2s: (0,_base64url_js__WEBPACK_IMPORTED_MODULE_3__.encode)(p2s)
    };
  });
  return function encrypt(_x5, _x6, _x7) {
    return _ref.apply(this, arguments);
  };
}();
const decrypt = /*#__PURE__*/function () {
  var _ref2 = (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (alg, key, encryptedKey, p2c, p2s) {
    const derived = yield deriveKey(p2s, alg, p2c, key);
    return (0,_aeskw_js__WEBPACK_IMPORTED_MODULE_4__.unwrap)(alg.slice(-6), derived, encryptedKey);
  });
  return function decrypt(_x8, _x9, _x10, _x11, _x12) {
    return _ref2.apply(this, arguments);
  };
}();

/***/ }),

/***/ 5366:
/*!**********************************************************!*\
  !*** ./node_modules/jose/dist/browser/runtime/random.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _webcrypto_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./webcrypto.js */ 1460);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_webcrypto_js__WEBPACK_IMPORTED_MODULE_0__["default"].getRandomValues.bind(_webcrypto_js__WEBPACK_IMPORTED_MODULE_0__["default"]));

/***/ }),

/***/ 5103:
/*!*********************************************************!*\
  !*** ./node_modules/jose/dist/browser/runtime/rsaes.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   decrypt: () => (/* binding */ decrypt),
/* harmony export */   encrypt: () => (/* binding */ encrypt)
/* harmony export */ });
/* harmony import */ var _Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 1670);
/* harmony import */ var _subtle_rsaes_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./subtle_rsaes.js */ 2550);
/* harmony import */ var _bogus_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./bogus.js */ 6545);
/* harmony import */ var _webcrypto_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./webcrypto.js */ 1460);
/* harmony import */ var _lib_crypto_key_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../lib/crypto_key.js */ 3513);
/* harmony import */ var _check_key_length_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./check_key_length.js */ 9397);
/* harmony import */ var _lib_invalid_key_input_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../lib/invalid_key_input.js */ 44);
/* harmony import */ var _is_key_like_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./is_key_like.js */ 5352);








const encrypt = /*#__PURE__*/function () {
  var _ref = (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (alg, key, cek) {
    if (!(0,_webcrypto_js__WEBPACK_IMPORTED_MODULE_3__.isCryptoKey)(key)) {
      throw new TypeError((0,_lib_invalid_key_input_js__WEBPACK_IMPORTED_MODULE_6__["default"])(key, ..._is_key_like_js__WEBPACK_IMPORTED_MODULE_7__.types));
    }
    (0,_lib_crypto_key_js__WEBPACK_IMPORTED_MODULE_4__.checkEncCryptoKey)(key, alg, 'encrypt', 'wrapKey');
    (0,_check_key_length_js__WEBPACK_IMPORTED_MODULE_5__["default"])(alg, key);
    if (key.usages.includes('encrypt')) {
      return new Uint8Array(yield _webcrypto_js__WEBPACK_IMPORTED_MODULE_3__["default"].subtle.encrypt((0,_subtle_rsaes_js__WEBPACK_IMPORTED_MODULE_1__["default"])(alg), key, cek));
    }
    if (key.usages.includes('wrapKey')) {
      const cryptoKeyCek = yield _webcrypto_js__WEBPACK_IMPORTED_MODULE_3__["default"].subtle.importKey('raw', cek, ..._bogus_js__WEBPACK_IMPORTED_MODULE_2__["default"]);
      return new Uint8Array(yield _webcrypto_js__WEBPACK_IMPORTED_MODULE_3__["default"].subtle.wrapKey('raw', cryptoKeyCek, key, (0,_subtle_rsaes_js__WEBPACK_IMPORTED_MODULE_1__["default"])(alg)));
    }
    throw new TypeError('RSA-OAEP key "usages" must include "encrypt" or "wrapKey" for this operation');
  });
  return function encrypt(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
const decrypt = /*#__PURE__*/function () {
  var _ref2 = (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (alg, key, encryptedKey) {
    if (!(0,_webcrypto_js__WEBPACK_IMPORTED_MODULE_3__.isCryptoKey)(key)) {
      throw new TypeError((0,_lib_invalid_key_input_js__WEBPACK_IMPORTED_MODULE_6__["default"])(key, ..._is_key_like_js__WEBPACK_IMPORTED_MODULE_7__.types));
    }
    (0,_lib_crypto_key_js__WEBPACK_IMPORTED_MODULE_4__.checkEncCryptoKey)(key, alg, 'decrypt', 'unwrapKey');
    (0,_check_key_length_js__WEBPACK_IMPORTED_MODULE_5__["default"])(alg, key);
    if (key.usages.includes('decrypt')) {
      return new Uint8Array(yield _webcrypto_js__WEBPACK_IMPORTED_MODULE_3__["default"].subtle.decrypt((0,_subtle_rsaes_js__WEBPACK_IMPORTED_MODULE_1__["default"])(alg), key, encryptedKey));
    }
    if (key.usages.includes('unwrapKey')) {
      const cryptoKeyCek = yield _webcrypto_js__WEBPACK_IMPORTED_MODULE_3__["default"].subtle.unwrapKey('raw', encryptedKey, key, (0,_subtle_rsaes_js__WEBPACK_IMPORTED_MODULE_1__["default"])(alg), ..._bogus_js__WEBPACK_IMPORTED_MODULE_2__["default"]);
      return new Uint8Array(yield _webcrypto_js__WEBPACK_IMPORTED_MODULE_3__["default"].subtle.exportKey('raw', cryptoKeyCek));
    }
    throw new TypeError('RSA-OAEP key "usages" must include "decrypt" or "unwrapKey" for this operation');
  });
  return function decrypt(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

/***/ }),

/***/ 3393:
/*!********************************************************!*\
  !*** ./node_modules/jose/dist/browser/runtime/sign.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 1670);
/* harmony import */ var _subtle_dsa_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./subtle_dsa.js */ 3686);
/* harmony import */ var _webcrypto_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./webcrypto.js */ 1460);
/* harmony import */ var _check_key_length_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./check_key_length.js */ 9397);
/* harmony import */ var _get_sign_verify_key_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./get_sign_verify_key.js */ 5833);





const sign = /*#__PURE__*/function () {
  var _ref = (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (alg, key, data) {
    const cryptoKey = yield (0,_get_sign_verify_key_js__WEBPACK_IMPORTED_MODULE_4__["default"])(alg, key, 'sign');
    (0,_check_key_length_js__WEBPACK_IMPORTED_MODULE_3__["default"])(alg, cryptoKey);
    const signature = yield _webcrypto_js__WEBPACK_IMPORTED_MODULE_2__["default"].subtle.sign((0,_subtle_dsa_js__WEBPACK_IMPORTED_MODULE_1__["default"])(alg, cryptoKey.algorithm), cryptoKey, data);
    return new Uint8Array(signature);
  });
  return function sign(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (sign);

/***/ }),

/***/ 3686:
/*!**************************************************************!*\
  !*** ./node_modules/jose/dist/browser/runtime/subtle_dsa.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ subtleDsa)
/* harmony export */ });
/* harmony import */ var _util_errors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/errors.js */ 581);

function subtleDsa(alg, algorithm) {
  const hash = `SHA-${alg.slice(-3)}`;
  switch (alg) {
    case 'HS256':
    case 'HS384':
    case 'HS512':
      return {
        hash,
        name: 'HMAC'
      };
    case 'PS256':
    case 'PS384':
    case 'PS512':
      return {
        hash,
        name: 'RSA-PSS',
        saltLength: alg.slice(-3) >> 3
      };
    case 'RS256':
    case 'RS384':
    case 'RS512':
      return {
        hash,
        name: 'RSASSA-PKCS1-v1_5'
      };
    case 'ES256':
    case 'ES384':
    case 'ES512':
      return {
        hash,
        name: 'ECDSA',
        namedCurve: algorithm.namedCurve
      };
    case 'EdDSA':
      return {
        name: algorithm.name
      };
    default:
      throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_0__.JOSENotSupported(`alg ${alg} is not supported either by JOSE or your javascript runtime`);
  }
}

/***/ }),

/***/ 2550:
/*!****************************************************************!*\
  !*** ./node_modules/jose/dist/browser/runtime/subtle_rsaes.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ subtleRsaEs)
/* harmony export */ });
/* harmony import */ var _util_errors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/errors.js */ 581);

function subtleRsaEs(alg) {
  switch (alg) {
    case 'RSA-OAEP':
    case 'RSA-OAEP-256':
    case 'RSA-OAEP-384':
    case 'RSA-OAEP-512':
      return 'RSA-OAEP';
    default:
      throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_0__.JOSENotSupported(`alg ${alg} is not supported either by JOSE or your javascript runtime`);
  }
}

/***/ }),

/***/ 2125:
/*!*********************************************************************!*\
  !*** ./node_modules/jose/dist/browser/runtime/timing_safe_equal.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const timingSafeEqual = (a, b) => {
  if (!(a instanceof Uint8Array)) {
    throw new TypeError('First argument must be a buffer');
  }
  if (!(b instanceof Uint8Array)) {
    throw new TypeError('Second argument must be a buffer');
  }
  if (a.length !== b.length) {
    throw new TypeError('Input buffers must have the same length');
  }
  const len = a.length;
  let out = 0;
  let i = -1;
  while (++i < len) {
    out |= a[i] ^ b[i];
  }
  return out === 0;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timingSafeEqual);

/***/ }),

/***/ 5958:
/*!**********************************************************!*\
  !*** ./node_modules/jose/dist/browser/runtime/verify.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 1670);
/* harmony import */ var _subtle_dsa_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./subtle_dsa.js */ 3686);
/* harmony import */ var _webcrypto_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./webcrypto.js */ 1460);
/* harmony import */ var _check_key_length_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./check_key_length.js */ 9397);
/* harmony import */ var _get_sign_verify_key_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./get_sign_verify_key.js */ 5833);





const verify = /*#__PURE__*/function () {
  var _ref = (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (alg, key, signature, data) {
    const cryptoKey = yield (0,_get_sign_verify_key_js__WEBPACK_IMPORTED_MODULE_4__["default"])(alg, key, 'verify');
    (0,_check_key_length_js__WEBPACK_IMPORTED_MODULE_3__["default"])(alg, cryptoKey);
    const algorithm = (0,_subtle_dsa_js__WEBPACK_IMPORTED_MODULE_1__["default"])(alg, cryptoKey.algorithm);
    try {
      return yield _webcrypto_js__WEBPACK_IMPORTED_MODULE_2__["default"].subtle.verify(algorithm, cryptoKey, signature, data);
    } catch (_a) {
      return false;
    }
  });
  return function verify(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (verify);

/***/ }),

/***/ 1460:
/*!*************************************************************!*\
  !*** ./node_modules/jose/dist/browser/runtime/webcrypto.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   isCryptoKey: () => (/* binding */ isCryptoKey)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (crypto);
const isCryptoKey = key => key instanceof CryptoKey;

/***/ }),

/***/ 2516:
/*!********************************************************!*\
  !*** ./node_modules/jose/dist/browser/runtime/zlib.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   deflate: () => (/* binding */ deflate),
/* harmony export */   inflate: () => (/* binding */ inflate)
/* harmony export */ });
/* harmony import */ var _Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 1670);
/* harmony import */ var _util_errors_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/errors.js */ 581);


const inflate = /*#__PURE__*/function () {
  var _ref = (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
    throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_1__.JOSENotSupported('JWE "zip" (Compression Algorithm) Header Parameter is not supported by your javascript runtime. You need to use the `inflateRaw` decrypt option to provide Inflate Raw implementation.');
  });
  return function inflate() {
    return _ref.apply(this, arguments);
  };
}();
const deflate = /*#__PURE__*/function () {
  var _ref2 = (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
    throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_1__.JOSENotSupported('JWE "zip" (Compression Algorithm) Header Parameter is not supported by your javascript runtime. You need to use the `deflateRaw` encrypt option to provide Deflate Raw implementation.');
  });
  return function deflate() {
    return _ref2.apply(this, arguments);
  };
}();

/***/ }),

/***/ 374:
/*!**********************************************************!*\
  !*** ./node_modules/jose/dist/browser/util/base64url.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   decode: () => (/* binding */ decode),
/* harmony export */   encode: () => (/* binding */ encode)
/* harmony export */ });
/* harmony import */ var _runtime_base64url_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../runtime/base64url.js */ 9485);

const encode = _runtime_base64url_js__WEBPACK_IMPORTED_MODULE_0__.encode;
const decode = _runtime_base64url_js__WEBPACK_IMPORTED_MODULE_0__.decode;

/***/ }),

/***/ 5093:
/*!***********************************************************!*\
  !*** ./node_modules/jose/dist/browser/util/decode_jwt.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   decodeJwt: () => (/* binding */ decodeJwt)
/* harmony export */ });
/* harmony import */ var _base64url_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base64url.js */ 374);
/* harmony import */ var _lib_buffer_utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/buffer_utils.js */ 1088);
/* harmony import */ var _lib_is_object_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/is_object.js */ 7157);
/* harmony import */ var _errors_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./errors.js */ 581);




function decodeJwt(jwt) {
  if (typeof jwt !== 'string') throw new _errors_js__WEBPACK_IMPORTED_MODULE_3__.JWTInvalid('JWTs must use Compact JWS serialization, JWT must be a string');
  const {
    1: payload,
    length
  } = jwt.split('.');
  if (length === 5) throw new _errors_js__WEBPACK_IMPORTED_MODULE_3__.JWTInvalid('Only JWTs using Compact JWS serialization can be decoded');
  if (length !== 3) throw new _errors_js__WEBPACK_IMPORTED_MODULE_3__.JWTInvalid('Invalid JWT');
  if (!payload) throw new _errors_js__WEBPACK_IMPORTED_MODULE_3__.JWTInvalid('JWTs must contain a payload');
  let decoded;
  try {
    decoded = (0,_base64url_js__WEBPACK_IMPORTED_MODULE_0__.decode)(payload);
  } catch (_a) {
    throw new _errors_js__WEBPACK_IMPORTED_MODULE_3__.JWTInvalid('Failed to parse the base64url encoded payload');
  }
  let result;
  try {
    result = JSON.parse(_lib_buffer_utils_js__WEBPACK_IMPORTED_MODULE_1__.decoder.decode(decoded));
  } catch (_b) {
    throw new _errors_js__WEBPACK_IMPORTED_MODULE_3__.JWTInvalid('Failed to parse the decoded payload as JSON');
  }
  if (!(0,_lib_is_object_js__WEBPACK_IMPORTED_MODULE_2__["default"])(result)) throw new _errors_js__WEBPACK_IMPORTED_MODULE_3__.JWTInvalid('Invalid JWT Claims Set');
  return result;
}

/***/ }),

/***/ 2936:
/*!************************************************************************!*\
  !*** ./node_modules/jose/dist/browser/util/decode_protected_header.js ***!
  \************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   decodeProtectedHeader: () => (/* binding */ decodeProtectedHeader)
/* harmony export */ });
/* harmony import */ var _base64url_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base64url.js */ 374);
/* harmony import */ var _lib_buffer_utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/buffer_utils.js */ 1088);
/* harmony import */ var _lib_is_object_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/is_object.js */ 7157);



function decodeProtectedHeader(token) {
  let protectedB64u;
  if (typeof token === 'string') {
    const parts = token.split('.');
    if (parts.length === 3 || parts.length === 5) {
      ;
      [protectedB64u] = parts;
    }
  } else if (typeof token === 'object' && token) {
    if ('protected' in token) {
      protectedB64u = token.protected;
    } else {
      throw new TypeError('Token does not contain a Protected Header');
    }
  }
  try {
    if (typeof protectedB64u !== 'string' || !protectedB64u) {
      throw new Error();
    }
    const result = JSON.parse(_lib_buffer_utils_js__WEBPACK_IMPORTED_MODULE_1__.decoder.decode((0,_base64url_js__WEBPACK_IMPORTED_MODULE_0__.decode)(protectedB64u)));
    if (!(0,_lib_is_object_js__WEBPACK_IMPORTED_MODULE_2__["default"])(result)) {
      throw new Error();
    }
    return result;
  } catch (_a) {
    throw new TypeError('Invalid Token or Protected Header formatting');
  }
}

/***/ }),

/***/ 581:
/*!*******************************************************!*\
  !*** ./node_modules/jose/dist/browser/util/errors.js ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   JOSEAlgNotAllowed: () => (/* binding */ JOSEAlgNotAllowed),
/* harmony export */   JOSEError: () => (/* binding */ JOSEError),
/* harmony export */   JOSENotSupported: () => (/* binding */ JOSENotSupported),
/* harmony export */   JWEDecryptionFailed: () => (/* binding */ JWEDecryptionFailed),
/* harmony export */   JWEInvalid: () => (/* binding */ JWEInvalid),
/* harmony export */   JWKInvalid: () => (/* binding */ JWKInvalid),
/* harmony export */   JWKSInvalid: () => (/* binding */ JWKSInvalid),
/* harmony export */   JWKSMultipleMatchingKeys: () => (/* binding */ JWKSMultipleMatchingKeys),
/* harmony export */   JWKSNoMatchingKey: () => (/* binding */ JWKSNoMatchingKey),
/* harmony export */   JWKSTimeout: () => (/* binding */ JWKSTimeout),
/* harmony export */   JWSInvalid: () => (/* binding */ JWSInvalid),
/* harmony export */   JWSSignatureVerificationFailed: () => (/* binding */ JWSSignatureVerificationFailed),
/* harmony export */   JWTClaimValidationFailed: () => (/* binding */ JWTClaimValidationFailed),
/* harmony export */   JWTExpired: () => (/* binding */ JWTExpired),
/* harmony export */   JWTInvalid: () => (/* binding */ JWTInvalid)
/* harmony export */ });
class JOSEError extends Error {
  static get code() {
    return 'ERR_JOSE_GENERIC';
  }
  constructor(message) {
    var _a;
    super(message);
    this.code = 'ERR_JOSE_GENERIC';
    this.name = this.constructor.name;
    (_a = Error.captureStackTrace) === null || _a === void 0 ? void 0 : _a.call(Error, this, this.constructor);
  }
}
class JWTClaimValidationFailed extends JOSEError {
  static get code() {
    return 'ERR_JWT_CLAIM_VALIDATION_FAILED';
  }
  constructor(message, claim = 'unspecified', reason = 'unspecified') {
    super(message);
    this.code = 'ERR_JWT_CLAIM_VALIDATION_FAILED';
    this.claim = claim;
    this.reason = reason;
  }
}
class JWTExpired extends JOSEError {
  static get code() {
    return 'ERR_JWT_EXPIRED';
  }
  constructor(message, claim = 'unspecified', reason = 'unspecified') {
    super(message);
    this.code = 'ERR_JWT_EXPIRED';
    this.claim = claim;
    this.reason = reason;
  }
}
class JOSEAlgNotAllowed extends JOSEError {
  constructor() {
    super(...arguments);
    this.code = 'ERR_JOSE_ALG_NOT_ALLOWED';
  }
  static get code() {
    return 'ERR_JOSE_ALG_NOT_ALLOWED';
  }
}
class JOSENotSupported extends JOSEError {
  constructor() {
    super(...arguments);
    this.code = 'ERR_JOSE_NOT_SUPPORTED';
  }
  static get code() {
    return 'ERR_JOSE_NOT_SUPPORTED';
  }
}
class JWEDecryptionFailed extends JOSEError {
  constructor() {
    super(...arguments);
    this.code = 'ERR_JWE_DECRYPTION_FAILED';
    this.message = 'decryption operation failed';
  }
  static get code() {
    return 'ERR_JWE_DECRYPTION_FAILED';
  }
}
class JWEInvalid extends JOSEError {
  constructor() {
    super(...arguments);
    this.code = 'ERR_JWE_INVALID';
  }
  static get code() {
    return 'ERR_JWE_INVALID';
  }
}
class JWSInvalid extends JOSEError {
  constructor() {
    super(...arguments);
    this.code = 'ERR_JWS_INVALID';
  }
  static get code() {
    return 'ERR_JWS_INVALID';
  }
}
class JWTInvalid extends JOSEError {
  constructor() {
    super(...arguments);
    this.code = 'ERR_JWT_INVALID';
  }
  static get code() {
    return 'ERR_JWT_INVALID';
  }
}
class JWKInvalid extends JOSEError {
  constructor() {
    super(...arguments);
    this.code = 'ERR_JWK_INVALID';
  }
  static get code() {
    return 'ERR_JWK_INVALID';
  }
}
class JWKSInvalid extends JOSEError {
  constructor() {
    super(...arguments);
    this.code = 'ERR_JWKS_INVALID';
  }
  static get code() {
    return 'ERR_JWKS_INVALID';
  }
}
class JWKSNoMatchingKey extends JOSEError {
  constructor() {
    super(...arguments);
    this.code = 'ERR_JWKS_NO_MATCHING_KEY';
    this.message = 'no applicable key found in the JSON Web Key Set';
  }
  static get code() {
    return 'ERR_JWKS_NO_MATCHING_KEY';
  }
}
class JWKSMultipleMatchingKeys extends JOSEError {
  constructor() {
    super(...arguments);
    this.code = 'ERR_JWKS_MULTIPLE_MATCHING_KEYS';
    this.message = 'multiple matching keys found in the JSON Web Key Set';
  }
  static get code() {
    return 'ERR_JWKS_MULTIPLE_MATCHING_KEYS';
  }
}
Symbol.asyncIterator;
class JWKSTimeout extends JOSEError {
  constructor() {
    super(...arguments);
    this.code = 'ERR_JWKS_TIMEOUT';
    this.message = 'request timed out';
  }
  static get code() {
    return 'ERR_JWKS_TIMEOUT';
  }
}
class JWSSignatureVerificationFailed extends JOSEError {
  constructor() {
    super(...arguments);
    this.code = 'ERR_JWS_SIGNATURE_VERIFICATION_FAILED';
    this.message = 'signature verification failed';
  }
  static get code() {
    return 'ERR_JWS_SIGNATURE_VERIFICATION_FAILED';
  }
}

/***/ }),

/***/ 8451:
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/AsyncGenerator.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AsyncGenerator)
/* harmony export */ });
/* harmony import */ var _OverloadYield_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./OverloadYield.js */ 6754);

function AsyncGenerator(gen) {
  var front, back;
  function resume(key, arg) {
    try {
      var result = gen[key](arg),
        value = result.value,
        overloaded = value instanceof _OverloadYield_js__WEBPACK_IMPORTED_MODULE_0__["default"];
      Promise.resolve(overloaded ? value.v : value).then(function (arg) {
        if (overloaded) {
          var nextKey = "return" === key ? "return" : "next";
          if (!value.k || arg.done) return resume(nextKey, arg);
          arg = gen[nextKey](arg).value;
        }
        settle(result.done ? "return" : "normal", arg);
      }, function (err) {
        resume("throw", err);
      });
    } catch (err) {
      settle("throw", err);
    }
  }
  function settle(type, value) {
    switch (type) {
      case "return":
        front.resolve({
          value: value,
          done: !0
        });
        break;
      case "throw":
        front.reject(value);
        break;
      default:
        front.resolve({
          value: value,
          done: !1
        });
    }
    (front = front.next) ? resume(front.key, front.arg) : back = null;
  }
  this._invoke = function (key, arg) {
    return new Promise(function (resolve, reject) {
      var request = {
        key: key,
        arg: arg,
        resolve: resolve,
        reject: reject,
        next: null
      };
      back ? back = back.next = request : (front = back = request, resume(key, arg));
    });
  }, "function" != typeof gen["return"] && (this["return"] = void 0);
}
AsyncGenerator.prototype["function" == typeof Symbol && Symbol.asyncIterator || "@@asyncIterator"] = function () {
  return this;
}, AsyncGenerator.prototype.next = function (arg) {
  return this._invoke("next", arg);
}, AsyncGenerator.prototype["throw"] = function (arg) {
  return this._invoke("throw", arg);
}, AsyncGenerator.prototype["return"] = function (arg) {
  return this._invoke("return", arg);
};

/***/ }),

/***/ 6754:
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/OverloadYield.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _OverloadYield)
/* harmony export */ });
function _OverloadYield(value, kind) {
  this.v = value, this.k = kind;
}

/***/ }),

/***/ 7535:
/*!************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/awaitAsyncGenerator.js ***!
  \************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _awaitAsyncGenerator)
/* harmony export */ });
/* harmony import */ var _OverloadYield_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./OverloadYield.js */ 6754);

function _awaitAsyncGenerator(value) {
  return new _OverloadYield_js__WEBPACK_IMPORTED_MODULE_0__["default"](value, 0);
}

/***/ }),

/***/ 6865:
/*!***********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/wrapAsyncGenerator.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _wrapAsyncGenerator)
/* harmony export */ });
/* harmony import */ var _AsyncGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AsyncGenerator.js */ 8451);

function _wrapAsyncGenerator(fn) {
  return function () {
    return new _AsyncGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"](fn.apply(this, arguments));
  };
}

/***/ })

}]);
//# sourceMappingURL=src_app_modules_jwt_jwt_module_ts.6394dc14f69e4254.js.map