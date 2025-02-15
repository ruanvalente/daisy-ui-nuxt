import { beforeEach, describe, expect, it, vi } from "vitest";
import { ref } from "vue";
import type { useModal as originalUseModal } from "~/composable/useModal/useModal";

type UserTypeModal = {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar: string;
};
type UseModalType = ReturnType<typeof originalUseModal>;

vi.mock("~/composable/useModal/useModal", () => {
  const isModalOpen = ref(false);
  const isDeleteModalOpen = ref(false);
  const editingUser = ref({
    id: 0,
    name: "",
    email: "",
    role: "",
    avatar: "",
  });
  const userToDelete = ref<UserTypeModal | null>(null);

  return {
    useModal: () => ({
      isModalOpen,
      isDeleteModalOpen,
      editingUser,
      userToDelete,
      openEditModal: (user: UserTypeModal) => {
        isModalOpen.value = true;
        editingUser.value = user;
      },
      closeModal: () => {
        isModalOpen.value = false;
        editingUser.value = {
          id: 0,
          name: "",
          email: "",
          role: "",
          avatar: "",
        };
      },
      openDeleteModal: (user: UserTypeModal) => {
        isDeleteModalOpen.value = true;
        userToDelete.value = user;
      },
      closeDeleteModal: () => {
        isDeleteModalOpen.value = false;
        userToDelete.value = null;
      },
    }),
  };
});

let useModal: () => UseModalType;

beforeEach(async () => {
  useModal = (
    (await vi.importMock("~/composable/useModal/useModal")) as {
      useModal: () => UseModalType;
    }
  ).useModal;
});

describe("useModal", () => {
  it("initializes with correct default values", () => {
    const { isModalOpen, isDeleteModalOpen, editingUser, userToDelete } =
      useModal();

    expect(isModalOpen.value).toBe(false);
    expect(isDeleteModalOpen.value).toBe(false);
    expect(editingUser.value).toEqual({
      id: 0,
      name: "",
      email: "",
      role: "",
      avatar: "",
    });
    expect(userToDelete.value).toBe(null);
  });

  it("opens and closes the edit modal correctly", () => {
    const { isModalOpen, editingUser, openEditModal, closeModal } = useModal();
    const user = {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "Admin",
      avatar: "avatar.png",
    };

    openEditModal(user);

    expect(isModalOpen.value).toBe(true);
    expect(editingUser.value).toEqual(user);

    closeModal();
    expect(isModalOpen.value).toBe(false);
    expect(editingUser.value).toEqual({
      id: 0,
      name: "",
      email: "",
      role: "",
      avatar: "",
    });
  });

  it("opens and closes the delete modal correctly", () => {
    const {
      isDeleteModalOpen,
      userToDelete,
      openDeleteModal,
      closeDeleteModal,
    } = useModal();
    const user = {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "Admin",
      avatar: "avatar.png",
    };

    openDeleteModal(user);
    expect(isDeleteModalOpen.value).toBe(true);
    expect(userToDelete.value).toEqual(user);

    closeDeleteModal();
    expect(isDeleteModalOpen.value).toBe(false);
    expect(userToDelete.value).toBe(null);
  });
});
