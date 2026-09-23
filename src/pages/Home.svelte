<script lang="ts">
import { route } from "@mateothegreat/svelte5-router";
  const stats = [
    { number: "700+", label: "Shows" },
    { number: "10+", label: "States" },
    { number: "12", label: "Years" },
  ];

  import heroImage from "../assets/hero/NGHTMRE-Red-Rocks-2.jpg";
</script>

<div class="min-h-screen relative bg-black text-white overflow-hidden">
  <img src={heroImage} alt="" class="absolute inset-0 w-full h-full object-cover opacity-50" />
  <div class="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(8,8,8,0.2)_0%,rgba(8,8,8,0.7)_60%,#080808_100%)]"></div>

  <div class="relative z-10 min-h-screen flex flex-col justify-center px-8">
    <p class="font-['Barlow_Condensed'] text-md mb-2">AUDIO ENGINEER → SOFTWARE ENGINEER</p>
    <h1 class="text-teal-400 text-7xl font-bold font-['Barlow_Condensed'] mb-4">SARAH HOPP</h1>
    <p class="text-gray-300 max-w-xl mb-6 uppercase">
      FOH & monitors across festivals, theaters, and intimate venues.
    </p>

    <div class="flex gap-4 mb-10">
      <a use:route href="/pivot" class="bg-teal-400 font-['Barlow_Condensed'] text-black px-6 py-3 font-bold">SEE THE PIVOT</a>
      <!-- <a use:route href="/bands" class="border font-['Barlow_Condensed'] border-white px-6 py-3 font-bold">BANDS</a> -->
    </div>

    <div class="flex gap-8">
      {#each stats as stat}
        <div>
          <p class="text-3xl font-bold">{stat.number}</p>
          <p class="text-gray-400 text-sm">{stat.label}</p>
        </div>
      {/each}
    </div>
  </div>
</div>