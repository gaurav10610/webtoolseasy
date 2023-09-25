"use strict";
exports.id = 598;
exports.ids = [598];
exports.modules = {

/***/ 86327:
/*!***************************************************************************!*\
  !*** ./src/app/modules/markdown-editor/markdown-editor-routing.module.ts ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MarkdownEditorRoutingModule: () => (/* binding */ MarkdownEditorRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 68804);
/* harmony import */ var _markdown_editor_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./markdown-editor.component */ 22184);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 59936);




const routes = [{
  path: '',
  component: _markdown_editor_component__WEBPACK_IMPORTED_MODULE_0__.MarkdownEditorComponent
}];
let MarkdownEditorRoutingModule = /*#__PURE__*/(() => {
  var _class;
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
  return MarkdownEditorRoutingModule;
})();
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](MarkdownEditorRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
})();

/***/ }),

/***/ 22184:
/*!**********************************************************************!*\
  !*** ./src/app/modules/markdown-editor/markdown-editor.component.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MarkdownEditorComponent: () => (/* binding */ MarkdownEditorComponent)
/* harmony export */ });
/* harmony import */ var _Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 70734);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 59936);
/* harmony import */ var src_app_service_ffmpeg_lib_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/service/ffmpeg/lib/util */ 7306);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ 34228);
/* harmony import */ var src_environments_component_config_markdown_editor_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/environments/component-config/markdown-editor/config */ 62447);
/* harmony import */ var src_app_service_util_logger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/service/util/logger */ 75126);
/* harmony import */ var src_app_service_platform_metadata_platform_metadata_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/service/platform-metadata/platform-metadata.service */ 26363);
/* harmony import */ var _angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/cdk/clipboard */ 85831);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/platform-browser */ 41081);
/* harmony import */ var src_app_service_file_file_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/service/file/file.service */ 88280);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/icon */ 59049);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/button */ 63490);













const _c0 = ["editor"];
let MarkdownEditorComponent = /*#__PURE__*/(() => {
  var _class;
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
  return MarkdownEditorComponent;
})();

/***/ }),

/***/ 41598:
/*!*******************************************************************!*\
  !*** ./src/app/modules/markdown-editor/markdown-editor.module.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MarkdownEditorModule: () => (/* binding */ MarkdownEditorModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 34228);
/* harmony import */ var _markdown_editor_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./markdown-editor-routing.module */ 86327);
/* harmony import */ var _markdown_editor_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./markdown-editor.component */ 22184);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/button */ 63490);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/icon */ 59049);
/* harmony import */ var _angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/cdk/clipboard */ 85831);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 59936);







let MarkdownEditorModule = /*#__PURE__*/(() => {
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
  return MarkdownEditorModule;
})();
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](MarkdownEditorModule, {
    declarations: [_markdown_editor_component__WEBPACK_IMPORTED_MODULE_1__.MarkdownEditorComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _markdown_editor_routing_module__WEBPACK_IMPORTED_MODULE_0__.MarkdownEditorRoutingModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__.MatIconModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_5__.MatButtonModule, _angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_6__.ClipboardModule]
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

/***/ 62447:
/*!*********************************************************************!*\
  !*** ./src/environments/component-config/markdown-editor/config.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   componentConfig: () => (/* binding */ componentConfig),
/* harmony export */   descriptionData: () => (/* binding */ descriptionData)
/* harmony export */ });
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/environments/environment */ 56316);
/* harmony import */ var src_environments_tools_directory_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/environments/tools-directory-config */ 12313);


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

/***/ 27971:
/*!************************************!*\
  !*** ./src/environments/apps.json ***!
  \************************************/
/***/ ((module) => {

module.exports = JSON.parse('{"xmltojson":{"applicationId":"xmltojson","displayText":"XML to JSON Converter","iconName":"xml-icon","navigateUrl":"/tools/xml-to-json","iconRelativeUrl":"xml.svg"},"qrcodegenerator":{"applicationId":"qrcodegenerator","displayText":"QR Code Generator","iconName":"qr-code","navigateUrl":"/tools/qr-code-generator","iconRelativeUrl":"qr-code.svg"},"wordcounter":{"applicationId":"wordcounter","displayText":"Word Counter","iconName":"word-icon","navigateUrl":"/tools/word-counter","iconRelativeUrl":"word.svg"},"textcompare":{"applicationId":"textcompare","displayText":"Online Text Compare","iconName":"comparison-icon","navigateUrl":"/tools/text-compare","iconRelativeUrl":"comparison.svg"},"markdowneditor":{"applicationId":"markdowneditor","displayText":"Markdown Editor","iconName":"markdown-icon","navigateUrl":"/tools/markdown-editor","iconRelativeUrl":"markdown.svg"},"passwordgenerator":{"applicationId":"passwordgenerator","displayText":"Random Password Generator","iconName":"password-icon","navigateUrl":"/tools/password-generator","iconRelativeUrl":"password.svg"},"videoconverter":{"applicationId":"videoconverter","displayText":"Video to Audio Converter","iconName":"video-convert-icon","navigateUrl":"/tools/video-converter","iconRelativeUrl":"video-convert.svg"},"screenrecorder":{"applicationId":"screenrecorder","displayText":"Free Screen Recorder","iconName":"screen-icon","navigateUrl":"/tools/screen-recorder","iconRelativeUrl":"screen.svg"},"imagecompressor":{"applicationId":"imagecompressor","displayText":"Free Image Compressor","iconName":"image-icon","navigateUrl":"/tools/image-compress","iconRelativeUrl":"image-icon.svg"},"imagecropper":{"applicationId":"imagecropper","displayText":"Free Image Cropper","iconName":"image-icon","navigateUrl":"/tools/crop-image","iconRelativeUrl":"image-icon.svg"},"jwtdecoder":{"applicationId":"jwtdecoder","displayText":"JWT Decoder","iconName":"jwt-icon","navigateUrl":"/tools/jwt","iconRelativeUrl":"jwt-icon.svg"},"jsformatter":{"applicationId":"jsformatter","displayText":"Online Javascript Formatter","iconName":"js-icon","navigateUrl":"/tools/js-formatter","iconRelativeUrl":"js-icon.svg"},"jsonformatter":{"applicationId":"jsonformatter","displayText":"Online JSON Formatter","iconName":"json-icon","navigateUrl":"/tools/json-formatter","iconRelativeUrl":"json-icon.svg"},"jsonviewer":{"applicationId":"jsonviewer","displayText":"Online JSON Viewer","iconName":"json-icon","navigateUrl":"/tools/json-viewer","iconRelativeUrl":"json-icon.svg"},"htmlformatter":{"applicationId":"htmlformatter","displayText":"Online HTML Formatter","iconName":"html-icon","navigateUrl":"/tools/html-formatter","iconRelativeUrl":"html.svg"},"cssformatter":{"applicationId":"cssformatter","displayText":"Online CSS Formatter","iconName":"css-icon","navigateUrl":"/tools/css-formatter","iconRelativeUrl":"css.svg"},"base64encoder":{"applicationId":"base64encoder","displayText":"Base64 Encoder","iconName":"file-encode-icon","navigateUrl":"/tools/base64-encode","iconRelativeUrl":"file-encode.svg"},"base64decoder":{"applicationId":"base64decoder","displayText":"Base64 Decoder","iconName":"file-decode-icon","navigateUrl":"/tools/base64-decode","iconRelativeUrl":"file-decode.svg"},"crongenerator":{"applicationId":"crongenerator","displayText":"Cron Expression Generator","iconName":"cron-icon","navigateUrl":"/tools/cron-expression","iconRelativeUrl":"cron.svg"},"uuidv4generator":{"applicationId":"uuidv4generator","displayText":"UUID V4 Generator","iconName":"uuid-icon","navigateUrl":"/tools/uuid-v4-generator","iconRelativeUrl":"uuid-icon.svg"},"uuidv1generator":{"applicationId":"uuidv1generator","displayText":"UUID V1 Generator","iconName":"uuid-icon","navigateUrl":"/tools/uuid-v1-generator","iconRelativeUrl":"uuid-icon.svg"},"guidgenerator":{"applicationId":"guidgenerator","displayText":"GUID Generator","iconName":"uuid-icon","navigateUrl":"/tools/guid-generator","iconRelativeUrl":"uuid-icon.svg"}}');

/***/ })

};
;
//# sourceMappingURL=598.js.map