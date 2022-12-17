import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { CssFormatterComponent } from './components/css-formatter/css-formatter.component';
import { HomeComponent } from './components/home/home.component';
import { AppDirectoryModule } from './modules/app-directory/app-directory.module';
// import { HtmlFormatterModule } from './modules/html-formatter/html-formatter.module';
import { ImageCompressionModule } from './modules/image-compression/image-compression.module';
import { JsFormatterModule } from './modules/js-formatter/js-formatter.module';
import { JsonFormatterModule } from './modules/json-formatter/json-formatter.module';
import { JwtModule } from './modules/jwt/jwt.module';
import { UuidModule } from './modules/uuid/uuid.module';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'tools', loadChildren: () => AppDirectoryModule },
  { path: 'tools/uuid', loadChildren: () => UuidModule },
  { path: 'tools/jwt', loadChildren: () => JwtModule },
  { path: 'tools/json-formatter', loadChildren: () => JsonFormatterModule },
  { path: 'tools/image-compress', loadChildren: () => ImageCompressionModule },
  { path: 'tools/js-formatter', loadChildren: () => JsFormatterModule },
  // { path: 'tools/css-formatter', loadChildren: () => CssFormatterComponent },
  // { path: 'tools/html-formatter', loadChildren: () => HtmlFormatterModule },
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
