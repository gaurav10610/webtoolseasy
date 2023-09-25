"use strict";
(self["webpackChunkwebtoolseasy"] = self["webpackChunkwebtoolseasy"] || []).push([["src_app_modules_text-compare_text-compare_module_ts"],{

/***/ 7736:
/*!*********************************************************************!*\
  !*** ./src/app/modules/text-compare/text-compare-routing.module.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TextCompareRoutingModule: () => (/* binding */ TextCompareRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 7947);
/* harmony import */ var _text_compare_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./text-compare.component */ 8218);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 1699);
var _class;




const routes = [{
  path: '',
  component: _text_compare_component__WEBPACK_IMPORTED_MODULE_0__.TextCompareComponent
}];
class TextCompareRoutingModule {}
_class = TextCompareRoutingModule;
_class.ɵfac = function TextCompareRoutingModule_Factory(t) {
  return new (t || _class)();
};
_class.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
  type: _class
});
_class.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](TextCompareRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
})();

/***/ }),

/***/ 8218:
/*!****************************************************************!*\
  !*** ./src/app/modules/text-compare/text-compare.component.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TextCompareComponent: () => (/* binding */ TextCompareComponent)
/* harmony export */ });
/* harmony import */ var _Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 1670);
/* harmony import */ var src_environments_component_config_text_compare_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/environments/component-config/text-compare/config */ 2156);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var src_app_service_file_file_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/service/file/file.service */ 6857);
/* harmony import */ var src_app_service_platform_metadata_platform_metadata_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/service/platform-metadata/platform-metadata.service */ 3242);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/icon */ 6515);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/button */ 895);
/* harmony import */ var ngx_monaco_editor_v2__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ngx-monaco-editor-v2 */ 8937);

var _class;








const _c0 = ["inputFiles"];
const _c1 = ["diffEdior"];
function TextCompareComponent_ngx_monaco_diff_editor_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](0, "ngx-monaco-diff-editor", 8, 9);
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("options", ctx_r1.editorOptions)("modifiedModel", ctx_r1.modifiedModel)("originalModel", ctx_r1.originalModel);
  }
}
class TextCompareComponent {
  constructor(renderer, fileService, zoneRef, platformMetaDataService) {
    this.renderer = renderer;
    this.fileService = fileService;
    this.zoneRef = zoneRef;
    this.platformMetaDataService = platformMetaDataService;
    this.editorOptions = {
      originalEditable: true,
      fontSize: 17
    };
    this.originalModel = {
      code: `This was original data!\nwebtoolseasy is awesome`,
      language: 'text/plain'
    };
    this.modifiedModel = {
      code: `This was modified data!\nwebtoolseasy is super cool`,
      language: 'text/plain'
    };
    this.applicationConfig = src_environments_component_config_text_compare_config__WEBPACK_IMPORTED_MODULE_1__.componentConfig;
    this.descriptionData = src_environments_component_config_text_compare_config__WEBPACK_IMPORTED_MODULE_1__.descriptionData;
  }
  selectFiles(event) {
    var _this = this;
    return (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const file = event.target.files[0];
      if (_this.currentFileDialogId === 'original') {
        _this.fileService.readFileAsText(file, _this.onTextFile1Upload.bind(_this));
      }
      if (_this.currentFileDialogId === 'modified') {
        _this.fileService.readFileAsText(file, _this.onTextFile2Upload.bind(_this));
      }
      event.target.value = null;
    })();
  }
  onTextFile1Upload(textContent) {
    var _this2 = this;
    return (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this2.zoneRef.run(() => {
        const dataModel = {
          code: textContent,
          language: 'text/plain'
        };
        _this2.diffEdior.originalModel = dataModel;
      });
    })();
  }
  onTextFile2Upload(textContent) {
    var _this3 = this;
    return (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this3.zoneRef.run(() => {
        const dataModel = {
          code: textContent,
          language: 'text/plain'
        };
        _this3.diffEdior.modifiedModel = dataModel;
      });
    })();
  }
  /**
   * select file
   * @param fileId
   */
  openFileDialog(fileId) {
    var _this4 = this;
    return (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this4.currentFileDialogId = fileId;
      _this4.renderer.selectRootElement(_this4.inputFiles.nativeElement, true).click();
    })();
  }
}
_class = TextCompareComponent;
_class.ɵfac = function TextCompareComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_4__.Renderer2), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](src_app_service_file_file_service__WEBPACK_IMPORTED_MODULE_2__.FileService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_4__.NgZone), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](src_app_service_platform_metadata_platform_metadata_service__WEBPACK_IMPORTED_MODULE_3__.PlatformMetadataService));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["app-text-compare"]],
  viewQuery: function TextCompareComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵviewQuery"](_c0, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵviewQuery"](_c1, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵloadQuery"]()) && (ctx.inputFiles = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵloadQuery"]()) && (ctx.diffEdior = _t.first);
    }
  },
  decls: 19,
  vars: 1,
  consts: [[1, "flex-display", "flex-column-flow", "flex-align-center", "flex-gap-medium"], ["type", "file", 2, "display", "none", 3, "change"], ["inputFiles", ""], [1, "flex-display", "flex-column-flow", "flex-align-center", "text-area-container", "full-width", "flex-gap-medium"], [1, "flex-display", "flex-row-flow", "full-width", 2, "justify-content", "space-around"], [1, "div-label"], ["class", "full-width border-grey", "style", "height: 100%", 3, "options", "modifiedModel", "originalModel", 4, "ngIf"], ["mat-stroked-button", "", "aria-label", "switch_text_button", "color", "primary", 3, "click"], [1, "full-width", "border-grey", 2, "height", "100%", 3, "options", "modifiedModel", "originalModel"], ["diffEdior", ""]],
  template: function TextCompareComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 0)(1, "input", 1, 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("change", function TextCompareComponent_Template_input_change_1_listener($event) {
        return ctx.selectFiles($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "div", 3)(4, "div", 4)(5, "span", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](6, "Original Data");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](7, "span", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](8, "Modified Data");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](9, TextCompareComponent_ngx_monaco_diff_editor_9_Template, 2, 3, "ngx-monaco-diff-editor", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](10, "div", 4)(11, "button", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function TextCompareComponent_Template_button_click_11_listener() {
        return ctx.openFileDialog("original");
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](12, "mat-icon");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](13, "file_upload");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](14, "Original Text ");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](15, "button", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function TextCompareComponent_Template_button_click_15_listener() {
        return ctx.openFileDialog("modified");
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](16, "mat-icon");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](17, "file_upload");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](18, "Modified Text ");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](9);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.platformMetaDataService.isPlatformBrowser);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.NgIf, _angular_material_icon__WEBPACK_IMPORTED_MODULE_6__.MatIcon, _angular_material_button__WEBPACK_IMPORTED_MODULE_7__.MatButton, ngx_monaco_editor_v2__WEBPACK_IMPORTED_MODULE_8__.DiffEditorComponent],
  styles: [".div-label[_ngcontent-%COMP%] {\n  font-size: large;\n}\n\n.text-area-container[_ngcontent-%COMP%] {\n  height: 40em;\n}\n\n@media screen and (max-width: 735px) {\n  .text-area-container[_ngcontent-%COMP%] {\n    height: 25em;\n  }\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvbW9kdWxlcy90ZXh0LWNvbXBhcmUvdGV4dC1jb21wYXJlLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsZ0JBQUE7QUFDRjs7QUFFQTtFQUNFLFlBQUE7QUFDRjs7QUFFQTtFQUNFO0lBQ0UsWUFBQTtFQUNGO0FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIuZGl2LWxhYmVsIHtcbiAgZm9udC1zaXplOiBsYXJnZTtcbn1cblxuLnRleHQtYXJlYS1jb250YWluZXIge1xuICBoZWlnaHQ6IDQwZW07XG59XG5cbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDczNXB4KSB7XG4gIC50ZXh0LWFyZWEtY29udGFpbmVyIHtcbiAgICBoZWlnaHQ6IDI1ZW07XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
});

/***/ }),

/***/ 7761:
/*!*************************************************************!*\
  !*** ./src/app/modules/text-compare/text-compare.module.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TextCompareModule: () => (/* binding */ TextCompareModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _text_compare_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./text-compare-routing.module */ 7736);
/* harmony import */ var _text_compare_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./text-compare.component */ 8218);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/button */ 895);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/icon */ 6515);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ 8849);
/* harmony import */ var ngx_monaco_editor_v2__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngx-monaco-editor-v2 */ 8937);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 1699);
var _class;









class TextCompareModule {}
_class = TextCompareModule;
_class.ɵfac = function TextCompareModule_Factory(t) {
  return new (t || _class)();
};
_class.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
  type: _class
});
_class.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _text_compare_routing_module__WEBPACK_IMPORTED_MODULE_0__.TextCompareRoutingModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__.MatIconModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_5__.MatButtonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormsModule, ngx_monaco_editor_v2__WEBPACK_IMPORTED_MODULE_7__.MonacoEditorModule.forRoot()]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](TextCompareModule, {
    declarations: [_text_compare_component__WEBPACK_IMPORTED_MODULE_1__.TextCompareComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _text_compare_routing_module__WEBPACK_IMPORTED_MODULE_0__.TextCompareRoutingModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__.MatIconModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_5__.MatButtonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormsModule, ngx_monaco_editor_v2__WEBPACK_IMPORTED_MODULE_7__.MonacoEditorModule]
  });
})();

/***/ }),

/***/ 2156:
/*!******************************************************************!*\
  !*** ./src/environments/component-config/text-compare/config.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   componentConfig: () => (/* binding */ componentConfig),
/* harmony export */   descriptionData: () => (/* binding */ descriptionData)
/* harmony export */ });
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/environments/environment */ 553);
/* harmony import */ var src_environments_tools_directory_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/environments/tools-directory-config */ 6636);


const navigationUrl = '/tools/text-compare';
const pageTitle = 'Online Text Compare Tool - Compare Two Texts for Differences';
const pageDescription = `Our text compare tool is a quick and easy way to compare two texts for similarity and differences. It's perfect for students, writers, bloggers.`;
const imageUrl = `${src_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.screenshotsBaseUrl}/text-diff.png`;
const keywords = 'text compare tool, text comparison tool, text diff tool, compare text online, compare text files, compare text documents, plagiarism checker, compare documents for similarity, compare two texts, text similarity checker, compare text online free, text compare online, compare text ignore whitespace';
const relatedTools = [src_environments_tools_directory_config__WEBPACK_IMPORTED_MODULE_1__.ApplicationIds.WORD_COUNTER];
const componentConfig = {
  mainHeading: 'Text Compare - Text to Text Comparison',
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
  blockData: [`Looking for a quick and easy way to compare two texts for similarity and differences? Try our free online text compare tool! It's simple to use and completely free.`, 'To use the tool, simply copy and paste your texts into the text boxes and click the "Compare" button. The tool will instantly calculate the similarity percentage between the two texts and show you the differences. You can also view a side-by-side comparison of the two texts to see how they differ.', `Our text compare tool is perfect for students, writers, bloggers, and anyone else who needs to check the originality of their work. It's also great for checking for plagiarism and ensuring that your work is unique.`]
}, {
  heading: 'Here are some of the benefits of using our free online text compare tool:',
  listData: [`It's quick and easy to use.`, `It's completely free.`, `It's accurate and reliable.`, `It calculates the similarity percentage between two texts.`, `It shows you the differences between two texts.`, `It provides a side-by-side comparison of two texts.`, `It's perfect for students, writers, bloggers, and anyone else who needs to check the originality of their work.`, `It's great for checking for plagiarism and ensuring that your work is unique.`]
}, {
  heading: 'Here are some examples of how you can use our free online text compare tool:',
  listData: ['Students can use the tool to check the originality of their essays and assignments.', 'Writers can use the tool to check for plagiarism in their articles and blog posts.', 'Bloggers can use the tool to compare their blog posts to other blog posts to see if they are similar.', 'Anyone can use the tool to compare any two texts to see if they are similar.']
}, {
  heading: 'How to use our free online text compare tool:',
  listData: ['Copy and paste your texts into the text boxes.', 'The tool will instantly show you the differences.', 'You can also view a side-by-side comparison of the two texts to see how they differ.']
}, {
  heading: 'Tips for using our free online text compare tool:',
  listData: ['Make sure to copy and paste all of your text into the text boxes, including any spaces, line breaks, and punctuation.', 'If you need to compare a large amount of text, you can break it down into smaller sections and compare them one at a time.', 'You can also use the tool to compare two text files. Simply upload the files to the tool and click the "Compare" button.']
}, {
  heading: 'Benefits of using our free online text compare tool:',
  listData: ['Our tool is quick and easy to use.', 'Our tool is completely free.', 'Our tool is accurate and reliable.', 'Our tool is versatile and can be used for a variety of tasks, such as checking the originality of work, checking for plagiarism, and comparing two texts for similarity.']
}, {
  blockData: ['No matter what your needs are, our free online text compare tool is a valuable resource. Try it today and see how easy it is to use!']
}];

/***/ })

}]);
//# sourceMappingURL=src_app_modules_text-compare_text-compare_module_ts.7a0a337306a0488b.js.map