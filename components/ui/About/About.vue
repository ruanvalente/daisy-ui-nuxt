<template>
  <div class="w-full">
    <div class="grid md:grid-cols-3 gap-6">
      <div class="md:col-span-2 space-y-6">
        <div class="bg-white shadow-md rounded-lg p-6">
          <div class="flex flex-col md:flex-row gap-6 items-start">
            <div class="avatar">
              <div class="w-32 h-32 rounded-lg">
                <img
                  :src="about.avatar"
                  :alt="about.name"
                  class="object-cover"
                />
              </div>
            </div>
            <div class="space-y-4">
              <h3 class="text-2xl font-semibold dark:text-gray-950">
                {{ about.name }}
              </h3>
              <div class="badge bg-gray-950 text-white text-base px-4">
                {{ about.role }}
              </div>
              <p class="text-gray-600 leading-relaxed">
                {{ about.description }}
              </p>
            </div>
          </div>
        </div>

        <div class="bg-white shadow-md rounded-lg p-6 my-4">
          <h4 class="text-xl font-semibold mb-6 dark:text-gray-950">
            Hard Skills
          </h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              v-for="(skill, index) in about.hardSkills"
              :key="index"
              class="flex items-center gap-3 p-4 rounded-lg border hover:bg-gray-50 cursor-pointer transition-all group"
            >
              <span
                class="pi pi-check text-gray-950 group-hover:text-gray-900"
              ></span>
              <span
                class="text-gray-700 group-hover:text-gray-900 text-sm md:text-base"
                >{{ skill }}</span
              >
            </div>
          </div>
        </div>

        <div class="bg-white shadow-md rounded-lg p-6">
          <h4 class="text-xl font-semibold mb-6 dark:text-gray-950">
            Soft Skills
          </h4>
          <div class="space-y-4">
            <div
              v-for="(skill, index) in about.softSkills"
              :key="index"
              class="flex items-center gap-3 p-4 rounded-lg border hover:bg-gray-50 cursor-pointer transition-all group"
            >
              <span
                class="pi pi-heart text-gray-950 group-hover:text-gray-900"
              ></span>
              <span class="text-gray-700 group-hover:text-gray-900">{{
                skill
              }}</span>
            </div>
          </div>
        </div>

        <div class="md:hidden bg-white shadow-md rounded-lg p-6">
          <h4 class="text-lg font-semibold mb-4 dark:text-gray-950">
            Experience Highlights
          </h4>
          <div class="space-y-4">
            <div
              v-for="(highlight, index) in about.highlights"
              :key="index"
              class="flex items-start gap-2"
            >
              <span class="pi pi-check-circle text-gray-950 mt-1"></span>
              <span class="text-gray-600">{{ highlight }}</span>
            </div>
          </div>
        </div>

        <div class="bg-white shadow-md rounded-lg p-6">
          <h4 class="text-xl font-semibold mb-4 dark:text-gray-950">
            About the Project
          </h4>
          <div class="space-y-4">
            <p
              v-for="(paragraph, index) in about.projectDescription"
              :key="index"
              class="text-gray-600 leading-relaxed"
            >
              {{ paragraph }}
            </p>
          </div>
        </div>
      </div>

      <div class="space-y-6">
        <div class="hidden md:block bg-white shadow-md rounded-lg p-6">
          <h4 class="text-lg font-semibold mb-4 dark:text-gray-950">
            Experience Highlights
          </h4>
          <div class="space-y-4">
            <div
              v-for="(highlight, index) in about.highlights"
              :key="index"
              class="flex items-start gap-2"
            >
              <span class="pi pi-check-circle text-gray-950 mt-1"></span>
              <span class="text-gray-600">{{ highlight }}</span>
            </div>
          </div>
        </div>

        <div class="bg-white shadow-md rounded-lg p-6 mb-8 lg:mb-0">
          <h4 class="text-lg font-semibold mb-4 dark:text-gray-950">Connect</h4>
          <div class="flex gap-4">
            <a
              v-for="social in about.socialLinks"
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

<script setup lang="ts">
interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

interface About {
  name: string;
  role: string;
  avatar: string;
  description: string;
  hardSkills: string[];
  softSkills: string[];
  highlights: string[];
  socialLinks: SocialLink[];
  projectDescription: string[];
}

interface Props {
  about: About;
}

defineProps<Props>();
</script>
