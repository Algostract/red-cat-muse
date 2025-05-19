<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug!.toString()
const { data: model } = await useFetch(`/api/model/${slug}`)
</script>

<template>
  <main v-if="model" class="flex h-screen w-screen items-center justify-center">
    <NuxtImg :src="model.image" :alt="model.name" :width="1280" :height="Math.round(1280 / (9 / 16))" fit="cover" class="absolute inset-0 h-screen w-screen object-cover object-[50%_25%]" />
  </main>
</template>
