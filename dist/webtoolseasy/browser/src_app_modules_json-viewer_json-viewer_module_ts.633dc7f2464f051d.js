"use strict";
(self["webpackChunkwebtoolseasy"] = self["webpackChunkwebtoolseasy"] || []).push([["src_app_modules_json-viewer_json-viewer_module_ts"],{

/***/ 4499:
/*!*******************************************************************!*\
  !*** ./src/app/modules/json-viewer/json-viewer-routing.module.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   JsonViewerRoutingModule: () => (/* binding */ JsonViewerRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 7947);
/* harmony import */ var _json_viewer_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./json-viewer.component */ 8639);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 1699);
var _class;




const routes = [{
  path: '',
  component: _json_viewer_component__WEBPACK_IMPORTED_MODULE_0__.JsonViewerComponent
}];
class JsonViewerRoutingModule {}
_class = JsonViewerRoutingModule;
_class.ɵfac = function JsonViewerRoutingModule_Factory(t) {
  return new (t || _class)();
};
_class.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
  type: _class
});
_class.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](JsonViewerRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
})();

/***/ }),

/***/ 8639:
/*!**************************************************************!*\
  !*** ./src/app/modules/json-viewer/json-viewer.component.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   JsonViewerComponent: () => (/* binding */ JsonViewerComponent)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var src_environments_component_config_json_viewer_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/environments/component-config/json-viewer/config */ 7868);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/cdk/clipboard */ 4362);
/* harmony import */ var ngx_json_viewer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-json-viewer */ 2335);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/icon */ 6515);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/button */ 895);
var _class;









const _c0 = ["text1AreaContent"];
const _c1 = ["text2AreaContent"];
function JsonViewerComponent_div_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 12)(1, "mat-icon", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "error");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "span", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4, "json is invalid");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
}
class JsonViewerComponent {
  constructor(renderer, document, clipboard) {
    this.renderer = renderer;
    this.document = document;
    this.clipboard = clipboard;
    this.isJsonValid = true;
    this.rawJson = `{"role":"admin","issuer":"online json viewer","username":"username@webtoolseasy.com","exp":1668942423,"iat":1668942423,"colors":{"primary":"indigo","warn":"red","accent":"pink"}}`;
    this.tabSpaceValue = '   ';
    this.formattedJSON = JSON.parse(this.rawJson);
    this.applicationConfig = src_environments_component_config_json_viewer_config__WEBPACK_IMPORTED_MODULE_0__.componentConfig;
    this.descriptionData = src_environments_component_config_json_viewer_config__WEBPACK_IMPORTED_MODULE_0__.descriptionData;
  }
  ngAfterViewInit() {
    this.updateRawJson(this.rawJson);
  }
  rawJsonChange() {
    this.formatJson(this.text1AreaContent.nativeElement.innerText);
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
      this.isJsonValid = true;
      this.updateJsonTree(rawJsonValue);
    } catch (error) {
      this.isJsonValid = false;
    }
  }
  updateRawJson(rawJson) {
    this.renderer.setProperty(this.text1AreaContent.nativeElement, 'innerText', rawJson);
  }
  updateJsonTree(formattedJson) {
    this.formattedJSON = JSON.parse(formattedJson);
    this.document.getElementsByTagName('ngx-json-viewer')[0].firstChild.style['overflow-y'] = 'scroll';
  }
  copyFormattedJson() {
    this.clipboard.copy(JSON.stringify(this.text2AreaContent.json, null, this.tabSpaceValue));
  }
  onEncodedDivClick() {
    this.text1AreaContent.nativeElement.focus();
  }
}
_class = JsonViewerComponent;
_class.ɵfac = function JsonViewerComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.Renderer2), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_2__.DOCUMENT), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_3__.Clipboard));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["app-json-viewer"]],
  viewQuery: function JsonViewerComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵviewQuery"](_c0, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵviewQuery"](_c1, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵloadQuery"]()) && (ctx.text1AreaContent = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵloadQuery"]()) && (ctx.text2AreaContent = _t.first);
    }
  },
  decls: 19,
  vars: 3,
  consts: [[1, "flex-display", "flex-column-flow", "flex-align-center", "flex-gap-medium"], [1, "flex-display", "flex-row-flow", "flex-align-center", "text-area-container", "full-width", "flex-gap-large"], [1, "flex-display", "flex-column-flow", "text-area-div", "flex-gap-medium"], [1, "div-label"], [1, "text-content-div", "y-scroll", "full-height", "full-width", "border-grey", 2, "color", "indigo", 3, "click"], ["contenteditable", "true", 1, "full-height", "full-width", 3, "input", "paste"], ["text1AreaContent", ""], ["class", "flex-display flex-row-flow flex-gap-medium", "s", "", 4, "ngIf"], [1, "text-content-div", "y-scroll", "full-height", "full-width", "border-grey"], [3, "json", "expanded"], ["text2AreaContent", ""], ["mat-stroked-button", "", "color", "primary", 2, "align-self", "flex-end", 3, "click"], ["s", "", 1, "flex-display", "flex-row-flow", "flex-gap-medium"], ["color", "warn", 2, "transform", "scale(2)"], [1, "header-font", 2, "color", "red"]],
  template: function JsonViewerComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "span", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4, "JSON (Paste JSON Here)");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "div", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function JsonViewerComponent_Template_div_click_5_listener() {
        return ctx.onEncodedDivClick();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "span", 5, 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("input", function JsonViewerComponent_Template_span_input_6_listener() {
        return ctx.rawJsonChange();
      })("paste", function JsonViewerComponent_Template_span_paste_6_listener($event) {
        return ctx.onJsonPaste($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](8, JsonViewerComponent_div_8_Template, 5, 0, "div", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "div", 2)(10, "span", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](11, "Formatted JSON");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "div", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](13, "ngx-json-viewer", 9, 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](15, "button", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function JsonViewerComponent_Template_button_click_15_listener() {
        return ctx.copyFormattedJson();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](16, "mat-icon");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](17, "content_copy");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](18, " Copy Formatted JSON ");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](8);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx.isJsonValid);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("json", ctx.formattedJSON)("expanded", true);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.NgIf, ngx_json_viewer__WEBPACK_IMPORTED_MODULE_4__.NgxJsonViewerComponent, _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__.MatIcon, _angular_material_button__WEBPACK_IMPORTED_MODULE_6__.MatButton],
  styles: [".div-label[_ngcontent-%COMP%] {\n  font-size: large;\n}\n\n.text-area-div[_ngcontent-%COMP%] {\n  width: 49%;\n  height: 40em;\n}\n\n.text-content-div[_ngcontent-%COMP%] {\n  border-radius: 10px;\n}\n\n.text-area-container[_ngcontent-%COMP%] {\n  justify-content: space-around;\n}\n\n[contenteditable][_ngcontent-%COMP%]:focus {\n  outline: 0px solid transparent;\n}\n\nngx-json-viewer[_ngcontent-%COMP%]   section[_ngcontent-%COMP%] {\n  overflow-y: scroll;\n}\n\n@media screen and (max-width: 735px) {\n  .text-area-div[_ngcontent-%COMP%] {\n    height: 25em;\n    width: 100%;\n  }\n  .text-area-container[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvbW9kdWxlcy9qc29uLXZpZXdlci9qc29uLXZpZXdlci5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGdCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxVQUFBO0VBQ0EsWUFBQTtBQUNGOztBQUVBO0VBQ0UsbUJBQUE7QUFDRjs7QUFFQTtFQUNFLDZCQUFBO0FBQ0Y7O0FBRUE7RUFDRSw4QkFBQTtBQUNGOztBQUVBO0VBQ0Usa0JBQUE7QUFDRjs7QUFFQTtFQUNFO0lBQ0UsWUFBQTtJQUNBLFdBQUE7RUFDRjtFQUNBO0lBQ0Usc0JBQUE7RUFDRjtBQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLmRpdi1sYWJlbCB7XG4gIGZvbnQtc2l6ZTogbGFyZ2U7XG59XG5cbi50ZXh0LWFyZWEtZGl2IHtcbiAgd2lkdGg6IDQ5JTtcbiAgaGVpZ2h0OiA0MGVtO1xufVxuXG4udGV4dC1jb250ZW50LWRpdiB7XG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XG59XG5cbi50ZXh0LWFyZWEtY29udGFpbmVyIHtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XG59XG5cbltjb250ZW50ZWRpdGFibGVdOmZvY3VzIHtcbiAgb3V0bGluZTogMHB4IHNvbGlkIHRyYW5zcGFyZW50O1xufVxuXG5uZ3gtanNvbi12aWV3ZXIgc2VjdGlvbiB7XG4gIG92ZXJmbG93LXk6IHNjcm9sbDtcbn1cblxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogNzM1cHgpIHtcbiAgLnRleHQtYXJlYS1kaXYge1xuICAgIGhlaWdodDogMjVlbTtcbiAgICB3aWR0aDogMTAwJTtcbiAgfVxuICAudGV4dC1hcmVhLWNvbnRhaW5lciB7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ }),

/***/ 7828:
/*!***********************************************************!*\
  !*** ./src/app/modules/json-viewer/json-viewer.module.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   JsonViewerModule: () => (/* binding */ JsonViewerModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _json_viewer_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./json-viewer-routing.module */ 4499);
/* harmony import */ var _json_viewer_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./json-viewer.component */ 8639);
/* harmony import */ var ngx_json_viewer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-json-viewer */ 2335);
/* harmony import */ var _angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/cdk/clipboard */ 4362);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/button */ 895);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/icon */ 6515);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 1699);
var _class;








class JsonViewerModule {}
_class = JsonViewerModule;
_class.ɵfac = function JsonViewerModule_Factory(t) {
  return new (t || _class)();
};
_class.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
  type: _class
});
_class.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _json_viewer_routing_module__WEBPACK_IMPORTED_MODULE_0__.JsonViewerRoutingModule, ngx_json_viewer__WEBPACK_IMPORTED_MODULE_4__.NgxJsonViewerModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__.MatIconModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_6__.MatButtonModule, _angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_7__.ClipboardModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](JsonViewerModule, {
    declarations: [_json_viewer_component__WEBPACK_IMPORTED_MODULE_1__.JsonViewerComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _json_viewer_routing_module__WEBPACK_IMPORTED_MODULE_0__.JsonViewerRoutingModule, ngx_json_viewer__WEBPACK_IMPORTED_MODULE_4__.NgxJsonViewerModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__.MatIconModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_6__.MatButtonModule, _angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_7__.ClipboardModule]
  });
})();

/***/ }),

/***/ 7868:
/*!*****************************************************************!*\
  !*** ./src/environments/component-config/json-viewer/config.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   componentConfig: () => (/* binding */ componentConfig),
/* harmony export */   descriptionData: () => (/* binding */ descriptionData)
/* harmony export */ });
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/environments/environment */ 553);
/* harmony import */ var src_environments_tools_directory_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/environments/tools-directory-config */ 6636);


const navigationUrl = '/tools/json-viewer';
const pageTitle = 'Free Online JSON Viewer: View Your JSON in a Tree Structure';
const pageDescription = 'View your JSON data in a tree structure with our free online JSON viewer tool. No download required, no sign-up required.';
const imageUrl = `${src_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.screenshotsBaseUrl}/json-viewer.png`;
const keywords = 'online JSON viewer,view JSON data,JSON tree structure,JSON data tree,JSON data viewer,JSON viewer tool,free JSON viewer,no download required,supports all JSON features,easy to use,customizable settings,JSON beautifier,JSON formatter,expand and collapse,search JSON data';
const relatedTools = [src_environments_tools_directory_config__WEBPACK_IMPORTED_MODULE_1__.ApplicationIds.JSON_FORMATTER, src_environments_tools_directory_config__WEBPACK_IMPORTED_MODULE_1__.ApplicationIds.JS_FORMATTER, src_environments_tools_directory_config__WEBPACK_IMPORTED_MODULE_1__.ApplicationIds.HTML_FORMATTER, src_environments_tools_directory_config__WEBPACK_IMPORTED_MODULE_1__.ApplicationIds.CSS_FORMATTER];
const componentConfig = {
  mainHeading: 'Free Online JSON Viewer: View Your JSON in a Tree Structure',
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
  heading: 'What is a JSON Viewer?',
  blockData: ['A JSON viewer is a tool that allows you to view JSON data in a human-readable format. JSON viewers typically display JSON data in a tree structure, which makes it easier to read and understand.']
}, {
  heading: 'Why Use a JSON Viewer?',
  listData: ['To make JSON data more readable. JSON data is often stored in a single line of text, which can make it difficult to read and understand. A JSON viewer can display JSON data in a tree structure, which makes it much easier to read and understand.', 'To debug JSON data. If you are having trouble with your JSON data, a JSON viewer can help you to identify the problem. JSON viewers typically display error messages and warnings, which can help you to fix the problem.', 'To learn more about JSON. JSON is a powerful data format, but it can be difficult to learn. A JSON viewer can help you to learn more about JSON by displaying the data in a visual format.']
}, {
  heading: 'Features of Our Online JSON Viewer Tool',
  listData: ['Free to use. No need to pay or sign up for an account.', 'No download required. View your JSON data directly from your web browser.', 'Supports all JSON features. Our JSON viewer supports all the features of the JSON language, including JSON5 and JSON Schema.', 'Easy to use. Simply paste your JSON data into the editor and click the "View JSON" button.', 'Customizable settings. You can customize the settings of our JSON viewer to match your personal preferences.']
}, {
  heading: 'How to Use Our Online JSON Viewer Tool',
  listData: ['Go to our website and paste your JSON data into the editor.', 'Click the "View JSON" button.', 'View your JSON data in a tree structure in the sidebar.', 'Expand and collapse the nodes of the tree structure to view the data in more detail.']
}, {
  heading: 'Tips for Using a JSON Viewer',
  listData: ['Use a JSON beautifier and formatter to format your JSON data before you view it in a JSON viewer. This will make it easier to read and understand your JSON data.', 'Use the expand and collapse features of the tree structure to view your JSON data in more detail.', 'Use the search feature of the JSON viewer to search for specific values in your JSON data.']
}, {
  blockData: ['Our free online JSON viewer tool is a great way to view your JSON data in a tree structure. It is easy to use and supports all the features of the JSON language. With our JSON viewer, you can easily read and understand your JSON data, debug problems, and learn more about the JSON language.']
}];

/***/ })

}]);
//# sourceMappingURL=src_app_modules_json-viewer_json-viewer_module_ts.633dc7f2464f051d.js.map