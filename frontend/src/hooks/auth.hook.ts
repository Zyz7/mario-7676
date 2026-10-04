import { authStore } from "../stores/auth.store";


export const authHook = () => {
    return authStore();
};
