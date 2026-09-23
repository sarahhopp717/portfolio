<script lang="ts">
  type HobbyMedia =
    | { type: "image"; src: string }
    | { type: "video"; src: string }
    | { type: "youtube"; videoId: string }
    | { type: "channel-link"; url: string };

  interface HobbyCategory {
    label: string;
    caption: string;
    coverImage: string;
    media: HobbyMedia[];
  }

  const campingImages = Object.values(
    import.meta.glob('../assets/hobbies/campingTravel/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', { eager: true, import: "default" })
  ) as string[];
  const campingVideos = Object.values(
    import.meta.glob('../assets/hobbies/campingTravel/*.{mov,mp4,MOV,MP4}', { eager: true, import: "default" })
  ) as string[];
  const dogsImages = Object.values(
    import.meta.glob('../assets/hobbies/dogs/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', { eager: true, import: "default" })
  ) as string[];
  const kayakingImages = Object.values(
    import.meta.glob('../assets/hobbies/kayaking/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', { eager: true, import: "default" })
  ) as string[];
  const snowboardingImages = Object.values(
    import.meta.glob('../assets/hobbies/snowboarding/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', { eager: true, import: "default" })
  ) as string[];
   const drumsImages = Object.values(
    import.meta.glob('../assets/hobbies/drums/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', { eager: true, import: "default" })
  ) as string[];

  function toMedia(images: string[], videos: string[] = []): HobbyMedia[] {
    return [
      ...images.map((src) => ({ src, type: "image" as const })),
      ...videos.map((src) => ({ src, type: "video" as const })),
    ];
  }

  const drumsMedia: HobbyMedia[] = [
    ...drumsImages.map((src) => ({ src, type: "image" as const })),
    { type: "youtube" as const, videoId: "qsBidBCITbE" },
    { type: "youtube" as const, videoId: "5tZ-4Gf3o74" },
    { type: "channel-link" as const, url: "https://www.youtube.com/@sarahhopp225" },
  ];

  const hobbies: HobbyCategory[] = [
    { label: "Camping & Travel", caption: "Bonafide tree hugger.", coverImage: campingImages[5], media: toMedia(campingImages, campingVideos) },
    { label: "Dogs", caption: "Bijou and Dexter, my handome boys.", coverImage: dogsImages[0], media: toMedia(dogsImages) },
    { label: "Kayaking", caption: "My happy place.", coverImage: kayakingImages[0], media: toMedia(kayakingImages) },
    { label: "Snowboarding", caption: "Love to ride.", coverImage: snowboardingImages[1], media: toMedia(snowboardingImages) },
    { label: "Drums", caption: "Do or do not, there is no try.", coverImage: drumsImages[3], media: drumsMedia },
  ];

  let activeCategory = $state<number | null>(null);
  let selectedIndex = $state<number | null>(null);
  let videoEl = $state<HTMLVideoElement | undefined>();
  let currentMedia = $derived(
    activeCategory !== null && selectedIndex !== null
      ? hobbies[activeCategory].media[selectedIndex]
      : null
  );

  function openCategory(catIndex: number) {
    activeCategory = catIndex;
    selectedIndex = 0;
  }
  function closeLightbox() {
    activeCategory = null;
    selectedIndex = null;
  }
  function nextPhoto() {
    if (activeCategory === null || selectedIndex === null) return;
    selectedIndex = (selectedIndex + 1) % hobbies[activeCategory].media.length;
  }
  function prevPhoto() {
    if (activeCategory === null || selectedIndex === null) return;
    const len = hobbies[activeCategory].media.length;
    selectedIndex = (selectedIndex - 1 + len) % len;
  }
  function handleKeydown(e: KeyboardEvent) {
    if (activeCategory === null) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") nextPhoto();
    if (e.key === "ArrowLeft") prevPhoto();
    if (e.key === " ") {
      e.preventDefault();
      if (currentMedia?.type === "video" && videoEl) {
        videoEl.paused ? videoEl.play() : videoEl.pause();
      }
    }
  }
</script>

<svelte:window onkeydown={handleKeydown} />

<div class="min-h-screen bg-black text-white px-6 py-12 md:px-12">
  <div class="max-w-[800px] mx-auto">
    <!-- <p class="text-teal-400 text-sm font-bold tracking-widest mb-6 font-['Barlow_Condensed']">HOBBIES</p> -->
    <h1 class="text-teal-400 text-4xl md:text-6xl font-bold font-['Barlow_Condensed'] mb-10">
      OFF THE CLOCK
    </h1>

    <div class="flex flex-col gap-0.5">
      {#each hobbies as hobby, catIndex}
        <button onclick={() => openCategory(catIndex)} class="group relative overflow-hidden bg-neutral-900 text-left hover:opacity-70 cursor-pointer">
          <img src={hobby.coverImage} alt={hobby.label} class="w-full h-[220px] object-cover opacity-55 block" />
          <div class="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,8,8,0.85)_0%,transparent_60%)] px-10 flex flex-col justify-center">
            <div class="font-['Barlow_Condensed'] text-[42px] font-black uppercase text-[#f0ede8] leading-none">
              {hobby.label}
            </div>
            <div class="font-['Barlow_Condensed'] text-[20px] text-white/55 max-w-[360px] mt-2 leading-relaxed">
              {hobby.caption}
            </div>
            <span class="font-['Barlow_Condensed'] text-xs font-bold tracking-widest uppercase text-teal-400/70 group-hover:text-teal-400 mt-3 transition-colors">
              Click to view
            </span>
          </div>
        </button>
      {/each}
    </div>
  </div>
</div>

{#if currentMedia !== null}
  <div
    class="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-6"
    role="button" tabindex="0"
    onclick={(e) => { if (e.target === e.currentTarget) closeLightbox(); }}
    onkeydown={(e) => (e.key === "Enter" || e.key === " ") && closeLightbox()}
  >
    <button onclick={closeLightbox} aria-label="Close" class="absolute top-6 right-6 text-white text-4xl">×</button>
    <button onclick={prevPhoto} aria-label="Previous photo" class="absolute left-4 top-1/2 -translate-y-1/2 text-white text-4xl">‹</button>
    {#if currentMedia.type === "video"}
      <video src={currentMedia.src} controls bind:this={videoEl} class="max-w-full max-h-full"></video>
    {:else if currentMedia.type === "youtube"}
      <iframe
        src="https://www.youtube.com/embed/{currentMedia.videoId}"
        title="Drums video"
        class="w-[90vw] max-w-3xl aspect-video"
        allowfullscreen
      ></iframe>
    {:else if currentMedia.type === "channel-link"}
      <div class="flex flex-col items-center gap-6 text-center px-8">
        <p class="font-['Barlow_Condensed'] text-2xl md:text-3xl font-bold text-white uppercase">
          Go to my channel to see more videos
        </p>
        <a
          href={currentMedia.url}
          target="_blank"
          rel="noopener noreferrer"
          class="text-teal-400 text-lg underline hover:opacity-70 transition-opacity"
        >
          {currentMedia.url}
        </a>
      </div>
    {:else}
      <img
        src={currentMedia.src}
        alt="Enlarged"
        class="max-w-full max-h-full object-contain"
      />
    {/if}
    <button onclick={nextPhoto} aria-label="Next photo" class="absolute right-4 top-1/2 -translate-y-1/2 text-white text-4xl">›</button>
  </div>
{/if}
