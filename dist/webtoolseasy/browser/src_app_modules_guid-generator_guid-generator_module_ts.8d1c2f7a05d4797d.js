"use strict";
(self["webpackChunkwebtoolseasy"] = self["webpackChunkwebtoolseasy"] || []).push([["src_app_modules_guid-generator_guid-generator_module_ts"],{

/***/ 2052:
/*!*************************************************************************!*\
  !*** ./src/app/modules/guid-generator/guid-generator-routing.module.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GuidGeneratorRoutingModule: () => (/* binding */ GuidGeneratorRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 7947);
/* harmony import */ var _guid_generator_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./guid-generator.component */ 5105);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 1699);
var _class;




const routes = [{
  path: '',
  component: _guid_generator_component__WEBPACK_IMPORTED_MODULE_0__.GuidGeneratorComponent
}];
class GuidGeneratorRoutingModule {}
_class = GuidGeneratorRoutingModule;
_class.ɵfac = function GuidGeneratorRoutingModule_Factory(t) {
  return new (t || _class)();
};
_class.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
  type: _class
});
_class.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](GuidGeneratorRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
})();

/***/ }),

/***/ 5105:
/*!********************************************************************!*\
  !*** ./src/app/modules/guid-generator/guid-generator.component.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GuidGeneratorComponent: () => (/* binding */ GuidGeneratorComponent)
/* harmony export */ });
/* harmony import */ var _Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 1670);
/* harmony import */ var src_environments_component_config_guid_generator_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/environments/component-config/guid-generator/config */ 8909);
/* harmony import */ var guid_typescript__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! guid-typescript */ 8192);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/cdk/clipboard */ 4362);
/* harmony import */ var src_app_service_file_file_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/service/file/file.service */ 6857);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/icon */ 6515);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/button */ 895);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/input */ 26);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/form-field */ 1333);

var _class;










const _c0 = ["bulkUUIDInput"];
function GuidGeneratorComponent_span_22_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "span", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "*Max allowed value is 1000");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function GuidGeneratorComponent_div_25_span_1_Template(rf, ctx) {
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
function GuidGeneratorComponent_div_25_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](1, GuidGeneratorComponent_div_25_span_1_Template, 2, 1, "span", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", ctx_r2.bulkUUIDs);
  }
}
class GuidGeneratorComponent {
  constructor(clipboard, fileService, renderer) {
    this.clipboard = clipboard;
    this.fileService = fileService;
    this.renderer = renderer;
    this.bulkUUIDs = [];
    this.bulkUUIDError = false;
    this.applicationConfig = src_environments_component_config_guid_generator_config__WEBPACK_IMPORTED_MODULE_1__.componentConfig;
    this.descriptionData = src_environments_component_config_guid_generator_config__WEBPACK_IMPORTED_MODULE_1__.descriptionData;
    this.currentUUID = guid_typescript__WEBPACK_IMPORTED_MODULE_2__.Guid.create().toString();
  }
  generateUUID() {
    this.currentUUID = guid_typescript__WEBPACK_IMPORTED_MODULE_2__.Guid.create().toString();
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
        this.bulkUUIDs.push(guid_typescript__WEBPACK_IMPORTED_MODULE_2__.Guid.create().toString());
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
          string = string.concat(...[guid_typescript__WEBPACK_IMPORTED_MODULE_2__.Guid.create().toString(), '\r\n']);
        }
        _this.fileService.downloadFile(`bulk-guid-${count}.txt`, new Blob([string], {
          type: 'plain/text'
        }), _this.renderer);
      } else {
        _this.bulkUUIDError = true;
      }
    })();
  }
}
_class = GuidGeneratorComponent;
_class.ɵfac = function GuidGeneratorComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_5__.Clipboard), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](src_app_service_file_file_service__WEBPACK_IMPORTED_MODULE_3__.FileService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_4__.Renderer2));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["app-guid-generator"]],
  viewQuery: function GuidGeneratorComponent_Query(rf, ctx) {
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
  consts: [[1, "flex-display", "flex-column-flow", "flex-align-center", "uuid-app", "border-grey", "flex-gap-large", "full-width"], [1, "flex-display", "flex-align-center", "uid-div", "flex-gap-medium"], [1, "uuid-class", 2, "color", "#ff4081"], ["mat-stroked-button", "", "color", "primary", 3, "click"], [1, "flex-display", "flex-column-flow", "flex-align-center", "flex-gap-medium"], [1, "bold-text", 2, "font-size", "large"], ["appearance", "outline"], ["type", "number", "matInput", "", "placeholder", "Max 1000", "value", "5", "min", "0", "max", "1000"], ["bulkUUIDInput", ""], ["mat-raised-button", "", "matTextSuffix", "", "aria-label", "Clear", 3, "click"], ["style", "color: red", 4, "ngIf"], ["href", "#", 3, "click"], ["class", "flex-display flex-column-flow flex-center flex-align-center bulk-uuids border-grey y-scroll", "style", "max-height: 200px", 4, "ngIf"], [2, "color", "red"], [1, "flex-display", "flex-column-flow", "flex-center", "flex-align-center", "bulk-uuids", "border-grey", "y-scroll", 2, "max-height", "200px"], [4, "ngFor", "ngForOf"]],
  template: function GuidGeneratorComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "span", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](4, "button", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function GuidGeneratorComponent_Template_button_click_4_listener() {
        return ctx.copyGeneratedId();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](5, "mat-icon");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](6, "content_copy");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](7, " Copy ");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](8, "button", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function GuidGeneratorComponent_Template_button_click_8_listener() {
        return ctx.generateUUID();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](9, "mat-icon");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](10, "repeat");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](11, " Generate Again ");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](12, "div", 4)(13, "span", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](14, "Bulk GUID Generator");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](15, "mat-form-field", 6)(16, "mat-label");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](17, "Enter GUIDs Count");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](18, "input", 7, 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](20, "button", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function GuidGeneratorComponent_Template_button_click_20_listener() {
        return ctx.generateBulkUUID();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](21, " Generate ");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](22, GuidGeneratorComponent_span_22_Template, 2, 0, "span", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](23, "a", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function GuidGeneratorComponent_Template_a_click_23_listener($event) {
        return ctx.downloadUUIDs($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](24, "Download to a file");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](25, GuidGeneratorComponent_div_25_Template, 2, 1, "div", 12);
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
  styles: [".uuid-class[_ngcontent-%COMP%] {\n  font-size: xx-large;\n}\n\n.uuid-app[_ngcontent-%COMP%] {\n  padding-top: 20px;\n  padding-bottom: 15px;\n  border-radius: 10px;\n}\n\n.bulk-uuids[_ngcontent-%COMP%] {\n  padding: 15px;\n  border-radius: 10px;\n}\n\n@media screen and (max-width: 735px) {\n  .uid-div[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .uuid-class[_ngcontent-%COMP%] {\n    font-size: larger;\n  }\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvbW9kdWxlcy9ndWlkLWdlbmVyYXRvci9ndWlkLWdlbmVyYXRvci5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLG1CQUFBO0FBQ0Y7O0FBRUE7RUFDRSxpQkFBQTtFQUNBLG9CQUFBO0VBQ0EsbUJBQUE7QUFDRjs7QUFFQTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtBQUNGOztBQUVBO0VBQ0U7SUFDRSxzQkFBQTtFQUNGO0VBQ0E7SUFDRSxpQkFBQTtFQUNGO0FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIudXVpZC1jbGFzcyB7XG4gIGZvbnQtc2l6ZTogeHgtbGFyZ2U7XG59XG5cbi51dWlkLWFwcCB7XG4gIHBhZGRpbmctdG9wOiAyMHB4O1xuICBwYWRkaW5nLWJvdHRvbTogMTVweDtcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcbn1cblxuLmJ1bGstdXVpZHMge1xuICBwYWRkaW5nOiAxNXB4O1xuICBib3JkZXItcmFkaXVzOiAxMHB4O1xufVxuXG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA3MzVweCkge1xuICAudWlkLWRpdiB7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgfVxuICAudXVpZC1jbGFzcyB7XG4gICAgZm9udC1zaXplOiBsYXJnZXI7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
});

/***/ }),

/***/ 1013:
/*!*****************************************************************!*\
  !*** ./src/app/modules/guid-generator/guid-generator.module.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GuidGeneratorModule: () => (/* binding */ GuidGeneratorModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _guid_generator_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./guid-generator-routing.module */ 2052);
/* harmony import */ var _angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/cdk/clipboard */ 4362);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/button */ 895);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/icon */ 6515);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/input */ 26);
/* harmony import */ var _guid_generator_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./guid-generator.component */ 5105);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 1699);
var _class;








class GuidGeneratorModule {}
_class = GuidGeneratorModule;
_class.ɵfac = function GuidGeneratorModule_Factory(t) {
  return new (t || _class)();
};
_class.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
  type: _class
});
_class.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _guid_generator_routing_module__WEBPACK_IMPORTED_MODULE_0__.GuidGeneratorRoutingModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__.MatIconModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_5__.MatButtonModule, _angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_6__.ClipboardModule, _angular_material_input__WEBPACK_IMPORTED_MODULE_7__.MatInputModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](GuidGeneratorModule, {
    declarations: [_guid_generator_component__WEBPACK_IMPORTED_MODULE_1__.GuidGeneratorComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _guid_generator_routing_module__WEBPACK_IMPORTED_MODULE_0__.GuidGeneratorRoutingModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__.MatIconModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_5__.MatButtonModule, _angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_6__.ClipboardModule, _angular_material_input__WEBPACK_IMPORTED_MODULE_7__.MatInputModule]
  });
})();

/***/ }),

/***/ 8909:
/*!********************************************************************!*\
  !*** ./src/environments/component-config/guid-generator/config.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   componentConfig: () => (/* binding */ componentConfig),
/* harmony export */   descriptionData: () => (/* binding */ descriptionData)
/* harmony export */ });
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/environments/environment */ 553);
/* harmony import */ var src_environments_tools_directory_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/environments/tools-directory-config */ 6636);


const navigationUrl = '/tools/guid-generator';
const pageTitle = 'GUID Generator: Online Tool to Generate GUIDs | Bulk GUIDs';
const pageDescription = 'Our free online GUID generator tool is a quick and easy way to generate globally unique identifiers (GUIDs), either individually or in bulk.';
const imageUrl = `${src_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.screenshotsBaseUrl}/guid-generator.png`;
const keywords = 'GUID generator, GUID generator online, GUID generator free, GUID, globally unique identifier, UUID, universally unique identifier, generate GUID, generate GUID online, generate GUID free, single GUID, bulk GUID, bulk GUID generator';
const relatedTools = [src_environments_tools_directory_config__WEBPACK_IMPORTED_MODULE_1__.ApplicationIds.JWT_DECODER, src_environments_tools_directory_config__WEBPACK_IMPORTED_MODULE_1__.ApplicationIds.UUID_VERSION1_GENERATOR, src_environments_tools_directory_config__WEBPACK_IMPORTED_MODULE_1__.ApplicationIds.UUID_VERSION4_GENERATOR];
const componentConfig = {
  mainHeading: 'GUID Generator Tool - Generate Single or Bulk Globally Unique Identifiers (GUIDs) Online',
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
  blockData: ['Globally unique identifiers (GUIDs) are also known as universally unique identifiers (UUIDs). They are 128-bit numbers that are used to identify information in computer systems. GUIDs are generated using a variety of methods, but all GUIDs are designed to be unique.', 'GUIDs are used in a variety of applications, such as database identifiers, session identifiers, and file identifiers. They are also used in some security applications, such as encryption and authentication.', 'Our free online GUID generator tool makes it easy to generate GUIDs, whether you need one or many. To use the tool, simply enter the number of GUIDs you need in the text box and click the "Generate" button. The tool will instantly generate a list of GUIDs and show it to you. You can then copy and paste the list of GUIDs into your application.']
}, {
  heading: 'Here are some of the benefits of using our free online GUID generator tool:',
  listData: [`It's quick and easy to use.`, `It's completely free.`, `It can generate single or bulk GUIDs.`, `It generates random and unique GUIDs.`, `It's perfect for developers, testers, and anyone else who needs to generate GUIDs.`, `It's great for learning more about GUIDs and how they work.`]
}, {
  heading: 'Here are some examples of how you can use our free online GUID generator tool:',
  listData: ['Developers can use the tool to generate GUIDs for database identifiers, session identifiers, and file identifiers.', 'Testers can use the tool to generate GUIDs for test data.', 'Anyone can use the tool to generate GUIDs for any reason.']
}, {
  blockData: ['No matter what your needs are, our free online GUID generator tool is a valuable resource. Try it today and see how easy it is to use!']
}, {
  heading: 'What is a GUID?',
  blockData: ['A GUID is a globally unique identifier, also known as a universally unique identifier (UUID). It is a 128-bit number that is used to identify information in computer systems. GUIDs are generated using a variety of methods, but all GUIDs are designed to be unique.']
}, {
  heading: 'How to use our GUID generator tool:',
  blockData: ['To use our GUID generator tool, simply enter the number of GUIDs you need in the text box and click the "Generate" button. The tool will instantly generate a list of GUIDs and show it to you. You can then copy and paste the list of GUIDs into your application.']
}, {
  heading: 'Tips for using our GUID generator tool:',
  listData: ['You can generate as many GUIDs as you need.', 'You can also use our GUID generator tool to generate GUIDs in different formats, such as hexadecimal, base64, and URL safe.']
}, {
  blockData: ['We hope you find our free online GUID generator tool helpful!']
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

/***/ 8192:
/*!***************************************************!*\
  !*** ./node_modules/guid-typescript/dist/guid.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports) => {



exports.__esModule = true;
var Guid = /** @class */function () {
  function Guid(guid) {
    if (!guid) {
      throw new TypeError("Invalid argument; `value` has no value.");
    }
    this.value = Guid.EMPTY;
    if (guid && Guid.isGuid(guid)) {
      this.value = guid;
    }
  }
  Guid.isGuid = function (guid) {
    var value = guid.toString();
    return guid && (guid instanceof Guid || Guid.validator.test(value));
  };
  Guid.create = function () {
    return new Guid([Guid.gen(2), Guid.gen(1), Guid.gen(1), Guid.gen(1), Guid.gen(3)].join("-"));
  };
  Guid.createEmpty = function () {
    return new Guid("emptyguid");
  };
  Guid.parse = function (guid) {
    return new Guid(guid);
  };
  Guid.raw = function () {
    return [Guid.gen(2), Guid.gen(1), Guid.gen(1), Guid.gen(1), Guid.gen(3)].join("-");
  };
  Guid.gen = function (count) {
    var out = "";
    for (var i = 0; i < count; i++) {
      // tslint:disable-next-line:no-bitwise
      out += ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
    }
    return out;
  };
  Guid.prototype.equals = function (other) {
    // Comparing string `value` against provided `guid` will auto-call
    // toString on `guid` for comparison
    return Guid.isGuid(other) && this.value === other.toString();
  };
  Guid.prototype.isEmpty = function () {
    return this.value === Guid.EMPTY;
  };
  Guid.prototype.toString = function () {
    return this.value;
  };
  Guid.prototype.toJSON = function () {
    return {
      value: this.value
    };
  };
  Guid.validator = new RegExp("^[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}$", "i");
  Guid.EMPTY = "00000000-0000-0000-0000-000000000000";
  return Guid;
}();
exports.Guid = Guid;

/***/ }),

/***/ 7971:
/*!************************************!*\
  !*** ./src/environments/apps.json ***!
  \************************************/
/***/ ((module) => {

module.exports = JSON.parse('{"xmltojson":{"applicationId":"xmltojson","displayText":"XML to JSON Converter","iconName":"xml-icon","navigateUrl":"/tools/xml-to-json","iconRelativeUrl":"xml.svg"},"qrcodegenerator":{"applicationId":"qrcodegenerator","displayText":"QR Code Generator","iconName":"qr-code","navigateUrl":"/tools/qr-code-generator","iconRelativeUrl":"qr-code.svg"},"wordcounter":{"applicationId":"wordcounter","displayText":"Word Counter","iconName":"word-icon","navigateUrl":"/tools/word-counter","iconRelativeUrl":"word.svg"},"textcompare":{"applicationId":"textcompare","displayText":"Online Text Compare","iconName":"comparison-icon","navigateUrl":"/tools/text-compare","iconRelativeUrl":"comparison.svg"},"markdowneditor":{"applicationId":"markdowneditor","displayText":"Markdown Editor","iconName":"markdown-icon","navigateUrl":"/tools/markdown-editor","iconRelativeUrl":"markdown.svg"},"passwordgenerator":{"applicationId":"passwordgenerator","displayText":"Random Password Generator","iconName":"password-icon","navigateUrl":"/tools/password-generator","iconRelativeUrl":"password.svg"},"videoconverter":{"applicationId":"videoconverter","displayText":"Video to Audio Converter","iconName":"video-convert-icon","navigateUrl":"/tools/video-converter","iconRelativeUrl":"video-convert.svg"},"screenrecorder":{"applicationId":"screenrecorder","displayText":"Free Screen Recorder","iconName":"screen-icon","navigateUrl":"/tools/screen-recorder","iconRelativeUrl":"screen.svg"},"imagecompressor":{"applicationId":"imagecompressor","displayText":"Free Image Compressor","iconName":"image-icon","navigateUrl":"/tools/image-compress","iconRelativeUrl":"image-icon.svg"},"imagecropper":{"applicationId":"imagecropper","displayText":"Free Image Cropper","iconName":"image-icon","navigateUrl":"/tools/crop-image","iconRelativeUrl":"image-icon.svg"},"jwtdecoder":{"applicationId":"jwtdecoder","displayText":"JWT Decoder","iconName":"jwt-icon","navigateUrl":"/tools/jwt","iconRelativeUrl":"jwt-icon.svg"},"jsformatter":{"applicationId":"jsformatter","displayText":"Online Javascript Formatter","iconName":"js-icon","navigateUrl":"/tools/js-formatter","iconRelativeUrl":"js-icon.svg"},"jsonformatter":{"applicationId":"jsonformatter","displayText":"Online JSON Formatter","iconName":"json-icon","navigateUrl":"/tools/json-formatter","iconRelativeUrl":"json-icon.svg"},"jsonviewer":{"applicationId":"jsonviewer","displayText":"Online JSON Viewer","iconName":"json-icon","navigateUrl":"/tools/json-viewer","iconRelativeUrl":"json-icon.svg"},"htmlformatter":{"applicationId":"htmlformatter","displayText":"Online HTML Formatter","iconName":"html-icon","navigateUrl":"/tools/html-formatter","iconRelativeUrl":"html.svg"},"cssformatter":{"applicationId":"cssformatter","displayText":"Online CSS Formatter","iconName":"css-icon","navigateUrl":"/tools/css-formatter","iconRelativeUrl":"css.svg"},"base64encoder":{"applicationId":"base64encoder","displayText":"Base64 Encoder","iconName":"file-encode-icon","navigateUrl":"/tools/base64-encode","iconRelativeUrl":"file-encode.svg"},"base64decoder":{"applicationId":"base64decoder","displayText":"Base64 Decoder","iconName":"file-decode-icon","navigateUrl":"/tools/base64-decode","iconRelativeUrl":"file-decode.svg"},"crongenerator":{"applicationId":"crongenerator","displayText":"Cron Expression Generator","iconName":"cron-icon","navigateUrl":"/tools/cron-expression","iconRelativeUrl":"cron.svg"},"uuidv4generator":{"applicationId":"uuidv4generator","displayText":"UUID V4 Generator","iconName":"uuid-icon","navigateUrl":"/tools/uuid-v4-generator","iconRelativeUrl":"uuid-icon.svg"},"uuidv1generator":{"applicationId":"uuidv1generator","displayText":"UUID V1 Generator","iconName":"uuid-icon","navigateUrl":"/tools/uuid-v1-generator","iconRelativeUrl":"uuid-icon.svg"},"guidgenerator":{"applicationId":"guidgenerator","displayText":"GUID Generator","iconName":"uuid-icon","navigateUrl":"/tools/guid-generator","iconRelativeUrl":"uuid-icon.svg"}}');

/***/ })

}]);
//# sourceMappingURL=src_app_modules_guid-generator_guid-generator_module_ts.8d1c2f7a05d4797d.js.map