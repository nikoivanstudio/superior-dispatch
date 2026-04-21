import { BadRequestException, Injectable } from '@nestjs/common';
import { DispatchAuthClientService } from '../dispatch-auth-client/dispatch-auth-client.service';
import { DispatchTokenStoreService } from '../dispatch-token-store/dispatch-token-store.service';

@Injectable()
export class DispatchTokenProviderService {
  constructor(
    private readonly dispatchAuthClientService: DispatchAuthClientService,
    private readonly dispatchTokenStoreService: DispatchTokenStoreService
  ) {}

  public async getToken(): Promise<string> {
    const cachedToken = await this.dispatchTokenStoreService.getToken();

    if (cachedToken) {
      return cachedToken;
    }

    const newToken =
      await this.dispatchAuthClientService.getSuperDispatchAuthToken();

    const token = await this.dispatchTokenStoreService.saveToken({
      ...newToken,
      expires_in: Number(Date.now() + 36000000)
    });

    if (!token) {
      const errorMessage = 'Error receiving token';

      console.error(errorMessage);

      throw new BadRequestException(errorMessage);
    }

    return token;
  }
}
