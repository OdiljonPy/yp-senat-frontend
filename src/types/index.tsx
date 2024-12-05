interface MenuItem {
  id: number;
  title: string;
  href: string;
  submenu?: {
    id: number;
    title: string;
    href: string;
    icon?: string;
  }[];
}

interface Slide {
  id: number;
  title: string;
  image: string;
  date: string;
  startDate: string;
}

interface SurveyResult {
  question: string;
  answers: {
    option: string;
    percentage: number;
    count: number;
  }[];
}

interface Survey {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  status: 'Faol' | 'Yakunlangan';
  hasResults: boolean;
  results?: {
    totalParticipants: number;
    questions: SurveyResult[];
  };
}

export interface PollItem {
  ended_at: string,
  id: number,
  link_to_poll: string,
  name: string,
  result: string,
  started_at: string,
  status: number
}
export interface PollResponse {
  result: {
    content: PollItem[]
    numberOfElements: number;
    totalElements: number;
    totalPages: number;
  }
}
interface Project {
  id: number;
  name: string;
  description: string;
  date: string;
  endDate: string;
  image: string;
}

interface ProjectsResponse {
  result: {
    content: Project[];
    numberOfElements: number;
    totalElements: number;
    totalPages: number;
  };
}

interface Region {
  id: number;
  name: string;
}

interface Content {
  id: number;
  commission_category: number;
  mandat: number;
  region: Region;
  full_name: string;
  image: string;
  description: string;
  phone_number: string;
  facebook: string;
  linkedin: string;
  twitter: string;
}

interface Result {
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
  content: Content[];
}

interface RegionResponse {
  result: Result;
  ok: boolean;
}

interface Commission {
  name: string,
  icon: string,
  id: number
}
interface CommissionResponse {
  result: Commission[]
}

interface MandatResponse {
  result: Region[],
  ok: boolean
}

interface CommissionMember {
  id: number;
  commission_category: number;
  mandat: number;
  region: Region;
  full_name: string;
  image: string;
  description: string;
  phone_number: string | null;
  facebook: string;
  linkedin: string;
  twitter: string;
}

interface CommissionContent {
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
  content: CommissionMember[];
}

interface CommissionRes {
  result: CommissionContent;
  ok: boolean;
}

interface Image {
  id: number;
  image: string;
}

interface AboutResult {
  id: number;
  name: string;
  description: string | null;
  images: Image[];
  members: CommissionMember[];
}

type AboutResponse = {
  result: AboutResult;
  ok: boolean;
};


export type {
  MenuItem,
  Slide,
  SurveyResult,
  Survey,
  ProjectsResponse,
  RegionResponse,
  CommissionResponse,
  CommissionRes,
  MandatResponse,
  AboutResponse,
  Region
};
