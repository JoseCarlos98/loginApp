

export interface Origin {
    branchId:    string;
    createdById: string;
    createdAt:   Date;
    name:        string;
    id:          string;
    branch?:      Branch;
}

export interface Branch {
    name:     string;
    nickname: string;
    color:    string;
    id:       string;
}
