<script lang="ts">
  import { venues, consoles, programs } from "../data/experience";
</script>

<div class="min-h-screen bg-black text-white px-6 py-12 md:px-12">
  <!-- <p class="text-teal-400 text-sm tracking-widest mb-2">VENUES/GEAR/PROGRAMS</p> -->
  <h1 class="text-teal-400 text-6xl font-bold font-['Barlow_Condensed'] mb-14">TOOLS OF THE TRADE</h1>

  <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
    <div>
      <h2 class="text-teal-400 text-sm font-bold tracking-widest mb-6">VENUES</h2>
      <div>
        {#each venues as venue}
          <div class="border-b border-gray-800 py-3">
            <p class="text-lg font-semibold">{venue}</p>
          </div>
        {/each}
      </div>
    </div>

    <div>
      <h2 class="text-teal-400 text-sm font-bold tracking-widest mb-6">CONSOLES</h2>
      <div>
        {#each consoles as item}
          <div class="border-b border-gray-800 py-3">
            <p class="text-lg font-semibold">{item}</p>
          </div>
        {/each}
      </div>
    </div>

    <div>
      <h2 class="text-teal-400 text-sm font-bold tracking-widest mb-6">PROGRAMS</h2>
      <div>
        {#each programs as program}
          <div class="border-b border-gray-800 py-3">
            <p class="text-lg font-semibold">{program}</p>
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>