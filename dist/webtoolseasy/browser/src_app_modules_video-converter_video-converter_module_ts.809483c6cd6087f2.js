"use strict";
(self["webpackChunkwebtoolseasy"] = self["webpackChunkwebtoolseasy"] || []).push([["src_app_modules_video-converter_video-converter_module_ts"],{

/***/ 4654:
/*!**********************************!*\
  !*** ./src/app/@types/ffmpeg.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ConvertEventType: () => (/* binding */ ConvertEventType)
/* harmony export */ });
var ConvertEventType;
(function (ConvertEventType) {
  ConvertEventType[ConvertEventType["START"] = 1] = "START";
  ConvertEventType[ConvertEventType["END"] = 2] = "END";
  ConvertEventType[ConvertEventType["FAILED"] = 3] = "FAILED";
})(ConvertEventType || (ConvertEventType = {}));

/***/ }),

/***/ 367:
/*!**************************************!*\
  !*** ./src/app/@types/popup-form.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PopupFormElementType: () => (/* binding */ PopupFormElementType),
/* harmony export */   PopupFormType: () => (/* binding */ PopupFormType)
/* harmony export */ });
var PopupFormType;
(function (PopupFormType) {
  PopupFormType["VIDEO_CONVERT_SETTINGS"] = "video-convert-sttings";
})(PopupFormType || (PopupFormType = {}));
var PopupFormElementType;
(function (PopupFormElementType) {
  PopupFormElementType["DROPDOWN"] = "dropdown";
  PopupFormElementType["BUTTON"] = "button";
})(PopupFormElementType || (PopupFormElementType = {}));

/***/ }),

/***/ 2215:
/*!*******************************************************!*\
  !*** ./src/app/custom-datastructures/QueueStorage.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   QueueStorage: () => (/* binding */ QueueStorage)
/* harmony export */ });
class QueueStorage {
  constructor() {
    // declaring
    this.items = [];
  }
  // enqueue function
  enqueue(element) {
    // adding element to the queue
    this.items.push(element);
  }
  // dequeue function
  dequeue() {
    // removing element from the queue
    // returns underflow when called
    // on empty queue
    if (this.isEmpty()) {
      throw Error('no elements in queue');
    }
    return this.items.shift();
  }
  // front function
  front() {
    // returns the Front element of
    // the queue without removing it.
    if (this.isEmpty()) {
      throw Error('no elements in queue');
    }
    return this.items[0];
  }
  // isEmpty function
  isEmpty() {
    // return true if the queue is empty.
    return this.items.length === 0;
  }
}

/***/ }),

/***/ 6318:
/*!************************************************************!*\
  !*** ./src/app/modules/popup-form/popup-form.component.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PopupFormComponent: () => (/* binding */ PopupFormComponent)
/* harmony export */ });
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/dialog */ 7401);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/form-field */ 1333);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/select */ 6355);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/core */ 5309);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/button */ 895);
var _class;








function PopupFormComponent_div_1_div_1_mat_form_field_1_mat_option_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-option", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const option_r6 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", option_r6.value);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](option_r6.displayName);
  }
}
function PopupFormComponent_div_1_div_1_mat_form_field_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-form-field", 9)(1, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Select format");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "mat-select", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("valueChange", function PopupFormComponent_div_1_div_1_mat_form_field_1_Template_mat_select_valueChange_3_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r9);
      const element_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
      const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r7.changeDropdownValue(element_r3.propertyName, $event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, PopupFormComponent_div_1_div_1_mat_form_field_1_mat_option_4_Template, 2, 2, "mat-option", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const element_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", element_r3.data.targetFormat);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", element_r3.data.options);
  }
}
function PopupFormComponent_div_1_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, PopupFormComponent_div_1_div_1_mat_form_field_1_Template, 5, 2, "mat-form-field", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const element_r3 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", element_r3.type === "dropdown");
  }
}
function PopupFormComponent_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, PopupFormComponent_div_1_div_1_Template, 2, 1, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", row_r1.elements);
  }
}
class PopupFormComponent {
  constructor(dialogRef, data) {
    this.dialogRef = dialogRef;
    this.formContext = data;
    this.result = {
      data: {},
      type: this.formContext.type,
      referenceId: this.formContext.referenceId
    };
  }
  applySettings() {
    this.dialogRef.close(this.result);
  }
  cancelDialog() {
    this.dialogRef.close();
  }
  changeDropdownValue(propertyName, changedValue) {
    this.result.data[propertyName] = changedValue;
  }
}
_class = PopupFormComponent;
_class.ɵfac = function PopupFormComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__.MatDialogRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__.MAT_DIALOG_DATA));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["app-popup-form"]],
  decls: 7,
  vars: 1,
  consts: [[1, "flex-display", "flex-column-flow", 2, "margin", "15px"], ["class", "popup-row flex-display flex-row-flow full-width flex-center flex-align-center", 4, "ngFor", "ngForOf"], [1, "flex-display", "flex-row-flow", "full-width", "flex-center", 2, "margin-top", "15px"], ["mat-raised-button", "", "color", "primary", 2, "margin-right", "10px", 3, "click"], ["mat-raised-button", "", "color", "primary", 3, "click"], [1, "popup-row", "flex-display", "flex-row-flow", "full-width", "flex-center", "flex-align-center"], ["class", "popup-element", 4, "ngFor", "ngForOf"], [1, "popup-element"], ["appearance", "outline", "color", "primary", "style", "margin-right: 10px; margin-bottom: -1.25em", 4, "ngIf"], ["appearance", "outline", "color", "primary", 2, "margin-right", "10px", "margin-bottom", "-1.25em"], ["disableRipple", "", 3, "value", "valueChange"], [3, "value", 4, "ngFor", "ngForOf"], [3, "value"]],
  template: function PopupFormComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, PopupFormComponent_div_1_Template, 2, 1, "div", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2)(3, "button", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function PopupFormComponent_Template_button_click_3_listener() {
        return ctx.applySettings();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, " Apply Settings ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "button", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function PopupFormComponent_Template_button_click_5_listener() {
        return ctx.cancelDialog();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, " Cancel ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.formContext.rows);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_2__.NgIf, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_3__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_3__.MatLabel, _angular_material_select__WEBPACK_IMPORTED_MODULE_4__.MatSelect, _angular_material_core__WEBPACK_IMPORTED_MODULE_5__.MatOption, _angular_material_button__WEBPACK_IMPORTED_MODULE_6__.MatButton],
  styles: [".popup-row[_ngcontent-%COMP%] {\n  margin-left: 10px;\n  margin-right: 10px;\n  margin-top: 5px;\n  margin-bottom: 5px;\n}\n\n.popup-element[_ngcontent-%COMP%] {\n  margin-left: 5px;\n  margin-right: 5px;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvbW9kdWxlcy9wb3B1cC1mb3JtL3BvcHVwLWZvcm0uY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxpQkFBQTtFQUNBLGtCQUFBO0VBQ0EsZUFBQTtFQUNBLGtCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxnQkFBQTtFQUNBLGlCQUFBO0FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIucG9wdXAtcm93IHtcbiAgbWFyZ2luLWxlZnQ6IDEwcHg7XG4gIG1hcmdpbi1yaWdodDogMTBweDtcbiAgbWFyZ2luLXRvcDogNXB4O1xuICBtYXJnaW4tYm90dG9tOiA1cHg7XG59XG5cbi5wb3B1cC1lbGVtZW50IHtcbiAgbWFyZ2luLWxlZnQ6IDVweDtcbiAgbWFyZ2luLXJpZ2h0OiA1cHg7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
});

/***/ }),

/***/ 3707:
/*!*********************************************************!*\
  !*** ./src/app/modules/popup-form/popup-form.module.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PopupFormModule: () => (/* binding */ PopupFormModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _popup_form_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./popup-form.component */ 6318);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/button */ 895);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/icon */ 6515);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/select */ 6355);
/* harmony import */ var _angular_material_slider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/slider */ 549);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/dialog */ 7401);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 1699);
var _class;








class PopupFormModule {}
_class = PopupFormModule;
_class.ɵfac = function PopupFormModule_Factory(t) {
  return new (t || _class)();
};
_class.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
  type: _class
});
_class.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule, _angular_material_select__WEBPACK_IMPORTED_MODULE_3__.MatSelectModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_4__.MatButtonModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__.MatIconModule, _angular_material_slider__WEBPACK_IMPORTED_MODULE_6__.MatSliderModule, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_7__.MatDialogModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](PopupFormModule, {
    declarations: [_popup_form_component__WEBPACK_IMPORTED_MODULE_0__.PopupFormComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule, _angular_material_select__WEBPACK_IMPORTED_MODULE_3__.MatSelectModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_4__.MatButtonModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__.MatIconModule, _angular_material_slider__WEBPACK_IMPORTED_MODULE_6__.MatSliderModule, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_7__.MatDialogModule],
    exports: [_popup_form_component__WEBPACK_IMPORTED_MODULE_0__.PopupFormComponent]
  });
})();

/***/ }),

/***/ 6608:
/*!***************************************************************************!*\
  !*** ./src/app/modules/video-converter/video-converter-routing.module.ts ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   VideoConverterRoutingModule: () => (/* binding */ VideoConverterRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 7947);
/* harmony import */ var _video_converter_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./video-converter.component */ 4734);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 1699);
var _class;




const routes = [{
  path: '',
  component: _video_converter_component__WEBPACK_IMPORTED_MODULE_0__.VideoConverterComponent
}];
class VideoConverterRoutingModule {}
_class = VideoConverterRoutingModule;
_class.ɵfac = function VideoConverterRoutingModule_Factory(t) {
  return new (t || _class)();
};
_class.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
  type: _class
});
_class.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](VideoConverterRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
})();

/***/ }),

/***/ 4734:
/*!**********************************************************************!*\
  !*** ./src/app/modules/video-converter/video-converter.component.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   VideoConverterComponent: () => (/* binding */ VideoConverterComponent)
/* harmony export */ });
/* harmony import */ var _Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 1670);
/* harmony import */ var _angular_cdk_layout__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/cdk/layout */ 9743);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! rxjs */ 2513);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! rxjs */ 274);
/* harmony import */ var src_app_types_file__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/@types/file */ 7421);
/* harmony import */ var src_app_service_util_logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/service/util/logger */ 4930);
/* harmony import */ var src_environments_component_config_video_converter_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/environments/component-config/video-converter/config */ 7872);
/* harmony import */ var src_app_types_ffmpeg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/@types/ffmpeg */ 4654);
/* harmony import */ var src_app_types_popup_form__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/@types/popup-form */ 367);
/* harmony import */ var src_app_modules_popup_form_popup_form_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/modules/popup-form/popup-form.component */ 6318);
/* harmony import */ var src_environments_ffmpeg_config__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/environments/ffmpeg-config */ 8023);
/* harmony import */ var src_app_service_util_contants__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/service/util/contants */ 6179);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/dialog */ 7401);
/* harmony import */ var src_app_service_ffmpeg_ffmpeg_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/service/ffmpeg/ffmpeg.service */ 1456);
/* harmony import */ var src_app_service_platform_metadata_platform_metadata_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/service/platform-metadata/platform-metadata.service */ 3242);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/icon */ 6515);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/material/button */ 895);
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/material/card */ 8497);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/material/form-field */ 1333);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/material/select */ 6355);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @angular/material/core */ 5309);
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @angular/material/tooltip */ 702);
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @angular/material/progress-spinner */ 3910);

var _class;
























const _c0 = ["inputFiles"];
function VideoConverterComponent_div_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("drop", function VideoConverterComponent_div_3_Template_div_drop_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵrestoreView"](_r5);
      const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵresetView"](ctx_r4.dropHandler($event));
    })("dragover", function VideoConverterComponent_div_3_Template_div_dragover_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵrestoreView"](_r5);
      const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵresetView"](ctx_r6.dragOverHandler($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](1, "mat-icon", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](2, "collections");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](3, "span", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](4, "Drag & drop files here");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](5, "span", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](6, "or");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](7, "button", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("click", function VideoConverterComponent_div_3_Template_button_click_7_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵrestoreView"](_r5);
      const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵresetView"](ctx_r7.openFileDialog());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](8, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](9, "file_upload");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](10, " Browse for files ");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
  }
}
const _c1 = function (a1) {
  return {
    padding: "10px",
    "justify-content": a1
  };
};
function VideoConverterComponent_div_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div", 10)(1, "button", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("click", function VideoConverterComponent_div_4_Template_button_click_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵrestoreView"](_r9);
      const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵresetView"](ctx_r8.openFileDialog());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](2, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](3, "file_upload");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](4, " Select Files ");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](5, "button", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("click", function VideoConverterComponent_div_4_Template_button_click_5_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵrestoreView"](_r9);
      const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵresetView"](ctx_r10.convertAllVideos());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](6, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](7, "play_arrow");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](8, " Convert All ");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngStyle", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpureFunction1"](1, _c1, ctx_r2.fileDisplayList.length > 0 ? "end" : "center"));
  }
}
function VideoConverterComponent_div_5_mat_card_1_mat_icon_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](0, "mat-icon", 32);
  }
}
function VideoConverterComponent_div_5_mat_card_1_span_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "span", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const file_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](file_r12.error);
  }
}
function VideoConverterComponent_div_5_mat_card_1_span_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "span", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const file_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](file_r12.conversionErrors.get(file_r12.targetFormat));
  }
}
function VideoConverterComponent_div_5_mat_card_1_span_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "span", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const file_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate1"]("Progress: ", file_r12.convertProgress, "%");
  }
}
function VideoConverterComponent_div_5_mat_card_1_mat_spinner_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](0, "mat-spinner", 34);
  }
}
function VideoConverterComponent_div_5_mat_card_1_span_14_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "span", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const file_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate1"]("Progress: ", file_r12.convertProgress, "%");
  }
}
function VideoConverterComponent_div_5_mat_card_1_mat_spinner_15_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](0, "mat-spinner", 35);
  }
  if (rf & 2) {
    const file_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpropertyInterpolate"]("value", file_r12.convertProgress);
  }
}
function VideoConverterComponent_div_5_mat_card_1_mat_form_field_16_mat_option_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "mat-option", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const option_r31 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("value", option_r31.formatId);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](option_r31.displayName);
  }
}
function VideoConverterComponent_div_5_mat_card_1_mat_form_field_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r34 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "mat-form-field", 36)(1, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](2, "Select format");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](3, "mat-select", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("valueChange", function VideoConverterComponent_div_5_mat_card_1_mat_form_field_16_Template_mat_select_valueChange_3_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵrestoreView"](_r34);
      const file_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]().$implicit;
      const ctx_r32 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵresetView"](ctx_r32.changeTargetFormat(file_r12.id, $event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](4, VideoConverterComponent_div_5_mat_card_1_mat_form_field_16_mat_option_4_Template, 2, 2, "mat-option", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const file_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("value", file_r12.targetFormat);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngForOf", file_r12.supportedFormats);
  }
}
function VideoConverterComponent_div_5_mat_card_1_mat_icon_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r38 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "mat-icon", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("click", function VideoConverterComponent_div_5_mat_card_1_mat_icon_17_Template_mat_icon_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵrestoreView"](_r38);
      const file_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]().$implicit;
      const ctx_r36 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵresetView"](ctx_r36.openSettings(file_r12));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
  }
}
function VideoConverterComponent_div_5_mat_card_1_mat_icon_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r41 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "mat-icon", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("click", function VideoConverterComponent_div_5_mat_card_1_mat_icon_18_Template_mat_icon_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵrestoreView"](_r41);
      const file_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]().$implicit;
      const ctx_r39 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵresetView"](ctx_r39.convertVideoFile(file_r12));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
  }
}
function VideoConverterComponent_div_5_mat_card_1_mat_icon_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r44 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "mat-icon", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("click", function VideoConverterComponent_div_5_mat_card_1_mat_icon_19_Template_mat_icon_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵrestoreView"](_r44);
      const file_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]().$implicit;
      const ctx_r42 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵresetView"](ctx_r42.downloadVideo(file_r12));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
  }
}
function VideoConverterComponent_div_5_mat_card_1_mat_icon_20_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "mat-icon", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1, "error");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
  }
}
function VideoConverterComponent_div_5_mat_card_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "mat-card", 15)(1, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](2, VideoConverterComponent_div_5_mat_card_1_mat_icon_2_Template, 1, 0, "mat-icon", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](3, "div", 18)(4, "span", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](6, "span", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](8, VideoConverterComponent_div_5_mat_card_1_span_8_Template, 2, 1, "span", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](9, VideoConverterComponent_div_5_mat_card_1_span_9_Template, 2, 1, "span", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](10, VideoConverterComponent_div_5_mat_card_1_span_10_Template, 2, 1, "span", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](11, "span", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](12, "div", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](13, VideoConverterComponent_div_5_mat_card_1_mat_spinner_13_Template, 1, 0, "mat-spinner", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](14, VideoConverterComponent_div_5_mat_card_1_span_14_Template, 2, 1, "span", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](15, VideoConverterComponent_div_5_mat_card_1_mat_spinner_15_Template, 1, 1, "mat-spinner", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](16, VideoConverterComponent_div_5_mat_card_1_mat_form_field_16_Template, 5, 2, "mat-form-field", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](17, VideoConverterComponent_div_5_mat_card_1_mat_icon_17_Template, 1, 0, "mat-icon", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](18, VideoConverterComponent_div_5_mat_card_1_mat_icon_18_Template, 1, 0, "mat-icon", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](19, VideoConverterComponent_div_5_mat_card_1_mat_icon_19_Template, 1, 0, "mat-icon", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](20, VideoConverterComponent_div_5_mat_card_1_mat_icon_20_Template, 2, 0, "mat-icon", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const file_r12 = ctx.$implicit;
    const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r11.platformMetaDataService.isPlatformBrowser);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](file_r12.file.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](ctx_r11.formatBytes(file_r12.file.size));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", file_r12.error !== undefined);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", file_r12.conversionErrors.get(file_r12.targetFormat));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r11.isMobile && file_r12.inProgress && file_r12.convertProgress > 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", file_r12.inProgress && file_r12.convertProgress === 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", !ctx_r11.isMobile && file_r12.inProgress && file_r12.convertProgress > 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", file_r12.inProgress && file_r12.convertProgress > 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", !file_r12.inProgress && !ctx_r11.isMobile);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r11.platformMetaDataService.isPlatformBrowser && ctx_r11.isMobile && !file_r12.inProgress);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r11.platformMetaDataService.isPlatformBrowser && !file_r12.inProgress && !file_r12.convertedFileData.has(file_r12.targetFormat));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r11.platformMetaDataService.isPlatformBrowser && file_r12.convertedFileData.has(file_r12.targetFormat));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", file_r12.error);
  }
}
function VideoConverterComponent_div_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](1, VideoConverterComponent_div_5_mat_card_1_Template, 21, 14, "mat-card", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngForOf", ctx_r3.fileDisplayList);
  }
}
class VideoConverterComponent {
  constructor(dialog, renderer, zoneRef, breakpointObserver, ffmpegService, platformMetaDataService) {
    this.dialog = dialog;
    this.renderer = renderer;
    this.zoneRef = zoneRef;
    this.breakpointObserver = breakpointObserver;
    this.ffmpegService = ffmpegService;
    this.platformMetaDataService = platformMetaDataService;
    this.fileStore = new Map();
    this.fileDisplayList = [];
    this.ERROR_MESSAGE = '* error: invalid file type';
    this.destroyed = new rxjs__WEBPACK_IMPORTED_MODULE_12__.Subject();
    this.subscriptions = [];
    this.conversionLogs = [];
    /**
     * valid video formats
     */
    this.validVideoFormats = '.mp4,.webm,.ogv,.mkv,.ogm,.avi';
    this.applicationConfig = src_environments_component_config_video_converter_config__WEBPACK_IMPORTED_MODULE_3__.componentConfig;
    this.descriptionData = src_environments_component_config_video_converter_config__WEBPACK_IMPORTED_MODULE_3__.descriptionData;
  }
  ngAfterViewInit() {
    this.breakpointObserver.observe([_angular_cdk_layout__WEBPACK_IMPORTED_MODULE_13__.Breakpoints.Handset, _angular_cdk_layout__WEBPACK_IMPORTED_MODULE_13__.Breakpoints.Web]).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_14__.takeUntil)(this.destroyed)).subscribe(result => {
      this.isMobile = this.breakpointObserver.isMatched(`(max-width: ${src_app_service_util_contants__WEBPACK_IMPORTED_MODULE_8__.MOBILE_VIEW_WIDTH_THRESHOLD})`);
    });
    this.subscriptions.push(this.ffmpegService.fileLoadedEvent.subscribe(this.handleBufferFileLoad.bind(this)));
    this.subscriptions.push(this.ffmpegService.progressEvent.subscribe(this.handleConverionProgress.bind(this)));
    this.subscriptions.push(this.ffmpegService.convertLogEvent.subscribe(this.handleFFMpegLog.bind(this)));
    this.subscriptions.push(this.ffmpegService.convertEvent.subscribe(this.handleConvertEvent.bind(this)));
    this.subscriptions.push(this.ffmpegService.ffmpegStateEvent.subscribe(this.handleFFMpegStatus.bind(this)));
  }
  ngOnDestroy() {
    var _this = this;
    return (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this.destroyed.next();
      _this.destroyed.complete();
      /**
       * unsubscribe from all the subscriptions
       */
      _this.subscriptions.forEach(subscription => subscription.unsubscribe());
      yield _this.ffmpegService.flushBuffer();
    })();
  }
  /**
   * handle ffmpeg status event
   * @param eventData
   */
  handleFFMpegStatus(eventData) {
    var _this2 = this;
    return (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this2.zoneRef.run(() => {
        _this2.fileStore.get(eventData.fileId).converterStatus = eventData.status;
      });
    })();
  }
  /**
   * handle file loaded in buffer event
   * @param eventData
   */
  handleBufferFileLoad(eventData) {
    return (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (eventData.loaded) {
        // this.fileStore.get(eventData.fileId)!.isLoaded = true;
        src_app_service_util_logger__WEBPACK_IMPORTED_MODULE_2__.LogUtils.info(`file with id: ${eventData.fileId} loaded in ffmpeg buffer`);
      } else {
        src_app_service_util_logger__WEBPACK_IMPORTED_MODULE_2__.LogUtils.info(`fail to load file with id: ${eventData.fileId} in buffer`);
      }
    })();
  }
  /**
   * handle file conversion progress
   * @param eventData
   */
  handleConverionProgress(eventData) {
    var _this3 = this;
    return (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this3.zoneRef.run(() => {
        src_app_service_util_logger__WEBPACK_IMPORTED_MODULE_2__.LogUtils.info(`[conversion progress] ( progress: ${eventData.progress}, file id: ${eventData.fileId})`);
        const videoFileData = _this3.fileStore.get(eventData.fileId);
        videoFileData.convertProgress = eventData.progress;
        videoFileData.inProgress = true;
        /**
         * conversion has been completed
         */
        if (eventData.progress === 100) {
          videoFileData.inProgress = false;
        }
      });
    })();
  }
  /**
   * handle file convert event
   * @param eventData
   */
  handleConvertEvent(eventData) {
    var _this4 = this;
    return (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (eventData.type === src_app_types_ffmpeg__WEBPACK_IMPORTED_MODULE_4__.ConvertEventType.END) {
        // LogUtils.info(`converted file received with id: ${eventData.fileId}`);
        _this4.fileStore.get(eventData.fileId).convertedFileData.set(eventData.targetFormat, eventData.fileData);
      } else if (eventData.type === src_app_types_ffmpeg__WEBPACK_IMPORTED_MODULE_4__.ConvertEventType.FAILED) {
        src_app_service_util_logger__WEBPACK_IMPORTED_MODULE_2__.LogUtils.info(`conversion failed for file with id: ${eventData.fileId}`);
        const videoFileData = _this4.fileStore.get(eventData.fileId);
        _this4.zoneRef.run(() => {
          videoFileData.conversionErrors.set(eventData.targetFormat, 'conversion failed! try converting in some other format');
          videoFileData.inProgress = false;
        });
      }
    })();
  }
  /**
   * handle ffmpeg logs
   * @param logParams
   */
  handleFFMpegLog(logParams) {
    src_app_service_util_logger__WEBPACK_IMPORTED_MODULE_2__.LogUtils.info(`[FMPEG LOGS]: ${logParams.message}`);
    if (this.isMobile) {
      this.conversionLogs.push(logParams.message);
    }
  }
  /**
   * show logs on popup modal
   */
  downloadLogs() {
    this.downloadFile('log-files.txt', new Blob([this.conversionLogs.join('\n\n')], {
      type: 'text/plain'
    }));
  }
  /**
   * add file to convert
   * @param file
   */
  addFileToConvert(file) {
    var _this5 = this;
    return (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this5.zoneRef.run(() => {
        const formattedName = _this5.formatFileName(file.name);
        const extension = formattedName.split('.').pop();
        const id = crypto.randomUUID();
        const videoFileData = {
          id,
          file: file,
          inProgress: false,
          type: src_app_types_file__WEBPACK_IMPORTED_MODULE_1__.FileDataType.VIDEO,
          name: `${_this5.ffmpegService.getPlainFileName(formattedName)}_${id}.${extension}`,
          convertProgress: 0,
          targetFormat: 1,
          convertedFileData: new Map(),
          conversionErrors: new Map(),
          supportedFormats: _this5.getSupportedTargetFormats(extension),
          fileFormat: _this5.resolveFileFormatId(extension)
        };
        _this5.fileStore.set(videoFileData.id, videoFileData);
        _this5.fileDisplayList.push(videoFileData);
      });
    })();
  }
  /**
   * resolve file format id
   * @param fileExtension
   * @returns
   */
  resolveFileFormatId(fileExtension) {
    for (const [formatId, ffmpegFormat] of src_environments_ffmpeg_config__WEBPACK_IMPORTED_MODULE_7__.FFMPEG_FORMATS.entries()) {
      if (ffmpegFormat.targetFormat === fileExtension) {
        return formatId;
      }
    }
    return 6; // default for mp4
  }
  /**
   * get supported target formats
   * @returns
   */
  getSupportedTargetFormats(extension) {
    const formats = src_environments_ffmpeg_config__WEBPACK_IMPORTED_MODULE_7__.ELIGIBLE_TARGET_FORMATS.get(extension).map(formatId => {
      return {
        formatId,
        targetFormat: src_environments_ffmpeg_config__WEBPACK_IMPORTED_MODULE_7__.FFMPEG_FORMATS.get(formatId).targetFormat,
        displayName: src_environments_ffmpeg_config__WEBPACK_IMPORTED_MODULE_7__.FFMPEG_FORMATS.get(formatId).displayName
      };
    });
    return formats;
  }
  /**
   * trigger conversion for all videos at once
   */
  convertAllVideos() {
    var _this6 = this;
    return (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      for (let videoFileData of _this6.fileStore.values()) {
        if (!videoFileData.inProgress && !videoFileData.convertedFileData.has(videoFileData.targetFormat)) {
          _this6.convertVideoFile(videoFileData);
        }
      }
    })();
  }
  /**
   * schedule video for conversion
   * @param videoFileData
   */
  convertVideoFile(videoFileData) {
    var _this7 = this;
    return (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this7.zoneRef.run(() => {
        videoFileData.inProgress = true;
        videoFileData.convertProgress = 0;
      });
      _this7.ffmpegService.submitFileToConvert(videoFileData);
    })();
  }
  formatFileName(fileName) {
    return fileName.replace(/ /g, '_');
  }
  downloadVideo(videoFileData) {
    var _this8 = this;
    return (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const fileName = _this8.ffmpegService.getPlainFileName(videoFileData.name);
      yield _this8.downloadFile(`${fileName}_converted.${src_environments_ffmpeg_config__WEBPACK_IMPORTED_MODULE_7__.FFMPEG_FORMATS.get(videoFileData.targetFormat).targetFormat}`, new Blob([videoFileData.convertedFileData.get(videoFileData.targetFormat)], {
        type: _this8.getMimeType(videoFileData.targetFormat)
      }));
    })();
  }
  /**
   * resolve mimeType for downloading the file
   * @param targetFormat
   * @returns
   */
  getMimeType(targetFormat) {
    const targetFormatName = src_environments_ffmpeg_config__WEBPACK_IMPORTED_MODULE_7__.FFMPEG_FORMATS.get(targetFormat).targetFormat;
    if (targetFormatName === 'mp4' || targetFormatName === 'webm') {
      return `video/${targetFormatName}`;
    }
    return `audio/${targetFormatName}`;
  }
  downloadFile(fileName, fileContent) {
    var _this9 = this;
    return (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const downloadAnchor = _this9.renderer.createElement('a');
      _this9.renderer.setProperty(downloadAnchor, 'href', URL.createObjectURL(fileContent));
      _this9.renderer.setProperty(downloadAnchor, 'download', fileName);
      downloadAnchor.click();
    })();
  }
  /**
   * change video file target format
   * @param fileId identifier of file
   * @param targetFormat
   */
  changeTargetFormat(fileId, targetFormat) {
    const videoFileData = this.fileStore.get(fileId);
    if (videoFileData.targetFormat !== targetFormat) {
      src_app_service_util_logger__WEBPACK_IMPORTED_MODULE_2__.LogUtils.info(`changing target format of file with id: ${fileId} to ${src_environments_ffmpeg_config__WEBPACK_IMPORTED_MODULE_7__.FFMPEG_FORMATS.get(targetFormat)}`);
      this.fileStore.get(fileId).targetFormat = targetFormat;
    }
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
  /**
   * open settings popup form
   * @param videoFileData
   */
  openSettings(videoFileData) {
    this.closeDialog();
    const formattedName = this.formatFileName(videoFileData.file.name);
    const extension = formattedName.split('.').pop();
    const formatOptions = this.getSupportedTargetFormats(extension);
    const context = {
      referenceId: videoFileData.id,
      type: src_app_types_popup_form__WEBPACK_IMPORTED_MODULE_5__.PopupFormType.VIDEO_CONVERT_SETTINGS,
      rows: [{
        elements: [{
          type: src_app_types_popup_form__WEBPACK_IMPORTED_MODULE_5__.PopupFormElementType.DROPDOWN,
          propertyName: 'targetFormat',
          data: {
            options: formatOptions.map(option => {
              return {
                displayName: option.displayName,
                value: option.formatId
              };
            }),
            targetFormat: videoFileData.targetFormat
          }
        }]
      }]
    };
    this.activeDialog = this.dialog.open(src_app_modules_popup_form_popup_form_component__WEBPACK_IMPORTED_MODULE_6__.PopupFormComponent, {
      data: context
    });
    /**
     * subscribe dialog close event
     */
    this.activeDialog.afterClosed().subscribe(this.handleSettingsChange.bind(this));
  }
  /**
   * handle settings change
   * @param data
   */
  handleSettingsChange(data = {}) {
    var _this10 = this;
    return (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      src_app_service_util_logger__WEBPACK_IMPORTED_MODULE_2__.LogUtils.info(`settings dialog closed with data: ${JSON.stringify(data)}`);
      if (Object.keys(data).length > 0) {
        const result = data;
        const videoFileData = _this10.fileStore.get(result.referenceId);
        _this10.zoneRef.run(() => {
          videoFileData.targetFormat = result.data.targetFormat;
        });
      }
    })();
  }
  closeDialog(data = {}) {
    var _this11 = this;
    return (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (_this11.activeDialog) {
        _this11.activeDialog.close(data);
      }
    })();
  }
  selectFiles(event) {
    var _this12 = this;
    return (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      for (const file of event.target.files) {
        yield _this12.addFileToConvert(file);
      }
    })();
  }
  openFileDialog() {
    this.renderer.selectRootElement(this.inputFiles.nativeElement, true).click();
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
   * file drop event handler
   * @param event
   */
  dropHandler(event) {
    var _this13 = this;
    return (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      // Prevent default behavior (Prevent file from being opened)
      event.preventDefault();
      if (event.dataTransfer.items) {
        // Use DataTransferItemList interface to access the file(s)
        [...event.dataTransfer.items].filter(item => item.kind === 'file').map(item => item.getAsFile()).forEach( /*#__PURE__*/function () {
          var _ref = (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (file) {
            return yield _this13.addFileToConvert(file);
          });
          return function (_x) {
            return _ref.apply(this, arguments);
          };
        }());
      } else {
        // Use DataTransfer interface to access the file(s)
        [...event.dataTransfer.files].forEach( /*#__PURE__*/function () {
          var _ref2 = (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (file) {
            return yield _this13.addFileToConvert(file);
          });
          return function (_x2) {
            return _ref2.apply(this, arguments);
          };
        }());
      }
    })();
  }
}
_class = VideoConverterComponent;
_class.ɵfac = function VideoConverterComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_15__.MatDialog), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_11__.Renderer2), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_11__.NgZone), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_angular_cdk_layout__WEBPACK_IMPORTED_MODULE_13__.BreakpointObserver), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](src_app_service_ffmpeg_ffmpeg_service__WEBPACK_IMPORTED_MODULE_9__.FfmpegService), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](src_app_service_platform_metadata_platform_metadata_service__WEBPACK_IMPORTED_MODULE_10__.PlatformMetadataService));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["app-video-converter"]],
  viewQuery: function VideoConverterComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵviewQuery"](_c0, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵloadQuery"]()) && (ctx.inputFiles = _t.first);
    }
  },
  decls: 6,
  vars: 4,
  consts: [[1, "flex-display", "flex-column-flow", "flex-align-center", "flex-gap-medium"], ["type", "file", "multiple", "", 2, "display", "none", 3, "accept", "change"], ["inputFiles", ""], ["class", "flex-display flex-column-flow flex-center flex-align-center file-drop-area file-area-width flex-gap-medium full-width", 3, "drop", "dragover", 4, "ngIf"], ["class", "flex-display flex-row-flow flex-center full-width flex-gap-medium", 3, "ngStyle", 4, "ngIf"], ["class", "flex-display flex-column-flow y-scroll file-drop-area file-area-width file-list-div flex-gap-medium full-width", 4, "ngIf"], [1, "flex-display", "flex-column-flow", "flex-center", "flex-align-center", "file-drop-area", "file-area-width", "flex-gap-medium", "full-width", 3, "drop", "dragover"], [2, "transform", "scale(2)"], [1, "header-font", 2, "font-size", "large"], ["mat-stroked-button", "", "color", "primary", "matTooltip", "select video to convert", 3, "click"], [1, "flex-display", "flex-row-flow", "flex-center", "full-width", "flex-gap-medium", 3, "ngStyle"], ["mat-stroked-button", "", "color", "accent", "matTooltip", "select videos to convert", 3, "click"], ["mat-stroked-button", "", "color", "accent", "matTooltip", "convert all videos", 3, "click"], [1, "flex-display", "flex-column-flow", "y-scroll", "file-drop-area", "file-area-width", "file-list-div", "flex-gap-medium", "full-width"], ["style", "\n        border: 1px solid lightgrey;\n        margin-left: 10px;\n        margin-right: 10px;\n      ", 4, "ngFor", "ngForOf"], [2, "border", "1px solid lightgrey", "margin-left", "10px", "margin-right", "10px"], [1, "flex-display", "flex-row-flow", "flex-align-center", "flex-gap-large", 2, "margin", "10px"], ["svgIcon", "video-convert-icon", "class", "app-icon pointer-cursor", "style", "margin-left: 10px", 4, "ngIf"], [1, "flex-display", "flex-column-flow", "header-font", "file-name-div"], [1, "bold-text"], [1, "bold-text", "header-font", 2, "color", "#3f51b5"], ["class", "bold-text", "style", "color: red", 4, "ngIf"], ["class", "bold-text", 4, "ngIf"], [1, "flex-full-height"], [1, "flex-display", "flex-row-flow", "flex-align-center", "flex-center", "flex-gap-medium"], ["diameter", "32", 4, "ngIf"], ["diameter", "32", "mode", "determinate", 3, "value", 4, "ngIf"], ["appearance", "outline", "color", "primary", "style", "margin-bottom: -1.25em", 4, "ngIf"], ["svgIcon", "settings-icon", "class", "pointer-cursor", "matTooltip", "change conversion settings", 3, "click", 4, "ngIf"], ["svgIcon", "play-icon", "class", "pointer-cursor", "matTooltip", "convert video file", 3, "click", 4, "ngIf"], ["svgIcon", "download-icon", "class", "pointer-cursor", "matTooltip", "download converted video", 3, "click", 4, "ngIf"], ["class", "pointer-cursor", "color", "warn", "matTooltip", "only limited video formats can be converted", 4, "ngIf"], ["svgIcon", "video-convert-icon", 1, "app-icon", "pointer-cursor", 2, "margin-left", "10px"], [1, "bold-text", 2, "color", "red"], ["diameter", "32"], ["diameter", "32", "mode", "determinate", 3, "value"], ["appearance", "outline", "color", "primary", 2, "margin-bottom", "-1.25em"], ["disableRipple", "", 3, "value", "valueChange"], [3, "value", 4, "ngFor", "ngForOf"], [3, "value"], ["svgIcon", "settings-icon", "matTooltip", "change conversion settings", 1, "pointer-cursor", 3, "click"], ["svgIcon", "play-icon", "matTooltip", "convert video file", 1, "pointer-cursor", 3, "click"], ["svgIcon", "download-icon", "matTooltip", "download converted video", 1, "pointer-cursor", 3, "click"], ["color", "warn", "matTooltip", "only limited video formats can be converted", 1, "pointer-cursor"]],
  template: function VideoConverterComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div", 0)(1, "input", 1, 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("change", function VideoConverterComponent_Template_input_change_1_listener($event) {
        return ctx.selectFiles($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](3, VideoConverterComponent_div_3_Template, 11, 0, "div", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](4, VideoConverterComponent_div_4_Template, 9, 3, "div", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](5, VideoConverterComponent_div_5_Template, 2, 1, "div", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("accept", ctx.validVideoFormats);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx.fileDisplayList.length === 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx.fileDisplayList.length > 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx.fileDisplayList.length > 0);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_16__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_16__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_16__.NgStyle, _angular_material_icon__WEBPACK_IMPORTED_MODULE_17__.MatIcon, _angular_material_button__WEBPACK_IMPORTED_MODULE_18__.MatButton, _angular_material_card__WEBPACK_IMPORTED_MODULE_19__.MatCard, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_20__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_20__.MatLabel, _angular_material_select__WEBPACK_IMPORTED_MODULE_21__.MatSelect, _angular_material_core__WEBPACK_IMPORTED_MODULE_22__.MatOption, _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_23__.MatTooltip, _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_24__.MatProgressSpinner],
  styles: [".file-drop-area[_ngcontent-%COMP%] {\n  border: 1px solid lightgrey;\n  border-radius: 10px;\n}\n\n.file-area-width[_ngcontent-%COMP%] {\n  padding-top: 30px;\n  padding-bottom: 30px;\n}\n\n.file-list-div[_ngcontent-%COMP%] {\n  max-height: 400px;\n}\n\n@media screen and (max-width: 735px) {\n  .file-list-div[_ngcontent-%COMP%] {\n    max-height: 300px;\n  }\n  .file-name-div[_ngcontent-%COMP%] {\n    width: 60%;\n    overflow-x: hidden;\n  }\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvbW9kdWxlcy92aWRlby1jb252ZXJ0ZXIvdmlkZW8tY29udmVydGVyLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsMkJBQUE7RUFDQSxtQkFBQTtBQUNGOztBQUVBO0VBQ0UsaUJBQUE7RUFDQSxvQkFBQTtBQUNGOztBQUVBO0VBQ0UsaUJBQUE7QUFDRjs7QUFFQTtFQUNFO0lBQ0UsaUJBQUE7RUFDRjtFQUNBO0lBQ0UsVUFBQTtJQUNBLGtCQUFBO0VBQ0Y7QUFDRiIsInNvdXJjZXNDb250ZW50IjpbIi5maWxlLWRyb3AtYXJlYSB7XG4gIGJvcmRlcjogMXB4IHNvbGlkIGxpZ2h0Z3JleTtcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcbn1cblxuLmZpbGUtYXJlYS13aWR0aCB7XG4gIHBhZGRpbmctdG9wOiAzMHB4O1xuICBwYWRkaW5nLWJvdHRvbTogMzBweDtcbn1cblxuLmZpbGUtbGlzdC1kaXYge1xuICBtYXgtaGVpZ2h0OiA0MDBweDtcbn1cblxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogNzM1cHgpIHtcbiAgLmZpbGUtbGlzdC1kaXYge1xuICAgIG1heC1oZWlnaHQ6IDMwMHB4O1xuICB9XG4gIC5maWxlLW5hbWUtZGl2IHtcbiAgICB3aWR0aDogNjAlO1xuICAgIG92ZXJmbG93LXg6IGhpZGRlbjtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ }),

/***/ 4533:
/*!*******************************************************************!*\
  !*** ./src/app/modules/video-converter/video-converter.module.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   VideoConverterModule: () => (/* binding */ VideoConverterModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _video_converter_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./video-converter-routing.module */ 6608);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/button */ 895);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/icon */ 6515);
/* harmony import */ var _video_converter_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./video-converter.component */ 4734);
/* harmony import */ var _angular_cdk_layout__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/cdk/layout */ 9743);
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/card */ 8497);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/dialog */ 7401);
/* harmony import */ var _angular_material_slider__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/slider */ 549);
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/tooltip */ 702);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/select */ 6355);
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/progress-spinner */ 3910);
/* harmony import */ var _popup_form_popup_form_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../popup-form/popup-form.module */ 3707);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 1699);
var _class;














class VideoConverterModule {}
_class = VideoConverterModule;
_class.ɵfac = function VideoConverterModule_Factory(t) {
  return new (t || _class)();
};
_class.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({
  type: _class
});
_class.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule, _video_converter_routing_module__WEBPACK_IMPORTED_MODULE_0__.VideoConverterRoutingModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__.MatIconModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_6__.MatButtonModule, _angular_material_card__WEBPACK_IMPORTED_MODULE_7__.MatCardModule, _angular_material_select__WEBPACK_IMPORTED_MODULE_8__.MatSelectModule, _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_9__.MatTooltipModule, _angular_cdk_layout__WEBPACK_IMPORTED_MODULE_10__.LayoutModule, _angular_material_slider__WEBPACK_IMPORTED_MODULE_11__.MatSliderModule, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_12__.MatDialogModule, _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_13__.MatProgressSpinnerModule, _popup_form_popup_form_module__WEBPACK_IMPORTED_MODULE_2__.PopupFormModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](VideoConverterModule, {
    declarations: [_video_converter_component__WEBPACK_IMPORTED_MODULE_1__.VideoConverterComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule, _video_converter_routing_module__WEBPACK_IMPORTED_MODULE_0__.VideoConverterRoutingModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__.MatIconModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_6__.MatButtonModule, _angular_material_card__WEBPACK_IMPORTED_MODULE_7__.MatCardModule, _angular_material_select__WEBPACK_IMPORTED_MODULE_8__.MatSelectModule, _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_9__.MatTooltipModule, _angular_cdk_layout__WEBPACK_IMPORTED_MODULE_10__.LayoutModule, _angular_material_slider__WEBPACK_IMPORTED_MODULE_11__.MatSliderModule, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_12__.MatDialogModule, _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_13__.MatProgressSpinnerModule, _popup_form_popup_form_module__WEBPACK_IMPORTED_MODULE_2__.PopupFormModule]
  });
})();

/***/ }),

/***/ 1456:
/*!**************************************************!*\
  !*** ./src/app/service/ffmpeg/ffmpeg.service.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FfmpegService: () => (/* binding */ FfmpegService)
/* harmony export */ });
/* harmony import */ var _Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 1670);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var src_app_types_ffmpeg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/@types/ffmpeg */ 4654);
/* harmony import */ var src_app_custom_datastructures_QueueStorage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/custom-datastructures/QueueStorage */ 2215);
/* harmony import */ var src_environments_ffmpeg_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/environments/ffmpeg-config */ 8023);
/* harmony import */ var src_app_service_util_logger__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/service/util/logger */ 4930);
/* harmony import */ var src_app_service_ffmpeg_lib_ffmpeg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/service/ffmpeg/lib/ffmpeg */ 4969);
/* harmony import */ var src_app_service_ffmpeg_lib_util__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/service/ffmpeg/lib/util */ 5601);
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/environments/environment */ 553);

var _class;









class FfmpegService {
  constructor() {
    this.isConverting = false;
    this.currentFile = undefined;
    this.init();
  }
  init() {
    this.fileQueue = new src_app_custom_datastructures_QueueStorage__WEBPACK_IMPORTED_MODULE_2__.QueueStorage();
    this.fileMap = new Map();
    this.progressEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_8__.EventEmitter();
    this.convertEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_8__.EventEmitter();
    this.fileLoadedEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_8__.EventEmitter();
    this.convertLogEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_8__.EventEmitter();
    this.ffmpegStateEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_8__.EventEmitter();
  }
  /**
   * initialise/load ffmpeg wasm binary
   *
   */
  initializeFFMpeg() {
    var _this = this;
    return (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this.ffmpeg = new src_app_service_ffmpeg_lib_ffmpeg__WEBPACK_IMPORTED_MODULE_5__.FFmpeg();
      _this.ffmpeg.on('log', _this.handleLogs.bind(_this));
      _this.ffmpeg.on('progress', _this.handleFFMpegProgress.bind(_this));
      yield _this.ffmpeg.load({
        coreURL: yield (0,src_app_service_ffmpeg_lib_util__WEBPACK_IMPORTED_MODULE_6__.toBlobURL)(`${src_environments_environment__WEBPACK_IMPORTED_MODULE_7__.environment.ffmpegBaseUrl}/ffmpeg-core.js`, 'text/javascript'),
        wasmURL: yield (0,src_app_service_ffmpeg_lib_util__WEBPACK_IMPORTED_MODULE_6__.toBlobURL)(`${src_environments_environment__WEBPACK_IMPORTED_MODULE_7__.environment.ffmpegBaseUrl}/ffmpeg-core.wasm`, 'application/wasm'),
        workerURL: yield (0,src_app_service_ffmpeg_lib_util__WEBPACK_IMPORTED_MODULE_6__.toBlobURL)(`${src_environments_environment__WEBPACK_IMPORTED_MODULE_7__.environment.ffmpegBaseUrl}/ffmpeg-core.worker.js`, 'text/javascript')
      });
    })();
  }
  /**
   * flush ffmpeg file system and terminate ffmpeg instance
   */
  flushBuffer() {
    var _this2 = this;
    return (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (_this2.ffmpeg && _this2.ffmpeg.loaded) {
        _this2.ffmpeg.terminate();
      }
    })();
  }
  /**
   * handle conversion logs
   * @param logParams
   */
  handleLogs(logParams) {
    var _this3 = this;
    return (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this3.convertLogEvent.emit({
        ...logParams
      });
    })();
  }
  /**
   * handle file conversion failure
   */
  handleConversionFailure() {
    var _this4 = this;
    return (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      /**
       * emit conversion failed event
       */
      _this4.convertEvent.emit({
        fileId: _this4.currentFile.id,
        type: src_app_types_ffmpeg__WEBPACK_IMPORTED_MODULE_1__.ConvertEventType.FAILED,
        targetFormat: _this4.currentFile.targetFormat
      });
      // free up the buffer memory
      yield _this4.ffmpeg.deleteFile(_this4.currentFile.name);
      _this4.currentFile = undefined;
      _this4.isConverting = false;
      /**
       * if file queue is not empty then schedule next file for conversion
       */
      if (!_this4.fileQueue.isEmpty() && !_this4.isConverting) {
        _this4.isConverting = true;
        const videoFileData = _this4.fileQueue.dequeue();
        _this4.currentFile = videoFileData;
        _this4.convertVideoFile(videoFileData);
      }
    })();
  }
  /**
   * handles file progress
   * @param progressParams
   */
  handleFFMpegProgress(progressParams) {
    var _this5 = this;
    return (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const progress = Number((progressParams.progress * 100).toFixed(2));
      _this5.progressEvent.emit({
        fileId: _this5.currentFile.id,
        progress
      });
      /**
       * this means, that current file is converted completely so reset the context
       */
      if (progress === 100) {
        /**
         * conversion complete event
         */
        _this5.convertEvent.emit({
          fileId: _this5.currentFile.id,
          type: src_app_types_ffmpeg__WEBPACK_IMPORTED_MODULE_1__.ConvertEventType.END,
          fileData: yield _this5.ffmpeg.readFile(_this5.currentFile.targetFileName),
          targetFormat: _this5.currentFile.targetFormat
        });
        // free up the buffer memory
        yield _this5.ffmpeg.deleteFile(_this5.currentFile.targetFileName);
        yield _this5.ffmpeg.deleteFile(_this5.currentFile.name);
        _this5.ffmpeg.terminate();
        _this5.currentFile = undefined;
        _this5.isConverting = false;
        /**
         * if file queue is not empty then schedule next file for conversion
         */
        if (!_this5.fileQueue.isEmpty() && !_this5.isConverting) {
          _this5.isConverting = true;
          const videoFileData = _this5.fileQueue.dequeue();
          _this5.currentFile = videoFileData;
          _this5.convertVideoFile(videoFileData);
        }
      }
    })();
  }
  /**
   * get file name without extension
   * @param fileName
   * @returns
   */
  getPlainFileName(fileName) {
    return fileName.substring(0, fileName.lastIndexOf('.')) || fileName;
  }
  /**
   * build ffmpeg command from specified command type and arguments
   * @param targetFormat
   * @param args
   * @returns
   */
  buildFFMpegCommand(fileFormat, targetFormat, args) {
    let command;
    /**
     * check if the default command has been overridden based on input file format
     *
     * if not then use default command
     */
    if (src_environments_ffmpeg_config__WEBPACK_IMPORTED_MODULE_3__.FFMPEG_COMMANDS.get(targetFormat).has(fileFormat)) {
      command = src_environments_ffmpeg_config__WEBPACK_IMPORTED_MODULE_3__.FFMPEG_COMMANDS.get(targetFormat).get(fileFormat);
    } else {
      command = src_environments_ffmpeg_config__WEBPACK_IMPORTED_MODULE_3__.FFMPEG_COMMANDS.get(targetFormat).get(0);
    }
    for (let i = 0; i < args.length; i++) {
      command = command.split(`{${i}}`).join(args[i]);
    }
    return command.split(' ');
  }
  /**
   * submit file to convert
   * @param videoFileData
   * @param retry
   */
  submitFileToConvert(videoFileData, retry = false) {
    var _this6 = this;
    return (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (!retry && _this6.fileMap.has(videoFileData.id) && _this6.fileMap.get(videoFileData.id) === videoFileData.targetFormat) {
        src_app_service_util_logger__WEBPACK_IMPORTED_MODULE_4__.LogUtils.info(`file has already been submitted`);
        return;
      }
      _this6.fileQueue.enqueue(videoFileData);
      _this6.fileMap.set(videoFileData.id, videoFileData.targetFormat);
      if (!_this6.isConverting) {
        _this6.isConverting = true;
        const nextFile = _this6.fileQueue.dequeue();
        _this6.currentFile = nextFile;
        _this6.convertVideoFile(nextFile);
      }
    })();
  }
  /**
   * convert video file
   * @param videoFileData
   */
  convertVideoFile(videoFileData) {
    var _this7 = this;
    return (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this7.ffmpegStateEvent.emit({
        fileId: videoFileData.id,
        status: 'initializing'
      });
      yield _this7.initializeFFMpeg();
      _this7.ffmpegStateEvent.emit({
        fileId: videoFileData.id,
        status: 'ready'
      });
      /**
       * load file in ffmpeg buffer
       */
      yield _this7.writeFileInFFMpegBuffer(videoFileData);
      /**
       * build converted file name
       */
      videoFileData.targetFileName = `${_this7.getPlainFileName(videoFileData.name)}_converted.${src_environments_ffmpeg_config__WEBPACK_IMPORTED_MODULE_3__.FFMPEG_FORMATS.get(videoFileData.targetFormat).targetFormat}`;
      /**
       * prepare ffmpeg command
       */
      const ffmpegCommand = _this7.buildFFMpegCommand(videoFileData.fileFormat, videoFileData.targetFormat, [videoFileData.name, videoFileData.targetFileName]);
      src_app_service_util_logger__WEBPACK_IMPORTED_MODULE_4__.LogUtils.info(`[FFMPEG Command]: ${ffmpegCommand.join(' ')}`);
      /**
       * initiate video file conversion process by running command
       */
      const result = yield _this7.ffmpeg.exec(ffmpegCommand);
      if (result !== 0) {
        _this7.handleConversionFailure();
      }
    })();
  }
  /**
   * write video file in ffmpeg buffer
   * @param videoFileData
   */
  writeFileInFFMpegBuffer(videoFileData) {
    var _this8 = this;
    return (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      yield _this8.ffmpeg.writeFile(videoFileData.name, yield (0,src_app_service_ffmpeg_lib_util__WEBPACK_IMPORTED_MODULE_6__.fetchFile)(videoFileData.file));
      /**
       * emit file loaded event
       */
      _this8.fileLoadedEvent.emit({
        fileId: videoFileData.id,
        loaded: true
      });
    })();
  }
  /**
   * write video file in ffmpeg buffer
   * @param fileName
   */
  readFileInFFMpegBuffer(fileName) {
    var _this9 = this;
    return (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      return yield _this9.ffmpeg.readFile(fileName);
    })();
  }
}
_class = FfmpegService;
_class.ɵfac = function FfmpegService_Factory(t) {
  return new (t || _class)();
};
_class.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineInjectable"]({
  token: _class,
  factory: _class.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 4760:
/*!******************************************************!*\
  !*** ./src/app/service/ffmpeg/lib/ffmpeg/classes.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FFmpeg: () => (/* binding */ FFmpeg)
/* harmony export */ });
/* harmony import */ var _Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_classPrivateFieldInitSpec_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/classPrivateFieldInitSpec.js */ 4482);
/* harmony import */ var _Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_classPrivateFieldGet_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/classPrivateFieldGet.js */ 8758);
/* harmony import */ var _Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_classPrivateFieldSet_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/classPrivateFieldSet.js */ 692);
/* harmony import */ var _const__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./const */ 9312);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils */ 1947);
/* harmony import */ var _errors__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./errors */ 900);
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/environments/environment */ 553);







/**
 * Provides APIs to interact with ffmpeg web worker.
 *
 * @example
 * ```ts
 * const ffmpeg = new FFmpeg();
 * ```
 */
var _worker = /*#__PURE__*/new WeakMap();
var _resolves = /*#__PURE__*/new WeakMap();
var _rejects = /*#__PURE__*/new WeakMap();
var _logEventCallbacks = /*#__PURE__*/new WeakMap();
var _progressEventCallbacks = /*#__PURE__*/new WeakMap();
var _registerHandlers = /*#__PURE__*/new WeakMap();
var _send = /*#__PURE__*/new WeakMap();
class FFmpeg {
  constructor() {
    (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_classPrivateFieldInitSpec_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, _worker, {
      writable: true,
      value: void 0
    });
    /**
     * #resolves and #rejects tracks Promise resolves and rejects to
     * be called when we receive message from web worker.
     */
    (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_classPrivateFieldInitSpec_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, _resolves, {
      writable: true,
      value: void 0
    });
    (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_classPrivateFieldInitSpec_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, _rejects, {
      writable: true,
      value: void 0
    });
    (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_classPrivateFieldInitSpec_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, _logEventCallbacks, {
      writable: true,
      value: void 0
    });
    (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_classPrivateFieldInitSpec_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, _progressEventCallbacks, {
      writable: true,
      value: void 0
    });
    /**
     * register worker message event handlers.
     */
    (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_classPrivateFieldInitSpec_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, _registerHandlers, {
      writable: true,
      value: void 0
    });
    /**
     * Generic function to send messages to web worker.
     */
    (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_classPrivateFieldInitSpec_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, _send, {
      writable: true,
      value: void 0
    });
    (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_classPrivateFieldSet_js__WEBPACK_IMPORTED_MODULE_2__["default"])(this, _worker, null);
    /**
     * #resolves and #rejects tracks Promise resolves and rejects to
     * be called when we receive message from web worker.
     */
    (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_classPrivateFieldSet_js__WEBPACK_IMPORTED_MODULE_2__["default"])(this, _resolves, {});
    (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_classPrivateFieldSet_js__WEBPACK_IMPORTED_MODULE_2__["default"])(this, _rejects, {});
    (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_classPrivateFieldSet_js__WEBPACK_IMPORTED_MODULE_2__["default"])(this, _logEventCallbacks, []);
    (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_classPrivateFieldSet_js__WEBPACK_IMPORTED_MODULE_2__["default"])(this, _progressEventCallbacks, []);
    this.loaded = false;
    /**
     * register worker message event handlers.
     */
    (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_classPrivateFieldSet_js__WEBPACK_IMPORTED_MODULE_2__["default"])(this, _registerHandlers, () => {
      if ((0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_classPrivateFieldGet_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, _worker)) {
        (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_classPrivateFieldGet_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, _worker).onmessage = ({
          data: {
            id,
            type,
            data
          }
        }) => {
          switch (type) {
            case _const__WEBPACK_IMPORTED_MODULE_3__.FFMessageType.LOAD:
              this.loaded = true;
              (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_classPrivateFieldGet_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, _resolves)[id](data);
              break;
            case _const__WEBPACK_IMPORTED_MODULE_3__.FFMessageType.EXEC:
            case _const__WEBPACK_IMPORTED_MODULE_3__.FFMessageType.WRITE_FILE:
            case _const__WEBPACK_IMPORTED_MODULE_3__.FFMessageType.READ_FILE:
            case _const__WEBPACK_IMPORTED_MODULE_3__.FFMessageType.DELETE_FILE:
            case _const__WEBPACK_IMPORTED_MODULE_3__.FFMessageType.RENAME:
            case _const__WEBPACK_IMPORTED_MODULE_3__.FFMessageType.CREATE_DIR:
            case _const__WEBPACK_IMPORTED_MODULE_3__.FFMessageType.LIST_DIR:
            case _const__WEBPACK_IMPORTED_MODULE_3__.FFMessageType.DELETE_DIR:
              (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_classPrivateFieldGet_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, _resolves)[id](data);
              break;
            case _const__WEBPACK_IMPORTED_MODULE_3__.FFMessageType.LOG:
              (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_classPrivateFieldGet_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, _logEventCallbacks).forEach(f => f(data));
              break;
            case _const__WEBPACK_IMPORTED_MODULE_3__.FFMessageType.PROGRESS:
              (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_classPrivateFieldGet_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, _progressEventCallbacks).forEach(f => f(data));
              break;
            case _const__WEBPACK_IMPORTED_MODULE_3__.FFMessageType.ERROR:
              (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_classPrivateFieldGet_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, _rejects)[id](data);
              break;
          }
          delete (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_classPrivateFieldGet_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, _resolves)[id];
          delete (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_classPrivateFieldGet_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, _rejects)[id];
        };
      }
    });
    /**
     * Generic function to send messages to web worker.
     */
    (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_classPrivateFieldSet_js__WEBPACK_IMPORTED_MODULE_2__["default"])(this, _send, ({
      type,
      data
    }, trans = []) => {
      if (!(0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_classPrivateFieldGet_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, _worker)) {
        return Promise.reject(_errors__WEBPACK_IMPORTED_MODULE_5__.ERROR_NOT_LOADED);
      }
      return new Promise((resolve, reject) => {
        const id = (0,_utils__WEBPACK_IMPORTED_MODULE_4__.getMessageID)();
        (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_classPrivateFieldGet_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, _worker) && (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_classPrivateFieldGet_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, _worker).postMessage({
          id,
          type,
          data
        }, trans);
        (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_classPrivateFieldGet_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, _resolves)[id] = resolve;
        (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_classPrivateFieldGet_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, _rejects)[id] = reject;
      });
    });
    /**
     * Loads ffmpeg-core inside web worker. It is required to call this method first
     * as it initializes WebAssembly and other essential variables.
     *
     * @category FFmpeg
     * @returns `true` if ffmpeg core is loaded for the first time.
     */
    this.load = (config = {}) => {
      if (!(0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_classPrivateFieldGet_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, _worker)) {
        (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_classPrivateFieldSet_js__WEBPACK_IMPORTED_MODULE_2__["default"])(this, _worker, new Worker(`${src_environments_environment__WEBPACK_IMPORTED_MODULE_6__.environment.hostname}/assets/@ffmpeg/worker.js`, {
          type: 'module'
        }));
        (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_classPrivateFieldGet_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, _registerHandlers).call(this);
      }
      return (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_classPrivateFieldGet_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, _send).call(this, {
        type: _const__WEBPACK_IMPORTED_MODULE_3__.FFMessageType.LOAD,
        data: config
      });
    };
    /**
     * Execute ffmpeg command.
     *
     * @remarks
     * To avoid common I/O issues, ["-nostdin", "-y"] are prepended to the args
     * by default.
     *
     * @example
     * ```ts
     * const ffmpeg = new FFmpeg();
     * await ffmpeg.load();
     * await ffmpeg.writeFile("video.avi", ...);
     * // ffmpeg -i video.avi video.mp4
     * await ffmpeg.exec(["-i", "video.avi", "video.mp4"]);
     * const data = ffmpeg.readFile("video.mp4");
     * ```
     *
     * @returns `0` if no error, `!= 0` if timeout (1) or error.
     * @category FFmpeg
     */
    this.exec = ( /** ffmpeg command line args */
    args,
    /**
     * milliseconds to wait before stopping the command execution.
     *
     * @defaultValue -1
     */
    timeout = -1) => (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_classPrivateFieldGet_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, _send).call(this, {
      type: _const__WEBPACK_IMPORTED_MODULE_3__.FFMessageType.EXEC,
      data: {
        args,
        timeout
      }
    });
    /**
     * Terminate all ongoing API calls and terminate web worker.
     * `FFmpeg.load()` must be called again before calling any other APIs.
     *
     * @category FFmpeg
     */
    this.terminate = () => {
      const ids = Object.keys((0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_classPrivateFieldGet_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, _rejects));
      // rejects all incomplete Promises.
      for (const id of ids) {
        (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_classPrivateFieldGet_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, _rejects)[id](_errors__WEBPACK_IMPORTED_MODULE_5__.ERROR_TERMINATED);
        delete (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_classPrivateFieldGet_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, _rejects)[id];
        delete (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_classPrivateFieldGet_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, _resolves)[id];
      }
      if ((0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_classPrivateFieldGet_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, _worker)) {
        (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_classPrivateFieldGet_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, _worker).terminate();
        (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_classPrivateFieldSet_js__WEBPACK_IMPORTED_MODULE_2__["default"])(this, _worker, null);
        this.loaded = false;
      }
    };
    /**
     * Write data to ffmpeg.wasm.
     *
     * @example
     * ```ts
     * const ffmpeg = new FFmpeg();
     * await ffmpeg.load();
     * await ffmpeg.writeFile("video.avi", await fetchFile("../video.avi"));
     * await ffmpeg.writeFile("text.txt", "hello world");
     * ```
     *
     * @category File System
     */
    this.writeFile = (path, data) => {
      const trans = [];
      if (data instanceof Uint8Array) {
        trans.push(data.buffer);
      }
      return (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_classPrivateFieldGet_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, _send).call(this, {
        type: _const__WEBPACK_IMPORTED_MODULE_3__.FFMessageType.WRITE_FILE,
        data: {
          path,
          data
        }
      }, trans);
    };
    /**
     * Read data from ffmpeg.wasm.
     *
     * @example
     * ```ts
     * const ffmpeg = new FFmpeg();
     * await ffmpeg.load();
     * const data = await ffmpeg.readFile("video.mp4");
     * ```
     *
     * @category File System
     */
    this.readFile = (path,
    /**
     * File content encoding, supports two encodings:
     * - utf8: read file as text file, return data in string type.
     * - binary: read file as binary file, return data in Uint8Array type.
     *
     * @defaultValue binary
     */
    encoding = 'binary') => (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_classPrivateFieldGet_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, _send).call(this, {
      type: _const__WEBPACK_IMPORTED_MODULE_3__.FFMessageType.READ_FILE,
      data: {
        path,
        encoding
      }
    });
    /**
     * Delete a file.
     *
     * @category File System
     */
    this.deleteFile = path => (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_classPrivateFieldGet_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, _send).call(this, {
      type: _const__WEBPACK_IMPORTED_MODULE_3__.FFMessageType.DELETE_FILE,
      data: {
        path
      }
    });
    /**
     * Rename a file or directory.
     *
     * @category File System
     */
    this.rename = (oldPath, newPath) => (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_classPrivateFieldGet_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, _send).call(this, {
      type: _const__WEBPACK_IMPORTED_MODULE_3__.FFMessageType.RENAME,
      data: {
        oldPath,
        newPath
      }
    });
    /**
     * Create a directory.
     *
     * @category File System
     */
    this.createDir = path => (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_classPrivateFieldGet_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, _send).call(this, {
      type: _const__WEBPACK_IMPORTED_MODULE_3__.FFMessageType.CREATE_DIR,
      data: {
        path
      }
    });
    /**
     * List directory contents.
     *
     * @category File System
     */
    this.listDir = path => (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_classPrivateFieldGet_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, _send).call(this, {
      type: _const__WEBPACK_IMPORTED_MODULE_3__.FFMessageType.LIST_DIR,
      data: {
        path
      }
    });
    /**
     * Delete an empty directory.
     *
     * @category File System
     */
    this.deleteDir = path => (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_classPrivateFieldGet_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, _send).call(this, {
      type: _const__WEBPACK_IMPORTED_MODULE_3__.FFMessageType.DELETE_DIR,
      data: {
        path
      }
    });
  }
  on(event, callback) {
    if (event === 'log') {
      (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_classPrivateFieldGet_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, _logEventCallbacks).push(callback);
    } else if (event === 'progress') {
      (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_classPrivateFieldGet_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, _progressEventCallbacks).push(callback);
    }
  }
  off(event, callback) {
    if (event === 'log') {
      (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_classPrivateFieldSet_js__WEBPACK_IMPORTED_MODULE_2__["default"])(this, _logEventCallbacks, (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_classPrivateFieldGet_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, _logEventCallbacks).filter(f => f !== callback));
    } else if (event === 'progress') {
      (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_classPrivateFieldSet_js__WEBPACK_IMPORTED_MODULE_2__["default"])(this, _progressEventCallbacks, (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_classPrivateFieldGet_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, _progressEventCallbacks).filter(f => f !== callback));
    }
  }
}

/***/ }),

/***/ 9312:
/*!****************************************************!*\
  !*** ./src/app/service/ffmpeg/lib/ffmpeg/const.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CORE_URL: () => (/* binding */ CORE_URL),
/* harmony export */   CORE_VERSION: () => (/* binding */ CORE_VERSION),
/* harmony export */   FFMessageType: () => (/* binding */ FFMessageType),
/* harmony export */   MIME_TYPE_JAVASCRIPT: () => (/* binding */ MIME_TYPE_JAVASCRIPT),
/* harmony export */   MIME_TYPE_WASM: () => (/* binding */ MIME_TYPE_WASM)
/* harmony export */ });
const MIME_TYPE_JAVASCRIPT = 'text/javascript';
const MIME_TYPE_WASM = 'application/wasm';
const CORE_VERSION = '0.12.1';
const CORE_URL = `https://unpkg.com/@ffmpeg/core@${CORE_VERSION}/dist/umd/ffmpeg-core.js`;
var FFMessageType;
(function (FFMessageType) {
  FFMessageType["LOAD"] = "LOAD";
  FFMessageType["EXEC"] = "EXEC";
  FFMessageType["WRITE_FILE"] = "WRITE_FILE";
  FFMessageType["READ_FILE"] = "READ_FILE";
  FFMessageType["DELETE_FILE"] = "DELETE_FILE";
  FFMessageType["RENAME"] = "RENAME";
  FFMessageType["CREATE_DIR"] = "CREATE_DIR";
  FFMessageType["LIST_DIR"] = "LIST_DIR";
  FFMessageType["DELETE_DIR"] = "DELETE_DIR";
  FFMessageType["ERROR"] = "ERROR";
  FFMessageType["DOWNLOAD"] = "DOWNLOAD";
  FFMessageType["PROGRESS"] = "PROGRESS";
  FFMessageType["LOG"] = "LOG";
})(FFMessageType || (FFMessageType = {}));

/***/ }),

/***/ 900:
/*!*****************************************************!*\
  !*** ./src/app/service/ffmpeg/lib/ffmpeg/errors.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ERROR_IMPORT_FAILURE: () => (/* binding */ ERROR_IMPORT_FAILURE),
/* harmony export */   ERROR_NOT_LOADED: () => (/* binding */ ERROR_NOT_LOADED),
/* harmony export */   ERROR_TERMINATED: () => (/* binding */ ERROR_TERMINATED),
/* harmony export */   ERROR_UNKNOWN_MESSAGE_TYPE: () => (/* binding */ ERROR_UNKNOWN_MESSAGE_TYPE)
/* harmony export */ });
const ERROR_UNKNOWN_MESSAGE_TYPE = new Error('unknown message type');
const ERROR_NOT_LOADED = new Error('ffmpeg is not loaded, call `await ffmpeg.load()` first');
const ERROR_TERMINATED = new Error('called FFmpeg.terminate()');
const ERROR_IMPORT_FAILURE = new Error('failed to import ffmpeg-core.js');

/***/ }),

/***/ 4969:
/*!****************************************************!*\
  !*** ./src/app/service/ffmpeg/lib/ffmpeg/index.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FFmpeg: () => (/* reexport safe */ _classes__WEBPACK_IMPORTED_MODULE_0__.FFmpeg)
/* harmony export */ });
/* harmony import */ var _classes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./classes */ 4760);


/***/ }),

/***/ 1947:
/*!****************************************************!*\
  !*** ./src/app/service/ffmpeg/lib/ffmpeg/utils.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getMessageID: () => (/* binding */ getMessageID)
/* harmony export */ });
/**
 * Generate an unique message ID.
 */
const getMessageID = (() => {
  let messageID = 0;
  return () => messageID++;
})();

/***/ }),

/***/ 7872:
/*!*********************************************************************!*\
  !*** ./src/environments/component-config/video-converter/config.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   componentConfig: () => (/* binding */ componentConfig),
/* harmony export */   descriptionData: () => (/* binding */ descriptionData)
/* harmony export */ });
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/environments/environment */ 553);
/* harmony import */ var src_environments_tools_directory_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/environments/tools-directory-config */ 6636);


const navigationUrl = '/tools/video-converter';
const pageTitle = 'Free Video to Audio Converter: Extract Audio from Videos';
const pageDescription = 'Convert your videos to audio files for free with our online video to audio converter tool. Supports wide range of video formats i.e MP4, MKV, WEBM, AVI, OGM.';
const imageUrl = `${src_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.screenshotsBaseUrl}/video-converter.png`;
const keywords = 'online video to audio converter,extract audio from videos,convert video to audio,convert video to MP3,reduce video file size,free video to audio converter,no download required,supports multiple video formats,high-quality MP3 files,easy to use,choose video format,check audio quality,choose audio format for needs,create podcasts,create audiobooks,listen to audio from videos,mp4 to mp3,mp4 to wav,audio extractor';
const relatedTools = [src_environments_tools_directory_config__WEBPACK_IMPORTED_MODULE_1__.ApplicationIds.SCREEN_RECORDER];
const componentConfig = {
  mainHeading: 'Free Online Video to Audio Converter: Extract Audio from Videos Easily',
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
  icons: [{
    iconName: 'video-convert-icon',
    iconRelativeUrl: 'video-convert.svg'
  }, {
    iconName: 'settings-icon',
    iconRelativeUrl: 'settings.svg'
  }, {
    iconName: 'download-icon',
    iconRelativeUrl: 'download.svg'
  }, {
    iconName: 'play-icon',
    iconRelativeUrl: 'play-icon.svg'
  }],
  relatedTools: relatedTools.map(tool => src_environments_tools_directory_config__WEBPACK_IMPORTED_MODULE_1__.applicationConfig.get(tool))
};
const descriptionData = [{
  heading: 'Why Use an Online Video to Audio Converter?',
  listData: ['To extract the audio from a video. This can be useful for creating podcasts, audiobooks, or simply for listening to the audio from a video without having to watch the video.', 'To convert a video to a different audio format. For example, you might want to convert a video to MP3 format so that you can listen to it on your MP3 player.', 'To reduce the file size of a video. Audio files are typically smaller than video files, so converting a video to audio can help to reduce the file size and make it easier to share or store.']
}, {
  heading: 'Features of Our Online Video to Audio Converter Tool',
  listData: ['Free to use. No need to pay or sign up for an account.', 'No download required. Convert your videos to audio directly from your web browser.', 'Supports multiple video formats. Convert MP4, AVI, MOV, WEBM, and other popular video formats to audio.', 'Converts videos to high-quality MP3 files. Our converter uses advanced algorithms to extract the audio from your videos in high quality.', 'Easy to use. Simply upload your video and click the "Convert" button.']
}, {
  heading: 'How to Use Our Online Video to Audio Converter Tool',
  listData: ['Go to our website and click the "Upload Video" button.', 'Select the video you want to convert to audio.', 'Click the "Convert" button.', 'Download your converted audio file.']
}, {
  heading: 'Tips for Using an Online Video to Audio Converter',
  listData: ['Choose a video that is in a supported format. Our converter supports a wide range of video formats, but it is always best to check to make sure that your video is in a supported format before uploading it.', 'Make sure that your video has a good audio quality. The quality of the converted audio file will depend on the quality of the audio in the original video. If the original video has poor audio quality, the converted audio file will also have poor audio quality.', 'Choose the right audio format for your needs. If you are converting a video to audio to listen to it on your MP3 player, you will want to choose the MP3 audio format. If you are converting a video to audio to create a podcast, you might want to choose the AAC audio format.']
}, {
  blockData: ['Our free online video to audio converter tool is a great way to extract the audio from your videos easily. It is easy to use and supports multiple video formats. With our converter, you can create podcasts, audiobooks, or simply listen to the audio from your videos without having to watch the video.']
}];

/***/ }),

/***/ 8023:
/*!*******************************************!*\
  !*** ./src/environments/ffmpeg-config.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ELIGIBLE_TARGET_FORMATS: () => (/* binding */ ELIGIBLE_TARGET_FORMATS),
/* harmony export */   FFMPEG_COMMANDS: () => (/* binding */ FFMPEG_COMMANDS),
/* harmony export */   FFMPEG_FORMATS: () => (/* binding */ FFMPEG_FORMATS)
/* harmony export */ });
const FFMPEG_FORMATS = new Map([[1, {
  targetFormat: 'mp3',
  displayName: 'MP3 (Audio)'
}], [2, {
  targetFormat: 'ogg',
  displayName: 'OGG (Audio)'
}], [3, {
  targetFormat: 'opus',
  displayName: 'OPUS (Audio)'
}], [4, {
  targetFormat: 'aac',
  displayName: 'AAC (Audio)'
}], [5, {
  targetFormat: 'mp4',
  displayName: 'MP4 x264(Video)'
}], [6, {
  targetFormat: 'mp4',
  displayName: 'MP4 x265(Video)'
}], [7, {
  targetFormat: 'webm',
  displayName: 'WEBM (Video)'
}], [8, {
  targetFormat: 'ogv',
  displayName: 'OGV (Video)'
}], [9, {
  targetFormat: 'mkv',
  displayName: 'MKV (Video)'
}], [10, {
  targetFormat: 'avi',
  displayName: 'AVI (Video)'
}], [11, {
  targetFormat: 'ogm',
  displayName: 'OGM (Video)'
}]]);
const ELIGIBLE_TARGET_FORMATS = new Map(Object.entries({
  mp4: [1, 4],
  webm: [1, 3, 4],
  ogm: [1, 4],
  mkv: [1, 4, 5, 6],
  avi: [1, 3, 4],
  ogv: [1, 2, 3, 4, 5, 6, 7]
}));
const FFMPEG_COMMANDS = new Map([[1, new Map([[0, '-i {0} {1}']])], [2, new Map([[0, '-i {0} {1}']])], [3, new Map([[0, '-i {0} {1}']])], [4, new Map([[0, '-i {0} {1}']])], [5, new Map([[0, '-i {0} -c:v libx264 {1}'], [9, '-i {0} -codec copy {1}']])], [6, new Map([[0, '-i {0} -c:v libx265 {1}'], [9, '-i {0} -codec copy {1}']])], [7, new Map([[0, '-i {0} {1}']])], [8, new Map([[0, '-i {0} {1}']])], [9, new Map([[0, '-i {0} {1}'], [5, '-i {0} -codec copy {1}'], [6, '-i {0} -codec copy {1}']])], [10, new Map([[0, '-i {0} {1}']])], [11, new Map([[0, '-i {0} {1}']])]]);

/***/ }),

/***/ 3108:
/*!*******************************************************!*\
  !*** ./node_modules/@angular/cdk/fesm2022/dialog.mjs ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CdkDialogContainer: () => (/* binding */ CdkDialogContainer),
/* harmony export */   DEFAULT_DIALOG_CONFIG: () => (/* binding */ DEFAULT_DIALOG_CONFIG),
/* harmony export */   DIALOG_DATA: () => (/* binding */ DIALOG_DATA),
/* harmony export */   DIALOG_SCROLL_STRATEGY: () => (/* binding */ DIALOG_SCROLL_STRATEGY),
/* harmony export */   DIALOG_SCROLL_STRATEGY_PROVIDER: () => (/* binding */ DIALOG_SCROLL_STRATEGY_PROVIDER),
/* harmony export */   DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY: () => (/* binding */ DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY),
/* harmony export */   Dialog: () => (/* binding */ Dialog),
/* harmony export */   DialogConfig: () => (/* binding */ DialogConfig),
/* harmony export */   DialogModule: () => (/* binding */ DialogModule),
/* harmony export */   DialogRef: () => (/* binding */ DialogRef),
/* harmony export */   throwDialogContentAlreadyAttachedError: () => (/* binding */ throwDialogContentAlreadyAttachedError)
/* harmony export */ });
/* harmony import */ var _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/cdk/a11y */ 3170);
/* harmony import */ var _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/cdk/overlay */ 2698);
/* harmony import */ var _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/cdk/platform */ 3274);
/* harmony import */ var _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/cdk/portal */ 3517);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/cdk/keycodes */ 554);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 2513);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs */ 3558);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! rxjs */ 4980);
/* harmony import */ var _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/cdk/bidi */ 4565);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs/operators */ 5043);
var _class, _class2, _class3;















/** Configuration for opening a modal dialog. */
function _class_ng_template_0_Template(rf, ctx) {}
class DialogConfig {
  constructor() {
    /** The ARIA role of the dialog element. */
    this.role = 'dialog';
    /** Optional CSS class or classes applied to the overlay panel. */
    this.panelClass = '';
    /** Whether the dialog has a backdrop. */
    this.hasBackdrop = true;
    /** Optional CSS class or classes applied to the overlay backdrop. */
    this.backdropClass = '';
    /** Whether the dialog closes with the escape key or pointer events outside the panel element. */
    this.disableClose = false;
    /** Width of the dialog. */
    this.width = '';
    /** Height of the dialog. */
    this.height = '';
    /** Data being injected into the child component. */
    this.data = null;
    /** ID of the element that describes the dialog. */
    this.ariaDescribedBy = null;
    /** ID of the element that labels the dialog. */
    this.ariaLabelledBy = null;
    /** Dialog label applied via `aria-label` */
    this.ariaLabel = null;
    /** Whether this is a modal dialog. Used to set the `aria-modal` attribute. */
    this.ariaModal = true;
    /**
     * Where the dialog should focus on open.
     * @breaking-change 14.0.0 Remove boolean option from autoFocus. Use string or
     * AutoFocusTarget instead.
     */
    this.autoFocus = 'first-tabbable';
    /**
     * Whether the dialog should restore focus to the previously-focused element upon closing.
     * Has the following behavior based on the type that is passed in:
     * - `boolean` - when true, will return focus to the element that was focused before the dialog
     *    was opened, otherwise won't restore focus at all.
     * - `string` - focus will be restored to the first element that matches the CSS selector.
     * - `HTMLElement` - focus will be restored to the specific element.
     */
    this.restoreFocus = true;
    /**
     * Whether the dialog should close when the user navigates backwards or forwards through browser
     * history. This does not apply to navigation via anchor element unless using URL-hash based
     * routing (`HashLocationStrategy` in the Angular router).
     */
    this.closeOnNavigation = true;
    /**
     * Whether the dialog should close when the dialog service is destroyed. This is useful if
     * another service is wrapping the dialog and is managing the destruction instead.
     */
    this.closeOnDestroy = true;
    /**
     * Whether the dialog should close when the underlying overlay is detached. This is useful if
     * another service is wrapping the dialog and is managing the destruction instead. E.g. an
     * external detachment can happen as a result of a scroll strategy triggering it or when the
     * browser location changes.
     */
    this.closeOnOverlayDetachments = true;
  }
}
function throwDialogContentAlreadyAttachedError() {
  throw Error('Attempting to attach dialog content after content is already attached');
}
/**
 * Internal component that wraps user-provided dialog content.
 * @docs-private
 */
class CdkDialogContainer extends _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_0__.BasePortalOutlet {
  constructor(_elementRef, _focusTrapFactory, _document, _config, _interactivityChecker, _ngZone, _overlayRef, _focusMonitor) {
    super();
    this._elementRef = _elementRef;
    this._focusTrapFactory = _focusTrapFactory;
    this._config = _config;
    this._interactivityChecker = _interactivityChecker;
    this._ngZone = _ngZone;
    this._overlayRef = _overlayRef;
    this._focusMonitor = _focusMonitor;
    /** Element that was focused before the dialog was opened. Save this to restore upon close. */
    this._elementFocusedBeforeDialogWasOpened = null;
    /**
     * Type of interaction that led to the dialog being closed. This is used to determine
     * whether the focus style will be applied when returning focus to its original location
     * after the dialog is closed.
     */
    this._closeInteractionType = null;
    /**
     * Queue of the IDs of the dialog's label element, based on their definition order. The first
     * ID will be used as the `aria-labelledby` value. We use a queue here to handle the case
     * where there are two or more titles in the DOM at a time and the first one is destroyed while
     * the rest are present.
     */
    this._ariaLabelledByQueue = [];
    /**
     * Attaches a DOM portal to the dialog container.
     * @param portal Portal to be attached.
     * @deprecated To be turned into a method.
     * @breaking-change 10.0.0
     */
    this.attachDomPortal = portal => {
      if (this._portalOutlet.hasAttached() && (typeof ngDevMode === 'undefined' || ngDevMode)) {
        throwDialogContentAlreadyAttachedError();
      }
      const result = this._portalOutlet.attachDomPortal(portal);
      this._contentAttached();
      return result;
    };
    this._document = _document;
    if (this._config.ariaLabelledBy) {
      this._ariaLabelledByQueue.push(this._config.ariaLabelledBy);
    }
  }
  _contentAttached() {
    this._initializeFocusTrap();
    this._handleBackdropClicks();
    this._captureInitialFocus();
  }
  /**
   * Can be used by child classes to customize the initial focus
   * capturing behavior (e.g. if it's tied to an animation).
   */
  _captureInitialFocus() {
    this._trapFocus();
  }
  ngOnDestroy() {
    this._restoreFocus();
  }
  /**
   * Attach a ComponentPortal as content to this dialog container.
   * @param portal Portal to be attached as the dialog content.
   */
  attachComponentPortal(portal) {
    if (this._portalOutlet.hasAttached() && (typeof ngDevMode === 'undefined' || ngDevMode)) {
      throwDialogContentAlreadyAttachedError();
    }
    const result = this._portalOutlet.attachComponentPortal(portal);
    this._contentAttached();
    return result;
  }
  /**
   * Attach a TemplatePortal as content to this dialog container.
   * @param portal Portal to be attached as the dialog content.
   */
  attachTemplatePortal(portal) {
    if (this._portalOutlet.hasAttached() && (typeof ngDevMode === 'undefined' || ngDevMode)) {
      throwDialogContentAlreadyAttachedError();
    }
    const result = this._portalOutlet.attachTemplatePortal(portal);
    this._contentAttached();
    return result;
  }
  // TODO(crisbeto): this shouldn't be exposed, but there are internal references to it.
  /** Captures focus if it isn't already inside the dialog. */
  _recaptureFocus() {
    if (!this._containsFocus()) {
      this._trapFocus();
    }
  }
  /**
   * Focuses the provided element. If the element is not focusable, it will add a tabIndex
   * attribute to forcefully focus it. The attribute is removed after focus is moved.
   * @param element The element to focus.
   */
  _forceFocus(element, options) {
    if (!this._interactivityChecker.isFocusable(element)) {
      element.tabIndex = -1;
      // The tabindex attribute should be removed to avoid navigating to that element again
      this._ngZone.runOutsideAngular(() => {
        const callback = () => {
          element.removeEventListener('blur', callback);
          element.removeEventListener('mousedown', callback);
          element.removeAttribute('tabindex');
        };
        element.addEventListener('blur', callback);
        element.addEventListener('mousedown', callback);
      });
    }
    element.focus(options);
  }
  /**
   * Focuses the first element that matches the given selector within the focus trap.
   * @param selector The CSS selector for the element to set focus to.
   */
  _focusByCssSelector(selector, options) {
    let elementToFocus = this._elementRef.nativeElement.querySelector(selector);
    if (elementToFocus) {
      this._forceFocus(elementToFocus, options);
    }
  }
  /**
   * Moves the focus inside the focus trap. When autoFocus is not set to 'dialog', if focus
   * cannot be moved then focus will go to the dialog container.
   */
  _trapFocus() {
    const element = this._elementRef.nativeElement;
    // If were to attempt to focus immediately, then the content of the dialog would not yet be
    // ready in instances where change detection has to run first. To deal with this, we simply
    // wait for the microtask queue to be empty when setting focus when autoFocus isn't set to
    // dialog. If the element inside the dialog can't be focused, then the container is focused
    // so the user can't tab into other elements behind it.
    switch (this._config.autoFocus) {
      case false:
      case 'dialog':
        // Ensure that focus is on the dialog container. It's possible that a different
        // component tried to move focus while the open animation was running. See:
        // https://github.com/angular/components/issues/16215. Note that we only want to do this
        // if the focus isn't inside the dialog already, because it's possible that the consumer
        // turned off `autoFocus` in order to move focus themselves.
        if (!this._containsFocus()) {
          element.focus();
        }
        break;
      case true:
      case 'first-tabbable':
        this._focusTrap.focusInitialElementWhenReady().then(focusedSuccessfully => {
          // If we weren't able to find a focusable element in the dialog, then focus the dialog
          // container instead.
          if (!focusedSuccessfully) {
            this._focusDialogContainer();
          }
        });
        break;
      case 'first-heading':
        this._focusByCssSelector('h1, h2, h3, h4, h5, h6, [role="heading"]');
        break;
      default:
        this._focusByCssSelector(this._config.autoFocus);
        break;
    }
  }
  /** Restores focus to the element that was focused before the dialog opened. */
  _restoreFocus() {
    const focusConfig = this._config.restoreFocus;
    let focusTargetElement = null;
    if (typeof focusConfig === 'string') {
      focusTargetElement = this._document.querySelector(focusConfig);
    } else if (typeof focusConfig === 'boolean') {
      focusTargetElement = focusConfig ? this._elementFocusedBeforeDialogWasOpened : null;
    } else if (focusConfig) {
      focusTargetElement = focusConfig;
    }
    // We need the extra check, because IE can set the `activeElement` to null in some cases.
    if (this._config.restoreFocus && focusTargetElement && typeof focusTargetElement.focus === 'function') {
      const activeElement = (0,_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_1__._getFocusedElementPierceShadowDom)();
      const element = this._elementRef.nativeElement;
      // Make sure that focus is still inside the dialog or is on the body (usually because a
      // non-focusable element like the backdrop was clicked) before moving it. It's possible that
      // the consumer moved it themselves before the animation was done, in which case we shouldn't
      // do anything.
      if (!activeElement || activeElement === this._document.body || activeElement === element || element.contains(activeElement)) {
        if (this._focusMonitor) {
          this._focusMonitor.focusVia(focusTargetElement, this._closeInteractionType);
          this._closeInteractionType = null;
        } else {
          focusTargetElement.focus();
        }
      }
    }
    if (this._focusTrap) {
      this._focusTrap.destroy();
    }
  }
  /** Focuses the dialog container. */
  _focusDialogContainer() {
    // Note that there is no focus method when rendering on the server.
    if (this._elementRef.nativeElement.focus) {
      this._elementRef.nativeElement.focus();
    }
  }
  /** Returns whether focus is inside the dialog. */
  _containsFocus() {
    const element = this._elementRef.nativeElement;
    const activeElement = (0,_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_1__._getFocusedElementPierceShadowDom)();
    return element === activeElement || element.contains(activeElement);
  }
  /** Sets up the focus trap. */
  _initializeFocusTrap() {
    this._focusTrap = this._focusTrapFactory.create(this._elementRef.nativeElement);
    // Save the previously focused element. This element will be re-focused
    // when the dialog closes.
    if (this._document) {
      this._elementFocusedBeforeDialogWasOpened = (0,_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_1__._getFocusedElementPierceShadowDom)();
    }
  }
  /** Sets up the listener that handles clicks on the dialog backdrop. */
  _handleBackdropClicks() {
    // Clicking on the backdrop will move focus out of dialog.
    // Recapture it if closing via the backdrop is disabled.
    this._overlayRef.backdropClick().subscribe(() => {
      if (this._config.disableClose) {
        this._recaptureFocus();
      }
    });
  }
}
_class = CdkDialogContainer;
_class.ɵfac = function _class_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_3__.FocusTrapFactory), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_4__.DOCUMENT, 8), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](DialogConfig), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_3__.InteractivityChecker), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgZone), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_5__.OverlayRef), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_3__.FocusMonitor));
};
_class.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["cdk-dialog-container"]],
  viewQuery: function _class_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵviewQuery"](_angular_cdk_portal__WEBPACK_IMPORTED_MODULE_0__.CdkPortalOutlet, 7);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵloadQuery"]()) && (ctx._portalOutlet = _t.first);
    }
  },
  hostAttrs: ["tabindex", "-1", 1, "cdk-dialog-container"],
  hostVars: 6,
  hostBindings: function _class_HostBindings(rf, ctx) {
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵattribute"]("id", ctx._config.id || null)("role", ctx._config.role)("aria-modal", ctx._config.ariaModal)("aria-labelledby", ctx._config.ariaLabel ? null : ctx._ariaLabelledByQueue[0])("aria-label", ctx._config.ariaLabel)("aria-describedby", ctx._config.ariaDescribedBy || null);
    }
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵInheritDefinitionFeature"]],
  decls: 1,
  vars: 0,
  consts: [["cdkPortalOutlet", ""]],
  template: function _class_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](0, _class_ng_template_0_Template, 0, 0, "ng-template", 0);
    }
  },
  dependencies: [_angular_cdk_portal__WEBPACK_IMPORTED_MODULE_0__.CdkPortalOutlet],
  styles: [".cdk-dialog-container{display:block;width:100%;height:100%;min-height:inherit;max-height:inherit}"],
  encapsulation: 2
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵsetClassMetadata"](CdkDialogContainer, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_2__.Component,
    args: [{
      selector: 'cdk-dialog-container',
      encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_2__.ViewEncapsulation.None,
      changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_2__.ChangeDetectionStrategy.Default,
      host: {
        'class': 'cdk-dialog-container',
        'tabindex': '-1',
        '[attr.id]': '_config.id || null',
        '[attr.role]': '_config.role',
        '[attr.aria-modal]': '_config.ariaModal',
        '[attr.aria-labelledby]': '_config.ariaLabel ? null : _ariaLabelledByQueue[0]',
        '[attr.aria-label]': '_config.ariaLabel',
        '[attr.aria-describedby]': '_config.ariaDescribedBy || null'
      },
      template: "<ng-template cdkPortalOutlet></ng-template>\n",
      styles: [".cdk-dialog-container{display:block;width:100%;height:100%;min-height:inherit;max-height:inherit}"]
    }]
  }], function () {
    return [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_2__.ElementRef
    }, {
      type: _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_3__.FocusTrapFactory
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_2__.Optional
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_2__.Inject,
        args: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.DOCUMENT]
      }]
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_2__.Inject,
        args: [DialogConfig]
      }]
    }, {
      type: _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_3__.InteractivityChecker
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_2__.NgZone
    }, {
      type: _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_5__.OverlayRef
    }, {
      type: _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_3__.FocusMonitor
    }];
  }, {
    _portalOutlet: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_2__.ViewChild,
      args: [_angular_cdk_portal__WEBPACK_IMPORTED_MODULE_0__.CdkPortalOutlet, {
        static: true
      }]
    }]
  });
})();

/**
 * Reference to a dialog opened via the Dialog service.
 */
class DialogRef {
  constructor(overlayRef, config) {
    this.overlayRef = overlayRef;
    this.config = config;
    /** Emits when the dialog has been closed. */
    this.closed = new rxjs__WEBPACK_IMPORTED_MODULE_6__.Subject();
    this.disableClose = config.disableClose;
    this.backdropClick = overlayRef.backdropClick();
    this.keydownEvents = overlayRef.keydownEvents();
    this.outsidePointerEvents = overlayRef.outsidePointerEvents();
    this.id = config.id; // By the time the dialog is created we are guaranteed to have an ID.
    this.keydownEvents.subscribe(event => {
      if (event.keyCode === _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_7__.ESCAPE && !this.disableClose && !(0,_angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_7__.hasModifierKey)(event)) {
        event.preventDefault();
        this.close(undefined, {
          focusOrigin: 'keyboard'
        });
      }
    });
    this.backdropClick.subscribe(() => {
      if (!this.disableClose) {
        this.close(undefined, {
          focusOrigin: 'mouse'
        });
      }
    });
    this._detachSubscription = overlayRef.detachments().subscribe(() => {
      // Check specifically for `false`, because we want `undefined` to be treated like `true`.
      if (config.closeOnOverlayDetachments !== false) {
        this.close();
      }
    });
  }
  /**
   * Close the dialog.
   * @param result Optional result to return to the dialog opener.
   * @param options Additional options to customize the closing behavior.
   */
  close(result, options) {
    if (this.containerInstance) {
      const closedSubject = this.closed;
      this.containerInstance._closeInteractionType = options?.focusOrigin || 'program';
      // Drop the detach subscription first since it can be triggered by the
      // `dispose` call and override the result of this closing sequence.
      this._detachSubscription.unsubscribe();
      this.overlayRef.dispose();
      closedSubject.next(result);
      closedSubject.complete();
      this.componentInstance = this.containerInstance = null;
    }
  }
  /** Updates the position of the dialog based on the current position strategy. */
  updatePosition() {
    this.overlayRef.updatePosition();
    return this;
  }
  /**
   * Updates the dialog's width and height.
   * @param width New width of the dialog.
   * @param height New height of the dialog.
   */
  updateSize(width = '', height = '') {
    this.overlayRef.updateSize({
      width,
      height
    });
    return this;
  }
  /** Add a CSS class or an array of classes to the overlay pane. */
  addPanelClass(classes) {
    this.overlayRef.addPanelClass(classes);
    return this;
  }
  /** Remove a CSS class or an array of classes from the overlay pane. */
  removePanelClass(classes) {
    this.overlayRef.removePanelClass(classes);
    return this;
  }
}

/** Injection token for the Dialog's ScrollStrategy. */
const DIALOG_SCROLL_STRATEGY = new _angular_core__WEBPACK_IMPORTED_MODULE_2__.InjectionToken('DialogScrollStrategy');
/** Injection token for the Dialog's Data. */
const DIALOG_DATA = new _angular_core__WEBPACK_IMPORTED_MODULE_2__.InjectionToken('DialogData');
/** Injection token that can be used to provide default options for the dialog module. */
const DEFAULT_DIALOG_CONFIG = new _angular_core__WEBPACK_IMPORTED_MODULE_2__.InjectionToken('DefaultDialogConfig');
/** @docs-private */
function DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY(overlay) {
  return () => overlay.scrollStrategies.block();
}
/** @docs-private */
const DIALOG_SCROLL_STRATEGY_PROVIDER = {
  provide: DIALOG_SCROLL_STRATEGY,
  deps: [_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_5__.Overlay],
  useFactory: DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY
};

/** Unique id for the created dialog. */
let uniqueId = 0;
class Dialog {
  /** Keeps track of the currently-open dialogs. */
  get openDialogs() {
    return this._parentDialog ? this._parentDialog.openDialogs : this._openDialogsAtThisLevel;
  }
  /** Stream that emits when a dialog has been opened. */
  get afterOpened() {
    return this._parentDialog ? this._parentDialog.afterOpened : this._afterOpenedAtThisLevel;
  }
  constructor(_overlay, _injector, _defaultOptions, _parentDialog, _overlayContainer, scrollStrategy) {
    this._overlay = _overlay;
    this._injector = _injector;
    this._defaultOptions = _defaultOptions;
    this._parentDialog = _parentDialog;
    this._overlayContainer = _overlayContainer;
    this._openDialogsAtThisLevel = [];
    this._afterAllClosedAtThisLevel = new rxjs__WEBPACK_IMPORTED_MODULE_6__.Subject();
    this._afterOpenedAtThisLevel = new rxjs__WEBPACK_IMPORTED_MODULE_6__.Subject();
    this._ariaHiddenElements = new Map();
    /**
     * Stream that emits when all open dialog have finished closing.
     * Will emit on subscribe if there are no open dialogs to begin with.
     */
    this.afterAllClosed = (0,rxjs__WEBPACK_IMPORTED_MODULE_8__.defer)(() => this.openDialogs.length ? this._getAfterAllClosed() : this._getAfterAllClosed().pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.startWith)(undefined)));
    this._scrollStrategy = scrollStrategy;
  }
  open(componentOrTemplateRef, config) {
    const defaults = this._defaultOptions || new DialogConfig();
    config = {
      ...defaults,
      ...config
    };
    config.id = config.id || `cdk-dialog-${uniqueId++}`;
    if (config.id && this.getDialogById(config.id) && (typeof ngDevMode === 'undefined' || ngDevMode)) {
      throw Error(`Dialog with id "${config.id}" exists already. The dialog id must be unique.`);
    }
    const overlayConfig = this._getOverlayConfig(config);
    const overlayRef = this._overlay.create(overlayConfig);
    const dialogRef = new DialogRef(overlayRef, config);
    const dialogContainer = this._attachContainer(overlayRef, dialogRef, config);
    dialogRef.containerInstance = dialogContainer;
    this._attachDialogContent(componentOrTemplateRef, dialogRef, dialogContainer, config);
    // If this is the first dialog that we're opening, hide all the non-overlay content.
    if (!this.openDialogs.length) {
      this._hideNonDialogContentFromAssistiveTechnology();
    }
    this.openDialogs.push(dialogRef);
    dialogRef.closed.subscribe(() => this._removeOpenDialog(dialogRef, true));
    this.afterOpened.next(dialogRef);
    return dialogRef;
  }
  /**
   * Closes all of the currently-open dialogs.
   */
  closeAll() {
    reverseForEach(this.openDialogs, dialog => dialog.close());
  }
  /**
   * Finds an open dialog by its id.
   * @param id ID to use when looking up the dialog.
   */
  getDialogById(id) {
    return this.openDialogs.find(dialog => dialog.id === id);
  }
  ngOnDestroy() {
    // Make one pass over all the dialogs that need to be untracked, but should not be closed. We
    // want to stop tracking the open dialog even if it hasn't been closed, because the tracking
    // determines when `aria-hidden` is removed from elements outside the dialog.
    reverseForEach(this._openDialogsAtThisLevel, dialog => {
      // Check for `false` specifically since we want `undefined` to be interpreted as `true`.
      if (dialog.config.closeOnDestroy === false) {
        this._removeOpenDialog(dialog, false);
      }
    });
    // Make a second pass and close the remaining dialogs. We do this second pass in order to
    // correctly dispatch the `afterAllClosed` event in case we have a mixed array of dialogs
    // that should be closed and dialogs that should not.
    reverseForEach(this._openDialogsAtThisLevel, dialog => dialog.close());
    this._afterAllClosedAtThisLevel.complete();
    this._afterOpenedAtThisLevel.complete();
    this._openDialogsAtThisLevel = [];
  }
  /**
   * Creates an overlay config from a dialog config.
   * @param config The dialog configuration.
   * @returns The overlay configuration.
   */
  _getOverlayConfig(config) {
    const state = new _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_5__.OverlayConfig({
      positionStrategy: config.positionStrategy || this._overlay.position().global().centerHorizontally().centerVertically(),
      scrollStrategy: config.scrollStrategy || this._scrollStrategy(),
      panelClass: config.panelClass,
      hasBackdrop: config.hasBackdrop,
      direction: config.direction,
      minWidth: config.minWidth,
      minHeight: config.minHeight,
      maxWidth: config.maxWidth,
      maxHeight: config.maxHeight,
      width: config.width,
      height: config.height,
      disposeOnNavigation: config.closeOnNavigation
    });
    if (config.backdropClass) {
      state.backdropClass = config.backdropClass;
    }
    return state;
  }
  /**
   * Attaches a dialog container to a dialog's already-created overlay.
   * @param overlay Reference to the dialog's underlying overlay.
   * @param config The dialog configuration.
   * @returns A promise resolving to a ComponentRef for the attached container.
   */
  _attachContainer(overlay, dialogRef, config) {
    const userInjector = config.injector || config.viewContainerRef?.injector;
    const providers = [{
      provide: DialogConfig,
      useValue: config
    }, {
      provide: DialogRef,
      useValue: dialogRef
    }, {
      provide: _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_5__.OverlayRef,
      useValue: overlay
    }];
    let containerType;
    if (config.container) {
      if (typeof config.container === 'function') {
        containerType = config.container;
      } else {
        containerType = config.container.type;
        providers.push(...config.container.providers(config));
      }
    } else {
      containerType = CdkDialogContainer;
    }
    const containerPortal = new _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_0__.ComponentPortal(containerType, config.viewContainerRef, _angular_core__WEBPACK_IMPORTED_MODULE_2__.Injector.create({
      parent: userInjector || this._injector,
      providers
    }), config.componentFactoryResolver);
    const containerRef = overlay.attach(containerPortal);
    return containerRef.instance;
  }
  /**
   * Attaches the user-provided component to the already-created dialog container.
   * @param componentOrTemplateRef The type of component being loaded into the dialog,
   *     or a TemplateRef to instantiate as the content.
   * @param dialogRef Reference to the dialog being opened.
   * @param dialogContainer Component that is going to wrap the dialog content.
   * @param config Configuration used to open the dialog.
   */
  _attachDialogContent(componentOrTemplateRef, dialogRef, dialogContainer, config) {
    if (componentOrTemplateRef instanceof _angular_core__WEBPACK_IMPORTED_MODULE_2__.TemplateRef) {
      const injector = this._createInjector(config, dialogRef, dialogContainer, undefined);
      let context = {
        $implicit: config.data,
        dialogRef
      };
      if (config.templateContext) {
        context = {
          ...context,
          ...(typeof config.templateContext === 'function' ? config.templateContext() : config.templateContext)
        };
      }
      dialogContainer.attachTemplatePortal(new _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_0__.TemplatePortal(componentOrTemplateRef, null, context, injector));
    } else {
      const injector = this._createInjector(config, dialogRef, dialogContainer, this._injector);
      const contentRef = dialogContainer.attachComponentPortal(new _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_0__.ComponentPortal(componentOrTemplateRef, config.viewContainerRef, injector, config.componentFactoryResolver));
      dialogRef.componentRef = contentRef;
      dialogRef.componentInstance = contentRef.instance;
    }
  }
  /**
   * Creates a custom injector to be used inside the dialog. This allows a component loaded inside
   * of a dialog to close itself and, optionally, to return a value.
   * @param config Config object that is used to construct the dialog.
   * @param dialogRef Reference to the dialog being opened.
   * @param dialogContainer Component that is going to wrap the dialog content.
   * @param fallbackInjector Injector to use as a fallback when a lookup fails in the custom
   * dialog injector, if the user didn't provide a custom one.
   * @returns The custom injector that can be used inside the dialog.
   */
  _createInjector(config, dialogRef, dialogContainer, fallbackInjector) {
    const userInjector = config.injector || config.viewContainerRef?.injector;
    const providers = [{
      provide: DIALOG_DATA,
      useValue: config.data
    }, {
      provide: DialogRef,
      useValue: dialogRef
    }];
    if (config.providers) {
      if (typeof config.providers === 'function') {
        providers.push(...config.providers(dialogRef, config, dialogContainer));
      } else {
        providers.push(...config.providers);
      }
    }
    if (config.direction && (!userInjector || !userInjector.get(_angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_10__.Directionality, null, {
      optional: true
    }))) {
      providers.push({
        provide: _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_10__.Directionality,
        useValue: {
          value: config.direction,
          change: (0,rxjs__WEBPACK_IMPORTED_MODULE_11__.of)()
        }
      });
    }
    return _angular_core__WEBPACK_IMPORTED_MODULE_2__.Injector.create({
      parent: userInjector || fallbackInjector,
      providers
    });
  }
  /**
   * Removes a dialog from the array of open dialogs.
   * @param dialogRef Dialog to be removed.
   * @param emitEvent Whether to emit an event if this is the last dialog.
   */
  _removeOpenDialog(dialogRef, emitEvent) {
    const index = this.openDialogs.indexOf(dialogRef);
    if (index > -1) {
      this.openDialogs.splice(index, 1);
      // If all the dialogs were closed, remove/restore the `aria-hidden`
      // to a the siblings and emit to the `afterAllClosed` stream.
      if (!this.openDialogs.length) {
        this._ariaHiddenElements.forEach((previousValue, element) => {
          if (previousValue) {
            element.setAttribute('aria-hidden', previousValue);
          } else {
            element.removeAttribute('aria-hidden');
          }
        });
        this._ariaHiddenElements.clear();
        if (emitEvent) {
          this._getAfterAllClosed().next();
        }
      }
    }
  }
  /** Hides all of the content that isn't an overlay from assistive technology. */
  _hideNonDialogContentFromAssistiveTechnology() {
    const overlayContainer = this._overlayContainer.getContainerElement();
    // Ensure that the overlay container is attached to the DOM.
    if (overlayContainer.parentElement) {
      const siblings = overlayContainer.parentElement.children;
      for (let i = siblings.length - 1; i > -1; i--) {
        const sibling = siblings[i];
        if (sibling !== overlayContainer && sibling.nodeName !== 'SCRIPT' && sibling.nodeName !== 'STYLE' && !sibling.hasAttribute('aria-live')) {
          this._ariaHiddenElements.set(sibling, sibling.getAttribute('aria-hidden'));
          sibling.setAttribute('aria-hidden', 'true');
        }
      }
    }
  }
  _getAfterAllClosed() {
    const parent = this._parentDialog;
    return parent ? parent._getAfterAllClosed() : this._afterAllClosedAtThisLevel;
  }
}
_class2 = Dialog;
_class2.ɵfac = function _class2_Factory(t) {
  return new (t || _class2)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_5__.Overlay), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__.Injector), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](DEFAULT_DIALOG_CONFIG, 8), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_class2, 12), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_5__.OverlayContainer), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](DIALOG_SCROLL_STRATEGY));
};
_class2.ɵprov = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: _class2,
  factory: _class2.ɵfac
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵsetClassMetadata"](Dialog, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_2__.Injectable
  }], function () {
    return [{
      type: _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_5__.Overlay
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_2__.Injector
    }, {
      type: DialogConfig,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_2__.Optional
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_2__.Inject,
        args: [DEFAULT_DIALOG_CONFIG]
      }]
    }, {
      type: Dialog,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_2__.Optional
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_2__.SkipSelf
      }]
    }, {
      type: _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_5__.OverlayContainer
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_2__.Inject,
        args: [DIALOG_SCROLL_STRATEGY]
      }]
    }];
  }, null);
})();
/**
 * Executes a callback against all elements in an array while iterating in reverse.
 * Useful if the array is being modified as it is being iterated.
 */
function reverseForEach(items, callback) {
  let i = items.length;
  while (i--) {
    callback(items[i]);
  }
}
class DialogModule {}
_class3 = DialogModule;
_class3.ɵfac = function _class3_Factory(t) {
  return new (t || _class3)();
};
_class3.ɵmod = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
  type: _class3
});
_class3.ɵinj = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
  providers: [Dialog, DIALOG_SCROLL_STRATEGY_PROVIDER],
  imports: [_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_5__.OverlayModule, _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_0__.PortalModule, _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_3__.A11yModule,
  // Re-export the PortalModule so that people extending the `CdkDialogContainer`
  // don't have to remember to import it or be faced with an unhelpful error.
  _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_0__.PortalModule]
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵsetClassMetadata"](DialogModule, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule,
    args: [{
      imports: [_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_5__.OverlayModule, _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_0__.PortalModule, _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_3__.A11yModule],
      exports: [
      // Re-export the PortalModule so that people extending the `CdkDialogContainer`
      // don't have to remember to import it or be faced with an unhelpful error.
      _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_0__.PortalModule, CdkDialogContainer],
      declarations: [CdkDialogContainer],
      providers: [Dialog, DIALOG_SCROLL_STRATEGY_PROVIDER]
    }]
  }], null, null);
})();

/**
 * Generated bundle index. Do not edit.
 */



/***/ }),

/***/ 7401:
/*!************************************************************!*\
  !*** ./node_modules/@angular/material/fesm2022/dialog.mjs ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MAT_DIALOG_DATA: () => (/* binding */ MAT_DIALOG_DATA),
/* harmony export */   MAT_DIALOG_DEFAULT_OPTIONS: () => (/* binding */ MAT_DIALOG_DEFAULT_OPTIONS),
/* harmony export */   MAT_DIALOG_SCROLL_STRATEGY: () => (/* binding */ MAT_DIALOG_SCROLL_STRATEGY),
/* harmony export */   MAT_DIALOG_SCROLL_STRATEGY_FACTORY: () => (/* binding */ MAT_DIALOG_SCROLL_STRATEGY_FACTORY),
/* harmony export */   MAT_DIALOG_SCROLL_STRATEGY_PROVIDER: () => (/* binding */ MAT_DIALOG_SCROLL_STRATEGY_PROVIDER),
/* harmony export */   MAT_DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY: () => (/* binding */ MAT_DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY),
/* harmony export */   MatDialog: () => (/* binding */ MatDialog),
/* harmony export */   MatDialogActions: () => (/* binding */ MatDialogActions),
/* harmony export */   MatDialogClose: () => (/* binding */ MatDialogClose),
/* harmony export */   MatDialogConfig: () => (/* binding */ MatDialogConfig),
/* harmony export */   MatDialogContainer: () => (/* binding */ MatDialogContainer),
/* harmony export */   MatDialogContent: () => (/* binding */ MatDialogContent),
/* harmony export */   MatDialogModule: () => (/* binding */ MatDialogModule),
/* harmony export */   MatDialogRef: () => (/* binding */ MatDialogRef),
/* harmony export */   MatDialogTitle: () => (/* binding */ MatDialogTitle),
/* harmony export */   _MatDialogBase: () => (/* binding */ _MatDialogBase),
/* harmony export */   _MatDialogContainerBase: () => (/* binding */ _MatDialogContainerBase),
/* harmony export */   _closeDialogVia: () => (/* binding */ _closeDialogVia),
/* harmony export */   _defaultParams: () => (/* binding */ _defaultParams),
/* harmony export */   matDialogAnimations: () => (/* binding */ matDialogAnimations)
/* harmony export */ });
/* harmony import */ var _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/cdk/overlay */ 2698);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser/animations */ 1699);
/* harmony import */ var _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/cdk/a11y */ 3170);
/* harmony import */ var _angular_cdk_dialog__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/cdk/dialog */ 3108);
/* harmony import */ var _angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/cdk/coercion */ 5998);
/* harmony import */ var _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/cdk/portal */ 3517);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ 2513);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs */ 7835);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! rxjs */ 3558);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs/operators */ 4520);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs/operators */ 1527);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! rxjs/operators */ 5043);
/* harmony import */ var _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/cdk/keycodes */ 554);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/core */ 5309);
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/animations */ 2501);
var _class, _class2, _class3, _class4, _class5, _class6, _class7, _class8, _class9;


















/**
 * Configuration for opening a modal dialog with the MatDialog service.
 */
function _class2_ng_template_2_Template(rf, ctx) {}
class MatDialogConfig {
  constructor() {
    /** The ARIA role of the dialog element. */
    this.role = 'dialog';
    /** Custom class for the overlay pane. */
    this.panelClass = '';
    /** Whether the dialog has a backdrop. */
    this.hasBackdrop = true;
    /** Custom class for the backdrop. */
    this.backdropClass = '';
    /** Whether the user can use escape or clicking on the backdrop to close the modal. */
    this.disableClose = false;
    /** Width of the dialog. */
    this.width = '';
    /** Height of the dialog. */
    this.height = '';
    /** Max-width of the dialog. If a number is provided, assumes pixel units. Defaults to 80vw. */
    this.maxWidth = '80vw';
    /** Data being injected into the child component. */
    this.data = null;
    /** ID of the element that describes the dialog. */
    this.ariaDescribedBy = null;
    /** ID of the element that labels the dialog. */
    this.ariaLabelledBy = null;
    /** Aria label to assign to the dialog element. */
    this.ariaLabel = null;
    /** Whether this is a modal dialog. Used to set the `aria-modal` attribute. */
    this.ariaModal = true;
    /**
     * Where the dialog should focus on open.
     * @breaking-change 14.0.0 Remove boolean option from autoFocus. Use string or
     * AutoFocusTarget instead.
     */
    this.autoFocus = 'first-tabbable';
    /**
     * Whether the dialog should restore focus to the
     * previously-focused element, after it's closed.
     */
    this.restoreFocus = true;
    /** Whether to wait for the opening animation to finish before trapping focus. */
    this.delayFocusTrap = true;
    /**
     * Whether the dialog should close when the user goes backwards/forwards in history.
     * Note that this usually doesn't include clicking on links (unless the user is using
     * the `HashLocationStrategy`).
     */
    this.closeOnNavigation = true;
    // TODO(jelbourn): add configuration for lifecycle hooks, ARIA labelling.
  }
}

/** Class added when the dialog is open. */
const OPEN_CLASS = 'mdc-dialog--open';
/** Class added while the dialog is opening. */
const OPENING_CLASS = 'mdc-dialog--opening';
/** Class added while the dialog is closing. */
const CLOSING_CLASS = 'mdc-dialog--closing';
/** Duration of the opening animation in milliseconds. */
const OPEN_ANIMATION_DURATION = 150;
/** Duration of the closing animation in milliseconds. */
const CLOSE_ANIMATION_DURATION = 75;
/**
 * Base class for the `MatDialogContainer`. The base class does not implement
 * animations as these are left to implementers of the dialog container.
 */
// tslint:disable-next-line:validate-decorators
class _MatDialogContainerBase extends _angular_cdk_dialog__WEBPACK_IMPORTED_MODULE_0__.CdkDialogContainer {
  constructor(elementRef, focusTrapFactory, _document, dialogConfig, interactivityChecker, ngZone, overlayRef, focusMonitor) {
    super(elementRef, focusTrapFactory, _document, dialogConfig, interactivityChecker, ngZone, overlayRef, focusMonitor);
    /** Emits when an animation state changes. */
    this._animationStateChanged = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
  }
  _captureInitialFocus() {
    if (!this._config.delayFocusTrap) {
      this._trapFocus();
    }
  }
  /**
   * Callback for when the open dialog animation has finished. Intended to
   * be called by sub-classes that use different animation implementations.
   */
  _openAnimationDone(totalTime) {
    if (this._config.delayFocusTrap) {
      this._trapFocus();
    }
    this._animationStateChanged.next({
      state: 'opened',
      totalTime
    });
  }
}
_class = _MatDialogContainerBase;
_class.ɵfac = function _class_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_2__.FocusTrapFactory), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_3__.DOCUMENT, 8), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](MatDialogConfig), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_2__.InteractivityChecker), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.NgZone), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_4__.OverlayRef), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_2__.FocusMonitor));
};
_class.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["ng-component"]],
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵInheritDefinitionFeature"]],
  decls: 0,
  vars: 0,
  template: function _class_Template(rf, ctx) {},
  encapsulation: 2
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](_MatDialogContainerBase, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Component,
    args: [{
      template: ''
    }]
  }], function () {
    return [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.ElementRef
    }, {
      type: _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_2__.FocusTrapFactory
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Optional
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Inject,
        args: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.DOCUMENT]
      }]
    }, {
      type: MatDialogConfig
    }, {
      type: _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_2__.InteractivityChecker
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.NgZone
    }, {
      type: _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_4__.OverlayRef
    }, {
      type: _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_2__.FocusMonitor
    }];
  }, null);
})();
const TRANSITION_DURATION_PROPERTY = '--mat-dialog-transition-duration';
// TODO(mmalerba): Remove this function after animation durations are required
//  to be numbers.
/**
 * Converts a CSS time string to a number in ms. If the given time is already a
 * number, it is assumed to be in ms.
 */
function parseCssTime(time) {
  if (time == null) {
    return null;
  }
  if (typeof time === 'number') {
    return time;
  }
  if (time.endsWith('ms')) {
    return (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_5__.coerceNumberProperty)(time.substring(0, time.length - 2));
  }
  if (time.endsWith('s')) {
    return (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_5__.coerceNumberProperty)(time.substring(0, time.length - 1)) * 1000;
  }
  if (time === '0') {
    return 0;
  }
  return null; // anything else is invalid.
}
/**
 * Internal component that wraps user-provided dialog content in a MDC dialog.
 * @docs-private
 */
class MatDialogContainer extends _MatDialogContainerBase {
  constructor(elementRef, focusTrapFactory, document, dialogConfig, checker, ngZone, overlayRef, _animationMode, focusMonitor) {
    super(elementRef, focusTrapFactory, document, dialogConfig, checker, ngZone, overlayRef, focusMonitor);
    this._animationMode = _animationMode;
    /** Whether animations are enabled. */
    this._animationsEnabled = this._animationMode !== 'NoopAnimations';
    /** Host element of the dialog container component. */
    this._hostElement = this._elementRef.nativeElement;
    /** Duration of the dialog open animation. */
    this._enterAnimationDuration = this._animationsEnabled ? parseCssTime(this._config.enterAnimationDuration) ?? OPEN_ANIMATION_DURATION : 0;
    /** Duration of the dialog close animation. */
    this._exitAnimationDuration = this._animationsEnabled ? parseCssTime(this._config.exitAnimationDuration) ?? CLOSE_ANIMATION_DURATION : 0;
    /** Current timer for dialog animations. */
    this._animationTimer = null;
    /**
     * Completes the dialog open by clearing potential animation classes, trapping
     * focus and emitting an opened event.
     */
    this._finishDialogOpen = () => {
      this._clearAnimationClasses();
      this._openAnimationDone(this._enterAnimationDuration);
    };
    /**
     * Completes the dialog close by clearing potential animation classes, restoring
     * focus and emitting a closed event.
     */
    this._finishDialogClose = () => {
      this._clearAnimationClasses();
      this._animationStateChanged.emit({
        state: 'closed',
        totalTime: this._exitAnimationDuration
      });
    };
  }
  _contentAttached() {
    // Delegate to the original dialog-container initialization (i.e. saving the
    // previous element, setting up the focus trap and moving focus to the container).
    super._contentAttached();
    // Note: Usually we would be able to use the MDC dialog foundation here to handle
    // the dialog animation for us, but there are a few reasons why we just leverage
    // their styles and not use the runtime foundation code:
    //   1. Foundation does not allow us to disable animations.
    //   2. Foundation contains unnecessary features we don't need and aren't
    //      tree-shakeable. e.g. background scrim, keyboard event handlers for ESC button.
    //   3. Foundation uses unnecessary timers for animations to work around limitations
    //      in React's `setState` mechanism.
    //      https://github.com/material-components/material-components-web/pull/3682.
    this._startOpenAnimation();
  }
  ngOnDestroy() {
    super.ngOnDestroy();
    if (this._animationTimer !== null) {
      clearTimeout(this._animationTimer);
    }
  }
  /** Starts the dialog open animation if enabled. */
  _startOpenAnimation() {
    this._animationStateChanged.emit({
      state: 'opening',
      totalTime: this._enterAnimationDuration
    });
    if (this._animationsEnabled) {
      this._hostElement.style.setProperty(TRANSITION_DURATION_PROPERTY, `${this._enterAnimationDuration}ms`);
      // We need to give the `setProperty` call from above some time to be applied.
      // One would expect that the open class is added once the animation finished, but MDC
      // uses the open class in combination with the opening class to start the animation.
      this._requestAnimationFrame(() => this._hostElement.classList.add(OPENING_CLASS, OPEN_CLASS));
      this._waitForAnimationToComplete(this._enterAnimationDuration, this._finishDialogOpen);
    } else {
      this._hostElement.classList.add(OPEN_CLASS);
      // Note: We could immediately finish the dialog opening here with noop animations,
      // but we defer until next tick so that consumers can subscribe to `afterOpened`.
      // Executing this immediately would mean that `afterOpened` emits synchronously
      // on `dialog.open` before the consumer had a change to subscribe to `afterOpened`.
      Promise.resolve().then(() => this._finishDialogOpen());
    }
  }
  /**
   * Starts the exit animation of the dialog if enabled. This method is
   * called by the dialog ref.
   */
  _startExitAnimation() {
    this._animationStateChanged.emit({
      state: 'closing',
      totalTime: this._exitAnimationDuration
    });
    this._hostElement.classList.remove(OPEN_CLASS);
    if (this._animationsEnabled) {
      this._hostElement.style.setProperty(TRANSITION_DURATION_PROPERTY, `${this._exitAnimationDuration}ms`);
      // We need to give the `setProperty` call from above some time to be applied.
      this._requestAnimationFrame(() => this._hostElement.classList.add(CLOSING_CLASS));
      this._waitForAnimationToComplete(this._exitAnimationDuration, this._finishDialogClose);
    } else {
      // This subscription to the `OverlayRef#backdropClick` observable in the `DialogRef` is
      // set up before any user can subscribe to the backdrop click. The subscription triggers
      // the dialog close and this method synchronously. If we'd synchronously emit the `CLOSED`
      // animation state event if animations are disabled, the overlay would be disposed
      // immediately and all other subscriptions to `DialogRef#backdropClick` would be silently
      // skipped. We work around this by waiting with the dialog close until the next tick when
      // all subscriptions have been fired as expected. This is not an ideal solution, but
      // there doesn't seem to be any other good way. Alternatives that have been considered:
      //   1. Deferring `DialogRef.close`. This could be a breaking change due to a new microtask.
      //      Also this issue is specific to the MDC implementation where the dialog could
      //      technically be closed synchronously. In the non-MDC one, Angular animations are used
      //      and closing always takes at least a tick.
      //   2. Ensuring that user subscriptions to `backdropClick`, `keydownEvents` in the dialog
      //      ref are first. This would solve the issue, but has the risk of memory leaks and also
      //      doesn't solve the case where consumers call `DialogRef.close` in their subscriptions.
      // Based on the fact that this is specific to the MDC-based implementation of the dialog
      // animations, the defer is applied here.
      Promise.resolve().then(() => this._finishDialogClose());
    }
  }
  /** Clears all dialog animation classes. */
  _clearAnimationClasses() {
    this._hostElement.classList.remove(OPENING_CLASS, CLOSING_CLASS);
  }
  _waitForAnimationToComplete(duration, callback) {
    if (this._animationTimer !== null) {
      clearTimeout(this._animationTimer);
    }
    // Note that we want this timer to run inside the NgZone, because we want
    // the related events like `afterClosed` to be inside the zone as well.
    this._animationTimer = setTimeout(callback, duration);
  }
  /** Runs a callback in `requestAnimationFrame`, if available. */
  _requestAnimationFrame(callback) {
    this._ngZone.runOutsideAngular(() => {
      if (typeof requestAnimationFrame === 'function') {
        requestAnimationFrame(callback);
      } else {
        callback();
      }
    });
  }
}
_class2 = MatDialogContainer;
_class2.ɵfac = function _class2_Factory(t) {
  return new (t || _class2)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_2__.FocusTrapFactory), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_3__.DOCUMENT, 8), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](MatDialogConfig), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_2__.InteractivityChecker), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.NgZone), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_4__.OverlayRef), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.ANIMATION_MODULE_TYPE, 8), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_2__.FocusMonitor));
};
_class2.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
  type: _class2,
  selectors: [["mat-dialog-container"]],
  hostAttrs: ["tabindex", "-1", 1, "mat-mdc-dialog-container", "mdc-dialog"],
  hostVars: 8,
  hostBindings: function _class2_HostBindings(rf, ctx) {
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵhostProperty"]("id", ctx._config.id);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵattribute"]("aria-modal", ctx._config.ariaModal)("role", ctx._config.role)("aria-labelledby", ctx._config.ariaLabel ? null : ctx._ariaLabelledByQueue[0])("aria-label", ctx._config.ariaLabel)("aria-describedby", ctx._config.ariaDescribedBy || null);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassProp"]("_mat-animation-noopable", !ctx._animationsEnabled);
    }
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵInheritDefinitionFeature"]],
  decls: 3,
  vars: 0,
  consts: [[1, "mdc-dialog__container"], [1, "mat-mdc-dialog-surface", "mdc-dialog__surface"], ["cdkPortalOutlet", ""]],
  template: function _class2_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0)(1, "div", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](2, _class2_ng_template_2_Template, 0, 0, "ng-template", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    }
  },
  dependencies: [_angular_cdk_portal__WEBPACK_IMPORTED_MODULE_6__.CdkPortalOutlet],
  styles: [".mdc-elevation-overlay{position:absolute;border-radius:inherit;pointer-events:none;opacity:var(--mdc-elevation-overlay-opacity, 0);transition:opacity 280ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-dialog,.mdc-dialog__scrim{position:fixed;top:0;left:0;align-items:center;justify-content:center;box-sizing:border-box;width:100%;height:100%}.mdc-dialog{display:none;z-index:var(--mdc-dialog-z-index, 7)}.mdc-dialog .mdc-dialog__content{padding:20px 24px 20px 24px}.mdc-dialog .mdc-dialog__surface{min-width:280px}@media(max-width: 592px){.mdc-dialog .mdc-dialog__surface{max-width:calc(100vw - 32px)}}@media(min-width: 592px){.mdc-dialog .mdc-dialog__surface{max-width:560px}}.mdc-dialog .mdc-dialog__surface{max-height:calc(100% - 32px)}.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface{max-width:none}@media(max-width: 960px){.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface{max-height:560px;width:560px}.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface .mdc-dialog__close{right:-12px}}@media(max-width: 720px)and (max-width: 672px){.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface{width:calc(100vw - 112px)}}@media(max-width: 720px)and (min-width: 672px){.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface{width:560px}}@media(max-width: 720px)and (max-height: 720px){.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface{max-height:calc(100vh - 160px)}}@media(max-width: 720px)and (min-height: 720px){.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface{max-height:560px}}@media(max-width: 720px){.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface .mdc-dialog__close{right:-12px}}@media(max-width: 720px)and (max-height: 400px),(max-width: 600px),(min-width: 720px)and (max-height: 400px){.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface{height:100%;max-height:100vh;max-width:100vw;width:100vw;border-radius:0}.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface .mdc-dialog__close{order:-1;left:-12px}.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface .mdc-dialog__header{padding:0 16px 9px;justify-content:flex-start}.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface .mdc-dialog__title{margin-left:calc(16px - 2 * 12px)}}@media(min-width: 960px){.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface{width:calc(100vw - 400px)}.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface .mdc-dialog__close{right:-12px}}.mdc-dialog.mdc-dialog__scrim--hidden .mdc-dialog__scrim{opacity:0}.mdc-dialog__scrim{opacity:0;z-index:-1}.mdc-dialog__container{display:flex;flex-direction:row;align-items:center;justify-content:space-around;box-sizing:border-box;height:100%;transform:scale(0.8);opacity:0;pointer-events:none}.mdc-dialog__surface{position:relative;display:flex;flex-direction:column;flex-grow:0;flex-shrink:0;box-sizing:border-box;max-width:100%;max-height:100%;pointer-events:auto;overflow-y:auto;outline:0}.mdc-dialog__surface .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}[dir=rtl] .mdc-dialog__surface,.mdc-dialog__surface[dir=rtl]{text-align:right}@media screen and (forced-colors: active),(-ms-high-contrast: active){.mdc-dialog__surface{outline:2px solid windowText}}.mdc-dialog__surface::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:2px solid rgba(0,0,0,0);border-radius:inherit;content:\"\";pointer-events:none}@media screen and (forced-colors: active){.mdc-dialog__surface::before{border-color:CanvasText}}@media screen and (-ms-high-contrast: active),screen and (-ms-high-contrast: none){.mdc-dialog__surface::before{content:none}}.mdc-dialog__title{display:block;margin-top:0;position:relative;flex-shrink:0;box-sizing:border-box;margin:0 0 1px;padding:0 24px 9px}.mdc-dialog__title::before{display:inline-block;width:0;height:40px;content:\"\";vertical-align:0}[dir=rtl] .mdc-dialog__title,.mdc-dialog__title[dir=rtl]{text-align:right}.mdc-dialog--scrollable .mdc-dialog__title{margin-bottom:1px;padding-bottom:15px}.mdc-dialog--fullscreen .mdc-dialog__header{align-items:baseline;border-bottom:1px solid rgba(0,0,0,0);display:inline-flex;justify-content:space-between;padding:0 24px 9px;z-index:1}@media screen and (forced-colors: active){.mdc-dialog--fullscreen .mdc-dialog__header{border-bottom-color:CanvasText}}.mdc-dialog--fullscreen .mdc-dialog__header .mdc-dialog__close{right:-12px}.mdc-dialog--fullscreen .mdc-dialog__title{margin-bottom:0;padding:0;border-bottom:0}.mdc-dialog--fullscreen.mdc-dialog--scrollable .mdc-dialog__title{border-bottom:0;margin-bottom:0}.mdc-dialog--fullscreen .mdc-dialog__close{top:5px}.mdc-dialog--fullscreen.mdc-dialog--scrollable .mdc-dialog__actions{border-top:1px solid rgba(0,0,0,0)}@media screen and (forced-colors: active){.mdc-dialog--fullscreen.mdc-dialog--scrollable .mdc-dialog__actions{border-top-color:CanvasText}}.mdc-dialog--fullscreen--titleless .mdc-dialog__close{margin-top:4px}.mdc-dialog--fullscreen--titleless.mdc-dialog--scrollable .mdc-dialog__close{margin-top:0}.mdc-dialog__content{flex-grow:1;box-sizing:border-box;margin:0;overflow:auto}.mdc-dialog__content>:first-child{margin-top:0}.mdc-dialog__content>:last-child{margin-bottom:0}.mdc-dialog__title+.mdc-dialog__content,.mdc-dialog__header+.mdc-dialog__content{padding-top:0}.mdc-dialog--scrollable .mdc-dialog__title+.mdc-dialog__content{padding-top:8px;padding-bottom:8px}.mdc-dialog__content .mdc-deprecated-list:first-child:last-child{padding:6px 0 0}.mdc-dialog--scrollable .mdc-dialog__content .mdc-deprecated-list:first-child:last-child{padding:0}.mdc-dialog__actions{display:flex;position:relative;flex-shrink:0;flex-wrap:wrap;align-items:center;justify-content:flex-end;box-sizing:border-box;min-height:52px;margin:0;padding:8px;border-top:1px solid rgba(0,0,0,0)}@media screen and (forced-colors: active){.mdc-dialog__actions{border-top-color:CanvasText}}.mdc-dialog--stacked .mdc-dialog__actions{flex-direction:column;align-items:flex-end}.mdc-dialog__button{margin-left:8px;margin-right:0;max-width:100%;text-align:right}[dir=rtl] .mdc-dialog__button,.mdc-dialog__button[dir=rtl]{margin-left:0;margin-right:8px}.mdc-dialog__button:first-child{margin-left:0;margin-right:0}[dir=rtl] .mdc-dialog__button:first-child,.mdc-dialog__button:first-child[dir=rtl]{margin-left:0;margin-right:0}[dir=rtl] .mdc-dialog__button,.mdc-dialog__button[dir=rtl]{text-align:left}.mdc-dialog--stacked .mdc-dialog__button:not(:first-child){margin-top:12px}.mdc-dialog--open,.mdc-dialog--opening,.mdc-dialog--closing{display:flex}.mdc-dialog--opening .mdc-dialog__scrim{transition:opacity 150ms linear}.mdc-dialog--opening .mdc-dialog__container{transition:opacity 75ms linear,transform 150ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-dialog--closing .mdc-dialog__scrim,.mdc-dialog--closing .mdc-dialog__container{transition:opacity 75ms linear}.mdc-dialog--closing .mdc-dialog__container{transform:none}.mdc-dialog--open .mdc-dialog__scrim{opacity:1}.mdc-dialog--open .mdc-dialog__container{transform:none;opacity:1}.mdc-dialog--open.mdc-dialog__surface-scrim--shown .mdc-dialog__surface-scrim{opacity:1}.mdc-dialog--open.mdc-dialog__surface-scrim--hiding .mdc-dialog__surface-scrim{transition:opacity 75ms linear}.mdc-dialog--open.mdc-dialog__surface-scrim--showing .mdc-dialog__surface-scrim{transition:opacity 150ms linear}.mdc-dialog__surface-scrim{display:none;opacity:0;position:absolute;width:100%;height:100%;z-index:1}.mdc-dialog__surface-scrim--shown .mdc-dialog__surface-scrim,.mdc-dialog__surface-scrim--showing .mdc-dialog__surface-scrim,.mdc-dialog__surface-scrim--hiding .mdc-dialog__surface-scrim{display:block}.mdc-dialog-scroll-lock{overflow:hidden}.mdc-dialog--no-content-padding .mdc-dialog__content{padding:0}.mdc-dialog--sheet .mdc-dialog__container .mdc-dialog__close{right:12px;top:9px;position:absolute;z-index:1}.mdc-dialog__scrim--removed{pointer-events:none}.mdc-dialog__scrim--removed .mdc-dialog__scrim,.mdc-dialog__scrim--removed .mdc-dialog__surface-scrim{display:none}.mat-mdc-dialog-content{max-height:65vh}.mat-mdc-dialog-container{position:static;display:block}.mat-mdc-dialog-container,.mat-mdc-dialog-container .mdc-dialog__container,.mat-mdc-dialog-container .mdc-dialog__surface{max-height:inherit;min-height:inherit;min-width:inherit;max-width:inherit}.mat-mdc-dialog-container .mdc-dialog__surface{display:block;width:100%;height:100%}.mat-mdc-dialog-container{--mdc-dialog-container-elevation-shadow:0px 11px 15px -7px rgba(0, 0, 0, 0.2), 0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12);--mdc-dialog-container-shadow-color:#000;--mdc-dialog-container-shape:4px;--mdc-dialog-container-elevation: var(--mdc-dialog-container-elevation-shadow);outline:0}.mat-mdc-dialog-container .mdc-dialog__surface{background-color:var(--mdc-dialog-container-color, white)}.mat-mdc-dialog-container .mdc-dialog__surface{box-shadow:var(--mdc-dialog-container-elevation, 0px 11px 15px -7px rgba(0, 0, 0, 0.2), 0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12))}.mat-mdc-dialog-container .mdc-dialog__surface{border-radius:var(--mdc-dialog-container-shape, 4px)}.mat-mdc-dialog-container .mdc-dialog__title{font-family:var(--mdc-dialog-subhead-font, Roboto, sans-serif);line-height:var(--mdc-dialog-subhead-line-height, 1.5rem);font-size:var(--mdc-dialog-subhead-size, 1rem);font-weight:var(--mdc-dialog-subhead-weight, 400);letter-spacing:var(--mdc-dialog-subhead-tracking, 0.03125em)}.mat-mdc-dialog-container .mdc-dialog__title{color:var(--mdc-dialog-subhead-color, rgba(0, 0, 0, 0.87))}.mat-mdc-dialog-container .mdc-dialog__content{font-family:var(--mdc-dialog-supporting-text-font, Roboto, sans-serif);line-height:var(--mdc-dialog-supporting-text-line-height, 1.5rem);font-size:var(--mdc-dialog-supporting-text-size, 1rem);font-weight:var(--mdc-dialog-supporting-text-weight, 400);letter-spacing:var(--mdc-dialog-supporting-text-tracking, 0.03125em)}.mat-mdc-dialog-container .mdc-dialog__content{color:var(--mdc-dialog-supporting-text-color, rgba(0, 0, 0, 0.6))}.mat-mdc-dialog-container .mdc-dialog__container{transition-duration:var(--mat-dialog-transition-duration, 0ms)}.mat-mdc-dialog-container._mat-animation-noopable .mdc-dialog__container{transition:none}.mat-mdc-dialog-content{display:block}.mat-mdc-dialog-actions{justify-content:start}.mat-mdc-dialog-actions.mat-mdc-dialog-actions-align-center,.mat-mdc-dialog-actions[align=center]{justify-content:center}.mat-mdc-dialog-actions.mat-mdc-dialog-actions-align-end,.mat-mdc-dialog-actions[align=end]{justify-content:flex-end}.mat-mdc-dialog-actions .mat-button-base+.mat-button-base,.mat-mdc-dialog-actions .mat-mdc-button-base+.mat-mdc-button-base{margin-left:8px}[dir=rtl] .mat-mdc-dialog-actions .mat-button-base+.mat-button-base,[dir=rtl] .mat-mdc-dialog-actions .mat-mdc-button-base+.mat-mdc-button-base{margin-left:0;margin-right:8px}"],
  encapsulation: 2
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](MatDialogContainer, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Component,
    args: [{
      selector: 'mat-dialog-container',
      encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_1__.ViewEncapsulation.None,
      changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_1__.ChangeDetectionStrategy.Default,
      host: {
        'class': 'mat-mdc-dialog-container mdc-dialog',
        'tabindex': '-1',
        '[attr.aria-modal]': '_config.ariaModal',
        '[id]': '_config.id',
        '[attr.role]': '_config.role',
        '[attr.aria-labelledby]': '_config.ariaLabel ? null : _ariaLabelledByQueue[0]',
        '[attr.aria-label]': '_config.ariaLabel',
        '[attr.aria-describedby]': '_config.ariaDescribedBy || null',
        '[class._mat-animation-noopable]': '!_animationsEnabled'
      },
      template: "<div class=\"mdc-dialog__container\">\n  <div class=\"mat-mdc-dialog-surface mdc-dialog__surface\">\n    <ng-template cdkPortalOutlet></ng-template>\n  </div>\n</div>\n",
      styles: [".mdc-elevation-overlay{position:absolute;border-radius:inherit;pointer-events:none;opacity:var(--mdc-elevation-overlay-opacity, 0);transition:opacity 280ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-dialog,.mdc-dialog__scrim{position:fixed;top:0;left:0;align-items:center;justify-content:center;box-sizing:border-box;width:100%;height:100%}.mdc-dialog{display:none;z-index:var(--mdc-dialog-z-index, 7)}.mdc-dialog .mdc-dialog__content{padding:20px 24px 20px 24px}.mdc-dialog .mdc-dialog__surface{min-width:280px}@media(max-width: 592px){.mdc-dialog .mdc-dialog__surface{max-width:calc(100vw - 32px)}}@media(min-width: 592px){.mdc-dialog .mdc-dialog__surface{max-width:560px}}.mdc-dialog .mdc-dialog__surface{max-height:calc(100% - 32px)}.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface{max-width:none}@media(max-width: 960px){.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface{max-height:560px;width:560px}.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface .mdc-dialog__close{right:-12px}}@media(max-width: 720px)and (max-width: 672px){.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface{width:calc(100vw - 112px)}}@media(max-width: 720px)and (min-width: 672px){.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface{width:560px}}@media(max-width: 720px)and (max-height: 720px){.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface{max-height:calc(100vh - 160px)}}@media(max-width: 720px)and (min-height: 720px){.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface{max-height:560px}}@media(max-width: 720px){.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface .mdc-dialog__close{right:-12px}}@media(max-width: 720px)and (max-height: 400px),(max-width: 600px),(min-width: 720px)and (max-height: 400px){.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface{height:100%;max-height:100vh;max-width:100vw;width:100vw;border-radius:0}.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface .mdc-dialog__close{order:-1;left:-12px}.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface .mdc-dialog__header{padding:0 16px 9px;justify-content:flex-start}.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface .mdc-dialog__title{margin-left:calc(16px - 2 * 12px)}}@media(min-width: 960px){.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface{width:calc(100vw - 400px)}.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface .mdc-dialog__close{right:-12px}}.mdc-dialog.mdc-dialog__scrim--hidden .mdc-dialog__scrim{opacity:0}.mdc-dialog__scrim{opacity:0;z-index:-1}.mdc-dialog__container{display:flex;flex-direction:row;align-items:center;justify-content:space-around;box-sizing:border-box;height:100%;transform:scale(0.8);opacity:0;pointer-events:none}.mdc-dialog__surface{position:relative;display:flex;flex-direction:column;flex-grow:0;flex-shrink:0;box-sizing:border-box;max-width:100%;max-height:100%;pointer-events:auto;overflow-y:auto;outline:0}.mdc-dialog__surface .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}[dir=rtl] .mdc-dialog__surface,.mdc-dialog__surface[dir=rtl]{text-align:right}@media screen and (forced-colors: active),(-ms-high-contrast: active){.mdc-dialog__surface{outline:2px solid windowText}}.mdc-dialog__surface::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:2px solid rgba(0,0,0,0);border-radius:inherit;content:\"\";pointer-events:none}@media screen and (forced-colors: active){.mdc-dialog__surface::before{border-color:CanvasText}}@media screen and (-ms-high-contrast: active),screen and (-ms-high-contrast: none){.mdc-dialog__surface::before{content:none}}.mdc-dialog__title{display:block;margin-top:0;position:relative;flex-shrink:0;box-sizing:border-box;margin:0 0 1px;padding:0 24px 9px}.mdc-dialog__title::before{display:inline-block;width:0;height:40px;content:\"\";vertical-align:0}[dir=rtl] .mdc-dialog__title,.mdc-dialog__title[dir=rtl]{text-align:right}.mdc-dialog--scrollable .mdc-dialog__title{margin-bottom:1px;padding-bottom:15px}.mdc-dialog--fullscreen .mdc-dialog__header{align-items:baseline;border-bottom:1px solid rgba(0,0,0,0);display:inline-flex;justify-content:space-between;padding:0 24px 9px;z-index:1}@media screen and (forced-colors: active){.mdc-dialog--fullscreen .mdc-dialog__header{border-bottom-color:CanvasText}}.mdc-dialog--fullscreen .mdc-dialog__header .mdc-dialog__close{right:-12px}.mdc-dialog--fullscreen .mdc-dialog__title{margin-bottom:0;padding:0;border-bottom:0}.mdc-dialog--fullscreen.mdc-dialog--scrollable .mdc-dialog__title{border-bottom:0;margin-bottom:0}.mdc-dialog--fullscreen .mdc-dialog__close{top:5px}.mdc-dialog--fullscreen.mdc-dialog--scrollable .mdc-dialog__actions{border-top:1px solid rgba(0,0,0,0)}@media screen and (forced-colors: active){.mdc-dialog--fullscreen.mdc-dialog--scrollable .mdc-dialog__actions{border-top-color:CanvasText}}.mdc-dialog--fullscreen--titleless .mdc-dialog__close{margin-top:4px}.mdc-dialog--fullscreen--titleless.mdc-dialog--scrollable .mdc-dialog__close{margin-top:0}.mdc-dialog__content{flex-grow:1;box-sizing:border-box;margin:0;overflow:auto}.mdc-dialog__content>:first-child{margin-top:0}.mdc-dialog__content>:last-child{margin-bottom:0}.mdc-dialog__title+.mdc-dialog__content,.mdc-dialog__header+.mdc-dialog__content{padding-top:0}.mdc-dialog--scrollable .mdc-dialog__title+.mdc-dialog__content{padding-top:8px;padding-bottom:8px}.mdc-dialog__content .mdc-deprecated-list:first-child:last-child{padding:6px 0 0}.mdc-dialog--scrollable .mdc-dialog__content .mdc-deprecated-list:first-child:last-child{padding:0}.mdc-dialog__actions{display:flex;position:relative;flex-shrink:0;flex-wrap:wrap;align-items:center;justify-content:flex-end;box-sizing:border-box;min-height:52px;margin:0;padding:8px;border-top:1px solid rgba(0,0,0,0)}@media screen and (forced-colors: active){.mdc-dialog__actions{border-top-color:CanvasText}}.mdc-dialog--stacked .mdc-dialog__actions{flex-direction:column;align-items:flex-end}.mdc-dialog__button{margin-left:8px;margin-right:0;max-width:100%;text-align:right}[dir=rtl] .mdc-dialog__button,.mdc-dialog__button[dir=rtl]{margin-left:0;margin-right:8px}.mdc-dialog__button:first-child{margin-left:0;margin-right:0}[dir=rtl] .mdc-dialog__button:first-child,.mdc-dialog__button:first-child[dir=rtl]{margin-left:0;margin-right:0}[dir=rtl] .mdc-dialog__button,.mdc-dialog__button[dir=rtl]{text-align:left}.mdc-dialog--stacked .mdc-dialog__button:not(:first-child){margin-top:12px}.mdc-dialog--open,.mdc-dialog--opening,.mdc-dialog--closing{display:flex}.mdc-dialog--opening .mdc-dialog__scrim{transition:opacity 150ms linear}.mdc-dialog--opening .mdc-dialog__container{transition:opacity 75ms linear,transform 150ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-dialog--closing .mdc-dialog__scrim,.mdc-dialog--closing .mdc-dialog__container{transition:opacity 75ms linear}.mdc-dialog--closing .mdc-dialog__container{transform:none}.mdc-dialog--open .mdc-dialog__scrim{opacity:1}.mdc-dialog--open .mdc-dialog__container{transform:none;opacity:1}.mdc-dialog--open.mdc-dialog__surface-scrim--shown .mdc-dialog__surface-scrim{opacity:1}.mdc-dialog--open.mdc-dialog__surface-scrim--hiding .mdc-dialog__surface-scrim{transition:opacity 75ms linear}.mdc-dialog--open.mdc-dialog__surface-scrim--showing .mdc-dialog__surface-scrim{transition:opacity 150ms linear}.mdc-dialog__surface-scrim{display:none;opacity:0;position:absolute;width:100%;height:100%;z-index:1}.mdc-dialog__surface-scrim--shown .mdc-dialog__surface-scrim,.mdc-dialog__surface-scrim--showing .mdc-dialog__surface-scrim,.mdc-dialog__surface-scrim--hiding .mdc-dialog__surface-scrim{display:block}.mdc-dialog-scroll-lock{overflow:hidden}.mdc-dialog--no-content-padding .mdc-dialog__content{padding:0}.mdc-dialog--sheet .mdc-dialog__container .mdc-dialog__close{right:12px;top:9px;position:absolute;z-index:1}.mdc-dialog__scrim--removed{pointer-events:none}.mdc-dialog__scrim--removed .mdc-dialog__scrim,.mdc-dialog__scrim--removed .mdc-dialog__surface-scrim{display:none}.mat-mdc-dialog-content{max-height:65vh}.mat-mdc-dialog-container{position:static;display:block}.mat-mdc-dialog-container,.mat-mdc-dialog-container .mdc-dialog__container,.mat-mdc-dialog-container .mdc-dialog__surface{max-height:inherit;min-height:inherit;min-width:inherit;max-width:inherit}.mat-mdc-dialog-container .mdc-dialog__surface{display:block;width:100%;height:100%}.mat-mdc-dialog-container{--mdc-dialog-container-elevation-shadow:0px 11px 15px -7px rgba(0, 0, 0, 0.2), 0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12);--mdc-dialog-container-shadow-color:#000;--mdc-dialog-container-shape:4px;--mdc-dialog-container-elevation: var(--mdc-dialog-container-elevation-shadow);outline:0}.mat-mdc-dialog-container .mdc-dialog__surface{background-color:var(--mdc-dialog-container-color, white)}.mat-mdc-dialog-container .mdc-dialog__surface{box-shadow:var(--mdc-dialog-container-elevation, 0px 11px 15px -7px rgba(0, 0, 0, 0.2), 0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12))}.mat-mdc-dialog-container .mdc-dialog__surface{border-radius:var(--mdc-dialog-container-shape, 4px)}.mat-mdc-dialog-container .mdc-dialog__title{font-family:var(--mdc-dialog-subhead-font, Roboto, sans-serif);line-height:var(--mdc-dialog-subhead-line-height, 1.5rem);font-size:var(--mdc-dialog-subhead-size, 1rem);font-weight:var(--mdc-dialog-subhead-weight, 400);letter-spacing:var(--mdc-dialog-subhead-tracking, 0.03125em)}.mat-mdc-dialog-container .mdc-dialog__title{color:var(--mdc-dialog-subhead-color, rgba(0, 0, 0, 0.87))}.mat-mdc-dialog-container .mdc-dialog__content{font-family:var(--mdc-dialog-supporting-text-font, Roboto, sans-serif);line-height:var(--mdc-dialog-supporting-text-line-height, 1.5rem);font-size:var(--mdc-dialog-supporting-text-size, 1rem);font-weight:var(--mdc-dialog-supporting-text-weight, 400);letter-spacing:var(--mdc-dialog-supporting-text-tracking, 0.03125em)}.mat-mdc-dialog-container .mdc-dialog__content{color:var(--mdc-dialog-supporting-text-color, rgba(0, 0, 0, 0.6))}.mat-mdc-dialog-container .mdc-dialog__container{transition-duration:var(--mat-dialog-transition-duration, 0ms)}.mat-mdc-dialog-container._mat-animation-noopable .mdc-dialog__container{transition:none}.mat-mdc-dialog-content{display:block}.mat-mdc-dialog-actions{justify-content:start}.mat-mdc-dialog-actions.mat-mdc-dialog-actions-align-center,.mat-mdc-dialog-actions[align=center]{justify-content:center}.mat-mdc-dialog-actions.mat-mdc-dialog-actions-align-end,.mat-mdc-dialog-actions[align=end]{justify-content:flex-end}.mat-mdc-dialog-actions .mat-button-base+.mat-button-base,.mat-mdc-dialog-actions .mat-mdc-button-base+.mat-mdc-button-base{margin-left:8px}[dir=rtl] .mat-mdc-dialog-actions .mat-button-base+.mat-button-base,[dir=rtl] .mat-mdc-dialog-actions .mat-mdc-button-base+.mat-mdc-button-base{margin-left:0;margin-right:8px}"]
    }]
  }], function () {
    return [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.ElementRef
    }, {
      type: _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_2__.FocusTrapFactory
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Optional
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Inject,
        args: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.DOCUMENT]
      }]
    }, {
      type: MatDialogConfig
    }, {
      type: _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_2__.InteractivityChecker
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.NgZone
    }, {
      type: _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_4__.OverlayRef
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Optional
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Inject,
        args: [_angular_core__WEBPACK_IMPORTED_MODULE_1__.ANIMATION_MODULE_TYPE]
      }]
    }, {
      type: _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_2__.FocusMonitor
    }];
  }, null);
})();

/**
 * Reference to a dialog opened via the MatDialog service.
 */
class MatDialogRef {
  constructor(_ref, config, _containerInstance) {
    this._ref = _ref;
    this._containerInstance = _containerInstance;
    /** Subject for notifying the user that the dialog has finished opening. */
    this._afterOpened = new rxjs__WEBPACK_IMPORTED_MODULE_7__.Subject();
    /** Subject for notifying the user that the dialog has started closing. */
    this._beforeClosed = new rxjs__WEBPACK_IMPORTED_MODULE_7__.Subject();
    /** Current state of the dialog. */
    this._state = 0 /* MatDialogState.OPEN */;
    this.disableClose = config.disableClose;
    this.id = _ref.id;
    // Emit when opening animation completes
    _containerInstance._animationStateChanged.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.filter)(event => event.state === 'opened'), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.take)(1)).subscribe(() => {
      this._afterOpened.next();
      this._afterOpened.complete();
    });
    // Dispose overlay when closing animation is complete
    _containerInstance._animationStateChanged.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.filter)(event => event.state === 'closed'), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.take)(1)).subscribe(() => {
      clearTimeout(this._closeFallbackTimeout);
      this._finishDialogClose();
    });
    _ref.overlayRef.detachments().subscribe(() => {
      this._beforeClosed.next(this._result);
      this._beforeClosed.complete();
      this._finishDialogClose();
    });
    (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.merge)(this.backdropClick(), this.keydownEvents().pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.filter)(event => event.keyCode === _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_11__.ESCAPE && !this.disableClose && !(0,_angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_11__.hasModifierKey)(event)))).subscribe(event => {
      if (!this.disableClose) {
        event.preventDefault();
        _closeDialogVia(this, event.type === 'keydown' ? 'keyboard' : 'mouse');
      }
    });
  }
  /**
   * Close the dialog.
   * @param dialogResult Optional result to return to the dialog opener.
   */
  close(dialogResult) {
    this._result = dialogResult;
    // Transition the backdrop in parallel to the dialog.
    this._containerInstance._animationStateChanged.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.filter)(event => event.state === 'closing'), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.take)(1)).subscribe(event => {
      this._beforeClosed.next(dialogResult);
      this._beforeClosed.complete();
      this._ref.overlayRef.detachBackdrop();
      // The logic that disposes of the overlay depends on the exit animation completing, however
      // it isn't guaranteed if the parent view is destroyed while it's running. Add a fallback
      // timeout which will clean everything up if the animation hasn't fired within the specified
      // amount of time plus 100ms. We don't need to run this outside the NgZone, because for the
      // vast majority of cases the timeout will have been cleared before it has the chance to fire.
      this._closeFallbackTimeout = setTimeout(() => this._finishDialogClose(), event.totalTime + 100);
    });
    this._state = 1 /* MatDialogState.CLOSING */;
    this._containerInstance._startExitAnimation();
  }
  /**
   * Gets an observable that is notified when the dialog is finished opening.
   */
  afterOpened() {
    return this._afterOpened;
  }
  /**
   * Gets an observable that is notified when the dialog is finished closing.
   */
  afterClosed() {
    return this._ref.closed;
  }
  /**
   * Gets an observable that is notified when the dialog has started closing.
   */
  beforeClosed() {
    return this._beforeClosed;
  }
  /**
   * Gets an observable that emits when the overlay's backdrop has been clicked.
   */
  backdropClick() {
    return this._ref.backdropClick;
  }
  /**
   * Gets an observable that emits when keydown events are targeted on the overlay.
   */
  keydownEvents() {
    return this._ref.keydownEvents;
  }
  /**
   * Updates the dialog's position.
   * @param position New dialog position.
   */
  updatePosition(position) {
    let strategy = this._ref.config.positionStrategy;
    if (position && (position.left || position.right)) {
      position.left ? strategy.left(position.left) : strategy.right(position.right);
    } else {
      strategy.centerHorizontally();
    }
    if (position && (position.top || position.bottom)) {
      position.top ? strategy.top(position.top) : strategy.bottom(position.bottom);
    } else {
      strategy.centerVertically();
    }
    this._ref.updatePosition();
    return this;
  }
  /**
   * Updates the dialog's width and height.
   * @param width New width of the dialog.
   * @param height New height of the dialog.
   */
  updateSize(width = '', height = '') {
    this._ref.updateSize(width, height);
    return this;
  }
  /** Add a CSS class or an array of classes to the overlay pane. */
  addPanelClass(classes) {
    this._ref.addPanelClass(classes);
    return this;
  }
  /** Remove a CSS class or an array of classes from the overlay pane. */
  removePanelClass(classes) {
    this._ref.removePanelClass(classes);
    return this;
  }
  /** Gets the current state of the dialog's lifecycle. */
  getState() {
    return this._state;
  }
  /**
   * Finishes the dialog close by updating the state of the dialog
   * and disposing the overlay.
   */
  _finishDialogClose() {
    this._state = 2 /* MatDialogState.CLOSED */;
    this._ref.close(this._result, {
      focusOrigin: this._closeInteractionType
    });
    this.componentInstance = null;
  }
}
/**
 * Closes the dialog with the specified interaction type. This is currently not part of
 * `MatDialogRef` as that would conflict with custom dialog ref mocks provided in tests.
 * More details. See: https://github.com/angular/components/pull/9257#issuecomment-651342226.
 */
// TODO: Move this back into `MatDialogRef` when we provide an official mock dialog ref.
function _closeDialogVia(ref, interactionType, result) {
  ref._closeInteractionType = interactionType;
  return ref.close(result);
}

/** Injection token that can be used to access the data that was passed in to a dialog. */
const MAT_DIALOG_DATA = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.InjectionToken('MatMdcDialogData');
/** Injection token that can be used to specify default dialog options. */
const MAT_DIALOG_DEFAULT_OPTIONS = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.InjectionToken('mat-mdc-dialog-default-options');
/** Injection token that determines the scroll handling while the dialog is open. */
const MAT_DIALOG_SCROLL_STRATEGY = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.InjectionToken('mat-mdc-dialog-scroll-strategy');
/** @docs-private */
function MAT_DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY(overlay) {
  return () => overlay.scrollStrategies.block();
}
/** @docs-private */
const MAT_DIALOG_SCROLL_STRATEGY_PROVIDER = {
  provide: MAT_DIALOG_SCROLL_STRATEGY,
  deps: [_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_4__.Overlay],
  useFactory: MAT_DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY
};
/** @docs-private */
function MAT_DIALOG_SCROLL_STRATEGY_FACTORY(overlay) {
  return () => overlay.scrollStrategies.block();
}
// Counter for unique dialog ids.
let uniqueId = 0;
/**
 * Base class for dialog services. The base dialog service allows
 * for arbitrary dialog refs and dialog container components.
 */
class _MatDialogBase {
  /** Keeps track of the currently-open dialogs. */
  get openDialogs() {
    return this._parentDialog ? this._parentDialog.openDialogs : this._openDialogsAtThisLevel;
  }
  /** Stream that emits when a dialog has been opened. */
  get afterOpened() {
    return this._parentDialog ? this._parentDialog.afterOpened : this._afterOpenedAtThisLevel;
  }
  _getAfterAllClosed() {
    const parent = this._parentDialog;
    return parent ? parent._getAfterAllClosed() : this._afterAllClosedAtThisLevel;
  }
  constructor(_overlay, injector, _defaultOptions, _parentDialog,
  /**
   * @deprecated No longer used. To be removed.
   * @breaking-change 15.0.0
   */
  _overlayContainer, scrollStrategy, _dialogRefConstructor, _dialogContainerType, _dialogDataToken,
  /**
   * @deprecated No longer used. To be removed.
   * @breaking-change 14.0.0
   */
  _animationMode) {
    this._overlay = _overlay;
    this._defaultOptions = _defaultOptions;
    this._parentDialog = _parentDialog;
    this._dialogRefConstructor = _dialogRefConstructor;
    this._dialogContainerType = _dialogContainerType;
    this._dialogDataToken = _dialogDataToken;
    this._openDialogsAtThisLevel = [];
    this._afterAllClosedAtThisLevel = new rxjs__WEBPACK_IMPORTED_MODULE_7__.Subject();
    this._afterOpenedAtThisLevel = new rxjs__WEBPACK_IMPORTED_MODULE_7__.Subject();
    this._idPrefix = 'mat-dialog-';
    this.dialogConfigClass = MatDialogConfig;
    /**
     * Stream that emits when all open dialog have finished closing.
     * Will emit on subscribe if there are no open dialogs to begin with.
     */
    this.afterAllClosed = (0,rxjs__WEBPACK_IMPORTED_MODULE_12__.defer)(() => this.openDialogs.length ? this._getAfterAllClosed() : this._getAfterAllClosed().pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_13__.startWith)(undefined)));
    this._scrollStrategy = scrollStrategy;
    this._dialog = injector.get(_angular_cdk_dialog__WEBPACK_IMPORTED_MODULE_0__.Dialog);
  }
  open(componentOrTemplateRef, config) {
    let dialogRef;
    config = {
      ...(this._defaultOptions || new MatDialogConfig()),
      ...config
    };
    config.id = config.id || `${this._idPrefix}${uniqueId++}`;
    config.scrollStrategy = config.scrollStrategy || this._scrollStrategy();
    const cdkRef = this._dialog.open(componentOrTemplateRef, {
      ...config,
      positionStrategy: this._overlay.position().global().centerHorizontally().centerVertically(),
      // Disable closing since we need to sync it up to the animation ourselves.
      disableClose: true,
      // Disable closing on destroy, because this service cleans up its open dialogs as well.
      // We want to do the cleanup here, rather than the CDK service, because the CDK destroys
      // the dialogs immediately whereas we want it to wait for the animations to finish.
      closeOnDestroy: false,
      // Disable closing on detachments so that we can sync up the animation.
      // The Material dialog ref handles this manually.
      closeOnOverlayDetachments: false,
      container: {
        type: this._dialogContainerType,
        providers: () => [
        // Provide our config as the CDK config as well since it has the same interface as the
        // CDK one, but it contains the actual values passed in by the user for things like
        // `disableClose` which we disable for the CDK dialog since we handle it ourselves.
        {
          provide: this.dialogConfigClass,
          useValue: config
        }, {
          provide: _angular_cdk_dialog__WEBPACK_IMPORTED_MODULE_0__.DialogConfig,
          useValue: config
        }]
      },
      templateContext: () => ({
        dialogRef
      }),
      providers: (ref, cdkConfig, dialogContainer) => {
        dialogRef = new this._dialogRefConstructor(ref, config, dialogContainer);
        dialogRef.updatePosition(config?.position);
        return [{
          provide: this._dialogContainerType,
          useValue: dialogContainer
        }, {
          provide: this._dialogDataToken,
          useValue: cdkConfig.data
        }, {
          provide: this._dialogRefConstructor,
          useValue: dialogRef
        }];
      }
    });
    // This can't be assigned in the `providers` callback, because
    // the instance hasn't been assigned to the CDK ref yet.
    dialogRef.componentRef = cdkRef.componentRef;
    dialogRef.componentInstance = cdkRef.componentInstance;
    this.openDialogs.push(dialogRef);
    this.afterOpened.next(dialogRef);
    dialogRef.afterClosed().subscribe(() => {
      const index = this.openDialogs.indexOf(dialogRef);
      if (index > -1) {
        this.openDialogs.splice(index, 1);
        if (!this.openDialogs.length) {
          this._getAfterAllClosed().next();
        }
      }
    });
    return dialogRef;
  }
  /**
   * Closes all of the currently-open dialogs.
   */
  closeAll() {
    this._closeDialogs(this.openDialogs);
  }
  /**
   * Finds an open dialog by its id.
   * @param id ID to use when looking up the dialog.
   */
  getDialogById(id) {
    return this.openDialogs.find(dialog => dialog.id === id);
  }
  ngOnDestroy() {
    // Only close the dialogs at this level on destroy
    // since the parent service may still be active.
    this._closeDialogs(this._openDialogsAtThisLevel);
    this._afterAllClosedAtThisLevel.complete();
    this._afterOpenedAtThisLevel.complete();
  }
  _closeDialogs(dialogs) {
    let i = dialogs.length;
    while (i--) {
      dialogs[i].close();
    }
  }
}
_class3 = _MatDialogBase;
_class3.ɵfac = function _class3_Factory(t) {
  _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinvalidFactory"]();
};
_class3.ɵprov = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
  token: _class3,
  factory: _class3.ɵfac
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](_MatDialogBase, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Injectable
  }], function () {
    return [{
      type: _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_4__.Overlay
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Injector
    }, {
      type: undefined
    }, {
      type: undefined
    }, {
      type: _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_4__.OverlayContainer
    }, {
      type: undefined
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Type
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Type
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.InjectionToken
    }, {
      type: undefined
    }];
  }, null);
})();
/**
 * Service to open Material Design modal dialogs.
 */
class MatDialog extends _MatDialogBase {
  constructor(overlay, injector,
  /**
   * @deprecated `_location` parameter to be removed.
   * @breaking-change 10.0.0
   */
  location, defaultOptions, scrollStrategy, parentDialog,
  /**
   * @deprecated No longer used. To be removed.
   * @breaking-change 15.0.0
   */
  overlayContainer,
  /**
   * @deprecated No longer used. To be removed.
   * @breaking-change 14.0.0
   */
  animationMode) {
    super(overlay, injector, defaultOptions, parentDialog, overlayContainer, scrollStrategy, MatDialogRef, MatDialogContainer, MAT_DIALOG_DATA, animationMode);
    this._idPrefix = 'mat-mdc-dialog-';
  }
}
_class4 = MatDialog;
_class4.ɵfac = function _class4_Factory(t) {
  return new (t || _class4)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_4__.Overlay), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.Injector), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common__WEBPACK_IMPORTED_MODULE_3__.Location, 8), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](MAT_DIALOG_DEFAULT_OPTIONS, 8), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](MAT_DIALOG_SCROLL_STRATEGY), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_class4, 12), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_4__.OverlayContainer), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.ANIMATION_MODULE_TYPE, 8));
};
_class4.ɵprov = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
  token: _class4,
  factory: _class4.ɵfac
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](MatDialog, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Injectable
  }], function () {
    return [{
      type: _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_4__.Overlay
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Injector
    }, {
      type: _angular_common__WEBPACK_IMPORTED_MODULE_3__.Location,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Optional
      }]
    }, {
      type: MatDialogConfig,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Optional
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Inject,
        args: [MAT_DIALOG_DEFAULT_OPTIONS]
      }]
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Inject,
        args: [MAT_DIALOG_SCROLL_STRATEGY]
      }]
    }, {
      type: MatDialog,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Optional
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.SkipSelf
      }]
    }, {
      type: _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_4__.OverlayContainer
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Optional
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Inject,
        args: [_angular_core__WEBPACK_IMPORTED_MODULE_1__.ANIMATION_MODULE_TYPE]
      }]
    }];
  }, null);
})();

/** Counter used to generate unique IDs for dialog elements. */
let dialogElementUid = 0;
/**
 * Button that will close the current dialog.
 */
class MatDialogClose {
  constructor(
  // The dialog title directive is always used in combination with a `MatDialogRef`.
  // tslint:disable-next-line: lightweight-tokens
  dialogRef, _elementRef, _dialog) {
    this.dialogRef = dialogRef;
    this._elementRef = _elementRef;
    this._dialog = _dialog;
    /** Default to "button" to prevents accidental form submits. */
    this.type = 'button';
  }
  ngOnInit() {
    if (!this.dialogRef) {
      // When this directive is included in a dialog via TemplateRef (rather than being
      // in a Component), the DialogRef isn't available via injection because embedded
      // views cannot be given a custom injector. Instead, we look up the DialogRef by
      // ID. This must occur in `onInit`, as the ID binding for the dialog container won't
      // be resolved at constructor time.
      this.dialogRef = getClosestDialog(this._elementRef, this._dialog.openDialogs);
    }
  }
  ngOnChanges(changes) {
    const proxiedChange = changes['_matDialogClose'] || changes['_matDialogCloseResult'];
    if (proxiedChange) {
      this.dialogResult = proxiedChange.currentValue;
    }
  }
  _onButtonClick(event) {
    // Determinate the focus origin using the click event, because using the FocusMonitor will
    // result in incorrect origins. Most of the time, close buttons will be auto focused in the
    // dialog, and therefore clicking the button won't result in a focus change. This means that
    // the FocusMonitor won't detect any origin change, and will always output `program`.
    _closeDialogVia(this.dialogRef, event.screenX === 0 && event.screenY === 0 ? 'keyboard' : 'mouse', this.dialogResult);
  }
}
_class5 = MatDialogClose;
_class5.ɵfac = function _class5_Factory(t) {
  return new (t || _class5)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](MatDialogRef, 8), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](MatDialog));
};
_class5.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineDirective"]({
  type: _class5,
  selectors: [["", "mat-dialog-close", ""], ["", "matDialogClose", ""]],
  hostVars: 2,
  hostBindings: function _class5_HostBindings(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function _class5_click_HostBindingHandler($event) {
        return ctx._onButtonClick($event);
      });
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵattribute"]("aria-label", ctx.ariaLabel || null)("type", ctx.type);
    }
  },
  inputs: {
    ariaLabel: ["aria-label", "ariaLabel"],
    type: "type",
    dialogResult: ["mat-dialog-close", "dialogResult"],
    _matDialogClose: ["matDialogClose", "_matDialogClose"]
  },
  exportAs: ["matDialogClose"],
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵNgOnChangesFeature"]]
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](MatDialogClose, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Directive,
    args: [{
      selector: '[mat-dialog-close], [matDialogClose]',
      exportAs: 'matDialogClose',
      host: {
        '(click)': '_onButtonClick($event)',
        '[attr.aria-label]': 'ariaLabel || null',
        '[attr.type]': 'type'
      }
    }]
  }], function () {
    return [{
      type: MatDialogRef,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Optional
      }]
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.ElementRef
    }, {
      type: MatDialog
    }];
  }, {
    ariaLabel: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input,
      args: ['aria-label']
    }],
    type: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    dialogResult: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input,
      args: ['mat-dialog-close']
    }],
    _matDialogClose: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input,
      args: ['matDialogClose']
    }]
  });
})();
/**
 * Title of a dialog element. Stays fixed to the top of the dialog when scrolling.
 */
class MatDialogTitle {
  constructor(
  // The dialog title directive is always used in combination with a `MatDialogRef`.
  // tslint:disable-next-line: lightweight-tokens
  _dialogRef, _elementRef, _dialog) {
    this._dialogRef = _dialogRef;
    this._elementRef = _elementRef;
    this._dialog = _dialog;
    this.id = `mat-mdc-dialog-title-${dialogElementUid++}`;
  }
  ngOnInit() {
    if (!this._dialogRef) {
      this._dialogRef = getClosestDialog(this._elementRef, this._dialog.openDialogs);
    }
    if (this._dialogRef) {
      Promise.resolve().then(() => {
        // Note: we null check the queue, because there are some internal
        // tests that are mocking out `MatDialogRef` incorrectly.
        this._dialogRef._containerInstance?._ariaLabelledByQueue?.push(this.id);
      });
    }
  }
  ngOnDestroy() {
    // Note: we null check the queue, because there are some internal
    // tests that are mocking out `MatDialogRef` incorrectly.
    const queue = this._dialogRef?._containerInstance?._ariaLabelledByQueue;
    if (queue) {
      Promise.resolve().then(() => {
        const index = queue.indexOf(this.id);
        if (index > -1) {
          queue.splice(index, 1);
        }
      });
    }
  }
}
_class6 = MatDialogTitle;
_class6.ɵfac = function _class6_Factory(t) {
  return new (t || _class6)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](MatDialogRef, 8), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](MatDialog));
};
_class6.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineDirective"]({
  type: _class6,
  selectors: [["", "mat-dialog-title", ""], ["", "matDialogTitle", ""]],
  hostAttrs: [1, "mat-mdc-dialog-title", "mdc-dialog__title"],
  hostVars: 1,
  hostBindings: function _class6_HostBindings(rf, ctx) {
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵhostProperty"]("id", ctx.id);
    }
  },
  inputs: {
    id: "id"
  },
  exportAs: ["matDialogTitle"]
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](MatDialogTitle, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Directive,
    args: [{
      selector: '[mat-dialog-title], [matDialogTitle]',
      exportAs: 'matDialogTitle',
      host: {
        'class': 'mat-mdc-dialog-title mdc-dialog__title',
        '[id]': 'id'
      }
    }]
  }], function () {
    return [{
      type: MatDialogRef,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Optional
      }]
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.ElementRef
    }, {
      type: MatDialog
    }];
  }, {
    id: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }]
  });
})();
/**
 * Scrollable content container of a dialog.
 */
class MatDialogContent {}
_class7 = MatDialogContent;
_class7.ɵfac = function _class7_Factory(t) {
  return new (t || _class7)();
};
_class7.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineDirective"]({
  type: _class7,
  selectors: [["", "mat-dialog-content", ""], ["mat-dialog-content"], ["", "matDialogContent", ""]],
  hostAttrs: [1, "mat-mdc-dialog-content", "mdc-dialog__content"]
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](MatDialogContent, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Directive,
    args: [{
      selector: `[mat-dialog-content], mat-dialog-content, [matDialogContent]`,
      host: {
        'class': 'mat-mdc-dialog-content mdc-dialog__content'
      }
    }]
  }], null, null);
})();
/**
 * Container for the bottom action buttons in a dialog.
 * Stays fixed to the bottom when scrolling.
 */
class MatDialogActions {
  constructor() {
    /**
     * Horizontal alignment of action buttons.
     */
    this.align = 'start';
  }
}
_class8 = MatDialogActions;
_class8.ɵfac = function _class8_Factory(t) {
  return new (t || _class8)();
};
_class8.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineDirective"]({
  type: _class8,
  selectors: [["", "mat-dialog-actions", ""], ["mat-dialog-actions"], ["", "matDialogActions", ""]],
  hostAttrs: [1, "mat-mdc-dialog-actions", "mdc-dialog__actions"],
  hostVars: 4,
  hostBindings: function _class8_HostBindings(rf, ctx) {
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassProp"]("mat-mdc-dialog-actions-align-center", ctx.align === "center")("mat-mdc-dialog-actions-align-end", ctx.align === "end");
    }
  },
  inputs: {
    align: "align"
  }
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](MatDialogActions, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Directive,
    args: [{
      selector: `[mat-dialog-actions], mat-dialog-actions, [matDialogActions]`,
      host: {
        'class': 'mat-mdc-dialog-actions mdc-dialog__actions',
        '[class.mat-mdc-dialog-actions-align-center]': 'align === "center"',
        '[class.mat-mdc-dialog-actions-align-end]': 'align === "end"'
      }
    }]
  }], null, {
    align: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }]
  });
})();
/**
 * Finds the closest MatDialogRef to an element by looking at the DOM.
 * @param element Element relative to which to look for a dialog.
 * @param openDialogs References to the currently-open dialogs.
 */
function getClosestDialog(element, openDialogs) {
  let parent = element.nativeElement.parentElement;
  while (parent && !parent.classList.contains('mat-mdc-dialog-container')) {
    parent = parent.parentElement;
  }
  return parent ? openDialogs.find(dialog => dialog.id === parent.id) : null;
}
class MatDialogModule {}
_class9 = MatDialogModule;
_class9.ɵfac = function _class9_Factory(t) {
  return new (t || _class9)();
};
_class9.ɵmod = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
  type: _class9
});
_class9.ɵinj = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
  providers: [MatDialog, MAT_DIALOG_SCROLL_STRATEGY_PROVIDER],
  imports: [_angular_cdk_dialog__WEBPACK_IMPORTED_MODULE_0__.DialogModule, _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_4__.OverlayModule, _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_6__.PortalModule, _angular_material_core__WEBPACK_IMPORTED_MODULE_14__.MatCommonModule, _angular_material_core__WEBPACK_IMPORTED_MODULE_14__.MatCommonModule]
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](MatDialogModule, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.NgModule,
    args: [{
      imports: [_angular_cdk_dialog__WEBPACK_IMPORTED_MODULE_0__.DialogModule, _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_4__.OverlayModule, _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_6__.PortalModule, _angular_material_core__WEBPACK_IMPORTED_MODULE_14__.MatCommonModule],
      exports: [MatDialogContainer, MatDialogClose, MatDialogTitle, MatDialogContent, MatDialogActions, _angular_material_core__WEBPACK_IMPORTED_MODULE_14__.MatCommonModule],
      declarations: [MatDialogContainer, MatDialogClose, MatDialogTitle, MatDialogActions, MatDialogContent],
      providers: [MatDialog, MAT_DIALOG_SCROLL_STRATEGY_PROVIDER]
    }]
  }], null, null);
})();

/**
 * Default parameters for the animation for backwards compatibility.
 * @docs-private
 */
const _defaultParams = {
  params: {
    enterAnimationDuration: '150ms',
    exitAnimationDuration: '75ms'
  }
};
/**
 * Animations used by MatDialog.
 * @docs-private
 */
const matDialogAnimations = {
  /** Animation that is applied on the dialog container by default. */
  dialogContainer: (0,_angular_animations__WEBPACK_IMPORTED_MODULE_15__.trigger)('dialogContainer', [
  // Note: The `enter` animation transitions to `transform: none`, because for some reason
  // specifying the transform explicitly, causes IE both to blur the dialog content and
  // decimate the animation performance. Leaving it as `none` solves both issues.
  (0,_angular_animations__WEBPACK_IMPORTED_MODULE_15__.state)('void, exit', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_15__.style)({
    opacity: 0,
    transform: 'scale(0.7)'
  })), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_15__.state)('enter', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_15__.style)({
    transform: 'none'
  })), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_15__.transition)('* => enter', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_15__.group)([(0,_angular_animations__WEBPACK_IMPORTED_MODULE_15__.animate)('{{enterAnimationDuration}} cubic-bezier(0, 0, 0.2, 1)', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_15__.style)({
    transform: 'none',
    opacity: 1
  })), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_15__.query)('@*', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_15__.animateChild)(), {
    optional: true
  })]), _defaultParams), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_15__.transition)('* => void, * => exit', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_15__.group)([(0,_angular_animations__WEBPACK_IMPORTED_MODULE_15__.animate)('{{exitAnimationDuration}} cubic-bezier(0.4, 0.0, 0.2, 1)', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_15__.style)({
    opacity: 0
  })), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_15__.query)('@*', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_15__.animateChild)(), {
    optional: true
  })]), _defaultParams)])
};

/**
 * Generated bundle index. Do not edit.
 */



/***/ }),

/***/ 4328:
/*!******************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/checkPrivateRedeclaration.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _checkPrivateRedeclaration)
/* harmony export */ });
function _checkPrivateRedeclaration(obj, privateCollection) {
  if (privateCollection.has(obj)) {
    throw new TypeError("Cannot initialize the same private elements twice on an object");
  }
}

/***/ }),

/***/ 820:
/*!****************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/classApplyDescriptorGet.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _classApplyDescriptorGet)
/* harmony export */ });
function _classApplyDescriptorGet(receiver, descriptor) {
  if (descriptor.get) {
    return descriptor.get.call(receiver);
  }
  return descriptor.value;
}

/***/ }),

/***/ 3844:
/*!****************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/classApplyDescriptorSet.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _classApplyDescriptorSet)
/* harmony export */ });
function _classApplyDescriptorSet(receiver, descriptor, value) {
  if (descriptor.set) {
    descriptor.set.call(receiver, value);
  } else {
    if (!descriptor.writable) {
      throw new TypeError("attempted to set read only private field");
    }
    descriptor.value = value;
  }
}

/***/ }),

/***/ 7237:
/*!********************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/classExtractFieldDescriptor.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _classExtractFieldDescriptor)
/* harmony export */ });
function _classExtractFieldDescriptor(receiver, privateMap, action) {
  if (!privateMap.has(receiver)) {
    throw new TypeError("attempted to " + action + " private field on non-instance");
  }
  return privateMap.get(receiver);
}

/***/ }),

/***/ 8758:
/*!*************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/classPrivateFieldGet.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _classPrivateFieldGet)
/* harmony export */ });
/* harmony import */ var _classApplyDescriptorGet_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./classApplyDescriptorGet.js */ 820);
/* harmony import */ var _classExtractFieldDescriptor_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./classExtractFieldDescriptor.js */ 7237);


function _classPrivateFieldGet(receiver, privateMap) {
  var descriptor = (0,_classExtractFieldDescriptor_js__WEBPACK_IMPORTED_MODULE_1__["default"])(receiver, privateMap, "get");
  return (0,_classApplyDescriptorGet_js__WEBPACK_IMPORTED_MODULE_0__["default"])(receiver, descriptor);
}

/***/ }),

/***/ 4482:
/*!******************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/classPrivateFieldInitSpec.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _classPrivateFieldInitSpec)
/* harmony export */ });
/* harmony import */ var _checkPrivateRedeclaration_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./checkPrivateRedeclaration.js */ 4328);

function _classPrivateFieldInitSpec(obj, privateMap, value) {
  (0,_checkPrivateRedeclaration_js__WEBPACK_IMPORTED_MODULE_0__["default"])(obj, privateMap);
  privateMap.set(obj, value);
}

/***/ }),

/***/ 692:
/*!*************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/classPrivateFieldSet.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _classPrivateFieldSet)
/* harmony export */ });
/* harmony import */ var _classApplyDescriptorSet_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./classApplyDescriptorSet.js */ 3844);
/* harmony import */ var _classExtractFieldDescriptor_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./classExtractFieldDescriptor.js */ 7237);


function _classPrivateFieldSet(receiver, privateMap, value) {
  var descriptor = (0,_classExtractFieldDescriptor_js__WEBPACK_IMPORTED_MODULE_1__["default"])(receiver, privateMap, "set");
  (0,_classApplyDescriptorSet_js__WEBPACK_IMPORTED_MODULE_0__["default"])(receiver, descriptor, value);
  return value;
}

/***/ })

}]);
//# sourceMappingURL=src_app_modules_video-converter_video-converter_module_ts.809483c6cd6087f2.js.map