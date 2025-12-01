export interface HttpClientConfig {
  baseUrl?: string;
  headers?: Record<string, string>;
  getToken?: () => string | null;
  onUnauthorized?: () => void;
}

export class HttpClient {
  private baseUrl: string;
  private headers: Record<string, string>;
  private getToken?: () => string | null;
  private onUnauthorized?: () => void;

  constructor(config?: HttpClientConfig) {
    this.baseUrl = config?.baseUrl ?? "";
    this.headers = config?.headers ?? { "Content-Type": "application/json" };
    this.getToken = config?.getToken;
    this.onUnauthorized = config?.onUnauthorized;
  }

  private buildUrl(url: string) {
    return this.baseUrl + url;
  }

  private buildHeaders() {
    const headers: Record<string, string> = { ...this.headers };

    const token = this.getToken?.();
    if (token) headers["Authorization"] = `Bearer ${token}`;

    return headers;
  }

  async get<T>(url: string): Promise<T> {
    const res = await fetch(this.buildUrl(url), {
      method: "GET",
      headers: this.buildHeaders(),
    });

    return this.handleResponse<T>(res);
  }

  async post<T, B = any>(url: string, body: B): Promise<T> {
    const res = await fetch(this.buildUrl(url), {
      method: "POST",
      headers: this.buildHeaders(),
      body: JSON.stringify(body),
    });

    return this.handleResponse<T>(res);
  }

  private async handleResponse<T>(res: Response): Promise<T> {
    if (res.status === 401 && this.onUnauthorized) {
      this.onUnauthorized();
    }

    if (!res.ok) {
      let message = res.statusText;

      try {
        const body = await res.json();
        message = body?.error ?? message;
      } catch {}

      throw new Error(message);
    }

    if (res.status === 204) {
      return undefined as unknown as T;
    }

    return res.json() as Promise<T>;
  }
}
