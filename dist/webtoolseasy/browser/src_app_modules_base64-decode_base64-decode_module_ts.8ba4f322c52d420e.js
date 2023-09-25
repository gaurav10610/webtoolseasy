"use strict";
(self["webpackChunkwebtoolseasy"] = self["webpackChunkwebtoolseasy"] || []).push([["src_app_modules_base64-decode_base64-decode_module_ts"],{

/***/ 2985:
/*!***********************************************************************!*\
  !*** ./src/app/modules/base64-decode/base64-decode-routing.module.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Base64DecodeRoutingModule: () => (/* binding */ Base64DecodeRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 7947);
/* harmony import */ var _base64_decode_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base64-decode.component */ 6333);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 1699);
var _class;




const routes = [{
  path: '',
  component: _base64_decode_component__WEBPACK_IMPORTED_MODULE_0__.Base64DecodeComponent
}];
class Base64DecodeRoutingModule {}
_class = Base64DecodeRoutingModule;
_class.ɵfac = function Base64DecodeRoutingModule_Factory(t) {
  return new (t || _class)();
};
_class.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
  type: _class
});
_class.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](Base64DecodeRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
})();

/***/ }),

/***/ 6333:
/*!******************************************************************!*\
  !*** ./src/app/modules/base64-decode/base64-decode.component.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Base64DecodeComponent: () => (/* binding */ Base64DecodeComponent)
/* harmony export */ });
/* harmony import */ var _Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 1670);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 2235);
/* harmony import */ var src_app_service_util_logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/service/util/logger */ 4930);
/* harmony import */ var src_environments_component_config_base64_decode_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/environments/component-config/base64-decode/config */ 4215);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/button */ 895);

var _class;






const _c0 = ["text1AreaContent"];
function Base64DecodeComponent_a_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "a", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function Base64DecodeComponent_a_9_Template_a_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r3);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r2.downloadDecodedFile());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](ctx_r1.decodeFileData.name);
  }
}
class Base64DecodeComponent {
  constructor(renderer) {
    this.renderer = renderer;
    this.decodeFileData = {
      name: null,
      blob: null
    };
    this.omitMimeTypeChars = ['@'];
    this.applicationConfig = src_environments_component_config_base64_decode_config__WEBPACK_IMPORTED_MODULE_2__.componentConfig;
    this.descriptionData = src_environments_component_config_base64_decode_config__WEBPACK_IMPORTED_MODULE_2__.descriptionData;
  }
  updateBase64(base64) {
    var _this = this;
    return (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this.renderer.setProperty(_this.text1AreaContent.nativeElement, 'innerText', base64);
    })();
  }
  onDataPaste(event) {
    var _this2 = this;
    return (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      event.preventDefault();
      const pastedData = (event.clipboardData || window.clipboardData).getData('text');
      _this2.updateBase64(pastedData);
    })();
  }
  onEncodedDivClick() {
    this.text1AreaContent.nativeElement.focus();
  }
  decodeBase64() {
    var _this3 = this;
    return (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      /**
       * base64 content in format data:text/csv;base64,assafcasfewfewf
       */
      const base64Content = _this3.text1AreaContent.nativeElement.innerText.trim();
      if (base64Content === '') {
        return;
      }
      /**
       * string base64 string
       */
      const base64Data = base64Content.split(',')[1];
      const mimeType = _this3.getMimeType(base64Content);
      src_app_service_util_logger__WEBPACK_IMPORTED_MODULE_1__.LogUtils.info(`mime type: ${mimeType}`);
      _this3.base64toBlob(base64Data).subscribe(blob => {
        _this3.decodeFileData.blob = blob;
      });
      _this3.decodeFileData.name = `base64-decoded-file.${mimeType.split('/').pop()}`;
    })();
  }
  /**
   * get mimeType from base64 data URI
   * @param base64Content
   * @returns
   */
  getMimeType(base64Content) {
    return base64Content.substring(base64Content.indexOf(':') + 1, base64Content.indexOf(';'));
  }
  downloadDecodedFile() {
    var _this4 = this;
    return (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this4.downloadFile(_this4.decodeFileData.name, _this4.decodeFileData.blob);
    })();
  }
  /* Method to convert Base64Data Url as Image Blob */
  base64toBlob(dataURI) {
    return rxjs__WEBPACK_IMPORTED_MODULE_4__.Observable.create(observer => {
      const byteString = window.atob(dataURI);
      const arrayBuffer = new ArrayBuffer(byteString.length);
      const int8Array = new Uint8Array(arrayBuffer);
      for (let i = 0; i < byteString.length; i++) {
        int8Array[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([int8Array], {
        type: 'image/jpeg'
      });
      observer.next(blob);
      observer.complete();
    });
  }
  downloadFile(fileName, fileContent) {
    var _this5 = this;
    return (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const downloadAnchor = _this5.renderer.createElement('a');
      _this5.renderer.setProperty(downloadAnchor, 'href', URL.createObjectURL(fileContent));
      _this5.renderer.setProperty(downloadAnchor, 'download', fileName);
      downloadAnchor.click();
    })();
  }
}
_class = Base64DecodeComponent;
_class.ɵfac = function Base64DecodeComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_3__.Renderer2));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["app-base64-decode"]],
  viewQuery: function Base64DecodeComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵviewQuery"](_c0, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵloadQuery"]()) && (ctx.text1AreaContent = _t.first);
    }
  },
  decls: 10,
  vars: 1,
  consts: [[1, "flex-display", "flex-column-flow", "flex-align-center", "flex-gap-large"], [1, "flex-display", "flex-column-flow", "full-width", "flex-gap-medium", 2, "min-height", "200px", "max-height", "200px"], [1, "div-label"], [1, "y-scroll", "flex-full-height", "div-border", "border-grey", 2, "padding", "10px", "color", "indigo", 3, "click"], ["contenteditable", "true", 1, "full-height", "full-width", 3, "paste"], ["text1AreaContent", ""], ["mat-stroked-button", "", "color", "primary", 3, "click"], ["mat-button", "", "color", "accent", 3, "click", 4, "ngIf"], ["mat-button", "", "color", "accent", 3, "click"]],
  template: function Base64DecodeComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "span", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3, "Base64 to File (Paste Base64 Data URI)");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "div", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function Base64DecodeComponent_Template_div_click_4_listener() {
        return ctx.onEncodedDivClick();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](5, "span", 4, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("paste", function Base64DecodeComponent_Template_span_paste_5_listener($event) {
        return ctx.onDataPaste($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](7, "button", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function Base64DecodeComponent_Template_button_click_7_listener() {
        return ctx.decodeBase64();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](8, " Decode Base64 to File ");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](9, Base64DecodeComponent_a_9_Template, 2, 1, "a", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](9);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.decodeFileData.name !== null);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.NgIf, _angular_material_button__WEBPACK_IMPORTED_MODULE_6__.MatAnchor, _angular_material_button__WEBPACK_IMPORTED_MODULE_6__.MatButton],
  styles: [".div-label[_ngcontent-%COMP%] {\n  font-size: large;\n}\n\n.div-border[_ngcontent-%COMP%] {\n  border-radius: 10px;\n}\n\n[contenteditable][_ngcontent-%COMP%]:focus {\n  outline: 0px solid transparent;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvbW9kdWxlcy9iYXNlNjQtZGVjb2RlL2Jhc2U2NC1kZWNvZGUuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxnQkFBQTtBQUNGOztBQUVBO0VBQ0UsbUJBQUE7QUFDRjs7QUFFQTtFQUNFLDhCQUFBO0FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIuZGl2LWxhYmVsIHtcbiAgZm9udC1zaXplOiBsYXJnZTtcbn1cblxuLmRpdi1ib3JkZXIge1xuICBib3JkZXItcmFkaXVzOiAxMHB4O1xufVxuXG5bY29udGVudGVkaXRhYmxlXTpmb2N1cyB7XG4gIG91dGxpbmU6IDBweCBzb2xpZCB0cmFuc3BhcmVudDtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
});

/***/ }),

/***/ 935:
/*!***************************************************************!*\
  !*** ./src/app/modules/base64-decode/base64-decode.module.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Base64DecodeModule: () => (/* binding */ Base64DecodeModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _base64_decode_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base64-decode-routing.module */ 2985);
/* harmony import */ var _base64_decode_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./base64-decode.component */ 6333);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/button */ 895);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 1699);
var _class;





class Base64DecodeModule {}
_class = Base64DecodeModule;
_class.ɵfac = function Base64DecodeModule_Factory(t) {
  return new (t || _class)();
};
_class.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
  type: _class
});
_class.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _base64_decode_routing_module__WEBPACK_IMPORTED_MODULE_0__.Base64DecodeRoutingModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_4__.MatButtonModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](Base64DecodeModule, {
    declarations: [_base64_decode_component__WEBPACK_IMPORTED_MODULE_1__.Base64DecodeComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _base64_decode_routing_module__WEBPACK_IMPORTED_MODULE_0__.Base64DecodeRoutingModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_4__.MatButtonModule]
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

/***/ 4215:
/*!*******************************************************************!*\
  !*** ./src/environments/component-config/base64-decode/config.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   componentConfig: () => (/* binding */ componentConfig),
/* harmony export */   descriptionData: () => (/* binding */ descriptionData)
/* harmony export */ });
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/environments/environment */ 553);
/* harmony import */ var src_environments_tools_directory_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/environments/tools-directory-config */ 6636);


const navigationUrl = '/tools/base64-decode';
const pageTitle = 'Base64 to File Decoder: Convert Base64 to Any File Format';
const pageDescription = 'Convert Base64 to any file format with ease with our free online Base64 to file decoder tool. Decode Base64 to Image, Text, PDF and File.';
const imageUrl = `${src_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.screenshotsBaseUrl}/base64-decode.png`;
const keywords = 'online Base64 to file decoder,decode Base64 to file,Base64 to file decoder tool,Base64 decoding,Base64 encoding,Base64 secure,Base64 transmission,Base64 storage,free Base64 to file decoder,no download required,supports all Base64 encoding schemes,supports all file formats,easy to use,Base64 decoding scheme,store decoded files securely, Base64 to image, Base64 to text, Base64 to pdf';
const relatedTools = [src_environments_tools_directory_config__WEBPACK_IMPORTED_MODULE_1__.ApplicationIds.BASE64_ENCODE];
const componentConfig = {
  mainHeading: 'Free Online Base64 to File Decoder: Convert Base64 to Image, Text, PDF and File',
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
  relatedTools: relatedTools.map(tool => src_environments_tools_directory_config__WEBPACK_IMPORTED_MODULE_1__.applicationConfig.get(tool)),
  tags: keywords.split(',').map(word => word.trim()),
  icons: []
};
const descriptionData = [{
  heading: 'What is Base64 Decoding?',
  blockData: ['Base64 decoding is the process of converting a Base64 encoded string back to binary data. Base64 encoding is a way to convert binary data into a string of ASCII characters. This is useful for storing and transmitting binary data in text-based formats, such as email or XML.']
}, {
  heading: 'Why Use a Base64 to File Decoder?',
  listData: ['To decode Base64 encoded files. Base64 encoded files are often used to store and transmit binary files in text-based formats. A Base64 to file decoder can be used to decode these files back to their original binary form.', 'To debug Base64 encoded files. If you are having trouble with a Base64 encoded file, a Base64 to file decoder can be used to debug the file. This can help you to identify and fix any problems with the file.', 'To learn more about Base64 encoding. Base64 encoding is a powerful data format, but it can be difficult to learn. A Base64 to file decoder can be used to learn more about Base64 encoding by displaying the decoded data in its original binary form.']
}, {
  heading: 'Features of Our Online Base64 to File Decoder Tool',
  listData: ['Free to use. No need to pay or sign up for an account.', 'No download required. Decode your Base64 data directly from your web browser.', 'Supports all Base64 encoding schemes. Our decoder supports all Base64 encoding schemes, including standard Base64, URL-safe Base64, and MIME Base64.', 'Supports all file formats. Our decoder can decode Base64 encoded data into any file format, including text files, image files, video files, and audio files.', 'Easy to use. Simply paste your Base64 encoded data into the editor and select the output file format. Then, click the "Decode" button.', 'Customizable settings. You can customize the settings of our decoder to match your personal preferences.']
}, {
  heading: 'How to Use Our Online Base64 to File Decoder Tool',
  listData: ['Paste your Base64 encoded data into the editor.', 'Click the "Decode" button.', 'Download your decoded file by clicking the "Download" button.']
}, {
  heading: 'Tips for Using a Base64 to File Decoder',
  listData: ['Choose a secure Base64 to file decoder. Make sure to choose a Base64 to file decoder that is secure and that will not leak your data.', 'Use a consistent decoding scheme. Choose a Base64 decoding scheme and use it consistently throughout your project. This will make it easier to decode your data later.', 'Store your decoded files securely. Once you have decoded your files, make sure to store them securely. Decoded files are still vulnerable to attack, so it is important to store them securely.']
}, {
  blockData: ['Our free online Base64 to file decoder tool is a great way to convert Base64 to any file format with ease. It is easy to use and supports all Base64 encoding schemes and file formats. With our decoder, you can easily decode Base64 encoded files, debug Base64 encoded files, and learn more about Base64 encoding.']
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
//# sourceMappingURL=src_app_modules_base64-decode_base64-decode_module_ts.8ba4f322c52d420e.js.map