import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'PicGalleryWebPartStrings';
import PicGallery from './components/PicGallery';
import { IPicGalleryProps } from './components/IPicGalleryProps';

export interface IPicGalleryWebPartProps {
  description: string;
}

export default class PicGalleryWebPart extends BaseClientSideWebPart<IPicGalleryWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IPicGalleryProps> = React.createElement(
      PicGallery,
      {
        description: this.properties.description,
        siteurl:this.context.pageContext.web.absoluteUrl
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
