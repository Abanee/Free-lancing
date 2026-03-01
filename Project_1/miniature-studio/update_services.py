import os
import re

file_path = r"c:\Users\abane\Music\Free_lancing\Free-lancing\Project_1\miniature-studio\pages\services.html"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

header_match = re.search(r'</header>', content)
footer_match = re.search(r'<!-- Custom Footer -->', content)

if header_match and footer_match:
    new_main = r'''
  <main>
    <!-- Hero Section -->
    <div class="bg-[var(--color-primary)] text-white py-20 lg:py-32 relative overflow-hidden">
      <!-- Decorative background elements -->
      <div class="absolute top-0 right-0 w-[800px] h-[800px] bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
      <div class="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[var(--color-accent)] opacity-10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4"></div>
      
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="max-w-3xl" data-reveal class="opacity-0 translate-y-3 transition duration-700">
          <p class="mb-4 inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[var(--color-accent)]">Commission Tiers</p>
          <h1 class="font-display text-5xl sm:text-7xl mb-6 leading-none">Studio Services</h1>
          <p class="text-lg sm:text-xl text-white/80 leading-relaxed">From battle-ready hordes to museum-quality centerpieces, pick the exact level of detail your miniatures demand.</p>
        </div>
      </div>
    </div>

    <!-- Tiers Section -->
    <section class="section-wrap bg-slate-50 border-b border-black/5">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="grid gap-8 lg:grid-cols-3">
          
          <!-- Tier 1 -->
          <article data-reveal class="bg-white rounded-[2rem] p-8 card-shadow border border-black/5 opacity-0 translate-y-3 transition duration-700 flex flex-col h-full">
            <h2 class="font-display text-3xl text-[var(--color-primary)] mb-2">Tabletop Ready</h2>
            <p class="text-[var(--color-accent)] font-bold mb-6">Level 1</p>
            <p class="text-sm text-[var(--color-muted)] mb-8 flex-grow">Designed for getting large armies on the table quickly without sacrificing readability. Clean basecoats, targeted washes for depth, and crisp basing.</p>
            <ul class="space-y-3 text-sm text-[var(--color-muted)] mb-8">
              <li class="flex items-start gap-2"><span class="text-[var(--color-accent)]">✓</span> Full mold line removal & assembly</li>
              <li class="flex items-start gap-2"><span class="text-[var(--color-accent)]">✓</span> Airbrush zenithal undercoat</li>
              <li class="flex items-start gap-2"><span class="text-[var(--color-accent)]">✓</span> Primary color blocking & shading wash</li>
              <li class="flex items-start gap-2"><span class="text-[var(--color-accent)]">✓</span> Basic textured base (sand/texture paste)</li>
              <li class="flex items-start gap-2"><span class="text-[var(--color-accent)]">✓</span> Dual-layer matte varnish</li>
            </ul>
            <p class="text-xs font-semibold uppercase tracking-widest text-[var(--color-primary)] mb-4">Ideal For: Troops & Hordes</p>
            <a href="contact.html?tier=1" class="btn-outline text-center w-full block">Request Quote</a>
          </article>

          <!-- Tier 2 (Highlighted) -->
          <article data-reveal class="bg-[var(--color-primary)] text-white rounded-[2rem] p-8 shadow-2xl relative transform lg:-translate-y-4 opacity-0 translate-y-3 transition duration-700 delay-150 flex flex-col h-full">
            <div class="absolute -top-4 right-8 bg-[var(--color-accent)] text-white text-xs font-bold uppercase tracking-wider py-1 px-4 rounded-full shadow-lg">Most Popular</div>
            <h2 class="font-display text-3xl mb-2">Tabletop Plus</h2>
            <p class="text-[var(--color-accent)] font-bold mb-6">Level 2</p>
            <p class="text-sm text-white/80 mb-8 flex-grow">The perfect balance of speed and striking detail. Smooth volumetric highlights, edge highlighting, and initial weathering effects.</p>
            <ul class="space-y-3 text-sm text-white/90 mb-8">
              <li class="flex items-start gap-2"><span class="text-[var(--color-accent)]">✓</span> Everything in Tabletop Ready</li>
              <li class="flex items-start gap-2"><span class="text-[var(--color-accent)]">✓</span> Two stages of edge highlighting</li>
              <li class="flex items-start gap-2"><span class="text-[var(--color-accent)]">✓</span> Eye and lens detailing</li>
              <li class="flex items-start gap-2"><span class="text-[var(--color-accent)]">✓</span> Initial battle damage (sponging)</li>
              <li class="flex items-start gap-2"><span class="text-[var(--color-accent)]">✓</span> Advanced basing (tufts, cork ruins)</li>
            </ul>
            <p class="text-xs font-semibold uppercase tracking-widest text-white/60 mb-4">Ideal For: Elites & Kill Teams</p>
            <a href="contact.html?tier=2" class="bg-[var(--color-accent)] hover:bg-[var(--color-accent)]/90 text-white font-bold py-3 px-6 rounded-xl transition text-center w-full block">Request Quote</a>
          </article>

          <!-- Tier 3 -->
          <article data-reveal class="bg-white rounded-[2rem] p-8 card-shadow border border-[var(--color-accent)]/30 opacity-0 translate-y-3 transition duration-700 delay-300 flex flex-col h-full">
            <h2 class="font-display text-3xl text-[var(--color-primary)] mb-2">Showcase Canvas</h2>
            <p class="text-[var(--color-accent)] font-bold mb-6">Level 3</p>
            <p class="text-sm text-[var(--color-muted)] mb-8 flex-grow">Museum-quality competition painting. Flawless unhindered transitions, Non-Metallic Metals (NMM), Object Source Lighting (OSL), and narrative freehanding.</p>
            <ul class="space-y-3 text-sm text-[var(--color-muted)] mb-8">
              <li class="flex items-start gap-2"><span class="text-[var(--color-accent)]">✓</span> Infinite blending techniques</li>
              <li class="flex items-start gap-2"><span class="text-[var(--color-accent)]">✓</span> NMM or True Metallic Metal (TMM) rendering</li>
              <li class="flex items-start gap-2"><span class="text-[var(--color-accent)]">✓</span> Plasma/Magic glow effects (OSL)</li>
              <li class="flex items-start gap-2"><span class="text-[var(--color-accent)]">✓</span> Custom freehand banners/cloaks</li>
              <li class="flex items-start gap-2"><span class="text-[var(--color-accent)]">✓</span> Complex narrative dioramas for bases</li>
            </ul>
            <p class="text-xs font-semibold uppercase tracking-widest text-[var(--color-primary)] mb-4">Ideal For: HQ, Primarchs, Vehicles</p>
            <a href="contact.html?tier=3" class="btn-outline text-center w-full block">Request Quote</a>
          </article>

        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="section-wrap bg-white">
      <div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h2 class="font-display text-4xl text-[var(--color-primary)] mb-12 text-center">Frequently Asked Questions</h2>
        
        <div class="space-y-6">
          <div data-reveal class="bg-slate-50 rounded-2xl p-6 border border-black/5 opacity-0 translate-y-3 transition duration-700">
            <h3 class="font-bold text-lg text-[var(--color-primary)] mb-3">How do I ship my models to the studio?</h3>
            <p class="text-[var(--color-muted)] text-sm leading-relaxed">Once a quote is accepted and dates are secured with a deposit, we'll provide shipping instructions to our secure PO Box. We recommend using tracked couriers and padding the original sprues or assembled models heavily in bubble wrap.</p>
          </div>
          
          <div data-reveal class="bg-slate-50 rounded-2xl p-6 border border-black/5 opacity-0 translate-y-3 transition duration-700">
            <h3 class="font-bold text-lg text-[var(--color-primary)] mb-3">Do I need to assemble them first?</h3>
            <p class="text-[var(--color-muted)] text-sm leading-relaxed">No. In fact, we prefer they remain New On Sprue (NOS). This allows us to clean mold lines professionally and build dynamic sub-assemblies for hard-to-reach areas during the painting process.</p>
          </div>

          <div data-reveal class="bg-slate-50 rounded-2xl p-6 border border-black/5 opacity-0 translate-y-3 transition duration-700">
            <h3 class="font-bold text-lg text-[var(--color-primary)] mb-3">What are your turnaround times?</h3>
            <p class="text-[var(--color-muted)] text-sm leading-relaxed">Turnarounds depend heavily on backend queue length and the size of your commission. A 2000pt Tabletop Plus army generally takes 3-4 weeks once it hits the paint desk. We provide a firm timeline window during consultation.</p>
          </div>
          
          <div data-reveal class="bg-slate-50 rounded-2xl p-6 border border-black/5 opacity-0 translate-y-3 transition duration-700">
            <h3 class="font-bold text-lg text-[var(--color-primary)] mb-3">Can you mimic an existing paint scheme?</h3>
            <p class="text-[var(--color-muted)] text-sm leading-relaxed">Absolutely. If you are adding to an existing painted army, provide high-quality daylight photos alongside the exact paint recipe used (if known), and we will match the style seamlessly.</p>
          </div>
        </div>
      </div>
    </section>
  </main>
  '''
    
    content = content[:header_match.end()] + new_main + content[footer_match.start():]
    
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)
    print("Services updated successfully.")
else:
    print("Failed to find boundaries in services.html")
