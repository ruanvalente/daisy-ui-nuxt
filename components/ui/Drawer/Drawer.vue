<!-- <script setup>
import { userDrawer } from "~/composable/useDrawer/userDrawer";
const drawerOpen = userDrawer();
</script>

<template>
  <Transition name="slide">
    <div class="">
      <div class="drawer lg:drawer-open" v-if="drawerOpen">
        <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
        <div class="drawer-side">
          <label
            for="my-drawer-2"
            aria-label="close sidebar"
            class="drawer-overlay"
          ></label>
          <ul class="menu bg-base-100 text-base-content min-h-full w-80 p-4">
            <li><a>Sidebar Item 1</a></li>
            <li><a>Sidebar Item 2</a></li>
          </ul>
        </div>
      </div>
      <slot />
    </div>
  </Transition>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.2s ease-in-out;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}
</style> -->

<script setup>
import { useDrawer } from "~/composable/useDrawer/useDrawer";
import { DRAWER_CONFIG } from "~/constants/Drawer/Drawer";

const drawerOpen = useDrawer();
</script>

<template>
  <div class="flex">
    <div
      class="relative inset-0 z-10"
      :class="{ 'drawer-open': drawerOpen, 'drawer-close': !drawerOpen }"
    >
      <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
      <div class="drawer-side">
        <label
          for="my-drawer-2"
          aria-label="close sidebar"
          class="drawer-overlay"
          @click="drawerOpen = false"
        ></label>
        <ul class="menu bg-base-100 text-base-content min-h-full w-80 p-4">
          <li class="py-2" v-for="item in DRAWER_CONFIG" :key="item.name">
            <NuxtLink :href="item.to">
              <i :class="item.icon" style="color: black"></i>
              <span class="text-base font-normal">{{ item.name }}</span>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>

    <div
      class="flex-1 px-8 transition-all duration-500"
      :class="{ 'pl-8': !drawerOpen }"
    >
      <slot />
    </div>
  </div>
</template>

<style scoped>
.drawer-open {
  transform: translateX(0);
  transition: transform 0.5s forwards;
}

.drawer-close {
  transform: translateX(-100%);
  transition: transform 1.5s forwards;
}
</style>
