import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'tools',
    loadChildren: () =>
      import('./modules/app-directory/app-directory.module').then(
        m => m.AppDirectoryModule
      ),
  },
  {
    path: 'tools/uuid',
    loadChildren: () =>
      import('./modules/uuid/uuid.module').then(m => m.UuidModule),
  },
  {
    path: 'tools/jwt',
    loadChildren: () =>
      import('./modules/jwt/jwt.module').then(m => m.JwtModule),
  },
  {
    path: 'tools/json-formatter',
    loadChildren: () =>
      import('./modules/json-formatter/json-formatter.module').then(
        m => m.JsonFormatterModule
      ),
  },
  {
    path: 'tools/image-compress',
    loadChildren: () =>
      import('./modules/image-compression/image-compression.module').then(
        m => m.ImageCompressionModule
      ),
  },
  {
    path: 'tools/js-formatter',
    loadChildren: () =>
      import('./modules/js-formatter/js-formatter.module').then(
        m => m.JsFormatterModule
      ),
  },
  {
    path: 'tools/css-formatter',
    loadChildren: () =>
      import('./modules/css-formatter/css-formatter.module').then(
        m => m.CssFormatterModule
      ),
  },
  {
    path: 'tools/html-formatter',
    loadChildren: () =>
      import('./modules/html-formatter/html-formatter.module').then(
        m => m.HtmlFormatterModule
      ),
  },
  {
    path: 'tools/screen-recorder',
    loadChildren: () =>
      import('./modules/screen-recorder/screen-recorder.module').then(
        m => m.ScreenRecorderModule
      ),
  },
  {
    path: 'tools/text-compare',
    loadChildren: () =>
      import('./modules/text-compare/text-compare.module').then(
        m => m.TextCompareModule
      ),
  },
  {
    path: 'tools/video-converter',
    loadChildren: () =>
      import('./modules/video-converter/video-converter.module').then(
        m => m.VideoConverterModule
      ),
  },
  {
    path: 'tools/json-viewer',
    loadChildren: () =>
      import('./modules/json-viewer/json-viewer.module').then(
        m => m.JsonViewerModule
      ),
  },
  {
    path: 'tools/password-generator',
    loadChildren: () =>
      import('./modules/password-generator/password-generator.module').then(
        m => m.PasswordGeneratorModule
      ),
  },
  {
    path: 'tools/base64-encode',
    loadChildren: () =>
      import('./modules/base64-encode/base64-encode.module').then(
        m => m.Base64EncodeModule
      ),
  },
  {
    path: 'tools/base64-decode',
    loadChildren: () =>
      import('./modules/base64-decode/base64-decode.module').then(
        m => m.Base64DecodeModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabledBlocking',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
