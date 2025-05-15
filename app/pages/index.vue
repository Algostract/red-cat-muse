<script setup lang="ts">
const title = `Nuxt Template`
const description = `Nuxt Template Description`
const {
  public: { siteUrl },
} = useRuntimeConfig()
const imageUrl = `${siteUrl}/previews/landing.webp`

useSeoMeta({
  title: title,
  ogTitle: title,
  twitterTitle: title,
  description: description,
  ogDescription: description,
  twitterDescription: description,
  ogImage: imageUrl,
  twitterImage: imageUrl,
  ogUrl: siteUrl,
})

useSchemaOrg([
  defineBreadcrumb({
    itemListElement: [{ name: 'Home', item: '/' }],
  }),
])

const { user, session } = useUserSession()
</script>

<template>
  <main class="flex h-screen w-screen items-center justify-center">
    <AuthState>
      <template #default="{ loggedIn, clear }">
        <div v-if="loggedIn && user">
          <h1>Welcome {{ user.name }}!</h1>
          <p>Logged in since {{ new Date(session.loggedInAt) }}</p>
          <button @click="clear">Logout</button>
        </div>
        <div v-else>
          <h1>Not logged in</h1>
          <NuxtLink to="/auth/google" external>Login with Google</NuxtLink>
        </div>
      </template>
      <template #placeholder>
        <button disabled>Loading...</button>
      </template>
    </AuthState>
  </main>
</template>
