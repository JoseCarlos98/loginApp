export interface Branch {
    name:     string;
    nickname?: string;
    color?:    string;
    id?:       string;
}

export interface Origin {
    branchId:    string;
    createdById: string;
    createdAt:   Date;
    name:        string;
    id:          string;
}

export interface Query {
    name:        string;
}

