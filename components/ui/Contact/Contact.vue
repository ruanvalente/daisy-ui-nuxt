<script setup lang="ts">
import BaseInput from "~/components/ui/BaseInput/BaseInput.vue";
import BaseSelect from "../BaseSelect/BaseSelect.vue";

interface OfficeLocation {
  name: string;
  address: string;
  phone: string;
  email: string;
}

interface SocialMedia {
  name: string;
  url: string;
  icon: string;
}

interface ContactInfo {
  subjects: string[];
  officeLocations: OfficeLocation[];
  businessHours: Record<string, string>;
  socialMedia: SocialMedia[];
}

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface Props {
  contactInfo: ContactInfo;
}

const { contactInfo } = defineProps<Props>();
const emit = defineEmits<{
  (e: "submit", data: FormData): void;
}>();

const formData = ref<FormData>({
  name: "",
  email: "",
  subject: "",
  message: "",
});

const handleSubmit = () => {
  emit("submit", formData.value);
  formData.value = {
    name: "",
    email: "",
    subject: "",
    message: "",
  };
};

const subjectOptions = contactInfo.subjects.map((subject) => ({
  value: subject,
  text: subject,
}));
</script>

<template>
  <div class="w-full">
    <div class="grid md:grid-cols-3 gap-6">
      <div class="md:col-span-2 space-y-6">
        <div class="bg-white shadow-md rounded-lg p-6">
          <h3 class="text-xl font-semibold mb-6 dark:text-gray-950">
            Send us a Message
          </h3>
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <div class="grid md:grid-cols-2 gap-4 w-full">
              <div class="form-control w-full">
                <BaseInput
                  label="Name"
                  v-model="formData.name"
                  type="text"
                  required
                />
              </div>

              <div class="form-control w-full">
                <BaseInput
                  label="E-mail"
                  v-model="formData.email"
                  type="email"
                  required
                />
              </div>
            </div>

            <div class="form-control w-full">
              <BaseSelect
                label="Subject"
                v-model="formData.subject"
                :options="subjectOptions"
                placeholder="Select a subject"
                required
              />
            </div>

            <div class="form-control w-full">
              <label class="label w-full my-2">
                <span class="label-text dark:text-gray-950">Message</span>
              </label>
              <textarea
                v-model="formData.message"
                class="textarea textarea-bordered h-32 w-full dark:bg-gray-100"
                required
              ></textarea>
            </div>

            <div class="flex justify-end">
              <button
                type="submit"
                class="btn btn-md hover:bg-gray-900 hover:text-white dark:bg-transparent dark:text-gray-950"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>

      <div class="space-y-6">
        <div class="bg-white shadow-md rounded-lg p-6">
          <h4 class="text-lg font-semibold mb-4 dark:text-gray-950">
            Contact Information
          </h4>
          <div class="space-y-4">
            <div
              v-for="(info, index) in contactInfo.officeLocations"
              :key="index"
              class="border-b last:border-b-0 pb-4 last:pb-0"
            >
              <h5 class="font-medium mb-2 dark:text-gray-950">
                {{ info.name }}
              </h5>
              <div class="space-y-2 text-gray-600">
                <p class="flex items-center gap-2">
                  <span class="i-heroicons-map-pin-20-solid"></span>
                  {{ info.address }}
                </p>
                <p class="flex items-center gap-2">
                  <span class="i-heroicons-phone-20-solid"></span>
                  {{ info.phone }}
                </p>
                <p class="flex items-center gap-2">
                  <span class="i-heroicons-envelope-20-solid"></span>
                  {{ info.email }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white shadow-md rounded-lg p-6">
          <h4 class="text-lg font-semibold mb-4 dark:text-gray-950">
            Business Hours
          </h4>
          <div class="space-y-2">
            <div
              v-for="(hours, day) in contactInfo.businessHours"
              :key="day"
              class="flex justify-between items-center text-gray-600"
            >
              <span>{{ day }}</span>
              <span>{{ hours }}</span>
            </div>
          </div>
        </div>

        <div class="bg-white shadow-md rounded-lg p-6 mb-8 lg:mb-0">
          <h4 class="text-lg font-semibold mb-4 dark:text-gray-950">
            Social Media
          </h4>
          <div class="flex gap-4">
            <a
              v-for="social in contactInfo.socialMedia"
              :key="social.name"
              :href="social.url"
              target="_blank"
              rel="noopener noreferrer"
              class="btn btn-circle btn-md hover:bg-gray-900 hover:text-white"
            >
              <span :class="social.icon"></span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
