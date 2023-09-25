"use strict";
(self["webpackChunkwebtoolseasy"] = self["webpackChunkwebtoolseasy"] || []).push([["src_app_modules_app-parent_app-parent_module_ts"],{

/***/ 9171:
/*!*****************************************************************!*\
  !*** ./src/app/modules/app-parent/app-parent-routing.module.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppParentRoutingModule: () => (/* binding */ AppParentRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 7947);
/* harmony import */ var _app_parent_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app-parent.component */ 4677);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 1699);
var _class;




const routes = [{
  path: '',
  component: _app_parent_component__WEBPACK_IMPORTED_MODULE_0__.AppParentComponent,
  children: [{
    path: '',
    loadChildren: () => __webpack_require__.e(/*! import() */ "src_app_modules_app-directory_app-directory_module_ts").then(__webpack_require__.bind(__webpack_require__, /*! ../app-directory/app-directory.module */ 9295)).then(m => m.AppDirectoryModule),
    pathMatch: 'full'
  }, {
    path: 'uuid',
    redirectTo: 'uuid-v4-generator'
  }, {
    path: 'jwt',
    loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-src_environments_tools-directory-config_ts-node_modules_ngx-json-viewer_fesm2020_ngx--4de949"), __webpack_require__.e("src_app_modules_jwt_jwt_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ../jwt/jwt.module */ 6917)).then(m => m.JwtModule)
  }, {
    path: 'json-formatter',
    loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-node_modules_angular_forms_fesm2022_forms_mjs"), __webpack_require__.e("default-src_environments_tools-directory-config_ts-node_modules_ngx-monaco-editor-v2_fesm2022-cd699e"), __webpack_require__.e("src_app_modules_json-formatter_json-formatter_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ../json-formatter/json-formatter.module */ 5797)).then(m => m.JsonFormatterModule)
  }, {
    path: 'image-compress',
    loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-node_modules_angular_forms_fesm2022_forms_mjs"), __webpack_require__.e("default-src_app_service_util_logger_ts-node_modules_angular_cdk_fesm2022_overlay_mjs"), __webpack_require__.e("default-src_app_service_ffmpeg_lib_util_index_ts-src_environments_tools-directory-config_ts"), __webpack_require__.e("default-src_app_types_file_ts-node_modules_angular_material_fesm2022_slider_mjs-node_modules_-ba0daf"), __webpack_require__.e("common"), __webpack_require__.e("src_app_modules_image-compression_image-compression_module_ts-node_modules_rxjs_dist_esm_inte-61bd5d")]).then(__webpack_require__.bind(__webpack_require__, /*! ../image-compression/image-compression.module */ 9857)).then(m => m.ImageCompressionModule)
  }, {
    path: 'js-formatter',
    loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-node_modules_angular_forms_fesm2022_forms_mjs"), __webpack_require__.e("default-src_environments_tools-directory-config_ts-node_modules_ngx-monaco-editor-v2_fesm2022-cd699e"), __webpack_require__.e("default-node_modules_js-beautify_js_index_js"), __webpack_require__.e("src_app_modules_js-formatter_js-formatter_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ../js-formatter/js-formatter.module */ 4183)).then(m => m.JsFormatterModule)
  }, {
    path: 'css-formatter',
    loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-node_modules_angular_forms_fesm2022_forms_mjs"), __webpack_require__.e("default-src_environments_tools-directory-config_ts-node_modules_ngx-monaco-editor-v2_fesm2022-cd699e"), __webpack_require__.e("default-node_modules_js-beautify_js_index_js"), __webpack_require__.e("src_app_modules_css-formatter_css-formatter_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ../css-formatter/css-formatter.module */ 5168)).then(m => m.CssFormatterModule)
  }, {
    path: 'html-formatter',
    loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-node_modules_angular_forms_fesm2022_forms_mjs"), __webpack_require__.e("default-src_environments_tools-directory-config_ts-node_modules_ngx-monaco-editor-v2_fesm2022-cd699e"), __webpack_require__.e("default-node_modules_js-beautify_js_index_js"), __webpack_require__.e("src_app_modules_html-formatter_html-formatter_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ../html-formatter/html-formatter.module */ 9527)).then(m => m.HtmlFormatterModule)
  }, {
    path: 'screen-recorder',
    loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-node_modules_angular_forms_fesm2022_forms_mjs"), __webpack_require__.e("default-node_modules_angular_material_fesm2022_checkbox_mjs"), __webpack_require__.e("default-src_app_service_util_contants_ts-node_modules_angular_material_fesm2022_progress-spin-dd9fcc"), __webpack_require__.e("src_app_modules_screen-recorder_screen-recorder_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ../screen-recorder/screen-recorder.module */ 1081)).then(m => m.ScreenRecorderModule)
  }, {
    path: 'text-compare',
    loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-node_modules_angular_forms_fesm2022_forms_mjs"), __webpack_require__.e("default-src_environments_tools-directory-config_ts-node_modules_ngx-monaco-editor-v2_fesm2022-cd699e"), __webpack_require__.e("common"), __webpack_require__.e("src_app_modules_text-compare_text-compare_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ../text-compare/text-compare.module */ 7761)).then(m => m.TextCompareModule)
  }, {
    path: 'video-converter',
    loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-node_modules_angular_forms_fesm2022_forms_mjs"), __webpack_require__.e("default-node_modules_rxjs_dist_esm_internal_observable_fromEvent_js-node_modules_rxjs_dist_es-b9636e"), __webpack_require__.e("default-src_app_service_util_logger_ts-node_modules_angular_cdk_fesm2022_overlay_mjs"), __webpack_require__.e("default-src_app_service_ffmpeg_lib_util_index_ts-src_environments_tools-directory-config_ts"), __webpack_require__.e("default-node_modules_angular_material_fesm2022_select_mjs"), __webpack_require__.e("default-src_app_types_file_ts-node_modules_angular_material_fesm2022_slider_mjs-node_modules_-ba0daf"), __webpack_require__.e("default-node_modules_angular_material_fesm2022_card_mjs"), __webpack_require__.e("default-src_app_service_util_contants_ts-node_modules_angular_material_fesm2022_progress-spin-dd9fcc"), __webpack_require__.e("src_app_modules_video-converter_video-converter_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ../video-converter/video-converter.module */ 4533)).then(m => m.VideoConverterModule)
  }, {
    path: 'json-viewer',
    loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-src_environments_tools-directory-config_ts-node_modules_ngx-json-viewer_fesm2020_ngx--4de949"), __webpack_require__.e("src_app_modules_json-viewer_json-viewer_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ../json-viewer/json-viewer.module */ 7828)).then(m => m.JsonViewerModule)
  }, {
    path: 'password-generator',
    loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-node_modules_angular_forms_fesm2022_forms_mjs"), __webpack_require__.e("default-node_modules_rxjs_dist_esm_internal_observable_fromEvent_js-node_modules_rxjs_dist_es-b9636e"), __webpack_require__.e("default-node_modules_angular_material_fesm2022_input_mjs"), __webpack_require__.e("default-node_modules_angular_material_fesm2022_checkbox_mjs"), __webpack_require__.e("common"), __webpack_require__.e("src_app_modules_password-generator_password-generator_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ../password-generator/password-generator.module */ 3186)).then(m => m.PasswordGeneratorModule)
  }, {
    path: 'base64-encode',
    loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-node_modules_angular_material_fesm2022_card_mjs"), __webpack_require__.e("src_app_modules_base64-encode_base64-encode_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ../base64-encode/base64-encode.module */ 3620)).then(m => m.Base64EncodeModule)
  }, {
    path: 'base64-decode',
    loadChildren: () => __webpack_require__.e(/*! import() */ "src_app_modules_base64-decode_base64-decode_module_ts").then(__webpack_require__.bind(__webpack_require__, /*! ../base64-decode/base64-decode.module */ 935)).then(m => m.Base64DecodeModule)
  }, {
    path: 'cron-expression',
    loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-node_modules_angular_forms_fesm2022_forms_mjs"), __webpack_require__.e("default-node_modules_rxjs_dist_esm_internal_observable_fromEvent_js-node_modules_rxjs_dist_es-b9636e"), __webpack_require__.e("default-node_modules_angular_material_fesm2022_input_mjs"), __webpack_require__.e("default-src_app_service_util_logger_ts-node_modules_angular_cdk_fesm2022_overlay_mjs"), __webpack_require__.e("default-node_modules_angular_material_fesm2022_checkbox_mjs"), __webpack_require__.e("default-node_modules_angular_material_fesm2022_select_mjs"), __webpack_require__.e("src_app_modules_cron-generator_cron-generator_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ../cron-generator/cron-generator.module */ 9374)).then(m => m.CronGeneratorModule)
  }, {
    path: 'crop-image',
    loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-node_modules_angular_forms_fesm2022_forms_mjs"), __webpack_require__.e("default-node_modules_rxjs_dist_esm_internal_observable_fromEvent_js-node_modules_rxjs_dist_es-b9636e"), __webpack_require__.e("default-src_app_service_util_logger_ts-node_modules_angular_cdk_fesm2022_overlay_mjs"), __webpack_require__.e("default-src_app_service_ffmpeg_lib_util_index_ts-src_environments_tools-directory-config_ts"), __webpack_require__.e("default-node_modules_angular_material_fesm2022_select_mjs"), __webpack_require__.e("common"), __webpack_require__.e("src_app_modules_image-cropper_image-cropper_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ../image-cropper/image-cropper.module */ 6543)).then(m => m.ImageCropperModule)
  }, {
    path: 'uuid-v1-generator',
    loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-node_modules_angular_forms_fesm2022_forms_mjs"), __webpack_require__.e("default-node_modules_rxjs_dist_esm_internal_observable_fromEvent_js-node_modules_rxjs_dist_es-b9636e"), __webpack_require__.e("default-node_modules_angular_material_fesm2022_input_mjs"), __webpack_require__.e("common"), __webpack_require__.e("src_app_modules_uuid-version1-generator_uuid-version1-generator_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ../uuid-version1-generator/uuid-version1-generator.module */ 4749)).then(m => m.UuidVersion1GeneratorModule)
  }, {
    path: 'uuid-v4-generator',
    loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-node_modules_angular_forms_fesm2022_forms_mjs"), __webpack_require__.e("default-node_modules_rxjs_dist_esm_internal_observable_fromEvent_js-node_modules_rxjs_dist_es-b9636e"), __webpack_require__.e("default-node_modules_angular_material_fesm2022_input_mjs"), __webpack_require__.e("common"), __webpack_require__.e("src_app_modules_uuid-version4-generator_uuid-version4-generator_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ../uuid-version4-generator/uuid-version4-generator.module */ 7319)).then(m => m.UuidVersion4GeneratorModule)
  }, {
    path: 'guid-generator',
    loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-node_modules_angular_forms_fesm2022_forms_mjs"), __webpack_require__.e("default-node_modules_rxjs_dist_esm_internal_observable_fromEvent_js-node_modules_rxjs_dist_es-b9636e"), __webpack_require__.e("default-node_modules_angular_material_fesm2022_input_mjs"), __webpack_require__.e("common"), __webpack_require__.e("src_app_modules_guid-generator_guid-generator_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ../guid-generator/guid-generator.module */ 1013)).then(m => m.GuidGeneratorModule)
  }, {
    path: 'markdown-editor',
    loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-src_app_service_ffmpeg_lib_util_index_ts-src_environments_tools-directory-config_ts"), __webpack_require__.e("common"), __webpack_require__.e("src_app_modules_markdown-editor_markdown-editor_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ../markdown-editor/markdown-editor.module */ 4040)).then(m => m.MarkdownEditorModule)
  }, {
    path: 'word-counter',
    loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-node_modules_angular_forms_fesm2022_forms_mjs"), __webpack_require__.e("default-node_modules_rxjs_dist_esm_internal_observable_fromEvent_js-node_modules_rxjs_dist_es-b9636e"), __webpack_require__.e("default-node_modules_angular_material_fesm2022_input_mjs"), __webpack_require__.e("src_app_modules_word-count_word-count_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ../word-count/word-count.module */ 3879)).then(m => m.WordCountModule)
  }, {
    path: 'qr-code-generator',
    loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-node_modules_angular_forms_fesm2022_forms_mjs"), __webpack_require__.e("default-node_modules_rxjs_dist_esm_internal_observable_fromEvent_js-node_modules_rxjs_dist_es-b9636e"), __webpack_require__.e("default-node_modules_angular_material_fesm2022_input_mjs"), __webpack_require__.e("common"), __webpack_require__.e("src_app_modules_qr-code-generator_qr-code-generator_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ../qr-code-generator/qr-code-generator.module */ 9039)).then(m => m.QrCodeGeneratorModule)
  }, {
    path: 'xml-to-json',
    loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-node_modules_angular_forms_fesm2022_forms_mjs"), __webpack_require__.e("default-src_environments_tools-directory-config_ts-node_modules_ngx-monaco-editor-v2_fesm2022-cd699e"), __webpack_require__.e("default-node_modules_angular_material_fesm2022_checkbox_mjs"), __webpack_require__.e("src_app_modules_xml-to-json_xml-to-json_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ../xml-to-json/xml-to-json.module */ 7654)).then(m => m.XmlToJsonModule)
  }]
}];
class AppParentRoutingModule {}
_class = AppParentRoutingModule;
_class.ɵfac = function AppParentRoutingModule_Factory(t) {
  return new (t || _class)();
};
_class.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
  type: _class
});
_class.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](AppParentRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
})();

/***/ }),

/***/ 4677:
/*!************************************************************!*\
  !*** ./src/app/modules/app-parent/app-parent.component.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppParentComponent: () => (/* binding */ AppParentComponent)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var src_environments_component_config_app_parent_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/environments/component-config/app-parent/config */ 4234);
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/environments/environment */ 553);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var src_app_service_icon_config_icon_config_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/service/icon-config/icon-config.service */ 3681);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/icon */ 6515);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/platform-browser */ 6480);
/* harmony import */ var src_app_service_app_context_app_context_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/service/app-context/app-context.service */ 5282);
/* harmony import */ var src_app_service_meta_config_meta_config_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/service/meta-config/meta-config.service */ 3767);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/router */ 7947);
/* harmony import */ var _header_toolbar_header_toolbar_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../header-toolbar/header-toolbar.component */ 797);
/* harmony import */ var _tool_heading_tool_heading_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../tool-heading/tool-heading.component */ 2577);
/* harmony import */ var _tags_tags_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../tags/tags.component */ 2740);
/* harmony import */ var _footer_footer_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../footer/footer.component */ 323);
/* harmony import */ var _description_description_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../description/description.component */ 659);
/* harmony import */ var _related_tools_related_tools_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../related-tools/related-tools.component */ 6463);
/* harmony import */ var _share_buttons_share_buttons_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../share-buttons/share-buttons.component */ 3927);
/* harmony import */ var _follow_buttons_follow_buttons_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../follow-buttons/follow-buttons.component */ 9609);
var _class;



















function AppParentComponent_app_related_tools_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](0, "app-related-tools", 3);
  }
}
function AppParentComponent_app_description_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](0, "app-description", 3);
  }
}
function AppParentComponent_app_tags_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](0, "app-tags");
  }
}
class AppParentComponent {
  constructor(iconConfigService, matIconRegistry, domSanitizer, appContextService, metaConfigService, titleService, metaService, document) {
    this.iconConfigService = iconConfigService;
    this.matIconRegistry = matIconRegistry;
    this.domSanitizer = domSanitizer;
    this.appContextService = appContextService;
    this.metaConfigService = metaConfigService;
    this.titleService = titleService;
    this.metaService = metaService;
    this.document = document;
  }
  ngOnInit() {
    src_environments_component_config_app_parent_config__WEBPACK_IMPORTED_MODULE_0__.ICON_CONFIG.forEach(iconConfig => this.iconConfigService.registerCustomIcon(iconConfig, this.matIconRegistry, this.domSanitizer));
  }
  /**
   * handle application load event
   * @param event loaded component reference
   */
  onApplicationLoad(event) {
    if (event.applicationConfig) {
      const applicationConfig = event.applicationConfig;
      //console.log(applicationConfig);
      this.appContextService.applicationConfig = applicationConfig;
      this.appContextService.appUrl = `${src_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.hostname}${applicationConfig.navigationUrl}`;
      /**
       * load related tools icons
       */
      applicationConfig.relatedTools.map(tool => {
        return {
          iconName: tool.iconName,
          iconRelativeUrl: tool.iconRelativeUrl
        };
      }).forEach(iconConfig => this.iconConfigService.registerCustomIcon(iconConfig, this.matIconRegistry, this.domSanitizer));
      /**
       * loading custom icons
       */
      applicationConfig.icons.forEach(iconConfig => this.iconConfigService.registerCustomIcon(iconConfig, this.matIconRegistry, this.domSanitizer));
      /**
       * adding page meta info
       */
      this.metaConfigService.updatePageMetaData(applicationConfig, this.titleService, this.metaService, this.document);
    }
    if (event.descriptionData) {
      this.appContextService.descriptionData = event.descriptionData;
    }
  }
}
_class = AppParentComponent;
_class.ɵfac = function AppParentComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdirectiveInject"](src_app_service_icon_config_icon_config_service__WEBPACK_IMPORTED_MODULE_2__.IconConfigService), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdirectiveInject"](_angular_material_icon__WEBPACK_IMPORTED_MODULE_14__.MatIconRegistry), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_15__.DomSanitizer), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdirectiveInject"](src_app_service_app_context_app_context_service__WEBPACK_IMPORTED_MODULE_3__.AppContextService), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdirectiveInject"](src_app_service_meta_config_meta_config_service__WEBPACK_IMPORTED_MODULE_4__.MetaConfigService), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_15__.Title), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_15__.Meta), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_16__.DOCUMENT));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["app-app-parent"]],
  decls: 13,
  vars: 3,
  consts: [[1, "full-height", "flex-display", "flex-column-flow", "no-y-scroll"], [1, "full-width", "flex-display", "flex-column-flow", "flex-full-height", "auto-scroll"], [1, "flex-display", "flex-column-flow", "flex-align-center", "base-app-container", "flex-gap-large", "flex-full-height"], [1, "full-width"], [3, "activate"], ["class", "full-width", 4, "ngIf"], [4, "ngIf"]],
  template: function AppParentComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "div", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](1, "app-header-toolbar");
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](2, "div", 1)(3, "div", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](4, "app-tool-heading")(5, "app-share-buttons", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](6, "div", 3)(7, "router-outlet", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("activate", function AppParentComponent_Template_router_outlet_activate_7_listener($event) {
        return ctx.onApplicationLoad($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](8, AppParentComponent_app_related_tools_8_Template, 1, 0, "app-related-tools", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](9, AppParentComponent_app_description_9_Template, 1, 0, "app-description", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](10, AppParentComponent_app_tags_10_Template, 1, 0, "app-tags", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](11, "app-follow-buttons");
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](12, "app-footer");
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](8);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", (ctx.appContextService.applicationConfig == null ? null : ctx.appContextService.applicationConfig.relatedTools) && (ctx.appContextService.applicationConfig == null ? null : ctx.appContextService.applicationConfig.relatedTools.length) > 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", ctx.appContextService.descriptionData);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", (ctx.appContextService.applicationConfig == null ? null : ctx.appContextService.applicationConfig.tags) && (ctx.appContextService.applicationConfig == null ? null : ctx.appContextService.applicationConfig.tags.length) > 0);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_16__.NgIf, _angular_router__WEBPACK_IMPORTED_MODULE_17__.RouterOutlet, _header_toolbar_header_toolbar_component__WEBPACK_IMPORTED_MODULE_5__.HeaderToolbarComponent, _tool_heading_tool_heading_component__WEBPACK_IMPORTED_MODULE_6__.ToolHeadingComponent, _tags_tags_component__WEBPACK_IMPORTED_MODULE_7__.TagsComponent, _footer_footer_component__WEBPACK_IMPORTED_MODULE_8__.FooterComponent, _description_description_component__WEBPACK_IMPORTED_MODULE_9__.DescriptionComponent, _related_tools_related_tools_component__WEBPACK_IMPORTED_MODULE_10__.RelatedToolsComponent, _share_buttons_share_buttons_component__WEBPACK_IMPORTED_MODULE_11__.ShareButtonsComponent, _follow_buttons_follow_buttons_component__WEBPACK_IMPORTED_MODULE_12__.FollowButtonsComponent],
  styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ }),

/***/ 5505:
/*!*********************************************************!*\
  !*** ./src/app/modules/app-parent/app-parent.module.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppParentModule: () => (/* binding */ AppParentModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _app_parent_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app-parent-routing.module */ 9171);
/* harmony import */ var _description_description_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../description/description.module */ 4485);
/* harmony import */ var _footer_footer_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../footer/footer-module */ 6122);
/* harmony import */ var _header_toolbar_header_toolbar_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../header-toolbar/header-toolbar.module */ 8369);
/* harmony import */ var _related_tools_related_tools_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../related-tools/related-tools.module */ 300);
/* harmony import */ var _tags_tags_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../tags/tags.module */ 3665);
/* harmony import */ var _tool_heading_tool_heading_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../tool-heading/tool-heading.module */ 6861);
/* harmony import */ var _app_parent_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./app-parent.component */ 4677);
/* harmony import */ var _follow_buttons_follow_buttons_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../follow-buttons/follow-buttons.module */ 3341);
/* harmony import */ var _share_buttons_share_buttons_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../share-buttons/share-buttons.module */ 8292);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/core */ 1699);
var _class;












class AppParentModule {}
_class = AppParentModule;
_class.ɵfac = function AppParentModule_Factory(t) {
  return new (t || _class)();
};
_class.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdefineNgModule"]({
  type: _class
});
_class.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_11__.CommonModule, _app_parent_routing_module__WEBPACK_IMPORTED_MODULE_0__.AppParentRoutingModule, _header_toolbar_header_toolbar_module__WEBPACK_IMPORTED_MODULE_3__.HeaderToolbarModule, _tool_heading_tool_heading_module__WEBPACK_IMPORTED_MODULE_6__.ToolHeadingModule, _tags_tags_module__WEBPACK_IMPORTED_MODULE_5__.TagsModule, _footer_footer_module__WEBPACK_IMPORTED_MODULE_2__.FooterModule, _description_description_module__WEBPACK_IMPORTED_MODULE_1__.DescriptionModule, _related_tools_related_tools_module__WEBPACK_IMPORTED_MODULE_4__.RelatedToolsModule, _share_buttons_share_buttons_module__WEBPACK_IMPORTED_MODULE_9__.ShareButtonsModule, _follow_buttons_follow_buttons_module__WEBPACK_IMPORTED_MODULE_8__.FollowButtonsModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵsetNgModuleScope"](AppParentModule, {
    declarations: [_app_parent_component__WEBPACK_IMPORTED_MODULE_7__.AppParentComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_11__.CommonModule, _app_parent_routing_module__WEBPACK_IMPORTED_MODULE_0__.AppParentRoutingModule, _header_toolbar_header_toolbar_module__WEBPACK_IMPORTED_MODULE_3__.HeaderToolbarModule, _tool_heading_tool_heading_module__WEBPACK_IMPORTED_MODULE_6__.ToolHeadingModule, _tags_tags_module__WEBPACK_IMPORTED_MODULE_5__.TagsModule, _footer_footer_module__WEBPACK_IMPORTED_MODULE_2__.FooterModule, _description_description_module__WEBPACK_IMPORTED_MODULE_1__.DescriptionModule, _related_tools_related_tools_module__WEBPACK_IMPORTED_MODULE_4__.RelatedToolsModule, _share_buttons_share_buttons_module__WEBPACK_IMPORTED_MODULE_9__.ShareButtonsModule, _follow_buttons_follow_buttons_module__WEBPACK_IMPORTED_MODULE_8__.FollowButtonsModule]
  });
})();

/***/ }),

/***/ 659:
/*!**************************************************************!*\
  !*** ./src/app/modules/description/description.component.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DescriptionComponent: () => (/* binding */ DescriptionComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var src_app_service_app_context_app_context_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/service/app-context/app-context.service */ 5282);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/icon */ 6515);
var _class;




function DescriptionComponent_div_1_h2_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "h2", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const descriptionRecord_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", descriptionRecord_r1.heading, " ");
  }
}
function DescriptionComponent_div_1_div_2_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 8)(1, "div")(2, "mat-icon", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "chevron_right");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "span", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const line_r8 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", line_r8, "");
  }
}
function DescriptionComponent_div_1_div_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, DescriptionComponent_div_1_div_2_div_1_Template, 6, 1, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const descriptionRecord_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", descriptionRecord_r1.listData);
  }
}
function DescriptionComponent_div_1_div_3_span_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "span", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const block_r11 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", block_r11, " ");
  }
}
function DescriptionComponent_div_1_div_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, DescriptionComponent_div_1_div_3_span_1_Template, 2, 1, "span", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const descriptionRecord_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", descriptionRecord_r1.blockData);
  }
}
function DescriptionComponent_div_1_div_4_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 14)(1, "div")(2, "mat-icon", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "chevron_right");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "a", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const link_r14 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpropertyInterpolate"]("href", link_r14.url, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", link_r14.displayText, " ");
  }
}
function DescriptionComponent_div_1_div_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, DescriptionComponent_div_1_div_4_div_1_Template, 6, 2, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const descriptionRecord_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", descriptionRecord_r1.links);
  }
}
function DescriptionComponent_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, DescriptionComponent_div_1_h2_1_Template, 2, 1, "h2", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](2, DescriptionComponent_div_1_div_2_Template, 2, 1, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](3, DescriptionComponent_div_1_div_3_Template, 2, 1, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](4, DescriptionComponent_div_1_div_4_Template, 2, 1, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const descriptionRecord_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", descriptionRecord_r1.heading);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", descriptionRecord_r1.listData);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", descriptionRecord_r1.blockData);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", descriptionRecord_r1.links);
  }
}
class DescriptionComponent {
  constructor(appContextService) {
    this.appContextService = appContextService;
  }
}
_class = DescriptionComponent;
_class.ɵfac = function DescriptionComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](src_app_service_app_context_app_context_service__WEBPACK_IMPORTED_MODULE_0__.AppContextService));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["app-description"]],
  decls: 2,
  vars: 1,
  consts: [[1, "flex-display", "flex-column-flow", "flex-gap-xlarge"], ["class", "flex-display flex-column-flow", 4, "ngFor", "ngForOf"], [1, "flex-display", "flex-column-flow"], ["style", "font-size: medium; font-weight: 700", 4, "ngIf"], ["class", "flex-display flex-column-flow", 4, "ngIf"], ["class", "flex-display flex-column-flow flex-gap-large", "style", "overflow-wrap: anywhere", 4, "ngIf"], [2, "font-size", "medium", "font-weight", "700"], ["class", "flex-display flex-row-flow flex-gap-small", "style", "overflow-wrap: anywhere", 4, "ngFor", "ngForOf"], [1, "flex-display", "flex-row-flow", "flex-gap-small", 2, "overflow-wrap", "anywhere"], ["aria-hidden", "false", "aria-label", "right pointer icon"], [1, "description-font"], [1, "flex-display", "flex-column-flow", "flex-gap-large", 2, "overflow-wrap", "anywhere"], ["class", "description-font", 4, "ngFor", "ngForOf"], ["class", "flex-display flex-row-flow flex-gap-small", 4, "ngFor", "ngForOf"], [1, "flex-display", "flex-row-flow", "flex-gap-small"], [3, "href"]],
  template: function DescriptionComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, DescriptionComponent_div_1_Template, 5, 4, "div", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx.appContextService.descriptionData);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_2__.NgIf, _angular_material_icon__WEBPACK_IMPORTED_MODULE_3__.MatIcon],
  styles: [".description-font[_ngcontent-%COMP%] {\n  font-size: 16px;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvbW9kdWxlcy9kZXNjcmlwdGlvbi9kZXNjcmlwdGlvbi5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGVBQUE7QUFDRiIsInNvdXJjZXNDb250ZW50IjpbIi5kZXNjcmlwdGlvbi1mb250IHtcbiAgZm9udC1zaXplOiAxNnB4O1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ }),

/***/ 4485:
/*!***********************************************************!*\
  !*** ./src/app/modules/description/description.module.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DescriptionModule: () => (/* binding */ DescriptionModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _description_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./description.component */ 659);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/icon */ 6515);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 1699);
var _class;




class DescriptionModule {}
_class = DescriptionModule;
_class.ɵfac = function DescriptionModule_Factory(t) {
  return new (t || _class)();
};
_class.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
  type: _class
});
_class.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_3__.MatIconModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](DescriptionModule, {
    declarations: [_description_component__WEBPACK_IMPORTED_MODULE_0__.DescriptionComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_3__.MatIconModule],
    exports: [_description_component__WEBPACK_IMPORTED_MODULE_0__.DescriptionComponent]
  });
})();

/***/ }),

/***/ 6122:
/*!*************************************************!*\
  !*** ./src/app/modules/footer/footer-module.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FooterModule: () => (/* binding */ FooterModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _footer_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./footer.component */ 323);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/icon */ 6515);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 1699);
var _class;




class FooterModule {}
_class = FooterModule;
_class.ɵfac = function FooterModule_Factory(t) {
  return new (t || _class)();
};
_class.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
  type: _class
});
_class.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_3__.MatIconModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](FooterModule, {
    declarations: [_footer_component__WEBPACK_IMPORTED_MODULE_0__.FooterComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_3__.MatIconModule],
    exports: [_footer_component__WEBPACK_IMPORTED_MODULE_0__.FooterComponent]
  });
})();

/***/ }),

/***/ 323:
/*!****************************************************!*\
  !*** ./src/app/modules/footer/footer.component.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FooterComponent: () => (/* binding */ FooterComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var src_app_service_platform_metadata_platform_metadata_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/service/platform-metadata/platform-metadata.service */ 3242);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/icon */ 6515);
var _class;




function FooterComponent_mat_icon_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "mat-icon", 8);
  }
}
class FooterComponent {
  constructor(platformMetaDataService) {
    this.platformMetaDataService = platformMetaDataService;
  }
  openLink(url) {
    window.open(url, '_blank')?.focus();
  }
}
_class = FooterComponent;
_class.ɵfac = function FooterComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](src_app_service_platform_metadata_platform_metadata_service__WEBPACK_IMPORTED_MODULE_0__.PlatformMetadataService));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["app-footer"]],
  decls: 11,
  vars: 1,
  consts: [[1, "footer-container", "full-width", "flex-display", "flex-row-flow", "flex-align-center"], [1, "flex-display", "flex-row-flow", "icon-div", "flex-align-center", "flex-gap-small"], ["svgIcon", "app-icon", "class", "app-icon", "style", "margin-left: 16px", 4, "ngIf"], [1, "white-color"], [1, "flex-display", "flex-row-flow", "copyright", "flex-align-center"], ["rel", "license", "href", "https://creativecommons.org/licenses/by-nd/4.0/", "target", "_blank", 1, "flex-display"], [1, "white-color", 2, "margin-right", "8px"], [1, "pointer-cursor", "white-color", 3, "click"], ["svgIcon", "app-icon", 1, "app-icon", 2, "margin-left", "16px"]],
  template: function FooterComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0)(1, "div", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](2, FooterComponent_mat_icon_2_Template, 1, 0, "mat-icon", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "span", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4, "Free web tools to make work super easy");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "div", 4)(6, "a", 5)(7, "mat-icon", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](8, "copyright");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "div", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function FooterComponent_Template_div_click_9_listener() {
        return ctx.openLink("https://creativecommons.org/licenses/by-nd/4.0/");
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](10, " Creative Commons Attribution 4.0 International License ");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.platformMetaDataService.isPlatformBrowser);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.NgIf, _angular_material_icon__WEBPACK_IMPORTED_MODULE_3__.MatIcon],
  styles: [".footer-container[_ngcontent-%COMP%] {\n  background: #3f51b5;\n  height: 64px;\n}\n\n.white-color[_ngcontent-%COMP%] {\n  color: white;\n}\n\n@media screen and (min-width: 735px) {\n  .copyright[_ngcontent-%COMP%] {\n    margin-right: 16px;\n  }\n  .icon-div[_ngcontent-%COMP%] {\n    flex-grow: 1;\n    justify-content: flex-start;\n  }\n}\n@media screen and (max-width: 735px) {\n  .footer-container[_ngcontent-%COMP%] {\n    height: 100px;\n    flex-direction: column;\n    justify-content: space-around;\n  }\n  .icon-div[_ngcontent-%COMP%] {\n    margin-bottom: 10px;\n  }\n  .copyright[_ngcontent-%COMP%] {\n    justify-content: flex-start;\n  }\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvbW9kdWxlcy9mb290ZXIvZm9vdGVyLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsbUJBQUE7RUFDQSxZQUFBO0FBQ0Y7O0FBRUE7RUFDRSxZQUFBO0FBQ0Y7O0FBRUE7RUFDRTtJQUNFLGtCQUFBO0VBQ0Y7RUFDQTtJQUNFLFlBQUE7SUFDQSwyQkFBQTtFQUNGO0FBQ0Y7QUFFQTtFQUNFO0lBQ0UsYUFBQTtJQUNBLHNCQUFBO0lBQ0EsNkJBQUE7RUFBRjtFQUVBO0lBQ0UsbUJBQUE7RUFBRjtFQUVBO0lBQ0UsMkJBQUE7RUFBRjtBQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLmZvb3Rlci1jb250YWluZXIge1xuICBiYWNrZ3JvdW5kOiAjM2Y1MWI1O1xuICBoZWlnaHQ6IDY0cHg7XG59XG5cbi53aGl0ZS1jb2xvciB7XG4gIGNvbG9yOiB3aGl0ZTtcbn1cblxuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNzM1cHgpIHtcbiAgLmNvcHlyaWdodCB7XG4gICAgbWFyZ2luLXJpZ2h0OiAxNnB4O1xuICB9XG4gIC5pY29uLWRpdiB7XG4gICAgZmxleC1ncm93OiAxO1xuICAgIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcbiAgfVxufVxuXG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA3MzVweCkge1xuICAuZm9vdGVyLWNvbnRhaW5lciB7XG4gICAgaGVpZ2h0OiAxMDBweDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xuICB9XG4gIC5pY29uLWRpdiB7XG4gICAgbWFyZ2luLWJvdHRvbTogMTBweDtcbiAgfVxuICAuY29weXJpZ2h0IHtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
});

/***/ }),

/***/ 797:
/*!********************************************************************!*\
  !*** ./src/app/modules/header-toolbar/header-toolbar.component.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HeaderToolbarComponent: () => (/* binding */ HeaderToolbarComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var src_app_service_platform_metadata_platform_metadata_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/service/platform-metadata/platform-metadata.service */ 3242);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/toolbar */ 2484);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/icon */ 6515);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/button */ 895);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 7947);
var _class;







function HeaderToolbarComponent_mat_icon_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "mat-icon", 7);
  }
}
function HeaderToolbarComponent_mat_icon_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "mat-icon", 8);
  }
}
class HeaderToolbarComponent {
  constructor(platformMetaDataService) {
    this.platformMetaDataService = platformMetaDataService;
  }
}
_class = HeaderToolbarComponent;
_class.ɵfac = function HeaderToolbarComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](src_app_service_platform_metadata_platform_metadata_service__WEBPACK_IMPORTED_MODULE_0__.PlatformMetadataService));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["app-header-toolbar"]],
  decls: 8,
  vars: 5,
  consts: [["color", "primary"], ["mat-icon-button", "", "aria-label", "app icon button", "routerLink", "", 3, "replaceUrl"], ["svgIcon", "app-icon", "class", "app-icon", 4, "ngIf"], [1, "flex-display", "flex-row-flow", "flex-align-center", "flex-full-height", "app-name"], ["routerLink", "", 1, "header-font", "pointer-cursor", 3, "replaceUrl"], ["mat-icon-button", "", "aria-label", "home icon button", "routerLink", "/tools", 3, "replaceUrl"], ["svgIcon", "home-icon", "class", "app-icon", 4, "ngIf"], ["svgIcon", "app-icon", 1, "app-icon"], ["svgIcon", "home-icon", 1, "app-icon"]],
  template: function HeaderToolbarComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-toolbar", 0)(1, "button", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](2, HeaderToolbarComponent_mat_icon_2_Template, 1, 0, "mat-icon", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 3)(4, "span", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, "WebToolsEasy");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "button", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](7, HeaderToolbarComponent_mat_icon_7_Template, 1, 0, "mat-icon", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("replaceUrl", true);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.platformMetaDataService.isPlatformBrowser);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("replaceUrl", true);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("replaceUrl", true);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.platformMetaDataService.isPlatformBrowser);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.NgIf, _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_3__.MatToolbar, _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__.MatIcon, _angular_material_button__WEBPACK_IMPORTED_MODULE_5__.MatIconButton, _angular_router__WEBPACK_IMPORTED_MODULE_6__.RouterLink],
  styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ }),

/***/ 8369:
/*!*****************************************************************!*\
  !*** ./src/app/modules/header-toolbar/header-toolbar.module.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HeaderToolbarModule: () => (/* binding */ HeaderToolbarModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/toolbar */ 2484);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/button */ 895);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/icon */ 6515);
/* harmony import */ var _header_toolbar_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./header-toolbar.component */ 797);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 7947);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 1699);
var _class;







class HeaderToolbarModule {}
_class = HeaderToolbarModule;
_class.ɵfac = function HeaderToolbarModule_Factory(t) {
  return new (t || _class)();
};
_class.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
  type: _class
});
_class.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule, _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_3__.MatToolbarModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__.MatIconModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_5__.MatButtonModule, _angular_router__WEBPACK_IMPORTED_MODULE_6__.RouterModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](HeaderToolbarModule, {
    declarations: [_header_toolbar_component__WEBPACK_IMPORTED_MODULE_0__.HeaderToolbarComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule, _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_3__.MatToolbarModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__.MatIconModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_5__.MatButtonModule, _angular_router__WEBPACK_IMPORTED_MODULE_6__.RouterModule],
    exports: [_header_toolbar_component__WEBPACK_IMPORTED_MODULE_0__.HeaderToolbarComponent]
  });
})();

/***/ }),

/***/ 6463:
/*!******************************************************************!*\
  !*** ./src/app/modules/related-tools/related-tools.component.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RelatedToolsComponent: () => (/* binding */ RelatedToolsComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var src_app_service_app_context_app_context_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/service/app-context/app-context.service */ 5282);
/* harmony import */ var src_app_service_platform_metadata_platform_metadata_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/service/platform-metadata/platform-metadata.service */ 3242);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 7947);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/icon */ 6515);
var _class;






function RelatedToolsComponent_div_4_mat_icon_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "mat-icon", 7);
  }
  if (rf & 2) {
    const appConfig_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpropertyInterpolate"]("svgIcon", appConfig_r1.iconName);
  }
}
function RelatedToolsComponent_div_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, RelatedToolsComponent_div_4_mat_icon_1_Template, 1, 1, "mat-icon", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "a", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const appConfig_r1 = ctx.$implicit;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r0.platformMetaDataService.isPlatformBrowser);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpropertyInterpolate"]("routerLink", appConfig_r1.navigateUrl);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("replaceUrl", true);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](appConfig_r1.displayText);
  }
}
class RelatedToolsComponent {
  constructor(appContextService, platformMetaDataService) {
    this.appContextService = appContextService;
    this.platformMetaDataService = platformMetaDataService;
  }
}
_class = RelatedToolsComponent;
_class.ɵfac = function RelatedToolsComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](src_app_service_app_context_app_context_service__WEBPACK_IMPORTED_MODULE_0__.AppContextService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](src_app_service_platform_metadata_platform_metadata_service__WEBPACK_IMPORTED_MODULE_1__.PlatformMetadataService));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["app-related-tools"]],
  decls: 5,
  vars: 1,
  consts: [[1, "flex-display", "flex-column-flow", "flex-gap-small"], [2, "font-size", "large"], [1, "flex-display", "flex-row-flow", "flex-wrap", "flex-gap-medium"], ["class", "flex-display flex-row-flow flex-align-center app-parent-div shadow-grey border-grey", 4, "ngFor", "ngForOf"], [1, "flex-display", "flex-row-flow", "flex-align-center", "app-parent-div", "shadow-grey", "border-grey"], ["style", "margin: 10px", 3, "svgIcon", 4, "ngIf"], [3, "replaceUrl", "routerLink"], [2, "margin", "10px", 3, "svgIcon"]],
  template: function RelatedToolsComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0)(1, "span", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, "Related Tools");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "div", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](4, RelatedToolsComponent_div_4_Template, 4, 4, "div", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx.appContextService.applicationConfig == null ? null : ctx.appContextService.applicationConfig.relatedTools);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_3__.NgIf, _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterLink, _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__.MatIcon],
  styles: [".app-parent-div[_ngcontent-%COMP%] {\n  padding: 5px;\n  padding-right: 10px;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvbW9kdWxlcy9yZWxhdGVkLXRvb2xzL3JlbGF0ZWQtdG9vbHMuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxZQUFBO0VBQ0EsbUJBQUE7QUFDRiIsInNvdXJjZXNDb250ZW50IjpbIi5hcHAtcGFyZW50LWRpdiB7XG4gIHBhZGRpbmc6IDVweDtcbiAgcGFkZGluZy1yaWdodDogMTBweDtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
});

/***/ }),

/***/ 300:
/*!***************************************************************!*\
  !*** ./src/app/modules/related-tools/related-tools.module.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RelatedToolsModule: () => (/* binding */ RelatedToolsModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _related_tools_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./related-tools.component */ 6463);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 7947);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/icon */ 6515);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 1699);
var _class;





class RelatedToolsModule {}
_class = RelatedToolsModule;
_class.ɵfac = function RelatedToolsModule_Factory(t) {
  return new (t || _class)();
};
_class.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
  type: _class
});
_class.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule, _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__.MatIconModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](RelatedToolsModule, {
    declarations: [_related_tools_component__WEBPACK_IMPORTED_MODULE_0__.RelatedToolsComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule, _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__.MatIconModule],
    exports: [_related_tools_component__WEBPACK_IMPORTED_MODULE_0__.RelatedToolsComponent]
  });
})();

/***/ }),

/***/ 3927:
/*!******************************************************************!*\
  !*** ./src/app/modules/share-buttons/share-buttons.component.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ShareButtonsComponent: () => (/* binding */ ShareButtonsComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var src_app_service_app_context_app_context_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/service/app-context/app-context.service */ 5282);
/* harmony import */ var src_app_service_platform_metadata_platform_metadata_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/service/platform-metadata/platform-metadata.service */ 3242);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var ngx_sharebuttons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-sharebuttons */ 9775);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/icon */ 6515);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/button */ 895);
var _class;







function ShareButtonsComponent_mat_icon_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "mat-icon", 9);
  }
}
function ShareButtonsComponent_mat_icon_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "mat-icon", 10);
  }
}
function ShareButtonsComponent_mat_icon_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "mat-icon", 11);
  }
}
function ShareButtonsComponent_mat_icon_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "mat-icon", 12);
  }
}
class ShareButtonsComponent {
  constructor(appContextService, platformMetaDataService) {
    this.appContextService = appContextService;
    this.platformMetaDataService = platformMetaDataService;
  }
}
_class = ShareButtonsComponent;
_class.ɵfac = function ShareButtonsComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](src_app_service_app_context_app_context_service__WEBPACK_IMPORTED_MODULE_0__.AppContextService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](src_app_service_platform_metadata_platform_metadata_service__WEBPACK_IMPORTED_MODULE_1__.PlatformMetadataService));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["app-share-buttons"]],
  decls: 11,
  vars: 8,
  consts: [[1, "flex-display", "flex-row-flow", "full-width", "flex-align-center", "flex-gap-small", 2, "justify-content", "end"], ["mat-icon-button", "", "aria-label", "share linkedin button", "shareButton", "linkedin", 3, "url"], ["svgIcon", "share-linkedin", 4, "ngIf"], ["mat-icon-button", "", "aria-label", "share facebook button", "shareButton", "facebook", 3, "url"], ["svgIcon", "share-fb", 4, "ngIf"], ["mat-icon-button", "", "aria-label", "share twitter button", "shareButton", "twitter", 3, "url"], ["svgIcon", "share-twitter", 4, "ngIf"], ["mat-icon-button", "", "aria-label", "share copy link button", "shareButton", "copy", 3, "url"], ["svgIcon", "share-copy", 4, "ngIf"], ["svgIcon", "share-linkedin"], ["svgIcon", "share-fb"], ["svgIcon", "share-twitter"], ["svgIcon", "share-copy"]],
  template: function ShareButtonsComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0)(1, "span");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, "Share");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "button", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](4, ShareButtonsComponent_mat_icon_4_Template, 1, 0, "mat-icon", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "button", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](6, ShareButtonsComponent_mat_icon_6_Template, 1, 0, "mat-icon", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "button", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](8, ShareButtonsComponent_mat_icon_8_Template, 1, 0, "mat-icon", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](9, "button", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](10, ShareButtonsComponent_mat_icon_10_Template, 1, 0, "mat-icon", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpropertyInterpolate"]("url", ctx.appContextService.appUrl);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.platformMetaDataService.isPlatformBrowser);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpropertyInterpolate"]("url", ctx.appContextService.appUrl);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.platformMetaDataService.isPlatformBrowser);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpropertyInterpolate"]("url", ctx.appContextService.appUrl);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.platformMetaDataService.isPlatformBrowser);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpropertyInterpolate"]("url", ctx.appContextService.appUrl);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.platformMetaDataService.isPlatformBrowser);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.NgIf, ngx_sharebuttons__WEBPACK_IMPORTED_MODULE_4__.ShareDirective, _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__.MatIcon, _angular_material_button__WEBPACK_IMPORTED_MODULE_6__.MatIconButton],
  styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ }),

/***/ 8292:
/*!***************************************************************!*\
  !*** ./src/app/modules/share-buttons/share-buttons.module.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ShareButtonsModule: () => (/* binding */ ShareButtonsModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _share_buttons_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./share-buttons.component */ 3927);
/* harmony import */ var ngx_sharebuttons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-sharebuttons */ 9775);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/button */ 895);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/icon */ 6515);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 1699);
var _class;






class ShareButtonsModule {}
_class = ShareButtonsModule;
_class.ɵfac = function ShareButtonsModule_Factory(t) {
  return new (t || _class)();
};
_class.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
  type: _class
});
_class.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule, ngx_sharebuttons__WEBPACK_IMPORTED_MODULE_3__.ShareModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__.MatIconModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_5__.MatButtonModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](ShareButtonsModule, {
    declarations: [_share_buttons_component__WEBPACK_IMPORTED_MODULE_0__.ShareButtonsComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule, ngx_sharebuttons__WEBPACK_IMPORTED_MODULE_3__.ShareModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__.MatIconModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_5__.MatButtonModule],
    exports: [_share_buttons_component__WEBPACK_IMPORTED_MODULE_0__.ShareButtonsComponent]
  });
})();

/***/ }),

/***/ 2740:
/*!************************************************!*\
  !*** ./src/app/modules/tags/tags.component.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TagsComponent: () => (/* binding */ TagsComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var src_app_service_app_context_app_context_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/service/app-context/app-context.service */ 5282);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 6575);
var _class;



function TagsComponent_p_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "p", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const tag_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", tag_r1, " ");
  }
}
class TagsComponent {
  constructor(appContextService) {
    this.appContextService = appContextService;
  }
}
_class = TagsComponent;
_class.ɵfac = function TagsComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](src_app_service_app_context_app_context_service__WEBPACK_IMPORTED_MODULE_0__.AppContextService));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["app-tags"]],
  decls: 2,
  vars: 1,
  consts: [[1, "flex-display", "flex-row-flow", "tags-display", 2, "flex-wrap", "wrap"], ["class", "tag-class", 4, "ngFor", "ngForOf"], [1, "tag-class"]],
  template: function TagsComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, TagsComponent_p_1_Template, 2, 1, "p", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx.appContextService.applicationConfig == null ? null : ctx.appContextService.applicationConfig.tags);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.NgForOf],
  styles: [".tag-class[_ngcontent-%COMP%] {\n  margin: 5px;\n  background: #e0e0e0;\n  border-radius: 16px;\n  padding-left: 8px;\n  padding-right: 8px;\n  padding-top: 4px;\n  padding-bottom: 4px;\n}\n\n@media screen and (min-width: 735px) {\n  .tags-display[_ngcontent-%COMP%] {\n    justify-content: center;\n  }\n}\n@media screen and (max-width: 735px) {\n  .tags-display[_ngcontent-%COMP%] {\n    justify-content: start;\n  }\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvbW9kdWxlcy90YWdzL3RhZ3MuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxXQUFBO0VBQ0EsbUJBQUE7RUFDQSxtQkFBQTtFQUNBLGlCQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtFQUNBLG1CQUFBO0FBQ0Y7O0FBRUE7RUFDRTtJQUNFLHVCQUFBO0VBQ0Y7QUFDRjtBQUVBO0VBQ0U7SUFDRSxzQkFBQTtFQUFGO0FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIudGFnLWNsYXNzIHtcbiAgbWFyZ2luOiA1cHg7XG4gIGJhY2tncm91bmQ6ICNlMGUwZTA7XG4gIGJvcmRlci1yYWRpdXM6IDE2cHg7XG4gIHBhZGRpbmctbGVmdDogOHB4O1xuICBwYWRkaW5nLXJpZ2h0OiA4cHg7XG4gIHBhZGRpbmctdG9wOiA0cHg7XG4gIHBhZGRpbmctYm90dG9tOiA0cHg7XG59XG5cbkBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDczNXB4KSB7XG4gIC50YWdzLWRpc3BsYXkge1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICB9XG59XG5cbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDczNXB4KSB7XG4gIC50YWdzLWRpc3BsYXkge1xuICAgIGp1c3RpZnktY29udGVudDogc3RhcnQ7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
});

/***/ }),

/***/ 3665:
/*!*********************************************!*\
  !*** ./src/app/modules/tags/tags.module.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TagsModule: () => (/* binding */ TagsModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _tags_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tags.component */ 2740);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 1699);
var _class;



class TagsModule {}
_class = TagsModule;
_class.ɵfac = function TagsModule_Factory(t) {
  return new (t || _class)();
};
_class.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
  type: _class
});
_class.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](TagsModule, {
    declarations: [_tags_component__WEBPACK_IMPORTED_MODULE_0__.TagsComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule],
    exports: [_tags_component__WEBPACK_IMPORTED_MODULE_0__.TagsComponent]
  });
})();

/***/ }),

/***/ 2577:
/*!****************************************************************!*\
  !*** ./src/app/modules/tool-heading/tool-heading.component.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ToolHeadingComponent: () => (/* binding */ ToolHeadingComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var src_app_service_app_context_app_context_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/service/app-context/app-context.service */ 5282);
var _class;


class ToolHeadingComponent {
  constructor(appContextService) {
    this.appContextService = appContextService;
  }
}
_class = ToolHeadingComponent;
_class.ɵfac = function ToolHeadingComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](src_app_service_app_context_app_context_service__WEBPACK_IMPORTED_MODULE_0__.AppContextService));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["app-tool-heading"]],
  decls: 2,
  vars: 1,
  consts: [["id", "heading1"]],
  template: function ToolHeadingComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "h1", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx.appContextService.applicationConfig == null ? null : ctx.appContextService.applicationConfig.mainHeading);
    }
  },
  styles: ["#heading1[_ngcontent-%COMP%] {\n  font-family: monospace, \"Courier New\", Courier;\n  text-align: center;\n  margin-top: 10px;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvbW9kdWxlcy90b29sLWhlYWRpbmcvdG9vbC1oZWFkaW5nLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsOENBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIjaGVhZGluZzEge1xuICBmb250LWZhbWlseTogbW9ub3NwYWNlLCAnQ291cmllciBOZXcnLCBDb3VyaWVyO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIG1hcmdpbi10b3A6IDEwcHg7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
});

/***/ }),

/***/ 6861:
/*!*************************************************************!*\
  !*** ./src/app/modules/tool-heading/tool-heading.module.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ToolHeadingModule: () => (/* binding */ ToolHeadingModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _tool_heading_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tool-heading.component */ 2577);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 1699);
var _class;



class ToolHeadingModule {}
_class = ToolHeadingModule;
_class.ɵfac = function ToolHeadingModule_Factory(t) {
  return new (t || _class)();
};
_class.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
  type: _class
});
_class.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](ToolHeadingModule, {
    declarations: [_tool_heading_component__WEBPACK_IMPORTED_MODULE_0__.ToolHeadingComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule],
    exports: [_tool_heading_component__WEBPACK_IMPORTED_MODULE_0__.ToolHeadingComponent]
  });
})();

/***/ }),

/***/ 5282:
/*!************************************************************!*\
  !*** ./src/app/service/app-context/app-context.service.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppContextService: () => (/* binding */ AppContextService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 1699);
var _class;

class AppContextService {}
_class = AppContextService;
_class.ɵfac = function AppContextService_Factory(t) {
  return new (t || _class)();
};
_class.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
  token: _class,
  factory: _class.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 4234:
/*!****************************************************************!*\
  !*** ./src/environments/component-config/app-parent/config.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ICON_CONFIG: () => (/* binding */ ICON_CONFIG)
/* harmony export */ });
const ICON_CONFIG = [{
  iconName: 'app-icon',
  iconRelativeUrl: 'app-icon.svg'
}, {
  iconName: 'share-fb',
  iconRelativeUrl: 'share-fb.svg'
}, {
  iconName: 'share-linkedin',
  iconRelativeUrl: 'share-linkedin.svg'
}, {
  iconName: 'share-twitter',
  iconRelativeUrl: 'share-twitter.svg'
}, {
  iconName: 'share-copy',
  iconRelativeUrl: 'share-copy.svg'
}, {
  iconName: 'home-icon',
  iconRelativeUrl: 'home.svg'
}];

/***/ }),

/***/ 9378:
/*!*****************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm/internal/observable/timer.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   timer: () => (/* binding */ timer)
/* harmony export */ });
/* harmony import */ var _Observable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Observable */ 2235);
/* harmony import */ var _scheduler_async__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scheduler/async */ 7777);
/* harmony import */ var _util_isScheduler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/isScheduler */ 7426);
/* harmony import */ var _util_isDate__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util/isDate */ 8442);




function timer(dueTime = 0, intervalOrScheduler, scheduler = _scheduler_async__WEBPACK_IMPORTED_MODULE_0__.async) {
  let intervalDuration = -1;
  if (intervalOrScheduler != null) {
    if ((0,_util_isScheduler__WEBPACK_IMPORTED_MODULE_1__.isScheduler)(intervalOrScheduler)) {
      scheduler = intervalOrScheduler;
    } else {
      intervalDuration = intervalOrScheduler;
    }
  }
  return new _Observable__WEBPACK_IMPORTED_MODULE_2__.Observable(subscriber => {
    let due = (0,_util_isDate__WEBPACK_IMPORTED_MODULE_3__.isValidDate)(dueTime) ? +dueTime - scheduler.now() : dueTime;
    if (due < 0) {
      due = 0;
    }
    let n = 0;
    return scheduler.schedule(function () {
      if (!subscriber.closed) {
        subscriber.next(n++);
        if (0 <= intervalDuration) {
          this.schedule(undefined, intervalDuration);
        } else {
          subscriber.complete();
        }
      }
    }, due);
  });
}

/***/ }),

/***/ 7592:
/*!****************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm/internal/operators/delay.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   delay: () => (/* binding */ delay)
/* harmony export */ });
/* harmony import */ var _scheduler_async__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scheduler/async */ 7777);
/* harmony import */ var _delayWhen__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./delayWhen */ 9134);
/* harmony import */ var _observable_timer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../observable/timer */ 9378);



function delay(due, scheduler = _scheduler_async__WEBPACK_IMPORTED_MODULE_0__.asyncScheduler) {
  const duration = (0,_observable_timer__WEBPACK_IMPORTED_MODULE_1__.timer)(due, scheduler);
  return (0,_delayWhen__WEBPACK_IMPORTED_MODULE_2__.delayWhen)(() => duration);
}

/***/ }),

/***/ 9134:
/*!********************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm/internal/operators/delayWhen.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   delayWhen: () => (/* binding */ delayWhen)
/* harmony export */ });
/* harmony import */ var _observable_concat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../observable/concat */ 9644);
/* harmony import */ var _take__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./take */ 1527);
/* harmony import */ var _ignoreElements__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ignoreElements */ 9923);
/* harmony import */ var _mapTo__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./mapTo */ 8037);
/* harmony import */ var _mergeMap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./mergeMap */ 2607);
/* harmony import */ var _observable_innerFrom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../observable/innerFrom */ 384);






function delayWhen(delayDurationSelector, subscriptionDelay) {
  if (subscriptionDelay) {
    return source => (0,_observable_concat__WEBPACK_IMPORTED_MODULE_0__.concat)(subscriptionDelay.pipe((0,_take__WEBPACK_IMPORTED_MODULE_1__.take)(1), (0,_ignoreElements__WEBPACK_IMPORTED_MODULE_2__.ignoreElements)()), source.pipe(delayWhen(delayDurationSelector)));
  }
  return (0,_mergeMap__WEBPACK_IMPORTED_MODULE_3__.mergeMap)((value, index) => (0,_observable_innerFrom__WEBPACK_IMPORTED_MODULE_4__.innerFrom)(delayDurationSelector(value, index)).pipe((0,_take__WEBPACK_IMPORTED_MODULE_1__.take)(1), (0,_mapTo__WEBPACK_IMPORTED_MODULE_5__.mapTo)(value)));
}

/***/ }),

/***/ 9923:
/*!*************************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm/internal/operators/ignoreElements.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ignoreElements: () => (/* binding */ ignoreElements)
/* harmony export */ });
/* harmony import */ var _util_lift__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/lift */ 4114);
/* harmony import */ var _OperatorSubscriber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./OperatorSubscriber */ 5678);
/* harmony import */ var _util_noop__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/noop */ 2707);



function ignoreElements() {
  return (0,_util_lift__WEBPACK_IMPORTED_MODULE_0__.operate)((source, subscriber) => {
    source.subscribe((0,_OperatorSubscriber__WEBPACK_IMPORTED_MODULE_1__.createOperatorSubscriber)(subscriber, _util_noop__WEBPACK_IMPORTED_MODULE_2__.noop));
  });
}

/***/ }),

/***/ 8442:
/*!************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm/internal/util/isDate.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isValidDate: () => (/* binding */ isValidDate)
/* harmony export */ });
function isValidDate(value) {
  return value instanceof Date && !isNaN(value);
}

/***/ }),

/***/ 4362:
/*!**********************************************************!*\
  !*** ./node_modules/@angular/cdk/fesm2022/clipboard.mjs ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CDK_COPY_TO_CLIPBOARD_CONFIG: () => (/* binding */ CDK_COPY_TO_CLIPBOARD_CONFIG),
/* harmony export */   CdkCopyToClipboard: () => (/* binding */ CdkCopyToClipboard),
/* harmony export */   Clipboard: () => (/* binding */ Clipboard),
/* harmony export */   ClipboardModule: () => (/* binding */ ClipboardModule),
/* harmony export */   PendingCopy: () => (/* binding */ PendingCopy)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 1699);
var _class, _class2, _class3;




/**
 * A pending copy-to-clipboard operation.
 *
 * The implementation of copying text to the clipboard modifies the DOM and
 * forces a re-layout. This re-layout can take too long if the string is large,
 * causing the execCommand('copy') to happen too long after the user clicked.
 * This results in the browser refusing to copy. This object lets the
 * re-layout happen in a separate tick from copying by providing a copy function
 * that can be called later.
 *
 * Destroy must be called when no longer in use, regardless of whether `copy` is
 * called.
 */
class PendingCopy {
  constructor(text, _document) {
    this._document = _document;
    const textarea = this._textarea = this._document.createElement('textarea');
    const styles = textarea.style;
    // Hide the element for display and accessibility. Set a fixed position so the page layout
    // isn't affected. We use `fixed` with `top: 0`, because focus is moved into the textarea
    // for a split second and if it's off-screen, some browsers will attempt to scroll it into view.
    styles.position = 'fixed';
    styles.top = styles.opacity = '0';
    styles.left = '-999em';
    textarea.setAttribute('aria-hidden', 'true');
    textarea.value = text;
    // Making the textarea `readonly` prevents the screen from jumping on iOS Safari (see #25169).
    textarea.readOnly = true;
    // The element needs to be inserted into the fullscreen container, if the page
    // is in fullscreen mode, otherwise the browser won't execute the copy command.
    (this._document.fullscreenElement || this._document.body).appendChild(textarea);
  }
  /** Finishes copying the text. */
  copy() {
    const textarea = this._textarea;
    let successful = false;
    try {
      // Older browsers could throw if copy is not supported.
      if (textarea) {
        const currentFocus = this._document.activeElement;
        textarea.select();
        textarea.setSelectionRange(0, textarea.value.length);
        successful = this._document.execCommand('copy');
        if (currentFocus) {
          currentFocus.focus();
        }
      }
    } catch {
      // Discard error.
      // Initial setting of {@code successful} will represent failure here.
    }
    return successful;
  }
  /** Cleans up DOM changes used to perform the copy operation. */
  destroy() {
    const textarea = this._textarea;
    if (textarea) {
      textarea.remove();
      this._textarea = undefined;
    }
  }
}

/**
 * A service for copying text to the clipboard.
 */
class Clipboard {
  constructor(document) {
    this._document = document;
  }
  /**
   * Copies the provided text into the user's clipboard.
   *
   * @param text The string to copy.
   * @returns Whether the operation was successful.
   */
  copy(text) {
    const pendingCopy = this.beginCopy(text);
    const successful = pendingCopy.copy();
    pendingCopy.destroy();
    return successful;
  }
  /**
   * Prepares a string to be copied later. This is useful for large strings
   * which take too long to successfully render and be copied in the same tick.
   *
   * The caller must call `destroy` on the returned `PendingCopy`.
   *
   * @param text The string to copy.
   * @returns the pending copy operation.
   */
  beginCopy(text) {
    return new PendingCopy(text, this._document);
  }
}
_class = Clipboard;
_class.ɵfac = function _class_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common__WEBPACK_IMPORTED_MODULE_1__.DOCUMENT));
};
_class.ɵprov = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
  token: _class,
  factory: _class.ɵfac,
  providedIn: 'root'
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](Clipboard, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Injectable,
    args: [{
      providedIn: 'root'
    }]
  }], function () {
    return [{
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Inject,
        args: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.DOCUMENT]
      }]
    }];
  }, null);
})();

/** Injection token that can be used to provide the default options to `CdkCopyToClipboard`. */
const CDK_COPY_TO_CLIPBOARD_CONFIG = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken('CDK_COPY_TO_CLIPBOARD_CONFIG');
/**
 * Provides behavior for a button that when clicked copies content into user's
 * clipboard.
 */
class CdkCopyToClipboard {
  constructor(_clipboard, _ngZone, config) {
    this._clipboard = _clipboard;
    this._ngZone = _ngZone;
    /** Content to be copied. */
    this.text = '';
    /**
     * How many times to attempt to copy the text. This may be necessary for longer text, because
     * the browser needs time to fill an intermediate textarea element and copy the content.
     */
    this.attempts = 1;
    /**
     * Emits when some text is copied to the clipboard. The
     * emitted value indicates whether copying was successful.
     */
    this.copied = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    /** Copies that are currently being attempted. */
    this._pending = new Set();
    if (config && config.attempts != null) {
      this.attempts = config.attempts;
    }
  }
  /** Copies the current text to the clipboard. */
  copy(attempts = this.attempts) {
    if (attempts > 1) {
      let remainingAttempts = attempts;
      const pending = this._clipboard.beginCopy(this.text);
      this._pending.add(pending);
      const attempt = () => {
        const successful = pending.copy();
        if (!successful && --remainingAttempts && !this._destroyed) {
          // We use 1 for the timeout since it's more predictable when flushing in unit tests.
          this._currentTimeout = this._ngZone.runOutsideAngular(() => setTimeout(attempt, 1));
        } else {
          this._currentTimeout = null;
          this._pending.delete(pending);
          pending.destroy();
          this.copied.emit(successful);
        }
      };
      attempt();
    } else {
      this.copied.emit(this._clipboard.copy(this.text));
    }
  }
  ngOnDestroy() {
    if (this._currentTimeout) {
      clearTimeout(this._currentTimeout);
    }
    this._pending.forEach(copy => copy.destroy());
    this._pending.clear();
    this._destroyed = true;
  }
}
_class2 = CdkCopyToClipboard;
_class2.ɵfac = function _class2_Factory(t) {
  return new (t || _class2)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](Clipboard), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.NgZone), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](CDK_COPY_TO_CLIPBOARD_CONFIG, 8));
};
_class2.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
  type: _class2,
  selectors: [["", "cdkCopyToClipboard", ""]],
  hostBindings: function _class2_HostBindings(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function _class2_click_HostBindingHandler() {
        return ctx.copy();
      });
    }
  },
  inputs: {
    text: ["cdkCopyToClipboard", "text"],
    attempts: ["cdkCopyToClipboardAttempts", "attempts"]
  },
  outputs: {
    copied: "cdkCopyToClipboardCopied"
  }
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](CdkCopyToClipboard, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Directive,
    args: [{
      selector: '[cdkCopyToClipboard]',
      host: {
        '(click)': 'copy()'
      }
    }]
  }], function () {
    return [{
      type: Clipboard
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.NgZone
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Inject,
        args: [CDK_COPY_TO_CLIPBOARD_CONFIG]
      }]
    }];
  }, {
    text: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input,
      args: ['cdkCopyToClipboard']
    }],
    attempts: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input,
      args: ['cdkCopyToClipboardAttempts']
    }],
    copied: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Output,
      args: ['cdkCopyToClipboardCopied']
    }]
  });
})();
class ClipboardModule {}
_class3 = ClipboardModule;
_class3.ɵfac = function _class3_Factory(t) {
  return new (t || _class3)();
};
_class3.ɵmod = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
  type: _class3
});
_class3.ɵinj = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ClipboardModule, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.NgModule,
    args: [{
      declarations: [CdkCopyToClipboard],
      exports: [CdkCopyToClipboard]
    }]
  }], null, null);
})();

/**
 * Generated bundle index. Do not edit.
 */



/***/ }),

/***/ 2484:
/*!*************************************************************!*\
  !*** ./node_modules/@angular/material/fesm2022/toolbar.mjs ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MatToolbar: () => (/* binding */ MatToolbar),
/* harmony export */   MatToolbarModule: () => (/* binding */ MatToolbarModule),
/* harmony export */   MatToolbarRow: () => (/* binding */ MatToolbarRow),
/* harmony export */   throwToolbarMixedModesError: () => (/* binding */ throwToolbarMixedModesError)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/material/core */ 5309);
/* harmony import */ var _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/cdk/platform */ 3274);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 6575);
var _class, _class2, _class3;






// Boilerplate for applying mixins to MatToolbar.
/** @docs-private */
const _c0 = ["*", [["mat-toolbar-row"]]];
const _c1 = ["*", "mat-toolbar-row"];
const _MatToolbarBase = (0,_angular_material_core__WEBPACK_IMPORTED_MODULE_0__.mixinColor)(class {
  constructor(_elementRef) {
    this._elementRef = _elementRef;
  }
});
class MatToolbarRow {}
_class = MatToolbarRow;
_class.ɵfac = function _class_Factory(t) {
  return new (t || _class)();
};
_class.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineDirective"]({
  type: _class,
  selectors: [["mat-toolbar-row"]],
  hostAttrs: [1, "mat-toolbar-row"],
  exportAs: ["matToolbarRow"]
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](MatToolbarRow, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Directive,
    args: [{
      selector: 'mat-toolbar-row',
      exportAs: 'matToolbarRow',
      host: {
        'class': 'mat-toolbar-row'
      }
    }]
  }], null, null);
})();
class MatToolbar extends _MatToolbarBase {
  constructor(elementRef, _platform, document) {
    super(elementRef);
    this._platform = _platform;
    // TODO: make the document a required param when doing breaking changes.
    this._document = document;
  }
  ngAfterViewInit() {
    if (this._platform.isBrowser) {
      this._checkToolbarMixedModes();
      this._toolbarRows.changes.subscribe(() => this._checkToolbarMixedModes());
    }
  }
  /**
   * Throws an exception when developers are attempting to combine the different toolbar row modes.
   */
  _checkToolbarMixedModes() {
    if (this._toolbarRows.length && (typeof ngDevMode === 'undefined' || ngDevMode)) {
      // Check if there are any other DOM nodes that can display content but aren't inside of
      // a <mat-toolbar-row> element.
      const isCombinedUsage = Array.from(this._elementRef.nativeElement.childNodes).filter(node => !(node.classList && node.classList.contains('mat-toolbar-row'))).filter(node => node.nodeType !== (this._document ? this._document.COMMENT_NODE : 8)).some(node => !!(node.textContent && node.textContent.trim()));
      if (isCombinedUsage) {
        throwToolbarMixedModesError();
      }
    }
  }
}
_class2 = MatToolbar;
_class2.ɵfac = function _class2_Factory(t) {
  return new (t || _class2)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_2__.Platform), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_3__.DOCUMENT));
};
_class2.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
  type: _class2,
  selectors: [["mat-toolbar"]],
  contentQueries: function _class2_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵcontentQuery"](dirIndex, MatToolbarRow, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵloadQuery"]()) && (ctx._toolbarRows = _t);
    }
  },
  hostAttrs: [1, "mat-toolbar"],
  hostVars: 4,
  hostBindings: function _class2_HostBindings(rf, ctx) {
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassProp"]("mat-toolbar-multiple-rows", ctx._toolbarRows.length > 0)("mat-toolbar-single-row", ctx._toolbarRows.length === 0);
    }
  },
  inputs: {
    color: "color"
  },
  exportAs: ["matToolbar"],
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵInheritDefinitionFeature"]],
  ngContentSelectors: _c1,
  decls: 2,
  vars: 0,
  template: function _class2_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵprojectionDef"](_c0);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵprojection"](0);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵprojection"](1, 1);
    }
  },
  styles: [".mat-toolbar{background:var(--mat-toolbar-container-background-color);color:var(--mat-toolbar-container-text-color)}.mat-toolbar,.mat-toolbar h1,.mat-toolbar h2,.mat-toolbar h3,.mat-toolbar h4,.mat-toolbar h5,.mat-toolbar h6{font-family:var(--mat-toolbar-title-text-font);font-size:var(--mat-toolbar-title-text-size);line-height:var(--mat-toolbar-title-text-line-height);font-weight:var(--mat-toolbar-title-text-weight);letter-spacing:var(--mat-toolbar-title-text-tracking);margin:0}.cdk-high-contrast-active .mat-toolbar{outline:solid 1px}.mat-toolbar .mat-form-field-underline,.mat-toolbar .mat-form-field-ripple,.mat-toolbar .mat-focused .mat-form-field-ripple{background-color:currentColor}.mat-toolbar .mat-form-field-label,.mat-toolbar .mat-focused .mat-form-field-label,.mat-toolbar .mat-select-value,.mat-toolbar .mat-select-arrow,.mat-toolbar .mat-form-field.mat-focused .mat-select-arrow{color:inherit}.mat-toolbar .mat-input-element{caret-color:currentColor}.mat-toolbar .mat-mdc-button-base.mat-unthemed{--mdc-text-button-label-text-color: inherit;--mdc-outlined-button-label-text-color: inherit}.mat-toolbar-row,.mat-toolbar-single-row{display:flex;box-sizing:border-box;padding:0 16px;width:100%;flex-direction:row;align-items:center;white-space:nowrap;height:var(--mat-toolbar-standard-height)}@media(max-width: 599px){.mat-toolbar-row,.mat-toolbar-single-row{height:var(--mat-toolbar-mobile-height)}}.mat-toolbar-multiple-rows{display:flex;box-sizing:border-box;flex-direction:column;width:100%;min-height:var(--mat-toolbar-standard-height)}@media(max-width: 599px){.mat-toolbar-multiple-rows{min-height:var(--mat-toolbar-mobile-height)}}"],
  encapsulation: 2,
  changeDetection: 0
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](MatToolbar, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Component,
    args: [{
      selector: 'mat-toolbar',
      exportAs: 'matToolbar',
      inputs: ['color'],
      host: {
        'class': 'mat-toolbar',
        '[class.mat-toolbar-multiple-rows]': '_toolbarRows.length > 0',
        '[class.mat-toolbar-single-row]': '_toolbarRows.length === 0'
      },
      changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_1__.ChangeDetectionStrategy.OnPush,
      encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_1__.ViewEncapsulation.None,
      template: "<ng-content></ng-content>\n<ng-content select=\"mat-toolbar-row\"></ng-content>\n",
      styles: [".mat-toolbar{background:var(--mat-toolbar-container-background-color);color:var(--mat-toolbar-container-text-color)}.mat-toolbar,.mat-toolbar h1,.mat-toolbar h2,.mat-toolbar h3,.mat-toolbar h4,.mat-toolbar h5,.mat-toolbar h6{font-family:var(--mat-toolbar-title-text-font);font-size:var(--mat-toolbar-title-text-size);line-height:var(--mat-toolbar-title-text-line-height);font-weight:var(--mat-toolbar-title-text-weight);letter-spacing:var(--mat-toolbar-title-text-tracking);margin:0}.cdk-high-contrast-active .mat-toolbar{outline:solid 1px}.mat-toolbar .mat-form-field-underline,.mat-toolbar .mat-form-field-ripple,.mat-toolbar .mat-focused .mat-form-field-ripple{background-color:currentColor}.mat-toolbar .mat-form-field-label,.mat-toolbar .mat-focused .mat-form-field-label,.mat-toolbar .mat-select-value,.mat-toolbar .mat-select-arrow,.mat-toolbar .mat-form-field.mat-focused .mat-select-arrow{color:inherit}.mat-toolbar .mat-input-element{caret-color:currentColor}.mat-toolbar .mat-mdc-button-base.mat-unthemed{--mdc-text-button-label-text-color: inherit;--mdc-outlined-button-label-text-color: inherit}.mat-toolbar-row,.mat-toolbar-single-row{display:flex;box-sizing:border-box;padding:0 16px;width:100%;flex-direction:row;align-items:center;white-space:nowrap;height:var(--mat-toolbar-standard-height)}@media(max-width: 599px){.mat-toolbar-row,.mat-toolbar-single-row{height:var(--mat-toolbar-mobile-height)}}.mat-toolbar-multiple-rows{display:flex;box-sizing:border-box;flex-direction:column;width:100%;min-height:var(--mat-toolbar-standard-height)}@media(max-width: 599px){.mat-toolbar-multiple-rows{min-height:var(--mat-toolbar-mobile-height)}}"]
    }]
  }], function () {
    return [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.ElementRef
    }, {
      type: _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_2__.Platform
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Inject,
        args: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.DOCUMENT]
      }]
    }];
  }, {
    _toolbarRows: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.ContentChildren,
      args: [MatToolbarRow, {
        descendants: true
      }]
    }]
  });
})();
/**
 * Throws an exception when attempting to combine the different toolbar row modes.
 * @docs-private
 */
function throwToolbarMixedModesError() {
  throw Error('MatToolbar: Attempting to combine different toolbar modes. ' + 'Either specify multiple `<mat-toolbar-row>` elements explicitly or just place content ' + 'inside of a `<mat-toolbar>` for a single row.');
}
class MatToolbarModule {}
_class3 = MatToolbarModule;
_class3.ɵfac = function _class3_Factory(t) {
  return new (t || _class3)();
};
_class3.ɵmod = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
  type: _class3
});
_class3.ɵinj = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
  imports: [_angular_material_core__WEBPACK_IMPORTED_MODULE_0__.MatCommonModule, _angular_material_core__WEBPACK_IMPORTED_MODULE_0__.MatCommonModule]
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](MatToolbarModule, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.NgModule,
    args: [{
      imports: [_angular_material_core__WEBPACK_IMPORTED_MODULE_0__.MatCommonModule],
      exports: [MatToolbar, MatToolbarRow, _angular_material_core__WEBPACK_IMPORTED_MODULE_0__.MatCommonModule],
      declarations: [MatToolbar, MatToolbarRow]
    }]
  }], null, null);
})();

/**
 * Generated bundle index. Do not edit.
 */



/***/ }),

/***/ 9775:
/*!*********************************************************************!*\
  !*** ./node_modules/ngx-sharebuttons/fesm2022/ngx-sharebuttons.mjs ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   IShareButton: () => (/* binding */ IShareButton),
/* harmony export */   SHARE_BUTTONS: () => (/* binding */ SHARE_BUTTONS),
/* harmony export */   SHARE_BUTTONS_CONFIG: () => (/* binding */ SHARE_BUTTONS_CONFIG),
/* harmony export */   ShareDirective: () => (/* binding */ ShareDirective),
/* harmony export */   ShareModule: () => (/* binding */ ShareModule),
/* harmony export */   ShareService: () => (/* binding */ ShareService),
/* harmony export */   SharerMethod: () => (/* binding */ SharerMethod)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/cdk/platform */ 3274);
/* harmony import */ var _angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/cdk/clipboard */ 4362);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 2235);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 4980);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 8071);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs */ 2513);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs */ 6290);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 3738);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ 7592);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ 1527);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs/operators */ 274);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/platform-browser */ 6480);
var _class, _class2, _class3;










const SHARE_BUTTONS_CONFIG = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken('shareButtonsConfig');
class IShareButton {}
var SharerMethod;
(function (SharerMethod) {
  SharerMethod["Anchor"] = "anchor";
  SharerMethod["Window"] = "window";
})(SharerMethod || (SharerMethod = {}));

/**
 * Simple object check.
 */
function isObject(item) {
  return item && typeof item === 'object' && !Array.isArray(item);
}
/**
 * Deep merge two objects.
 */
function mergeDeep(target, ...sources) {
  if (!sources.length) {
    return target;
  }
  const source = sources.shift();
  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) {
          Object.assign(target, {
            [key]: {}
          });
        }
        mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, {
          [key]: source[key]
        });
      }
    }
  }
  return mergeDeep(target, ...sources);
}
/** Returns a valid URL or falls back to current URL */
function getValidUrl(url, fallbackUrl) {
  if (url) {
    const r = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    if (r.test(url)) {
      return url;
    }
    console.warn(`[ShareButtons]: Sharing link '${url}' is invalid!`);
  }
  return fallbackUrl;
}
function printPage() {
  return new rxjs__WEBPACK_IMPORTED_MODULE_1__.Observable(sub => document.defaultView.print());
}
function copyToClipboard({
  params,
  data,
  clipboard,
  updater
}) {
  return (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.of)(null).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.tap)(() => {
    clipboard.copy(params.url);
    // Disable copy button
    updater.next({
      icon: data.successIcon,
      text: data.successText,
      disabled: true
    });
  }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.delay)(data.delay), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.tap)(() => updater.next({
    icon: data.icon,
    text: data.text,
    disabled: false
  })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.take)(1));
}

// Create message body that includes the sharing link used for Email, SMS and WhatsApp buttons
const linkInDescription = {
  description: p => {
    return p.description ? `${p.description}\r\n${p.url}` : p.url;
  }
};
const SHARE_BUTTONS = {
  facebook: {
    type: 'facebook',
    text: 'Facebook',
    ariaLabel: 'Share on Facebook',
    icon: ['fab', 'facebook-f'],
    color: '#4267B2',
    share: {
      desktop: 'https://www.facebook.com/sharer/sharer.php?'
    },
    params: {
      url: 'u'
    }
  },
  twitter: {
    type: 'twitter',
    text: 'Twitter',
    ariaLabel: 'Share on Twitter',
    icon: ['fab', 'twitter'],
    color: '#00acee',
    share: {
      desktop: 'https://twitter.com/intent/tweet?'
    },
    params: {
      url: 'url',
      description: 'text',
      tags: 'hashtags',
      via: 'via'
    }
  },
  linkedin: {
    type: 'linkedin',
    text: 'LinkedIn',
    ariaLabel: 'Share on LinkedIn',
    icon: ['fab', 'linkedin-in'],
    color: '#006fa6',
    share: {
      desktop: 'https://www.linkedin.com/shareArticle?'
    },
    params: {
      url: 'url',
      title: 'title',
      description: 'summary'
    }
  },
  pinterest: {
    type: 'pinterest',
    text: 'Pinterest',
    ariaLabel: 'Share on Pinterest',
    icon: ['fab', 'pinterest-p'],
    color: '#BD091D',
    share: {
      desktop: 'https://pinterest.com/pin/create/button/?'
    },
    params: {
      url: 'url',
      description: 'description',
      image: 'media'
    }
  },
  reddit: {
    type: 'reddit',
    text: 'Reddit',
    ariaLabel: 'Share on Reddit',
    icon: ['fab', 'reddit-alien'],
    color: '#FF4006',
    share: {
      desktop: 'https://www.reddit.com/submit?'
    },
    params: {
      url: 'url',
      title: 'title'
    }
  },
  tumblr: {
    type: 'tumblr',
    text: 'Tumblr',
    ariaLabel: 'Share on Tumblr',
    icon: ['fab', 'tumblr'],
    color: '#36465D',
    share: {
      desktop: 'https://tumblr.com/widgets/share/tool?'
    },
    params: {
      url: 'canonicalUrl',
      description: 'caption',
      tags: 'tags'
    }
  },
  mix: {
    type: 'mix',
    text: 'Mix',
    ariaLabel: 'Share on Mix',
    icon: ['fab', 'mix'],
    color: '#eb4924',
    share: {
      desktop: 'https://mix.com/add?'
    },
    params: {
      url: 'url'
    }
  },
  viber: {
    type: 'viber',
    text: 'Viber',
    ariaLabel: 'Share on Viber',
    icon: ['fab', 'viber'],
    color: '#665ca7',
    share: {
      android: 'viber://forward?',
      ios: 'viber://forward?'
    },
    params: {
      description: 'text'
    },
    paramsFunc: linkInDescription
  },
  vk: {
    type: 'vk',
    text: 'VKontakte',
    ariaLabel: 'Share on VKontakte',
    icon: ['fab', 'vk'],
    color: '#4C75A3',
    share: {
      desktop: 'https://vk.com/share.php?'
    },
    params: {
      url: 'url'
    }
  },
  telegram: {
    type: 'telegram',
    text: 'Telegram',
    ariaLabel: 'Share on Telegram',
    icon: ['fab', 'telegram-plane'],
    color: '#0088cc',
    share: {
      desktop: 'https://t.me/share/url?'
    },
    params: {
      url: 'url',
      description: 'text'
    }
  },
  messenger: {
    type: 'messenger',
    text: 'Messenger',
    ariaLabel: 'Share on Messenger',
    icon: ['fab', 'facebook-messenger'],
    color: '#0080FF',
    share: {
      desktop: 'https://www.facebook.com/dialog/send?',
      android: 'fb-messenger://share/?',
      ios: 'fb-messenger://share/?'
    },
    params: {
      url: 'link',
      appId: 'app_id',
      redirectUrl: 'redirect_uri'
    }
  },
  whatsapp: {
    type: 'whatsapp',
    text: 'WhatsApp',
    ariaLabel: 'Share on WhatsApp',
    icon: ['fab', 'whatsapp'],
    color: '#25D366',
    share: {
      desktop: 'https://api.whatsapp.com/send?',
      android: 'whatsapp://send?',
      ios: 'https://api.whatsapp.com/send?'
    },
    params: {
      url: 'link',
      description: 'text'
    },
    paramsFunc: linkInDescription
  },
  xing: {
    type: 'xing',
    text: 'Xing',
    ariaLabel: 'Share on Xing',
    icon: ['fab', 'xing'],
    color: '#006567',
    share: {
      desktop: 'https://www.xing.com/spi/shares/new?'
    },
    params: {
      url: 'url'
    }
  },
  line: {
    type: 'line',
    text: 'Line',
    ariaLabel: 'Share on Line',
    icon: ['fab', 'line'],
    color: '#00b900',
    share: {
      desktop: 'https://social-plugins.line.me/lineit/share?'
    },
    params: {
      url: 'url'
    }
  },
  sms: {
    type: 'sms',
    text: 'SMS',
    ariaLabel: 'Share link via SMS',
    icon: ['fas', 'sms'],
    color: '#20c16c',
    share: {
      desktop: 'sms:?',
      ios: 'sms:&'
    },
    params: {
      description: 'body'
    },
    paramsFunc: linkInDescription
  },
  email: {
    type: 'email',
    text: 'Email',
    ariaLabel: 'Share link via email',
    icon: ['fas', 'envelope'],
    color: '#FF961C',
    share: {
      desktop: 'mailto:?'
    },
    params: {
      title: 'subject',
      description: 'body'
    },
    paramsFunc: linkInDescription
  },
  print: {
    type: 'print',
    text: 'Print',
    ariaLabel: 'Print page',
    icon: ['fas', 'print'],
    color: '#765AA2',
    func: printPage
  },
  copy: {
    type: 'copy',
    text: 'Copy link',
    ariaLabel: 'Copy link',
    icon: ['fas', 'link'],
    color: '#607D8B',
    data: {
      text: 'Copy link',
      icon: ['fas', 'link'],
      successText: 'Copied',
      successIcon: ['fas', 'check'],
      delay: 2000
    },
    func: copyToClipboard
  }
};
class ShareService {
  constructor(config, _document) {
    this._document = _document;
    /** Global config that applies on all share buttons in the app */
    this.config = {
      sharerMethod: SharerMethod.Anchor,
      sharerTarget: '_blank',
      windowObj: this._document.defaultView,
      windowFuncName: 'open',
      prop: SHARE_BUTTONS,
      theme: 'default',
      include: [],
      exclude: [],
      autoSetMeta: true,
      windowWidth: 800,
      windowHeight: 500,
      moreButtonIcon: 'ellipsis-h',
      lessButtonIcon: 'minus',
      moreButtonAriaLabel: 'Show more share buttons',
      lessButtonAriaLabel: 'Show less share buttons'
    };
    /** Stream that emits when config changes */
    this.config$ = new rxjs__WEBPACK_IMPORTED_MODULE_6__.BehaviorSubject(this.config);
    if (config) {
      this.setConfig(config);
    }
  }
  /**
   * Share buttons properties, used to get the text, color and icon of each button.
   */
  get prop() {
    return this.config.prop;
  }
  get windowSize() {
    return `width=${this.config.windowWidth}, height=${this.config.windowHeight}`;
  }
  setConfig(config) {
    this.config = mergeDeep(this.config, config);
    this.config$.next(this.config);
  }
  addButton(name, props) {
    this.setConfig({
      prop: {
        [name]: props
      }
    });
  }
}
_class = ShareService;
_class.ɵfac = function _class_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](SHARE_BUTTONS_CONFIG, 8), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common__WEBPACK_IMPORTED_MODULE_7__.DOCUMENT));
};
_class.ɵprov = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
  token: _class,
  factory: _class.ɵfac,
  providedIn: 'root'
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ShareService, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Injectable,
    args: [{
      providedIn: 'root'
    }]
  }], function () {
    return [{
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Inject,
        args: [SHARE_BUTTONS_CONFIG]
      }]
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Inject,
        args: [_angular_common__WEBPACK_IMPORTED_MODULE_7__.DOCUMENT]
      }]
    }];
  }, null);
})();
class ShareDirective {
  constructor(_el, _meta, _platform, _clipboard, _share, _cd, _document) {
    this._meta = _meta;
    this._platform = _platform;
    this._clipboard = _clipboard;
    this._share = _share;
    this._cd = _cd;
    this._document = _document;
    /** Stream that emits when button is destroyed */
    this._destroyed = new rxjs__WEBPACK_IMPORTED_MODULE_8__.Subject();
    /** Stream that emit when share button need to be updated */
    this._updater = new rxjs__WEBPACK_IMPORTED_MODULE_8__.Subject();
    /** Set meta tags from document head, useful when SEO is supported */
    this.autoSetMeta = this._share.config.autoSetMeta;
    /** Sharing link */
    this.url = this._share.config.url;
    /** Sets the title parameter */
    this.title = this._share.config.title;
    /** Sets the description parameter */
    this.description = this._share.config.description;
    /** Sets the image parameter for sharing on Pinterest */
    this.image = this._share.config.image;
    /** Sets the tags parameter for sharing on Twitter and Tumblr */
    this.tags = this._share.config.tags;
    /** Sets the fb messenger redirect url to enable sharing on Messenger desktop */
    this.redirectUrl = this._share.config.redirectUrl;
    /** Stream that emits when share dialog is opened */
    this.opened = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    /** Stream that emits when share dialog is closed */
    this.closed = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this._el = _el.nativeElement;
  }
  /**
   * Share the link
   */
  share() {
    // Avoid SSR error
    if (this._platform.isBrowser && this.shareButton) {
      // Prepare sharer url params
      const params = this.autoSetMeta ? this.getParamsFromMetaTags() : this.getParamsFromInputs();
      // Prepare share button click
      const click = this.shareButton.share ? this.open(params) : this.shareButton.func({
        params,
        data: this.shareButton.data,
        clipboard: this._clipboard,
        updater: this._updater
      });
      click.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.takeUntil)(this._destroyed)).subscribe();
    } else {
      console.warn(`${this.text} button is not compatible on this Platform`);
    }
  }
  ngOnInit() {
    // This stream is mainly used to update the copy button text and icon when it is being clicked
    this._updater.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.tap)(data => {
      this.icon = data.icon;
      this.text = data.text;
      this._el.style.pointerEvents = data.disabled ? 'none' : 'auto';
      this._cd.markForCheck();
    }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.takeUntil)(this._destroyed)).subscribe();
  }
  ngOnChanges(changes) {
    // Avoid SSR error
    if (this._platform.isBrowser) {
      // Create share button
      if (this._shareButtonChanged(changes.shareButtonName)) {
        this._createShareButton();
      }
      // Prepare share url
      if (this._urlChanged(changes.url)) {
        this.url = getValidUrl(this.autoSetMeta ? this.url || this._getMetaTagContent('og:url') : this.url, this._document.defaultView.location.href);
      }
    }
  }
  ngOnDestroy() {
    this._destroyed.next();
    this._destroyed.complete();
  }
  _createShareButton() {
    const button = this._share.config.prop[this.shareButtonName];
    if (button) {
      // Set share button properties
      this.shareButton = button;
      // Remove previous button class
      this._el.classList.remove(`sb-${this._buttonClass}`);
      // Add new button class
      this._el.classList.add(`sb-${this.shareButtonName}`);
      // Set button css color variable
      this._el.style.setProperty('--button-color', this.shareButton.color);
      // Keep a copy of the class for future replacement
      this._buttonClass = this.shareButtonName;
      this.color = this.shareButton.color;
      this.text = this.shareButton.text;
      this.icon = this.shareButton.icon;
      // Set aria-label attribute
      this._el.setAttribute('aria-label', button.ariaLabel);
    } else {
      console.error(`[ShareButtons]: The share button '${this.shareButtonName}' does not exist!`);
    }
  }
  /**
   * Get meta tag content
   */
  _getMetaTagContent(key) {
    const metaUsingProperty = this._meta.getTag(`property="${key}"`);
    if (metaUsingProperty) {
      return metaUsingProperty.getAttribute('content');
    }
    const metaUsingName = this._meta.getTag(`name="${key}"`);
    if (metaUsingName) {
      return metaUsingName.getAttribute('content');
    }
  }
  _shareButtonChanged(change) {
    return change && (change.firstChange || change.previousValue !== change.currentValue);
  }
  _urlChanged(change) {
    return !this.url || change && change.previousValue !== change.currentValue;
  }
  /**
   * Get share params from meta tags first and fallback to user inputs
   */
  getParamsFromMetaTags() {
    return {
      url: this.url,
      title: this.title || this._getMetaTagContent('og:title'),
      description: this.description || this._getMetaTagContent('og:description'),
      image: this.image || this._getMetaTagContent('og:image'),
      via: this._share.config.twitterAccount,
      tags: this.tags,
      appId: this._share.config.appId || this._getMetaTagContent('fb:app_id'),
      redirectUrl: this.redirectUrl || this.url
    };
  }
  /**
   * Get share params from user inputs
   */
  getParamsFromInputs() {
    return {
      url: this.url,
      title: this.title,
      description: this.description,
      image: this.image,
      tags: this.tags,
      via: this._share.config.twitterAccount,
      appId: this._share.config.appId,
      redirectUrl: this.redirectUrl || this.url
    };
  }
  open(params) {
    // Set sharer link based on user's device
    let sharerLink;
    if (this._platform.IOS && this.shareButton.share.ios) {
      sharerLink = this.shareButton.share.ios;
    } else if (this._platform.ANDROID && this.shareButton.share.android) {
      sharerLink = this.shareButton.share.android;
    } else {
      sharerLink = this.shareButton.share.desktop;
    }
    if (sharerLink) {
      // Set sharer link params
      this._finalUrl = sharerLink + this._serializeParams(params);
      // Log the sharer link in debug mode
      if (this._share.config.debug) {
        console.log('[DEBUG SHARE BUTTON]: ', this._finalUrl);
      }
      // Open the share window
      // There are two methods available for opening the share window:
      // 1. Using a real anchor
      // 2. Using window.open
      const sharerMethod = this.shareButton.method || this._share.config.sharerMethod;
      const sharerTarget = this.shareButton.target || this._share.config.sharerTarget;
      switch (sharerMethod) {
        case SharerMethod.Anchor:
          const linkElement = this._document.createElement('a');
          // Make it open in a new tab/window (depends on user's browser configuration)
          linkElement.setAttribute('target', sharerTarget);
          // Prevent security vulnerability https://medium.com/@jitbit/target-blank-the-most-underestimated-vulnerability-ever-96e328301f4c
          linkElement.setAttribute('rel', 'noopener noreferrer');
          linkElement.href = this._finalUrl;
          linkElement.click();
          linkElement.remove();
          break;
        case SharerMethod.Window:
          // Open link using Window object
          const openWindow = this._share.config.windowObj[this._share.config.windowFuncName];
          const popUpWindow = openWindow(this._finalUrl, sharerTarget, this._share.windowSize);
          // Prevent security vulnerability https://medium.com/@jitbit/target-blank-the-most-underestimated-vulnerability-ever-96e328301f4c
          this._share.config.windowObj.opener = null;
          // Resolve when share dialog is closed
          if (popUpWindow) {
            return new rxjs__WEBPACK_IMPORTED_MODULE_1__.Observable(sub => {
              const pollTimer = this._document.defaultView.setInterval(() => {
                if (popUpWindow.closed) {
                  this._document.defaultView.clearInterval(pollTimer);
                  // Emit when share windows is closed
                  this.closed.emit(this.shareButtonName);
                  sub.next();
                  sub.complete();
                }
              }, 200);
            });
          }
          break;
      }
      // Emit when share window is opened
      this.opened.emit(this.shareButtonName);
    }
    return rxjs__WEBPACK_IMPORTED_MODULE_10__.EMPTY;
  }
  _serializeParams(params) {
    return Object.entries(this.shareButton.params).map(([key, value]) => {
      // Check if share button param has a map function
      const paramFunc = this.shareButton.paramsFunc ? this.shareButton.paramsFunc[key] : null;
      if (params[key] || paramFunc) {
        const paramValue = paramFunc ? paramFunc(params) : params[key];
        return `${value}=${encodeURIComponent(paramValue)}`;
      }
      return '';
    }).filter(urlParam => urlParam !== '').join('&');
  }
}
_class2 = ShareDirective;
_class2.ɵfac = function _class2_Factory(t) {
  return new (t || _class2)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_11__.Meta), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_12__.Platform), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_13__.Clipboard), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](ShareService), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_7__.DOCUMENT));
};
_class2.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
  type: _class2,
  selectors: [["", "shareButton", ""]],
  hostBindings: function _class2_HostBindings(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function _class2_click_HostBindingHandler() {
        return ctx.share();
      });
    }
  },
  inputs: {
    shareButtonName: ["shareButton", "shareButtonName"],
    autoSetMeta: "autoSetMeta",
    url: "url",
    title: "title",
    description: "description",
    image: "image",
    tags: "tags",
    redirectUrl: "redirectUrl"
  },
  outputs: {
    opened: "opened",
    closed: "closed"
  },
  exportAs: ["shareButton"],
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵNgOnChangesFeature"]]
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ShareDirective, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Directive,
    args: [{
      selector: '[shareButton]',
      exportAs: 'shareButton'
    }]
  }], function () {
    return [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef
    }, {
      type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_11__.Meta
    }, {
      type: _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_12__.Platform
    }, {
      type: _angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_13__.Clipboard
    }, {
      type: ShareService
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectorRef
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Inject,
        args: [_angular_common__WEBPACK_IMPORTED_MODULE_7__.DOCUMENT]
      }]
    }];
  }, {
    shareButtonName: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input,
      args: ['shareButton']
    }],
    autoSetMeta: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    url: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    title: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    description: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    image: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    tags: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    redirectUrl: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    opened: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Output
    }],
    closed: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Output
    }],
    share: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.HostListener,
      args: ['click']
    }]
  });
})();
class ShareModule {
  static withConfig(config) {
    return {
      ngModule: ShareModule,
      providers: [{
        provide: SHARE_BUTTONS_CONFIG,
        useValue: config
      }]
    };
  }
}
_class3 = ShareModule;
_class3.ɵfac = function _class3_Factory(t) {
  return new (t || _class3)();
};
_class3.ɵmod = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
  type: _class3
});
_class3.ɵinj = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
  imports: [_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_12__.PlatformModule, _angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_13__.ClipboardModule]
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ShareModule, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.NgModule,
    args: [{
      imports: [_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_12__.PlatformModule, _angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_13__.ClipboardModule],
      declarations: [ShareDirective],
      exports: [ShareDirective]
    }]
  }], null, null);
})();

/**
 * Generated bundle index. Do not edit.
 */



/***/ })

}]);
//# sourceMappingURL=src_app_modules_app-parent_app-parent_module_ts.a95d0b8087c495e7.js.map