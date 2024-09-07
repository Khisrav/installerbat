<script setup lang="ts">
const { data: programs } = await useFetch("/api/programs");
const selectedPrograms = reactive([]);
const isLoading = ref(false);

const toggleProgram = (programID: number) => {
  const index = selectedPrograms.indexOf(programID);
  if (index > -1) {
    selectedPrograms.splice(index, 1);
  } else {
    selectedPrograms.push(programID);
  }
};

const generateInstaller = async (selectedPrograms) => {
  isLoading.value = true;
  let commandsContainer = ``;

  // Generate PowerShell commands for each selected program
  for (const programID of selectedPrograms) {
    const program = programs.value[programID - 1];
    if (program) {
      commandsContainer += await generatePowershellCommand(program.name, program.link);
      commandsContainer += `\n\n`;
    }
  }

  // Simulate a processing delay
  await new Promise((resolve) => setTimeout(resolve, 500)); // Wait for 500ms

  // Create Blob and trigger download
  const blob = new Blob([commandsContainer], { type: "application/octet-stream" });

  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "InstallerBat.ps1";
  link.click();
  URL.revokeObjectURL(link.href);

  isLoading.value = false;
};
</script>

<template>
  <div>
    <h1 class="font-bold text-2xl text-center my-4 md:text-3xl">
      Install any apps at once
    </h1>
    <p class="mb-2">
      Choose the essential software you need, and we'll generate a custom installer for
      you. No more individual downloads — streamline your setup with just one click.
    </p>
    <p class="mb-2">
      Get everything ready in minutes and boost your productivity instantly.
    </p>
    <p class="mb-4">
      All installations are handled locally using secure PowerShell commands, ensuring
      your privacy with no server-side processing.
    </p>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <label
        v-for="program in programs"
        :key="program.id"
        class="block cursor-pointer p-4 font-medium rounded-md shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 dark:bg-gray-900 bg-white dark:hover:bg-gray-800 hover:bg-gray-50"
        :class="{
          'ring-gray-500 dark:ring-gray-100': selectedPrograms.includes(program.id),
        }"
      >
        <UCheckbox
          :model-value="selectedPrograms.includes(program.id)"
          @change="toggleProgram(program.id)"
          :label="program.name"
          color="primary"
          class="pointer-events-none"
        />
      </label>
    </div>

    <div class="text-center">
      <UButton
        color="black"
        variant="solid"
        size="lg"
        class="mt-4"
        :loading="isLoading"
        :disabled="selectedPrograms.length === 0"
        @click="generateInstaller(selectedPrograms)"
      >
        Generate installer
      </UButton>
    </div>
  </div>
</template>
