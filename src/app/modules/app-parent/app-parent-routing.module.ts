import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppParentComponent } from './app-parent.component';

const routes: Routes = [
  {
    path: '',
    component: AppParentComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../app-directory/app-directory.module').then(
            m => m.AppDirectoryModule
          ),
        pathMatch: 'full',
      },
      {
        path: 'tools/uuid',
        redirectTo: 'uuid-v4-generator',
      },
      {
        path: 'tools/jwt-decoder',
        loadChildren: () =>
          import('../jwt-decoder/jwt-decoder.module').then(m => m.JwtDecoderModule),
      },
      {
        path: 'tools/json-formatter',
        loadChildren: () =>
          import('../json-formatter/json-formatter.module').then(
            m => m.JsonFormatterModule
          ),
      },
      {
        path: 'tools/image-compress',
        loadChildren: () =>
          import('../image-compression/image-compression.module').then(
            m => m.ImageCompressionModule
          ),
      },
      {
        path: 'tools/js-formatter',
        loadChildren: () =>
          import('../js-formatter/js-formatter.module').then(
            m => m.JsFormatterModule
          ),
      },
      {
        path: 'tools/css-formatter',
        loadChildren: () =>
          import('../css-formatter/css-formatter.module').then(
            m => m.CssFormatterModule
          ),
      },
      {
        path: 'tools/html-formatter',
        loadChildren: () =>
          import('../html-formatter/html-formatter.module').then(
            m => m.HtmlFormatterModule
          ),
      },
      {
        path: 'tools/screen-recorder',
        loadChildren: () =>
          import('../screen-recorder/screen-recorder.module').then(
            m => m.ScreenRecorderModule
          ),
      },
      {
        path: 'tools/text-compare',
        loadChildren: () =>
          import('../text-compare/text-compare.module').then(
            m => m.TextCompareModule
          ),
      },
      {
        path: 'tools/video-converter',
        loadChildren: () =>
          import('../video-converter/video-converter.module').then(
            m => m.VideoConverterModule
          ),
      },
      {
        path: 'tools/json-viewer',
        loadChildren: () =>
          import('../json-viewer/json-viewer.module').then(
            m => m.JsonViewerModule
          ),
      },
      {
        path: 'tools/password-generator',
        loadChildren: () =>
          import('../password-generator/password-generator.module').then(
            m => m.PasswordGeneratorModule
          ),
      },
      {
        path: 'tools/base64-encode',
        loadChildren: () =>
          import('../base64-encode/base64-encode.module').then(
            m => m.Base64EncodeModule
          ),
      },
      {
        path: 'tools/base64-decode',
        loadChildren: () =>
          import('../base64-decode/base64-decode.module').then(
            m => m.Base64DecodeModule
          ),
      },
      {
        path: 'tools/cron-expression',
        loadChildren: () =>
          import('../cron-generator/cron-generator.module').then(
            m => m.CronGeneratorModule
          ),
      },
      {
        path: 'tools/crop-image',
        loadChildren: () =>
          import('../image-cropper/image-cropper.module').then(
            m => m.ImageCropperModule
          ),
      },
      {
        path: 'tools/uuid-v1-generator',
        loadChildren: () =>
          import(
            '../uuid-version1-generator/uuid-version1-generator.module'
          ).then(m => m.UuidVersion1GeneratorModule),
      },
      {
        path: 'tools/uuid-v4-generator',
        loadChildren: () =>
          import(
            '../uuid-version4-generator/uuid-version4-generator.module'
          ).then(m => m.UuidVersion4GeneratorModule),
      },
      {
        path: 'tools/guid-generator',
        loadChildren: () =>
          import('../guid-generator/guid-generator.module').then(
            m => m.GuidGeneratorModule
          ),
      },
      {
        path: 'tools/markdown-editor',
        loadChildren: () =>
          import('../markdown-editor/markdown-editor.module').then(
            m => m.MarkdownEditorModule
          ),
      },
      {
        path: 'tools/word-counter',
        loadChildren: () =>
          import('../word-count/word-count.module').then(
            m => m.WordCountModule
          ),
      },
      {
        path: 'tools/qr-code-generator',
        loadChildren: () =>
          import('../qr-code-generator/qr-code-generator.module').then(
            m => m.QrCodeGeneratorModule
          ),
      },
      {
        path: 'tools/xml-to-json',
        loadChildren: () =>
          import('../xml-to-json/xml-to-json.module').then(
            m => m.XmlToJsonModule
          ),
      },
      {
        path: 'tools/compound-interest-calculator',
        loadChildren: () =>
          import(
            '../compound-interest-calculator/compound-interest-calculator.module'
          ).then(m => m.CompoundInterestCalculatorModule),
      },
      {
        path: 'tools/case-converter',
        loadChildren: () =>
          import('../case-converter/case-converter.module').then(
            m => m.CaseConverterModule
          ),
      },
      {
        path: 'tools/html-editor',
        loadChildren: () =>
          import('../html-editor/html-editor.module').then(
            m => m.HtmlEditorModule
          ),
      },
      {
        path: 'tools/javascript-editor',
        loadChildren: () =>
          import('../js-editor/js-editor.module').then(m => m.JsEditorModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppParentRoutingModule {}
