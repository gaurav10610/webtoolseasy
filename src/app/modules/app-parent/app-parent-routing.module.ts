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
        path: 'uuid',
        redirectTo: 'uuid-v4-generator',
      },
      {
        path: 'jwt',
        loadChildren: () => import('../jwt/jwt.module').then(m => m.JwtModule),
      },
      {
        path: 'json-formatter',
        loadChildren: () =>
          import('../json-formatter/json-formatter.module').then(
            m => m.JsonFormatterModule
          ),
      },
      {
        path: 'image-compress',
        loadChildren: () =>
          import('../image-compression/image-compression.module').then(
            m => m.ImageCompressionModule
          ),
      },
      {
        path: 'js-formatter',
        loadChildren: () =>
          import('../js-formatter/js-formatter.module').then(
            m => m.JsFormatterModule
          ),
      },
      {
        path: 'css-formatter',
        loadChildren: () =>
          import('../css-formatter/css-formatter.module').then(
            m => m.CssFormatterModule
          ),
      },
      {
        path: 'html-formatter',
        loadChildren: () =>
          import('../html-formatter/html-formatter.module').then(
            m => m.HtmlFormatterModule
          ),
      },
      {
        path: 'screen-recorder',
        loadChildren: () =>
          import('../screen-recorder/screen-recorder.module').then(
            m => m.ScreenRecorderModule
          ),
      },
      {
        path: 'text-compare',
        loadChildren: () =>
          import('../text-compare/text-compare.module').then(
            m => m.TextCompareModule
          ),
      },
      {
        path: 'video-converter',
        loadChildren: () =>
          import('../video-converter/video-converter.module').then(
            m => m.VideoConverterModule
          ),
      },
      {
        path: 'json-viewer',
        loadChildren: () =>
          import('../json-viewer/json-viewer.module').then(
            m => m.JsonViewerModule
          ),
      },
      {
        path: 'password-generator',
        loadChildren: () =>
          import('../password-generator/password-generator.module').then(
            m => m.PasswordGeneratorModule
          ),
      },
      {
        path: 'base64-encode',
        loadChildren: () =>
          import('../base64-encode/base64-encode.module').then(
            m => m.Base64EncodeModule
          ),
      },
      {
        path: 'base64-decode',
        loadChildren: () =>
          import('../base64-decode/base64-decode.module').then(
            m => m.Base64DecodeModule
          ),
      },
      {
        path: 'cron-expression',
        loadChildren: () =>
          import('../cron-generator/cron-generator.module').then(
            m => m.CronGeneratorModule
          ),
      },
      {
        path: 'crop-image',
        loadChildren: () =>
          import('../image-cropper/image-cropper.module').then(
            m => m.ImageCropperModule
          ),
      },
      {
        path: 'uuid-v1-generator',
        loadChildren: () =>
          import(
            '../uuid-version1-generator/uuid-version1-generator.module'
          ).then(m => m.UuidVersion1GeneratorModule),
      },
      {
        path: 'uuid-v4-generator',
        loadChildren: () =>
          import(
            '../uuid-version4-generator/uuid-version4-generator.module'
          ).then(m => m.UuidVersion4GeneratorModule),
      },
      {
        path: 'guid-generator',
        loadChildren: () =>
          import('../guid-generator/guid-generator.module').then(
            m => m.GuidGeneratorModule
          ),
      },
      {
        path: 'markdown-editor',
        loadChildren: () =>
          import('../markdown-editor/markdown-editor.module').then(
            m => m.MarkdownEditorModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppParentRoutingModule {}
