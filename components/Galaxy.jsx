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
                filter: "blur(6px)",
                transformOrigin: "center center",
                stagger: 0.06,
                duration: 1.2,
                ease: "power3.out",
            })


            tl.fromTo(
                stars,
                { scale: 0, opacity: 0 },
                {
                    scale: 1,
                    opacity: 1,
                    stagger: { each: 0.05, from: "center", grid: "auto" },
                    duration: 0.05,
                    ease: "back.out(2)",
                }
            ).to(stars, {
                opacity: gsap.utils.wrap([0.3, 1]),
                duration: 1.5,
                stagger: { each: 0.1, },
                ease: "sine.inOut",
            });

            gsap.to(".galaxy-text", {
                y: "-100%",
                opacity: 0,
                scale: 0,
                transformOrigin: "bottom center",
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "50% top",
                    scrub: true,
                    pin: true,
                },
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
                        className="star absolute rounded-full bg-white blur-[2px]"
                        style={{
                            top: `${top}%`,
                            left: `${left}%`,
                            width: `${size}px`,
                            height: `${size}px`,
                        }}
                    />
                );
            })}


            <div
                className="absolute w-full flex justify-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"

            >
                <h1 className="galaxy-text font-orbitron-bold 
                    text-white
                    text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl
                    font-bold tracking-wide text-center 
                    px-4 drop-shadow-[0_0_15px_rgba(150,100,255,0.5)]"
                    style={{
                        transform: "rotateX(0deg) scaleX(1) scaleY(1) skewX(0deg)",
                        transformOrigin: "bottom center",
                    }}
                >
                    A Journey Through Space Exploration
                </h1>
            </div>
        </div>
    );
}
