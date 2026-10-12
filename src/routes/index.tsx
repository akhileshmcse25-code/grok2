import { createFileRoute } from "@tanstack/react-router";
import { AstronautStage } from "@/components/astronaut-stage";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <>
      <div className="cosmic" aria-hidden="true">
        <div className="nebula nebula-a" />
        <div className="nebula nebula-b" />
        <div className="vignette" />
      </div>
      <AstronautStage />
      <p className="hint">Scroll down</p>
      <main className="scrollport">
        <div className="runway" />
      </main>
    </>
  );
}
