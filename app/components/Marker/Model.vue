<script setup lang="ts">
import type { Model } from '~~/shared/types'

withDefaults(defineProps<Pick<Model, 'id' | 'image' | 'name' | 'url'>>(), {
  image: '/images/model-1.jpg',
})
</script>

<template>
  <NuxtLink :to="url" class="block size-16 rounded-full rounded-bl-none bg-light-400 p-1.5">
    <NuxtImg
      :src="image"
      :alt="name"
      width="64"
      height="64"
      loading="eager"
      :modifiers="{ crop: 'face/1:1/50p,30p' }"
      placeholder="/images/model-1.jpg"
      fit="cover"
      class="size-full rounded-full object-cover object-top" />
  </NuxtLink>
</template>
