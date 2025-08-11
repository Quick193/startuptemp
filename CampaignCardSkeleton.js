import React from "react";

export default function CampaignCardSkeleton() {
  return (
    <div className="overflow-hidden bg-white border border-gray-100 rounded-xl animate-pulse">
      <div className="w-full h-48 bg-gray-200"></div>
      
      <div className="p-6">
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-1"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="h-4 bg-gray-200 rounded w-16"></div>
            <div className="h-4 bg-gray-200 rounded w-32"></div>
          </div>
          
          <div className="h-2 bg-gray-200 rounded w-full"></div>
          
          <div className="flex items-center justify-between">
            <div className="h-4 bg-gray-200 rounded w-20"></div>
            <div className="h-4 bg-gray-200 rounded w-24"></div>
          </div>
        </div>
      </div>
      
      <div className="px-6 py-4 border-t border-gray-50 bg-gray-50/50">
        <div className="flex items-center justify-between w-full">
          <div className="h-4 bg-gray-200 rounded w-24"></div>
          <div className="h-4 bg-gray-200 rounded w-20"></div>
        </div>
      </div>
    </div>
  );
}
