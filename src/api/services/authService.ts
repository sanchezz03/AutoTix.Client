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
      "/api/auth/send-message",
      data
    );
  }

  async login(data: LoginRequestDTO): Promise<LoginResponseDTO> {
    const res = await this.client.post<LoginResponseDTO, LoginRequestDTO>(
      "/api/auth/login",
      data
    );
    console.log("res: ", res);

    tokenStorage.set(res.token);

    const fullName = `${res.profile.passenger.firstName} ${res.profile.passenger.lastName}`;
    userStorage.setName(fullName);

    return res;
  }

  async logout(): Promise<void> {
    try {
      await this.client.post<void, undefined>("/api/auth/logout", undefined);
    } finally {
      tokenStorage.clear();
      userStorage.clear();
    }
  }
}
