"use client";

import React, { useState, useEffect, useRef } from "react";
import "./cyberTerminal.css";
import { BROCHURE_DRIVE_LINK, UNSTOP_FEST_LINK } from "@/lib/constants";

interface FileNode {
  type: "file" | "dir";
  content?: string;
  children?: Record<string, FileNode>;
}

export default function CyberTerminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [currentPath, setCurrentPath] = useState("/home/tf26");
  const [isRoot, setIsRoot] = useState(false);
  const [isMatrixMode, setIsMatrixMode] = useState(false);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Virtual In-Memory Linux File System
  const [fs] = useState<Record<string, FileNode>>({
    "/": {
      type: "dir",
      children: {
        home: {
          type: "dir",
          children: {
            tf26: {
              type: "dir",
              children: {
                "README.md": {
                  type: "file",
                  content:
                    "# SLIET techFEST '26\nTheme: Technology and Sciences for Sustainable Earth\nDates: 16-17 October 2026\nVenue: Sant Longowal Institute of Engineering & Technology, Longowal, Punjab\nWebsite: https://www.techfest26.com",
                },
                "schedule.txt": {
                  type: "file",
                  content:
                    "techFEST '26 SCHEDULE:\n[DAY 1 - 16 OCT]: Opening Ceremony (09:00), Hackathon Kickoff (11:00), RoboWars Prelims (14:00), CAD Modeling (16:00)\n[DAY 2 - 17 OCT]: Project Expo (10:00), RoboMania Finals (14:00), Chem-e-Car Runs (15:00), Grand Valedictory & DJ Night (18:30)",
                },
                "brochure.url": {
                  type: "file",
                  content: BROCHURE_DRIVE_LINK,
                },
                "unstop.url": {
                  type: "file",
                  content: UNSTOP_FEST_LINK,
                },
                events: {
                  type: "dir",
                  children: {
                    "plexus.txt": {
                      type: "file",
                      content:
                        "DOMAIN: PLEXUS (Computer Science & AI)\nEvents: Web Forge, Bug Hunt, CodeSprint, Algorithmic Duel, UI/UX Craft\nHead Coordinator: Department of CSE, SLIET",
                    },
                    "robomania.txt": {
                      type: "file",
                      content:
                        "DOMAIN: ROBOMANIA (Robotics & Automation)\nEvents: RoboWars 15kg/30kg, Line Follower, Maze Solver, Pick & Place\nArena: Central Workshop Ground",
                    },
                    "chem-e-car.txt": {
                      type: "file",
                      content:
                        "DOMAIN: CHEM-E-CAR (Chemical Engineering)\nEvents: Chemical Reaction Powered Vehicle, Green Fuel Challenge, Chem Quiz",
                    },
                    "mechvolution.txt": {
                      type: "file",
                      content:
                        "DOMAIN: MECHVOLUTION (Mechanical Innovation)\nEvents: CADathon, Junkyard Wars, RC Nitro Racers, Bridge Architecture",
                    },
                    "genesis.txt": {
                      type: "file",
                      content:
                        "DOMAIN: GENESIS (Entrepreneurship & Management)\nEvents: Ideathon 2026, Shark Tank Pitch, Stock Market Simulation",
                    },
                    "e-strategy.txt": {
                      type: "file",
                      content:
                        "DOMAIN: E-STRATEGY (Esports & Tactical Gaming)\nEvents: BGMI Championship, Valorant 5v5, FIFA 26 Arena, Chess Masters",
                    },
                    "bio-horizon.txt": {
                      type: "file",
                      content:
                        "DOMAIN: BIO-HORIZON (Food Tech & Bio-Sciences)\nEvents: Bio-Innovate, Food Product Formulation, Eco-Sustainability Challenge",
                    },
                  },
                },
              },
            },
          },
        },
        etc: {
          type: "dir",
          children: {
            hostname: { type: "file", content: "sliet-tf26-srv01" },
            os_release: { type: "file", content: "TechfestOS 26.04 LTS (Kernel 6.12.0-tf26-cyber)" },
          },
        },
        bin: {
          type: "dir",
          children: {
            bash: { type: "file", content: "ELF 64-bit LSB executable" },
            ls: { type: "file", content: "ELF 64-bit LSB executable" },
            cat: { type: "file", content: "ELF 64-bit LSB executable" },
          },
        },
      },
    },
  });

  const [outputLines, setOutputLines] = useState<string[]>([
    "╔═════════════════════════════════════════════════════════════════════════════╗",
    "║  SLIET techFEST '26 // NEURAL SHELL (GNU/Linux x86_64)                      ║",
    "║  Type 'help' for festival commands, or standard Linux (ls, cd, cat, pwd)    ║",
    "╚═════════════════════════════════════════════════════════════════════════════╝",
    "Type 'neofetch' for system specs, 'matrix' for rain stream, or 'ls' to browse.",
  ]);

  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const matrixCanvasRef = useRef<HTMLCanvasElement>(null);

  // Global Keyboard Toggle: `~` or `\`
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "`" || e.key === "~" || e.key === "\\") {
        const active = document.activeElement;
        if (active && (active.tagName === "INPUT" || active.tagName === "TEXTAREA") && active !== inputRef.current) {
          return;
        }
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 60);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [outputLines]);

  // Matrix Digital Code Rain Background Animation
  useEffect(() => {
    if (!isMatrixMode || !isOpen) return;
    const canvas = matrixCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.parentElement?.clientWidth || 700;
    canvas.height = canvas.parentElement?.clientHeight || 450;

    const chars = "01010126TECHFESTSLIETPUNJAB0123456789ABCDEF$#@!%&*";
    const fontSize = 13;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);

    const interval = setInterval(() => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#00FFCC";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }, 45);

    return () => clearInterval(interval);
  }, [isMatrixMode, isOpen]);

  // Helper to resolve directory node from path
  const resolveNode = (pathStr: string): FileNode | null => {
    const parts = pathStr.split("/").filter(Boolean);
    let current: FileNode | undefined = fs["/"];
    for (const part of parts) {
      if (!current || current.type !== "dir" || !current.children) return null;
      current = current.children[part];
    }
    return current || null;
  };

  const handleKeyDownHistory = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInput(commandHistory[nextIndex]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= commandHistory.length) {
        setHistoryIndex(-1);
        setInput("");
      } else {
        setHistoryIndex(nextIndex);
        setInput(commandHistory[nextIndex]);
      }
    }
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const raw = input.trim();
    if (!raw) return;

    setCommandHistory((prev) => [...prev, raw]);
    setHistoryIndex(-1);

    const promptSymbol = isRoot ? "root@sliet:~#" : "tf26@sliet:~$";
    const newOutput = [...outputLines, `${promptSymbol} ${raw}`];

    const args = raw.split(" ").filter(Boolean);
    const cmd = args[0].toLowerCase();
    const target = args[1];

    switch (cmd) {
      case "help":
      case "man":
        newOutput.push(
          "═══ STANDARD LINUX COMMANDS ═══",
          "  ls [-la]       - List directory contents",
          "  cd <dir>       - Change working directory (e.g. cd events, cd ..)",
          "  cat <file>     - Print file contents (e.g. cat README.md)",
          "  pwd            - Print current working directory",
          "  whoami         - Print current username & security clearance",
          "  date           - Display current date and server time",
          "  uname [-a]     - Print operating system & kernel release",
          "  echo <text>    - Display a line of text",
          "  mkdir <name>   - Create a new directory",
          "  touch <name>   - Create an empty file",
          "  rm <name>      - Remove a file",
          "  clear          - Clear terminal display",
          "  sudo <cmd>     - Execute a command with superuser privileges",
          "  exit           - Close neural terminal",
          "",
          "═══ FESTIVAL COMMANDS ═══",
          "  neofetch       - Display SLIET techFEST'26 system telemetry",
          "  cowsay <text>  - Cyber ASCII mascot speaks",
          "  matrix         - Toggle Matrix digital code rain",
          "  schedule       - View official fest timeline",
          "  brochure       - Open official fest brochure",
          "  unstop         - Open official Unstop registration"
        );
        break;

      case "ls":
      case "dir": {
        const node = resolveNode(currentPath);
        if (node && node.type === "dir" && node.children) {
          const isDetailed = args.includes("-l") || args.includes("-la") || args.includes("-al");
          if (isDetailed) {
            newOutput.push("total " + Object.keys(node.children).length * 4);
            Object.entries(node.children).forEach(([name, item]) => {
              const perm = item.type === "dir" ? "drwxr-xr-x" : "-rw-r--r--";
              const size = item.type === "dir" ? 4096 : (item.content?.length || 128);
              newOutput.push(`${perm} 1 tf26 sliet ${size.toString().padStart(6, " ")} Oct 09 2026 ${name}`);
            });
          } else {
            const list = Object.entries(node.children)
              .map(([name, item]) => (item.type === "dir" ? `📁 ${name}/` : `📄 ${name}`))
              .join("    ");
            newOutput.push(list || "(empty directory)");
          }
        } else {
          newOutput.push("ls: cannot open directory: Permission denied");
        }
        break;
      }

      case "pwd":
        newOutput.push(currentPath);
        break;

      case "cd": {
        if (!target || target === "~") {
          setCurrentPath("/home/tf26");
        } else if (target === "/") {
          setCurrentPath("/");
        } else if (target === "..") {
          const parts = currentPath.split("/").filter(Boolean);
          parts.pop();
          setCurrentPath("/" + parts.join("/"));
        } else {
          let testPath = target.startsWith("/") ? target : `${currentPath}/${target}`.replace("//", "/");
          testPath = testPath.replace(/\/$/, "");
          const node = resolveNode(testPath);
          if (node && node.type === "dir") {
            setCurrentPath(testPath);
          } else if (node && node.type === "file") {
            newOutput.push(`bash: cd: ${target}: Not a directory`);
          } else {
            newOutput.push(`bash: cd: ${target}: No such file or directory`);
          }
        }
        break;
      }

      case "cat": {
        if (!target) {
          newOutput.push("cat: missing file operand. Usage: cat <filename>");
          break;
        }
        const filePath = target.startsWith("/") ? target : `${currentPath}/${target}`.replace("//", "/");
        const node = resolveNode(filePath);
        if (node && node.type === "file") {
          newOutput.push(...(node.content?.split("\n") || []));
        } else if (node && node.type === "dir") {
          newOutput.push(`cat: ${target}: Is a directory`);
        } else {
          newOutput.push(`cat: ${target}: No such file or directory`);
        }
        break;
      }

      case "whoami":
        newOutput.push(isRoot ? "root (Superuser / Festival Admin)" : "tf26 (Registered Delegate // SLIET Longowal)");
        break;

      case "date":
        newOutput.push(new Date().toUTCString());
        break;

      case "uname": {
        if (args.includes("-a")) {
          newOutput.push("Linux sliet-tf26 6.12.0-tf26-cyber #1 SMP PREEMPT 2026 x86_64 GNU/Linux");
        } else if (args.includes("-r")) {
          newOutput.push("6.12.0-tf26-cyber");
        } else {
          newOutput.push("Linux");
        }
        break;
      }

      case "echo":
        newOutput.push(args.slice(1).join(" "));
        break;

      case "mkdir": {
        if (!target) {
          newOutput.push("mkdir: missing operand");
          break;
        }
        const node = resolveNode(currentPath);
        if (node && node.type === "dir" && node.children) {
          node.children[target] = { type: "dir", children: {} };
          newOutput.push(`Directory '${target}' created.`);
        }
        break;
      }

      case "touch": {
        if (!target) {
          newOutput.push("touch: missing file operand");
          break;
        }
        const node = resolveNode(currentPath);
        if (node && node.type === "dir" && node.children) {
          node.children[target] = { type: "file", content: `Created by ${isRoot ? "root" : "tf26"} at ${new Date().toISOString()}` };
          newOutput.push(`File '${target}' created.`);
        }
        break;
      }

      case "rm": {
        if (!target) {
          newOutput.push("rm: missing operand");
          break;
        }
        const node = resolveNode(currentPath);
        if (node && node.type === "dir" && node.children && node.children[target]) {
          delete node.children[target];
          newOutput.push(`Removed '${target}'.`);
        } else {
          newOutput.push(`rm: cannot remove '${target}': No such file or directory`);
        }
        break;
      }

      case "sudo": {
        const subCmd = args.slice(1).join(" ");
        if (subCmd === "su" || subCmd === "su -" || subCmd === "-i") {
          setIsRoot(true);
          newOutput.push("[AUTH OK] Root session granted. Welcome, Administrator.");
        } else if (subCmd.startsWith("rm -rf /")) {
          newOutput.push("⚠️ ALERT: SLIET Central Firewall blocked destruction protocol. Nice try!");
        } else if (!subCmd) {
          newOutput.push("usage: sudo command");
        } else {
          newOutput.push(`[sudo] executed '${subCmd}' with superuser privileges.`);
        }
        break;
      }

      case "neofetch":
        newOutput.push(
          "       .---.            tf26@sliet-tf26",
          "      /     \\           ───────────────",
          "     | () () |          OS: SLIET TechfestOS 26.04 LTS x86_64",
          "      \\  _  /           Host: Sant Longowal Institute Server",
          "       |||||            Kernel: 6.12.0-tf26-cyber",
          "     .'     '.          Uptime: 2 days, 14 hours",
          "    /  SLIET  \\         Theme: Sustainable Earth (Cyber Cyan)",
          "   |  TF '26   |        Festival Dates: 16-17 October 2026",
          "    \\         /         Delegates Registered: 10,000+",
          "     '-------'          Memory: 4096MB / 16384MB"
        );
        break;

      case "cowsay": {
        const msg = args.slice(1).join(" ") || "Welcome to SLIET techFEST '26!";
        const len = msg.length;
        const bar = "-".repeat(len + 2);
        newOutput.push(
          ` ${bar}`,
          `< ${msg} >`,
          ` ${bar}`,
          "        \\   ^__^",
          "         \\  (oo)\\_______",
          "            (__)\\       )\\/\\",
          "                ||----w |",
          "                ||     ||"
        );
        break;
      }

      case "matrix":
        setIsMatrixMode((prev) => !prev);
        newOutput.push(isMatrixMode ? "Matrix digital rain deactivated." : "Matrix digital rain activated!");
        break;

      case "schedule":
        newOutput.push(
          "techFEST '26 SCHEDULE (16—17 OCT 2026):",
          "  • 16 OCT: Opening Ceremony, Hackathons, Line Follower, CADathon, Keynotes, Pronite",
          "  • 17 OCT: RoboWars Finals, Chem-e-Car Runs, Esports Finals, Grand Valedictory, DJ Night"
        );
        break;

      case "brochure":
        newOutput.push("Opening official brochure on Google Drive...");
        window.open(BROCHURE_DRIVE_LINK, "_blank");
        break;

      case "unstop":
        newOutput.push("Opening official festival on Unstop...");
        window.open(UNSTOP_FEST_LINK, "_blank");
        break;

      case "clear":
      case "cls":
        setOutputLines([]);
        setInput("");
        return;

      case "exit":
      case "quit":
        setIsOpen(false);
        setInput("");
        return;

      default:
        newOutput.push(`bash: ${cmd}: command not found. Type 'help' for command list.`);
    }

    setOutputLines(newOutput);
    setInput("");
  };

  return (
    <>
      {/* Discreet Floating CLI Launcher Button (Bottom-Left) */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed bottom-5 left-5 z-[50000] px-3.5 py-1.5 rounded-lg bg-black/85 hover:bg-[#002C07] text-[#0CC7F8] hover:text-white border border-[#0CC7F8]/40 hover:border-[#0CC7F8] font-mono text-xs tracking-wider shadow-[0_0_15px_rgba(12,199,248,0.3)] backdrop-blur-md transition-all flex items-center gap-2 cursor-pointer"
        title="Open Cyber Terminal (~ or \)"
      >
        <span className="w-2 h-2 rounded-full bg-[#00FFCC] animate-ping" />
        <span className="font-bold">&gt;_ TERMINAL</span>
        <span className="text-[10px] text-neutral-500 hidden sm:inline">[ ~ ]</span>
      </button>

      {/* Cyber Terminal Window Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="absolute inset-0" onClick={() => setIsOpen(false)} />

          <div className="relative z-10 w-full max-w-3xl bg-[#07080c]/95 border border-[#0CC7F8]/40 rounded-xl shadow-[0_0_70px_rgba(12,199,248,0.3)] overflow-hidden flex flex-col h-[520px] font-mono text-xs sm:text-sm text-neutral-200">
            
            {/* Matrix Rain Canvas Background */}
            {isMatrixMode && (
              <canvas
                ref={matrixCanvasRef}
                className="absolute inset-0 pointer-events-none opacity-25 z-0 w-full h-full"
              />
            )}

            {/* Corner Brackets */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#0CC7F8]" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#0CC7F8]" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#0CC7F8]" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#0CC7F8]" />

            {/* Header Bar */}
            <div className="bg-black/90 border-b border-white/10 px-4 py-2.5 flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80 cursor-pointer" onClick={() => setIsOpen(false)} />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="ml-2 text-xs text-neutral-400 tracking-wider">
                  {isRoot ? "root@sliet:~#" : `tf26@sliet:${currentPath}`} [BASH]
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-[11px] font-mono text-[#0CC7F8] hover:text-white px-2 py-0.5 rounded border border-white/10"
              >
                [ ESC / CLOSE ✕ ]
              </button>
            </div>

            {/* Output Viewport */}
            <div className="flex-1 p-4 overflow-y-auto space-y-1 leading-relaxed selection:bg-[#0CC7F8] selection:text-black z-10">
              {outputLines.map((line, i) => (
                <div
                  key={i}
                  className={`${
                    line.startsWith("tf26@sliet:") || line.startsWith("root@sliet:")
                      ? "text-[#0CC7F8] font-bold"
                      : line.startsWith("═══")
                      ? "text-[#00FFCC] font-bold mt-2"
                      : line.startsWith("total") || line.startsWith("drwx") || line.startsWith("-rw-")
                      ? "text-neutral-300 font-mono text-[11px]"
                      : isMatrixMode
                      ? "text-emerald-400"
                      : "text-neutral-200"
                  }`}
                >
                  {line}
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Input Form */}
            <form onSubmit={handleCommand} className="bg-black/90 border-t border-white/10 p-3 flex items-center gap-2 z-10">
              <span className={`font-bold whitespace-nowrap ${isRoot ? "text-red-400" : "text-[#0CC7F8]"}`}>
                {isRoot ? "root@sliet:~#" : "tf26@sliet:~$"}
              </span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDownHistory}
                placeholder="type linux command (e.g. 'ls', 'cat README.md', 'neofetch', 'help')..."
                className="flex-1 bg-transparent text-white focus:outline-none font-mono text-xs sm:text-sm placeholder:text-neutral-600"
                autoFocus
              />
            </form>

          </div>
        </div>
      )}
    </>
  );
}