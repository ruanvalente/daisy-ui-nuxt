<script setup lang="ts">
import Typography from "~/components/ui/Typography/Typography.vue";
import About from "~/components/ui/About/About.vue";

definePageMeta({
  middleware: "auth",
});

const aboutInfo = {
  name: "Ruan Valente",
  role: "Frontend Engineering",
  avatar:
    "https://avatars.githubusercontent.com/u/6674232?s=400&u=62eb573c8af66e882bbf633187e0f247714d30ec&v=4",
  description:
    "Sou desenvolvedor Frontend pleno com 5 anos de experiência no desenvolvimento de interfaces web modernas, escaláveis e de alta performance. Tenho expertise em frameworks como React, Next.js, Vue.js, Quasar e Angular, além do uso de testes automatizados, criação de Design Systems e acessibilidade na web.",
  hardSkills: [
    "JavaScript / Typescript",
    "React / Next.js ecossistema",
    "Vue.js / Nuxt.js / Quasar ecossistema",
    "Testes ( React Testing Library, Jest, vitest )",
    "Acessibilidade",
    "Design System",
    "CI / CD",
    "Git / Github / Gitlab",
    "Global State Management",
    "Tailwind CSS",
    "UI Components Libraries",
    "Bundlers (Webpack, Vite )",
  ],
  softSkills: [
    "Comunicação Eficaz",
    "Resolução de Problemas",
    "Trabalho em Equipe",
    "Adaptabilidade",
  ],
  highlights: [
    "5+ anos de experiência em desenvolvimento Frontend",
    "Especialista em frameworks modernos",
    "Foco em performance e escalabilidade",
    "Experiência com Design Systems",
    "Comprometido com acessibilidade web",
    "Colaboração eficiente em equipes",
  ],
  socialLinks: [
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/ruan-valente",
      icon: "pi pi-linkedin",
    },
    {
      name: "GitHub",
      url: "https://github.com/ruanvalente",
      icon: "pi pi-github",
    },
    {
      name: "Twitter",
      url: "https://twitter.com/ruantux",
      icon: "pi pi-twitter",
    },
  ],
  projectDescription: [
    "Este projeto é uma aplicação web moderna desenvolvida com Nuxt 3, TypeScript e DaisyUI, demonstrando boas práticas de desenvolvimento e padrões de projeto.",
    "O foco principal é criar uma interface intuitiva e responsiva, utilizando componentes reutilizáveis e mantendo um código limpo e bem organizado.",
    "A aplicação inclui recursos como autenticação, gerenciamento de usuários, perfis personalizados e um sistema completo de configurações.",
  ],
};
</script>

<template>
  <div class="lg:p-4">
    <Typography as="h2" class="text-2xl lg:text-4xl mb-6">About</Typography>
    <About :about="aboutInfo" />
  </div>
</template>
