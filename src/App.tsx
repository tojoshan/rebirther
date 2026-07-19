import React, { useState, useEffect, useRef } from 'react';
import { 
  CheckCircle2, 
  RotateCcw, 
  Target, 
  Wrench, 
  Cpu, 
  Swords, 
  Coins, 
  Lock, 
  AlertCircle, 
  Award, 
  ArrowRight,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Heart,
  Shield,
  Zap,
  ListTodo,
  ShoppingBag,
  Package,
  Bed,
  Trash2,
  Layers,
  Inbox,
  Bell,
  Store,
  Palette,
  Plus,
  Minus,
  X,
  Sparkle,
  Search
} from 'lucide-react';
import translationsData from './translations.json';
const translations = translationsData as Record<string, Record<string, string>>;

type DroidType = 'CONSTRUCTOR' | 'ASTRO' | 'PELEA';
type DroidRarity = 'COMUN' | 'RARO' | 'EPICO' | 'LEGENDARIO' | 'ICONICO' | 'MITICO';

interface Droid {
  name: string;
  maxReq: number;
  type: DroidType;
  rarity: DroidRarity;
}

interface RebirthRequirement {
  level: number;
  credits: string;
  droids: {
    name: string;
    tier: number; // 1: Base, 2: Gold, 3: Diamond, 4: Rainbow, 5: Beskar, 6: Galactic
  }[];
}

const droidTypes: Record<DroidType, { label: string; icon: React.ComponentType<any>; color: string; bg: string }> = {
  CONSTRUCTOR: { label: 'Constructor', icon: Wrench, color: 'text-orange-400', bg: 'bg-orange-400/10' },
  ASTRO: { label: 'Astromecánico', icon: Cpu, color: 'text-blue-400', bg: 'bg-blue-400/10' },
  PELEA: { label: 'Combate', icon: Swords, color: 'text-red-400', bg: 'bg-red-400/10' }
};

const droidRarities: Record<DroidRarity, { label: string; color: string }> = {
  COMUN: { label: 'Común', color: 'text-slate-400' },
  RARO: { label: 'Raro', color: 'text-blue-400' },
  EPICO: { label: 'Épico', color: 'text-purple-400' },
  LEGENDARIO: { label: 'Legendario', color: 'text-yellow-400' },
  ICONICO: { label: 'Icónico', color: 'text-fuchsia-400' },
  MITICO: { label: 'Mítico', color: 'text-red-500' }
};

const droidsData: Droid[] = [
  // Common
  { name: "Mouse", maxReq: 1, type: "ASTRO", rarity: "COMUN" },
  { name: "Pit", maxReq: 1, type: "CONSTRUCTOR", rarity: "COMUN" },
  { name: "Gonk", maxReq: 1, type: "CONSTRUCTOR", rarity: "COMUN" },
  { name: "CB", maxReq: 1, type: "ASTRO", rarity: "COMUN" },
  { name: "R3", maxReq: 1, type: "ASTRO", rarity: "COMUN" },
  { name: "R5", maxReq: 1, type: "ASTRO", rarity: "COMUN" },
  { name: "R8", maxReq: 1, type: "ASTRO", rarity: "COMUN" },
  { name: "Imperial Probe", maxReq: 1, type: "ASTRO", rarity: "COMUN" },
  { name: "B1 Battle", maxReq: 1, type: "PELEA", rarity: "COMUN" },
  { name: "DRK-1 Probe", maxReq: 1, type: "ASTRO", rarity: "COMUN" },
  { name: "ID-10", maxReq: 1, type: "ASTRO", rarity: "COMUN" },

  // Rare
  { name: "BDX Explorer", maxReq: 1, type: "ASTRO", rarity: "RARO" },
  { name: "ARG", maxReq: 1, type: "CONSTRUCTOR", rarity: "RARO" },
  { name: "Senate Hovercam", maxReq: 1, type: "ASTRO", rarity: "RARO" },
  { name: "BU-4D", maxReq: 1, type: "CONSTRUCTOR", rarity: "RARO" },
  { name: "Bal-Core", maxReq: 1, type: "CONSTRUCTOR", rarity: "RARO" },
  { name: "Roll-R", maxReq: 1, type: "ASTRO", rarity: "RARO" },
  { name: "2BB", maxReq: 1, type: "ASTRO", rarity: "RARO" },
  { name: "A-LT", maxReq: 1, type: "ASTRO", rarity: "RARO" },
  { name: "R4", maxReq: 1, type: "ASTRO", rarity: "RARO" },
  { name: "R9", maxReq: 1, type: "ASTRO", rarity: "RARO" },
  { name: "B1 Security", maxReq: 1, type: "PELEA", rarity: "RARO" },
  { name: "NAV-EX", maxReq: 1, type: "ASTRO", rarity: "RARO" },
  { name: "Vect-Arm", maxReq: 1, type: "CONSTRUCTOR", rarity: "RARO" },
  { name: "HOV-R", maxReq: 1, type: "PELEA", rarity: "RARO" },

  // Epic
  { name: "Groundmech", maxReq: 1, type: "PELEA", rarity: "EPICO" },
  { name: "LO", maxReq: 1, type: "ASTRO", rarity: "EPICO" },
  { name: "AMP Walker", maxReq: 1, type: "PELEA", rarity: "EPICO" },
  { name: "Sen-Tri", maxReq: 1, type: "PELEA", rarity: "EPICO" },
  { name: "Opti-Pod", maxReq: 1, type: "ASTRO", rarity: "EPICO" },
  { name: "Gunrunner", maxReq: 1, type: "PELEA", rarity: "EPICO" },
  { name: "BB", maxReq: 1, type: "ASTRO", rarity: "EPICO" },
  { name: "R2", maxReq: 1, type: "ASTRO", rarity: "EPICO" },
  { name: "R6", maxReq: 1, type: "ASTRO", rarity: "EPICO" },
  { name: "Trak-R", maxReq: 1, type: "CONSTRUCTOR", rarity: "EPICO" },
  { name: "Orb-Walker", maxReq: 1, type: "CONSTRUCTOR", rarity: "EPICO" },
  { name: "Util-Tec", maxReq: 1, type: "CONSTRUCTOR", rarity: "EPICO" },
  { name: "B1 Heavy", maxReq: 1, type: "PELEA", rarity: "EPICO" },
  { name: "B2 Super", maxReq: 1, type: "PELEA", rarity: "EPICO" },
  { name: "B2 Heavy", maxReq: 1, type: "PELEA", rarity: "EPICO" },
  { name: "Strike-Orb", maxReq: 1, type: "PELEA", rarity: "EPICO" },
  { name: "Haul-R", maxReq: 1, type: "CONSTRUCTOR", rarity: "EPICO" },
  { name: "LNG-Shot", maxReq: 1, type: "PELEA", rarity: "EPICO" },

  // Legendary
  { name: "Proto-Roller", maxReq: 1, type: "CONSTRUCTOR", rarity: "LEGENDARIO" },
  { name: "Mecha-Droid", maxReq: 1, type: "PELEA", rarity: "LEGENDARIO" },
  { name: "MONO-WLKR", maxReq: 1, type: "CONSTRUCTOR", rarity: "LEGENDARIO" },
  { name: "BB-9", maxReq: 1, type: "ASTRO", rarity: "LEGENDARIO" },
  { name: "R7", maxReq: 1, type: "ASTRO", rarity: "LEGENDARIO" },
  { name: "B2-RP", maxReq: 1, type: "PELEA", rarity: "LEGENDARIO" },
  { name: "Cyclo-Grav", maxReq: 1, type: "PELEA", rarity: "LEGENDARIO" },
  { name: "Opti-STRK", maxReq: 1, type: "PELEA", rarity: "LEGENDARIO" },

  // Iconic
  { name: "DJ R-3X", maxReq: 1, type: "ASTRO", rarity: "ICONICO" },
  { name: "CB-23", maxReq: 1, type: "ASTRO", rarity: "ICONICO" },
  { name: "BB8", maxReq: 1, type: "ASTRO", rarity: "ICONICO" },
  { name: "Mister Bones", maxReq: 1, type: "PELEA", rarity: "ICONICO" },
  { name: "IG-11 Marshal", maxReq: 1, type: "PELEA", rarity: "ICONICO" },
  { name: "R2-D2", maxReq: 1, type: "ASTRO", rarity: "ICONICO" },
  { name: "C-3PO", maxReq: 1, type: "ASTRO", rarity: "ICONICO" },

  // Mythic
  { name: "SNOW MOUSE", maxReq: 1, type: "ASTRO", rarity: "MITICO" },
  { name: "RIC", maxReq: 1, type: "ASTRO", rarity: "MITICO" },
  { name: "LOADLIFTER", maxReq: 1, type: "CONSTRUCTOR", rarity: "MITICO" },
  { name: "LEP", maxReq: 1, type: "CONSTRUCTOR", rarity: "MITICO" },
  { name: "RIC-1200", maxReq: 1, type: "ASTRO", rarity: "MITICO" },
  { name: "DRFT-R", maxReq: 1, type: "ASTRO", rarity: "MITICO" },
  { name: "CYCLENS", maxReq: 1, type: "PELEA", rarity: "MITICO" },
  { name: "MO-TRAK", maxReq: 1, type: "CONSTRUCTOR", rarity: "MITICO" },
  { name: "TRI-TEK", maxReq: 1, type: "ASTRO", rarity: "MITICO" },
  { name: "IG", maxReq: 1, type: "PELEA", rarity: "MITICO" },
  { name: "KX", maxReq: 1, type: "PELEA", rarity: "MITICO" }
];

const rebirthRequirementsCycle1: RebirthRequirement[] = [
  { level: 1, credits: "10,000 Credits", droids: [{ name: "CB", tier: 1 }, { name: "DRK-1 Probe", tier: 1 }, { name: "Pit", tier: 1 }] },
  { level: 2, credits: "150,000 Credits", droids: [{ name: "2BB", tier: 1 }, { name: "Bal-Core", tier: 1 }, { name: "BDX Explorer", tier: 1 }] },
  { level: 3, credits: "975,000 Credits", droids: [{ name: "A-LT", tier: 1 }, { name: "BU-4D", tier: 1 }, { name: "R9", tier: 2 }] },
  { level: 4, credits: "2.95 Million Credits", droids: [{ name: "ARG", tier: 2 }, { name: "B1 Security", tier: 2 }, { name: "Groundmech", tier: 1 }] },
  { level: 5, credits: "5.35 Million Credits", droids: [{ name: "BU-4D", tier: 2 }, { name: "HOV-R", tier: 2 }, { name: "R9", tier: 3 }] },
  { level: 6, credits: "9.85 Million Credits", droids: [{ name: "A-LT", tier: 3 }, { name: "ARG", tier: 3 }, { name: "Groundmech", tier: 2 }] },
  { level: 7, credits: "14.5 Million Credits", droids: [{ name: "B1 Security", tier: 3 }, { name: "BB", tier: 2 }, { name: "BU-4D", tier: 3 }] },
  { level: 8, credits: "36 Million Credits", droids: [{ name: "HOV-R", tier: 3 }, { name: "LO", tier: 2 }, { name: "Util-Tec", tier: 2 }] },
  { level: 9, credits: "89 Million Credits", droids: [{ name: "Groundmech", tier: 4 }, { name: "R6", tier: 2 }, { name: "Trak-R", tier: 2 }] },
  { level: 10, credits: "220 Million Credits", droids: [{ name: "Haul-R", tier: 4 }, { name: "LO", tier: 4 }, { name: "Strike-Orb", tier: 2 }] },
  { level: 11, credits: "550 Million Credits", droids: [{ name: "AMP Walker", tier: 4 }, { name: "B1 Heavy", tier: 4 }, { name: "BB-9", tier: 1 }] },
  { level: 12, credits: "1.36 Billion Credits", droids: [{ name: "Mecha-Droid", tier: 1 }, { name: "MONO-WLKR", tier: 1 }, { name: "Proto-Roller", tier: 2 }] },
  { level: 13, credits: "3.4 Billion Credits", droids: [{ name: "B2-RP", tier: 1 }, { name: "Cyclo-Grav", tier: 1 }, { name: "R7", tier: 1 }] },
  { level: 14, credits: "8.45 Billion Credits", droids: [{ name: "Mecha-Droid", tier: 2 }, { name: "MONO-WLKR", tier: 2 }, { name: "Opti-STRK", tier: 1 }] },
  { level: 15, credits: "21 Billion Credits", droids: [{ name: "B2-RP", tier: 2 }, { name: "BB-9", tier: 2 }, { name: "R7", tier: 2 }] },
  { level: 16, credits: "52 Billion Credits", droids: [{ name: "MONO-WLKR", tier: 3 }, { name: "Opti-STRK", tier: 2 }, { name: "Proto-Roller", tier: 3 }] },
  { level: 17, credits: "130 Billion Credits", droids: [{ name: "B2-RP", tier: 3 }, { name: "Cyclo-Grav", tier: 3 }, { name: "Mecha-Droid", tier: 3 }] },
  { level: 18, credits: "325 Billion Credits", droids: [{ name: "BB-9", tier: 3 }, { name: "MONO-WLKR", tier: 4 }, { name: "R7", tier: 3 }] },
  { level: 19, credits: "810 Billion Credits", droids: [{ name: "B2-RP", tier: 4 }, { name: "Cyclo-Grav", tier: 4 }, { name: "Proto-Roller", tier: 4 }] },
  { level: 20, credits: "2 Trillion Credits", droids: [{ name: "Mecha-Droid", tier: 4 }, { name: "Opti-STRK", tier: 4 }, { name: "R7", tier: 4 }] },
  { level: 21, credits: "3 Trillion Credits", droids: [{ name: "BB", tier: 5 }, { name: "Groundmech", tier: 5 }, { name: "Orb-Walker", tier: 5 }] },
  { level: 22, credits: "4.5 Trillion Credits", droids: [{ name: "AMP Walker", tier: 5 }, { name: "B1 Heavy", tier: 5 }, { name: "Proto-Roller", tier: 5 }] },
  { level: 23, credits: "6 Trillion Credits", droids: [{ name: "MONO-WLKR", tier: 5 }, { name: "Opti-STRK", tier: 5 }, { name: "R7", tier: 5 }] },
  { level: 24, credits: "9 Trillion Credits", droids: [{ name: "BB-9", tier: 5 }, { name: "Cyclo-Grav", tier: 5 }, { name: "MO-TRAK", tier: 1 }] },
  { level: 25, credits: "13.5 Trillion Credits", droids: [{ name: "B2-RP", tier: 5 }, { name: "IG", tier: 1 }, { name: "DRFT-R", tier: 2 }] },
  { level: 26, credits: "21 Trillion Credits", droids: [{ name: "CYCLENS", tier: 2 }, { name: "LOADLIFTER", tier: 3 }, { name: "RIC-1200", tier: 4 }] },
  { level: 27, credits: "32 Trillion Credits", droids: [{ name: "KX", tier: 3 }, { name: "TRI-TEK", tier: 4 }, { name: "SNOW MOUSE", tier: 5 }] }
];

const rebirthRequirementsCycle2: RebirthRequirement[] = [
  { level: 1, credits: "10,000 Credits", droids: [{ name: "ID-10", tier: 1 }, { name: "Mouse", tier: 1 }, { name: "Gonk", tier: 1 }] },
  { level: 2, credits: "150,000 Credits", droids: [{ name: "Roll-R", tier: 1 }, { name: "Senate Hovercam", tier: 1 }, { name: "NAV-EX", tier: 1 }] },
  { level: 3, credits: "975,000 Credits", droids: [{ name: "R4", tier: 1 }, { name: "Vect-Arm", tier: 1 }, { name: "BDX Explorer", tier: 2 }] },
  { level: 4, credits: "2.95 Million Credits", droids: [{ name: "2BB", tier: 2 }, { name: "Bal-Core", tier: 2 }, { name: "Orb-Walker", tier: 1 }] },
  { level: 5, credits: "5.35 Million Credits", droids: [{ name: "R4", tier: 2 }, { name: "Vect-Arm", tier: 2 }, { name: "NAV-EX", tier: 2 }] },
  { level: 6, credits: "9.85 Million Credits", droids: [{ name: "Gunrunner", tier: 1 }, { name: "2BB", tier: 3 }, { name: "Bal-Core", tier: 3 }] },
  { level: 7, credits: "14.5 Million Credits", droids: [{ name: "Roll-R", tier: 3 }, { name: "BDX Explorer", tier: 3 }, { name: "R2", tier: 2 }] },
  { level: 8, credits: "36 Million Credits", droids: [{ name: "R4", tier: 3 }, { name: "B2 Super", tier: 2 }, { name: "Gunrunner", tier: 2 }] },
  { level: 9, credits: "89 Million Credits", droids: [{ name: "NAV-EX", tier: 4 }, { name: "Strike-Orb", tier: 2 }, { name: "AMP Walker", tier: 2 }] },
  { level: 10, credits: "220 Million Credits", droids: [{ name: "Vect-Arm", tier: 4 }, { name: "B2 Super", tier: 3 }, { name: "R2", tier: 3 }] },
  { level: 11, credits: "550 Million Credits", droids: [{ name: "Strike-Orb", tier: 3 }, { name: "B2 Heavy", tier: 3 }, { name: "Bal-Core", tier: 4 }] },
  { level: 12, credits: "1.36 Billion Credits", droids: [{ name: "Orb-Walker", tier: 4 }, { name: "R2", tier: 4 }, { name: "BB-9", tier: 1 }] },
  { level: 13, credits: "3.4 Billion Credits", droids: [{ name: "B2 Super", tier: 4 }, { name: "Mecha-Droid", tier: 1 }, { name: "Proto-Roller", tier: 1 }] },
  { level: 14, credits: "8.45 Billion Credits", droids: [{ name: "R7", tier: 2 }, { name: "B2-RP", tier: 1 }, { name: "B2 Heavy", tier: 4 }] },
  { level: 15, credits: "21 Billion Credits", droids: [{ name: "Strike-Orb", tier: 4 }, { name: "BB-9", tier: 2 }, { name: "Proto-Roller", tier: 2 }] },
  { level: 16, credits: "52 Billion Credits", droids: [{ name: "AMP Walker", tier: 4 }, { name: "B2-RP", tier: 3 }, { name: "Mecha-Droid", tier: 2 }] },
  { level: 17, credits: "130 Billion Credits", droids: [{ name: "Opti-Pod", tier: 4 }, { name: "R7", tier: 3 }, { name: "MONO-WLKR", tier: 2 }] },
  { level: 18, credits: "325 Billion Credits", droids: [{ name: "Util-Tec", tier: 4 }, { name: "BB-9", tier: 3 }, { name: "Proto-Roller", tier: 3 }] },
  { level: 19, credits: "810 Billion Credits", droids: [{ name: "Mecha-Droid", tier: 3 }, { name: "B2-RP", tier: 4 }, { name: "R7", tier: 4 }] },
  { level: 20, credits: "2 Trillion Credits", droids: [{ name: "MONO-WLKR", tier: 4 }, { name: "Cyclo-Grav", tier: 4 }, { name: "Opti-STRK", tier: 4 }] },
  { level: 21, credits: "3 Trillion Credits", droids: [{ name: "R6", tier: 5 }, { name: "LO", tier: 5 }, { name: "Haul-R", tier: 5 }] },
  { level: 22, credits: "4.5 Trillion Credits", droids: [{ name: "Strike-Orb", tier: 5 }, { name: "Sen-Tri", tier: 5 }, { name: "Proto-Roller", tier: 5 }] },
  { level: 23, credits: "6 Trillion Credits", droids: [{ name: "BB-9", tier: 5 }, { name: "Cyclo-Grav", tier: 5 }, { name: "B2-RP", tier: 5 }] },
  { level: 24, credits: "9 Trillion Credits", droids: [{ name: "Opti-STRK", tier: 5 }, { name: "B2-RP", tier: 5 }, { name: "SNOW MOUSE", tier: 1 }] },
  { level: 25, credits: "13.5 Trillion Credits", droids: [{ name: "MONO-WLKR", tier: 5 }, { name: "TRI-TEK", tier: 2 }, { name: "RIC-1200", tier: 1 }] },
  { level: 26, credits: "21 Trillion Credits", droids: [{ name: "KX", tier: 2 }, { name: "DRFT-R", tier: 3 }, { name: "IG", tier: 4 }] },
  { level: 27, credits: "32 Trillion Credits", droids: [{ name: "LEP", tier: 3 }, { name: "LOADLIFTER", tier: 4 }, { name: "MO-TRAK", tier: 5 }] }
];

const rebirthRequirementsCycle3: RebirthRequirement[] = [
  { level: 1, credits: "10,000 Credits", droids: [{ name: "Gonk", tier: 1 }, { name: "Mouse", tier: 1 }, { name: "Pit", tier: 1 }] },
  { level: 2, credits: "150,000 Credits", droids: [{ name: "2BB", tier: 1 }, { name: "R3", tier: 1 }, { name: "Senate Hovercam", tier: 1 }] },
  { level: 3, credits: "975,000 Credits", droids: [{ name: "R4", tier: 1 }, { name: "R5", tier: 1 }, { name: "R8", tier: 1 }] },
  { level: 4, credits: "2.95 Million Credits", droids: [{ name: "B1 Battle", tier: 2 }, { name: "B1 Security", tier: 2 }, { name: "R9", tier: 2 }] },
  { level: 5, credits: "5.35 Million Credits", droids: [{ name: "2BB", tier: 2 }, { name: "R3", tier: 2 }, { name: "Senate Hovercam", tier: 2 }] },
  { level: 6, credits: "9.85 Million Credits", droids: [{ name: "BDX Explorer", tier: 3 }, { name: "R4", tier: 3 }, { name: "R5", tier: 3 }] },
  { level: 7, credits: "14.5 Million Credits", droids: [{ name: "B1 Battle", tier: 3 }, { name: "R8", tier: 3 }, { name: "R9", tier: 3 }] },
  { level: 8, credits: "36 Million Credits", droids: [{ name: "2BB", tier: 4 }, { name: "B1 Security", tier: 4 }, { name: "R3", tier: 4 }] },
  { level: 9, credits: "89 Million Credits", droids: [{ name: "BDX Explorer", tier: 4 }, { name: "R4", tier: 4 }, { name: "R5", tier: 4 }] },
  { level: 10, credits: "220 Million Credits", droids: [{ name: "Groundmech", tier: 1 }, { name: "Senate Hovercam", tier: 4 }, { name: "Trak-R", tier: 1 }] },
  { level: 11, credits: "550 Million Credits", droids: [{ name: "B2 Heavy", tier: 1 }, { name: "B2 Super", tier: 1 }, { name: "Util-Tec", tier: 1 }] },
  { level: 12, credits: "1.36 Billion Credits", droids: [{ name: "Bal-Core", tier: 4 }, { name: "Groundmech", tier: 2 }, { name: "Trak-R", tier: 2 }] },
  { level: 13, credits: "3.4 Billion Credits", droids: [{ name: "B2 Super", tier: 4 }, { name: "Mecha-Droid", tier: 1 }, { name: "Proto-Roller", tier: 1 }] },
  { level: 14, credits: "8.45 Billion Credits", droids: [{ name: "B2 Heavy", tier: 4 }, { name: "B2-RP", tier: 1 }, { name: "R7", tier: 2 }] },
  { level: 15, credits: "21 Billion Credits", droids: [{ name: "BB-9", tier: 2 }, { name: "Proto-Roller", tier: 2 }, { name: "Strike-Orb", tier: 4 }] },
  { level: 16, credits: "52 Billion Credits", droids: [{ name: "AMP Walker", tier: 4 }, { name: "B2-RP", tier: 3 }, { name: "Mecha-Droid", tier: 2 }] },
  { level: 17, credits: "130 Billion Credits", droids: [{ name: "MONO-WLKR", tier: 2 }, { name: "Opti-Pod", tier: 4 }, { name: "R7", tier: 3 }] },
  { level: 18, credits: "325 Billion Credits", droids: [{ name: "BB-9", tier: 3 }, { name: "Proto-Roller", tier: 3 }, { name: "Util-Tec", tier: 4 }] },
  { level: 19, credits: "810 Billion Credits", droids: [{ name: "B2-RP", tier: 4 }, { name: "Mecha-Droid", tier: 3 }, { name: "R7", tier: 4 }] },
  { level: 20, credits: "2 Trillion Credits", droids: [{ name: "Cyclo-Grav", tier: 4 }, { name: "MONO-WLKR", tier: 4 }, { name: "Opti-STRK", tier: 4 }] },
  { level: 21, credits: "3 Trillion Credits", droids: [{ name: "B2 Super", tier: 5 }, { name: "Opti-Pod", tier: 5 }, { name: "R2", tier: 5 }] },
  { level: 22, credits: "4.5 Trillion Credits", droids: [{ name: "B2-RP", tier: 5 }, { name: "Gunrunner", tier: 5 }, { name: "LNG-Shot", tier: 5 }] },
  { level: 23, credits: "6 Trillion Credits", droids: [{ name: "Cyclo-Grav", tier: 5 }, { name: "Mecha-Droid", tier: 5 }, { name: "MONO-WLKR", tier: 5 }] },
  { level: 24, credits: "9 Trillion Credits", droids: [{ name: "B2-RP", tier: 5 }, { name: "BB-9", tier: 5 }, { name: "RIC", tier: 1 }] },
  { level: 25, credits: "13.5 Trillion Credits", droids: [{ name: "LOADLIFTER", tier: 1 }, { name: "MO-TRAK", tier: 2 }, { name: "Proto-Roller", tier: 5 }] },
  { level: 26, credits: "21 Trillion Credits", droids: [{ name: "LEP", tier: 2 }, { name: "SNOW MOUSE", tier: 4 }, { name: "TRI-TEK", tier: 3 }] },
  { level: 27, credits: "32 Trillion Credits", droids: [{ name: "DRFT-R", tier: 5 }, { name: "IG", tier: 4 }, { name: "RIC-1200", tier: 3 }] }
];

const rebirthRequirementsCycle4: RebirthRequirement[] = [
  { level: 1, credits: "10,000 Credits", droids: [{ name: "ID-10", tier: 1 }, { name: "Pit", tier: 1 }, { name: "DRK-1 Probe", tier: 1 }] },
  { level: 2, credits: "150,000 Credits", droids: [{ name: "2BB", tier: 1 }, { name: "R3", tier: 1 }, { name: "Senate Hovercam", tier: 1 }] },
  { level: 3, credits: "975,000 Credits", droids: [{ name: "R4", tier: 1 }, { name: "R5", tier: 2 }, { name: "R8", tier: 2 }] },
  { level: 4, credits: "2.95 Million Credits", droids: [{ name: "B1 Battle", tier: 2 }, { name: "B1 Security", tier: 2 }, { name: "R9", tier: 2 }] },
  { level: 5, credits: "5.35 Million Credits", droids: [{ name: "2BB", tier: 2 }, { name: "R3", tier: 2 }, { name: "Senate Hovercam", tier: 2 }] },
  { level: 6, credits: "9.85 Million Credits", droids: [{ name: "BDX Explorer", tier: 3 }, { name: "R4", tier: 3 }, { name: "R5", tier: 3 }] },
  { level: 7, credits: "14.5 Million Credits", droids: [{ name: "B1 Battle", tier: 3 }, { name: "R8", tier: 3 }, { name: "R9", tier: 3 }] },
  { level: 8, credits: "36 Million Credits", droids: [{ name: "2BB", tier: 4 }, { name: "B1 Security", tier: 4 }, { name: "R3", tier: 4 }] },
  { level: 9, credits: "89 Million Credits", droids: [{ name: "BDX Explorer", tier: 4 }, { name: "R4", tier: 4 }, { name: "R5", tier: 4 }] },
  { level: 10, credits: "220 Million Credits", droids: [{ name: "Groundmech", tier: 1 }, { name: "Senate Hovercam", tier: 4 }, { name: "Trak-R", tier: 1 }] },
  { level: 11, credits: "550 Million Credits", droids: [{ name: "B2 Heavy", tier: 1 }, { name: "B2 Super", tier: 1 }, { name: "Util-Tec", tier: 1 }] },
  { level: 12, credits: "1.36 Billion Credits", droids: [{ name: "Bal-Core", tier: 4 }, { name: "Groundmech", tier: 2 }, { name: "Trak-R", tier: 2 }] },
  { level: 13, credits: "3.4 Billion Credits", droids: [{ name: "B2 Super", tier: 4 }, { name: "Mecha-Droid", tier: 1 }, { name: "Proto-Roller", tier: 1 }] },
  { level: 14, credits: "8.45 Billion Credits", droids: [{ name: "Bal-Core", tier: 3 }, { name: "Groundmech", tier: 3 }, { name: "Trak-R", tier: 4 }] },
  { level: 15, credits: "21 Billion Credits", droids: [{ name: "B2 Heavy", tier: 3 }, { name: "B2 Super", tier: 4 }, { name: "B2-RP", tier: 1 }] },
  { level: 16, credits: "52 Billion Credits", droids: [{ name: "BB-9", tier: 1 }, { name: "R7", tier: 2 }, { name: "Util-Tec", tier: 4 }] },
  { level: 17, credits: "130 Billion Credits", droids: [{ name: "Cyclo-Grav", tier: 2 }, { name: "Mecha-Droid", tier: 2 }, { name: "Opti-STRK", tier: 1 }] },
  { level: 18, credits: "325 Billion Credits", droids: [{ name: "B2-RP", tier: 2 }, { name: "BB-9", tier: 2 }, { name: "R7", tier: 3 }] },
  { level: 19, credits: "810 Billion Credits", droids: [{ name: "B2-RP", tier: 4 }, { name: "Mecha-Droid", tier: 3 }, { name: "R7", tier: 4 }] },
  { level: 20, credits: "2 Trillion Credits", droids: [{ name: "Cyclo-Grav", tier: 4 }, { name: "MONO-WLKR", tier: 4 }, { name: "Opti-STRK", tier: 4 }] },
  { level: 21, credits: "3 Trillion Credits", droids: [{ name: "AMP Walker", tier: 5 }, { name: "Groundmech", tier: 5 }, { name: "Haul-R", tier: 5 }] },
  { level: 22, credits: "4.5 Trillion Credits", droids: [{ name: "B2 Super", tier: 5 }, { name: "Gunrunner", tier: 5 }, { name: "Strike-Orb", tier: 5 }] },
  { level: 23, credits: "6 Trillion Credits", droids: [{ name: "B2-RP", tier: 5 }, { name: "Cyclo-Grav", tier: 5 }, { name: "MONO-WLKR", tier: 5 }] },
  { level: 24, credits: "9 Trillion Credits", droids: [{ name: "Mecha-Droid", tier: 5 }, { name: "MO-TRAK", tier: 1 }, { name: "Proto-Roller", tier: 5 }] },
  { level: 25, credits: "13.5 Trillion Credits", droids: [{ name: "Opti-STRK", tier: 5 }, { name: "TRI-TEK", tier: 1 }, { name: "DRFT-R", tier: 2 }] },
  { level: 26, credits: "21 Trillion Credits", droids: [{ name: "CYCLENS", tier: 2 }, { name: "LEP", tier: 3 }, { name: "MO-TRAK", tier: 4 }] },
  { level: 27, credits: "32 Trillion Credits", droids: [{ name: "RIC-1200", tier: 3 }, { name: "SNOW MOUSE", tier: 4 }, { name: "LOADLIFTER", tier: 5 }] }
];;

const tiersConfig = [
  { level: 1, label: 'Base', short: 'BAS' },
  { level: 2, label: 'Oro', short: 'ORO' },
  { level: 3, label: 'Diamante', short: 'DIA' },
  { level: 4, label: 'Arcoíris', short: 'ARC' },
  { level: 5, label: 'Beskar', short: 'BES' },
  { level: 6, label: 'Galáctico', short: 'GAL' }
];

const getTierName = (tier: number) => {
  switch (tier) {
    case 1: return 'Base';
    case 2: return 'Oro';
    case 3: return 'Diamante';
    case 4: return 'Arcoíris';
    case 5: return 'Beskar';
    case 6: return 'Galáctico';
    default: return 'Ninguno';
  }
};

const getTierColor = (tier: number) => {
  switch (tier) {
    case 1: return 'text-slate-300 border-slate-700 bg-slate-800/20';
    case 2: return 'text-yellow-400 border-yellow-500/30 bg-yellow-500/5';
    case 3: return 'text-cyan-400 border-cyan-500/30 bg-cyan-500/5';
    case 4: return 'text-pink-400 border-pink-500/30 bg-pink-500/5';
    case 5: return 'text-purple-300 border-purple-500/40 bg-purple-950/20';
    case 6: return 'text-indigo-400 border-indigo-500/40 bg-indigo-950/20';
    default: return 'text-gray-500 border-transparent';
  }
};

const getNovaCrystals = (level: number): number => {
  if (level < 12) return 0;
  let crystals = 11;
  let increment = 5;
  for (let i = 13; i <= level; i++) {
    crystals += increment;
    increment += 1;
  }
  return crystals;
};

interface NovaUpgrade {
  id: string;
  nameKey: string;
  descKey: string;
  category: 'core' | 'workshop' | 'cosmetic' | 'iconic';
  maxLevel: number;
  costs: number[];
  icon: React.ComponentType<any>;
}

const novaUpgradesList: NovaUpgrade[] = [
  // Core Upgrades
  { id: 'max_health', nameKey: 'upgrade_max_health_name', descKey: 'upgrade_max_health_desc', category: 'core', maxLevel: 8, costs: [1, 6, 13, 19, 25, 31, 37, 43], icon: Heart },
  { id: 'damage', nameKey: 'upgrade_damage_name', descKey: 'upgrade_damage_desc', category: 'core', maxLevel: 8, costs: [1, 13, 25, 37, 49, 61, 73, 85], icon: Zap },
  { id: 'credits', nameKey: 'upgrade_credits_name', descKey: 'upgrade_credits_desc', category: 'core', maxLevel: 18, costs: [2, 6, 10, 14, 18, 22, 26, 30, 34, 38, 42, 46, 50, 54, 58, 62, 66, 70], icon: Coins },
  { id: 'flawless_charm', nameKey: 'upgrade_flawless_charm_name', descKey: 'upgrade_flawless_charm_desc', category: 'core', maxLevel: 1, costs: [500], icon: Sparkles },
  { id: 'movement_speed', nameKey: 'upgrade_movement_speed_name', descKey: 'upgrade_movement_speed_desc', category: 'core', maxLevel: 18, costs: [1, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34], icon: Zap },
  { id: 'double_quests', nameKey: 'upgrade_double_quests_name', descKey: 'upgrade_double_quests_desc', category: 'core', maxLevel: 1, costs: [75], icon: ListTodo },
  { id: 'pickaxe_mastery', nameKey: 'upgrade_pickaxe_mastery_name', descKey: 'upgrade_pickaxe_mastery_desc', category: 'core', maxLevel: 11, costs: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55], icon: Wrench },
  { id: 'jawa_bartering', nameKey: 'upgrade_jawa_bartering_name', descKey: 'upgrade_jawa_bartering_desc', category: 'core', maxLevel: 5, costs: [5, 15, 30, 45, 60], icon: ShoppingBag },
  { id: 'super_crates', nameKey: 'upgrade_super_crates_name', descKey: 'upgrade_super_crates_desc', category: 'core', maxLevel: 3, costs: [10, 25, 75], icon: Package },

  // Workshop Upgrades
  { id: 'lounge_slot', nameKey: 'upgrade_lounge_slot_name', descKey: 'upgrade_lounge_slot_desc', category: 'workshop', maxLevel: 4, costs: [1, 30, 60, 120], icon: Bed },
  { id: 'chip_scrap', nameKey: 'upgrade_chip_scrap_name', descKey: 'upgrade_chip_scrap_desc', category: 'workshop', maxLevel: 10, costs: [2, 5, 10, 15, 20, 25, 30, 35, 40, 45], icon: Cpu },
  { id: 'scrap_value', nameKey: 'upgrade_scrap_value_name', descKey: 'upgrade_scrap_value_desc', category: 'workshop', maxLevel: 10, costs: [25, 55, 85, 115, 145, 175, 205, 235, 265, 295], icon: Trash2 },
  { id: 'blueprint_scrap', nameKey: 'upgrade_blueprint_scrap_name', descKey: 'upgrade_blueprint_scrap_desc', category: 'workshop', maxLevel: 4, costs: [1, 12, 24, 36], icon: Layers },
  { id: 'crafting_speed', nameKey: 'upgrade_crafting_speed_name', descKey: 'upgrade_crafting_speed_desc', category: 'workshop', maxLevel: 10, costs: [3, 18, 33, 48, 63, 78, 93, 108, 123, 138], icon: Wrench },
  { id: 'blueprint_storage', nameKey: 'upgrade_blueprint_storage_name', descKey: 'upgrade_blueprint_storage_desc', category: 'workshop', maxLevel: 3, costs: [10, 75, 150], icon: Package },
  { id: 'collect_all', nameKey: 'upgrade_collect_all_name', descKey: 'upgrade_collect_all_desc', category: 'workshop', maxLevel: 3, costs: [3, 25, 100], icon: Inbox },
  { id: 'droid_alert', nameKey: 'upgrade_droid_alert_name', descKey: 'upgrade_droid_alert_desc', category: 'workshop', maxLevel: 1, costs: [10], icon: Bell },
  { id: 'blueprint_vendor', nameKey: 'upgrade_blueprint_vendor_name', descKey: 'upgrade_blueprint_vendor_desc', category: 'workshop', maxLevel: 1, costs: [10], icon: Store },

  // Cosmetic Upgrades
  { id: 'base_paint', nameKey: 'upgrade_base_paint_name', descKey: 'upgrade_base_paint_desc', category: 'cosmetic', maxLevel: 3, costs: [30, 120, 400], icon: Palette },

  // Iconic Droids (costs in Nova Crystals)
  { id: 'iconic_cb23', nameKey: 'CB-23', descKey: 'upgrade_iconic_desc', category: 'iconic', maxLevel: 1, costs: [75], icon: Sparkles },
  { id: 'iconic_bb8', nameKey: 'BB8', descKey: 'upgrade_iconic_desc', category: 'iconic', maxLevel: 1, costs: [30], icon: Sparkles },
  { id: 'iconic_mister_bones', nameKey: 'Mister Bones', descKey: 'upgrade_iconic_desc', category: 'iconic', maxLevel: 1, costs: [30], icon: Sparkles },
  { id: 'iconic_ig11_marshal', nameKey: 'IG-11 Marshal', descKey: 'upgrade_iconic_desc', category: 'iconic', maxLevel: 1, costs: [30], icon: Sparkles },
  { id: 'iconic_dj_r3x', nameKey: 'DJ R-3X', descKey: 'upgrade_iconic_desc', category: 'iconic', maxLevel: 1, costs: [30], icon: Sparkles },
  { id: 'iconic_r2d2', nameKey: 'R2-D2', descKey: 'upgrade_iconic_desc', category: 'iconic', maxLevel: 1, costs: [30], icon: Sparkles },
  { id: 'iconic_c3po', nameKey: 'C-3PO', descKey: 'upgrade_iconic_desc', category: 'iconic', maxLevel: 1, costs: [30], icon: Sparkles }
];

export default function App() {
  const [progress, setProgress] = useState<Record<string, number>>({});
  const [currentRebirth, setCurrentRebirth] = useState<number>(0); // 0 to 27
  const [currentCycle, setCurrentCycle] = useState<number>(3); // 2, 3, or 4
  const [showResetModal, setShowResetModal] = useState(false);
  const [showSuperRebirthModal, setShowSuperRebirthModal] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showFullGuide, setShowFullGuide] = useState<boolean>(false);
  const [language, setLanguage] = useState<string>('es');
  const sliderRef = useRef<HTMLDivElement>(null);

  // New features state
  const [activeTab, setActiveTab] = useState<'tracker' | 'droidex' | 'novashop'>('tracker');
  const [droidexObtained, setDroidexObtained] = useState<Record<string, Record<number, boolean>>>({});
  const [droidexFlawless, setDroidexFlawless] = useState<Record<string, boolean>>({});
  const [novaCrystals, setNovaCrystals] = useState<number>(0);
  const [novaUpgrades, setNovaUpgrades] = useState<Record<string, number>>({});
  const [activeDroidexTier, setActiveDroidexTier] = useState<number>(3); // Default to Diamond (3)
  const [selectedDroidexName, setSelectedDroidexName] = useState<string>('Mouse');
  const [activeShopCategory, setActiveShopCategory] = useState<'core' | 'workshop' | 'cosmetic' | 'iconic'>('core');
  const [selectedShopUpgradeId, setSelectedShopUpgradeId] = useState<string>('max_health');
  const [showCrystalsEdit, setShowCrystalsEdit] = useState<boolean>(false);
  const [crystalsInputValue, setCrystalsInputValue] = useState<string>('0');
  const [trackerSearch, setTrackerSearch] = useState<string>('');
  const [droidexSearch, setDroidexSearch] = useState<string>('');
  const [isToggleHovered, setIsToggleHovered] = useState<boolean>(false);


  // Scroll slider to active rebirth level
  useEffect(() => {
    if (isLoaded && sliderRef.current) {
      const activeBtn = sliderRef.current.children[currentRebirth] as HTMLButtonElement;
      if (activeBtn) {
        activeBtn.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }
  }, [currentRebirth, isLoaded]);

  // Keep selected droid valid when switching tiers
  useEffect(() => {
    if (activeDroidexTier > 1) {
      const droid = droidsData.find(d => d.name === selectedDroidexName);
      if (droid && droid.rarity === 'ICONICO') {
        setSelectedDroidexName('Mouse');
      }
    }
  }, [activeDroidexTier, selectedDroidexName]);

  // Translation helpers
  const t = (key: string, variables?: Record<string, string>) => {
    const translation = translations[language]?.[key] || translations['es']?.[key] || key;
    if (!variables) return translation;
    let result = translation;
    Object.entries(variables).forEach(([k, v]) => {
      result = result.replace(new RegExp(`{${k}}`, 'g'), v);
    });
    return result;
  };

  const getLocalizedTierName = (tier: number) => {
    switch (tier) {
      case 1: return t('tierName_1');
      case 2: return t('tierName_2');
      case 3: return t('tierName_3');
      case 4: return t('tierName_4');
      case 5: return t('tierName_5');
      case 6: return t('tierName_6');
      default: return t('tierName_Ninguno');
    }
  };

  const localizedTiersConfig = [
    { level: 1, label: t('tierName_1'), short: t('tierShort_1') },
    { level: 2, label: t('tierName_2'), short: t('tierShort_2') },
    { level: 3, label: t('tierName_3'), short: t('tierShort_3') },
    { level: 4, label: t('tierName_4'), short: t('tierShort_4') },
    { level: 5, label: t('tierName_5'), short: t('tierShort_5') },
    { level: 6, label: t('tierName_6'), short: t('tierShort_6') }
  ];

  const formatCredits = (creditsStr: string) => {
    if (language === 'en') return creditsStr;
    if (language === 'pt') {
      return creditsStr
        .replace('Credits', 'Créditos')
        .replace('Million', 'Milhões de')
        .replace('Billion', 'Bilhões de')
        .replace('Trillion', 'Trilhões de');
    }
    return creditsStr
      .replace('Credits', 'Créditos')
      .replace('Million', 'Millones de')
      .replace('Billion', 'Billones de')
      .replace('Trillion', 'Trillones de');
  };

  // Load progress, current rebirth, cycle and language from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem('droid_tycoon_tracker_v1');
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress));
    }
    const savedRebirth = localStorage.getItem('droid_tycoon_current_rebirth');
    if (savedRebirth) {
      const parsedRebirth = parseInt(savedRebirth, 10);
      if (parsedRebirth >= 0 && parsedRebirth <= 27) {
        setCurrentRebirth(parsedRebirth);
      }
    }
    const savedCycle = localStorage.getItem('droid_tycoon_current_cycle');
    if (savedCycle) {
      setCurrentCycle(parseInt(savedCycle, 10) || 3);
    }
    const savedLanguage = localStorage.getItem('droid_tycoon_language');
    if (savedLanguage === 'es' || savedLanguage === 'en' || savedLanguage === 'pt') {
      setLanguage(savedLanguage);
    } else {
      const browserLang = navigator.language.split('-')[0];
      if (browserLang === 'es' || browserLang === 'en' || browserLang === 'pt') {
        setLanguage(browserLang);
      } else {
        setLanguage('es');
      }
    }
    const savedDroidexObtained = localStorage.getItem('droid_tycoon_droidex_obtained');
    if (savedDroidexObtained) {
      setDroidexObtained(JSON.parse(savedDroidexObtained));
    }
    const savedDroidexFlawless = localStorage.getItem('droid_tycoon_droidex_flawless');
    if (savedDroidexFlawless) {
      setDroidexFlawless(JSON.parse(savedDroidexFlawless));
    }
    const savedNovaCrystals = localStorage.getItem('droid_tycoon_nova_crystals');
    if (savedNovaCrystals) {
      setNovaCrystals(parseInt(savedNovaCrystals, 10) || 0);
    }
    const savedNovaUpgrades = localStorage.getItem('droid_tycoon_nova_upgrades');
    if (savedNovaUpgrades) {
      setNovaUpgrades(JSON.parse(savedNovaUpgrades));
    }
    const savedActiveTab = localStorage.getItem('droid_tycoon_active_tab');
    if (savedActiveTab === 'tracker' || savedActiveTab === 'droidex' || savedActiveTab === 'novashop') {
      setActiveTab(savedActiveTab as any);
    }
    setIsLoaded(true);
  }, []);

  const saveLanguage = (lang: string) => {
    setLanguage(lang);
    localStorage.setItem('droid_tycoon_language', lang);
  };

  const saveActiveTab = (tab: 'tracker' | 'droidex' | 'novashop') => {
    setActiveTab(tab);
    localStorage.setItem('droid_tycoon_active_tab', tab);
  };

  const saveDroidexObtained = (newObtained: Record<string, Record<number, boolean>>) => {
    setDroidexObtained(newObtained);
    localStorage.setItem('droid_tycoon_droidex_obtained', JSON.stringify(newObtained));
  };

  const saveDroidexFlawless = (newFlawless: Record<string, boolean>) => {
    setDroidexFlawless(newFlawless);
    localStorage.setItem('droid_tycoon_droidex_flawless', JSON.stringify(newFlawless));
  };

  const saveNovaCrystals = (newCrystals: number) => {
    setNovaCrystals(newCrystals);
    localStorage.setItem('droid_tycoon_nova_crystals', newCrystals.toString());
  };

  const saveNovaUpgrades = (newUpgrades: Record<string, number>) => {
    setNovaUpgrades(newUpgrades);
    localStorage.setItem('droid_tycoon_nova_upgrades', JSON.stringify(newUpgrades));
  };

  const saveProgress = (newProgress: Record<string, number>) => {
    setProgress(newProgress);
    localStorage.setItem('droid_tycoon_tracker_v1', JSON.stringify(newProgress));
  };

  const saveRebirth = (rebirthLevel: number) => {
    setCurrentRebirth(rebirthLevel);
    localStorage.setItem('droid_tycoon_current_rebirth', rebirthLevel.toString());
  };

  const saveCycle = (cycle: number) => {
    setCurrentCycle(cycle);
    localStorage.setItem('droid_tycoon_current_cycle', cycle.toString());
  };

  const handleTierClick = (droidName: string, clickedLevel: number) => {
    const currentLevel = progress[droidName] || 0;
    const newLevel = currentLevel === clickedLevel ? clickedLevel - 1 : clickedLevel;
    saveProgress({ ...progress, [droidName]: newLevel });
  };

  const handleReset = () => {
    saveProgress({});
    saveRebirth(0);
    setShowResetModal(false);
  };

  const handleSuperRebirth = () => {
    const crystalsEarned = getNovaCrystals(currentRebirth);
    saveNovaCrystals(novaCrystals + crystalsEarned);
    saveProgress({});
    saveRebirth(0);
    setShowSuperRebirthModal(false);
  };

  const handleClearDroid = (droidName: string) => {
    saveProgress({ ...progress, [droidName]: 0 });
  };

  const isDroidexObtained = (droidName: string, tierLevel: number): boolean => {
    const droid = droidsData.find(d => d.name === droidName);
    if (droid?.rarity === 'ICONICO') {
      return !!droidexObtained[droidName]?.[1];
    }
    return !!droidexObtained[droidName]?.[tierLevel];
  };

  const setDroidexObtainedState = (droidName: string, tierLevel: number, isObtained: boolean) => {
    const droid = droidsData.find(d => d.name === droidName);
    const isIconic = droid?.rarity === 'ICONICO';
    const actualTier = isIconic ? 1 : tierLevel;

    const currentObtained = { ...(droidexObtained[droidName] || {}) };
    currentObtained[actualTier] = isObtained;

    const newDroidexObtained = {
      ...droidexObtained,
      [droidName]: currentObtained
    };
    saveDroidexObtained(newDroidexObtained);

    if (isIconic) {
      // Sync with iconic upgrades in Nova Shop
      const shopUpgradeId = `iconic_${droidName.toLowerCase().replace(/[^a-z0-9]/g, '')}`;
      const upgradeExists = novaUpgradesList.some(up => up.id === shopUpgradeId);
      if (upgradeExists) {
        const newUpgrades = { ...novaUpgrades };
        newUpgrades[shopUpgradeId] = isObtained ? 1 : 0;
        saveNovaUpgrades(newUpgrades);
      }
    }
  };

  const getUpgradeLevel = (upgradeId: string): number => {
    return novaUpgrades[upgradeId] || 0;
  };

  const setUpgradeLevelManual = (upgradeId: string, level: number) => {
    const upgrade = novaUpgradesList.find(up => up.id === upgradeId);
    if (!upgrade) return;

    const newLevel = Math.max(0, Math.min(upgrade.maxLevel, level));
    const newUpgrades = {
      ...novaUpgrades,
      [upgradeId]: newLevel
    };
    saveNovaUpgrades(newUpgrades);

    // Sync if iconic
    const droidNameMap: Record<string, string> = {
      iconic_cb23: 'CB-23',
      iconic_bb8: 'BB8',
      iconic_mister_bones: 'Mister Bones',
      iconic_ig11_marshal: 'IG-11 Marshal',
      iconic_dj_r3x: 'DJ R-3X',
      iconic_r2d2: 'R2-D2',
      iconic_c3po: 'C-3PO'
    };
    const droidName = droidNameMap[upgradeId];
    if (droidName) {
      const currentObtained = { ...(droidexObtained[droidName] || {}) };
      currentObtained[1] = newLevel > 0;
      const newDroidexObtained = {
        ...droidexObtained,
        [droidName]: currentObtained
      };
      saveDroidexObtained(newDroidexObtained);
    }
  };

  const buyUpgradeLevel = (upgradeId: string) => {
    const upgrade = novaUpgradesList.find(up => up.id === upgradeId);
    if (!upgrade) return;

    const currentLevel = getUpgradeLevel(upgradeId);
    if (currentLevel >= upgrade.maxLevel) return;

    const cost = upgrade.costs[currentLevel];
    if (novaCrystals < cost) return;

    saveNovaCrystals(novaCrystals - cost);
    setUpgradeLevelManual(upgradeId, currentLevel + 1);
  };

  const rebirthRequirements = currentCycle === 1
    ? rebirthRequirementsCycle1
    : currentCycle === 2
      ? rebirthRequirementsCycle2
      : currentCycle === 4
        ? rebirthRequirementsCycle4
        : rebirthRequirementsCycle3;

  const getRequiredTier = (droidName: string): number => {
    let maxRequiredTier = 0;
    rebirthRequirements.forEach(req => {
      if (req.level > currentRebirth) {
        const d = req.droids.find(dr => dr.name.toLowerCase() === droidName.toLowerCase());
        if (d && d.tier > maxRequiredTier) {
          maxRequiredTier = d.tier;
        }
      }
    });
    return maxRequiredTier;
  };

  const getDroidRequirements = (droidName: string) => {
    const list: { level: number; tier: number }[] = [];
    rebirthRequirements.forEach(req => {
      const d = req.droids.find(dr => dr.name.toLowerCase() === droidName.toLowerCase());
      if (d) {
        list.push({ level: req.level, tier: d.tier });
      }
    });
    return list.sort((a, b) => a.level - b.level);
  };

  const isDroidInCycle = (droidName: string): boolean => {
    return rebirthRequirements.some(req =>
      req.droids.some(dr => dr.name.toLowerCase() === droidName.toLowerCase())
    );
  };

  const isImmediateTarget = (droidName: string): boolean => {
    const nextLevel = currentRebirth + 1;
    const nextReq = rebirthRequirements.find(req => req.level === nextLevel);
    if (!nextReq) return false;
    const d = nextReq.droids.find(dr => dr.name.toLowerCase() === droidName.toLowerCase());
    if (!d) return false;
    const achieved = progress[droidName] || 0;
    return achieved < d.tier;
  };

  const getRebirthStatus = (req: RebirthRequirement) => {
    if (req.level <= currentRebirth) {
      return 'completed';
    }
    const allMet = req.droids.every(d => {
      const achieved = progress[d.name] || 0;
      return achieved >= d.tier;
    });
    return allMet ? 'ready' : 'pending';
  };

  const getGuideMaxTier = (droidName: string): number => {
    let maxTier = 0;
    rebirthRequirements.forEach(req => {
      const d = req.droids.find(dr => dr.name.toLowerCase() === droidName.toLowerCase());
      if (d && d.tier > maxTier) {
        maxTier = d.tier;
      }
    });
    return maxTier;
  };

  const getDroidRecommendation = (droidName: string, achieved: number, required: number) => {
    const guideMax = getGuideMaxTier(droidName);
    const reqList = getDroidRequirements(droidName);
    const nextUnmet = reqList.find(r => r.level > currentRebirth && achieved < r.tier);

    if (nextUnmet) {
      const nextLevel = currentRebirth + 1;
      const isNeededForNext = reqList.some(r => r.level === nextLevel && achieved < r.tier);
      
      if (isNeededForNext) {
        return {
          type: 'upgrade',
          text: t('recUpgrade', { level: nextUnmet.level.toString(), tier: getLocalizedTierName(nextUnmet.tier) })
        };
      } else {
        return {
          type: 'keep_upgrade',
          text: t('recKeepUpgrade', { level: nextLevel.toString(), futureLevel: nextUnmet.level.toString(), tier: getLocalizedTierName(nextUnmet.tier) })
        };
      }
    } else {
      if (required === 0) {
        if (achieved > 0) {
          return {
            type: 'sell',
            text: t('recSell', { tier: getLocalizedTierName(guideMax) })
          };
        } else {
          return {
            type: 'none',
            text: t('recNone')
          };
        }
      } else {
        return {
          type: 'keep',
          text: t('recKeep', { tier: getLocalizedTierName(guideMax) })
        };
      }
    }
  };

  const activeRequirements = rebirthRequirements.filter(req => req.level > currentRebirth);
  const totalActiveDroidRequirements = activeRequirements.length * 3;
  const metActiveDroidRequirements = activeRequirements.reduce((acc, req) => {
    const metCount = req.droids.filter(d => {
      const achieved = progress[d.name] || 0;
      return achieved >= d.tier;
    }).length;
    return acc + metCount;
  }, 0);
  const activePercentComplete = totalActiveDroidRequirements > 0
    ? Math.round((metActiveDroidRequirements / totalActiveDroidRequirements) * 100)
    : 100;

  const classifiedDroids = droidsData.map(droid => {
    const achieved = progress[droid.name] || 0;
    const required = getRequiredTier(droid.name);
    const immediate = isImmediateTarget(droid.name);
    
    let status: 'immediate' | 'needed' | 'completed' | 'discarded' = 'discarded';
    if (required === 0) {
      status = 'discarded';
    } else if (achieved >= required) {
      status = 'completed';
    } else if (immediate) {
      status = 'immediate';
    } else {
      status = 'needed';
    }

    return {
      ...droid,
      achieved,
      required,
      status
    };
  });

  const isNeededForCurrentRebirth = (droidName: string): boolean => {
    const nextLevel = currentRebirth + 1;
    const nextReq = rebirthRequirements.find(req => req.level === nextLevel);
    if (!nextReq) return false;
    return nextReq.droids.some(dr => dr.name.toLowerCase() === droidName.toLowerCase());
  };

  const sortedDroids = [...classifiedDroids]
    .sort((a, b) => {
      const isDiscardedA = a.status === 'discarded';
      const isDiscardedB = b.status === 'discarded';
      if (isDiscardedA !== isDiscardedB) {
        return isDiscardedA ? 1 : -1;
      }

      if (!isDiscardedA) {
        const isCurrentA = isNeededForCurrentRebirth(a.name);
        const isCurrentB = isNeededForCurrentRebirth(b.name);
        if (isCurrentA !== isCurrentB) {
          return isCurrentA ? -1 : 1;
        }
      }

      return a.name.localeCompare(b.name);
    })
    .filter(droid => droid.name.toLowerCase().includes(trackerSearch.toLowerCase()));

  const requiredDroids = sortedDroids.filter(d => d.status !== 'discarded');
  const discardedDroids = sortedDroids.filter(d => d.status === 'discarded');

  // Counts for Droidex
  const getDroidexStats = () => {
    let obtainedCount = 0;
    droidsData.forEach(droid => {
      if (droid.rarity !== 'ICONICO') {
        for (let t = 1; t <= 6; t++) {
          if (isDroidexObtained(droid.name, t)) {
            obtainedCount++;
          }
        }
      } else {
        if (isDroidexObtained(droid.name, 1)) {
          obtainedCount++;
        }
      }
    });

    const flawlessCount = droidsData.filter(droid => droid.rarity !== 'ICONICO' && !!droidexFlawless[droid.name]).length;
    const creditMultiplier = flawlessCount * 0.01;

    return {
      obtainedCount,
      totalCount: 379,
      flawlessCount,
      totalFlawless: 62,
      creditMultiplier
    };
  };

  const getMilestoneInfo = (obtainedCount: number) => {
    const milestones = [
      { droids: 5, multiplier: 5 },
      { droids: 10, multiplier: 10 },
      { droids: 25, multiplier: 35 },
      { droids: 50, multiplier: 55 },
      { droids: 100, multiplier: 75 },
      { droids: 150, multiplier: 100 },
      { droids: 200, multiplier: 150 },
      { droids: 250, multiplier: 200 },
      { droids: 300, multiplier: 250 },
      { droids: 379, multiplier: 300 }
    ];

    const currentMilestone = milestones.find(m => obtainedCount < m.droids) || milestones[milestones.length - 1];
    const prevDroids = milestones.find(m => m.droids < currentMilestone.droids)?.droids || 0;
    
    return {
      needed: currentMilestone.droids,
      multiplier: currentMilestone.multiplier,
      progress: obtainedCount,
      percent: Math.min(100, (obtainedCount / currentMilestone.droids) * 100),
      isMax: obtainedCount === 379
    };
  };

  const isIconicDroid = (droid: Droid) => droid.rarity === 'ICONICO';

  const getDroidexStatsPerk = (droid: Droid, tier: number): string => {
    if (droid.rarity === 'ICONICO') {
      if (language === 'es') {
        switch (droid.name) {
          case 'BB8': return 'Habilidad: Doble cantidad de chips de mejora y +15% de ingresos.';
          case 'CB-23': return 'Habilidad: Desbloquea misiones astromecánicas secretas y +15% de ingresos.';
          case 'DJ R-3X': return 'Habilidad: Completa misiones mundiales sin importar tipo y +15% de ingresos.';
          case 'IG-11 Marshal': return 'Habilidad: Escudo de invulnerabilidad al comprar planos y +15% de ingresos.';
          case 'Mister Bones': return 'Habilidad: Doble daño para combatientes y +15% de ingresos.';
          case 'R2-D2': return 'Habilidad: +15% de ingresos de Créditos por segundo.';
          case 'C-3PO': return 'Habilidad: Multiplicador de XP aumentado en toda la fábrica y +15% de ingresos.';
          default: return 'Habilidad Icónica especial.';
        }
      } else if (language === 'pt') {
        switch (droid.name) {
          case 'BB8': return 'Habilidade: Dobro de chips de melhoria e +15% de renda.';
          case 'CB-23': return 'Habilidade: Desbloqueia missões astromecânicas secretas e +15% de renda.';
          case 'DJ R-3X': return 'Habilidade: Conclui missões mundiais independentemente do tipo e +15% de renda.';
          case 'IG-11 Marshal': return 'Habilidade: Escudo de invulnerabilidade ao comprar projetos e +15% de renda.';
          case 'Mister Bones': return 'Habilidade: Dobro de dano para combatentes e +15% de renda.';
          case 'R2-D2': return 'Habilidade: +15% de renda de Créditos por segundo.';
          case 'C-3PO': return 'Habilidade: Multiplicador de XP aumentado em toda a fábrica e +15% de renda.';
          default: return 'Habilidade Icônica especial.';
        }
      } else {
        switch (droid.name) {
          case 'BB8': return 'Ability: Double amount of upgrade chips and +15% income.';
          case 'CB-23': return 'Ability: Unlocks secret astromech missions and +15% income.';
          case 'DJ R-3X': return 'Ability: Complete world missions regardless of type and +15% income.';
          case 'IG-11 Marshal': return 'Ability: Invulnerability shield when purchasing blueprints and +15% income.';
          case 'Mister Bones': return 'Ability: Double damage for combat and +15% income.';
          case 'R2-D2': return 'Ability: +15% Credit income per second.';
          case 'C-3PO': return 'Ability: Increased XP multiplier across the factory and +15% income.';
          default: return 'Special iconic ability.';
        }
      }
    }

    let rarityMult = 0.5;
    switch (droid.rarity) {
      case 'COMUN': rarityMult = 0.25; break;
      case 'RARO': rarityMult = 0.5; break;
      case 'EPICO': rarityMult = 1.0; break;
      case 'LEGENDARIO': rarityMult = 1.5; break;
      case 'MITICO': rarityMult = 2.0; break;
    }

    let tierBase = 10;
    switch (tier) {
      case 1: tierBase = 10; break;
      case 2: tierBase = 30; break;
      case 3: tierBase = 70; break;
      case 4: tierBase = 150; break;
      case 5: tierBase = 300; break;
    }

    const value = Math.round(tierBase * rarityMult);

    if (droid.type === 'PELEA') {
      if (language === 'es') return `+${value} de Vida máxima`;
      if (language === 'pt') return `+${value} de Vida máxima`;
      return `+${value} Max Health`;
    } else if (droid.type === 'ASTRO') {
      if (language === 'es') return `+${value}% de Créditos`;
      if (language === 'pt') return `+${value}% de Créditos`;
      return `+${value}% Credits`;
    } else {
      if (language === 'es') return `+${value}% de Vel. de Trabajo`;
      if (language === 'pt') return `+${value}% de Vel. de Trabalho`;
      return `+${value}% Work Speed`;
    }
  };

  const getIconicDroidDesc = (name: string): string => {
    if (language === 'es') {
      switch (name) {
        case 'BB8': return 'Habilidad: Doble cantidad de chips de mejora y +15% de ingresos.';
        case 'CB-23': return 'Habilidad: Desbloquea misiones astromecánicas secretas y +15% de ingresos.';
        case 'DJ R-3X': return 'Habilidad: Completa misiones mundiales sin importar tipo y +15% de ingresos.';
        case 'IG-11 Marshal': return 'Habilidad: Escudo de invulnerabilidad al comprar planos y +15% de ingresos.';
        case 'Mister Bones': return 'Habilidad: Doble daño para combatientes y +15% de ingresos.';
        case 'R2-D2': return 'Habilidad: +15% de ingresos de Créditos por segundo.';
        case 'C-3PO': return 'Habilidad: Multiplicador de XP aumentado en toda la fábrica y +15% de ingresos.';
        default: return 'Droide icónico especial.';
      }
    } else if (language === 'pt') {
      switch (name) {
        case 'BB8': return 'Habilidade: Dobro de chips de melhoria e +15% de renda.';
        case 'CB-23': return 'Habilidade: Desbloqueia missões astromecânicas secretas e +15% de renda.';
        case 'DJ R-3X': return 'Habilidade: Conclui missões mundiais independentemente do tipo e +15% de renda.';
        case 'IG-11 Marshal': return 'Habilidade: Escudo de invulnerabilidade ao comprar projetos e +15% de renda.';
        case 'Mister Bones': return 'Habilidade: Dobro de dano para combatentes e +15% de renda.';
        case 'R2-D2': return 'Habilidade: +15% de renda de Créditos por segundo.';
        case 'C-3PO': return 'Habilidade: Multiplicador de XP aumentado em toda a fábrica e +15% de renda.';
        default: return 'Droide icônico especial.';
      }
    } else {
      switch (name) {
        case 'BB8': return 'Ability: Double amount of upgrade chips and +15% income.';
        case 'CB-23': return 'Ability: Unlocks secret astromech missions and +15% income.';
        case 'DJ R-3X': return 'Ability: Complete world missions regardless of type and +15% income.';
        case 'IG-11 Marshal': return 'Ability: Invulnerability shield when purchasing blueprints and +15% income.';
        case 'Mister Bones': return 'Ability: Double damage for combat and +15% income.';
        case 'R2-D2': return 'Ability: +15% Credit income per second.';
        case 'C-3PO': return 'Ability: Increased XP multiplier across the factory and +15% income.';
        default: return 'Special iconic droid.';
      }
    }
  };

  const renderDroidModel = (droid: Droid, tier: number) => {
    let glowColor = 'text-slate-400';
    let pulseClass = 'animate-pulse';
    
    switch (tier) {
      case 1: glowColor = 'text-slate-400'; break;
      case 2: glowColor = 'text-yellow-400'; break;
      case 3: glowColor = 'text-cyan-400'; break;
      case 4: glowColor = 'text-pink-400'; break;
      case 5: glowColor = 'text-purple-400'; break;
      default: glowColor = 'text-slate-400';
    }

    if (droid.rarity === 'ICONICO') {
      glowColor = 'text-fuchsia-400';
    }

    return (
      <svg className={`w-32 h-32 ${glowColor} ${pulseClass}`} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="50" cy="35" r="18" className="opacity-80" strokeDasharray="3,3" />
        <rect x="36" y="53" width="28" height="30" rx="4" className="opacity-90" />
        <line x1="50" y1="17" x2="50" y2="10" strokeWidth="3" />
        <circle cx="50" cy="8" r="3" fill="currentColor" />
        <line x1="38" y1="20" x2="30" y2="12" />
        <line x1="62" y1="20" x2="70" y2="12" />
        <circle cx="43" cy="35" r="3" fill="currentColor" />
        <circle cx="57" cy="35" r="3" fill="currentColor" />
        <rect x="42" y="60" width="16" height="10" rx="1" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2,1" />
        {tier === 4 && (
          <>
            <path d="M15,25 L18,28 L15,31 L12,28 Z" fill="currentColor" className="animate-ping" />
            <path d="M85,30 L88,33 L85,36 L82,33 Z" fill="currentColor" className="animate-ping" />
          </>
        )}
        {tier === 5 && (
          <>
            <path d="M20,70 L24,74 L20,78 L16,74 Z" fill="currentColor" className="animate-bounce" />
            <path d="M80,70 L84,74 L80,78 L76,74 Z" fill="currentColor" className="animate-bounce" />
          </>
        )}
      </svg>
    );
  };

  if (!isLoaded) return null;

  const stats = getDroidexStats();
  const milestone = getMilestoneInfo(stats.obtainedCount);
  
  const filteredDroidexList = droidsData
    .filter(droid => {
      if (activeDroidexTier === 1) {
        return true;
      } else {
        return droid.rarity !== 'ICONICO';
      }
    })
    .filter(droid => droid.name.toLowerCase().includes(droidexSearch.toLowerCase()))
    .sort((a, b) => {
      const isObtainedA = isDroidexObtained(a.name, activeDroidexTier);
      const isObtainedB = isDroidexObtained(b.name, activeDroidexTier);
      if (isObtainedA !== isObtainedB) {
        return isObtainedA ? 1 : -1;
      }
      return a.name.localeCompare(b.name);
    });

  const selectedDroid = droidsData.find(d => d.name === selectedDroidexName) || droidsData[0];
  const isSelectedObtained = isDroidexObtained(selectedDroid.name, activeDroidexTier);
  const isSelectedFlawless = !isIconicDroid(selectedDroid) && !!droidexFlawless[selectedDroid.name];

  const handlePrevDroid = () => {
    if (filteredDroidexList.length === 0) return;
    const idx = filteredDroidexList.findIndex(d => d.name === selectedDroidexName);
    if (idx > 0) {
      setSelectedDroidexName(filteredDroidexList[idx - 1].name);
    } else {
      setSelectedDroidexName(filteredDroidexList[filteredDroidexList.length - 1].name);
    }
  };

  const handleNextDroid = () => {
    if (filteredDroidexList.length === 0) return;
    const idx = filteredDroidexList.findIndex(d => d.name === selectedDroidexName);
    if (idx < filteredDroidexList.length - 1 && idx >= 0) {
      setSelectedDroidexName(filteredDroidexList[idx + 1].name);
    } else {
      setSelectedDroidexName(filteredDroidexList[0].name);
    }
  };

  const nextLevel = currentRebirth + 1;
  const nextReq = rebirthRequirements.find(r => r.level === nextLevel);
  const isNextReqMet = nextReq ? getRebirthStatus(nextReq) === 'ready' : false;

  return (
    <div className="min-h-screen bg-[#050810] text-[#e2e8f0] font-sans antialiased p-3 pb-8 space-y-4">
      <div className="max-w-6xl mx-auto space-y-3">
        
        {/* Navigation Tabs */}
        <div className="flex bg-[#0c1628]/80 border border-institutional-border p-1 rounded-xl shadow-md gap-1">
          <button
            onClick={() => saveActiveTab('tracker')}
            className={`flex-1 py-2 text-xs font-bold font-narrow rounded-lg transition-all text-center cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'tracker'
                ? 'bg-institutional-primary text-white shadow-sm border border-institutional-secondary/35'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
            }`}
          >
            <Target size={14} />
            <span>{t('navTracker')}</span>
          </button>
          <button
            onClick={() => saveActiveTab('droidex')}
            className={`flex-1 py-2 text-xs font-bold font-narrow rounded-lg transition-all text-center cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'droidex'
                ? 'bg-institutional-primary text-white shadow-sm border border-institutional-secondary/35'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
            }`}
          >
            <Award size={14} />
            <span>{t('navDroidex')}</span>
          </button>
          <button
            onClick={() => saveActiveTab('novashop')}
            className={`flex-1 py-2 text-xs font-bold font-narrow rounded-lg transition-all text-center cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'novashop'
                ? 'bg-institutional-primary text-white shadow-sm border border-institutional-secondary/35'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
            }`}
          >
            <Sparkles size={14} />
            <span>{t('navNovaShop')}</span>
          </button>
        </div>

        {activeTab === 'tracker' && (
          <>
            {/* Cabecera y Controles Principales */}
            <header className="bg-gradient-to-br from-[#0c1628] to-[#0a101d] border border-institutional-border p-3.5 rounded-xl shadow-lg flex flex-col gap-3">
          
          {/* Fila 1: Título y Controles */}
          <div className="flex justify-between items-center gap-2">
            <h1 className="text-base font-bold text-white font-narrow flex items-center gap-1.5 flex-wrap">
              <span>{t('title')}</span>
              <div className="relative inline-flex items-center">
                <select
                  value={currentCycle}
                  onChange={(e) => saveCycle(parseInt(e.target.value, 10))}
                  className="bg-institutional-primary/30 text-institutional-secondary border border-institutional-primary/50 px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider cursor-pointer outline-none hover:bg-institutional-primary/45 transition-colors"
                >
                  <option value={1} className="bg-[#0c1628] text-white">{t('cycle')} 1</option>
                  <option value={2} className="bg-[#0c1628] text-white">{t('cycle')} 2</option>
                  <option value={3} className="bg-[#0c1628] text-white">{t('cycle')} 3</option>
                  <option value={4} className="bg-[#0c1628] text-white">{t('cycle')} 4</option>
                </select>
              </div>
            </h1>
            <div className="flex items-center gap-1.5">
              {/* Selector de Idioma */}
              <div className="relative inline-flex items-center">
                <select
                  value={language}
                  onChange={(e) => saveLanguage(e.target.value)}
                  className="bg-institutional-primary/30 text-institutional-secondary border border-institutional-primary/50 px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer outline-none hover:bg-institutional-primary/45 transition-colors uppercase"
                >
                  <option value="es" className="bg-[#0c1628] text-white">ES</option>
                  <option value="en" className="bg-[#0c1628] text-white">EN</option>
                  <option value="pt" className="bg-[#0c1628] text-white">PT</option>
                </select>
              </div>

              {/* Botón Super Rebirth */}
              {currentRebirth >= 12 ? (
                <button
                  onClick={() => setShowSuperRebirthModal(true)}
                  className="flex items-center gap-1 px-2.5 py-1 text-xs bg-purple-700 hover:bg-purple-650 text-white rounded-lg border border-purple-500/30 shadow-[0_0_8px_rgba(147,51,234,0.3)] transition-all cursor-pointer font-bold"
                >
                  <Sparkles size={12} /> <span>{t('superRebirth')} (+{getNovaCrystals(currentRebirth)})</span>
                </button>
              ) : (
                <button
                  disabled
                  className="flex items-center gap-1 px-2.5 py-1 text-xs bg-purple-955/20 border border-purple-900/40 text-purple-400/40 rounded-lg cursor-not-allowed font-bold"
                  title={t('superRebirthTooltip')}
                >
                  <Lock size={12} /> <span>{t('superRebirth')} (R-12)</span>
                </button>
              )}

              {/* Botón Reiniciar */}
              <button 
                onClick={() => setShowResetModal(true)}
                className="flex items-center gap-1 px-2.5 py-1 text-xs text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg border border-red-500/25 transition-colors cursor-pointer font-bold"
              >
                <RotateCcw size={12} /> <span>{t('reiniciar')}</span>
              </button>
            </div>
          </div>

          {/* Fila 2: Selector Rebirth Horizontal Deslizable */}
          <div className="bg-[#050810]/75 py-2 px-3 rounded-lg border border-institutional-border flex flex-col gap-1.5">
            <div className="flex justify-between items-center text-[11px] text-[#94a3b8]">
              <span className="font-bold flex items-center gap-1">
                <Target size={12} className="text-institutional-secondary" />
                {t('slideRebirth')}
              </span>
              <span>{t('rebirthLabel')} <strong className="text-white">R-{currentRebirth}</strong></span>
            </div>
            <div ref={sliderRef} className="flex gap-1.5 overflow-x-auto pb-1.5 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
              {Array.from({ length: 28 }, (_, i) => {
                const lvl = i;
                const isActive = lvl === currentRebirth;
                
                let btnClass = "h-8 w-8 text-xs font-bold rounded-full flex items-center justify-center transition-all duration-100 select-none cursor-pointer flex-shrink-0 ";
                if (isActive) {
                  btnClass += "bg-institutional-primary text-white border-2 border-institutional-secondary font-extrabold shadow-[0_0_8px_rgba(0,173,238,0.3)]";
                } else {
                  btnClass += "bg-[#050810] border border-institutional-border text-[#94a3b8] hover:border-slate-500 hover:text-white";
                }

                return (
                  <button
                    key={lvl}
                    onClick={() => saveRebirth(lvl)}
                    className={btnClass}
                  >
                    {lvl}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Fila 3: Siguiente Rebirth Requisitos */}
          <div className="bg-[#050810]/80 border border-institutional-border rounded-xl p-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs">
            {nextReq ? (
              <>
                <div className="space-y-2 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="bg-institutional-secondary/20 text-institutional-secondary border border-institutional-secondary/35 px-2 py-0.5 rounded text-[10px] font-bold">
                      {t('nextMeta')}
                    </span>
                    <span className="text-sm font-extrabold text-white font-narrow">
                      {t('requirementsForRebirth', { level: nextLevel.toString() })}
                    </span>
                    <span className="text-yellow-400 font-bold bg-yellow-500/10 border border-yellow-500/20 px-2 py-0.5 rounded flex items-center gap-1 font-mono">
                      <Coins size={12} />
                      {formatCredits(nextReq.credits)}
                    </span>
                  </div>
                  
                  {/* Requisitos droids */}
                  <div className="flex flex-wrap gap-1.5">
                    {nextReq.droids.map((reqDroid, index) => {
                      const achieved = progress[reqDroid.name] || 0;
                      const isMet = achieved >= reqDroid.tier;

                      return (
                        <span 
                          key={index}
                          className={`px-2 py-1 rounded text-xs border flex items-center gap-1.5 ${
                            isMet 
                              ? 'bg-green-950/20 border-green-900/35 text-green-400 font-bold' 
                              : 'bg-slate-900 border-slate-800 text-slate-350'
                          }`}
                        >
                          <span>{reqDroid.name}:</span>
                          <strong className={`${getTierColor(reqDroid.tier)}`}>
                            {getLocalizedTierName(reqDroid.tier)}
                          </strong>
                          {isMet ? ' ✓' : ` (${getLocalizedTierName(achieved)})`}
                        </span>
                      );
                    })}
                  </div>
                </div>

                {isNextReqMet && (
                  <button
                    onClick={() => saveRebirth(nextLevel)}
                    className="bg-green-600 hover:bg-green-500 text-white rounded-lg px-4 py-2 text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer w-full sm:w-auto shrink-0 shadow-md"
                  >
                    <span>{t('rebirthReady')}</span>
                    <ArrowRight size={12} />
                  </button>
                )}
              </>
            ) : (
              <span className="text-green-400 font-bold flex items-center gap-2 py-1 text-sm">
                <Sparkles size={16} /> {t('congratulationsFinished')}
              </span>
            )}
          </div>

        </header>

        {/* Grilla Principal de Droides: 2 columnas en mobile, hasta 5 en pantallas grandes */}
        <main className="space-y-4">
          
          {/* Buscador */}
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
              <Search size={14} />
            </span>
            <input
              type="text"
              value={trackerSearch}
              onChange={(e) => setTrackerSearch(e.target.value)}
              placeholder={t('searchPlaceholder')}
              className="w-full bg-[#0c1628]/80 border border-institutional-border focus:border-institutional-secondary/60 pl-9 pr-9 py-2 rounded-xl text-xs text-white placeholder-slate-500 outline-none transition-colors shadow-sm"
            />
            {trackerSearch && (
              <button
                onClick={() => setTrackerSearch('')}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-white cursor-pointer"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Sección 1: Requisitos de Rebirth */}
          <div className="space-y-2">
            <div className="flex justify-between items-center px-1">
              <h3 className="text-[10px] sm:text-xs uppercase font-extrabold text-[#64748b] tracking-wider">
                {t('rebirthRequirementsSection')}
              </h3>
              {requiredDroids.length !== droidsData.filter(d => getRequiredTier(d.name) > 0).length && (
                <span className="text-[9px] font-mono text-slate-500 font-bold">
                  {requiredDroids.length} / {droidsData.filter(d => getRequiredTier(d.name) > 0).length}
                </span>
              )}
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2">
              {requiredDroids.map(droid => {
                const isCompleted = droid.status === 'completed';
                const isImmediate = droid.status === 'immediate';

                const typeInfo = droidTypes[droid.type] || droidTypes.ASTRO;
                const rarityInfo = droidRarities[droid.rarity] || droidRarities.COMUN;
                const TypeIcon = typeInfo.icon;

                const reqList = getDroidRequirements(droid.name);
                const rec = getDroidRecommendation(droid.name, droid.achieved, droid.required);

                return (
                  <div 
                    key={droid.name} 
                    className={`p-3 rounded-lg border flex flex-col justify-between transition-all duration-150 ${
                      isImmediate
                        ? 'bg-gradient-to-b from-[#112544] to-[#0c1628] border-2 border-institutional-secondary ring-1 ring-institutional-secondary/20 shadow-[0_0_12px_rgba(0,173,238,0.25)]'
                        : isCompleted 
                        ? 'bg-[#0c1628]/35 border-green-950/20 opacity-80' 
                        : 'bg-[#0c1628]/80 border-institutional-border/80 hover:border-slate-700'
                    }`}
                  >
                    {/* Fila 1: Nombre, Rarity y Trash/Clear */}
                    <div className="flex justify-between items-center gap-1.5 mb-2">
                      <h4 className={`text-sm sm:text-base truncate flex-1 leading-tight ${
                        isImmediate 
                          ? 'text-institutional-secondary font-extrabold' 
                          : 'text-white font-bold'
                      }`} title={droid.name}>
                        {droid.name}
                      </h4>
                      <div className="flex gap-1.5 flex-shrink-0 items-center">
                        {droid.achieved > 0 && (
                          <button
                            onClick={() => handleClearDroid(droid.name)}
                            className="p-0.5 text-slate-500 hover:text-red-400 hover:bg-red-950/30 rounded transition-colors cursor-pointer"
                            title={t('notRequiredTooltip')}
                          >
                            <Trash2 size={11} />
                          </button>
                        )}
                        {isImmediate && (
                          <span className="px-1.5 py-0.5 bg-institutional-secondary text-[#050810] text-[8px] font-extrabold rounded leading-none" title={t('requiredForRebirthTooltip', { level: nextLevel.toString() })}>
                            R-{nextLevel}
                          </span>
                        )}
                        <span className={`text-[8px] font-extrabold uppercase px-1 py-0.2 rounded border border-current leading-none ${rarityInfo.color}`} title={t('rarityTooltip') + ': ' + t(`rarity_${droid.rarity}`)}>
                          {t(`rarity_${droid.rarity}`)[0]}
                        </span>
                        <span className={`text-[8px] font-semibold flex items-center px-1 py-0.2 rounded leading-none ${typeInfo.color} ${typeInfo.bg}`} title={t('typeTooltip') + ': ' + t(`type_${droid.type}`)}>
                          <TypeIcon size={8} />
                        </span>
                      </div>
                    </div>

                    {/* Fila 2: Requisitos y Meta (Descriptivo) */}
                    <div className="bg-[#050810]/50 px-2 py-1 rounded text-[10px] flex justify-between items-center mb-2.5 border border-institutional-border/30" title={rec.text}>
                      <span className={`truncate text-[9px] font-bold ${
                        rec.type === 'upgrade' ? 'text-yellow-400' :
                        rec.type === 'keep_upgrade' ? 'text-cyan-400' :
                        rec.type === 'keep' ? 'text-green-400 font-bold' :
                        'text-slate-400 font-medium'
                      }`}>
                        {rec.text}
                      </span>
                      <span className="text-slate-500 text-[8px] font-mono truncate ml-1 flex-shrink-0" title={t('futureRebirthsTooltip')}>
                        {reqList.filter(r => r.level > currentRebirth).map(r => `R${r.level}`).join(', ')}
                      </span>
                    </div>

                    {/* Fila 3: Selector de los 6 Niveles (Cómodo para dedos) */}
                    <div className="flex w-full h-8 shadow-sm">
                      {localizedTiersConfig.map(tier => {
                        const isActive = tier.level <= droid.achieved;
                        let baseClasses = "flex-1 flex items-center justify-center text-[10px] font-bold border-y border-r last:border-r-0 first:border-l first:rounded-l-lg last:rounded-r-lg transition-all duration-100 select-none ";

                        if (!isActive) {
                          baseClasses += "bg-slate-950 border-slate-900/60 text-slate-600 hover:bg-slate-900 cursor-pointer";
                        } else {
                          baseClasses += "cursor-pointer border-transparent z-10 ";
                          switch(tier.level) {
                            case 1: baseClasses += "bg-slate-400 text-slate-950"; break;
                            case 2: baseClasses += "bg-yellow-500 text-slate-950"; break;
                            case 3: baseClasses += "bg-cyan-500 text-slate-950 font-extrabold"; break;
                            case 4: baseClasses += "bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-extrabold"; break;
                            case 5: baseClasses += "bg-purple-900 border-t-purple-400 text-purple-100 shadow-inner"; break;
                            case 6: baseClasses += "bg-gradient-to-r from-indigo-900 via-blue-900 to-indigo-950 border-t-indigo-400 text-indigo-100 shadow-inner"; break;
                          }
                        }

                        return (
                          <button
                            key={tier.level}
                            onClick={() => handleTierClick(droid.name, tier.level)}
                            className={baseClasses}
                            title={t('markTierTooltip', { tier: tier.label })}
                          >
                            <span>{tier.short}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sección 2: Droides No Requeridos */}
          {discardedDroids.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-institutional-border/40">
              <div className="flex justify-between items-center px-1">
                <h3 className="text-[10px] sm:text-xs uppercase font-extrabold text-[#64748b] tracking-wider">
                  {t('notRequiredSection')}
                </h3>
                <span className="text-[9px] font-mono bg-red-950/20 border border-red-500/20 px-1.5 py-0.2 rounded text-red-400 font-bold">
                  {discardedDroids.length}
                </span>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2">
                {discardedDroids.map(droid => {
                  const hasProgress = droid.achieved > 0;
                  const inCycle = isDroidInCycle(droid.name);

                  // Definir estilos dinámicos de contenedor e h4
                  let cardClass = "p-2.5 rounded-lg border flex items-center justify-between transition-all duration-150 select-none ";
                  let titleClass = "text-xs sm:text-sm font-bold truncate flex-1 pr-1.5 flex items-center ";

                  if (inCycle) {
                    cardClass += "bg-[#1c1214]/35 border-red-900/20";
                    titleClass += hasProgress ? "text-red-400 font-extrabold" : "text-red-500/35 line-through";
                  } else {
                    cardClass += "bg-[#120e10]/35 border-institutional-border/15";
                    titleClass += hasProgress ? "text-slate-400 font-bold" : "text-slate-500/30 line-through";
                  }

                  return (
                    <div 
                      key={droid.name} 
                      className={cardClass}
                    >
                      <h4 className={titleClass}>
                        <span>{droid.name}</span>
                        {hasProgress && (
                          <span className={`ml-1.5 px-1.5 py-0.5 text-[8px] font-extrabold rounded leading-none ${getTierColor(droid.achieved)}`}>
                            {localizedTiersConfig.find(tc => tc.level === droid.achieved)?.short || ''}
                          </span>
                        )}
                      </h4>
                      {hasProgress && (
                        <button
                          onClick={() => handleClearDroid(droid.name)}
                          className="p-1 text-slate-500 hover:text-red-400 hover:bg-red-950/30 rounded transition-colors cursor-pointer"
                          title={t('notRequiredTooltip')}
                        >
                          <Trash2 size={12} />
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </main>

        {/* Footer simple de la aplicación */}
        <footer className="text-center py-2 text-[10px] text-slate-600 shrink-0">
          {t('droidsOrderFooter')}
        </footer>
      </>
    )}

    {activeTab === 'droidex' && (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* Columna Izquierda: Grid de Droides y Selector de Tiers */}
        <div className="lg:col-span-7 flex flex-col gap-3">
          <div className="bg-gradient-to-br from-[#0c1628] to-[#0a101d] border border-institutional-border p-4 rounded-xl shadow-lg flex flex-col gap-3">
            <div className="flex justify-between items-center flex-wrap gap-2">
              <h2 className="text-lg font-bold text-white font-narrow flex items-center gap-2">
                <Award className="text-institutional-secondary" size={18} />
                <span>{t('droidexTitle')}</span>
                <span className="text-xs bg-institutional-primary/40 border border-institutional-secondary/20 px-2 py-0.5 rounded text-white font-mono font-bold">
                  {stats.obtainedCount}/{stats.totalCount}
                </span>
              </h2>
            </div>

            {/* Barra de progreso de Hitos/Milestones */}
            {!milestone.isMax ? (
              <div className="bg-[#050810]/60 p-2.5 rounded-lg border border-institutional-border/50 text-[10px] space-y-1.5">
                <div className="flex justify-between text-slate-400 font-bold">
                  <span>{t('milestoneGoal', { needed: milestone.needed.toString(), multiplier: milestone.multiplier.toString() })}</span>
                  <span className="font-mono text-white">{milestone.progress}/{milestone.needed}</span>
                </div>
                <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-805">
                  <div 
                    className="bg-gradient-to-r from-orange-500 to-amber-500 h-full rounded-full transition-all duration-300"
                    style={{ width: `${milestone.percent}%` }}
                  ></div>
                </div>
              </div>
            ) : (
              <div className="bg-green-950/20 border border-green-500/35 p-2 rounded-lg text-center text-xs text-green-400 font-bold">
                {t('milestoneMax')}
              </div>
            )}

            {/* Buscador de Droidex */}
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
                <Search size={14} />
              </span>
              <input
                type="text"
                value={droidexSearch}
                onChange={(e) => setDroidexSearch(e.target.value)}
                placeholder={t('searchPlaceholder')}
                className="w-full bg-[#050810]/75 border border-institutional-border focus:border-institutional-secondary/60 pl-9 pr-9 py-2 rounded-xl text-xs text-white placeholder-slate-500 outline-none transition-colors"
              />
              {droidexSearch && (
                <button
                  onClick={() => setDroidexSearch('')}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-white cursor-pointer"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Tabs de Selección de Tier */}
            <div className="flex bg-[#050810] p-1 rounded-lg border border-institutional-border gap-1 overflow-x-auto">
              {localizedTiersConfig.map(tier => {
                const isActive = tier.level === activeDroidexTier;
                return (
                  <button
                    key={tier.level}
                    onClick={() => setActiveDroidexTier(tier.level)}
                    className={`flex-1 min-w-[70px] py-1.5 text-[10px] font-bold uppercase rounded-md transition-all text-center cursor-pointer select-none ${
                      isActive
                        ? 'bg-institutional-secondary text-slate-950 shadow-md font-extrabold'
                        : 'text-slate-400 hover:text-white hover:bg-slate-850'
                    }`}
                  >
                    {tier.label}
                  </button>
                );
              })}
            </div>

            {/* Grid de Droides */}
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 max-h-[460px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-800">
              {(() => {
                if (droidexSearch === '') {
                  return filteredDroidexList.map((droid: Droid) => {
                    const isObtained = isDroidexObtained(droid.name, activeDroidexTier);
                    const isSelected = selectedDroidexName === droid.name;
                    const typeInfo = droidTypes[droid.type] || droidTypes.ASTRO;
                    const rarityInfo = droidRarities[droid.rarity] || droidRarities.COMUN;

                    let borderClass = 'border-slate-800 bg-[#0c1628]/35';
                    if (isObtained) {
                      switch (activeDroidexTier) {
                        case 1: borderClass = 'border-slate-450 bg-slate-400/5 hover:bg-slate-400/10'; break;
                        case 2: borderClass = 'border-yellow-500/40 bg-yellow-500/5 hover:bg-yellow-500/10'; break;
                        case 3: borderClass = 'border-cyan-500/40 bg-cyan-500/5 hover:bg-cyan-500/10'; break;
                        case 4: borderClass = 'border-pink-500/40 bg-pink-500/5 hover:bg-pink-500/10'; break;
                        case 5: borderClass = 'border-purple-500/45 bg-purple-950/10 hover:bg-purple-950/20'; break;
                      }
                    }

                    if (isSelected) {
                      borderClass = 'border-orange-500 bg-[#161a29] ring-2 ring-orange-500/60 ring-offset-2 ring-offset-[#050810]';
                    }

                    return (
                      <div
                        key={droid.name}
                        onClick={() => setSelectedDroidexName(droid.name)}
                        className={`p-2 rounded-lg border flex flex-col items-center justify-center relative cursor-pointer select-none transition-all ${borderClass}`}
                      >
                        {/* Image / Silhouette Container */}
                        <div className="w-10 h-10 flex items-center justify-center mb-1">
                          {isObtained ? (
                            <div className="scale-50 opacity-90">
                              {renderDroidModel(droid, activeDroidexTier)}
                            </div>
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-slate-900/80 flex items-center justify-center text-slate-500 font-bold">
                              ?
                            </div>
                          )}
                        </div>

                        {/* Rarity Label */}
                        <div className={`text-[9px] font-bold uppercase tracking-wider text-center truncate w-full ${isObtained ? rarityInfo.color : 'text-slate-600'}`}>
                          {droid.name}
                        </div>
                        <div className="text-[7px] text-slate-500 mt-0.5 truncate w-full text-center">
                          {t(`rarity_${droid.rarity}`)}
                        </div>
                      </div>
                    );
                  });
                } else {
                  const items: { droid: Droid; tier: number; isObtained: boolean }[] = [];
                  
                  filteredDroidexList.forEach(droid => {
                    const maxTiers = isIconicDroid(droid) ? 1 : 6;
                    for (let t = 1; t <= maxTiers; t++) {
                      items.push({ 
                        droid, 
                        tier: t, 
                        isObtained: isDroidexObtained(droid.name, t) 
                      });
                    }
                  });

                  items.sort((a, b) => {
                    if (a.isObtained !== b.isObtained) {
                      return a.isObtained ? 1 : -1;
                    }
                    const nameComp = a.droid.name.localeCompare(b.droid.name);
                    if (nameComp !== 0) return nameComp;
                    return a.tier - b.tier;
                  });

                  return items.map((item, idx) => {
                    const { droid, tier, isObtained } = item;
                    const isSelected = selectedDroidexName === droid.name && activeDroidexTier === tier;
                    const typeInfo = droidTypes[droid.type] || droidTypes.ASTRO;
                    const rarityInfo = droidRarities[droid.rarity] || droidRarities.COMUN;

                    let borderClass = 'border-slate-800 bg-[#0c1628]/35';
                    if (isObtained) {
                      switch (tier) {
                        case 1: borderClass = 'border-slate-450 bg-slate-400/5 hover:bg-slate-400/10'; break;
                        case 2: borderClass = 'border-yellow-500/40 bg-yellow-500/5 hover:bg-yellow-500/10'; break;
                        case 3: borderClass = 'border-cyan-500/40 bg-cyan-500/5 hover:bg-cyan-500/10'; break;
                        case 4: borderClass = 'border-pink-500/40 bg-pink-500/5 hover:bg-pink-500/10'; break;
                        case 5: borderClass = 'border-purple-500/45 bg-purple-950/10 hover:bg-purple-950/20'; break;
                      }
                    }

                    if (isSelected) {
                      borderClass = 'border-orange-500 bg-[#161a29] ring-2 ring-orange-500/60 ring-offset-2 ring-offset-[#050810]';
                    }

                    return (
                      <div
                        key={`${droid.name}-${tier}-${idx}`}
                        onClick={() => {
                          setSelectedDroidexName(droid.name);
                          setActiveDroidexTier(tier);
                        }}
                        className={`p-2 rounded-lg border flex flex-col items-center justify-center relative cursor-pointer select-none transition-all ${borderClass}`}
                      >
                        {/* Image / Silhouette Container */}
                        <div className="w-10 h-10 flex items-center justify-center mb-1">
                          {isObtained ? (
                            <div className="scale-50 opacity-90">
                              {renderDroidModel(droid, tier)}
                            </div>
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-slate-900/80 flex items-center justify-center text-slate-500 font-bold">
                              ?
                            </div>
                          )}
                        </div>

                        {/* Rarity Label */}
                        <div className={`text-[9px] font-bold uppercase tracking-wider text-center truncate w-full ${isObtained ? rarityInfo.color : 'text-slate-600'}`}>
                          {droid.name}
                        </div>
                        <div className="text-[7px] text-slate-500 mt-0.5 truncate w-full text-center">
                          {isIconicDroid(droid) ? t('type_Iconic') : getLocalizedTierName(tier)}
                        </div>
                      </div>
                    );
                  });
                }
              })()}
            </div>
          </div>
        </div>

        {/* Columna Derecha: Detalle de Droide */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          <div className="bg-[#0c1628] border border-institutional-border rounded-xl p-4 shadow-lg flex flex-col gap-3 h-full justify-between">
            
            <div className="space-y-3">
              <div className="flex justify-between items-start gap-1">
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold">
                    {selectedDroid.rarity === 'ICONICO' ? t('type_Iconic') : getLocalizedTierName(activeDroidexTier)}
                  </span>
                  <h3 className="text-xl font-bold text-white font-narrow leading-tight">
                    {selectedDroid.name}
                  </h3>
                </div>
                <div className="flex items-center gap-1">
                  <span className={`text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded border border-current leading-none ${droidRarities[selectedDroid.rarity]?.color || 'text-fuchsia-400'}`}>
                    {t(`rarity_${selectedDroid.rarity}`)}
                  </span>
                </div>
              </div>

              {/* Wireframe render block */}
              <div className="bg-[#050810]/70 rounded-xl border border-institutional-border/80 flex items-center justify-center p-6 h-56 relative overflow-hidden shadow-inner">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e2d4a_1px,transparent_1px),linear-gradient(to_bottom,#1e2d4a_1px,transparent_1px)] bg-[size:14px_24px] opacity-10"></div>
                
                <div className="z-10 flex flex-col items-center">
                  {renderDroidModel(selectedDroid, activeDroidexTier)}
                </div>

                <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 text-[9px] font-bold text-slate-400 bg-[#0c1628]/90 px-2 py-0.5 rounded border border-slate-805">
                  {React.createElement(droidTypes[selectedDroid.type]?.icon || Cpu, { size: 10, className: droidTypes[selectedDroid.type]?.color })}
                  <span>{t(`type_${selectedDroid.type}`)}</span>
                </div>
              </div>

              {/* Perk / Stat Box */}
              <div className="bg-institutional-primary/10 border border-institutional-secondary/25 p-3 rounded-lg flex flex-col gap-1">
                <span className="text-[8px] uppercase tracking-wider text-institutional-secondary font-bold">Bono del Droidex:</span>
                <span className="text-sm font-extrabold text-white">
                  {getDroidexStatsPerk(selectedDroid, activeDroidexTier)}
                </span>
              </div>

              {/* Status Toggle Area */}
              <div className="space-y-2 pt-1">
                <button
                  onMouseEnter={() => setIsToggleHovered(true)}
                  onMouseLeave={() => setIsToggleHovered(false)}
                  onClick={() => {
                    setDroidexObtainedState(selectedDroid.name, activeDroidexTier, !isSelectedObtained);
                    setIsToggleHovered(false);
                  }}
                  className={`w-full py-2.5 px-4 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm ${
                    isSelectedObtained
                      ? 'bg-green-600 hover:bg-red-600 text-white font-extrabold'
                      : 'bg-slate-800 hover:bg-slate-700 text-[#94a3b8] hover:text-white'
                  }`}
                >
                  <CheckCircle2 size={14} />
                  <span>
                    {isSelectedObtained
                      ? (isToggleHovered ? t('markPendiente') : t('statusFabricado'))
                      : t('markFabricado')}
                  </span>
                </button>                
              </div>
            </div>

            {/* Back / Next Navigators */}
            <div className="flex gap-2 pt-3 border-t border-institutional-border/50">
              <button
                onClick={handlePrevDroid}
                className="flex-1 py-1.5 px-3 bg-gradient-to-r from-[#e05307] to-[#f77b06] hover:from-[#f77b06] hover:to-[#ff9124] text-white text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1 cursor-pointer select-none"
              >
                <span>{t('prevDroid')}</span>
              </button>
              <button
                onClick={handleNextDroid}
                className="flex-1 py-1.5 px-3 bg-gradient-to-r from-[#e05307] to-[#f77b06] hover:from-[#f77b06] hover:to-[#ff9124] text-white text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1 cursor-pointer select-none"
              >
                <span>{t('nextDroid')}</span>
              </button>
            </div>

          </div>
        </div>

      </div>
    )}

    {activeTab === 'novashop' && (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* Columna Izquierda: Categorías de la Tienda */}
        <div className="lg:col-span-3 flex flex-col gap-2">
          <div className="bg-[#0c1628] border border-institutional-border p-3.5 rounded-xl shadow-lg flex flex-col gap-2">
            <h3 className="text-[10px] uppercase font-extrabold text-[#64748b] tracking-wider px-1 mb-1">
              Categorías
            </h3>
            
            <button
              onClick={() => {
                setActiveShopCategory('core');
                const first = novaUpgradesList.find(up => up.category === 'core');
                if (first) setSelectedShopUpgradeId(first.id);
              }}
              className={`w-full py-2 px-3 text-xs font-bold text-left rounded-lg transition-all flex items-center gap-2 cursor-pointer ${
                activeShopCategory === 'core'
                  ? 'bg-institutional-primary text-white border border-institutional-secondary/25'
                  : 'bg-[#050810]/50 text-slate-400 hover:text-white hover:bg-slate-800/40 border border-transparent'
              }`}
            >
              <Heart size={14} />
              <span>{t('upgradeCategory_core')}</span>
            </button>

            <button
              onClick={() => {
                setActiveShopCategory('workshop');
                const first = novaUpgradesList.find(up => up.category === 'workshop');
                if (first) setSelectedShopUpgradeId(first.id);
              }}
              className={`w-full py-2 px-3 text-xs font-bold text-left rounded-lg transition-all flex items-center gap-2 cursor-pointer ${
                activeShopCategory === 'workshop'
                  ? 'bg-institutional-primary text-white border border-institutional-secondary/25'
                  : 'bg-[#050810]/50 text-slate-400 hover:text-white hover:bg-slate-800/40 border border-transparent'
              }`}
            >
              <Cpu size={14} />
              <span>{t('upgradeCategory_workshop')}</span>
            </button>

            <button
              onClick={() => {
                setActiveShopCategory('cosmetic');
                const first = novaUpgradesList.find(up => up.category === 'cosmetic');
                if (first) setSelectedShopUpgradeId(first.id);
              }}
              className={`w-full py-2 px-3 text-xs font-bold text-left rounded-lg transition-all flex items-center gap-2 cursor-pointer ${
                activeShopCategory === 'cosmetic'
                  ? 'bg-institutional-primary text-white border border-institutional-secondary/25'
                  : 'bg-[#050810]/50 text-slate-400 hover:text-white hover:bg-slate-800/40 border border-transparent'
              }`}
            >
              <Palette size={14} />
              <span>{t('upgradeCategory_cosmetic')}</span>
            </button>

            <button
              onClick={() => {
                setActiveShopCategory('iconic');
                const first = novaUpgradesList.find(up => up.category === 'iconic');
                if (first) setSelectedShopUpgradeId(first.id);
              }}
              className={`w-full py-2 px-3 text-xs font-bold text-left rounded-lg transition-all flex items-center gap-2 cursor-pointer ${
                activeShopCategory === 'iconic'
                  ? 'bg-institutional-primary text-white border border-institutional-secondary/25'
                  : 'bg-[#050810]/50 text-slate-400 hover:text-white hover:bg-slate-800/40 border border-transparent'
              }`}
            >
              <Award size={14} />
              <span>{t('upgradeCategory_iconic')}</span>
            </button>
          </div>
        </div>

        {/* Columna Central: Lista de Upgrades */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          <div className="bg-gradient-to-br from-[#0c1628] to-[#0a101d] border border-institutional-border p-4 rounded-xl shadow-lg flex flex-col gap-3">
            <div className="flex justify-between items-center flex-wrap gap-2">
              <h2 className="text-base font-bold text-white font-narrow flex items-center gap-1.5">
                {t('novaShopTitle')}
              </h2>
              
              <button
                onClick={() => {
                  setCrystalsInputValue(novaCrystals.toString());
                  setShowCrystalsEdit(true);
                }}
                className="flex items-center gap-1.5 px-3 py-1 bg-[#120e24]/75 border border-purple-800/45 text-purple-300 rounded-lg shadow-[0_0_8px_rgba(147,51,234,0.25)] hover:bg-[#120e24] cursor-pointer transition-all font-mono font-bold text-xs"
                title="Hacer clic para ajustar cristales"
              >
                <span>💎</span>
                <span>{novaCrystals}</span>
                <span className="text-[10px] text-slate-500 font-sans font-normal uppercase">{t('crystalsCount')}</span>
              </button>
            </div>

            {/* Grid de Upgrades */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[460px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-800">
              {novaUpgradesList
                .filter(up => up.category === activeShopCategory)
                .map((upgrade: NovaUpgrade) => {
                  const currentLevel = getUpgradeLevel(upgrade.id);
                  const isSelected = selectedShopUpgradeId === upgrade.id;
                  
                  let cardBorder = isSelected ? 'border-cyan-500/80 bg-[#161a29]/65 ring-1 ring-cyan-500/20' : 'border-institutional-border/60 bg-[#0c1628]/35 hover:border-slate-700';

                  return (
                    <div
                      key={upgrade.id}
                      onClick={() => setSelectedShopUpgradeId(upgrade.id)}
                      className={`p-3 rounded-lg border flex flex-col justify-between cursor-pointer select-none transition-all ${cardBorder}`}
                    >
                      <div className="flex gap-2 items-start mb-2">
                        <span className={`p-1.5 rounded bg-slate-900 border border-slate-850 flex-shrink-0 text-cyan-400`}>
                          {React.createElement(upgrade.icon, { size: 14 })}
                        </span>
                        <div className="min-w-0">
                          <h4 className="text-xs font-bold text-white leading-tight truncate">
                            {upgrade.category === 'iconic' ? upgrade.nameKey : t(upgrade.nameKey)}
                          </h4>
                          <span className="text-[9px] font-mono text-slate-400 font-bold block mt-0.5">
                            {upgrade.category === 'iconic' ? (currentLevel > 0 ? 'Adquirido' : 'Pendiente') : `Lvl ${currentLevel}/${upgrade.maxLevel}`}
                          </span>
                        </div>
                      </div>

                      {upgrade.category !== 'iconic' && (
                        <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden border border-slate-900">
                          <div
                            className="bg-cyan-500 h-full rounded-full transition-all duration-300"
                            style={{ width: `${(currentLevel / upgrade.maxLevel) * 100}%` }}
                          ></div>
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
        </div>

        {/* Columna Derecha: Detalle de Upgrade */}
        <div className="lg:col-span-4 flex flex-col gap-3">
          {(() => {
            const upgrade = novaUpgradesList.find(up => up.id === selectedShopUpgradeId);
            if (!upgrade) return null;

            const currentLevel = getUpgradeLevel(upgrade.id);
            const isMax = currentLevel >= upgrade.maxLevel;
            const nextCost = isMax ? 0 : upgrade.costs[currentLevel];
            const canAfford = novaCrystals >= nextCost;

            return (
              <div className="bg-[#0c1628] border border-institutional-border rounded-xl p-4 shadow-lg flex flex-col gap-4 justify-between h-full">
                
                <div className="space-y-4">
                  <div className="flex gap-3 items-center">
                    <span className="p-2 rounded bg-cyan-950/20 border border-cyan-500/30 text-cyan-400 shadow-[0_0_6px_rgba(0,173,238,0.2)]">
                      {React.createElement(upgrade.icon, { size: 20 })}
                    </span>
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold">
                        {t(`upgradeCategory_${upgrade.category}`)}
                      </span>
                      <h3 className="text-base font-bold text-white font-narrow leading-tight">
                        {upgrade.category === 'iconic' ? upgrade.nameKey : t(upgrade.nameKey)}
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs text-[#94a3b8] leading-relaxed">
                    {upgrade.category === 'iconic' ? getIconicDroidDesc(upgrade.nameKey) : t(upgrade.descKey)}
                  </p>

                  {upgrade.category !== 'iconic' ? (
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-bold">
                        <span className="text-slate-400">Progreso de Nivel</span>
                        <span className="text-white font-mono">{currentLevel} / {upgrade.maxLevel}</span>
                      </div>
                      <div className="w-full bg-slate-900 border border-slate-800 h-2.5 rounded-full overflow-hidden">
                        <div
                          className="bg-cyan-500 h-full rounded-full transition-all duration-305 shadow-[0_0_8px_rgba(6,182,212,0.4)]"
                          style={{ width: `${(currentLevel / upgrade.maxLevel) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between text-xs py-1.5 border-y border-slate-850">
                      <span className="text-slate-400 font-bold">Estado en Colección</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${currentLevel > 0 ? 'bg-green-950/30 border border-green-500/20 text-green-400' : 'bg-slate-900 border border-slate-800 text-slate-500'}`}>
                        {currentLevel > 0 ? 'Adquirido' : 'Pendiente'}
                      </span>
                    </div>
                  )}

                  <div className="pt-2">
                    {isMax ? (
                      <div className="bg-green-950/35 border border-green-500/25 p-3 rounded-lg text-center font-bold text-xs text-green-400">
                        {t('maxLevelReached')}
                      </div>
                    ) : (
                      <button
                        onClick={() => buyUpgradeLevel(upgrade.id)}
                        disabled={!canAfford}
                        className={`w-full py-3 px-4 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-md select-none cursor-pointer ${
                          canAfford
                            ? 'bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-extrabold'
                            : 'bg-slate-850 border border-slate-800 text-slate-550 cursor-not-allowed'
                        }`}
                      >
                        <span>💎</span>
                        <span>{t('buyUpgrade', { cost: nextCost.toString() })}</span>
                      </button>
                    )}
                  </div>
                </div>

                <div className="bg-slate-950/40 p-2.5 rounded-lg border border-[#1e2d4a]/50 text-xs mt-2">
                  <div className="flex items-center justify-between gap-1.5">
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wide">Ajustar Nivel Manual:</span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setUpgradeLevelManual(upgrade.id, currentLevel - 1)}
                        className="w-6 h-6 bg-slate-850 hover:bg-slate-750 text-white rounded flex items-center justify-center cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                        disabled={currentLevel <= 0}
                      >
                        <Minus size={12} />
                      </button>
                      <span className="px-2 font-mono font-bold text-white text-xs">{currentLevel}</span>
                      <button
                        onClick={() => setUpgradeLevelManual(upgrade.id, currentLevel + 1)}
                        className="w-6 h-6 bg-slate-850 hover:bg-slate-750 text-white rounded flex items-center justify-center cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                        disabled={currentLevel >= upgrade.maxLevel}
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            );
          })()}
        </div>

      </div>
    )}

  </div>

  {/* Modal de Reinicio */}
  {showResetModal && (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-[#0c1628] border border-[#1e2d4a] p-5 rounded-xl max-w-xs w-full shadow-2xl relative font-sans text-xs">
        <h3 className="text-sm font-bold mb-1 text-white font-narrow">¿Reiniciar progreso?</h3>
        <p className="text-[#94a3b8] mb-4">
          Restablecerá tu Rebirth al nivel 0 (inicio) y borrará tus droides. No se puede deshacer.
        </p>
        <div className="flex justify-end gap-2">
          <button 
            onClick={() => setShowResetModal(false)} 
            className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-[#94a3b8] hover:text-white transition-all font-bold cursor-pointer"
          >
            Cancelar
          </button>
          <button 
            onClick={handleReset} 
            className="px-3 py-1.5 rounded bg-red-650 hover:bg-red-600 text-white transition-all font-bold shadow-md cursor-pointer"
          >
            Sí, reiniciar
          </button>
        </div>
      </div>
    </div>
  )}

  {/* Modal de Super Rebirth */}
  {showSuperRebirthModal && (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-[#120e24] border border-purple-900/40 p-5 rounded-xl max-w-xs w-full shadow-[0_0_20px_rgba(147,51,234,0.3)] relative font-sans text-xs">
        <h3 className="text-sm font-bold mb-1 text-white font-narrow flex items-center gap-1.5 text-purple-400">
          <Sparkles size={14} /> ¿Realizar Super Rebirth?
        </h3>
        <p className="text-[#94a3b8] mb-3">
          Estás en Rebirth <strong className="text-white">R-{currentRebirth}</strong>. Al volver a comenzar obtendrás:
        </p>
        
        <div className="bg-purple-950/40 border border-purple-800/40 p-2.5 rounded-lg text-center mb-4 shadow-inner">
          <div className="text-[10px] uppercase font-bold text-purple-300 tracking-wider mb-0.5">Recompensa</div>
          <div className="text-base font-black text-purple-100 flex items-center justify-center gap-1">
            <span>💎 {getNovaCrystals(currentRebirth)} Cristales Nova</span>
          </div>
        </div>

        <p className="text-red-400/80 mb-4 leading-relaxed text-[11px]">
          ⚠️ Esto restablecerá tu Rebirth al nivel 0 y borrará todos tus droides del tracker.
        </p>

        <div className="flex justify-end gap-2">
          <button 
            onClick={() => setShowSuperRebirthModal(false)} 
            className="px-3 py-1.5 rounded bg-slate-900 hover:bg-slate-800 text-[#94a3b8] hover:text-white transition-all font-bold cursor-pointer"
          >
            Cancelar
          </button>
          <button 
            onClick={handleSuperRebirth} 
            className="px-3 py-1.5 rounded bg-purple-700 hover:bg-purple-650 text-white transition-all font-bold shadow-md cursor-pointer"
          >
            Confirmar Super Rebirth
          </button>
        </div>
      </div>
    </div>
  )}

  {/* Modal de Ajuste de Cristales */}
  {showCrystalsEdit && (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-[#0c1628] border border-[#1e2d4a] p-5 rounded-xl max-w-xs w-full shadow-2xl relative font-sans text-xs">
        <h3 className="text-sm font-bold mb-2 text-white font-narrow flex items-center gap-1.5">
          <span>💎</span> {t('customCrystalsLabel')}
        </h3>
        
        <input
          type="number"
          min="0"
          value={crystalsInputValue}
          onChange={(e) => setCrystalsInputValue(e.target.value)}
          className="w-full bg-[#050810] border border-institutional-border p-2.5 rounded-lg text-white font-mono font-bold text-sm text-center outline-none focus:border-institutional-secondary mb-4"
        />

        <div className="flex justify-end gap-2">
          <button 
            onClick={() => setShowCrystalsEdit(false)} 
            className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-[#94a3b8] hover:text-white transition-all font-bold cursor-pointer"
          >
            {t('cancel')}
          </button>
          <button 
            onClick={() => {
              const val = parseInt(crystalsInputValue, 10);
              saveNovaCrystals(isNaN(val) ? 0 : Math.max(0, val));
              setShowCrystalsEdit(false);
            }} 
            className="px-3 py-1.5 rounded bg-institutional-primary hover:bg-institutional-primary/80 border border-institutional-secondary/35 text-white transition-all font-bold shadow-md cursor-pointer"
          >
            {t('save')}
          </button>
        </div>
      </div>
    </div>
  )}

</div>
);
}
