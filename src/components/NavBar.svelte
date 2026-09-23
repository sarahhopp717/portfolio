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

  let currentPath = $state(window.location.pathname);

  $effect(() => {
    const updatePath = () => {
      currentPath = window.location.pathname;
    };
    window.addEventListener("pushState", updatePath);
    window.addEventListener("replaceState", updatePath);
    window.addEventListener("popstate", updatePath);
    return () => {
      window.removeEventListener("pushState", updatePath);
      window.removeEventListener("replaceState", updatePath);
      window.removeEventListener("popstate", updatePath);
    };
  });

  const bandsActive = $derived(currentPath === "/bands");

  const navLinkOptions = {
    active: { class: ["text-teal-400", "border-teal-400"] },
    default: { class: ["text-white/55", "border-transparent"] },
  };

  const homeLinkOptions = {
    ...navLinkOptions,
    active: { ...navLinkOptions.active, absolute: true },
  };
</script>

<svelte:window onclick={handleWindowClick} onkeydown={handleWindowKeydown} />

<nav class="relative z-50 flex items-center justify-between px-6 py-4 bg-black text-white">
  <span class="text-teal-400 font-bold font-['Barlow_Condensed']">SARAH HOPP</span>
  <button onclick={() => (menuOpen = !menuOpen)} class="md:hidden" aria-label="Toggle menu">
    ☰
  </button>

  <div class="hidden md:flex gap-6 items-center">
    <a use:route={homeLinkOptions} class="font-['Barlow_Condensed'] uppercase border-b" href="/">Home</a>
    <a use:route={navLinkOptions} class="font-['Barlow_Condensed'] uppercase border-b" href="/pivot">Pivot</a>
    <a use:route={navLinkOptions} class="font-['Barlow_Condensed'] uppercase border-b" href="/photos">Photos</a>
    <a use:route={navLinkOptions} class="font-['Barlow_Condensed'] uppercase border-b" href="/experience">Experience</a>

    <div class="relative" bind:this={bandsWrapper}>
      <button
        class="flex items-center gap-1 font-['Barlow_Condensed'] uppercase border-b {bandsActive ? 'text-teal-400 border-teal-400' : 'text-white/55 border-transparent'}"
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
            <a use:route href="/bands" role="menuitem" onclick={() => goToFlyer(i)} class="px-4 py-2 hover:bg-gray-800 font-['Barlow_Condensed'] uppercase border-b {bandsActive && flyerStore.currentIndex === i ? 'text-teal-400 border-teal-400' : 'text-white/55 border-transparent'}">
              {f.genre}
            </a>
          {/each}
        </div>
      {/if}
    </div>

    <a use:route={navLinkOptions} class="font-['Barlow_Condensed'] uppercase border-b" href="/hobbies">Hobbies</a>
    <a use:route={navLinkOptions} class="font-['Barlow_Condensed'] uppercase border-b" href="/connect">Connect</a>
  </div>
</nav>

{#if menuOpen}
<div class="md:hidden flex flex-col gap-2 px-6 py-4 bg-black text-white">
  <a use:route={homeLinkOptions} class="font-['Barlow_Condensed'] uppercase border-b" href="/" onclick={() => (menuOpen = false)}>Home</a>
  <a use:route={navLinkOptions} class="font-['Barlow_Condensed'] uppercase border-b" href="/pivot" onclick={() => (menuOpen = false)}>Pivot</a>
  <a use:route={navLinkOptions} class="font-['Barlow_Condensed'] uppercase border-b" href="/photos" onclick={() => (menuOpen = false)}>Photos</a>
  <a use:route={navLinkOptions} class="font-['Barlow_Condensed'] uppercase border-b" href="/experience" onclick={() => (menuOpen = false)}>Experience</a>

  <div>
    <button onclick={toggleBands} class="flex items-center gap-1 font-['Barlow_Condensed'] uppercase border-b {bandsActive ? 'text-teal-400 border-teal-400' : 'text-white/55 border-transparent'}">
      Bands
    </button>
    {#if bandsOpen}
      <div class="flex flex-col pl-4 mt-1">
        {#each flyers as f, i}
          <a use:route href="/bands" onclick={() => goToFlyer(i)} class="py-2 font-['Barlow_Condensed'] uppercase border-b {bandsActive && flyerStore.currentIndex === i ? 'text-teal-400 border-teal-400' : 'text-white/55 border-transparent'}">
            {f.genre}
          </a>
        {/each}
      </div>
    {/if}
  </div>

  <a use:route={navLinkOptions} class="font-['Barlow_Condensed'] uppercase border-b" href="/hobbies" onclick={() => (menuOpen = false)}>Hobbies</a>
  <a use:route={navLinkOptions} class="font-['Barlow_Condensed'] uppercase border-b" href="/connect" onclick={() => (menuOpen = false)}>Connect</a>
</div>
{/if}