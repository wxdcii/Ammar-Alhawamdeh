import Link from "next/link";
import { ArrowLeft, ArrowSquareOut } from "@phosphor-icons/react/dist/ssr";
import { Container } from "@/components/container";
import { publications } from "@/config/publications";
import { createPageMetadata, pageTitle } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: pageTitle("Publications"),
  description: "Research publications by Ammar Al-Hawamdeh.",
  path: "/achievements",
});

export default function PublicationsPage() {
  return (
    <div className="space-y-10 pb-16 pt-8">
      <Container>
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-secondary transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back home
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">Publications</h1>
        <p className="mt-3 max-w-xl text-secondary">
          Research in artificial intelligence, machine learning, and software engineering.
        </p>
      </Container>

      <Container>
        <div className="max-w-3xl divide-y divide-border border-y border-border">
          {publications.map((publication) => (
            <article key={publication.href} className="py-6 sm:py-7">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <h2 className="text-lg font-semibold leading-snug tracking-tight">
                    {publication.title}
                  </h2>
                  <p className="mt-2 text-sm text-secondary">
                    {publication.source} <span className="mx-1.5 text-border">|</span> {publication.date}
                  </p>
                </div>
                <Link
                  href={publication.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex shrink-0 items-center gap-2 self-start rounded-lg border border-border px-3 py-2 text-sm font-medium text-secondary transition-colors hover:bg-muted hover:text-foreground sm:self-center"
                >
                  Read publication
                  <ArrowSquareOut className="size-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </div>
  );
}
