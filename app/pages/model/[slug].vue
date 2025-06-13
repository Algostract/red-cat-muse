<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug!.toString()
const { data: model } = await useFetch(`/api/model/${slug}`)

if (!model.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

// grab live viewport dimensions
// const { width, height } = useWindowSize()
</script>

<template>
  <main v-if="model" class="relative h-screen w-screen">
    <NuxtImg
      :provider="getImgProvider(model.image)"
      :src="model.image"
      :modifiers="{
        setfill: '000000',
        crop: 'face/300px300p/-/crop/1:1/50p,45p',
      }"
      width="100vw"
      height="100vh"
      class="absolute inset-0 h-full w-full object-cover"
      alt="Model hero shot" />
    <CompositionOverlay />
  </main>
</template>
