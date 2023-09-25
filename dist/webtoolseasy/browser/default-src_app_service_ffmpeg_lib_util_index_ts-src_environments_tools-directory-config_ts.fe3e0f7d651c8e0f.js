"use strict";
(self["webpackChunkwebtoolseasy"] = self["webpackChunkwebtoolseasy"] || []).push([["default-src_app_service_ffmpeg_lib_util_index_ts-src_environments_tools-directory-config_ts"],{

/***/ 7089:
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

/***/ 7414:
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

/***/ 5601:
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
/* harmony import */ var _Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 1670);
/* harmony import */ var _errors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./errors */ 7414);
/* harmony import */ var _const__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./const */ 7089);



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
//# sourceMappingURL=default-src_app_service_ffmpeg_lib_util_index_ts-src_environments_tools-directory-config_ts.fe3e0f7d651c8e0f.js.map