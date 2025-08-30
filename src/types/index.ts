export interface ApiProperty {
  _id: number;
  WinnersMeshapryDiur: number;
  WinnersHasryDiur: number;
  WinnersSeriesC: number;
  WinnersSeriesB: number;
  WinnersSeriesA: number;
  WinnersBneyMakom: string;
  Winners: number;
  SubscribersMeshapryDiur: number;
  SubscribersSeriesC: number;
  SubscribersSeriesB: number;
  SubscribersSeriesA: number;
  SubscribersDisabled: number;
  SubscribersBenyMakom: number;
  Subscribers: number;
  LotteryNativeHousingUnits: number;
  LotteryHousingUnits: number;
  LotterySignupNativeHousingUnits: string;
  LotterySignupHousingUnits: number;
  PriceForMeter: string;
  ConstructionPermitName: string;
  ProjectStatus: string;
  ProviderName: string;
  ProjectName: string;
  ProjectId: number;
  Neighborhood: string;
  LamasName: string;
  LamasCode: number;
  LotteryExecutionDate: string;
  LotteryEndSignupDate: string;
  LotteryStatusValue: string;
  Eligibility: string;
  MarketingRep: string;
  MarketingMethodDesc: string;
  MarketingMethod: number;
  CentralizationType: string;
  ContinLotteryId: string;
  ParentLotteryId: string;
  LotteryType: string;
  LotteryId: number;
  rank: number;
}

export interface Property {
  id: number;
  name: string;
  city: string;
  neighborhood: string;
  pricePerMeter: number;
  totalUnits: number;
  totalSubscribers: number;
  totalWinners: number;
  competitionRatio: number;
  status: string;
  provider: string;
  lotteryDate: string;
  signupDeadline: string;
  constructionPermit: string;
  eligibility: string;
  marketingMethod: string;
  coordinates: [number, number];
}

export interface FilterState {
  selectedCity: string;
  maxPrice: string;
  selectedStatus: string[];
  selectedConstructionPermits: string[];
  selectedEligibilityTypes: string[];
  searchQuery: string;
}

export interface MapMarker {
  id: number;
  position: [number, number];
  property: Property;
}

export interface CompetitionLevel {
  level: 'low' | 'medium' | 'high';
  minRatio: number;
  maxRatio: number;
  color: string;
  label: string;
}

export interface ProjectStats {
  totalProjects: number;
  totalUnits: number;
  totalSubscribers: number;
  totalWinners: number;
  averagePrice: number;
  averageCompetitionRatio: number;
  filteredCount: number;
}
