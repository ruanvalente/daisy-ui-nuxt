<template>
  <footer
    class="footer footer-center p-4 bg-white text-base-content dark:text-gray-950"
  >
    <aside>
      <p>
        Copyright © {{ currentYear }} -
        <a
          href="https://github.com/ruanvalente"
          target="_blank"
          rel="noopener noreferrer"
          class="font-medium hover:text-gray-950 transition-colors"
        >
          Ruan Valente
        </a>
        - All rights reserved
      </p>
    </aside>
  </footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear();
</script>
