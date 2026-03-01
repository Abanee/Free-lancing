import os
import re

file_path = r"c:\Users\abane\Music\Free_lancing\Free-lancing\Project_1\miniature-studio\pages\tools.html"

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
          <p class="mb-4 inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[var(--color-accent)]">Tech Showcase</p>
          <h1 class="font-display text-5xl sm:text-7xl mb-6 leading-none">Studio Arsenal</h1>
          <p class="text-lg sm:text-xl text-white/80 leading-relaxed">A professional pipeline combines elite hardware, calibrated paint chemistry, and repeatable techniques for breathtaking quality at scale.</p>
        </div>
      </div>
    </div>

    <!-- Tech Categories Section -->
    <section class="section-wrap bg-white border-b border-black/5">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="grid gap-16 lg:grid-cols-2 lg:gap-24 items-center mb-24">
          <div data-reveal class="order-2 lg:order-1 opacity-0 translate-y-3 transition duration-700">
            <h2 class="font-display text-4xl text-[var(--color-primary)] mb-6">Pneumatic Precision</h2>
            <h3 class="text-xl font-bold mb-4 text-[var(--color-primary)]">Harder & Steenbeck Airbrush Systems</h3>
            <p class="text-[var(--color-muted)] leading-relaxed mb-6">Our dual-action setup allows for hyper-smooth gradients and flawless zenithal priming. This technology is essential for creating the base volumes that bring miniature models to life with atmospheric lighting.</p>
            <ul class="space-y-3 text-sm text-[var(--color-muted)]">
              <li class="flex items-center gap-3"><span class="text-[var(--color-accent)]">✓</span> 0.15mm needle configurations for micro-detailing</li>
              <li class="flex items-center gap-3"><span class="text-[var(--color-accent)]">✓</span> Silenced rotary compressors for stable PSI</li>
              <li class="flex items-center gap-3"><span class="text-[var(--color-accent)]">✓</span> Custom moisture traps to prevent sputtering</li>
            </ul>
          </div>
          <div data-reveal class="order-1 lg:order-2 opacity-0 translate-y-3 transition duration-700 delay-150 relative">
            <div class="absolute inset-0 bg-[var(--color-accent)] opacity-20 rounded-[3rem] blur-3xl transform rotate-6"></div>
            <img src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=80" alt="Airbrush Tooling" class="rounded-[2rem] shadow-2xl relative z-10 h-[400px] w-full object-cover border-4 border-white">
          </div>
        </div>

        <div class="grid gap-16 lg:grid-cols-2 lg:gap-24 items-center mb-24">
          <div data-reveal class="opacity-0 translate-y-3 transition duration-700 delay-150 relative">
            <div class="absolute inset-0 bg-[var(--color-primary)] opacity-10 rounded-[3rem] blur-3xl transform -rotate-6"></div>
            <img src="https://images.unsplash.com/photo-1510940561570-5fa3a55ed232?auto=format&fit=crop&w=800&q=80" alt="Paint Arsenal" class="rounded-[2rem] shadow-2xl relative z-10 h-[400px] w-full object-cover border-4 border-white">
          </div>
          <div data-reveal class="opacity-0 translate-y-3 transition duration-700">
            <h2 class="font-display text-4xl text-[var(--color-primary)] mb-6">Color Chemistry</h2>
            <h3 class="text-xl font-bold mb-4 text-[var(--color-primary)]">Premium Acetate & Acrylic Substrates</h3>
            <p class="text-[var(--color-muted)] leading-relaxed mb-6">We don't restrict ourselves to one brand. We pick the best properties from the top manufacturers globally to ensure durability and perfect matte/satin finishes.</p>
            <div class="grid grid-cols-2 gap-4 mt-6">
              <div class="bg-slate-50 p-4 rounded-xl border border-black/5">
                <strong class="block text-sm">Scale75</strong>
                <span class="text-xs text-[var(--color-muted)]">Perfect for ultra-matte fabric rendering</span>
              </div>
              <div class="bg-slate-50 p-4 rounded-xl border border-black/5">
                <strong class="block text-sm">Vallejo Model Color</strong>
                <span class="text-xs text-[var(--color-muted)]">Unmatched historical accuracy and coverage</span>
              </div>
              <div class="bg-slate-50 p-4 rounded-xl border border-black/5">
                <strong class="block text-sm">Citadel Contrast</strong>
                <span class="text-xs text-[var(--color-muted)]">Rich, highly pigmented glazes</span>
              </div>
              <div class="bg-slate-50 p-4 rounded-xl border border-black/5">
                <strong class="block text-sm">AK Interactive</strong>
                <span class="text-xs text-[var(--color-muted)]">Industry standard enamels & weathering</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Additional Hardware Grid -->
    <section class="section-wrap bg-slate-50">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 class="font-display text-4xl text-[var(--color-primary)] mb-12 text-center">Studio Infrastructure</h2>
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <article data-reveal class="rounded-2xl border border-black/10 bg-white p-6 card-shadow opacity-0 translate-y-3 transition duration-700">
            <div class="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-xl mb-6">💧</div>
            <h3 class="text-xl font-bold text-[var(--color-primary)] mb-3">Wet Palette Ecosystem</h3>
            <p class="text-sm text-[var(--color-muted)] leading-relaxed">Our signature blending technique relies on stable moisture control. The wet palette prevents paint from drying mid-session, allowing for incredibly thin glazes.</p>
          </article>

          <article data-reveal class="rounded-2xl border border-black/10 bg-white p-6 card-shadow opacity-0 translate-y-3 transition duration-700 delay-100">
            <div class="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center text-xl mb-6">💡</div>
            <h3 class="text-xl font-bold text-[var(--color-primary)] mb-3">5600K Macro Lighting</h3>
            <p class="text-sm text-[var(--color-muted)] leading-relaxed">We work under high-CRI lighting to ensure that the color you see on your desk is exactly what was painted in the studio, eliminating environmental color shift.</p>
          </article>

          <article data-reveal class="rounded-2xl border border-black/10 bg-white p-6 card-shadow opacity-0 translate-y-3 transition duration-700 delay-200">
            <div class="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center text-xl mb-6">🖨️</div>
            <h3 class="text-xl font-bold text-[var(--color-primary)] mb-3">High-Res 8K Resin Printing</h3>
            <p class="text-sm text-[var(--color-muted)] leading-relaxed">For custom bases, kitbashing, and narrative elements, we deploy on-site 8K resin printers capable of achieving 22-micron detail fidelity.</p>
          </article>
        </div>
      </div>
    </section>
  </main>
  '''
    
    content = content[:header_match.end()] + new_main + content[footer_match.start():]
    
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)
    print("Tools updated successfully.")
else:
    print("Failed to find boundaries in tools.html")
