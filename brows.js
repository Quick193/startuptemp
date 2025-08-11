import React, { useState, useEffect } from "react";
import { Campaign } from "@/entities/Campaign";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, SlidersHorizontal, Tag, ArrowUpDown } from "lucide-react";
import { motion } from "framer-motion";

// Shared components remain imported
import CampaignCard from "../components/shared/CampaignCard";
import CampaignCardSkeleton from "../components/shared/CampaignCardSkeleton";

// --- CategoryFilter Component ---
const categories = [
  { value: "all", label: "All Categories" },
  { value: "medical", label: "Medical" },
  { value: "education", label: "Education" },
  { value: "emergency", label: "Emergency" },
  { value: "community", label: "Community" },
  { value: "animal_welfare", label: "Animal Welfare" },
  { value: "environment", label: "Environment" },
  { value: "disaster_relief", label: "Disaster Relief" },
  { value: "sports", label: "Sports" },
  { value: "creative", label: "Creative" },
  { value: "memorial", label: "Memorial" }
];

const CategoryFilter = ({ selectedCategory, onCategoryChange }) => (
  <Select value={selectedCategory} onValueChange={onCategoryChange}>
    <SelectTrigger className="w-full lg:w-48 h-12">
      <div className="flex items-center">
        <Tag className="w-4 h-4 mr-2 text-gray-400" />
        <SelectValue placeholder="Category" />
      </div>
    </SelectTrigger>
 
