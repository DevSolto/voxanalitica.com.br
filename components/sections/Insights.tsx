import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section, SectionHeader } from "@/components/Section";

type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  read_time: string;
  published_at: string;
  featured?: boolean;
};

type InsightsProps = {
  sectionId?: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
  posts: BlogPost[];
};

function formatDate(dateString: string) {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) {
    return dateString;
  }

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

export function InsightsSection({
  sectionId = "blog",
  title,
  subtitle,
  ctaLabel,
  ctaHref,
  posts,
}: InsightsProps) {
  const featuredPost = posts.find((post) => post.featured) ?? posts[0];
  const regularPosts = posts.filter((post) => post.slug !== featuredPost?.slug);

  return (
    <Section id={sectionId}>
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeader
          eyebrow="Blog"
          title={title}
          subtitle={subtitle}
          className="max-w-3xl"
          titleClassName="text-3xl font-bold text-[#043873] md:text-[40px]"
        />
        <Link
          href={ctaHref}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-[#043873] px-5 py-3 text-sm font-semibold text-[#043873] transition hover:bg-[#043873] hover:text-white"
        >
          {ctaLabel}
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
      <div className="mt-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        {featuredPost ? (
          <article className="flex h-full flex-col justify-between rounded-3xl border border-[#E9ECEF] bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#ADB5BD]">{featuredPost.category}</p>
              <h3 className="text-3xl font-semibold text-[#043873]">{featuredPost.title}</h3>
              <p className="text-base text-[#495057]">{featuredPost.excerpt}</p>
            </div>
            <div className="flex flex-col">
            <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-[#6C757D]">
              <span>{formatDate(featuredPost.published_at)}</span>
              <span className="h-1 w-1 rounded-full bg-[#CED4DA]" aria-hidden="true" />
              <span>{featuredPost.read_time} de leitura</span>
            </div>
            <div className="">
              <Link
                href={`/blog/${featuredPost.slug}`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#043873] hover:text-[#021F46]"
              >
                Ler artigo completo
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            </div>
          </article>
        ) : null}

        <div className="space-y-6">
          {regularPosts.map((post) => (
            <article
              key={post.slug}
              className="rounded-3xl border border-[#E9ECEF] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#ADB5BD]">
                <span>{post.category}</span>
                <span className="h-1 w-1 rounded-full bg-[#CED4DA]" aria-hidden="true" />
                <span>{formatDate(post.published_at)}</span>
              </div>
              <h3 className="mt-3 text-xl font-semibold text-[#043873]">{post.title}</h3>
              <p className="mt-2 text-sm text-[#495057]">{post.excerpt}</p>
              <div className="mt-4 flex items-center justify-between text-sm text-[#6C757D]">
                <span>{post.read_time} de leitura</span>
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 font-semibold text-[#043873] hover:text-[#021F46]"
                >
                  Ler artigo
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}
