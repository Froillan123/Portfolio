import { useState, useEffect } from "react";

const titles = [
  "Founder & Software Architect",
  "Full-Stack Product Builder",
  "Mobile App Creator",
  "Backend & Cloud Engineer"
];

export function TypewriterLoop() {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (typing) {
      if (displayed.length < titles[index].length) {
        timeout = setTimeout(() => {
          setDisplayed(titles[index].slice(0, displayed.length + 1));
        }, 40);
      } else {
        timeout = setTimeout(() => setTyping(false), 800);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => {
          setDisplayed(displayed.slice(0, -1));
        }, 20);
      } else {
        setTyping(true);
        setIndex((index + 1) % titles.length);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, typing, index]);

  return (
    <div className="text-xl md:text-2xl font-semibold leading-tight mt-2 text-primary h-8">
      {displayed}
    </div>
  );
}

