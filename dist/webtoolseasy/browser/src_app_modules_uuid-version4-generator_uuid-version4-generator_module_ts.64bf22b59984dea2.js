"use strict";
(self["webpackChunkwebtoolseasy"] = self["webpackChunkwebtoolseasy"] || []).push([["src_app_modules_uuid-version4-generator_uuid-version4-generator_module_ts"],{

/***/ 9063:
/*!*******************************************************************************************!*\
  !*** ./src/app/modules/uuid-version4-generator/uuid-version4-generator-routing.module.ts ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UuidVersion4GeneratorRoutingModule: () => (/* binding */ UuidVersion4GeneratorRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 7947);
/* harmony import */ var _uuid_version4_generator_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./uuid-version4-generator.component */ 31);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 1699);
var _class;




const routes = [{
  path: '',
  component: _uuid_version4_generator_component__WEBPACK_IMPORTED_MODULE_0__.UuidVersion4GeneratorComponent
}];
class UuidVersion4GeneratorRoutingModule {}
_class = UuidVersion4GeneratorRoutingModule;
_class.ɵfac = function UuidVersion4GeneratorRoutingModule_Factory(t) {
  return new (t || _class)();
};
_class.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
  type: _class
});
_class.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](UuidVersion4GeneratorRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
})();

/***/ }),

/***/ 31:
/*!**************************************************************************************!*\
  !*** ./src/app/modules/uuid-version4-generator/uuid-version4-generator.component.ts ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UuidVersion4GeneratorComponent: () => (/* binding */ UuidVersion4GeneratorComponent)
/* harmony export */ });
/* harmony import */ var _Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 1670);
/* harmony import */ var src_environments_component_config_uuid_version4_generator_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/environments/component-config/uuid-version4-generator/config */ 20);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/cdk/clipboard */ 4362);
/* harmony import */ var src_app_service_file_file_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/service/file/file.service */ 6857);
/* harmony import */ var src_app_service_platform_metadata_platform_metadata_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/service/platform-metadata/platform-metadata.service */ 3242);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/icon */ 6515);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/button */ 895);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/input */ 26);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/form-field */ 1333);

var _class;










const _c0 = ["bulkUUIDInput"];
function UuidVersion4GeneratorComponent_span_22_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "span", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "*Max allowed value is 1000");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function UuidVersion4GeneratorComponent_div_25_span_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const uuid_r4 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", uuid_r4, " ");
  }
}
function UuidVersion4GeneratorComponent_div_25_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](1, UuidVersion4GeneratorComponent_div_25_span_1_Template, 2, 1, "span", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", ctx_r2.bulkUUIDs);
  }
}
class UuidVersion4GeneratorComponent {
  constructor(clipboard, fileService, renderer, platformMetaDataService) {
    this.clipboard = clipboard;
    this.fileService = fileService;
    this.renderer = renderer;
    this.platformMetaDataService = platformMetaDataService;
    this.currentUUID = '';
    this.bulkUUIDs = [];
    this.bulkUUIDError = false;
    this.applicationConfig = src_environments_component_config_uuid_version4_generator_config__WEBPACK_IMPORTED_MODULE_1__.componentConfig;
    this.descriptionData = src_environments_component_config_uuid_version4_generator_config__WEBPACK_IMPORTED_MODULE_1__.descriptionData;
    if (platformMetaDataService.isPlatformBrowser) {
      this.currentUUID = crypto.randomUUID();
    }
  }
  generateUUID() {
    this.currentUUID = crypto.randomUUID();
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
        this.bulkUUIDs.push(crypto.randomUUID());
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
          string = string.concat(...[crypto.randomUUID(), '\r\n']);
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
_class = UuidVersion4GeneratorComponent;
_class.ɵfac = function UuidVersion4GeneratorComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_5__.Clipboard), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](src_app_service_file_file_service__WEBPACK_IMPORTED_MODULE_2__.FileService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_4__.Renderer2), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](src_app_service_platform_metadata_platform_metadata_service__WEBPACK_IMPORTED_MODULE_3__.PlatformMetadataService));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["app-uuid-version4-generator"]],
  viewQuery: function UuidVersion4GeneratorComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵviewQuery"](_c0, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵloadQuery"]()) && (ctx.bulkUUIDInput = _t.first);
    }
  },
  decls: 26,
  vars: 3,
  consts: [[1, "flex-display", "flex-column-flow", "flex-align-center", "uuid-app", "border-grey", "flex-gap-large", "full-width"], [1, "flex-display", "flex-align-center", "uid-div", "flex-gap-medium"], [1, "uuid-class", 2, "color", "#ff4081"], ["mat-stroked-button", "", "color", "primary", 3, "click"], [1, "flex-display", "flex-column-flow", "flex-align-center", "flex-gap-medium"], [1, "bold-text", 2, "font-size", "large"], ["appearance", "outline"], ["type", "number", "matInput", "", "placeholder", "Max 1000", "value", "5", "min", "0", "max", "1000"], ["bulkUUIDInput", ""], ["mat-raised-button", "", "matTextSuffix", "", "aria-label", "Clear", 3, "click"], ["style", "color: red", 4, "ngIf"], ["href", "#", 3, "click"], ["class", "flex-display flex-column-flow flex-center flex-align-center bulk-uuids border-grey auto-scroll", "style", "max-height: 200px", 4, "ngIf"], [2, "color", "red"], [1, "flex-display", "flex-column-flow", "flex-center", "flex-align-center", "bulk-uuids", "border-grey", "auto-scroll", 2, "max-height", "200px"], [4, "ngFor", "ngForOf"]],
  template: function UuidVersion4GeneratorComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "span", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](4, "button", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function UuidVersion4GeneratorComponent_Template_button_click_4_listener() {
        return ctx.copyGeneratedId();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](5, "mat-icon");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](6, "content_copy");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](7, " Copy ");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](8, "button", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function UuidVersion4GeneratorComponent_Template_button_click_8_listener() {
        return ctx.generateUUID();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](9, "mat-icon");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](10, "repeat");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](11, " Generate Again ");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](12, "div", 4)(13, "span", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](14, "Bulk Version 4 UUID Generator");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](15, "mat-form-field", 6)(16, "mat-label");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](17, "Enter UUIDs Count");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](18, "input", 7, 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](20, "button", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function UuidVersion4GeneratorComponent_Template_button_click_20_listener() {
        return ctx.generateBulkUUID();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](21, " Generate ");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](22, UuidVersion4GeneratorComponent_span_22_Template, 2, 0, "span", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](23, "a", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function UuidVersion4GeneratorComponent_Template_a_click_23_listener($event) {
        return ctx.downloadUUIDs($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](24, "Download to a file");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](25, UuidVersion4GeneratorComponent_div_25_Template, 2, 1, "div", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](ctx.currentUUID);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](19);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.bulkUUIDError);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.bulkUUIDs.length > 0);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgIf, _angular_material_icon__WEBPACK_IMPORTED_MODULE_7__.MatIcon, _angular_material_button__WEBPACK_IMPORTED_MODULE_8__.MatButton, _angular_material_input__WEBPACK_IMPORTED_MODULE_9__.MatInput, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_10__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_10__.MatLabel, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_10__.MatSuffix],
  styles: [".uuid-class[_ngcontent-%COMP%] {\n  font-size: xx-large;\n}\n\n.uuid-app[_ngcontent-%COMP%] {\n  padding-top: 20px;\n  padding-bottom: 15px;\n  border-radius: 10px;\n}\n\n.bulk-uuids[_ngcontent-%COMP%] {\n  padding: 15px;\n  border-radius: 10px;\n}\n\n@media screen and (max-width: 735px) {\n  .uid-div[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .uuid-class[_ngcontent-%COMP%] {\n    font-size: larger;\n  }\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvbW9kdWxlcy91dWlkLXZlcnNpb240LWdlbmVyYXRvci91dWlkLXZlcnNpb240LWdlbmVyYXRvci5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLG1CQUFBO0FBQ0Y7O0FBRUE7RUFDRSxpQkFBQTtFQUNBLG9CQUFBO0VBQ0EsbUJBQUE7QUFDRjs7QUFFQTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtBQUNGOztBQUVBO0VBQ0U7SUFDRSxzQkFBQTtFQUNGO0VBQ0E7SUFDRSxpQkFBQTtFQUNGO0FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIudXVpZC1jbGFzcyB7XG4gIGZvbnQtc2l6ZTogeHgtbGFyZ2U7XG59XG5cbi51dWlkLWFwcCB7XG4gIHBhZGRpbmctdG9wOiAyMHB4O1xuICBwYWRkaW5nLWJvdHRvbTogMTVweDtcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcbn1cblxuLmJ1bGstdXVpZHMge1xuICBwYWRkaW5nOiAxNXB4O1xuICBib3JkZXItcmFkaXVzOiAxMHB4O1xufVxuXG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA3MzVweCkge1xuICAudWlkLWRpdiB7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgfVxuICAudXVpZC1jbGFzcyB7XG4gICAgZm9udC1zaXplOiBsYXJnZXI7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
});

/***/ }),

/***/ 7319:
/*!***********************************************************************************!*\
  !*** ./src/app/modules/uuid-version4-generator/uuid-version4-generator.module.ts ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UuidVersion4GeneratorModule: () => (/* binding */ UuidVersion4GeneratorModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _uuid_version4_generator_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./uuid-version4-generator-routing.module */ 9063);
/* harmony import */ var _angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/cdk/clipboard */ 4362);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/button */ 895);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/icon */ 6515);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/input */ 26);
/* harmony import */ var _uuid_version4_generator_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./uuid-version4-generator.component */ 31);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 1699);
var _class;








class UuidVersion4GeneratorModule {}
_class = UuidVersion4GeneratorModule;
_class.ɵfac = function UuidVersion4GeneratorModule_Factory(t) {
  return new (t || _class)();
};
_class.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
  type: _class
});
_class.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _uuid_version4_generator_routing_module__WEBPACK_IMPORTED_MODULE_0__.UuidVersion4GeneratorRoutingModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__.MatIconModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_5__.MatButtonModule, _angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_6__.ClipboardModule, _angular_material_input__WEBPACK_IMPORTED_MODULE_7__.MatInputModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](UuidVersion4GeneratorModule, {
    declarations: [_uuid_version4_generator_component__WEBPACK_IMPORTED_MODULE_1__.UuidVersion4GeneratorComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _uuid_version4_generator_routing_module__WEBPACK_IMPORTED_MODULE_0__.UuidVersion4GeneratorRoutingModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__.MatIconModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_5__.MatButtonModule, _angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_6__.ClipboardModule, _angular_material_input__WEBPACK_IMPORTED_MODULE_7__.MatInputModule]
  });
})();

/***/ }),

/***/ 20:
/*!*****************************************************************************!*\
  !*** ./src/environments/component-config/uuid-version4-generator/config.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   componentConfig: () => (/* binding */ componentConfig),
/* harmony export */   descriptionData: () => (/* binding */ descriptionData)
/* harmony export */ });
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/environments/environment */ 553);
/* harmony import */ var src_environments_tools_directory_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/environments/tools-directory-config */ 6636);


const navigationUrl = '/tools/uuid-v4-generator';
const pageTitle = 'Online UUID Version4 (v4) Generator | Bulk UUID v4 Generator';
const pageDescription = 'Our free online UUID v4 generator tool is a quick and easy way to generate universally unique identifiers (UUIDs), either individually or in bulk.';
const imageUrl = `${src_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.screenshotsBaseUrl}/uuid-v4-generator.png`;
const keywords = 'UUID v4 generator, UUID generator online, UUID generator free, UUID v4, UUID, universally unique identifier, GUID, globally unique identifier, generate UUID, generate UUID online, generate UUID free';
const relatedTools = [src_environments_tools_directory_config__WEBPACK_IMPORTED_MODULE_1__.ApplicationIds.JWT_DECODER, src_environments_tools_directory_config__WEBPACK_IMPORTED_MODULE_1__.ApplicationIds.UUID_VERSION1_GENERATOR, src_environments_tools_directory_config__WEBPACK_IMPORTED_MODULE_1__.ApplicationIds.GUID_GENERATOR];
const componentConfig = {
  mainHeading: 'UUID v4 Generator Tool - Generate Single or Bulk Universally Unique Identifiers (UUIDs) Online for Free',
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
  blockData: ['Universally unique identifiers (UUIDs) are also known as globally unique identifiers (GUIDs). They are 128-bit numbers that are used to identify information in computer systems. UUIDs are generated using a random number generator and are designed to be unique.', 'UUIDs are used in a variety of applications, such as database identifiers, session identifiers, and file identifiers. They are also used in distributed systems to ensure that all systems are using the same unique identifier for a given piece of information.', 'Our free online UUID v4 generator tool makes it easy to generate UUIDs, whether you need one or many. To use the tool, simply enter the number of UUIDs you need in the text box and click the "Generate" button. The tool will instantly generate a list of UUID v4s and show it to you. You can then copy and paste the list of UUIDs into your application.']
}, {
  heading: 'Here are some of the benefits of using our free online UUID v4 generator tool:',
  listData: [`It's quick and easy to use.`, `It's completely free.`, `It can generate single or bulk UUID v4s.`, `It generates random and unique UUID v4s.`, `It's perfect for developers, testers, and anyone else who needs to generate UUIDs.`, `It's great for learning more about UUIDs and how they work.`]
}, {
  heading: 'Here are some examples of how you can use our free online UUID v4 generator tool:',
  listData: ['Developers can use the tool to generate UUIDs for database identifiers, session identifiers, and file identifiers.', 'Testers can use the tool to generate UUIDs for test data.', 'Anyone can use the tool to generate UUIDs for any reason.']
}, {
  blockData: ['No matter what your needs are, our free online UUID v4 generator tool is a valuable resource. Try it today and see how easy it is to use!']
}, {
  heading: 'What is a UUID v4?',
  blockData: ['A UUID v4 is a version 4 UUID, which is generated using a random number generator. UUID v4s are the most commonly used type of UUID and are considered to be the most secure.']
}, {
  heading: 'How to use our UUID v4 generator tool:',
  blockData: ['To use our UUID v4 generator tool, simply enter the number of UUIDs you need in the text box and click the "Generate" button. The tool will instantly generate a list of UUID v4s and show it to you. You can then copy and paste the list of UUIDs into your application.']
}, {
  heading: 'Tips for using our UUID v4 generator tool:',
  listData: ['You can generate as many UUID v4s as you need.', 'You can also use our UUID v4 generator tool to generate UUID v4s in different formats, such as hexadecimal, base64, and URL safe.']
}, {
  blockData: ['We hope you find our free online UUID v4 generator tool helpful!']
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

/***/ 7971:
/*!************************************!*\
  !*** ./src/environments/apps.json ***!
  \************************************/
/***/ ((module) => {

module.exports = JSON.parse('{"xmltojson":{"applicationId":"xmltojson","displayText":"XML to JSON Converter","iconName":"xml-icon","navigateUrl":"/tools/xml-to-json","iconRelativeUrl":"xml.svg"},"qrcodegenerator":{"applicationId":"qrcodegenerator","displayText":"QR Code Generator","iconName":"qr-code","navigateUrl":"/tools/qr-code-generator","iconRelativeUrl":"qr-code.svg"},"wordcounter":{"applicationId":"wordcounter","displayText":"Word Counter","iconName":"word-icon","navigateUrl":"/tools/word-counter","iconRelativeUrl":"word.svg"},"textcompare":{"applicationId":"textcompare","displayText":"Online Text Compare","iconName":"comparison-icon","navigateUrl":"/tools/text-compare","iconRelativeUrl":"comparison.svg"},"markdowneditor":{"applicationId":"markdowneditor","displayText":"Markdown Editor","iconName":"markdown-icon","navigateUrl":"/tools/markdown-editor","iconRelativeUrl":"markdown.svg"},"passwordgenerator":{"applicationId":"passwordgenerator","displayText":"Random Password Generator","iconName":"password-icon","navigateUrl":"/tools/password-generator","iconRelativeUrl":"password.svg"},"videoconverter":{"applicationId":"videoconverter","displayText":"Video to Audio Converter","iconName":"video-convert-icon","navigateUrl":"/tools/video-converter","iconRelativeUrl":"video-convert.svg"},"screenrecorder":{"applicationId":"screenrecorder","displayText":"Free Screen Recorder","iconName":"screen-icon","navigateUrl":"/tools/screen-recorder","iconRelativeUrl":"screen.svg"},"imagecompressor":{"applicationId":"imagecompressor","displayText":"Free Image Compressor","iconName":"image-icon","navigateUrl":"/tools/image-compress","iconRelativeUrl":"image-icon.svg"},"imagecropper":{"applicationId":"imagecropper","displayText":"Free Image Cropper","iconName":"image-icon","navigateUrl":"/tools/crop-image","iconRelativeUrl":"image-icon.svg"},"jwtdecoder":{"applicationId":"jwtdecoder","displayText":"JWT Decoder","iconName":"jwt-icon","navigateUrl":"/tools/jwt","iconRelativeUrl":"jwt-icon.svg"},"jsformatter":{"applicationId":"jsformatter","displayText":"Online Javascript Formatter","iconName":"js-icon","navigateUrl":"/tools/js-formatter","iconRelativeUrl":"js-icon.svg"},"jsonformatter":{"applicationId":"jsonformatter","displayText":"Online JSON Formatter","iconName":"json-icon","navigateUrl":"/tools/json-formatter","iconRelativeUrl":"json-icon.svg"},"jsonviewer":{"applicationId":"jsonviewer","displayText":"Online JSON Viewer","iconName":"json-icon","navigateUrl":"/tools/json-viewer","iconRelativeUrl":"json-icon.svg"},"htmlformatter":{"applicationId":"htmlformatter","displayText":"Online HTML Formatter","iconName":"html-icon","navigateUrl":"/tools/html-formatter","iconRelativeUrl":"html.svg"},"cssformatter":{"applicationId":"cssformatter","displayText":"Online CSS Formatter","iconName":"css-icon","navigateUrl":"/tools/css-formatter","iconRelativeUrl":"css.svg"},"base64encoder":{"applicationId":"base64encoder","displayText":"Base64 Encoder","iconName":"file-encode-icon","navigateUrl":"/tools/base64-encode","iconRelativeUrl":"file-encode.svg"},"base64decoder":{"applicationId":"base64decoder","displayText":"Base64 Decoder","iconName":"file-decode-icon","navigateUrl":"/tools/base64-decode","iconRelativeUrl":"file-decode.svg"},"crongenerator":{"applicationId":"crongenerator","displayText":"Cron Expression Generator","iconName":"cron-icon","navigateUrl":"/tools/cron-expression","iconRelativeUrl":"cron.svg"},"uuidv4generator":{"applicationId":"uuidv4generator","displayText":"UUID V4 Generator","iconName":"uuid-icon","navigateUrl":"/tools/uuid-v4-generator","iconRelativeUrl":"uuid-icon.svg"},"uuidv1generator":{"applicationId":"uuidv1generator","displayText":"UUID V1 Generator","iconName":"uuid-icon","navigateUrl":"/tools/uuid-v1-generator","iconRelativeUrl":"uuid-icon.svg"},"guidgenerator":{"applicationId":"guidgenerator","displayText":"GUID Generator","iconName":"uuid-icon","navigateUrl":"/tools/guid-generator","iconRelativeUrl":"uuid-icon.svg"}}');

/***/ })

}]);
//# sourceMappingURL=src_app_modules_uuid-version4-generator_uuid-version4-generator_module_ts.64bf22b59984dea2.js.map