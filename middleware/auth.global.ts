import { useAuthStore } from "~/stores/auth";

export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useAuthStore();
  const blacklist = ["/", "/like"];

  if (blacklist.includes(to.fullPath) && auth.isInvalidCredential()) {
    return navigateTo("/member");
  }
});
