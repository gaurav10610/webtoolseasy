import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, Inject, ViewChild } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { Title, Meta, DomSanitizer } from '@angular/platform-browser';
import { ApplicationConfig } from 'src/app/@types/config';
import { DescriptionBlock } from 'src/app/@types/description';
import { IconConfigService } from 'src/app/service/icon-config/icon-config.service';
import { MetaConfigService } from 'src/app/service/meta-config/meta-config.service';
import { CronOptions, CronGenComponent } from 'ngx-cron-editor';
import { Clipboard } from '@angular/cdk/clipboard';
import {
  componentConfig,
  descriptionData,
} from 'src/environments/component-config/cron-generator/config';
import { FormControl } from '@angular/forms';
import { LogUtils } from 'src/app/service/util/logger';

@Component({
  selector: 'app-cron-generator',
  templateUrl: './cron-generator.component.html',
  styleUrls: ['./cron-generator.component.scss'],
})
export class CronGeneratorComponent implements AfterViewInit {
  /**
   * cron form control
   */
  cronForm: FormControl;

  @ViewChild('cronEditor', { static: false })
  cronEditor!: CronGenComponent;

  cronExpression: string = '0 0 0 1 *';

  cronOptions: CronOptions = {
    defaultTime: '00:00:00',

    hideMinutesTab: false,
    hideHourlyTab: false,
    hideDailyTab: false,
    hideWeeklyTab: false,
    hideMonthlyTab: false,
    hideYearlyTab: false,
    hideAdvancedTab: true,
    hideSpecificWeekDayTab: false,
    hideSpecificMonthWeekTab: false,

    use24HourTime: true,
    hideSeconds: false,

    cronFlavor: 'standard', //standard or quartz
  };

  applicationConfig: ApplicationConfig = componentConfig;
  descriptionData: DescriptionBlock[] = descriptionData;

  constructor(
    private titleService: Title,
    private metaService: Meta,
    @Inject(DOCUMENT) private document: any,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private metaConfigService: MetaConfigService,
    private iconConfigService: IconConfigService,
    private clipboard: Clipboard
  ) {
    this.cronForm = new FormControl(this.cronExpression);

    this.iconConfigService.loadCustomIcons(
      componentConfig.icons,
      this.matIconRegistry,
      this.domSanitizer
    );
    this.metaConfigService.updatePageMetaData(
      componentConfig,
      this.titleService,
      this.metaService,
      this.document
    );
  }

  ngAfterViewInit(): void {
    this.cronEditor.registerOnChange(this.onCronChanged.bind(this));
    this.cronEditor.registerOnTouched(this.onCronEditorTouched.bind(this));
  }

  onCronChanged(event: any) {
    this.cronExpression = event;
  }

  onCronEditorTouched() {
    LogUtils.info('cron editor touched');
  }

  copyCronExpression() {
    this.clipboard.copy(this.cronExpression);
  }

  changeCronFlavor(event: any) {
    this.cronOptions.cronFlavor = event;
  }
}
