<template>
  <div class="w-full">
    <div class="grid md:grid-cols-3 gap-6">
      <div class="md:col-span-2 space-y-6">
        <div class="bg-white shadow-md rounded-lg p-6">
          <h3 class="text-xl font-semibold mb-4">Appearance</h3>
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <span class="font-medium">Dark Mode</span>
                <p class="text-sm text-gray-600">
                  Toggle between light and dark themes
                </p>
              </div>
              <input
                type="checkbox"
                class="toggle"
                :checked="settings.darkMode"
                @change="updateSetting('darkMode', $event.target.checked)"
              />
            </div>

            <div class="flex items-center justify-between">
              <div>
                <span class="font-medium">Compact Mode</span>
                <p class="text-sm text-gray-600">
                  Reduce spacing between elements
                </p>
              </div>
              <input
                type="checkbox"
                class="toggle"
                :checked="settings.compactMode"
                @change="updateSetting('compactMode', $event.target.checked)"
              />
            </div>
          </div>
        </div>

        <div class="bg-white shadow-md rounded-lg p-6">
          <h3 class="text-xl font-semibold mb-4">Notifications</h3>
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <span class="font-medium">Email Notifications</span>
                <p class="text-sm text-gray-600">
                  Receive updates and alerts via email
                </p>
              </div>
              <input
                type="checkbox"
                class="toggle"
                :checked="settings.emailNotifications"
                @change="
                  updateSetting('emailNotifications', $event.target.checked)
                "
              />
            </div>

            <div class="flex items-center justify-between">
              <div>
                <span class="font-medium">Push Notifications</span>
                <p class="text-sm text-gray-600">
                  Receive updates and alerts via browser
                </p>
              </div>
              <input
                type="checkbox"
                class="toggle"
                :checked="settings.pushNotifications"
                @change="
                  updateSetting('pushNotifications', $event.target.checked)
                "
              />
            </div>
          </div>
        </div>

        <div class="bg-white shadow-md rounded-lg p-6">
          <h3 class="text-xl font-semibold mb-4">Privacy</h3>
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <span class="font-medium">Profile Visibility</span>
                <p class="text-sm text-gray-600">
                  Control who can see your profile
                </p>
              </div>
              <select
                class="select select-bordered"
                :value="settings.profileVisibility"
                @change="
                  updateSetting('profileVisibility', $event.target.value)
                "
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
                <option value="contacts">Contacts Only</option>
              </select>
            </div>

            <div class="flex items-center justify-between">
              <div>
                <span class="font-medium">Activity Status</span>
                <p class="text-sm text-gray-600">Show when you're active</p>
              </div>
              <input
                type="checkbox"
                class="toggle"
                :checked="settings.showActivityStatus"
                @change="
                  updateSetting('showActivityStatus', $event.target.checked)
                "
              />
            </div>
          </div>
        </div>
      </div>

      <div class="space-y-6">
        <div class="bg-white shadow-md rounded-lg p-6">
          <h4 class="text-lg font-semibold mb-4">Account Security</h4>
          <div class="space-y-4">
            <div class="flex flex-col">
              <span class="text-gray-600">Last Password Change</span>
              <span class="font-medium">{{
                formatDate(settings.lastPasswordChange)
              }}</span>
            </div>
            <div class="flex flex-col">
              <span class="text-gray-600">Two-Factor Auth</span>
              <span
                :class="[
                  'badge',
                  settings.twoFactorEnabled
                    ? 'bg-gray-950 text-white'
                    : 'badge-warning',
                ]"
              >
                {{ settings.twoFactorEnabled ? "Enabled" : "Disabled" }}
              </span>
            </div>
            <button
              class="btn btn-md w-full hover:bg-gray-900 hover:text-white"
              @click="$emit('setup2fa')"
            >
              {{ settings.twoFactorEnabled ? "Manage 2FA" : "Setup 2FA" }}
            </button>
          </div>
        </div>

        <div class="bg-white shadow-md rounded-lg p-6">
          <h4 class="text-lg font-semibold mb-4">Data & Storage</h4>
          <div class="space-y-4">
            <div class="flex flex-col">
              <span class="text-gray-600">Storage Used</span>
              <div class="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                <div
                  class="bg-gray-950 h-2.5 rounded-full"
                  :style="{ width: `${settings.storageUsedPercent}%` }"
                ></div>
              </div>
              <span class="text-sm text-gray-600 mt-1">
                {{ settings.storageUsed }} of {{ settings.storageTotal }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Settings {
  darkMode: boolean;
  compactMode: boolean;
  emailNotifications: boolean;
  pushNotifications: boolean;
  profileVisibility: "public" | "private" | "contacts";
  showActivityStatus: boolean;
  lastPasswordChange: string;
  twoFactorEnabled: boolean;
  storageUsed: string;
  storageTotal: string;
  storageUsedPercent: number;
}

interface Props {
  settings: Settings;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: "update", setting: string, value: any): void;
  (e: "setup2fa"): void;
}>();

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const updateSetting = (setting: string, value: any) => {
  emit("update", setting, value);
};
</script>
