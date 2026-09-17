import { useEffect, useRef, useState, useId } from "react";
import { createPortal } from "react-dom";
import mermaid from "mermaid";
import {
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Copy,
  Loader2,
  RefreshCw,
  RotateCcw,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";

type MermaidViewerProps = {
  chart: string;
  className?: string;
  title?: string;
};

export function MermaidViewer({ chart, className = "", title = "Architecture Diagram" }: MermaidViewerProps) {
  const [svgContent, setSvgContent] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isExpanded, setIsExpanded] = useState(false);

  // Full-screen canvas zoom & pan state
  const [fullZoom, setFullZoom] = useState(1);
  const [fullPan, setFullPan] = useState({ x: 0, y: 0 });
  const [isFullDragging, setIsFullDragging] = useState(false);
  const [fullDragStart, setFullDragStart] = useState({ x: 0, y: 0 });

  const containerRef = useRef<HTMLDivElement>(null);
  const fullContainerRef = useRef<HTMLDivElement>(null);
  const uniqueId = useId().replace(/[^a-zA-Z0-9]/g, "m");

  // Handle ESC key to exit full-screen mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isExpanded) {
        setIsExpanded(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isExpanded]);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setHasError(false);

    async function renderChart() {
      try {
        // Pure Grayscale / Monochrome Black, White, & Gray Palette
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: "strict",
          suppressErrorRendering: true,
          theme: "base",
          themeVariables: {
            primaryColor: "#f4f4f5",
            primaryTextColor: "#18181b",
            primaryBorderColor: "#71717a",
            lineColor: "#52525b",
            secondaryColor: "#e4e4e7",
            secondaryTextColor: "#18181b",
            secondaryBorderColor: "#71717a",
            tertiaryColor: "#fafafa",
            tertiaryTextColor: "#18181b",
            tertiaryBorderColor: "#a1a1aa",
            clusterBkg: "#f8f9fa",
            clusterBorder: "#d4d4d8",
            edgeLabelBackground: "#ffffff",
            nodeBorder: "#71717a",
            mainBkg: "#f4f4f5",
            nodeTextColor: "#18181b",
            fontFamily: "Inter, system-ui, -apple-system, sans-serif",
            fontSize: "12px",
          },
          flowchart: {
            curve: "basis",
            htmlLabels: true,
            useMaxWidth: true,
            padding: 16,
            nodeSpacing: 35,
            rankSpacing: 40,
          },
        });

        const renderId = `m${uniqueId}${Math.floor(Math.random() * 10000)}`;
        const cleanChart = chart.trim();
        const { svg } = await mermaid.render(renderId, cleanChart);

        if (isMounted) {
          setSvgContent(svg);
          setLoading(false);
        }
      } catch (err) {
        console.error("Mermaid render error:", err);
        const errorNodes = document.querySelectorAll('[id^="dmermaid"]');
        errorNodes.forEach((node) => node.remove());

        if (isMounted) {
          setHasError(true);
          setLoading(false);
        }
      }
    }

    renderChart();

    return () => {
      isMounted = false;
      const errorNodes = document.querySelectorAll('[id^="dmermaid"]');
      errorNodes.forEach((node) => node.remove());
    };
  }, [chart, uniqueId]);

  const copyDefinition = async () => {
    try {
      await navigator.clipboard.writeText(chart.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  // Inline canvas pan/zoom controls
  const handleZoomIn = () => setZoom((prev) => Math.min(Number((prev + 0.2).toFixed(2)), 3.5));
  const handleZoomOut = () => setZoom((prev) => Math.max(Number((prev - 0.2).toFixed(2)), 0.35));
  const handleReset = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };
  const handlePan = (dx: number, dy: number) => {
    setPan((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
  };

  // Fullscreen canvas pan/zoom controls
  const handleFullZoomIn = () => setFullZoom((prev) => Math.min(Number((prev + 0.2).toFixed(2)), 4.0));
  const handleFullZoomOut = () => setFullZoom((prev) => Math.max(Number((prev - 0.2).toFixed(2)), 0.3));
  const handleFullReset = () => {
    setFullZoom(1);
    setFullPan({ x: 0, y: 0 });
  };
  const handleFullPan = (dx: number, dy: number) => {
    setFullPan((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
  };

  // Inline mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
  };
  const handleMouseUp = () => setIsDragging(false);

  // Inline touch drag handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setDragStart({ x: e.touches[0].clientX - pan.x, y: e.touches[0].clientY - pan.y });
    }
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    setPan({ x: e.touches[0].clientX - dragStart.x, y: e.touches[0].clientY - dragStart.y });
  };
  const handleTouchEnd = () => setIsDragging(false);

  const handleWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey || e.metaKey || e.altKey) {
      e.preventDefault();
      const delta = e.deltaY < 0 ? 0.15 : -0.15;
      setZoom((prev) => Math.min(Math.max(Number((prev + delta).toFixed(2)), 0.35), 3.5));
    }
  };

  // Fullscreen mouse drag handlers
  const handleFullMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    setIsFullDragging(true);
    setFullDragStart({ x: e.clientX - fullPan.x, y: e.clientY - fullPan.y });
  };
  const handleFullMouseMove = (e: React.MouseEvent) => {
    if (!isFullDragging) return;
    setFullPan({ x: e.clientX - fullDragStart.x, y: e.clientY - fullDragStart.y });
  };
  const handleFullMouseUp = () => setIsFullDragging(false);

  // Fullscreen touch drag handlers
  const handleFullTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsFullDragging(true);
      setFullDragStart({ x: e.touches[0].clientX - fullPan.x, y: e.touches[0].clientY - fullPan.y });
    }
  };
  const handleFullTouchMove = (e: React.TouchEvent) => {
    if (!isFullDragging || e.touches.length !== 1) return;
    setFullPan({ x: e.touches[0].clientX - fullDragStart.x, y: e.touches[0].clientY - fullDragStart.y });
  };
  const handleFullTouchEnd = () => setIsFullDragging(false);

  const handleFullWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey || e.metaKey || e.altKey) {
      e.preventDefault();
      const delta = e.deltaY < 0 ? 0.15 : -0.15;
      setFullZoom((prev) => Math.min(Math.max(Number((prev + delta).toFixed(2)), 0.3), 4.0));
    }
  };

  return (
    <>
      {/* 1. Inline In-Card Viewer Component */}
      <div
        className={`relative flex flex-col rounded-xl border border-border/80 bg-card shadow-sm overflow-hidden w-full max-w-full ${className}`}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between gap-1.5 border-b border-border/60 bg-muted/30 px-2 py-1.5 sm:px-4 sm:py-2 text-xs w-full">
          <div className="min-w-0 flex-1 pr-1">
            <span className="truncate block font-mono text-[10px] sm:text-xs font-semibold text-foreground/90 max-w-[130px] sm:max-w-none">
              {title}
            </span>
          </div>

          {/* Top-Right Controls */}
          <div className="flex items-center gap-1 shrink-0">
            {/* Full-width / Pop-up Full View Button */}
            <Button
              type="button"
              size="sm"
              variant="ghost"
              className="h-6.5 sm:h-7 px-1.5 sm:px-2 text-[10px] sm:text-xs font-mono text-muted-foreground hover:text-foreground hover:bg-muted rounded-md border border-border/50 gap-1 shrink-0 cursor-pointer"
              onClick={() => {
                setFullZoom(1);
                setFullPan({ x: 0, y: 0 });
                setIsExpanded(true);
              }}
              title="Open full view architecture overlay"
              aria-label="Open full view architecture overlay"
            >
              <svg className="size-3.5 shrink-0" viewBox="0 0 16 16" fill="currentColor">
                <path d="M5.22 3.22a.75.75 0 0 1 1.06 1.06L3.81 6.75H12.19l-2.47-2.47a.75.75 0 1 1 1.06-1.06l3.75 3.75a.75.75 0 0 1 0 1.06l-3.75 3.75a.75.75 0 1 1-1.06-1.06l2.47-2.47H3.81l2.47 2.47a.75.75 0 1 1-1.06 1.06L1.47 7.81a.75.75 0 0 1 0-1.06l3.75-3.53z" />
              </svg>
              <span className="hidden sm:inline">Full View</span>
            </Button>

            {/* Copy Code Button */}
            <Button
              type="button"
              size="sm"
              variant="ghost"
              className="h-6.5 sm:h-7 px-1.5 sm:px-2 text-[10px] sm:text-xs font-mono text-muted-foreground hover:text-foreground hover:bg-muted rounded-md border border-border/50 shrink-0 cursor-pointer"
              onClick={copyDefinition}
              title="Copy diagram source"
              aria-label="Copy diagram source"
            >
              {copied ? (
                <Check className="size-3.5 text-emerald-500" />
              ) : (
                <Copy className="size-3.5" />
              )}
            </Button>
          </div>
        </div>

        {/* Inline Diagram Canvas with Touch and Drag */}
        <div
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onWheel={handleWheel}
          className={`relative w-full max-w-full overflow-hidden p-2.5 sm:p-5 flex items-start justify-center select-none bg-muted/10 min-h-[280px] sm:min-h-[340px] md:min-h-[400px] touch-none ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
        >
          {loading ? (
            <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground py-10 w-full">
              <Loader2 className="size-5 sm:size-6 animate-spin text-primary" />
              <span className="text-[11px] sm:text-xs font-mono">Rendering diagram...</span>
            </div>
          ) : hasError ? (
            <div className="p-4 text-center text-xs text-muted-foreground font-mono flex flex-col items-center gap-2 w-full">
              <span>Unable to render diagram preview.</span>
              <Button
                type="button"
                size="sm"
                variant="outline"
                className="text-xs h-7 rounded-md mt-1 cursor-pointer"
                onClick={() => window.location.reload()}
              >
                <RefreshCw className="size-3 mr-1.5" />
                Retry
              </Button>
            </div>
          ) : (
            <div
              className="transition-transform duration-75 ease-out origin-top flex items-center justify-center w-full"
              style={{
                transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
              }}
            >
              <div
                className="w-full flex items-center justify-center [&_svg]:max-w-full [&_svg]:h-auto [&_svg]:mx-auto [&_.node]:cursor-default"
                dangerouslySetInnerHTML={{ __html: svgContent }}
              />
            </div>
          )}

          {/* Bottom-Right D-Pad Navigation & Zoom Widget */}
          {!loading && !hasError && (
            <div
              className="absolute bottom-1.5 right-1.5 sm:bottom-3 sm:right-3 z-20 grid grid-cols-3 grid-rows-3 gap-0.5 sm:gap-1 rounded-lg sm:rounded-xl border border-border/80 bg-background/95 p-1 shadow-lg backdrop-blur-md scale-90 sm:scale-100 origin-bottom-right"
              onMouseDown={(e) => e.stopPropagation()}
              onMouseUp={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
              onTouchEnd={(e) => e.stopPropagation()}
              onWheel={(e) => e.stopPropagation()}
            >
              {/* Row 1 */}
              <div className="size-6 sm:size-7" />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="size-6 sm:size-7 text-muted-foreground hover:text-foreground hover:bg-muted active:scale-95 transition-transform rounded border border-border/40 cursor-pointer"
                onMouseDown={(e) => e.stopPropagation()}
                onTouchStart={(e) => e.stopPropagation()}
                onClick={(e) => {
                  e.stopPropagation();
                  handlePan(0, 50);
                }}
                title="Pan up"
                aria-label="Pan up"
              >
                <ChevronUp className="size-3.5" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="size-6 sm:size-7 text-muted-foreground hover:text-foreground hover:bg-muted active:scale-95 transition-transform rounded border border-border/40 cursor-pointer"
                onMouseDown={(e) => e.stopPropagation()}
                onTouchStart={(e) => e.stopPropagation()}
                onClick={(e) => {
                  e.stopPropagation();
                  handleZoomIn();
                }}
                title="Zoom in"
                aria-label="Zoom in"
              >
                <ZoomIn className="size-3.5" />
              </Button>

              {/* Row 2 */}
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="size-6 sm:size-7 text-muted-foreground hover:text-foreground hover:bg-muted active:scale-95 transition-transform rounded border border-border/40 cursor-pointer"
                onMouseDown={(e) => e.stopPropagation()}
                onTouchStart={(e) => e.stopPropagation()}
                onClick={(e) => {
                  e.stopPropagation();
                  handlePan(50, 0);
                }}
                title="Pan left"
                aria-label="Pan left"
              >
                <ChevronLeft className="size-3.5" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="size-6 sm:size-7 text-muted-foreground hover:text-foreground hover:bg-muted active:scale-95 transition-transform rounded border border-border/40 cursor-pointer"
                onMouseDown={(e) => e.stopPropagation()}
                onTouchStart={(e) => e.stopPropagation()}
                onClick={(e) => {
                  e.stopPropagation();
                  handleReset();
                }}
                title="Reset view"
                aria-label="Reset view"
              >
                <RotateCcw className="size-3" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="size-6 sm:size-7 text-muted-foreground hover:text-foreground hover:bg-muted active:scale-95 transition-transform rounded border border-border/40 cursor-pointer"
                onMouseDown={(e) => e.stopPropagation()}
                onTouchStart={(e) => e.stopPropagation()}
                onClick={(e) => {
                  e.stopPropagation();
                  handlePan(-50, 0);
                }}
                title="Pan right"
                aria-label="Pan right"
              >
                <ChevronRight className="size-3.5" />
              </Button>

              {/* Row 3 */}
              <div className="size-6 sm:size-7" />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="size-6 sm:size-7 text-muted-foreground hover:text-foreground hover:bg-muted active:scale-95 transition-transform rounded border border-border/40 cursor-pointer"
                onMouseDown={(e) => e.stopPropagation()}
                onTouchStart={(e) => e.stopPropagation()}
                onClick={(e) => {
                  e.stopPropagation();
                  handlePan(0, -50);
                }}
                title="Pan down"
                aria-label="Pan down"
              >
                <ChevronDown className="size-3.5" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="size-6 sm:size-7 text-muted-foreground hover:text-foreground hover:bg-muted active:scale-95 transition-transform rounded border border-border/40 cursor-pointer"
                onMouseDown={(e) => e.stopPropagation()}
                onTouchStart={(e) => e.stopPropagation()}
                onClick={(e) => {
                  e.stopPropagation();
                  handleZoomOut();
                }}
                title="Zoom out"
                aria-label="Zoom out"
              >
                <ZoomOut className="size-4" />
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* 2. Dedicated Top-Level Full-Screen Architecture Overlay (z-[100] React Portal) */}
      {isExpanded &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] w-screen h-screen bg-background flex flex-col justify-between overflow-hidden animate-in fade-in-50 duration-200 select-none"
            role="dialog"
            aria-modal="true"
            aria-label={`${title} Full View`}
          >
            {/* Top Navigation Bar */}
            <div className="flex items-center justify-between gap-3 border-b border-border/80 bg-card/95 px-3 py-2.5 sm:px-6 sm:py-3.5 text-xs shrink-0 shadow-sm">
              <div className="flex items-center gap-2 min-w-0">
                <span className="font-bold font-display text-sm sm:text-base text-foreground truncate">
                  {title}
                </span>
                <span className="hidden sm:inline-flex rounded-full bg-primary/10 text-primary border border-primary/20 px-2.5 py-0.5 text-[11px] font-mono">
                  Full Architecture View
                </span>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  className="h-8 px-2.5 text-xs font-mono rounded-lg border-border/70 cursor-pointer"
                  onClick={copyDefinition}
                >
                  {copied ? (
                    <Check className="size-3.5 text-emerald-500 mr-1.5" />
                  ) : (
                    <Copy className="size-3.5 mr-1.5" />
                  )}
                  <span>{copied ? "Copied" : "Copy Code"}</span>
                </Button>

                <Button
                  type="button"
                  size="sm"
                  variant="secondary"
                  className="h-8 px-3 text-xs font-medium rounded-lg bg-muted hover:bg-muted/80 gap-1.5 cursor-pointer"
                  onClick={() => setIsExpanded(false)}
                >
                  <X className="size-3.5" />
                  <span>Exit Full View</span>
                </Button>
              </div>
            </div>

            {/* Expansive Full Screen Canvas with Proportional Natural Fitting */}
            <div
              ref={fullContainerRef}
              onMouseDown={handleFullMouseDown}
              onMouseMove={handleFullMouseMove}
              onMouseUp={handleFullMouseUp}
              onMouseLeave={handleFullMouseUp}
              onTouchStart={handleFullTouchStart}
              onTouchMove={handleFullTouchMove}
              onTouchEnd={handleFullTouchEnd}
              onWheel={handleFullWheel}
              className={`relative flex-1 w-full h-full overflow-hidden p-4 sm:p-8 flex items-center justify-center bg-muted/15 dark:bg-zinc-950 touch-none ${
                isFullDragging ? "cursor-grabbing" : "cursor-grab"
              }`}
            >
              <div
                className="transition-transform duration-75 ease-out origin-center flex items-center justify-center w-full h-full"
                style={{
                  transform: `translate(${fullPan.x}px, ${fullPan.y}px) scale(${fullZoom})`,
                }}
              >
                <div
                  className="w-full h-full flex items-center justify-center [&_svg]:max-w-[90vw] [&_svg]:max-h-[82vh] [&_svg]:w-auto [&_svg]:h-auto [&_svg]:mx-auto [&_.node]:cursor-default"
                  dangerouslySetInnerHTML={{ __html: svgContent }}
                />
              </div>

              {/* Bottom-Right Floating D-Pad Controls for Full Screen */}
              <div
                className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-20 grid grid-cols-3 grid-rows-3 gap-1 rounded-xl border border-border/80 bg-background/95 p-1.5 shadow-2xl backdrop-blur-md"
                onMouseDown={(e) => e.stopPropagation()}
                onMouseUp={(e) => e.stopPropagation()}
                onTouchStart={(e) => e.stopPropagation()}
                onTouchMove={(e) => e.stopPropagation()}
                onTouchEnd={(e) => e.stopPropagation()}
                onWheel={(e) => e.stopPropagation()}
              >
                {/* Row 1 */}
                <div className="size-7 sm:size-8" />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="size-7 sm:size-8 text-muted-foreground hover:text-foreground hover:bg-muted active:scale-95 transition-transform rounded-md border border-border/50 cursor-pointer"
                  onMouseDown={(e) => e.stopPropagation()}
                  onTouchStart={(e) => e.stopPropagation()}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFullPan(0, 70);
                  }}
                  title="Pan up"
                  aria-label="Pan up"
                >
                  <ChevronUp className="size-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="size-7 sm:size-8 text-muted-foreground hover:text-foreground hover:bg-muted active:scale-95 transition-transform rounded-md border border-border/50 cursor-pointer"
                  onMouseDown={(e) => e.stopPropagation()}
                  onTouchStart={(e) => e.stopPropagation()}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFullZoomIn();
                  }}
                  title="Zoom in"
                  aria-label="Zoom in"
                >
                  <ZoomIn className="size-4" />
                </Button>

                {/* Row 2 */}
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="size-7 sm:size-8 text-muted-foreground hover:text-foreground hover:bg-muted active:scale-95 transition-transform rounded-md border border-border/50 cursor-pointer"
                  onMouseDown={(e) => e.stopPropagation()}
                  onTouchStart={(e) => e.stopPropagation()}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFullPan(70, 0);
                  }}
                  title="Pan left"
                  aria-label="Pan left"
                >
                  <ChevronLeft className="size-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="size-7 sm:size-8 text-muted-foreground hover:text-foreground hover:bg-muted active:scale-95 transition-transform rounded-md border border-border/50 cursor-pointer"
                  onMouseDown={(e) => e.stopPropagation()}
                  onTouchStart={(e) => e.stopPropagation()}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFullReset();
                  }}
                  title="Reset view"
                  aria-label="Reset view"
                >
                  <RotateCcw className="size-3.5" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="size-7 sm:size-8 text-muted-foreground hover:text-foreground hover:bg-muted active:scale-95 transition-transform rounded-md border border-border/50 cursor-pointer"
                  onMouseDown={(e) => e.stopPropagation()}
                  onTouchStart={(e) => e.stopPropagation()}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFullPan(-70, 0);
                  }}
                  title="Pan right"
                  aria-label="Pan right"
                >
                  <ChevronRight className="size-4" />
                </Button>

                {/* Row 3 */}
                <div className="size-7 sm:size-8" />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="size-7 sm:size-8 text-muted-foreground hover:text-foreground hover:bg-muted active:scale-95 transition-transform rounded-md border border-border/50 cursor-pointer"
                  onMouseDown={(e) => e.stopPropagation()}
                  onTouchStart={(e) => e.stopPropagation()}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFullPan(0, -70);
                  }}
                  title="Pan down"
                  aria-label="Pan down"
                >
                  <ChevronDown className="size-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="size-7 sm:size-8 text-muted-foreground hover:text-foreground hover:bg-muted active:scale-95 transition-transform rounded-md border border-border/50 cursor-pointer"
                  onMouseDown={(e) => e.stopPropagation()}
                  onTouchStart={(e) => e.stopPropagation()}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFullZoomOut();
                  }}
                  title="Zoom out"
                  aria-label="Zoom out"
                >
                  <ZoomOut className="size-4" />
                </Button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}




