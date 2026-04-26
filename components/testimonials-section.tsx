import { ScrollSweepDivider } from "@/components/scroll-sweep-divider";

const items = [
  {
    quote:
      "Running under my own authority, I need a carrier that’s honest about the load and quick when something changes. FNX has been that—clear freight, no runaround, and people who pick up the phone.",
    name: "Enzo C.",
    role: "Owner Operator",
  },
  {
    quote:
      "As an owner operator, your truck is your business. Here I get straight answers before I book the lane, and pay has been consistent. It feels like they respect what it takes to keep iron on the road.",
    name: "Makalister S.",
    role: "Owner Operator",
  },
  {
    quote:
      "I’m a company driver, not running my own equipment—so dispatch and how you’re treated day to day matter most. The team is direct, the gear is in good shape, and I can focus on driving without chasing loose ends.",
    name: "Gustavo H.",
    role: "Driver",
  },
] as const;

export function TestimonialsSection() {
  return (
    <section
      aria-labelledby="testimonials-heading"
      className="scroll-mt-28 bg-[#F5F5F7] pb-[120px] pt-0 lg:scroll-mt-20"
      id="testimonials"
    >
      <ScrollSweepDivider />
      <div className="mx-auto w-full max-w-7xl px-6 pt-[120px] md:px-12">
        <h2 className="type-title-section" id="testimonials-heading">
          What partners say
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-8 text-[#64748B]">
          Owner operators and company drivers on what it’s like to run with FNX.
        </p>
        <ul className="mt-12 grid list-none grid-cols-1 gap-10 md:grid-cols-3 md:gap-6 lg:gap-8">
          {items.map((item) => (
            <li
              className="flex min-h-0 flex-col"
              key={item.name}
            >
              <blockquote className="m-0 flex flex-1 flex-col">
                <p className="text-base leading-8 text-[#334155]">“{item.quote}”</p>
                <footer className="mt-6 text-sm">
                  <p className="font-semibold text-[#0F172A]">{item.name}</p>
                  <p className="mt-0.5 text-[#64748B]">{item.role}</p>
                </footer>
              </blockquote>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
