<script setup lang="ts">
import type { Model } from '~~/shared/types'

interface ExtendedModel extends Model {
  isFeatured: boolean
}

const props = withDefaults(defineProps<ExtendedModel>(), {
  image: '/images/model-1.jpg',
  isFeatured: false,
  isFavorite: false,
})

const isFavorite = ref(props.isFavorite)
</script>

<template>
  <NuxtLink :to="url" class="relative isolate grid aspect-[170/227] grid-cols-1 grid-rows-1">
    <div class="col-span-full col-start-1 row-span-full row-start-1 size-full overflow-clip rounded-md bg-light-500 dark:bg-dark-500">
      <NuxtImg v-if="image" :src="image" :alt="name" :width="340" :height="454" placeholder="/images/model-1.jpg" fit="cover" class="size-full object-cover" />
    </div>
    <div class="absolute bottom-2 left-2 z-10 flex items-center justify-center gap-1 rounded-full bg-light-500 fill-black p-1 pr-2 text-black">
      <NuxtIcon name="local:star" class="text-[16px]" />
      <span class="-ml-1 text-xs font-semi-bold">{{ rating }}</span>
      <span class="text-xs">|</span>
      <span class="text-xs">{{ reviewCount }}</span>
    </div>
    <button
      class="absolute bottom-2 right-2 aspect-square w-fit rounded-full bg-light-500 p-1 transition-colors ease-in-out"
      :class="isFavorite ? 'fill-primary-400' : 'fill-black'"
      @click="isFavorite = !isFavorite">
      <NuxtIcon name="local:love" class="text-[24px]" />
    </button>
  </NuxtLink>
</template>

<style lang="css">
:root {
  @apply fill-primary-400;
}
</style>
