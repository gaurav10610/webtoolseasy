"use strict";
exports.id = 934;
exports.ids = [934];
exports.modules = {

/***/ 91221:
/*!********************************!*\
  !*** ./src/app/@types/file.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FileDataType: () => (/* binding */ FileDataType)
/* harmony export */ });
var FileDataType = /*#__PURE__*/function (FileDataType) {
  FileDataType["IMAGE"] = "image";
  FileDataType["VIDEO"] = "video";
  return FileDataType;
}(FileDataType || {});

/***/ }),

/***/ 13136:
/*!*******************************************************************************!*\
  !*** ./src/app/modules/image-compression/image-compression-routing.module.ts ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ImageCompressionRoutingModule: () => (/* binding */ ImageCompressionRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 68804);
/* harmony import */ var _image_compression_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./image-compression.component */ 77178);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 59936);




const routes = [{
  path: '',
  component: _image_compression_component__WEBPACK_IMPORTED_MODULE_0__.ImageCompressionComponent
}];
let ImageCompressionRoutingModule = /*#__PURE__*/(() => {
  var _class;
  class ImageCompressionRoutingModule {}
  _class = ImageCompressionRoutingModule;
  _class.ɵfac = function ImageCompressionRoutingModule_Factory(t) {
    return new (t || _class)();
  };
  _class.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
    type: _class
  });
  _class.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
  return ImageCompressionRoutingModule;
})();
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](ImageCompressionRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
})();

/***/ }),

/***/ 77178:
/*!**************************************************************************!*\
  !*** ./src/app/modules/image-compression/image-compression.component.ts ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ImageCompressionComponent: () => (/* binding */ ImageCompressionComponent)
/* harmony export */ });
/* harmony import */ var _Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 70734);
/* harmony import */ var src_app_types_file__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/@types/file */ 91221);
/* harmony import */ var src_app_service_util_logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/service/util/logger */ 75126);
/* harmony import */ var src_environments_component_config_image_compression_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/environments/component-config/image-compression/config */ 49609);
/* harmony import */ var src_app_service_ffmpeg_lib_util__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/service/ffmpeg/lib/util */ 7306);
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/environments/environment */ 56316);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 59936);
/* harmony import */ var src_app_service_platform_metadata_platform_metadata_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/service/platform-metadata/platform-metadata.service */ 26363);
/* harmony import */ var src_app_service_file_file_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/service/file/file.service */ 88280);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ 34228);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/icon */ 59049);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/button */ 63490);
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/tooltip */ 30671);
/* harmony import */ var _angular_material_slider__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/slider */ 29134);














const _c0 = ["inputFiles"];
function ImageCompressionComponent_div_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("drop", function ImageCompressionComponent_div_3_Template_div_drop_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r12);
      const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r11.dropHandler($event));
    })("dragover", function ImageCompressionComponent_div_3_Template_div_dragover_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r12);
      const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r13.dragOverHandler($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](1, "mat-icon", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](2, "collections");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](3, "span", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](4, "Drag & drop images here");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](5, "span", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](6, "or");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](7, "button", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function ImageCompressionComponent_div_3_Template_button_click_7_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r12);
      const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r14.openFileDialog());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](8, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](9, "file_upload");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](10, "Browse For Images ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
  }
}
function ImageCompressionComponent_div_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 14)(1, "button", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function ImageCompressionComponent_div_4_Template_button_click_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r16);
      const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r15.openFileDialog());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](2, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](3, "file_upload");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](4, "Select More Images ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
  }
}
function ImageCompressionComponent_span_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "span", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1, "Uploaded Images (Select Image to Compress)");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
}
function ImageCompressionComponent_div_6_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r20 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function ImageCompressionComponent_div_6_div_1_Template_div_click_0_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r20);
      const imageFile_r18 = restoredCtx.$implicit;
      const ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r19.selectCurrentFile(imageFile_r18.id));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](1, "img", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](2, "div", 20)(3, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const imageFile_r18 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpropertyInterpolate"]("src", imageFile_r18.dataURI, _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](imageFile_r18 == null ? null : imageFile_r18.name);
  }
}
function ImageCompressionComponent_div_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](1, ImageCompressionComponent_div_6_div_1_Template, 5, 2, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngForOf", ctx_r4.fileList);
  }
}
function ImageCompressionComponent_span_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "span", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1, "Compression Settings");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
}
function ImageCompressionComponent_div_8_div_19_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 27)(1, "span", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](2, "Compress Progress:");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](3, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"]("", ctx_r21.currentFile.compressProgress, " %");
  }
}
function ImageCompressionComponent_div_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r23 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 21)(1, "div", 22)(2, "span", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](3, "Compression Level:");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](4, "mat-slider", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("input", function ImageCompressionComponent_div_8_Template_mat_slider_input_4_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r23);
      const ctx_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r22.onCompressionRateChange($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](5, "input", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](6, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](8, "div", 26)(9, "div", 27)(10, "span", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](11, "Original File Size:");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](12, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](13);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](14, "div", 27)(15, "span", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](16, "Max Compressed File Size:");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](17, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](18);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](19, ImageCompressionComponent_div_8_div_19_Template, 5, 1, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("value", ctx_r6.currentFile.compressionRate);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"]("", ctx_r6.currentFile.compressionRate, "%");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](ctx_r6.formatBytes(ctx_r6.currentFile.file.size));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", ctx_r6.formatBytes(ctx_r6.currentFile.maxFileSize), "");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r6.currentFile.inProgress || ctx_r6.currentFile.isCompressed);
  }
}
function ImageCompressionComponent_div_9_button_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r26 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "button", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function ImageCompressionComponent_div_9_button_1_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r26);
      const ctx_r25 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r25.downloadImage());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1, " Download Image ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
}
function ImageCompressionComponent_div_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r28 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](1, ImageCompressionComponent_div_9_button_1_Template, 2, 0, "button", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](2, "button", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function ImageCompressionComponent_div_9_Template_button_click_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r28);
      const ctx_r27 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r27.compressImage());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](3, " Compress Image ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r7.currentFile.isCompressed);
  }
}
function ImageCompressionComponent_span_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "span", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1, "Compressed Image Preview");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
}
function ImageCompressionComponent_div_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](1, "img", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpropertyInterpolate"]("src", ctx_r9.currentFile.dataURI, _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵsanitizeUrl"]);
  }
}
function ImageCompressionComponent_div_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](1, "img", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpropertyInterpolate"]("src", ctx_r10.currentFile.compressedImageData, _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵsanitizeUrl"]);
  }
}
let ImageCompressionComponent = /*#__PURE__*/(() => {
  var _class;
  class ImageCompressionComponent {
    constructor(renderer, zoneRef, platformMetaDataService, fileService) {
      this.renderer = renderer;
      this.zoneRef = zoneRef;
      this.platformMetaDataService = platformMetaDataService;
      this.fileService = fileService;
      this.fileList = [];
      this.validImageFormats = '.jpg,.jpeg,.png,.webp,.bmp';
      this.applicationConfig = src_environments_component_config_image_compression_config__WEBPACK_IMPORTED_MODULE_3__.componentConfig;
      this.descriptionData = src_environments_component_config_image_compression_config__WEBPACK_IMPORTED_MODULE_3__.descriptionData;
      this.currentFile = undefined;
    }
    ngAfterViewInit() {
      if (this.platformMetaDataService.isPlatformBrowser) {
        (0,src_app_service_ffmpeg_lib_util__WEBPACK_IMPORTED_MODULE_4__.importScript)(src_environments_environment__WEBPACK_IMPORTED_MODULE_5__.environment.imageCompressionLibUrl);
      }
    }
    openFileDialog() {
      var _this = this;
      return (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
        _this.renderer.selectRootElement(_this.inputFiles.nativeElement, true).click();
      })();
    }
    /**
     * file drop event handler
     * @param event
     */
    dropHandler(event) {
      var _this2 = this;
      return (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
        // Prevent default behavior (Prevent file from being opened)
        event.preventDefault();
        if (event.dataTransfer.items) {
          // Use DataTransferItemList interface to access the file(s)
          [...event.dataTransfer.items].filter(item => item.kind === 'file').map(item => item.getAsFile()).forEach( /*#__PURE__*/function () {
            var _ref = (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (file) {
              return yield _this2.addFileToCompress(file);
            });
            return function (_x) {
              return _ref.apply(this, arguments);
            };
          }());
        } else {
          // Use DataTransfer interface to access the file(s)
          [...event.dataTransfer.files].forEach( /*#__PURE__*/function () {
            var _ref2 = (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (file) {
              return yield _this2.addFileToCompress(file);
            });
            return function (_x2) {
              return _ref2.apply(this, arguments);
            };
          }());
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
    addFileToCompress(file) {
      var _this3 = this;
      return (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
        _this3.zoneRef.run(() => {
          const imageFileData = {
            id: crypto.randomUUID(),
            file: file,
            type: src_app_types_file__WEBPACK_IMPORTED_MODULE_1__.FileDataType.IMAGE,
            inProgress: false,
            compressProgress: 0,
            isCompressed: false,
            name: file.name,
            compressOptions: {
              signal: new AbortController().signal,
              maxSizeMB: 0.9 * file.size / 1024 / 1024,
              useWebWorker: true
            },
            compressionRate: 10,
            maxFileSize: 0.9 * file.size
          };
          _this3.fileList.push(imageFileData);
          _this3.fileService.readFileAsURL(imageFileData.id, file, _this3.readImageDataURI.bind(_this3));
        });
      })();
    }
    readImageDataURI(id, imageDataURI) {
      const fileData = this.fileList.find(fileData => fileData.id === id);
      fileData.dataURI = imageDataURI;
    }
    selectFiles(event) {
      var _this4 = this;
      return (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
        for (const file of event.target.files) {
          yield _this4.addFileToCompress(file);
        }
        // set first file as current file
        _this4.currentFile = _this4.fileList[0];
      })();
    }
    startCompressAll() {
      var _this5 = this;
      return (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
        _this5.fileList.forEach(imageFileData => _this5.compressImage(imageFileData));
      })();
    }
    compressImage(fileData) {
      var _this6 = this;
      return (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
        const imageFileData = fileData ? fileData : _this6.currentFile;
        _this6.zoneRef.run( /*#__PURE__*/(0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
          imageFileData.inProgress = true;
          imageFileData.compressProgress = 0;
          imageFileData.error = undefined;
          try {
            imageFileData.compressedData = yield imageCompression(imageFileData.file, {
              ...imageFileData.compressOptions,
              onProgress: progress => {
                imageFileData.compressProgress = progress;
              }
            });
            imageFileData.isCompressed = true;
            imageFileData.inProgress = false;
            const urlCreator = window.URL || window.webkitURL;
            imageFileData.compressedImageData = urlCreator.createObjectURL(imageFileData.compressedData);
          } catch (error) {
            src_app_service_util_logger__WEBPACK_IMPORTED_MODULE_2__.LogUtils.error(`error while compressing image with name: ${imageFileData.file.name}`);
            imageFileData.inProgress = false;
            imageFileData.isCompressed = false;
            imageFileData.error = '* compression error';
          }
        }));
      })();
    }
    downloadImage(fileData) {
      var _this7 = this;
      return (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
        const imageFileData = fileData ? fileData : _this7.currentFile;
        const fileName = imageFileData.name.substring(0, imageFileData.file.name.lastIndexOf('.')) || imageFileData.name;
        const extension = imageFileData.file.name.split('.').pop();
        yield _this7.downloadFile(`${fileName}-compressed.${extension}`, imageFileData.compressedData);
      })();
    }
    downloadFile(fileName, fileContent) {
      var _this8 = this;
      return (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
        const downloadAnchor = _this8.renderer.createElement('a');
        _this8.renderer.setProperty(downloadAnchor, 'href', URL.createObjectURL(fileContent));
        _this8.renderer.setProperty(downloadAnchor, 'download', fileName);
        downloadAnchor.click();
      })();
    }
    onCompressionRateChange(event) {
      this.currentFile.compressionRate = event.target.value;
      const compressionRatio = 100 - event.target.value;
      this.currentFile.maxFileSize = compressionRatio / 100 * this.currentFile.file.size;
    }
    /**
     * format size in to higher terms
     * @param bytes
     * @param decimals
     * @returns
     */
    formatBytes(bytes, decimals = 2) {
      if (bytes === 0) return '0 Bytes';
      const k = 1024;
      const dm = decimals < 0 ? 0 : decimals;
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }
    selectCurrentFile(id) {
      const fileData = this.fileList.find(fileData => fileData.id === id);
      this.currentFile = fileData;
    }
  }
  _class = ImageCompressionComponent;
  _class.ɵfac = function ImageCompressionComponent_Factory(t) {
    return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_8__.Renderer2), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_8__.NgZone), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](src_app_service_platform_metadata_platform_metadata_service__WEBPACK_IMPORTED_MODULE_6__.PlatformMetadataService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](src_app_service_file_file_service__WEBPACK_IMPORTED_MODULE_7__.FileService));
  };
  _class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineComponent"]({
    type: _class,
    selectors: [["app-image-compression"]],
    viewQuery: function ImageCompressionComponent_Query(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵviewQuery"](_c0, 5);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵloadQuery"]()) && (ctx.inputFiles = _t.first);
      }
    },
    decls: 13,
    vars: 11,
    consts: [[1, "flex-display", "flex-column-flow", "flex-align-center", "flex-gap-xlarge"], ["type", "file", "multiple", "", 2, "display", "none", 3, "accept", "change"], ["inputFiles", ""], ["class", "flex-display flex-column-flow flex-center flex-align-center border-grey full-width flex-gap-medium file-drop-area", 3, "drop", "dragover", 4, "ngIf"], ["class", "flex-display flex-gap-medium", "style", "align-self: flex-end", 4, "ngIf"], ["style", "font-size: large", 4, "ngIf"], ["class", "flex-display flex-align-center full-width flex-gap-large auto-scroll", 4, "ngIf"], ["class", "flex-display flex-center flex-align-center full-width flex-gap-medium", "style", "flex-wrap: wrap", 4, "ngIf"], ["class", "flex-display flex-gap-medium", 4, "ngIf"], ["class", "flex-display flex-center flex-align-center full-width preview-area", 4, "ngIf"], [1, "flex-display", "flex-column-flow", "flex-center", "flex-align-center", "border-grey", "full-width", "flex-gap-medium", "file-drop-area", 3, "drop", "dragover"], [2, "transform", "scale(2)"], [1, "header-font", 2, "font-size", "large"], ["mat-stroked-button", "", "color", "primary", "matTooltip", "select images to compress", 3, "click"], [1, "flex-display", "flex-gap-medium", 2, "align-self", "flex-end"], [2, "font-size", "large"], [1, "flex-display", "flex-align-center", "full-width", "flex-gap-large", "auto-scroll"], ["class", "flex-display flex-column-flow flex-center border-grey shadow-grey thumbnail-container pointer-cursor", 3, "click", 4, "ngFor", "ngForOf"], [1, "flex-display", "flex-column-flow", "flex-center", "border-grey", "shadow-grey", "thumbnail-container", "pointer-cursor", 3, "click"], ["mat-card-image", "", "alt", "selected image for crop", 3, "src"], [1, "full-width", "flex-display", "flex-row-flow", "flex-center", 2, "overflow", "hidden"], [1, "flex-display", "flex-center", "flex-align-center", "full-width", "flex-gap-medium", 2, "flex-wrap", "wrap"], [1, "flex-display", "flex-align-center", "flex-gap-medium"], [1, "bold-text", 2, "margin-right", "5px"], ["min", "10", "max", "80", "step", "1", "color", "primary", 3, "input"], ["matSliderThumb", "", 3, "value"], [1, "flex-display", "flex-center", "flex-align-center", "flex-gap-medium", 2, "flex-wrap", "wrap"], [1, "flex-display", "flex-gap-small"], [1, "bold-text"], ["class", "flex-display flex-gap-small", 4, "ngIf"], [1, "flex-display", "flex-gap-medium"], ["mat-stroked-button", "", "color", "primary", "matTooltip", "download image button", 3, "click", 4, "ngIf"], ["mat-stroked-button", "", "color", "primary", "matTooltip", "compress image button", 3, "click"], ["mat-stroked-button", "", "color", "primary", "matTooltip", "download image button", 3, "click"], [1, "flex-display", "flex-center", "flex-align-center", "full-width", "preview-area"], ["id", "orignalImage", "alt", "cropped image", 2, "max-width", "100%", "max-height", "100%", "align-self", "flex-start", 3, "src"], ["id", "compressedImage", "alt", "cropped image", 2, "max-width", "100%", "max-height", "100%", "align-self", "flex-start", 3, "src"]],
    template: function ImageCompressionComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 0)(1, "input", 1, 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("change", function ImageCompressionComponent_Template_input_change_1_listener($event) {
          return ctx.selectFiles($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](3, ImageCompressionComponent_div_3_Template, 11, 0, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](4, ImageCompressionComponent_div_4_Template, 5, 0, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](5, ImageCompressionComponent_span_5_Template, 2, 0, "span", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](6, ImageCompressionComponent_div_6_Template, 2, 1, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](7, ImageCompressionComponent_span_7_Template, 2, 0, "span", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](8, ImageCompressionComponent_div_8_Template, 20, 5, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](9, ImageCompressionComponent_div_9_Template, 4, 1, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](10, ImageCompressionComponent_span_10_Template, 2, 0, "span", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](11, ImageCompressionComponent_div_11_Template, 2, 1, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](12, ImageCompressionComponent_div_12_Template, 2, 1, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("accept", ctx.validImageFormats);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.fileList.length === 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.fileList.length > 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.fileList.length > 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.fileList.length > 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.currentFile);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.currentFile);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.currentFile);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.currentFile);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.currentFile && !ctx.currentFile.isCompressed);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.currentFile && ctx.currentFile.isCompressed);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_9__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_9__.NgIf, _angular_material_icon__WEBPACK_IMPORTED_MODULE_10__.MatIcon, _angular_material_button__WEBPACK_IMPORTED_MODULE_11__.MatButton, _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_12__.MatTooltip, _angular_material_slider__WEBPACK_IMPORTED_MODULE_13__.MatSlider, _angular_material_slider__WEBPACK_IMPORTED_MODULE_13__.MatSliderThumb],
    styles: [".file-drop-area[_ngcontent-%COMP%] {\n  border-radius: 10px;\n  padding-top: 30px;\n  padding-bottom: 30px;\n}\n\n.thumbnail-container[_ngcontent-%COMP%] {\n  width: 198px;\n  height: 244px;\n  padding: 5px;\n}\n\n.preview-area[_ngcontent-%COMP%] {\n  height: 600px;\n}\n\n@media screen and (max-width: 735px) {\n  .preview-area[_ngcontent-%COMP%] {\n    height: 250px;\n  }\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvbW9kdWxlcy9pbWFnZS1jb21wcmVzc2lvbi9pbWFnZS1jb21wcmVzc2lvbi5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLG1CQUFBO0VBQ0EsaUJBQUE7RUFDQSxvQkFBQTtBQUNGOztBQUVBO0VBQ0UsWUFBQTtFQUNBLGFBQUE7RUFDQSxZQUFBO0FBQ0Y7O0FBRUE7RUFDRSxhQUFBO0FBQ0Y7O0FBRUE7RUFDRTtJQUNFLGFBQUE7RUFDRjtBQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLmZpbGUtZHJvcC1hcmVhIHtcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgcGFkZGluZy10b3A6IDMwcHg7XG4gIHBhZGRpbmctYm90dG9tOiAzMHB4O1xufVxuXG4udGh1bWJuYWlsLWNvbnRhaW5lciB7XG4gIHdpZHRoOiAxOThweDtcbiAgaGVpZ2h0OiAyNDRweDtcbiAgcGFkZGluZzogNXB4O1xufVxuXG4ucHJldmlldy1hcmVhIHtcbiAgaGVpZ2h0OiA2MDBweDtcbn1cblxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogNzM1cHgpIHtcbiAgLnByZXZpZXctYXJlYSB7XG4gICAgaGVpZ2h0OiAyNTBweDtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
  });
  return ImageCompressionComponent;
})();

/***/ }),

/***/ 88934:
/*!***********************************************************************!*\
  !*** ./src/app/modules/image-compression/image-compression.module.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ImageCompressionModule: () => (/* binding */ ImageCompressionModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 34228);
/* harmony import */ var _image_compression_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./image-compression-routing.module */ 13136);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/button */ 63490);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/icon */ 59049);
/* harmony import */ var _image_compression_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./image-compression.component */ 77178);
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/tooltip */ 30671);
/* harmony import */ var _angular_material_slider__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/slider */ 29134);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 59936);








let ImageCompressionModule = /*#__PURE__*/(() => {
  var _class;
  class ImageCompressionModule {}
  _class = ImageCompressionModule;
  _class.ɵfac = function ImageCompressionModule_Factory(t) {
    return new (t || _class)();
  };
  _class.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
    type: _class
  });
  _class.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _image_compression_routing_module__WEBPACK_IMPORTED_MODULE_0__.ImageCompressionRoutingModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__.MatIconModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_5__.MatButtonModule, _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_6__.MatTooltipModule, _angular_material_slider__WEBPACK_IMPORTED_MODULE_7__.MatSliderModule]
  });
  return ImageCompressionModule;
})();
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](ImageCompressionModule, {
    declarations: [_image_compression_component__WEBPACK_IMPORTED_MODULE_1__.ImageCompressionComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _image_compression_routing_module__WEBPACK_IMPORTED_MODULE_0__.ImageCompressionRoutingModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__.MatIconModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_5__.MatButtonModule, _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_6__.MatTooltipModule, _angular_material_slider__WEBPACK_IMPORTED_MODULE_7__.MatSliderModule]
  });
})();

/***/ }),

/***/ 47822:
/*!**************************************************!*\
  !*** ./src/app/service/ffmpeg/lib/util/const.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HeaderContentLength: () => (/* binding */ HeaderContentLength)
/* harmony export */ });
const HeaderContentLength = 'Content-Length';

/***/ }),

/***/ 45784:
/*!***************************************************!*\
  !*** ./src/app/service/ffmpeg/lib/util/errors.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ERROR_INCOMPLETED_DOWNLOAD: () => (/* binding */ ERROR_INCOMPLETED_DOWNLOAD),
/* harmony export */   ERROR_RESPONSE_BODY_READER: () => (/* binding */ ERROR_RESPONSE_BODY_READER)
/* harmony export */ });
const ERROR_RESPONSE_BODY_READER = new Error('failed to get response body reader');
const ERROR_INCOMPLETED_DOWNLOAD = new Error('failed to complete download');

/***/ }),

/***/ 7306:
/*!**************************************************!*\
  !*** ./src/app/service/ffmpeg/lib/util/index.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   downloadWithProgress: () => (/* binding */ downloadWithProgress),
/* harmony export */   fetchFile: () => (/* binding */ fetchFile),
/* harmony export */   importScript: () => (/* binding */ importScript),
/* harmony export */   toBlobURL: () => (/* binding */ toBlobURL)
/* harmony export */ });
/* harmony import */ var _Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 70734);
/* harmony import */ var _errors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./errors */ 45784);
/* harmony import */ var _const__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./const */ 47822);



const readFromBlobOrFile = blob => new Promise((resolve, reject) => {
  const fileReader = new FileReader();
  fileReader.onload = () => {
    const {
      result
    } = fileReader;
    if (result instanceof ArrayBuffer) {
      resolve(new Uint8Array(result));
    } else {
      resolve(new Uint8Array());
    }
  };
  fileReader.onerror = event => {
    reject(Error(`File could not be read! Code=${event?.target?.error?.code || -1}`));
  };
  fileReader.readAsArrayBuffer(blob);
});
/**
 * An util function to fetch data from url string, base64, URL, File or Blob format.
 *
 * Examples:
 * ```ts
 * // URL
 * await fetchFile("http://localhost:3000/video.mp4");
 * // base64
 * await fetchFile("data:<type>;base64,wL2dvYWwgbW9yZ...");
 * // URL
 * await fetchFile(new URL("video.mp4", import.meta.url));
 * // File
 * fileInput.addEventListener('change', (e) => {
 *   await fetchFile(e.target.files[0]);
 * });
 * // Blob
 * const blob = new Blob(...);
 * await fetchFile(blob);
 * ```
 */
const fetchFile = /*#__PURE__*/function () {
  var _ref = (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (file) {
    let data;
    if (typeof file === 'string') {
      /* From base64 format */
      if (/data:_data\/([a-zA-Z]*);base64,([^"]*)/.test(file)) {
        data = atob(file.split(',')[1]).split('').map(c => c.charCodeAt(0));
        /* From remote server/URL */
      } else {
        data = yield (yield fetch(file)).arrayBuffer();
      }
    } else if (file instanceof URL) {
      data = yield (yield fetch(file)).arrayBuffer();
    } else if (file instanceof File || file instanceof Blob) {
      data = yield readFromBlobOrFile(file);
    } else {
      return new Uint8Array();
    }
    return new Uint8Array(data);
  });
  return function fetchFile(_x) {
    return _ref.apply(this, arguments);
  };
}();
/**
 * importScript dynamically import a script, useful when you
 * want to use different versions of ffmpeg.wasm based on environment.
 *
 * Example:
 *
 * ```ts
 * await importScript("http://localhost:3000/ffmpeg");
 * ```
 */
const importScript = /*#__PURE__*/function () {
  var _ref2 = (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (url) {
    return new Promise(resolve => {
      const script = document.createElement('script');
      const eventHandler = () => {
        script.removeEventListener('load', eventHandler);
        resolve();
      };
      script.src = url;
      script.type = 'text/javascript';
      script.addEventListener('load', eventHandler);
      document.getElementsByTagName('head')[0].appendChild(script);
    });
  });
  return function importScript(_x2) {
    return _ref2.apply(this, arguments);
  };
}();
/**
 * Download content of a URL with progress.
 *
 * Progress only works when Content-Length is provided by the server.
 *
 */
const downloadWithProgress = /*#__PURE__*/function () {
  var _ref3 = (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (url, cb) {
    const resp = yield fetch(url);
    let buf;
    try {
      // Set total to -1 to indicate that there is not Content-Type Header.
      const total = parseInt(resp.headers.get(_const__WEBPACK_IMPORTED_MODULE_2__.HeaderContentLength) || '-1');
      const reader = resp.body?.getReader();
      if (!reader) throw _errors__WEBPACK_IMPORTED_MODULE_1__.ERROR_RESPONSE_BODY_READER;
      const chunks = [];
      let received = 0;
      for (;;) {
        const {
          done,
          value
        } = yield reader.read();
        const delta = value ? value.length : 0;
        if (done) {
          if (total != -1 && total !== received) throw _errors__WEBPACK_IMPORTED_MODULE_1__.ERROR_INCOMPLETED_DOWNLOAD;
          cb && cb({
            url,
            total,
            received,
            delta,
            done
          });
          break;
        }
        chunks.push(value);
        received += delta;
        cb && cb({
          url,
          total,
          received,
          delta,
          done
        });
      }
      const data = new Uint8Array(received);
      let position = 0;
      for (const chunk of chunks) {
        data.set(chunk, position);
        position += chunk.length;
      }
      buf = data.buffer;
    } catch (e) {
      console.log(`failed to send download progress event: `, e);
      // Fetch arrayBuffer directly when it is not possible to get progress.
      buf = yield resp.arrayBuffer();
      cb && cb({
        url,
        total: buf.byteLength,
        received: buf.byteLength,
        delta: 0,
        done: true
      });
    }
    return buf;
  });
  return function downloadWithProgress(_x3, _x4) {
    return _ref3.apply(this, arguments);
  };
}();
/**
 * toBlobURL fetches data from an URL and return a blob URL.
 *
 * Example:
 *
 * ```ts
 * await toBlobURL("http://localhost:3000/ffmpeg", "text/javascript");
 * ```
 */
const toBlobURL = /*#__PURE__*/function () {
  var _ref4 = (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (url, mimeType, progress = false, cb) {
    const buf = progress ? yield downloadWithProgress(url, cb) : yield (yield fetch(url)).arrayBuffer();
    const blob = new Blob([buf], {
      type: mimeType
    });
    return URL.createObjectURL(blob);
  });
  return function toBlobURL(_x5, _x6) {
    return _ref4.apply(this, arguments);
  };
}();

/***/ }),

/***/ 88280:
/*!**********************************************!*\
  !*** ./src/app/service/file/file.service.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FileService: () => (/* binding */ FileService)
/* harmony export */ });
/* harmony import */ var _Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 70734);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 59936);


let FileService = /*#__PURE__*/(() => {
  var _class;
  class FileService {
    /**
     * read file contents as text
     * @param file
     * @param callback
     */
    readFileAsText(file, callback) {
      return (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
        const fileReader = new FileReader();
        fileReader.onload = () => callback(fileReader.result);
        fileReader.readAsText(file);
      })();
    }
    /**
     * read file contents as text
     * @param file
     * @param callback
     */
    readFileAsURL(id, file, callback) {
      return (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
        const fileReader = new FileReader();
        fileReader.onload = () => callback(id, fileReader.result);
        fileReader.readAsDataURL(file);
      })();
    }
    /**
     * download a file with specified name
     * @param fileName
     * @param fileContent
     * @param renderer
     */
    downloadFile(fileName, fileContent, renderer) {
      return (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
        const downloadAnchor = renderer.createElement('a');
        renderer.setProperty(downloadAnchor, 'href', URL.createObjectURL(fileContent));
        renderer.setProperty(downloadAnchor, 'download', fileName);
        downloadAnchor.click();
      })();
    }
    getFormattedFileName(fileName) {
      return fileName.replace(/ /g, '_');
    }
    getFileExtension(formattedName) {
      return formattedName.split('.').pop();
    }
    getPlainFileName(fileName) {
      return fileName.substring(0, fileName.lastIndexOf('.')) || fileName;
    }
    /**
     * data uri to base64
     * @param dataURI
     * @returns
     */
    dataUriToBase64(dataURI) {
      return dataURI.split(',')[1];
    }
  }
  _class = FileService;
  _class.ɵfac = function FileService_Factory(t) {
    return new (t || _class)();
  };
  _class.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
    token: _class,
    factory: _class.ɵfac,
    providedIn: 'root'
  });
  return FileService;
})();

/***/ }),

/***/ 75126:
/*!****************************************!*\
  !*** ./src/app/service/util/logger.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LogUtils: () => (/* binding */ LogUtils)
/* harmony export */ });
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/environments/environment */ 56316);

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

/***/ 49609:
/*!***********************************************************************!*\
  !*** ./src/environments/component-config/image-compression/config.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   componentConfig: () => (/* binding */ componentConfig),
/* harmony export */   descriptionData: () => (/* binding */ descriptionData)
/* harmony export */ });
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/environments/environment */ 56316);
/* harmony import */ var src_environments_tools_directory_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/environments/tools-directory-config */ 12313);


const navigationUrl = '/tools/image-compress';
const pageTitle = 'Free Image Compressor: Reduce the Size of Your Photos Online';
const pageDescription = 'Compress your images for free with our online image compressor. Reduce image file size without losing quality, perfect for websites, social media, and more.';
const imageUrl = `${src_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.screenshotsBaseUrl}/image-compressor.png`;
const keywords = 'free image compressor,online image compressor,reduce image file size,optimize images for web,share images online,compress JPEG images,compress PNG images,compress GIF images,compress BMP images,image compression,image optimization,image resizer,image optimizer,web-optimized images,picture compressor,pic compressor,photo size reducer,reduce resolution of image';
const relatedTools = [src_environments_tools_directory_config__WEBPACK_IMPORTED_MODULE_1__.ApplicationIds.IMAGE_CROPPER];
const componentConfig = {
  mainHeading: 'Free Online Image Compressor: Compress JPEG, PNG, WEBP & BMP Images',
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
  icons: []
};
const descriptionData = [{
  heading: 'Why Use an Image Compressor?',
  listData: [`To improve website performance. Smaller image files load faster, which can improve your website's loading speed and SEO.`, 'To save storage space. Compressed images take up less space on your computer or server.', 'To share images online. Many social media platforms and other websites have image size restrictions, so compressing your images can help you share them without any problems.']
}, {
  heading: 'Features of Our Free Online Image Compressor',
  listData: ['Free to use. No need to pay or sign up for an account.', 'No download required. Compress your images directly from your web browser.', 'Supports multiple image formats. Compress JPEG, PNG, WEBP & BMP images.', 'Reduces image file size without losing quality. Our image compressor uses advanced algorithms to reduce file size without sacrificing quality.', 'Easy to use. Simply upload your images and click the "Compress" button.']
}, {
  heading: 'How to Use Our Free Online Image Compressor',
  listData: ['Go to our website and click the "Upload Images" button.', 'Select the images you want to compress.', 'Click the "Compress" button.', 'Download your compressed images.']
}, {
  heading: 'Tips for Using an Image Compressor',
  listData: ['Choose the right compression level. The higher the compression level, the smaller the file size will be, but the image quality may also decrease. Experiment with different compression levels to find the best balance between file size and quality.', 'Resize your images before compressing them. This can help to further reduce the file size without sacrificing quality.']
}, {
  blockData: ['Our free online image compressor is a great way to reduce image file size without losing quality. It is easy to use and supports multiple image formats. With our image compressor, you can improve website performance, save storage space, and share images online without any problems.']
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

/***/ 27047:
/*!************************************************************!*\
  !*** ./node_modules/@angular/cdk/fesm2022/collections.mjs ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ArrayDataSource: () => (/* binding */ ArrayDataSource),
/* harmony export */   DataSource: () => (/* binding */ DataSource),
/* harmony export */   SelectionModel: () => (/* binding */ SelectionModel),
/* harmony export */   UniqueSelectionDispatcher: () => (/* binding */ UniqueSelectionDispatcher),
/* harmony export */   _DisposeViewRepeaterStrategy: () => (/* binding */ _DisposeViewRepeaterStrategy),
/* harmony export */   _RecycleViewRepeaterStrategy: () => (/* binding */ _RecycleViewRepeaterStrategy),
/* harmony export */   _VIEW_REPEATER_STRATEGY: () => (/* binding */ _VIEW_REPEATER_STRATEGY),
/* harmony export */   getMultipleValuesInSingleSelectionError: () => (/* binding */ getMultipleValuesInSingleSelectionError),
/* harmony export */   isDataSource: () => (/* binding */ isDataSource)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ 85028);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 59936);



class DataSource {}
/** Checks whether an object is a data source. */
function isDataSource(value) {
  // Check if the value is a DataSource by observing if it has a connect function. Cannot
  // be checked as an `instanceof DataSource` since people could create their own sources
  // that match the interface, but don't extend DataSource. We also can't use `isObservable`
  // here, because of some internal apps.
  return value && typeof value.connect === 'function' && !(value instanceof rxjs__WEBPACK_IMPORTED_MODULE_0__.ConnectableObservable);
}

/** DataSource wrapper for a native array. */
class ArrayDataSource extends DataSource {
  constructor(_data) {
    super();
    this._data = _data;
  }
  connect() {
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_0__.isObservable)(this._data) ? this._data : (0,rxjs__WEBPACK_IMPORTED_MODULE_0__.of)(this._data);
  }
  disconnect() {}
}

/**
 * A repeater that destroys views when they are removed from a
 * {@link ViewContainerRef}. When new items are inserted into the container,
 * the repeater will always construct a new embedded view for each item.
 *
 * @template T The type for the embedded view's $implicit property.
 * @template R The type for the item in each IterableDiffer change record.
 * @template C The type for the context passed to each embedded view.
 */
class _DisposeViewRepeaterStrategy {
  applyChanges(changes, viewContainerRef, itemContextFactory, itemValueResolver, itemViewChanged) {
    changes.forEachOperation((record, adjustedPreviousIndex, currentIndex) => {
      let view;
      let operation;
      if (record.previousIndex == null) {
        const insertContext = itemContextFactory(record, adjustedPreviousIndex, currentIndex);
        view = viewContainerRef.createEmbeddedView(insertContext.templateRef, insertContext.context, insertContext.index);
        operation = 1 /* _ViewRepeaterOperation.INSERTED */;
      } else if (currentIndex == null) {
        viewContainerRef.remove(adjustedPreviousIndex);
        operation = 3 /* _ViewRepeaterOperation.REMOVED */;
      } else {
        view = viewContainerRef.get(adjustedPreviousIndex);
        viewContainerRef.move(view, currentIndex);
        operation = 2 /* _ViewRepeaterOperation.MOVED */;
      }

      if (itemViewChanged) {
        itemViewChanged({
          context: view?.context,
          operation,
          record
        });
      }
    });
  }
  detach() {}
}

/**
 * A repeater that caches views when they are removed from a
 * {@link ViewContainerRef}. When new items are inserted into the container,
 * the repeater will reuse one of the cached views instead of creating a new
 * embedded view. Recycling cached views reduces the quantity of expensive DOM
 * inserts.
 *
 * @template T The type for the embedded view's $implicit property.
 * @template R The type for the item in each IterableDiffer change record.
 * @template C The type for the context passed to each embedded view.
 */
class _RecycleViewRepeaterStrategy {
  constructor() {
    /**
     * The size of the cache used to store unused views.
     * Setting the cache size to `0` will disable caching. Defaults to 20 views.
     */
    this.viewCacheSize = 20;
    /**
     * View cache that stores embedded view instances that have been previously stamped out,
     * but don't are not currently rendered. The view repeater will reuse these views rather than
     * creating brand new ones.
     *
     * TODO(michaeljamesparsons) Investigate whether using a linked list would improve performance.
     */
    this._viewCache = [];
  }
  /** Apply changes to the DOM. */
  applyChanges(changes, viewContainerRef, itemContextFactory, itemValueResolver, itemViewChanged) {
    // Rearrange the views to put them in the right location.
    changes.forEachOperation((record, adjustedPreviousIndex, currentIndex) => {
      let view;
      let operation;
      if (record.previousIndex == null) {
        // Item added.
        const viewArgsFactory = () => itemContextFactory(record, adjustedPreviousIndex, currentIndex);
        view = this._insertView(viewArgsFactory, currentIndex, viewContainerRef, itemValueResolver(record));
        operation = view ? 1 /* _ViewRepeaterOperation.INSERTED */ : 0 /* _ViewRepeaterOperation.REPLACED */;
      } else if (currentIndex == null) {
        // Item removed.
        this._detachAndCacheView(adjustedPreviousIndex, viewContainerRef);
        operation = 3 /* _ViewRepeaterOperation.REMOVED */;
      } else {
        // Item moved.
        view = this._moveView(adjustedPreviousIndex, currentIndex, viewContainerRef, itemValueResolver(record));
        operation = 2 /* _ViewRepeaterOperation.MOVED */;
      }

      if (itemViewChanged) {
        itemViewChanged({
          context: view?.context,
          operation,
          record
        });
      }
    });
  }
  detach() {
    for (const view of this._viewCache) {
      view.destroy();
    }
    this._viewCache = [];
  }
  /**
   * Inserts a view for a new item, either from the cache or by creating a new
   * one. Returns `undefined` if the item was inserted into a cached view.
   */
  _insertView(viewArgsFactory, currentIndex, viewContainerRef, value) {
    const cachedView = this._insertViewFromCache(currentIndex, viewContainerRef);
    if (cachedView) {
      cachedView.context.$implicit = value;
      return undefined;
    }
    const viewArgs = viewArgsFactory();
    return viewContainerRef.createEmbeddedView(viewArgs.templateRef, viewArgs.context, viewArgs.index);
  }
  /** Detaches the view at the given index and inserts into the view cache. */
  _detachAndCacheView(index, viewContainerRef) {
    const detachedView = viewContainerRef.detach(index);
    this._maybeCacheView(detachedView, viewContainerRef);
  }
  /** Moves view at the previous index to the current index. */
  _moveView(adjustedPreviousIndex, currentIndex, viewContainerRef, value) {
    const view = viewContainerRef.get(adjustedPreviousIndex);
    viewContainerRef.move(view, currentIndex);
    view.context.$implicit = value;
    return view;
  }
  /**
   * Cache the given detached view. If the cache is full, the view will be
   * destroyed.
   */
  _maybeCacheView(view, viewContainerRef) {
    if (this._viewCache.length < this.viewCacheSize) {
      this._viewCache.push(view);
    } else {
      const index = viewContainerRef.indexOf(view);
      // The host component could remove views from the container outside of
      // the view repeater. It's unlikely this will occur, but just in case,
      // destroy the view on its own, otherwise destroy it through the
      // container to ensure that all the references are removed.
      if (index === -1) {
        view.destroy();
      } else {
        viewContainerRef.remove(index);
      }
    }
  }
  /** Inserts a recycled view from the cache at the given index. */
  _insertViewFromCache(index, viewContainerRef) {
    const cachedView = this._viewCache.pop();
    if (cachedView) {
      viewContainerRef.insert(cachedView, index);
    }
    return cachedView || null;
  }
}

/**
 * Class to be used to power selecting one or more options from a list.
 */
class SelectionModel {
  /** Selected values. */
  get selected() {
    if (!this._selected) {
      this._selected = Array.from(this._selection.values());
    }
    return this._selected;
  }
  constructor(_multiple = false, initiallySelectedValues, _emitChanges = true, compareWith) {
    this._multiple = _multiple;
    this._emitChanges = _emitChanges;
    this.compareWith = compareWith;
    /** Currently-selected values. */
    this._selection = new Set();
    /** Keeps track of the deselected options that haven't been emitted by the change event. */
    this._deselectedToEmit = [];
    /** Keeps track of the selected options that haven't been emitted by the change event. */
    this._selectedToEmit = [];
    /** Event emitted when the value has changed. */
    this.changed = new rxjs__WEBPACK_IMPORTED_MODULE_0__.Subject();
    if (initiallySelectedValues && initiallySelectedValues.length) {
      if (_multiple) {
        initiallySelectedValues.forEach(value => this._markSelected(value));
      } else {
        this._markSelected(initiallySelectedValues[0]);
      }
      // Clear the array in order to avoid firing the change event for preselected values.
      this._selectedToEmit.length = 0;
    }
  }
  /**
   * Selects a value or an array of values.
   * @param values The values to select
   * @return Whether the selection changed as a result of this call
   * @breaking-change 16.0.0 make return type boolean
   */
  select(...values) {
    this._verifyValueAssignment(values);
    values.forEach(value => this._markSelected(value));
    const changed = this._hasQueuedChanges();
    this._emitChangeEvent();
    return changed;
  }
  /**
   * Deselects a value or an array of values.
   * @param values The values to deselect
   * @return Whether the selection changed as a result of this call
   * @breaking-change 16.0.0 make return type boolean
   */
  deselect(...values) {
    this._verifyValueAssignment(values);
    values.forEach(value => this._unmarkSelected(value));
    const changed = this._hasQueuedChanges();
    this._emitChangeEvent();
    return changed;
  }
  /**
   * Sets the selected values
   * @param values The new selected values
   * @return Whether the selection changed as a result of this call
   * @breaking-change 16.0.0 make return type boolean
   */
  setSelection(...values) {
    this._verifyValueAssignment(values);
    const oldValues = this.selected;
    const newSelectedSet = new Set(values);
    values.forEach(value => this._markSelected(value));
    oldValues.filter(value => !newSelectedSet.has(value)).forEach(value => this._unmarkSelected(value));
    const changed = this._hasQueuedChanges();
    this._emitChangeEvent();
    return changed;
  }
  /**
   * Toggles a value between selected and deselected.
   * @param value The value to toggle
   * @return Whether the selection changed as a result of this call
   * @breaking-change 16.0.0 make return type boolean
   */
  toggle(value) {
    return this.isSelected(value) ? this.deselect(value) : this.select(value);
  }
  /**
   * Clears all of the selected values.
   * @param flushEvent Whether to flush the changes in an event.
   *   If false, the changes to the selection will be flushed along with the next event.
   * @return Whether the selection changed as a result of this call
   * @breaking-change 16.0.0 make return type boolean
   */
  clear(flushEvent = true) {
    this._unmarkAll();
    const changed = this._hasQueuedChanges();
    if (flushEvent) {
      this._emitChangeEvent();
    }
    return changed;
  }
  /**
   * Determines whether a value is selected.
   */
  isSelected(value) {
    return this._selection.has(this._getConcreteValue(value));
  }
  /**
   * Determines whether the model does not have a value.
   */
  isEmpty() {
    return this._selection.size === 0;
  }
  /**
   * Determines whether the model has a value.
   */
  hasValue() {
    return !this.isEmpty();
  }
  /**
   * Sorts the selected values based on a predicate function.
   */
  sort(predicate) {
    if (this._multiple && this.selected) {
      this._selected.sort(predicate);
    }
  }
  /**
   * Gets whether multiple values can be selected.
   */
  isMultipleSelection() {
    return this._multiple;
  }
  /** Emits a change event and clears the records of selected and deselected values. */
  _emitChangeEvent() {
    // Clear the selected values so they can be re-cached.
    this._selected = null;
    if (this._selectedToEmit.length || this._deselectedToEmit.length) {
      this.changed.next({
        source: this,
        added: this._selectedToEmit,
        removed: this._deselectedToEmit
      });
      this._deselectedToEmit = [];
      this._selectedToEmit = [];
    }
  }
  /** Selects a value. */
  _markSelected(value) {
    value = this._getConcreteValue(value);
    if (!this.isSelected(value)) {
      if (!this._multiple) {
        this._unmarkAll();
      }
      if (!this.isSelected(value)) {
        this._selection.add(value);
      }
      if (this._emitChanges) {
        this._selectedToEmit.push(value);
      }
    }
  }
  /** Deselects a value. */
  _unmarkSelected(value) {
    value = this._getConcreteValue(value);
    if (this.isSelected(value)) {
      this._selection.delete(value);
      if (this._emitChanges) {
        this._deselectedToEmit.push(value);
      }
    }
  }
  /** Clears out the selected values. */
  _unmarkAll() {
    if (!this.isEmpty()) {
      this._selection.forEach(value => this._unmarkSelected(value));
    }
  }
  /**
   * Verifies the value assignment and throws an error if the specified value array is
   * including multiple values while the selection model is not supporting multiple values.
   */
  _verifyValueAssignment(values) {
    if (values.length > 1 && !this._multiple && (typeof ngDevMode === 'undefined' || ngDevMode)) {
      throw getMultipleValuesInSingleSelectionError();
    }
  }
  /** Whether there are queued up change to be emitted. */
  _hasQueuedChanges() {
    return !!(this._deselectedToEmit.length || this._selectedToEmit.length);
  }
  /** Returns a value that is comparable to inputValue by applying compareWith function, returns the same inputValue otherwise. */
  _getConcreteValue(inputValue) {
    if (!this.compareWith) {
      return inputValue;
    } else {
      for (let selectedValue of this._selection) {
        if (this.compareWith(inputValue, selectedValue)) {
          return selectedValue;
        }
      }
      return inputValue;
    }
  }
}
/**
 * Returns an error that reports that multiple values are passed into a selection model
 * with a single value.
 * @docs-private
 */
function getMultipleValuesInSingleSelectionError() {
  return Error('Cannot pass multiple values into SelectionModel with single-value mode.');
}

/**
 * Class to coordinate unique selection based on name.
 * Intended to be consumed as an Angular service.
 * This service is needed because native radio change events are only fired on the item currently
 * being selected, and we still need to uncheck the previous selection.
 *
 * This service does not *store* any IDs and names because they may change at any time, so it is
 * less error-prone if they are simply passed through when the events occur.
 */
let UniqueSelectionDispatcher = /*#__PURE__*/(() => {
  var _class;
  class UniqueSelectionDispatcher {
    constructor() {
      this._listeners = [];
    }
    /**
     * Notify other items that selection for the given name has been set.
     * @param id ID of the item.
     * @param name Name of the item.
     */
    notify(id, name) {
      for (let listener of this._listeners) {
        listener(id, name);
      }
    }
    /**
     * Listen for future changes to item selection.
     * @return Function used to deregister listener
     */
    listen(listener) {
      this._listeners.push(listener);
      return () => {
        this._listeners = this._listeners.filter(registered => {
          return listener !== registered;
        });
      };
    }
    ngOnDestroy() {
      this._listeners = [];
    }
  }
  _class = UniqueSelectionDispatcher;
  _class.ɵfac = function _class_Factory(t) {
    return new (t || _class)();
  };
  _class.ɵprov = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
    token: _class,
    factory: _class.ɵfac,
    providedIn: 'root'
  });
  return UniqueSelectionDispatcher;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();

/**
 * Injection token for {@link _ViewRepeater}. This token is for use by Angular Material only.
 * @docs-private
 */
const _VIEW_REPEATER_STRATEGY = /*#__PURE__*/new _angular_core__WEBPACK_IMPORTED_MODULE_1__.InjectionToken('_ViewRepeater');

/**
 * Generated bundle index. Do not edit.
 */



/***/ }),

/***/ 32546:
/*!********************************************************!*\
  !*** ./node_modules/@angular/cdk/fesm2022/overlay.mjs ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BlockScrollStrategy: () => (/* binding */ BlockScrollStrategy),
/* harmony export */   CdkConnectedOverlay: () => (/* binding */ CdkConnectedOverlay),
/* harmony export */   CdkOverlayOrigin: () => (/* binding */ CdkOverlayOrigin),
/* harmony export */   CdkScrollable: () => (/* reexport safe */ _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_0__.CdkScrollable),
/* harmony export */   CloseScrollStrategy: () => (/* binding */ CloseScrollStrategy),
/* harmony export */   ConnectedOverlayPositionChange: () => (/* binding */ ConnectedOverlayPositionChange),
/* harmony export */   ConnectionPositionPair: () => (/* binding */ ConnectionPositionPair),
/* harmony export */   FlexibleConnectedPositionStrategy: () => (/* binding */ FlexibleConnectedPositionStrategy),
/* harmony export */   FullscreenOverlayContainer: () => (/* binding */ FullscreenOverlayContainer),
/* harmony export */   GlobalPositionStrategy: () => (/* binding */ GlobalPositionStrategy),
/* harmony export */   NoopScrollStrategy: () => (/* binding */ NoopScrollStrategy),
/* harmony export */   Overlay: () => (/* binding */ Overlay),
/* harmony export */   OverlayConfig: () => (/* binding */ OverlayConfig),
/* harmony export */   OverlayContainer: () => (/* binding */ OverlayContainer),
/* harmony export */   OverlayKeyboardDispatcher: () => (/* binding */ OverlayKeyboardDispatcher),
/* harmony export */   OverlayModule: () => (/* binding */ OverlayModule),
/* harmony export */   OverlayOutsideClickDispatcher: () => (/* binding */ OverlayOutsideClickDispatcher),
/* harmony export */   OverlayPositionBuilder: () => (/* binding */ OverlayPositionBuilder),
/* harmony export */   OverlayRef: () => (/* binding */ OverlayRef),
/* harmony export */   RepositionScrollStrategy: () => (/* binding */ RepositionScrollStrategy),
/* harmony export */   STANDARD_DROPDOWN_ADJACENT_POSITIONS: () => (/* binding */ STANDARD_DROPDOWN_ADJACENT_POSITIONS),
/* harmony export */   STANDARD_DROPDOWN_BELOW_POSITIONS: () => (/* binding */ STANDARD_DROPDOWN_BELOW_POSITIONS),
/* harmony export */   ScrollDispatcher: () => (/* reexport safe */ _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_0__.ScrollDispatcher),
/* harmony export */   ScrollStrategyOptions: () => (/* binding */ ScrollStrategyOptions),
/* harmony export */   ScrollingVisibility: () => (/* binding */ ScrollingVisibility),
/* harmony export */   ViewportRuler: () => (/* reexport safe */ _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_0__.ViewportRuler),
/* harmony export */   validateHorizontalPosition: () => (/* binding */ validateHorizontalPosition),
/* harmony export */   validateVerticalPosition: () => (/* binding */ validateVerticalPosition)
/* harmony export */ });
/* harmony import */ var _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/cdk/scrolling */ 7641);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 34228);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 59936);
/* harmony import */ var _angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/cdk/coercion */ 45029);
/* harmony import */ var _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/cdk/platform */ 92237);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 33410);
/* harmony import */ var _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/cdk/bidi */ 29988);
/* harmony import */ var _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/cdk/portal */ 85354);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 85028);
/* harmony import */ var _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/cdk/keycodes */ 31998);
















const scrollBehaviorSupported = /*#__PURE__*/(0,_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_1__.supportsScrollBehavior)();
/**
 * Strategy that will prevent the user from scrolling while the overlay is visible.
 */
class BlockScrollStrategy {
  constructor(_viewportRuler, document) {
    this._viewportRuler = _viewportRuler;
    this._previousHTMLStyles = {
      top: '',
      left: ''
    };
    this._isEnabled = false;
    this._document = document;
  }
  /** Attaches this scroll strategy to an overlay. */
  attach() {}
  /** Blocks page-level scroll while the attached overlay is open. */
  enable() {
    if (this._canBeEnabled()) {
      const root = this._document.documentElement;
      this._previousScrollPosition = this._viewportRuler.getViewportScrollPosition();
      // Cache the previous inline styles in case the user had set them.
      this._previousHTMLStyles.left = root.style.left || '';
      this._previousHTMLStyles.top = root.style.top || '';
      // Note: we're using the `html` node, instead of the `body`, because the `body` may
      // have the user agent margin, whereas the `html` is guaranteed not to have one.
      root.style.left = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_2__.coerceCssPixelValue)(-this._previousScrollPosition.left);
      root.style.top = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_2__.coerceCssPixelValue)(-this._previousScrollPosition.top);
      root.classList.add('cdk-global-scrollblock');
      this._isEnabled = true;
    }
  }
  /** Unblocks page-level scroll while the attached overlay is open. */
  disable() {
    if (this._isEnabled) {
      const html = this._document.documentElement;
      const body = this._document.body;
      const htmlStyle = html.style;
      const bodyStyle = body.style;
      const previousHtmlScrollBehavior = htmlStyle.scrollBehavior || '';
      const previousBodyScrollBehavior = bodyStyle.scrollBehavior || '';
      this._isEnabled = false;
      htmlStyle.left = this._previousHTMLStyles.left;
      htmlStyle.top = this._previousHTMLStyles.top;
      html.classList.remove('cdk-global-scrollblock');
      // Disable user-defined smooth scrolling temporarily while we restore the scroll position.
      // See https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-behavior
      // Note that we don't mutate the property if the browser doesn't support `scroll-behavior`,
      // because it can throw off feature detections in `supportsScrollBehavior` which
      // checks for `'scrollBehavior' in documentElement.style`.
      if (scrollBehaviorSupported) {
        htmlStyle.scrollBehavior = bodyStyle.scrollBehavior = 'auto';
      }
      window.scroll(this._previousScrollPosition.left, this._previousScrollPosition.top);
      if (scrollBehaviorSupported) {
        htmlStyle.scrollBehavior = previousHtmlScrollBehavior;
        bodyStyle.scrollBehavior = previousBodyScrollBehavior;
      }
    }
  }
  _canBeEnabled() {
    // Since the scroll strategies can't be singletons, we have to use a global CSS class
    // (`cdk-global-scrollblock`) to make sure that we don't try to disable global
    // scrolling multiple times.
    const html = this._document.documentElement;
    if (html.classList.contains('cdk-global-scrollblock') || this._isEnabled) {
      return false;
    }
    const body = this._document.body;
    const viewport = this._viewportRuler.getViewportSize();
    return body.scrollHeight > viewport.height || body.scrollWidth > viewport.width;
  }
}

/**
 * Returns an error to be thrown when attempting to attach an already-attached scroll strategy.
 */
function getMatScrollStrategyAlreadyAttachedError() {
  return Error(`Scroll strategy has already been attached.`);
}

/**
 * Strategy that will close the overlay as soon as the user starts scrolling.
 */
class CloseScrollStrategy {
  constructor(_scrollDispatcher, _ngZone, _viewportRuler, _config) {
    this._scrollDispatcher = _scrollDispatcher;
    this._ngZone = _ngZone;
    this._viewportRuler = _viewportRuler;
    this._config = _config;
    this._scrollSubscription = null;
    /** Detaches the overlay ref and disables the scroll strategy. */
    this._detach = () => {
      this.disable();
      if (this._overlayRef.hasAttached()) {
        this._ngZone.run(() => this._overlayRef.detach());
      }
    };
  }
  /** Attaches this scroll strategy to an overlay. */
  attach(overlayRef) {
    if (this._overlayRef && (typeof ngDevMode === 'undefined' || ngDevMode)) {
      throw getMatScrollStrategyAlreadyAttachedError();
    }
    this._overlayRef = overlayRef;
  }
  /** Enables the closing of the attached overlay on scroll. */
  enable() {
    if (this._scrollSubscription) {
      return;
    }
    const stream = this._scrollDispatcher.scrolled(0).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.filter)(scrollable => {
      return !scrollable || !this._overlayRef.overlayElement.contains(scrollable.getElementRef().nativeElement);
    }));
    if (this._config && this._config.threshold && this._config.threshold > 1) {
      this._initialScrollPosition = this._viewportRuler.getViewportScrollPosition().top;
      this._scrollSubscription = stream.subscribe(() => {
        const scrollPosition = this._viewportRuler.getViewportScrollPosition().top;
        if (Math.abs(scrollPosition - this._initialScrollPosition) > this._config.threshold) {
          this._detach();
        } else {
          this._overlayRef.updatePosition();
        }
      });
    } else {
      this._scrollSubscription = stream.subscribe(this._detach);
    }
  }
  /** Disables the closing the attached overlay on scroll. */
  disable() {
    if (this._scrollSubscription) {
      this._scrollSubscription.unsubscribe();
      this._scrollSubscription = null;
    }
  }
  detach() {
    this.disable();
    this._overlayRef = null;
  }
}

/** Scroll strategy that doesn't do anything. */
class NoopScrollStrategy {
  /** Does nothing, as this scroll strategy is a no-op. */
  enable() {}
  /** Does nothing, as this scroll strategy is a no-op. */
  disable() {}
  /** Does nothing, as this scroll strategy is a no-op. */
  attach() {}
}

/**
 * Gets whether an element is scrolled outside of view by any of its parent scrolling containers.
 * @param element Dimensions of the element (from getBoundingClientRect)
 * @param scrollContainers Dimensions of element's scrolling containers (from getBoundingClientRect)
 * @returns Whether the element is scrolled out of view
 * @docs-private
 */
function isElementScrolledOutsideView(element, scrollContainers) {
  return scrollContainers.some(containerBounds => {
    const outsideAbove = element.bottom < containerBounds.top;
    const outsideBelow = element.top > containerBounds.bottom;
    const outsideLeft = element.right < containerBounds.left;
    const outsideRight = element.left > containerBounds.right;
    return outsideAbove || outsideBelow || outsideLeft || outsideRight;
  });
}
/**
 * Gets whether an element is clipped by any of its scrolling containers.
 * @param element Dimensions of the element (from getBoundingClientRect)
 * @param scrollContainers Dimensions of element's scrolling containers (from getBoundingClientRect)
 * @returns Whether the element is clipped
 * @docs-private
 */
function isElementClippedByScrolling(element, scrollContainers) {
  return scrollContainers.some(scrollContainerRect => {
    const clippedAbove = element.top < scrollContainerRect.top;
    const clippedBelow = element.bottom > scrollContainerRect.bottom;
    const clippedLeft = element.left < scrollContainerRect.left;
    const clippedRight = element.right > scrollContainerRect.right;
    return clippedAbove || clippedBelow || clippedLeft || clippedRight;
  });
}

/**
 * Strategy that will update the element position as the user is scrolling.
 */
class RepositionScrollStrategy {
  constructor(_scrollDispatcher, _viewportRuler, _ngZone, _config) {
    this._scrollDispatcher = _scrollDispatcher;
    this._viewportRuler = _viewportRuler;
    this._ngZone = _ngZone;
    this._config = _config;
    this._scrollSubscription = null;
  }
  /** Attaches this scroll strategy to an overlay. */
  attach(overlayRef) {
    if (this._overlayRef && (typeof ngDevMode === 'undefined' || ngDevMode)) {
      throw getMatScrollStrategyAlreadyAttachedError();
    }
    this._overlayRef = overlayRef;
  }
  /** Enables repositioning of the attached overlay on scroll. */
  enable() {
    if (!this._scrollSubscription) {
      const throttle = this._config ? this._config.scrollThrottle : 0;
      this._scrollSubscription = this._scrollDispatcher.scrolled(throttle).subscribe(() => {
        this._overlayRef.updatePosition();
        // TODO(crisbeto): make `close` on by default once all components can handle it.
        if (this._config && this._config.autoClose) {
          const overlayRect = this._overlayRef.overlayElement.getBoundingClientRect();
          const {
            width,
            height
          } = this._viewportRuler.getViewportSize();
          // TODO(crisbeto): include all ancestor scroll containers here once
          // we have a way of exposing the trigger element to the scroll strategy.
          const parentRects = [{
            width,
            height,
            bottom: height,
            right: width,
            top: 0,
            left: 0
          }];
          if (isElementScrolledOutsideView(overlayRect, parentRects)) {
            this.disable();
            this._ngZone.run(() => this._overlayRef.detach());
          }
        }
      });
    }
  }
  /** Disables repositioning of the attached overlay on scroll. */
  disable() {
    if (this._scrollSubscription) {
      this._scrollSubscription.unsubscribe();
      this._scrollSubscription = null;
    }
  }
  detach() {
    this.disable();
    this._overlayRef = null;
  }
}

/**
 * Options for how an overlay will handle scrolling.
 *
 * Users can provide a custom value for `ScrollStrategyOptions` to replace the default
 * behaviors. This class primarily acts as a factory for ScrollStrategy instances.
 */
let ScrollStrategyOptions = /*#__PURE__*/(() => {
  var _class;
  class ScrollStrategyOptions {
    constructor(_scrollDispatcher, _viewportRuler, _ngZone, document) {
      this._scrollDispatcher = _scrollDispatcher;
      this._viewportRuler = _viewportRuler;
      this._ngZone = _ngZone;
      /** Do nothing on scroll. */
      this.noop = () => new NoopScrollStrategy();
      /**
       * Close the overlay as soon as the user scrolls.
       * @param config Configuration to be used inside the scroll strategy.
       */
      this.close = config => new CloseScrollStrategy(this._scrollDispatcher, this._ngZone, this._viewportRuler, config);
      /** Block scrolling. */
      this.block = () => new BlockScrollStrategy(this._viewportRuler, this._document);
      /**
       * Update the overlay's position on scroll.
       * @param config Configuration to be used inside the scroll strategy.
       * Allows debouncing the reposition calls.
       */
      this.reposition = config => new RepositionScrollStrategy(this._scrollDispatcher, this._viewportRuler, this._ngZone, config);
      this._document = document;
    }
  }
  _class = ScrollStrategyOptions;
  _class.ɵfac = function _class_Factory(t) {
    return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_0__.ScrollDispatcher), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_0__.ViewportRuler), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_4__.NgZone), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_angular_common__WEBPACK_IMPORTED_MODULE_5__.DOCUMENT));
  };
  _class.ɵprov = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({
    token: _class,
    factory: _class.ɵfac,
    providedIn: 'root'
  });
  return ScrollStrategyOptions;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();

/** Initial configuration used when creating an overlay. */
class OverlayConfig {
  constructor(config) {
    /** Strategy to be used when handling scroll events while the overlay is open. */
    this.scrollStrategy = new NoopScrollStrategy();
    /** Custom class to add to the overlay pane. */
    this.panelClass = '';
    /** Whether the overlay has a backdrop. */
    this.hasBackdrop = false;
    /** Custom class to add to the backdrop */
    this.backdropClass = 'cdk-overlay-dark-backdrop';
    /**
     * Whether the overlay should be disposed of when the user goes backwards/forwards in history.
     * Note that this usually doesn't include clicking on links (unless the user is using
     * the `HashLocationStrategy`).
     */
    this.disposeOnNavigation = false;
    if (config) {
      // Use `Iterable` instead of `Array` because TypeScript, as of 3.6.3,
      // loses the array generic type in the `for of`. But we *also* have to use `Array` because
      // typescript won't iterate over an `Iterable` unless you compile with `--downlevelIteration`
      const configKeys = Object.keys(config);
      for (const key of configKeys) {
        if (config[key] !== undefined) {
          // TypeScript, as of version 3.5, sees the left-hand-side of this expression
          // as "I don't know *which* key this is, so the only valid value is the intersection
          // of all the possible values." In this case, that happens to be `undefined`. TypeScript
          // is not smart enough to see that the right-hand-side is actually an access of the same
          // exact type with the same exact key, meaning that the value type must be identical.
          // So we use `any` to work around this.
          this[key] = config[key];
        }
      }
    }
  }
}

/** The points of the origin element and the overlay element to connect. */
class ConnectionPositionPair {
  constructor(origin, overlay, /** Offset along the X axis. */
  offsetX, /** Offset along the Y axis. */
  offsetY, /** Class(es) to be applied to the panel while this position is active. */
  panelClass) {
    this.offsetX = offsetX;
    this.offsetY = offsetY;
    this.panelClass = panelClass;
    this.originX = origin.originX;
    this.originY = origin.originY;
    this.overlayX = overlay.overlayX;
    this.overlayY = overlay.overlayY;
  }
}
/**
 * Set of properties regarding the position of the origin and overlay relative to the viewport
 * with respect to the containing Scrollable elements.
 *
 * The overlay and origin are clipped if any part of their bounding client rectangle exceeds the
 * bounds of any one of the strategy's Scrollable's bounding client rectangle.
 *
 * The overlay and origin are outside view if there is no overlap between their bounding client
 * rectangle and any one of the strategy's Scrollable's bounding client rectangle.
 *
 *       -----------                    -----------
 *       | outside |                    | clipped |
 *       |  view   |              --------------------------
 *       |         |              |     |         |        |
 *       ----------               |     -----------        |
 *  --------------------------    |                        |
 *  |                        |    |      Scrollable        |
 *  |                        |    |                        |
 *  |                        |     --------------------------
 *  |      Scrollable        |
 *  |                        |
 *  --------------------------
 *
 *  @docs-private
 */
class ScrollingVisibility {}
/** The change event emitted by the strategy when a fallback position is used. */
class ConnectedOverlayPositionChange {
  constructor( /** The position used as a result of this change. */
  connectionPair, /** @docs-private */
  scrollableViewProperties) {
    this.connectionPair = connectionPair;
    this.scrollableViewProperties = scrollableViewProperties;
  }
}
/**
 * Validates whether a vertical position property matches the expected values.
 * @param property Name of the property being validated.
 * @param value Value of the property being validated.
 * @docs-private
 */
function validateVerticalPosition(property, value) {
  if (value !== 'top' && value !== 'bottom' && value !== 'center') {
    throw Error(`ConnectedPosition: Invalid ${property} "${value}". ` + `Expected "top", "bottom" or "center".`);
  }
}
/**
 * Validates whether a horizontal position property matches the expected values.
 * @param property Name of the property being validated.
 * @param value Value of the property being validated.
 * @docs-private
 */
function validateHorizontalPosition(property, value) {
  if (value !== 'start' && value !== 'end' && value !== 'center') {
    throw Error(`ConnectedPosition: Invalid ${property} "${value}". ` + `Expected "start", "end" or "center".`);
  }
}

/**
 * Service for dispatching events that land on the body to appropriate overlay ref,
 * if any. It maintains a list of attached overlays to determine best suited overlay based
 * on event target and order of overlay opens.
 */
let BaseOverlayDispatcher = /*#__PURE__*/(() => {
  var _class2;
  class BaseOverlayDispatcher {
    constructor(document) {
      /** Currently attached overlays in the order they were attached. */
      this._attachedOverlays = [];
      this._document = document;
    }
    ngOnDestroy() {
      this.detach();
    }
    /** Add a new overlay to the list of attached overlay refs. */
    add(overlayRef) {
      // Ensure that we don't get the same overlay multiple times.
      this.remove(overlayRef);
      this._attachedOverlays.push(overlayRef);
    }
    /** Remove an overlay from the list of attached overlay refs. */
    remove(overlayRef) {
      const index = this._attachedOverlays.indexOf(overlayRef);
      if (index > -1) {
        this._attachedOverlays.splice(index, 1);
      }
      // Remove the global listener once there are no more overlays.
      if (this._attachedOverlays.length === 0) {
        this.detach();
      }
    }
  }
  _class2 = BaseOverlayDispatcher;
  _class2.ɵfac = function _class2_Factory(t) {
    return new (t || _class2)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_angular_common__WEBPACK_IMPORTED_MODULE_5__.DOCUMENT));
  };
  _class2.ɵprov = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({
    token: _class2,
    factory: _class2.ɵfac,
    providedIn: 'root'
  });
  return BaseOverlayDispatcher;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();

/**
 * Service for dispatching keyboard events that land on the body to appropriate overlay ref,
 * if any. It maintains a list of attached overlays to determine best suited overlay based
 * on event target and order of overlay opens.
 */
let OverlayKeyboardDispatcher = /*#__PURE__*/(() => {
  var _class3;
  class OverlayKeyboardDispatcher extends BaseOverlayDispatcher {
    constructor(document, /** @breaking-change 14.0.0 _ngZone will be required. */
    _ngZone) {
      super(document);
      this._ngZone = _ngZone;
      /** Keyboard event listener that will be attached to the body. */
      this._keydownListener = event => {
        const overlays = this._attachedOverlays;
        for (let i = overlays.length - 1; i > -1; i--) {
          // Dispatch the keydown event to the top overlay which has subscribers to its keydown events.
          // We want to target the most recent overlay, rather than trying to match where the event came
          // from, because some components might open an overlay, but keep focus on a trigger element
          // (e.g. for select and autocomplete). We skip overlays without keydown event subscriptions,
          // because we don't want overlays that don't handle keyboard events to block the ones below
          // them that do.
          if (overlays[i]._keydownEvents.observers.length > 0) {
            const keydownEvents = overlays[i]._keydownEvents;
            /** @breaking-change 14.0.0 _ngZone will be required. */
            if (this._ngZone) {
              this._ngZone.run(() => keydownEvents.next(event));
            } else {
              keydownEvents.next(event);
            }
            break;
          }
        }
      };
    }
    /** Add a new overlay to the list of attached overlay refs. */
    add(overlayRef) {
      super.add(overlayRef);
      // Lazily start dispatcher once first overlay is added
      if (!this._isAttached) {
        /** @breaking-change 14.0.0 _ngZone will be required. */
        if (this._ngZone) {
          this._ngZone.runOutsideAngular(() => this._document.body.addEventListener('keydown', this._keydownListener));
        } else {
          this._document.body.addEventListener('keydown', this._keydownListener);
        }
        this._isAttached = true;
      }
    }
    /** Detaches the global keyboard event listener. */
    detach() {
      if (this._isAttached) {
        this._document.body.removeEventListener('keydown', this._keydownListener);
        this._isAttached = false;
      }
    }
  }
  _class3 = OverlayKeyboardDispatcher;
  _class3.ɵfac = function _class3_Factory(t) {
    return new (t || _class3)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_angular_common__WEBPACK_IMPORTED_MODULE_5__.DOCUMENT), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_4__.NgZone, 8));
  };
  _class3.ɵprov = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({
    token: _class3,
    factory: _class3.ɵfac,
    providedIn: 'root'
  });
  return OverlayKeyboardDispatcher;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();

/**
 * Service for dispatching mouse click events that land on the body to appropriate overlay ref,
 * if any. It maintains a list of attached overlays to determine best suited overlay based
 * on event target and order of overlay opens.
 */
let OverlayOutsideClickDispatcher = /*#__PURE__*/(() => {
  var _class4;
  class OverlayOutsideClickDispatcher extends BaseOverlayDispatcher {
    constructor(document, _platform, /** @breaking-change 14.0.0 _ngZone will be required. */
    _ngZone) {
      super(document);
      this._platform = _platform;
      this._ngZone = _ngZone;
      this._cursorStyleIsSet = false;
      /** Store pointerdown event target to track origin of click. */
      this._pointerDownListener = event => {
        this._pointerDownEventTarget = (0,_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_1__._getEventTarget)(event);
      };
      /** Click event listener that will be attached to the body propagate phase. */
      this._clickListener = event => {
        const target = (0,_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_1__._getEventTarget)(event);
        // In case of a click event, we want to check the origin of the click
        // (e.g. in case where a user starts a click inside the overlay and
        // releases the click outside of it).
        // This is done by using the event target of the preceding pointerdown event.
        // Every click event caused by a pointer device has a preceding pointerdown
        // event, unless the click was programmatically triggered (e.g. in a unit test).
        const origin = event.type === 'click' && this._pointerDownEventTarget ? this._pointerDownEventTarget : target;
        // Reset the stored pointerdown event target, to avoid having it interfere
        // in subsequent events.
        this._pointerDownEventTarget = null;
        // We copy the array because the original may be modified asynchronously if the
        // outsidePointerEvents listener decides to detach overlays resulting in index errors inside
        // the for loop.
        const overlays = this._attachedOverlays.slice();
        // Dispatch the mouse event to the top overlay which has subscribers to its mouse events.
        // We want to target all overlays for which the click could be considered as outside click.
        // As soon as we reach an overlay for which the click is not outside click we break off
        // the loop.
        for (let i = overlays.length - 1; i > -1; i--) {
          const overlayRef = overlays[i];
          if (overlayRef._outsidePointerEvents.observers.length < 1 || !overlayRef.hasAttached()) {
            continue;
          }
          // If it's a click inside the overlay, just break - we should do nothing
          // If it's an outside click (both origin and target of the click) dispatch the mouse event,
          // and proceed with the next overlay
          if (overlayRef.overlayElement.contains(target) || overlayRef.overlayElement.contains(origin)) {
            break;
          }
          const outsidePointerEvents = overlayRef._outsidePointerEvents;
          /** @breaking-change 14.0.0 _ngZone will be required. */
          if (this._ngZone) {
            this._ngZone.run(() => outsidePointerEvents.next(event));
          } else {
            outsidePointerEvents.next(event);
          }
        }
      };
    }
    /** Add a new overlay to the list of attached overlay refs. */
    add(overlayRef) {
      super.add(overlayRef);
      // Safari on iOS does not generate click events for non-interactive
      // elements. However, we want to receive a click for any element outside
      // the overlay. We can force a "clickable" state by setting
      // `cursor: pointer` on the document body. See:
      // https://developer.mozilla.org/en-US/docs/Web/API/Element/click_event#Safari_Mobile
      // https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/HandlingEvents/HandlingEvents.html
      if (!this._isAttached) {
        const body = this._document.body;
        /** @breaking-change 14.0.0 _ngZone will be required. */
        if (this._ngZone) {
          this._ngZone.runOutsideAngular(() => this._addEventListeners(body));
        } else {
          this._addEventListeners(body);
        }
        // click event is not fired on iOS. To make element "clickable" we are
        // setting the cursor to pointer
        if (this._platform.IOS && !this._cursorStyleIsSet) {
          this._cursorOriginalValue = body.style.cursor;
          body.style.cursor = 'pointer';
          this._cursorStyleIsSet = true;
        }
        this._isAttached = true;
      }
    }
    /** Detaches the global keyboard event listener. */
    detach() {
      if (this._isAttached) {
        const body = this._document.body;
        body.removeEventListener('pointerdown', this._pointerDownListener, true);
        body.removeEventListener('click', this._clickListener, true);
        body.removeEventListener('auxclick', this._clickListener, true);
        body.removeEventListener('contextmenu', this._clickListener, true);
        if (this._platform.IOS && this._cursorStyleIsSet) {
          body.style.cursor = this._cursorOriginalValue;
          this._cursorStyleIsSet = false;
        }
        this._isAttached = false;
      }
    }
    _addEventListeners(body) {
      body.addEventListener('pointerdown', this._pointerDownListener, true);
      body.addEventListener('click', this._clickListener, true);
      body.addEventListener('auxclick', this._clickListener, true);
      body.addEventListener('contextmenu', this._clickListener, true);
    }
  }
  _class4 = OverlayOutsideClickDispatcher;
  _class4.ɵfac = function _class4_Factory(t) {
    return new (t || _class4)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_angular_common__WEBPACK_IMPORTED_MODULE_5__.DOCUMENT), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_1__.Platform), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_4__.NgZone, 8));
  };
  _class4.ɵprov = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({
    token: _class4,
    factory: _class4.ɵfac,
    providedIn: 'root'
  });
  return OverlayOutsideClickDispatcher;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();

/** Container inside which all overlays will render. */
let OverlayContainer = /*#__PURE__*/(() => {
  var _class5;
  class OverlayContainer {
    constructor(document, _platform) {
      this._platform = _platform;
      this._document = document;
    }
    ngOnDestroy() {
      this._containerElement?.remove();
    }
    /**
     * This method returns the overlay container element. It will lazily
     * create the element the first time it is called to facilitate using
     * the container in non-browser environments.
     * @returns the container element
     */
    getContainerElement() {
      if (!this._containerElement) {
        this._createContainer();
      }
      return this._containerElement;
    }
    /**
     * Create the overlay container element, which is simply a div
     * with the 'cdk-overlay-container' class on the document body.
     */
    _createContainer() {
      const containerClass = 'cdk-overlay-container';
      // TODO(crisbeto): remove the testing check once we have an overlay testing
      // module or Angular starts tearing down the testing `NgModule`. See:
      // https://github.com/angular/angular/issues/18831
      if (this._platform.isBrowser || (0,_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_1__._isTestEnvironment)()) {
        const oppositePlatformContainers = this._document.querySelectorAll(`.${containerClass}[platform="server"], ` + `.${containerClass}[platform="test"]`);
        // Remove any old containers from the opposite platform.
        // This can happen when transitioning from the server to the client.
        for (let i = 0; i < oppositePlatformContainers.length; i++) {
          oppositePlatformContainers[i].remove();
        }
      }
      const container = this._document.createElement('div');
      container.classList.add(containerClass);
      // A long time ago we kept adding new overlay containers whenever a new app was instantiated,
      // but at some point we added logic which clears the duplicate ones in order to avoid leaks.
      // The new logic was a little too aggressive since it was breaking some legitimate use cases.
      // To mitigate the problem we made it so that only containers from a different platform are
      // cleared, but the side-effect was that people started depending on the overly-aggressive
      // logic to clean up their tests for them. Until we can introduce an overlay-specific testing
      // module which does the cleanup, we try to detect that we're in a test environment and we
      // always clear the container. See #17006.
      // TODO(crisbeto): remove the test environment check once we have an overlay testing module.
      if ((0,_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_1__._isTestEnvironment)()) {
        container.setAttribute('platform', 'test');
      } else if (!this._platform.isBrowser) {
        container.setAttribute('platform', 'server');
      }
      this._document.body.appendChild(container);
      this._containerElement = container;
    }
  }
  _class5 = OverlayContainer;
  _class5.ɵfac = function _class5_Factory(t) {
    return new (t || _class5)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_angular_common__WEBPACK_IMPORTED_MODULE_5__.DOCUMENT), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_1__.Platform));
  };
  _class5.ɵprov = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({
    token: _class5,
    factory: _class5.ɵfac,
    providedIn: 'root'
  });
  return OverlayContainer;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();

/**
 * Reference to an overlay that has been created with the Overlay service.
 * Used to manipulate or dispose of said overlay.
 */
class OverlayRef {
  constructor(_portalOutlet, _host, _pane, _config, _ngZone, _keyboardDispatcher, _document, _location, _outsideClickDispatcher, _animationsDisabled = false) {
    this._portalOutlet = _portalOutlet;
    this._host = _host;
    this._pane = _pane;
    this._config = _config;
    this._ngZone = _ngZone;
    this._keyboardDispatcher = _keyboardDispatcher;
    this._document = _document;
    this._location = _location;
    this._outsideClickDispatcher = _outsideClickDispatcher;
    this._animationsDisabled = _animationsDisabled;
    this._backdropElement = null;
    this._backdropClick = new rxjs__WEBPACK_IMPORTED_MODULE_6__.Subject();
    this._attachments = new rxjs__WEBPACK_IMPORTED_MODULE_6__.Subject();
    this._detachments = new rxjs__WEBPACK_IMPORTED_MODULE_6__.Subject();
    this._locationChanges = rxjs__WEBPACK_IMPORTED_MODULE_6__.Subscription.EMPTY;
    this._backdropClickHandler = event => this._backdropClick.next(event);
    this._backdropTransitionendHandler = event => {
      this._disposeBackdrop(event.target);
    };
    /** Stream of keydown events dispatched to this overlay. */
    this._keydownEvents = new rxjs__WEBPACK_IMPORTED_MODULE_6__.Subject();
    /** Stream of mouse outside events dispatched to this overlay. */
    this._outsidePointerEvents = new rxjs__WEBPACK_IMPORTED_MODULE_6__.Subject();
    if (_config.scrollStrategy) {
      this._scrollStrategy = _config.scrollStrategy;
      this._scrollStrategy.attach(this);
    }
    this._positionStrategy = _config.positionStrategy;
  }
  /** The overlay's HTML element */
  get overlayElement() {
    return this._pane;
  }
  /** The overlay's backdrop HTML element. */
  get backdropElement() {
    return this._backdropElement;
  }
  /**
   * Wrapper around the panel element. Can be used for advanced
   * positioning where a wrapper with specific styling is
   * required around the overlay pane.
   */
  get hostElement() {
    return this._host;
  }
  /**
   * Attaches content, given via a Portal, to the overlay.
   * If the overlay is configured to have a backdrop, it will be created.
   *
   * @param portal Portal instance to which to attach the overlay.
   * @returns The portal attachment result.
   */
  attach(portal) {
    // Insert the host into the DOM before attaching the portal, otherwise
    // the animations module will skip animations on repeat attachments.
    if (!this._host.parentElement && this._previousHostParent) {
      this._previousHostParent.appendChild(this._host);
    }
    const attachResult = this._portalOutlet.attach(portal);
    if (this._positionStrategy) {
      this._positionStrategy.attach(this);
    }
    this._updateStackingOrder();
    this._updateElementSize();
    this._updateElementDirection();
    if (this._scrollStrategy) {
      this._scrollStrategy.enable();
    }
    // Update the position once the zone is stable so that the overlay will be fully rendered
    // before attempting to position it, as the position may depend on the size of the rendered
    // content.
    this._ngZone.onStable.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.take)(1)).subscribe(() => {
      // The overlay could've been detached before the zone has stabilized.
      if (this.hasAttached()) {
        this.updatePosition();
      }
    });
    // Enable pointer events for the overlay pane element.
    this._togglePointerEvents(true);
    if (this._config.hasBackdrop) {
      this._attachBackdrop();
    }
    if (this._config.panelClass) {
      this._toggleClasses(this._pane, this._config.panelClass, true);
    }
    // Only emit the `attachments` event once all other setup is done.
    this._attachments.next();
    // Track this overlay by the keyboard dispatcher
    this._keyboardDispatcher.add(this);
    if (this._config.disposeOnNavigation) {
      this._locationChanges = this._location.subscribe(() => this.dispose());
    }
    this._outsideClickDispatcher.add(this);
    // TODO(crisbeto): the null check is here, because the portal outlet returns `any`.
    // We should be guaranteed for the result to be `ComponentRef | EmbeddedViewRef`, but
    // `instanceof EmbeddedViewRef` doesn't appear to work at the moment.
    if (typeof attachResult?.onDestroy === 'function') {
      // In most cases we control the portal and we know when it is being detached so that
      // we can finish the disposal process. The exception is if the user passes in a custom
      // `ViewContainerRef` that isn't destroyed through the overlay API. Note that we use
      // `detach` here instead of `dispose`, because we don't know if the user intends to
      // reattach the overlay at a later point. It also has the advantage of waiting for animations.
      attachResult.onDestroy(() => {
        if (this.hasAttached()) {
          // We have to delay the `detach` call, because detaching immediately prevents
          // other destroy hooks from running. This is likely a framework bug similar to
          // https://github.com/angular/angular/issues/46119
          this._ngZone.runOutsideAngular(() => Promise.resolve().then(() => this.detach()));
        }
      });
    }
    return attachResult;
  }
  /**
   * Detaches an overlay from a portal.
   * @returns The portal detachment result.
   */
  detach() {
    if (!this.hasAttached()) {
      return;
    }
    this.detachBackdrop();
    // When the overlay is detached, the pane element should disable pointer events.
    // This is necessary because otherwise the pane element will cover the page and disable
    // pointer events therefore. Depends on the position strategy and the applied pane boundaries.
    this._togglePointerEvents(false);
    if (this._positionStrategy && this._positionStrategy.detach) {
      this._positionStrategy.detach();
    }
    if (this._scrollStrategy) {
      this._scrollStrategy.disable();
    }
    const detachmentResult = this._portalOutlet.detach();
    // Only emit after everything is detached.
    this._detachments.next();
    // Remove this overlay from keyboard dispatcher tracking.
    this._keyboardDispatcher.remove(this);
    // Keeping the host element in the DOM can cause scroll jank, because it still gets
    // rendered, even though it's transparent and unclickable which is why we remove it.
    this._detachContentWhenStable();
    this._locationChanges.unsubscribe();
    this._outsideClickDispatcher.remove(this);
    return detachmentResult;
  }
  /** Cleans up the overlay from the DOM. */
  dispose() {
    const isAttached = this.hasAttached();
    if (this._positionStrategy) {
      this._positionStrategy.dispose();
    }
    this._disposeScrollStrategy();
    this._disposeBackdrop(this._backdropElement);
    this._locationChanges.unsubscribe();
    this._keyboardDispatcher.remove(this);
    this._portalOutlet.dispose();
    this._attachments.complete();
    this._backdropClick.complete();
    this._keydownEvents.complete();
    this._outsidePointerEvents.complete();
    this._outsideClickDispatcher.remove(this);
    this._host?.remove();
    this._previousHostParent = this._pane = this._host = null;
    if (isAttached) {
      this._detachments.next();
    }
    this._detachments.complete();
  }
  /** Whether the overlay has attached content. */
  hasAttached() {
    return this._portalOutlet.hasAttached();
  }
  /** Gets an observable that emits when the backdrop has been clicked. */
  backdropClick() {
    return this._backdropClick;
  }
  /** Gets an observable that emits when the overlay has been attached. */
  attachments() {
    return this._attachments;
  }
  /** Gets an observable that emits when the overlay has been detached. */
  detachments() {
    return this._detachments;
  }
  /** Gets an observable of keydown events targeted to this overlay. */
  keydownEvents() {
    return this._keydownEvents;
  }
  /** Gets an observable of pointer events targeted outside this overlay. */
  outsidePointerEvents() {
    return this._outsidePointerEvents;
  }
  /** Gets the current overlay configuration, which is immutable. */
  getConfig() {
    return this._config;
  }
  /** Updates the position of the overlay based on the position strategy. */
  updatePosition() {
    if (this._positionStrategy) {
      this._positionStrategy.apply();
    }
  }
  /** Switches to a new position strategy and updates the overlay position. */
  updatePositionStrategy(strategy) {
    if (strategy === this._positionStrategy) {
      return;
    }
    if (this._positionStrategy) {
      this._positionStrategy.dispose();
    }
    this._positionStrategy = strategy;
    if (this.hasAttached()) {
      strategy.attach(this);
      this.updatePosition();
    }
  }
  /** Update the size properties of the overlay. */
  updateSize(sizeConfig) {
    this._config = {
      ...this._config,
      ...sizeConfig
    };
    this._updateElementSize();
  }
  /** Sets the LTR/RTL direction for the overlay. */
  setDirection(dir) {
    this._config = {
      ...this._config,
      direction: dir
    };
    this._updateElementDirection();
  }
  /** Add a CSS class or an array of classes to the overlay pane. */
  addPanelClass(classes) {
    if (this._pane) {
      this._toggleClasses(this._pane, classes, true);
    }
  }
  /** Remove a CSS class or an array of classes from the overlay pane. */
  removePanelClass(classes) {
    if (this._pane) {
      this._toggleClasses(this._pane, classes, false);
    }
  }
  /**
   * Returns the layout direction of the overlay panel.
   */
  getDirection() {
    const direction = this._config.direction;
    if (!direction) {
      return 'ltr';
    }
    return typeof direction === 'string' ? direction : direction.value;
  }
  /** Switches to a new scroll strategy. */
  updateScrollStrategy(strategy) {
    if (strategy === this._scrollStrategy) {
      return;
    }
    this._disposeScrollStrategy();
    this._scrollStrategy = strategy;
    if (this.hasAttached()) {
      strategy.attach(this);
      strategy.enable();
    }
  }
  /** Updates the text direction of the overlay panel. */
  _updateElementDirection() {
    this._host.setAttribute('dir', this.getDirection());
  }
  /** Updates the size of the overlay element based on the overlay config. */
  _updateElementSize() {
    if (!this._pane) {
      return;
    }
    const style = this._pane.style;
    style.width = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_2__.coerceCssPixelValue)(this._config.width);
    style.height = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_2__.coerceCssPixelValue)(this._config.height);
    style.minWidth = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_2__.coerceCssPixelValue)(this._config.minWidth);
    style.minHeight = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_2__.coerceCssPixelValue)(this._config.minHeight);
    style.maxWidth = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_2__.coerceCssPixelValue)(this._config.maxWidth);
    style.maxHeight = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_2__.coerceCssPixelValue)(this._config.maxHeight);
  }
  /** Toggles the pointer events for the overlay pane element. */
  _togglePointerEvents(enablePointer) {
    this._pane.style.pointerEvents = enablePointer ? '' : 'none';
  }
  /** Attaches a backdrop for this overlay. */
  _attachBackdrop() {
    const showingClass = 'cdk-overlay-backdrop-showing';
    this._backdropElement = this._document.createElement('div');
    this._backdropElement.classList.add('cdk-overlay-backdrop');
    if (this._animationsDisabled) {
      this._backdropElement.classList.add('cdk-overlay-backdrop-noop-animation');
    }
    if (this._config.backdropClass) {
      this._toggleClasses(this._backdropElement, this._config.backdropClass, true);
    }
    // Insert the backdrop before the pane in the DOM order,
    // in order to handle stacked overlays properly.
    this._host.parentElement.insertBefore(this._backdropElement, this._host);
    // Forward backdrop clicks such that the consumer of the overlay can perform whatever
    // action desired when such a click occurs (usually closing the overlay).
    this._backdropElement.addEventListener('click', this._backdropClickHandler);
    // Add class to fade-in the backdrop after one frame.
    if (!this._animationsDisabled && typeof requestAnimationFrame !== 'undefined') {
      this._ngZone.runOutsideAngular(() => {
        requestAnimationFrame(() => {
          if (this._backdropElement) {
            this._backdropElement.classList.add(showingClass);
          }
        });
      });
    } else {
      this._backdropElement.classList.add(showingClass);
    }
  }
  /**
   * Updates the stacking order of the element, moving it to the top if necessary.
   * This is required in cases where one overlay was detached, while another one,
   * that should be behind it, was destroyed. The next time both of them are opened,
   * the stacking will be wrong, because the detached element's pane will still be
   * in its original DOM position.
   */
  _updateStackingOrder() {
    if (this._host.nextSibling) {
      this._host.parentNode.appendChild(this._host);
    }
  }
  /** Detaches the backdrop (if any) associated with the overlay. */
  detachBackdrop() {
    const backdropToDetach = this._backdropElement;
    if (!backdropToDetach) {
      return;
    }
    if (this._animationsDisabled) {
      this._disposeBackdrop(backdropToDetach);
      return;
    }
    backdropToDetach.classList.remove('cdk-overlay-backdrop-showing');
    this._ngZone.runOutsideAngular(() => {
      backdropToDetach.addEventListener('transitionend', this._backdropTransitionendHandler);
    });
    // If the backdrop doesn't have a transition, the `transitionend` event won't fire.
    // In this case we make it unclickable and we try to remove it after a delay.
    backdropToDetach.style.pointerEvents = 'none';
    // Run this outside the Angular zone because there's nothing that Angular cares about.
    // If it were to run inside the Angular zone, every test that used Overlay would have to be
    // either async or fakeAsync.
    this._backdropTimeout = this._ngZone.runOutsideAngular(() => setTimeout(() => {
      this._disposeBackdrop(backdropToDetach);
    }, 500));
  }
  /** Toggles a single CSS class or an array of classes on an element. */
  _toggleClasses(element, cssClasses, isAdd) {
    const classes = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_2__.coerceArray)(cssClasses || []).filter(c => !!c);
    if (classes.length) {
      isAdd ? element.classList.add(...classes) : element.classList.remove(...classes);
    }
  }
  /** Detaches the overlay content next time the zone stabilizes. */
  _detachContentWhenStable() {
    // Normally we wouldn't have to explicitly run this outside the `NgZone`, however
    // if the consumer is using `zone-patch-rxjs`, the `Subscription.unsubscribe` call will
    // be patched to run inside the zone, which will throw us into an infinite loop.
    this._ngZone.runOutsideAngular(() => {
      // We can't remove the host here immediately, because the overlay pane's content
      // might still be animating. This stream helps us avoid interrupting the animation
      // by waiting for the pane to become empty.
      const subscription = this._ngZone.onStable.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.takeUntil)((0,rxjs__WEBPACK_IMPORTED_MODULE_6__.merge)(this._attachments, this._detachments))).subscribe(() => {
        // Needs a couple of checks for the pane and host, because
        // they may have been removed by the time the zone stabilizes.
        if (!this._pane || !this._host || this._pane.children.length === 0) {
          if (this._pane && this._config.panelClass) {
            this._toggleClasses(this._pane, this._config.panelClass, false);
          }
          if (this._host && this._host.parentElement) {
            this._previousHostParent = this._host.parentElement;
            this._host.remove();
          }
          subscription.unsubscribe();
        }
      });
    });
  }
  /** Disposes of a scroll strategy. */
  _disposeScrollStrategy() {
    const scrollStrategy = this._scrollStrategy;
    if (scrollStrategy) {
      scrollStrategy.disable();
      if (scrollStrategy.detach) {
        scrollStrategy.detach();
      }
    }
  }
  /** Removes a backdrop element from the DOM. */
  _disposeBackdrop(backdrop) {
    if (backdrop) {
      backdrop.removeEventListener('click', this._backdropClickHandler);
      backdrop.removeEventListener('transitionend', this._backdropTransitionendHandler);
      backdrop.remove();
      // It is possible that a new portal has been attached to this overlay since we started
      // removing the backdrop. If that is the case, only clear the backdrop reference if it
      // is still the same instance that we started to remove.
      if (this._backdropElement === backdrop) {
        this._backdropElement = null;
      }
    }
    if (this._backdropTimeout) {
      clearTimeout(this._backdropTimeout);
      this._backdropTimeout = undefined;
    }
  }
}

// TODO: refactor clipping detection into a separate thing (part of scrolling module)
// TODO: doesn't handle both flexible width and height when it has to scroll along both axis.
/** Class to be added to the overlay bounding box. */
const boundingBoxClass = 'cdk-overlay-connected-position-bounding-box';
/** Regex used to split a string on its CSS units. */
const cssUnitPattern = /([A-Za-z%]+)$/;
/**
 * A strategy for positioning overlays. Using this strategy, an overlay is given an
 * implicit position relative some origin element. The relative position is defined in terms of
 * a point on the origin element that is connected to a point on the overlay element. For example,
 * a basic dropdown is connecting the bottom-left corner of the origin to the top-left corner
 * of the overlay.
 */
class FlexibleConnectedPositionStrategy {
  /** Ordered list of preferred positions, from most to least desirable. */
  get positions() {
    return this._preferredPositions;
  }
  constructor(connectedTo, _viewportRuler, _document, _platform, _overlayContainer) {
    this._viewportRuler = _viewportRuler;
    this._document = _document;
    this._platform = _platform;
    this._overlayContainer = _overlayContainer;
    /** Last size used for the bounding box. Used to avoid resizing the overlay after open. */
    this._lastBoundingBoxSize = {
      width: 0,
      height: 0
    };
    /** Whether the overlay was pushed in a previous positioning. */
    this._isPushed = false;
    /** Whether the overlay can be pushed on-screen on the initial open. */
    this._canPush = true;
    /** Whether the overlay can grow via flexible width/height after the initial open. */
    this._growAfterOpen = false;
    /** Whether the overlay's width and height can be constrained to fit within the viewport. */
    this._hasFlexibleDimensions = true;
    /** Whether the overlay position is locked. */
    this._positionLocked = false;
    /** Amount of space that must be maintained between the overlay and the edge of the viewport. */
    this._viewportMargin = 0;
    /** The Scrollable containers used to check scrollable view properties on position change. */
    this._scrollables = [];
    /** Ordered list of preferred positions, from most to least desirable. */
    this._preferredPositions = [];
    /** Subject that emits whenever the position changes. */
    this._positionChanges = new rxjs__WEBPACK_IMPORTED_MODULE_6__.Subject();
    /** Subscription to viewport size changes. */
    this._resizeSubscription = rxjs__WEBPACK_IMPORTED_MODULE_6__.Subscription.EMPTY;
    /** Default offset for the overlay along the x axis. */
    this._offsetX = 0;
    /** Default offset for the overlay along the y axis. */
    this._offsetY = 0;
    /** Keeps track of the CSS classes that the position strategy has applied on the overlay panel. */
    this._appliedPanelClasses = [];
    /** Observable sequence of position changes. */
    this.positionChanges = this._positionChanges;
    this.setOrigin(connectedTo);
  }
  /** Attaches this position strategy to an overlay. */
  attach(overlayRef) {
    if (this._overlayRef && overlayRef !== this._overlayRef && (typeof ngDevMode === 'undefined' || ngDevMode)) {
      throw Error('This position strategy is already attached to an overlay');
    }
    this._validatePositions();
    overlayRef.hostElement.classList.add(boundingBoxClass);
    this._overlayRef = overlayRef;
    this._boundingBox = overlayRef.hostElement;
    this._pane = overlayRef.overlayElement;
    this._isDisposed = false;
    this._isInitialRender = true;
    this._lastPosition = null;
    this._resizeSubscription.unsubscribe();
    this._resizeSubscription = this._viewportRuler.change().subscribe(() => {
      // When the window is resized, we want to trigger the next reposition as if it
      // was an initial render, in order for the strategy to pick a new optimal position,
      // otherwise position locking will cause it to stay at the old one.
      this._isInitialRender = true;
      this.apply();
    });
  }
  /**
   * Updates the position of the overlay element, using whichever preferred position relative
   * to the origin best fits on-screen.
   *
   * The selection of a position goes as follows:
   *  - If any positions fit completely within the viewport as-is,
   *      choose the first position that does so.
   *  - If flexible dimensions are enabled and at least one satisfies the given minimum width/height,
   *      choose the position with the greatest available size modified by the positions' weight.
   *  - If pushing is enabled, take the position that went off-screen the least and push it
   *      on-screen.
   *  - If none of the previous criteria were met, use the position that goes off-screen the least.
   * @docs-private
   */
  apply() {
    // We shouldn't do anything if the strategy was disposed or we're on the server.
    if (this._isDisposed || !this._platform.isBrowser) {
      return;
    }
    // If the position has been applied already (e.g. when the overlay was opened) and the
    // consumer opted into locking in the position, re-use the old position, in order to
    // prevent the overlay from jumping around.
    if (!this._isInitialRender && this._positionLocked && this._lastPosition) {
      this.reapplyLastPosition();
      return;
    }
    this._clearPanelClasses();
    this._resetOverlayElementStyles();
    this._resetBoundingBoxStyles();
    // We need the bounding rects for the origin, the overlay and the container to determine how to position
    // the overlay relative to the origin.
    // We use the viewport rect to determine whether a position would go off-screen.
    this._viewportRect = this._getNarrowedViewportRect();
    this._originRect = this._getOriginRect();
    this._overlayRect = this._pane.getBoundingClientRect();
    this._containerRect = this._overlayContainer.getContainerElement().getBoundingClientRect();
    const originRect = this._originRect;
    const overlayRect = this._overlayRect;
    const viewportRect = this._viewportRect;
    const containerRect = this._containerRect;
    // Positions where the overlay will fit with flexible dimensions.
    const flexibleFits = [];
    // Fallback if none of the preferred positions fit within the viewport.
    let fallback;
    // Go through each of the preferred positions looking for a good fit.
    // If a good fit is found, it will be applied immediately.
    for (let pos of this._preferredPositions) {
      // Get the exact (x, y) coordinate for the point-of-origin on the origin element.
      let originPoint = this._getOriginPoint(originRect, containerRect, pos);
      // From that point-of-origin, get the exact (x, y) coordinate for the top-left corner of the
      // overlay in this position. We use the top-left corner for calculations and later translate
      // this into an appropriate (top, left, bottom, right) style.
      let overlayPoint = this._getOverlayPoint(originPoint, overlayRect, pos);
      // Calculate how well the overlay would fit into the viewport with this point.
      let overlayFit = this._getOverlayFit(overlayPoint, overlayRect, viewportRect, pos);
      // If the overlay, without any further work, fits into the viewport, use this position.
      if (overlayFit.isCompletelyWithinViewport) {
        this._isPushed = false;
        this._applyPosition(pos, originPoint);
        return;
      }
      // If the overlay has flexible dimensions, we can use this position
      // so long as there's enough space for the minimum dimensions.
      if (this._canFitWithFlexibleDimensions(overlayFit, overlayPoint, viewportRect)) {
        // Save positions where the overlay will fit with flexible dimensions. We will use these
        // if none of the positions fit *without* flexible dimensions.
        flexibleFits.push({
          position: pos,
          origin: originPoint,
          overlayRect,
          boundingBoxRect: this._calculateBoundingBoxRect(originPoint, pos)
        });
        continue;
      }
      // If the current preferred position does not fit on the screen, remember the position
      // if it has more visible area on-screen than we've seen and move onto the next preferred
      // position.
      if (!fallback || fallback.overlayFit.visibleArea < overlayFit.visibleArea) {
        fallback = {
          overlayFit,
          overlayPoint,
          originPoint,
          position: pos,
          overlayRect
        };
      }
    }
    // If there are any positions where the overlay would fit with flexible dimensions, choose the
    // one that has the greatest area available modified by the position's weight
    if (flexibleFits.length) {
      let bestFit = null;
      let bestScore = -1;
      for (const fit of flexibleFits) {
        const score = fit.boundingBoxRect.width * fit.boundingBoxRect.height * (fit.position.weight || 1);
        if (score > bestScore) {
          bestScore = score;
          bestFit = fit;
        }
      }
      this._isPushed = false;
      this._applyPosition(bestFit.position, bestFit.origin);
      return;
    }
    // When none of the preferred positions fit within the viewport, take the position
    // that went off-screen the least and attempt to push it on-screen.
    if (this._canPush) {
      // TODO(jelbourn): after pushing, the opening "direction" of the overlay might not make sense.
      this._isPushed = true;
      this._applyPosition(fallback.position, fallback.originPoint);
      return;
    }
    // All options for getting the overlay within the viewport have been exhausted, so go with the
    // position that went off-screen the least.
    this._applyPosition(fallback.position, fallback.originPoint);
  }
  detach() {
    this._clearPanelClasses();
    this._lastPosition = null;
    this._previousPushAmount = null;
    this._resizeSubscription.unsubscribe();
  }
  /** Cleanup after the element gets destroyed. */
  dispose() {
    if (this._isDisposed) {
      return;
    }
    // We can't use `_resetBoundingBoxStyles` here, because it resets
    // some properties to zero, rather than removing them.
    if (this._boundingBox) {
      extendStyles(this._boundingBox.style, {
        top: '',
        left: '',
        right: '',
        bottom: '',
        height: '',
        width: '',
        alignItems: '',
        justifyContent: ''
      });
    }
    if (this._pane) {
      this._resetOverlayElementStyles();
    }
    if (this._overlayRef) {
      this._overlayRef.hostElement.classList.remove(boundingBoxClass);
    }
    this.detach();
    this._positionChanges.complete();
    this._overlayRef = this._boundingBox = null;
    this._isDisposed = true;
  }
  /**
   * This re-aligns the overlay element with the trigger in its last calculated position,
   * even if a position higher in the "preferred positions" list would now fit. This
   * allows one to re-align the panel without changing the orientation of the panel.
   */
  reapplyLastPosition() {
    if (this._isDisposed || !this._platform.isBrowser) {
      return;
    }
    const lastPosition = this._lastPosition;
    if (lastPosition) {
      this._originRect = this._getOriginRect();
      this._overlayRect = this._pane.getBoundingClientRect();
      this._viewportRect = this._getNarrowedViewportRect();
      this._containerRect = this._overlayContainer.getContainerElement().getBoundingClientRect();
      const originPoint = this._getOriginPoint(this._originRect, this._containerRect, lastPosition);
      this._applyPosition(lastPosition, originPoint);
    } else {
      this.apply();
    }
  }
  /**
   * Sets the list of Scrollable containers that host the origin element so that
   * on reposition we can evaluate if it or the overlay has been clipped or outside view. Every
   * Scrollable must be an ancestor element of the strategy's origin element.
   */
  withScrollableContainers(scrollables) {
    this._scrollables = scrollables;
    return this;
  }
  /**
   * Adds new preferred positions.
   * @param positions List of positions options for this overlay.
   */
  withPositions(positions) {
    this._preferredPositions = positions;
    // If the last calculated position object isn't part of the positions anymore, clear
    // it in order to avoid it being picked up if the consumer tries to re-apply.
    if (positions.indexOf(this._lastPosition) === -1) {
      this._lastPosition = null;
    }
    this._validatePositions();
    return this;
  }
  /**
   * Sets a minimum distance the overlay may be positioned to the edge of the viewport.
   * @param margin Required margin between the overlay and the viewport edge in pixels.
   */
  withViewportMargin(margin) {
    this._viewportMargin = margin;
    return this;
  }
  /** Sets whether the overlay's width and height can be constrained to fit within the viewport. */
  withFlexibleDimensions(flexibleDimensions = true) {
    this._hasFlexibleDimensions = flexibleDimensions;
    return this;
  }
  /** Sets whether the overlay can grow after the initial open via flexible width/height. */
  withGrowAfterOpen(growAfterOpen = true) {
    this._growAfterOpen = growAfterOpen;
    return this;
  }
  /** Sets whether the overlay can be pushed on-screen if none of the provided positions fit. */
  withPush(canPush = true) {
    this._canPush = canPush;
    return this;
  }
  /**
   * Sets whether the overlay's position should be locked in after it is positioned
   * initially. When an overlay is locked in, it won't attempt to reposition itself
   * when the position is re-applied (e.g. when the user scrolls away).
   * @param isLocked Whether the overlay should locked in.
   */
  withLockedPosition(isLocked = true) {
    this._positionLocked = isLocked;
    return this;
  }
  /**
   * Sets the origin, relative to which to position the overlay.
   * Using an element origin is useful for building components that need to be positioned
   * relatively to a trigger (e.g. dropdown menus or tooltips), whereas using a point can be
   * used for cases like contextual menus which open relative to the user's pointer.
   * @param origin Reference to the new origin.
   */
  setOrigin(origin) {
    this._origin = origin;
    return this;
  }
  /**
   * Sets the default offset for the overlay's connection point on the x-axis.
   * @param offset New offset in the X axis.
   */
  withDefaultOffsetX(offset) {
    this._offsetX = offset;
    return this;
  }
  /**
   * Sets the default offset for the overlay's connection point on the y-axis.
   * @param offset New offset in the Y axis.
   */
  withDefaultOffsetY(offset) {
    this._offsetY = offset;
    return this;
  }
  /**
   * Configures that the position strategy should set a `transform-origin` on some elements
   * inside the overlay, depending on the current position that is being applied. This is
   * useful for the cases where the origin of an animation can change depending on the
   * alignment of the overlay.
   * @param selector CSS selector that will be used to find the target
   *    elements onto which to set the transform origin.
   */
  withTransformOriginOn(selector) {
    this._transformOriginSelector = selector;
    return this;
  }
  /**
   * Gets the (x, y) coordinate of a connection point on the origin based on a relative position.
   */
  _getOriginPoint(originRect, containerRect, pos) {
    let x;
    if (pos.originX == 'center') {
      // Note: when centering we should always use the `left`
      // offset, otherwise the position will be wrong in RTL.
      x = originRect.left + originRect.width / 2;
    } else {
      const startX = this._isRtl() ? originRect.right : originRect.left;
      const endX = this._isRtl() ? originRect.left : originRect.right;
      x = pos.originX == 'start' ? startX : endX;
    }
    // When zooming in Safari the container rectangle contains negative values for the position
    // and we need to re-add them to the calculated coordinates.
    if (containerRect.left < 0) {
      x -= containerRect.left;
    }
    let y;
    if (pos.originY == 'center') {
      y = originRect.top + originRect.height / 2;
    } else {
      y = pos.originY == 'top' ? originRect.top : originRect.bottom;
    }
    // Normally the containerRect's top value would be zero, however when the overlay is attached to an input
    // (e.g. in an autocomplete), mobile browsers will shift everything in order to put the input in the middle
    // of the screen and to make space for the virtual keyboard. We need to account for this offset,
    // otherwise our positioning will be thrown off.
    // Additionally, when zooming in Safari this fixes the vertical position.
    if (containerRect.top < 0) {
      y -= containerRect.top;
    }
    return {
      x,
      y
    };
  }
  /**
   * Gets the (x, y) coordinate of the top-left corner of the overlay given a given position and
   * origin point to which the overlay should be connected.
   */
  _getOverlayPoint(originPoint, overlayRect, pos) {
    // Calculate the (overlayStartX, overlayStartY), the start of the
    // potential overlay position relative to the origin point.
    let overlayStartX;
    if (pos.overlayX == 'center') {
      overlayStartX = -overlayRect.width / 2;
    } else if (pos.overlayX === 'start') {
      overlayStartX = this._isRtl() ? -overlayRect.width : 0;
    } else {
      overlayStartX = this._isRtl() ? 0 : -overlayRect.width;
    }
    let overlayStartY;
    if (pos.overlayY == 'center') {
      overlayStartY = -overlayRect.height / 2;
    } else {
      overlayStartY = pos.overlayY == 'top' ? 0 : -overlayRect.height;
    }
    // The (x, y) coordinates of the overlay.
    return {
      x: originPoint.x + overlayStartX,
      y: originPoint.y + overlayStartY
    };
  }
  /** Gets how well an overlay at the given point will fit within the viewport. */
  _getOverlayFit(point, rawOverlayRect, viewport, position) {
    // Round the overlay rect when comparing against the
    // viewport, because the viewport is always rounded.
    const overlay = getRoundedBoundingClientRect(rawOverlayRect);
    let {
      x,
      y
    } = point;
    let offsetX = this._getOffset(position, 'x');
    let offsetY = this._getOffset(position, 'y');
    // Account for the offsets since they could push the overlay out of the viewport.
    if (offsetX) {
      x += offsetX;
    }
    if (offsetY) {
      y += offsetY;
    }
    // How much the overlay would overflow at this position, on each side.
    let leftOverflow = 0 - x;
    let rightOverflow = x + overlay.width - viewport.width;
    let topOverflow = 0 - y;
    let bottomOverflow = y + overlay.height - viewport.height;
    // Visible parts of the element on each axis.
    let visibleWidth = this._subtractOverflows(overlay.width, leftOverflow, rightOverflow);
    let visibleHeight = this._subtractOverflows(overlay.height, topOverflow, bottomOverflow);
    let visibleArea = visibleWidth * visibleHeight;
    return {
      visibleArea,
      isCompletelyWithinViewport: overlay.width * overlay.height === visibleArea,
      fitsInViewportVertically: visibleHeight === overlay.height,
      fitsInViewportHorizontally: visibleWidth == overlay.width
    };
  }
  /**
   * Whether the overlay can fit within the viewport when it may resize either its width or height.
   * @param fit How well the overlay fits in the viewport at some position.
   * @param point The (x, y) coordinates of the overlay at some position.
   * @param viewport The geometry of the viewport.
   */
  _canFitWithFlexibleDimensions(fit, point, viewport) {
    if (this._hasFlexibleDimensions) {
      const availableHeight = viewport.bottom - point.y;
      const availableWidth = viewport.right - point.x;
      const minHeight = getPixelValue(this._overlayRef.getConfig().minHeight);
      const minWidth = getPixelValue(this._overlayRef.getConfig().minWidth);
      const verticalFit = fit.fitsInViewportVertically || minHeight != null && minHeight <= availableHeight;
      const horizontalFit = fit.fitsInViewportHorizontally || minWidth != null && minWidth <= availableWidth;
      return verticalFit && horizontalFit;
    }
    return false;
  }
  /**
   * Gets the point at which the overlay can be "pushed" on-screen. If the overlay is larger than
   * the viewport, the top-left corner will be pushed on-screen (with overflow occurring on the
   * right and bottom).
   *
   * @param start Starting point from which the overlay is pushed.
   * @param rawOverlayRect Dimensions of the overlay.
   * @param scrollPosition Current viewport scroll position.
   * @returns The point at which to position the overlay after pushing. This is effectively a new
   *     originPoint.
   */
  _pushOverlayOnScreen(start, rawOverlayRect, scrollPosition) {
    // If the position is locked and we've pushed the overlay already, reuse the previous push
    // amount, rather than pushing it again. If we were to continue pushing, the element would
    // remain in the viewport, which goes against the expectations when position locking is enabled.
    if (this._previousPushAmount && this._positionLocked) {
      return {
        x: start.x + this._previousPushAmount.x,
        y: start.y + this._previousPushAmount.y
      };
    }
    // Round the overlay rect when comparing against the
    // viewport, because the viewport is always rounded.
    const overlay = getRoundedBoundingClientRect(rawOverlayRect);
    const viewport = this._viewportRect;
    // Determine how much the overlay goes outside the viewport on each
    // side, which we'll use to decide which direction to push it.
    const overflowRight = Math.max(start.x + overlay.width - viewport.width, 0);
    const overflowBottom = Math.max(start.y + overlay.height - viewport.height, 0);
    const overflowTop = Math.max(viewport.top - scrollPosition.top - start.y, 0);
    const overflowLeft = Math.max(viewport.left - scrollPosition.left - start.x, 0);
    // Amount by which to push the overlay in each axis such that it remains on-screen.
    let pushX = 0;
    let pushY = 0;
    // If the overlay fits completely within the bounds of the viewport, push it from whichever
    // direction is goes off-screen. Otherwise, push the top-left corner such that its in the
    // viewport and allow for the trailing end of the overlay to go out of bounds.
    if (overlay.width <= viewport.width) {
      pushX = overflowLeft || -overflowRight;
    } else {
      pushX = start.x < this._viewportMargin ? viewport.left - scrollPosition.left - start.x : 0;
    }
    if (overlay.height <= viewport.height) {
      pushY = overflowTop || -overflowBottom;
    } else {
      pushY = start.y < this._viewportMargin ? viewport.top - scrollPosition.top - start.y : 0;
    }
    this._previousPushAmount = {
      x: pushX,
      y: pushY
    };
    return {
      x: start.x + pushX,
      y: start.y + pushY
    };
  }
  /**
   * Applies a computed position to the overlay and emits a position change.
   * @param position The position preference
   * @param originPoint The point on the origin element where the overlay is connected.
   */
  _applyPosition(position, originPoint) {
    this._setTransformOrigin(position);
    this._setOverlayElementStyles(originPoint, position);
    this._setBoundingBoxStyles(originPoint, position);
    if (position.panelClass) {
      this._addPanelClasses(position.panelClass);
    }
    // Save the last connected position in case the position needs to be re-calculated.
    this._lastPosition = position;
    // Notify that the position has been changed along with its change properties.
    // We only emit if we've got any subscriptions, because the scroll visibility
    // calculations can be somewhat expensive.
    if (this._positionChanges.observers.length) {
      const scrollableViewProperties = this._getScrollVisibility();
      const changeEvent = new ConnectedOverlayPositionChange(position, scrollableViewProperties);
      this._positionChanges.next(changeEvent);
    }
    this._isInitialRender = false;
  }
  /** Sets the transform origin based on the configured selector and the passed-in position.  */
  _setTransformOrigin(position) {
    if (!this._transformOriginSelector) {
      return;
    }
    const elements = this._boundingBox.querySelectorAll(this._transformOriginSelector);
    let xOrigin;
    let yOrigin = position.overlayY;
    if (position.overlayX === 'center') {
      xOrigin = 'center';
    } else if (this._isRtl()) {
      xOrigin = position.overlayX === 'start' ? 'right' : 'left';
    } else {
      xOrigin = position.overlayX === 'start' ? 'left' : 'right';
    }
    for (let i = 0; i < elements.length; i++) {
      elements[i].style.transformOrigin = `${xOrigin} ${yOrigin}`;
    }
  }
  /**
   * Gets the position and size of the overlay's sizing container.
   *
   * This method does no measuring and applies no styles so that we can cheaply compute the
   * bounds for all positions and choose the best fit based on these results.
   */
  _calculateBoundingBoxRect(origin, position) {
    const viewport = this._viewportRect;
    const isRtl = this._isRtl();
    let height, top, bottom;
    if (position.overlayY === 'top') {
      // Overlay is opening "downward" and thus is bound by the bottom viewport edge.
      top = origin.y;
      height = viewport.height - top + this._viewportMargin;
    } else if (position.overlayY === 'bottom') {
      // Overlay is opening "upward" and thus is bound by the top viewport edge. We need to add
      // the viewport margin back in, because the viewport rect is narrowed down to remove the
      // margin, whereas the `origin` position is calculated based on its `ClientRect`.
      bottom = viewport.height - origin.y + this._viewportMargin * 2;
      height = viewport.height - bottom + this._viewportMargin;
    } else {
      // If neither top nor bottom, it means that the overlay is vertically centered on the
      // origin point. Note that we want the position relative to the viewport, rather than
      // the page, which is why we don't use something like `viewport.bottom - origin.y` and
      // `origin.y - viewport.top`.
      const smallestDistanceToViewportEdge = Math.min(viewport.bottom - origin.y + viewport.top, origin.y);
      const previousHeight = this._lastBoundingBoxSize.height;
      height = smallestDistanceToViewportEdge * 2;
      top = origin.y - smallestDistanceToViewportEdge;
      if (height > previousHeight && !this._isInitialRender && !this._growAfterOpen) {
        top = origin.y - previousHeight / 2;
      }
    }
    // The overlay is opening 'right-ward' (the content flows to the right).
    const isBoundedByRightViewportEdge = position.overlayX === 'start' && !isRtl || position.overlayX === 'end' && isRtl;
    // The overlay is opening 'left-ward' (the content flows to the left).
    const isBoundedByLeftViewportEdge = position.overlayX === 'end' && !isRtl || position.overlayX === 'start' && isRtl;
    let width, left, right;
    if (isBoundedByLeftViewportEdge) {
      right = viewport.width - origin.x + this._viewportMargin;
      width = origin.x - this._viewportMargin;
    } else if (isBoundedByRightViewportEdge) {
      left = origin.x;
      width = viewport.right - origin.x;
    } else {
      // If neither start nor end, it means that the overlay is horizontally centered on the
      // origin point. Note that we want the position relative to the viewport, rather than
      // the page, which is why we don't use something like `viewport.right - origin.x` and
      // `origin.x - viewport.left`.
      const smallestDistanceToViewportEdge = Math.min(viewport.right - origin.x + viewport.left, origin.x);
      const previousWidth = this._lastBoundingBoxSize.width;
      width = smallestDistanceToViewportEdge * 2;
      left = origin.x - smallestDistanceToViewportEdge;
      if (width > previousWidth && !this._isInitialRender && !this._growAfterOpen) {
        left = origin.x - previousWidth / 2;
      }
    }
    return {
      top: top,
      left: left,
      bottom: bottom,
      right: right,
      width,
      height
    };
  }
  /**
   * Sets the position and size of the overlay's sizing wrapper. The wrapper is positioned on the
   * origin's connection point and stretches to the bounds of the viewport.
   *
   * @param origin The point on the origin element where the overlay is connected.
   * @param position The position preference
   */
  _setBoundingBoxStyles(origin, position) {
    const boundingBoxRect = this._calculateBoundingBoxRect(origin, position);
    // It's weird if the overlay *grows* while scrolling, so we take the last size into account
    // when applying a new size.
    if (!this._isInitialRender && !this._growAfterOpen) {
      boundingBoxRect.height = Math.min(boundingBoxRect.height, this._lastBoundingBoxSize.height);
      boundingBoxRect.width = Math.min(boundingBoxRect.width, this._lastBoundingBoxSize.width);
    }
    const styles = {};
    if (this._hasExactPosition()) {
      styles.top = styles.left = '0';
      styles.bottom = styles.right = styles.maxHeight = styles.maxWidth = '';
      styles.width = styles.height = '100%';
    } else {
      const maxHeight = this._overlayRef.getConfig().maxHeight;
      const maxWidth = this._overlayRef.getConfig().maxWidth;
      styles.height = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_2__.coerceCssPixelValue)(boundingBoxRect.height);
      styles.top = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_2__.coerceCssPixelValue)(boundingBoxRect.top);
      styles.bottom = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_2__.coerceCssPixelValue)(boundingBoxRect.bottom);
      styles.width = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_2__.coerceCssPixelValue)(boundingBoxRect.width);
      styles.left = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_2__.coerceCssPixelValue)(boundingBoxRect.left);
      styles.right = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_2__.coerceCssPixelValue)(boundingBoxRect.right);
      // Push the pane content towards the proper direction.
      if (position.overlayX === 'center') {
        styles.alignItems = 'center';
      } else {
        styles.alignItems = position.overlayX === 'end' ? 'flex-end' : 'flex-start';
      }
      if (position.overlayY === 'center') {
        styles.justifyContent = 'center';
      } else {
        styles.justifyContent = position.overlayY === 'bottom' ? 'flex-end' : 'flex-start';
      }
      if (maxHeight) {
        styles.maxHeight = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_2__.coerceCssPixelValue)(maxHeight);
      }
      if (maxWidth) {
        styles.maxWidth = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_2__.coerceCssPixelValue)(maxWidth);
      }
    }
    this._lastBoundingBoxSize = boundingBoxRect;
    extendStyles(this._boundingBox.style, styles);
  }
  /** Resets the styles for the bounding box so that a new positioning can be computed. */
  _resetBoundingBoxStyles() {
    extendStyles(this._boundingBox.style, {
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
      height: '',
      width: '',
      alignItems: '',
      justifyContent: ''
    });
  }
  /** Resets the styles for the overlay pane so that a new positioning can be computed. */
  _resetOverlayElementStyles() {
    extendStyles(this._pane.style, {
      top: '',
      left: '',
      bottom: '',
      right: '',
      position: '',
      transform: ''
    });
  }
  /** Sets positioning styles to the overlay element. */
  _setOverlayElementStyles(originPoint, position) {
    const styles = {};
    const hasExactPosition = this._hasExactPosition();
    const hasFlexibleDimensions = this._hasFlexibleDimensions;
    const config = this._overlayRef.getConfig();
    if (hasExactPosition) {
      const scrollPosition = this._viewportRuler.getViewportScrollPosition();
      extendStyles(styles, this._getExactOverlayY(position, originPoint, scrollPosition));
      extendStyles(styles, this._getExactOverlayX(position, originPoint, scrollPosition));
    } else {
      styles.position = 'static';
    }
    // Use a transform to apply the offsets. We do this because the `center` positions rely on
    // being in the normal flex flow and setting a `top` / `left` at all will completely throw
    // off the position. We also can't use margins, because they won't have an effect in some
    // cases where the element doesn't have anything to "push off of". Finally, this works
    // better both with flexible and non-flexible positioning.
    let transformString = '';
    let offsetX = this._getOffset(position, 'x');
    let offsetY = this._getOffset(position, 'y');
    if (offsetX) {
      transformString += `translateX(${offsetX}px) `;
    }
    if (offsetY) {
      transformString += `translateY(${offsetY}px)`;
    }
    styles.transform = transformString.trim();
    // If a maxWidth or maxHeight is specified on the overlay, we remove them. We do this because
    // we need these values to both be set to "100%" for the automatic flexible sizing to work.
    // The maxHeight and maxWidth are set on the boundingBox in order to enforce the constraint.
    // Note that this doesn't apply when we have an exact position, in which case we do want to
    // apply them because they'll be cleared from the bounding box.
    if (config.maxHeight) {
      if (hasExactPosition) {
        styles.maxHeight = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_2__.coerceCssPixelValue)(config.maxHeight);
      } else if (hasFlexibleDimensions) {
        styles.maxHeight = '';
      }
    }
    if (config.maxWidth) {
      if (hasExactPosition) {
        styles.maxWidth = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_2__.coerceCssPixelValue)(config.maxWidth);
      } else if (hasFlexibleDimensions) {
        styles.maxWidth = '';
      }
    }
    extendStyles(this._pane.style, styles);
  }
  /** Gets the exact top/bottom for the overlay when not using flexible sizing or when pushing. */
  _getExactOverlayY(position, originPoint, scrollPosition) {
    // Reset any existing styles. This is necessary in case the
    // preferred position has changed since the last `apply`.
    let styles = {
      top: '',
      bottom: ''
    };
    let overlayPoint = this._getOverlayPoint(originPoint, this._overlayRect, position);
    if (this._isPushed) {
      overlayPoint = this._pushOverlayOnScreen(overlayPoint, this._overlayRect, scrollPosition);
    }
    // We want to set either `top` or `bottom` based on whether the overlay wants to appear
    // above or below the origin and the direction in which the element will expand.
    if (position.overlayY === 'bottom') {
      // When using `bottom`, we adjust the y position such that it is the distance
      // from the bottom of the viewport rather than the top.
      const documentHeight = this._document.documentElement.clientHeight;
      styles.bottom = `${documentHeight - (overlayPoint.y + this._overlayRect.height)}px`;
    } else {
      styles.top = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_2__.coerceCssPixelValue)(overlayPoint.y);
    }
    return styles;
  }
  /** Gets the exact left/right for the overlay when not using flexible sizing or when pushing. */
  _getExactOverlayX(position, originPoint, scrollPosition) {
    // Reset any existing styles. This is necessary in case the preferred position has
    // changed since the last `apply`.
    let styles = {
      left: '',
      right: ''
    };
    let overlayPoint = this._getOverlayPoint(originPoint, this._overlayRect, position);
    if (this._isPushed) {
      overlayPoint = this._pushOverlayOnScreen(overlayPoint, this._overlayRect, scrollPosition);
    }
    // We want to set either `left` or `right` based on whether the overlay wants to appear "before"
    // or "after" the origin, which determines the direction in which the element will expand.
    // For the horizontal axis, the meaning of "before" and "after" change based on whether the
    // page is in RTL or LTR.
    let horizontalStyleProperty;
    if (this._isRtl()) {
      horizontalStyleProperty = position.overlayX === 'end' ? 'left' : 'right';
    } else {
      horizontalStyleProperty = position.overlayX === 'end' ? 'right' : 'left';
    }
    // When we're setting `right`, we adjust the x position such that it is the distance
    // from the right edge of the viewport rather than the left edge.
    if (horizontalStyleProperty === 'right') {
      const documentWidth = this._document.documentElement.clientWidth;
      styles.right = `${documentWidth - (overlayPoint.x + this._overlayRect.width)}px`;
    } else {
      styles.left = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_2__.coerceCssPixelValue)(overlayPoint.x);
    }
    return styles;
  }
  /**
   * Gets the view properties of the trigger and overlay, including whether they are clipped
   * or completely outside the view of any of the strategy's scrollables.
   */
  _getScrollVisibility() {
    // Note: needs fresh rects since the position could've changed.
    const originBounds = this._getOriginRect();
    const overlayBounds = this._pane.getBoundingClientRect();
    // TODO(jelbourn): instead of needing all of the client rects for these scrolling containers
    // every time, we should be able to use the scrollTop of the containers if the size of those
    // containers hasn't changed.
    const scrollContainerBounds = this._scrollables.map(scrollable => {
      return scrollable.getElementRef().nativeElement.getBoundingClientRect();
    });
    return {
      isOriginClipped: isElementClippedByScrolling(originBounds, scrollContainerBounds),
      isOriginOutsideView: isElementScrolledOutsideView(originBounds, scrollContainerBounds),
      isOverlayClipped: isElementClippedByScrolling(overlayBounds, scrollContainerBounds),
      isOverlayOutsideView: isElementScrolledOutsideView(overlayBounds, scrollContainerBounds)
    };
  }
  /** Subtracts the amount that an element is overflowing on an axis from its length. */
  _subtractOverflows(length, ...overflows) {
    return overflows.reduce((currentValue, currentOverflow) => {
      return currentValue - Math.max(currentOverflow, 0);
    }, length);
  }
  /** Narrows the given viewport rect by the current _viewportMargin. */
  _getNarrowedViewportRect() {
    // We recalculate the viewport rect here ourselves, rather than using the ViewportRuler,
    // because we want to use the `clientWidth` and `clientHeight` as the base. The difference
    // being that the client properties don't include the scrollbar, as opposed to `innerWidth`
    // and `innerHeight` that do. This is necessary, because the overlay container uses
    // 100% `width` and `height` which don't include the scrollbar either.
    const width = this._document.documentElement.clientWidth;
    const height = this._document.documentElement.clientHeight;
    const scrollPosition = this._viewportRuler.getViewportScrollPosition();
    return {
      top: scrollPosition.top + this._viewportMargin,
      left: scrollPosition.left + this._viewportMargin,
      right: scrollPosition.left + width - this._viewportMargin,
      bottom: scrollPosition.top + height - this._viewportMargin,
      width: width - 2 * this._viewportMargin,
      height: height - 2 * this._viewportMargin
    };
  }
  /** Whether the we're dealing with an RTL context */
  _isRtl() {
    return this._overlayRef.getDirection() === 'rtl';
  }
  /** Determines whether the overlay uses exact or flexible positioning. */
  _hasExactPosition() {
    return !this._hasFlexibleDimensions || this._isPushed;
  }
  /** Retrieves the offset of a position along the x or y axis. */
  _getOffset(position, axis) {
    if (axis === 'x') {
      // We don't do something like `position['offset' + axis]` in
      // order to avoid breaking minifiers that rename properties.
      return position.offsetX == null ? this._offsetX : position.offsetX;
    }
    return position.offsetY == null ? this._offsetY : position.offsetY;
  }
  /** Validates that the current position match the expected values. */
  _validatePositions() {
    if (typeof ngDevMode === 'undefined' || ngDevMode) {
      if (!this._preferredPositions.length) {
        throw Error('FlexibleConnectedPositionStrategy: At least one position is required.');
      }
      // TODO(crisbeto): remove these once Angular's template type
      // checking is advanced enough to catch these cases.
      this._preferredPositions.forEach(pair => {
        validateHorizontalPosition('originX', pair.originX);
        validateVerticalPosition('originY', pair.originY);
        validateHorizontalPosition('overlayX', pair.overlayX);
        validateVerticalPosition('overlayY', pair.overlayY);
      });
    }
  }
  /** Adds a single CSS class or an array of classes on the overlay panel. */
  _addPanelClasses(cssClasses) {
    if (this._pane) {
      (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_2__.coerceArray)(cssClasses).forEach(cssClass => {
        if (cssClass !== '' && this._appliedPanelClasses.indexOf(cssClass) === -1) {
          this._appliedPanelClasses.push(cssClass);
          this._pane.classList.add(cssClass);
        }
      });
    }
  }
  /** Clears the classes that the position strategy has applied from the overlay panel. */
  _clearPanelClasses() {
    if (this._pane) {
      this._appliedPanelClasses.forEach(cssClass => {
        this._pane.classList.remove(cssClass);
      });
      this._appliedPanelClasses = [];
    }
  }
  /** Returns the ClientRect of the current origin. */
  _getOriginRect() {
    const origin = this._origin;
    if (origin instanceof _angular_core__WEBPACK_IMPORTED_MODULE_4__.ElementRef) {
      return origin.nativeElement.getBoundingClientRect();
    }
    // Check for Element so SVG elements are also supported.
    if (origin instanceof Element) {
      return origin.getBoundingClientRect();
    }
    const width = origin.width || 0;
    const height = origin.height || 0;
    // If the origin is a point, return a client rect as if it was a 0x0 element at the point.
    return {
      top: origin.y,
      bottom: origin.y + height,
      left: origin.x,
      right: origin.x + width,
      height,
      width
    };
  }
}
/** Shallow-extends a stylesheet object with another stylesheet object. */
function extendStyles(destination, source) {
  for (let key in source) {
    if (source.hasOwnProperty(key)) {
      destination[key] = source[key];
    }
  }
  return destination;
}
/**
 * Extracts the pixel value as a number from a value, if it's a number
 * or a CSS pixel string (e.g. `1337px`). Otherwise returns null.
 */
function getPixelValue(input) {
  if (typeof input !== 'number' && input != null) {
    const [value, units] = input.split(cssUnitPattern);
    return !units || units === 'px' ? parseFloat(value) : null;
  }
  return input || null;
}
/**
 * Gets a version of an element's bounding `ClientRect` where all the values are rounded down to
 * the nearest pixel. This allows us to account for the cases where there may be sub-pixel
 * deviations in the `ClientRect` returned by the browser (e.g. when zoomed in with a percentage
 * size, see #21350).
 */
function getRoundedBoundingClientRect(clientRect) {
  return {
    top: Math.floor(clientRect.top),
    right: Math.floor(clientRect.right),
    bottom: Math.floor(clientRect.bottom),
    left: Math.floor(clientRect.left),
    width: Math.floor(clientRect.width),
    height: Math.floor(clientRect.height)
  };
}
const STANDARD_DROPDOWN_BELOW_POSITIONS = [{
  originX: 'start',
  originY: 'bottom',
  overlayX: 'start',
  overlayY: 'top'
}, {
  originX: 'start',
  originY: 'top',
  overlayX: 'start',
  overlayY: 'bottom'
}, {
  originX: 'end',
  originY: 'bottom',
  overlayX: 'end',
  overlayY: 'top'
}, {
  originX: 'end',
  originY: 'top',
  overlayX: 'end',
  overlayY: 'bottom'
}];
const STANDARD_DROPDOWN_ADJACENT_POSITIONS = [{
  originX: 'end',
  originY: 'top',
  overlayX: 'start',
  overlayY: 'top'
}, {
  originX: 'end',
  originY: 'bottom',
  overlayX: 'start',
  overlayY: 'bottom'
}, {
  originX: 'start',
  originY: 'top',
  overlayX: 'end',
  overlayY: 'top'
}, {
  originX: 'start',
  originY: 'bottom',
  overlayX: 'end',
  overlayY: 'bottom'
}];

/** Class to be added to the overlay pane wrapper. */
const wrapperClass = 'cdk-global-overlay-wrapper';
/**
 * A strategy for positioning overlays. Using this strategy, an overlay is given an
 * explicit position relative to the browser's viewport. We use flexbox, instead of
 * transforms, in order to avoid issues with subpixel rendering which can cause the
 * element to become blurry.
 */
class GlobalPositionStrategy {
  constructor() {
    this._cssPosition = 'static';
    this._topOffset = '';
    this._bottomOffset = '';
    this._alignItems = '';
    this._xPosition = '';
    this._xOffset = '';
    this._width = '';
    this._height = '';
    this._isDisposed = false;
  }
  attach(overlayRef) {
    const config = overlayRef.getConfig();
    this._overlayRef = overlayRef;
    if (this._width && !config.width) {
      overlayRef.updateSize({
        width: this._width
      });
    }
    if (this._height && !config.height) {
      overlayRef.updateSize({
        height: this._height
      });
    }
    overlayRef.hostElement.classList.add(wrapperClass);
    this._isDisposed = false;
  }
  /**
   * Sets the top position of the overlay. Clears any previously set vertical position.
   * @param value New top offset.
   */
  top(value = '') {
    this._bottomOffset = '';
    this._topOffset = value;
    this._alignItems = 'flex-start';
    return this;
  }
  /**
   * Sets the left position of the overlay. Clears any previously set horizontal position.
   * @param value New left offset.
   */
  left(value = '') {
    this._xOffset = value;
    this._xPosition = 'left';
    return this;
  }
  /**
   * Sets the bottom position of the overlay. Clears any previously set vertical position.
   * @param value New bottom offset.
   */
  bottom(value = '') {
    this._topOffset = '';
    this._bottomOffset = value;
    this._alignItems = 'flex-end';
    return this;
  }
  /**
   * Sets the right position of the overlay. Clears any previously set horizontal position.
   * @param value New right offset.
   */
  right(value = '') {
    this._xOffset = value;
    this._xPosition = 'right';
    return this;
  }
  /**
   * Sets the overlay to the start of the viewport, depending on the overlay direction.
   * This will be to the left in LTR layouts and to the right in RTL.
   * @param offset Offset from the edge of the screen.
   */
  start(value = '') {
    this._xOffset = value;
    this._xPosition = 'start';
    return this;
  }
  /**
   * Sets the overlay to the end of the viewport, depending on the overlay direction.
   * This will be to the right in LTR layouts and to the left in RTL.
   * @param offset Offset from the edge of the screen.
   */
  end(value = '') {
    this._xOffset = value;
    this._xPosition = 'end';
    return this;
  }
  /**
   * Sets the overlay width and clears any previously set width.
   * @param value New width for the overlay
   * @deprecated Pass the `width` through the `OverlayConfig`.
   * @breaking-change 8.0.0
   */
  width(value = '') {
    if (this._overlayRef) {
      this._overlayRef.updateSize({
        width: value
      });
    } else {
      this._width = value;
    }
    return this;
  }
  /**
   * Sets the overlay height and clears any previously set height.
   * @param value New height for the overlay
   * @deprecated Pass the `height` through the `OverlayConfig`.
   * @breaking-change 8.0.0
   */
  height(value = '') {
    if (this._overlayRef) {
      this._overlayRef.updateSize({
        height: value
      });
    } else {
      this._height = value;
    }
    return this;
  }
  /**
   * Centers the overlay horizontally with an optional offset.
   * Clears any previously set horizontal position.
   *
   * @param offset Overlay offset from the horizontal center.
   */
  centerHorizontally(offset = '') {
    this.left(offset);
    this._xPosition = 'center';
    return this;
  }
  /**
   * Centers the overlay vertically with an optional offset.
   * Clears any previously set vertical position.
   *
   * @param offset Overlay offset from the vertical center.
   */
  centerVertically(offset = '') {
    this.top(offset);
    this._alignItems = 'center';
    return this;
  }
  /**
   * Apply the position to the element.
   * @docs-private
   */
  apply() {
    // Since the overlay ref applies the strategy asynchronously, it could
    // have been disposed before it ends up being applied. If that is the
    // case, we shouldn't do anything.
    if (!this._overlayRef || !this._overlayRef.hasAttached()) {
      return;
    }
    const styles = this._overlayRef.overlayElement.style;
    const parentStyles = this._overlayRef.hostElement.style;
    const config = this._overlayRef.getConfig();
    const {
      width,
      height,
      maxWidth,
      maxHeight
    } = config;
    const shouldBeFlushHorizontally = (width === '100%' || width === '100vw') && (!maxWidth || maxWidth === '100%' || maxWidth === '100vw');
    const shouldBeFlushVertically = (height === '100%' || height === '100vh') && (!maxHeight || maxHeight === '100%' || maxHeight === '100vh');
    const xPosition = this._xPosition;
    const xOffset = this._xOffset;
    const isRtl = this._overlayRef.getConfig().direction === 'rtl';
    let marginLeft = '';
    let marginRight = '';
    let justifyContent = '';
    if (shouldBeFlushHorizontally) {
      justifyContent = 'flex-start';
    } else if (xPosition === 'center') {
      justifyContent = 'center';
      if (isRtl) {
        marginRight = xOffset;
      } else {
        marginLeft = xOffset;
      }
    } else if (isRtl) {
      if (xPosition === 'left' || xPosition === 'end') {
        justifyContent = 'flex-end';
        marginLeft = xOffset;
      } else if (xPosition === 'right' || xPosition === 'start') {
        justifyContent = 'flex-start';
        marginRight = xOffset;
      }
    } else if (xPosition === 'left' || xPosition === 'start') {
      justifyContent = 'flex-start';
      marginLeft = xOffset;
    } else if (xPosition === 'right' || xPosition === 'end') {
      justifyContent = 'flex-end';
      marginRight = xOffset;
    }
    styles.position = this._cssPosition;
    styles.marginLeft = shouldBeFlushHorizontally ? '0' : marginLeft;
    styles.marginTop = shouldBeFlushVertically ? '0' : this._topOffset;
    styles.marginBottom = this._bottomOffset;
    styles.marginRight = shouldBeFlushHorizontally ? '0' : marginRight;
    parentStyles.justifyContent = justifyContent;
    parentStyles.alignItems = shouldBeFlushVertically ? 'flex-start' : this._alignItems;
  }
  /**
   * Cleans up the DOM changes from the position strategy.
   * @docs-private
   */
  dispose() {
    if (this._isDisposed || !this._overlayRef) {
      return;
    }
    const styles = this._overlayRef.overlayElement.style;
    const parent = this._overlayRef.hostElement;
    const parentStyles = parent.style;
    parent.classList.remove(wrapperClass);
    parentStyles.justifyContent = parentStyles.alignItems = styles.marginTop = styles.marginBottom = styles.marginLeft = styles.marginRight = styles.position = '';
    this._overlayRef = null;
    this._isDisposed = true;
  }
}

/** Builder for overlay position strategy. */
let OverlayPositionBuilder = /*#__PURE__*/(() => {
  var _class6;
  class OverlayPositionBuilder {
    constructor(_viewportRuler, _document, _platform, _overlayContainer) {
      this._viewportRuler = _viewportRuler;
      this._document = _document;
      this._platform = _platform;
      this._overlayContainer = _overlayContainer;
    }
    /**
     * Creates a global position strategy.
     */
    global() {
      return new GlobalPositionStrategy();
    }
    /**
     * Creates a flexible position strategy.
     * @param origin Origin relative to which to position the overlay.
     */
    flexibleConnectedTo(origin) {
      return new FlexibleConnectedPositionStrategy(origin, this._viewportRuler, this._document, this._platform, this._overlayContainer);
    }
  }
  _class6 = OverlayPositionBuilder;
  _class6.ɵfac = function _class6_Factory(t) {
    return new (t || _class6)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_0__.ViewportRuler), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_angular_common__WEBPACK_IMPORTED_MODULE_5__.DOCUMENT), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_1__.Platform), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](OverlayContainer));
  };
  _class6.ɵprov = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({
    token: _class6,
    factory: _class6.ɵfac,
    providedIn: 'root'
  });
  return OverlayPositionBuilder;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();

/** Next overlay unique ID. */
let nextUniqueId = 0;
// Note that Overlay is *not* scoped to the app root because of the ComponentFactoryResolver
// which needs to be different depending on where OverlayModule is imported.
/**
 * Service to create Overlays. Overlays are dynamically added pieces of floating UI, meant to be
 * used as a low-level building block for other components. Dialogs, tooltips, menus,
 * selects, etc. can all be built using overlays. The service should primarily be used by authors
 * of re-usable components rather than developers building end-user applications.
 *
 * An overlay *is* a PortalOutlet, so any kind of Portal can be loaded into one.
 */
let Overlay = /*#__PURE__*/(() => {
  var _class7;
  class Overlay {
    constructor( /** Scrolling strategies that can be used when creating an overlay. */
    scrollStrategies, _overlayContainer, _componentFactoryResolver, _positionBuilder, _keyboardDispatcher, _injector, _ngZone, _document, _directionality, _location, _outsideClickDispatcher, _animationsModuleType) {
      this.scrollStrategies = scrollStrategies;
      this._overlayContainer = _overlayContainer;
      this._componentFactoryResolver = _componentFactoryResolver;
      this._positionBuilder = _positionBuilder;
      this._keyboardDispatcher = _keyboardDispatcher;
      this._injector = _injector;
      this._ngZone = _ngZone;
      this._document = _document;
      this._directionality = _directionality;
      this._location = _location;
      this._outsideClickDispatcher = _outsideClickDispatcher;
      this._animationsModuleType = _animationsModuleType;
    }
    /**
     * Creates an overlay.
     * @param config Configuration applied to the overlay.
     * @returns Reference to the created overlay.
     */
    create(config) {
      const host = this._createHostElement();
      const pane = this._createPaneElement(host);
      const portalOutlet = this._createPortalOutlet(pane);
      const overlayConfig = new OverlayConfig(config);
      overlayConfig.direction = overlayConfig.direction || this._directionality.value;
      return new OverlayRef(portalOutlet, host, pane, overlayConfig, this._ngZone, this._keyboardDispatcher, this._document, this._location, this._outsideClickDispatcher, this._animationsModuleType === 'NoopAnimations');
    }
    /**
     * Gets a position builder that can be used, via fluent API,
     * to construct and configure a position strategy.
     * @returns An overlay position builder.
     */
    position() {
      return this._positionBuilder;
    }
    /**
     * Creates the DOM element for an overlay and appends it to the overlay container.
     * @returns Newly-created pane element
     */
    _createPaneElement(host) {
      const pane = this._document.createElement('div');
      pane.id = `cdk-overlay-${nextUniqueId++}`;
      pane.classList.add('cdk-overlay-pane');
      host.appendChild(pane);
      return pane;
    }
    /**
     * Creates the host element that wraps around an overlay
     * and can be used for advanced positioning.
     * @returns Newly-create host element.
     */
    _createHostElement() {
      const host = this._document.createElement('div');
      this._overlayContainer.getContainerElement().appendChild(host);
      return host;
    }
    /**
     * Create a DomPortalOutlet into which the overlay content can be loaded.
     * @param pane The DOM element to turn into a portal outlet.
     * @returns A portal outlet for the given DOM element.
     */
    _createPortalOutlet(pane) {
      // We have to resolve the ApplicationRef later in order to allow people
      // to use overlay-based providers during app initialization.
      if (!this._appRef) {
        this._appRef = this._injector.get(_angular_core__WEBPACK_IMPORTED_MODULE_4__.ApplicationRef);
      }
      return new _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_7__.DomPortalOutlet(pane, this._componentFactoryResolver, this._appRef, this._injector, this._document);
    }
  }
  _class7 = Overlay;
  _class7.ɵfac = function _class7_Factory(t) {
    return new (t || _class7)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](ScrollStrategyOptions), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](OverlayContainer), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_4__.ComponentFactoryResolver), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](OverlayPositionBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](OverlayKeyboardDispatcher), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_4__.Injector), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_4__.NgZone), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_angular_common__WEBPACK_IMPORTED_MODULE_5__.DOCUMENT), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_8__.Directionality), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_angular_common__WEBPACK_IMPORTED_MODULE_5__.Location), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](OverlayOutsideClickDispatcher), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_4__.ANIMATION_MODULE_TYPE, 8));
  };
  _class7.ɵprov = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({
    token: _class7,
    factory: _class7.ɵfac,
    providedIn: 'root'
  });
  return Overlay;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();

/** Default set of positions for the overlay. Follows the behavior of a dropdown. */
const defaultPositionList = [{
  originX: 'start',
  originY: 'bottom',
  overlayX: 'start',
  overlayY: 'top'
}, {
  originX: 'start',
  originY: 'top',
  overlayX: 'start',
  overlayY: 'bottom'
}, {
  originX: 'end',
  originY: 'top',
  overlayX: 'end',
  overlayY: 'bottom'
}, {
  originX: 'end',
  originY: 'bottom',
  overlayX: 'end',
  overlayY: 'top'
}];
/** Injection token that determines the scroll handling while the connected overlay is open. */
const CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY = /*#__PURE__*/new _angular_core__WEBPACK_IMPORTED_MODULE_4__.InjectionToken('cdk-connected-overlay-scroll-strategy');
/**
 * Directive applied to an element to make it usable as an origin for an Overlay using a
 * ConnectedPositionStrategy.
 */
let CdkOverlayOrigin = /*#__PURE__*/(() => {
  var _class8;
  class CdkOverlayOrigin {
    constructor( /** Reference to the element on which the directive is applied. */
    elementRef) {
      this.elementRef = elementRef;
    }
  }
  _class8 = CdkOverlayOrigin;
  _class8.ɵfac = function _class8_Factory(t) {
    return new (t || _class8)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_4__.ElementRef));
  };
  _class8.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineDirective"]({
    type: _class8,
    selectors: [["", "cdk-overlay-origin", ""], ["", "overlay-origin", ""], ["", "cdkOverlayOrigin", ""]],
    exportAs: ["cdkOverlayOrigin"],
    standalone: true
  });
  return CdkOverlayOrigin;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
/**
 * Directive to facilitate declarative creation of an
 * Overlay using a FlexibleConnectedPositionStrategy.
 */
let CdkConnectedOverlay = /*#__PURE__*/(() => {
  var _class9;
  class CdkConnectedOverlay {
    /** The offset in pixels for the overlay connection point on the x-axis */
    get offsetX() {
      return this._offsetX;
    }
    set offsetX(offsetX) {
      this._offsetX = offsetX;
      if (this._position) {
        this._updatePositionStrategy(this._position);
      }
    }
    /** The offset in pixels for the overlay connection point on the y-axis */
    get offsetY() {
      return this._offsetY;
    }
    set offsetY(offsetY) {
      this._offsetY = offsetY;
      if (this._position) {
        this._updatePositionStrategy(this._position);
      }
    }
    /** Whether or not the overlay should attach a backdrop. */
    get hasBackdrop() {
      return this._hasBackdrop;
    }
    set hasBackdrop(value) {
      this._hasBackdrop = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_2__.coerceBooleanProperty)(value);
    }
    /** Whether or not the overlay should be locked when scrolling. */
    get lockPosition() {
      return this._lockPosition;
    }
    set lockPosition(value) {
      this._lockPosition = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_2__.coerceBooleanProperty)(value);
    }
    /** Whether the overlay's width and height can be constrained to fit within the viewport. */
    get flexibleDimensions() {
      return this._flexibleDimensions;
    }
    set flexibleDimensions(value) {
      this._flexibleDimensions = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_2__.coerceBooleanProperty)(value);
    }
    /** Whether the overlay can grow after the initial open when flexible positioning is turned on. */
    get growAfterOpen() {
      return this._growAfterOpen;
    }
    set growAfterOpen(value) {
      this._growAfterOpen = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_2__.coerceBooleanProperty)(value);
    }
    /** Whether the overlay can be pushed on-screen if none of the provided positions fit. */
    get push() {
      return this._push;
    }
    set push(value) {
      this._push = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_2__.coerceBooleanProperty)(value);
    }
    // TODO(jelbourn): inputs for size, scroll behavior, animation, etc.
    constructor(_overlay, templateRef, viewContainerRef, scrollStrategyFactory, _dir) {
      this._overlay = _overlay;
      this._dir = _dir;
      this._hasBackdrop = false;
      this._lockPosition = false;
      this._growAfterOpen = false;
      this._flexibleDimensions = false;
      this._push = false;
      this._backdropSubscription = rxjs__WEBPACK_IMPORTED_MODULE_6__.Subscription.EMPTY;
      this._attachSubscription = rxjs__WEBPACK_IMPORTED_MODULE_6__.Subscription.EMPTY;
      this._detachSubscription = rxjs__WEBPACK_IMPORTED_MODULE_6__.Subscription.EMPTY;
      this._positionSubscription = rxjs__WEBPACK_IMPORTED_MODULE_6__.Subscription.EMPTY;
      /** Margin between the overlay and the viewport edges. */
      this.viewportMargin = 0;
      /** Whether the overlay is open. */
      this.open = false;
      /** Whether the overlay can be closed by user interaction. */
      this.disableClose = false;
      /** Event emitted when the backdrop is clicked. */
      this.backdropClick = new _angular_core__WEBPACK_IMPORTED_MODULE_4__.EventEmitter();
      /** Event emitted when the position has changed. */
      this.positionChange = new _angular_core__WEBPACK_IMPORTED_MODULE_4__.EventEmitter();
      /** Event emitted when the overlay has been attached. */
      this.attach = new _angular_core__WEBPACK_IMPORTED_MODULE_4__.EventEmitter();
      /** Event emitted when the overlay has been detached. */
      this.detach = new _angular_core__WEBPACK_IMPORTED_MODULE_4__.EventEmitter();
      /** Emits when there are keyboard events that are targeted at the overlay. */
      this.overlayKeydown = new _angular_core__WEBPACK_IMPORTED_MODULE_4__.EventEmitter();
      /** Emits when there are mouse outside click events that are targeted at the overlay. */
      this.overlayOutsideClick = new _angular_core__WEBPACK_IMPORTED_MODULE_4__.EventEmitter();
      this._templatePortal = new _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_7__.TemplatePortal(templateRef, viewContainerRef);
      this._scrollStrategyFactory = scrollStrategyFactory;
      this.scrollStrategy = this._scrollStrategyFactory();
    }
    /** The associated overlay reference. */
    get overlayRef() {
      return this._overlayRef;
    }
    /** The element's layout direction. */
    get dir() {
      return this._dir ? this._dir.value : 'ltr';
    }
    ngOnDestroy() {
      this._attachSubscription.unsubscribe();
      this._detachSubscription.unsubscribe();
      this._backdropSubscription.unsubscribe();
      this._positionSubscription.unsubscribe();
      if (this._overlayRef) {
        this._overlayRef.dispose();
      }
    }
    ngOnChanges(changes) {
      if (this._position) {
        this._updatePositionStrategy(this._position);
        this._overlayRef.updateSize({
          width: this.width,
          minWidth: this.minWidth,
          height: this.height,
          minHeight: this.minHeight
        });
        if (changes['origin'] && this.open) {
          this._position.apply();
        }
      }
      if (changes['open']) {
        this.open ? this._attachOverlay() : this._detachOverlay();
      }
    }
    /** Creates an overlay */
    _createOverlay() {
      if (!this.positions || !this.positions.length) {
        this.positions = defaultPositionList;
      }
      const overlayRef = this._overlayRef = this._overlay.create(this._buildConfig());
      this._attachSubscription = overlayRef.attachments().subscribe(() => this.attach.emit());
      this._detachSubscription = overlayRef.detachments().subscribe(() => this.detach.emit());
      overlayRef.keydownEvents().subscribe(event => {
        this.overlayKeydown.next(event);
        if (event.keyCode === _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_9__.ESCAPE && !this.disableClose && !(0,_angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_9__.hasModifierKey)(event)) {
          event.preventDefault();
          this._detachOverlay();
        }
      });
      this._overlayRef.outsidePointerEvents().subscribe(event => {
        this.overlayOutsideClick.next(event);
      });
    }
    /** Builds the overlay config based on the directive's inputs */
    _buildConfig() {
      const positionStrategy = this._position = this.positionStrategy || this._createPositionStrategy();
      const overlayConfig = new OverlayConfig({
        direction: this._dir,
        positionStrategy,
        scrollStrategy: this.scrollStrategy,
        hasBackdrop: this.hasBackdrop
      });
      if (this.width || this.width === 0) {
        overlayConfig.width = this.width;
      }
      if (this.height || this.height === 0) {
        overlayConfig.height = this.height;
      }
      if (this.minWidth || this.minWidth === 0) {
        overlayConfig.minWidth = this.minWidth;
      }
      if (this.minHeight || this.minHeight === 0) {
        overlayConfig.minHeight = this.minHeight;
      }
      if (this.backdropClass) {
        overlayConfig.backdropClass = this.backdropClass;
      }
      if (this.panelClass) {
        overlayConfig.panelClass = this.panelClass;
      }
      return overlayConfig;
    }
    /** Updates the state of a position strategy, based on the values of the directive inputs. */
    _updatePositionStrategy(positionStrategy) {
      const positions = this.positions.map(currentPosition => ({
        originX: currentPosition.originX,
        originY: currentPosition.originY,
        overlayX: currentPosition.overlayX,
        overlayY: currentPosition.overlayY,
        offsetX: currentPosition.offsetX || this.offsetX,
        offsetY: currentPosition.offsetY || this.offsetY,
        panelClass: currentPosition.panelClass || undefined
      }));
      return positionStrategy.setOrigin(this._getFlexibleConnectedPositionStrategyOrigin()).withPositions(positions).withFlexibleDimensions(this.flexibleDimensions).withPush(this.push).withGrowAfterOpen(this.growAfterOpen).withViewportMargin(this.viewportMargin).withLockedPosition(this.lockPosition).withTransformOriginOn(this.transformOriginSelector);
    }
    /** Returns the position strategy of the overlay to be set on the overlay config */
    _createPositionStrategy() {
      const strategy = this._overlay.position().flexibleConnectedTo(this._getFlexibleConnectedPositionStrategyOrigin());
      this._updatePositionStrategy(strategy);
      return strategy;
    }
    _getFlexibleConnectedPositionStrategyOrigin() {
      if (this.origin instanceof CdkOverlayOrigin) {
        return this.origin.elementRef;
      } else {
        return this.origin;
      }
    }
    /** Attaches the overlay and subscribes to backdrop clicks if backdrop exists */
    _attachOverlay() {
      if (!this._overlayRef) {
        this._createOverlay();
      } else {
        // Update the overlay size, in case the directive's inputs have changed
        this._overlayRef.getConfig().hasBackdrop = this.hasBackdrop;
      }
      if (!this._overlayRef.hasAttached()) {
        this._overlayRef.attach(this._templatePortal);
      }
      if (this.hasBackdrop) {
        this._backdropSubscription = this._overlayRef.backdropClick().subscribe(event => {
          this.backdropClick.emit(event);
        });
      } else {
        this._backdropSubscription.unsubscribe();
      }
      this._positionSubscription.unsubscribe();
      // Only subscribe to `positionChanges` if requested, because putting
      // together all the information for it can be expensive.
      if (this.positionChange.observers.length > 0) {
        this._positionSubscription = this._position.positionChanges.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.takeWhile)(() => this.positionChange.observers.length > 0)).subscribe(position => {
          this.positionChange.emit(position);
          if (this.positionChange.observers.length === 0) {
            this._positionSubscription.unsubscribe();
          }
        });
      }
    }
    /** Detaches the overlay and unsubscribes to backdrop clicks if backdrop exists */
    _detachOverlay() {
      if (this._overlayRef) {
        this._overlayRef.detach();
      }
      this._backdropSubscription.unsubscribe();
      this._positionSubscription.unsubscribe();
    }
  }
  _class9 = CdkConnectedOverlay;
  _class9.ɵfac = function _class9_Factory(t) {
    return new (t || _class9)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](Overlay), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_4__.TemplateRef), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_4__.ViewContainerRef), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_8__.Directionality, 8));
  };
  _class9.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineDirective"]({
    type: _class9,
    selectors: [["", "cdk-connected-overlay", ""], ["", "connected-overlay", ""], ["", "cdkConnectedOverlay", ""]],
    inputs: {
      origin: ["cdkConnectedOverlayOrigin", "origin"],
      positions: ["cdkConnectedOverlayPositions", "positions"],
      positionStrategy: ["cdkConnectedOverlayPositionStrategy", "positionStrategy"],
      offsetX: ["cdkConnectedOverlayOffsetX", "offsetX"],
      offsetY: ["cdkConnectedOverlayOffsetY", "offsetY"],
      width: ["cdkConnectedOverlayWidth", "width"],
      height: ["cdkConnectedOverlayHeight", "height"],
      minWidth: ["cdkConnectedOverlayMinWidth", "minWidth"],
      minHeight: ["cdkConnectedOverlayMinHeight", "minHeight"],
      backdropClass: ["cdkConnectedOverlayBackdropClass", "backdropClass"],
      panelClass: ["cdkConnectedOverlayPanelClass", "panelClass"],
      viewportMargin: ["cdkConnectedOverlayViewportMargin", "viewportMargin"],
      scrollStrategy: ["cdkConnectedOverlayScrollStrategy", "scrollStrategy"],
      open: ["cdkConnectedOverlayOpen", "open"],
      disableClose: ["cdkConnectedOverlayDisableClose", "disableClose"],
      transformOriginSelector: ["cdkConnectedOverlayTransformOriginOn", "transformOriginSelector"],
      hasBackdrop: ["cdkConnectedOverlayHasBackdrop", "hasBackdrop"],
      lockPosition: ["cdkConnectedOverlayLockPosition", "lockPosition"],
      flexibleDimensions: ["cdkConnectedOverlayFlexibleDimensions", "flexibleDimensions"],
      growAfterOpen: ["cdkConnectedOverlayGrowAfterOpen", "growAfterOpen"],
      push: ["cdkConnectedOverlayPush", "push"]
    },
    outputs: {
      backdropClick: "backdropClick",
      positionChange: "positionChange",
      attach: "attach",
      detach: "detach",
      overlayKeydown: "overlayKeydown",
      overlayOutsideClick: "overlayOutsideClick"
    },
    exportAs: ["cdkConnectedOverlay"],
    standalone: true,
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵNgOnChangesFeature"]]
  });
  return CdkConnectedOverlay;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
/** @docs-private */
function CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY_PROVIDER_FACTORY(overlay) {
  return () => overlay.scrollStrategies.reposition();
}
/** @docs-private */
const CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY_PROVIDER = {
  provide: CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY,
  deps: [Overlay],
  useFactory: CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY_PROVIDER_FACTORY
};
let OverlayModule = /*#__PURE__*/(() => {
  var _class10;
  class OverlayModule {}
  _class10 = OverlayModule;
  _class10.ɵfac = function _class10_Factory(t) {
    return new (t || _class10)();
  };
  _class10.ɵmod = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({
    type: _class10
  });
  _class10.ɵinj = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({
    providers: [Overlay, CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY_PROVIDER],
    imports: [_angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_8__.BidiModule, _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_7__.PortalModule, _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_0__.ScrollingModule, _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_0__.ScrollingModule]
  });
  return OverlayModule;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();

/**
 * Alternative to OverlayContainer that supports correct displaying of overlay elements in
 * Fullscreen mode
 * https://developer.mozilla.org/en-US/docs/Web/API/Element/requestFullScreen
 *
 * Should be provided in the root component.
 */
let FullscreenOverlayContainer = /*#__PURE__*/(() => {
  var _class11;
  class FullscreenOverlayContainer extends OverlayContainer {
    constructor(_document, platform) {
      super(_document, platform);
    }
    ngOnDestroy() {
      super.ngOnDestroy();
      if (this._fullScreenEventName && this._fullScreenListener) {
        this._document.removeEventListener(this._fullScreenEventName, this._fullScreenListener);
      }
    }
    _createContainer() {
      super._createContainer();
      this._adjustParentForFullscreenChange();
      this._addFullscreenChangeListener(() => this._adjustParentForFullscreenChange());
    }
    _adjustParentForFullscreenChange() {
      if (!this._containerElement) {
        return;
      }
      const fullscreenElement = this.getFullscreenElement();
      const parent = fullscreenElement || this._document.body;
      parent.appendChild(this._containerElement);
    }
    _addFullscreenChangeListener(fn) {
      const eventName = this._getEventName();
      if (eventName) {
        if (this._fullScreenListener) {
          this._document.removeEventListener(eventName, this._fullScreenListener);
        }
        this._document.addEventListener(eventName, fn);
        this._fullScreenListener = fn;
      }
    }
    _getEventName() {
      if (!this._fullScreenEventName) {
        const _document = this._document;
        if (_document.fullscreenEnabled) {
          this._fullScreenEventName = 'fullscreenchange';
        } else if (_document.webkitFullscreenEnabled) {
          this._fullScreenEventName = 'webkitfullscreenchange';
        } else if (_document.mozFullScreenEnabled) {
          this._fullScreenEventName = 'mozfullscreenchange';
        } else if (_document.msFullscreenEnabled) {
          this._fullScreenEventName = 'MSFullscreenChange';
        }
      }
      return this._fullScreenEventName;
    }
    /**
     * When the page is put into fullscreen mode, a specific element is specified.
     * Only that element and its children are visible when in fullscreen mode.
     */
    getFullscreenElement() {
      const _document = this._document;
      return _document.fullscreenElement || _document.webkitFullscreenElement || _document.mozFullScreenElement || _document.msFullscreenElement || null;
    }
  }
  _class11 = FullscreenOverlayContainer;
  _class11.ɵfac = function _class11_Factory(t) {
    return new (t || _class11)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_angular_common__WEBPACK_IMPORTED_MODULE_5__.DOCUMENT), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_1__.Platform));
  };
  _class11.ɵprov = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({
    token: _class11,
    factory: _class11.ɵfac,
    providedIn: 'root'
  });
  return FullscreenOverlayContainer;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();

/**
 * Generated bundle index. Do not edit.
 */



/***/ }),

/***/ 85354:
/*!*******************************************************!*\
  !*** ./node_modules/@angular/cdk/fesm2022/portal.mjs ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BasePortalHost: () => (/* binding */ BasePortalHost),
/* harmony export */   BasePortalOutlet: () => (/* binding */ BasePortalOutlet),
/* harmony export */   CdkPortal: () => (/* binding */ CdkPortal),
/* harmony export */   CdkPortalOutlet: () => (/* binding */ CdkPortalOutlet),
/* harmony export */   ComponentPortal: () => (/* binding */ ComponentPortal),
/* harmony export */   DomPortal: () => (/* binding */ DomPortal),
/* harmony export */   DomPortalHost: () => (/* binding */ DomPortalHost),
/* harmony export */   DomPortalOutlet: () => (/* binding */ DomPortalOutlet),
/* harmony export */   Portal: () => (/* binding */ Portal),
/* harmony export */   PortalHostDirective: () => (/* binding */ PortalHostDirective),
/* harmony export */   PortalInjector: () => (/* binding */ PortalInjector),
/* harmony export */   PortalModule: () => (/* binding */ PortalModule),
/* harmony export */   TemplatePortal: () => (/* binding */ TemplatePortal),
/* harmony export */   TemplatePortalDirective: () => (/* binding */ TemplatePortalDirective)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 59936);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 34228);




/**
 * Throws an exception when attempting to attach a null portal to a host.
 * @docs-private
 */
function throwNullPortalError() {
  throw Error('Must provide a portal to attach');
}
/**
 * Throws an exception when attempting to attach a portal to a host that is already attached.
 * @docs-private
 */
function throwPortalAlreadyAttachedError() {
  throw Error('Host already has a portal attached');
}
/**
 * Throws an exception when attempting to attach a portal to an already-disposed host.
 * @docs-private
 */
function throwPortalOutletAlreadyDisposedError() {
  throw Error('This PortalOutlet has already been disposed');
}
/**
 * Throws an exception when attempting to attach an unknown portal type.
 * @docs-private
 */
function throwUnknownPortalTypeError() {
  throw Error('Attempting to attach an unknown Portal type. BasePortalOutlet accepts either ' + 'a ComponentPortal or a TemplatePortal.');
}
/**
 * Throws an exception when attempting to attach a portal to a null host.
 * @docs-private
 */
function throwNullPortalOutletError() {
  throw Error('Attempting to attach a portal to a null PortalOutlet');
}
/**
 * Throws an exception when attempting to detach a portal that is not attached.
 * @docs-private
 */
function throwNoPortalAttachedError() {
  throw Error('Attempting to detach a portal that is not attached to a host');
}

/**
 * A `Portal` is something that you want to render somewhere else.
 * It can be attach to / detached from a `PortalOutlet`.
 */
class Portal {
  /** Attach this portal to a host. */
  attach(host) {
    if (typeof ngDevMode === 'undefined' || ngDevMode) {
      if (host == null) {
        throwNullPortalOutletError();
      }
      if (host.hasAttached()) {
        throwPortalAlreadyAttachedError();
      }
    }
    this._attachedHost = host;
    return host.attach(this);
  }
  /** Detach this portal from its host */
  detach() {
    let host = this._attachedHost;
    if (host != null) {
      this._attachedHost = null;
      host.detach();
    } else if (typeof ngDevMode === 'undefined' || ngDevMode) {
      throwNoPortalAttachedError();
    }
  }
  /** Whether this portal is attached to a host. */
  get isAttached() {
    return this._attachedHost != null;
  }
  /**
   * Sets the PortalOutlet reference without performing `attach()`. This is used directly by
   * the PortalOutlet when it is performing an `attach()` or `detach()`.
   */
  setAttachedHost(host) {
    this._attachedHost = host;
  }
}
/**
 * A `ComponentPortal` is a portal that instantiates some Component upon attachment.
 */
class ComponentPortal extends Portal {
  constructor(component, viewContainerRef, injector, componentFactoryResolver, projectableNodes) {
    super();
    this.component = component;
    this.viewContainerRef = viewContainerRef;
    this.injector = injector;
    this.componentFactoryResolver = componentFactoryResolver;
    this.projectableNodes = projectableNodes;
  }
}
/**
 * A `TemplatePortal` is a portal that represents some embedded template (TemplateRef).
 */
class TemplatePortal extends Portal {
  constructor( /** The embedded template that will be used to instantiate an embedded View in the host. */
  templateRef, /** Reference to the ViewContainer into which the template will be stamped out. */
  viewContainerRef, /** Contextual data to be passed in to the embedded view. */
  context, /** The injector to use for the embedded view. */
  injector) {
    super();
    this.templateRef = templateRef;
    this.viewContainerRef = viewContainerRef;
    this.context = context;
    this.injector = injector;
  }
  get origin() {
    return this.templateRef.elementRef;
  }
  /**
   * Attach the portal to the provided `PortalOutlet`.
   * When a context is provided it will override the `context` property of the `TemplatePortal`
   * instance.
   */
  attach(host, context = this.context) {
    this.context = context;
    return super.attach(host);
  }
  detach() {
    this.context = undefined;
    return super.detach();
  }
}
/**
 * A `DomPortal` is a portal whose DOM element will be taken from its current position
 * in the DOM and moved into a portal outlet, when it is attached. On detach, the content
 * will be restored to its original position.
 */
class DomPortal extends Portal {
  constructor(element) {
    super();
    this.element = element instanceof _angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef ? element.nativeElement : element;
  }
}
/**
 * Partial implementation of PortalOutlet that handles attaching
 * ComponentPortal and TemplatePortal.
 */
class BasePortalOutlet {
  constructor() {
    /** Whether this host has already been permanently disposed. */
    this._isDisposed = false;
    // @breaking-change 10.0.0 `attachDomPortal` to become a required abstract method.
    this.attachDomPortal = null;
  }
  /** Whether this host has an attached portal. */
  hasAttached() {
    return !!this._attachedPortal;
  }
  /** Attaches a portal. */
  attach(portal) {
    if (typeof ngDevMode === 'undefined' || ngDevMode) {
      if (!portal) {
        throwNullPortalError();
      }
      if (this.hasAttached()) {
        throwPortalAlreadyAttachedError();
      }
      if (this._isDisposed) {
        throwPortalOutletAlreadyDisposedError();
      }
    }
    if (portal instanceof ComponentPortal) {
      this._attachedPortal = portal;
      return this.attachComponentPortal(portal);
    } else if (portal instanceof TemplatePortal) {
      this._attachedPortal = portal;
      return this.attachTemplatePortal(portal);
      // @breaking-change 10.0.0 remove null check for `this.attachDomPortal`.
    } else if (this.attachDomPortal && portal instanceof DomPortal) {
      this._attachedPortal = portal;
      return this.attachDomPortal(portal);
    }
    if (typeof ngDevMode === 'undefined' || ngDevMode) {
      throwUnknownPortalTypeError();
    }
  }
  /** Detaches a previously attached portal. */
  detach() {
    if (this._attachedPortal) {
      this._attachedPortal.setAttachedHost(null);
      this._attachedPortal = null;
    }
    this._invokeDisposeFn();
  }
  /** Permanently dispose of this portal host. */
  dispose() {
    if (this.hasAttached()) {
      this.detach();
    }
    this._invokeDisposeFn();
    this._isDisposed = true;
  }
  /** @docs-private */
  setDisposeFn(fn) {
    this._disposeFn = fn;
  }
  _invokeDisposeFn() {
    if (this._disposeFn) {
      this._disposeFn();
      this._disposeFn = null;
    }
  }
}
/**
 * @deprecated Use `BasePortalOutlet` instead.
 * @breaking-change 9.0.0
 */
class BasePortalHost extends BasePortalOutlet {}

/**
 * A PortalOutlet for attaching portals to an arbitrary DOM element outside of the Angular
 * application context.
 */
class DomPortalOutlet extends BasePortalOutlet {
  /**
   * @param outletElement Element into which the content is projected.
   * @param _componentFactoryResolver Used to resolve the component factory.
   *   Only required when attaching component portals.
   * @param _appRef Reference to the application. Only used in component portals when there
   *   is no `ViewContainerRef` available.
   * @param _defaultInjector Injector to use as a fallback when the portal being attached doesn't
   *   have one. Only used for component portals.
   * @param _document Reference to the document. Used when attaching a DOM portal. Will eventually
   *   become a required parameter.
   */
  constructor( /** Element into which the content is projected. */
  outletElement, _componentFactoryResolver, _appRef, _defaultInjector,
  /**
   * @deprecated `_document` Parameter to be made required.
   * @breaking-change 10.0.0
   */
  _document) {
    super();
    this.outletElement = outletElement;
    this._componentFactoryResolver = _componentFactoryResolver;
    this._appRef = _appRef;
    this._defaultInjector = _defaultInjector;
    /**
     * Attaches a DOM portal by transferring its content into the outlet.
     * @param portal Portal to be attached.
     * @deprecated To be turned into a method.
     * @breaking-change 10.0.0
     */
    this.attachDomPortal = portal => {
      // @breaking-change 10.0.0 Remove check and error once the
      // `_document` constructor parameter is required.
      if (!this._document && (typeof ngDevMode === 'undefined' || ngDevMode)) {
        throw Error('Cannot attach DOM portal without _document constructor parameter');
      }
      const element = portal.element;
      if (!element.parentNode && (typeof ngDevMode === 'undefined' || ngDevMode)) {
        throw Error('DOM portal content must be attached to a parent node.');
      }
      // Anchor used to save the element's previous position so
      // that we can restore it when the portal is detached.
      const anchorNode = this._document.createComment('dom-portal');
      element.parentNode.insertBefore(anchorNode, element);
      this.outletElement.appendChild(element);
      this._attachedPortal = portal;
      super.setDisposeFn(() => {
        // We can't use `replaceWith` here because IE doesn't support it.
        if (anchorNode.parentNode) {
          anchorNode.parentNode.replaceChild(element, anchorNode);
        }
      });
    };
    this._document = _document;
  }
  /**
   * Attach the given ComponentPortal to DOM element using the ComponentFactoryResolver.
   * @param portal Portal to be attached
   * @returns Reference to the created component.
   */
  attachComponentPortal(portal) {
    const resolver = portal.componentFactoryResolver || this._componentFactoryResolver;
    if ((typeof ngDevMode === 'undefined' || ngDevMode) && !resolver) {
      throw Error('Cannot attach component portal to outlet without a ComponentFactoryResolver.');
    }
    const componentFactory = resolver.resolveComponentFactory(portal.component);
    let componentRef;
    // If the portal specifies a ViewContainerRef, we will use that as the attachment point
    // for the component (in terms of Angular's component tree, not rendering).
    // When the ViewContainerRef is missing, we use the factory to create the component directly
    // and then manually attach the view to the application.
    if (portal.viewContainerRef) {
      componentRef = portal.viewContainerRef.createComponent(componentFactory, portal.viewContainerRef.length, portal.injector || portal.viewContainerRef.injector, portal.projectableNodes || undefined);
      this.setDisposeFn(() => componentRef.destroy());
    } else {
      if ((typeof ngDevMode === 'undefined' || ngDevMode) && !this._appRef) {
        throw Error('Cannot attach component portal to outlet without an ApplicationRef.');
      }
      componentRef = componentFactory.create(portal.injector || this._defaultInjector || _angular_core__WEBPACK_IMPORTED_MODULE_0__.Injector.NULL);
      this._appRef.attachView(componentRef.hostView);
      this.setDisposeFn(() => {
        // Verify that the ApplicationRef has registered views before trying to detach a host view.
        // This check also protects the `detachView` from being called on a destroyed ApplicationRef.
        if (this._appRef.viewCount > 0) {
          this._appRef.detachView(componentRef.hostView);
        }
        componentRef.destroy();
      });
    }
    // At this point the component has been instantiated, so we move it to the location in the DOM
    // where we want it to be rendered.
    this.outletElement.appendChild(this._getComponentRootNode(componentRef));
    this._attachedPortal = portal;
    return componentRef;
  }
  /**
   * Attaches a template portal to the DOM as an embedded view.
   * @param portal Portal to be attached.
   * @returns Reference to the created embedded view.
   */
  attachTemplatePortal(portal) {
    let viewContainer = portal.viewContainerRef;
    let viewRef = viewContainer.createEmbeddedView(portal.templateRef, portal.context, {
      injector: portal.injector
    });
    // The method `createEmbeddedView` will add the view as a child of the viewContainer.
    // But for the DomPortalOutlet the view can be added everywhere in the DOM
    // (e.g Overlay Container) To move the view to the specified host element. We just
    // re-append the existing root nodes.
    viewRef.rootNodes.forEach(rootNode => this.outletElement.appendChild(rootNode));
    // Note that we want to detect changes after the nodes have been moved so that
    // any directives inside the portal that are looking at the DOM inside a lifecycle
    // hook won't be invoked too early.
    viewRef.detectChanges();
    this.setDisposeFn(() => {
      let index = viewContainer.indexOf(viewRef);
      if (index !== -1) {
        viewContainer.remove(index);
      }
    });
    this._attachedPortal = portal;
    // TODO(jelbourn): Return locals from view.
    return viewRef;
  }
  /**
   * Clears out a portal from the DOM.
   */
  dispose() {
    super.dispose();
    this.outletElement.remove();
  }
  /** Gets the root HTMLElement for an instantiated component. */
  _getComponentRootNode(componentRef) {
    return componentRef.hostView.rootNodes[0];
  }
}
/**
 * @deprecated Use `DomPortalOutlet` instead.
 * @breaking-change 9.0.0
 */
class DomPortalHost extends DomPortalOutlet {}

/**
 * Directive version of a `TemplatePortal`. Because the directive *is* a TemplatePortal,
 * the directive instance itself can be attached to a host, enabling declarative use of portals.
 */
let CdkPortal = /*#__PURE__*/(() => {
  var _class;
  class CdkPortal extends TemplatePortal {
    constructor(templateRef, viewContainerRef) {
      super(templateRef, viewContainerRef);
    }
  }
  _class = CdkPortal;
  _class.ɵfac = function _class_Factory(t) {
    return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.TemplateRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewContainerRef));
  };
  _class.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
    type: _class,
    selectors: [["", "cdkPortal", ""]],
    exportAs: ["cdkPortal"],
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]]
  });
  return CdkPortal;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
/**
 * @deprecated Use `CdkPortal` instead.
 * @breaking-change 9.0.0
 */
let TemplatePortalDirective = /*#__PURE__*/(() => {
  var _class2;
  class TemplatePortalDirective extends CdkPortal {}
  _class2 = TemplatePortalDirective;
  _class2.ɵfac = /* @__PURE__ */function () {
    let ɵ_class2_BaseFactory;
    return function _class2_Factory(t) {
      return (ɵ_class2_BaseFactory || (ɵ_class2_BaseFactory = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetInheritedFactory"](_class2)))(t || _class2);
    };
  }();
  _class2.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
    type: _class2,
    selectors: [["", "cdk-portal", ""], ["", "portal", ""]],
    exportAs: ["cdkPortal"],
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([{
      provide: CdkPortal,
      useExisting: _class2
    }]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]]
  });
  return TemplatePortalDirective;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
/**
 * Directive version of a PortalOutlet. Because the directive *is* a PortalOutlet, portals can be
 * directly attached to it, enabling declarative use.
 *
 * Usage:
 * `<ng-template [cdkPortalOutlet]="greeting"></ng-template>`
 */
let CdkPortalOutlet = /*#__PURE__*/(() => {
  var _class3;
  class CdkPortalOutlet extends BasePortalOutlet {
    constructor(_componentFactoryResolver, _viewContainerRef,
    /**
     * @deprecated `_document` parameter to be made required.
     * @breaking-change 9.0.0
     */
    _document) {
      super();
      this._componentFactoryResolver = _componentFactoryResolver;
      this._viewContainerRef = _viewContainerRef;
      /** Whether the portal component is initialized. */
      this._isInitialized = false;
      /** Emits when a portal is attached to the outlet. */
      this.attached = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
      /**
       * Attaches the given DomPortal to this PortalHost by moving all of the portal content into it.
       * @param portal Portal to be attached.
       * @deprecated To be turned into a method.
       * @breaking-change 10.0.0
       */
      this.attachDomPortal = portal => {
        // @breaking-change 9.0.0 Remove check and error once the
        // `_document` constructor parameter is required.
        if (!this._document && (typeof ngDevMode === 'undefined' || ngDevMode)) {
          throw Error('Cannot attach DOM portal without _document constructor parameter');
        }
        const element = portal.element;
        if (!element.parentNode && (typeof ngDevMode === 'undefined' || ngDevMode)) {
          throw Error('DOM portal content must be attached to a parent node.');
        }
        // Anchor used to save the element's previous position so
        // that we can restore it when the portal is detached.
        const anchorNode = this._document.createComment('dom-portal');
        portal.setAttachedHost(this);
        element.parentNode.insertBefore(anchorNode, element);
        this._getRootNode().appendChild(element);
        this._attachedPortal = portal;
        super.setDisposeFn(() => {
          if (anchorNode.parentNode) {
            anchorNode.parentNode.replaceChild(element, anchorNode);
          }
        });
      };
      this._document = _document;
    }
    /** Portal associated with the Portal outlet. */
    get portal() {
      return this._attachedPortal;
    }
    set portal(portal) {
      // Ignore the cases where the `portal` is set to a falsy value before the lifecycle hooks have
      // run. This handles the cases where the user might do something like `<div cdkPortalOutlet>`
      // and attach a portal programmatically in the parent component. When Angular does the first CD
      // round, it will fire the setter with empty string, causing the user's content to be cleared.
      if (this.hasAttached() && !portal && !this._isInitialized) {
        return;
      }
      if (this.hasAttached()) {
        super.detach();
      }
      if (portal) {
        super.attach(portal);
      }
      this._attachedPortal = portal || null;
    }
    /** Component or view reference that is attached to the portal. */
    get attachedRef() {
      return this._attachedRef;
    }
    ngOnInit() {
      this._isInitialized = true;
    }
    ngOnDestroy() {
      super.dispose();
      this._attachedRef = this._attachedPortal = null;
    }
    /**
     * Attach the given ComponentPortal to this PortalOutlet using the ComponentFactoryResolver.
     *
     * @param portal Portal to be attached to the portal outlet.
     * @returns Reference to the created component.
     */
    attachComponentPortal(portal) {
      portal.setAttachedHost(this);
      // If the portal specifies an origin, use that as the logical location of the component
      // in the application tree. Otherwise use the location of this PortalOutlet.
      const viewContainerRef = portal.viewContainerRef != null ? portal.viewContainerRef : this._viewContainerRef;
      const resolver = portal.componentFactoryResolver || this._componentFactoryResolver;
      const componentFactory = resolver.resolveComponentFactory(portal.component);
      const ref = viewContainerRef.createComponent(componentFactory, viewContainerRef.length, portal.injector || viewContainerRef.injector, portal.projectableNodes || undefined);
      // If we're using a view container that's different from the injected one (e.g. when the portal
      // specifies its own) we need to move the component into the outlet, otherwise it'll be rendered
      // inside of the alternate view container.
      if (viewContainerRef !== this._viewContainerRef) {
        this._getRootNode().appendChild(ref.hostView.rootNodes[0]);
      }
      super.setDisposeFn(() => ref.destroy());
      this._attachedPortal = portal;
      this._attachedRef = ref;
      this.attached.emit(ref);
      return ref;
    }
    /**
     * Attach the given TemplatePortal to this PortalHost as an embedded View.
     * @param portal Portal to be attached.
     * @returns Reference to the created embedded view.
     */
    attachTemplatePortal(portal) {
      portal.setAttachedHost(this);
      const viewRef = this._viewContainerRef.createEmbeddedView(portal.templateRef, portal.context, {
        injector: portal.injector
      });
      super.setDisposeFn(() => this._viewContainerRef.clear());
      this._attachedPortal = portal;
      this._attachedRef = viewRef;
      this.attached.emit(viewRef);
      return viewRef;
    }
    /** Gets the root node of the portal outlet. */
    _getRootNode() {
      const nativeElement = this._viewContainerRef.element.nativeElement;
      // The directive could be set on a template which will result in a comment
      // node being the root. Use the comment's parent node if that is the case.
      return nativeElement.nodeType === nativeElement.ELEMENT_NODE ? nativeElement : nativeElement.parentNode;
    }
  }
  _class3 = CdkPortalOutlet;
  _class3.ɵfac = function _class3_Factory(t) {
    return new (t || _class3)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ComponentFactoryResolver), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewContainerRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_1__.DOCUMENT));
  };
  _class3.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
    type: _class3,
    selectors: [["", "cdkPortalOutlet", ""]],
    inputs: {
      portal: ["cdkPortalOutlet", "portal"]
    },
    outputs: {
      attached: "attached"
    },
    exportAs: ["cdkPortalOutlet"],
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]]
  });
  return CdkPortalOutlet;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
/**
 * @deprecated Use `CdkPortalOutlet` instead.
 * @breaking-change 9.0.0
 */
let PortalHostDirective = /*#__PURE__*/(() => {
  var _class4;
  class PortalHostDirective extends CdkPortalOutlet {}
  _class4 = PortalHostDirective;
  _class4.ɵfac = /* @__PURE__ */function () {
    let ɵ_class4_BaseFactory;
    return function _class4_Factory(t) {
      return (ɵ_class4_BaseFactory || (ɵ_class4_BaseFactory = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetInheritedFactory"](_class4)))(t || _class4);
    };
  }();
  _class4.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
    type: _class4,
    selectors: [["", "cdkPortalHost", ""], ["", "portalHost", ""]],
    inputs: {
      portal: ["cdkPortalHost", "portal"]
    },
    exportAs: ["cdkPortalHost"],
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([{
      provide: CdkPortalOutlet,
      useExisting: _class4
    }]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]]
  });
  return PortalHostDirective;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
let PortalModule = /*#__PURE__*/(() => {
  var _class5;
  class PortalModule {}
  _class5 = PortalModule;
  _class5.ɵfac = function _class5_Factory(t) {
    return new (t || _class5)();
  };
  _class5.ɵmod = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
    type: _class5
  });
  _class5.ɵinj = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({});
  return PortalModule;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();

/**
 * Custom injector to be used when providing custom
 * injection tokens to components inside a portal.
 * @docs-private
 * @deprecated Use `Injector.create` instead.
 * @breaking-change 11.0.0
 */
class PortalInjector {
  constructor(_parentInjector, _customTokens) {
    this._parentInjector = _parentInjector;
    this._customTokens = _customTokens;
  }
  get(token, notFoundValue) {
    const value = this._customTokens.get(token);
    if (typeof value !== 'undefined') {
      return value;
    }
    return this._parentInjector.get(token, notFoundValue);
  }
}

/**
 * Generated bundle index. Do not edit.
 */



/***/ }),

/***/ 7641:
/*!**********************************************************!*\
  !*** ./node_modules/@angular/cdk/fesm2022/scrolling.mjs ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CdkFixedSizeVirtualScroll: () => (/* binding */ CdkFixedSizeVirtualScroll),
/* harmony export */   CdkScrollable: () => (/* binding */ CdkScrollable),
/* harmony export */   CdkScrollableModule: () => (/* binding */ CdkScrollableModule),
/* harmony export */   CdkVirtualForOf: () => (/* binding */ CdkVirtualForOf),
/* harmony export */   CdkVirtualScrollViewport: () => (/* binding */ CdkVirtualScrollViewport),
/* harmony export */   CdkVirtualScrollable: () => (/* binding */ CdkVirtualScrollable),
/* harmony export */   CdkVirtualScrollableElement: () => (/* binding */ CdkVirtualScrollableElement),
/* harmony export */   CdkVirtualScrollableWindow: () => (/* binding */ CdkVirtualScrollableWindow),
/* harmony export */   DEFAULT_RESIZE_TIME: () => (/* binding */ DEFAULT_RESIZE_TIME),
/* harmony export */   DEFAULT_SCROLL_TIME: () => (/* binding */ DEFAULT_SCROLL_TIME),
/* harmony export */   FixedSizeVirtualScrollStrategy: () => (/* binding */ FixedSizeVirtualScrollStrategy),
/* harmony export */   ScrollDispatcher: () => (/* binding */ ScrollDispatcher),
/* harmony export */   ScrollingModule: () => (/* binding */ ScrollingModule),
/* harmony export */   VIRTUAL_SCROLLABLE: () => (/* binding */ VIRTUAL_SCROLLABLE),
/* harmony export */   VIRTUAL_SCROLL_STRATEGY: () => (/* binding */ VIRTUAL_SCROLL_STRATEGY),
/* harmony export */   ViewportRuler: () => (/* binding */ ViewportRuler),
/* harmony export */   _fixedSizeVirtualScrollStrategyFactory: () => (/* binding */ _fixedSizeVirtualScrollStrategyFactory)
/* harmony export */ });
/* harmony import */ var _angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/cdk/coercion */ 45029);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 59936);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 85028);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 33410);
/* harmony import */ var _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/cdk/platform */ 92237);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 34228);
/* harmony import */ var _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/cdk/bidi */ 29988);
/* harmony import */ var _angular_cdk_collections__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/cdk/collections */ 27047);













/** The injection token used to specify the virtual scrolling strategy. */
const _c0 = ["contentWrapper"];
const _c1 = ["*"];
const VIRTUAL_SCROLL_STRATEGY = /*#__PURE__*/new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken('VIRTUAL_SCROLL_STRATEGY');

/** Virtual scrolling strategy for lists with items of known fixed size. */
class FixedSizeVirtualScrollStrategy {
  /**
   * @param itemSize The size of the items in the virtually scrolling list.
   * @param minBufferPx The minimum amount of buffer (in pixels) before needing to render more
   * @param maxBufferPx The amount of buffer (in pixels) to render when rendering more.
   */
  constructor(itemSize, minBufferPx, maxBufferPx) {
    this._scrolledIndexChange = new rxjs__WEBPACK_IMPORTED_MODULE_1__.Subject();
    /** @docs-private Implemented as part of VirtualScrollStrategy. */
    this.scrolledIndexChange = this._scrolledIndexChange.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.distinctUntilChanged)());
    /** The attached viewport. */
    this._viewport = null;
    this._itemSize = itemSize;
    this._minBufferPx = minBufferPx;
    this._maxBufferPx = maxBufferPx;
  }
  /**
   * Attaches this scroll strategy to a viewport.
   * @param viewport The viewport to attach this strategy to.
   */
  attach(viewport) {
    this._viewport = viewport;
    this._updateTotalContentSize();
    this._updateRenderedRange();
  }
  /** Detaches this scroll strategy from the currently attached viewport. */
  detach() {
    this._scrolledIndexChange.complete();
    this._viewport = null;
  }
  /**
   * Update the item size and buffer size.
   * @param itemSize The size of the items in the virtually scrolling list.
   * @param minBufferPx The minimum amount of buffer (in pixels) before needing to render more
   * @param maxBufferPx The amount of buffer (in pixels) to render when rendering more.
   */
  updateItemAndBufferSize(itemSize, minBufferPx, maxBufferPx) {
    if (maxBufferPx < minBufferPx && (typeof ngDevMode === 'undefined' || ngDevMode)) {
      throw Error('CDK virtual scroll: maxBufferPx must be greater than or equal to minBufferPx');
    }
    this._itemSize = itemSize;
    this._minBufferPx = minBufferPx;
    this._maxBufferPx = maxBufferPx;
    this._updateTotalContentSize();
    this._updateRenderedRange();
  }
  /** @docs-private Implemented as part of VirtualScrollStrategy. */
  onContentScrolled() {
    this._updateRenderedRange();
  }
  /** @docs-private Implemented as part of VirtualScrollStrategy. */
  onDataLengthChanged() {
    this._updateTotalContentSize();
    this._updateRenderedRange();
  }
  /** @docs-private Implemented as part of VirtualScrollStrategy. */
  onContentRendered() {
    /* no-op */
  }
  /** @docs-private Implemented as part of VirtualScrollStrategy. */
  onRenderedOffsetChanged() {
    /* no-op */
  }
  /**
   * Scroll to the offset for the given index.
   * @param index The index of the element to scroll to.
   * @param behavior The ScrollBehavior to use when scrolling.
   */
  scrollToIndex(index, behavior) {
    if (this._viewport) {
      this._viewport.scrollToOffset(index * this._itemSize, behavior);
    }
  }
  /** Update the viewport's total content size. */
  _updateTotalContentSize() {
    if (!this._viewport) {
      return;
    }
    this._viewport.setTotalContentSize(this._viewport.getDataLength() * this._itemSize);
  }
  /** Update the viewport's rendered range. */
  _updateRenderedRange() {
    if (!this._viewport) {
      return;
    }
    const renderedRange = this._viewport.getRenderedRange();
    const newRange = {
      start: renderedRange.start,
      end: renderedRange.end
    };
    const viewportSize = this._viewport.getViewportSize();
    const dataLength = this._viewport.getDataLength();
    let scrollOffset = this._viewport.measureScrollOffset();
    // Prevent NaN as result when dividing by zero.
    let firstVisibleIndex = this._itemSize > 0 ? scrollOffset / this._itemSize : 0;
    // If user scrolls to the bottom of the list and data changes to a smaller list
    if (newRange.end > dataLength) {
      // We have to recalculate the first visible index based on new data length and viewport size.
      const maxVisibleItems = Math.ceil(viewportSize / this._itemSize);
      const newVisibleIndex = Math.max(0, Math.min(firstVisibleIndex, dataLength - maxVisibleItems));
      // If first visible index changed we must update scroll offset to handle start/end buffers
      // Current range must also be adjusted to cover the new position (bottom of new list).
      if (firstVisibleIndex != newVisibleIndex) {
        firstVisibleIndex = newVisibleIndex;
        scrollOffset = newVisibleIndex * this._itemSize;
        newRange.start = Math.floor(firstVisibleIndex);
      }
      newRange.end = Math.max(0, Math.min(dataLength, newRange.start + maxVisibleItems));
    }
    const startBuffer = scrollOffset - newRange.start * this._itemSize;
    if (startBuffer < this._minBufferPx && newRange.start != 0) {
      const expandStart = Math.ceil((this._maxBufferPx - startBuffer) / this._itemSize);
      newRange.start = Math.max(0, newRange.start - expandStart);
      newRange.end = Math.min(dataLength, Math.ceil(firstVisibleIndex + (viewportSize + this._minBufferPx) / this._itemSize));
    } else {
      const endBuffer = newRange.end * this._itemSize - (scrollOffset + viewportSize);
      if (endBuffer < this._minBufferPx && newRange.end != dataLength) {
        const expandEnd = Math.ceil((this._maxBufferPx - endBuffer) / this._itemSize);
        if (expandEnd > 0) {
          newRange.end = Math.min(dataLength, newRange.end + expandEnd);
          newRange.start = Math.max(0, Math.floor(firstVisibleIndex - this._minBufferPx / this._itemSize));
        }
      }
    }
    this._viewport.setRenderedRange(newRange);
    this._viewport.setRenderedContentOffset(this._itemSize * newRange.start);
    this._scrolledIndexChange.next(Math.floor(firstVisibleIndex));
  }
}
/**
 * Provider factory for `FixedSizeVirtualScrollStrategy` that simply extracts the already created
 * `FixedSizeVirtualScrollStrategy` from the given directive.
 * @param fixedSizeDir The instance of `CdkFixedSizeVirtualScroll` to extract the
 *     `FixedSizeVirtualScrollStrategy` from.
 */
function _fixedSizeVirtualScrollStrategyFactory(fixedSizeDir) {
  return fixedSizeDir._scrollStrategy;
}
/** A virtual scroll strategy that supports fixed-size items. */
let CdkFixedSizeVirtualScroll = /*#__PURE__*/(() => {
  var _class;
  class CdkFixedSizeVirtualScroll {
    constructor() {
      this._itemSize = 20;
      this._minBufferPx = 100;
      this._maxBufferPx = 200;
      /** The scroll strategy used by this directive. */
      this._scrollStrategy = new FixedSizeVirtualScrollStrategy(this.itemSize, this.minBufferPx, this.maxBufferPx);
    }
    /** The size of the items in the list (in pixels). */
    get itemSize() {
      return this._itemSize;
    }
    set itemSize(value) {
      this._itemSize = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_3__.coerceNumberProperty)(value);
    }
    /**
     * The minimum amount of buffer rendered beyond the viewport (in pixels).
     * If the amount of buffer dips below this number, more items will be rendered. Defaults to 100px.
     */
    get minBufferPx() {
      return this._minBufferPx;
    }
    set minBufferPx(value) {
      this._minBufferPx = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_3__.coerceNumberProperty)(value);
    }
    /**
     * The number of pixels worth of buffer to render for when rendering new items. Defaults to 200px.
     */
    get maxBufferPx() {
      return this._maxBufferPx;
    }
    set maxBufferPx(value) {
      this._maxBufferPx = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_3__.coerceNumberProperty)(value);
    }
    ngOnChanges() {
      this._scrollStrategy.updateItemAndBufferSize(this.itemSize, this.minBufferPx, this.maxBufferPx);
    }
  }
  _class = CdkFixedSizeVirtualScroll;
  _class.ɵfac = function _class_Factory(t) {
    return new (t || _class)();
  };
  _class.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
    type: _class,
    selectors: [["cdk-virtual-scroll-viewport", "itemSize", ""]],
    inputs: {
      itemSize: "itemSize",
      minBufferPx: "minBufferPx",
      maxBufferPx: "maxBufferPx"
    },
    standalone: true,
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([{
      provide: VIRTUAL_SCROLL_STRATEGY,
      useFactory: _fixedSizeVirtualScrollStrategyFactory,
      deps: [(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(() => _class)]
    }]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵNgOnChangesFeature"]]
  });
  return CdkFixedSizeVirtualScroll;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();

/** Time in ms to throttle the scrolling events by default. */
const DEFAULT_SCROLL_TIME = 20;
/**
 * Service contained all registered Scrollable references and emits an event when any one of the
 * Scrollable references emit a scrolled event.
 */
let ScrollDispatcher = /*#__PURE__*/(() => {
  var _class2;
  class ScrollDispatcher {
    constructor(_ngZone, _platform, document) {
      this._ngZone = _ngZone;
      this._platform = _platform;
      /** Subject for notifying that a registered scrollable reference element has been scrolled. */
      this._scrolled = new rxjs__WEBPACK_IMPORTED_MODULE_1__.Subject();
      /** Keeps track of the global `scroll` and `resize` subscriptions. */
      this._globalSubscription = null;
      /** Keeps track of the amount of subscriptions to `scrolled`. Used for cleaning up afterwards. */
      this._scrolledCount = 0;
      /**
       * Map of all the scrollable references that are registered with the service and their
       * scroll event subscriptions.
       */
      this.scrollContainers = new Map();
      this._document = document;
    }
    /**
     * Registers a scrollable instance with the service and listens for its scrolled events. When the
     * scrollable is scrolled, the service emits the event to its scrolled observable.
     * @param scrollable Scrollable instance to be registered.
     */
    register(scrollable) {
      if (!this.scrollContainers.has(scrollable)) {
        this.scrollContainers.set(scrollable, scrollable.elementScrolled().subscribe(() => this._scrolled.next(scrollable)));
      }
    }
    /**
     * De-registers a Scrollable reference and unsubscribes from its scroll event observable.
     * @param scrollable Scrollable instance to be deregistered.
     */
    deregister(scrollable) {
      const scrollableReference = this.scrollContainers.get(scrollable);
      if (scrollableReference) {
        scrollableReference.unsubscribe();
        this.scrollContainers.delete(scrollable);
      }
    }
    /**
     * Returns an observable that emits an event whenever any of the registered Scrollable
     * references (or window, document, or body) fire a scrolled event. Can provide a time in ms
     * to override the default "throttle" time.
     *
     * **Note:** in order to avoid hitting change detection for every scroll event,
     * all of the events emitted from this stream will be run outside the Angular zone.
     * If you need to update any data bindings as a result of a scroll event, you have
     * to run the callback using `NgZone.run`.
     */
    scrolled(auditTimeInMs = DEFAULT_SCROLL_TIME) {
      if (!this._platform.isBrowser) {
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.of)();
      }
      return new rxjs__WEBPACK_IMPORTED_MODULE_1__.Observable(observer => {
        if (!this._globalSubscription) {
          this._addGlobalListener();
        }
        // In the case of a 0ms delay, use an observable without auditTime
        // since it does add a perceptible delay in processing overhead.
        const subscription = auditTimeInMs > 0 ? this._scrolled.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.auditTime)(auditTimeInMs)).subscribe(observer) : this._scrolled.subscribe(observer);
        this._scrolledCount++;
        return () => {
          subscription.unsubscribe();
          this._scrolledCount--;
          if (!this._scrolledCount) {
            this._removeGlobalListener();
          }
        };
      });
    }
    ngOnDestroy() {
      this._removeGlobalListener();
      this.scrollContainers.forEach((_, container) => this.deregister(container));
      this._scrolled.complete();
    }
    /**
     * Returns an observable that emits whenever any of the
     * scrollable ancestors of an element are scrolled.
     * @param elementOrElementRef Element whose ancestors to listen for.
     * @param auditTimeInMs Time to throttle the scroll events.
     */
    ancestorScrolled(elementOrElementRef, auditTimeInMs) {
      const ancestors = this.getAncestorScrollContainers(elementOrElementRef);
      return this.scrolled(auditTimeInMs).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.filter)(target => {
        return !target || ancestors.indexOf(target) > -1;
      }));
    }
    /** Returns all registered Scrollables that contain the provided element. */
    getAncestorScrollContainers(elementOrElementRef) {
      const scrollingContainers = [];
      this.scrollContainers.forEach((_subscription, scrollable) => {
        if (this._scrollableContainsElement(scrollable, elementOrElementRef)) {
          scrollingContainers.push(scrollable);
        }
      });
      return scrollingContainers;
    }
    /** Use defaultView of injected document if available or fallback to global window reference */
    _getWindow() {
      return this._document.defaultView || window;
    }
    /** Returns true if the element is contained within the provided Scrollable. */
    _scrollableContainsElement(scrollable, elementOrElementRef) {
      let element = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_3__.coerceElement)(elementOrElementRef);
      let scrollableElement = scrollable.getElementRef().nativeElement;
      // Traverse through the element parents until we reach null, checking if any of the elements
      // are the scrollable's element.
      do {
        if (element == scrollableElement) {
          return true;
        }
      } while (element = element.parentElement);
      return false;
    }
    /** Sets up the global scroll listeners. */
    _addGlobalListener() {
      this._globalSubscription = this._ngZone.runOutsideAngular(() => {
        const window = this._getWindow();
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.fromEvent)(window.document, 'scroll').subscribe(() => this._scrolled.next());
      });
    }
    /** Cleans up the global scroll listener. */
    _removeGlobalListener() {
      if (this._globalSubscription) {
        this._globalSubscription.unsubscribe();
        this._globalSubscription = null;
      }
    }
  }
  _class2 = ScrollDispatcher;
  _class2.ɵfac = function _class2_Factory(t) {
    return new (t || _class2)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.NgZone), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__.Platform), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common__WEBPACK_IMPORTED_MODULE_5__.DOCUMENT, 8));
  };
  _class2.ɵprov = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
    token: _class2,
    factory: _class2.ɵfac,
    providedIn: 'root'
  });
  return ScrollDispatcher;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();

/**
 * Sends an event when the directive's element is scrolled. Registers itself with the
 * ScrollDispatcher service to include itself as part of its collection of scrolling events that it
 * can be listened to through the service.
 */
let CdkScrollable = /*#__PURE__*/(() => {
  var _class3;
  class CdkScrollable {
    constructor(elementRef, scrollDispatcher, ngZone, dir) {
      this.elementRef = elementRef;
      this.scrollDispatcher = scrollDispatcher;
      this.ngZone = ngZone;
      this.dir = dir;
      this._destroyed = new rxjs__WEBPACK_IMPORTED_MODULE_1__.Subject();
      this._elementScrolled = new rxjs__WEBPACK_IMPORTED_MODULE_1__.Observable(observer => this.ngZone.runOutsideAngular(() => (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.fromEvent)(this.elementRef.nativeElement, 'scroll').pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.takeUntil)(this._destroyed)).subscribe(observer)));
    }
    ngOnInit() {
      this.scrollDispatcher.register(this);
    }
    ngOnDestroy() {
      this.scrollDispatcher.deregister(this);
      this._destroyed.next();
      this._destroyed.complete();
    }
    /** Returns observable that emits when a scroll event is fired on the host element. */
    elementScrolled() {
      return this._elementScrolled;
    }
    /** Gets the ElementRef for the viewport. */
    getElementRef() {
      return this.elementRef;
    }
    /**
     * Scrolls to the specified offsets. This is a normalized version of the browser's native scrollTo
     * method, since browsers are not consistent about what scrollLeft means in RTL. For this method
     * left and right always refer to the left and right side of the scrolling container irrespective
     * of the layout direction. start and end refer to left and right in an LTR context and vice-versa
     * in an RTL context.
     * @param options specified the offsets to scroll to.
     */
    scrollTo(options) {
      const el = this.elementRef.nativeElement;
      const isRtl = this.dir && this.dir.value == 'rtl';
      // Rewrite start & end offsets as right or left offsets.
      if (options.left == null) {
        options.left = isRtl ? options.end : options.start;
      }
      if (options.right == null) {
        options.right = isRtl ? options.start : options.end;
      }
      // Rewrite the bottom offset as a top offset.
      if (options.bottom != null) {
        options.top = el.scrollHeight - el.clientHeight - options.bottom;
      }
      // Rewrite the right offset as a left offset.
      if (isRtl && (0,_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__.getRtlScrollAxisType)() != 0 /* RtlScrollAxisType.NORMAL */) {
        if (options.left != null) {
          options.right = el.scrollWidth - el.clientWidth - options.left;
        }
        if ((0,_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__.getRtlScrollAxisType)() == 2 /* RtlScrollAxisType.INVERTED */) {
          options.left = options.right;
        } else if ((0,_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__.getRtlScrollAxisType)() == 1 /* RtlScrollAxisType.NEGATED */) {
          options.left = options.right ? -options.right : options.right;
        }
      } else {
        if (options.right != null) {
          options.left = el.scrollWidth - el.clientWidth - options.right;
        }
      }
      this._applyScrollToOptions(options);
    }
    _applyScrollToOptions(options) {
      const el = this.elementRef.nativeElement;
      if ((0,_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__.supportsScrollBehavior)()) {
        el.scrollTo(options);
      } else {
        if (options.top != null) {
          el.scrollTop = options.top;
        }
        if (options.left != null) {
          el.scrollLeft = options.left;
        }
      }
    }
    /**
     * Measures the scroll offset relative to the specified edge of the viewport. This method can be
     * used instead of directly checking scrollLeft or scrollTop, since browsers are not consistent
     * about what scrollLeft means in RTL. The values returned by this method are normalized such that
     * left and right always refer to the left and right side of the scrolling container irrespective
     * of the layout direction. start and end refer to left and right in an LTR context and vice-versa
     * in an RTL context.
     * @param from The edge to measure from.
     */
    measureScrollOffset(from) {
      const LEFT = 'left';
      const RIGHT = 'right';
      const el = this.elementRef.nativeElement;
      if (from == 'top') {
        return el.scrollTop;
      }
      if (from == 'bottom') {
        return el.scrollHeight - el.clientHeight - el.scrollTop;
      }
      // Rewrite start & end as left or right offsets.
      const isRtl = this.dir && this.dir.value == 'rtl';
      if (from == 'start') {
        from = isRtl ? RIGHT : LEFT;
      } else if (from == 'end') {
        from = isRtl ? LEFT : RIGHT;
      }
      if (isRtl && (0,_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__.getRtlScrollAxisType)() == 2 /* RtlScrollAxisType.INVERTED */) {
        // For INVERTED, scrollLeft is (scrollWidth - clientWidth) when scrolled all the way left and
        // 0 when scrolled all the way right.
        if (from == LEFT) {
          return el.scrollWidth - el.clientWidth - el.scrollLeft;
        } else {
          return el.scrollLeft;
        }
      } else if (isRtl && (0,_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__.getRtlScrollAxisType)() == 1 /* RtlScrollAxisType.NEGATED */) {
        // For NEGATED, scrollLeft is -(scrollWidth - clientWidth) when scrolled all the way left and
        // 0 when scrolled all the way right.
        if (from == LEFT) {
          return el.scrollLeft + el.scrollWidth - el.clientWidth;
        } else {
          return -el.scrollLeft;
        }
      } else {
        // For NORMAL, as well as non-RTL contexts, scrollLeft is 0 when scrolled all the way left and
        // (scrollWidth - clientWidth) when scrolled all the way right.
        if (from == LEFT) {
          return el.scrollLeft;
        } else {
          return el.scrollWidth - el.clientWidth - el.scrollLeft;
        }
      }
    }
  }
  _class3 = CdkScrollable;
  _class3.ɵfac = function _class3_Factory(t) {
    return new (t || _class3)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](ScrollDispatcher), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.NgZone), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_6__.Directionality, 8));
  };
  _class3.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
    type: _class3,
    selectors: [["", "cdk-scrollable", ""], ["", "cdkScrollable", ""]],
    standalone: true
  });
  return CdkScrollable;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();

/** Time in ms to throttle the resize events by default. */
const DEFAULT_RESIZE_TIME = 20;
/**
 * Simple utility for getting the bounds of the browser viewport.
 * @docs-private
 */
let ViewportRuler = /*#__PURE__*/(() => {
  var _class4;
  class ViewportRuler {
    constructor(_platform, ngZone, document) {
      this._platform = _platform;
      /** Stream of viewport change events. */
      this._change = new rxjs__WEBPACK_IMPORTED_MODULE_1__.Subject();
      /** Event listener that will be used to handle the viewport change events. */
      this._changeListener = event => {
        this._change.next(event);
      };
      this._document = document;
      ngZone.runOutsideAngular(() => {
        if (_platform.isBrowser) {
          const window = this._getWindow();
          // Note that bind the events ourselves, rather than going through something like RxJS's
          // `fromEvent` so that we can ensure that they're bound outside of the NgZone.
          window.addEventListener('resize', this._changeListener);
          window.addEventListener('orientationchange', this._changeListener);
        }
        // Clear the cached position so that the viewport is re-measured next time it is required.
        // We don't need to keep track of the subscription, because it is completed on destroy.
        this.change().subscribe(() => this._viewportSize = null);
      });
    }
    ngOnDestroy() {
      if (this._platform.isBrowser) {
        const window = this._getWindow();
        window.removeEventListener('resize', this._changeListener);
        window.removeEventListener('orientationchange', this._changeListener);
      }
      this._change.complete();
    }
    /** Returns the viewport's width and height. */
    getViewportSize() {
      if (!this._viewportSize) {
        this._updateViewportSize();
      }
      const output = {
        width: this._viewportSize.width,
        height: this._viewportSize.height
      };
      // If we're not on a browser, don't cache the size since it'll be mocked out anyway.
      if (!this._platform.isBrowser) {
        this._viewportSize = null;
      }
      return output;
    }
    /** Gets a ClientRect for the viewport's bounds. */
    getViewportRect() {
      // Use the document element's bounding rect rather than the window scroll properties
      // (e.g. pageYOffset, scrollY) due to in issue in Chrome and IE where window scroll
      // properties and client coordinates (boundingClientRect, clientX/Y, etc.) are in different
      // conceptual viewports. Under most circumstances these viewports are equivalent, but they
      // can disagree when the page is pinch-zoomed (on devices that support touch).
      // See https://bugs.chromium.org/p/chromium/issues/detail?id=489206#c4
      // We use the documentElement instead of the body because, by default (without a css reset)
      // browsers typically give the document body an 8px margin, which is not included in
      // getBoundingClientRect().
      const scrollPosition = this.getViewportScrollPosition();
      const {
        width,
        height
      } = this.getViewportSize();
      return {
        top: scrollPosition.top,
        left: scrollPosition.left,
        bottom: scrollPosition.top + height,
        right: scrollPosition.left + width,
        height,
        width
      };
    }
    /** Gets the (top, left) scroll position of the viewport. */
    getViewportScrollPosition() {
      // While we can get a reference to the fake document
      // during SSR, it doesn't have getBoundingClientRect.
      if (!this._platform.isBrowser) {
        return {
          top: 0,
          left: 0
        };
      }
      // The top-left-corner of the viewport is determined by the scroll position of the document
      // body, normally just (scrollLeft, scrollTop). However, Chrome and Firefox disagree about
      // whether `document.body` or `document.documentElement` is the scrolled element, so reading
      // `scrollTop` and `scrollLeft` is inconsistent. However, using the bounding rect of
      // `document.documentElement` works consistently, where the `top` and `left` values will
      // equal negative the scroll position.
      const document = this._document;
      const window = this._getWindow();
      const documentElement = document.documentElement;
      const documentRect = documentElement.getBoundingClientRect();
      const top = -documentRect.top || document.body.scrollTop || window.scrollY || documentElement.scrollTop || 0;
      const left = -documentRect.left || document.body.scrollLeft || window.scrollX || documentElement.scrollLeft || 0;
      return {
        top,
        left
      };
    }
    /**
     * Returns a stream that emits whenever the size of the viewport changes.
     * This stream emits outside of the Angular zone.
     * @param throttleTime Time in milliseconds to throttle the stream.
     */
    change(throttleTime = DEFAULT_RESIZE_TIME) {
      return throttleTime > 0 ? this._change.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.auditTime)(throttleTime)) : this._change;
    }
    /** Use defaultView of injected document if available or fallback to global window reference */
    _getWindow() {
      return this._document.defaultView || window;
    }
    /** Updates the cached viewport size. */
    _updateViewportSize() {
      const window = this._getWindow();
      this._viewportSize = this._platform.isBrowser ? {
        width: window.innerWidth,
        height: window.innerHeight
      } : {
        width: 0,
        height: 0
      };
    }
  }
  _class4 = ViewportRuler;
  _class4.ɵfac = function _class4_Factory(t) {
    return new (t || _class4)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__.Platform), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.NgZone), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common__WEBPACK_IMPORTED_MODULE_5__.DOCUMENT, 8));
  };
  _class4.ɵprov = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
    token: _class4,
    factory: _class4.ɵfac,
    providedIn: 'root'
  });
  return ViewportRuler;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
const VIRTUAL_SCROLLABLE = /*#__PURE__*/new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken('VIRTUAL_SCROLLABLE');
/**
 * Extending the {@link CdkScrollable} to be used as scrolling container for virtual scrolling.
 */
let CdkVirtualScrollable = /*#__PURE__*/(() => {
  var _class5;
  class CdkVirtualScrollable extends CdkScrollable {
    constructor(elementRef, scrollDispatcher, ngZone, dir) {
      super(elementRef, scrollDispatcher, ngZone, dir);
    }
    /**
     * Measure the viewport size for the provided orientation.
     *
     * @param orientation The orientation to measure the size from.
     */
    measureViewportSize(orientation) {
      const viewportEl = this.elementRef.nativeElement;
      return orientation === 'horizontal' ? viewportEl.clientWidth : viewportEl.clientHeight;
    }
  }
  _class5 = CdkVirtualScrollable;
  _class5.ɵfac = function _class5_Factory(t) {
    return new (t || _class5)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](ScrollDispatcher), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.NgZone), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_6__.Directionality, 8));
  };
  _class5.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
    type: _class5,
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]]
  });
  return CdkVirtualScrollable;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();

/** Checks if the given ranges are equal. */
function rangesEqual(r1, r2) {
  return r1.start == r2.start && r1.end == r2.end;
}
/**
 * Scheduler to be used for scroll events. Needs to fall back to
 * something that doesn't rely on requestAnimationFrame on environments
 * that don't support it (e.g. server-side rendering).
 */
const SCROLL_SCHEDULER = typeof requestAnimationFrame !== 'undefined' ? rxjs__WEBPACK_IMPORTED_MODULE_1__.animationFrameScheduler : rxjs__WEBPACK_IMPORTED_MODULE_1__.asapScheduler;
/** A viewport that virtualizes its scrolling with the help of `CdkVirtualForOf`. */
let CdkVirtualScrollViewport = /*#__PURE__*/(() => {
  var _class6;
  class CdkVirtualScrollViewport extends CdkVirtualScrollable {
    /** The direction the viewport scrolls. */
    get orientation() {
      return this._orientation;
    }
    set orientation(orientation) {
      if (this._orientation !== orientation) {
        this._orientation = orientation;
        this._calculateSpacerSize();
      }
    }
    /**
     * Whether rendered items should persist in the DOM after scrolling out of view. By default, items
     * will be removed.
     */
    get appendOnly() {
      return this._appendOnly;
    }
    set appendOnly(value) {
      this._appendOnly = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_3__.coerceBooleanProperty)(value);
    }
    constructor(elementRef, _changeDetectorRef, ngZone, _scrollStrategy, dir, scrollDispatcher, viewportRuler, scrollable) {
      super(elementRef, scrollDispatcher, ngZone, dir);
      this.elementRef = elementRef;
      this._changeDetectorRef = _changeDetectorRef;
      this._scrollStrategy = _scrollStrategy;
      this.scrollable = scrollable;
      this._platform = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__.Platform);
      /** Emits when the viewport is detached from a CdkVirtualForOf. */
      this._detachedSubject = new rxjs__WEBPACK_IMPORTED_MODULE_1__.Subject();
      /** Emits when the rendered range changes. */
      this._renderedRangeSubject = new rxjs__WEBPACK_IMPORTED_MODULE_1__.Subject();
      this._orientation = 'vertical';
      this._appendOnly = false;
      // Note: we don't use the typical EventEmitter here because we need to subscribe to the scroll
      // strategy lazily (i.e. only if the user is actually listening to the events). We do this because
      // depending on how the strategy calculates the scrolled index, it may come at a cost to
      // performance.
      /** Emits when the index of the first element visible in the viewport changes. */
      this.scrolledIndexChange = new rxjs__WEBPACK_IMPORTED_MODULE_1__.Observable(observer => this._scrollStrategy.scrolledIndexChange.subscribe(index => Promise.resolve().then(() => this.ngZone.run(() => observer.next(index)))));
      /** A stream that emits whenever the rendered range changes. */
      this.renderedRangeStream = this._renderedRangeSubject;
      /**
       * The total size of all content (in pixels), including content that is not currently rendered.
       */
      this._totalContentSize = 0;
      /** A string representing the `style.width` property value to be used for the spacer element. */
      this._totalContentWidth = '';
      /** A string representing the `style.height` property value to be used for the spacer element. */
      this._totalContentHeight = '';
      /** The currently rendered range of indices. */
      this._renderedRange = {
        start: 0,
        end: 0
      };
      /** The length of the data bound to this viewport (in number of items). */
      this._dataLength = 0;
      /** The size of the viewport (in pixels). */
      this._viewportSize = 0;
      /** The last rendered content offset that was set. */
      this._renderedContentOffset = 0;
      /**
       * Whether the last rendered content offset was to the end of the content (and therefore needs to
       * be rewritten as an offset to the start of the content).
       */
      this._renderedContentOffsetNeedsRewrite = false;
      /** Whether there is a pending change detection cycle. */
      this._isChangeDetectionPending = false;
      /** A list of functions to run after the next change detection cycle. */
      this._runAfterChangeDetection = [];
      /** Subscription to changes in the viewport size. */
      this._viewportChanges = rxjs__WEBPACK_IMPORTED_MODULE_1__.Subscription.EMPTY;
      if (!_scrollStrategy && (typeof ngDevMode === 'undefined' || ngDevMode)) {
        throw Error('Error: cdk-virtual-scroll-viewport requires the "itemSize" property to be set.');
      }
      this._viewportChanges = viewportRuler.change().subscribe(() => {
        this.checkViewportSize();
      });
      if (!this.scrollable) {
        // No scrollable is provided, so the virtual-scroll-viewport needs to become a scrollable
        this.elementRef.nativeElement.classList.add('cdk-virtual-scrollable');
        this.scrollable = this;
      }
    }
    ngOnInit() {
      // Scrolling depends on the element dimensions which we can't get during SSR.
      if (!this._platform.isBrowser) {
        return;
      }
      if (this.scrollable === this) {
        super.ngOnInit();
      }
      // It's still too early to measure the viewport at this point. Deferring with a promise allows
      // the Viewport to be rendered with the correct size before we measure. We run this outside the
      // zone to avoid causing more change detection cycles. We handle the change detection loop
      // ourselves instead.
      this.ngZone.runOutsideAngular(() => Promise.resolve().then(() => {
        this._measureViewportSize();
        this._scrollStrategy.attach(this);
        this.scrollable.elementScrolled().pipe(
        // Start off with a fake scroll event so we properly detect our initial position.
        (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.startWith)(null),
        // Collect multiple events into one until the next animation frame. This way if
        // there are multiple scroll events in the same frame we only need to recheck
        // our layout once.
        (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.auditTime)(0, SCROLL_SCHEDULER)).subscribe(() => this._scrollStrategy.onContentScrolled());
        this._markChangeDetectionNeeded();
      }));
    }
    ngOnDestroy() {
      this.detach();
      this._scrollStrategy.detach();
      // Complete all subjects
      this._renderedRangeSubject.complete();
      this._detachedSubject.complete();
      this._viewportChanges.unsubscribe();
      super.ngOnDestroy();
    }
    /** Attaches a `CdkVirtualScrollRepeater` to this viewport. */
    attach(forOf) {
      if (this._forOf && (typeof ngDevMode === 'undefined' || ngDevMode)) {
        throw Error('CdkVirtualScrollViewport is already attached.');
      }
      // Subscribe to the data stream of the CdkVirtualForOf to keep track of when the data length
      // changes. Run outside the zone to avoid triggering change detection, since we're managing the
      // change detection loop ourselves.
      this.ngZone.runOutsideAngular(() => {
        this._forOf = forOf;
        this._forOf.dataStream.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.takeUntil)(this._detachedSubject)).subscribe(data => {
          const newLength = data.length;
          if (newLength !== this._dataLength) {
            this._dataLength = newLength;
            this._scrollStrategy.onDataLengthChanged();
          }
          this._doChangeDetection();
        });
      });
    }
    /** Detaches the current `CdkVirtualForOf`. */
    detach() {
      this._forOf = null;
      this._detachedSubject.next();
    }
    /** Gets the length of the data bound to this viewport (in number of items). */
    getDataLength() {
      return this._dataLength;
    }
    /** Gets the size of the viewport (in pixels). */
    getViewportSize() {
      return this._viewportSize;
    }
    // TODO(mmalerba): This is technically out of sync with what's really rendered until a render
    // cycle happens. I'm being careful to only call it after the render cycle is complete and before
    // setting it to something else, but its error prone and should probably be split into
    // `pendingRange` and `renderedRange`, the latter reflecting whats actually in the DOM.
    /** Get the current rendered range of items. */
    getRenderedRange() {
      return this._renderedRange;
    }
    measureBoundingClientRectWithScrollOffset(from) {
      return this.getElementRef().nativeElement.getBoundingClientRect()[from];
    }
    /**
     * Sets the total size of all content (in pixels), including content that is not currently
     * rendered.
     */
    setTotalContentSize(size) {
      if (this._totalContentSize !== size) {
        this._totalContentSize = size;
        this._calculateSpacerSize();
        this._markChangeDetectionNeeded();
      }
    }
    /** Sets the currently rendered range of indices. */
    setRenderedRange(range) {
      if (!rangesEqual(this._renderedRange, range)) {
        if (this.appendOnly) {
          range = {
            start: 0,
            end: Math.max(this._renderedRange.end, range.end)
          };
        }
        this._renderedRangeSubject.next(this._renderedRange = range);
        this._markChangeDetectionNeeded(() => this._scrollStrategy.onContentRendered());
      }
    }
    /**
     * Gets the offset from the start of the viewport to the start of the rendered data (in pixels).
     */
    getOffsetToRenderedContentStart() {
      return this._renderedContentOffsetNeedsRewrite ? null : this._renderedContentOffset;
    }
    /**
     * Sets the offset from the start of the viewport to either the start or end of the rendered data
     * (in pixels).
     */
    setRenderedContentOffset(offset, to = 'to-start') {
      // In appendOnly, we always start from the top
      offset = this.appendOnly && to === 'to-start' ? 0 : offset;
      // For a horizontal viewport in a right-to-left language we need to translate along the x-axis
      // in the negative direction.
      const isRtl = this.dir && this.dir.value == 'rtl';
      const isHorizontal = this.orientation == 'horizontal';
      const axis = isHorizontal ? 'X' : 'Y';
      const axisDirection = isHorizontal && isRtl ? -1 : 1;
      let transform = `translate${axis}(${Number(axisDirection * offset)}px)`;
      this._renderedContentOffset = offset;
      if (to === 'to-end') {
        transform += ` translate${axis}(-100%)`;
        // The viewport should rewrite this as a `to-start` offset on the next render cycle. Otherwise
        // elements will appear to expand in the wrong direction (e.g. `mat-expansion-panel` would
        // expand upward).
        this._renderedContentOffsetNeedsRewrite = true;
      }
      if (this._renderedContentTransform != transform) {
        // We know this value is safe because we parse `offset` with `Number()` before passing it
        // into the string.
        this._renderedContentTransform = transform;
        this._markChangeDetectionNeeded(() => {
          if (this._renderedContentOffsetNeedsRewrite) {
            this._renderedContentOffset -= this.measureRenderedContentSize();
            this._renderedContentOffsetNeedsRewrite = false;
            this.setRenderedContentOffset(this._renderedContentOffset);
          } else {
            this._scrollStrategy.onRenderedOffsetChanged();
          }
        });
      }
    }
    /**
     * Scrolls to the given offset from the start of the viewport. Please note that this is not always
     * the same as setting `scrollTop` or `scrollLeft`. In a horizontal viewport with right-to-left
     * direction, this would be the equivalent of setting a fictional `scrollRight` property.
     * @param offset The offset to scroll to.
     * @param behavior The ScrollBehavior to use when scrolling. Default is behavior is `auto`.
     */
    scrollToOffset(offset, behavior = 'auto') {
      const options = {
        behavior
      };
      if (this.orientation === 'horizontal') {
        options.start = offset;
      } else {
        options.top = offset;
      }
      this.scrollable.scrollTo(options);
    }
    /**
     * Scrolls to the offset for the given index.
     * @param index The index of the element to scroll to.
     * @param behavior The ScrollBehavior to use when scrolling. Default is behavior is `auto`.
     */
    scrollToIndex(index, behavior = 'auto') {
      this._scrollStrategy.scrollToIndex(index, behavior);
    }
    /**
     * Gets the current scroll offset from the start of the scrollable (in pixels).
     * @param from The edge to measure the offset from. Defaults to 'top' in vertical mode and 'start'
     *     in horizontal mode.
     */
    measureScrollOffset(from) {
      // This is to break the call cycle
      let measureScrollOffset;
      if (this.scrollable == this) {
        measureScrollOffset = _from => super.measureScrollOffset(_from);
      } else {
        measureScrollOffset = _from => this.scrollable.measureScrollOffset(_from);
      }
      return Math.max(0, measureScrollOffset(from ?? (this.orientation === 'horizontal' ? 'start' : 'top')) - this.measureViewportOffset());
    }
    /**
     * Measures the offset of the viewport from the scrolling container
     * @param from The edge to measure from.
     */
    measureViewportOffset(from) {
      let fromRect;
      const LEFT = 'left';
      const RIGHT = 'right';
      const isRtl = this.dir?.value == 'rtl';
      if (from == 'start') {
        fromRect = isRtl ? RIGHT : LEFT;
      } else if (from == 'end') {
        fromRect = isRtl ? LEFT : RIGHT;
      } else if (from) {
        fromRect = from;
      } else {
        fromRect = this.orientation === 'horizontal' ? 'left' : 'top';
      }
      const scrollerClientRect = this.scrollable.measureBoundingClientRectWithScrollOffset(fromRect);
      const viewportClientRect = this.elementRef.nativeElement.getBoundingClientRect()[fromRect];
      return viewportClientRect - scrollerClientRect;
    }
    /** Measure the combined size of all of the rendered items. */
    measureRenderedContentSize() {
      const contentEl = this._contentWrapper.nativeElement;
      return this.orientation === 'horizontal' ? contentEl.offsetWidth : contentEl.offsetHeight;
    }
    /**
     * Measure the total combined size of the given range. Throws if the range includes items that are
     * not rendered.
     */
    measureRangeSize(range) {
      if (!this._forOf) {
        return 0;
      }
      return this._forOf.measureRangeSize(range, this.orientation);
    }
    /** Update the viewport dimensions and re-render. */
    checkViewportSize() {
      // TODO: Cleanup later when add logic for handling content resize
      this._measureViewportSize();
      this._scrollStrategy.onDataLengthChanged();
    }
    /** Measure the viewport size. */
    _measureViewportSize() {
      this._viewportSize = this.scrollable.measureViewportSize(this.orientation);
    }
    /** Queue up change detection to run. */
    _markChangeDetectionNeeded(runAfter) {
      if (runAfter) {
        this._runAfterChangeDetection.push(runAfter);
      }
      // Use a Promise to batch together calls to `_doChangeDetection`. This way if we set a bunch of
      // properties sequentially we only have to run `_doChangeDetection` once at the end.
      if (!this._isChangeDetectionPending) {
        this._isChangeDetectionPending = true;
        this.ngZone.runOutsideAngular(() => Promise.resolve().then(() => {
          this._doChangeDetection();
        }));
      }
    }
    /** Run change detection. */
    _doChangeDetection() {
      this._isChangeDetectionPending = false;
      // Apply the content transform. The transform can't be set via an Angular binding because
      // bypassSecurityTrustStyle is banned in Google. However the value is safe, it's composed of
      // string literals, a variable that can only be 'X' or 'Y', and user input that is run through
      // the `Number` function first to coerce it to a numeric value.
      this._contentWrapper.nativeElement.style.transform = this._renderedContentTransform;
      // Apply changes to Angular bindings. Note: We must call `markForCheck` to run change detection
      // from the root, since the repeated items are content projected in. Calling `detectChanges`
      // instead does not properly check the projected content.
      this.ngZone.run(() => this._changeDetectorRef.markForCheck());
      const runAfterChangeDetection = this._runAfterChangeDetection;
      this._runAfterChangeDetection = [];
      for (const fn of runAfterChangeDetection) {
        fn();
      }
    }
    /** Calculates the `style.width` and `style.height` for the spacer element. */
    _calculateSpacerSize() {
      this._totalContentHeight = this.orientation === 'horizontal' ? '' : `${this._totalContentSize}px`;
      this._totalContentWidth = this.orientation === 'horizontal' ? `${this._totalContentSize}px` : '';
    }
  }
  _class6 = CdkVirtualScrollViewport;
  _class6.ɵfac = function _class6_Factory(t) {
    return new (t || _class6)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.NgZone), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](VIRTUAL_SCROLL_STRATEGY, 8), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_6__.Directionality, 8), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](ScrollDispatcher), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](ViewportRuler), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](VIRTUAL_SCROLLABLE, 8));
  };
  _class6.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
    type: _class6,
    selectors: [["cdk-virtual-scroll-viewport"]],
    viewQuery: function _class6_Query(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, 7);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx._contentWrapper = _t.first);
      }
    },
    hostAttrs: [1, "cdk-virtual-scroll-viewport"],
    hostVars: 4,
    hostBindings: function _class6_HostBindings(rf, ctx) {
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("cdk-virtual-scroll-orientation-horizontal", ctx.orientation === "horizontal")("cdk-virtual-scroll-orientation-vertical", ctx.orientation !== "horizontal");
      }
    },
    inputs: {
      orientation: "orientation",
      appendOnly: "appendOnly"
    },
    outputs: {
      scrolledIndexChange: "scrolledIndexChange"
    },
    standalone: true,
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([{
      provide: CdkScrollable,
      useFactory: (virtualScrollable, viewport) => virtualScrollable || viewport,
      deps: [[new _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional(), new _angular_core__WEBPACK_IMPORTED_MODULE_0__.Inject(VIRTUAL_SCROLLABLE)], _class6]
    }]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵStandaloneFeature"]],
    ngContentSelectors: _c1,
    decls: 4,
    vars: 4,
    consts: [[1, "cdk-virtual-scroll-content-wrapper"], ["contentWrapper", ""], [1, "cdk-virtual-scroll-spacer"]],
    template: function _class6_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojectionDef"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "div", 2);
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleProp"]("width", ctx._totalContentWidth)("height", ctx._totalContentHeight);
      }
    },
    styles: ["cdk-virtual-scroll-viewport{display:block;position:relative;transform:translateZ(0)}.cdk-virtual-scrollable{overflow:auto;will-change:scroll-position;contain:strict;-webkit-overflow-scrolling:touch}.cdk-virtual-scroll-content-wrapper{position:absolute;top:0;left:0;contain:content}[dir=rtl] .cdk-virtual-scroll-content-wrapper{right:0;left:auto}.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper{min-height:100%}.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper>dl:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper>ol:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper>table:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper>ul:not([cdkVirtualFor]){padding-left:0;padding-right:0;margin-left:0;margin-right:0;border-left-width:0;border-right-width:0;outline:none}.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper{min-width:100%}.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper>dl:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper>ol:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper>table:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper>ul:not([cdkVirtualFor]){padding-top:0;padding-bottom:0;margin-top:0;margin-bottom:0;border-top-width:0;border-bottom-width:0;outline:none}.cdk-virtual-scroll-spacer{height:1px;transform-origin:0 0;flex:0 0 auto}[dir=rtl] .cdk-virtual-scroll-spacer{transform-origin:100% 0}"],
    encapsulation: 2,
    changeDetection: 0
  });
  return CdkVirtualScrollViewport;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();

/** Helper to extract the offset of a DOM Node in a certain direction. */
function getOffset(orientation, direction, node) {
  const el = node;
  if (!el.getBoundingClientRect) {
    return 0;
  }
  const rect = el.getBoundingClientRect();
  if (orientation === 'horizontal') {
    return direction === 'start' ? rect.left : rect.right;
  }
  return direction === 'start' ? rect.top : rect.bottom;
}
/**
 * A directive similar to `ngForOf` to be used for rendering data inside a virtual scrolling
 * container.
 */
let CdkVirtualForOf = /*#__PURE__*/(() => {
  var _class7;
  class CdkVirtualForOf {
    /** The DataSource to display. */
    get cdkVirtualForOf() {
      return this._cdkVirtualForOf;
    }
    set cdkVirtualForOf(value) {
      this._cdkVirtualForOf = value;
      if ((0,_angular_cdk_collections__WEBPACK_IMPORTED_MODULE_7__.isDataSource)(value)) {
        this._dataSourceChanges.next(value);
      } else {
        // If value is an an NgIterable, convert it to an array.
        this._dataSourceChanges.next(new _angular_cdk_collections__WEBPACK_IMPORTED_MODULE_7__.ArrayDataSource((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.isObservable)(value) ? value : Array.from(value || [])));
      }
    }
    /**
     * The `TrackByFunction` to use for tracking changes. The `TrackByFunction` takes the index and
     * the item and produces a value to be used as the item's identity when tracking changes.
     */
    get cdkVirtualForTrackBy() {
      return this._cdkVirtualForTrackBy;
    }
    set cdkVirtualForTrackBy(fn) {
      this._needsUpdate = true;
      this._cdkVirtualForTrackBy = fn ? (index, item) => fn(index + (this._renderedRange ? this._renderedRange.start : 0), item) : undefined;
    }
    /** The template used to stamp out new elements. */
    set cdkVirtualForTemplate(value) {
      if (value) {
        this._needsUpdate = true;
        this._template = value;
      }
    }
    /**
     * The size of the cache used to store templates that are not being used for re-use later.
     * Setting the cache size to `0` will disable caching. Defaults to 20 templates.
     */
    get cdkVirtualForTemplateCacheSize() {
      return this._viewRepeater.viewCacheSize;
    }
    set cdkVirtualForTemplateCacheSize(size) {
      this._viewRepeater.viewCacheSize = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_3__.coerceNumberProperty)(size);
    }
    constructor( /** The view container to add items to. */
    _viewContainerRef, /** The template to use when stamping out new items. */
    _template, /** The set of available differs. */
    _differs, /** The strategy used to render items in the virtual scroll viewport. */
    _viewRepeater, /** The virtual scrolling viewport that these items are being rendered in. */
    _viewport, ngZone) {
      this._viewContainerRef = _viewContainerRef;
      this._template = _template;
      this._differs = _differs;
      this._viewRepeater = _viewRepeater;
      this._viewport = _viewport;
      /** Emits when the rendered view of the data changes. */
      this.viewChange = new rxjs__WEBPACK_IMPORTED_MODULE_1__.Subject();
      /** Subject that emits when a new DataSource instance is given. */
      this._dataSourceChanges = new rxjs__WEBPACK_IMPORTED_MODULE_1__.Subject();
      /** Emits whenever the data in the current DataSource changes. */
      this.dataStream = this._dataSourceChanges.pipe(
      // Start off with null `DataSource`.
      (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.startWith)(null),
      // Bundle up the previous and current data sources so we can work with both.
      (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.pairwise)(),
      // Use `_changeDataSource` to disconnect from the previous data source and connect to the
      // new one, passing back a stream of data changes which we run through `switchMap` to give
      // us a data stream that emits the latest data from whatever the current `DataSource` is.
      (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(([prev, cur]) => this._changeDataSource(prev, cur)),
      // Replay the last emitted data when someone subscribes.
      (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.shareReplay)(1));
      /** The differ used to calculate changes to the data. */
      this._differ = null;
      /** Whether the rendered data should be updated during the next ngDoCheck cycle. */
      this._needsUpdate = false;
      this._destroyed = new rxjs__WEBPACK_IMPORTED_MODULE_1__.Subject();
      this.dataStream.subscribe(data => {
        this._data = data;
        this._onRenderedDataChange();
      });
      this._viewport.renderedRangeStream.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.takeUntil)(this._destroyed)).subscribe(range => {
        this._renderedRange = range;
        if (this.viewChange.observers.length) {
          ngZone.run(() => this.viewChange.next(this._renderedRange));
        }
        this._onRenderedDataChange();
      });
      this._viewport.attach(this);
    }
    /**
     * Measures the combined size (width for horizontal orientation, height for vertical) of all items
     * in the specified range. Throws an error if the range includes items that are not currently
     * rendered.
     */
    measureRangeSize(range, orientation) {
      if (range.start >= range.end) {
        return 0;
      }
      if ((range.start < this._renderedRange.start || range.end > this._renderedRange.end) && (typeof ngDevMode === 'undefined' || ngDevMode)) {
        throw Error(`Error: attempted to measure an item that isn't rendered.`);
      }
      // The index into the list of rendered views for the first item in the range.
      const renderedStartIndex = range.start - this._renderedRange.start;
      // The length of the range we're measuring.
      const rangeLen = range.end - range.start;
      // Loop over all the views, find the first and land node and compute the size by subtracting
      // the top of the first node from the bottom of the last one.
      let firstNode;
      let lastNode;
      // Find the first node by starting from the beginning and going forwards.
      for (let i = 0; i < rangeLen; i++) {
        const view = this._viewContainerRef.get(i + renderedStartIndex);
        if (view && view.rootNodes.length) {
          firstNode = lastNode = view.rootNodes[0];
          break;
        }
      }
      // Find the last node by starting from the end and going backwards.
      for (let i = rangeLen - 1; i > -1; i--) {
        const view = this._viewContainerRef.get(i + renderedStartIndex);
        if (view && view.rootNodes.length) {
          lastNode = view.rootNodes[view.rootNodes.length - 1];
          break;
        }
      }
      return firstNode && lastNode ? getOffset(orientation, 'end', lastNode) - getOffset(orientation, 'start', firstNode) : 0;
    }
    ngDoCheck() {
      if (this._differ && this._needsUpdate) {
        // TODO(mmalerba): We should differentiate needs update due to scrolling and a new portion of
        // this list being rendered (can use simpler algorithm) vs needs update due to data actually
        // changing (need to do this diff).
        const changes = this._differ.diff(this._renderedItems);
        if (!changes) {
          this._updateContext();
        } else {
          this._applyChanges(changes);
        }
        this._needsUpdate = false;
      }
    }
    ngOnDestroy() {
      this._viewport.detach();
      this._dataSourceChanges.next(undefined);
      this._dataSourceChanges.complete();
      this.viewChange.complete();
      this._destroyed.next();
      this._destroyed.complete();
      this._viewRepeater.detach();
    }
    /** React to scroll state changes in the viewport. */
    _onRenderedDataChange() {
      if (!this._renderedRange) {
        return;
      }
      this._renderedItems = this._data.slice(this._renderedRange.start, this._renderedRange.end);
      if (!this._differ) {
        // Use a wrapper function for the `trackBy` so any new values are
        // picked up automatically without having to recreate the differ.
        this._differ = this._differs.find(this._renderedItems).create((index, item) => {
          return this.cdkVirtualForTrackBy ? this.cdkVirtualForTrackBy(index, item) : item;
        });
      }
      this._needsUpdate = true;
    }
    /** Swap out one `DataSource` for another. */
    _changeDataSource(oldDs, newDs) {
      if (oldDs) {
        oldDs.disconnect(this);
      }
      this._needsUpdate = true;
      return newDs ? newDs.connect(this) : (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.of)();
    }
    /** Update the `CdkVirtualForOfContext` for all views. */
    _updateContext() {
      const count = this._data.length;
      let i = this._viewContainerRef.length;
      while (i--) {
        const view = this._viewContainerRef.get(i);
        view.context.index = this._renderedRange.start + i;
        view.context.count = count;
        this._updateComputedContextProperties(view.context);
        view.detectChanges();
      }
    }
    /** Apply changes to the DOM. */
    _applyChanges(changes) {
      this._viewRepeater.applyChanges(changes, this._viewContainerRef, (record, _adjustedPreviousIndex, currentIndex) => this._getEmbeddedViewArgs(record, currentIndex), record => record.item);
      // Update $implicit for any items that had an identity change.
      changes.forEachIdentityChange(record => {
        const view = this._viewContainerRef.get(record.currentIndex);
        view.context.$implicit = record.item;
      });
      // Update the context variables on all items.
      const count = this._data.length;
      let i = this._viewContainerRef.length;
      while (i--) {
        const view = this._viewContainerRef.get(i);
        view.context.index = this._renderedRange.start + i;
        view.context.count = count;
        this._updateComputedContextProperties(view.context);
      }
    }
    /** Update the computed properties on the `CdkVirtualForOfContext`. */
    _updateComputedContextProperties(context) {
      context.first = context.index === 0;
      context.last = context.index === context.count - 1;
      context.even = context.index % 2 === 0;
      context.odd = !context.even;
    }
    _getEmbeddedViewArgs(record, index) {
      // Note that it's important that we insert the item directly at the proper index,
      // rather than inserting it and the moving it in place, because if there's a directive
      // on the same node that injects the `ViewContainerRef`, Angular will insert another
      // comment node which can throw off the move when it's being repeated for all items.
      return {
        templateRef: this._template,
        context: {
          $implicit: record.item,
          // It's guaranteed that the iterable is not "undefined" or "null" because we only
          // generate views for elements if the "cdkVirtualForOf" iterable has elements.
          cdkVirtualForOf: this._cdkVirtualForOf,
          index: -1,
          count: -1,
          first: false,
          last: false,
          odd: false,
          even: false
        },
        index
      };
    }
  }
  _class7 = CdkVirtualForOf;
  _class7.ɵfac = function _class7_Factory(t) {
    return new (t || _class7)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewContainerRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.TemplateRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.IterableDiffers), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_cdk_collections__WEBPACK_IMPORTED_MODULE_7__._VIEW_REPEATER_STRATEGY), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](CdkVirtualScrollViewport, 4), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.NgZone));
  };
  _class7.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
    type: _class7,
    selectors: [["", "cdkVirtualFor", "", "cdkVirtualForOf", ""]],
    inputs: {
      cdkVirtualForOf: "cdkVirtualForOf",
      cdkVirtualForTrackBy: "cdkVirtualForTrackBy",
      cdkVirtualForTemplate: "cdkVirtualForTemplate",
      cdkVirtualForTemplateCacheSize: "cdkVirtualForTemplateCacheSize"
    },
    standalone: true,
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([{
      provide: _angular_cdk_collections__WEBPACK_IMPORTED_MODULE_7__._VIEW_REPEATER_STRATEGY,
      useClass: _angular_cdk_collections__WEBPACK_IMPORTED_MODULE_7__._RecycleViewRepeaterStrategy
    }])]
  });
  return CdkVirtualForOf;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();

/**
 * Provides a virtual scrollable for the element it is attached to.
 */
let CdkVirtualScrollableElement = /*#__PURE__*/(() => {
  var _class8;
  class CdkVirtualScrollableElement extends CdkVirtualScrollable {
    constructor(elementRef, scrollDispatcher, ngZone, dir) {
      super(elementRef, scrollDispatcher, ngZone, dir);
    }
    measureBoundingClientRectWithScrollOffset(from) {
      return this.getElementRef().nativeElement.getBoundingClientRect()[from] - this.measureScrollOffset(from);
    }
  }
  _class8 = CdkVirtualScrollableElement;
  _class8.ɵfac = function _class8_Factory(t) {
    return new (t || _class8)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](ScrollDispatcher), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.NgZone), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_6__.Directionality, 8));
  };
  _class8.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
    type: _class8,
    selectors: [["", "cdkVirtualScrollingElement", ""]],
    hostAttrs: [1, "cdk-virtual-scrollable"],
    standalone: true,
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([{
      provide: VIRTUAL_SCROLLABLE,
      useExisting: _class8
    }]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]]
  });
  return CdkVirtualScrollableElement;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();

/**
 * Provides as virtual scrollable for the global / window scrollbar.
 */
let CdkVirtualScrollableWindow = /*#__PURE__*/(() => {
  var _class9;
  class CdkVirtualScrollableWindow extends CdkVirtualScrollable {
    constructor(scrollDispatcher, ngZone, dir) {
      super(new _angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef(document.documentElement), scrollDispatcher, ngZone, dir);
      this._elementScrolled = new rxjs__WEBPACK_IMPORTED_MODULE_1__.Observable(observer => this.ngZone.runOutsideAngular(() => (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.fromEvent)(document, 'scroll').pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.takeUntil)(this._destroyed)).subscribe(observer)));
    }
    measureBoundingClientRectWithScrollOffset(from) {
      return this.getElementRef().nativeElement.getBoundingClientRect()[from];
    }
  }
  _class9 = CdkVirtualScrollableWindow;
  _class9.ɵfac = function _class9_Factory(t) {
    return new (t || _class9)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](ScrollDispatcher), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.NgZone), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_6__.Directionality, 8));
  };
  _class9.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
    type: _class9,
    selectors: [["cdk-virtual-scroll-viewport", "scrollWindow", ""]],
    standalone: true,
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([{
      provide: VIRTUAL_SCROLLABLE,
      useExisting: _class9
    }]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]]
  });
  return CdkVirtualScrollableWindow;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
let CdkScrollableModule = /*#__PURE__*/(() => {
  var _class10;
  class CdkScrollableModule {}
  _class10 = CdkScrollableModule;
  _class10.ɵfac = function _class10_Factory(t) {
    return new (t || _class10)();
  };
  _class10.ɵmod = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
    type: _class10
  });
  _class10.ɵinj = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({});
  return CdkScrollableModule;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
/**
 * @docs-primary-export
 */
let ScrollingModule = /*#__PURE__*/(() => {
  var _class11;
  class ScrollingModule {}
  _class11 = ScrollingModule;
  _class11.ɵfac = function _class11_Factory(t) {
    return new (t || _class11)();
  };
  _class11.ɵmod = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
    type: _class11
  });
  _class11.ɵinj = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
    imports: [_angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_6__.BidiModule, CdkScrollableModule, _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_6__.BidiModule, CdkScrollableModule]
  });
  return ScrollingModule;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();

/**
 * Generated bundle index. Do not edit.
 */



/***/ }),

/***/ 8810:
/*!********************************************************!*\
  !*** ./node_modules/@angular/forms/fesm2022/forms.mjs ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AbstractControl: () => (/* binding */ AbstractControl),
/* harmony export */   AbstractControlDirective: () => (/* binding */ AbstractControlDirective),
/* harmony export */   AbstractFormGroupDirective: () => (/* binding */ AbstractFormGroupDirective),
/* harmony export */   COMPOSITION_BUFFER_MODE: () => (/* binding */ COMPOSITION_BUFFER_MODE),
/* harmony export */   CheckboxControlValueAccessor: () => (/* binding */ CheckboxControlValueAccessor),
/* harmony export */   CheckboxRequiredValidator: () => (/* binding */ CheckboxRequiredValidator),
/* harmony export */   ControlContainer: () => (/* binding */ ControlContainer),
/* harmony export */   DefaultValueAccessor: () => (/* binding */ DefaultValueAccessor),
/* harmony export */   EmailValidator: () => (/* binding */ EmailValidator),
/* harmony export */   FormArray: () => (/* binding */ FormArray),
/* harmony export */   FormArrayName: () => (/* binding */ FormArrayName),
/* harmony export */   FormBuilder: () => (/* binding */ FormBuilder),
/* harmony export */   FormControl: () => (/* binding */ FormControl),
/* harmony export */   FormControlDirective: () => (/* binding */ FormControlDirective),
/* harmony export */   FormControlName: () => (/* binding */ FormControlName),
/* harmony export */   FormGroup: () => (/* binding */ FormGroup),
/* harmony export */   FormGroupDirective: () => (/* binding */ FormGroupDirective),
/* harmony export */   FormGroupName: () => (/* binding */ FormGroupName),
/* harmony export */   FormRecord: () => (/* binding */ FormRecord),
/* harmony export */   FormsModule: () => (/* binding */ FormsModule),
/* harmony export */   MaxLengthValidator: () => (/* binding */ MaxLengthValidator),
/* harmony export */   MaxValidator: () => (/* binding */ MaxValidator),
/* harmony export */   MinLengthValidator: () => (/* binding */ MinLengthValidator),
/* harmony export */   MinValidator: () => (/* binding */ MinValidator),
/* harmony export */   NG_ASYNC_VALIDATORS: () => (/* binding */ NG_ASYNC_VALIDATORS),
/* harmony export */   NG_VALIDATORS: () => (/* binding */ NG_VALIDATORS),
/* harmony export */   NG_VALUE_ACCESSOR: () => (/* binding */ NG_VALUE_ACCESSOR),
/* harmony export */   NgControl: () => (/* binding */ NgControl),
/* harmony export */   NgControlStatus: () => (/* binding */ NgControlStatus),
/* harmony export */   NgControlStatusGroup: () => (/* binding */ NgControlStatusGroup),
/* harmony export */   NgForm: () => (/* binding */ NgForm),
/* harmony export */   NgModel: () => (/* binding */ NgModel),
/* harmony export */   NgModelGroup: () => (/* binding */ NgModelGroup),
/* harmony export */   NgSelectOption: () => (/* binding */ NgSelectOption),
/* harmony export */   NonNullableFormBuilder: () => (/* binding */ NonNullableFormBuilder),
/* harmony export */   NumberValueAccessor: () => (/* binding */ NumberValueAccessor),
/* harmony export */   PatternValidator: () => (/* binding */ PatternValidator),
/* harmony export */   RadioControlValueAccessor: () => (/* binding */ RadioControlValueAccessor),
/* harmony export */   RangeValueAccessor: () => (/* binding */ RangeValueAccessor),
/* harmony export */   ReactiveFormsModule: () => (/* binding */ ReactiveFormsModule),
/* harmony export */   RequiredValidator: () => (/* binding */ RequiredValidator),
/* harmony export */   SelectControlValueAccessor: () => (/* binding */ SelectControlValueAccessor),
/* harmony export */   SelectMultipleControlValueAccessor: () => (/* binding */ SelectMultipleControlValueAccessor),
/* harmony export */   UntypedFormArray: () => (/* binding */ UntypedFormArray),
/* harmony export */   UntypedFormBuilder: () => (/* binding */ UntypedFormBuilder),
/* harmony export */   UntypedFormControl: () => (/* binding */ UntypedFormControl),
/* harmony export */   UntypedFormGroup: () => (/* binding */ UntypedFormGroup),
/* harmony export */   VERSION: () => (/* binding */ VERSION),
/* harmony export */   Validators: () => (/* binding */ Validators),
/* harmony export */   isFormArray: () => (/* binding */ isFormArray),
/* harmony export */   isFormControl: () => (/* binding */ isFormControl),
/* harmony export */   isFormGroup: () => (/* binding */ isFormGroup),
/* harmony export */   isFormRecord: () => (/* binding */ isFormRecord),
/* harmony export */   "ɵInternalFormsSharedModule": () => (/* binding */ ɵInternalFormsSharedModule),
/* harmony export */   "ɵNgNoValidate": () => (/* binding */ ɵNgNoValidate),
/* harmony export */   "ɵNgSelectMultipleOption": () => (/* binding */ ɵNgSelectMultipleOption)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 59936);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 34228);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 85028);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 33410);
/**
 * @license Angular v16.2.1
 * (c) 2010-2022 Google LLC. https://angular.io/
 * License: MIT
 */







/**
 * Base class for all ControlValueAccessor classes defined in Forms package.
 * Contains common logic and utility functions.
 *
 * Note: this is an *internal-only* class and should not be extended or used directly in
 * applications code.
 */
let BaseControlValueAccessor = /*#__PURE__*/(() => {
  var _class;
  class BaseControlValueAccessor {
    constructor(_renderer, _elementRef) {
      this._renderer = _renderer;
      this._elementRef = _elementRef;
      /**
       * The registered callback function called when a change or input event occurs on the input
       * element.
       * @nodoc
       */
      this.onChange = _ => {};
      /**
       * The registered callback function called when a blur event occurs on the input element.
       * @nodoc
       */
      this.onTouched = () => {};
    }
    /**
     * Helper method that sets a property on a target element using the current Renderer
     * implementation.
     * @nodoc
     */
    setProperty(key, value) {
      this._renderer.setProperty(this._elementRef.nativeElement, key, value);
    }
    /**
     * Registers a function called when the control is touched.
     * @nodoc
     */
    registerOnTouched(fn) {
      this.onTouched = fn;
    }
    /**
     * Registers a function called when the control value changes.
     * @nodoc
     */
    registerOnChange(fn) {
      this.onChange = fn;
    }
    /**
     * Sets the "disabled" property on the range input element.
     * @nodoc
     */
    setDisabledState(isDisabled) {
      this.setProperty('disabled', isDisabled);
    }
  }
  _class = BaseControlValueAccessor;
  _class.ɵfac = function _class_Factory(t) {
    return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.Renderer2), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef));
  };
  _class.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
    type: _class
  });
  return BaseControlValueAccessor;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
/**
 * Base class for all built-in ControlValueAccessor classes (except DefaultValueAccessor, which is
 * used in case no other CVAs can be found). We use this class to distinguish between default CVA,
 * built-in CVAs and custom CVAs, so that Forms logic can recognize built-in CVAs and treat custom
 * ones with higher priority (when both built-in and custom CVAs are present).
 *
 * Note: this is an *internal-only* class and should not be extended or used directly in
 * applications code.
 */
let BuiltInControlValueAccessor = /*#__PURE__*/(() => {
  var _class2;
  class BuiltInControlValueAccessor extends BaseControlValueAccessor {}
  _class2 = BuiltInControlValueAccessor;
  _class2.ɵfac = /* @__PURE__ */function () {
    let ɵ_class2_BaseFactory;
    return function _class2_Factory(t) {
      return (ɵ_class2_BaseFactory || (ɵ_class2_BaseFactory = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetInheritedFactory"](_class2)))(t || _class2);
    };
  }();
  _class2.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
    type: _class2,
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]]
  });
  return BuiltInControlValueAccessor;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
/**
 * Used to provide a `ControlValueAccessor` for form controls.
 *
 * See `DefaultValueAccessor` for how to implement one.
 *
 * @publicApi
 */
const NG_VALUE_ACCESSOR = /*#__PURE__*/new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken('NgValueAccessor');
const CHECKBOX_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: /*#__PURE__*/(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(() => CheckboxControlValueAccessor),
  multi: true
};
/**
 * @description
 * A `ControlValueAccessor` for writing a value and listening to changes on a checkbox input
 * element.
 *
 * @usageNotes
 *
 * ### Using a checkbox with a reactive form.
 *
 * The following example shows how to use a checkbox with a reactive form.
 *
 * ```ts
 * const rememberLoginControl = new FormControl();
 * ```
 *
 * ```
 * <input type="checkbox" [formControl]="rememberLoginControl">
 * ```
 *
 * @ngModule ReactiveFormsModule
 * @ngModule FormsModule
 * @publicApi
 */
let CheckboxControlValueAccessor = /*#__PURE__*/(() => {
  var _class3;
  class CheckboxControlValueAccessor extends BuiltInControlValueAccessor {
    /**
     * Sets the "checked" property on the input element.
     * @nodoc
     */
    writeValue(value) {
      this.setProperty('checked', value);
    }
  }
  _class3 = CheckboxControlValueAccessor;
  _class3.ɵfac = /* @__PURE__ */function () {
    let ɵ_class3_BaseFactory;
    return function _class3_Factory(t) {
      return (ɵ_class3_BaseFactory || (ɵ_class3_BaseFactory = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetInheritedFactory"](_class3)))(t || _class3);
    };
  }();
  _class3.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
    type: _class3,
    selectors: [["input", "type", "checkbox", "formControlName", ""], ["input", "type", "checkbox", "formControl", ""], ["input", "type", "checkbox", "ngModel", ""]],
    hostBindings: function _class3_HostBindings(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("change", function _class3_change_HostBindingHandler($event) {
          return ctx.onChange($event.target.checked);
        })("blur", function _class3_blur_HostBindingHandler() {
          return ctx.onTouched();
        });
      }
    },
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([CHECKBOX_VALUE_ACCESSOR]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]]
  });
  return CheckboxControlValueAccessor;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
const DEFAULT_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: /*#__PURE__*/(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(() => DefaultValueAccessor),
  multi: true
};
/**
 * We must check whether the agent is Android because composition events
 * behave differently between iOS and Android.
 */
function _isAndroid() {
  const userAgent = (0,_angular_common__WEBPACK_IMPORTED_MODULE_1__["ɵgetDOM"])() ? (0,_angular_common__WEBPACK_IMPORTED_MODULE_1__["ɵgetDOM"])().getUserAgent() : '';
  return /android (\d+)/.test(userAgent.toLowerCase());
}
/**
 * @description
 * Provide this token to control if form directives buffer IME input until
 * the "compositionend" event occurs.
 * @publicApi
 */
const COMPOSITION_BUFFER_MODE = /*#__PURE__*/new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken('CompositionEventMode');
/**
 * The default `ControlValueAccessor` for writing a value and listening to changes on input
 * elements. The accessor is used by the `FormControlDirective`, `FormControlName`, and
 * `NgModel` directives.
 *
 * {@searchKeywords ngDefaultControl}
 *
 * @usageNotes
 *
 * ### Using the default value accessor
 *
 * The following example shows how to use an input element that activates the default value accessor
 * (in this case, a text field).
 *
 * ```ts
 * const firstNameControl = new FormControl();
 * ```
 *
 * ```
 * <input type="text" [formControl]="firstNameControl">
 * ```
 *
 * This value accessor is used by default for `<input type="text">` and `<textarea>` elements, but
 * you could also use it for custom components that have similar behavior and do not require special
 * processing. In order to attach the default value accessor to a custom element, add the
 * `ngDefaultControl` attribute as shown below.
 *
 * ```
 * <custom-input-component ngDefaultControl [(ngModel)]="value"></custom-input-component>
 * ```
 *
 * @ngModule ReactiveFormsModule
 * @ngModule FormsModule
 * @publicApi
 */
let DefaultValueAccessor = /*#__PURE__*/(() => {
  var _class4;
  class DefaultValueAccessor extends BaseControlValueAccessor {
    constructor(renderer, elementRef, _compositionMode) {
      super(renderer, elementRef);
      this._compositionMode = _compositionMode;
      /** Whether the user is creating a composition string (IME events). */
      this._composing = false;
      if (this._compositionMode == null) {
        this._compositionMode = !_isAndroid();
      }
    }
    /**
     * Sets the "value" property on the input element.
     * @nodoc
     */
    writeValue(value) {
      const normalizedValue = value == null ? '' : value;
      this.setProperty('value', normalizedValue);
    }
    /** @internal */
    _handleInput(value) {
      if (!this._compositionMode || this._compositionMode && !this._composing) {
        this.onChange(value);
      }
    }
    /** @internal */
    _compositionStart() {
      this._composing = true;
    }
    /** @internal */
    _compositionEnd(value) {
      this._composing = false;
      this._compositionMode && this.onChange(value);
    }
  }
  _class4 = DefaultValueAccessor;
  _class4.ɵfac = function _class4_Factory(t) {
    return new (t || _class4)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.Renderer2), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](COMPOSITION_BUFFER_MODE, 8));
  };
  _class4.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
    type: _class4,
    selectors: [["input", "formControlName", "", 3, "type", "checkbox"], ["textarea", "formControlName", ""], ["input", "formControl", "", 3, "type", "checkbox"], ["textarea", "formControl", ""], ["input", "ngModel", "", 3, "type", "checkbox"], ["textarea", "ngModel", ""], ["", "ngDefaultControl", ""]],
    hostBindings: function _class4_HostBindings(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("input", function _class4_input_HostBindingHandler($event) {
          return ctx._handleInput($event.target.value);
        })("blur", function _class4_blur_HostBindingHandler() {
          return ctx.onTouched();
        })("compositionstart", function _class4_compositionstart_HostBindingHandler() {
          return ctx._compositionStart();
        })("compositionend", function _class4_compositionend_HostBindingHandler($event) {
          return ctx._compositionEnd($event.target.value);
        });
      }
    },
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([DEFAULT_VALUE_ACCESSOR]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]]
  });
  return DefaultValueAccessor;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
function isEmptyInputValue(value) {
  /**
   * Check if the object is a string or array before evaluating the length attribute.
   * This avoids falsely rejecting objects that contain a custom length attribute.
   * For example, the object {id: 1, length: 0, width: 0} should not be returned as empty.
   */
  return value == null || (typeof value === 'string' || Array.isArray(value)) && value.length === 0;
}
function hasValidLength(value) {
  // non-strict comparison is intentional, to check for both `null` and `undefined` values
  return value != null && typeof value.length === 'number';
}
/**
 * @description
 * An `InjectionToken` for registering additional synchronous validators used with
 * `AbstractControl`s.
 *
 * @see {@link NG_ASYNC_VALIDATORS}
 *
 * @usageNotes
 *
 * ### Providing a custom validator
 *
 * The following example registers a custom validator directive. Adding the validator to the
 * existing collection of validators requires the `multi: true` option.
 *
 * ```typescript
 * @Directive({
 *   selector: '[customValidator]',
 *   providers: [{provide: NG_VALIDATORS, useExisting: CustomValidatorDirective, multi: true}]
 * })
 * class CustomValidatorDirective implements Validator {
 *   validate(control: AbstractControl): ValidationErrors | null {
 *     return { 'custom': true };
 *   }
 * }
 * ```
 *
 * @publicApi
 */
const NG_VALIDATORS = /*#__PURE__*/new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken('NgValidators');
/**
 * @description
 * An `InjectionToken` for registering additional asynchronous validators used with
 * `AbstractControl`s.
 *
 * @see {@link NG_VALIDATORS}
 *
 * @usageNotes
 *
 * ### Provide a custom async validator directive
 *
 * The following example implements the `AsyncValidator` interface to create an
 * async validator directive with a custom error key.
 *
 * ```typescript
 * @Directive({
 *   selector: '[customAsyncValidator]',
 *   providers: [{provide: NG_ASYNC_VALIDATORS, useExisting: CustomAsyncValidatorDirective, multi:
 * true}]
 * })
 * class CustomAsyncValidatorDirective implements AsyncValidator {
 *   validate(control: AbstractControl): Promise<ValidationErrors|null> {
 *     return Promise.resolve({'custom': true});
 *   }
 * }
 * ```
 *
 * @publicApi
 */
const NG_ASYNC_VALIDATORS = /*#__PURE__*/new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken('NgAsyncValidators');
/**
 * A regular expression that matches valid e-mail addresses.
 *
 * At a high level, this regexp matches e-mail addresses of the format `local-part@tld`, where:
 * - `local-part` consists of one or more of the allowed characters (alphanumeric and some
 *   punctuation symbols).
 * - `local-part` cannot begin or end with a period (`.`).
 * - `local-part` cannot be longer than 64 characters.
 * - `tld` consists of one or more `labels` separated by periods (`.`). For example `localhost` or
 *   `foo.com`.
 * - A `label` consists of one or more of the allowed characters (alphanumeric, dashes (`-`) and
 *   periods (`.`)).
 * - A `label` cannot begin or end with a dash (`-`) or a period (`.`).
 * - A `label` cannot be longer than 63 characters.
 * - The whole address cannot be longer than 254 characters.
 *
 * ## Implementation background
 *
 * This regexp was ported over from AngularJS (see there for git history):
 * https://github.com/angular/angular.js/blob/c133ef836/src/ng/directive/input.js#L27
 * It is based on the
 * [WHATWG version](https://html.spec.whatwg.org/multipage/input.html#valid-e-mail-address) with
 * some enhancements to incorporate more RFC rules (such as rules related to domain names and the
 * lengths of different parts of the address). The main differences from the WHATWG version are:
 *   - Disallow `local-part` to begin or end with a period (`.`).
 *   - Disallow `local-part` length to exceed 64 characters.
 *   - Disallow total address length to exceed 254 characters.
 *
 * See [this commit](https://github.com/angular/angular.js/commit/f3f5cf72e) for more details.
 */
const EMAIL_REGEXP = /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
/**
 * @description
 * Provides a set of built-in validators that can be used by form controls.
 *
 * A validator is a function that processes a `FormControl` or collection of
 * controls and returns an error map or null. A null map means that validation has passed.
 *
 * @see [Form Validation](/guide/form-validation)
 *
 * @publicApi
 */
class Validators {
  /**
   * @description
   * Validator that requires the control's value to be greater than or equal to the provided number.
   *
   * @usageNotes
   *
   * ### Validate against a minimum of 3
   *
   * ```typescript
   * const control = new FormControl(2, Validators.min(3));
   *
   * console.log(control.errors); // {min: {min: 3, actual: 2}}
   * ```
   *
   * @returns A validator function that returns an error map with the
   * `min` property if the validation check fails, otherwise `null`.
   *
   * @see {@link updateValueAndValidity()}
   *
   */
  static min(min) {
    return minValidator(min);
  }
  /**
   * @description
   * Validator that requires the control's value to be less than or equal to the provided number.
   *
   * @usageNotes
   *
   * ### Validate against a maximum of 15
   *
   * ```typescript
   * const control = new FormControl(16, Validators.max(15));
   *
   * console.log(control.errors); // {max: {max: 15, actual: 16}}
   * ```
   *
   * @returns A validator function that returns an error map with the
   * `max` property if the validation check fails, otherwise `null`.
   *
   * @see {@link updateValueAndValidity()}
   *
   */
  static max(max) {
    return maxValidator(max);
  }
  /**
   * @description
   * Validator that requires the control have a non-empty value.
   *
   * @usageNotes
   *
   * ### Validate that the field is non-empty
   *
   * ```typescript
   * const control = new FormControl('', Validators.required);
   *
   * console.log(control.errors); // {required: true}
   * ```
   *
   * @returns An error map with the `required` property
   * if the validation check fails, otherwise `null`.
   *
   * @see {@link updateValueAndValidity()}
   *
   */
  static required(control) {
    return requiredValidator(control);
  }
  /**
   * @description
   * Validator that requires the control's value be true. This validator is commonly
   * used for required checkboxes.
   *
   * @usageNotes
   *
   * ### Validate that the field value is true
   *
   * ```typescript
   * const control = new FormControl('some value', Validators.requiredTrue);
   *
   * console.log(control.errors); // {required: true}
   * ```
   *
   * @returns An error map that contains the `required` property
   * set to `true` if the validation check fails, otherwise `null`.
   *
   * @see {@link updateValueAndValidity()}
   *
   */
  static requiredTrue(control) {
    return requiredTrueValidator(control);
  }
  /**
   * @description
   * Validator that requires the control's value pass an email validation test.
   *
   * Tests the value using a [regular
   * expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)
   * pattern suitable for common use cases. The pattern is based on the definition of a valid email
   * address in the [WHATWG HTML
   * specification](https://html.spec.whatwg.org/multipage/input.html#valid-e-mail-address) with
   * some enhancements to incorporate more RFC rules (such as rules related to domain names and the
   * lengths of different parts of the address).
   *
   * The differences from the WHATWG version include:
   * - Disallow `local-part` (the part before the `@` symbol) to begin or end with a period (`.`).
   * - Disallow `local-part` to be longer than 64 characters.
   * - Disallow the whole address to be longer than 254 characters.
   *
   * If this pattern does not satisfy your business needs, you can use `Validators.pattern()` to
   * validate the value against a different pattern.
   *
   * @usageNotes
   *
   * ### Validate that the field matches a valid email pattern
   *
   * ```typescript
   * const control = new FormControl('bad@', Validators.email);
   *
   * console.log(control.errors); // {email: true}
   * ```
   *
   * @returns An error map with the `email` property
   * if the validation check fails, otherwise `null`.
   *
   * @see {@link updateValueAndValidity()}
   *
   */
  static email(control) {
    return emailValidator(control);
  }
  /**
   * @description
   * Validator that requires the length of the control's value to be greater than or equal
   * to the provided minimum length. This validator is also provided by default if you use the
   * the HTML5 `minlength` attribute. Note that the `minLength` validator is intended to be used
   * only for types that have a numeric `length` property, such as strings or arrays. The
   * `minLength` validator logic is also not invoked for values when their `length` property is 0
   * (for example in case of an empty string or an empty array), to support optional controls. You
   * can use the standard `required` validator if empty values should not be considered valid.
   *
   * @usageNotes
   *
   * ### Validate that the field has a minimum of 3 characters
   *
   * ```typescript
   * const control = new FormControl('ng', Validators.minLength(3));
   *
   * console.log(control.errors); // {minlength: {requiredLength: 3, actualLength: 2}}
   * ```
   *
   * ```html
   * <input minlength="5">
   * ```
   *
   * @returns A validator function that returns an error map with the
   * `minlength` property if the validation check fails, otherwise `null`.
   *
   * @see {@link updateValueAndValidity()}
   *
   */
  static minLength(minLength) {
    return minLengthValidator(minLength);
  }
  /**
   * @description
   * Validator that requires the length of the control's value to be less than or equal
   * to the provided maximum length. This validator is also provided by default if you use the
   * the HTML5 `maxlength` attribute. Note that the `maxLength` validator is intended to be used
   * only for types that have a numeric `length` property, such as strings or arrays.
   *
   * @usageNotes
   *
   * ### Validate that the field has maximum of 5 characters
   *
   * ```typescript
   * const control = new FormControl('Angular', Validators.maxLength(5));
   *
   * console.log(control.errors); // {maxlength: {requiredLength: 5, actualLength: 7}}
   * ```
   *
   * ```html
   * <input maxlength="5">
   * ```
   *
   * @returns A validator function that returns an error map with the
   * `maxlength` property if the validation check fails, otherwise `null`.
   *
   * @see {@link updateValueAndValidity()}
   *
   */
  static maxLength(maxLength) {
    return maxLengthValidator(maxLength);
  }
  /**
   * @description
   * Validator that requires the control's value to match a regex pattern. This validator is also
   * provided by default if you use the HTML5 `pattern` attribute.
   *
   * @usageNotes
   *
   * ### Validate that the field only contains letters or spaces
   *
   * ```typescript
   * const control = new FormControl('1', Validators.pattern('[a-zA-Z ]*'));
   *
   * console.log(control.errors); // {pattern: {requiredPattern: '^[a-zA-Z ]*$', actualValue: '1'}}
   * ```
   *
   * ```html
   * <input pattern="[a-zA-Z ]*">
   * ```
   *
   * ### Pattern matching with the global or sticky flag
   *
   * `RegExp` objects created with the `g` or `y` flags that are passed into `Validators.pattern`
   * can produce different results on the same input when validations are run consecutively. This is
   * due to how the behavior of `RegExp.prototype.test` is
   * specified in [ECMA-262](https://tc39.es/ecma262/#sec-regexpbuiltinexec)
   * (`RegExp` preserves the index of the last match when the global or sticky flag is used).
   * Due to this behavior, it is recommended that when using
   * `Validators.pattern` you **do not** pass in a `RegExp` object with either the global or sticky
   * flag enabled.
   *
   * ```typescript
   * // Not recommended (since the `g` flag is used)
   * const controlOne = new FormControl('1', Validators.pattern(/foo/g));
   *
   * // Good
   * const controlTwo = new FormControl('1', Validators.pattern(/foo/));
   * ```
   *
   * @param pattern A regular expression to be used as is to test the values, or a string.
   * If a string is passed, the `^` character is prepended and the `$` character is
   * appended to the provided string (if not already present), and the resulting regular
   * expression is used to test the values.
   *
   * @returns A validator function that returns an error map with the
   * `pattern` property if the validation check fails, otherwise `null`.
   *
   * @see {@link updateValueAndValidity()}
   *
   */
  static pattern(pattern) {
    return patternValidator(pattern);
  }
  /**
   * @description
   * Validator that performs no operation.
   *
   * @see {@link updateValueAndValidity()}
   *
   */
  static nullValidator(control) {
    return nullValidator(control);
  }
  static compose(validators) {
    return compose(validators);
  }
  /**
   * @description
   * Compose multiple async validators into a single function that returns the union
   * of the individual error objects for the provided control.
   *
   * @returns A validator function that returns an error map with the
   * merged error objects of the async validators if the validation check fails, otherwise `null`.
   *
   * @see {@link updateValueAndValidity()}
   *
   */
  static composeAsync(validators) {
    return composeAsync(validators);
  }
}
/**
 * Validator that requires the control's value to be greater than or equal to the provided number.
 * See `Validators.min` for additional information.
 */
function minValidator(min) {
  return control => {
    if (isEmptyInputValue(control.value) || isEmptyInputValue(min)) {
      return null; // don't validate empty values to allow optional controls
    }

    const value = parseFloat(control.value);
    // Controls with NaN values after parsing should be treated as not having a
    // minimum, per the HTML forms spec: https://www.w3.org/TR/html5/forms.html#attr-input-min
    return !isNaN(value) && value < min ? {
      'min': {
        'min': min,
        'actual': control.value
      }
    } : null;
  };
}
/**
 * Validator that requires the control's value to be less than or equal to the provided number.
 * See `Validators.max` for additional information.
 */
function maxValidator(max) {
  return control => {
    if (isEmptyInputValue(control.value) || isEmptyInputValue(max)) {
      return null; // don't validate empty values to allow optional controls
    }

    const value = parseFloat(control.value);
    // Controls with NaN values after parsing should be treated as not having a
    // maximum, per the HTML forms spec: https://www.w3.org/TR/html5/forms.html#attr-input-max
    return !isNaN(value) && value > max ? {
      'max': {
        'max': max,
        'actual': control.value
      }
    } : null;
  };
}
/**
 * Validator that requires the control have a non-empty value.
 * See `Validators.required` for additional information.
 */
function requiredValidator(control) {
  return isEmptyInputValue(control.value) ? {
    'required': true
  } : null;
}
/**
 * Validator that requires the control's value be true. This validator is commonly
 * used for required checkboxes.
 * See `Validators.requiredTrue` for additional information.
 */
function requiredTrueValidator(control) {
  return control.value === true ? null : {
    'required': true
  };
}
/**
 * Validator that requires the control's value pass an email validation test.
 * See `Validators.email` for additional information.
 */
function emailValidator(control) {
  if (isEmptyInputValue(control.value)) {
    return null; // don't validate empty values to allow optional controls
  }

  return EMAIL_REGEXP.test(control.value) ? null : {
    'email': true
  };
}
/**
 * Validator that requires the length of the control's value to be greater than or equal
 * to the provided minimum length. See `Validators.minLength` for additional information.
 */
function minLengthValidator(minLength) {
  return control => {
    if (isEmptyInputValue(control.value) || !hasValidLength(control.value)) {
      // don't validate empty values to allow optional controls
      // don't validate values without `length` property
      return null;
    }
    return control.value.length < minLength ? {
      'minlength': {
        'requiredLength': minLength,
        'actualLength': control.value.length
      }
    } : null;
  };
}
/**
 * Validator that requires the length of the control's value to be less than or equal
 * to the provided maximum length. See `Validators.maxLength` for additional information.
 */
function maxLengthValidator(maxLength) {
  return control => {
    return hasValidLength(control.value) && control.value.length > maxLength ? {
      'maxlength': {
        'requiredLength': maxLength,
        'actualLength': control.value.length
      }
    } : null;
  };
}
/**
 * Validator that requires the control's value to match a regex pattern.
 * See `Validators.pattern` for additional information.
 */
function patternValidator(pattern) {
  if (!pattern) return nullValidator;
  let regex;
  let regexStr;
  if (typeof pattern === 'string') {
    regexStr = '';
    if (pattern.charAt(0) !== '^') regexStr += '^';
    regexStr += pattern;
    if (pattern.charAt(pattern.length - 1) !== '$') regexStr += '$';
    regex = new RegExp(regexStr);
  } else {
    regexStr = pattern.toString();
    regex = pattern;
  }
  return control => {
    if (isEmptyInputValue(control.value)) {
      return null; // don't validate empty values to allow optional controls
    }

    const value = control.value;
    return regex.test(value) ? null : {
      'pattern': {
        'requiredPattern': regexStr,
        'actualValue': value
      }
    };
  };
}
/**
 * Function that has `ValidatorFn` shape, but performs no operation.
 */
function nullValidator(control) {
  return null;
}
function isPresent(o) {
  return o != null;
}
function toObservable(value) {
  const obs = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵisPromise"])(value) ? (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.from)(value) : value;
  if ((typeof ngDevMode === 'undefined' || ngDevMode) && !(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵisSubscribable"])(obs)) {
    let errorMessage = `Expected async validator to return Promise or Observable.`;
    // A synchronous validator will return object or null.
    if (typeof value === 'object') {
      errorMessage += ' Are you using a synchronous validator where an async validator is expected?';
    }
    throw new _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵRuntimeError"](-1101 /* RuntimeErrorCode.WRONG_VALIDATOR_RETURN_TYPE */, errorMessage);
  }
  return obs;
}
function mergeErrors(arrayOfErrors) {
  let res = {};
  arrayOfErrors.forEach(errors => {
    res = errors != null ? {
      ...res,
      ...errors
    } : res;
  });
  return Object.keys(res).length === 0 ? null : res;
}
function executeValidators(control, validators) {
  return validators.map(validator => validator(control));
}
function isValidatorFn(validator) {
  return !validator.validate;
}
/**
 * Given the list of validators that may contain both functions as well as classes, return the list
 * of validator functions (convert validator classes into validator functions). This is needed to
 * have consistent structure in validators list before composing them.
 *
 * @param validators The set of validators that may contain validators both in plain function form
 *     as well as represented as a validator class.
 */
function normalizeValidators(validators) {
  return validators.map(validator => {
    return isValidatorFn(validator) ? validator : c => validator.validate(c);
  });
}
/**
 * Merges synchronous validators into a single validator function.
 * See `Validators.compose` for additional information.
 */
function compose(validators) {
  if (!validators) return null;
  const presentValidators = validators.filter(isPresent);
  if (presentValidators.length == 0) return null;
  return function (control) {
    return mergeErrors(executeValidators(control, presentValidators));
  };
}
/**
 * Accepts a list of validators of different possible shapes (`Validator` and `ValidatorFn`),
 * normalizes the list (converts everything to `ValidatorFn`) and merges them into a single
 * validator function.
 */
function composeValidators(validators) {
  return validators != null ? compose(normalizeValidators(validators)) : null;
}
/**
 * Merges asynchronous validators into a single validator function.
 * See `Validators.composeAsync` for additional information.
 */
function composeAsync(validators) {
  if (!validators) return null;
  const presentValidators = validators.filter(isPresent);
  if (presentValidators.length == 0) return null;
  return function (control) {
    const observables = executeValidators(control, presentValidators).map(toObservable);
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.forkJoin)(observables).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.map)(mergeErrors));
  };
}
/**
 * Accepts a list of async validators of different possible shapes (`AsyncValidator` and
 * `AsyncValidatorFn`), normalizes the list (converts everything to `AsyncValidatorFn`) and merges
 * them into a single validator function.
 */
function composeAsyncValidators(validators) {
  return validators != null ? composeAsync(normalizeValidators(validators)) : null;
}
/**
 * Merges raw control validators with a given directive validator and returns the combined list of
 * validators as an array.
 */
function mergeValidators(controlValidators, dirValidator) {
  if (controlValidators === null) return [dirValidator];
  return Array.isArray(controlValidators) ? [...controlValidators, dirValidator] : [controlValidators, dirValidator];
}
/**
 * Retrieves the list of raw synchronous validators attached to a given control.
 */
function getControlValidators(control) {
  return control._rawValidators;
}
/**
 * Retrieves the list of raw asynchronous validators attached to a given control.
 */
function getControlAsyncValidators(control) {
  return control._rawAsyncValidators;
}
/**
 * Accepts a singleton validator, an array, or null, and returns an array type with the provided
 * validators.
 *
 * @param validators A validator, validators, or null.
 * @returns A validators array.
 */
function makeValidatorsArray(validators) {
  if (!validators) return [];
  return Array.isArray(validators) ? validators : [validators];
}
/**
 * Determines whether a validator or validators array has a given validator.
 *
 * @param validators The validator or validators to compare against.
 * @param validator The validator to check.
 * @returns Whether the validator is present.
 */
function hasValidator(validators, validator) {
  return Array.isArray(validators) ? validators.includes(validator) : validators === validator;
}
/**
 * Combines two arrays of validators into one. If duplicates are provided, only one will be added.
 *
 * @param validators The new validators.
 * @param currentValidators The base array of current validators.
 * @returns An array of validators.
 */
function addValidators(validators, currentValidators) {
  const current = makeValidatorsArray(currentValidators);
  const validatorsToAdd = makeValidatorsArray(validators);
  validatorsToAdd.forEach(v => {
    // Note: if there are duplicate entries in the new validators array,
    // only the first one would be added to the current list of validators.
    // Duplicate ones would be ignored since `hasValidator` would detect
    // the presence of a validator function and we update the current list in place.
    if (!hasValidator(current, v)) {
      current.push(v);
    }
  });
  return current;
}
function removeValidators(validators, currentValidators) {
  return makeValidatorsArray(currentValidators).filter(v => !hasValidator(validators, v));
}

/**
 * @description
 * Base class for control directives.
 *
 * This class is only used internally in the `ReactiveFormsModule` and the `FormsModule`.
 *
 * @publicApi
 */
class AbstractControlDirective {
  constructor() {
    /**
     * Set of synchronous validators as they were provided while calling `setValidators` function.
     * @internal
     */
    this._rawValidators = [];
    /**
     * Set of asynchronous validators as they were provided while calling `setAsyncValidators`
     * function.
     * @internal
     */
    this._rawAsyncValidators = [];
    /*
     * The set of callbacks to be invoked when directive instance is being destroyed.
     */
    this._onDestroyCallbacks = [];
  }
  /**
   * @description
   * Reports the value of the control if it is present, otherwise null.
   */
  get value() {
    return this.control ? this.control.value : null;
  }
  /**
   * @description
   * Reports whether the control is valid. A control is considered valid if no
   * validation errors exist with the current value.
   * If the control is not present, null is returned.
   */
  get valid() {
    return this.control ? this.control.valid : null;
  }
  /**
   * @description
   * Reports whether the control is invalid, meaning that an error exists in the input value.
   * If the control is not present, null is returned.
   */
  get invalid() {
    return this.control ? this.control.invalid : null;
  }
  /**
   * @description
   * Reports whether a control is pending, meaning that async validation is occurring and
   * errors are not yet available for the input value. If the control is not present, null is
   * returned.
   */
  get pending() {
    return this.control ? this.control.pending : null;
  }
  /**
   * @description
   * Reports whether the control is disabled, meaning that the control is disabled
   * in the UI and is exempt from validation checks and excluded from aggregate
   * values of ancestor controls. If the control is not present, null is returned.
   */
  get disabled() {
    return this.control ? this.control.disabled : null;
  }
  /**
   * @description
   * Reports whether the control is enabled, meaning that the control is included in ancestor
   * calculations of validity or value. If the control is not present, null is returned.
   */
  get enabled() {
    return this.control ? this.control.enabled : null;
  }
  /**
   * @description
   * Reports the control's validation errors. If the control is not present, null is returned.
   */
  get errors() {
    return this.control ? this.control.errors : null;
  }
  /**
   * @description
   * Reports whether the control is pristine, meaning that the user has not yet changed
   * the value in the UI. If the control is not present, null is returned.
   */
  get pristine() {
    return this.control ? this.control.pristine : null;
  }
  /**
   * @description
   * Reports whether the control is dirty, meaning that the user has changed
   * the value in the UI. If the control is not present, null is returned.
   */
  get dirty() {
    return this.control ? this.control.dirty : null;
  }
  /**
   * @description
   * Reports whether the control is touched, meaning that the user has triggered
   * a `blur` event on it. If the control is not present, null is returned.
   */
  get touched() {
    return this.control ? this.control.touched : null;
  }
  /**
   * @description
   * Reports the validation status of the control. Possible values include:
   * 'VALID', 'INVALID', 'DISABLED', and 'PENDING'.
   * If the control is not present, null is returned.
   */
  get status() {
    return this.control ? this.control.status : null;
  }
  /**
   * @description
   * Reports whether the control is untouched, meaning that the user has not yet triggered
   * a `blur` event on it. If the control is not present, null is returned.
   */
  get untouched() {
    return this.control ? this.control.untouched : null;
  }
  /**
   * @description
   * Returns a multicasting observable that emits a validation status whenever it is
   * calculated for the control. If the control is not present, null is returned.
   */
  get statusChanges() {
    return this.control ? this.control.statusChanges : null;
  }
  /**
   * @description
   * Returns a multicasting observable of value changes for the control that emits every time the
   * value of the control changes in the UI or programmatically.
   * If the control is not present, null is returned.
   */
  get valueChanges() {
    return this.control ? this.control.valueChanges : null;
  }
  /**
   * @description
   * Returns an array that represents the path from the top-level form to this control.
   * Each index is the string name of the control on that level.
   */
  get path() {
    return null;
  }
  /**
   * Sets synchronous validators for this directive.
   * @internal
   */
  _setValidators(validators) {
    this._rawValidators = validators || [];
    this._composedValidatorFn = composeValidators(this._rawValidators);
  }
  /**
   * Sets asynchronous validators for this directive.
   * @internal
   */
  _setAsyncValidators(validators) {
    this._rawAsyncValidators = validators || [];
    this._composedAsyncValidatorFn = composeAsyncValidators(this._rawAsyncValidators);
  }
  /**
   * @description
   * Synchronous validator function composed of all the synchronous validators registered with this
   * directive.
   */
  get validator() {
    return this._composedValidatorFn || null;
  }
  /**
   * @description
   * Asynchronous validator function composed of all the asynchronous validators registered with
   * this directive.
   */
  get asyncValidator() {
    return this._composedAsyncValidatorFn || null;
  }
  /**
   * Internal function to register callbacks that should be invoked
   * when directive instance is being destroyed.
   * @internal
   */
  _registerOnDestroy(fn) {
    this._onDestroyCallbacks.push(fn);
  }
  /**
   * Internal function to invoke all registered "on destroy" callbacks.
   * Note: calling this function also clears the list of callbacks.
   * @internal
   */
  _invokeOnDestroyCallbacks() {
    this._onDestroyCallbacks.forEach(fn => fn());
    this._onDestroyCallbacks = [];
  }
  /**
   * @description
   * Resets the control with the provided value if the control is present.
   */
  reset(value = undefined) {
    if (this.control) this.control.reset(value);
  }
  /**
   * @description
   * Reports whether the control with the given path has the error specified.
   *
   * @param errorCode The code of the error to check
   * @param path A list of control names that designates how to move from the current control
   * to the control that should be queried for errors.
   *
   * @usageNotes
   * For example, for the following `FormGroup`:
   *
   * ```
   * form = new FormGroup({
   *   address: new FormGroup({ street: new FormControl() })
   * });
   * ```
   *
   * The path to the 'street' control from the root form would be 'address' -> 'street'.
   *
   * It can be provided to this method in one of two formats:
   *
   * 1. An array of string control names, e.g. `['address', 'street']`
   * 1. A period-delimited list of control names in one string, e.g. `'address.street'`
   *
   * If no path is given, this method checks for the error on the current control.
   *
   * @returns whether the given error is present in the control at the given path.
   *
   * If the control is not present, false is returned.
   */
  hasError(errorCode, path) {
    return this.control ? this.control.hasError(errorCode, path) : false;
  }
  /**
   * @description
   * Reports error data for the control with the given path.
   *
   * @param errorCode The code of the error to check
   * @param path A list of control names that designates how to move from the current control
   * to the control that should be queried for errors.
   *
   * @usageNotes
   * For example, for the following `FormGroup`:
   *
   * ```
   * form = new FormGroup({
   *   address: new FormGroup({ street: new FormControl() })
   * });
   * ```
   *
   * The path to the 'street' control from the root form would be 'address' -> 'street'.
   *
   * It can be provided to this method in one of two formats:
   *
   * 1. An array of string control names, e.g. `['address', 'street']`
   * 1. A period-delimited list of control names in one string, e.g. `'address.street'`
   *
   * @returns error data for that particular error. If the control or error is not present,
   * null is returned.
   */
  getError(errorCode, path) {
    return this.control ? this.control.getError(errorCode, path) : null;
  }
}

/**
 * @description
 * A base class for directives that contain multiple registered instances of `NgControl`.
 * Only used by the forms module.
 *
 * @publicApi
 */
class ControlContainer extends AbstractControlDirective {
  /**
   * @description
   * The top-level form directive for the control.
   */
  get formDirective() {
    return null;
  }
  /**
   * @description
   * The path to this group.
   */
  get path() {
    return null;
  }
}

/**
 * @description
 * A base class that all `FormControl`-based directives extend. It binds a `FormControl`
 * object to a DOM element.
 *
 * @publicApi
 */
class NgControl extends AbstractControlDirective {
  constructor() {
    super(...arguments);
    /**
     * @description
     * The parent form for the control.
     *
     * @internal
     */
    this._parent = null;
    /**
     * @description
     * The name for the control
     */
    this.name = null;
    /**
     * @description
     * The value accessor for the control
     */
    this.valueAccessor = null;
  }
}

// DO NOT REFACTOR!
// Each status is represented by a separate function to make sure that
// advanced Closure Compiler optimizations related to property renaming
// can work correctly.
class AbstractControlStatus {
  constructor(cd) {
    this._cd = cd;
  }
  get isTouched() {
    return !!this._cd?.control?.touched;
  }
  get isUntouched() {
    return !!this._cd?.control?.untouched;
  }
  get isPristine() {
    return !!this._cd?.control?.pristine;
  }
  get isDirty() {
    return !!this._cd?.control?.dirty;
  }
  get isValid() {
    return !!this._cd?.control?.valid;
  }
  get isInvalid() {
    return !!this._cd?.control?.invalid;
  }
  get isPending() {
    return !!this._cd?.control?.pending;
  }
  get isSubmitted() {
    // We check for the `submitted` field from `NgForm` and `FormGroupDirective` classes, but
    // we avoid instanceof checks to prevent non-tree-shakable references to those types.
    return !!this._cd?.submitted;
  }
}
const ngControlStatusHost = {
  '[class.ng-untouched]': 'isUntouched',
  '[class.ng-touched]': 'isTouched',
  '[class.ng-pristine]': 'isPristine',
  '[class.ng-dirty]': 'isDirty',
  '[class.ng-valid]': 'isValid',
  '[class.ng-invalid]': 'isInvalid',
  '[class.ng-pending]': 'isPending'
};
const ngGroupStatusHost = {
  ...ngControlStatusHost,
  '[class.ng-submitted]': 'isSubmitted'
};
/**
 * @description
 * Directive automatically applied to Angular form controls that sets CSS classes
 * based on control status.
 *
 * @usageNotes
 *
 * ### CSS classes applied
 *
 * The following classes are applied as the properties become true:
 *
 * * ng-valid
 * * ng-invalid
 * * ng-pending
 * * ng-pristine
 * * ng-dirty
 * * ng-untouched
 * * ng-touched
 *
 * @ngModule ReactiveFormsModule
 * @ngModule FormsModule
 * @publicApi
 */
let NgControlStatus = /*#__PURE__*/(() => {
  var _class5;
  class NgControlStatus extends AbstractControlStatus {
    constructor(cd) {
      super(cd);
    }
  }
  _class5 = NgControlStatus;
  _class5.ɵfac = function _class5_Factory(t) {
    return new (t || _class5)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](NgControl, 2));
  };
  _class5.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
    type: _class5,
    selectors: [["", "formControlName", ""], ["", "ngModel", ""], ["", "formControl", ""]],
    hostVars: 14,
    hostBindings: function _class5_HostBindings(rf, ctx) {
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("ng-untouched", ctx.isUntouched)("ng-touched", ctx.isTouched)("ng-pristine", ctx.isPristine)("ng-dirty", ctx.isDirty)("ng-valid", ctx.isValid)("ng-invalid", ctx.isInvalid)("ng-pending", ctx.isPending);
      }
    },
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]]
  });
  return NgControlStatus;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
/**
 * @description
 * Directive automatically applied to Angular form groups that sets CSS classes
 * based on control status (valid/invalid/dirty/etc). On groups, this includes the additional
 * class ng-submitted.
 *
 * @see {@link NgControlStatus}
 *
 * @ngModule ReactiveFormsModule
 * @ngModule FormsModule
 * @publicApi
 */
let NgControlStatusGroup = /*#__PURE__*/(() => {
  var _class6;
  class NgControlStatusGroup extends AbstractControlStatus {
    constructor(cd) {
      super(cd);
    }
  }
  _class6 = NgControlStatusGroup;
  _class6.ɵfac = function _class6_Factory(t) {
    return new (t || _class6)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](ControlContainer, 10));
  };
  _class6.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
    type: _class6,
    selectors: [["", "formGroupName", ""], ["", "formArrayName", ""], ["", "ngModelGroup", ""], ["", "formGroup", ""], ["form", 3, "ngNoForm", ""], ["", "ngForm", ""]],
    hostVars: 16,
    hostBindings: function _class6_HostBindings(rf, ctx) {
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("ng-untouched", ctx.isUntouched)("ng-touched", ctx.isTouched)("ng-pristine", ctx.isPristine)("ng-dirty", ctx.isDirty)("ng-valid", ctx.isValid)("ng-invalid", ctx.isInvalid)("ng-pending", ctx.isPending)("ng-submitted", ctx.isSubmitted);
      }
    },
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]]
  });
  return NgControlStatusGroup;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
const formControlNameExample = `
  <div [formGroup]="myGroup">
    <input formControlName="firstName">
  </div>

  In your class:

  this.myGroup = new FormGroup({
      firstName: new FormControl()
  });`;
const formGroupNameExample = `
  <div [formGroup]="myGroup">
      <div formGroupName="person">
        <input formControlName="firstName">
      </div>
  </div>

  In your class:

  this.myGroup = new FormGroup({
      person: new FormGroup({ firstName: new FormControl() })
  });`;
const formArrayNameExample = `
  <div [formGroup]="myGroup">
    <div formArrayName="cities">
      <div *ngFor="let city of cityArray.controls; index as i">
        <input [formControlName]="i">
      </div>
    </div>
  </div>

  In your class:

  this.cityArray = new FormArray([new FormControl('SF')]);
  this.myGroup = new FormGroup({
    cities: this.cityArray
  });`;
const ngModelGroupExample = `
  <form>
      <div ngModelGroup="person">
        <input [(ngModel)]="person.name" name="firstName">
      </div>
  </form>`;
const ngModelWithFormGroupExample = `
  <div [formGroup]="myGroup">
      <input formControlName="firstName">
      <input [(ngModel)]="showMoreControls" [ngModelOptions]="{standalone: true}">
  </div>
`;
function controlParentException() {
  return new _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵRuntimeError"](1050 /* RuntimeErrorCode.FORM_CONTROL_NAME_MISSING_PARENT */, `formControlName must be used with a parent formGroup directive.  You'll want to add a formGroup
      directive and pass it an existing FormGroup instance (you can create one in your class).

    Example:

    ${formControlNameExample}`);
}
function ngModelGroupException() {
  return new _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵRuntimeError"](1051 /* RuntimeErrorCode.FORM_CONTROL_NAME_INSIDE_MODEL_GROUP */, `formControlName cannot be used with an ngModelGroup parent. It is only compatible with parents
      that also have a "form" prefix: formGroupName, formArrayName, or formGroup.

      Option 1:  Update the parent to be formGroupName (reactive form strategy)

      ${formGroupNameExample}

      Option 2: Use ngModel instead of formControlName (template-driven strategy)

      ${ngModelGroupExample}`);
}
function missingFormException() {
  return new _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵRuntimeError"](1052 /* RuntimeErrorCode.FORM_GROUP_MISSING_INSTANCE */, `formGroup expects a FormGroup instance. Please pass one in.

      Example:

      ${formControlNameExample}`);
}
function groupParentException() {
  return new _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵRuntimeError"](1053 /* RuntimeErrorCode.FORM_GROUP_NAME_MISSING_PARENT */, `formGroupName must be used with a parent formGroup directive.  You'll want to add a formGroup
    directive and pass it an existing FormGroup instance (you can create one in your class).

    Example:

    ${formGroupNameExample}`);
}
function arrayParentException() {
  return new _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵRuntimeError"](1054 /* RuntimeErrorCode.FORM_ARRAY_NAME_MISSING_PARENT */, `formArrayName must be used with a parent formGroup directive.  You'll want to add a formGroup
      directive and pass it an existing FormGroup instance (you can create one in your class).

      Example:

      ${formArrayNameExample}`);
}
const disabledAttrWarning = `
  It looks like you're using the disabled attribute with a reactive form directive. If you set disabled to true
  when you set up this control in your component class, the disabled attribute will actually be set in the DOM for
  you. We recommend using this approach to avoid 'changed after checked' errors.

  Example:
  // Specify the \`disabled\` property at control creation time:
  form = new FormGroup({
    first: new FormControl({value: 'Nancy', disabled: true}, Validators.required),
    last: new FormControl('Drew', Validators.required)
  });

  // Controls can also be enabled/disabled after creation:
  form.get('first')?.enable();
  form.get('last')?.disable();
`;
const asyncValidatorsDroppedWithOptsWarning = `
  It looks like you're constructing using a FormControl with both an options argument and an
  async validators argument. Mixing these arguments will cause your async validators to be dropped.
  You should either put all your validators in the options object, or in separate validators
  arguments. For example:

  // Using validators arguments
  fc = new FormControl(42, Validators.required, myAsyncValidator);

  // Using AbstractControlOptions
  fc = new FormControl(42, {validators: Validators.required, asyncValidators: myAV});

  // Do NOT mix them: async validators will be dropped!
  fc = new FormControl(42, {validators: Validators.required}, /* Oops! */ myAsyncValidator);
`;
function ngModelWarning(directiveName) {
  return `
  It looks like you're using ngModel on the same form field as ${directiveName}.
  Support for using the ngModel input property and ngModelChange event with
  reactive form directives has been deprecated in Angular v6 and will be removed
  in a future version of Angular.

  For more information on this, see our API docs here:
  https://angular.io/api/forms/${directiveName === 'formControl' ? 'FormControlDirective' : 'FormControlName'}#use-with-ngmodel
  `;
}
function describeKey(isFormGroup, key) {
  return isFormGroup ? `with name: '${key}'` : `at index: ${key}`;
}
function noControlsError(isFormGroup) {
  return `
    There are no form controls registered with this ${isFormGroup ? 'group' : 'array'} yet. If you're using ngModel,
    you may want to check next tick (e.g. use setTimeout).
  `;
}
function missingControlError(isFormGroup, key) {
  return `Cannot find form control ${describeKey(isFormGroup, key)}`;
}
function missingControlValueError(isFormGroup, key) {
  return `Must supply a value for form control ${describeKey(isFormGroup, key)}`;
}

/**
 * Reports that a control is valid, meaning that no errors exist in the input value.
 *
 * @see {@link status}
 */
const VALID = 'VALID';
/**
 * Reports that a control is invalid, meaning that an error exists in the input value.
 *
 * @see {@link status}
 */
const INVALID = 'INVALID';
/**
 * Reports that a control is pending, meaning that async validation is occurring and
 * errors are not yet available for the input value.
 *
 * @see {@link markAsPending}
 * @see {@link status}
 */
const PENDING = 'PENDING';
/**
 * Reports that a control is disabled, meaning that the control is exempt from ancestor
 * calculations of validity or value.
 *
 * @see {@link markAsDisabled}
 * @see {@link status}
 */
const DISABLED = 'DISABLED';
/**
 * Gets validators from either an options object or given validators.
 */
function pickValidators(validatorOrOpts) {
  return (isOptionsObj(validatorOrOpts) ? validatorOrOpts.validators : validatorOrOpts) || null;
}
/**
 * Creates validator function by combining provided validators.
 */
function coerceToValidator(validator) {
  return Array.isArray(validator) ? composeValidators(validator) : validator || null;
}
/**
 * Gets async validators from either an options object or given validators.
 */
function pickAsyncValidators(asyncValidator, validatorOrOpts) {
  if (typeof ngDevMode === 'undefined' || ngDevMode) {
    if (isOptionsObj(validatorOrOpts) && asyncValidator) {
      console.warn(asyncValidatorsDroppedWithOptsWarning);
    }
  }
  return (isOptionsObj(validatorOrOpts) ? validatorOrOpts.asyncValidators : asyncValidator) || null;
}
/**
 * Creates async validator function by combining provided async validators.
 */
function coerceToAsyncValidator(asyncValidator) {
  return Array.isArray(asyncValidator) ? composeAsyncValidators(asyncValidator) : asyncValidator || null;
}
function isOptionsObj(validatorOrOpts) {
  return validatorOrOpts != null && !Array.isArray(validatorOrOpts) && typeof validatorOrOpts === 'object';
}
function assertControlPresent(parent, isGroup, key) {
  const controls = parent.controls;
  const collection = isGroup ? Object.keys(controls) : controls;
  if (!collection.length) {
    throw new _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵRuntimeError"](1000 /* RuntimeErrorCode.NO_CONTROLS */, typeof ngDevMode === 'undefined' || ngDevMode ? noControlsError(isGroup) : '');
  }
  if (!controls[key]) {
    throw new _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵRuntimeError"](1001 /* RuntimeErrorCode.MISSING_CONTROL */, typeof ngDevMode === 'undefined' || ngDevMode ? missingControlError(isGroup, key) : '');
  }
}
function assertAllValuesPresent(control, isGroup, value) {
  control._forEachChild((_, key) => {
    if (value[key] === undefined) {
      throw new _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵRuntimeError"](1002 /* RuntimeErrorCode.MISSING_CONTROL_VALUE */, typeof ngDevMode === 'undefined' || ngDevMode ? missingControlValueError(isGroup, key) : '');
    }
  });
}
// clang-format on
/**
 * This is the base class for `FormControl`, `FormGroup`, and `FormArray`.
 *
 * It provides some of the shared behavior that all controls and groups of controls have, like
 * running validators, calculating status, and resetting state. It also defines the properties
 * that are shared between all sub-classes, like `value`, `valid`, and `dirty`. It shouldn't be
 * instantiated directly.
 *
 * The first type parameter TValue represents the value type of the control (`control.value`).
 * The optional type parameter TRawValue  represents the raw value type (`control.getRawValue()`).
 *
 * @see [Forms Guide](/guide/forms)
 * @see [Reactive Forms Guide](/guide/reactive-forms)
 * @see [Dynamic Forms Guide](/guide/dynamic-form)
 *
 * @publicApi
 */
class AbstractControl {
  /**
   * Initialize the AbstractControl instance.
   *
   * @param validators The function or array of functions that is used to determine the validity of
   *     this control synchronously.
   * @param asyncValidators The function or array of functions that is used to determine validity of
   *     this control asynchronously.
   */
  constructor(validators, asyncValidators) {
    /** @internal */
    this._pendingDirty = false;
    /**
     * Indicates that a control has its own pending asynchronous validation in progress.
     *
     * @internal
     */
    this._hasOwnPendingAsyncValidator = false;
    /** @internal */
    this._pendingTouched = false;
    /** @internal */
    this._onCollectionChange = () => {};
    this._parent = null;
    /**
     * A control is `pristine` if the user has not yet changed
     * the value in the UI.
     *
     * @returns True if the user has not yet changed the value in the UI; compare `dirty`.
     * Programmatic changes to a control's value do not mark it dirty.
     */
    this.pristine = true;
    /**
     * True if the control is marked as `touched`.
     *
     * A control is marked `touched` once the user has triggered
     * a `blur` event on it.
     */
    this.touched = false;
    /** @internal */
    this._onDisabledChange = [];
    this._assignValidators(validators);
    this._assignAsyncValidators(asyncValidators);
  }
  /**
   * Returns the function that is used to determine the validity of this control synchronously.
   * If multiple validators have been added, this will be a single composed function.
   * See `Validators.compose()` for additional information.
   */
  get validator() {
    return this._composedValidatorFn;
  }
  set validator(validatorFn) {
    this._rawValidators = this._composedValidatorFn = validatorFn;
  }
  /**
   * Returns the function that is used to determine the validity of this control asynchronously.
   * If multiple validators have been added, this will be a single composed function.
   * See `Validators.compose()` for additional information.
   */
  get asyncValidator() {
    return this._composedAsyncValidatorFn;
  }
  set asyncValidator(asyncValidatorFn) {
    this._rawAsyncValidators = this._composedAsyncValidatorFn = asyncValidatorFn;
  }
  /**
   * The parent control.
   */
  get parent() {
    return this._parent;
  }
  /**
   * A control is `valid` when its `status` is `VALID`.
   *
   * @see {@link AbstractControl.status}
   *
   * @returns True if the control has passed all of its validation tests,
   * false otherwise.
   */
  get valid() {
    return this.status === VALID;
  }
  /**
   * A control is `invalid` when its `status` is `INVALID`.
   *
   * @see {@link AbstractControl.status}
   *
   * @returns True if this control has failed one or more of its validation checks,
   * false otherwise.
   */
  get invalid() {
    return this.status === INVALID;
  }
  /**
   * A control is `pending` when its `status` is `PENDING`.
   *
   * @see {@link AbstractControl.status}
   *
   * @returns True if this control is in the process of conducting a validation check,
   * false otherwise.
   */
  get pending() {
    return this.status == PENDING;
  }
  /**
   * A control is `disabled` when its `status` is `DISABLED`.
   *
   * Disabled controls are exempt from validation checks and
   * are not included in the aggregate value of their ancestor
   * controls.
   *
   * @see {@link AbstractControl.status}
   *
   * @returns True if the control is disabled, false otherwise.
   */
  get disabled() {
    return this.status === DISABLED;
  }
  /**
   * A control is `enabled` as long as its `status` is not `DISABLED`.
   *
   * @returns True if the control has any status other than 'DISABLED',
   * false if the status is 'DISABLED'.
   *
   * @see {@link AbstractControl.status}
   *
   */
  get enabled() {
    return this.status !== DISABLED;
  }
  /**
   * A control is `dirty` if the user has changed the value
   * in the UI.
   *
   * @returns True if the user has changed the value of this control in the UI; compare `pristine`.
   * Programmatic changes to a control's value do not mark it dirty.
   */
  get dirty() {
    return !this.pristine;
  }
  /**
   * True if the control has not been marked as touched
   *
   * A control is `untouched` if the user has not yet triggered
   * a `blur` event on it.
   */
  get untouched() {
    return !this.touched;
  }
  /**
   * Reports the update strategy of the `AbstractControl` (meaning
   * the event on which the control updates itself).
   * Possible values: `'change'` | `'blur'` | `'submit'`
   * Default value: `'change'`
   */
  get updateOn() {
    return this._updateOn ? this._updateOn : this.parent ? this.parent.updateOn : 'change';
  }
  /**
   * Sets the synchronous validators that are active on this control.  Calling
   * this overwrites any existing synchronous validators.
   *
   * When you add or remove a validator at run time, you must call
   * `updateValueAndValidity()` for the new validation to take effect.
   *
   * If you want to add a new validator without affecting existing ones, consider
   * using `addValidators()` method instead.
   */
  setValidators(validators) {
    this._assignValidators(validators);
  }
  /**
   * Sets the asynchronous validators that are active on this control. Calling this
   * overwrites any existing asynchronous validators.
   *
   * When you add or remove a validator at run time, you must call
   * `updateValueAndValidity()` for the new validation to take effect.
   *
   * If you want to add a new validator without affecting existing ones, consider
   * using `addAsyncValidators()` method instead.
   */
  setAsyncValidators(validators) {
    this._assignAsyncValidators(validators);
  }
  /**
   * Add a synchronous validator or validators to this control, without affecting other validators.
   *
   * When you add or remove a validator at run time, you must call
   * `updateValueAndValidity()` for the new validation to take effect.
   *
   * Adding a validator that already exists will have no effect. If duplicate validator functions
   * are present in the `validators` array, only the first instance would be added to a form
   * control.
   *
   * @param validators The new validator function or functions to add to this control.
   */
  addValidators(validators) {
    this.setValidators(addValidators(validators, this._rawValidators));
  }
  /**
   * Add an asynchronous validator or validators to this control, without affecting other
   * validators.
   *
   * When you add or remove a validator at run time, you must call
   * `updateValueAndValidity()` for the new validation to take effect.
   *
   * Adding a validator that already exists will have no effect.
   *
   * @param validators The new asynchronous validator function or functions to add to this control.
   */
  addAsyncValidators(validators) {
    this.setAsyncValidators(addValidators(validators, this._rawAsyncValidators));
  }
  /**
   * Remove a synchronous validator from this control, without affecting other validators.
   * Validators are compared by function reference; you must pass a reference to the exact same
   * validator function as the one that was originally set. If a provided validator is not found,
   * it is ignored.
   *
   * @usageNotes
   *
   * ### Reference to a ValidatorFn
   *
   * ```
   * // Reference to the RequiredValidator
   * const ctrl = new FormControl<string | null>('', Validators.required);
   * ctrl.removeValidators(Validators.required);
   *
   * // Reference to anonymous function inside MinValidator
   * const minValidator = Validators.min(3);
   * const ctrl = new FormControl<string | null>('', minValidator);
   * expect(ctrl.hasValidator(minValidator)).toEqual(true)
   * expect(ctrl.hasValidator(Validators.min(3))).toEqual(false)
   *
   * ctrl.removeValidators(minValidator);
   * ```
   *
   * When you add or remove a validator at run time, you must call
   * `updateValueAndValidity()` for the new validation to take effect.
   *
   * @param validators The validator or validators to remove.
   */
  removeValidators(validators) {
    this.setValidators(removeValidators(validators, this._rawValidators));
  }
  /**
   * Remove an asynchronous validator from this control, without affecting other validators.
   * Validators are compared by function reference; you must pass a reference to the exact same
   * validator function as the one that was originally set. If a provided validator is not found, it
   * is ignored.
   *
   * When you add or remove a validator at run time, you must call
   * `updateValueAndValidity()` for the new validation to take effect.
   *
   * @param validators The asynchronous validator or validators to remove.
   */
  removeAsyncValidators(validators) {
    this.setAsyncValidators(removeValidators(validators, this._rawAsyncValidators));
  }
  /**
   * Check whether a synchronous validator function is present on this control. The provided
   * validator must be a reference to the exact same function that was provided.
   *
   * @usageNotes
   *
   * ### Reference to a ValidatorFn
   *
   * ```
   * // Reference to the RequiredValidator
   * const ctrl = new FormControl<number | null>(0, Validators.required);
   * expect(ctrl.hasValidator(Validators.required)).toEqual(true)
   *
   * // Reference to anonymous function inside MinValidator
   * const minValidator = Validators.min(3);
   * const ctrl = new FormControl<number | null>(0, minValidator);
   * expect(ctrl.hasValidator(minValidator)).toEqual(true)
   * expect(ctrl.hasValidator(Validators.min(3))).toEqual(false)
   * ```
   *
   * @param validator The validator to check for presence. Compared by function reference.
   * @returns Whether the provided validator was found on this control.
   */
  hasValidator(validator) {
    return hasValidator(this._rawValidators, validator);
  }
  /**
   * Check whether an asynchronous validator function is present on this control. The provided
   * validator must be a reference to the exact same function that was provided.
   *
   * @param validator The asynchronous validator to check for presence. Compared by function
   *     reference.
   * @returns Whether the provided asynchronous validator was found on this control.
   */
  hasAsyncValidator(validator) {
    return hasValidator(this._rawAsyncValidators, validator);
  }
  /**
   * Empties out the synchronous validator list.
   *
   * When you add or remove a validator at run time, you must call
   * `updateValueAndValidity()` for the new validation to take effect.
   *
   */
  clearValidators() {
    this.validator = null;
  }
  /**
   * Empties out the async validator list.
   *
   * When you add or remove a validator at run time, you must call
   * `updateValueAndValidity()` for the new validation to take effect.
   *
   */
  clearAsyncValidators() {
    this.asyncValidator = null;
  }
  /**
   * Marks the control as `touched`. A control is touched by focus and
   * blur events that do not change the value.
   *
   * @see {@link markAsUntouched()}
   * @see {@link markAsDirty()}
   * @see {@link markAsPristine()}
   *
   * @param opts Configuration options that determine how the control propagates changes
   * and emits events after marking is applied.
   * * `onlySelf`: When true, mark only this control. When false or not supplied,
   * marks all direct ancestors. Default is false.
   */
  markAsTouched(opts = {}) {
    this.touched = true;
    if (this._parent && !opts.onlySelf) {
      this._parent.markAsTouched(opts);
    }
  }
  /**
   * Marks the control and all its descendant controls as `touched`.
   * @see {@link markAsTouched()}
   */
  markAllAsTouched() {
    this.markAsTouched({
      onlySelf: true
    });
    this._forEachChild(control => control.markAllAsTouched());
  }
  /**
   * Marks the control as `untouched`.
   *
   * If the control has any children, also marks all children as `untouched`
   * and recalculates the `touched` status of all parent controls.
   *
   * @see {@link markAsTouched()}
   * @see {@link markAsDirty()}
   * @see {@link markAsPristine()}
   *
   * @param opts Configuration options that determine how the control propagates changes
   * and emits events after the marking is applied.
   * * `onlySelf`: When true, mark only this control. When false or not supplied,
   * marks all direct ancestors. Default is false.
   */
  markAsUntouched(opts = {}) {
    this.touched = false;
    this._pendingTouched = false;
    this._forEachChild(control => {
      control.markAsUntouched({
        onlySelf: true
      });
    });
    if (this._parent && !opts.onlySelf) {
      this._parent._updateTouched(opts);
    }
  }
  /**
   * Marks the control as `dirty`. A control becomes dirty when
   * the control's value is changed through the UI; compare `markAsTouched`.
   *
   * @see {@link markAsTouched()}
   * @see {@link markAsUntouched()}
   * @see {@link markAsPristine()}
   *
   * @param opts Configuration options that determine how the control propagates changes
   * and emits events after marking is applied.
   * * `onlySelf`: When true, mark only this control. When false or not supplied,
   * marks all direct ancestors. Default is false.
   */
  markAsDirty(opts = {}) {
    this.pristine = false;
    if (this._parent && !opts.onlySelf) {
      this._parent.markAsDirty(opts);
    }
  }
  /**
   * Marks the control as `pristine`.
   *
   * If the control has any children, marks all children as `pristine`,
   * and recalculates the `pristine` status of all parent
   * controls.
   *
   * @see {@link markAsTouched()}
   * @see {@link markAsUntouched()}
   * @see {@link markAsDirty()}
   *
   * @param opts Configuration options that determine how the control emits events after
   * marking is applied.
   * * `onlySelf`: When true, mark only this control. When false or not supplied,
   * marks all direct ancestors. Default is false.
   */
  markAsPristine(opts = {}) {
    this.pristine = true;
    this._pendingDirty = false;
    this._forEachChild(control => {
      control.markAsPristine({
        onlySelf: true
      });
    });
    if (this._parent && !opts.onlySelf) {
      this._parent._updatePristine(opts);
    }
  }
  /**
   * Marks the control as `pending`.
   *
   * A control is pending while the control performs async validation.
   *
   * @see {@link AbstractControl.status}
   *
   * @param opts Configuration options that determine how the control propagates changes and
   * emits events after marking is applied.
   * * `onlySelf`: When true, mark only this control. When false or not supplied,
   * marks all direct ancestors. Default is false.
   * * `emitEvent`: When true or not supplied (the default), the `statusChanges`
   * observable emits an event with the latest status the control is marked pending.
   * When false, no events are emitted.
   *
   */
  markAsPending(opts = {}) {
    this.status = PENDING;
    if (opts.emitEvent !== false) {
      this.statusChanges.emit(this.status);
    }
    if (this._parent && !opts.onlySelf) {
      this._parent.markAsPending(opts);
    }
  }
  /**
   * Disables the control. This means the control is exempt from validation checks and
   * excluded from the aggregate value of any parent. Its status is `DISABLED`.
   *
   * If the control has children, all children are also disabled.
   *
   * @see {@link AbstractControl.status}
   *
   * @param opts Configuration options that determine how the control propagates
   * changes and emits events after the control is disabled.
   * * `onlySelf`: When true, mark only this control. When false or not supplied,
   * marks all direct ancestors. Default is false.
   * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
   * `valueChanges`
   * observables emit events with the latest status and value when the control is disabled.
   * When false, no events are emitted.
   */
  disable(opts = {}) {
    // If parent has been marked artificially dirty we don't want to re-calculate the
    // parent's dirtiness based on the children.
    const skipPristineCheck = this._parentMarkedDirty(opts.onlySelf);
    this.status = DISABLED;
    this.errors = null;
    this._forEachChild(control => {
      control.disable({
        ...opts,
        onlySelf: true
      });
    });
    this._updateValue();
    if (opts.emitEvent !== false) {
      this.valueChanges.emit(this.value);
      this.statusChanges.emit(this.status);
    }
    this._updateAncestors({
      ...opts,
      skipPristineCheck
    });
    this._onDisabledChange.forEach(changeFn => changeFn(true));
  }
  /**
   * Enables the control. This means the control is included in validation checks and
   * the aggregate value of its parent. Its status recalculates based on its value and
   * its validators.
   *
   * By default, if the control has children, all children are enabled.
   *
   * @see {@link AbstractControl.status}
   *
   * @param opts Configure options that control how the control propagates changes and
   * emits events when marked as untouched
   * * `onlySelf`: When true, mark only this control. When false or not supplied,
   * marks all direct ancestors. Default is false.
   * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
   * `valueChanges`
   * observables emit events with the latest status and value when the control is enabled.
   * When false, no events are emitted.
   */
  enable(opts = {}) {
    // If parent has been marked artificially dirty we don't want to re-calculate the
    // parent's dirtiness based on the children.
    const skipPristineCheck = this._parentMarkedDirty(opts.onlySelf);
    this.status = VALID;
    this._forEachChild(control => {
      control.enable({
        ...opts,
        onlySelf: true
      });
    });
    this.updateValueAndValidity({
      onlySelf: true,
      emitEvent: opts.emitEvent
    });
    this._updateAncestors({
      ...opts,
      skipPristineCheck
    });
    this._onDisabledChange.forEach(changeFn => changeFn(false));
  }
  _updateAncestors(opts) {
    if (this._parent && !opts.onlySelf) {
      this._parent.updateValueAndValidity(opts);
      if (!opts.skipPristineCheck) {
        this._parent._updatePristine();
      }
      this._parent._updateTouched();
    }
  }
  /**
   * Sets the parent of the control
   *
   * @param parent The new parent.
   */
  setParent(parent) {
    this._parent = parent;
  }
  /**
   * The raw value of this control. For most control implementations, the raw value will include
   * disabled children.
   */
  getRawValue() {
    return this.value;
  }
  /**
   * Recalculates the value and validation status of the control.
   *
   * By default, it also updates the value and validity of its ancestors.
   *
   * @param opts Configuration options determine how the control propagates changes and emits events
   * after updates and validity checks are applied.
   * * `onlySelf`: When true, only update this control. When false or not supplied,
   * update all direct ancestors. Default is false.
   * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
   * `valueChanges`
   * observables emit events with the latest status and value when the control is updated.
   * When false, no events are emitted.
   */
  updateValueAndValidity(opts = {}) {
    this._setInitialStatus();
    this._updateValue();
    if (this.enabled) {
      this._cancelExistingSubscription();
      this.errors = this._runValidator();
      this.status = this._calculateStatus();
      if (this.status === VALID || this.status === PENDING) {
        this._runAsyncValidator(opts.emitEvent);
      }
    }
    if (opts.emitEvent !== false) {
      this.valueChanges.emit(this.value);
      this.statusChanges.emit(this.status);
    }
    if (this._parent && !opts.onlySelf) {
      this._parent.updateValueAndValidity(opts);
    }
  }
  /** @internal */
  _updateTreeValidity(opts = {
    emitEvent: true
  }) {
    this._forEachChild(ctrl => ctrl._updateTreeValidity(opts));
    this.updateValueAndValidity({
      onlySelf: true,
      emitEvent: opts.emitEvent
    });
  }
  _setInitialStatus() {
    this.status = this._allControlsDisabled() ? DISABLED : VALID;
  }
  _runValidator() {
    return this.validator ? this.validator(this) : null;
  }
  _runAsyncValidator(emitEvent) {
    if (this.asyncValidator) {
      this.status = PENDING;
      this._hasOwnPendingAsyncValidator = true;
      const obs = toObservable(this.asyncValidator(this));
      this._asyncValidationSubscription = obs.subscribe(errors => {
        this._hasOwnPendingAsyncValidator = false;
        // This will trigger the recalculation of the validation status, which depends on
        // the state of the asynchronous validation (whether it is in progress or not). So, it is
        // necessary that we have updated the `_hasOwnPendingAsyncValidator` boolean flag first.
        this.setErrors(errors, {
          emitEvent
        });
      });
    }
  }
  _cancelExistingSubscription() {
    if (this._asyncValidationSubscription) {
      this._asyncValidationSubscription.unsubscribe();
      this._hasOwnPendingAsyncValidator = false;
    }
  }
  /**
   * Sets errors on a form control when running validations manually, rather than automatically.
   *
   * Calling `setErrors` also updates the validity of the parent control.
   *
   * @param opts Configuration options that determine how the control propagates
   * changes and emits events after the control errors are set.
   * * `emitEvent`: When true or not supplied (the default), the `statusChanges`
   * observable emits an event after the errors are set.
   *
   * @usageNotes
   *
   * ### Manually set the errors for a control
   *
   * ```
   * const login = new FormControl('someLogin');
   * login.setErrors({
   *   notUnique: true
   * });
   *
   * expect(login.valid).toEqual(false);
   * expect(login.errors).toEqual({ notUnique: true });
   *
   * login.setValue('someOtherLogin');
   *
   * expect(login.valid).toEqual(true);
   * ```
   */
  setErrors(errors, opts = {}) {
    this.errors = errors;
    this._updateControlsErrors(opts.emitEvent !== false);
  }
  /**
   * Retrieves a child control given the control's name or path.
   *
   * @param path A dot-delimited string or array of string/number values that define the path to the
   * control. If a string is provided, passing it as a string literal will result in improved type
   * information. Likewise, if an array is provided, passing it `as const` will cause improved type
   * information to be available.
   *
   * @usageNotes
   * ### Retrieve a nested control
   *
   * For example, to get a `name` control nested within a `person` sub-group:
   *
   * * `this.form.get('person.name');`
   *
   * -OR-
   *
   * * `this.form.get(['person', 'name'] as const);` // `as const` gives improved typings
   *
   * ### Retrieve a control in a FormArray
   *
   * When accessing an element inside a FormArray, you can use an element index.
   * For example, to get a `price` control from the first element in an `items` array you can use:
   *
   * * `this.form.get('items.0.price');`
   *
   * -OR-
   *
   * * `this.form.get(['items', 0, 'price']);`
   */
  get(path) {
    let currPath = path;
    if (currPath == null) return null;
    if (!Array.isArray(currPath)) currPath = currPath.split('.');
    if (currPath.length === 0) return null;
    return currPath.reduce((control, name) => control && control._find(name), this);
  }
  /**
   * @description
   * Reports error data for the control with the given path.
   *
   * @param errorCode The code of the error to check
   * @param path A list of control names that designates how to move from the current control
   * to the control that should be queried for errors.
   *
   * @usageNotes
   * For example, for the following `FormGroup`:
   *
   * ```
   * form = new FormGroup({
   *   address: new FormGroup({ street: new FormControl() })
   * });
   * ```
   *
   * The path to the 'street' control from the root form would be 'address' -> 'street'.
   *
   * It can be provided to this method in one of two formats:
   *
   * 1. An array of string control names, e.g. `['address', 'street']`
   * 1. A period-delimited list of control names in one string, e.g. `'address.street'`
   *
   * @returns error data for that particular error. If the control or error is not present,
   * null is returned.
   */
  getError(errorCode, path) {
    const control = path ? this.get(path) : this;
    return control && control.errors ? control.errors[errorCode] : null;
  }
  /**
   * @description
   * Reports whether the control with the given path has the error specified.
   *
   * @param errorCode The code of the error to check
   * @param path A list of control names that designates how to move from the current control
   * to the control that should be queried for errors.
   *
   * @usageNotes
   * For example, for the following `FormGroup`:
   *
   * ```
   * form = new FormGroup({
   *   address: new FormGroup({ street: new FormControl() })
   * });
   * ```
   *
   * The path to the 'street' control from the root form would be 'address' -> 'street'.
   *
   * It can be provided to this method in one of two formats:
   *
   * 1. An array of string control names, e.g. `['address', 'street']`
   * 1. A period-delimited list of control names in one string, e.g. `'address.street'`
   *
   * If no path is given, this method checks for the error on the current control.
   *
   * @returns whether the given error is present in the control at the given path.
   *
   * If the control is not present, false is returned.
   */
  hasError(errorCode, path) {
    return !!this.getError(errorCode, path);
  }
  /**
   * Retrieves the top-level ancestor of this control.
   */
  get root() {
    let x = this;
    while (x._parent) {
      x = x._parent;
    }
    return x;
  }
  /** @internal */
  _updateControlsErrors(emitEvent) {
    this.status = this._calculateStatus();
    if (emitEvent) {
      this.statusChanges.emit(this.status);
    }
    if (this._parent) {
      this._parent._updateControlsErrors(emitEvent);
    }
  }
  /** @internal */
  _initObservables() {
    this.valueChanges = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this.statusChanges = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
  }
  _calculateStatus() {
    if (this._allControlsDisabled()) return DISABLED;
    if (this.errors) return INVALID;
    if (this._hasOwnPendingAsyncValidator || this._anyControlsHaveStatus(PENDING)) return PENDING;
    if (this._anyControlsHaveStatus(INVALID)) return INVALID;
    return VALID;
  }
  /** @internal */
  _anyControlsHaveStatus(status) {
    return this._anyControls(control => control.status === status);
  }
  /** @internal */
  _anyControlsDirty() {
    return this._anyControls(control => control.dirty);
  }
  /** @internal */
  _anyControlsTouched() {
    return this._anyControls(control => control.touched);
  }
  /** @internal */
  _updatePristine(opts = {}) {
    this.pristine = !this._anyControlsDirty();
    if (this._parent && !opts.onlySelf) {
      this._parent._updatePristine(opts);
    }
  }
  /** @internal */
  _updateTouched(opts = {}) {
    this.touched = this._anyControlsTouched();
    if (this._parent && !opts.onlySelf) {
      this._parent._updateTouched(opts);
    }
  }
  /** @internal */
  _registerOnCollectionChange(fn) {
    this._onCollectionChange = fn;
  }
  /** @internal */
  _setUpdateStrategy(opts) {
    if (isOptionsObj(opts) && opts.updateOn != null) {
      this._updateOn = opts.updateOn;
    }
  }
  /**
   * Check to see if parent has been marked artificially dirty.
   *
   * @internal
   */
  _parentMarkedDirty(onlySelf) {
    const parentDirty = this._parent && this._parent.dirty;
    return !onlySelf && !!parentDirty && !this._parent._anyControlsDirty();
  }
  /** @internal */
  _find(name) {
    return null;
  }
  /**
   * Internal implementation of the `setValidators` method. Needs to be separated out into a
   * different method, because it is called in the constructor and it can break cases where
   * a control is extended.
   */
  _assignValidators(validators) {
    this._rawValidators = Array.isArray(validators) ? validators.slice() : validators;
    this._composedValidatorFn = coerceToValidator(this._rawValidators);
  }
  /**
   * Internal implementation of the `setAsyncValidators` method. Needs to be separated out into a
   * different method, because it is called in the constructor and it can break cases where
   * a control is extended.
   */
  _assignAsyncValidators(validators) {
    this._rawAsyncValidators = Array.isArray(validators) ? validators.slice() : validators;
    this._composedAsyncValidatorFn = coerceToAsyncValidator(this._rawAsyncValidators);
  }
}

/**
 * Tracks the value and validity state of a group of `FormControl` instances.
 *
 * A `FormGroup` aggregates the values of each child `FormControl` into one object,
 * with each control name as the key.  It calculates its status by reducing the status values
 * of its children. For example, if one of the controls in a group is invalid, the entire
 * group becomes invalid.
 *
 * `FormGroup` is one of the four fundamental building blocks used to define forms in Angular,
 * along with `FormControl`, `FormArray`, and `FormRecord`.
 *
 * When instantiating a `FormGroup`, pass in a collection of child controls as the first
 * argument. The key for each child registers the name for the control.
 *
 * `FormGroup` is intended for use cases where the keys are known ahead of time.
 * If you need to dynamically add and remove controls, use {@link FormRecord} instead.
 *
 * `FormGroup` accepts an optional type parameter `TControl`, which is an object type with inner
 * control types as values.
 *
 * @usageNotes
 *
 * ### Create a form group with 2 controls
 *
 * ```
 * const form = new FormGroup({
 *   first: new FormControl('Nancy', Validators.minLength(2)),
 *   last: new FormControl('Drew'),
 * });
 *
 * console.log(form.value);   // {first: 'Nancy', last; 'Drew'}
 * console.log(form.status);  // 'VALID'
 * ```
 *
 * ### The type argument, and optional controls
 *
 * `FormGroup` accepts one generic argument, which is an object containing its inner controls.
 * This type will usually be inferred automatically, but you can always specify it explicitly if you
 * wish.
 *
 * If you have controls that are optional (i.e. they can be removed, you can use the `?` in the
 * type):
 *
 * ```
 * const form = new FormGroup<{
 *   first: FormControl<string|null>,
 *   middle?: FormControl<string|null>, // Middle name is optional.
 *   last: FormControl<string|null>,
 * }>({
 *   first: new FormControl('Nancy'),
 *   last: new FormControl('Drew'),
 * });
 * ```
 *
 * ### Create a form group with a group-level validator
 *
 * You include group-level validators as the second arg, or group-level async
 * validators as the third arg. These come in handy when you want to perform validation
 * that considers the value of more than one child control.
 *
 * ```
 * const form = new FormGroup({
 *   password: new FormControl('', Validators.minLength(2)),
 *   passwordConfirm: new FormControl('', Validators.minLength(2)),
 * }, passwordMatchValidator);
 *
 *
 * function passwordMatchValidator(g: FormGroup) {
 *    return g.get('password').value === g.get('passwordConfirm').value
 *       ? null : {'mismatch': true};
 * }
 * ```
 *
 * Like `FormControl` instances, you choose to pass in
 * validators and async validators as part of an options object.
 *
 * ```
 * const form = new FormGroup({
 *   password: new FormControl('')
 *   passwordConfirm: new FormControl('')
 * }, { validators: passwordMatchValidator, asyncValidators: otherValidator });
 * ```
 *
 * ### Set the updateOn property for all controls in a form group
 *
 * The options object is used to set a default value for each child
 * control's `updateOn` property. If you set `updateOn` to `'blur'` at the
 * group level, all child controls default to 'blur', unless the child
 * has explicitly specified a different `updateOn` value.
 *
 * ```ts
 * const c = new FormGroup({
 *   one: new FormControl()
 * }, { updateOn: 'blur' });
 * ```
 *
 * ### Using a FormGroup with optional controls
 *
 * It is possible to have optional controls in a FormGroup. An optional control can be removed later
 * using `removeControl`, and can be omitted when calling `reset`. Optional controls must be
 * declared optional in the group's type.
 *
 * ```ts
 * const c = new FormGroup<{one?: FormControl<string>}>({
 *   one: new FormControl('')
 * });
 * ```
 *
 * Notice that `c.value.one` has type `string|null|undefined`. This is because calling `c.reset({})`
 * without providing the optional key `one` will cause it to become `null`.
 *
 * @publicApi
 */
class FormGroup extends AbstractControl {
  /**
   * Creates a new `FormGroup` instance.
   *
   * @param controls A collection of child controls. The key for each child is the name
   * under which it is registered.
   *
   * @param validatorOrOpts A synchronous validator function, or an array of
   * such functions, or an `AbstractControlOptions` object that contains validation functions
   * and a validation trigger.
   *
   * @param asyncValidator A single async validator or array of async validator functions
   *
   */
  constructor(controls, validatorOrOpts, asyncValidator) {
    super(pickValidators(validatorOrOpts), pickAsyncValidators(asyncValidator, validatorOrOpts));
    this.controls = controls;
    this._initObservables();
    this._setUpdateStrategy(validatorOrOpts);
    this._setUpControls();
    this.updateValueAndValidity({
      onlySelf: true,
      // If `asyncValidator` is present, it will trigger control status change from `PENDING` to
      // `VALID` or `INVALID`. The status should be broadcasted via the `statusChanges` observable,
      // so we set `emitEvent` to `true` to allow that during the control creation process.
      emitEvent: !!this.asyncValidator
    });
  }
  registerControl(name, control) {
    if (this.controls[name]) return this.controls[name];
    this.controls[name] = control;
    control.setParent(this);
    control._registerOnCollectionChange(this._onCollectionChange);
    return control;
  }
  addControl(name, control, options = {}) {
    this.registerControl(name, control);
    this.updateValueAndValidity({
      emitEvent: options.emitEvent
    });
    this._onCollectionChange();
  }
  /**
   * Remove a control from this group. In a strongly-typed group, required controls cannot be
   * removed.
   *
   * This method also updates the value and validity of the control.
   *
   * @param name The control name to remove from the collection
   * @param options Specifies whether this FormGroup instance should emit events after a
   *     control is removed.
   * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
   * `valueChanges` observables emit events with the latest status and value when the control is
   * removed. When false, no events are emitted.
   */
  removeControl(name, options = {}) {
    if (this.controls[name]) this.controls[name]._registerOnCollectionChange(() => {});
    delete this.controls[name];
    this.updateValueAndValidity({
      emitEvent: options.emitEvent
    });
    this._onCollectionChange();
  }
  setControl(name, control, options = {}) {
    if (this.controls[name]) this.controls[name]._registerOnCollectionChange(() => {});
    delete this.controls[name];
    if (control) this.registerControl(name, control);
    this.updateValueAndValidity({
      emitEvent: options.emitEvent
    });
    this._onCollectionChange();
  }
  contains(controlName) {
    return this.controls.hasOwnProperty(controlName) && this.controls[controlName].enabled;
  }
  /**
   * Sets the value of the `FormGroup`. It accepts an object that matches
   * the structure of the group, with control names as keys.
   *
   * @usageNotes
   * ### Set the complete value for the form group
   *
   * ```
   * const form = new FormGroup({
   *   first: new FormControl(),
   *   last: new FormControl()
   * });
   *
   * console.log(form.value);   // {first: null, last: null}
   *
   * form.setValue({first: 'Nancy', last: 'Drew'});
   * console.log(form.value);   // {first: 'Nancy', last: 'Drew'}
   * ```
   *
   * @throws When strict checks fail, such as setting the value of a control
   * that doesn't exist or if you exclude a value of a control that does exist.
   *
   * @param value The new value for the control that matches the structure of the group.
   * @param options Configuration options that determine how the control propagates changes
   * and emits events after the value changes.
   * The configuration options are passed to the {@link AbstractControl#updateValueAndValidity
   * updateValueAndValidity} method.
   *
   * * `onlySelf`: When true, each change only affects this control, and not its parent. Default is
   * false.
   * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
   * `valueChanges`
   * observables emit events with the latest status and value when the control value is updated.
   * When false, no events are emitted.
   */
  setValue(value, options = {}) {
    assertAllValuesPresent(this, true, value);
    Object.keys(value).forEach(name => {
      assertControlPresent(this, true, name);
      this.controls[name].setValue(value[name], {
        onlySelf: true,
        emitEvent: options.emitEvent
      });
    });
    this.updateValueAndValidity(options);
  }
  /**
   * Patches the value of the `FormGroup`. It accepts an object with control
   * names as keys, and does its best to match the values to the correct controls
   * in the group.
   *
   * It accepts both super-sets and sub-sets of the group without throwing an error.
   *
   * @usageNotes
   * ### Patch the value for a form group
   *
   * ```
   * const form = new FormGroup({
   *    first: new FormControl(),
   *    last: new FormControl()
   * });
   * console.log(form.value);   // {first: null, last: null}
   *
   * form.patchValue({first: 'Nancy'});
   * console.log(form.value);   // {first: 'Nancy', last: null}
   * ```
   *
   * @param value The object that matches the structure of the group.
   * @param options Configuration options that determine how the control propagates changes and
   * emits events after the value is patched.
   * * `onlySelf`: When true, each change only affects this control and not its parent. Default is
   * true.
   * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
   * `valueChanges` observables emit events with the latest status and value when the control value
   * is updated. When false, no events are emitted. The configuration options are passed to
   * the {@link AbstractControl#updateValueAndValidity updateValueAndValidity} method.
   */
  patchValue(value, options = {}) {
    // Even though the `value` argument type doesn't allow `null` and `undefined` values, the
    // `patchValue` can be called recursively and inner data structures might have these values, so
    // we just ignore such cases when a field containing FormGroup instance receives `null` or
    // `undefined` as a value.
    if (value == null /* both `null` and `undefined` */) return;
    Object.keys(value).forEach(name => {
      // The compiler cannot see through the uninstantiated conditional type of `this.controls`, so
      // `as any` is required.
      const control = this.controls[name];
      if (control) {
        control.patchValue( /* Guaranteed to be present, due to the outer forEach. */value[name], {
          onlySelf: true,
          emitEvent: options.emitEvent
        });
      }
    });
    this.updateValueAndValidity(options);
  }
  /**
   * Resets the `FormGroup`, marks all descendants `pristine` and `untouched` and sets
   * the value of all descendants to their default values, or null if no defaults were provided.
   *
   * You reset to a specific form state by passing in a map of states
   * that matches the structure of your form, with control names as keys. The state
   * is a standalone value or a form state object with both a value and a disabled
   * status.
   *
   * @param value Resets the control with an initial value,
   * or an object that defines the initial value and disabled state.
   *
   * @param options Configuration options that determine how the control propagates changes
   * and emits events when the group is reset.
   * * `onlySelf`: When true, each change only affects this control, and not its parent. Default is
   * false.
   * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
   * `valueChanges`
   * observables emit events with the latest status and value when the control is reset.
   * When false, no events are emitted.
   * The configuration options are passed to the {@link AbstractControl#updateValueAndValidity
   * updateValueAndValidity} method.
   *
   * @usageNotes
   *
   * ### Reset the form group values
   *
   * ```ts
   * const form = new FormGroup({
   *   first: new FormControl('first name'),
   *   last: new FormControl('last name')
   * });
   *
   * console.log(form.value);  // {first: 'first name', last: 'last name'}
   *
   * form.reset({ first: 'name', last: 'last name' });
   *
   * console.log(form.value);  // {first: 'name', last: 'last name'}
   * ```
   *
   * ### Reset the form group values and disabled status
   *
   * ```
   * const form = new FormGroup({
   *   first: new FormControl('first name'),
   *   last: new FormControl('last name')
   * });
   *
   * form.reset({
   *   first: {value: 'name', disabled: true},
   *   last: 'last'
   * });
   *
   * console.log(form.value);  // {last: 'last'}
   * console.log(form.get('first').status);  // 'DISABLED'
   * ```
   */
  reset(value = {}, options = {}) {
    this._forEachChild((control, name) => {
      control.reset(value[name], {
        onlySelf: true,
        emitEvent: options.emitEvent
      });
    });
    this._updatePristine(options);
    this._updateTouched(options);
    this.updateValueAndValidity(options);
  }
  /**
   * The aggregate value of the `FormGroup`, including any disabled controls.
   *
   * Retrieves all values regardless of disabled status.
   */
  getRawValue() {
    return this._reduceChildren({}, (acc, control, name) => {
      acc[name] = control.getRawValue();
      return acc;
    });
  }
  /** @internal */
  _syncPendingControls() {
    let subtreeUpdated = this._reduceChildren(false, (updated, child) => {
      return child._syncPendingControls() ? true : updated;
    });
    if (subtreeUpdated) this.updateValueAndValidity({
      onlySelf: true
    });
    return subtreeUpdated;
  }
  /** @internal */
  _forEachChild(cb) {
    Object.keys(this.controls).forEach(key => {
      // The list of controls can change (for ex. controls might be removed) while the loop
      // is running (as a result of invoking Forms API in `valueChanges` subscription), so we
      // have to null check before invoking the callback.
      const control = this.controls[key];
      control && cb(control, key);
    });
  }
  /** @internal */
  _setUpControls() {
    this._forEachChild(control => {
      control.setParent(this);
      control._registerOnCollectionChange(this._onCollectionChange);
    });
  }
  /** @internal */
  _updateValue() {
    this.value = this._reduceValue();
  }
  /** @internal */
  _anyControls(condition) {
    for (const [controlName, control] of Object.entries(this.controls)) {
      if (this.contains(controlName) && condition(control)) {
        return true;
      }
    }
    return false;
  }
  /** @internal */
  _reduceValue() {
    let acc = {};
    return this._reduceChildren(acc, (acc, control, name) => {
      if (control.enabled || this.disabled) {
        acc[name] = control.value;
      }
      return acc;
    });
  }
  /** @internal */
  _reduceChildren(initValue, fn) {
    let res = initValue;
    this._forEachChild((control, name) => {
      res = fn(res, control, name);
    });
    return res;
  }
  /** @internal */
  _allControlsDisabled() {
    for (const controlName of Object.keys(this.controls)) {
      if (this.controls[controlName].enabled) {
        return false;
      }
    }
    return Object.keys(this.controls).length > 0 || this.disabled;
  }
  /** @internal */
  _find(name) {
    return this.controls.hasOwnProperty(name) ? this.controls[name] : null;
  }
}
const UntypedFormGroup = FormGroup;
/**
 * @description
 * Asserts that the given control is an instance of `FormGroup`
 *
 * @publicApi
 */
const isFormGroup = control => control instanceof FormGroup;
/**
 * Tracks the value and validity state of a collection of `FormControl` instances, each of which has
 * the same value type.
 *
 * `FormRecord` is very similar to {@link FormGroup}, except it can be used with a dynamic keys,
 * with controls added and removed as needed.
 *
 * `FormRecord` accepts one generic argument, which describes the type of the controls it contains.
 *
 * @usageNotes
 *
 * ```
 * let numbers = new FormRecord({bill: new FormControl('415-123-456')});
 * numbers.addControl('bob', new FormControl('415-234-567'));
 * numbers.removeControl('bill');
 * ```
 *
 * @publicApi
 */
class FormRecord extends FormGroup {}
/**
 * @description
 * Asserts that the given control is an instance of `FormRecord`
 *
 * @publicApi
 */
const isFormRecord = control => control instanceof FormRecord;

/**
 * Token to provide to allow SetDisabledState to always be called when a CVA is added, regardless of
 * whether the control is disabled or enabled.
 *
 * @see {@link FormsModule#withconfig}
 */
const CALL_SET_DISABLED_STATE = /*#__PURE__*/new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken('CallSetDisabledState', {
  providedIn: 'root',
  factory: () => setDisabledStateDefault
});
/**
 * Whether to use the fixed setDisabledState behavior by default.
 */
const setDisabledStateDefault = 'always';
function controlPath(name, parent) {
  return [...parent.path, name];
}
/**
 * Links a Form control and a Form directive by setting up callbacks (such as `onChange`) on both
 * instances. This function is typically invoked when form directive is being initialized.
 *
 * @param control Form control instance that should be linked.
 * @param dir Directive that should be linked with a given control.
 */
function setUpControl(control, dir, callSetDisabledState = setDisabledStateDefault) {
  if (typeof ngDevMode === 'undefined' || ngDevMode) {
    if (!control) _throwError(dir, 'Cannot find control with');
    if (!dir.valueAccessor) _throwMissingValueAccessorError(dir);
  }
  setUpValidators(control, dir);
  dir.valueAccessor.writeValue(control.value);
  // The legacy behavior only calls the CVA's `setDisabledState` if the control is disabled.
  // If the `callSetDisabledState` option is set to `always`, then this bug is fixed and
  // the method is always called.
  if (control.disabled || callSetDisabledState === 'always') {
    dir.valueAccessor.setDisabledState?.(control.disabled);
  }
  setUpViewChangePipeline(control, dir);
  setUpModelChangePipeline(control, dir);
  setUpBlurPipeline(control, dir);
  setUpDisabledChangeHandler(control, dir);
}
/**
 * Reverts configuration performed by the `setUpControl` control function.
 * Effectively disconnects form control with a given form directive.
 * This function is typically invoked when corresponding form directive is being destroyed.
 *
 * @param control Form control which should be cleaned up.
 * @param dir Directive that should be disconnected from a given control.
 * @param validateControlPresenceOnChange Flag that indicates whether onChange handler should
 *     contain asserts to verify that it's not called once directive is destroyed. We need this flag
 *     to avoid potentially breaking changes caused by better control cleanup introduced in #39235.
 */
function cleanUpControl(control, dir, validateControlPresenceOnChange = true) {
  const noop = () => {
    if (validateControlPresenceOnChange && (typeof ngDevMode === 'undefined' || ngDevMode)) {
      _noControlError(dir);
    }
  };
  // The `valueAccessor` field is typically defined on FromControl and FormControlName directive
  // instances and there is a logic in `selectValueAccessor` function that throws if it's not the
  // case. We still check the presence of `valueAccessor` before invoking its methods to make sure
  // that cleanup works correctly if app code or tests are setup to ignore the error thrown from
  // `selectValueAccessor`. See https://github.com/angular/angular/issues/40521.
  if (dir.valueAccessor) {
    dir.valueAccessor.registerOnChange(noop);
    dir.valueAccessor.registerOnTouched(noop);
  }
  cleanUpValidators(control, dir);
  if (control) {
    dir._invokeOnDestroyCallbacks();
    control._registerOnCollectionChange(() => {});
  }
}
function registerOnValidatorChange(validators, onChange) {
  validators.forEach(validator => {
    if (validator.registerOnValidatorChange) validator.registerOnValidatorChange(onChange);
  });
}
/**
 * Sets up disabled change handler function on a given form control if ControlValueAccessor
 * associated with a given directive instance supports the `setDisabledState` call.
 *
 * @param control Form control where disabled change handler should be setup.
 * @param dir Corresponding directive instance associated with this control.
 */
function setUpDisabledChangeHandler(control, dir) {
  if (dir.valueAccessor.setDisabledState) {
    const onDisabledChange = isDisabled => {
      dir.valueAccessor.setDisabledState(isDisabled);
    };
    control.registerOnDisabledChange(onDisabledChange);
    // Register a callback function to cleanup disabled change handler
    // from a control instance when a directive is destroyed.
    dir._registerOnDestroy(() => {
      control._unregisterOnDisabledChange(onDisabledChange);
    });
  }
}
/**
 * Sets up sync and async directive validators on provided form control.
 * This function merges validators from the directive into the validators of the control.
 *
 * @param control Form control where directive validators should be setup.
 * @param dir Directive instance that contains validators to be setup.
 */
function setUpValidators(control, dir) {
  const validators = getControlValidators(control);
  if (dir.validator !== null) {
    control.setValidators(mergeValidators(validators, dir.validator));
  } else if (typeof validators === 'function') {
    // If sync validators are represented by a single validator function, we force the
    // `Validators.compose` call to happen by executing the `setValidators` function with
    // an array that contains that function. We need this to avoid possible discrepancies in
    // validators behavior, so sync validators are always processed by the `Validators.compose`.
    // Note: we should consider moving this logic inside the `setValidators` function itself, so we
    // have consistent behavior on AbstractControl API level. The same applies to the async
    // validators logic below.
    control.setValidators([validators]);
  }
  const asyncValidators = getControlAsyncValidators(control);
  if (dir.asyncValidator !== null) {
    control.setAsyncValidators(mergeValidators(asyncValidators, dir.asyncValidator));
  } else if (typeof asyncValidators === 'function') {
    control.setAsyncValidators([asyncValidators]);
  }
  // Re-run validation when validator binding changes, e.g. minlength=3 -> minlength=4
  const onValidatorChange = () => control.updateValueAndValidity();
  registerOnValidatorChange(dir._rawValidators, onValidatorChange);
  registerOnValidatorChange(dir._rawAsyncValidators, onValidatorChange);
}
/**
 * Cleans up sync and async directive validators on provided form control.
 * This function reverts the setup performed by the `setUpValidators` function, i.e.
 * removes directive-specific validators from a given control instance.
 *
 * @param control Form control from where directive validators should be removed.
 * @param dir Directive instance that contains validators to be removed.
 * @returns true if a control was updated as a result of this action.
 */
function cleanUpValidators(control, dir) {
  let isControlUpdated = false;
  if (control !== null) {
    if (dir.validator !== null) {
      const validators = getControlValidators(control);
      if (Array.isArray(validators) && validators.length > 0) {
        // Filter out directive validator function.
        const updatedValidators = validators.filter(validator => validator !== dir.validator);
        if (updatedValidators.length !== validators.length) {
          isControlUpdated = true;
          control.setValidators(updatedValidators);
        }
      }
    }
    if (dir.asyncValidator !== null) {
      const asyncValidators = getControlAsyncValidators(control);
      if (Array.isArray(asyncValidators) && asyncValidators.length > 0) {
        // Filter out directive async validator function.
        const updatedAsyncValidators = asyncValidators.filter(asyncValidator => asyncValidator !== dir.asyncValidator);
        if (updatedAsyncValidators.length !== asyncValidators.length) {
          isControlUpdated = true;
          control.setAsyncValidators(updatedAsyncValidators);
        }
      }
    }
  }
  // Clear onValidatorChange callbacks by providing a noop function.
  const noop = () => {};
  registerOnValidatorChange(dir._rawValidators, noop);
  registerOnValidatorChange(dir._rawAsyncValidators, noop);
  return isControlUpdated;
}
function setUpViewChangePipeline(control, dir) {
  dir.valueAccessor.registerOnChange(newValue => {
    control._pendingValue = newValue;
    control._pendingChange = true;
    control._pendingDirty = true;
    if (control.updateOn === 'change') updateControl(control, dir);
  });
}
function setUpBlurPipeline(control, dir) {
  dir.valueAccessor.registerOnTouched(() => {
    control._pendingTouched = true;
    if (control.updateOn === 'blur' && control._pendingChange) updateControl(control, dir);
    if (control.updateOn !== 'submit') control.markAsTouched();
  });
}
function updateControl(control, dir) {
  if (control._pendingDirty) control.markAsDirty();
  control.setValue(control._pendingValue, {
    emitModelToViewChange: false
  });
  dir.viewToModelUpdate(control._pendingValue);
  control._pendingChange = false;
}
function setUpModelChangePipeline(control, dir) {
  const onChange = (newValue, emitModelEvent) => {
    // control -> view
    dir.valueAccessor.writeValue(newValue);
    // control -> ngModel
    if (emitModelEvent) dir.viewToModelUpdate(newValue);
  };
  control.registerOnChange(onChange);
  // Register a callback function to cleanup onChange handler
  // from a control instance when a directive is destroyed.
  dir._registerOnDestroy(() => {
    control._unregisterOnChange(onChange);
  });
}
/**
 * Links a FormGroup or FormArray instance and corresponding Form directive by setting up validators
 * present in the view.
 *
 * @param control FormGroup or FormArray instance that should be linked.
 * @param dir Directive that provides view validators.
 */
function setUpFormContainer(control, dir) {
  if (control == null && (typeof ngDevMode === 'undefined' || ngDevMode)) _throwError(dir, 'Cannot find control with');
  setUpValidators(control, dir);
}
/**
 * Reverts the setup performed by the `setUpFormContainer` function.
 *
 * @param control FormGroup or FormArray instance that should be cleaned up.
 * @param dir Directive that provided view validators.
 * @returns true if a control was updated as a result of this action.
 */
function cleanUpFormContainer(control, dir) {
  return cleanUpValidators(control, dir);
}
function _noControlError(dir) {
  return _throwError(dir, 'There is no FormControl instance attached to form control element with');
}
function _throwError(dir, message) {
  const messageEnd = _describeControlLocation(dir);
  throw new Error(`${message} ${messageEnd}`);
}
function _describeControlLocation(dir) {
  const path = dir.path;
  if (path && path.length > 1) return `path: '${path.join(' -> ')}'`;
  if (path?.[0]) return `name: '${path}'`;
  return 'unspecified name attribute';
}
function _throwMissingValueAccessorError(dir) {
  const loc = _describeControlLocation(dir);
  throw new _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵRuntimeError"](-1203 /* RuntimeErrorCode.NG_MISSING_VALUE_ACCESSOR */, `No value accessor for form control ${loc}.`);
}
function _throwInvalidValueAccessorError(dir) {
  const loc = _describeControlLocation(dir);
  throw new _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵRuntimeError"](1200 /* RuntimeErrorCode.NG_VALUE_ACCESSOR_NOT_PROVIDED */, `Value accessor was not provided as an array for form control with ${loc}. ` + `Check that the \`NG_VALUE_ACCESSOR\` token is configured as a \`multi: true\` provider.`);
}
function isPropertyUpdated(changes, viewModel) {
  if (!changes.hasOwnProperty('model')) return false;
  const change = changes['model'];
  if (change.isFirstChange()) return true;
  return !Object.is(viewModel, change.currentValue);
}
function isBuiltInAccessor(valueAccessor) {
  // Check if a given value accessor is an instance of a class that directly extends
  // `BuiltInControlValueAccessor` one.
  return Object.getPrototypeOf(valueAccessor.constructor) === BuiltInControlValueAccessor;
}
function syncPendingControls(form, directives) {
  form._syncPendingControls();
  directives.forEach(dir => {
    const control = dir.control;
    if (control.updateOn === 'submit' && control._pendingChange) {
      dir.viewToModelUpdate(control._pendingValue);
      control._pendingChange = false;
    }
  });
}
// TODO: vsavkin remove it once https://github.com/angular/angular/issues/3011 is implemented
function selectValueAccessor(dir, valueAccessors) {
  if (!valueAccessors) return null;
  if (!Array.isArray(valueAccessors) && (typeof ngDevMode === 'undefined' || ngDevMode)) _throwInvalidValueAccessorError(dir);
  let defaultAccessor = undefined;
  let builtinAccessor = undefined;
  let customAccessor = undefined;
  valueAccessors.forEach(v => {
    if (v.constructor === DefaultValueAccessor) {
      defaultAccessor = v;
    } else if (isBuiltInAccessor(v)) {
      if (builtinAccessor && (typeof ngDevMode === 'undefined' || ngDevMode)) _throwError(dir, 'More than one built-in value accessor matches form control with');
      builtinAccessor = v;
    } else {
      if (customAccessor && (typeof ngDevMode === 'undefined' || ngDevMode)) _throwError(dir, 'More than one custom value accessor matches form control with');
      customAccessor = v;
    }
  });
  if (customAccessor) return customAccessor;
  if (builtinAccessor) return builtinAccessor;
  if (defaultAccessor) return defaultAccessor;
  if (typeof ngDevMode === 'undefined' || ngDevMode) {
    _throwError(dir, 'No valid value accessor for form control with');
  }
  return null;
}
function removeListItem$1(list, el) {
  const index = list.indexOf(el);
  if (index > -1) list.splice(index, 1);
}
// TODO(kara): remove after deprecation period
function _ngModelWarning(name, type, instance, warningConfig) {
  if (warningConfig === 'never') return;
  if ((warningConfig === null || warningConfig === 'once') && !type._ngModelWarningSentOnce || warningConfig === 'always' && !instance._ngModelWarningSent) {
    console.warn(ngModelWarning(name));
    type._ngModelWarningSentOnce = true;
    instance._ngModelWarningSent = true;
  }
}
const formDirectiveProvider$1 = {
  provide: ControlContainer,
  useExisting: /*#__PURE__*/(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(() => NgForm)
};
const resolvedPromise$1 = /*#__PURE__*/(() => Promise.resolve())();
/**
 * @description
 * Creates a top-level `FormGroup` instance and binds it to a form
 * to track aggregate form value and validation status.
 *
 * As soon as you import the `FormsModule`, this directive becomes active by default on
 * all `<form>` tags.  You don't need to add a special selector.
 *
 * You optionally export the directive into a local template variable using `ngForm` as the key
 * (ex: `#myForm="ngForm"`). This is optional, but useful.  Many properties from the underlying
 * `FormGroup` instance are duplicated on the directive itself, so a reference to it
 * gives you access to the aggregate value and validity status of the form, as well as
 * user interaction properties like `dirty` and `touched`.
 *
 * To register child controls with the form, use `NgModel` with a `name`
 * attribute. You may use `NgModelGroup` to create sub-groups within the form.
 *
 * If necessary, listen to the directive's `ngSubmit` event to be notified when the user has
 * triggered a form submission. The `ngSubmit` event emits the original form
 * submission event.
 *
 * In template driven forms, all `<form>` tags are automatically tagged as `NgForm`.
 * To import the `FormsModule` but skip its usage in some forms,
 * for example, to use native HTML5 validation, add the `ngNoForm` and the `<form>`
 * tags won't create an `NgForm` directive. In reactive forms, using `ngNoForm` is
 * unnecessary because the `<form>` tags are inert. In that case, you would
 * refrain from using the `formGroup` directive.
 *
 * @usageNotes
 *
 * ### Listening for form submission
 *
 * The following example shows how to capture the form values from the "ngSubmit" event.
 *
 * {@example forms/ts/simpleForm/simple_form_example.ts region='Component'}
 *
 * ### Setting the update options
 *
 * The following example shows you how to change the "updateOn" option from its default using
 * ngFormOptions.
 *
 * ```html
 * <form [ngFormOptions]="{updateOn: 'blur'}">
 *    <input name="one" ngModel>  <!-- this ngModel will update on blur -->
 * </form>
 * ```
 *
 * ### Native DOM validation UI
 *
 * In order to prevent the native DOM form validation UI from interfering with Angular's form
 * validation, Angular automatically adds the `novalidate` attribute on any `<form>` whenever
 * `FormModule` or `ReactiveFormModule` are imported into the application.
 * If you want to explicitly enable native DOM validation UI with Angular forms, you can add the
 * `ngNativeValidate` attribute to the `<form>` element:
 *
 * ```html
 * <form ngNativeValidate>
 *   ...
 * </form>
 * ```
 *
 * @ngModule FormsModule
 * @publicApi
 */
let NgForm = /*#__PURE__*/(() => {
  var _class7;
  class NgForm extends ControlContainer {
    constructor(validators, asyncValidators, callSetDisabledState) {
      super();
      this.callSetDisabledState = callSetDisabledState;
      /**
       * @description
       * Returns whether the form submission has been triggered.
       */
      this.submitted = false;
      this._directives = new Set();
      /**
       * @description
       * Event emitter for the "ngSubmit" event
       */
      this.ngSubmit = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
      this.form = new FormGroup({}, composeValidators(validators), composeAsyncValidators(asyncValidators));
    }
    /** @nodoc */
    ngAfterViewInit() {
      this._setUpdateStrategy();
    }
    /**
     * @description
     * The directive instance.
     */
    get formDirective() {
      return this;
    }
    /**
     * @description
     * The internal `FormGroup` instance.
     */
    get control() {
      return this.form;
    }
    /**
     * @description
     * Returns an array representing the path to this group. Because this directive
     * always lives at the top level of a form, it is always an empty array.
     */
    get path() {
      return [];
    }
    /**
     * @description
     * Returns a map of the controls in this group.
     */
    get controls() {
      return this.form.controls;
    }
    /**
     * @description
     * Method that sets up the control directive in this group, re-calculates its value
     * and validity, and adds the instance to the internal list of directives.
     *
     * @param dir The `NgModel` directive instance.
     */
    addControl(dir) {
      resolvedPromise$1.then(() => {
        const container = this._findContainer(dir.path);
        dir.control = container.registerControl(dir.name, dir.control);
        setUpControl(dir.control, dir, this.callSetDisabledState);
        dir.control.updateValueAndValidity({
          emitEvent: false
        });
        this._directives.add(dir);
      });
    }
    /**
     * @description
     * Retrieves the `FormControl` instance from the provided `NgModel` directive.
     *
     * @param dir The `NgModel` directive instance.
     */
    getControl(dir) {
      return this.form.get(dir.path);
    }
    /**
     * @description
     * Removes the `NgModel` instance from the internal list of directives
     *
     * @param dir The `NgModel` directive instance.
     */
    removeControl(dir) {
      resolvedPromise$1.then(() => {
        const container = this._findContainer(dir.path);
        if (container) {
          container.removeControl(dir.name);
        }
        this._directives.delete(dir);
      });
    }
    /**
     * @description
     * Adds a new `NgModelGroup` directive instance to the form.
     *
     * @param dir The `NgModelGroup` directive instance.
     */
    addFormGroup(dir) {
      resolvedPromise$1.then(() => {
        const container = this._findContainer(dir.path);
        const group = new FormGroup({});
        setUpFormContainer(group, dir);
        container.registerControl(dir.name, group);
        group.updateValueAndValidity({
          emitEvent: false
        });
      });
    }
    /**
     * @description
     * Removes the `NgModelGroup` directive instance from the form.
     *
     * @param dir The `NgModelGroup` directive instance.
     */
    removeFormGroup(dir) {
      resolvedPromise$1.then(() => {
        const container = this._findContainer(dir.path);
        if (container) {
          container.removeControl(dir.name);
        }
      });
    }
    /**
     * @description
     * Retrieves the `FormGroup` for a provided `NgModelGroup` directive instance
     *
     * @param dir The `NgModelGroup` directive instance.
     */
    getFormGroup(dir) {
      return this.form.get(dir.path);
    }
    /**
     * Sets the new value for the provided `NgControl` directive.
     *
     * @param dir The `NgControl` directive instance.
     * @param value The new value for the directive's control.
     */
    updateModel(dir, value) {
      resolvedPromise$1.then(() => {
        const ctrl = this.form.get(dir.path);
        ctrl.setValue(value);
      });
    }
    /**
     * @description
     * Sets the value for this `FormGroup`.
     *
     * @param value The new value
     */
    setValue(value) {
      this.control.setValue(value);
    }
    /**
     * @description
     * Method called when the "submit" event is triggered on the form.
     * Triggers the `ngSubmit` emitter to emit the "submit" event as its payload.
     *
     * @param $event The "submit" event object
     */
    onSubmit($event) {
      this.submitted = true;
      syncPendingControls(this.form, this._directives);
      this.ngSubmit.emit($event);
      // Forms with `method="dialog"` have some special behavior
      // that won't reload the page and that shouldn't be prevented.
      return $event?.target?.method === 'dialog';
    }
    /**
     * @description
     * Method called when the "reset" event is triggered on the form.
     */
    onReset() {
      this.resetForm();
    }
    /**
     * @description
     * Resets the form to an initial value and resets its submitted status.
     *
     * @param value The new value for the form.
     */
    resetForm(value = undefined) {
      this.form.reset(value);
      this.submitted = false;
    }
    _setUpdateStrategy() {
      if (this.options && this.options.updateOn != null) {
        this.form._updateOn = this.options.updateOn;
      }
    }
    _findContainer(path) {
      path.pop();
      return path.length ? this.form.get(path) : this.form;
    }
  }
  _class7 = NgForm;
  _class7.ɵfac = function _class7_Factory(t) {
    return new (t || _class7)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](NG_VALIDATORS, 10), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](NG_ASYNC_VALIDATORS, 10), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](CALL_SET_DISABLED_STATE, 8));
  };
  _class7.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
    type: _class7,
    selectors: [["form", 3, "ngNoForm", "", 3, "formGroup", ""], ["ng-form"], ["", "ngForm", ""]],
    hostBindings: function _class7_HostBindings(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("submit", function _class7_submit_HostBindingHandler($event) {
          return ctx.onSubmit($event);
        })("reset", function _class7_reset_HostBindingHandler() {
          return ctx.onReset();
        });
      }
    },
    inputs: {
      options: ["ngFormOptions", "options"]
    },
    outputs: {
      ngSubmit: "ngSubmit"
    },
    exportAs: ["ngForm"],
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([formDirectiveProvider$1]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]]
  });
  return NgForm;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
function removeListItem(list, el) {
  const index = list.indexOf(el);
  if (index > -1) list.splice(index, 1);
}
function isFormControlState(formState) {
  return typeof formState === 'object' && formState !== null && Object.keys(formState).length === 2 && 'value' in formState && 'disabled' in formState;
}
const FormControl = class FormControl extends AbstractControl {
  constructor(
  // formState and defaultValue will only be null if T is nullable
  formState = null, validatorOrOpts, asyncValidator) {
    super(pickValidators(validatorOrOpts), pickAsyncValidators(asyncValidator, validatorOrOpts));
    /** @publicApi */
    this.defaultValue = null;
    /** @internal */
    this._onChange = [];
    /** @internal */
    this._pendingChange = false;
    this._applyFormState(formState);
    this._setUpdateStrategy(validatorOrOpts);
    this._initObservables();
    this.updateValueAndValidity({
      onlySelf: true,
      // If `asyncValidator` is present, it will trigger control status change from `PENDING` to
      // `VALID` or `INVALID`.
      // The status should be broadcasted via the `statusChanges` observable, so we set
      // `emitEvent` to `true` to allow that during the control creation process.
      emitEvent: !!this.asyncValidator
    });
    if (isOptionsObj(validatorOrOpts) && (validatorOrOpts.nonNullable || validatorOrOpts.initialValueIsDefault)) {
      if (isFormControlState(formState)) {
        this.defaultValue = formState.value;
      } else {
        this.defaultValue = formState;
      }
    }
  }
  setValue(value, options = {}) {
    this.value = this._pendingValue = value;
    if (this._onChange.length && options.emitModelToViewChange !== false) {
      this._onChange.forEach(changeFn => changeFn(this.value, options.emitViewToModelChange !== false));
    }
    this.updateValueAndValidity(options);
  }
  patchValue(value, options = {}) {
    this.setValue(value, options);
  }
  reset(formState = this.defaultValue, options = {}) {
    this._applyFormState(formState);
    this.markAsPristine(options);
    this.markAsUntouched(options);
    this.setValue(this.value, options);
    this._pendingChange = false;
  }
  /**  @internal */
  _updateValue() {}
  /**  @internal */
  _anyControls(condition) {
    return false;
  }
  /**  @internal */
  _allControlsDisabled() {
    return this.disabled;
  }
  registerOnChange(fn) {
    this._onChange.push(fn);
  }
  /** @internal */
  _unregisterOnChange(fn) {
    removeListItem(this._onChange, fn);
  }
  registerOnDisabledChange(fn) {
    this._onDisabledChange.push(fn);
  }
  /** @internal */
  _unregisterOnDisabledChange(fn) {
    removeListItem(this._onDisabledChange, fn);
  }
  /** @internal */
  _forEachChild(cb) {}
  /** @internal */
  _syncPendingControls() {
    if (this.updateOn === 'submit') {
      if (this._pendingDirty) this.markAsDirty();
      if (this._pendingTouched) this.markAsTouched();
      if (this._pendingChange) {
        this.setValue(this._pendingValue, {
          onlySelf: true,
          emitModelToViewChange: false
        });
        return true;
      }
    }
    return false;
  }
  _applyFormState(formState) {
    if (isFormControlState(formState)) {
      this.value = this._pendingValue = formState.value;
      formState.disabled ? this.disable({
        onlySelf: true,
        emitEvent: false
      }) : this.enable({
        onlySelf: true,
        emitEvent: false
      });
    } else {
      this.value = this._pendingValue = formState;
    }
  }
};
const UntypedFormControl = FormControl;
/**
 * @description
 * Asserts that the given control is an instance of `FormControl`
 *
 * @publicApi
 */
const isFormControl = control => control instanceof FormControl;

/**
 * @description
 * A base class for code shared between the `NgModelGroup` and `FormGroupName` directives.
 *
 * @publicApi
 */
let AbstractFormGroupDirective = /*#__PURE__*/(() => {
  var _class8;
  class AbstractFormGroupDirective extends ControlContainer {
    /** @nodoc */
    ngOnInit() {
      this._checkParentType();
      // Register the group with its parent group.
      this.formDirective.addFormGroup(this);
    }
    /** @nodoc */
    ngOnDestroy() {
      if (this.formDirective) {
        // Remove the group from its parent group.
        this.formDirective.removeFormGroup(this);
      }
    }
    /**
     * @description
     * The `FormGroup` bound to this directive.
     */
    get control() {
      return this.formDirective.getFormGroup(this);
    }
    /**
     * @description
     * The path to this group from the top-level directive.
     */
    get path() {
      return controlPath(this.name == null ? this.name : this.name.toString(), this._parent);
    }
    /**
     * @description
     * The top-level directive for this group if present, otherwise null.
     */
    get formDirective() {
      return this._parent ? this._parent.formDirective : null;
    }
    /** @internal */
    _checkParentType() {}
  }
  _class8 = AbstractFormGroupDirective;
  _class8.ɵfac = /* @__PURE__ */function () {
    let ɵ_class8_BaseFactory;
    return function _class8_Factory(t) {
      return (ɵ_class8_BaseFactory || (ɵ_class8_BaseFactory = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetInheritedFactory"](_class8)))(t || _class8);
    };
  }();
  _class8.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
    type: _class8,
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]]
  });
  return AbstractFormGroupDirective;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
function modelParentException() {
  return new _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵRuntimeError"](1350 /* RuntimeErrorCode.NGMODEL_IN_FORM_GROUP */, `
    ngModel cannot be used to register form controls with a parent formGroup directive.  Try using
    formGroup's partner directive "formControlName" instead.  Example:

    ${formControlNameExample}

    Or, if you'd like to avoid registering this form control, indicate that it's standalone in ngModelOptions:

    Example:

    ${ngModelWithFormGroupExample}`);
}
function formGroupNameException() {
  return new _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵRuntimeError"](1351 /* RuntimeErrorCode.NGMODEL_IN_FORM_GROUP_NAME */, `
    ngModel cannot be used to register form controls with a parent formGroupName or formArrayName directive.

    Option 1: Use formControlName instead of ngModel (reactive strategy):

    ${formGroupNameExample}

    Option 2:  Update ngModel's parent be ngModelGroup (template-driven strategy):

    ${ngModelGroupExample}`);
}
function missingNameException() {
  return new _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵRuntimeError"](1352 /* RuntimeErrorCode.NGMODEL_WITHOUT_NAME */, `If ngModel is used within a form tag, either the name attribute must be set or the form
    control must be defined as 'standalone' in ngModelOptions.

    Example 1: <input [(ngModel)]="person.firstName" name="first">
    Example 2: <input [(ngModel)]="person.firstName" [ngModelOptions]="{standalone: true}">`);
}
function modelGroupParentException() {
  return new _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵRuntimeError"](1353 /* RuntimeErrorCode.NGMODELGROUP_IN_FORM_GROUP */, `
    ngModelGroup cannot be used with a parent formGroup directive.

    Option 1: Use formGroupName instead of ngModelGroup (reactive strategy):

    ${formGroupNameExample}

    Option 2:  Use a regular form tag instead of the formGroup directive (template-driven strategy):

    ${ngModelGroupExample}`);
}
const modelGroupProvider = {
  provide: ControlContainer,
  useExisting: /*#__PURE__*/(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(() => NgModelGroup)
};
/**
 * @description
 * Creates and binds a `FormGroup` instance to a DOM element.
 *
 * This directive can only be used as a child of `NgForm` (within `<form>` tags).
 *
 * Use this directive to validate a sub-group of your form separately from the
 * rest of your form, or if some values in your domain model make more sense
 * to consume together in a nested object.
 *
 * Provide a name for the sub-group and it will become the key
 * for the sub-group in the form's full value. If you need direct access, export the directive into
 * a local template variable using `ngModelGroup` (ex: `#myGroup="ngModelGroup"`).
 *
 * @usageNotes
 *
 * ### Consuming controls in a grouping
 *
 * The following example shows you how to combine controls together in a sub-group
 * of the form.
 *
 * {@example forms/ts/ngModelGroup/ng_model_group_example.ts region='Component'}
 *
 * @ngModule FormsModule
 * @publicApi
 */
let NgModelGroup = /*#__PURE__*/(() => {
  var _class9;
  class NgModelGroup extends AbstractFormGroupDirective {
    constructor(parent, validators, asyncValidators) {
      super();
      /**
       * @description
       * Tracks the name of the `NgModelGroup` bound to the directive. The name corresponds
       * to a key in the parent `NgForm`.
       */
      this.name = '';
      this._parent = parent;
      this._setValidators(validators);
      this._setAsyncValidators(asyncValidators);
    }
    /** @internal */
    _checkParentType() {
      if (!(this._parent instanceof NgModelGroup) && !(this._parent instanceof NgForm) && (typeof ngDevMode === 'undefined' || ngDevMode)) {
        throw modelGroupParentException();
      }
    }
  }
  _class9 = NgModelGroup;
  _class9.ɵfac = function _class9_Factory(t) {
    return new (t || _class9)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](ControlContainer, 5), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](NG_VALIDATORS, 10), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](NG_ASYNC_VALIDATORS, 10));
  };
  _class9.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
    type: _class9,
    selectors: [["", "ngModelGroup", ""]],
    inputs: {
      name: ["ngModelGroup", "name"]
    },
    exportAs: ["ngModelGroup"],
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([modelGroupProvider]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]]
  });
  return NgModelGroup;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
const formControlBinding$1 = {
  provide: NgControl,
  useExisting: /*#__PURE__*/(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(() => NgModel)
};
/**
 * `ngModel` forces an additional change detection run when its inputs change:
 * E.g.:
 * ```
 * <div>{{myModel.valid}}</div>
 * <input [(ngModel)]="myValue" #myModel="ngModel">
 * ```
 * I.e. `ngModel` can export itself on the element and then be used in the template.
 * Normally, this would result in expressions before the `input` that use the exported directive
 * to have an old value as they have been
 * dirty checked before. As this is a very common case for `ngModel`, we added this second change
 * detection run.
 *
 * Notes:
 * - this is just one extra run no matter how many `ngModel`s have been changed.
 * - this is a general problem when using `exportAs` for directives!
 */
const resolvedPromise = /*#__PURE__*/(() => Promise.resolve())();
/**
 * @description
 * Creates a `FormControl` instance from a [domain
 * model](https://en.wikipedia.org/wiki/Domain_model) and binds it to a form control element.
 *
 * The `FormControl` instance tracks the value, user interaction, and
 * validation status of the control and keeps the view synced with the model. If used
 * within a parent form, the directive also registers itself with the form as a child
 * control.
 *
 * This directive is used by itself or as part of a larger form. Use the
 * `ngModel` selector to activate it.
 *
 * It accepts a domain model as an optional `Input`. If you have a one-way binding
 * to `ngModel` with `[]` syntax, changing the domain model's value in the component
 * class sets the value in the view. If you have a two-way binding with `[()]` syntax
 * (also known as 'banana-in-a-box syntax'), the value in the UI always syncs back to
 * the domain model in your class.
 *
 * To inspect the properties of the associated `FormControl` (like the validity state),
 * export the directive into a local template variable using `ngModel` as the key (ex:
 * `#myVar="ngModel"`). You can then access the control using the directive's `control` property.
 * However, the most commonly used properties (like `valid` and `dirty`) also exist on the control
 * for direct access. See a full list of properties directly available in
 * `AbstractControlDirective`.
 *
 * @see {@link RadioControlValueAccessor}
 * @see {@link SelectControlValueAccessor}
 *
 * @usageNotes
 *
 * ### Using ngModel on a standalone control
 *
 * The following examples show a simple standalone control using `ngModel`:
 *
 * {@example forms/ts/simpleNgModel/simple_ng_model_example.ts region='Component'}
 *
 * When using the `ngModel` within `<form>` tags, you'll also need to supply a `name` attribute
 * so that the control can be registered with the parent form under that name.
 *
 * In the context of a parent form, it's often unnecessary to include one-way or two-way binding,
 * as the parent form syncs the value for you. You access its properties by exporting it into a
 * local template variable using `ngForm` such as (`#f="ngForm"`). Use the variable where
 * needed on form submission.
 *
 * If you do need to populate initial values into your form, using a one-way binding for
 * `ngModel` tends to be sufficient as long as you use the exported form's value rather
 * than the domain model's value on submit.
 *
 * ### Using ngModel within a form
 *
 * The following example shows controls using `ngModel` within a form:
 *
 * {@example forms/ts/simpleForm/simple_form_example.ts region='Component'}
 *
 * ### Using a standalone ngModel within a group
 *
 * The following example shows you how to use a standalone ngModel control
 * within a form. This controls the display of the form, but doesn't contain form data.
 *
 * ```html
 * <form>
 *   <input name="login" ngModel placeholder="Login">
 *   <input type="checkbox" ngModel [ngModelOptions]="{standalone: true}"> Show more options?
 * </form>
 * <!-- form value: {login: ''} -->
 * ```
 *
 * ### Setting the ngModel `name` attribute through options
 *
 * The following example shows you an alternate way to set the name attribute. Here,
 * an attribute identified as name is used within a custom form control component. To still be able
 * to specify the NgModel's name, you must specify it using the `ngModelOptions` input instead.
 *
 * ```html
 * <form>
 *   <my-custom-form-control name="Nancy" ngModel [ngModelOptions]="{name: 'user'}">
 *   </my-custom-form-control>
 * </form>
 * <!-- form value: {user: ''} -->
 * ```
 *
 * @ngModule FormsModule
 * @publicApi
 */
let NgModel = /*#__PURE__*/(() => {
  var _class10;
  class NgModel extends NgControl {
    constructor(parent, validators, asyncValidators, valueAccessors, _changeDetectorRef, callSetDisabledState) {
      super();
      this._changeDetectorRef = _changeDetectorRef;
      this.callSetDisabledState = callSetDisabledState;
      this.control = new FormControl();
      /** @internal */
      this._registered = false;
      /**
       * @description
       * Tracks the name bound to the directive. If a parent form exists, it
       * uses this name as a key to retrieve this control's value.
       */
      this.name = '';
      /**
       * @description
       * Event emitter for producing the `ngModelChange` event after
       * the view model updates.
       */
      this.update = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
      this._parent = parent;
      this._setValidators(validators);
      this._setAsyncValidators(asyncValidators);
      this.valueAccessor = selectValueAccessor(this, valueAccessors);
    }
    /** @nodoc */
    ngOnChanges(changes) {
      this._checkForErrors();
      if (!this._registered || 'name' in changes) {
        if (this._registered) {
          this._checkName();
          if (this.formDirective) {
            // We can't call `formDirective.removeControl(this)`, because the `name` has already been
            // changed. We also can't reset the name temporarily since the logic in `removeControl`
            // is inside a promise and it won't run immediately. We work around it by giving it an
            // object with the same shape instead.
            const oldName = changes['name'].previousValue;
            this.formDirective.removeControl({
              name: oldName,
              path: this._getPath(oldName)
            });
          }
        }
        this._setUpControl();
      }
      if ('isDisabled' in changes) {
        this._updateDisabled(changes);
      }
      if (isPropertyUpdated(changes, this.viewModel)) {
        this._updateValue(this.model);
        this.viewModel = this.model;
      }
    }
    /** @nodoc */
    ngOnDestroy() {
      this.formDirective && this.formDirective.removeControl(this);
    }
    /**
     * @description
     * Returns an array that represents the path from the top-level form to this control.
     * Each index is the string name of the control on that level.
     */
    get path() {
      return this._getPath(this.name);
    }
    /**
     * @description
     * The top-level directive for this control if present, otherwise null.
     */
    get formDirective() {
      return this._parent ? this._parent.formDirective : null;
    }
    /**
     * @description
     * Sets the new value for the view model and emits an `ngModelChange` event.
     *
     * @param newValue The new value emitted by `ngModelChange`.
     */
    viewToModelUpdate(newValue) {
      this.viewModel = newValue;
      this.update.emit(newValue);
    }
    _setUpControl() {
      this._setUpdateStrategy();
      this._isStandalone() ? this._setUpStandalone() : this.formDirective.addControl(this);
      this._registered = true;
    }
    _setUpdateStrategy() {
      if (this.options && this.options.updateOn != null) {
        this.control._updateOn = this.options.updateOn;
      }
    }
    _isStandalone() {
      return !this._parent || !!(this.options && this.options.standalone);
    }
    _setUpStandalone() {
      setUpControl(this.control, this, this.callSetDisabledState);
      this.control.updateValueAndValidity({
        emitEvent: false
      });
    }
    _checkForErrors() {
      if (!this._isStandalone()) {
        this._checkParentType();
      }
      this._checkName();
    }
    _checkParentType() {
      if (typeof ngDevMode === 'undefined' || ngDevMode) {
        if (!(this._parent instanceof NgModelGroup) && this._parent instanceof AbstractFormGroupDirective) {
          throw formGroupNameException();
        } else if (!(this._parent instanceof NgModelGroup) && !(this._parent instanceof NgForm)) {
          throw modelParentException();
        }
      }
    }
    _checkName() {
      if (this.options && this.options.name) this.name = this.options.name;
      if (!this._isStandalone() && !this.name && (typeof ngDevMode === 'undefined' || ngDevMode)) {
        throw missingNameException();
      }
    }
    _updateValue(value) {
      resolvedPromise.then(() => {
        this.control.setValue(value, {
          emitViewToModelChange: false
        });
        this._changeDetectorRef?.markForCheck();
      });
    }
    _updateDisabled(changes) {
      const disabledValue = changes['isDisabled'].currentValue;
      // checking for 0 to avoid breaking change
      const isDisabled = disabledValue !== 0 && (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.booleanAttribute)(disabledValue);
      resolvedPromise.then(() => {
        if (isDisabled && !this.control.disabled) {
          this.control.disable();
        } else if (!isDisabled && this.control.disabled) {
          this.control.enable();
        }
        this._changeDetectorRef?.markForCheck();
      });
    }
    _getPath(controlName) {
      return this._parent ? controlPath(controlName, this._parent) : [controlName];
    }
  }
  _class10 = NgModel;
  _class10.ɵfac = function _class10_Factory(t) {
    return new (t || _class10)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](ControlContainer, 9), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](NG_VALIDATORS, 10), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](NG_ASYNC_VALIDATORS, 10), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](NG_VALUE_ACCESSOR, 10), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectorRef, 8), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](CALL_SET_DISABLED_STATE, 8));
  };
  _class10.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
    type: _class10,
    selectors: [["", "ngModel", "", 3, "formControlName", "", 3, "formControl", ""]],
    inputs: {
      name: "name",
      isDisabled: ["disabled", "isDisabled"],
      model: ["ngModel", "model"],
      options: ["ngModelOptions", "options"]
    },
    outputs: {
      update: "ngModelChange"
    },
    exportAs: ["ngModel"],
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([formControlBinding$1]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵNgOnChangesFeature"]]
  });
  return NgModel;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();

/**
 * @description
 *
 * Adds `novalidate` attribute to all forms by default.
 *
 * `novalidate` is used to disable browser's native form validation.
 *
 * If you want to use native validation with Angular forms, just add `ngNativeValidate` attribute:
 *
 * ```
 * <form ngNativeValidate></form>
 * ```
 *
 * @publicApi
 * @ngModule ReactiveFormsModule
 * @ngModule FormsModule
 */
let ɵNgNoValidate = /*#__PURE__*/(() => {
  var _class11;
  class ɵNgNoValidate {}
  _class11 = ɵNgNoValidate;
  _class11.ɵfac = function _class11_Factory(t) {
    return new (t || _class11)();
  };
  _class11.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
    type: _class11,
    selectors: [["form", 3, "ngNoForm", "", 3, "ngNativeValidate", ""]],
    hostAttrs: ["novalidate", ""]
  });
  return ɵNgNoValidate;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
const NUMBER_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: /*#__PURE__*/(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(() => NumberValueAccessor),
  multi: true
};
/**
 * @description
 * The `ControlValueAccessor` for writing a number value and listening to number input changes.
 * The value accessor is used by the `FormControlDirective`, `FormControlName`, and `NgModel`
 * directives.
 *
 * @usageNotes
 *
 * ### Using a number input with a reactive form.
 *
 * The following example shows how to use a number input with a reactive form.
 *
 * ```ts
 * const totalCountControl = new FormControl();
 * ```
 *
 * ```
 * <input type="number" [formControl]="totalCountControl">
 * ```
 *
 * @ngModule ReactiveFormsModule
 * @ngModule FormsModule
 * @publicApi
 */
let NumberValueAccessor = /*#__PURE__*/(() => {
  var _class12;
  class NumberValueAccessor extends BuiltInControlValueAccessor {
    /**
     * Sets the "value" property on the input element.
     * @nodoc
     */
    writeValue(value) {
      // The value needs to be normalized for IE9, otherwise it is set to 'null' when null
      const normalizedValue = value == null ? '' : value;
      this.setProperty('value', normalizedValue);
    }
    /**
     * Registers a function called when the control value changes.
     * @nodoc
     */
    registerOnChange(fn) {
      this.onChange = value => {
        fn(value == '' ? null : parseFloat(value));
      };
    }
  }
  _class12 = NumberValueAccessor;
  _class12.ɵfac = /* @__PURE__ */function () {
    let ɵ_class12_BaseFactory;
    return function _class12_Factory(t) {
      return (ɵ_class12_BaseFactory || (ɵ_class12_BaseFactory = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetInheritedFactory"](_class12)))(t || _class12);
    };
  }();
  _class12.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
    type: _class12,
    selectors: [["input", "type", "number", "formControlName", ""], ["input", "type", "number", "formControl", ""], ["input", "type", "number", "ngModel", ""]],
    hostBindings: function _class12_HostBindings(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("input", function _class12_input_HostBindingHandler($event) {
          return ctx.onChange($event.target.value);
        })("blur", function _class12_blur_HostBindingHandler() {
          return ctx.onTouched();
        });
      }
    },
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([NUMBER_VALUE_ACCESSOR]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]]
  });
  return NumberValueAccessor;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
const RADIO_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: /*#__PURE__*/(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(() => RadioControlValueAccessor),
  multi: true
};
function throwNameError() {
  throw new _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵRuntimeError"](1202 /* RuntimeErrorCode.NAME_AND_FORM_CONTROL_NAME_MUST_MATCH */, `
      If you define both a name and a formControlName attribute on your radio button, their values
      must match. Ex: <input type="radio" formControlName="food" name="food">
    `);
}
/**
 * Internal-only NgModule that works as a host for the `RadioControlRegistry` tree-shakable
 * provider. Note: the `InternalFormsSharedModule` can not be used here directly, since it's
 * declared *after* the `RadioControlRegistry` class and the `providedIn` doesn't support
 * `forwardRef` logic.
 */
let RadioControlRegistryModule = /*#__PURE__*/(() => {
  var _class13;
  class RadioControlRegistryModule {}
  _class13 = RadioControlRegistryModule;
  _class13.ɵfac = function _class13_Factory(t) {
    return new (t || _class13)();
  };
  _class13.ɵmod = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
    type: _class13
  });
  _class13.ɵinj = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({});
  return RadioControlRegistryModule;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
/**
 * @description
 * Class used by Angular to track radio buttons. For internal use only.
 */
let RadioControlRegistry = /*#__PURE__*/(() => {
  var _class14;
  class RadioControlRegistry {
    constructor() {
      this._accessors = [];
    }
    /**
     * @description
     * Adds a control to the internal registry. For internal use only.
     */
    add(control, accessor) {
      this._accessors.push([control, accessor]);
    }
    /**
     * @description
     * Removes a control from the internal registry. For internal use only.
     */
    remove(accessor) {
      for (let i = this._accessors.length - 1; i >= 0; --i) {
        if (this._accessors[i][1] === accessor) {
          this._accessors.splice(i, 1);
          return;
        }
      }
    }
    /**
     * @description
     * Selects a radio button. For internal use only.
     */
    select(accessor) {
      this._accessors.forEach(c => {
        if (this._isSameGroup(c, accessor) && c[1] !== accessor) {
          c[1].fireUncheck(accessor.value);
        }
      });
    }
    _isSameGroup(controlPair, accessor) {
      if (!controlPair[0].control) return false;
      return controlPair[0]._parent === accessor._control._parent && controlPair[1].name === accessor.name;
    }
  }
  _class14 = RadioControlRegistry;
  _class14.ɵfac = function _class14_Factory(t) {
    return new (t || _class14)();
  };
  _class14.ɵprov = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
    token: _class14,
    factory: _class14.ɵfac,
    providedIn: RadioControlRegistryModule
  });
  return RadioControlRegistry;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
/**
 * @description
 * The `ControlValueAccessor` for writing radio control values and listening to radio control
 * changes. The value accessor is used by the `FormControlDirective`, `FormControlName`, and
 * `NgModel` directives.
 *
 * @usageNotes
 *
 * ### Using radio buttons with reactive form directives
 *
 * The follow example shows how to use radio buttons in a reactive form. When using radio buttons in
 * a reactive form, radio buttons in the same group should have the same `formControlName`.
 * Providing a `name` attribute is optional.
 *
 * {@example forms/ts/reactiveRadioButtons/reactive_radio_button_example.ts region='Reactive'}
 *
 * @ngModule ReactiveFormsModule
 * @ngModule FormsModule
 * @publicApi
 */
let RadioControlValueAccessor = /*#__PURE__*/(() => {
  var _class15;
  class RadioControlValueAccessor extends BuiltInControlValueAccessor {
    constructor(renderer, elementRef, _registry, _injector) {
      super(renderer, elementRef);
      this._registry = _registry;
      this._injector = _injector;
      this.setDisabledStateFired = false;
      /**
       * The registered callback function called when a change event occurs on the input element.
       * Note: we declare `onChange` here (also used as host listener) as a function with no arguments
       * to override the `onChange` function (which expects 1 argument) in the parent
       * `BaseControlValueAccessor` class.
       * @nodoc
       */
      this.onChange = () => {};
      this.callSetDisabledState = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(CALL_SET_DISABLED_STATE, {
        optional: true
      }) ?? setDisabledStateDefault;
    }
    /** @nodoc */
    ngOnInit() {
      this._control = this._injector.get(NgControl);
      this._checkName();
      this._registry.add(this._control, this);
    }
    /** @nodoc */
    ngOnDestroy() {
      this._registry.remove(this);
    }
    /**
     * Sets the "checked" property value on the radio input element.
     * @nodoc
     */
    writeValue(value) {
      this._state = value === this.value;
      this.setProperty('checked', this._state);
    }
    /**
     * Registers a function called when the control value changes.
     * @nodoc
     */
    registerOnChange(fn) {
      this._fn = fn;
      this.onChange = () => {
        fn(this.value);
        this._registry.select(this);
      };
    }
    /** @nodoc */
    setDisabledState(isDisabled) {
      /**
       * `setDisabledState` is supposed to be called whenever the disabled state of a control changes,
       * including upon control creation. However, a longstanding bug caused the method to not fire
       * when an *enabled* control was attached. This bug was fixed in v15 in #47576.
       *
       * This had a side effect: previously, it was possible to instantiate a reactive form control
       * with `[attr.disabled]=true`, even though the corresponding control was enabled in the
       * model. This resulted in a mismatch between the model and the DOM. Now, because
       * `setDisabledState` is always called, the value in the DOM will be immediately overwritten
       * with the "correct" enabled value.
       *
       * However, the fix also created an exceptional case: radio buttons. Because Reactive Forms
       * models the entire group of radio buttons as a single `FormControl`, there is no way to
       * control the disabled state for individual radios, so they can no longer be configured as
       * disabled. Thus, we keep the old behavior for radio buttons, so that `[attr.disabled]`
       * continues to work. Specifically, we drop the first call to `setDisabledState` if `disabled`
       * is `false`, and we are not in legacy mode.
       */
      if (this.setDisabledStateFired || isDisabled || this.callSetDisabledState === 'whenDisabledForLegacyCode') {
        this.setProperty('disabled', isDisabled);
      }
      this.setDisabledStateFired = true;
    }
    /**
     * Sets the "value" on the radio input element and unchecks it.
     *
     * @param value
     */
    fireUncheck(value) {
      this.writeValue(value);
    }
    _checkName() {
      if (this.name && this.formControlName && this.name !== this.formControlName && (typeof ngDevMode === 'undefined' || ngDevMode)) {
        throwNameError();
      }
      if (!this.name && this.formControlName) this.name = this.formControlName;
    }
  }
  _class15 = RadioControlValueAccessor;
  _class15.ɵfac = function _class15_Factory(t) {
    return new (t || _class15)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.Renderer2), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](RadioControlRegistry), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.Injector));
  };
  _class15.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
    type: _class15,
    selectors: [["input", "type", "radio", "formControlName", ""], ["input", "type", "radio", "formControl", ""], ["input", "type", "radio", "ngModel", ""]],
    hostBindings: function _class15_HostBindings(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("change", function _class15_change_HostBindingHandler() {
          return ctx.onChange();
        })("blur", function _class15_blur_HostBindingHandler() {
          return ctx.onTouched();
        });
      }
    },
    inputs: {
      name: "name",
      formControlName: "formControlName",
      value: "value"
    },
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([RADIO_VALUE_ACCESSOR]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]]
  });
  return RadioControlValueAccessor;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
const RANGE_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: /*#__PURE__*/(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(() => RangeValueAccessor),
  multi: true
};
/**
 * @description
 * The `ControlValueAccessor` for writing a range value and listening to range input changes.
 * The value accessor is used by the `FormControlDirective`, `FormControlName`, and  `NgModel`
 * directives.
 *
 * @usageNotes
 *
 * ### Using a range input with a reactive form
 *
 * The following example shows how to use a range input with a reactive form.
 *
 * ```ts
 * const ageControl = new FormControl();
 * ```
 *
 * ```
 * <input type="range" [formControl]="ageControl">
 * ```
 *
 * @ngModule ReactiveFormsModule
 * @ngModule FormsModule
 * @publicApi
 */
let RangeValueAccessor = /*#__PURE__*/(() => {
  var _class16;
  class RangeValueAccessor extends BuiltInControlValueAccessor {
    /**
     * Sets the "value" property on the input element.
     * @nodoc
     */
    writeValue(value) {
      this.setProperty('value', parseFloat(value));
    }
    /**
     * Registers a function called when the control value changes.
     * @nodoc
     */
    registerOnChange(fn) {
      this.onChange = value => {
        fn(value == '' ? null : parseFloat(value));
      };
    }
  }
  _class16 = RangeValueAccessor;
  _class16.ɵfac = /* @__PURE__ */function () {
    let ɵ_class16_BaseFactory;
    return function _class16_Factory(t) {
      return (ɵ_class16_BaseFactory || (ɵ_class16_BaseFactory = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetInheritedFactory"](_class16)))(t || _class16);
    };
  }();
  _class16.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
    type: _class16,
    selectors: [["input", "type", "range", "formControlName", ""], ["input", "type", "range", "formControl", ""], ["input", "type", "range", "ngModel", ""]],
    hostBindings: function _class16_HostBindings(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("change", function _class16_change_HostBindingHandler($event) {
          return ctx.onChange($event.target.value);
        })("input", function _class16_input_HostBindingHandler($event) {
          return ctx.onChange($event.target.value);
        })("blur", function _class16_blur_HostBindingHandler() {
          return ctx.onTouched();
        });
      }
    },
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([RANGE_VALUE_ACCESSOR]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]]
  });
  return RangeValueAccessor;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();

/**
 * Token to provide to turn off the ngModel warning on formControl and formControlName.
 */
const NG_MODEL_WITH_FORM_CONTROL_WARNING = /*#__PURE__*/new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken('NgModelWithFormControlWarning');
const formControlBinding = {
  provide: NgControl,
  useExisting: /*#__PURE__*/(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(() => FormControlDirective)
};
/**
 * @description
 * Synchronizes a standalone `FormControl` instance to a form control element.
 *
 * Note that support for using the `ngModel` input property and `ngModelChange` event with reactive
 * form directives was deprecated in Angular v6 and is scheduled for removal in
 * a future version of Angular.
 * For details, see [Deprecated features](guide/deprecations#ngmodel-with-reactive-forms).
 *
 * @see [Reactive Forms Guide](guide/reactive-forms)
 * @see {@link FormControl}
 * @see {@link AbstractControl}
 *
 * @usageNotes
 *
 * The following example shows how to register a standalone control and set its value.
 *
 * {@example forms/ts/simpleFormControl/simple_form_control_example.ts region='Component'}
 *
 * @ngModule ReactiveFormsModule
 * @publicApi
 */
let FormControlDirective = /*#__PURE__*/(() => {
  var _class17;
  class FormControlDirective extends NgControl {
    /**
     * @description
     * Triggers a warning in dev mode that this input should not be used with reactive forms.
     */
    set isDisabled(isDisabled) {
      if (typeof ngDevMode === 'undefined' || ngDevMode) {
        console.warn(disabledAttrWarning);
      }
    }
    /**
     * @description
     * Static property used to track whether any ngModel warnings have been sent across
     * all instances of FormControlDirective. Used to support warning config of "once".
     *
     * @internal
     */

    constructor(validators, asyncValidators, valueAccessors, _ngModelWarningConfig, callSetDisabledState) {
      super();
      this._ngModelWarningConfig = _ngModelWarningConfig;
      this.callSetDisabledState = callSetDisabledState;
      /** @deprecated as of v6 */
      this.update = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
      /**
       * @description
       * Instance property used to track whether an ngModel warning has been sent out for this
       * particular `FormControlDirective` instance. Used to support warning config of "always".
       *
       * @internal
       */
      this._ngModelWarningSent = false;
      this._setValidators(validators);
      this._setAsyncValidators(asyncValidators);
      this.valueAccessor = selectValueAccessor(this, valueAccessors);
    }
    /** @nodoc */
    ngOnChanges(changes) {
      if (this._isControlChanged(changes)) {
        const previousForm = changes['form'].previousValue;
        if (previousForm) {
          cleanUpControl(previousForm, this, /* validateControlPresenceOnChange */false);
        }
        setUpControl(this.form, this, this.callSetDisabledState);
        this.form.updateValueAndValidity({
          emitEvent: false
        });
      }
      if (isPropertyUpdated(changes, this.viewModel)) {
        if (typeof ngDevMode === 'undefined' || ngDevMode) {
          _ngModelWarning('formControl', FormControlDirective, this, this._ngModelWarningConfig);
        }
        this.form.setValue(this.model);
        this.viewModel = this.model;
      }
    }
    /** @nodoc */
    ngOnDestroy() {
      if (this.form) {
        cleanUpControl(this.form, this, /* validateControlPresenceOnChange */false);
      }
    }
    /**
     * @description
     * Returns an array that represents the path from the top-level form to this control.
     * Each index is the string name of the control on that level.
     */
    get path() {
      return [];
    }
    /**
     * @description
     * The `FormControl` bound to this directive.
     */
    get control() {
      return this.form;
    }
    /**
     * @description
     * Sets the new value for the view model and emits an `ngModelChange` event.
     *
     * @param newValue The new value for the view model.
     */
    viewToModelUpdate(newValue) {
      this.viewModel = newValue;
      this.update.emit(newValue);
    }
    _isControlChanged(changes) {
      return changes.hasOwnProperty('form');
    }
  }
  _class17 = FormControlDirective;
  _class17._ngModelWarningSentOnce = false;
  _class17.ɵfac = function _class17_Factory(t) {
    return new (t || _class17)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](NG_VALIDATORS, 10), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](NG_ASYNC_VALIDATORS, 10), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](NG_VALUE_ACCESSOR, 10), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](NG_MODEL_WITH_FORM_CONTROL_WARNING, 8), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](CALL_SET_DISABLED_STATE, 8));
  };
  _class17.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
    type: _class17,
    selectors: [["", "formControl", ""]],
    inputs: {
      form: ["formControl", "form"],
      isDisabled: ["disabled", "isDisabled"],
      model: ["ngModel", "model"]
    },
    outputs: {
      update: "ngModelChange"
    },
    exportAs: ["ngForm"],
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([formControlBinding]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵNgOnChangesFeature"]]
  });
  return FormControlDirective;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
const formDirectiveProvider = {
  provide: ControlContainer,
  useExisting: /*#__PURE__*/(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(() => FormGroupDirective)
};
/**
 * @description
 *
 * Binds an existing `FormGroup` or `FormRecord` to a DOM element.
 *
 * This directive accepts an existing `FormGroup` instance. It will then use this
 * `FormGroup` instance to match any child `FormControl`, `FormGroup`/`FormRecord`,
 * and `FormArray` instances to child `FormControlName`, `FormGroupName`,
 * and `FormArrayName` directives.
 *
 * @see [Reactive Forms Guide](guide/reactive-forms)
 * @see {@link AbstractControl}
 *
 * @usageNotes
 * ### Register Form Group
 *
 * The following example registers a `FormGroup` with first name and last name controls,
 * and listens for the *ngSubmit* event when the button is clicked.
 *
 * {@example forms/ts/simpleFormGroup/simple_form_group_example.ts region='Component'}
 *
 * @ngModule ReactiveFormsModule
 * @publicApi
 */
let FormGroupDirective = /*#__PURE__*/(() => {
  var _class18;
  class FormGroupDirective extends ControlContainer {
    constructor(validators, asyncValidators, callSetDisabledState) {
      super();
      this.callSetDisabledState = callSetDisabledState;
      /**
       * @description
       * Reports whether the form submission has been triggered.
       */
      this.submitted = false;
      /**
       * Callback that should be invoked when controls in FormGroup or FormArray collection change
       * (added or removed). This callback triggers corresponding DOM updates.
       */
      this._onCollectionChange = () => this._updateDomValue();
      /**
       * @description
       * Tracks the list of added `FormControlName` instances
       */
      this.directives = [];
      /**
       * @description
       * Tracks the `FormGroup` bound to this directive.
       */
      this.form = null;
      /**
       * @description
       * Emits an event when the form submission has been triggered.
       */
      this.ngSubmit = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
      this._setValidators(validators);
      this._setAsyncValidators(asyncValidators);
    }
    /** @nodoc */
    ngOnChanges(changes) {
      this._checkFormPresent();
      if (changes.hasOwnProperty('form')) {
        this._updateValidators();
        this._updateDomValue();
        this._updateRegistrations();
        this._oldForm = this.form;
      }
    }
    /** @nodoc */
    ngOnDestroy() {
      if (this.form) {
        cleanUpValidators(this.form, this);
        // Currently the `onCollectionChange` callback is rewritten each time the
        // `_registerOnCollectionChange` function is invoked. The implication is that cleanup should
        // happen *only* when the `onCollectionChange` callback was set by this directive instance.
        // Otherwise it might cause overriding a callback of some other directive instances. We should
        // consider updating this logic later to make it similar to how `onChange` callbacks are
        // handled, see https://github.com/angular/angular/issues/39732 for additional info.
        if (this.form._onCollectionChange === this._onCollectionChange) {
          this.form._registerOnCollectionChange(() => {});
        }
      }
    }
    /**
     * @description
     * Returns this directive's instance.
     */
    get formDirective() {
      return this;
    }
    /**
     * @description
     * Returns the `FormGroup` bound to this directive.
     */
    get control() {
      return this.form;
    }
    /**
     * @description
     * Returns an array representing the path to this group. Because this directive
     * always lives at the top level of a form, it always an empty array.
     */
    get path() {
      return [];
    }
    /**
     * @description
     * Method that sets up the control directive in this group, re-calculates its value
     * and validity, and adds the instance to the internal list of directives.
     *
     * @param dir The `FormControlName` directive instance.
     */
    addControl(dir) {
      const ctrl = this.form.get(dir.path);
      setUpControl(ctrl, dir, this.callSetDisabledState);
      ctrl.updateValueAndValidity({
        emitEvent: false
      });
      this.directives.push(dir);
      return ctrl;
    }
    /**
     * @description
     * Retrieves the `FormControl` instance from the provided `FormControlName` directive
     *
     * @param dir The `FormControlName` directive instance.
     */
    getControl(dir) {
      return this.form.get(dir.path);
    }
    /**
     * @description
     * Removes the `FormControlName` instance from the internal list of directives
     *
     * @param dir The `FormControlName` directive instance.
     */
    removeControl(dir) {
      cleanUpControl(dir.control || null, dir, /* validateControlPresenceOnChange */false);
      removeListItem$1(this.directives, dir);
    }
    /**
     * Adds a new `FormGroupName` directive instance to the form.
     *
     * @param dir The `FormGroupName` directive instance.
     */
    addFormGroup(dir) {
      this._setUpFormContainer(dir);
    }
    /**
     * Performs the necessary cleanup when a `FormGroupName` directive instance is removed from the
     * view.
     *
     * @param dir The `FormGroupName` directive instance.
     */
    removeFormGroup(dir) {
      this._cleanUpFormContainer(dir);
    }
    /**
     * @description
     * Retrieves the `FormGroup` for a provided `FormGroupName` directive instance
     *
     * @param dir The `FormGroupName` directive instance.
     */
    getFormGroup(dir) {
      return this.form.get(dir.path);
    }
    /**
     * Performs the necessary setup when a `FormArrayName` directive instance is added to the view.
     *
     * @param dir The `FormArrayName` directive instance.
     */
    addFormArray(dir) {
      this._setUpFormContainer(dir);
    }
    /**
     * Performs the necessary cleanup when a `FormArrayName` directive instance is removed from the
     * view.
     *
     * @param dir The `FormArrayName` directive instance.
     */
    removeFormArray(dir) {
      this._cleanUpFormContainer(dir);
    }
    /**
     * @description
     * Retrieves the `FormArray` for a provided `FormArrayName` directive instance.
     *
     * @param dir The `FormArrayName` directive instance.
     */
    getFormArray(dir) {
      return this.form.get(dir.path);
    }
    /**
     * Sets the new value for the provided `FormControlName` directive.
     *
     * @param dir The `FormControlName` directive instance.
     * @param value The new value for the directive's control.
     */
    updateModel(dir, value) {
      const ctrl = this.form.get(dir.path);
      ctrl.setValue(value);
    }
    /**
     * @description
     * Method called with the "submit" event is triggered on the form.
     * Triggers the `ngSubmit` emitter to emit the "submit" event as its payload.
     *
     * @param $event The "submit" event object
     */
    onSubmit($event) {
      this.submitted = true;
      syncPendingControls(this.form, this.directives);
      this.ngSubmit.emit($event);
      // Forms with `method="dialog"` have some special behavior that won't reload the page and that
      // shouldn't be prevented. Note that we need to null check the `event` and the `target`, because
      // some internal apps call this method directly with the wrong arguments.
      return $event?.target?.method === 'dialog';
    }
    /**
     * @description
     * Method called when the "reset" event is triggered on the form.
     */
    onReset() {
      this.resetForm();
    }
    /**
     * @description
     * Resets the form to an initial value and resets its submitted status.
     *
     * @param value The new value for the form.
     */
    resetForm(value = undefined) {
      this.form.reset(value);
      this.submitted = false;
    }
    /** @internal */
    _updateDomValue() {
      this.directives.forEach(dir => {
        const oldCtrl = dir.control;
        const newCtrl = this.form.get(dir.path);
        if (oldCtrl !== newCtrl) {
          // Note: the value of the `dir.control` may not be defined, for example when it's a first
          // `FormControl` that is added to a `FormGroup` instance (via `addControl` call).
          cleanUpControl(oldCtrl || null, dir);
          // Check whether new control at the same location inside the corresponding `FormGroup` is an
          // instance of `FormControl` and perform control setup only if that's the case.
          // Note: we don't need to clear the list of directives (`this.directives`) here, it would be
          // taken care of in the `removeControl` method invoked when corresponding `formControlName`
          // directive instance is being removed (invoked from `FormControlName.ngOnDestroy`).
          if (isFormControl(newCtrl)) {
            setUpControl(newCtrl, dir, this.callSetDisabledState);
            dir.control = newCtrl;
          }
        }
      });
      this.form._updateTreeValidity({
        emitEvent: false
      });
    }
    _setUpFormContainer(dir) {
      const ctrl = this.form.get(dir.path);
      setUpFormContainer(ctrl, dir);
      // NOTE: this operation looks unnecessary in case no new validators were added in
      // `setUpFormContainer` call. Consider updating this code to match the logic in
      // `_cleanUpFormContainer` function.
      ctrl.updateValueAndValidity({
        emitEvent: false
      });
    }
    _cleanUpFormContainer(dir) {
      if (this.form) {
        const ctrl = this.form.get(dir.path);
        if (ctrl) {
          const isControlUpdated = cleanUpFormContainer(ctrl, dir);
          if (isControlUpdated) {
            // Run validity check only in case a control was updated (i.e. view validators were
            // removed) as removing view validators might cause validity to change.
            ctrl.updateValueAndValidity({
              emitEvent: false
            });
          }
        }
      }
    }
    _updateRegistrations() {
      this.form._registerOnCollectionChange(this._onCollectionChange);
      if (this._oldForm) {
        this._oldForm._registerOnCollectionChange(() => {});
      }
    }
    _updateValidators() {
      setUpValidators(this.form, this);
      if (this._oldForm) {
        cleanUpValidators(this._oldForm, this);
      }
    }
    _checkFormPresent() {
      if (!this.form && (typeof ngDevMode === 'undefined' || ngDevMode)) {
        throw missingFormException();
      }
    }
  }
  _class18 = FormGroupDirective;
  _class18.ɵfac = function _class18_Factory(t) {
    return new (t || _class18)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](NG_VALIDATORS, 10), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](NG_ASYNC_VALIDATORS, 10), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](CALL_SET_DISABLED_STATE, 8));
  };
  _class18.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
    type: _class18,
    selectors: [["", "formGroup", ""]],
    hostBindings: function _class18_HostBindings(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("submit", function _class18_submit_HostBindingHandler($event) {
          return ctx.onSubmit($event);
        })("reset", function _class18_reset_HostBindingHandler() {
          return ctx.onReset();
        });
      }
    },
    inputs: {
      form: ["formGroup", "form"]
    },
    outputs: {
      ngSubmit: "ngSubmit"
    },
    exportAs: ["ngForm"],
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([formDirectiveProvider]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵNgOnChangesFeature"]]
  });
  return FormGroupDirective;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
const formGroupNameProvider = {
  provide: ControlContainer,
  useExisting: /*#__PURE__*/(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(() => FormGroupName)
};
/**
 * @description
 *
 * Syncs a nested `FormGroup` or `FormRecord` to a DOM element.
 *
 * This directive can only be used with a parent `FormGroupDirective`.
 *
 * It accepts the string name of the nested `FormGroup` or `FormRecord` to link, and
 * looks for a `FormGroup` or `FormRecord` registered with that name in the parent
 * `FormGroup` instance you passed into `FormGroupDirective`.
 *
 * Use nested form groups to validate a sub-group of a
 * form separately from the rest or to group the values of certain
 * controls into their own nested object.
 *
 * @see [Reactive Forms Guide](guide/reactive-forms)
 *
 * @usageNotes
 *
 * ### Access the group by name
 *
 * The following example uses the `AbstractControl.get` method to access the
 * associated `FormGroup`
 *
 * ```ts
 *   this.form.get('name');
 * ```
 *
 * ### Access individual controls in the group
 *
 * The following example uses the `AbstractControl.get` method to access
 * individual controls within the group using dot syntax.
 *
 * ```ts
 *   this.form.get('name.first');
 * ```
 *
 * ### Register a nested `FormGroup`.
 *
 * The following example registers a nested *name* `FormGroup` within an existing `FormGroup`,
 * and provides methods to retrieve the nested `FormGroup` and individual controls.
 *
 * {@example forms/ts/nestedFormGroup/nested_form_group_example.ts region='Component'}
 *
 * @ngModule ReactiveFormsModule
 * @publicApi
 */
let FormGroupName = /*#__PURE__*/(() => {
  var _class19;
  class FormGroupName extends AbstractFormGroupDirective {
    constructor(parent, validators, asyncValidators) {
      super();
      /**
       * @description
       * Tracks the name of the `FormGroup` bound to the directive. The name corresponds
       * to a key in the parent `FormGroup` or `FormArray`.
       * Accepts a name as a string or a number.
       * The name in the form of a string is useful for individual forms,
       * while the numerical form allows for form groups to be bound
       * to indices when iterating over groups in a `FormArray`.
       */
      this.name = null;
      this._parent = parent;
      this._setValidators(validators);
      this._setAsyncValidators(asyncValidators);
    }
    /** @internal */
    _checkParentType() {
      if (_hasInvalidParent(this._parent) && (typeof ngDevMode === 'undefined' || ngDevMode)) {
        throw groupParentException();
      }
    }
  }
  _class19 = FormGroupName;
  _class19.ɵfac = function _class19_Factory(t) {
    return new (t || _class19)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](ControlContainer, 13), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](NG_VALIDATORS, 10), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](NG_ASYNC_VALIDATORS, 10));
  };
  _class19.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
    type: _class19,
    selectors: [["", "formGroupName", ""]],
    inputs: {
      name: ["formGroupName", "name"]
    },
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([formGroupNameProvider]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]]
  });
  return FormGroupName;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
const formArrayNameProvider = {
  provide: ControlContainer,
  useExisting: /*#__PURE__*/(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(() => FormArrayName)
};
/**
 * @description
 *
 * Syncs a nested `FormArray` to a DOM element.
 *
 * This directive is designed to be used with a parent `FormGroupDirective` (selector:
 * `[formGroup]`).
 *
 * It accepts the string name of the nested `FormArray` you want to link, and
 * will look for a `FormArray` registered with that name in the parent
 * `FormGroup` instance you passed into `FormGroupDirective`.
 *
 * @see [Reactive Forms Guide](guide/reactive-forms)
 * @see {@link AbstractControl}
 *
 * @usageNotes
 *
 * ### Example
 *
 * {@example forms/ts/nestedFormArray/nested_form_array_example.ts region='Component'}
 *
 * @ngModule ReactiveFormsModule
 * @publicApi
 */
let FormArrayName = /*#__PURE__*/(() => {
  var _class20;
  class FormArrayName extends ControlContainer {
    constructor(parent, validators, asyncValidators) {
      super();
      /**
       * @description
       * Tracks the name of the `FormArray` bound to the directive. The name corresponds
       * to a key in the parent `FormGroup` or `FormArray`.
       * Accepts a name as a string or a number.
       * The name in the form of a string is useful for individual forms,
       * while the numerical form allows for form arrays to be bound
       * to indices when iterating over arrays in a `FormArray`.
       */
      this.name = null;
      this._parent = parent;
      this._setValidators(validators);
      this._setAsyncValidators(asyncValidators);
    }
    /**
     * A lifecycle method called when the directive's inputs are initialized. For internal use only.
     * @throws If the directive does not have a valid parent.
     * @nodoc
     */
    ngOnInit() {
      this._checkParentType();
      this.formDirective.addFormArray(this);
    }
    /**
     * A lifecycle method called before the directive's instance is destroyed. For internal use only.
     * @nodoc
     */
    ngOnDestroy() {
      if (this.formDirective) {
        this.formDirective.removeFormArray(this);
      }
    }
    /**
     * @description
     * The `FormArray` bound to this directive.
     */
    get control() {
      return this.formDirective.getFormArray(this);
    }
    /**
     * @description
     * The top-level directive for this group if present, otherwise null.
     */
    get formDirective() {
      return this._parent ? this._parent.formDirective : null;
    }
    /**
     * @description
     * Returns an array that represents the path from the top-level form to this control.
     * Each index is the string name of the control on that level.
     */
    get path() {
      return controlPath(this.name == null ? this.name : this.name.toString(), this._parent);
    }
    _checkParentType() {
      if (_hasInvalidParent(this._parent) && (typeof ngDevMode === 'undefined' || ngDevMode)) {
        throw arrayParentException();
      }
    }
  }
  _class20 = FormArrayName;
  _class20.ɵfac = function _class20_Factory(t) {
    return new (t || _class20)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](ControlContainer, 13), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](NG_VALIDATORS, 10), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](NG_ASYNC_VALIDATORS, 10));
  };
  _class20.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
    type: _class20,
    selectors: [["", "formArrayName", ""]],
    inputs: {
      name: ["formArrayName", "name"]
    },
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([formArrayNameProvider]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]]
  });
  return FormArrayName;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
function _hasInvalidParent(parent) {
  return !(parent instanceof FormGroupName) && !(parent instanceof FormGroupDirective) && !(parent instanceof FormArrayName);
}
const controlNameBinding = {
  provide: NgControl,
  useExisting: /*#__PURE__*/(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(() => FormControlName)
};
/**
 * @description
 * Syncs a `FormControl` in an existing `FormGroup` to a form control
 * element by name.
 *
 * @see [Reactive Forms Guide](guide/reactive-forms)
 * @see {@link FormControl}
 * @see {@link AbstractControl}
 *
 * @usageNotes
 *
 * ### Register `FormControl` within a group
 *
 * The following example shows how to register multiple form controls within a form group
 * and set their value.
 *
 * {@example forms/ts/simpleFormGroup/simple_form_group_example.ts region='Component'}
 *
 * To see `formControlName` examples with different form control types, see:
 *
 * * Radio buttons: `RadioControlValueAccessor`
 * * Selects: `SelectControlValueAccessor`
 *
 * ### Use with ngModel is deprecated
 *
 * Support for using the `ngModel` input property and `ngModelChange` event with reactive
 * form directives has been deprecated in Angular v6 and is scheduled for removal in
 * a future version of Angular.
 *
 * For details, see [Deprecated features](guide/deprecations#ngmodel-with-reactive-forms).
 *
 * @ngModule ReactiveFormsModule
 * @publicApi
 */
let FormControlName = /*#__PURE__*/(() => {
  var _class21;
  class FormControlName extends NgControl {
    /**
     * @description
     * Triggers a warning in dev mode that this input should not be used with reactive forms.
     */
    set isDisabled(isDisabled) {
      if (typeof ngDevMode === 'undefined' || ngDevMode) {
        console.warn(disabledAttrWarning);
      }
    }
    /**
     * @description
     * Static property used to track whether any ngModel warnings have been sent across
     * all instances of FormControlName. Used to support warning config of "once".
     *
     * @internal
     */

    constructor(parent, validators, asyncValidators, valueAccessors, _ngModelWarningConfig) {
      super();
      this._ngModelWarningConfig = _ngModelWarningConfig;
      this._added = false;
      /**
       * @description
       * Tracks the name of the `FormControl` bound to the directive. The name corresponds
       * to a key in the parent `FormGroup` or `FormArray`.
       * Accepts a name as a string or a number.
       * The name in the form of a string is useful for individual forms,
       * while the numerical form allows for form controls to be bound
       * to indices when iterating over controls in a `FormArray`.
       */
      this.name = null;
      /** @deprecated as of v6 */
      this.update = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
      /**
       * @description
       * Instance property used to track whether an ngModel warning has been sent out for this
       * particular FormControlName instance. Used to support warning config of "always".
       *
       * @internal
       */
      this._ngModelWarningSent = false;
      this._parent = parent;
      this._setValidators(validators);
      this._setAsyncValidators(asyncValidators);
      this.valueAccessor = selectValueAccessor(this, valueAccessors);
    }
    /** @nodoc */
    ngOnChanges(changes) {
      if (!this._added) this._setUpControl();
      if (isPropertyUpdated(changes, this.viewModel)) {
        if (typeof ngDevMode === 'undefined' || ngDevMode) {
          _ngModelWarning('formControlName', FormControlName, this, this._ngModelWarningConfig);
        }
        this.viewModel = this.model;
        this.formDirective.updateModel(this, this.model);
      }
    }
    /** @nodoc */
    ngOnDestroy() {
      if (this.formDirective) {
        this.formDirective.removeControl(this);
      }
    }
    /**
     * @description
     * Sets the new value for the view model and emits an `ngModelChange` event.
     *
     * @param newValue The new value for the view model.
     */
    viewToModelUpdate(newValue) {
      this.viewModel = newValue;
      this.update.emit(newValue);
    }
    /**
     * @description
     * Returns an array that represents the path from the top-level form to this control.
     * Each index is the string name of the control on that level.
     */
    get path() {
      return controlPath(this.name == null ? this.name : this.name.toString(), this._parent);
    }
    /**
     * @description
     * The top-level directive for this group if present, otherwise null.
     */
    get formDirective() {
      return this._parent ? this._parent.formDirective : null;
    }
    _checkParentType() {
      if (typeof ngDevMode === 'undefined' || ngDevMode) {
        if (!(this._parent instanceof FormGroupName) && this._parent instanceof AbstractFormGroupDirective) {
          throw ngModelGroupException();
        } else if (!(this._parent instanceof FormGroupName) && !(this._parent instanceof FormGroupDirective) && !(this._parent instanceof FormArrayName)) {
          throw controlParentException();
        }
      }
    }
    _setUpControl() {
      this._checkParentType();
      this.control = this.formDirective.addControl(this);
      this._added = true;
    }
  }
  _class21 = FormControlName;
  _class21._ngModelWarningSentOnce = false;
  _class21.ɵfac = function _class21_Factory(t) {
    return new (t || _class21)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](ControlContainer, 13), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](NG_VALIDATORS, 10), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](NG_ASYNC_VALIDATORS, 10), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](NG_VALUE_ACCESSOR, 10), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](NG_MODEL_WITH_FORM_CONTROL_WARNING, 8));
  };
  _class21.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
    type: _class21,
    selectors: [["", "formControlName", ""]],
    inputs: {
      name: ["formControlName", "name"],
      isDisabled: ["disabled", "isDisabled"],
      model: ["ngModel", "model"]
    },
    outputs: {
      update: "ngModelChange"
    },
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([controlNameBinding]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵNgOnChangesFeature"]]
  });
  return FormControlName;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
const SELECT_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: /*#__PURE__*/(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(() => SelectControlValueAccessor),
  multi: true
};
function _buildValueString$1(id, value) {
  if (id == null) return `${value}`;
  if (value && typeof value === 'object') value = 'Object';
  return `${id}: ${value}`.slice(0, 50);
}
function _extractId$1(valueString) {
  return valueString.split(':')[0];
}
/**
 * @description
 * The `ControlValueAccessor` for writing select control values and listening to select control
 * changes. The value accessor is used by the `FormControlDirective`, `FormControlName`, and
 * `NgModel` directives.
 *
 * @usageNotes
 *
 * ### Using select controls in a reactive form
 *
 * The following examples show how to use a select control in a reactive form.
 *
 * {@example forms/ts/reactiveSelectControl/reactive_select_control_example.ts region='Component'}
 *
 * ### Using select controls in a template-driven form
 *
 * To use a select in a template-driven form, simply add an `ngModel` and a `name`
 * attribute to the main `<select>` tag.
 *
 * {@example forms/ts/selectControl/select_control_example.ts region='Component'}
 *
 * ### Customizing option selection
 *
 * Angular uses object identity to select option. It's possible for the identities of items
 * to change while the data does not. This can happen, for example, if the items are produced
 * from an RPC to the server, and that RPC is re-run. Even if the data hasn't changed, the
 * second response will produce objects with different identities.
 *
 * To customize the default option comparison algorithm, `<select>` supports `compareWith` input.
 * `compareWith` takes a **function** which has two arguments: `option1` and `option2`.
 * If `compareWith` is given, Angular selects option by the return value of the function.
 *
 * ```ts
 * const selectedCountriesControl = new FormControl();
 * ```
 *
 * ```
 * <select [compareWith]="compareFn"  [formControl]="selectedCountriesControl">
 *     <option *ngFor="let country of countries" [ngValue]="country">
 *         {{country.name}}
 *     </option>
 * </select>
 *
 * compareFn(c1: Country, c2: Country): boolean {
 *     return c1 && c2 ? c1.id === c2.id : c1 === c2;
 * }
 * ```
 *
 * **Note:** We listen to the 'change' event because 'input' events aren't fired
 * for selects in IE, see:
 * https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/input_event#browser_compatibility
 *
 * @ngModule ReactiveFormsModule
 * @ngModule FormsModule
 * @publicApi
 */
let SelectControlValueAccessor = /*#__PURE__*/(() => {
  var _class22;
  class SelectControlValueAccessor extends BuiltInControlValueAccessor {
    constructor() {
      super(...arguments);
      /** @internal */
      this._optionMap = new Map();
      /** @internal */
      this._idCounter = 0;
      this._compareWith = Object.is;
    }
    /**
     * @description
     * Tracks the option comparison algorithm for tracking identities when
     * checking for changes.
     */
    set compareWith(fn) {
      if (typeof fn !== 'function' && (typeof ngDevMode === 'undefined' || ngDevMode)) {
        throw new _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵRuntimeError"](1201 /* RuntimeErrorCode.COMPAREWITH_NOT_A_FN */, `compareWith must be a function, but received ${JSON.stringify(fn)}`);
      }
      this._compareWith = fn;
    }
    /**
     * Sets the "value" property on the select element.
     * @nodoc
     */
    writeValue(value) {
      this.value = value;
      const id = this._getOptionId(value);
      const valueString = _buildValueString$1(id, value);
      this.setProperty('value', valueString);
    }
    /**
     * Registers a function called when the control value changes.
     * @nodoc
     */
    registerOnChange(fn) {
      this.onChange = valueString => {
        this.value = this._getOptionValue(valueString);
        fn(this.value);
      };
    }
    /** @internal */
    _registerOption() {
      return (this._idCounter++).toString();
    }
    /** @internal */
    _getOptionId(value) {
      for (const id of this._optionMap.keys()) {
        if (this._compareWith(this._optionMap.get(id), value)) return id;
      }
      return null;
    }
    /** @internal */
    _getOptionValue(valueString) {
      const id = _extractId$1(valueString);
      return this._optionMap.has(id) ? this._optionMap.get(id) : valueString;
    }
  }
  _class22 = SelectControlValueAccessor;
  _class22.ɵfac = /* @__PURE__ */function () {
    let ɵ_class22_BaseFactory;
    return function _class22_Factory(t) {
      return (ɵ_class22_BaseFactory || (ɵ_class22_BaseFactory = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetInheritedFactory"](_class22)))(t || _class22);
    };
  }();
  _class22.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
    type: _class22,
    selectors: [["select", "formControlName", "", 3, "multiple", ""], ["select", "formControl", "", 3, "multiple", ""], ["select", "ngModel", "", 3, "multiple", ""]],
    hostBindings: function _class22_HostBindings(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("change", function _class22_change_HostBindingHandler($event) {
          return ctx.onChange($event.target.value);
        })("blur", function _class22_blur_HostBindingHandler() {
          return ctx.onTouched();
        });
      }
    },
    inputs: {
      compareWith: "compareWith"
    },
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([SELECT_VALUE_ACCESSOR]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]]
  });
  return SelectControlValueAccessor;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
/**
 * @description
 * Marks `<option>` as dynamic, so Angular can be notified when options change.
 *
 * @see {@link SelectControlValueAccessor}
 *
 * @ngModule ReactiveFormsModule
 * @ngModule FormsModule
 * @publicApi
 */
let NgSelectOption = /*#__PURE__*/(() => {
  var _class23;
  class NgSelectOption {
    constructor(_element, _renderer, _select) {
      this._element = _element;
      this._renderer = _renderer;
      this._select = _select;
      if (this._select) this.id = this._select._registerOption();
    }
    /**
     * @description
     * Tracks the value bound to the option element. Unlike the value binding,
     * ngValue supports binding to objects.
     */
    set ngValue(value) {
      if (this._select == null) return;
      this._select._optionMap.set(this.id, value);
      this._setElementValue(_buildValueString$1(this.id, value));
      this._select.writeValue(this._select.value);
    }
    /**
     * @description
     * Tracks simple string values bound to the option element.
     * For objects, use the `ngValue` input binding.
     */
    set value(value) {
      this._setElementValue(value);
      if (this._select) this._select.writeValue(this._select.value);
    }
    /** @internal */
    _setElementValue(value) {
      this._renderer.setProperty(this._element.nativeElement, 'value', value);
    }
    /** @nodoc */
    ngOnDestroy() {
      if (this._select) {
        this._select._optionMap.delete(this.id);
        this._select.writeValue(this._select.value);
      }
    }
  }
  _class23 = NgSelectOption;
  _class23.ɵfac = function _class23_Factory(t) {
    return new (t || _class23)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.Renderer2), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](SelectControlValueAccessor, 9));
  };
  _class23.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
    type: _class23,
    selectors: [["option"]],
    inputs: {
      ngValue: "ngValue",
      value: "value"
    }
  });
  return NgSelectOption;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
const SELECT_MULTIPLE_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: /*#__PURE__*/(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(() => SelectMultipleControlValueAccessor),
  multi: true
};
function _buildValueString(id, value) {
  if (id == null) return `${value}`;
  if (typeof value === 'string') value = `'${value}'`;
  if (value && typeof value === 'object') value = 'Object';
  return `${id}: ${value}`.slice(0, 50);
}
function _extractId(valueString) {
  return valueString.split(':')[0];
}
/** Mock interface for HTMLCollection */
class HTMLCollection {}
/**
 * @description
 * The `ControlValueAccessor` for writing multi-select control values and listening to multi-select
 * control changes. The value accessor is used by the `FormControlDirective`, `FormControlName`, and
 * `NgModel` directives.
 *
 * @see {@link SelectControlValueAccessor}
 *
 * @usageNotes
 *
 * ### Using a multi-select control
 *
 * The follow example shows you how to use a multi-select control with a reactive form.
 *
 * ```ts
 * const countryControl = new FormControl();
 * ```
 *
 * ```
 * <select multiple name="countries" [formControl]="countryControl">
 *   <option *ngFor="let country of countries" [ngValue]="country">
 *     {{ country.name }}
 *   </option>
 * </select>
 * ```
 *
 * ### Customizing option selection
 *
 * To customize the default option comparison algorithm, `<select>` supports `compareWith` input.
 * See the `SelectControlValueAccessor` for usage.
 *
 * @ngModule ReactiveFormsModule
 * @ngModule FormsModule
 * @publicApi
 */
let SelectMultipleControlValueAccessor = /*#__PURE__*/(() => {
  var _class24;
  class SelectMultipleControlValueAccessor extends BuiltInControlValueAccessor {
    constructor() {
      super(...arguments);
      /** @internal */
      this._optionMap = new Map();
      /** @internal */
      this._idCounter = 0;
      this._compareWith = Object.is;
    }
    /**
     * @description
     * Tracks the option comparison algorithm for tracking identities when
     * checking for changes.
     */
    set compareWith(fn) {
      if (typeof fn !== 'function' && (typeof ngDevMode === 'undefined' || ngDevMode)) {
        throw new _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵRuntimeError"](1201 /* RuntimeErrorCode.COMPAREWITH_NOT_A_FN */, `compareWith must be a function, but received ${JSON.stringify(fn)}`);
      }
      this._compareWith = fn;
    }
    /**
     * Sets the "value" property on one or of more of the select's options.
     * @nodoc
     */
    writeValue(value) {
      this.value = value;
      let optionSelectedStateSetter;
      if (Array.isArray(value)) {
        // convert values to ids
        const ids = value.map(v => this._getOptionId(v));
        optionSelectedStateSetter = (opt, o) => {
          opt._setSelected(ids.indexOf(o.toString()) > -1);
        };
      } else {
        optionSelectedStateSetter = (opt, o) => {
          opt._setSelected(false);
        };
      }
      this._optionMap.forEach(optionSelectedStateSetter);
    }
    /**
     * Registers a function called when the control value changes
     * and writes an array of the selected options.
     * @nodoc
     */
    registerOnChange(fn) {
      this.onChange = element => {
        const selected = [];
        const selectedOptions = element.selectedOptions;
        if (selectedOptions !== undefined) {
          const options = selectedOptions;
          for (let i = 0; i < options.length; i++) {
            const opt = options[i];
            const val = this._getOptionValue(opt.value);
            selected.push(val);
          }
        }
        // Degrade to use `options` when `selectedOptions` property is not available.
        // Note: the `selectedOptions` is available in all supported browsers, but the Domino lib
        // doesn't have it currently, see https://github.com/fgnass/domino/issues/177.
        else {
          const options = element.options;
          for (let i = 0; i < options.length; i++) {
            const opt = options[i];
            if (opt.selected) {
              const val = this._getOptionValue(opt.value);
              selected.push(val);
            }
          }
        }
        this.value = selected;
        fn(selected);
      };
    }
    /** @internal */
    _registerOption(value) {
      const id = (this._idCounter++).toString();
      this._optionMap.set(id, value);
      return id;
    }
    /** @internal */
    _getOptionId(value) {
      for (const id of this._optionMap.keys()) {
        if (this._compareWith(this._optionMap.get(id)._value, value)) return id;
      }
      return null;
    }
    /** @internal */
    _getOptionValue(valueString) {
      const id = _extractId(valueString);
      return this._optionMap.has(id) ? this._optionMap.get(id)._value : valueString;
    }
  }
  _class24 = SelectMultipleControlValueAccessor;
  _class24.ɵfac = /* @__PURE__ */function () {
    let ɵ_class24_BaseFactory;
    return function _class24_Factory(t) {
      return (ɵ_class24_BaseFactory || (ɵ_class24_BaseFactory = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetInheritedFactory"](_class24)))(t || _class24);
    };
  }();
  _class24.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
    type: _class24,
    selectors: [["select", "multiple", "", "formControlName", ""], ["select", "multiple", "", "formControl", ""], ["select", "multiple", "", "ngModel", ""]],
    hostBindings: function _class24_HostBindings(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("change", function _class24_change_HostBindingHandler($event) {
          return ctx.onChange($event.target);
        })("blur", function _class24_blur_HostBindingHandler() {
          return ctx.onTouched();
        });
      }
    },
    inputs: {
      compareWith: "compareWith"
    },
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([SELECT_MULTIPLE_VALUE_ACCESSOR]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]]
  });
  return SelectMultipleControlValueAccessor;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
/**
 * @description
 * Marks `<option>` as dynamic, so Angular can be notified when options change.
 *
 * @see {@link SelectMultipleControlValueAccessor}
 *
 * @ngModule ReactiveFormsModule
 * @ngModule FormsModule
 * @publicApi
 */
let ɵNgSelectMultipleOption = /*#__PURE__*/(() => {
  var _class25;
  class ɵNgSelectMultipleOption {
    constructor(_element, _renderer, _select) {
      this._element = _element;
      this._renderer = _renderer;
      this._select = _select;
      if (this._select) {
        this.id = this._select._registerOption(this);
      }
    }
    /**
     * @description
     * Tracks the value bound to the option element. Unlike the value binding,
     * ngValue supports binding to objects.
     */
    set ngValue(value) {
      if (this._select == null) return;
      this._value = value;
      this._setElementValue(_buildValueString(this.id, value));
      this._select.writeValue(this._select.value);
    }
    /**
     * @description
     * Tracks simple string values bound to the option element.
     * For objects, use the `ngValue` input binding.
     */
    set value(value) {
      if (this._select) {
        this._value = value;
        this._setElementValue(_buildValueString(this.id, value));
        this._select.writeValue(this._select.value);
      } else {
        this._setElementValue(value);
      }
    }
    /** @internal */
    _setElementValue(value) {
      this._renderer.setProperty(this._element.nativeElement, 'value', value);
    }
    /** @internal */
    _setSelected(selected) {
      this._renderer.setProperty(this._element.nativeElement, 'selected', selected);
    }
    /** @nodoc */
    ngOnDestroy() {
      if (this._select) {
        this._select._optionMap.delete(this.id);
        this._select.writeValue(this._select.value);
      }
    }
  }
  _class25 = ɵNgSelectMultipleOption;
  _class25.ɵfac = function _class25_Factory(t) {
    return new (t || _class25)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.Renderer2), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](SelectMultipleControlValueAccessor, 9));
  };
  _class25.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
    type: _class25,
    selectors: [["option"]],
    inputs: {
      ngValue: "ngValue",
      value: "value"
    }
  });
  return ɵNgSelectMultipleOption;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();

/**
 * Method that updates string to integer if not already a number
 *
 * @param value The value to convert to integer.
 * @returns value of parameter converted to number or integer.
 */
function toInteger(value) {
  return typeof value === 'number' ? value : parseInt(value, 10);
}
/**
 * Method that ensures that provided value is a float (and converts it to float if needed).
 *
 * @param value The value to convert to float.
 * @returns value of parameter converted to number or float.
 */
function toFloat(value) {
  return typeof value === 'number' ? value : parseFloat(value);
}
/**
 * A base class for Validator-based Directives. The class contains common logic shared across such
 * Directives.
 *
 * For internal use only, this class is not intended for use outside of the Forms package.
 */
let AbstractValidatorDirective = /*#__PURE__*/(() => {
  var _class26;
  class AbstractValidatorDirective {
    constructor() {
      this._validator = nullValidator;
    }
    /** @nodoc */
    ngOnChanges(changes) {
      if (this.inputName in changes) {
        const input = this.normalizeInput(changes[this.inputName].currentValue);
        this._enabled = this.enabled(input);
        this._validator = this._enabled ? this.createValidator(input) : nullValidator;
        if (this._onChange) {
          this._onChange();
        }
      }
    }
    /** @nodoc */
    validate(control) {
      return this._validator(control);
    }
    /** @nodoc */
    registerOnValidatorChange(fn) {
      this._onChange = fn;
    }
    /**
     * @description
     * Determines whether this validator should be active or not based on an input.
     * Base class implementation checks whether an input is defined (if the value is different from
     * `null` and `undefined`). Validator classes that extend this base class can override this
     * function with the logic specific to a particular validator directive.
     */
    enabled(input) {
      return input != null /* both `null` and `undefined` */;
    }
  }
  _class26 = AbstractValidatorDirective;
  _class26.ɵfac = function _class26_Factory(t) {
    return new (t || _class26)();
  };
  _class26.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
    type: _class26,
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵNgOnChangesFeature"]]
  });
  return AbstractValidatorDirective;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
/**
 * @description
 * Provider which adds `MaxValidator` to the `NG_VALIDATORS` multi-provider list.
 */
const MAX_VALIDATOR = {
  provide: NG_VALIDATORS,
  useExisting: /*#__PURE__*/(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(() => MaxValidator),
  multi: true
};
/**
 * A directive which installs the {@link MaxValidator} for any `formControlName`,
 * `formControl`, or control with `ngModel` that also has a `max` attribute.
 *
 * @see [Form Validation](guide/form-validation)
 *
 * @usageNotes
 *
 * ### Adding a max validator
 *
 * The following example shows how to add a max validator to an input attached to an
 * ngModel binding.
 *
 * ```html
 * <input type="number" ngModel max="4">
 * ```
 *
 * @ngModule ReactiveFormsModule
 * @ngModule FormsModule
 * @publicApi
 */
let MaxValidator = /*#__PURE__*/(() => {
  var _class27;
  class MaxValidator extends AbstractValidatorDirective {
    constructor() {
      super(...arguments);
      /** @internal */
      this.inputName = 'max';
      /** @internal */
      this.normalizeInput = input => toFloat(input);
      /** @internal */
      this.createValidator = max => maxValidator(max);
    }
  }
  _class27 = MaxValidator;
  _class27.ɵfac = /* @__PURE__ */function () {
    let ɵ_class27_BaseFactory;
    return function _class27_Factory(t) {
      return (ɵ_class27_BaseFactory || (ɵ_class27_BaseFactory = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetInheritedFactory"](_class27)))(t || _class27);
    };
  }();
  _class27.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
    type: _class27,
    selectors: [["input", "type", "number", "max", "", "formControlName", ""], ["input", "type", "number", "max", "", "formControl", ""], ["input", "type", "number", "max", "", "ngModel", ""]],
    hostVars: 1,
    hostBindings: function _class27_HostBindings(rf, ctx) {
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattribute"]("max", ctx._enabled ? ctx.max : null);
      }
    },
    inputs: {
      max: "max"
    },
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([MAX_VALIDATOR]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]]
  });
  return MaxValidator;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
/**
 * @description
 * Provider which adds `MinValidator` to the `NG_VALIDATORS` multi-provider list.
 */
const MIN_VALIDATOR = {
  provide: NG_VALIDATORS,
  useExisting: /*#__PURE__*/(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(() => MinValidator),
  multi: true
};
/**
 * A directive which installs the {@link MinValidator} for any `formControlName`,
 * `formControl`, or control with `ngModel` that also has a `min` attribute.
 *
 * @see [Form Validation](guide/form-validation)
 *
 * @usageNotes
 *
 * ### Adding a min validator
 *
 * The following example shows how to add a min validator to an input attached to an
 * ngModel binding.
 *
 * ```html
 * <input type="number" ngModel min="4">
 * ```
 *
 * @ngModule ReactiveFormsModule
 * @ngModule FormsModule
 * @publicApi
 */
let MinValidator = /*#__PURE__*/(() => {
  var _class28;
  class MinValidator extends AbstractValidatorDirective {
    constructor() {
      super(...arguments);
      /** @internal */
      this.inputName = 'min';
      /** @internal */
      this.normalizeInput = input => toFloat(input);
      /** @internal */
      this.createValidator = min => minValidator(min);
    }
  }
  _class28 = MinValidator;
  _class28.ɵfac = /* @__PURE__ */function () {
    let ɵ_class28_BaseFactory;
    return function _class28_Factory(t) {
      return (ɵ_class28_BaseFactory || (ɵ_class28_BaseFactory = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetInheritedFactory"](_class28)))(t || _class28);
    };
  }();
  _class28.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
    type: _class28,
    selectors: [["input", "type", "number", "min", "", "formControlName", ""], ["input", "type", "number", "min", "", "formControl", ""], ["input", "type", "number", "min", "", "ngModel", ""]],
    hostVars: 1,
    hostBindings: function _class28_HostBindings(rf, ctx) {
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattribute"]("min", ctx._enabled ? ctx.min : null);
      }
    },
    inputs: {
      min: "min"
    },
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([MIN_VALIDATOR]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]]
  });
  return MinValidator;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
/**
 * @description
 * Provider which adds `RequiredValidator` to the `NG_VALIDATORS` multi-provider list.
 */
const REQUIRED_VALIDATOR = {
  provide: NG_VALIDATORS,
  useExisting: /*#__PURE__*/(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(() => RequiredValidator),
  multi: true
};
/**
 * @description
 * Provider which adds `CheckboxRequiredValidator` to the `NG_VALIDATORS` multi-provider list.
 */
const CHECKBOX_REQUIRED_VALIDATOR = {
  provide: NG_VALIDATORS,
  useExisting: /*#__PURE__*/(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(() => CheckboxRequiredValidator),
  multi: true
};
/**
 * @description
 * A directive that adds the `required` validator to any controls marked with the
 * `required` attribute. The directive is provided with the `NG_VALIDATORS` multi-provider list.
 *
 * @see [Form Validation](guide/form-validation)
 *
 * @usageNotes
 *
 * ### Adding a required validator using template-driven forms
 *
 * ```
 * <input name="fullName" ngModel required>
 * ```
 *
 * @ngModule FormsModule
 * @ngModule ReactiveFormsModule
 * @publicApi
 */
let RequiredValidator = /*#__PURE__*/(() => {
  var _class29;
  class RequiredValidator extends AbstractValidatorDirective {
    constructor() {
      super(...arguments);
      /** @internal */
      this.inputName = 'required';
      /** @internal */
      this.normalizeInput = _angular_core__WEBPACK_IMPORTED_MODULE_0__.booleanAttribute;
      /** @internal */
      this.createValidator = input => requiredValidator;
    }
    /** @nodoc */
    enabled(input) {
      return input;
    }
  }
  _class29 = RequiredValidator;
  _class29.ɵfac = /* @__PURE__ */function () {
    let ɵ_class29_BaseFactory;
    return function _class29_Factory(t) {
      return (ɵ_class29_BaseFactory || (ɵ_class29_BaseFactory = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetInheritedFactory"](_class29)))(t || _class29);
    };
  }();
  _class29.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
    type: _class29,
    selectors: [["", "required", "", "formControlName", "", 3, "type", "checkbox"], ["", "required", "", "formControl", "", 3, "type", "checkbox"], ["", "required", "", "ngModel", "", 3, "type", "checkbox"]],
    hostVars: 1,
    hostBindings: function _class29_HostBindings(rf, ctx) {
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattribute"]("required", ctx._enabled ? "" : null);
      }
    },
    inputs: {
      required: "required"
    },
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([REQUIRED_VALIDATOR]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]]
  });
  return RequiredValidator;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
/**
 * A Directive that adds the `required` validator to checkbox controls marked with the
 * `required` attribute. The directive is provided with the `NG_VALIDATORS` multi-provider list.
 *
 * @see [Form Validation](guide/form-validation)
 *
 * @usageNotes
 *
 * ### Adding a required checkbox validator using template-driven forms
 *
 * The following example shows how to add a checkbox required validator to an input attached to an
 * ngModel binding.
 *
 * ```
 * <input type="checkbox" name="active" ngModel required>
 * ```
 *
 * @publicApi
 * @ngModule FormsModule
 * @ngModule ReactiveFormsModule
 */
let CheckboxRequiredValidator = /*#__PURE__*/(() => {
  var _class30;
  class CheckboxRequiredValidator extends RequiredValidator {
    constructor() {
      super(...arguments);
      /** @internal */
      this.createValidator = input => requiredTrueValidator;
    }
  }
  _class30 = CheckboxRequiredValidator;
  _class30.ɵfac = /* @__PURE__ */function () {
    let ɵ_class30_BaseFactory;
    return function _class30_Factory(t) {
      return (ɵ_class30_BaseFactory || (ɵ_class30_BaseFactory = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetInheritedFactory"](_class30)))(t || _class30);
    };
  }();
  _class30.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
    type: _class30,
    selectors: [["input", "type", "checkbox", "required", "", "formControlName", ""], ["input", "type", "checkbox", "required", "", "formControl", ""], ["input", "type", "checkbox", "required", "", "ngModel", ""]],
    hostVars: 1,
    hostBindings: function _class30_HostBindings(rf, ctx) {
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattribute"]("required", ctx._enabled ? "" : null);
      }
    },
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([CHECKBOX_REQUIRED_VALIDATOR]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]]
  });
  return CheckboxRequiredValidator;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
/**
 * @description
 * Provider which adds `EmailValidator` to the `NG_VALIDATORS` multi-provider list.
 */
const EMAIL_VALIDATOR = {
  provide: NG_VALIDATORS,
  useExisting: /*#__PURE__*/(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(() => EmailValidator),
  multi: true
};
/**
 * A directive that adds the `email` validator to controls marked with the
 * `email` attribute. The directive is provided with the `NG_VALIDATORS` multi-provider list.
 *
 * The email validation is based on the WHATWG HTML specification with some enhancements to
 * incorporate more RFC rules. More information can be found on the [Validators.email
 * page](api/forms/Validators#email).
 *
 * @see [Form Validation](guide/form-validation)
 *
 * @usageNotes
 *
 * ### Adding an email validator
 *
 * The following example shows how to add an email validator to an input attached to an ngModel
 * binding.
 *
 * ```
 * <input type="email" name="email" ngModel email>
 * <input type="email" name="email" ngModel email="true">
 * <input type="email" name="email" ngModel [email]="true">
 * ```
 *
 * @publicApi
 * @ngModule FormsModule
 * @ngModule ReactiveFormsModule
 */
let EmailValidator = /*#__PURE__*/(() => {
  var _class31;
  class EmailValidator extends AbstractValidatorDirective {
    constructor() {
      super(...arguments);
      /** @internal */
      this.inputName = 'email';
      /** @internal */
      this.normalizeInput = _angular_core__WEBPACK_IMPORTED_MODULE_0__.booleanAttribute;
      /** @internal */
      this.createValidator = input => emailValidator;
    }
    /** @nodoc */
    enabled(input) {
      return input;
    }
  }
  _class31 = EmailValidator;
  _class31.ɵfac = /* @__PURE__ */function () {
    let ɵ_class31_BaseFactory;
    return function _class31_Factory(t) {
      return (ɵ_class31_BaseFactory || (ɵ_class31_BaseFactory = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetInheritedFactory"](_class31)))(t || _class31);
    };
  }();
  _class31.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
    type: _class31,
    selectors: [["", "email", "", "formControlName", ""], ["", "email", "", "formControl", ""], ["", "email", "", "ngModel", ""]],
    inputs: {
      email: "email"
    },
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([EMAIL_VALIDATOR]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]]
  });
  return EmailValidator;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
/**
 * @description
 * Provider which adds `MinLengthValidator` to the `NG_VALIDATORS` multi-provider list.
 */
const MIN_LENGTH_VALIDATOR = {
  provide: NG_VALIDATORS,
  useExisting: /*#__PURE__*/(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(() => MinLengthValidator),
  multi: true
};
/**
 * A directive that adds minimum length validation to controls marked with the
 * `minlength` attribute. The directive is provided with the `NG_VALIDATORS` multi-provider list.
 *
 * @see [Form Validation](guide/form-validation)
 *
 * @usageNotes
 *
 * ### Adding a minimum length validator
 *
 * The following example shows how to add a minimum length validator to an input attached to an
 * ngModel binding.
 *
 * ```html
 * <input name="firstName" ngModel minlength="4">
 * ```
 *
 * @ngModule ReactiveFormsModule
 * @ngModule FormsModule
 * @publicApi
 */
let MinLengthValidator = /*#__PURE__*/(() => {
  var _class32;
  class MinLengthValidator extends AbstractValidatorDirective {
    constructor() {
      super(...arguments);
      /** @internal */
      this.inputName = 'minlength';
      /** @internal */
      this.normalizeInput = input => toInteger(input);
      /** @internal */
      this.createValidator = minlength => minLengthValidator(minlength);
    }
  }
  _class32 = MinLengthValidator;
  _class32.ɵfac = /* @__PURE__ */function () {
    let ɵ_class32_BaseFactory;
    return function _class32_Factory(t) {
      return (ɵ_class32_BaseFactory || (ɵ_class32_BaseFactory = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetInheritedFactory"](_class32)))(t || _class32);
    };
  }();
  _class32.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
    type: _class32,
    selectors: [["", "minlength", "", "formControlName", ""], ["", "minlength", "", "formControl", ""], ["", "minlength", "", "ngModel", ""]],
    hostVars: 1,
    hostBindings: function _class32_HostBindings(rf, ctx) {
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattribute"]("minlength", ctx._enabled ? ctx.minlength : null);
      }
    },
    inputs: {
      minlength: "minlength"
    },
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([MIN_LENGTH_VALIDATOR]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]]
  });
  return MinLengthValidator;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
/**
 * @description
 * Provider which adds `MaxLengthValidator` to the `NG_VALIDATORS` multi-provider list.
 */
const MAX_LENGTH_VALIDATOR = {
  provide: NG_VALIDATORS,
  useExisting: /*#__PURE__*/(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(() => MaxLengthValidator),
  multi: true
};
/**
 * A directive that adds max length validation to controls marked with the
 * `maxlength` attribute. The directive is provided with the `NG_VALIDATORS` multi-provider list.
 *
 * @see [Form Validation](guide/form-validation)
 *
 * @usageNotes
 *
 * ### Adding a maximum length validator
 *
 * The following example shows how to add a maximum length validator to an input attached to an
 * ngModel binding.
 *
 * ```html
 * <input name="firstName" ngModel maxlength="25">
 * ```
 *
 * @ngModule ReactiveFormsModule
 * @ngModule FormsModule
 * @publicApi
 */
let MaxLengthValidator = /*#__PURE__*/(() => {
  var _class33;
  class MaxLengthValidator extends AbstractValidatorDirective {
    constructor() {
      super(...arguments);
      /** @internal */
      this.inputName = 'maxlength';
      /** @internal */
      this.normalizeInput = input => toInteger(input);
      /** @internal */
      this.createValidator = maxlength => maxLengthValidator(maxlength);
    }
  }
  _class33 = MaxLengthValidator;
  _class33.ɵfac = /* @__PURE__ */function () {
    let ɵ_class33_BaseFactory;
    return function _class33_Factory(t) {
      return (ɵ_class33_BaseFactory || (ɵ_class33_BaseFactory = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetInheritedFactory"](_class33)))(t || _class33);
    };
  }();
  _class33.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
    type: _class33,
    selectors: [["", "maxlength", "", "formControlName", ""], ["", "maxlength", "", "formControl", ""], ["", "maxlength", "", "ngModel", ""]],
    hostVars: 1,
    hostBindings: function _class33_HostBindings(rf, ctx) {
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattribute"]("maxlength", ctx._enabled ? ctx.maxlength : null);
      }
    },
    inputs: {
      maxlength: "maxlength"
    },
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([MAX_LENGTH_VALIDATOR]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]]
  });
  return MaxLengthValidator;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
/**
 * @description
 * Provider which adds `PatternValidator` to the `NG_VALIDATORS` multi-provider list.
 */
const PATTERN_VALIDATOR = {
  provide: NG_VALIDATORS,
  useExisting: /*#__PURE__*/(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(() => PatternValidator),
  multi: true
};
/**
 * @description
 * A directive that adds regex pattern validation to controls marked with the
 * `pattern` attribute. The regex must match the entire control value.
 * The directive is provided with the `NG_VALIDATORS` multi-provider list.
 *
 * @see [Form Validation](guide/form-validation)
 *
 * @usageNotes
 *
 * ### Adding a pattern validator
 *
 * The following example shows how to add a pattern validator to an input attached to an
 * ngModel binding.
 *
 * ```html
 * <input name="firstName" ngModel pattern="[a-zA-Z ]*">
 * ```
 *
 * @ngModule ReactiveFormsModule
 * @ngModule FormsModule
 * @publicApi
 */
let PatternValidator = /*#__PURE__*/(() => {
  var _class34;
  class PatternValidator extends AbstractValidatorDirective {
    constructor() {
      super(...arguments);
      /** @internal */
      this.inputName = 'pattern';
      /** @internal */
      this.normalizeInput = input => input;
      /** @internal */
      this.createValidator = input => patternValidator(input);
    }
  }
  _class34 = PatternValidator;
  _class34.ɵfac = /* @__PURE__ */function () {
    let ɵ_class34_BaseFactory;
    return function _class34_Factory(t) {
      return (ɵ_class34_BaseFactory || (ɵ_class34_BaseFactory = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetInheritedFactory"](_class34)))(t || _class34);
    };
  }();
  _class34.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
    type: _class34,
    selectors: [["", "pattern", "", "formControlName", ""], ["", "pattern", "", "formControl", ""], ["", "pattern", "", "ngModel", ""]],
    hostVars: 1,
    hostBindings: function _class34_HostBindings(rf, ctx) {
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattribute"]("pattern", ctx._enabled ? ctx.pattern : null);
      }
    },
    inputs: {
      pattern: "pattern"
    },
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([PATTERN_VALIDATOR]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]]
  });
  return PatternValidator;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
const SHARED_FORM_DIRECTIVES = [ɵNgNoValidate, NgSelectOption, ɵNgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, RangeValueAccessor, CheckboxControlValueAccessor, SelectControlValueAccessor, SelectMultipleControlValueAccessor, RadioControlValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, MinLengthValidator, MaxLengthValidator, PatternValidator, CheckboxRequiredValidator, EmailValidator, MinValidator, MaxValidator];
const TEMPLATE_DRIVEN_DIRECTIVES = [NgModel, NgModelGroup, NgForm];
const REACTIVE_DRIVEN_DIRECTIVES = [FormControlDirective, FormGroupDirective, FormControlName, FormGroupName, FormArrayName];
/**
 * Internal module used for sharing directives between FormsModule and ReactiveFormsModule
 */
let ɵInternalFormsSharedModule = /*#__PURE__*/(() => {
  var _class35;
  class ɵInternalFormsSharedModule {}
  _class35 = ɵInternalFormsSharedModule;
  _class35.ɵfac = function _class35_Factory(t) {
    return new (t || _class35)();
  };
  _class35.ɵmod = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
    type: _class35
  });
  _class35.ɵinj = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
    imports: [RadioControlRegistryModule]
  });
  return ɵInternalFormsSharedModule;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();

/**
 * Tracks the value and validity state of an array of `FormControl`,
 * `FormGroup` or `FormArray` instances.
 *
 * A `FormArray` aggregates the values of each child `FormControl` into an array.
 * It calculates its status by reducing the status values of its children. For example, if one of
 * the controls in a `FormArray` is invalid, the entire array becomes invalid.
 *
 * `FormArray` accepts one generic argument, which is the type of the controls inside.
 * If you need a heterogenous array, use {@link UntypedFormArray}.
 *
 * `FormArray` is one of the four fundamental building blocks used to define forms in Angular,
 * along with `FormControl`, `FormGroup`, and `FormRecord`.
 *
 * @usageNotes
 *
 * ### Create an array of form controls
 *
 * ```
 * const arr = new FormArray([
 *   new FormControl('Nancy', Validators.minLength(2)),
 *   new FormControl('Drew'),
 * ]);
 *
 * console.log(arr.value);   // ['Nancy', 'Drew']
 * console.log(arr.status);  // 'VALID'
 * ```
 *
 * ### Create a form array with array-level validators
 *
 * You include array-level validators and async validators. These come in handy
 * when you want to perform validation that considers the value of more than one child
 * control.
 *
 * The two types of validators are passed in separately as the second and third arg
 * respectively, or together as part of an options object.
 *
 * ```
 * const arr = new FormArray([
 *   new FormControl('Nancy'),
 *   new FormControl('Drew')
 * ], {validators: myValidator, asyncValidators: myAsyncValidator});
 * ```
 *
 * ### Set the updateOn property for all controls in a form array
 *
 * The options object is used to set a default value for each child
 * control's `updateOn` property. If you set `updateOn` to `'blur'` at the
 * array level, all child controls default to 'blur', unless the child
 * has explicitly specified a different `updateOn` value.
 *
 * ```ts
 * const arr = new FormArray([
 *    new FormControl()
 * ], {updateOn: 'blur'});
 * ```
 *
 * ### Adding or removing controls from a form array
 *
 * To change the controls in the array, use the `push`, `insert`, `removeAt` or `clear` methods
 * in `FormArray` itself. These methods ensure the controls are properly tracked in the
 * form's hierarchy. Do not modify the array of `AbstractControl`s used to instantiate
 * the `FormArray` directly, as that result in strange and unexpected behavior such
 * as broken change detection.
 *
 * @publicApi
 */
class FormArray extends AbstractControl {
  /**
   * Creates a new `FormArray` instance.
   *
   * @param controls An array of child controls. Each child control is given an index
   * where it is registered.
   *
   * @param validatorOrOpts A synchronous validator function, or an array of
   * such functions, or an `AbstractControlOptions` object that contains validation functions
   * and a validation trigger.
   *
   * @param asyncValidator A single async validator or array of async validator functions
   *
   */
  constructor(controls, validatorOrOpts, asyncValidator) {
    super(pickValidators(validatorOrOpts), pickAsyncValidators(asyncValidator, validatorOrOpts));
    this.controls = controls;
    this._initObservables();
    this._setUpdateStrategy(validatorOrOpts);
    this._setUpControls();
    this.updateValueAndValidity({
      onlySelf: true,
      // If `asyncValidator` is present, it will trigger control status change from `PENDING` to
      // `VALID` or `INVALID`.
      // The status should be broadcasted via the `statusChanges` observable, so we set `emitEvent`
      // to `true` to allow that during the control creation process.
      emitEvent: !!this.asyncValidator
    });
  }
  /**
   * Get the `AbstractControl` at the given `index` in the array.
   *
   * @param index Index in the array to retrieve the control. If `index` is negative, it will wrap
   *     around from the back, and if index is greatly negative (less than `-length`), the result is
   * undefined. This behavior is the same as `Array.at(index)`.
   */
  at(index) {
    return this.controls[this._adjustIndex(index)];
  }
  /**
   * Insert a new `AbstractControl` at the end of the array.
   *
   * @param control Form control to be inserted
   * @param options Specifies whether this FormArray instance should emit events after a new
   *     control is added.
   * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
   * `valueChanges` observables emit events with the latest status and value when the control is
   * inserted. When false, no events are emitted.
   */
  push(control, options = {}) {
    this.controls.push(control);
    this._registerControl(control);
    this.updateValueAndValidity({
      emitEvent: options.emitEvent
    });
    this._onCollectionChange();
  }
  /**
   * Insert a new `AbstractControl` at the given `index` in the array.
   *
   * @param index Index in the array to insert the control. If `index` is negative, wraps around
   *     from the back. If `index` is greatly negative (less than `-length`), prepends to the array.
   * This behavior is the same as `Array.splice(index, 0, control)`.
   * @param control Form control to be inserted
   * @param options Specifies whether this FormArray instance should emit events after a new
   *     control is inserted.
   * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
   * `valueChanges` observables emit events with the latest status and value when the control is
   * inserted. When false, no events are emitted.
   */
  insert(index, control, options = {}) {
    this.controls.splice(index, 0, control);
    this._registerControl(control);
    this.updateValueAndValidity({
      emitEvent: options.emitEvent
    });
  }
  /**
   * Remove the control at the given `index` in the array.
   *
   * @param index Index in the array to remove the control.  If `index` is negative, wraps around
   *     from the back. If `index` is greatly negative (less than `-length`), removes the first
   *     element. This behavior is the same as `Array.splice(index, 1)`.
   * @param options Specifies whether this FormArray instance should emit events after a
   *     control is removed.
   * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
   * `valueChanges` observables emit events with the latest status and value when the control is
   * removed. When false, no events are emitted.
   */
  removeAt(index, options = {}) {
    // Adjust the index, then clamp it at no less than 0 to prevent undesired underflows.
    let adjustedIndex = this._adjustIndex(index);
    if (adjustedIndex < 0) adjustedIndex = 0;
    if (this.controls[adjustedIndex]) this.controls[adjustedIndex]._registerOnCollectionChange(() => {});
    this.controls.splice(adjustedIndex, 1);
    this.updateValueAndValidity({
      emitEvent: options.emitEvent
    });
  }
  /**
   * Replace an existing control.
   *
   * @param index Index in the array to replace the control. If `index` is negative, wraps around
   *     from the back. If `index` is greatly negative (less than `-length`), replaces the first
   *     element. This behavior is the same as `Array.splice(index, 1, control)`.
   * @param control The `AbstractControl` control to replace the existing control
   * @param options Specifies whether this FormArray instance should emit events after an
   *     existing control is replaced with a new one.
   * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
   * `valueChanges` observables emit events with the latest status and value when the control is
   * replaced with a new one. When false, no events are emitted.
   */
  setControl(index, control, options = {}) {
    // Adjust the index, then clamp it at no less than 0 to prevent undesired underflows.
    let adjustedIndex = this._adjustIndex(index);
    if (adjustedIndex < 0) adjustedIndex = 0;
    if (this.controls[adjustedIndex]) this.controls[adjustedIndex]._registerOnCollectionChange(() => {});
    this.controls.splice(adjustedIndex, 1);
    if (control) {
      this.controls.splice(adjustedIndex, 0, control);
      this._registerControl(control);
    }
    this.updateValueAndValidity({
      emitEvent: options.emitEvent
    });
    this._onCollectionChange();
  }
  /**
   * Length of the control array.
   */
  get length() {
    return this.controls.length;
  }
  /**
   * Sets the value of the `FormArray`. It accepts an array that matches
   * the structure of the control.
   *
   * This method performs strict checks, and throws an error if you try
   * to set the value of a control that doesn't exist or if you exclude the
   * value of a control.
   *
   * @usageNotes
   * ### Set the values for the controls in the form array
   *
   * ```
   * const arr = new FormArray([
   *   new FormControl(),
   *   new FormControl()
   * ]);
   * console.log(arr.value);   // [null, null]
   *
   * arr.setValue(['Nancy', 'Drew']);
   * console.log(arr.value);   // ['Nancy', 'Drew']
   * ```
   *
   * @param value Array of values for the controls
   * @param options Configure options that determine how the control propagates changes and
   * emits events after the value changes
   *
   * * `onlySelf`: When true, each change only affects this control, and not its parent. Default
   * is false.
   * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
   * `valueChanges`
   * observables emit events with the latest status and value when the control value is updated.
   * When false, no events are emitted.
   * The configuration options are passed to the {@link AbstractControl#updateValueAndValidity
   * updateValueAndValidity} method.
   */
  setValue(value, options = {}) {
    assertAllValuesPresent(this, false, value);
    value.forEach((newValue, index) => {
      assertControlPresent(this, false, index);
      this.at(index).setValue(newValue, {
        onlySelf: true,
        emitEvent: options.emitEvent
      });
    });
    this.updateValueAndValidity(options);
  }
  /**
   * Patches the value of the `FormArray`. It accepts an array that matches the
   * structure of the control, and does its best to match the values to the correct
   * controls in the group.
   *
   * It accepts both super-sets and sub-sets of the array without throwing an error.
   *
   * @usageNotes
   * ### Patch the values for controls in a form array
   *
   * ```
   * const arr = new FormArray([
   *    new FormControl(),
   *    new FormControl()
   * ]);
   * console.log(arr.value);   // [null, null]
   *
   * arr.patchValue(['Nancy']);
   * console.log(arr.value);   // ['Nancy', null]
   * ```
   *
   * @param value Array of latest values for the controls
   * @param options Configure options that determine how the control propagates changes and
   * emits events after the value changes
   *
   * * `onlySelf`: When true, each change only affects this control, and not its parent. Default
   * is false.
   * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
   * `valueChanges` observables emit events with the latest status and value when the control
   * value is updated. When false, no events are emitted. The configuration options are passed to
   * the {@link AbstractControl#updateValueAndValidity updateValueAndValidity} method.
   */
  patchValue(value, options = {}) {
    // Even though the `value` argument type doesn't allow `null` and `undefined` values, the
    // `patchValue` can be called recursively and inner data structures might have these values,
    // so we just ignore such cases when a field containing FormArray instance receives `null` or
    // `undefined` as a value.
    if (value == null /* both `null` and `undefined` */) return;
    value.forEach((newValue, index) => {
      if (this.at(index)) {
        this.at(index).patchValue(newValue, {
          onlySelf: true,
          emitEvent: options.emitEvent
        });
      }
    });
    this.updateValueAndValidity(options);
  }
  /**
   * Resets the `FormArray` and all descendants are marked `pristine` and `untouched`, and the
   * value of all descendants to null or null maps.
   *
   * You reset to a specific form state by passing in an array of states
   * that matches the structure of the control. The state is a standalone value
   * or a form state object with both a value and a disabled status.
   *
   * @usageNotes
   * ### Reset the values in a form array
   *
   * ```ts
   * const arr = new FormArray([
   *    new FormControl(),
   *    new FormControl()
   * ]);
   * arr.reset(['name', 'last name']);
   *
   * console.log(arr.value);  // ['name', 'last name']
   * ```
   *
   * ### Reset the values in a form array and the disabled status for the first control
   *
   * ```
   * arr.reset([
   *   {value: 'name', disabled: true},
   *   'last'
   * ]);
   *
   * console.log(arr.value);  // ['last']
   * console.log(arr.at(0).status);  // 'DISABLED'
   * ```
   *
   * @param value Array of values for the controls
   * @param options Configure options that determine how the control propagates changes and
   * emits events after the value changes
   *
   * * `onlySelf`: When true, each change only affects this control, and not its parent. Default
   * is false.
   * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
   * `valueChanges`
   * observables emit events with the latest status and value when the control is reset.
   * When false, no events are emitted.
   * The configuration options are passed to the {@link AbstractControl#updateValueAndValidity
   * updateValueAndValidity} method.
   */
  reset(value = [], options = {}) {
    this._forEachChild((control, index) => {
      control.reset(value[index], {
        onlySelf: true,
        emitEvent: options.emitEvent
      });
    });
    this._updatePristine(options);
    this._updateTouched(options);
    this.updateValueAndValidity(options);
  }
  /**
   * The aggregate value of the array, including any disabled controls.
   *
   * Reports all values regardless of disabled status.
   */
  getRawValue() {
    return this.controls.map(control => control.getRawValue());
  }
  /**
   * Remove all controls in the `FormArray`.
   *
   * @param options Specifies whether this FormArray instance should emit events after all
   *     controls are removed.
   * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
   * `valueChanges` observables emit events with the latest status and value when all controls
   * in this FormArray instance are removed. When false, no events are emitted.
   *
   * @usageNotes
   * ### Remove all elements from a FormArray
   *
   * ```ts
   * const arr = new FormArray([
   *    new FormControl(),
   *    new FormControl()
   * ]);
   * console.log(arr.length);  // 2
   *
   * arr.clear();
   * console.log(arr.length);  // 0
   * ```
   *
   * It's a simpler and more efficient alternative to removing all elements one by one:
   *
   * ```ts
   * const arr = new FormArray([
   *    new FormControl(),
   *    new FormControl()
   * ]);
   *
   * while (arr.length) {
   *    arr.removeAt(0);
   * }
   * ```
   */
  clear(options = {}) {
    if (this.controls.length < 1) return;
    this._forEachChild(control => control._registerOnCollectionChange(() => {}));
    this.controls.splice(0);
    this.updateValueAndValidity({
      emitEvent: options.emitEvent
    });
  }
  /**
   * Adjusts a negative index by summing it with the length of the array. For very negative
   * indices, the result may remain negative.
   * @internal
   */
  _adjustIndex(index) {
    return index < 0 ? index + this.length : index;
  }
  /** @internal */
  _syncPendingControls() {
    let subtreeUpdated = this.controls.reduce((updated, child) => {
      return child._syncPendingControls() ? true : updated;
    }, false);
    if (subtreeUpdated) this.updateValueAndValidity({
      onlySelf: true
    });
    return subtreeUpdated;
  }
  /** @internal */
  _forEachChild(cb) {
    this.controls.forEach((control, index) => {
      cb(control, index);
    });
  }
  /** @internal */
  _updateValue() {
    this.value = this.controls.filter(control => control.enabled || this.disabled).map(control => control.value);
  }
  /** @internal */
  _anyControls(condition) {
    return this.controls.some(control => control.enabled && condition(control));
  }
  /** @internal */
  _setUpControls() {
    this._forEachChild(control => this._registerControl(control));
  }
  /** @internal */
  _allControlsDisabled() {
    for (const control of this.controls) {
      if (control.enabled) return false;
    }
    return this.controls.length > 0 || this.disabled;
  }
  _registerControl(control) {
    control.setParent(this);
    control._registerOnCollectionChange(this._onCollectionChange);
  }
  /** @internal */
  _find(name) {
    return this.at(name) ?? null;
  }
}
const UntypedFormArray = FormArray;
/**
 * @description
 * Asserts that the given control is an instance of `FormArray`
 *
 * @publicApi
 */
const isFormArray = control => control instanceof FormArray;
function isAbstractControlOptions(options) {
  return !!options && (options.asyncValidators !== undefined || options.validators !== undefined || options.updateOn !== undefined);
}
// clang-format on
/**
 * @description
 * Creates an `AbstractControl` from a user-specified configuration.
 *
 * The `FormBuilder` provides syntactic sugar that shortens creating instances of a
 * `FormControl`, `FormGroup`, or `FormArray`. It reduces the amount of boilerplate needed to
 * build complex forms.
 *
 * @see [Reactive Forms Guide](guide/reactive-forms)
 *
 * @publicApi
 */
let FormBuilder = /*#__PURE__*/(() => {
  var _class36;
  class FormBuilder {
    constructor() {
      this.useNonNullable = false;
    }
    /**
     * @description
     * Returns a FormBuilder in which automatically constructed `FormControl` elements
     * have `{nonNullable: true}` and are non-nullable.
     *
     * **Constructing non-nullable controls**
     *
     * When constructing a control, it will be non-nullable, and will reset to its initial value.
     *
     * ```ts
     * let nnfb = new FormBuilder().nonNullable;
     * let name = nnfb.control('Alex'); // FormControl<string>
     * name.reset();
     * console.log(name); // 'Alex'
     * ```
     *
     * **Constructing non-nullable groups or arrays**
     *
     * When constructing a group or array, all automatically created inner controls will be
     * non-nullable, and will reset to their initial values.
     *
     * ```ts
     * let nnfb = new FormBuilder().nonNullable;
     * let name = nnfb.group({who: 'Alex'}); // FormGroup<{who: FormControl<string>}>
     * name.reset();
     * console.log(name); // {who: 'Alex'}
     * ```
     * **Constructing *nullable* fields on groups or arrays**
     *
     * It is still possible to have a nullable field. In particular, any `FormControl` which is
     * *already* constructed will not be altered. For example:
     *
     * ```ts
     * let nnfb = new FormBuilder().nonNullable;
     * // FormGroup<{who: FormControl<string|null>}>
     * let name = nnfb.group({who: new FormControl('Alex')});
     * name.reset(); console.log(name); // {who: null}
     * ```
     *
     * Because the inner control is constructed explicitly by the caller, the builder has
     * no control over how it is created, and cannot exclude the `null`.
     */
    get nonNullable() {
      const nnfb = new FormBuilder();
      nnfb.useNonNullable = true;
      return nnfb;
    }
    group(controls, options = null) {
      const reducedControls = this._reduceControls(controls);
      let newOptions = {};
      if (isAbstractControlOptions(options)) {
        // `options` are `AbstractControlOptions`
        newOptions = options;
      } else if (options !== null) {
        // `options` are legacy form group options
        newOptions.validators = options.validator;
        newOptions.asyncValidators = options.asyncValidator;
      }
      return new FormGroup(reducedControls, newOptions);
    }
    /**
     * @description
     * Constructs a new `FormRecord` instance. Accepts a single generic argument, which is an object
     * containing all the keys and corresponding inner control types.
     *
     * @param controls A collection of child controls. The key for each child is the name
     * under which it is registered.
     *
     * @param options Configuration options object for the `FormRecord`. The object should have the
     * `AbstractControlOptions` type and might contain the following fields:
     * * `validators`: A synchronous validator function, or an array of validator functions.
     * * `asyncValidators`: A single async validator or array of async validator functions.
     * * `updateOn`: The event upon which the control should be updated (options: 'change' | 'blur'
     * | submit').
     */
    record(controls, options = null) {
      const reducedControls = this._reduceControls(controls);
      // Cast to `any` because the inferred types are not as specific as Element.
      return new FormRecord(reducedControls, options);
    }
    /**
     * @description
     * Constructs a new `FormControl` with the given state, validators and options. Sets
     * `{nonNullable: true}` in the options to get a non-nullable control. Otherwise, the
     * control will be nullable. Accepts a single generic argument, which is the type  of the
     * control's value.
     *
     * @param formState Initializes the control with an initial state value, or
     * with an object that contains both a value and a disabled status.
     *
     * @param validatorOrOpts A synchronous validator function, or an array of
     * such functions, or a `FormControlOptions` object that contains
     * validation functions and a validation trigger.
     *
     * @param asyncValidator A single async validator or array of async validator
     * functions.
     *
     * @usageNotes
     *
     * ### Initialize a control as disabled
     *
     * The following example returns a control with an initial value in a disabled state.
     *
     * <code-example path="forms/ts/formBuilder/form_builder_example.ts" region="disabled-control">
     * </code-example>
     */
    control(formState, validatorOrOpts, asyncValidator) {
      let newOptions = {};
      if (!this.useNonNullable) {
        return new FormControl(formState, validatorOrOpts, asyncValidator);
      }
      if (isAbstractControlOptions(validatorOrOpts)) {
        // If the second argument is options, then they are copied.
        newOptions = validatorOrOpts;
      } else {
        // If the other arguments are validators, they are copied into an options object.
        newOptions.validators = validatorOrOpts;
        newOptions.asyncValidators = asyncValidator;
      }
      return new FormControl(formState, {
        ...newOptions,
        nonNullable: true
      });
    }
    /**
     * Constructs a new `FormArray` from the given array of configurations,
     * validators and options. Accepts a single generic argument, which is the type of each control
     * inside the array.
     *
     * @param controls An array of child controls or control configs. Each child control is given an
     *     index when it is registered.
     *
     * @param validatorOrOpts A synchronous validator function, or an array of such functions, or an
     *     `AbstractControlOptions` object that contains
     * validation functions and a validation trigger.
     *
     * @param asyncValidator A single async validator or array of async validator functions.
     */
    array(controls, validatorOrOpts, asyncValidator) {
      const createdControls = controls.map(c => this._createControl(c));
      // Cast to `any` because the inferred types are not as specific as Element.
      return new FormArray(createdControls, validatorOrOpts, asyncValidator);
    }
    /** @internal */
    _reduceControls(controls) {
      const createdControls = {};
      Object.keys(controls).forEach(controlName => {
        createdControls[controlName] = this._createControl(controls[controlName]);
      });
      return createdControls;
    }
    /** @internal */
    _createControl(controls) {
      if (controls instanceof FormControl) {
        return controls;
      } else if (controls instanceof AbstractControl) {
        // A control; just return it
        return controls;
      } else if (Array.isArray(controls)) {
        // ControlConfig Tuple
        const value = controls[0];
        const validator = controls.length > 1 ? controls[1] : null;
        const asyncValidator = controls.length > 2 ? controls[2] : null;
        return this.control(value, validator, asyncValidator);
      } else {
        // T or FormControlState<T>
        return this.control(controls);
      }
    }
  }
  _class36 = FormBuilder;
  _class36.ɵfac = function _class36_Factory(t) {
    return new (t || _class36)();
  };
  _class36.ɵprov = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
    token: _class36,
    factory: _class36.ɵfac,
    providedIn: 'root'
  });
  return FormBuilder;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
/**
 * @description
 * `NonNullableFormBuilder` is similar to {@link FormBuilder}, but automatically constructed
 * {@link FormControl} elements have `{nonNullable: true}` and are non-nullable.
 *
 * @publicApi
 */
let NonNullableFormBuilder = /*#__PURE__*/(() => {
  var _class37;
  class NonNullableFormBuilder {}
  _class37 = NonNullableFormBuilder;
  _class37.ɵfac = function _class37_Factory(t) {
    return new (t || _class37)();
  };
  _class37.ɵprov = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
    token: _class37,
    factory: function () {
      return (() => (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(FormBuilder).nonNullable)();
    },
    providedIn: 'root'
  });
  return NonNullableFormBuilder;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
/**
 * UntypedFormBuilder is the same as `FormBuilder`, but it provides untyped controls.
 */
let UntypedFormBuilder = /*#__PURE__*/(() => {
  var _class38;
  class UntypedFormBuilder extends FormBuilder {
    group(controlsConfig, options = null) {
      return super.group(controlsConfig, options);
    }
    /**
     * Like `FormBuilder#control`, except the resulting control is untyped.
     */
    control(formState, validatorOrOpts, asyncValidator) {
      return super.control(formState, validatorOrOpts, asyncValidator);
    }
    /**
     * Like `FormBuilder#array`, except the resulting array is untyped.
     */
    array(controlsConfig, validatorOrOpts, asyncValidator) {
      return super.array(controlsConfig, validatorOrOpts, asyncValidator);
    }
  }
  _class38 = UntypedFormBuilder;
  _class38.ɵfac = /* @__PURE__ */function () {
    let ɵ_class38_BaseFactory;
    return function _class38_Factory(t) {
      return (ɵ_class38_BaseFactory || (ɵ_class38_BaseFactory = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetInheritedFactory"](_class38)))(t || _class38);
    };
  }();
  _class38.ɵprov = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
    token: _class38,
    factory: _class38.ɵfac,
    providedIn: 'root'
  });
  return UntypedFormBuilder;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();

/**
 * @module
 * @description
 * Entry point for all public APIs of the forms package.
 */
/**
 * @publicApi
 */
const VERSION = /*#__PURE__*/new _angular_core__WEBPACK_IMPORTED_MODULE_0__.Version('16.2.1');

/**
 * Exports the required providers and directives for template-driven forms,
 * making them available for import by NgModules that import this module.
 *
 * Providers associated with this module:
 * * `RadioControlRegistry`
 *
 * @see [Forms Overview](/guide/forms-overview)
 * @see [Template-driven Forms Guide](/guide/forms)
 *
 * @publicApi
 */
let FormsModule = /*#__PURE__*/(() => {
  var _class39;
  class FormsModule {
    /**
     * @description
     * Provides options for configuring the forms module.
     *
     * @param opts An object of configuration options
     * * `callSetDisabledState` Configures whether to `always` call `setDisabledState`, which is more
     * correct, or to only call it `whenDisabled`, which is the legacy behavior.
     */
    static withConfig(opts) {
      return {
        ngModule: FormsModule,
        providers: [{
          provide: CALL_SET_DISABLED_STATE,
          useValue: opts.callSetDisabledState ?? setDisabledStateDefault
        }]
      };
    }
  }
  _class39 = FormsModule;
  _class39.ɵfac = function _class39_Factory(t) {
    return new (t || _class39)();
  };
  _class39.ɵmod = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
    type: _class39
  });
  _class39.ɵinj = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
    imports: [ɵInternalFormsSharedModule]
  });
  return FormsModule;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
/**
 * Exports the required infrastructure and directives for reactive forms,
 * making them available for import by NgModules that import this module.
 *
 * Providers associated with this module:
 * * `RadioControlRegistry`
 *
 * @see [Forms Overview](guide/forms-overview)
 * @see [Reactive Forms Guide](guide/reactive-forms)
 *
 * @publicApi
 */
let ReactiveFormsModule = /*#__PURE__*/(() => {
  var _class40;
  class ReactiveFormsModule {
    /**
     * @description
     * Provides options for configuring the reactive forms module.
     *
     * @param opts An object of configuration options
     * * `warnOnNgModelWithFormControl` Configures when to emit a warning when an `ngModel`
     * binding is used with reactive form directives.
     * * `callSetDisabledState` Configures whether to `always` call `setDisabledState`, which is more
     * correct, or to only call it `whenDisabled`, which is the legacy behavior.
     */
    static withConfig(opts) {
      return {
        ngModule: ReactiveFormsModule,
        providers: [{
          provide: NG_MODEL_WITH_FORM_CONTROL_WARNING,
          useValue: opts.warnOnNgModelWithFormControl ?? 'always'
        }, {
          provide: CALL_SET_DISABLED_STATE,
          useValue: opts.callSetDisabledState ?? setDisabledStateDefault
        }]
      };
    }
  }
  _class40 = ReactiveFormsModule;
  _class40.ɵfac = function _class40_Factory(t) {
    return new (t || _class40)();
  };
  _class40.ɵmod = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
    type: _class40
  });
  _class40.ɵinj = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
    imports: [ɵInternalFormsSharedModule]
  });
  return ReactiveFormsModule;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();

/**
 * @module
 * @description
 * This module is used for handling user input, by defining and building a `FormGroup` that
 * consists of `FormControl` objects, and mapping them onto the DOM. `FormControl`
 * objects can then be used to read information from the form DOM elements.
 *
 * Forms providers are not included in default providers; you must import these providers
 * explicitly.
 */

/**
 * @module
 * @description
 * Entry point for all public APIs of this package.
 */
// This file only reexports content of the `src` folder. Keep it that way.

// This file is not used to build this module. It is only used during editing

/**
 * Generated bundle index. Do not edit.
 */



/***/ }),

/***/ 29134:
/*!************************************************************!*\
  !*** ./node_modules/@angular/material/fesm2022/slider.mjs ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MatSlider: () => (/* binding */ MatSlider),
/* harmony export */   MatSliderChange: () => (/* binding */ MatSliderChange),
/* harmony export */   MatSliderModule: () => (/* binding */ MatSliderModule),
/* harmony export */   MatSliderRangeThumb: () => (/* binding */ MatSliderRangeThumb),
/* harmony export */   MatSliderThumb: () => (/* binding */ MatSliderThumb),
/* harmony export */   MatSliderVisualThumb: () => (/* binding */ MatSliderVisualThumb)
/* harmony export */ });
/* harmony import */ var _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/cdk/bidi */ 29988);
/* harmony import */ var _angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/cdk/coercion */ 45029);
/* harmony import */ var _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/cdk/platform */ 92237);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser/animations */ 59936);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/core */ 56381);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 34228);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ 8810);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ 85028);













/**
 * Injection token that can be used for a `MatSlider` to provide itself as a
 * parent to the `MatSliderThumb` and `MatSliderRangeThumb`.
 * Used primarily to avoid circular imports.
 * @docs-private
 */
const _c0 = ["knob"];
const _c1 = ["valueIndicatorContainer"];
function _class_div_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 4, 5)(2, "div", 6)(3, "span", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r0.valueIndicatorText);
  }
}
const _c2 = ["trackActive"];
function _class2_div_6_ng_container_2_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "div");
  }
  if (rf & 2) {
    const tickMark_r6 = ctx.$implicit;
    const i_r7 = ctx.index;
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassMap"](tickMark_r6 === 0 ? "mdc-slider__tick-mark--active" : "mdc-slider__tick-mark--inactive");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleProp"]("transform", ctx_r5._calcTickMarkTransform(i_r7));
  }
}
function _class2_div_6_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, _class2_div_6_ng_container_2_div_1_Template, 1, 4, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r4._tickMarks);
  }
}
function _class2_div_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 8, 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, _class2_div_6_ng_container_2_Template, 2, 1, "ng-container", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r1._cachedWidth);
  }
}
function _class2_mat_slider_visual_thumb_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "mat-slider-visual-thumb", 7);
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("discrete", ctx_r2.discrete)("thumbPosition", 1)("valueIndicatorText", ctx_r2.startValueIndicatorText);
  }
}
const _c3 = ["*"];
const MAT_SLIDER = /*#__PURE__*/new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken('_MatSlider');
/**
 * Injection token that can be used to query for a `MatSliderThumb`.
 * Used primarily to avoid circular imports.
 * @docs-private
 */
const MAT_SLIDER_THUMB = /*#__PURE__*/new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken('_MatSliderThumb');
/**
 * Injection token that can be used to query for a `MatSliderRangeThumb`.
 * Used primarily to avoid circular imports.
 * @docs-private
 */
const MAT_SLIDER_RANGE_THUMB = /*#__PURE__*/new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken('_MatSliderRangeThumb');
/**
 * Injection token that can be used to query for a `MatSliderVisualThumb`.
 * Used primarily to avoid circular imports.
 * @docs-private
 */
const MAT_SLIDER_VISUAL_THUMB = /*#__PURE__*/new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken('_MatSliderVisualThumb');
/**
 * A simple change event emitted by the MatSlider component.
 * @deprecated Use event bindings directly on the MatSliderThumbs for `change` and `input` events. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
class MatSliderChange {}

/**
 * The visual slider thumb.
 *
 * Handles the slider thumb ripple states (hover, focus, and active),
 * and displaying the value tooltip on discrete sliders.
 * @docs-private
 */
let MatSliderVisualThumb = /*#__PURE__*/(() => {
  var _class;
  class MatSliderVisualThumb {
    constructor(_cdr, _ngZone, _elementRef, _slider) {
      this._cdr = _cdr;
      this._ngZone = _ngZone;
      this._slider = _slider;
      /** Whether the slider thumb is currently being hovered. */
      this._isHovered = false;
      /** Whether the slider thumb is currently being pressed. */
      this._isActive = false;
      /** Whether the value indicator tooltip is visible. */
      this._isValueIndicatorVisible = false;
      this._onPointerMove = event => {
        if (this._sliderInput._isFocused) {
          return;
        }
        const rect = this._hostElement.getBoundingClientRect();
        const isHovered = this._slider._isCursorOnSliderThumb(event, rect);
        this._isHovered = isHovered;
        if (isHovered) {
          this._showHoverRipple();
        } else {
          this._hideRipple(this._hoverRippleRef);
        }
      };
      this._onMouseLeave = () => {
        this._isHovered = false;
        this._hideRipple(this._hoverRippleRef);
      };
      this._onFocus = () => {
        // We don't want to show the hover ripple on top of the focus ripple.
        // Happen when the users cursor is over a thumb and then the user tabs to it.
        this._hideRipple(this._hoverRippleRef);
        this._showFocusRipple();
        this._hostElement.classList.add('mdc-slider__thumb--focused');
      };
      this._onBlur = () => {
        // Happens when the user tabs away while still dragging a thumb.
        if (!this._isActive) {
          this._hideRipple(this._focusRippleRef);
        }
        // Happens when the user tabs away from a thumb but their cursor is still over it.
        if (this._isHovered) {
          this._showHoverRipple();
        }
        this._hostElement.classList.remove('mdc-slider__thumb--focused');
      };
      this._onDragStart = event => {
        if (event.button !== 0) {
          return;
        }
        this._isActive = true;
        this._showActiveRipple();
      };
      this._onDragEnd = () => {
        this._isActive = false;
        this._hideRipple(this._activeRippleRef);
        // Happens when the user starts dragging a thumb, tabs away, and then stops dragging.
        if (!this._sliderInput._isFocused) {
          this._hideRipple(this._focusRippleRef);
        }
      };
      this._hostElement = _elementRef.nativeElement;
    }
    ngAfterViewInit() {
      this._ripple.radius = 24;
      this._sliderInput = this._slider._getInput(this.thumbPosition);
      this._sliderInputEl = this._sliderInput._hostElement;
      const input = this._sliderInputEl;
      // These listeners don't update any data bindings so we bind them outside
      // of the NgZone to prevent Angular from needlessly running change detection.
      this._ngZone.runOutsideAngular(() => {
        input.addEventListener('pointermove', this._onPointerMove);
        input.addEventListener('pointerdown', this._onDragStart);
        input.addEventListener('pointerup', this._onDragEnd);
        input.addEventListener('pointerleave', this._onMouseLeave);
        input.addEventListener('focus', this._onFocus);
        input.addEventListener('blur', this._onBlur);
      });
    }
    ngOnDestroy() {
      const input = this._sliderInputEl;
      input.removeEventListener('pointermove', this._onPointerMove);
      input.removeEventListener('pointerdown', this._onDragStart);
      input.removeEventListener('pointerup', this._onDragEnd);
      input.removeEventListener('pointerleave', this._onMouseLeave);
      input.removeEventListener('focus', this._onFocus);
      input.removeEventListener('blur', this._onBlur);
    }
    /** Handles displaying the hover ripple. */
    _showHoverRipple() {
      if (!this._isShowingRipple(this._hoverRippleRef)) {
        this._hoverRippleRef = this._showRipple({
          enterDuration: 0,
          exitDuration: 0
        });
        this._hoverRippleRef?.element.classList.add('mat-mdc-slider-hover-ripple');
      }
    }
    /** Handles displaying the focus ripple. */
    _showFocusRipple() {
      // Show the focus ripple event if noop animations are enabled.
      if (!this._isShowingRipple(this._focusRippleRef)) {
        this._focusRippleRef = this._showRipple({
          enterDuration: 0,
          exitDuration: 0
        }, true);
        this._focusRippleRef?.element.classList.add('mat-mdc-slider-focus-ripple');
      }
    }
    /** Handles displaying the active ripple. */
    _showActiveRipple() {
      if (!this._isShowingRipple(this._activeRippleRef)) {
        this._activeRippleRef = this._showRipple({
          enterDuration: 225,
          exitDuration: 400
        });
        this._activeRippleRef?.element.classList.add('mat-mdc-slider-active-ripple');
      }
    }
    /** Whether the given rippleRef is currently fading in or visible. */
    _isShowingRipple(rippleRef) {
      return rippleRef?.state === 0 /* RippleState.FADING_IN */ || rippleRef?.state === 1 /* RippleState.VISIBLE */;
    }
    /** Manually launches the slider thumb ripple using the specified ripple animation config. */
    _showRipple(animation, ignoreGlobalRippleConfig) {
      if (this._slider.disabled) {
        return;
      }
      this._showValueIndicator();
      if (this._slider._isRange) {
        const sibling = this._slider._getThumb(this.thumbPosition === 1 /* _MatThumb.START */ ? 2 /* _MatThumb.END */ : 1 /* _MatThumb.START */);
        sibling._showValueIndicator();
      }
      if (this._slider._globalRippleOptions?.disabled && !ignoreGlobalRippleConfig) {
        return;
      }
      return this._ripple.launch({
        animation: this._slider._noopAnimations ? {
          enterDuration: 0,
          exitDuration: 0
        } : animation,
        centered: true,
        persistent: true
      });
    }
    /**
     * Fades out the given ripple.
     * Also hides the value indicator if no ripple is showing.
     */
    _hideRipple(rippleRef) {
      rippleRef?.fadeOut();
      if (this._isShowingAnyRipple()) {
        return;
      }
      if (!this._slider._isRange) {
        this._hideValueIndicator();
      }
      const sibling = this._getSibling();
      if (!sibling._isShowingAnyRipple()) {
        this._hideValueIndicator();
        sibling._hideValueIndicator();
      }
    }
    /** Shows the value indicator ui. */
    _showValueIndicator() {
      this._hostElement.classList.add('mdc-slider__thumb--with-indicator');
    }
    /** Hides the value indicator ui. */
    _hideValueIndicator() {
      this._hostElement.classList.remove('mdc-slider__thumb--with-indicator');
    }
    _getSibling() {
      return this._slider._getThumb(this.thumbPosition === 1 /* _MatThumb.START */ ? 2 /* _MatThumb.END */ : 1 /* _MatThumb.START */);
    }
    /** Gets the value indicator container's native HTML element. */
    _getValueIndicatorContainer() {
      return this._valueIndicatorContainer?.nativeElement;
    }
    /** Gets the native HTML element of the slider thumb knob. */
    _getKnob() {
      return this._knob.nativeElement;
    }
    _isShowingAnyRipple() {
      return this._isShowingRipple(this._hoverRippleRef) || this._isShowingRipple(this._focusRippleRef) || this._isShowingRipple(this._activeRippleRef);
    }
  }
  _class = MatSliderVisualThumb;
  _class.ɵfac = function _class_Factory(t) {
    return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.NgZone), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](MAT_SLIDER));
  };
  _class.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
    type: _class,
    selectors: [["mat-slider-visual-thumb"]],
    viewQuery: function _class_Query(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_angular_material_core__WEBPACK_IMPORTED_MODULE_1__.MatRipple, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c1, 5);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx._ripple = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx._knob = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx._valueIndicatorContainer = _t.first);
      }
    },
    hostAttrs: [1, "mdc-slider__thumb", "mat-mdc-slider-visual-thumb"],
    inputs: {
      discrete: "discrete",
      thumbPosition: "thumbPosition",
      valueIndicatorText: "valueIndicatorText"
    },
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([{
      provide: MAT_SLIDER_VISUAL_THUMB,
      useExisting: _class
    }])],
    decls: 4,
    vars: 2,
    consts: [["class", "mdc-slider__value-indicator-container", 4, "ngIf"], [1, "mdc-slider__thumb-knob"], ["knob", ""], ["matRipple", "", 1, "mat-mdc-focus-indicator", 3, "matRippleDisabled"], [1, "mdc-slider__value-indicator-container"], ["valueIndicatorContainer", ""], [1, "mdc-slider__value-indicator"], [1, "mdc-slider__value-indicator-text"]],
    template: function _class_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, _class_div_0_Template, 5, 1, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "div", 1, 2)(3, "div", 3);
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.discrete);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("matRippleDisabled", true);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.NgIf, _angular_material_core__WEBPACK_IMPORTED_MODULE_1__.MatRipple],
    styles: [".mat-mdc-slider-visual-thumb .mat-ripple{height:100%;width:100%}.mat-mdc-slider .mdc-slider__tick-marks{justify-content:start}.mat-mdc-slider .mdc-slider__tick-marks .mdc-slider__tick-mark--active,.mat-mdc-slider .mdc-slider__tick-marks .mdc-slider__tick-mark--inactive{position:absolute;left:2px}"],
    encapsulation: 2,
    changeDetection: 0
  });
  return MatSliderVisualThumb;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();

// TODO(wagnermaciel): maybe handle the following edge case:
// 1. start dragging discrete slider
// 2. tab to disable checkbox
// 3. without ending drag, disable the slider
// Boilerplate for applying mixins to MatSlider.
const _MatSliderMixinBase = /*#__PURE__*/(0,_angular_material_core__WEBPACK_IMPORTED_MODULE_1__.mixinColor)( /*#__PURE__*/(0,_angular_material_core__WEBPACK_IMPORTED_MODULE_1__.mixinDisableRipple)(class {
  constructor(_elementRef) {
    this._elementRef = _elementRef;
  }
}), 'primary');
/**
 * Allows users to select from a range of values by moving the slider thumb. It is similar in
 * behavior to the native `<input type="range">` element.
 */
let MatSlider = /*#__PURE__*/(() => {
  var _class2;
  class MatSlider extends _MatSliderMixinBase {
    /** Whether the slider is disabled. */
    get disabled() {
      return this._disabled;
    }
    set disabled(v) {
      this._disabled = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_3__.coerceBooleanProperty)(v);
      const endInput = this._getInput(2 /* _MatThumb.END */);
      const startInput = this._getInput(1 /* _MatThumb.START */);
      if (endInput) {
        endInput.disabled = this._disabled;
      }
      if (startInput) {
        startInput.disabled = this._disabled;
      }
    }
    /** Whether the slider displays a numeric value label upon pressing the thumb. */
    get discrete() {
      return this._discrete;
    }
    set discrete(v) {
      this._discrete = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_3__.coerceBooleanProperty)(v);
      this._updateValueIndicatorUIs();
    }
    /** Whether the slider displays tick marks along the slider track. */
    get showTickMarks() {
      return this._showTickMarks;
    }
    set showTickMarks(v) {
      this._showTickMarks = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_3__.coerceBooleanProperty)(v);
    }
    /** The minimum value that the slider can have. */
    get min() {
      return this._min;
    }
    set min(v) {
      const min = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_3__.coerceNumberProperty)(v, this._min);
      if (this._min !== min) {
        this._updateMin(min);
      }
    }
    _updateMin(min) {
      const prevMin = this._min;
      this._min = min;
      this._isRange ? this._updateMinRange({
        old: prevMin,
        new: min
      }) : this._updateMinNonRange(min);
      this._onMinMaxOrStepChange();
    }
    _updateMinRange(min) {
      const endInput = this._getInput(2 /* _MatThumb.END */);
      const startInput = this._getInput(1 /* _MatThumb.START */);
      const oldEndValue = endInput.value;
      const oldStartValue = startInput.value;
      startInput.min = min.new;
      endInput.min = Math.max(min.new, startInput.value);
      startInput.max = Math.min(endInput.max, endInput.value);
      startInput._updateWidthInactive();
      endInput._updateWidthInactive();
      min.new < min.old ? this._onTranslateXChangeBySideEffect(endInput, startInput) : this._onTranslateXChangeBySideEffect(startInput, endInput);
      if (oldEndValue !== endInput.value) {
        this._onValueChange(endInput);
      }
      if (oldStartValue !== startInput.value) {
        this._onValueChange(startInput);
      }
    }
    _updateMinNonRange(min) {
      const input = this._getInput(2 /* _MatThumb.END */);
      if (input) {
        const oldValue = input.value;
        input.min = min;
        input._updateThumbUIByValue();
        this._updateTrackUI(input);
        if (oldValue !== input.value) {
          this._onValueChange(input);
        }
      }
    }
    /** The maximum value that the slider can have. */
    get max() {
      return this._max;
    }
    set max(v) {
      const max = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_3__.coerceNumberProperty)(v, this._max);
      if (this._max !== max) {
        this._updateMax(max);
      }
    }
    _updateMax(max) {
      const prevMax = this._max;
      this._max = max;
      this._isRange ? this._updateMaxRange({
        old: prevMax,
        new: max
      }) : this._updateMaxNonRange(max);
      this._onMinMaxOrStepChange();
    }
    _updateMaxRange(max) {
      const endInput = this._getInput(2 /* _MatThumb.END */);
      const startInput = this._getInput(1 /* _MatThumb.START */);
      const oldEndValue = endInput.value;
      const oldStartValue = startInput.value;
      endInput.max = max.new;
      startInput.max = Math.min(max.new, endInput.value);
      endInput.min = startInput.value;
      endInput._updateWidthInactive();
      startInput._updateWidthInactive();
      max.new > max.old ? this._onTranslateXChangeBySideEffect(startInput, endInput) : this._onTranslateXChangeBySideEffect(endInput, startInput);
      if (oldEndValue !== endInput.value) {
        this._onValueChange(endInput);
      }
      if (oldStartValue !== startInput.value) {
        this._onValueChange(startInput);
      }
    }
    _updateMaxNonRange(max) {
      const input = this._getInput(2 /* _MatThumb.END */);
      if (input) {
        const oldValue = input.value;
        input.max = max;
        input._updateThumbUIByValue();
        this._updateTrackUI(input);
        if (oldValue !== input.value) {
          this._onValueChange(input);
        }
      }
    }
    /** The values at which the thumb will snap. */
    get step() {
      return this._step;
    }
    set step(v) {
      const step = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_3__.coerceNumberProperty)(v, this._step);
      if (this._step !== step) {
        this._updateStep(step);
      }
    }
    _updateStep(step) {
      this._step = step;
      this._isRange ? this._updateStepRange() : this._updateStepNonRange();
      this._onMinMaxOrStepChange();
    }
    _updateStepRange() {
      const endInput = this._getInput(2 /* _MatThumb.END */);
      const startInput = this._getInput(1 /* _MatThumb.START */);
      const oldEndValue = endInput.value;
      const oldStartValue = startInput.value;
      const prevStartValue = startInput.value;
      endInput.min = this._min;
      startInput.max = this._max;
      endInput.step = this._step;
      startInput.step = this._step;
      if (this._platform.SAFARI) {
        endInput.value = endInput.value;
        startInput.value = startInput.value;
      }
      endInput.min = Math.max(this._min, startInput.value);
      startInput.max = Math.min(this._max, endInput.value);
      startInput._updateWidthInactive();
      endInput._updateWidthInactive();
      endInput.value < prevStartValue ? this._onTranslateXChangeBySideEffect(startInput, endInput) : this._onTranslateXChangeBySideEffect(endInput, startInput);
      if (oldEndValue !== endInput.value) {
        this._onValueChange(endInput);
      }
      if (oldStartValue !== startInput.value) {
        this._onValueChange(startInput);
      }
    }
    _updateStepNonRange() {
      const input = this._getInput(2 /* _MatThumb.END */);
      if (input) {
        const oldValue = input.value;
        input.step = this._step;
        if (this._platform.SAFARI) {
          input.value = input.value;
        }
        input._updateThumbUIByValue();
        if (oldValue !== input.value) {
          this._onValueChange(input);
        }
      }
    }
    constructor(_ngZone, _cdr, elementRef, _dir, _globalRippleOptions, animationMode) {
      super(elementRef);
      this._ngZone = _ngZone;
      this._cdr = _cdr;
      this._dir = _dir;
      this._globalRippleOptions = _globalRippleOptions;
      this._disabled = false;
      this._discrete = false;
      this._showTickMarks = false;
      this._min = 0;
      this._max = 100;
      this._step = 1;
      /**
       * Function that will be used to format the value before it is displayed
       * in the thumb label. Can be used to format very large number in order
       * for them to fit into the slider thumb.
       */
      this.displayWith = value => `${value}`;
      this._rippleRadius = 24;
      // The value indicator tooltip text for the visual slider thumb(s).
      /** @docs-private */
      this.startValueIndicatorText = '';
      /** @docs-private */
      this.endValueIndicatorText = '';
      this._isRange = false;
      /** Whether the slider is rtl. */
      this._isRtl = false;
      this._hasViewInitialized = false;
      /**
       * The width of the tick mark track.
       * The tick mark track width is different from full track width
       */
      this._tickMarkTrackWidth = 0;
      this._hasAnimation = false;
      this._resizeTimer = null;
      this._platform = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__.Platform);
      /** The radius of the native slider's knob. AFAIK there is no way to avoid hardcoding this. */
      this._knobRadius = 8;
      /** Whether or not the slider thumbs overlap. */
      this._thumbsOverlap = false;
      this._noopAnimations = animationMode === 'NoopAnimations';
      this._dirChangeSubscription = this._dir.change.subscribe(() => this._onDirChange());
      this._isRtl = this._dir.value === 'rtl';
    }
    ngAfterViewInit() {
      if (this._platform.isBrowser) {
        this._updateDimensions();
      }
      const eInput = this._getInput(2 /* _MatThumb.END */);
      const sInput = this._getInput(1 /* _MatThumb.START */);
      this._isRange = !!eInput && !!sInput;
      this._cdr.detectChanges();
      if (typeof ngDevMode === 'undefined' || ngDevMode) {
        _validateInputs(this._isRange, this._getInput(2 /* _MatThumb.END */), this._getInput(1 /* _MatThumb.START */));
      }

      const thumb = this._getThumb(2 /* _MatThumb.END */);
      this._rippleRadius = thumb._ripple.radius;
      this._inputPadding = this._rippleRadius - this._knobRadius;
      this._inputOffset = this._knobRadius;
      this._isRange ? this._initUIRange(eInput, sInput) : this._initUINonRange(eInput);
      this._updateTrackUI(eInput);
      this._updateTickMarkUI();
      this._updateTickMarkTrackUI();
      this._observeHostResize();
      this._cdr.detectChanges();
    }
    _initUINonRange(eInput) {
      eInput.initProps();
      eInput.initUI();
      this._updateValueIndicatorUI(eInput);
      this._hasViewInitialized = true;
      eInput._updateThumbUIByValue();
    }
    _initUIRange(eInput, sInput) {
      eInput.initProps();
      eInput.initUI();
      sInput.initProps();
      sInput.initUI();
      eInput._updateMinMax();
      sInput._updateMinMax();
      eInput._updateStaticStyles();
      sInput._updateStaticStyles();
      this._updateValueIndicatorUIs();
      this._hasViewInitialized = true;
      eInput._updateThumbUIByValue();
      sInput._updateThumbUIByValue();
    }
    ngOnDestroy() {
      this._dirChangeSubscription.unsubscribe();
      this._resizeObserver?.disconnect();
      this._resizeObserver = null;
    }
    /** Handles updating the slider ui after a dir change. */
    _onDirChange() {
      this._isRtl = this._dir.value === 'rtl';
      this._isRange ? this._onDirChangeRange() : this._onDirChangeNonRange();
      this._updateTickMarkUI();
    }
    _onDirChangeRange() {
      const endInput = this._getInput(2 /* _MatThumb.END */);
      const startInput = this._getInput(1 /* _MatThumb.START */);
      endInput._setIsLeftThumb();
      startInput._setIsLeftThumb();
      endInput.translateX = endInput._calcTranslateXByValue();
      startInput.translateX = startInput._calcTranslateXByValue();
      endInput._updateStaticStyles();
      startInput._updateStaticStyles();
      endInput._updateWidthInactive();
      startInput._updateWidthInactive();
      endInput._updateThumbUIByValue();
      startInput._updateThumbUIByValue();
    }
    _onDirChangeNonRange() {
      const input = this._getInput(2 /* _MatThumb.END */);
      input._updateThumbUIByValue();
    }
    /** Starts observing and updating the slider if the host changes its size. */
    _observeHostResize() {
      if (typeof ResizeObserver === 'undefined' || !ResizeObserver) {
        return;
      }
      this._ngZone.runOutsideAngular(() => {
        this._resizeObserver = new ResizeObserver(() => {
          if (this._isActive()) {
            return;
          }
          if (this._resizeTimer) {
            clearTimeout(this._resizeTimer);
          }
          this._onResize();
        });
        this._resizeObserver.observe(this._elementRef.nativeElement);
      });
    }
    /** Whether any of the thumbs are currently active. */
    _isActive() {
      return this._getThumb(1 /* _MatThumb.START */)._isActive || this._getThumb(2 /* _MatThumb.END */)._isActive;
    }
    _getValue(thumbPosition = 2 /* _MatThumb.END */) {
      const input = this._getInput(thumbPosition);
      if (!input) {
        return this.min;
      }
      return input.value;
    }
    _skipUpdate() {
      return !!(this._getInput(1 /* _MatThumb.START */)?._skipUIUpdate || this._getInput(2 /* _MatThumb.END */)?._skipUIUpdate);
    }
    /** Stores the slider dimensions. */
    _updateDimensions() {
      this._cachedWidth = this._elementRef.nativeElement.offsetWidth;
      this._cachedLeft = this._elementRef.nativeElement.getBoundingClientRect().left;
    }
    /** Sets the styles for the active portion of the track. */
    _setTrackActiveStyles(styles) {
      const trackStyle = this._trackActive.nativeElement.style;
      trackStyle.left = styles.left;
      trackStyle.right = styles.right;
      trackStyle.transformOrigin = styles.transformOrigin;
      trackStyle.transform = styles.transform;
    }
    /** Returns the translateX positioning for a tick mark based on it's index. */
    _calcTickMarkTransform(index) {
      // TODO(wagnermaciel): See if we can avoid doing this and just using flex to position these.
      const translateX = index * (this._tickMarkTrackWidth / (this._tickMarks.length - 1));
      return `translateX(${translateX}px`;
    }
    // Handlers for updating the slider ui.
    _onTranslateXChange(source) {
      if (!this._hasViewInitialized) {
        return;
      }
      this._updateThumbUI(source);
      this._updateTrackUI(source);
      this._updateOverlappingThumbUI(source);
    }
    _onTranslateXChangeBySideEffect(input1, input2) {
      if (!this._hasViewInitialized) {
        return;
      }
      input1._updateThumbUIByValue();
      input2._updateThumbUIByValue();
    }
    _onValueChange(source) {
      if (!this._hasViewInitialized) {
        return;
      }
      this._updateValueIndicatorUI(source);
      this._updateTickMarkUI();
      this._cdr.detectChanges();
    }
    _onMinMaxOrStepChange() {
      if (!this._hasViewInitialized) {
        return;
      }
      this._updateTickMarkUI();
      this._updateTickMarkTrackUI();
      this._cdr.markForCheck();
    }
    _onResize() {
      if (!this._hasViewInitialized) {
        return;
      }
      this._updateDimensions();
      if (this._isRange) {
        const eInput = this._getInput(2 /* _MatThumb.END */);
        const sInput = this._getInput(1 /* _MatThumb.START */);
        eInput._updateThumbUIByValue();
        sInput._updateThumbUIByValue();
        eInput._updateStaticStyles();
        sInput._updateStaticStyles();
        eInput._updateMinMax();
        sInput._updateMinMax();
        eInput._updateWidthInactive();
        sInput._updateWidthInactive();
      } else {
        const eInput = this._getInput(2 /* _MatThumb.END */);
        if (eInput) {
          eInput._updateThumbUIByValue();
        }
      }
      this._updateTickMarkUI();
      this._updateTickMarkTrackUI();
      this._cdr.detectChanges();
    }
    /** Returns true if the slider knobs are overlapping one another. */
    _areThumbsOverlapping() {
      const startInput = this._getInput(1 /* _MatThumb.START */);
      const endInput = this._getInput(2 /* _MatThumb.END */);
      if (!startInput || !endInput) {
        return false;
      }
      return endInput.translateX - startInput.translateX < 20;
    }
    /**
     * Updates the class names of overlapping slider thumbs so
     * that the current active thumb is styled to be on "top".
     */
    _updateOverlappingThumbClassNames(source) {
      const sibling = source.getSibling();
      const sourceThumb = this._getThumb(source.thumbPosition);
      const siblingThumb = this._getThumb(sibling.thumbPosition);
      siblingThumb._hostElement.classList.remove('mdc-slider__thumb--top');
      sourceThumb._hostElement.classList.toggle('mdc-slider__thumb--top', this._thumbsOverlap);
    }
    /** Updates the UI of slider thumbs when they begin or stop overlapping. */
    _updateOverlappingThumbUI(source) {
      if (!this._isRange || this._skipUpdate()) {
        return;
      }
      if (this._thumbsOverlap !== this._areThumbsOverlapping()) {
        this._thumbsOverlap = !this._thumbsOverlap;
        this._updateOverlappingThumbClassNames(source);
      }
    }
    // _MatThumb styles update conditions
    //
    // 1. TranslateX, resize, or dir change
    //    - Reason: The thumb styles need to be updated according to the new translateX.
    // 2. Min, max, or step
    //    - Reason: The value may have silently changed.
    /** Updates the translateX of the given thumb. */
    _updateThumbUI(source) {
      if (this._skipUpdate()) {
        return;
      }
      const thumb = this._getThumb(source.thumbPosition === 2 /* _MatThumb.END */ ? 2 /* _MatThumb.END */ : 1 /* _MatThumb.START */);
      thumb._hostElement.style.transform = `translateX(${source.translateX}px)`;
    }
    // Value indicator text update conditions
    //
    // 1. Value
    //    - Reason: The value displayed needs to be updated.
    // 2. Min, max, or step
    //    - Reason: The value may have silently changed.
    /** Updates the value indicator tooltip ui for the given thumb. */
    _updateValueIndicatorUI(source) {
      if (this._skipUpdate()) {
        return;
      }
      const valuetext = this.displayWith(source.value);
      this._hasViewInitialized ? source._valuetext = valuetext : source._hostElement.setAttribute('aria-valuetext', valuetext);
      if (this.discrete) {
        source.thumbPosition === 1 /* _MatThumb.START */ ? this.startValueIndicatorText = valuetext : this.endValueIndicatorText = valuetext;
        const visualThumb = this._getThumb(source.thumbPosition);
        valuetext.length < 3 ? visualThumb._hostElement.classList.add('mdc-slider__thumb--short-value') : visualThumb._hostElement.classList.remove('mdc-slider__thumb--short-value');
      }
    }
    /** Updates all value indicator UIs in the slider. */
    _updateValueIndicatorUIs() {
      const eInput = this._getInput(2 /* _MatThumb.END */);
      const sInput = this._getInput(1 /* _MatThumb.START */);
      if (eInput) {
        this._updateValueIndicatorUI(eInput);
      }
      if (sInput) {
        this._updateValueIndicatorUI(sInput);
      }
    }
    // Update Tick Mark Track Width
    //
    // 1. Min, max, or step
    //    - Reason: The maximum reachable value may have changed.
    //    - Side note: The maximum reachable value is different from the maximum value set by the
    //      user. For example, a slider with [min: 5, max: 100, step: 10] would have a maximum
    //      reachable value of 95.
    // 2. Resize
    //    - Reason: The position for the maximum reachable value needs to be recalculated.
    /** Updates the width of the tick mark track. */
    _updateTickMarkTrackUI() {
      if (!this.showTickMarks || this._skipUpdate()) {
        return;
      }
      const step = this._step && this._step > 0 ? this._step : 1;
      const maxValue = Math.floor(this.max / step) * step;
      const percentage = (maxValue - this.min) / (this.max - this.min);
      this._tickMarkTrackWidth = this._cachedWidth * percentage - 6;
    }
    // Track active update conditions
    //
    // 1. TranslateX
    //    - Reason: The track active should line up with the new thumb position.
    // 2. Min or max
    //    - Reason #1: The 'active' percentage needs to be recalculated.
    //    - Reason #2: The value may have silently changed.
    // 3. Step
    //    - Reason: The value may have silently changed causing the thumb(s) to shift.
    // 4. Dir change
    //    - Reason: The track active will need to be updated according to the new thumb position(s).
    // 5. Resize
    //    - Reason: The total width the 'active' tracks translateX is based on has changed.
    /** Updates the scale on the active portion of the track. */
    _updateTrackUI(source) {
      if (this._skipUpdate()) {
        return;
      }
      this._isRange ? this._updateTrackUIRange(source) : this._updateTrackUINonRange(source);
    }
    _updateTrackUIRange(source) {
      const sibling = source.getSibling();
      if (!sibling || !this._cachedWidth) {
        return;
      }
      const activePercentage = Math.abs(sibling.translateX - source.translateX) / this._cachedWidth;
      if (source._isLeftThumb && this._cachedWidth) {
        this._setTrackActiveStyles({
          left: 'auto',
          right: `${this._cachedWidth - sibling.translateX}px`,
          transformOrigin: 'right',
          transform: `scaleX(${activePercentage})`
        });
      } else {
        this._setTrackActiveStyles({
          left: `${sibling.translateX}px`,
          right: 'auto',
          transformOrigin: 'left',
          transform: `scaleX(${activePercentage})`
        });
      }
    }
    _updateTrackUINonRange(source) {
      this._isRtl ? this._setTrackActiveStyles({
        left: 'auto',
        right: '0px',
        transformOrigin: 'right',
        transform: `scaleX(${1 - source.fillPercentage})`
      }) : this._setTrackActiveStyles({
        left: '0px',
        right: 'auto',
        transformOrigin: 'left',
        transform: `scaleX(${source.fillPercentage})`
      });
    }
    // Tick mark update conditions
    //
    // 1. Value
    //    - Reason: a tick mark which was once active might now be inactive or vice versa.
    // 2. Min, max, or step
    //    - Reason #1: the number of tick marks may have changed.
    //    - Reason #2: The value may have silently changed.
    /** Updates the dots along the slider track. */
    _updateTickMarkUI() {
      if (!this.showTickMarks || this.step === undefined || this.min === undefined || this.max === undefined) {
        return;
      }
      const step = this.step > 0 ? this.step : 1;
      this._isRange ? this._updateTickMarkUIRange(step) : this._updateTickMarkUINonRange(step);
      if (this._isRtl) {
        this._tickMarks.reverse();
      }
    }
    _updateTickMarkUINonRange(step) {
      const value = this._getValue();
      let numActive = Math.max(Math.round((value - this.min) / step), 0);
      let numInactive = Math.max(Math.round((this.max - value) / step), 0);
      this._isRtl ? numActive++ : numInactive++;
      this._tickMarks = Array(numActive).fill(0 /* _MatTickMark.ACTIVE */).concat(Array(numInactive).fill(1 /* _MatTickMark.INACTIVE */));
    }

    _updateTickMarkUIRange(step) {
      const endValue = this._getValue();
      const startValue = this._getValue(1 /* _MatThumb.START */);
      const numInactiveBeforeStartThumb = Math.max(Math.floor((startValue - this.min) / step), 0);
      const numActive = Math.max(Math.floor((endValue - startValue) / step) + 1, 0);
      const numInactiveAfterEndThumb = Math.max(Math.floor((this.max - endValue) / step), 0);
      this._tickMarks = Array(numInactiveBeforeStartThumb).fill(1 /* _MatTickMark.INACTIVE */).concat(Array(numActive).fill(0 /* _MatTickMark.ACTIVE */), Array(numInactiveAfterEndThumb).fill(1 /* _MatTickMark.INACTIVE */));
    }
    /** Gets the slider thumb input of the given thumb position. */
    _getInput(thumbPosition) {
      if (thumbPosition === 2 /* _MatThumb.END */ && this._input) {
        return this._input;
      }
      if (this._inputs?.length) {
        return thumbPosition === 1 /* _MatThumb.START */ ? this._inputs.first : this._inputs.last;
      }
      return;
    }
    /** Gets the slider thumb HTML input element of the given thumb position. */
    _getThumb(thumbPosition) {
      return thumbPosition === 2 /* _MatThumb.END */ ? this._thumbs?.last : this._thumbs?.first;
    }
    _setTransition(withAnimation) {
      this._hasAnimation = !this._platform.IOS && withAnimation && !this._noopAnimations;
      this._elementRef.nativeElement.classList.toggle('mat-mdc-slider-with-animation', this._hasAnimation);
    }
    /** Whether the given pointer event occurred within the bounds of the slider pointer's DOM Rect. */
    _isCursorOnSliderThumb(event, rect) {
      const radius = rect.width / 2;
      const centerX = rect.x + radius;
      const centerY = rect.y + radius;
      const dx = event.clientX - centerX;
      const dy = event.clientY - centerY;
      return Math.pow(dx, 2) + Math.pow(dy, 2) < Math.pow(radius, 2);
    }
  }
  _class2 = MatSlider;
  _class2.ɵfac = function _class2_Factory(t) {
    return new (t || _class2)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.NgZone), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_5__.Directionality, 8), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_core__WEBPACK_IMPORTED_MODULE_1__.MAT_RIPPLE_GLOBAL_OPTIONS, 8), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ANIMATION_MODULE_TYPE, 8));
  };
  _class2.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
    type: _class2,
    selectors: [["mat-slider"]],
    contentQueries: function _class2_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵcontentQuery"](dirIndex, MAT_SLIDER_THUMB, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵcontentQuery"](dirIndex, MAT_SLIDER_RANGE_THUMB, 4);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx._input = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx._inputs = _t);
      }
    },
    viewQuery: function _class2_Query(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c2, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](MAT_SLIDER_VISUAL_THUMB, 5);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx._trackActive = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx._thumbs = _t);
      }
    },
    hostAttrs: [1, "mat-mdc-slider", "mdc-slider"],
    hostVars: 10,
    hostBindings: function _class2_HostBindings(rf, ctx) {
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("mdc-slider--range", ctx._isRange)("mdc-slider--disabled", ctx.disabled)("mdc-slider--discrete", ctx.discrete)("mdc-slider--tick-marks", ctx.showTickMarks)("_mat-animation-noopable", ctx._noopAnimations);
      }
    },
    inputs: {
      color: "color",
      disableRipple: "disableRipple",
      disabled: "disabled",
      discrete: "discrete",
      showTickMarks: "showTickMarks",
      min: "min",
      max: "max",
      step: "step",
      displayWith: "displayWith"
    },
    exportAs: ["matSlider"],
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([{
      provide: MAT_SLIDER,
      useExisting: _class2
    }]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]],
    ngContentSelectors: _c3,
    decls: 9,
    vars: 5,
    consts: [[1, "mdc-slider__track"], [1, "mdc-slider__track--inactive"], [1, "mdc-slider__track--active"], [1, "mdc-slider__track--active_fill"], ["trackActive", ""], ["class", "mdc-slider__tick-marks", 4, "ngIf"], [3, "discrete", "thumbPosition", "valueIndicatorText", 4, "ngIf"], [3, "discrete", "thumbPosition", "valueIndicatorText"], [1, "mdc-slider__tick-marks"], ["tickMarkContainer", ""], [4, "ngIf"], [3, "class", "transform", 4, "ngFor", "ngForOf"]],
    template: function _class2_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojectionDef"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "div", 3, 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](6, _class2_div_6_Template, 3, 1, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](7, _class2_mat_slider_visual_thumb_7_Template, 1, 3, "mat-slider-visual-thumb", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](8, "mat-slider-visual-thumb", 7);
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.showTickMarks);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._isRange);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("discrete", ctx.discrete)("thumbPosition", 2)("valueIndicatorText", ctx.endValueIndicatorText);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_2__.NgIf, MatSliderVisualThumb],
    styles: [".mdc-slider{cursor:pointer;height:48px;margin:0 24px;position:relative;touch-action:pan-y}.mdc-slider .mdc-slider__track{position:absolute;top:50%;transform:translateY(-50%);width:100%}.mdc-slider .mdc-slider__track--active,.mdc-slider .mdc-slider__track--inactive{display:flex;height:100%;position:absolute;width:100%}.mdc-slider .mdc-slider__track--active{overflow:hidden}.mdc-slider .mdc-slider__track--active_fill{border-top-style:solid;box-sizing:border-box;height:100%;width:100%;position:relative;-webkit-transform-origin:left;transform-origin:left}[dir=rtl] .mdc-slider .mdc-slider__track--active_fill,.mdc-slider .mdc-slider__track--active_fill[dir=rtl]{-webkit-transform-origin:right;transform-origin:right}.mdc-slider .mdc-slider__track--inactive{left:0;top:0}.mdc-slider .mdc-slider__track--inactive::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:1px solid rgba(0,0,0,0);border-radius:inherit;content:\"\";pointer-events:none}@media screen and (forced-colors: active){.mdc-slider .mdc-slider__track--inactive::before{border-color:CanvasText}}.mdc-slider .mdc-slider__value-indicator-container{bottom:44px;left:var(--slider-value-indicator-container-left, 50%);pointer-events:none;position:absolute;right:var(--slider-value-indicator-container-right);transform:var(--slider-value-indicator-container-transform, translateX(-50%))}.mdc-slider .mdc-slider__value-indicator{transition:transform 100ms 0ms cubic-bezier(0.4, 0, 1, 1);align-items:center;border-radius:4px;display:flex;height:32px;padding:0 12px;transform:scale(0);transform-origin:bottom}.mdc-slider .mdc-slider__value-indicator::before{border-left:6px solid rgba(0,0,0,0);border-right:6px solid rgba(0,0,0,0);border-top:6px solid;bottom:-5px;content:\"\";height:0;left:var(--slider-value-indicator-caret-left, 50%);position:absolute;right:var(--slider-value-indicator-caret-right);transform:var(--slider-value-indicator-caret-transform, translateX(-50%));width:0}.mdc-slider .mdc-slider__value-indicator::after{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:1px solid rgba(0,0,0,0);border-radius:inherit;content:\"\";pointer-events:none}@media screen and (forced-colors: active){.mdc-slider .mdc-slider__value-indicator::after{border-color:CanvasText}}.mdc-slider .mdc-slider__thumb--with-indicator .mdc-slider__value-indicator-container{pointer-events:auto}.mdc-slider .mdc-slider__thumb--with-indicator .mdc-slider__value-indicator{transition:transform 100ms 0ms cubic-bezier(0, 0, 0.2, 1);transform:scale(1)}@media(prefers-reduced-motion){.mdc-slider .mdc-slider__value-indicator,.mdc-slider .mdc-slider__thumb--with-indicator .mdc-slider__value-indicator{transition:none}}.mdc-slider .mdc-slider__thumb{display:flex;left:-24px;outline:none;position:absolute;user-select:none;height:48px;width:48px}.mdc-slider .mdc-slider__thumb--top{z-index:1}.mdc-slider .mdc-slider__thumb--top .mdc-slider__thumb-knob,.mdc-slider .mdc-slider__thumb--top.mdc-slider__thumb:hover .mdc-slider__thumb-knob,.mdc-slider .mdc-slider__thumb--top.mdc-slider__thumb--focused .mdc-slider__thumb-knob{border-style:solid;border-width:1px;box-sizing:content-box}.mdc-slider .mdc-slider__thumb-knob{box-sizing:border-box;left:50%;position:absolute;top:50%;transform:translate(-50%, -50%)}.mdc-slider .mdc-slider__tick-marks{align-items:center;box-sizing:border-box;display:flex;height:100%;justify-content:space-between;padding:0 1px;position:absolute;width:100%}.mdc-slider--discrete .mdc-slider__thumb,.mdc-slider--discrete .mdc-slider__track--active_fill{transition:transform 80ms ease}@media(prefers-reduced-motion){.mdc-slider--discrete .mdc-slider__thumb,.mdc-slider--discrete .mdc-slider__track--active_fill{transition:none}}.mdc-slider--disabled{cursor:auto}.mdc-slider--disabled .mdc-slider__thumb{pointer-events:none}.mdc-slider__input{cursor:pointer;left:2px;margin:0;height:44px;opacity:0;pointer-events:none;position:absolute;top:2px;width:44px}.mat-mdc-slider{display:inline-block;box-sizing:border-box;outline:none;vertical-align:middle;margin-left:8px;margin-right:8px;width:auto;min-width:112px;-webkit-tap-highlight-color:rgba(0,0,0,0)}.mat-mdc-slider .mdc-slider__thumb-knob{background-color:var(--mdc-slider-handle-color, var(--mdc-theme-primary, #6200ee));border-color:var(--mdc-slider-handle-color, var(--mdc-theme-primary, #6200ee))}.mat-mdc-slider .mdc-slider__thumb--top .mdc-slider__thumb-knob,.mat-mdc-slider .mdc-slider__thumb--top.mdc-slider__thumb:hover .mdc-slider__thumb-knob,.mat-mdc-slider .mdc-slider__thumb--top.mdc-slider__thumb--focused .mdc-slider__thumb-knob{border-color:#fff}.mat-mdc-slider.mdc-slider--disabled .mdc-slider__thumb-knob{background-color:var(--mdc-slider-disabled-handle-color, var(--mdc-theme-on-surface, #000));border-color:var(--mdc-slider-disabled-handle-color, var(--mdc-theme-on-surface, #000))}.mat-mdc-slider.mdc-slider--disabled .mdc-slider__thumb--top .mdc-slider__thumb-knob,.mat-mdc-slider.mdc-slider--disabled .mdc-slider__thumb--top.mdc-slider__thumb:hover .mdc-slider__thumb-knob,.mat-mdc-slider.mdc-slider--disabled .mdc-slider__thumb--top.mdc-slider__thumb--focused .mdc-slider__thumb-knob{border-color:#fff}.mat-mdc-slider .mdc-slider__thumb::before,.mat-mdc-slider .mdc-slider__thumb::after{background-color:var(--mdc-slider-handle-color, var(--mdc-theme-primary, #6200ee))}.mat-mdc-slider .mdc-slider__thumb:hover::before,.mat-mdc-slider .mdc-slider__thumb.mdc-ripple-surface--hover::before{opacity:var(--mdc-ripple-hover-opacity, 0.04)}.mat-mdc-slider .mdc-slider__thumb.mdc-ripple-upgraded--background-focused::before,.mat-mdc-slider .mdc-slider__thumb:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:var(--mdc-ripple-focus-opacity, 0.12)}.mat-mdc-slider .mdc-slider__thumb:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mat-mdc-slider .mdc-slider__thumb:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:var(--mdc-ripple-press-opacity, 0.12)}.mat-mdc-slider .mdc-slider__thumb.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-ripple-press-opacity, 0.12)}.mat-mdc-slider .mdc-slider__track--active_fill{border-color:var(--mdc-slider-active-track-color, var(--mdc-theme-primary, #6200ee))}.mat-mdc-slider.mdc-slider--disabled .mdc-slider__track--active_fill{border-color:var(--mdc-slider-disabled-active-track-color, var(--mdc-theme-on-surface, #000))}.mat-mdc-slider .mdc-slider__track--inactive{background-color:var(--mdc-slider-inactive-track-color, var(--mdc-theme-primary, #6200ee));opacity:.24}.mat-mdc-slider.mdc-slider--disabled .mdc-slider__track--inactive{background-color:var(--mdc-slider-disabled-inactive-track-color, var(--mdc-theme-on-surface, #000));opacity:.24}.mat-mdc-slider .mdc-slider__tick-mark--active{background-color:var(--mdc-slider-with-tick-marks-active-container-color, var(--mdc-theme-on-primary, #fff));opacity:var(--mdc-slider-with-tick-marks-active-container-opacity, 0.6)}.mat-mdc-slider.mdc-slider--disabled .mdc-slider__tick-mark--active{background-color:var(--mdc-slider-with-tick-marks-active-container-color, var(--mdc-theme-on-primary, #fff));opacity:var(--mdc-slider-with-tick-marks-active-container-opacity, 0.6)}.mat-mdc-slider .mdc-slider__tick-mark--inactive{background-color:var(--mdc-slider-with-tick-marks-inactive-container-color, var(--mdc-theme-primary, #6200ee));opacity:var(--mdc-slider-with-tick-marks-inactive-container-opacity, 0.6)}.mat-mdc-slider.mdc-slider--disabled .mdc-slider__tick-mark--inactive{background-color:var(--mdc-slider-with-tick-marks-disabled-container-color, var(--mdc-theme-on-surface, #000));opacity:var(--mdc-slider-with-tick-marks-inactive-container-opacity, 0.6)}.mat-mdc-slider .mdc-slider__value-indicator{background-color:var(--mdc-slider-label-container-color, #666666);opacity:1}.mat-mdc-slider .mdc-slider__value-indicator::before{border-top-color:var(--mdc-slider-label-container-color, #666666)}.mat-mdc-slider .mdc-slider__value-indicator{color:var(--mdc-slider-label-label-text-color, var(--mdc-theme-on-primary, #fff))}.mat-mdc-slider .mdc-slider__track{height:var(--mdc-slider-inactive-track-height, 4px)}.mat-mdc-slider .mdc-slider__track--active{height:var(--mdc-slider-active-track-height, 6px);top:calc((var(--mdc-slider-inactive-track-height, 4px) - var(--mdc-slider-active-track-height, 6px)) / 2)}.mat-mdc-slider .mdc-slider__track--active_fill{border-top-width:var(--mdc-slider-active-track-height, 6px)}.mat-mdc-slider .mdc-slider__track--inactive{height:var(--mdc-slider-inactive-track-height, 4px)}.mat-mdc-slider .mdc-slider__tick-mark--active,.mat-mdc-slider .mdc-slider__tick-mark--inactive{height:var(--mdc-slider-with-tick-marks-container-size, 2px);width:var(--mdc-slider-with-tick-marks-container-size, 2px)}.mat-mdc-slider.mdc-slider--disabled{opacity:0.38}.mat-mdc-slider .mdc-slider__value-indicator-text{letter-spacing:var(--mdc-slider-label-label-text-tracking, 0.0071428571em);font-size:var(--mdc-slider-label-label-text-size, 0.875rem);font-family:var(--mdc-slider-label-label-text-font, Roboto, sans-serif);font-weight:var(--mdc-slider-label-label-text-weight, 500);line-height:var(--mdc-slider-label-label-text-line-height, 1.375rem)}.mat-mdc-slider .mdc-slider__track--active{border-radius:var(--mdc-slider-active-track-shape, 9999px)}.mat-mdc-slider .mdc-slider__track--inactive{border-radius:var(--mdc-slider-inactive-track-shape, 9999px)}.mat-mdc-slider .mdc-slider__thumb-knob{border-radius:var(--mdc-slider-handle-shape, 50%);width:var(--mdc-slider-handle-width, 20px);height:var(--mdc-slider-handle-height, 20px);border-style:solid;border-width:calc(var(--mdc-slider-handle-height, 20px) / 2) calc(var(--mdc-slider-handle-width, 20px) / 2)}.mat-mdc-slider .mdc-slider__tick-mark--active,.mat-mdc-slider .mdc-slider__tick-mark--inactive{border-radius:var(--mdc-slider-with-tick-marks-container-shape, 50%)}.mat-mdc-slider .mdc-slider__thumb-knob{box-shadow:var(--mdc-slider-handle-elevation, 0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12))}.mat-mdc-slider .mdc-slider__thumb:hover .mdc-slider__thumb-knob{background-color:var(--mdc-slider-hover-handle-color, var(--mdc-theme-primary, #6200ee));border-color:var(--mdc-slider-hover-handle-color, var(--mdc-theme-primary, #6200ee))}.mat-mdc-slider .mdc-slider__thumb:hover .mdc-slider__thumb--top .mdc-slider__thumb-knob,.mat-mdc-slider .mdc-slider__thumb:hover .mdc-slider__thumb--top.mdc-slider__thumb:hover .mdc-slider__thumb-knob,.mat-mdc-slider .mdc-slider__thumb:hover .mdc-slider__thumb--top.mdc-slider__thumb--focused .mdc-slider__thumb-knob{border-color:#fff}.mat-mdc-slider .mdc-slider__thumb--focused .mdc-slider__thumb-knob{background-color:var(--mdc-slider-focus-handle-color, var(--mdc-theme-primary, #6200ee));border-color:var(--mdc-slider-focus-handle-color, var(--mdc-theme-primary, #6200ee))}.mat-mdc-slider .mdc-slider__thumb--focused .mdc-slider__thumb--top .mdc-slider__thumb-knob,.mat-mdc-slider .mdc-slider__thumb--focused .mdc-slider__thumb--top.mdc-slider__thumb:hover .mdc-slider__thumb-knob,.mat-mdc-slider .mdc-slider__thumb--focused .mdc-slider__thumb--top.mdc-slider__thumb--focused .mdc-slider__thumb-knob{border-color:#fff}.mat-mdc-slider .mdc-slider__thumb:not(:disabled):active .mdc-slider__thumb--top .mdc-slider__thumb-knob,.mat-mdc-slider .mdc-slider__thumb:not(:disabled):active .mdc-slider__thumb--top.mdc-slider__thumb:hover .mdc-slider__thumb-knob,.mat-mdc-slider .mdc-slider__thumb:not(:disabled):active .mdc-slider__thumb--top.mdc-slider__thumb--focused .mdc-slider__thumb-knob{border-color:#fff}.mat-mdc-slider .mdc-slider__thumb--top .mdc-slider__thumb-knob,.mat-mdc-slider .mdc-slider__thumb--top.mdc-slider__thumb:hover .mdc-slider__thumb-knob,.mat-mdc-slider .mdc-slider__thumb--top.mdc-slider__thumb--focused .mdc-slider__thumb-knob{border-color:var(--mdc-slider-with-overlap-handle-outline-color, #fff);border-width:var(--mdc-slider-with-overlap-handle-outline-width, 1px)}.mat-mdc-slider .mdc-slider__input{box-sizing:content-box;pointer-events:auto}.mat-mdc-slider .mdc-slider__input.mat-mdc-slider-input-no-pointer-events{pointer-events:none}.mat-mdc-slider .mdc-slider__input.mat-slider__right-input{left:auto;right:0}.mat-mdc-slider .mdc-slider__thumb,.mat-mdc-slider .mdc-slider__track--active_fill{transition-duration:0ms}.mat-mdc-slider.mat-mdc-slider-with-animation .mdc-slider__thumb,.mat-mdc-slider.mat-mdc-slider-with-animation .mdc-slider__track--active_fill{transition-duration:80ms}.mat-mdc-slider.mdc-slider--discrete .mdc-slider__thumb,.mat-mdc-slider.mdc-slider--discrete .mdc-slider__track--active_fill{transition-duration:0ms}.mat-mdc-slider.mat-mdc-slider-with-animation .mdc-slider__thumb,.mat-mdc-slider.mat-mdc-slider-with-animation .mdc-slider__track--active_fill{transition-duration:80ms}.mat-mdc-slider .mdc-slider__track,.mat-mdc-slider .mdc-slider__thumb{pointer-events:none}.mat-mdc-slider .mdc-slider__value-indicator{opacity:var(--mat-mdc-slider-value-indicator-opacity, 1)}.mat-mdc-slider .mat-ripple .mat-ripple-element{background-color:var(--mat-mdc-slider-ripple-color, transparent)}.mat-mdc-slider .mat-ripple .mat-mdc-slider-hover-ripple{background-color:var(--mat-mdc-slider-hover-ripple-color, transparent)}.mat-mdc-slider .mat-ripple .mat-mdc-slider-focus-ripple,.mat-mdc-slider .mat-ripple .mat-mdc-slider-active-ripple{background-color:var(--mat-mdc-slider-focus-ripple-color, transparent)}.mat-mdc-slider._mat-animation-noopable.mdc-slider--discrete .mdc-slider__thumb,.mat-mdc-slider._mat-animation-noopable.mdc-slider--discrete .mdc-slider__track--active_fill,.mat-mdc-slider._mat-animation-noopable .mdc-slider__value-indicator{transition:none}.mat-mdc-slider .mat-mdc-focus-indicator::before{border-radius:50%}.mdc-slider__thumb--focused .mat-mdc-focus-indicator::before{content:\"\"}"],
    encapsulation: 2,
    changeDetection: 0
  });
  return MatSlider;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
/** Ensures that there is not an invalid configuration for the slider thumb inputs. */
function _validateInputs(isRange, endInputElement, startInputElement) {
  const startValid = !isRange || startInputElement?._hostElement.hasAttribute('matSliderStartThumb');
  const endValid = endInputElement._hostElement.hasAttribute(isRange ? 'matSliderEndThumb' : 'matSliderThumb');
  if (!startValid || !endValid) {
    _throwInvalidInputConfigurationError();
  }
}
function _throwInvalidInputConfigurationError() {
  throw Error(`Invalid slider thumb input configuration!

   Valid configurations are as follows:

     <mat-slider>
       <input matSliderThumb>
     </mat-slider>

     or

     <mat-slider>
       <input matSliderStartThumb>
       <input matSliderEndThumb>
     </mat-slider>
   `);
}

/**
 * Provider that allows the slider thumb to register as a ControlValueAccessor.
 * @docs-private
 */
const MAT_SLIDER_THUMB_VALUE_ACCESSOR = {
  provide: _angular_forms__WEBPACK_IMPORTED_MODULE_6__.NG_VALUE_ACCESSOR,
  useExisting: /*#__PURE__*/(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(() => MatSliderThumb),
  multi: true
};
/**
 * Provider that allows the range slider thumb to register as a ControlValueAccessor.
 * @docs-private
 */
const MAT_SLIDER_RANGE_THUMB_VALUE_ACCESSOR = {
  provide: _angular_forms__WEBPACK_IMPORTED_MODULE_6__.NG_VALUE_ACCESSOR,
  useExisting: /*#__PURE__*/(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(() => MatSliderRangeThumb),
  multi: true
};
/**
 * Directive that adds slider-specific behaviors to an input element inside `<mat-slider>`.
 * Up to two may be placed inside of a `<mat-slider>`.
 *
 * If one is used, the selector `matSliderThumb` must be used, and the outcome will be a normal
 * slider. If two are used, the selectors `matSliderStartThumb` and `matSliderEndThumb` must be
 * used, and the outcome will be a range slider with two slider thumbs.
 */
let MatSliderThumb = /*#__PURE__*/(() => {
  var _class3;
  class MatSliderThumb {
    get value() {
      return (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_3__.coerceNumberProperty)(this._hostElement.value);
    }
    set value(v) {
      const val = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_3__.coerceNumberProperty)(v).toString();
      if (!this._hasSetInitialValue) {
        this._initialValue = val;
        return;
      }
      if (this._isActive) {
        return;
      }
      this._hostElement.value = val;
      this._updateThumbUIByValue();
      this._slider._onValueChange(this);
      this._cdr.detectChanges();
      this._slider._cdr.markForCheck();
    }
    /**
     * The current translateX in px of the slider visual thumb.
     * @docs-private
     */
    get translateX() {
      if (this._slider.min >= this._slider.max) {
        this._translateX = 0;
        return this._translateX;
      }
      if (this._translateX === undefined) {
        this._translateX = this._calcTranslateXByValue();
      }
      return this._translateX;
    }
    set translateX(v) {
      this._translateX = v;
    }
    /** @docs-private */
    get min() {
      return (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_3__.coerceNumberProperty)(this._hostElement.min);
    }
    set min(v) {
      this._hostElement.min = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_3__.coerceNumberProperty)(v).toString();
      this._cdr.detectChanges();
    }
    /** @docs-private */
    get max() {
      return (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_3__.coerceNumberProperty)(this._hostElement.max);
    }
    set max(v) {
      this._hostElement.max = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_3__.coerceNumberProperty)(v).toString();
      this._cdr.detectChanges();
    }
    get step() {
      return (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_3__.coerceNumberProperty)(this._hostElement.step);
    }
    set step(v) {
      this._hostElement.step = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_3__.coerceNumberProperty)(v).toString();
      this._cdr.detectChanges();
    }
    /** @docs-private */
    get disabled() {
      return (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_3__.coerceBooleanProperty)(this._hostElement.disabled);
    }
    set disabled(v) {
      this._hostElement.disabled = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_3__.coerceBooleanProperty)(v);
      this._cdr.detectChanges();
      if (this._slider.disabled !== this.disabled) {
        this._slider.disabled = this.disabled;
      }
    }
    /** The percentage of the slider that coincides with the value. */
    get percentage() {
      if (this._slider.min >= this._slider.max) {
        return this._slider._isRtl ? 1 : 0;
      }
      return (this.value - this._slider.min) / (this._slider.max - this._slider.min);
    }
    /** @docs-private */
    get fillPercentage() {
      if (!this._slider._cachedWidth) {
        return this._slider._isRtl ? 1 : 0;
      }
      if (this._translateX === 0) {
        return 0;
      }
      return this.translateX / this._slider._cachedWidth;
    }
    /** Used to relay updates to _isFocused to the slider visual thumbs. */
    _setIsFocused(v) {
      this._isFocused = v;
    }
    constructor(_ngZone, _elementRef, _cdr, _slider) {
      this._ngZone = _ngZone;
      this._elementRef = _elementRef;
      this._cdr = _cdr;
      this._slider = _slider;
      /** Event emitted when the `value` is changed. */
      this.valueChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
      /** Event emitted when the slider thumb starts being dragged. */
      this.dragStart = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
      /** Event emitted when the slider thumb stops being dragged. */
      this.dragEnd = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
      /**
       * Indicates whether this thumb is the start or end thumb.
       * @docs-private
       */
      this.thumbPosition = 2 /* _MatThumb.END */;
      /** The radius of a native html slider's knob. */
      this._knobRadius = 8;
      /** Whether user's cursor is currently in a mouse down state on the input. */
      this._isActive = false;
      /** Whether the input is currently focused (either by tab or after clicking). */
      this._isFocused = false;
      /**
       * Whether the initial value has been set.
       * This exists because the initial value cannot be immediately set because the min and max
       * must first be relayed from the parent MatSlider component, which can only happen later
       * in the component lifecycle.
       */
      this._hasSetInitialValue = false;
      /** Emits when the component is destroyed. */
      this._destroyed = new rxjs__WEBPACK_IMPORTED_MODULE_7__.Subject();
      /**
       * Indicates whether UI updates should be skipped.
       *
       * This flag is used to avoid flickering
       * when correcting values on pointer up/down.
       */
      this._skipUIUpdate = false;
      /** Callback called when the slider input has been touched. */
      this._onTouchedFn = () => {};
      /**
       * Whether the NgModel has been initialized.
       *
       * This flag is used to ignore ghost null calls to
       * writeValue which can break slider initialization.
       *
       * See https://github.com/angular/angular/issues/14988.
       */
      this._isControlInitialized = false;
      this._platform = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__.Platform);
      this._hostElement = _elementRef.nativeElement;
      this._ngZone.runOutsideAngular(() => {
        this._hostElement.addEventListener('pointerdown', this._onPointerDown.bind(this));
        this._hostElement.addEventListener('pointermove', this._onPointerMove.bind(this));
        this._hostElement.addEventListener('pointerup', this._onPointerUp.bind(this));
      });
    }
    ngOnDestroy() {
      this._hostElement.removeEventListener('pointerdown', this._onPointerDown);
      this._hostElement.removeEventListener('pointermove', this._onPointerMove);
      this._hostElement.removeEventListener('pointerup', this._onPointerUp);
      this._destroyed.next();
      this._destroyed.complete();
      this.dragStart.complete();
      this.dragEnd.complete();
    }
    /** @docs-private */
    initProps() {
      this._updateWidthInactive();
      // If this or the parent slider is disabled, just make everything disabled.
      if (this.disabled !== this._slider.disabled) {
        // The MatSlider setter for disabled will relay this and disable both inputs.
        this._slider.disabled = true;
      }
      this.step = this._slider.step;
      this.min = this._slider.min;
      this.max = this._slider.max;
      this._initValue();
    }
    /** @docs-private */
    initUI() {
      this._updateThumbUIByValue();
    }
    _initValue() {
      this._hasSetInitialValue = true;
      if (this._initialValue === undefined) {
        this.value = this._getDefaultValue();
      } else {
        this._hostElement.value = this._initialValue;
        this._updateThumbUIByValue();
        this._slider._onValueChange(this);
        this._cdr.detectChanges();
      }
    }
    _getDefaultValue() {
      return this.min;
    }
    _onBlur() {
      this._setIsFocused(false);
      this._onTouchedFn();
    }
    _onFocus() {
      this._setIsFocused(true);
    }
    _onChange() {
      this.valueChange.emit(this.value);
      // only used to handle the edge case where user
      // mousedown on the slider then uses arrow keys.
      if (this._isActive) {
        this._updateThumbUIByValue({
          withAnimation: true
        });
      }
    }
    _onInput() {
      this._onChangeFn?.(this.value);
      // handles arrowing and updating the value when
      // a step is defined.
      if (this._slider.step || !this._isActive) {
        this._updateThumbUIByValue({
          withAnimation: true
        });
      }
      this._slider._onValueChange(this);
    }
    _onNgControlValueChange() {
      // only used to handle when the value change
      // originates outside of the slider.
      if (!this._isActive || !this._isFocused) {
        this._slider._onValueChange(this);
        this._updateThumbUIByValue();
      }
      this._slider.disabled = this._formControl.disabled;
    }
    _onPointerDown(event) {
      if (this.disabled || event.button !== 0) {
        return;
      }
      // On IOS, dragging only works if the pointer down happens on the
      // slider thumb and the slider does not receive focus from pointer events.
      if (this._platform.IOS) {
        const isCursorOnSliderThumb = this._slider._isCursorOnSliderThumb(event, this._slider._getThumb(this.thumbPosition)._hostElement.getBoundingClientRect());
        if (isCursorOnSliderThumb) {
          this._isActive = true;
        }
      } else {
        this._isActive = true;
        this._setIsFocused(true);
      }
      this._updateWidthActive();
      this._slider._updateDimensions();
      // Does nothing if a step is defined because we
      // want the value to snap to the values on input.
      if (!this._slider.step) {
        this._updateThumbUIByPointerEvent(event, {
          withAnimation: true
        });
      }
      if (!this.disabled) {
        this._handleValueCorrection(event);
        this.dragStart.emit({
          source: this,
          parent: this._slider,
          value: this.value
        });
      }
    }
    /**
     * Corrects the value of the slider on pointer up/down.
     *
     * Called on pointer down and up because the value is set based
     * on the inactive width instead of the active width.
     */
    _handleValueCorrection(event) {
      // Don't update the UI with the current value! The value on pointerdown
      // and pointerup is calculated in the split second before the input(s)
      // resize. See _updateWidthInactive() and _updateWidthActive() for more
      // details.
      this._skipUIUpdate = true;
      // Note that this function gets triggered before the actual value of the
      // slider is updated. This means if we were to set the value here, it
      // would immediately be overwritten. Using setTimeout ensures the setting
      // of the value happens after the value has been updated by the
      // pointerdown event.
      setTimeout(() => {
        this._skipUIUpdate = false;
        this._fixValue(event);
      }, 0);
    }
    /** Corrects the value of the slider based on the pointer event's position. */
    _fixValue(event) {
      const xPos = event.clientX - this._slider._cachedLeft;
      const width = this._slider._cachedWidth;
      const step = this._slider.step === 0 ? 1 : this._slider.step;
      const numSteps = Math.floor((this._slider.max - this._slider.min) / step);
      const percentage = this._slider._isRtl ? 1 - xPos / width : xPos / width;
      // To ensure the percentage is rounded to the necessary number of decimals.
      const fixedPercentage = Math.round(percentage * numSteps) / numSteps;
      const impreciseValue = fixedPercentage * (this._slider.max - this._slider.min) + this._slider.min;
      const value = Math.round(impreciseValue / step) * step;
      const prevValue = this.value;
      if (value === prevValue) {
        // Because we prevented UI updates, if it turns out that the race
        // condition didn't happen and the value is already correct, we
        // have to apply the ui updates now.
        this._slider._onValueChange(this);
        this._slider.step > 0 ? this._updateThumbUIByValue() : this._updateThumbUIByPointerEvent(event, {
          withAnimation: this._slider._hasAnimation
        });
        return;
      }
      this.value = value;
      this.valueChange.emit(this.value);
      this._onChangeFn?.(this.value);
      this._slider._onValueChange(this);
      this._slider.step > 0 ? this._updateThumbUIByValue() : this._updateThumbUIByPointerEvent(event, {
        withAnimation: this._slider._hasAnimation
      });
    }
    _onPointerMove(event) {
      // Again, does nothing if a step is defined because
      // we want the value to snap to the values on input.
      if (!this._slider.step && this._isActive) {
        this._updateThumbUIByPointerEvent(event);
      }
    }
    _onPointerUp() {
      if (this._isActive) {
        this._isActive = false;
        this.dragEnd.emit({
          source: this,
          parent: this._slider,
          value: this.value
        });
        // This setTimeout is to prevent the pointerup from triggering a value
        // change on the input based on the inactive width. It's not clear why
        // but for some reason on IOS this race condition is even more common so
        // the timeout needs to be increased.
        setTimeout(() => this._updateWidthInactive(), this._platform.IOS ? 10 : 0);
      }
    }
    _clamp(v) {
      return Math.max(Math.min(v, this._slider._cachedWidth), 0);
    }
    _calcTranslateXByValue() {
      if (this._slider._isRtl) {
        return (1 - this.percentage) * this._slider._cachedWidth;
      }
      return this.percentage * this._slider._cachedWidth;
    }
    _calcTranslateXByPointerEvent(event) {
      return event.clientX - this._slider._cachedLeft;
    }
    /**
     * Used to set the slider width to the correct
     * dimensions while the user is dragging.
     */
    _updateWidthActive() {
      this._hostElement.style.padding = `0 ${this._slider._inputPadding}px`;
      this._hostElement.style.width = `calc(100% + ${this._slider._inputPadding}px)`;
    }
    /**
     * Sets the slider input to disproportionate dimensions to allow for touch
     * events to be captured on touch devices.
     */
    _updateWidthInactive() {
      this._hostElement.style.padding = '0px';
      this._hostElement.style.width = 'calc(100% + 48px)';
      this._hostElement.style.left = '-24px';
    }
    _updateThumbUIByValue(options) {
      this.translateX = this._clamp(this._calcTranslateXByValue());
      this._updateThumbUI(options);
    }
    _updateThumbUIByPointerEvent(event, options) {
      this.translateX = this._clamp(this._calcTranslateXByPointerEvent(event));
      this._updateThumbUI(options);
    }
    _updateThumbUI(options) {
      this._slider._setTransition(!!options?.withAnimation);
      this._slider._onTranslateXChange(this);
    }
    /**
     * Sets the input's value.
     * @param value The new value of the input
     * @docs-private
     */
    writeValue(value) {
      if (this._isControlInitialized || value !== null) {
        this.value = value;
      }
    }
    /**
     * Registers a callback to be invoked when the input's value changes from user input.
     * @param fn The callback to register
     * @docs-private
     */
    registerOnChange(fn) {
      this._onChangeFn = fn;
      this._isControlInitialized = true;
    }
    /**
     * Registers a callback to be invoked when the input is blurred by the user.
     * @param fn The callback to register
     * @docs-private
     */
    registerOnTouched(fn) {
      this._onTouchedFn = fn;
    }
    /**
     * Sets the disabled state of the slider.
     * @param isDisabled The new disabled state
     * @docs-private
     */
    setDisabledState(isDisabled) {
      this.disabled = isDisabled;
    }
    focus() {
      this._hostElement.focus();
    }
    blur() {
      this._hostElement.blur();
    }
  }
  _class3 = MatSliderThumb;
  _class3.ɵfac = function _class3_Factory(t) {
    return new (t || _class3)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.NgZone), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](MAT_SLIDER));
  };
  _class3.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
    type: _class3,
    selectors: [["input", "matSliderThumb", ""]],
    hostAttrs: ["type", "range", 1, "mdc-slider__input"],
    hostVars: 1,
    hostBindings: function _class3_HostBindings(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("change", function _class3_change_HostBindingHandler() {
          return ctx._onChange();
        })("input", function _class3_input_HostBindingHandler() {
          return ctx._onInput();
        })("blur", function _class3_blur_HostBindingHandler() {
          return ctx._onBlur();
        })("focus", function _class3_focus_HostBindingHandler() {
          return ctx._onFocus();
        });
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattribute"]("aria-valuetext", ctx._valuetext);
      }
    },
    inputs: {
      value: "value"
    },
    outputs: {
      valueChange: "valueChange",
      dragStart: "dragStart",
      dragEnd: "dragEnd"
    },
    exportAs: ["matSliderThumb"],
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([MAT_SLIDER_THUMB_VALUE_ACCESSOR, {
      provide: MAT_SLIDER_THUMB,
      useExisting: _class3
    }])]
  });
  return MatSliderThumb;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
let MatSliderRangeThumb = /*#__PURE__*/(() => {
  var _class4;
  class MatSliderRangeThumb extends MatSliderThumb {
    /** @docs-private */
    getSibling() {
      if (!this._sibling) {
        this._sibling = this._slider._getInput(this._isEndThumb ? 1 /* _MatThumb.START */ : 2 /* _MatThumb.END */);
      }

      return this._sibling;
    }
    /**
     * Returns the minimum translateX position allowed for this slider input's visual thumb.
     * @docs-private
     */
    getMinPos() {
      const sibling = this.getSibling();
      if (!this._isLeftThumb && sibling) {
        return sibling.translateX;
      }
      return 0;
    }
    /**
     * Returns the maximum translateX position allowed for this slider input's visual thumb.
     * @docs-private
     */
    getMaxPos() {
      const sibling = this.getSibling();
      if (this._isLeftThumb && sibling) {
        return sibling.translateX;
      }
      return this._slider._cachedWidth;
    }
    _setIsLeftThumb() {
      this._isLeftThumb = this._isEndThumb && this._slider._isRtl || !this._isEndThumb && !this._slider._isRtl;
    }
    constructor(_ngZone, _slider, _elementRef, _cdr) {
      super(_ngZone, _elementRef, _cdr, _slider);
      this._cdr = _cdr;
      this._isEndThumb = this._hostElement.hasAttribute('matSliderEndThumb');
      this._setIsLeftThumb();
      this.thumbPosition = this._isEndThumb ? 2 /* _MatThumb.END */ : 1 /* _MatThumb.START */;
    }

    _getDefaultValue() {
      return this._isEndThumb && this._slider._isRange ? this.max : this.min;
    }
    _onInput() {
      super._onInput();
      this._updateSibling();
      if (!this._isActive) {
        this._updateWidthInactive();
      }
    }
    _onNgControlValueChange() {
      super._onNgControlValueChange();
      this.getSibling()?._updateMinMax();
    }
    _onPointerDown(event) {
      if (this.disabled || event.button !== 0) {
        return;
      }
      if (this._sibling) {
        this._sibling._updateWidthActive();
        this._sibling._hostElement.classList.add('mat-mdc-slider-input-no-pointer-events');
      }
      super._onPointerDown(event);
    }
    _onPointerUp() {
      super._onPointerUp();
      if (this._sibling) {
        setTimeout(() => {
          this._sibling._updateWidthInactive();
          this._sibling._hostElement.classList.remove('mat-mdc-slider-input-no-pointer-events');
        });
      }
    }
    _onPointerMove(event) {
      super._onPointerMove(event);
      if (!this._slider.step && this._isActive) {
        this._updateSibling();
      }
    }
    _fixValue(event) {
      super._fixValue(event);
      this._sibling?._updateMinMax();
    }
    _clamp(v) {
      return Math.max(Math.min(v, this.getMaxPos()), this.getMinPos());
    }
    _updateMinMax() {
      const sibling = this.getSibling();
      if (!sibling) {
        return;
      }
      if (this._isEndThumb) {
        this.min = Math.max(this._slider.min, sibling.value);
        this.max = this._slider.max;
      } else {
        this.min = this._slider.min;
        this.max = Math.min(this._slider.max, sibling.value);
      }
    }
    _updateWidthActive() {
      const minWidth = this._slider._rippleRadius * 2 - this._slider._inputPadding * 2;
      const maxWidth = this._slider._cachedWidth + this._slider._inputPadding - minWidth;
      const percentage = this._slider.min < this._slider.max ? (this.max - this.min) / (this._slider.max - this._slider.min) : 1;
      const width = maxWidth * percentage + minWidth;
      this._hostElement.style.width = `${width}px`;
      this._hostElement.style.padding = `0 ${this._slider._inputPadding}px`;
    }
    _updateWidthInactive() {
      const sibling = this.getSibling();
      if (!sibling) {
        return;
      }
      const maxWidth = this._slider._cachedWidth;
      const midValue = this._isEndThumb ? this.value - (this.value - sibling.value) / 2 : this.value + (sibling.value - this.value) / 2;
      const _percentage = this._isEndThumb ? (this.max - midValue) / (this._slider.max - this._slider.min) : (midValue - this.min) / (this._slider.max - this._slider.min);
      const percentage = this._slider.min < this._slider.max ? _percentage : 1;
      const width = maxWidth * percentage + 24;
      this._hostElement.style.width = `${width}px`;
      this._hostElement.style.padding = '0px';
      if (this._isLeftThumb) {
        this._hostElement.style.left = '-24px';
        this._hostElement.style.right = 'auto';
      } else {
        this._hostElement.style.left = 'auto';
        this._hostElement.style.right = '-24px';
      }
    }
    _updateStaticStyles() {
      this._hostElement.classList.toggle('mat-slider__right-input', !this._isLeftThumb);
    }
    _updateSibling() {
      const sibling = this.getSibling();
      if (!sibling) {
        return;
      }
      sibling._updateMinMax();
      if (this._isActive) {
        sibling._updateWidthActive();
      } else {
        sibling._updateWidthInactive();
      }
    }
    /**
     * Sets the input's value.
     * @param value The new value of the input
     * @docs-private
     */
    writeValue(value) {
      if (this._isControlInitialized || value !== null) {
        this.value = value;
        this._updateWidthInactive();
        this._updateSibling();
      }
    }
  }
  _class4 = MatSliderRangeThumb;
  _class4.ɵfac = function _class4_Factory(t) {
    return new (t || _class4)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.NgZone), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](MAT_SLIDER), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectorRef));
  };
  _class4.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
    type: _class4,
    selectors: [["input", "matSliderStartThumb", ""], ["input", "matSliderEndThumb", ""]],
    exportAs: ["matSliderRangeThumb"],
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([MAT_SLIDER_RANGE_THUMB_VALUE_ACCESSOR, {
      provide: MAT_SLIDER_RANGE_THUMB,
      useExisting: _class4
    }]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]]
  });
  return MatSliderRangeThumb;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
let MatSliderModule = /*#__PURE__*/(() => {
  var _class5;
  class MatSliderModule {}
  _class5 = MatSliderModule;
  _class5.ɵfac = function _class5_Factory(t) {
    return new (t || _class5)();
  };
  _class5.ɵmod = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
    type: _class5
  });
  _class5.ɵinj = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
    imports: [_angular_material_core__WEBPACK_IMPORTED_MODULE_1__.MatCommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule, _angular_material_core__WEBPACK_IMPORTED_MODULE_1__.MatRippleModule]
  });
  return MatSliderModule;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();

/**
 * Generated bundle index. Do not edit.
 */



/***/ }),

/***/ 30671:
/*!*************************************************************!*\
  !*** ./node_modules/@angular/material/fesm2022/tooltip.mjs ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MAT_TOOLTIP_DEFAULT_OPTIONS: () => (/* binding */ MAT_TOOLTIP_DEFAULT_OPTIONS),
/* harmony export */   MAT_TOOLTIP_DEFAULT_OPTIONS_FACTORY: () => (/* binding */ MAT_TOOLTIP_DEFAULT_OPTIONS_FACTORY),
/* harmony export */   MAT_TOOLTIP_SCROLL_STRATEGY: () => (/* binding */ MAT_TOOLTIP_SCROLL_STRATEGY),
/* harmony export */   MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY: () => (/* binding */ MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY),
/* harmony export */   MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER: () => (/* binding */ MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER),
/* harmony export */   MatTooltip: () => (/* binding */ MatTooltip),
/* harmony export */   MatTooltipModule: () => (/* binding */ MatTooltipModule),
/* harmony export */   SCROLL_THROTTLE_MS: () => (/* binding */ SCROLL_THROTTLE_MS),
/* harmony export */   TOOLTIP_PANEL_CLASS: () => (/* binding */ TOOLTIP_PANEL_CLASS),
/* harmony export */   TooltipComponent: () => (/* binding */ TooltipComponent),
/* harmony export */   _MatTooltipBase: () => (/* binding */ _MatTooltipBase),
/* harmony export */   _TooltipComponentBase: () => (/* binding */ _TooltipComponentBase),
/* harmony export */   getMatTooltipInvalidPositionError: () => (/* binding */ getMatTooltipInvalidPositionError),
/* harmony export */   matTooltipAnimations: () => (/* binding */ matTooltipAnimations)
/* harmony export */ });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ 33410);
/* harmony import */ var _angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/cdk/coercion */ 45029);
/* harmony import */ var _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/cdk/keycodes */ 31998);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser/animations */ 59936);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/common */ 34228);
/* harmony import */ var _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/cdk/platform */ 92237);
/* harmony import */ var _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/cdk/a11y */ 5612);
/* harmony import */ var _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/cdk/bidi */ 29988);
/* harmony import */ var _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/cdk/overlay */ 32546);
/* harmony import */ var _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/cdk/scrolling */ 7641);
/* harmony import */ var _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/cdk/portal */ 85354);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 85028);
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/animations */ 46012);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/core */ 56381);





















/** Time in ms to throttle repositioning after scroll events. */
const _c0 = ["tooltip"];
const SCROLL_THROTTLE_MS = 20;
/**
 * Creates an error to be thrown if the user supplied an invalid tooltip position.
 * @docs-private
 */
function getMatTooltipInvalidPositionError(position) {
  return Error(`Tooltip position "${position}" is invalid.`);
}
/** Injection token that determines the scroll handling while a tooltip is visible. */
const MAT_TOOLTIP_SCROLL_STRATEGY = /*#__PURE__*/new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken('mat-tooltip-scroll-strategy');
/** @docs-private */
function MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY(overlay) {
  return () => overlay.scrollStrategies.reposition({
    scrollThrottle: SCROLL_THROTTLE_MS
  });
}
/** @docs-private */
const MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER = {
  provide: MAT_TOOLTIP_SCROLL_STRATEGY,
  deps: [_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_1__.Overlay],
  useFactory: MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY
};
/** @docs-private */
function MAT_TOOLTIP_DEFAULT_OPTIONS_FACTORY() {
  return {
    showDelay: 0,
    hideDelay: 0,
    touchendHideDelay: 1500
  };
}
/** Injection token to be used to override the default options for `matTooltip`. */
const MAT_TOOLTIP_DEFAULT_OPTIONS = /*#__PURE__*/new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken('mat-tooltip-default-options', {
  providedIn: 'root',
  factory: MAT_TOOLTIP_DEFAULT_OPTIONS_FACTORY
});
/**
 * CSS class that will be attached to the overlay panel.
 * @deprecated
 * @breaking-change 13.0.0 remove this variable
 */
const TOOLTIP_PANEL_CLASS = 'mat-mdc-tooltip-panel';
const PANEL_CLASS = 'tooltip-panel';
/** Options used to bind passive event listeners. */
const passiveListenerOptions = /*#__PURE__*/(0,_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_2__.normalizePassiveListenerOptions)({
  passive: true
});
/**
 * Time between the user putting the pointer on a tooltip
 * trigger and the long press event being fired.
 */
const LONGPRESS_DELAY = 500;
// These constants were taken from MDC's `numbers` object. We can't import them from MDC,
// because they have some top-level references to `window` which break during SSR.
const MIN_VIEWPORT_TOOLTIP_THRESHOLD = 8;
const UNBOUNDED_ANCHOR_GAP = 8;
const MIN_HEIGHT = 24;
const MAX_WIDTH = 200;
let _MatTooltipBase = /*#__PURE__*/(() => {
  var _class;
  class _MatTooltipBase {
    /** Allows the user to define the position of the tooltip relative to the parent element */
    get position() {
      return this._position;
    }
    set position(value) {
      if (value !== this._position) {
        this._position = value;
        if (this._overlayRef) {
          this._updatePosition(this._overlayRef);
          this._tooltipInstance?.show(0);
          this._overlayRef.updatePosition();
        }
      }
    }
    /**
     * Whether tooltip should be relative to the click or touch origin
     * instead of outside the element bounding box.
     */
    get positionAtOrigin() {
      return this._positionAtOrigin;
    }
    set positionAtOrigin(value) {
      this._positionAtOrigin = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_3__.coerceBooleanProperty)(value);
      this._detach();
      this._overlayRef = null;
    }
    /** Disables the display of the tooltip. */
    get disabled() {
      return this._disabled;
    }
    set disabled(value) {
      this._disabled = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_3__.coerceBooleanProperty)(value);
      // If tooltip is disabled, hide immediately.
      if (this._disabled) {
        this.hide(0);
      } else {
        this._setupPointerEnterEventsIfNeeded();
      }
    }
    /** The default delay in ms before showing the tooltip after show is called */
    get showDelay() {
      return this._showDelay;
    }
    set showDelay(value) {
      this._showDelay = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_3__.coerceNumberProperty)(value);
    }
    /** The default delay in ms before hiding the tooltip after hide is called */
    get hideDelay() {
      return this._hideDelay;
    }
    set hideDelay(value) {
      this._hideDelay = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_3__.coerceNumberProperty)(value);
      if (this._tooltipInstance) {
        this._tooltipInstance._mouseLeaveHideDelay = this._hideDelay;
      }
    }
    /** The message to be displayed in the tooltip */
    get message() {
      return this._message;
    }
    set message(value) {
      this._ariaDescriber.removeDescription(this._elementRef.nativeElement, this._message, 'tooltip');
      // If the message is not a string (e.g. number), convert it to a string and trim it.
      // Must convert with `String(value)`, not `${value}`, otherwise Closure Compiler optimises
      // away the string-conversion: https://github.com/angular/components/issues/20684
      this._message = value != null ? String(value).trim() : '';
      if (!this._message && this._isTooltipVisible()) {
        this.hide(0);
      } else {
        this._setupPointerEnterEventsIfNeeded();
        this._updateTooltipMessage();
        this._ngZone.runOutsideAngular(() => {
          // The `AriaDescriber` has some functionality that avoids adding a description if it's the
          // same as the `aria-label` of an element, however we can't know whether the tooltip trigger
          // has a data-bound `aria-label` or when it'll be set for the first time. We can avoid the
          // issue by deferring the description by a tick so Angular has time to set the `aria-label`.
          Promise.resolve().then(() => {
            this._ariaDescriber.describe(this._elementRef.nativeElement, this.message, 'tooltip');
          });
        });
      }
    }
    /** Classes to be passed to the tooltip. Supports the same syntax as `ngClass`. */
    get tooltipClass() {
      return this._tooltipClass;
    }
    set tooltipClass(value) {
      this._tooltipClass = value;
      if (this._tooltipInstance) {
        this._setTooltipClass(this._tooltipClass);
      }
    }
    constructor(_overlay, _elementRef, _scrollDispatcher, _viewContainerRef, _ngZone, _platform, _ariaDescriber, _focusMonitor, scrollStrategy, _dir, _defaultOptions, _document) {
      this._overlay = _overlay;
      this._elementRef = _elementRef;
      this._scrollDispatcher = _scrollDispatcher;
      this._viewContainerRef = _viewContainerRef;
      this._ngZone = _ngZone;
      this._platform = _platform;
      this._ariaDescriber = _ariaDescriber;
      this._focusMonitor = _focusMonitor;
      this._dir = _dir;
      this._defaultOptions = _defaultOptions;
      this._position = 'below';
      this._positionAtOrigin = false;
      this._disabled = false;
      this._viewInitialized = false;
      this._pointerExitEventsInitialized = false;
      this._viewportMargin = 8;
      this._cssClassPrefix = 'mat';
      /**
       * How touch gestures should be handled by the tooltip. On touch devices the tooltip directive
       * uses a long press gesture to show and hide, however it can conflict with the native browser
       * gestures. To work around the conflict, Angular Material disables native gestures on the
       * trigger, but that might not be desirable on particular elements (e.g. inputs and draggable
       * elements). The different values for this option configure the touch event handling as follows:
       * - `auto` - Enables touch gestures for all elements, but tries to avoid conflicts with native
       *   browser gestures on particular elements. In particular, it allows text selection on inputs
       *   and textareas, and preserves the native browser dragging on elements marked as `draggable`.
       * - `on` - Enables touch gestures for all elements and disables native
       *   browser gestures with no exceptions.
       * - `off` - Disables touch gestures. Note that this will prevent the tooltip from
       *   showing on touch devices.
       */
      this.touchGestures = 'auto';
      this._message = '';
      /** Manually-bound passive event listeners. */
      this._passiveListeners = [];
      /** Emits when the component is destroyed. */
      this._destroyed = new rxjs__WEBPACK_IMPORTED_MODULE_4__.Subject();
      this._scrollStrategy = scrollStrategy;
      this._document = _document;
      if (_defaultOptions) {
        this._showDelay = _defaultOptions.showDelay;
        this._hideDelay = _defaultOptions.hideDelay;
        if (_defaultOptions.position) {
          this.position = _defaultOptions.position;
        }
        if (_defaultOptions.positionAtOrigin) {
          this.positionAtOrigin = _defaultOptions.positionAtOrigin;
        }
        if (_defaultOptions.touchGestures) {
          this.touchGestures = _defaultOptions.touchGestures;
        }
      }
      _dir.change.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.takeUntil)(this._destroyed)).subscribe(() => {
        if (this._overlayRef) {
          this._updatePosition(this._overlayRef);
        }
      });
    }
    ngAfterViewInit() {
      // This needs to happen after view init so the initial values for all inputs have been set.
      this._viewInitialized = true;
      this._setupPointerEnterEventsIfNeeded();
      this._focusMonitor.monitor(this._elementRef).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.takeUntil)(this._destroyed)).subscribe(origin => {
        // Note that the focus monitor runs outside the Angular zone.
        if (!origin) {
          this._ngZone.run(() => this.hide(0));
        } else if (origin === 'keyboard') {
          this._ngZone.run(() => this.show());
        }
      });
    }
    /**
     * Dispose the tooltip when destroyed.
     */
    ngOnDestroy() {
      const nativeElement = this._elementRef.nativeElement;
      clearTimeout(this._touchstartTimeout);
      if (this._overlayRef) {
        this._overlayRef.dispose();
        this._tooltipInstance = null;
      }
      // Clean up the event listeners set in the constructor
      this._passiveListeners.forEach(([event, listener]) => {
        nativeElement.removeEventListener(event, listener, passiveListenerOptions);
      });
      this._passiveListeners.length = 0;
      this._destroyed.next();
      this._destroyed.complete();
      this._ariaDescriber.removeDescription(nativeElement, this.message, 'tooltip');
      this._focusMonitor.stopMonitoring(nativeElement);
    }
    /** Shows the tooltip after the delay in ms, defaults to tooltip-delay-show or 0ms if no input */
    show(delay = this.showDelay, origin) {
      if (this.disabled || !this.message || this._isTooltipVisible()) {
        this._tooltipInstance?._cancelPendingAnimations();
        return;
      }
      const overlayRef = this._createOverlay(origin);
      this._detach();
      this._portal = this._portal || new _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_6__.ComponentPortal(this._tooltipComponent, this._viewContainerRef);
      const instance = this._tooltipInstance = overlayRef.attach(this._portal).instance;
      instance._triggerElement = this._elementRef.nativeElement;
      instance._mouseLeaveHideDelay = this._hideDelay;
      instance.afterHidden().pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.takeUntil)(this._destroyed)).subscribe(() => this._detach());
      this._setTooltipClass(this._tooltipClass);
      this._updateTooltipMessage();
      instance.show(delay);
    }
    /** Hides the tooltip after the delay in ms, defaults to tooltip-delay-hide or 0ms if no input */
    hide(delay = this.hideDelay) {
      const instance = this._tooltipInstance;
      if (instance) {
        if (instance.isVisible()) {
          instance.hide(delay);
        } else {
          instance._cancelPendingAnimations();
          this._detach();
        }
      }
    }
    /** Shows/hides the tooltip */
    toggle(origin) {
      this._isTooltipVisible() ? this.hide() : this.show(undefined, origin);
    }
    /** Returns true if the tooltip is currently visible to the user */
    _isTooltipVisible() {
      return !!this._tooltipInstance && this._tooltipInstance.isVisible();
    }
    /** Create the overlay config and position strategy */
    _createOverlay(origin) {
      if (this._overlayRef) {
        const existingStrategy = this._overlayRef.getConfig().positionStrategy;
        if ((!this.positionAtOrigin || !origin) && existingStrategy._origin instanceof _angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef) {
          return this._overlayRef;
        }
        this._detach();
      }
      const scrollableAncestors = this._scrollDispatcher.getAncestorScrollContainers(this._elementRef);
      // Create connected position strategy that listens for scroll events to reposition.
      const strategy = this._overlay.position().flexibleConnectedTo(this.positionAtOrigin ? origin || this._elementRef : this._elementRef).withTransformOriginOn(`.${this._cssClassPrefix}-tooltip`).withFlexibleDimensions(false).withViewportMargin(this._viewportMargin).withScrollableContainers(scrollableAncestors);
      strategy.positionChanges.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.takeUntil)(this._destroyed)).subscribe(change => {
        this._updateCurrentPositionClass(change.connectionPair);
        if (this._tooltipInstance) {
          if (change.scrollableViewProperties.isOverlayClipped && this._tooltipInstance.isVisible()) {
            // After position changes occur and the overlay is clipped by
            // a parent scrollable then close the tooltip.
            this._ngZone.run(() => this.hide(0));
          }
        }
      });
      this._overlayRef = this._overlay.create({
        direction: this._dir,
        positionStrategy: strategy,
        panelClass: `${this._cssClassPrefix}-${PANEL_CLASS}`,
        scrollStrategy: this._scrollStrategy()
      });
      this._updatePosition(this._overlayRef);
      this._overlayRef.detachments().pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.takeUntil)(this._destroyed)).subscribe(() => this._detach());
      this._overlayRef.outsidePointerEvents().pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.takeUntil)(this._destroyed)).subscribe(() => this._tooltipInstance?._handleBodyInteraction());
      this._overlayRef.keydownEvents().pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.takeUntil)(this._destroyed)).subscribe(event => {
        if (this._isTooltipVisible() && event.keyCode === _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_7__.ESCAPE && !(0,_angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_7__.hasModifierKey)(event)) {
          event.preventDefault();
          event.stopPropagation();
          this._ngZone.run(() => this.hide(0));
        }
      });
      if (this._defaultOptions?.disableTooltipInteractivity) {
        this._overlayRef.addPanelClass(`${this._cssClassPrefix}-tooltip-panel-non-interactive`);
      }
      return this._overlayRef;
    }
    /** Detaches the currently-attached tooltip. */
    _detach() {
      if (this._overlayRef && this._overlayRef.hasAttached()) {
        this._overlayRef.detach();
      }
      this._tooltipInstance = null;
    }
    /** Updates the position of the current tooltip. */
    _updatePosition(overlayRef) {
      const position = overlayRef.getConfig().positionStrategy;
      const origin = this._getOrigin();
      const overlay = this._getOverlayPosition();
      position.withPositions([this._addOffset({
        ...origin.main,
        ...overlay.main
      }), this._addOffset({
        ...origin.fallback,
        ...overlay.fallback
      })]);
    }
    /** Adds the configured offset to a position. Used as a hook for child classes. */
    _addOffset(position) {
      return position;
    }
    /**
     * Returns the origin position and a fallback position based on the user's position preference.
     * The fallback position is the inverse of the origin (e.g. `'below' -> 'above'`).
     */
    _getOrigin() {
      const isLtr = !this._dir || this._dir.value == 'ltr';
      const position = this.position;
      let originPosition;
      if (position == 'above' || position == 'below') {
        originPosition = {
          originX: 'center',
          originY: position == 'above' ? 'top' : 'bottom'
        };
      } else if (position == 'before' || position == 'left' && isLtr || position == 'right' && !isLtr) {
        originPosition = {
          originX: 'start',
          originY: 'center'
        };
      } else if (position == 'after' || position == 'right' && isLtr || position == 'left' && !isLtr) {
        originPosition = {
          originX: 'end',
          originY: 'center'
        };
      } else if (typeof ngDevMode === 'undefined' || ngDevMode) {
        throw getMatTooltipInvalidPositionError(position);
      }
      const {
        x,
        y
      } = this._invertPosition(originPosition.originX, originPosition.originY);
      return {
        main: originPosition,
        fallback: {
          originX: x,
          originY: y
        }
      };
    }
    /** Returns the overlay position and a fallback position based on the user's preference */
    _getOverlayPosition() {
      const isLtr = !this._dir || this._dir.value == 'ltr';
      const position = this.position;
      let overlayPosition;
      if (position == 'above') {
        overlayPosition = {
          overlayX: 'center',
          overlayY: 'bottom'
        };
      } else if (position == 'below') {
        overlayPosition = {
          overlayX: 'center',
          overlayY: 'top'
        };
      } else if (position == 'before' || position == 'left' && isLtr || position == 'right' && !isLtr) {
        overlayPosition = {
          overlayX: 'end',
          overlayY: 'center'
        };
      } else if (position == 'after' || position == 'right' && isLtr || position == 'left' && !isLtr) {
        overlayPosition = {
          overlayX: 'start',
          overlayY: 'center'
        };
      } else if (typeof ngDevMode === 'undefined' || ngDevMode) {
        throw getMatTooltipInvalidPositionError(position);
      }
      const {
        x,
        y
      } = this._invertPosition(overlayPosition.overlayX, overlayPosition.overlayY);
      return {
        main: overlayPosition,
        fallback: {
          overlayX: x,
          overlayY: y
        }
      };
    }
    /** Updates the tooltip message and repositions the overlay according to the new message length */
    _updateTooltipMessage() {
      // Must wait for the message to be painted to the tooltip so that the overlay can properly
      // calculate the correct positioning based on the size of the text.
      if (this._tooltipInstance) {
        this._tooltipInstance.message = this.message;
        this._tooltipInstance._markForCheck();
        this._ngZone.onMicrotaskEmpty.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.take)(1), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.takeUntil)(this._destroyed)).subscribe(() => {
          if (this._tooltipInstance) {
            this._overlayRef.updatePosition();
          }
        });
      }
    }
    /** Updates the tooltip class */
    _setTooltipClass(tooltipClass) {
      if (this._tooltipInstance) {
        this._tooltipInstance.tooltipClass = tooltipClass;
        this._tooltipInstance._markForCheck();
      }
    }
    /** Inverts an overlay position. */
    _invertPosition(x, y) {
      if (this.position === 'above' || this.position === 'below') {
        if (y === 'top') {
          y = 'bottom';
        } else if (y === 'bottom') {
          y = 'top';
        }
      } else {
        if (x === 'end') {
          x = 'start';
        } else if (x === 'start') {
          x = 'end';
        }
      }
      return {
        x,
        y
      };
    }
    /** Updates the class on the overlay panel based on the current position of the tooltip. */
    _updateCurrentPositionClass(connectionPair) {
      const {
        overlayY,
        originX,
        originY
      } = connectionPair;
      let newPosition;
      // If the overlay is in the middle along the Y axis,
      // it means that it's either before or after.
      if (overlayY === 'center') {
        // Note that since this information is used for styling, we want to
        // resolve `start` and `end` to their real values, otherwise consumers
        // would have to remember to do it themselves on each consumption.
        if (this._dir && this._dir.value === 'rtl') {
          newPosition = originX === 'end' ? 'left' : 'right';
        } else {
          newPosition = originX === 'start' ? 'left' : 'right';
        }
      } else {
        newPosition = overlayY === 'bottom' && originY === 'top' ? 'above' : 'below';
      }
      if (newPosition !== this._currentPosition) {
        const overlayRef = this._overlayRef;
        if (overlayRef) {
          const classPrefix = `${this._cssClassPrefix}-${PANEL_CLASS}-`;
          overlayRef.removePanelClass(classPrefix + this._currentPosition);
          overlayRef.addPanelClass(classPrefix + newPosition);
        }
        this._currentPosition = newPosition;
      }
    }
    /** Binds the pointer events to the tooltip trigger. */
    _setupPointerEnterEventsIfNeeded() {
      // Optimization: Defer hooking up events if there's no message or the tooltip is disabled.
      if (this._disabled || !this.message || !this._viewInitialized || this._passiveListeners.length) {
        return;
      }
      // The mouse events shouldn't be bound on mobile devices, because they can prevent the
      // first tap from firing its click event or can cause the tooltip to open for clicks.
      if (this._platformSupportsMouseEvents()) {
        this._passiveListeners.push(['mouseenter', event => {
          this._setupPointerExitEventsIfNeeded();
          let point = undefined;
          if (event.x !== undefined && event.y !== undefined) {
            point = event;
          }
          this.show(undefined, point);
        }]);
      } else if (this.touchGestures !== 'off') {
        this._disableNativeGesturesIfNecessary();
        this._passiveListeners.push(['touchstart', event => {
          const touch = event.targetTouches?.[0];
          const origin = touch ? {
            x: touch.clientX,
            y: touch.clientY
          } : undefined;
          // Note that it's important that we don't `preventDefault` here,
          // because it can prevent click events from firing on the element.
          this._setupPointerExitEventsIfNeeded();
          clearTimeout(this._touchstartTimeout);
          this._touchstartTimeout = setTimeout(() => this.show(undefined, origin), LONGPRESS_DELAY);
        }]);
      }
      this._addListeners(this._passiveListeners);
    }
    _setupPointerExitEventsIfNeeded() {
      if (this._pointerExitEventsInitialized) {
        return;
      }
      this._pointerExitEventsInitialized = true;
      const exitListeners = [];
      if (this._platformSupportsMouseEvents()) {
        exitListeners.push(['mouseleave', event => {
          const newTarget = event.relatedTarget;
          if (!newTarget || !this._overlayRef?.overlayElement.contains(newTarget)) {
            this.hide();
          }
        }], ['wheel', event => this._wheelListener(event)]);
      } else if (this.touchGestures !== 'off') {
        this._disableNativeGesturesIfNecessary();
        const touchendListener = () => {
          clearTimeout(this._touchstartTimeout);
          this.hide(this._defaultOptions.touchendHideDelay);
        };
        exitListeners.push(['touchend', touchendListener], ['touchcancel', touchendListener]);
      }
      this._addListeners(exitListeners);
      this._passiveListeners.push(...exitListeners);
    }
    _addListeners(listeners) {
      listeners.forEach(([event, listener]) => {
        this._elementRef.nativeElement.addEventListener(event, listener, passiveListenerOptions);
      });
    }
    _platformSupportsMouseEvents() {
      return !this._platform.IOS && !this._platform.ANDROID;
    }
    /** Listener for the `wheel` event on the element. */
    _wheelListener(event) {
      if (this._isTooltipVisible()) {
        const elementUnderPointer = this._document.elementFromPoint(event.clientX, event.clientY);
        const element = this._elementRef.nativeElement;
        // On non-touch devices we depend on the `mouseleave` event to close the tooltip, but it
        // won't fire if the user scrolls away using the wheel without moving their cursor. We
        // work around it by finding the element under the user's cursor and closing the tooltip
        // if it's not the trigger.
        if (elementUnderPointer !== element && !element.contains(elementUnderPointer)) {
          this.hide();
        }
      }
    }
    /** Disables the native browser gestures, based on how the tooltip has been configured. */
    _disableNativeGesturesIfNecessary() {
      const gestures = this.touchGestures;
      if (gestures !== 'off') {
        const element = this._elementRef.nativeElement;
        const style = element.style;
        // If gestures are set to `auto`, we don't disable text selection on inputs and
        // textareas, because it prevents the user from typing into them on iOS Safari.
        if (gestures === 'on' || element.nodeName !== 'INPUT' && element.nodeName !== 'TEXTAREA') {
          style.userSelect = style.msUserSelect = style.webkitUserSelect = style.MozUserSelect = 'none';
        }
        // If we have `auto` gestures and the element uses native HTML dragging,
        // we don't set `-webkit-user-drag` because it prevents the native behavior.
        if (gestures === 'on' || !element.draggable) {
          style.webkitUserDrag = 'none';
        }
        style.touchAction = 'none';
        style.webkitTapHighlightColor = 'transparent';
      }
    }
  }
  _class = _MatTooltipBase;
  _class.ɵfac = function _class_Factory(t) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinvalidFactory"]();
  };
  _class.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
    type: _class,
    inputs: {
      position: ["matTooltipPosition", "position"],
      positionAtOrigin: ["matTooltipPositionAtOrigin", "positionAtOrigin"],
      disabled: ["matTooltipDisabled", "disabled"],
      showDelay: ["matTooltipShowDelay", "showDelay"],
      hideDelay: ["matTooltipHideDelay", "hideDelay"],
      touchGestures: ["matTooltipTouchGestures", "touchGestures"],
      message: ["matTooltip", "message"],
      tooltipClass: ["matTooltipClass", "tooltipClass"]
    }
  });
  return _MatTooltipBase;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
/**
 * Directive that attaches a material design tooltip to the host element. Animates the showing and
 * hiding of a tooltip provided position (defaults to below the element).
 *
 * https://material.io/design/components/tooltips.html
 */
let MatTooltip = /*#__PURE__*/(() => {
  var _class2;
  class MatTooltip extends _MatTooltipBase {
    constructor(overlay, elementRef, scrollDispatcher, viewContainerRef, ngZone, platform, ariaDescriber, focusMonitor, scrollStrategy, dir, defaultOptions, _document) {
      super(overlay, elementRef, scrollDispatcher, viewContainerRef, ngZone, platform, ariaDescriber, focusMonitor, scrollStrategy, dir, defaultOptions, _document);
      this._tooltipComponent = TooltipComponent;
      this._cssClassPrefix = 'mat-mdc';
      this._viewportMargin = MIN_VIEWPORT_TOOLTIP_THRESHOLD;
    }
    _addOffset(position) {
      const offset = UNBOUNDED_ANCHOR_GAP;
      const isLtr = !this._dir || this._dir.value == 'ltr';
      if (position.originY === 'top') {
        position.offsetY = -offset;
      } else if (position.originY === 'bottom') {
        position.offsetY = offset;
      } else if (position.originX === 'start') {
        position.offsetX = isLtr ? -offset : offset;
      } else if (position.originX === 'end') {
        position.offsetX = isLtr ? offset : -offset;
      }
      return position;
    }
  }
  _class2 = MatTooltip;
  _class2.ɵfac = function _class2_Factory(t) {
    return new (t || _class2)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_1__.Overlay), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_8__.ScrollDispatcher), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewContainerRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.NgZone), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_2__.Platform), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_9__.AriaDescriber), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_9__.FocusMonitor), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](MAT_TOOLTIP_SCROLL_STRATEGY), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_10__.Directionality, 8), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](MAT_TOOLTIP_DEFAULT_OPTIONS, 8), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_11__.DOCUMENT));
  };
  _class2.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
    type: _class2,
    selectors: [["", "matTooltip", ""]],
    hostAttrs: [1, "mat-mdc-tooltip-trigger"],
    hostVars: 2,
    hostBindings: function _class2_HostBindings(rf, ctx) {
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("mat-mdc-tooltip-disabled", ctx.disabled);
      }
    },
    exportAs: ["matTooltip"],
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]]
  });
  return MatTooltip;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
let _TooltipComponentBase = /*#__PURE__*/(() => {
  var _class3;
  class _TooltipComponentBase {
    constructor(_changeDetectorRef, animationMode) {
      this._changeDetectorRef = _changeDetectorRef;
      /** Whether interactions on the page should close the tooltip */
      this._closeOnInteraction = false;
      /** Whether the tooltip is currently visible. */
      this._isVisible = false;
      /** Subject for notifying that the tooltip has been hidden from the view */
      this._onHide = new rxjs__WEBPACK_IMPORTED_MODULE_4__.Subject();
      this._animationsDisabled = animationMode === 'NoopAnimations';
    }
    /**
     * Shows the tooltip with an animation originating from the provided origin
     * @param delay Amount of milliseconds to the delay showing the tooltip.
     */
    show(delay) {
      // Cancel the delayed hide if it is scheduled
      if (this._hideTimeoutId != null) {
        clearTimeout(this._hideTimeoutId);
      }
      this._showTimeoutId = setTimeout(() => {
        this._toggleVisibility(true);
        this._showTimeoutId = undefined;
      }, delay);
    }
    /**
     * Begins the animation to hide the tooltip after the provided delay in ms.
     * @param delay Amount of milliseconds to delay showing the tooltip.
     */
    hide(delay) {
      // Cancel the delayed show if it is scheduled
      if (this._showTimeoutId != null) {
        clearTimeout(this._showTimeoutId);
      }
      this._hideTimeoutId = setTimeout(() => {
        this._toggleVisibility(false);
        this._hideTimeoutId = undefined;
      }, delay);
    }
    /** Returns an observable that notifies when the tooltip has been hidden from view. */
    afterHidden() {
      return this._onHide;
    }
    /** Whether the tooltip is being displayed. */
    isVisible() {
      return this._isVisible;
    }
    ngOnDestroy() {
      this._cancelPendingAnimations();
      this._onHide.complete();
      this._triggerElement = null;
    }
    /**
     * Interactions on the HTML body should close the tooltip immediately as defined in the
     * material design spec.
     * https://material.io/design/components/tooltips.html#behavior
     */
    _handleBodyInteraction() {
      if (this._closeOnInteraction) {
        this.hide(0);
      }
    }
    /**
     * Marks that the tooltip needs to be checked in the next change detection run.
     * Mainly used for rendering the initial text before positioning a tooltip, which
     * can be problematic in components with OnPush change detection.
     */
    _markForCheck() {
      this._changeDetectorRef.markForCheck();
    }
    _handleMouseLeave({
      relatedTarget
    }) {
      if (!relatedTarget || !this._triggerElement.contains(relatedTarget)) {
        if (this.isVisible()) {
          this.hide(this._mouseLeaveHideDelay);
        } else {
          this._finalizeAnimation(false);
        }
      }
    }
    /**
     * Callback for when the timeout in this.show() gets completed.
     * This method is only needed by the mdc-tooltip, and so it is only implemented
     * in the mdc-tooltip, not here.
     */
    _onShow() {}
    /** Event listener dispatched when an animation on the tooltip finishes. */
    _handleAnimationEnd({
      animationName
    }) {
      if (animationName === this._showAnimation || animationName === this._hideAnimation) {
        this._finalizeAnimation(animationName === this._showAnimation);
      }
    }
    /** Cancels any pending animation sequences. */
    _cancelPendingAnimations() {
      if (this._showTimeoutId != null) {
        clearTimeout(this._showTimeoutId);
      }
      if (this._hideTimeoutId != null) {
        clearTimeout(this._hideTimeoutId);
      }
      this._showTimeoutId = this._hideTimeoutId = undefined;
    }
    /** Handles the cleanup after an animation has finished. */
    _finalizeAnimation(toVisible) {
      if (toVisible) {
        this._closeOnInteraction = true;
      } else if (!this.isVisible()) {
        this._onHide.next();
      }
    }
    /** Toggles the visibility of the tooltip element. */
    _toggleVisibility(isVisible) {
      // We set the classes directly here ourselves so that toggling the tooltip state
      // isn't bound by change detection. This allows us to hide it even if the
      // view ref has been detached from the CD tree.
      const tooltip = this._tooltip.nativeElement;
      const showClass = this._showAnimation;
      const hideClass = this._hideAnimation;
      tooltip.classList.remove(isVisible ? hideClass : showClass);
      tooltip.classList.add(isVisible ? showClass : hideClass);
      this._isVisible = isVisible;
      // It's common for internal apps to disable animations using `* { animation: none !important }`
      // which can break the opening sequence. Try to detect such cases and work around them.
      if (isVisible && !this._animationsDisabled && typeof getComputedStyle === 'function') {
        const styles = getComputedStyle(tooltip);
        // Use `getPropertyValue` to avoid issues with property renaming.
        if (styles.getPropertyValue('animation-duration') === '0s' || styles.getPropertyValue('animation-name') === 'none') {
          this._animationsDisabled = true;
        }
      }
      if (isVisible) {
        this._onShow();
      }
      if (this._animationsDisabled) {
        tooltip.classList.add('_mat-animation-noopable');
        this._finalizeAnimation(isVisible);
      }
    }
  }
  _class3 = _TooltipComponentBase;
  _class3.ɵfac = function _class3_Factory(t) {
    return new (t || _class3)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ANIMATION_MODULE_TYPE, 8));
  };
  _class3.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
    type: _class3
  });
  return _TooltipComponentBase;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
/**
 * Internal component that wraps the tooltip's content.
 * @docs-private
 */
let TooltipComponent = /*#__PURE__*/(() => {
  var _class4;
  class TooltipComponent extends _TooltipComponentBase {
    constructor(changeDetectorRef, _elementRef, animationMode) {
      super(changeDetectorRef, animationMode);
      this._elementRef = _elementRef;
      /* Whether the tooltip text overflows to multiple lines */
      this._isMultiline = false;
      this._showAnimation = 'mat-mdc-tooltip-show';
      this._hideAnimation = 'mat-mdc-tooltip-hide';
    }
    _onShow() {
      this._isMultiline = this._isTooltipMultiline();
      this._markForCheck();
    }
    /** Whether the tooltip text has overflown to the next line */
    _isTooltipMultiline() {
      const rect = this._elementRef.nativeElement.getBoundingClientRect();
      return rect.height > MIN_HEIGHT && rect.width >= MAX_WIDTH;
    }
  }
  _class4 = TooltipComponent;
  _class4.ɵfac = function _class4_Factory(t) {
    return new (t || _class4)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ANIMATION_MODULE_TYPE, 8));
  };
  _class4.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
    type: _class4,
    selectors: [["mat-tooltip-component"]],
    viewQuery: function _class4_Query(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, 7);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx._tooltip = _t.first);
      }
    },
    hostAttrs: ["aria-hidden", "true"],
    hostVars: 2,
    hostBindings: function _class4_HostBindings(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("mouseleave", function _class4_mouseleave_HostBindingHandler($event) {
          return ctx._handleMouseLeave($event);
        });
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleProp"]("zoom", ctx.isVisible() ? 1 : null);
      }
    },
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]],
    decls: 4,
    vars: 4,
    consts: [[1, "mdc-tooltip", "mdc-tooltip--shown", "mat-mdc-tooltip", 3, "ngClass", "animationend"], ["tooltip", ""], [1, "mdc-tooltip__surface", "mdc-tooltip__surface-animation"]],
    template: function _class4_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("animationend", function _class4_Template_div_animationend_0_listener($event) {
          return ctx._handleAnimationEnd($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("mdc-tooltip--multiline", ctx._isMultiline);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", ctx.tooltipClass);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.message);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_11__.NgClass],
    styles: [".mdc-tooltip__surface{word-break:break-all;word-break:var(--mdc-tooltip-word-break, normal);overflow-wrap:anywhere}.mdc-tooltip--showing-transition .mdc-tooltip__surface-animation{transition:opacity 150ms 0ms cubic-bezier(0, 0, 0.2, 1),transform 150ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-tooltip--hide-transition .mdc-tooltip__surface-animation{transition:opacity 75ms 0ms cubic-bezier(0.4, 0, 1, 1)}.mdc-tooltip{position:fixed;display:none;z-index:9}.mdc-tooltip-wrapper--rich{position:relative}.mdc-tooltip--shown,.mdc-tooltip--showing,.mdc-tooltip--hide{display:inline-flex}.mdc-tooltip--shown.mdc-tooltip--rich,.mdc-tooltip--showing.mdc-tooltip--rich,.mdc-tooltip--hide.mdc-tooltip--rich{display:inline-block;left:-320px;position:absolute}.mdc-tooltip__surface{line-height:16px;padding:4px 8px;min-width:40px;max-width:200px;min-height:24px;max-height:40vh;box-sizing:border-box;overflow:hidden;text-align:center}.mdc-tooltip__surface::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:1px solid rgba(0,0,0,0);border-radius:inherit;content:\"\";pointer-events:none}@media screen and (forced-colors: active){.mdc-tooltip__surface::before{border-color:CanvasText}}.mdc-tooltip--rich .mdc-tooltip__surface{align-items:flex-start;display:flex;flex-direction:column;min-height:24px;min-width:40px;max-width:320px;position:relative}.mdc-tooltip--multiline .mdc-tooltip__surface{text-align:left}[dir=rtl] .mdc-tooltip--multiline .mdc-tooltip__surface,.mdc-tooltip--multiline .mdc-tooltip__surface[dir=rtl]{text-align:right}.mdc-tooltip__surface .mdc-tooltip__title{margin:0 8px}.mdc-tooltip__surface .mdc-tooltip__content{max-width:calc(200px - (2 * 8px));margin:8px;text-align:left}[dir=rtl] .mdc-tooltip__surface .mdc-tooltip__content,.mdc-tooltip__surface .mdc-tooltip__content[dir=rtl]{text-align:right}.mdc-tooltip--rich .mdc-tooltip__surface .mdc-tooltip__content{max-width:calc(320px - (2 * 8px));align-self:stretch}.mdc-tooltip__surface .mdc-tooltip__content-link{text-decoration:none}.mdc-tooltip--rich-actions,.mdc-tooltip__content,.mdc-tooltip__title{z-index:1}.mdc-tooltip__surface-animation{opacity:0;transform:scale(0.8);will-change:transform,opacity}.mdc-tooltip--shown .mdc-tooltip__surface-animation{transform:scale(1);opacity:1}.mdc-tooltip--hide .mdc-tooltip__surface-animation{transform:scale(1)}.mdc-tooltip__caret-surface-top,.mdc-tooltip__caret-surface-bottom{position:absolute;height:24px;width:24px;transform:rotate(35deg) skewY(20deg) scaleX(0.9396926208)}.mdc-tooltip__caret-surface-top .mdc-elevation-overlay,.mdc-tooltip__caret-surface-bottom .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}.mdc-tooltip__caret-surface-bottom{box-shadow:0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);outline:1px solid rgba(0,0,0,0);z-index:-1}@media screen and (forced-colors: active){.mdc-tooltip__caret-surface-bottom{outline-color:CanvasText}}.mat-mdc-tooltip{--mdc-plain-tooltip-container-shape:4px;--mdc-plain-tooltip-supporting-text-line-height:16px}.mat-mdc-tooltip .mdc-tooltip__surface{background-color:var(--mdc-plain-tooltip-container-color)}.mat-mdc-tooltip .mdc-tooltip__surface{border-radius:var(--mdc-plain-tooltip-container-shape)}.mat-mdc-tooltip .mdc-tooltip__caret-surface-top,.mat-mdc-tooltip .mdc-tooltip__caret-surface-bottom{border-radius:var(--mdc-plain-tooltip-container-shape)}.mat-mdc-tooltip .mdc-tooltip__surface{color:var(--mdc-plain-tooltip-supporting-text-color)}.mat-mdc-tooltip .mdc-tooltip__surface{font-family:var(--mdc-plain-tooltip-supporting-text-font);line-height:var(--mdc-plain-tooltip-supporting-text-line-height);font-size:var(--mdc-plain-tooltip-supporting-text-size);font-weight:var(--mdc-plain-tooltip-supporting-text-weight);letter-spacing:var(--mdc-plain-tooltip-supporting-text-tracking)}.mat-mdc-tooltip{position:relative;transform:scale(0)}.mat-mdc-tooltip::before{content:\"\";top:0;right:0;bottom:0;left:0;z-index:-1;position:absolute}.mat-mdc-tooltip-panel-below .mat-mdc-tooltip::before{top:-8px}.mat-mdc-tooltip-panel-above .mat-mdc-tooltip::before{bottom:-8px}.mat-mdc-tooltip-panel-right .mat-mdc-tooltip::before{left:-8px}.mat-mdc-tooltip-panel-left .mat-mdc-tooltip::before{right:-8px}.mat-mdc-tooltip._mat-animation-noopable{animation:none;transform:scale(1)}.mat-mdc-tooltip-panel-non-interactive{pointer-events:none}@keyframes mat-mdc-tooltip-show{0%{opacity:0;transform:scale(0.8)}100%{opacity:1;transform:scale(1)}}@keyframes mat-mdc-tooltip-hide{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(0.8)}}.mat-mdc-tooltip-show{animation:mat-mdc-tooltip-show 150ms cubic-bezier(0, 0, 0.2, 1) forwards}.mat-mdc-tooltip-hide{animation:mat-mdc-tooltip-hide 75ms cubic-bezier(0.4, 0, 1, 1) forwards}"],
    encapsulation: 2,
    changeDetection: 0
  });
  return TooltipComponent;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();

/**
 * Animations used by MatTooltip.
 * @docs-private
 */
const matTooltipAnimations = {
  /** Animation that transitions a tooltip in and out. */
  tooltipState: /*#__PURE__*/(0,_angular_animations__WEBPACK_IMPORTED_MODULE_12__.trigger)('state', [
  /*#__PURE__*/
  // TODO(crisbeto): these values are based on MDC's CSS.
  // We should be able to use their styles directly once we land #19432.
  (0,_angular_animations__WEBPACK_IMPORTED_MODULE_12__.state)('initial, void, hidden', /*#__PURE__*/(0,_angular_animations__WEBPACK_IMPORTED_MODULE_12__.style)({
    opacity: 0,
    transform: 'scale(0.8)'
  })), /*#__PURE__*/(0,_angular_animations__WEBPACK_IMPORTED_MODULE_12__.state)('visible', /*#__PURE__*/(0,_angular_animations__WEBPACK_IMPORTED_MODULE_12__.style)({
    transform: 'scale(1)'
  })), /*#__PURE__*/(0,_angular_animations__WEBPACK_IMPORTED_MODULE_12__.transition)('* => visible', /*#__PURE__*/(0,_angular_animations__WEBPACK_IMPORTED_MODULE_12__.animate)('150ms cubic-bezier(0, 0, 0.2, 1)')), /*#__PURE__*/(0,_angular_animations__WEBPACK_IMPORTED_MODULE_12__.transition)('* => hidden', /*#__PURE__*/(0,_angular_animations__WEBPACK_IMPORTED_MODULE_12__.animate)('75ms cubic-bezier(0.4, 0, 1, 1)'))])
};
let MatTooltipModule = /*#__PURE__*/(() => {
  var _class5;
  class MatTooltipModule {}
  _class5 = MatTooltipModule;
  _class5.ɵfac = function _class5_Factory(t) {
    return new (t || _class5)();
  };
  _class5.ɵmod = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
    type: _class5
  });
  _class5.ɵinj = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
    providers: [MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER],
    imports: [_angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_9__.A11yModule, _angular_common__WEBPACK_IMPORTED_MODULE_11__.CommonModule, _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_1__.OverlayModule, _angular_material_core__WEBPACK_IMPORTED_MODULE_13__.MatCommonModule, _angular_material_core__WEBPACK_IMPORTED_MODULE_13__.MatCommonModule, _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_8__.CdkScrollableModule]
  });
  return MatTooltipModule;
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
//# sourceMappingURL=934.js.map