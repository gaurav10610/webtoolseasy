(self["webpackChunkwebtoolseasy"] = self["webpackChunkwebtoolseasy"] || []).push([["src_app_modules_screen-recorder_screen-recorder_module_ts"],{

/***/ 3229:
/*!***************************************************************************!*\
  !*** ./src/app/modules/screen-recorder/screen-recorder-routing.module.ts ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ScreenRecorderRoutingModule: () => (/* binding */ ScreenRecorderRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 7947);
/* harmony import */ var _screen_recorder_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./screen-recorder.component */ 1467);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 1699);
var _class;




const routes = [{
  path: '',
  component: _screen_recorder_component__WEBPACK_IMPORTED_MODULE_0__.ScreenRecorderComponent
}];
class ScreenRecorderRoutingModule {}
_class = ScreenRecorderRoutingModule;
_class.ɵfac = function ScreenRecorderRoutingModule_Factory(t) {
  return new (t || _class)();
};
_class.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
  type: _class
});
_class.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](ScreenRecorderRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
})();

/***/ }),

/***/ 1467:
/*!**********************************************************************!*\
  !*** ./src/app/modules/screen-recorder/screen-recorder.component.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ScreenRecorderComponent: () => (/* binding */ ScreenRecorderComponent)
/* harmony export */ });
/* harmony import */ var _Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 1670);
/* harmony import */ var src_app_service_util_logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/service/util/logger */ 4930);
/* harmony import */ var src_environments_component_config_screen_recorder_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/environments/component-config/screen-recorder/config */ 6785);
/* harmony import */ var idb_keyval__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! idb-keyval */ 1557);
/* harmony import */ var video_stream_merger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! video-stream-merger */ 7539);
/* harmony import */ var video_stream_merger__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(video_stream_merger__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _angular_cdk_layout__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/cdk/layout */ 9743);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs */ 2513);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs */ 274);
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/environments/environment */ 553);
/* harmony import */ var src_app_service_util_contants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/service/util/contants */ 6179);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var src_app_service_platform_metadata_platform_metadata_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/service/platform-metadata/platform-metadata.service */ 3242);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/icon */ 6515);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/button */ 895);
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/checkbox */ 6658);
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/progress-spinner */ 3910);

var _class;
















function ScreenRecorderComponent_mat_icon_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](0, "mat-icon", 11);
  }
}
function ScreenRecorderComponent_span_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "span", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1, "screen capturing is not supported by host browser");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
}
function ScreenRecorderComponent_section_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "section", 13)(1, "mat-checkbox", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("change", function ScreenRecorderComponent_section_4_Template_mat_checkbox_change_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r9);
      const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r8.recorderOptionChange($event, "mic-audio"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](2, "include mic audio");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](3, "mat-checkbox", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("change", function ScreenRecorderComponent_section_4_Template_mat_checkbox_change_3_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r9);
      const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r10.recorderOptionChange($event, "camera-video"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](4, "include camera video");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
  }
}
function ScreenRecorderComponent_button_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "button", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function ScreenRecorderComponent_button_6_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r12);
      const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r11.startRecording());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](1, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](2, "play_arrow");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](3, " Start Recording ");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
}
function ScreenRecorderComponent_button_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "button", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function ScreenRecorderComponent_button_7_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r14);
      const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r13.pauseRecording());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](1, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](2, "pause");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](3, " Pause Recording ");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
}
function ScreenRecorderComponent_button_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "button", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function ScreenRecorderComponent_button_8_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r16);
      const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r15.resumeRecording());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](1, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](2, "play_arrow");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](3, " Resume Recording ");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
}
function ScreenRecorderComponent_button_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "button", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function ScreenRecorderComponent_button_9_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r18);
      const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r17.stopRecording());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](1, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](2, "stop");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](3, " Stop Recording ");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
}
function ScreenRecorderComponent_div_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](1, "mat-spinner", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](2, "span", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](3, "preparing video file to download");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
  }
}
class ScreenRecorderComponent {
  constructor(renderer, zoneRef, breakpointObserver, platformMetaDataService) {
    this.renderer = renderer;
    this.zoneRef = zoneRef;
    this.breakpointObserver = breakpointObserver;
    this.platformMetaDataService = platformMetaDataService;
    this.isRecording = false;
    this.isProcessingStream = false;
    /**
     * recording paused flag
     */
    this.isRecPaused = false;
    this.timeCounter = 0;
    this.videoChunksIds = [];
    this.videoFileExtention = 'webm';
    this.recorderOptionConfig = {
      webm: {
        mimeType: 'video/webm; codecs=vp9'
      },
      mp4: {
        mimeType: 'video/mp4'
      }
    };
    this.cameraVideoOptions = {
      width: 150,
      height: 150
    };
    /**
     * recording options
     */
    this.includeScreenAudio = false;
    this.includeMicAudio = false;
    this.includeCameraVideo = false;
    this.videoChunksCounter = 0;
    this.isSupported = true;
    this.destroyed = new rxjs__WEBPACK_IMPORTED_MODULE_8__.Subject();
    this.applicationConfig = src_environments_component_config_screen_recorder_config__WEBPACK_IMPORTED_MODULE_2__.componentConfig;
    this.descriptionData = src_environments_component_config_screen_recorder_config__WEBPACK_IMPORTED_MODULE_2__.descriptionData;
    /**
     * screen resize handler
     */
    this.breakpointObserver.observe([_angular_cdk_layout__WEBPACK_IMPORTED_MODULE_9__.Breakpoints.Handset, _angular_cdk_layout__WEBPACK_IMPORTED_MODULE_9__.Breakpoints.Web]).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_10__.takeUntil)(this.destroyed)).subscribe(result => {
      this.isMobile = breakpointObserver.isMatched(`(max-width: ${src_app_service_util_contants__WEBPACK_IMPORTED_MODULE_5__.MOBILE_VIEW_WIDTH_THRESHOLD})`);
      this.checkCompatibility();
    });
    this.checkCompatibility();
  }
  checkCompatibility() {
    if (src_environments_environment__WEBPACK_IMPORTED_MODULE_4__.environment.production) {
      this.isSupported = !this.isMobile;
    }
  }
  ngOnDestroy() {
    if (this.platformMetaDataService.isPlatformBrowser) {
      (0,idb_keyval__WEBPACK_IMPORTED_MODULE_11__.clear)();
    }
    this.destroyed.next();
    this.destroyed.complete();
  }
  resetContextVariables() {
    this.screenStream = undefined;
    this.webcamStream = undefined;
    this.mergedMediaStream = undefined;
    this.mediaStreamRecorder = undefined;
    this.videoChunksCounter = 0;
    this.videoChunksIds = [];
  }
  /**
   * start screen recording
   */
  startRecording() {
    var _this = this;
    this.zoneRef.run( /*#__PURE__*/(0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this.isRecording = true;
      _this.resetContextVariables();
      // clear all buffer data from index db
      yield (0,idb_keyval__WEBPACK_IMPORTED_MODULE_11__.clear)();
      try {
        _this.screenStream = yield _this.getScreenStream();
        src_app_service_util_logger__WEBPACK_IMPORTED_MODULE_1__.LogUtils.info(`screen stream dimensions: ${_this.getVideoStreamHeightWidth(_this.screenStream)}`);
        /**
         * configure stream ended listener in case user manually stops media
         * stream using native stop sharing button
         */
        _this.configureStreamStopListener(_this.screenStream);
      } catch (error) {
        src_app_service_util_logger__WEBPACK_IMPORTED_MODULE_1__.LogUtils.error(`error occured while capturing screen stream`);
        src_app_service_util_logger__WEBPACK_IMPORTED_MODULE_1__.LogUtils.error(error);
        _this.stopRecording();
      }
      try {
        if (_this.includeMicAudio || _this.includeCameraVideo) {
          _this.webcamStream = yield _this.getCameraAndMicStream();
          _this.configureStreamStopListener(_this.webcamStream);
        }
      } catch (error) {
        src_app_service_util_logger__WEBPACK_IMPORTED_MODULE_1__.LogUtils.error(`error occured while capturing camera or mic media stream`);
        src_app_service_util_logger__WEBPACK_IMPORTED_MODULE_1__.LogUtils.error(error);
        _this.stopRecording();
      }
      if (_this.webcamStream) {
        _this.mergedMediaStream = _this.mergeMediaStreams(_this.screenStream, _this.webcamStream);
        if (!_this.mergedMediaStream) {
          src_app_service_util_logger__WEBPACK_IMPORTED_MODULE_1__.LogUtils.error(`error encountered while merging media streams`);
          _this.stopRecording();
        }
      } else {
        _this.mergedMediaStream = _this.screenStream;
      }
      if (_this.mergedMediaStream) {
        _this.configureStreamRecorder(_this.mergedMediaStream);
      }
    }));
  }
  /**
   * configure stream ended listener
   * @param mediaStream
   */
  configureStreamStopListener(mediaStream) {
    mediaStream.getTracks().forEach(track => {
      track.addEventListener('ended', event => {
        src_app_service_util_logger__WEBPACK_IMPORTED_MODULE_1__.LogUtils.info(`media stream track has ended`);
        if (this.isRecording) {
          this.stopRecording();
        }
      });
    });
  }
  /**
   * merge screen and web cam media streams
   * @param screenStream
   * @param webcamStream
   * @returns
   */
  mergeMediaStreams(screenStream, webcamStream) {
    const screenStreamSettings = this.screenStream?.getVideoTracks()[0].getSettings();
    const mergerOptions = {
      width: screenStreamSettings.width,
      height: screenStreamSettings.height
    };
    let streamMerger = new video_stream_merger__WEBPACK_IMPORTED_MODULE_3__.VideoStreamMerger(mergerOptions);
    const mergeScreenStreamOptions = {
      x: 0,
      y: 0,
      width: streamMerger.width,
      height: streamMerger.height,
      mute: true,
      index: 0
    };
    // Add the screen capture. Position it to fill the whole stream (the default)
    streamMerger.addStream(screenStream, mergeScreenStreamOptions);
    const mergeWebcamStreamOptions = {
      x: streamMerger.width - this.cameraVideoOptions.width,
      y: streamMerger.height - this.cameraVideoOptions.height,
      width: this.cameraVideoOptions.width,
      height: this.cameraVideoOptions.height,
      mute: false,
      index: 1
    };
    // Add the webcam stream. Position it on the bottom left and resize it to 100x100.
    streamMerger.addStream(webcamStream, mergeWebcamStreamOptions);
    // Start the merging. Calling this makes the result available to us
    streamMerger.start();
    // We now have a merged MediaStream!
    return streamMerger.result;
  }
  /**
   * configure media stream recorder
   * @param mediaStream
   */
  configureStreamRecorder(mediaStream) {
    src_app_service_util_logger__WEBPACK_IMPORTED_MODULE_1__.LogUtils.info(`configuring media stream recorder`);
    this.mediaStreamRecorder = new MediaRecorder(mediaStream, this.recorderOptionConfig[this.videoFileExtention]);
    this.mediaStreamRecorder.ondataavailable = event => {
      const id = Date.now();
      /**
       * write data in index db
       */
      (0,idb_keyval__WEBPACK_IMPORTED_MODULE_11__.set)(id, event.data);
      this.videoChunksIds.push(id);
    };
    /**
     * Need video stream slices of 1 second each
     */
    this.mediaStreamRecorder.start(ScreenRecorderComponent.RECORDER_TIME_SLICE_MS);
  }
  /**
   * get screen media stream
   * @returns
   */
  getScreenStream() {
    var _this2 = this;
    return (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const screenCaptureOptions = {
        video: true,
        audio: false
      };
      if (_this2.includeScreenAudio) {
        screenCaptureOptions.audio = true;
      }
      return navigator.mediaDevices.getDisplayMedia(screenCaptureOptions);
    })();
  }
  /**
   * get camera & mic video/audio stream
   * @returns
   */
  getCameraAndMicStream() {
    var _this3 = this;
    return (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const getUserMediaOptions = {
        video: _this3.includeCameraVideo,
        audio: _this3.includeMicAudio
      };
      return navigator.mediaDevices.getUserMedia(getUserMediaOptions);
    })();
  }
  /**
   * pause media stream recording
   */
  pauseRecording() {
    this.mediaStreamRecorder?.pause();
    this.isRecPaused = true;
  }
  /**
   * resume media stream recoring
   */
  resumeRecording() {
    this.mediaStreamRecorder?.resume();
    this.isRecPaused = false;
  }
  /**
   * stop media stream recording
   */
  stopRecording() {
    this.mediaStreamRecorder?.stop();
    this.screenStream?.getTracks().forEach(track => track.stop());
    this.webcamStream?.getTracks().forEach(track => track.stop());
    this.mergedMediaStream?.getTracks().forEach(track => track.stop());
    if (this.screenStream && this.mergedMediaStream) {
      this.processMediaStream();
    }
    this.isRecording = false;
  }
  processMediaStream() {
    var _this4 = this;
    this.isProcessingStream = true;
    setTimeout( /*#__PURE__*/(0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        const videoFileBuffer = [];
        _this4.videoChunksIds.sort(function (a, b) {
          return a - b;
        });
        const totalChunks = _this4.videoChunksIds.length;
        for (let index = 0; index < totalChunks; index++) {
          videoFileBuffer.push(yield (0,idb_keyval__WEBPACK_IMPORTED_MODULE_11__.get)(_this4.videoChunksIds[index]));
        }
        yield _this4.downloadVideoFile(`recorded-video-file.webm`, new Blob(videoFileBuffer, {
          type: `video/webm`
        }));
        _this4.zoneRef.run(() => _this4.isProcessingStream = false);
        (0,idb_keyval__WEBPACK_IMPORTED_MODULE_11__.clear)();
      } catch (error) {
        src_app_service_util_logger__WEBPACK_IMPORTED_MODULE_1__.LogUtils.info(`error occured while preparing video file for download`);
        src_app_service_util_logger__WEBPACK_IMPORTED_MODULE_1__.LogUtils.error(error);
        _this4.zoneRef.run(() => _this4.isProcessingStream = false);
      }
    }), ScreenRecorderComponent.RECORDING_START_DELAY_MS);
  }
  /**
   * checkbox change event
   * @param event object wrapping event data
   * @param optionId identifier of capture option
   */
  recorderOptionChange(event, optionId) {
    src_app_service_util_logger__WEBPACK_IMPORTED_MODULE_1__.LogUtils.info(`recorder option changed: ${optionId}`);
    switch (optionId) {
      case 'mic-audio':
        this.includeMicAudio = event.checked;
        break;
      case 'camera-video':
        this.includeCameraVideo = event.checked;
        break;
    }
  }
  downloadVideoFile(fileName, fileContent) {
    var _this5 = this;
    return (0,_Users_olx_git_personal_web_tools_easy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const downloadAnchor = _this5.renderer.createElement('a');
      _this5.renderer.setProperty(downloadAnchor, 'href', URL.createObjectURL(fileContent));
      _this5.renderer.setProperty(downloadAnchor, 'download', fileName);
      downloadAnchor.click();
    })();
  }
  getVideoStreamHeightWidth(mediaStream) {
    if (mediaStream.getVideoTracks().length > 0) {
      const settings = mediaStream.getVideoTracks()[0].getSettings();
      return `[ height: ${settings.height}, width: ${settings.width} ]`;
    }
    return '';
  }
}
_class = ScreenRecorderComponent;
_class.RECORDING_START_DELAY_MS = 5000;
// timeslice in ms
_class.RECORDER_TIME_SLICE_MS = 100;
_class.ɵfac = function ScreenRecorderComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_7__.Renderer2), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_7__.NgZone), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_angular_cdk_layout__WEBPACK_IMPORTED_MODULE_9__.BreakpointObserver), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](src_app_service_platform_metadata_platform_metadata_service__WEBPACK_IMPORTED_MODULE_6__.PlatformMetadataService));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["app-screen-recorder"]],
  decls: 11,
  vars: 8,
  consts: [[1, "flex-display", "flex-column-flow", "flex-align-center", "full-width", "flex-gap-large"], [1, "flex-display", "flex-column-flow", "flex-center", "flex-align-center", "full-width", "icon-div"], ["svgIcon", "screen-icon", 4, "ngIf"], ["class", "error", 4, "ngIf"], ["class", "flex-display recoder-options", 4, "ngIf"], [1, "flex-display", "flex-row-flow", "flex-gap-medium"], ["mat-stroked-button", "", "aria-label", "start recording button", "color", "primary", 3, "click", 4, "ngIf"], ["mat-stroked-button", "", "aria-label", "pause recording button", "color", "warn", 3, "click", 4, "ngIf"], ["mat-stroked-button", "", "aria-label", "resume recording button", "color", "accent", 3, "click", 4, "ngIf"], ["mat-raised-button", "", "aria-label", "stop recording button", "color", "warn", 3, "click", 4, "ngIf"], ["class", "flex-display flex-row-flow flex-align-center", 4, "ngIf"], ["svgIcon", "screen-icon"], [1, "error"], [1, "flex-display", "recoder-options"], [3, "change"], ["mat-stroked-button", "", "aria-label", "start recording button", "color", "primary", 3, "click"], ["mat-stroked-button", "", "aria-label", "pause recording button", "color", "warn", 3, "click"], ["mat-stroked-button", "", "aria-label", "resume recording button", "color", "accent", 3, "click"], ["mat-raised-button", "", "aria-label", "stop recording button", "color", "warn", 3, "click"], [1, "flex-display", "flex-row-flow", "flex-align-center"], ["color", "primary", "diameter", "30", 2, "margin-right", "10px"], [1, "bold-text"]],
  template: function ScreenRecorderComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div", 0)(1, "div", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](2, ScreenRecorderComponent_mat_icon_2_Template, 1, 0, "mat-icon", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](3, ScreenRecorderComponent_span_3_Template, 2, 0, "span", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](4, ScreenRecorderComponent_section_4_Template, 5, 0, "section", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](5, "div", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](6, ScreenRecorderComponent_button_6_Template, 4, 0, "button", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](7, ScreenRecorderComponent_button_7_Template, 4, 0, "button", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](8, ScreenRecorderComponent_button_8_Template, 4, 0, "button", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](9, ScreenRecorderComponent_button_9_Template, 4, 0, "button", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](10, ScreenRecorderComponent_div_10_Template, 4, 0, "div", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", ctx.platformMetaDataService.isPlatformBrowser);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", !ctx.isSupported);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", ctx.isSupported);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", !ctx.isRecording && !ctx.isProcessingStream && ctx.isSupported);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", ctx.isRecording && !ctx.isRecPaused);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", ctx.isRecording && ctx.isRecPaused);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", ctx.isRecording && !ctx.isProcessingStream && ctx.isSupported);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", ctx.isProcessingStream);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_12__.NgIf, _angular_material_icon__WEBPACK_IMPORTED_MODULE_13__.MatIcon, _angular_material_button__WEBPACK_IMPORTED_MODULE_14__.MatButton, _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_15__.MatCheckbox, _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_16__.MatProgressSpinner],
  styles: [".icon-div[_ngcontent-%COMP%] {\n  height: 300px;\n}\n\n.icon-div[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  transform: scale(10);\n}\n\n.error[_ngcontent-%COMP%] {\n  color: red;\n  font-size: large;\n  font-style: italic;\n  font-weight: bold;\n}\n\n@media screen and (max-width: 735px) {\n  .icon-div[_ngcontent-%COMP%] {\n    height: 150px;\n  }\n  .icon-div[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n    transform: scale(5);\n  }\n  .recoder-options[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .error[_ngcontent-%COMP%] {\n    font-size: small;\n  }\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvbW9kdWxlcy9zY3JlZW4tcmVjb3JkZXIvc2NyZWVuLXJlY29yZGVyLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsYUFBQTtBQUNGOztBQUVBO0VBQ0Usb0JBQUE7QUFDRjs7QUFFQTtFQUNFLFVBQUE7RUFDQSxnQkFBQTtFQUNBLGtCQUFBO0VBQ0EsaUJBQUE7QUFDRjs7QUFFQTtFQUNFO0lBQ0UsYUFBQTtFQUNGO0VBQ0E7SUFDRSxtQkFBQTtFQUNGO0VBQ0E7SUFDRSxzQkFBQTtFQUNGO0VBQ0E7SUFDRSxnQkFBQTtFQUNGO0FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIuaWNvbi1kaXYge1xuICBoZWlnaHQ6IDMwMHB4O1xufVxuXG4uaWNvbi1kaXYgbWF0LWljb24ge1xuICB0cmFuc2Zvcm06IHNjYWxlKDEwKTtcbn1cblxuLmVycm9yIHtcbiAgY29sb3I6IHJlZDtcbiAgZm9udC1zaXplOiBsYXJnZTtcbiAgZm9udC1zdHlsZTogaXRhbGljO1xuICBmb250LXdlaWdodDogYm9sZDtcbn1cblxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogNzM1cHgpIHtcbiAgLmljb24tZGl2IHtcbiAgICBoZWlnaHQ6IDE1MHB4O1xuICB9XG4gIC5pY29uLWRpdiBtYXQtaWNvbiB7XG4gICAgdHJhbnNmb3JtOiBzY2FsZSg1KTtcbiAgfVxuICAucmVjb2Rlci1vcHRpb25zIHtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICB9XG4gIC5lcnJvciB7XG4gICAgZm9udC1zaXplOiBzbWFsbDtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ }),

/***/ 1081:
/*!*******************************************************************!*\
  !*** ./src/app/modules/screen-recorder/screen-recorder.module.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ScreenRecorderModule: () => (/* binding */ ScreenRecorderModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _screen_recorder_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./screen-recorder-routing.module */ 3229);
/* harmony import */ var _screen_recorder_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./screen-recorder.component */ 1467);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/button */ 895);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/icon */ 6515);
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/checkbox */ 6658);
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/progress-spinner */ 3910);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 1699);
var _class;








class ScreenRecorderModule {}
_class = ScreenRecorderModule;
_class.ɵfac = function ScreenRecorderModule_Factory(t) {
  return new (t || _class)();
};
_class.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
  type: _class
});
_class.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _screen_recorder_routing_module__WEBPACK_IMPORTED_MODULE_0__.ScreenRecorderRoutingModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__.MatIconModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_5__.MatButtonModule, _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_6__.MatCheckboxModule, _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_7__.MatProgressSpinnerModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](ScreenRecorderModule, {
    declarations: [_screen_recorder_component__WEBPACK_IMPORTED_MODULE_1__.ScreenRecorderComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _screen_recorder_routing_module__WEBPACK_IMPORTED_MODULE_0__.ScreenRecorderRoutingModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__.MatIconModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_5__.MatButtonModule, _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_6__.MatCheckboxModule, _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_7__.MatProgressSpinnerModule]
  });
})();

/***/ }),

/***/ 4930:
/*!****************************************!*\
  !*** ./src/app/service/util/logger.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

/***/ 6785:
/*!*********************************************************************!*\
  !*** ./src/environments/component-config/screen-recorder/config.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   componentConfig: () => (/* binding */ componentConfig),
/* harmony export */   descriptionData: () => (/* binding */ descriptionData)
/* harmony export */ });
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/environments/environment */ 553);
/* harmony import */ var src_environments_tools_directory_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/environments/tools-directory-config */ 6636);


const navigationUrl = '/tools/screen-recorder';
const pageTitle = 'Free Screen Recorder - Record Screen with Audio and Webcam';
const pageDescription = 'Record your screen with audio and webcam for free with our online screen recorder. Record screen with no watermark and no time limit. No sign-up required.';
const imageUrl = `${src_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.screenshotsBaseUrl}/screen-recorder.png`;
const keywords = 'online screen recorder,free screen recorder,screen recorder with audio,screen recorder with webcam,screen recorder for tutorials,screen recorder for demos,screen recorder for video lectures,screen recorder for webinars,screen recorder for gameplay,screen recorder for Windows,screen recorder for Mac,screen recorder for Chromebook,screen recorder for Linux, no watermark, no time limit screen recording';
const relatedTools = [src_environments_tools_directory_config__WEBPACK_IMPORTED_MODULE_1__.ApplicationIds.VIDEO_CONVERTER];
const componentConfig = {
  mainHeading: 'Free Online Screen Recorder - Record Your Screen with Audio, Webcam and No Watermark',
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
  icons: [{
    iconName: 'screen-icon',
    iconRelativeUrl: 'screen.svg'
  }],
  relatedTools: relatedTools.map(tool => src_environments_tools_directory_config__WEBPACK_IMPORTED_MODULE_1__.applicationConfig.get(tool))
};
const descriptionData = [{
  heading: 'Why Use a Screen Recorder?',
  listData: ['To create tutorials and demos. Screen recorders are a great way to create tutorials and demos of how to use software or complete a task.', 'To record video lectures and webinars. Screen recorders can be used to record video lectures and webinars for students or clients to watch later.', 'To record gameplay. Screen recorders are also popular for recording gameplay footage to share with friends or online communities.']
}, {
  heading: 'Features of Our Online Screen Recorder',
  listData: ['Free to use. No need to pay or sign up for an account.', 'No download required. Record your screen directly from your web browser.', 'Record screen, audio, and webcam. Capture everything on your screen, as well as your audio and webcam.', 'Easy to use. Simply click the "Start Recording" button and start recording.', `Save your recordings to your computer. Once you're finished recording, you can save your recording to your computer.`]
}, {
  heading: 'How to Use Our Online Screen Recorder',
  listData: ['Go to our website and click the "Start Recording" button.', 'Select the area of the screen you want to record.', 'Choose whether you want to record audio and/or webcam.', 'Click the "Start Recording" button to begin recording.', `Click the "Stop Recording" button when you're finished recording.`, 'Save your recording to your computer.']
}, {
  heading: 'Tips for Using a Screen Recorder',
  listData: ['Choose the right recording mode. There are different recording modes available, such as full screen, custom region, and window. Choose the recording mode that best suits your needs.', `Use a high-quality microphone. If you're recording audio, make sure to use a high-quality microphone to ensure good sound quality.`, `Edit your recordings. Once you're finished recording, you can edit your recordings to remove any unwanted footage or add annotations.`, `Share your recordings online. Once you're happy with your recordings, you can share them online with others on social media or video sharing platforms.`]
}, {
  blockData: ['Our free online screen recorder is a great way to record your screen with audio and webcam. It is easy to use, no download required, and no sign-up required. With our screen recorder, you can create tutorials and demos, record video lectures and webinars, record gameplay, and more.']
}];

/***/ }),

/***/ 6636:
/*!****************************************************!*\
  !*** ./src/environments/tools-directory-config.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

/***/ 7539:
/*!**********************************************************************!*\
  !*** ./node_modules/video-stream-merger/dist/video-stream-merger.js ***!
  \**********************************************************************/
/***/ (function(module) {

!function (t, e) {
   true ? module.exports = e() : 0;
}(this, function () {
  return function () {
    "use strict";

    var t = {
        d: function (e, i) {
          for (var s in i) t.o(i, s) && !t.o(e, s) && Object.defineProperty(e, s, {
            enumerable: !0,
            get: i[s]
          });
        },
        o: function (t, e) {
          return Object.prototype.hasOwnProperty.call(t, e);
        },
        r: function (t) {
          "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
            value: "Module"
          }), Object.defineProperty(t, "__esModule", {
            value: !0
          });
        }
      },
      e = {};
    t.r(e), t.d(e, {
      VideoStreamMerger: function () {
        return i;
      }
    });
    class i {
      constructor(t) {
        this.width = 720, this.height = 405, this.fps = 25, this._streams = [], this._frameCount = 0, this.clearRect = !0, this.started = !1, this.result = null, this.supported = null, this._canvas = null, this._ctx = null, this._videoSyncDelayNode = null, this._audioDestination = null, this._audioCtx = null;
        const e = window.AudioContext || window.webkitAudioContext,
          i = !(!window.AudioContext || !new e().createMediaStreamDestination),
          s = !!document.createElement("canvas").captureStream;
        if (!(this.supported = i && s)) return;
        this.setOptions(t);
        const a = this._audioCtx = new e(),
          o = this._audioDestination = null == a ? void 0 : a.createMediaStreamDestination();
        this._videoSyncDelayNode = a.createDelay(5), this._videoSyncDelayNode.connect(o), this._setupConstantNode(), this.started = !1, this.result = null, this._backgroundAudioHack();
      }
      setOptions(t) {
        t = t || {}, this._audioCtx = t.audioContext || new AudioContext(), this.width = t.width || this.width, this.height = t.height || this.width, this.fps = t.fps || this.fps, this.clearRect = void 0 === t.clearRect || t.clearRect;
      }
      setOutputSize(t, e) {
        this.width = t, this.height = e, this._canvas && (this._canvas.setAttribute("width", this.width.toString()), this._canvas.setAttribute("height", this.height.toString()));
      }
      getAudioContext() {
        return this._audioCtx;
      }
      getAudioDestination() {
        return this._audioDestination;
      }
      getCanvasContext() {
        return this._ctx;
      }
      _backgroundAudioHack() {
        if (this._audioCtx) {
          const t = this._createConstantSource(),
            e = this._audioCtx.createGain();
          e && t && (e.gain.value = .001, t.connect(e), e.connect(this._audioCtx.destination), t.start());
        }
      }
      _setupConstantNode() {
        if (this._audioCtx && this._videoSyncDelayNode) {
          const t = this._createConstantSource();
          if (t) {
            t.start();
            const e = this._audioCtx.createGain();
            e.gain.value = 0, t.connect(e), e.connect(this._videoSyncDelayNode);
          }
        }
      }
      _createConstantSource() {
        if (this._audioCtx) {
          if (this._audioCtx.createConstantSource) return this._audioCtx.createConstantSource();
          const t = this._audioCtx.createBufferSource(),
            e = this._audioCtx.createBuffer(1, 1, this._audioCtx.sampleRate);
          return e.getChannelData(0)[0] = 10, t.buffer = e, t.loop = !0, t;
        }
      }
      updateIndex(t, e) {
        "string" == typeof t && (t = {
          id: t
        }), e = null == e ? 0 : e;
        for (let i = 0; i < this._streams.length; i++) t.id === this._streams[i].id && (this._streams[i].index = e);
        this._sortStreams();
      }
      _sortStreams() {
        this._streams = this._streams.sort((t, e) => t.index - e.index);
      }
      addMediaElement(t, e, i) {
        if ((i = i || {}).x = i.x || 0, i.y = i.y || 0, i.width = i.width || this.width, i.height = i.height || this.height, i.mute = i.mute || i.muted || !1, i.oldDraw = i.draw, i.oldAudioEffect = i.audioEffect, e instanceof HTMLVideoElement || e instanceof HTMLImageElement ? i.draw = (t, s, a) => {
          if (i.oldDraw) i.oldDraw(t, e, a);else {
            const s = null == i.width ? this.width : i.width,
              o = null == i.height ? this.height : i.height;
            t.drawImage(e, i.x, i.y, s, o), a();
          }
        } : i.draw = null, this._audioCtx && !i.mute) {
          const t = e._mediaElementSource || this._audioCtx.createMediaElementSource(e);
          e._mediaElementSource = t, t.connect(this._audioCtx.destination);
          const s = this._audioCtx.createGain();
          t.connect(s), (e instanceof HTMLVideoElement || e instanceof HTMLAudioElement) && e.muted ? (e.muted = !1, e.volume = .001, s.gain.value = 1e3) : s.gain.value = 1, i.audioEffect = (t, e) => {
            i.oldAudioEffect ? i.oldAudioEffect(s, e) : s.connect(e);
          }, i.oldAudioEffect = null;
        }
        this.addStream(t, i);
      }
      addStream(t, e) {
        if ("string" == typeof t) return this._addData(t, e);
        e = e || {};
        const i = {
          isData: !1
        };
        i.x = e.x || 0, i.y = e.y || 0, i.width = e.width, i.height = e.height, i.draw = e.draw || null, i.mute = e.mute || e.muted || !1, i.audioEffect = e.audioEffect || null, i.index = null == e.index ? 0 : e.index, i.hasVideo = t.getVideoTracks().length > 0, i.hasAudio = t.getAudioTracks().length > 0;
        let s = null;
        for (let e = 0; e < this._streams.length; e++) this._streams[e].id === t.id && (s = this._streams[e].element);
        s || (s = document.createElement("video"), s.autoplay = !0, s.muted = !0, s.playsInline = !0, s.srcObject = t, s.setAttribute("style", "position:fixed; left: 0px; top:0px; pointer-events: none; opacity:0;"), document.body.appendChild(s), s.play().catch(null), i.hasAudio && this._audioCtx && !i.mute && (i.audioSource = this._audioCtx.createMediaStreamSource(t), i.audioOutput = this._audioCtx.createGain(), i.audioOutput.gain.value = 1, i.audioEffect ? i.audioEffect(i.audioSource, i.audioOutput) : i.audioSource.connect(i.audioOutput), i.audioOutput.connect(this._videoSyncDelayNode))), i.element = s, i.id = t.id || null, this._streams.push(i), this._sortStreams();
      }
      removeStream(t) {
        "string" == typeof t && (t = {
          id: t
        });
        for (let e = 0; e < this._streams.length; e++) {
          const i = this._streams[e];
          t.id === i.id && (i.audioSource && (i.audioSource = null), i.audioOutput && (i.audioOutput.disconnect(this._videoSyncDelayNode), i.audioOutput = null), i.element && i.element.remove(), this._streams[e] = null, this._streams.splice(e, 1), e--);
        }
      }
      _addData(t, e) {
        e = e || {};
        const i = {
          isData: !0
        };
        i.draw = e.draw || null, i.audioEffect = e.audioEffect || null, i.id = t, i.element = null, i.index = null == e.index ? 0 : e.index, this._videoSyncDelayNode && this._audioCtx && i.audioEffect && (i.audioOutput = this._audioCtx.createGain(), i.audioOutput.gain.value = 1, i.audioEffect(null, i.audioOutput), i.audioOutput.connect(this._videoSyncDelayNode)), this._streams.push(i), this._sortStreams();
      }
      _requestAnimationFrame(t) {
        let e = !1;
        const i = setInterval(() => {
          !e && document.hidden && (e = !0, clearInterval(i), t());
        }, 1e3 / this.fps);
        requestAnimationFrame(() => {
          e || (e = !0, clearInterval(i), t());
        });
      }
      start() {
        var t, e, i, s, a;
        this._canvas = document.createElement("canvas"), this._canvas.setAttribute("width", this.width.toString()), this._canvas.setAttribute("height", this.height.toString()), this._canvas.setAttribute("style", "position:fixed; left: 110%; pointer-events: none"), this._ctx = this._canvas.getContext("2d"), this.started = !0, this._requestAnimationFrame(this._draw.bind(this)), this.result = (null === (t = this._canvas) || void 0 === t ? void 0 : t.captureStream(this.fps)) || null;
        const o = null === (e = this.result) || void 0 === e ? void 0 : e.getAudioTracks()[0];
        o && (null === (i = this.result) || void 0 === i || i.removeTrack(o));
        const n = null === (s = this._audioDestination) || void 0 === s ? void 0 : s.stream.getAudioTracks();
        n && n.length && (null === (a = this.result) || void 0 === a || a.addTrack(n[0]));
      }
      _updateAudioDelay(t) {
        this._videoSyncDelayNode && this._audioCtx && this._videoSyncDelayNode.delayTime.setValueAtTime(t / 1e3, this._audioCtx.currentTime);
      }
      _draw() {
        var t;
        if (!this.started) return;
        this._frameCount++;
        let e = 0;
        this._frameCount % 60 == 0 && (e = performance.now());
        let i = this._streams.length;
        const s = () => {
          if (i--, i <= 0) {
            if (this._frameCount % 60 == 0) {
              const t = performance.now();
              this._updateAudioDelay(t - e);
            }
            this._requestAnimationFrame(this._draw.bind(this));
          }
        };
        this.clearRect && (null === (t = this._ctx) || void 0 === t || t.clearRect(0, 0, this.width, this.height)), this._streams.forEach(t => {
          t.draw ? t.draw(this._ctx, t.element, s) : !t.isData && t.hasVideo ? (this._drawVideo(t.element, t), s()) : s();
        }), 0 === this._streams.length && s();
      }
      _drawVideo(t, e) {
        var i;
        const s = this.height,
          a = this.width,
          o = e.height || s,
          n = e.width || a;
        let d = e.x || 0,
          u = e.y || 0;
        try {
          null === (i = this._ctx) || void 0 === i || i.drawImage(t, d, u, n, o);
        } catch (t) {
          console.error(t);
        }
      }
      stop() {
        var t, e;
        this.started = !1, this._canvas = null, this._ctx = null, this._streams.forEach(t => {
          t.element && t.element.remove();
        }), this._streams = [], null === (t = this._audioCtx) || void 0 === t || t.close(), this._audioCtx = null, this._audioDestination = null, this._videoSyncDelayNode = null, null === (e = this.result) || void 0 === e || e.getTracks().forEach(t => {
          t.stop();
        }), this.result = null;
      }
      destroy() {
        this.stop();
      }
    }
    return "undefined" != typeof window && (window.VideoStreamMerger = i), e;
  }();
});

/***/ }),

/***/ 1557:
/*!***********************************************!*\
  !*** ./node_modules/idb-keyval/dist/index.js ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   clear: () => (/* binding */ clear),
/* harmony export */   createStore: () => (/* binding */ createStore),
/* harmony export */   del: () => (/* binding */ del),
/* harmony export */   delMany: () => (/* binding */ delMany),
/* harmony export */   entries: () => (/* binding */ entries),
/* harmony export */   get: () => (/* binding */ get),
/* harmony export */   getMany: () => (/* binding */ getMany),
/* harmony export */   keys: () => (/* binding */ keys),
/* harmony export */   promisifyRequest: () => (/* binding */ promisifyRequest),
/* harmony export */   set: () => (/* binding */ set),
/* harmony export */   setMany: () => (/* binding */ setMany),
/* harmony export */   update: () => (/* binding */ update),
/* harmony export */   values: () => (/* binding */ values)
/* harmony export */ });
function promisifyRequest(request) {
  return new Promise((resolve, reject) => {
    // @ts-ignore - file size hacks
    request.oncomplete = request.onsuccess = () => resolve(request.result);
    // @ts-ignore - file size hacks
    request.onabort = request.onerror = () => reject(request.error);
  });
}
function createStore(dbName, storeName) {
  const request = indexedDB.open(dbName);
  request.onupgradeneeded = () => request.result.createObjectStore(storeName);
  const dbp = promisifyRequest(request);
  return (txMode, callback) => dbp.then(db => callback(db.transaction(storeName, txMode).objectStore(storeName)));
}
let defaultGetStoreFunc;
function defaultGetStore() {
  if (!defaultGetStoreFunc) {
    defaultGetStoreFunc = createStore('keyval-store', 'keyval');
  }
  return defaultGetStoreFunc;
}
/**
 * Get a value by its key.
 *
 * @param key
 * @param customStore Method to get a custom store. Use with caution (see the docs).
 */
function get(key, customStore = defaultGetStore()) {
  return customStore('readonly', store => promisifyRequest(store.get(key)));
}
/**
 * Set a value with a key.
 *
 * @param key
 * @param value
 * @param customStore Method to get a custom store. Use with caution (see the docs).
 */
function set(key, value, customStore = defaultGetStore()) {
  return customStore('readwrite', store => {
    store.put(value, key);
    return promisifyRequest(store.transaction);
  });
}
/**
 * Set multiple values at once. This is faster than calling set() multiple times.
 * It's also atomic – if one of the pairs can't be added, none will be added.
 *
 * @param entries Array of entries, where each entry is an array of `[key, value]`.
 * @param customStore Method to get a custom store. Use with caution (see the docs).
 */
function setMany(entries, customStore = defaultGetStore()) {
  return customStore('readwrite', store => {
    entries.forEach(entry => store.put(entry[1], entry[0]));
    return promisifyRequest(store.transaction);
  });
}
/**
 * Get multiple values by their keys
 *
 * @param keys
 * @param customStore Method to get a custom store. Use with caution (see the docs).
 */
function getMany(keys, customStore = defaultGetStore()) {
  return customStore('readonly', store => Promise.all(keys.map(key => promisifyRequest(store.get(key)))));
}
/**
 * Update a value. This lets you see the old value and update it as an atomic operation.
 *
 * @param key
 * @param updater A callback that takes the old value and returns a new value.
 * @param customStore Method to get a custom store. Use with caution (see the docs).
 */
function update(key, updater, customStore = defaultGetStore()) {
  return customStore('readwrite', store =>
  // Need to create the promise manually.
  // If I try to chain promises, the transaction closes in browsers
  // that use a promise polyfill (IE10/11).
  new Promise((resolve, reject) => {
    store.get(key).onsuccess = function () {
      try {
        store.put(updater(this.result), key);
        resolve(promisifyRequest(store.transaction));
      } catch (err) {
        reject(err);
      }
    };
  }));
}
/**
 * Delete a particular key from the store.
 *
 * @param key
 * @param customStore Method to get a custom store. Use with caution (see the docs).
 */
function del(key, customStore = defaultGetStore()) {
  return customStore('readwrite', store => {
    store.delete(key);
    return promisifyRequest(store.transaction);
  });
}
/**
 * Delete multiple keys at once.
 *
 * @param keys List of keys to delete.
 * @param customStore Method to get a custom store. Use with caution (see the docs).
 */
function delMany(keys, customStore = defaultGetStore()) {
  return customStore('readwrite', store => {
    keys.forEach(key => store.delete(key));
    return promisifyRequest(store.transaction);
  });
}
/**
 * Clear all values in the store.
 *
 * @param customStore Method to get a custom store. Use with caution (see the docs).
 */
function clear(customStore = defaultGetStore()) {
  return customStore('readwrite', store => {
    store.clear();
    return promisifyRequest(store.transaction);
  });
}
function eachCursor(store, callback) {
  store.openCursor().onsuccess = function () {
    if (!this.result) return;
    callback(this.result);
    this.result.continue();
  };
  return promisifyRequest(store.transaction);
}
/**
 * Get all keys in the store.
 *
 * @param customStore Method to get a custom store. Use with caution (see the docs).
 */
function keys(customStore = defaultGetStore()) {
  return customStore('readonly', store => {
    // Fast path for modern browsers
    if (store.getAllKeys) {
      return promisifyRequest(store.getAllKeys());
    }
    const items = [];
    return eachCursor(store, cursor => items.push(cursor.key)).then(() => items);
  });
}
/**
 * Get all values in the store.
 *
 * @param customStore Method to get a custom store. Use with caution (see the docs).
 */
function values(customStore = defaultGetStore()) {
  return customStore('readonly', store => {
    // Fast path for modern browsers
    if (store.getAll) {
      return promisifyRequest(store.getAll());
    }
    const items = [];
    return eachCursor(store, cursor => items.push(cursor.value)).then(() => items);
  });
}
/**
 * Get all entries in the store. Each entry is an array of `[key, value]`.
 *
 * @param customStore Method to get a custom store. Use with caution (see the docs).
 */
function entries(customStore = defaultGetStore()) {
  return customStore('readonly', store => {
    // Fast path for modern browsers
    // (although, hopefully we'll get a simpler path some day)
    if (store.getAll && store.getAllKeys) {
      return Promise.all([promisifyRequest(store.getAllKeys()), promisifyRequest(store.getAll())]).then(([keys, values]) => keys.map((key, i) => [key, values[i]]));
    }
    const items = [];
    return customStore('readonly', store => eachCursor(store, cursor => items.push([cursor.key, cursor.value])).then(() => items));
  });
}


/***/ }),

/***/ 7971:
/*!************************************!*\
  !*** ./src/environments/apps.json ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"xmltojson":{"applicationId":"xmltojson","displayText":"XML to JSON Converter","iconName":"xml-icon","navigateUrl":"/tools/xml-to-json","iconRelativeUrl":"xml.svg"},"qrcodegenerator":{"applicationId":"qrcodegenerator","displayText":"QR Code Generator","iconName":"qr-code","navigateUrl":"/tools/qr-code-generator","iconRelativeUrl":"qr-code.svg"},"wordcounter":{"applicationId":"wordcounter","displayText":"Word Counter","iconName":"word-icon","navigateUrl":"/tools/word-counter","iconRelativeUrl":"word.svg"},"textcompare":{"applicationId":"textcompare","displayText":"Online Text Compare","iconName":"comparison-icon","navigateUrl":"/tools/text-compare","iconRelativeUrl":"comparison.svg"},"markdowneditor":{"applicationId":"markdowneditor","displayText":"Markdown Editor","iconName":"markdown-icon","navigateUrl":"/tools/markdown-editor","iconRelativeUrl":"markdown.svg"},"passwordgenerator":{"applicationId":"passwordgenerator","displayText":"Random Password Generator","iconName":"password-icon","navigateUrl":"/tools/password-generator","iconRelativeUrl":"password.svg"},"videoconverter":{"applicationId":"videoconverter","displayText":"Video to Audio Converter","iconName":"video-convert-icon","navigateUrl":"/tools/video-converter","iconRelativeUrl":"video-convert.svg"},"screenrecorder":{"applicationId":"screenrecorder","displayText":"Free Screen Recorder","iconName":"screen-icon","navigateUrl":"/tools/screen-recorder","iconRelativeUrl":"screen.svg"},"imagecompressor":{"applicationId":"imagecompressor","displayText":"Free Image Compressor","iconName":"image-icon","navigateUrl":"/tools/image-compress","iconRelativeUrl":"image-icon.svg"},"imagecropper":{"applicationId":"imagecropper","displayText":"Free Image Cropper","iconName":"image-icon","navigateUrl":"/tools/crop-image","iconRelativeUrl":"image-icon.svg"},"jwtdecoder":{"applicationId":"jwtdecoder","displayText":"JWT Decoder","iconName":"jwt-icon","navigateUrl":"/tools/jwt","iconRelativeUrl":"jwt-icon.svg"},"jsformatter":{"applicationId":"jsformatter","displayText":"Online Javascript Formatter","iconName":"js-icon","navigateUrl":"/tools/js-formatter","iconRelativeUrl":"js-icon.svg"},"jsonformatter":{"applicationId":"jsonformatter","displayText":"Online JSON Formatter","iconName":"json-icon","navigateUrl":"/tools/json-formatter","iconRelativeUrl":"json-icon.svg"},"jsonviewer":{"applicationId":"jsonviewer","displayText":"Online JSON Viewer","iconName":"json-icon","navigateUrl":"/tools/json-viewer","iconRelativeUrl":"json-icon.svg"},"htmlformatter":{"applicationId":"htmlformatter","displayText":"Online HTML Formatter","iconName":"html-icon","navigateUrl":"/tools/html-formatter","iconRelativeUrl":"html.svg"},"cssformatter":{"applicationId":"cssformatter","displayText":"Online CSS Formatter","iconName":"css-icon","navigateUrl":"/tools/css-formatter","iconRelativeUrl":"css.svg"},"base64encoder":{"applicationId":"base64encoder","displayText":"Base64 Encoder","iconName":"file-encode-icon","navigateUrl":"/tools/base64-encode","iconRelativeUrl":"file-encode.svg"},"base64decoder":{"applicationId":"base64decoder","displayText":"Base64 Decoder","iconName":"file-decode-icon","navigateUrl":"/tools/base64-decode","iconRelativeUrl":"file-decode.svg"},"crongenerator":{"applicationId":"crongenerator","displayText":"Cron Expression Generator","iconName":"cron-icon","navigateUrl":"/tools/cron-expression","iconRelativeUrl":"cron.svg"},"uuidv4generator":{"applicationId":"uuidv4generator","displayText":"UUID V4 Generator","iconName":"uuid-icon","navigateUrl":"/tools/uuid-v4-generator","iconRelativeUrl":"uuid-icon.svg"},"uuidv1generator":{"applicationId":"uuidv1generator","displayText":"UUID V1 Generator","iconName":"uuid-icon","navigateUrl":"/tools/uuid-v1-generator","iconRelativeUrl":"uuid-icon.svg"},"guidgenerator":{"applicationId":"guidgenerator","displayText":"GUID Generator","iconName":"uuid-icon","navigateUrl":"/tools/guid-generator","iconRelativeUrl":"uuid-icon.svg"}}');

/***/ })

}]);
//# sourceMappingURL=src_app_modules_screen-recorder_screen-recorder_module_ts.ecf0d3e39005b5de.js.map