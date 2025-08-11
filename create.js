
import React, { useState, useEffect } from "react";
import { Campaign } from "@/entities/Campaign";
import { User } from "@/entities/User";
import { UploadFile, InvokeLLM } from "@/integrations/Core";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import {
  ArrowLeft,
  CheckCircle,
  IndianRupee,
  ArrowRight,
  FileText,
  Image,
  Video,
  Upload,
  X,
  MapPin,
  User as UserIcon,
  Calendar,
  Sparkles,
  Loader2,
  Copy
} from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { toast } from "sonner";


// --- StepIndicator Component ---
const StepIndicator = ({ steps, currentStep }) => (
  <div className="flex items-center justify-between mb-8">
    {steps.map((step, index) => (
      <div key={step.title} className="flex items-center flex-1">
        <div className="flex items-center">
          <div className={`flex items-center justify-center w-10 h-10 rounded-full ${index < currentStep ? "bg-green-500 text-white" : index === currentStep ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-600"}`}>
            {index < currentStep ? <CheckCircle className="w-6 h-6" /> : <span className="text-sm font-semibold">{index + 1}</span>}
          </div>
          <div className="ml-3">
            <p className={`text-sm font-medium ${index <= currentStep ? "text-gray-900" : "text-gray-500"}`}>{step.title}</p>
            <p className="text-xs text-gray-500">{step.description}</p>
          </div>
        </div>
        {index < steps.length - 1 && <div className={`flex-1 h-0.5 mx-4 ${index < currentStep ? "bg-green-500" : "bg-gray-200"}`} />}
      </div>
    ))}
  </div>
);

// --- CampaignBasics Component ---
const categories = [
  { value: "medical", label: "Medical" }, { value: "education", label: "Education" }, { value: "emergency", label: "Emergency" },
  { value: "community", label: "Community" }, { value: "animal_welfare", label: "Animal Welfare" }, { value: "environment", label: "Environment" },
  { value: "disaster_relief", label: "Disaster Relief" }, { value: "sports", label: "Sports" }, { value: "creative", label: "Creative" },
  { value: "memorial", label: "Memorial" }
];
const CampaignBasics = ({ data, onUpdate, onNext }) => {
  const [user, setUser] = useState(null);
  const [aiInput, setAiInput] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const currentUser = await User.me();
      setUser(currentUser);
      if (!data.organizer_name) {
        onUpdate({ organizer_name: currentUser.full_name });
      }
    } catch (error) { console.error("Error loading user:", error); }
  };

  const handleInputChange = (field, value) => onUpdate({ [field]: value });
  
  const handleAiHelp = async (e) => {
    e.preventDefault();
    if (!aiInput.trim()) return toast.error("Please describe your campaign idea");
    setIsAiLoading(true);
    try {
      const response = await InvokeLLM({
        prompt: `Help create a crowdfunding campaign based on this idea: "${aiInput}". Please provide suggestions for:
1. A compelling campaign title (max 60 characters)
2. Appropriate category from: medical, education, emergency, community, animal_welfare, environment, disaster_relief, sports, creative, memorial
3. A realistic fundraising goal in Indian Rupees
4. Key story points that should be included
5. Timeline suggestions`,
        response_json_schema: { type: "object", properties: { title: { type: "string" }, category: { type: "string" }, suggested_goal: { type: "number" }, story_points: { type: "array", items: { type: "string" } }, timeline_suggestion: { type: "string" }, tips: { type: "array", items: { type: "string" } } } }
      });
      if (response.title && !data.title) onUpdate({ title: response.title });
      if (response.category && !data.category) onUpdate({ category: response.category });
      if (response.suggested_goal && !data.goal_amount) onUpdate({ goal_amount: response.suggested_goal.toString() });
      toast.success("AI suggestions applied! Check the filled fields and story tips below.");
      onUpdate({ ai_story_points: response.story_points, ai_tips: response.tips, ai_timeline: response.timeline_suggestion });
    } catch (error) { toast.error("Couldn't get AI suggestions. Please try again."); }
    setIsAiLoading(false);
    setAiInput("");
  };

  const isValid = () => data.title && data.goal_amount && data.category && data.location;
  
  return (
    <div className="space-y-6">
      <div className="border border-orange-200 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-6">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full flex items-center justify-center mr-3">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">AI Campaign Assistant</h3>
            <p className="text-sm text-gray-600">Describe your idea and we'll help structure your campaign</p>
          </div>
        </div>
        <form onSubmit={handleAiHelp} className="flex gap-3">
          <Input 
            placeholder="Describe your campaign idea — we'll suggest title, goal, and story structure..." 
            value={aiInput} 
            onChange={(e) => setAiInput(e.target.value)} 
            disabled={isAiLoading} 
            className="flex-1 border-orange-200 focus:border-orange-300" 
          />
          <Button type="submit" disabled={isAiLoading || !aiInput.trim()} className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600">
            {isAiLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            {isAiLoading ? "Thinking..." : "Ask AI"}
          </Button>
        </form>
      </div>
      
      <div className="bg-white rounded-xl shadow-lg border-0 p-6">
        <div className="mb-6">
          <h2 className="text-xl font-bold">Campaign Basics</h2>
          <p className="text-gray-600">Let's start with the essential details</p>
        </div>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Campaign Title *</Label>
            <Input id="title" placeholder="Give your campaign a clear, compelling title" value={data.title} onChange={(e) => handleInputChange("title", e.target.value)} className="text-lg h-12" />
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="goal_amount">Fundraising Goal (₹) *</Label>
              <div className="relative">
                <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input id="goal_amount" type="number" placeholder="100000" value={data.goal_amount} onChange={(e) => handleInputChange("goal_amount", e.target.value)} className="pl-10 h-12" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <select 
                id="category" 
                value={data.category} 
                onChange={(e) => handleInputChange("category", e.target.value)}
                className="w-full h-12 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="">Select category</option>
                {categories.map((c) => 
                  <option key={c.value} value={c.value}>{c.label}</option>
                )}
              </select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="location">Location *</Label>
            <Input id="location" placeholder="City, State" value={data.location} onChange={(e) => handleInputChange("location", e.target.value)} className="h-12" />
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="organizer_name">Your Name *</Label>
              <Input id="organizer_name" placeholder="Organizer name" value={data.organizer_name} onChange={(e) => handleInputChange("organizer_name", e.target.value)} className="h-12" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="organizer_relation">Your Relationship</Label>
              <Input id="organizer_relation" placeholder="e.g., Father, Friend, Self" value={data.organizer_relation} onChange={(e) => handleInputChange("organizer_relation", e.target.value)} className="h-12" />
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="beneficiary_name">Beneficiary Name</Label>
              <Input id="beneficiary_name" placeholder="Who will benefit from this campaign?" value={data.beneficiary_name} onChange={(e) => handleInputChange("beneficiary_name", e.target.value)} className="h-12" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end_date">End Date (Optional)</Label>
              <Input id="end_date" type="date" value={data.end_date} onChange={(e) => handleInputChange("end_date", e.target.value)} className="h-12" />
            </div>
          </div>
          
          {data.ai_tips && (
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-3 flex items-center">
                <Sparkles className="w-4 h-4 mr-2" />AI Tips for Your Campaign:
              </h4>
              <ul className="text-sm text-blue-800 space-y-1">
                {data.ai_tips.map((tip, index) => <li key={index}>• {tip}</li>)}
              </ul>
              {data.ai_timeline && (
                <div className="mt-3 pt-3 border-t border-blue-200">
                  <p className="text-sm text-blue-800"><strong>Timeline Suggestion:</strong> {data.ai_timeline}</p>
                </div>
              )}
            </div>
          )}
          
          <div className="pt-6">
            <Button onClick={onNext} disabled={!isValid()} className="w-full md:w-auto bg-orange-600 hover:bg-orange-700 h-12 px-8">
              Continue to Story<ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};


// --- CampaignStory Component ---
const CampaignStory = ({ data, onUpdate, onNext, onPrev }) => {
  const handleInputChange = (field, value) => onUpdate({ [field]: value });
  const useAiStoryPoints = () => {
    if (data.ai_story_points) {
      const storyDraft = data.ai_story_points.join('\n\n');
      handleInputChange('description', storyDraft);
      toast.success("AI story points added to your description!");
    }
  };
  const isValid = () => data.description && data.description.length >= 100;
  return (
    <div className="bg-white rounded-xl shadow-lg border-0 p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold flex items-center">
          <FileText className="w-6 h-6 mr-2" />Tell Your Story
        </h2>
        <p className="text-gray-600">Share why this campaign matters and how donations will help</p>
      </div>
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="description">Campaign Story *</Label>
            {data.ai_story_points && (
              <Button type="button" variant="outline" size="sm" onClick={useAiStoryPoints} className="text-orange-600 border-orange-200 hover:bg-orange-50">
                <Copy className="w-4 h-4 mr-1" />Use AI Suggestions
              </Button>
            )}
          </div>
          <Textarea 
            id="description" 
            placeholder="Tell your story in detail. Explain..." 
            value={data.description} 
            onChange={(e) => handleInputChange("description", e.target.value)} 
            className="min-h-96 text-base leading-relaxed" 
          />
          <div className="flex justify-between items-center text-sm text-gray-500">
            <span>{data.description?.length || 0} characters</span>
            <span className={data.description?.length >= 100 ? "text-green-600" : "text-orange-600"}>
              Minimum 100 characters required
            </span>
          </div>
        </div>
        
        {data.ai_story_points && (
          <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-4 rounded-lg border border-orange-200">
            <h4 className="font-semibold text-orange-900 mb-3 flex items-center">
              <Sparkles className="w-4 h-4 mr-2" />AI-Generated Story Points:
            </h4>
            <div className="space-y-2">
              {data.ai_story_points.map((point, index) => 
                <div key={index} className="text-sm text-orange-800 bg-white/50 p-2 rounded">{point}</div>
              )}
            </div>
            <p className="text-xs text-orange-700 mt-2">Click "Use AI Suggestions" to add these points to your story, then customize as needed.</p>
          </div>
        )}
        
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-semibold text-blue-900 mb-2">Tips for a Great Story:</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Be honest and transparent about your situation</li>
            <li>• Include specific details about how donations will be used</li>
            <li>• Share personal experiences that connect with readers</li>
            <li>• Explain the urgency or importance of your cause</li>
            <li>• Thank your potential donors in advance</li>
          </ul>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 pt-6">
          <Button onClick={onPrev} variant="outline" className="h-12 px-8">
            <ArrowLeft className="w-5 h-5 mr-2" />Back to Basics
          </Button>
          <Button onClick={onNext} disabled={!isValid()} className="bg-orange-600 hover:bg-orange-700 h-12 px-8">
            Add Photos & Video<ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

// --- CampaignMedia Component ---
const CampaignMedia = ({ data, onUpdate, onNext, onPrev }) => {
  const [isUploading, setIsUploading] = useState(false);
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setIsUploading(true);
    try {
      const { file_url } = await UploadFile({ file });
      if (!data.image_url) { 
        onUpdate({ image_url: file_url }); 
      } else { 
        onUpdate({ gallery_urls: [...(data.gallery_urls || []), file_url] }); 
      }
    } catch (error) { console.error("Error uploading image:", error); }
    setIsUploading(false);
  };
  const removeImage = (index) => {
    if (index === -1) { 
      onUpdate({ image_url: data.gallery_urls?.[0] || "", gallery_urls: data.gallery_urls?.slice(1) || [] }); 
    }
    else { 
      onUpdate({ gallery_urls: data.gallery_urls.filter((_, i) => i !== index) }); 
    }
  };
  return (
    <div className="bg-white rounded-xl shadow-lg border-0 p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold flex items-center">
          <Image className="w-6 h-6 mr-2" />Add Photos & Video
        </h2>
        <p className="text-gray-600">Visual content helps donors connect with your cause</p>
      </div>
      <div className="space-y-6">
        <div className="space-y-4">
          <Label>Main Campaign Image</Label>
          {data.image_url ? (
            <div className="relative">
              <img src={data.image_url} alt="Campaign main image" className="w-full h-64 object-cover rounded-lg" />
              <Button onClick={() => removeImage(-1)} variant="destructive" size="icon" className="absolute top-2 right-2">
                <X className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-orange-300 transition-colors">
              <div className="flex flex-col items-center">
                <Upload className="w-12 h-12 text-gray-400 mb-4" />
                <Label htmlFor="main-image" className="cursor-pointer bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-medium">
                  {isUploading ? "Uploading..." : "Upload Main Image"}
                </Label>
                <Input id="main-image" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" disabled={isUploading} />
                <p className="text-sm text-gray-500 mt-2">Recommended: 1200x630px</p>
              </div>
            </div>
          )}
        </div>
        
        <div className="space-y-4">
          <Label>Additional Images (Optional)</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {data.gallery_urls?.map((url, index) => (
              <div key={index} className="relative">
                <img src={url} alt={`Gallery image ${index + 1}`} className="w-full h-32 object-cover rounded-lg" />
                <Button onClick={() => removeImage(index)} variant="destructive" size="icon" className="absolute top-1 right-1 w-6 h-6">
                  <X className="w-3 h-3" />
                </Button>
              </div>
            ))}
            {(!data.gallery_urls || data.gallery_urls.length < 5) && (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center hover:border-orange-300 transition-colors">
                <Label htmlFor="gallery-image" className="cursor-pointer flex flex-col items-center">
                  <Upload className="w-8 h-8 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-600">Add Photo</span>
                </Label>
                <Input id="gallery-image" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" disabled={isUploading} />
              </div>
            )}
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="video_url">Video URL (Optional)</Label>
          <div className="flex items-center space-x-2">
            <Video className="w-5 h-5 text-gray-400" />
            <Input id="video_url" type="url" placeholder="https://youtube.com/watch?v=..." value={data.video_url} onChange={(e) => onUpdate({ video_url: e.target.value })} className="h-12" />
          </div>
          <p className="text-sm text-gray-500">YouTube, Vimeo, or Google Drive links work best</p>
        </div>
        
        <div className="bg-yellow-50 p-4 rounded-lg">
          <h4 className="font-semibold text-yellow-900 mb-2">Photo Tips:</h4>
          <ul className="text-sm text-yellow-800 space-y-1">
            <li>• Use high-quality, clear images</li>
            <li>• Show the person or cause you're supporting</li>
          </ul>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 pt-6">
          <Button onClick={onPrev} variant="outline" className="h-12 px-8">
            <ArrowLeft className="w-5 h-5 mr-2" />Back to Story
          </Button>
          <Button onClick={onNext} className="bg-orange-600 hover:bg-orange-700 h-12 px-8">
            Review & Publish<ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

// --- CampaignReview Component ---
const categoryLabels = { medical: "Medical", education: "Education", emergency: "Emergency", community: "Community", animal_welfare: "Animal Welfare", environment: "Environment", disaster_relief: "Disaster Relief", sports: "Sports", creative: "Creative", memorial: "Memorial" };
const CampaignReview = ({ data, onSubmit, onPrev, isSubmitting }) => (
  <div className="space-y-6">
    <div className="bg-white rounded-xl shadow-lg border-0 p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold flex items-center">
          <CheckCircle className="w-6 h-6 mr-2" />Review Your Campaign
        </h2>
        <p className="text-gray-600">Double-check everything looks good before publishing</p>
      </div>
      <div className="space-y-6">
        <div className="border border-gray-200 rounded-xl overflow-hidden">
          {data.image_url && <img src={data.image_url} alt={data.title} className="w-full h-64 object-cover" />}
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">{data.title}</h2>
              <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-md text-sm font-medium">
                {categoryLabels[data.category]}
              </span>
            </div>
            <div className="grid md:grid-cols-2 gap-4 mb-6 text-sm text-gray-600">
              <div className="flex items-center">
                <IndianRupee className="w-4 h-4 mr-2" />Goal: ₹{parseInt(data.goal_amount).toLocaleString('en-IN')}
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />{data.location}
              </div>
              <div className="flex items-center">
                <UserIcon className="w-4 h-4 mr-2" />Organized by {data.organizer_name}
              </div>
              {data.end_date && (
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />Ends {format(new Date(data.end_date), "MMM d, yyyy")}
                </div>
              )}
            </div>
            <div className="prose max-w-none">
              <p className="text-gray-700 whitespace-pre-wrap">{data.description.slice(0, 200)}...</p>
            </div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Campaign Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Title:</span><span className="font-medium">{data.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Goal:</span><span className="font-medium">₹{parseInt(data.goal_amount).toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Category:</span><span className="font-medium">{categoryLabels[data.category]}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Location:</span><span className="font-medium">{data.location}</span>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Media & Content</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Main Image:</span><span className="font-medium">{data.image_url ? "✓ Added" : "✗ Not added"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Gallery:</span><span className="font-medium">{data.gallery_urls?.length || 0} photos</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Video:</span><span className="font-medium">{data.video_url ? "✓ Added" : "✗ Not added"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Story Length:</span><span className="font-medium">{data.description?.length || 0} characters</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div className="border border-orange-200 bg-orange-50 rounded-xl p-6">
      <h3 className="font-semibold text-orange-900 mb-3">Before You Publish:</h3>
      <ul className="space-y-2 text-sm text-orange-800">
        <li>• Your campaign will be reviewed for compliance within 24 hours</li>
        <li>• You can edit your campaign details after publishing</li>
      </ul>
    </div>
    
    <div className="flex flex-col sm:flex-row gap-4 pt-6">
      <Button onClick={onPrev} variant="outline" className="h-12 px-8" disabled={isSubmitting}>
        <ArrowLeft className="w-5 h-5 mr-2" />Back to Media
      </Button>
      <Button onClick={onSubmit} disabled={isSubmitting} className="bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 h-12 px-8 font-semibold">
        {isSubmitting ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            Publishing...
          </>
        ) : (
          <>
            <CheckCircle className="w-5 h-5 mr-2" />Publish Campaign
          </>
        )}
      </Button>
    </div>
  </div>
);

// --- Main CreatePage Component ---
const steps = [
  { title: "Basics", description: "Campaign details" }, { title: "Story", description: "Tell your story" },
  { title: "Media", description: "Add photos & video" }, { title: "Review", description: "Review & publish" }
];
export default function CreatePage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [campaignData, setCampaignData] = useState({
    title: "", description: "", goal_amount: "", category: "", location: "",
    organizer_name: "", organizer_relation: "", beneficiary_name: "", end_date: "",
    image_url: "", gallery_urls: [], video_url: "",
    ai_story_points: null, ai_tips: null, ai_timeline: null
  });

  const updateCampaignData = (data) => setCampaignData(prev => ({ ...prev, ...data }));
  const nextStep = () => { if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1); };
  const prevStep = () => { if (currentStep > 0) setCurrentStep(currentStep - 1); };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const user = await User.me();
      await Campaign.create({ ...campaignData, goal_amount: parseFloat(campaignData.goal_amount), created_by: user.email });
      navigate(createPageUrl("Home"));
    } catch (error) { console.error("Error creating campaign:", error); }
    setIsSubmitting(false);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0: return <CampaignBasics data={campaignData} onUpdate={updateCampaignData} onNext={nextStep} />;
      case 1: return <CampaignStory data={campaignData} onUpdate={updateCampaignData} onNext={nextStep} onPrev={prevStep} />;
      case 2: return <CampaignMedia data={campaignData} onUpdate={updateCampaignData} onNext={nextStep} onPrev={prevStep} />;
      case 3: return <CampaignReview data={campaignData} onSubmit={handleSubmit} onPrev={prevStep} isSubmitting={isSubmitting} />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="flex items-center mb-8">
          <Button variant="ghost" onClick={() => navigate(createPageUrl("Home"))} className="mr-4">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Start Your Campaign</h1>
            <p className="text-gray-600 mt-1">Create a fundraiser in just a few simple steps</p>
          </div>
        </motion.div>
        <StepIndicator steps={steps} currentStep={currentStep} />
        <motion.div key={currentStep} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="mt-8">
          {renderStep()}
        </motion.div>
      </div>
    </div>
  );
}
