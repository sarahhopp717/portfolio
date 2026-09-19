<script lang="ts">
  import { route } from "@mateothegreat/svelte5-router";
  import { flyers } from "../data/flyers";
  import { flyerStore } from "../stores/flyerStore.svelte";

  let menuOpen = $state(false);
  let bandsOpen = $state(false);
  let bandsWrapper: HTMLDivElement | undefined = $state();

  function toggleBands(e: MouseEvent) {
    e.stopPropagation();
    bandsOpen = !bandsOpen;
  }

  function goToFlyer(index: number) {
    flyerStore.currentIndex = index;
    bandsOpen = false;
    menuOpen = false;
  }

  function handleWindowClick(e: MouseEvent) {
    if (bandsOpen && bandsWrapper && !bandsWrapper.contains(e.target as Node)) {
      bandsOpen = false;
    }
  }

  function handleWindowKeydown(e: KeyboardEvent) {
    if (e.key === "Escape") bandsOpen = false;
  }
</script>

<svelte:window onclick={handleWindowClick} onkeydown={handleWindowKeydown} />

<nav class="relative z-50 flex items-center justify-between px-6 py-4 bg-black text-white">
  <span class="font-bold">SARAH HOPP</span>
  <button onclick={() => (menuOpen = !menuOpen)} class="md:hidden" aria-label="Toggle menu">
    ☰
  </button>

  <div class="hidden md:flex gap-6 items-center">
    <a use:route href="/">Home</a>
    <a use:route href="/videos">Videos</a>
    <a use:route href="/photos">Photos</a>
    <a use:route href="/experience">Experience</a>

    <div class="relative" bind:this={bandsWrapper}>
      <button
        class="flex items-center gap-1"
        onclick={toggleBands}
        aria-haspopup="menu"
        aria-expanded={bandsOpen}
      >
        Bands
      </button>
      {#if bandsOpen}
        <div
          class="absolute top-full left-0 flex flex-col bg-black border border-gray-700 rounded min-w-48 z-50"
          role="menu"
          tabindex="-1"
        >
          {#each flyers as f, i}
            <a use:route href="/bands" role="menuitem" onclick={() => goToFlyer(i)} class="px-4 py-2 hover:bg-gray-800">
              {f.genre}
            </a>
          {/each}
        </div>
      {/if}
    </div>

    <a use:route href="/connect">Connect</a>
    <a use:route href="/hobbies">Hobbies</a>
  </div>
</nav>

{#if menuOpen}
<div class="md:hidden flex flex-col gap-2 px-6 py-4 bg-black text-white">
  <a use:route href="/" onclick={() => (menuOpen = false)}>Home</a>
  <a use:route href="/videos" onclick={() => (menuOpen = false)}>Videos</a>
  <a use:route href="/photos" onclick={() => (menuOpen = false)}>Photos</a>
  <a use:route href="/experience" onclick={() => (menuOpen = false)}>Experience</a>

  <div>
    <button onclick={() => (bandsOpen = !bandsOpen)} class="flex items-center gap-1">
      Bands
    </button>
    {#if bandsOpen}
      <div class="flex flex-col pl-4 mt-1">
        {#each flyers as f, i}
          <a use:route href="/bands" onclick={() => goToFlyer(i)} class="py-2 text-gray-300">
            {f.genre}
          </a>
        {/each}
      </div>
    {/if}
  </div>

  <a use:route href="/connect" onclick={() => (menuOpen = false)}>Connect</a>
  <a use:route href="/hobbies" onclick={() => (menuOpen = false)}>Hobbies</a>
</div>
{/if}