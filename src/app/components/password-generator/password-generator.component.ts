import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnInit,
  PLATFORM_ID,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { Title, Meta, DomSanitizer } from '@angular/platform-browser';
import { BaseComponent } from 'src/app/base/base.component';
import { AppContextService } from 'src/app/service/app-context/app-context.service';
import { FileService } from 'src/app/service/file/file.service';
import { LogUtils } from 'src/app/service/util/logger';
import {
  descriptionData,
  componentConfig,
} from 'src/environments/component-config/password-generator/config';
import { Clipboard } from '@angular/cdk/clipboard';
import {
  generate,
  generateMultiple,
  GenerateOptions,
} from 'generate-password-browser';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-password-generator',
  templateUrl: './password-generator.component.html',
  styleUrls: ['./password-generator.component.scss'],
})
export class PasswordGeneratorComponent
  extends BaseComponent
  implements OnInit, AfterViewInit
{
  password: string;
  passwordList: string[] = [];

  @ViewChild('passwordLengthInput', { static: false })
  passwordLengthInput!: ElementRef;

  @ViewChild('bulkPasswordInput', { static: false })
  bulkPasswordInput!: ElementRef;

  bulkPasswordError: boolean = false;

  /**
   * flag to decide whether to show password or hide
   */
  passwordVisibility: boolean = false;

  /**
   * password generator options
   */
  options: GenerateOptions = {
    /**
     * Length of the generated password.
     * @default 10
     */
    length: 12,
    /**
     * Should the password include numbers
     * @default false
     */
    numbers: false,
    /**
     * Should the password include symbols, or symbols to include
     * @default false
     */
    symbols: false,
    /**
     * Should the password include lowercase characters
     * @default true
     */
    lowercase: true,
    /**
     * Should the password include uppercase characters
     * @default true
     */
    uppercase: true,
    /**
     * Should exclude visually similar characters like 'i' and 'I'
     * @default false
     */
    excludeSimilarCharacters: false,
    /**
     * List of characters to be excluded from the password
     * @default ""
     */
    exclude: '~',
    /**
     * Password should include at least one character from each pool
     * @default false
     */
    strict: false,
  };

  constructor(
    private clipboard: Clipboard,
    private titleService: Title,
    private metaService: Meta,
    @Inject(DOCUMENT) private document: any,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    @Inject(PLATFORM_ID) private platformId: string,
    private appContextService: AppContextService,
    private fileService: FileService,
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
    this.appContextService.tags = componentConfig.tags;
    this.appContextService.mainHeading = componentConfig.mainHeading!;
    this.appContextService.subHeading = componentConfig.subHeading;
    this.appContextService.descrptionData = descriptionData;
    this.appContextService.relatedTools = componentConfig.relatedTools;

    this.password = generate(this.options);
  }

  ngOnInit(): void {
    LogUtils.info('passwordgenerator component: ngOnInit');
  }

  ngAfterViewInit(): void {
    LogUtils.info('passwordgenerator component: ngAfterViewInit');
  }

  /**
   * generate a random password
   */
  generatePassword() {
    this.password = generate(this.options);
  }

  /**
   * copy generated password
   */
  copyGeneratedPassword() {
    this.clipboard.copy(this.password);
  }

  /**
   * generate bulk passwords with specified version
   */
  generateBulkPasswords() {
    const count = this.bulkPasswordInput.nativeElement.value;
    if (count <= 1000) {
      this.bulkPasswordError = false;
      this.passwordList = generateMultiple(count, this.options);
    } else {
      LogUtils.error('more than 1000');
      this.bulkPasswordError = true;
    }
  }

  /**
   * generate bulk passwords and download to text file
   * @param event
   */
  async downloadPasswords(event: Event) {
    /**
     * cancel default action
     */
    event.preventDefault();
    let string = '';

    const count = this.bulkPasswordInput.nativeElement.value;
    if (count <= 1000) {
      this.bulkPasswordError = false;
      for (let i = 0; i < count; i++) {
        string = string.concat(...[generate(this.options), '\r\n']);
      }
      this.fileService.downloadFile(
        `bulk-passwords-${count}.txt`,
        new Blob([string], { type: 'plain/text' }),
        this.renderer
      );
    } else {
      this.bulkPasswordError = true;
    }
  }

  /**
   * get encrypted password
   * @param password
   */
  getEncryptedPassword(password: string) {
    return password
      .split('')
      .map((character, index) => {
        if (index === 0 || index === 1 || index === 2) {
          return character;
        }
        return '*';
      })
      .reduce((a, b) => a + b);
  }

  /**
   * handles password length change event
   * @param event
   */
  handlePasswordLengthChange(event: any) {
    const passwordLength: number = Number(event.target.value);
    this.options.length = 30 < passwordLength ? 30 : passwordLength;
  }

  /**
   * handles excluded characters change event
   * @param event
   */
  handleExcludedCharsChange(event: any) {
    this.options.exclude = event.target.value;
  }

  /**
   * checkbox change event
   * @param event object wrapping event data
   * @param optionId identifier of capture option
   */
  generatorOptionChange(event: MatCheckboxChange, optionId: string) {
    LogUtils.info(`generator option changed: ${optionId}`);
    switch (optionId) {
      case 'numbers':
        this.options.numbers = event.checked;
        break;
      case 'symbols':
        this.options.symbols = event.checked;
        break;
      case 'lowercase':
        this.options.lowercase = event.checked;
        break;
      case 'uppercase':
        this.options.uppercase = event.checked;
        break;
    }
  }

  /**
   * toggle password visibility flag
   */
  togglePassVisibility() {
    this.passwordVisibility = !this.passwordVisibility;
  }
}
