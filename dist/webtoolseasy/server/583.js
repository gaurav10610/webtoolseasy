"use strict";
exports.id = 583;
exports.ids = [583];
exports.modules = {

/***/ 16753:
/*!***********************************************************************!*\
  !*** ./src/app/modules/app-directory/app-directory-routing.module.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppDirectoryRoutingModule: () => (/* binding */ AppDirectoryRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 68804);
/* harmony import */ var _app_directory_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app-directory.component */ 70280);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 59936);




const routes = [{
  path: '',
  component: _app_directory_component__WEBPACK_IMPORTED_MODULE_0__.AppDirectoryComponent
}];
let AppDirectoryRoutingModule = /*#__PURE__*/(() => {
  var _class;
  class AppDirectoryRoutingModule {}
  _class = AppDirectoryRoutingModule;
  _class.ɵfac = function AppDirectoryRoutingModule_Factory(t) {
    return new (t || _class)();
  };
  _class.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
    type: _class
  });
  _class.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
  return AppDirectoryRoutingModule;
})();
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](AppDirectoryRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
})();

/***/ }),

/***/ 70280:
/*!******************************************************************!*\
  !*** ./src/app/modules/app-directory/app-directory.component.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppDirectoryComponent: () => (/* binding */ AppDirectoryComponent)
/* harmony export */ });
/* harmony import */ var src_environments_component_config_app_directory_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/environments/component-config/app-directory/config */ 5128);
/* harmony import */ var src_environments_tools_directory_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/environments/tools-directory-config */ 12313);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 59936);
/* harmony import */ var src_app_service_platform_metadata_platform_metadata_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/service/platform-metadata/platform-metadata.service */ 26363);
/* harmony import */ var src_app_service_icon_config_icon_config_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/service/icon-config/icon-config.service */ 44095);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/icon */ 59049);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/platform-browser */ 41081);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ 34228);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ 68804);









function AppDirectoryComponent_div_1_mat_icon_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](0, "mat-icon", 5);
  }
  if (rf & 2) {
    const application_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpropertyInterpolate"]("svgIcon", application_r1.iconName);
  }
}
function AppDirectoryComponent_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](1, AppDirectoryComponent_div_1_mat_icon_1_Template, 1, 1, "mat-icon", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](2, "a", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function AppDirectoryComponent_div_1_Template_a_click_2_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r5);
      const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r4.onAppClick($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const application_r1 = ctx.$implicit;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpropertyInterpolate"]("routerLink", application_r1.navigateUrl);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("replaceUrl", true);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r0.platformMetaDataService.isPlatformBrowser);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpropertyInterpolate"]("routerLink", application_r1.navigateUrl);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("replaceUrl", true);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](application_r1.displayText);
  }
}
let AppDirectoryComponent = /*#__PURE__*/(() => {
  var _class;
  class AppDirectoryComponent {
    constructor(platformMetaDataService, iconConfigService, matIconRegistry, domSanitizer) {
      this.platformMetaDataService = platformMetaDataService;
      this.iconConfigService = iconConfigService;
      this.matIconRegistry = matIconRegistry;
      this.domSanitizer = domSanitizer;
      /**
       * application config for composing UI
       */
      this.appsConfig = Array.from(src_environments_tools_directory_config__WEBPACK_IMPORTED_MODULE_1__.applicationConfig.values());
      this.applicationConfig = src_environments_component_config_app_directory_config__WEBPACK_IMPORTED_MODULE_0__.componentConfig;
      this.descriptionData = [];
    }
    ngOnInit() {
      this.appsConfig.map(appConfig => {
        return {
          iconName: appConfig.iconName,
          iconRelativeUrl: appConfig.iconRelativeUrl
        };
      }).forEach(iconConfig => this.iconConfigService.registerCustomIcon(iconConfig, this.matIconRegistry, this.domSanitizer));
    }
    onAppClick(event) {
      event.stopPropagation();
    }
  }
  _class = AppDirectoryComponent;
  _class.ɵfac = function AppDirectoryComponent_Factory(t) {
    return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](src_app_service_platform_metadata_platform_metadata_service__WEBPACK_IMPORTED_MODULE_2__.PlatformMetadataService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](src_app_service_icon_config_icon_config_service__WEBPACK_IMPORTED_MODULE_3__.IconConfigService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_material_icon__WEBPACK_IMPORTED_MODULE_5__.MatIconRegistry), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__.DomSanitizer));
  };
  _class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({
    type: _class,
    selectors: [["app-app-directory"]],
    decls: 2,
    vars: 1,
    consts: [[1, "apps-container", "flex-center", "flex-display"], ["class", "application shadow-grey flex-display flex-column-flow flex-center flex-align-center app-card pointer-cursor flex-gap-medium", 3, "replaceUrl", "routerLink", 4, "ngFor", "ngForOf"], [1, "application", "shadow-grey", "flex-display", "flex-column-flow", "flex-center", "flex-align-center", "app-card", "pointer-cursor", "flex-gap-medium", 3, "replaceUrl", "routerLink"], ["class", "app-icon", 3, "svgIcon", 4, "ngIf"], [2, "text-align", "center", 3, "replaceUrl", "routerLink", "click"], [1, "app-icon", 3, "svgIcon"]],
    template: function AppDirectoryComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](1, AppDirectoryComponent_div_1_Template, 4, 6, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", ctx.appsConfig);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_7__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_7__.NgIf, _angular_router__WEBPACK_IMPORTED_MODULE_8__.RouterLink, _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__.MatIcon],
    styles: [".apps-container[_ngcontent-%COMP%] {\n  margin: 10px;\n  flex-wrap: wrap;\n}\n\n.application[_ngcontent-%COMP%] {\n  margin: 10px;\n  width: 20%;\n  border: 1px solid lightgrey;\n}\n\n.app-card[_ngcontent-%COMP%] {\n  padding: 15px;\n}\n\n@media screen and (max-width: 735px) {\n  .application[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvbW9kdWxlcy9hcHAtZGlyZWN0b3J5L2FwcC1kaXJlY3RvcnkuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxZQUFBO0VBQ0EsZUFBQTtBQUNGOztBQUVBO0VBQ0UsWUFBQTtFQUNBLFVBQUE7RUFDQSwyQkFBQTtBQUNGOztBQUVBO0VBQ0UsYUFBQTtBQUNGOztBQUVBO0VBQ0U7SUFDRSxXQUFBO0VBQ0Y7QUFDRiIsInNvdXJjZXNDb250ZW50IjpbIi5hcHBzLWNvbnRhaW5lciB7XG4gIG1hcmdpbjogMTBweDtcbiAgZmxleC13cmFwOiB3cmFwO1xufVxuXG4uYXBwbGljYXRpb24ge1xuICBtYXJnaW46IDEwcHg7XG4gIHdpZHRoOiAyMCU7XG4gIGJvcmRlcjogMXB4IHNvbGlkIGxpZ2h0Z3JleTtcbn1cblxuLmFwcC1jYXJkIHtcbiAgcGFkZGluZzogMTVweDtcbn1cblxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogNzM1cHgpIHtcbiAgLmFwcGxpY2F0aW9uIHtcbiAgICB3aWR0aDogMTAwJTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
  });
  return AppDirectoryComponent;
})();

/***/ }),

/***/ 90583:
/*!***************************************************************!*\
  !*** ./src/app/modules/app-directory/app-directory.module.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppDirectoryModule: () => (/* binding */ AppDirectoryModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 34228);
/* harmony import */ var _app_directory_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app-directory-routing.module */ 16753);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/icon */ 59049);
/* harmony import */ var _app_directory_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app-directory.component */ 70280);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 59936);





let AppDirectoryModule = /*#__PURE__*/(() => {
  var _class;
  class AppDirectoryModule {}
  _class = AppDirectoryModule;
  _class.ɵfac = function AppDirectoryModule_Factory(t) {
    return new (t || _class)();
  };
  _class.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
    type: _class
  });
  _class.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _app_directory_routing_module__WEBPACK_IMPORTED_MODULE_0__.AppDirectoryRoutingModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__.MatIconModule]
  });
  return AppDirectoryModule;
})();
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](AppDirectoryModule, {
    declarations: [_app_directory_component__WEBPACK_IMPORTED_MODULE_1__.AppDirectoryComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _app_directory_routing_module__WEBPACK_IMPORTED_MODULE_0__.AppDirectoryRoutingModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__.MatIconModule]
  });
})();

/***/ }),

/***/ 5128:
/*!*******************************************************************!*\
  !*** ./src/environments/component-config/app-directory/config.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   componentConfig: () => (/* binding */ componentConfig)
/* harmony export */ });
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/environments/environment */ 56316);

const navigationUrl = '/tools';
const pageTitle = 'Free Online Web Tools Directory: Discover Useful Tools';
const pageDescription = `Looking for the best free online web tools to help you with your work, studies, or personal projects? Look no further! WebToolsEasy features multiple free web tools that can help you boost your productivity and get things done more efficiently. Browse our categories and find the perfect tool for your needs, whether you're looking for a way to edit photos, create videos, manage your projects, or learn new skills.`;
const imageUrl = `${src_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.screenshotsBaseUrl}/tools-directory.png`;
const componentConfig = {
  navigationUrl,
  mainHeading: 'Free Online Web Tools Directory: Discover Useful Tools to Boost Your Productivity',
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
  tags: [],
  relatedTools: [],
  icons: []
};

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
//# sourceMappingURL=583.js.map