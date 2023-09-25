"use strict";
exports.id = 663;
exports.ids = [663];
exports.modules = {

/***/ 67455:
/*!*******************************************************************!*\
  !*** ./src/app/modules/json-viewer/json-viewer-routing.module.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   JsonViewerRoutingModule: () => (/* binding */ JsonViewerRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 68804);
/* harmony import */ var _json_viewer_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./json-viewer.component */ 74575);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 59936);




const routes = [{
  path: '',
  component: _json_viewer_component__WEBPACK_IMPORTED_MODULE_0__.JsonViewerComponent
}];
let JsonViewerRoutingModule = /*#__PURE__*/(() => {
  var _class;
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
  return JsonViewerRoutingModule;
})();
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](JsonViewerRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
})();

/***/ }),

/***/ 74575:
/*!**************************************************************!*\
  !*** ./src/app/modules/json-viewer/json-viewer.component.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   JsonViewerComponent: () => (/* binding */ JsonViewerComponent)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 34228);
/* harmony import */ var src_environments_component_config_json_viewer_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/environments/component-config/json-viewer/config */ 59171);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 59936);
/* harmony import */ var _angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/cdk/clipboard */ 85831);
/* harmony import */ var ngx_json_viewer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-json-viewer */ 93869);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/icon */ 59049);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/button */ 63490);









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
let JsonViewerComponent = /*#__PURE__*/(() => {
  var _class;
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
  return JsonViewerComponent;
})();

/***/ }),

/***/ 43663:
/*!***********************************************************!*\
  !*** ./src/app/modules/json-viewer/json-viewer.module.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   JsonViewerModule: () => (/* binding */ JsonViewerModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 34228);
/* harmony import */ var _json_viewer_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./json-viewer-routing.module */ 67455);
/* harmony import */ var _json_viewer_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./json-viewer.component */ 74575);
/* harmony import */ var ngx_json_viewer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-json-viewer */ 93869);
/* harmony import */ var _angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/cdk/clipboard */ 85831);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/button */ 63490);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/icon */ 59049);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 59936);








let JsonViewerModule = /*#__PURE__*/(() => {
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
  return JsonViewerModule;
})();
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](JsonViewerModule, {
    declarations: [_json_viewer_component__WEBPACK_IMPORTED_MODULE_1__.JsonViewerComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _json_viewer_routing_module__WEBPACK_IMPORTED_MODULE_0__.JsonViewerRoutingModule, ngx_json_viewer__WEBPACK_IMPORTED_MODULE_4__.NgxJsonViewerModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__.MatIconModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_6__.MatButtonModule, _angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_7__.ClipboardModule]
  });
})();

/***/ }),

/***/ 59171:
/*!*****************************************************************!*\
  !*** ./src/environments/component-config/json-viewer/config.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   componentConfig: () => (/* binding */ componentConfig),
/* harmony export */   descriptionData: () => (/* binding */ descriptionData)
/* harmony export */ });
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/environments/environment */ 56316);
/* harmony import */ var src_environments_tools_directory_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/environments/tools-directory-config */ 12313);


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

/***/ }),

/***/ 12313:
/*!****************************************************!*\
  !*** ./src/environments/tools-directory-config.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

var _apps_json__WEBPACK_IMPORTED_MODULE_0___namespace_cache;
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ApplicationIds: () => (/* binding */ ApplicationIds),
/* harmony export */   applicationConfig: () => (/* binding */ applicationConfig)
/* harmony export */ });
/* harmony import */ var _apps_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./apps.json */ 27971);

var ApplicationIds = /*#__PURE__*/function (ApplicationIds) {
  ApplicationIds["VIDEO_CONVERTER"] = "videoconverter";
  ApplicationIds["SCREEN_RECORDER"] = "screenrecorder";
  ApplicationIds["TEXT_COMPARE"] = "textcompare";
  ApplicationIds["JWT_DECODER"] = "jwtdecoder";
  ApplicationIds["IMAGE_COMPRESSOR"] = "imagecompressor";
  ApplicationIds["JS_FORMATTER"] = "jsformatter";
  ApplicationIds["JSON_FORMATTER"] = "jsonformatter";
  ApplicationIds["HTML_FORMATTER"] = "htmlformatter";
  ApplicationIds["CSS_FORMATTER"] = "cssformatter";
  ApplicationIds["JSON_VIEWER"] = "jsonviewer";
  ApplicationIds["PASSWORD_GENERATOR"] = "passwordgenerator";
  ApplicationIds["BASE64_ENCODE"] = "base64encoder";
  ApplicationIds["BASE64_DECODE"] = "base64decoder";
  ApplicationIds["CRON_GENERATOR"] = "crongenerator";
  ApplicationIds["IMAGE_CROPPER"] = "imagecropper";
  ApplicationIds["UUID_VERSION1_GENERATOR"] = "uuidv1generator";
  ApplicationIds["UUID_VERSION4_GENERATOR"] = "uuidv4generator";
  ApplicationIds["GUID_GENERATOR"] = "guidgenerator";
  ApplicationIds["MARKDOWN_EDITOR"] = "markdowneditor";
  ApplicationIds["WORD_COUNTER"] = "wordcounter";
  ApplicationIds["QR_CODE_GENERATOR"] = "qrcodegenerator";
  return ApplicationIds;
}(ApplicationIds || {});
const appsConfigMap = new Map(Object.entries(/*#__PURE__*/ (_apps_json__WEBPACK_IMPORTED_MODULE_0___namespace_cache || (_apps_json__WEBPACK_IMPORTED_MODULE_0___namespace_cache = __webpack_require__.t(_apps_json__WEBPACK_IMPORTED_MODULE_0__, 2)))));
appsConfigMap.delete('default');
const applicationConfig = appsConfigMap;

/***/ }),

/***/ 93869:
/*!*******************************************************************!*\
  !*** ./node_modules/ngx-json-viewer/fesm2020/ngx-json-viewer.mjs ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NgxJsonViewerComponent: () => (/* binding */ NgxJsonViewerComponent),
/* harmony export */   NgxJsonViewerModule: () => (/* binding */ NgxJsonViewerModule)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 59936);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 34228);




function NgxJsonViewerComponent_section_1_div_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "div", 9);
  }
}
function NgxJsonViewerComponent_section_1_span_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const segment_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](segment_r1.description);
  }
}
function NgxJsonViewerComponent_section_1_section_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "section", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "ngx-json-viewer", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const segment_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("json", segment_r1.value)("expanded", ctx_r4.expanded)("depth", ctx_r4.depth)("_currentDepth", ctx_r4._currentDepth + 1);
  }
}
const _c0 = function (a1) {
  return ["segment", a1];
};
const _c1 = function (a1, a2) {
  return {
    "segment-main": true,
    "expandable": a1,
    "expanded": a2
  };
};
function NgxJsonViewerComponent_section_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "section", 2)(1, "section", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function NgxJsonViewerComponent_section_1_Template_section_click_1_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r8);
      const segment_r1 = restoredCtx.$implicit;
      const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r7.toggle(segment_r1));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, NgxJsonViewerComponent_section_1_div_2_Template, 1, 0, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "span", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "span", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, ": ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](7, NgxJsonViewerComponent_section_1_span_7_Template, 2, 1, "span", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](8, NgxJsonViewerComponent_section_1_section_8_Template, 2, 4, "section", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const segment_r1 = ctx.$implicit;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](6, _c0, "segment-type-" + segment_r1.type));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction2"](8, _c1, ctx_r0.isExpandable(segment_r1), segment_r1.expanded));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r0.isExpandable(segment_r1));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](segment_r1.key);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !segment_r1.expanded || !ctx_r0.isExpandable(segment_r1));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", segment_r1.expanded && ctx_r0.isExpandable(segment_r1));
  }
}
let NgxJsonViewerComponent = /*#__PURE__*/(() => {
  class NgxJsonViewerComponent {
    constructor() {
      this.expanded = true;
      this.depth = -1;
      this._currentDepth = 0;
      this.segments = [];
    }
    ngOnChanges() {
      this.segments = [];
      // remove cycles
      this.json = this.decycle(this.json);
      if (typeof this.json === 'object') {
        Object.keys(this.json).forEach(key => {
          this.segments.push(this.parseKeyValue(key, this.json[key]));
        });
      } else {
        this.segments.push(this.parseKeyValue(`(${typeof this.json})`, this.json));
      }
    }
    isExpandable(segment) {
      return segment.type === 'object' || segment.type === 'array';
    }
    toggle(segment) {
      if (this.isExpandable(segment)) {
        segment.expanded = !segment.expanded;
      }
    }
    parseKeyValue(key, value) {
      const segment = {
        key: key,
        value: value,
        type: undefined,
        description: '' + value,
        expanded: this.isExpanded()
      };
      switch (typeof segment.value) {
        case 'number':
          {
            segment.type = 'number';
            break;
          }
        case 'boolean':
          {
            segment.type = 'boolean';
            break;
          }
        case 'function':
          {
            segment.type = 'function';
            break;
          }
        case 'string':
          {
            segment.type = 'string';
            segment.description = '"' + segment.value + '"';
            break;
          }
        case 'undefined':
          {
            segment.type = 'undefined';
            segment.description = 'undefined';
            break;
          }
        case 'object':
          {
            // yea, null is object
            if (segment.value === null) {
              segment.type = 'null';
              segment.description = 'null';
            } else if (Array.isArray(segment.value)) {
              segment.type = 'array';
              segment.description = 'Array[' + segment.value.length + '] ' + JSON.stringify(segment.value);
            } else if (segment.value instanceof Date) {
              segment.type = 'date';
            } else {
              segment.type = 'object';
              segment.description = 'Object ' + JSON.stringify(segment.value);
            }
            break;
          }
      }
      return segment;
    }
    isExpanded() {
      return this.expanded && !(this.depth > -1 && this._currentDepth >= this.depth);
    }
    // https://github.com/douglascrockford/JSON-js/blob/master/cycle.js
    decycle(object) {
      const objects = new WeakMap();
      return function derez(value, path) {
        let old_path;
        let nu;
        if (typeof value === 'object' && value !== null && !(value instanceof Boolean) && !(value instanceof Date) && !(value instanceof Number) && !(value instanceof RegExp) && !(value instanceof String)) {
          old_path = objects.get(value);
          if (old_path !== undefined) {
            return {
              $ref: old_path
            };
          }
          objects.set(value, path);
          if (Array.isArray(value)) {
            nu = [];
            value.forEach(function (element, i) {
              nu[i] = derez(element, path + '[' + i + ']');
            });
          } else {
            nu = {};
            Object.keys(value).forEach(function (name) {
              nu[name] = derez(value[name], path + '[' + JSON.stringify(name) + ']');
            });
          }
          return nu;
        }
        return value;
      }(object, '$');
    }
  }
  NgxJsonViewerComponent.ɵfac = function NgxJsonViewerComponent_Factory(t) {
    return new (t || NgxJsonViewerComponent)();
  };
  NgxJsonViewerComponent.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
    type: NgxJsonViewerComponent,
    selectors: [["ngx-json-viewer"]],
    inputs: {
      json: "json",
      expanded: "expanded",
      depth: "depth",
      _currentDepth: "_currentDepth"
    },
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵNgOnChangesFeature"]],
    decls: 2,
    vars: 1,
    consts: [[1, "ngx-json-viewer"], [3, "ngClass", 4, "ngFor", "ngForOf"], [3, "ngClass"], [3, "ngClass", "click"], ["class", "toggler", 4, "ngIf"], [1, "segment-key"], [1, "segment-separator"], ["class", "segment-value", 4, "ngIf"], ["class", "children", 4, "ngIf"], [1, "toggler"], [1, "segment-value"], [1, "children"], [3, "json", "expanded", "depth", "_currentDepth"]],
    template: function NgxJsonViewerComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "section", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, NgxJsonViewerComponent_section_1_Template, 9, 11, "section", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.segments);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_1__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_1__.NgIf, NgxJsonViewerComponent],
    styles: ["@charset \"UTF-8\";.ngx-json-viewer[_ngcontent-%COMP%]{font-family:var(--ngx-json-font-family, monospace);font-size:var(--ngx-json-font-size, 1em);width:100%;height:100%;overflow:hidden;position:relative}.ngx-json-viewer[_ngcontent-%COMP%]   .segment[_ngcontent-%COMP%]{padding:2px;margin:1px 1px 1px 12px}.ngx-json-viewer[_ngcontent-%COMP%]   .segment[_ngcontent-%COMP%]   .segment-main[_ngcontent-%COMP%]{word-wrap:break-word}.ngx-json-viewer[_ngcontent-%COMP%]   .segment[_ngcontent-%COMP%]   .segment-main[_ngcontent-%COMP%]   .toggler[_ngcontent-%COMP%]{position:absolute;margin-left:-14px;margin-top:3px;font-size:.8em;line-height:1.2em;vertical-align:middle;color:var(--ngx-json-toggler, #787878)}.ngx-json-viewer[_ngcontent-%COMP%]   .segment[_ngcontent-%COMP%]   .segment-main[_ngcontent-%COMP%]   .toggler[_ngcontent-%COMP%]:after{display:inline-block;content:\"\\25ba\";transition:transform .1s ease-in}.ngx-json-viewer[_ngcontent-%COMP%]   .segment[_ngcontent-%COMP%]   .segment-main[_ngcontent-%COMP%]   .segment-key[_ngcontent-%COMP%]{color:var(--ngx-json-key, #4E187C)}.ngx-json-viewer[_ngcontent-%COMP%]   .segment[_ngcontent-%COMP%]   .segment-main[_ngcontent-%COMP%]   .segment-separator[_ngcontent-%COMP%]{color:var(--ngx-json-separator, #999)}.ngx-json-viewer[_ngcontent-%COMP%]   .segment[_ngcontent-%COMP%]   .segment-main[_ngcontent-%COMP%]   .segment-value[_ngcontent-%COMP%]{color:var(--ngx-json-value, #000)}.ngx-json-viewer[_ngcontent-%COMP%]   .segment[_ngcontent-%COMP%]   .children[_ngcontent-%COMP%]{margin-left:12px}.ngx-json-viewer[_ngcontent-%COMP%]   .segment-type-string[_ngcontent-%COMP%] > .segment-main[_ngcontent-%COMP%] > .segment-value[_ngcontent-%COMP%]{color:var(--ngx-json-string, #FF6B6B)}.ngx-json-viewer[_ngcontent-%COMP%]   .segment-type-number[_ngcontent-%COMP%] > .segment-main[_ngcontent-%COMP%] > .segment-value[_ngcontent-%COMP%]{color:var(--ngx-json-number, #009688)}.ngx-json-viewer[_ngcontent-%COMP%]   .segment-type-boolean[_ngcontent-%COMP%] > .segment-main[_ngcontent-%COMP%] > .segment-value[_ngcontent-%COMP%]{color:var(--ngx-json-boolean, #B938A4)}.ngx-json-viewer[_ngcontent-%COMP%]   .segment-type-date[_ngcontent-%COMP%] > .segment-main[_ngcontent-%COMP%] > .segment-value[_ngcontent-%COMP%]{color:var(--ngx-json-date, #05668D)}.ngx-json-viewer[_ngcontent-%COMP%]   .segment-type-array[_ngcontent-%COMP%] > .segment-main[_ngcontent-%COMP%] > .segment-value[_ngcontent-%COMP%]{color:var(--ngx-json-array, #999)}.ngx-json-viewer[_ngcontent-%COMP%]   .segment-type-object[_ngcontent-%COMP%] > .segment-main[_ngcontent-%COMP%] > .segment-value[_ngcontent-%COMP%]{color:var(--ngx-json-object, #999)}.ngx-json-viewer[_ngcontent-%COMP%]   .segment-type-function[_ngcontent-%COMP%] > .segment-main[_ngcontent-%COMP%] > .segment-value[_ngcontent-%COMP%]{color:var(--ngx-json-function, #999)}.ngx-json-viewer[_ngcontent-%COMP%]   .segment-type-null[_ngcontent-%COMP%] > .segment-main[_ngcontent-%COMP%] > .segment-value[_ngcontent-%COMP%]{color:var(--ngx-json-null, #fff)}.ngx-json-viewer[_ngcontent-%COMP%]   .segment-type-undefined[_ngcontent-%COMP%] > .segment-main[_ngcontent-%COMP%] > .segment-value[_ngcontent-%COMP%]{color:var(--ngx-json-undefined, #fff)}.ngx-json-viewer[_ngcontent-%COMP%]   .segment-type-null[_ngcontent-%COMP%] > .segment-main[_ngcontent-%COMP%] > .segment-value[_ngcontent-%COMP%]{background-color:var(--ngx-json-null-bg, red)}.ngx-json-viewer[_ngcontent-%COMP%]   .segment-type-undefined[_ngcontent-%COMP%] > .segment-main[_ngcontent-%COMP%] > .segment-key[_ngcontent-%COMP%]{color:var(--ngx-json-undefined-key, #999)}.ngx-json-viewer[_ngcontent-%COMP%]   .segment-type-undefined[_ngcontent-%COMP%] > .segment-main[_ngcontent-%COMP%] > .segment-value[_ngcontent-%COMP%]{background-color:var(--ngx-json-undefined-key, #999)}.ngx-json-viewer[_ngcontent-%COMP%]   .segment-type-object[_ngcontent-%COMP%] > .segment-main[_ngcontent-%COMP%], .ngx-json-viewer[_ngcontent-%COMP%]   .segment-type-array[_ngcontent-%COMP%] > .segment-main[_ngcontent-%COMP%]{white-space:nowrap}.ngx-json-viewer[_ngcontent-%COMP%]   .expanded[_ngcontent-%COMP%] > .toggler[_ngcontent-%COMP%]:after{transform:rotate(90deg)}.ngx-json-viewer[_ngcontent-%COMP%]   .expandable[_ngcontent-%COMP%], .ngx-json-viewer[_ngcontent-%COMP%]   .expandable[_ngcontent-%COMP%] > .toggler[_ngcontent-%COMP%]{cursor:pointer}"]
  });
  return NgxJsonViewerComponent;
})();
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
let NgxJsonViewerModule = /*#__PURE__*/(() => {
  class NgxJsonViewerModule {}
  NgxJsonViewerModule.ɵfac = function NgxJsonViewerModule_Factory(t) {
    return new (t || NgxJsonViewerModule)();
  };
  NgxJsonViewerModule.ɵmod = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
    type: NgxJsonViewerModule
  });
  NgxJsonViewerModule.ɵinj = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule]
  });
  return NgxJsonViewerModule;
})();
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();

/**
 * Generated bundle index. Do not edit.
 */



/***/ }),

/***/ 27971:
/*!************************************!*\
  !*** ./src/environments/apps.json ***!
  \************************************/
/***/ ((module) => {

module.exports = JSON.parse('{"xmltojson":{"applicationId":"xmltojson","displayText":"XML to JSON Converter","iconName":"xml-icon","navigateUrl":"/tools/xml-to-json","iconRelativeUrl":"xml.svg"},"qrcodegenerator":{"applicationId":"qrcodegenerator","displayText":"QR Code Generator","iconName":"qr-code","navigateUrl":"/tools/qr-code-generator","iconRelativeUrl":"qr-code.svg"},"wordcounter":{"applicationId":"wordcounter","displayText":"Word Counter","iconName":"word-icon","navigateUrl":"/tools/word-counter","iconRelativeUrl":"word.svg"},"textcompare":{"applicationId":"textcompare","displayText":"Online Text Compare","iconName":"comparison-icon","navigateUrl":"/tools/text-compare","iconRelativeUrl":"comparison.svg"},"markdowneditor":{"applicationId":"markdowneditor","displayText":"Markdown Editor","iconName":"markdown-icon","navigateUrl":"/tools/markdown-editor","iconRelativeUrl":"markdown.svg"},"passwordgenerator":{"applicationId":"passwordgenerator","displayText":"Random Password Generator","iconName":"password-icon","navigateUrl":"/tools/password-generator","iconRelativeUrl":"password.svg"},"videoconverter":{"applicationId":"videoconverter","displayText":"Video to Audio Converter","iconName":"video-convert-icon","navigateUrl":"/tools/video-converter","iconRelativeUrl":"video-convert.svg"},"screenrecorder":{"applicationId":"screenrecorder","displayText":"Free Screen Recorder","iconName":"screen-icon","navigateUrl":"/tools/screen-recorder","iconRelativeUrl":"screen.svg"},"imagecompressor":{"applicationId":"imagecompressor","displayText":"Free Image Compressor","iconName":"image-icon","navigateUrl":"/tools/image-compress","iconRelativeUrl":"image-icon.svg"},"imagecropper":{"applicationId":"imagecropper","displayText":"Free Image Cropper","iconName":"image-icon","navigateUrl":"/tools/crop-image","iconRelativeUrl":"image-icon.svg"},"jwtdecoder":{"applicationId":"jwtdecoder","displayText":"JWT Decoder","iconName":"jwt-icon","navigateUrl":"/tools/jwt","iconRelativeUrl":"jwt-icon.svg"},"jsformatter":{"applicationId":"jsformatter","displayText":"Online Javascript Formatter","iconName":"js-icon","navigateUrl":"/tools/js-formatter","iconRelativeUrl":"js-icon.svg"},"jsonformatter":{"applicationId":"jsonformatter","displayText":"Online JSON Formatter","iconName":"json-icon","navigateUrl":"/tools/json-formatter","iconRelativeUrl":"json-icon.svg"},"jsonviewer":{"applicationId":"jsonviewer","displayText":"Online JSON Viewer","iconName":"json-icon","navigateUrl":"/tools/json-viewer","iconRelativeUrl":"json-icon.svg"},"htmlformatter":{"applicationId":"htmlformatter","displayText":"Online HTML Formatter","iconName":"html-icon","navigateUrl":"/tools/html-formatter","iconRelativeUrl":"html.svg"},"cssformatter":{"applicationId":"cssformatter","displayText":"Online CSS Formatter","iconName":"css-icon","navigateUrl":"/tools/css-formatter","iconRelativeUrl":"css.svg"},"base64encoder":{"applicationId":"base64encoder","displayText":"Base64 Encoder","iconName":"file-encode-icon","navigateUrl":"/tools/base64-encode","iconRelativeUrl":"file-encode.svg"},"base64decoder":{"applicationId":"base64decoder","displayText":"Base64 Decoder","iconName":"file-decode-icon","navigateUrl":"/tools/base64-decode","iconRelativeUrl":"file-decode.svg"},"crongenerator":{"applicationId":"crongenerator","displayText":"Cron Expression Generator","iconName":"cron-icon","navigateUrl":"/tools/cron-expression","iconRelativeUrl":"cron.svg"},"uuidv4generator":{"applicationId":"uuidv4generator","displayText":"UUID V4 Generator","iconName":"uuid-icon","navigateUrl":"/tools/uuid-v4-generator","iconRelativeUrl":"uuid-icon.svg"},"uuidv1generator":{"applicationId":"uuidv1generator","displayText":"UUID V1 Generator","iconName":"uuid-icon","navigateUrl":"/tools/uuid-v1-generator","iconRelativeUrl":"uuid-icon.svg"},"guidgenerator":{"applicationId":"guidgenerator","displayText":"GUID Generator","iconName":"uuid-icon","navigateUrl":"/tools/guid-generator","iconRelativeUrl":"uuid-icon.svg"}}');

/***/ })

};
;
//# sourceMappingURL=663.js.map