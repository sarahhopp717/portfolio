<script lang="ts">
  import { flyers } from "../data/flyers";
  import { searchableActs } from "../data/searchableActs";
  import { flyerStore } from "../stores/flyerStore.svelte";
  import { headlinerLogos } from "../data/headlinerLogos";

  let searchTerm = $state("");
  let searchMessage = $state("");

  function nextFlyer() {
    flyerStore.currentIndex = (flyerStore.currentIndex + 1) % flyers.length;
  }

  function prevFlyer() {
    flyerStore.currentIndex = (flyerStore.currentIndex - 1 + flyers.length) % flyers.length;
  }

  function handleSearch() {
    const term = searchTerm.trim().toLowerCase();
    if (!term) {
      searchMessage = "Enter an artist name first";
      return;
    }
    const match = searchableActs.find((act) => act.name.toLowerCase().includes(term));
    if (match) {
      flyerStore.currentIndex = match.flyerIndex;
      searchMessage = `Found in ${flyers[match.flyerIndex].genre}`;
    } else {
      searchMessage = "Not yet!";
    }
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === "ArrowRight") nextFlyer();
    if (e.key === "ArrowLeft") prevFlyer();
  }

  function patternStyle(pattern: string): string {
    if (pattern === "grid") {
      return "background-image: linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px); background-size: 48px 48px;";
    }
    if (pattern === "diagonal") {
      return "background-image: repeating-linear-gradient(45deg, rgba(255,255,255,0.4) 0, rgba(255,255,255,0.4) 1px, transparent 0, transparent 50%); background-size: 32px 32px;";
    }
    if (pattern === "dots") {
      return "background-image: radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px); background-size: 28px 28px;";
    }
    return "";
  }

  function tier(i: number): 0 | 1 | 2 {
    return i < 2 ? 0 : i < 5 ? 1 : 2;
  }

  const tierSizeClass = [
    "text-4xl md:text-6xl",
    "text-2xl md:text-4xl",
    "text-lg md:text-2xl",
  ];
  const tierWeightClass = ["font-black", "font-extrabold", "font-bold"];
  const tierOpacity = ["", "opacity-90", "opacity-75"];

  let flyer = $derived(flyers[flyerStore.currentIndex]);

  const cornerTransforms = [
    "", // top-left
    "scale-x-[-1]", // top-right
    "scale-y-[-1]", // bottom-left
    "scale-x-[-1] scale-y-[-1]", // bottom-right
  ];
  const cornerPosition = [
    "top-24 md:top-0 left-4 md:left-0",
    "top-24 md:top-0 right-4 md:right-0",
    "bottom-4 md:bottom-0 left-4 md:left-0",
    "bottom-4 md:bottom-0 right-4 md:right-0",
  ];
</script>

<svelte:window onkeydown={handleKeydown} />

<div
  class="relative min-h-screen overflow-hidden text-center transition-colors duration-700"
  style="background: {flyer.background};"
>
  {#if flyer.backgroundImage}
    <img src={flyer.backgroundImage} alt="" class="absolute inset-0 w-full h-full object-cover" />
    <div class="absolute inset-0 bg-black/60"></div>
  {/if}

  {#if flyer.pattern !== "none"}
    <div class="absolute inset-0 opacity-[0.06] pointer-events-none" style={patternStyle(flyer.pattern)}></div>
  {/if}

  {#if flyer.ornament}
    {#each cornerPosition as pos, i}
      <svg
        class="absolute {pos} {cornerTransforms[i]} w-30 h-30 z-30 pointer-events-none"
        viewBox="0 0 40 40"
        fill="none"
      >
        {#if flyer.ornament === "gothic"}
          <path d="M2 38 L2 10 Q2 2 10 2 L38 2" stroke={flyer.accent} stroke-width="1.5" />
          <path d="M2 20 Q10 20 10 12" stroke={flyer.accent} stroke-width="1.5" />
          <circle cx="10" cy="10" r="2" fill={flyer.accent} />
        {:else if flyer.ornament === "geometric"}
          <path d="M2 38 L2 6 L6 2 L38 2" stroke={flyer.accent} stroke-width="1.5" />
          <path d="M2 14 L9 14 L9 6" stroke={flyer.accent} stroke-width="1.5" />
        {:else if flyer.ornament === "deco"}
          <path d="M2 38 L2 4 L38 4" stroke={flyer.accent} stroke-width="1" />
          <path d="M7 38 L7 9 L38 9" stroke={flyer.accent} stroke-width="1" />
          <rect x="0.5" y="0.5" width="5" height="5" transform="rotate(45 3 3)" fill={flyer.accent} />
        {:else if flyer.ornament === "floral"}
          <path d="M2 38 C2 20 2 10 14 6" stroke={flyer.accent} stroke-width="1.5" fill="none" />
          <path d="M8 14 C12 12 14 8 12 4" stroke={flyer.accent} stroke-width="1.2" fill="none" />
          <circle cx="14" cy="6" r="1.5" fill={flyer.accent} />
        {:else if flyer.ornament === "western"}
          <path d="M2 38 L2 2 L38 2" stroke={flyer.accent} stroke-width="2" />
          <rect x="0" y="0" width="4" height="4" fill={flyer.accent} />
        {/if}
      </svg>
    {/each}
  {/if}

  <div class="absolute top-6 left-1/2 -translate-x-1/2 w-full max-w-md z-20 px-6">
    <div class="flex gap-2">
      <input
        type="text"
        bind:value={searchTerm}
        placeholder="Have I worked for this artist?"
        class="flex-1 px-3 py-2 rounded bg-black/40 border border-white/20 text-white/55 placeholder-white/55 font-semibold"
        onkeydown={(e) => e.key === "Enter" && handleSearch()}
      />
      <button onclick={handleSearch} class="px-4 py-2 bg-black/40 border border-white/20 rounded text-white/55 font-semibold">
        Search
      </button>
    </div>
    {#if searchMessage}
      <p class="text-sm text-white/55 font-semibold mt-2">{searchMessage}</p>
    {/if}
  </div>

  <div class="relative z-10 flex flex-col items-center justify-center min-h-screen px-8 py-24">
    <div class="w-full max-w-lg h-px mb-6" style="background: {flyer.accent}55;"></div>

    <p class="text-[10px] tracking-[0.3em] uppercase mb-5" style="color: {flyer.textColor}88;">
      Sarah Hopp · Audio Engineer · FOH / Monitors
    </p>

    <h1
      class="uppercase font-black leading-[0.88] tracking-tight mb-3 text-5xl md:text-8xl transition-colors duration-700"
      style="color: {flyer.accent}; font-family: {flyer.titleFont ?? 'inherit'};"
    >
      {flyer.genre}
    </h1>

    <p
      class="uppercase font-semibold tracking-[0.2em] text-sm md:text-lg mb-8"
      style="color: {flyer.textColor}99;"
    >
      {flyer.tagline}
    </p>

    <div class="w-full max-w-xs h-px mb-8" style="background: {flyer.textColor}22;"></div>

    <div class="flex flex-col items-center gap-1 mb-7">
      {#each flyer.headliners as name, i}
        {#if headlinerLogos[name]}
          <div class="relative inline-block group {tierSizeClass[tier(i)]} {tierWeightClass[tier(i)]} {tierOpacity[tier(i)]}">
            <p class="uppercase leading-tight transition-opacity duration-300 group-hover:opacity-0" style="color: {flyer.textColor};">
              {name}
            </p>
            <img
              src={headlinerLogos[name]}
              alt="{name} logo"
              class="absolute inset-0 w-full h-full object-contain opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none"
            />
          </div>
        {:else}
          <p
            class="uppercase leading-tight {tierSizeClass[tier(i)]} {tierWeightClass[tier(i)]} {tierOpacity[tier(i)]}"
            style="color: {flyer.textColor};"
          >
            {name}
          </p>
        {/if}
      {/each}
    </div>

    {#if flyer.alsoFeatured.length > 0}
      <div class="w-full max-w-xs h-px mb-5" style="background: {flyer.textColor}18;"></div>
      <p class="text-[9px] tracking-[0.22em] uppercase mb-3" style="color: {flyer.textColor}55;">
        Also Featuring
      </p>
      <div class="max-w-2xl flex flex-wrap justify-center gap-x-0 gap-y-1 px-4">
        {#each flyer.alsoFeatured as name, i}
          <span class="uppercase font-semibold tracking-wide text-xs md:text-base" style="color: {flyer.textColor}80;">
            {name}{#if i < flyer.alsoFeatured.length - 1}<span class="mx-2" style="color: {flyer.accent}50;">·</span>{/if}
          </span>
        {/each}
      </div>
    {/if}

    <div class="flex justify-center mt-9">
      <div>
        <p class="text-[9px] tracking-[0.22em] uppercase" style="color: {flyer.textColor}55;">Role</p>
        <p class="text-sm md:text-base font-bold uppercase tracking-wide mt-1" style="color: {flyer.textColor}cc;">
          FOH / Monitors
        </p>
      </div>
    </div>

    <div class="w-full max-w-lg h-px mt-7" style="background: {flyer.accent}55;"></div>
  </div>

  <button
    onclick={prevFlyer}
    aria-label="Previous flyer"
    class="fixed left-3 top-1/2 -translate-y-1/2 z-20 w-11 h-11 flex items-center justify-center text-2xl bg-black/35 border rounded-full transition-colors"
    style="border-color: {flyer.accent}33; color: {flyer.textColor};"
  >
    ‹
  </button>

  <button
    onclick={nextFlyer}
    aria-label="Next flyer"
    class="fixed right-3 top-1/2 -translate-y-1/2 z-20 w-11 h-11 flex items-center justify-center text-2xl bg-black/35 border rounded-full transition-colors"
    style="border-color: {flyer.accent}33; color: {flyer.textColor};"
  >
    ›
  </button>

  <div class="fixed bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
    {#each flyers as _, i}
      <button
        onclick={() => (flyerStore.currentIndex = i)}
        aria-label={`Flyer ${i + 1}`}
        class="h-1.5 rounded-full transition-all duration-300 {i === flyerStore.currentIndex ? 'w-6' : 'w-1.5'}"
        style="background: {i === flyerStore.currentIndex ? flyer.accent : flyer.textColor + '33'};"
      ></button>
    {/each}
  </div>

  <div class="fixed bottom-6 right-5 z-20 text-xs font-semibold tracking-widest" style="color: {flyer.textColor}66;">
    {String(flyerStore.currentIndex + 1).padStart(2, "0")} / {String(flyers.length).padStart(2, "0")}
  </div>
</div>