import CyberneticGridShader from "@/components/ui/cybernetic-grid-shader";
import PathAnimation from "@/components/ui/svg-path-drawing-text-animation";
import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { GitHubCalendar } from 'react-github-calendar';
import {
  Code2, Layers, Cpu, Database, Cloud, Zap, Brain, Terminal, Box,
  Atom, Server, Network, ShieldCheck, Cpu as Chip, Monitor,
  Globe
} from "lucide-react";

const ConstructedText = ({ text, className, delayOffset = 0 }: { text: string; className?: string; delayOffset?: number }) => {
  const letters = text.split("");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.05 * i + delayOffset
      },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      scaleY: 1,
      scaleX: 1,
      filter: "blur(0px)",
      transition: {
        type: "spring" as const,
        damping: 25,
        stiffness: 80,
      },
    },
    hidden: {
      opacity: 0,
      scaleY: 0,
      scaleX: 2,
      filter: "blur(10px)",
    },
  };

  return (
    <motion.div
      style={{ display: "flex", overflow: "hidden", flexWrap: "wrap", justifyContent: "center" }}
      variants={container}
      initial="hidden"
      whileInView="visible"
      className={className}
    >
      {letters.map((letter, index) => (
        <motion.span
          variants={child}
          key={index}
          style={{ display: "inline-block", whiteSpace: "pre" }}
        >
          {letter}
        </motion.span>
      ))}
    </motion.div>
  );
};

const TechCard = ({ label, level, icon: Icon, delay }: { label: string; level: number; icon: any; delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.8, ease: "circOut" }}
    className="group relative p-6 bg-white/[0.03] border border-white/5 backdrop-blur-xl transition-all hover:bg-orange-500/[0.05] hover:border-orange-500/30 flex flex-col justify-between h-36"
  >
    <div className="flex items-start justify-between w-full">
      <div className="flex items-center space-x-3">
        <div className="p-2.5 bg-white/5 border border-white/5 rounded-lg group-hover:bg-orange-500/10 group-hover:border-orange-500/20 transition-all duration-500">
          <Icon className="w-5 h-5 text-white/40 group-hover:text-orange-500 transition-colors" />
        </div>
        <div className="flex flex-col">
          <span className="text-[11px] tracking-[0.3em] uppercase text-white font-light group-hover:text-orange-400 transition-colors">{label}</span>
          <span className="text-[7px] font-mono text-white/20 uppercase tracking-tighter">Protocol // Active</span>
        </div>
      </div>
      <div className="text-[10px] font-mono text-orange-500/30 group-hover:text-orange-500/60 transition-colors">
        0{Math.floor(delay * 10)}
      </div>
    </div>

    <div className="w-full space-y-3">
      <div className="h-[1px] w-full bg-white/5 overflow-hidden relative">
        <motion.div
          initial={{ x: "-100%" }}
          whileInView={{ x: `${level - 100}%` }}
          transition={{ delay: delay + 0.5, duration: 2, ease: "easeInOut" }}
          className="h-full w-full bg-gradient-to-r from-transparent via-orange-500 to-orange-400"
        />
      </div>
      <div className="flex justify-between items-center text-[7px] tracking-[0.3em] uppercase text-white/20 font-mono">
        <span>Capacity</span>
        <span className="text-orange-500/40">{level}%</span>
      </div>
    </div>

    {/* Corner Accents */}
    <div className="absolute top-0 right-0 w-2 h-2 border-t-[0.5px] border-r-[0.5px] border-white/10 group-hover:border-orange-500/40 transition-colors" />
    <div className="absolute bottom-0 left-0 w-2 h-2 border-b-[0.5px] border-l-[0.5px] border-white/10 group-hover:border-orange-500/40 transition-colors" />
  </motion.div>
);

const GithubDashboard = ({ stats }: { stats: any }) => {
  return (
    <div className="w-full max-w-6xl flex flex-col items-center space-y-12">
      {/* Calendar Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="w-full p-8 bg-black/40 border border-orange-500/10 backdrop-blur-md relative overflow-hidden group"
      >
        <div className="absolute top-0 left-0 w-1 h-full bg-orange-500/20 group-hover:bg-orange-500/40 transition-colors" />
        <div className="flex flex-col space-y-6">
          <div className="flex justify-between items-center text-[10px] tracking-[0.4em] uppercase text-white/40">
            <span>Contribution Matrix // TobiasArg</span>
            <span className="animate-pulse text-orange-500/60">Live Feed Established</span>
          </div>
          <div className="flex justify-center overflow-x-auto custom-scrollbar pb-4 md:pb-0">
            <GitHubCalendar
              username="TobiasArg"
              theme={{
                light: ['#161b22', '#3a1c02', '#7a3100', '#d94e00', '#f97316'],
                dark: ['#161b22', '#3a1c02', '#7a3100', '#d94e00', '#f97316'],
              }}
              fontSize={12}
              blockSize={12}
              blockMargin={4}
            />
          </div>
        </div>
      </motion.div>

      {/* Stats Highlight */}
      <div className="flex justify-center w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="p-8 bg-white/[0.02] border border-white/5 backdrop-blur-sm relative group overflow-hidden max-w-xs w-full"
        >
          <div className="absolute top-0 right-0 p-2 text-[8px] font-mono text-orange-500/20 group-hover:text-orange-500/40 transition-colors">
            AR
          </div>
          <div className="flex flex-col items-center space-y-1">
            <span className="text-5xl font-light font-mono text-white group-hover:text-orange-400 transition-colors">{stats.repos}</span>
            <span className="text-[10px] tracking-[0.4em] uppercase text-white/40">Active Repositories</span>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />
        </motion.div>
      </div>
    </div>
  );
};

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: containerRef });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 40, damping: 20 });
  const [distortion, setDistortion] = useState(0);
  const [stats, setStats] = useState({ repos: "0", followers: "0", following: "0", gists: "0" });
  const [repos, setRepos] = useState<any[]>([]);

  useEffect(() => {
    // Fetch User Stats
    fetch("https://api.github.com/users/TobiasArg")
      .then(res => res.json())
      .then(data => {
        setStats({
          repos: data.public_repos?.toString() || "0",
          followers: data.followers?.toString() || "0",
          following: data.following?.toString() || "0",
          gists: data.public_gists?.toString() || "0"
        });
      })
      .catch(() => { });

    // Fetch Public Repos
    fetch("https://api.github.com/users/TobiasArg/repos?sort=updated&per_page=6")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setRepos(data);
        }
      })
      .catch(() => { });

    return smoothProgress.on("change", (v) => setDistortion(v));
  }, [smoothProgress]);

  return (
    <div
      ref={containerRef}
      className="relative h-screen overflow-y-auto scroll-smooth snap-y snap-mandatory bg-black text-white selection:bg-orange-500/30 overflow-x-hidden font-sans"
    >
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { height: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(249, 115, 22, 0.05); }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(249, 115, 22, 0.2); }
      `}</style>

      <CyberneticGridShader distortion={distortion} />

      {/* 01 // HERO */}
      <section className="relative z-10 h-screen flex flex-col items-center justify-center snap-start pointer-events-none">
        <div className="flex flex-col items-center justify-center space-y-0 w-full max-w-5xl">
          <PathAnimation text="ARGTA" fontSize={120} duration="6s" className="w-full" />
          <PathAnimation text="FULLSTACK DEVELOPER" fontSize={32} duration="8s" className="w-full -mt-16" />
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 6, duration: 3 }}
          className="absolute bottom-10 animate-pulse text-orange-400 text-sm tracking-widest uppercase font-light"
        >
          Analyzing Environment...
        </motion.div>
      </section>

      {/* 02 // REPOSITORY DASHBOARD */}
      <section className="relative z-10 h-screen flex flex-col items-center justify-center snap-start px-8">
        <div className="max-w-6xl w-full flex flex-col items-center space-y-12">
          <div className="text-center space-y-4">
            <span className="text-orange-500 text-[10px] tracking-[1em] uppercase">Sector 01 // Repository Data</span>
            <ConstructedText
              text="DEVELOPMENT ACTIVITY"
              className="text-4xl md:text-6xl font-light tracking-[0.2em] uppercase text-white"
            />
          </div>

          <GithubDashboard stats={stats} />
        </div>
      </section>

      {/* 03 // SYSTEMS (Projects) */}
      <section className="relative z-10 h-screen flex flex-col items-center justify-center snap-start px-8">
        <div className="max-w-6xl w-full space-y-16">
          <div className="flex justify-between items-end border-b border-orange-500/20 pb-4">
            <div className="space-y-2">
              <span className="text-orange-500 text-[10px] tracking-[1em] uppercase">Sector 02 // Project Log</span>
              <ConstructedText text="ACTIVE SYSTEMS" className="text-3xl md:text-5xl font-light tracking-[0.2em] uppercase text-white" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {repos.map((repo, i) => (
              <motion.a
                key={i}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group relative p-8 border border-white/5 bg-white/[0.01] backdrop-blur-sm transition-all hover:border-orange-500/40 flex flex-col justify-between"
              >
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />
                <div>
                  <h3 className="text-xl font-light tracking-widest text-white mb-2 uppercase group-hover:text-orange-400 transition-colors truncate">
                    {repo.name.replace(/-/g, ' ')}
                  </h3>
                  <p className="text-white/40 text-[11px] leading-relaxed line-clamp-2 mb-6 font-extralight tracking-widest">
                    {repo.description || "No description provided for this protocol link."}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {repo.language && (
                    <span className="text-[9px] tracking-[0.2em] uppercase text-orange-500/80 border border-orange-500/20 px-2 py-1">
                      {repo.language}
                    </span>
                  )}
                  {repo.topics?.slice(0, 2).map((topic: string, idx: number) => (
                    <span key={idx} className="text-[9px] tracking-[0.2em] uppercase text-white/30 border border-white/10 px-2 py-1">
                      {topic}
                    </span>
                  ))}
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* 04 // TECH STACK (Skills) */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center snap-start px-8 py-24">
        <div className="max-w-6xl w-full space-y-20">
          <div className="text-center space-y-2">
            <span className="text-orange-500 text-[10px] tracking-[1em] uppercase">Sector 03 // Tech Stack</span>
            <ConstructedText text="TECH STACK" className="text-4xl md:text-6xl font-light tracking-[0.2em] uppercase text-white" />
          </div>

          <div className="space-y-16">
            {/* Group 1: Frontend Ecosystem */}
            <div className="space-y-6">
              <div className="flex items-center space-x-4 opacity-40">
                <div className="h-[1px] flex-grow bg-gradient-to-r from-transparent to-white/20" />
                <span className="text-[10px] tracking-[0.3em] uppercase font-mono">Frontend Ecosystem</span>
                <div className="h-[1px] w-12 bg-white/20" />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                <TechCard label="HTML" level={99} icon={Monitor} delay={0.1} />
                <TechCard label="CSS" level={94} icon={Layers} delay={0.2} />
                <TechCard label="Javascript" level={95} icon={Code2} delay={0.3} />
                <TechCard label="Typescript" level={98} icon={Code2} delay={0.4} />
                <TechCard label="React" level={96} icon={Atom} delay={0.5} />
              </div>
            </div>

            {/* Group 2: Backend & Systems */}
            <div className="space-y-6">
              <div className="flex items-center space-x-4 opacity-40">
                <div className="h-[1px] flex-grow bg-gradient-to-r from-transparent to-white/20" />
                <span className="text-[10px] tracking-[0.3em] uppercase font-mono">Backend & Systems</span>
                <div className="h-[1px] w-12 bg-white/20" />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                <TechCard label="Node.js" level={94} icon={Server} delay={0.1} />
                <TechCard label="C" level={85} icon={Cpu} delay={0.2} />
                <TechCard label="C++" level={88} icon={Chip} delay={0.3} />
                <TechCard label="Docker" level={84} icon={Box} delay={0.4} />
                <TechCard label="Linux" level={89} icon={Terminal} delay={0.5} />
              </div>
            </div>

            {/* Group 3: Data Intelligence */}
            <div className="space-y-6">
              <div className="flex items-center space-x-4 opacity-40">
                <div className="h-[1px] flex-grow bg-gradient-to-r from-transparent to-white/20" />
                <span className="text-[10px] tracking-[0.3em] uppercase font-mono">Data Intelligence</span>
                <div className="h-[1px] w-12 bg-white/20" />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <TechCard label="SQL" level={92} icon={Database} delay={0.1} />
                <TechCard label="PostgreSQL" level={90} icon={Database} delay={0.2} />
                <TechCard label="Neon" level={91} icon={Zap} delay={0.3} />
                <TechCard label="Supabase" level={93} icon={Zap} delay={0.4} />
              </div>
            </div>

            {/* Group 4: Neural & Infrastructure */}
            <div className="space-y-6">
              <div className="flex items-center space-x-4 opacity-40">
                <div className="h-[1px] flex-grow bg-gradient-to-r from-transparent to-white/20" />
                <span className="text-[10px] tracking-[0.3em] uppercase font-mono">Neural & Infrastructure</span>
                <div className="h-[1px] w-12 bg-white/20" />
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                <TechCard label="LLMs" level={95} icon={Brain} delay={0.1} />
                <TechCard label="MCPs / Neural" level={97} icon={Network} delay={0.2} />
                <TechCard label="Architecture" level={87} icon={Cloud} delay={0.3} />
                <TechCard label="Vercel" level={96} icon={Globe} delay={0.4} />
                <TechCard label="Postman" level={92} icon={ShieldCheck} delay={0.5} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 05 // ARCHITECTURE (About) */}
      <section className="relative z-10 h-screen flex flex-col items-center justify-center snap-start px-8">
        <div className="max-w-4xl text-center space-y-12">
          <div className="space-y-4">
            <span className="text-orange-500 text-[10px] tracking-[1em] uppercase animate-pulse">Sector 04 // Architecture</span>
            <ConstructedText
              text="VISION & MISSION"
              className="text-4xl md:text-6xl font-light tracking-[0.2em] uppercase text-white"
            />
          </div>
          <motion.p
            initial={{ opacity: 0, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ delay: 1, duration: 2 }}
            className="text-lg md:text-xl font-extralight leading-relaxed text-white/50 max-w-2xl mx-auto"
          >
            Engineering scalable <span className="text-orange-500">digital ecosystems</span> that merge high-fidelity graphics
            with robust computational backbones. Defining the intersection of art and logic.
          </motion.p>
        </div>
      </section>

      {/* 06 // UPLINK */}
      <section className="relative z-10 h-screen flex flex-col items-center justify-center snap-start px-8">
        <div className="max-w-2xl w-full text-center space-y-12">
          <div className="space-y-4">
            <span className="text-orange-500 text-[10px] tracking-[1em] uppercase">Sector 05 // Uplink</span>
            <ConstructedText text="INITIATE PROTOCOL" className="text-3xl md:text-5xl font-light tracking-[0.2em] uppercase text-white" />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 1.5 }}
            className="flex flex-col space-y-8"
          >
            <p className="text-white/40 text-sm tracking-widest leading-loose max-w-md mx-auto">
              Secure channel ready. Encryption active. <br />
              Awaiting transmission...
            </p>
            <button className="self-center group relative border border-orange-500/40 px-16 py-5 text-white text-xs tracking-[0.5em] uppercase hover:border-orange-500/80 transition-all">
              <span className="relative z-10">Send Transmission</span>
              <div className="absolute inset-0 bg-orange-500/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
          </motion.div>
        </div>
        <footer className="absolute bottom-8 left-0 w-full text-center text-[10px] tracking-[0.8em] text-orange-500/30 uppercase font-mono">
          Argta // (C) 2026 // Distributed System
        </footer>
      </section>
    </div>
  );
}
