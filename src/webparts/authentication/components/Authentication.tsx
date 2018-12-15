import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import styles from './Authentication.module.scss';
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { AadHttpClient } from '@microsoft/sp-http';

export interface IAuthenticationProps {
  context: WebPartContext;
}

export interface IAuthenticationState {
  token: string;
  resourceEndpoint: string;
  serviceUrl: string;
  serviceReply: any;
}

export default class Authentication extends React.Component<IAuthenticationProps, IAuthenticationState> {
  constructor(props: IAuthenticationProps) {
    super(props);
    this.state = { token: '', resourceEndpoint: '', serviceUrl: '', serviceReply: '' };
  }

  public updateToken() {
    this.props.context.aadTokenProviderFactory
      .getTokenProvider()
      .then(p => p.getToken(this.state.resourceEndpoint))
      .then(t => this.setState({ token: t }))
      .catch(e => this.setState({ token: e }));
  }

  public callService() {
    this.props.context.aadHttpClientFactory
      .getClient(this.state.resourceEndpoint)
      .then(c => c.get(this.state.serviceUrl, AadHttpClient.configurations.v1))
      .then(r => r.text())
      .then(r => this.setState({ serviceReply: r }))
      .catch(e => this.setState({ serviceReply: e }));
  }

  public render(): React.ReactElement<IAuthenticationProps> {
    
    return (
      <div className={ styles.authentication }>
        <div className={ styles.container }>
          <div className={ styles.firstRow }>
            <span className={ styles.title }>Authorization</span>
          </div>
          <div className={styles.row}>
            <div className={styles.columnInput}>
              <TextField label="AppID" className={styles.textLabel} underlined value={this.state.resourceEndpoint} onChanged={v => this.setState({ resourceEndpoint: v })} onChange={(ev) => this.setState({ resourceEndpoint: ev.currentTarget.value })} />
            </div>
            <div className={styles.columnButton}>
              <DefaultButton onClick={() => this.updateToken()}>Request Token</DefaultButton>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.column}>
              <TextField label="Bearer token" borderless readOnly className={styles.textLabel} multiline autoAdjustHeight value={this.state.token} />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.columnInput}>
              <TextField label="URL" underlined className={styles.textLabel} value={this.state.serviceUrl} onChanged={ v => this.setState({ serviceUrl: v }) } onChange={ (ev) => this.setState({ serviceUrl: ev.currentTarget.value }) } />
            </div>
            <div className={styles.columnButton}>
              <DefaultButton onClick={() => this.callService()}>Call service</DefaultButton>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.column}>
              <TextField label="Service reply" multiline readOnly borderless autoAdjustHeight value={this.state.serviceReply} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
