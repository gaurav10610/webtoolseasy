"use strict";
(self["webpackChunkwebtoolseasy"] = self["webpackChunkwebtoolseasy"] || []).push([["src_app_modules_image-cropper_image-cropper_module_ts"],{

/***/ 7421:
/*!********************************!*\
  !*** ./src/app/@types/file.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FileDataType: () => (/* binding */ FileDataType)
/* harmony export */ });
var FileDataType;
(function (FileDataType) {
  FileDataType["IMAGE"] = "image";
  FileDataType["VIDEO"] = "video";
})(FileDataType || (FileDataType = {}));

/***/ }),

/***/ 9707:
/*!***********************************************************************!*\
  !*** ./src/app/modules/image-cropper/image-cropper-routing.module.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ImageCropperRoutingModule: () => (/* binding */ ImageCropperRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 7947);
/* harmony import */ var _image_cropper_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./image-cropper.component */ 9513);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 1699);
var _class;




const routes = [{
  path: '',
  component: _image_cropper_component__WEBPACK_IMPORTED_MODULE_0__.ImageCropperComponent
}];
class ImageCropperRoutingModule {}
_class = ImageCropperRoutingModule;
_class.ɵfac = function ImageCropperRoutingModule_Factory(t) {
  return new (t || _class)();
};
_class.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
  type: _class
});
_class.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](ImageCropperRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
})();

/***/ }),

/***/ 9513:
/*!******************************************************************!*\
  !*** ./src/app/modules/image-cropper/image-cropper.component.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ImageCropperComponent: () => (/* binding */ ImageCropperComponent)
/* harmony export */ });
/* harmony import */ var _Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 1670);
/* harmony import */ var src_app_types_file__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/@types/file */ 7421);
/* harmony import */ var src_app_service_ffmpeg_lib_util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/service/ffmpeg/lib/util */ 5601);
/* harmony import */ var src_app_service_util_logger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/service/util/logger */ 4930);
/* harmony import */ var src_environments_component_config_image_cropper_config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/environments/component-config/image-cropper/config */ 8908);
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/environments/environment */ 553);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var src_app_service_file_file_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/service/file/file.service */ 6857);
/* harmony import */ var src_app_service_platform_metadata_platform_metadata_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/service/platform-metadata/platform-metadata.service */ 3242);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/icon */ 6515);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/button */ 895);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/form-field */ 1333);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/select */ 6355);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/core */ 5309);
/* harmony import */ var ngx_image_cropper__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ngx-image-cropper */ 4214);

var _class;















const _c0 = ["inputFiles"];
const _c1 = ["imageCropperContainer"];
const _c2 = ["imageCropper"];
const _c3 = ["croppedImageContainer"];
const _c4 = ["croppedImageTag"];
function ImageCropperComponent_div_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("drop", function ImageCropperComponent_div_3_Template_div_drop_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r9);
      const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r8.dropHandler($event));
    })("dragover", function ImageCropperComponent_div_3_Template_div_dragover_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r9);
      const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r10.dragOverHandler($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](1, "mat-icon", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](2, "collections");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](3, "span", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](4, "Drag & drop files here");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](5, "span", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](6, "or");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](7, "button", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function ImageCropperComponent_div_3_Template_button_click_7_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r9);
      const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r11.openFileDialog());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](8, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](9, "file_upload");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](10, "Browse For Files ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
  }
}
function ImageCropperComponent_div_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 13)(1, "button", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function ImageCropperComponent_div_4_Template_button_click_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r13);
      const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r12.openFileDialog());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](2, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](3, "file_upload");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](4, "Upload More Images ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
  }
}
function ImageCropperComponent_span_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "span", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1, "Uploaded Images");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
}
function ImageCropperComponent_div_6_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function ImageCropperComponent_div_6_div_1_Template_div_click_0_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r17);
      const imageFile_r15 = restoredCtx.$implicit;
      const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r16.selectCurrentFile(imageFile_r15.id));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](1, "img", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](2, "div", 19)(3, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const imageFile_r15 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpropertyInterpolate"]("src", imageFile_r15 == null ? null : imageFile_r15.dataURI, _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](imageFile_r15 == null ? null : imageFile_r15.name);
  }
}
function ImageCropperComponent_div_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](1, ImageCropperComponent_div_6_div_1_Template, 5, 2, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngForOf", ctx_r4.fileList);
  }
}
function ImageCropperComponent_span_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "span", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1, "Crop & Preview");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
}
function ImageCropperComponent_div_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r23 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 20)(1, "div", 21, 22)(3, "image-cropper", 23, 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("imageCropped", function ImageCropperComponent_div_8_Template_image_cropper_imageCropped_3_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r23);
      const ctx_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r22.imageCropped($event));
    })("loadImageFailed", function ImageCropperComponent_div_8_Template_image_cropper_loadImageFailed_3_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r23);
      const ctx_r24 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r24.loadImageFailed());
    })("cropperReady", function ImageCropperComponent_div_8_Template_image_cropper_cropperReady_3_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r23);
      const ctx_r25 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r25.cropperReady());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](5, "div", 25, 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](7, "img", 27, 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("imageFile", ctx_r6.currentFile.file)("maintainAspectRatio", false)("format", ctx_r6.outputFormat);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpropertyInterpolate"]("src", ctx_r6.croppedImage, _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵsanitizeUrl"]);
  }
}
function ImageCropperComponent_div_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r27 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 29)(1, "mat-form-field", 30)(2, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](3, "Output Format");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](4, "mat-select", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("valueChange", function ImageCropperComponent_div_9_Template_mat_select_valueChange_4_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r27);
      const ctx_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r26.onOutputFormatChange($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](5, "mat-option", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](6, "PNG");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](7, "mat-option", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](8, "JPG");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](9, "mat-option", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](10, "WEBP");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](11, "mat-option", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](12, "BMP");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](13, "mat-option", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](14, "ICO");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](15, "button", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function ImageCropperComponent_div_9_Template_button_click_15_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r27);
      const ctx_r28 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r28.downloadCroppedImage());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](16, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](17, "file_download");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](18, "Download Image ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
  }
}
class ImageCropperComponent {
  constructor(renderer, fileService, platformMetaDataService) {
    this.renderer = renderer;
    this.fileService = fileService;
    this.platformMetaDataService = platformMetaDataService;
    this.applicationConfig = src_environments_component_config_image_cropper_config__WEBPACK_IMPORTED_MODULE_4__.componentConfig;
    this.descriptionData = src_environments_component_config_image_cropper_config__WEBPACK_IMPORTED_MODULE_4__.descriptionData;
    this.validImageFormats = '.jpg,.jpeg,.png,.webp,.bmp';
    this.fileList = [];
    this.currentFile = undefined;
    this.croppedImage = undefined;
    this.outputFormat = 'png'; // supported values - png, jpeg, webp, bmp, ico
    if (platformMetaDataService.isPlatformBrowser) {
      (0,src_app_service_ffmpeg_lib_util__WEBPACK_IMPORTED_MODULE_2__.importScript)(src_environments_environment__WEBPACK_IMPORTED_MODULE_5__.environment.hammerJSPathUrl);
    }
  }
  selectFiles(event) {
    for (const file of event.target.files) {
      this.addFileToCrop(file);
    }
    // set first file as current file
    this.currentFile = this.fileList[0];
  }
  openFileDialog() {
    this.renderer.selectRootElement(this.inputFiles.nativeElement, true).click();
  }
  /**
   * file drop event handler
   * @param event
   */
  dropHandler(event) {
    // Prevent default behavior (Prevent file from being opened)
    event.preventDefault();
    if (event.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      [...event.dataTransfer.items].filter(item => item.kind === 'file').map(item => item.getAsFile()).forEach(file => this.addFileToCrop(file));
    } else {
      // Use DataTransfer interface to access the file(s)
      [...event.dataTransfer.files].forEach(file => this.addFileToCrop(file));
    }
    // set first file as current file
    this.currentFile = this.fileList[0];
  }
  /**
   * handle drag over event
   * @param event
   */
  dragOverHandler(event) {
    // Prevent default behavior (Prevent file from being opened)
    event.preventDefault();
  }
  addFileToCrop(file) {
    const fileData = {
      id: crypto.randomUUID(),
      file: file,
      type: src_app_types_file__WEBPACK_IMPORTED_MODULE_1__.FileDataType.IMAGE,
      name: file.name
    };
    this.fileList.push(fileData);
    this.fileService.readFileAsURL(fileData.id, file, this.readImageDataURI.bind(this));
  }
  selectCurrentFile(id) {
    const fileData = this.fileList.find(fileData => fileData.id === id);
    this.currentFile = fileData;
    if (this.currentFile?.dataURI === undefined) {
      this.fileService.readFileAsURL(id, fileData.file, this.readImageDataURI.bind(this));
    }
  }
  /**
   * handle image cropper ready event
   */
  cropperReady() {
    this.renderer.setStyle(this.croppedImageContainer.nativeElement, 'max-width', `${this.imageCropperContainer.nativeElement.offsetWidth}px`);
    this.renderer.setStyle(this.croppedImageContainer.nativeElement, 'max-height', `${this.imageCropperContainer.nativeElement.offsetHeight}px`);
    this.renderer.setStyle(this.croppedImageTag.nativeElement, 'max-width', `${this.imageCropper.maxSize.width}px`);
    this.renderer.setStyle(this.croppedImageTag.nativeElement, 'max-height', `${this.imageCropper.maxSize.height}px`);
  }
  readImageDataURI(id, imageDataURI) {
    const fileData = this.fileList.find(fileData => fileData.id === id);
    fileData.dataURI = imageDataURI;
  }
  imageCropped(event) {
    this.croppedImage = URL.createObjectURL(event.blob);
  }
  loadImageFailed() {
    src_app_service_util_logger__WEBPACK_IMPORTED_MODULE_3__.LogUtils.error(`cropper image load failed for image with id: ${this.currentFile?.id} and name: ${this.currentFile?.name}`);
  }
  downloadCroppedImage() {
    var _this = this;
    return (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const formattedFileName = _this.fileService.getFormattedFileName(_this.currentFile.name);
      const plainFileName = _this.fileService.getPlainFileName(formattedFileName);
      const downloadAnchor = _this.renderer.createElement('a');
      _this.renderer.setProperty(downloadAnchor, 'href', _this.croppedImage);
      _this.renderer.setProperty(downloadAnchor, 'download', `${plainFileName}.${_this.outputFormat}`);
      downloadAnchor.click();
    })();
  }
  onOutputFormatChange(event) {
    this.outputFormat = event;
  }
}
_class = ImageCropperComponent;
_class.ɵfac = function ImageCropperComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_8__.Renderer2), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](src_app_service_file_file_service__WEBPACK_IMPORTED_MODULE_6__.FileService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](src_app_service_platform_metadata_platform_metadata_service__WEBPACK_IMPORTED_MODULE_7__.PlatformMetadataService));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["app-image-cropper"]],
  viewQuery: function ImageCropperComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵviewQuery"](_c0, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵviewQuery"](_c1, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵviewQuery"](_c2, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵviewQuery"](_c3, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵviewQuery"](_c4, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵloadQuery"]()) && (ctx.inputFiles = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵloadQuery"]()) && (ctx.imageCropperContainer = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵloadQuery"]()) && (ctx.imageCropper = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵloadQuery"]()) && (ctx.croppedImageContainer = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵloadQuery"]()) && (ctx.croppedImageTag = _t.first);
    }
  },
  decls: 10,
  vars: 8,
  consts: [[1, "flex-display", "flex-column-flow", "flex-align-center", "flex-gap-xlarge"], ["type", "file", "multiple", "", 2, "display", "none", 3, "accept", "change"], ["inputFiles", ""], ["class", "flex-display flex-column-flow flex-center flex-align-center border-grey full-width flex-gap-medium file-drop-area", 3, "drop", "dragover", 4, "ngIf"], ["class", "flex-display flex-row-flow full-width", "style", "justify-content: end", 4, "ngIf"], ["style", "font-size: large; align-self: flex-start", 4, "ngIf"], ["class", "flex-display flex-align-center full-width flex-gap-large auto-scroll", 4, "ngIf"], ["class", "flex-display flex-row-flow flex-align-center full-width cropper-container", 4, "ngIf"], ["class", "flex-display flex-align-center flex-gap-medium", "style", "justify-content: end; margin-top: 20px; align-self: flex-end", 4, "ngIf"], [1, "flex-display", "flex-column-flow", "flex-center", "flex-align-center", "border-grey", "full-width", "flex-gap-medium", "file-drop-area", 3, "drop", "dragover"], [2, "transform", "scale(2)"], [1, "header-font", 2, "font-size", "large"], ["mat-stroked-button", "", "color", "primary", "matTooltip", "select images to compress", 3, "click"], [1, "flex-display", "flex-row-flow", "full-width", 2, "justify-content", "end"], [2, "font-size", "large", "align-self", "flex-start"], [1, "flex-display", "flex-align-center", "full-width", "flex-gap-large", "auto-scroll"], ["class", "flex-display flex-column-flow flex-center border-grey shadow-grey thumbnail-container pointer-cursor", 3, "click", 4, "ngFor", "ngForOf"], [1, "flex-display", "flex-column-flow", "flex-center", "border-grey", "shadow-grey", "thumbnail-container", "pointer-cursor", 3, "click"], ["mat-card-image", "", "alt", "selected image for crop", 3, "src"], [1, "full-width", "flex-display", "flex-row-flow", "flex-center", 2, "overflow", "hidden"], [1, "flex-display", "flex-row-flow", "flex-align-center", "full-width", "cropper-container"], [1, "flex-display", "flex-column-flow", "flex-center", "cropped-box", "border-grey"], ["imageCropperContainer", ""], [2, "max-height", "100%", "max-width", "100%", 3, "imageFile", "maintainAspectRatio", "format", "imageCropped", "loadImageFailed", "cropperReady"], ["imageCropper", ""], [1, "flex-display", "flex-column-flow", "flex-center", "flex-align-center", "cropped-box", "border-grey"], ["croppedImageContainer", ""], ["alt", "cropped image", 3, "src"], ["croppedImageTag", ""], [1, "flex-display", "flex-align-center", "flex-gap-medium", 2, "justify-content", "end", "margin-top", "20px", "align-self", "flex-end"], ["appearance", "outline", "color", "primary", 2, "margin-bottom", "-1.25em"], ["disableRipple", "", "value", "png", 3, "valueChange"], ["value", "png"], ["value", "jpeg"], ["value", "webp"], ["value", "bmp"], ["value", "ico"]],
  template: function ImageCropperComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 0)(1, "input", 1, 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("change", function ImageCropperComponent_Template_input_change_1_listener($event) {
        return ctx.selectFiles($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](3, ImageCropperComponent_div_3_Template, 11, 0, "div", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](4, ImageCropperComponent_div_4_Template, 5, 0, "div", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](5, ImageCropperComponent_span_5_Template, 2, 0, "span", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](6, ImageCropperComponent_div_6_Template, 2, 1, "div", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](7, ImageCropperComponent_span_7_Template, 2, 0, "span", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](8, ImageCropperComponent_div_8_Template, 9, 4, "div", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](9, ImageCropperComponent_div_9_Template, 19, 0, "div", 8);
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
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.currentFile && ctx.platformMetaDataService.isPlatformBrowser);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.currentFile);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_9__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_9__.NgIf, _angular_material_icon__WEBPACK_IMPORTED_MODULE_10__.MatIcon, _angular_material_button__WEBPACK_IMPORTED_MODULE_11__.MatButton, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_12__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_12__.MatLabel, _angular_material_select__WEBPACK_IMPORTED_MODULE_13__.MatSelect, _angular_material_core__WEBPACK_IMPORTED_MODULE_14__.MatOption, ngx_image_cropper__WEBPACK_IMPORTED_MODULE_15__.ImageCropperComponent],
  styles: [".file-drop-area[_ngcontent-%COMP%] {\n  border-radius: 10px;\n  padding-top: 30px;\n  padding-bottom: 30px;\n}\n\n.thumbnail-container[_ngcontent-%COMP%] {\n  width: 198px;\n  height: 244px;\n  padding: 5px;\n}\n\n.cropped-box[_ngcontent-%COMP%] {\n  width: 45%;\n  border-radius: 10px;\n  max-height: 500px;\n}\n\n@media screen and (min-width: 735px) {\n  .cropper-container[_ngcontent-%COMP%] {\n    max-height: 500px;\n    justify-content: space-between;\n  }\n}\n@media screen and (max-width: 735px) {\n  .cropper-container[_ngcontent-%COMP%] {\n    max-height: 1030px;\n    flex-direction: column;\n    gap: 15px;\n  }\n  .cropped-box[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvbW9kdWxlcy9pbWFnZS1jcm9wcGVyL2ltYWdlLWNyb3BwZXIuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxtQkFBQTtFQUNBLGlCQUFBO0VBQ0Esb0JBQUE7QUFDRjs7QUFFQTtFQUNFLFlBQUE7RUFDQSxhQUFBO0VBQ0EsWUFBQTtBQUNGOztBQUVBO0VBQ0UsVUFBQTtFQUNBLG1CQUFBO0VBQ0EsaUJBQUE7QUFDRjs7QUFFQTtFQUNFO0lBQ0UsaUJBQUE7SUFDQSw4QkFBQTtFQUNGO0FBQ0Y7QUFFQTtFQUNFO0lBQ0Usa0JBQUE7SUFDQSxzQkFBQTtJQUNBLFNBQUE7RUFBRjtFQUVBO0lBQ0UsV0FBQTtFQUFGO0FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIuZmlsZS1kcm9wLWFyZWEge1xuICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICBwYWRkaW5nLXRvcDogMzBweDtcbiAgcGFkZGluZy1ib3R0b206IDMwcHg7XG59XG5cbi50aHVtYm5haWwtY29udGFpbmVyIHtcbiAgd2lkdGg6IDE5OHB4O1xuICBoZWlnaHQ6IDI0NHB4O1xuICBwYWRkaW5nOiA1cHg7XG59XG5cbi5jcm9wcGVkLWJveCB7XG4gIHdpZHRoOiA0NSU7XG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gIG1heC1oZWlnaHQ6IDUwMHB4O1xufVxuXG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA3MzVweCkge1xuICAuY3JvcHBlci1jb250YWluZXIge1xuICAgIG1heC1oZWlnaHQ6IDUwMHB4O1xuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgfVxufVxuXG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA3MzVweCkge1xuICAuY3JvcHBlci1jb250YWluZXIge1xuICAgIG1heC1oZWlnaHQ6IDEwMzBweDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIGdhcDogMTVweDtcbiAgfVxuICAuY3JvcHBlZC1ib3gge1xuICAgIHdpZHRoOiAxMDAlO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
});

/***/ }),

/***/ 6543:
/*!***************************************************************!*\
  !*** ./src/app/modules/image-cropper/image-cropper.module.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ImageCropperModule: () => (/* binding */ ImageCropperModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _image_cropper_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./image-cropper-routing.module */ 9707);
/* harmony import */ var _image_cropper_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./image-cropper.component */ 9513);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/button */ 895);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/icon */ 6515);
/* harmony import */ var ngx_image_cropper__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngx-image-cropper */ 4214);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/select */ 6355);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 1699);
var _class;








class ImageCropperModule {}
_class = ImageCropperModule;
_class.ɵfac = function ImageCropperModule_Factory(t) {
  return new (t || _class)();
};
_class.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
  type: _class
});
_class.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _image_cropper_routing_module__WEBPACK_IMPORTED_MODULE_0__.ImageCropperRoutingModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__.MatIconModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_5__.MatButtonModule, _angular_material_select__WEBPACK_IMPORTED_MODULE_6__.MatSelectModule, ngx_image_cropper__WEBPACK_IMPORTED_MODULE_7__.ImageCropperModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](ImageCropperModule, {
    declarations: [_image_cropper_component__WEBPACK_IMPORTED_MODULE_1__.ImageCropperComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _image_cropper_routing_module__WEBPACK_IMPORTED_MODULE_0__.ImageCropperRoutingModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__.MatIconModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_5__.MatButtonModule, _angular_material_select__WEBPACK_IMPORTED_MODULE_6__.MatSelectModule, ngx_image_cropper__WEBPACK_IMPORTED_MODULE_7__.ImageCropperModule]
  });
})();

/***/ }),

/***/ 8908:
/*!*******************************************************************!*\
  !*** ./src/environments/component-config/image-cropper/config.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   componentConfig: () => (/* binding */ componentConfig),
/* harmony export */   descriptionData: () => (/* binding */ descriptionData)
/* harmony export */ });
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/environments/environment */ 553);
/* harmony import */ var src_environments_tools_directory_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/environments/tools-directory-config */ 6636);


const navigationUrl = '/tools/crop-image';
const pageTitle = 'Free Online Image Cropper: Crop Your Photos Online for Free';
const pageDescription = 'Crop your images online for free with our easy-to-use image cropper. No download required, no sign-up required. Crop JPG, PNG, WEBP, BMP For Free.';
const imageUrl = `${src_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.screenshotsBaseUrl}/image-cropper.png`;
const keywords = 'free image cropper,online image cropper,crop images online,crop JPEG images,crop PNG images,crop GIF images,crop BMP images,image cropping,image composition,image aspect ratio,social media image cropping,website image cropping,remove unwanted parts of an image,resize an image,create a square image';
const relatedTools = [src_environments_tools_directory_config__WEBPACK_IMPORTED_MODULE_1__.ApplicationIds.IMAGE_COMPRESSOR];
const componentConfig = {
  mainHeading: 'Free Online Image Cropper: Crop JPG, PNG, WEBP, BMP Images',
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
  heading: 'Why Use an Image Cropper?',
  listData: ['To remove unwanted parts of an image. This can be useful for improving the composition of an image or for removing distracting elements.', 'To resize an image to a specific size. This can be useful for sharing images on social media or for using images on a website.', 'To create a square image. Square images are often preferred for social media platforms and for sharing on mobile devices.']
}, {
  heading: 'Features of Our Free Online Image Cropper',
  listData: ['Free to use. No need to pay or sign up for an account.', 'No download required. Crop your images directly from your web browser.', 'Supports multiple image formats. Crop JPEG, PNG, GIF, and BMP images.', 'Easy to use. Simply upload your image and drag the crop box to the desired size and location.', 'Save your cropped images in the desired format.']
}, {
  heading: 'How to Use Our Free Online Image Cropper',
  listData: ['Go to our website and click the "Upload Image" button.', 'Select the image you want to crop.', 'Drag the crop box to the desired size and location.', 'Click the "Crop Image" button.', 'Save your cropped image.']
}, {
  heading: 'Tips for Using an Image Cropper',
  listData: ['Consider the composition of your image. When cropping an image, it is important to consider the composition. Try to crop your image in a way that highlights the most important elements and creates a balanced and visually appealing image.', 'Use the crop ratio tool. Many image croppers have a crop ratio tool that allows you to crop your image to a specific aspect ratio. This can be useful for cropping images for social media or for using images on a website.', 'Save a copy of the original image. Before cropping your image, it is a good idea to save a copy of the original image. This way, you can always go back to the original image if you are not happy with the cropped image.']
}, {
  blockData: ['Our free online image cropper is a great way to crop your images online for free. It is easy to use and supports multiple image formats. With our image cropper, you can remove unwanted parts of an image, resize an image to a specific size, or create a square image.']
}];

/***/ }),

/***/ 4214:
/*!***********************************************************************!*\
  !*** ./node_modules/ngx-image-cropper/fesm2020/ngx-image-cropper.mjs ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CropService: () => (/* binding */ CropService),
/* harmony export */   CropperSettings: () => (/* binding */ CropperSettings),
/* harmony export */   ImageCropperComponent: () => (/* binding */ ImageCropperComponent),
/* harmony export */   ImageCropperModule: () => (/* binding */ ImageCropperModule),
/* harmony export */   LoadImageService: () => (/* binding */ LoadImageService),
/* harmony export */   base64ToFile: () => (/* binding */ base64ToFile),
/* harmony export */   resizeCanvas: () => (/* binding */ resizeCanvas)
/* harmony export */ });
/* harmony import */ var _Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 1670);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser */ 6480);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 6575);







const _c0 = ["wrapper"];
const _c1 = ["sourceImage"];
function ImageCropperComponent_img_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "img", 4, 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("load", function ImageCropperComponent_img_2_Template_img_load_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r5);
      const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r4.imageLoadedInView());
    })("mousedown", function ImageCropperComponent_img_2_Template_img_mousedown_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r5);
      const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r6.startMove($event, ctx_r6.moveTypes.Drag));
    })("touchstart", function ImageCropperComponent_img_2_Template_img_touchstart_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r5);
      const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r7.startMove($event, ctx_r7.moveTypes.Drag));
    })("error", function ImageCropperComponent_img_2_Template_img_error_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r5);
      const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r8.loadImageError($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵstyleProp"]("visibility", ctx_r1.imageVisible ? "visible" : "hidden")("transform", ctx_r1.safeTransformStyle);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassProp"]("ngx-ic-draggable", !ctx_r1.disabled && ctx_r1.allowMoveImage);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("src", ctx_r1.safeImgDataUrl, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵattribute"]("alt", ctx_r1.imageAltText);
  }
}
function ImageCropperComponent_div_4_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "span", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("mousedown", function ImageCropperComponent_div_4_ng_container_2_Template_span_mousedown_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r11);
      const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r10.startMove($event, ctx_r10.moveTypes.Resize, "topleft"));
    })("touchstart", function ImageCropperComponent_div_4_ng_container_2_Template_span_touchstart_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r11);
      const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r12.startMove($event, ctx_r12.moveTypes.Resize, "topleft"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](2, "span", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "span", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](4, "span", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "span", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("mousedown", function ImageCropperComponent_div_4_ng_container_2_Template_span_mousedown_5_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r11);
      const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r13.startMove($event, ctx_r13.moveTypes.Resize, "topright"));
    })("touchstart", function ImageCropperComponent_div_4_ng_container_2_Template_span_touchstart_5_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r11);
      const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r14.startMove($event, ctx_r14.moveTypes.Resize, "topright"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](6, "span", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "span", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](8, "span", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "span", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("mousedown", function ImageCropperComponent_div_4_ng_container_2_Template_span_mousedown_9_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r11);
      const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r15.startMove($event, ctx_r15.moveTypes.Resize, "bottomright"));
    })("touchstart", function ImageCropperComponent_div_4_ng_container_2_Template_span_touchstart_9_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r11);
      const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r16.startMove($event, ctx_r16.moveTypes.Resize, "bottomright"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](10, "span", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "span", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](12, "span", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](13, "span", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("mousedown", function ImageCropperComponent_div_4_ng_container_2_Template_span_mousedown_13_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r11);
      const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r17.startMove($event, ctx_r17.moveTypes.Resize, "bottomleft"));
    })("touchstart", function ImageCropperComponent_div_4_ng_container_2_Template_span_touchstart_13_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r11);
      const ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r18.startMove($event, ctx_r18.moveTypes.Resize, "bottomleft"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](14, "span", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](15, "span", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](16, "span", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](17, "span", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("mousedown", function ImageCropperComponent_div_4_ng_container_2_Template_span_mousedown_17_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r11);
      const ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r19.startMove($event, ctx_r19.moveTypes.Resize, "top"));
    })("touchstart", function ImageCropperComponent_div_4_ng_container_2_Template_span_touchstart_17_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r11);
      const ctx_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r20.startMove($event, ctx_r20.moveTypes.Resize, "top"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](18, "span", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("mousedown", function ImageCropperComponent_div_4_ng_container_2_Template_span_mousedown_18_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r11);
      const ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r21.startMove($event, ctx_r21.moveTypes.Resize, "right"));
    })("touchstart", function ImageCropperComponent_div_4_ng_container_2_Template_span_touchstart_18_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r11);
      const ctx_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r22.startMove($event, ctx_r22.moveTypes.Resize, "right"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](19, "span", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("mousedown", function ImageCropperComponent_div_4_ng_container_2_Template_span_mousedown_19_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r11);
      const ctx_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r23.startMove($event, ctx_r23.moveTypes.Resize, "bottom"));
    })("touchstart", function ImageCropperComponent_div_4_ng_container_2_Template_span_touchstart_19_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r11);
      const ctx_r24 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r24.startMove($event, ctx_r24.moveTypes.Resize, "bottom"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](20, "span", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("mousedown", function ImageCropperComponent_div_4_ng_container_2_Template_span_mousedown_20_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r11);
      const ctx_r25 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r25.startMove($event, ctx_r25.moveTypes.Resize, "left"));
    })("touchstart", function ImageCropperComponent_div_4_ng_container_2_Template_span_touchstart_20_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r11);
      const ctx_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r26.startMove($event, ctx_r26.moveTypes.Resize, "left"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
  }
}
function ImageCropperComponent_div_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r28 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("keydown", function ImageCropperComponent_div_4_Template_div_keydown_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r28);
      const ctx_r27 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r27.keyboardAccess($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("mousedown", function ImageCropperComponent_div_4_Template_div_mousedown_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r28);
      const ctx_r29 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r29.startMove($event, ctx_r29.moveTypes.Move));
    })("touchstart", function ImageCropperComponent_div_4_Template_div_touchstart_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r28);
      const ctx_r30 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r30.startMove($event, ctx_r30.moveTypes.Move));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](2, ImageCropperComponent_div_4_ng_container_2_Template, 21, 0, "ng-container", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵstyleProp"]("top", ctx_r2.cropper.y1, "px")("left", ctx_r2.cropper.x1, "px")("width", ctx_r2.cropper.x2 - ctx_r2.cropper.x1, "px")("height", ctx_r2.cropper.y2 - ctx_r2.cropper.y1, "px")("margin-left", ctx_r2.alignImage === "center" ? ctx_r2.marginLeft : null)("visibility", ctx_r2.imageVisible ? "visible" : "hidden");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassProp"]("ngx-ic-round", ctx_r2.roundCropper);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx_r2.hideResizeSquares);
  }
}
class CropperSettings {
  constructor() {
    // From options
    this.format = 'png';
    this.output = 'blob';
    this.maintainAspectRatio = true;
    this.transform = {};
    this.aspectRatio = 1;
    this.resetCropOnAspectRatioChange = true;
    this.resizeToWidth = 0;
    this.resizeToHeight = 0;
    this.cropperMinWidth = 0;
    this.cropperMinHeight = 0;
    this.cropperMaxHeight = 0;
    this.cropperMaxWidth = 0;
    this.cropperStaticWidth = 0;
    this.cropperStaticHeight = 0;
    this.canvasRotation = 0;
    this.initialStepSize = 3;
    this.roundCropper = false;
    this.onlyScaleDown = false;
    this.imageQuality = 92;
    this.autoCrop = true;
    this.backgroundColor = null;
    this.containWithinAspectRatio = false;
    this.hideResizeSquares = false;
    this.alignImage = 'center';
    // Internal
    this.cropperScaledMinWidth = 20;
    this.cropperScaledMinHeight = 20;
    this.cropperScaledMaxWidth = 20;
    this.cropperScaledMaxHeight = 20;
    this.stepSize = this.initialStepSize;
  }
  setOptions(options) {
    Object.keys(options).filter(k => k in this).forEach(k => this[k] = options[k]);
    this.validateOptions();
  }
  setOptionsFromChanges(changes) {
    Object.keys(changes).filter(k => k in this).forEach(k => this[k] = changes[k].currentValue);
    this.validateOptions();
  }
  validateOptions() {
    if (this.maintainAspectRatio && !this.aspectRatio) {
      throw new Error('`aspectRatio` should > 0 when `maintainAspectRatio` is enabled');
    }
  }
}
var MoveTypes;
(function (MoveTypes) {
  MoveTypes["Drag"] = "drag";
  MoveTypes["Move"] = "move";
  MoveTypes["Resize"] = "resize";
  MoveTypes["Pinch"] = "pinch";
})(MoveTypes || (MoveTypes = {}));
function getPositionForKey(key) {
  switch (key) {
    case 'ArrowUp':
      return 'top';
    case 'ArrowRight':
      return 'right';
    case 'ArrowDown':
      return 'bottom';
    case 'ArrowLeft':
    default:
      return 'left';
  }
}
function getInvertedPositionForKey(key) {
  switch (key) {
    case 'ArrowUp':
      return 'bottom';
    case 'ArrowRight':
      return 'left';
    case 'ArrowDown':
      return 'top';
    case 'ArrowLeft':
    default:
      return 'right';
  }
}
function getEventForKey(key, stepSize) {
  switch (key) {
    case 'ArrowUp':
      return {
        clientX: 0,
        clientY: stepSize * -1
      };
    case 'ArrowRight':
      return {
        clientX: stepSize,
        clientY: 0
      };
    case 'ArrowDown':
      return {
        clientX: 0,
        clientY: stepSize
      };
    case 'ArrowLeft':
    default:
      return {
        clientX: stepSize * -1,
        clientY: 0
      };
  }
}

/*
 * Hermite resize - fast image resize/resample using Hermite filter.
 * https://github.com/viliusle/Hermite-resize
 */
function resizeCanvas(canvas, width, height) {
  const width_source = canvas.width;
  const height_source = canvas.height;
  width = Math.round(width);
  height = Math.round(height);
  const ratio_w = width_source / width;
  const ratio_h = height_source / height;
  const ratio_w_half = Math.ceil(ratio_w / 2);
  const ratio_h_half = Math.ceil(ratio_h / 2);
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const img = ctx.getImageData(0, 0, width_source, height_source);
    const img2 = ctx.createImageData(width, height);
    const data = img.data;
    const data2 = img2.data;
    for (let j = 0; j < height; j++) {
      for (let i = 0; i < width; i++) {
        const x2 = (i + j * width) * 4;
        const center_y = j * ratio_h;
        let weight = 0;
        let weights = 0;
        let weights_alpha = 0;
        let gx_r = 0;
        let gx_g = 0;
        let gx_b = 0;
        let gx_a = 0;
        const xx_start = Math.floor(i * ratio_w);
        const yy_start = Math.floor(j * ratio_h);
        let xx_stop = Math.ceil((i + 1) * ratio_w);
        let yy_stop = Math.ceil((j + 1) * ratio_h);
        xx_stop = Math.min(xx_stop, width_source);
        yy_stop = Math.min(yy_stop, height_source);
        for (let yy = yy_start; yy < yy_stop; yy++) {
          const dy = Math.abs(center_y - yy) / ratio_h_half;
          const center_x = i * ratio_w;
          const w0 = dy * dy; //pre-calc part of w
          for (let xx = xx_start; xx < xx_stop; xx++) {
            const dx = Math.abs(center_x - xx) / ratio_w_half;
            const w = Math.sqrt(w0 + dx * dx);
            if (w >= 1) {
              //pixel too far
              continue;
            }
            //hermite filter
            weight = 2 * w * w * w - 3 * w * w + 1;
            const pos_x = 4 * (xx + yy * width_source);
            //alpha
            gx_a += weight * data[pos_x + 3];
            weights_alpha += weight;
            //colors
            if (data[pos_x + 3] < 255) weight = weight * data[pos_x + 3] / 250;
            gx_r += weight * data[pos_x];
            gx_g += weight * data[pos_x + 1];
            gx_b += weight * data[pos_x + 2];
            weights += weight;
          }
        }
        data2[x2] = gx_r / weights;
        data2[x2 + 1] = gx_g / weights;
        data2[x2 + 2] = gx_b / weights;
        data2[x2 + 3] = gx_a / weights_alpha;
      }
    }
    canvas.width = width;
    canvas.height = height;
    //draw
    ctx.putImageData(img2, 0, 0);
  }
}
function percentage(percent, totalValue) {
  return percent / 100 * totalValue;
}
class CropService {
  crop(sourceImage, loadedImage, cropper, settings, output) {
    const imagePosition = this.getImagePosition(sourceImage, loadedImage, cropper, settings);
    const width = imagePosition.x2 - imagePosition.x1;
    const height = imagePosition.y2 - imagePosition.y1;
    const cropCanvas = document.createElement('canvas');
    cropCanvas.width = width;
    cropCanvas.height = height;
    const ctx = cropCanvas.getContext('2d');
    if (!ctx) {
      return null;
    }
    if (settings.backgroundColor != null) {
      ctx.fillStyle = settings.backgroundColor;
      ctx.fillRect(0, 0, width, height);
    }
    const scaleX = (settings.transform.scale || 1) * (settings.transform.flipH ? -1 : 1);
    const scaleY = (settings.transform.scale || 1) * (settings.transform.flipV ? -1 : 1);
    const {
      translateH,
      translateV
    } = this.getCanvasTranslate(sourceImage, loadedImage, settings);
    const transformedImage = loadedImage.transformed;
    ctx.setTransform(scaleX, 0, 0, scaleY, transformedImage.size.width / 2 + translateH, transformedImage.size.height / 2 + translateV);
    ctx.translate(-imagePosition.x1 / scaleX, -imagePosition.y1 / scaleY);
    ctx.rotate((settings.transform.rotate || 0) * Math.PI / 180);
    ctx.drawImage(transformedImage.image, -transformedImage.size.width / 2, -transformedImage.size.height / 2);
    const result = {
      width,
      height,
      imagePosition,
      cropperPosition: {
        ...cropper
      }
    };
    if (settings.containWithinAspectRatio) {
      result.offsetImagePosition = this.getOffsetImagePosition(sourceImage, loadedImage, cropper, settings);
    }
    const resizeRatio = this.getResizeRatio(width, height, settings);
    if (resizeRatio !== 1) {
      result.width = Math.round(width * resizeRatio);
      result.height = settings.maintainAspectRatio ? Math.round(result.width / settings.aspectRatio) : Math.round(height * resizeRatio);
      resizeCanvas(cropCanvas, result.width, result.height);
    }
    if (output === 'blob') {
      return this.cropToBlob(result, cropCanvas, settings);
    } else {
      result.base64 = cropCanvas.toDataURL('image/' + settings.format, this.getQuality(settings));
      return result;
    }
  }
  cropToBlob(output, cropCanvas, settings) {
    var _this = this;
    return (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      output.blob = yield new Promise(resolve => cropCanvas.toBlob(resolve, 'image/' + settings.format, _this.getQuality(settings)));
      if (output.blob) {
        output.objectUrl = URL.createObjectURL(output.blob);
      }
      return output;
    })();
  }
  getCanvasTranslate(sourceImage, loadedImage, settings) {
    if (settings.transform.translateUnit === 'px') {
      const ratio = this.getRatio(sourceImage, loadedImage);
      return {
        translateH: (settings.transform.translateH || 0) * ratio,
        translateV: (settings.transform.translateV || 0) * ratio
      };
    } else {
      return {
        translateH: settings.transform.translateH ? percentage(settings.transform.translateH, loadedImage.transformed.size.width) : 0,
        translateV: settings.transform.translateV ? percentage(settings.transform.translateV, loadedImage.transformed.size.height) : 0
      };
    }
  }
  getRatio(sourceImage, loadedImage) {
    const sourceImageElement = sourceImage.nativeElement;
    return loadedImage.transformed.size.width / sourceImageElement.offsetWidth;
  }
  getImagePosition(sourceImage, loadedImage, cropper, settings) {
    const ratio = this.getRatio(sourceImage, loadedImage);
    const out = {
      x1: Math.round(cropper.x1 * ratio),
      y1: Math.round(cropper.y1 * ratio),
      x2: Math.round(cropper.x2 * ratio),
      y2: Math.round(cropper.y2 * ratio)
    };
    if (!settings.containWithinAspectRatio) {
      out.x1 = Math.max(out.x1, 0);
      out.y1 = Math.max(out.y1, 0);
      out.x2 = Math.min(out.x2, loadedImage.transformed.size.width);
      out.y2 = Math.min(out.y2, loadedImage.transformed.size.height);
    }
    return out;
  }
  getOffsetImagePosition(sourceImage, loadedImage, cropper, settings) {
    const canvasRotation = settings.canvasRotation + loadedImage.exifTransform.rotate;
    const sourceImageElement = sourceImage.nativeElement;
    const ratio = loadedImage.transformed.size.width / sourceImageElement.offsetWidth;
    let offsetX;
    let offsetY;
    if (canvasRotation % 2) {
      offsetX = (loadedImage.transformed.size.width - loadedImage.original.size.height) / 2;
      offsetY = (loadedImage.transformed.size.height - loadedImage.original.size.width) / 2;
    } else {
      offsetX = (loadedImage.transformed.size.width - loadedImage.original.size.width) / 2;
      offsetY = (loadedImage.transformed.size.height - loadedImage.original.size.height) / 2;
    }
    const out = {
      x1: Math.round(cropper.x1 * ratio) - offsetX,
      y1: Math.round(cropper.y1 * ratio) - offsetY,
      x2: Math.round(cropper.x2 * ratio) - offsetX,
      y2: Math.round(cropper.y2 * ratio) - offsetY
    };
    if (!settings.containWithinAspectRatio) {
      out.x1 = Math.max(out.x1, 0);
      out.y1 = Math.max(out.y1, 0);
      out.x2 = Math.min(out.x2, loadedImage.transformed.size.width);
      out.y2 = Math.min(out.y2, loadedImage.transformed.size.height);
    }
    return out;
  }
  getResizeRatio(width, height, settings) {
    const ratioWidth = settings.resizeToWidth / width;
    const ratioHeight = settings.resizeToHeight / height;
    const ratios = new Array();
    if (settings.resizeToWidth > 0) {
      ratios.push(ratioWidth);
    }
    if (settings.resizeToHeight > 0) {
      ratios.push(ratioHeight);
    }
    const result = ratios.length === 0 ? 1 : Math.min(...ratios);
    if (result > 1 && !settings.onlyScaleDown) {
      return result;
    }
    return Math.min(result, 1);
  }
  getQuality(settings) {
    return Math.min(1, Math.max(0, settings.imageQuality / 100));
  }
}
CropService.ɵfac = function CropService_Factory(t) {
  return new (t || CropService)();
};
CropService.ɵprov = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
  token: CropService,
  factory: CropService.ɵfac,
  providedIn: 'root'
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](CropService, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Injectable,
    args: [{
      providedIn: 'root'
    }]
  }], null, null);
})();
class CropperPositionService {
  resetCropperPosition(sourceImage, cropperPosition, settings) {
    if (!sourceImage?.nativeElement) {
      return;
    }
    const sourceImageElement = sourceImage.nativeElement;
    if (settings.cropperStaticHeight && settings.cropperStaticWidth) {
      cropperPosition.x1 = 0;
      cropperPosition.x2 = sourceImageElement.offsetWidth > settings.cropperStaticWidth ? settings.cropperStaticWidth : sourceImageElement.offsetWidth;
      cropperPosition.y1 = 0;
      cropperPosition.y2 = sourceImageElement.offsetHeight > settings.cropperStaticHeight ? settings.cropperStaticHeight : sourceImageElement.offsetHeight;
    } else {
      const cropperWidth = Math.min(settings.cropperScaledMaxWidth, sourceImageElement.offsetWidth);
      const cropperHeight = Math.min(settings.cropperScaledMaxHeight, sourceImageElement.offsetHeight);
      if (!settings.maintainAspectRatio) {
        cropperPosition.x1 = 0;
        cropperPosition.x2 = cropperWidth;
        cropperPosition.y1 = 0;
        cropperPosition.y2 = cropperHeight;
      } else if (sourceImageElement.offsetWidth / settings.aspectRatio < sourceImageElement.offsetHeight) {
        cropperPosition.x1 = 0;
        cropperPosition.x2 = cropperWidth;
        const cropperHeightWithAspectRatio = cropperWidth / settings.aspectRatio;
        cropperPosition.y1 = (sourceImageElement.offsetHeight - cropperHeightWithAspectRatio) / 2;
        cropperPosition.y2 = cropperPosition.y1 + cropperHeightWithAspectRatio;
      } else {
        cropperPosition.y1 = 0;
        cropperPosition.y2 = cropperHeight;
        const cropperWidthWithAspectRatio = cropperHeight * settings.aspectRatio;
        cropperPosition.x1 = (sourceImageElement.offsetWidth - cropperWidthWithAspectRatio) / 2;
        cropperPosition.x2 = cropperPosition.x1 + cropperWidthWithAspectRatio;
      }
    }
  }
  move(event, moveStart, cropperPosition) {
    const diffX = this.getClientX(event) - moveStart.clientX;
    const diffY = this.getClientY(event) - moveStart.clientY;
    cropperPosition.x1 = moveStart.x1 + diffX;
    cropperPosition.y1 = moveStart.y1 + diffY;
    cropperPosition.x2 = moveStart.x2 + diffX;
    cropperPosition.y2 = moveStart.y2 + diffY;
  }
  resize(event, moveStart, cropperPosition, maxSize, settings) {
    const moveX = this.getClientX(event) - moveStart.clientX;
    const moveY = this.getClientY(event) - moveStart.clientY;
    switch (moveStart.position) {
      case 'left':
        cropperPosition.x1 = Math.min(Math.max(moveStart.x1 + moveX, cropperPosition.x2 - settings.cropperScaledMaxWidth), cropperPosition.x2 - settings.cropperScaledMinWidth);
        break;
      case 'topleft':
        cropperPosition.x1 = Math.min(Math.max(moveStart.x1 + moveX, cropperPosition.x2 - settings.cropperScaledMaxWidth), cropperPosition.x2 - settings.cropperScaledMinWidth);
        cropperPosition.y1 = Math.min(Math.max(moveStart.y1 + moveY, cropperPosition.y2 - settings.cropperScaledMaxHeight), cropperPosition.y2 - settings.cropperScaledMinHeight);
        break;
      case 'top':
        cropperPosition.y1 = Math.min(Math.max(moveStart.y1 + moveY, cropperPosition.y2 - settings.cropperScaledMaxHeight), cropperPosition.y2 - settings.cropperScaledMinHeight);
        break;
      case 'topright':
        cropperPosition.x2 = Math.max(Math.min(moveStart.x2 + moveX, cropperPosition.x1 + settings.cropperScaledMaxWidth), cropperPosition.x1 + settings.cropperScaledMinWidth);
        cropperPosition.y1 = Math.min(Math.max(moveStart.y1 + moveY, cropperPosition.y2 - settings.cropperScaledMaxHeight), cropperPosition.y2 - settings.cropperScaledMinHeight);
        break;
      case 'right':
        cropperPosition.x2 = Math.max(Math.min(moveStart.x2 + moveX, cropperPosition.x1 + settings.cropperScaledMaxWidth), cropperPosition.x1 + settings.cropperScaledMinWidth);
        break;
      case 'bottomright':
        cropperPosition.x2 = Math.max(Math.min(moveStart.x2 + moveX, cropperPosition.x1 + settings.cropperScaledMaxWidth), cropperPosition.x1 + settings.cropperScaledMinWidth);
        cropperPosition.y2 = Math.max(Math.min(moveStart.y2 + moveY, cropperPosition.y1 + settings.cropperScaledMaxHeight), cropperPosition.y1 + settings.cropperScaledMinHeight);
        break;
      case 'bottom':
        cropperPosition.y2 = Math.max(Math.min(moveStart.y2 + moveY, cropperPosition.y1 + settings.cropperScaledMaxHeight), cropperPosition.y1 + settings.cropperScaledMinHeight);
        break;
      case 'bottomleft':
        cropperPosition.x1 = Math.min(Math.max(moveStart.x1 + moveX, cropperPosition.x2 - settings.cropperScaledMaxWidth), cropperPosition.x2 - settings.cropperScaledMinWidth);
        cropperPosition.y2 = Math.max(Math.min(moveStart.y2 + moveY, cropperPosition.y1 + settings.cropperScaledMaxHeight), cropperPosition.y1 + settings.cropperScaledMinHeight);
        break;
      case 'center':
        const scale = event.scale;
        const newWidth = Math.min(Math.max(settings.cropperScaledMinWidth, Math.abs(moveStart.x2 - moveStart.x1) * scale), settings.cropperScaledMaxWidth);
        const newHeight = Math.min(Math.max(settings.cropperScaledMinHeight, Math.abs(moveStart.y2 - moveStart.y1) * scale), settings.cropperScaledMaxHeight);
        cropperPosition.x1 = moveStart.clientX - newWidth / 2;
        cropperPosition.x2 = moveStart.clientX + newWidth / 2;
        cropperPosition.y1 = moveStart.clientY - newHeight / 2;
        cropperPosition.y2 = moveStart.clientY + newHeight / 2;
        if (cropperPosition.x1 < 0) {
          cropperPosition.x2 -= cropperPosition.x1;
          cropperPosition.x1 = 0;
        } else if (cropperPosition.x2 > maxSize.width) {
          cropperPosition.x1 -= cropperPosition.x2 - maxSize.width;
          cropperPosition.x2 = maxSize.width;
        }
        if (cropperPosition.y1 < 0) {
          cropperPosition.y2 -= cropperPosition.y1;
          cropperPosition.y1 = 0;
        } else if (cropperPosition.y2 > maxSize.height) {
          cropperPosition.y1 -= cropperPosition.y2 - maxSize.height;
          cropperPosition.y2 = maxSize.height;
        }
        break;
    }
    if (settings.maintainAspectRatio) {
      this.checkAspectRatio(moveStart.position, cropperPosition, maxSize, settings);
    }
  }
  checkAspectRatio(position, cropperPosition, maxSize, settings) {
    let overflowX = 0;
    let overflowY = 0;
    switch (position) {
      case 'top':
        cropperPosition.x2 = cropperPosition.x1 + (cropperPosition.y2 - cropperPosition.y1) * settings.aspectRatio;
        overflowX = Math.max(cropperPosition.x2 - maxSize.width, 0);
        overflowY = Math.max(0 - cropperPosition.y1, 0);
        if (overflowX > 0 || overflowY > 0) {
          cropperPosition.x2 -= overflowY * settings.aspectRatio > overflowX ? overflowY * settings.aspectRatio : overflowX;
          cropperPosition.y1 += overflowY * settings.aspectRatio > overflowX ? overflowY : overflowX / settings.aspectRatio;
        }
        break;
      case 'bottom':
        cropperPosition.x2 = cropperPosition.x1 + (cropperPosition.y2 - cropperPosition.y1) * settings.aspectRatio;
        overflowX = Math.max(cropperPosition.x2 - maxSize.width, 0);
        overflowY = Math.max(cropperPosition.y2 - maxSize.height, 0);
        if (overflowX > 0 || overflowY > 0) {
          cropperPosition.x2 -= overflowY * settings.aspectRatio > overflowX ? overflowY * settings.aspectRatio : overflowX;
          cropperPosition.y2 -= overflowY * settings.aspectRatio > overflowX ? overflowY : overflowX / settings.aspectRatio;
        }
        break;
      case 'topleft':
        cropperPosition.y1 = cropperPosition.y2 - (cropperPosition.x2 - cropperPosition.x1) / settings.aspectRatio;
        overflowX = Math.max(0 - cropperPosition.x1, 0);
        overflowY = Math.max(0 - cropperPosition.y1, 0);
        if (overflowX > 0 || overflowY > 0) {
          cropperPosition.x1 += overflowY * settings.aspectRatio > overflowX ? overflowY * settings.aspectRatio : overflowX;
          cropperPosition.y1 += overflowY * settings.aspectRatio > overflowX ? overflowY : overflowX / settings.aspectRatio;
        }
        break;
      case 'topright':
        cropperPosition.y1 = cropperPosition.y2 - (cropperPosition.x2 - cropperPosition.x1) / settings.aspectRatio;
        overflowX = Math.max(cropperPosition.x2 - maxSize.width, 0);
        overflowY = Math.max(0 - cropperPosition.y1, 0);
        if (overflowX > 0 || overflowY > 0) {
          cropperPosition.x2 -= overflowY * settings.aspectRatio > overflowX ? overflowY * settings.aspectRatio : overflowX;
          cropperPosition.y1 += overflowY * settings.aspectRatio > overflowX ? overflowY : overflowX / settings.aspectRatio;
        }
        break;
      case 'right':
      case 'bottomright':
        cropperPosition.y2 = cropperPosition.y1 + (cropperPosition.x2 - cropperPosition.x1) / settings.aspectRatio;
        overflowX = Math.max(cropperPosition.x2 - maxSize.width, 0);
        overflowY = Math.max(cropperPosition.y2 - maxSize.height, 0);
        if (overflowX > 0 || overflowY > 0) {
          cropperPosition.x2 -= overflowY * settings.aspectRatio > overflowX ? overflowY * settings.aspectRatio : overflowX;
          cropperPosition.y2 -= overflowY * settings.aspectRatio > overflowX ? overflowY : overflowX / settings.aspectRatio;
        }
        break;
      case 'left':
      case 'bottomleft':
        cropperPosition.y2 = cropperPosition.y1 + (cropperPosition.x2 - cropperPosition.x1) / settings.aspectRatio;
        overflowX = Math.max(0 - cropperPosition.x1, 0);
        overflowY = Math.max(cropperPosition.y2 - maxSize.height, 0);
        if (overflowX > 0 || overflowY > 0) {
          cropperPosition.x1 += overflowY * settings.aspectRatio > overflowX ? overflowY * settings.aspectRatio : overflowX;
          cropperPosition.y2 -= overflowY * settings.aspectRatio > overflowX ? overflowY : overflowX / settings.aspectRatio;
        }
        break;
      case 'center':
        cropperPosition.x2 = cropperPosition.x1 + (cropperPosition.y2 - cropperPosition.y1) * settings.aspectRatio;
        cropperPosition.y2 = cropperPosition.y1 + (cropperPosition.x2 - cropperPosition.x1) / settings.aspectRatio;
        const overflowX1 = Math.max(0 - cropperPosition.x1, 0);
        const overflowX2 = Math.max(cropperPosition.x2 - maxSize.width, 0);
        const overflowY1 = Math.max(cropperPosition.y2 - maxSize.height, 0);
        const overflowY2 = Math.max(0 - cropperPosition.y1, 0);
        if (overflowX1 > 0 || overflowX2 > 0 || overflowY1 > 0 || overflowY2 > 0) {
          cropperPosition.x1 += overflowY1 * settings.aspectRatio > overflowX1 ? overflowY1 * settings.aspectRatio : overflowX1;
          cropperPosition.x2 -= overflowY2 * settings.aspectRatio > overflowX2 ? overflowY2 * settings.aspectRatio : overflowX2;
          cropperPosition.y1 += overflowY2 * settings.aspectRatio > overflowX2 ? overflowY2 : overflowX2 / settings.aspectRatio;
          cropperPosition.y2 -= overflowY1 * settings.aspectRatio > overflowX1 ? overflowY1 : overflowX1 / settings.aspectRatio;
        }
        break;
    }
  }
  getClientX(event) {
    return event.touches?.[0].clientX || event.clientX || 0;
  }
  getClientY(event) {
    return event.touches?.[0].clientY || event.clientY || 0;
  }
}
CropperPositionService.ɵfac = function CropperPositionService_Factory(t) {
  return new (t || CropperPositionService)();
};
CropperPositionService.ɵprov = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
  token: CropperPositionService,
  factory: CropperPositionService.ɵfac,
  providedIn: 'root'
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](CropperPositionService, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Injectable,
    args: [{
      providedIn: 'root'
    }]
  }], null, null);
})();

// Black 2x1 JPEG, with the following meta information set:
// - EXIF Orientation: 6 (Rotated 90° CCW)
// Source: https://github.com/blueimp/JavaScript-Load-Image
const testAutoOrientationImageURL = 'data:image/jpeg;base64,/9j/4QAiRXhpZgAATU0AKgAAAAgAAQESAAMAAAABAAYAAAA' + 'AAAD/2wCEAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBA' + 'QEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQE' + 'BAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAf/AABEIAAEAAgMBEQACEQEDEQH/x' + 'ABKAAEAAAAAAAAAAAAAAAAAAAALEAEAAAAAAAAAAAAAAAAAAAAAAQEAAAAAAAAAAAAAAAA' + 'AAAAAEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwA/8H//2Q==';
function supportsAutomaticRotation() {
  return new Promise(resolve => {
    const img = new Image();
    img.onload = () => {
      // Check if browser supports automatic image orientation:
      const supported = img.width === 1 && img.height === 2;
      resolve(supported);
    };
    img.src = testAutoOrientationImageURL;
  });
}
function getTransformationsFromExifData(exifRotationOrArrayBuffer) {
  if (typeof exifRotationOrArrayBuffer === 'object') {
    exifRotationOrArrayBuffer = getExifRotation(exifRotationOrArrayBuffer);
  }
  switch (exifRotationOrArrayBuffer) {
    case 2:
      return {
        rotate: 0,
        flip: true
      };
    case 3:
      return {
        rotate: 2,
        flip: false
      };
    case 4:
      return {
        rotate: 2,
        flip: true
      };
    case 5:
      return {
        rotate: 1,
        flip: true
      };
    case 6:
      return {
        rotate: 1,
        flip: false
      };
    case 7:
      return {
        rotate: 3,
        flip: true
      };
    case 8:
      return {
        rotate: 3,
        flip: false
      };
    default:
      return {
        rotate: 0,
        flip: false
      };
  }
}
function getExifRotation(arrayBuffer) {
  const view = new DataView(arrayBuffer);
  if (view.getUint16(0, false) !== 0xFFD8) {
    return -2;
  }
  const length = view.byteLength;
  let offset = 2;
  while (offset < length) {
    if (view.getUint16(offset + 2, false) <= 8) return -1;
    const marker = view.getUint16(offset, false);
    offset += 2;
    if (marker == 0xFFE1) {
      if (view.getUint32(offset += 2, false) !== 0x45786966) {
        return -1;
      }
      const little = view.getUint16(offset += 6, false) == 0x4949;
      offset += view.getUint32(offset + 4, little);
      const tags = view.getUint16(offset, little);
      offset += 2;
      for (let i = 0; i < tags; i++) {
        if (view.getUint16(offset + i * 12, little) == 0x0112) {
          return view.getUint16(offset + i * 12 + 8, little);
        }
      }
    } else if ((marker & 0xFF00) !== 0xFF00) {
      break;
    } else {
      offset += view.getUint16(offset, false);
    }
  }
  return -1;
}
class LoadImageService {
  constructor() {
    this.autoRotateSupported = supportsAutomaticRotation();
  }
  loadImageFile(file, cropperSettings) {
    return file.arrayBuffer().then(arrayBuffer => this.checkImageTypeAndLoadImageFromArrayBuffer(arrayBuffer, file.type, cropperSettings));
  }
  checkImageTypeAndLoadImageFromArrayBuffer(arrayBuffer, imageType, cropperSettings) {
    if (!this.isValidImageType(imageType)) {
      return Promise.reject(new Error('Invalid image type'));
    }
    return this.loadImageFromArrayBuffer(arrayBuffer, cropperSettings);
  }
  isValidImageType(type) {
    return /image\/(png|jpg|jpeg|bmp|gif|tiff|webp|x-icon|vnd.microsoft.icon)/.test(type);
  }
  loadImageFromURL(url, cropperSettings) {
    return fetch(url).then(res => res.arrayBuffer()).then(buffer => this.loadImageFromArrayBuffer(buffer, cropperSettings));
  }
  loadBase64Image(imageBase64, cropperSettings) {
    const arrayBuffer = this.base64ToArrayBuffer(imageBase64);
    return this.loadImageFromArrayBuffer(arrayBuffer, cropperSettings);
  }
  base64ToArrayBuffer(imageBase64) {
    imageBase64 = imageBase64.replace(/^data\:([^\;]+)\;base64,/gmi, '');
    const binaryString = atob(imageBase64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
  }
  loadImageFromArrayBuffer(arrayBuffer, cropperSettings) {
    return new Promise((resolve, reject) => {
      const blob = new Blob([arrayBuffer]);
      const objectUrl = URL.createObjectURL(blob);
      const originalImage = new Image();
      originalImage.onload = () => resolve({
        originalImage,
        originalObjectUrl: objectUrl,
        originalArrayBuffer: arrayBuffer
      });
      originalImage.onerror = reject;
      originalImage.src = objectUrl;
    }).then(res => this.transformImageFromArrayBuffer(res, cropperSettings));
  }
  transformImageFromArrayBuffer(res, cropperSettings) {
    var _this2 = this;
    return (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const autoRotate = yield _this2.autoRotateSupported;
      const exifTransform = yield getTransformationsFromExifData(autoRotate ? -1 : res.originalArrayBuffer);
      if (!res.originalImage || !res.originalImage.complete) {
        return Promise.reject(new Error('No image loaded'));
      }
      const loadedImage = {
        original: {
          objectUrl: res.originalObjectUrl,
          image: res.originalImage,
          size: {
            width: res.originalImage.naturalWidth,
            height: res.originalImage.naturalHeight
          }
        },
        exifTransform
      };
      return _this2.transformLoadedImage(loadedImage, cropperSettings);
    })();
  }
  transformLoadedImage(loadedImage, cropperSettings) {
    var _this3 = this;
    return (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const canvasRotation = cropperSettings.canvasRotation + loadedImage.exifTransform.rotate;
      const originalSize = {
        width: loadedImage.original.image.naturalWidth,
        height: loadedImage.original.image.naturalHeight
      };
      if (canvasRotation === 0 && !loadedImage.exifTransform.flip && !cropperSettings.containWithinAspectRatio) {
        return {
          original: {
            objectUrl: loadedImage.original.objectUrl,
            image: loadedImage.original.image,
            size: {
              ...originalSize
            }
          },
          transformed: {
            objectUrl: loadedImage.original.objectUrl,
            image: loadedImage.original.image,
            size: {
              ...originalSize
            }
          },
          exifTransform: loadedImage.exifTransform
        };
      }
      const transformedSize = _this3.getTransformedSize(originalSize, loadedImage.exifTransform, cropperSettings);
      const canvas = document.createElement('canvas');
      canvas.width = transformedSize.width;
      canvas.height = transformedSize.height;
      const ctx = canvas.getContext('2d');
      ctx?.setTransform(loadedImage.exifTransform.flip ? -1 : 1, 0, 0, 1, canvas.width / 2, canvas.height / 2);
      ctx?.rotate(Math.PI * (canvasRotation / 2));
      ctx?.drawImage(loadedImage.original.image, -originalSize.width / 2, -originalSize.height / 2);
      const blob = yield new Promise(resolve => canvas.toBlob(resolve, cropperSettings.format));
      if (!blob) {
        throw new Error('Failed to get Blob for transformed image.');
      }
      const objectUrl = URL.createObjectURL(blob);
      const transformedImage = yield _this3.loadImageFromObjectUrl(objectUrl);
      return {
        original: {
          objectUrl: loadedImage.original.objectUrl,
          image: loadedImage.original.image,
          size: {
            ...originalSize
          }
        },
        transformed: {
          objectUrl: objectUrl,
          image: transformedImage,
          size: {
            width: transformedImage.width,
            height: transformedImage.height
          }
        },
        exifTransform: loadedImage.exifTransform
      };
    })();
  }
  loadImageFromObjectUrl(objectUrl) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = reject;
      image.src = objectUrl;
    });
  }
  getTransformedSize(originalSize, exifTransform, cropperSettings) {
    const canvasRotation = cropperSettings.canvasRotation + exifTransform.rotate;
    if (cropperSettings.containWithinAspectRatio) {
      if (canvasRotation % 2) {
        const minWidthToContain = originalSize.width * cropperSettings.aspectRatio;
        const minHeightToContain = originalSize.height / cropperSettings.aspectRatio;
        return {
          width: Math.max(originalSize.height, minWidthToContain),
          height: Math.max(originalSize.width, minHeightToContain)
        };
      } else {
        const minWidthToContain = originalSize.height * cropperSettings.aspectRatio;
        const minHeightToContain = originalSize.width / cropperSettings.aspectRatio;
        return {
          width: Math.max(originalSize.width, minWidthToContain),
          height: Math.max(originalSize.height, minHeightToContain)
        };
      }
    }
    if (canvasRotation % 2) {
      return {
        height: originalSize.width,
        width: originalSize.height
      };
    }
    return {
      width: originalSize.width,
      height: originalSize.height
    };
  }
}
LoadImageService.ɵfac = function LoadImageService_Factory(t) {
  return new (t || LoadImageService)();
};
LoadImageService.ɵprov = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
  token: LoadImageService,
  factory: LoadImageService.ɵfac,
  providedIn: 'root'
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](LoadImageService, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Injectable,
    args: [{
      providedIn: 'root'
    }]
  }], null, null);
})();
class ImageCropperComponent {
  constructor(cropService, cropperPositionService, loadImageService, sanitizer, cd, hammerLoader) {
    this.cropService = cropService;
    this.cropperPositionService = cropperPositionService;
    this.loadImageService = loadImageService;
    this.sanitizer = sanitizer;
    this.cd = cd;
    this.hammerLoader = hammerLoader;
    this.settings = new CropperSettings();
    this.setImageMaxSizeRetries = 0;
    this.resizedWhileHidden = false;
    this.marginLeft = '0px';
    this.maxSize = {
      width: 0,
      height: 0
    };
    this.moveTypes = MoveTypes;
    this.imageVisible = false;
    this.output = this.settings.output;
    this.format = this.settings.format;
    this.transform = {};
    this.maintainAspectRatio = this.settings.maintainAspectRatio;
    this.aspectRatio = this.settings.aspectRatio;
    this.resetCropOnAspectRatioChange = this.settings.resetCropOnAspectRatioChange;
    this.resizeToWidth = this.settings.resizeToWidth;
    this.resizeToHeight = this.settings.resizeToHeight;
    this.cropperMinWidth = this.settings.cropperMinWidth;
    this.cropperMinHeight = this.settings.cropperMinHeight;
    this.cropperMaxHeight = this.settings.cropperMaxHeight;
    this.cropperMaxWidth = this.settings.cropperMaxWidth;
    this.cropperStaticWidth = this.settings.cropperStaticWidth;
    this.cropperStaticHeight = this.settings.cropperStaticHeight;
    this.canvasRotation = this.settings.canvasRotation;
    this.initialStepSize = this.settings.initialStepSize;
    this.roundCropper = this.settings.roundCropper;
    this.onlyScaleDown = this.settings.onlyScaleDown;
    this.imageQuality = this.settings.imageQuality;
    this.autoCrop = this.settings.autoCrop;
    this.backgroundColor = this.settings.backgroundColor;
    this.containWithinAspectRatio = this.settings.containWithinAspectRatio;
    this.hideResizeSquares = this.settings.hideResizeSquares;
    this.allowMoveImage = false;
    this.cropper = {
      x1: -100,
      y1: -100,
      x2: 10000,
      y2: 10000
    };
    this.alignImage = this.settings.alignImage;
    this.disabled = false;
    this.hidden = false;
    this.imageCropped = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.startCropImage = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.imageLoaded = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.cropperReady = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.loadImageFailed = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.transformChange = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.reset();
  }
  ngOnChanges(changes) {
    this.onChangesUpdateSettings(changes);
    this.onChangesInputImage(changes);
    if (this.loadedImage?.original.image.complete && (changes['containWithinAspectRatio'] || changes['canvasRotation'])) {
      this.loadImageService.transformLoadedImage(this.loadedImage, this.settings).then(res => this.setLoadedImage(res)).catch(err => this.loadImageError(err));
    }
    if (changes['cropper'] || changes['maintainAspectRatio'] || changes['aspectRatio']) {
      this.setMaxSize();
      this.setCropperScaledMinSize();
      this.setCropperScaledMaxSize();
      if (this.maintainAspectRatio && (this.resetCropOnAspectRatioChange || !this.aspectRatioIsCorrect()) && (changes['maintainAspectRatio'] || changes['aspectRatio'])) {
        this.resetCropperPosition();
      } else if (changes['cropper']) {
        this.checkCropperPosition(false);
        this.doAutoCrop();
      }
      this.cd.markForCheck();
    }
    if (changes['transform']) {
      this.transform = this.transform || {};
      this.setCssTransform();
      this.doAutoCrop();
      this.cd.markForCheck();
    }
    if (changes['hidden'] && this.resizedWhileHidden && !this.hidden) {
      setTimeout(() => {
        this.onResize();
        this.resizedWhileHidden = false;
      });
    }
  }
  onChangesUpdateSettings(changes) {
    this.settings.setOptionsFromChanges(changes);
    if (this.settings.cropperStaticHeight && this.settings.cropperStaticWidth) {
      this.settings.setOptions({
        hideResizeSquares: true,
        cropperMinWidth: this.settings.cropperStaticWidth,
        cropperMinHeight: this.settings.cropperStaticHeight,
        cropperMaxHeight: this.settings.cropperStaticHeight,
        cropperMaxWidth: this.settings.cropperStaticWidth,
        maintainAspectRatio: false
      });
    }
  }
  onChangesInputImage(changes) {
    if (changes['imageChangedEvent'] || changes['imageURL'] || changes['imageBase64'] || changes['imageFile']) {
      this.reset();
    }
    if (changes['imageChangedEvent'] && this.isValidImageChangedEvent()) {
      this.loadImageFile(this.imageChangedEvent.target.files[0]);
    }
    if (changes['imageURL'] && this.imageURL) {
      this.loadImageFromURL(this.imageURL);
    }
    if (changes['imageBase64'] && this.imageBase64) {
      this.loadBase64Image(this.imageBase64);
    }
    if (changes['imageFile'] && this.imageFile) {
      this.loadImageFile(this.imageFile);
    }
  }
  isValidImageChangedEvent() {
    return this.imageChangedEvent?.target?.files?.length > 0;
  }
  setCssTransform() {
    const translateUnit = this.transform?.translateUnit || '%';
    this.safeTransformStyle = this.sanitizer.bypassSecurityTrustStyle(`translate(${this.transform.translateH || 0}${translateUnit}, ${this.transform.translateV || 0}${translateUnit})` + ' scaleX(' + (this.transform.scale || 1) * (this.transform.flipH ? -1 : 1) + ')' + ' scaleY(' + (this.transform.scale || 1) * (this.transform.flipV ? -1 : 1) + ')' + ' rotate(' + (this.transform.rotate || 0) + 'deg)');
  }
  ngOnInit() {
    this.settings.stepSize = this.initialStepSize;
    this.activatePinchGesture();
  }
  reset() {
    this.imageVisible = false;
    this.loadedImage = undefined;
    this.safeImgDataUrl = 'data:image/png;base64,iVBORw0KGg' + 'oAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQYV2NgAAIAAAU' + 'AAarVyFEAAAAASUVORK5CYII=';
    this.moveStart = {
      active: false,
      type: null,
      position: null,
      x1: 0,
      y1: 0,
      x2: 0,
      y2: 0,
      clientX: 0,
      clientY: 0
    };
    this.maxSize = {
      width: 0,
      height: 0
    };
    this.cropper.x1 = -100;
    this.cropper.y1 = -100;
    this.cropper.x2 = 10000;
    this.cropper.y2 = 10000;
  }
  loadImageFile(file) {
    this.loadImageService.loadImageFile(file, this.settings).then(res => this.setLoadedImage(res)).catch(err => this.loadImageError(err));
  }
  loadBase64Image(imageBase64) {
    this.loadImageService.loadBase64Image(imageBase64, this.settings).then(res => this.setLoadedImage(res)).catch(err => this.loadImageError(err));
  }
  loadImageFromURL(url) {
    this.loadImageService.loadImageFromURL(url, this.settings).then(res => this.setLoadedImage(res)).catch(err => this.loadImageError(err));
  }
  setLoadedImage(loadedImage) {
    this.loadedImage = loadedImage;
    this.safeImgDataUrl = this.sanitizer.bypassSecurityTrustResourceUrl(loadedImage.transformed.objectUrl);
    this.cd.markForCheck();
  }
  loadImageError(error) {
    console.error(error);
    this.loadImageFailed.emit();
  }
  imageLoadedInView() {
    if (this.loadedImage != null) {
      this.imageLoaded.emit(this.loadedImage);
      this.setImageMaxSizeRetries = 0;
      setTimeout(() => this.checkImageMaxSizeRecursively());
    }
  }
  checkImageMaxSizeRecursively() {
    if (this.setImageMaxSizeRetries > 40) {
      this.loadImageFailed.emit();
    } else if (this.sourceImageLoaded()) {
      this.setMaxSize();
      this.setCropperScaledMinSize();
      this.setCropperScaledMaxSize();
      this.resetCropperPosition();
      this.cropperReady.emit({
        ...this.maxSize
      });
      this.cd.markForCheck();
    } else {
      this.setImageMaxSizeRetries++;
      setTimeout(() => this.checkImageMaxSizeRecursively(), 50);
    }
  }
  sourceImageLoaded() {
    return this.sourceImage?.nativeElement?.offsetWidth > 0;
  }
  onResize() {
    if (!this.loadedImage) {
      return;
    }
    if (this.hidden) {
      this.resizedWhileHidden = true;
    } else {
      this.resizeCropperPosition();
      this.setMaxSize();
      this.setCropperScaledMinSize();
      this.setCropperScaledMaxSize();
    }
  }
  activatePinchGesture() {
    var _this4 = this;
    return (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      // Loads HammerJS via angular APIs if configured
      yield _this4.hammerLoader?.();
      const Hammer = window?.['Hammer'] || null;
      if (Hammer) {
        const hammer = new Hammer(_this4.wrapper.nativeElement);
        hammer.get('pinch').set({
          enable: true
        });
        hammer.on('pinchmove', _this4.onPinch.bind(_this4));
        hammer.on('pinchend', _this4.pinchStop.bind(_this4));
        hammer.on('pinchstart', _this4.startPinch.bind(_this4));
      } else if ((0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.isDevMode)()) {
        console.warn('[NgxImageCropper] Could not find HammerJS - Pinch Gesture won\'t work');
      }
    })();
  }
  resizeCropperPosition() {
    const sourceImageElement = this.sourceImage.nativeElement;
    if (this.maxSize.width !== sourceImageElement.offsetWidth || this.maxSize.height !== sourceImageElement.offsetHeight) {
      this.cropper.x1 = this.cropper.x1 * sourceImageElement.offsetWidth / this.maxSize.width;
      this.cropper.x2 = this.cropper.x2 * sourceImageElement.offsetWidth / this.maxSize.width;
      this.cropper.y1 = this.cropper.y1 * sourceImageElement.offsetHeight / this.maxSize.height;
      this.cropper.y2 = this.cropper.y2 * sourceImageElement.offsetHeight / this.maxSize.height;
    }
  }
  resetCropperPosition() {
    this.cropperPositionService.resetCropperPosition(this.sourceImage, this.cropper, this.settings);
    this.doAutoCrop();
    this.imageVisible = true;
  }
  keyboardAccess(event) {
    this.changeKeyboardStepSize(event);
    this.keyboardMoveCropper(event);
  }
  changeKeyboardStepSize(event) {
    const key = +event.key;
    if (key >= 1 && key <= 9) {
      this.settings.stepSize = key;
    }
  }
  keyboardMoveCropper(event) {
    const keyboardWhiteList = ['ArrowUp', 'ArrowDown', 'ArrowRight', 'ArrowLeft'];
    if (!keyboardWhiteList.includes(event.key)) {
      return;
    }
    const moveType = event.shiftKey ? MoveTypes.Resize : MoveTypes.Move;
    const position = event.altKey ? getInvertedPositionForKey(event.key) : getPositionForKey(event.key);
    const moveEvent = getEventForKey(event.key, this.settings.stepSize);
    event.preventDefault();
    event.stopPropagation();
    this.startMove({
      clientX: 0,
      clientY: 0
    }, moveType, position);
    this.moveImg(moveEvent);
    this.moveStop();
  }
  startMove(event, moveType, position = null) {
    if (this.disabled || this.moveStart?.active && this.moveStart?.type === MoveTypes.Pinch || moveType === MoveTypes.Drag && !this.allowMoveImage) {
      return;
    }
    if (event.preventDefault) {
      event.preventDefault();
    }
    this.moveStart = {
      active: true,
      type: moveType,
      position,
      transform: {
        ...this.transform
      },
      clientX: this.cropperPositionService.getClientX(event),
      clientY: this.cropperPositionService.getClientY(event),
      ...this.cropper
    };
  }
  startPinch(event) {
    if (!this.safeImgDataUrl) {
      return;
    }
    if (event.preventDefault) {
      event.preventDefault();
    }
    this.moveStart = {
      active: true,
      type: MoveTypes.Pinch,
      position: 'center',
      clientX: this.cropper.x1 + (this.cropper.x2 - this.cropper.x1) / 2,
      clientY: this.cropper.y1 + (this.cropper.y2 - this.cropper.y1) / 2,
      ...this.cropper
    };
  }
  moveImg(event) {
    if (this.moveStart.active) {
      if (event.stopPropagation) {
        event.stopPropagation();
      }
      if (event.preventDefault) {
        event.preventDefault();
      }
      if (this.moveStart.type === MoveTypes.Move) {
        this.cropperPositionService.move(event, this.moveStart, this.cropper);
        this.checkCropperPosition(true);
      } else if (this.moveStart.type === MoveTypes.Resize) {
        if (!this.cropperStaticWidth && !this.cropperStaticHeight) {
          this.cropperPositionService.resize(event, this.moveStart, this.cropper, this.maxSize, this.settings);
        }
        this.checkCropperPosition(false);
      } else if (this.moveStart.type === MoveTypes.Drag) {
        const diffX = this.cropperPositionService.getClientX(event) - this.moveStart.clientX;
        const diffY = this.cropperPositionService.getClientY(event) - this.moveStart.clientY;
        this.transform = {
          ...this.transform,
          translateH: (this.moveStart.transform?.translateH || 0) + diffX,
          translateV: (this.moveStart.transform?.translateV || 0) + diffY
        };
        this.setCssTransform();
      }
      this.cd.detectChanges();
    }
  }
  onPinch(event) {
    if (this.moveStart.active) {
      if (event.stopPropagation) {
        event.stopPropagation();
      }
      if (event.preventDefault) {
        event.preventDefault();
      }
      if (this.moveStart.type === MoveTypes.Pinch) {
        this.cropperPositionService.resize(event, this.moveStart, this.cropper, this.maxSize, this.settings);
        this.checkCropperPosition(false);
      }
      this.cd.detectChanges();
    }
  }
  setMaxSize() {
    if (this.sourceImage) {
      const sourceImageElement = this.sourceImage.nativeElement;
      this.maxSize.width = sourceImageElement.offsetWidth;
      this.maxSize.height = sourceImageElement.offsetHeight;
      this.marginLeft = this.sanitizer.bypassSecurityTrustStyle('calc(50% - ' + this.maxSize.width / 2 + 'px)');
    }
  }
  setCropperScaledMinSize() {
    if (this.loadedImage?.transformed?.image) {
      this.setCropperScaledMinWidth();
      this.setCropperScaledMinHeight();
    } else {
      this.settings.cropperScaledMinWidth = 20;
      this.settings.cropperScaledMinHeight = 20;
    }
  }
  setCropperScaledMinWidth() {
    this.settings.cropperScaledMinWidth = this.cropperMinWidth > 0 ? Math.max(20, this.cropperMinWidth / this.loadedImage.transformed.image.width * this.maxSize.width) : 20;
  }
  setCropperScaledMinHeight() {
    if (this.maintainAspectRatio) {
      this.settings.cropperScaledMinHeight = Math.max(20, this.settings.cropperScaledMinWidth / this.aspectRatio);
    } else if (this.cropperMinHeight > 0) {
      this.settings.cropperScaledMinHeight = Math.max(20, this.cropperMinHeight / this.loadedImage.transformed.image.height * this.maxSize.height);
    } else {
      this.settings.cropperScaledMinHeight = 20;
    }
  }
  setCropperScaledMaxSize() {
    if (this.loadedImage?.transformed?.image) {
      const ratio = this.loadedImage.transformed.size.width / this.maxSize.width;
      this.settings.cropperScaledMaxWidth = this.cropperMaxWidth > 20 ? this.cropperMaxWidth / ratio : this.maxSize.width;
      this.settings.cropperScaledMaxHeight = this.cropperMaxHeight > 20 ? this.cropperMaxHeight / ratio : this.maxSize.height;
      if (this.maintainAspectRatio) {
        if (this.settings.cropperScaledMaxWidth > this.settings.cropperScaledMaxHeight * this.aspectRatio) {
          this.settings.cropperScaledMaxWidth = this.settings.cropperScaledMaxHeight * this.aspectRatio;
        } else if (this.settings.cropperScaledMaxWidth < this.settings.cropperScaledMaxHeight * this.aspectRatio) {
          this.settings.cropperScaledMaxHeight = this.settings.cropperScaledMaxWidth / this.aspectRatio;
        }
      }
    } else {
      this.settings.cropperScaledMaxWidth = this.maxSize.width;
      this.settings.cropperScaledMaxHeight = this.maxSize.height;
    }
  }
  checkCropperPosition(maintainSize = false) {
    if (this.cropper.x1 < 0) {
      this.cropper.x2 -= maintainSize ? this.cropper.x1 : 0;
      this.cropper.x1 = 0;
    }
    if (this.cropper.y1 < 0) {
      this.cropper.y2 -= maintainSize ? this.cropper.y1 : 0;
      this.cropper.y1 = 0;
    }
    if (this.cropper.x2 > this.maxSize.width) {
      this.cropper.x1 -= maintainSize ? this.cropper.x2 - this.maxSize.width : 0;
      this.cropper.x2 = this.maxSize.width;
    }
    if (this.cropper.y2 > this.maxSize.height) {
      this.cropper.y1 -= maintainSize ? this.cropper.y2 - this.maxSize.height : 0;
      this.cropper.y2 = this.maxSize.height;
    }
  }
  moveStop() {
    if (this.moveStart.active) {
      this.moveStart.active = false;
      if (this.moveStart?.type === MoveTypes.Drag) {
        this.transformChange.emit(this.transform);
      } else {
        this.doAutoCrop();
      }
    }
  }
  pinchStop() {
    if (this.moveStart.active) {
      this.moveStart.active = false;
      this.doAutoCrop();
    }
  }
  doAutoCrop() {
    if (this.autoCrop) {
      void this.crop();
    }
  }
  crop(output = this.settings.output) {
    if (this.loadedImage?.transformed?.image != null) {
      this.startCropImage.emit();
      if (output === 'blob') {
        return this.cropToBlob();
      } else if (output === 'base64') {
        return this.cropToBase64();
      }
    }
    return null;
  }
  cropToBlob() {
    const result = this.cropService.crop(this.sourceImage, this.loadedImage, this.cropper, this.settings, 'blob');
    if (result) {
      return Promise.resolve(result).then(output => {
        this.imageCropped.emit(output);
        return result;
      });
    }
    return null;
  }
  cropToBase64() {
    const result = this.cropService.crop(this.sourceImage, this.loadedImage, this.cropper, this.settings, 'base64');
    if (result) {
      this.imageCropped.emit(result);
      return result;
    }
    return null;
  }
  aspectRatioIsCorrect() {
    const currentCropAspectRatio = (this.cropper.x2 - this.cropper.x1) / (this.cropper.y2 - this.cropper.y1);
    return currentCropAspectRatio === this.aspectRatio;
  }
}
ImageCropperComponent.ɵfac = function ImageCropperComponent_Factory(t) {
  return new (t || ImageCropperComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](CropService), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](CropperPositionService), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](LoadImageService), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__.DomSanitizer), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__.HAMMER_LOADER, 8));
};
ImageCropperComponent.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
  type: ImageCropperComponent,
  selectors: [["image-cropper"]],
  viewQuery: function ImageCropperComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵviewQuery"](_c0, 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵviewQuery"](_c1, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵloadQuery"]()) && (ctx.wrapper = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵloadQuery"]()) && (ctx.sourceImage = _t.first);
    }
  },
  hostVars: 6,
  hostBindings: function ImageCropperComponent_HostBindings(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("resize", function ImageCropperComponent_resize_HostBindingHandler() {
        return ctx.onResize();
      }, false, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresolveWindow"])("mousemove", function ImageCropperComponent_mousemove_HostBindingHandler($event) {
        return ctx.moveImg($event);
      }, false, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresolveDocument"])("touchmove", function ImageCropperComponent_touchmove_HostBindingHandler($event) {
        return ctx.moveImg($event);
      }, false, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresolveDocument"])("mouseup", function ImageCropperComponent_mouseup_HostBindingHandler() {
        return ctx.moveStop();
      }, false, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresolveDocument"])("touchend", function ImageCropperComponent_touchend_HostBindingHandler() {
        return ctx.moveStop();
      }, false, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresolveDocument"]);
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵstyleProp"]("text-align", ctx.alignImage);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassProp"]("disabled", ctx.disabled)("ngx-ix-hidden", ctx.hidden);
    }
  },
  inputs: {
    imageChangedEvent: "imageChangedEvent",
    imageURL: "imageURL",
    imageBase64: "imageBase64",
    imageFile: "imageFile",
    imageAltText: "imageAltText",
    output: "output",
    format: "format",
    transform: "transform",
    maintainAspectRatio: "maintainAspectRatio",
    aspectRatio: "aspectRatio",
    resetCropOnAspectRatioChange: "resetCropOnAspectRatioChange",
    resizeToWidth: "resizeToWidth",
    resizeToHeight: "resizeToHeight",
    cropperMinWidth: "cropperMinWidth",
    cropperMinHeight: "cropperMinHeight",
    cropperMaxHeight: "cropperMaxHeight",
    cropperMaxWidth: "cropperMaxWidth",
    cropperStaticWidth: "cropperStaticWidth",
    cropperStaticHeight: "cropperStaticHeight",
    canvasRotation: "canvasRotation",
    initialStepSize: "initialStepSize",
    roundCropper: "roundCropper",
    onlyScaleDown: "onlyScaleDown",
    imageQuality: "imageQuality",
    autoCrop: "autoCrop",
    backgroundColor: "backgroundColor",
    containWithinAspectRatio: "containWithinAspectRatio",
    hideResizeSquares: "hideResizeSquares",
    allowMoveImage: "allowMoveImage",
    cropper: "cropper",
    alignImage: "alignImage",
    disabled: "disabled",
    hidden: "hidden"
  },
  outputs: {
    imageCropped: "imageCropped",
    startCropImage: "startCropImage",
    imageLoaded: "imageLoaded",
    cropperReady: "cropperReady",
    loadImageFailed: "loadImageFailed",
    transformChange: "transformChange"
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵNgOnChangesFeature"]],
  decls: 5,
  vars: 10,
  consts: [["wrapper", ""], ["class", "ngx-ic-source-image", 3, "src", "visibility", "transform", "ngx-ic-draggable", "load", "mousedown", "touchstart", "error", 4, "ngIf"], [1, "ngx-ic-overlay"], ["class", "ngx-ic-cropper", "tabindex", "0", 3, "ngx-ic-round", "top", "left", "width", "height", "margin-left", "visibility", "keydown", 4, "ngIf"], [1, "ngx-ic-source-image", 3, "src", "load", "mousedown", "touchstart", "error"], ["sourceImage", ""], ["tabindex", "0", 1, "ngx-ic-cropper", 3, "keydown"], [1, "ngx-ic-move", 3, "mousedown", "touchstart"], [4, "ngIf"], [1, "ngx-ic-resize", "ngx-ic-topleft", 3, "mousedown", "touchstart"], [1, "ngx-ic-square"], [1, "ngx-ic-resize", "ngx-ic-top"], [1, "ngx-ic-resize", "ngx-ic-topright", 3, "mousedown", "touchstart"], [1, "ngx-ic-resize", "ngx-ic-right"], [1, "ngx-ic-resize", "ngx-ic-bottomright", 3, "mousedown", "touchstart"], [1, "ngx-ic-resize", "ngx-ic-bottom"], [1, "ngx-ic-resize", "ngx-ic-bottomleft", 3, "mousedown", "touchstart"], [1, "ngx-ic-resize", "ngx-ic-left"], [1, "ngx-ic-resize-bar", "ngx-ic-top", 3, "mousedown", "touchstart"], [1, "ngx-ic-resize-bar", "ngx-ic-right", 3, "mousedown", "touchstart"], [1, "ngx-ic-resize-bar", "ngx-ic-bottom", 3, "mousedown", "touchstart"], [1, "ngx-ic-resize-bar", "ngx-ic-left", 3, "mousedown", "touchstart"]],
  template: function ImageCropperComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", null, 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](2, ImageCropperComponent_img_2_Template, 2, 8, "img", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](3, "div", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](4, ImageCropperComponent_div_4_Template, 3, 15, "div", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵstyleProp"]("background", ctx.imageVisible && ctx.backgroundColor);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.safeImgDataUrl);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵstyleProp"]("width", ctx.maxSize.width, "px")("height", ctx.maxSize.height, "px")("margin-left", ctx.alignImage === "center" ? ctx.marginLeft : null);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.imageVisible);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.NgIf],
  styles: ["[_nghost-%COMP%]{display:flex;position:relative;width:100%;max-width:100%;max-height:100%;overflow:hidden;padding:5px;text-align:center}[_nghost-%COMP%] > div[_ngcontent-%COMP%]{width:100%;position:relative}[_nghost-%COMP%] > div[_ngcontent-%COMP%]   img.ngx-ic-source-image[_ngcontent-%COMP%]{max-width:100%;max-height:100%;transform-origin:center}[_nghost-%COMP%] > div[_ngcontent-%COMP%]   img.ngx-ic-source-image.ngx-ic-draggable[_ngcontent-%COMP%]{user-drag:none;-webkit-user-drag:none;user-select:none;-moz-user-select:none;-webkit-user-select:none;-ms-user-select:none;cursor:grab}[_nghost-%COMP%]   .ngx-ic-overlay[_ngcontent-%COMP%]{position:absolute;pointer-events:none;touch-action:none;outline:var(--cropper-overlay-color, white) solid 100vw;top:0;left:0}[_nghost-%COMP%]   .ngx-ic-cropper[_ngcontent-%COMP%]{position:absolute;display:flex;color:#53535c;background:transparent;outline:rgba(255,255,255,.3) solid 100vw;outline:var(--cropper-outline-color, rgba(255, 255, 255, .3)) solid 100vw;touch-action:none}@media (orientation: portrait){[_nghost-%COMP%]   .ngx-ic-cropper[_ngcontent-%COMP%]{outline-width:100vh}}[_nghost-%COMP%]   .ngx-ic-cropper[_ngcontent-%COMP%]:after{position:absolute;content:\"\";inset:0;pointer-events:none;border:dashed 1px;opacity:.75;color:inherit;z-index:1}[_nghost-%COMP%]   .ngx-ic-cropper[_ngcontent-%COMP%]   .ngx-ic-move[_ngcontent-%COMP%]{width:100%;cursor:move;border:1px solid rgba(255,255,255,.5)}[_nghost-%COMP%]   .ngx-ic-cropper[_ngcontent-%COMP%]:focus   .ngx-ic-move[_ngcontent-%COMP%]{border-color:#1e90ff;border-width:2px}[_nghost-%COMP%]   .ngx-ic-cropper[_ngcontent-%COMP%]   .ngx-ic-resize[_ngcontent-%COMP%]{position:absolute;display:inline-block;line-height:6px;padding:8px;opacity:.85;z-index:1}[_nghost-%COMP%]   .ngx-ic-cropper[_ngcontent-%COMP%]   .ngx-ic-resize[_ngcontent-%COMP%]   .ngx-ic-square[_ngcontent-%COMP%]{display:inline-block;background:#53535C;width:6px;height:6px;border:1px solid rgba(255,255,255,.5);box-sizing:content-box}[_nghost-%COMP%]   .ngx-ic-cropper[_ngcontent-%COMP%]   .ngx-ic-resize.ngx-ic-topleft[_ngcontent-%COMP%]{top:-12px;left:-12px;cursor:nwse-resize}[_nghost-%COMP%]   .ngx-ic-cropper[_ngcontent-%COMP%]   .ngx-ic-resize.ngx-ic-top[_ngcontent-%COMP%]{top:-12px;left:calc(50% - 12px);cursor:ns-resize}[_nghost-%COMP%]   .ngx-ic-cropper[_ngcontent-%COMP%]   .ngx-ic-resize.ngx-ic-topright[_ngcontent-%COMP%]{top:-12px;right:-12px;cursor:nesw-resize}[_nghost-%COMP%]   .ngx-ic-cropper[_ngcontent-%COMP%]   .ngx-ic-resize.ngx-ic-right[_ngcontent-%COMP%]{top:calc(50% - 12px);right:-12px;cursor:ew-resize}[_nghost-%COMP%]   .ngx-ic-cropper[_ngcontent-%COMP%]   .ngx-ic-resize.ngx-ic-bottomright[_ngcontent-%COMP%]{bottom:-12px;right:-12px;cursor:nwse-resize}[_nghost-%COMP%]   .ngx-ic-cropper[_ngcontent-%COMP%]   .ngx-ic-resize.ngx-ic-bottom[_ngcontent-%COMP%]{bottom:-12px;left:calc(50% - 12px);cursor:ns-resize}[_nghost-%COMP%]   .ngx-ic-cropper[_ngcontent-%COMP%]   .ngx-ic-resize.ngx-ic-bottomleft[_ngcontent-%COMP%]{bottom:-12px;left:-12px;cursor:nesw-resize}[_nghost-%COMP%]   .ngx-ic-cropper[_ngcontent-%COMP%]   .ngx-ic-resize.ngx-ic-left[_ngcontent-%COMP%]{top:calc(50% - 12px);left:-12px;cursor:ew-resize}[_nghost-%COMP%]   .ngx-ic-cropper[_ngcontent-%COMP%]   .ngx-ic-resize-bar[_ngcontent-%COMP%]{position:absolute;z-index:1}[_nghost-%COMP%]   .ngx-ic-cropper[_ngcontent-%COMP%]   .ngx-ic-resize-bar.ngx-ic-top[_ngcontent-%COMP%]{top:-11px;left:11px;width:calc(100% - 22px);height:22px;cursor:ns-resize}[_nghost-%COMP%]   .ngx-ic-cropper[_ngcontent-%COMP%]   .ngx-ic-resize-bar.ngx-ic-right[_ngcontent-%COMP%]{top:11px;right:-11px;height:calc(100% - 22px);width:22px;cursor:ew-resize}[_nghost-%COMP%]   .ngx-ic-cropper[_ngcontent-%COMP%]   .ngx-ic-resize-bar.ngx-ic-bottom[_ngcontent-%COMP%]{bottom:-11px;left:11px;width:calc(100% - 22px);height:22px;cursor:ns-resize}[_nghost-%COMP%]   .ngx-ic-cropper[_ngcontent-%COMP%]   .ngx-ic-resize-bar.ngx-ic-left[_ngcontent-%COMP%]{top:11px;left:-11px;height:calc(100% - 22px);width:22px;cursor:ew-resize}[_nghost-%COMP%]   .ngx-ic-cropper.ngx-ic-round[_ngcontent-%COMP%]{outline-color:transparent}[_nghost-%COMP%]   .ngx-ic-cropper.ngx-ic-round[_ngcontent-%COMP%]:after{border-radius:100%;box-shadow:0 0 0 100vw #ffffff4d;box-shadow:0 0 0 100vw var(--cropper-outline-color, rgba(255, 255, 255, .3))}@media (orientation: portrait){[_nghost-%COMP%]   .ngx-ic-cropper.ngx-ic-round[_ngcontent-%COMP%]:after{box-shadow:0 0 0 100vh #ffffff4d;box-shadow:0 0 0 100vh var(--cropper-outline-color, rgba(255, 255, 255, .3))}}[_nghost-%COMP%]   .ngx-ic-cropper.ngx-ic-round[_ngcontent-%COMP%]   .ngx-ic-move[_ngcontent-%COMP%]{border-radius:100%}.disabled[_nghost-%COMP%]   .ngx-ic-cropper[_ngcontent-%COMP%]   .ngx-ic-resize[_ngcontent-%COMP%], .disabled[_nghost-%COMP%]   .ngx-ic-cropper[_ngcontent-%COMP%]   .ngx-ic-resize-bar[_ngcontent-%COMP%], .disabled[_nghost-%COMP%]   .ngx-ic-cropper[_ngcontent-%COMP%]   .ngx-ic-move[_ngcontent-%COMP%]{display:none}.ngx-ix-hidden[_nghost-%COMP%]{display:none}"],
  changeDetection: 0
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](ImageCropperComponent, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Component,
    args: [{
      selector: 'image-cropper',
      changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_1__.ChangeDetectionStrategy.OnPush,
      template: "<div\n  [style.background]=\"imageVisible && backgroundColor\"\n  #wrapper\n>\n  <img\n    #sourceImage\n    class=\"ngx-ic-source-image\"\n    *ngIf=\"safeImgDataUrl\"\n    [src]=\"safeImgDataUrl\"\n    [style.visibility]=\"imageVisible ? 'visible' : 'hidden'\"\n    [style.transform]=\"safeTransformStyle\"\n    [class.ngx-ic-draggable]=\"!disabled && allowMoveImage\"\n    [attr.alt]=\"imageAltText\"\n    (load)=\"imageLoadedInView()\"\n    (mousedown)=\"startMove($event, moveTypes.Drag)\"\n    (touchstart)=\"startMove($event, moveTypes.Drag)\"\n    (error)=\"loadImageError($event)\"\n  >\n  <div\n    class=\"ngx-ic-overlay\"\n    [style.width.px]=\"maxSize.width\"\n    [style.height.px]=\"maxSize.height\"\n    [style.margin-left]=\"alignImage === 'center' ? marginLeft : null\"\n  ></div>\n  <div class=\"ngx-ic-cropper\"\n       *ngIf=\"imageVisible\"\n       [class.ngx-ic-round]=\"roundCropper\"\n       [style.top.px]=\"cropper.y1\"\n       [style.left.px]=\"cropper.x1\"\n       [style.width.px]=\"cropper.x2 - cropper.x1\"\n       [style.height.px]=\"cropper.y2 - cropper.y1\"\n       [style.margin-left]=\"alignImage === 'center' ? marginLeft : null\"\n       [style.visibility]=\"imageVisible ? 'visible' : 'hidden'\"\n       (keydown)=\"keyboardAccess($event)\"\n       tabindex=\"0\"\n  >\n    <div\n      (mousedown)=\"startMove($event, moveTypes.Move)\"\n      (touchstart)=\"startMove($event, moveTypes.Move)\"\n      class=\"ngx-ic-move\">\n    </div>\n    <ng-container *ngIf=\"!hideResizeSquares\">\n            <span class=\"ngx-ic-resize ngx-ic-topleft\"\n                  (mousedown)=\"startMove($event, moveTypes.Resize, 'topleft')\"\n                  (touchstart)=\"startMove($event, moveTypes.Resize, 'topleft')\">\n                <span class=\"ngx-ic-square\"></span>\n            </span>\n      <span class=\"ngx-ic-resize ngx-ic-top\">\n                <span class=\"ngx-ic-square\"></span>\n            </span>\n      <span class=\"ngx-ic-resize ngx-ic-topright\"\n            (mousedown)=\"startMove($event, moveTypes.Resize, 'topright')\"\n            (touchstart)=\"startMove($event, moveTypes.Resize, 'topright')\">\n                <span class=\"ngx-ic-square\"></span>\n            </span>\n      <span class=\"ngx-ic-resize ngx-ic-right\">\n                <span class=\"ngx-ic-square\"></span>\n            </span>\n      <span class=\"ngx-ic-resize ngx-ic-bottomright\"\n            (mousedown)=\"startMove($event, moveTypes.Resize, 'bottomright')\"\n            (touchstart)=\"startMove($event, moveTypes.Resize, 'bottomright')\">\n                <span class=\"ngx-ic-square\"></span>\n            </span>\n      <span class=\"ngx-ic-resize ngx-ic-bottom\">\n                <span class=\"ngx-ic-square\"></span>\n            </span>\n      <span class=\"ngx-ic-resize ngx-ic-bottomleft\"\n            (mousedown)=\"startMove($event, moveTypes.Resize, 'bottomleft')\"\n            (touchstart)=\"startMove($event, moveTypes.Resize, 'bottomleft')\">\n                <span class=\"ngx-ic-square\"></span>\n            </span>\n      <span class=\"ngx-ic-resize ngx-ic-left\">\n                <span class=\"ngx-ic-square\"></span>\n            </span>\n      <span class=\"ngx-ic-resize-bar ngx-ic-top\"\n            (mousedown)=\"startMove($event, moveTypes.Resize, 'top')\"\n            (touchstart)=\"startMove($event, moveTypes.Resize, 'top')\">\n            </span>\n      <span class=\"ngx-ic-resize-bar ngx-ic-right\"\n            (mousedown)=\"startMove($event, moveTypes.Resize, 'right')\"\n            (touchstart)=\"startMove($event, moveTypes.Resize, 'right')\">\n            </span>\n      <span class=\"ngx-ic-resize-bar ngx-ic-bottom\"\n            (mousedown)=\"startMove($event, moveTypes.Resize, 'bottom')\"\n            (touchstart)=\"startMove($event, moveTypes.Resize, 'bottom')\">\n            </span>\n      <span class=\"ngx-ic-resize-bar ngx-ic-left\"\n            (mousedown)=\"startMove($event, moveTypes.Resize, 'left')\"\n            (touchstart)=\"startMove($event, moveTypes.Resize, 'left')\">\n            </span>\n    </ng-container>\n  </div>\n</div>\n",
      styles: [":host{display:flex;position:relative;width:100%;max-width:100%;max-height:100%;overflow:hidden;padding:5px;text-align:center}:host>div{width:100%;position:relative}:host>div img.ngx-ic-source-image{max-width:100%;max-height:100%;transform-origin:center}:host>div img.ngx-ic-source-image.ngx-ic-draggable{user-drag:none;-webkit-user-drag:none;user-select:none;-moz-user-select:none;-webkit-user-select:none;-ms-user-select:none;cursor:grab}:host .ngx-ic-overlay{position:absolute;pointer-events:none;touch-action:none;outline:var(--cropper-overlay-color, white) solid 100vw;top:0;left:0}:host .ngx-ic-cropper{position:absolute;display:flex;color:#53535c;background:transparent;outline:rgba(255,255,255,.3) solid 100vw;outline:var(--cropper-outline-color, rgba(255, 255, 255, .3)) solid 100vw;touch-action:none}@media (orientation: portrait){:host .ngx-ic-cropper{outline-width:100vh}}:host .ngx-ic-cropper:after{position:absolute;content:\"\";inset:0;pointer-events:none;border:dashed 1px;opacity:.75;color:inherit;z-index:1}:host .ngx-ic-cropper .ngx-ic-move{width:100%;cursor:move;border:1px solid rgba(255,255,255,.5)}:host .ngx-ic-cropper:focus .ngx-ic-move{border-color:#1e90ff;border-width:2px}:host .ngx-ic-cropper .ngx-ic-resize{position:absolute;display:inline-block;line-height:6px;padding:8px;opacity:.85;z-index:1}:host .ngx-ic-cropper .ngx-ic-resize .ngx-ic-square{display:inline-block;background:#53535C;width:6px;height:6px;border:1px solid rgba(255,255,255,.5);box-sizing:content-box}:host .ngx-ic-cropper .ngx-ic-resize.ngx-ic-topleft{top:-12px;left:-12px;cursor:nwse-resize}:host .ngx-ic-cropper .ngx-ic-resize.ngx-ic-top{top:-12px;left:calc(50% - 12px);cursor:ns-resize}:host .ngx-ic-cropper .ngx-ic-resize.ngx-ic-topright{top:-12px;right:-12px;cursor:nesw-resize}:host .ngx-ic-cropper .ngx-ic-resize.ngx-ic-right{top:calc(50% - 12px);right:-12px;cursor:ew-resize}:host .ngx-ic-cropper .ngx-ic-resize.ngx-ic-bottomright{bottom:-12px;right:-12px;cursor:nwse-resize}:host .ngx-ic-cropper .ngx-ic-resize.ngx-ic-bottom{bottom:-12px;left:calc(50% - 12px);cursor:ns-resize}:host .ngx-ic-cropper .ngx-ic-resize.ngx-ic-bottomleft{bottom:-12px;left:-12px;cursor:nesw-resize}:host .ngx-ic-cropper .ngx-ic-resize.ngx-ic-left{top:calc(50% - 12px);left:-12px;cursor:ew-resize}:host .ngx-ic-cropper .ngx-ic-resize-bar{position:absolute;z-index:1}:host .ngx-ic-cropper .ngx-ic-resize-bar.ngx-ic-top{top:-11px;left:11px;width:calc(100% - 22px);height:22px;cursor:ns-resize}:host .ngx-ic-cropper .ngx-ic-resize-bar.ngx-ic-right{top:11px;right:-11px;height:calc(100% - 22px);width:22px;cursor:ew-resize}:host .ngx-ic-cropper .ngx-ic-resize-bar.ngx-ic-bottom{bottom:-11px;left:11px;width:calc(100% - 22px);height:22px;cursor:ns-resize}:host .ngx-ic-cropper .ngx-ic-resize-bar.ngx-ic-left{top:11px;left:-11px;height:calc(100% - 22px);width:22px;cursor:ew-resize}:host .ngx-ic-cropper.ngx-ic-round{outline-color:transparent}:host .ngx-ic-cropper.ngx-ic-round:after{border-radius:100%;box-shadow:0 0 0 100vw #ffffff4d;box-shadow:0 0 0 100vw var(--cropper-outline-color, rgba(255, 255, 255, .3))}@media (orientation: portrait){:host .ngx-ic-cropper.ngx-ic-round:after{box-shadow:0 0 0 100vh #ffffff4d;box-shadow:0 0 0 100vh var(--cropper-outline-color, rgba(255, 255, 255, .3))}}:host .ngx-ic-cropper.ngx-ic-round .ngx-ic-move{border-radius:100%}:host.disabled .ngx-ic-cropper .ngx-ic-resize,:host.disabled .ngx-ic-cropper .ngx-ic-resize-bar,:host.disabled .ngx-ic-cropper .ngx-ic-move{display:none}:host.ngx-ix-hidden{display:none}\n"]
    }]
  }], function () {
    return [{
      type: CropService
    }, {
      type: CropperPositionService
    }, {
      type: LoadImageService
    }, {
      type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__.DomSanitizer
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.ChangeDetectorRef
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Optional
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Inject,
        args: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__.HAMMER_LOADER]
      }]
    }];
  }, {
    wrapper: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.ViewChild,
      args: ['wrapper', {
        static: true
      }]
    }],
    sourceImage: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.ViewChild,
      args: ['sourceImage', {
        static: false
      }]
    }],
    imageChangedEvent: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    imageURL: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    imageBase64: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    imageFile: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    imageAltText: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    output: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    format: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    transform: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    maintainAspectRatio: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    aspectRatio: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    resetCropOnAspectRatioChange: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    resizeToWidth: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    resizeToHeight: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    cropperMinWidth: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    cropperMinHeight: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    cropperMaxHeight: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    cropperMaxWidth: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    cropperStaticWidth: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    cropperStaticHeight: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    canvasRotation: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    initialStepSize: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    roundCropper: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    onlyScaleDown: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    imageQuality: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    autoCrop: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    backgroundColor: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    containWithinAspectRatio: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    hideResizeSquares: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    allowMoveImage: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    cropper: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    alignImage: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.HostBinding,
      args: ['style.text-align']
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    disabled: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.HostBinding,
      args: ['class.disabled']
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    hidden: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.HostBinding,
      args: ['class.ngx-ix-hidden']
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    imageCropped: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Output
    }],
    startCropImage: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Output
    }],
    imageLoaded: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Output
    }],
    cropperReady: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Output
    }],
    loadImageFailed: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Output
    }],
    transformChange: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Output
    }],
    onResize: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.HostListener,
      args: ['window:resize']
    }],
    moveImg: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.HostListener,
      args: ['document:mousemove', ['$event']]
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.HostListener,
      args: ['document:touchmove', ['$event']]
    }],
    moveStop: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.HostListener,
      args: ['document:mouseup']
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.HostListener,
      args: ['document:touchend']
    }]
  });
})();
class ImageCropperModule {}
ImageCropperModule.ɵfac = function ImageCropperModule_Factory(t) {
  return new (t || ImageCropperModule)();
};
ImageCropperModule.ɵmod = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
  type: ImageCropperModule
});
ImageCropperModule.ɵinj = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
  imports: [[_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule]]
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](ImageCropperModule, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.NgModule,
    args: [{
      imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule],
      declarations: [ImageCropperComponent],
      exports: [ImageCropperComponent]
    }]
  }], null, null);
})();
function base64ToFile(base64Image) {
  const split = base64Image.split(',');
  const type = split[0].replace('data:', '').replace(';base64', '');
  const byteString = atob(split[1]);
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i += 1) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], {
    type
  });
}

/**
 * Generated bundle index. Do not edit.
 */



/***/ })

}]);
//# sourceMappingURL=src_app_modules_image-cropper_image-cropper_module_ts.97ace0e5ce1d0fb7.js.map