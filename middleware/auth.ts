export default defineNuxtRouteMiddleware((to) => {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded.value) return;

  if (!isSignedIn.value && to.path !== "/login") {
    return navigateTo("/login");
  }

  if (isSignedIn.value && to.path === "/login") {
    return navigateTo("/");
  }
});
