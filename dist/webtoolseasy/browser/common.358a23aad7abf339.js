"use strict";
(self["webpackChunkwebtoolseasy"] = self["webpackChunkwebtoolseasy"] || []).push([["common"],{

/***/ 6857:
/*!**********************************************!*\
  !*** ./src/app/service/file/file.service.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FileService: () => (/* binding */ FileService)
/* harmony export */ });
/* harmony import */ var _Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 1670);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 1699);

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

/***/ })

}]);
//# sourceMappingURL=common.358a23aad7abf339.js.map