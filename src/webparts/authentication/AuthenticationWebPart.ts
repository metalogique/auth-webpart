import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart, IPropertyPaneConfiguration } from '@microsoft/sp-webpart-base';
import Authentication from './components/Authentication';

export interface IAuthenticationWebPartProps {}

export default class AuthenticationWebPart extends BaseClientSideWebPart<IAuthenticationWebPartProps> {

  public render(): void {
    ReactDom.render(React.createElement(Authentication, { context: this.context }), this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.2');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: []
    };
  }
}
