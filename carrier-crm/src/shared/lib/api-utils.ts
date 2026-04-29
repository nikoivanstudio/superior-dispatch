const readErrorPayload = async (response: Response) => {
  try {
    return await response.json();
  } catch {
    return null;
  }
};

const BACKEND_UNAVAILABLE_MESSAGE = 'Backend is unavailable right now';

const getErrorMessage = (payload: unknown, fallback: string) => {
  if (payload && typeof payload === 'object' && 'message' in payload) {
    const message = (payload as { message?: unknown }).message;

    if (typeof message === 'string' && message.trim()) {
      return message;
    }
  }

  return fallback;
};

const createBackendUnavailableError = (cause?: unknown) =>
  Object.assign(new Error(BACKEND_UNAVAILABLE_MESSAGE), {
    cause,
    code: 'BACKEND_UNAVAILABLE'
  });

const isBackendUnavailableError = (error: unknown): boolean =>
  error instanceof Error &&
  ('code' in error
    ? (error as { code?: unknown }).code === 'BACKEND_UNAVAILABLE'
    : error.message === BACKEND_UNAVAILABLE_MESSAGE);

export const apiUtils = {
  readErrorPayload,
  getErrorMessage,
  createBackendUnavailableError,
  isBackendUnavailableError,
  BACKEND_UNAVAILABLE_MESSAGE
};
