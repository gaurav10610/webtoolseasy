"use strict";
(self["webpackChunkwebtoolseasy"] = self["webpackChunkwebtoolseasy"] || []).push([["src_app_modules_base64-encode_base64-encode_module_ts"],{

/***/ 5237:
/*!***********************************************************************!*\
  !*** ./src/app/modules/base64-encode/base64-encode-routing.module.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Base64EncodeRoutingModule: () => (/* binding */ Base64EncodeRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 7947);
/* harmony import */ var _base64_encode_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base64-encode.component */ 2277);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 1699);
var _class;




const routes = [{
  path: '',
  component: _base64_encode_component__WEBPACK_IMPORTED_MODULE_0__.Base64EncodeComponent
}];
class Base64EncodeRoutingModule {}
_class = Base64EncodeRoutingModule;
_class.ɵfac = function Base64EncodeRoutingModule_Factory(t) {
  return new (t || _class)();
};
_class.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
  type: _class
});
_class.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](Base64EncodeRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
})();

/***/ }),

/***/ 2277:
/*!******************************************************************!*\
  !*** ./src/app/modules/base64-encode/base64-encode.component.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Base64EncodeComponent: () => (/* binding */ Base64EncodeComponent)
/* harmony export */ });
/* harmony import */ var _Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 1670);
/* harmony import */ var src_environments_component_config_base64_encode_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/environments/component-config/base64-encode/config */ 4293);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/cdk/clipboard */ 4362);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/icon */ 6515);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/button */ 895);
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/card */ 8497);

var _class;







const _c0 = ["inputFiles"];
function Base64EncodeComponent_div_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 8)(1, "div", 9)(2, "button", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function Base64EncodeComponent_div_14_Template_button_click_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r3);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r2.copyBase64Data("uri"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3, " Copy Base64 Data URI ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "button", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function Base64EncodeComponent_div_14_Template_button_click_4_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r3);
      const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r4.copyBase64Data("base64"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5, " Copy Base64 ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "mat-card", 12)(7, "mat-card-header", 13)(8, "mat-card-title")(9, "h3", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](10, " Base64 Data ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](11, "mat-card-content", 15)(12, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](13);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](13);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", ctx_r1.base64Data, " ");
  }
}
class Base64EncodeComponent {
  constructor(renderer, clipboard) {
    this.renderer = renderer;
    this.clipboard = clipboard;
    this.applicationConfig = src_environments_component_config_base64_encode_config__WEBPACK_IMPORTED_MODULE_1__.componentConfig;
    this.descriptionData = src_environments_component_config_base64_encode_config__WEBPACK_IMPORTED_MODULE_1__.descriptionData;
  }
  openFileDialog() {
    var _this = this;
    return (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this.renderer.selectRootElement(_this.inputFiles.nativeElement, true).click();
    })();
  }
  selectFiles(event) {
    var _this2 = this;
    return (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this2.encodeFileToBase64(event.target.files[0]);
    })();
  }
  /**
   * file drop event handler
   * @param event
   */
  dropHandler(event) {
    var _this3 = this;
    return (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      // Prevent default behavior (Prevent file from being opened)
      event.preventDefault();
      if (event.dataTransfer.items) {
        // Use DataTransferItemList interface to access the file(s)
        [...event.dataTransfer.items].filter(item => item.kind === 'file').map(item => item.getAsFile()).forEach(file => _this3.encodeFileToBase64(file));
      } else {
        // Use DataTransfer interface to access the file(s)
        [...event.dataTransfer.files].forEach(file => _this3.encodeFileToBase64(file));
      }
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
  /**
   * encode file to base64
   * @param file
   */
  encodeFileToBase64(file) {
    const fileReader = new FileReader();
    fileReader.addEventListener('load', () => {
      this.base64Data = fileReader.result;
    }, false);
    fileReader.readAsDataURL(file);
  }
  /**
   * copy base64 data
   * @param type
   */
  copyBase64Data(type) {
    if (type === 'base64') {
      this.clipboard.copy(this.base64Data?.split(',').pop());
    } else if (type === 'uri') {
      this.clipboard.copy(this.base64Data);
    }
  }
}
_class = Base64EncodeComponent;
_class.ɵfac = function Base64EncodeComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__.Renderer2), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_3__.Clipboard));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["app-base64-encode"]],
  viewQuery: function Base64EncodeComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵviewQuery"](_c0, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵloadQuery"]()) && (ctx.inputFiles = _t.first);
    }
  },
  decls: 15,
  vars: 1,
  consts: [[1, "flex-display", "flex-column-flow", "flex-align-center", "flex-gap-large"], ["type", "file", 2, "display", "none", 3, "change"], ["inputFiles", ""], [1, "flex-display", "flex-column-flow", "flex-center", "flex-align-center", "file-drop-area", "div-border", "border-grey", "full-width", "flex-gap-medium", 3, "drop", "dragover"], [2, "transform", "scale(2)"], [1, "header-font", 2, "font-size", "large"], ["mat-stroked-button", "", "color", "primary", "matTooltip", "select file to encode", 3, "click"], ["class", "full-width flex-display flex-column-flow flex-gap-medium", 4, "ngIf"], [1, "full-width", "flex-display", "flex-column-flow", "flex-gap-medium"], [1, "flex-display", 2, "justify-content", "flex-end"], ["mat-stroked-button", "", "color", "accent", 1, "copy-button", 3, "click"], ["mat-stroked-button", "", "color", "accent", 3, "click"], [2, "border", "1px solid lightgrey"], [1, "data-heading"], [2, "font-size", "90%", "font-weight", "700"], [1, "y-scroll", 2, "max-height", "200px"], [2, "overflow-wrap", "anywhere"]],
  template: function Base64EncodeComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0)(1, "input", 1, 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("change", function Base64EncodeComponent_Template_input_change_1_listener($event) {
        return ctx.selectFiles($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "div", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("drop", function Base64EncodeComponent_Template_div_drop_3_listener($event) {
        return ctx.dropHandler($event);
      })("dragover", function Base64EncodeComponent_Template_div_dragover_3_listener($event) {
        return ctx.dragOverHandler($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "mat-icon", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5, "collections");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "span", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](7, "Drag & drop file here");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](8, "span", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](9, "or");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](10, "button", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function Base64EncodeComponent_Template_button_click_10_listener() {
        return ctx.openFileDialog();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](11, "mat-icon");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](12, "file_upload");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](13, " Browse for file ");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](14, Base64EncodeComponent_div_14_Template, 14, 1, "div", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](14);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.base64Data !== undefined);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.NgIf, _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__.MatIcon, _angular_material_button__WEBPACK_IMPORTED_MODULE_6__.MatButton, _angular_material_card__WEBPACK_IMPORTED_MODULE_7__.MatCard, _angular_material_card__WEBPACK_IMPORTED_MODULE_7__.MatCardContent, _angular_material_card__WEBPACK_IMPORTED_MODULE_7__.MatCardHeader, _angular_material_card__WEBPACK_IMPORTED_MODULE_7__.MatCardTitle],
  styles: [".file-drop-area[_ngcontent-%COMP%] {\n  padding-top: 30px;\n  padding-bottom: 30px;\n}\n\n.div-border[_ngcontent-%COMP%] {\n  border-radius: 10px;\n}\n\n.base64-data[_ngcontent-%COMP%] {\n  flex-direction: column;\n}\n\n.copy-button[_ngcontent-%COMP%] {\n  margin-right: 10px;\n}\n\n.data-heading[_ngcontent-%COMP%] {\n  border-bottom: 1px solid lightgrey;\n  background: whitesmoke;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvbW9kdWxlcy9iYXNlNjQtZW5jb2RlL2Jhc2U2NC1lbmNvZGUuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxpQkFBQTtFQUNBLG9CQUFBO0FBQ0Y7O0FBRUE7RUFDRSxtQkFBQTtBQUNGOztBQUVBO0VBQ0Usc0JBQUE7QUFDRjs7QUFFQTtFQUNFLGtCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxrQ0FBQTtFQUNBLHNCQUFBO0FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIuZmlsZS1kcm9wLWFyZWEge1xuICBwYWRkaW5nLXRvcDogMzBweDtcbiAgcGFkZGluZy1ib3R0b206IDMwcHg7XG59XG5cbi5kaXYtYm9yZGVyIHtcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcbn1cblxuLmJhc2U2NC1kYXRhIHtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbn1cblxuLmNvcHktYnV0dG9uIHtcbiAgbWFyZ2luLXJpZ2h0OiAxMHB4O1xufVxuXG4uZGF0YS1oZWFkaW5nIHtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIGxpZ2h0Z3JleTtcbiAgYmFja2dyb3VuZDogd2hpdGVzbW9rZTtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
});

/***/ }),

/***/ 3620:
/*!***************************************************************!*\
  !*** ./src/app/modules/base64-encode/base64-encode.module.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Base64EncodeModule: () => (/* binding */ Base64EncodeModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _base64_encode_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base64-encode-routing.module */ 5237);
/* harmony import */ var _base64_encode_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./base64-encode.component */ 2277);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/button */ 895);
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/card */ 8497);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/icon */ 6515);
/* harmony import */ var _angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/cdk/clipboard */ 4362);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 1699);
var _class;








class Base64EncodeModule {}
_class = Base64EncodeModule;
_class.ɵfac = function Base64EncodeModule_Factory(t) {
  return new (t || _class)();
};
_class.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
  type: _class
});
_class.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _base64_encode_routing_module__WEBPACK_IMPORTED_MODULE_0__.Base64EncodeRoutingModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__.MatIconModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_5__.MatButtonModule, _angular_material_card__WEBPACK_IMPORTED_MODULE_6__.MatCardModule, _angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_7__.ClipboardModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](Base64EncodeModule, {
    declarations: [_base64_encode_component__WEBPACK_IMPORTED_MODULE_1__.Base64EncodeComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _base64_encode_routing_module__WEBPACK_IMPORTED_MODULE_0__.Base64EncodeRoutingModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__.MatIconModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_5__.MatButtonModule, _angular_material_card__WEBPACK_IMPORTED_MODULE_6__.MatCardModule, _angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_7__.ClipboardModule]
  });
})();

/***/ }),

/***/ 4293:
/*!*******************************************************************!*\
  !*** ./src/environments/component-config/base64-encode/config.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   componentConfig: () => (/* binding */ componentConfig),
/* harmony export */   descriptionData: () => (/* binding */ descriptionData)
/* harmony export */ });
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/environments/environment */ 553);
/* harmony import */ var src_environments_tools_directory_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/environments/tools-directory-config */ 6636);


const navigationUrl = '/tools/base64-encode';
const pageTitle = 'File to Base64 Encoder: Convert Any File to Base64';
const pageDescription = 'Convert any file to Base64 with ease with our free online file to Base64 encoder tool. Image, Text, PDF or File to Base64.';
const imageUrl = `${src_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.screenshotsBaseUrl}/base64-encode.png`;
const keywords = 'online file to Base64 encoder,convert file to Base64,file to Base64 encoder tool,Base64 encoding,Base64 decoding,Base64 secure,Base64 transmission,Base64 storage,free file to Base64 encoder,no download required,supports all file formats,easy to use,customizable settings,Base64 encoding scheme,store encoded data securely,image to Base64,text to Base64,pdf to Base64';
const relatedTools = [src_environments_tools_directory_config__WEBPACK_IMPORTED_MODULE_1__.ApplicationIds.BASE64_DECODE];
const componentConfig = {
  mainHeading: 'Free Online File to Base64 Encoder: Convert Image, Text, PDF and File to Base64',
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
  relatedTools: relatedTools.map(tool => src_environments_tools_directory_config__WEBPACK_IMPORTED_MODULE_1__.applicationConfig.get(tool)),
  icons: [{
    iconName: 'file-decode-icon',
    iconRelativeUrl: 'file-decode.svg'
  }]
};
const descriptionData = [{
  heading: 'What is Base64 Encoding?',
  blockData: ['Base64 encoding is a way to convert binary data into a string of ASCII characters. This is useful for storing and transmitting binary data in text-based formats, such as email or XML.']
}, {
  heading: 'Why Use a File to Base64 Encoder?',
  listData: ['To store binary files in text-based formats. Base64 encoding allows you to store binary files in text-based formats, such as email or XML. This makes it easier to store and transmit binary files.', 'To transmit binary files over networks. Base64 encoding can be used to transmit binary files over networks that do not support binary data. For example, you can use Base64 encoding to transmit binary files over email.', 'To secure binary files. Base64 encoding can be used to secure binary files by making them more difficult to read and understand. For example, you can use Base64 encoding to secure passwords or other sensitive data.']
}, {
  heading: 'Features of Our Online File to Base64 Encoder Tool',
  listData: ['Free to use. No need to pay or sign up for an account.', 'No download required. Convert your files to Base64 directly from your web browser.', 'Supports all file formats. Our encoder supports all file formats, including text, images, videos, and audio.', 'Easy to use. Simply select your file and click the "Encode" button.', 'Customizable settings. You can customize the settings of our encoder to match your personal preferences.']
}, {
  heading: 'How to Use Our Online File to Base64 Encoder Tool',
  listData: ['Go to our website and select the file you want to encode.', 'Click the "Encode" button.', 'View your encoded data in the sidebar.', 'Copy and paste your encoded data into your project.']
}, {
  heading: 'Tips for Using a File to Base64 Encoder',
  listData: ['Choose a secure file to Base64 encoder. Make sure to choose a file to Base64 encoder that is secure and that will not leak your data.', 'Use a consistent encoding scheme. Choose a Base64 encoding scheme and use it consistently throughout your project. This will make it easier to decode your data later.', 'Store your encoded data securely. Once you have encoded your data, make sure to store it securely. Encoded data is still vulnerable to attack, so it is important to store it securely.']
}, {
  blockData: ['Our free online file to Base64 encoder tool is a great way to convert any file to Base64 with ease. It is easy to use and supports all file formats. With our encoder, you can easily store, transmit, and secure your binary files.']
}];

/***/ }),

/***/ 6636:
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
/* harmony import */ var _apps_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./apps.json */ 7971);

var ApplicationIds;
(function (ApplicationIds) {
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
})(ApplicationIds || (ApplicationIds = {}));
const appsConfigMap = new Map(Object.entries(/*#__PURE__*/ (_apps_json__WEBPACK_IMPORTED_MODULE_0___namespace_cache || (_apps_json__WEBPACK_IMPORTED_MODULE_0___namespace_cache = __webpack_require__.t(_apps_json__WEBPACK_IMPORTED_MODULE_0__, 2)))));
appsConfigMap.delete('default');
const applicationConfig = appsConfigMap;

/***/ }),

/***/ 7971:
/*!************************************!*\
  !*** ./src/environments/apps.json ***!
  \************************************/
/***/ ((module) => {

module.exports = JSON.parse('{"xmltojson":{"applicationId":"xmltojson","displayText":"XML to JSON Converter","iconName":"xml-icon","navigateUrl":"/tools/xml-to-json","iconRelativeUrl":"xml.svg"},"qrcodegenerator":{"applicationId":"qrcodegenerator","displayText":"QR Code Generator","iconName":"qr-code","navigateUrl":"/tools/qr-code-generator","iconRelativeUrl":"qr-code.svg"},"wordcounter":{"applicationId":"wordcounter","displayText":"Word Counter","iconName":"word-icon","navigateUrl":"/tools/word-counter","iconRelativeUrl":"word.svg"},"textcompare":{"applicationId":"textcompare","displayText":"Online Text Compare","iconName":"comparison-icon","navigateUrl":"/tools/text-compare","iconRelativeUrl":"comparison.svg"},"markdowneditor":{"applicationId":"markdowneditor","displayText":"Markdown Editor","iconName":"markdown-icon","navigateUrl":"/tools/markdown-editor","iconRelativeUrl":"markdown.svg"},"passwordgenerator":{"applicationId":"passwordgenerator","displayText":"Random Password Generator","iconName":"password-icon","navigateUrl":"/tools/password-generator","iconRelativeUrl":"password.svg"},"videoconverter":{"applicationId":"videoconverter","displayText":"Video to Audio Converter","iconName":"video-convert-icon","navigateUrl":"/tools/video-converter","iconRelativeUrl":"video-convert.svg"},"screenrecorder":{"applicationId":"screenrecorder","displayText":"Free Screen Recorder","iconName":"screen-icon","navigateUrl":"/tools/screen-recorder","iconRelativeUrl":"screen.svg"},"imagecompressor":{"applicationId":"imagecompressor","displayText":"Free Image Compressor","iconName":"image-icon","navigateUrl":"/tools/image-compress","iconRelativeUrl":"image-icon.svg"},"imagecropper":{"applicationId":"imagecropper","displayText":"Free Image Cropper","iconName":"image-icon","navigateUrl":"/tools/crop-image","iconRelativeUrl":"image-icon.svg"},"jwtdecoder":{"applicationId":"jwtdecoder","displayText":"JWT Decoder","iconName":"jwt-icon","navigateUrl":"/tools/jwt","iconRelativeUrl":"jwt-icon.svg"},"jsformatter":{"applicationId":"jsformatter","displayText":"Online Javascript Formatter","iconName":"js-icon","navigateUrl":"/tools/js-formatter","iconRelativeUrl":"js-icon.svg"},"jsonformatter":{"applicationId":"jsonformatter","displayText":"Online JSON Formatter","iconName":"json-icon","navigateUrl":"/tools/json-formatter","iconRelativeUrl":"json-icon.svg"},"jsonviewer":{"applicationId":"jsonviewer","displayText":"Online JSON Viewer","iconName":"json-icon","navigateUrl":"/tools/json-viewer","iconRelativeUrl":"json-icon.svg"},"htmlformatter":{"applicationId":"htmlformatter","displayText":"Online HTML Formatter","iconName":"html-icon","navigateUrl":"/tools/html-formatter","iconRelativeUrl":"html.svg"},"cssformatter":{"applicationId":"cssformatter","displayText":"Online CSS Formatter","iconName":"css-icon","navigateUrl":"/tools/css-formatter","iconRelativeUrl":"css.svg"},"base64encoder":{"applicationId":"base64encoder","displayText":"Base64 Encoder","iconName":"file-encode-icon","navigateUrl":"/tools/base64-encode","iconRelativeUrl":"file-encode.svg"},"base64decoder":{"applicationId":"base64decoder","displayText":"Base64 Decoder","iconName":"file-decode-icon","navigateUrl":"/tools/base64-decode","iconRelativeUrl":"file-decode.svg"},"crongenerator":{"applicationId":"crongenerator","displayText":"Cron Expression Generator","iconName":"cron-icon","navigateUrl":"/tools/cron-expression","iconRelativeUrl":"cron.svg"},"uuidv4generator":{"applicationId":"uuidv4generator","displayText":"UUID V4 Generator","iconName":"uuid-icon","navigateUrl":"/tools/uuid-v4-generator","iconRelativeUrl":"uuid-icon.svg"},"uuidv1generator":{"applicationId":"uuidv1generator","displayText":"UUID V1 Generator","iconName":"uuid-icon","navigateUrl":"/tools/uuid-v1-generator","iconRelativeUrl":"uuid-icon.svg"},"guidgenerator":{"applicationId":"guidgenerator","displayText":"GUID Generator","iconName":"uuid-icon","navigateUrl":"/tools/guid-generator","iconRelativeUrl":"uuid-icon.svg"}}');

/***/ })

}]);
//# sourceMappingURL=src_app_modules_base64-encode_base64-encode_module_ts.edbfaf04a152ac99.js.map