// ============================================================
// Data model types matching SPEC-V2 entities exactly
// ============================================================

export interface SellingPoint {
  id: string;
  name: string; // e.g. "Speed", "Price", "Ease of use", "Social proof", "Security"
  description?: string;
}

export interface AudienceSegment {
  id: string;
  name: string;
  channel: Channel;
  targeting_type: "keyword" | "interest" | "retargeting" | "lookalike";
  keyword: string | null; // nullable for non-search
}

export type Channel = "search" | "meta" | "youtube" | "linkedin";

export interface AdVariant {
  id: string;
  audience_segment_id: string;
  channel: Channel;
  headline: string;
  body_copy: string;
  cta_label: string;
  asset_url: string | null;
  selling_points: string[]; // selling point IDs
  impressions: number;
  clicks: number;
  ctr: number;
  created_at: string;
  updated_at: string;
}

export interface ValueProp {
  text: string;
  fold_position: "above" | "below";
}

export interface LandingPageVariant {
  id: string;
  url: string;
  utm_params: Record<string, string>;
  hero_headline: string;
  subheadline: string;
  cta_label: string;
  value_props: ValueProp[];
  selling_points: string[]; // selling point IDs
  created_at: string;
  updated_at: string;
}

export interface LPSession {
  id: string;
  lp_variant_id: string;
  audience_segment_id: string;
  session_duration_s: number;
  scroll_depth_pct: number;
  bounced: boolean;
  cta_clicked: boolean;
  converted: boolean;
  timestamp: string;
}

export interface OnboardingStep {
  headline: string;
  copy: string;
  selling_points: string[];
}

export interface OnboardingVariant {
  id: string;
  welcome_copy: string;
  steps: OnboardingStep[];
  selling_points: string[]; // aggregate
  created_at: string;
  updated_at: string;
}

export interface UserOnboardingEvent {
  id: string;
  user_id: string;
  ad_variant_id: string;
  lp_variant_id: string;
  onboarding_variant_id: string | null;
  signup_ts: string;
  day2_returned: boolean;
}

export interface FunnelPath {
  id: string;
  audience_segment_id: string;
  ad_variant_id: string;
  lp_variant_id: string;
  onboarding_variant_id: string | null;
  consistency_score: number | null; // 0-100
  created_at: string;
  updated_at: string;
}

// ============================================================
// Computed / view types
// ============================================================

export type SellingPointPresence = "above_fold" | "below_fold" | "absent";

export interface StageConsistency {
  selling_point_id: string;
  selling_point_name: string;
  ad_presence: boolean;
  lp_presence: SellingPointPresence;
  onboarding_presence: SellingPointPresence;
}

export interface ConsistencyRow {
  audience: AudienceSegment;
  channel: Channel;
  selling_point: SellingPoint;
  ad_variant: AdVariant;
  lp_variant: LandingPageVariant | null;
  onboarding_variant: OnboardingVariant | null;
  ad_to_lp_score: number; // 0-100
  lp_to_onboarding_score: number; // 0-100
  overall_score: number; // 0-100
  last_updated: string;
}

export interface FunnelMetricsRow {
  audience_name: string;
  audience_id: string;
  channel: Channel;
  keyword_or_adset: string;
  impressions: number;
  clicks: number;
  ctr: number;
  ctr_delta: number; // vs average
  sessions: number;
  avg_session_duration: number;
  scroll_depth: number;
  bounce_rate: number;
  cta_click_rate: number;
  conversions: number;
  cvr: number;
  cvr_delta: number;
  signups: number;
  day2_returnees: number;
  day2_rate: number;
  day2_delta: number;
  consistency_score: number | null;
  funnel_path_id: string | null;
}

export interface GlobalFilters {
  audience: string; // "all" or audience segment ID
  channel: string; // "all" or channel name
  sellingPoint: string; // "all" or selling point ID
  dateRange: "7d" | "30d" | "90d" | "custom";
  dateFrom?: string;
  dateTo?: string;
}

// LP Scraper types
export interface ScrapedLPContent {
  url: string;
  hero_headline: string;
  subheadline: string;
  cta_label: string;
  value_props: ValueProp[];
  selling_points: string[];
  raw_text?: string;
}
