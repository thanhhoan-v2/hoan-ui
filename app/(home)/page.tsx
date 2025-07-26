import {
    BecomeSponsor,
    DashedCircle,
    DashedLineContainer,
    Feature,
    GetStarted,
    Github,
    HorizontalDashedLine,
    VerticalDashedLine,
} from "./page.client"

export default function HomePage() {
  return (
    <div className="mx-auto px-4 py-12 container">
      <div className="flex flex-col items-center py-32 text-center">
        <DashedLineContainer>
          <VerticalDashedLine
            className="md:-left-10"
            width="calc(100% + 80px)"
            mobileWidth="100%"
          />
          <h1 className="relative py-5 font-bold text-5xl sm:text-7xl">
            HoanUI
          </h1>
          <VerticalDashedLine />

          <div className="flex flex-col items-center px-4 py-10">
            <p className="max-w-2xl text-muted-foreground text-xl">
              <span className="font-medium text-primary">HoanUI</span> is a
              collection of{" "}
              <span className="font-medium text-primary">
                reusable components
              </span>{" "}
              that you can{" "}
              <span className="font-medium text-primary">copy and paste</span>{" "}
              into your web apps.
            </p>
          </div>
          <VerticalDashedLine />

          <div className="flex justify-center items-center">
            <div className="relative flex flex-col justify-center items-center gap-4 px-8 py-10">
              <div className="flex flex-wrap justify-center gap-4">
                <GetStarted />
                <Github />
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <span className="text-green-500">✓</span>
                  Open Source
                </div>
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <span className="text-green-500">✓</span>
                  MIT License
                </div>
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <span className="text-green-500">✓</span>
                  Customizable
                </div>
              </div>

              <HorizontalDashedLine
                className="hidden md:block"
                height="calc(100% + 56px)"
                side="left"
              />
              <HorizontalDashedLine
                className="hidden md:block"
                height="calc(100% + 56px)"
                side="right"
              />
            </div>
          </div>

          <VerticalDashedLine />

          <HorizontalDashedLine
            className="-top-14"
            height="calc(100% + 112px)"
            side="left"
          />
          <HorizontalDashedLine
            className="-top-14"
            height="calc(100% + 112px)"
            side="right"
          />
          <DashedCircle className="-top-12 -left-12" />
        </DashedLineContainer>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-20 border-primary/20 border-r border-dashed">
        {features.map((feature) => (
          <Feature key={feature.title} {...feature} />
        ))}
      </div>

      <div className="border-primary/20 border-t border-dashed">
        <BecomeSponsor />
      </div>
    </div>
  )
}

const features = [
  {
    title: "Highly Customizable",
    description:
      "Inherits shadcn/ui's design philosophy with Radix UI's powerful declarative components",
  },
  {
    title: "Great Developer Experience",
    description:
      "Declarative API design, reduced boilerplate code, improved development efficiency",
  },
  {
    title: "Accessibility First",
    description:
      "Built on Radix UI's accessibility support with beautiful animations",
  },
  {
    title: "Theme System",
    description:
      "Built-in light/dark modes with support for custom theme colors and styles",
  },
  {
    title: "TypeScript First",
    description:
      "Complete TypeScript type support with intelligent code suggestions",
  },
  {
    title: "Responsive Design",
    description:
      "Optimized for different devices ensuring great cross-platform experience",
  },
]
