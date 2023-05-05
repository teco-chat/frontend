import { useAuthStore } from "~/stores/auth";

export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useAuthStore();
  const whiteList = ["/member"];

  if (!whiteList.includes(to.fullPath) && auth.isInvalidCredential()) {
    return navigateTo("/member");
  }
});
