export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const theme = getQuery(event).theme

  const styleUrl =
    theme === 'dark' ? `https://api.maptiler.com/maps/darkmatter/style.json?key=${config.private.mapApiKey}` : `https://api.maptiler.com/maps/streets-v2/style.json?key=${config.private.mapApiKey}`

  const result = await $fetch(styleUrl)
  return result
})
