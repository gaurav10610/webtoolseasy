"use strict";
(self["webpackChunkwebtoolseasy"] = self["webpackChunkwebtoolseasy"] || []).push([["src_app_modules_word-count_word-count_module_ts"],{

/***/ 281:
/*!*****************************************************************!*\
  !*** ./src/app/modules/word-count/word-count-routing.module.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WordCountRoutingModule: () => (/* binding */ WordCountRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 7947);
/* harmony import */ var _word_count_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./word-count.component */ 5570);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 1699);
var _class;




const routes = [{
  path: '',
  component: _word_count_component__WEBPACK_IMPORTED_MODULE_0__.WordCountComponent
}];
class WordCountRoutingModule {}
_class = WordCountRoutingModule;
_class.ɵfac = function WordCountRoutingModule_Factory(t) {
  return new (t || _class)();
};
_class.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
  type: _class
});
_class.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](WordCountRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
})();

/***/ }),

/***/ 5570:
/*!************************************************************!*\
  !*** ./src/app/modules/word-count/word-count.component.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WordCountComponent: () => (/* binding */ WordCountComponent)
/* harmony export */ });
/* harmony import */ var src_environments_component_config_word_count_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/environments/component-config/word-count/config */ 8263);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/input */ 26);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/form-field */ 1333);
var _class;




class WordCountComponent {
  constructor() {
    this.wordCount = 0;
    this.characterCount = 0;
    this.sentenceCount = 0;
    this.applicationConfig = src_environments_component_config_word_count_config__WEBPACK_IMPORTED_MODULE_0__.componentConfig;
    this.descriptionData = src_environments_component_config_word_count_config__WEBPACK_IMPORTED_MODULE_0__.descriptionData;
  }
  onTextChange(event) {
    const textValue = event.target.value;
    if (textValue.trim() !== '') {
      this.characterCount = textValue.length;
      this.wordCount = textValue.trim().split(/\s+/).length;
      try {
        this.sentenceCount = textValue.match(/[\w|\)][.?!](\s|$)/g).length;
      } catch (err) {
        this.sentenceCount = 1;
      }
    } else {
      this.characterCount = 0;
      this.wordCount = 0;
      this.sentenceCount = 0;
    }
  }
}
_class = WordCountComponent;
_class.ɵfac = function WordCountComponent_Factory(t) {
  return new (t || _class)();
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["app-word-count"]],
  decls: 22,
  vars: 3,
  consts: [[1, "flex-display", "flex-column-flow", "flex-align-center", "full-width", "flex-gap-large"], [2, "align-self", "flex-start", "font-size", "large"], [1, "full-width", "full-height"], ["appearance", "outline", 1, "full-width", "full-height"], ["matInput", "", "placeholder", "Enter text here to count...", 2, "height", "200px", 3, "input"], [1, "flex-display", "flex-center", "flex-gap-large", 2, "flex-wrap", "wrap"], [1, "flex-display", "flex-gap-medium"], [2, "font-size", "large", "font-weight", "700"], [2, "font-size", "large"]],
  template: function WordCountComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0)(1, "span", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "Text (Paste Text Here)");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "form", 2)(4, "mat-form-field", 3)(5, "textarea", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("input", function WordCountComponent_Template_textarea_input_5_listener($event) {
        return ctx.onTextChange($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "div", 5)(7, "div", 6)(8, "span", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9, "WORDS:");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "span", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](11);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "div", 6)(13, "span", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](14, "CHARACTERS:");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](15, "span", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](16);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](17, "div", 6)(18, "span", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](19, "SENTENCES:");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](20, "span", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](21);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](11);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx.wordCount);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx.characterCount);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx.sentenceCount);
    }
  },
  dependencies: [_angular_material_input__WEBPACK_IMPORTED_MODULE_2__.MatInput, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_3__.MatFormField],
  styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ }),

/***/ 3879:
/*!*********************************************************!*\
  !*** ./src/app/modules/word-count/word-count.module.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WordCountModule: () => (/* binding */ WordCountModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _word_count_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./word-count-routing.module */ 281);
/* harmony import */ var _word_count_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./word-count.component */ 5570);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/input */ 26);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 1699);
var _class;





class WordCountModule {}
_class = WordCountModule;
_class.ɵfac = function WordCountModule_Factory(t) {
  return new (t || _class)();
};
_class.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
  type: _class
});
_class.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _word_count_routing_module__WEBPACK_IMPORTED_MODULE_0__.WordCountRoutingModule, _angular_material_input__WEBPACK_IMPORTED_MODULE_4__.MatInputModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](WordCountModule, {
    declarations: [_word_count_component__WEBPACK_IMPORTED_MODULE_1__.WordCountComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _word_count_routing_module__WEBPACK_IMPORTED_MODULE_0__.WordCountRoutingModule, _angular_material_input__WEBPACK_IMPORTED_MODULE_4__.MatInputModule]
  });
})();

/***/ }),

/***/ 8263:
/*!****************************************************************!*\
  !*** ./src/environments/component-config/word-count/config.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   componentConfig: () => (/* binding */ componentConfig),
/* harmony export */   descriptionData: () => (/* binding */ descriptionData)
/* harmony export */ });
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/environments/environment */ 553);
/* harmony import */ var src_environments_tools_directory_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/environments/tools-directory-config */ 6636);


const navigationUrl = '/tools/word-counter';
const pageTitle = 'Free Online Word, Character, and Sentence Count Tool';
const pageDescription = 'Our free online word, character, and sentence count tool is quick, and easy, and lets you count the number of words, characters, and sentences in your text.';
const imageUrl = `${src_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.screenshotsBaseUrl}/word-counter.png`;
const keywords = 'word count tool, character count tool, sentence count tool, free word count tool, free character count tool, free sentence count tool, online word count tool, online character count tool, online sentence count tool, word counter, character counter, sentence counter, word count, character count, sentence count';
const relatedTools = [src_environments_tools_directory_config__WEBPACK_IMPORTED_MODULE_1__.ApplicationIds.TEXT_COMPARE];
const componentConfig = {
  mainHeading: 'Free Online Word, Character, and Sentence Count Tool',
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
  blockData: [`Looking for a quick and easy way to count the words, characters, and sentences in your writing? Try our free online word, character, and sentence count tool! It's simple to use and completely free.`, `To use the tool, simply copy and paste your text into the text box and click the "Count" button. The tool will instantly calculate the number of words, characters, and sentences in your text. It will also show you the character count with and without spaces, so you can choose the count that's right for you.`, `Our word, character, and sentence count tool is perfect for students, writers, bloggers, social media marketers, and anyone else who needs to keep track of the length of their writing. It's also great for checking word and character limits for specific platforms, such as Twitter, Facebook, and LinkedIn.`]
}, {
  heading: 'Here are some of the benefits of using our free online word, character, and sentence count tool:',
  listData: [`It's quick and easy to use.`, `It's completely free.`, `It's accurate and reliable.`, `It counts words, characters, and sentences.`, `It shows you the character count with and without spaces.`, `It's perfect for students, writers, bloggers, social media marketers, and anyone else who needs to keep track of the length of their writing.`, `It's great for checking word and character limits for specific platforms.`]
}, {
  heading: 'Here are some examples of how you can use our free online word, character, and sentence count tool:',
  listData: ['Students can use the tool to check the word count of their essays and assignments to make sure they meet the length requirements.', `Writers can use the tool to track the length of their articles and blog posts to make sure they're not too long or too short.`, `Bloggers can use the tool to check the word count of their blog posts to make sure they're optimized for search engines.`, `Social media marketers can use the tool to check the character count of their tweets, Facebook posts, and other social media posts to make sure they stay within the character limits.`]
}, {
  heading: 'How to use our free online word, character, and sentence count tool:',
  listData: [`Copy and paste your text into the text box.`, `The tool will instantly calculate the number of words, characters, and sentences in your text.`, `The tool will also show you the character count with and without spaces.`]
}, {
  heading: 'Tips for using our free online word, character, and sentence count tool:',
  listData: ['Make sure to copy and paste all of your text into the text box, including any spaces, line breaks, and punctuation.', 'If you need to check the word count of a specific section of text, simply select that section of text and copy and paste it into the text box.', 'You can also use the tool to check the word count of multiple documents. Simply separate each document with a line break.']
}, {
  heading: 'Benefits of using our free online word, character, and sentence count tool:',
  listData: ['Our tool is quick and easy to use.', 'Our tool is completely free.', 'Our tool is accurate and reliable.', 'Our tool is versatile and can be used for a variety of tasks, such as checking the word count of essays, articles, blog posts, social media posts, and more.']
}, {
  blockData: [`No matter what your needs are, our free online word, character, and sentence count tool is a valuable resource. Try it today and see how easy it is to use!`]
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

/***/ 7971:
/*!************************************!*\
  !*** ./src/environments/apps.json ***!
  \************************************/
/***/ ((module) => {

module.exports = JSON.parse('{"xmltojson":{"applicationId":"xmltojson","displayText":"XML to JSON Converter","iconName":"xml-icon","navigateUrl":"/tools/xml-to-json","iconRelativeUrl":"xml.svg"},"qrcodegenerator":{"applicationId":"qrcodegenerator","displayText":"QR Code Generator","iconName":"qr-code","navigateUrl":"/tools/qr-code-generator","iconRelativeUrl":"qr-code.svg"},"wordcounter":{"applicationId":"wordcounter","displayText":"Word Counter","iconName":"word-icon","navigateUrl":"/tools/word-counter","iconRelativeUrl":"word.svg"},"textcompare":{"applicationId":"textcompare","displayText":"Online Text Compare","iconName":"comparison-icon","navigateUrl":"/tools/text-compare","iconRelativeUrl":"comparison.svg"},"markdowneditor":{"applicationId":"markdowneditor","displayText":"Markdown Editor","iconName":"markdown-icon","navigateUrl":"/tools/markdown-editor","iconRelativeUrl":"markdown.svg"},"passwordgenerator":{"applicationId":"passwordgenerator","displayText":"Random Password Generator","iconName":"password-icon","navigateUrl":"/tools/password-generator","iconRelativeUrl":"password.svg"},"videoconverter":{"applicationId":"videoconverter","displayText":"Video to Audio Converter","iconName":"video-convert-icon","navigateUrl":"/tools/video-converter","iconRelativeUrl":"video-convert.svg"},"screenrecorder":{"applicationId":"screenrecorder","displayText":"Free Screen Recorder","iconName":"screen-icon","navigateUrl":"/tools/screen-recorder","iconRelativeUrl":"screen.svg"},"imagecompressor":{"applicationId":"imagecompressor","displayText":"Free Image Compressor","iconName":"image-icon","navigateUrl":"/tools/image-compress","iconRelativeUrl":"image-icon.svg"},"imagecropper":{"applicationId":"imagecropper","displayText":"Free Image Cropper","iconName":"image-icon","navigateUrl":"/tools/crop-image","iconRelativeUrl":"image-icon.svg"},"jwtdecoder":{"applicationId":"jwtdecoder","displayText":"JWT Decoder","iconName":"jwt-icon","navigateUrl":"/tools/jwt","iconRelativeUrl":"jwt-icon.svg"},"jsformatter":{"applicationId":"jsformatter","displayText":"Online Javascript Formatter","iconName":"js-icon","navigateUrl":"/tools/js-formatter","iconRelativeUrl":"js-icon.svg"},"jsonformatter":{"applicationId":"jsonformatter","displayText":"Online JSON Formatter","iconName":"json-icon","navigateUrl":"/tools/json-formatter","iconRelativeUrl":"json-icon.svg"},"jsonviewer":{"applicationId":"jsonviewer","displayText":"Online JSON Viewer","iconName":"json-icon","navigateUrl":"/tools/json-viewer","iconRelativeUrl":"json-icon.svg"},"htmlformatter":{"applicationId":"htmlformatter","displayText":"Online HTML Formatter","iconName":"html-icon","navigateUrl":"/tools/html-formatter","iconRelativeUrl":"html.svg"},"cssformatter":{"applicationId":"cssformatter","displayText":"Online CSS Formatter","iconName":"css-icon","navigateUrl":"/tools/css-formatter","iconRelativeUrl":"css.svg"},"base64encoder":{"applicationId":"base64encoder","displayText":"Base64 Encoder","iconName":"file-encode-icon","navigateUrl":"/tools/base64-encode","iconRelativeUrl":"file-encode.svg"},"base64decoder":{"applicationId":"base64decoder","displayText":"Base64 Decoder","iconName":"file-decode-icon","navigateUrl":"/tools/base64-decode","iconRelativeUrl":"file-decode.svg"},"crongenerator":{"applicationId":"crongenerator","displayText":"Cron Expression Generator","iconName":"cron-icon","navigateUrl":"/tools/cron-expression","iconRelativeUrl":"cron.svg"},"uuidv4generator":{"applicationId":"uuidv4generator","displayText":"UUID V4 Generator","iconName":"uuid-icon","navigateUrl":"/tools/uuid-v4-generator","iconRelativeUrl":"uuid-icon.svg"},"uuidv1generator":{"applicationId":"uuidv1generator","displayText":"UUID V1 Generator","iconName":"uuid-icon","navigateUrl":"/tools/uuid-v1-generator","iconRelativeUrl":"uuid-icon.svg"},"guidgenerator":{"applicationId":"guidgenerator","displayText":"GUID Generator","iconName":"uuid-icon","navigateUrl":"/tools/guid-generator","iconRelativeUrl":"uuid-icon.svg"}}');

/***/ })

}]);
//# sourceMappingURL=src_app_modules_word-count_word-count_module_ts.5548b56a8c646536.js.map