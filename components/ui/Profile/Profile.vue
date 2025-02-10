<script setup lang="ts">
import { useUser } from "@clerk/nuxt/composables";
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

const { user } = useUser();
const props = defineProps<Props>();
const emit = defineEmits<(e: "save", data: FormData) => void>();

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

<template>
  <div class="w-full dark:text-gray-950">
    <div class="grid gap-6 md:grid-cols-3">
      <div class="p-6 space-y-6 bg-white rounded-lg shadow-md md:col-span-2">
        <div class="flex items-center space-x-4">
          <div class="avatar">
            <div class="w-20 h-20 rounded-full">
              <NuxtImg
                  class="object-cover"
                  :alt="user?.fullName as string"
                  :src="user?.imageUrl ?? 'https://api.dicebear.com/7.x/avataaars/svg?seed=User1'"
              />
            </div>
          </div>
          <div>
            <h3 class="text-2xl font-semibold">{{ user?.fullName ?? 'Guest' }}</h3>
            <div class="px-4 mt-2 text-base text-white badge bg-gray-950">
              {{ userData.role }}
            </div>
          </div>
        </div>
        <div class="grid gap-4 pt-4 border-t md:grid-cols-2">
          <div
            v-for="(value, key) in {
              Email: user?.emailAddresses[0],
              Department: userData.department,
              'Join Date': user?.createdAt
                ? formatDate(user.createdAt.toString())
                : 'N/A',
              'Last Login': user?.lastSignInAt
                ? formatDate(user.lastSignInAt.toString())
                : 'N/A',
            }"
            :key="key"
            class="flex flex-col"
          >
            <span class="text-sm text-gray-600">{{ key }}</span>
            <span class="font-medium">{{ value }}</span>
          </div>
        </div>

        <div class="flex justify-end pt-4 border-t">
          <button
            class="btn btn-md hover:bg-gray-900 hover:text-white dark:btn-outline"
            @click="openEditModal"
          >
            Edit Profile
          </button>
        </div>
      </div>

      <div class="p-6 bg-white rounded-lg shadow-md h-fit">
        <h4 class="mb-4 text-lg font-semibold">Account Status</h4>
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-gray-600">Status</span>
            <span class="text-white badge bg-gray-950">{{
              userData.status
            }}</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-gray-600">2FA</span>
            <span class="badge badge-warning">Not Enabled</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-gray-600">Email Verified</span>
            <span class="text-white badge bg-gray-950">Yes</span>
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
        <div class="w-full form-control">
          <label class="label">
            <span class="label-text">Name</span>
          </label>
          <input
            v-model="formData.name"
            type="text"
            class="w-full input input-bordered"
            required
          />
        </div>

        <div class="w-full form-control">
          <label class="label">
            <span class="label-text">Email</span>
          </label>
          <input
            v-model="formData.email"
            type="email"
            class="w-full input input-bordered"
            required
          />
        </div>

        <div class="w-full form-control">
          <label class="label">
            <span class="label-text">Department</span>
          </label>
          <input
            v-model="formData.department"
            type="text"
            class="w-full input input-bordered"
            required
          />
        </div>

        <div class="w-full form-control">
          <label class="label">
            <span class="label-text">Avatar URL</span>
          </label>
          <input
            v-model="formData.avatar"
            type="url"
            class="w-full input input-bordered"
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
