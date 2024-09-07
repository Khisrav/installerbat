<script setup lang="ts">
// Track dropdown state
const dropdownOpen = ref(false);

// Icons for each theme mode
const icons = {
  system: "IconSystem",
  light: "IconLight",
  dark: "IconDark",
};

// Use Nuxt's color mode composable
const colorMode = useColorMode();

// Track the selected icon
const selectedIcon = ref(icons[colorMode.preference]);

// Toggle the dropdown visibility
const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value;
};

// Set the theme and update the selected icon
const setTheme = (theme) => {
  colorMode.preference = theme;
  selectedIcon.value = icons[theme];
  dropdownOpen.value = false;
};

// Watch for system changes and update the theme accordingly
watchEffect(() => {
  selectedIcon.value = icons[colorMode.preference];
});
</script>

<template>
  <div class="relative inline-block text-left">
    <button
      @click="toggleDropdown"
      class="flex items-center justify-center p-2 bg-gray-50 rounded-full dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
    >
      <IconSystem
        v-if="colorMode.preference === 'system'"
        class="w-5 h-5 text-gray-600 dark:text-gray-300"
      />
      <IconLight
        v-else-if="colorMode.preference === 'light'"
        class="w-5 h-5 text-gray-600 dark:text-gray-300"
      />
      <IconDark v-else class="w-5 h-5 text-gray-600 dark:text-gray-300" />
    </button>

    <div
      v-if="dropdownOpen"
      class="absolute right-0 mt-2 w-36 rounded-lg shadow-lg bg-white dark:bg-gray-800"
    >
      <div class="p-1" role="menu">
        <button
          @click="setTheme('system')"
          class="flex items-center rounded-md gap-x-4 px-4 py-2 w-full text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
        >
          <IconSystem class="w-4 h-4" />
          System
        </button>
        <button
          @click="setTheme('light')"
          class="flex items-center rounded-md gap-x-4 px-4 py-2 w-full text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
        >
          <IconLight class="w-4 h-4" />

          Light
        </button>
        <button
          @click="setTheme('dark')"
          class="flex items-center rounded-md gap-x-4 px-4 py-2 w-full text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
        >
          <IconDark class="w-4 h-4" />

          Dark
        </button>
      </div>
    </div>
  </div>
</template>
