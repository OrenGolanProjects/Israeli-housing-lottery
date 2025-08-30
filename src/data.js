// Real API data structure from data.gov.il
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
    PriceForMeter: string; // comes as "15,500.00"
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
  
  // Processed property for UI display
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
  }
  
  // Function to convert API data to display format
  export const convertApiProperty = (apiProp: ApiProperty): Property => {
    // Convert price from "15,500.00" to number
    const pricePerMeter = parseFloat(apiProp.PriceForMeter.replace(/,/g, ''));
    
    // Calculate competition ratio
    const competitionRatio = apiProp.Subscribers > 0 ? 
      parseFloat((apiProp.Subscribers / apiProp.Winners).toFixed(1)) : 0;
  
    return {
      id: apiProp._id,
      name: apiProp.ProjectName,
      city: apiProp.LamasName,
      neighborhood: apiProp.Neighborhood,
      pricePerMeter,
      totalUnits: apiProp.LotteryHousingUnits,
      totalSubscribers: apiProp.Subscribers,
      totalWinners: apiProp.Winners,
      competitionRatio,
      status: apiProp.ProjectStatus,
      provider: apiProp.ProviderName,
      lotteryDate: apiProp.LotteryExecutionDate.split(' ')[0], // Extract date part
      signupDeadline: apiProp.LotteryEndSignupDate.split(' ')[0],
      constructionPermit: apiProp.ConstructionPermitName,
      eligibility: apiProp.Eligibility,
      marketingMethod: apiProp.MarketingMethodDesc,
    };
  };
  
  // Sample real data from your API response
  const sampleApiData: ApiProperty[] = [
    {
      "_id": 161,
      "WinnersMeshapryDiur": 0,
      "WinnersHasryDiur": 81,
      "WinnersSeriesC": 0,
      "WinnersSeriesB": 0,
      "WinnersSeriesA": 81,
      "WinnersBneyMakom": "41",
      "Winners": 81,
      "SubscribersMeshapryDiur": 0,
      "SubscribersSeriesC": 0,
      "SubscribersSeriesB": 0,
      "SubscribersSeriesA": 29450,
      "SubscribersDisabled": 15,
      "SubscribersBenyMakom": 8717,
      "Subscribers": 29450,
      "LotteryNativeHousingUnits": 28,
      "LotteryHousingUnits": 81,
      "LotterySignupNativeHousingUnits": "28",
      "LotterySignupHousingUnits": 81,
      "PriceForMeter": "15,500.00",
      "ConstructionPermitName": "החלטת ועדה (היתר בתנאים)",
      "ProjectStatus": "בתהליכי הגרלה",
      "ProviderName": "אלעד ישראל מגורים בע\"מ",
      "ProjectName": "מגרשים 101",
      "ProjectId": 135,
      "Neighborhood": "ק. שלום-מתחם ברנר",
      "LamasName": "תל אביב -יפו",
      "LamasCode": 5000,
      "LotteryExecutionDate": "2024-07-17 09:57:53",
      "LotteryEndSignupDate": "2024-08-07 00:00:00",
      "LotteryStatusValue": "פורסמו תוצאות",
      "Eligibility": "לא מוגדר",
      "MarketingRep": "רמ\"י",
      "MarketingMethodDesc": "מחיר למשתכן",
      "MarketingMethod": 19,
      "CentralizationType": "הגרלה גדולה - מאי 2024",
      "ContinLotteryId": "-",
      "ParentLotteryId": "-",
      "LotteryType": "ראשונה",
      "LotteryId": 2399,
      "rank": 0.09016734
    },
    {
      "_id": 691,
      "WinnersMeshapryDiur": 0,
      "WinnersHasryDiur": 163,
      "WinnersSeriesC": 0,
      "WinnersSeriesB": 0,
      "WinnersSeriesA": 163,
      "WinnersBneyMakom": "98",
      "Winners": 163,
      "SubscribersMeshapryDiur": 0,
      "SubscribersSeriesC": 0,
      "SubscribersSeriesB": 0,
      "SubscribersSeriesA": 23477,
      "SubscribersDisabled": 13,
      "SubscribersBenyMakom": 9981,
      "Subscribers": 23477,
      "LotteryNativeHousingUnits": 22,
      "LotteryHousingUnits": 153,
      "LotterySignupNativeHousingUnits": "22",
      "LotterySignupHousingUnits": 153,
      "PriceForMeter": "14,900.00",
      "ConstructionPermitName": "היתר מלא",
      "ProjectStatus": "בתהליכי הגרלה",
      "ProviderName": "אקרו יסודות בעיר 2018, שותפות מוגבל",
      "ProjectName": "מכבי יפו מתחם ג",
      "ProjectId": 51600,
      "Neighborhood": "ק. שלום-מתחם ברנר",
      "LamasName": "תל אביב -יפו",
      "LamasCode": 5000,
      "LotteryExecutionDate": "2022-04-26 13:22:26",
      "LotteryEndSignupDate": "2022-10-04 00:00:00",
      "LotteryStatusValue": "פורסמו תוצאות",
      "Eligibility": "א+ב+ג",
      "MarketingRep": "רמ\"י",
      "MarketingMethodDesc": "מחיר למשתכן",
      "MarketingMethod": 19,
      "CentralizationType": "הגרלה גדולה מרץ 2022",
      "ContinLotteryId": "-",
      "ParentLotteryId": "-",
      "LotteryType": "ראשונה",
      "LotteryId": 1845,
      "rank": 0.09016734
    },
    {
      "_id": 1389,
      "WinnersMeshapryDiur": 0,
      "WinnersHasryDiur": 182,
      "WinnersSeriesC": 13,
      "WinnersSeriesB": 0,
      "WinnersSeriesA": 169,
      "WinnersBneyMakom": "145",
      "Winners": 182,
      "SubscribersMeshapryDiur": 0,
      "SubscribersSeriesC": 4526,
      "SubscribersSeriesB": 2990,
      "SubscribersSeriesA": 1142,
      "SubscribersDisabled": 0,
      "SubscribersBenyMakom": 3477,
      "Subscribers": 8658,
      "LotteryNativeHousingUnits": 85,
      "LotteryHousingUnits": 199,
      "LotterySignupNativeHousingUnits": "85",
      "LotterySignupHousingUnits": 199,
      "PriceForMeter": "15,500.00",
      "ConstructionPermitName": "טרם הוגשה בקשה",
      "ProjectStatus": "בתהליכי הגרלה",
      "ProviderName": "אלעד ישראל מגורים בע\"מ",
      "ProjectName": "מגרשים 102,103,104,105,113,116,117",
      "ProjectId": 134,
      "Neighborhood": "ק. שלום-מתחם ברנר",
      "LamasName": "תל אביב -יפו",
      "LamasCode": 5000,
      "LotteryExecutionDate": "2019-05-19 10:57:39",
      "LotteryEndSignupDate": "2019-11-05 00:00:00",
      "LotteryStatusValue": "פורסמו תוצאות",
      "Eligibility": "א+ב+ג",
      "MarketingRep": "רמ\"י",
      "MarketingMethodDesc": "מחיר למשתכן",
      "MarketingMethod": 19,
      "CentralizationType": "מרץ 2019",
      "ContinLotteryId": "-",
      "ParentLotteryId": "-",
      "LotteryType": "ראשונה",
      "LotteryId": 1131,
      "rank": 0.09016734
    }
  ];
  
  // Convert sample data to display format
  export const sampleProperties: Property[] = sampleApiData.map(convertApiProperty);
  
  // Extract unique values for filters
  export const cities = Array.from(new Set(sampleProperties.map(p => p.city)));
  export const statuses = Array.from(new Set(sampleProperties.map(p => p.status)));
  export const constructionPermits = Array.from(new Set(sampleProperties.map(p => p.constructionPermit)));
  export const eligibilityTypes = Array.from(new Set(sampleProperties.map(p => p.eligibility)));
  
  // API endpoint configuration
  export const API_CONFIG = {
    baseUrl: "https://data.gov.il/api/3/action/datastore_search",
    resourceId: "7c8255d0-49ef-49db-8904-4cf917586031",
    defaultLimit: 100
  };