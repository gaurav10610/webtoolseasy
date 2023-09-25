"use strict";
exports.id = 711;
exports.ids = [711];
exports.modules = {

/***/ 47153:
/*!*******************************************************************************************!*\
  !*** ./src/app/modules/uuid-version4-generator/uuid-version4-generator-routing.module.ts ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UuidVersion4GeneratorRoutingModule: () => (/* binding */ UuidVersion4GeneratorRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 68804);
/* harmony import */ var _uuid_version4_generator_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./uuid-version4-generator.component */ 9587);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 59936);




const routes = [{
  path: '',
  component: _uuid_version4_generator_component__WEBPACK_IMPORTED_MODULE_0__.UuidVersion4GeneratorComponent
}];
let UuidVersion4GeneratorRoutingModule = /*#__PURE__*/(() => {
  var _class;
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
  return UuidVersion4GeneratorRoutingModule;
})();
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](UuidVersion4GeneratorRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
})();

/***/ }),

/***/ 9587:
/*!**************************************************************************************!*\
  !*** ./src/app/modules/uuid-version4-generator/uuid-version4-generator.component.ts ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UuidVersion4GeneratorComponent: () => (/* binding */ UuidVersion4GeneratorComponent)
/* harmony export */ });
/* harmony import */ var _Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 70734);
/* harmony import */ var src_environments_component_config_uuid_version4_generator_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/environments/component-config/uuid-version4-generator/config */ 94797);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 59936);
/* harmony import */ var _angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/cdk/clipboard */ 85831);
/* harmony import */ var src_app_service_file_file_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/service/file/file.service */ 88280);
/* harmony import */ var src_app_service_platform_metadata_platform_metadata_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/service/platform-metadata/platform-metadata.service */ 26363);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 34228);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/icon */ 59049);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/button */ 63490);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/input */ 32755);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/form-field */ 73637);











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
let UuidVersion4GeneratorComponent = /*#__PURE__*/(() => {
  var _class;
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
  return UuidVersion4GeneratorComponent;
})();

/***/ }),

/***/ 19711:
/*!***********************************************************************************!*\
  !*** ./src/app/modules/uuid-version4-generator/uuid-version4-generator.module.ts ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UuidVersion4GeneratorModule: () => (/* binding */ UuidVersion4GeneratorModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 34228);
/* harmony import */ var _uuid_version4_generator_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./uuid-version4-generator-routing.module */ 47153);
/* harmony import */ var _angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/cdk/clipboard */ 85831);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/button */ 63490);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/icon */ 59049);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/input */ 32755);
/* harmony import */ var _uuid_version4_generator_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./uuid-version4-generator.component */ 9587);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 59936);








let UuidVersion4GeneratorModule = /*#__PURE__*/(() => {
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
  return UuidVersion4GeneratorModule;
})();
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](UuidVersion4GeneratorModule, {
    declarations: [_uuid_version4_generator_component__WEBPACK_IMPORTED_MODULE_1__.UuidVersion4GeneratorComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _uuid_version4_generator_routing_module__WEBPACK_IMPORTED_MODULE_0__.UuidVersion4GeneratorRoutingModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__.MatIconModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_5__.MatButtonModule, _angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_6__.ClipboardModule, _angular_material_input__WEBPACK_IMPORTED_MODULE_7__.MatInputModule]
  });
})();

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

/***/ 94797:
/*!*****************************************************************************!*\
  !*** ./src/environments/component-config/uuid-version4-generator/config.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   componentConfig: () => (/* binding */ componentConfig),
/* harmony export */   descriptionData: () => (/* binding */ descriptionData)
/* harmony export */ });
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/environments/environment */ 56316);
/* harmony import */ var src_environments_tools_directory_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/environments/tools-directory-config */ 12313);


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

/***/ 17033:
/*!******************************************************************!*\
  !*** ./node_modules/@angular/cdk/fesm2022/observers/private.mjs ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SharedResizeObserver: () => (/* binding */ SharedResizeObserver)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 59936);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ 85028);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ 33410);





/**
 * Handler that logs "ResizeObserver loop limit exceeded" errors.
 * These errors are not shown in the Chrome console, so we log them to ensure developers are aware.
 * @param e The error
 */
const loopLimitExceededErrorHandler = e => {
  if (e instanceof Error && e.message === 'ResizeObserver loop limit exceeded') {
    console.error(`${e.message}. This could indicate a performance issue with your app. See https://github.com/WICG/resize-observer/blob/master/explainer.md#error-handling`);
  }
};
/**
 * A shared ResizeObserver to be used for a particular box type (content-box, border-box, or
 * device-pixel-content-box)
 */
class SingleBoxSharedResizeObserver {
  constructor( /** The box type to observe for resizes. */
  _box) {
    this._box = _box;
    /** Stream that emits when the shared observer is destroyed. */
    this._destroyed = new rxjs__WEBPACK_IMPORTED_MODULE_0__.Subject();
    /** Stream of all events from the ResizeObserver. */
    this._resizeSubject = new rxjs__WEBPACK_IMPORTED_MODULE_0__.Subject();
    /** A map of elements to streams of their resize events. */
    this._elementObservables = new Map();
    if (typeof ResizeObserver !== 'undefined') {
      this._resizeObserver = new ResizeObserver(entries => this._resizeSubject.next(entries));
    }
  }
  /**
   * Gets a stream of resize events for the given element.
   * @param target The element to observe.
   * @return The stream of resize events for the element.
   */
  observe(target) {
    if (!this._elementObservables.has(target)) {
      this._elementObservables.set(target, new rxjs__WEBPACK_IMPORTED_MODULE_0__.Observable(observer => {
        const subscription = this._resizeSubject.subscribe(observer);
        this._resizeObserver?.observe(target, {
          box: this._box
        });
        return () => {
          this._resizeObserver?.unobserve(target);
          subscription.unsubscribe();
          this._elementObservables.delete(target);
        };
      }).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.filter)(entries => entries.some(entry => entry.target === target)),
      // Share a replay of the last event so that subsequent calls to observe the same element
      // receive initial sizing info like the first one. Also enable ref counting so the
      // element will be automatically unobserved when there are no more subscriptions.
      (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.shareReplay)({
        bufferSize: 1,
        refCount: true
      }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.takeUntil)(this._destroyed)));
    }
    return this._elementObservables.get(target);
  }
  /** Destroys this instance. */
  destroy() {
    this._destroyed.next();
    this._destroyed.complete();
    this._resizeSubject.complete();
    this._elementObservables.clear();
  }
}
/**
 * Allows observing resize events on multiple elements using a shared set of ResizeObserver.
 * Sharing a ResizeObserver instance is recommended for better performance (see
 * https://github.com/WICG/resize-observer/issues/59).
 *
 * Rather than share a single `ResizeObserver`, this class creates one `ResizeObserver` per type
 * of observed box ('content-box', 'border-box', and 'device-pixel-content-box'). This avoids
 * later calls to `observe` with a different box type from influencing the events dispatched to
 * earlier calls.
 */
let SharedResizeObserver = /*#__PURE__*/(() => {
  var _class;
  class SharedResizeObserver {
    constructor() {
      /** Map of box type to shared resize observer. */
      this._observers = new Map();
      /** The Angular zone. */
      this._ngZone = (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.inject)(_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgZone);
      if (typeof ResizeObserver !== 'undefined' && (typeof ngDevMode === 'undefined' || ngDevMode)) {
        this._ngZone.runOutsideAngular(() => {
          window.addEventListener('error', loopLimitExceededErrorHandler);
        });
      }
    }
    ngOnDestroy() {
      for (const [, observer] of this._observers) {
        observer.destroy();
      }
      this._observers.clear();
      if (typeof ResizeObserver !== 'undefined' && (typeof ngDevMode === 'undefined' || ngDevMode)) {
        window.removeEventListener('error', loopLimitExceededErrorHandler);
      }
    }
    /**
     * Gets a stream of resize events for the given target element and box type.
     * @param target The element to observe for resizes.
     * @param options Options to pass to the `ResizeObserver`
     * @return The stream of resize events for the element.
     */
    observe(target, options) {
      const box = options?.box || 'content-box';
      if (!this._observers.has(box)) {
        this._observers.set(box, new SingleBoxSharedResizeObserver(box));
      }
      return this._observers.get(box).observe(target);
    }
  }
  _class = SharedResizeObserver;
  _class.ɵfac = function _class_Factory(t) {
    return new (t || _class)();
  };
  _class.ɵprov = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
    token: _class,
    factory: _class.ɵfac,
    providedIn: 'root'
  });
  return SharedResizeObserver;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();

/**
 * Generated bundle index. Do not edit.
 */



/***/ }),

/***/ 29557:
/*!***********************************************************!*\
  !*** ./node_modules/@angular/cdk/fesm2022/text-field.mjs ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AutofillMonitor: () => (/* binding */ AutofillMonitor),
/* harmony export */   CdkAutofill: () => (/* binding */ CdkAutofill),
/* harmony export */   CdkTextareaAutosize: () => (/* binding */ CdkTextareaAutosize),
/* harmony export */   TextFieldModule: () => (/* binding */ TextFieldModule)
/* harmony export */ });
/* harmony import */ var _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/cdk/platform */ 92237);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 59936);
/* harmony import */ var _angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/cdk/coercion */ 45029);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 85028);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ 33410);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 34228);









/** Options to pass to the animationstart listener. */
const listenerOptions = /*#__PURE__*/(0,_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_0__.normalizePassiveListenerOptions)({
  passive: true
});
/**
 * An injectable service that can be used to monitor the autofill state of an input.
 * Based on the following blog post:
 * https://medium.com/@brunn/detecting-autofilled-fields-in-javascript-aed598d25da7
 */
let AutofillMonitor = /*#__PURE__*/(() => {
  var _class;
  class AutofillMonitor {
    constructor(_platform, _ngZone) {
      this._platform = _platform;
      this._ngZone = _ngZone;
      this._monitoredElements = new Map();
    }
    monitor(elementOrRef) {
      if (!this._platform.isBrowser) {
        return rxjs__WEBPACK_IMPORTED_MODULE_1__.EMPTY;
      }
      const element = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_2__.coerceElement)(elementOrRef);
      const info = this._monitoredElements.get(element);
      if (info) {
        return info.subject;
      }
      const result = new rxjs__WEBPACK_IMPORTED_MODULE_1__.Subject();
      const cssClass = 'cdk-text-field-autofilled';
      const listener = event => {
        // Animation events fire on initial element render, we check for the presence of the autofill
        // CSS class to make sure this is a real change in state, not just the initial render before
        // we fire off events.
        if (event.animationName === 'cdk-text-field-autofill-start' && !element.classList.contains(cssClass)) {
          element.classList.add(cssClass);
          this._ngZone.run(() => result.next({
            target: event.target,
            isAutofilled: true
          }));
        } else if (event.animationName === 'cdk-text-field-autofill-end' && element.classList.contains(cssClass)) {
          element.classList.remove(cssClass);
          this._ngZone.run(() => result.next({
            target: event.target,
            isAutofilled: false
          }));
        }
      };
      this._ngZone.runOutsideAngular(() => {
        element.addEventListener('animationstart', listener, listenerOptions);
        element.classList.add('cdk-text-field-autofill-monitored');
      });
      this._monitoredElements.set(element, {
        subject: result,
        unlisten: () => {
          element.removeEventListener('animationstart', listener, listenerOptions);
        }
      });
      return result;
    }
    stopMonitoring(elementOrRef) {
      const element = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_2__.coerceElement)(elementOrRef);
      const info = this._monitoredElements.get(element);
      if (info) {
        info.unlisten();
        info.subject.complete();
        element.classList.remove('cdk-text-field-autofill-monitored');
        element.classList.remove('cdk-text-field-autofilled');
        this._monitoredElements.delete(element);
      }
    }
    ngOnDestroy() {
      this._monitoredElements.forEach((_info, element) => this.stopMonitoring(element));
    }
  }
  _class = AutofillMonitor;
  _class.ɵfac = function _class_Factory(t) {
    return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_0__.Platform), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgZone));
  };
  _class.ɵprov = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({
    token: _class,
    factory: _class.ɵfac,
    providedIn: 'root'
  });
  return AutofillMonitor;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
/** A directive that can be used to monitor the autofill state of an input. */
let CdkAutofill = /*#__PURE__*/(() => {
  var _class2;
  class CdkAutofill {
    constructor(_elementRef, _autofillMonitor) {
      this._elementRef = _elementRef;
      this._autofillMonitor = _autofillMonitor;
      /** Emits when the autofill state of the element changes. */
      this.cdkAutofill = new _angular_core__WEBPACK_IMPORTED_MODULE_3__.EventEmitter();
    }
    ngOnInit() {
      this._autofillMonitor.monitor(this._elementRef).subscribe(event => this.cdkAutofill.emit(event));
    }
    ngOnDestroy() {
      this._autofillMonitor.stopMonitoring(this._elementRef);
    }
  }
  _class2 = CdkAutofill;
  _class2.ɵfac = function _class2_Factory(t) {
    return new (t || _class2)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_3__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](AutofillMonitor));
  };
  _class2.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineDirective"]({
    type: _class2,
    selectors: [["", "cdkAutofill", ""]],
    outputs: {
      cdkAutofill: "cdkAutofill"
    }
  });
  return CdkAutofill;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();

/** Directive to automatically resize a textarea to fit its content. */
let CdkTextareaAutosize = /*#__PURE__*/(() => {
  var _class3;
  class CdkTextareaAutosize {
    /** Minimum amount of rows in the textarea. */
    get minRows() {
      return this._minRows;
    }
    set minRows(value) {
      this._minRows = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_2__.coerceNumberProperty)(value);
      this._setMinHeight();
    }
    /** Maximum amount of rows in the textarea. */
    get maxRows() {
      return this._maxRows;
    }
    set maxRows(value) {
      this._maxRows = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_2__.coerceNumberProperty)(value);
      this._setMaxHeight();
    }
    /** Whether autosizing is enabled or not */
    get enabled() {
      return this._enabled;
    }
    set enabled(value) {
      value = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_2__.coerceBooleanProperty)(value);
      // Only act if the actual value changed. This specifically helps to not run
      // resizeToFitContent too early (i.e. before ngAfterViewInit)
      if (this._enabled !== value) {
        (this._enabled = value) ? this.resizeToFitContent(true) : this.reset();
      }
    }
    get placeholder() {
      return this._textareaElement.placeholder;
    }
    set placeholder(value) {
      this._cachedPlaceholderHeight = undefined;
      if (value) {
        this._textareaElement.setAttribute('placeholder', value);
      } else {
        this._textareaElement.removeAttribute('placeholder');
      }
      this._cacheTextareaPlaceholderHeight();
    }
    constructor(_elementRef, _platform, _ngZone, /** @breaking-change 11.0.0 make document required */
    document) {
      this._elementRef = _elementRef;
      this._platform = _platform;
      this._ngZone = _ngZone;
      this._destroyed = new rxjs__WEBPACK_IMPORTED_MODULE_1__.Subject();
      this._enabled = true;
      /**
       * Value of minRows as of last resize. If the minRows has decreased, the
       * height of the textarea needs to be recomputed to reflect the new minimum. The maxHeight
       * does not have the same problem because it does not affect the textarea's scrollHeight.
       */
      this._previousMinRows = -1;
      this._isViewInited = false;
      /** Handles `focus` and `blur` events. */
      this._handleFocusEvent = event => {
        this._hasFocus = event.type === 'focus';
      };
      this._document = document;
      this._textareaElement = this._elementRef.nativeElement;
    }
    /** Sets the minimum height of the textarea as determined by minRows. */
    _setMinHeight() {
      const minHeight = this.minRows && this._cachedLineHeight ? `${this.minRows * this._cachedLineHeight}px` : null;
      if (minHeight) {
        this._textareaElement.style.minHeight = minHeight;
      }
    }
    /** Sets the maximum height of the textarea as determined by maxRows. */
    _setMaxHeight() {
      const maxHeight = this.maxRows && this._cachedLineHeight ? `${this.maxRows * this._cachedLineHeight}px` : null;
      if (maxHeight) {
        this._textareaElement.style.maxHeight = maxHeight;
      }
    }
    ngAfterViewInit() {
      if (this._platform.isBrowser) {
        // Remember the height which we started with in case autosizing is disabled
        this._initialHeight = this._textareaElement.style.height;
        this.resizeToFitContent();
        this._ngZone.runOutsideAngular(() => {
          const window = this._getWindow();
          (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.fromEvent)(window, 'resize').pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.auditTime)(16), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.takeUntil)(this._destroyed)).subscribe(() => this.resizeToFitContent(true));
          this._textareaElement.addEventListener('focus', this._handleFocusEvent);
          this._textareaElement.addEventListener('blur', this._handleFocusEvent);
        });
        this._isViewInited = true;
        this.resizeToFitContent(true);
      }
    }
    ngOnDestroy() {
      this._textareaElement.removeEventListener('focus', this._handleFocusEvent);
      this._textareaElement.removeEventListener('blur', this._handleFocusEvent);
      this._destroyed.next();
      this._destroyed.complete();
    }
    /**
     * Cache the height of a single-row textarea if it has not already been cached.
     *
     * We need to know how large a single "row" of a textarea is in order to apply minRows and
     * maxRows. For the initial version, we will assume that the height of a single line in the
     * textarea does not ever change.
     */
    _cacheTextareaLineHeight() {
      if (this._cachedLineHeight) {
        return;
      }
      // Use a clone element because we have to override some styles.
      let textareaClone = this._textareaElement.cloneNode(false);
      textareaClone.rows = 1;
      // Use `position: absolute` so that this doesn't cause a browser layout and use
      // `visibility: hidden` so that nothing is rendered. Clear any other styles that
      // would affect the height.
      textareaClone.style.position = 'absolute';
      textareaClone.style.visibility = 'hidden';
      textareaClone.style.border = 'none';
      textareaClone.style.padding = '0';
      textareaClone.style.height = '';
      textareaClone.style.minHeight = '';
      textareaClone.style.maxHeight = '';
      // In Firefox it happens that textarea elements are always bigger than the specified amount
      // of rows. This is because Firefox tries to add extra space for the horizontal scrollbar.
      // As a workaround that removes the extra space for the scrollbar, we can just set overflow
      // to hidden. This ensures that there is no invalid calculation of the line height.
      // See Firefox bug report: https://bugzilla.mozilla.org/show_bug.cgi?id=33654
      textareaClone.style.overflow = 'hidden';
      this._textareaElement.parentNode.appendChild(textareaClone);
      this._cachedLineHeight = textareaClone.clientHeight;
      textareaClone.remove();
      // Min and max heights have to be re-calculated if the cached line height changes
      this._setMinHeight();
      this._setMaxHeight();
    }
    _measureScrollHeight() {
      const element = this._textareaElement;
      const previousMargin = element.style.marginBottom || '';
      const isFirefox = this._platform.FIREFOX;
      const needsMarginFiller = isFirefox && this._hasFocus;
      const measuringClass = isFirefox ? 'cdk-textarea-autosize-measuring-firefox' : 'cdk-textarea-autosize-measuring';
      // In some cases the page might move around while we're measuring the `textarea` on Firefox. We
      // work around it by assigning a temporary margin with the same height as the `textarea` so that
      // it occupies the same amount of space. See #23233.
      if (needsMarginFiller) {
        element.style.marginBottom = `${element.clientHeight}px`;
      }
      // Reset the textarea height to auto in order to shrink back to its default size.
      // Also temporarily force overflow:hidden, so scroll bars do not interfere with calculations.
      element.classList.add(measuringClass);
      // The measuring class includes a 2px padding to workaround an issue with Chrome,
      // so we account for that extra space here by subtracting 4 (2px top + 2px bottom).
      const scrollHeight = element.scrollHeight - 4;
      element.classList.remove(measuringClass);
      if (needsMarginFiller) {
        element.style.marginBottom = previousMargin;
      }
      return scrollHeight;
    }
    _cacheTextareaPlaceholderHeight() {
      if (!this._isViewInited || this._cachedPlaceholderHeight != undefined) {
        return;
      }
      if (!this.placeholder) {
        this._cachedPlaceholderHeight = 0;
        return;
      }
      const value = this._textareaElement.value;
      this._textareaElement.value = this._textareaElement.placeholder;
      this._cachedPlaceholderHeight = this._measureScrollHeight();
      this._textareaElement.value = value;
    }
    ngDoCheck() {
      if (this._platform.isBrowser) {
        this.resizeToFitContent();
      }
    }
    /**
     * Resize the textarea to fit its content.
     * @param force Whether to force a height recalculation. By default the height will be
     *    recalculated only if the value changed since the last call.
     */
    resizeToFitContent(force = false) {
      // If autosizing is disabled, just skip everything else
      if (!this._enabled) {
        return;
      }
      this._cacheTextareaLineHeight();
      this._cacheTextareaPlaceholderHeight();
      // If we haven't determined the line-height yet, we know we're still hidden and there's no point
      // in checking the height of the textarea.
      if (!this._cachedLineHeight) {
        return;
      }
      const textarea = this._elementRef.nativeElement;
      const value = textarea.value;
      // Only resize if the value or minRows have changed since these calculations can be expensive.
      if (!force && this._minRows === this._previousMinRows && value === this._previousValue) {
        return;
      }
      const scrollHeight = this._measureScrollHeight();
      const height = Math.max(scrollHeight, this._cachedPlaceholderHeight || 0);
      // Use the scrollHeight to know how large the textarea *would* be if fit its entire value.
      textarea.style.height = `${height}px`;
      this._ngZone.runOutsideAngular(() => {
        if (typeof requestAnimationFrame !== 'undefined') {
          requestAnimationFrame(() => this._scrollToCaretPosition(textarea));
        } else {
          setTimeout(() => this._scrollToCaretPosition(textarea));
        }
      });
      this._previousValue = value;
      this._previousMinRows = this._minRows;
    }
    /**
     * Resets the textarea to its original size
     */
    reset() {
      // Do not try to change the textarea, if the initialHeight has not been determined yet
      // This might potentially remove styles when reset() is called before ngAfterViewInit
      if (this._initialHeight !== undefined) {
        this._textareaElement.style.height = this._initialHeight;
      }
    }
    _noopInputHandler() {
      // no-op handler that ensures we're running change detection on input events.
    }
    /** Access injected document if available or fallback to global document reference */
    _getDocument() {
      return this._document || document;
    }
    /** Use defaultView of injected document if available or fallback to global window reference */
    _getWindow() {
      const doc = this._getDocument();
      return doc.defaultView || window;
    }
    /**
     * Scrolls a textarea to the caret position. On Firefox resizing the textarea will
     * prevent it from scrolling to the caret position. We need to re-set the selection
     * in order for it to scroll to the proper position.
     */
    _scrollToCaretPosition(textarea) {
      const {
        selectionStart,
        selectionEnd
      } = textarea;
      // IE will throw an "Unspecified error" if we try to set the selection range after the
      // element has been removed from the DOM. Assert that the directive hasn't been destroyed
      // between the time we requested the animation frame and when it was executed.
      // Also note that we have to assert that the textarea is focused before we set the
      // selection range. Setting the selection range on a non-focused textarea will cause
      // it to receive focus on IE and Edge.
      if (!this._destroyed.isStopped && this._hasFocus) {
        textarea.setSelectionRange(selectionStart, selectionEnd);
      }
    }
  }
  _class3 = CdkTextareaAutosize;
  _class3.ɵfac = function _class3_Factory(t) {
    return new (t || _class3)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_3__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_0__.Platform), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgZone), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_5__.DOCUMENT, 8));
  };
  _class3.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineDirective"]({
    type: _class3,
    selectors: [["textarea", "cdkTextareaAutosize", ""]],
    hostAttrs: ["rows", "1", 1, "cdk-textarea-autosize"],
    hostBindings: function _class3_HostBindings(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("input", function _class3_input_HostBindingHandler() {
          return ctx._noopInputHandler();
        });
      }
    },
    inputs: {
      minRows: ["cdkAutosizeMinRows", "minRows"],
      maxRows: ["cdkAutosizeMaxRows", "maxRows"],
      enabled: ["cdkTextareaAutosize", "enabled"],
      placeholder: "placeholder"
    },
    exportAs: ["cdkTextareaAutosize"]
  });
  return CdkTextareaAutosize;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
let TextFieldModule = /*#__PURE__*/(() => {
  var _class4;
  class TextFieldModule {}
  _class4 = TextFieldModule;
  _class4.ɵfac = function _class4_Factory(t) {
    return new (t || _class4)();
  };
  _class4.ɵmod = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({
    type: _class4
  });
  _class4.ɵinj = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({});
  return TextFieldModule;
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

/***/ 73637:
/*!****************************************************************!*\
  !*** ./node_modules/@angular/material/fesm2022/form-field.mjs ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MAT_ERROR: () => (/* binding */ MAT_ERROR),
/* harmony export */   MAT_FORM_FIELD: () => (/* binding */ MAT_FORM_FIELD),
/* harmony export */   MAT_FORM_FIELD_DEFAULT_OPTIONS: () => (/* binding */ MAT_FORM_FIELD_DEFAULT_OPTIONS),
/* harmony export */   MAT_PREFIX: () => (/* binding */ MAT_PREFIX),
/* harmony export */   MAT_SUFFIX: () => (/* binding */ MAT_SUFFIX),
/* harmony export */   MatError: () => (/* binding */ MatError),
/* harmony export */   MatFormField: () => (/* binding */ MatFormField),
/* harmony export */   MatFormFieldControl: () => (/* binding */ MatFormFieldControl),
/* harmony export */   MatFormFieldModule: () => (/* binding */ MatFormFieldModule),
/* harmony export */   MatHint: () => (/* binding */ MatHint),
/* harmony export */   MatLabel: () => (/* binding */ MatLabel),
/* harmony export */   MatPrefix: () => (/* binding */ MatPrefix),
/* harmony export */   MatSuffix: () => (/* binding */ MatSuffix),
/* harmony export */   getMatFormFieldDuplicatedHintError: () => (/* binding */ getMatFormFieldDuplicatedHintError),
/* harmony export */   getMatFormFieldMissingControlError: () => (/* binding */ getMatFormFieldMissingControlError),
/* harmony export */   getMatFormFieldPlaceholderConflictError: () => (/* binding */ getMatFormFieldPlaceholderConflictError),
/* harmony export */   matFormFieldAnimations: () => (/* binding */ matFormFieldAnimations)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser/animations */ 59936);
/* harmony import */ var _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/cdk/bidi */ 29988);
/* harmony import */ var _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/cdk/platform */ 92237);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 85028);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ 33410);
/* harmony import */ var _angular_cdk_observers_private__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/cdk/observers/private */ 17033);
/* harmony import */ var _angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/cdk/coercion */ 45029);
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/animations */ 46012);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ 34228);
/* harmony import */ var _angular_cdk_observers__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/cdk/observers */ 24819);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/core */ 56381);















/** The floating label for a `mat-form-field`. */
const _c0 = ["notch"];
const _c1 = ["matFormFieldNotchedOutline", ""];
const _c2 = ["*"];
const _c3 = ["textField"];
const _c4 = ["iconPrefixContainer"];
const _c5 = ["textPrefixContainer"];
function _class10_ng_template_0_label_0_span_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "span", 19);
  }
}
function _class10_ng_template_0_label_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "label", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](1, 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, _class10_ng_template_0_label_0_span_2_Template, 1, 0, "span", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("floating", ctx_r13._shouldLabelFloat())("monitorResize", ctx_r13._hasOutline())("id", ctx_r13._labelId);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattribute"]("for", ctx_r13._control.id);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx_r13.hideRequiredMarker && ctx_r13._control.required);
  }
}
function _class10_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, _class10_ng_template_0_label_0_Template, 3, 5, "label", 16);
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r1._hasFloatingLabel());
  }
}
function _class10_div_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "div", 20);
  }
}
function _class10_div_6_ng_template_1_ng_template_0_Template(rf, ctx) {}
function _class10_div_6_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, _class10_div_6_ng_template_1_ng_template_0_Template, 0, 0, "ng-template", 22);
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngTemplateOutlet", _r0);
  }
}
function _class10_div_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, _class10_div_6_ng_template_1_Template, 1, 1, "ng-template", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("matFormFieldNotchedOutlineOpen", ctx_r4._shouldLabelFloat());
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx_r4._forceDisplayInfixLabel());
  }
}
function _class10_div_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 23, 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](2, 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function _class10_div_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 25, 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](2, 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function _class10_ng_template_10_ng_template_0_Template(rf, ctx) {}
function _class10_ng_template_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, _class10_ng_template_10_ng_template_0_Template, 0, 0, "ng-template", 22);
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngTemplateOutlet", _r0);
  }
}
function _class10_div_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](1, 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function _class10_div_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](1, 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function _class10_div_14_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "div", 29);
  }
}
function _class10_div_16_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](1, 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("@transitionMessages", ctx_r11._subscriptAnimationState);
  }
}
function _class10_div_17_mat_hint_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-hint", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("id", ctx_r20._hintLabelId);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r20.hintLabel);
  }
}
function _class10_div_17_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, _class10_div_17_mat_hint_1_Template, 2, 2, "mat-hint", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](2, 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "div", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](4, 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("@transitionMessages", ctx_r12._subscriptAnimationState);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r12.hintLabel);
  }
}
const _c6 = ["*", [["mat-label"]], [["", "matPrefix", ""], ["", "matIconPrefix", ""]], [["", "matTextPrefix", ""]], [["", "matTextSuffix", ""]], [["", "matSuffix", ""], ["", "matIconSuffix", ""]], [["mat-error"], ["", "matError", ""]], [["mat-hint", 3, "align", "end"]], [["mat-hint", "align", "end"]]];
const _c7 = ["*", "mat-label", "[matPrefix], [matIconPrefix]", "[matTextPrefix]", "[matTextSuffix]", "[matSuffix], [matIconSuffix]", "mat-error, [matError]", "mat-hint:not([align='end'])", "mat-hint[align='end']"];
let MatLabel = /*#__PURE__*/(() => {
  var _class;
  class MatLabel {}
  _class = MatLabel;
  _class.ɵfac = function _class_Factory(t) {
    return new (t || _class)();
  };
  _class.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
    type: _class,
    selectors: [["mat-label"]]
  });
  return MatLabel;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
let nextUniqueId$2 = 0;
/**
 * Injection token that can be used to reference instances of `MatError`. It serves as
 * alternative token to the actual `MatError` class which could cause unnecessary
 * retention of the class and its directive metadata.
 */
const MAT_ERROR = /*#__PURE__*/new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken('MatError');
/** Single error message to be shown underneath the form-field. */
let MatError = /*#__PURE__*/(() => {
  var _class2;
  class MatError {
    constructor(ariaLive, elementRef) {
      this.id = `mat-mdc-error-${nextUniqueId$2++}`;
      // If no aria-live value is set add 'polite' as a default. This is preferred over setting
      // role='alert' so that screen readers do not interrupt the current task to read this aloud.
      if (!ariaLive) {
        elementRef.nativeElement.setAttribute('aria-live', 'polite');
      }
    }
  }
  _class2 = MatError;
  _class2.ɵfac = function _class2_Factory(t) {
    return new (t || _class2)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinjectAttribute"]('aria-live'), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef));
  };
  _class2.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
    type: _class2,
    selectors: [["mat-error"], ["", "matError", ""]],
    hostAttrs: ["aria-atomic", "true", 1, "mat-mdc-form-field-error", "mat-mdc-form-field-bottom-align"],
    hostVars: 1,
    hostBindings: function _class2_HostBindings(rf, ctx) {
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵhostProperty"]("id", ctx.id);
      }
    },
    inputs: {
      id: "id"
    },
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([{
      provide: MAT_ERROR,
      useExisting: _class2
    }])]
  });
  return MatError;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
let nextUniqueId$1 = 0;
/** Hint text to be shown underneath the form field control. */
let MatHint = /*#__PURE__*/(() => {
  var _class3;
  class MatHint {
    constructor() {
      /** Whether to align the hint label at the start or end of the line. */
      this.align = 'start';
      /** Unique ID for the hint. Used for the aria-describedby on the form field control. */
      this.id = `mat-mdc-hint-${nextUniqueId$1++}`;
    }
  }
  _class3 = MatHint;
  _class3.ɵfac = function _class3_Factory(t) {
    return new (t || _class3)();
  };
  _class3.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
    type: _class3,
    selectors: [["mat-hint"]],
    hostAttrs: [1, "mat-mdc-form-field-hint", "mat-mdc-form-field-bottom-align"],
    hostVars: 4,
    hostBindings: function _class3_HostBindings(rf, ctx) {
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵhostProperty"]("id", ctx.id);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattribute"]("align", null);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("mat-mdc-form-field-hint-end", ctx.align === "end");
      }
    },
    inputs: {
      align: "align",
      id: "id"
    }
  });
  return MatHint;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();

/**
 * Injection token that can be used to reference instances of `MatPrefix`. It serves as
 * alternative token to the actual `MatPrefix` class which could cause unnecessary
 * retention of the class and its directive metadata.
 */
const MAT_PREFIX = /*#__PURE__*/new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken('MatPrefix');
/** Prefix to be placed in front of the form field. */
let MatPrefix = /*#__PURE__*/(() => {
  var _class4;
  class MatPrefix {
    constructor() {
      this._isText = false;
    }
    set _isTextSelector(value) {
      this._isText = true;
    }
  }
  _class4 = MatPrefix;
  _class4.ɵfac = function _class4_Factory(t) {
    return new (t || _class4)();
  };
  _class4.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
    type: _class4,
    selectors: [["", "matPrefix", ""], ["", "matIconPrefix", ""], ["", "matTextPrefix", ""]],
    inputs: {
      _isTextSelector: ["matTextPrefix", "_isTextSelector"]
    },
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([{
      provide: MAT_PREFIX,
      useExisting: _class4
    }])]
  });
  return MatPrefix;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();

/**
 * Injection token that can be used to reference instances of `MatSuffix`. It serves as
 * alternative token to the actual `MatSuffix` class which could cause unnecessary
 * retention of the class and its directive metadata.
 */
const MAT_SUFFIX = /*#__PURE__*/new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken('MatSuffix');
/** Suffix to be placed at the end of the form field. */
let MatSuffix = /*#__PURE__*/(() => {
  var _class5;
  class MatSuffix {
    constructor() {
      this._isText = false;
    }
    set _isTextSelector(value) {
      this._isText = true;
    }
  }
  _class5 = MatSuffix;
  _class5.ɵfac = function _class5_Factory(t) {
    return new (t || _class5)();
  };
  _class5.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
    type: _class5,
    selectors: [["", "matSuffix", ""], ["", "matIconSuffix", ""], ["", "matTextSuffix", ""]],
    inputs: {
      _isTextSelector: ["matTextSuffix", "_isTextSelector"]
    },
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([{
      provide: MAT_SUFFIX,
      useExisting: _class5
    }])]
  });
  return MatSuffix;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();

/** An injion token for the parent form-field. */
const FLOATING_LABEL_PARENT = /*#__PURE__*/new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken('FloatingLabelParent');
/**
 * Internal directive that maintains a MDC floating label. This directive does not
 * use the `MDCFloatingLabelFoundation` class, as it is not worth the size cost of
 * including it just to measure the label width and toggle some classes.
 *
 * The use of a directive allows us to conditionally render a floating label in the
 * template without having to manually manage instantiation and destruction of the
 * floating label component based on.
 *
 * The component is responsible for setting up the floating label styles, measuring label
 * width for the outline notch, and providing inputs that can be used to toggle the
 * label's floating or required state.
 */
let MatFormFieldFloatingLabel = /*#__PURE__*/(() => {
  var _class6;
  class MatFormFieldFloatingLabel {
    /** Whether the label is floating. */
    get floating() {
      return this._floating;
    }
    set floating(value) {
      this._floating = value;
      if (this.monitorResize) {
        this._handleResize();
      }
    }
    /** Whether to monitor for resize events on the floating label. */
    get monitorResize() {
      return this._monitorResize;
    }
    set monitorResize(value) {
      this._monitorResize = value;
      if (this._monitorResize) {
        this._subscribeToResize();
      } else {
        this._resizeSubscription.unsubscribe();
      }
    }
    constructor(_elementRef) {
      this._elementRef = _elementRef;
      this._floating = false;
      this._monitorResize = false;
      /** The shared ResizeObserver. */
      this._resizeObserver = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_angular_cdk_observers_private__WEBPACK_IMPORTED_MODULE_1__.SharedResizeObserver);
      /** The Angular zone. */
      this._ngZone = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_angular_core__WEBPACK_IMPORTED_MODULE_0__.NgZone);
      /** The parent form-field. */
      this._parent = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(FLOATING_LABEL_PARENT);
      /** The current resize event subscription. */
      this._resizeSubscription = new rxjs__WEBPACK_IMPORTED_MODULE_2__.Subscription();
    }
    ngOnDestroy() {
      this._resizeSubscription.unsubscribe();
    }
    /** Gets the width of the label. Used for the outline notch. */
    getWidth() {
      return estimateScrollWidth(this._elementRef.nativeElement);
    }
    /** Gets the HTML element for the floating label. */
    get element() {
      return this._elementRef.nativeElement;
    }
    /** Handles resize events from the ResizeObserver. */
    _handleResize() {
      // In the case where the label grows in size, the following sequence of events occurs:
      // 1. The label grows by 1px triggering the ResizeObserver
      // 2. The notch is expanded to accommodate the entire label
      // 3. The label expands to its full width, triggering the ResizeObserver again
      //
      // This is expected, but If we allow this to all happen within the same macro task it causes an
      // error: `ResizeObserver loop limit exceeded`. Therefore we push the notch resize out until
      // the next macro task.
      setTimeout(() => this._parent._handleLabelResized());
    }
    /** Subscribes to resize events. */
    _subscribeToResize() {
      this._resizeSubscription.unsubscribe();
      this._ngZone.runOutsideAngular(() => {
        this._resizeSubscription = this._resizeObserver.observe(this._elementRef.nativeElement, {
          box: 'border-box'
        }).subscribe(() => this._handleResize());
      });
    }
  }
  _class6 = MatFormFieldFloatingLabel;
  _class6.ɵfac = function _class6_Factory(t) {
    return new (t || _class6)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef));
  };
  _class6.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
    type: _class6,
    selectors: [["label", "matFormFieldFloatingLabel", ""]],
    hostAttrs: [1, "mdc-floating-label", "mat-mdc-floating-label"],
    hostVars: 2,
    hostBindings: function _class6_HostBindings(rf, ctx) {
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("mdc-floating-label--float-above", ctx.floating);
      }
    },
    inputs: {
      floating: "floating",
      monitorResize: "monitorResize"
    }
  });
  return MatFormFieldFloatingLabel;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
/**
 * Estimates the scroll width of an element.
 * via https://github.com/material-components/material-components-web/blob/c0a11ef0d000a098fd0c372be8f12d6a99302855/packages/mdc-dom/ponyfill.ts
 */
function estimateScrollWidth(element) {
  // Check the offsetParent. If the element inherits display: none from any
  // parent, the offsetParent property will be null (see
  // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetParent).
  // This check ensures we only clone the node when necessary.
  const htmlEl = element;
  if (htmlEl.offsetParent !== null) {
    return htmlEl.scrollWidth;
  }
  const clone = htmlEl.cloneNode(true);
  clone.style.setProperty('position', 'absolute');
  clone.style.setProperty('transform', 'translate(-9999px, -9999px)');
  document.documentElement.appendChild(clone);
  const scrollWidth = clone.scrollWidth;
  clone.remove();
  return scrollWidth;
}

/** Class added when the line ripple is active. */
const ACTIVATE_CLASS = 'mdc-line-ripple--active';
/** Class added when the line ripple is being deactivated. */
const DEACTIVATING_CLASS = 'mdc-line-ripple--deactivating';
/**
 * Internal directive that creates an instance of the MDC line-ripple component. Using a
 * directive allows us to conditionally render a line-ripple in the template without having
 * to manually create and destroy the `MDCLineRipple` component whenever the condition changes.
 *
 * The directive sets up the styles for the line-ripple and provides an API for activating
 * and deactivating the line-ripple.
 */
let MatFormFieldLineRipple = /*#__PURE__*/(() => {
  var _class7;
  class MatFormFieldLineRipple {
    constructor(_elementRef, ngZone) {
      this._elementRef = _elementRef;
      this._handleTransitionEnd = event => {
        const classList = this._elementRef.nativeElement.classList;
        const isDeactivating = classList.contains(DEACTIVATING_CLASS);
        if (event.propertyName === 'opacity' && isDeactivating) {
          classList.remove(ACTIVATE_CLASS, DEACTIVATING_CLASS);
        }
      };
      ngZone.runOutsideAngular(() => {
        _elementRef.nativeElement.addEventListener('transitionend', this._handleTransitionEnd);
      });
    }
    activate() {
      const classList = this._elementRef.nativeElement.classList;
      classList.remove(DEACTIVATING_CLASS);
      classList.add(ACTIVATE_CLASS);
    }
    deactivate() {
      this._elementRef.nativeElement.classList.add(DEACTIVATING_CLASS);
    }
    ngOnDestroy() {
      this._elementRef.nativeElement.removeEventListener('transitionend', this._handleTransitionEnd);
    }
  }
  _class7 = MatFormFieldLineRipple;
  _class7.ɵfac = function _class7_Factory(t) {
    return new (t || _class7)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.NgZone));
  };
  _class7.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
    type: _class7,
    selectors: [["div", "matFormFieldLineRipple", ""]],
    hostAttrs: [1, "mdc-line-ripple"]
  });
  return MatFormFieldLineRipple;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();

/**
 * Internal component that creates an instance of the MDC notched-outline component.
 *
 * The component sets up the HTML structure and styles for the notched-outline. It provides
 * inputs to toggle the notch state and width.
 */
let MatFormFieldNotchedOutline = /*#__PURE__*/(() => {
  var _class8;
  class MatFormFieldNotchedOutline {
    constructor(_elementRef, _ngZone) {
      this._elementRef = _elementRef;
      this._ngZone = _ngZone;
      /** Whether the notch should be opened. */
      this.open = false;
    }
    ngAfterViewInit() {
      const label = this._elementRef.nativeElement.querySelector('.mdc-floating-label');
      if (label) {
        this._elementRef.nativeElement.classList.add('mdc-notched-outline--upgraded');
        if (typeof requestAnimationFrame === 'function') {
          label.style.transitionDuration = '0s';
          this._ngZone.runOutsideAngular(() => {
            requestAnimationFrame(() => label.style.transitionDuration = '');
          });
        }
      } else {
        this._elementRef.nativeElement.classList.add('mdc-notched-outline--no-label');
      }
    }
    _setNotchWidth(labelWidth) {
      if (!this.open || !labelWidth) {
        this._notch.nativeElement.style.width = '';
      } else {
        const NOTCH_ELEMENT_PADDING = 8;
        const NOTCH_ELEMENT_BORDER = 1;
        this._notch.nativeElement.style.width = `calc(${labelWidth}px * var(--mat-mdc-form-field-floating-label-scale, 0.75) + ${NOTCH_ELEMENT_PADDING + NOTCH_ELEMENT_BORDER}px)`;
      }
    }
  }
  _class8 = MatFormFieldNotchedOutline;
  _class8.ɵfac = function _class8_Factory(t) {
    return new (t || _class8)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.NgZone));
  };
  _class8.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
    type: _class8,
    selectors: [["div", "matFormFieldNotchedOutline", ""]],
    viewQuery: function _class8_Query(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, 5);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx._notch = _t.first);
      }
    },
    hostAttrs: [1, "mdc-notched-outline"],
    hostVars: 2,
    hostBindings: function _class8_HostBindings(rf, ctx) {
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("mdc-notched-outline--notched", ctx.open);
      }
    },
    inputs: {
      open: ["matFormFieldNotchedOutlineOpen", "open"]
    },
    attrs: _c1,
    ngContentSelectors: _c2,
    decls: 5,
    vars: 0,
    consts: [[1, "mdc-notched-outline__leading"], [1, "mdc-notched-outline__notch"], ["notch", ""], [1, "mdc-notched-outline__trailing"]],
    template: function _class8_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojectionDef"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1, 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "div", 3);
      }
    },
    encapsulation: 2,
    changeDetection: 0
  });
  return MatFormFieldNotchedOutline;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();

/**
 * Animations used by the MatFormField.
 * @docs-private
 */
const matFormFieldAnimations = {
  /** Animation that transitions the form field's error and hint messages. */
  transitionMessages: /*#__PURE__*/(0,_angular_animations__WEBPACK_IMPORTED_MODULE_3__.trigger)('transitionMessages', [
  /*#__PURE__*/
  // TODO(mmalerba): Use angular animations for label animation as well.
  (0,_angular_animations__WEBPACK_IMPORTED_MODULE_3__.state)('enter', /*#__PURE__*/(0,_angular_animations__WEBPACK_IMPORTED_MODULE_3__.style)({
    opacity: 1,
    transform: 'translateY(0%)'
  })), /*#__PURE__*/(0,_angular_animations__WEBPACK_IMPORTED_MODULE_3__.transition)('void => enter', [/*#__PURE__*/(0,_angular_animations__WEBPACK_IMPORTED_MODULE_3__.style)({
    opacity: 0,
    transform: 'translateY(-5px)'
  }), /*#__PURE__*/(0,_angular_animations__WEBPACK_IMPORTED_MODULE_3__.animate)('300ms cubic-bezier(0.55, 0, 0.55, 0.2)')])])
};

/** An interface which allows a control to work inside of a `MatFormField`. */
let MatFormFieldControl = /*#__PURE__*/(() => {
  var _class9;
  class MatFormFieldControl {}
  _class9 = MatFormFieldControl;
  _class9.ɵfac = function _class9_Factory(t) {
    return new (t || _class9)();
  };
  _class9.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
    type: _class9
  });
  return MatFormFieldControl;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();

/** @docs-private */
function getMatFormFieldPlaceholderConflictError() {
  return Error('Placeholder attribute and child element were both specified.');
}
/** @docs-private */
function getMatFormFieldDuplicatedHintError(align) {
  return Error(`A hint was already declared for 'align="${align}"'.`);
}
/** @docs-private */
function getMatFormFieldMissingControlError() {
  return Error('mat-form-field must contain a MatFormFieldControl.');
}

/**
 * Injection token that can be used to inject an instances of `MatFormField`. It serves
 * as alternative token to the actual `MatFormField` class which would cause unnecessary
 * retention of the `MatFormField` class and its component metadata.
 */
const MAT_FORM_FIELD = /*#__PURE__*/new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken('MatFormField');
/**
 * Injection token that can be used to configure the
 * default options for all form field within an app.
 */
const MAT_FORM_FIELD_DEFAULT_OPTIONS = /*#__PURE__*/new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken('MAT_FORM_FIELD_DEFAULT_OPTIONS');
let nextUniqueId = 0;
/** Default appearance used by the form field. */
const DEFAULT_APPEARANCE = 'fill';
/**
 * Whether the label for form fields should by default float `always`,
 * `never`, or `auto`.
 */
const DEFAULT_FLOAT_LABEL = 'auto';
/** Default way that the subscript element height is set. */
const DEFAULT_SUBSCRIPT_SIZING = 'fixed';
/**
 * Default transform for docked floating labels in a MDC text-field. This value has been
 * extracted from the MDC text-field styles because we programmatically modify the docked
 * label transform, but do not want to accidentally discard the default label transform.
 */
const FLOATING_LABEL_DEFAULT_DOCKED_TRANSFORM = `translateY(-50%)`;
/** Container for form controls that applies Material Design styling and behavior. */
let MatFormField = /*#__PURE__*/(() => {
  var _class10;
  class MatFormField {
    /** Whether the required marker should be hidden. */
    get hideRequiredMarker() {
      return this._hideRequiredMarker;
    }
    set hideRequiredMarker(value) {
      this._hideRequiredMarker = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_4__.coerceBooleanProperty)(value);
    }
    /** Whether the label should always float or float as the user types. */
    get floatLabel() {
      return this._floatLabel || this._defaults?.floatLabel || DEFAULT_FLOAT_LABEL;
    }
    set floatLabel(value) {
      if (value !== this._floatLabel) {
        this._floatLabel = value;
        // For backwards compatibility. Custom form field controls or directives might set
        // the "floatLabel" input and expect the form field view to be updated automatically.
        // e.g. autocomplete trigger. Ideally we'd get rid of this and the consumers would just
        // emit the "stateChanges" observable. TODO(devversion): consider removing.
        this._changeDetectorRef.markForCheck();
      }
    }
    /** The form field appearance style. */
    get appearance() {
      return this._appearance;
    }
    set appearance(value) {
      const oldValue = this._appearance;
      const newAppearance = value || this._defaults?.appearance || DEFAULT_APPEARANCE;
      if (typeof ngDevMode === 'undefined' || ngDevMode) {
        if (newAppearance !== 'fill' && newAppearance !== 'outline') {
          throw new Error(`MatFormField: Invalid appearance "${newAppearance}", valid values are "fill" or "outline".`);
        }
      }
      this._appearance = newAppearance;
      if (this._appearance === 'outline' && this._appearance !== oldValue) {
        // If the appearance has been switched to `outline`, the label offset needs to be updated.
        // The update can happen once the view has been re-checked, but not immediately because
        // the view has not been updated and the notched-outline floating label is not present.
        this._needsOutlineLabelOffsetUpdateOnStable = true;
      }
    }
    /**
     * Whether the form field should reserve space for one line of hint/error text (default)
     * or to have the spacing grow from 0px as needed based on the size of the hint/error content.
     * Note that when using dynamic sizing, layout shifts will occur when hint/error text changes.
     */
    get subscriptSizing() {
      return this._subscriptSizing || this._defaults?.subscriptSizing || DEFAULT_SUBSCRIPT_SIZING;
    }
    set subscriptSizing(value) {
      this._subscriptSizing = value || this._defaults?.subscriptSizing || DEFAULT_SUBSCRIPT_SIZING;
    }
    /** Text for the form field hint. */
    get hintLabel() {
      return this._hintLabel;
    }
    set hintLabel(value) {
      this._hintLabel = value;
      this._processHints();
    }
    /** Gets the current form field control */
    get _control() {
      return this._explicitFormFieldControl || this._formFieldControl;
    }
    set _control(value) {
      this._explicitFormFieldControl = value;
    }
    constructor(_elementRef, _changeDetectorRef, _ngZone, _dir, _platform, _defaults, _animationMode,
    /**
     * @deprecated not needed, to be removed.
     * @breaking-change 17.0.0 remove this param
     */
    _unusedDocument) {
      this._elementRef = _elementRef;
      this._changeDetectorRef = _changeDetectorRef;
      this._ngZone = _ngZone;
      this._dir = _dir;
      this._platform = _platform;
      this._defaults = _defaults;
      this._animationMode = _animationMode;
      this._hideRequiredMarker = false;
      /** The color palette for the form field. */
      this.color = 'primary';
      this._appearance = DEFAULT_APPEARANCE;
      this._subscriptSizing = null;
      this._hintLabel = '';
      this._hasIconPrefix = false;
      this._hasTextPrefix = false;
      this._hasIconSuffix = false;
      this._hasTextSuffix = false;
      // Unique id for the internal form field label.
      this._labelId = `mat-mdc-form-field-label-${nextUniqueId++}`;
      // Unique id for the hint label.
      this._hintLabelId = `mat-mdc-hint-${nextUniqueId++}`;
      /** State of the mat-hint and mat-error animations. */
      this._subscriptAnimationState = '';
      this._destroyed = new rxjs__WEBPACK_IMPORTED_MODULE_2__.Subject();
      this._isFocused = null;
      this._needsOutlineLabelOffsetUpdateOnStable = false;
      if (_defaults) {
        if (_defaults.appearance) {
          this.appearance = _defaults.appearance;
        }
        this._hideRequiredMarker = Boolean(_defaults?.hideRequiredMarker);
        if (_defaults.color) {
          this.color = _defaults.color;
        }
      }
    }
    ngAfterViewInit() {
      // Initial focus state sync. This happens rarely, but we want to account for
      // it in case the form field control has "focused" set to true on init.
      this._updateFocusState();
      // Enable animations now. This ensures we don't animate on initial render.
      this._subscriptAnimationState = 'enter';
      // Because the above changes a value used in the template after it was checked, we need
      // to trigger CD or the change might not be reflected if there is no other CD scheduled.
      this._changeDetectorRef.detectChanges();
    }
    ngAfterContentInit() {
      this._assertFormFieldControl();
      this._initializeControl();
      this._initializeSubscript();
      this._initializePrefixAndSuffix();
      this._initializeOutlineLabelOffsetSubscriptions();
    }
    ngAfterContentChecked() {
      this._assertFormFieldControl();
    }
    ngOnDestroy() {
      this._destroyed.next();
      this._destroyed.complete();
    }
    /**
     * Gets the id of the label element. If no label is present, returns `null`.
     */
    getLabelId() {
      return this._hasFloatingLabel() ? this._labelId : null;
    }
    /**
     * Gets an ElementRef for the element that a overlay attached to the form field
     * should be positioned relative to.
     */
    getConnectedOverlayOrigin() {
      return this._textField || this._elementRef;
    }
    /** Animates the placeholder up and locks it in position. */
    _animateAndLockLabel() {
      // This is for backwards compatibility only. Consumers of the form field might use
      // this method. e.g. the autocomplete trigger. This method has been added to the non-MDC
      // form field because setting "floatLabel" to "always" caused the label to float without
      // animation. This is different in MDC where the label always animates, so this method
      // is no longer necessary. There doesn't seem any benefit in adding logic to allow changing
      // the floating label state without animations. The non-MDC implementation was inconsistent
      // because it always animates if "floatLabel" is set away from "always".
      // TODO(devversion): consider removing this method when releasing the MDC form field.
      if (this._hasFloatingLabel()) {
        this.floatLabel = 'always';
      }
    }
    /** Initializes the registered form field control. */
    _initializeControl() {
      const control = this._control;
      if (control.controlType) {
        this._elementRef.nativeElement.classList.add(`mat-mdc-form-field-type-${control.controlType}`);
      }
      // Subscribe to changes in the child control state in order to update the form field UI.
      control.stateChanges.subscribe(() => {
        this._updateFocusState();
        this._syncDescribedByIds();
        this._changeDetectorRef.markForCheck();
      });
      // Run change detection if the value changes.
      if (control.ngControl && control.ngControl.valueChanges) {
        control.ngControl.valueChanges.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.takeUntil)(this._destroyed)).subscribe(() => this._changeDetectorRef.markForCheck());
      }
    }
    _checkPrefixAndSuffixTypes() {
      this._hasIconPrefix = !!this._prefixChildren.find(p => !p._isText);
      this._hasTextPrefix = !!this._prefixChildren.find(p => p._isText);
      this._hasIconSuffix = !!this._suffixChildren.find(s => !s._isText);
      this._hasTextSuffix = !!this._suffixChildren.find(s => s._isText);
    }
    /** Initializes the prefix and suffix containers. */
    _initializePrefixAndSuffix() {
      this._checkPrefixAndSuffixTypes();
      // Mark the form field as dirty whenever the prefix or suffix children change. This
      // is necessary because we conditionally display the prefix/suffix containers based
      // on whether there is projected content.
      (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.merge)(this._prefixChildren.changes, this._suffixChildren.changes).subscribe(() => {
        this._checkPrefixAndSuffixTypes();
        this._changeDetectorRef.markForCheck();
      });
    }
    /**
     * Initializes the subscript by validating hints and synchronizing "aria-describedby" ids
     * with the custom form field control. Also subscribes to hint and error changes in order
     * to be able to validate and synchronize ids on change.
     */
    _initializeSubscript() {
      // Re-validate when the number of hints changes.
      this._hintChildren.changes.subscribe(() => {
        this._processHints();
        this._changeDetectorRef.markForCheck();
      });
      // Update the aria-described by when the number of errors changes.
      this._errorChildren.changes.subscribe(() => {
        this._syncDescribedByIds();
        this._changeDetectorRef.markForCheck();
      });
      // Initial mat-hint validation and subscript describedByIds sync.
      this._validateHints();
      this._syncDescribedByIds();
    }
    /** Throws an error if the form field's control is missing. */
    _assertFormFieldControl() {
      if (!this._control && (typeof ngDevMode === 'undefined' || ngDevMode)) {
        throw getMatFormFieldMissingControlError();
      }
    }
    _updateFocusState() {
      // Usually the MDC foundation would call "activateFocus" and "deactivateFocus" whenever
      // certain DOM events are emitted. This is not possible in our implementation of the
      // form field because we support abstract form field controls which are not necessarily
      // of type input, nor do we have a reference to a native form field control element. Instead
      // we handle the focus by checking if the abstract form field control focused state changes.
      if (this._control.focused && !this._isFocused) {
        this._isFocused = true;
        this._lineRipple?.activate();
      } else if (!this._control.focused && (this._isFocused || this._isFocused === null)) {
        this._isFocused = false;
        this._lineRipple?.deactivate();
      }
      this._textField?.nativeElement.classList.toggle('mdc-text-field--focused', this._control.focused);
    }
    /**
     * The floating label in the docked state needs to account for prefixes. The horizontal offset
     * is calculated whenever the appearance changes to `outline`, the prefixes change, or when the
     * form field is added to the DOM. This method sets up all subscriptions which are needed to
     * trigger the label offset update. In general, we want to avoid performing measurements often,
     * so we rely on the `NgZone` as indicator when the offset should be recalculated, instead of
     * checking every change detection cycle.
     */
    _initializeOutlineLabelOffsetSubscriptions() {
      // Whenever the prefix changes, schedule an update of the label offset.
      this._prefixChildren.changes.subscribe(() => this._needsOutlineLabelOffsetUpdateOnStable = true);
      // Note that we have to run outside of the `NgZone` explicitly, in order to avoid
      // throwing users into an infinite loop if `zone-patch-rxjs` is included.
      this._ngZone.runOutsideAngular(() => {
        this._ngZone.onStable.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.takeUntil)(this._destroyed)).subscribe(() => {
          if (this._needsOutlineLabelOffsetUpdateOnStable) {
            this._needsOutlineLabelOffsetUpdateOnStable = false;
            this._updateOutlineLabelOffset();
          }
        });
      });
      this._dir.change.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.takeUntil)(this._destroyed)).subscribe(() => this._needsOutlineLabelOffsetUpdateOnStable = true);
    }
    /** Whether the floating label should always float or not. */
    _shouldAlwaysFloat() {
      return this.floatLabel === 'always';
    }
    _hasOutline() {
      return this.appearance === 'outline';
    }
    /**
     * Whether the label should display in the infix. Labels in the outline appearance are
     * displayed as part of the notched-outline and are horizontally offset to account for
     * form field prefix content. This won't work in server side rendering since we cannot
     * measure the width of the prefix container. To make the docked label appear as if the
     * right offset has been calculated, we forcibly render the label inside the infix. Since
     * the label is part of the infix, the label cannot overflow the prefix content.
     */
    _forceDisplayInfixLabel() {
      return !this._platform.isBrowser && this._prefixChildren.length && !this._shouldLabelFloat();
    }
    _hasFloatingLabel() {
      return !!this._labelChildNonStatic || !!this._labelChildStatic;
    }
    _shouldLabelFloat() {
      return this._control.shouldLabelFloat || this._shouldAlwaysFloat();
    }
    /**
     * Determines whether a class from the AbstractControlDirective
     * should be forwarded to the host element.
     */
    _shouldForward(prop) {
      const control = this._control ? this._control.ngControl : null;
      return control && control[prop];
    }
    /** Determines whether to display hints or errors. */
    _getDisplayedMessages() {
      return this._errorChildren && this._errorChildren.length > 0 && this._control.errorState ? 'error' : 'hint';
    }
    /** Handle label resize events. */
    _handleLabelResized() {
      this._refreshOutlineNotchWidth();
    }
    /** Refreshes the width of the outline-notch, if present. */
    _refreshOutlineNotchWidth() {
      if (!this._hasOutline() || !this._floatingLabel || !this._shouldLabelFloat()) {
        this._notchedOutline?._setNotchWidth(0);
      } else {
        this._notchedOutline?._setNotchWidth(this._floatingLabel.getWidth());
      }
    }
    /** Does any extra processing that is required when handling the hints. */
    _processHints() {
      this._validateHints();
      this._syncDescribedByIds();
    }
    /**
     * Ensure that there is a maximum of one of each "mat-hint" alignment specified. The hint
     * label specified set through the input is being considered as "start" aligned.
     *
     * This method is a noop if Angular runs in production mode.
     */
    _validateHints() {
      if (this._hintChildren && (typeof ngDevMode === 'undefined' || ngDevMode)) {
        let startHint;
        let endHint;
        this._hintChildren.forEach(hint => {
          if (hint.align === 'start') {
            if (startHint || this.hintLabel) {
              throw getMatFormFieldDuplicatedHintError('start');
            }
            startHint = hint;
          } else if (hint.align === 'end') {
            if (endHint) {
              throw getMatFormFieldDuplicatedHintError('end');
            }
            endHint = hint;
          }
        });
      }
    }
    /**
     * Sets the list of element IDs that describe the child control. This allows the control to update
     * its `aria-describedby` attribute accordingly.
     */
    _syncDescribedByIds() {
      if (this._control) {
        let ids = [];
        // TODO(wagnermaciel): Remove the type check when we find the root cause of this bug.
        if (this._control.userAriaDescribedBy && typeof this._control.userAriaDescribedBy === 'string') {
          ids.push(...this._control.userAriaDescribedBy.split(' '));
        }
        if (this._getDisplayedMessages() === 'hint') {
          const startHint = this._hintChildren ? this._hintChildren.find(hint => hint.align === 'start') : null;
          const endHint = this._hintChildren ? this._hintChildren.find(hint => hint.align === 'end') : null;
          if (startHint) {
            ids.push(startHint.id);
          } else if (this._hintLabel) {
            ids.push(this._hintLabelId);
          }
          if (endHint) {
            ids.push(endHint.id);
          }
        } else if (this._errorChildren) {
          ids.push(...this._errorChildren.map(error => error.id));
        }
        this._control.setDescribedByIds(ids);
      }
    }
    /**
     * Updates the horizontal offset of the label in the outline appearance. In the outline
     * appearance, the notched-outline and label are not relative to the infix container because
     * the outline intends to surround prefixes, suffixes and the infix. This means that the
     * floating label by default overlaps prefixes in the docked state. To avoid this, we need to
     * horizontally offset the label by the width of the prefix container. The MDC text-field does
     * not need to do this because they use a fixed width for prefixes. Hence, they can simply
     * incorporate the horizontal offset into their default text-field styles.
     */
    _updateOutlineLabelOffset() {
      if (!this._platform.isBrowser || !this._hasOutline() || !this._floatingLabel) {
        return;
      }
      const floatingLabel = this._floatingLabel.element;
      // If no prefix is displayed, reset the outline label offset from potential
      // previous label offset updates.
      if (!(this._iconPrefixContainer || this._textPrefixContainer)) {
        floatingLabel.style.transform = '';
        return;
      }
      // If the form field is not attached to the DOM yet (e.g. in a tab), we defer
      // the label offset update until the zone stabilizes.
      if (!this._isAttachedToDom()) {
        this._needsOutlineLabelOffsetUpdateOnStable = true;
        return;
      }
      const iconPrefixContainer = this._iconPrefixContainer?.nativeElement;
      const textPrefixContainer = this._textPrefixContainer?.nativeElement;
      const iconPrefixContainerWidth = iconPrefixContainer?.getBoundingClientRect().width ?? 0;
      const textPrefixContainerWidth = textPrefixContainer?.getBoundingClientRect().width ?? 0;
      // If the directionality is RTL, the x-axis transform needs to be inverted. This
      // is because `transformX` does not change based on the page directionality.
      const negate = this._dir.value === 'rtl' ? '-1' : '1';
      const prefixWidth = `${iconPrefixContainerWidth + textPrefixContainerWidth}px`;
      const labelOffset = `var(--mat-mdc-form-field-label-offset-x, 0px)`;
      const labelHorizontalOffset = `calc(${negate} * (${prefixWidth} + ${labelOffset}))`;
      // Update the translateX of the floating label to account for the prefix container,
      // but allow the CSS to override this setting via a CSS variable when the label is
      // floating.
      floatingLabel.style.transform = `var(
        --mat-mdc-form-field-label-transform,
        ${FLOATING_LABEL_DEFAULT_DOCKED_TRANSFORM} translateX(${labelHorizontalOffset})
    )`;
    }
    /** Checks whether the form field is attached to the DOM. */
    _isAttachedToDom() {
      const element = this._elementRef.nativeElement;
      if (element.getRootNode) {
        const rootNode = element.getRootNode();
        // If the element is inside the DOM the root node will be either the document
        // or the closest shadow root, otherwise it'll be the element itself.
        return rootNode && rootNode !== element;
      }
      // Otherwise fall back to checking if it's in the document. This doesn't account for
      // shadow DOM, however browser that support shadow DOM should support `getRootNode` as well.
      return document.documentElement.contains(element);
    }
  }
  _class10 = MatFormField;
  _class10.ɵfac = function _class10_Factory(t) {
    return new (t || _class10)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.NgZone), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_6__.Directionality), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_7__.Platform), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](MAT_FORM_FIELD_DEFAULT_OPTIONS, 8), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ANIMATION_MODULE_TYPE, 8), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_8__.DOCUMENT));
  };
  _class10.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
    type: _class10,
    selectors: [["mat-form-field"]],
    contentQueries: function _class10_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵcontentQuery"](dirIndex, MatLabel, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵcontentQuery"](dirIndex, MatLabel, 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵcontentQuery"](dirIndex, MatFormFieldControl, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵcontentQuery"](dirIndex, MAT_PREFIX, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵcontentQuery"](dirIndex, MAT_SUFFIX, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵcontentQuery"](dirIndex, MAT_ERROR, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵcontentQuery"](dirIndex, MatHint, 5);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx._labelChildNonStatic = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx._labelChildStatic = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx._formFieldControl = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx._prefixChildren = _t);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx._suffixChildren = _t);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx._errorChildren = _t);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx._hintChildren = _t);
      }
    },
    viewQuery: function _class10_Query(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c3, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c4, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c5, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](MatFormFieldFloatingLabel, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](MatFormFieldNotchedOutline, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](MatFormFieldLineRipple, 5);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx._textField = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx._iconPrefixContainer = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx._textPrefixContainer = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx._floatingLabel = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx._notchedOutline = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx._lineRipple = _t.first);
      }
    },
    hostAttrs: [1, "mat-mdc-form-field"],
    hostVars: 42,
    hostBindings: function _class10_HostBindings(rf, ctx) {
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("mat-mdc-form-field-label-always-float", ctx._shouldAlwaysFloat())("mat-mdc-form-field-has-icon-prefix", ctx._hasIconPrefix)("mat-mdc-form-field-has-icon-suffix", ctx._hasIconSuffix)("mat-form-field-invalid", ctx._control.errorState)("mat-form-field-disabled", ctx._control.disabled)("mat-form-field-autofilled", ctx._control.autofilled)("mat-form-field-no-animations", ctx._animationMode === "NoopAnimations")("mat-form-field-appearance-fill", ctx.appearance == "fill")("mat-form-field-appearance-outline", ctx.appearance == "outline")("mat-form-field-hide-placeholder", ctx._hasFloatingLabel() && !ctx._shouldLabelFloat())("mat-focused", ctx._control.focused)("mat-primary", ctx.color !== "accent" && ctx.color !== "warn")("mat-accent", ctx.color === "accent")("mat-warn", ctx.color === "warn")("ng-untouched", ctx._shouldForward("untouched"))("ng-touched", ctx._shouldForward("touched"))("ng-pristine", ctx._shouldForward("pristine"))("ng-dirty", ctx._shouldForward("dirty"))("ng-valid", ctx._shouldForward("valid"))("ng-invalid", ctx._shouldForward("invalid"))("ng-pending", ctx._shouldForward("pending"));
      }
    },
    inputs: {
      hideRequiredMarker: "hideRequiredMarker",
      color: "color",
      floatLabel: "floatLabel",
      appearance: "appearance",
      subscriptSizing: "subscriptSizing",
      hintLabel: "hintLabel"
    },
    exportAs: ["matFormField"],
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([{
      provide: MAT_FORM_FIELD,
      useExisting: _class10
    }, {
      provide: FLOATING_LABEL_PARENT,
      useExisting: _class10
    }])],
    ngContentSelectors: _c7,
    decls: 18,
    vars: 23,
    consts: [["labelTemplate", ""], [1, "mat-mdc-text-field-wrapper", "mdc-text-field", 3, "click"], ["textField", ""], ["class", "mat-mdc-form-field-focus-overlay", 4, "ngIf"], [1, "mat-mdc-form-field-flex"], ["matFormFieldNotchedOutline", "", 3, "matFormFieldNotchedOutlineOpen", 4, "ngIf"], ["class", "mat-mdc-form-field-icon-prefix", 4, "ngIf"], ["class", "mat-mdc-form-field-text-prefix", 4, "ngIf"], [1, "mat-mdc-form-field-infix"], [3, "ngIf"], ["class", "mat-mdc-form-field-text-suffix", 4, "ngIf"], ["class", "mat-mdc-form-field-icon-suffix", 4, "ngIf"], ["matFormFieldLineRipple", "", 4, "ngIf"], [1, "mat-mdc-form-field-subscript-wrapper", "mat-mdc-form-field-bottom-align", 3, "ngSwitch"], ["class", "mat-mdc-form-field-error-wrapper", 4, "ngSwitchCase"], ["class", "mat-mdc-form-field-hint-wrapper", 4, "ngSwitchCase"], ["matFormFieldFloatingLabel", "", 3, "floating", "monitorResize", "id", 4, "ngIf"], ["matFormFieldFloatingLabel", "", 3, "floating", "monitorResize", "id"], ["aria-hidden", "true", "class", "mat-mdc-form-field-required-marker mdc-floating-label--required", 4, "ngIf"], ["aria-hidden", "true", 1, "mat-mdc-form-field-required-marker", "mdc-floating-label--required"], [1, "mat-mdc-form-field-focus-overlay"], ["matFormFieldNotchedOutline", "", 3, "matFormFieldNotchedOutlineOpen"], [3, "ngTemplateOutlet"], [1, "mat-mdc-form-field-icon-prefix"], ["iconPrefixContainer", ""], [1, "mat-mdc-form-field-text-prefix"], ["textPrefixContainer", ""], [1, "mat-mdc-form-field-text-suffix"], [1, "mat-mdc-form-field-icon-suffix"], ["matFormFieldLineRipple", ""], [1, "mat-mdc-form-field-error-wrapper"], [1, "mat-mdc-form-field-hint-wrapper"], [3, "id", 4, "ngIf"], [1, "mat-mdc-form-field-hint-spacer"], [3, "id"]],
    template: function _class10_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojectionDef"](_c6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, _class10_ng_template_0_Template, 1, 1, "ng-template", null, 0, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 1, 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function _class10_Template_div_click_2_listener($event) {
          return ctx._control.onContainerClick($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, _class10_div_4_Template, 1, 0, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](6, _class10_div_6_Template, 2, 2, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](7, _class10_div_7_Template, 3, 0, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](8, _class10_div_8_Template, 3, 0, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](10, _class10_ng_template_10_Template, 1, 1, "ng-template", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](12, _class10_div_12_Template, 2, 0, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](13, _class10_div_13_Template, 2, 0, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](14, _class10_div_14_Template, 1, 0, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](16, _class10_div_16_Template, 2, 1, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](17, _class10_div_17_Template, 5, 2, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("mdc-text-field--filled", !ctx._hasOutline())("mdc-text-field--outlined", ctx._hasOutline())("mdc-text-field--no-label", !ctx._hasFloatingLabel())("mdc-text-field--disabled", ctx._control.disabled)("mdc-text-field--invalid", ctx._control.errorState);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx._hasOutline() && !ctx._control.disabled);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._hasOutline());
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._hasIconPrefix);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._hasTextPrefix);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx._hasOutline() || ctx._forceDisplayInfixLabel());
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._hasTextSuffix);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._hasIconSuffix);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx._hasOutline());
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("mat-mdc-form-field-subscript-dynamic-size", ctx.subscriptSizing === "dynamic");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitch", ctx._getDisplayedMessages());
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", "error");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", "hint");
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_8__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_8__.NgTemplateOutlet, _angular_common__WEBPACK_IMPORTED_MODULE_8__.NgSwitch, _angular_common__WEBPACK_IMPORTED_MODULE_8__.NgSwitchCase, MatHint, MatFormFieldFloatingLabel, MatFormFieldNotchedOutline, MatFormFieldLineRipple],
    styles: [".mdc-text-field{border-top-left-radius:4px;border-top-left-radius:var(--mdc-shape-small, 4px);border-top-right-radius:4px;border-top-right-radius:var(--mdc-shape-small, 4px);border-bottom-right-radius:0;border-bottom-left-radius:0;display:inline-flex;align-items:baseline;padding:0 16px;position:relative;box-sizing:border-box;overflow:hidden;will-change:opacity,transform,color}.mdc-text-field .mdc-floating-label{top:50%;transform:translateY(-50%);pointer-events:none}.mdc-text-field__input{height:28px;width:100%;min-width:0;border:none;border-radius:0;background:none;appearance:none;padding:0}.mdc-text-field__input::-ms-clear{display:none}.mdc-text-field__input::-webkit-calendar-picker-indicator{display:none}.mdc-text-field__input:focus{outline:none}.mdc-text-field__input:invalid{box-shadow:none}@media all{.mdc-text-field__input::placeholder{opacity:0}}@media all{.mdc-text-field__input:-ms-input-placeholder{opacity:0}}@media all{.mdc-text-field--no-label .mdc-text-field__input::placeholder,.mdc-text-field--focused .mdc-text-field__input::placeholder{opacity:1}}@media all{.mdc-text-field--no-label .mdc-text-field__input:-ms-input-placeholder,.mdc-text-field--focused .mdc-text-field__input:-ms-input-placeholder{opacity:1}}.mdc-text-field__affix{height:28px;opacity:0;white-space:nowrap}.mdc-text-field--label-floating .mdc-text-field__affix,.mdc-text-field--no-label .mdc-text-field__affix{opacity:1}@supports(-webkit-hyphens: none){.mdc-text-field--outlined .mdc-text-field__affix{align-items:center;align-self:center;display:inline-flex;height:100%}}.mdc-text-field__affix--prefix{padding-left:0;padding-right:2px}[dir=rtl] .mdc-text-field__affix--prefix,.mdc-text-field__affix--prefix[dir=rtl]{padding-left:2px;padding-right:0}.mdc-text-field--end-aligned .mdc-text-field__affix--prefix{padding-left:0;padding-right:12px}[dir=rtl] .mdc-text-field--end-aligned .mdc-text-field__affix--prefix,.mdc-text-field--end-aligned .mdc-text-field__affix--prefix[dir=rtl]{padding-left:12px;padding-right:0}.mdc-text-field__affix--suffix{padding-left:12px;padding-right:0}[dir=rtl] .mdc-text-field__affix--suffix,.mdc-text-field__affix--suffix[dir=rtl]{padding-left:0;padding-right:12px}.mdc-text-field--end-aligned .mdc-text-field__affix--suffix{padding-left:2px;padding-right:0}[dir=rtl] .mdc-text-field--end-aligned .mdc-text-field__affix--suffix,.mdc-text-field--end-aligned .mdc-text-field__affix--suffix[dir=rtl]{padding-left:0;padding-right:2px}.mdc-text-field--filled{height:56px}.mdc-text-field--filled::before{display:inline-block;width:0;height:40px;content:\"\";vertical-align:0}.mdc-text-field--filled .mdc-floating-label{left:16px;right:initial}[dir=rtl] .mdc-text-field--filled .mdc-floating-label,.mdc-text-field--filled .mdc-floating-label[dir=rtl]{left:initial;right:16px}.mdc-text-field--filled .mdc-floating-label--float-above{transform:translateY(-106%) scale(0.75)}.mdc-text-field--filled.mdc-text-field--no-label .mdc-text-field__input{height:100%}.mdc-text-field--filled.mdc-text-field--no-label .mdc-floating-label{display:none}.mdc-text-field--filled.mdc-text-field--no-label::before{display:none}@supports(-webkit-hyphens: none){.mdc-text-field--filled.mdc-text-field--no-label .mdc-text-field__affix{align-items:center;align-self:center;display:inline-flex;height:100%}}.mdc-text-field--outlined{height:56px;overflow:visible}.mdc-text-field--outlined .mdc-floating-label--float-above{transform:translateY(-37.25px) scale(1)}.mdc-text-field--outlined .mdc-floating-label--float-above{font-size:.75rem}.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{transform:translateY(-34.75px) scale(0.75)}.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{font-size:1rem}.mdc-text-field--outlined .mdc-text-field__input{height:100%}.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading{border-top-left-radius:4px;border-top-left-radius:var(--mdc-shape-small, 4px);border-top-right-radius:0;border-bottom-right-radius:0;border-bottom-left-radius:4px;border-bottom-left-radius:var(--mdc-shape-small, 4px)}[dir=rtl] .mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading,.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading[dir=rtl]{border-top-left-radius:0;border-top-right-radius:4px;border-top-right-radius:var(--mdc-shape-small, 4px);border-bottom-right-radius:4px;border-bottom-right-radius:var(--mdc-shape-small, 4px);border-bottom-left-radius:0}@supports(top: max(0%)){.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading{width:max(12px, var(--mdc-shape-small, 4px))}}@supports(top: max(0%)){.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__notch{max-width:calc(100% - max(12px, var(--mdc-shape-small, 4px))*2)}}.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__trailing{border-top-left-radius:0;border-top-right-radius:4px;border-top-right-radius:var(--mdc-shape-small, 4px);border-bottom-right-radius:4px;border-bottom-right-radius:var(--mdc-shape-small, 4px);border-bottom-left-radius:0}[dir=rtl] .mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__trailing,.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__trailing[dir=rtl]{border-top-left-radius:4px;border-top-left-radius:var(--mdc-shape-small, 4px);border-top-right-radius:0;border-bottom-right-radius:0;border-bottom-left-radius:4px;border-bottom-left-radius:var(--mdc-shape-small, 4px)}@supports(top: max(0%)){.mdc-text-field--outlined{padding-left:max(16px, calc(var(--mdc-shape-small, 4px) + 4px))}}@supports(top: max(0%)){.mdc-text-field--outlined{padding-right:max(16px, var(--mdc-shape-small, 4px))}}@supports(top: max(0%)){.mdc-text-field--outlined+.mdc-text-field-helper-line{padding-left:max(16px, calc(var(--mdc-shape-small, 4px) + 4px))}}@supports(top: max(0%)){.mdc-text-field--outlined+.mdc-text-field-helper-line{padding-right:max(16px, var(--mdc-shape-small, 4px))}}.mdc-text-field--outlined.mdc-text-field--with-leading-icon{padding-left:0}@supports(top: max(0%)){.mdc-text-field--outlined.mdc-text-field--with-leading-icon{padding-right:max(16px, var(--mdc-shape-small, 4px))}}[dir=rtl] .mdc-text-field--outlined.mdc-text-field--with-leading-icon,.mdc-text-field--outlined.mdc-text-field--with-leading-icon[dir=rtl]{padding-right:0}@supports(top: max(0%)){[dir=rtl] .mdc-text-field--outlined.mdc-text-field--with-leading-icon,.mdc-text-field--outlined.mdc-text-field--with-leading-icon[dir=rtl]{padding-left:max(16px, var(--mdc-shape-small, 4px))}}.mdc-text-field--outlined.mdc-text-field--with-trailing-icon{padding-right:0}@supports(top: max(0%)){.mdc-text-field--outlined.mdc-text-field--with-trailing-icon{padding-left:max(16px, calc(var(--mdc-shape-small, 4px) + 4px))}}[dir=rtl] .mdc-text-field--outlined.mdc-text-field--with-trailing-icon,.mdc-text-field--outlined.mdc-text-field--with-trailing-icon[dir=rtl]{padding-left:0}@supports(top: max(0%)){[dir=rtl] .mdc-text-field--outlined.mdc-text-field--with-trailing-icon,.mdc-text-field--outlined.mdc-text-field--with-trailing-icon[dir=rtl]{padding-right:max(16px, calc(var(--mdc-shape-small, 4px) + 4px))}}.mdc-text-field--outlined.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon{padding-left:0;padding-right:0}.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch{padding-top:1px}.mdc-text-field--outlined .mdc-floating-label{left:4px;right:initial}[dir=rtl] .mdc-text-field--outlined .mdc-floating-label,.mdc-text-field--outlined .mdc-floating-label[dir=rtl]{left:initial;right:4px}.mdc-text-field--outlined .mdc-text-field__input{display:flex;border:none !important;background-color:rgba(0,0,0,0)}.mdc-text-field--outlined .mdc-notched-outline{z-index:1}.mdc-text-field--textarea{flex-direction:column;align-items:center;width:auto;height:auto;padding:0}.mdc-text-field--textarea .mdc-floating-label{top:19px}.mdc-text-field--textarea .mdc-floating-label:not(.mdc-floating-label--float-above){transform:none}.mdc-text-field--textarea .mdc-text-field__input{flex-grow:1;height:auto;min-height:1.5rem;overflow-x:hidden;overflow-y:auto;box-sizing:border-box;resize:none;padding:0 16px}.mdc-text-field--textarea.mdc-text-field--filled::before{display:none}.mdc-text-field--textarea.mdc-text-field--filled .mdc-floating-label--float-above{transform:translateY(-10.25px) scale(0.75)}.mdc-text-field--textarea.mdc-text-field--filled .mdc-text-field__input{margin-top:23px;margin-bottom:9px}.mdc-text-field--textarea.mdc-text-field--filled.mdc-text-field--no-label .mdc-text-field__input{margin-top:16px;margin-bottom:16px}.mdc-text-field--textarea.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch{padding-top:0}.mdc-text-field--textarea.mdc-text-field--outlined .mdc-floating-label--float-above{transform:translateY(-27.25px) scale(1)}.mdc-text-field--textarea.mdc-text-field--outlined .mdc-floating-label--float-above{font-size:.75rem}.mdc-text-field--textarea.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--textarea.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{transform:translateY(-24.75px) scale(0.75)}.mdc-text-field--textarea.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--textarea.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{font-size:1rem}.mdc-text-field--textarea.mdc-text-field--outlined .mdc-text-field__input{margin-top:16px;margin-bottom:16px}.mdc-text-field--textarea.mdc-text-field--outlined .mdc-floating-label{top:18px}.mdc-text-field--textarea.mdc-text-field--with-internal-counter .mdc-text-field__input{margin-bottom:2px}.mdc-text-field--textarea.mdc-text-field--with-internal-counter .mdc-text-field-character-counter{align-self:flex-end;padding:0 16px}.mdc-text-field--textarea.mdc-text-field--with-internal-counter .mdc-text-field-character-counter::after{display:inline-block;width:0;height:16px;content:\"\";vertical-align:-16px}.mdc-text-field--textarea.mdc-text-field--with-internal-counter .mdc-text-field-character-counter::before{display:none}.mdc-text-field__resizer{align-self:stretch;display:inline-flex;flex-direction:column;flex-grow:1;max-height:100%;max-width:100%;min-height:56px;min-width:fit-content;min-width:-moz-available;min-width:-webkit-fill-available;overflow:hidden;resize:both}.mdc-text-field--filled .mdc-text-field__resizer{transform:translateY(-1px)}.mdc-text-field--filled .mdc-text-field__resizer .mdc-text-field__input,.mdc-text-field--filled .mdc-text-field__resizer .mdc-text-field-character-counter{transform:translateY(1px)}.mdc-text-field--outlined .mdc-text-field__resizer{transform:translateX(-1px) translateY(-1px)}[dir=rtl] .mdc-text-field--outlined .mdc-text-field__resizer,.mdc-text-field--outlined .mdc-text-field__resizer[dir=rtl]{transform:translateX(1px) translateY(-1px)}.mdc-text-field--outlined .mdc-text-field__resizer .mdc-text-field__input,.mdc-text-field--outlined .mdc-text-field__resizer .mdc-text-field-character-counter{transform:translateX(1px) translateY(1px)}[dir=rtl] .mdc-text-field--outlined .mdc-text-field__resizer .mdc-text-field__input,[dir=rtl] .mdc-text-field--outlined .mdc-text-field__resizer .mdc-text-field-character-counter,.mdc-text-field--outlined .mdc-text-field__resizer .mdc-text-field__input[dir=rtl],.mdc-text-field--outlined .mdc-text-field__resizer .mdc-text-field-character-counter[dir=rtl]{transform:translateX(-1px) translateY(1px)}.mdc-text-field--with-leading-icon{padding-left:0;padding-right:16px}[dir=rtl] .mdc-text-field--with-leading-icon,.mdc-text-field--with-leading-icon[dir=rtl]{padding-left:16px;padding-right:0}.mdc-text-field--with-leading-icon.mdc-text-field--filled .mdc-floating-label{max-width:calc(100% - 48px);left:48px;right:initial}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--filled .mdc-floating-label,.mdc-text-field--with-leading-icon.mdc-text-field--filled .mdc-floating-label[dir=rtl]{left:initial;right:48px}.mdc-text-field--with-leading-icon.mdc-text-field--filled .mdc-floating-label--float-above{max-width:calc(100% / 0.75 - 64px / 0.75)}.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label{left:36px;right:initial}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label,.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label[dir=rtl]{left:initial;right:36px}.mdc-text-field--with-leading-icon.mdc-text-field--outlined :not(.mdc-notched-outline--notched) .mdc-notched-outline__notch{max-width:calc(100% - 60px)}.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--float-above{transform:translateY(-37.25px) translateX(-32px) scale(1)}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--float-above,.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--float-above[dir=rtl]{transform:translateY(-37.25px) translateX(32px) scale(1)}.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--float-above{font-size:.75rem}.mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{transform:translateY(-34.75px) translateX(-32px) scale(0.75)}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above[dir=rtl],.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above[dir=rtl]{transform:translateY(-34.75px) translateX(32px) scale(0.75)}.mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{font-size:1rem}.mdc-text-field--with-trailing-icon{padding-left:16px;padding-right:0}[dir=rtl] .mdc-text-field--with-trailing-icon,.mdc-text-field--with-trailing-icon[dir=rtl]{padding-left:0;padding-right:16px}.mdc-text-field--with-trailing-icon.mdc-text-field--filled .mdc-floating-label{max-width:calc(100% - 64px)}.mdc-text-field--with-trailing-icon.mdc-text-field--filled .mdc-floating-label--float-above{max-width:calc(100% / 0.75 - 64px / 0.75)}.mdc-text-field--with-trailing-icon.mdc-text-field--outlined :not(.mdc-notched-outline--notched) .mdc-notched-outline__notch{max-width:calc(100% - 60px)}.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon{padding-left:0;padding-right:0}.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon.mdc-text-field--filled .mdc-floating-label{max-width:calc(100% - 96px)}.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon.mdc-text-field--filled .mdc-floating-label--float-above{max-width:calc(100% / 0.75 - 96px / 0.75)}.mdc-text-field-helper-line{display:flex;justify-content:space-between;box-sizing:border-box}.mdc-text-field+.mdc-text-field-helper-line{padding-right:16px;padding-left:16px}.mdc-form-field>.mdc-text-field+label{align-self:flex-start}.mdc-text-field--focused .mdc-notched-outline__leading,.mdc-text-field--focused .mdc-notched-outline__notch,.mdc-text-field--focused .mdc-notched-outline__trailing{border-width:2px}.mdc-text-field--focused+.mdc-text-field-helper-line .mdc-text-field-helper-text:not(.mdc-text-field-helper-text--validation-msg){opacity:1}.mdc-text-field--focused.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch{padding-top:2px}.mdc-text-field--focused.mdc-text-field--outlined.mdc-text-field--textarea .mdc-notched-outline--notched .mdc-notched-outline__notch{padding-top:0}.mdc-text-field--invalid+.mdc-text-field-helper-line .mdc-text-field-helper-text--validation-msg{opacity:1}.mdc-text-field--disabled{pointer-events:none}@media screen and (forced-colors: active){.mdc-text-field--disabled .mdc-text-field__input{background-color:Window}.mdc-text-field--disabled .mdc-floating-label{z-index:1}}.mdc-text-field--disabled .mdc-floating-label{cursor:default}.mdc-text-field--disabled.mdc-text-field--filled .mdc-text-field__ripple{display:none}.mdc-text-field--disabled .mdc-text-field__input{pointer-events:auto}.mdc-text-field--end-aligned .mdc-text-field__input{text-align:right}[dir=rtl] .mdc-text-field--end-aligned .mdc-text-field__input,.mdc-text-field--end-aligned .mdc-text-field__input[dir=rtl]{text-align:left}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__input,[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__affix,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__input,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__affix{direction:ltr}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__affix--prefix,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__affix--prefix{padding-left:0;padding-right:2px}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__affix--suffix,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__affix--suffix{padding-left:12px;padding-right:0}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__icon--leading,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__icon--leading{order:1}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__affix--suffix,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__affix--suffix{order:2}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__input,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__input{order:3}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__affix--prefix,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__affix--prefix{order:4}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__icon--trailing,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__icon--trailing{order:5}[dir=rtl] .mdc-text-field--ltr-text.mdc-text-field--end-aligned .mdc-text-field__input,.mdc-text-field--ltr-text.mdc-text-field--end-aligned[dir=rtl] .mdc-text-field__input{text-align:right}[dir=rtl] .mdc-text-field--ltr-text.mdc-text-field--end-aligned .mdc-text-field__affix--prefix,.mdc-text-field--ltr-text.mdc-text-field--end-aligned[dir=rtl] .mdc-text-field__affix--prefix{padding-right:12px}[dir=rtl] .mdc-text-field--ltr-text.mdc-text-field--end-aligned .mdc-text-field__affix--suffix,.mdc-text-field--ltr-text.mdc-text-field--end-aligned[dir=rtl] .mdc-text-field__affix--suffix{padding-left:2px}.mdc-floating-label{position:absolute;left:0;-webkit-transform-origin:left top;transform-origin:left top;line-height:1.15rem;text-align:left;text-overflow:ellipsis;white-space:nowrap;cursor:text;overflow:hidden;will-change:transform}[dir=rtl] .mdc-floating-label,.mdc-floating-label[dir=rtl]{right:0;left:auto;-webkit-transform-origin:right top;transform-origin:right top;text-align:right}.mdc-floating-label--float-above{cursor:auto}.mdc-floating-label--required:not(.mdc-floating-label--hide-required-marker)::after{margin-left:1px;margin-right:0px;content:\"*\"}[dir=rtl] .mdc-floating-label--required:not(.mdc-floating-label--hide-required-marker)::after,.mdc-floating-label--required:not(.mdc-floating-label--hide-required-marker)[dir=rtl]::after{margin-left:0;margin-right:1px}.mdc-notched-outline{display:flex;position:absolute;top:0;right:0;left:0;box-sizing:border-box;width:100%;max-width:100%;height:100%;text-align:left;pointer-events:none}[dir=rtl] .mdc-notched-outline,.mdc-notched-outline[dir=rtl]{text-align:right}.mdc-notched-outline__leading,.mdc-notched-outline__notch,.mdc-notched-outline__trailing{box-sizing:border-box;height:100%;pointer-events:none}.mdc-notched-outline__trailing{flex-grow:1}.mdc-notched-outline__notch{flex:0 0 auto;width:auto}.mdc-notched-outline .mdc-floating-label{display:inline-block;position:relative;max-width:100%}.mdc-notched-outline .mdc-floating-label--float-above{text-overflow:clip}.mdc-notched-outline--upgraded .mdc-floating-label--float-above{max-width:133.3333333333%}.mdc-notched-outline--notched .mdc-notched-outline__notch{padding-left:0;padding-right:8px;border-top:none}[dir=rtl] .mdc-notched-outline--notched .mdc-notched-outline__notch,.mdc-notched-outline--notched .mdc-notched-outline__notch[dir=rtl]{padding-left:8px;padding-right:0}.mdc-notched-outline--no-label .mdc-notched-outline__notch{display:none}.mdc-line-ripple::before,.mdc-line-ripple::after{position:absolute;bottom:0;left:0;width:100%;border-bottom-style:solid;content:\"\"}.mdc-line-ripple::before{z-index:1}.mdc-line-ripple::after{transform:scaleX(0);opacity:0;z-index:2}.mdc-line-ripple--active::after{transform:scaleX(1);opacity:1}.mdc-line-ripple--deactivating::after{opacity:0}.mdc-floating-label--float-above{transform:translateY(-106%) scale(0.75)}.mdc-notched-outline__leading,.mdc-notched-outline__notch,.mdc-notched-outline__trailing{border-top:1px solid;border-bottom:1px solid}.mdc-notched-outline__leading{border-left:1px solid;border-right:none;width:12px}[dir=rtl] .mdc-notched-outline__leading,.mdc-notched-outline__leading[dir=rtl]{border-left:none;border-right:1px solid}.mdc-notched-outline__trailing{border-left:none;border-right:1px solid}[dir=rtl] .mdc-notched-outline__trailing,.mdc-notched-outline__trailing[dir=rtl]{border-left:1px solid;border-right:none}.mdc-notched-outline__notch{max-width:calc(100% - 12px * 2)}.mdc-line-ripple::before{border-bottom-width:1px}.mdc-line-ripple::after{border-bottom-width:2px}.mdc-text-field--filled{--mdc-filled-text-field-active-indicator-height:1px;--mdc-filled-text-field-focus-active-indicator-height:2px;--mdc-filled-text-field-container-shape:4px;border-top-left-radius:var(--mdc-filled-text-field-container-shape);border-top-right-radius:var(--mdc-filled-text-field-container-shape);border-bottom-right-radius:0;border-bottom-left-radius:0}.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input{caret-color:var(--mdc-filled-text-field-caret-color)}.mdc-text-field--filled.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-text-field__input{caret-color:var(--mdc-filled-text-field-error-caret-color)}.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input{color:var(--mdc-filled-text-field-input-text-color)}.mdc-text-field--filled.mdc-text-field--disabled .mdc-text-field__input{color:var(--mdc-filled-text-field-disabled-input-text-color)}.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-floating-label,.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-floating-label--float-above{color:var(--mdc-filled-text-field-label-text-color)}.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-floating-label,.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-floating-label--float-above{color:var(--mdc-filled-text-field-focus-label-text-color)}.mdc-text-field--filled.mdc-text-field--disabled .mdc-floating-label,.mdc-text-field--filled.mdc-text-field--disabled .mdc-floating-label--float-above{color:var(--mdc-filled-text-field-disabled-label-text-color)}.mdc-text-field--filled.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-floating-label,.mdc-text-field--filled.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-floating-label--float-above{color:var(--mdc-filled-text-field-error-label-text-color)}.mdc-text-field--filled.mdc-text-field--invalid:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-floating-label,.mdc-text-field--filled.mdc-text-field--invalid:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-floating-label--float-above{color:var(--mdc-filled-text-field-error-focus-label-text-color)}.mdc-text-field--filled .mdc-floating-label{font-family:var(--mdc-filled-text-field-label-text-font);font-size:var(--mdc-filled-text-field-label-text-size);font-weight:var(--mdc-filled-text-field-label-text-weight);letter-spacing:var(--mdc-filled-text-field-label-text-tracking)}@media all{.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input::placeholder{color:var(--mdc-filled-text-field-input-text-placeholder-color)}}@media all{.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input:-ms-input-placeholder{color:var(--mdc-filled-text-field-input-text-placeholder-color)}}.mdc-text-field--filled:not(.mdc-text-field--disabled){background-color:var(--mdc-filled-text-field-container-color)}.mdc-text-field--filled.mdc-text-field--disabled{background-color:var(--mdc-filled-text-field-disabled-container-color)}.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-line-ripple::before{border-bottom-color:var(--mdc-filled-text-field-active-indicator-color)}.mdc-text-field--filled:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-line-ripple::before{border-bottom-color:var(--mdc-filled-text-field-hover-active-indicator-color)}.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-line-ripple::after{border-bottom-color:var(--mdc-filled-text-field-focus-active-indicator-color)}.mdc-text-field--filled.mdc-text-field--disabled .mdc-line-ripple::before{border-bottom-color:var(--mdc-filled-text-field-disabled-active-indicator-color)}.mdc-text-field--filled.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-line-ripple::before{border-bottom-color:var(--mdc-filled-text-field-error-active-indicator-color)}.mdc-text-field--filled.mdc-text-field--invalid:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-line-ripple::before{border-bottom-color:var(--mdc-filled-text-field-error-hover-active-indicator-color)}.mdc-text-field--filled.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-line-ripple::after{border-bottom-color:var(--mdc-filled-text-field-error-focus-active-indicator-color)}.mdc-text-field--filled .mdc-line-ripple::before{border-bottom-width:var(--mdc-filled-text-field-active-indicator-height)}.mdc-text-field--filled .mdc-line-ripple::after{border-bottom-width:var(--mdc-filled-text-field-focus-active-indicator-height)}.mdc-text-field--outlined{--mdc-outlined-text-field-outline-width:1px;--mdc-outlined-text-field-focus-outline-width:2px;--mdc-outlined-text-field-container-shape:4px}.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input{caret-color:var(--mdc-outlined-text-field-caret-color)}.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-text-field__input{caret-color:var(--mdc-outlined-text-field-error-caret-color)}.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input{color:var(--mdc-outlined-text-field-input-text-color)}.mdc-text-field--outlined.mdc-text-field--disabled .mdc-text-field__input{color:var(--mdc-outlined-text-field-disabled-input-text-color)}.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-floating-label,.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-floating-label--float-above{color:var(--mdc-outlined-text-field-label-text-color)}.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-floating-label,.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-floating-label--float-above{color:var(--mdc-outlined-text-field-focus-label-text-color)}.mdc-text-field--outlined.mdc-text-field--disabled .mdc-floating-label,.mdc-text-field--outlined.mdc-text-field--disabled .mdc-floating-label--float-above{color:var(--mdc-outlined-text-field-disabled-label-text-color)}.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-floating-label,.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-floating-label--float-above{color:var(--mdc-outlined-text-field-error-label-text-color)}.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-floating-label,.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-floating-label--float-above{color:var(--mdc-outlined-text-field-error-focus-label-text-color)}.mdc-text-field--outlined .mdc-floating-label{font-family:var(--mdc-outlined-text-field-label-text-font);font-size:var(--mdc-outlined-text-field-label-text-size);font-weight:var(--mdc-outlined-text-field-label-text-weight);letter-spacing:var(--mdc-outlined-text-field-label-text-tracking)}@media all{.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input::placeholder{color:var(--mdc-outlined-text-field-input-text-placeholder-color)}}@media all{.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input:-ms-input-placeholder{color:var(--mdc-outlined-text-field-input-text-placeholder-color)}}.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading{border-top-left-radius:var(--mdc-outlined-text-field-container-shape);border-top-right-radius:0;border-bottom-right-radius:0;border-bottom-left-radius:var(--mdc-outlined-text-field-container-shape)}[dir=rtl] .mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading,.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading[dir=rtl]{border-top-left-radius:0;border-top-right-radius:var(--mdc-outlined-text-field-container-shape);border-bottom-right-radius:var(--mdc-outlined-text-field-container-shape);border-bottom-left-radius:0}@supports(top: max(0%)){.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading{width:max(12px, var(--mdc-outlined-text-field-container-shape))}}@supports(top: max(0%)){.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__notch{max-width:calc(100% - max(12px, var(--mdc-outlined-text-field-container-shape))*2)}}.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__trailing{border-top-left-radius:0;border-top-right-radius:var(--mdc-outlined-text-field-container-shape);border-bottom-right-radius:var(--mdc-outlined-text-field-container-shape);border-bottom-left-radius:0}[dir=rtl] .mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__trailing,.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__trailing[dir=rtl]{border-top-left-radius:var(--mdc-outlined-text-field-container-shape);border-top-right-radius:0;border-bottom-right-radius:0;border-bottom-left-radius:var(--mdc-outlined-text-field-container-shape)}@supports(top: max(0%)){.mdc-text-field--outlined{padding-left:max(16px, calc(var(--mdc-outlined-text-field-container-shape) + 4px))}}@supports(top: max(0%)){.mdc-text-field--outlined{padding-right:max(16px, var(--mdc-outlined-text-field-container-shape))}}@supports(top: max(0%)){.mdc-text-field--outlined+.mdc-text-field-helper-line{padding-left:max(16px, calc(var(--mdc-outlined-text-field-container-shape) + 4px))}}@supports(top: max(0%)){.mdc-text-field--outlined+.mdc-text-field-helper-line{padding-right:max(16px, var(--mdc-outlined-text-field-container-shape))}}.mdc-text-field--outlined.mdc-text-field--with-leading-icon{padding-left:0}@supports(top: max(0%)){.mdc-text-field--outlined.mdc-text-field--with-leading-icon{padding-right:max(16px, var(--mdc-outlined-text-field-container-shape))}}[dir=rtl] .mdc-text-field--outlined.mdc-text-field--with-leading-icon,.mdc-text-field--outlined.mdc-text-field--with-leading-icon[dir=rtl]{padding-right:0}@supports(top: max(0%)){[dir=rtl] .mdc-text-field--outlined.mdc-text-field--with-leading-icon,.mdc-text-field--outlined.mdc-text-field--with-leading-icon[dir=rtl]{padding-left:max(16px, var(--mdc-outlined-text-field-container-shape))}}.mdc-text-field--outlined.mdc-text-field--with-trailing-icon{padding-right:0}@supports(top: max(0%)){.mdc-text-field--outlined.mdc-text-field--with-trailing-icon{padding-left:max(16px, calc(var(--mdc-outlined-text-field-container-shape) + 4px))}}[dir=rtl] .mdc-text-field--outlined.mdc-text-field--with-trailing-icon,.mdc-text-field--outlined.mdc-text-field--with-trailing-icon[dir=rtl]{padding-left:0}@supports(top: max(0%)){[dir=rtl] .mdc-text-field--outlined.mdc-text-field--with-trailing-icon,.mdc-text-field--outlined.mdc-text-field--with-trailing-icon[dir=rtl]{padding-right:max(16px, calc(var(--mdc-outlined-text-field-container-shape) + 4px))}}.mdc-text-field--outlined.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon{padding-left:0;padding-right:0}.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-notched-outline__leading,.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-notched-outline__notch,.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-notched-outline__trailing{border-color:var(--mdc-outlined-text-field-outline-color)}.mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-notched-outline .mdc-notched-outline__leading,.mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-notched-outline .mdc-notched-outline__notch,.mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-notched-outline .mdc-notched-outline__trailing{border-color:var(--mdc-outlined-text-field-hover-outline-color)}.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline__leading,.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline__notch,.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline__trailing{border-color:var(--mdc-outlined-text-field-focus-outline-color)}.mdc-text-field--outlined.mdc-text-field--disabled .mdc-notched-outline__leading,.mdc-text-field--outlined.mdc-text-field--disabled .mdc-notched-outline__notch,.mdc-text-field--outlined.mdc-text-field--disabled .mdc-notched-outline__trailing{border-color:var(--mdc-outlined-text-field-disabled-outline-color)}.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-notched-outline__leading,.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-notched-outline__notch,.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-notched-outline__trailing{border-color:var(--mdc-outlined-text-field-error-outline-color)}.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-notched-outline .mdc-notched-outline__leading,.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-notched-outline .mdc-notched-outline__notch,.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-notched-outline .mdc-notched-outline__trailing{border-color:var(--mdc-outlined-text-field-error-hover-outline-color)}.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline__leading,.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline__notch,.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline__trailing{border-color:var(--mdc-outlined-text-field-error-focus-outline-color)}.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-notched-outline .mdc-notched-outline__leading,.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-notched-outline .mdc-notched-outline__notch,.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-notched-outline .mdc-notched-outline__trailing{border-width:var(--mdc-outlined-text-field-outline-width)}.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline .mdc-notched-outline__leading,.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline .mdc-notched-outline__notch,.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline .mdc-notched-outline__trailing{border-width:var(--mdc-outlined-text-field-focus-outline-width)}.mat-mdc-form-field-textarea-control{vertical-align:middle;resize:vertical;box-sizing:border-box;height:auto;margin:0;padding:0;border:none;overflow:auto}.mat-mdc-form-field-input-control.mat-mdc-form-field-input-control{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font:inherit;letter-spacing:inherit;text-decoration:inherit;text-transform:inherit;border:none}.mat-mdc-form-field .mat-mdc-floating-label.mdc-floating-label{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;line-height:normal;pointer-events:all}.mdc-text-field--no-label:not(.mdc-text-field--textarea) .mat-mdc-form-field-input-control.mdc-text-field__input,.mat-mdc-text-field-wrapper .mat-mdc-form-field-input-control{height:auto}.mat-mdc-text-field-wrapper .mat-mdc-form-field-input-control.mdc-text-field__input[type=color]{height:23px}.mat-mdc-text-field-wrapper{height:auto;flex:auto}.mat-mdc-form-field-has-icon-prefix .mat-mdc-text-field-wrapper{padding-left:0;--mat-mdc-form-field-label-offset-x: -16px}.mat-mdc-form-field-has-icon-suffix .mat-mdc-text-field-wrapper{padding-right:0}[dir=rtl] .mat-mdc-text-field-wrapper{padding-left:16px;padding-right:16px}[dir=rtl] .mat-mdc-form-field-has-icon-suffix .mat-mdc-text-field-wrapper{padding-left:0}[dir=rtl] .mat-mdc-form-field-has-icon-prefix .mat-mdc-text-field-wrapper{padding-right:0}.mat-form-field-disabled .mdc-text-field__input::placeholder{color:var(--mat-form-field-disabled-input-text-placeholder-color)}.mat-form-field-disabled .mdc-text-field__input::-moz-placeholder{color:var(--mat-form-field-disabled-input-text-placeholder-color)}.mat-form-field-disabled .mdc-text-field__input::-webkit-input-placeholder{color:var(--mat-form-field-disabled-input-text-placeholder-color)}.mat-form-field-disabled .mdc-text-field__input:-ms-input-placeholder{color:var(--mat-form-field-disabled-input-text-placeholder-color)}.mat-mdc-form-field-label-always-float .mdc-text-field__input::placeholder{transition-delay:40ms;transition-duration:110ms;opacity:1}.mat-mdc-text-field-wrapper .mat-mdc-form-field-infix .mat-mdc-floating-label{left:auto;right:auto}.mat-mdc-text-field-wrapper.mdc-text-field--outlined .mdc-text-field__input{display:inline-block}.mat-mdc-form-field .mat-mdc-text-field-wrapper.mdc-text-field .mdc-notched-outline__notch{padding-top:0}.mat-mdc-text-field-wrapper::before{content:none}.mat-mdc-form-field-subscript-wrapper{box-sizing:border-box;width:100%;position:relative}.mat-mdc-form-field-hint-wrapper,.mat-mdc-form-field-error-wrapper{position:absolute;top:0;left:0;right:0;padding:0 16px}.mat-mdc-form-field-subscript-dynamic-size .mat-mdc-form-field-hint-wrapper,.mat-mdc-form-field-subscript-dynamic-size .mat-mdc-form-field-error-wrapper{position:static}.mat-mdc-form-field-bottom-align::before{content:\"\";display:inline-block;height:16px}.mat-mdc-form-field-bottom-align.mat-mdc-form-field-subscript-dynamic-size::before{content:unset}.mat-mdc-form-field-hint-end{order:1}.mat-mdc-form-field-hint-wrapper{display:flex}.mat-mdc-form-field-hint-spacer{flex:1 0 1em}.mat-mdc-form-field-error{display:block}.mat-mdc-form-field-focus-overlay{top:0;left:0;right:0;bottom:0;position:absolute;opacity:0;pointer-events:none}select.mat-mdc-form-field-input-control{-moz-appearance:none;-webkit-appearance:none;background-color:rgba(0,0,0,0);display:inline-flex;box-sizing:border-box}select.mat-mdc-form-field-input-control:not(:disabled){cursor:pointer}.mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-infix::after{content:\"\";width:0;height:0;border-left:5px solid rgba(0,0,0,0);border-right:5px solid rgba(0,0,0,0);border-top:5px solid;position:absolute;right:0;top:50%;margin-top:-2.5px;pointer-events:none}[dir=rtl] .mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-infix::after{right:auto;left:0}.mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-input-control{padding-right:15px}[dir=rtl] .mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-input-control{padding-right:0;padding-left:15px}.cdk-high-contrast-active .mat-form-field-appearance-fill .mat-mdc-text-field-wrapper{outline:solid 1px}.cdk-high-contrast-active .mat-form-field-appearance-fill.mat-form-field-disabled .mat-mdc-text-field-wrapper{outline-color:GrayText}.cdk-high-contrast-active .mat-form-field-appearance-fill.mat-focused .mat-mdc-text-field-wrapper{outline:dashed 3px}.cdk-high-contrast-active .mat-mdc-form-field.mat-focused .mdc-notched-outline{border:dashed 3px}.mat-mdc-form-field-input-control[type=date],.mat-mdc-form-field-input-control[type=datetime],.mat-mdc-form-field-input-control[type=datetime-local],.mat-mdc-form-field-input-control[type=month],.mat-mdc-form-field-input-control[type=week],.mat-mdc-form-field-input-control[type=time]{line-height:1}.mat-mdc-form-field-input-control::-webkit-datetime-edit{line-height:1;padding:0;margin-bottom:-2px}.mat-mdc-form-field{--mat-mdc-form-field-floating-label-scale: 0.75;display:inline-flex;flex-direction:column;min-width:0;text-align:left;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:var(--mat-form-field-container-text-font);line-height:var(--mat-form-field-container-text-line-height);font-size:var(--mat-form-field-container-text-size);letter-spacing:var(--mat-form-field-container-text-tracking);font-weight:var(--mat-form-field-container-text-weight)}[dir=rtl] .mat-mdc-form-field{text-align:right}.mat-mdc-form-field .mdc-text-field--outlined .mdc-floating-label--float-above{font-size:calc(var(--mat-form-field-outlined-label-text-populated-size) * var(--mat-mdc-form-field-floating-label-scale))}.mat-mdc-form-field .mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{font-size:var(--mat-form-field-outlined-label-text-populated-size)}.mat-mdc-form-field-flex{display:inline-flex;align-items:baseline;box-sizing:border-box;width:100%}.mat-mdc-text-field-wrapper{width:100%}.mat-mdc-form-field-icon-prefix,.mat-mdc-form-field-icon-suffix{align-self:center;line-height:0;pointer-events:auto;position:relative;z-index:1}.mat-mdc-form-field-icon-prefix,[dir=rtl] .mat-mdc-form-field-icon-suffix{padding:0 4px 0 0}.mat-mdc-form-field-icon-suffix,[dir=rtl] .mat-mdc-form-field-icon-prefix{padding:0 0 0 4px}.mat-mdc-form-field-icon-prefix>.mat-icon,.mat-mdc-form-field-icon-suffix>.mat-icon{padding:12px;box-sizing:content-box}.mat-mdc-form-field-subscript-wrapper .mat-icon,.mat-mdc-form-field label .mat-icon{width:1em;height:1em;font-size:inherit}.mat-mdc-form-field-infix{flex:auto;min-width:0;width:180px;position:relative;box-sizing:border-box}.mat-mdc-form-field .mdc-notched-outline__notch{margin-left:-1px;-webkit-clip-path:inset(-9em -999em -9em 1px);clip-path:inset(-9em -999em -9em 1px)}[dir=rtl] .mat-mdc-form-field .mdc-notched-outline__notch{margin-left:0;margin-right:-1px;-webkit-clip-path:inset(-9em 1px -9em -999em);clip-path:inset(-9em 1px -9em -999em)}.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field__input{transition:opacity 150ms 0ms cubic-bezier(0.4, 0, 0.2, 1)}@media all{.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field__input::placeholder{transition:opacity 67ms 0ms cubic-bezier(0.4, 0, 0.2, 1)}}@media all{.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field__input:-ms-input-placeholder{transition:opacity 67ms 0ms cubic-bezier(0.4, 0, 0.2, 1)}}@media all{.mdc-text-field--no-label .mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field__input::placeholder,.mdc-text-field--focused .mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field__input::placeholder{transition-delay:40ms;transition-duration:110ms}}@media all{.mdc-text-field--no-label .mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field__input:-ms-input-placeholder,.mdc-text-field--focused .mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field__input:-ms-input-placeholder{transition-delay:40ms;transition-duration:110ms}}.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field__affix{transition:opacity 150ms 0ms cubic-bezier(0.4, 0, 0.2, 1)}.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field--filled.mdc-ripple-upgraded--background-focused .mdc-text-field__ripple::before,.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field--filled:not(.mdc-ripple-upgraded):focus .mdc-text-field__ripple::before{transition-duration:75ms}.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field--outlined .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-text-field-outlined 250ms 1}@keyframes mdc-floating-label-shake-float-above-text-field-outlined{0%{transform:translateX(calc(0% - 0%)) translateY(calc(0% - 34.75px)) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - 0%)) translateY(calc(0% - 34.75px)) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - 0%)) translateY(calc(0% - 34.75px)) scale(0.75)}100%{transform:translateX(calc(0% - 0%)) translateY(calc(0% - 34.75px)) scale(0.75)}}.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field--textarea{transition:none}.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field--textarea.mdc-text-field--filled .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-textarea-filled 250ms 1}@keyframes mdc-floating-label-shake-float-above-textarea-filled{0%{transform:translateX(calc(0% - 0%)) translateY(calc(0% - 10.25px)) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - 0%)) translateY(calc(0% - 10.25px)) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - 0%)) translateY(calc(0% - 10.25px)) scale(0.75)}100%{transform:translateX(calc(0% - 0%)) translateY(calc(0% - 10.25px)) scale(0.75)}}.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field--textarea.mdc-text-field--outlined .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-textarea-outlined 250ms 1}@keyframes mdc-floating-label-shake-float-above-textarea-outlined{0%{transform:translateX(calc(0% - 0%)) translateY(calc(0% - 24.75px)) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - 0%)) translateY(calc(0% - 24.75px)) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - 0%)) translateY(calc(0% - 24.75px)) scale(0.75)}100%{transform:translateX(calc(0% - 0%)) translateY(calc(0% - 24.75px)) scale(0.75)}}.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-text-field-outlined-leading-icon 250ms 1}@keyframes mdc-floating-label-shake-float-above-text-field-outlined-leading-icon{0%{transform:translateX(calc(0% - 32px)) translateY(calc(0% - 34.75px)) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - 32px)) translateY(calc(0% - 34.75px)) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - 32px)) translateY(calc(0% - 34.75px)) scale(0.75)}100%{transform:translateX(calc(0% - 32px)) translateY(calc(0% - 34.75px)) scale(0.75)}}[dir=rtl] .mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--shake,.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field--with-leading-icon.mdc-text-field--outlined[dir=rtl] .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-text-field-outlined-leading-icon 250ms 1}@keyframes mdc-floating-label-shake-float-above-text-field-outlined-leading-icon-rtl{0%{transform:translateX(calc(0% - -32px)) translateY(calc(0% - 34.75px)) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - -32px)) translateY(calc(0% - 34.75px)) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - -32px)) translateY(calc(0% - 34.75px)) scale(0.75)}100%{transform:translateX(calc(0% - -32px)) translateY(calc(0% - 34.75px)) scale(0.75)}}.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-floating-label{transition:transform 150ms cubic-bezier(0.4, 0, 0.2, 1),color 150ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-standard 250ms 1}@keyframes mdc-floating-label-shake-float-above-standard{0%{transform:translateX(calc(0% - 0%)) translateY(calc(0% - 106%)) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - 0%)) translateY(calc(0% - 106%)) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - 0%)) translateY(calc(0% - 106%)) scale(0.75)}100%{transform:translateX(calc(0% - 0%)) translateY(calc(0% - 106%)) scale(0.75)}}.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-line-ripple::after{transition:transform 180ms cubic-bezier(0.4, 0, 0.2, 1),opacity 180ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-notched-outline .mdc-floating-label{max-width:calc(100% + 1px)}.mdc-notched-outline--upgraded .mdc-floating-label--float-above{max-width:calc(133.3333333333% + 1px)}"],
    encapsulation: 2,
    data: {
      animation: [matFormFieldAnimations.transitionMessages]
    },
    changeDetection: 0
  });
  return MatFormField;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
let MatFormFieldModule = /*#__PURE__*/(() => {
  var _class11;
  class MatFormFieldModule {}
  _class11 = MatFormFieldModule;
  _class11.ɵfac = function _class11_Factory(t) {
    return new (t || _class11)();
  };
  _class11.ɵmod = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
    type: _class11
  });
  _class11.ɵinj = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
    imports: [_angular_material_core__WEBPACK_IMPORTED_MODULE_9__.MatCommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_8__.CommonModule, _angular_cdk_observers__WEBPACK_IMPORTED_MODULE_10__.ObserversModule, _angular_material_core__WEBPACK_IMPORTED_MODULE_9__.MatCommonModule]
  });
  return MatFormFieldModule;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();

/**
 * Generated bundle index. Do not edit.
 */



/***/ }),

/***/ 32755:
/*!***********************************************************!*\
  !*** ./node_modules/@angular/material/fesm2022/input.mjs ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MAT_INPUT_VALUE_ACCESSOR: () => (/* binding */ MAT_INPUT_VALUE_ACCESSOR),
/* harmony export */   MatInput: () => (/* binding */ MatInput),
/* harmony export */   MatInputModule: () => (/* binding */ MatInputModule),
/* harmony export */   getMatInputUnsupportedTypeError: () => (/* binding */ getMatInputUnsupportedTypeError)
/* harmony export */ });
/* harmony import */ var _angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/cdk/coercion */ 45029);
/* harmony import */ var _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/cdk/platform */ 92237);
/* harmony import */ var _angular_cdk_text_field__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/cdk/text-field */ 29557);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 59936);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ 8810);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/core */ 56381);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/form-field */ 73637);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 85028);















/** @docs-private */
function getMatInputUnsupportedTypeError(type) {
  return Error(`Input type "${type}" isn't supported by matInput.`);
}

/**
 * This token is used to inject the object whose value should be set into `MatInput`. If none is
 * provided, the native `HTMLInputElement` is used. Directives like `MatDatepickerInput` can provide
 * themselves for this token, in order to make `MatInput` delegate the getting and setting of the
 * value to them.
 */
const MAT_INPUT_VALUE_ACCESSOR = /*#__PURE__*/new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken('MAT_INPUT_VALUE_ACCESSOR');

// Invalid input type. Using one of these will throw an MatInputUnsupportedTypeError.
const MAT_INPUT_INVALID_TYPES = ['button', 'checkbox', 'file', 'hidden', 'image', 'radio', 'range', 'reset', 'submit'];
let nextUniqueId = 0;
// Boilerplate for applying mixins to MatInput.
/** @docs-private */
const _MatInputBase = /*#__PURE__*/(0,_angular_material_core__WEBPACK_IMPORTED_MODULE_1__.mixinErrorState)(class {
  constructor(_defaultErrorStateMatcher, _parentForm, _parentFormGroup,
  /**
   * Form control bound to the component.
   * Implemented as part of `MatFormFieldControl`.
   * @docs-private
   */
  ngControl) {
    this._defaultErrorStateMatcher = _defaultErrorStateMatcher;
    this._parentForm = _parentForm;
    this._parentFormGroup = _parentFormGroup;
    this.ngControl = ngControl;
    /**
     * Emits whenever the component state changes and should cause the parent
     * form field to update. Implemented as part of `MatFormFieldControl`.
     * @docs-private
     */
    this.stateChanges = new rxjs__WEBPACK_IMPORTED_MODULE_2__.Subject();
  }
});
let MatInput = /*#__PURE__*/(() => {
  var _class;
  class MatInput extends _MatInputBase {
    /**
     * Implemented as part of MatFormFieldControl.
     * @docs-private
     */
    get disabled() {
      return this._disabled;
    }
    set disabled(value) {
      this._disabled = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_3__.coerceBooleanProperty)(value);
      // Browsers may not fire the blur event if the input is disabled too quickly.
      // Reset from here to ensure that the element doesn't become stuck.
      if (this.focused) {
        this.focused = false;
        this.stateChanges.next();
      }
    }
    /**
     * Implemented as part of MatFormFieldControl.
     * @docs-private
     */
    get id() {
      return this._id;
    }
    set id(value) {
      this._id = value || this._uid;
    }
    /**
     * Implemented as part of MatFormFieldControl.
     * @docs-private
     */
    get required() {
      return this._required ?? this.ngControl?.control?.hasValidator(_angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.required) ?? false;
    }
    set required(value) {
      this._required = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_3__.coerceBooleanProperty)(value);
    }
    /** Input type of the element. */
    get type() {
      return this._type;
    }
    set type(value) {
      this._type = value || 'text';
      this._validateType();
      // When using Angular inputs, developers are no longer able to set the properties on the native
      // input element. To ensure that bindings for `type` work, we need to sync the setter
      // with the native property. Textarea elements don't support the type property or attribute.
      if (!this._isTextarea && (0,_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_5__.getSupportedInputTypes)().has(this._type)) {
        this._elementRef.nativeElement.type = this._type;
      }
    }
    /**
     * Implemented as part of MatFormFieldControl.
     * @docs-private
     */
    get value() {
      return this._inputValueAccessor.value;
    }
    set value(value) {
      if (value !== this.value) {
        this._inputValueAccessor.value = value;
        this.stateChanges.next();
      }
    }
    /** Whether the element is readonly. */
    get readonly() {
      return this._readonly;
    }
    set readonly(value) {
      this._readonly = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_3__.coerceBooleanProperty)(value);
    }
    constructor(_elementRef, _platform, ngControl, _parentForm, _parentFormGroup, _defaultErrorStateMatcher, inputValueAccessor, _autofillMonitor, ngZone,
    // TODO: Remove this once the legacy appearance has been removed. We only need
    // to inject the form field for determining whether the placeholder has been promoted.
    _formField) {
      super(_defaultErrorStateMatcher, _parentForm, _parentFormGroup, ngControl);
      this._elementRef = _elementRef;
      this._platform = _platform;
      this._autofillMonitor = _autofillMonitor;
      this._formField = _formField;
      this._uid = `mat-input-${nextUniqueId++}`;
      /**
       * Implemented as part of MatFormFieldControl.
       * @docs-private
       */
      this.focused = false;
      /**
       * Implemented as part of MatFormFieldControl.
       * @docs-private
       */
      this.stateChanges = new rxjs__WEBPACK_IMPORTED_MODULE_2__.Subject();
      /**
       * Implemented as part of MatFormFieldControl.
       * @docs-private
       */
      this.controlType = 'mat-input';
      /**
       * Implemented as part of MatFormFieldControl.
       * @docs-private
       */
      this.autofilled = false;
      this._disabled = false;
      this._type = 'text';
      this._readonly = false;
      this._neverEmptyInputTypes = ['date', 'datetime', 'datetime-local', 'month', 'time', 'week'].filter(t => (0,_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_5__.getSupportedInputTypes)().has(t));
      this._iOSKeyupListener = event => {
        const el = event.target;
        // Note: We specifically check for 0, rather than `!el.selectionStart`, because the two
        // indicate different things. If the value is 0, it means that the caret is at the start
        // of the input, whereas a value of `null` means that the input doesn't support
        // manipulating the selection range. Inputs that don't support setting the selection range
        // will throw an error so we want to avoid calling `setSelectionRange` on them. See:
        // https://html.spec.whatwg.org/multipage/input.html#do-not-apply
        if (!el.value && el.selectionStart === 0 && el.selectionEnd === 0) {
          // Note: Just setting `0, 0` doesn't fix the issue. Setting
          // `1, 1` fixes it for the first time that you type text and
          // then hold delete. Toggling to `1, 1` and then back to
          // `0, 0` seems to completely fix it.
          el.setSelectionRange(1, 1);
          el.setSelectionRange(0, 0);
        }
      };
      const element = this._elementRef.nativeElement;
      const nodeName = element.nodeName.toLowerCase();
      // If no input value accessor was explicitly specified, use the element as the input value
      // accessor.
      this._inputValueAccessor = inputValueAccessor || element;
      this._previousNativeValue = this.value;
      // Force setter to be called in case id was not specified.
      this.id = this.id;
      // On some versions of iOS the caret gets stuck in the wrong place when holding down the delete
      // key. In order to get around this we need to "jiggle" the caret loose. Since this bug only
      // exists on iOS, we only bother to install the listener on iOS.
      if (_platform.IOS) {
        ngZone.runOutsideAngular(() => {
          _elementRef.nativeElement.addEventListener('keyup', this._iOSKeyupListener);
        });
      }
      this._isServer = !this._platform.isBrowser;
      this._isNativeSelect = nodeName === 'select';
      this._isTextarea = nodeName === 'textarea';
      this._isInFormField = !!_formField;
      if (this._isNativeSelect) {
        this.controlType = element.multiple ? 'mat-native-select-multiple' : 'mat-native-select';
      }
    }
    ngAfterViewInit() {
      if (this._platform.isBrowser) {
        this._autofillMonitor.monitor(this._elementRef.nativeElement).subscribe(event => {
          this.autofilled = event.isAutofilled;
          this.stateChanges.next();
        });
      }
    }
    ngOnChanges() {
      this.stateChanges.next();
    }
    ngOnDestroy() {
      this.stateChanges.complete();
      if (this._platform.isBrowser) {
        this._autofillMonitor.stopMonitoring(this._elementRef.nativeElement);
      }
      if (this._platform.IOS) {
        this._elementRef.nativeElement.removeEventListener('keyup', this._iOSKeyupListener);
      }
    }
    ngDoCheck() {
      if (this.ngControl) {
        // We need to re-evaluate this on every change detection cycle, because there are some
        // error triggers that we can't subscribe to (e.g. parent form submissions). This means
        // that whatever logic is in here has to be super lean or we risk destroying the performance.
        this.updateErrorState();
        // Since the input isn't a `ControlValueAccessor`, we don't have a good way of knowing when
        // the disabled state has changed. We can't use the `ngControl.statusChanges`, because it
        // won't fire if the input is disabled with `emitEvents = false`, despite the input becoming
        // disabled.
        if (this.ngControl.disabled !== null && this.ngControl.disabled !== this.disabled) {
          this.disabled = this.ngControl.disabled;
          this.stateChanges.next();
        }
      }
      // We need to dirty-check the native element's value, because there are some cases where
      // we won't be notified when it changes (e.g. the consumer isn't using forms or they're
      // updating the value using `emitEvent: false`).
      this._dirtyCheckNativeValue();
      // We need to dirty-check and set the placeholder attribute ourselves, because whether it's
      // present or not depends on a query which is prone to "changed after checked" errors.
      this._dirtyCheckPlaceholder();
    }
    /** Focuses the input. */
    focus(options) {
      this._elementRef.nativeElement.focus(options);
    }
    /** Callback for the cases where the focused state of the input changes. */
    _focusChanged(isFocused) {
      if (isFocused !== this.focused) {
        this.focused = isFocused;
        this.stateChanges.next();
      }
    }
    _onInput() {
      // This is a noop function and is used to let Angular know whenever the value changes.
      // Angular will run a new change detection each time the `input` event has been dispatched.
      // It's necessary that Angular recognizes the value change, because when floatingLabel
      // is set to false and Angular forms aren't used, the placeholder won't recognize the
      // value changes and will not disappear.
      // Listening to the input event wouldn't be necessary when the input is using the
      // FormsModule or ReactiveFormsModule, because Angular forms also listens to input events.
    }
    /** Does some manual dirty checking on the native input `value` property. */
    _dirtyCheckNativeValue() {
      const newValue = this._elementRef.nativeElement.value;
      if (this._previousNativeValue !== newValue) {
        this._previousNativeValue = newValue;
        this.stateChanges.next();
      }
    }
    /** Does some manual dirty checking on the native input `placeholder` attribute. */
    _dirtyCheckPlaceholder() {
      const placeholder = this._getPlaceholder();
      if (placeholder !== this._previousPlaceholder) {
        const element = this._elementRef.nativeElement;
        this._previousPlaceholder = placeholder;
        placeholder ? element.setAttribute('placeholder', placeholder) : element.removeAttribute('placeholder');
      }
    }
    /** Gets the current placeholder of the form field. */
    _getPlaceholder() {
      return this.placeholder || null;
    }
    /** Make sure the input is a supported type. */
    _validateType() {
      if (MAT_INPUT_INVALID_TYPES.indexOf(this._type) > -1 && (typeof ngDevMode === 'undefined' || ngDevMode)) {
        throw getMatInputUnsupportedTypeError(this._type);
      }
    }
    /** Checks whether the input type is one of the types that are never empty. */
    _isNeverEmpty() {
      return this._neverEmptyInputTypes.indexOf(this._type) > -1;
    }
    /** Checks whether the input is invalid based on the native validation. */
    _isBadInput() {
      // The `validity` property won't be present on platform-server.
      let validity = this._elementRef.nativeElement.validity;
      return validity && validity.badInput;
    }
    /**
     * Implemented as part of MatFormFieldControl.
     * @docs-private
     */
    get empty() {
      return !this._isNeverEmpty() && !this._elementRef.nativeElement.value && !this._isBadInput() && !this.autofilled;
    }
    /**
     * Implemented as part of MatFormFieldControl.
     * @docs-private
     */
    get shouldLabelFloat() {
      if (this._isNativeSelect) {
        // For a single-selection `<select>`, the label should float when the selected option has
        // a non-empty display value. For a `<select multiple>`, the label *always* floats to avoid
        // overlapping the label with the options.
        const selectElement = this._elementRef.nativeElement;
        const firstOption = selectElement.options[0];
        // On most browsers the `selectedIndex` will always be 0, however on IE and Edge it'll be
        // -1 if the `value` is set to something, that isn't in the list of options, at a later point.
        return this.focused || selectElement.multiple || !this.empty || !!(selectElement.selectedIndex > -1 && firstOption && firstOption.label);
      } else {
        return this.focused || !this.empty;
      }
    }
    /**
     * Implemented as part of MatFormFieldControl.
     * @docs-private
     */
    setDescribedByIds(ids) {
      if (ids.length) {
        this._elementRef.nativeElement.setAttribute('aria-describedby', ids.join(' '));
      } else {
        this._elementRef.nativeElement.removeAttribute('aria-describedby');
      }
    }
    /**
     * Implemented as part of MatFormFieldControl.
     * @docs-private
     */
    onContainerClick() {
      // Do not re-focus the input element if the element is already focused. Otherwise it can happen
      // that someone clicks on a time input and the cursor resets to the "hours" field while the
      // "minutes" field was actually clicked. See: https://github.com/angular/components/issues/12849
      if (!this.focused) {
        this.focus();
      }
    }
    /** Whether the form control is a native select that is displayed inline. */
    _isInlineSelect() {
      const element = this._elementRef.nativeElement;
      return this._isNativeSelect && (element.multiple || element.size > 1);
    }
  }
  _class = MatInput;
  _class.ɵfac = function _class_Factory(t) {
    return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_5__.Platform), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgControl, 10), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgForm, 8), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormGroupDirective, 8), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_core__WEBPACK_IMPORTED_MODULE_1__.ErrorStateMatcher), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](MAT_INPUT_VALUE_ACCESSOR, 10), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_cdk_text_field__WEBPACK_IMPORTED_MODULE_6__.AutofillMonitor), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.NgZone), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__.MAT_FORM_FIELD, 8));
  };
  _class.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
    type: _class,
    selectors: [["input", "matInput", ""], ["textarea", "matInput", ""], ["select", "matNativeControl", ""], ["input", "matNativeControl", ""], ["textarea", "matNativeControl", ""]],
    hostAttrs: [1, "mat-mdc-input-element"],
    hostVars: 18,
    hostBindings: function _class_HostBindings(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("focus", function _class_focus_HostBindingHandler() {
          return ctx._focusChanged(true);
        })("blur", function _class_blur_HostBindingHandler() {
          return ctx._focusChanged(false);
        })("input", function _class_input_HostBindingHandler() {
          return ctx._onInput();
        });
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵhostProperty"]("id", ctx.id)("disabled", ctx.disabled)("required", ctx.required);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattribute"]("name", ctx.name || null)("readonly", ctx.readonly && !ctx._isNativeSelect || null)("aria-invalid", ctx.empty && ctx.required ? null : ctx.errorState)("aria-required", ctx.required)("id", ctx.id);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("mat-input-server", ctx._isServer)("mat-mdc-form-field-textarea-control", ctx._isInFormField && ctx._isTextarea)("mat-mdc-form-field-input-control", ctx._isInFormField)("mdc-text-field__input", ctx._isInFormField)("mat-mdc-native-select-inline", ctx._isInlineSelect());
      }
    },
    inputs: {
      disabled: "disabled",
      id: "id",
      placeholder: "placeholder",
      name: "name",
      required: "required",
      type: "type",
      errorStateMatcher: "errorStateMatcher",
      userAriaDescribedBy: ["aria-describedby", "userAriaDescribedBy"],
      value: "value",
      readonly: "readonly"
    },
    exportAs: ["matInput"],
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([{
      provide: _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__.MatFormFieldControl,
      useExisting: _class
    }]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵNgOnChangesFeature"]]
  });
  return MatInput;
})();
/*#__PURE__*/(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
let MatInputModule = /*#__PURE__*/(() => {
  var _class2;
  class MatInputModule {}
  _class2 = MatInputModule;
  _class2.ɵfac = function _class2_Factory(t) {
    return new (t || _class2)();
  };
  _class2.ɵmod = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
    type: _class2
  });
  _class2.ɵinj = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
    imports: [_angular_material_core__WEBPACK_IMPORTED_MODULE_1__.MatCommonModule, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__.MatFormFieldModule, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__.MatFormFieldModule, _angular_cdk_text_field__WEBPACK_IMPORTED_MODULE_6__.TextFieldModule, _angular_material_core__WEBPACK_IMPORTED_MODULE_1__.MatCommonModule]
  });
  return MatInputModule;
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
//# sourceMappingURL=711.js.map