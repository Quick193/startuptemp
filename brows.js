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
    <SelectContent>
      {categories.map((category) => (
        <SelectItem key={category.value} value={category.value}>
          {category.label}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);

// --- SortFilter Component ---
const sortOptions = [
  { value: "-created_date", label: "Newest First" },
  { value: "created_date", label: "Oldest First" },
  { value: "-raised_amount", label: "Most Raised" },
  { value: "-donor_count", label: "Most Donors" },
  { value: "-goal_amount", label: "Highest Goal" }
];

const SortFilter = ({ sortBy, onSortChange }) => (
  <Select value={sortBy} onValueChange={onSortChange}>
    <SelectTrigger className="w-full lg:w-48 h-12">
      <div className="flex items-center">
        <ArrowUpDown className="w-4 h-4 mr-2 text-gray-400" />
        <SelectValue placeholder="Sort by" />
      </div>
    </SelectTrigger>
    <SelectContent>
      {sortOptions.map((option) => (
        <SelectItem key={option.value} value={option.value}>
          {option.label}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);


// --- Main BrowsePage Component ---
export default function BrowsePage() {
  const [campaigns, setCampaigns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("-created_date");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    loadCampaigns();
  }, [selectedCategory, sortBy]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, []);

  const loadCampaigns = async () => {
    setIsLoading(true);
    try {
      let campaignsData;
      const filterOptions = { status: "active" };
      if (selectedCategory !== "all") {
        filterOptions.category = selectedCategory;
      }
      campaignsData = await Campaign.filter(filterOptions, sortBy, 50);
      setCampaigns(campaignsData);
    } catch (error) {
      console.error("Error loading campaigns:", error);
    }
    setIsLoading(false);
  };

  const filteredCampaigns = campaigns.filter(campaign => 
    campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    campaign.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Discover Campaigns</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Find causes that inspire you and make a meaningful impact</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input type="text" placeholder="Search campaigns..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10 h-12 text-lg border-gray-200 focus:border-orange-300" />
            </div>
            <div className="hidden lg:flex gap-4">
              <CategoryFilter selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />
              <SortFilter sortBy={sortBy} onSortChange={setSortBy} />
            </div>
            <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="lg:hidden h-12"><SlidersHorizontal className="w-5 h-5 mr-2" />Filters</Button>
          </div>
          {showFilters && (
            <div className="lg:hidden mt-4 pt-4 border-t border-gray-200 space-y-4">
              <CategoryFilter selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />
              <SortFilter sortBy={sortBy} onSortChange={setSortBy} />
            </div>
          )}
        </motion.div>

        <div className="flex items-center justify-between mb-8">
          <p className="text-gray-600">{isLoading ? "Loading..." : `${filteredCampaigns.length} campaigns found`}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            Array(9).fill(0).map((_, index) => <CampaignCardSkeleton key={index} />)
          ) : filteredCampaigns.length > 0 ? (
            filteredCampaigns.map((campaign, index) => (
              <motion.div key={campaign.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.05 }}>
                <CampaignCard campaign={campaign} />
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center"><Search className="w-12 h-12 text-gray-400" /></div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No campaigns found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your search or filters to find what you're looking for.</p>
                <Button onClick={() => { setSearchQuery(""); setSelectedCategory("all"); setSortBy("-created_date"); }} variant="outline">Clear Filters</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
