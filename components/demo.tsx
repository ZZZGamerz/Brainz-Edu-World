import { GlowCard } from "@/components/ui/spotlight-card";

export function Default(){
  return(
    <div className="w-screen h-screen flex flex-row items-center justify-center gap-10 custom-cursor">
      <GlowCard size="md">
        <div className="text-white text-center">Card 1 Content</div>
      </GlowCard>
      <GlowCard size="md">
        <div className="text-white text-center">Card 2 Content</div>
      </GlowCard>
      <GlowCard size="md">
        <div className="text-white text-center">Card 3 Content</div>
      </GlowCard>
    </div>
  );
};
