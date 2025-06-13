<template>
  <section class="pointer-events-none absolute inset-0 z-10 flex items-center justify-center opacity-40">
    <div
      class="[grid-template-areas: 'background-top headroom background-top' 'background-side eye-shoulder lead-room' 'background-bottom collar-zone background-bottom' ] relative grid h-full w-full grid-cols-[1fr_clamp(300px,70%,1280px)_1fr] grid-rows-[15%_60%_25%]">
      <!-- Top Row -->
      <div class="area-background-top border border-dashed border-alert-500/60 bg-[#ffcccc]" />
      <div class="area-headroom border border-dashed border-alert-500/80 bg-[#ff9999]" />
      <div class="area-background-top border border-dashed border-alert-500/60 bg-[#ffcccc]" />

      <!-- Middle Row -->
      <div class="area-background-side border border-dashed border-alert-500/70 bg-[#ffdada]" />
      <div class="area-eye-shoulder border border-dashed border-alert-500 bg-[#ff4d4d]" />
      <div class="area-lead-room border border-dashed border-alert-500/70 bg-[#ffd1a4]" />

      <!-- Bottom Row -->
      <div class="area-background-bottom border border-dashed border-alert-500/60 bg-[#ffcccc]" />
      <div class="area-collar-zone border border-dashed border-alert-500/80 bg-[#ff9999]" />
      <div class="area-background-bottom border border-dashed border-alert-500/60 bg-[#ffcccc]" />

      <!-- Inner “Tight-Crop” Frame -->
      <div class="border-white-400 pointer-events-none absolute inset-[10%] border-2 border-solid" />
    </div>
  </section>
</template>
