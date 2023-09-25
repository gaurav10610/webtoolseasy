"use strict";
(self["webpackChunkwebtoolseasy"] = self["webpackChunkwebtoolseasy"] || []).push([["src_app_modules_html-formatter_html-formatter_module_ts"],{

/***/ 5890:
/*!*************************************************************************!*\
  !*** ./src/app/modules/html-formatter/html-formatter-routing.module.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HtmlFormatterRoutingModule: () => (/* binding */ HtmlFormatterRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 7947);
/* harmony import */ var _html_formatter_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./html-formatter.component */ 3779);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 1699);
var _class;




const routes = [{
  path: '',
  component: _html_formatter_component__WEBPACK_IMPORTED_MODULE_0__.HtmlFormatterComponent
}];
class HtmlFormatterRoutingModule {}
_class = HtmlFormatterRoutingModule;
_class.ɵfac = function HtmlFormatterRoutingModule_Factory(t) {
  return new (t || _class)();
};
_class.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
  type: _class
});
_class.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](HtmlFormatterRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
})();

/***/ }),

/***/ 3779:
/*!********************************************************************!*\
  !*** ./src/app/modules/html-formatter/html-formatter.component.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HtmlFormatterComponent: () => (/* binding */ HtmlFormatterComponent)
/* harmony export */ });
/* harmony import */ var src_environments_component_config_html_formatter_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/environments/component-config/html-formatter/config */ 7015);
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










function HtmlFormatterComponent_ngx_monaco_editor_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "ngx-monaco-editor", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ngModelChange", function HtmlFormatterComponent_ngx_monaco_editor_6_Template_ngx_monaco_editor_ngModelChange_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r3);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r2.onRawCodeChange($event));
    })("ngModelChange", function HtmlFormatterComponent_ngx_monaco_editor_6_Template_ngx_monaco_editor_ngModelChange_0_listener($event) {
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
function HtmlFormatterComponent_ngx_monaco_editor_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "ngx-monaco-editor", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ngModelChange", function HtmlFormatterComponent_ngx_monaco_editor_11_Template_ngx_monaco_editor_ngModelChange_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r6);
      const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r5.formattedCode = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("options", ctx_r1.editorOptions)("ngModel", ctx_r1.formattedCode);
  }
}
class HtmlFormatterComponent {
  constructor(clipboard, platformMetaDataService) {
    this.clipboard = clipboard;
    this.platformMetaDataService = platformMetaDataService;
    this.rawCode = '<html><head><title>Online HTML Formatter</title></head><body><p>webtoolseasy is awesome!</p></p></body></html>';
    /**
     * monaco editor options
     */
    this.editorOptions = {
      theme: 'vs-dark',
      language: 'html',
      fontSize: 17
    };
    this.applicationConfig = src_environments_component_config_html_formatter_config__WEBPACK_IMPORTED_MODULE_0__.componentConfig;
    this.descriptionData = src_environments_component_config_html_formatter_config__WEBPACK_IMPORTED_MODULE_0__.descriptionData;
  }
  ngOnInit() {
    this.formattedCode = (0,js_beautify__WEBPACK_IMPORTED_MODULE_1__.html_beautify)(this.rawCode);
  }
  onRawCodeChange(updatedModel) {
    this.formattedCode = (0,js_beautify__WEBPACK_IMPORTED_MODULE_1__.html_beautify)(updatedModel);
  }
  copyFormattedCode() {
    this.clipboard.copy(this.formattedCode);
  }
}
_class = HtmlFormatterComponent;
_class.ɵfac = function HtmlFormatterComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_4__.Clipboard), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](src_app_service_platform_metadata_platform_metadata_service__WEBPACK_IMPORTED_MODULE_2__.PlatformMetadataService));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["app-html-formatter"]],
  decls: 16,
  vars: 2,
  consts: [[1, "flex-display", "flex-column-flow", "flex-align-center", "flex-gap-medium"], [1, "flex-display", "flex-row-flow", "flex-align-center", "full-width", "text-area-container"], [1, "flex-display", "flex-column-flow", "text-area-div", "flex-gap-medium"], [1, "div-label"], [1, "full-height", "full-width"], ["style", "height: 100%", 3, "options", "ngModel", "ngModelChange", 4, "ngIf"], ["mat-stroked-button", "", "color", "primary", 2, "align-self", "flex-end", 3, "click"], [2, "height", "100%", 3, "options", "ngModel", "ngModelChange"]],
  template: function HtmlFormatterComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "span", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4, "Unformatted HTML (Paste HTML Here)");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](5, "div", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](6, HtmlFormatterComponent_ngx_monaco_editor_6_Template, 1, 2, "ngx-monaco-editor", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](7, "div", 2)(8, "span", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](9, "Formatted HTML");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](10, "div", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](11, HtmlFormatterComponent_ngx_monaco_editor_11_Template, 1, 2, "ngx-monaco-editor", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](12, "button", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function HtmlFormatterComponent_Template_button_click_12_listener() {
        return ctx.copyFormattedCode();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](13, "mat-icon");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](14, "content_copy");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](15, "Copy Formatted HTML ");
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
  styles: [".div-label[_ngcontent-%COMP%] {\n  font-size: large;\n}\n\n.text-area-div[_ngcontent-%COMP%] {\n  width: 49%;\n  height: 40em;\n}\n\n.text-area-container[_ngcontent-%COMP%] {\n  justify-content: space-between;\n}\n\n@media screen and (max-width: 735px) {\n  .text-area-div[_ngcontent-%COMP%] {\n    height: 25em;\n    width: 100%;\n  }\n  .text-area-container[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 15px;\n  }\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvbW9kdWxlcy9odG1sLWZvcm1hdHRlci9odG1sLWZvcm1hdHRlci5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGdCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxVQUFBO0VBQ0EsWUFBQTtBQUNGOztBQUVBO0VBQ0UsOEJBQUE7QUFDRjs7QUFFQTtFQUNFO0lBQ0UsWUFBQTtJQUNBLFdBQUE7RUFDRjtFQUNBO0lBQ0Usc0JBQUE7SUFDQSxTQUFBO0VBQ0Y7QUFDRiIsInNvdXJjZXNDb250ZW50IjpbIi5kaXYtbGFiZWwge1xuICBmb250LXNpemU6IGxhcmdlO1xufVxuXG4udGV4dC1hcmVhLWRpdiB7XG4gIHdpZHRoOiA0OSU7XG4gIGhlaWdodDogNDBlbTtcbn1cblxuLnRleHQtYXJlYS1jb250YWluZXIge1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG59XG5cbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDczNXB4KSB7XG4gIC50ZXh0LWFyZWEtZGl2IHtcbiAgICBoZWlnaHQ6IDI1ZW07XG4gICAgd2lkdGg6IDEwMCU7XG4gIH1cbiAgLnRleHQtYXJlYS1jb250YWluZXIge1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgZ2FwOiAxNXB4O1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
});

/***/ }),

/***/ 9527:
/*!*****************************************************************!*\
  !*** ./src/app/modules/html-formatter/html-formatter.module.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HtmlFormatterModule: () => (/* binding */ HtmlFormatterModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _html_formatter_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./html-formatter-routing.module */ 5890);
/* harmony import */ var _angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/cdk/clipboard */ 4362);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/button */ 895);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/icon */ 6515);
/* harmony import */ var _html_formatter_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./html-formatter.component */ 3779);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ 8849);
/* harmony import */ var ngx_monaco_editor_v2__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ngx-monaco-editor-v2 */ 8937);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 1699);
var _class;










class HtmlFormatterModule {}
_class = HtmlFormatterModule;
_class.ɵfac = function HtmlFormatterModule_Factory(t) {
  return new (t || _class)();
};
_class.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
  type: _class
});
_class.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _html_formatter_routing_module__WEBPACK_IMPORTED_MODULE_0__.HtmlFormatterRoutingModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__.MatIconModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_5__.MatButtonModule, _angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_6__.ClipboardModule, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormsModule, ngx_monaco_editor_v2__WEBPACK_IMPORTED_MODULE_8__.MonacoEditorModule.forRoot()]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](HtmlFormatterModule, {
    declarations: [_html_formatter_component__WEBPACK_IMPORTED_MODULE_1__.HtmlFormatterComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _html_formatter_routing_module__WEBPACK_IMPORTED_MODULE_0__.HtmlFormatterRoutingModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__.MatIconModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_5__.MatButtonModule, _angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_6__.ClipboardModule, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormsModule, ngx_monaco_editor_v2__WEBPACK_IMPORTED_MODULE_8__.MonacoEditorModule]
  });
})();

/***/ }),

/***/ 7015:
/*!********************************************************************!*\
  !*** ./src/environments/component-config/html-formatter/config.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   componentConfig: () => (/* binding */ componentConfig),
/* harmony export */   descriptionData: () => (/* binding */ descriptionData)
/* harmony export */ });
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/environments/environment */ 553);
/* harmony import */ var src_environments_tools_directory_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/environments/tools-directory-config */ 6636);


const navigationUrl = '/tools/html-formatter';
const pageTitle = 'HTML Beautifier and Formatter: Beautify and Format HTML Code';
const pageDescription = 'Beautify your HTML code with ease with our free online HTML beautifier tool. No download required, no sign-up required.';
const imageUrl = `${src_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.screenshotsBaseUrl}/html-format.png`;
const keywords = 'online HTML beautifier,beautify HTML code,HTML beautifier tool,HTML code formatter,HTML code style,improve HTML code readability,make HTML code more consistent,follow HTML code style guidelines,free HTML beautifier,no download required,supports all HTML features,easy to use,customizable settings,HTML code style guide,HTML code formatting errors';
const relatedTools = [src_environments_tools_directory_config__WEBPACK_IMPORTED_MODULE_1__.ApplicationIds.JS_FORMATTER, src_environments_tools_directory_config__WEBPACK_IMPORTED_MODULE_1__.ApplicationIds.JSON_FORMATTER, src_environments_tools_directory_config__WEBPACK_IMPORTED_MODULE_1__.ApplicationIds.JSON_VIEWER, src_environments_tools_directory_config__WEBPACK_IMPORTED_MODULE_1__.ApplicationIds.CSS_FORMATTER];
const componentConfig = {
  mainHeading: 'Free Online HTML Beautifier: Make Your HTML Code More Readable and Maintainable',
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
  heading: 'What is an HTML Beautifier?',
  blockData: ['An HTML beautifier is a tool that takes your HTML code and formats it in a consistent and readable style. This can make your code easier to read, understand, and maintain.']
}, {
  heading: 'Why Use an HTML Beautifier?',
  listData: ['To improve the readability of your code. Well-formatted code is easier to read and understand, which can help you to write better code and to debug your code more easily.', 'To make your code more consistent. An HTML beautifier can help you to format your code in a consistent style, which can make your code more readable and maintainable.', 'To follow code style guidelines. Many companies have code style guidelines that they require their developers to follow. An HTML beautifier can help you to format your code in accordance with these guidelines.']
}, {
  heading: 'Features of Our Online HTML Beautifier Tool',
  listData: ['Free to use. No need to pay or sign up for an account.', 'No download required. Beautify your HTML code directly from your web browser.', 'Supports all HTML features. Our beautifier supports all the features of the HTML language, including HTML5 and HTML6.', 'Easy to use. Simply paste your HTML code into the editor and click the "Beautify" button.', 'Customizable settings. You can customize the settings of our beautifier to match your personal preferences.']
}, {
  heading: 'How to Use Our Online HTML Beautifier Tool',
  listData: ['Go to our website and paste your HTML code into the editor.', 'Click the "Beautify" button.', 'View your beautified HTML code in the sidebar.', 'Copy and paste your beautified HTML code into your project.']
}, {
  heading: 'Tips for Using an HTML Beautifier',
  listData: ['Use a consistent code style. Choose a code style and use it consistently throughout your project. This will make your code more readable and maintainable.', 'Format your code before you commit it to a repository. This will help to ensure that your code is readable and maintainable for other developers.', 'Use an HTML beautifier to check for formatting errors. An HTML beautifier can help you to identify and fix formatting errors in your code.']
}, {
  blockData: ['Our free online HTML beautifier tool is a great way to beautify your HTML code with ease. It is easy to use and supports all the features of the HTML language. With our beautifier, you can improve the readability, consistency, and maintainability of your HTML code.']
}];

/***/ })

}]);
//# sourceMappingURL=src_app_modules_html-formatter_html-formatter_module_ts.af405b64be90baef.js.map