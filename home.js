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
      <div className="absolute inset-0 bg-gradient-to-br from-orange-100 via-white to-blue-100"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,107,53,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(30,64,175,0.08),transparent_50%)]"></div>
    </div>
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="text-center lg:text-left">
          <div className="inline-flex items-center px-4 py-2 bg-orange-100 rounded-full text-orange-700 text-sm font-medium mb-6">
            <Heart className="w-4 h-4 mr-2" />
            Trusted by 1M+ Indians
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 leading-tight">
            Fund Dreams,
            <span className="block bg-gradient-to-r from-orange-600 to-orange-800 bg-clip-text text-transparent pb-4">
              Change Lives
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-xl">
            India's most trusted crowdfunding platform. Raise funds for medical emergencies, education, community projects, and more. Start making a difference today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link to={createPageUrl("Create")}>
              <Button size="lg" className="bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-semibold px-8 py-3 shadow-lg">
                <Plus className="w-5 h-5 mr-2" />
                Start Your Campaign
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to={createPageUrl("Browse")}>
              <Button size="lg" variant="outline" className="border-gray-300 hover:border-orange-300 hover:text-orange-600 font-semibold px-8 py-3">
                Explore Campaigns
              </Button>
            </Link>
          </div>
          <div className="flex flex-wrap items-center gap-6 mt-8 text-sm text-gray-500">
            <div className="flex items-center"><div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>Secure Payments</div>
            <div className="flex items-center"><div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>Zero Platform Fee</div>
            <div className="flex items-center"><div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>24/7 Support</div>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative">
          <div className="relative">
            <img src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" alt="Helping hands" className="w-full h-96 object-cover rounded-2xl shadow-2xl" />
            <div className="absolute -top-4 -left-4 bg-white p-4 rounded-xl shadow-lg border border-orange-100">
              <div className="flex items-center space-x-3"><div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center"><span className="text-green-600 font-bold text-sm">₹</span></div><div><p className="text-sm text-gray-500">Funds Raised</p><p className="font-bold text-gray-900">₹2.5Cr+</p></div></div>
            </div>
            <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-xl shadow-lg border border-blue-100">
              <div className="flex items-center space-x-3"><div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center"><Heart className="w-5 h-5 text-blue-600" /></div><div><p className="text-sm text-gray-500">Lives Impacted</p><p className="font-bold text-gray-900">50,000+</p></div></div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

// --- StatsSection Component ---
const stats = [
  { icon: Heart, value: "₹2.5Cr+", label: "Funds Raised", color: "text-red-600 bg-red-100" },
  { icon: Users, value: "1M+", label: "Donors", color: "text-blue-600 bg-blue-100" },
  { icon: TrendingUp, value: "50K+", label: "Lives Impacted", color: "text-green-600 bg-green-100" },
  { icon: Award, value: "15K+", label: "Successful Campaigns", color: "text-purple-600 bg-purple-100" }
];
const StatsSection = () => (
  <section className="py-16 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} viewport={{ once: true }} className="text-center">
            <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl ${stat.color} flex items-center justify-center`}><stat.icon className="w-8 h-8" /></div>
            <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
            <div className="text-gray-600 font-medium">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// --- FeaturedCampaigns Component ---
const FeaturedCampaigns = ({ campaigns, isLoading }) => (
  <section className="py-20 bg-gradient-to-b from-white to-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Campaigns</h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">Discover inspiring stories and help make a difference in people's lives</p>
      </motion.div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {isLoading ? (
          Array(6).fill(0).map((_, index) => <CampaignCardSkeleton key={index} />)
        ) : campaigns.length > 0 ? (
          campaigns.map((campaign, index) => (
            <motion.div key={campaign.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} viewport={{ once: true }}>
              <CampaignCard campaign={campaign} />
            </motion.div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500 text-lg mb-6">No featured campaigns yet</p>
            <Link to={createPageUrl("Create")}><Button className="bg-orange-600 hover:bg-orange-700">Start the First Campaign</Button></Link>
          </div>
        )}
      </div>
      {campaigns.length > 0 && (
        <div className="text-center">
          <Link to={createPageUrl("Browse")}><Button variant="outline" size="lg" className="border-orange-200 hover:border-orange-300 hover:text-orange-600">View All Campaigns<ArrowRight className="w-5 h-5 ml-2" /></Button></Link>
        </div>
      )}
    </div>
  </section>
);

// --- CategoryGrid Component ---
const categories = [
  { name: "Medical", icon: Stethoscope, color: "from-red-500 to-red-600", bgColor: "bg-red-50 hover:bg-red-100", description: "Healthcare & Emergency Treatment" },
  { name: "Education", icon: GraduationCap, color: "from-blue-500 to-blue-600", bgColor: "bg-blue-50 hover:bg-blue-100", description: "Learning & Skill Development" },
  { name: "Emergency", icon: AlertTriangle, color: "from-orange-500 to-orange-600", bgColor: "bg-orange-50 hover:bg-orange-100", description: "Urgent Financial Support" },
  { name: "Community", icon: Users, color: "from-purple-500 to-purple-600", bgColor: "bg-purple-50 hover:bg-purple-100", description: "Social & Community Projects" },
  { name: "Animal Welfare", icon: Heart, color: "from-pink-500 to-pink-600", bgColor: "bg-pink-50 hover:bg-pink-100", description: "Animal Care & Rescue" },
  { name: "Environment", icon: Leaf, color: "from-green-500 to-green-600", bgColor: "bg-green-50 hover:bg-green-100", description: "Environmental Conservation" },
  { name: "Disaster Relief", icon: Zap, color: "from-yellow-500 to-yellow-600", bgColor: "bg-yellow-50 hover:bg-yellow-100", description: "Natural Disaster Support" },
  { name: "Sports", icon: Trophy, color: "from-indigo-500 to-indigo-600", bgColor: "bg-indigo-50 hover:bg-indigo-100", description: "Sports & Athletics" },
  { name: "Creative", icon: Palette, color: "from-teal-500 to-teal-600", bgColor: "bg-teal-50 hover:bg-teal-100", description: "Arts & Creative Projects" },
  { name: "Memorial", icon: HeartHandshake, color: "from-gray-500 to-gray-600", bgColor: "bg-gray-50 hover:bg-gray-100", description: "Memorial & Tribute Funds" }
];
const CategoryGrid = () => (
  <section className="py-20 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Browse by Category</h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">Find campaigns that matter to you across various causes and communities</p>
      </motion.div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {categories.map((category, index) => (
          <motion.div key={category.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.05 }} viewport={{ once: true }}>
            <Link to={`${createPageUrl("Browse")}?category=${category.name.toLowerCase().replace(' ', '_')}`} className={`block p-6 rounded-2xl ${category.bgColor} transition-all duration-300 hover:scale-105 hover:shadow-lg group`}>
              <div className={`w-12 h-12 mx-auto mb-4 bg-gradient-to-r ${category.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}><category.icon className="w-6 h-6 text-white" /></div>
              <h3 className="font-semibold text-gray-900 text-center mb-2">{category.name}</h3>
              <p className="text-sm text-gray-600 text-center">{category.description}</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// --- HowItWorks Component ---
const howItWorksSteps = [
  { icon: Plus, title: "Start Your Campaign", description: "Create your campaign in minutes with our easy setup process. Share your story and set your goal.", color: "from-blue-500 to-blue-600" },
  { icon: Share2, title: "Share with Network", description: "Spread the word through social media, WhatsApp, and email to reach friends, family, and supporters.", color: "from-green-500 to-green-600" },
  { icon: Heart, title: "Receive Donations", description: "Accept donations securely through UPI, cards, and other popular Indian payment methods.", color: "from-red-500 to-red-600" },
  { icon: CheckCircle, title: "Withdraw Funds", description: "Access your funds quickly and use them for your cause. Keep donors updated with regular updates.", color: "from-purple-500 to-purple-600" }
];
const HowItWorks = () => (
  <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">Start fundraising in just a few simple steps. No hidden fees, no complicated process.</p>
      </motion.div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {howItWorksSteps.map((step, index) => (
          <motion.div key={step.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} viewport={{ once: true }} className="text-center group">
            <div className="relative mb-6">
              <div className={`w-16 h-16 mx-auto bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}><step.icon className="w-8 h-8 text-white" /></div>
              {index < howItWorksSteps.length - 1 && (<div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-gray-300 to-transparent transform -translate-x-8"></div>)}
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-bold">{index + 1}</div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
            <p className="text-gray-600">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);


// --- Main HomePage Component ---
export default function HomePage() {
  const [featuredCampaigns, setFeaturedCampaigns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadFeaturedCampaigns();
  }, []);

  const loadFeaturedCampaigns = async () => {
    try {
      const campaigns = await Campaign.filter({ is_featured: true }, '-created_date', 6);
      setFeaturedCampaigns(campaigns);
    } catch (error) {
      console.error("Error loading featured campaigns:", error);
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen">
      <HeroSection />
      
      <StatsSection />
      
      <FeaturedCampaigns campaigns={featuredCampaigns} isLoading={isLoading} />
      
      <CategoryGrid />
      
      <HowItWorks />
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-orange-700">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Make a Difference?
            </h2>
            <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
              Join thousands of Indians who are changing lives through the power of giving.
              Start your campaign today or support a cause you care about.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={createPageUrl("Create")}>
                <Button size="lg" className="bg-white text-orange-600 hover:bg-orange-50 font-semibold px-8 py-3">
                  <Plus className="w-5 h-5 mr-2" />
                  Start a Campaign
                </Button>
              </Link>
              <Link to={createPageUrl("Browse")}>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-orange-600 font-semibold px-8 py-3">
                  <Search className="w-5 h-5 mr-2" />
                  Browse Campaigns
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
