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
    tier: number; // 1: Base, 2: Gold, 3: Diamond, 4: Rainbow, 5: Beskar, 6: Galactic, 7: Stellar
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
  { name: "CHOPPER", maxReq: 1, type: "ASTRO", rarity: "ICONICO" },

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

const srRewardsTable: Record<number, { crystals: number; creditMult: string; xpMult: string }> = {
  12: { crystals: 11, creditMult: '22%', xpMult: '110%' },
  13: { crystals: 16, creditMult: '32%', xpMult: '160%' },
  14: { crystals: 22, creditMult: '44%', xpMult: '220%' },
  15: { crystals: 29, creditMult: '58%', xpMult: '290%' },
  16: { crystals: 37, creditMult: '74%', xpMult: '370%' },
  17: { crystals: 46, creditMult: '92%', xpMult: '460%' },
  18: { crystals: 56, creditMult: '112%', xpMult: '560%' },
  19: { crystals: 67, creditMult: '134%', xpMult: '670%' },
  20: { crystals: 79, creditMult: '158%', xpMult: '790%' },
  21: { crystals: 92, creditMult: '184%', xpMult: '920%' },
  22: { crystals: 106, creditMult: '212%', xpMult: '1060%' },
  23: { crystals: 121, creditMult: '242%', xpMult: '1210%' },
  24: { crystals: 137, creditMult: '274%', xpMult: '1370%' },
  25: { crystals: 154, creditMult: '308%', xpMult: '1540%' },
  26: { crystals: 172, creditMult: '344%', xpMult: '1720%' },
  27: { crystals: 191, creditMult: '382%', xpMult: '1910%' },
  28: { crystals: 211, creditMult: '422%', xpMult: '2110%' },
  29: { crystals: 232, creditMult: '464%', xpMult: '2320%' },
  30: { crystals: 254, creditMult: '508%', xpMult: '2540%' },
};

const getNovaCrystals = (level: number): number => {
  return srRewardsTable[level]?.crystals || 0;
};

const droidImageKeyMap: Record<string, string> = {
  '2BB': '2BB',
  'A-LT': 'ALT',
  'AMP Walker': 'AMPWALKER',
  'ARG': 'ARG',
  'B1 Battle': 'B1BATTLE',
  'B1 Heavy': 'B1HEAVY',
  'B1 Security': 'B1SECURITY',
  'B2 Heavy': 'B2HEAVY',
  'B2-RP': 'B2RP',
  'B2 Super': 'B2SUPER',
  'Bal-Core': 'BALCORE',
  'BB': 'BB',
  'BB8': 'BB8',
  'BB-9': 'BB9',
  'BDX Explorer': 'BDXEXPLORER',
  'BU-4D': 'BU4D',
  'CB': 'CB',
  'CB-23': 'CB23',
  'Cyclens': 'CYCLENS',
  'CYCLENS': 'CYCLENS',
  'Cyclo-Grav': 'CYCLOGRAV',
  'DJ R-3X': 'DJR3X',
  'DRFT-R': 'DRFTR',
  'DRK-1 Probe': 'DRK1PROBE',
  'Gonk': 'GONK',
  'Groundmech': 'GROUNDMECH',
  'Gunrunner': 'GUNRUNNER',
  'Haul-R': 'HAULR',
  'HOV-R': 'HOVR',
  'ID-10': 'ID10',
  'IG': 'IG',
  'IG-11 Marshal': 'IG11MARSHALL',
  'Imperial Probe': 'IMPERIALPROBE',
  'KX': 'KX',
  'LEP': 'LEP',
  'LNG-Shot': 'LNGSHOT',
  'LO': 'LO',
  'LOADLIFTER': 'LOADLIFTER',
  'Mecha-Droid': 'MECHADROID',
  'Mister Bones': 'MISTERBONES',
  'MONO-WLKR': 'MONOWLKR',
  'MO-TRAK': 'MOTRAK',
  'Mouse': 'MOUSE',
  'NAV-EX': 'NAVEX',
  'Opti-Pod': 'OPTIPOD',
  'Opti-STRK': 'OPTISTRK',
  'Orb-Walker': 'ORBWALKER',
  'Pit': 'PIT',
  'Proto-Roller': 'PROTOROLLER',
  'R2': 'R2',
  'R2-D2': 'R2D2',
  'R3': 'R3',
  'R4': 'R4',
  'R5': 'R5',
  'R6': 'R6',
  'R7': 'R7',
  'R8': 'R8',
  'R9': 'R9',
  'RIC': 'RIC',
  'RIC-1200': 'RIC1200',
  'Roll-R': 'ROLLR',
  'Senate Hovercam': 'SENATEHOVERCAM',
  'Sen-Tri': 'SENTRI',
  'SNOW MOUSE': 'SNOWMOUSE',
  'Strike-Orb': 'STRIKEORB',
  'Trak-R': 'TRAKR',
  'TRI-TEK': 'TRITEK',
  'Util-Tec': 'UTILTEC',
  'Vect-Arm': 'VECTARM',
  'C-3PO': 'C3PO',
  'CHOPPER': 'CHOPPER'
};

const droidImageMap: Record<string, string> = {
  "2BB:Default": "/assets/droids/2BB_Default.webp",
  "2BB:Gold": "/assets/droids/2BB_Gold.webp",
  "2BB:Diamond": "/assets/droids/2BB_Diamond.webp",
  "2BB:Rainbow": "/assets/droids/2BB_Rainbow.webp",
  "2BB:Beskar": "/assets/droids/2BB_Beskar.webp",
  "2BB:Galactic": "/assets/droids/2BB_Galactic.webp",
  "ALT:Default": "/assets/droids/ALT_Default.webp",
  "ALT:Gold": "/assets/droids/ALT_Gold.webp",
  "ALT:Diamond": "/assets/droids/ALT_Diamond.webp",
  "ALT:Rainbow": "/assets/droids/ALT_Rainbow.webp",
  "ALT:Beskar": "/assets/droids/ALT_Beskar.webp",
  "ALT:Galactic": "/assets/droids/ALT_Galactic.webp",
  "AMPWALKER:Default": "/assets/droids/AMPWALKER_Default.webp",
  "AMPWALKER:Gold": "/assets/droids/AMPWALKER_Gold.webp",
  "AMPWALKER:Diamond": "/assets/droids/AMPWALKER_Diamond.webp",
  "AMPWALKER:Rainbow": "/assets/droids/AMPWALKER_Rainbow.webp",
  "AMPWALKER:Beskar": "/assets/droids/AMPWALKER_Beskar.webp",
  "AMPWALKER:Galactic": "/assets/droids/AMPWALKER_Galactic.webp",
  "ARG:Default": "/assets/droids/ARG_Default.webp",
  "ARG:Gold": "/assets/droids/ARG_Gold.webp",
  "ARG:Diamond": "/assets/droids/ARG_Diamond.webp",
  "ARG:Rainbow": "/assets/droids/ARG_Rainbow.webp",
  "ARG:Beskar": "/assets/droids/ARG_Beskar.webp",
  "ARG:Galactic": "/assets/droids/ARG_Galactic.webp",
  "B1BATTLE:Default": "/assets/droids/B1BATTLE_Default.webp",
  "B1BATTLE:Gold": "/assets/droids/B1BATTLE_Gold.webp",
  "B1BATTLE:Diamond": "/assets/droids/B1BATTLE_Diamond.webp",
  "B1BATTLE:Rainbow": "/assets/droids/B1BATTLE_Rainbow.webp",
  "B1BATTLE:Beskar": "/assets/droids/B1BATTLE_Beskar.webp",
  "B1BATTLE:Galactic": "/assets/droids/B1BATTLE_Galactic.webp",
  "B1HEAVY:Default": "/assets/droids/B1HEAVY_Default.webp",
  "B1HEAVY:Gold": "/assets/droids/B1HEAVY_Gold.webp",
  "B1HEAVY:Diamond": "/assets/droids/B1HEAVY_Diamond.webp",
  "B1HEAVY:Rainbow": "/assets/droids/B1HEAVY_Rainbow.webp",
  "B1HEAVY:Beskar": "/assets/droids/B1HEAVY_Beskar.webp",
  "B1HEAVY:Galactic": "/assets/droids/B1HEAVY_Galactic.webp",
  "B1SECURITY:Default": "/assets/droids/B1SECURITY_Default.webp",
  "B1SECURITY:Gold": "/assets/droids/B1SECURITY_Gold.webp",
  "B1SECURITY:Diamond": "/assets/droids/B1SECURITY_Diamond.webp",
  "B1SECURITY:Rainbow": "/assets/droids/B1SECURITY_Rainbow.webp",
  "B1SECURITY:Beskar": "/assets/droids/B1SECURITY_Beskar.webp",
  "B1SECURITY:Galactic": "/assets/droids/B1SECURITY_Galactic.webp",
  "B2HEAVY:Default": "/assets/droids/B2HEAVY_Default.webp",
  "B2HEAVY:Gold": "/assets/droids/B2HEAVY_Gold.webp",
  "B2HEAVY:Diamond": "/assets/droids/B2HEAVY_Diamond.webp",
  "B2HEAVY:Rainbow": "/assets/droids/B2HEAVY_Rainbow.webp",
  "B2HEAVY:Beskar": "/assets/droids/B2HEAVY_Beskar.webp",
  "B2HEAVY:Galactic": "/assets/droids/B2HEAVY_Galactic.webp",
  "B2RP:Default": "/assets/droids/B2RP_Default.webp",
  "B2RP:Gold": "/assets/droids/B2RP_Gold.webp",
  "B2RP:Diamond": "/assets/droids/B2RP_Diamond.webp",
  "B2RP:Rainbow": "/assets/droids/B2RP_Rainbow.webp",
  "B2RP:Beskar": "/assets/droids/B2RP_Beskar.webp",
  "B2RP:Galactic": "/assets/droids/B2RP_Galactic.webp",
  "B2SUPER:Default": "/assets/droids/B2SUPER_Default.webp",
  "B2SUPER:Gold": "/assets/droids/B2SUPER_Gold.webp",
  "B2SUPER:Diamond": "/assets/droids/B2SUPER_Diamond.webp",
  "B2SUPER:Rainbow": "/assets/droids/B2SUPER_Rainbow.webp",
  "B2SUPER:Beskar": "/assets/droids/B2SUPER_Beskar.webp",
  "B2SUPER:Galactic": "/assets/droids/B2SUPER_Galactic.webp",
  "BALCORE:Default": "/assets/droids/BALCORE_Default.webp",
  "BALCORE:Gold": "/assets/droids/BALCORE_Gold.webp",
  "BALCORE:Diamond": "/assets/droids/BALCORE_Diamond.webp",
  "BALCORE:Rainbow": "/assets/droids/BALCORE_Rainbow.webp",
  "BALCORE:Beskar": "/assets/droids/BALCORE_Beskar.webp",
  "BALCORE:Galactic": "/assets/droids/BALCORE_Galactic.webp",
  "BB:Default": "/assets/droids/BB_Default.webp",
  "BB:Gold": "/assets/droids/BB_Gold.webp",
  "BB:Diamond": "/assets/droids/BB_Diamond.webp",
  "BB:Rainbow": "/assets/droids/BB_Rainbow.webp",
  "BB:Beskar": "/assets/droids/BB_Beskar.webp",
  "BB:Galactic": "/assets/droids/BB_Galactic.webp",
  "BB8:Default": "/assets/droids/BB8_Default.webp",
  "BB8:Iconic": "/assets/droids/BB8_Iconic.webp",
  "BB9:Default": "/assets/droids/BB9_Default.webp",
  "BB9:Gold": "/assets/droids/BB9_Gold.webp",
  "BB9:Diamond": "/assets/droids/BB9_Diamond.webp",
  "BB9:Rainbow": "/assets/droids/BB9_Rainbow.webp",
  "BB9:Beskar": "/assets/droids/BB9_Beskar.webp",
  "BB9:Galactic": "/assets/droids/BB9_Galactic.webp",
  "BDXEXPLORER:Default": "/assets/droids/BDXEXPLORER_Default.webp",
  "BDXEXPLORER:Gold": "/assets/droids/BDXEXPLORER_Gold.webp",
  "BDXEXPLORER:Diamond": "/assets/droids/BDXEXPLORER_Diamond.webp",
  "BDXEXPLORER:Rainbow": "/assets/droids/BDXEXPLORER_Rainbow.webp",
  "BDXEXPLORER:Beskar": "/assets/droids/BDXEXPLORER_Beskar.webp",
  "BDXEXPLORER:Galactic": "/assets/droids/BDXEXPLORER_Galactic.webp",
  "BU4D:Default": "/assets/droids/BU4D_Default.webp",
  "BU4D:Gold": "/assets/droids/BU4D_Gold.webp",
  "BU4D:Diamond": "/assets/droids/BU4D_Diamond.webp",
  "BU4D:Rainbow": "/assets/droids/BU4D_Rainbow.webp",
  "BU4D:Beskar": "/assets/droids/BU4D_Beskar.webp",
  "BU4D:Galactic": "/assets/droids/BU4D_Galactic.webp",
  "CB:Default": "/assets/droids/CB_Default.webp",
  "CB:Gold": "/assets/droids/CB_Gold.webp",
  "CB:Diamond": "/assets/droids/CB_Diamond.webp",
  "CB:Rainbow": "/assets/droids/CB_Rainbow.webp",
  "CB:Beskar": "/assets/droids/CB_Beskar.webp",
  "CB:Galactic": "/assets/droids/CB_Galactic.webp",
  "CB23:Default": "/assets/droids/CB23_Default.webp",
  "CB23:Iconic": "/assets/droids/CB23_Iconic.webp",
  "CYCLENS:Default": "/assets/droids/CYCLENS_Default.png",
  "CYCLENS:Gold": "/assets/droids/CYCLENS_Gold.png",
  "CYCLENS:Diamond": "/assets/droids/CYCLENS_Diamond.png",
  "CYCLENS:Rainbow": "/assets/droids/CYCLENS_Rainbow.png",
  "CYCLENS:Beskar": "/assets/droids/CYCLENS_Beskar.png",
  "CYCLENS:Galactic": "/assets/droids/CYCLENS_Galactic.webp",
  "CYCLOGRAV:Default": "/assets/droids/CYCLOGRAV_Default.webp",
  "CYCLOGRAV:Gold": "/assets/droids/CYCLOGRAV_Gold.webp",
  "CYCLOGRAV:Diamond": "/assets/droids/CYCLOGRAV_Diamond.webp",
  "CYCLOGRAV:Rainbow": "/assets/droids/CYCLOGRAV_Rainbow.webp",
  "CYCLOGRAV:Beskar": "/assets/droids/CYCLOGRAV_Beskar.webp",
  "CYCLOGRAV:Galactic": "/assets/droids/CYCLOGRAV_Galactic.webp",
  "DJR3X:Default": "/assets/droids/DJR3X_Default.webp",
  "DJR3X:Iconic": "/assets/droids/DJR3X_Iconic.webp",
  "DRFTR:Default": "/assets/droids/DRFT-R_Default.png",
  "DRFTR:Gold": "/assets/droids/DRFT-R_Gold.png",
  "DRFTR:Diamond": "/assets/droids/DRFT-R_Diamond.png",
  "DRFTR:Rainbow": "/assets/droids/DRFT-R_Rainbow.png",
  "DRFTR:Beskar": "/assets/droids/DRFT-R_Beskar.png",
  "DRFTR:Galactic": "/assets/droids/DRFTR_Galactic.webp",
  "DRK1PROBE:Default": "/assets/droids/DRK1PROBE_Default.webp",
  "DRK1PROBE:Gold": "/assets/droids/DRK1PROBE_Gold.webp",
  "DRK1PROBE:Diamond": "/assets/droids/DRK1PROBE_Diamond.webp",
  "DRK1PROBE:Rainbow": "/assets/droids/DRK1PROBE_Rainbow.webp",
  "DRK1PROBE:Beskar": "/assets/droids/DRK1PROBE_Beskar.webp",
  "DRK1PROBE:Galactic": "/assets/droids/DRK1PROBE_Galactic.webp",
  "GONK:Default": "/assets/droids/GONK_Default.webp",
  "GONK:Gold": "/assets/droids/GONK_Gold.webp",
  "GONK:Diamond": "/assets/droids/GONK_Diamond.webp",
  "GONK:Rainbow": "/assets/droids/GONK_Rainbow.webp",
  "GONK:Beskar": "/assets/droids/GONK_Beskar.webp",
  "GONK:Galactic": "/assets/droids/GONK_Galactic.webp",
  "GROUNDMECH:Default": "/assets/droids/GROUNDMECH_Default.webp",
  "GROUNDMECH:Gold": "/assets/droids/GROUNDMECH_Gold.webp",
  "GROUNDMECH:Diamond": "/assets/droids/GROUNDMECH_Diamond.webp",
  "GROUNDMECH:Rainbow": "/assets/droids/GROUNDMECH_Rainbow.webp",
  "GROUNDMECH:Beskar": "/assets/droids/GROUNDMECH_Beskar.webp",
  "GROUNDMECH:Galactic": "/assets/droids/GROUNDMECH_Galactic.webp",
  "GUNRUNNER:Default": "/assets/droids/GUNRUNNER_Default.webp",
  "GUNRUNNER:Gold": "/assets/droids/GUNRUNNER_Gold.webp",
  "GUNRUNNER:Diamond": "/assets/droids/GUNRUNNER_Diamond.webp",
  "GUNRUNNER:Rainbow": "/assets/droids/GUNRUNNER_Rainbow.webp",
  "GUNRUNNER:Beskar": "/assets/droids/GUNRUNNER_Beskar.webp",
  "GUNRUNNER:Galactic": "/assets/droids/GUNRUNNER_Galactic.webp",
  "HAULR:Default": "/assets/droids/HAULR_Default.webp",
  "HAULR:Gold": "/assets/droids/HAULR_Gold.webp",
  "HAULR:Diamond": "/assets/droids/HAULR_Diamond.webp",
  "HAULR:Rainbow": "/assets/droids/HAULR_Rainbow.webp",
  "HAULR:Beskar": "/assets/droids/HAULR_Beskar.webp",
  "HAULR:Galactic": "/assets/droids/HAULR_Galactic.webp",
  "HOVR:Default": "/assets/droids/HOVR_Default.webp",
  "HOVR:Gold": "/assets/droids/HOVR_Gold.webp",
  "HOVR:Diamond": "/assets/droids/HOVR_Diamond.webp",
  "HOVR:Rainbow": "/assets/droids/HOVR_Rainbow.webp",
  "HOVR:Beskar": "/assets/droids/HOVR_Beskar.webp",
  "HOVR:Galactic": "/assets/droids/HOVR_Galactic.webp",
  "ID10:Default": "/assets/droids/ID10_Default.webp",
  "ID10:Gold": "/assets/droids/ID10_Gold.webp",
  "ID10:Diamond": "/assets/droids/ID10_Diamond.webp",
  "ID10:Rainbow": "/assets/droids/ID10_Rainbow.webp",
  "ID10:Beskar": "/assets/droids/ID10_Beskar.webp",
  "ID10:Galactic": "/assets/droids/ID10_Galactic.webp",
  "IG:Default": "/assets/droids/IG_Default.png",
  "IG:Gold": "/assets/droids/IG_Gold.png",
  "IG:Diamond": "/assets/droids/IG_Diamond.png",
  "IG:Rainbow": "/assets/droids/IG_Rainbow.png",
  "IG:Beskar": "/assets/droids/IG_Beskar.png",
  "IG:Galactic": "/assets/droids/IG_Galactic.webp",
  "IG11MARSHALL:Default": "/assets/droids/IG11MARSHAL_Default.webp",
  "IG11MARSHALL:Iconic": "/assets/droids/IG11MARSHALL_Iconic.webp",
  "IMPERIALPROBE:Default": "/assets/droids/IMPERIALPROBE_Default.webp",
  "IMPERIALPROBE:Gold": "/assets/droids/IMPERIALPROBE_Gold.webp",
  "IMPERIALPROBE:Diamond": "/assets/droids/IMPERIALPROBE_Diamond.webp",
  "IMPERIALPROBE:Rainbow": "/assets/droids/IMPERIALPROBE_Rainbow.webp",
  "IMPERIALPROBE:Beskar": "/assets/droids/IMPERIALPROBE_Beskar.webp",
  "IMPERIALPROBE:Galactic": "/assets/droids/IMPERIALPROBE_Galactic.webp",
  "KX:Default": "/assets/droids/KX_Default.png",
  "KX:Gold": "/assets/droids/KX_Gold.png",
  "KX:Diamond": "/assets/droids/KX_Diamond.png",
  "KX:Rainbow": "/assets/droids/KX_Rainbow.png",
  "KX:Beskar": "/assets/droids/KX_Beskar.png",
  "LEP:Default": "/assets/droids/LEP_Default.png",
  "LEP:Gold": "/assets/droids/LEP_Gold.png",
  "LEP:Diamond": "/assets/droids/LEP_Diamond.png",
  "LEP:Rainbow": "/assets/droids/LEP_Rainbow.png",
  "LEP:Beskar": "/assets/droids/LEP_Beskar.png",
  "LNGSHOT:Default": "/assets/droids/LNGSHOT_Default.webp",
  "LNGSHOT:Gold": "/assets/droids/LNGSHOT_Gold.webp",
  "LNGSHOT:Diamond": "/assets/droids/LNGSHOT_Diamond.webp",
  "LNGSHOT:Rainbow": "/assets/droids/LNGSHOT_Rainbow.webp",
  "LNGSHOT:Beskar": "/assets/droids/LNGSHOT_Beskar.webp",
  "LNGSHOT:Galactic": "/assets/droids/LNGSHOT_Galactic.webp",
  "LO:Default": "/assets/droids/LO_Default.webp",
  "LO:Beskar": "/assets/droids/LO_Beskar.webp",
  "LO:Galactic": "/assets/droids/LO_Galactic.webp",
  "LOADLIFTER:Default": "/assets/droids/LOADLIFTER_Default.png",
  "LOADLIFTER:Gold": "/assets/droids/LOADLIFTER_Gold.png",
  "LOADLIFTER:Diamond": "/assets/droids/Loadlifter_Diamond.png",
  "LOADLIFTER:Rainbow": "/assets/droids/LOADLIFTER_Rainbow.png",
  "LOADLIFTER:Beskar": "/assets/droids/LOADLIFTER_Beskar.png",
  "LOADLIFTER:Galactic": "/assets/droids/LOADLIFTER_Galactic.webp",
  "MECHADROID:Default": "/assets/droids/MECHADROID_Default.webp",
  "MECHADROID:Gold": "/assets/droids/MECHADROID_Gold.webp",
  "MECHADROID:Diamond": "/assets/droids/MECHADROID_Diamond.webp",
  "MECHADROID:Rainbow": "/assets/droids/MECHADROID_Rainbow.webp",
  "MECHADROID:Beskar": "/assets/droids/MECHADROID_Beskar.webp",
  "MECHADROID:Galactic": "/assets/droids/MECHADROID_Galactic.webp",
  "MISTERBONES:Default": "/assets/droids/MISTERBONES_Default.webp",
  "MISTERBONES:Iconic": "/assets/droids/MISTERBONES_Iconic.webp",
  "MONOWLKR:Default": "/assets/droids/MONOWLKR_Default.webp",
  "MONOWLKR:Gold": "/assets/droids/MONOWLKR_Gold.webp",
  "MONOWLKR:Diamond": "/assets/droids/MONOWLKR_Diamond.webp",
  "MONOWLKR:Rainbow": "/assets/droids/MONOWLKR_Rainbow.webp",
  "MONOWLKR:Beskar": "/assets/droids/MONOWLKR_Beskar.webp",
  "MONOWLKR:Galactic": "/assets/droids/MONOWLKR_Galactic.webp",
  "MOTRAK:Default": "/assets/droids/MO-TRAK_Default.png",
  "MOTRAK:Gold": "/assets/droids/MO-TRAK_Gold.png",
  "MOTRAK:Diamond": "/assets/droids/MO-TRAK_Diamond.png",
  "MOTRAK:Rainbow": "/assets/droids/MO-TRAK_Rainbow.png",
  "MOTRAK:Beskar": "/assets/droids/MO-TRAK_Beskar.png",
  "MOUSE:Default": "/assets/droids/MOUSE_Default.webp",
  "MOUSE:Gold": "/assets/droids/MOUSE_Gold.webp",
  "MOUSE:Diamond": "/assets/droids/MOUSE_Diamond.webp",
  "MOUSE:Rainbow": "/assets/droids/MOUSE_Rainbow.webp",
  "MOUSE:Beskar": "/assets/droids/MOUSE_Beskar.webp",
  "MOUSE:Galactic": "/assets/droids/MOUSE_Galactic.webp",
  "NAVEX:Default": "/assets/droids/NAVEX_Default.webp",
  "NAVEX:Gold": "/assets/droids/NAVEX_Gold.webp",
  "NAVEX:Diamond": "/assets/droids/NAVEX_Diamond.webp",
  "NAVEX:Rainbow": "/assets/droids/NAVEX_Rainbow.webp",
  "NAVEX:Beskar": "/assets/droids/NAVEX_Beskar.webp",
  "NAVEX:Galactic": "/assets/droids/NAVEX_Galactic.webp",
  "OPTIPOD:Default": "/assets/droids/OPTIPOD_Default.webp",
  "OPTIPOD:Gold": "/assets/droids/OPTIPOD_Gold.webp",
  "OPTIPOD:Diamond": "/assets/droids/OPTIPOD_Diamond.webp",
  "OPTIPOD:Rainbow": "/assets/droids/OPTIPOD_Rainbow.webp",
  "OPTIPOD:Beskar": "/assets/droids/OPTIPOD_Beskar.webp",
  "OPTIPOD:Galactic": "/assets/droids/OPTIPOD_Galactic.webp",
  "OPTISTRK:Default": "/assets/droids/OPTISTRK_Default.webp",
  "OPTISTRK:Gold": "/assets/droids/OPTISTRK_Gold.webp",
  "OPTISTRK:Diamond": "/assets/droids/OPTISTRK_Diamond.webp",
  "OPTISTRK:Rainbow": "/assets/droids/OPTISTRK_Rainbow.webp",
  "OPTISTRK:Beskar": "/assets/droids/OPTISTRK_Beskar.webp",
  "OPTISTRK:Galactic": "/assets/droids/OPTISTRK_Galactic.webp",
  "ORBWALKER:Default": "/assets/droids/ORBWALKER_Default.webp",
  "ORBWALKER:Gold": "/assets/droids/ORBWALKER_Gold.webp",
  "ORBWALKER:Diamond": "/assets/droids/ORBWALKER_Diamond.webp",
  "ORBWALKER:Rainbow": "/assets/droids/ORBWALKER_Rainbow.webp",
  "ORBWALKER:Beskar": "/assets/droids/ORBWALKER_Beskar.webp",
  "ORBWALKER:Galactic": "/assets/droids/ORBWALKER_Galactic.webp",
  "PIT:Default": "/assets/droids/PIT_Default.webp",
  "PIT:Gold": "/assets/droids/PIT_Gold.webp",
  "PIT:Diamond": "/assets/droids/PIT_Diamond.webp",
  "PIT:Rainbow": "/assets/droids/PIT_Rainbow.webp",
  "PIT:Beskar": "/assets/droids/PIT_Beskar.webp",
  "PIT:Galactic": "/assets/droids/PIT_Galactic.webp",
  "PROTOROLLER:Default": "/assets/droids/PROTOROLLER_Default.webp",
  "PROTOROLLER:Gold": "/assets/droids/PROTOROLLER_Gold.webp",
  "PROTOROLLER:Diamond": "/assets/droids/PROTOROLLER_Diamond.webp",
  "PROTOROLLER:Rainbow": "/assets/droids/PROTOROLLER_Rainbow.webp",
  "PROTOROLLER:Beskar": "/assets/droids/PROTOROLLER_Beskar.webp",
  "PROTOROLLER:Galactic": "/assets/droids/PROTOROLLER_Galactic.webp",
  "R2:Default": "/assets/droids/R2_Default.webp",
  "R2:Gold": "/assets/droids/R2_Gold.webp",
  "R2:Diamond": "/assets/droids/R2_Diamond.webp",
  "R2:Rainbow": "/assets/droids/R2_Rainbow.webp",
  "R2:Beskar": "/assets/droids/R2_Beskar.webp",
  "R2:Galactic": "/assets/droids/R2_Galactic.webp",
  "R2D2:Default": "/assets/droids/R2D2_Default.webp",
  "R2D2:Iconic": "/assets/droids/R2D2_Iconic.webp",
  "R3:Default": "/assets/droids/R3_Default.webp",
  "R3:Gold": "/assets/droids/R3_Gold.webp",
  "R3:Diamond": "/assets/droids/R3_Diamond.webp",
  "R3:Rainbow": "/assets/droids/R3_Rainbow.webp",
  "R3:Beskar": "/assets/droids/R3_Beskar.webp",
  "R3:Galactic": "/assets/droids/R3_Galactic.webp",
  "R4:Default": "/assets/droids/R4_Default.webp",
  "R4:Gold": "/assets/droids/R4_Gold.webp",
  "R4:Diamond": "/assets/droids/R4_Diamond.webp",
  "R4:Rainbow": "/assets/droids/R4_Rainbow.webp",
  "R4:Beskar": "/assets/droids/R4_Beskar.webp",
  "R4:Galactic": "/assets/droids/R4_Galactic.webp",
  "R5:Default": "/assets/droids/R5_Default.webp",
  "R5:Gold": "/assets/droids/R5_Gold.webp",
  "R5:Diamond": "/assets/droids/R5_Diamond.webp",
  "R5:Rainbow": "/assets/droids/R5_Rainbow.webp",
  "R5:Beskar": "/assets/droids/R5_Beskar.webp",
  "R5:Galactic": "/assets/droids/R5_Galactic.webp",
  "R6:Default": "/assets/droids/R6_Default.webp",
  "R6:Gold": "/assets/droids/R6_Gold.webp",
  "R6:Diamond": "/assets/droids/R6_Diamond.webp",
  "R6:Rainbow": "/assets/droids/R6_Rainbow.webp",
  "R6:Beskar": "/assets/droids/R6_Beskar.webp",
  "R6:Galactic": "/assets/droids/R6_Galactic.webp",
  "R7:Default": "/assets/droids/R7_Default.webp",
  "R7:Gold": "/assets/droids/R7_Gold.webp",
  "R7:Diamond": "/assets/droids/R7_Diamond.webp",
  "R7:Rainbow": "/assets/droids/R7_Rainbow.webp",
  "R7:Beskar": "/assets/droids/R7_Beskar.webp",
  "R7:Galactic": "/assets/droids/R7_Galactic.webp",
  "R8:Default": "/assets/droids/R8_Default.webp",
  "R8:Gold": "/assets/droids/R8_Gold.webp",
  "R8:Diamond": "/assets/droids/R8_Diamond.webp",
  "R8:Rainbow": "/assets/droids/R8_Rainbow.webp",
  "R8:Beskar": "/assets/droids/R8_Beskar.webp",
  "R8:Galactic": "/assets/droids/R8_Galactic.webp",
  "R9:Default": "/assets/droids/R9_Default.webp",
  "R9:Gold": "/assets/droids/R9_Gold.webp",
  "R9:Diamond": "/assets/droids/R9_Diamond.webp",
  "R9:Rainbow": "/assets/droids/R9_Rainbow.webp",
  "R9:Beskar": "/assets/droids/R9_Beskar.webp",
  "R9:Galactic": "/assets/droids/R9_Galactic.webp",
  "RIC:Default": "/assets/droids/RIC_Default.png",
  "RIC:Gold": "/assets/droids/RIC_Gold.png",
  "RIC:Diamond": "/assets/droids/RIC_Diamond.png",
  "RIC:Rainbow": "/assets/droids/RIC_Rainbow.png",
  "RIC:Beskar": "/assets/droids/RIC_Beskar.png",
  "RIC1200:Default": "/assets/droids/RIC-1200_Default.png",
  "RIC1200:Gold": "/assets/droids/RIC-1200_Gold.png",
  "RIC1200:Diamond": "/assets/droids/RIC-1200_Diamond.png",
  "RIC1200:Rainbow": "/assets/droids/RIC-1200_Rainbow.png",
  "RIC1200:Beskar": "/assets/droids/RIC-1200_Beskar.png",
  "ROLLR:Default": "/assets/droids/ROLLR_Default.webp",
  "ROLLR:Gold": "/assets/droids/ROLLR_Gold.webp",
  "ROLLR:Diamond": "/assets/droids/ROLLR_Diamond.webp",
  "ROLLR:Rainbow": "/assets/droids/ROLLR_Rainbow.webp",
  "ROLLR:Beskar": "/assets/droids/ROLLR_Beskar.webp",
  "ROLLR:Galactic": "/assets/droids/ROLLR_Galactic.webp",
  "SENATEHOVERCAM:Default": "/assets/droids/SENATEHOVERCAM_Default.webp",
  "SENATEHOVERCAM:Gold": "/assets/droids/SENATEHOVERCAM_Gold.webp",
  "SENATEHOVERCAM:Diamond": "/assets/droids/SENATEHOVERCAM_Diamond.webp",
  "SENATEHOVERCAM:Rainbow": "/assets/droids/SENATEHOVERCAM_Rainbow.webp",
  "SENATEHOVERCAM:Beskar": "/assets/droids/SENATEHOVERCAM_Beskar.webp",
  "SENATEHOVERCAM:Galactic": "/assets/droids/SENATEHOVERCAM_Galactic.webp",
  "SENTRI:Default": "/assets/droids/SENTRI_Default.webp",
  "SENTRI:Gold": "/assets/droids/SENTRI_Gold.webp",
  "SENTRI:Diamond": "/assets/droids/SENTRI_Diamond.webp",
  "SENTRI:Rainbow": "/assets/droids/SENTRI_Rainbow.webp",
  "SENTRI:Beskar": "/assets/droids/SENTRI_Beskar.webp",
  "SENTRI:Galactic": "/assets/droids/SENTRI_Galactic.webp",
  "SNOWMOUSE:Default": "/assets/droids/SNOW MOUSE_Default.png",
  "SNOWMOUSE:Gold": "/assets/droids/SNOW MOUSE_Gold.png",
  "SNOWMOUSE:Diamond": "/assets/droids/SNOW MOUSE_Diamond.png",
  "SNOWMOUSE:Rainbow": "/assets/droids/SNOW MOUSE_Rainbow.png",
  "SNOWMOUSE:Beskar": "/assets/droids/SNOW MOUSE_Beskar.png",
  "STRIKEORB:Default": "/assets/droids/STRIKEORB_Default.webp",
  "STRIKEORB:Gold": "/assets/droids/STRIKEORB_Gold.webp",
  "STRIKEORB:Diamond": "/assets/droids/STRIKEORB_Diamond.webp",
  "STRIKEORB:Rainbow": "/assets/droids/STRIKEORB_Rainbow.webp",
  "STRIKEORB:Beskar": "/assets/droids/STRIKEORB_Beskar.webp",
  "STRIKEORB:Galactic": "/assets/droids/STRIKEORB_Galactic.webp",
  "TRAKR:Default": "/assets/droids/TRAKR_Default.webp",
  "TRAKR:Gold": "/assets/droids/TRAKR_Gold.webp",
  "TRAKR:Diamond": "/assets/droids/TRAKR_Diamond.webp",
  "TRAKR:Rainbow": "/assets/droids/TRAKR_Rainbow.webp",
  "TRAKR:Beskar": "/assets/droids/TRAKR_Beskar.webp",
  "TRAKR:Galactic": "/assets/droids/TRAKR_Galactic.webp",
  "TRITEK:Default": "/assets/droids/TRI-TEK_Default.png",
  "TRITEK:Gold": "/assets/droids/TRI-TEK_Gold.png",
  "TRITEK:Diamond": "/assets/droids/TRI-TEK_Diamond.png",
  "TRITEK:Rainbow": "/assets/droids/TRI-TEK_Rainbow.png",
  "TRITEK:Beskar": "/assets/droids/TRI-TEK_Beskar.png",
  "UTILTEC:Default": "/assets/droids/UTILTEC_Default.webp",
  "UTILTEC:Gold": "/assets/droids/UTILTEC_Gold.webp",
  "UTILTEC:Diamond": "/assets/droids/UTILTEC_Diamond.webp",
  "UTILTEC:Rainbow": "/assets/droids/UTILTEC_Rainbow.webp",
  "UTILTEC:Beskar": "/assets/droids/UTILTEC_Beskar.webp",
  "UTILTEC:Galactic": "/assets/droids/UTILTEC_Galactic.webp",
  "VECTARM:Default": "/assets/droids/VECTARM_Default.webp",
  "VECTARM:Gold": "/assets/droids/VECTARM_Gold.webp",
  "VECTARM:Diamond": "/assets/droids/VECTARM_Diamond.webp",
  "VECTARM:Rainbow": "/assets/droids/VECTARM_Rainbow.webp",
  "VECTARM:Beskar": "/assets/droids/VECTARM_Beskar.webp",
  "VECTARM:Galactic": "/assets/droids/VECTARM_Galactic.webp",
  "C3PO:Default": "/assets/droids/C3PO_Default.webp",
  "C3PO:Iconic": "/assets/droids/C3PO_Iconic.webp",
  "CHOPPER:Default": "/assets/Chopper.png",
  "CHOPPER:Iconic": "/assets/Chopper.png"
};

const getDroidImageUrl = (droidName: string, tier: number): string | null => {
  const normName = droidImageKeyMap[droidName] || droidName.toUpperCase().replace(/[^A-Z0-9]/g, '');
  const tierNameMap: Record<number, string> = {
    1: 'Default',
    2: 'Gold',
    3: 'Diamond',
    4: 'Rainbow',
    5: 'Beskar',
    6: 'Galactic',
    7: 'Stellar'
  };
  const tierName = tierNameMap[tier] || 'Default';

  const isIconic = droidsData.find(d => d.name === droidName)?.rarity === 'ICONICO';
  let lookupKey = `${normName}:${tierName}`;
  if (isIconic) {
    if (droidImageMap[`${normName}:Iconic`]) {
      lookupKey = `${normName}:Iconic`;
    } else if (droidImageMap[`${normName}:Default`]) {
      lookupKey = `${normName}:Default`;
    }
  }

  const path = droidImageMap[lookupKey] || droidImageMap[`${normName}:Default`];
  if (path) {
    return `.${path}`;
  }
  return null;
};

const rebirthRequirementsCycle1: RebirthRequirement[] = [
  { level: 1, credits: "10 K", droids: [{ name: "CB", tier: 1 }, { name: "Pit", tier: 1 }, { name: "DRK-1 Probe", tier: 1 }] },
  { level: 2, credits: "150 K", droids: [{ name: "BDX Explorer", tier: 1 }, { name: "2BB", tier: 1 }, { name: "Bal-Core", tier: 1 }] },
  { level: 3, credits: "975 K", droids: [{ name: "A-LT", tier: 1 }, { name: "BU-4D", tier: 1 }, { name: "R9", tier: 2 }] },
  { level: 4, credits: "2.95 M", droids: [{ name: "ARG", tier: 2 }, { name: "B1 Security", tier: 2 }, { name: "Groundmech", tier: 1 }] },
  { level: 5, credits: "5.35 M", droids: [{ name: "BU-4D", tier: 2 }, { name: "HOV-R", tier: 2 }, { name: "R9", tier: 3 }] },
  { level: 6, credits: "9.85 M", droids: [{ name: "A-LT", tier: 3 }, { name: "ARG", tier: 3 }, { name: "Groundmech", tier: 2 }] },
  { level: 7, credits: "14.5 M", droids: [{ name: "BU-4D", tier: 3 }, { name: "B1 Security", tier: 3 }, { name: "BB", tier: 2 }] },
  { level: 8, credits: "36 M", droids: [{ name: "HOV-R", tier: 3 }, { name: "LO", tier: 2 }, { name: "Util-Tec", tier: 2 }] },
  { level: 9, credits: "89 M", droids: [{ name: "Trak-R", tier: 2 }, { name: "R6", tier: 2 }, { name: "Groundmech", tier: 4 }] },
  { level: 10, credits: "220 M", droids: [{ name: "Strike-Orb", tier: 2 }, { name: "Haul-R", tier: 4 }, { name: "LO", tier: 4 }] },
  { level: 11, credits: "550 M", droids: [{ name: "AMP Walker", tier: 4 }, { name: "B1 Heavy", tier: 4 }, { name: "BB-9", tier: 1 }] },
  { level: 12, credits: "1.36 B", droids: [{ name: "Proto-Roller", tier: 2 }, { name: "Mecha-Droid", tier: 1 }, { name: "MONO-WLKR", tier: 1 }] },
  { level: 13, credits: "3.4 B", droids: [{ name: "R7", tier: 1 }, { name: "Cyclo-Grav", tier: 1 }, { name: "B2-RP", tier: 1 }] },
  { level: 14, credits: "8.45 B", droids: [{ name: "Opti-STRK", tier: 1 }, { name: "MONO-WLKR", tier: 2 }, { name: "Mecha-Droid", tier: 2 }] },
  { level: 15, credits: "21 B", droids: [{ name: "B2-RP", tier: 2 }, { name: "BB-9", tier: 2 }, { name: "R7", tier: 2 }] },
  { level: 16, credits: "52 B", droids: [{ name: "Opti-STRK", tier: 2 }, { name: "MONO-WLKR", tier: 3 }, { name: "Proto-Roller", tier: 3 }] },
  { level: 17, credits: "130 B", droids: [{ name: "B2-RP", tier: 3 }, { name: "Cyclo-Grav", tier: 3 }, { name: "Mecha-Droid", tier: 3 }] },
  { level: 18, credits: "325 B", droids: [{ name: "BB-9", tier: 3 }, { name: "R7", tier: 3 }, { name: "MONO-WLKR", tier: 4 }] },
  { level: 19, credits: "810 B", droids: [{ name: "B2-RP", tier: 4 }, { name: "Cyclo-Grav", tier: 4 }, { name: "Proto-Roller", tier: 4 }] },
  { level: 20, credits: "2 T", droids: [{ name: "R7", tier: 4 }, { name: "Opti-STRK", tier: 4 }, { name: "Mecha-Droid", tier: 4 }] },
  { level: 21, credits: "3 T", droids: [{ name: "BB", tier: 5 }, { name: "Orb-Walker", tier: 5 }, { name: "Groundmech", tier: 5 }] },
  { level: 22, credits: "4.5 T", droids: [{ name: "AMP Walker", tier: 5 }, { name: "B1 Heavy", tier: 5 }, { name: "Proto-Roller", tier: 5 }] },
  { level: 23, credits: "6 T", droids: [{ name: "Opti-STRK", tier: 5 }, { name: "MONO-WLKR", tier: 5 }, { name: "R7", tier: 5 }] },
  { level: 24, credits: "9 T", droids: [{ name: "BB-9", tier: 5 }, { name: "Cyclo-Grav", tier: 5 }, { name: "MO-TRAK", tier: 1 }] },
  { level: 25, credits: "13.5 T", droids: [{ name: "B2-RP", tier: 5 }, { name: "IG", tier: 1 }, { name: "DRFT-R", tier: 2 }] },
  { level: 26, credits: "21 T", droids: [{ name: "CYCLENS", tier: 2 }, { name: "LOADLIFTER", tier: 3 }, { name: "RIC-1200", tier: 4 }] },
  { level: 27, credits: "32 T", droids: [{ name: "KX", tier: 3 }, { name: "TRI-TEK", tier: 4 }, { name: "SNOW MOUSE", tier: 5 }] },
  { level: 28, credits: "45 T", droids: [{ name: "Proto-Roller", tier: 6 }, { name: "MO-TRAK", tier: 4 }, { name: "DRFT-R", tier: 5 }] },
  { level: 29, credits: "68 T", droids: [{ name: "MONO-WLKR", tier: 6 }, { name: "Mecha-Droid", tier: 6 }, { name: "IG", tier: 5 }] },
  { level: 30, credits: "100 T", droids: [{ name: "B2-RP", tier: 6 }, { name: "CYCLENS", tier: 5 }, { name: "LOADLIFTER", tier: 6 }] }
];

const rebirthRequirementsCycle2: RebirthRequirement[] = [
  { level: 1, credits: "10 K", droids: [{ name: "ID-10", tier: 1 }, { name: "Mouse", tier: 1 }, { name: "Gonk", tier: 1 }] },
  { level: 2, credits: "150 K", droids: [{ name: "Roll-R", tier: 1 }, { name: "Senate Hovercam", tier: 1 }, { name: "NAV-EX", tier: 1 }] },
  { level: 3, credits: "975 K", droids: [{ name: "R4", tier: 1 }, { name: "Vect-Arm", tier: 1 }, { name: "BDX Explorer", tier: 2 }] },
  { level: 4, credits: "2.95 M", droids: [{ name: "2BB", tier: 2 }, { name: "Bal-Core", tier: 2 }, { name: "Orb-Walker", tier: 1 }] },
  { level: 5, credits: "5.35 M", droids: [{ name: "R4", tier: 2 }, { name: "Vect-Arm", tier: 2 }, { name: "NAV-EX", tier: 2 }] },
  { level: 6, credits: "9.85 M", droids: [{ name: "Gunrunner", tier: 1 }, { name: "2BB", tier: 3 }, { name: "Bal-Core", tier: 3 }] },
  { level: 7, credits: "14.5 M", droids: [{ name: "Roll-R", tier: 3 }, { name: "BDX Explorer", tier: 3 }, { name: "R2", tier: 2 }] },
  { level: 8, credits: "36 M", droids: [{ name: "R4", tier: 3 }, { name: "B2 Super", tier: 2 }, { name: "Gunrunner", tier: 2 }] },
  { level: 9, credits: "89 M", droids: [{ name: "NAV-EX", tier: 4 }, { name: "Strike-Orb", tier: 2 }, { name: "AMP Walker", tier: 2 }] },
  { level: 10, credits: "220 M", droids: [{ name: "Vect-Arm", tier: 4 }, { name: "R2", tier: 3 }, { name: "B2 Super", tier: 3 }] },
  { level: 11, credits: "550 M", droids: [{ name: "Bal-Core", tier: 4 }, { name: "Strike-Orb", tier: 3 }, { name: "B2 Heavy", tier: 3 }] },
  { level: 12, credits: "1.36 B", droids: [{ name: "Orb-Walker", tier: 4 }, { name: "R2", tier: 4 }, { name: "BB-9", tier: 1 }] },
  { level: 13, credits: "3.4 B", droids: [{ name: "B2 Super", tier: 4 }, { name: "Mecha-Droid", tier: 1 }, { name: "Proto-Roller", tier: 1 }] },
  { level: 14, credits: "8.45 B", droids: [{ name: "B2 Heavy", tier: 4 }, { name: "B2-RP", tier: 1 }, { name: "R7", tier: 2 }] },
  { level: 15, credits: "21 B", droids: [{ name: "Strike-Orb", tier: 4 }, { name: "BB-9", tier: 2 }, { name: "Proto-Roller", tier: 2 }] },
  { level: 16, credits: "52 B", droids: [{ name: "AMP Walker", tier: 4 }, { name: "Mecha-Droid", tier: 2 }, { name: "B2-RP", tier: 3 }] },
  { level: 17, credits: "130 B", droids: [{ name: "Opti-Pod", tier: 4 }, { name: "MONO-WLKR", tier: 2 }, { name: "B2-RP", tier: 3 }] },
  { level: 18, credits: "325 B", droids: [{ name: "Util-Tec", tier: 4 }, { name: "BB-9", tier: 3 }, { name: "Proto-Roller", tier: 3 }] },
  { level: 19, credits: "810 B", droids: [{ name: "Mecha-Droid", tier: 3 }, { name: "R7", tier: 4 }, { name: "B2-RP", tier: 4 }] },
  { level: 20, credits: "2 T", droids: [{ name: "MONO-WLKR", tier: 4 }, { name: "Opti-STRK", tier: 4 }, { name: "Cyclo-Grav", tier: 4 }] },
  { level: 21, credits: "3 T", droids: [{ name: "LO", tier: 5 }, { name: "R6", tier: 5 }, { name: "Haul-R", tier: 5 }] },
  { level: 22, credits: "4.5 T", droids: [{ name: "Sen-Tri", tier: 5 }, { name: "Strike-Orb", tier: 5 }, { name: "Proto-Roller", tier: 5 }] },
  { level: 23, credits: "6 T", droids: [{ name: "BB-9", tier: 5 }, { name: "Cyclo-Grav", tier: 5 }, { name: "B2-RP", tier: 5 }] },
  { level: 24, credits: "9 T", droids: [{ name: "Opti-STRK", tier: 5 }, { name: "B2-RP", tier: 5 }, { name: "SNOW MOUSE", tier: 1 }] },
  { level: 25, credits: "13.5 T", droids: [{ name: "MONO-WLKR", tier: 5 }, { name: "TRI-TEK", tier: 2 }, { name: "RIC-1200", tier: 1 }] },
  { level: 26, credits: "21 T", droids: [{ name: "KX", tier: 2 }, { name: "DRFT-R", tier: 3 }, { name: "IG", tier: 4 }] },
  { level: 27, credits: "32 T", droids: [{ name: "LEP", tier: 3 }, { name: "LOADLIFTER", tier: 4 }, { name: "MO-TRAK", tier: 5 }] },
  { level: 28, credits: "45 T", droids: [{ name: "Mecha-Droid", tier: 6 }, { name: "SNOW MOUSE", tier: 4 }, { name: "TRI-TEK", tier: 5 }] },
  { level: 29, credits: "68 T", droids: [{ name: "Cyclo-Grav", tier: 6 }, { name: "R7", tier: 6 }, { name: "RIC", tier: 5 }] },
  { level: 30, credits: "100 T", droids: [{ name: "Opti-STRK", tier: 6 }, { name: "KX", tier: 5 }, { name: "DRFT-R", tier: 6 }] }
];

const rebirthRequirementsCycle3: RebirthRequirement[] = [
  { level: 1, credits: "10 K", droids: [{ name: "Mouse", tier: 1 }, { name: "Pit", tier: 1 }, { name: "Gonk", tier: 1 }] },
  { level: 2, credits: "150 K", droids: [{ name: "R3", tier: 1 }, { name: "2BB", tier: 1 }, { name: "Senate Hovercam", tier: 1 }] },
  { level: 3, credits: "975 K", droids: [{ name: "R8", tier: 1 }, { name: "R5", tier: 1 }, { name: "R9", tier: 2 }] },
  { level: 4, credits: "2.95 M", droids: [{ name: "R3", tier: 2 }, { name: "B1 Battle", tier: 1 }, { name: "B1 Security", tier: 1 }] },
  { level: 5, credits: "5.35 M", droids: [{ name: "R5", tier: 3 }, { name: "2BB", tier: 1 }, { name: "Senate Hovercam", tier: 1 }] },
  { level: 6, credits: "9.85 M", droids: [{ name: "R8", tier: 3 }, { name: "R9", tier: 3 }, { name: "B1 Battle", tier: 3 }] },
  { level: 7, credits: "14.5 M", droids: [{ name: "R8", tier: 1 }, { name: "B1 Battle", tier: 1 }, { name: "R9", tier: 1 }] },
  { level: 8, credits: "36 M", droids: [{ name: "R3", tier: 4 }, { name: "2BB", tier: 4 }, { name: "B1 Security", tier: 4 }] },
  { level: 9, credits: "89 M", droids: [{ name: "R5", tier: 4 }, { name: "R4", tier: 4 }, { name: "BDX Explorer", tier: 4 }] },
  { level: 10, credits: "220 M", droids: [{ name: "Senate Hovercam", tier: 4 }, { name: "Groundmech", tier: 1 }, { name: "Trak-R", tier: 1 }] },
  { level: 11, credits: "550 M", droids: [{ name: "B2 Heavy", tier: 1 }, { name: "B2 Super", tier: 1 }, { name: "Util-Tec", tier: 1 }] },
  { level: 12, credits: "1.36 B", droids: [{ name: "Bal-Core", tier: 4 }, { name: "Groundmech", tier: 2 }, { name: "Trak-R", tier: 2 }] },
  { level: 13, credits: "3.4 B", droids: [{ name: "B2 Super", tier: 4 }, { name: "Mecha-Droid", tier: 1 }, { name: "Proto-Roller", tier: 1 }] },
  { level: 14, credits: "8.45 B", droids: [{ name: "B2 Heavy", tier: 4 }, { name: "B2-RP", tier: 1 }, { name: "R7", tier: 1 }] },
  { level: 15, credits: "21 B", droids: [{ name: "Strike-Orb", tier: 4 }, { name: "BB-9", tier: 2 }, { name: "Proto-Roller", tier: 2 }] },
  { level: 16, credits: "52 B", droids: [{ name: "AMP Walker", tier: 4 }, { name: "Mecha-Droid", tier: 1 }, { name: "B2-RP", tier: 1 }] },
  { level: 17, credits: "130 B", droids: [{ name: "Opti-Pod", tier: 4 }, { name: "MONO-WLKR", tier: 1 }, { name: "R7", tier: 1 }] },
  { level: 18, credits: "325 B", droids: [{ name: "Util-Tec", tier: 4 }, { name: "BB-9", tier: 3 }, { name: "Proto-Roller", tier: 3 }] },
  { level: 19, credits: "810 B", droids: [{ name: "Mecha-Droid", tier: 3 }, { name: "R7", tier: 4 }, { name: "B2-RP", tier: 4 }] },
  { level: 20, credits: "2 T", droids: [{ name: "MONO-WLKR", tier: 4 }, { name: "Opti-STRK", tier: 4 }, { name: "Cyclo-Grav", tier: 4 }] },
  { level: 21, credits: "3 T", droids: [{ name: "B2 Super", tier: 5 }, { name: "Opti-Pod", tier: 5 }, { name: "R2", tier: 5 }] },
  { level: 22, credits: "4.5 T", droids: [{ name: "Gunrunner", tier: 5 }, { name: "LNG-Shot", tier: 5 }, { name: "B2-RP", tier: 5 }] },
  { level: 23, credits: "6 T", droids: [{ name: "MONO-WLKR", tier: 5 }, { name: "Cyclo-Grav", tier: 5 }, { name: "Mecha-Droid", tier: 5 }] },
  { level: 24, credits: "9 T", droids: [{ name: "BB-9", tier: 5 }, { name: "B2-RP", tier: 5 }, { name: "RIC", tier: 1 }] },
  { level: 25, credits: "13.5 T", droids: [{ name: "Proto-Roller", tier: 5 }, { name: "LOADLIFTER", tier: 1 }, { name: "MO-TRAK", tier: 1 }] },
  { level: 26, credits: "21 T", droids: [{ name: "LEP", tier: 1 }, { name: "TRI-TEK", tier: 4 }, { name: "SNOW MOUSE", tier: 5 }] },
  { level: 27, credits: "32 T", droids: [{ name: "RIC-1200", tier: 1 }, { name: "IG", tier: 4 }, { name: "DRFT-R", tier: 5 }] },
  { level: 28, credits: "45 T", droids: [{ name: "BB-9", tier: 6 }, { name: "RIC", tier: 4 }, { name: "MO-TRAK", tier: 5 }] },
  { level: 29, credits: "68 T", droids: [{ name: "Mecha-Droid", tier: 6 }, { name: "Opti-STRK", tier: 6 }, { name: "IG", tier: 5 }] },
  { level: 30, credits: "100 T", droids: [{ name: "R7", tier: 6 }, { name: "LEP", tier: 5 }, { name: "DRFT-R", tier: 6 }] }
];

const rebirthRequirementsCycle4: RebirthRequirement[] = [
  { level: 1, credits: "10 K", droids: [{ name: "ID-10", tier: 1 }, { name: "Pit", tier: 1 }, { name: "DRK-1 Probe", tier: 1 }] },
  { level: 2, credits: "150 K", droids: [{ name: "R3", tier: 1 }, { name: "2BB", tier: 1 }, { name: "Senate Hovercam", tier: 1 }] },
  { level: 3, credits: "975 K", droids: [{ name: "R5", tier: 2 }, { name: "R8", tier: 2 }, { name: "R4", tier: 1 }] },
  { level: 4, credits: "2.95 M", droids: [{ name: "B1 Battle", tier: 2 }, { name: "R9", tier: 2 }, { name: "B1 Security", tier: 2 }] },
  { level: 5, credits: "5.35 M", droids: [{ name: "R3", tier: 2 }, { name: "2BB", tier: 1 }, { name: "Senate Hovercam", tier: 1 }] },
  { level: 6, credits: "9.85 M", droids: [{ name: "R5", tier: 3 }, { name: "R4", tier: 3 }, { name: "BDX Explorer", tier: 3 }] },
  { level: 7, credits: "14.5 M", droids: [{ name: "R8", tier: 3 }, { name: "B1 Battle", tier: 3 }, { name: "R9", tier: 3 }] },
  { level: 8, credits: "36 M", droids: [{ name: "R3", tier: 4 }, { name: "B1 Security", tier: 4 }, { name: "2BB", tier: 4 }] },
  { level: 9, credits: "89 M", droids: [{ name: "R5", tier: 4 }, { name: "R4", tier: 4 }, { name: "BDX Explorer", tier: 4 }] },
  { level: 10, credits: "220 M", droids: [{ name: "Senate Hovercam", tier: 4 }, { name: "Groundmech", tier: 1 }, { name: "Trak-R", tier: 1 }] },
  { level: 11, credits: "550 M", droids: [{ name: "B2 Heavy", tier: 1 }, { name: "B2 Super", tier: 1 }, { name: "Util-Tec", tier: 1 }] },
  { level: 12, credits: "1.36 B", droids: [{ name: "Bal-Core", tier: 4 }, { name: "Groundmech", tier: 2 }, { name: "Trak-R", tier: 2 }] },
  { level: 13, credits: "3.4 B", droids: [{ name: "B2 Super", tier: 4 }, { name: "Mecha-Droid", tier: 1 }, { name: "Proto-Roller", tier: 1 }] },
  { level: 14, credits: "8.45 B", droids: [{ name: "Bal-Core", tier: 3 }, { name: "Groundmech", tier: 3 }, { name: "Trak-R", tier: 4 }] },
  { level: 15, credits: "21 B", droids: [{ name: "B2 Heavy", tier: 3 }, { name: "B2 Super", tier: 4 }, { name: "B2-RP", tier: 1 }] },
  { level: 16, credits: "52 B", droids: [{ name: "Util-Tec", tier: 4 }, { name: "BB-9", tier: 1 }, { name: "R7", tier: 2 }] },
  { level: 17, credits: "130 B", droids: [{ name: "Opti-STRK", tier: 1 }, { name: "Cyclo-Grav", tier: 2 }, { name: "Mecha-Droid", tier: 2 }] },
  { level: 18, credits: "325 B", droids: [{ name: "B2-RP", tier: 2 }, { name: "BB-9", tier: 3 }, { name: "R7", tier: 3 }] },
  { level: 19, credits: "810 B", droids: [{ name: "Mecha-Droid", tier: 3 }, { name: "R7", tier: 4 }, { name: "B2-RP", tier: 4 }] },
  { level: 20, credits: "2 T", droids: [{ name: "MONO-WLKR", tier: 4 }, { name: "Opti-STRK", tier: 4 }, { name: "Cyclo-Grav", tier: 4 }] },
  { level: 21, credits: "3 T", droids: [{ name: "AMP Walker", tier: 5 }, { name: "Groundmech", tier: 5 }, { name: "Haul-R", tier: 5 }] },
  { level: 22, credits: "4.5 T", droids: [{ name: "Gunrunner", tier: 5 }, { name: "Strike-Orb", tier: 5 }, { name: "B2 Super", tier: 5 }] },
  { level: 23, credits: "6 T", droids: [{ name: "MONO-WLKR", tier: 5 }, { name: "Cyclo-Grav", tier: 5 }, { name: "B2-RP", tier: 5 }] },
  { level: 24, credits: "9 T", droids: [{ name: "Mecha-Droid", tier: 5 }, { name: "Proto-Roller", tier: 5 }, { name: "MO-TRAK", tier: 1 }] },
  { level: 25, credits: "13.5 T", droids: [{ name: "Opti-STRK", tier: 5 }, { name: "TRI-TEK", tier: 1 }, { name: "DRFT-R", tier: 2 }] },
  { level: 26, credits: "21 T", droids: [{ name: "CYCLENS", tier: 2 }, { name: "LEP", tier: 3 }, { name: "MO-TRAK", tier: 4 }] },
  { level: 27, credits: "32 T", droids: [{ name: "RIC-1200", tier: 3 }, { name: "SNOW MOUSE", tier: 4 }, { name: "LOADLIFTER", tier: 5 }] },
  { level: 28, credits: "45 T", droids: [{ name: "Opti-STRK", tier: 6 }, { name: "IG", tier: 4 }, { name: "KX", tier: 5 }] },
  { level: 29, credits: "68 T", droids: [{ name: "BB-9", tier: 6 }, { name: "R7", tier: 6 }, { name: "TRI-TEK", tier: 5 }] },
  { level: 30, credits: "100 T", droids: [{ name: "MONO-WLKR", tier: 6 }, { name: "CYCLENS", tier: 5 }, { name: "IG", tier: 6 }] }
];

const tiersConfig = [
  { level: 1, label: 'Base', short: 'BAS' },
  { level: 2, label: 'Oro', short: 'ORO' },
  { level: 3, label: 'Diamante', short: 'DIA' },
  { level: 4, label: 'Arcoíris', short: 'ARC' },
  { level: 5, label: 'Beskar', short: 'BES' },
  { level: 6, label: 'Galáctico', short: 'GAL' },
  { level: 7, label: 'Estelar', short: 'EST' }
];

const getTierName = (tier: number) => {
  switch (tier) {
    case 1: return 'Base';
    case 2: return 'Oro';
    case 3: return 'Diamante';
    case 4: return 'Arcoíris';
    case 5: return 'Beskar';
    case 6: return 'Galáctico';
    case 7: return 'Estelar';
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
    case 7: return 'text-yellow-100 border-yellow-200/40 bg-yellow-200/10';
    default: return 'text-gray-500 border-transparent';
  }
};



interface NovaUpgrade {
  id: string;
  nameKey: string;
  descKey: string;
  category: 'featured' | 'core' | 'workshop' | 'cosmetic' | 'iconic' | 'lobby_boosts';
  maxLevel: number;
  costs: number[];
  icon: React.ComponentType<any>;
}

const novaUpgradesList: NovaUpgrade[] = [
  // Destacado (featured)
  { id: 'critical_chance', nameKey: 'upgrade_critical_chance_name', descKey: 'upgrade_critical_chance_desc', category: 'featured', maxLevel: 10, costs: [90, 120, 150, 180, 210, 240, 270, 300, 330, 360], icon: Target },
  { id: 'critical_amount', nameKey: 'upgrade_critical_amount_name', descKey: 'upgrade_critical_amount_desc', category: 'featured', maxLevel: 10, costs: [90, 150, 210, 270, 330, 390, 450, 510, 570, 630], icon: Swords },
  { id: 'multiple_criticals', nameKey: 'upgrade_multiple_criticals_name', descKey: 'upgrade_multiple_criticals_desc', category: 'featured', maxLevel: 4, costs: [400, 500, 600, 700], icon: Zap },
  { id: 'companion_slot', nameKey: 'upgrade_companion_slot_name', descKey: 'upgrade_companion_slot_desc', category: 'featured', maxLevel: 1, costs: [250], icon: Sparkles },
  { id: 'daily_crystals', nameKey: 'upgrade_daily_crystals_name', descKey: 'upgrade_daily_crystals_desc', category: 'featured', maxLevel: 1, costs: [30], icon: Sparkles },
  { id: 'upgrade_chip_station', nameKey: 'upgrade_upgrade_chip_station_name', descKey: 'upgrade_upgrade_chip_station_desc', category: 'featured', maxLevel: 1, costs: [120], icon: Cpu },

  // Mejoras al núcleo (core)
  { id: 'max_health', nameKey: 'upgrade_max_health_name', descKey: 'upgrade_max_health_desc', category: 'core', maxLevel: 8, costs: [1, 6, 13, 19, 25, 31, 37, 43], icon: Heart },
  { id: 'damage', nameKey: 'upgrade_damage_name', descKey: 'upgrade_damage_desc', category: 'core', maxLevel: 8, costs: [1, 13, 25, 37, 49, 61, 73, 85], icon: Zap },
  { id: 'credits', nameKey: 'upgrade_credits_name', descKey: 'upgrade_credits_desc', category: 'core', maxLevel: 18, costs: [2, 6, 10, 14, 18, 22, 26, 30, 34, 38, 42, 46, 50, 54, 58, 62, 66, 70], icon: Coins },
  { id: 'flawless_charm', nameKey: 'upgrade_flawless_charm_name', descKey: 'upgrade_flawless_charm_desc', category: 'core', maxLevel: 1, costs: [500], icon: Sparkles },
  { id: 'movement_speed', nameKey: 'upgrade_movement_speed_name', descKey: 'upgrade_movement_speed_desc', category: 'core', maxLevel: 18, costs: [1, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34], icon: Zap },
  { id: 'jawa_bartering', nameKey: 'upgrade_jawa_bartering_name', descKey: 'upgrade_jawa_bartering_desc', category: 'core', maxLevel: 5, costs: [5, 15, 30, 45, 60], icon: ShoppingBag },
  { id: 'super_crates', nameKey: 'upgrade_super_crates_name', descKey: 'upgrade_super_crates_desc', category: 'core', maxLevel: 3, costs: [10, 25, 50], icon: Package },
  { id: 'double_quests', nameKey: 'upgrade_double_quests_name', descKey: 'upgrade_double_quests_desc', category: 'core', maxLevel: 1, costs: [75], icon: ListTodo },
  { id: 'pickaxe_mastery', nameKey: 'upgrade_pickaxe_mastery_name', descKey: 'upgrade_pickaxe_mastery_desc', category: 'core', maxLevel: 11, costs: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55], icon: Wrench },

  // Taller (workshop)
  { id: 'lounge_slot', nameKey: 'upgrade_lounge_slot_name', descKey: 'upgrade_lounge_slot_desc', category: 'workshop', maxLevel: 4, costs: [1, 30, 60, 90], icon: Bed },
  { id: 'scrap_value', nameKey: 'upgrade_scrap_value_name', descKey: 'upgrade_scrap_value_desc', category: 'workshop', maxLevel: 13, costs: [25, 55, 85, 115, 145, 175, 205, 235, 265, 295, 325, 355, 385], icon: Trash2 },
  { id: 'crafting_speed', nameKey: 'upgrade_crafting_speed_name', descKey: 'upgrade_crafting_speed_desc', category: 'workshop', maxLevel: 10, costs: [3, 18, 33, 48, 63, 78, 93, 108, 123, 138], icon: Wrench },
  { id: 'blueprint_storage', nameKey: 'upgrade_blueprint_storage_name', descKey: 'upgrade_blueprint_storage_desc', category: 'workshop', maxLevel: 3, costs: [10, 75, 150], icon: Package },
  { id: 'droid_alert', nameKey: 'upgrade_droid_alert_name', descKey: 'upgrade_droid_alert_desc', category: 'workshop', maxLevel: 1, costs: [10], icon: Bell },
  { id: 'chip_scrap', nameKey: 'upgrade_chip_scrap_name', descKey: 'upgrade_chip_scrap_desc', category: 'workshop', maxLevel: 10, costs: [2, 5, 10, 15, 20, 25, 30, 35, 40, 45], icon: Cpu },
  { id: 'blueprint_scrap', nameKey: 'upgrade_blueprint_scrap_name', descKey: 'upgrade_blueprint_scrap_desc', category: 'workshop', maxLevel: 4, costs: [1, 12, 24, 36], icon: Layers },
  { id: 'collect_all', nameKey: 'upgrade_collect_all_name', descKey: 'upgrade_collect_all_desc', category: 'workshop', maxLevel: 3, costs: [3, 25, 100], icon: Inbox },
  { id: 'blueprint_vendor', nameKey: 'upgrade_blueprint_vendor_name', descKey: 'upgrade_blueprint_vendor_desc', category: 'workshop', maxLevel: 1, costs: [10], icon: Store },

  // Contenido estético (cosmetic)
  { id: 'base_paint', nameKey: 'upgrade_base_paint_name', descKey: 'upgrade_base_paint_desc', category: 'cosmetic', maxLevel: 3, costs: [30, 120, 400], icon: Palette },

  // Potenciadores de sala (acumulables) (lobby_boosts)
  { id: 'lobby_luck', nameKey: 'upgrade_lobby_luck_name', descKey: 'upgrade_lobby_luck_desc', category: 'lobby_boosts', maxLevel: 99, costs: [40], icon: Sparkle },
  { id: 'lobby_crafting', nameKey: 'upgrade_lobby_crafting_name', descKey: 'upgrade_lobby_crafting_desc', category: 'lobby_boosts', maxLevel: 99, costs: [30], icon: Wrench },
  { id: 'lobby_rainbow', nameKey: 'upgrade_lobby_rainbow_name', descKey: 'upgrade_lobby_rainbow_desc', category: 'lobby_boosts', maxLevel: 99, costs: [20], icon: Layers },
  { id: 'lobby_beskar', nameKey: 'upgrade_lobby_beskar_name', descKey: 'upgrade_lobby_beskar_desc', category: 'lobby_boosts', maxLevel: 99, costs: [30], icon: Shield },
  { id: 'lobby_galactic', nameKey: 'upgrade_lobby_galactic_name', descKey: 'upgrade_lobby_galactic_desc', category: 'lobby_boosts', maxLevel: 99, costs: [60], icon: Award },

  // Droides icónicos (adquiribles por 1M si se desbloquearon) (iconic)
  { id: 'iconic_bb8', nameKey: 'BB8', descKey: 'upgrade_iconic_desc', category: 'iconic', maxLevel: 1, costs: [30], icon: Sparkles },
  { id: 'iconic_mister_bones', nameKey: 'Mister Bones', descKey: 'upgrade_iconic_desc', category: 'iconic', maxLevel: 1, costs: [30], icon: Sparkles },
  { id: 'iconic_ig11_marshal', nameKey: 'IG-11 Marshal', descKey: 'upgrade_iconic_desc', category: 'iconic', maxLevel: 1, costs: [30], icon: Sparkles },
  { id: 'iconic_cb23', nameKey: 'CB-23', descKey: 'upgrade_iconic_desc', category: 'iconic', maxLevel: 1, costs: [75], icon: Sparkles },
  { id: 'iconic_dj_r3x', nameKey: 'DJ R-3X', descKey: 'upgrade_iconic_desc', category: 'iconic', maxLevel: 1, costs: [30], icon: Sparkles },
  { id: 'iconic_r2d2', nameKey: 'R2-D2', descKey: 'upgrade_iconic_desc', category: 'iconic', maxLevel: 1, costs: [30], icon: Sparkles },
  { id: 'iconic_c3po', nameKey: 'C-3PO', descKey: 'upgrade_iconic_desc', category: 'iconic', maxLevel: 1, costs: [30], icon: Sparkles },
  { id: 'iconic_chopper', nameKey: 'CHOPPER', descKey: 'upgrade_iconic_desc', category: 'iconic', maxLevel: 1, costs: [30], icon: Sparkles }
];

const droidUpgradeCosts: Record<DroidRarity, Record<number, string>> = {
  COMUN: { 1: '10', 2: '25', 3: '40', 4: '80', 5: '120' },
  RARO: { 1: '30', 2: '60', 3: '100', 4: '250', 5: '400' },
  EPICO: { 1: '120', 2: '180', 3: '240', 4: '3,000', 5: '6,000' },
  LEGENDARIO: { 1: '400', 2: '1,200', 3: '3,000', 4: '7,500', 5: '20,000' },
  MITICO: { 1: '4,000', 2: '8,000', 3: '20,000', 4: '40,000', 5: '70,000' },
  ICONICO: {}
};

const droidSellValues: Record<DroidRarity, Record<number, string>> = {
  COMUN: { 2: '4', 3: '7', 4: '10', 5: '13', 6: '15' },
  RARO: { 2: '6', 3: '9', 4: '12', 5: '15', 6: '18' },
  EPICO: { 2: '30', 3: '33', 4: '36', 5: '39', 6: '42' },
  LEGENDARIO: { 2: '84', 3: '87', 4: '90', 5: '93', 6: '96' },
  MITICO: { 2: '192', 3: '195', 4: '198', 5: '201', 6: '204' },
  ICONICO: {}
};

const flawlessRates: Record<number, string> = {
  1: '1/1000',
  2: '1/500',
  3: '1/250',
  4: '1/125',
  5: '1/100',
  6: '1/75'
};

export default function App() {
  const [progress, setProgress] = useState<Record<string, number>>({});
  const [currentRebirth, setCurrentRebirth] = useState<number>(0); // 0 to 30
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
  const [activeShopCategory, setActiveShopCategory] = useState<'featured' | 'core' | 'workshop' | 'cosmetic' | 'iconic' | 'lobby_boosts'>('featured');
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
      case 7: return t('tierName_7');
      default: return t('tierName_Ninguno');
    }
  };

  const localizedTiersConfig = [
    { level: 1, label: t('tierName_1'), short: t('tierShort_1') },
    { level: 2, label: t('tierName_2'), short: t('tierShort_2') },
    { level: 3, label: t('tierName_3'), short: t('tierShort_3') },
    { level: 4, label: t('tierName_4'), short: t('tierShort_4') },
    { level: 5, label: t('tierName_5'), short: t('tierShort_5') },
    { level: 6, label: t('tierName_6'), short: t('tierShort_6') },
    { level: 7, label: t('tierName_7'), short: t('tierShort_7') }
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
      if (parsedRebirth >= 0 && parsedRebirth <= 30) {
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
      iconic_c3po: 'C-3PO',
      iconic_chopper: 'CHOPPER'
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

  const targetLevel = currentRebirth === 0 ? 1 : Math.min(30, currentRebirth);

  const getRequiredTier = (droidName: string): number => {
    let maxRequiredTier = 0;
    rebirthRequirements.forEach(req => {
      if (req.level >= targetLevel) {
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
    const currentReq = rebirthRequirements.find(req => req.level === targetLevel);
    if (!currentReq) return false;
    const d = currentReq.droids.find(dr => dr.name.toLowerCase() === droidName.toLowerCase());
    if (!d) return false;
    const achieved = progress[droidName] || 0;
    return achieved < d.tier;
  };

  const getRebirthStatus = (req: RebirthRequirement) => {
    if (req.level < targetLevel) {
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
    const nextUnmet = reqList.find(r => r.level >= targetLevel && achieved < r.tier);

    if (nextUnmet) {
      const isNeededForCurrent = reqList.some(r => r.level === targetLevel && achieved < r.tier);

      if (isNeededForCurrent) {
        return {
          type: 'upgrade',
          text: t('recUpgrade', { level: nextUnmet.level.toString(), tier: getLocalizedTierName(nextUnmet.tier) })
        };
      } else {
        return {
          type: 'keep_upgrade',
          text: t('recKeepUpgrade', { level: targetLevel.toString(), futureLevel: nextUnmet.level.toString(), tier: getLocalizedTierName(nextUnmet.tier) })
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

  const activeRequirements = rebirthRequirements.filter(req => req.level >= targetLevel);
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
    const currentReq = rebirthRequirements.find(req => req.level === targetLevel);
    if (!currentReq) return false;
    return currentReq.droids.some(dr => dr.name.toLowerCase() === droidName.toLowerCase());
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

  const tierMilestonesConfig: Record<number, { count: number; bonus: number }> = {
    1: { count: 25, bonus: 25 },  // Base: 25 droids -> +25%
    2: { count: 25, bonus: 30 },  // Oro: 25 droids -> +30%
    3: { count: 25, bonus: 35 },  // Diamante: 25 droids -> +35%
    4: { count: 25, bonus: 40 },  // Arcoiris: 25 droids -> +40%
    5: { count: 25, bonus: 60 },  // Beskar: 25 droids -> +60%
    6: { count: 25, bonus: 80 },  // Galactico: 25 droids -> +80%
    7: { count: 25, bonus: 100 }  // Estelar: 25 droids -> +100%
  };

  const getTierObtainedCount = (tier: number): number => {
    let count = 0;
    droidsData.forEach(droid => {
      if (droid.rarity !== 'ICONICO') {
        if (isDroidexObtained(droid.name, tier)) {
          count++;
        }
      } else if (tier === 1) {
        if (isDroidexObtained(droid.name, 1)) {
          count++;
        }
      }
    });
    return count;
  };

  const getTierMilestoneInfo = (tier: number) => {
    const config = tierMilestonesConfig[tier] || { count: 25, bonus: 25 };
    const obtained = getTierObtainedCount(tier);
    const isCompleted = obtained >= config.count;
    const percent = Math.min(100, Math.round((obtained / config.count) * 100));

    return {
      tier,
      obtained,
      needed: config.count,
      bonus: config.bonus,
      isCompleted,
      percent
    };
  };

  const getTotalMilestoneMultiplier = (): number => {
    let total = 0;
    for (let t = 1; t <= 7; t++) {
      const info = getTierMilestoneInfo(t);
      if (info.isCompleted) {
        total += info.bonus;
      }
    }
    return total;
  };

  // Counts for Droidex
  const getDroidexStats = () => {
    let obtainedCount = 0;
    droidsData.forEach(droid => {
      if (droid.rarity !== 'ICONICO') {
        for (let t = 1; t <= 7; t++) {
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
    const tierMultiplier = getTotalMilestoneMultiplier();
    const creditMultiplier = tierMultiplier + (flawlessCount * 0.01);

    return {
      obtainedCount,
      totalCount: 442,
      flawlessCount,
      totalFlawless: 62,
      tierMultiplier,
      creditMultiplier
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
          case 'CHOPPER': return 'Habilidad: +15% de ingresos de Créditos y bonificación de velocidad.';
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
          case 'CHOPPER': return 'Habilidade: +15% de renda de Créditos e bônus de velocidade.';
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
          case 'CHOPPER': return 'Ability: +15% Credit income and speed bonus.';
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
      case 6: tierBase = 500; break;
      case 7: tierBase = 800; break;
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

  const renderDroidModel = (droid: Droid, tier: number, isObtained: boolean = true) => {
    const imageUrl = getDroidImageUrl(droid.name, tier);

    let glowColor = 'text-slate-400';
    let pulseClass = 'animate-pulse';

    switch (tier) {
      case 1: glowColor = 'text-slate-400'; break;
      case 2: glowColor = 'text-yellow-400'; break;
      case 3: glowColor = 'text-cyan-400'; break;
      case 4: glowColor = 'text-pink-400'; break;
      case 5: glowColor = 'text-purple-400'; break;
      case 6: glowColor = 'text-indigo-400'; break;
      case 7: glowColor = 'text-yellow-200'; break;
      default: glowColor = 'text-slate-400';
    }

    if (droid.rarity === 'ICONICO') {
      glowColor = 'text-fuchsia-400';
    }

    const imgClass = isObtained
      ? "max-w-full max-h-full object-contain filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] transition-all duration-200"
      : "max-w-full max-h-full object-contain filter grayscale contrast-125 opacity-30 transition-all duration-200";

    return (
      <div className="relative w-full h-full flex items-center justify-center p-0.5">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={droid.name}
            loading="lazy"
            className={imgClass}
            onError={(e) => {
              (e.currentTarget as HTMLElement).style.display = 'none';
              const svgEl = e.currentTarget.nextElementSibling as HTMLElement;
              if (svgEl) svgEl.style.display = 'block';
            }}
          />
        ) : null}
        <svg
          className={`w-full h-full ${glowColor} ${pulseClass} ${isObtained ? 'opacity-90' : 'opacity-30'}`}
          style={{ display: imageUrl ? 'none' : 'block' }}
          viewBox="0 0 100 100"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
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
        {!isObtained && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="w-5 h-5 rounded-full bg-slate-900/80 border border-slate-700/80 text-slate-400 font-bold text-[10px] flex items-center justify-center shadow-inner">
              ?
            </span>
          </div>
        )}
      </div>
    );
  };

  if (!isLoaded) return null;

  const stats = getDroidexStats();
  const activeTierMilestone = getTierMilestoneInfo(activeDroidexTier);

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

  const targetReq = rebirthRequirements.find(r => r.level === targetLevel);
  const isTargetReqMet = targetReq ? getRebirthStatus(targetReq) === 'ready' : false;

  return (
    <div className="min-h-screen bg-[#050810] text-[#e2e8f0] font-sans antialiased p-3 pb-8 space-y-4">
      <div className="max-w-6xl mx-auto space-y-3">

        {/* Navigation Tabs */}
        <div className="flex bg-[#0c1628] border border-[#1e2d4a] p-1.5 rounded-xl shadow-lg gap-1.5">
          <button
            onClick={() => saveActiveTab('tracker')}
            className={`flex-1 py-2.5 text-xs font-bold font-narrow rounded-lg transition-all text-center cursor-pointer flex items-center justify-center gap-1.5 ${activeTab === 'tracker'
                ? 'bg-institutional-primary text-white shadow-[0_0_12px_rgba(23,71,157,0.4)] border border-[#00adee]/40 font-extrabold'
                : 'text-slate-300 hover:text-white hover:bg-[#13223d]'
              }`}
          >
            <Target size={15} />
            <span>{t('navTracker')}</span>
          </button>
          <button
            onClick={() => saveActiveTab('droidex')}
            className={`flex-1 py-2.5 text-xs font-bold font-narrow rounded-lg transition-all text-center cursor-pointer flex items-center justify-center gap-1.5 ${activeTab === 'droidex'
                ? 'bg-institutional-primary text-white shadow-[0_0_12px_rgba(23,71,157,0.4)] border border-[#00adee]/40 font-extrabold'
                : 'text-slate-300 hover:text-white hover:bg-[#13223d]'
              }`}
          >
            <Award size={15} />
            <span>{t('navDroidex')}</span>
          </button>
          <button
            onClick={() => saveActiveTab('novashop')}
            className={`flex-1 py-2.5 text-xs font-bold font-narrow rounded-lg transition-all text-center cursor-pointer flex items-center justify-center gap-1.5 ${activeTab === 'novashop'
                ? 'bg-institutional-primary text-white shadow-[0_0_12px_rgba(23,71,157,0.4)] border border-[#00adee]/40 font-extrabold'
                : 'text-slate-300 hover:text-white hover:bg-[#13223d]'
              }`}
          >
            <Sparkles size={15} />
            <span>{t('navNovaShop')}</span>
          </button>
        </div>

        {activeTab === 'tracker' && (
          <>
            {/* Cabecera y Controles Principales */}
            <header className="bg-[#0c1628] border border-[#1e2d4a] p-4 rounded-xl shadow-lg flex flex-col gap-3.5">

              {/* Fila 1: Título y Controles */}
              <div className="flex justify-between items-center gap-2">
                <h1 className="text-lg font-bold text-white font-narrow flex items-center gap-2 flex-wrap">
                  <span className="text-[#00adee]">{t('title')}</span>
                  <div className="relative inline-flex items-center">
                    <select
                      value={currentCycle}
                      onChange={(e) => saveCycle(parseInt(e.target.value, 10))}
                      className="bg-[#0f172a] text-[#00adee] border border-[#1e2d4a] px-2 py-0.5 rounded text-xs uppercase font-bold tracking-wider cursor-pointer outline-none hover:bg-[#13223d] transition-colors"
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
                      className="bg-[#0f172a] text-[#00adee] border border-[#1e2d4a] px-2 py-0.5 rounded text-xs font-bold cursor-pointer outline-none hover:bg-[#13223d] transition-colors uppercase"
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
                      className="flex items-center gap-1 px-2.5 py-1 text-xs bg-purple-800 hover:bg-purple-700 text-white rounded-lg border border-purple-500/40 shadow-[0_0_10px_rgba(147,51,234,0.3)] transition-all cursor-pointer font-bold"
                    >
                      <Sparkles size={12} /> <span>{t('superRebirth')} (+{getNovaCrystals(currentRebirth)})</span>
                    </button>
                  ) : (
                    <button
                      disabled
                      className="flex items-center gap-1 px-2.5 py-1 text-xs bg-purple-950/40 border border-purple-900/50 text-purple-300/50 rounded-lg cursor-not-allowed font-bold"
                      title={t('superRebirthTooltip')}
                    >
                      <Lock size={12} /> <span>{t('superRebirth')} (R-12)</span>
                    </button>
                  )}

                  {/* Botón Reiniciar */}
                  <button
                    onClick={() => setShowResetModal(true)}
                    className="flex items-center gap-1 px-2.5 py-1 text-xs text-red-400 hover:text-red-300 hover:bg-red-950/40 rounded-lg border border-red-800/40 transition-colors cursor-pointer font-bold"
                  >
                    <RotateCcw size={12} /> <span>{t('reiniciar')}</span>
                  </button>
                </div>
              </div>

              {/* Fila 2: Selector Rebirth Horizontal Deslizable */}
              <div className="bg-[#091120] py-2.5 px-3 rounded-xl border border-[#1e2d4a] flex flex-col gap-1.5">
                <div className="flex justify-between items-center text-xs text-slate-300">
                  <span className="font-bold flex items-center gap-1.5">
                    <Target size={14} className="text-[#00adee]" />
                    {t('slideRebirth')}
                  </span>
                  <span>{t('rebirthLabel')} <strong className="text-[#00adee] font-extrabold">R-{targetLevel}</strong></span>
                </div>
                <div ref={sliderRef} className="flex gap-1.5 overflow-x-auto pb-1.5 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
                  {Array.from({ length: 31 }, (_, i) => {
                    const lvl = i;
                    const isActive = lvl === currentRebirth;

                    let btnClass = "h-8 w-8 text-xs font-bold rounded-full flex items-center justify-center transition-all duration-100 select-none cursor-pointer flex-shrink-0 ";
                    if (isActive) {
                      btnClass += "bg-[#17479d] text-white border-2 border-[#00adee] font-extrabold shadow-[0_0_10px_rgba(0,173,238,0.4)]";
                    } else {
                      btnClass += "bg-[#050810] border border-[#1e2d4a] text-slate-300 hover:border-slate-500 hover:text-white";
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

              {/* Fila 3: Requisitos de Rebirth Seleccionado */}
              <div className="bg-[#091120] border border-[#1e2d4a] rounded-xl p-3.5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs shadow-md">
                {targetReq ? (
                  <>
                    <div className="space-y-2 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="bg-[#00adee]/20 text-[#00adee] border border-[#00adee]/40 px-2 py-0.5 rounded text-[10px] font-bold">
                          {t('nextMeta')}
                        </span>
                        <span className="text-sm font-extrabold text-white font-narrow">
                          {t('requirementsForRebirth', { level: targetLevel.toString() })}
                        </span>
                        <span className="text-amber-300 font-bold bg-amber-950/40 border border-amber-500/30 px-2 py-0.5 rounded flex items-center gap-1 font-mono">
                          <Coins size={12} />
                          {formatCredits(targetReq.credits)}
                        </span>
                      </div>

                      {/* Requisitos droids */}
                      <div className="flex flex-wrap gap-1.5">
                        {targetReq.droids.map((reqDroid, index) => {
                          const achieved = progress[reqDroid.name] || 0;
                          const isMet = achieved >= reqDroid.tier;

                          return (
                            <span
                              key={index}
                              className={`px-2 py-1 rounded text-xs border flex items-center gap-1.5 ${isMet
                                  ? 'bg-emerald-950/50 border border-emerald-500/40 text-emerald-300 font-bold'
                                  : 'bg-[#0f172a] border border-[#1e2d4a] text-slate-200'
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

                    {isTargetReqMet && (
                      <button
                        onClick={() => saveRebirth(Math.min(30, targetLevel + 1))}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg px-4 py-2 text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer w-full sm:w-auto shrink-0 shadow-md"
                      >
                        <span>{t('rebirthReady')}</span>
                        <ArrowRight size={12} />
                      </button>
                    )}
                  </>
                ) : (
                  <span className="text-emerald-400 font-bold flex items-center gap-2 py-1 text-sm">
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
                  <Search size={15} />
                </span>
                <input
                  type="text"
                  value={trackerSearch}
                  onChange={(e) => setTrackerSearch(e.target.value)}
                  placeholder={t('searchPlaceholder')}
                  className="w-full bg-[#0c1628] border border-[#1e2d4a] focus:border-[#00adee] pl-9 pr-9 py-2 rounded-xl text-xs text-white placeholder-slate-400 outline-none transition-colors shadow-inner"
                />
                {trackerSearch && (
                  <button
                    onClick={() => setTrackerSearch('')}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-white cursor-pointer"
                  >
                    <X size={15} />
                  </button>
                )}
              </div>



              {/* Sección 1: Requisitos de Rebirth */}
              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <h3 className="text-xs uppercase font-extrabold text-slate-300 tracking-wider">
                    {t('rebirthRequirementsSection')}
                  </h3>
                  {requiredDroids.length !== droidsData.filter(d => getRequiredTier(d.name) > 0).length && (
                    <span className="text-[10px] font-mono text-slate-400 font-bold">
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
                        className={`p-3 rounded-xl border flex flex-col justify-between transition-all duration-150 ${isImmediate
                            ? 'bg-gradient-to-b from-[#112544] to-[#0c1628] border-2 border-[#00adee] ring-1 ring-[#00adee]/30 shadow-[0_0_15px_rgba(0,173,238,0.2)]'
                            : isCompleted
                              ? 'bg-[#0c1628]/60 border border-emerald-900/40 opacity-90'
                              : 'bg-[#0c1628] border border-[#1e2d4a] hover:border-slate-600 shadow-md'
                          }`}
                      >
                        {/* Fila 1: Nombre, Rarity y Trash/Clear */}
                        <div className="flex justify-between items-center gap-1.5 mb-2">
                          <h4 className={`text-sm sm:text-base truncate flex-1 leading-tight ${isImmediate
                              ? 'text-[#00adee] font-extrabold'
                              : isCompleted ? 'text-slate-100 font-bold' : 'text-white font-bold'
                            }`} title={droid.name}>
                            {droid.name}
                          </h4>
                          <div className="flex gap-1.5 flex-shrink-0 items-center">
                            {droid.achieved > 0 && (
                              <button
                                onClick={() => handleClearDroid(droid.name)}
                                className="p-0.5 text-slate-400 hover:text-red-400 hover:bg-red-950/40 rounded transition-colors cursor-pointer"
                                title={t('notRequiredTooltip')}
                              >
                                <Trash2 size={12} />
                              </button>
                            )}
                            {isImmediate && (
                              <span className="px-1.5 py-0.5 bg-[#00adee] text-slate-950 text-[9px] font-extrabold rounded leading-none" title={t('requiredForRebirthTooltip', { level: targetLevel.toString() })}>
                                R-{targetLevel}
                              </span>
                            )}
                            <span className={`text-[9px] font-extrabold uppercase px-1 py-0.2 rounded border border-current leading-none ${rarityInfo.color}`} title={t('rarityTooltip') + ': ' + t(`rarity_${droid.rarity}`)}>
                              {t(`rarity_${droid.rarity}`)[0]}
                            </span>
                            <span className={`text-[9px] font-semibold flex items-center px-1 py-0.2 rounded leading-none ${typeInfo.color} ${typeInfo.bg}`} title={t('typeTooltip') + ': ' + t(`type_${droid.type}`)}>
                              <TypeIcon size={9} />
                            </span>
                          </div>
                        </div>

                        {/* Fila 2: Requisitos y Meta (Descriptivo) */}
                        <div className="bg-[#050810]/70 px-2 py-1 rounded text-xs flex justify-between items-center mb-2.5 border border-[#1e2d4a]/50" title={rec.text}>
                          <span className={`truncate text-[10px] font-bold ${rec.type === 'upgrade' ? 'text-amber-300' :
                              rec.type === 'keep_upgrade' ? 'text-cyan-300' :
                                rec.type === 'keep' ? 'text-emerald-300 font-bold' :
                                  rec.type === 'sell' ? 'text-rose-400 font-bold' :
                                    'text-slate-400 font-medium'
                            }`}>
                            {rec.text}
                          </span>
                          <span className="text-slate-300 text-[9px] font-mono truncate ml-1 flex-shrink-0 font-bold" title={t('futureRebirthsTooltip')}>
                            {reqList.filter(r => r.level >= targetLevel).map(r => `R${r.level}`).join(', ')}
                          </span>
                        </div>

                        {/* Fila 3: Selector de los 6 Niveles (Cómodo para dedos) */}
                        <div className="flex w-full h-8 shadow-sm">
                          {localizedTiersConfig.map(tier => {
                            const isActive = tier.level <= droid.achieved;
                            let baseClasses = "flex-1 flex items-center justify-center text-[10px] font-bold border-y border-r last:border-r-0 first:border-l first:rounded-l-lg last:rounded-r-lg transition-all duration-100 select-none ";

                            if (!isActive) {
                              baseClasses += "bg-[#050810] border-[#1e2d4a]/70 text-slate-300 hover:bg-slate-800 hover:text-white cursor-pointer";
                            } else {
                              baseClasses += "cursor-pointer border-transparent z-10 ";
                              switch (tier.level) {
                                case 1: baseClasses += "bg-slate-300 text-slate-950 font-bold"; break;
                                case 2: baseClasses += "bg-amber-400 text-slate-950 font-extrabold"; break;
                                case 3: baseClasses += "bg-cyan-400 text-slate-950 font-extrabold"; break;
                                case 4: baseClasses += "bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-extrabold"; break;
                                case 5: baseClasses += "bg-purple-800 text-purple-100 font-extrabold border-t border-purple-400"; break;
                                case 6: baseClasses += "bg-indigo-900 text-indigo-100 font-extrabold border-t border-indigo-400"; break;
                                case 7: baseClasses += "bg-yellow-200 text-slate-950 font-extrabold border-t border-yellow-300"; break;
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

              {/* Sección: Lista de Requeridos Pendientes (Se ocultan al completarse, sin scroll, orden alfabético) */}
              {(() => {
                const pendingRequiredList = requiredDroids
                  .filter(d => d.achieved < d.required)
                  .sort((a, b) => a.name.localeCompare(b.name));

                if (pendingRequiredList.length === 0) return null;

                return (
                  <div className="space-y-2 pt-2 border-t border-[#1e2d4a]">
                    <div className="flex justify-between items-center px-1">
                      <h3 className="text-xs uppercase font-extrabold text-[#00adee] tracking-wider flex items-center gap-1.5 font-narrow">
                        <Target size={13} className="text-[#00adee]" />
                        <span>{t('quickRequiredTitle')}</span>
                      </h3>
                      <span className="text-[10px] font-mono bg-institutional-primary/30 border border-[#00adee]/30 px-1.5 py-0.2 rounded text-[#00adee] font-bold">
                        {pendingRequiredList.length}
                      </span>
                    </div>

                    {/* Lista simple de nombres en orden alfabético sin scroll, sin fotos ni etiquetas */}
                    <div className="flex flex-wrap gap-1.5">
                      {pendingRequiredList.map(droid => {
                        const isSelectedInSearch = trackerSearch.toLowerCase() === droid.name.toLowerCase();

                        return (
                          <button
                            key={`quick-pending-${droid.name}`}
                            onClick={() => setTrackerSearch(isSelectedInSearch ? '' : droid.name)}
                            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer border select-none ${isSelectedInSearch
                                ? 'bg-[#00adee] text-slate-950 border-[#00adee] font-extrabold shadow-md'
                                : 'bg-[#091120] border-[#1e2d4a] text-slate-200 hover:border-slate-500 hover:text-white'
                              }`}
                          >
                            {droid.name}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })()}

              {/* Sección 2: Droides No Requeridos */}
              {discardedDroids.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-[#1e2d4a]">
                  <div className="flex justify-between items-center px-1">
                    <h3 className="text-xs uppercase font-extrabold text-slate-300 tracking-wider">
                      {t('notRequiredSection')}
                    </h3>
                    <span className="text-[10px] font-mono bg-red-950/40 border border-red-500/30 px-1.5 py-0.2 rounded text-red-300 font-bold">
                      {discardedDroids.length}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2">
                    {discardedDroids.map(droid => {
                      const hasProgress = droid.achieved > 0;
                      const inCycle = isDroidInCycle(droid.name);

                      // Definir estilos dinámicos de contenedor e h4
                      let cardClass = "p-2.5 rounded-xl border flex items-center justify-between transition-all duration-150 select-none ";
                      let titleClass = "text-xs sm:text-sm font-bold truncate flex-1 pr-1.5 flex items-center ";

                      if (inCycle) {
                        cardClass += "bg-red-950/30 border-red-800/40 hover:border-red-600/50";
                        titleClass += hasProgress ? "text-red-300 font-extrabold" : "text-red-300/90 font-semibold";
                      } else {
                        cardClass += "bg-[#0c1628]/60 border border-[#1e2d4a] hover:border-slate-600";
                        titleClass += hasProgress ? "text-slate-200 font-bold" : "text-slate-300 font-medium";
                      }

                      return (
                        <div
                          key={droid.name}
                          className={cardClass}
                        >
                          <h4 className={titleClass}>
                            {getDroidImageUrl(droid.name, droid.required || 1) && (
                              <img
                                src={getDroidImageUrl(droid.name, droid.required || 1)!}
                                alt={droid.name}
                                loading="lazy"
                                className="w-5 h-5 object-contain inline-block mr-1.5 filter drop-shadow"
                                onError={(e) => { (e.currentTarget as HTMLElement).style.display = 'none'; }}
                              />
                            )}
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
                              className="p-1 text-slate-400 hover:text-red-400 hover:bg-red-950/40 rounded transition-colors cursor-pointer"
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
            <footer className="text-center py-2 text-xs text-slate-400 shrink-0">
              {t('droidsOrderFooter')}
            </footer>
          </>
        )}

        {activeTab === 'droidex' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

            {/* Columna Izquierda: Grid de Droides y Selector de Tiers */}
            <div className="lg:col-span-7 flex flex-col gap-3">
              <div className="bg-[#0c1628] border border-[#1e2d4a] p-4 rounded-xl shadow-lg flex flex-col gap-3">
                <div className="flex justify-between items-center flex-wrap gap-2">
                  <h2 className="text-xl font-bold text-white font-narrow flex items-center gap-2">
                    <Award className="text-[#00adee]" size={20} />
                    <span>{t('droidexTitle')}</span>
                    <span className="text-xs bg-institutional-primary/20 border border-institutional-primary/40 px-2.5 py-0.5 rounded text-[#00adee] font-mono font-bold">
                      {stats.obtainedCount}/{stats.totalCount}
                    </span>
                  </h2>

                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-amber-950/40 text-amber-300 border border-amber-500/30 px-2.5 py-1 rounded-lg font-bold font-mono flex items-center gap-1">
                      <Coins size={12} className="text-amber-400" />
                      <span>+{stats.tierMultiplier}% Multiplicador Hitos</span>
                    </span>
                  </div>
                </div>

                {/* Grid de 6 Hitos de Tiers */}
                <div className="bg-[#091120] p-3 rounded-xl border border-[#1e2d4a] flex flex-col gap-2">
                  <div className="text-xs font-bold text-slate-300 flex justify-between items-center">
                    <span>{t('tierMilestonesTitle')}</span>
                    <span className="text-amber-400 font-mono font-extrabold text-[11px]">Total Hitos: +{stats.tierMultiplier}%</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-1.5">
                    {localizedTiersConfig.map(tConfig => {
                      const mInfo = getTierMilestoneInfo(tConfig.level);
                      const isSelected = activeDroidexTier === tConfig.level;

                      return (
                        <button
                          key={tConfig.level}
                          onClick={() => setActiveDroidexTier(tConfig.level)}
                          className={`p-2 rounded-lg border text-left flex flex-col justify-between transition-all cursor-pointer select-none ${mInfo.isCompleted
                              ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300'
                              : isSelected
                                ? 'bg-[#13223d] border-[#00adee] text-white shadow-[0_0_8px_rgba(0,173,238,0.2)]'
                                : 'bg-[#050810] border-[#1e2d4a] text-slate-400 hover:border-slate-500 hover:text-slate-200'
                            }`}
                        >
                          <div className="flex justify-between items-center w-full">
                            <span className="font-bold text-xs">{tConfig.short}</span>
                            <span className="text-[10px] font-extrabold font-mono text-amber-300">+{mInfo.bonus}%</span>
                          </div>
                          <div className="mt-1 flex items-center justify-between text-[11px]">
                            {mInfo.isCompleted ? (
                              <span className="flex items-center gap-1 font-bold text-emerald-400">
                                <CheckCircle2 size={12} /> 25/25
                              </span>
                            ) : (
                              <span className="font-mono text-slate-300 font-medium">
                                {mInfo.obtained}/25
                              </span>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Barra de progreso del Hito de Tier Seleccionado */}
                {!activeTierMilestone.isCompleted ? (
                  <div className="bg-[#091120] p-3 rounded-xl border border-[#1e2d4a] text-xs space-y-1.5">
                    <div className="flex justify-between text-slate-200 font-bold">
                      <span>
                        {t('milestoneGoal', {
                          tier: getLocalizedTierName(activeDroidexTier),
                          needed: activeTierMilestone.needed.toString(),
                          multiplier: activeTierMilestone.bonus.toString()
                        })}
                      </span>
                      <span className="font-mono text-[#00adee] font-extrabold">{activeTierMilestone.obtained}/{activeTierMilestone.needed}</span>
                    </div>
                    <div className="w-full bg-[#050810] rounded-full h-2.5 overflow-hidden border border-[#1e2d4a]">
                      <div
                        className="bg-gradient-to-r from-[#17479d] to-[#00adee] h-full rounded-full transition-all duration-300"
                        style={{ width: `${activeTierMilestone.percent}%` }}
                      ></div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-emerald-950/50 border border-emerald-500/40 p-2.5 rounded-xl text-center text-xs text-emerald-300 font-bold flex items-center justify-center gap-1.5">
                    <CheckCircle2 size={14} />
                    <span>
                      {t('milestoneMax', {
                        tier: getLocalizedTierName(activeDroidexTier),
                        multiplier: activeTierMilestone.bonus.toString()
                      })}
                    </span>
                  </div>
                )}

                {/* Buscador de Droidex */}
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
                    <Search size={15} />
                  </span>
                  <input
                    type="text"
                    value={droidexSearch}
                    onChange={(e) => setDroidexSearch(e.target.value)}
                    placeholder={t('searchPlaceholder')}
                    className="w-full bg-[#050810] border border-[#1e2d4a] focus:border-[#00adee] pl-9 pr-9 py-2 rounded-xl text-xs text-white placeholder-slate-400 outline-none transition-colors shadow-inner"
                  />
                  {droidexSearch && (
                    <button
                      onClick={() => setDroidexSearch('')}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-white cursor-pointer"
                    >
                      <X size={15} />
                    </button>
                  )}
                </div>

                {/* Tabs de Selección de Tier */}
                <div className="flex bg-[#091120] p-1 rounded-lg border border-[#1e2d4a] gap-1 overflow-x-auto">
                  {localizedTiersConfig.map(tier => {
                    const isActive = tier.level === activeDroidexTier;
                    return (
                      <button
                        key={tier.level}
                        onClick={() => setActiveDroidexTier(tier.level)}
                        className={`flex-1 min-w-[70px] py-1.5 text-xs font-bold uppercase rounded-md transition-all text-center cursor-pointer select-none ${isActive
                            ? 'bg-[#17479d] text-white shadow-sm font-extrabold border border-[#00adee]/40'
                            : 'text-slate-300 hover:text-white hover:bg-[#13223d]'
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

                        let borderClass = 'border-[#1e2d4a] bg-[#091120] hover:bg-[#111c30]';
                        if (isObtained) {
                          switch (activeDroidexTier) {
                            case 1: borderClass = 'border-slate-500 bg-slate-900/80'; break;
                            case 2: borderClass = 'border-amber-500/50 bg-amber-950/30'; break;
                            case 3: borderClass = 'border-cyan-500/50 bg-cyan-950/30'; break;
                            case 4: borderClass = 'border-pink-500/50 bg-pink-950/30'; break;
                            case 5: borderClass = 'border-purple-500/50 bg-purple-950/30'; break;
                          }
                        }

                        if (isSelected) {
                          borderClass = 'border-[#00adee] bg-[#112544] ring-2 ring-[#00adee]/60 shadow-[0_0_12px_rgba(0,173,238,0.3)]';
                        }

                        return (
                          <div
                            key={droid.name}
                            onClick={() => setSelectedDroidexName(droid.name)}
                            className={`p-2 rounded-lg border flex flex-col items-center justify-center relative cursor-pointer select-none transition-all ${borderClass}`}
                          >
                            {/* Image / Silhouette Container */}
                            <div className="w-12 h-12 flex items-center justify-center mb-1 relative">
                              {renderDroidModel(droid, activeDroidexTier, isObtained)}
                            </div>

                            {/* Name & Rarity Label */}
                            <div className={`text-xs font-bold tracking-tight text-center truncate w-full ${isObtained ? 'text-white' : 'text-slate-300'}`}>
                              {droid.name}
                            </div>
                            <div className="text-[9px] text-slate-400 mt-0.5 truncate w-full text-center font-medium">
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

                        let borderClass = 'border-[#1e2d4a] bg-[#091120] hover:bg-[#111c30]';
                        if (isObtained) {
                          switch (tier) {
                            case 1: borderClass = 'border-slate-500 bg-slate-900/80'; break;
                            case 2: borderClass = 'border-amber-500/50 bg-amber-950/30'; break;
                            case 3: borderClass = 'border-cyan-500/50 bg-cyan-950/30'; break;
                            case 4: borderClass = 'border-pink-500/50 bg-pink-950/30'; break;
                            case 5: borderClass = 'border-purple-500/50 bg-purple-950/30'; break;
                          }
                        }

                        if (isSelected) {
                          borderClass = 'border-[#00adee] bg-[#112544] ring-2 ring-[#00adee]/60 shadow-[0_0_12px_rgba(0,173,238,0.3)]';
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
                            <div className="w-12 h-12 flex items-center justify-center mb-1 relative">
                              {renderDroidModel(droid, tier, isObtained)}
                            </div>

                            {/* Name & Tier Label */}
                            <div className={`text-xs font-bold tracking-tight text-center truncate w-full ${isObtained ? 'text-white' : 'text-slate-300'}`}>
                              {droid.name}
                            </div>
                            <div className="text-[9px] text-slate-400 mt-0.5 truncate w-full text-center font-medium">
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
              <div className="bg-[#0c1628] border border-[#1e2d4a] rounded-xl p-4 shadow-lg flex flex-col gap-3 h-full justify-between">

                <div className="space-y-3">
                  <div className="flex justify-between items-start gap-1">
                    <div>
                      <span className="text-xs uppercase tracking-wider text-[#00adee] font-bold">
                        {selectedDroid.rarity === 'ICONICO' ? t('type_Iconic') : getLocalizedTierName(activeDroidexTier)}
                      </span>
                      <h3 className="text-2xl font-bold text-white font-narrow leading-tight">
                        {selectedDroid.name}
                      </h3>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded border border-current leading-none ${droidRarities[selectedDroid.rarity]?.color || 'text-fuchsia-400'}`}>
                        {t(`rarity_${selectedDroid.rarity}`)}
                      </span>
                    </div>
                  </div>

                  {/* Wireframe render block */}
                  <div className="bg-[#050810] rounded-xl border border-[#1e2d4a] flex items-center justify-center p-6 h-56 relative overflow-hidden shadow-inner">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e2d4a_1px,transparent_1px),linear-gradient(to_bottom,#1e2d4a_1px,transparent_1px)] bg-[size:14px_24px] opacity-25"></div>

                    <div className="z-10 w-44 h-44 flex items-center justify-center">
                      {renderDroidModel(selectedDroid, activeDroidexTier, isSelectedObtained)}
                    </div>

                    <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 text-xs font-bold text-slate-200 bg-[#0c1628]/90 px-2.5 py-1 rounded border border-[#1e2d4a]">
                      {React.createElement(droidTypes[selectedDroid.type]?.icon || Cpu, { size: 12, className: droidTypes[selectedDroid.type]?.color })}
                      <span>{t(`type_${selectedDroid.type}`)}</span>
                    </div>
                  </div>

                  {/* Perk / Stat Box */}
                  <div className="bg-[#091120] border border-[#00adee]/30 p-3 rounded-lg flex flex-col gap-1">
                    <span className="text-[10px] uppercase tracking-wider text-[#00adee] font-bold">Bono del Droidex:</span>
                    <span className="text-sm font-extrabold text-white">
                      {getDroidexStatsPerk(selectedDroid, activeDroidexTier)}
                    </span>
                  </div>

                  {/* Economic Info Box (droids-cost.png) */}
                  {!isIconicDroid(selectedDroid) && (
                    <div className="bg-[#091120] border border-[#1e2d4a] p-3 rounded-lg flex flex-col gap-1.5 text-xs">
                      <div className="flex justify-between items-center text-slate-300">
                        <span>{t('droidUpgradeCost')}</span>
                        <span className="font-mono font-bold text-white">
                          {droidUpgradeCosts[selectedDroid.rarity]?.[activeDroidexTier] ? `${droidUpgradeCosts[selectedDroid.rarity][activeDroidexTier]} Chips` : '-'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-slate-300">
                        <span>{t('droidSellValue')}</span>
                        <span className="font-mono font-bold text-amber-400">
                          {droidSellValues[selectedDroid.rarity]?.[activeDroidexTier] ? `${droidSellValues[selectedDroid.rarity][activeDroidexTier]} Créditos` : '-'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-slate-300">
                        <span>{t('flawlessChance')}</span>
                        <span className="font-mono font-bold text-emerald-400">
                          {flawlessRates[activeDroidexTier] || '1/1000'}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Status Toggle Area */}
                  <div className="space-y-2 pt-1">
                    <button
                      onMouseEnter={() => setIsToggleHovered(true)}
                      onMouseLeave={() => setIsToggleHovered(false)}
                      onClick={() => {
                        setDroidexObtainedState(selectedDroid.name, activeDroidexTier, !isSelectedObtained);
                        setIsToggleHovered(false);
                      }}
                      className={`w-full py-2.5 px-4 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md ${isSelectedObtained
                          ? 'bg-emerald-600 hover:bg-rose-600 text-white font-extrabold'
                          : 'bg-[#17479d] hover:bg-[#12387d] text-white font-bold'
                        }`}
                    >
                      <CheckCircle2 size={16} />
                      <span>
                        {isSelectedObtained
                          ? (isToggleHovered ? t('markPendiente') : t('statusFabricado'))
                          : t('markFabricado')}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Back / Next Navigators */}
                <div className="flex gap-2 pt-3 border-t border-[#1e2d4a]">
                  <button
                    onClick={handlePrevDroid}
                    className="flex-1 py-2 px-3 bg-[#17479d] hover:bg-[#12387d] text-white text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1 cursor-pointer select-none shadow-sm"
                  >
                    <span>{t('prevDroid')}</span>
                  </button>
                  <button
                    onClick={handleNextDroid}
                    className="flex-1 py-2 px-3 bg-[#17479d] hover:bg-[#12387d] text-white text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1 cursor-pointer select-none shadow-sm"
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
              <div className="bg-[#0c1628] border border-[#1e2d4a] p-3.5 rounded-xl shadow-lg flex flex-col gap-2">
                <h3 className="text-xs uppercase font-extrabold text-slate-300 tracking-wider px-1 mb-1">
                  Categorías
                </h3>

                <button
                  onClick={() => {
                    setActiveShopCategory('featured');
                    const first = novaUpgradesList.find(up => up.category === 'featured');
                    if (first) setSelectedShopUpgradeId(first.id);
                  }}
                  className={`w-full py-2.5 px-3 text-xs font-bold text-left rounded-lg transition-all flex items-center gap-2 cursor-pointer ${activeShopCategory === 'featured'
                      ? 'bg-institutional-primary text-white border border-[#00adee]/50 shadow-sm'
                      : 'bg-[#091120] text-slate-300 hover:text-white hover:bg-[#13223d] border border-[#1e2d4a]'
                    }`}
                >
                  <Sparkles size={15} />
                  <span>{t('upgradeCategory_featured')}</span>
                </button>

                <button
                  onClick={() => {
                    setActiveShopCategory('core');
                    const first = novaUpgradesList.find(up => up.category === 'core');
                    if (first) setSelectedShopUpgradeId(first.id);
                  }}
                  className={`w-full py-2.5 px-3 text-xs font-bold text-left rounded-lg transition-all flex items-center gap-2 cursor-pointer ${activeShopCategory === 'core'
                      ? 'bg-institutional-primary text-white border border-[#00adee]/50 shadow-sm'
                      : 'bg-[#091120] text-slate-300 hover:text-white hover:bg-[#13223d] border border-[#1e2d4a]'
                    }`}
                >
                  <Heart size={15} />
                  <span>{t('upgradeCategory_core')}</span>
                </button>

                <button
                  onClick={() => {
                    setActiveShopCategory('workshop');
                    const first = novaUpgradesList.find(up => up.category === 'workshop');
                    if (first) setSelectedShopUpgradeId(first.id);
                  }}
                  className={`w-full py-2.5 px-3 text-xs font-bold text-left rounded-lg transition-all flex items-center gap-2 cursor-pointer ${activeShopCategory === 'workshop'
                      ? 'bg-institutional-primary text-white border border-[#00adee]/50 shadow-sm'
                      : 'bg-[#091120] text-slate-300 hover:text-white hover:bg-[#13223d] border border-[#1e2d4a]'
                    }`}
                >
                  <Cpu size={15} />
                  <span>{t('upgradeCategory_workshop')}</span>
                </button>

                <button
                  onClick={() => {
                    setActiveShopCategory('cosmetic');
                    const first = novaUpgradesList.find(up => up.category === 'cosmetic');
                    if (first) setSelectedShopUpgradeId(first.id);
                  }}
                  className={`w-full py-2.5 px-3 text-xs font-bold text-left rounded-lg transition-all flex items-center gap-2 cursor-pointer ${activeShopCategory === 'cosmetic'
                      ? 'bg-institutional-primary text-white border border-[#00adee]/50 shadow-sm'
                      : 'bg-[#091120] text-slate-300 hover:text-white hover:bg-[#13223d] border border-[#1e2d4a]'
                    }`}
                >
                  <Palette size={15} />
                  <span>{t('upgradeCategory_cosmetic')}</span>
                </button>

                <button
                  onClick={() => {
                    setActiveShopCategory('lobby_boosts');
                    const first = novaUpgradesList.find(up => up.category === 'lobby_boosts');
                    if (first) setSelectedShopUpgradeId(first.id);
                  }}
                  className={`w-full py-2.5 px-3 text-xs font-bold text-left rounded-lg transition-all flex items-center gap-2 cursor-pointer ${activeShopCategory === 'lobby_boosts'
                      ? 'bg-institutional-primary text-white border border-[#00adee]/50 shadow-sm'
                      : 'bg-[#091120] text-slate-300 hover:text-white hover:bg-[#13223d] border border-[#1e2d4a]'
                    }`}
                >
                  <Zap size={15} />
                  <span>{t('upgradeCategory_lobby_boosts')}</span>
                </button>

                <button
                  onClick={() => {
                    setActiveShopCategory('iconic');
                    const first = novaUpgradesList.find(up => up.category === 'iconic');
                    if (first) setSelectedShopUpgradeId(first.id);
                  }}
                  className={`w-full py-2.5 px-3 text-xs font-bold text-left rounded-lg transition-all flex items-center gap-2 cursor-pointer ${activeShopCategory === 'iconic'
                      ? 'bg-institutional-primary text-white border border-[#00adee]/50 shadow-sm'
                      : 'bg-[#091120] text-slate-300 hover:text-white hover:bg-[#13223d] border border-[#1e2d4a]'
                    }`}
                >
                  <Award size={15} />
                  <span>{t('upgradeCategory_iconic')}</span>
                </button>
              </div>
            </div>

            {/* Columna Central: Lista de Upgrades */}
            <div className="lg:col-span-5 flex flex-col gap-3">
              <div className="bg-[#0c1628] border border-[#1e2d4a] p-4 rounded-xl shadow-lg flex flex-col gap-3">
                <div className="flex justify-between items-center flex-wrap gap-2">
                  <h2 className="text-lg font-bold text-white font-narrow flex items-center gap-1.5">
                    {t('novaShopTitle')}
                  </h2>

                  <button
                    onClick={() => {
                      setCrystalsInputValue(novaCrystals.toString());
                      setShowCrystalsEdit(true);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1 bg-purple-950/60 border border-purple-500/40 text-purple-200 rounded-lg hover:bg-purple-900/80 cursor-pointer transition-all font-mono font-bold text-xs shadow-md"
                    title="Hacer clic para ajustar cristales"
                  >
                    <span>💎</span>
                    <span>{novaCrystals}</span>
                    <span className="text-[10px] text-slate-300 font-sans font-normal uppercase">{t('crystalsCount')}</span>
                  </button>
                </div>

                {/* Grid de Upgrades */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[460px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-800">
                  {novaUpgradesList
                    .filter(up => up.category === activeShopCategory)
                    .map((upgrade: NovaUpgrade) => {
                      const currentLevel = getUpgradeLevel(upgrade.id);
                      const isSelected = selectedShopUpgradeId === upgrade.id;

                      let cardBorder = isSelected ? 'border-[#00adee] bg-[#112544] ring-1 ring-[#00adee]/40 shadow-md' : 'border-[#1e2d4a] bg-[#091120] hover:bg-[#111c30]';

                      return (
                        <div
                          key={upgrade.id}
                          onClick={() => setSelectedShopUpgradeId(upgrade.id)}
                          className={`p-3 rounded-xl border flex flex-col justify-between cursor-pointer select-none transition-all ${cardBorder}`}
                        >
                          <div className="flex gap-2 items-start mb-2">
                            <span className="p-1.5 rounded bg-[#17479d]/30 border border-[#00adee]/30 flex-shrink-0 text-[#00adee]">
                              {React.createElement(upgrade.icon, { size: 15 })}
                            </span>
                            <div className="min-w-0">
                              <h4 className="text-xs font-bold text-white leading-tight truncate">
                                {upgrade.category === 'iconic' ? upgrade.nameKey : t(upgrade.nameKey)}
                              </h4>
                              <span className="text-[10px] font-mono text-slate-300 font-bold block mt-0.5">
                                {upgrade.category === 'iconic' ? (currentLevel > 0 ? 'Adquirido' : 'Pendiente') : `Lvl ${currentLevel}/${upgrade.maxLevel}`}
                              </span>
                            </div>
                          </div>

                          {upgrade.category !== 'iconic' && (
                            <div className="w-full bg-[#050810] rounded-full h-1.5 overflow-hidden border border-[#1e2d4a]">
                              <div
                                className="bg-[#00adee] h-full rounded-full transition-all duration-300"
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
                  <div className="bg-[#0c1628] border border-[#1e2d4a] rounded-xl p-4 shadow-lg flex flex-col gap-4 justify-between h-full">

                    <div className="space-y-4">
                      <div className="flex gap-3 items-center">
                        <span className="p-2 rounded bg-[#091120] border border-[#00adee]/30 text-[#00adee]">
                          {React.createElement(upgrade.icon, { size: 22 })}
                        </span>
                        <div>
                          <span className="text-[10px] uppercase tracking-wider text-[#00adee] font-bold">
                            {t(`upgradeCategory_${upgrade.category}`)}
                          </span>
                          <h3 className="text-xl font-bold text-white font-narrow leading-tight">
                            {upgrade.category === 'iconic' ? upgrade.nameKey : t(upgrade.nameKey)}
                          </h3>
                        </div>
                      </div>

                      <p className="text-xs text-slate-200 leading-relaxed">
                        {upgrade.category === 'iconic' ? getIconicDroidDesc(upgrade.nameKey) : t(upgrade.descKey)}
                      </p>

                      {upgrade.category !== 'iconic' ? (
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs font-bold">
                            <span className="text-slate-300">Progreso de Nivel</span>
                            <span className="text-white font-mono">{currentLevel} / {upgrade.maxLevel}</span>
                          </div>
                          <div className="w-full bg-[#050810] border border-[#1e2d4a] h-2.5 rounded-full overflow-hidden">
                            <div
                              className="bg-[#00adee] h-full rounded-full transition-all duration-300"
                              style={{ width: `${(currentLevel / upgrade.maxLevel) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between text-xs py-2 border-y border-[#1e2d4a]">
                          <span className="text-slate-300 font-bold">Estado en Colección</span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${currentLevel > 0 ? 'bg-emerald-950/60 border border-emerald-500/40 text-emerald-300' : 'bg-[#091120] border border-[#1e2d4a] text-slate-400'}`}>
                            {currentLevel > 0 ? 'Adquirido' : 'Pendiente'}
                          </span>
                        </div>
                      )}

                      <div className="pt-2">
                        {isMax ? (
                          <div className="bg-emerald-950/50 border border-emerald-500/40 p-3 rounded-lg text-center font-bold text-xs text-emerald-300">
                            {t('maxLevelReached')}
                          </div>
                        ) : (
                          <button
                            onClick={() => buyUpgradeLevel(upgrade.id)}
                            disabled={!canAfford}
                            className={`w-full py-3 px-4 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-md select-none cursor-pointer ${canAfford
                                ? 'bg-[#17479d] hover:bg-[#12387d] text-white font-extrabold'
                                : 'bg-slate-900 border border-slate-800 text-slate-500 cursor-not-allowed'
                              }`}
                          >
                            <span>💎</span>
                            <span>{t('buyUpgrade', { cost: nextCost.toString() })}</span>
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="bg-[#091120] p-2.5 rounded-lg border border-[#1e2d4a] text-xs mt-2">
                      <div className="flex items-center justify-between gap-1.5">
                        <span className="text-[10px] text-slate-300 font-bold uppercase tracking-wide">Ajustar Nivel Manual:</span>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => setUpgradeLevelManual(upgrade.id, currentLevel - 1)}
                            className="w-6 h-6 bg-slate-800 hover:bg-slate-700 text-white rounded flex items-center justify-center cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                            disabled={currentLevel <= 0}
                          >
                            <Minus size={12} />
                          </button>
                          <span className="px-2 font-mono font-bold text-white text-xs">{currentLevel}</span>
                          <button
                            onClick={() => setUpgradeLevelManual(upgrade.id, currentLevel + 1)}
                            className="w-6 h-6 bg-slate-800 hover:bg-slate-700 text-white rounded flex items-center justify-center cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
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
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-xs">
          <div className="bg-[#0c1628] border border-[#1e2d4a] p-5 rounded-xl max-w-xs w-full shadow-2xl relative font-sans text-xs">
            <h3 className="text-base font-bold mb-1 text-white font-narrow">¿Reiniciar progreso?</h3>
            <p className="text-slate-300 mb-4 leading-relaxed">
              Restablecerá tu Rebirth al nivel 0 (inicio) y borrará tus droides. No se puede deshacer.
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowResetModal(false)}
                className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all font-bold cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={handleReset}
                className="px-3 py-1.5 rounded bg-rose-600 hover:bg-rose-500 text-white transition-all font-bold shadow-md cursor-pointer"
              >
                Sí, reiniciar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Super Rebirth */}
      {showSuperRebirthModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-xs">
          <div className="bg-[#0c1628] border border-purple-900/50 p-5 rounded-xl max-w-xs w-full shadow-[0_0_25px_rgba(147,51,234,0.3)] relative font-sans text-xs">
            <h3 className="text-base font-bold mb-1 text-purple-300 font-narrow flex items-center gap-1.5">
              <Sparkles size={16} /> ¿Realizar Super Rebirth?
            </h3>
            <p className="text-slate-300 mb-3 leading-relaxed">
              Estás en Rebirth <strong className="text-white">R-{currentRebirth}</strong>. Al volver a comenzar obtendrás:
            </p>

            <div className="bg-purple-950/50 border border-purple-800/50 p-3 rounded-xl text-center mb-4">
              <div className="text-[10px] uppercase font-bold text-purple-300 tracking-wider mb-0.5">Recompensa</div>
              <div className="text-base font-black text-purple-100 flex items-center justify-center gap-1">
                <span>💎 {getNovaCrystals(currentRebirth)} Cristales Nova</span>
              </div>
            </div>

            <p className="text-rose-400 mb-4 leading-relaxed text-xs font-semibold">
              ⚠️ Esto restablecerá tu Rebirth al nivel 0 y borrará todos tus droides del tracker.
            </p>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowSuperRebirthModal(false)}
                className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all font-bold cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={handleSuperRebirth}
                className="px-3 py-1.5 rounded bg-purple-700 hover:bg-purple-600 text-white transition-all font-bold shadow-md cursor-pointer"
              >
                Confirmar Super Rebirth
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Ajuste de Cristales */}
      {showCrystalsEdit && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-xs">
          <div className="bg-[#0c1628] border border-[#1e2d4a] p-5 rounded-xl max-w-xs w-full shadow-2xl relative font-sans text-xs">
            <h3 className="text-base font-bold mb-2 text-white font-narrow flex items-center gap-1.5">
              <span>💎</span> {t('customCrystalsLabel')}
            </h3>

            <input
              type="number"
              min="0"
              value={crystalsInputValue}
              onChange={(e) => setCrystalsInputValue(e.target.value)}
              className="w-full bg-[#050810] border border-[#1e2d4a] p-2.5 rounded-lg text-white font-mono font-bold text-sm text-center outline-none focus:border-[#00adee] mb-4"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowCrystalsEdit(false)}
                className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all font-bold cursor-pointer"
              >
                {t('cancel')}
              </button>
              <button
                onClick={() => {
                  const val = parseInt(crystalsInputValue, 10);
                  saveNovaCrystals(isNaN(val) ? 0 : Math.max(0, val));
                  setShowCrystalsEdit(false);
                }}
                className="px-3 py-1.5 rounded bg-institutional-primary hover:bg-[#12387d] text-white transition-all font-bold shadow-md cursor-pointer"
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
