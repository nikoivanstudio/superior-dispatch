import { Injectable } from '@nestjs/common';
import { superDispatchHost } from '../../../../../../common/lib/url.utils';
import { CLIENT_ID, CLIENT_SECRET } from './constants/settings';
import { DispatchToken } from '../dispatch-token-store/model/domain';

@Injectable()
export class DispatchAuthClientService {
  public async getSuperDispatchAuthToken(): Promise<DispatchToken> {
    const body = new URLSearchParams({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      grant_type: 'client_credentials'
    });

    const url = `${superDispatchHost}/oauth/token/`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body
    });

    if (!response.ok) {
      const errorBody = await response.text();

      throw new Error(
        `Failed to fetch Super Dispatch auth token: ${response.status} ${response.statusText}. ${errorBody}`
      );
    }

    const token = (await response.json()) as DispatchToken;

    if (!token) {
      throw new Error(
        'Failed to fetch Super Dispatch auth token: access_token is missing in response'
      );
    }

    return token;
  }
}
