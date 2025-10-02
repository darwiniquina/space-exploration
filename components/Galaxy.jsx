import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";

export default function Galaxy() {
    gsap.registerPlugin(SplitText, useGSAP);

    const containerRef = useRef(null);

    useGSAP(() => {
        let splitTitle;

        const ctx = gsap.context(() => {
            const stars = gsap.utils.toArray(".star");

            splitTitle = new SplitText(".galaxy-text", { type: "chars, words" });

            const tl = gsap.timeline();
            tl.from(splitTitle.chars, {
                opacity: 0,
                y: -50,
                rotateX: -90,
                filter: "blur(6px)",
                transformOrigin: "center center",
                stagger: 0.06,
                duration: 1.2,
                ease: "power3.out",
            }).to(
                splitTitle.chars,
                {
                    filter: "blur(0px)",
                    duration: 0.8,
                    ease: "sine.out",
                },
                "-=1"
            );

            tl.fromTo(
                stars,
                { scale: 0, opacity: 0 },
                {
                    scale: 1,
                    opacity: 1,
                    stagger: { each: 0.05, from: "center", grid: "auto" },
                    duration: 0.6,
                    ease: "back.out(2)",
                }
            ).to(stars, {
                opacity: gsap.utils.wrap([0.3, 1]),
                duration: 1.5,
                stagger: { each: 0.1, repeat: -1, yoyo: true },
                ease: "sine.inOut",
            });
        }, containerRef);

        return () => {
            ctx.revert();
            splitTitle?.revert();
        };
    });

    const stars = Array.from({ length: 150 });

    return (
        <div
            ref={containerRef}
            className="w-screen h-screen bg-black relative overflow-hidden"
        >
            {stars.map((_, i) => {
                const top = Math.random() * 100;
                const left = Math.random() * 100;
                const size = Math.random() * 4 + 2;
                return (
                    <div
                        key={i}
                        className="star absolute rounded-full bg-white"
                        style={{
                            top: `${top}%`,
                            left: `${left}%`,
                            width: `${size}px`,
                            height: `${size}px`,
                        }}
                    />
                );
            })}

            <div className="absolute inset-0 flex items-center justify-center">
                <h1 className="galaxy-text font-orbitron-bold 
                text-white
                        text-5xl sm:text-4xl md:text-5xl lg:text-6xl 
                        font-bold tracking-wide text-center 
                        px-4 drop-shadow-[0_0_15px_rgba(150,100,255,0.5)]">
                    A Journey Through Space Exploration
                </h1>
            </div>
        </div>
    );
}
