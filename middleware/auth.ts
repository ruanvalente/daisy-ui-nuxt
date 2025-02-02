import { defineNuxtRouteMiddleware, navigateTo, useCookie } from "#app";

export default defineNuxtRouteMiddleware((to) => {
  const token = useCookie("authToken", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  }).value;

  if (!token && to.path !== "/login") {
    return navigateTo("/login");
  }

  if (token && to.path === "/login") {
    return navigateTo("/");
  }
});
