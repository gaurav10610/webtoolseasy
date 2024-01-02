import {
  AfterViewInit,
  Component,
  ElementRef,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { ApplicationConfig } from 'src/app/@types/config';
import { DescriptionBlock } from 'src/app/@types/description';
import {
  componentConfig,
  descriptionData,
} from 'src/environments/component-config/qr-code-generator/config';
import { toCanvas, toString, toDataURL } from 'qrcode';
import { FileService } from 'src/app/service/file/file.service';
import { Clipboard } from '@angular/cdk/clipboard';
import { Observable, Observer } from 'rxjs';
import { PlatformMetadataService } from 'src/app/service/platform-metadata/platform-metadata.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-qr-code-generator',
  templateUrl: './qr-code-generator.component.html',
  styleUrls: ['./qr-code-generator.component.scss'],
})
export class QrCodeGeneratorComponent implements AfterViewInit {
  @ViewChild('qrCanvas', { static: false })
  qrCanvas!: ElementRef;

  qrText: string = 'https://webtoolseasy.com/';

  applicationConfig: ApplicationConfig = componentConfig;
  descriptionData: DescriptionBlock[] = descriptionData;

  constructor(
    private fileService: FileService,
    private renderer: Renderer2,
    private clipboard: Clipboard,
    private platformMetaDataService: PlatformMetadataService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    if (route.snapshot.queryParams['text']) {
      this.qrText = decodeURIComponent(route.snapshot.queryParams['text']);
    }
  }

  ngAfterViewInit(): void {
    if (this.platformMetaDataService.isPlatformBrowser) {
      toCanvas(this.qrCanvas.nativeElement, this.qrText);
    }
  }

  onTextChange(event: any) {
    this.qrText = event.target.value;
    if (this.qrText.trim() !== '') {
      toCanvas(this.qrCanvas.nativeElement, this.qrText);
    }
  }

  copySVG() {
    toString(this.qrText, {
      type: 'svg',
    }).then(svgString => this.clipboard.copy(svgString));
  }

  downloadImage(imageType: string) {
    const mimeType = `image/${imageType}`;
    const options: any = {
      type: mimeType,
    };

    // @ts-ignore
    toDataURL(this.qrText, options).then(dataUrl => {
      const base64Data = this.fileService.dataUriToBase64(dataUrl);
      this.base64toBlob(base64Data, imageType).subscribe((blob: Blob) =>
        this.fileService.downloadFile(
          `qr-code.${imageType}`,
          blob,
          this.renderer
        )
      );
    });
  }

  /* Method to convert Base64Data Url as Image Blob */
  base64toBlob(base64Data: string, mimeType: string): Observable<Blob> {
    return Observable.create((observer: Observer<Blob>) => {
      const byteString: string = window.atob(base64Data);
      const arrayBuffer: ArrayBuffer = new ArrayBuffer(byteString.length);
      const int8Array: Uint8Array = new Uint8Array(arrayBuffer);
      for (let i = 0; i < byteString.length; i++) {
        int8Array[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([int8Array], { type: mimeType });
      observer.next(blob);
      observer.complete();
    });
  }

  copyShareableLink() {
    this.clipboard.copy(
      `${environment.hostname}${this.router.url}?text=${encodeURIComponent(
        this.qrText
      )}`
    );
  }
}
