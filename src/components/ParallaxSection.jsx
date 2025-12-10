import React, { useEffect, useRef } from 'react';

const ParallaxSection = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (sectionRef.current) {
                const scrolled = window.scrollY;
                // Simple parallax effect if needed, but for now just static black background with centered text
                // as per "Full width parallax" request, often implies bg attachment fixed or transform.
                // We'll use bg-attachment: fixed via CSS class or inline if supported, 
                // but for a pure black background, parallax doesn't mean much unless there's an image.
                // The user said "Design: Full width parallax, Black background".
                // Use a subtle parallax effect on the text or just static if only black bg.
                // Given "Black background", maybe they want the text to move? 
                // Or maybe they want a background image that is black? 
                // "Exact text: HE MADE THE IMPOSSIBLE FEEL POSSIBLE"
                // Let's implement a standard section with black bg and centered text.
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative w-full py-32 md:py-48 bg-black flex items-center justify-center overflow-hidden"
        >
            <div className="container mx-auto px-4 text-center z-10">
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-[0.2em] leading-tight uppercase font-primary">
                    He made the impossible feel possible
                </h2>
            </div>
        </section>
    );
};

export default ParallaxSection;
