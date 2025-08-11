import React, { useState, useEffect } from "react";
import { Campaign } from "@/entities/Campaign";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import {
  ArrowRight,
  Heart,
  Users,
  TrendingUp,
  Shield,
  Search,
  Plus,
  Stethoscope,
  GraduationCap,
  AlertTriangle,
  Leaf,
  Zap,
  Trophy,
  Palette,
  HeartHandshake,
  CheckCircle,
  Share2,
  Award
} from "lucide-react";
import { motion } from "framer-motion";

// Shared components
import CampaignCard from "../components/shared/CampaignCard";
import CampaignCardSkeleton from "../components/shared/CampaignCardSkeleton";

// --- HeroSection Component ---
const HeroSection = () => (
  <section className="relative py-20 lg:py-32 overflow-hidden">
    <div className="absolute inset-0">
 
