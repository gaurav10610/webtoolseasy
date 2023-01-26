import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { Title, Meta, DomSanitizer } from '@angular/platform-browser';
import { BaseComponent } from 'src/app/base/base.component';
import { LogUtils } from 'src/app/service/util/logger';
import { textcompare as componentConfig } from 'src/environments/component-config';
import { diffChars, Change } from 'diff';

@Component({
  selector: 'app-text-compare',
  templateUrl: './text-compare.component.html',
  styleUrls: ['./text-compare.component.scss'],
})
export class TextCompareComponent
  extends BaseComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  text1: string = 'webtoolseasy is awesome';
  text2: string = 'webtoolseasy is super cool';

  @ViewChild('text1Div', { static: false })
  text1Div!: ElementRef;

  @ViewChild('text2Div', { static: false })
  text2Div!: ElementRef;

  @ViewChild('diffBlock', { static: false })
  diffBlock!: ElementRef;

  constructor(
    private titleService: Title,
    private metaService: Meta,
    @Inject(DOCUMENT) private document: Document,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    @Inject(PLATFORM_ID) private platformId: string,
    private renderer: Renderer2
  ) {
    super();
    this.loadCustomIcons(
      componentConfig.icons,
      this.matIconRegistry,
      this.domSanitizer,
      this.platformId
    );
    this.updatePageMetaData(
      componentConfig,
      this.titleService,
      this.metaService,
      this.document
    );
    this.updateTags(componentConfig);
  }

  ngOnInit(): void {
    LogUtils.info('text compare component: ngOnInit');
  }

  ngAfterViewInit(): void {
    LogUtils.info('text compare component: ngAfterViewInit');
    this.updateText1(this.text1);
    this.updateText2(this.text2);
    this.evaluateDifference(this.text1, this.text2);
  }

  ngOnDestroy(): void {
    LogUtils.info('text compare component: ngOnDestroy');
  }

  onText1Change() {
    this.text1 = this.text1Div.nativeElement.innerText;
    this.evaluateDifference(this.text1, this.text2);
  }

  onText1Paste(event: any) {
    event.preventDefault();
    const pastedData = (
      event.clipboardData || (<any>window).clipboardData
    ).getData('text');

    this.text1 = pastedData;
    this.updateText1(pastedData);
    this.evaluateDifference(this.text1, this.text2);
  }

  updateText1(text1: string) {
    this.renderer.setProperty(this.text1Div.nativeElement, 'innerText', text1);
  }

  onText2Change() {
    this.text2 = this.text2Div.nativeElement.innerText;
    this.evaluateDifference(this.text1, this.text2);
  }

  onText2Paste(event: any) {
    event.preventDefault();
    const pastedData = (
      event.clipboardData || (<any>window).clipboardData
    ).getData('text');

    this.text2 = pastedData;
    this.updateText2(pastedData);
    this.evaluateDifference(this.text1, this.text2);
  }

  updateText2(text2: string) {
    this.renderer.setProperty(this.text2Div.nativeElement, 'innerText', text2);
  }

  /**
   * evaluate and show the difference
   * @param text1
   * @param text2
   */
  evaluateDifference(text1: string, text2: string): void {
    LogUtils.info(`evaluating difference between the two texts`);
    const diffs: Change[] = diffChars(text1, text2, { ignoreCase: false });

    if (diffs.length > 0) {
      const childElements = this.diffBlock.nativeElement.children;
      for (const child of childElements) {
        this.renderer.removeChild(this.diffBlock.nativeElement, child);
      }
    }

    const fragment: DocumentFragment = this.document.createDocumentFragment();

    diffs.forEach(part => {
      // green for additions, red for deletions
      // grey for common parts
      const color = part.added ? 'green' : part.removed ? 'red' : 'grey';
      const span = this.renderer.createElement('span');
      span.style.color = color;
      this.renderer.appendChild(span, this.renderer.createText(part.value));
      this.renderer.appendChild(fragment, span);
    });

    this.renderer.appendChild(this.diffBlock.nativeElement, fragment);
  }
}
