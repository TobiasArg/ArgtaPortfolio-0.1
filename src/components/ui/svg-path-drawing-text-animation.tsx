import { useEffect, useId, useState } from "react";

interface PathAnimationProps {
    text: string;
    fontSize?: number;
    className?: string;
    duration?: string;
}

const PathAnimation = ({
    text,
    fontSize = 88,
    className = "",
    duration = "4s"
}: PathAnimationProps) => {
    const gradientId = useId().replace(/:/g, "");
    const [isDrawn, setIsDrawn] = useState(false);

    const letterSpacingEm = 0.2;
    const estimatedGlyphWidth = 0.62;
    const textLength = Math.max(text.length, 1);
    const estimatedTextWidth =
        fontSize *
        (textLength * estimatedGlyphWidth + Math.max(0, textLength - 1) * letterSpacingEm);
    const horizontalPadding = fontSize * 0.8;
    const viewBoxWidth = Math.max(320, Math.ceil(estimatedTextWidth + horizontalPadding * 2));
    const viewBoxHeight = Math.max(120, Math.ceil(fontSize * 2));
    const dashLength = Math.max(2200, Math.ceil(viewBoxWidth * 3));

    useEffect(() => {
        const raf = requestAnimationFrame(() => setIsDrawn(true));
        return () => cancelAnimationFrame(raf);
    }, [text, fontSize, duration, dashLength]);

    return (
        <div className={`flex justify-center items-center ${className}`}>
            <svg
                width="100%"
                viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
                preserveAspectRatio="xMidYMid meet"
                className="block w-full h-auto max-w-full overflow-visible"
                style={{ aspectRatio: `${viewBoxWidth} / ${viewBoxHeight}` }}
            >
                <defs>
                    <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#f97316" /> {/* orange-500 */}
                        <stop offset="100%" stopColor="#fbbf24" /> {/* amber-400 */}
                    </linearGradient>
                </defs>

                <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="none"
                    stroke={`url(#${gradientId})`}
                    strokeWidth="1.5"
                    fontSize={fontSize}
                    fontWeight="200"
                    letterSpacing={`${letterSpacingEm}em`}
                    fontFamily="ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
                    style={{
                        strokeDasharray: `${dashLength}`,
                        strokeDashoffset: isDrawn ? 0 : dashLength,
                        transition: `stroke-dashoffset ${duration} cubic-bezier(0.42, 0, 0.58, 1)`,
                        filter: 'drop-shadow(0 0 8px rgba(249, 115, 22, 0.4))'
                    }}
                >
                    {text}
                </text>
            </svg>
        </div>
    );
};

export default PathAnimation;
