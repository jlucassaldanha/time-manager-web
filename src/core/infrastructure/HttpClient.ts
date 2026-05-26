export class HttpClient {
	private readonly baseUrl = process.env.NEXT_PUBLIC_API_URL;

	constructor(private readonly token?: string) {}

	async request<T>(path: string, options: RequestInit = {}): Promise<T> {
		const headers: Record<string, string> = {
			"Content-Type": "application/json",
			...(options.headers as Record<string, string>),
		}

		if (this.token) {
			headers["Authorization"] = `Bearer ${this.token}`
		}

		const response = await fetch(`${this.baseUrl}${path}`, {
			...options,
			headers,
		})

		if (!response.ok) {
			const errorBody = await response.text()
			console.error(`[Erro na API C#] Caminho: ${path} | Status: ${response.status} | Detalhes:`, errorBody);
      		throw new Error(`Erro na requisição (Status ${response.status}).`);
		}

		if (response.status === 204 || response.headers.get("content-length") === "0") {
			return {} as T
		}

		return await response.json();
	}

	get<T>(path: string, options?: RequestInit): Promise<T> {
		return this.request<T>(path, { ...options, method: "GET" })
	}

	post<T>(path: string, body?: unknown, options?: RequestInit): Promise<T> {
		return this.request<T>(path, { ...options, method: "POST", body: body ? JSON.stringify(body) : undefined });
	}
}