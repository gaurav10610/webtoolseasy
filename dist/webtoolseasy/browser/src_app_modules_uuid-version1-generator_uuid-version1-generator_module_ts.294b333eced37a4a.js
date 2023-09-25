"use strict";
(self["webpackChunkwebtoolseasy"] = self["webpackChunkwebtoolseasy"] || []).push([["src_app_modules_uuid-version1-generator_uuid-version1-generator_module_ts"],{

/***/ 4320:
/*!*******************************************************************************************!*\
  !*** ./src/app/modules/uuid-version1-generator/uuid-version1-generator-routing.module.ts ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UuidVersion1GeneratorRoutingModule: () => (/* binding */ UuidVersion1GeneratorRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 7947);
/* harmony import */ var _uuid_version1_generator_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./uuid-version1-generator.component */ 168);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 1699);
var _class;




const routes = [{
  path: '',
  component: _uuid_version1_generator_component__WEBPACK_IMPORTED_MODULE_0__.UuidVersion1GeneratorComponent
}];
class UuidVersion1GeneratorRoutingModule {}
_class = UuidVersion1GeneratorRoutingModule;
_class.ɵfac = function UuidVersion1GeneratorRoutingModule_Factory(t) {
  return new (t || _class)();
};
_class.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
  type: _class
});
_class.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](UuidVersion1GeneratorRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
})();

/***/ }),

/***/ 168:
/*!**************************************************************************************!*\
  !*** ./src/app/modules/uuid-version1-generator/uuid-version1-generator.component.ts ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UuidVersion1GeneratorComponent: () => (/* binding */ UuidVersion1GeneratorComponent)
/* harmony export */ });
/* harmony import */ var _Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 1670);
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! uuid */ 3835);
/* harmony import */ var src_environments_component_config_uuid_version1_generator_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/environments/component-config/uuid-version1-generator/config */ 666);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/cdk/clipboard */ 4362);
/* harmony import */ var src_app_service_file_file_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/service/file/file.service */ 6857);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/icon */ 6515);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/button */ 895);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/input */ 26);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/form-field */ 1333);

var _class;










const _c0 = ["bulkUUIDInput"];
function UuidVersion1GeneratorComponent_span_22_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "span", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "*Max allowed value is 1000");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
function UuidVersion1GeneratorComponent_div_25_span_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const uuid_r4 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", uuid_r4, " ");
  }
}
function UuidVersion1GeneratorComponent_div_25_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](1, UuidVersion1GeneratorComponent_div_25_span_1_Template, 2, 1, "span", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx_r2.bulkUUIDs);
  }
}
class UuidVersion1GeneratorComponent {
  constructor(clipboard, fileService, renderer) {
    this.clipboard = clipboard;
    this.fileService = fileService;
    this.renderer = renderer;
    this.bulkUUIDs = [];
    this.bulkUUIDError = false;
    this.applicationConfig = src_environments_component_config_uuid_version1_generator_config__WEBPACK_IMPORTED_MODULE_1__.componentConfig;
    this.descriptionData = src_environments_component_config_uuid_version1_generator_config__WEBPACK_IMPORTED_MODULE_1__.descriptionData;
    this.currentUUID = (0,uuid__WEBPACK_IMPORTED_MODULE_4__["default"])();
  }
  generateUUID() {
    this.currentUUID = (0,uuid__WEBPACK_IMPORTED_MODULE_4__["default"])();
  }
  copyGeneratedId() {
    this.clipboard.copy(this.currentUUID);
  }
  generateBulkUUID() {
    const count = this.bulkUUIDInput.nativeElement.value;
    if (count <= 1000) {
      this.bulkUUIDError = false;
      this.bulkUUIDs = [];
      for (let i = 0; i < count; i++) {
        this.bulkUUIDs.push((0,uuid__WEBPACK_IMPORTED_MODULE_4__["default"])());
      }
    } else {
      this.bulkUUIDError = true;
    }
  }
  /**
   * generate bulk UUIDs with specified version and download to text file
   * @param event
   * @param version
   */
  downloadUUIDs(event) {
    var _this = this;
    return (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      /**
       * cancel default action
       */
      event.preventDefault();
      let string = '';
      const count = _this.bulkUUIDInput.nativeElement.value;
      if (count <= 1000) {
        _this.bulkUUIDError = false;
        for (let i = 0; i < count; i++) {
          string = string.concat(...[(0,uuid__WEBPACK_IMPORTED_MODULE_4__["default"])(), '\r\n']);
        }
        _this.fileService.downloadFile(`bulk-uuid-v1-${count}.txt`, new Blob([string], {
          type: 'plain/text'
        }), _this.renderer);
      } else {
        _this.bulkUUIDError = true;
      }
    })();
  }
}
_class = UuidVersion1GeneratorComponent;
_class.ɵfac = function UuidVersion1GeneratorComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_5__.Clipboard), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](src_app_service_file_file_service__WEBPACK_IMPORTED_MODULE_2__.FileService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_3__.Renderer2));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["app-uuid-version1-generator"]],
  viewQuery: function UuidVersion1GeneratorComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵviewQuery"](_c0, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵloadQuery"]()) && (ctx.bulkUUIDInput = _t.first);
    }
  },
  decls: 26,
  vars: 3,
  consts: [[1, "flex-display", "flex-column-flow", "flex-align-center", "uuid-app", "border-grey", "flex-gap-large", "full-width"], [1, "flex-display", "flex-align-center", "uid-div", "flex-gap-medium"], [1, "uuid-class", 2, "color", "#ff4081"], ["mat-stroked-button", "", "color", "primary", 3, "click"], [1, "flex-display", "flex-column-flow", "flex-align-center", "flex-gap-medium"], [1, "bold-text", 2, "font-size", "large"], ["appearance", "outline"], ["type", "number", "matInput", "", "placeholder", "Max 1000", "value", "5", "min", "0", "max", "1000"], ["bulkUUIDInput", ""], ["mat-raised-button", "", "matTextSuffix", "", "aria-label", "Clear", 3, "click"], ["style", "color: red", 4, "ngIf"], ["href", "#", 3, "click"], ["class", "flex-display flex-column-flow flex-center flex-align-center bulk-uuids border-grey y-scroll", "style", "max-height: 200px", 4, "ngIf"], [2, "color", "red"], [1, "flex-display", "flex-column-flow", "flex-center", "flex-align-center", "bulk-uuids", "border-grey", "y-scroll", 2, "max-height", "200px"], [4, "ngFor", "ngForOf"]],
  template: function UuidVersion1GeneratorComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "span", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "button", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function UuidVersion1GeneratorComponent_Template_button_click_4_listener() {
        return ctx.copyGeneratedId();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](5, "mat-icon");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](6, "content_copy");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](7, " Copy ");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](8, "button", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function UuidVersion1GeneratorComponent_Template_button_click_8_listener() {
        return ctx.generateUUID();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](9, "mat-icon");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](10, "repeat");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](11, " Generate Again ");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](12, "div", 4)(13, "span", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](14, "Bulk Version 1 UUID Generator");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](15, "mat-form-field", 6)(16, "mat-label");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](17, "Enter UUIDs Count");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](18, "input", 7, 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](20, "button", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function UuidVersion1GeneratorComponent_Template_button_click_20_listener() {
        return ctx.generateBulkUUID();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](21, " Generate ");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](22, UuidVersion1GeneratorComponent_span_22_Template, 2, 0, "span", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](23, "a", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function UuidVersion1GeneratorComponent_Template_a_click_23_listener($event) {
        return ctx.downloadUUIDs($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](24, "Download to a file");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](25, UuidVersion1GeneratorComponent_div_25_Template, 2, 1, "div", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](ctx.currentUUID);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](19);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.bulkUUIDError);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.bulkUUIDs.length > 0);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgIf, _angular_material_icon__WEBPACK_IMPORTED_MODULE_7__.MatIcon, _angular_material_button__WEBPACK_IMPORTED_MODULE_8__.MatButton, _angular_material_input__WEBPACK_IMPORTED_MODULE_9__.MatInput, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_10__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_10__.MatLabel, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_10__.MatSuffix],
  styles: [".uuid-class[_ngcontent-%COMP%] {\n  font-size: xx-large;\n}\n\n.uuid-app[_ngcontent-%COMP%] {\n  padding-top: 20px;\n  padding-bottom: 15px;\n  border-radius: 10px;\n}\n\n.bulk-uuids[_ngcontent-%COMP%] {\n  padding: 15px;\n  border-radius: 10px;\n}\n\n@media screen and (max-width: 735px) {\n  .uid-div[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .uuid-class[_ngcontent-%COMP%] {\n    font-size: larger;\n  }\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvbW9kdWxlcy91dWlkLXZlcnNpb24xLWdlbmVyYXRvci91dWlkLXZlcnNpb24xLWdlbmVyYXRvci5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLG1CQUFBO0FBQ0Y7O0FBRUE7RUFDRSxpQkFBQTtFQUNBLG9CQUFBO0VBQ0EsbUJBQUE7QUFDRjs7QUFFQTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtBQUNGOztBQUVBO0VBQ0U7SUFDRSxzQkFBQTtFQUNGO0VBQ0E7SUFDRSxpQkFBQTtFQUNGO0FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIudXVpZC1jbGFzcyB7XG4gIGZvbnQtc2l6ZTogeHgtbGFyZ2U7XG59XG5cbi51dWlkLWFwcCB7XG4gIHBhZGRpbmctdG9wOiAyMHB4O1xuICBwYWRkaW5nLWJvdHRvbTogMTVweDtcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcbn1cblxuLmJ1bGstdXVpZHMge1xuICBwYWRkaW5nOiAxNXB4O1xuICBib3JkZXItcmFkaXVzOiAxMHB4O1xufVxuXG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA3MzVweCkge1xuICAudWlkLWRpdiB7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgfVxuICAudXVpZC1jbGFzcyB7XG4gICAgZm9udC1zaXplOiBsYXJnZXI7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
});

/***/ }),

/***/ 4749:
/*!***********************************************************************************!*\
  !*** ./src/app/modules/uuid-version1-generator/uuid-version1-generator.module.ts ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UuidVersion1GeneratorModule: () => (/* binding */ UuidVersion1GeneratorModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _uuid_version1_generator_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./uuid-version1-generator-routing.module */ 4320);
/* harmony import */ var _uuid_version1_generator_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./uuid-version1-generator.component */ 168);
/* harmony import */ var _angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/cdk/clipboard */ 4362);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/button */ 895);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/icon */ 6515);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/input */ 26);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 1699);
var _class;








class UuidVersion1GeneratorModule {}
_class = UuidVersion1GeneratorModule;
_class.ɵfac = function UuidVersion1GeneratorModule_Factory(t) {
  return new (t || _class)();
};
_class.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
  type: _class
});
_class.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _uuid_version1_generator_routing_module__WEBPACK_IMPORTED_MODULE_0__.UuidVersion1GeneratorRoutingModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__.MatIconModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_5__.MatButtonModule, _angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_6__.ClipboardModule, _angular_material_input__WEBPACK_IMPORTED_MODULE_7__.MatInputModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](UuidVersion1GeneratorModule, {
    declarations: [_uuid_version1_generator_component__WEBPACK_IMPORTED_MODULE_1__.UuidVersion1GeneratorComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _uuid_version1_generator_routing_module__WEBPACK_IMPORTED_MODULE_0__.UuidVersion1GeneratorRoutingModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__.MatIconModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_5__.MatButtonModule, _angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_6__.ClipboardModule, _angular_material_input__WEBPACK_IMPORTED_MODULE_7__.MatInputModule]
  });
})();

/***/ }),

/***/ 666:
/*!*****************************************************************************!*\
  !*** ./src/environments/component-config/uuid-version1-generator/config.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   componentConfig: () => (/* binding */ componentConfig),
/* harmony export */   descriptionData: () => (/* binding */ descriptionData)
/* harmony export */ });
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/environments/environment */ 553);
/* harmony import */ var src_environments_tools_directory_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/environments/tools-directory-config */ 6636);


const navigationUrl = '/tools/uuid-v1-generator';
const pageTitle = 'Online UUID Version1 (v1) Generator | Bulk UUID v1 Generator';
const pageDescription = 'Our free online UUID v1 generator tool is a quick and easy way to generate UUIDs based on MAC address and time, either individually or in bulk.';
const imageUrl = `${src_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.screenshotsBaseUrl}/uuid-v1-generator.png`;
const keywords = 'UUID v1 generator, UUID generator online, UUID generator free, UUID v1, UUID, universally unique identifier, GUID, globally unique identifier, generate UUID, generate UUID online, generate UUID free, MAC address, time, timestamp';
const relatedTools = [src_environments_tools_directory_config__WEBPACK_IMPORTED_MODULE_1__.ApplicationIds.UUID_VERSION4_GENERATOR, src_environments_tools_directory_config__WEBPACK_IMPORTED_MODULE_1__.ApplicationIds.GUID_GENERATOR, src_environments_tools_directory_config__WEBPACK_IMPORTED_MODULE_1__.ApplicationIds.JWT_DECODER];
const componentConfig = {
  mainHeading: 'UUID v1 Generator Tool - Generate Single or Bulk Universally Unique Identifiers (UUIDs) Based on MAC Address and Time',
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
  blockData: ['Universally unique identifiers (UUIDs) are also known as globally unique identifiers (GUIDs). They are 128-bit numbers that are used to identify information in computer systems. UUIDs are generated using a variety of methods, but UUID v1s are generated using the MAC address of the computer on which they are generated and the current time.', 'UUID v1s are often used in applications where it is important to track the origin of data, such as in database systems and distributed systems. They are also used in some security applications, such as encryption and authentication.', 'Our free online UUID v1 generator tool makes it easy to generate UUID v1s, whether you need one or many. To use the tool, simply enter the number of UUIDs you need in the text box and click the "Generate" button. The tool will instantly generate a list of UUID v1s and show it to you. You can then copy and paste the list of UUIDs into your application.']
}, {
  heading: 'Here are some of the benefits of using our free online UUID v1 generator tool:',
  listData: [`It's quick and easy to use.`, `It's completely free.`, `It can generate single or bulk UUID v1s.`, `It generates random and unique UUID v1s based on MAC address and time.`, `It's perfect for developers, testers, and anyone else who needs to generate UUID v1s.`, `It's great for learning more about UUID v1s and how they work.`]
}, {
  heading: 'Here are some examples of how you can use our free online UUID v1 generator tool:',
  listData: ['Developers can use the tool to generate UUID v1s for database identifiers, session identifiers, and file identifiers.', 'Testers can use the tool to generate UUID v1s for test data.', 'Anyone can use the tool to generate UUID v1s for any reason.']
}, {
  blockData: ['No matter what your needs are, our free online UUID v1 generator tool is a valuable resource. Try it today and see how easy it is to use!']
}, {
  heading: 'What is a UUID v1?',
  blockData: ['A UUID v1 is a version 1 UUID, which is generated using the MAC address of the computer on which it is generated and the current time. UUID v1s are often used in applications where it is important to track the origin of data.']
}, {
  heading: 'How to use our UUID v1 generator tool:',
  blockData: ['To use our UUID v1 generator tool, simply enter the number of UUIDs you need in the text box and click the "Generate" button. The tool will instantly generate a list of UUID v1s and show it to you. You can then copy and paste the list of UUIDs into your application.']
}, {
  heading: 'Tips for using our UUID v1 generator tool:',
  listData: ['You can generate as many UUID v1s as you need.', 'You can also use our UUID v1 generator tool to generate UUID v1s in different formats, such as hexadecimal, base64, and URL safe.']
}, {
  blockData: ['We hope you find our free online UUID v1 generator tool helpful!']
}, {
  heading: 'References',
  links: [{
    displayText: 'Read more about UUIDs at Wikipedia',
    url: 'https://en.wikipedia.org/wiki/Universally_unique_identifier'
  }, {
    displayText: 'RFC 4122',
    url: 'https://www.ietf.org/rfc/rfc4122.txt'
  }]
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

/***/ 9772:
/*!*****************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/regex.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i);

/***/ }),

/***/ 7948:
/*!***************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/rng.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ rng)
/* harmony export */ });
// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
let getRandomValues;
const rnds8 = new Uint8Array(16);
function rng() {
  // lazy load so that environments that need to polyfill have a chance to do so
  if (!getRandomValues) {
    // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation.
    getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);
    if (!getRandomValues) {
      throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
    }
  }
  return getRandomValues(rnds8);
}

/***/ }),

/***/ 564:
/*!*********************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/stringify.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   unsafeStringify: () => (/* binding */ unsafeStringify)
/* harmony export */ });
/* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validate.js */ 9359);

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */

const byteToHex = [];
for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).slice(1));
}
function unsafeStringify(arr, offset = 0) {
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  return (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
}
function stringify(arr, offset = 0) {
  const uuid = unsafeStringify(arr, offset); // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields

  if (!(0,_validate_js__WEBPACK_IMPORTED_MODULE_0__["default"])(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }
  return uuid;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (stringify);

/***/ }),

/***/ 3835:
/*!**************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/v1.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _rng_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rng.js */ 7948);
/* harmony import */ var _stringify_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./stringify.js */ 564);

 // **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html

let _nodeId;
let _clockseq; // Previous uuid creation time

let _lastMSecs = 0;
let _lastNSecs = 0; // See https://github.com/uuidjs/uuid for API details

function v1(options, buf, offset) {
  let i = buf && offset || 0;
  const b = buf || new Array(16);
  options = options || {};
  let node = options.node || _nodeId;
  let clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq; // node and clockseq need to be initialized to random values if they're not
  // specified.  We do this lazily to minimize issues related to insufficient
  // system entropy.  See #189

  if (node == null || clockseq == null) {
    const seedBytes = options.random || (options.rng || _rng_js__WEBPACK_IMPORTED_MODULE_0__["default"])();
    if (node == null) {
      // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
      node = _nodeId = [seedBytes[0] | 0x01, seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]];
    }
    if (clockseq == null) {
      // Per 4.2.2, randomize (14 bit) clockseq
      clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;
    }
  } // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.

  let msecs = options.msecs !== undefined ? options.msecs : Date.now(); // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock

  let nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1; // Time since last uuid creation (in msecs)

  const dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 10000; // Per 4.2.1.2, Bump clockseq on clock regression

  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  } // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval

  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  } // Per 4.2.1.2 Throw error if too many uuids are requested

  if (nsecs >= 10000) {
    throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
  }
  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq; // Per 4.1.4 - Convert from unix epoch to Gregorian epoch

  msecs += 12219292800000; // `time_low`

  const tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff; // `time_mid`

  const tmh = msecs / 0x100000000 * 10000 & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff; // `time_high_and_version`

  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version

  b[i++] = tmh >>> 16 & 0xff; // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)

  b[i++] = clockseq >>> 8 | 0x80; // `clock_seq_low`

  b[i++] = clockseq & 0xff; // `node`

  for (let n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }
  return buf || (0,_stringify_js__WEBPACK_IMPORTED_MODULE_1__.unsafeStringify)(b);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (v1);

/***/ }),

/***/ 9359:
/*!********************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/validate.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _regex_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./regex.js */ 9772);

function validate(uuid) {
  return typeof uuid === 'string' && _regex_js__WEBPACK_IMPORTED_MODULE_0__["default"].test(uuid);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (validate);

/***/ }),

/***/ 7971:
/*!************************************!*\
  !*** ./src/environments/apps.json ***!
  \************************************/
/***/ ((module) => {

module.exports = JSON.parse('{"xmltojson":{"applicationId":"xmltojson","displayText":"XML to JSON Converter","iconName":"xml-icon","navigateUrl":"/tools/xml-to-json","iconRelativeUrl":"xml.svg"},"qrcodegenerator":{"applicationId":"qrcodegenerator","displayText":"QR Code Generator","iconName":"qr-code","navigateUrl":"/tools/qr-code-generator","iconRelativeUrl":"qr-code.svg"},"wordcounter":{"applicationId":"wordcounter","displayText":"Word Counter","iconName":"word-icon","navigateUrl":"/tools/word-counter","iconRelativeUrl":"word.svg"},"textcompare":{"applicationId":"textcompare","displayText":"Online Text Compare","iconName":"comparison-icon","navigateUrl":"/tools/text-compare","iconRelativeUrl":"comparison.svg"},"markdowneditor":{"applicationId":"markdowneditor","displayText":"Markdown Editor","iconName":"markdown-icon","navigateUrl":"/tools/markdown-editor","iconRelativeUrl":"markdown.svg"},"passwordgenerator":{"applicationId":"passwordgenerator","displayText":"Random Password Generator","iconName":"password-icon","navigateUrl":"/tools/password-generator","iconRelativeUrl":"password.svg"},"videoconverter":{"applicationId":"videoconverter","displayText":"Video to Audio Converter","iconName":"video-convert-icon","navigateUrl":"/tools/video-converter","iconRelativeUrl":"video-convert.svg"},"screenrecorder":{"applicationId":"screenrecorder","displayText":"Free Screen Recorder","iconName":"screen-icon","navigateUrl":"/tools/screen-recorder","iconRelativeUrl":"screen.svg"},"imagecompressor":{"applicationId":"imagecompressor","displayText":"Free Image Compressor","iconName":"image-icon","navigateUrl":"/tools/image-compress","iconRelativeUrl":"image-icon.svg"},"imagecropper":{"applicationId":"imagecropper","displayText":"Free Image Cropper","iconName":"image-icon","navigateUrl":"/tools/crop-image","iconRelativeUrl":"image-icon.svg"},"jwtdecoder":{"applicationId":"jwtdecoder","displayText":"JWT Decoder","iconName":"jwt-icon","navigateUrl":"/tools/jwt","iconRelativeUrl":"jwt-icon.svg"},"jsformatter":{"applicationId":"jsformatter","displayText":"Online Javascript Formatter","iconName":"js-icon","navigateUrl":"/tools/js-formatter","iconRelativeUrl":"js-icon.svg"},"jsonformatter":{"applicationId":"jsonformatter","displayText":"Online JSON Formatter","iconName":"json-icon","navigateUrl":"/tools/json-formatter","iconRelativeUrl":"json-icon.svg"},"jsonviewer":{"applicationId":"jsonviewer","displayText":"Online JSON Viewer","iconName":"json-icon","navigateUrl":"/tools/json-viewer","iconRelativeUrl":"json-icon.svg"},"htmlformatter":{"applicationId":"htmlformatter","displayText":"Online HTML Formatter","iconName":"html-icon","navigateUrl":"/tools/html-formatter","iconRelativeUrl":"html.svg"},"cssformatter":{"applicationId":"cssformatter","displayText":"Online CSS Formatter","iconName":"css-icon","navigateUrl":"/tools/css-formatter","iconRelativeUrl":"css.svg"},"base64encoder":{"applicationId":"base64encoder","displayText":"Base64 Encoder","iconName":"file-encode-icon","navigateUrl":"/tools/base64-encode","iconRelativeUrl":"file-encode.svg"},"base64decoder":{"applicationId":"base64decoder","displayText":"Base64 Decoder","iconName":"file-decode-icon","navigateUrl":"/tools/base64-decode","iconRelativeUrl":"file-decode.svg"},"crongenerator":{"applicationId":"crongenerator","displayText":"Cron Expression Generator","iconName":"cron-icon","navigateUrl":"/tools/cron-expression","iconRelativeUrl":"cron.svg"},"uuidv4generator":{"applicationId":"uuidv4generator","displayText":"UUID V4 Generator","iconName":"uuid-icon","navigateUrl":"/tools/uuid-v4-generator","iconRelativeUrl":"uuid-icon.svg"},"uuidv1generator":{"applicationId":"uuidv1generator","displayText":"UUID V1 Generator","iconName":"uuid-icon","navigateUrl":"/tools/uuid-v1-generator","iconRelativeUrl":"uuid-icon.svg"},"guidgenerator":{"applicationId":"guidgenerator","displayText":"GUID Generator","iconName":"uuid-icon","navigateUrl":"/tools/guid-generator","iconRelativeUrl":"uuid-icon.svg"}}');

/***/ })

}]);
//# sourceMappingURL=src_app_modules_uuid-version1-generator_uuid-version1-generator_module_ts.294b333eced37a4a.js.map