<script setup lang="ts">
import Typography from "~/components/ui/Typography/Typography.vue";
import Contact from "~/components/ui/Contact/Contact.vue";

definePageMeta({
  middleware: "auth",
});

const contactInfo = {
  subjects: [
    "General Inquiry",
    "Technical Support",
    "Sales",
    "Partnership",
    "Career Opportunities",
    "Other",
  ],
  officeLocations: [
    {
      name: "ruanvalente",
      address: "Tv Angustura",
      phone: "+55 91 9999-9999",
      email: "contato.ruanvalente@gmail.com",
    },
  ],
  businessHours: {
    Monday: "9:00 AM - 6:00 PM",
    Tuesday: "9:00 AM - 6:00 PM",
    Wednesday: "9:00 AM - 6:00 PM",
    Thursday: "9:00 AM - 6:00 PM",
    Friday: "9:00 AM - 6:00 PM",
    Saturday: "Closed",
    Sunday: "Closed",
  },
  socialMedia: [
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/ruan-valente",
      icon: "pi pi-linkedin",
    },
    {
      name: "Twitter",
      url: "https://twitter.com/ruantux",
      icon: "pi pi-twitter",
    },
    {
      name: "GitHub",
      url: "https://github.com/ruanvalente",
      icon: "pi pi-github",
    },
  ],
};

const handleSubmit = (formData: any) => {
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
    <Contact :contact-info="contactInfo" @submit="handleSubmit" />
  </div>
</template>
