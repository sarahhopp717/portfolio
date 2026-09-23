<script lang="ts">
  interface SocialLink {
    icon: string;
    label: string;
    handle: string;
    href: string;
  }

  const links: SocialLink[] = [
    { icon: "📸", label: "Instagram", handle: "s_hopp", href: "https://www.instagram.com/s_hopp" },
    { icon: "💼", label: "LinkedIn", handle: "sarahhopp717", href: "https://www.linkedin.com/in/sarahhopp717/" },
    { icon: "💻", label: "GitHub", handle: "sarahhopp717", href: "https://github.com/sarahhopp717" },
  ];

  const emailUser = "sarahhopp717";
  const emailDomain = "gmail.com";
  const email = `${emailUser}@${emailDomain}`;
</script>

<div class="min-h-screen bg-black text-white">
  <div class="max-w-[640px] mx-auto px-6 pt-24 pb-16">
    <h1 class="text-teal-400 text-6xl font-bold mb-14 font-['Barlow_Condensed']">
      LET'S TALK
    </h1>

    <div class="flex flex-col mb-12">
      {#each links as link}
        <a
          href={link.href}
          class="flex items-center gap-5 py-6 border-b border-white/6 no-underline hover:opacity-70 transition-opacity"
        >
          <span class="text-2xl shrink-0">{link.icon}</span>
          <div class="flex-1">
            <div class="font-['Barlow_Condensed'] text-[22px] font-bold text-white uppercase tracking-[0.04em]">
              {link.label}
            </div>
            <div class="font-['Inter'] text-[13px] text-white/40 mt-0.5">
              {link.handle}
            </div>
          </div>
          <span class="text-[18px] text-teal-400">→</span>
        </a>
      {/each}
    </div>

    <div class="border-t border-white/6 pt-8">
      <p class="font-['Inter'] text-[12px] uppercase tracking-[0.12em] text-white/30 mb-2">
        Email
      </p>
      <a
        href={`mailto:${email}`}
        class="font-['Barlow_Condensed'] text-[26px] font-semibold text-white no-underline tracking-[0.02em] hover:opacity-70 transition-opacity"
      >
        {email}
      </a>
    </div>
  </div>
</div>
