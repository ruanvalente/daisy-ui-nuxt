import { useRouter, useCookie } from "#app";

export const useLogin = () => {
  const loading = ref(false);
  const router = useRouter();
  const authToken = useCookie("authToken");

  const generateToken = () => {
    return Math.random().toString(36).substring(2, 16);
  };

  const handleSignIn = () => {
    loading.value = true;
    setTimeout(() => {
      authToken.value = generateToken();
      router.push("/");
    }, 3000);
  };

  const handleSignOut = () => {
    setTimeout(() => {
      authToken.value = null;
      router.push("/login");
    }, 1000);
  };

  return {
    loading,
    handleSignIn,
    handleSignOut,
  };
};
