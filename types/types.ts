export interface ExploreData {
    id: string;
    user: {
      profilePicture: string;
      username: string;
      xAccountVerified: boolean;
    };
    title: string;
    tags: string[];
    bountySubmissions: { length: number }[];
    deadline: string;
    remainingAmount: number;
  }
  