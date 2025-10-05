import { AuroraText } from "@/components/ui/aurora-text";
 
export function RainbowText({normalText, standoutText}: {normalText: string, standoutText: string}) {
  return (
    <h1 className="text-3xl font-bold tracking-tighter md:text-3xl lg:text-5xl font-merriweather">
      {normalText} <AuroraText>{standoutText}</AuroraText>
    </h1>
  );
}