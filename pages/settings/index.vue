<script setup lang="ts">
import LazySettings from "~/components/ui/Settings/Settings.vue";
import Typography from "~/components/ui/Typography/Typography.vue";

definePageMeta({
  middleware: "auth",
});

type ProfileVisibilityType = "public" | "private" | "contacts";

const settings = ref({
  darkMode: false,
  compactMode: false,
  emailNotifications: true,
  pushNotifications: false,
  profileVisibility: "public" as ProfileVisibilityType,
  showActivityStatus: true,
  lastPasswordChange: "2024-01-15",
  twoFactorEnabled: false,
  storageUsed: "2.5 GB",
  storageTotal: "10 GB",
  storageUsedPercent: 25,
});

const handleSettingUpdate = (setting: string, value: unknown) => {
  settings.value = {
    ...settings.value,
    [setting]: value,
  };
  console.log(`Updated ${setting} to:`, value);
};

const handleSetup2FA = () => {
  console.log("Opening 2FA setup flow");
};
</script>

<template>
  <div class="lg:p-4">
    <Typography
      as="h2"
      class="mt-4 text-2xl lg:text-4xl mb-6 dark:text-gray-950"
      >Settings</Typography
    >
    <LazySettings
      :settings="settings"
      @update="handleSettingUpdate"
      @setup2fa="handleSetup2FA"
    />
  </div>
</template>
