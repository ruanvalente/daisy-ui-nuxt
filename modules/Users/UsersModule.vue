<template>
  <div class="lg:p-4">
    <h2 class="text-2xl font-bold mb-4 dark:text-gray-950">User List</h2>
    <Table :headers="headers" :items="paginatedUsers">
      <template #actions="{ item }">
        <div class="flex gap-2">
          <button
            class="btn btn-md hover:bg-gray-900 hover:text-white dark:btn-outline"
            @click="openEditModal(item)"
          >
            Edit
          </button>
          <button
            class="btn btn-md hover:bg-gray-900 hover:text-white dark:btn-outline"
            @click="openDeleteModal(item)"
          >
            Delete
          </button>
        </div>
      </template>
    </Table>

    <Pagination
      v-model:currentPage="currentPage"
      v-model:itemsPerPage="itemsPerPage"
      :total-pages="totalPages"
      :total-items="totalItems"
      :max-visible-pages="5"
      :show-extras="false"
    />

    <Modal
      id="edit_modal"
      :is-open="isModalOpen"
      title="Edit User"
      @close="closeModal"
    >
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div class="form-control w-full">
          <label class="label mb-2">
            <span class="label-text text-base font-medium">Name</span>
          </label>
          <input
            type="text"
            v-model="editingUser.name"
            class="input input-bordered w-full"
            required
          />
        </div>

        <div class="form-control w-full">
          <label class="label mb-2">
            <span class="label-text text-base font-medium">Email</span>
          </label>
          <input
            type="email"
            v-model="editingUser.email"
            class="input input-bordered w-full"
            required
          />
        </div>

        <div class="form-control w-full">
          <label class="label mb-2">
            <span class="label-text text-base font-medium">Role</span>
          </label>
          <select
            v-model="editingUser.role"
            class="select select-bordered w-full"
            required
          >
            <option value="Admin">Admin</option>
            <option value="User">User</option>
          </select>
        </div>

        <div class="flex justify-end gap-2">
          <button
            type="submit"
            class="btn bg-gray-900 text-white dark:btn-outline dark:bg-transparent"
          >
            Save Changes
          </button>
          <button
            type="button"
            class="btn dark:btn-outline"
            @click="closeModal"
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>

    <Modal
      id="delete_modal"
      :is-open="isDeleteModalOpen"
      title="Confirm Delete"
      variant="danger"
      width="w-11/12 max-w-md"
      :center-actions="true"
      title-size="text-xl"
      @close="closeDeleteModal"
    >
      <p class="py-4 text-center">
        Are you sure you want to delete user
        <span class="font-bold">{{ userToDelete?.name }}</span
        >? This action cannot be undone.
      </p>
      <div class="flex justify-center gap-2">
        <button class="btn btn-error dark:text-white" @click="confirmDelete">
          Yes, Delete
        </button>
        <button class="btn dark:btn-outline" @click="closeDeleteModal">
          Cancel
        </button>
      </div>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import Modal from "~/components/ui/Modal/Modal.vue";
import Table from "~/components/ui/Table/Table.vue";
import Pagination from "~/components/ui/Pagination/Pagination.vue";
import { useModal } from "~/composable/useModal/useModal";

const headers = [
  { key: "avatar", label: "Avatar" },
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "role", label: "Role" },
];

const users = ref(
  Array.from({ length: 100 }, (_, index) => ({
    id: index + 1,
    name: `User ${index + 1}`,
    email: `user${index + 1}@example.com`,
    role: index % 5 === 0 ? "Admin" : "User",
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=User${index + 1}`,
  }))
);

const itemsPerPage = ref(10);
const currentPage = ref(1);
const totalItems = computed(() => users.value.length);

const totalPages = computed(() =>
  Math.ceil(totalItems.value / itemsPerPage.value)
);

const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return users.value.slice(start, end);
});

const {
  isModalOpen,
  isDeleteModalOpen,
  editingUser,
  userToDelete,
  openEditModal,
  closeModal,
  openDeleteModal,
  closeDeleteModal,
} = useModal();

const handleSubmit = () => {
  if (editingUser.value.id === null) return;

  const index = users.value.findIndex((u) => u.id === editingUser.value.id);
  if (index !== -1) {
    users.value[index] = { ...editingUser.value };
  }
  closeModal();
};

const confirmDelete = () => {
  if (!userToDelete.value) return;

  const index = users.value.findIndex((u) => u.id === userToDelete.value?.id);
  if (index !== -1) {
    users.value.splice(index, 1);
  }
  closeDeleteModal();
};
</script>
