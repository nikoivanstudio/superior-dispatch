const readErrorPayload = async (response: Response) => {
  try {
    return await response.json();
  } catch {
    return null;
  }
};

const getErrorMessage = (payload: unknown, fallback: string) => {
  if (payload && typeof payload === 'object' && 'message' in payload) {
    const message = (payload as { message?: unknown }).message;

    if (typeof message === 'string' && message.trim()) {
      return message;
    }
  }

  return fallback;
};

export const apiUtils = { readErrorPayload, getErrorMessage };
