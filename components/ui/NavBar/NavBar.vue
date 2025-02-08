<script setup lang="ts">
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";

import { useDrawer } from "~/composable/useDrawer/useDrawer";
import { useLogin } from "~/composable/useLogin/useLogin";

const drawerOpen = useDrawer();
const target = ref(null);
const { handleSignOut } = useLogin();

onClickOutside(target, () => {
  drawerOpen.value = false;
});
</script>

<template>
  <div class="navbar bg-base-100 shadow" ref="target">
    <div class="flex-1">
      <div
        tabindex="0"
        role="button"
        class="btn btn-ghost btn-circle"
        @click="drawerOpen = !drawerOpen"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
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
      <NuxtLink to="/" class="btn btn-ghost text-xl">Logo</NuxtLink>
    </div>
    <div class="flex gap-8">
      <div class="form-control">
        <input
          type="text"
          placeholder="Search"
          class="input input-bordered w-24 md:w-auto"
        />
      </div>
      <div class="dropdown dropdown-end">
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">
            <img
              alt="User Avatar"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            />
          </div>
        </div>
        <ul
          tabindex="0"
          class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
        >
          <li>
            <NuxtLink to="/profile" class="justify-between">
              Profile
              <span class="badge">New</span>
            </NuxtLink>
          </li>
          <li><NuxtLink to="/settings">Settings</NuxtLink></li>
          <li><button @click="handleSignOut">Logout</button></li>
        </ul>
      </div>
    </div>
  </div>
</template>
