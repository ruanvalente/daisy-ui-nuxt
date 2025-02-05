<template>
  <div class="w-full">
    <div class="grid md:grid-cols-3 gap-6">
      <div class="md:col-span-2 bg-white shadow-md rounded-lg p-6 space-y-6">
        <div class="flex items-center space-x-4">
          <div class="avatar">
            <div class="w-20 h-20 rounded-full">
              <img
                :src="userData.avatar"
                :alt="userData.name"
                class="object-cover"
              />
            </div>
          </div>
          <div>
            <h3 class="text-2xl font-semibold">{{ userData.name }}</h3>
            <div class="badge bg-gray-950 text-white text-base px-4 mt-2">
              {{ userData.role }}
            </div>
          </div>
        </div>

        <div class="grid md:grid-cols-2 gap-4 pt-4 border-t">
          <div
            v-for="(value, key) in {
              Email: userData.email,
              Department: userData.department,
              'Join Date': formatDate(userData.joinDate),
              'Last Login': formatDate(userData.lastLogin),
            }"
            :key="key"
            class="flex flex-col"
          >
            <span class="text-gray-600 text-sm">{{ key }}</span>
            <span class="font-medium">{{ value }}</span>
          </div>
        </div>

        <div class="flex justify-end pt-4 border-t">
          <button
            class="btn btn-md hover:bg-gray-900 hover:text-white"
            @click="openEditModal"
          >
            Edit Profile
          </button>
        </div>
      </div>

      <div class="bg-white shadow-md rounded-lg p-6 h-fit">
        <h4 class="text-lg font-semibold mb-4">Account Status</h4>
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-gray-600">Status</span>
            <span class="badge bg-gray-950 text-white">{{
              userData.status
            }}</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-gray-600">2FA</span>
            <span class="badge badge-warning">Not Enabled</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-gray-600">Email Verified</span>
            <span class="badge bg-gray-950 text-white">Yes</span>
          </div>
        </div>
      </div>
    </div>

    <Modal
      id="edit_profile_modal"
      :is-open="isModalOpen"
      title="Edit Profile"
      @close="closeModal"
    >
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div class="form-control w-full">
          <label class="label">
            <span class="label-text">Name</span>
          </label>
          <input
            v-model="formData.name"
            type="text"
            class="input input-bordered w-full"
            required
          />
        </div>

        <div class="form-control w-full">
          <label class="label">
            <span class="label-text">Email</span>
          </label>
          <input
            v-model="formData.email"
            type="email"
            class="input input-bordered w-full"
            required
          />
        </div>

        <div class="form-control w-full">
          <label class="label">
            <span class="label-text">Department</span>
          </label>
          <input
            v-model="formData.department"
            type="text"
            class="input input-bordered w-full"
            required
          />
        </div>

        <div class="form-control w-full">
          <label class="label">
            <span class="label-text">Avatar URL</span>
          </label>
          <input
            v-model="formData.avatar"
            type="url"
            class="input input-bordered w-full"
            required
          />
        </div>

        <div class="modal-action">
          <button type="button" class="btn btn-ghost" @click="closeModal">
            Cancel
          </button>
          <button
            type="submit"
            class="btn btn-md hover:bg-gray-900 hover:text-white"
          >
            Save Changes
          </button>
        </div>
      </form>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import Modal from "~/components/ui/Modal/Modal.vue";

interface UserData {
  name: string;
  email: string;
  role: string;
  avatar: string;
  joinDate: string;
  lastLogin: string;
  department: string;
  status: string;
}

interface FormData {
  name: string;
  email: string;
  department: string;
  avatar: string;
}

interface Props {
  userData: UserData;
  onSave?: (data: FormData) => void;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: "save", data: FormData): void;
}>();

const isModalOpen = ref(false);
const formData = ref<FormData>({
  name: "",
  email: "",
  department: "",
  avatar: "",
});

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const openEditModal = () => {
  formData.value = {
    name: props.userData.name,
    email: props.userData.email,
    department: props.userData.department,
    avatar: props.userData.avatar,
  };
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const handleSubmit = () => {
  emit("save", formData.value);
  closeModal();
};
</script>
