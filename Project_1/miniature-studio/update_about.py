import os
import re

file_path = r"c:\Users\abane\Music\Free_lancing\Free-lancing\Project_1\miniature-studio\pages\about.html"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# We want to replace everything inside <main ...> </main>
main_match = re.search(r'<main[^>]*>.*?</main>', content, re.DOTALL)

if main_match:
    new_main = r'''  <main>
    <!-- Hero Section -->
    <div class="bg-[var(--color-primary)] text-white py-20 lg:py-32 relative overflow-hidden">
      <!-- Decorative background elements -->
      <div class="absolute top-0 right-0 w-[800px] h-[800px] bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
      <div class="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[var(--color-accent)] opacity-10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4"></div>
      
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="max-w-3xl" data-reveal class="opacity-0 translate-y-3 transition duration-700">
          <p class="mb-4 inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[var(--color-accent)]">Our Story</p>
          <h1 class="font-display text-5xl sm:text-7xl mb-6 leading-none">Crafting Legends in Miniature</h1>
          <p class="text-lg sm:text-xl text-white/80 leading-relaxed">Founded in 2018 by a collective of competitive tabletop players and fine artists, Miniature Studio was built on a simple premise: a beautifully painted army elevates the entire gaming experience. We treat every model—from line infantry to towering centerpieces—with the respect the lore demands.</p>
        </div>
      </div>
    </div>

    <!-- The Philosophy Section -->
    <section class="section-wrap bg-white">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div data-reveal class="opacity-0 translate-y-3 transition duration-700">
            <h2 class="font-display text-4xl sm:text-5xl text-[var(--color-primary)] mb-6">Our Philosophy</h2>
            <div class="space-y-6 text-[var(--color-muted)]">
              <p>We don't just put paint on plastic. We believe in <strong>narrative painting</strong>. Where has this squad been fighting? What planet are they on? Is the lighting from a blazing plasma coil or a setting alien sun? These questions drive our palette choices and weathering techniques.</p>
              <p>Communication is the cornerstone of our studio. When you commission an army with us, you aren't left in the dark. We provide regular updates, test models for large projects, and high-resolution studio photography before a single model is shipped back to you.</p>
            </div>
            <div class="mt-8 grid grid-cols-2 gap-6 border-t border-black/10 pt-8">
              <div>
                <span class="block text-4xl font-display text-[var(--color-accent)] mb-1">5</span>
                <span class="text-sm font-bold uppercase tracking-wider text-[var(--color-primary)]">Years Active</span>
              </div>
              <div>
                <span class="block text-4xl font-display text-[var(--color-accent)] mb-1">10k+</span>
                <span class="text-sm font-bold uppercase tracking-wider text-[var(--color-primary)]">Models Painted</span>
              </div>
            </div>
          </div>
          <div data-reveal class="opacity-0 translate-y-3 transition duration-700 delay-150">
            <div class="relative rounded-[2rem] overflow-hidden card-shadow border border-black/5">
              <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80&fm=webp" alt="Artist at workbench" class="w-full object-cover h-[500px]">
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div class="absolute bottom-6 left-6 right-6">
                <p class="text-white text-sm italic">"The difference between a good model and a great model is knowing when to stop rendering and let the silhouette breathe."</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Trusted By / Clients section -->
    <section class="section-wrap bg-slate-50">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 id="clients-title" class="font-display text-4xl text-[var(--color-primary)] mb-12 text-center">Trusted by Collectors</h2>
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div data-reveal class="rounded-2xl border border-black/10 bg-white p-8 card-shadow flex flex-col items-center text-center opacity-0 translate-y-3 transition duration-700">
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
              class="w-20 h-20 rounded-full mb-6 object-cover border-4 border-[var(--color-accent)]"
              alt="Client Avatar">
            <h3 class="font-bold text-[var(--color-primary)] text-lg">Ironhold League</h3>
            <p class="mt-3 text-sm text-[var(--color-muted)] leading-relaxed">The studio delivered 40 models for our regional tournament. The blend quality and durable finish ensured our team stood out.</p>
          </div>
          <div data-reveal class="rounded-2xl border border-black/10 bg-white p-8 card-shadow flex flex-col items-center text-center opacity-0 translate-y-3 transition duration-700 delay-100">
            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
              class="w-20 h-20 rounded-full mb-6 object-cover border-4 border-[var(--color-accent)]"
              alt="Client Avatar">
            <h3 class="font-bold text-[var(--color-primary)] text-lg">Nova Forge</h3>
            <p class="mt-3 text-sm text-[var(--color-muted)] leading-relaxed">Professional communication and stunning OSL effects on our display pieces. Every detail was sharp.</p>
          </div>
          <div data-reveal class="rounded-2xl border border-black/10 bg-white p-8 card-shadow flex flex-col items-center text-center opacity-0 translate-y-3 transition duration-700 delay-200">
            <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80"
              class="w-20 h-20 rounded-full mb-6 object-cover border-4 border-[var(--color-accent)]"
              alt="Client Avatar">
            <h3 class="font-bold text-[var(--color-primary)] text-lg">Crownspire Café</h3>
            <p class="mt-3 text-sm text-[var(--color-muted)] leading-relaxed">Highly recommended for bulk commissions. They managed to keep the consistency perfect across the entire skirmish set.</p>
          </div>
          <div data-reveal class="rounded-2xl border border-black/10 bg-white p-8 card-shadow flex flex-col items-center text-center opacity-0 translate-y-3 transition duration-700 delay-300">
            <img src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=150&q=80"
              class="w-20 h-20 rounded-full mb-6 object-cover border-4 border-[var(--color-accent)]"
              alt="Client Avatar">
            <h3 class="font-bold text-[var(--color-primary)] text-lg">Aether Rift</h3>
            <p class="mt-3 text-sm text-[var(--color-muted)] leading-relaxed">The material contrast on our champion models was breathtaking. Non-metallic metals rendered to perfection.</p>
          </div>
        </div>
      </div>
    </section>
  </main>'''
    
    content = content[:main_match.start()] + new_main + content[main_match.end():]
    
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)
    print("About updated successfully.")
else:
    print("Main section not found.")
