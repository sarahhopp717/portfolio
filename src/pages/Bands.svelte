<script lang="ts">
  import { flyers } from "../data/flyers";
  import { searchableActs } from "../data/searchableActs";
  import { flyerStore } from "../stores/flyerStore.svelte";

  
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

  let flyer = $derived(flyers[flyerStore.currentIndex]);
</script>

<div class="relative min-h-screen flex flex-col items-center justify-center text-center px-6"
     style="background-color: {flyer.background}">

  <div class="absolute top-6 left-1/2 -translate-x-1/2 w-full max-w-md">
    <div class="flex gap-2 px-6">
      <input
        type="text"
        bind:value={searchTerm}
        placeholder="Search an artist"
        class="flex-1 px-3 py-2 rounded text-white"
        onkeydown={(e) => e.key === "Enter" && handleSearch()}
      />
      <button onclick={handleSearch} class="px-4 py-2 bg-white text-black rounded">Search</button>
    </div>
    {#if searchMessage}
      <p class="text-sm text-gray-300 px-6 mt-2">{searchMessage}</p>
    {/if}
  </div>

  <button
    onclick={prevFlyer}
    aria-label="Previous flyer"
    class="absolute left-4 top-1/2 -translate-y-1/2 text-white text-3xl"
  >
    ‹
  </button>

  <p class="text-sm tracking-widest text-gray-300 mb-2">SARAH HOPP · AUDIO ENGINEER · FOH / MONITORS</p>
  <h1 class="text-5xl font-bold text-white mb-2">{flyer.genre}</h1>
  <p class="text-gray-300 mb-6">{flyer.tagline}</p>

  <div class="space-y-2">
    {#each flyer.headliners as name}
      <p class="text-2xl font-semibold text-white">{name}</p>
    {/each}
  </div>

  <p class="text-xs text-gray-400 mt-8">{flyer.alsoFeatured.join(" · ")}</p>

  <button
    onclick={nextFlyer}
    aria-label="Next flyer"
    class="absolute right-4 top-1/2 -translate-y-1/2 text-white text-3xl"
  >
    ›
  </button>

  <div class="absolute bottom-6 flex gap-2">
    {#each flyers as _, i}
      <div class="w-2 h-2 rounded-full {i === flyerStore.currentIndex ? 'bg-white' : 'bg-gray-500'}"></div>
    {/each}
  </div>

</div>