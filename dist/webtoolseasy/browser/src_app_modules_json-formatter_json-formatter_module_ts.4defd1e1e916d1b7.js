"use strict";
(self["webpackChunkwebtoolseasy"] = self["webpackChunkwebtoolseasy"] || []).push([["src_app_modules_json-formatter_json-formatter_module_ts"],{

/***/ 6438:
/*!*************************************************************************!*\
  !*** ./src/app/modules/json-formatter/json-formatter-routing.module.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   JsonFormatterRoutingModule: () => (/* binding */ JsonFormatterRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 7947);
/* harmony import */ var _json_formatter_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./json-formatter.component */ 3486);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 1699);
var _class;




const routes = [{
  path: '',
  component: _json_formatter_component__WEBPACK_IMPORTED_MODULE_0__.JsonFormatterComponent
}];
class JsonFormatterRoutingModule {}
_class = JsonFormatterRoutingModule;
_class.ɵfac = function JsonFormatterRoutingModule_Factory(t) {
  return new (t || _class)();
};
_class.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
  type: _class
});
_class.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](JsonFormatterRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
})();

/***/ }),

/***/ 3486:
/*!********************************************************************!*\
  !*** ./src/app/modules/json-formatter/json-formatter.component.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   JsonFormatterComponent: () => (/* binding */ JsonFormatterComponent)
/* harmony export */ });
/* harmony import */ var src_environments_component_config_json_formatter_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/environments/component-config/json-formatter/config */ 1722);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/cdk/clipboard */ 4362);
/* harmony import */ var src_app_service_platform_metadata_platform_metadata_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/service/platform-metadata/platform-metadata.service */ 3242);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/icon */ 6515);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/button */ 895);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ 8849);
/* harmony import */ var ngx_monaco_editor_v2__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ngx-monaco-editor-v2 */ 8937);
var _class;









function JsonFormatterComponent_ngx_monaco_editor_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "ngx-monaco-editor", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("ngModelChange", function JsonFormatterComponent_ngx_monaco_editor_6_Template_ngx_monaco_editor_ngModelChange_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r3);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r2.onRawCodeChange($event));
    })("ngModelChange", function JsonFormatterComponent_ngx_monaco_editor_6_Template_ngx_monaco_editor_ngModelChange_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r3);
      const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r4.rawCode = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("options", ctx_r0.editorOptions)("ngModel", ctx_r0.rawCode);
  }
}
function JsonFormatterComponent_ngx_monaco_editor_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "ngx-monaco-editor", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("ngModelChange", function JsonFormatterComponent_ngx_monaco_editor_11_Template_ngx_monaco_editor_ngModelChange_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r6);
      const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r5.formattedCode = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("options", ctx_r1.editorOptions)("ngModel", ctx_r1.formattedCode);
  }
}
class JsonFormatterComponent {
  constructor(clipboard, platformMetaDataService) {
    this.clipboard = clipboard;
    this.platformMetaDataService = platformMetaDataService;
    this.rawCode = `{"role":"admin","issuer":"sample issuer","username":"username@webtoolseasy.com","exp":1668942423,"iat":1668942423,"colors":{"primary":"indigo","warn":"red","accent":"pink"}}`;
    this.tabSpaceValue = '   ';
    /**
     * monaco editor options
     */
    this.editorOptions = {
      theme: 'vs-dark',
      language: 'json',
      fontSize: 17
    };
    this.applicationConfig = src_environments_component_config_json_formatter_config__WEBPACK_IMPORTED_MODULE_0__.componentConfig;
    this.descriptionData = src_environments_component_config_json_formatter_config__WEBPACK_IMPORTED_MODULE_0__.descriptionData;
    this.formattedCode = JSON.stringify(JSON.parse(this.rawCode), null, this.tabSpaceValue);
  }
  onRawCodeChange(updatedModel) {
    this.formattedCode = JSON.stringify(JSON.parse(updatedModel), null, this.tabSpaceValue);
  }
  copyFormattedCode() {
    this.clipboard.copy(this.formattedCode);
  }
}
_class = JsonFormatterComponent;
_class.ɵfac = function JsonFormatterComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_3__.Clipboard), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](src_app_service_platform_metadata_platform_metadata_service__WEBPACK_IMPORTED_MODULE_1__.PlatformMetadataService));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["app-json-formatter"]],
  decls: 16,
  vars: 2,
  consts: [[1, "flex-display", "flex-column-flow", "flex-align-center", "flex-gap-medium"], [1, "flex-display", "flex-row-flow", "flex-align-center", "full-width", "text-area-container"], [1, "flex-display", "flex-column-flow", "text-area-div", "flex-gap-medium"], [1, "div-label"], [1, "full-height", "full-width"], ["style", "height: 100%", 3, "options", "ngModel", "ngModelChange", 4, "ngIf"], ["mat-stroked-button", "", "color", "primary", 2, "align-self", "flex-end", 3, "click"], [2, "height", "100%", 3, "options", "ngModel", "ngModelChange"]],
  template: function JsonFormatterComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "span", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4, "Unformatted JSON (Paste JSON Here)");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "div", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](6, JsonFormatterComponent_ngx_monaco_editor_6_Template, 1, 2, "ngx-monaco-editor", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "div", 2)(8, "span", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](9, "Formatted JSON");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](10, "div", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](11, JsonFormatterComponent_ngx_monaco_editor_11_Template, 1, 2, "ngx-monaco-editor", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](12, "button", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function JsonFormatterComponent_Template_button_click_12_listener() {
        return ctx.copyFormattedCode();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](13, "mat-icon");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](14, "content_copy");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](15, " Copy Formatted JSON ");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](6);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.platformMetaDataService.isPlatformBrowser);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.platformMetaDataService.isPlatformBrowser);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.NgIf, _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__.MatIcon, _angular_material_button__WEBPACK_IMPORTED_MODULE_6__.MatButton, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NgModel, ngx_monaco_editor_v2__WEBPACK_IMPORTED_MODULE_8__.EditorComponent],
  styles: [".div-label[_ngcontent-%COMP%] {\n  font-size: large;\n}\n\n.text-area-div[_ngcontent-%COMP%] {\n  width: 49%;\n  height: 40em;\n}\n\n.text-area-container[_ngcontent-%COMP%] {\n  justify-content: space-between;\n}\n\n@media screen and (max-width: 735px) {\n  .text-area-div[_ngcontent-%COMP%] {\n    height: 25em;\n    width: 100%;\n  }\n  .text-area-container[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 10px;\n  }\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvbW9kdWxlcy9qc29uLWZvcm1hdHRlci9qc29uLWZvcm1hdHRlci5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGdCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxVQUFBO0VBQ0EsWUFBQTtBQUNGOztBQUVBO0VBQ0UsOEJBQUE7QUFDRjs7QUFFQTtFQUNFO0lBQ0UsWUFBQTtJQUNBLFdBQUE7RUFDRjtFQUNBO0lBQ0Usc0JBQUE7SUFDQSxTQUFBO0VBQ0Y7QUFDRiIsInNvdXJjZXNDb250ZW50IjpbIi5kaXYtbGFiZWwge1xuICBmb250LXNpemU6IGxhcmdlO1xufVxuXG4udGV4dC1hcmVhLWRpdiB7XG4gIHdpZHRoOiA0OSU7XG4gIGhlaWdodDogNDBlbTtcbn1cblxuLnRleHQtYXJlYS1jb250YWluZXIge1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG59XG5cbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDczNXB4KSB7XG4gIC50ZXh0LWFyZWEtZGl2IHtcbiAgICBoZWlnaHQ6IDI1ZW07XG4gICAgd2lkdGg6IDEwMCU7XG4gIH1cbiAgLnRleHQtYXJlYS1jb250YWluZXIge1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgZ2FwOiAxMHB4O1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
});

/***/ }),

/***/ 5797:
/*!*****************************************************************!*\
  !*** ./src/app/modules/json-formatter/json-formatter.module.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   JsonFormatterModule: () => (/* binding */ JsonFormatterModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _json_formatter_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./json-formatter-routing.module */ 6438);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/icon */ 6515);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/button */ 895);
/* harmony import */ var _angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/cdk/clipboard */ 4362);
/* harmony import */ var _json_formatter_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./json-formatter.component */ 3486);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ 8849);
/* harmony import */ var ngx_monaco_editor_v2__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ngx-monaco-editor-v2 */ 8937);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 1699);
var _class;










class JsonFormatterModule {}
_class = JsonFormatterModule;
_class.ɵfac = function JsonFormatterModule_Factory(t) {
  return new (t || _class)();
};
_class.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
  type: _class
});
_class.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _json_formatter_routing_module__WEBPACK_IMPORTED_MODULE_0__.JsonFormatterRoutingModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__.MatIconModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_5__.MatButtonModule, _angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_6__.ClipboardModule, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormsModule, ngx_monaco_editor_v2__WEBPACK_IMPORTED_MODULE_8__.MonacoEditorModule.forRoot()]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](JsonFormatterModule, {
    declarations: [_json_formatter_component__WEBPACK_IMPORTED_MODULE_1__.JsonFormatterComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _json_formatter_routing_module__WEBPACK_IMPORTED_MODULE_0__.JsonFormatterRoutingModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__.MatIconModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_5__.MatButtonModule, _angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_6__.ClipboardModule, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormsModule, ngx_monaco_editor_v2__WEBPACK_IMPORTED_MODULE_8__.MonacoEditorModule]
  });
})();

/***/ }),

/***/ 1722:
/*!********************************************************************!*\
  !*** ./src/environments/component-config/json-formatter/config.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   componentConfig: () => (/* binding */ componentConfig),
/* harmony export */   descriptionData: () => (/* binding */ descriptionData)
/* harmony export */ });
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/environments/environment */ 553);
/* harmony import */ var src_environments_tools_directory_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/environments/tools-directory-config */ 6636);


const navigationUrl = '/tools/json-formatter';
const pageTitle = 'JSON Beautifier and Formatter: Beautify and Format Your JSON';
const pageDescription = 'Beautify and format your JSON data with ease with our free online JSON beautifier and formatter tool. No download required, no sign-up required.';
const imageUrl = `${src_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.screenshotsBaseUrl}/json-format.png`;
const keywords = 'online JSON beautifier and formatter,beautify JSON data,format JSON data,JSON beautifier and formatter tool,JSON data formatter,JSON data style,improve JSON data readability,make JSON data more consistent,follow JSON data style guidelines,free JSON beautifier and formatter,no download required,supports all JSON features,easy to use,customizable settings,JSON data style guide,JSON data formatting errors';
const relatedTools = [src_environments_tools_directory_config__WEBPACK_IMPORTED_MODULE_1__.ApplicationIds.JSON_VIEWER, src_environments_tools_directory_config__WEBPACK_IMPORTED_MODULE_1__.ApplicationIds.HTML_FORMATTER, src_environments_tools_directory_config__WEBPACK_IMPORTED_MODULE_1__.ApplicationIds.JS_FORMATTER, src_environments_tools_directory_config__WEBPACK_IMPORTED_MODULE_1__.ApplicationIds.CSS_FORMATTER];
const componentConfig = {
  mainHeading: 'Free Online JSON Beautifier and Formatter: Beautify and Format Your JSON Data with Ease',
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
  heading: 'What is a JSON Beautifier and Formatter?',
  blockData: ['A JSON beautifier and formatter is a tool that takes your JSON data and formats it in a consistent and readable style. This can make your data easier to read, understand, and maintain.']
}, {
  heading: 'Why Use a JSON Beautifier and Formatter?',
  listData: ['To improve the readability of your data. Well-formatted data is easier to read and understand, which can help you to write better code and to debug your code more easily.', 'To make your data more consistent. A JSON beautifier and formatter can help you to format your data in a consistent style, which can make your data more readable and maintainable.', 'To follow data style guidelines. Many companies have data style guidelines that they require their developers to follow. A JSON beautifier and formatter can help you to format your data in accordance with these guidelines.']
}, {
  heading: 'Features of Our Online JSON Beautifier and Formatter Tool',
  listData: ['Free to use. No need to pay or sign up for an account.', 'No download required. Beautify and format your JSON data directly from your web browser.', 'Supports all JSON features. Our beautifier and formatter supports all the features of the JSON language, including JSON5 and JSON Schema.', 'Easy to use. Simply paste your JSON data into the editor and click the "Beautify and Format" button.', 'Customizable settings. You can customize the settings of our beautifier and formatter to match your personal preferences.']
}, {
  heading: 'How to Use Our Online JSON Beautifier and Formatter Tool',
  listData: ['Go to our website and paste your JSON data into the editor.', 'Click the "Beautify and Format" button.', 'View your beautified and formatted JSON data in the sidebar.', 'Copy and paste your beautified and formatted JSON data into your project.']
}, {
  heading: 'Tips for Using a JSON Beautifier and Formatter',
  listData: ['Use a consistent data style. Choose a data style and use it consistently throughout your project. This will make your data more readable and maintainable.', 'Format your data before you commit it to a repository. This will help to ensure that your data is readable and maintainable for other developers.', 'Use a JSON beautifier and formatter to check for formatting errors. A JSON beautifier and formatter can help you to identify and fix formatting errors in your data.']
}, {
  blockData: ['Our free online JSON beautifier and formatter tool is a great way to beautify and format your JSON data with ease. It is easy to use and supports all the features of the JSON language. With our beautifier and formatter, you can improve the readability, consistency, and maintainability of your JSON data.']
}];

/***/ })

}]);
//# sourceMappingURL=src_app_modules_json-formatter_json-formatter_module_ts.4defd1e1e916d1b7.js.map