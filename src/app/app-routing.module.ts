import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AppDirectoryModule } from './modules/app-directory/app-directory.module';
import { Base64EncodeModule } from './modules/base64-encode/base64-encode.module';
import { CssFormatterModule } from './modules/css-formatter/css-formatter.module';
import { HtmlFormatterModule } from './modules/html-formatter/html-formatter.module';
import { ImageCompressionModule } from './modules/image-compression/image-compression.module';
import { JsFormatterModule } from './modules/js-formatter/js-formatter.module';
import { JsonFormatterModule } from './modules/json-formatter/json-formatter.module';
import { JsonViewerModule } from './modules/json-viewer/json-viewer.module';
import { JwtModule } from './modules/jwt/jwt.module';
import { PasswordGeneratorModule } from './modules/password-generator/password-generator.module';
import { ScreenRecorderModule } from './modules/screen-recorder/screen-recorder.module';
import { TextCompareModule } from './modules/text-compare/text-compare.module';
import { UuidModule } from './modules/uuid/uuid.module';
import { VideoConverterModule } from './modules/video-converter/video-converter.module';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'tools', loadChildren: () => AppDirectoryModule },
  { path: 'tools/uuid', loadChildren: () => UuidModule },
  { path: 'tools/jwt', loadChildren: () => JwtModule },
  { path: 'tools/json-formatter', loadChildren: () => JsonFormatterModule },
  { path: 'tools/image-compress', loadChildren: () => ImageCompressionModule },
  { path: 'tools/js-formatter', loadChildren: () => JsFormatterModule },
  { path: 'tools/css-formatter', loadChildren: () => CssFormatterModule },
  { path: 'tools/html-formatter', loadChildren: () => HtmlFormatterModule },
  { path: 'tools/screen-recorder', loadChildren: () => ScreenRecorderModule },
  { path: 'tools/text-compare', loadChildren: () => TextCompareModule },
  { path: 'tools/video-converter', loadChildren: () => VideoConverterModule },
  { path: 'tools/json-viewer', loadChildren: () => JsonViewerModule },
  {
    path: 'tools/password-generator',
    loadChildren: () => PasswordGeneratorModule,
  },
  {
    path: 'tools/base64-encode',
    loadChildren: () => Base64EncodeModule,
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
