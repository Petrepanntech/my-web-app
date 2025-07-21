import Image from "next/image";

const logos = [
    { src: "/logos/logo1.svg", alt: "TechCrunch" },
    { src: "/logos/logo2.svg", alt: "TechCabal" },
    { src: "/logos/logo3.svg", alt: "Benjaminada" },
    { src: "/logos/logo4.svg", alt: "The Guardian" },
    { src: "/logos/logo5.svg", alt: "Business Day" },
];

// Placeholder for SVG logos
const PlaceholderLogo = ({ alt }: { alt: string }) => (
    <div className="flex items-center justify-center h-10 w-32 bg-muted rounded-md">
      <span className="text-muted-foreground text-sm font-semibold">{alt}</span>
    </div>
);


export function SocialProof() {
  return (
    <section className="w-full py-12 md:py-16 bg-secondary">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <h3 className="text-lg font-semibold text-muted-foreground">As featured in</h3>
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
                {logos.map(logo => <PlaceholderLogo key={logo.alt} alt={logo.alt} />)}
            </div>
        </div>
      </div>
    </section>
  );
}
