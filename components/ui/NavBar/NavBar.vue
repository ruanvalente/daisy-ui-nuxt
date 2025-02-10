<script setup lang="ts">
import { useAuth, useUser } from "@clerk/nuxt/composables";
import { onClickOutside } from "@vueuse/core";
import { ref } from "vue";
import LazyImageFallback from "~/components/ui/ImageFallback/ImageFallback.vue";
import { useDrawer } from "~/composable/useDrawer/useDrawer";

const drawerOpen = useDrawer();
const target = ref(null);
const { signOut } = useAuth();
const { user } = useUser();

onClickOutside(target, () => {
	drawerOpen.value = false;
});
</script>

<template>
  <div class="shadow navbar bg-base-100" ref="target">
    <div class="flex-1">
      <div
        tabindex="0"
        role="button"
        class="btn btn-ghost btn-circle"
        @click="drawerOpen = !drawerOpen"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h7"
          />
        </svg>
      </div>
      <NuxtLink to="/" class="text-xl btn btn-ghost" aria-label="Go to Home"
        >Logo</NuxtLink
      >
    </div>
    <div class="flex gap-8">
      <div class="form-control">
        <input
          type="text"
          placeholder="Search"
          class="w-24 input input-bordered md:w-auto"
        />
      </div>
      <div class="dropdown dropdown-end">
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">
            <LazyImageFallback v-if="!user?.imageUrl" />
            <NuxtImg :src="user?.imageUrl" :alt="user?.fullName as string" :aria-label="user?.fullName" />
          </div>
        </div>
        <ul
          tabindex="0"
          class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
        >
          <li>
            <NuxtLink
              to="/profile"
              class="justify-between"
              aria-label="Go to Profile"
            >
              Profile
              <span class="badge">New</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/settings" aria-label="Go to Settings"
              >Settings</NuxtLink
            >
          </li>
          <li>
            <button
              @click="
                signOut({
                  redirectUrl: '/login',
                })
              "
              aria-label="Logout"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
