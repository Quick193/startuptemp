import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Heart, MapPin, Calendar, Users } from "lucide-react";
import { differenceInDays } from "date-fns";

const categoryColors = {
  medical: "bg-red-100 text-red-800",
  education: "bg-blue-100 text-blue-800",
  emergency: "bg-orange-100 text-orange-800",
  community: "bg-purple-100 text-purple-800",
  animal_welfare: "bg-pink-100 text-pink-800",
  environment: "bg-green-100 text-green-800",
  disaster_relief: "bg-yellow-100 text-yellow-800",
  sports: "bg-indigo-100 text-indigo-800",
  creative: "bg-teal-100 text-teal-800",
  memorial: "bg-gray-100 text-gray-800"
};

export default function CampaignCard({ campaign }) {
  const progressPercentage = (campaign.raised_amount / campaign.goal_amount) * 100;
  const daysLeft = campaign.end_date ? differenceInDays(new Date(campaign.end_date), new Date()) : null;
  
  return (
    <Link to={createPageUrl(`Campaign?id=${campaign.id}`)}>
      <div className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white border border-gray-100 rounded-xl">
        <div className="relative overflow-hidden">
          <img
            src={campaign.image_url || "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"}
            alt={campaign.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-4 left-4">
            <span className={`${categoryColors[campaign.category]} border-0 font-medium px-2 py-1 rounded-md text-xs`}>
              {campaign.category?.replace('_', ' ').toUpperCase()}
 
