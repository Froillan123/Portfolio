import { useEffect, useRef, useState, useId } from "react";
import { useTheme } from "next-themes";
import mermaid from "mermaid";
import { Check, Copy, Loader2, RefreshCw } from "lucide-react";
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
  const uniqueId = useId().replace(/[^a-zA-Z0-9]/g, "m");
  const { resolvedTheme } = useTheme();

  const isDark = resolvedTheme === "dark";

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setHasError(false);

    async function renderChart() {
      try {
        // GitHub-aligned Mermaid Theme Configuration
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: "loose",
          theme: "base",
          themeVariables: isDark
            ? {
                darkMode: true,
                background: "transparent",
                mainBkg: "#161b22",
                primaryColor: "#161b22",
                primaryTextColor: "#e6edf3",
                primaryBorderColor: "#30363d",
                lineColor: "#8b949e",
                secondaryColor: "#21262d",
                tertiaryColor: "#0d1117",
                edgeLabelBackground: "#161b22",
                clusterBkg: "#0d111799",
                clusterBorder: "#30363d",
                nodeBorder: "#30363d",
                nodeTextColor: "#e6edf3",
                fontFamily:
                  "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji'",
                fontSize: "12px",
              }
            : {
                darkMode: false,
                background: "transparent",
                mainBkg: "#f6f8fa",
                primaryColor: "#f6f8fa",
                primaryTextColor: "#1f2328",
                primaryBorderColor: "#d0d7de",
                lineColor: "#656d76",
                secondaryColor: "#ffffff",
                tertiaryColor: "#eaeef2",
                edgeLabelBackground: "#ffffff",
                clusterBkg: "#f6f8fa99",
                clusterBorder: "#d0d7de",
                nodeBorder: "#d0d7de",
                nodeTextColor: "#1f2328",
                fontFamily:
                  "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji'",
                fontSize: "12px",
              },
          flowchart: {
            curve: "basis",
            htmlLabels: true,
            useMaxWidth: true,
            padding: 12,
            nodeSpacing: 30,
            rankSpacing: 35,
          },
        });

        const renderId = `m${uniqueId}${Math.floor(Math.random() * 10000)}`;
        const cleanChart = chart.trim();
        const { svg } = await mermaid.render(renderId, cleanChart);

        if (isMounted) {
          // GitHub-style responsive SVG normalization:
          const cleanSvg = svg
            .replace(/style="[^"]*max-width:[^;"]*;?[^"]*"/gi, "")
            .replace(/<svg\s+([^>]*?)>/i, (_match, attrs) => {
              const cleanAttrs = attrs
                .replace(/width="[^"]*"/gi, 'width="100%"')
                .replace(/height="[^"]*"/gi, 'height="auto"');
              return `<svg ${cleanAttrs} style="width: 100%; max-width: 100%; height: auto; display: block; margin: 0 auto;">`;
            });

          setSvgContent(cleanSvg);
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
  }, [chart, isDark, uniqueId]);

  const copyDefinition = async () => {
    try {
      await navigator.clipboard.writeText(chart.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <div
      className={`relative flex flex-col rounded-xl border border-border/80 bg-background shadow-sm overflow-hidden w-full max-w-full ${className}`}
    >
      {/* Responsive Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-1.5 border-b border-border/60 bg-muted/40 px-2.5 py-1.5 sm:px-4 sm:py-2 text-xs w-full max-w-full">
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="truncate font-mono text-[10px] sm:text-[11px] font-semibold text-muted-foreground">
            {title}
          </span>
        </div>

        <div className="flex items-center gap-1 shrink-0 ml-auto">
          <Button
            size="sm"
            variant="ghost"
            className="h-6 px-2 text-[10px] font-mono text-muted-foreground hover:text-foreground hover:bg-muted"
            onClick={copyDefinition}
            title="Copy Mermaid source markdown"
          >
            {copied ? <Check className="size-3 text-emerald-500 mr-1" /> : <Copy className="size-3 mr-1" />}
            <span>{copied ? "Copied" : "Copy Code"}</span>
          </Button>
        </div>
      </div>

      {/* Responsive Diagram Canvas (No fixed min-widths, fits completely in 320px viewport with horizontal swipe if needed) */}
      <div className="relative w-full max-w-full overflow-x-auto touch-pan-x p-1.5 sm:p-4 flex flex-col items-center justify-center min-h-[120px]">
        {loading ? (
          <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground py-8">
            <Loader2 className="size-5 animate-spin text-primary" />
            <span className="text-xs font-mono">Rendering diagram...</span>
          </div>
        ) : hasError ? (
          <div className="p-4 text-center text-xs text-muted-foreground font-mono flex flex-col items-center gap-2">
            <span>Unable to render diagram preview.</span>
            <Button
              size="sm"
              variant="outline"
              className="text-xs h-7 rounded-md mt-1"
              onClick={() => window.location.reload()}
            >
              <RefreshCw className="size-3 mr-1.5" />
              Retry
            </Button>
          </div>
        ) : (
          <div className="w-full max-w-full min-w-0 flex flex-col items-center">
            <div
              className="w-full max-w-full min-w-0 flex items-center justify-center [&_svg]:max-w-full [&_svg]:w-full [&_svg]:h-auto [&_.node]:cursor-default"
              dangerouslySetInnerHTML={{ __html: svgContent }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
