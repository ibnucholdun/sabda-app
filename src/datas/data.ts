import { size } from "better-auth";
import {
  Book,
  Clock,
  Droplets,
  Compass,
  BrainCircuit,
  ClipboardCheck,
  Calendar,
  BookOpen,
  Home,
  Settings,
} from "lucide-react";
import type { TopicItem } from "~/types/type";

export const feature = [
  {
    id: "Al-Quran",
    path: "/al-quran",
    label: "Al-Quran",
    icon: Book,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    id: "Jadwal Sholat",
    path: "/jadwal-sholat",
    label: "Jadwal Sholat",
    icon: Clock,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    id: "Tasbih",
    path: "/tasbih",
    label: "Tasbih",
    icon: Droplets,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    id: "Kiblat",
    path: "/kiblat",
    label: "Kiblat",
    icon: Compass,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    id: "Wirid",
    path: "/wirid",
    label: "Wirid",
    icon: BrainCircuit,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    id: "Ibadah",
    path: "/ibadah",
    label: "Ibadah Tracker",
    icon: ClipboardCheck,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    id: "Kalender",
    path: "/kalender",
    label: "Kalender",
    icon: Calendar,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    id: "Yasin & Tahlil",
    path: "/yasin-tahlil",
    label: "Yasin & Tahlil",
    icon: BookOpen,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
];

export const STATIC_HIKMAH = [
  {
    text: "Allah tidak membebani seseorang melainkan sesuai dengan kesanggupannya.",
    source: "QS. Al-Baqarah: 286",
  },
  {
    text: "Sesungguhnya sesudah kesulitan itu ada kemudahan.",
    source: "QS. Al-Insyirah: 6",
  },
  {
    text: "Jadikanlah sabar dan shalat sebagai penolongmu.",
    source: "QS. Al-Baqarah: 45",
  },
  {
    text: "Barangsiapa yang bertaqwa kepada Allah, niscaya Dia akan mengadakan baginya jalan keluar.",
    source: "QS. At-Talaq: 2",
  },
  {
    text: "Hati yang bersyukur adalah magnet bagi keajaiban.",
    source: "Hikmah Sabda",
  },
];

export const topics: TopicItem[] = [
  {
    id: "1",
    title: "Kumpulan Khutbah Bulan Sya'ban",
    imageUrl: "https://picsum.photos/seed/topic1/300/200",
  },
  {
    id: "2",
    title: "Amalan Malam Nisfu Sya'ban",
    imageUrl: "https://picsum.photos/seed/topic2/300/200",
  },
  {
    id: "3",
    title: "Persiapan Menyambut Ramadhan",
    imageUrl: "https://picsum.photos/seed/topic3/300/200",
  },
];

export const recommendations: TopicItem[] = [
  {
    id: "1",
    title: "Doa Malam Nisfu Sya'ban",
    imageUrl: "https://picsum.photos/seed/rec1/300/200",
  },
  {
    id: "2",
    title: "Dzikir Penenang Hati",
    imageUrl: "https://picsum.photos/seed/rec2/300/200",
  },
  {
    id: "3",
    title: "Kisah Sahabat Nabi",
    imageUrl: "https://picsum.photos/seed/rec3/300/200",
  },
];

export const tabs = [
  { id: "Beranda", path: "/", icon: Home, label: "Beranda" },
  { id: "Al-Quran", path: "/al-quran", icon: BookOpen, label: "Al-Quran" },
  {
    id: "Ibadah",
    path: "/ibadah",
    icon: ClipboardCheck,
    label: "Ibadah",
  },
  { id: "Kalender", path: "/kalender", icon: Calendar, label: "Kalender" },
  {
    id: "Pengaturan",
    path: "/pengaturan",
    icon: Settings,
    label: "Pengaturan",
  },
];
