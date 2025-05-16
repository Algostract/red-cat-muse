<script setup lang="ts">
const config = useRuntimeConfig()

const { data } = await useFetch('/api/model')

const viewMode = ref('list')
const style = `https://api.maptiler.com/maps/streets-v2/style.json?key=${config.public.mapApiKey}`
const center: [number, number] = [88.4306945, 22.409649]
const zoom = 16
</script>

<template>
  <main v-if="viewMode === 'list'" class="grid grid-cols-6">
    <section class="hidden md:col-start-1 md:block">NavBar</section>
    <section class="col-span-full col-start-1 mx-auto grid w-fit grid-cols-2 items-center justify-items-center gap-2 p-2 md:col-start-2 md:grid-cols-4 md:gap-8">
      <CardModel
        v-for="{ id, name, image, rating, reviewCount, coordinate, isFeatured, isFavorite } in data"
        :id="id"
        :key="id"
        :name="name"
        :image="image"
        :rating="rating"
        :review-count="reviewCount"
        :coordinate="coordinate"
        :is-featured="isFeatured"
        :is-favorite="isFavorite" />
    </section>
  </main>
  <main v-else class="h-screen w-screen">
    <ClientOnly>
      <MglMap :map-style="style" :center="center" :zoom="zoom">
        <!-- <MglNavigationControl /> -->
        <!-- <MglFullscreenControl /> -->
        <!-- <MglScaleControl /> -->
        <MglGeolocateControl />
        <MglMarker v-for="{ id, image, name, coordinate } in data" :key="id" :coordinates="[coordinate.lat, coordinate.lng]">
          <template #marker>
            <MarkerModel :id="id" :image="image" :name="name" />
          </template>
        </MglMarker>
      </MglMap>
    </ClientOnly>
  </main>
</template>
