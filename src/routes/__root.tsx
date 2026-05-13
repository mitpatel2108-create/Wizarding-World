import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";


import appCss from "../styles.css?url";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { WandCursor } from "@/components/magic/WandCursor";
import { MobileNav } from "@/components/MobileNav";    // ← add
import { SoundToggle } from "@/components/SoundToggle"; // ← add

import { Particles } from '@/components/magic/Particles'
import { Fog } from '@/components/magic/Fog'
import { Stars } from '@/components/magic/Stars'
import SpellCasting from '../components/magic/SpellCasting'

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-8xl text-gold">404</h1>
        <h2 className="mt-6 font-serif-magical text-2xl text-[var(--gold)]/80">
          This passage has vanished
        </h2>
        <p className="mt-3 text-sm italic text-muted-foreground">
          Even the Marauder's Map cannot find what is not there.
        </p>
        <div className="mt-8">
          <Link to="/" className="font-display text-xs uppercase tracking-[0.3em] text-[var(--gold)] underline-offset-8 hover:underline">
            Return to the castle
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-3xl text-[var(--gold)]">A spell misfired</h1>
        <p className="mt-3 text-sm text-muted-foreground italic">{error.message || "An arcane disturbance occurred."}</p>
        <div className="mt-8 flex justify-center gap-3">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="border border-[var(--gold)]/50 px-5 py-2 font-display text-xs uppercase tracking-[0.25em] text-[var(--gold)] hover:bg-[var(--gold)]/10"
          >
            Recast
          </button>
          <a href="/" className="px-5 py-2 font-display text-xs uppercase tracking-[0.25em] text-muted-foreground hover:text-[var(--gold)]">
            Home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Wizarding World — Enter the Magic" },
      { name: "description", content: "A cinematic, immersive journey into a fantasy wizarding world. Castles, spells, potions, wands, and ancient magic." },
      { name: "theme-color", content: "#0a0d1a" },
      { property: "og:title", content: "Wizarding World — Enter the Magic" },
      { property: "og:description", content: "Walk the halls of an enchanted castle. Cast spells. Discover your house." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=EB+Garamond:ital,wght@0,400;0,500;1,400&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <WandCursor />
      <SiteNav />
      <main className="relative">
        <Particles />
        <Fog />
        <Stars />
        <WandCursor />
        <SpellCasting />

        <Outlet />
      </main>
      <SiteFooter />
      <MobileNav />    {/* ← add */}
      <SoundToggle />  {/* ← add */}
    </QueryClientProvider>
  );
}
