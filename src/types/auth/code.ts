export interface SendSmsRequestDTO {
  phone: string;
}

export interface SendSmsResponseDTO {
  success: boolean;
  retryAfter: number;
}
