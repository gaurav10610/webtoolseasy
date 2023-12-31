import { Component, OnInit } from '@angular/core';
import { ApplicationConfig } from 'src/app/@types/config';
import { DescriptionBlock } from 'src/app/@types/description';
import { PlatformMetadataService } from 'src/app/service/platform-metadata/platform-metadata.service';
import {
  componentConfig,
  descriptionData,
} from 'src/environments/component-config/xml-to-json/config';
import { Clipboard } from '@angular/cdk/clipboard';
import { X2jOptionsOptional, XMLParser } from 'fast-xml-parser';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-xml-to-json',
  templateUrl: './xml-to-json.component.html',
  styleUrls: ['./xml-to-json.component.scss'],
})
export class XmlToJsonComponent implements OnInit {
  rawCode: string = `
  <?xml version="1.0"?>
  <customers>
     <customer id="101">
        <name>WebToolsEasy</name>
        <address>
           <street>101 Last1</street>
           <city>Framingham</city>
           <state>MA</state>
           <zip>0001</zip>
        </address>
        <address>
           <street>101 Last1</street>
           <city>Framingham</city>
           <state>MA</state>
           <zip>0002</zip>
        </address>
        <address>
           <street>101 Last1</street>
           <state>MA</state>
           <zip>0003</zip>
        </address>
     </customer>
  </customers>`;

  formattedCode!: string;

  xmlEditorOptions = {
    theme: 'vs-dark',
    language: 'xml',
    fontSize: 15,
  };

  jsonEditorOptions = {
    theme: 'vs-dark',
    language: 'json',
    fontSize: 15,
  };

  xmlParser = new XMLParser();

  parserOptions: X2jOptionsOptional = {
    ignoreAttributes: true,
    ignoreDeclaration: true,
  };

  applicationConfig: ApplicationConfig = componentConfig;
  descriptionData: DescriptionBlock[] = descriptionData;

  constructor(
    private clipboard: Clipboard,
    public platformMetaDataService: PlatformMetadataService
  ) {}

  ngOnInit(): void {
    this.convertXmlToJson(this.rawCode);
  }

  onRawCodeChange(updatedModel: string) {
    this.convertXmlToJson(updatedModel);
  }

  copyFormattedCode() {
    this.clipboard.copy(this.formattedCode);
  }

  /**
   * checkbox change event
   * @param event object wrapping event data
   * @param optionId identifier of capture option
   */
  generatorOptionChange(event: MatCheckboxChange, optionId: string) {
    switch (optionId) {
      case 'ignoreAttributes':
        this.parserOptions.ignoreAttributes = event.checked;
        break;
      case 'ignoreDeclaration':
        this.parserOptions.ignoreDeclaration = event.checked;
        break;
    }
    this.xmlParser = new XMLParser(this.parserOptions);
    this.convertXmlToJson(this.rawCode);
  }

  convertXmlToJson(xml: string) {
    this.formattedCode = JSON.stringify(this.xmlParser.parse(xml), null, '  ');
  }
}
