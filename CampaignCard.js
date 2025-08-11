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
            </span>
          </div>
          {campaign.is_featured && (
            <div className="absolute top-4 right-4">
              <span className="bg-gradient-to-r from-orange-500 to-orange-600 text-white border-0 px-2 py-1 rounded-md text-xs font-medium">
                Featured
              </span>
            </div>
          )}
        </div>
        
        <div className="p-6">
          <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
            {campaign.title}
          </h3>
          
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {campaign.description}
          </p>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Raised</span>
              <span className="font-semibold text-gray-900">
                ₹{campaign.raised_amount?.toLocaleString('en-IN')} / ₹{campaign.goal_amount?.toLocaleString('en-IN')}
              </span>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full transition-all duration-300" 
                style={{ width: `${Math.min(progressPercentage, 100)}%` }}
              ></div>
            </div>
            
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-1" />
                {campaign.donor_count || 0} donors
              </div>
              {daysLeft !== null && daysLeft > 0 && (
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {daysLeft} days left
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="px-6 py-4 border-t border-gray-50 bg-gray-50/50">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="w-4 h-4 mr-1" />
              {campaign.location || "India"}
            </div>
            <div className="text-sm text-gray-500">
              by {campaign.organizer_name}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
