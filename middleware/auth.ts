// import {
//   defineNuxtRouteMiddleware,
//   navigateTo,
//   useCookie,
//   useRuntimeConfig,
// } from "#app";

// export default defineNuxtRouteMiddleware((to) => {
//   const config = useRuntimeConfig();
//   const publicRoutes = config.public.publicRoutes as string[];

//   const isPublicRoute = publicRoutes?.includes(to.path);

//   const token = useCookie("authToken", {
//     httpOnly: true,
//     secure: true,
//     sameSite: "strict",
//   }).value;

//   if (!token && !isPublicRoute) {
//     return navigateTo("/login");
//   }

//   if (token && isPublicRoute) {
//     return navigateTo("/");
//   }
// });

import { defineNuxtRouteMiddleware, navigateTo, useCookie } from "#app";

export default defineNuxtRouteMiddleware((to) => {
  const token = useCookie("authToken").value;

  if (to.path === "/login" && !token) {
    return;
  }

  if (!token && to.path !== "/login") {
    return navigateTo("/login");
  }

  if (token && to.path === "/login") {
    return navigateTo("/");
  }
});
