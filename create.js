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
 
