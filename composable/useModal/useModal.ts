import { ref } from "vue";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar: string;
}

export const useModal = () => {
  const isModalOpen = ref(false);
  const isDeleteModalOpen = ref(false);

  const editingUser = ref<User>({
    id: 0,
    name: "",
    email: "",
    role: "",
    avatar: "",
  });

  const userToDelete = ref<User | null>(null);

  const openEditModal = (user: User) => {
    editingUser.value = { ...user };
    isModalOpen.value = true;
  };

  const closeModal = () => {
    isModalOpen.value = false;
    editingUser.value = {
      id: 0,
      name: "",
      email: "",
      role: "",
      avatar: "",
    };
  };

  const openDeleteModal = (user: User | null) => {
    userToDelete.value = user;
    isDeleteModalOpen.value = true;
  };

  const closeDeleteModal = () => {
    isDeleteModalOpen.value = false;
    userToDelete.value = null;
  };

  return {
    isModalOpen,
    isDeleteModalOpen,
    editingUser,
    userToDelete,
    openEditModal,
    closeModal,
    openDeleteModal,
    closeDeleteModal,
  };
};
