/* eslint-disable @next/next/no-img-element */
import { ArrowDown, ArrowUpRight, Mail } from "lucide-react";
import avatarLarge from "@/assets/mascot-256.webp";
import avatarSmall from "@/assets/mascot-192.webp";
import BlurFade from "@/components/magicui/blur-fade";
import { EmailOff } from "@/components/email-off";
import { JsonLd } from "@/components/json-ld";
import CoffeeSection from "@/components/section/coffee-section";
import ContactSection from "@/components/section/contact-section";
import ProjectsSection from "@/components/section/projects-section";
import WorkSection from "@/components/section/work-section";
import WritingSection from "@/components/section/writing-section";
import { DATA } from "@/data/resume";
import { absoluteUrl, graph, pageMetadata, personNode, PERSON_ID, websiteNode, WEBSITE_ID } from "@/lib/seo";

const BLUR_FADE_DELAY = 0.04;
const TITLE = `${DATA.name} (${DATA.brand}) | Software Builder in India`;

export const metadata = pageMetadata({
  title: TITLE,
  absoluteTitle: true,
  description: DATA.description,
  path: "/",
  imageAlt: `${DATA.name}, ${DATA.brand}`,
});

const jsonLd = graph(
  websiteNode(),
  {
    "@type": "ProfilePage",
    "@id": absoluteUrl("/#profilepage"),
    url: absoluteUrl("/"),
    name: TITLE,
    description: DATA.description,
    inLanguage: "en",
    isPartOf: { "@id": WEBSITE_ID },
    mainEntity: { "@id": PERSON_ID },
    dateModified: DATA.updatedAt,
  },
  personNode()
);

const buttonBase =
  "inline-flex h-10 items-center gap-2 rounded-full px-5 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

export default function Page() {
  return (
    <div className="relative flex min-h-dvh flex-col gap-14">
      <JsonLd data={jsonLd} />
      <section id="hero" aria-labelledby="hero-heading">
        <div className="mx-auto w-full max-w-2xl">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
            {/* The heading and the paragraphs below are not animated: they are
                the largest text on the first screen, and anything that hides
                them at load delays Largest Contentful Paint. */}
            <div className="order-2 flex flex-col gap-3 md:order-1">
              <h1
                id="hero-heading"
                className="text-3xl font-semibold tracking-tighter text-balance sm:text-4xl lg:text-5xl"
              >
                Hi, I&apos;m {DATA.name}
              </h1>
              <p className="max-w-[600px] text-pretty text-muted-foreground md:text-lg">{DATA.lead}</p>
              <BlurFade delay={BLUR_FADE_DELAY * 2}>
                <div className="flex flex-wrap gap-3 pt-2">
                  <EmailOff>
                    <a
                      href={`mailto:${DATA.contact.email}`}
                      className={`${buttonBase} bg-primary text-primary-foreground shadow hover:bg-primary/90`}
                    >
                      <Mail className="size-4" aria-hidden="true" />
                      Email me
                    </a>
                  </EmailOff>
                  <a href="#projects" className={`${buttonBase} border border-border bg-background hover:bg-muted`}>
                    See my work
                    <ArrowDown className="size-4" aria-hidden="true" />
                  </a>
                </div>
              </BlurFade>
            </div>
            <BlurFade delay={BLUR_FADE_DELAY} className="order-1 md:order-2">
              <img
                src={avatarLarge.src}
                srcSet={`${avatarSmall.src} 192w, ${avatarLarge.src} 256w`}
                sizes="(min-width: 768px) 128px, 96px"
                width={128}
                height={128}
                alt={`${DATA.brand} mascot`}
                decoding="async"
                className="size-24 rounded-full border object-cover shadow-lg ring-4 ring-muted md:size-32"
              />
            </BlurFade>
          </div>
        </div>
      </section>

      <section id="about" aria-labelledby="about-heading">
        <div className="flex min-h-0 flex-col gap-y-4">
          <h2 id="about-heading" className="text-xl font-bold">
            About
          </h2>
          <div className="prose max-w-full text-pretty font-sans leading-relaxed text-muted-foreground dark:prose-invert">
            <p>
              I finished my BCA at{" "}
              <a href="#education">Maharishi Markandeshwar (Deemed to be University)</a> in Mullana,
              Ambala, in 2024. Before that I studied at Jawahar Navodaya Vidyalaya in Darbhanga, Bihar.
            </p>
            <p>
              Since early 2025 I have built my own products under the name {DATA.brand}, along with
              websites for businesses. What I enjoy is taking a rough problem and turning it into
              something people can actually use. The projects below are the ones I have put the most into.
            </p>
          </div>
        </div>
      </section>

      <section id="projects" aria-labelledby="projects-heading" className="scroll-mt-8">
        <BlurFade delay={BLUR_FADE_DELAY * 5}>
          <ProjectsSection />
        </BlurFade>
      </section>

      <section id="work" aria-labelledby="work-heading">
        <div className="flex min-h-0 flex-col gap-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 6}>
            <h2 id="work-heading" className="text-xl font-bold">
              Work experience
            </h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 7}>
            <WorkSection />
          </BlurFade>
        </div>
      </section>

      <section id="education" aria-labelledby="education-heading" className="scroll-mt-8">
        <div className="flex min-h-0 flex-col gap-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 8}>
            <h2 id="education-heading" className="text-xl font-bold">
              Education
            </h2>
          </BlurFade>
          <ul className="flex flex-col gap-8">
            {DATA.education.map((education, index) => (
              <BlurFade as="li" key={education.school} delay={BLUR_FADE_DELAY * 9 + index * 0.05}>
                <a
                  href={education.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-x-3 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                >
                  <span className="flex min-w-0 flex-1 items-center gap-x-3">
                    <img
                      src={education.logo.src}
                      alt=""
                      width={40}
                      height={40}
                      loading="lazy"
                      decoding="async"
                      className="size-8 flex-none overflow-hidden rounded-full border bg-white object-contain p-0.5 shadow ring-2 ring-border md:size-10"
                    />
                    <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                      <span className="flex items-center gap-2 font-semibold leading-none">
                        {education.school}
                        <ArrowUpRight
                          className="size-3.5 -translate-x-2 text-muted-foreground opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 motion-reduce:transition-none"
                          aria-hidden="true"
                        />
                      </span>
                      <span className="font-sans text-sm text-muted-foreground">{education.degree}</span>
                    </span>
                  </span>
                  <span className="flex-none text-right text-xs tabular-nums text-muted-foreground">
                    {education.start}–{education.end}
                  </span>
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </BlurFade>
            ))}
          </ul>
        </div>
      </section>

      <section id="skills" aria-labelledby="skills-heading">
        <div className="flex min-h-0 flex-col gap-y-4">
          <BlurFade delay={BLUR_FADE_DELAY * 10}>
            <h2 id="skills-heading" className="text-xl font-bold">
              Skills
            </h2>
          </BlurFade>
          <ul className="flex flex-wrap gap-2">
            {DATA.skills.map((skill, index) => (
              <BlurFade as="li" key={skill.name} delay={BLUR_FADE_DELAY * 11 + index * 0.03}>
                <span className="flex h-8 w-fit items-center gap-2 rounded-xl border border-border bg-background px-4 ring-2 ring-border/20">
                  <skill.icon className="size-4 overflow-hidden rounded object-contain" aria-hidden="true" />
                  <span className="text-sm font-medium text-foreground">{skill.name}</span>
                </span>
              </BlurFade>
            ))}
          </ul>
        </div>
      </section>

      <section id="writing" aria-labelledby="writing-heading">
        <BlurFade delay={BLUR_FADE_DELAY * 12}>
          <WritingSection />
        </BlurFade>
      </section>

      <section id="coffee" aria-labelledby="coffee-heading" className="scroll-mt-8">
        <BlurFade delay={BLUR_FADE_DELAY * 13}>
          <CoffeeSection />
        </BlurFade>
      </section>

      <section id="contact" aria-labelledby="contact-heading" className="pt-4">
        <BlurFade delay={BLUR_FADE_DELAY * 14}>
          <ContactSection />
        </BlurFade>
      </section>
    </div>
  );
}
