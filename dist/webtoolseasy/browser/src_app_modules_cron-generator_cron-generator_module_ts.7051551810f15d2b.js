"use strict";
(self["webpackChunkwebtoolseasy"] = self["webpackChunkwebtoolseasy"] || []).push([["src_app_modules_cron-generator_cron-generator_module_ts"],{

/***/ 8644:
/*!*************************************************************************!*\
  !*** ./src/app/modules/cron-generator/cron-generator-routing.module.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CronGeneratorRoutingModule: () => (/* binding */ CronGeneratorRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 7947);
/* harmony import */ var _cron_generator_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cron-generator.component */ 7602);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 1699);
var _class;




const routes = [{
  path: '',
  component: _cron_generator_component__WEBPACK_IMPORTED_MODULE_0__.CronGeneratorComponent
}];
class CronGeneratorRoutingModule {}
_class = CronGeneratorRoutingModule;
_class.ɵfac = function CronGeneratorRoutingModule_Factory(t) {
  return new (t || _class)();
};
_class.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
  type: _class
});
_class.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](CronGeneratorRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
})();

/***/ }),

/***/ 7602:
/*!********************************************************************!*\
  !*** ./src/app/modules/cron-generator/cron-generator.component.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CronGeneratorComponent: () => (/* binding */ CronGeneratorComponent)
/* harmony export */ });
/* harmony import */ var src_environments_component_config_cron_generator_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/environments/component-config/cron-generator/config */ 59);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ 8849);
/* harmony import */ var src_app_service_util_logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/service/util/logger */ 4930);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/cdk/clipboard */ 4362);
/* harmony import */ var src_app_service_platform_metadata_platform_metadata_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/service/platform-metadata/platform-metadata.service */ 3242);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var ngx_cron_editor__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngx-cron-editor */ 5131);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/icon */ 6515);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/button */ 895);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/form-field */ 1333);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/select */ 6355);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/core */ 5309);
var _class;














const _c0 = ["cronEditor"];
function CronGeneratorComponent_cron_editor_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "cron-editor", 9, 10);
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("formControl", ctx_r0.cronForm)("options", ctx_r0.cronOptions);
  }
}
class CronGeneratorComponent {
  constructor(clipboard, platformMetaDataService) {
    this.clipboard = clipboard;
    this.platformMetaDataService = platformMetaDataService;
    this.cronExpression = '0 0 0 1 *';
    this.cronOptions = {
      defaultTime: '00:00:00',
      hideMinutesTab: false,
      hideHourlyTab: false,
      hideDailyTab: false,
      hideWeeklyTab: false,
      hideMonthlyTab: false,
      hideYearlyTab: false,
      hideAdvancedTab: true,
      hideSpecificWeekDayTab: false,
      hideSpecificMonthWeekTab: false,
      use24HourTime: true,
      hideSeconds: false,
      cronFlavor: 'standard' //standard or quartz
    };

    this.applicationConfig = src_environments_component_config_cron_generator_config__WEBPACK_IMPORTED_MODULE_0__.componentConfig;
    this.descriptionData = src_environments_component_config_cron_generator_config__WEBPACK_IMPORTED_MODULE_0__.descriptionData;
    this.cronForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormControl(this.cronExpression);
  }
  ngAfterViewInit() {
    if (this.platformMetaDataService.isPlatformBrowser) {
      this.cronEditor.registerOnChange(this.onCronChanged.bind(this));
      this.cronEditor.registerOnTouched(this.onCronEditorTouched.bind(this));
    }
  }
  onCronChanged(event) {
    this.cronExpression = event;
  }
  onCronEditorTouched() {
    src_app_service_util_logger__WEBPACK_IMPORTED_MODULE_1__.LogUtils.info('cron editor touched');
  }
  copyCronExpression() {
    this.clipboard.copy(this.cronExpression);
  }
  changeCronFlavor(event) {
    this.cronOptions.cronFlavor = event;
  }
}
_class = CronGeneratorComponent;
_class.ɵfac = function CronGeneratorComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_5__.Clipboard), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](src_app_service_platform_metadata_platform_metadata_service__WEBPACK_IMPORTED_MODULE_2__.PlatformMetadataService));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["app-cron-generator"]],
  viewQuery: function CronGeneratorComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵviewQuery"](_c0, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵloadQuery"]()) && (ctx.cronEditor = _t.first);
    }
  },
  decls: 17,
  vars: 2,
  consts: [[1, "flex-display", "flex-column-flow", "flex-align-center", "flex-gap-large"], [1, "flex-display", "flex-center", "flex-align-center", "flex-gap-medium"], [1, "cron-expression"], ["mat-stroked-button", "", "color", "accent", 3, "click"], ["class", "border-grey cron-editor", 3, "formControl", "options", 4, "ngIf"], ["appearance", "outline", "color", "primary", 2, "margin-bottom", "-1.25em"], ["disableRipple", "", "value", "standard", 3, "valueChange"], ["value", "quartz"], ["value", "standard"], [1, "border-grey", "cron-editor", 3, "formControl", "options"], ["cronEditor", ""]],
  template: function CronGeneratorComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "span", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "button", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function CronGeneratorComponent_Template_button_click_4_listener() {
        return ctx.copyCronExpression();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](5, "mat-icon");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](6, "content_copy");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](7, " Copy ");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](8, CronGeneratorComponent_cron_editor_8_Template, 2, 2, "cron-editor", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](9, "mat-form-field", 5)(10, "mat-label");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](11, "Cron Flavor");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](12, "mat-select", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("valueChange", function CronGeneratorComponent_Template_mat_select_valueChange_12_listener($event) {
        return ctx.changeCronFlavor($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](13, "mat-option", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](14, "Quartz");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](15, "mat-option", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](16, "Standard");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](ctx.cronExpression);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.platformMetaDataService.isPlatformBrowser);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.NgIf, ngx_cron_editor__WEBPACK_IMPORTED_MODULE_7__.CronGenComponent, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormControlDirective, _angular_material_icon__WEBPACK_IMPORTED_MODULE_8__.MatIcon, _angular_material_button__WEBPACK_IMPORTED_MODULE_9__.MatButton, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_10__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_10__.MatLabel, _angular_material_select__WEBPACK_IMPORTED_MODULE_11__.MatSelect, _angular_material_core__WEBPACK_IMPORTED_MODULE_12__.MatOption],
  styles: [".cron-editor[_ngcontent-%COMP%] {\n  padding: 10px;\n  border-radius: 10px;\n  max-width: 100%;\n}\n\n.cron-expression[_ngcontent-%COMP%] {\n  font-size: xx-large;\n}\n\n@media screen and (max-width: 735px) {\n  .cron-expression[_ngcontent-%COMP%] {\n    font-size: larger;\n  }\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvbW9kdWxlcy9jcm9uLWdlbmVyYXRvci9jcm9uLWdlbmVyYXRvci5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLGVBQUE7QUFDRjs7QUFFQTtFQUNFLG1CQUFBO0FBQ0Y7O0FBRUE7RUFDRTtJQUNFLGlCQUFBO0VBQ0Y7QUFDRiIsInNvdXJjZXNDb250ZW50IjpbIi5jcm9uLWVkaXRvciB7XG4gIHBhZGRpbmc6IDEwcHg7XG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gIG1heC13aWR0aDogMTAwJTtcbn1cblxuLmNyb24tZXhwcmVzc2lvbiB7XG4gIGZvbnQtc2l6ZTogeHgtbGFyZ2U7XG59XG5cbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDczNXB4KSB7XG4gIC5jcm9uLWV4cHJlc3Npb24ge1xuICAgIGZvbnQtc2l6ZTogbGFyZ2VyO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
});

/***/ }),

/***/ 9374:
/*!*****************************************************************!*\
  !*** ./src/app/modules/cron-generator/cron-generator.module.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CronGeneratorModule: () => (/* binding */ CronGeneratorModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _cron_generator_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cron-generator-routing.module */ 8644);
/* harmony import */ var ngx_cron_editor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-cron-editor */ 5131);
/* harmony import */ var _cron_generator_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cron-generator.component */ 7602);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 8849);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/button */ 895);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/icon */ 6515);
/* harmony import */ var _angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/cdk/clipboard */ 4362);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/select */ 6355);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 1699);
var _class;










class CronGeneratorModule {}
_class = CronGeneratorModule;
_class.ɵfac = function CronGeneratorModule_Factory(t) {
  return new (t || _class)();
};
_class.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
  type: _class
});
_class.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _cron_generator_routing_module__WEBPACK_IMPORTED_MODULE_0__.CronGeneratorRoutingModule, ngx_cron_editor__WEBPACK_IMPORTED_MODULE_4__.CronEditorModule, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.ReactiveFormsModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_6__.MatIconModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_7__.MatButtonModule, _angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_8__.ClipboardModule, _angular_material_select__WEBPACK_IMPORTED_MODULE_9__.MatSelectModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](CronGeneratorModule, {
    declarations: [_cron_generator_component__WEBPACK_IMPORTED_MODULE_1__.CronGeneratorComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _cron_generator_routing_module__WEBPACK_IMPORTED_MODULE_0__.CronGeneratorRoutingModule, ngx_cron_editor__WEBPACK_IMPORTED_MODULE_4__.CronEditorModule, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.ReactiveFormsModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_6__.MatIconModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_7__.MatButtonModule, _angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_8__.ClipboardModule, _angular_material_select__WEBPACK_IMPORTED_MODULE_9__.MatSelectModule]
  });
})();

/***/ }),

/***/ 59:
/*!********************************************************************!*\
  !*** ./src/environments/component-config/cron-generator/config.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   componentConfig: () => (/* binding */ componentConfig),
/* harmony export */   descriptionData: () => (/* binding */ descriptionData)
/* harmony export */ });
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/environments/environment */ 553);

const navigationUrl = '/tools/cron-expression';
const pageTitle = 'Online Cron Expression Generator: Create Cron Expressions';
const pageDescription = 'Generate cron expressions for your tasks with ease with our free online cron expression generator tool. Graphically generate cron expressions online.';
const imageUrl = `${src_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.screenshotsBaseUrl}/cron-expression.png`;
const keywords = 'online cron expression generator,generate cron expression,cron expression generator tool,cron expression,crontab,cron job,schedule task,Unix-like operating system,free cron expression generator,no download required,supports all cron expression fields,easy to use,customizable settings';
const componentConfig = {
  mainHeading: 'Free Online Cron Expression Generator: Easily Create Cron Expressions for Your Tasks',
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
  relatedTools: [],
  icons: []
};
const descriptionData = [{
  heading: 'What is a Cron Expression?',
  blockData: [`A cron expression is a string that represents a set of times at which a task will be executed. Cron expressions are used to schedule tasks on Unix-like operating systems.`]
}, {
  heading: 'Why Use a Cron Expression Generator?',
  listData: ['To save time and effort. Cron expression generators can save you a lot of time and effort by automatically generating cron expressions for you.', 'To avoid errors. Cron expression generators can help you to avoid errors in your cron expressions.', 'To learn more about cron expressions. Cron expression generators can help you to learn more about cron expressions by providing detailed information about each field in the expression.']
}, {
  heading: 'Features of Our Online Cron Expression Generator Tool',
  listData: ['Free to use. No need to pay or sign up for an account.', 'No download required. Generate cron expressions directly from your web browser.', 'Supports all cron expression fields. Our generator supports all cron expression fields, including second, minute, hour, day of month, month, and day of week.', 'Easy to use. Simply select the desired execution times for your task and our generator will generate the corresponding cron expression.', 'Customizable settings. You can customize the settings of our generator to match your personal preferences.']
}, {
  heading: 'How to Use Our Online Cron Expression Generator Tool',
  listData: ['Go to our website and select the desired execution times for your task.', 'Click the "Generate Cron Expression" button.', 'View your generated cron expression in the sidebar.', 'Copy and paste your generated cron expression into your crontab file.']
}, {
  heading: 'Tips for Using a Cron Expression Generator',
  listData: ['Use a consistent cron expression format. There are multiple cron expression formats in use. Choose a format and use it consistently throughout your project. This will make it easier to read and understand your cron expressions.', 'Test your cron expressions before using them in production. Once you have generated a cron expression, be sure to test it before using it in production. This will help you to identify and fix any problems with the expression.', 'Use comments to document your cron expressions. Adding comments to your cron expressions can help you to understand and maintain your crontab file.']
}, {
  heading: 'Examples of Cron Expression',
  listData: [`* * * * * : Runs a job every minute, every hour, every day, every month, and every day of the week.`, `0 0 * * * : Runs a job at midnight (00:00) every day.`, `0 * * * * : Runs a job at the start of every hour.`, `*/15 * * * * : Runs a job every 15 minutes.`, `0 2 * * * : Runs a job at 2:00 AM every day.`, `0 0 * * 5 : Runs a job at midnight (00:00) every Friday.`, `0 0 1 * * : Runs a job at midnight (00:00) on the first day of every month.`, `0 0 * * 1 : Runs a job at midnight (00:00) every Monday.`, `0 0 * * 0 : Runs a job at midnight (00:00) every Sunday (0 or 7 can represent Sunday).`, `0 2 * * 1,3,5 : Runs a job at 2:00 AM every Monday, Wednesday, and Friday.`, `0 0 1,15 * * : Runs a job at midnight (00:00) on the 1st and 15th day of every month.`, `*/2 * * * * : Runs a job every 2 minutes.`, `0 */3 * * * : Runs a job every 3 hours.`, `15-30 * * * * : Runs a job every minute from the 15th to the 30th minute of each hour.`, `0 1,3,5 * * * : Runs a job at 1:00 AM, 3:00 AM, and 5:00 AM every day.`, `0 0 L * * : Runs a job at midnight (00:00) on the last day of every month.`, `0 0 * * 1-5 : Runs a job at midnight (00:00) from Monday to Friday (business days).`, `0 0 * * 6,7 : Runs a job at midnight (00:00) on Saturday and Sunday (weekends).`]
}, {
  blockData: ['Our free online cron expression generator tool is a great way to easily create cron expressions for your tasks. It is easy to use and supports all cron expression fields. With our generator, you can save time and effort, avoid errors, and learn more about cron expressions.']
}];

/***/ }),

/***/ 9400:
/*!*************************************************************!*\
  !*** ./node_modules/@angular/material/fesm2022/divider.mjs ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MatDivider: () => (/* binding */ MatDivider),
/* harmony export */   MatDividerModule: () => (/* binding */ MatDividerModule)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/cdk/coercion */ 5998);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/core */ 5309);
var _class, _class2;




class MatDivider {
  constructor() {
    this._vertical = false;
    this._inset = false;
  }
  /** Whether the divider is vertically aligned. */
  get vertical() {
    return this._vertical;
  }
  set vertical(value) {
    this._vertical = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_0__.coerceBooleanProperty)(value);
  }
  /** Whether the divider is an inset divider. */
  get inset() {
    return this._inset;
  }
  set inset(value) {
    this._inset = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_0__.coerceBooleanProperty)(value);
  }
}
_class = MatDivider;
_class.ɵfac = function _class_Factory(t) {
  return new (t || _class)();
};
_class.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["mat-divider"]],
  hostAttrs: ["role", "separator", 1, "mat-divider"],
  hostVars: 7,
  hostBindings: function _class_HostBindings(rf, ctx) {
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵattribute"]("aria-orientation", ctx.vertical ? "vertical" : "horizontal");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassProp"]("mat-divider-vertical", ctx.vertical)("mat-divider-horizontal", !ctx.vertical)("mat-divider-inset", ctx.inset);
    }
  },
  inputs: {
    vertical: "vertical",
    inset: "inset"
  },
  decls: 0,
  vars: 0,
  template: function _class_Template(rf, ctx) {},
  styles: [".mat-divider{--mat-divider-width:1px;display:block;margin:0;border-top-style:solid;border-top-color:var(--mat-divider-color);border-top-width:var(--mat-divider-width)}.mat-divider.mat-divider-vertical{border-top:0;border-right-style:solid;border-right-color:var(--mat-divider-color);border-right-width:var(--mat-divider-width)}.mat-divider.mat-divider-inset{margin-left:80px}[dir=rtl] .mat-divider.mat-divider-inset{margin-left:auto;margin-right:80px}"],
  encapsulation: 2,
  changeDetection: 0
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](MatDivider, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Component,
    args: [{
      selector: 'mat-divider',
      host: {
        'role': 'separator',
        '[attr.aria-orientation]': 'vertical ? "vertical" : "horizontal"',
        '[class.mat-divider-vertical]': 'vertical',
        '[class.mat-divider-horizontal]': '!vertical',
        '[class.mat-divider-inset]': 'inset',
        'class': 'mat-divider'
      },
      template: '',
      encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_1__.ViewEncapsulation.None,
      changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_1__.ChangeDetectionStrategy.OnPush,
      styles: [".mat-divider{--mat-divider-width:1px;display:block;margin:0;border-top-style:solid;border-top-color:var(--mat-divider-color);border-top-width:var(--mat-divider-width)}.mat-divider.mat-divider-vertical{border-top:0;border-right-style:solid;border-right-color:var(--mat-divider-color);border-right-width:var(--mat-divider-width)}.mat-divider.mat-divider-inset{margin-left:80px}[dir=rtl] .mat-divider.mat-divider-inset{margin-left:auto;margin-right:80px}"]
    }]
  }], null, {
    vertical: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    inset: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }]
  });
})();
class MatDividerModule {}
_class2 = MatDividerModule;
_class2.ɵfac = function _class2_Factory(t) {
  return new (t || _class2)();
};
_class2.ɵmod = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
  type: _class2
});
_class2.ɵinj = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
  imports: [_angular_material_core__WEBPACK_IMPORTED_MODULE_2__.MatCommonModule, _angular_material_core__WEBPACK_IMPORTED_MODULE_2__.MatCommonModule]
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](MatDividerModule, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.NgModule,
    args: [{
      imports: [_angular_material_core__WEBPACK_IMPORTED_MODULE_2__.MatCommonModule],
      exports: [MatDivider, _angular_material_core__WEBPACK_IMPORTED_MODULE_2__.MatCommonModule],
      declarations: [MatDivider]
    }]
  }], null, null);
})();

/**
 * Generated bundle index. Do not edit.
 */



/***/ }),

/***/ 647:
/*!***************************************************************!*\
  !*** ./node_modules/@angular/material/fesm2022/grid-list.mjs ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MatGridAvatarCssMatStyler: () => (/* binding */ MatGridAvatarCssMatStyler),
/* harmony export */   MatGridList: () => (/* binding */ MatGridList),
/* harmony export */   MatGridListModule: () => (/* binding */ MatGridListModule),
/* harmony export */   MatGridTile: () => (/* binding */ MatGridTile),
/* harmony export */   MatGridTileFooterCssMatStyler: () => (/* binding */ MatGridTileFooterCssMatStyler),
/* harmony export */   MatGridTileHeaderCssMatStyler: () => (/* binding */ MatGridTileHeaderCssMatStyler),
/* harmony export */   MatGridTileText: () => (/* binding */ MatGridTileText),
/* harmony export */   "ɵTileCoordinator": () => (/* binding */ ɵTileCoordinator)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/core */ 5309);
/* harmony import */ var _angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/cdk/coercion */ 5998);
/* harmony import */ var _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/cdk/bidi */ 4565);
var _class, _class2, _class3, _class4, _class5, _class6, _class7;






/**
 * Class for determining, from a list of tiles, the (row, col) position of each of those tiles
 * in the grid. This is necessary (rather than just rendering the tiles in normal document flow)
 * because the tiles can have a rowspan.
 *
 * The positioning algorithm greedily places each tile as soon as it encounters a gap in the grid
 * large enough to accommodate it so that the tiles still render in the same order in which they
 * are given.
 *
 * The basis of the algorithm is the use of an array to track the already placed tiles. Each
 * element of the array corresponds to a column, and the value indicates how many cells in that
 * column are already occupied; zero indicates an empty cell. Moving "down" to the next row
 * decrements each value in the tracking array (indicating that the column is one cell closer to
 * being free).
 *
 * @docs-private
 */
const _c0 = ["*"];
const _c1 = [[["", "mat-grid-avatar", ""], ["", "matGridAvatar", ""]], [["", "mat-line", ""], ["", "matLine", ""]], "*"];
const _c2 = ["[mat-grid-avatar], [matGridAvatar]", "[mat-line], [matLine]", "*"];
const _c3 = ".mat-grid-list{display:block;position:relative}.mat-grid-tile{display:block;position:absolute;overflow:hidden}.mat-grid-tile .mat-grid-tile-header,.mat-grid-tile .mat-grid-tile-footer{display:flex;align-items:center;height:48px;color:#fff;background:rgba(0,0,0,.38);overflow:hidden;padding:0 16px;position:absolute;left:0;right:0}.mat-grid-tile .mat-grid-tile-header>*,.mat-grid-tile .mat-grid-tile-footer>*{margin:0;padding:0;font-weight:normal;font-size:inherit}.mat-grid-tile .mat-grid-tile-header.mat-2-line,.mat-grid-tile .mat-grid-tile-footer.mat-2-line{height:68px}.mat-grid-tile .mat-grid-list-text{display:flex;flex-direction:column;flex:auto;box-sizing:border-box;overflow:hidden}.mat-grid-tile .mat-grid-list-text>*{margin:0;padding:0;font-weight:normal;font-size:inherit}.mat-grid-tile .mat-grid-list-text:empty{display:none}.mat-grid-tile .mat-grid-tile-header{top:0}.mat-grid-tile .mat-grid-tile-footer{bottom:0}.mat-grid-tile .mat-grid-avatar{padding-right:16px}[dir=rtl] .mat-grid-tile .mat-grid-avatar{padding-right:0;padding-left:16px}.mat-grid-tile .mat-grid-avatar:empty{display:none}.mat-grid-tile-header{font-size:var(--mat-grid-list-tile-header-primary-text-size)}.mat-grid-tile-header .mat-line{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;box-sizing:border-box}.mat-grid-tile-header .mat-line:nth-child(n+2){font-size:var(--mat-grid-list-tile-header-secondary-text-size)}.mat-grid-tile-footer{font-size:var(--mat-grid-list-tile-footer-primary-text-size)}.mat-grid-tile-footer .mat-line{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;box-sizing:border-box}.mat-grid-tile-footer .mat-line:nth-child(n+2){font-size:var(--mat-grid-list-tile-footer-secondary-text-size)}.mat-grid-tile-content{top:0;left:0;right:0;bottom:0;position:absolute;display:flex;align-items:center;justify-content:center;height:100%;padding:0;margin:0}";
class TileCoordinator {
  constructor() {
    /** Index at which the search for the next gap will start. */
    this.columnIndex = 0;
    /** The current row index. */
    this.rowIndex = 0;
  }
  /** Gets the total number of rows occupied by tiles */
  get rowCount() {
    return this.rowIndex + 1;
  }
  /**
   * Gets the total span of rows occupied by tiles.
   * Ex: A list with 1 row that contains a tile with rowspan 2 will have a total rowspan of 2.
   */
  get rowspan() {
    const lastRowMax = Math.max(...this.tracker);
    // if any of the tiles has a rowspan that pushes it beyond the total row count,
    // add the difference to the rowcount
    return lastRowMax > 1 ? this.rowCount + lastRowMax - 1 : this.rowCount;
  }
  /**
   * Updates the tile positions.
   * @param numColumns Amount of columns in the grid.
   * @param tiles Tiles to be positioned.
   */
  update(numColumns, tiles) {
    this.columnIndex = 0;
    this.rowIndex = 0;
    this.tracker = new Array(numColumns);
    this.tracker.fill(0, 0, this.tracker.length);
    this.positions = tiles.map(tile => this._trackTile(tile));
  }
  /** Calculates the row and col position of a tile. */
  _trackTile(tile) {
    // Find a gap large enough for this tile.
    const gapStartIndex = this._findMatchingGap(tile.colspan);
    // Place tile in the resulting gap.
    this._markTilePosition(gapStartIndex, tile);
    // The next time we look for a gap, the search will start at columnIndex, which should be
    // immediately after the tile that has just been placed.
    this.columnIndex = gapStartIndex + tile.colspan;
    return new TilePosition(this.rowIndex, gapStartIndex);
  }
  /** Finds the next available space large enough to fit the tile. */
  _findMatchingGap(tileCols) {
    if (tileCols > this.tracker.length && (typeof ngDevMode === 'undefined' || ngDevMode)) {
      throw Error(`mat-grid-list: tile with colspan ${tileCols} is wider than ` + `grid with cols="${this.tracker.length}".`);
    }
    // Start index is inclusive, end index is exclusive.
    let gapStartIndex = -1;
    let gapEndIndex = -1;
    // Look for a gap large enough to fit the given tile. Empty spaces are marked with a zero.
    do {
      // If we've reached the end of the row, go to the next row.
      if (this.columnIndex + tileCols > this.tracker.length) {
        this._nextRow();
        gapStartIndex = this.tracker.indexOf(0, this.columnIndex);
        gapEndIndex = this._findGapEndIndex(gapStartIndex);
        continue;
      }
      gapStartIndex = this.tracker.indexOf(0, this.columnIndex);
      // If there are no more empty spaces in this row at all, move on to the next row.
      if (gapStartIndex == -1) {
        this._nextRow();
        gapStartIndex = this.tracker.indexOf(0, this.columnIndex);
        gapEndIndex = this._findGapEndIndex(gapStartIndex);
        continue;
      }
      gapEndIndex = this._findGapEndIndex(gapStartIndex);
      // If a gap large enough isn't found, we want to start looking immediately after the current
      // gap on the next iteration.
      this.columnIndex = gapStartIndex + 1;
      // Continue iterating until we find a gap wide enough for this tile. Since gapEndIndex is
      // exclusive, gapEndIndex is 0 means we didn't find a gap and should continue.
    } while (gapEndIndex - gapStartIndex < tileCols || gapEndIndex == 0);
    // If we still didn't manage to find a gap, ensure that the index is
    // at least zero so the tile doesn't get pulled out of the grid.
    return Math.max(gapStartIndex, 0);
  }
  /** Move "down" to the next row. */
  _nextRow() {
    this.columnIndex = 0;
    this.rowIndex++;
    // Decrement all spaces by one to reflect moving down one row.
    for (let i = 0; i < this.tracker.length; i++) {
      this.tracker[i] = Math.max(0, this.tracker[i] - 1);
    }
  }
  /**
   * Finds the end index (exclusive) of a gap given the index from which to start looking.
   * The gap ends when a non-zero value is found.
   */
  _findGapEndIndex(gapStartIndex) {
    for (let i = gapStartIndex + 1; i < this.tracker.length; i++) {
      if (this.tracker[i] != 0) {
        return i;
      }
    }
    // The gap ends with the end of the row.
    return this.tracker.length;
  }
  /** Update the tile tracker to account for the given tile in the given space. */
  _markTilePosition(start, tile) {
    for (let i = 0; i < tile.colspan; i++) {
      this.tracker[start + i] = tile.rowspan;
    }
  }
}
/**
 * Simple data structure for tile position (row, col).
 * @docs-private
 */
class TilePosition {
  constructor(row, col) {
    this.row = row;
    this.col = col;
  }
}

/**
 * Injection token used to provide a grid list to a tile and to avoid circular imports.
 * @docs-private
 */
const MAT_GRID_LIST = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken('MAT_GRID_LIST');
class MatGridTile {
  constructor(_element, _gridList) {
    this._element = _element;
    this._gridList = _gridList;
    this._rowspan = 1;
    this._colspan = 1;
  }
  /** Amount of rows that the grid tile takes up. */
  get rowspan() {
    return this._rowspan;
  }
  set rowspan(value) {
    this._rowspan = Math.round((0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_1__.coerceNumberProperty)(value));
  }
  /** Amount of columns that the grid tile takes up. */
  get colspan() {
    return this._colspan;
  }
  set colspan(value) {
    this._colspan = Math.round((0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_1__.coerceNumberProperty)(value));
  }
  /**
   * Sets the style of the grid-tile element.  Needs to be set manually to avoid
   * "Changed after checked" errors that would occur with HostBinding.
   */
  _setStyle(property, value) {
    this._element.nativeElement.style[property] = value;
  }
}
_class = MatGridTile;
_class.ɵfac = function _class_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](MAT_GRID_LIST, 8));
};
_class.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["mat-grid-tile"]],
  hostAttrs: [1, "mat-grid-tile"],
  hostVars: 2,
  hostBindings: function _class_HostBindings(rf, ctx) {
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattribute"]("rowspan", ctx.rowspan)("colspan", ctx.colspan);
    }
  },
  inputs: {
    rowspan: "rowspan",
    colspan: "colspan"
  },
  exportAs: ["matGridTile"],
  ngContentSelectors: _c0,
  decls: 2,
  vars: 0,
  consts: [[1, "mat-grid-tile-content"]],
  template: function _class_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojectionDef"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    }
  },
  styles: [".mat-grid-list{display:block;position:relative}.mat-grid-tile{display:block;position:absolute;overflow:hidden}.mat-grid-tile .mat-grid-tile-header,.mat-grid-tile .mat-grid-tile-footer{display:flex;align-items:center;height:48px;color:#fff;background:rgba(0,0,0,.38);overflow:hidden;padding:0 16px;position:absolute;left:0;right:0}.mat-grid-tile .mat-grid-tile-header>*,.mat-grid-tile .mat-grid-tile-footer>*{margin:0;padding:0;font-weight:normal;font-size:inherit}.mat-grid-tile .mat-grid-tile-header.mat-2-line,.mat-grid-tile .mat-grid-tile-footer.mat-2-line{height:68px}.mat-grid-tile .mat-grid-list-text{display:flex;flex-direction:column;flex:auto;box-sizing:border-box;overflow:hidden}.mat-grid-tile .mat-grid-list-text>*{margin:0;padding:0;font-weight:normal;font-size:inherit}.mat-grid-tile .mat-grid-list-text:empty{display:none}.mat-grid-tile .mat-grid-tile-header{top:0}.mat-grid-tile .mat-grid-tile-footer{bottom:0}.mat-grid-tile .mat-grid-avatar{padding-right:16px}[dir=rtl] .mat-grid-tile .mat-grid-avatar{padding-right:0;padding-left:16px}.mat-grid-tile .mat-grid-avatar:empty{display:none}.mat-grid-tile-header{font-size:var(--mat-grid-list-tile-header-primary-text-size)}.mat-grid-tile-header .mat-line{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;box-sizing:border-box}.mat-grid-tile-header .mat-line:nth-child(n+2){font-size:var(--mat-grid-list-tile-header-secondary-text-size)}.mat-grid-tile-footer{font-size:var(--mat-grid-list-tile-footer-primary-text-size)}.mat-grid-tile-footer .mat-line{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;box-sizing:border-box}.mat-grid-tile-footer .mat-line:nth-child(n+2){font-size:var(--mat-grid-list-tile-footer-secondary-text-size)}.mat-grid-tile-content{top:0;left:0;right:0;bottom:0;position:absolute;display:flex;align-items:center;justify-content:center;height:100%;padding:0;margin:0}"],
  encapsulation: 2,
  changeDetection: 0
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MatGridTile, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Component,
    args: [{
      selector: 'mat-grid-tile',
      exportAs: 'matGridTile',
      host: {
        'class': 'mat-grid-tile',
        // Ensures that the "rowspan" and "colspan" input value is reflected in
        // the DOM. This is needed for the grid-tile harness.
        '[attr.rowspan]': 'rowspan',
        '[attr.colspan]': 'colspan'
      },
      encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewEncapsulation.None,
      changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectionStrategy.OnPush,
      template: "<div class=\"mat-grid-tile-content\">\n  <ng-content></ng-content>\n</div>\n",
      styles: [".mat-grid-list{display:block;position:relative}.mat-grid-tile{display:block;position:absolute;overflow:hidden}.mat-grid-tile .mat-grid-tile-header,.mat-grid-tile .mat-grid-tile-footer{display:flex;align-items:center;height:48px;color:#fff;background:rgba(0,0,0,.38);overflow:hidden;padding:0 16px;position:absolute;left:0;right:0}.mat-grid-tile .mat-grid-tile-header>*,.mat-grid-tile .mat-grid-tile-footer>*{margin:0;padding:0;font-weight:normal;font-size:inherit}.mat-grid-tile .mat-grid-tile-header.mat-2-line,.mat-grid-tile .mat-grid-tile-footer.mat-2-line{height:68px}.mat-grid-tile .mat-grid-list-text{display:flex;flex-direction:column;flex:auto;box-sizing:border-box;overflow:hidden}.mat-grid-tile .mat-grid-list-text>*{margin:0;padding:0;font-weight:normal;font-size:inherit}.mat-grid-tile .mat-grid-list-text:empty{display:none}.mat-grid-tile .mat-grid-tile-header{top:0}.mat-grid-tile .mat-grid-tile-footer{bottom:0}.mat-grid-tile .mat-grid-avatar{padding-right:16px}[dir=rtl] .mat-grid-tile .mat-grid-avatar{padding-right:0;padding-left:16px}.mat-grid-tile .mat-grid-avatar:empty{display:none}.mat-grid-tile-header{font-size:var(--mat-grid-list-tile-header-primary-text-size)}.mat-grid-tile-header .mat-line{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;box-sizing:border-box}.mat-grid-tile-header .mat-line:nth-child(n+2){font-size:var(--mat-grid-list-tile-header-secondary-text-size)}.mat-grid-tile-footer{font-size:var(--mat-grid-list-tile-footer-primary-text-size)}.mat-grid-tile-footer .mat-line{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;box-sizing:border-box}.mat-grid-tile-footer .mat-line:nth-child(n+2){font-size:var(--mat-grid-list-tile-footer-secondary-text-size)}.mat-grid-tile-content{top:0;left:0;right:0;bottom:0;position:absolute;display:flex;align-items:center;justify-content:center;height:100%;padding:0;margin:0}"]
    }]
  }], function () {
    return [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Inject,
        args: [MAT_GRID_LIST]
      }]
    }];
  }, {
    rowspan: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    colspan: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }]
  });
})();
class MatGridTileText {
  constructor(_element) {
    this._element = _element;
  }
  ngAfterContentInit() {
    (0,_angular_material_core__WEBPACK_IMPORTED_MODULE_2__.setLines)(this._lines, this._element);
  }
}
_class2 = MatGridTileText;
_class2.ɵfac = function _class2_Factory(t) {
  return new (t || _class2)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef));
};
_class2.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: _class2,
  selectors: [["mat-grid-tile-header"], ["mat-grid-tile-footer"]],
  contentQueries: function _class2_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵcontentQuery"](dirIndex, _angular_material_core__WEBPACK_IMPORTED_MODULE_2__.MatLine, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx._lines = _t);
    }
  },
  ngContentSelectors: _c2,
  decls: 4,
  vars: 0,
  consts: [[1, "mat-grid-list-text"]],
  template: function _class2_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojectionDef"](_c1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](2, 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](3, 2);
    }
  },
  encapsulation: 2,
  changeDetection: 0
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MatGridTileText, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Component,
    args: [{
      selector: 'mat-grid-tile-header, mat-grid-tile-footer',
      changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectionStrategy.OnPush,
      encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewEncapsulation.None,
      template: "<ng-content select=\"[mat-grid-avatar], [matGridAvatar]\"></ng-content>\n<div class=\"mat-grid-list-text\"><ng-content select=\"[mat-line], [matLine]\"></ng-content></div>\n<ng-content></ng-content>\n"
    }]
  }], function () {
    return [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef
    }];
  }, {
    _lines: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ContentChildren,
      args: [_angular_material_core__WEBPACK_IMPORTED_MODULE_2__.MatLine, {
        descendants: true
      }]
    }]
  });
})();
/**
 * Directive whose purpose is to add the mat- CSS styling to this selector.
 * @docs-private
 */
class MatGridAvatarCssMatStyler {}
_class3 = MatGridAvatarCssMatStyler;
_class3.ɵfac = function _class3_Factory(t) {
  return new (t || _class3)();
};
_class3.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
  type: _class3,
  selectors: [["", "mat-grid-avatar", ""], ["", "matGridAvatar", ""]],
  hostAttrs: [1, "mat-grid-avatar"]
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MatGridAvatarCssMatStyler, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Directive,
    args: [{
      selector: '[mat-grid-avatar], [matGridAvatar]',
      host: {
        'class': 'mat-grid-avatar'
      }
    }]
  }], null, null);
})();
/**
 * Directive whose purpose is to add the mat- CSS styling to this selector.
 * @docs-private
 */
class MatGridTileHeaderCssMatStyler {}
_class4 = MatGridTileHeaderCssMatStyler;
_class4.ɵfac = function _class4_Factory(t) {
  return new (t || _class4)();
};
_class4.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
  type: _class4,
  selectors: [["mat-grid-tile-header"]],
  hostAttrs: [1, "mat-grid-tile-header"]
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MatGridTileHeaderCssMatStyler, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Directive,
    args: [{
      selector: 'mat-grid-tile-header',
      host: {
        'class': 'mat-grid-tile-header'
      }
    }]
  }], null, null);
})();
/**
 * Directive whose purpose is to add the mat- CSS styling to this selector.
 * @docs-private
 */
class MatGridTileFooterCssMatStyler {}
_class5 = MatGridTileFooterCssMatStyler;
_class5.ɵfac = function _class5_Factory(t) {
  return new (t || _class5)();
};
_class5.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
  type: _class5,
  selectors: [["mat-grid-tile-footer"]],
  hostAttrs: [1, "mat-grid-tile-footer"]
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MatGridTileFooterCssMatStyler, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Directive,
    args: [{
      selector: 'mat-grid-tile-footer',
      host: {
        'class': 'mat-grid-tile-footer'
      }
    }]
  }], null, null);
})();

/**
 * RegExp that can be used to check whether a value will
 * be allowed inside a CSS `calc()` expression.
 */
const cssCalcAllowedValue = /^-?\d+((\.\d+)?[A-Za-z%$]?)+$/;
/**
 * Sets the style properties for an individual tile, given the position calculated by the
 * Tile Coordinator.
 * @docs-private
 */
class TileStyler {
  constructor() {
    this._rows = 0;
    this._rowspan = 0;
  }
  /**
   * Adds grid-list layout info once it is available. Cannot be processed in the constructor
   * because these properties haven't been calculated by that point.
   *
   * @param gutterSize Size of the grid's gutter.
   * @param tracker Instance of the TileCoordinator.
   * @param cols Amount of columns in the grid.
   * @param direction Layout direction of the grid.
   */
  init(gutterSize, tracker, cols, direction) {
    this._gutterSize = normalizeUnits(gutterSize);
    this._rows = tracker.rowCount;
    this._rowspan = tracker.rowspan;
    this._cols = cols;
    this._direction = direction;
  }
  /**
   * Computes the amount of space a single 1x1 tile would take up (width or height).
   * Used as a basis for other calculations.
   * @param sizePercent Percent of the total grid-list space that one 1x1 tile would take up.
   * @param gutterFraction Fraction of the gutter size taken up by one 1x1 tile.
   * @return The size of a 1x1 tile as an expression that can be evaluated via CSS calc().
   */
  getBaseTileSize(sizePercent, gutterFraction) {
    // Take the base size percent (as would be if evenly dividing the size between cells),
    // and then subtracting the size of one gutter. However, since there are no gutters on the
    // edges, each tile only uses a fraction (gutterShare = numGutters / numCells) of the gutter
    // size. (Imagine having one gutter per tile, and then breaking up the extra gutter on the
    // edge evenly among the cells).
    return `(${sizePercent}% - (${this._gutterSize} * ${gutterFraction}))`;
  }
  /**
   * Gets The horizontal or vertical position of a tile, e.g., the 'top' or 'left' property value.
   * @param offset Number of tiles that have already been rendered in the row/column.
   * @param baseSize Base size of a 1x1 tile (as computed in getBaseTileSize).
   * @return Position of the tile as a CSS calc() expression.
   */
  getTilePosition(baseSize, offset) {
    // The position comes the size of a 1x1 tile plus gutter for each previous tile in the
    // row/column (offset).
    return offset === 0 ? '0' : calc(`(${baseSize} + ${this._gutterSize}) * ${offset}`);
  }
  /**
   * Gets the actual size of a tile, e.g., width or height, taking rowspan or colspan into account.
   * @param baseSize Base size of a 1x1 tile (as computed in getBaseTileSize).
   * @param span The tile's rowspan or colspan.
   * @return Size of the tile as a CSS calc() expression.
   */
  getTileSize(baseSize, span) {
    return `(${baseSize} * ${span}) + (${span - 1} * ${this._gutterSize})`;
  }
  /**
   * Sets the style properties to be applied to a tile for the given row and column index.
   * @param tile Tile to which to apply the styling.
   * @param rowIndex Index of the tile's row.
   * @param colIndex Index of the tile's column.
   */
  setStyle(tile, rowIndex, colIndex) {
    // Percent of the available horizontal space that one column takes up.
    let percentWidthPerTile = 100 / this._cols;
    // Fraction of the vertical gutter size that each column takes up.
    // For example, if there are 5 columns, each column uses 4/5 = 0.8 times the gutter width.
    let gutterWidthFractionPerTile = (this._cols - 1) / this._cols;
    this.setColStyles(tile, colIndex, percentWidthPerTile, gutterWidthFractionPerTile);
    this.setRowStyles(tile, rowIndex, percentWidthPerTile, gutterWidthFractionPerTile);
  }
  /** Sets the horizontal placement of the tile in the list. */
  setColStyles(tile, colIndex, percentWidth, gutterWidth) {
    // Base horizontal size of a column.
    let baseTileWidth = this.getBaseTileSize(percentWidth, gutterWidth);
    // The width and horizontal position of each tile is always calculated the same way, but the
    // height and vertical position depends on the rowMode.
    let side = this._direction === 'rtl' ? 'right' : 'left';
    tile._setStyle(side, this.getTilePosition(baseTileWidth, colIndex));
    tile._setStyle('width', calc(this.getTileSize(baseTileWidth, tile.colspan)));
  }
  /**
   * Calculates the total size taken up by gutters across one axis of a list.
   */
  getGutterSpan() {
    return `${this._gutterSize} * (${this._rowspan} - 1)`;
  }
  /**
   * Calculates the total size taken up by tiles across one axis of a list.
   * @param tileHeight Height of the tile.
   */
  getTileSpan(tileHeight) {
    return `${this._rowspan} * ${this.getTileSize(tileHeight, 1)}`;
  }
  /**
   * Calculates the computed height and returns the correct style property to set.
   * This method can be implemented by each type of TileStyler.
   * @docs-private
   */
  getComputedHeight() {
    return null;
  }
}
/**
 * This type of styler is instantiated when the user passes in a fixed row height.
 * Example `<mat-grid-list cols="3" rowHeight="100px">`
 * @docs-private
 */
class FixedTileStyler extends TileStyler {
  constructor(fixedRowHeight) {
    super();
    this.fixedRowHeight = fixedRowHeight;
  }
  init(gutterSize, tracker, cols, direction) {
    super.init(gutterSize, tracker, cols, direction);
    this.fixedRowHeight = normalizeUnits(this.fixedRowHeight);
    if (!cssCalcAllowedValue.test(this.fixedRowHeight) && (typeof ngDevMode === 'undefined' || ngDevMode)) {
      throw Error(`Invalid value "${this.fixedRowHeight}" set as rowHeight.`);
    }
  }
  setRowStyles(tile, rowIndex) {
    tile._setStyle('top', this.getTilePosition(this.fixedRowHeight, rowIndex));
    tile._setStyle('height', calc(this.getTileSize(this.fixedRowHeight, tile.rowspan)));
  }
  getComputedHeight() {
    return ['height', calc(`${this.getTileSpan(this.fixedRowHeight)} + ${this.getGutterSpan()}`)];
  }
  reset(list) {
    list._setListStyle(['height', null]);
    if (list._tiles) {
      list._tiles.forEach(tile => {
        tile._setStyle('top', null);
        tile._setStyle('height', null);
      });
    }
  }
}
/**
 * This type of styler is instantiated when the user passes in a width:height ratio
 * for the row height.  Example `<mat-grid-list cols="3" rowHeight="3:1">`
 * @docs-private
 */
class RatioTileStyler extends TileStyler {
  constructor(value) {
    super();
    this._parseRatio(value);
  }
  setRowStyles(tile, rowIndex, percentWidth, gutterWidth) {
    let percentHeightPerTile = percentWidth / this.rowHeightRatio;
    this.baseTileHeight = this.getBaseTileSize(percentHeightPerTile, gutterWidth);
    // Use padding-top and margin-top to maintain the given aspect ratio, as
    // a percentage-based value for these properties is applied versus the *width* of the
    // containing block. See http://www.w3.org/TR/CSS2/box.html#margin-properties
    tile._setStyle('marginTop', this.getTilePosition(this.baseTileHeight, rowIndex));
    tile._setStyle('paddingTop', calc(this.getTileSize(this.baseTileHeight, tile.rowspan)));
  }
  getComputedHeight() {
    return ['paddingBottom', calc(`${this.getTileSpan(this.baseTileHeight)} + ${this.getGutterSpan()}`)];
  }
  reset(list) {
    list._setListStyle(['paddingBottom', null]);
    list._tiles.forEach(tile => {
      tile._setStyle('marginTop', null);
      tile._setStyle('paddingTop', null);
    });
  }
  _parseRatio(value) {
    const ratioParts = value.split(':');
    if (ratioParts.length !== 2 && (typeof ngDevMode === 'undefined' || ngDevMode)) {
      throw Error(`mat-grid-list: invalid ratio given for row-height: "${value}"`);
    }
    this.rowHeightRatio = parseFloat(ratioParts[0]) / parseFloat(ratioParts[1]);
  }
}
/**
 * This type of styler is instantiated when the user selects a "fit" row height mode.
 * In other words, the row height will reflect the total height of the container divided
 * by the number of rows.  Example `<mat-grid-list cols="3" rowHeight="fit">`
 *
 * @docs-private
 */
class FitTileStyler extends TileStyler {
  setRowStyles(tile, rowIndex) {
    // Percent of the available vertical space that one row takes up.
    let percentHeightPerTile = 100 / this._rowspan;
    // Fraction of the horizontal gutter size that each column takes up.
    let gutterHeightPerTile = (this._rows - 1) / this._rows;
    // Base vertical size of a column.
    let baseTileHeight = this.getBaseTileSize(percentHeightPerTile, gutterHeightPerTile);
    tile._setStyle('top', this.getTilePosition(baseTileHeight, rowIndex));
    tile._setStyle('height', calc(this.getTileSize(baseTileHeight, tile.rowspan)));
  }
  reset(list) {
    if (list._tiles) {
      list._tiles.forEach(tile => {
        tile._setStyle('top', null);
        tile._setStyle('height', null);
      });
    }
  }
}
/** Wraps a CSS string in a calc function */
function calc(exp) {
  return `calc(${exp})`;
}
/** Appends pixels to a CSS string if no units are given. */
function normalizeUnits(value) {
  return value.match(/([A-Za-z%]+)$/) ? value : `${value}px`;
}

// TODO(kara): Conditional (responsive) column count / row size.
// TODO(kara): Re-layout on window resize / media change (debounced).
// TODO(kara): gridTileHeader and gridTileFooter.
const MAT_FIT_MODE = 'fit';
class MatGridList {
  constructor(_element, _dir) {
    this._element = _element;
    this._dir = _dir;
    /** The amount of space between tiles. This will be something like '5px' or '2em'. */
    this._gutter = '1px';
  }
  /** Amount of columns in the grid list. */
  get cols() {
    return this._cols;
  }
  set cols(value) {
    this._cols = Math.max(1, Math.round((0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_1__.coerceNumberProperty)(value)));
  }
  /** Size of the grid list's gutter in pixels. */
  get gutterSize() {
    return this._gutter;
  }
  set gutterSize(value) {
    this._gutter = `${value == null ? '' : value}`;
  }
  /** Set internal representation of row height from the user-provided value. */
  get rowHeight() {
    return this._rowHeight;
  }
  set rowHeight(value) {
    const newValue = `${value == null ? '' : value}`;
    if (newValue !== this._rowHeight) {
      this._rowHeight = newValue;
      this._setTileStyler(this._rowHeight);
    }
  }
  ngOnInit() {
    this._checkCols();
    this._checkRowHeight();
  }
  /**
   * The layout calculation is fairly cheap if nothing changes, so there's little cost
   * to run it frequently.
   */
  ngAfterContentChecked() {
    this._layoutTiles();
  }
  /** Throw a friendly error if cols property is missing */
  _checkCols() {
    if (!this.cols && (typeof ngDevMode === 'undefined' || ngDevMode)) {
      throw Error(`mat-grid-list: must pass in number of columns. ` + `Example: <mat-grid-list cols="3">`);
    }
  }
  /** Default to equal width:height if rowHeight property is missing */
  _checkRowHeight() {
    if (!this._rowHeight) {
      this._setTileStyler('1:1');
    }
  }
  /** Creates correct Tile Styler subtype based on rowHeight passed in by user */
  _setTileStyler(rowHeight) {
    if (this._tileStyler) {
      this._tileStyler.reset(this);
    }
    if (rowHeight === MAT_FIT_MODE) {
      this._tileStyler = new FitTileStyler();
    } else if (rowHeight && rowHeight.indexOf(':') > -1) {
      this._tileStyler = new RatioTileStyler(rowHeight);
    } else {
      this._tileStyler = new FixedTileStyler(rowHeight);
    }
  }
  /** Computes and applies the size and position for all children grid tiles. */
  _layoutTiles() {
    if (!this._tileCoordinator) {
      this._tileCoordinator = new TileCoordinator();
    }
    const tracker = this._tileCoordinator;
    const tiles = this._tiles.filter(tile => !tile._gridList || tile._gridList === this);
    const direction = this._dir ? this._dir.value : 'ltr';
    this._tileCoordinator.update(this.cols, tiles);
    this._tileStyler.init(this.gutterSize, tracker, this.cols, direction);
    tiles.forEach((tile, index) => {
      const pos = tracker.positions[index];
      this._tileStyler.setStyle(tile, pos.row, pos.col);
    });
    this._setListStyle(this._tileStyler.getComputedHeight());
  }
  /** Sets style on the main grid-list element, given the style name and value. */
  _setListStyle(style) {
    if (style) {
      this._element.nativeElement.style[style[0]] = style[1];
    }
  }
}
_class6 = MatGridList;
_class6.ɵfac = function _class6_Factory(t) {
  return new (t || _class6)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_3__.Directionality, 8));
};
_class6.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: _class6,
  selectors: [["mat-grid-list"]],
  contentQueries: function _class6_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵcontentQuery"](dirIndex, MatGridTile, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx._tiles = _t);
    }
  },
  hostAttrs: [1, "mat-grid-list"],
  hostVars: 1,
  hostBindings: function _class6_HostBindings(rf, ctx) {
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattribute"]("cols", ctx.cols);
    }
  },
  inputs: {
    cols: "cols",
    gutterSize: "gutterSize",
    rowHeight: "rowHeight"
  },
  exportAs: ["matGridList"],
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([{
    provide: MAT_GRID_LIST,
    useExisting: _class6
  }])],
  ngContentSelectors: _c0,
  decls: 2,
  vars: 0,
  template: function _class6_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojectionDef"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    }
  },
  styles: [_c3],
  encapsulation: 2,
  changeDetection: 0
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MatGridList, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Component,
    args: [{
      selector: 'mat-grid-list',
      exportAs: 'matGridList',
      host: {
        'class': 'mat-grid-list',
        // Ensures that the "cols" input value is reflected in the DOM. This is
        // needed for the grid-list harness.
        '[attr.cols]': 'cols'
      },
      providers: [{
        provide: MAT_GRID_LIST,
        useExisting: MatGridList
      }],
      changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectionStrategy.OnPush,
      encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewEncapsulation.None,
      template: "<div>\n  <ng-content></ng-content>\n</div>",
      styles: [".mat-grid-list{display:block;position:relative}.mat-grid-tile{display:block;position:absolute;overflow:hidden}.mat-grid-tile .mat-grid-tile-header,.mat-grid-tile .mat-grid-tile-footer{display:flex;align-items:center;height:48px;color:#fff;background:rgba(0,0,0,.38);overflow:hidden;padding:0 16px;position:absolute;left:0;right:0}.mat-grid-tile .mat-grid-tile-header>*,.mat-grid-tile .mat-grid-tile-footer>*{margin:0;padding:0;font-weight:normal;font-size:inherit}.mat-grid-tile .mat-grid-tile-header.mat-2-line,.mat-grid-tile .mat-grid-tile-footer.mat-2-line{height:68px}.mat-grid-tile .mat-grid-list-text{display:flex;flex-direction:column;flex:auto;box-sizing:border-box;overflow:hidden}.mat-grid-tile .mat-grid-list-text>*{margin:0;padding:0;font-weight:normal;font-size:inherit}.mat-grid-tile .mat-grid-list-text:empty{display:none}.mat-grid-tile .mat-grid-tile-header{top:0}.mat-grid-tile .mat-grid-tile-footer{bottom:0}.mat-grid-tile .mat-grid-avatar{padding-right:16px}[dir=rtl] .mat-grid-tile .mat-grid-avatar{padding-right:0;padding-left:16px}.mat-grid-tile .mat-grid-avatar:empty{display:none}.mat-grid-tile-header{font-size:var(--mat-grid-list-tile-header-primary-text-size)}.mat-grid-tile-header .mat-line{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;box-sizing:border-box}.mat-grid-tile-header .mat-line:nth-child(n+2){font-size:var(--mat-grid-list-tile-header-secondary-text-size)}.mat-grid-tile-footer{font-size:var(--mat-grid-list-tile-footer-primary-text-size)}.mat-grid-tile-footer .mat-line{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;box-sizing:border-box}.mat-grid-tile-footer .mat-line:nth-child(n+2){font-size:var(--mat-grid-list-tile-footer-secondary-text-size)}.mat-grid-tile-content{top:0;left:0;right:0;bottom:0;position:absolute;display:flex;align-items:center;justify-content:center;height:100%;padding:0;margin:0}"]
    }]
  }], function () {
    return [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef
    }, {
      type: _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_3__.Directionality,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional
      }]
    }];
  }, {
    _tiles: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ContentChildren,
      args: [MatGridTile, {
        descendants: true
      }]
    }],
    cols: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    gutterSize: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    rowHeight: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }]
  });
})();
class MatGridListModule {}
_class7 = MatGridListModule;
_class7.ɵfac = function _class7_Factory(t) {
  return new (t || _class7)();
};
_class7.ɵmod = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
  type: _class7
});
_class7.ɵinj = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
  imports: [_angular_material_core__WEBPACK_IMPORTED_MODULE_2__.MatLineModule, _angular_material_core__WEBPACK_IMPORTED_MODULE_2__.MatCommonModule, _angular_material_core__WEBPACK_IMPORTED_MODULE_2__.MatLineModule, _angular_material_core__WEBPACK_IMPORTED_MODULE_2__.MatCommonModule]
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MatGridListModule, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.NgModule,
    args: [{
      imports: [_angular_material_core__WEBPACK_IMPORTED_MODULE_2__.MatLineModule, _angular_material_core__WEBPACK_IMPORTED_MODULE_2__.MatCommonModule],
      exports: [MatGridList, MatGridTile, MatGridTileText, _angular_material_core__WEBPACK_IMPORTED_MODULE_2__.MatLineModule, _angular_material_core__WEBPACK_IMPORTED_MODULE_2__.MatCommonModule, MatGridTileHeaderCssMatStyler, MatGridTileFooterCssMatStyler, MatGridAvatarCssMatStyler],
      declarations: [MatGridList, MatGridTile, MatGridTileText, MatGridTileHeaderCssMatStyler, MatGridTileFooterCssMatStyler, MatGridAvatarCssMatStyler]
    }]
  }], null, null);
})();

// Privately exported for the grid-list harness.
const ɵTileCoordinator = TileCoordinator;

/**
 * Generated bundle index. Do not edit.
 */



/***/ }),

/***/ 3228:
/*!**********************************************************!*\
  !*** ./node_modules/@angular/material/fesm2022/list.mjs ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MAT_LIST: () => (/* binding */ MAT_LIST),
/* harmony export */   MAT_LIST_CONFIG: () => (/* binding */ MAT_LIST_CONFIG),
/* harmony export */   MAT_NAV_LIST: () => (/* binding */ MAT_NAV_LIST),
/* harmony export */   MAT_SELECTION_LIST_VALUE_ACCESSOR: () => (/* binding */ MAT_SELECTION_LIST_VALUE_ACCESSOR),
/* harmony export */   MatActionList: () => (/* binding */ MatActionList),
/* harmony export */   MatList: () => (/* binding */ MatList),
/* harmony export */   MatListItem: () => (/* binding */ MatListItem),
/* harmony export */   MatListItemAvatar: () => (/* binding */ MatListItemAvatar),
/* harmony export */   MatListItemIcon: () => (/* binding */ MatListItemIcon),
/* harmony export */   MatListItemLine: () => (/* binding */ MatListItemLine),
/* harmony export */   MatListItemMeta: () => (/* binding */ MatListItemMeta),
/* harmony export */   MatListItemTitle: () => (/* binding */ MatListItemTitle),
/* harmony export */   MatListModule: () => (/* binding */ MatListModule),
/* harmony export */   MatListOption: () => (/* binding */ MatListOption),
/* harmony export */   MatListSubheaderCssMatStyler: () => (/* binding */ MatListSubheaderCssMatStyler),
/* harmony export */   MatNavList: () => (/* binding */ MatNavList),
/* harmony export */   MatSelectionList: () => (/* binding */ MatSelectionList),
/* harmony export */   MatSelectionListChange: () => (/* binding */ MatSelectionListChange),
/* harmony export */   SELECTION_LIST: () => (/* binding */ SELECTION_LIST),
/* harmony export */   _MatListItemGraphicBase: () => (/* binding */ _MatListItemGraphicBase)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser/animations */ 1699);
/* harmony import */ var _angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/cdk/coercion */ 5998);
/* harmony import */ var _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/cdk/platform */ 3274);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/core */ 5309);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 1523);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 7835);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs */ 2513);
/* harmony import */ var _angular_cdk_observers__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/cdk/observers */ 6787);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _angular_material_divider__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/divider */ 9400);
/* harmony import */ var _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/cdk/a11y */ 3170);
/* harmony import */ var _angular_cdk_collections__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/cdk/collections */ 636);
/* harmony import */ var _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/cdk/keycodes */ 554);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/forms */ 8849);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! rxjs/operators */ 274);
var _class, _class2, _class3, _class4, _class5, _class6, _class7, _class8, _class9, _class10, _class11, _class12, _class13, _class14, _class15, _class16;



















/**
 * Injection token that can be used to reference instances of an `ListOption`. It serves
 * as alternative token to an actual implementation which could result in undesired
 * retention of the class or circular references breaking runtime execution.
 * @docs-private
 */
const _c0 = ["*"];
const _c1 = "@media screen and (forced-colors: active),(-ms-high-contrast: active){.mdc-list-divider::after{content:\"\";display:block;border-bottom-width:1px;border-bottom-style:solid}}.mdc-list{margin:0;padding:8px 0;list-style-type:none}.mdc-list:focus{outline:none}.mdc-list-item__wrapper{display:block}.mdc-list-item{display:flex;position:relative;align-items:center;justify-content:flex-start;overflow:hidden;padding:0;align-items:stretch;cursor:pointer}.mdc-list-item:focus{outline:none}.mdc-list-item.mdc-list-item--with-one-line{height:48px}.mdc-list-item.mdc-list-item--with-two-lines{height:64px}.mdc-list-item.mdc-list-item--with-three-lines{height:88px}.mdc-list-item.mdc-list-item--with-one-line .mdc-list-item__start{align-self:center;margin-top:0}.mdc-list-item.mdc-list-item--with-two-lines .mdc-list-item__start{align-self:flex-start;margin-top:16px}.mdc-list-item.mdc-list-item--with-three-lines .mdc-list-item__start{align-self:flex-start;margin-top:16px}.mdc-list-item.mdc-list-item--with-one-line .mdc-list-item__end{align-self:center;margin-top:0}.mdc-list-item.mdc-list-item--with-two-lines .mdc-list-item__end{align-self:center;margin-top:0}.mdc-list-item.mdc-list-item--with-three-lines .mdc-list-item__end{align-self:flex-start;margin-top:16px}.mdc-list-item.mdc-list-item--disabled,.mdc-list-item.mdc-list-item--non-interactive{cursor:auto}.mdc-list-item:not(.mdc-list-item--selected):focus::before,.mdc-list-item.mdc-ripple-upgraded--background-focused::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:1px solid rgba(0,0,0,0);border-radius:inherit;content:\"\";pointer-events:none}@media screen and (forced-colors: active){.mdc-list-item:not(.mdc-list-item--selected):focus::before,.mdc-list-item.mdc-ripple-upgraded--background-focused::before{border-color:CanvasText}}.mdc-list-item.mdc-list-item--selected::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:3px double rgba(0,0,0,0);border-radius:inherit;content:\"\";pointer-events:none}@media screen and (forced-colors: active){.mdc-list-item.mdc-list-item--selected::before{border-color:CanvasText}}.mdc-list-item.mdc-list-item--selected:focus::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:3px solid rgba(0,0,0,0);border-radius:inherit;content:\"\";pointer-events:none}@media screen and (forced-colors: active){.mdc-list-item.mdc-list-item--selected:focus::before{border-color:CanvasText}}a.mdc-list-item{color:inherit;text-decoration:none}.mdc-list-item__start{fill:currentColor;flex-shrink:0;pointer-events:none}.mdc-list-item__end{flex-shrink:0;pointer-events:none}.mdc-list-item__content{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;align-self:center;flex:1;pointer-events:none}.mdc-list-item--with-two-lines .mdc-list-item__content,.mdc-list-item--with-three-lines .mdc-list-item__content{align-self:stretch}.mdc-list-item__content[for]{pointer-events:none}.mdc-list-item__primary-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.mdc-list-item--with-two-lines .mdc-list-item__primary-text,.mdc-list-item--with-three-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before,.mdc-list-item--with-three-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after,.mdc-list-item--with-three-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item__secondary-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;display:block;margin-top:0;line-height:normal}.mdc-list-item__secondary-text::before{display:inline-block;width:0;height:20px;content:\"\";vertical-align:0}.mdc-list-item--with-three-lines .mdc-list-item__secondary-text{white-space:normal;line-height:20px}.mdc-list-item--with-overline .mdc-list-item__secondary-text{white-space:nowrap;line-height:auto}.mdc-list-item__overline-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.mdc-list-item--with-two-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-two-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:24px;content:\"\";vertical-align:0}.mdc-list-item--with-two-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-three-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-three-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-three-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-avatar.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-avatar.mdc-list-item,.mdc-list-item--with-leading-avatar.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-avatar .mdc-list-item__start{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-list-item--with-leading-avatar .mdc-list-item__start,.mdc-list-item--with-leading-avatar .mdc-list-item__start[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-avatar.mdc-list-item--with-one-line{height:56px}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-avatar .mdc-list-item__start{border-radius:50%}.mdc-list-item--with-leading-icon.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-icon.mdc-list-item,.mdc-list-item--with-leading-icon.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-icon .mdc-list-item__start{margin-left:16px;margin-right:32px}[dir=rtl] .mdc-list-item--with-leading-icon .mdc-list-item__start,.mdc-list-item--with-leading-icon .mdc-list-item__start[dir=rtl]{margin-left:32px;margin-right:16px}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-icon.mdc-list-item--with-one-line{height:56px}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-thumbnail.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-thumbnail.mdc-list-item,.mdc-list-item--with-leading-thumbnail.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-thumbnail .mdc-list-item__start{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-list-item--with-leading-thumbnail .mdc-list-item__start,.mdc-list-item--with-leading-thumbnail .mdc-list-item__start[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-one-line{height:56px}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-image.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-image.mdc-list-item,.mdc-list-item--with-leading-image.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-image .mdc-list-item__start{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-list-item--with-leading-image .mdc-list-item__start,.mdc-list-item--with-leading-image .mdc-list-item__start[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-image.mdc-list-item--with-one-line{height:72px}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines .mdc-list-item__start{align-self:flex-start;margin-top:8px}.mdc-list-item--with-leading-video.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-video.mdc-list-item,.mdc-list-item--with-leading-video.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-video .mdc-list-item__start{margin-left:0;margin-right:16px}[dir=rtl] .mdc-list-item--with-leading-video .mdc-list-item__start,.mdc-list-item--with-leading-video .mdc-list-item__start[dir=rtl]{margin-left:16px;margin-right:0}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-video.mdc-list-item--with-one-line{height:72px}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-checkbox.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-checkbox.mdc-list-item,.mdc-list-item--with-leading-checkbox.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-checkbox .mdc-list-item__start{margin-left:8px;margin-right:24px}[dir=rtl] .mdc-list-item--with-leading-checkbox .mdc-list-item__start,.mdc-list-item--with-leading-checkbox .mdc-list-item__start[dir=rtl]{margin-left:24px;margin-right:8px}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__start{align-self:flex-start;margin-top:8px}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-one-line{height:56px}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-radio.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-radio.mdc-list-item,.mdc-list-item--with-leading-radio.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-radio .mdc-list-item__start{margin-left:8px;margin-right:24px}[dir=rtl] .mdc-list-item--with-leading-radio .mdc-list-item__start,.mdc-list-item--with-leading-radio .mdc-list-item__start[dir=rtl]{margin-left:24px;margin-right:8px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__start{align-self:flex-start;margin-top:8px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-radio.mdc-list-item--with-one-line{height:56px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-switch.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-switch.mdc-list-item,.mdc-list-item--with-leading-switch.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-switch .mdc-list-item__start{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-list-item--with-leading-switch .mdc-list-item__start,.mdc-list-item--with-leading-switch .mdc-list-item__start[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines .mdc-list-item__start{align-self:flex-start;margin-top:16px}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-switch.mdc-list-item--with-one-line{height:56px}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-trailing-icon.mdc-list-item{padding-left:auto;padding-right:0}[dir=rtl] .mdc-list-item--with-trailing-icon.mdc-list-item,.mdc-list-item--with-trailing-icon.mdc-list-item[dir=rtl]{padding-left:0;padding-right:auto}.mdc-list-item--with-trailing-icon .mdc-list-item__end{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-list-item--with-trailing-icon .mdc-list-item__end,.mdc-list-item--with-trailing-icon .mdc-list-item__end[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-list-item--with-trailing-meta.mdc-list-item--with-two-lines .mdc-list-item__end{align-self:flex-start;margin-top:0}.mdc-list-item--with-trailing-meta.mdc-list-item--with-three-lines .mdc-list-item__end{align-self:flex-start;margin-top:0}.mdc-list-item--with-trailing-meta.mdc-list-item{padding-left:auto;padding-right:0}[dir=rtl] .mdc-list-item--with-trailing-meta.mdc-list-item,.mdc-list-item--with-trailing-meta.mdc-list-item[dir=rtl]{padding-left:0;padding-right:auto}.mdc-list-item--with-trailing-meta .mdc-list-item__end{margin-left:28px;margin-right:16px}[dir=rtl] .mdc-list-item--with-trailing-meta .mdc-list-item__end,.mdc-list-item--with-trailing-meta .mdc-list-item__end[dir=rtl]{margin-left:16px;margin-right:28px}.mdc-list-item--with-trailing-meta.mdc-list-item--with-two-lines .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-trailing-meta.mdc-list-item--with-two-lines .mdc-list-item__end::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-trailing-meta.mdc-list-item--with-three-lines .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-trailing-meta.mdc-list-item--with-three-lines .mdc-list-item__end::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-trailing-meta .mdc-list-item__end{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:var(--mdc-typography-caption-font-family);font-size:var(--mdc-typography-caption-font-size);line-height:var(--mdc-typography-caption-line-height);font-weight:var(--mdc-typography-caption-font-weight);letter-spacing:var(--mdc-typography-caption-letter-spacing);text-decoration:var(--mdc-typography-caption-text-decoration);text-transform:var(--mdc-typography-caption-text-transform)}.mdc-list-item--with-trailing-checkbox.mdc-list-item{padding-left:auto;padding-right:0}[dir=rtl] .mdc-list-item--with-trailing-checkbox.mdc-list-item,.mdc-list-item--with-trailing-checkbox.mdc-list-item[dir=rtl]{padding-left:0;padding-right:auto}.mdc-list-item--with-trailing-checkbox .mdc-list-item__end{margin-left:24px;margin-right:8px}[dir=rtl] .mdc-list-item--with-trailing-checkbox .mdc-list-item__end,.mdc-list-item--with-trailing-checkbox .mdc-list-item__end[dir=rtl]{margin-left:8px;margin-right:24px}.mdc-list-item--with-trailing-checkbox.mdc-list-item--with-three-lines .mdc-list-item__end{align-self:flex-start;margin-top:8px}.mdc-list-item--with-trailing-radio.mdc-list-item{padding-left:auto;padding-right:0}[dir=rtl] .mdc-list-item--with-trailing-radio.mdc-list-item,.mdc-list-item--with-trailing-radio.mdc-list-item[dir=rtl]{padding-left:0;padding-right:auto}.mdc-list-item--with-trailing-radio .mdc-list-item__end{margin-left:24px;margin-right:8px}[dir=rtl] .mdc-list-item--with-trailing-radio .mdc-list-item__end,.mdc-list-item--with-trailing-radio .mdc-list-item__end[dir=rtl]{margin-left:8px;margin-right:24px}.mdc-list-item--with-trailing-radio.mdc-list-item--with-three-lines .mdc-list-item__end{align-self:flex-start;margin-top:8px}.mdc-list-item--with-trailing-switch.mdc-list-item{padding-left:auto;padding-right:0}[dir=rtl] .mdc-list-item--with-trailing-switch.mdc-list-item,.mdc-list-item--with-trailing-switch.mdc-list-item[dir=rtl]{padding-left:0;padding-right:auto}.mdc-list-item--with-trailing-switch .mdc-list-item__end{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-list-item--with-trailing-switch .mdc-list-item__end,.mdc-list-item--with-trailing-switch .mdc-list-item__end[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-list-item--with-trailing-switch.mdc-list-item--with-three-lines .mdc-list-item__end{align-self:flex-start;margin-top:16px}.mdc-list-item--with-overline.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-overline.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:20px;content:\"\";vertical-align:0}.mdc-list-item--with-overline.mdc-list-item--with-three-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-overline.mdc-list-item--with-three-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:20px;content:\"\";vertical-align:0}.mdc-list-item{padding-left:16px;padding-right:16px}[dir=rtl] .mdc-list-item,.mdc-list-item[dir=rtl]{padding-left:16px;padding-right:16px}.mdc-list-group .mdc-deprecated-list{padding:0}.mdc-list-group__subheader{margin:calc((3rem - 1.5rem)/2) 16px}.mdc-list-divider{padding:0;background-clip:content-box}.mdc-list-divider.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-text.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-icon.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-image.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-thumbnail.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-avatar.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-checkbox.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-switch.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-radio.mdc-list-divider--with-leading-inset{padding-left:16px;padding-right:auto}[dir=rtl] .mdc-list-divider.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-text.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-icon.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-image.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-thumbnail.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-avatar.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-checkbox.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-switch.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-radio.mdc-list-divider--with-leading-inset,.mdc-list-divider.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-text.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-icon.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-image.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-thumbnail.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-avatar.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-checkbox.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-switch.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-radio.mdc-list-divider--with-leading-inset[dir=rtl]{padding-left:auto;padding-right:16px}.mdc-list-divider.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-text.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-icon.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-image.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-thumbnail.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-avatar.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-checkbox.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-switch.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-radio.mdc-list-divider--with-trailing-inset{padding-left:auto;padding-right:16px}[dir=rtl] .mdc-list-divider.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-text.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-icon.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-image.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-thumbnail.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-avatar.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-checkbox.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-switch.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-radio.mdc-list-divider--with-trailing-inset,.mdc-list-divider.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-text.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-icon.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-image.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-thumbnail.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-avatar.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-checkbox.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-switch.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-radio.mdc-list-divider--with-trailing-inset[dir=rtl]{padding-left:16px;padding-right:auto}.mdc-list-divider--with-leading-video.mdc-list-divider--with-leading-inset{padding-left:0px;padding-right:auto}[dir=rtl] .mdc-list-divider--with-leading-video.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-video.mdc-list-divider--with-leading-inset[dir=rtl]{padding-left:auto;padding-right:0px}[dir=rtl] .mdc-list-divider,.mdc-list-divider[dir=rtl]{padding:0}.mdc-list-item{background-color:var(--mdc-list-list-item-container-color)}.mdc-list-item.mdc-list-item--selected{background-color:var(--mdc-list-list-item-selected-container-color)}.mdc-list-item--with-one-line{border-radius:var(--mdc-list-list-item-container-shape)}.mdc-list-item--with-one-line.mdc-list-item--with-leading-avatar,.mdc-list-item--with-one-line.mdc-list-item--with-leading-icon,.mdc-list-item--with-one-line.mdc-list-item--with-leading-thumbnail,.mdc-list-item--with-one-line.mdc-list-item--with-leading-checkbox,.mdc-list-item--with-one-line.mdc-list-item--with-leading-radio,.mdc-list-item--with-one-line.mdc-list-item--with-leading-switch{border-radius:var(--mdc-list-list-item-container-shape)}.mdc-list-item--with-one-line.mdc-list-item--with-leading-image,.mdc-list-item--with-one-line.mdc-list-item--with-leading-video{border-radius:var(--mdc-list-list-item-container-shape)}.mdc-list-item--with-two-lines{border-radius:var(--mdc-list-list-item-container-shape)}.mdc-list-item--with-two-lines.mdc-list-item--with-leading-avatar,.mdc-list-item--with-two-lines.mdc-list-item--with-leading-icon,.mdc-list-item--with-two-lines.mdc-list-item--with-leading-thumbnail,.mdc-list-item--with-two-lines.mdc-list-item--with-leading-checkbox,.mdc-list-item--with-two-lines.mdc-list-item--with-leading-radio,.mdc-list-item--with-two-lines.mdc-list-item--with-leading-switch,.mdc-list-item--with-two-lines.mdc-list-item--with-leading-image,.mdc-list-item--with-two-lines.mdc-list-item--with-leading-video{border-radius:var(--mdc-list-list-item-container-shape)}.mdc-list-item--with-three-lines{border-radius:var(--mdc-list-list-item-container-shape)}.mdc-list-item.mdc-list-item--with-one-line{height:var(--mdc-list-list-item-one-line-container-height)}.mdc-list-item.mdc-list-item--with-two-lines{height:var(--mdc-list-list-item-two-line-container-height)}.mdc-list-item.mdc-list-item--with-three-lines{height:var(--mdc-list-list-item-three-line-container-height)}.mdc-list-item__primary-text{color:var(--mdc-list-list-item-label-text-color)}.mdc-list-item__primary-text{font-family:var(--mdc-list-list-item-label-text-font);line-height:var(--mdc-list-list-item-label-text-line-height);font-size:var(--mdc-list-list-item-label-text-size);font-weight:var(--mdc-list-list-item-label-text-weight);letter-spacing:var(--mdc-list-list-item-label-text-tracking)}.mdc-list-item__secondary-text{color:var(--mdc-list-list-item-supporting-text-color)}.mdc-list-item__secondary-text{font-family:var(--mdc-list-list-item-supporting-text-font);line-height:var(--mdc-list-list-item-supporting-text-line-height);font-size:var(--mdc-list-list-item-supporting-text-size);font-weight:var(--mdc-list-list-item-supporting-text-weight);letter-spacing:var(--mdc-list-list-item-supporting-text-tracking)}.mdc-list-item--with-leading-icon .mdc-list-item__start{color:var(--mdc-list-list-item-leading-icon-color)}.mdc-list-item--with-leading-icon .mdc-list-item__start{width:var(--mdc-list-list-item-leading-icon-size);height:var(--mdc-list-list-item-leading-icon-size)}.mdc-list-item--with-leading-icon .mdc-list-item__start>i{font-size:var(--mdc-list-list-item-leading-icon-size)}.mdc-list-item--with-leading-icon .mdc-list-item__start .mdc-list-item__icon{font-size:var(--mdc-list-list-item-leading-icon-size);width:var(--mdc-list-list-item-leading-icon-size);height:var(--mdc-list-list-item-leading-icon-size)}.mdc-list-item--with-leading-icon .mdc-list-item__start .mdc-list-item__icon,.mdc-list-item--with-leading-icon .mdc-list-item__start .mdc-list-item__icon>.materialdesignWizIconSvgsSvgIcon{display:block}.mdc-list-item--with-leading-avatar .mdc-list-item__start{width:var(--mdc-list-list-item-leading-avatar-size);height:var(--mdc-list-list-item-leading-avatar-size)}.mdc-list-item.mdc-list-item--with-trailing-meta .mdc-list-item__end{color:var(--mdc-list-list-item-trailing-supporting-text-color)}.mdc-list-item--with-trailing-meta .mdc-list-item__end{font-family:var(--mdc-list-list-item-trailing-supporting-text-font);line-height:var(--mdc-list-list-item-trailing-supporting-text-line-height);font-size:var(--mdc-list-list-item-trailing-supporting-text-size);font-weight:var(--mdc-list-list-item-trailing-supporting-text-weight);letter-spacing:var(--mdc-list-list-item-trailing-supporting-text-tracking)}.mdc-list-item--with-trailing-icon .mdc-list-item__end{color:var(--mdc-list-list-item-trailing-icon-color)}.mdc-list-item--with-trailing-icon .mdc-list-item__end{width:var(--mdc-list-list-item-trailing-icon-size);height:var(--mdc-list-list-item-trailing-icon-size)}.mdc-list-item--with-trailing-icon .mdc-list-item__end>i{font-size:var(--mdc-list-list-item-trailing-icon-size)}.mdc-list-item--with-trailing-icon .mdc-list-item__end .mdc-list-item__icon{font-size:var(--mdc-list-list-item-trailing-icon-size);width:var(--mdc-list-list-item-trailing-icon-size);height:var(--mdc-list-list-item-trailing-icon-size)}.mdc-list-item--with-trailing-icon .mdc-list-item__end .mdc-list-item__icon,.mdc-list-item--with-trailing-icon .mdc-list-item__end .mdc-list-item__icon>.materialdesignWizIconSvgsSvgIcon{display:block}.mdc-list-item--selected.mdc-list-item--with-trailing-icon .mdc-list-item__end{color:var(--mdc-list-list-item-selected-trailing-icon-color)}.mdc-list-item--disabled .mdc-list-item__start,.mdc-list-item--disabled .mdc-list-item__content,.mdc-list-item--disabled .mdc-list-item__end{opacity:1}.mdc-list-item--disabled .mdc-list-item__primary-text,.mdc-list-item--disabled .mdc-list-item__secondary-text,.mdc-list-item--disabled .mdc-list-item__overline-text{opacity:var(--mdc-list-list-item-disabled-label-text-opacity)}.mdc-list-item--disabled.mdc-list-item--with-leading-icon .mdc-list-item__start{color:var(--mdc-list-list-item-disabled-leading-icon-color)}.mdc-list-item--disabled.mdc-list-item--with-leading-icon .mdc-list-item__start{opacity:var(--mdc-list-list-item-disabled-leading-icon-opacity)}.mdc-list-item--disabled.mdc-list-item--with-trailing-icon .mdc-list-item__end{color:var(--mdc-list-list-item-disabled-trailing-icon-color)}.mdc-list-item--disabled.mdc-list-item--with-trailing-icon .mdc-list-item__end{opacity:var(--mdc-list-list-item-disabled-trailing-icon-opacity)}.mdc-list-item:hover .mdc-list-item__primary-text{color:var(--mdc-list-list-item-hover-label-text-color)}.mdc-list-item--with-leading-icon:hover .mdc-list-item__start{color:var(--mdc-list-list-item-hover-leading-icon-color)}.mdc-list-item--with-trailing-icon:hover .mdc-list-item__end{color:var(--mdc-list-list-item-hover-trailing-icon-color)}.mdc-list-item:focus .mdc-list-item__primary-text{color:var(--mdc-list-list-item-focus-label-text-color)}.mdc-list-item.mdc-list-item--disabled .mdc-list-item__primary-text{color:var(--mdc-list-list-item-disabled-label-text-color)}.mdc-list-item:hover::before{background-color:var(--mdc-list-list-item-hover-state-layer-color);opacity:var(--mdc-list-list-item-hover-state-layer-opacity)}.mdc-list-item.mdc-list-item--disabled::before{background-color:var(--mdc-list-list-item-disabled-state-layer-color);opacity:var(--mdc-list-list-item-disabled-state-layer-opacity)}.mdc-list-item:focus::before{background-color:var(--mdc-list-list-item-focus-state-layer-color);opacity:var(--mdc-list-list-item-focus-state-layer-opacity)}.mdc-list-item--disabled .mdc-radio,.mdc-list-item--disabled .mdc-checkbox{opacity:var(--mdc-list-list-item-disabled-label-text-opacity)}.mdc-list-item--with-leading-avatar .mat-mdc-list-item-avatar{border-radius:var(--mdc-list-list-item-leading-avatar-shape);background-color:var(--mdc-list-list-item-leading-avatar-color)}.mat-mdc-list-base{--mdc-list-list-item-container-shape:0;--mdc-list-list-item-leading-avatar-shape:50%;--mdc-list-list-item-container-color:transparent;--mdc-list-list-item-selected-container-color:transparent;--mdc-list-list-item-leading-avatar-color:transparent;--mdc-list-list-item-leading-icon-size:24px;--mdc-list-list-item-leading-avatar-size:40px;--mdc-list-list-item-trailing-icon-size:24px;--mdc-list-list-item-disabled-state-layer-color:transparent;--mdc-list-list-item-disabled-state-layer-opacity:0;--mdc-list-list-item-disabled-label-text-opacity:0.38;--mdc-list-list-item-disabled-leading-icon-opacity:0.38;--mdc-list-list-item-disabled-trailing-icon-opacity:0.38}.cdk-high-contrast-active a.mdc-list-item--activated::after{content:\"\";position:absolute;top:50%;right:16px;transform:translateY(-50%);width:10px;height:0;border-bottom:solid 10px;border-radius:10px}.cdk-high-contrast-active a.mdc-list-item--activated [dir=rtl]::after{right:auto;left:16px}.mat-mdc-list-base{display:block}.mat-mdc-list-base .mdc-list-item__start,.mat-mdc-list-base .mdc-list-item__end,.mat-mdc-list-base .mdc-list-item__content{pointer-events:auto}.mat-mdc-list-item,.mat-mdc-list-option{width:100%;box-sizing:border-box;-webkit-tap-highlight-color:rgba(0,0,0,0)}.mat-mdc-list-item:not(.mat-mdc-list-item-interactive),.mat-mdc-list-option:not(.mat-mdc-list-item-interactive){cursor:default}.mat-mdc-list-item .mat-divider-inset,.mat-mdc-list-option .mat-divider-inset{position:absolute;left:0;right:0;bottom:0}.mat-mdc-list-item .mat-mdc-list-item-avatar~.mat-divider-inset,.mat-mdc-list-option .mat-mdc-list-item-avatar~.mat-divider-inset{margin-left:72px}[dir=rtl] .mat-mdc-list-item .mat-mdc-list-item-avatar~.mat-divider-inset,[dir=rtl] .mat-mdc-list-option .mat-mdc-list-item-avatar~.mat-divider-inset{margin-right:72px}.mat-mdc-list-item-interactive::before{top:0;left:0;right:0;bottom:0;position:absolute;content:\"\";opacity:0;pointer-events:none}.mat-mdc-list-item>.mat-mdc-focus-indicator{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none}.mat-mdc-list-item:focus>.mat-mdc-focus-indicator::before{content:\"\"}.mat-mdc-list-item.mdc-list-item--with-three-lines .mat-mdc-list-item-line.mdc-list-item__secondary-text{white-space:nowrap;line-height:normal}.mat-mdc-list-item.mdc-list-item--with-three-lines .mat-mdc-list-item-unscoped-content.mdc-list-item__secondary-text{display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2}mat-action-list button{background:none;color:inherit;border:none;font:inherit;outline:inherit;-webkit-tap-highlight-color:rgba(0,0,0,0);text-align:left}[dir=rtl] mat-action-list button{text-align:right}mat-action-list button::-moz-focus-inner{border:0}";
const _c2 = ["unscopedContent"];
const _c3 = ["text"];
const _c4 = [[["", "matListItemAvatar", ""], ["", "matListItemIcon", ""]], [["", "matListItemTitle", ""]], [["", "matListItemLine", ""]], "*", [["", "matListItemMeta", ""]], [["mat-divider"]]];
const _c5 = ["[matListItemAvatar],[matListItemIcon]", "[matListItemTitle]", "[matListItemLine]", "*", "[matListItemMeta]", "mat-divider"];
function _class12_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](0, 4);
  }
}
function _class12_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "input", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "svg", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "path", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("mdc-checkbox--disabled", ctx_r3.disabled);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("checked", ctx_r3.selected)("disabled", ctx_r3.disabled);
  }
}
function _class12_ng_template_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "input", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "div", 20)(4, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("mdc-radio--disabled", ctx_r5.disabled);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("checked", ctx_r5.selected)("disabled", ctx_r5.disabled);
  }
}
function _class12_span_6_ng_template_1_Template(rf, ctx) {}
function _class12_span_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, _class12_span_6_ng_template_1_Template, 0, 0, "ng-template", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngTemplateOutlet", _r2);
  }
}
function _class12_span_7_ng_template_1_Template(rf, ctx) {}
function _class12_span_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, _class12_span_7_ng_template_1_Template, 0, 0, "ng-template", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngTemplateOutlet", _r4);
  }
}
function _class12_ng_template_8_ng_template_0_Template(rf, ctx) {}
function _class12_ng_template_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, _class12_ng_template_8_ng_template_0_Template, 0, 0, "ng-template", 23);
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngTemplateOutlet", _r0);
  }
}
function _class12_span_15_ng_template_1_Template(rf, ctx) {}
function _class12_span_15_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, _class12_span_15_ng_template_1_Template, 0, 0, "ng-template", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngTemplateOutlet", _r2);
  }
}
function _class12_span_16_ng_template_1_Template(rf, ctx) {}
function _class12_span_16_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, _class12_span_16_ng_template_1_Template, 0, 0, "ng-template", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngTemplateOutlet", _r4);
  }
}
function _class12_ng_template_17_ng_template_0_Template(rf, ctx) {}
function _class12_ng_template_17_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, _class12_ng_template_17_ng_template_0_Template, 0, 0, "ng-template", 23);
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngTemplateOutlet", _r0);
  }
}
const _c6 = [[["", "matListItemTitle", ""]], [["", "matListItemLine", ""]], "*", [["mat-divider"]], [["", "matListItemAvatar", ""], ["", "matListItemIcon", ""]]];
const _c7 = ["[matListItemTitle]", "[matListItemLine]", "*", "mat-divider", "[matListItemAvatar],[matListItemIcon]"];
const LIST_OPTION = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken('ListOption');

/**
 * Directive capturing the title of a list item. A list item usually consists of a
 * title and optional secondary or tertiary lines.
 *
 * Text content for the title never wraps. There can only be a single title per list item.
 */
class MatListItemTitle {
  constructor(_elementRef) {
    this._elementRef = _elementRef;
  }
}
_class = MatListItemTitle;
_class.ɵfac = function _class_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef));
};
_class.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
  type: _class,
  selectors: [["", "matListItemTitle", ""]],
  hostAttrs: [1, "mat-mdc-list-item-title", "mdc-list-item__primary-text"]
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MatListItemTitle, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Directive,
    args: [{
      selector: '[matListItemTitle]',
      host: {
        'class': 'mat-mdc-list-item-title mdc-list-item__primary-text'
      }
    }]
  }], function () {
    return [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef
    }];
  }, null);
})();
/**
 * Directive capturing a line in a list item. A list item usually consists of a
 * title and optional secondary or tertiary lines.
 *
 * Text content inside a line never wraps. There can be at maximum two lines per list item.
 */
class MatListItemLine {
  constructor(_elementRef) {
    this._elementRef = _elementRef;
  }
}
_class2 = MatListItemLine;
_class2.ɵfac = function _class2_Factory(t) {
  return new (t || _class2)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef));
};
_class2.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
  type: _class2,
  selectors: [["", "matListItemLine", ""]],
  hostAttrs: [1, "mat-mdc-list-item-line", "mdc-list-item__secondary-text"]
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MatListItemLine, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Directive,
    args: [{
      selector: '[matListItemLine]',
      host: {
        'class': 'mat-mdc-list-item-line mdc-list-item__secondary-text'
      }
    }]
  }], function () {
    return [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef
    }];
  }, null);
})();
/**
 * Directive matching an optional meta section for list items.
 *
 * List items can reserve space at the end of an item to display a control,
 * button or additional text content.
 */
class MatListItemMeta {}
_class3 = MatListItemMeta;
_class3.ɵfac = function _class3_Factory(t) {
  return new (t || _class3)();
};
_class3.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
  type: _class3,
  selectors: [["", "matListItemMeta", ""]],
  hostAttrs: [1, "mat-mdc-list-item-meta", "mdc-list-item__end"]
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MatListItemMeta, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Directive,
    args: [{
      selector: '[matListItemMeta]',
      host: {
        'class': 'mat-mdc-list-item-meta mdc-list-item__end'
      }
    }]
  }], null, null);
})();
/**
 * @docs-private
 *
 * MDC uses the very intuitively named classes `.mdc-list-item__start` and `.mat-list-item__end` to
 * position content such as icons or checkboxes/radios that comes either before or after the text
 * content respectively. This directive detects the placement of the checkbox/radio and applies the
 * correct MDC class to position the icon/avatar on the opposite side.
 */
class _MatListItemGraphicBase {
  constructor(_listOption) {
    this._listOption = _listOption;
  }
  _isAlignedAtStart() {
    // By default, in all list items the graphic is aligned at start. In list options,
    // the graphic is only aligned at start if the checkbox/radio is at the end.
    return !this._listOption || this._listOption?._getTogglePosition() === 'after';
  }
}
_class4 = _MatListItemGraphicBase;
_class4.ɵfac = function _class4_Factory(t) {
  return new (t || _class4)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](LIST_OPTION, 8));
};
_class4.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
  type: _class4,
  hostVars: 4,
  hostBindings: function _class4_HostBindings(rf, ctx) {
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("mdc-list-item__start", ctx._isAlignedAtStart())("mdc-list-item__end", !ctx._isAlignedAtStart());
    }
  }
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](_MatListItemGraphicBase, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Directive,
    args: [{
      host: {
        // MDC uses intuitively named classes `.mdc-list-item__start` and `.mat-list-item__end` to
        // position content such as icons or checkboxes/radios that comes either before or after the
        // text content respectively. This directive detects the placement of the checkbox/radio and
        // applies the correct MDC class to position the icon/avatar on the opposite side.
        '[class.mdc-list-item__start]': '_isAlignedAtStart()',
        '[class.mdc-list-item__end]': '!_isAlignedAtStart()'
      }
    }]
  }], function () {
    return [{
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Inject,
        args: [LIST_OPTION]
      }]
    }];
  }, null);
})();
/**
 * Directive matching an optional avatar within a list item.
 *
 * List items can reserve space at the beginning of an item to display an avatar.
 */
class MatListItemAvatar extends _MatListItemGraphicBase {}
_class5 = MatListItemAvatar;
_class5.ɵfac = /* @__PURE__ */function () {
  let ɵ_class5_BaseFactory;
  return function _class5_Factory(t) {
    return (ɵ_class5_BaseFactory || (ɵ_class5_BaseFactory = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetInheritedFactory"](_class5)))(t || _class5);
  };
}();
_class5.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
  type: _class5,
  selectors: [["", "matListItemAvatar", ""]],
  hostAttrs: [1, "mat-mdc-list-item-avatar"],
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]]
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MatListItemAvatar, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Directive,
    args: [{
      selector: '[matListItemAvatar]',
      host: {
        'class': 'mat-mdc-list-item-avatar'
      }
    }]
  }], null, null);
})();
/**
 * Directive matching an optional icon within a list item.
 *
 * List items can reserve space at the beginning of an item to display an icon.
 */
class MatListItemIcon extends _MatListItemGraphicBase {}
_class6 = MatListItemIcon;
_class6.ɵfac = /* @__PURE__ */function () {
  let ɵ_class6_BaseFactory;
  return function _class6_Factory(t) {
    return (ɵ_class6_BaseFactory || (ɵ_class6_BaseFactory = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetInheritedFactory"](_class6)))(t || _class6);
  };
}();
_class6.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
  type: _class6,
  selectors: [["", "matListItemIcon", ""]],
  hostAttrs: [1, "mat-mdc-list-item-icon"],
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]]
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MatListItemIcon, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Directive,
    args: [{
      selector: '[matListItemIcon]',
      host: {
        'class': 'mat-mdc-list-item-icon'
      }
    }]
  }], null, null);
})();

/** Injection token that can be used to provide the default options the list module. */
const MAT_LIST_CONFIG = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken('MAT_LIST_CONFIG');

/** @docs-private */
class MatListBase {
  constructor() {
    this._isNonInteractive = true;
    this._disableRipple = false;
    this._disabled = false;
    this._defaultOptions = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(MAT_LIST_CONFIG, {
      optional: true
    });
  }
  /** Whether ripples for all list items is disabled. */
  get disableRipple() {
    return this._disableRipple;
  }
  set disableRipple(value) {
    this._disableRipple = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_1__.coerceBooleanProperty)(value);
  }
  /**
   * Whether the entire list is disabled. When disabled, the list itself and each of its list items
   * are disabled.
   */
  get disabled() {
    return this._disabled;
  }
  set disabled(value) {
    this._disabled = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_1__.coerceBooleanProperty)(value);
  }
}
_class7 = MatListBase;
_class7.ɵfac = function _class7_Factory(t) {
  return new (t || _class7)();
};
_class7.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
  type: _class7,
  hostVars: 1,
  hostBindings: function _class7_HostBindings(rf, ctx) {
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattribute"]("aria-disabled", ctx.disabled);
    }
  },
  inputs: {
    disableRipple: "disableRipple",
    disabled: "disabled"
  }
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MatListBase, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Directive,
    args: [{
      host: {
        '[attr.aria-disabled]': 'disabled'
      }
    }]
  }], null, {
    disableRipple: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    disabled: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }]
  });
})();
/** @docs-private */
class MatListItemBase {
  /**
   * The number of lines this list item should reserve space for. If not specified,
   * lines are inferred based on the projected content.
   *
   * Explicitly specifying the number of lines is useful if you want to acquire additional
   * space and enable the wrapping of text. The unscoped text content of a list item will
   * always be able to take up the remaining space of the item, unless it represents the title.
   *
   * A maximum of three lines is supported as per the Material Design specification.
   */
  set lines(lines) {
    this._explicitLines = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_1__.coerceNumberProperty)(lines, null);
    this._updateItemLines(false);
  }
  /** Whether ripples for list items are disabled. */
  get disableRipple() {
    return this.disabled || this._disableRipple || this._noopAnimations || !!this._listBase?.disableRipple;
  }
  set disableRipple(value) {
    this._disableRipple = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_1__.coerceBooleanProperty)(value);
  }
  /** Whether the list-item is disabled. */
  get disabled() {
    return this._disabled || !!this._listBase?.disabled;
  }
  set disabled(value) {
    this._disabled = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_1__.coerceBooleanProperty)(value);
  }
  /**
   * Implemented as part of `RippleTarget`.
   * @docs-private
   */
  get rippleDisabled() {
    return this.disableRipple || !!this.rippleConfig.disabled;
  }
  constructor(_elementRef, _ngZone, _listBase, _platform, globalRippleOptions, animationMode) {
    this._elementRef = _elementRef;
    this._ngZone = _ngZone;
    this._listBase = _listBase;
    this._platform = _platform;
    this._explicitLines = null;
    this._disableRipple = false;
    this._disabled = false;
    this._subscriptions = new rxjs__WEBPACK_IMPORTED_MODULE_2__.Subscription();
    this._rippleRenderer = null;
    /** Whether the list item has unscoped text content. */
    this._hasUnscopedTextContent = false;
    this.rippleConfig = globalRippleOptions || {};
    this._hostElement = this._elementRef.nativeElement;
    this._isButtonElement = this._hostElement.nodeName.toLowerCase() === 'button';
    this._noopAnimations = animationMode === 'NoopAnimations';
    if (_listBase && !_listBase._isNonInteractive) {
      this._initInteractiveListItem();
    }
    // If no type attribute is specified for a host `<button>` element, set it to `button`. If a
    // type attribute is already specified, we do nothing. We do this for backwards compatibility.
    // TODO: Determine if we intend to continue doing this for the MDC-based list.
    if (this._isButtonElement && !this._hostElement.hasAttribute('type')) {
      this._hostElement.setAttribute('type', 'button');
    }
  }
  ngAfterViewInit() {
    this._monitorProjectedLinesAndTitle();
    this._updateItemLines(true);
  }
  ngOnDestroy() {
    this._subscriptions.unsubscribe();
    if (this._rippleRenderer !== null) {
      this._rippleRenderer._removeTriggerEvents();
    }
  }
  /** Whether the list item has icons or avatars. */
  _hasIconOrAvatar() {
    return !!(this._avatars.length || this._icons.length);
  }
  _initInteractiveListItem() {
    this._hostElement.classList.add('mat-mdc-list-item-interactive');
    this._rippleRenderer = new _angular_material_core__WEBPACK_IMPORTED_MODULE_3__.RippleRenderer(this, this._ngZone, this._hostElement, this._platform);
    this._rippleRenderer.setupTriggerEvents(this._hostElement);
  }
  /**
   * Subscribes to changes in the projected title and lines. Triggers a
   * item lines update whenever a change occurs.
   */
  _monitorProjectedLinesAndTitle() {
    this._ngZone.runOutsideAngular(() => {
      this._subscriptions.add((0,rxjs__WEBPACK_IMPORTED_MODULE_4__.merge)(this._lines.changes, this._titles.changes).subscribe(() => this._updateItemLines(false)));
    });
  }
  /**
   * Updates the lines of the list item. Based on the projected user content and optional
   * explicit lines setting, the visual appearance of the list item is determined.
   *
   * This method should be invoked whenever the projected user content changes, or
   * when the explicit lines have been updated.
   *
   * @param recheckUnscopedContent Whether the projected unscoped content should be re-checked.
   *   The unscoped content is not re-checked for every update as it is a rather expensive check
   *   for content that is expected to not change very often.
   */
  _updateItemLines(recheckUnscopedContent) {
    // If the updated is triggered too early before the view and content is initialized,
    // we just skip the update. After view initialization the update is triggered again.
    if (!this._lines || !this._titles || !this._unscopedContent) {
      return;
    }
    // Re-check the DOM for unscoped text content if requested. This needs to
    // happen before any computation or sanity checks run as these rely on the
    // result of whether there is unscoped text content or not.
    if (recheckUnscopedContent) {
      this._checkDomForUnscopedTextContent();
    }
    // Sanity check the list item lines and title in the content. This is a dev-mode only
    // check that can be dead-code eliminated by Terser in production.
    if (typeof ngDevMode === 'undefined' || ngDevMode) {
      sanityCheckListItemContent(this);
    }
    const numberOfLines = this._explicitLines ?? this._inferLinesFromContent();
    const unscopedContentEl = this._unscopedContent.nativeElement;
    // Update the list item element to reflect the number of lines.
    this._hostElement.classList.toggle('mat-mdc-list-item-single-line', numberOfLines <= 1);
    this._hostElement.classList.toggle('mdc-list-item--with-one-line', numberOfLines <= 1);
    this._hostElement.classList.toggle('mdc-list-item--with-two-lines', numberOfLines === 2);
    this._hostElement.classList.toggle('mdc-list-item--with-three-lines', numberOfLines === 3);
    // If there is no title and the unscoped content is the is the only line, the
    // unscoped text content will be treated as the title of the list-item.
    if (this._hasUnscopedTextContent) {
      const treatAsTitle = this._titles.length === 0 && numberOfLines === 1;
      unscopedContentEl.classList.toggle('mdc-list-item__primary-text', treatAsTitle);
      unscopedContentEl.classList.toggle('mdc-list-item__secondary-text', !treatAsTitle);
    } else {
      unscopedContentEl.classList.remove('mdc-list-item__primary-text');
      unscopedContentEl.classList.remove('mdc-list-item__secondary-text');
    }
  }
  /**
   * Infers the number of lines based on the projected user content. This is useful
   * if no explicit number of lines has been specified on the list item.
   *
   * The number of lines is inferred based on whether there is a title, the number of
   * additional lines (secondary/tertiary). An additional line is acquired if there is
   * unscoped text content.
   */
  _inferLinesFromContent() {
    let numOfLines = this._titles.length + this._lines.length;
    if (this._hasUnscopedTextContent) {
      numOfLines += 1;
    }
    return numOfLines;
  }
  /** Checks whether the list item has unscoped text content. */
  _checkDomForUnscopedTextContent() {
    this._hasUnscopedTextContent = Array.from(this._unscopedContent.nativeElement.childNodes).filter(node => node.nodeType !== node.COMMENT_NODE).some(node => !!(node.textContent && node.textContent.trim()));
  }
}
_class8 = MatListItemBase;
_class8.ɵfac = function _class8_Factory(t) {
  return new (t || _class8)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.NgZone), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](MatListBase, 8), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_5__.Platform), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_core__WEBPACK_IMPORTED_MODULE_3__.MAT_RIPPLE_GLOBAL_OPTIONS, 8), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ANIMATION_MODULE_TYPE, 8));
};
_class8.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
  type: _class8,
  contentQueries: function _class8_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵcontentQuery"](dirIndex, MatListItemAvatar, 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵcontentQuery"](dirIndex, MatListItemIcon, 4);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx._avatars = _t);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx._icons = _t);
    }
  },
  hostVars: 4,
  hostBindings: function _class8_HostBindings(rf, ctx) {
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattribute"]("aria-disabled", ctx.disabled)("disabled", ctx._isButtonElement && ctx.disabled || null);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("mdc-list-item--disabled", ctx.disabled);
    }
  },
  inputs: {
    lines: "lines",
    disableRipple: "disableRipple",
    disabled: "disabled"
  }
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MatListItemBase, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Directive,
    args: [{
      host: {
        '[class.mdc-list-item--disabled]': 'disabled',
        '[attr.aria-disabled]': 'disabled',
        '[attr.disabled]': '(_isButtonElement && disabled) || null'
      }
    }]
  }], function () {
    return [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.NgZone
    }, {
      type: MatListBase,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional
      }]
    }, {
      type: _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_5__.Platform
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Inject,
        args: [_angular_material_core__WEBPACK_IMPORTED_MODULE_3__.MAT_RIPPLE_GLOBAL_OPTIONS]
      }]
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Inject,
        args: [_angular_core__WEBPACK_IMPORTED_MODULE_0__.ANIMATION_MODULE_TYPE]
      }]
    }];
  }, {
    _avatars: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ContentChildren,
      args: [MatListItemAvatar, {
        descendants: false
      }]
    }],
    _icons: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ContentChildren,
      args: [MatListItemIcon, {
        descendants: false
      }]
    }],
    lines: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    disableRipple: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    disabled: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }]
  });
})();
/**
 * Sanity checks the configuration of the list item with respect to the amount
 * of lines, whether there is a title, or if there is unscoped text content.
 *
 * The checks are extracted into a top-level function that can be dead-code
 * eliminated by Terser or other optimizers in production mode.
 */
function sanityCheckListItemContent(item) {
  const numTitles = item._titles.length;
  const numLines = item._titles.length;
  if (numTitles > 1) {
    throw Error('A list item cannot have multiple titles.');
  }
  if (numTitles === 0 && numLines > 0) {
    throw Error('A list item line can only be used if there is a list item title.');
  }
  if (numTitles === 0 && item._hasUnscopedTextContent && item._explicitLines !== null && item._explicitLines > 1) {
    throw Error('A list item cannot have wrapping content without a title.');
  }
  if (numLines > 2 || numLines === 2 && item._hasUnscopedTextContent) {
    throw Error('A list item can have at maximum three lines.');
  }
}
class MatActionList extends MatListBase {
  constructor() {
    super(...arguments);
    // An navigation list is considered interactive, but does not extend the interactive list
    // base class. We do this because as per MDC, items of interactive lists are only reachable
    // through keyboard shortcuts. We want all items for the navigation list to be reachable
    // through tab key as we do not intend to provide any special accessibility treatment. The
    // accessibility treatment depends on how the end-user will interact with it.
    this._isNonInteractive = false;
  }
}
_class9 = MatActionList;
_class9.ɵfac = /* @__PURE__ */function () {
  let ɵ_class9_BaseFactory;
  return function _class9_Factory(t) {
    return (ɵ_class9_BaseFactory || (ɵ_class9_BaseFactory = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetInheritedFactory"](_class9)))(t || _class9);
  };
}();
_class9.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: _class9,
  selectors: [["mat-action-list"]],
  hostAttrs: ["role", "group", 1, "mat-mdc-action-list", "mat-mdc-list-base", "mdc-list"],
  exportAs: ["matActionList"],
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([{
    provide: MatListBase,
    useExisting: _class9
  }]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]],
  ngContentSelectors: _c0,
  decls: 1,
  vars: 0,
  template: function _class9_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojectionDef"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](0);
    }
  },
  styles: ["@media screen and (forced-colors: active),(-ms-high-contrast: active){.mdc-list-divider::after{content:\"\";display:block;border-bottom-width:1px;border-bottom-style:solid}}.mdc-list{margin:0;padding:8px 0;list-style-type:none}.mdc-list:focus{outline:none}.mdc-list-item__wrapper{display:block}.mdc-list-item{display:flex;position:relative;align-items:center;justify-content:flex-start;overflow:hidden;padding:0;align-items:stretch;cursor:pointer}.mdc-list-item:focus{outline:none}.mdc-list-item.mdc-list-item--with-one-line{height:48px}.mdc-list-item.mdc-list-item--with-two-lines{height:64px}.mdc-list-item.mdc-list-item--with-three-lines{height:88px}.mdc-list-item.mdc-list-item--with-one-line .mdc-list-item__start{align-self:center;margin-top:0}.mdc-list-item.mdc-list-item--with-two-lines .mdc-list-item__start{align-self:flex-start;margin-top:16px}.mdc-list-item.mdc-list-item--with-three-lines .mdc-list-item__start{align-self:flex-start;margin-top:16px}.mdc-list-item.mdc-list-item--with-one-line .mdc-list-item__end{align-self:center;margin-top:0}.mdc-list-item.mdc-list-item--with-two-lines .mdc-list-item__end{align-self:center;margin-top:0}.mdc-list-item.mdc-list-item--with-three-lines .mdc-list-item__end{align-self:flex-start;margin-top:16px}.mdc-list-item.mdc-list-item--disabled,.mdc-list-item.mdc-list-item--non-interactive{cursor:auto}.mdc-list-item:not(.mdc-list-item--selected):focus::before,.mdc-list-item.mdc-ripple-upgraded--background-focused::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:1px solid rgba(0,0,0,0);border-radius:inherit;content:\"\";pointer-events:none}@media screen and (forced-colors: active){.mdc-list-item:not(.mdc-list-item--selected):focus::before,.mdc-list-item.mdc-ripple-upgraded--background-focused::before{border-color:CanvasText}}.mdc-list-item.mdc-list-item--selected::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:3px double rgba(0,0,0,0);border-radius:inherit;content:\"\";pointer-events:none}@media screen and (forced-colors: active){.mdc-list-item.mdc-list-item--selected::before{border-color:CanvasText}}.mdc-list-item.mdc-list-item--selected:focus::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:3px solid rgba(0,0,0,0);border-radius:inherit;content:\"\";pointer-events:none}@media screen and (forced-colors: active){.mdc-list-item.mdc-list-item--selected:focus::before{border-color:CanvasText}}a.mdc-list-item{color:inherit;text-decoration:none}.mdc-list-item__start{fill:currentColor;flex-shrink:0;pointer-events:none}.mdc-list-item__end{flex-shrink:0;pointer-events:none}.mdc-list-item__content{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;align-self:center;flex:1;pointer-events:none}.mdc-list-item--with-two-lines .mdc-list-item__content,.mdc-list-item--with-three-lines .mdc-list-item__content{align-self:stretch}.mdc-list-item__content[for]{pointer-events:none}.mdc-list-item__primary-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.mdc-list-item--with-two-lines .mdc-list-item__primary-text,.mdc-list-item--with-three-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before,.mdc-list-item--with-three-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after,.mdc-list-item--with-three-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item__secondary-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;display:block;margin-top:0;line-height:normal}.mdc-list-item__secondary-text::before{display:inline-block;width:0;height:20px;content:\"\";vertical-align:0}.mdc-list-item--with-three-lines .mdc-list-item__secondary-text{white-space:normal;line-height:20px}.mdc-list-item--with-overline .mdc-list-item__secondary-text{white-space:nowrap;line-height:auto}.mdc-list-item__overline-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.mdc-list-item--with-two-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-two-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:24px;content:\"\";vertical-align:0}.mdc-list-item--with-two-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-three-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-three-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-three-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-avatar.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-avatar.mdc-list-item,.mdc-list-item--with-leading-avatar.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-avatar .mdc-list-item__start{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-list-item--with-leading-avatar .mdc-list-item__start,.mdc-list-item--with-leading-avatar .mdc-list-item__start[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-avatar.mdc-list-item--with-one-line{height:56px}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-avatar .mdc-list-item__start{border-radius:50%}.mdc-list-item--with-leading-icon.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-icon.mdc-list-item,.mdc-list-item--with-leading-icon.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-icon .mdc-list-item__start{margin-left:16px;margin-right:32px}[dir=rtl] .mdc-list-item--with-leading-icon .mdc-list-item__start,.mdc-list-item--with-leading-icon .mdc-list-item__start[dir=rtl]{margin-left:32px;margin-right:16px}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-icon.mdc-list-item--with-one-line{height:56px}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-thumbnail.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-thumbnail.mdc-list-item,.mdc-list-item--with-leading-thumbnail.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-thumbnail .mdc-list-item__start{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-list-item--with-leading-thumbnail .mdc-list-item__start,.mdc-list-item--with-leading-thumbnail .mdc-list-item__start[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-one-line{height:56px}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-image.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-image.mdc-list-item,.mdc-list-item--with-leading-image.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-image .mdc-list-item__start{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-list-item--with-leading-image .mdc-list-item__start,.mdc-list-item--with-leading-image .mdc-list-item__start[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-image.mdc-list-item--with-one-line{height:72px}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines .mdc-list-item__start{align-self:flex-start;margin-top:8px}.mdc-list-item--with-leading-video.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-video.mdc-list-item,.mdc-list-item--with-leading-video.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-video .mdc-list-item__start{margin-left:0;margin-right:16px}[dir=rtl] .mdc-list-item--with-leading-video .mdc-list-item__start,.mdc-list-item--with-leading-video .mdc-list-item__start[dir=rtl]{margin-left:16px;margin-right:0}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-video.mdc-list-item--with-one-line{height:72px}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-checkbox.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-checkbox.mdc-list-item,.mdc-list-item--with-leading-checkbox.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-checkbox .mdc-list-item__start{margin-left:8px;margin-right:24px}[dir=rtl] .mdc-list-item--with-leading-checkbox .mdc-list-item__start,.mdc-list-item--with-leading-checkbox .mdc-list-item__start[dir=rtl]{margin-left:24px;margin-right:8px}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__start{align-self:flex-start;margin-top:8px}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-one-line{height:56px}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-radio.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-radio.mdc-list-item,.mdc-list-item--with-leading-radio.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-radio .mdc-list-item__start{margin-left:8px;margin-right:24px}[dir=rtl] .mdc-list-item--with-leading-radio .mdc-list-item__start,.mdc-list-item--with-leading-radio .mdc-list-item__start[dir=rtl]{margin-left:24px;margin-right:8px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__start{align-self:flex-start;margin-top:8px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-radio.mdc-list-item--with-one-line{height:56px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-switch.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-switch.mdc-list-item,.mdc-list-item--with-leading-switch.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-switch .mdc-list-item__start{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-list-item--with-leading-switch .mdc-list-item__start,.mdc-list-item--with-leading-switch .mdc-list-item__start[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines .mdc-list-item__start{align-self:flex-start;margin-top:16px}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-switch.mdc-list-item--with-one-line{height:56px}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-trailing-icon.mdc-list-item{padding-left:auto;padding-right:0}[dir=rtl] .mdc-list-item--with-trailing-icon.mdc-list-item,.mdc-list-item--with-trailing-icon.mdc-list-item[dir=rtl]{padding-left:0;padding-right:auto}.mdc-list-item--with-trailing-icon .mdc-list-item__end{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-list-item--with-trailing-icon .mdc-list-item__end,.mdc-list-item--with-trailing-icon .mdc-list-item__end[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-list-item--with-trailing-meta.mdc-list-item--with-two-lines .mdc-list-item__end{align-self:flex-start;margin-top:0}.mdc-list-item--with-trailing-meta.mdc-list-item--with-three-lines .mdc-list-item__end{align-self:flex-start;margin-top:0}.mdc-list-item--with-trailing-meta.mdc-list-item{padding-left:auto;padding-right:0}[dir=rtl] .mdc-list-item--with-trailing-meta.mdc-list-item,.mdc-list-item--with-trailing-meta.mdc-list-item[dir=rtl]{padding-left:0;padding-right:auto}.mdc-list-item--with-trailing-meta .mdc-list-item__end{margin-left:28px;margin-right:16px}[dir=rtl] .mdc-list-item--with-trailing-meta .mdc-list-item__end,.mdc-list-item--with-trailing-meta .mdc-list-item__end[dir=rtl]{margin-left:16px;margin-right:28px}.mdc-list-item--with-trailing-meta.mdc-list-item--with-two-lines .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-trailing-meta.mdc-list-item--with-two-lines .mdc-list-item__end::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-trailing-meta.mdc-list-item--with-three-lines .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-trailing-meta.mdc-list-item--with-three-lines .mdc-list-item__end::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-trailing-meta .mdc-list-item__end{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:var(--mdc-typography-caption-font-family);font-size:var(--mdc-typography-caption-font-size);line-height:var(--mdc-typography-caption-line-height);font-weight:var(--mdc-typography-caption-font-weight);letter-spacing:var(--mdc-typography-caption-letter-spacing);text-decoration:var(--mdc-typography-caption-text-decoration);text-transform:var(--mdc-typography-caption-text-transform)}.mdc-list-item--with-trailing-checkbox.mdc-list-item{padding-left:auto;padding-right:0}[dir=rtl] .mdc-list-item--with-trailing-checkbox.mdc-list-item,.mdc-list-item--with-trailing-checkbox.mdc-list-item[dir=rtl]{padding-left:0;padding-right:auto}.mdc-list-item--with-trailing-checkbox .mdc-list-item__end{margin-left:24px;margin-right:8px}[dir=rtl] .mdc-list-item--with-trailing-checkbox .mdc-list-item__end,.mdc-list-item--with-trailing-checkbox .mdc-list-item__end[dir=rtl]{margin-left:8px;margin-right:24px}.mdc-list-item--with-trailing-checkbox.mdc-list-item--with-three-lines .mdc-list-item__end{align-self:flex-start;margin-top:8px}.mdc-list-item--with-trailing-radio.mdc-list-item{padding-left:auto;padding-right:0}[dir=rtl] .mdc-list-item--with-trailing-radio.mdc-list-item,.mdc-list-item--with-trailing-radio.mdc-list-item[dir=rtl]{padding-left:0;padding-right:auto}.mdc-list-item--with-trailing-radio .mdc-list-item__end{margin-left:24px;margin-right:8px}[dir=rtl] .mdc-list-item--with-trailing-radio .mdc-list-item__end,.mdc-list-item--with-trailing-radio .mdc-list-item__end[dir=rtl]{margin-left:8px;margin-right:24px}.mdc-list-item--with-trailing-radio.mdc-list-item--with-three-lines .mdc-list-item__end{align-self:flex-start;margin-top:8px}.mdc-list-item--with-trailing-switch.mdc-list-item{padding-left:auto;padding-right:0}[dir=rtl] .mdc-list-item--with-trailing-switch.mdc-list-item,.mdc-list-item--with-trailing-switch.mdc-list-item[dir=rtl]{padding-left:0;padding-right:auto}.mdc-list-item--with-trailing-switch .mdc-list-item__end{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-list-item--with-trailing-switch .mdc-list-item__end,.mdc-list-item--with-trailing-switch .mdc-list-item__end[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-list-item--with-trailing-switch.mdc-list-item--with-three-lines .mdc-list-item__end{align-self:flex-start;margin-top:16px}.mdc-list-item--with-overline.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-overline.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:20px;content:\"\";vertical-align:0}.mdc-list-item--with-overline.mdc-list-item--with-three-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-overline.mdc-list-item--with-three-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:20px;content:\"\";vertical-align:0}.mdc-list-item{padding-left:16px;padding-right:16px}[dir=rtl] .mdc-list-item,.mdc-list-item[dir=rtl]{padding-left:16px;padding-right:16px}.mdc-list-group .mdc-deprecated-list{padding:0}.mdc-list-group__subheader{margin:calc((3rem - 1.5rem)/2) 16px}.mdc-list-divider{padding:0;background-clip:content-box}.mdc-list-divider.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-text.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-icon.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-image.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-thumbnail.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-avatar.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-checkbox.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-switch.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-radio.mdc-list-divider--with-leading-inset{padding-left:16px;padding-right:auto}[dir=rtl] .mdc-list-divider.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-text.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-icon.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-image.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-thumbnail.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-avatar.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-checkbox.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-switch.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-radio.mdc-list-divider--with-leading-inset,.mdc-list-divider.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-text.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-icon.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-image.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-thumbnail.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-avatar.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-checkbox.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-switch.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-radio.mdc-list-divider--with-leading-inset[dir=rtl]{padding-left:auto;padding-right:16px}.mdc-list-divider.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-text.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-icon.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-image.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-thumbnail.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-avatar.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-checkbox.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-switch.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-radio.mdc-list-divider--with-trailing-inset{padding-left:auto;padding-right:16px}[dir=rtl] .mdc-list-divider.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-text.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-icon.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-image.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-thumbnail.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-avatar.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-checkbox.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-switch.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-radio.mdc-list-divider--with-trailing-inset,.mdc-list-divider.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-text.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-icon.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-image.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-thumbnail.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-avatar.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-checkbox.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-switch.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-radio.mdc-list-divider--with-trailing-inset[dir=rtl]{padding-left:16px;padding-right:auto}.mdc-list-divider--with-leading-video.mdc-list-divider--with-leading-inset{padding-left:0px;padding-right:auto}[dir=rtl] .mdc-list-divider--with-leading-video.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-video.mdc-list-divider--with-leading-inset[dir=rtl]{padding-left:auto;padding-right:0px}[dir=rtl] .mdc-list-divider,.mdc-list-divider[dir=rtl]{padding:0}.mdc-list-item{background-color:var(--mdc-list-list-item-container-color)}.mdc-list-item.mdc-list-item--selected{background-color:var(--mdc-list-list-item-selected-container-color)}.mdc-list-item--with-one-line{border-radius:var(--mdc-list-list-item-container-shape)}.mdc-list-item--with-one-line.mdc-list-item--with-leading-avatar,.mdc-list-item--with-one-line.mdc-list-item--with-leading-icon,.mdc-list-item--with-one-line.mdc-list-item--with-leading-thumbnail,.mdc-list-item--with-one-line.mdc-list-item--with-leading-checkbox,.mdc-list-item--with-one-line.mdc-list-item--with-leading-radio,.mdc-list-item--with-one-line.mdc-list-item--with-leading-switch{border-radius:var(--mdc-list-list-item-container-shape)}.mdc-list-item--with-one-line.mdc-list-item--with-leading-image,.mdc-list-item--with-one-line.mdc-list-item--with-leading-video{border-radius:var(--mdc-list-list-item-container-shape)}.mdc-list-item--with-two-lines{border-radius:var(--mdc-list-list-item-container-shape)}.mdc-list-item--with-two-lines.mdc-list-item--with-leading-avatar,.mdc-list-item--with-two-lines.mdc-list-item--with-leading-icon,.mdc-list-item--with-two-lines.mdc-list-item--with-leading-thumbnail,.mdc-list-item--with-two-lines.mdc-list-item--with-leading-checkbox,.mdc-list-item--with-two-lines.mdc-list-item--with-leading-radio,.mdc-list-item--with-two-lines.mdc-list-item--with-leading-switch,.mdc-list-item--with-two-lines.mdc-list-item--with-leading-image,.mdc-list-item--with-two-lines.mdc-list-item--with-leading-video{border-radius:var(--mdc-list-list-item-container-shape)}.mdc-list-item--with-three-lines{border-radius:var(--mdc-list-list-item-container-shape)}.mdc-list-item.mdc-list-item--with-one-line{height:var(--mdc-list-list-item-one-line-container-height)}.mdc-list-item.mdc-list-item--with-two-lines{height:var(--mdc-list-list-item-two-line-container-height)}.mdc-list-item.mdc-list-item--with-three-lines{height:var(--mdc-list-list-item-three-line-container-height)}.mdc-list-item__primary-text{color:var(--mdc-list-list-item-label-text-color)}.mdc-list-item__primary-text{font-family:var(--mdc-list-list-item-label-text-font);line-height:var(--mdc-list-list-item-label-text-line-height);font-size:var(--mdc-list-list-item-label-text-size);font-weight:var(--mdc-list-list-item-label-text-weight);letter-spacing:var(--mdc-list-list-item-label-text-tracking)}.mdc-list-item__secondary-text{color:var(--mdc-list-list-item-supporting-text-color)}.mdc-list-item__secondary-text{font-family:var(--mdc-list-list-item-supporting-text-font);line-height:var(--mdc-list-list-item-supporting-text-line-height);font-size:var(--mdc-list-list-item-supporting-text-size);font-weight:var(--mdc-list-list-item-supporting-text-weight);letter-spacing:var(--mdc-list-list-item-supporting-text-tracking)}.mdc-list-item--with-leading-icon .mdc-list-item__start{color:var(--mdc-list-list-item-leading-icon-color)}.mdc-list-item--with-leading-icon .mdc-list-item__start{width:var(--mdc-list-list-item-leading-icon-size);height:var(--mdc-list-list-item-leading-icon-size)}.mdc-list-item--with-leading-icon .mdc-list-item__start>i{font-size:var(--mdc-list-list-item-leading-icon-size)}.mdc-list-item--with-leading-icon .mdc-list-item__start .mdc-list-item__icon{font-size:var(--mdc-list-list-item-leading-icon-size);width:var(--mdc-list-list-item-leading-icon-size);height:var(--mdc-list-list-item-leading-icon-size)}.mdc-list-item--with-leading-icon .mdc-list-item__start .mdc-list-item__icon,.mdc-list-item--with-leading-icon .mdc-list-item__start .mdc-list-item__icon>.materialdesignWizIconSvgsSvgIcon{display:block}.mdc-list-item--with-leading-avatar .mdc-list-item__start{width:var(--mdc-list-list-item-leading-avatar-size);height:var(--mdc-list-list-item-leading-avatar-size)}.mdc-list-item.mdc-list-item--with-trailing-meta .mdc-list-item__end{color:var(--mdc-list-list-item-trailing-supporting-text-color)}.mdc-list-item--with-trailing-meta .mdc-list-item__end{font-family:var(--mdc-list-list-item-trailing-supporting-text-font);line-height:var(--mdc-list-list-item-trailing-supporting-text-line-height);font-size:var(--mdc-list-list-item-trailing-supporting-text-size);font-weight:var(--mdc-list-list-item-trailing-supporting-text-weight);letter-spacing:var(--mdc-list-list-item-trailing-supporting-text-tracking)}.mdc-list-item--with-trailing-icon .mdc-list-item__end{color:var(--mdc-list-list-item-trailing-icon-color)}.mdc-list-item--with-trailing-icon .mdc-list-item__end{width:var(--mdc-list-list-item-trailing-icon-size);height:var(--mdc-list-list-item-trailing-icon-size)}.mdc-list-item--with-trailing-icon .mdc-list-item__end>i{font-size:var(--mdc-list-list-item-trailing-icon-size)}.mdc-list-item--with-trailing-icon .mdc-list-item__end .mdc-list-item__icon{font-size:var(--mdc-list-list-item-trailing-icon-size);width:var(--mdc-list-list-item-trailing-icon-size);height:var(--mdc-list-list-item-trailing-icon-size)}.mdc-list-item--with-trailing-icon .mdc-list-item__end .mdc-list-item__icon,.mdc-list-item--with-trailing-icon .mdc-list-item__end .mdc-list-item__icon>.materialdesignWizIconSvgsSvgIcon{display:block}.mdc-list-item--selected.mdc-list-item--with-trailing-icon .mdc-list-item__end{color:var(--mdc-list-list-item-selected-trailing-icon-color)}.mdc-list-item--disabled .mdc-list-item__start,.mdc-list-item--disabled .mdc-list-item__content,.mdc-list-item--disabled .mdc-list-item__end{opacity:1}.mdc-list-item--disabled .mdc-list-item__primary-text,.mdc-list-item--disabled .mdc-list-item__secondary-text,.mdc-list-item--disabled .mdc-list-item__overline-text{opacity:var(--mdc-list-list-item-disabled-label-text-opacity)}.mdc-list-item--disabled.mdc-list-item--with-leading-icon .mdc-list-item__start{color:var(--mdc-list-list-item-disabled-leading-icon-color)}.mdc-list-item--disabled.mdc-list-item--with-leading-icon .mdc-list-item__start{opacity:var(--mdc-list-list-item-disabled-leading-icon-opacity)}.mdc-list-item--disabled.mdc-list-item--with-trailing-icon .mdc-list-item__end{color:var(--mdc-list-list-item-disabled-trailing-icon-color)}.mdc-list-item--disabled.mdc-list-item--with-trailing-icon .mdc-list-item__end{opacity:var(--mdc-list-list-item-disabled-trailing-icon-opacity)}.mdc-list-item:hover .mdc-list-item__primary-text{color:var(--mdc-list-list-item-hover-label-text-color)}.mdc-list-item--with-leading-icon:hover .mdc-list-item__start{color:var(--mdc-list-list-item-hover-leading-icon-color)}.mdc-list-item--with-trailing-icon:hover .mdc-list-item__end{color:var(--mdc-list-list-item-hover-trailing-icon-color)}.mdc-list-item:focus .mdc-list-item__primary-text{color:var(--mdc-list-list-item-focus-label-text-color)}.mdc-list-item.mdc-list-item--disabled .mdc-list-item__primary-text{color:var(--mdc-list-list-item-disabled-label-text-color)}.mdc-list-item:hover::before{background-color:var(--mdc-list-list-item-hover-state-layer-color);opacity:var(--mdc-list-list-item-hover-state-layer-opacity)}.mdc-list-item.mdc-list-item--disabled::before{background-color:var(--mdc-list-list-item-disabled-state-layer-color);opacity:var(--mdc-list-list-item-disabled-state-layer-opacity)}.mdc-list-item:focus::before{background-color:var(--mdc-list-list-item-focus-state-layer-color);opacity:var(--mdc-list-list-item-focus-state-layer-opacity)}.mdc-list-item--disabled .mdc-radio,.mdc-list-item--disabled .mdc-checkbox{opacity:var(--mdc-list-list-item-disabled-label-text-opacity)}.mdc-list-item--with-leading-avatar .mat-mdc-list-item-avatar{border-radius:var(--mdc-list-list-item-leading-avatar-shape);background-color:var(--mdc-list-list-item-leading-avatar-color)}.mat-mdc-list-base{--mdc-list-list-item-container-shape:0;--mdc-list-list-item-leading-avatar-shape:50%;--mdc-list-list-item-container-color:transparent;--mdc-list-list-item-selected-container-color:transparent;--mdc-list-list-item-leading-avatar-color:transparent;--mdc-list-list-item-leading-icon-size:24px;--mdc-list-list-item-leading-avatar-size:40px;--mdc-list-list-item-trailing-icon-size:24px;--mdc-list-list-item-disabled-state-layer-color:transparent;--mdc-list-list-item-disabled-state-layer-opacity:0;--mdc-list-list-item-disabled-label-text-opacity:0.38;--mdc-list-list-item-disabled-leading-icon-opacity:0.38;--mdc-list-list-item-disabled-trailing-icon-opacity:0.38}.cdk-high-contrast-active a.mdc-list-item--activated::after{content:\"\";position:absolute;top:50%;right:16px;transform:translateY(-50%);width:10px;height:0;border-bottom:solid 10px;border-radius:10px}.cdk-high-contrast-active a.mdc-list-item--activated [dir=rtl]::after{right:auto;left:16px}.mat-mdc-list-base{display:block}.mat-mdc-list-base .mdc-list-item__start,.mat-mdc-list-base .mdc-list-item__end,.mat-mdc-list-base .mdc-list-item__content{pointer-events:auto}.mat-mdc-list-item,.mat-mdc-list-option{width:100%;box-sizing:border-box;-webkit-tap-highlight-color:rgba(0,0,0,0)}.mat-mdc-list-item:not(.mat-mdc-list-item-interactive),.mat-mdc-list-option:not(.mat-mdc-list-item-interactive){cursor:default}.mat-mdc-list-item .mat-divider-inset,.mat-mdc-list-option .mat-divider-inset{position:absolute;left:0;right:0;bottom:0}.mat-mdc-list-item .mat-mdc-list-item-avatar~.mat-divider-inset,.mat-mdc-list-option .mat-mdc-list-item-avatar~.mat-divider-inset{margin-left:72px}[dir=rtl] .mat-mdc-list-item .mat-mdc-list-item-avatar~.mat-divider-inset,[dir=rtl] .mat-mdc-list-option .mat-mdc-list-item-avatar~.mat-divider-inset{margin-right:72px}.mat-mdc-list-item-interactive::before{top:0;left:0;right:0;bottom:0;position:absolute;content:\"\";opacity:0;pointer-events:none}.mat-mdc-list-item>.mat-mdc-focus-indicator{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none}.mat-mdc-list-item:focus>.mat-mdc-focus-indicator::before{content:\"\"}.mat-mdc-list-item.mdc-list-item--with-three-lines .mat-mdc-list-item-line.mdc-list-item__secondary-text{white-space:nowrap;line-height:normal}.mat-mdc-list-item.mdc-list-item--with-three-lines .mat-mdc-list-item-unscoped-content.mdc-list-item__secondary-text{display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2}mat-action-list button{background:none;color:inherit;border:none;font:inherit;outline:inherit;-webkit-tap-highlight-color:rgba(0,0,0,0);text-align:left}[dir=rtl] mat-action-list button{text-align:right}mat-action-list button::-moz-focus-inner{border:0}"],
  encapsulation: 2,
  changeDetection: 0
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MatActionList, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Component,
    args: [{
      selector: 'mat-action-list',
      exportAs: 'matActionList',
      template: '<ng-content></ng-content>',
      host: {
        'class': 'mat-mdc-action-list mat-mdc-list-base mdc-list',
        'role': 'group'
      },
      encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewEncapsulation.None,
      changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectionStrategy.OnPush,
      providers: [{
        provide: MatListBase,
        useExisting: MatActionList
      }],
      styles: ["@media screen and (forced-colors: active),(-ms-high-contrast: active){.mdc-list-divider::after{content:\"\";display:block;border-bottom-width:1px;border-bottom-style:solid}}.mdc-list{margin:0;padding:8px 0;list-style-type:none}.mdc-list:focus{outline:none}.mdc-list-item__wrapper{display:block}.mdc-list-item{display:flex;position:relative;align-items:center;justify-content:flex-start;overflow:hidden;padding:0;align-items:stretch;cursor:pointer}.mdc-list-item:focus{outline:none}.mdc-list-item.mdc-list-item--with-one-line{height:48px}.mdc-list-item.mdc-list-item--with-two-lines{height:64px}.mdc-list-item.mdc-list-item--with-three-lines{height:88px}.mdc-list-item.mdc-list-item--with-one-line .mdc-list-item__start{align-self:center;margin-top:0}.mdc-list-item.mdc-list-item--with-two-lines .mdc-list-item__start{align-self:flex-start;margin-top:16px}.mdc-list-item.mdc-list-item--with-three-lines .mdc-list-item__start{align-self:flex-start;margin-top:16px}.mdc-list-item.mdc-list-item--with-one-line .mdc-list-item__end{align-self:center;margin-top:0}.mdc-list-item.mdc-list-item--with-two-lines .mdc-list-item__end{align-self:center;margin-top:0}.mdc-list-item.mdc-list-item--with-three-lines .mdc-list-item__end{align-self:flex-start;margin-top:16px}.mdc-list-item.mdc-list-item--disabled,.mdc-list-item.mdc-list-item--non-interactive{cursor:auto}.mdc-list-item:not(.mdc-list-item--selected):focus::before,.mdc-list-item.mdc-ripple-upgraded--background-focused::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:1px solid rgba(0,0,0,0);border-radius:inherit;content:\"\";pointer-events:none}@media screen and (forced-colors: active){.mdc-list-item:not(.mdc-list-item--selected):focus::before,.mdc-list-item.mdc-ripple-upgraded--background-focused::before{border-color:CanvasText}}.mdc-list-item.mdc-list-item--selected::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:3px double rgba(0,0,0,0);border-radius:inherit;content:\"\";pointer-events:none}@media screen and (forced-colors: active){.mdc-list-item.mdc-list-item--selected::before{border-color:CanvasText}}.mdc-list-item.mdc-list-item--selected:focus::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:3px solid rgba(0,0,0,0);border-radius:inherit;content:\"\";pointer-events:none}@media screen and (forced-colors: active){.mdc-list-item.mdc-list-item--selected:focus::before{border-color:CanvasText}}a.mdc-list-item{color:inherit;text-decoration:none}.mdc-list-item__start{fill:currentColor;flex-shrink:0;pointer-events:none}.mdc-list-item__end{flex-shrink:0;pointer-events:none}.mdc-list-item__content{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;align-self:center;flex:1;pointer-events:none}.mdc-list-item--with-two-lines .mdc-list-item__content,.mdc-list-item--with-three-lines .mdc-list-item__content{align-self:stretch}.mdc-list-item__content[for]{pointer-events:none}.mdc-list-item__primary-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.mdc-list-item--with-two-lines .mdc-list-item__primary-text,.mdc-list-item--with-three-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before,.mdc-list-item--with-three-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after,.mdc-list-item--with-three-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item__secondary-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;display:block;margin-top:0;line-height:normal}.mdc-list-item__secondary-text::before{display:inline-block;width:0;height:20px;content:\"\";vertical-align:0}.mdc-list-item--with-three-lines .mdc-list-item__secondary-text{white-space:normal;line-height:20px}.mdc-list-item--with-overline .mdc-list-item__secondary-text{white-space:nowrap;line-height:auto}.mdc-list-item__overline-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.mdc-list-item--with-two-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-two-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:24px;content:\"\";vertical-align:0}.mdc-list-item--with-two-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-three-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-three-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-three-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-avatar.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-avatar.mdc-list-item,.mdc-list-item--with-leading-avatar.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-avatar .mdc-list-item__start{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-list-item--with-leading-avatar .mdc-list-item__start,.mdc-list-item--with-leading-avatar .mdc-list-item__start[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-avatar.mdc-list-item--with-one-line{height:56px}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-avatar .mdc-list-item__start{border-radius:50%}.mdc-list-item--with-leading-icon.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-icon.mdc-list-item,.mdc-list-item--with-leading-icon.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-icon .mdc-list-item__start{margin-left:16px;margin-right:32px}[dir=rtl] .mdc-list-item--with-leading-icon .mdc-list-item__start,.mdc-list-item--with-leading-icon .mdc-list-item__start[dir=rtl]{margin-left:32px;margin-right:16px}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-icon.mdc-list-item--with-one-line{height:56px}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-thumbnail.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-thumbnail.mdc-list-item,.mdc-list-item--with-leading-thumbnail.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-thumbnail .mdc-list-item__start{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-list-item--with-leading-thumbnail .mdc-list-item__start,.mdc-list-item--with-leading-thumbnail .mdc-list-item__start[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-one-line{height:56px}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-image.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-image.mdc-list-item,.mdc-list-item--with-leading-image.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-image .mdc-list-item__start{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-list-item--with-leading-image .mdc-list-item__start,.mdc-list-item--with-leading-image .mdc-list-item__start[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-image.mdc-list-item--with-one-line{height:72px}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines .mdc-list-item__start{align-self:flex-start;margin-top:8px}.mdc-list-item--with-leading-video.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-video.mdc-list-item,.mdc-list-item--with-leading-video.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-video .mdc-list-item__start{margin-left:0;margin-right:16px}[dir=rtl] .mdc-list-item--with-leading-video .mdc-list-item__start,.mdc-list-item--with-leading-video .mdc-list-item__start[dir=rtl]{margin-left:16px;margin-right:0}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-video.mdc-list-item--with-one-line{height:72px}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-checkbox.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-checkbox.mdc-list-item,.mdc-list-item--with-leading-checkbox.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-checkbox .mdc-list-item__start{margin-left:8px;margin-right:24px}[dir=rtl] .mdc-list-item--with-leading-checkbox .mdc-list-item__start,.mdc-list-item--with-leading-checkbox .mdc-list-item__start[dir=rtl]{margin-left:24px;margin-right:8px}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__start{align-self:flex-start;margin-top:8px}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-one-line{height:56px}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-radio.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-radio.mdc-list-item,.mdc-list-item--with-leading-radio.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-radio .mdc-list-item__start{margin-left:8px;margin-right:24px}[dir=rtl] .mdc-list-item--with-leading-radio .mdc-list-item__start,.mdc-list-item--with-leading-radio .mdc-list-item__start[dir=rtl]{margin-left:24px;margin-right:8px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__start{align-self:flex-start;margin-top:8px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-radio.mdc-list-item--with-one-line{height:56px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-switch.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-switch.mdc-list-item,.mdc-list-item--with-leading-switch.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-switch .mdc-list-item__start{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-list-item--with-leading-switch .mdc-list-item__start,.mdc-list-item--with-leading-switch .mdc-list-item__start[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines .mdc-list-item__start{align-self:flex-start;margin-top:16px}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-switch.mdc-list-item--with-one-line{height:56px}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-trailing-icon.mdc-list-item{padding-left:auto;padding-right:0}[dir=rtl] .mdc-list-item--with-trailing-icon.mdc-list-item,.mdc-list-item--with-trailing-icon.mdc-list-item[dir=rtl]{padding-left:0;padding-right:auto}.mdc-list-item--with-trailing-icon .mdc-list-item__end{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-list-item--with-trailing-icon .mdc-list-item__end,.mdc-list-item--with-trailing-icon .mdc-list-item__end[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-list-item--with-trailing-meta.mdc-list-item--with-two-lines .mdc-list-item__end{align-self:flex-start;margin-top:0}.mdc-list-item--with-trailing-meta.mdc-list-item--with-three-lines .mdc-list-item__end{align-self:flex-start;margin-top:0}.mdc-list-item--with-trailing-meta.mdc-list-item{padding-left:auto;padding-right:0}[dir=rtl] .mdc-list-item--with-trailing-meta.mdc-list-item,.mdc-list-item--with-trailing-meta.mdc-list-item[dir=rtl]{padding-left:0;padding-right:auto}.mdc-list-item--with-trailing-meta .mdc-list-item__end{margin-left:28px;margin-right:16px}[dir=rtl] .mdc-list-item--with-trailing-meta .mdc-list-item__end,.mdc-list-item--with-trailing-meta .mdc-list-item__end[dir=rtl]{margin-left:16px;margin-right:28px}.mdc-list-item--with-trailing-meta.mdc-list-item--with-two-lines .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-trailing-meta.mdc-list-item--with-two-lines .mdc-list-item__end::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-trailing-meta.mdc-list-item--with-three-lines .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-trailing-meta.mdc-list-item--with-three-lines .mdc-list-item__end::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-trailing-meta .mdc-list-item__end{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:var(--mdc-typography-caption-font-family);font-size:var(--mdc-typography-caption-font-size);line-height:var(--mdc-typography-caption-line-height);font-weight:var(--mdc-typography-caption-font-weight);letter-spacing:var(--mdc-typography-caption-letter-spacing);text-decoration:var(--mdc-typography-caption-text-decoration);text-transform:var(--mdc-typography-caption-text-transform)}.mdc-list-item--with-trailing-checkbox.mdc-list-item{padding-left:auto;padding-right:0}[dir=rtl] .mdc-list-item--with-trailing-checkbox.mdc-list-item,.mdc-list-item--with-trailing-checkbox.mdc-list-item[dir=rtl]{padding-left:0;padding-right:auto}.mdc-list-item--with-trailing-checkbox .mdc-list-item__end{margin-left:24px;margin-right:8px}[dir=rtl] .mdc-list-item--with-trailing-checkbox .mdc-list-item__end,.mdc-list-item--with-trailing-checkbox .mdc-list-item__end[dir=rtl]{margin-left:8px;margin-right:24px}.mdc-list-item--with-trailing-checkbox.mdc-list-item--with-three-lines .mdc-list-item__end{align-self:flex-start;margin-top:8px}.mdc-list-item--with-trailing-radio.mdc-list-item{padding-left:auto;padding-right:0}[dir=rtl] .mdc-list-item--with-trailing-radio.mdc-list-item,.mdc-list-item--with-trailing-radio.mdc-list-item[dir=rtl]{padding-left:0;padding-right:auto}.mdc-list-item--with-trailing-radio .mdc-list-item__end{margin-left:24px;margin-right:8px}[dir=rtl] .mdc-list-item--with-trailing-radio .mdc-list-item__end,.mdc-list-item--with-trailing-radio .mdc-list-item__end[dir=rtl]{margin-left:8px;margin-right:24px}.mdc-list-item--with-trailing-radio.mdc-list-item--with-three-lines .mdc-list-item__end{align-self:flex-start;margin-top:8px}.mdc-list-item--with-trailing-switch.mdc-list-item{padding-left:auto;padding-right:0}[dir=rtl] .mdc-list-item--with-trailing-switch.mdc-list-item,.mdc-list-item--with-trailing-switch.mdc-list-item[dir=rtl]{padding-left:0;padding-right:auto}.mdc-list-item--with-trailing-switch .mdc-list-item__end{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-list-item--with-trailing-switch .mdc-list-item__end,.mdc-list-item--with-trailing-switch .mdc-list-item__end[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-list-item--with-trailing-switch.mdc-list-item--with-three-lines .mdc-list-item__end{align-self:flex-start;margin-top:16px}.mdc-list-item--with-overline.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-overline.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:20px;content:\"\";vertical-align:0}.mdc-list-item--with-overline.mdc-list-item--with-three-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-overline.mdc-list-item--with-three-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:20px;content:\"\";vertical-align:0}.mdc-list-item{padding-left:16px;padding-right:16px}[dir=rtl] .mdc-list-item,.mdc-list-item[dir=rtl]{padding-left:16px;padding-right:16px}.mdc-list-group .mdc-deprecated-list{padding:0}.mdc-list-group__subheader{margin:calc((3rem - 1.5rem)/2) 16px}.mdc-list-divider{padding:0;background-clip:content-box}.mdc-list-divider.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-text.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-icon.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-image.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-thumbnail.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-avatar.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-checkbox.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-switch.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-radio.mdc-list-divider--with-leading-inset{padding-left:16px;padding-right:auto}[dir=rtl] .mdc-list-divider.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-text.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-icon.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-image.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-thumbnail.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-avatar.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-checkbox.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-switch.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-radio.mdc-list-divider--with-leading-inset,.mdc-list-divider.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-text.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-icon.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-image.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-thumbnail.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-avatar.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-checkbox.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-switch.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-radio.mdc-list-divider--with-leading-inset[dir=rtl]{padding-left:auto;padding-right:16px}.mdc-list-divider.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-text.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-icon.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-image.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-thumbnail.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-avatar.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-checkbox.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-switch.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-radio.mdc-list-divider--with-trailing-inset{padding-left:auto;padding-right:16px}[dir=rtl] .mdc-list-divider.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-text.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-icon.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-image.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-thumbnail.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-avatar.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-checkbox.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-switch.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-radio.mdc-list-divider--with-trailing-inset,.mdc-list-divider.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-text.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-icon.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-image.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-thumbnail.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-avatar.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-checkbox.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-switch.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-radio.mdc-list-divider--with-trailing-inset[dir=rtl]{padding-left:16px;padding-right:auto}.mdc-list-divider--with-leading-video.mdc-list-divider--with-leading-inset{padding-left:0px;padding-right:auto}[dir=rtl] .mdc-list-divider--with-leading-video.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-video.mdc-list-divider--with-leading-inset[dir=rtl]{padding-left:auto;padding-right:0px}[dir=rtl] .mdc-list-divider,.mdc-list-divider[dir=rtl]{padding:0}.mdc-list-item{background-color:var(--mdc-list-list-item-container-color)}.mdc-list-item.mdc-list-item--selected{background-color:var(--mdc-list-list-item-selected-container-color)}.mdc-list-item--with-one-line{border-radius:var(--mdc-list-list-item-container-shape)}.mdc-list-item--with-one-line.mdc-list-item--with-leading-avatar,.mdc-list-item--with-one-line.mdc-list-item--with-leading-icon,.mdc-list-item--with-one-line.mdc-list-item--with-leading-thumbnail,.mdc-list-item--with-one-line.mdc-list-item--with-leading-checkbox,.mdc-list-item--with-one-line.mdc-list-item--with-leading-radio,.mdc-list-item--with-one-line.mdc-list-item--with-leading-switch{border-radius:var(--mdc-list-list-item-container-shape)}.mdc-list-item--with-one-line.mdc-list-item--with-leading-image,.mdc-list-item--with-one-line.mdc-list-item--with-leading-video{border-radius:var(--mdc-list-list-item-container-shape)}.mdc-list-item--with-two-lines{border-radius:var(--mdc-list-list-item-container-shape)}.mdc-list-item--with-two-lines.mdc-list-item--with-leading-avatar,.mdc-list-item--with-two-lines.mdc-list-item--with-leading-icon,.mdc-list-item--with-two-lines.mdc-list-item--with-leading-thumbnail,.mdc-list-item--with-two-lines.mdc-list-item--with-leading-checkbox,.mdc-list-item--with-two-lines.mdc-list-item--with-leading-radio,.mdc-list-item--with-two-lines.mdc-list-item--with-leading-switch,.mdc-list-item--with-two-lines.mdc-list-item--with-leading-image,.mdc-list-item--with-two-lines.mdc-list-item--with-leading-video{border-radius:var(--mdc-list-list-item-container-shape)}.mdc-list-item--with-three-lines{border-radius:var(--mdc-list-list-item-container-shape)}.mdc-list-item.mdc-list-item--with-one-line{height:var(--mdc-list-list-item-one-line-container-height)}.mdc-list-item.mdc-list-item--with-two-lines{height:var(--mdc-list-list-item-two-line-container-height)}.mdc-list-item.mdc-list-item--with-three-lines{height:var(--mdc-list-list-item-three-line-container-height)}.mdc-list-item__primary-text{color:var(--mdc-list-list-item-label-text-color)}.mdc-list-item__primary-text{font-family:var(--mdc-list-list-item-label-text-font);line-height:var(--mdc-list-list-item-label-text-line-height);font-size:var(--mdc-list-list-item-label-text-size);font-weight:var(--mdc-list-list-item-label-text-weight);letter-spacing:var(--mdc-list-list-item-label-text-tracking)}.mdc-list-item__secondary-text{color:var(--mdc-list-list-item-supporting-text-color)}.mdc-list-item__secondary-text{font-family:var(--mdc-list-list-item-supporting-text-font);line-height:var(--mdc-list-list-item-supporting-text-line-height);font-size:var(--mdc-list-list-item-supporting-text-size);font-weight:var(--mdc-list-list-item-supporting-text-weight);letter-spacing:var(--mdc-list-list-item-supporting-text-tracking)}.mdc-list-item--with-leading-icon .mdc-list-item__start{color:var(--mdc-list-list-item-leading-icon-color)}.mdc-list-item--with-leading-icon .mdc-list-item__start{width:var(--mdc-list-list-item-leading-icon-size);height:var(--mdc-list-list-item-leading-icon-size)}.mdc-list-item--with-leading-icon .mdc-list-item__start>i{font-size:var(--mdc-list-list-item-leading-icon-size)}.mdc-list-item--with-leading-icon .mdc-list-item__start .mdc-list-item__icon{font-size:var(--mdc-list-list-item-leading-icon-size);width:var(--mdc-list-list-item-leading-icon-size);height:var(--mdc-list-list-item-leading-icon-size)}.mdc-list-item--with-leading-icon .mdc-list-item__start .mdc-list-item__icon,.mdc-list-item--with-leading-icon .mdc-list-item__start .mdc-list-item__icon>.materialdesignWizIconSvgsSvgIcon{display:block}.mdc-list-item--with-leading-avatar .mdc-list-item__start{width:var(--mdc-list-list-item-leading-avatar-size);height:var(--mdc-list-list-item-leading-avatar-size)}.mdc-list-item.mdc-list-item--with-trailing-meta .mdc-list-item__end{color:var(--mdc-list-list-item-trailing-supporting-text-color)}.mdc-list-item--with-trailing-meta .mdc-list-item__end{font-family:var(--mdc-list-list-item-trailing-supporting-text-font);line-height:var(--mdc-list-list-item-trailing-supporting-text-line-height);font-size:var(--mdc-list-list-item-trailing-supporting-text-size);font-weight:var(--mdc-list-list-item-trailing-supporting-text-weight);letter-spacing:var(--mdc-list-list-item-trailing-supporting-text-tracking)}.mdc-list-item--with-trailing-icon .mdc-list-item__end{color:var(--mdc-list-list-item-trailing-icon-color)}.mdc-list-item--with-trailing-icon .mdc-list-item__end{width:var(--mdc-list-list-item-trailing-icon-size);height:var(--mdc-list-list-item-trailing-icon-size)}.mdc-list-item--with-trailing-icon .mdc-list-item__end>i{font-size:var(--mdc-list-list-item-trailing-icon-size)}.mdc-list-item--with-trailing-icon .mdc-list-item__end .mdc-list-item__icon{font-size:var(--mdc-list-list-item-trailing-icon-size);width:var(--mdc-list-list-item-trailing-icon-size);height:var(--mdc-list-list-item-trailing-icon-size)}.mdc-list-item--with-trailing-icon .mdc-list-item__end .mdc-list-item__icon,.mdc-list-item--with-trailing-icon .mdc-list-item__end .mdc-list-item__icon>.materialdesignWizIconSvgsSvgIcon{display:block}.mdc-list-item--selected.mdc-list-item--with-trailing-icon .mdc-list-item__end{color:var(--mdc-list-list-item-selected-trailing-icon-color)}.mdc-list-item--disabled .mdc-list-item__start,.mdc-list-item--disabled .mdc-list-item__content,.mdc-list-item--disabled .mdc-list-item__end{opacity:1}.mdc-list-item--disabled .mdc-list-item__primary-text,.mdc-list-item--disabled .mdc-list-item__secondary-text,.mdc-list-item--disabled .mdc-list-item__overline-text{opacity:var(--mdc-list-list-item-disabled-label-text-opacity)}.mdc-list-item--disabled.mdc-list-item--with-leading-icon .mdc-list-item__start{color:var(--mdc-list-list-item-disabled-leading-icon-color)}.mdc-list-item--disabled.mdc-list-item--with-leading-icon .mdc-list-item__start{opacity:var(--mdc-list-list-item-disabled-leading-icon-opacity)}.mdc-list-item--disabled.mdc-list-item--with-trailing-icon .mdc-list-item__end{color:var(--mdc-list-list-item-disabled-trailing-icon-color)}.mdc-list-item--disabled.mdc-list-item--with-trailing-icon .mdc-list-item__end{opacity:var(--mdc-list-list-item-disabled-trailing-icon-opacity)}.mdc-list-item:hover .mdc-list-item__primary-text{color:var(--mdc-list-list-item-hover-label-text-color)}.mdc-list-item--with-leading-icon:hover .mdc-list-item__start{color:var(--mdc-list-list-item-hover-leading-icon-color)}.mdc-list-item--with-trailing-icon:hover .mdc-list-item__end{color:var(--mdc-list-list-item-hover-trailing-icon-color)}.mdc-list-item:focus .mdc-list-item__primary-text{color:var(--mdc-list-list-item-focus-label-text-color)}.mdc-list-item.mdc-list-item--disabled .mdc-list-item__primary-text{color:var(--mdc-list-list-item-disabled-label-text-color)}.mdc-list-item:hover::before{background-color:var(--mdc-list-list-item-hover-state-layer-color);opacity:var(--mdc-list-list-item-hover-state-layer-opacity)}.mdc-list-item.mdc-list-item--disabled::before{background-color:var(--mdc-list-list-item-disabled-state-layer-color);opacity:var(--mdc-list-list-item-disabled-state-layer-opacity)}.mdc-list-item:focus::before{background-color:var(--mdc-list-list-item-focus-state-layer-color);opacity:var(--mdc-list-list-item-focus-state-layer-opacity)}.mdc-list-item--disabled .mdc-radio,.mdc-list-item--disabled .mdc-checkbox{opacity:var(--mdc-list-list-item-disabled-label-text-opacity)}.mdc-list-item--with-leading-avatar .mat-mdc-list-item-avatar{border-radius:var(--mdc-list-list-item-leading-avatar-shape);background-color:var(--mdc-list-list-item-leading-avatar-color)}.mat-mdc-list-base{--mdc-list-list-item-container-shape:0;--mdc-list-list-item-leading-avatar-shape:50%;--mdc-list-list-item-container-color:transparent;--mdc-list-list-item-selected-container-color:transparent;--mdc-list-list-item-leading-avatar-color:transparent;--mdc-list-list-item-leading-icon-size:24px;--mdc-list-list-item-leading-avatar-size:40px;--mdc-list-list-item-trailing-icon-size:24px;--mdc-list-list-item-disabled-state-layer-color:transparent;--mdc-list-list-item-disabled-state-layer-opacity:0;--mdc-list-list-item-disabled-label-text-opacity:0.38;--mdc-list-list-item-disabled-leading-icon-opacity:0.38;--mdc-list-list-item-disabled-trailing-icon-opacity:0.38}.cdk-high-contrast-active a.mdc-list-item--activated::after{content:\"\";position:absolute;top:50%;right:16px;transform:translateY(-50%);width:10px;height:0;border-bottom:solid 10px;border-radius:10px}.cdk-high-contrast-active a.mdc-list-item--activated [dir=rtl]::after{right:auto;left:16px}.mat-mdc-list-base{display:block}.mat-mdc-list-base .mdc-list-item__start,.mat-mdc-list-base .mdc-list-item__end,.mat-mdc-list-base .mdc-list-item__content{pointer-events:auto}.mat-mdc-list-item,.mat-mdc-list-option{width:100%;box-sizing:border-box;-webkit-tap-highlight-color:rgba(0,0,0,0)}.mat-mdc-list-item:not(.mat-mdc-list-item-interactive),.mat-mdc-list-option:not(.mat-mdc-list-item-interactive){cursor:default}.mat-mdc-list-item .mat-divider-inset,.mat-mdc-list-option .mat-divider-inset{position:absolute;left:0;right:0;bottom:0}.mat-mdc-list-item .mat-mdc-list-item-avatar~.mat-divider-inset,.mat-mdc-list-option .mat-mdc-list-item-avatar~.mat-divider-inset{margin-left:72px}[dir=rtl] .mat-mdc-list-item .mat-mdc-list-item-avatar~.mat-divider-inset,[dir=rtl] .mat-mdc-list-option .mat-mdc-list-item-avatar~.mat-divider-inset{margin-right:72px}.mat-mdc-list-item-interactive::before{top:0;left:0;right:0;bottom:0;position:absolute;content:\"\";opacity:0;pointer-events:none}.mat-mdc-list-item>.mat-mdc-focus-indicator{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none}.mat-mdc-list-item:focus>.mat-mdc-focus-indicator::before{content:\"\"}.mat-mdc-list-item.mdc-list-item--with-three-lines .mat-mdc-list-item-line.mdc-list-item__secondary-text{white-space:nowrap;line-height:normal}.mat-mdc-list-item.mdc-list-item--with-three-lines .mat-mdc-list-item-unscoped-content.mdc-list-item__secondary-text{display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2}mat-action-list button{background:none;color:inherit;border:none;font:inherit;outline:inherit;-webkit-tap-highlight-color:rgba(0,0,0,0);text-align:left}[dir=rtl] mat-action-list button{text-align:right}mat-action-list button::-moz-focus-inner{border:0}"]
    }]
  }], null, null);
})();

/**
 * Injection token that can be used to inject instances of `MatList`. It serves as
 * alternative token to the actual `MatList` class which could cause unnecessary
 * retention of the class and its component metadata.
 */
const MAT_LIST = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken('MatList');
class MatList extends MatListBase {}
_class10 = MatList;
_class10.ɵfac = /* @__PURE__ */function () {
  let ɵ_class10_BaseFactory;
  return function _class10_Factory(t) {
    return (ɵ_class10_BaseFactory || (ɵ_class10_BaseFactory = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetInheritedFactory"](_class10)))(t || _class10);
  };
}();
_class10.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: _class10,
  selectors: [["mat-list"]],
  hostAttrs: [1, "mat-mdc-list", "mat-mdc-list-base", "mdc-list"],
  exportAs: ["matList"],
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([{
    provide: MatListBase,
    useExisting: _class10
  }]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]],
  ngContentSelectors: _c0,
  decls: 1,
  vars: 0,
  template: function _class10_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojectionDef"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](0);
    }
  },
  styles: [_c1],
  encapsulation: 2,
  changeDetection: 0
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MatList, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Component,
    args: [{
      selector: 'mat-list',
      exportAs: 'matList',
      template: '<ng-content></ng-content>',
      host: {
        'class': 'mat-mdc-list mat-mdc-list-base mdc-list'
      },
      encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewEncapsulation.None,
      changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectionStrategy.OnPush,
      providers: [{
        provide: MatListBase,
        useExisting: MatList
      }],
      styles: ["@media screen and (forced-colors: active),(-ms-high-contrast: active){.mdc-list-divider::after{content:\"\";display:block;border-bottom-width:1px;border-bottom-style:solid}}.mdc-list{margin:0;padding:8px 0;list-style-type:none}.mdc-list:focus{outline:none}.mdc-list-item__wrapper{display:block}.mdc-list-item{display:flex;position:relative;align-items:center;justify-content:flex-start;overflow:hidden;padding:0;align-items:stretch;cursor:pointer}.mdc-list-item:focus{outline:none}.mdc-list-item.mdc-list-item--with-one-line{height:48px}.mdc-list-item.mdc-list-item--with-two-lines{height:64px}.mdc-list-item.mdc-list-item--with-three-lines{height:88px}.mdc-list-item.mdc-list-item--with-one-line .mdc-list-item__start{align-self:center;margin-top:0}.mdc-list-item.mdc-list-item--with-two-lines .mdc-list-item__start{align-self:flex-start;margin-top:16px}.mdc-list-item.mdc-list-item--with-three-lines .mdc-list-item__start{align-self:flex-start;margin-top:16px}.mdc-list-item.mdc-list-item--with-one-line .mdc-list-item__end{align-self:center;margin-top:0}.mdc-list-item.mdc-list-item--with-two-lines .mdc-list-item__end{align-self:center;margin-top:0}.mdc-list-item.mdc-list-item--with-three-lines .mdc-list-item__end{align-self:flex-start;margin-top:16px}.mdc-list-item.mdc-list-item--disabled,.mdc-list-item.mdc-list-item--non-interactive{cursor:auto}.mdc-list-item:not(.mdc-list-item--selected):focus::before,.mdc-list-item.mdc-ripple-upgraded--background-focused::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:1px solid rgba(0,0,0,0);border-radius:inherit;content:\"\";pointer-events:none}@media screen and (forced-colors: active){.mdc-list-item:not(.mdc-list-item--selected):focus::before,.mdc-list-item.mdc-ripple-upgraded--background-focused::before{border-color:CanvasText}}.mdc-list-item.mdc-list-item--selected::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:3px double rgba(0,0,0,0);border-radius:inherit;content:\"\";pointer-events:none}@media screen and (forced-colors: active){.mdc-list-item.mdc-list-item--selected::before{border-color:CanvasText}}.mdc-list-item.mdc-list-item--selected:focus::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:3px solid rgba(0,0,0,0);border-radius:inherit;content:\"\";pointer-events:none}@media screen and (forced-colors: active){.mdc-list-item.mdc-list-item--selected:focus::before{border-color:CanvasText}}a.mdc-list-item{color:inherit;text-decoration:none}.mdc-list-item__start{fill:currentColor;flex-shrink:0;pointer-events:none}.mdc-list-item__end{flex-shrink:0;pointer-events:none}.mdc-list-item__content{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;align-self:center;flex:1;pointer-events:none}.mdc-list-item--with-two-lines .mdc-list-item__content,.mdc-list-item--with-three-lines .mdc-list-item__content{align-self:stretch}.mdc-list-item__content[for]{pointer-events:none}.mdc-list-item__primary-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.mdc-list-item--with-two-lines .mdc-list-item__primary-text,.mdc-list-item--with-three-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before,.mdc-list-item--with-three-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after,.mdc-list-item--with-three-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item__secondary-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;display:block;margin-top:0;line-height:normal}.mdc-list-item__secondary-text::before{display:inline-block;width:0;height:20px;content:\"\";vertical-align:0}.mdc-list-item--with-three-lines .mdc-list-item__secondary-text{white-space:normal;line-height:20px}.mdc-list-item--with-overline .mdc-list-item__secondary-text{white-space:nowrap;line-height:auto}.mdc-list-item__overline-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.mdc-list-item--with-two-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-two-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:24px;content:\"\";vertical-align:0}.mdc-list-item--with-two-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-three-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-three-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-three-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-avatar.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-avatar.mdc-list-item,.mdc-list-item--with-leading-avatar.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-avatar .mdc-list-item__start{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-list-item--with-leading-avatar .mdc-list-item__start,.mdc-list-item--with-leading-avatar .mdc-list-item__start[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-avatar.mdc-list-item--with-one-line{height:56px}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-avatar .mdc-list-item__start{border-radius:50%}.mdc-list-item--with-leading-icon.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-icon.mdc-list-item,.mdc-list-item--with-leading-icon.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-icon .mdc-list-item__start{margin-left:16px;margin-right:32px}[dir=rtl] .mdc-list-item--with-leading-icon .mdc-list-item__start,.mdc-list-item--with-leading-icon .mdc-list-item__start[dir=rtl]{margin-left:32px;margin-right:16px}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-icon.mdc-list-item--with-one-line{height:56px}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-thumbnail.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-thumbnail.mdc-list-item,.mdc-list-item--with-leading-thumbnail.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-thumbnail .mdc-list-item__start{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-list-item--with-leading-thumbnail .mdc-list-item__start,.mdc-list-item--with-leading-thumbnail .mdc-list-item__start[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-one-line{height:56px}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-image.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-image.mdc-list-item,.mdc-list-item--with-leading-image.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-image .mdc-list-item__start{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-list-item--with-leading-image .mdc-list-item__start,.mdc-list-item--with-leading-image .mdc-list-item__start[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-image.mdc-list-item--with-one-line{height:72px}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines .mdc-list-item__start{align-self:flex-start;margin-top:8px}.mdc-list-item--with-leading-video.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-video.mdc-list-item,.mdc-list-item--with-leading-video.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-video .mdc-list-item__start{margin-left:0;margin-right:16px}[dir=rtl] .mdc-list-item--with-leading-video .mdc-list-item__start,.mdc-list-item--with-leading-video .mdc-list-item__start[dir=rtl]{margin-left:16px;margin-right:0}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-video.mdc-list-item--with-one-line{height:72px}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-checkbox.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-checkbox.mdc-list-item,.mdc-list-item--with-leading-checkbox.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-checkbox .mdc-list-item__start{margin-left:8px;margin-right:24px}[dir=rtl] .mdc-list-item--with-leading-checkbox .mdc-list-item__start,.mdc-list-item--with-leading-checkbox .mdc-list-item__start[dir=rtl]{margin-left:24px;margin-right:8px}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__start{align-self:flex-start;margin-top:8px}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-one-line{height:56px}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-radio.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-radio.mdc-list-item,.mdc-list-item--with-leading-radio.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-radio .mdc-list-item__start{margin-left:8px;margin-right:24px}[dir=rtl] .mdc-list-item--with-leading-radio .mdc-list-item__start,.mdc-list-item--with-leading-radio .mdc-list-item__start[dir=rtl]{margin-left:24px;margin-right:8px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__start{align-self:flex-start;margin-top:8px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-radio.mdc-list-item--with-one-line{height:56px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-switch.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-switch.mdc-list-item,.mdc-list-item--with-leading-switch.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-switch .mdc-list-item__start{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-list-item--with-leading-switch .mdc-list-item__start,.mdc-list-item--with-leading-switch .mdc-list-item__start[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines .mdc-list-item__start{align-self:flex-start;margin-top:16px}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-switch.mdc-list-item--with-one-line{height:56px}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-trailing-icon.mdc-list-item{padding-left:auto;padding-right:0}[dir=rtl] .mdc-list-item--with-trailing-icon.mdc-list-item,.mdc-list-item--with-trailing-icon.mdc-list-item[dir=rtl]{padding-left:0;padding-right:auto}.mdc-list-item--with-trailing-icon .mdc-list-item__end{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-list-item--with-trailing-icon .mdc-list-item__end,.mdc-list-item--with-trailing-icon .mdc-list-item__end[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-list-item--with-trailing-meta.mdc-list-item--with-two-lines .mdc-list-item__end{align-self:flex-start;margin-top:0}.mdc-list-item--with-trailing-meta.mdc-list-item--with-three-lines .mdc-list-item__end{align-self:flex-start;margin-top:0}.mdc-list-item--with-trailing-meta.mdc-list-item{padding-left:auto;padding-right:0}[dir=rtl] .mdc-list-item--with-trailing-meta.mdc-list-item,.mdc-list-item--with-trailing-meta.mdc-list-item[dir=rtl]{padding-left:0;padding-right:auto}.mdc-list-item--with-trailing-meta .mdc-list-item__end{margin-left:28px;margin-right:16px}[dir=rtl] .mdc-list-item--with-trailing-meta .mdc-list-item__end,.mdc-list-item--with-trailing-meta .mdc-list-item__end[dir=rtl]{margin-left:16px;margin-right:28px}.mdc-list-item--with-trailing-meta.mdc-list-item--with-two-lines .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-trailing-meta.mdc-list-item--with-two-lines .mdc-list-item__end::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-trailing-meta.mdc-list-item--with-three-lines .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-trailing-meta.mdc-list-item--with-three-lines .mdc-list-item__end::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-trailing-meta .mdc-list-item__end{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:var(--mdc-typography-caption-font-family);font-size:var(--mdc-typography-caption-font-size);line-height:var(--mdc-typography-caption-line-height);font-weight:var(--mdc-typography-caption-font-weight);letter-spacing:var(--mdc-typography-caption-letter-spacing);text-decoration:var(--mdc-typography-caption-text-decoration);text-transform:var(--mdc-typography-caption-text-transform)}.mdc-list-item--with-trailing-checkbox.mdc-list-item{padding-left:auto;padding-right:0}[dir=rtl] .mdc-list-item--with-trailing-checkbox.mdc-list-item,.mdc-list-item--with-trailing-checkbox.mdc-list-item[dir=rtl]{padding-left:0;padding-right:auto}.mdc-list-item--with-trailing-checkbox .mdc-list-item__end{margin-left:24px;margin-right:8px}[dir=rtl] .mdc-list-item--with-trailing-checkbox .mdc-list-item__end,.mdc-list-item--with-trailing-checkbox .mdc-list-item__end[dir=rtl]{margin-left:8px;margin-right:24px}.mdc-list-item--with-trailing-checkbox.mdc-list-item--with-three-lines .mdc-list-item__end{align-self:flex-start;margin-top:8px}.mdc-list-item--with-trailing-radio.mdc-list-item{padding-left:auto;padding-right:0}[dir=rtl] .mdc-list-item--with-trailing-radio.mdc-list-item,.mdc-list-item--with-trailing-radio.mdc-list-item[dir=rtl]{padding-left:0;padding-right:auto}.mdc-list-item--with-trailing-radio .mdc-list-item__end{margin-left:24px;margin-right:8px}[dir=rtl] .mdc-list-item--with-trailing-radio .mdc-list-item__end,.mdc-list-item--with-trailing-radio .mdc-list-item__end[dir=rtl]{margin-left:8px;margin-right:24px}.mdc-list-item--with-trailing-radio.mdc-list-item--with-three-lines .mdc-list-item__end{align-self:flex-start;margin-top:8px}.mdc-list-item--with-trailing-switch.mdc-list-item{padding-left:auto;padding-right:0}[dir=rtl] .mdc-list-item--with-trailing-switch.mdc-list-item,.mdc-list-item--with-trailing-switch.mdc-list-item[dir=rtl]{padding-left:0;padding-right:auto}.mdc-list-item--with-trailing-switch .mdc-list-item__end{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-list-item--with-trailing-switch .mdc-list-item__end,.mdc-list-item--with-trailing-switch .mdc-list-item__end[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-list-item--with-trailing-switch.mdc-list-item--with-three-lines .mdc-list-item__end{align-self:flex-start;margin-top:16px}.mdc-list-item--with-overline.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-overline.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:20px;content:\"\";vertical-align:0}.mdc-list-item--with-overline.mdc-list-item--with-three-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-overline.mdc-list-item--with-three-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:20px;content:\"\";vertical-align:0}.mdc-list-item{padding-left:16px;padding-right:16px}[dir=rtl] .mdc-list-item,.mdc-list-item[dir=rtl]{padding-left:16px;padding-right:16px}.mdc-list-group .mdc-deprecated-list{padding:0}.mdc-list-group__subheader{margin:calc((3rem - 1.5rem)/2) 16px}.mdc-list-divider{padding:0;background-clip:content-box}.mdc-list-divider.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-text.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-icon.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-image.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-thumbnail.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-avatar.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-checkbox.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-switch.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-radio.mdc-list-divider--with-leading-inset{padding-left:16px;padding-right:auto}[dir=rtl] .mdc-list-divider.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-text.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-icon.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-image.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-thumbnail.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-avatar.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-checkbox.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-switch.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-radio.mdc-list-divider--with-leading-inset,.mdc-list-divider.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-text.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-icon.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-image.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-thumbnail.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-avatar.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-checkbox.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-switch.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-radio.mdc-list-divider--with-leading-inset[dir=rtl]{padding-left:auto;padding-right:16px}.mdc-list-divider.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-text.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-icon.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-image.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-thumbnail.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-avatar.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-checkbox.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-switch.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-radio.mdc-list-divider--with-trailing-inset{padding-left:auto;padding-right:16px}[dir=rtl] .mdc-list-divider.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-text.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-icon.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-image.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-thumbnail.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-avatar.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-checkbox.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-switch.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-radio.mdc-list-divider--with-trailing-inset,.mdc-list-divider.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-text.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-icon.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-image.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-thumbnail.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-avatar.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-checkbox.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-switch.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-radio.mdc-list-divider--with-trailing-inset[dir=rtl]{padding-left:16px;padding-right:auto}.mdc-list-divider--with-leading-video.mdc-list-divider--with-leading-inset{padding-left:0px;padding-right:auto}[dir=rtl] .mdc-list-divider--with-leading-video.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-video.mdc-list-divider--with-leading-inset[dir=rtl]{padding-left:auto;padding-right:0px}[dir=rtl] .mdc-list-divider,.mdc-list-divider[dir=rtl]{padding:0}.mdc-list-item{background-color:var(--mdc-list-list-item-container-color)}.mdc-list-item.mdc-list-item--selected{background-color:var(--mdc-list-list-item-selected-container-color)}.mdc-list-item--with-one-line{border-radius:var(--mdc-list-list-item-container-shape)}.mdc-list-item--with-one-line.mdc-list-item--with-leading-avatar,.mdc-list-item--with-one-line.mdc-list-item--with-leading-icon,.mdc-list-item--with-one-line.mdc-list-item--with-leading-thumbnail,.mdc-list-item--with-one-line.mdc-list-item--with-leading-checkbox,.mdc-list-item--with-one-line.mdc-list-item--with-leading-radio,.mdc-list-item--with-one-line.mdc-list-item--with-leading-switch{border-radius:var(--mdc-list-list-item-container-shape)}.mdc-list-item--with-one-line.mdc-list-item--with-leading-image,.mdc-list-item--with-one-line.mdc-list-item--with-leading-video{border-radius:var(--mdc-list-list-item-container-shape)}.mdc-list-item--with-two-lines{border-radius:var(--mdc-list-list-item-container-shape)}.mdc-list-item--with-two-lines.mdc-list-item--with-leading-avatar,.mdc-list-item--with-two-lines.mdc-list-item--with-leading-icon,.mdc-list-item--with-two-lines.mdc-list-item--with-leading-thumbnail,.mdc-list-item--with-two-lines.mdc-list-item--with-leading-checkbox,.mdc-list-item--with-two-lines.mdc-list-item--with-leading-radio,.mdc-list-item--with-two-lines.mdc-list-item--with-leading-switch,.mdc-list-item--with-two-lines.mdc-list-item--with-leading-image,.mdc-list-item--with-two-lines.mdc-list-item--with-leading-video{border-radius:var(--mdc-list-list-item-container-shape)}.mdc-list-item--with-three-lines{border-radius:var(--mdc-list-list-item-container-shape)}.mdc-list-item.mdc-list-item--with-one-line{height:var(--mdc-list-list-item-one-line-container-height)}.mdc-list-item.mdc-list-item--with-two-lines{height:var(--mdc-list-list-item-two-line-container-height)}.mdc-list-item.mdc-list-item--with-three-lines{height:var(--mdc-list-list-item-three-line-container-height)}.mdc-list-item__primary-text{color:var(--mdc-list-list-item-label-text-color)}.mdc-list-item__primary-text{font-family:var(--mdc-list-list-item-label-text-font);line-height:var(--mdc-list-list-item-label-text-line-height);font-size:var(--mdc-list-list-item-label-text-size);font-weight:var(--mdc-list-list-item-label-text-weight);letter-spacing:var(--mdc-list-list-item-label-text-tracking)}.mdc-list-item__secondary-text{color:var(--mdc-list-list-item-supporting-text-color)}.mdc-list-item__secondary-text{font-family:var(--mdc-list-list-item-supporting-text-font);line-height:var(--mdc-list-list-item-supporting-text-line-height);font-size:var(--mdc-list-list-item-supporting-text-size);font-weight:var(--mdc-list-list-item-supporting-text-weight);letter-spacing:var(--mdc-list-list-item-supporting-text-tracking)}.mdc-list-item--with-leading-icon .mdc-list-item__start{color:var(--mdc-list-list-item-leading-icon-color)}.mdc-list-item--with-leading-icon .mdc-list-item__start{width:var(--mdc-list-list-item-leading-icon-size);height:var(--mdc-list-list-item-leading-icon-size)}.mdc-list-item--with-leading-icon .mdc-list-item__start>i{font-size:var(--mdc-list-list-item-leading-icon-size)}.mdc-list-item--with-leading-icon .mdc-list-item__start .mdc-list-item__icon{font-size:var(--mdc-list-list-item-leading-icon-size);width:var(--mdc-list-list-item-leading-icon-size);height:var(--mdc-list-list-item-leading-icon-size)}.mdc-list-item--with-leading-icon .mdc-list-item__start .mdc-list-item__icon,.mdc-list-item--with-leading-icon .mdc-list-item__start .mdc-list-item__icon>.materialdesignWizIconSvgsSvgIcon{display:block}.mdc-list-item--with-leading-avatar .mdc-list-item__start{width:var(--mdc-list-list-item-leading-avatar-size);height:var(--mdc-list-list-item-leading-avatar-size)}.mdc-list-item.mdc-list-item--with-trailing-meta .mdc-list-item__end{color:var(--mdc-list-list-item-trailing-supporting-text-color)}.mdc-list-item--with-trailing-meta .mdc-list-item__end{font-family:var(--mdc-list-list-item-trailing-supporting-text-font);line-height:var(--mdc-list-list-item-trailing-supporting-text-line-height);font-size:var(--mdc-list-list-item-trailing-supporting-text-size);font-weight:var(--mdc-list-list-item-trailing-supporting-text-weight);letter-spacing:var(--mdc-list-list-item-trailing-supporting-text-tracking)}.mdc-list-item--with-trailing-icon .mdc-list-item__end{color:var(--mdc-list-list-item-trailing-icon-color)}.mdc-list-item--with-trailing-icon .mdc-list-item__end{width:var(--mdc-list-list-item-trailing-icon-size);height:var(--mdc-list-list-item-trailing-icon-size)}.mdc-list-item--with-trailing-icon .mdc-list-item__end>i{font-size:var(--mdc-list-list-item-trailing-icon-size)}.mdc-list-item--with-trailing-icon .mdc-list-item__end .mdc-list-item__icon{font-size:var(--mdc-list-list-item-trailing-icon-size);width:var(--mdc-list-list-item-trailing-icon-size);height:var(--mdc-list-list-item-trailing-icon-size)}.mdc-list-item--with-trailing-icon .mdc-list-item__end .mdc-list-item__icon,.mdc-list-item--with-trailing-icon .mdc-list-item__end .mdc-list-item__icon>.materialdesignWizIconSvgsSvgIcon{display:block}.mdc-list-item--selected.mdc-list-item--with-trailing-icon .mdc-list-item__end{color:var(--mdc-list-list-item-selected-trailing-icon-color)}.mdc-list-item--disabled .mdc-list-item__start,.mdc-list-item--disabled .mdc-list-item__content,.mdc-list-item--disabled .mdc-list-item__end{opacity:1}.mdc-list-item--disabled .mdc-list-item__primary-text,.mdc-list-item--disabled .mdc-list-item__secondary-text,.mdc-list-item--disabled .mdc-list-item__overline-text{opacity:var(--mdc-list-list-item-disabled-label-text-opacity)}.mdc-list-item--disabled.mdc-list-item--with-leading-icon .mdc-list-item__start{color:var(--mdc-list-list-item-disabled-leading-icon-color)}.mdc-list-item--disabled.mdc-list-item--with-leading-icon .mdc-list-item__start{opacity:var(--mdc-list-list-item-disabled-leading-icon-opacity)}.mdc-list-item--disabled.mdc-list-item--with-trailing-icon .mdc-list-item__end{color:var(--mdc-list-list-item-disabled-trailing-icon-color)}.mdc-list-item--disabled.mdc-list-item--with-trailing-icon .mdc-list-item__end{opacity:var(--mdc-list-list-item-disabled-trailing-icon-opacity)}.mdc-list-item:hover .mdc-list-item__primary-text{color:var(--mdc-list-list-item-hover-label-text-color)}.mdc-list-item--with-leading-icon:hover .mdc-list-item__start{color:var(--mdc-list-list-item-hover-leading-icon-color)}.mdc-list-item--with-trailing-icon:hover .mdc-list-item__end{color:var(--mdc-list-list-item-hover-trailing-icon-color)}.mdc-list-item:focus .mdc-list-item__primary-text{color:var(--mdc-list-list-item-focus-label-text-color)}.mdc-list-item.mdc-list-item--disabled .mdc-list-item__primary-text{color:var(--mdc-list-list-item-disabled-label-text-color)}.mdc-list-item:hover::before{background-color:var(--mdc-list-list-item-hover-state-layer-color);opacity:var(--mdc-list-list-item-hover-state-layer-opacity)}.mdc-list-item.mdc-list-item--disabled::before{background-color:var(--mdc-list-list-item-disabled-state-layer-color);opacity:var(--mdc-list-list-item-disabled-state-layer-opacity)}.mdc-list-item:focus::before{background-color:var(--mdc-list-list-item-focus-state-layer-color);opacity:var(--mdc-list-list-item-focus-state-layer-opacity)}.mdc-list-item--disabled .mdc-radio,.mdc-list-item--disabled .mdc-checkbox{opacity:var(--mdc-list-list-item-disabled-label-text-opacity)}.mdc-list-item--with-leading-avatar .mat-mdc-list-item-avatar{border-radius:var(--mdc-list-list-item-leading-avatar-shape);background-color:var(--mdc-list-list-item-leading-avatar-color)}.mat-mdc-list-base{--mdc-list-list-item-container-shape:0;--mdc-list-list-item-leading-avatar-shape:50%;--mdc-list-list-item-container-color:transparent;--mdc-list-list-item-selected-container-color:transparent;--mdc-list-list-item-leading-avatar-color:transparent;--mdc-list-list-item-leading-icon-size:24px;--mdc-list-list-item-leading-avatar-size:40px;--mdc-list-list-item-trailing-icon-size:24px;--mdc-list-list-item-disabled-state-layer-color:transparent;--mdc-list-list-item-disabled-state-layer-opacity:0;--mdc-list-list-item-disabled-label-text-opacity:0.38;--mdc-list-list-item-disabled-leading-icon-opacity:0.38;--mdc-list-list-item-disabled-trailing-icon-opacity:0.38}.cdk-high-contrast-active a.mdc-list-item--activated::after{content:\"\";position:absolute;top:50%;right:16px;transform:translateY(-50%);width:10px;height:0;border-bottom:solid 10px;border-radius:10px}.cdk-high-contrast-active a.mdc-list-item--activated [dir=rtl]::after{right:auto;left:16px}.mat-mdc-list-base{display:block}.mat-mdc-list-base .mdc-list-item__start,.mat-mdc-list-base .mdc-list-item__end,.mat-mdc-list-base .mdc-list-item__content{pointer-events:auto}.mat-mdc-list-item,.mat-mdc-list-option{width:100%;box-sizing:border-box;-webkit-tap-highlight-color:rgba(0,0,0,0)}.mat-mdc-list-item:not(.mat-mdc-list-item-interactive),.mat-mdc-list-option:not(.mat-mdc-list-item-interactive){cursor:default}.mat-mdc-list-item .mat-divider-inset,.mat-mdc-list-option .mat-divider-inset{position:absolute;left:0;right:0;bottom:0}.mat-mdc-list-item .mat-mdc-list-item-avatar~.mat-divider-inset,.mat-mdc-list-option .mat-mdc-list-item-avatar~.mat-divider-inset{margin-left:72px}[dir=rtl] .mat-mdc-list-item .mat-mdc-list-item-avatar~.mat-divider-inset,[dir=rtl] .mat-mdc-list-option .mat-mdc-list-item-avatar~.mat-divider-inset{margin-right:72px}.mat-mdc-list-item-interactive::before{top:0;left:0;right:0;bottom:0;position:absolute;content:\"\";opacity:0;pointer-events:none}.mat-mdc-list-item>.mat-mdc-focus-indicator{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none}.mat-mdc-list-item:focus>.mat-mdc-focus-indicator::before{content:\"\"}.mat-mdc-list-item.mdc-list-item--with-three-lines .mat-mdc-list-item-line.mdc-list-item__secondary-text{white-space:nowrap;line-height:normal}.mat-mdc-list-item.mdc-list-item--with-three-lines .mat-mdc-list-item-unscoped-content.mdc-list-item__secondary-text{display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2}mat-action-list button{background:none;color:inherit;border:none;font:inherit;outline:inherit;-webkit-tap-highlight-color:rgba(0,0,0,0);text-align:left}[dir=rtl] mat-action-list button{text-align:right}mat-action-list button::-moz-focus-inner{border:0}"]
    }]
  }], null, null);
})();
class MatListItem extends MatListItemBase {
  /** Indicates whether an item in a `<mat-nav-list>` is the currently active page. */
  get activated() {
    return this._activated;
  }
  set activated(activated) {
    this._activated = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_1__.coerceBooleanProperty)(activated);
  }
  constructor(element, ngZone, listBase, platform, globalRippleOptions, animationMode) {
    super(element, ngZone, listBase, platform, globalRippleOptions, animationMode);
    this._activated = false;
  }
  /**
   * Determine the value of `aria-current`. Return 'page' if this item is an activated anchor tag.
   * Otherwise, return `null`. This method is safe to use with server-side rendering.
   */
  _getAriaCurrent() {
    return this._hostElement.nodeName === 'A' && this._activated ? 'page' : null;
  }
}
_class11 = MatListItem;
_class11.ɵfac = function _class11_Factory(t) {
  return new (t || _class11)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.NgZone), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](MatListBase, 8), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_5__.Platform), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_core__WEBPACK_IMPORTED_MODULE_3__.MAT_RIPPLE_GLOBAL_OPTIONS, 8), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ANIMATION_MODULE_TYPE, 8));
};
_class11.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: _class11,
  selectors: [["mat-list-item"], ["a", "mat-list-item", ""], ["button", "mat-list-item", ""]],
  contentQueries: function _class11_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵcontentQuery"](dirIndex, MatListItemLine, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵcontentQuery"](dirIndex, MatListItemTitle, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵcontentQuery"](dirIndex, MatListItemMeta, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx._lines = _t);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx._titles = _t);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx._meta = _t);
    }
  },
  viewQuery: function _class11_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c2, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c3, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx._unscopedContent = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx._itemText = _t.first);
    }
  },
  hostAttrs: [1, "mat-mdc-list-item", "mdc-list-item"],
  hostVars: 11,
  hostBindings: function _class11_HostBindings(rf, ctx) {
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattribute"]("aria-current", ctx._getAriaCurrent());
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("mdc-list-item--activated", ctx.activated)("mdc-list-item--with-leading-avatar", ctx._avatars.length !== 0)("mdc-list-item--with-leading-icon", ctx._icons.length !== 0)("mdc-list-item--with-trailing-meta", ctx._meta.length !== 0)("_mat-animation-noopable", ctx._noopAnimations);
    }
  },
  inputs: {
    activated: "activated"
  },
  exportAs: ["matListItem"],
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]],
  ngContentSelectors: _c5,
  decls: 10,
  vars: 0,
  consts: [[1, "mdc-list-item__content"], [1, "mat-mdc-list-item-unscoped-content", 3, "cdkObserveContent"], ["unscopedContent", ""], [1, "mat-mdc-focus-indicator"]],
  template: function _class11_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojectionDef"](_c4);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "span", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](2, 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](3, 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "span", 1, 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("cdkObserveContent", function _class11_Template_span_cdkObserveContent_4_listener() {
        return ctx._updateItemLines(true);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](6, 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](7, 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](8, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](9, "div", 3);
    }
  },
  dependencies: [_angular_cdk_observers__WEBPACK_IMPORTED_MODULE_6__.CdkObserveContent],
  encapsulation: 2,
  changeDetection: 0
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MatListItem, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Component,
    args: [{
      selector: 'mat-list-item, a[mat-list-item], button[mat-list-item]',
      exportAs: 'matListItem',
      host: {
        'class': 'mat-mdc-list-item mdc-list-item',
        '[class.mdc-list-item--activated]': 'activated',
        '[class.mdc-list-item--with-leading-avatar]': '_avatars.length !== 0',
        '[class.mdc-list-item--with-leading-icon]': '_icons.length !== 0',
        '[class.mdc-list-item--with-trailing-meta]': '_meta.length !== 0',
        '[class._mat-animation-noopable]': '_noopAnimations',
        '[attr.aria-current]': '_getAriaCurrent()'
      },
      encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewEncapsulation.None,
      changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectionStrategy.OnPush,
      template: "<ng-content select=\"[matListItemAvatar],[matListItemIcon]\"></ng-content>\n\n<span class=\"mdc-list-item__content\">\n  <ng-content select=\"[matListItemTitle]\"></ng-content>\n  <ng-content select=\"[matListItemLine]\"></ng-content>\n  <span #unscopedContent class=\"mat-mdc-list-item-unscoped-content\"\n        (cdkObserveContent)=\"_updateItemLines(true)\">\n    <ng-content></ng-content>\n  </span>\n</span>\n\n<ng-content select=\"[matListItemMeta]\"></ng-content>\n\n<ng-content select=\"mat-divider\"></ng-content>\n\n<!--\n  Strong focus indicator element. MDC uses the `::before` pseudo element for the default\n  focus/hover/selected state, so we need a separate element.\n-->\n<div class=\"mat-mdc-focus-indicator\"></div>\n"
    }]
  }], function () {
    return [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.NgZone
    }, {
      type: MatListBase,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional
      }]
    }, {
      type: _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_5__.Platform
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Inject,
        args: [_angular_material_core__WEBPACK_IMPORTED_MODULE_3__.MAT_RIPPLE_GLOBAL_OPTIONS]
      }]
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Inject,
        args: [_angular_core__WEBPACK_IMPORTED_MODULE_0__.ANIMATION_MODULE_TYPE]
      }]
    }];
  }, {
    _lines: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ContentChildren,
      args: [MatListItemLine, {
        descendants: true
      }]
    }],
    _titles: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ContentChildren,
      args: [MatListItemTitle, {
        descendants: true
      }]
    }],
    _meta: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ContentChildren,
      args: [MatListItemMeta, {
        descendants: true
      }]
    }],
    _unscopedContent: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewChild,
      args: ['unscopedContent']
    }],
    _itemText: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewChild,
      args: ['text']
    }],
    activated: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }]
  });
})();

/**
 * Injection token that can be used to reference instances of an `SelectionList`. It serves
 * as alternative token to an actual implementation which would result in circular references.
 * @docs-private
 */
const SELECTION_LIST = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken('SelectionList');
class MatListOption extends MatListItemBase {
  /**
   * Whether the label should appear before or after the checkbox/radio. Defaults to 'after'
   *
   * @deprecated Use `togglePosition` instead.
   * @breaking-change 17.0.0
   */
  get checkboxPosition() {
    return this.togglePosition;
  }
  set checkboxPosition(value) {
    this.togglePosition = value;
  }
  /** Theme color of the list option. This sets the color of the checkbox/radio. */
  get color() {
    return this._color || this._selectionList.color;
  }
  set color(newValue) {
    this._color = newValue;
  }
  /** Value of the option */
  get value() {
    return this._value;
  }
  set value(newValue) {
    if (this.selected && newValue !== this.value && this._inputsInitialized) {
      this.selected = false;
    }
    this._value = newValue;
  }
  /** Whether the option is selected. */
  get selected() {
    return this._selectionList.selectedOptions.isSelected(this);
  }
  set selected(value) {
    const isSelected = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_1__.coerceBooleanProperty)(value);
    if (isSelected !== this._selected) {
      this._setSelected(isSelected);
      if (isSelected || this._selectionList.multiple) {
        this._selectionList._reportValueChange();
      }
    }
  }
  constructor(elementRef, ngZone, _selectionList, platform, _changeDetectorRef, globalRippleOptions, animationMode) {
    super(elementRef, ngZone, _selectionList, platform, globalRippleOptions, animationMode);
    this._selectionList = _selectionList;
    this._changeDetectorRef = _changeDetectorRef;
    /**
     * Emits when the selected state of the option has changed.
     * Use to facilitate two-data binding to the `selected` property.
     * @docs-private
     */
    this.selectedChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    /** Whether the label should appear before or after the checkbox/radio. Defaults to 'after' */
    this.togglePosition = 'after';
    this._selected = false;
    /**
     * This is set to true after the first OnChanges cycle so we don't
     * clear the value of `selected` in the first cycle.
     */
    this._inputsInitialized = false;
  }
  ngOnInit() {
    const list = this._selectionList;
    if (list._value && list._value.some(value => list.compareWith(this._value, value))) {
      this._setSelected(true);
    }
    const wasSelected = this._selected;
    // List options that are selected at initialization can't be reported properly to the form
    // control. This is because it takes some time until the selection-list knows about all
    // available options. Also it can happen that the ControlValueAccessor has an initial value
    // that should be used instead. Deferring the value change report to the next tick ensures
    // that the form control value is not being overwritten.
    Promise.resolve().then(() => {
      if (this._selected || wasSelected) {
        this.selected = true;
        this._changeDetectorRef.markForCheck();
      }
    });
    this._inputsInitialized = true;
  }
  ngOnDestroy() {
    super.ngOnDestroy();
    if (this.selected) {
      // We have to delay this until the next tick in order
      // to avoid changed after checked errors.
      Promise.resolve().then(() => {
        this.selected = false;
      });
    }
  }
  /** Toggles the selection state of the option. */
  toggle() {
    this.selected = !this.selected;
  }
  /** Allows for programmatic focusing of the option. */
  focus() {
    this._hostElement.focus();
  }
  /** Gets the text label of the list option. Used for the typeahead functionality in the list. */
  getLabel() {
    const titleElement = this._titles?.get(0)?._elementRef.nativeElement;
    // If there is no explicit title element, the unscoped text content
    // is treated as the list item title.
    const labelEl = titleElement || this._unscopedContent?.nativeElement;
    return labelEl?.textContent || '';
  }
  /** Whether a checkbox is shown at the given position. */
  _hasCheckboxAt(position) {
    return this._selectionList.multiple && this._getTogglePosition() === position;
  }
  /** Where a radio indicator is shown at the given position. */
  _hasRadioAt(position) {
    return !this._selectionList.multiple && this._getTogglePosition() === position && !this._selectionList.hideSingleSelectionIndicator;
  }
  /** Whether icons or avatars are shown at the given position. */
  _hasIconsOrAvatarsAt(position) {
    return this._hasProjected('icons', position) || this._hasProjected('avatars', position);
  }
  /** Gets whether the given type of element is projected at the specified position. */
  _hasProjected(type, position) {
    // If the checkbox/radio is shown at the specified position, neither icons or
    // avatars can be shown at the position.
    return this._getTogglePosition() !== position && (type === 'avatars' ? this._avatars.length !== 0 : this._icons.length !== 0);
  }
  _handleBlur() {
    this._selectionList._onTouched();
  }
  /** Gets the current position of the checkbox/radio. */
  _getTogglePosition() {
    return this.togglePosition || 'after';
  }
  /**
   * Sets the selected state of the option.
   * @returns Whether the value has changed.
   */
  _setSelected(selected) {
    if (selected === this._selected) {
      return false;
    }
    this._selected = selected;
    if (selected) {
      this._selectionList.selectedOptions.select(this);
    } else {
      this._selectionList.selectedOptions.deselect(this);
    }
    this.selectedChange.emit(selected);
    this._changeDetectorRef.markForCheck();
    return true;
  }
  /**
   * Notifies Angular that the option needs to be checked in the next change detection run.
   * Mainly used to trigger an update of the list option if the disabled state of the selection
   * list changed.
   */
  _markForCheck() {
    this._changeDetectorRef.markForCheck();
  }
  /** Toggles the option's value based on a user interaction. */
  _toggleOnInteraction() {
    if (!this.disabled) {
      if (this._selectionList.multiple) {
        this.selected = !this.selected;
        this._selectionList._emitChangeEvent([this]);
      } else if (!this.selected) {
        this.selected = true;
        this._selectionList._emitChangeEvent([this]);
      }
    }
  }
  /** Sets the tabindex of the list option. */
  _setTabindex(value) {
    this._hostElement.setAttribute('tabindex', value + '');
  }
}
_class12 = MatListOption;
_class12.ɵfac = function _class12_Factory(t) {
  return new (t || _class12)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.NgZone), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](SELECTION_LIST), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_5__.Platform), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_core__WEBPACK_IMPORTED_MODULE_3__.MAT_RIPPLE_GLOBAL_OPTIONS, 8), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ANIMATION_MODULE_TYPE, 8));
};
_class12.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: _class12,
  selectors: [["mat-list-option"]],
  contentQueries: function _class12_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵcontentQuery"](dirIndex, MatListItemLine, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵcontentQuery"](dirIndex, MatListItemTitle, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx._lines = _t);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx._titles = _t);
    }
  },
  viewQuery: function _class12_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c2, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx._unscopedContent = _t.first);
    }
  },
  hostAttrs: ["role", "option", 1, "mat-mdc-list-item", "mat-mdc-list-option", "mdc-list-item"],
  hostVars: 25,
  hostBindings: function _class12_HostBindings(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("blur", function _class12_blur_HostBindingHandler() {
        return ctx._handleBlur();
      })("click", function _class12_click_HostBindingHandler() {
        return ctx._toggleOnInteraction();
      });
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattribute"]("aria-selected", ctx.selected);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("mdc-list-item--selected", ctx.selected && !ctx._selectionList.multiple && ctx._selectionList.hideSingleSelectionIndicator)("mdc-list-item--with-leading-avatar", ctx._hasProjected("avatars", "before"))("mdc-list-item--with-leading-icon", ctx._hasProjected("icons", "before"))("mdc-list-item--with-trailing-icon", ctx._hasProjected("icons", "after"))("mat-mdc-list-option-with-trailing-avatar", ctx._hasProjected("avatars", "after"))("mdc-list-item--with-leading-checkbox", ctx._hasCheckboxAt("before"))("mdc-list-item--with-trailing-checkbox", ctx._hasCheckboxAt("after"))("mdc-list-item--with-leading-radio", ctx._hasRadioAt("before"))("mdc-list-item--with-trailing-radio", ctx._hasRadioAt("after"))("mat-accent", ctx.color !== "primary" && ctx.color !== "warn")("mat-warn", ctx.color === "warn")("_mat-animation-noopable", ctx._noopAnimations);
    }
  },
  inputs: {
    togglePosition: "togglePosition",
    checkboxPosition: "checkboxPosition",
    color: "color",
    value: "value",
    selected: "selected"
  },
  outputs: {
    selectedChange: "selectedChange"
  },
  exportAs: ["matListOption"],
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([{
    provide: MatListItemBase,
    useExisting: _class12
  }, {
    provide: LIST_OPTION,
    useExisting: _class12
  }]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]],
  ngContentSelectors: _c7,
  decls: 20,
  vars: 6,
  consts: [["icons", ""], ["checkbox", ""], ["radio", ""], ["class", "mdc-list-item__start mat-mdc-list-option-checkbox-before", 4, "ngIf"], ["class", "mdc-list-item__start mat-mdc-list-option-radio-before", 4, "ngIf"], [3, "ngIf"], [1, "mdc-list-item__content"], [1, "mat-mdc-list-item-unscoped-content", 3, "cdkObserveContent"], ["unscopedContent", ""], ["class", "mdc-list-item__end", 4, "ngIf"], [1, "mat-mdc-focus-indicator"], [1, "mdc-checkbox"], ["type", "checkbox", 1, "mdc-checkbox__native-control", 3, "checked", "disabled"], [1, "mdc-checkbox__background"], ["viewBox", "0 0 24 24", "aria-hidden", "true", 1, "mdc-checkbox__checkmark"], ["fill", "none", "d", "M1.73,12.91 8.1,19.28 22.79,4.59", 1, "mdc-checkbox__checkmark-path"], [1, "mdc-checkbox__mixedmark"], [1, "mdc-radio"], ["type", "radio", 1, "mdc-radio__native-control", 3, "checked", "disabled"], [1, "mdc-radio__background"], [1, "mdc-radio__outer-circle"], [1, "mdc-radio__inner-circle"], [1, "mdc-list-item__start", "mat-mdc-list-option-checkbox-before"], [3, "ngTemplateOutlet"], [1, "mdc-list-item__start", "mat-mdc-list-option-radio-before"], [1, "mdc-list-item__end"]],
  template: function _class12_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojectionDef"](_c6);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, _class12_ng_template_0_Template, 1, 0, "ng-template", null, 0, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, _class12_ng_template_2_Template, 6, 4, "ng-template", null, 1, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, _class12_ng_template_4_Template, 5, 4, "ng-template", null, 2, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](6, _class12_span_6_Template, 2, 1, "span", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](7, _class12_span_7_Template, 2, 1, "span", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](8, _class12_ng_template_8_Template, 1, 1, "ng-template", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "span", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](10);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](11, 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "span", 7, 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("cdkObserveContent", function _class12_Template_span_cdkObserveContent_12_listener() {
        return ctx._updateItemLines(true);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](14, 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](15, _class12_span_15_Template, 2, 1, "span", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](16, _class12_span_16_Template, 2, 1, "span", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](17, _class12_ng_template_17_Template, 1, 1, "ng-template", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](18, 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](19, "div", 10);
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._hasCheckboxAt("before"));
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._hasRadioAt("before"));
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._hasIconsOrAvatarsAt("before"));
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](7);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._hasCheckboxAt("after"));
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._hasRadioAt("after"));
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._hasIconsOrAvatarsAt("after"));
    }
  },
  dependencies: [_angular_cdk_observers__WEBPACK_IMPORTED_MODULE_6__.CdkObserveContent, _angular_common__WEBPACK_IMPORTED_MODULE_7__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_7__.NgTemplateOutlet],
  styles: [".mat-mdc-list-option-with-trailing-avatar.mdc-list-item{padding-left:auto;padding-right:0}[dir=rtl] .mat-mdc-list-option-with-trailing-avatar.mdc-list-item,.mat-mdc-list-option-with-trailing-avatar.mdc-list-item[dir=rtl]{padding-left:0;padding-right:auto}.mat-mdc-list-option-with-trailing-avatar .mdc-list-item__end{margin-left:16px;margin-right:16px}[dir=rtl] .mat-mdc-list-option-with-trailing-avatar .mdc-list-item__end,.mat-mdc-list-option-with-trailing-avatar .mdc-list-item__end[dir=rtl]{margin-left:16px;margin-right:16px}.mat-mdc-list-option-with-trailing-avatar .mdc-list-item__end{width:40px;height:40px}.mat-mdc-list-option-with-trailing-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mat-mdc-list-option-with-trailing-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mat-mdc-list-option-with-trailing-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mat-mdc-list-option-with-trailing-avatar .mdc-list-item__end{border-radius:50%}.mat-mdc-list-option .mdc-touch-target-wrapper{display:inline}.mat-mdc-list-option .mdc-checkbox{display:inline-block;position:relative;flex:0 0 18px;box-sizing:content-box;width:18px;height:18px;line-height:0;white-space:nowrap;cursor:pointer;vertical-align:bottom}.mat-mdc-list-option .mdc-checkbox[hidden]{display:none}.mat-mdc-list-option .mdc-checkbox.mdc-ripple-upgraded--background-focused .mdc-checkbox__focus-ring,.mat-mdc-list-option .mdc-checkbox:not(.mdc-ripple-upgraded):focus .mdc-checkbox__focus-ring{pointer-events:none;border:2px solid rgba(0,0,0,0);border-radius:6px;box-sizing:content-box;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);height:100%;width:100%}@media screen and (forced-colors: active){.mat-mdc-list-option .mdc-checkbox.mdc-ripple-upgraded--background-focused .mdc-checkbox__focus-ring,.mat-mdc-list-option .mdc-checkbox:not(.mdc-ripple-upgraded):focus .mdc-checkbox__focus-ring{border-color:CanvasText}}.mat-mdc-list-option .mdc-checkbox.mdc-ripple-upgraded--background-focused .mdc-checkbox__focus-ring::after,.mat-mdc-list-option .mdc-checkbox:not(.mdc-ripple-upgraded):focus .mdc-checkbox__focus-ring::after{content:\"\";border:2px solid rgba(0,0,0,0);border-radius:8px;display:block;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);height:calc(100% + 4px);width:calc(100% + 4px)}@media screen and (forced-colors: active){.mat-mdc-list-option .mdc-checkbox.mdc-ripple-upgraded--background-focused .mdc-checkbox__focus-ring::after,.mat-mdc-list-option .mdc-checkbox:not(.mdc-ripple-upgraded):focus .mdc-checkbox__focus-ring::after{border-color:CanvasText}}@media all and (-ms-high-contrast: none){.mat-mdc-list-option .mdc-checkbox .mdc-checkbox__focus-ring{display:none}}@media screen and (forced-colors: active),(-ms-high-contrast: active){.mat-mdc-list-option .mdc-checkbox__mixedmark{margin:0 1px}}.mat-mdc-list-option .mdc-checkbox--disabled{cursor:default;pointer-events:none}.mat-mdc-list-option .mdc-checkbox__background{display:inline-flex;position:absolute;align-items:center;justify-content:center;box-sizing:border-box;width:18px;height:18px;border:2px solid currentColor;border-radius:2px;background-color:rgba(0,0,0,0);pointer-events:none;will-change:background-color,border-color}.mat-mdc-list-option .mdc-checkbox__checkmark{position:absolute;top:0;right:0;bottom:0;left:0;width:100%;opacity:0}.mdc-checkbox--upgraded .mat-mdc-list-option .mdc-checkbox__checkmark{opacity:1}.mat-mdc-list-option .mdc-checkbox__checkmark-path{stroke:currentColor;stroke-width:3.12px;stroke-dashoffset:29.7833385;stroke-dasharray:29.7833385}.mat-mdc-list-option .mdc-checkbox__mixedmark{width:100%;height:0;transform:scaleX(0) rotate(0deg);border-width:1px;border-style:solid;opacity:0}.mat-mdc-list-option .mdc-checkbox__native-control:checked~.mdc-checkbox__background .mdc-checkbox__checkmark-path,.mat-mdc-list-option .mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background .mdc-checkbox__checkmark-path,.mat-mdc-list-option .mdc-checkbox__native-control[data-indeterminate=true]~.mdc-checkbox__background .mdc-checkbox__checkmark-path{stroke-dashoffset:0}.mat-mdc-list-option .mdc-checkbox__native-control{position:absolute;margin:0;padding:0;opacity:0;cursor:inherit}.mat-mdc-list-option .mdc-checkbox__native-control:disabled{cursor:default;pointer-events:none}.mat-mdc-list-option .mdc-checkbox--touch{margin:calc((var(--mdc-checkbox-state-layer-size, 48px) - var(--mdc-checkbox-state-layer-size, 40px)) / 2)}.mat-mdc-list-option .mdc-checkbox--touch .mdc-checkbox__native-control{top:calc((var(--mdc-checkbox-state-layer-size, 40px) - var(--mdc-checkbox-state-layer-size, 48px)) / 2);right:calc((var(--mdc-checkbox-state-layer-size, 40px) - var(--mdc-checkbox-state-layer-size, 48px)) / 2);left:calc((var(--mdc-checkbox-state-layer-size, 40px) - var(--mdc-checkbox-state-layer-size, 48px)) / 2);width:var(--mdc-checkbox-state-layer-size, 48px);height:var(--mdc-checkbox-state-layer-size, 48px)}.mat-mdc-list-option .mdc-checkbox__native-control:checked~.mdc-checkbox__background .mdc-checkbox__checkmark{opacity:1}.mat-mdc-list-option .mdc-checkbox__native-control:checked~.mdc-checkbox__background .mdc-checkbox__mixedmark{transform:scaleX(1) rotate(-45deg)}.mat-mdc-list-option .mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background .mdc-checkbox__checkmark,.mat-mdc-list-option .mdc-checkbox__native-control[data-indeterminate=true]~.mdc-checkbox__background .mdc-checkbox__checkmark{transform:rotate(45deg);opacity:0}.mat-mdc-list-option .mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background .mdc-checkbox__mixedmark,.mat-mdc-list-option .mdc-checkbox__native-control[data-indeterminate=true]~.mdc-checkbox__background .mdc-checkbox__mixedmark{transform:scaleX(1) rotate(0deg);opacity:1}.mat-mdc-list-option .mdc-radio{display:inline-block;position:relative;flex:0 0 auto;box-sizing:content-box;width:20px;height:20px;cursor:pointer;will-change:opacity,transform,border-color,color}.mat-mdc-list-option .mdc-radio[hidden]{display:none}.mat-mdc-list-option .mdc-radio__background{display:inline-block;position:relative;box-sizing:border-box;width:20px;height:20px}.mat-mdc-list-option .mdc-radio__background::before{position:absolute;transform:scale(0, 0);border-radius:50%;opacity:0;pointer-events:none;content:\"\"}.mat-mdc-list-option .mdc-radio__outer-circle{position:absolute;top:0;left:0;box-sizing:border-box;width:100%;height:100%;border-width:2px;border-style:solid;border-radius:50%}.mat-mdc-list-option .mdc-radio__inner-circle{position:absolute;top:0;left:0;box-sizing:border-box;width:100%;height:100%;transform:scale(0, 0);border-width:10px;border-style:solid;border-radius:50%}.mat-mdc-list-option .mdc-radio__native-control{position:absolute;margin:0;padding:0;opacity:0;cursor:inherit;z-index:1}.mat-mdc-list-option .mdc-radio--touch{margin-top:4px;margin-bottom:4px;margin-right:4px;margin-left:4px}.mat-mdc-list-option .mdc-radio--touch .mdc-radio__native-control{top:calc((40px - 48px) / 2);right:calc((40px - 48px) / 2);left:calc((40px - 48px) / 2);width:48px;height:48px}.mat-mdc-list-option .mdc-radio.mdc-ripple-upgraded--background-focused .mdc-radio__focus-ring,.mat-mdc-list-option .mdc-radio:not(.mdc-ripple-upgraded):focus .mdc-radio__focus-ring{pointer-events:none;border:2px solid rgba(0,0,0,0);border-radius:6px;box-sizing:content-box;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);height:100%;width:100%}@media screen and (forced-colors: active){.mat-mdc-list-option .mdc-radio.mdc-ripple-upgraded--background-focused .mdc-radio__focus-ring,.mat-mdc-list-option .mdc-radio:not(.mdc-ripple-upgraded):focus .mdc-radio__focus-ring{border-color:CanvasText}}.mat-mdc-list-option .mdc-radio.mdc-ripple-upgraded--background-focused .mdc-radio__focus-ring::after,.mat-mdc-list-option .mdc-radio:not(.mdc-ripple-upgraded):focus .mdc-radio__focus-ring::after{content:\"\";border:2px solid rgba(0,0,0,0);border-radius:8px;display:block;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);height:calc(100% + 4px);width:calc(100% + 4px)}@media screen and (forced-colors: active){.mat-mdc-list-option .mdc-radio.mdc-ripple-upgraded--background-focused .mdc-radio__focus-ring::after,.mat-mdc-list-option .mdc-radio:not(.mdc-ripple-upgraded):focus .mdc-radio__focus-ring::after{border-color:CanvasText}}.mat-mdc-list-option .mdc-radio--disabled{cursor:default;pointer-events:none}.mat-mdc-list-option .mdc-radio__native-control:checked+.mdc-radio__background .mdc-radio__inner-circle{transform:scale(0.5)}.mat-mdc-list-option .mdc-radio__native-control:disabled+.mdc-radio__background,.mat-mdc-list-option [aria-disabled=true] .mdc-radio__native-control+.mdc-radio__background{cursor:default}.mat-mdc-list-option .mdc-radio__native-control:focus+.mdc-radio__background::before{transform:scale(1);opacity:.12}@keyframes mdc-checkbox-unchecked-checked-checkmark-path{0%,50%{stroke-dashoffset:29.7833385}50%{animation-timing-function:cubic-bezier(0, 0, 0.2, 1)}100%{stroke-dashoffset:0}}@keyframes mdc-checkbox-unchecked-indeterminate-mixedmark{0%,68.2%{transform:scaleX(0)}68.2%{animation-timing-function:cubic-bezier(0, 0, 0, 1)}100%{transform:scaleX(1)}}@keyframes mdc-checkbox-checked-unchecked-checkmark-path{from{animation-timing-function:cubic-bezier(0.4, 0, 1, 1);opacity:1;stroke-dashoffset:0}to{opacity:0;stroke-dashoffset:-29.7833385}}@keyframes mdc-checkbox-checked-indeterminate-checkmark{from{animation-timing-function:cubic-bezier(0, 0, 0.2, 1);transform:rotate(0deg);opacity:1}to{transform:rotate(45deg);opacity:0}}@keyframes mdc-checkbox-indeterminate-checked-checkmark{from{animation-timing-function:cubic-bezier(0.14, 0, 0, 1);transform:rotate(45deg);opacity:0}to{transform:rotate(360deg);opacity:1}}@keyframes mdc-checkbox-checked-indeterminate-mixedmark{from{animation-timing-function:mdc-animation-deceleration-curve-timing-function;transform:rotate(-45deg);opacity:0}to{transform:rotate(0deg);opacity:1}}@keyframes mdc-checkbox-indeterminate-checked-mixedmark{from{animation-timing-function:cubic-bezier(0.14, 0, 0, 1);transform:rotate(0deg);opacity:1}to{transform:rotate(315deg);opacity:0}}@keyframes mdc-checkbox-indeterminate-unchecked-mixedmark{0%{animation-timing-function:linear;transform:scaleX(1);opacity:1}32.8%,100%{transform:scaleX(0);opacity:0}}@media all and (-ms-high-contrast: none){.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox .mdc-checkbox__focus-ring{display:none}}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox__background{transition:background-color 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1),border-color 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox__checkmark{transition:opacity 180ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox__checkmark-path{transition:stroke-dashoffset 180ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox__mixedmark{transition:opacity 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1),transform 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox--anim-unchecked-checked .mdc-checkbox__background,.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__background,.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox--anim-checked-unchecked .mdc-checkbox__background,.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__background{animation-duration:180ms;animation-timing-function:linear}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox--anim-unchecked-checked .mdc-checkbox__checkmark-path{animation:mdc-checkbox-unchecked-checked-checkmark-path 180ms linear 0s;transition:none}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__mixedmark{animation:mdc-checkbox-unchecked-indeterminate-mixedmark 90ms linear 0s;transition:none}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox--anim-checked-unchecked .mdc-checkbox__checkmark-path{animation:mdc-checkbox-checked-unchecked-checkmark-path 90ms linear 0s;transition:none}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox--anim-checked-indeterminate .mdc-checkbox__checkmark{animation:mdc-checkbox-checked-indeterminate-checkmark 90ms linear 0s;transition:none}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox--anim-checked-indeterminate .mdc-checkbox__mixedmark{animation:mdc-checkbox-checked-indeterminate-mixedmark 90ms linear 0s;transition:none}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox--anim-indeterminate-checked .mdc-checkbox__checkmark{animation:mdc-checkbox-indeterminate-checked-checkmark 500ms linear 0s;transition:none}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox--anim-indeterminate-checked .mdc-checkbox__mixedmark{animation:mdc-checkbox-indeterminate-checked-mixedmark 500ms linear 0s;transition:none}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__mixedmark{animation:mdc-checkbox-indeterminate-unchecked-mixedmark 300ms linear 0s;transition:none}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox__native-control:checked~.mdc-checkbox__background,.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background,.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox__native-control[data-indeterminate=true]~.mdc-checkbox__background{transition:border-color 90ms 0ms cubic-bezier(0, 0, 0.2, 1),background-color 90ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox__native-control:checked~.mdc-checkbox__background .mdc-checkbox__checkmark{transition:opacity 180ms 0ms cubic-bezier(0, 0, 0.2, 1),transform 180ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background .mdc-checkbox__checkmark,.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox__native-control[data-indeterminate=true]~.mdc-checkbox__background .mdc-checkbox__checkmark{transition:opacity 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1),transform 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox.mdc-checkbox--upgraded .mdc-checkbox__background,.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox.mdc-checkbox--upgraded .mdc-checkbox__checkmark,.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox.mdc-checkbox--upgraded .mdc-checkbox__checkmark-path,.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox.mdc-checkbox--upgraded .mdc-checkbox__mixedmark{transition:none}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-radio__background::before{transition:opacity 120ms 0ms cubic-bezier(0.4, 0, 0.6, 1),transform 120ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-radio__outer-circle{transition:border-color 120ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-radio__inner-circle{transition:transform 120ms 0ms cubic-bezier(0.4, 0, 0.6, 1),border-color 120ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-radio__native-control:checked+.mdc-radio__background,.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-radio__native-control:disabled+.mdc-radio__background{transition:opacity 120ms 0ms cubic-bezier(0, 0, 0.2, 1),transform 120ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-radio__native-control:checked+.mdc-radio__background .mdc-radio__outer-circle,.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-radio__native-control:disabled+.mdc-radio__background .mdc-radio__outer-circle{transition:border-color 120ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-radio__native-control:checked+.mdc-radio__background .mdc-radio__inner-circle,.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-radio__native-control:disabled+.mdc-radio__background .mdc-radio__inner-circle{transition:transform 120ms 0ms cubic-bezier(0, 0, 0.2, 1),border-color 120ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-radio__native-control:checked+.mdc-radio__background .mdc-radio__inner-circle{transition:transform 120ms 0ms cubic-bezier(0, 0, 0.2, 1),border-color 120ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-radio__native-control:focus+.mdc-radio__background::before{transition:opacity 120ms 0ms cubic-bezier(0, 0, 0.2, 1),transform 120ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-list-option .mdc-checkbox{padding:calc((40px - 18px) / 2);padding:calc((var(--mdc-checkbox-state-layer-size, 40px) - 18px) / 2);margin:calc((40px - 40px) / 2);margin:calc((var(--mdc-checkbox-state-layer-size, 40px) - var(--mdc-checkbox-state-layer-size, 40px)) / 2)}.mat-mdc-list-option .mdc-checkbox .mdc-checkbox__native-control[disabled]:not(:checked):not(:indeterminate):not([data-indeterminate=true])~.mdc-checkbox__background{border-color:rgba(0, 0, 0, 0.38);border-color:var(--mdc-checkbox-disabled-unselected-icon-color, rgba(0, 0, 0, 0.38));background-color:transparent}.mat-mdc-list-option .mdc-checkbox .mdc-checkbox__native-control[disabled]:checked~.mdc-checkbox__background,.mat-mdc-list-option .mdc-checkbox .mdc-checkbox__native-control[disabled]:indeterminate~.mdc-checkbox__background,.mat-mdc-list-option .mdc-checkbox .mdc-checkbox__native-control[data-indeterminate=true][disabled]~.mdc-checkbox__background{border-color:transparent;background-color:rgba(0, 0, 0, 0.38);background-color:var(--mdc-checkbox-disabled-selected-icon-color, rgba(0, 0, 0, 0.38))}.mat-mdc-list-option .mdc-checkbox .mdc-checkbox__native-control:enabled~.mdc-checkbox__background .mdc-checkbox__checkmark{color:#fff;color:var(--mdc-checkbox-selected-checkmark-color, \"#fff\")}.mat-mdc-list-option .mdc-checkbox .mdc-checkbox__native-control:enabled~.mdc-checkbox__background .mdc-checkbox__mixedmark{border-color:#fff;border-color:var(--mdc-checkbox-selected-checkmark-color, \"#fff\")}.mat-mdc-list-option .mdc-checkbox .mdc-checkbox__native-control:disabled~.mdc-checkbox__background .mdc-checkbox__checkmark{color:#fff;color:var(--mdc-checkbox-disabled-selected-checkmark-color, #fff)}.mat-mdc-list-option .mdc-checkbox .mdc-checkbox__native-control:disabled~.mdc-checkbox__background .mdc-checkbox__mixedmark{border-color:#fff;border-color:var(--mdc-checkbox-disabled-selected-checkmark-color, #fff)}.mat-mdc-list-option .mdc-checkbox .mdc-checkbox__native-control:enabled:not(:checked):not(:indeterminate):not([data-indeterminate=true])~.mdc-checkbox__background{border-color:rgba(0, 0, 0, 0.54);border-color:var(--mdc-checkbox-unselected-icon-color, rgba(0, 0, 0, 0.54));background-color:transparent}.mat-mdc-list-option .mdc-checkbox .mdc-checkbox__native-control:enabled:checked~.mdc-checkbox__background,.mat-mdc-list-option .mdc-checkbox .mdc-checkbox__native-control:enabled:indeterminate~.mdc-checkbox__background,.mat-mdc-list-option .mdc-checkbox .mdc-checkbox__native-control[data-indeterminate=true]:enabled~.mdc-checkbox__background{border-color:#f44336;border-color:var(--mdc-checkbox-selected-icon-color, #f44336);background-color:#f44336;background-color:var(--mdc-checkbox-selected-icon-color, #f44336)}@keyframes mdc-checkbox-fade-in-background-8A000000FFF4433600000000FFF44336{0%{border-color:rgba(0, 0, 0, 0.54);border-color:var(--mdc-checkbox-unselected-icon-color, rgba(0, 0, 0, 0.54));background-color:transparent}50%{border-color:#f44336;border-color:var(--mdc-checkbox-selected-icon-color, #f44336);background-color:#f44336;background-color:var(--mdc-checkbox-selected-icon-color, #f44336)}}@keyframes mdc-checkbox-fade-out-background-8A000000FFF4433600000000FFF44336{0%,80%{border-color:#f44336;border-color:var(--mdc-checkbox-selected-icon-color, #f44336);background-color:#f44336;background-color:var(--mdc-checkbox-selected-icon-color, #f44336)}100%{border-color:rgba(0, 0, 0, 0.54);border-color:var(--mdc-checkbox-unselected-icon-color, rgba(0, 0, 0, 0.54));background-color:transparent}}.mat-mdc-list-option .mdc-checkbox.mdc-checkbox--anim-unchecked-checked .mdc-checkbox__native-control:enabled~.mdc-checkbox__background,.mat-mdc-list-option .mdc-checkbox.mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__native-control:enabled~.mdc-checkbox__background{animation-name:mdc-checkbox-fade-in-background-8A000000FFF4433600000000FFF44336}.mat-mdc-list-option .mdc-checkbox.mdc-checkbox--anim-checked-unchecked .mdc-checkbox__native-control:enabled~.mdc-checkbox__background,.mat-mdc-list-option .mdc-checkbox.mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__native-control:enabled~.mdc-checkbox__background{animation-name:mdc-checkbox-fade-out-background-8A000000FFF4433600000000FFF44336}.mat-mdc-list-option .mdc-checkbox:hover .mdc-checkbox__native-control:enabled:not(:checked):not(:indeterminate):not([data-indeterminate=true])~.mdc-checkbox__background{border-color:#212121;border-color:var(--mdc-checkbox-unselected-hover-icon-color, #212121);background-color:transparent}.mat-mdc-list-option .mdc-checkbox:hover .mdc-checkbox__native-control:enabled:checked~.mdc-checkbox__background,.mat-mdc-list-option .mdc-checkbox:hover .mdc-checkbox__native-control:enabled:indeterminate~.mdc-checkbox__background,.mat-mdc-list-option .mdc-checkbox:hover .mdc-checkbox__native-control[data-indeterminate=true]:enabled~.mdc-checkbox__background{border-color:#f44336;border-color:var(--mdc-checkbox-selected-hover-icon-color, #f44336);background-color:#f44336;background-color:var(--mdc-checkbox-selected-hover-icon-color, #f44336)}@keyframes mdc-checkbox-fade-in-background-FF212121FFF4433600000000FFF44336{0%{border-color:#212121;border-color:var(--mdc-checkbox-unselected-hover-icon-color, #212121);background-color:transparent}50%{border-color:#f44336;border-color:var(--mdc-checkbox-selected-hover-icon-color, #f44336);background-color:#f44336;background-color:var(--mdc-checkbox-selected-hover-icon-color, #f44336)}}@keyframes mdc-checkbox-fade-out-background-FF212121FFF4433600000000FFF44336{0%,80%{border-color:#f44336;border-color:var(--mdc-checkbox-selected-hover-icon-color, #f44336);background-color:#f44336;background-color:var(--mdc-checkbox-selected-hover-icon-color, #f44336)}100%{border-color:#212121;border-color:var(--mdc-checkbox-unselected-hover-icon-color, #212121);background-color:transparent}}.mat-mdc-list-option .mdc-checkbox:hover.mdc-checkbox--anim-unchecked-checked .mdc-checkbox__native-control:enabled~.mdc-checkbox__background,.mat-mdc-list-option .mdc-checkbox:hover.mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__native-control:enabled~.mdc-checkbox__background{animation-name:mdc-checkbox-fade-in-background-FF212121FFF4433600000000FFF44336}.mat-mdc-list-option .mdc-checkbox:hover.mdc-checkbox--anim-checked-unchecked .mdc-checkbox__native-control:enabled~.mdc-checkbox__background,.mat-mdc-list-option .mdc-checkbox:hover.mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__native-control:enabled~.mdc-checkbox__background{animation-name:mdc-checkbox-fade-out-background-FF212121FFF4433600000000FFF44336}.mat-mdc-list-option .mdc-checkbox.mdc-ripple-upgraded--background-focused .mdc-checkbox__native-control:enabled:not(:checked):not(:indeterminate):not([data-indeterminate=true])~.mdc-checkbox__background,.mat-mdc-list-option .mdc-checkbox:not(.mdc-ripple-upgraded):focus .mdc-checkbox__native-control:enabled:not(:checked):not(:indeterminate):not([data-indeterminate=true])~.mdc-checkbox__background{border-color:#212121;border-color:var(--mdc-checkbox-unselected-focus-icon-color, #212121);background-color:transparent}.mat-mdc-list-option .mdc-checkbox.mdc-ripple-upgraded--background-focused .mdc-checkbox__native-control:enabled:checked~.mdc-checkbox__background,.mat-mdc-list-option .mdc-checkbox.mdc-ripple-upgraded--background-focused .mdc-checkbox__native-control:enabled:indeterminate~.mdc-checkbox__background,.mat-mdc-list-option .mdc-checkbox.mdc-ripple-upgraded--background-focused .mdc-checkbox__native-control[data-indeterminate=true]:enabled~.mdc-checkbox__background,.mat-mdc-list-option .mdc-checkbox:not(.mdc-ripple-upgraded):focus .mdc-checkbox__native-control:enabled:checked~.mdc-checkbox__background,.mat-mdc-list-option .mdc-checkbox:not(.mdc-ripple-upgraded):focus .mdc-checkbox__native-control:enabled:indeterminate~.mdc-checkbox__background,.mat-mdc-list-option .mdc-checkbox:not(.mdc-ripple-upgraded):focus .mdc-checkbox__native-control[data-indeterminate=true]:enabled~.mdc-checkbox__background{border-color:#f44336;border-color:var(--mdc-checkbox-selected-focus-icon-color, #f44336);background-color:#f44336;background-color:var(--mdc-checkbox-selected-focus-icon-color, #f44336)}@keyframes mdc-checkbox-fade-in-background-FF212121FFF4433600000000FFF44336{0%{border-color:#212121;border-color:var(--mdc-checkbox-unselected-focus-icon-color, #212121);background-color:transparent}50%{border-color:#f44336;border-color:var(--mdc-checkbox-selected-focus-icon-color, #f44336);background-color:#f44336;background-color:var(--mdc-checkbox-selected-focus-icon-color, #f44336)}}@keyframes mdc-checkbox-fade-out-background-FF212121FFF4433600000000FFF44336{0%,80%{border-color:#f44336;border-color:var(--mdc-checkbox-selected-focus-icon-color, #f44336);background-color:#f44336;background-color:var(--mdc-checkbox-selected-focus-icon-color, #f44336)}100%{border-color:#212121;border-color:var(--mdc-checkbox-unselected-focus-icon-color, #212121);background-color:transparent}}.mat-mdc-list-option .mdc-checkbox.mdc-ripple-upgraded--background-focused.mdc-checkbox--anim-unchecked-checked .mdc-checkbox__native-control:enabled~.mdc-checkbox__background,.mat-mdc-list-option .mdc-checkbox.mdc-ripple-upgraded--background-focused.mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__native-control:enabled~.mdc-checkbox__background,.mat-mdc-list-option .mdc-checkbox:not(.mdc-ripple-upgraded):focus.mdc-checkbox--anim-unchecked-checked .mdc-checkbox__native-control:enabled~.mdc-checkbox__background,.mat-mdc-list-option .mdc-checkbox:not(.mdc-ripple-upgraded):focus.mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__native-control:enabled~.mdc-checkbox__background{animation-name:mdc-checkbox-fade-in-background-FF212121FFF4433600000000FFF44336}.mat-mdc-list-option .mdc-checkbox.mdc-ripple-upgraded--background-focused.mdc-checkbox--anim-checked-unchecked .mdc-checkbox__native-control:enabled~.mdc-checkbox__background,.mat-mdc-list-option .mdc-checkbox.mdc-ripple-upgraded--background-focused.mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__native-control:enabled~.mdc-checkbox__background,.mat-mdc-list-option .mdc-checkbox:not(.mdc-ripple-upgraded):focus.mdc-checkbox--anim-checked-unchecked .mdc-checkbox__native-control:enabled~.mdc-checkbox__background,.mat-mdc-list-option .mdc-checkbox:not(.mdc-ripple-upgraded):focus.mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__native-control:enabled~.mdc-checkbox__background{animation-name:mdc-checkbox-fade-out-background-FF212121FFF4433600000000FFF44336}.mat-mdc-list-option .mdc-checkbox:not(:disabled):active .mdc-checkbox__native-control:enabled:not(:checked):not(:indeterminate):not([data-indeterminate=true])~.mdc-checkbox__background{border-color:rgba(0, 0, 0, 0.54);border-color:var(--mdc-checkbox-unselected-pressed-icon-color, rgba(0, 0, 0, 0.54));background-color:transparent}.mat-mdc-list-option .mdc-checkbox:not(:disabled):active .mdc-checkbox__native-control:enabled:checked~.mdc-checkbox__background,.mat-mdc-list-option .mdc-checkbox:not(:disabled):active .mdc-checkbox__native-control:enabled:indeterminate~.mdc-checkbox__background,.mat-mdc-list-option .mdc-checkbox:not(:disabled):active .mdc-checkbox__native-control[data-indeterminate=true]:enabled~.mdc-checkbox__background{border-color:#f44336;border-color:var(--mdc-checkbox-selected-pressed-icon-color, #f44336);background-color:#f44336;background-color:var(--mdc-checkbox-selected-pressed-icon-color, #f44336)}@keyframes mdc-checkbox-fade-in-background-8A000000FFF4433600000000FFF44336{0%{border-color:rgba(0, 0, 0, 0.54);border-color:var(--mdc-checkbox-unselected-pressed-icon-color, rgba(0, 0, 0, 0.54));background-color:transparent}50%{border-color:#f44336;border-color:var(--mdc-checkbox-selected-pressed-icon-color, #f44336);background-color:#f44336;background-color:var(--mdc-checkbox-selected-pressed-icon-color, #f44336)}}@keyframes mdc-checkbox-fade-out-background-8A000000FFF4433600000000FFF44336{0%,80%{border-color:#f44336;border-color:var(--mdc-checkbox-selected-pressed-icon-color, #f44336);background-color:#f44336;background-color:var(--mdc-checkbox-selected-pressed-icon-color, #f44336)}100%{border-color:rgba(0, 0, 0, 0.54);border-color:var(--mdc-checkbox-unselected-pressed-icon-color, rgba(0, 0, 0, 0.54));background-color:transparent}}.mat-mdc-list-option .mdc-checkbox:not(:disabled):active.mdc-checkbox--anim-unchecked-checked .mdc-checkbox__native-control:enabled~.mdc-checkbox__background,.mat-mdc-list-option .mdc-checkbox:not(:disabled):active.mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__native-control:enabled~.mdc-checkbox__background{animation-name:mdc-checkbox-fade-in-background-8A000000FFF4433600000000FFF44336}.mat-mdc-list-option .mdc-checkbox:not(:disabled):active.mdc-checkbox--anim-checked-unchecked .mdc-checkbox__native-control:enabled~.mdc-checkbox__background,.mat-mdc-list-option .mdc-checkbox:not(:disabled):active.mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__native-control:enabled~.mdc-checkbox__background{animation-name:mdc-checkbox-fade-out-background-8A000000FFF4433600000000FFF44336}.mat-mdc-list-option .mdc-checkbox .mdc-checkbox__ripple::before,.mat-mdc-list-option .mdc-checkbox .mdc-checkbox__ripple::after{background-color:black;background-color:var(--mdc-checkbox-unselected-hover-state-layer-color, black)}.mat-mdc-list-option .mdc-checkbox:hover .mdc-checkbox__ripple::before,.mat-mdc-list-option .mdc-checkbox.mdc-ripple-surface--hover .mdc-checkbox__ripple::before{opacity:0.04;opacity:var(--mdc-checkbox-unselected-hover-state-layer-opacity, 0.04)}.mat-mdc-list-option .mdc-checkbox.mdc-ripple-upgraded--background-focused .mdc-checkbox__ripple::before,.mat-mdc-list-option .mdc-checkbox:not(.mdc-ripple-upgraded):focus .mdc-checkbox__ripple::before{transition-duration:75ms;opacity:0.16;opacity:var(--mdc-checkbox-unselected-focus-state-layer-opacity, 0.16)}.mat-mdc-list-option .mdc-checkbox:not(.mdc-ripple-upgraded) .mdc-checkbox__ripple::after{transition:opacity 150ms linear}.mat-mdc-list-option .mdc-checkbox:not(.mdc-ripple-upgraded):active .mdc-checkbox__ripple::after{transition-duration:75ms;opacity:0.16;opacity:var(--mdc-checkbox-unselected-pressed-state-layer-opacity, 0.16)}.mat-mdc-list-option .mdc-checkbox.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-checkbox-unselected-pressed-state-layer-opacity, 0.16)}.mat-mdc-list-option .mdc-checkbox.mdc-checkbox--selected .mdc-checkbox__ripple::before,.mat-mdc-list-option .mdc-checkbox.mdc-checkbox--selected .mdc-checkbox__ripple::after{background-color:#f44336;background-color:var(--mdc-checkbox-selected-hover-state-layer-color, #f44336)}.mat-mdc-list-option .mdc-checkbox.mdc-checkbox--selected:hover .mdc-checkbox__ripple::before,.mat-mdc-list-option .mdc-checkbox.mdc-checkbox--selected.mdc-ripple-surface--hover .mdc-checkbox__ripple::before{opacity:0.04;opacity:var(--mdc-checkbox-selected-hover-state-layer-opacity, 0.04)}.mat-mdc-list-option .mdc-checkbox.mdc-checkbox--selected.mdc-ripple-upgraded--background-focused .mdc-checkbox__ripple::before,.mat-mdc-list-option .mdc-checkbox.mdc-checkbox--selected:not(.mdc-ripple-upgraded):focus .mdc-checkbox__ripple::before{transition-duration:75ms;opacity:0.16;opacity:var(--mdc-checkbox-selected-focus-state-layer-opacity, 0.16)}.mat-mdc-list-option .mdc-checkbox.mdc-checkbox--selected:not(.mdc-ripple-upgraded) .mdc-checkbox__ripple::after{transition:opacity 150ms linear}.mat-mdc-list-option .mdc-checkbox.mdc-checkbox--selected:not(.mdc-ripple-upgraded):active .mdc-checkbox__ripple::after{transition-duration:75ms;opacity:0.16;opacity:var(--mdc-checkbox-selected-pressed-state-layer-opacity, 0.16)}.mat-mdc-list-option .mdc-checkbox.mdc-checkbox--selected.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-checkbox-selected-pressed-state-layer-opacity, 0.16)}.mat-mdc-list-option .mdc-checkbox.mdc-ripple-upgraded--background-focused.mdc-checkbox--selected .mdc-checkbox__ripple::before,.mat-mdc-list-option .mdc-checkbox.mdc-ripple-upgraded--background-focused.mdc-checkbox--selected .mdc-checkbox__ripple::after{background-color:#f44336;background-color:var(--mdc-checkbox-selected-hover-state-layer-color, #f44336)}.mat-mdc-list-option .mdc-checkbox .mdc-checkbox__background{top:calc((40px - 18px) / 2);top:calc((var(--mdc-checkbox-state-layer-size, 40px) - 18px) / 2);left:calc((40px - 18px) / 2);left:calc((var(--mdc-checkbox-state-layer-size, 40px) - 18px) / 2)}.mat-mdc-list-option .mdc-checkbox .mdc-checkbox__native-control{top:calc((40px - 40px) / 2);top:calc((var(--mdc-checkbox-state-layer-size, 40px) - var(--mdc-checkbox-state-layer-size, 40px)) / 2);right:calc((40px - 40px) / 2);right:calc((var(--mdc-checkbox-state-layer-size, 40px) - var(--mdc-checkbox-state-layer-size, 40px)) / 2);left:calc((40px - 40px) / 2);left:calc((var(--mdc-checkbox-state-layer-size, 40px) - var(--mdc-checkbox-state-layer-size, 40px)) / 2);width:40px;width:var(--mdc-checkbox-state-layer-size, 40px);height:40px;height:var(--mdc-checkbox-state-layer-size, 40px)}.mat-mdc-list-option .mdc-radio{padding:calc((40px - 20px) / 2);padding:calc((var(--mdc-radio-state-layer-size, 40px) - 20px) / 2)}.mat-mdc-list-option .mdc-radio [aria-disabled=true] .mdc-radio__native-control:checked+.mdc-radio__background .mdc-radio__outer-circle,.mat-mdc-list-option .mdc-radio .mdc-radio__native-control:disabled:checked+.mdc-radio__background .mdc-radio__outer-circle{border-color:#000;border-color:var(--mdc-radio-disabled-selected-icon-color, #000)}.mat-mdc-list-option .mdc-radio [aria-disabled=true] .mdc-radio__native-control+.mdc-radio__background .mdc-radio__inner-circle,.mat-mdc-list-option .mdc-radio .mdc-radio__native-control:disabled+.mdc-radio__background .mdc-radio__inner-circle{border-color:#000;border-color:var(--mdc-radio-disabled-selected-icon-color, #000)}.mat-mdc-list-option .mdc-radio [aria-disabled=true] .mdc-radio__native-control:checked+.mdc-radio__background .mdc-radio__outer-circle,.mat-mdc-list-option .mdc-radio .mdc-radio__native-control:disabled:checked+.mdc-radio__background .mdc-radio__outer-circle{opacity:0.38;opacity:var(--mdc-radio-disabled-selected-icon-opacity, 0.38)}.mat-mdc-list-option .mdc-radio [aria-disabled=true] .mdc-radio__native-control+.mdc-radio__background .mdc-radio__inner-circle,.mat-mdc-list-option .mdc-radio .mdc-radio__native-control:disabled+.mdc-radio__background .mdc-radio__inner-circle{opacity:0.38;opacity:var(--mdc-radio-disabled-selected-icon-opacity, 0.38)}.mat-mdc-list-option .mdc-radio [aria-disabled=true] .mdc-radio__native-control:not(:checked)+.mdc-radio__background .mdc-radio__outer-circle,.mat-mdc-list-option .mdc-radio .mdc-radio__native-control:disabled:not(:checked)+.mdc-radio__background .mdc-radio__outer-circle{border-color:#000;border-color:var(--mdc-radio-disabled-unselected-icon-color, #000)}.mat-mdc-list-option .mdc-radio [aria-disabled=true] .mdc-radio__native-control:not(:checked)+.mdc-radio__background .mdc-radio__outer-circle,.mat-mdc-list-option .mdc-radio .mdc-radio__native-control:disabled:not(:checked)+.mdc-radio__background .mdc-radio__outer-circle{opacity:0.38;opacity:var(--mdc-radio-disabled-unselected-icon-opacity, 0.38)}.mat-mdc-list-option .mdc-radio.mdc-ripple-upgraded--background-focused .mdc-radio__native-control:enabled:checked+.mdc-radio__background .mdc-radio__outer-circle,.mat-mdc-list-option .mdc-radio:not(.mdc-ripple-upgraded):focus .mdc-radio__native-control:enabled:checked+.mdc-radio__background .mdc-radio__outer-circle{border-color:#f44336;border-color:var(--mdc-radio-selected-focus-icon-color, #f44336)}.mat-mdc-list-option .mdc-radio.mdc-ripple-upgraded--background-focused .mdc-radio__native-control:enabled+.mdc-radio__background .mdc-radio__inner-circle,.mat-mdc-list-option .mdc-radio:not(.mdc-ripple-upgraded):focus .mdc-radio__native-control:enabled+.mdc-radio__background .mdc-radio__inner-circle{border-color:#f44336;border-color:var(--mdc-radio-selected-focus-icon-color, #f44336)}.mat-mdc-list-option .mdc-radio:hover .mdc-radio__native-control:enabled:checked+.mdc-radio__background .mdc-radio__outer-circle{border-color:#f44336;border-color:var(--mdc-radio-selected-hover-icon-color, #f44336)}.mat-mdc-list-option .mdc-radio:hover .mdc-radio__native-control:enabled+.mdc-radio__background .mdc-radio__inner-circle{border-color:#f44336;border-color:var(--mdc-radio-selected-hover-icon-color, #f44336)}.mat-mdc-list-option .mdc-radio .mdc-radio__native-control:enabled:checked+.mdc-radio__background .mdc-radio__outer-circle{border-color:#f44336;border-color:var(--mdc-radio-selected-icon-color, #f44336)}.mat-mdc-list-option .mdc-radio .mdc-radio__native-control:enabled+.mdc-radio__background .mdc-radio__inner-circle{border-color:#f44336;border-color:var(--mdc-radio-selected-icon-color, #f44336)}.mat-mdc-list-option .mdc-radio:not(:disabled):active .mdc-radio__native-control:enabled:checked+.mdc-radio__background .mdc-radio__outer-circle{border-color:#f44336;border-color:var(--mdc-radio-selected-pressed-icon-color, #f44336)}.mat-mdc-list-option .mdc-radio:not(:disabled):active .mdc-radio__native-control:enabled+.mdc-radio__background .mdc-radio__inner-circle{border-color:#f44336;border-color:var(--mdc-radio-selected-pressed-icon-color, #f44336)}.mat-mdc-list-option .mdc-radio:hover .mdc-radio__native-control:enabled:not(:checked)+.mdc-radio__background .mdc-radio__outer-circle{border-color:#212121;border-color:var(--mdc-radio-unselected-hover-icon-color, #212121)}.mat-mdc-list-option .mdc-radio .mdc-radio__native-control:enabled:not(:checked)+.mdc-radio__background .mdc-radio__outer-circle{border-color:rgba(0, 0, 0, 0.54);border-color:var(--mdc-radio-unselected-icon-color, rgba(0, 0, 0, 0.54))}.mat-mdc-list-option .mdc-radio:not(:disabled):active .mdc-radio__native-control:enabled:not(:checked)+.mdc-radio__background .mdc-radio__outer-circle{border-color:rgba(0, 0, 0, 0.54);border-color:var(--mdc-radio-unselected-pressed-icon-color, rgba(0, 0, 0, 0.54))}.mat-mdc-list-option .mdc-radio .mdc-radio__background::before{top:calc(-1 * (40px - 20px) / 2);top:calc(-1 * (var(--mdc-radio-state-layer-size, 40px) - 20px) / 2);left:calc(-1 * (40px - 20px) / 2);left:calc(-1 * (var(--mdc-radio-state-layer-size, 40px) - 20px) / 2);width:40px;width:var(--mdc-radio-state-layer-size, 40px);height:40px;height:var(--mdc-radio-state-layer-size, 40px)}.mat-mdc-list-option .mdc-radio .mdc-radio__native-control{top:calc((40px - 40px) / 2);top:calc((var(--mdc-radio-state-layer-size, 40px) - var(--mdc-radio-state-layer-size, 40px)) / 2);right:calc((40px - 40px) / 2);right:calc((var(--mdc-radio-state-layer-size, 40px) - var(--mdc-radio-state-layer-size, 40px)) / 2);left:calc((40px - 40px) / 2);left:calc((var(--mdc-radio-state-layer-size, 40px) - var(--mdc-radio-state-layer-size, 40px)) / 2);width:40px;width:var(--mdc-radio-state-layer-size, 40px);height:40px;height:var(--mdc-radio-state-layer-size, 40px)}.mat-mdc-list-option .mdc-checkbox__native-control,.mat-mdc-list-option .mdc-radio__native-control{display:none}.cdk-high-contrast-active .mat-mdc-list-option.mdc-list-item--selected::after{content:\"\";position:absolute;top:50%;right:16px;transform:translateY(-50%);width:10px;height:0;border-bottom:solid 10px;border-radius:10px}.cdk-high-contrast-active .mat-mdc-list-option.mdc-list-item--selected [dir=rtl]::after{right:auto;left:16px}"],
  encapsulation: 2,
  changeDetection: 0
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MatListOption, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Component,
    args: [{
      selector: 'mat-list-option',
      exportAs: 'matListOption',
      host: {
        'class': 'mat-mdc-list-item mat-mdc-list-option mdc-list-item',
        'role': 'option',
        // As per MDC, only list items without checkbox or radio indicator should receive the
        // `--selected` class.
        '[class.mdc-list-item--selected]': 'selected && !_selectionList.multiple && _selectionList.hideSingleSelectionIndicator',
        // Based on the checkbox/radio position and whether there are icons or avatars, we apply MDC's
        // list-item `--leading` and `--trailing` classes.
        '[class.mdc-list-item--with-leading-avatar]': '_hasProjected("avatars", "before")',
        '[class.mdc-list-item--with-leading-icon]': '_hasProjected("icons", "before")',
        '[class.mdc-list-item--with-trailing-icon]': '_hasProjected("icons", "after")',
        '[class.mat-mdc-list-option-with-trailing-avatar]': '_hasProjected("avatars", "after")',
        // Based on the checkbox/radio position, we apply the `--leading` or `--trailing` MDC classes
        // which ensure that the checkbox/radio is positioned correctly within the list item.
        '[class.mdc-list-item--with-leading-checkbox]': '_hasCheckboxAt("before")',
        '[class.mdc-list-item--with-trailing-checkbox]': '_hasCheckboxAt("after")',
        '[class.mdc-list-item--with-leading-radio]': '_hasRadioAt("before")',
        '[class.mdc-list-item--with-trailing-radio]': '_hasRadioAt("after")',
        '[class.mat-accent]': 'color !== "primary" && color !== "warn"',
        '[class.mat-warn]': 'color === "warn"',
        '[class._mat-animation-noopable]': '_noopAnimations',
        '[attr.aria-selected]': 'selected',
        '(blur)': '_handleBlur()',
        '(click)': '_toggleOnInteraction()'
      },
      encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewEncapsulation.None,
      changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectionStrategy.OnPush,
      providers: [{
        provide: MatListItemBase,
        useExisting: MatListOption
      }, {
        provide: LIST_OPTION,
        useExisting: MatListOption
      }],
      template: "<!--\n  Save icons and the pseudo checkbox/radio so that they can be re-used in the template without\n  duplication. Also content can only be injected once so we need to extract icons/avatars\n  into a template since we use it in multiple places.\n-->\n<ng-template #icons>\n  <ng-content select=\"[matListItemAvatar],[matListItemIcon]\">\n  </ng-content>\n</ng-template>\n\n<ng-template #checkbox>\n  <div class=\"mdc-checkbox\" [class.mdc-checkbox--disabled]=\"disabled\">\n    <input type=\"checkbox\" class=\"mdc-checkbox__native-control\"\n           [checked]=\"selected\" [disabled]=\"disabled\"/>\n    <div class=\"mdc-checkbox__background\">\n      <svg class=\"mdc-checkbox__checkmark\"\n           viewBox=\"0 0 24 24\"\n           aria-hidden=\"true\">\n        <path class=\"mdc-checkbox__checkmark-path\"\n              fill=\"none\"\n              d=\"M1.73,12.91 8.1,19.28 22.79,4.59\"/>\n      </svg>\n      <div class=\"mdc-checkbox__mixedmark\"></div>\n    </div>\n  </div>\n</ng-template>\n\n<ng-template #radio>\n  <div class=\"mdc-radio\" [class.mdc-radio--disabled]=\"disabled\">\n    <input type=\"radio\" class=\"mdc-radio__native-control\"\n           [checked]=\"selected\" [disabled]=\"disabled\"/>\n    <div class=\"mdc-radio__background\">\n      <div class=\"mdc-radio__outer-circle\"></div>\n      <div class=\"mdc-radio__inner-circle\"></div>\n    </div>\n  </div>\n</ng-template>\n\n<!-- Container for the checkbox at start. -->\n<span class=\"mdc-list-item__start mat-mdc-list-option-checkbox-before\"\n      *ngIf=\"_hasCheckboxAt('before')\">\n  <ng-template [ngTemplateOutlet]=\"checkbox\"></ng-template>\n</span>\n<!-- Container for the radio at the start. -->\n<span class=\"mdc-list-item__start mat-mdc-list-option-radio-before\"\n      *ngIf=\"_hasRadioAt('before')\">\n  <ng-template [ngTemplateOutlet]=\"radio\"></ng-template>\n</span>\n<!-- Conditionally renders icons/avatars before the list item text. -->\n<ng-template [ngIf]=\"_hasIconsOrAvatarsAt('before')\">\n  <ng-template [ngTemplateOutlet]=\"icons\"></ng-template>\n</ng-template>\n\n<!-- Text -->\n<span class=\"mdc-list-item__content\">\n  <ng-content select=\"[matListItemTitle]\"></ng-content>\n  <ng-content select=\"[matListItemLine]\"></ng-content>\n  <span #unscopedContent class=\"mat-mdc-list-item-unscoped-content\"\n        (cdkObserveContent)=\"_updateItemLines(true)\">\n    <ng-content></ng-content>\n  </span>\n</span>\n\n<!-- Container for the checkbox at the end. -->\n<span class=\"mdc-list-item__end\" *ngIf=\"_hasCheckboxAt('after')\">\n  <ng-template [ngTemplateOutlet]=\"checkbox\"></ng-template>\n</span>\n<!-- Container for the radio at the end. -->\n<span class=\"mdc-list-item__end\" *ngIf=\"_hasRadioAt('after')\">\n  <ng-template [ngTemplateOutlet]=\"radio\"></ng-template>\n</span>\n<!-- Conditionally renders icons/avatars after the list item text. -->\n<ng-template [ngIf]=\"_hasIconsOrAvatarsAt('after')\">\n  <ng-template [ngTemplateOutlet]=\"icons\"></ng-template>\n</ng-template>\n\n<!-- Divider -->\n<ng-content select=\"mat-divider\"></ng-content>\n\n<!--\n  Strong focus indicator element. MDC uses the `::before` pseudo element for the default\n  focus/hover/selected state, so we need a separate element.\n-->\n<div class=\"mat-mdc-focus-indicator\"></div>\n",
      styles: [".mat-mdc-list-option-with-trailing-avatar.mdc-list-item{padding-left:auto;padding-right:0}[dir=rtl] .mat-mdc-list-option-with-trailing-avatar.mdc-list-item,.mat-mdc-list-option-with-trailing-avatar.mdc-list-item[dir=rtl]{padding-left:0;padding-right:auto}.mat-mdc-list-option-with-trailing-avatar .mdc-list-item__end{margin-left:16px;margin-right:16px}[dir=rtl] .mat-mdc-list-option-with-trailing-avatar .mdc-list-item__end,.mat-mdc-list-option-with-trailing-avatar .mdc-list-item__end[dir=rtl]{margin-left:16px;margin-right:16px}.mat-mdc-list-option-with-trailing-avatar .mdc-list-item__end{width:40px;height:40px}.mat-mdc-list-option-with-trailing-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mat-mdc-list-option-with-trailing-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mat-mdc-list-option-with-trailing-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mat-mdc-list-option-with-trailing-avatar .mdc-list-item__end{border-radius:50%}.mat-mdc-list-option .mdc-touch-target-wrapper{display:inline}.mat-mdc-list-option .mdc-checkbox{display:inline-block;position:relative;flex:0 0 18px;box-sizing:content-box;width:18px;height:18px;line-height:0;white-space:nowrap;cursor:pointer;vertical-align:bottom}.mat-mdc-list-option .mdc-checkbox[hidden]{display:none}.mat-mdc-list-option .mdc-checkbox.mdc-ripple-upgraded--background-focused .mdc-checkbox__focus-ring,.mat-mdc-list-option .mdc-checkbox:not(.mdc-ripple-upgraded):focus .mdc-checkbox__focus-ring{pointer-events:none;border:2px solid rgba(0,0,0,0);border-radius:6px;box-sizing:content-box;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);height:100%;width:100%}@media screen and (forced-colors: active){.mat-mdc-list-option .mdc-checkbox.mdc-ripple-upgraded--background-focused .mdc-checkbox__focus-ring,.mat-mdc-list-option .mdc-checkbox:not(.mdc-ripple-upgraded):focus .mdc-checkbox__focus-ring{border-color:CanvasText}}.mat-mdc-list-option .mdc-checkbox.mdc-ripple-upgraded--background-focused .mdc-checkbox__focus-ring::after,.mat-mdc-list-option .mdc-checkbox:not(.mdc-ripple-upgraded):focus .mdc-checkbox__focus-ring::after{content:\"\";border:2px solid rgba(0,0,0,0);border-radius:8px;display:block;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);height:calc(100% + 4px);width:calc(100% + 4px)}@media screen and (forced-colors: active){.mat-mdc-list-option .mdc-checkbox.mdc-ripple-upgraded--background-focused .mdc-checkbox__focus-ring::after,.mat-mdc-list-option .mdc-checkbox:not(.mdc-ripple-upgraded):focus .mdc-checkbox__focus-ring::after{border-color:CanvasText}}@media all and (-ms-high-contrast: none){.mat-mdc-list-option .mdc-checkbox .mdc-checkbox__focus-ring{display:none}}@media screen and (forced-colors: active),(-ms-high-contrast: active){.mat-mdc-list-option .mdc-checkbox__mixedmark{margin:0 1px}}.mat-mdc-list-option .mdc-checkbox--disabled{cursor:default;pointer-events:none}.mat-mdc-list-option .mdc-checkbox__background{display:inline-flex;position:absolute;align-items:center;justify-content:center;box-sizing:border-box;width:18px;height:18px;border:2px solid currentColor;border-radius:2px;background-color:rgba(0,0,0,0);pointer-events:none;will-change:background-color,border-color}.mat-mdc-list-option .mdc-checkbox__checkmark{position:absolute;top:0;right:0;bottom:0;left:0;width:100%;opacity:0}.mdc-checkbox--upgraded .mat-mdc-list-option .mdc-checkbox__checkmark{opacity:1}.mat-mdc-list-option .mdc-checkbox__checkmark-path{stroke:currentColor;stroke-width:3.12px;stroke-dashoffset:29.7833385;stroke-dasharray:29.7833385}.mat-mdc-list-option .mdc-checkbox__mixedmark{width:100%;height:0;transform:scaleX(0) rotate(0deg);border-width:1px;border-style:solid;opacity:0}.mat-mdc-list-option .mdc-checkbox__native-control:checked~.mdc-checkbox__background .mdc-checkbox__checkmark-path,.mat-mdc-list-option .mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background .mdc-checkbox__checkmark-path,.mat-mdc-list-option .mdc-checkbox__native-control[data-indeterminate=true]~.mdc-checkbox__background .mdc-checkbox__checkmark-path{stroke-dashoffset:0}.mat-mdc-list-option .mdc-checkbox__native-control{position:absolute;margin:0;padding:0;opacity:0;cursor:inherit}.mat-mdc-list-option .mdc-checkbox__native-control:disabled{cursor:default;pointer-events:none}.mat-mdc-list-option .mdc-checkbox--touch{margin:calc((var(--mdc-checkbox-state-layer-size, 48px) - var(--mdc-checkbox-state-layer-size, 40px)) / 2)}.mat-mdc-list-option .mdc-checkbox--touch .mdc-checkbox__native-control{top:calc((var(--mdc-checkbox-state-layer-size, 40px) - var(--mdc-checkbox-state-layer-size, 48px)) / 2);right:calc((var(--mdc-checkbox-state-layer-size, 40px) - var(--mdc-checkbox-state-layer-size, 48px)) / 2);left:calc((var(--mdc-checkbox-state-layer-size, 40px) - var(--mdc-checkbox-state-layer-size, 48px)) / 2);width:var(--mdc-checkbox-state-layer-size, 48px);height:var(--mdc-checkbox-state-layer-size, 48px)}.mat-mdc-list-option .mdc-checkbox__native-control:checked~.mdc-checkbox__background .mdc-checkbox__checkmark{opacity:1}.mat-mdc-list-option .mdc-checkbox__native-control:checked~.mdc-checkbox__background .mdc-checkbox__mixedmark{transform:scaleX(1) rotate(-45deg)}.mat-mdc-list-option .mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background .mdc-checkbox__checkmark,.mat-mdc-list-option .mdc-checkbox__native-control[data-indeterminate=true]~.mdc-checkbox__background .mdc-checkbox__checkmark{transform:rotate(45deg);opacity:0}.mat-mdc-list-option .mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background .mdc-checkbox__mixedmark,.mat-mdc-list-option .mdc-checkbox__native-control[data-indeterminate=true]~.mdc-checkbox__background .mdc-checkbox__mixedmark{transform:scaleX(1) rotate(0deg);opacity:1}.mat-mdc-list-option .mdc-radio{display:inline-block;position:relative;flex:0 0 auto;box-sizing:content-box;width:20px;height:20px;cursor:pointer;will-change:opacity,transform,border-color,color}.mat-mdc-list-option .mdc-radio[hidden]{display:none}.mat-mdc-list-option .mdc-radio__background{display:inline-block;position:relative;box-sizing:border-box;width:20px;height:20px}.mat-mdc-list-option .mdc-radio__background::before{position:absolute;transform:scale(0, 0);border-radius:50%;opacity:0;pointer-events:none;content:\"\"}.mat-mdc-list-option .mdc-radio__outer-circle{position:absolute;top:0;left:0;box-sizing:border-box;width:100%;height:100%;border-width:2px;border-style:solid;border-radius:50%}.mat-mdc-list-option .mdc-radio__inner-circle{position:absolute;top:0;left:0;box-sizing:border-box;width:100%;height:100%;transform:scale(0, 0);border-width:10px;border-style:solid;border-radius:50%}.mat-mdc-list-option .mdc-radio__native-control{position:absolute;margin:0;padding:0;opacity:0;cursor:inherit;z-index:1}.mat-mdc-list-option .mdc-radio--touch{margin-top:4px;margin-bottom:4px;margin-right:4px;margin-left:4px}.mat-mdc-list-option .mdc-radio--touch .mdc-radio__native-control{top:calc((40px - 48px) / 2);right:calc((40px - 48px) / 2);left:calc((40px - 48px) / 2);width:48px;height:48px}.mat-mdc-list-option .mdc-radio.mdc-ripple-upgraded--background-focused .mdc-radio__focus-ring,.mat-mdc-list-option .mdc-radio:not(.mdc-ripple-upgraded):focus .mdc-radio__focus-ring{pointer-events:none;border:2px solid rgba(0,0,0,0);border-radius:6px;box-sizing:content-box;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);height:100%;width:100%}@media screen and (forced-colors: active){.mat-mdc-list-option .mdc-radio.mdc-ripple-upgraded--background-focused .mdc-radio__focus-ring,.mat-mdc-list-option .mdc-radio:not(.mdc-ripple-upgraded):focus .mdc-radio__focus-ring{border-color:CanvasText}}.mat-mdc-list-option .mdc-radio.mdc-ripple-upgraded--background-focused .mdc-radio__focus-ring::after,.mat-mdc-list-option .mdc-radio:not(.mdc-ripple-upgraded):focus .mdc-radio__focus-ring::after{content:\"\";border:2px solid rgba(0,0,0,0);border-radius:8px;display:block;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);height:calc(100% + 4px);width:calc(100% + 4px)}@media screen and (forced-colors: active){.mat-mdc-list-option .mdc-radio.mdc-ripple-upgraded--background-focused .mdc-radio__focus-ring::after,.mat-mdc-list-option .mdc-radio:not(.mdc-ripple-upgraded):focus .mdc-radio__focus-ring::after{border-color:CanvasText}}.mat-mdc-list-option .mdc-radio--disabled{cursor:default;pointer-events:none}.mat-mdc-list-option .mdc-radio__native-control:checked+.mdc-radio__background .mdc-radio__inner-circle{transform:scale(0.5)}.mat-mdc-list-option .mdc-radio__native-control:disabled+.mdc-radio__background,.mat-mdc-list-option [aria-disabled=true] .mdc-radio__native-control+.mdc-radio__background{cursor:default}.mat-mdc-list-option .mdc-radio__native-control:focus+.mdc-radio__background::before{transform:scale(1);opacity:.12}@keyframes mdc-checkbox-unchecked-checked-checkmark-path{0%,50%{stroke-dashoffset:29.7833385}50%{animation-timing-function:cubic-bezier(0, 0, 0.2, 1)}100%{stroke-dashoffset:0}}@keyframes mdc-checkbox-unchecked-indeterminate-mixedmark{0%,68.2%{transform:scaleX(0)}68.2%{animation-timing-function:cubic-bezier(0, 0, 0, 1)}100%{transform:scaleX(1)}}@keyframes mdc-checkbox-checked-unchecked-checkmark-path{from{animation-timing-function:cubic-bezier(0.4, 0, 1, 1);opacity:1;stroke-dashoffset:0}to{opacity:0;stroke-dashoffset:-29.7833385}}@keyframes mdc-checkbox-checked-indeterminate-checkmark{from{animation-timing-function:cubic-bezier(0, 0, 0.2, 1);transform:rotate(0deg);opacity:1}to{transform:rotate(45deg);opacity:0}}@keyframes mdc-checkbox-indeterminate-checked-checkmark{from{animation-timing-function:cubic-bezier(0.14, 0, 0, 1);transform:rotate(45deg);opacity:0}to{transform:rotate(360deg);opacity:1}}@keyframes mdc-checkbox-checked-indeterminate-mixedmark{from{animation-timing-function:mdc-animation-deceleration-curve-timing-function;transform:rotate(-45deg);opacity:0}to{transform:rotate(0deg);opacity:1}}@keyframes mdc-checkbox-indeterminate-checked-mixedmark{from{animation-timing-function:cubic-bezier(0.14, 0, 0, 1);transform:rotate(0deg);opacity:1}to{transform:rotate(315deg);opacity:0}}@keyframes mdc-checkbox-indeterminate-unchecked-mixedmark{0%{animation-timing-function:linear;transform:scaleX(1);opacity:1}32.8%,100%{transform:scaleX(0);opacity:0}}@media all and (-ms-high-contrast: none){.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox .mdc-checkbox__focus-ring{display:none}}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox__background{transition:background-color 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1),border-color 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox__checkmark{transition:opacity 180ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox__checkmark-path{transition:stroke-dashoffset 180ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox__mixedmark{transition:opacity 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1),transform 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox--anim-unchecked-checked .mdc-checkbox__background,.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__background,.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox--anim-checked-unchecked .mdc-checkbox__background,.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__background{animation-duration:180ms;animation-timing-function:linear}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox--anim-unchecked-checked .mdc-checkbox__checkmark-path{animation:mdc-checkbox-unchecked-checked-checkmark-path 180ms linear 0s;transition:none}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__mixedmark{animation:mdc-checkbox-unchecked-indeterminate-mixedmark 90ms linear 0s;transition:none}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox--anim-checked-unchecked .mdc-checkbox__checkmark-path{animation:mdc-checkbox-checked-unchecked-checkmark-path 90ms linear 0s;transition:none}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox--anim-checked-indeterminate .mdc-checkbox__checkmark{animation:mdc-checkbox-checked-indeterminate-checkmark 90ms linear 0s;transition:none}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox--anim-checked-indeterminate .mdc-checkbox__mixedmark{animation:mdc-checkbox-checked-indeterminate-mixedmark 90ms linear 0s;transition:none}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox--anim-indeterminate-checked .mdc-checkbox__checkmark{animation:mdc-checkbox-indeterminate-checked-checkmark 500ms linear 0s;transition:none}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox--anim-indeterminate-checked .mdc-checkbox__mixedmark{animation:mdc-checkbox-indeterminate-checked-mixedmark 500ms linear 0s;transition:none}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__mixedmark{animation:mdc-checkbox-indeterminate-unchecked-mixedmark 300ms linear 0s;transition:none}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox__native-control:checked~.mdc-checkbox__background,.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background,.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox__native-control[data-indeterminate=true]~.mdc-checkbox__background{transition:border-color 90ms 0ms cubic-bezier(0, 0, 0.2, 1),background-color 90ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox__native-control:checked~.mdc-checkbox__background .mdc-checkbox__checkmark{transition:opacity 180ms 0ms cubic-bezier(0, 0, 0.2, 1),transform 180ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background .mdc-checkbox__checkmark,.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox__native-control[data-indeterminate=true]~.mdc-checkbox__background .mdc-checkbox__checkmark{transition:opacity 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1),transform 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox.mdc-checkbox--upgraded .mdc-checkbox__background,.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox.mdc-checkbox--upgraded .mdc-checkbox__checkmark,.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox.mdc-checkbox--upgraded .mdc-checkbox__checkmark-path,.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox.mdc-checkbox--upgraded .mdc-checkbox__mixedmark{transition:none}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-radio__background::before{transition:opacity 120ms 0ms cubic-bezier(0.4, 0, 0.6, 1),transform 120ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-radio__outer-circle{transition:border-color 120ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-radio__inner-circle{transition:transform 120ms 0ms cubic-bezier(0.4, 0, 0.6, 1),border-color 120ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-radio__native-control:checked+.mdc-radio__background,.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-radio__native-control:disabled+.mdc-radio__background{transition:opacity 120ms 0ms cubic-bezier(0, 0, 0.2, 1),transform 120ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-radio__native-control:checked+.mdc-radio__background .mdc-radio__outer-circle,.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-radio__native-control:disabled+.mdc-radio__background .mdc-radio__outer-circle{transition:border-color 120ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-radio__native-control:checked+.mdc-radio__background .mdc-radio__inner-circle,.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-radio__native-control:disabled+.mdc-radio__background .mdc-radio__inner-circle{transition:transform 120ms 0ms cubic-bezier(0, 0, 0.2, 1),border-color 120ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-radio__native-control:checked+.mdc-radio__background .mdc-radio__inner-circle{transition:transform 120ms 0ms cubic-bezier(0, 0, 0.2, 1),border-color 120ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-radio__native-control:focus+.mdc-radio__background::before{transition:opacity 120ms 0ms cubic-bezier(0, 0, 0.2, 1),transform 120ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-list-option .mdc-checkbox{padding:calc((40px - 18px) / 2);padding:calc((var(--mdc-checkbox-state-layer-size, 40px) - 18px) / 2);margin:calc((40px - 40px) / 2);margin:calc((var(--mdc-checkbox-state-layer-size, 40px) - var(--mdc-checkbox-state-layer-size, 40px)) / 2)}.mat-mdc-list-option .mdc-checkbox .mdc-checkbox__native-control[disabled]:not(:checked):not(:indeterminate):not([data-indeterminate=true])~.mdc-checkbox__background{border-color:rgba(0, 0, 0, 0.38);border-color:var(--mdc-checkbox-disabled-unselected-icon-color, rgba(0, 0, 0, 0.38));background-color:transparent}.mat-mdc-list-option .mdc-checkbox .mdc-checkbox__native-control[disabled]:checked~.mdc-checkbox__background,.mat-mdc-list-option .mdc-checkbox .mdc-checkbox__native-control[disabled]:indeterminate~.mdc-checkbox__background,.mat-mdc-list-option .mdc-checkbox .mdc-checkbox__native-control[data-indeterminate=true][disabled]~.mdc-checkbox__background{border-color:transparent;background-color:rgba(0, 0, 0, 0.38);background-color:var(--mdc-checkbox-disabled-selected-icon-color, rgba(0, 0, 0, 0.38))}.mat-mdc-list-option .mdc-checkbox .mdc-checkbox__native-control:enabled~.mdc-checkbox__background .mdc-checkbox__checkmark{color:#fff;color:var(--mdc-checkbox-selected-checkmark-color, \"#fff\")}.mat-mdc-list-option .mdc-checkbox .mdc-checkbox__native-control:enabled~.mdc-checkbox__background .mdc-checkbox__mixedmark{border-color:#fff;border-color:var(--mdc-checkbox-selected-checkmark-color, \"#fff\")}.mat-mdc-list-option .mdc-checkbox .mdc-checkbox__native-control:disabled~.mdc-checkbox__background .mdc-checkbox__checkmark{color:#fff;color:var(--mdc-checkbox-disabled-selected-checkmark-color, #fff)}.mat-mdc-list-option .mdc-checkbox .mdc-checkbox__native-control:disabled~.mdc-checkbox__background .mdc-checkbox__mixedmark{border-color:#fff;border-color:var(--mdc-checkbox-disabled-selected-checkmark-color, #fff)}.mat-mdc-list-option .mdc-checkbox .mdc-checkbox__native-control:enabled:not(:checked):not(:indeterminate):not([data-indeterminate=true])~.mdc-checkbox__background{border-color:rgba(0, 0, 0, 0.54);border-color:var(--mdc-checkbox-unselected-icon-color, rgba(0, 0, 0, 0.54));background-color:transparent}.mat-mdc-list-option .mdc-checkbox .mdc-checkbox__native-control:enabled:checked~.mdc-checkbox__background,.mat-mdc-list-option .mdc-checkbox .mdc-checkbox__native-control:enabled:indeterminate~.mdc-checkbox__background,.mat-mdc-list-option .mdc-checkbox .mdc-checkbox__native-control[data-indeterminate=true]:enabled~.mdc-checkbox__background{border-color:#f44336;border-color:var(--mdc-checkbox-selected-icon-color, #f44336);background-color:#f44336;background-color:var(--mdc-checkbox-selected-icon-color, #f44336)}@keyframes mdc-checkbox-fade-in-background-8A000000FFF4433600000000FFF44336{0%{border-color:rgba(0, 0, 0, 0.54);border-color:var(--mdc-checkbox-unselected-icon-color, rgba(0, 0, 0, 0.54));background-color:transparent}50%{border-color:#f44336;border-color:var(--mdc-checkbox-selected-icon-color, #f44336);background-color:#f44336;background-color:var(--mdc-checkbox-selected-icon-color, #f44336)}}@keyframes mdc-checkbox-fade-out-background-8A000000FFF4433600000000FFF44336{0%,80%{border-color:#f44336;border-color:var(--mdc-checkbox-selected-icon-color, #f44336);background-color:#f44336;background-color:var(--mdc-checkbox-selected-icon-color, #f44336)}100%{border-color:rgba(0, 0, 0, 0.54);border-color:var(--mdc-checkbox-unselected-icon-color, rgba(0, 0, 0, 0.54));background-color:transparent}}.mat-mdc-list-option .mdc-checkbox.mdc-checkbox--anim-unchecked-checked .mdc-checkbox__native-control:enabled~.mdc-checkbox__background,.mat-mdc-list-option .mdc-checkbox.mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__native-control:enabled~.mdc-checkbox__background{animation-name:mdc-checkbox-fade-in-background-8A000000FFF4433600000000FFF44336}.mat-mdc-list-option .mdc-checkbox.mdc-checkbox--anim-checked-unchecked .mdc-checkbox__native-control:enabled~.mdc-checkbox__background,.mat-mdc-list-option .mdc-checkbox.mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__native-control:enabled~.mdc-checkbox__background{animation-name:mdc-checkbox-fade-out-background-8A000000FFF4433600000000FFF44336}.mat-mdc-list-option .mdc-checkbox:hover .mdc-checkbox__native-control:enabled:not(:checked):not(:indeterminate):not([data-indeterminate=true])~.mdc-checkbox__background{border-color:#212121;border-color:var(--mdc-checkbox-unselected-hover-icon-color, #212121);background-color:transparent}.mat-mdc-list-option .mdc-checkbox:hover .mdc-checkbox__native-control:enabled:checked~.mdc-checkbox__background,.mat-mdc-list-option .mdc-checkbox:hover .mdc-checkbox__native-control:enabled:indeterminate~.mdc-checkbox__background,.mat-mdc-list-option .mdc-checkbox:hover .mdc-checkbox__native-control[data-indeterminate=true]:enabled~.mdc-checkbox__background{border-color:#f44336;border-color:var(--mdc-checkbox-selected-hover-icon-color, #f44336);background-color:#f44336;background-color:var(--mdc-checkbox-selected-hover-icon-color, #f44336)}@keyframes mdc-checkbox-fade-in-background-FF212121FFF4433600000000FFF44336{0%{border-color:#212121;border-color:var(--mdc-checkbox-unselected-hover-icon-color, #212121);background-color:transparent}50%{border-color:#f44336;border-color:var(--mdc-checkbox-selected-hover-icon-color, #f44336);background-color:#f44336;background-color:var(--mdc-checkbox-selected-hover-icon-color, #f44336)}}@keyframes mdc-checkbox-fade-out-background-FF212121FFF4433600000000FFF44336{0%,80%{border-color:#f44336;border-color:var(--mdc-checkbox-selected-hover-icon-color, #f44336);background-color:#f44336;background-color:var(--mdc-checkbox-selected-hover-icon-color, #f44336)}100%{border-color:#212121;border-color:var(--mdc-checkbox-unselected-hover-icon-color, #212121);background-color:transparent}}.mat-mdc-list-option .mdc-checkbox:hover.mdc-checkbox--anim-unchecked-checked .mdc-checkbox__native-control:enabled~.mdc-checkbox__background,.mat-mdc-list-option .mdc-checkbox:hover.mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__native-control:enabled~.mdc-checkbox__background{animation-name:mdc-checkbox-fade-in-background-FF212121FFF4433600000000FFF44336}.mat-mdc-list-option .mdc-checkbox:hover.mdc-checkbox--anim-checked-unchecked .mdc-checkbox__native-control:enabled~.mdc-checkbox__background,.mat-mdc-list-option .mdc-checkbox:hover.mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__native-control:enabled~.mdc-checkbox__background{animation-name:mdc-checkbox-fade-out-background-FF212121FFF4433600000000FFF44336}.mat-mdc-list-option .mdc-checkbox.mdc-ripple-upgraded--background-focused .mdc-checkbox__native-control:enabled:not(:checked):not(:indeterminate):not([data-indeterminate=true])~.mdc-checkbox__background,.mat-mdc-list-option .mdc-checkbox:not(.mdc-ripple-upgraded):focus .mdc-checkbox__native-control:enabled:not(:checked):not(:indeterminate):not([data-indeterminate=true])~.mdc-checkbox__background{border-color:#212121;border-color:var(--mdc-checkbox-unselected-focus-icon-color, #212121);background-color:transparent}.mat-mdc-list-option .mdc-checkbox.mdc-ripple-upgraded--background-focused .mdc-checkbox__native-control:enabled:checked~.mdc-checkbox__background,.mat-mdc-list-option .mdc-checkbox.mdc-ripple-upgraded--background-focused .mdc-checkbox__native-control:enabled:indeterminate~.mdc-checkbox__background,.mat-mdc-list-option .mdc-checkbox.mdc-ripple-upgraded--background-focused .mdc-checkbox__native-control[data-indeterminate=true]:enabled~.mdc-checkbox__background,.mat-mdc-list-option .mdc-checkbox:not(.mdc-ripple-upgraded):focus .mdc-checkbox__native-control:enabled:checked~.mdc-checkbox__background,.mat-mdc-list-option .mdc-checkbox:not(.mdc-ripple-upgraded):focus .mdc-checkbox__native-control:enabled:indeterminate~.mdc-checkbox__background,.mat-mdc-list-option .mdc-checkbox:not(.mdc-ripple-upgraded):focus .mdc-checkbox__native-control[data-indeterminate=true]:enabled~.mdc-checkbox__background{border-color:#f44336;border-color:var(--mdc-checkbox-selected-focus-icon-color, #f44336);background-color:#f44336;background-color:var(--mdc-checkbox-selected-focus-icon-color, #f44336)}@keyframes mdc-checkbox-fade-in-background-FF212121FFF4433600000000FFF44336{0%{border-color:#212121;border-color:var(--mdc-checkbox-unselected-focus-icon-color, #212121);background-color:transparent}50%{border-color:#f44336;border-color:var(--mdc-checkbox-selected-focus-icon-color, #f44336);background-color:#f44336;background-color:var(--mdc-checkbox-selected-focus-icon-color, #f44336)}}@keyframes mdc-checkbox-fade-out-background-FF212121FFF4433600000000FFF44336{0%,80%{border-color:#f44336;border-color:var(--mdc-checkbox-selected-focus-icon-color, #f44336);background-color:#f44336;background-color:var(--mdc-checkbox-selected-focus-icon-color, #f44336)}100%{border-color:#212121;border-color:var(--mdc-checkbox-unselected-focus-icon-color, #212121);background-color:transparent}}.mat-mdc-list-option .mdc-checkbox.mdc-ripple-upgraded--background-focused.mdc-checkbox--anim-unchecked-checked .mdc-checkbox__native-control:enabled~.mdc-checkbox__background,.mat-mdc-list-option .mdc-checkbox.mdc-ripple-upgraded--background-focused.mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__native-control:enabled~.mdc-checkbox__background,.mat-mdc-list-option .mdc-checkbox:not(.mdc-ripple-upgraded):focus.mdc-checkbox--anim-unchecked-checked .mdc-checkbox__native-control:enabled~.mdc-checkbox__background,.mat-mdc-list-option .mdc-checkbox:not(.mdc-ripple-upgraded):focus.mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__native-control:enabled~.mdc-checkbox__background{animation-name:mdc-checkbox-fade-in-background-FF212121FFF4433600000000FFF44336}.mat-mdc-list-option .mdc-checkbox.mdc-ripple-upgraded--background-focused.mdc-checkbox--anim-checked-unchecked .mdc-checkbox__native-control:enabled~.mdc-checkbox__background,.mat-mdc-list-option .mdc-checkbox.mdc-ripple-upgraded--background-focused.mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__native-control:enabled~.mdc-checkbox__background,.mat-mdc-list-option .mdc-checkbox:not(.mdc-ripple-upgraded):focus.mdc-checkbox--anim-checked-unchecked .mdc-checkbox__native-control:enabled~.mdc-checkbox__background,.mat-mdc-list-option .mdc-checkbox:not(.mdc-ripple-upgraded):focus.mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__native-control:enabled~.mdc-checkbox__background{animation-name:mdc-checkbox-fade-out-background-FF212121FFF4433600000000FFF44336}.mat-mdc-list-option .mdc-checkbox:not(:disabled):active .mdc-checkbox__native-control:enabled:not(:checked):not(:indeterminate):not([data-indeterminate=true])~.mdc-checkbox__background{border-color:rgba(0, 0, 0, 0.54);border-color:var(--mdc-checkbox-unselected-pressed-icon-color, rgba(0, 0, 0, 0.54));background-color:transparent}.mat-mdc-list-option .mdc-checkbox:not(:disabled):active .mdc-checkbox__native-control:enabled:checked~.mdc-checkbox__background,.mat-mdc-list-option .mdc-checkbox:not(:disabled):active .mdc-checkbox__native-control:enabled:indeterminate~.mdc-checkbox__background,.mat-mdc-list-option .mdc-checkbox:not(:disabled):active .mdc-checkbox__native-control[data-indeterminate=true]:enabled~.mdc-checkbox__background{border-color:#f44336;border-color:var(--mdc-checkbox-selected-pressed-icon-color, #f44336);background-color:#f44336;background-color:var(--mdc-checkbox-selected-pressed-icon-color, #f44336)}@keyframes mdc-checkbox-fade-in-background-8A000000FFF4433600000000FFF44336{0%{border-color:rgba(0, 0, 0, 0.54);border-color:var(--mdc-checkbox-unselected-pressed-icon-color, rgba(0, 0, 0, 0.54));background-color:transparent}50%{border-color:#f44336;border-color:var(--mdc-checkbox-selected-pressed-icon-color, #f44336);background-color:#f44336;background-color:var(--mdc-checkbox-selected-pressed-icon-color, #f44336)}}@keyframes mdc-checkbox-fade-out-background-8A000000FFF4433600000000FFF44336{0%,80%{border-color:#f44336;border-color:var(--mdc-checkbox-selected-pressed-icon-color, #f44336);background-color:#f44336;background-color:var(--mdc-checkbox-selected-pressed-icon-color, #f44336)}100%{border-color:rgba(0, 0, 0, 0.54);border-color:var(--mdc-checkbox-unselected-pressed-icon-color, rgba(0, 0, 0, 0.54));background-color:transparent}}.mat-mdc-list-option .mdc-checkbox:not(:disabled):active.mdc-checkbox--anim-unchecked-checked .mdc-checkbox__native-control:enabled~.mdc-checkbox__background,.mat-mdc-list-option .mdc-checkbox:not(:disabled):active.mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__native-control:enabled~.mdc-checkbox__background{animation-name:mdc-checkbox-fade-in-background-8A000000FFF4433600000000FFF44336}.mat-mdc-list-option .mdc-checkbox:not(:disabled):active.mdc-checkbox--anim-checked-unchecked .mdc-checkbox__native-control:enabled~.mdc-checkbox__background,.mat-mdc-list-option .mdc-checkbox:not(:disabled):active.mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__native-control:enabled~.mdc-checkbox__background{animation-name:mdc-checkbox-fade-out-background-8A000000FFF4433600000000FFF44336}.mat-mdc-list-option .mdc-checkbox .mdc-checkbox__ripple::before,.mat-mdc-list-option .mdc-checkbox .mdc-checkbox__ripple::after{background-color:black;background-color:var(--mdc-checkbox-unselected-hover-state-layer-color, black)}.mat-mdc-list-option .mdc-checkbox:hover .mdc-checkbox__ripple::before,.mat-mdc-list-option .mdc-checkbox.mdc-ripple-surface--hover .mdc-checkbox__ripple::before{opacity:0.04;opacity:var(--mdc-checkbox-unselected-hover-state-layer-opacity, 0.04)}.mat-mdc-list-option .mdc-checkbox.mdc-ripple-upgraded--background-focused .mdc-checkbox__ripple::before,.mat-mdc-list-option .mdc-checkbox:not(.mdc-ripple-upgraded):focus .mdc-checkbox__ripple::before{transition-duration:75ms;opacity:0.16;opacity:var(--mdc-checkbox-unselected-focus-state-layer-opacity, 0.16)}.mat-mdc-list-option .mdc-checkbox:not(.mdc-ripple-upgraded) .mdc-checkbox__ripple::after{transition:opacity 150ms linear}.mat-mdc-list-option .mdc-checkbox:not(.mdc-ripple-upgraded):active .mdc-checkbox__ripple::after{transition-duration:75ms;opacity:0.16;opacity:var(--mdc-checkbox-unselected-pressed-state-layer-opacity, 0.16)}.mat-mdc-list-option .mdc-checkbox.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-checkbox-unselected-pressed-state-layer-opacity, 0.16)}.mat-mdc-list-option .mdc-checkbox.mdc-checkbox--selected .mdc-checkbox__ripple::before,.mat-mdc-list-option .mdc-checkbox.mdc-checkbox--selected .mdc-checkbox__ripple::after{background-color:#f44336;background-color:var(--mdc-checkbox-selected-hover-state-layer-color, #f44336)}.mat-mdc-list-option .mdc-checkbox.mdc-checkbox--selected:hover .mdc-checkbox__ripple::before,.mat-mdc-list-option .mdc-checkbox.mdc-checkbox--selected.mdc-ripple-surface--hover .mdc-checkbox__ripple::before{opacity:0.04;opacity:var(--mdc-checkbox-selected-hover-state-layer-opacity, 0.04)}.mat-mdc-list-option .mdc-checkbox.mdc-checkbox--selected.mdc-ripple-upgraded--background-focused .mdc-checkbox__ripple::before,.mat-mdc-list-option .mdc-checkbox.mdc-checkbox--selected:not(.mdc-ripple-upgraded):focus .mdc-checkbox__ripple::before{transition-duration:75ms;opacity:0.16;opacity:var(--mdc-checkbox-selected-focus-state-layer-opacity, 0.16)}.mat-mdc-list-option .mdc-checkbox.mdc-checkbox--selected:not(.mdc-ripple-upgraded) .mdc-checkbox__ripple::after{transition:opacity 150ms linear}.mat-mdc-list-option .mdc-checkbox.mdc-checkbox--selected:not(.mdc-ripple-upgraded):active .mdc-checkbox__ripple::after{transition-duration:75ms;opacity:0.16;opacity:var(--mdc-checkbox-selected-pressed-state-layer-opacity, 0.16)}.mat-mdc-list-option .mdc-checkbox.mdc-checkbox--selected.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-checkbox-selected-pressed-state-layer-opacity, 0.16)}.mat-mdc-list-option .mdc-checkbox.mdc-ripple-upgraded--background-focused.mdc-checkbox--selected .mdc-checkbox__ripple::before,.mat-mdc-list-option .mdc-checkbox.mdc-ripple-upgraded--background-focused.mdc-checkbox--selected .mdc-checkbox__ripple::after{background-color:#f44336;background-color:var(--mdc-checkbox-selected-hover-state-layer-color, #f44336)}.mat-mdc-list-option .mdc-checkbox .mdc-checkbox__background{top:calc((40px - 18px) / 2);top:calc((var(--mdc-checkbox-state-layer-size, 40px) - 18px) / 2);left:calc((40px - 18px) / 2);left:calc((var(--mdc-checkbox-state-layer-size, 40px) - 18px) / 2)}.mat-mdc-list-option .mdc-checkbox .mdc-checkbox__native-control{top:calc((40px - 40px) / 2);top:calc((var(--mdc-checkbox-state-layer-size, 40px) - var(--mdc-checkbox-state-layer-size, 40px)) / 2);right:calc((40px - 40px) / 2);right:calc((var(--mdc-checkbox-state-layer-size, 40px) - var(--mdc-checkbox-state-layer-size, 40px)) / 2);left:calc((40px - 40px) / 2);left:calc((var(--mdc-checkbox-state-layer-size, 40px) - var(--mdc-checkbox-state-layer-size, 40px)) / 2);width:40px;width:var(--mdc-checkbox-state-layer-size, 40px);height:40px;height:var(--mdc-checkbox-state-layer-size, 40px)}.mat-mdc-list-option .mdc-radio{padding:calc((40px - 20px) / 2);padding:calc((var(--mdc-radio-state-layer-size, 40px) - 20px) / 2)}.mat-mdc-list-option .mdc-radio [aria-disabled=true] .mdc-radio__native-control:checked+.mdc-radio__background .mdc-radio__outer-circle,.mat-mdc-list-option .mdc-radio .mdc-radio__native-control:disabled:checked+.mdc-radio__background .mdc-radio__outer-circle{border-color:#000;border-color:var(--mdc-radio-disabled-selected-icon-color, #000)}.mat-mdc-list-option .mdc-radio [aria-disabled=true] .mdc-radio__native-control+.mdc-radio__background .mdc-radio__inner-circle,.mat-mdc-list-option .mdc-radio .mdc-radio__native-control:disabled+.mdc-radio__background .mdc-radio__inner-circle{border-color:#000;border-color:var(--mdc-radio-disabled-selected-icon-color, #000)}.mat-mdc-list-option .mdc-radio [aria-disabled=true] .mdc-radio__native-control:checked+.mdc-radio__background .mdc-radio__outer-circle,.mat-mdc-list-option .mdc-radio .mdc-radio__native-control:disabled:checked+.mdc-radio__background .mdc-radio__outer-circle{opacity:0.38;opacity:var(--mdc-radio-disabled-selected-icon-opacity, 0.38)}.mat-mdc-list-option .mdc-radio [aria-disabled=true] .mdc-radio__native-control+.mdc-radio__background .mdc-radio__inner-circle,.mat-mdc-list-option .mdc-radio .mdc-radio__native-control:disabled+.mdc-radio__background .mdc-radio__inner-circle{opacity:0.38;opacity:var(--mdc-radio-disabled-selected-icon-opacity, 0.38)}.mat-mdc-list-option .mdc-radio [aria-disabled=true] .mdc-radio__native-control:not(:checked)+.mdc-radio__background .mdc-radio__outer-circle,.mat-mdc-list-option .mdc-radio .mdc-radio__native-control:disabled:not(:checked)+.mdc-radio__background .mdc-radio__outer-circle{border-color:#000;border-color:var(--mdc-radio-disabled-unselected-icon-color, #000)}.mat-mdc-list-option .mdc-radio [aria-disabled=true] .mdc-radio__native-control:not(:checked)+.mdc-radio__background .mdc-radio__outer-circle,.mat-mdc-list-option .mdc-radio .mdc-radio__native-control:disabled:not(:checked)+.mdc-radio__background .mdc-radio__outer-circle{opacity:0.38;opacity:var(--mdc-radio-disabled-unselected-icon-opacity, 0.38)}.mat-mdc-list-option .mdc-radio.mdc-ripple-upgraded--background-focused .mdc-radio__native-control:enabled:checked+.mdc-radio__background .mdc-radio__outer-circle,.mat-mdc-list-option .mdc-radio:not(.mdc-ripple-upgraded):focus .mdc-radio__native-control:enabled:checked+.mdc-radio__background .mdc-radio__outer-circle{border-color:#f44336;border-color:var(--mdc-radio-selected-focus-icon-color, #f44336)}.mat-mdc-list-option .mdc-radio.mdc-ripple-upgraded--background-focused .mdc-radio__native-control:enabled+.mdc-radio__background .mdc-radio__inner-circle,.mat-mdc-list-option .mdc-radio:not(.mdc-ripple-upgraded):focus .mdc-radio__native-control:enabled+.mdc-radio__background .mdc-radio__inner-circle{border-color:#f44336;border-color:var(--mdc-radio-selected-focus-icon-color, #f44336)}.mat-mdc-list-option .mdc-radio:hover .mdc-radio__native-control:enabled:checked+.mdc-radio__background .mdc-radio__outer-circle{border-color:#f44336;border-color:var(--mdc-radio-selected-hover-icon-color, #f44336)}.mat-mdc-list-option .mdc-radio:hover .mdc-radio__native-control:enabled+.mdc-radio__background .mdc-radio__inner-circle{border-color:#f44336;border-color:var(--mdc-radio-selected-hover-icon-color, #f44336)}.mat-mdc-list-option .mdc-radio .mdc-radio__native-control:enabled:checked+.mdc-radio__background .mdc-radio__outer-circle{border-color:#f44336;border-color:var(--mdc-radio-selected-icon-color, #f44336)}.mat-mdc-list-option .mdc-radio .mdc-radio__native-control:enabled+.mdc-radio__background .mdc-radio__inner-circle{border-color:#f44336;border-color:var(--mdc-radio-selected-icon-color, #f44336)}.mat-mdc-list-option .mdc-radio:not(:disabled):active .mdc-radio__native-control:enabled:checked+.mdc-radio__background .mdc-radio__outer-circle{border-color:#f44336;border-color:var(--mdc-radio-selected-pressed-icon-color, #f44336)}.mat-mdc-list-option .mdc-radio:not(:disabled):active .mdc-radio__native-control:enabled+.mdc-radio__background .mdc-radio__inner-circle{border-color:#f44336;border-color:var(--mdc-radio-selected-pressed-icon-color, #f44336)}.mat-mdc-list-option .mdc-radio:hover .mdc-radio__native-control:enabled:not(:checked)+.mdc-radio__background .mdc-radio__outer-circle{border-color:#212121;border-color:var(--mdc-radio-unselected-hover-icon-color, #212121)}.mat-mdc-list-option .mdc-radio .mdc-radio__native-control:enabled:not(:checked)+.mdc-radio__background .mdc-radio__outer-circle{border-color:rgba(0, 0, 0, 0.54);border-color:var(--mdc-radio-unselected-icon-color, rgba(0, 0, 0, 0.54))}.mat-mdc-list-option .mdc-radio:not(:disabled):active .mdc-radio__native-control:enabled:not(:checked)+.mdc-radio__background .mdc-radio__outer-circle{border-color:rgba(0, 0, 0, 0.54);border-color:var(--mdc-radio-unselected-pressed-icon-color, rgba(0, 0, 0, 0.54))}.mat-mdc-list-option .mdc-radio .mdc-radio__background::before{top:calc(-1 * (40px - 20px) / 2);top:calc(-1 * (var(--mdc-radio-state-layer-size, 40px) - 20px) / 2);left:calc(-1 * (40px - 20px) / 2);left:calc(-1 * (var(--mdc-radio-state-layer-size, 40px) - 20px) / 2);width:40px;width:var(--mdc-radio-state-layer-size, 40px);height:40px;height:var(--mdc-radio-state-layer-size, 40px)}.mat-mdc-list-option .mdc-radio .mdc-radio__native-control{top:calc((40px - 40px) / 2);top:calc((var(--mdc-radio-state-layer-size, 40px) - var(--mdc-radio-state-layer-size, 40px)) / 2);right:calc((40px - 40px) / 2);right:calc((var(--mdc-radio-state-layer-size, 40px) - var(--mdc-radio-state-layer-size, 40px)) / 2);left:calc((40px - 40px) / 2);left:calc((var(--mdc-radio-state-layer-size, 40px) - var(--mdc-radio-state-layer-size, 40px)) / 2);width:40px;width:var(--mdc-radio-state-layer-size, 40px);height:40px;height:var(--mdc-radio-state-layer-size, 40px)}.mat-mdc-list-option .mdc-checkbox__native-control,.mat-mdc-list-option .mdc-radio__native-control{display:none}.cdk-high-contrast-active .mat-mdc-list-option.mdc-list-item--selected::after{content:\"\";position:absolute;top:50%;right:16px;transform:translateY(-50%);width:10px;height:0;border-bottom:solid 10px;border-radius:10px}.cdk-high-contrast-active .mat-mdc-list-option.mdc-list-item--selected [dir=rtl]::after{right:auto;left:16px}"]
    }]
  }], function () {
    return [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.NgZone
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Inject,
        args: [SELECTION_LIST]
      }]
    }, {
      type: _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_5__.Platform
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectorRef
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Inject,
        args: [_angular_material_core__WEBPACK_IMPORTED_MODULE_3__.MAT_RIPPLE_GLOBAL_OPTIONS]
      }]
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Inject,
        args: [_angular_core__WEBPACK_IMPORTED_MODULE_0__.ANIMATION_MODULE_TYPE]
      }]
    }];
  }, {
    _lines: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ContentChildren,
      args: [MatListItemLine, {
        descendants: true
      }]
    }],
    _titles: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ContentChildren,
      args: [MatListItemTitle, {
        descendants: true
      }]
    }],
    _unscopedContent: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewChild,
      args: ['unscopedContent']
    }],
    selectedChange: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Output
    }],
    togglePosition: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    checkboxPosition: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    color: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    value: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    selected: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }]
  });
})();

/**
 * Directive whose purpose is to add the mat- CSS styling to this selector.
 * @docs-private
 */
class MatListSubheaderCssMatStyler {}
_class13 = MatListSubheaderCssMatStyler;
_class13.ɵfac = function _class13_Factory(t) {
  return new (t || _class13)();
};
_class13.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
  type: _class13,
  selectors: [["", "mat-subheader", ""], ["", "matSubheader", ""]],
  hostAttrs: [1, "mat-mdc-subheader", "mdc-list-group__subheader"]
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MatListSubheaderCssMatStyler, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Directive,
    args: [{
      selector: '[mat-subheader], [matSubheader]',
      // TODO(mmalerba): MDC's subheader font looks identical to the list item font, figure out why and
      //  make a change in one of the repos to visually distinguish.
      host: {
        'class': 'mat-mdc-subheader mdc-list-group__subheader'
      }
    }]
  }], null, null);
})();

/**
 * Injection token that can be used to inject instances of `MatNavList`. It serves as
 * alternative token to the actual `MatNavList` class which could cause unnecessary
 * retention of the class and its component metadata.
 */
const MAT_NAV_LIST = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken('MatNavList');
class MatNavList extends MatListBase {
  constructor() {
    super(...arguments);
    // An navigation list is considered interactive, but does not extend the interactive list
    // base class. We do this because as per MDC, items of interactive lists are only reachable
    // through keyboard shortcuts. We want all items for the navigation list to be reachable
    // through tab key as we do not intend to provide any special accessibility treatment. The
    // accessibility treatment depends on how the end-user will interact with it.
    this._isNonInteractive = false;
  }
}
_class14 = MatNavList;
_class14.ɵfac = /* @__PURE__ */function () {
  let ɵ_class14_BaseFactory;
  return function _class14_Factory(t) {
    return (ɵ_class14_BaseFactory || (ɵ_class14_BaseFactory = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetInheritedFactory"](_class14)))(t || _class14);
  };
}();
_class14.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: _class14,
  selectors: [["mat-nav-list"]],
  hostAttrs: ["role", "navigation", 1, "mat-mdc-nav-list", "mat-mdc-list-base", "mdc-list"],
  exportAs: ["matNavList"],
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([{
    provide: MatListBase,
    useExisting: _class14
  }]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]],
  ngContentSelectors: _c0,
  decls: 1,
  vars: 0,
  template: function _class14_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojectionDef"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](0);
    }
  },
  styles: [_c1],
  encapsulation: 2,
  changeDetection: 0
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MatNavList, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Component,
    args: [{
      selector: 'mat-nav-list',
      exportAs: 'matNavList',
      template: '<ng-content></ng-content>',
      host: {
        'class': 'mat-mdc-nav-list mat-mdc-list-base mdc-list',
        'role': 'navigation'
      },
      encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewEncapsulation.None,
      changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectionStrategy.OnPush,
      providers: [{
        provide: MatListBase,
        useExisting: MatNavList
      }],
      styles: ["@media screen and (forced-colors: active),(-ms-high-contrast: active){.mdc-list-divider::after{content:\"\";display:block;border-bottom-width:1px;border-bottom-style:solid}}.mdc-list{margin:0;padding:8px 0;list-style-type:none}.mdc-list:focus{outline:none}.mdc-list-item__wrapper{display:block}.mdc-list-item{display:flex;position:relative;align-items:center;justify-content:flex-start;overflow:hidden;padding:0;align-items:stretch;cursor:pointer}.mdc-list-item:focus{outline:none}.mdc-list-item.mdc-list-item--with-one-line{height:48px}.mdc-list-item.mdc-list-item--with-two-lines{height:64px}.mdc-list-item.mdc-list-item--with-three-lines{height:88px}.mdc-list-item.mdc-list-item--with-one-line .mdc-list-item__start{align-self:center;margin-top:0}.mdc-list-item.mdc-list-item--with-two-lines .mdc-list-item__start{align-self:flex-start;margin-top:16px}.mdc-list-item.mdc-list-item--with-three-lines .mdc-list-item__start{align-self:flex-start;margin-top:16px}.mdc-list-item.mdc-list-item--with-one-line .mdc-list-item__end{align-self:center;margin-top:0}.mdc-list-item.mdc-list-item--with-two-lines .mdc-list-item__end{align-self:center;margin-top:0}.mdc-list-item.mdc-list-item--with-three-lines .mdc-list-item__end{align-self:flex-start;margin-top:16px}.mdc-list-item.mdc-list-item--disabled,.mdc-list-item.mdc-list-item--non-interactive{cursor:auto}.mdc-list-item:not(.mdc-list-item--selected):focus::before,.mdc-list-item.mdc-ripple-upgraded--background-focused::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:1px solid rgba(0,0,0,0);border-radius:inherit;content:\"\";pointer-events:none}@media screen and (forced-colors: active){.mdc-list-item:not(.mdc-list-item--selected):focus::before,.mdc-list-item.mdc-ripple-upgraded--background-focused::before{border-color:CanvasText}}.mdc-list-item.mdc-list-item--selected::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:3px double rgba(0,0,0,0);border-radius:inherit;content:\"\";pointer-events:none}@media screen and (forced-colors: active){.mdc-list-item.mdc-list-item--selected::before{border-color:CanvasText}}.mdc-list-item.mdc-list-item--selected:focus::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:3px solid rgba(0,0,0,0);border-radius:inherit;content:\"\";pointer-events:none}@media screen and (forced-colors: active){.mdc-list-item.mdc-list-item--selected:focus::before{border-color:CanvasText}}a.mdc-list-item{color:inherit;text-decoration:none}.mdc-list-item__start{fill:currentColor;flex-shrink:0;pointer-events:none}.mdc-list-item__end{flex-shrink:0;pointer-events:none}.mdc-list-item__content{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;align-self:center;flex:1;pointer-events:none}.mdc-list-item--with-two-lines .mdc-list-item__content,.mdc-list-item--with-three-lines .mdc-list-item__content{align-self:stretch}.mdc-list-item__content[for]{pointer-events:none}.mdc-list-item__primary-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.mdc-list-item--with-two-lines .mdc-list-item__primary-text,.mdc-list-item--with-three-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before,.mdc-list-item--with-three-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after,.mdc-list-item--with-three-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item__secondary-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;display:block;margin-top:0;line-height:normal}.mdc-list-item__secondary-text::before{display:inline-block;width:0;height:20px;content:\"\";vertical-align:0}.mdc-list-item--with-three-lines .mdc-list-item__secondary-text{white-space:normal;line-height:20px}.mdc-list-item--with-overline .mdc-list-item__secondary-text{white-space:nowrap;line-height:auto}.mdc-list-item__overline-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.mdc-list-item--with-two-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-two-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:24px;content:\"\";vertical-align:0}.mdc-list-item--with-two-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-three-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-three-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-three-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-avatar.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-avatar.mdc-list-item,.mdc-list-item--with-leading-avatar.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-avatar .mdc-list-item__start{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-list-item--with-leading-avatar .mdc-list-item__start,.mdc-list-item--with-leading-avatar .mdc-list-item__start[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-avatar.mdc-list-item--with-one-line{height:56px}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-avatar .mdc-list-item__start{border-radius:50%}.mdc-list-item--with-leading-icon.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-icon.mdc-list-item,.mdc-list-item--with-leading-icon.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-icon .mdc-list-item__start{margin-left:16px;margin-right:32px}[dir=rtl] .mdc-list-item--with-leading-icon .mdc-list-item__start,.mdc-list-item--with-leading-icon .mdc-list-item__start[dir=rtl]{margin-left:32px;margin-right:16px}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-icon.mdc-list-item--with-one-line{height:56px}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-thumbnail.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-thumbnail.mdc-list-item,.mdc-list-item--with-leading-thumbnail.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-thumbnail .mdc-list-item__start{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-list-item--with-leading-thumbnail .mdc-list-item__start,.mdc-list-item--with-leading-thumbnail .mdc-list-item__start[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-one-line{height:56px}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-image.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-image.mdc-list-item,.mdc-list-item--with-leading-image.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-image .mdc-list-item__start{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-list-item--with-leading-image .mdc-list-item__start,.mdc-list-item--with-leading-image .mdc-list-item__start[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-image.mdc-list-item--with-one-line{height:72px}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines .mdc-list-item__start{align-self:flex-start;margin-top:8px}.mdc-list-item--with-leading-video.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-video.mdc-list-item,.mdc-list-item--with-leading-video.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-video .mdc-list-item__start{margin-left:0;margin-right:16px}[dir=rtl] .mdc-list-item--with-leading-video .mdc-list-item__start,.mdc-list-item--with-leading-video .mdc-list-item__start[dir=rtl]{margin-left:16px;margin-right:0}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-video.mdc-list-item--with-one-line{height:72px}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-checkbox.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-checkbox.mdc-list-item,.mdc-list-item--with-leading-checkbox.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-checkbox .mdc-list-item__start{margin-left:8px;margin-right:24px}[dir=rtl] .mdc-list-item--with-leading-checkbox .mdc-list-item__start,.mdc-list-item--with-leading-checkbox .mdc-list-item__start[dir=rtl]{margin-left:24px;margin-right:8px}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__start{align-self:flex-start;margin-top:8px}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-one-line{height:56px}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-radio.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-radio.mdc-list-item,.mdc-list-item--with-leading-radio.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-radio .mdc-list-item__start{margin-left:8px;margin-right:24px}[dir=rtl] .mdc-list-item--with-leading-radio .mdc-list-item__start,.mdc-list-item--with-leading-radio .mdc-list-item__start[dir=rtl]{margin-left:24px;margin-right:8px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__start{align-self:flex-start;margin-top:8px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-radio.mdc-list-item--with-one-line{height:56px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-switch.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-switch.mdc-list-item,.mdc-list-item--with-leading-switch.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-switch .mdc-list-item__start{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-list-item--with-leading-switch .mdc-list-item__start,.mdc-list-item--with-leading-switch .mdc-list-item__start[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines .mdc-list-item__start{align-self:flex-start;margin-top:16px}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-switch.mdc-list-item--with-one-line{height:56px}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-trailing-icon.mdc-list-item{padding-left:auto;padding-right:0}[dir=rtl] .mdc-list-item--with-trailing-icon.mdc-list-item,.mdc-list-item--with-trailing-icon.mdc-list-item[dir=rtl]{padding-left:0;padding-right:auto}.mdc-list-item--with-trailing-icon .mdc-list-item__end{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-list-item--with-trailing-icon .mdc-list-item__end,.mdc-list-item--with-trailing-icon .mdc-list-item__end[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-list-item--with-trailing-meta.mdc-list-item--with-two-lines .mdc-list-item__end{align-self:flex-start;margin-top:0}.mdc-list-item--with-trailing-meta.mdc-list-item--with-three-lines .mdc-list-item__end{align-self:flex-start;margin-top:0}.mdc-list-item--with-trailing-meta.mdc-list-item{padding-left:auto;padding-right:0}[dir=rtl] .mdc-list-item--with-trailing-meta.mdc-list-item,.mdc-list-item--with-trailing-meta.mdc-list-item[dir=rtl]{padding-left:0;padding-right:auto}.mdc-list-item--with-trailing-meta .mdc-list-item__end{margin-left:28px;margin-right:16px}[dir=rtl] .mdc-list-item--with-trailing-meta .mdc-list-item__end,.mdc-list-item--with-trailing-meta .mdc-list-item__end[dir=rtl]{margin-left:16px;margin-right:28px}.mdc-list-item--with-trailing-meta.mdc-list-item--with-two-lines .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-trailing-meta.mdc-list-item--with-two-lines .mdc-list-item__end::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-trailing-meta.mdc-list-item--with-three-lines .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-trailing-meta.mdc-list-item--with-three-lines .mdc-list-item__end::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-trailing-meta .mdc-list-item__end{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:var(--mdc-typography-caption-font-family);font-size:var(--mdc-typography-caption-font-size);line-height:var(--mdc-typography-caption-line-height);font-weight:var(--mdc-typography-caption-font-weight);letter-spacing:var(--mdc-typography-caption-letter-spacing);text-decoration:var(--mdc-typography-caption-text-decoration);text-transform:var(--mdc-typography-caption-text-transform)}.mdc-list-item--with-trailing-checkbox.mdc-list-item{padding-left:auto;padding-right:0}[dir=rtl] .mdc-list-item--with-trailing-checkbox.mdc-list-item,.mdc-list-item--with-trailing-checkbox.mdc-list-item[dir=rtl]{padding-left:0;padding-right:auto}.mdc-list-item--with-trailing-checkbox .mdc-list-item__end{margin-left:24px;margin-right:8px}[dir=rtl] .mdc-list-item--with-trailing-checkbox .mdc-list-item__end,.mdc-list-item--with-trailing-checkbox .mdc-list-item__end[dir=rtl]{margin-left:8px;margin-right:24px}.mdc-list-item--with-trailing-checkbox.mdc-list-item--with-three-lines .mdc-list-item__end{align-self:flex-start;margin-top:8px}.mdc-list-item--with-trailing-radio.mdc-list-item{padding-left:auto;padding-right:0}[dir=rtl] .mdc-list-item--with-trailing-radio.mdc-list-item,.mdc-list-item--with-trailing-radio.mdc-list-item[dir=rtl]{padding-left:0;padding-right:auto}.mdc-list-item--with-trailing-radio .mdc-list-item__end{margin-left:24px;margin-right:8px}[dir=rtl] .mdc-list-item--with-trailing-radio .mdc-list-item__end,.mdc-list-item--with-trailing-radio .mdc-list-item__end[dir=rtl]{margin-left:8px;margin-right:24px}.mdc-list-item--with-trailing-radio.mdc-list-item--with-three-lines .mdc-list-item__end{align-self:flex-start;margin-top:8px}.mdc-list-item--with-trailing-switch.mdc-list-item{padding-left:auto;padding-right:0}[dir=rtl] .mdc-list-item--with-trailing-switch.mdc-list-item,.mdc-list-item--with-trailing-switch.mdc-list-item[dir=rtl]{padding-left:0;padding-right:auto}.mdc-list-item--with-trailing-switch .mdc-list-item__end{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-list-item--with-trailing-switch .mdc-list-item__end,.mdc-list-item--with-trailing-switch .mdc-list-item__end[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-list-item--with-trailing-switch.mdc-list-item--with-three-lines .mdc-list-item__end{align-self:flex-start;margin-top:16px}.mdc-list-item--with-overline.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-overline.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:20px;content:\"\";vertical-align:0}.mdc-list-item--with-overline.mdc-list-item--with-three-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-overline.mdc-list-item--with-three-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:20px;content:\"\";vertical-align:0}.mdc-list-item{padding-left:16px;padding-right:16px}[dir=rtl] .mdc-list-item,.mdc-list-item[dir=rtl]{padding-left:16px;padding-right:16px}.mdc-list-group .mdc-deprecated-list{padding:0}.mdc-list-group__subheader{margin:calc((3rem - 1.5rem)/2) 16px}.mdc-list-divider{padding:0;background-clip:content-box}.mdc-list-divider.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-text.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-icon.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-image.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-thumbnail.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-avatar.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-checkbox.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-switch.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-radio.mdc-list-divider--with-leading-inset{padding-left:16px;padding-right:auto}[dir=rtl] .mdc-list-divider.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-text.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-icon.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-image.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-thumbnail.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-avatar.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-checkbox.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-switch.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-radio.mdc-list-divider--with-leading-inset,.mdc-list-divider.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-text.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-icon.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-image.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-thumbnail.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-avatar.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-checkbox.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-switch.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-radio.mdc-list-divider--with-leading-inset[dir=rtl]{padding-left:auto;padding-right:16px}.mdc-list-divider.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-text.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-icon.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-image.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-thumbnail.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-avatar.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-checkbox.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-switch.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-radio.mdc-list-divider--with-trailing-inset{padding-left:auto;padding-right:16px}[dir=rtl] .mdc-list-divider.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-text.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-icon.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-image.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-thumbnail.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-avatar.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-checkbox.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-switch.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-radio.mdc-list-divider--with-trailing-inset,.mdc-list-divider.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-text.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-icon.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-image.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-thumbnail.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-avatar.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-checkbox.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-switch.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-radio.mdc-list-divider--with-trailing-inset[dir=rtl]{padding-left:16px;padding-right:auto}.mdc-list-divider--with-leading-video.mdc-list-divider--with-leading-inset{padding-left:0px;padding-right:auto}[dir=rtl] .mdc-list-divider--with-leading-video.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-video.mdc-list-divider--with-leading-inset[dir=rtl]{padding-left:auto;padding-right:0px}[dir=rtl] .mdc-list-divider,.mdc-list-divider[dir=rtl]{padding:0}.mdc-list-item{background-color:var(--mdc-list-list-item-container-color)}.mdc-list-item.mdc-list-item--selected{background-color:var(--mdc-list-list-item-selected-container-color)}.mdc-list-item--with-one-line{border-radius:var(--mdc-list-list-item-container-shape)}.mdc-list-item--with-one-line.mdc-list-item--with-leading-avatar,.mdc-list-item--with-one-line.mdc-list-item--with-leading-icon,.mdc-list-item--with-one-line.mdc-list-item--with-leading-thumbnail,.mdc-list-item--with-one-line.mdc-list-item--with-leading-checkbox,.mdc-list-item--with-one-line.mdc-list-item--with-leading-radio,.mdc-list-item--with-one-line.mdc-list-item--with-leading-switch{border-radius:var(--mdc-list-list-item-container-shape)}.mdc-list-item--with-one-line.mdc-list-item--with-leading-image,.mdc-list-item--with-one-line.mdc-list-item--with-leading-video{border-radius:var(--mdc-list-list-item-container-shape)}.mdc-list-item--with-two-lines{border-radius:var(--mdc-list-list-item-container-shape)}.mdc-list-item--with-two-lines.mdc-list-item--with-leading-avatar,.mdc-list-item--with-two-lines.mdc-list-item--with-leading-icon,.mdc-list-item--with-two-lines.mdc-list-item--with-leading-thumbnail,.mdc-list-item--with-two-lines.mdc-list-item--with-leading-checkbox,.mdc-list-item--with-two-lines.mdc-list-item--with-leading-radio,.mdc-list-item--with-two-lines.mdc-list-item--with-leading-switch,.mdc-list-item--with-two-lines.mdc-list-item--with-leading-image,.mdc-list-item--with-two-lines.mdc-list-item--with-leading-video{border-radius:var(--mdc-list-list-item-container-shape)}.mdc-list-item--with-three-lines{border-radius:var(--mdc-list-list-item-container-shape)}.mdc-list-item.mdc-list-item--with-one-line{height:var(--mdc-list-list-item-one-line-container-height)}.mdc-list-item.mdc-list-item--with-two-lines{height:var(--mdc-list-list-item-two-line-container-height)}.mdc-list-item.mdc-list-item--with-three-lines{height:var(--mdc-list-list-item-three-line-container-height)}.mdc-list-item__primary-text{color:var(--mdc-list-list-item-label-text-color)}.mdc-list-item__primary-text{font-family:var(--mdc-list-list-item-label-text-font);line-height:var(--mdc-list-list-item-label-text-line-height);font-size:var(--mdc-list-list-item-label-text-size);font-weight:var(--mdc-list-list-item-label-text-weight);letter-spacing:var(--mdc-list-list-item-label-text-tracking)}.mdc-list-item__secondary-text{color:var(--mdc-list-list-item-supporting-text-color)}.mdc-list-item__secondary-text{font-family:var(--mdc-list-list-item-supporting-text-font);line-height:var(--mdc-list-list-item-supporting-text-line-height);font-size:var(--mdc-list-list-item-supporting-text-size);font-weight:var(--mdc-list-list-item-supporting-text-weight);letter-spacing:var(--mdc-list-list-item-supporting-text-tracking)}.mdc-list-item--with-leading-icon .mdc-list-item__start{color:var(--mdc-list-list-item-leading-icon-color)}.mdc-list-item--with-leading-icon .mdc-list-item__start{width:var(--mdc-list-list-item-leading-icon-size);height:var(--mdc-list-list-item-leading-icon-size)}.mdc-list-item--with-leading-icon .mdc-list-item__start>i{font-size:var(--mdc-list-list-item-leading-icon-size)}.mdc-list-item--with-leading-icon .mdc-list-item__start .mdc-list-item__icon{font-size:var(--mdc-list-list-item-leading-icon-size);width:var(--mdc-list-list-item-leading-icon-size);height:var(--mdc-list-list-item-leading-icon-size)}.mdc-list-item--with-leading-icon .mdc-list-item__start .mdc-list-item__icon,.mdc-list-item--with-leading-icon .mdc-list-item__start .mdc-list-item__icon>.materialdesignWizIconSvgsSvgIcon{display:block}.mdc-list-item--with-leading-avatar .mdc-list-item__start{width:var(--mdc-list-list-item-leading-avatar-size);height:var(--mdc-list-list-item-leading-avatar-size)}.mdc-list-item.mdc-list-item--with-trailing-meta .mdc-list-item__end{color:var(--mdc-list-list-item-trailing-supporting-text-color)}.mdc-list-item--with-trailing-meta .mdc-list-item__end{font-family:var(--mdc-list-list-item-trailing-supporting-text-font);line-height:var(--mdc-list-list-item-trailing-supporting-text-line-height);font-size:var(--mdc-list-list-item-trailing-supporting-text-size);font-weight:var(--mdc-list-list-item-trailing-supporting-text-weight);letter-spacing:var(--mdc-list-list-item-trailing-supporting-text-tracking)}.mdc-list-item--with-trailing-icon .mdc-list-item__end{color:var(--mdc-list-list-item-trailing-icon-color)}.mdc-list-item--with-trailing-icon .mdc-list-item__end{width:var(--mdc-list-list-item-trailing-icon-size);height:var(--mdc-list-list-item-trailing-icon-size)}.mdc-list-item--with-trailing-icon .mdc-list-item__end>i{font-size:var(--mdc-list-list-item-trailing-icon-size)}.mdc-list-item--with-trailing-icon .mdc-list-item__end .mdc-list-item__icon{font-size:var(--mdc-list-list-item-trailing-icon-size);width:var(--mdc-list-list-item-trailing-icon-size);height:var(--mdc-list-list-item-trailing-icon-size)}.mdc-list-item--with-trailing-icon .mdc-list-item__end .mdc-list-item__icon,.mdc-list-item--with-trailing-icon .mdc-list-item__end .mdc-list-item__icon>.materialdesignWizIconSvgsSvgIcon{display:block}.mdc-list-item--selected.mdc-list-item--with-trailing-icon .mdc-list-item__end{color:var(--mdc-list-list-item-selected-trailing-icon-color)}.mdc-list-item--disabled .mdc-list-item__start,.mdc-list-item--disabled .mdc-list-item__content,.mdc-list-item--disabled .mdc-list-item__end{opacity:1}.mdc-list-item--disabled .mdc-list-item__primary-text,.mdc-list-item--disabled .mdc-list-item__secondary-text,.mdc-list-item--disabled .mdc-list-item__overline-text{opacity:var(--mdc-list-list-item-disabled-label-text-opacity)}.mdc-list-item--disabled.mdc-list-item--with-leading-icon .mdc-list-item__start{color:var(--mdc-list-list-item-disabled-leading-icon-color)}.mdc-list-item--disabled.mdc-list-item--with-leading-icon .mdc-list-item__start{opacity:var(--mdc-list-list-item-disabled-leading-icon-opacity)}.mdc-list-item--disabled.mdc-list-item--with-trailing-icon .mdc-list-item__end{color:var(--mdc-list-list-item-disabled-trailing-icon-color)}.mdc-list-item--disabled.mdc-list-item--with-trailing-icon .mdc-list-item__end{opacity:var(--mdc-list-list-item-disabled-trailing-icon-opacity)}.mdc-list-item:hover .mdc-list-item__primary-text{color:var(--mdc-list-list-item-hover-label-text-color)}.mdc-list-item--with-leading-icon:hover .mdc-list-item__start{color:var(--mdc-list-list-item-hover-leading-icon-color)}.mdc-list-item--with-trailing-icon:hover .mdc-list-item__end{color:var(--mdc-list-list-item-hover-trailing-icon-color)}.mdc-list-item:focus .mdc-list-item__primary-text{color:var(--mdc-list-list-item-focus-label-text-color)}.mdc-list-item.mdc-list-item--disabled .mdc-list-item__primary-text{color:var(--mdc-list-list-item-disabled-label-text-color)}.mdc-list-item:hover::before{background-color:var(--mdc-list-list-item-hover-state-layer-color);opacity:var(--mdc-list-list-item-hover-state-layer-opacity)}.mdc-list-item.mdc-list-item--disabled::before{background-color:var(--mdc-list-list-item-disabled-state-layer-color);opacity:var(--mdc-list-list-item-disabled-state-layer-opacity)}.mdc-list-item:focus::before{background-color:var(--mdc-list-list-item-focus-state-layer-color);opacity:var(--mdc-list-list-item-focus-state-layer-opacity)}.mdc-list-item--disabled .mdc-radio,.mdc-list-item--disabled .mdc-checkbox{opacity:var(--mdc-list-list-item-disabled-label-text-opacity)}.mdc-list-item--with-leading-avatar .mat-mdc-list-item-avatar{border-radius:var(--mdc-list-list-item-leading-avatar-shape);background-color:var(--mdc-list-list-item-leading-avatar-color)}.mat-mdc-list-base{--mdc-list-list-item-container-shape:0;--mdc-list-list-item-leading-avatar-shape:50%;--mdc-list-list-item-container-color:transparent;--mdc-list-list-item-selected-container-color:transparent;--mdc-list-list-item-leading-avatar-color:transparent;--mdc-list-list-item-leading-icon-size:24px;--mdc-list-list-item-leading-avatar-size:40px;--mdc-list-list-item-trailing-icon-size:24px;--mdc-list-list-item-disabled-state-layer-color:transparent;--mdc-list-list-item-disabled-state-layer-opacity:0;--mdc-list-list-item-disabled-label-text-opacity:0.38;--mdc-list-list-item-disabled-leading-icon-opacity:0.38;--mdc-list-list-item-disabled-trailing-icon-opacity:0.38}.cdk-high-contrast-active a.mdc-list-item--activated::after{content:\"\";position:absolute;top:50%;right:16px;transform:translateY(-50%);width:10px;height:0;border-bottom:solid 10px;border-radius:10px}.cdk-high-contrast-active a.mdc-list-item--activated [dir=rtl]::after{right:auto;left:16px}.mat-mdc-list-base{display:block}.mat-mdc-list-base .mdc-list-item__start,.mat-mdc-list-base .mdc-list-item__end,.mat-mdc-list-base .mdc-list-item__content{pointer-events:auto}.mat-mdc-list-item,.mat-mdc-list-option{width:100%;box-sizing:border-box;-webkit-tap-highlight-color:rgba(0,0,0,0)}.mat-mdc-list-item:not(.mat-mdc-list-item-interactive),.mat-mdc-list-option:not(.mat-mdc-list-item-interactive){cursor:default}.mat-mdc-list-item .mat-divider-inset,.mat-mdc-list-option .mat-divider-inset{position:absolute;left:0;right:0;bottom:0}.mat-mdc-list-item .mat-mdc-list-item-avatar~.mat-divider-inset,.mat-mdc-list-option .mat-mdc-list-item-avatar~.mat-divider-inset{margin-left:72px}[dir=rtl] .mat-mdc-list-item .mat-mdc-list-item-avatar~.mat-divider-inset,[dir=rtl] .mat-mdc-list-option .mat-mdc-list-item-avatar~.mat-divider-inset{margin-right:72px}.mat-mdc-list-item-interactive::before{top:0;left:0;right:0;bottom:0;position:absolute;content:\"\";opacity:0;pointer-events:none}.mat-mdc-list-item>.mat-mdc-focus-indicator{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none}.mat-mdc-list-item:focus>.mat-mdc-focus-indicator::before{content:\"\"}.mat-mdc-list-item.mdc-list-item--with-three-lines .mat-mdc-list-item-line.mdc-list-item__secondary-text{white-space:nowrap;line-height:normal}.mat-mdc-list-item.mdc-list-item--with-three-lines .mat-mdc-list-item-unscoped-content.mdc-list-item__secondary-text{display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2}mat-action-list button{background:none;color:inherit;border:none;font:inherit;outline:inherit;-webkit-tap-highlight-color:rgba(0,0,0,0);text-align:left}[dir=rtl] mat-action-list button{text-align:right}mat-action-list button::-moz-focus-inner{border:0}"]
    }]
  }], null, null);
})();
const MAT_SELECTION_LIST_VALUE_ACCESSOR = {
  provide: _angular_forms__WEBPACK_IMPORTED_MODULE_8__.NG_VALUE_ACCESSOR,
  useExisting: (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(() => MatSelectionList),
  multi: true
};
/** Change event that is being fired whenever the selected state of an option changes. */
class MatSelectionListChange {
  constructor( /** Reference to the selection list that emitted the event. */
  source, /** Reference to the options that have been changed. */
  options) {
    this.source = source;
    this.options = options;
  }
}
class MatSelectionList extends MatListBase {
  /** Whether selection is limited to one or multiple items (default multiple). */
  get multiple() {
    return this._multiple;
  }
  set multiple(value) {
    const newValue = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_1__.coerceBooleanProperty)(value);
    if (newValue !== this._multiple) {
      if ((typeof ngDevMode === 'undefined' || ngDevMode) && this._initialized) {
        throw new Error('Cannot change `multiple` mode of mat-selection-list after initialization.');
      }
      this._multiple = newValue;
      this.selectedOptions = new _angular_cdk_collections__WEBPACK_IMPORTED_MODULE_9__.SelectionModel(this._multiple, this.selectedOptions.selected);
    }
  }
  /** Whether radio indicator for all list items is hidden. */
  get hideSingleSelectionIndicator() {
    return this._hideSingleSelectionIndicator;
  }
  set hideSingleSelectionIndicator(value) {
    this._hideSingleSelectionIndicator = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_1__.coerceBooleanProperty)(value);
  }
  constructor(_element, _ngZone) {
    super();
    this._element = _element;
    this._ngZone = _ngZone;
    this._initialized = false;
    /** Emits when the list has been destroyed. */
    this._destroyed = new rxjs__WEBPACK_IMPORTED_MODULE_10__.Subject();
    /** View to model callback that should be called whenever the selected options change. */
    this._onChange = _ => {};
    /** Emits a change event whenever the selected state of an option changes. */
    this.selectionChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    /** Theme color of the selection list. This sets the checkbox color for all list options. */
    this.color = 'accent';
    /**
     * Function used for comparing an option against the selected value when determining which
     * options should appear as selected. The first argument is the value of an options. The second
     * one is a value from the selected value. A boolean must be returned.
     */
    this.compareWith = (a1, a2) => a1 === a2;
    this._multiple = true;
    this._hideSingleSelectionIndicator = this._defaultOptions?.hideSingleSelectionIndicator ?? false;
    /** The currently selected options. */
    this.selectedOptions = new _angular_cdk_collections__WEBPACK_IMPORTED_MODULE_9__.SelectionModel(this._multiple);
    /** View to model callback that should be called if the list or its options lost focus. */
    this._onTouched = () => {};
    this._selectionListDisabled = false;
    /** Handles focusout events within the list. */
    this._handleFocusout = () => {
      // Focus takes a while to update so we have to wrap our call in a timeout.
      setTimeout(() => {
        if (!this._containsFocus()) {
          this._resetActiveOption();
        }
      });
    };
    /** Handles focusin events within the list. */
    this._handleFocusin = event => {
      if (this.disabled) {
        return;
      }
      const activeIndex = this._items.toArray().findIndex(item => item._elementRef.nativeElement.contains(event.target));
      if (activeIndex > -1) {
        this._setActiveOption(activeIndex);
      } else {
        this._resetActiveOption();
      }
    };
    this._isNonInteractive = false;
  }
  ngAfterViewInit() {
    // Mark the selection list as initialized so that the `multiple`
    // binding can no longer be changed.
    this._initialized = true;
    this._setupRovingTabindex();
    // These events are bound outside the zone, because they don't change
    // any change-detected properties and they can trigger timeouts.
    this._ngZone.runOutsideAngular(() => {
      this._element.nativeElement.addEventListener('focusin', this._handleFocusin);
      this._element.nativeElement.addEventListener('focusout', this._handleFocusout);
    });
    if (this._value) {
      this._setOptionsFromValues(this._value);
    }
    this._watchForSelectionChange();
  }
  ngOnChanges(changes) {
    const disabledChanges = changes['disabled'];
    const disableRippleChanges = changes['disableRipple'];
    const hideSingleSelectionIndicatorChanges = changes['hideSingleSelectionIndicator'];
    if (disableRippleChanges && !disableRippleChanges.firstChange || disabledChanges && !disabledChanges.firstChange || hideSingleSelectionIndicatorChanges && !hideSingleSelectionIndicatorChanges.firstChange) {
      this._markOptionsForCheck();
    }
  }
  ngOnDestroy() {
    this._keyManager?.destroy();
    this._element.nativeElement.removeEventListener('focusin', this._handleFocusin);
    this._element.nativeElement.removeEventListener('focusout', this._handleFocusout);
    this._destroyed.next();
    this._destroyed.complete();
    this._isDestroyed = true;
  }
  /** Focuses the selection list. */
  focus(options) {
    this._element.nativeElement.focus(options);
  }
  /** Selects all of the options. Returns the options that changed as a result. */
  selectAll() {
    return this._setAllOptionsSelected(true);
  }
  /** Deselects all of the options. Returns the options that changed as a result. */
  deselectAll() {
    return this._setAllOptionsSelected(false);
  }
  /** Reports a value change to the ControlValueAccessor */
  _reportValueChange() {
    // Stop reporting value changes after the list has been destroyed. This avoids
    // cases where the list might wrongly reset its value once it is removed, but
    // the form control is still live.
    if (this.options && !this._isDestroyed) {
      const value = this._getSelectedOptionValues();
      this._onChange(value);
      this._value = value;
    }
  }
  /** Emits a change event if the selected state of an option changed. */
  _emitChangeEvent(options) {
    this.selectionChange.emit(new MatSelectionListChange(this, options));
  }
  /** Implemented as part of ControlValueAccessor. */
  writeValue(values) {
    this._value = values;
    if (this.options) {
      this._setOptionsFromValues(values || []);
    }
  }
  /** Implemented as a part of ControlValueAccessor. */
  setDisabledState(isDisabled) {
    this.disabled = isDisabled;
  }
  /**
   * Whether the *entire* selection list is disabled. When true, each list item is also disabled
   * and each list item is removed from the tab order (has tabindex="-1").
   */
  get disabled() {
    return this._selectionListDisabled;
  }
  set disabled(value) {
    // Update the disabled state of this list. Write to `this._selectionListDisabled` instead of
    // `super.disabled`. That is to avoid closure compiler compatibility issues with assigning to
    // a super property.
    this._selectionListDisabled = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_1__.coerceBooleanProperty)(value);
    if (this._selectionListDisabled) {
      this._keyManager?.setActiveItem(-1);
    }
  }
  /** Implemented as part of ControlValueAccessor. */
  registerOnChange(fn) {
    this._onChange = fn;
  }
  /** Implemented as part of ControlValueAccessor. */
  registerOnTouched(fn) {
    this._onTouched = fn;
  }
  /** Watches for changes in the selected state of the options and updates the list accordingly. */
  _watchForSelectionChange() {
    this.selectedOptions.changed.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_11__.takeUntil)(this._destroyed)).subscribe(event => {
      // Sync external changes to the model back to the options.
      for (let item of event.added) {
        item.selected = true;
      }
      for (let item of event.removed) {
        item.selected = false;
      }
      if (!this._containsFocus()) {
        this._resetActiveOption();
      }
    });
  }
  /** Sets the selected options based on the specified values. */
  _setOptionsFromValues(values) {
    this.options.forEach(option => option._setSelected(false));
    values.forEach(value => {
      const correspondingOption = this.options.find(option => {
        // Skip options that are already in the model. This allows us to handle cases
        // where the same primitive value is selected multiple times.
        return option.selected ? false : this.compareWith(option.value, value);
      });
      if (correspondingOption) {
        correspondingOption._setSelected(true);
      }
    });
  }
  /** Returns the values of the selected options. */
  _getSelectedOptionValues() {
    return this.options.filter(option => option.selected).map(option => option.value);
  }
  /** Marks all the options to be checked in the next change detection run. */
  _markOptionsForCheck() {
    if (this.options) {
      this.options.forEach(option => option._markForCheck());
    }
  }
  /**
   * Sets the selected state on all of the options
   * and emits an event if anything changed.
   */
  _setAllOptionsSelected(isSelected, skipDisabled) {
    // Keep track of whether anything changed, because we only want to
    // emit the changed event when something actually changed.
    const changedOptions = [];
    this.options.forEach(option => {
      if ((!skipDisabled || !option.disabled) && option._setSelected(isSelected)) {
        changedOptions.push(option);
      }
    });
    if (changedOptions.length) {
      this._reportValueChange();
    }
    return changedOptions;
  }
  // Note: This getter exists for backwards compatibility. The `_items` query list
  // cannot be named `options` as it will be picked up by the interactive list base.
  /** The option components contained within this selection-list. */
  get options() {
    return this._items;
  }
  /** Handles keydown events within the list. */
  _handleKeydown(event) {
    const activeItem = this._keyManager.activeItem;
    if ((event.keyCode === _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_12__.ENTER || event.keyCode === _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_12__.SPACE) && !this._keyManager.isTyping() && activeItem && !activeItem.disabled) {
      event.preventDefault();
      activeItem._toggleOnInteraction();
    } else if (event.keyCode === _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_12__.A && this.multiple && !this._keyManager.isTyping() && (0,_angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_12__.hasModifierKey)(event, 'ctrlKey')) {
      const shouldSelect = this.options.some(option => !option.disabled && !option.selected);
      event.preventDefault();
      this._emitChangeEvent(this._setAllOptionsSelected(shouldSelect, true));
    } else {
      this._keyManager.onKeydown(event);
    }
  }
  /**
   * Sets up the logic for maintaining the roving tabindex.
   *
   * `skipPredicate` determines if key manager should avoid putting a given list item in the tab
   * index. Allow disabled list items to receive focus to align with WAI ARIA recommendation.
   * Normally WAI ARIA's instructions are to exclude disabled items from the tab order, but it
   * makes a few exceptions for compound widgets.
   *
   * From [Developing a Keyboard Interface](
   * https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/):
   *   "For the following composite widget elements, keep them focusable when disabled: Options in a
   *   Listbox..."
   */
  _setupRovingTabindex() {
    this._keyManager = new _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_13__.FocusKeyManager(this._items).withHomeAndEnd().withTypeAhead().withWrap().skipPredicate(() => this.disabled);
    // Set the initial focus.
    this._resetActiveOption();
    // Move the tabindex to the currently-focused list item.
    this._keyManager.change.subscribe(activeItemIndex => this._setActiveOption(activeItemIndex));
    // If the active item is removed from the list, reset back to the first one.
    this._items.changes.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_11__.takeUntil)(this._destroyed)).subscribe(() => {
      const activeItem = this._keyManager.activeItem;
      if (!activeItem || !this._items.toArray().indexOf(activeItem)) {
        this._resetActiveOption();
      }
    });
  }
  /**
   * Sets an option as active.
   * @param index Index of the active option. If set to -1, no option will be active.
   */
  _setActiveOption(index) {
    this._items.forEach((item, itemIndex) => item._setTabindex(itemIndex === index ? 0 : -1));
    this._keyManager.updateActiveItem(index);
  }
  /**
   * Resets the active option. When the list is disabled, remove all options from to the tab order.
   * Otherwise, focus the first selected option.
   */
  _resetActiveOption() {
    if (this.disabled) {
      this._setActiveOption(-1);
      return;
    }
    const activeItem = this._items.find(item => item.selected && !item.disabled) || this._items.first;
    this._setActiveOption(activeItem ? this._items.toArray().indexOf(activeItem) : -1);
  }
  /** Returns whether the focus is currently within the list. */
  _containsFocus() {
    const activeElement = (0,_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_5__._getFocusedElementPierceShadowDom)();
    return activeElement && this._element.nativeElement.contains(activeElement);
  }
}
_class15 = MatSelectionList;
_class15.ɵfac = function _class15_Factory(t) {
  return new (t || _class15)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.NgZone));
};
_class15.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: _class15,
  selectors: [["mat-selection-list"]],
  contentQueries: function _class15_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵcontentQuery"](dirIndex, MatListOption, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx._items = _t);
    }
  },
  hostAttrs: ["role", "listbox", 1, "mat-mdc-selection-list", "mat-mdc-list-base", "mdc-list"],
  hostVars: 1,
  hostBindings: function _class15_HostBindings(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("keydown", function _class15_keydown_HostBindingHandler($event) {
        return ctx._handleKeydown($event);
      });
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattribute"]("aria-multiselectable", ctx.multiple);
    }
  },
  inputs: {
    color: "color",
    compareWith: "compareWith",
    multiple: "multiple",
    hideSingleSelectionIndicator: "hideSingleSelectionIndicator",
    disabled: "disabled"
  },
  outputs: {
    selectionChange: "selectionChange"
  },
  exportAs: ["matSelectionList"],
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([MAT_SELECTION_LIST_VALUE_ACCESSOR, {
    provide: MatListBase,
    useExisting: _class15
  }, {
    provide: SELECTION_LIST,
    useExisting: _class15
  }]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵNgOnChangesFeature"]],
  ngContentSelectors: _c0,
  decls: 1,
  vars: 0,
  template: function _class15_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojectionDef"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](0);
    }
  },
  styles: [_c1],
  encapsulation: 2,
  changeDetection: 0
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MatSelectionList, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Component,
    args: [{
      selector: 'mat-selection-list',
      exportAs: 'matSelectionList',
      host: {
        'class': 'mat-mdc-selection-list mat-mdc-list-base mdc-list',
        'role': 'listbox',
        '[attr.aria-multiselectable]': 'multiple',
        '(keydown)': '_handleKeydown($event)'
      },
      template: '<ng-content></ng-content>',
      encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewEncapsulation.None,
      providers: [MAT_SELECTION_LIST_VALUE_ACCESSOR, {
        provide: MatListBase,
        useExisting: MatSelectionList
      }, {
        provide: SELECTION_LIST,
        useExisting: MatSelectionList
      }],
      changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectionStrategy.OnPush,
      styles: ["@media screen and (forced-colors: active),(-ms-high-contrast: active){.mdc-list-divider::after{content:\"\";display:block;border-bottom-width:1px;border-bottom-style:solid}}.mdc-list{margin:0;padding:8px 0;list-style-type:none}.mdc-list:focus{outline:none}.mdc-list-item__wrapper{display:block}.mdc-list-item{display:flex;position:relative;align-items:center;justify-content:flex-start;overflow:hidden;padding:0;align-items:stretch;cursor:pointer}.mdc-list-item:focus{outline:none}.mdc-list-item.mdc-list-item--with-one-line{height:48px}.mdc-list-item.mdc-list-item--with-two-lines{height:64px}.mdc-list-item.mdc-list-item--with-three-lines{height:88px}.mdc-list-item.mdc-list-item--with-one-line .mdc-list-item__start{align-self:center;margin-top:0}.mdc-list-item.mdc-list-item--with-two-lines .mdc-list-item__start{align-self:flex-start;margin-top:16px}.mdc-list-item.mdc-list-item--with-three-lines .mdc-list-item__start{align-self:flex-start;margin-top:16px}.mdc-list-item.mdc-list-item--with-one-line .mdc-list-item__end{align-self:center;margin-top:0}.mdc-list-item.mdc-list-item--with-two-lines .mdc-list-item__end{align-self:center;margin-top:0}.mdc-list-item.mdc-list-item--with-three-lines .mdc-list-item__end{align-self:flex-start;margin-top:16px}.mdc-list-item.mdc-list-item--disabled,.mdc-list-item.mdc-list-item--non-interactive{cursor:auto}.mdc-list-item:not(.mdc-list-item--selected):focus::before,.mdc-list-item.mdc-ripple-upgraded--background-focused::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:1px solid rgba(0,0,0,0);border-radius:inherit;content:\"\";pointer-events:none}@media screen and (forced-colors: active){.mdc-list-item:not(.mdc-list-item--selected):focus::before,.mdc-list-item.mdc-ripple-upgraded--background-focused::before{border-color:CanvasText}}.mdc-list-item.mdc-list-item--selected::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:3px double rgba(0,0,0,0);border-radius:inherit;content:\"\";pointer-events:none}@media screen and (forced-colors: active){.mdc-list-item.mdc-list-item--selected::before{border-color:CanvasText}}.mdc-list-item.mdc-list-item--selected:focus::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:3px solid rgba(0,0,0,0);border-radius:inherit;content:\"\";pointer-events:none}@media screen and (forced-colors: active){.mdc-list-item.mdc-list-item--selected:focus::before{border-color:CanvasText}}a.mdc-list-item{color:inherit;text-decoration:none}.mdc-list-item__start{fill:currentColor;flex-shrink:0;pointer-events:none}.mdc-list-item__end{flex-shrink:0;pointer-events:none}.mdc-list-item__content{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;align-self:center;flex:1;pointer-events:none}.mdc-list-item--with-two-lines .mdc-list-item__content,.mdc-list-item--with-three-lines .mdc-list-item__content{align-self:stretch}.mdc-list-item__content[for]{pointer-events:none}.mdc-list-item__primary-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.mdc-list-item--with-two-lines .mdc-list-item__primary-text,.mdc-list-item--with-three-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before,.mdc-list-item--with-three-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after,.mdc-list-item--with-three-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item__secondary-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;display:block;margin-top:0;line-height:normal}.mdc-list-item__secondary-text::before{display:inline-block;width:0;height:20px;content:\"\";vertical-align:0}.mdc-list-item--with-three-lines .mdc-list-item__secondary-text{white-space:normal;line-height:20px}.mdc-list-item--with-overline .mdc-list-item__secondary-text{white-space:nowrap;line-height:auto}.mdc-list-item__overline-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.mdc-list-item--with-two-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-two-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:24px;content:\"\";vertical-align:0}.mdc-list-item--with-two-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-three-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-three-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-three-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-avatar.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-avatar.mdc-list-item,.mdc-list-item--with-leading-avatar.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-avatar .mdc-list-item__start{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-list-item--with-leading-avatar .mdc-list-item__start,.mdc-list-item--with-leading-avatar .mdc-list-item__start[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-avatar.mdc-list-item--with-one-line{height:56px}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-avatar .mdc-list-item__start{border-radius:50%}.mdc-list-item--with-leading-icon.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-icon.mdc-list-item,.mdc-list-item--with-leading-icon.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-icon .mdc-list-item__start{margin-left:16px;margin-right:32px}[dir=rtl] .mdc-list-item--with-leading-icon .mdc-list-item__start,.mdc-list-item--with-leading-icon .mdc-list-item__start[dir=rtl]{margin-left:32px;margin-right:16px}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-icon.mdc-list-item--with-one-line{height:56px}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-thumbnail.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-thumbnail.mdc-list-item,.mdc-list-item--with-leading-thumbnail.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-thumbnail .mdc-list-item__start{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-list-item--with-leading-thumbnail .mdc-list-item__start,.mdc-list-item--with-leading-thumbnail .mdc-list-item__start[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-one-line{height:56px}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-image.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-image.mdc-list-item,.mdc-list-item--with-leading-image.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-image .mdc-list-item__start{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-list-item--with-leading-image .mdc-list-item__start,.mdc-list-item--with-leading-image .mdc-list-item__start[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-image.mdc-list-item--with-one-line{height:72px}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines .mdc-list-item__start{align-self:flex-start;margin-top:8px}.mdc-list-item--with-leading-video.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-video.mdc-list-item,.mdc-list-item--with-leading-video.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-video .mdc-list-item__start{margin-left:0;margin-right:16px}[dir=rtl] .mdc-list-item--with-leading-video .mdc-list-item__start,.mdc-list-item--with-leading-video .mdc-list-item__start[dir=rtl]{margin-left:16px;margin-right:0}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-video.mdc-list-item--with-one-line{height:72px}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-checkbox.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-checkbox.mdc-list-item,.mdc-list-item--with-leading-checkbox.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-checkbox .mdc-list-item__start{margin-left:8px;margin-right:24px}[dir=rtl] .mdc-list-item--with-leading-checkbox .mdc-list-item__start,.mdc-list-item--with-leading-checkbox .mdc-list-item__start[dir=rtl]{margin-left:24px;margin-right:8px}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__start{align-self:flex-start;margin-top:8px}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-one-line{height:56px}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-radio.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-radio.mdc-list-item,.mdc-list-item--with-leading-radio.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-radio .mdc-list-item__start{margin-left:8px;margin-right:24px}[dir=rtl] .mdc-list-item--with-leading-radio .mdc-list-item__start,.mdc-list-item--with-leading-radio .mdc-list-item__start[dir=rtl]{margin-left:24px;margin-right:8px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__start{align-self:flex-start;margin-top:8px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-radio.mdc-list-item--with-one-line{height:56px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-switch.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-switch.mdc-list-item,.mdc-list-item--with-leading-switch.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-switch .mdc-list-item__start{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-list-item--with-leading-switch .mdc-list-item__start,.mdc-list-item--with-leading-switch .mdc-list-item__start[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines .mdc-list-item__start{align-self:flex-start;margin-top:16px}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-switch.mdc-list-item--with-one-line{height:56px}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-trailing-icon.mdc-list-item{padding-left:auto;padding-right:0}[dir=rtl] .mdc-list-item--with-trailing-icon.mdc-list-item,.mdc-list-item--with-trailing-icon.mdc-list-item[dir=rtl]{padding-left:0;padding-right:auto}.mdc-list-item--with-trailing-icon .mdc-list-item__end{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-list-item--with-trailing-icon .mdc-list-item__end,.mdc-list-item--with-trailing-icon .mdc-list-item__end[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-list-item--with-trailing-meta.mdc-list-item--with-two-lines .mdc-list-item__end{align-self:flex-start;margin-top:0}.mdc-list-item--with-trailing-meta.mdc-list-item--with-three-lines .mdc-list-item__end{align-self:flex-start;margin-top:0}.mdc-list-item--with-trailing-meta.mdc-list-item{padding-left:auto;padding-right:0}[dir=rtl] .mdc-list-item--with-trailing-meta.mdc-list-item,.mdc-list-item--with-trailing-meta.mdc-list-item[dir=rtl]{padding-left:0;padding-right:auto}.mdc-list-item--with-trailing-meta .mdc-list-item__end{margin-left:28px;margin-right:16px}[dir=rtl] .mdc-list-item--with-trailing-meta .mdc-list-item__end,.mdc-list-item--with-trailing-meta .mdc-list-item__end[dir=rtl]{margin-left:16px;margin-right:28px}.mdc-list-item--with-trailing-meta.mdc-list-item--with-two-lines .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-trailing-meta.mdc-list-item--with-two-lines .mdc-list-item__end::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-trailing-meta.mdc-list-item--with-three-lines .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-trailing-meta.mdc-list-item--with-three-lines .mdc-list-item__end::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-trailing-meta .mdc-list-item__end{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:var(--mdc-typography-caption-font-family);font-size:var(--mdc-typography-caption-font-size);line-height:var(--mdc-typography-caption-line-height);font-weight:var(--mdc-typography-caption-font-weight);letter-spacing:var(--mdc-typography-caption-letter-spacing);text-decoration:var(--mdc-typography-caption-text-decoration);text-transform:var(--mdc-typography-caption-text-transform)}.mdc-list-item--with-trailing-checkbox.mdc-list-item{padding-left:auto;padding-right:0}[dir=rtl] .mdc-list-item--with-trailing-checkbox.mdc-list-item,.mdc-list-item--with-trailing-checkbox.mdc-list-item[dir=rtl]{padding-left:0;padding-right:auto}.mdc-list-item--with-trailing-checkbox .mdc-list-item__end{margin-left:24px;margin-right:8px}[dir=rtl] .mdc-list-item--with-trailing-checkbox .mdc-list-item__end,.mdc-list-item--with-trailing-checkbox .mdc-list-item__end[dir=rtl]{margin-left:8px;margin-right:24px}.mdc-list-item--with-trailing-checkbox.mdc-list-item--with-three-lines .mdc-list-item__end{align-self:flex-start;margin-top:8px}.mdc-list-item--with-trailing-radio.mdc-list-item{padding-left:auto;padding-right:0}[dir=rtl] .mdc-list-item--with-trailing-radio.mdc-list-item,.mdc-list-item--with-trailing-radio.mdc-list-item[dir=rtl]{padding-left:0;padding-right:auto}.mdc-list-item--with-trailing-radio .mdc-list-item__end{margin-left:24px;margin-right:8px}[dir=rtl] .mdc-list-item--with-trailing-radio .mdc-list-item__end,.mdc-list-item--with-trailing-radio .mdc-list-item__end[dir=rtl]{margin-left:8px;margin-right:24px}.mdc-list-item--with-trailing-radio.mdc-list-item--with-three-lines .mdc-list-item__end{align-self:flex-start;margin-top:8px}.mdc-list-item--with-trailing-switch.mdc-list-item{padding-left:auto;padding-right:0}[dir=rtl] .mdc-list-item--with-trailing-switch.mdc-list-item,.mdc-list-item--with-trailing-switch.mdc-list-item[dir=rtl]{padding-left:0;padding-right:auto}.mdc-list-item--with-trailing-switch .mdc-list-item__end{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-list-item--with-trailing-switch .mdc-list-item__end,.mdc-list-item--with-trailing-switch .mdc-list-item__end[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-list-item--with-trailing-switch.mdc-list-item--with-three-lines .mdc-list-item__end{align-self:flex-start;margin-top:16px}.mdc-list-item--with-overline.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-overline.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:20px;content:\"\";vertical-align:0}.mdc-list-item--with-overline.mdc-list-item--with-three-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-overline.mdc-list-item--with-three-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:20px;content:\"\";vertical-align:0}.mdc-list-item{padding-left:16px;padding-right:16px}[dir=rtl] .mdc-list-item,.mdc-list-item[dir=rtl]{padding-left:16px;padding-right:16px}.mdc-list-group .mdc-deprecated-list{padding:0}.mdc-list-group__subheader{margin:calc((3rem - 1.5rem)/2) 16px}.mdc-list-divider{padding:0;background-clip:content-box}.mdc-list-divider.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-text.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-icon.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-image.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-thumbnail.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-avatar.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-checkbox.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-switch.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-radio.mdc-list-divider--with-leading-inset{padding-left:16px;padding-right:auto}[dir=rtl] .mdc-list-divider.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-text.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-icon.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-image.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-thumbnail.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-avatar.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-checkbox.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-switch.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-radio.mdc-list-divider--with-leading-inset,.mdc-list-divider.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-text.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-icon.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-image.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-thumbnail.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-avatar.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-checkbox.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-switch.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-radio.mdc-list-divider--with-leading-inset[dir=rtl]{padding-left:auto;padding-right:16px}.mdc-list-divider.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-text.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-icon.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-image.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-thumbnail.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-avatar.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-checkbox.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-switch.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-radio.mdc-list-divider--with-trailing-inset{padding-left:auto;padding-right:16px}[dir=rtl] .mdc-list-divider.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-text.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-icon.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-image.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-thumbnail.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-avatar.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-checkbox.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-switch.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-radio.mdc-list-divider--with-trailing-inset,.mdc-list-divider.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-text.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-icon.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-image.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-thumbnail.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-avatar.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-checkbox.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-switch.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-radio.mdc-list-divider--with-trailing-inset[dir=rtl]{padding-left:16px;padding-right:auto}.mdc-list-divider--with-leading-video.mdc-list-divider--with-leading-inset{padding-left:0px;padding-right:auto}[dir=rtl] .mdc-list-divider--with-leading-video.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-video.mdc-list-divider--with-leading-inset[dir=rtl]{padding-left:auto;padding-right:0px}[dir=rtl] .mdc-list-divider,.mdc-list-divider[dir=rtl]{padding:0}.mdc-list-item{background-color:var(--mdc-list-list-item-container-color)}.mdc-list-item.mdc-list-item--selected{background-color:var(--mdc-list-list-item-selected-container-color)}.mdc-list-item--with-one-line{border-radius:var(--mdc-list-list-item-container-shape)}.mdc-list-item--with-one-line.mdc-list-item--with-leading-avatar,.mdc-list-item--with-one-line.mdc-list-item--with-leading-icon,.mdc-list-item--with-one-line.mdc-list-item--with-leading-thumbnail,.mdc-list-item--with-one-line.mdc-list-item--with-leading-checkbox,.mdc-list-item--with-one-line.mdc-list-item--with-leading-radio,.mdc-list-item--with-one-line.mdc-list-item--with-leading-switch{border-radius:var(--mdc-list-list-item-container-shape)}.mdc-list-item--with-one-line.mdc-list-item--with-leading-image,.mdc-list-item--with-one-line.mdc-list-item--with-leading-video{border-radius:var(--mdc-list-list-item-container-shape)}.mdc-list-item--with-two-lines{border-radius:var(--mdc-list-list-item-container-shape)}.mdc-list-item--with-two-lines.mdc-list-item--with-leading-avatar,.mdc-list-item--with-two-lines.mdc-list-item--with-leading-icon,.mdc-list-item--with-two-lines.mdc-list-item--with-leading-thumbnail,.mdc-list-item--with-two-lines.mdc-list-item--with-leading-checkbox,.mdc-list-item--with-two-lines.mdc-list-item--with-leading-radio,.mdc-list-item--with-two-lines.mdc-list-item--with-leading-switch,.mdc-list-item--with-two-lines.mdc-list-item--with-leading-image,.mdc-list-item--with-two-lines.mdc-list-item--with-leading-video{border-radius:var(--mdc-list-list-item-container-shape)}.mdc-list-item--with-three-lines{border-radius:var(--mdc-list-list-item-container-shape)}.mdc-list-item.mdc-list-item--with-one-line{height:var(--mdc-list-list-item-one-line-container-height)}.mdc-list-item.mdc-list-item--with-two-lines{height:var(--mdc-list-list-item-two-line-container-height)}.mdc-list-item.mdc-list-item--with-three-lines{height:var(--mdc-list-list-item-three-line-container-height)}.mdc-list-item__primary-text{color:var(--mdc-list-list-item-label-text-color)}.mdc-list-item__primary-text{font-family:var(--mdc-list-list-item-label-text-font);line-height:var(--mdc-list-list-item-label-text-line-height);font-size:var(--mdc-list-list-item-label-text-size);font-weight:var(--mdc-list-list-item-label-text-weight);letter-spacing:var(--mdc-list-list-item-label-text-tracking)}.mdc-list-item__secondary-text{color:var(--mdc-list-list-item-supporting-text-color)}.mdc-list-item__secondary-text{font-family:var(--mdc-list-list-item-supporting-text-font);line-height:var(--mdc-list-list-item-supporting-text-line-height);font-size:var(--mdc-list-list-item-supporting-text-size);font-weight:var(--mdc-list-list-item-supporting-text-weight);letter-spacing:var(--mdc-list-list-item-supporting-text-tracking)}.mdc-list-item--with-leading-icon .mdc-list-item__start{color:var(--mdc-list-list-item-leading-icon-color)}.mdc-list-item--with-leading-icon .mdc-list-item__start{width:var(--mdc-list-list-item-leading-icon-size);height:var(--mdc-list-list-item-leading-icon-size)}.mdc-list-item--with-leading-icon .mdc-list-item__start>i{font-size:var(--mdc-list-list-item-leading-icon-size)}.mdc-list-item--with-leading-icon .mdc-list-item__start .mdc-list-item__icon{font-size:var(--mdc-list-list-item-leading-icon-size);width:var(--mdc-list-list-item-leading-icon-size);height:var(--mdc-list-list-item-leading-icon-size)}.mdc-list-item--with-leading-icon .mdc-list-item__start .mdc-list-item__icon,.mdc-list-item--with-leading-icon .mdc-list-item__start .mdc-list-item__icon>.materialdesignWizIconSvgsSvgIcon{display:block}.mdc-list-item--with-leading-avatar .mdc-list-item__start{width:var(--mdc-list-list-item-leading-avatar-size);height:var(--mdc-list-list-item-leading-avatar-size)}.mdc-list-item.mdc-list-item--with-trailing-meta .mdc-list-item__end{color:var(--mdc-list-list-item-trailing-supporting-text-color)}.mdc-list-item--with-trailing-meta .mdc-list-item__end{font-family:var(--mdc-list-list-item-trailing-supporting-text-font);line-height:var(--mdc-list-list-item-trailing-supporting-text-line-height);font-size:var(--mdc-list-list-item-trailing-supporting-text-size);font-weight:var(--mdc-list-list-item-trailing-supporting-text-weight);letter-spacing:var(--mdc-list-list-item-trailing-supporting-text-tracking)}.mdc-list-item--with-trailing-icon .mdc-list-item__end{color:var(--mdc-list-list-item-trailing-icon-color)}.mdc-list-item--with-trailing-icon .mdc-list-item__end{width:var(--mdc-list-list-item-trailing-icon-size);height:var(--mdc-list-list-item-trailing-icon-size)}.mdc-list-item--with-trailing-icon .mdc-list-item__end>i{font-size:var(--mdc-list-list-item-trailing-icon-size)}.mdc-list-item--with-trailing-icon .mdc-list-item__end .mdc-list-item__icon{font-size:var(--mdc-list-list-item-trailing-icon-size);width:var(--mdc-list-list-item-trailing-icon-size);height:var(--mdc-list-list-item-trailing-icon-size)}.mdc-list-item--with-trailing-icon .mdc-list-item__end .mdc-list-item__icon,.mdc-list-item--with-trailing-icon .mdc-list-item__end .mdc-list-item__icon>.materialdesignWizIconSvgsSvgIcon{display:block}.mdc-list-item--selected.mdc-list-item--with-trailing-icon .mdc-list-item__end{color:var(--mdc-list-list-item-selected-trailing-icon-color)}.mdc-list-item--disabled .mdc-list-item__start,.mdc-list-item--disabled .mdc-list-item__content,.mdc-list-item--disabled .mdc-list-item__end{opacity:1}.mdc-list-item--disabled .mdc-list-item__primary-text,.mdc-list-item--disabled .mdc-list-item__secondary-text,.mdc-list-item--disabled .mdc-list-item__overline-text{opacity:var(--mdc-list-list-item-disabled-label-text-opacity)}.mdc-list-item--disabled.mdc-list-item--with-leading-icon .mdc-list-item__start{color:var(--mdc-list-list-item-disabled-leading-icon-color)}.mdc-list-item--disabled.mdc-list-item--with-leading-icon .mdc-list-item__start{opacity:var(--mdc-list-list-item-disabled-leading-icon-opacity)}.mdc-list-item--disabled.mdc-list-item--with-trailing-icon .mdc-list-item__end{color:var(--mdc-list-list-item-disabled-trailing-icon-color)}.mdc-list-item--disabled.mdc-list-item--with-trailing-icon .mdc-list-item__end{opacity:var(--mdc-list-list-item-disabled-trailing-icon-opacity)}.mdc-list-item:hover .mdc-list-item__primary-text{color:var(--mdc-list-list-item-hover-label-text-color)}.mdc-list-item--with-leading-icon:hover .mdc-list-item__start{color:var(--mdc-list-list-item-hover-leading-icon-color)}.mdc-list-item--with-trailing-icon:hover .mdc-list-item__end{color:var(--mdc-list-list-item-hover-trailing-icon-color)}.mdc-list-item:focus .mdc-list-item__primary-text{color:var(--mdc-list-list-item-focus-label-text-color)}.mdc-list-item.mdc-list-item--disabled .mdc-list-item__primary-text{color:var(--mdc-list-list-item-disabled-label-text-color)}.mdc-list-item:hover::before{background-color:var(--mdc-list-list-item-hover-state-layer-color);opacity:var(--mdc-list-list-item-hover-state-layer-opacity)}.mdc-list-item.mdc-list-item--disabled::before{background-color:var(--mdc-list-list-item-disabled-state-layer-color);opacity:var(--mdc-list-list-item-disabled-state-layer-opacity)}.mdc-list-item:focus::before{background-color:var(--mdc-list-list-item-focus-state-layer-color);opacity:var(--mdc-list-list-item-focus-state-layer-opacity)}.mdc-list-item--disabled .mdc-radio,.mdc-list-item--disabled .mdc-checkbox{opacity:var(--mdc-list-list-item-disabled-label-text-opacity)}.mdc-list-item--with-leading-avatar .mat-mdc-list-item-avatar{border-radius:var(--mdc-list-list-item-leading-avatar-shape);background-color:var(--mdc-list-list-item-leading-avatar-color)}.mat-mdc-list-base{--mdc-list-list-item-container-shape:0;--mdc-list-list-item-leading-avatar-shape:50%;--mdc-list-list-item-container-color:transparent;--mdc-list-list-item-selected-container-color:transparent;--mdc-list-list-item-leading-avatar-color:transparent;--mdc-list-list-item-leading-icon-size:24px;--mdc-list-list-item-leading-avatar-size:40px;--mdc-list-list-item-trailing-icon-size:24px;--mdc-list-list-item-disabled-state-layer-color:transparent;--mdc-list-list-item-disabled-state-layer-opacity:0;--mdc-list-list-item-disabled-label-text-opacity:0.38;--mdc-list-list-item-disabled-leading-icon-opacity:0.38;--mdc-list-list-item-disabled-trailing-icon-opacity:0.38}.cdk-high-contrast-active a.mdc-list-item--activated::after{content:\"\";position:absolute;top:50%;right:16px;transform:translateY(-50%);width:10px;height:0;border-bottom:solid 10px;border-radius:10px}.cdk-high-contrast-active a.mdc-list-item--activated [dir=rtl]::after{right:auto;left:16px}.mat-mdc-list-base{display:block}.mat-mdc-list-base .mdc-list-item__start,.mat-mdc-list-base .mdc-list-item__end,.mat-mdc-list-base .mdc-list-item__content{pointer-events:auto}.mat-mdc-list-item,.mat-mdc-list-option{width:100%;box-sizing:border-box;-webkit-tap-highlight-color:rgba(0,0,0,0)}.mat-mdc-list-item:not(.mat-mdc-list-item-interactive),.mat-mdc-list-option:not(.mat-mdc-list-item-interactive){cursor:default}.mat-mdc-list-item .mat-divider-inset,.mat-mdc-list-option .mat-divider-inset{position:absolute;left:0;right:0;bottom:0}.mat-mdc-list-item .mat-mdc-list-item-avatar~.mat-divider-inset,.mat-mdc-list-option .mat-mdc-list-item-avatar~.mat-divider-inset{margin-left:72px}[dir=rtl] .mat-mdc-list-item .mat-mdc-list-item-avatar~.mat-divider-inset,[dir=rtl] .mat-mdc-list-option .mat-mdc-list-item-avatar~.mat-divider-inset{margin-right:72px}.mat-mdc-list-item-interactive::before{top:0;left:0;right:0;bottom:0;position:absolute;content:\"\";opacity:0;pointer-events:none}.mat-mdc-list-item>.mat-mdc-focus-indicator{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none}.mat-mdc-list-item:focus>.mat-mdc-focus-indicator::before{content:\"\"}.mat-mdc-list-item.mdc-list-item--with-three-lines .mat-mdc-list-item-line.mdc-list-item__secondary-text{white-space:nowrap;line-height:normal}.mat-mdc-list-item.mdc-list-item--with-three-lines .mat-mdc-list-item-unscoped-content.mdc-list-item__secondary-text{display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2}mat-action-list button{background:none;color:inherit;border:none;font:inherit;outline:inherit;-webkit-tap-highlight-color:rgba(0,0,0,0);text-align:left}[dir=rtl] mat-action-list button{text-align:right}mat-action-list button::-moz-focus-inner{border:0}"]
    }]
  }], function () {
    return [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.NgZone
    }];
  }, {
    _items: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ContentChildren,
      args: [MatListOption, {
        descendants: true
      }]
    }],
    selectionChange: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Output
    }],
    color: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    compareWith: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    multiple: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    hideSingleSelectionIndicator: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    disabled: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }]
  });
})();
class MatListModule {}
_class16 = MatListModule;
_class16.ɵfac = function _class16_Factory(t) {
  return new (t || _class16)();
};
_class16.ɵmod = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
  type: _class16
});
_class16.ɵinj = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
  imports: [_angular_cdk_observers__WEBPACK_IMPORTED_MODULE_6__.ObserversModule, _angular_common__WEBPACK_IMPORTED_MODULE_7__.CommonModule, _angular_material_core__WEBPACK_IMPORTED_MODULE_3__.MatCommonModule, _angular_material_core__WEBPACK_IMPORTED_MODULE_3__.MatRippleModule, _angular_material_core__WEBPACK_IMPORTED_MODULE_3__.MatPseudoCheckboxModule, _angular_material_divider__WEBPACK_IMPORTED_MODULE_14__.MatDividerModule]
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MatListModule, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.NgModule,
    args: [{
      imports: [_angular_cdk_observers__WEBPACK_IMPORTED_MODULE_6__.ObserversModule, _angular_common__WEBPACK_IMPORTED_MODULE_7__.CommonModule, _angular_material_core__WEBPACK_IMPORTED_MODULE_3__.MatCommonModule, _angular_material_core__WEBPACK_IMPORTED_MODULE_3__.MatRippleModule, _angular_material_core__WEBPACK_IMPORTED_MODULE_3__.MatPseudoCheckboxModule],
      exports: [MatList, MatActionList, MatNavList, MatSelectionList, MatListItem, MatListOption, MatListItemAvatar, MatListItemIcon, MatListSubheaderCssMatStyler, _angular_material_divider__WEBPACK_IMPORTED_MODULE_14__.MatDividerModule, MatListItemLine, MatListItemTitle, MatListItemMeta],
      declarations: [MatList, MatActionList, MatNavList, MatSelectionList, MatListItem, MatListOption, MatListSubheaderCssMatStyler, MatListItemAvatar, MatListItemIcon, MatListItemLine, MatListItemTitle, MatListItemMeta]
    }]
  }], null, null);
})();

/**
 * Generated bundle index. Do not edit.
 */



/***/ }),

/***/ 2106:
/*!***********************************************************!*\
  !*** ./node_modules/@angular/material/fesm2022/radio.mjs ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MAT_RADIO_DEFAULT_OPTIONS: () => (/* binding */ MAT_RADIO_DEFAULT_OPTIONS),
/* harmony export */   MAT_RADIO_DEFAULT_OPTIONS_FACTORY: () => (/* binding */ MAT_RADIO_DEFAULT_OPTIONS_FACTORY),
/* harmony export */   MAT_RADIO_GROUP: () => (/* binding */ MAT_RADIO_GROUP),
/* harmony export */   MAT_RADIO_GROUP_CONTROL_VALUE_ACCESSOR: () => (/* binding */ MAT_RADIO_GROUP_CONTROL_VALUE_ACCESSOR),
/* harmony export */   MatRadioButton: () => (/* binding */ MatRadioButton),
/* harmony export */   MatRadioChange: () => (/* binding */ MatRadioChange),
/* harmony export */   MatRadioGroup: () => (/* binding */ MatRadioGroup),
/* harmony export */   MatRadioModule: () => (/* binding */ MatRadioModule),
/* harmony export */   _MatRadioButtonBase: () => (/* binding */ _MatRadioButtonBase),
/* harmony export */   _MatRadioGroupBase: () => (/* binding */ _MatRadioGroupBase)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser/animations */ 1699);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/core */ 5309);
/* harmony import */ var _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/cdk/a11y */ 3170);
/* harmony import */ var _angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/cdk/coercion */ 5998);
/* harmony import */ var _angular_cdk_collections__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/cdk/collections */ 636);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/forms */ 8849);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 6575);
var _class, _class2, _class3, _class4, _class5;











// Increasing integer for generating unique ids for radio components.
const _c0 = ["input"];
const _c1 = ["*"];
let nextUniqueId = 0;
/** Change event object emitted by radio button and radio group. */
class MatRadioChange {
  constructor( /** The radio button that emits the change event. */
  source, /** The value of the radio button. */
  value) {
    this.source = source;
    this.value = value;
  }
}
/**
 * Provider Expression that allows mat-radio-group to register as a ControlValueAccessor. This
 * allows it to support [(ngModel)] and ngControl.
 * @docs-private
 */
const MAT_RADIO_GROUP_CONTROL_VALUE_ACCESSOR = {
  provide: _angular_forms__WEBPACK_IMPORTED_MODULE_0__.NG_VALUE_ACCESSOR,
  useExisting: (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.forwardRef)(() => MatRadioGroup),
  multi: true
};
/**
 * Injection token that can be used to inject instances of `MatRadioGroup`. It serves as
 * alternative token to the actual `MatRadioGroup` class which could cause unnecessary
 * retention of the class and its component metadata.
 */
const MAT_RADIO_GROUP = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.InjectionToken('MatRadioGroup');
const MAT_RADIO_DEFAULT_OPTIONS = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.InjectionToken('mat-radio-default-options', {
  providedIn: 'root',
  factory: MAT_RADIO_DEFAULT_OPTIONS_FACTORY
});
function MAT_RADIO_DEFAULT_OPTIONS_FACTORY() {
  return {
    color: 'accent'
  };
}
/**
 * Base class with all of the `MatRadioGroup` functionality.
 * @docs-private
 */
class _MatRadioGroupBase {
  /** Name of the radio button group. All radio buttons inside this group will use this name. */
  get name() {
    return this._name;
  }
  set name(value) {
    this._name = value;
    this._updateRadioButtonNames();
  }
  /** Whether the labels should appear after or before the radio-buttons. Defaults to 'after' */
  get labelPosition() {
    return this._labelPosition;
  }
  set labelPosition(v) {
    this._labelPosition = v === 'before' ? 'before' : 'after';
    this._markRadiosForCheck();
  }
  /**
   * Value for the radio-group. Should equal the value of the selected radio button if there is
   * a corresponding radio button with a matching value. If there is not such a corresponding
   * radio button, this value persists to be applied in case a new radio button is added with a
   * matching value.
   */
  get value() {
    return this._value;
  }
  set value(newValue) {
    if (this._value !== newValue) {
      // Set this before proceeding to ensure no circular loop occurs with selection.
      this._value = newValue;
      this._updateSelectedRadioFromValue();
      this._checkSelectedRadioButton();
    }
  }
  _checkSelectedRadioButton() {
    if (this._selected && !this._selected.checked) {
      this._selected.checked = true;
    }
  }
  /**
   * The currently selected radio button. If set to a new radio button, the radio group value
   * will be updated to match the new selected button.
   */
  get selected() {
    return this._selected;
  }
  set selected(selected) {
    this._selected = selected;
    this.value = selected ? selected.value : null;
    this._checkSelectedRadioButton();
  }
  /** Whether the radio group is disabled */
  get disabled() {
    return this._disabled;
  }
  set disabled(value) {
    this._disabled = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_2__.coerceBooleanProperty)(value);
    this._markRadiosForCheck();
  }
  /** Whether the radio group is required */
  get required() {
    return this._required;
  }
  set required(value) {
    this._required = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_2__.coerceBooleanProperty)(value);
    this._markRadiosForCheck();
  }
  constructor(_changeDetector) {
    this._changeDetector = _changeDetector;
    /** Selected value for the radio group. */
    this._value = null;
    /** The HTML name attribute applied to radio buttons in this group. */
    this._name = `mat-radio-group-${nextUniqueId++}`;
    /** The currently selected radio button. Should match value. */
    this._selected = null;
    /** Whether the `value` has been set to its initial value. */
    this._isInitialized = false;
    /** Whether the labels should appear after or before the radio-buttons. Defaults to 'after' */
    this._labelPosition = 'after';
    /** Whether the radio group is disabled. */
    this._disabled = false;
    /** Whether the radio group is required. */
    this._required = false;
    /** The method to be called in order to update ngModel */
    this._controlValueAccessorChangeFn = () => {};
    /**
     * onTouch function registered via registerOnTouch (ControlValueAccessor).
     * @docs-private
     */
    this.onTouched = () => {};
    /**
     * Event emitted when the group value changes.
     * Change events are only emitted when the value changes due to user interaction with
     * a radio button (the same behavior as `<input type-"radio">`).
     */
    this.change = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
  }
  /**
   * Initialize properties once content children are available.
   * This allows us to propagate relevant attributes to associated buttons.
   */
  ngAfterContentInit() {
    // Mark this component as initialized in AfterContentInit because the initial value can
    // possibly be set by NgModel on MatRadioGroup, and it is possible that the OnInit of the
    // NgModel occurs *after* the OnInit of the MatRadioGroup.
    this._isInitialized = true;
    // Clear the `selected` button when it's destroyed since the tabindex of the rest of the
    // buttons depends on it. Note that we don't clear the `value`, because the radio button
    // may be swapped out with a similar one and there are some internal apps that depend on
    // that behavior.
    this._buttonChanges = this._radios.changes.subscribe(() => {
      if (this.selected && !this._radios.find(radio => radio === this.selected)) {
        this._selected = null;
      }
    });
  }
  ngOnDestroy() {
    this._buttonChanges?.unsubscribe();
  }
  /**
   * Mark this group as being "touched" (for ngModel). Meant to be called by the contained
   * radio buttons upon their blur.
   */
  _touch() {
    if (this.onTouched) {
      this.onTouched();
    }
  }
  _updateRadioButtonNames() {
    if (this._radios) {
      this._radios.forEach(radio => {
        radio.name = this.name;
        radio._markForCheck();
      });
    }
  }
  /** Updates the `selected` radio button from the internal _value state. */
  _updateSelectedRadioFromValue() {
    // If the value already matches the selected radio, do nothing.
    const isAlreadySelected = this._selected !== null && this._selected.value === this._value;
    if (this._radios && !isAlreadySelected) {
      this._selected = null;
      this._radios.forEach(radio => {
        radio.checked = this.value === radio.value;
        if (radio.checked) {
          this._selected = radio;
        }
      });
    }
  }
  /** Dispatch change event with current selection and group value. */
  _emitChangeEvent() {
    if (this._isInitialized) {
      this.change.emit(new MatRadioChange(this._selected, this._value));
    }
  }
  _markRadiosForCheck() {
    if (this._radios) {
      this._radios.forEach(radio => radio._markForCheck());
    }
  }
  /**
   * Sets the model value. Implemented as part of ControlValueAccessor.
   * @param value
   */
  writeValue(value) {
    this.value = value;
    this._changeDetector.markForCheck();
  }
  /**
   * Registers a callback to be triggered when the model value changes.
   * Implemented as part of ControlValueAccessor.
   * @param fn Callback to be registered.
   */
  registerOnChange(fn) {
    this._controlValueAccessorChangeFn = fn;
  }
  /**
   * Registers a callback to be triggered when the control is touched.
   * Implemented as part of ControlValueAccessor.
   * @param fn Callback to be registered.
   */
  registerOnTouched(fn) {
    this.onTouched = fn;
  }
  /**
   * Sets the disabled state of the control. Implemented as a part of ControlValueAccessor.
   * @param isDisabled Whether the control should be disabled.
   */
  setDisabledState(isDisabled) {
    this.disabled = isDisabled;
    this._changeDetector.markForCheck();
  }
}
_class = _MatRadioGroupBase;
_class.ɵfac = function _class_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.ChangeDetectorRef));
};
_class.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineDirective"]({
  type: _class,
  inputs: {
    color: "color",
    name: "name",
    labelPosition: "labelPosition",
    value: "value",
    selected: "selected",
    disabled: "disabled",
    required: "required"
  },
  outputs: {
    change: "change"
  }
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](_MatRadioGroupBase, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Directive
  }], function () {
    return [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.ChangeDetectorRef
    }];
  }, {
    change: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Output
    }],
    color: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    name: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    labelPosition: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    value: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    selected: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    disabled: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    required: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }]
  });
})();
// Boilerplate for applying mixins to MatRadioButton.
/** @docs-private */
class MatRadioButtonBase {
  constructor(_elementRef) {
    this._elementRef = _elementRef;
  }
}
const _MatRadioButtonMixinBase = (0,_angular_material_core__WEBPACK_IMPORTED_MODULE_3__.mixinDisableRipple)((0,_angular_material_core__WEBPACK_IMPORTED_MODULE_3__.mixinTabIndex)(MatRadioButtonBase));
/**
 * Base class with all of the `MatRadioButton` functionality.
 * @docs-private
 */
class _MatRadioButtonBase extends _MatRadioButtonMixinBase {
  /** Whether this radio button is checked. */
  get checked() {
    return this._checked;
  }
  set checked(value) {
    const newCheckedState = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_2__.coerceBooleanProperty)(value);
    if (this._checked !== newCheckedState) {
      this._checked = newCheckedState;
      if (newCheckedState && this.radioGroup && this.radioGroup.value !== this.value) {
        this.radioGroup.selected = this;
      } else if (!newCheckedState && this.radioGroup && this.radioGroup.value === this.value) {
        // When unchecking the selected radio button, update the selected radio
        // property on the group.
        this.radioGroup.selected = null;
      }
      if (newCheckedState) {
        // Notify all radio buttons with the same name to un-check.
        this._radioDispatcher.notify(this.id, this.name);
      }
      this._changeDetector.markForCheck();
    }
  }
  /** The value of this radio button. */
  get value() {
    return this._value;
  }
  set value(value) {
    if (this._value !== value) {
      this._value = value;
      if (this.radioGroup !== null) {
        if (!this.checked) {
          // Update checked when the value changed to match the radio group's value
          this.checked = this.radioGroup.value === value;
        }
        if (this.checked) {
          this.radioGroup.selected = this;
        }
      }
    }
  }
  /** Whether the label should appear after or before the radio button. Defaults to 'after' */
  get labelPosition() {
    return this._labelPosition || this.radioGroup && this.radioGroup.labelPosition || 'after';
  }
  set labelPosition(value) {
    this._labelPosition = value;
  }
  /** Whether the radio button is disabled. */
  get disabled() {
    return this._disabled || this.radioGroup !== null && this.radioGroup.disabled;
  }
  set disabled(value) {
    this._setDisabled((0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_2__.coerceBooleanProperty)(value));
  }
  /** Whether the radio button is required. */
  get required() {
    return this._required || this.radioGroup && this.radioGroup.required;
  }
  set required(value) {
    this._required = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_2__.coerceBooleanProperty)(value);
  }
  /** Theme color of the radio button. */
  get color() {
    // As per Material design specifications the selection control radio should use the accent color
    // palette by default. https://material.io/guidelines/components/selection-controls.html
    return this._color || this.radioGroup && this.radioGroup.color || this._providerOverride && this._providerOverride.color || 'accent';
  }
  set color(newValue) {
    this._color = newValue;
  }
  /** ID of the native input element inside `<mat-radio-button>` */
  get inputId() {
    return `${this.id || this._uniqueId}-input`;
  }
  constructor(radioGroup, elementRef, _changeDetector, _focusMonitor, _radioDispatcher, animationMode, _providerOverride, tabIndex) {
    super(elementRef);
    this._changeDetector = _changeDetector;
    this._focusMonitor = _focusMonitor;
    this._radioDispatcher = _radioDispatcher;
    this._providerOverride = _providerOverride;
    this._uniqueId = `mat-radio-${++nextUniqueId}`;
    /** The unique ID for the radio button. */
    this.id = this._uniqueId;
    /**
     * Event emitted when the checked state of this radio button changes.
     * Change events are only emitted when the value changes due to user interaction with
     * the radio button (the same behavior as `<input type-"radio">`).
     */
    this.change = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    /** Whether this radio is checked. */
    this._checked = false;
    /** Value assigned to this radio. */
    this._value = null;
    /** Unregister function for _radioDispatcher */
    this._removeUniqueSelectionListener = () => {};
    // Assertions. Ideally these should be stripped out by the compiler.
    // TODO(jelbourn): Assert that there's no name binding AND a parent radio group.
    this.radioGroup = radioGroup;
    this._noopAnimations = animationMode === 'NoopAnimations';
    if (tabIndex) {
      this.tabIndex = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_2__.coerceNumberProperty)(tabIndex, 0);
    }
  }
  /** Focuses the radio button. */
  focus(options, origin) {
    if (origin) {
      this._focusMonitor.focusVia(this._inputElement, origin, options);
    } else {
      this._inputElement.nativeElement.focus(options);
    }
  }
  /**
   * Marks the radio button as needing checking for change detection.
   * This method is exposed because the parent radio group will directly
   * update bound properties of the radio button.
   */
  _markForCheck() {
    // When group value changes, the button will not be notified. Use `markForCheck` to explicit
    // update radio button's status
    this._changeDetector.markForCheck();
  }
  ngOnInit() {
    if (this.radioGroup) {
      // If the radio is inside a radio group, determine if it should be checked
      this.checked = this.radioGroup.value === this._value;
      if (this.checked) {
        this.radioGroup.selected = this;
      }
      // Copy name from parent radio group
      this.name = this.radioGroup.name;
    }
    this._removeUniqueSelectionListener = this._radioDispatcher.listen((id, name) => {
      if (id !== this.id && name === this.name) {
        this.checked = false;
      }
    });
  }
  ngDoCheck() {
    this._updateTabIndex();
  }
  ngAfterViewInit() {
    this._updateTabIndex();
    this._focusMonitor.monitor(this._elementRef, true).subscribe(focusOrigin => {
      if (!focusOrigin && this.radioGroup) {
        this.radioGroup._touch();
      }
    });
  }
  ngOnDestroy() {
    this._focusMonitor.stopMonitoring(this._elementRef);
    this._removeUniqueSelectionListener();
  }
  /** Dispatch change event with current value. */
  _emitChangeEvent() {
    this.change.emit(new MatRadioChange(this, this._value));
  }
  _isRippleDisabled() {
    return this.disableRipple || this.disabled;
  }
  _onInputClick(event) {
    // We have to stop propagation for click events on the visual hidden input element.
    // By default, when a user clicks on a label element, a generated click event will be
    // dispatched on the associated input element. Since we are using a label element as our
    // root container, the click event on the `radio-button` will be executed twice.
    // The real click event will bubble up, and the generated click event also tries to bubble up.
    // This will lead to multiple click events.
    // Preventing bubbling for the second event will solve that issue.
    event.stopPropagation();
  }
  /** Triggered when the radio button receives an interaction from the user. */
  _onInputInteraction(event) {
    // We always have to stop propagation on the change event.
    // Otherwise the change event, from the input element, will bubble up and
    // emit its event object to the `change` output.
    event.stopPropagation();
    if (!this.checked && !this.disabled) {
      const groupValueChanged = this.radioGroup && this.value !== this.radioGroup.value;
      this.checked = true;
      this._emitChangeEvent();
      if (this.radioGroup) {
        this.radioGroup._controlValueAccessorChangeFn(this.value);
        if (groupValueChanged) {
          this.radioGroup._emitChangeEvent();
        }
      }
    }
  }
  /** Triggered when the user clicks on the touch target. */
  _onTouchTargetClick(event) {
    this._onInputInteraction(event);
    if (!this.disabled) {
      // Normally the input should be focused already, but if the click
      // comes from the touch target, then we might have to focus it ourselves.
      this._inputElement.nativeElement.focus();
    }
  }
  /** Sets the disabled state and marks for check if a change occurred. */
  _setDisabled(value) {
    if (this._disabled !== value) {
      this._disabled = value;
      this._changeDetector.markForCheck();
    }
  }
  /** Gets the tabindex for the underlying input element. */
  _updateTabIndex() {
    const group = this.radioGroup;
    let value;
    // Implement a roving tabindex if the button is inside a group. For most cases this isn't
    // necessary, because the browser handles the tab order for inputs inside a group automatically,
    // but we need an explicitly higher tabindex for the selected button in order for things like
    // the focus trap to pick it up correctly.
    if (!group || !group.selected || this.disabled) {
      value = this.tabIndex;
    } else {
      value = group.selected === this ? this.tabIndex : -1;
    }
    if (value !== this._previousTabIndex) {
      // We have to set the tabindex directly on the DOM node, because it depends on
      // the selected state which is prone to "changed after checked errors".
      const input = this._inputElement?.nativeElement;
      if (input) {
        input.setAttribute('tabindex', value + '');
        this._previousTabIndex = value;
      }
    }
  }
}
_class2 = _MatRadioButtonBase;
_class2.ɵfac = function _class2_Factory(t) {
  _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinvalidFactory"]();
};
_class2.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineDirective"]({
  type: _class2,
  viewQuery: function _class2_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵviewQuery"](_c0, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵloadQuery"]()) && (ctx._inputElement = _t.first);
    }
  },
  inputs: {
    id: "id",
    name: "name",
    ariaLabel: ["aria-label", "ariaLabel"],
    ariaLabelledby: ["aria-labelledby", "ariaLabelledby"],
    ariaDescribedby: ["aria-describedby", "ariaDescribedby"],
    checked: "checked",
    value: "value",
    labelPosition: "labelPosition",
    disabled: "disabled",
    required: "required",
    color: "color"
  },
  outputs: {
    change: "change"
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵInheritDefinitionFeature"]]
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](_MatRadioButtonBase, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Directive
  }], function () {
    return [{
      type: _MatRadioGroupBase
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.ElementRef
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.ChangeDetectorRef
    }, {
      type: _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_4__.FocusMonitor
    }, {
      type: _angular_cdk_collections__WEBPACK_IMPORTED_MODULE_5__.UniqueSelectionDispatcher
    }, {
      type: undefined
    }, {
      type: undefined
    }, {
      type: undefined
    }];
  }, {
    id: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    name: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    ariaLabel: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input,
      args: ['aria-label']
    }],
    ariaLabelledby: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input,
      args: ['aria-labelledby']
    }],
    ariaDescribedby: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input,
      args: ['aria-describedby']
    }],
    checked: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    value: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    labelPosition: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    disabled: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    required: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    color: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    change: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Output
    }],
    _inputElement: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.ViewChild,
      args: ['input']
    }]
  });
})();
/**
 * A group of radio buttons. May contain one or more `<mat-radio-button>` elements.
 */
class MatRadioGroup extends _MatRadioGroupBase {}
_class3 = MatRadioGroup;
_class3.ɵfac = /* @__PURE__ */function () {
  let ɵ_class3_BaseFactory;
  return function _class3_Factory(t) {
    return (ɵ_class3_BaseFactory || (ɵ_class3_BaseFactory = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetInheritedFactory"](_class3)))(t || _class3);
  };
}();
_class3.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineDirective"]({
  type: _class3,
  selectors: [["mat-radio-group"]],
  contentQueries: function _class3_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵcontentQuery"](dirIndex, MatRadioButton, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵloadQuery"]()) && (ctx._radios = _t);
    }
  },
  hostAttrs: ["role", "radiogroup", 1, "mat-mdc-radio-group"],
  exportAs: ["matRadioGroup"],
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵProvidersFeature"]([MAT_RADIO_GROUP_CONTROL_VALUE_ACCESSOR, {
    provide: MAT_RADIO_GROUP,
    useExisting: _class3
  }]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵInheritDefinitionFeature"]]
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](MatRadioGroup, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Directive,
    args: [{
      selector: 'mat-radio-group',
      exportAs: 'matRadioGroup',
      providers: [MAT_RADIO_GROUP_CONTROL_VALUE_ACCESSOR, {
        provide: MAT_RADIO_GROUP,
        useExisting: MatRadioGroup
      }],
      host: {
        'role': 'radiogroup',
        'class': 'mat-mdc-radio-group'
      }
    }]
  }], null, {
    _radios: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.ContentChildren,
      args: [(0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.forwardRef)(() => MatRadioButton), {
        descendants: true
      }]
    }]
  });
})();
class MatRadioButton extends _MatRadioButtonBase {
  constructor(radioGroup, elementRef, _changeDetector, _focusMonitor, _radioDispatcher, animationMode, _providerOverride, tabIndex) {
    super(radioGroup, elementRef, _changeDetector, _focusMonitor, _radioDispatcher, animationMode, _providerOverride, tabIndex);
  }
}
_class4 = MatRadioButton;
_class4.ɵfac = function _class4_Factory(t) {
  return new (t || _class4)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](MAT_RADIO_GROUP, 8), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_4__.FocusMonitor), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_cdk_collections__WEBPACK_IMPORTED_MODULE_5__.UniqueSelectionDispatcher), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.ANIMATION_MODULE_TYPE, 8), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](MAT_RADIO_DEFAULT_OPTIONS, 8), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinjectAttribute"]('tabindex'));
};
_class4.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
  type: _class4,
  selectors: [["mat-radio-button"]],
  hostAttrs: [1, "mat-mdc-radio-button"],
  hostVars: 15,
  hostBindings: function _class4_HostBindings(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("focus", function _class4_focus_HostBindingHandler() {
        return ctx._inputElement.nativeElement.focus();
      });
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵattribute"]("id", ctx.id)("tabindex", null)("aria-label", null)("aria-labelledby", null)("aria-describedby", null);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassProp"]("mat-primary", ctx.color === "primary")("mat-accent", ctx.color === "accent")("mat-warn", ctx.color === "warn")("mat-mdc-radio-checked", ctx.checked)("_mat-animation-noopable", ctx._noopAnimations);
    }
  },
  inputs: {
    disableRipple: "disableRipple",
    tabIndex: "tabIndex"
  },
  exportAs: ["matRadioButton"],
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵInheritDefinitionFeature"]],
  ngContentSelectors: _c1,
  decls: 13,
  vars: 17,
  consts: [[1, "mdc-form-field"], ["formField", ""], [1, "mdc-radio"], [1, "mat-mdc-radio-touch-target", 3, "click"], ["type", "radio", 1, "mdc-radio__native-control", 3, "id", "checked", "disabled", "required", "change"], ["input", ""], [1, "mdc-radio__background"], [1, "mdc-radio__outer-circle"], [1, "mdc-radio__inner-circle"], ["mat-ripple", "", 1, "mat-radio-ripple", "mat-mdc-focus-indicator", 3, "matRippleTrigger", "matRippleDisabled", "matRippleCentered"], [1, "mat-ripple-element", "mat-radio-persistent-ripple"], [1, "mdc-label", 3, "for"]],
  template: function _class4_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵprojectionDef"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0, 1)(2, "div", 2)(3, "div", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function _class4_Template_div_click_3_listener($event) {
        return ctx._onTouchTargetClick($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "input", 4, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("change", function _class4_Template_input_change_4_listener($event) {
        return ctx._onInputInteraction($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "div", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](7, "div", 7)(8, "div", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "div", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](10, "div", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "label", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵprojection"](12);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassProp"]("mdc-form-field--align-end", ctx.labelPosition == "before");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassProp"]("mdc-radio--disabled", ctx.disabled);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("id", ctx.inputId)("checked", ctx.checked)("disabled", ctx.disabled)("required", ctx.required);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵattribute"]("name", ctx.name)("value", ctx.value)("aria-label", ctx.ariaLabel)("aria-labelledby", ctx.ariaLabelledby)("aria-describedby", ctx.ariaDescribedby);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("matRippleTrigger", _r0)("matRippleDisabled", ctx._isRippleDisabled())("matRippleCentered", true);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("for", ctx.inputId);
    }
  },
  dependencies: [_angular_material_core__WEBPACK_IMPORTED_MODULE_3__.MatRipple],
  styles: [".mdc-radio{display:inline-block;position:relative;flex:0 0 auto;box-sizing:content-box;width:20px;height:20px;cursor:pointer;will-change:opacity,transform,border-color,color}.mdc-radio[hidden]{display:none}.mdc-radio__background{display:inline-block;position:relative;box-sizing:border-box;width:20px;height:20px}.mdc-radio__background::before{position:absolute;transform:scale(0, 0);border-radius:50%;opacity:0;pointer-events:none;content:\"\";transition:opacity 120ms 0ms cubic-bezier(0.4, 0, 0.6, 1),transform 120ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-radio__outer-circle{position:absolute;top:0;left:0;box-sizing:border-box;width:100%;height:100%;border-width:2px;border-style:solid;border-radius:50%;transition:border-color 120ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-radio__inner-circle{position:absolute;top:0;left:0;box-sizing:border-box;width:100%;height:100%;transform:scale(0, 0);border-width:10px;border-style:solid;border-radius:50%;transition:transform 120ms 0ms cubic-bezier(0.4, 0, 0.6, 1),border-color 120ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-radio__native-control{position:absolute;margin:0;padding:0;opacity:0;cursor:inherit;z-index:1}.mdc-radio--touch{margin-top:4px;margin-bottom:4px;margin-right:4px;margin-left:4px}.mdc-radio--touch .mdc-radio__native-control{top:calc((40px - 48px) / 2);right:calc((40px - 48px) / 2);left:calc((40px - 48px) / 2);width:48px;height:48px}.mdc-radio.mdc-ripple-upgraded--background-focused .mdc-radio__focus-ring,.mdc-radio:not(.mdc-ripple-upgraded):focus .mdc-radio__focus-ring{pointer-events:none;border:2px solid rgba(0,0,0,0);border-radius:6px;box-sizing:content-box;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);height:100%;width:100%}@media screen and (forced-colors: active){.mdc-radio.mdc-ripple-upgraded--background-focused .mdc-radio__focus-ring,.mdc-radio:not(.mdc-ripple-upgraded):focus .mdc-radio__focus-ring{border-color:CanvasText}}.mdc-radio.mdc-ripple-upgraded--background-focused .mdc-radio__focus-ring::after,.mdc-radio:not(.mdc-ripple-upgraded):focus .mdc-radio__focus-ring::after{content:\"\";border:2px solid rgba(0,0,0,0);border-radius:8px;display:block;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);height:calc(100% + 4px);width:calc(100% + 4px)}@media screen and (forced-colors: active){.mdc-radio.mdc-ripple-upgraded--background-focused .mdc-radio__focus-ring::after,.mdc-radio:not(.mdc-ripple-upgraded):focus .mdc-radio__focus-ring::after{border-color:CanvasText}}.mdc-radio__native-control:checked+.mdc-radio__background,.mdc-radio__native-control:disabled+.mdc-radio__background{transition:opacity 120ms 0ms cubic-bezier(0, 0, 0.2, 1),transform 120ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-radio__native-control:checked+.mdc-radio__background .mdc-radio__outer-circle,.mdc-radio__native-control:disabled+.mdc-radio__background .mdc-radio__outer-circle{transition:border-color 120ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-radio__native-control:checked+.mdc-radio__background .mdc-radio__inner-circle,.mdc-radio__native-control:disabled+.mdc-radio__background .mdc-radio__inner-circle{transition:transform 120ms 0ms cubic-bezier(0, 0, 0.2, 1),border-color 120ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-radio--disabled{cursor:default;pointer-events:none}.mdc-radio__native-control:checked+.mdc-radio__background .mdc-radio__inner-circle{transform:scale(0.5);transition:transform 120ms 0ms cubic-bezier(0, 0, 0.2, 1),border-color 120ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-radio__native-control:disabled+.mdc-radio__background,[aria-disabled=true] .mdc-radio__native-control+.mdc-radio__background{cursor:default}.mdc-radio__native-control:focus+.mdc-radio__background::before{transform:scale(1);opacity:.12;transition:opacity 120ms 0ms cubic-bezier(0, 0, 0.2, 1),transform 120ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-form-field{display:inline-flex;align-items:center;vertical-align:middle}.mdc-form-field[hidden]{display:none}.mdc-form-field>label{margin-left:0;margin-right:auto;padding-left:4px;padding-right:0;order:0}[dir=rtl] .mdc-form-field>label,.mdc-form-field>label[dir=rtl]{margin-left:auto;margin-right:0}[dir=rtl] .mdc-form-field>label,.mdc-form-field>label[dir=rtl]{padding-left:0;padding-right:4px}.mdc-form-field--nowrap>label{text-overflow:ellipsis;overflow:hidden;white-space:nowrap}.mdc-form-field--align-end>label{margin-left:auto;margin-right:0;padding-left:0;padding-right:4px;order:-1}[dir=rtl] .mdc-form-field--align-end>label,.mdc-form-field--align-end>label[dir=rtl]{margin-left:0;margin-right:auto}[dir=rtl] .mdc-form-field--align-end>label,.mdc-form-field--align-end>label[dir=rtl]{padding-left:4px;padding-right:0}.mdc-form-field--space-between{justify-content:space-between}.mdc-form-field--space-between>label{margin:0}[dir=rtl] .mdc-form-field--space-between>label,.mdc-form-field--space-between>label[dir=rtl]{margin:0}.mat-mdc-radio-button{--mdc-radio-disabled-selected-icon-opacity:0.38;--mdc-radio-disabled-unselected-icon-opacity:0.38;--mdc-radio-state-layer-size:40px;-webkit-tap-highlight-color:rgba(0,0,0,0)}.mat-mdc-radio-button .mdc-radio{padding:calc((var(--mdc-radio-state-layer-size) - 20px) / 2)}.mat-mdc-radio-button .mdc-radio [aria-disabled=true] .mdc-radio__native-control:checked+.mdc-radio__background .mdc-radio__outer-circle,.mat-mdc-radio-button .mdc-radio .mdc-radio__native-control:disabled:checked+.mdc-radio__background .mdc-radio__outer-circle{border-color:var(--mdc-radio-disabled-selected-icon-color)}.mat-mdc-radio-button .mdc-radio [aria-disabled=true] .mdc-radio__native-control+.mdc-radio__background .mdc-radio__inner-circle,.mat-mdc-radio-button .mdc-radio .mdc-radio__native-control:disabled+.mdc-radio__background .mdc-radio__inner-circle{border-color:var(--mdc-radio-disabled-selected-icon-color)}.mat-mdc-radio-button .mdc-radio [aria-disabled=true] .mdc-radio__native-control:checked+.mdc-radio__background .mdc-radio__outer-circle,.mat-mdc-radio-button .mdc-radio .mdc-radio__native-control:disabled:checked+.mdc-radio__background .mdc-radio__outer-circle{opacity:var(--mdc-radio-disabled-selected-icon-opacity)}.mat-mdc-radio-button .mdc-radio [aria-disabled=true] .mdc-radio__native-control+.mdc-radio__background .mdc-radio__inner-circle,.mat-mdc-radio-button .mdc-radio .mdc-radio__native-control:disabled+.mdc-radio__background .mdc-radio__inner-circle{opacity:var(--mdc-radio-disabled-selected-icon-opacity)}.mat-mdc-radio-button .mdc-radio [aria-disabled=true] .mdc-radio__native-control:not(:checked)+.mdc-radio__background .mdc-radio__outer-circle,.mat-mdc-radio-button .mdc-radio .mdc-radio__native-control:disabled:not(:checked)+.mdc-radio__background .mdc-radio__outer-circle{border-color:var(--mdc-radio-disabled-unselected-icon-color)}.mat-mdc-radio-button .mdc-radio [aria-disabled=true] .mdc-radio__native-control:not(:checked)+.mdc-radio__background .mdc-radio__outer-circle,.mat-mdc-radio-button .mdc-radio .mdc-radio__native-control:disabled:not(:checked)+.mdc-radio__background .mdc-radio__outer-circle{opacity:var(--mdc-radio-disabled-unselected-icon-opacity)}.mat-mdc-radio-button .mdc-radio.mdc-ripple-upgraded--background-focused .mdc-radio__native-control:enabled:checked+.mdc-radio__background .mdc-radio__outer-circle,.mat-mdc-radio-button .mdc-radio:not(.mdc-ripple-upgraded):focus .mdc-radio__native-control:enabled:checked+.mdc-radio__background .mdc-radio__outer-circle{border-color:var(--mdc-radio-selected-focus-icon-color)}.mat-mdc-radio-button .mdc-radio.mdc-ripple-upgraded--background-focused .mdc-radio__native-control:enabled+.mdc-radio__background .mdc-radio__inner-circle,.mat-mdc-radio-button .mdc-radio:not(.mdc-ripple-upgraded):focus .mdc-radio__native-control:enabled+.mdc-radio__background .mdc-radio__inner-circle{border-color:var(--mdc-radio-selected-focus-icon-color)}.mat-mdc-radio-button .mdc-radio:hover .mdc-radio__native-control:enabled:checked+.mdc-radio__background .mdc-radio__outer-circle{border-color:var(--mdc-radio-selected-hover-icon-color)}.mat-mdc-radio-button .mdc-radio:hover .mdc-radio__native-control:enabled+.mdc-radio__background .mdc-radio__inner-circle{border-color:var(--mdc-radio-selected-hover-icon-color)}.mat-mdc-radio-button .mdc-radio .mdc-radio__native-control:enabled:checked+.mdc-radio__background .mdc-radio__outer-circle{border-color:var(--mdc-radio-selected-icon-color)}.mat-mdc-radio-button .mdc-radio .mdc-radio__native-control:enabled+.mdc-radio__background .mdc-radio__inner-circle{border-color:var(--mdc-radio-selected-icon-color)}.mat-mdc-radio-button .mdc-radio:not(:disabled):active .mdc-radio__native-control:enabled:checked+.mdc-radio__background .mdc-radio__outer-circle{border-color:var(--mdc-radio-selected-pressed-icon-color)}.mat-mdc-radio-button .mdc-radio:not(:disabled):active .mdc-radio__native-control:enabled+.mdc-radio__background .mdc-radio__inner-circle{border-color:var(--mdc-radio-selected-pressed-icon-color)}.mat-mdc-radio-button .mdc-radio:hover .mdc-radio__native-control:enabled:not(:checked)+.mdc-radio__background .mdc-radio__outer-circle{border-color:var(--mdc-radio-unselected-hover-icon-color)}.mat-mdc-radio-button .mdc-radio .mdc-radio__native-control:enabled:not(:checked)+.mdc-radio__background .mdc-radio__outer-circle{border-color:var(--mdc-radio-unselected-icon-color)}.mat-mdc-radio-button .mdc-radio:not(:disabled):active .mdc-radio__native-control:enabled:not(:checked)+.mdc-radio__background .mdc-radio__outer-circle{border-color:var(--mdc-radio-unselected-pressed-icon-color)}.mat-mdc-radio-button .mdc-radio .mdc-radio__background::before{top:calc(-1 * (var(--mdc-radio-state-layer-size) - 20px) / 2);left:calc(-1 * (var(--mdc-radio-state-layer-size) - 20px) / 2);width:var(--mdc-radio-state-layer-size);height:var(--mdc-radio-state-layer-size)}.mat-mdc-radio-button .mdc-radio .mdc-radio__native-control{top:calc((var(--mdc-radio-state-layer-size) - var(--mdc-radio-state-layer-size)) / 2);right:calc((var(--mdc-radio-state-layer-size) - var(--mdc-radio-state-layer-size)) / 2);left:calc((var(--mdc-radio-state-layer-size) - var(--mdc-radio-state-layer-size)) / 2);width:var(--mdc-radio-state-layer-size);height:var(--mdc-radio-state-layer-size)}.mat-mdc-radio-button .mdc-radio .mdc-radio__background::before{background-color:var(--mat-radio-ripple-color)}.mat-mdc-radio-button .mdc-radio:hover .mdc-radio__native-control:not([disabled]):not(:focus)~.mdc-radio__background::before{opacity:.04;transform:scale(1)}.mat-mdc-radio-button.mat-mdc-radio-checked .mdc-radio__background::before{background-color:var(--mat-radio-checked-ripple-color)}.mat-mdc-radio-button.mat-mdc-radio-checked .mat-ripple-element{background-color:var(--mat-radio-checked-ripple-color)}.mat-mdc-radio-button .mdc-radio--disabled+label{color:var(--mat-radio-disabled-label-color)}.mat-mdc-radio-button .mat-radio-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:50%}.mat-mdc-radio-button .mat-radio-ripple .mat-ripple-element{opacity:.14}.mat-mdc-radio-button .mat-radio-ripple::before{border-radius:50%}.mat-mdc-radio-button._mat-animation-noopable .mdc-radio__background::before,.mat-mdc-radio-button._mat-animation-noopable .mdc-radio__outer-circle,.mat-mdc-radio-button._mat-animation-noopable .mdc-radio__inner-circle{transition:none !important}.mat-mdc-radio-button .mdc-radio .mdc-radio__native-control:focus:enabled:not(:checked)~.mdc-radio__background .mdc-radio__outer-circle{border-color:var(--mdc-radio-unselected-focus-icon-color, black)}.mat-mdc-radio-button.cdk-focused .mat-mdc-focus-indicator::before{content:\"\"}.mat-mdc-radio-touch-target{position:absolute;top:50%;height:48px;left:50%;width:48px;transform:translate(-50%, -50%)}[dir=rtl] .mat-mdc-radio-touch-target{left:0;right:50%;transform:translate(50%, -50%)}"],
  encapsulation: 2,
  changeDetection: 0
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](MatRadioButton, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Component,
    args: [{
      selector: 'mat-radio-button',
      host: {
        'class': 'mat-mdc-radio-button',
        '[attr.id]': 'id',
        '[class.mat-primary]': 'color === "primary"',
        '[class.mat-accent]': 'color === "accent"',
        '[class.mat-warn]': 'color === "warn"',
        '[class.mat-mdc-radio-checked]': 'checked',
        '[class._mat-animation-noopable]': '_noopAnimations',
        // Needs to be removed since it causes some a11y issues (see #21266).
        '[attr.tabindex]': 'null',
        '[attr.aria-label]': 'null',
        '[attr.aria-labelledby]': 'null',
        '[attr.aria-describedby]': 'null',
        // Note: under normal conditions focus shouldn't land on this element, however it may be
        // programmatically set, for example inside of a focus trap, in this case we want to forward
        // the focus to the native element.
        '(focus)': '_inputElement.nativeElement.focus()'
      },
      inputs: ['disableRipple', 'tabIndex'],
      exportAs: 'matRadioButton',
      encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_1__.ViewEncapsulation.None,
      changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_1__.ChangeDetectionStrategy.OnPush,
      template: "<div class=\"mdc-form-field\" #formField\n     [class.mdc-form-field--align-end]=\"labelPosition == 'before'\">\n  <div class=\"mdc-radio\" [class.mdc-radio--disabled]=\"disabled\">\n    <!-- Render this element first so the input is on top. -->\n    <div class=\"mat-mdc-radio-touch-target\" (click)=\"_onTouchTargetClick($event)\"></div>\n    <input #input class=\"mdc-radio__native-control\" type=\"radio\"\n           [id]=\"inputId\"\n           [checked]=\"checked\"\n           [disabled]=\"disabled\"\n           [attr.name]=\"name\"\n           [attr.value]=\"value\"\n           [required]=\"required\"\n           [attr.aria-label]=\"ariaLabel\"\n           [attr.aria-labelledby]=\"ariaLabelledby\"\n           [attr.aria-describedby]=\"ariaDescribedby\"\n           (change)=\"_onInputInteraction($event)\">\n    <div class=\"mdc-radio__background\">\n      <div class=\"mdc-radio__outer-circle\"></div>\n      <div class=\"mdc-radio__inner-circle\"></div>\n    </div>\n    <div mat-ripple class=\"mat-radio-ripple mat-mdc-focus-indicator\"\n         [matRippleTrigger]=\"formField\"\n         [matRippleDisabled]=\"_isRippleDisabled()\"\n         [matRippleCentered]=\"true\">\n      <div class=\"mat-ripple-element mat-radio-persistent-ripple\"></div>\n    </div>\n  </div>\n  <label class=\"mdc-label\" [for]=\"inputId\">\n    <ng-content></ng-content>\n  </label>\n</div>\n",
      styles: [".mdc-radio{display:inline-block;position:relative;flex:0 0 auto;box-sizing:content-box;width:20px;height:20px;cursor:pointer;will-change:opacity,transform,border-color,color}.mdc-radio[hidden]{display:none}.mdc-radio__background{display:inline-block;position:relative;box-sizing:border-box;width:20px;height:20px}.mdc-radio__background::before{position:absolute;transform:scale(0, 0);border-radius:50%;opacity:0;pointer-events:none;content:\"\";transition:opacity 120ms 0ms cubic-bezier(0.4, 0, 0.6, 1),transform 120ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-radio__outer-circle{position:absolute;top:0;left:0;box-sizing:border-box;width:100%;height:100%;border-width:2px;border-style:solid;border-radius:50%;transition:border-color 120ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-radio__inner-circle{position:absolute;top:0;left:0;box-sizing:border-box;width:100%;height:100%;transform:scale(0, 0);border-width:10px;border-style:solid;border-radius:50%;transition:transform 120ms 0ms cubic-bezier(0.4, 0, 0.6, 1),border-color 120ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-radio__native-control{position:absolute;margin:0;padding:0;opacity:0;cursor:inherit;z-index:1}.mdc-radio--touch{margin-top:4px;margin-bottom:4px;margin-right:4px;margin-left:4px}.mdc-radio--touch .mdc-radio__native-control{top:calc((40px - 48px) / 2);right:calc((40px - 48px) / 2);left:calc((40px - 48px) / 2);width:48px;height:48px}.mdc-radio.mdc-ripple-upgraded--background-focused .mdc-radio__focus-ring,.mdc-radio:not(.mdc-ripple-upgraded):focus .mdc-radio__focus-ring{pointer-events:none;border:2px solid rgba(0,0,0,0);border-radius:6px;box-sizing:content-box;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);height:100%;width:100%}@media screen and (forced-colors: active){.mdc-radio.mdc-ripple-upgraded--background-focused .mdc-radio__focus-ring,.mdc-radio:not(.mdc-ripple-upgraded):focus .mdc-radio__focus-ring{border-color:CanvasText}}.mdc-radio.mdc-ripple-upgraded--background-focused .mdc-radio__focus-ring::after,.mdc-radio:not(.mdc-ripple-upgraded):focus .mdc-radio__focus-ring::after{content:\"\";border:2px solid rgba(0,0,0,0);border-radius:8px;display:block;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);height:calc(100% + 4px);width:calc(100% + 4px)}@media screen and (forced-colors: active){.mdc-radio.mdc-ripple-upgraded--background-focused .mdc-radio__focus-ring::after,.mdc-radio:not(.mdc-ripple-upgraded):focus .mdc-radio__focus-ring::after{border-color:CanvasText}}.mdc-radio__native-control:checked+.mdc-radio__background,.mdc-radio__native-control:disabled+.mdc-radio__background{transition:opacity 120ms 0ms cubic-bezier(0, 0, 0.2, 1),transform 120ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-radio__native-control:checked+.mdc-radio__background .mdc-radio__outer-circle,.mdc-radio__native-control:disabled+.mdc-radio__background .mdc-radio__outer-circle{transition:border-color 120ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-radio__native-control:checked+.mdc-radio__background .mdc-radio__inner-circle,.mdc-radio__native-control:disabled+.mdc-radio__background .mdc-radio__inner-circle{transition:transform 120ms 0ms cubic-bezier(0, 0, 0.2, 1),border-color 120ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-radio--disabled{cursor:default;pointer-events:none}.mdc-radio__native-control:checked+.mdc-radio__background .mdc-radio__inner-circle{transform:scale(0.5);transition:transform 120ms 0ms cubic-bezier(0, 0, 0.2, 1),border-color 120ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-radio__native-control:disabled+.mdc-radio__background,[aria-disabled=true] .mdc-radio__native-control+.mdc-radio__background{cursor:default}.mdc-radio__native-control:focus+.mdc-radio__background::before{transform:scale(1);opacity:.12;transition:opacity 120ms 0ms cubic-bezier(0, 0, 0.2, 1),transform 120ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-form-field{display:inline-flex;align-items:center;vertical-align:middle}.mdc-form-field[hidden]{display:none}.mdc-form-field>label{margin-left:0;margin-right:auto;padding-left:4px;padding-right:0;order:0}[dir=rtl] .mdc-form-field>label,.mdc-form-field>label[dir=rtl]{margin-left:auto;margin-right:0}[dir=rtl] .mdc-form-field>label,.mdc-form-field>label[dir=rtl]{padding-left:0;padding-right:4px}.mdc-form-field--nowrap>label{text-overflow:ellipsis;overflow:hidden;white-space:nowrap}.mdc-form-field--align-end>label{margin-left:auto;margin-right:0;padding-left:0;padding-right:4px;order:-1}[dir=rtl] .mdc-form-field--align-end>label,.mdc-form-field--align-end>label[dir=rtl]{margin-left:0;margin-right:auto}[dir=rtl] .mdc-form-field--align-end>label,.mdc-form-field--align-end>label[dir=rtl]{padding-left:4px;padding-right:0}.mdc-form-field--space-between{justify-content:space-between}.mdc-form-field--space-between>label{margin:0}[dir=rtl] .mdc-form-field--space-between>label,.mdc-form-field--space-between>label[dir=rtl]{margin:0}.mat-mdc-radio-button{--mdc-radio-disabled-selected-icon-opacity:0.38;--mdc-radio-disabled-unselected-icon-opacity:0.38;--mdc-radio-state-layer-size:40px;-webkit-tap-highlight-color:rgba(0,0,0,0)}.mat-mdc-radio-button .mdc-radio{padding:calc((var(--mdc-radio-state-layer-size) - 20px) / 2)}.mat-mdc-radio-button .mdc-radio [aria-disabled=true] .mdc-radio__native-control:checked+.mdc-radio__background .mdc-radio__outer-circle,.mat-mdc-radio-button .mdc-radio .mdc-radio__native-control:disabled:checked+.mdc-radio__background .mdc-radio__outer-circle{border-color:var(--mdc-radio-disabled-selected-icon-color)}.mat-mdc-radio-button .mdc-radio [aria-disabled=true] .mdc-radio__native-control+.mdc-radio__background .mdc-radio__inner-circle,.mat-mdc-radio-button .mdc-radio .mdc-radio__native-control:disabled+.mdc-radio__background .mdc-radio__inner-circle{border-color:var(--mdc-radio-disabled-selected-icon-color)}.mat-mdc-radio-button .mdc-radio [aria-disabled=true] .mdc-radio__native-control:checked+.mdc-radio__background .mdc-radio__outer-circle,.mat-mdc-radio-button .mdc-radio .mdc-radio__native-control:disabled:checked+.mdc-radio__background .mdc-radio__outer-circle{opacity:var(--mdc-radio-disabled-selected-icon-opacity)}.mat-mdc-radio-button .mdc-radio [aria-disabled=true] .mdc-radio__native-control+.mdc-radio__background .mdc-radio__inner-circle,.mat-mdc-radio-button .mdc-radio .mdc-radio__native-control:disabled+.mdc-radio__background .mdc-radio__inner-circle{opacity:var(--mdc-radio-disabled-selected-icon-opacity)}.mat-mdc-radio-button .mdc-radio [aria-disabled=true] .mdc-radio__native-control:not(:checked)+.mdc-radio__background .mdc-radio__outer-circle,.mat-mdc-radio-button .mdc-radio .mdc-radio__native-control:disabled:not(:checked)+.mdc-radio__background .mdc-radio__outer-circle{border-color:var(--mdc-radio-disabled-unselected-icon-color)}.mat-mdc-radio-button .mdc-radio [aria-disabled=true] .mdc-radio__native-control:not(:checked)+.mdc-radio__background .mdc-radio__outer-circle,.mat-mdc-radio-button .mdc-radio .mdc-radio__native-control:disabled:not(:checked)+.mdc-radio__background .mdc-radio__outer-circle{opacity:var(--mdc-radio-disabled-unselected-icon-opacity)}.mat-mdc-radio-button .mdc-radio.mdc-ripple-upgraded--background-focused .mdc-radio__native-control:enabled:checked+.mdc-radio__background .mdc-radio__outer-circle,.mat-mdc-radio-button .mdc-radio:not(.mdc-ripple-upgraded):focus .mdc-radio__native-control:enabled:checked+.mdc-radio__background .mdc-radio__outer-circle{border-color:var(--mdc-radio-selected-focus-icon-color)}.mat-mdc-radio-button .mdc-radio.mdc-ripple-upgraded--background-focused .mdc-radio__native-control:enabled+.mdc-radio__background .mdc-radio__inner-circle,.mat-mdc-radio-button .mdc-radio:not(.mdc-ripple-upgraded):focus .mdc-radio__native-control:enabled+.mdc-radio__background .mdc-radio__inner-circle{border-color:var(--mdc-radio-selected-focus-icon-color)}.mat-mdc-radio-button .mdc-radio:hover .mdc-radio__native-control:enabled:checked+.mdc-radio__background .mdc-radio__outer-circle{border-color:var(--mdc-radio-selected-hover-icon-color)}.mat-mdc-radio-button .mdc-radio:hover .mdc-radio__native-control:enabled+.mdc-radio__background .mdc-radio__inner-circle{border-color:var(--mdc-radio-selected-hover-icon-color)}.mat-mdc-radio-button .mdc-radio .mdc-radio__native-control:enabled:checked+.mdc-radio__background .mdc-radio__outer-circle{border-color:var(--mdc-radio-selected-icon-color)}.mat-mdc-radio-button .mdc-radio .mdc-radio__native-control:enabled+.mdc-radio__background .mdc-radio__inner-circle{border-color:var(--mdc-radio-selected-icon-color)}.mat-mdc-radio-button .mdc-radio:not(:disabled):active .mdc-radio__native-control:enabled:checked+.mdc-radio__background .mdc-radio__outer-circle{border-color:var(--mdc-radio-selected-pressed-icon-color)}.mat-mdc-radio-button .mdc-radio:not(:disabled):active .mdc-radio__native-control:enabled+.mdc-radio__background .mdc-radio__inner-circle{border-color:var(--mdc-radio-selected-pressed-icon-color)}.mat-mdc-radio-button .mdc-radio:hover .mdc-radio__native-control:enabled:not(:checked)+.mdc-radio__background .mdc-radio__outer-circle{border-color:var(--mdc-radio-unselected-hover-icon-color)}.mat-mdc-radio-button .mdc-radio .mdc-radio__native-control:enabled:not(:checked)+.mdc-radio__background .mdc-radio__outer-circle{border-color:var(--mdc-radio-unselected-icon-color)}.mat-mdc-radio-button .mdc-radio:not(:disabled):active .mdc-radio__native-control:enabled:not(:checked)+.mdc-radio__background .mdc-radio__outer-circle{border-color:var(--mdc-radio-unselected-pressed-icon-color)}.mat-mdc-radio-button .mdc-radio .mdc-radio__background::before{top:calc(-1 * (var(--mdc-radio-state-layer-size) - 20px) / 2);left:calc(-1 * (var(--mdc-radio-state-layer-size) - 20px) / 2);width:var(--mdc-radio-state-layer-size);height:var(--mdc-radio-state-layer-size)}.mat-mdc-radio-button .mdc-radio .mdc-radio__native-control{top:calc((var(--mdc-radio-state-layer-size) - var(--mdc-radio-state-layer-size)) / 2);right:calc((var(--mdc-radio-state-layer-size) - var(--mdc-radio-state-layer-size)) / 2);left:calc((var(--mdc-radio-state-layer-size) - var(--mdc-radio-state-layer-size)) / 2);width:var(--mdc-radio-state-layer-size);height:var(--mdc-radio-state-layer-size)}.mat-mdc-radio-button .mdc-radio .mdc-radio__background::before{background-color:var(--mat-radio-ripple-color)}.mat-mdc-radio-button .mdc-radio:hover .mdc-radio__native-control:not([disabled]):not(:focus)~.mdc-radio__background::before{opacity:.04;transform:scale(1)}.mat-mdc-radio-button.mat-mdc-radio-checked .mdc-radio__background::before{background-color:var(--mat-radio-checked-ripple-color)}.mat-mdc-radio-button.mat-mdc-radio-checked .mat-ripple-element{background-color:var(--mat-radio-checked-ripple-color)}.mat-mdc-radio-button .mdc-radio--disabled+label{color:var(--mat-radio-disabled-label-color)}.mat-mdc-radio-button .mat-radio-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:50%}.mat-mdc-radio-button .mat-radio-ripple .mat-ripple-element{opacity:.14}.mat-mdc-radio-button .mat-radio-ripple::before{border-radius:50%}.mat-mdc-radio-button._mat-animation-noopable .mdc-radio__background::before,.mat-mdc-radio-button._mat-animation-noopable .mdc-radio__outer-circle,.mat-mdc-radio-button._mat-animation-noopable .mdc-radio__inner-circle{transition:none !important}.mat-mdc-radio-button .mdc-radio .mdc-radio__native-control:focus:enabled:not(:checked)~.mdc-radio__background .mdc-radio__outer-circle{border-color:var(--mdc-radio-unselected-focus-icon-color, black)}.mat-mdc-radio-button.cdk-focused .mat-mdc-focus-indicator::before{content:\"\"}.mat-mdc-radio-touch-target{position:absolute;top:50%;height:48px;left:50%;width:48px;transform:translate(-50%, -50%)}[dir=rtl] .mat-mdc-radio-touch-target{left:0;right:50%;transform:translate(50%, -50%)}"]
    }]
  }], function () {
    return [{
      type: MatRadioGroup,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Optional
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Inject,
        args: [MAT_RADIO_GROUP]
      }]
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.ElementRef
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.ChangeDetectorRef
    }, {
      type: _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_4__.FocusMonitor
    }, {
      type: _angular_cdk_collections__WEBPACK_IMPORTED_MODULE_5__.UniqueSelectionDispatcher
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Optional
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Inject,
        args: [_angular_core__WEBPACK_IMPORTED_MODULE_1__.ANIMATION_MODULE_TYPE]
      }]
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Optional
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Inject,
        args: [MAT_RADIO_DEFAULT_OPTIONS]
      }]
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Attribute,
        args: ['tabindex']
      }]
    }];
  }, null);
})();
class MatRadioModule {}
_class5 = MatRadioModule;
_class5.ɵfac = function _class5_Factory(t) {
  return new (t || _class5)();
};
_class5.ɵmod = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
  type: _class5
});
_class5.ɵinj = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
  imports: [_angular_material_core__WEBPACK_IMPORTED_MODULE_3__.MatCommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_6__.CommonModule, _angular_material_core__WEBPACK_IMPORTED_MODULE_3__.MatRippleModule, _angular_material_core__WEBPACK_IMPORTED_MODULE_3__.MatCommonModule]
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](MatRadioModule, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.NgModule,
    args: [{
      imports: [_angular_material_core__WEBPACK_IMPORTED_MODULE_3__.MatCommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_6__.CommonModule, _angular_material_core__WEBPACK_IMPORTED_MODULE_3__.MatRippleModule],
      exports: [_angular_material_core__WEBPACK_IMPORTED_MODULE_3__.MatCommonModule, MatRadioGroup, MatRadioButton],
      declarations: [MatRadioGroup, MatRadioButton]
    }]
  }], null, null);
})();

/**
 * Generated bundle index. Do not edit.
 */



/***/ }),

/***/ 989:
/*!**********************************************************!*\
  !*** ./node_modules/@angular/material/fesm2022/tabs.mjs ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MAT_TAB: () => (/* binding */ MAT_TAB),
/* harmony export */   MAT_TABS_CONFIG: () => (/* binding */ MAT_TABS_CONFIG),
/* harmony export */   MAT_TAB_CONTENT: () => (/* binding */ MAT_TAB_CONTENT),
/* harmony export */   MAT_TAB_GROUP: () => (/* binding */ MAT_TAB_GROUP),
/* harmony export */   MAT_TAB_LABEL: () => (/* binding */ MAT_TAB_LABEL),
/* harmony export */   MatInkBar: () => (/* binding */ MatInkBar),
/* harmony export */   MatPaginatedTabHeader: () => (/* binding */ MatPaginatedTabHeader),
/* harmony export */   MatTab: () => (/* binding */ MatTab),
/* harmony export */   MatTabBody: () => (/* binding */ MatTabBody),
/* harmony export */   MatTabBodyPortal: () => (/* binding */ MatTabBodyPortal),
/* harmony export */   MatTabChangeEvent: () => (/* binding */ MatTabChangeEvent),
/* harmony export */   MatTabContent: () => (/* binding */ MatTabContent),
/* harmony export */   MatTabGroup: () => (/* binding */ MatTabGroup),
/* harmony export */   MatTabHeader: () => (/* binding */ MatTabHeader),
/* harmony export */   MatTabLabel: () => (/* binding */ MatTabLabel),
/* harmony export */   MatTabLabelWrapper: () => (/* binding */ MatTabLabelWrapper),
/* harmony export */   MatTabLink: () => (/* binding */ MatTabLink),
/* harmony export */   MatTabNav: () => (/* binding */ MatTabNav),
/* harmony export */   MatTabNavPanel: () => (/* binding */ MatTabNavPanel),
/* harmony export */   MatTabsModule: () => (/* binding */ MatTabsModule),
/* harmony export */   _MAT_INK_BAR_POSITIONER: () => (/* binding */ _MAT_INK_BAR_POSITIONER),
/* harmony export */   _MAT_INK_BAR_POSITIONER_FACTORY: () => (/* binding */ _MAT_INK_BAR_POSITIONER_FACTORY),
/* harmony export */   _MatTabBase: () => (/* binding */ _MatTabBase),
/* harmony export */   _MatTabBodyBase: () => (/* binding */ _MatTabBodyBase),
/* harmony export */   _MatTabGroupBase: () => (/* binding */ _MatTabGroupBase),
/* harmony export */   _MatTabHeaderBase: () => (/* binding */ _MatTabHeaderBase),
/* harmony export */   _MatTabLabelWrapperBase: () => (/* binding */ _MatTabLabelWrapperBase),
/* harmony export */   _MatTabLinkBase: () => (/* binding */ _MatTabLinkBase),
/* harmony export */   _MatTabNavBase: () => (/* binding */ _MatTabNavBase),
/* harmony export */   matTabsAnimations: () => (/* binding */ matTabsAnimations)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser/animations */ 1699);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/core */ 5309);
/* harmony import */ var _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/cdk/portal */ 3517);
/* harmony import */ var _angular_cdk_observers__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @angular/cdk/observers */ 6787);
/* harmony import */ var _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/cdk/a11y */ 3170);
/* harmony import */ var _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/cdk/bidi */ 4565);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 1523);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 2513);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! rxjs */ 9016);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! rxjs */ 4980);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! rxjs */ 7835);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! rxjs */ 6290);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! rxjs */ 2235);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! rxjs */ 9378);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! rxjs */ 8071);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ 5043);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs/operators */ 3317);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! rxjs/operators */ 274);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! rxjs/operators */ 1527);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! rxjs/operators */ 1891);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! rxjs/operators */ 5357);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! rxjs/operators */ 4520);
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/animations */ 2501);
/* harmony import */ var _angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/cdk/coercion */ 5998);
/* harmony import */ var _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @angular/cdk/scrolling */ 275);
/* harmony import */ var _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/cdk/platform */ 3274);
/* harmony import */ var _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @angular/cdk/keycodes */ 554);
var _class, _class2, _class3, _class4, _class5, _class6, _class7, _class8, _class9, _class10, _class11, _class12, _class13, _class14, _class15, _class16, _class17, _class18, _class19, _class20;























/**
 * Animations used by the Material tabs.
 * @docs-private
 */
function _class3_ng_template_2_Template(rf, ctx) {}
const _c0 = function (a0) {
  return {
    animationDuration: a0
  };
};
const _c1 = function (a0, a1) {
  return {
    value: a0,
    params: a1
  };
};
function _class9_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](0);
  }
}
const _c2 = ["*"];
const _c3 = ["tabListContainer"];
const _c4 = ["tabList"];
const _c5 = ["tabListInner"];
const _c6 = ["nextPaginator"];
const _c7 = ["previousPaginator"];
const _c8 = ["tabBodyWrapper"];
const _c9 = ["tabHeader"];
function _class14_div_2_ng_template_6_ng_template_0_Template(rf, ctx) {}
function _class14_div_2_ng_template_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, _class14_div_2_ng_template_6_ng_template_0_Template, 0, 0, "ng-template", 14);
  }
  if (rf & 2) {
    const tab_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("cdkPortalOutlet", tab_r4.templateLabel);
  }
}
function _class14_div_2_ng_template_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](0);
  }
  if (rf & 2) {
    const tab_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](tab_r4.textLabel);
  }
}
function _class14_div_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 6, 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function _class14_div_2_Template_div_click_0_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r14);
      const tab_r4 = restoredCtx.$implicit;
      const i_r5 = restoredCtx.index;
      const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](1);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r13._handleClick(tab_r4, _r0, i_r5));
    })("cdkFocusChange", function _class14_div_2_Template_div_cdkFocusChange_0_listener($event) {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r14);
      const i_r5 = restoredCtx.index;
      const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r15._tabFocusChanged($event, i_r5));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "span", 8)(3, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "span", 10)(5, "span", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](6, _class14_div_2_ng_template_6_Template, 1, 1, "ng-template", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](7, _class14_div_2_ng_template_7_Template, 1, 1, "ng-template", null, 13, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const tab_r4 = ctx.$implicit;
    const i_r5 = ctx.index;
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](1);
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](8);
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("mdc-tab--active", ctx_r1.selectedIndex === i_r5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("id", ctx_r1._getTabLabelId(i_r5))("ngClass", tab_r4.labelClass)("disabled", tab_r4.disabled)("fitInkBarToContent", ctx_r1.fitInkBarToContent);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattribute"]("tabIndex", ctx_r1._getTabIndex(i_r5))("aria-posinset", i_r5 + 1)("aria-setsize", ctx_r1._tabs.length)("aria-controls", ctx_r1._getTabContentId(i_r5))("aria-selected", ctx_r1.selectedIndex === i_r5)("aria-label", tab_r4.ariaLabel || null)("aria-labelledby", !tab_r4.ariaLabel && tab_r4.ariaLabelledby ? tab_r4.ariaLabelledby : null);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("matRippleTrigger", _r6)("matRippleDisabled", tab_r4.disabled || ctx_r1.disableRipple);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", tab_r4.templateLabel)("ngIfElse", _r8);
  }
}
function _class14_mat_tab_body_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-tab-body", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("_onCentered", function _class14_mat_tab_body_5_Template_mat_tab_body__onCentered_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r19);
      const ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r18._removeTabBodyWrapperHeight());
    })("_onCentering", function _class14_mat_tab_body_5_Template_mat_tab_body__onCentering_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r19);
      const ctx_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r20._setTabBodyWrapperHeight($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const tab_r16 = ctx.$implicit;
    const i_r17 = ctx.index;
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("mat-mdc-tab-body-active", ctx_r3.selectedIndex === i_r17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("id", ctx_r3._getTabContentId(i_r17))("ngClass", tab_r16.bodyClass)("content", tab_r16.content)("position", tab_r16.position)("origin", tab_r16.origin)("animationDuration", ctx_r3.animationDuration)("preserveContent", ctx_r3.preserveContent);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattribute"]("tabindex", ctx_r3.contentTabIndex != null && ctx_r3.selectedIndex === i_r17 ? ctx_r3.contentTabIndex : null)("aria-labelledby", ctx_r3._getTabLabelId(i_r17));
  }
}
const _c10 = ["mat-tab-nav-bar", ""];
const _c11 = ["mat-tab-link", ""];
const matTabsAnimations = {
  /** Animation translates a tab along the X axis. */
  translateTab: (0,_angular_animations__WEBPACK_IMPORTED_MODULE_1__.trigger)('translateTab', [
  // Transitions to `none` instead of 0, because some browsers might blur the content.
  (0,_angular_animations__WEBPACK_IMPORTED_MODULE_1__.state)('center, void, left-origin-center, right-origin-center', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_1__.style)({
    transform: 'none'
  })),
  // If the tab is either on the left or right, we additionally add a `min-height` of 1px
  // in order to ensure that the element has a height before its state changes. This is
  // necessary because Chrome does seem to skip the transition in RTL mode if the element does
  // not have a static height and is not rendered. See related issue: #9465
  (0,_angular_animations__WEBPACK_IMPORTED_MODULE_1__.state)('left', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_1__.style)({
    transform: 'translate3d(-100%, 0, 0)',
    minHeight: '1px',
    // Normally this is redundant since we detach the content from the DOM, but if the user
    // opted into keeping the content in the DOM, we have to hide it so it isn't focusable.
    visibility: 'hidden'
  })), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_1__.state)('right', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_1__.style)({
    transform: 'translate3d(100%, 0, 0)',
    minHeight: '1px',
    visibility: 'hidden'
  })), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_1__.transition)('* => left, * => right, left => center, right => center', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_1__.animate)('{{animationDuration}} cubic-bezier(0.35, 0, 0.25, 1)')), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_1__.transition)('void => left-origin-center', [(0,_angular_animations__WEBPACK_IMPORTED_MODULE_1__.style)({
    transform: 'translate3d(-100%, 0, 0)',
    visibility: 'hidden'
  }), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_1__.animate)('{{animationDuration}} cubic-bezier(0.35, 0, 0.25, 1)')]), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_1__.transition)('void => right-origin-center', [(0,_angular_animations__WEBPACK_IMPORTED_MODULE_1__.style)({
    transform: 'translate3d(100%, 0, 0)',
    visibility: 'hidden'
  }), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_1__.animate)('{{animationDuration}} cubic-bezier(0.35, 0, 0.25, 1)')])])
};

/**
 * The portal host directive for the contents of the tab.
 * @docs-private
 */
class MatTabBodyPortal extends _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_2__.CdkPortalOutlet {
  constructor(componentFactoryResolver, viewContainerRef, _host, _document) {
    super(componentFactoryResolver, viewContainerRef, _document);
    this._host = _host;
    /** Subscription to events for when the tab body begins centering. */
    this._centeringSub = rxjs__WEBPACK_IMPORTED_MODULE_3__.Subscription.EMPTY;
    /** Subscription to events for when the tab body finishes leaving from center position. */
    this._leavingSub = rxjs__WEBPACK_IMPORTED_MODULE_3__.Subscription.EMPTY;
  }
  /** Set initial visibility or set up subscription for changing visibility. */
  ngOnInit() {
    super.ngOnInit();
    this._centeringSub = this._host._beforeCentering.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.startWith)(this._host._isCenterPosition(this._host._position))).subscribe(isCentering => {
      if (isCentering && !this.hasAttached()) {
        this.attach(this._host._content);
      }
    });
    this._leavingSub = this._host._afterLeavingCenter.subscribe(() => {
      if (!this._host.preserveContent) {
        this.detach();
      }
    });
  }
  /** Clean up centering subscription. */
  ngOnDestroy() {
    super.ngOnDestroy();
    this._centeringSub.unsubscribe();
    this._leavingSub.unsubscribe();
  }
}
_class = MatTabBodyPortal;
_class.ɵfac = function _class_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ComponentFactoryResolver), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewContainerRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"]((0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(() => MatTabBody)), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_5__.DOCUMENT));
};
_class.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
  type: _class,
  selectors: [["", "matTabBodyHost", ""]],
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]]
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MatTabBodyPortal, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Directive,
    args: [{
      selector: '[matTabBodyHost]'
    }]
  }], function () {
    return [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ComponentFactoryResolver
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewContainerRef
    }, {
      type: MatTabBody,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Inject,
        args: [(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(() => MatTabBody)]
      }]
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Inject,
        args: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.DOCUMENT]
      }]
    }];
  }, null);
})();
/**
 * Base class with all of the `MatTabBody` functionality.
 * @docs-private
 */
class _MatTabBodyBase {
  /** The shifted index position of the tab body, where zero represents the active center tab. */
  set position(position) {
    this._positionIndex = position;
    this._computePositionAnimationState();
  }
  constructor(_elementRef, _dir, changeDetectorRef) {
    this._elementRef = _elementRef;
    this._dir = _dir;
    /** Subscription to the directionality change observable. */
    this._dirChangeSubscription = rxjs__WEBPACK_IMPORTED_MODULE_3__.Subscription.EMPTY;
    /** Emits when an animation on the tab is complete. */
    this._translateTabComplete = new rxjs__WEBPACK_IMPORTED_MODULE_6__.Subject();
    /** Event emitted when the tab begins to animate towards the center as the active tab. */
    this._onCentering = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    /** Event emitted before the centering of the tab begins. */
    this._beforeCentering = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    /** Event emitted before the centering of the tab begins. */
    this._afterLeavingCenter = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    /** Event emitted when the tab completes its animation towards the center. */
    this._onCentered = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter(true);
    // Note that the default value will always be overwritten by `MatTabBody`, but we need one
    // anyway to prevent the animations module from throwing an error if the body is used on its own.
    /** Duration for the tab's animation. */
    this.animationDuration = '500ms';
    /** Whether the tab's content should be kept in the DOM while it's off-screen. */
    this.preserveContent = false;
    if (_dir) {
      this._dirChangeSubscription = _dir.change.subscribe(dir => {
        this._computePositionAnimationState(dir);
        changeDetectorRef.markForCheck();
      });
    }
    // Ensure that we get unique animation events, because the `.done` callback can get
    // invoked twice in some browsers. See https://github.com/angular/angular/issues/24084.
    this._translateTabComplete.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.distinctUntilChanged)((x, y) => {
      return x.fromState === y.fromState && x.toState === y.toState;
    })).subscribe(event => {
      // If the transition to the center is complete, emit an event.
      if (this._isCenterPosition(event.toState) && this._isCenterPosition(this._position)) {
        this._onCentered.emit();
      }
      if (this._isCenterPosition(event.fromState) && !this._isCenterPosition(this._position)) {
        this._afterLeavingCenter.emit();
      }
    });
  }
  /**
   * After initialized, check if the content is centered and has an origin. If so, set the
   * special position states that transition the tab from the left or right before centering.
   */
  ngOnInit() {
    if (this._position == 'center' && this.origin != null) {
      this._position = this._computePositionFromOrigin(this.origin);
    }
  }
  ngOnDestroy() {
    this._dirChangeSubscription.unsubscribe();
    this._translateTabComplete.complete();
  }
  _onTranslateTabStarted(event) {
    const isCentering = this._isCenterPosition(event.toState);
    this._beforeCentering.emit(isCentering);
    if (isCentering) {
      this._onCentering.emit(this._elementRef.nativeElement.clientHeight);
    }
  }
  /** The text direction of the containing app. */
  _getLayoutDirection() {
    return this._dir && this._dir.value === 'rtl' ? 'rtl' : 'ltr';
  }
  /** Whether the provided position state is considered center, regardless of origin. */
  _isCenterPosition(position) {
    return position == 'center' || position == 'left-origin-center' || position == 'right-origin-center';
  }
  /** Computes the position state that will be used for the tab-body animation trigger. */
  _computePositionAnimationState(dir = this._getLayoutDirection()) {
    if (this._positionIndex < 0) {
      this._position = dir == 'ltr' ? 'left' : 'right';
    } else if (this._positionIndex > 0) {
      this._position = dir == 'ltr' ? 'right' : 'left';
    } else {
      this._position = 'center';
    }
  }
  /**
   * Computes the position state based on the specified origin position. This is used if the
   * tab is becoming visible immediately after creation.
   */
  _computePositionFromOrigin(origin) {
    const dir = this._getLayoutDirection();
    if (dir == 'ltr' && origin <= 0 || dir == 'rtl' && origin > 0) {
      return 'left-origin-center';
    }
    return 'right-origin-center';
  }
}
_class2 = _MatTabBodyBase;
_class2.ɵfac = function _class2_Factory(t) {
  return new (t || _class2)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_8__.Directionality, 8), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectorRef));
};
_class2.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
  type: _class2,
  inputs: {
    _content: ["content", "_content"],
    origin: "origin",
    animationDuration: "animationDuration",
    preserveContent: "preserveContent",
    position: "position"
  },
  outputs: {
    _onCentering: "_onCentering",
    _beforeCentering: "_beforeCentering",
    _afterLeavingCenter: "_afterLeavingCenter",
    _onCentered: "_onCentered"
  }
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](_MatTabBodyBase, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Directive
  }], function () {
    return [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef
    }, {
      type: _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_8__.Directionality,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional
      }]
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectorRef
    }];
  }, {
    _onCentering: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Output
    }],
    _beforeCentering: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Output
    }],
    _afterLeavingCenter: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Output
    }],
    _onCentered: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Output
    }],
    _content: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input,
      args: ['content']
    }],
    origin: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    animationDuration: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    preserveContent: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    position: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }]
  });
})();
/**
 * Wrapper for the contents of a tab.
 * @docs-private
 */
class MatTabBody extends _MatTabBodyBase {
  constructor(elementRef, dir, changeDetectorRef) {
    super(elementRef, dir, changeDetectorRef);
  }
}
_class3 = MatTabBody;
_class3.ɵfac = function _class3_Factory(t) {
  return new (t || _class3)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_8__.Directionality, 8), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectorRef));
};
_class3.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: _class3,
  selectors: [["mat-tab-body"]],
  viewQuery: function _class3_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_angular_cdk_portal__WEBPACK_IMPORTED_MODULE_2__.CdkPortalOutlet, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx._portalHost = _t.first);
    }
  },
  hostAttrs: [1, "mat-mdc-tab-body"],
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]],
  decls: 3,
  vars: 6,
  consts: [["cdkScrollable", "", 1, "mat-mdc-tab-body-content"], ["content", ""], ["matTabBodyHost", ""]],
  template: function _class3_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0, 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("@translateTab.start", function _class3_Template_div_animation_translateTab_start_0_listener($event) {
        return ctx._onTranslateTabStarted($event);
      })("@translateTab.done", function _class3_Template_div_animation_translateTab_done_0_listener($event) {
        return ctx._translateTabComplete.next($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, _class3_ng_template_2_Template, 0, 0, "ng-template", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("@translateTab", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction2"](3, _c1, ctx._position, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](1, _c0, ctx.animationDuration)));
    }
  },
  dependencies: [MatTabBodyPortal],
  styles: [".mat-mdc-tab-body{top:0;left:0;right:0;bottom:0;position:absolute;display:block;overflow:hidden;outline:0;flex-basis:100%}.mat-mdc-tab-body.mat-mdc-tab-body-active{position:relative;overflow-x:hidden;overflow-y:auto;z-index:1;flex-grow:1}.mat-mdc-tab-group.mat-mdc-tab-group-dynamic-height .mat-mdc-tab-body.mat-mdc-tab-body-active{overflow-y:hidden}.mat-mdc-tab-body-content{height:100%;overflow:auto}.mat-mdc-tab-group-dynamic-height .mat-mdc-tab-body-content{overflow:hidden}.mat-mdc-tab-body-content[style*=\"visibility: hidden\"]{display:none}"],
  encapsulation: 2,
  data: {
    animation: [matTabsAnimations.translateTab]
  }
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MatTabBody, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Component,
    args: [{
      selector: 'mat-tab-body',
      encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewEncapsulation.None,
      changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectionStrategy.Default,
      animations: [matTabsAnimations.translateTab],
      host: {
        'class': 'mat-mdc-tab-body'
      },
      template: "<div class=\"mat-mdc-tab-body-content\" #content\n     [@translateTab]=\"{\n        value: _position,\n        params: {animationDuration: animationDuration}\n     }\"\n     (@translateTab.start)=\"_onTranslateTabStarted($event)\"\n     (@translateTab.done)=\"_translateTabComplete.next($event)\"\n     cdkScrollable>\n  <ng-template matTabBodyHost></ng-template>\n</div>\n",
      styles: [".mat-mdc-tab-body{top:0;left:0;right:0;bottom:0;position:absolute;display:block;overflow:hidden;outline:0;flex-basis:100%}.mat-mdc-tab-body.mat-mdc-tab-body-active{position:relative;overflow-x:hidden;overflow-y:auto;z-index:1;flex-grow:1}.mat-mdc-tab-group.mat-mdc-tab-group-dynamic-height .mat-mdc-tab-body.mat-mdc-tab-body-active{overflow-y:hidden}.mat-mdc-tab-body-content{height:100%;overflow:auto}.mat-mdc-tab-group-dynamic-height .mat-mdc-tab-body-content{overflow:hidden}.mat-mdc-tab-body-content[style*=\"visibility: hidden\"]{display:none}"]
    }]
  }], function () {
    return [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef
    }, {
      type: _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_8__.Directionality,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional
      }]
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectorRef
    }];
  }, {
    _portalHost: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewChild,
      args: [_angular_cdk_portal__WEBPACK_IMPORTED_MODULE_2__.CdkPortalOutlet]
    }]
  });
})();

/**
 * Injection token that can be used to reference instances of `MatTabContent`. It serves as
 * alternative token to the actual `MatTabContent` class which could cause unnecessary
 * retention of the class and its directive metadata.
 */
const MAT_TAB_CONTENT = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken('MatTabContent');
/** Decorates the `ng-template` tags and reads out the template from it. */
class MatTabContent {
  constructor( /** Content for the tab. */template) {
    this.template = template;
  }
}
_class4 = MatTabContent;
_class4.ɵfac = function _class4_Factory(t) {
  return new (t || _class4)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.TemplateRef));
};
_class4.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
  type: _class4,
  selectors: [["", "matTabContent", ""]],
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([{
    provide: MAT_TAB_CONTENT,
    useExisting: _class4
  }])]
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MatTabContent, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Directive,
    args: [{
      selector: '[matTabContent]',
      providers: [{
        provide: MAT_TAB_CONTENT,
        useExisting: MatTabContent
      }]
    }]
  }], function () {
    return [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.TemplateRef
    }];
  }, null);
})();

/**
 * Injection token that can be used to reference instances of `MatTabLabel`. It serves as
 * alternative token to the actual `MatTabLabel` class which could cause unnecessary
 * retention of the class and its directive metadata.
 */
const MAT_TAB_LABEL = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken('MatTabLabel');
/**
 * Used to provide a tab label to a tab without causing a circular dependency.
 * @docs-private
 */
const MAT_TAB = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken('MAT_TAB');
/** Used to flag tab labels for use with the portal directive */
class MatTabLabel extends _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_2__.CdkPortal {
  constructor(templateRef, viewContainerRef, _closestTab) {
    super(templateRef, viewContainerRef);
    this._closestTab = _closestTab;
  }
}
_class5 = MatTabLabel;
_class5.ɵfac = function _class5_Factory(t) {
  return new (t || _class5)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.TemplateRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewContainerRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](MAT_TAB, 8));
};
_class5.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
  type: _class5,
  selectors: [["", "mat-tab-label", ""], ["", "matTabLabel", ""]],
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([{
    provide: MAT_TAB_LABEL,
    useExisting: _class5
  }]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]]
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MatTabLabel, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Directive,
    args: [{
      selector: '[mat-tab-label], [matTabLabel]',
      providers: [{
        provide: MAT_TAB_LABEL,
        useExisting: MatTabLabel
      }]
    }]
  }], function () {
    return [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.TemplateRef
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewContainerRef
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Inject,
        args: [MAT_TAB]
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional
      }]
    }];
  }, null);
})();

/** Class that is applied when a tab indicator is active. */
const ACTIVE_CLASS = 'mdc-tab-indicator--active';
/** Class that is applied when the tab indicator should not transition. */
const NO_TRANSITION_CLASS = 'mdc-tab-indicator--no-transition';
/**
 * Abstraction around the MDC tab indicator that acts as the tab header's ink bar.
 * @docs-private
 */
class MatInkBar {
  constructor(_items) {
    this._items = _items;
  }
  /** Hides the ink bar. */
  hide() {
    this._items.forEach(item => item.deactivateInkBar());
  }
  /** Aligns the ink bar to a DOM node. */
  alignToElement(element) {
    const correspondingItem = this._items.find(item => item.elementRef.nativeElement === element);
    const currentItem = this._currentItem;
    if (correspondingItem === currentItem) {
      return;
    }
    currentItem?.deactivateInkBar();
    if (correspondingItem) {
      const clientRect = currentItem?.elementRef.nativeElement.getBoundingClientRect?.();
      // The ink bar won't animate unless we give it the `ClientRect` of the previous item.
      correspondingItem.activateInkBar(clientRect);
      this._currentItem = correspondingItem;
    }
  }
}
/**
 * Mixin that can be used to apply the `MatInkBarItem` behavior to a class.
 * Base on MDC's `MDCSlidingTabIndicatorFoundation`:
 * https://github.com/material-components/material-components-web/blob/c0a11ef0d000a098fd0c372be8f12d6a99302855/packages/mdc-tab-indicator/sliding-foundation.ts
 * @docs-private
 */
function mixinInkBarItem(base) {
  return class extends base {
    constructor(...args) {
      super(...args);
      this._fitToContent = false;
    }
    /** Whether the ink bar should fit to the entire tab or just its content. */
    get fitInkBarToContent() {
      return this._fitToContent;
    }
    set fitInkBarToContent(v) {
      const newValue = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_9__.coerceBooleanProperty)(v);
      if (this._fitToContent !== newValue) {
        this._fitToContent = newValue;
        if (this._inkBarElement) {
          this._appendInkBarElement();
        }
      }
    }
    /** Aligns the ink bar to the current item. */
    activateInkBar(previousIndicatorClientRect) {
      const element = this.elementRef.nativeElement;
      // Early exit if no indicator is present to handle cases where an indicator
      // may be activated without a prior indicator state
      if (!previousIndicatorClientRect || !element.getBoundingClientRect || !this._inkBarContentElement) {
        element.classList.add(ACTIVE_CLASS);
        return;
      }
      // This animation uses the FLIP approach. You can read more about it at the link below:
      // https://aerotwist.com/blog/flip-your-animations/
      // Calculate the dimensions based on the dimensions of the previous indicator
      const currentClientRect = element.getBoundingClientRect();
      const widthDelta = previousIndicatorClientRect.width / currentClientRect.width;
      const xPosition = previousIndicatorClientRect.left - currentClientRect.left;
      element.classList.add(NO_TRANSITION_CLASS);
      this._inkBarContentElement.style.setProperty('transform', `translateX(${xPosition}px) scaleX(${widthDelta})`);
      // Force repaint before updating classes and transform to ensure the transform properly takes effect
      element.getBoundingClientRect();
      element.classList.remove(NO_TRANSITION_CLASS);
      element.classList.add(ACTIVE_CLASS);
      this._inkBarContentElement.style.setProperty('transform', '');
    }
    /** Removes the ink bar from the current item. */
    deactivateInkBar() {
      this.elementRef.nativeElement.classList.remove(ACTIVE_CLASS);
    }
    /** Initializes the foundation. */
    ngOnInit() {
      this._createInkBarElement();
    }
    /** Destroys the foundation. */
    ngOnDestroy() {
      this._inkBarElement?.remove();
      this._inkBarElement = this._inkBarContentElement = null;
    }
    /** Creates and appends the ink bar element. */
    _createInkBarElement() {
      const documentNode = this.elementRef.nativeElement.ownerDocument || document;
      this._inkBarElement = documentNode.createElement('span');
      this._inkBarContentElement = documentNode.createElement('span');
      this._inkBarElement.className = 'mdc-tab-indicator';
      this._inkBarContentElement.className = 'mdc-tab-indicator__content mdc-tab-indicator__content--underline';
      this._inkBarElement.appendChild(this._inkBarContentElement);
      this._appendInkBarElement();
    }
    /**
     * Appends the ink bar to the tab host element or content, depending on whether
     * the ink bar should fit to content.
     */
    _appendInkBarElement() {
      if (!this._inkBarElement && (typeof ngDevMode === 'undefined' || ngDevMode)) {
        throw Error('Ink bar element has not been created and cannot be appended');
      }
      const parentElement = this._fitToContent ? this.elementRef.nativeElement.querySelector('.mdc-tab__content') : this.elementRef.nativeElement;
      if (!parentElement && (typeof ngDevMode === 'undefined' || ngDevMode)) {
        throw Error('Missing element to host the ink bar');
      }
      parentElement.appendChild(this._inkBarElement);
    }
  };
}
/**
 * The default positioner function for the MatInkBar.
 * @docs-private
 */
function _MAT_INK_BAR_POSITIONER_FACTORY() {
  const method = element => ({
    left: element ? (element.offsetLeft || 0) + 'px' : '0',
    width: element ? (element.offsetWidth || 0) + 'px' : '0'
  });
  return method;
}
/** Injection token for the MatInkBar's Positioner. */
const _MAT_INK_BAR_POSITIONER = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken('MatInkBarPositioner', {
  providedIn: 'root',
  factory: _MAT_INK_BAR_POSITIONER_FACTORY
});

// Boilerplate for applying mixins to MatTabLabelWrapper.
/** @docs-private */
const _MatTabLabelWrapperMixinBase = (0,_angular_material_core__WEBPACK_IMPORTED_MODULE_10__.mixinDisabled)(class {});
/**
 * Used in the `mat-tab-group` view to display tab labels.
 * @docs-private
 */
class _MatTabLabelWrapperBase extends _MatTabLabelWrapperMixinBase {
  constructor(elementRef) {
    super();
    this.elementRef = elementRef;
  }
  /** Sets focus on the wrapper element */
  focus() {
    this.elementRef.nativeElement.focus();
  }
  getOffsetLeft() {
    return this.elementRef.nativeElement.offsetLeft;
  }
  getOffsetWidth() {
    return this.elementRef.nativeElement.offsetWidth;
  }
}
_class6 = _MatTabLabelWrapperBase;
_class6.ɵfac = function _class6_Factory(t) {
  return new (t || _class6)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef));
};
_class6.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
  type: _class6,
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]]
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](_MatTabLabelWrapperBase, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Directive
  }], function () {
    return [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef
    }];
  }, null);
})();
const _MatTabLabelWrapperBaseWithInkBarItem = mixinInkBarItem(_MatTabLabelWrapperBase);
/**
 * Used in the `mat-tab-group` view to display tab labels.
 * @docs-private
 */
class MatTabLabelWrapper extends _MatTabLabelWrapperBaseWithInkBarItem {}
_class7 = MatTabLabelWrapper;
_class7.ɵfac = /* @__PURE__ */function () {
  let ɵ_class7_BaseFactory;
  return function _class7_Factory(t) {
    return (ɵ_class7_BaseFactory || (ɵ_class7_BaseFactory = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetInheritedFactory"](_class7)))(t || _class7);
  };
}();
_class7.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
  type: _class7,
  selectors: [["", "matTabLabelWrapper", ""]],
  hostVars: 3,
  hostBindings: function _class7_HostBindings(rf, ctx) {
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattribute"]("aria-disabled", !!ctx.disabled);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("mat-mdc-tab-disabled", ctx.disabled);
    }
  },
  inputs: {
    disabled: "disabled",
    fitInkBarToContent: "fitInkBarToContent"
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]]
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MatTabLabelWrapper, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Directive,
    args: [{
      selector: '[matTabLabelWrapper]',
      inputs: ['disabled', 'fitInkBarToContent'],
      host: {
        '[class.mat-mdc-tab-disabled]': 'disabled',
        '[attr.aria-disabled]': '!!disabled'
      }
    }]
  }], null, null);
})();

// Boilerplate for applying mixins to MatTab.
/** @docs-private */
const _MatTabMixinBase = (0,_angular_material_core__WEBPACK_IMPORTED_MODULE_10__.mixinDisabled)(class {});
/**
 * Used to provide a tab group to a tab without causing a circular dependency.
 * @docs-private
 */
const MAT_TAB_GROUP = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken('MAT_TAB_GROUP');
/** @docs-private */
class _MatTabBase extends _MatTabMixinBase {
  /** @docs-private */
  get content() {
    return this._contentPortal;
  }
  constructor(_viewContainerRef, _closestTabGroup) {
    super();
    this._viewContainerRef = _viewContainerRef;
    this._closestTabGroup = _closestTabGroup;
    /** Plain text label for the tab, used when there is no template label. */
    this.textLabel = '';
    /** Portal that will be the hosted content of the tab */
    this._contentPortal = null;
    /** Emits whenever the internal state of the tab changes. */
    this._stateChanges = new rxjs__WEBPACK_IMPORTED_MODULE_6__.Subject();
    /**
     * The relatively indexed position where 0 represents the center, negative is left, and positive
     * represents the right.
     */
    this.position = null;
    /**
     * The initial relatively index origin of the tab if it was created and selected after there
     * was already a selected tab. Provides context of what position the tab should originate from.
     */
    this.origin = null;
    /**
     * Whether the tab is currently active.
     */
    this.isActive = false;
  }
  ngOnChanges(changes) {
    if (changes.hasOwnProperty('textLabel') || changes.hasOwnProperty('disabled')) {
      this._stateChanges.next();
    }
  }
  ngOnDestroy() {
    this._stateChanges.complete();
  }
  ngOnInit() {
    this._contentPortal = new _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_2__.TemplatePortal(this._explicitContent || this._implicitContent, this._viewContainerRef);
  }
  /**
   * This has been extracted to a util because of TS 4 and VE.
   * View Engine doesn't support property rename inheritance.
   * TS 4.0 doesn't allow properties to override accessors or vice-versa.
   * @docs-private
   */
  _setTemplateLabelInput(value) {
    // Only update the label if the query managed to find one. This works around an issue where a
    // user may have manually set `templateLabel` during creation mode, which would then get
    // clobbered by `undefined` when the query resolves. Also note that we check that the closest
    // tab matches the current one so that we don't pick up labels from nested tabs.
    if (value && value._closestTab === this) {
      this._templateLabel = value;
    }
  }
}
_class8 = _MatTabBase;
_class8.ɵfac = function _class8_Factory(t) {
  return new (t || _class8)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewContainerRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](MAT_TAB_GROUP, 8));
};
_class8.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
  type: _class8,
  viewQuery: function _class8_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.TemplateRef, 7);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx._implicitContent = _t.first);
    }
  },
  inputs: {
    textLabel: ["label", "textLabel"],
    ariaLabel: ["aria-label", "ariaLabel"],
    ariaLabelledby: ["aria-labelledby", "ariaLabelledby"],
    labelClass: "labelClass",
    bodyClass: "bodyClass"
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵNgOnChangesFeature"]]
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](_MatTabBase, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Directive
  }], function () {
    return [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewContainerRef
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Inject,
        args: [MAT_TAB_GROUP]
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional
      }]
    }];
  }, {
    _implicitContent: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewChild,
      args: [_angular_core__WEBPACK_IMPORTED_MODULE_0__.TemplateRef, {
        static: true
      }]
    }],
    textLabel: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input,
      args: ['label']
    }],
    ariaLabel: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input,
      args: ['aria-label']
    }],
    ariaLabelledby: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input,
      args: ['aria-labelledby']
    }],
    labelClass: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    bodyClass: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }]
  });
})();
class MatTab extends _MatTabBase {
  constructor() {
    super(...arguments);
    /**
     * Template provided in the tab content that will be used if present, used to enable lazy-loading
     */
    this._explicitContent = undefined;
  }
  /** Content for the tab label given by `<ng-template mat-tab-label>`. */
  get templateLabel() {
    return this._templateLabel;
  }
  set templateLabel(value) {
    this._setTemplateLabelInput(value);
  }
}
_class9 = MatTab;
_class9.ɵfac = /* @__PURE__ */function () {
  let ɵ_class9_BaseFactory;
  return function _class9_Factory(t) {
    return (ɵ_class9_BaseFactory || (ɵ_class9_BaseFactory = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetInheritedFactory"](_class9)))(t || _class9);
  };
}();
_class9.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: _class9,
  selectors: [["mat-tab"]],
  contentQueries: function _class9_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵcontentQuery"](dirIndex, MatTabContent, 7, _angular_core__WEBPACK_IMPORTED_MODULE_0__.TemplateRef);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵcontentQuery"](dirIndex, MatTabLabel, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx._explicitContent = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.templateLabel = _t.first);
    }
  },
  inputs: {
    disabled: "disabled"
  },
  exportAs: ["matTab"],
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([{
    provide: MAT_TAB,
    useExisting: _class9
  }]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]],
  ngContentSelectors: _c2,
  decls: 1,
  vars: 0,
  template: function _class9_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojectionDef"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, _class9_ng_template_0_Template, 1, 0, "ng-template");
    }
  },
  encapsulation: 2
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MatTab, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Component,
    args: [{
      selector: 'mat-tab',
      inputs: ['disabled'],
      changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectionStrategy.Default,
      encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewEncapsulation.None,
      exportAs: 'matTab',
      providers: [{
        provide: MAT_TAB,
        useExisting: MatTab
      }],
      template: "<!-- Create a template for the content of the <mat-tab> so that we can grab a reference to this\n    TemplateRef and use it in a Portal to render the tab content in the appropriate place in the\n    tab-group. -->\n<ng-template><ng-content></ng-content></ng-template>\n"
    }]
  }], null, {
    _explicitContent: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ContentChild,
      args: [MatTabContent, {
        read: _angular_core__WEBPACK_IMPORTED_MODULE_0__.TemplateRef,
        static: true
      }]
    }],
    templateLabel: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ContentChild,
      args: [MatTabLabel]
    }]
  });
})();

/** Config used to bind passive event listeners */
const passiveEventListenerOptions = (0,_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_11__.normalizePassiveListenerOptions)({
  passive: true
});
/**
 * Amount of milliseconds to wait before starting to scroll the header automatically.
 * Set a little conservatively in order to handle fake events dispatched on touch devices.
 */
const HEADER_SCROLL_DELAY = 650;
/**
 * Interval in milliseconds at which to scroll the header
 * while the user is holding their pointer.
 */
const HEADER_SCROLL_INTERVAL = 100;
/**
 * Base class for a tab header that supported pagination.
 * @docs-private
 */
class MatPaginatedTabHeader {
  /**
   * Whether pagination should be disabled. This can be used to avoid unnecessary
   * layout recalculations if it's known that pagination won't be required.
   */
  get disablePagination() {
    return this._disablePagination;
  }
  set disablePagination(value) {
    this._disablePagination = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_9__.coerceBooleanProperty)(value);
  }
  /** The index of the active tab. */
  get selectedIndex() {
    return this._selectedIndex;
  }
  set selectedIndex(value) {
    value = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_9__.coerceNumberProperty)(value);
    if (this._selectedIndex != value) {
      this._selectedIndexChanged = true;
      this._selectedIndex = value;
      if (this._keyManager) {
        this._keyManager.updateActiveItem(value);
      }
    }
  }
  constructor(_elementRef, _changeDetectorRef, _viewportRuler, _dir, _ngZone, _platform, _animationMode) {
    this._elementRef = _elementRef;
    this._changeDetectorRef = _changeDetectorRef;
    this._viewportRuler = _viewportRuler;
    this._dir = _dir;
    this._ngZone = _ngZone;
    this._platform = _platform;
    this._animationMode = _animationMode;
    /** The distance in pixels that the tab labels should be translated to the left. */
    this._scrollDistance = 0;
    /** Whether the header should scroll to the selected index after the view has been checked. */
    this._selectedIndexChanged = false;
    /** Emits when the component is destroyed. */
    this._destroyed = new rxjs__WEBPACK_IMPORTED_MODULE_6__.Subject();
    /** Whether the controls for pagination should be displayed */
    this._showPaginationControls = false;
    /** Whether the tab list can be scrolled more towards the end of the tab label list. */
    this._disableScrollAfter = true;
    /** Whether the tab list can be scrolled more towards the beginning of the tab label list. */
    this._disableScrollBefore = true;
    /** Stream that will stop the automated scrolling. */
    this._stopScrolling = new rxjs__WEBPACK_IMPORTED_MODULE_6__.Subject();
    this._disablePagination = false;
    this._selectedIndex = 0;
    /** Event emitted when the option is selected. */
    this.selectFocusedIndex = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    /** Event emitted when a label is focused. */
    this.indexFocused = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    // Bind the `mouseleave` event on the outside since it doesn't change anything in the view.
    _ngZone.runOutsideAngular(() => {
      (0,rxjs__WEBPACK_IMPORTED_MODULE_12__.fromEvent)(_elementRef.nativeElement, 'mouseleave').pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_13__.takeUntil)(this._destroyed)).subscribe(() => {
        this._stopInterval();
      });
    });
  }
  ngAfterViewInit() {
    // We need to handle these events manually, because we want to bind passive event listeners.
    (0,rxjs__WEBPACK_IMPORTED_MODULE_12__.fromEvent)(this._previousPaginator.nativeElement, 'touchstart', passiveEventListenerOptions).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_13__.takeUntil)(this._destroyed)).subscribe(() => {
      this._handlePaginatorPress('before');
    });
    (0,rxjs__WEBPACK_IMPORTED_MODULE_12__.fromEvent)(this._nextPaginator.nativeElement, 'touchstart', passiveEventListenerOptions).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_13__.takeUntil)(this._destroyed)).subscribe(() => {
      this._handlePaginatorPress('after');
    });
  }
  ngAfterContentInit() {
    const dirChange = this._dir ? this._dir.change : (0,rxjs__WEBPACK_IMPORTED_MODULE_14__.of)('ltr');
    const resize = this._viewportRuler.change(150);
    const realign = () => {
      this.updatePagination();
      this._alignInkBarToSelectedTab();
    };
    this._keyManager = new _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_15__.FocusKeyManager(this._items).withHorizontalOrientation(this._getLayoutDirection()).withHomeAndEnd().withWrap()
    // Allow focus to land on disabled tabs, as per https://w3c.github.io/aria-practices/#kbd_disabled_controls
    .skipPredicate(() => false);
    this._keyManager.updateActiveItem(this._selectedIndex);
    // Defer the first call in order to allow for slower browsers to lay out the elements.
    // This helps in cases where the user lands directly on a page with paginated tabs.
    // Note that we use `onStable` instead of `requestAnimationFrame`, because the latter
    // can hold up tests that are in a background tab.
    this._ngZone.onStable.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_16__.take)(1)).subscribe(realign);
    // On dir change or window resize, realign the ink bar and update the orientation of
    // the key manager if the direction has changed.
    (0,rxjs__WEBPACK_IMPORTED_MODULE_17__.merge)(dirChange, resize, this._items.changes, this._itemsResized()).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_13__.takeUntil)(this._destroyed)).subscribe(() => {
      // We need to defer this to give the browser some time to recalculate
      // the element dimensions. The call has to be wrapped in `NgZone.run`,
      // because the viewport change handler runs outside of Angular.
      this._ngZone.run(() => {
        Promise.resolve().then(() => {
          // Clamp the scroll distance, because it can change with the number of tabs.
          this._scrollDistance = Math.max(0, Math.min(this._getMaxScrollDistance(), this._scrollDistance));
          realign();
        });
      });
      this._keyManager.withHorizontalOrientation(this._getLayoutDirection());
    });
    // If there is a change in the focus key manager we need to emit the `indexFocused`
    // event in order to provide a public event that notifies about focus changes. Also we realign
    // the tabs container by scrolling the new focused tab into the visible section.
    this._keyManager.change.subscribe(newFocusIndex => {
      this.indexFocused.emit(newFocusIndex);
      this._setTabFocus(newFocusIndex);
    });
  }
  /** Sends any changes that could affect the layout of the items. */
  _itemsResized() {
    if (typeof ResizeObserver !== 'function') {
      return rxjs__WEBPACK_IMPORTED_MODULE_18__.EMPTY;
    }
    return this._items.changes.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.startWith)(this._items), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_19__.switchMap)(tabItems => new rxjs__WEBPACK_IMPORTED_MODULE_20__.Observable(observer => this._ngZone.runOutsideAngular(() => {
      const resizeObserver = new ResizeObserver(entries => observer.next(entries));
      tabItems.forEach(item => resizeObserver.observe(item.elementRef.nativeElement));
      return () => {
        resizeObserver.disconnect();
      };
    }))),
    // Skip the first emit since the resize observer emits when an item
    // is observed for new items when the tab is already inserted
    (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_21__.skip)(1),
    // Skip emissions where all the elements are invisible since we don't want
    // the header to try and re-render with invalid measurements. See #25574.
    (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_22__.filter)(entries => entries.some(e => e.contentRect.width > 0 && e.contentRect.height > 0)));
  }
  ngAfterContentChecked() {
    // If the number of tab labels have changed, check if scrolling should be enabled
    if (this._tabLabelCount != this._items.length) {
      this.updatePagination();
      this._tabLabelCount = this._items.length;
      this._changeDetectorRef.markForCheck();
    }
    // If the selected index has changed, scroll to the label and check if the scrolling controls
    // should be disabled.
    if (this._selectedIndexChanged) {
      this._scrollToLabel(this._selectedIndex);
      this._checkScrollingControls();
      this._alignInkBarToSelectedTab();
      this._selectedIndexChanged = false;
      this._changeDetectorRef.markForCheck();
    }
    // If the scroll distance has been changed (tab selected, focused, scroll controls activated),
    // then translate the header to reflect this.
    if (this._scrollDistanceChanged) {
      this._updateTabScrollPosition();
      this._scrollDistanceChanged = false;
      this._changeDetectorRef.markForCheck();
    }
  }
  ngOnDestroy() {
    this._keyManager?.destroy();
    this._destroyed.next();
    this._destroyed.complete();
    this._stopScrolling.complete();
  }
  /** Handles keyboard events on the header. */
  _handleKeydown(event) {
    // We don't handle any key bindings with a modifier key.
    if ((0,_angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_23__.hasModifierKey)(event)) {
      return;
    }
    switch (event.keyCode) {
      case _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_23__.ENTER:
      case _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_23__.SPACE:
        if (this.focusIndex !== this.selectedIndex) {
          const item = this._items.get(this.focusIndex);
          if (item && !item.disabled) {
            this.selectFocusedIndex.emit(this.focusIndex);
            this._itemSelected(event);
          }
        }
        break;
      default:
        this._keyManager.onKeydown(event);
    }
  }
  /**
   * Callback for when the MutationObserver detects that the content has changed.
   */
  _onContentChanges() {
    const textContent = this._elementRef.nativeElement.textContent;
    // We need to diff the text content of the header, because the MutationObserver callback
    // will fire even if the text content didn't change which is inefficient and is prone
    // to infinite loops if a poorly constructed expression is passed in (see #14249).
    if (textContent !== this._currentTextContent) {
      this._currentTextContent = textContent || '';
      // The content observer runs outside the `NgZone` by default, which
      // means that we need to bring the callback back in ourselves.
      this._ngZone.run(() => {
        this.updatePagination();
        this._alignInkBarToSelectedTab();
        this._changeDetectorRef.markForCheck();
      });
    }
  }
  /**
   * Updates the view whether pagination should be enabled or not.
   *
   * WARNING: Calling this method can be very costly in terms of performance. It should be called
   * as infrequently as possible from outside of the Tabs component as it causes a reflow of the
   * page.
   */
  updatePagination() {
    this._checkPaginationEnabled();
    this._checkScrollingControls();
    this._updateTabScrollPosition();
  }
  /** Tracks which element has focus; used for keyboard navigation */
  get focusIndex() {
    return this._keyManager ? this._keyManager.activeItemIndex : 0;
  }
  /** When the focus index is set, we must manually send focus to the correct label */
  set focusIndex(value) {
    if (!this._isValidIndex(value) || this.focusIndex === value || !this._keyManager) {
      return;
    }
    this._keyManager.setActiveItem(value);
  }
  /**
   * Determines if an index is valid.  If the tabs are not ready yet, we assume that the user is
   * providing a valid index and return true.
   */
  _isValidIndex(index) {
    return this._items ? !!this._items.toArray()[index] : true;
  }
  /**
   * Sets focus on the HTML element for the label wrapper and scrolls it into the view if
   * scrolling is enabled.
   */
  _setTabFocus(tabIndex) {
    if (this._showPaginationControls) {
      this._scrollToLabel(tabIndex);
    }
    if (this._items && this._items.length) {
      this._items.toArray()[tabIndex].focus();
      // Do not let the browser manage scrolling to focus the element, this will be handled
      // by using translation. In LTR, the scroll left should be 0. In RTL, the scroll width
      // should be the full width minus the offset width.
      const containerEl = this._tabListContainer.nativeElement;
      const dir = this._getLayoutDirection();
      if (dir == 'ltr') {
        containerEl.scrollLeft = 0;
      } else {
        containerEl.scrollLeft = containerEl.scrollWidth - containerEl.offsetWidth;
      }
    }
  }
  /** The layout direction of the containing app. */
  _getLayoutDirection() {
    return this._dir && this._dir.value === 'rtl' ? 'rtl' : 'ltr';
  }
  /** Performs the CSS transformation on the tab list that will cause the list to scroll. */
  _updateTabScrollPosition() {
    if (this.disablePagination) {
      return;
    }
    const scrollDistance = this.scrollDistance;
    const translateX = this._getLayoutDirection() === 'ltr' ? -scrollDistance : scrollDistance;
    // Don't use `translate3d` here because we don't want to create a new layer. A new layer
    // seems to cause flickering and overflow in Internet Explorer. For example, the ink bar
    // and ripples will exceed the boundaries of the visible tab bar.
    // See: https://github.com/angular/components/issues/10276
    // We round the `transform` here, because transforms with sub-pixel precision cause some
    // browsers to blur the content of the element.
    this._tabList.nativeElement.style.transform = `translateX(${Math.round(translateX)}px)`;
    // Setting the `transform` on IE will change the scroll offset of the parent, causing the
    // position to be thrown off in some cases. We have to reset it ourselves to ensure that
    // it doesn't get thrown off. Note that we scope it only to IE and Edge, because messing
    // with the scroll position throws off Chrome 71+ in RTL mode (see #14689).
    if (this._platform.TRIDENT || this._platform.EDGE) {
      this._tabListContainer.nativeElement.scrollLeft = 0;
    }
  }
  /** Sets the distance in pixels that the tab header should be transformed in the X-axis. */
  get scrollDistance() {
    return this._scrollDistance;
  }
  set scrollDistance(value) {
    this._scrollTo(value);
  }
  /**
   * Moves the tab list in the 'before' or 'after' direction (towards the beginning of the list or
   * the end of the list, respectively). The distance to scroll is computed to be a third of the
   * length of the tab list view window.
   *
   * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
   * should be called sparingly.
   */
  _scrollHeader(direction) {
    const viewLength = this._tabListContainer.nativeElement.offsetWidth;
    // Move the scroll distance one-third the length of the tab list's viewport.
    const scrollAmount = (direction == 'before' ? -1 : 1) * viewLength / 3;
    return this._scrollTo(this._scrollDistance + scrollAmount);
  }
  /** Handles click events on the pagination arrows. */
  _handlePaginatorClick(direction) {
    this._stopInterval();
    this._scrollHeader(direction);
  }
  /**
   * Moves the tab list such that the desired tab label (marked by index) is moved into view.
   *
   * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
   * should be called sparingly.
   */
  _scrollToLabel(labelIndex) {
    if (this.disablePagination) {
      return;
    }
    const selectedLabel = this._items ? this._items.toArray()[labelIndex] : null;
    if (!selectedLabel) {
      return;
    }
    // The view length is the visible width of the tab labels.
    const viewLength = this._tabListContainer.nativeElement.offsetWidth;
    const {
      offsetLeft,
      offsetWidth
    } = selectedLabel.elementRef.nativeElement;
    let labelBeforePos, labelAfterPos;
    if (this._getLayoutDirection() == 'ltr') {
      labelBeforePos = offsetLeft;
      labelAfterPos = labelBeforePos + offsetWidth;
    } else {
      labelAfterPos = this._tabListInner.nativeElement.offsetWidth - offsetLeft;
      labelBeforePos = labelAfterPos - offsetWidth;
    }
    const beforeVisiblePos = this.scrollDistance;
    const afterVisiblePos = this.scrollDistance + viewLength;
    if (labelBeforePos < beforeVisiblePos) {
      // Scroll header to move label to the before direction
      this.scrollDistance -= beforeVisiblePos - labelBeforePos;
    } else if (labelAfterPos > afterVisiblePos) {
      // Scroll header to move label to the after direction
      this.scrollDistance += Math.min(labelAfterPos - afterVisiblePos, labelBeforePos - beforeVisiblePos);
    }
  }
  /**
   * Evaluate whether the pagination controls should be displayed. If the scroll width of the
   * tab list is wider than the size of the header container, then the pagination controls should
   * be shown.
   *
   * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
   * should be called sparingly.
   */
  _checkPaginationEnabled() {
    if (this.disablePagination) {
      this._showPaginationControls = false;
    } else {
      const isEnabled = this._tabListInner.nativeElement.scrollWidth > this._elementRef.nativeElement.offsetWidth;
      if (!isEnabled) {
        this.scrollDistance = 0;
      }
      if (isEnabled !== this._showPaginationControls) {
        this._changeDetectorRef.markForCheck();
      }
      this._showPaginationControls = isEnabled;
    }
  }
  /**
   * Evaluate whether the before and after controls should be enabled or disabled.
   * If the header is at the beginning of the list (scroll distance is equal to 0) then disable the
   * before button. If the header is at the end of the list (scroll distance is equal to the
   * maximum distance we can scroll), then disable the after button.
   *
   * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
   * should be called sparingly.
   */
  _checkScrollingControls() {
    if (this.disablePagination) {
      this._disableScrollAfter = this._disableScrollBefore = true;
    } else {
      // Check if the pagination arrows should be activated.
      this._disableScrollBefore = this.scrollDistance == 0;
      this._disableScrollAfter = this.scrollDistance == this._getMaxScrollDistance();
      this._changeDetectorRef.markForCheck();
    }
  }
  /**
   * Determines what is the maximum length in pixels that can be set for the scroll distance. This
   * is equal to the difference in width between the tab list container and tab header container.
   *
   * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
   * should be called sparingly.
   */
  _getMaxScrollDistance() {
    const lengthOfTabList = this._tabListInner.nativeElement.scrollWidth;
    const viewLength = this._tabListContainer.nativeElement.offsetWidth;
    return lengthOfTabList - viewLength || 0;
  }
  /** Tells the ink-bar to align itself to the current label wrapper */
  _alignInkBarToSelectedTab() {
    const selectedItem = this._items && this._items.length ? this._items.toArray()[this.selectedIndex] : null;
    const selectedLabelWrapper = selectedItem ? selectedItem.elementRef.nativeElement : null;
    if (selectedLabelWrapper) {
      this._inkBar.alignToElement(selectedLabelWrapper);
    } else {
      this._inkBar.hide();
    }
  }
  /** Stops the currently-running paginator interval.  */
  _stopInterval() {
    this._stopScrolling.next();
  }
  /**
   * Handles the user pressing down on one of the paginators.
   * Starts scrolling the header after a certain amount of time.
   * @param direction In which direction the paginator should be scrolled.
   */
  _handlePaginatorPress(direction, mouseEvent) {
    // Don't start auto scrolling for right mouse button clicks. Note that we shouldn't have to
    // null check the `button`, but we do it so we don't break tests that use fake events.
    if (mouseEvent && mouseEvent.button != null && mouseEvent.button !== 0) {
      return;
    }
    // Avoid overlapping timers.
    this._stopInterval();
    // Start a timer after the delay and keep firing based on the interval.
    (0,rxjs__WEBPACK_IMPORTED_MODULE_24__.timer)(HEADER_SCROLL_DELAY, HEADER_SCROLL_INTERVAL)
    // Keep the timer going until something tells it to stop or the component is destroyed.
    .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_13__.takeUntil)((0,rxjs__WEBPACK_IMPORTED_MODULE_17__.merge)(this._stopScrolling, this._destroyed))).subscribe(() => {
      const {
        maxScrollDistance,
        distance
      } = this._scrollHeader(direction);
      // Stop the timer if we've reached the start or the end.
      if (distance === 0 || distance >= maxScrollDistance) {
        this._stopInterval();
      }
    });
  }
  /**
   * Scrolls the header to a given position.
   * @param position Position to which to scroll.
   * @returns Information on the current scroll distance and the maximum.
   */
  _scrollTo(position) {
    if (this.disablePagination) {
      return {
        maxScrollDistance: 0,
        distance: 0
      };
    }
    const maxScrollDistance = this._getMaxScrollDistance();
    this._scrollDistance = Math.max(0, Math.min(maxScrollDistance, position));
    // Mark that the scroll distance has changed so that after the view is checked, the CSS
    // transformation can move the header.
    this._scrollDistanceChanged = true;
    this._checkScrollingControls();
    return {
      maxScrollDistance,
      distance: this._scrollDistance
    };
  }
}
_class10 = MatPaginatedTabHeader;
_class10.ɵfac = function _class10_Factory(t) {
  return new (t || _class10)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_25__.ViewportRuler), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_8__.Directionality, 8), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.NgZone), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_11__.Platform), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ANIMATION_MODULE_TYPE, 8));
};
_class10.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
  type: _class10,
  inputs: {
    disablePagination: "disablePagination"
  }
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MatPaginatedTabHeader, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Directive
  }], function () {
    return [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectorRef
    }, {
      type: _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_25__.ViewportRuler
    }, {
      type: _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_8__.Directionality,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional
      }]
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.NgZone
    }, {
      type: _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_11__.Platform
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Inject,
        args: [_angular_core__WEBPACK_IMPORTED_MODULE_0__.ANIMATION_MODULE_TYPE]
      }]
    }];
  }, {
    disablePagination: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }]
  });
})();

/**
 * Base class with all of the `MatTabHeader` functionality.
 * @docs-private
 */
class _MatTabHeaderBase extends MatPaginatedTabHeader {
  /** Whether the ripple effect is disabled or not. */
  get disableRipple() {
    return this._disableRipple;
  }
  set disableRipple(value) {
    this._disableRipple = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_9__.coerceBooleanProperty)(value);
  }
  constructor(elementRef, changeDetectorRef, viewportRuler, dir, ngZone, platform, animationMode) {
    super(elementRef, changeDetectorRef, viewportRuler, dir, ngZone, platform, animationMode);
    this._disableRipple = false;
  }
  _itemSelected(event) {
    event.preventDefault();
  }
}
_class11 = _MatTabHeaderBase;
_class11.ɵfac = function _class11_Factory(t) {
  return new (t || _class11)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_25__.ViewportRuler), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_8__.Directionality, 8), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.NgZone), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_11__.Platform), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ANIMATION_MODULE_TYPE, 8));
};
_class11.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
  type: _class11,
  inputs: {
    disableRipple: "disableRipple"
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]]
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](_MatTabHeaderBase, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Directive
  }], function () {
    return [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectorRef
    }, {
      type: _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_25__.ViewportRuler
    }, {
      type: _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_8__.Directionality,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional
      }]
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.NgZone
    }, {
      type: _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_11__.Platform
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Inject,
        args: [_angular_core__WEBPACK_IMPORTED_MODULE_0__.ANIMATION_MODULE_TYPE]
      }]
    }];
  }, {
    disableRipple: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }]
  });
})();
/**
 * The header of the tab group which displays a list of all the tabs in the tab group. Includes
 * an ink bar that follows the currently selected tab. When the tabs list's width exceeds the
 * width of the header container, then arrows will be displayed to allow the user to scroll
 * left and right across the header.
 * @docs-private
 */
class MatTabHeader extends _MatTabHeaderBase {
  constructor(elementRef, changeDetectorRef, viewportRuler, dir, ngZone, platform, animationMode) {
    super(elementRef, changeDetectorRef, viewportRuler, dir, ngZone, platform, animationMode);
  }
  ngAfterContentInit() {
    this._inkBar = new MatInkBar(this._items);
    super.ngAfterContentInit();
  }
}
_class12 = MatTabHeader;
_class12.ɵfac = function _class12_Factory(t) {
  return new (t || _class12)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_25__.ViewportRuler), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_8__.Directionality, 8), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.NgZone), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_11__.Platform), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ANIMATION_MODULE_TYPE, 8));
};
_class12.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: _class12,
  selectors: [["mat-tab-header"]],
  contentQueries: function _class12_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵcontentQuery"](dirIndex, MatTabLabelWrapper, 4);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx._items = _t);
    }
  },
  viewQuery: function _class12_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c3, 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c4, 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c5, 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c6, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c7, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx._tabListContainer = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx._tabList = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx._tabListInner = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx._nextPaginator = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx._previousPaginator = _t.first);
    }
  },
  hostAttrs: [1, "mat-mdc-tab-header"],
  hostVars: 4,
  hostBindings: function _class12_HostBindings(rf, ctx) {
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("mat-mdc-tab-header-pagination-controls-enabled", ctx._showPaginationControls)("mat-mdc-tab-header-rtl", ctx._getLayoutDirection() == "rtl");
    }
  },
  inputs: {
    selectedIndex: "selectedIndex"
  },
  outputs: {
    selectFocusedIndex: "selectFocusedIndex",
    indexFocused: "indexFocused"
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]],
  ngContentSelectors: _c2,
  decls: 13,
  vars: 10,
  consts: [["aria-hidden", "true", "type", "button", "mat-ripple", "", "tabindex", "-1", 1, "mat-mdc-tab-header-pagination", "mat-mdc-tab-header-pagination-before", 3, "matRippleDisabled", "disabled", "click", "mousedown", "touchend"], ["previousPaginator", ""], [1, "mat-mdc-tab-header-pagination-chevron"], [1, "mat-mdc-tab-label-container", 3, "keydown"], ["tabListContainer", ""], ["role", "tablist", 1, "mat-mdc-tab-list", 3, "cdkObserveContent"], ["tabList", ""], [1, "mat-mdc-tab-labels"], ["tabListInner", ""], ["aria-hidden", "true", "type", "button", "mat-ripple", "", "tabindex", "-1", 1, "mat-mdc-tab-header-pagination", "mat-mdc-tab-header-pagination-after", 3, "matRippleDisabled", "disabled", "mousedown", "click", "touchend"], ["nextPaginator", ""]],
  template: function _class12_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojectionDef"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 0, 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function _class12_Template_button_click_0_listener() {
        return ctx._handlePaginatorClick("before");
      })("mousedown", function _class12_Template_button_mousedown_0_listener($event) {
        return ctx._handlePaginatorPress("before", $event);
      })("touchend", function _class12_Template_button_touchend_0_listener() {
        return ctx._stopInterval();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "div", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 3, 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("keydown", function _class12_Template_div_keydown_3_listener($event) {
        return ctx._handleKeydown($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 5, 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("cdkObserveContent", function _class12_Template_div_cdkObserveContent_5_listener() {
        return ctx._onContentChanges();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 7, 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](9);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "button", 9, 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("mousedown", function _class12_Template_button_mousedown_10_listener($event) {
        return ctx._handlePaginatorPress("after", $event);
      })("click", function _class12_Template_button_click_10_listener() {
        return ctx._handlePaginatorClick("after");
      })("touchend", function _class12_Template_button_touchend_10_listener() {
        return ctx._stopInterval();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](12, "div", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("mat-mdc-tab-header-pagination-disabled", ctx._disableScrollBefore);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("matRippleDisabled", ctx._disableScrollBefore || ctx.disableRipple)("disabled", ctx._disableScrollBefore || null);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("_mat-animation-noopable", ctx._animationMode === "NoopAnimations");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](7);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("mat-mdc-tab-header-pagination-disabled", ctx._disableScrollAfter);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("matRippleDisabled", ctx._disableScrollAfter || ctx.disableRipple)("disabled", ctx._disableScrollAfter || null);
    }
  },
  dependencies: [_angular_material_core__WEBPACK_IMPORTED_MODULE_10__.MatRipple, _angular_cdk_observers__WEBPACK_IMPORTED_MODULE_26__.CdkObserveContent],
  styles: [".mat-mdc-tab-header{display:flex;overflow:hidden;position:relative;flex-shrink:0;--mdc-tab-indicator-active-indicator-height:2px;--mdc-tab-indicator-active-indicator-shape:0;--mdc-secondary-navigation-tab-container-height:48px}.mdc-tab-indicator .mdc-tab-indicator__content{transition-duration:var(--mat-tab-animation-duration, 250ms)}.mat-mdc-tab-header-pagination{-webkit-user-select:none;user-select:none;position:relative;display:none;justify-content:center;align-items:center;min-width:32px;cursor:pointer;z-index:2;-webkit-tap-highlight-color:rgba(0,0,0,0);touch-action:none;box-sizing:content-box;background:none;border:none;outline:0;padding:0}.mat-mdc-tab-header-pagination::-moz-focus-inner{border:0}.mat-mdc-tab-header-pagination .mat-ripple-element{opacity:.12;background-color:var(--mat-tab-header-inactive-ripple-color)}.mat-mdc-tab-header-pagination-controls-enabled .mat-mdc-tab-header-pagination{display:flex}.mat-mdc-tab-header-pagination-before,.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-after{padding-left:4px}.mat-mdc-tab-header-pagination-before .mat-mdc-tab-header-pagination-chevron,.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-after .mat-mdc-tab-header-pagination-chevron{transform:rotate(-135deg)}.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-before,.mat-mdc-tab-header-pagination-after{padding-right:4px}.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-before .mat-mdc-tab-header-pagination-chevron,.mat-mdc-tab-header-pagination-after .mat-mdc-tab-header-pagination-chevron{transform:rotate(45deg)}.mat-mdc-tab-header-pagination-chevron{border-style:solid;border-width:2px 2px 0 0;height:8px;width:8px;border-color:var(--mat-tab-header-pagination-icon-color)}.mat-mdc-tab-header-pagination-disabled{box-shadow:none;cursor:default;pointer-events:none}.mat-mdc-tab-header-pagination-disabled .mat-mdc-tab-header-pagination-chevron{opacity:.4}.mat-mdc-tab-list{flex-grow:1;position:relative;transition:transform 500ms cubic-bezier(0.35, 0, 0.25, 1)}._mat-animation-noopable .mat-mdc-tab-list{transition:none}._mat-animation-noopable span.mdc-tab-indicator__content,._mat-animation-noopable span.mdc-tab__text-label{transition:none}.mat-mdc-tab-label-container{display:flex;flex-grow:1;overflow:hidden;z-index:1}.mat-mdc-tab-labels{display:flex;flex:1 0 auto}[mat-align-tabs=center]>.mat-mdc-tab-header .mat-mdc-tab-labels{justify-content:center}[mat-align-tabs=end]>.mat-mdc-tab-header .mat-mdc-tab-labels{justify-content:flex-end}.mat-mdc-tab::before{margin:5px}.cdk-high-contrast-active .mat-mdc-tab[aria-disabled=true]{color:GrayText}"],
  encapsulation: 2
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MatTabHeader, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Component,
    args: [{
      selector: 'mat-tab-header',
      inputs: ['selectedIndex'],
      outputs: ['selectFocusedIndex', 'indexFocused'],
      encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewEncapsulation.None,
      changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectionStrategy.Default,
      host: {
        'class': 'mat-mdc-tab-header',
        '[class.mat-mdc-tab-header-pagination-controls-enabled]': '_showPaginationControls',
        '[class.mat-mdc-tab-header-rtl]': "_getLayoutDirection() == 'rtl'"
      },
      template: "<!-- TODO: this also had `mat-elevation-z4`. Figure out what we should do with it. -->\n<button class=\"mat-mdc-tab-header-pagination mat-mdc-tab-header-pagination-before\"\n     #previousPaginator\n     aria-hidden=\"true\"\n     type=\"button\"\n     mat-ripple\n     tabindex=\"-1\"\n     [matRippleDisabled]=\"_disableScrollBefore || disableRipple\"\n     [class.mat-mdc-tab-header-pagination-disabled]=\"_disableScrollBefore\"\n     [disabled]=\"_disableScrollBefore || null\"\n     (click)=\"_handlePaginatorClick('before')\"\n     (mousedown)=\"_handlePaginatorPress('before', $event)\"\n     (touchend)=\"_stopInterval()\">\n  <div class=\"mat-mdc-tab-header-pagination-chevron\"></div>\n</button>\n\n<div\n  class=\"mat-mdc-tab-label-container\"\n  #tabListContainer\n  (keydown)=\"_handleKeydown($event)\"\n  [class._mat-animation-noopable]=\"_animationMode === 'NoopAnimations'\">\n  <div\n    #tabList\n    class=\"mat-mdc-tab-list\"\n    role=\"tablist\"\n    (cdkObserveContent)=\"_onContentChanges()\">\n    <div class=\"mat-mdc-tab-labels\" #tabListInner>\n      <ng-content></ng-content>\n    </div>\n  </div>\n</div>\n\n<!-- TODO: this also had `mat-elevation-z4`. Figure out what we should do with it. -->\n<button class=\"mat-mdc-tab-header-pagination mat-mdc-tab-header-pagination-after\"\n     #nextPaginator\n     aria-hidden=\"true\"\n     type=\"button\"\n     mat-ripple\n     [matRippleDisabled]=\"_disableScrollAfter || disableRipple\"\n     [class.mat-mdc-tab-header-pagination-disabled]=\"_disableScrollAfter\"\n     [disabled]=\"_disableScrollAfter || null\"\n     tabindex=\"-1\"\n     (mousedown)=\"_handlePaginatorPress('after', $event)\"\n     (click)=\"_handlePaginatorClick('after')\"\n     (touchend)=\"_stopInterval()\">\n  <div class=\"mat-mdc-tab-header-pagination-chevron\"></div>\n</button>\n",
      styles: [".mat-mdc-tab-header{display:flex;overflow:hidden;position:relative;flex-shrink:0;--mdc-tab-indicator-active-indicator-height:2px;--mdc-tab-indicator-active-indicator-shape:0;--mdc-secondary-navigation-tab-container-height:48px}.mdc-tab-indicator .mdc-tab-indicator__content{transition-duration:var(--mat-tab-animation-duration, 250ms)}.mat-mdc-tab-header-pagination{-webkit-user-select:none;user-select:none;position:relative;display:none;justify-content:center;align-items:center;min-width:32px;cursor:pointer;z-index:2;-webkit-tap-highlight-color:rgba(0,0,0,0);touch-action:none;box-sizing:content-box;background:none;border:none;outline:0;padding:0}.mat-mdc-tab-header-pagination::-moz-focus-inner{border:0}.mat-mdc-tab-header-pagination .mat-ripple-element{opacity:.12;background-color:var(--mat-tab-header-inactive-ripple-color)}.mat-mdc-tab-header-pagination-controls-enabled .mat-mdc-tab-header-pagination{display:flex}.mat-mdc-tab-header-pagination-before,.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-after{padding-left:4px}.mat-mdc-tab-header-pagination-before .mat-mdc-tab-header-pagination-chevron,.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-after .mat-mdc-tab-header-pagination-chevron{transform:rotate(-135deg)}.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-before,.mat-mdc-tab-header-pagination-after{padding-right:4px}.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-before .mat-mdc-tab-header-pagination-chevron,.mat-mdc-tab-header-pagination-after .mat-mdc-tab-header-pagination-chevron{transform:rotate(45deg)}.mat-mdc-tab-header-pagination-chevron{border-style:solid;border-width:2px 2px 0 0;height:8px;width:8px;border-color:var(--mat-tab-header-pagination-icon-color)}.mat-mdc-tab-header-pagination-disabled{box-shadow:none;cursor:default;pointer-events:none}.mat-mdc-tab-header-pagination-disabled .mat-mdc-tab-header-pagination-chevron{opacity:.4}.mat-mdc-tab-list{flex-grow:1;position:relative;transition:transform 500ms cubic-bezier(0.35, 0, 0.25, 1)}._mat-animation-noopable .mat-mdc-tab-list{transition:none}._mat-animation-noopable span.mdc-tab-indicator__content,._mat-animation-noopable span.mdc-tab__text-label{transition:none}.mat-mdc-tab-label-container{display:flex;flex-grow:1;overflow:hidden;z-index:1}.mat-mdc-tab-labels{display:flex;flex:1 0 auto}[mat-align-tabs=center]>.mat-mdc-tab-header .mat-mdc-tab-labels{justify-content:center}[mat-align-tabs=end]>.mat-mdc-tab-header .mat-mdc-tab-labels{justify-content:flex-end}.mat-mdc-tab::before{margin:5px}.cdk-high-contrast-active .mat-mdc-tab[aria-disabled=true]{color:GrayText}"]
    }]
  }], function () {
    return [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectorRef
    }, {
      type: _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_25__.ViewportRuler
    }, {
      type: _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_8__.Directionality,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional
      }]
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.NgZone
    }, {
      type: _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_11__.Platform
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Inject,
        args: [_angular_core__WEBPACK_IMPORTED_MODULE_0__.ANIMATION_MODULE_TYPE]
      }]
    }];
  }, {
    _items: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ContentChildren,
      args: [MatTabLabelWrapper, {
        descendants: false
      }]
    }],
    _tabListContainer: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewChild,
      args: ['tabListContainer', {
        static: true
      }]
    }],
    _tabList: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewChild,
      args: ['tabList', {
        static: true
      }]
    }],
    _tabListInner: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewChild,
      args: ['tabListInner', {
        static: true
      }]
    }],
    _nextPaginator: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewChild,
      args: ['nextPaginator']
    }],
    _previousPaginator: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewChild,
      args: ['previousPaginator']
    }]
  });
})();

/** Injection token that can be used to provide the default options the tabs module. */
const MAT_TABS_CONFIG = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken('MAT_TABS_CONFIG');

/** Used to generate unique ID's for each tab component */
let nextId = 0;
// Boilerplate for applying mixins to MatTabGroup.
/** @docs-private */
const _MatTabGroupMixinBase = (0,_angular_material_core__WEBPACK_IMPORTED_MODULE_10__.mixinColor)((0,_angular_material_core__WEBPACK_IMPORTED_MODULE_10__.mixinDisableRipple)(class {
  constructor(_elementRef) {
    this._elementRef = _elementRef;
  }
}), 'primary');
/**
 * Base class with all of the `MatTabGroupBase` functionality.
 * @docs-private
 */
class _MatTabGroupBase extends _MatTabGroupMixinBase {
  /** Whether the tab group should grow to the size of the active tab. */
  get dynamicHeight() {
    return this._dynamicHeight;
  }
  set dynamicHeight(value) {
    this._dynamicHeight = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_9__.coerceBooleanProperty)(value);
  }
  /** The index of the active tab. */
  get selectedIndex() {
    return this._selectedIndex;
  }
  set selectedIndex(value) {
    this._indexToSelect = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_9__.coerceNumberProperty)(value, null);
  }
  /** Duration for the tab animation. Will be normalized to milliseconds if no units are set. */
  get animationDuration() {
    return this._animationDuration;
  }
  set animationDuration(value) {
    this._animationDuration = /^\d+$/.test(value + '') ? value + 'ms' : value;
  }
  /**
   * `tabindex` to be set on the inner element that wraps the tab content. Can be used for improved
   * accessibility when the tab does not have focusable elements or if it has scrollable content.
   * The `tabindex` will be removed automatically for inactive tabs.
   * Read more at https://www.w3.org/TR/wai-aria-practices/examples/tabs/tabs-2/tabs.html
   */
  get contentTabIndex() {
    return this._contentTabIndex;
  }
  set contentTabIndex(value) {
    this._contentTabIndex = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_9__.coerceNumberProperty)(value, null);
  }
  /**
   * Whether pagination should be disabled. This can be used to avoid unnecessary
   * layout recalculations if it's known that pagination won't be required.
   */
  get disablePagination() {
    return this._disablePagination;
  }
  set disablePagination(value) {
    this._disablePagination = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_9__.coerceBooleanProperty)(value);
  }
  /**
   * By default tabs remove their content from the DOM while it's off-screen.
   * Setting this to `true` will keep it in the DOM which will prevent elements
   * like iframes and videos from reloading next time it comes back into the view.
   */
  get preserveContent() {
    return this._preserveContent;
  }
  set preserveContent(value) {
    this._preserveContent = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_9__.coerceBooleanProperty)(value);
  }
  /** Background color of the tab group. */
  get backgroundColor() {
    return this._backgroundColor;
  }
  set backgroundColor(value) {
    const classList = this._elementRef.nativeElement.classList;
    classList.remove('mat-tabs-with-background', `mat-background-${this.backgroundColor}`);
    if (value) {
      classList.add('mat-tabs-with-background', `mat-background-${value}`);
    }
    this._backgroundColor = value;
  }
  constructor(elementRef, _changeDetectorRef, defaultConfig, _animationMode) {
    super(elementRef);
    this._changeDetectorRef = _changeDetectorRef;
    this._animationMode = _animationMode;
    /** All of the tabs that belong to the group. */
    this._tabs = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.QueryList();
    /** The tab index that should be selected after the content has been checked. */
    this._indexToSelect = 0;
    /** Index of the tab that was focused last. */
    this._lastFocusedTabIndex = null;
    /** Snapshot of the height of the tab body wrapper before another tab is activated. */
    this._tabBodyWrapperHeight = 0;
    /** Subscription to tabs being added/removed. */
    this._tabsSubscription = rxjs__WEBPACK_IMPORTED_MODULE_3__.Subscription.EMPTY;
    /** Subscription to changes in the tab labels. */
    this._tabLabelSubscription = rxjs__WEBPACK_IMPORTED_MODULE_3__.Subscription.EMPTY;
    this._dynamicHeight = false;
    this._selectedIndex = null;
    /** Position of the tab header. */
    this.headerPosition = 'above';
    this._disablePagination = false;
    this._preserveContent = false;
    /** Output to enable support for two-way binding on `[(selectedIndex)]` */
    this.selectedIndexChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    /** Event emitted when focus has changed within a tab group. */
    this.focusChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    /** Event emitted when the body animation has completed */
    this.animationDone = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    /** Event emitted when the tab selection has changed. */
    this.selectedTabChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter(true);
    this._groupId = nextId++;
    this.animationDuration = defaultConfig && defaultConfig.animationDuration ? defaultConfig.animationDuration : '500ms';
    this.disablePagination = defaultConfig && defaultConfig.disablePagination != null ? defaultConfig.disablePagination : false;
    this.dynamicHeight = defaultConfig && defaultConfig.dynamicHeight != null ? defaultConfig.dynamicHeight : false;
    this.contentTabIndex = defaultConfig?.contentTabIndex ?? null;
    this.preserveContent = !!defaultConfig?.preserveContent;
  }
  /**
   * After the content is checked, this component knows what tabs have been defined
   * and what the selected index should be. This is where we can know exactly what position
   * each tab should be in according to the new selected index, and additionally we know how
   * a new selected tab should transition in (from the left or right).
   */
  ngAfterContentChecked() {
    // Don't clamp the `indexToSelect` immediately in the setter because it can happen that
    // the amount of tabs changes before the actual change detection runs.
    const indexToSelect = this._indexToSelect = this._clampTabIndex(this._indexToSelect);
    // If there is a change in selected index, emit a change event. Should not trigger if
    // the selected index has not yet been initialized.
    if (this._selectedIndex != indexToSelect) {
      const isFirstRun = this._selectedIndex == null;
      if (!isFirstRun) {
        this.selectedTabChange.emit(this._createChangeEvent(indexToSelect));
        // Preserve the height so page doesn't scroll up during tab change.
        // Fixes https://stackblitz.com/edit/mat-tabs-scroll-page-top-on-tab-change
        const wrapper = this._tabBodyWrapper.nativeElement;
        wrapper.style.minHeight = wrapper.clientHeight + 'px';
      }
      // Changing these values after change detection has run
      // since the checked content may contain references to them.
      Promise.resolve().then(() => {
        this._tabs.forEach((tab, index) => tab.isActive = index === indexToSelect);
        if (!isFirstRun) {
          this.selectedIndexChange.emit(indexToSelect);
          // Clear the min-height, this was needed during tab change to avoid
          // unnecessary scrolling.
          this._tabBodyWrapper.nativeElement.style.minHeight = '';
        }
      });
    }
    // Setup the position for each tab and optionally setup an origin on the next selected tab.
    this._tabs.forEach((tab, index) => {
      tab.position = index - indexToSelect;
      // If there is already a selected tab, then set up an origin for the next selected tab
      // if it doesn't have one already.
      if (this._selectedIndex != null && tab.position == 0 && !tab.origin) {
        tab.origin = indexToSelect - this._selectedIndex;
      }
    });
    if (this._selectedIndex !== indexToSelect) {
      this._selectedIndex = indexToSelect;
      this._lastFocusedTabIndex = null;
      this._changeDetectorRef.markForCheck();
    }
  }
  ngAfterContentInit() {
    this._subscribeToAllTabChanges();
    this._subscribeToTabLabels();
    // Subscribe to changes in the amount of tabs, in order to be
    // able to re-render the content as new tabs are added or removed.
    this._tabsSubscription = this._tabs.changes.subscribe(() => {
      const indexToSelect = this._clampTabIndex(this._indexToSelect);
      // Maintain the previously-selected tab if a new tab is added or removed and there is no
      // explicit change that selects a different tab.
      if (indexToSelect === this._selectedIndex) {
        const tabs = this._tabs.toArray();
        let selectedTab;
        for (let i = 0; i < tabs.length; i++) {
          if (tabs[i].isActive) {
            // Assign both to the `_indexToSelect` and `_selectedIndex` so we don't fire a changed
            // event, otherwise the consumer may end up in an infinite loop in some edge cases like
            // adding a tab within the `selectedIndexChange` event.
            this._indexToSelect = this._selectedIndex = i;
            this._lastFocusedTabIndex = null;
            selectedTab = tabs[i];
            break;
          }
        }
        // If we haven't found an active tab and a tab exists at the selected index, it means
        // that the active tab was swapped out. Since this won't be picked up by the rendering
        // loop in `ngAfterContentChecked`, we need to sync it up manually.
        if (!selectedTab && tabs[indexToSelect]) {
          Promise.resolve().then(() => {
            tabs[indexToSelect].isActive = true;
            this.selectedTabChange.emit(this._createChangeEvent(indexToSelect));
          });
        }
      }
      this._changeDetectorRef.markForCheck();
    });
  }
  /** Listens to changes in all of the tabs. */
  _subscribeToAllTabChanges() {
    // Since we use a query with `descendants: true` to pick up the tabs, we may end up catching
    // some that are inside of nested tab groups. We filter them out manually by checking that
    // the closest group to the tab is the current one.
    this._allTabs.changes.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.startWith)(this._allTabs)).subscribe(tabs => {
      this._tabs.reset(tabs.filter(tab => {
        return tab._closestTabGroup === this || !tab._closestTabGroup;
      }));
      this._tabs.notifyOnChanges();
    });
  }
  ngOnDestroy() {
    this._tabs.destroy();
    this._tabsSubscription.unsubscribe();
    this._tabLabelSubscription.unsubscribe();
  }
  /** Re-aligns the ink bar to the selected tab element. */
  realignInkBar() {
    if (this._tabHeader) {
      this._tabHeader._alignInkBarToSelectedTab();
    }
  }
  /**
   * Recalculates the tab group's pagination dimensions.
   *
   * WARNING: Calling this method can be very costly in terms of performance. It should be called
   * as infrequently as possible from outside of the Tabs component as it causes a reflow of the
   * page.
   */
  updatePagination() {
    if (this._tabHeader) {
      this._tabHeader.updatePagination();
    }
  }
  /**
   * Sets focus to a particular tab.
   * @param index Index of the tab to be focused.
   */
  focusTab(index) {
    const header = this._tabHeader;
    if (header) {
      header.focusIndex = index;
    }
  }
  _focusChanged(index) {
    this._lastFocusedTabIndex = index;
    this.focusChange.emit(this._createChangeEvent(index));
  }
  _createChangeEvent(index) {
    const event = new MatTabChangeEvent();
    event.index = index;
    if (this._tabs && this._tabs.length) {
      event.tab = this._tabs.toArray()[index];
    }
    return event;
  }
  /**
   * Subscribes to changes in the tab labels. This is needed, because the @Input for the label is
   * on the MatTab component, whereas the data binding is inside the MatTabGroup. In order for the
   * binding to be updated, we need to subscribe to changes in it and trigger change detection
   * manually.
   */
  _subscribeToTabLabels() {
    if (this._tabLabelSubscription) {
      this._tabLabelSubscription.unsubscribe();
    }
    this._tabLabelSubscription = (0,rxjs__WEBPACK_IMPORTED_MODULE_17__.merge)(...this._tabs.map(tab => tab._stateChanges)).subscribe(() => this._changeDetectorRef.markForCheck());
  }
  /** Clamps the given index to the bounds of 0 and the tabs length. */
  _clampTabIndex(index) {
    // Note the `|| 0`, which ensures that values like NaN can't get through
    // and which would otherwise throw the component into an infinite loop
    // (since Math.max(NaN, 0) === NaN).
    return Math.min(this._tabs.length - 1, Math.max(index || 0, 0));
  }
  /** Returns a unique id for each tab label element */
  _getTabLabelId(i) {
    return `mat-tab-label-${this._groupId}-${i}`;
  }
  /** Returns a unique id for each tab content element */
  _getTabContentId(i) {
    return `mat-tab-content-${this._groupId}-${i}`;
  }
  /**
   * Sets the height of the body wrapper to the height of the activating tab if dynamic
   * height property is true.
   */
  _setTabBodyWrapperHeight(tabHeight) {
    if (!this._dynamicHeight || !this._tabBodyWrapperHeight) {
      return;
    }
    const wrapper = this._tabBodyWrapper.nativeElement;
    wrapper.style.height = this._tabBodyWrapperHeight + 'px';
    // This conditional forces the browser to paint the height so that
    // the animation to the new height can have an origin.
    if (this._tabBodyWrapper.nativeElement.offsetHeight) {
      wrapper.style.height = tabHeight + 'px';
    }
  }
  /** Removes the height of the tab body wrapper. */
  _removeTabBodyWrapperHeight() {
    const wrapper = this._tabBodyWrapper.nativeElement;
    this._tabBodyWrapperHeight = wrapper.clientHeight;
    wrapper.style.height = '';
    this.animationDone.emit();
  }
  /** Handle click events, setting new selected index if appropriate. */
  _handleClick(tab, tabHeader, index) {
    tabHeader.focusIndex = index;
    if (!tab.disabled) {
      this.selectedIndex = index;
    }
  }
  /** Retrieves the tabindex for the tab. */
  _getTabIndex(index) {
    const targetIndex = this._lastFocusedTabIndex ?? this.selectedIndex;
    return index === targetIndex ? 0 : -1;
  }
  /** Callback for when the focused state of a tab has changed. */
  _tabFocusChanged(focusOrigin, index) {
    // Mouse/touch focus happens during the `mousedown`/`touchstart` phase which
    // can cause the tab to be moved out from under the pointer, interrupting the
    // click sequence (see #21898). We don't need to scroll the tab into view for
    // such cases anyway, because it will be done when the tab becomes selected.
    if (focusOrigin && focusOrigin !== 'mouse' && focusOrigin !== 'touch') {
      this._tabHeader.focusIndex = index;
    }
  }
}
_class13 = _MatTabGroupBase;
_class13.ɵfac = function _class13_Factory(t) {
  return new (t || _class13)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](MAT_TABS_CONFIG, 8), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ANIMATION_MODULE_TYPE, 8));
};
_class13.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
  type: _class13,
  inputs: {
    dynamicHeight: "dynamicHeight",
    selectedIndex: "selectedIndex",
    headerPosition: "headerPosition",
    animationDuration: "animationDuration",
    contentTabIndex: "contentTabIndex",
    disablePagination: "disablePagination",
    preserveContent: "preserveContent",
    backgroundColor: "backgroundColor"
  },
  outputs: {
    selectedIndexChange: "selectedIndexChange",
    focusChange: "focusChange",
    animationDone: "animationDone",
    selectedTabChange: "selectedTabChange"
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]]
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](_MatTabGroupBase, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Directive
  }], function () {
    return [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectorRef
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Inject,
        args: [MAT_TABS_CONFIG]
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional
      }]
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Inject,
        args: [_angular_core__WEBPACK_IMPORTED_MODULE_0__.ANIMATION_MODULE_TYPE]
      }]
    }];
  }, {
    dynamicHeight: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    selectedIndex: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    headerPosition: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    animationDuration: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    contentTabIndex: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    disablePagination: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    preserveContent: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    backgroundColor: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    selectedIndexChange: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Output
    }],
    focusChange: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Output
    }],
    animationDone: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Output
    }],
    selectedTabChange: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Output
    }]
  });
})();
/**
 * Material design tab-group component. Supports basic tab pairs (label + content) and includes
 * animated ink-bar, keyboard navigation, and screen reader.
 * See: https://material.io/design/components/tabs.html
 */
class MatTabGroup extends _MatTabGroupBase {
  /** Whether the ink bar should fit its width to the size of the tab label content. */
  get fitInkBarToContent() {
    return this._fitInkBarToContent;
  }
  set fitInkBarToContent(v) {
    this._fitInkBarToContent = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_9__.coerceBooleanProperty)(v);
    this._changeDetectorRef.markForCheck();
  }
  /** Whether tabs should be stretched to fill the header. */
  get stretchTabs() {
    return this._stretchTabs;
  }
  set stretchTabs(v) {
    this._stretchTabs = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_9__.coerceBooleanProperty)(v);
  }
  constructor(elementRef, changeDetectorRef, defaultConfig, animationMode) {
    super(elementRef, changeDetectorRef, defaultConfig, animationMode);
    this._fitInkBarToContent = false;
    this._stretchTabs = true;
    this.fitInkBarToContent = defaultConfig && defaultConfig.fitInkBarToContent != null ? defaultConfig.fitInkBarToContent : false;
    this.stretchTabs = defaultConfig && defaultConfig.stretchTabs != null ? defaultConfig.stretchTabs : true;
  }
}
_class14 = MatTabGroup;
_class14.ɵfac = function _class14_Factory(t) {
  return new (t || _class14)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](MAT_TABS_CONFIG, 8), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ANIMATION_MODULE_TYPE, 8));
};
_class14.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: _class14,
  selectors: [["mat-tab-group"]],
  contentQueries: function _class14_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵcontentQuery"](dirIndex, MatTab, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx._allTabs = _t);
    }
  },
  viewQuery: function _class14_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c8, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c9, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx._tabBodyWrapper = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx._tabHeader = _t.first);
    }
  },
  hostAttrs: ["ngSkipHydration", "", 1, "mat-mdc-tab-group"],
  hostVars: 8,
  hostBindings: function _class14_HostBindings(rf, ctx) {
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleProp"]("--mat-tab-animation-duration", ctx.animationDuration);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("mat-mdc-tab-group-dynamic-height", ctx.dynamicHeight)("mat-mdc-tab-group-inverted-header", ctx.headerPosition === "below")("mat-mdc-tab-group-stretch-tabs", ctx.stretchTabs);
    }
  },
  inputs: {
    color: "color",
    disableRipple: "disableRipple",
    fitInkBarToContent: "fitInkBarToContent",
    stretchTabs: ["mat-stretch-tabs", "stretchTabs"]
  },
  exportAs: ["matTabGroup"],
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([{
    provide: MAT_TAB_GROUP,
    useExisting: _class14
  }]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]],
  decls: 6,
  vars: 7,
  consts: [[3, "selectedIndex", "disableRipple", "disablePagination", "indexFocused", "selectFocusedIndex"], ["tabHeader", ""], ["class", "mdc-tab mat-mdc-tab mat-mdc-focus-indicator", "role", "tab", "matTabLabelWrapper", "", "cdkMonitorElementFocus", "", 3, "id", "mdc-tab--active", "ngClass", "disabled", "fitInkBarToContent", "click", "cdkFocusChange", 4, "ngFor", "ngForOf"], [1, "mat-mdc-tab-body-wrapper"], ["tabBodyWrapper", ""], ["role", "tabpanel", 3, "id", "mat-mdc-tab-body-active", "ngClass", "content", "position", "origin", "animationDuration", "preserveContent", "_onCentered", "_onCentering", 4, "ngFor", "ngForOf"], ["role", "tab", "matTabLabelWrapper", "", "cdkMonitorElementFocus", "", 1, "mdc-tab", "mat-mdc-tab", "mat-mdc-focus-indicator", 3, "id", "ngClass", "disabled", "fitInkBarToContent", "click", "cdkFocusChange"], ["tabNode", ""], [1, "mdc-tab__ripple"], ["mat-ripple", "", 1, "mat-mdc-tab-ripple", 3, "matRippleTrigger", "matRippleDisabled"], [1, "mdc-tab__content"], [1, "mdc-tab__text-label"], [3, "ngIf", "ngIfElse"], ["tabTextLabel", ""], [3, "cdkPortalOutlet"], ["role", "tabpanel", 3, "id", "ngClass", "content", "position", "origin", "animationDuration", "preserveContent", "_onCentered", "_onCentering"]],
  template: function _class14_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-tab-header", 0, 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("indexFocused", function _class14_Template_mat_tab_header_indexFocused_0_listener($event) {
        return ctx._focusChanged($event);
      })("selectFocusedIndex", function _class14_Template_mat_tab_header_selectFocusedIndex_0_listener($event) {
        return ctx.selectedIndex = $event;
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, _class14_div_2_Template, 9, 17, "div", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 3, 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, _class14_mat_tab_body_5_Template, 1, 11, "mat-tab-body", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("selectedIndex", ctx.selectedIndex || 0)("disableRipple", ctx.disableRipple)("disablePagination", ctx.disablePagination);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx._tabs);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("_mat-animation-noopable", ctx._animationMode === "NoopAnimations");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx._tabs);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_5__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_5__.NgIf, _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_2__.CdkPortalOutlet, _angular_material_core__WEBPACK_IMPORTED_MODULE_10__.MatRipple, _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_15__.CdkMonitorFocus, MatTabBody, MatTabLabelWrapper, MatTabHeader],
  styles: [".mdc-tab{min-width:90px;padding-right:24px;padding-left:24px;display:flex;flex:1 0 auto;justify-content:center;box-sizing:border-box;margin:0;padding-top:0;padding-bottom:0;border:none;outline:none;text-align:center;white-space:nowrap;cursor:pointer;-webkit-appearance:none;z-index:1}.mdc-tab::-moz-focus-inner{padding:0;border:0}.mdc-tab[hidden]{display:none}.mdc-tab--min-width{flex:0 1 auto}.mdc-tab__content{display:flex;align-items:center;justify-content:center;height:inherit;pointer-events:none}.mdc-tab__text-label{transition:150ms color linear;display:inline-block;line-height:1;z-index:2}.mdc-tab__icon{transition:150ms color linear;z-index:2}.mdc-tab--stacked .mdc-tab__content{flex-direction:column;align-items:center;justify-content:center}.mdc-tab--stacked .mdc-tab__text-label{padding-top:6px;padding-bottom:4px}.mdc-tab--active .mdc-tab__text-label,.mdc-tab--active .mdc-tab__icon{transition-delay:100ms}.mdc-tab:not(.mdc-tab--stacked) .mdc-tab__icon+.mdc-tab__text-label{padding-left:8px;padding-right:0}[dir=rtl] .mdc-tab:not(.mdc-tab--stacked) .mdc-tab__icon+.mdc-tab__text-label,.mdc-tab:not(.mdc-tab--stacked) .mdc-tab__icon+.mdc-tab__text-label[dir=rtl]{padding-left:0;padding-right:8px}.mdc-tab-indicator{display:flex;position:absolute;top:0;left:0;justify-content:center;width:100%;height:100%;pointer-events:none;z-index:1}.mdc-tab-indicator__content{transform-origin:left;opacity:0}.mdc-tab-indicator__content--underline{align-self:flex-end;box-sizing:border-box;width:100%;border-top-style:solid}.mdc-tab-indicator__content--icon{align-self:center;margin:0 auto}.mdc-tab-indicator--active .mdc-tab-indicator__content{opacity:1}.mdc-tab-indicator .mdc-tab-indicator__content{transition:250ms transform cubic-bezier(0.4, 0, 0.2, 1)}.mdc-tab-indicator--no-transition .mdc-tab-indicator__content{transition:none}.mdc-tab-indicator--fade .mdc-tab-indicator__content{transition:150ms opacity linear}.mdc-tab-indicator--active.mdc-tab-indicator--fade .mdc-tab-indicator__content{transition-delay:100ms}.mat-mdc-tab-ripple{position:absolute;top:0;left:0;bottom:0;right:0;pointer-events:none}.mat-mdc-tab{-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-decoration:none;background:none;font-family:var(--mat-tab-header-label-text-font);font-size:var(--mat-tab-header-label-text-size);letter-spacing:var(--mat-tab-header-label-text-tracking);line-height:var(--mat-tab-header-label-text-line-height);font-weight:var(--mat-tab-header-label-text-weight)}.mat-mdc-tab .mdc-tab-indicator__content--underline{border-color:var(--mdc-tab-indicator-active-indicator-color)}.mat-mdc-tab .mdc-tab-indicator__content--underline{border-top-width:var(--mdc-tab-indicator-active-indicator-height)}.mat-mdc-tab .mdc-tab-indicator__content--underline{border-radius:var(--mdc-tab-indicator-active-indicator-shape)}.mat-mdc-tab:not(.mdc-tab--stacked){height:var(--mdc-secondary-navigation-tab-container-height)}.mat-mdc-tab:not(:disabled).mdc-tab--active .mdc-tab__icon{fill:currentColor}.mat-mdc-tab:not(:disabled):hover.mdc-tab--active .mdc-tab__icon{fill:currentColor}.mat-mdc-tab:not(:disabled):focus.mdc-tab--active .mdc-tab__icon{fill:currentColor}.mat-mdc-tab:not(:disabled):active.mdc-tab--active .mdc-tab__icon{fill:currentColor}.mat-mdc-tab:disabled.mdc-tab--active .mdc-tab__icon{fill:currentColor}.mat-mdc-tab:not(:disabled):not(.mdc-tab--active) .mdc-tab__icon{fill:currentColor}.mat-mdc-tab:not(:disabled):hover:not(.mdc-tab--active) .mdc-tab__icon{fill:currentColor}.mat-mdc-tab:not(:disabled):focus:not(.mdc-tab--active) .mdc-tab__icon{fill:currentColor}.mat-mdc-tab:not(:disabled):active:not(.mdc-tab--active) .mdc-tab__icon{fill:currentColor}.mat-mdc-tab:disabled:not(.mdc-tab--active) .mdc-tab__icon{fill:currentColor}.mat-mdc-tab.mdc-tab{flex-grow:0}.mat-mdc-tab:hover .mdc-tab__text-label{color:var(--mat-tab-header-inactive-hover-label-text-color)}.mat-mdc-tab:focus .mdc-tab__text-label{color:var(--mat-tab-header-inactive-focus-label-text-color)}.mat-mdc-tab.mdc-tab--active .mdc-tab__text-label{color:var(--mat-tab-header-active-label-text-color)}.mat-mdc-tab.mdc-tab--active .mdc-tab__ripple::before,.mat-mdc-tab.mdc-tab--active .mat-ripple-element{background-color:var(--mat-tab-header-active-ripple-color)}.mat-mdc-tab.mdc-tab--active:hover .mdc-tab__text-label{color:var(--mat-tab-header-active-hover-label-text-color)}.mat-mdc-tab.mdc-tab--active:hover .mdc-tab-indicator__content--underline{border-color:var(--mat-tab-header-active-hover-indicator-color)}.mat-mdc-tab.mdc-tab--active:focus .mdc-tab__text-label{color:var(--mat-tab-header-active-focus-label-text-color)}.mat-mdc-tab.mdc-tab--active:focus .mdc-tab-indicator__content--underline{border-color:var(--mat-tab-header-active-focus-indicator-color)}.mat-mdc-tab.mat-mdc-tab-disabled{opacity:.4;pointer-events:none}.mat-mdc-tab.mat-mdc-tab-disabled .mdc-tab__content{pointer-events:none}.mat-mdc-tab.mat-mdc-tab-disabled .mdc-tab__ripple::before,.mat-mdc-tab.mat-mdc-tab-disabled .mat-ripple-element{background-color:var(--mat-tab-header-disabled-ripple-color)}.mat-mdc-tab .mdc-tab__ripple::before{content:\"\";display:block;position:absolute;top:0;left:0;right:0;bottom:0;opacity:0;pointer-events:none;background-color:var(--mat-tab-header-inactive-ripple-color)}.mat-mdc-tab .mdc-tab__text-label{color:var(--mat-tab-header-inactive-label-text-color);display:inline-flex;align-items:center}.mat-mdc-tab .mdc-tab__content{position:relative;pointer-events:auto}.mat-mdc-tab:hover .mdc-tab__ripple::before{opacity:.04}.mat-mdc-tab.cdk-program-focused .mdc-tab__ripple::before,.mat-mdc-tab.cdk-keyboard-focused .mdc-tab__ripple::before{opacity:.12}.mat-mdc-tab .mat-ripple-element{opacity:.12;background-color:var(--mat-tab-header-inactive-ripple-color)}.mat-mdc-tab-group.mat-mdc-tab-group-stretch-tabs>.mat-mdc-tab-header .mat-mdc-tab{flex-grow:1}.mat-mdc-tab-group{display:flex;flex-direction:column;max-width:100%}.mat-mdc-tab-group.mat-tabs-with-background>.mat-mdc-tab-header,.mat-mdc-tab-group.mat-tabs-with-background>.mat-mdc-tab-header-pagination{background-color:var(--mat-tab-header-with-background-background-color)}.mat-mdc-tab-group.mat-tabs-with-background.mat-primary>.mat-mdc-tab-header .mat-mdc-tab .mdc-tab__text-label{color:var(--mat-tab-header-with-background-foreground-color)}.mat-mdc-tab-group.mat-tabs-with-background.mat-primary>.mat-mdc-tab-header .mdc-tab-indicator__content--underline{border-color:var(--mat-tab-header-with-background-foreground-color)}.mat-mdc-tab-group.mat-tabs-with-background:not(.mat-primary)>.mat-mdc-tab-header .mat-mdc-tab:not(.mdc-tab--active) .mdc-tab__text-label{color:var(--mat-tab-header-with-background-foreground-color)}.mat-mdc-tab-group.mat-tabs-with-background:not(.mat-primary)>.mat-mdc-tab-header .mat-mdc-tab:not(.mdc-tab--active) .mdc-tab-indicator__content--underline{border-color:var(--mat-tab-header-with-background-foreground-color)}.mat-mdc-tab-group.mat-tabs-with-background>.mat-mdc-tab-header .mat-mdc-tab-header-pagination-chevron,.mat-mdc-tab-group.mat-tabs-with-background>.mat-mdc-tab-header .mat-mdc-focus-indicator::before,.mat-mdc-tab-group.mat-tabs-with-background>.mat-mdc-tab-header-pagination .mat-mdc-tab-header-pagination-chevron,.mat-mdc-tab-group.mat-tabs-with-background>.mat-mdc-tab-header-pagination .mat-mdc-focus-indicator::before{border-color:var(--mat-tab-header-with-background-foreground-color)}.mat-mdc-tab-group.mat-tabs-with-background>.mat-mdc-tab-header .mat-ripple-element,.mat-mdc-tab-group.mat-tabs-with-background>.mat-mdc-tab-header .mdc-tab__ripple::before,.mat-mdc-tab-group.mat-tabs-with-background>.mat-mdc-tab-header-pagination .mat-ripple-element,.mat-mdc-tab-group.mat-tabs-with-background>.mat-mdc-tab-header-pagination .mdc-tab__ripple::before{background-color:var(--mat-tab-header-with-background-foreground-color)}.mat-mdc-tab-group.mat-tabs-with-background>.mat-mdc-tab-header .mat-mdc-tab-header-pagination-chevron,.mat-mdc-tab-group.mat-tabs-with-background>.mat-mdc-tab-header-pagination .mat-mdc-tab-header-pagination-chevron{color:var(--mat-tab-header-with-background-foreground-color)}.mat-mdc-tab-group.mat-mdc-tab-group-inverted-header{flex-direction:column-reverse}.mat-mdc-tab-group.mat-mdc-tab-group-inverted-header .mdc-tab-indicator__content--underline{align-self:flex-start}.mat-mdc-tab-body-wrapper{position:relative;overflow:hidden;display:flex;transition:height 500ms cubic-bezier(0.35, 0, 0.25, 1)}.mat-mdc-tab-body-wrapper._mat-animation-noopable{transition:none !important;animation:none !important}"],
  encapsulation: 2
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MatTabGroup, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Component,
    args: [{
      selector: 'mat-tab-group',
      exportAs: 'matTabGroup',
      encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewEncapsulation.None,
      changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectionStrategy.Default,
      inputs: ['color', 'disableRipple'],
      providers: [{
        provide: MAT_TAB_GROUP,
        useExisting: MatTabGroup
      }],
      host: {
        'ngSkipHydration': '',
        'class': 'mat-mdc-tab-group',
        '[class.mat-mdc-tab-group-dynamic-height]': 'dynamicHeight',
        '[class.mat-mdc-tab-group-inverted-header]': 'headerPosition === "below"',
        '[class.mat-mdc-tab-group-stretch-tabs]': 'stretchTabs',
        '[style.--mat-tab-animation-duration]': 'animationDuration'
      },
      template: "<mat-tab-header #tabHeader\n                [selectedIndex]=\"selectedIndex || 0\"\n                [disableRipple]=\"disableRipple\"\n                [disablePagination]=\"disablePagination\"\n                (indexFocused)=\"_focusChanged($event)\"\n                (selectFocusedIndex)=\"selectedIndex = $event\">\n\n  <div class=\"mdc-tab mat-mdc-tab mat-mdc-focus-indicator\"\n       #tabNode\n       role=\"tab\"\n       matTabLabelWrapper\n       cdkMonitorElementFocus\n       *ngFor=\"let tab of _tabs; let i = index\"\n       [id]=\"_getTabLabelId(i)\"\n       [attr.tabIndex]=\"_getTabIndex(i)\"\n       [attr.aria-posinset]=\"i + 1\"\n       [attr.aria-setsize]=\"_tabs.length\"\n       [attr.aria-controls]=\"_getTabContentId(i)\"\n       [attr.aria-selected]=\"selectedIndex === i\"\n       [attr.aria-label]=\"tab.ariaLabel || null\"\n       [attr.aria-labelledby]=\"(!tab.ariaLabel && tab.ariaLabelledby) ? tab.ariaLabelledby : null\"\n       [class.mdc-tab--active]=\"selectedIndex === i\"\n       [ngClass]=\"tab.labelClass\"\n       [disabled]=\"tab.disabled\"\n       [fitInkBarToContent]=\"fitInkBarToContent\"\n       (click)=\"_handleClick(tab, tabHeader, i)\"\n       (cdkFocusChange)=\"_tabFocusChanged($event, i)\">\n    <span class=\"mdc-tab__ripple\"></span>\n\n    <!-- Needs to be a separate element, because we can't put\n         `overflow: hidden` on tab due to the ink bar. -->\n    <div\n      class=\"mat-mdc-tab-ripple\"\n      mat-ripple\n      [matRippleTrigger]=\"tabNode\"\n      [matRippleDisabled]=\"tab.disabled || disableRipple\"></div>\n\n    <span class=\"mdc-tab__content\">\n      <span class=\"mdc-tab__text-label\">\n        <!-- If there is a label template, use it. -->\n        <ng-template [ngIf]=\"tab.templateLabel\" [ngIfElse]=\"tabTextLabel\">\n          <ng-template [cdkPortalOutlet]=\"tab.templateLabel\"></ng-template>\n        </ng-template>\n\n        <!-- If there is not a label template, fall back to the text label. -->\n        <ng-template #tabTextLabel>{{tab.textLabel}}</ng-template>\n      </span>\n    </span>\n  </div>\n</mat-tab-header>\n\n<div\n  class=\"mat-mdc-tab-body-wrapper\"\n  [class._mat-animation-noopable]=\"_animationMode === 'NoopAnimations'\"\n  #tabBodyWrapper>\n  <mat-tab-body role=\"tabpanel\"\n               *ngFor=\"let tab of _tabs; let i = index\"\n               [id]=\"_getTabContentId(i)\"\n               [attr.tabindex]=\"(contentTabIndex != null && selectedIndex === i) ? contentTabIndex : null\"\n               [attr.aria-labelledby]=\"_getTabLabelId(i)\"\n               [class.mat-mdc-tab-body-active]=\"selectedIndex === i\"\n               [ngClass]=\"tab.bodyClass\"\n               [content]=\"tab.content!\"\n               [position]=\"tab.position!\"\n               [origin]=\"tab.origin\"\n               [animationDuration]=\"animationDuration\"\n               [preserveContent]=\"preserveContent\"\n               (_onCentered)=\"_removeTabBodyWrapperHeight()\"\n               (_onCentering)=\"_setTabBodyWrapperHeight($event)\">\n  </mat-tab-body>\n</div>\n",
      styles: [".mdc-tab{min-width:90px;padding-right:24px;padding-left:24px;display:flex;flex:1 0 auto;justify-content:center;box-sizing:border-box;margin:0;padding-top:0;padding-bottom:0;border:none;outline:none;text-align:center;white-space:nowrap;cursor:pointer;-webkit-appearance:none;z-index:1}.mdc-tab::-moz-focus-inner{padding:0;border:0}.mdc-tab[hidden]{display:none}.mdc-tab--min-width{flex:0 1 auto}.mdc-tab__content{display:flex;align-items:center;justify-content:center;height:inherit;pointer-events:none}.mdc-tab__text-label{transition:150ms color linear;display:inline-block;line-height:1;z-index:2}.mdc-tab__icon{transition:150ms color linear;z-index:2}.mdc-tab--stacked .mdc-tab__content{flex-direction:column;align-items:center;justify-content:center}.mdc-tab--stacked .mdc-tab__text-label{padding-top:6px;padding-bottom:4px}.mdc-tab--active .mdc-tab__text-label,.mdc-tab--active .mdc-tab__icon{transition-delay:100ms}.mdc-tab:not(.mdc-tab--stacked) .mdc-tab__icon+.mdc-tab__text-label{padding-left:8px;padding-right:0}[dir=rtl] .mdc-tab:not(.mdc-tab--stacked) .mdc-tab__icon+.mdc-tab__text-label,.mdc-tab:not(.mdc-tab--stacked) .mdc-tab__icon+.mdc-tab__text-label[dir=rtl]{padding-left:0;padding-right:8px}.mdc-tab-indicator{display:flex;position:absolute;top:0;left:0;justify-content:center;width:100%;height:100%;pointer-events:none;z-index:1}.mdc-tab-indicator__content{transform-origin:left;opacity:0}.mdc-tab-indicator__content--underline{align-self:flex-end;box-sizing:border-box;width:100%;border-top-style:solid}.mdc-tab-indicator__content--icon{align-self:center;margin:0 auto}.mdc-tab-indicator--active .mdc-tab-indicator__content{opacity:1}.mdc-tab-indicator .mdc-tab-indicator__content{transition:250ms transform cubic-bezier(0.4, 0, 0.2, 1)}.mdc-tab-indicator--no-transition .mdc-tab-indicator__content{transition:none}.mdc-tab-indicator--fade .mdc-tab-indicator__content{transition:150ms opacity linear}.mdc-tab-indicator--active.mdc-tab-indicator--fade .mdc-tab-indicator__content{transition-delay:100ms}.mat-mdc-tab-ripple{position:absolute;top:0;left:0;bottom:0;right:0;pointer-events:none}.mat-mdc-tab{-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-decoration:none;background:none;font-family:var(--mat-tab-header-label-text-font);font-size:var(--mat-tab-header-label-text-size);letter-spacing:var(--mat-tab-header-label-text-tracking);line-height:var(--mat-tab-header-label-text-line-height);font-weight:var(--mat-tab-header-label-text-weight)}.mat-mdc-tab .mdc-tab-indicator__content--underline{border-color:var(--mdc-tab-indicator-active-indicator-color)}.mat-mdc-tab .mdc-tab-indicator__content--underline{border-top-width:var(--mdc-tab-indicator-active-indicator-height)}.mat-mdc-tab .mdc-tab-indicator__content--underline{border-radius:var(--mdc-tab-indicator-active-indicator-shape)}.mat-mdc-tab:not(.mdc-tab--stacked){height:var(--mdc-secondary-navigation-tab-container-height)}.mat-mdc-tab:not(:disabled).mdc-tab--active .mdc-tab__icon{fill:currentColor}.mat-mdc-tab:not(:disabled):hover.mdc-tab--active .mdc-tab__icon{fill:currentColor}.mat-mdc-tab:not(:disabled):focus.mdc-tab--active .mdc-tab__icon{fill:currentColor}.mat-mdc-tab:not(:disabled):active.mdc-tab--active .mdc-tab__icon{fill:currentColor}.mat-mdc-tab:disabled.mdc-tab--active .mdc-tab__icon{fill:currentColor}.mat-mdc-tab:not(:disabled):not(.mdc-tab--active) .mdc-tab__icon{fill:currentColor}.mat-mdc-tab:not(:disabled):hover:not(.mdc-tab--active) .mdc-tab__icon{fill:currentColor}.mat-mdc-tab:not(:disabled):focus:not(.mdc-tab--active) .mdc-tab__icon{fill:currentColor}.mat-mdc-tab:not(:disabled):active:not(.mdc-tab--active) .mdc-tab__icon{fill:currentColor}.mat-mdc-tab:disabled:not(.mdc-tab--active) .mdc-tab__icon{fill:currentColor}.mat-mdc-tab.mdc-tab{flex-grow:0}.mat-mdc-tab:hover .mdc-tab__text-label{color:var(--mat-tab-header-inactive-hover-label-text-color)}.mat-mdc-tab:focus .mdc-tab__text-label{color:var(--mat-tab-header-inactive-focus-label-text-color)}.mat-mdc-tab.mdc-tab--active .mdc-tab__text-label{color:var(--mat-tab-header-active-label-text-color)}.mat-mdc-tab.mdc-tab--active .mdc-tab__ripple::before,.mat-mdc-tab.mdc-tab--active .mat-ripple-element{background-color:var(--mat-tab-header-active-ripple-color)}.mat-mdc-tab.mdc-tab--active:hover .mdc-tab__text-label{color:var(--mat-tab-header-active-hover-label-text-color)}.mat-mdc-tab.mdc-tab--active:hover .mdc-tab-indicator__content--underline{border-color:var(--mat-tab-header-active-hover-indicator-color)}.mat-mdc-tab.mdc-tab--active:focus .mdc-tab__text-label{color:var(--mat-tab-header-active-focus-label-text-color)}.mat-mdc-tab.mdc-tab--active:focus .mdc-tab-indicator__content--underline{border-color:var(--mat-tab-header-active-focus-indicator-color)}.mat-mdc-tab.mat-mdc-tab-disabled{opacity:.4;pointer-events:none}.mat-mdc-tab.mat-mdc-tab-disabled .mdc-tab__content{pointer-events:none}.mat-mdc-tab.mat-mdc-tab-disabled .mdc-tab__ripple::before,.mat-mdc-tab.mat-mdc-tab-disabled .mat-ripple-element{background-color:var(--mat-tab-header-disabled-ripple-color)}.mat-mdc-tab .mdc-tab__ripple::before{content:\"\";display:block;position:absolute;top:0;left:0;right:0;bottom:0;opacity:0;pointer-events:none;background-color:var(--mat-tab-header-inactive-ripple-color)}.mat-mdc-tab .mdc-tab__text-label{color:var(--mat-tab-header-inactive-label-text-color);display:inline-flex;align-items:center}.mat-mdc-tab .mdc-tab__content{position:relative;pointer-events:auto}.mat-mdc-tab:hover .mdc-tab__ripple::before{opacity:.04}.mat-mdc-tab.cdk-program-focused .mdc-tab__ripple::before,.mat-mdc-tab.cdk-keyboard-focused .mdc-tab__ripple::before{opacity:.12}.mat-mdc-tab .mat-ripple-element{opacity:.12;background-color:var(--mat-tab-header-inactive-ripple-color)}.mat-mdc-tab-group.mat-mdc-tab-group-stretch-tabs>.mat-mdc-tab-header .mat-mdc-tab{flex-grow:1}.mat-mdc-tab-group{display:flex;flex-direction:column;max-width:100%}.mat-mdc-tab-group.mat-tabs-with-background>.mat-mdc-tab-header,.mat-mdc-tab-group.mat-tabs-with-background>.mat-mdc-tab-header-pagination{background-color:var(--mat-tab-header-with-background-background-color)}.mat-mdc-tab-group.mat-tabs-with-background.mat-primary>.mat-mdc-tab-header .mat-mdc-tab .mdc-tab__text-label{color:var(--mat-tab-header-with-background-foreground-color)}.mat-mdc-tab-group.mat-tabs-with-background.mat-primary>.mat-mdc-tab-header .mdc-tab-indicator__content--underline{border-color:var(--mat-tab-header-with-background-foreground-color)}.mat-mdc-tab-group.mat-tabs-with-background:not(.mat-primary)>.mat-mdc-tab-header .mat-mdc-tab:not(.mdc-tab--active) .mdc-tab__text-label{color:var(--mat-tab-header-with-background-foreground-color)}.mat-mdc-tab-group.mat-tabs-with-background:not(.mat-primary)>.mat-mdc-tab-header .mat-mdc-tab:not(.mdc-tab--active) .mdc-tab-indicator__content--underline{border-color:var(--mat-tab-header-with-background-foreground-color)}.mat-mdc-tab-group.mat-tabs-with-background>.mat-mdc-tab-header .mat-mdc-tab-header-pagination-chevron,.mat-mdc-tab-group.mat-tabs-with-background>.mat-mdc-tab-header .mat-mdc-focus-indicator::before,.mat-mdc-tab-group.mat-tabs-with-background>.mat-mdc-tab-header-pagination .mat-mdc-tab-header-pagination-chevron,.mat-mdc-tab-group.mat-tabs-with-background>.mat-mdc-tab-header-pagination .mat-mdc-focus-indicator::before{border-color:var(--mat-tab-header-with-background-foreground-color)}.mat-mdc-tab-group.mat-tabs-with-background>.mat-mdc-tab-header .mat-ripple-element,.mat-mdc-tab-group.mat-tabs-with-background>.mat-mdc-tab-header .mdc-tab__ripple::before,.mat-mdc-tab-group.mat-tabs-with-background>.mat-mdc-tab-header-pagination .mat-ripple-element,.mat-mdc-tab-group.mat-tabs-with-background>.mat-mdc-tab-header-pagination .mdc-tab__ripple::before{background-color:var(--mat-tab-header-with-background-foreground-color)}.mat-mdc-tab-group.mat-tabs-with-background>.mat-mdc-tab-header .mat-mdc-tab-header-pagination-chevron,.mat-mdc-tab-group.mat-tabs-with-background>.mat-mdc-tab-header-pagination .mat-mdc-tab-header-pagination-chevron{color:var(--mat-tab-header-with-background-foreground-color)}.mat-mdc-tab-group.mat-mdc-tab-group-inverted-header{flex-direction:column-reverse}.mat-mdc-tab-group.mat-mdc-tab-group-inverted-header .mdc-tab-indicator__content--underline{align-self:flex-start}.mat-mdc-tab-body-wrapper{position:relative;overflow:hidden;display:flex;transition:height 500ms cubic-bezier(0.35, 0, 0.25, 1)}.mat-mdc-tab-body-wrapper._mat-animation-noopable{transition:none !important;animation:none !important}"]
    }]
  }], function () {
    return [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectorRef
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Inject,
        args: [MAT_TABS_CONFIG]
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional
      }]
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Inject,
        args: [_angular_core__WEBPACK_IMPORTED_MODULE_0__.ANIMATION_MODULE_TYPE]
      }]
    }];
  }, {
    _allTabs: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ContentChildren,
      args: [MatTab, {
        descendants: true
      }]
    }],
    _tabBodyWrapper: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewChild,
      args: ['tabBodyWrapper']
    }],
    _tabHeader: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewChild,
      args: ['tabHeader']
    }],
    fitInkBarToContent: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    stretchTabs: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input,
      args: ['mat-stretch-tabs']
    }]
  });
})();
/** A simple change event emitted on focus or selection changes. */
class MatTabChangeEvent {}

// Increasing integer for generating unique ids for tab nav components.
let nextUniqueId = 0;
/**
 * Base class with all of the `MatTabNav` functionality.
 * @docs-private
 */
class _MatTabNavBase extends MatPaginatedTabHeader {
  /** Background color of the tab nav. */
  get backgroundColor() {
    return this._backgroundColor;
  }
  set backgroundColor(value) {
    const classList = this._elementRef.nativeElement.classList;
    classList.remove('mat-tabs-with-background', `mat-background-${this.backgroundColor}`);
    if (value) {
      classList.add('mat-tabs-with-background', `mat-background-${value}`);
    }
    this._backgroundColor = value;
  }
  /** Whether the ripple effect is disabled or not. */
  get disableRipple() {
    return this._disableRipple;
  }
  set disableRipple(value) {
    this._disableRipple = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_9__.coerceBooleanProperty)(value);
  }
  constructor(elementRef, dir, ngZone, changeDetectorRef, viewportRuler, platform, animationMode) {
    super(elementRef, changeDetectorRef, viewportRuler, dir, ngZone, platform, animationMode);
    this._disableRipple = false;
    /** Theme color of the nav bar. */
    this.color = 'primary';
  }
  _itemSelected() {
    // noop
  }
  ngAfterContentInit() {
    // We need this to run before the `changes` subscription in parent to ensure that the
    // selectedIndex is up-to-date by the time the super class starts looking for it.
    this._items.changes.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.startWith)(null), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_13__.takeUntil)(this._destroyed)).subscribe(() => {
      this.updateActiveLink();
    });
    super.ngAfterContentInit();
  }
  /** Notifies the component that the active link has been changed. */
  updateActiveLink() {
    if (!this._items) {
      return;
    }
    const items = this._items.toArray();
    for (let i = 0; i < items.length; i++) {
      if (items[i].active) {
        this.selectedIndex = i;
        this._changeDetectorRef.markForCheck();
        if (this.tabPanel) {
          this.tabPanel._activeTabId = items[i].id;
        }
        return;
      }
    }
    // The ink bar should hide itself if no items are active.
    this.selectedIndex = -1;
    this._inkBar.hide();
  }
  _getRole() {
    return this.tabPanel ? 'tablist' : this._elementRef.nativeElement.getAttribute('role');
  }
}
_class15 = _MatTabNavBase;
_class15.ɵfac = function _class15_Factory(t) {
  return new (t || _class15)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_8__.Directionality, 8), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.NgZone), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_25__.ViewportRuler), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_11__.Platform), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ANIMATION_MODULE_TYPE, 8));
};
_class15.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
  type: _class15,
  inputs: {
    backgroundColor: "backgroundColor",
    disableRipple: "disableRipple",
    color: "color",
    tabPanel: "tabPanel"
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]]
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](_MatTabNavBase, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Directive
  }], function () {
    return [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef
    }, {
      type: _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_8__.Directionality,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional
      }]
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.NgZone
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectorRef
    }, {
      type: _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_25__.ViewportRuler
    }, {
      type: _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_11__.Platform
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Inject,
        args: [_angular_core__WEBPACK_IMPORTED_MODULE_0__.ANIMATION_MODULE_TYPE]
      }]
    }];
  }, {
    backgroundColor: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    disableRipple: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    color: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    tabPanel: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }]
  });
})();
// Boilerplate for applying mixins to MatTabLink.
const _MatTabLinkMixinBase = (0,_angular_material_core__WEBPACK_IMPORTED_MODULE_10__.mixinTabIndex)((0,_angular_material_core__WEBPACK_IMPORTED_MODULE_10__.mixinDisableRipple)((0,_angular_material_core__WEBPACK_IMPORTED_MODULE_10__.mixinDisabled)(class {})));
/** Base class with all of the `MatTabLink` functionality. */
class _MatTabLinkBase extends _MatTabLinkMixinBase {
  /** Whether the link is active. */
  get active() {
    return this._isActive;
  }
  set active(value) {
    const newValue = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_9__.coerceBooleanProperty)(value);
    if (newValue !== this._isActive) {
      this._isActive = newValue;
      this._tabNavBar.updateActiveLink();
    }
  }
  /**
   * Whether ripples are disabled on interaction.
   * @docs-private
   */
  get rippleDisabled() {
    return this.disabled || this.disableRipple || this._tabNavBar.disableRipple || !!this.rippleConfig.disabled;
  }
  constructor(_tabNavBar, /** @docs-private */elementRef, globalRippleOptions, tabIndex, _focusMonitor, animationMode) {
    super();
    this._tabNavBar = _tabNavBar;
    this.elementRef = elementRef;
    this._focusMonitor = _focusMonitor;
    /** Whether the tab link is active or not. */
    this._isActive = false;
    /** Unique id for the tab. */
    this.id = `mat-tab-link-${nextUniqueId++}`;
    this.rippleConfig = globalRippleOptions || {};
    this.tabIndex = parseInt(tabIndex) || 0;
    if (animationMode === 'NoopAnimations') {
      this.rippleConfig.animation = {
        enterDuration: 0,
        exitDuration: 0
      };
    }
  }
  /** Focuses the tab link. */
  focus() {
    this.elementRef.nativeElement.focus();
  }
  ngAfterViewInit() {
    this._focusMonitor.monitor(this.elementRef);
  }
  ngOnDestroy() {
    this._focusMonitor.stopMonitoring(this.elementRef);
  }
  _handleFocus() {
    // Since we allow navigation through tabbing in the nav bar, we
    // have to update the focused index whenever the link receives focus.
    this._tabNavBar.focusIndex = this._tabNavBar._items.toArray().indexOf(this);
  }
  _handleKeydown(event) {
    if (this.disabled && (event.keyCode === _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_23__.SPACE || event.keyCode === _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_23__.ENTER)) {
      event.preventDefault();
    } else if (this._tabNavBar.tabPanel && event.keyCode === _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_23__.SPACE) {
      this.elementRef.nativeElement.click();
    }
  }
  _getAriaControls() {
    return this._tabNavBar.tabPanel ? this._tabNavBar.tabPanel?.id : this.elementRef.nativeElement.getAttribute('aria-controls');
  }
  _getAriaSelected() {
    if (this._tabNavBar.tabPanel) {
      return this.active ? 'true' : 'false';
    } else {
      return this.elementRef.nativeElement.getAttribute('aria-selected');
    }
  }
  _getAriaCurrent() {
    return this.active && !this._tabNavBar.tabPanel ? 'page' : null;
  }
  _getRole() {
    return this._tabNavBar.tabPanel ? 'tab' : this.elementRef.nativeElement.getAttribute('role');
  }
  _getTabIndex() {
    if (this._tabNavBar.tabPanel) {
      return this._isActive && !this.disabled ? 0 : -1;
    } else {
      return this.tabIndex;
    }
  }
}
_class16 = _MatTabLinkBase;
_class16.ɵfac = function _class16_Factory(t) {
  return new (t || _class16)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_MatTabNavBase), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_core__WEBPACK_IMPORTED_MODULE_10__.MAT_RIPPLE_GLOBAL_OPTIONS, 8), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinjectAttribute"]('tabindex'), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_15__.FocusMonitor), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ANIMATION_MODULE_TYPE, 8));
};
_class16.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
  type: _class16,
  inputs: {
    active: "active",
    id: "id"
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]]
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](_MatTabLinkBase, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Directive
  }], function () {
    return [{
      type: _MatTabNavBase
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Inject,
        args: [_angular_material_core__WEBPACK_IMPORTED_MODULE_10__.MAT_RIPPLE_GLOBAL_OPTIONS]
      }]
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Attribute,
        args: ['tabindex']
      }]
    }, {
      type: _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_15__.FocusMonitor
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Inject,
        args: [_angular_core__WEBPACK_IMPORTED_MODULE_0__.ANIMATION_MODULE_TYPE]
      }]
    }];
  }, {
    active: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    id: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }]
  });
})();
const _MatTabLinkBaseWithInkBarItem = mixinInkBarItem(_MatTabLinkBase);
/**
 * Navigation component matching the styles of the tab group header.
 * Provides anchored navigation with animated ink bar.
 */
class MatTabNav extends _MatTabNavBase {
  /** Whether the ink bar should fit its width to the size of the tab label content. */
  get fitInkBarToContent() {
    return this._fitInkBarToContent.value;
  }
  set fitInkBarToContent(v) {
    this._fitInkBarToContent.next((0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_9__.coerceBooleanProperty)(v));
    this._changeDetectorRef.markForCheck();
  }
  /** Whether tabs should be stretched to fill the header. */
  get stretchTabs() {
    return this._stretchTabs;
  }
  set stretchTabs(v) {
    this._stretchTabs = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_9__.coerceBooleanProperty)(v);
  }
  get animationDuration() {
    return this._animationDuration;
  }
  set animationDuration(value) {
    this._animationDuration = /^\d+$/.test(value + '') ? value + 'ms' : value;
  }
  constructor(elementRef, dir, ngZone, changeDetectorRef, viewportRuler, platform, animationMode, defaultConfig) {
    super(elementRef, dir, ngZone, changeDetectorRef, viewportRuler, platform, animationMode);
    this._fitInkBarToContent = new rxjs__WEBPACK_IMPORTED_MODULE_27__.BehaviorSubject(false);
    this._stretchTabs = true;
    this.disablePagination = defaultConfig && defaultConfig.disablePagination != null ? defaultConfig.disablePagination : false;
    this.fitInkBarToContent = defaultConfig && defaultConfig.fitInkBarToContent != null ? defaultConfig.fitInkBarToContent : false;
    this.stretchTabs = defaultConfig && defaultConfig.stretchTabs != null ? defaultConfig.stretchTabs : true;
  }
  ngAfterContentInit() {
    this._inkBar = new MatInkBar(this._items);
    super.ngAfterContentInit();
  }
  ngAfterViewInit() {
    if (!this.tabPanel && (typeof ngDevMode === 'undefined' || ngDevMode)) {
      throw new Error('A mat-tab-nav-panel must be specified via [tabPanel].');
    }
    super.ngAfterViewInit();
  }
}
_class17 = MatTabNav;
_class17.ɵfac = function _class17_Factory(t) {
  return new (t || _class17)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_8__.Directionality, 8), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.NgZone), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_25__.ViewportRuler), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_11__.Platform), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ANIMATION_MODULE_TYPE, 8), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](MAT_TABS_CONFIG, 8));
};
_class17.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: _class17,
  selectors: [["", "mat-tab-nav-bar", ""]],
  contentQueries: function _class17_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵcontentQuery"](dirIndex, MatTabLink, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx._items = _t);
    }
  },
  viewQuery: function _class17_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c3, 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c4, 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c5, 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c6, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c7, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx._tabListContainer = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx._tabList = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx._tabListInner = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx._nextPaginator = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx._previousPaginator = _t.first);
    }
  },
  hostAttrs: [1, "mat-mdc-tab-nav-bar", "mat-mdc-tab-header"],
  hostVars: 17,
  hostBindings: function _class17_HostBindings(rf, ctx) {
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattribute"]("role", ctx._getRole());
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleProp"]("--mat-tab-animation-duration", ctx.animationDuration);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("mat-mdc-tab-header-pagination-controls-enabled", ctx._showPaginationControls)("mat-mdc-tab-header-rtl", ctx._getLayoutDirection() == "rtl")("mat-mdc-tab-nav-bar-stretch-tabs", ctx.stretchTabs)("mat-primary", ctx.color !== "warn" && ctx.color !== "accent")("mat-accent", ctx.color === "accent")("mat-warn", ctx.color === "warn")("_mat-animation-noopable", ctx._animationMode === "NoopAnimations");
    }
  },
  inputs: {
    color: "color",
    fitInkBarToContent: "fitInkBarToContent",
    stretchTabs: ["mat-stretch-tabs", "stretchTabs"],
    animationDuration: "animationDuration"
  },
  exportAs: ["matTabNavBar", "matTabNav"],
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]],
  attrs: _c10,
  ngContentSelectors: _c2,
  decls: 13,
  vars: 8,
  consts: [["aria-hidden", "true", "type", "button", "mat-ripple", "", "tabindex", "-1", 1, "mat-mdc-tab-header-pagination", "mat-mdc-tab-header-pagination-before", 3, "matRippleDisabled", "disabled", "click", "mousedown", "touchend"], ["previousPaginator", ""], [1, "mat-mdc-tab-header-pagination-chevron"], [1, "mat-mdc-tab-link-container", 3, "keydown"], ["tabListContainer", ""], [1, "mat-mdc-tab-list", 3, "cdkObserveContent"], ["tabList", ""], [1, "mat-mdc-tab-links"], ["tabListInner", ""], ["aria-hidden", "true", "type", "button", "mat-ripple", "", "tabindex", "-1", 1, "mat-mdc-tab-header-pagination", "mat-mdc-tab-header-pagination-after", 3, "matRippleDisabled", "disabled", "mousedown", "click", "touchend"], ["nextPaginator", ""]],
  template: function _class17_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojectionDef"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 0, 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function _class17_Template_button_click_0_listener() {
        return ctx._handlePaginatorClick("before");
      })("mousedown", function _class17_Template_button_mousedown_0_listener($event) {
        return ctx._handlePaginatorPress("before", $event);
      })("touchend", function _class17_Template_button_touchend_0_listener() {
        return ctx._stopInterval();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "div", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 3, 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("keydown", function _class17_Template_div_keydown_3_listener($event) {
        return ctx._handleKeydown($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 5, 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("cdkObserveContent", function _class17_Template_div_cdkObserveContent_5_listener() {
        return ctx._onContentChanges();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 7, 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](9);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "button", 9, 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("mousedown", function _class17_Template_button_mousedown_10_listener($event) {
        return ctx._handlePaginatorPress("after", $event);
      })("click", function _class17_Template_button_click_10_listener() {
        return ctx._handlePaginatorClick("after");
      })("touchend", function _class17_Template_button_touchend_10_listener() {
        return ctx._stopInterval();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](12, "div", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("mat-mdc-tab-header-pagination-disabled", ctx._disableScrollBefore);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("matRippleDisabled", ctx._disableScrollBefore || ctx.disableRipple)("disabled", ctx._disableScrollBefore || null);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](10);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("mat-mdc-tab-header-pagination-disabled", ctx._disableScrollAfter);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("matRippleDisabled", ctx._disableScrollAfter || ctx.disableRipple)("disabled", ctx._disableScrollAfter || null);
    }
  },
  dependencies: [_angular_material_core__WEBPACK_IMPORTED_MODULE_10__.MatRipple, _angular_cdk_observers__WEBPACK_IMPORTED_MODULE_26__.CdkObserveContent],
  styles: [".mdc-tab{min-width:90px;padding-right:24px;padding-left:24px;display:flex;flex:1 0 auto;justify-content:center;box-sizing:border-box;margin:0;padding-top:0;padding-bottom:0;border:none;outline:none;text-align:center;white-space:nowrap;cursor:pointer;-webkit-appearance:none;z-index:1}.mdc-tab::-moz-focus-inner{padding:0;border:0}.mdc-tab[hidden]{display:none}.mdc-tab--min-width{flex:0 1 auto}.mdc-tab__content{display:flex;align-items:center;justify-content:center;height:inherit;pointer-events:none}.mdc-tab__text-label{transition:150ms color linear;display:inline-block;line-height:1;z-index:2}.mdc-tab__icon{transition:150ms color linear;z-index:2}.mdc-tab--stacked .mdc-tab__content{flex-direction:column;align-items:center;justify-content:center}.mdc-tab--stacked .mdc-tab__text-label{padding-top:6px;padding-bottom:4px}.mdc-tab--active .mdc-tab__text-label,.mdc-tab--active .mdc-tab__icon{transition-delay:100ms}.mdc-tab:not(.mdc-tab--stacked) .mdc-tab__icon+.mdc-tab__text-label{padding-left:8px;padding-right:0}[dir=rtl] .mdc-tab:not(.mdc-tab--stacked) .mdc-tab__icon+.mdc-tab__text-label,.mdc-tab:not(.mdc-tab--stacked) .mdc-tab__icon+.mdc-tab__text-label[dir=rtl]{padding-left:0;padding-right:8px}.mdc-tab-indicator{display:flex;position:absolute;top:0;left:0;justify-content:center;width:100%;height:100%;pointer-events:none;z-index:1}.mdc-tab-indicator__content{transform-origin:left;opacity:0}.mdc-tab-indicator__content--underline{align-self:flex-end;box-sizing:border-box;width:100%;border-top-style:solid}.mdc-tab-indicator__content--icon{align-self:center;margin:0 auto}.mdc-tab-indicator--active .mdc-tab-indicator__content{opacity:1}.mdc-tab-indicator .mdc-tab-indicator__content{transition:250ms transform cubic-bezier(0.4, 0, 0.2, 1)}.mdc-tab-indicator--no-transition .mdc-tab-indicator__content{transition:none}.mdc-tab-indicator--fade .mdc-tab-indicator__content{transition:150ms opacity linear}.mdc-tab-indicator--active.mdc-tab-indicator--fade .mdc-tab-indicator__content{transition-delay:100ms}.mat-mdc-tab-ripple{position:absolute;top:0;left:0;bottom:0;right:0;pointer-events:none}.mat-mdc-tab-header{display:flex;overflow:hidden;position:relative;flex-shrink:0;--mdc-tab-indicator-active-indicator-height:2px;--mdc-tab-indicator-active-indicator-shape:0;--mdc-secondary-navigation-tab-container-height:48px}.mdc-tab-indicator .mdc-tab-indicator__content{transition-duration:var(--mat-tab-animation-duration, 250ms)}.mat-mdc-tab-header-pagination{-webkit-user-select:none;user-select:none;position:relative;display:none;justify-content:center;align-items:center;min-width:32px;cursor:pointer;z-index:2;-webkit-tap-highlight-color:rgba(0,0,0,0);touch-action:none;box-sizing:content-box;background:none;border:none;outline:0;padding:0}.mat-mdc-tab-header-pagination::-moz-focus-inner{border:0}.mat-mdc-tab-header-pagination .mat-ripple-element{opacity:.12;background-color:var(--mat-tab-header-inactive-ripple-color)}.mat-mdc-tab-header-pagination-controls-enabled .mat-mdc-tab-header-pagination{display:flex}.mat-mdc-tab-header-pagination-before,.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-after{padding-left:4px}.mat-mdc-tab-header-pagination-before .mat-mdc-tab-header-pagination-chevron,.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-after .mat-mdc-tab-header-pagination-chevron{transform:rotate(-135deg)}.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-before,.mat-mdc-tab-header-pagination-after{padding-right:4px}.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-before .mat-mdc-tab-header-pagination-chevron,.mat-mdc-tab-header-pagination-after .mat-mdc-tab-header-pagination-chevron{transform:rotate(45deg)}.mat-mdc-tab-header-pagination-chevron{border-style:solid;border-width:2px 2px 0 0;height:8px;width:8px;border-color:var(--mat-tab-header-pagination-icon-color)}.mat-mdc-tab-header-pagination-disabled{box-shadow:none;cursor:default;pointer-events:none}.mat-mdc-tab-header-pagination-disabled .mat-mdc-tab-header-pagination-chevron{opacity:.4}.mat-mdc-tab-list{flex-grow:1;position:relative;transition:transform 500ms cubic-bezier(0.35, 0, 0.25, 1)}._mat-animation-noopable .mat-mdc-tab-list{transition:none}._mat-animation-noopable span.mdc-tab-indicator__content,._mat-animation-noopable span.mdc-tab__text-label{transition:none}.mat-mdc-tab-links{display:flex;flex:1 0 auto}[mat-align-tabs=center]>.mat-mdc-tab-link-container .mat-mdc-tab-links{justify-content:center}[mat-align-tabs=end]>.mat-mdc-tab-link-container .mat-mdc-tab-links{justify-content:flex-end}.mat-mdc-tab-link-container{display:flex;flex-grow:1;overflow:hidden;z-index:1}.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-link-container,.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-header-pagination{background-color:var(--mat-tab-header-with-background-background-color)}.mat-mdc-tab-nav-bar.mat-tabs-with-background.mat-primary>.mat-mdc-tab-link-container .mat-mdc-tab-link .mdc-tab__text-label{color:var(--mat-tab-header-with-background-foreground-color)}.mat-mdc-tab-nav-bar.mat-tabs-with-background.mat-primary>.mat-mdc-tab-link-container .mdc-tab-indicator__content--underline{border-color:var(--mat-tab-header-with-background-foreground-color)}.mat-mdc-tab-nav-bar.mat-tabs-with-background:not(.mat-primary)>.mat-mdc-tab-link-container .mat-mdc-tab-link:not(.mdc-tab--active) .mdc-tab__text-label{color:var(--mat-tab-header-with-background-foreground-color)}.mat-mdc-tab-nav-bar.mat-tabs-with-background:not(.mat-primary)>.mat-mdc-tab-link-container .mat-mdc-tab-link:not(.mdc-tab--active) .mdc-tab-indicator__content--underline{border-color:var(--mat-tab-header-with-background-foreground-color)}.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-link-container .mat-mdc-tab-header-pagination-chevron,.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-link-container .mat-mdc-focus-indicator::before,.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-header-pagination .mat-mdc-tab-header-pagination-chevron,.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-header-pagination .mat-mdc-focus-indicator::before{border-color:var(--mat-tab-header-with-background-foreground-color)}.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-link-container .mat-ripple-element,.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-link-container .mdc-tab__ripple::before,.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-header-pagination .mat-ripple-element,.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-header-pagination .mdc-tab__ripple::before{background-color:var(--mat-tab-header-with-background-foreground-color)}.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-link-container .mat-mdc-tab-header-pagination-chevron,.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-header-pagination .mat-mdc-tab-header-pagination-chevron{color:var(--mat-tab-header-with-background-foreground-color)}"],
  encapsulation: 2
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MatTabNav, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Component,
    args: [{
      selector: '[mat-tab-nav-bar]',
      exportAs: 'matTabNavBar, matTabNav',
      inputs: ['color'],
      host: {
        '[attr.role]': '_getRole()',
        'class': 'mat-mdc-tab-nav-bar mat-mdc-tab-header',
        '[class.mat-mdc-tab-header-pagination-controls-enabled]': '_showPaginationControls',
        '[class.mat-mdc-tab-header-rtl]': "_getLayoutDirection() == 'rtl'",
        '[class.mat-mdc-tab-nav-bar-stretch-tabs]': 'stretchTabs',
        '[class.mat-primary]': 'color !== "warn" && color !== "accent"',
        '[class.mat-accent]': 'color === "accent"',
        '[class.mat-warn]': 'color === "warn"',
        '[class._mat-animation-noopable]': '_animationMode === "NoopAnimations"',
        '[style.--mat-tab-animation-duration]': 'animationDuration'
      },
      encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewEncapsulation.None,
      changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectionStrategy.Default,
      template: "<!-- TODO: this also had `mat-elevation-z4`. Figure out what we should do with it. -->\n<button class=\"mat-mdc-tab-header-pagination mat-mdc-tab-header-pagination-before\"\n     #previousPaginator\n     aria-hidden=\"true\"\n     type=\"button\"\n     mat-ripple\n     tabindex=\"-1\"\n     [matRippleDisabled]=\"_disableScrollBefore || disableRipple\"\n     [class.mat-mdc-tab-header-pagination-disabled]=\"_disableScrollBefore\"\n     [disabled]=\"_disableScrollBefore || null\"\n     (click)=\"_handlePaginatorClick('before')\"\n     (mousedown)=\"_handlePaginatorPress('before', $event)\"\n     (touchend)=\"_stopInterval()\">\n  <div class=\"mat-mdc-tab-header-pagination-chevron\"></div>\n</button>\n\n<div class=\"mat-mdc-tab-link-container\" #tabListContainer (keydown)=\"_handleKeydown($event)\">\n  <div class=\"mat-mdc-tab-list\" #tabList (cdkObserveContent)=\"_onContentChanges()\">\n    <div class=\"mat-mdc-tab-links\" #tabListInner>\n      <ng-content></ng-content>\n    </div>\n  </div>\n</div>\n\n<!-- TODO: this also had `mat-elevation-z4`. Figure out what we should do with it. -->\n<button class=\"mat-mdc-tab-header-pagination mat-mdc-tab-header-pagination-after\"\n     #nextPaginator\n     aria-hidden=\"true\"\n     type=\"button\"\n     mat-ripple\n     [matRippleDisabled]=\"_disableScrollAfter || disableRipple\"\n     [class.mat-mdc-tab-header-pagination-disabled]=\"_disableScrollAfter\"\n     [disabled]=\"_disableScrollAfter || null\"\n     tabindex=\"-1\"\n     (mousedown)=\"_handlePaginatorPress('after', $event)\"\n     (click)=\"_handlePaginatorClick('after')\"\n     (touchend)=\"_stopInterval()\">\n  <div class=\"mat-mdc-tab-header-pagination-chevron\"></div>\n</button>\n",
      styles: [".mdc-tab{min-width:90px;padding-right:24px;padding-left:24px;display:flex;flex:1 0 auto;justify-content:center;box-sizing:border-box;margin:0;padding-top:0;padding-bottom:0;border:none;outline:none;text-align:center;white-space:nowrap;cursor:pointer;-webkit-appearance:none;z-index:1}.mdc-tab::-moz-focus-inner{padding:0;border:0}.mdc-tab[hidden]{display:none}.mdc-tab--min-width{flex:0 1 auto}.mdc-tab__content{display:flex;align-items:center;justify-content:center;height:inherit;pointer-events:none}.mdc-tab__text-label{transition:150ms color linear;display:inline-block;line-height:1;z-index:2}.mdc-tab__icon{transition:150ms color linear;z-index:2}.mdc-tab--stacked .mdc-tab__content{flex-direction:column;align-items:center;justify-content:center}.mdc-tab--stacked .mdc-tab__text-label{padding-top:6px;padding-bottom:4px}.mdc-tab--active .mdc-tab__text-label,.mdc-tab--active .mdc-tab__icon{transition-delay:100ms}.mdc-tab:not(.mdc-tab--stacked) .mdc-tab__icon+.mdc-tab__text-label{padding-left:8px;padding-right:0}[dir=rtl] .mdc-tab:not(.mdc-tab--stacked) .mdc-tab__icon+.mdc-tab__text-label,.mdc-tab:not(.mdc-tab--stacked) .mdc-tab__icon+.mdc-tab__text-label[dir=rtl]{padding-left:0;padding-right:8px}.mdc-tab-indicator{display:flex;position:absolute;top:0;left:0;justify-content:center;width:100%;height:100%;pointer-events:none;z-index:1}.mdc-tab-indicator__content{transform-origin:left;opacity:0}.mdc-tab-indicator__content--underline{align-self:flex-end;box-sizing:border-box;width:100%;border-top-style:solid}.mdc-tab-indicator__content--icon{align-self:center;margin:0 auto}.mdc-tab-indicator--active .mdc-tab-indicator__content{opacity:1}.mdc-tab-indicator .mdc-tab-indicator__content{transition:250ms transform cubic-bezier(0.4, 0, 0.2, 1)}.mdc-tab-indicator--no-transition .mdc-tab-indicator__content{transition:none}.mdc-tab-indicator--fade .mdc-tab-indicator__content{transition:150ms opacity linear}.mdc-tab-indicator--active.mdc-tab-indicator--fade .mdc-tab-indicator__content{transition-delay:100ms}.mat-mdc-tab-ripple{position:absolute;top:0;left:0;bottom:0;right:0;pointer-events:none}.mat-mdc-tab-header{display:flex;overflow:hidden;position:relative;flex-shrink:0;--mdc-tab-indicator-active-indicator-height:2px;--mdc-tab-indicator-active-indicator-shape:0;--mdc-secondary-navigation-tab-container-height:48px}.mdc-tab-indicator .mdc-tab-indicator__content{transition-duration:var(--mat-tab-animation-duration, 250ms)}.mat-mdc-tab-header-pagination{-webkit-user-select:none;user-select:none;position:relative;display:none;justify-content:center;align-items:center;min-width:32px;cursor:pointer;z-index:2;-webkit-tap-highlight-color:rgba(0,0,0,0);touch-action:none;box-sizing:content-box;background:none;border:none;outline:0;padding:0}.mat-mdc-tab-header-pagination::-moz-focus-inner{border:0}.mat-mdc-tab-header-pagination .mat-ripple-element{opacity:.12;background-color:var(--mat-tab-header-inactive-ripple-color)}.mat-mdc-tab-header-pagination-controls-enabled .mat-mdc-tab-header-pagination{display:flex}.mat-mdc-tab-header-pagination-before,.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-after{padding-left:4px}.mat-mdc-tab-header-pagination-before .mat-mdc-tab-header-pagination-chevron,.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-after .mat-mdc-tab-header-pagination-chevron{transform:rotate(-135deg)}.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-before,.mat-mdc-tab-header-pagination-after{padding-right:4px}.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-before .mat-mdc-tab-header-pagination-chevron,.mat-mdc-tab-header-pagination-after .mat-mdc-tab-header-pagination-chevron{transform:rotate(45deg)}.mat-mdc-tab-header-pagination-chevron{border-style:solid;border-width:2px 2px 0 0;height:8px;width:8px;border-color:var(--mat-tab-header-pagination-icon-color)}.mat-mdc-tab-header-pagination-disabled{box-shadow:none;cursor:default;pointer-events:none}.mat-mdc-tab-header-pagination-disabled .mat-mdc-tab-header-pagination-chevron{opacity:.4}.mat-mdc-tab-list{flex-grow:1;position:relative;transition:transform 500ms cubic-bezier(0.35, 0, 0.25, 1)}._mat-animation-noopable .mat-mdc-tab-list{transition:none}._mat-animation-noopable span.mdc-tab-indicator__content,._mat-animation-noopable span.mdc-tab__text-label{transition:none}.mat-mdc-tab-links{display:flex;flex:1 0 auto}[mat-align-tabs=center]>.mat-mdc-tab-link-container .mat-mdc-tab-links{justify-content:center}[mat-align-tabs=end]>.mat-mdc-tab-link-container .mat-mdc-tab-links{justify-content:flex-end}.mat-mdc-tab-link-container{display:flex;flex-grow:1;overflow:hidden;z-index:1}.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-link-container,.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-header-pagination{background-color:var(--mat-tab-header-with-background-background-color)}.mat-mdc-tab-nav-bar.mat-tabs-with-background.mat-primary>.mat-mdc-tab-link-container .mat-mdc-tab-link .mdc-tab__text-label{color:var(--mat-tab-header-with-background-foreground-color)}.mat-mdc-tab-nav-bar.mat-tabs-with-background.mat-primary>.mat-mdc-tab-link-container .mdc-tab-indicator__content--underline{border-color:var(--mat-tab-header-with-background-foreground-color)}.mat-mdc-tab-nav-bar.mat-tabs-with-background:not(.mat-primary)>.mat-mdc-tab-link-container .mat-mdc-tab-link:not(.mdc-tab--active) .mdc-tab__text-label{color:var(--mat-tab-header-with-background-foreground-color)}.mat-mdc-tab-nav-bar.mat-tabs-with-background:not(.mat-primary)>.mat-mdc-tab-link-container .mat-mdc-tab-link:not(.mdc-tab--active) .mdc-tab-indicator__content--underline{border-color:var(--mat-tab-header-with-background-foreground-color)}.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-link-container .mat-mdc-tab-header-pagination-chevron,.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-link-container .mat-mdc-focus-indicator::before,.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-header-pagination .mat-mdc-tab-header-pagination-chevron,.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-header-pagination .mat-mdc-focus-indicator::before{border-color:var(--mat-tab-header-with-background-foreground-color)}.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-link-container .mat-ripple-element,.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-link-container .mdc-tab__ripple::before,.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-header-pagination .mat-ripple-element,.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-header-pagination .mdc-tab__ripple::before{background-color:var(--mat-tab-header-with-background-foreground-color)}.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-link-container .mat-mdc-tab-header-pagination-chevron,.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-header-pagination .mat-mdc-tab-header-pagination-chevron{color:var(--mat-tab-header-with-background-foreground-color)}"]
    }]
  }], function () {
    return [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef
    }, {
      type: _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_8__.Directionality,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional
      }]
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.NgZone
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectorRef
    }, {
      type: _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_25__.ViewportRuler
    }, {
      type: _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_11__.Platform
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Inject,
        args: [_angular_core__WEBPACK_IMPORTED_MODULE_0__.ANIMATION_MODULE_TYPE]
      }]
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Inject,
        args: [MAT_TABS_CONFIG]
      }]
    }];
  }, {
    fitInkBarToContent: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    stretchTabs: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input,
      args: ['mat-stretch-tabs']
    }],
    animationDuration: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    _items: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ContentChildren,
      args: [(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(() => MatTabLink), {
        descendants: true
      }]
    }],
    _tabListContainer: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewChild,
      args: ['tabListContainer', {
        static: true
      }]
    }],
    _tabList: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewChild,
      args: ['tabList', {
        static: true
      }]
    }],
    _tabListInner: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewChild,
      args: ['tabListInner', {
        static: true
      }]
    }],
    _nextPaginator: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewChild,
      args: ['nextPaginator']
    }],
    _previousPaginator: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewChild,
      args: ['previousPaginator']
    }]
  });
})();
/**
 * Link inside of a `mat-tab-nav-bar`.
 */
class MatTabLink extends _MatTabLinkBaseWithInkBarItem {
  constructor(tabNavBar, elementRef, globalRippleOptions, tabIndex, focusMonitor, animationMode) {
    super(tabNavBar, elementRef, globalRippleOptions, tabIndex, focusMonitor, animationMode);
    this._destroyed = new rxjs__WEBPACK_IMPORTED_MODULE_6__.Subject();
    tabNavBar._fitInkBarToContent.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_13__.takeUntil)(this._destroyed)).subscribe(fitInkBarToContent => {
      this.fitInkBarToContent = fitInkBarToContent;
    });
  }
  ngOnDestroy() {
    this._destroyed.next();
    this._destroyed.complete();
    super.ngOnDestroy();
  }
}
_class18 = MatTabLink;
_class18.ɵfac = function _class18_Factory(t) {
  return new (t || _class18)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](MatTabNav), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_core__WEBPACK_IMPORTED_MODULE_10__.MAT_RIPPLE_GLOBAL_OPTIONS, 8), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinjectAttribute"]('tabindex'), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_15__.FocusMonitor), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ANIMATION_MODULE_TYPE, 8));
};
_class18.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: _class18,
  selectors: [["", "mat-tab-link", ""], ["", "matTabLink", ""]],
  hostAttrs: [1, "mdc-tab", "mat-mdc-tab-link", "mat-mdc-focus-indicator"],
  hostVars: 11,
  hostBindings: function _class18_HostBindings(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("focus", function _class18_focus_HostBindingHandler() {
        return ctx._handleFocus();
      })("keydown", function _class18_keydown_HostBindingHandler($event) {
        return ctx._handleKeydown($event);
      });
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattribute"]("aria-controls", ctx._getAriaControls())("aria-current", ctx._getAriaCurrent())("aria-disabled", ctx.disabled)("aria-selected", ctx._getAriaSelected())("id", ctx.id)("tabIndex", ctx._getTabIndex())("role", ctx._getRole());
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("mat-mdc-tab-disabled", ctx.disabled)("mdc-tab--active", ctx.active);
    }
  },
  inputs: {
    disabled: "disabled",
    disableRipple: "disableRipple",
    tabIndex: "tabIndex",
    active: "active",
    id: "id"
  },
  exportAs: ["matTabLink"],
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]],
  attrs: _c11,
  ngContentSelectors: _c2,
  decls: 5,
  vars: 2,
  consts: [[1, "mdc-tab__ripple"], ["mat-ripple", "", 1, "mat-mdc-tab-ripple", 3, "matRippleTrigger", "matRippleDisabled"], [1, "mdc-tab__content"], [1, "mdc-tab__text-label"]],
  template: function _class18_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojectionDef"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "span", 0)(1, "div", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "span", 2)(3, "span", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("matRippleTrigger", ctx.elementRef.nativeElement)("matRippleDisabled", ctx.rippleDisabled);
    }
  },
  dependencies: [_angular_material_core__WEBPACK_IMPORTED_MODULE_10__.MatRipple],
  styles: [".mat-mdc-tab-link{-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-decoration:none;background:none;font-family:var(--mat-tab-header-label-text-font);font-size:var(--mat-tab-header-label-text-size);letter-spacing:var(--mat-tab-header-label-text-tracking);line-height:var(--mat-tab-header-label-text-line-height);font-weight:var(--mat-tab-header-label-text-weight)}.mat-mdc-tab-link .mdc-tab-indicator__content--underline{border-color:var(--mdc-tab-indicator-active-indicator-color)}.mat-mdc-tab-link .mdc-tab-indicator__content--underline{border-top-width:var(--mdc-tab-indicator-active-indicator-height)}.mat-mdc-tab-link .mdc-tab-indicator__content--underline{border-radius:var(--mdc-tab-indicator-active-indicator-shape)}.mat-mdc-tab-link:not(.mdc-tab--stacked){height:var(--mdc-secondary-navigation-tab-container-height)}.mat-mdc-tab-link:not(:disabled).mdc-tab--active .mdc-tab__icon{fill:currentColor}.mat-mdc-tab-link:not(:disabled):hover.mdc-tab--active .mdc-tab__icon{fill:currentColor}.mat-mdc-tab-link:not(:disabled):focus.mdc-tab--active .mdc-tab__icon{fill:currentColor}.mat-mdc-tab-link:not(:disabled):active.mdc-tab--active .mdc-tab__icon{fill:currentColor}.mat-mdc-tab-link:disabled.mdc-tab--active .mdc-tab__icon{fill:currentColor}.mat-mdc-tab-link:not(:disabled):not(.mdc-tab--active) .mdc-tab__icon{fill:currentColor}.mat-mdc-tab-link:not(:disabled):hover:not(.mdc-tab--active) .mdc-tab__icon{fill:currentColor}.mat-mdc-tab-link:not(:disabled):focus:not(.mdc-tab--active) .mdc-tab__icon{fill:currentColor}.mat-mdc-tab-link:not(:disabled):active:not(.mdc-tab--active) .mdc-tab__icon{fill:currentColor}.mat-mdc-tab-link:disabled:not(.mdc-tab--active) .mdc-tab__icon{fill:currentColor}.mat-mdc-tab-link.mdc-tab{flex-grow:0}.mat-mdc-tab-link:hover .mdc-tab__text-label{color:var(--mat-tab-header-inactive-hover-label-text-color)}.mat-mdc-tab-link:focus .mdc-tab__text-label{color:var(--mat-tab-header-inactive-focus-label-text-color)}.mat-mdc-tab-link.mdc-tab--active .mdc-tab__text-label{color:var(--mat-tab-header-active-label-text-color)}.mat-mdc-tab-link.mdc-tab--active .mdc-tab__ripple::before,.mat-mdc-tab-link.mdc-tab--active .mat-ripple-element{background-color:var(--mat-tab-header-active-ripple-color)}.mat-mdc-tab-link.mdc-tab--active:hover .mdc-tab__text-label{color:var(--mat-tab-header-active-hover-label-text-color)}.mat-mdc-tab-link.mdc-tab--active:hover .mdc-tab-indicator__content--underline{border-color:var(--mat-tab-header-active-hover-indicator-color)}.mat-mdc-tab-link.mdc-tab--active:focus .mdc-tab__text-label{color:var(--mat-tab-header-active-focus-label-text-color)}.mat-mdc-tab-link.mdc-tab--active:focus .mdc-tab-indicator__content--underline{border-color:var(--mat-tab-header-active-focus-indicator-color)}.mat-mdc-tab-link.mat-mdc-tab-disabled{opacity:.4;pointer-events:none}.mat-mdc-tab-link.mat-mdc-tab-disabled .mdc-tab__content{pointer-events:none}.mat-mdc-tab-link.mat-mdc-tab-disabled .mdc-tab__ripple::before,.mat-mdc-tab-link.mat-mdc-tab-disabled .mat-ripple-element{background-color:var(--mat-tab-header-disabled-ripple-color)}.mat-mdc-tab-link .mdc-tab__ripple::before{content:\"\";display:block;position:absolute;top:0;left:0;right:0;bottom:0;opacity:0;pointer-events:none;background-color:var(--mat-tab-header-inactive-ripple-color)}.mat-mdc-tab-link .mdc-tab__text-label{color:var(--mat-tab-header-inactive-label-text-color);display:inline-flex;align-items:center}.mat-mdc-tab-link .mdc-tab__content{position:relative;pointer-events:auto}.mat-mdc-tab-link:hover .mdc-tab__ripple::before{opacity:.04}.mat-mdc-tab-link.cdk-program-focused .mdc-tab__ripple::before,.mat-mdc-tab-link.cdk-keyboard-focused .mdc-tab__ripple::before{opacity:.12}.mat-mdc-tab-link .mat-ripple-element{opacity:.12;background-color:var(--mat-tab-header-inactive-ripple-color)}.mat-mdc-tab-header.mat-mdc-tab-nav-bar-stretch-tabs .mat-mdc-tab-link{flex-grow:1}.mat-mdc-tab-link::before{margin:5px}@media(max-width: 599px){.mat-mdc-tab-link{min-width:72px}}"],
  encapsulation: 2,
  changeDetection: 0
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MatTabLink, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Component,
    args: [{
      selector: '[mat-tab-link], [matTabLink]',
      exportAs: 'matTabLink',
      inputs: ['disabled', 'disableRipple', 'tabIndex', 'active', 'id'],
      changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectionStrategy.OnPush,
      encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewEncapsulation.None,
      host: {
        'class': 'mdc-tab mat-mdc-tab-link mat-mdc-focus-indicator',
        '[attr.aria-controls]': '_getAriaControls()',
        '[attr.aria-current]': '_getAriaCurrent()',
        '[attr.aria-disabled]': 'disabled',
        '[attr.aria-selected]': '_getAriaSelected()',
        '[attr.id]': 'id',
        '[attr.tabIndex]': '_getTabIndex()',
        '[attr.role]': '_getRole()',
        '[class.mat-mdc-tab-disabled]': 'disabled',
        '[class.mdc-tab--active]': 'active',
        '(focus)': '_handleFocus()',
        '(keydown)': '_handleKeydown($event)'
      },
      template: "<span class=\"mdc-tab__ripple\"></span>\n\n<div\n  class=\"mat-mdc-tab-ripple\"\n  mat-ripple\n  [matRippleTrigger]=\"elementRef.nativeElement\"\n  [matRippleDisabled]=\"rippleDisabled\"></div>\n\n<span class=\"mdc-tab__content\">\n  <span class=\"mdc-tab__text-label\">\n    <ng-content></ng-content>\n  </span>\n</span>\n\n",
      styles: [".mat-mdc-tab-link{-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-decoration:none;background:none;font-family:var(--mat-tab-header-label-text-font);font-size:var(--mat-tab-header-label-text-size);letter-spacing:var(--mat-tab-header-label-text-tracking);line-height:var(--mat-tab-header-label-text-line-height);font-weight:var(--mat-tab-header-label-text-weight)}.mat-mdc-tab-link .mdc-tab-indicator__content--underline{border-color:var(--mdc-tab-indicator-active-indicator-color)}.mat-mdc-tab-link .mdc-tab-indicator__content--underline{border-top-width:var(--mdc-tab-indicator-active-indicator-height)}.mat-mdc-tab-link .mdc-tab-indicator__content--underline{border-radius:var(--mdc-tab-indicator-active-indicator-shape)}.mat-mdc-tab-link:not(.mdc-tab--stacked){height:var(--mdc-secondary-navigation-tab-container-height)}.mat-mdc-tab-link:not(:disabled).mdc-tab--active .mdc-tab__icon{fill:currentColor}.mat-mdc-tab-link:not(:disabled):hover.mdc-tab--active .mdc-tab__icon{fill:currentColor}.mat-mdc-tab-link:not(:disabled):focus.mdc-tab--active .mdc-tab__icon{fill:currentColor}.mat-mdc-tab-link:not(:disabled):active.mdc-tab--active .mdc-tab__icon{fill:currentColor}.mat-mdc-tab-link:disabled.mdc-tab--active .mdc-tab__icon{fill:currentColor}.mat-mdc-tab-link:not(:disabled):not(.mdc-tab--active) .mdc-tab__icon{fill:currentColor}.mat-mdc-tab-link:not(:disabled):hover:not(.mdc-tab--active) .mdc-tab__icon{fill:currentColor}.mat-mdc-tab-link:not(:disabled):focus:not(.mdc-tab--active) .mdc-tab__icon{fill:currentColor}.mat-mdc-tab-link:not(:disabled):active:not(.mdc-tab--active) .mdc-tab__icon{fill:currentColor}.mat-mdc-tab-link:disabled:not(.mdc-tab--active) .mdc-tab__icon{fill:currentColor}.mat-mdc-tab-link.mdc-tab{flex-grow:0}.mat-mdc-tab-link:hover .mdc-tab__text-label{color:var(--mat-tab-header-inactive-hover-label-text-color)}.mat-mdc-tab-link:focus .mdc-tab__text-label{color:var(--mat-tab-header-inactive-focus-label-text-color)}.mat-mdc-tab-link.mdc-tab--active .mdc-tab__text-label{color:var(--mat-tab-header-active-label-text-color)}.mat-mdc-tab-link.mdc-tab--active .mdc-tab__ripple::before,.mat-mdc-tab-link.mdc-tab--active .mat-ripple-element{background-color:var(--mat-tab-header-active-ripple-color)}.mat-mdc-tab-link.mdc-tab--active:hover .mdc-tab__text-label{color:var(--mat-tab-header-active-hover-label-text-color)}.mat-mdc-tab-link.mdc-tab--active:hover .mdc-tab-indicator__content--underline{border-color:var(--mat-tab-header-active-hover-indicator-color)}.mat-mdc-tab-link.mdc-tab--active:focus .mdc-tab__text-label{color:var(--mat-tab-header-active-focus-label-text-color)}.mat-mdc-tab-link.mdc-tab--active:focus .mdc-tab-indicator__content--underline{border-color:var(--mat-tab-header-active-focus-indicator-color)}.mat-mdc-tab-link.mat-mdc-tab-disabled{opacity:.4;pointer-events:none}.mat-mdc-tab-link.mat-mdc-tab-disabled .mdc-tab__content{pointer-events:none}.mat-mdc-tab-link.mat-mdc-tab-disabled .mdc-tab__ripple::before,.mat-mdc-tab-link.mat-mdc-tab-disabled .mat-ripple-element{background-color:var(--mat-tab-header-disabled-ripple-color)}.mat-mdc-tab-link .mdc-tab__ripple::before{content:\"\";display:block;position:absolute;top:0;left:0;right:0;bottom:0;opacity:0;pointer-events:none;background-color:var(--mat-tab-header-inactive-ripple-color)}.mat-mdc-tab-link .mdc-tab__text-label{color:var(--mat-tab-header-inactive-label-text-color);display:inline-flex;align-items:center}.mat-mdc-tab-link .mdc-tab__content{position:relative;pointer-events:auto}.mat-mdc-tab-link:hover .mdc-tab__ripple::before{opacity:.04}.mat-mdc-tab-link.cdk-program-focused .mdc-tab__ripple::before,.mat-mdc-tab-link.cdk-keyboard-focused .mdc-tab__ripple::before{opacity:.12}.mat-mdc-tab-link .mat-ripple-element{opacity:.12;background-color:var(--mat-tab-header-inactive-ripple-color)}.mat-mdc-tab-header.mat-mdc-tab-nav-bar-stretch-tabs .mat-mdc-tab-link{flex-grow:1}.mat-mdc-tab-link::before{margin:5px}@media(max-width: 599px){.mat-mdc-tab-link{min-width:72px}}"]
    }]
  }], function () {
    return [{
      type: MatTabNav
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Inject,
        args: [_angular_material_core__WEBPACK_IMPORTED_MODULE_10__.MAT_RIPPLE_GLOBAL_OPTIONS]
      }]
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Attribute,
        args: ['tabindex']
      }]
    }, {
      type: _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_15__.FocusMonitor
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Inject,
        args: [_angular_core__WEBPACK_IMPORTED_MODULE_0__.ANIMATION_MODULE_TYPE]
      }]
    }];
  }, null);
})();
/**
 * Tab panel component associated with MatTabNav.
 */
class MatTabNavPanel {
  constructor() {
    /** Unique id for the tab panel. */
    this.id = `mat-tab-nav-panel-${nextUniqueId++}`;
  }
}
_class19 = MatTabNavPanel;
_class19.ɵfac = function _class19_Factory(t) {
  return new (t || _class19)();
};
_class19.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: _class19,
  selectors: [["mat-tab-nav-panel"]],
  hostAttrs: ["role", "tabpanel", 1, "mat-mdc-tab-nav-panel"],
  hostVars: 2,
  hostBindings: function _class19_HostBindings(rf, ctx) {
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattribute"]("aria-labelledby", ctx._activeTabId)("id", ctx.id);
    }
  },
  inputs: {
    id: "id"
  },
  exportAs: ["matTabNavPanel"],
  ngContentSelectors: _c2,
  decls: 1,
  vars: 0,
  template: function _class19_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojectionDef"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MatTabNavPanel, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Component,
    args: [{
      selector: 'mat-tab-nav-panel',
      exportAs: 'matTabNavPanel',
      template: '<ng-content></ng-content>',
      host: {
        '[attr.aria-labelledby]': '_activeTabId',
        '[attr.id]': 'id',
        'class': 'mat-mdc-tab-nav-panel',
        'role': 'tabpanel'
      },
      encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewEncapsulation.None,
      changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectionStrategy.OnPush
    }]
  }], null, {
    id: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }]
  });
})();
class MatTabsModule {}
_class20 = MatTabsModule;
_class20.ɵfac = function _class20_Factory(t) {
  return new (t || _class20)();
};
_class20.ɵmod = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
  type: _class20
});
_class20.ɵinj = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule, _angular_material_core__WEBPACK_IMPORTED_MODULE_10__.MatCommonModule, _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_2__.PortalModule, _angular_material_core__WEBPACK_IMPORTED_MODULE_10__.MatRippleModule, _angular_cdk_observers__WEBPACK_IMPORTED_MODULE_26__.ObserversModule, _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_15__.A11yModule, _angular_material_core__WEBPACK_IMPORTED_MODULE_10__.MatCommonModule]
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MatTabsModule, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.NgModule,
    args: [{
      imports: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule, _angular_material_core__WEBPACK_IMPORTED_MODULE_10__.MatCommonModule, _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_2__.PortalModule, _angular_material_core__WEBPACK_IMPORTED_MODULE_10__.MatRippleModule, _angular_cdk_observers__WEBPACK_IMPORTED_MODULE_26__.ObserversModule, _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_15__.A11yModule],
      exports: [_angular_material_core__WEBPACK_IMPORTED_MODULE_10__.MatCommonModule, MatTabContent, MatTabLabel, MatTab, MatTabGroup, MatTabNav, MatTabNavPanel, MatTabLink],
      declarations: [MatTabContent, MatTabLabel, MatTab, MatTabGroup, MatTabNav, MatTabNavPanel, MatTabLink,
      // Private directives, should not be exported.
      MatTabBody, MatTabBodyPortal, MatTabLabelWrapper, MatTabHeader]
    }]
  }], null, null);
})();

/**
 * Generated bundle index. Do not edit.
 */



/***/ }),

/***/ 5131:
/*!*******************************************************************!*\
  !*** ./node_modules/ngx-cron-editor/fesm2022/ngx-cron-editor.mjs ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CRON_VALUE_ACCESSOR: () => (/* binding */ CRON_VALUE_ACCESSOR),
/* harmony export */   CronEditorModule: () => (/* binding */ CronEditorModule),
/* harmony export */   CronGenComponent: () => (/* binding */ CronGenComponent),
/* harmony export */   Days: () => (/* binding */ Days),
/* harmony export */   DefaultOptions: () => (/* binding */ DefaultOptions),
/* harmony export */   MonthWeeks: () => (/* binding */ MonthWeeks),
/* harmony export */   Months: () => (/* binding */ Months),
/* harmony export */   TimePickerComponent: () => (/* binding */ TimePickerComponent)
/* harmony export */ });
/* harmony import */ var _Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 1670);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ 8849);
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/checkbox */ 6658);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/input */ 26);
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/list */ 3228);
/* harmony import */ var _angular_material_radio__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/radio */ 2106);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/select */ 6355);
/* harmony import */ var _angular_material_tabs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/tabs */ 989);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/form-field */ 1333);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/core */ 5309);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ 655);
/* harmony import */ var _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/grid-list */ 647);

var _class, _class2, _class3;





















function _class_ng_container_1_mat_option_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-option", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const hour_r5 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value", hour_r5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](hour_r5);
  }
}
function _class_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "mat-form-field")(2, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "Hour(s)");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "mat-select", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](5, _class_ng_container_1_mat_option_5_Template, 2, 2, "mat-option", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r0.hours);
  }
}
function _class_ng_container_2_span_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, ":");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
function _class_ng_container_2_mat_option_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-option", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const minute_r8 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value", minute_r8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](minute_r8);
  }
}
function _class_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, _class_ng_container_2_span_1_Template, 2, 0, "span", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "mat-form-field")(3, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4, "Minute(s)");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "mat-select", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](6, _class_ng_container_2_mat_option_6_Template, 2, 2, "mat-option", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx_r1.hideHours);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r1.minutes);
  }
}
function _class_ng_container_3_span_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, ":");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
function _class_ng_container_3_mat_option_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-option", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const second_r11 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value", second_r11);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](second_r11);
  }
}
function _class_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, _class_ng_container_3_span_1_Template, 2, 0, "span", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "mat-form-field")(3, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4, "Second(s)");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "mat-select", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](6, _class_ng_container_3_mat_option_6_Template, 2, 2, "mat-option", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx_r2.hideMinutes);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r2.seconds);
  }
}
function _class_ng_container_4_mat_option_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-option", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const hourType_r13 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value", hourType_r13);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](hourType_r13);
  }
}
function _class_ng_container_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](1, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, ". ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "mat-form-field")(4, "mat-select", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](5, _class_ng_container_4_mat_option_5_Template, 2, 2, "mat-option", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r3.hourTypes);
  }
}
const _c0 = ["minutesTab"];
const _c1 = ["hourlyTab"];
const _c2 = ["dailyTab"];
const _c3 = ["weeklyTab"];
const _c4 = ["monthlyTab"];
const _c5 = ["yearlyTab"];
const _c6 = ["advancedTab"];
function _class2_mat_tab_2_mat_option_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-option", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const minute_r10 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value", minute_r10);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](minute_r10);
  }
}
function _class2_mat_tab_2_div_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div")(1, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "At time ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](3, "cron-time-picker", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("formGroup", ctx_r9.allForm)("hideHours", true)("hideMinutes", true)("use24HourTime", ctx_r9.options.use24HourTime)("hideSeconds", ctx_r9.options.hideSeconds || !ctx_r9.isCronFlavorQuartz);
  }
}
function _class2_mat_tab_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-tab", 9, 10)(2, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function _class2_mat_tab_2_Template_div_click_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r12);
      const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r11.allForm.controls.cronType.setValue("minutely"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div")(4, "span", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, "Every ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "mat-form-field")(7, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](8, "Minute(s)");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "mat-select", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](10, _class2_mat_tab_2_mat_option_10_Template, 2, 2, "mat-option", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](11, _class2_mat_tab_2_div_11_Template, 4, 5, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("formGroup", ctx_r0.allForm);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r0.minutes);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r0.isCronFlavorQuartz);
  }
}
function _class2_mat_tab_3_mat_option_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-option", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const hour_r15 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value", hour_r15);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](hour_r15);
  }
}
function _class2_mat_tab_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-tab", 18, 19)(2, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function _class2_mat_tab_3_Template_div_click_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r17);
      const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r16.allForm.controls.cronType.setValue("hourly"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div")(4, "span", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, "Every ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "mat-form-field", 20)(7, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](8, "Hour(s)");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "mat-select", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](10, _class2_mat_tab_3_mat_option_10_Template, 2, 2, "mat-option", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "div")(12, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](13, "At time ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](14, "cron-time-picker", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("formGroup", ctx_r1.allForm);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r1.hours);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("formGroup", ctx_r1.allForm)("hideHours", true)("use24HourTime", ctx_r1.options.use24HourTime)("hideSeconds", ctx_r1.options.hideSeconds || !ctx_r1.isCronFlavorQuartz);
  }
}
function _class2_mat_tab_4_mat_option_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-option", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const monthDay_r20 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value", monthDay_r20);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", monthDay_r20, " ");
  }
}
function _class2_mat_tab_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r22 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-tab", 23, 24)(2, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function _class2_mat_tab_4_Template_div_click_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r22);
      const ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r21.allForm.controls.cronType.setValue("daily"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 20)(4, "span", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, "Every ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "mat-radio-group", 25)(7, "mat-radio-button", 26)(8, "mat-form-field")(9, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](10, "Day(s)");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "mat-select", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](12, _class2_mat_tab_4_mat_option_12_Template, 2, 2, "mat-option", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](13, "mat-radio-button", 28)(14, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](15, "Week Day (MON-FRI) ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](16, "div")(17, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](18, "At time ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](19, "cron-time-picker", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("formGroup", ctx_r2.allForm);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value", false)("checked", true);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r2.selectOptions.monthDays);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value", true);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("formGroup", ctx_r2.allForm)("use24HourTime", ctx_r2.options.use24HourTime)("hideSeconds", ctx_r2.options.hideSeconds || !ctx_r2.isCronFlavorQuartz);
  }
}
function _class2_mat_tab_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r25 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-tab", 30, 31)(2, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function _class2_mat_tab_5_Template_div_click_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r25);
      const ctx_r24 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r24.allForm.controls.cronType.setValue("weekly"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div")(4, "span", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, "Every");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "div", 20)(7, "mat-checkbox", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](8, "Monday");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "mat-checkbox", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](10, "Tuesday");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "mat-checkbox", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](12, "Wednesday");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](13, "mat-checkbox", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](14, "Thursday");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](15, "mat-checkbox", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](16, "Friday");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](17, "mat-checkbox", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](18, "Saturday");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](19, "mat-checkbox", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](20, "Sunday");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](21, "div")(22, "span", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](23, " At ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](24, "cron-time-picker", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("formGroup", ctx_r3.allForm);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](18);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("formGroup", ctx_r3.allForm)("use24HourTime", ctx_r3.options.use24HourTime)("hideSeconds", ctx_r3.options.hideSeconds || !ctx_r3.isCronFlavorQuartz);
  }
}
function _class2_mat_tab_6_ng_container_6_mat_option_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-option", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const monthDaysWithLast_r34 = ctx.$implicit;
    const ctx_r33 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value", monthDaysWithLast_r34);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", ctx_r33.monthDayDisplay(monthDaysWithLast_r34), " ");
  }
}
function _class2_mat_tab_6_ng_container_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "mat-form-field")(2, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "Day");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "mat-select", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](5, _class2_mat_tab_6_ng_container_6_mat_option_5_Template, 2, 2, "mat-option", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r27 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r27.selectOptions.monthDaysWithLasts);
  }
}
function _class2_mat_tab_6_ng_container_7_mat_option_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-option", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const monthDaysWithOutLast_r36 = ctx.$implicit;
    const ctx_r35 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value", monthDaysWithOutLast_r36);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", ctx_r35.monthDayDisplay(monthDaysWithOutLast_r36), " ");
  }
}
function _class2_mat_tab_6_ng_container_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "mat-form-field")(2, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "Day");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "mat-select", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](5, _class2_mat_tab_6_ng_container_7_mat_option_5_Template, 2, 2, "mat-option", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r28 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r28.selectOptions.monthDaysWithOutLasts);
  }
}
function _class2_mat_tab_6_mat_option_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-option", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const month_r37 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value", month_r37);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", month_r37, " ");
  }
}
function _class2_mat_tab_6_mat_option_20_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-option", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const monthWeek_r38 = ctx.$implicit;
    const ctx_r30 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value", monthWeek_r38);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", ctx_r30.monthWeekDisplay(monthWeek_r38), " ");
  }
}
function _class2_mat_tab_6_mat_option_25_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-option", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const day_r39 = ctx.$implicit;
    const ctx_r31 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value", day_r39);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", ctx_r31.dayDisplay(day_r39), " ");
  }
}
function _class2_mat_tab_6_mat_option_31_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-option", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const month_r40 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value", month_r40);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", month_r40, " ");
  }
}
function _class2_mat_tab_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r42 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-tab", 39, 40)(2, "div", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function _class2_mat_tab_6_Template_div_click_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r42);
      const ctx_r41 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r41.allForm.controls.cronType.setValue("monthly"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "mat-radio-group", 42)(4, "mat-radio-button", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, " On the ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](6, _class2_mat_tab_6_ng_container_6_Template, 6, 1, "ng-container", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](7, _class2_mat_tab_6_ng_container_7_Template, 6, 1, "ng-container", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](8, " of every ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "mat-form-field")(10, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](11, "Month");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "mat-select", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](13, _class2_mat_tab_6_mat_option_13_Template, 2, 2, "mat-option", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](14, "mat-radio-button", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](15, " On the ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](16, "mat-form-field")(17, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](18, "Week");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](19, "mat-select", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](20, _class2_mat_tab_6_mat_option_20_Template, 2, 2, "mat-option", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](21, "mat-form-field")(22, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](23, "Day");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](24, "mat-select", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](25, _class2_mat_tab_6_mat_option_25_Template, 2, 2, "mat-option", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](26, " of every ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](27, "mat-form-field")(28, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](29, "Month");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](30, "mat-select", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](31, _class2_mat_tab_6_mat_option_31_Template, 2, 2, "mat-option", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](32, "div")(33, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](34, "At time ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](35, "cron-time-picker", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("formGroup", ctx_r4.allForm);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value", false)("ngClass", ctx_r4.options.formRadioClass);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r4.options.cronFlavor === "quartz");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r4.options.cronFlavor === "standard");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", ctx_r4.options.formSelectClass);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r4.selectOptions.months);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value", true)("ngClass", ctx_r4.options.formRadioClass);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", ctx_r4.options.formSelectClass);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r4.selectOptions.monthWeeks);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", ctx_r4.options.formSelectClass);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r4.selectOptions.days);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r4.selectOptions.months);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("formGroup", ctx_r4.allForm)("use24HourTime", ctx_r4.options.use24HourTime)("hideSeconds", ctx_r4.options.hideSeconds || !ctx_r4.isCronFlavorQuartz);
  }
}
function _class2_mat_tab_7_mat_form_field_6_mat_option_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-option", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const monthDaysWithLast_r51 = ctx.$implicit;
    const ctx_r50 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value", monthDaysWithLast_r51);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", ctx_r50.monthDayDisplay(monthDaysWithLast_r51), " ");
  }
}
function _class2_mat_tab_7_mat_form_field_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-form-field")(1, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "Day");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "mat-select", 59);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](4, _class2_mat_tab_7_mat_form_field_6_mat_option_4_Template, 2, 2, "mat-option", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r44 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r44.selectOptions.monthDaysWithLasts);
  }
}
function _class2_mat_tab_7_mat_form_field_7_mat_option_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-option", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const monthDaysWithOutLast_r53 = ctx.$implicit;
    const ctx_r52 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value", monthDaysWithOutLast_r53);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", ctx_r52.monthDayDisplay(monthDaysWithOutLast_r53), " ");
  }
}
function _class2_mat_tab_7_mat_form_field_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-form-field")(1, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "Day");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "mat-select", 59);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](4, _class2_mat_tab_7_mat_form_field_7_mat_option_4_Template, 2, 2, "mat-option", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r45 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r45.selectOptions.monthDaysWithOutLasts);
  }
}
function _class2_mat_tab_7_mat_option_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-option", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const month_r54 = ctx.$implicit;
    const ctx_r46 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value", month_r54);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", ctx_r46.monthDisplay(month_r54), " ");
  }
}
function _class2_mat_tab_7_mat_option_20_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-option", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const monthWeek_r55 = ctx.$implicit;
    const ctx_r47 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value", monthWeek_r55);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", ctx_r47.monthWeekDisplay(monthWeek_r55), " ");
  }
}
function _class2_mat_tab_7_mat_option_25_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-option", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const day_r56 = ctx.$implicit;
    const ctx_r48 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value", day_r56);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", ctx_r48.dayDisplay(day_r56), " ");
  }
}
function _class2_mat_tab_7_mat_option_31_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-option", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const month_r57 = ctx.$implicit;
    const ctx_r49 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value", month_r57);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", ctx_r49.monthDisplay(month_r57), " ");
  }
}
function _class2_mat_tab_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-tab", 49, 50)(2, "div", 51)(3, "mat-radio-group", 52)(4, "mat-radio-button", 53);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, " On the ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](6, _class2_mat_tab_7_mat_form_field_6_Template, 5, 1, "mat-form-field", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](7, _class2_mat_tab_7_mat_form_field_7_Template, 5, 1, "mat-form-field", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](8, " of ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "mat-form-field")(10, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](11, "Month");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "mat-select", 54);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](13, _class2_mat_tab_7_mat_option_13_Template, 2, 2, "mat-option", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](14, "mat-radio-button", 55);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](15, " On the ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](16, "mat-form-field")(17, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](18, "Week");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](19, "mat-select", 56);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](20, _class2_mat_tab_7_mat_option_20_Template, 2, 2, "mat-option", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](21, "mat-form-field")(22, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](23, "Day");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](24, "mat-select", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](25, _class2_mat_tab_7_mat_option_25_Template, 2, 2, "mat-option", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](26, " of ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](27, "mat-form-field")(28, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](29, "Month");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](30, "mat-select", 54);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](31, _class2_mat_tab_7_mat_option_31_Template, 2, 2, "mat-option", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](32, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](33, " At time ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](34, "cron-time-picker", 58);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("formGroup", ctx_r5.allForm);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value", false)("ngClass", ctx_r5.options.formRadioClass);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r5.options.cronFlavor === "quartz");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r5.options.cronFlavor === "standard");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r5.selectOptions.months);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", ctx_r5.options.formRadioClass);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r5.selectOptions.monthWeeks);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r5.selectOptions.days);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r5.selectOptions.months);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("disabled", ctx_r5.disabled)("formGroup", ctx_r5.allForm)("use24HourTime", ctx_r5.options.use24HourTime)("hideSeconds", ctx_r5.options.hideSeconds || !ctx_r5.isCronFlavorQuartz);
  }
}
function _class2_mat_tab_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-tab", 60, 61)(2, "div", 51)(3, "mat-form-field")(4, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, "Expression");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](6, "input", 62);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("formGroup", ctx_r6.allForm);
  }
}
function* range$1(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}
class TimePickerComponent {
  get hours() {
    return this.use24HourTime ? [...range$1(0, 23)] : [...range$1(0, 12)];
  }
  constructor(parent) {
    this.parent = parent;
    this.disabled = false;
    this.use24HourTime = true;
    this.hideHours = false;
    this.hideMinutes = false;
    this.hideSeconds = true;
    this.minutes = [...range$1(0, 59)];
    this.seconds = [...range$1(0, 59)];
    this.hourTypes = ['AM', 'PM'];
  }
  ngOnInit() {
    this.allForm = this.parent.control;
  }
}
_class = TimePickerComponent;
_class.ɵfac = function _class_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_2__.ControlContainer));
};
_class.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["cron-time-picker"]],
  inputs: {
    disabled: "disabled",
    use24HourTime: "use24HourTime",
    hideHours: "hideHours",
    hideMinutes: "hideMinutes",
    hideSeconds: "hideSeconds"
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵProvidersFeature"]([])],
  decls: 5,
  vars: 5,
  consts: [[3, "formGroup"], [4, "ngIf"], ["formControlName", "hours"], [3, "value", 4, "ngFor", "ngForOf"], [3, "value"], ["formControlName", "minutes"], ["formControlName", "seconds"], ["formControlName", "hourType"]],
  template: function _class_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0, 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, _class_ng_container_1_Template, 6, 1, "ng-container", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](2, _class_ng_container_2_Template, 7, 2, "ng-container", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](3, _class_ng_container_3_Template, 7, 2, "ng-container", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](4, _class_ng_container_4_Template, 6, 1, "ng-container", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("formGroup", ctx.allForm);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx.hideHours);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx.hideMinutes);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx.hideSeconds);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx.use24HourTime);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_3__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormControlName, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_4__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_4__.MatLabel, _angular_material_select__WEBPACK_IMPORTED_MODULE_5__.MatSelect, _angular_material_core__WEBPACK_IMPORTED_MODULE_6__.MatOption],
  encapsulation: 2
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](TimePickerComponent, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Component,
    args: [{
      selector: 'cron-time-picker',
      providers: [],
      template: "<ng-container [formGroup]=\"allForm\">\n\n  <ng-container *ngIf=\"!hideHours\">\n    <mat-form-field>\n      <mat-label>Hour(s)</mat-label>\n      <mat-select formControlName=\"hours\">\n        <mat-option *ngFor=\"let hour of hours\" [value]=\"hour\">{{hour}}</mat-option>\n      </mat-select>\n    </mat-form-field>\n  </ng-container>\n\n  <ng-container *ngIf=\"!hideMinutes\">\n    <span *ngIf=\"!hideHours\">:</span>\n    <mat-form-field>\n      <mat-label>Minute(s)</mat-label>\n      <mat-select formControlName=\"minutes\">\n        <mat-option *ngFor=\"let minute of minutes\" [value]=\"minute\">{{minute}}</mat-option>\n      </mat-select>\n    </mat-form-field>\n  </ng-container>\n\n  <ng-container *ngIf=\"!hideSeconds\">\n    <span *ngIf=\"!hideMinutes\">:</span>\n    <mat-form-field>\n      <mat-label>Second(s)</mat-label>\n      <mat-select formControlName=\"seconds\">\n        <mat-option *ngFor=\"let second of seconds\" [value]=\"second\">{{second}}</mat-option>\n      </mat-select>\n    </mat-form-field>\n  </ng-container>\n\n  <ng-container *ngIf=\"!use24HourTime\">\n    <span></span>.\n    <mat-form-field>\n      <mat-select formControlName=\"hourType\">\n        <mat-option *ngFor=\"let hourType of hourTypes\" [value]=\"hourType\">{{hourType}}</mat-option>\n      </mat-select>\n    </mat-form-field>\n  </ng-container>\n</ng-container>\n"
    }]
  }], function () {
    return [{
      type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__.ControlContainer
    }];
  }, {
    disabled: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    use24HourTime: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    hideHours: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    hideMinutes: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    hideSeconds: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }]
  });
})();
class DefaultOptions {
  constructor() {
    this.cronFlavor = 'standard';
    this.defaultTime = '00:00:00';
    this.hideAdvancedTab = false;
    this.hideDailyTab = false;
    this.hideHourlyTab = false;
    this.hideMinutesTab = false;
    this.hideMonthlyTab = false;
    this.hideSeconds = false;
    this.hideSpecificMonthWeekTab = false;
    this.hideSpecificWeekDayTab = false;
    this.hideWeeklyTab = false;
    this.hideYearlyTab = false;
    this.use24HourTime = true;
  }
}
const Days = {
  'SUN': 'Sunday',
  'MON': 'Monday',
  'TUE': 'Tuesday',
  'WED': 'Wednesday',
  'THU': 'Thursday',
  'FRI': 'Friday',
  'SAT': 'Saturday'
};
const MonthWeeks = {
  '#1': 'First',
  '#2': 'Second',
  '#3': 'Third',
  '#4': 'Fourth',
  '#5': 'Fifth',
  'L': 'Last'
};
var Months;
(function (Months) {
  Months[Months["January"] = 1] = "January";
  Months[Months["February"] = 2] = "February";
  Months[Months["March"] = 3] = "March";
  Months[Months["April"] = 4] = "April";
  Months[Months["May"] = 5] = "May";
  Months[Months["June"] = 6] = "June";
  Months[Months["July"] = 7] = "July";
  Months[Months["August"] = 8] = "August";
  Months[Months["September"] = 9] = "September";
  Months[Months["October"] = 10] = "October";
  Months[Months["November"] = 11] = "November";
  Months[Months["December"] = 12] = "December";
})(Months || (Months = {}));
const minutesExp = /\d+ 0\/\d+ \* 1\/1 \* [\?\*] \*/;
const hourlyExp = /\d+ \d+ 0\/\d+ 1\/1 \* [\?\*] \*/;
const dailyExp = /\d+ \d+ \d+ 1\/\d+ \* [\?\*] \*/;
const dailyWeekdayExp = /\d+ \d+ \d+ [\?\*] \* MON-FRI \*/;
const weeklyExp = /\d+ \d+ \d+ [\?\*] \* (MON|TUE|WED|THU|FRI|SAT|SUN)(,(MON|TUE|WED|THU|FRI|SAT|SUN))* \*/;
const monthlyExpo = /\d+ \d+ \d+ (\d+|L|LW|1W) 1\/\d+ [\?\*] \*/;
const monthlyWeekdayExpo = /\d+ \d+ \d+ [\?\*] 1\/\d+ (MON|TUE|WED|THU|FRI|SAT|SUN)((#[1-5])|L) \*/;
const yearlyExp = /\d+ \d+ \d+ (\d+|L|LW|1W) \d+ [\?\*] \*/;
const yearlyMonthWeekExp = /\d+ \d+ \d+ [\?\*] \d+ (MON|TUE|WED|THU|FRI|SAT|SUN)((#[1-5])|L) \*/;
const CRON_VALUE_ACCESSOR = {
  provide: _angular_forms__WEBPACK_IMPORTED_MODULE_2__.NG_VALUE_ACCESSOR,
  useExisting: (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.forwardRef)(() => CronGenComponent),
  multi: true
};
function parseCronNumberToken(val) {
  const v = val.split('/').map(x => parseInt(x, 10));
  if (v.length === 1) {
    return {
      val: v[0],
      inc: 0
    };
  }
  return {
    val: v[0],
    inc: v[1]
  };
}
function* range(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}
class CronGenComponent {
  get isCronFlavorQuartz() {
    return this.options.cronFlavor === 'quartz';
  }
  get isCronFlavorStandard() {
    return this.options.cronFlavor === 'standard';
  }
  get yearDefaultChar() {
    return this.options.cronFlavor === 'quartz' ? '*' : '';
  }
  get weekDayDefaultChar() {
    return this.options.cronFlavor === 'quartz' ? '?' : '*';
  }
  get monthDayDefaultChar() {
    return this.options.cronFlavor === 'quartz' ? '?' : '*';
  }
  constructor(fb) {
    this.fb = fb;
    this.seconds = [...range(0, 59)];
    this.minutes = [...range(0, 59)];
    this.hours = [...range(0, 23)];
    this.disabled = false;
    this.options = new DefaultOptions();
    this.selectOptions = this.getSelectOptions();
    this.touched = false;
    this.allForm = this.fb.group({
      cronType: ['unknown', _angular_forms__WEBPACK_IMPORTED_MODULE_2__.Validators.required],
      seconds: [0],
      minutes: [0],
      minutesPer: [0],
      hours: [this.getAmPmHour(0)],
      hoursPer: [0],
      hoursType: [this.getHourType(0)],
      days: [0],
      daysPer: [0],
      months: [0],
      monthsInc: [0],
      day: ['1'],
      monthsWeek: ['#1'],
      weekdaysOnly: [false],
      specificWeekDay: [false],
      specificMonthWeek: [false],
      MON: [true],
      TUE: [true],
      WED: [true],
      THU: [true],
      FRI: [true],
      SAT: [true],
      SUN: [true],
      expression: ['0 0 0 0 0']
    });
  }
  /* Update the cron output to that of the selected tab.
   * The cron output value is updated whenever a form is updated. To make it change in response to tab selection, we simply reset
   * the value of the form that goes into focus.
   * We cannot rely on the index of the tab, as the hide options could hide tabs and
   * then the index dynamically changes based on the hidden tab.*/
  onTabChange(tabChangeEvent) {
    const currentTab = tabChangeEvent.tab;
    let x;
    switch (currentTab) {
      case this.minutesTab:
        x = 'minutely';
        break;
      case this.hourlyTab:
        x = 'hourly';
        break;
      case this.dailyTab:
        x = 'daily';
        break;
      case this.weeklyTab:
        x = 'weekly';
        break;
      case this.monthlyTab:
        x = 'monthly';
        break;
      case this.yearlyTab:
        x = 'yearly';
        break;
      case this.advancedTab:
        x = 'unknown';
        break;
      default:
        throw new Error('Invalid tab selected');
    }
    this.allForm.controls.cronType.setValue(x);
  }
  ngOnInit() {
    var _this = this;
    return (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this.formSub = _this.allForm.valueChanges.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_7__.debounceTime)(50)).subscribe(value => {
        _this.markAsTouched();
        const cron = _this.computeCron();
        // this.allForm.controls.expression.setValue(cron, {emitEvent: false});
        _this.onChange(cron);
      });
    })();
  }
  ngOnDestroy() {
    this.formSub.unsubscribe();
  }
  computeCron() {
    let cron;
    switch (this.allForm.value.cronType) {
      case 'minutely':
        cron = this.computeMinutesCron();
        break;
      case 'hourly':
        cron = this.computeHourlyCron();
        break;
      case 'daily':
        cron = this.computeDailyCron();
        break;
      case 'weekly':
        cron = this.computeWeeklyCron();
        break;
      case 'monthly':
        cron = this.computeMonthlyCron();
        break;
      case 'yearly':
        cron = this.computeYearlyCron();
        break;
      case 'unknown':
        cron = this.computeAdvancedExpression();
        break;
      default:
        throw Error('Unknown cron type ' + this.allForm.value.cronType);
    }
    return cron;
  }
  computeMinutesCron() {
    const state = this.allForm.value;
    // tslint:disable-next-line:max-line-length
    return `${this.isCronFlavorQuartz ? state.seconds : ''} 0/${state.minutesPer} * 1/1 * ${this.weekDayDefaultChar} ${this.yearDefaultChar}`.trim();
  }
  computeHourlyCron() {
    const state = this.allForm.value;
    return `${this.isCronFlavorQuartz ? state.seconds : ''} ${state.minutes} 0/${state.hoursPer} 1/1 * ${this.weekDayDefaultChar} ${this.yearDefaultChar}`.trim();
  }
  computeDailyCron() {
    if (this.allForm.value.weekdaysOnly) {
      return this.computeEveryWeekdayCron();
    }
    return this.computeEveryDaysCron();
  }
  computeEveryDaysCron() {
    const state = this.allForm.value;
    return `${this.isCronFlavorQuartz ? state.seconds : ''} ${state.minutes} ${this.hourToCron(state.hours, state.hoursType)} 1/${state.daysPer} * ${this.weekDayDefaultChar} ${this.yearDefaultChar}`.trim();
  }
  computeEveryWeekdayCron() {
    const state = this.allForm.value;
    return `${this.isCronFlavorQuartz ? state.seconds : ''} ${state.minutes} ${this.hourToCron(state.hours, state.hoursType)} ${this.monthDayDefaultChar} * MON-FRI ${this.yearDefaultChar}`.trim();
  }
  computeWeeklyCron() {
    const state = this.allForm.value;
    const days = this.selectOptions.days.reduce((acc, day) => state[day] ? acc.concat([day]) : acc, []).join(',');
    return `${this.isCronFlavorQuartz ? state.seconds : ''} ${state.minutes} ${this.hourToCron(state.hours, state.hoursType)} ${this.monthDayDefaultChar} * ${days} ${this.yearDefaultChar}`.trim();
  }
  computeMonthlyCron() {
    const state = this.allForm.value;
    if (state.specificWeekDay) {
      return `${this.isCronFlavorQuartz ? state.seconds : ''} ${state.minutes} ${this.hourToCron(state.hours, state.hoursType)} ${this.monthDayDefaultChar} 1/${state.monthsInc} ${state.day}${state.monthsWeek} ${this.yearDefaultChar}`.trim();
    }
    return `${this.isCronFlavorQuartz ? state.seconds : ''} ${state.minutes} ${this.hourToCron(state.hours, state.hoursType)} ${state.days} 1/${state.monthsInc} ${this.weekDayDefaultChar} ${this.yearDefaultChar}`.trim();
  }
  computeYearlyCron() {
    const state = this.allForm.value;
    if (state.specificMonthWeek) {
      return `${this.isCronFlavorQuartz ? state.seconds : ''} ${state.minutes} ${this.hourToCron(state.hours, state.hoursType)} ${this.monthDayDefaultChar} ${state.months} ${state.day}${state.monthsWeek} ${this.yearDefaultChar}`.trim();
    }
    return `${this.isCronFlavorQuartz ? state.seconds : ''} ${state.minutes} ${this.hourToCron(state.hours, state.hoursType)} ${state.day} ${state.months} ${this.weekDayDefaultChar} ${this.yearDefaultChar}`.trim();
  }
  computeAdvancedExpression() {
    const state = this.allForm.value;
    return state.expression;
  }
  dayDisplay(day) {
    return Days[day];
  }
  monthWeekDisplay(monthWeekNumber) {
    return MonthWeeks[monthWeekNumber];
  }
  monthDisplay(month) {
    return Months[month];
  }
  monthDayDisplay(month) {
    if (month === 'L') {
      return 'Last Day';
    } else if (month === 'LW') {
      return 'Last Weekday';
    } else if (month === '1W') {
      return 'First Weekday';
    } else {
      return `${month}${this.getOrdinalSuffix(month)}`;
    }
  }
  getAmPmHour(hour) {
    return this.options.use24HourTime ? hour : (hour + 11) % 12 + 1;
  }
  getHourType(hour) {
    return this.options.use24HourTime ? undefined : hour >= 12 ? 'PM' : 'AM';
  }
  hourToCron(hour, hourType) {
    if (this.options.use24HourTime) {
      return hour;
    } else {
      return hourType === 'AM' ? hour === 12 ? 0 : hour : hour === 12 ? 12 : hour + 12;
    }
  }
  handleModelChange(cron) {
    if (!this.cronIsValid(cron)) {
      if (this.isCronFlavorQuartz) {
        throw new Error('Invalid cron expression, there must be 6 or 7 segments');
      }
      if (this.isCronFlavorStandard) {
        throw new Error('Invalid cron expression, there must be 5 segments');
      }
    }
    // Store original cron expression here.
    this.allForm.controls.expression.setValue(cron);
    // Normalize cron so that second segment is included.
    if (cron.split(' ').length === 5 && this.isCronFlavorStandard) {
      cron = `0 ${cron} *`;
    }
    // Parse cron tokens
    const t = cron.split(' ');
    // Seconds
    this.allForm.controls.seconds.setValue(parseInt(t[0], 10), {
      emitEvent: false
    });
    // Minutes
    let x = parseCronNumberToken(t[1]);
    this.allForm.controls.minutesPer.setValue(x.inc, {
      emitEvent: false
    });
    this.allForm.controls.minutes.setValue(x.val);
    // Hours
    x = parseCronNumberToken(t[2]);
    this.allForm.controls.hoursPer.setValue(x.inc);
    this.allForm.controls.hours.setValue(x.val);
    this.allForm.controls.hoursType.setValue(this.getHourType(this.allForm.value.hours), {
      emitEvent: false
    });
    // Day of Month
    x = parseCronNumberToken(t[3]);
    this.allForm.controls.days.setValue(x.val, {
      emitEvent: false
    });
    this.allForm.controls.daysPer.setValue(x.val), {
      emitEvent: false
    };
    // Month
    x = parseCronNumberToken(t[4]);
    this.allForm.controls.months.setValue(x.val, {
      emitEvent: false
    });
    this.allForm.controls.monthsInc.setValue(x.inc, {
      emitEvent: false
    });
    // Day of Week
    this.allForm.controls.day.setValue(t[5]);
    if (t[5].match('MON')) {
      this.allForm.controls.MON.setValue(true, {
        emitEvent: false
      });
    } else {
      this.allForm.controls.MON.setValue(false, {
        emitEvent: false
      });
    }
    if (t[5].match('TUE')) {
      this.allForm.controls.TUE.setValue(true, {
        emitEvent: false
      });
    } else {
      this.allForm.controls.TUE.setValue(false, {
        emitEvent: false
      });
    }
    if (t[5].match('WED')) {
      this.allForm.controls.WED.setValue(true, {
        emitEvent: false
      });
    } else {
      this.allForm.controls.WED.setValue(false, {
        emitEvent: false
      });
    }
    if (t[5].match('THU')) {
      this.allForm.controls.THU.setValue(true, {
        emitEvent: false
      });
    } else {
      this.allForm.controls.THU.setValue(false, {
        emitEvent: false
      });
    }
    if (t[5].match('FRI')) {
      this.allForm.controls.FRI.setValue(true, {
        emitEvent: false
      });
    } else {
      this.allForm.controls.FRI.setValue(false, {
        emitEvent: false
      });
    }
    if (t[5].match('SAT')) {
      this.allForm.controls.SAT.setValue(true, {
        emitEvent: false
      });
    } else {
      this.allForm.controls.SAT.setValue(false, {
        emitEvent: false
      });
    }
    if (t[5].match('SUN')) {
      this.allForm.controls.SUN.setValue(true, {
        emitEvent: false
      });
    } else {
      this.allForm.controls.SUN.setValue(false, {
        emitEvent: false
      });
    }
    // Year
    // Not supported
    if (cron.match(minutesExp)) {
      this.allForm.controls.cronType.setValue('minutely', {
        emitEvent: false
      });
    } else if (cron.match(hourlyExp)) {
      this.allForm.controls.cronType.setValue('hourly', {
        emitEvent: false
      });
    } else if (cron.match(dailyExp)) {
      this.allForm.controls.cronType.setValue('daily', {
        emitEvent: false
      });
      this.allForm.controls.weekdaysOnly.setValue(false);
    } else if (cron.match(dailyWeekdayExp)) {
      this.allForm.controls.cronType.setValue('daily', {
        emitEvent: false
      });
      this.allForm.controls.weekdaysOnly.setValue(true);
    } else if (cron.match(weeklyExp)) {
      this.allForm.controls.cronType.setValue('weekly', {
        emitEvent: false
      });
    } else if (cron.match(monthlyExpo)) {
      this.allForm.controls.cronType.setValue('monthly', {
        emitEvent: false
      });
      this.allForm.controls.specificWeekDay.setValue(false);
    } else if (cron.match(monthlyWeekdayExpo)) {
      this.allForm.controls.cronType.setValue('monthly', {
        emitEvent: false
      });
      this.allForm.controls.specificWeekDay.setValue(true);
    } else if (cron.match(yearlyExp)) {
      this.allForm.controls.cronType.setValue('yearly', {
        emitEvent: false
      });
      this.allForm.controls.specificMonthWeek.setValue(false);
    } else if (cron.match(yearlyMonthWeekExp)) {
      this.allForm.controls.cronType.setValue('yearly', {
        emitEvent: false
      });
      this.allForm.controls.specificMonthWeek.setValue(false);
    } else {
      this.allForm.controls.cronType.setValue('unknown', {
        emitEvent: false
      });
    }
    this.allForm.updateValueAndValidity({
      onlySelf: true
    });
  }
  cronIsValid(cron) {
    if (cron) {
      const cronParts = cron.split(' ');
      return this.isCronFlavorQuartz && (cronParts.length === 6 || cronParts.length === 7) || this.isCronFlavorStandard && cronParts.length === 5;
    }
    return false;
  }
  getOrdinalSuffix(value) {
    if (value.length > 1) {
      const secondToLastDigit = value.charAt(value.length - 2);
      if (secondToLastDigit === '1') {
        return 'th';
      }
    }
    const lastDigit = value.charAt(value.length - 1);
    switch (lastDigit) {
      case '1':
        return 'st';
      case '2':
        return 'nd';
      case '3':
        return 'rd';
      default:
        return 'th';
    }
  }
  getSelectOptions() {
    return {
      months: this.getRange(1, 12),
      monthWeeks: ['#1', '#2', '#3', '#4', '#5', 'L'],
      days: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
      minutes: this.getRange(0, 59),
      fullMinutes: this.getRange(0, 59),
      seconds: this.getRange(0, 59),
      hours: this.getRange(1, 23),
      monthDays: this.getRange(1, 31),
      monthDaysWithLasts: ['1W', ...[...this.getRange(1, 31).map(String)], 'LW', 'L'],
      monthDaysWithOutLasts: [...[...this.getRange(1, 31).map(String)]],
      hourTypes: ['AM', 'PM']
    };
  }
  getRange(start, end) {
    const length = end - start + 1;
    return Array.apply(null, Array(length)).map((_, i) => i + start);
  }
  writeValue(obj) {
    // console.log('Write value ' + obj);
    if (obj === null) {
      return;
    }
    this.handleModelChange(obj);
  }
  registerOnChange(fn) {
    this.onChange = fn;
  }
  registerOnTouched(fn) {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled) {
    this.disabled = isDisabled;
  }
  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }
}
_class2 = CronGenComponent;
_class2.ɵfac = function _class2_Factory(t) {
  return new (t || _class2)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormBuilder));
};
_class2.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
  type: _class2,
  selectors: [["cron-editor"]],
  viewQuery: function _class2_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵviewQuery"](_c0, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵviewQuery"](_c1, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵviewQuery"](_c2, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵviewQuery"](_c3, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵviewQuery"](_c4, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵviewQuery"](_c5, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵviewQuery"](_c6, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵloadQuery"]()) && (ctx.minutesTab = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵloadQuery"]()) && (ctx.hourlyTab = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵloadQuery"]()) && (ctx.dailyTab = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵloadQuery"]()) && (ctx.weeklyTab = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵloadQuery"]()) && (ctx.monthlyTab = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵloadQuery"]()) && (ctx.yearlyTab = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵloadQuery"]()) && (ctx.advancedTab = _t.first);
    }
  },
  inputs: {
    backgroundColor: "backgroundColor",
    color: "color",
    disabled: "disabled",
    options: "options"
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵProvidersFeature"]([CRON_VALUE_ACCESSOR])],
  decls: 9,
  vars: 9,
  consts: [[1, "cron-editor-main"], [1, "cron-editor-container", 3, "backgroundColor", "color", "selectedTabChange"], ["class", "cron-editor-tab", "label", "Minutely", 3, "formGroup", 4, "ngIf"], ["class", "cron-editor-tab", "label", "Hourly", 4, "ngIf"], ["class", "cron-editor-tab", "label", "Daily", 4, "ngIf"], ["class", "cron-editor-tab", "label", "Weekly", 4, "ngIf"], ["class", "cron-editor-tab", "label", "Monthly", 4, "ngIf"], ["class", "cron-editor-tab", "label", "Yearly", 4, "ngIf"], ["class", "cron-editor-tab", "label", "Advanced", 4, "ngIf"], ["label", "Minutely", 1, "cron-editor-tab", 3, "formGroup"], ["minutesTab", ""], [1, "cron-editor-tab-content", 3, "click"], [1, "cron-form-label"], ["formControlName", "minutesPer"], [3, "value", 4, "ngFor", "ngForOf"], [4, "ngIf"], [3, "value"], [3, "formGroup", "hideHours", "hideMinutes", "use24HourTime", "hideSeconds"], ["label", "Hourly", 1, "cron-editor-tab"], ["hourlyTab", ""], [3, "formGroup"], ["formControlName", "hoursPer"], [3, "formGroup", "hideHours", "use24HourTime", "hideSeconds"], ["label", "Daily", 1, "cron-editor-tab"], ["dailyTab", ""], ["formControlName", "weekdaysOnly", 1, "cron-editor-radio-group"], ["name", "subTab", 1, "cron-editor-radio-button", 3, "value", "checked"], ["formControlName", "daysPer"], ["name", "subTab", 1, "cron-editor-radio-button", 3, "value"], [3, "formGroup", "use24HourTime", "hideSeconds"], ["label", "Weekly", 1, "cron-editor-tab"], ["weeklyTab", ""], ["formControlName", "MON", 1, "checkbox-margin"], ["formControlName", "TUE", 1, "checkbox-margin"], ["formControlName", "WED", 1, "checkbox-margin"], ["formControlName", "THU", 1, "checkbox-margin"], ["formControlName", "FRI", 1, "checkbox-margin"], ["formControlName", "SAT", 1, "checkbox-margin"], ["formControlName", "SUN", 1, "checkbox-margin"], ["label", "Monthly", 1, "cron-editor-tab"], ["monthlyTab", ""], [1, "cron-editor-tab-content", 3, "formGroup", "click"], ["formControlName", "specificWeekDay", 1, "cron-editor-radio-group"], ["name", "monthly-radio", 1, "cron-editor-radio-button", 3, "value", "ngClass"], ["formControlName", "monthsInc", 1, "months-small", 3, "ngClass"], ["formControlName", "monthsWeek", 1, "day-order-in-month", 3, "ngClass"], ["formControlName", "day", 1, "week-days", 3, "ngClass"], ["formControlName", "monthsInc", 1, "months-small"], ["formControlName", "days", 1, "month-days"], ["label", "Yearly", 1, "cron-editor-tab"], ["yearlyTab", ""], [1, "cron-editor-tab-content", 3, "formGroup"], ["formControlName", "specificMonthWeek", 1, "cron-editor-radio-group"], ["name", "yearly-radio", 1, "cron-editor-radio-button", 3, "value", "ngClass"], ["formControlName", "months", 1, "months"], ["name", "yearly-radio", "value", "specificMonthWeek", 1, "cron-editor-radio-button", 3, "ngClass"], ["formControlName", "monthsWeek", 1, "day-order-in-month"], ["formControlName", "day", 1, "week-days"], [3, "disabled", "formGroup", "use24HourTime", "hideSeconds"], ["formControlName", "day", 1, "month-days"], ["label", "Advanced", 1, "cron-editor-tab"], ["advancedTab", ""], ["matInput", "", "type", "text", "formControlName", "expression", 1, "advanced-cron-editor-input"]],
  template: function _class2_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "section", 0)(1, "mat-tab-group", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("selectedTabChange", function _class2_Template_mat_tab_group_selectedTabChange_1_listener($event) {
        return ctx.onTabChange($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](2, _class2_mat_tab_2_Template, 12, 3, "mat-tab", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](3, _class2_mat_tab_3_Template, 15, 6, "mat-tab", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](4, _class2_mat_tab_4_Template, 20, 8, "mat-tab", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](5, _class2_mat_tab_5_Template, 25, 4, "mat-tab", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](6, _class2_mat_tab_6_Template, 36, 17, "mat-tab", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](7, _class2_mat_tab_7_Template, 35, 14, "mat-tab", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](8, _class2_mat_tab_8_Template, 7, 1, "mat-tab", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("backgroundColor", ctx.backgroundColor)("color", ctx.color);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx.options.hideMinutesTab);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx.options.hideHourlyTab);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx.options.hideDailyTab);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx.options.hideWeeklyTab);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx.options.hideMonthlyTab);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx.options.hideYearlyTab);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx.options.hideAdvancedTab);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_3__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_3__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormControlName, _angular_material_tabs__WEBPACK_IMPORTED_MODULE_8__.MatTab, _angular_material_tabs__WEBPACK_IMPORTED_MODULE_8__.MatTabGroup, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_4__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_4__.MatLabel, _angular_material_select__WEBPACK_IMPORTED_MODULE_5__.MatSelect, _angular_material_core__WEBPACK_IMPORTED_MODULE_6__.MatOption, _angular_material_input__WEBPACK_IMPORTED_MODULE_9__.MatInput, _angular_material_radio__WEBPACK_IMPORTED_MODULE_10__.MatRadioGroup, _angular_material_radio__WEBPACK_IMPORTED_MODULE_10__.MatRadioButton, _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_11__.MatCheckbox, TimePickerComponent],
  styles: [".cron-editor-main[_ngcontent-%COMP%]{@include mat-elevation(1);}.cron-editor-tab-content[_ngcontent-%COMP%]{margin-top:24px;border-radius:8px}.cron-editor-main[_ngcontent-%COMP%]   .cron-editor-container[_ngcontent-%COMP%]   .cron-editor-radio[_ngcontent-%COMP%]{width:20px;display:inline-block}.cron-editor-main[_ngcontent-%COMP%]   .cron-editor-container[_ngcontent-%COMP%]   .cron-editor-select[_ngcontent-%COMP%], .cron-editor-main[_ngcontent-%COMP%]   .cron-editor-container[_ngcontent-%COMP%]   .cron-editor-input[_ngcontent-%COMP%], .cron-editor-main[_ngcontent-%COMP%]   .cron-editor-container[_ngcontent-%COMP%]   .cron-editor-checkbox[_ngcontent-%COMP%]{display:inline-block}.cron-editor-main[_ngcontent-%COMP%]   .cron-editor-container[_ngcontent-%COMP%]   .well-time-wrapper[_ngcontent-%COMP%]{padding-left:20px}.cron-editor-main[_ngcontent-%COMP%]   .cron-editor-container[_ngcontent-%COMP%]   .inline-block[_ngcontent-%COMP%]{display:inline-block}.nav-tabs[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{cursor:pointer}.cron-editor-daily[_ngcontent-%COMP%]{display:flex}.cron-editor-dail-hours[_ngcontent-%COMP%]{align-self:center}.cron-editor-radio-group[_ngcontent-%COMP%]{flex-direction:column;margin:15px 0;display:inline-flex}.cron-editor-radio-button[_ngcontent-%COMP%]{margin:5px}.checkbox-margin[_ngcontent-%COMP%]{margin:0 10px}"]
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](CronGenComponent, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Component,
    args: [{
      selector: 'cron-editor',
      providers: [CRON_VALUE_ACCESSOR],
      template: "<section class=\"cron-editor-main\">\n  <mat-tab-group class=\"cron-editor-container\" (selectedTabChange)=\"onTabChange($event)\" [backgroundColor]=\"backgroundColor\" [color]=\"color\">\n\n    <!-- Minute -->\n    <mat-tab [formGroup]=\"allForm\" class=\"cron-editor-tab\" label=\"Minutely\" *ngIf=\"!options.hideMinutesTab\" #minutesTab>\n      <div class=\"cron-editor-tab-content\" (click)=\"allForm.controls.cronType.setValue('minutely')\">\n\n        <div>\n          <span class=\"cron-form-label\">Every </span>\n          <mat-form-field>\n            <mat-label>Minute(s)</mat-label>\n            <mat-select formControlName=\"minutesPer\">\n              <mat-option *ngFor=\"let minute of minutes\" [value]=\"minute\">{{minute}}</mat-option>\n            </mat-select>\n          </mat-form-field>\n        </div>\n\n        <div *ngIf=\"isCronFlavorQuartz\">\n          <span>At time </span>\n          <cron-time-picker\n            [formGroup]=\"allForm\"\n            [hideHours] = true\n            [hideMinutes] = true\n            [use24HourTime]=\"options.use24HourTime\"\n            [hideSeconds]=\"options.hideSeconds || !isCronFlavorQuartz\">\n          </cron-time-picker>\n        </div>\n\n      </div>\n    </mat-tab>\n\n    <!-- Hourly -->\n    <mat-tab  class=\"cron-editor-tab\" label=\"Hourly\" *ngIf=\"!options.hideHourlyTab\" #hourlyTab>\n      <div class=\"cron-editor-tab-content\" (click)=\"allForm.controls.cronType.setValue('hourly')\">\n        <div>\n          <span class=\"cron-form-label\">Every </span>\n          <mat-form-field [formGroup]=\"allForm\">\n            <mat-label>Hour(s)</mat-label>\n            <mat-select formControlName=\"hoursPer\">\n              <mat-option *ngFor=\"let hour of hours\" [value]=\"hour\">{{hour}}</mat-option>\n            </mat-select>\n          </mat-form-field>\n        </div>\n        <div>\n          <span>At time </span>\n          <cron-time-picker\n              [formGroup]=\"allForm\"\n              [hideHours] = true\n              [use24HourTime]=\"options.use24HourTime\"\n              [hideSeconds]=\"options.hideSeconds || !isCronFlavorQuartz\">\n          </cron-time-picker>\n        </div>\n      </div>\n    </mat-tab>\n\n    <!-- Daily-->\n    <mat-tab  class=\"cron-editor-tab\" label=\"Daily\" *ngIf=\"!options.hideDailyTab\" #dailyTab>\n      <div class=\"cron-editor-tab-content\" (click)=\"allForm.controls.cronType.setValue('daily')\">\n\n        <div [formGroup]=\"allForm\">\n          <span class=\"cron-form-label\">Every </span>\n            <mat-radio-group class=\"cron-editor-radio-group\" formControlName=\"weekdaysOnly\" >\n              <mat-radio-button name=\"subTab\" class=\"cron-editor-radio-button\" [value]=\"false\"  [checked]=\"true\" >\n                <mat-form-field>\n                  <mat-label>Day(s)</mat-label>\n                  <mat-select formControlName=\"daysPer\">\n                    <mat-option *ngFor=\"let monthDay of selectOptions.monthDays\" [value]=\"monthDay\">\n                      {{monthDay}}\n                    </mat-option>\n                  </mat-select>\n                </mat-form-field>\n              </mat-radio-button>\n              <mat-radio-button name=\"subTab\" class=\"cron-editor-radio-button\" [value]=\"true\">\n                <span>Week Day (MON-FRI) </span>\n              </mat-radio-button>\n            </mat-radio-group>\n        </div>\n\n        <div>\n          <span>At time </span>\n          <cron-time-picker\n            [formGroup]=\"allForm\"\n            [use24HourTime]=\"options.use24HourTime\"\n            [hideSeconds]=\"options.hideSeconds || !isCronFlavorQuartz\">\n          </cron-time-picker>\n        </div>\n      </div>\n\n    </mat-tab>\n\n    <!-- Weekly-->\n    <mat-tab  class=\"cron-editor-tab\" label=\"Weekly\" *ngIf=\"!options.hideWeeklyTab\" #weeklyTab >\n      <div class=\"cron-editor-tab-content\" (click)=\"allForm.controls.cronType.setValue('weekly')\">\n\n        <div>\n          <span class=\"cron-form-label\">Every</span>\n\n          <div [formGroup]=\"allForm\">\n            <mat-checkbox class=\"checkbox-margin\" formControlName=\"MON\">Monday</mat-checkbox>\n            <mat-checkbox class=\"checkbox-margin\" formControlName=\"TUE\">Tuesday</mat-checkbox>\n            <mat-checkbox class=\"checkbox-margin\" formControlName=\"WED\">Wednesday</mat-checkbox>\n            <mat-checkbox class=\"checkbox-margin\" formControlName=\"THU\">Thursday</mat-checkbox>\n            <mat-checkbox class=\"checkbox-margin\" formControlName=\"FRI\">Friday</mat-checkbox>\n            <mat-checkbox class=\"checkbox-margin\" formControlName=\"SAT\">Saturday</mat-checkbox>\n            <mat-checkbox class=\"checkbox-margin\" formControlName=\"SUN\">Sunday</mat-checkbox>\n          </div>\n        </div>\n\n        <div>\n          <span class=\"cron-form-label\"> At </span>\n          <cron-time-picker [formGroup]=\"allForm\"\n                            [use24HourTime]=\"options.use24HourTime\"\n                            [hideSeconds]=\"options.hideSeconds|| !isCronFlavorQuartz\">\n          </cron-time-picker>\n        </div>\n      </div>\n    </mat-tab>\n\n    <!-- Monthly-->\n    <mat-tab class=\"cron-editor-tab\" label=\"Monthly\" *ngIf=\"!options.hideMonthlyTab\" #monthlyTab>\n      <div class=\"cron-editor-tab-content\" [formGroup]=\"allForm\" (click)=\"allForm.controls.cronType.setValue('monthly')\">\n\n        <mat-radio-group class=\"cron-editor-radio-group\" formControlName=\"specificWeekDay\">\n          <mat-radio-button name=\"monthly-radio\" class=\"cron-editor-radio-button\" [value]=\"false\" [ngClass]=\"options.formRadioClass\">\n            <!-- Spesific day -->\n\n              On the\n\n              <ng-container *ngIf=\"options.cronFlavor === 'quartz'\">\n                <mat-form-field>\n                  <mat-label>Day</mat-label>\n                  <mat-select class=\"month-days\" formControlName=\"days\">\n                    <mat-option *ngFor=\"let monthDaysWithLast of selectOptions.monthDaysWithLasts\" [value]=\"monthDaysWithLast\">\n                      {{monthDayDisplay(monthDaysWithLast)}}\n                    </mat-option>\n                  </mat-select>\n                </mat-form-field>\n              </ng-container>\n\n              <ng-container *ngIf=\"options.cronFlavor === 'standard'\">\n                <mat-form-field>\n                  <mat-label>Day</mat-label>\n                  <mat-select class=\"month-days\" formControlName=\"days\">\n                    <mat-option *ngFor=\"let monthDaysWithOutLast of selectOptions.monthDaysWithOutLasts\" [value]=\"monthDaysWithOutLast\">\n                      {{monthDayDisplay(monthDaysWithOutLast)}}\n                    </mat-option>\n                  </mat-select>\n                </mat-form-field>\n              </ng-container>\n\n              of every\n\n                <mat-form-field>\n                  <mat-label>Month</mat-label>\n                  <mat-select class=\"months-small\" formControlName=\"monthsInc\" [ngClass]=\"options.formSelectClass\">\n                    <mat-option *ngFor=\"let month of selectOptions.months\" [value]=\"month\">\n                      {{month}}\n                    </mat-option>\n                  </mat-select>\n                </mat-form-field>\n\n          </mat-radio-button>\n\n          <mat-radio-button name=\"monthly-radio\" class=\"cron-editor-radio-button\"  [value]=\"true\" [ngClass]=\"options.formRadioClass\">\n            <!-- Spesific Week day -->\n\n              On the\n\n              <mat-form-field>\n                <mat-label>Week</mat-label>\n                <mat-select class=\"day-order-in-month\" formControlName=\"monthsWeek\" [ngClass]=\"options.formSelectClass\">\n                  <mat-option *ngFor=\"let monthWeek of selectOptions.monthWeeks\" [value]=\"monthWeek\">\n                    {{monthWeekDisplay(monthWeek)}}\n                  </mat-option>\n                </mat-select>\n              </mat-form-field>\n\n              <mat-form-field>\n                <mat-label>Day</mat-label>\n                <mat-select class=\"week-days\" formControlName=\"day\" [ngClass]=\"options.formSelectClass\">\n                  <mat-option *ngFor=\"let day of selectOptions.days\" [value]=\"day\">\n                    {{dayDisplay(day)}}\n                  </mat-option>\n                </mat-select>\n              </mat-form-field>\n\n              of every\n\n              <mat-form-field>\n                <mat-label>Month</mat-label>\n                <mat-select class=\"months-small\" formControlName=\"monthsInc\">\n                  <mat-option *ngFor=\"let month of selectOptions.months\" [value]=\"month\">\n                    {{month}}\n                  </mat-option>\n                </mat-select>\n              </mat-form-field>\n          </mat-radio-button>\n        </mat-radio-group>\n\n        <div>\n          <span>At time </span>\n          <cron-time-picker [formGroup]=\"allForm\"\n                            [use24HourTime]=\"options.use24HourTime\"\n                            [hideSeconds]=\"options.hideSeconds || !isCronFlavorQuartz\">\n          </cron-time-picker>\n        </div>\n      </div>\n    </mat-tab>\n\n    <!-- Yearly-->\n    <mat-tab class=\"cron-editor-tab\"  label=\"Yearly\" *ngIf=\"!options.hideYearlyTab\" #yearlyTab>\n      <div class=\"cron-editor-tab-content\" [formGroup]=\"allForm\">\n        <mat-radio-group class=\"cron-editor-radio-group\" formControlName=\"specificMonthWeek\">\n          <mat-radio-button name=\"yearly-radio\" class=\"cron-editor-radio-button\" [value]=\"false\" [ngClass]=\"options.formRadioClass\">\n\n            On the\n\n            <mat-form-field  *ngIf=\"options.cronFlavor === 'quartz'\">\n              <mat-label>Day</mat-label>\n              <mat-select class=\"month-days\" formControlName=\"day\">\n                <mat-option *ngFor=\"let monthDaysWithLast of selectOptions.monthDaysWithLasts\" [value]=\"monthDaysWithLast\">\n                  {{monthDayDisplay(monthDaysWithLast)}}\n                </mat-option>\n              </mat-select>\n            </mat-form-field>\n\n            <mat-form-field *ngIf=\"options.cronFlavor === 'standard'\">\n              <mat-label>Day</mat-label>\n              <mat-select class=\"month-days\" formControlName=\"day\" >\n                <mat-option *ngFor=\"let monthDaysWithOutLast of selectOptions.monthDaysWithOutLasts\" [value]=\"monthDaysWithOutLast\">\n                  {{monthDayDisplay(monthDaysWithOutLast)}}\n                </mat-option>\n              </mat-select>\n            </mat-form-field>\n\n            of\n\n            <mat-form-field>\n              <mat-label>Month</mat-label>\n              <mat-select class=\"months\" formControlName=\"months\">\n                <mat-option *ngFor=\"let month of selectOptions.months\" [value]=\"month\">\n                  {{monthDisplay(month)}}\n                </mat-option>\n              </mat-select>\n            </mat-form-field>\n\n          </mat-radio-button>\n\n          <mat-radio-button name=\"yearly-radio\" class=\"cron-editor-radio-button\" value=\"specificMonthWeek\" [ngClass]=\"options.formRadioClass\">\n\n            On the\n\n            <mat-form-field >\n              <mat-label>Week</mat-label>\n              <mat-select class=\"day-order-in-month\" formControlName=\"monthsWeek\" >\n                <mat-option *ngFor=\"let monthWeek of selectOptions.monthWeeks\" [value]=\"monthWeek\">\n                  {{monthWeekDisplay(monthWeek)}}\n                </mat-option>\n              </mat-select>\n            </mat-form-field>\n\n            <mat-form-field>\n              <mat-label>Day</mat-label>\n              <mat-select class=\"week-days\"  formControlName=\"day\" >\n                <mat-option *ngFor=\"let day of selectOptions.days\" [value]=\"day\">\n                  {{dayDisplay(day)}}\n                </mat-option>\n              </mat-select>\n            </mat-form-field>\n\n            of\n\n            <mat-form-field>\n              <mat-label>Month</mat-label>\n              <mat-select class=\"months\" formControlName=\"months\">\n                <mat-option *ngFor=\"let month of selectOptions.months\" [value]=\"month\">\n                  {{monthDisplay(month)}}\n                </mat-option>\n              </mat-select>\n            </mat-form-field>\n\n          </mat-radio-button>\n        </mat-radio-group>\n\n        <div>\n        At time\n          <cron-time-picker [disabled]=\"disabled\"\n                            [formGroup]=\"allForm\"\n                            [use24HourTime]=\"options.use24HourTime\"\n                            [hideSeconds]=\"options.hideSeconds || !isCronFlavorQuartz\">\n          </cron-time-picker>\n        </div>\n\n      </div>\n    </mat-tab>\n\n    <!-- Advanced-->\n    <mat-tab class=\"cron-editor-tab\" label=\"Advanced\" *ngIf=\"!options.hideAdvancedTab\" #advancedTab>\n      <div class=\"cron-editor-tab-content\" [formGroup]=\"allForm\">\n        <mat-form-field>\n          <mat-label>Expression</mat-label>\n          <input matInput type=\"text\" class=\"advanced-cron-editor-input\" formControlName=\"expression\">\n        </mat-form-field>\n      </div>\n    </mat-tab>\n\n\n\n  </mat-tab-group>\n</section>\n",
      styles: [".cron-editor-main{@include mat-elevation(1);}.cron-editor-tab-content{margin-top:24px;border-radius:8px}.cron-editor-main .cron-editor-container .cron-editor-radio{width:20px;display:inline-block}.cron-editor-main .cron-editor-container .cron-editor-select,.cron-editor-main .cron-editor-container .cron-editor-input,.cron-editor-main .cron-editor-container .cron-editor-checkbox{display:inline-block}.cron-editor-main .cron-editor-container .well-time-wrapper{padding-left:20px}.cron-editor-main .cron-editor-container .inline-block{display:inline-block}.nav-tabs li a{cursor:pointer}.cron-editor-daily{display:flex}.cron-editor-dail-hours{align-self:center}.cron-editor-radio-group{flex-direction:column;margin:15px 0;display:inline-flex}.cron-editor-radio-button{margin:5px}.checkbox-margin{margin:0 10px}\n"]
    }]
  }], function () {
    return [{
      type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormBuilder
    }];
  }, {
    backgroundColor: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    color: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    disabled: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    options: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    minutesTab: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.ViewChild,
      args: ['minutesTab']
    }],
    hourlyTab: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.ViewChild,
      args: ['hourlyTab']
    }],
    dailyTab: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.ViewChild,
      args: ['dailyTab']
    }],
    weeklyTab: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.ViewChild,
      args: ['weeklyTab']
    }],
    monthlyTab: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.ViewChild,
      args: ['monthlyTab']
    }],
    yearlyTab: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.ViewChild,
      args: ['yearlyTab']
    }],
    advancedTab: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.ViewChild,
      args: ['advancedTab']
    }]
  });
})();
class CronEditorModule {}
_class3 = CronEditorModule;
_class3.ɵfac = function _class3_Factory(t) {
  return new (t || _class3)();
};
_class3.ɵmod = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
  type: _class3
});
_class3.ɵinj = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.ReactiveFormsModule, _angular_material_tabs__WEBPACK_IMPORTED_MODULE_8__.MatTabsModule, _angular_material_list__WEBPACK_IMPORTED_MODULE_12__.MatListModule, _angular_material_select__WEBPACK_IMPORTED_MODULE_5__.MatSelectModule, _angular_material_input__WEBPACK_IMPORTED_MODULE_9__.MatInputModule, _angular_material_radio__WEBPACK_IMPORTED_MODULE_10__.MatRadioModule, _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_11__.MatCheckboxModule, _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_13__.MatGridListModule]
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](CronEditorModule, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.NgModule,
    args: [{
      imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.ReactiveFormsModule, _angular_material_tabs__WEBPACK_IMPORTED_MODULE_8__.MatTabsModule, _angular_material_list__WEBPACK_IMPORTED_MODULE_12__.MatListModule, _angular_material_select__WEBPACK_IMPORTED_MODULE_5__.MatSelectModule, _angular_material_input__WEBPACK_IMPORTED_MODULE_9__.MatInputModule, _angular_material_radio__WEBPACK_IMPORTED_MODULE_10__.MatRadioModule, _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_11__.MatCheckboxModule, _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_13__.MatGridListModule],
      exports: [TimePickerComponent, CronGenComponent],
      declarations: [TimePickerComponent, CronGenComponent]
    }]
  }], null, null);
})();

/*
 * Public API Surface of pmsys
 */

/**
 * Generated bundle index. Do not edit.
 */



/***/ })

}]);
//# sourceMappingURL=src_app_modules_cron-generator_cron-generator_module_ts.7051551810f15d2b.js.map