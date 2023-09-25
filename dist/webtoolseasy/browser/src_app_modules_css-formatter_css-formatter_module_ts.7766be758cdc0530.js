"use strict";
(self["webpackChunkwebtoolseasy"] = self["webpackChunkwebtoolseasy"] || []).push([["src_app_modules_css-formatter_css-formatter_module_ts"],{

/***/ 6431:
/*!***********************************************************************!*\
  !*** ./src/app/modules/css-formatter/css-formatter-routing.module.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CssFormatterRoutingModule: () => (/* binding */ CssFormatterRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 7947);
/* harmony import */ var _css_formatter_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./css-formatter.component */ 980);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 1699);
var _class;




const routes = [{
  path: '',
  component: _css_formatter_component__WEBPACK_IMPORTED_MODULE_0__.CssFormatterComponent
}];
class CssFormatterRoutingModule {}
_class = CssFormatterRoutingModule;
_class.ɵfac = function CssFormatterRoutingModule_Factory(t) {
  return new (t || _class)();
};
_class.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
  type: _class
});
_class.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](CssFormatterRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
})();

/***/ }),

/***/ 980:
/*!******************************************************************!*\
  !*** ./src/app/modules/css-formatter/css-formatter.component.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CssFormatterComponent: () => (/* binding */ CssFormatterComponent)
/* harmony export */ });
/* harmony import */ var src_environments_component_config_css_formatter_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/environments/component-config/css-formatter/config */ 5838);
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










function CssFormatterComponent_ngx_monaco_editor_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "ngx-monaco-editor", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ngModelChange", function CssFormatterComponent_ngx_monaco_editor_6_Template_ngx_monaco_editor_ngModelChange_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r3);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r2.onRawCodeChange($event));
    })("ngModelChange", function CssFormatterComponent_ngx_monaco_editor_6_Template_ngx_monaco_editor_ngModelChange_0_listener($event) {
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
function CssFormatterComponent_ngx_monaco_editor_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "ngx-monaco-editor", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ngModelChange", function CssFormatterComponent_ngx_monaco_editor_11_Template_ngx_monaco_editor_ngModelChange_0_listener($event) {
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
class CssFormatterComponent {
  constructor(clipboard, platformMetaDataService) {
    this.clipboard = clipboard;
    this.platformMetaDataService = platformMetaDataService;
    this.rawCode = `@media screen and (min-width:735px){.encoded-token-field{margin-right:30px}}@media screen and (max-width:735px){.token-area-container{flex-direction:column}.encoded-token-field{margin-bottom:20px}}.token-parent-div{width:40%;height:30em}`;
    /**
     * monaco editor options
     */
    this.editorOptions = {
      theme: 'vs-dark',
      language: 'css',
      fontSize: 17
    };
    this.applicationConfig = src_environments_component_config_css_formatter_config__WEBPACK_IMPORTED_MODULE_0__.componentConfig;
    this.descriptionData = src_environments_component_config_css_formatter_config__WEBPACK_IMPORTED_MODULE_0__.descriptionData;
    this.formattedCode = (0,js_beautify__WEBPACK_IMPORTED_MODULE_1__.css_beautify)(this.rawCode);
  }
  onRawCodeChange(updatedModel) {
    this.formattedCode = (0,js_beautify__WEBPACK_IMPORTED_MODULE_1__.css_beautify)(updatedModel);
  }
  copyFormattedCode() {
    this.clipboard.copy(this.formattedCode);
  }
}
_class = CssFormatterComponent;
_class.ɵfac = function CssFormatterComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_4__.Clipboard), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](src_app_service_platform_metadata_platform_metadata_service__WEBPACK_IMPORTED_MODULE_2__.PlatformMetadataService));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["app-css-formatter"]],
  decls: 16,
  vars: 2,
  consts: [[1, "flex-display", "flex-column-flow", "flex-align-center", "flex-gap-medium"], [1, "flex-display", "flex-row-flow", "flex-align-center", "full-width", "text-area-container"], [1, "flex-display", "flex-column-flow", "text-area-div", "flex-gap-medium"], [1, "div-label"], [1, "full-height", "full-width"], ["style", "height: 100%", 3, "options", "ngModel", "ngModelChange", 4, "ngIf"], ["mat-stroked-button", "", "color", "primary", 2, "align-self", "flex-end", 3, "click"], [2, "height", "100%", 3, "options", "ngModel", "ngModelChange"]],
  template: function CssFormatterComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "span", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4, "Unformatted CSS (Paste CSS Here)");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](5, "div", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](6, CssFormatterComponent_ngx_monaco_editor_6_Template, 1, 2, "ngx-monaco-editor", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](7, "div", 2)(8, "span", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](9, "Formatted CSS");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](10, "div", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](11, CssFormatterComponent_ngx_monaco_editor_11_Template, 1, 2, "ngx-monaco-editor", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](12, "button", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function CssFormatterComponent_Template_button_click_12_listener() {
        return ctx.copyFormattedCode();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](13, "mat-icon");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](14, "content_copy");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](15, " Copy Formatted CSS ");
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
  styles: [".div-label[_ngcontent-%COMP%] {\n  font-size: large;\n}\n\n.text-area-div[_ngcontent-%COMP%] {\n  width: 49%;\n  height: 40em;\n}\n\n.text-area-container[_ngcontent-%COMP%] {\n  justify-content: space-between;\n}\n\n@media screen and (max-width: 735px) {\n  .text-area-div[_ngcontent-%COMP%] {\n    height: 25em;\n    width: 100%;\n  }\n  .text-area-container[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 10px;\n  }\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvbW9kdWxlcy9jc3MtZm9ybWF0dGVyL2Nzcy1mb3JtYXR0ZXIuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxnQkFBQTtBQUNGOztBQUVBO0VBQ0UsVUFBQTtFQUNBLFlBQUE7QUFDRjs7QUFFQTtFQUNFLDhCQUFBO0FBQ0Y7O0FBRUE7RUFDRTtJQUNFLFlBQUE7SUFDQSxXQUFBO0VBQ0Y7RUFDQTtJQUNFLHNCQUFBO0lBQ0EsU0FBQTtFQUNGO0FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIuZGl2LWxhYmVsIHtcbiAgZm9udC1zaXplOiBsYXJnZTtcbn1cblxuLnRleHQtYXJlYS1kaXYge1xuICB3aWR0aDogNDklO1xuICBoZWlnaHQ6IDQwZW07XG59XG5cbi50ZXh0LWFyZWEtY29udGFpbmVyIHtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xufVxuXG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA3MzVweCkge1xuICAudGV4dC1hcmVhLWRpdiB7XG4gICAgaGVpZ2h0OiAyNWVtO1xuICAgIHdpZHRoOiAxMDAlO1xuICB9XG4gIC50ZXh0LWFyZWEtY29udGFpbmVyIHtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIGdhcDogMTBweDtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ }),

/***/ 5168:
/*!***************************************************************!*\
  !*** ./src/app/modules/css-formatter/css-formatter.module.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CssFormatterModule: () => (/* binding */ CssFormatterModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _css_formatter_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./css-formatter-routing.module */ 6431);
/* harmony import */ var _angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/cdk/clipboard */ 4362);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/button */ 895);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/icon */ 6515);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ 8849);
/* harmony import */ var _css_formatter_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./css-formatter.component */ 980);
/* harmony import */ var ngx_monaco_editor_v2__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ngx-monaco-editor-v2 */ 8937);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 1699);
var _class;










class CssFormatterModule {}
_class = CssFormatterModule;
_class.ɵfac = function CssFormatterModule_Factory(t) {
  return new (t || _class)();
};
_class.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
  type: _class
});
_class.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _css_formatter_routing_module__WEBPACK_IMPORTED_MODULE_0__.CssFormatterRoutingModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__.MatIconModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_5__.MatButtonModule, _angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_6__.ClipboardModule, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormsModule, ngx_monaco_editor_v2__WEBPACK_IMPORTED_MODULE_8__.MonacoEditorModule.forRoot()]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](CssFormatterModule, {
    declarations: [_css_formatter_component__WEBPACK_IMPORTED_MODULE_1__.CssFormatterComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _css_formatter_routing_module__WEBPACK_IMPORTED_MODULE_0__.CssFormatterRoutingModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__.MatIconModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_5__.MatButtonModule, _angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_6__.ClipboardModule, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormsModule, ngx_monaco_editor_v2__WEBPACK_IMPORTED_MODULE_8__.MonacoEditorModule]
  });
})();

/***/ }),

/***/ 5838:
/*!*******************************************************************!*\
  !*** ./src/environments/component-config/css-formatter/config.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   componentConfig: () => (/* binding */ componentConfig),
/* harmony export */   descriptionData: () => (/* binding */ descriptionData)
/* harmony export */ });
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/environments/environment */ 553);
/* harmony import */ var src_environments_tools_directory_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/environments/tools-directory-config */ 6636);


const navigationUrl = '/tools/css-formatter';
const pageTitle = 'CSS Beautifier and Formatter: Beautify and Format CSS Code';
const pageDescription = 'Beautify and format your CSS code with ease with our free online CSS beautifier and formatter tool. No download required, no sign-up required.';
const imageUrl = `${src_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.screenshotsBaseUrl}/css-format.png`;
const keywords = 'online CSS beautifier and formatter,beautify CSS code,format CSS code,CSS beautifier and formatter tool,CSS code formatter,CSS code style,improve CSS code readability,make CSS code more consistent,follow CSS code style guidelines,free CSS beautifier and formatter,no download required,supports all CSS features,easy to use,customizable settings,CSS code style guide,CSS code formatting errors';
const relatedTools = [src_environments_tools_directory_config__WEBPACK_IMPORTED_MODULE_1__.ApplicationIds.JSON_FORMATTER, src_environments_tools_directory_config__WEBPACK_IMPORTED_MODULE_1__.ApplicationIds.JSON_VIEWER, src_environments_tools_directory_config__WEBPACK_IMPORTED_MODULE_1__.ApplicationIds.JS_FORMATTER, src_environments_tools_directory_config__WEBPACK_IMPORTED_MODULE_1__.ApplicationIds.HTML_FORMATTER];
const componentConfig = {
  mainHeading: 'Free Online CSS Beautifier and Formatter: Beautify and Format Your CSS Code with Ease',
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
  heading: 'What is a CSS Beautifier and Formatter?',
  blockData: ['A CSS beautifier and formatter is a tool that takes your CSS code and formats it in a consistent and readable style. This can make your code easier to read, understand, and maintain.']
}, {
  heading: 'Why Use a CSS Beautifier and Formatter?',
  listData: ['To improve the readability of your code. Well-formatted code is easier to read and understand, which can help you to write better code and to debug your code more easily.', 'To make your code more consistent. A CSS beautifier and formatter can help you to format your code in a consistent style, which can make your code more readable and maintainable.', 'To follow code style guidelines. Many companies have code style guidelines that they require their developers to follow. A CSS beautifier and formatter can help you to format your code in accordance with these guidelines.']
}, {
  heading: 'Features of Our Online CSS Beautifier and Formatter Tool',
  listData: ['Free to use. No need to pay or sign up for an account.', 'No download required. Beautify and format your CSS code directly from your web browser.', 'Supports all CSS features. Our beautifier and formatter supports all the features of the CSS language, including CSS3 and CSS4.', 'Easy to use. Simply paste your CSS code into the editor and click the "Beautify and Format" button.', 'Customizable settings. You can customize the settings of our beautifier and formatter to match your personal preferences.']
}, {
  heading: 'How to Use Our Online CSS Beautifier and Formatter Tool',
  listData: ['Go to our website and paste your CSS code into the editor.', 'Click the "Beautify and Format" button.', 'View your beautified and formatted CSS code in the sidebar.', 'Copy and paste your beautified and formatted CSS code into your project.']
}, {
  heading: 'Tips for Using a CSS Beautifier and Formatter',
  listData: ['Use a consistent code style. Choose a code style and use it consistently throughout your project. This will make your code more readable and maintainable.', 'Format your code before you commit it to a repository. This will help to ensure that your code is readable and maintainable for other developers.', 'Use a CSS beautifier and formatter to check for formatting errors. A CSS beautifier and formatter can help you to identify and fix formatting errors in your code.']
}, {
  blockData: ['Our free online CSS beautifier and formatter tool is a great way to beautify and format your CSS code with ease. It is easy to use and supports all the features of the CSS language. With our beautifier and formatter, you can improve the readability, consistency, and maintainability of your CSS code.']
}];

/***/ })

}]);
//# sourceMappingURL=src_app_modules_css-formatter_css-formatter_module_ts.7766be758cdc0530.js.map