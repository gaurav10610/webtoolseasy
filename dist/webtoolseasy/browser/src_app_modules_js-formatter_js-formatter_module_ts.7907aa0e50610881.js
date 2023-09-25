"use strict";
(self["webpackChunkwebtoolseasy"] = self["webpackChunkwebtoolseasy"] || []).push([["src_app_modules_js-formatter_js-formatter_module_ts"],{

/***/ 9411:
/*!*********************************************************************!*\
  !*** ./src/app/modules/js-formatter/js-formatter-routing.module.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   JsFormatterRoutingModule: () => (/* binding */ JsFormatterRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 7947);
/* harmony import */ var _js_formatter_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js-formatter.component */ 9916);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 1699);
var _class;




const routes = [{
  path: '',
  component: _js_formatter_component__WEBPACK_IMPORTED_MODULE_0__.JsFormatterComponent
}];
class JsFormatterRoutingModule {}
_class = JsFormatterRoutingModule;
_class.ɵfac = function JsFormatterRoutingModule_Factory(t) {
  return new (t || _class)();
};
_class.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
  type: _class
});
_class.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](JsFormatterRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
})();

/***/ }),

/***/ 9916:
/*!****************************************************************!*\
  !*** ./src/app/modules/js-formatter/js-formatter.component.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   JsFormatterComponent: () => (/* binding */ JsFormatterComponent)
/* harmony export */ });
/* harmony import */ var src_environments_component_config_js_formatter_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/environments/component-config/js-formatter/config */ 375);
/* harmony import */ var js_beautify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! js-beautify */ 2651);
/* harmony import */ var js_beautify__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(js_beautify__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/cdk/clipboard */ 4362);
/* harmony import */ var src_app_service_platform_metadata_platform_metadata_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/service/platform-metadata/platform-metadata.service */ 3242);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/icon */ 6515);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/button */ 895);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/forms */ 8849);
/* harmony import */ var ngx_monaco_editor_v2__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ngx-monaco-editor-v2 */ 8937);
var _class;










function JsFormatterComponent_ngx_monaco_editor_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "ngx-monaco-editor", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ngModelChange", function JsFormatterComponent_ngx_monaco_editor_6_Template_ngx_monaco_editor_ngModelChange_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r3);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r2.onRawCodeChange($event));
    })("ngModelChange", function JsFormatterComponent_ngx_monaco_editor_6_Template_ngx_monaco_editor_ngModelChange_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r3);
      const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r4.rawCode = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("options", ctx_r0.editorOptions)("ngModel", ctx_r0.rawCode);
  }
}
function JsFormatterComponent_ngx_monaco_editor_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "ngx-monaco-editor", 7, 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ngModelChange", function JsFormatterComponent_ngx_monaco_editor_11_Template_ngx_monaco_editor_ngModelChange_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r7);
      const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r6.formattedCode = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("options", ctx_r1.editorOptions)("ngModel", ctx_r1.formattedCode);
  }
}
class JsFormatterComponent {
  constructor(clipboard, platformMetaDataService) {
    this.clipboard = clipboard;
    this.platformMetaDataService = platformMetaDataService;
    this.rawCode = `if(value==='webtoolseasy'){formatjs();}else{console.log('this is awesome');}`;
    /**
     * monaco editor options
     */
    this.editorOptions = {
      theme: 'vs-dark',
      language: 'javascript',
      fontSize: 17
    };
    this.applicationConfig = src_environments_component_config_js_formatter_config__WEBPACK_IMPORTED_MODULE_0__.componentConfig;
    this.descriptionData = src_environments_component_config_js_formatter_config__WEBPACK_IMPORTED_MODULE_0__.descriptionData;
    this.formattedCode = (0,js_beautify__WEBPACK_IMPORTED_MODULE_1__.js_beautify)(this.rawCode);
  }
  onRawCodeChange(updatedModel) {
    this.formattedCode = (0,js_beautify__WEBPACK_IMPORTED_MODULE_1__.js_beautify)(updatedModel);
  }
  copyFormattedCode() {
    this.clipboard.copy(this.formattedCode);
  }
}
_class = JsFormatterComponent;
_class.ɵfac = function JsFormatterComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_4__.Clipboard), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](src_app_service_platform_metadata_platform_metadata_service__WEBPACK_IMPORTED_MODULE_2__.PlatformMetadataService));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["app-js-formatter"]],
  decls: 16,
  vars: 2,
  consts: [[1, "flex-display", "flex-column-flow", "flex-align-center", "flex-gap-medium"], [1, "flex-display", "flex-row-flow", "flex-align-center", "full-width", "text-area-container"], [1, "flex-display", "flex-column-flow", "text-area-div", "flex-gap-medium"], [1, "div-label"], [1, "full-height", "full-width"], ["style", "height: 100%", 3, "options", "ngModel", "ngModelChange", 4, "ngIf"], ["mat-stroked-button", "", "color", "primary", 2, "align-self", "flex-end", 3, "click"], [2, "height", "100%", 3, "options", "ngModel", "ngModelChange"], ["formattedEditor", ""]],
  template: function JsFormatterComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "span", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4, "Unformatted JS (Paste JS Here)");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](5, "div", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](6, JsFormatterComponent_ngx_monaco_editor_6_Template, 1, 2, "ngx-monaco-editor", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](7, "div", 2)(8, "span", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](9, "Formatted JS");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](10, "div", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](11, JsFormatterComponent_ngx_monaco_editor_11_Template, 2, 2, "ngx-monaco-editor", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](12, "button", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function JsFormatterComponent_Template_button_click_12_listener() {
        return ctx.copyFormattedCode();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](13, "mat-icon");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](14, "content_copy");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](15, " Copy Formatted JS ");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](6);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.platformMetaDataService.isPlatformBrowser);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.platformMetaDataService.isPlatformBrowser);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.NgIf, _angular_material_icon__WEBPACK_IMPORTED_MODULE_6__.MatIcon, _angular_material_button__WEBPACK_IMPORTED_MODULE_7__.MatButton, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.NgModel, ngx_monaco_editor_v2__WEBPACK_IMPORTED_MODULE_9__.EditorComponent],
  styles: [".div-label[_ngcontent-%COMP%] {\n  font-size: large;\n}\n\n.text-area-div[_ngcontent-%COMP%] {\n  width: 49%;\n  height: 40em;\n}\n\n.text-area-container[_ngcontent-%COMP%] {\n  justify-content: space-between;\n}\n\n@media screen and (max-width: 735px) {\n  .text-area-div[_ngcontent-%COMP%] {\n    height: 25em;\n    width: 100%;\n  }\n  .text-area-container[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 10px;\n  }\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvbW9kdWxlcy9qcy1mb3JtYXR0ZXIvanMtZm9ybWF0dGVyLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsZ0JBQUE7QUFDRjs7QUFFQTtFQUNFLFVBQUE7RUFDQSxZQUFBO0FBQ0Y7O0FBRUE7RUFDRSw4QkFBQTtBQUNGOztBQUVBO0VBQ0U7SUFDRSxZQUFBO0lBQ0EsV0FBQTtFQUNGO0VBQ0E7SUFDRSxzQkFBQTtJQUNBLFNBQUE7RUFDRjtBQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLmRpdi1sYWJlbCB7XG4gIGZvbnQtc2l6ZTogbGFyZ2U7XG59XG5cbi50ZXh0LWFyZWEtZGl2IHtcbiAgd2lkdGg6IDQ5JTtcbiAgaGVpZ2h0OiA0MGVtO1xufVxuXG4udGV4dC1hcmVhLWNvbnRhaW5lciB7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2Vlbjtcbn1cblxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogNzM1cHgpIHtcbiAgLnRleHQtYXJlYS1kaXYge1xuICAgIGhlaWdodDogMjVlbTtcbiAgICB3aWR0aDogMTAwJTtcbiAgfVxuICAudGV4dC1hcmVhLWNvbnRhaW5lciB7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICBnYXA6IDEwcHg7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
});

/***/ }),

/***/ 4183:
/*!*************************************************************!*\
  !*** ./src/app/modules/js-formatter/js-formatter.module.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   JsFormatterModule: () => (/* binding */ JsFormatterModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _js_formatter_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js-formatter-routing.module */ 9411);
/* harmony import */ var _angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/cdk/clipboard */ 4362);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/button */ 895);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/icon */ 6515);
/* harmony import */ var _js_formatter_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js-formatter.component */ 9916);
/* harmony import */ var src_app_modules_header_toolbar_header_toolbar_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/modules/header-toolbar/header-toolbar.module */ 8369);
/* harmony import */ var src_app_modules_tool_heading_tool_heading_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/modules/tool-heading/tool-heading.module */ 6861);
/* harmony import */ var src_app_modules_tags_tags_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/modules/tags/tags.module */ 3665);
/* harmony import */ var src_app_modules_footer_footer_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/modules/footer/footer-module */ 6122);
/* harmony import */ var src_app_modules_related_tools_related_tools_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/modules/related-tools/related-tools.module */ 300);
/* harmony import */ var src_app_modules_description_description_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/modules/description/description.module */ 4485);
/* harmony import */ var src_app_modules_share_buttons_share_buttons_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/modules/share-buttons/share-buttons.module */ 8292);
/* harmony import */ var src_app_modules_follow_buttons_follow_buttons_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/modules/follow-buttons/follow-buttons.module */ 3341);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/forms */ 8849);
/* harmony import */ var ngx_monaco_editor_v2__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ngx-monaco-editor-v2 */ 8937);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/core */ 1699);
var _class;


















class JsFormatterModule {}
_class = JsFormatterModule;
_class.ɵfac = function JsFormatterModule_Factory(t) {
  return new (t || _class)();
};
_class.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdefineNgModule"]({
  type: _class
});
_class.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_11__.CommonModule, _js_formatter_routing_module__WEBPACK_IMPORTED_MODULE_0__.JsFormatterRoutingModule, src_app_modules_share_buttons_share_buttons_module__WEBPACK_IMPORTED_MODULE_8__.ShareButtonsModule, src_app_modules_follow_buttons_follow_buttons_module__WEBPACK_IMPORTED_MODULE_9__.FollowButtonsModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_12__.MatIconModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_13__.MatButtonModule, _angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_14__.ClipboardModule, src_app_modules_header_toolbar_header_toolbar_module__WEBPACK_IMPORTED_MODULE_2__.HeaderToolbarModule, src_app_modules_tool_heading_tool_heading_module__WEBPACK_IMPORTED_MODULE_3__.ToolHeadingModule, src_app_modules_tags_tags_module__WEBPACK_IMPORTED_MODULE_4__.TagsModule, src_app_modules_footer_footer_module__WEBPACK_IMPORTED_MODULE_5__.FooterModule, src_app_modules_related_tools_related_tools_module__WEBPACK_IMPORTED_MODULE_6__.RelatedToolsModule, src_app_modules_description_description_module__WEBPACK_IMPORTED_MODULE_7__.DescriptionModule, _angular_forms__WEBPACK_IMPORTED_MODULE_15__.FormsModule, ngx_monaco_editor_v2__WEBPACK_IMPORTED_MODULE_16__.MonacoEditorModule.forRoot()]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵsetNgModuleScope"](JsFormatterModule, {
    declarations: [_js_formatter_component__WEBPACK_IMPORTED_MODULE_1__.JsFormatterComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_11__.CommonModule, _js_formatter_routing_module__WEBPACK_IMPORTED_MODULE_0__.JsFormatterRoutingModule, src_app_modules_share_buttons_share_buttons_module__WEBPACK_IMPORTED_MODULE_8__.ShareButtonsModule, src_app_modules_follow_buttons_follow_buttons_module__WEBPACK_IMPORTED_MODULE_9__.FollowButtonsModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_12__.MatIconModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_13__.MatButtonModule, _angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_14__.ClipboardModule, src_app_modules_header_toolbar_header_toolbar_module__WEBPACK_IMPORTED_MODULE_2__.HeaderToolbarModule, src_app_modules_tool_heading_tool_heading_module__WEBPACK_IMPORTED_MODULE_3__.ToolHeadingModule, src_app_modules_tags_tags_module__WEBPACK_IMPORTED_MODULE_4__.TagsModule, src_app_modules_footer_footer_module__WEBPACK_IMPORTED_MODULE_5__.FooterModule, src_app_modules_related_tools_related_tools_module__WEBPACK_IMPORTED_MODULE_6__.RelatedToolsModule, src_app_modules_description_description_module__WEBPACK_IMPORTED_MODULE_7__.DescriptionModule, _angular_forms__WEBPACK_IMPORTED_MODULE_15__.FormsModule, ngx_monaco_editor_v2__WEBPACK_IMPORTED_MODULE_16__.MonacoEditorModule]
  });
})();

/***/ }),

/***/ 375:
/*!******************************************************************!*\
  !*** ./src/environments/component-config/js-formatter/config.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   componentConfig: () => (/* binding */ componentConfig),
/* harmony export */   descriptionData: () => (/* binding */ descriptionData)
/* harmony export */ });
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/environments/environment */ 553);
/* harmony import */ var src_environments_tools_directory_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/environments/tools-directory-config */ 6636);


const navigationUrl = '/tools/js-formatter';
const pageTitle = 'JS Beautifier and Formatter: Beautify and Format JavaScript';
const pageDescription = 'Beautify and format your JavaScript code with ease with our free online JavaScript beautifier and formatter tool. No download required, no sign-up required.';
const imageUrl = `${src_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.screenshotsBaseUrl}/js-format.png`;
const keywords = 'online JavaScript beautifier and formatter,beautify JavaScript code,format JavaScript code,JavaScript beautifier and formatter tool,JavaScript code formatter,JavaScript code style,improve JavaScript code readability,make JavaScript code more consistent,follow JavaScript code style guidelines,free JavaScript beautifier and formatter,no download required,supports all JavaScript features,easy to use,customizable settings,JavaScript code style guide,JavaScript code formatting errors';
const relatedTools = [src_environments_tools_directory_config__WEBPACK_IMPORTED_MODULE_1__.ApplicationIds.CSS_FORMATTER, src_environments_tools_directory_config__WEBPACK_IMPORTED_MODULE_1__.ApplicationIds.HTML_FORMATTER, src_environments_tools_directory_config__WEBPACK_IMPORTED_MODULE_1__.ApplicationIds.JSON_FORMATTER, src_environments_tools_directory_config__WEBPACK_IMPORTED_MODULE_1__.ApplicationIds.JSON_VIEWER];
const componentConfig = {
  mainHeading: 'Free Online JavaScript Beautifier and Formatter: Beautify and Format Your JavaScript Code with Ease',
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
  heading: 'What is a JavaScript Beautifier and Formatter?',
  blockData: ['A JavaScript beautifier and formatter is a tool that takes your JavaScript code and formats it in a consistent and readable style. This can make your code easier to read, understand, and maintain.']
}, {
  heading: 'Why Use a JavaScript Beautifier and Formatter?',
  listData: ['To improve the readability of your code. Well-formatted code is easier to read and understand, which can help you to write better code and to debug your code more easily.', 'To make your code more consistent. A JavaScript beautifier and formatter can help you to format your code in a consistent style, which can make your code more readable and maintainable.', 'To follow code style guidelines. Many companies have code style guidelines that they require their developers to follow. A JavaScript beautifier and formatter can help you to format your code in accordance with these guidelines.']
}, {
  heading: 'Features of Our Online JavaScript Beautifier and Formatter Tool',
  listData: ['Free to use. No need to pay or sign up for an account.', 'No download required. Beautify and format your JavaScript code directly from your web browser.', 'Supports all JavaScript features. Our beautifier and formatter supports all the features of the JavaScript language, including ES6 and ES7.', 'Easy to use. Simply paste your JavaScript code into the editor and click the "Beautify and Format" button.', 'Customizable settings. You can customize the settings of our beautifier and formatter to match your personal preferences.']
}, {
  heading: 'How to Use Our Online JavaScript Beautifier and Formatter Tool',
  listData: ['Go to our website and paste your JavaScript code into the editor.', 'Click the "Beautify and Format" button.', 'View your beautified and formatted JavaScript code in the sidebar.', 'Copy and paste your beautified and formatted JavaScript code into your project.']
}, {
  heading: 'Tips for Using a JavaScript Beautifier and Formatter',
  listData: ['Use a consistent code style. Choose a code style and use it consistently throughout your project. This will make your code more readable and maintainable.', 'Format your code before you commit it to a repository. This will help to ensure that your code is readable and maintainable for other developers.', 'Use a JavaScript beautifier and formatter to check for formatting errors. A JavaScript beautifier and formatter can help you to identify and fix formatting errors in your code.']
}, {
  blockData: ['Our free online JavaScript beautifier and formatter tool is a great way to beautify and format your JavaScript code with ease. It is easy to use and supports all the features of the JavaScript language. With our beautifier and formatter, you can improve the readability, consistency, and maintainability of your JavaScript code.']
}];

/***/ })

}]);
//# sourceMappingURL=src_app_modules_js-formatter_js-formatter_module_ts.7907aa0e50610881.js.map