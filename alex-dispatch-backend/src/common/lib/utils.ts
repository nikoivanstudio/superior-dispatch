export const getRequiredEnv = (name: string) => {
  const env = process.env[name];

  if (!env) {
    throw new Error(`Missing ${name} in environment variable`);
  }

  return env;
};
