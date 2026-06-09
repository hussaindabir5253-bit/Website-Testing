export interface SpecItem {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  model: string;
  category: string;
  brand: string;
  description: string;
  specs?: SpecItem[];
  iconType: "wrench" | "drill" | "shield" | "ruler" | "screw" | "welder";
  isFeatured?: boolean;
  material: string;
  certification?: string;
  popularityRating: number;
  priceAED: number;
}

export interface QuoteItem {
  product: Product;
  quantity: number;
  notes?: string;
}

export interface QuoteInquiry {
  id: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  projectDeadline?: string;
  projectLocation?: string;
  urgency: "low" | "medium" | "high";
  comments?: string;
  items: QuoteItem[];
  timestamp: string;
  status: "pending" | "reviewed" | "approved" | "completed";
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  itemCount: number;
  iconType: "wrench" | "drill" | "shield" | "ruler" | "screw" | "welder";
  accentColor: string;
}

export interface ToolPart3D {
  name: string;
  color: string;
  translate: [number, number, number];
  rotate: [number, number, number];
  scale: [number, number, number];
  shape: "cylinder" | "box" | "sphere" | "torus" | "hex";
  radius?: number;
  height?: number;
  length?: number;
  width?: number;
  depth?: number;
  label: string;
}

export interface ToolConfig3D {
  name: string;
  type: string;
  parts: ToolPart3D[];
  technicalSpecs: { [key: string]: string };
}
