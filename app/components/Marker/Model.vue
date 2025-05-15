<script setup lang="ts">
withDefaults(
  defineProps<{
    id: string
    image?: string
    name: string
  }>(),
  {
    image: '/images/model-1.jpg',
  }
)
</script>

<template>
  <div class="size-16 rounded-full rounded-bl-none bg-light-400 p-1.5">
    <NuxtImg :src="image" :alt="name" width="52" height="52" placeholder="/images/model-1.jpg" fit="cover" class="size-full rounded-full object-cover object-top" />
  </div>
</template>
