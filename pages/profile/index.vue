<script setup lang="ts">
import Typography from "~/components/ui/Typography/Typography.vue";
import Profile from "~/components/ui/Profile/Profile.vue";

definePageMeta({
  middleware: "auth",
});

const userData = {
  name: "John Doe",
  email: "john.doe@example.com",
  role: "Administrator",
  avatar: "https://i.pravatar.cc/150?img=3",
  joinDate: "2024-01-15",
  lastLogin: "2024-02-04",
  department: "Engineering",
  status: "Active",
};

const handleSave = (formData: any) => {
  console.log("Saving profile changes:", formData);
};
</script>

<template>
  <div class="lg:p-4">
    <Typography as="h2" class="text-2xl lg:text-4xl mb-6 dark:text-gray-950"
      >Profile</Typography
    >
    <Profile :user-data="userData" @save="handleSave" />
  </div>
</template>
