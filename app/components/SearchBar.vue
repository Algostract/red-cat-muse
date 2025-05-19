<script setup lang="ts">
const model = defineModel<SearchParams>()

defineProps<{
  placeholder?: string
}>()

const query = ref('')

const onSearch = useDebounceFn(() => {
  model.value = {
    query: query.value.trim(),
    queryBy: 'name',
    filterBy: '', // e.g. "isFeatured:=true"
    sortBy: 'rating:desc',
    perPage: 10,
  }
}, 300)
</script>

<template>
  <div class="flex h-min max-w-2xl items-center rounded-full bg-light-500 p-1 pl-4 dark:bg-dark-500">
    <input
      v-model="query"
      type="text"
      :placeholder="placeholder"
      class="text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 flex-1 bg-transparent focus:outline-none"
      @keyup="onSearch" />
    <button type="button" class="hover:bg-gray-200 dark:hover:bg-gray-700 ml-2 rounded-full p-1 transition" aria-label="Search" @click="onSearch">
      <NuxtIcon name="local:search" class="fill-white text-[32px]" />
    </button>
  </div>
</template>
