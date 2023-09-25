"use strict";
exports.id = 114;
exports.ids = [114];
exports.modules = {

/***/ 6095:
/*!***********************************************************************!*\
  !*** ./src/app/modules/base64-encode/base64-encode-routing.module.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Base64EncodeRoutingModule: () => (/* binding */ Base64EncodeRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 68804);
/* harmony import */ var _base64_encode_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base64-encode.component */ 33728);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 59936);




const routes = [{
  path: '',
  component: _base64_encode_component__WEBPACK_IMPORTED_MODULE_0__.Base64EncodeComponent
}];
let Base64EncodeRoutingModule = /*#__PURE__*/(() => {
  var _class;
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
  return Base64EncodeRoutingModule;
})();
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](Base64EncodeRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
})();

/***/ }),

/***/ 33728:
/*!******************************************************************!*\
  !*** ./src/app/modules/base64-encode/base64-encode.component.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Base64EncodeComponent: () => (/* binding */ Base64EncodeComponent)
/* harmony export */ });
/* harmony import */ var _Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 70734);
/* harmony import */ var src_environments_component_config_base64_encode_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/environments/component-config/base64-encode/config */ 72910);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 59936);
/* harmony import */ var _angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/cdk/clipboard */ 85831);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 34228);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/icon */ 59049);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/button */ 63490);
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/card */ 62461);








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
let Base64EncodeComponent = /*#__PURE__*/(() => {
  var _class;
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
  return Base64EncodeComponent;
})();

/***/ }),

/***/ 27114:
/*!***************************************************************!*\
  !*** ./src/app/modules/base64-encode/base64-encode.module.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Base64EncodeModule: () => (/* binding */ Base64EncodeModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 34228);
/* harmony import */ var _base64_encode_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base64-encode-routing.module */ 6095);
/* harmony import */ var _base64_encode_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./base64-encode.component */ 33728);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/button */ 63490);
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/card */ 62461);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/icon */ 59049);
/* harmony import */ var _angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/cdk/clipboard */ 85831);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 59936);








let Base64EncodeModule = /*#__PURE__*/(() => {
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
  return Base64EncodeModule;
})();
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](Base64EncodeModule, {
    declarations: [_base64_encode_component__WEBPACK_IMPORTED_MODULE_1__.Base64EncodeComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _base64_encode_routing_module__WEBPACK_IMPORTED_MODULE_0__.Base64EncodeRoutingModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__.MatIconModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_5__.MatButtonModule, _angular_material_card__WEBPACK_IMPORTED_MODULE_6__.MatCardModule, _angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_7__.ClipboardModule]
  });
})();

/***/ }),

/***/ 72910:
/*!*******************************************************************!*\
  !*** ./src/environments/component-config/base64-encode/config.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   componentConfig: () => (/* binding */ componentConfig),
/* harmony export */   descriptionData: () => (/* binding */ descriptionData)
/* harmony export */ });
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/environments/environment */ 56316);
/* harmony import */ var src_environments_tools_directory_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/environments/tools-directory-config */ 12313);


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

/***/ 62461:
/*!**********************************************************!*\
  !*** ./node_modules/@angular/material/fesm2022/card.mjs ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MAT_CARD_CONFIG: () => (/* binding */ MAT_CARD_CONFIG),
/* harmony export */   MatCard: () => (/* binding */ MatCard),
/* harmony export */   MatCardActions: () => (/* binding */ MatCardActions),
/* harmony export */   MatCardAvatar: () => (/* binding */ MatCardAvatar),
/* harmony export */   MatCardContent: () => (/* binding */ MatCardContent),
/* harmony export */   MatCardFooter: () => (/* binding */ MatCardFooter),
/* harmony export */   MatCardHeader: () => (/* binding */ MatCardHeader),
/* harmony export */   MatCardImage: () => (/* binding */ MatCardImage),
/* harmony export */   MatCardLgImage: () => (/* binding */ MatCardLgImage),
/* harmony export */   MatCardMdImage: () => (/* binding */ MatCardMdImage),
/* harmony export */   MatCardModule: () => (/* binding */ MatCardModule),
/* harmony export */   MatCardSmImage: () => (/* binding */ MatCardSmImage),
/* harmony export */   MatCardSubtitle: () => (/* binding */ MatCardSubtitle),
/* harmony export */   MatCardTitle: () => (/* binding */ MatCardTitle),
/* harmony export */   MatCardTitleGroup: () => (/* binding */ MatCardTitleGroup),
/* harmony export */   MatCardXlImage: () => (/* binding */ MatCardXlImage)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 59936);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 34228);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/core */ 56381);





/** Injection token that can be used to provide the default options the card module. */
const _c0 = ["*"];
const _c1 = [[["mat-card-title"], ["mat-card-subtitle"], ["", "mat-card-title", ""], ["", "mat-card-subtitle", ""], ["", "matCardTitle", ""], ["", "matCardSubtitle", ""]], [["", "mat-card-image", ""], ["", "matCardImage", ""], ["", "mat-card-sm-image", ""], ["", "matCardImageSmall", ""], ["", "mat-card-md-image", ""], ["", "matCardImageMedium", ""], ["", "mat-card-lg-image", ""], ["", "matCardImageLarge", ""], ["", "mat-card-xl-image", ""], ["", "matCardImageXLarge", ""]], "*"];
const _c2 = ["mat-card-title, mat-card-subtitle,\n      [mat-card-title], [mat-card-subtitle],\n      [matCardTitle], [matCardSubtitle]", "[mat-card-image], [matCardImage],\n                    [mat-card-sm-image], [matCardImageSmall],\n                    [mat-card-md-image], [matCardImageMedium],\n                    [mat-card-lg-image], [matCardImageLarge],\n                    [mat-card-xl-image], [matCardImageXLarge]", "*"];
const _c3 = [[["", "mat-card-avatar", ""], ["", "matCardAvatar", ""]], [["mat-card-title"], ["mat-card-subtitle"], ["", "mat-card-title", ""], ["", "mat-card-subtitle", ""], ["", "matCardTitle", ""], ["", "matCardSubtitle", ""]], "*"];
const _c4 = ["[mat-card-avatar], [matCardAvatar]", "mat-card-title, mat-card-subtitle,\n      [mat-card-title], [mat-card-subtitle],\n      [matCardTitle], [matCardSubtitle]", "*"];
const MAT_CARD_CONFIG = /*#__PURE__*/new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken('MAT_CARD_CONFIG');
/**
 * Material Design card component. Cards contain content and actions about a single subject.
 * See https://material.io/design/components/cards.html
 *
 * MatCard provides no behaviors, instead serving as a purely visual treatment.
 */
let MatCard = /*#__PURE__*/(() => {
  var _class;
  class MatCard {
    constructor(config) {
      this.appearance = config?.appearance || 'raised';
    }
  }
  _class = MatCard;
  _class.ɵfac = function _class_Factory(t) {
    return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](MAT_CARD_CONFIG, 8));
  };
  _class.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
    type: _class,
    selectors: [["mat-card"]],
    hostAttrs: [1, "mat-mdc-card", "mdc-card"],
    hostVars: 4,
    hostBindings: function _class_HostBindings(rf, ctx) {
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("mat-mdc-card-outlined", ctx.appearance === "outlined")("mdc-card--outlined", ctx.appearance === "outlined");
      }
    },
    inputs: {
      appearance: "appearance"
    },
    exportAs: ["matCard"],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function _class_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojectionDef"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](0);
      }
    },
    styles: [".mdc-card{display:flex;flex-direction:column;box-sizing:border-box}.mdc-card::after{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:1px solid rgba(0,0,0,0);border-radius:inherit;content:\"\";pointer-events:none;pointer-events:none}@media screen and (forced-colors: active){.mdc-card::after{border-color:CanvasText}}.mdc-card--outlined::after{border:none}.mdc-card__content{border-radius:inherit;height:100%}.mdc-card__media{position:relative;box-sizing:border-box;background-repeat:no-repeat;background-position:center;background-size:cover}.mdc-card__media::before{display:block;content:\"\"}.mdc-card__media:first-child{border-top-left-radius:inherit;border-top-right-radius:inherit}.mdc-card__media:last-child{border-bottom-left-radius:inherit;border-bottom-right-radius:inherit}.mdc-card__media--square::before{margin-top:100%}.mdc-card__media--16-9::before{margin-top:56.25%}.mdc-card__media-content{position:absolute;top:0;right:0;bottom:0;left:0;box-sizing:border-box}.mdc-card__primary-action{display:flex;flex-direction:column;box-sizing:border-box;position:relative;outline:none;color:inherit;text-decoration:none;cursor:pointer;overflow:hidden}.mdc-card__primary-action:first-child{border-top-left-radius:inherit;border-top-right-radius:inherit}.mdc-card__primary-action:last-child{border-bottom-left-radius:inherit;border-bottom-right-radius:inherit}.mdc-card__actions{display:flex;flex-direction:row;align-items:center;box-sizing:border-box;min-height:52px;padding:8px}.mdc-card__actions--full-bleed{padding:0}.mdc-card__action-buttons,.mdc-card__action-icons{display:flex;flex-direction:row;align-items:center;box-sizing:border-box}.mdc-card__action-icons{color:rgba(0, 0, 0, 0.6);flex-grow:1;justify-content:flex-end}.mdc-card__action-buttons+.mdc-card__action-icons{margin-left:16px;margin-right:0}[dir=rtl] .mdc-card__action-buttons+.mdc-card__action-icons,.mdc-card__action-buttons+.mdc-card__action-icons[dir=rtl]{margin-left:0;margin-right:16px}.mdc-card__action{display:inline-flex;flex-direction:row;align-items:center;box-sizing:border-box;justify-content:center;cursor:pointer;user-select:none}.mdc-card__action:focus{outline:none}.mdc-card__action--button{margin-left:0;margin-right:8px;padding:0 8px}[dir=rtl] .mdc-card__action--button,.mdc-card__action--button[dir=rtl]{margin-left:8px;margin-right:0}.mdc-card__action--button:last-child{margin-left:0;margin-right:0}[dir=rtl] .mdc-card__action--button:last-child,.mdc-card__action--button:last-child[dir=rtl]{margin-left:0;margin-right:0}.mdc-card__actions--full-bleed .mdc-card__action--button{justify-content:space-between;width:100%;height:auto;max-height:none;margin:0;padding:8px 16px;text-align:left}[dir=rtl] .mdc-card__actions--full-bleed .mdc-card__action--button,.mdc-card__actions--full-bleed .mdc-card__action--button[dir=rtl]{text-align:right}.mdc-card__action--icon{margin:-6px 0;padding:12px}.mdc-card__action--icon:not(:disabled){color:rgba(0, 0, 0, 0.6)}.mat-mdc-card{border-radius:var(--mdc-elevated-card-container-shape);background-color:var(--mdc-elevated-card-container-color);border-width:0;border-style:solid;border-color:var(--mdc-elevated-card-container-color);box-shadow:var(--mdc-elevated-card-container-elevation);--mdc-elevated-card-container-shape:4px;--mdc-outlined-card-container-shape:4px;--mdc-outlined-card-outline-width:1px}.mat-mdc-card .mdc-card::after{border-radius:var(--mdc-elevated-card-container-shape)}.mat-mdc-card-outlined{border-width:var(--mdc-outlined-card-outline-width);border-style:solid;border-color:var(--mdc-outlined-card-outline-color);border-radius:var(--mdc-outlined-card-container-shape);background-color:var(--mdc-outlined-card-container-color);box-shadow:var(--mdc-outlined-card-container-elevation)}.mat-mdc-card-outlined .mdc-card::after{border-radius:var(--mdc-outlined-card-container-shape)}.mat-mdc-card-title{font-family:var(--mat-card-title-text-font);line-height:var(--mat-card-title-text-line-height);font-size:var(--mat-card-title-text-size);letter-spacing:var(--mat-card-title-text-tracking);font-weight:var(--mat-card-title-text-weight)}.mat-mdc-card-subtitle{color:var(--mat-card-subtitle-text-color);font-family:var(--mat-card-subtitle-text-font);line-height:var(--mat-card-subtitle-text-line-height);font-size:var(--mat-card-subtitle-text-size);letter-spacing:var(--mat-card-subtitle-text-tracking);font-weight:var(--mat-card-subtitle-text-weight)}.mat-mdc-card{position:relative}.mat-mdc-card-title,.mat-mdc-card-subtitle{display:block;margin:0}.mat-mdc-card-avatar~.mat-mdc-card-header-text .mat-mdc-card-title,.mat-mdc-card-avatar~.mat-mdc-card-header-text .mat-mdc-card-subtitle{padding:16px 16px 0}.mat-mdc-card-header{display:flex;padding:16px 16px 0}.mat-mdc-card-content{display:block;padding:0 16px}.mat-mdc-card-content:first-child{padding-top:16px}.mat-mdc-card-content:last-child{padding-bottom:16px}.mat-mdc-card-title-group{display:flex;justify-content:space-between;width:100%}.mat-mdc-card-avatar{height:40px;width:40px;border-radius:50%;flex-shrink:0;margin-bottom:16px;object-fit:cover}.mat-mdc-card-avatar~.mat-mdc-card-header-text .mat-mdc-card-subtitle,.mat-mdc-card-avatar~.mat-mdc-card-header-text .mat-mdc-card-title{line-height:normal}.mat-mdc-card-sm-image{width:80px;height:80px}.mat-mdc-card-md-image{width:112px;height:112px}.mat-mdc-card-lg-image{width:152px;height:152px}.mat-mdc-card-xl-image{width:240px;height:240px}.mat-mdc-card-subtitle~.mat-mdc-card-title,.mat-mdc-card-title~.mat-mdc-card-subtitle,.mat-mdc-card-header .mat-mdc-card-header-text .mat-mdc-card-title,.mat-mdc-card-header .mat-mdc-card-header-text .mat-mdc-card-subtitle,.mat-mdc-card-title-group .mat-mdc-card-title,.mat-mdc-card-title-group .mat-mdc-card-subtitle{padding-top:0}.mat-mdc-card-content>:last-child:not(.mat-mdc-card-footer){margin-bottom:0}.mat-mdc-card-actions-align-end{justify-content:flex-end}"],
    encapsulation: 2,
    changeDetection: 0
  });
  return MatCard;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
// TODO(jelbourn): add `MatActionCard`, which is a card that acts like a button (and has a ripple).
// Supported in MDC with `.mdc-card__primary-action`. Will require additional a11y docs for users.
/**
 * Title of a card, intended for use within `<mat-card>`. This component is an optional
 * convenience for one variety of card title; any custom title element may be used in its place.
 *
 * MatCardTitle provides no behaviors, instead serving as a purely visual treatment.
 */
let MatCardTitle = /*#__PURE__*/(() => {
  var _class2;
  class MatCardTitle {}
  _class2 = MatCardTitle;
  _class2.ɵfac = function _class2_Factory(t) {
    return new (t || _class2)();
  };
  _class2.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
    type: _class2,
    selectors: [["mat-card-title"], ["", "mat-card-title", ""], ["", "matCardTitle", ""]],
    hostAttrs: [1, "mat-mdc-card-title"]
  });
  return MatCardTitle;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
/**
 * Container intended to be used within the `<mat-card>` component. Can contain exactly one
 * `<mat-card-title>`, one `<mat-card-subtitle>` and one content image of any size
 * (e.g. `<img matCardLgImage>`).
 */
let MatCardTitleGroup = /*#__PURE__*/(() => {
  var _class3;
  class MatCardTitleGroup {}
  _class3 = MatCardTitleGroup;
  _class3.ɵfac = function _class3_Factory(t) {
    return new (t || _class3)();
  };
  _class3.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
    type: _class3,
    selectors: [["mat-card-title-group"]],
    hostAttrs: [1, "mat-mdc-card-title-group"],
    ngContentSelectors: _c2,
    decls: 4,
    vars: 0,
    template: function _class3_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojectionDef"](_c1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](2, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](3, 2);
      }
    },
    encapsulation: 2,
    changeDetection: 0
  });
  return MatCardTitleGroup;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
/**
 * Content of a card, intended for use within `<mat-card>`. This component is an optional
 * convenience for use with other convenience elements, such as `<mat-card-title>`; any custom
 * content block element may be used in its place.
 *
 * MatCardContent provides no behaviors, instead serving as a purely visual treatment.
 */
let MatCardContent = /*#__PURE__*/(() => {
  var _class4;
  class MatCardContent {}
  _class4 = MatCardContent;
  _class4.ɵfac = function _class4_Factory(t) {
    return new (t || _class4)();
  };
  _class4.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
    type: _class4,
    selectors: [["mat-card-content"]],
    hostAttrs: [1, "mat-mdc-card-content"]
  });
  return MatCardContent;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
/**
 * Sub-title of a card, intended for use within `<mat-card>` beneath a `<mat-card-title>`. This
 * component is an optional convenience for use with other convenience elements, such as
 * `<mat-card-title>`.
 *
 * MatCardSubtitle provides no behaviors, instead serving as a purely visual treatment.
 */
let MatCardSubtitle = /*#__PURE__*/(() => {
  var _class5;
  class MatCardSubtitle {}
  _class5 = MatCardSubtitle;
  _class5.ɵfac = function _class5_Factory(t) {
    return new (t || _class5)();
  };
  _class5.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
    type: _class5,
    selectors: [["mat-card-subtitle"], ["", "mat-card-subtitle", ""], ["", "matCardSubtitle", ""]],
    hostAttrs: [1, "mat-mdc-card-subtitle"]
  });
  return MatCardSubtitle;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
/**
 * Bottom area of a card that contains action buttons, intended for use within `<mat-card>`.
 * This component is an optional convenience for use with other convenience elements, such as
 * `<mat-card-content>`; any custom action block element may be used in its place.
 *
 * MatCardActions provides no behaviors, instead serving as a purely visual treatment.
 */
let MatCardActions = /*#__PURE__*/(() => {
  var _class6;
  class MatCardActions {
    constructor() {
      // TODO(jelbourn): deprecate `align` in favor of `actionPosition` or `actionAlignment`
      // as to not conflict with the native `align` attribute.
      /** Position of the actions inside the card. */
      this.align = 'start';
    }
  }
  _class6 = MatCardActions;
  _class6.ɵfac = function _class6_Factory(t) {
    return new (t || _class6)();
  };
  _class6.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
    type: _class6,
    selectors: [["mat-card-actions"]],
    hostAttrs: [1, "mat-mdc-card-actions", "mdc-card__actions"],
    hostVars: 2,
    hostBindings: function _class6_HostBindings(rf, ctx) {
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("mat-mdc-card-actions-align-end", ctx.align === "end");
      }
    },
    inputs: {
      align: "align"
    },
    exportAs: ["matCardActions"]
  });
  return MatCardActions;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
/**
 * Header region of a card, intended for use within `<mat-card>`. This header captures
 * a card title, subtitle, and avatar.  This component is an optional convenience for use with
 * other convenience elements, such as `<mat-card-footer>`; any custom header block element may be
 * used in its place.
 *
 * MatCardHeader provides no behaviors, instead serving as a purely visual treatment.
 */
let MatCardHeader = /*#__PURE__*/(() => {
  var _class7;
  class MatCardHeader {}
  _class7 = MatCardHeader;
  _class7.ɵfac = function _class7_Factory(t) {
    return new (t || _class7)();
  };
  _class7.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
    type: _class7,
    selectors: [["mat-card-header"]],
    hostAttrs: [1, "mat-mdc-card-header"],
    ngContentSelectors: _c4,
    decls: 4,
    vars: 0,
    consts: [[1, "mat-mdc-card-header-text"]],
    template: function _class7_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojectionDef"](_c3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](2, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](3, 2);
      }
    },
    encapsulation: 2,
    changeDetection: 0
  });
  return MatCardHeader;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
/**
 * Footer area a card, intended for use within `<mat-card>`.
 * This component is an optional convenience for use with other convenience elements, such as
 * `<mat-card-content>`; any custom footer block element may be used in its place.
 *
 * MatCardFooter provides no behaviors, instead serving as a purely visual treatment.
 */
let MatCardFooter = /*#__PURE__*/(() => {
  var _class8;
  class MatCardFooter {}
  _class8 = MatCardFooter;
  _class8.ɵfac = function _class8_Factory(t) {
    return new (t || _class8)();
  };
  _class8.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
    type: _class8,
    selectors: [["mat-card-footer"]],
    hostAttrs: [1, "mat-mdc-card-footer"]
  });
  return MatCardFooter;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
// TODO(jelbourn): deprecate the "image" selectors to replace with "media".
// TODO(jelbourn): support `.mdc-card__media-content`.
/**
 * Primary image content for a card, intended for use within `<mat-card>`. Can be applied to
 * any media element, such as `<img>` or `<picture>`.
 *
 * This component is an optional convenience for use with other convenience elements, such as
 * `<mat-card-content>`; any custom media element may be used in its place.
 *
 * MatCardImage provides no behaviors, instead serving as a purely visual treatment.
 */
let MatCardImage = /*#__PURE__*/(() => {
  var _class9;
  class MatCardImage {}
  _class9 = MatCardImage;
  _class9.ɵfac = function _class9_Factory(t) {
    return new (t || _class9)();
  };
  _class9.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
    type: _class9,
    selectors: [["", "mat-card-image", ""], ["", "matCardImage", ""]],
    hostAttrs: [1, "mat-mdc-card-image", "mdc-card__media"]
  });
  return MatCardImage;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
/** Same as `MatCardImage`, but small. */
let MatCardSmImage = /*#__PURE__*/(() => {
  var _class10;
  class MatCardSmImage {}
  _class10 = MatCardSmImage;
  _class10.ɵfac = function _class10_Factory(t) {
    return new (t || _class10)();
  };
  _class10.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
    type: _class10,
    selectors: [["", "mat-card-sm-image", ""], ["", "matCardImageSmall", ""]],
    hostAttrs: [1, "mat-mdc-card-sm-image", "mdc-card__media"]
  });
  return MatCardSmImage;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
/** Same as `MatCardImage`, but medium. */
let MatCardMdImage = /*#__PURE__*/(() => {
  var _class11;
  class MatCardMdImage {}
  _class11 = MatCardMdImage;
  _class11.ɵfac = function _class11_Factory(t) {
    return new (t || _class11)();
  };
  _class11.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
    type: _class11,
    selectors: [["", "mat-card-md-image", ""], ["", "matCardImageMedium", ""]],
    hostAttrs: [1, "mat-mdc-card-md-image", "mdc-card__media"]
  });
  return MatCardMdImage;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
/** Same as `MatCardImage`, but large. */
let MatCardLgImage = /*#__PURE__*/(() => {
  var _class12;
  class MatCardLgImage {}
  _class12 = MatCardLgImage;
  _class12.ɵfac = function _class12_Factory(t) {
    return new (t || _class12)();
  };
  _class12.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
    type: _class12,
    selectors: [["", "mat-card-lg-image", ""], ["", "matCardImageLarge", ""]],
    hostAttrs: [1, "mat-mdc-card-lg-image", "mdc-card__media"]
  });
  return MatCardLgImage;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
/** Same as `MatCardImage`, but extra-large. */
let MatCardXlImage = /*#__PURE__*/(() => {
  var _class13;
  class MatCardXlImage {}
  _class13 = MatCardXlImage;
  _class13.ɵfac = function _class13_Factory(t) {
    return new (t || _class13)();
  };
  _class13.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
    type: _class13,
    selectors: [["", "mat-card-xl-image", ""], ["", "matCardImageXLarge", ""]],
    hostAttrs: [1, "mat-mdc-card-xl-image", "mdc-card__media"]
  });
  return MatCardXlImage;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
/**
 * Avatar image content for a card, intended for use within `<mat-card>`. Can be applied to
 * any media element, such as `<img>` or `<picture>`.
 *
 * This component is an optional convenience for use with other convenience elements, such as
 * `<mat-card-title>`; any custom media element may be used in its place.
 *
 * MatCardAvatar provides no behaviors, instead serving as a purely visual treatment.
 */
let MatCardAvatar = /*#__PURE__*/(() => {
  var _class14;
  class MatCardAvatar {}
  _class14 = MatCardAvatar;
  _class14.ɵfac = function _class14_Factory(t) {
    return new (t || _class14)();
  };
  _class14.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
    type: _class14,
    selectors: [["", "mat-card-avatar", ""], ["", "matCardAvatar", ""]],
    hostAttrs: [1, "mat-mdc-card-avatar"]
  });
  return MatCardAvatar;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
const CARD_DIRECTIVES = [MatCard, MatCardActions, MatCardAvatar, MatCardContent, MatCardFooter, MatCardHeader, MatCardImage, MatCardLgImage, MatCardMdImage, MatCardSmImage, MatCardSubtitle, MatCardTitle, MatCardTitleGroup, MatCardXlImage];
let MatCardModule = /*#__PURE__*/(() => {
  var _class15;
  class MatCardModule {}
  _class15 = MatCardModule;
  _class15.ɵfac = function _class15_Factory(t) {
    return new (t || _class15)();
  };
  _class15.ɵmod = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
    type: _class15
  });
  _class15.ɵinj = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
    imports: [_angular_material_core__WEBPACK_IMPORTED_MODULE_1__.MatCommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule, _angular_material_core__WEBPACK_IMPORTED_MODULE_1__.MatCommonModule]
  });
  return MatCardModule;
})();
/*#__PURE__*/(function () {
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
//# sourceMappingURL=114.js.map