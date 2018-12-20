import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
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
  method: string;
  requestBody: string;
}

export default class Authentication extends React.Component<IAuthenticationProps, IAuthenticationState> {
  constructor(props: IAuthenticationProps) {
    super(props);
    this.state = { token: '', resourceEndpoint: '', serviceUrl: '', serviceReply: '', method: "GET", requestBody: '' };
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
      .then(c => c.fetch(this.state.serviceUrl, AadHttpClient.configurations.v1, { body: this.state.requestBody, method: this.state.method }))
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
            <div className={styles.columnButton}>
              <Dropdown placeholder="Select a verb"
                label="Select a verb:"
                id="selectVerb"
                ariaLabel="Select a verb"
                selectedKey={ this.state.method }
                options={[ 
                  { key: "GET", text: "GET" },
                  { key: "POST", text: "POST" },
                  { key: "PUT", text: "PUT" },
                  { key: "DELETE", text: "DELETE" },
                  { key: "OPTION", text: "OPTION" },
                  { key: "PATCH", text: "PATCH" },
                  { key: "HEAD", text: "HEAD" },
                ]}
                onChanged={ v => this.setState({ method: v.key as string }) } />
            </div>
            <div className={styles.columnInput}>
              <TextField label="URL" multiline underlined autoAdjustHeight className={styles.textLabel} value={this.state.serviceUrl} onChanged={ v => this.setState({ serviceUrl: v }) } onChange={ (ev) => this.setState({ serviceUrl: ev.currentTarget.value }) } />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.column}>
            <TextField label="Request body" multiline underlined autoAdjustHeight className={styles.textLabel} value={this.state.requestBody} onChanged={ v => this.setState({ requestBody: v }) } onChange={ (ev) => this.setState({ requestBody: ev.currentTarget.value }) } />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.column}>
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
