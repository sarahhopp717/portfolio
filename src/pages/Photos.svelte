<script lang="ts">
  type PhotoMedia =
    | { type: "image"; src: string }
    | { type: "video"; src: string };

  const photoImages = Object.values(
    import.meta.glob('../assets/photos/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', { eager: true, import: 'default' })
  ) as string[];
  const photoVideos = Object.values(
    import.meta.glob('../assets/photos/*.{mov,mp4,MOV,MP4}', { eager: true, import: 'default' })
  ) as string[];

  const media: PhotoMedia[] = [
    ...photoVideos.map((src) => ({ src, type: "video" as const })),
    ...photoImages.map((src) => ({ src, type: "image" as const })),
  ];

  let selectedIndex = $state<number | null>(null);
  let videoEl = $state<HTMLVideoElement | undefined>();

  function openLightbox(index: number) {
    selectedIndex = index;
  }

  function closeLightbox() {
    selectedIndex = null;
  }

  function nextPhoto() {
    if (selectedIndex === null) return;
    selectedIndex = (selectedIndex + 1) % media.length;
  }

  function prevPhoto() {
    if (selectedIndex === null) return;
    selectedIndex = (selectedIndex - 1 + media.length) % media.length;
  }

  function handleKeydown(e: KeyboardEvent) {
    if (selectedIndex === null) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") nextPhoto();
    if (e.key === "ArrowLeft") prevPhoto();
    if (e.key === " ") {
      e.preventDefault();
      if (media[selectedIndex].type === "video" && videoEl) {
        videoEl.paused ? videoEl.play() : videoEl.pause();
      }
    }
  }
</script>

<svelte:window onkeydown={handleKeydown} />
<div class="min-h-screen bg-black text-white px-6 py-12 md:px-12">
<h1 class="text-teal-400 text-6xl font-bold font-['Barlow_Condensed'] mb-14">LIVE AT WORK</h1>

<div class="bg-black grid grid-cols-2 md:grid-cols-4 gap-2 p-4">
  {#each media as item, i}
    <button onclick={() => openLightbox(i)} class="relative block">
      {#if item.type === "video"}
        <video src={item.src} preload="metadata" muted playsinline class="w-full aspect-square object-cover hover:opacity-70"></video>
        <span class="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span class="font-['Inter'] text-xs font-bold tracking-widest uppercase text-white bg-black/50 px-3 py-1.5 rounded">
            ▶ Click to play
          </span>
        </span>
      {:else}
        <img src={item.src} loading="lazy" decoding="async" alt="Live show" class="w-full aspect-square object-cover hover:opacity-70" />
      {/if}
    </button>
  {/each}
</div>
</div>
{#if selectedIndex !== null}
  <div
    class="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-6"
    role="button"
    tabindex="0"
    onclick={(e) => { if (e.target === e.currentTarget) closeLightbox(); }}
    onkeydown={(e) => (e.key === "Enter" || e.key === " ") && closeLightbox()}
  >
    <button
      onclick={closeLightbox}
      aria-label="Close"
      class="absolute top-6 right-6 text-white text-4xl"
    >
      ×
    </button>

    <button
      onclick={prevPhoto}
      aria-label="Previous photo"
      class="absolute left-4 top-1/2 -translate-y-1/2 text-white text-4xl"
    >
      ‹
    </button>

    {#if media[selectedIndex].type === "video"}
      <video src={media[selectedIndex].src} controls bind:this={videoEl} class="max-w-full max-h-full"></video>
    {:else}
      <img
        src={media[selectedIndex].src}
        alt="Enlarged live show"
        class="max-w-full max-h-full object-contain"
      />
    {/if}

    <button
      onclick={nextPhoto}
      aria-label="Next photo"
      class="absolute right-4 top-1/2 -translate-y-1/2 text-white text-4xl"
    >
      ›
    </button>
  </div>
{/if}
