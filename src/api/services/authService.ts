import { tokenStorage, userStorage } from "..";
import type {
  SendSmsRequestDTO,
  SendSmsResponseDTO,
} from "../../types/auth/code";
import type { LoginRequestDTO, LoginResponseDTO } from "../../types/auth/login";
import { HttpClient } from "../httpClient";

export class AuthService {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  sendSms(data: SendSmsRequestDTO): Promise<SendSmsResponseDTO> {
    return this.client.post<SendSmsResponseDTO, SendSmsRequestDTO>(
      "users/api/auth/send-message",
      data
    );
  }

  async login(data: LoginRequestDTO): Promise<LoginResponseDTO> {
    const res = await this.client.post<LoginResponseDTO, LoginRequestDTO>(
      "users/api/auth/login",
      data
    );

    tokenStorage.set(res.token);

    const fullName = `${res.profile.passenger.firstName} ${res.profile.passenger.lastName}`;
    userStorage.setName(fullName);
    userStorage.setUserId(res.userId);

    return res;
  }

  async logout(): Promise<void> {
    try {
      await this.client.post<void, undefined>(
        "users/api/auth/logout",
        undefined
      );
    } finally {
      tokenStorage.clear();
      userStorage.clear();
    }
  }
}
