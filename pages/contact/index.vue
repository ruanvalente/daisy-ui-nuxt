<script setup lang="ts">
import LazyContact from "~/components/ui/Contact/Contact.vue";
import Typography from "~/components/ui/Typography/Typography.vue";
import { CONTACT_INFO } from "~/constants/ContactInfo/contactInfo";

definePageMeta({
  middleware: "auth",
});

const handleSubmit = (formData: unknown) => {
  console.log("Form submitted:", formData);
};
</script>

<template>
  <div class="lg:p-4">
    <Typography
      as="h2"
      class="text-2xl lg:text-4xl mb-6 dark:text-gray-950 mt-4"
      >Contact Us</Typography
    >
    <LazyContact :contact-info="CONTACT_INFO" @submit="handleSubmit" />
  </div>
</template>
