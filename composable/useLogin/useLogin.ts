import { useRouter } from "vue-router";

export const useLogin = () => {
  const loading = ref(false);
  const router = useRouter();

  const handleSignIn = () => {
    loading.value = true;
    setTimeout(() => {
      router.push("/");
    }, 3000);
  };

  const handleSignOut = () => {
    setTimeout(() => {
      router.push("/login");
    }, 3000);
  };

  return {
    loading,
    handleSignIn,
    handleSignOut,
  };
};
