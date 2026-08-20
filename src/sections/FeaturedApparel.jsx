import { ArrowRight } from "lucide-react";

const apparel = [
  {
    title: "Purple Logo Tee",
    color: "Purple / Black",
    price: "$30",
    image: "/images/apparel/purple-logo-tee.png",
    hoverImage: "/images/apparel/purple-logo-tee.png",
    link: "#",
    status: "Available Now",
    stockNote: "Only A Few Remain",
    sizes: [
      { size: "XS", available: false },
      { size: "S", available: false },
      { size: "M", available: false },
      { size: "L", available: true },
      { size: "XL", available: true },
      { size: "XXL", available: false },
    ],
  },
  {
    title: "Mile High Crewneck",
    color: "Royal / Orange / Cream",
    price: "$45",
    image: "/images/apparel/mile-high-crewneck-front.png",
    hoverImage: "/images/apparel/mile-high-crewneck-back.png",
    link: "#",
    status: "Pre-Order Now!",
    sizes: [
      { size: "XS", available: true },
      { size: "S", available: true },
      { size: "M", available: true },
      { size: "L", available: true },
      { size: "XL", available: true },
      { size: "XXL", available: true },
    ],
  },
  {
    title: "Lucid Pink Tank",
    color: "Pink / Purple",
    price: "$30",
    image: "/images/apparel/pink-tank-front.png",
    hoverImage: "/images/apparel/pink-tank-back.png",
    link: "#",
    status: "Coming Soon",
    sizes: [
      { size: "XS", available: false },
      { size: "S", available: false },
      { size: "M", available: false },
      { size: "L", available: false },
      { size: "XL", available: false },
      { size: "XXL", available: false },
    ],
  },
  {
    title: "Black Muscle Tank",
    color: "Black / Purple",
    price: "$30",
    image: "/images/apparel/black-muscle-tank-front.png",
    hoverImage: "/images/apparel/black-muscle-tank-back.png",
    link: "#",
    status: "Coming Soon",
    sizes: [
      { size: "XS", available: false },
      { size: "S", available: false },
      { size: "M", available: false },
      { size: "L", available: false },
      { size: "XL", available: false },
      { size: "XXL", available: false },
    ],
  },
];

export const FeaturedApparel = () => {
  const handleSizeClick = (item, size) => {
    if (!size.available) return;

    // Cart functionality will go here later.
    console.log(`Selected ${item.title} - ${size.size}`);
  };

  return (
    <section
      id="featured-apparel"
      className="relative overflow-hidden bg-white py-16 text-black md:py-20"
    >
      <div className="mx-auto w-full max-w-[1700px] px-4 sm:px-6 lg:px-8">
        {/* =====================================
            SECTION HEADER
        ====================================== */}
        <div className="mb-8 flex flex-col gap-4 border-b border-black/10 pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-black/45">
              Lucid Lifting
            </p>

            <h2 className="text-2xl font-black uppercase tracking-tight sm:text-3xl md:text-4xl">
              Collection 001
            </h2>
          </div>

          <a
            href="#featured-apparel"
            className="group inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.08em]"
          >
            View All
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>

        {/* =====================================
            PRODUCT GRID
        ====================================== */}
        <div className="grid grid-cols-1 gap-x-3 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {apparel.map((item) => (
            <div
              key={item.title}
              className="group block"
            >
              {/* =====================================
                  PRODUCT IMAGE AREA
              ====================================== */}
              <div className="relative aspect-[4/5] overflow-hidden bg-[#f5f5f5]">
                <a
                  href={item.link}
                  className="absolute inset-0"
                  aria-label={`View ${item.title}`}
                >
                  {/* Front */}
                  <img
                    src={item.image}
                    alt={`${item.title} front`}
                    className="absolute inset-0 h-full w-full object-contain p-6 opacity-100 transition-all duration-500 ease-out group-hover:scale-[1.025] group-hover:opacity-0 md:p-8"
                  />

                  {/* Back / Hover */}
                  <img
                    src={item.hoverImage}
                    alt={`${item.title} back`}
                    className="absolute inset-0 h-full w-full object-contain p-6 opacity-0 transition-all duration-500 ease-out group-hover:scale-[1.025] group-hover:opacity-100 md:p-8"
                  />
                </a>

                {/* =====================================
                    STATUS BADGE — LEFT
                ====================================== */}
                <span
                  className="absolute bottom-3 left-3 z-20 bg-black px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-white transition-all duration-300 group-hover:bottom-[72px]"
                >
                  {item.status}
                </span>

                {/* =====================================
                    STOCK NOTE — RIGHT
                    Purple Tee only
                ====================================== */}
                {item.stockNote && (
                  <span
                    className="
                      absolute bottom-3 right-3 z-20
                      border border-black/20
                      bg-white
                      px-2.5 py-1.5
                      text-[10px] font-bold uppercase
                      tracking-[0.12em]
                      text-black
                      transition-all duration-300
                      group-hover:bottom-[72px]
                    "
                  >
                    {item.stockNote}
                  </span>
                )}

                {/* =====================================
                    SIZE SELECTOR
                ====================================== */}
                <div
                  className="
                    absolute inset-x-0 bottom-0 z-30
                    translate-y-full
                    border-t border-black/10
                    bg-white/95
                    px-3 py-3
                    opacity-0
                    backdrop-blur-sm
                    transition-all duration-300 ease-out
                    group-hover:translate-y-0
                    group-hover:opacity-100
                    group-focus-within:translate-y-0
                    group-focus-within:opacity-100
                  "
                >
                  <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.16em] text-black/50">
                    Select Size
                  </p>

                  <div className="grid grid-cols-6 gap-1.5">
                    {item.sizes.map((size) => (
                      <button
                        key={size.size}
                        type="button"
                        disabled={!size.available}
                        onClick={() =>
                          handleSizeClick(item, size)
                        }
                        aria-label={`${size.size} ${
                          size.available
                            ? "available"
                            : "sold out"
                        }`}
                        className={`
                          relative flex h-9 items-center justify-center
                          border text-[10px] font-semibold uppercase
                          transition-all duration-200
                          ${
                            size.available
                              ? `
                                cursor-pointer
                                border-black
                                bg-white
                                text-black
                                hover:bg-black
                                hover:text-white
                              `
                              : `
                                cursor-not-allowed
                                border-black/10
                                bg-black/[0.03]
                                text-black/25
                              `
                          }
                        `}
                      >
                        {size.size}

                        {!size.available && (
                          <span className="pointer-events-none absolute left-1/2 top-1/2 h-px w-7 -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-black/20" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* =====================================
                  PRODUCT INFORMATION
              ====================================== */}
              <div className="pt-3">
                <a href={item.link}>
                  <h3 className="text-sm font-bold uppercase tracking-[0.03em] transition-opacity hover:opacity-60">
                    {item.title}
                  </h3>
                </a>

                <p className="mt-1 text-sm text-black/50">
                  {item.color}
                </p>

                <p className="mt-2 text-sm font-semibold">
                  {item.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};