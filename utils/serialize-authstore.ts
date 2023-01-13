import { BaseAuthStore } from 'pocketbase';

export default function serializeAuthStore(authStore: BaseAuthStore): BaseAuthStore {
  return JSON.parse(
    JSON.stringify({
      ...authStore,
      token: authStore.token,
      model: authStore.model,
      isValid: authStore.isValid,
    })
  );
}
