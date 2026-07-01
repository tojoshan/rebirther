import React, { useState, useEffect } from 'react';
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
  ChevronUp
} from 'lucide-react';
import translationsData from './translations.json';
const translations = translationsData as Record<string, Record<string, string>>;

type DroidType = 'CONSTRUCTOR' | 'ASTRO' | 'PELEA';
type DroidRarity = 'COMUN' | 'RARO' | 'EPICO' | 'LEGENDARIO';

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
    tier: number; // 1: Base, 2: Gold, 3: Diamond, 4: Rainbow, 5: Beskar
  }[];
}

const droidTypes = {
  CONSTRUCTOR: { label: 'Constructor', icon: Wrench, color: 'text-orange-400', bg: 'bg-orange-400/10' },
  ASTRO: { label: 'Astromecánico', icon: Cpu, color: 'text-blue-400', bg: 'bg-blue-400/10' },
  PELEA: { label: 'Combate', icon: Swords, color: 'text-red-400', bg: 'bg-red-400/10' }
};

const droidRarities = {
  COMUN: { label: 'Común', color: 'text-slate-400' },
  RARO: { label: 'Raro', color: 'text-blue-400' },
  EPICO: { label: 'Épico', color: 'text-purple-400' },
  LEGENDARIO: { label: 'Legendario', color: 'text-yellow-400' }
};

const droidsData: Droid[] = [
  { name: "Mouse", maxReq: 1, type: "ASTRO", rarity: "COMUN" },
  { name: "Pit", maxReq: 1, type: "CONSTRUCTOR", rarity: "COMUN" },
  { name: "GONK", maxReq: 1, type: "CONSTRUCTOR", rarity: "COMUN" },
  { name: "2BB", maxReq: 4, type: "ASTRO", rarity: "RARO" },
  { name: "R3", maxReq: 4, type: "ASTRO", rarity: "RARO" },
  { name: "Senate Hovercam", maxReq: 4, type: "ASTRO", rarity: "RARO" },
  { name: "R4", maxReq: 4, type: "ASTRO", rarity: "RARO" },
  { name: "R5", maxReq: 4, type: "ASTRO", rarity: "RARO" },
  { name: "R8", maxReq: 3, type: "ASTRO", rarity: "EPICO" },
  { name: "R9", maxReq: 3, type: "ASTRO", rarity: "EPICO" },
  { name: "B1 Battle", maxReq: 3, type: "PELEA", rarity: "COMUN" },
  { name: "B1 Security", maxReq: 4, type: "PELEA", rarity: "RARO" },
  { name: "BDX Explorer", maxReq: 4, type: "ASTRO", rarity: "EPICO" },
  { name: "TRAK-R", maxReq: 2, type: "CONSTRUCTOR", rarity: "RARO" },
  { name: "Groundmech", maxReq: 2, type: "PELEA", rarity: "RARO" },
  { name: "B2 Heavy", maxReq: 4, type: "PELEA", rarity: "EPICO" },
  { name: "B2 Super", maxReq: 4, type: "PELEA", rarity: "EPICO" },
  { name: "UTIL-TEC", maxReq: 4, type: "CONSTRUCTOR", rarity: "EPICO" },
  { name: "Bal-Core", maxReq: 4, type: "CONSTRUCTOR", rarity: "EPICO" },
  { name: "Mecha-Droid", maxReq: 3, type: "PELEA", rarity: "EPICO" },
  { name: "Proto-Roller", maxReq: 5, type: "CONSTRUCTOR", rarity: "LEGENDARIO" },
  { name: "B2-RP", maxReq: 5, type: "PELEA", rarity: "LEGENDARIO" },
  { name: "R7", maxReq: 4, type: "ASTRO", rarity: "EPICO" },
  { name: "Strike-Orb", maxReq: 5, type: "PELEA", rarity: "LEGENDARIO" },
  { name: "BB", maxReq: 2, type: "ASTRO", rarity: "EPICO" },
  { name: "BB9", maxReq: 5, type: "ASTRO", rarity: "LEGENDARIO" },
  { name: "AMP Walker", maxReq: 4, type: "PELEA", rarity: "EPICO" },
  { name: "Opti-Pod", maxReq: 4, type: "ASTRO", rarity: "EPICO" },
  { name: "MONO-WLKR", maxReq: 4, type: "CONSTRUCTOR", rarity: "LEGENDARIO" },
  { name: "Opti-STRK", maxReq: 4, type: "PELEA", rarity: "LEGENDARIO" },
  { name: "Cyclo-Grav", maxReq: 5, type: "PELEA", rarity: "LEGENDARIO" },
  { name: "LO", maxReq: 5, type: "ASTRO", rarity: "LEGENDARIO" },
  { name: "R6", maxReq: 5, type: "ASTRO", rarity: "LEGENDARIO" },
  { name: "HAUL-R", maxReq: 5, type: "CONSTRUCTOR", rarity: "LEGENDARIO" },
  { name: "SEN-TRI", maxReq: 5, type: "PELEA", rarity: "LEGENDARIO" },
  // Nuevos droids de otros ciclos
  { name: "ID-10", maxReq: 1, type: "ASTRO", rarity: "COMUN" },
  { name: "DRK-1 Probe", maxReq: 1, type: "ASTRO", rarity: "COMUN" },
  { name: "ROLL-R", maxReq: 1, type: "ASTRO", rarity: "COMUN" },
  { name: "NAV-EX", maxReq: 1, type: "ASTRO", rarity: "COMUN" },
  { name: "VECT-ARM", maxReq: 1, type: "CONSTRUCTOR", rarity: "RARO" },
  { name: "Orb-Walker", maxReq: 1, type: "CONSTRUCTOR", rarity: "RARO" },
  { name: "Gunrunner", maxReq: 1, type: "PELEA", rarity: "RARO" },
  { name: "R2", maxReq: 1, type: "ASTRO", rarity: "EPICO" },
  { name: "CB", maxReq: 1, type: "ASTRO", rarity: "COMUN" },
  { name: "A-LT", maxReq: 1, type: "ASTRO", rarity: "COMUN" },
  { name: "BU-4D", maxReq: 1, type: "CONSTRUCTOR", rarity: "COMUN" },
  { name: "ARG", maxReq: 1, type: "CONSTRUCTOR", rarity: "COMUN" },
  { name: "HOV-R", maxReq: 1, type: "PELEA", rarity: "RARO" },
  { name: "BB-8", maxReq: 1, type: "ASTRO", rarity: "LEGENDARIO" },
  { name: "Mister Bones", maxReq: 1, type: "PELEA", rarity: "LEGENDARIO" },
  { name: "IG-11", maxReq: 1, type: "PELEA", rarity: "LEGENDARIO" },
  { name: "CB-23", maxReq: 1, type: "ASTRO", rarity: "LEGENDARIO" },
  { name: "Chopper", maxReq: 1, type: "ASTRO", rarity: "EPICO" },
  { name: "K-2SO", maxReq: 1, type: "PELEA", rarity: "LEGENDARIO" },
  { name: "LEP Droid", maxReq: 1, type: "CONSTRUCTOR", rarity: "COMUN" }
];

const rebirthRequirementsCycle1: RebirthRequirement[] = [
  { level: 1, credits: "10,000 Credits", droids: [{ name: "CB", tier: 1 }, { name: "Pit", tier: 1 }, { name: "DRK-1 Probe", tier: 1 }] },
  { level: 2, credits: "150,000 Credits", droids: [{ name: "BDX Explorer", tier: 1 }, { name: "2BB", tier: 1 }, { name: "Bal-Core", tier: 1 }] },
  { level: 3, credits: "975,000 Credits", droids: [{ name: "A-LT", tier: 1 }, { name: "BU-4D", tier: 1 }, { name: "R9", tier: 2 }] },
  { level: 4, credits: "2.95 Million Credits", droids: [{ name: "ARG", tier: 2 }, { name: "B1 Security", tier: 2 }, { name: "Groundmech", tier: 1 }] },
  { level: 5, credits: "5.35 Million Credits", droids: [{ name: "BU-4D", tier: 2 }, { name: "HOV-R", tier: 2 }, { name: "R9", tier: 3 }] },
  { level: 6, credits: "9.85 Million Credits", droids: [{ name: "Groundmech", tier: 2 }, { name: "ARG", tier: 3 }, { name: "A-LT", tier: 3 }] },
  { level: 7, credits: "14.5 Million Credits", droids: [{ name: "BB", tier: 2 }, { name: "B1 Security", tier: 3 }, { name: "BU-4D", tier: 3 }] },
  { level: 8, credits: "36 Million Credits", droids: [{ name: "UTIL-TEC", tier: 2 }, { name: "LO", tier: 2 }, { name: "HOV-R", tier: 3 }] },
  { level: 9, credits: "89 Million Credits", droids: [{ name: "Groundmech", tier: 4 }, { name: "R6", tier: 2 }, { name: "TRAK-R", tier: 2 }] },
  { level: 10, credits: "220 Million Credits", droids: [{ name: "LO", tier: 4 }, { name: "HAUL-R", tier: 4 }, { name: "Strike-Orb", tier: 2 }] },
  { level: 11, credits: "550 Million Credits", droids: [{ name: "AMP Walker", tier: 4 }, { name: "B1 Heavy", tier: 4 }, { name: "BB9", tier: 1 }] },
  { level: 12, credits: "1.36 Billion Credits", droids: [{ name: "Proto-Roller", tier: 2 }, { name: "Mecha-Droid", tier: 1 }, { name: "MONO-WLKR", tier: 1 }] },
  { level: 13, credits: "3.4 Billion Credits", droids: [{ name: "B2 Super", tier: 4 }, { name: "Mecha-Droid", tier: 1 }, { name: "Proto-Roller", tier: 1 }] },
  { level: 14, credits: "8.45 Billion Credits", droids: [{ name: "B2 Heavy", tier: 4 }, { name: "B2-RP", tier: 1 }, { name: "R7", tier: 2 }] },
  { level: 15, credits: "21 Billion Credits", droids: [{ name: "Strike-Orb", tier: 4 }, { name: "BB9", tier: 2 }, { name: "Proto-Roller", tier: 2 }] },
  { level: 16, credits: "52 Billion Credits", droids: [{ name: "AMP Walker", tier: 4 }, { name: "B2-RP", tier: 3 }, { name: "Mecha-Droid", tier: 2 }] },
  { level: 17, credits: "130 Billion Credits", droids: [{ name: "Opti-Pod", tier: 4 }, { name: "R7", tier: 3 }, { name: "MONO-WLKR", tier: 2 }] },
  { level: 18, credits: "325 Billion Credits", droids: [{ name: "UTIL-TEC", tier: 4 }, { name: "BB9", tier: 3 }, { name: "Proto-Roller", tier: 3 }] },
  { level: 19, credits: "810 Billion Credits", droids: [{ name: "Mecha-Droid", tier: 3 }, { name: "R7", tier: 4 }, { name: "B2-RP", tier: 4 }] },
  { level: 20, credits: "2 Trillion Credits", droids: [{ name: "MONO-WLKR", tier: 4 }, { name: "Opti-STRK", tier: 4 }, { name: "Cyclo-Grav", tier: 4 }] },
  { level: 21, credits: "3 Trillion Credits", droids: [{ name: "LO", tier: 5 }, { name: "R6", tier: 5 }, { name: "HAUL-R", tier: 5 }] },
  { level: 22, credits: "4.5 Trillion Credits", droids: [{ name: "Strike-Orb", tier: 5 }, { name: "SEN-TRI", tier: 5 }, { name: "Proto-Roller", tier: 5 }] },
  { level: 23, credits: "6 Trillion Credits", droids: [{ name: "BB9", tier: 5 }, { name: "Cyclo-Grav", tier: 5 }, { name: "B2-RP", tier: 5 }] }
];

const rebirthRequirementsCycle2: RebirthRequirement[] = [
  { level: 1, credits: "10,000 Credits", droids: [{ name: "ID-10", tier: 1 }, { name: "Mouse", tier: 1 }, { name: "GONK", tier: 1 }] },
  { level: 2, credits: "150,000 Credits", droids: [{ name: "ROLL-R", tier: 1 }, { name: "Senate Hovercam", tier: 1 }, { name: "NAV-EX", tier: 1 }] },
  { level: 3, credits: "975,000 Credits", droids: [{ name: "R4", tier: 1 }, { name: "VECT-ARM", tier: 1 }, { name: "BDX Explorer", tier: 2 }] },
  { level: 4, credits: "2.95 Million Credits", droids: [{ name: "2BB", tier: 2 }, { name: "Bal-Core", tier: 2 }, { name: "Orb-Walker", tier: 1 }] },
  { level: 5, credits: "5.35 Million Credits", droids: [{ name: "R4", tier: 2 }, { name: "VECT-ARM", tier: 2 }, { name: "NAV-EX", tier: 2 }] },
  { level: 6, credits: "9.85 Million Credits", droids: [{ name: "Gunrunner", tier: 1 }, { name: "2BB", tier: 3 }, { name: "Bal-Core", tier: 3 }] },
  { level: 7, credits: "14.5 Million Credits", droids: [{ name: "ROLL-R", tier: 3 }, { name: "BDX Explorer", tier: 3 }, { name: "R2", tier: 2 }] },
  { level: 8, credits: "36 Million Credits", droids: [{ name: "R4", tier: 3 }, { name: "B2 Super", tier: 2 }, { name: "Gunrunner", tier: 2 }] },
  { level: 9, credits: "89 Million Credits", droids: [{ name: "NAV-EX", tier: 4 }, { name: "Strike-Orb", tier: 2 }, { name: "AMP Walker", tier: 2 }] },
  { level: 10, credits: "220 Million Credits", droids: [{ name: "VECT-ARM", tier: 4 }, { name: "B2 Super", tier: 3 }, { name: "R2", tier: 3 }] },
  { level: 11, credits: "550 Million Credits", droids: [{ name: "Strike-Orb", tier: 3 }, { name: "B2 Heavy", tier: 3 }, { name: "Bal-Core", tier: 4 }] },
  { level: 12, credits: "1.36 Billion Credits", droids: [{ name: "Orb-Walker", tier: 4 }, { name: "R2", tier: 4 }, { name: "BB9", tier: 1 }] },
  { level: 13, credits: "3.4 Billion Credits", droids: [{ name: "B2 Super", tier: 4 }, { name: "Mecha-Droid", tier: 1 }, { name: "Proto-Roller", tier: 1 }] },
  { level: 14, credits: "8.45 Billion Credits", droids: [{ name: "R7", tier: 2 }, { name: "B2-RP", tier: 1 }, { name: "B2 Heavy", tier: 4 }] },
  { level: 15, credits: "21 Billion Credits", droids: [{ name: "Strike-Orb", tier: 4 }, { name: "BB9", tier: 2 }, { name: "Proto-Roller", tier: 2 }] },
  { level: 16, credits: "52 Billion Credits", droids: [{ name: "AMP Walker", tier: 4 }, { name: "B2-RP", tier: 3 }, { name: "Mecha-Droid", tier: 2 }] },
  { level: 17, credits: "130 Billion Credits", droids: [{ name: "Opti-Pod", tier: 4 }, { name: "R7", tier: 3 }, { name: "MONO-WLKR", tier: 2 }] },
  { level: 18, credits: "325 Billion Credits", droids: [{ name: "UTIL-TEC", tier: 4 }, { name: "BB9", tier: 3 }, { name: "Proto-Roller", tier: 3 }] },
  { level: 19, credits: "810 Billion Credits", droids: [{ name: "Mecha-Droid", tier: 3 }, { name: "B2-RP", tier: 4 }, { name: "R7", tier: 4 }] },
  { level: 20, credits: "2 Trillion Credits", droids: [{ name: "MONO-WLKR", tier: 4 }, { name: "Cyclo-Grav", tier: 4 }, { name: "Opti-STRK", tier: 4 }] },
  { level: 21, credits: "3 Trillion Credits", droids: [{ name: "R6", tier: 5 }, { name: "LO", tier: 5 }, { name: "HAUL-R", tier: 5 }] },
  { level: 22, credits: "4.5 Trillion Credits", droids: [{ name: "Strike-Orb", tier: 5 }, { name: "SEN-TRI", tier: 5 }, { name: "Proto-Roller", tier: 5 }] },
  { level: 23, credits: "6 Trillion Credits", droids: [{ name: "BB9", tier: 5 }, { name: "Cyclo-Grav", tier: 5 }, { name: "B2-RP", tier: 5 }] }
];

const rebirthRequirementsCycle3: RebirthRequirement[] = [
  { level: 1, credits: "10,000 Credits", droids: [{ name: "Mouse", tier: 1 }, { name: "Pit", tier: 1 }, { name: "GONK", tier: 1 }] },
  { level: 2, credits: "150,000 Credits", droids: [{ name: "2BB", tier: 1 }, { name: "R3", tier: 1 }, { name: "Senate Hovercam", tier: 1 }] },
  { level: 3, credits: "975,000 Credits", droids: [{ name: "R4", tier: 1 }, { name: "R5", tier: 1 }, { name: "R8", tier: 1 }] },
  { level: 4, credits: "2.95 Million Credits", droids: [{ name: "R9", tier: 2 }, { name: "B1 Battle", tier: 2 }, { name: "B1 Security", tier: 2 }] },
  { level: 5, credits: "5.35 Million Credits", droids: [{ name: "2BB", tier: 2 }, { name: "R3", tier: 2 }, { name: "Senate Hovercam", tier: 2 }] },
  { level: 6, credits: "9.85 Million Credits", droids: [{ name: "BDX Explorer", tier: 3 }, { name: "R4", tier: 3 }, { name: "R5", tier: 3 }] },
  { level: 7, credits: "14.5 Million Credits", droids: [{ name: "R8", tier: 3 }, { name: "R9", tier: 3 }, { name: "B1 Battle", tier: 3 }] },
  { level: 8, credits: "36 Million Credits", droids: [{ name: "B1 Security", tier: 4 }, { name: "R3", tier: 4 }, { name: "2BB", tier: 4 }] },
  { level: 9, credits: "89 Million Credits", droids: [{ name: "BDX Explorer", tier: 4 }, { name: "R4", tier: 4 }, { name: "R5", tier: 4 }] },
  { level: 10, credits: "220 Million Credits", droids: [{ name: "TRAK-R", tier: 1 }, { name: "Groundmech", tier: 1 }, { name: "Senate Hovercam", tier: 4 }] },
  { level: 11, credits: "550 Million Credits", droids: [{ name: "B2 Heavy", tier: 1 }, { name: "B2 Super", tier: 1 }, { name: "UTIL-TEC", tier: 1 }] },
  { level: 12, credits: "1.36 Billion Credits", droids: [{ name: "TRAK-R", tier: 2 }, { name: "Groundmech", tier: 2 }, { name: "Bal-Core", tier: 4 }] },
  { level: 13, credits: "3.4 Billion Credits", droids: [{ name: "B2 Super", tier: 4 }, { name: "Mecha-Droid", tier: 1 }, { name: "Proto-Roller", tier: 1 }] },
  { level: 14, credits: "8.45 Billion Credits", droids: [{ name: "B2 Heavy", tier: 4 }, { name: "B2-RP", tier: 1 }, { name: "R7", tier: 2 }] },
  { level: 15, credits: "21 Billion Credits", droids: [{ name: "Strike-Orb", tier: 4 }, { name: "BB9", tier: 2 }, { name: "Proto-Roller", tier: 2 }] },
  { level: 16, credits: "52 Billion Credits", droids: [{ name: "AMP Walker", tier: 4 }, { name: "B2-RP", tier: 3 }, { name: "Mecha-Droid", tier: 2 }] },
  { level: 17, credits: "130 Billion Credits", droids: [{ name: "Opti-Pod", tier: 4 }, { name: "R7", tier: 3 }, { name: "MONO-WLKR", tier: 2 }] },
  { level: 18, credits: "325 Billion Credits", droids: [{ name: "UTIL-TEC", tier: 4 }, { name: "BB9", tier: 3 }, { name: "Proto-Roller", tier: 3 }] },
  { level: 19, credits: "810 Billion Credits", droids: [{ name: "Mecha-Droid", tier: 3 }, { name: "R7", tier: 4 }, { name: "B2-RP", tier: 4 }] },
  { level: 20, credits: "2 Trillion Credits", droids: [{ name: "MONO-WLKR", tier: 4 }, { name: "Opti-STRK", tier: 4 }, { name: "Cyclo-Grav", tier: 4 }] },
  { level: 21, credits: "3 Trillion Credits", droids: [{ name: "LO", tier: 5 }, { name: "R6", tier: 5 }, { name: "HAUL-R", tier: 5 }] },
  { level: 22, credits: "4.5 Trillion Credits", droids: [{ name: "Strike-Orb", tier: 5 }, { name: "SEN-TRI", tier: 5 }, { name: "Proto-Roller", tier: 5 }] },
  { level: 23, credits: "6 Trillion Credits", droids: [{ name: "BB9", tier: 5 }, { name: "Cyclo-Grav", tier: 5 }, { name: "B2-RP", tier: 5 }] }
];

const rebirthRequirementsCycle4: RebirthRequirement[] = [
  { level: 1, credits: "10,000 Credits", droids: [{ name: "ID-10", tier: 1 }, { name: "Pit", tier: 1 }, { name: "DRK-1 Probe", tier: 1 }] },
  { level: 2, credits: "150,000 Credits", droids: [{ name: "R3", tier: 1 }, { name: "2BB", tier: 1 }, { name: "Senate Hovercam", tier: 1 }] },
  { level: 3, credits: "975,000 Credits", droids: [{ name: "R4", tier: 1 }, { name: "R5", tier: 2 }, { name: "R8", tier: 2 }] },
  { level: 4, credits: "2.95 Million Credits", droids: [{ name: "R9", tier: 2 }, { name: "B1 Battle", tier: 2 }, { name: "B1 Security", tier: 2 }] },
  { level: 5, credits: "5.35 Million Credits", droids: [{ name: "2BB", tier: 2 }, { name: "R3", tier: 2 }, { name: "Senate Hovercam", tier: 2 }] },
  { level: 6, credits: "9.85 Million Credits", droids: [{ name: "BDX Explorer", tier: 3 }, { name: "R4", tier: 3 }, { name: "R5", tier: 3 }] },
  { level: 7, credits: "14.5 Million Credits", droids: [{ name: "R8", tier: 3 }, { name: "R9", tier: 3 }, { name: "B1 Battle", tier: 3 }] },
  { level: 8, credits: "36 Million Credits", droids: [{ name: "B1 Security", tier: 4 }, { name: "R3", tier: 4 }, { name: "2BB", tier: 4 }] },
  { level: 9, credits: "89 Million Credits", droids: [{ name: "BDX Explorer", tier: 4 }, { name: "R4", tier: 4 }, { name: "R5", tier: 4 }] },
  { level: 10, credits: "220 Million Credits", droids: [{ name: "TRAK-R", tier: 1 }, { name: "Groundmech", tier: 1 }, { name: "Senate Hovercam", tier: 4 }] },
  { level: 11, credits: "550 Million Credits", droids: [{ name: "B2 Heavy", tier: 1 }, { name: "B2 Super", tier: 1 }, { name: "UTIL-TEC", tier: 1 }] },
  { level: 12, credits: "1.36 Billion Credits", droids: [{ name: "Bal-Core", tier: 4 }, { name: "Groundmech", tier: 2 }, { name: "TRAK-R", tier: 2 }] },
  { level: 13, credits: "3.4 Billion Credits", droids: [{ name: "B2 Super", tier: 4 }, { name: "Mecha-Droid", tier: 1 }, { name: "Proto-Roller", tier: 1 }] },
  { level: 14, credits: "8.45 Billion Credits", droids: [{ name: "Bal-Core", tier: 3 }, { name: "Groundmech", tier: 3 }, { name: "TRAK-R", tier: 4 }] },
  { level: 15, credits: "21 Billion Credits", droids: [{ name: "B2 Heavy", tier: 3 }, { name: "B2 Super", tier: 4 }, { name: "B2-RP", tier: 1 }] },
  { level: 16, credits: "52 Billion Credits", droids: [{ name: "UTIL-TEC", tier: 4 }, { name: "BB9", tier: 1 }, { name: "R7", tier: 2 }] },
  { level: 17, credits: "130 Billion Credits", droids: [{ name: "Opti-STRK", tier: 1 }, { name: "Cyclo-Grav", tier: 2 }, { name: "Mecha-Droid", tier: 2 }] },
  { level: 18, credits: "325 Billion Credits", droids: [{ name: "B2-RP", tier: 2 }, { name: "BB9", tier: 2 }, { name: "R7", tier: 3 }] },
  { level: 19, credits: "810 Billion Credits", droids: [{ name: "Mecha-Droid", tier: 3 }, { name: "R7", tier: 4 }, { name: "B2-RP", tier: 4 }] },
  { level: 20, credits: "2 Trillion Credits", droids: [{ name: "MONO-WLKR", tier: 4 }, { name: "Opti-STRK", tier: 4 }, { name: "Cyclo-Grav", tier: 4 }] },
  { level: 21, credits: "3 Trillion Credits", droids: [{ name: "LO", tier: 5 }, { name: "R6", tier: 5 }, { name: "HAUL-R", tier: 5 }] },
  { level: 22, credits: "4.5 Trillion Credits", droids: [{ name: "Proto-Roller", tier: 5 }, { name: "SEN-TRI", tier: 5 }, { name: "Strike-Orb", tier: 5 }] },
  { level: 23, credits: "6 Trillion Credits", droids: [{ name: "B2-RP", tier: 5 }, { name: "Cyclo-Grav", tier: 5 }, { name: "BB9", tier: 5 }] }
];

const tiersConfig = [
  { level: 1, label: 'Base', short: 'BAS' },
  { level: 2, label: 'Oro', short: 'ORO' },
  { level: 3, label: 'Diamante', short: 'DIA' },
  { level: 4, label: 'Arcoíris', short: 'ARC' },
  { level: 5, label: 'Beskar', short: 'BES' }
];

const getTierName = (tier: number) => {
  switch (tier) {
    case 1: return 'Base';
    case 2: return 'Oro';
    case 3: return 'Diamante';
    case 4: return 'Arcoíris';
    case 5: return 'Beskar';
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

export default function App() {
  const [progress, setProgress] = useState<Record<string, number>>({});
  const [currentRebirth, setCurrentRebirth] = useState<number>(0); // 0 to 23
  const [currentCycle, setCurrentCycle] = useState<number>(3); // 2, 3, or 4
  const [showResetModal, setShowResetModal] = useState(false);
  const [showSuperRebirthModal, setShowSuperRebirthModal] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showFullGuide, setShowFullGuide] = useState<boolean>(false);
  const [language, setLanguage] = useState<string>('es');

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
      default: return t('tierName_Ninguno');
    }
  };

  const localizedTiersConfig = [
    { level: 1, label: t('tierName_1'), short: t('tierShort_1') },
    { level: 2, label: t('tierName_2'), short: t('tierShort_2') },
    { level: 3, label: t('tierName_3'), short: t('tierShort_3') },
    { level: 4, label: t('tierName_4'), short: t('tierShort_4') },
    { level: 5, label: t('tierName_5'), short: t('tierShort_5') }
  ];

  const formatCredits = (creditsStr: string) => {
    if (language === 'en') return creditsStr;
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
      if (parsedRebirth >= 0 && parsedRebirth <= 23) {
        setCurrentRebirth(parsedRebirth);
      }
    }
    const savedCycle = localStorage.getItem('droid_tycoon_current_cycle');
    if (savedCycle) {
      setCurrentCycle(parseInt(savedCycle, 10) || 3);
    }
    const savedLanguage = localStorage.getItem('droid_tycoon_language');
    if (savedLanguage === 'es' || savedLanguage === 'en') {
      setLanguage(savedLanguage);
    } else {
      const browserLang = navigator.language.split('-')[0];
      if (browserLang === 'es' || browserLang === 'en') {
        setLanguage(browserLang);
      } else {
        setLanguage('es');
      }
    }
    setIsLoaded(true);
  }, []);

  const saveLanguage = (lang: string) => {
    setLanguage(lang);
    localStorage.setItem('droid_tycoon_language', lang);
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
    saveProgress({});
    saveRebirth(0);
    setShowSuperRebirthModal(false);
  };

  const handleClearDroid = (droidName: string) => {
    saveProgress({ ...progress, [droidName]: 0 });
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

  const sortedDroids = [...classifiedDroids].sort((a, b) => {
    const order = { immediate: 0, needed: 1, completed: 2, discarded: 3 };
    if (order[a.status] !== order[b.status]) {
      return order[a.status] - order[b.status];
    }
    return a.name.localeCompare(b.name);
  });

  const requiredDroids = sortedDroids.filter(d => d.status !== 'discarded');
  const discardedDroids = sortedDroids.filter(d => d.status === 'discarded');

  if (!isLoaded) return null;

  const nextLevel = currentRebirth + 1;
  const nextReq = rebirthRequirements.find(r => r.level === nextLevel);
  const isNextReqMet = nextReq ? getRebirthStatus(nextReq) === 'ready' : false;

  return (
    <div className="min-h-screen bg-[#050810] text-[#e2e8f0] font-sans antialiased p-3 pb-8 space-y-4">
      <div className="max-w-6xl mx-auto space-y-3">
        
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
            <div className="flex gap-1.5 overflow-x-auto pb-1.5 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
              {Array.from({ length: 24 }, (_, i) => {
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
          
          {/* Sección 1: Requisitos de Rebirth */}
          <div className="space-y-2">
            <h3 className="text-[10px] sm:text-xs uppercase font-extrabold text-[#64748b] tracking-wider px-1">
              {t('rebirthRequirementsSection')}
            </h3>
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
                    {/* Fila 1: Nombre y Rarity */}
                    <div className="flex justify-between items-center gap-1.5 mb-2">
                      <h4 className={`text-sm sm:text-base truncate flex-1 leading-tight ${
                        isImmediate 
                          ? 'text-institutional-secondary font-extrabold' 
                          : 'text-white font-bold'
                      }`} title={droid.name}>
                        {droid.name}
                      </h4>
                      <div className="flex gap-1 flex-shrink-0 items-center">
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

                    {/* Fila 3: Selector de los 5 Niveles (Cómodo para dedos) */}
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
              <h3 className="text-[10px] sm:text-xs uppercase font-extrabold text-red-500/80 tracking-wider px-1 flex items-center gap-1.5">
                <span>{t('notRequiredSection')}</span>
                <span className="text-[9px] font-mono bg-red-950/30 border border-red-500/20 px-1.5 py-0.2 rounded text-red-400">
                  {discardedDroids.length}
                </span>
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2">
                {discardedDroids.map(droid => {
                  const hasProgress = droid.achieved > 0;
                  const inCycle = isDroidInCycle(droid.name);

                  // Definir estilos dinámicos de contenedor e h4
                  let cardClass = "p-2.5 rounded-lg border flex items-center justify-between transition-all duration-150 select-none ";
                  let titleClass = "text-xs sm:text-sm font-bold truncate flex-1 pr-1.5 ";

                  if (hasProgress) {
                    cardClass += "bg-[#1c1214]/60 border-red-900/30 hover:bg-[#25181a]/70 hover:border-red-500/30 cursor-pointer shadow-[inset_0_0_8px_rgba(239,68,68,0.05)]";
                    titleClass += "text-red-400";
                  } else {
                    if (inCycle) {
                      cardClass += "bg-[#120e10]/35 border-red-950/15";
                      titleClass += "text-red-500/35 line-through";
                    } else {
                      cardClass += "bg-[#120e10]/35 border-institutional-border/20";
                      titleClass += "text-slate-500/50";
                    }
                  }

                  return (
                    <div 
                      key={droid.name} 
                      onClick={() => hasProgress && handleClearDroid(droid.name)}
                      className={cardClass}
                      title={hasProgress ? t('notRequiredTooltip') : undefined}
                    >
                      <h4 className={titleClass}>
                        {droid.name}
                      </h4>
                      {hasProgress && (
                        <span className="text-[8px] font-bold text-red-400/85 bg-red-950/40 border border-red-900/30 px-1 py-0.2 rounded flex-shrink-0 font-mono">
                          {localizedTiersConfig[droid.achieved - 1]?.short}
                        </span>
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

    </div>
  );
}
