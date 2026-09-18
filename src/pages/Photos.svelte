<script lang="ts">
  const photoModules = import.meta.glob(
    '../assets/photos/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}',
    { eager: true, import: 'default' }
  );
  const photos = Object.values(photoModules) as string[];

  let selectedIndex = $state<number | null>(null);

  function openLightbox(index: number) {
    selectedIndex = index;
  }

  function closeLightbox() {
    selectedIndex = null;
  }

  function nextPhoto() {
    if (selectedIndex === null) return;
    selectedIndex = (selectedIndex + 1) % photos.length;
  }

  function prevPhoto() {
    if (selectedIndex === null) return;
    selectedIndex = (selectedIndex - 1 + photos.length) % photos.length;
  }

  function handleKeydown(e: KeyboardEvent) {
    if (selectedIndex === null) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") nextPhoto();
    if (e.key === "ArrowLeft") prevPhoto();
  }
</script>

<svelte:window onkeydown={handleKeydown} />

<div class="grid grid-cols-2 md:grid-cols-4 gap-2 p-4">
  {#each photos as src, i}
    <button onclick={() => openLightbox(i)} class="block">
      <img {src} loading="lazy" alt="Live show" class="w-full h-full object-cover" />
    </button>
  {/each}
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

    <img
      src={photos[selectedIndex]}
      alt="Enlarged live show"
      class="max-w-full max-h-full object-contain"
    />

    <button
      onclick={nextPhoto}
      aria-label="Next photo"
      class="absolute right-4 top-1/2 -translate-y-1/2 text-white text-4xl"
    >
      ›
    </button>
  </div>
{/if}