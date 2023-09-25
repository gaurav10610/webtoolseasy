"use strict";
(self["webpackChunkwebtoolseasy"] = self["webpackChunkwebtoolseasy"] || []).push([["src_app_modules_markdown-editor_markdown-editor_module_ts"],{

/***/ 1818:
/*!***************************************************************************!*\
  !*** ./src/app/modules/markdown-editor/markdown-editor-routing.module.ts ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MarkdownEditorRoutingModule: () => (/* binding */ MarkdownEditorRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 7947);
/* harmony import */ var _markdown_editor_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./markdown-editor.component */ 6406);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 1699);
var _class;




const routes = [{
  path: '',
  component: _markdown_editor_component__WEBPACK_IMPORTED_MODULE_0__.MarkdownEditorComponent
}];
class MarkdownEditorRoutingModule {}
_class = MarkdownEditorRoutingModule;
_class.ɵfac = function MarkdownEditorRoutingModule_Factory(t) {
  return new (t || _class)();
};
_class.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
  type: _class
});
_class.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](MarkdownEditorRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
})();

/***/ }),

/***/ 6406:
/*!**********************************************************************!*\
  !*** ./src/app/modules/markdown-editor/markdown-editor.component.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MarkdownEditorComponent: () => (/* binding */ MarkdownEditorComponent)
/* harmony export */ });
/* harmony import */ var _Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 1670);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var src_app_service_ffmpeg_lib_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/service/ffmpeg/lib/util */ 5601);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var src_environments_component_config_markdown_editor_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/environments/component-config/markdown-editor/config */ 1600);
/* harmony import */ var src_app_service_util_logger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/service/util/logger */ 4930);
/* harmony import */ var src_app_service_platform_metadata_platform_metadata_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/service/platform-metadata/platform-metadata.service */ 3242);
/* harmony import */ var _angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/cdk/clipboard */ 4362);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/platform-browser */ 6480);
/* harmony import */ var src_app_service_file_file_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/service/file/file.service */ 6857);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/icon */ 6515);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/button */ 895);

var _class;












const _c0 = ["editor"];
class MarkdownEditorComponent {
  constructor(platformMetaDataService, document, clipboard, domSanitizer, fileService, renderer) {
    this.platformMetaDataService = platformMetaDataService;
    this.document = document;
    this.clipboard = clipboard;
    this.domSanitizer = domSanitizer;
    this.fileService = fileService;
    this.renderer = renderer;
    this.initialValue = `
  * **Online Markdown Editor**
  * **ReadME Editor**
  * **GitHub ReadME**
  * **Bitbucket ReadME**
  
  [WebToolsEasy](https://webtoolseasy.com/tools) - Free web tools to make work super easy`;
    this.applicationConfig = src_environments_component_config_markdown_editor_config__WEBPACK_IMPORTED_MODULE_2__.componentConfig;
    this.descriptionData = src_environments_component_config_markdown_editor_config__WEBPACK_IMPORTED_MODULE_2__.descriptionData;
    this.toolbar = ['bold', 'italic', 'heading', 'strikethrough', '|', 'code', 'quote', 'unordered-list', 'ordered-list', '|', 'link', 'image', 'table', 'horizontal-rule', '|', 'side-by-side', 'fullscreen'];
  }
  ngAfterViewInit() {
    if (this.platformMetaDataService.isPlatformBrowser) {
      this.importStyle('https://cdn.jsdelivr.net/npm/easymde/dist/easymde.min.css');
      (0,src_app_service_ffmpeg_lib_util__WEBPACK_IMPORTED_MODULE_1__.importScript)('https://cdn.jsdelivr.net/npm/easymde/dist/easymde.min.js').then(() => {
        this.mdEditor = new EasyMDE({
          element: this.editor.nativeElement,
          spellChecker: false,
          toolbar: [{
            name: 'toggle-preview',
            action: EasyMDE.togglePreview,
            text: 'Preview',
            title: 'Preview Button'
          }, ...this.toolbar],
          renderingConfig: {
            sanitizerFunction: renderedHTML => {
              return this.domSanitizer.sanitize(_angular_core__WEBPACK_IMPORTED_MODULE_6__.SecurityContext.HTML, renderedHTML);
            }
          }
        });
        this.mdEditor.value(this.initialValue);
      });
    }
  }
  ngOnDestroy() {
    if (this.platformMetaDataService.isPlatformBrowser) {
      this.renderer.removeChild(this.document.head, this.style);
    }
  }
  copyMarkdownData() {
    src_app_service_util_logger__WEBPACK_IMPORTED_MODULE_3__.LogUtils.info(this.mdEditor.markdown());
    this.clipboard.copy(this.mdEditor.value());
  }
  downloadMarkdown() {
    const blob = new Blob([this.mdEditor.value()], {
      type: 'plain/text'
    });
    this.fileService.downloadFile('README.md', blob, this.renderer);
  }
  importStyle(url) {
    var _this = this;
    return (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      // Create a link element via Angular's renderer to avoid SSR troubles
      _this.style = _this.renderer.createElement('link');
      // Add the style to the head section
      _this.renderer.appendChild(_this.document.head, _this.style);
      // Set type of the link item and path to the css file
      _this.renderer.setProperty(_this.style, 'rel', 'stylesheet');
      _this.renderer.setProperty(_this.style, 'href', url);
    })();
  }
}
_class = MarkdownEditorComponent;
_class.ɵfac = function MarkdownEditorComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](src_app_service_platform_metadata_platform_metadata_service__WEBPACK_IMPORTED_MODULE_4__.PlatformMetadataService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_7__.DOCUMENT), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_8__.Clipboard), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_9__.DomSanitizer), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](src_app_service_file_file_service__WEBPACK_IMPORTED_MODULE_5__.FileService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_6__.Renderer2));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["app-markdown-editor"]],
  viewQuery: function MarkdownEditorComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵviewQuery"](_c0, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵloadQuery"]()) && (ctx.editor = _t.first);
    }
  },
  decls: 15,
  vars: 0,
  consts: [[1, "flex-display", "flex-column-flow", "flex-align-center", "flex-gap-large"], [1, "flex-display", "full-width", "flex-gap-medium", 2, "justify-content", "flex-end"], ["mat-stroked-button", "", "color", "primary", 3, "click"], [1, "full-width", 2, "font-size", "large"], [1, "full-width"], ["editor", ""]],
  template: function MarkdownEditorComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "button", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function MarkdownEditorComponent_Template_button_click_2_listener() {
        return ctx.copyMarkdownData();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "mat-icon");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](4, "content_copy");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](5, "Copy ");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](6, "button", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function MarkdownEditorComponent_Template_button_click_6_listener() {
        return ctx.downloadMarkdown();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](7, "mat-icon");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](8, "file_download");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](9, "Download ");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](10, "span", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](11, "Edit or Paste Markdown Code Here");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](12, "div", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](13, "textarea", null, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    }
  },
  dependencies: [_angular_material_icon__WEBPACK_IMPORTED_MODULE_10__.MatIcon, _angular_material_button__WEBPACK_IMPORTED_MODULE_11__.MatButton],
  styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ }),

/***/ 4040:
/*!*******************************************************************!*\
  !*** ./src/app/modules/markdown-editor/markdown-editor.module.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MarkdownEditorModule: () => (/* binding */ MarkdownEditorModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _markdown_editor_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./markdown-editor-routing.module */ 1818);
/* harmony import */ var _markdown_editor_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./markdown-editor.component */ 6406);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/button */ 895);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/icon */ 6515);
/* harmony import */ var _angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/cdk/clipboard */ 4362);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 1699);
var _class;







class MarkdownEditorModule {}
_class = MarkdownEditorModule;
_class.ɵfac = function MarkdownEditorModule_Factory(t) {
  return new (t || _class)();
};
_class.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
  type: _class
});
_class.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _markdown_editor_routing_module__WEBPACK_IMPORTED_MODULE_0__.MarkdownEditorRoutingModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__.MatIconModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_5__.MatButtonModule, _angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_6__.ClipboardModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](MarkdownEditorModule, {
    declarations: [_markdown_editor_component__WEBPACK_IMPORTED_MODULE_1__.MarkdownEditorComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _markdown_editor_routing_module__WEBPACK_IMPORTED_MODULE_0__.MarkdownEditorRoutingModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__.MatIconModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_5__.MatButtonModule, _angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_6__.ClipboardModule]
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

/***/ 1600:
/*!*********************************************************************!*\
  !*** ./src/environments/component-config/markdown-editor/config.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   componentConfig: () => (/* binding */ componentConfig),
/* harmony export */   descriptionData: () => (/* binding */ descriptionData)
/* harmony export */ });
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/environments/environment */ 553);
/* harmony import */ var src_environments_tools_directory_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/environments/tools-directory-config */ 6636);


const navigationUrl = '/tools/markdown-editor';
const pageTitle = 'Free Online Markdown Editor: Preview Markdown in Real Time';
const pageDescription = 'Write and preview Markdown in real time with our free online Markdown editor. Md Editor Online. Md Markup Editor. No download required, no sign-up required.';
const imageUrl = `${src_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.screenshotsBaseUrl}/markdown-editor.png`;
const keywords = 'online Markdown editor,write Markdown,preview Markdown,real-time preview,export Markdown to HTML,export Markdown to PDF,export Markdown to Microsoft Word,free Markdown editor,no download required,supports Markdown syntax,Markdown syntax highlighting,share Markdown documents,md editors,md markup editor,md editor online';
const relatedTools = [src_environments_tools_directory_config__WEBPACK_IMPORTED_MODULE_1__.ApplicationIds.TEXT_COMPARE, src_environments_tools_directory_config__WEBPACK_IMPORTED_MODULE_1__.ApplicationIds.JWT_DECODER];
const componentConfig = {
  mainHeading: 'Free Online Markdown Editor: Write and Preview Markdown in Real Time',
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
  heading: 'What is Markdown?',
  blockData: ['Markdown is a lightweight markup language that allows you to create formatted text using a plain text editor. Markdown is commonly used to create README files, blog posts, and documentation.']
}, {
  heading: 'Why Use an Online Markdown Editor?',
  listData: ['To write and preview Markdown in real time. Most online Markdown editors allow you to see the preview of your Markdown as you write it. This makes it easy to see how your formatted text will look before you publish it.', 'To collaborate with others on Markdown documents. Some online Markdown editors allow you to collaborate with others on Markdown documents in real time. This can be useful for creating team documentation or blog posts.', 'To export your Markdown documents to different formats. Most online Markdown editors allow you to export your Markdown documents to different formats, such as HTML, PDF, and Microsoft Word. This makes it easy to share your Markdown documents with others who do not use Markdown.']
}, {
  heading: 'Features of Our Online Markdown Editor',
  listData: ['Free to use. No need to pay or sign up for an account.', 'No download required. Write and preview Markdown directly from your web browser.', 'Supports Markdown syntax. Our editor supports all the standard Markdown syntax, as well as some additional features such as GFM and CommonMark.', 'Real-time preview. See the preview of your Markdown as you write it.', 'Export to different formats. Export your Markdown documents to HTML, PDF, and Microsoft Word.']
}, {
  heading: 'How to Use Our Online Markdown Editor',
  listData: ['Go to our website and click the "Start Writing" button.', 'Type your Markdown in the editor.', 'See the preview of your Markdown in the sidebar.', 'When you are finished writing, click the "Export" button to export your document to a different format.']
}, {
  heading: 'Tips for Using an Online Markdown Editor',
  listData: ['Use the preview to see how your formatted text will look. The preview is a great way to see how your Markdown will look before you publish it.', 'Use the syntax highlighting to make your Markdown more readable. The syntax highlighting will highlight the different elements of your Markdown, such as headings, links, and code blocks.', 'Use the export feature to share your Markdown documents with others. The export feature makes it easy to share your Markdown documents with others who do not use Markdown.']
}, {
  blockData: ['Our free online Markdown editor is a great way to write and preview Markdown in real time. It is easy to use and supports all the standard Markdown syntax. With our editor, you can create README files, blog posts, documentation, and more.']
}];

/***/ })

}]);
//# sourceMappingURL=src_app_modules_markdown-editor_markdown-editor_module_ts.de673233f1908eb8.js.map