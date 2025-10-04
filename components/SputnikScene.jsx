import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";


export default function SputnikScene() {

    gsap.registerPlugin(SplitText, ScrollTrigger, useGSAP);

    const containerRef = useRef(null);

    const lines = [
        "Sputnik 1 — humanity’s first artificial satellite.",
        "Launched by the Soviet Union on October 4, 1957.",
        "it circled Earth for three months, beeping radio signals into the void.",
        "In January 1958, it blazed back through the atmosphere, burning into history."
    ];

    useGSAP(() => {
        const ctx = gsap.context(() => {
            gsap.to(".earth", {
                scale: 1.5,
                y: "10%",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "80% bottom",
                    end: "bottom bottom",
                    scrub: true,
                },
            });

            const contentTimeLine = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 40%",
                    end: "bottom 90%",
                    toggleActions: "play reverse play reverse",
                },
            });

            const splitTitle = new SplitText(".sputnik-title", { type: "chars, words" });

            contentTimeLine.from(splitTitle.chars, {
                opacity: 0,
                y: 40,
                rotateX: -90,
                duration: 0.8,
                stagger: {
                    each: 0.05,
                    from: "random",
                    grid: "auto",
                },
                ease: "back.out(2)",
            });

            contentTimeLine.from(".sputnik-image", {
                opacity: 0,
                duration: 0.5,
                ease: "power1.inOut",
            });

            const lineEls = containerRef.current.querySelectorAll(".line-inner");

            contentTimeLine.fromTo(lineEls,
                { opacity: 0, y: 30, filter: "blur(4px)" },
                { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.5, stagger: 0.3 }
            );

            gsap.to(".sputnik-image", {
                y: "+=20",
                rotation: 5,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                duration: 4,
            });

        }, containerRef);

        return () => ctx.revert();
    });

    return (
        <div
            ref={containerRef}
            className="scene-wrapper relative w-screen h-screen overflow-hidden bg-black flex items-center justify-center"
        >
            <img
                src="assets/earth.gif"
                className="earth blur-[6px] absolute bottom-[-60%] left-[-30%] w-[70vw] max-w-none"
                alt="Earth"
            />

            <div className="flex flex-col items-center justify-center gap-6 px-4 text-center max-w-3xl">

                <h1 className="sputnik-title font-orbitron-bold text-white text-4xl md:text-6xl">
                    Sputnik 1 – 1957
                </h1>

                <div className="sputnik-image absolute w-[500px] h-[500px] bg-purple-500/20 blur-3xl rounded-full"></div>


                <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWuuN8wPT-2aDDqrjKkbnofvwkMCbFkfJboQ&s"
                    alt="Sputnik Satellite"
                    className="sputnik-image w-50 md:w-52 lg:w-90 drop-shadow-[0_0_20px_rgba(200,200,255,0.6)] rounded-lg"
                />


                <div className="text-base md:text-xl lg:text-2xl font-exo2 font-light tracking-wide md:tracking-wider leading-relaxed md:leading-loose space-y-4 text-white drop-shadow-[0_0_6px_rgba(0,0,0,0.7)]">
                    {lines.map((text, i) => (
                        <div key={i} className="line overflow-hidden">
                            <div className="line-inner">{text}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

}
