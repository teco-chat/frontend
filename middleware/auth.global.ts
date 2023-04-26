import { useAuthStore } from "~/stores/auth";

export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useAuthStore();
  const whiteList = ["/login"];

  if (!whiteList.includes(to.fullPath) && auth.isInvalid()) {
    return navigateTo("/login");
  }
});
