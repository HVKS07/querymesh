type FetchJsonOptions = {
  timeoutMs?: number;
  headers?: Record<string, string>;
};

const defaultTimeoutMs = 2000;

export const fetchJson = async <T>(
  url: string,
  options: FetchJsonOptions = {}
): Promise<T> => {
  const timeoutMs = options.timeoutMs ?? defaultTimeoutMs;
  const controller = new AbortController();
  const startedAt = Date.now();
  const timeout = setTimeout(() => {
    controller.abort();
  }, timeoutMs);

  console.log(`Downstream request started: GET ${url}`);

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: options.headers,
      signal: controller.signal
    });

    const durationMs = Date.now() - startedAt;

    if (!response.ok) {
      console.error(
        `Downstream request failed: GET ${url} status=${response.status} durationMs=${durationMs}`
      );
      throw new Error(`GET ${url} returned status ${response.status}`);
    }

    console.log(
      `Downstream request completed: GET ${url} status=${response.status} durationMs=${durationMs}`
    );

    return (await response.json()) as T;
  } catch (error) {
    const durationMs = Date.now() - startedAt;

    if (error instanceof Error && error.name !== "Error") {
      console.error(`Downstream request failed: GET ${url} durationMs=${durationMs}`);
    }

    throw error;
  } finally {
    clearTimeout(timeout);
  }
};
