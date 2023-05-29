<template>
  <div v-for="i in 6" :key="i" class="p-4 sm:w-1/2 lg:w-1/3 w-full animate-pulse">
    <div class="flex flex-col items-center justify-between p-4 rounded-lg shadow-lg">
      <div class="bg-gray-300 w-32 h-32 rounded-full overflow-hidden flex justify-center items-center">
      </div>
      <div class="flex flex-col items-center gap-1.5 mt-2">
        <div class="w-36 h-5 bg-gray-300 rounded-md" />
        <div class="w-32 h-5 bg-gray-300 rounded-md" />
        <div class="w-32 h-9 block text-sm mt-3.5 px-4 py-2 bg-gray-300 text-white rounded-lg" />
      </div>
    </div>
  </div>
</template>