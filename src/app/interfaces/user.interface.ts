export interface authResponse {
    id:      string;
    ttl:     number;
    created: Date;
    userId:  string;
}


export interface UserAuthenticate {
    id:      string;
    ttl:     number;
    created: Date;
    userId:  string;
    user:    User;
}

export interface User {
    name:                string;
    role:                string;
    fmoAccess:           string;
    cashRegisterType:    string;
    isTesting:           boolean;
    birthday:            Date;
    branchIds:           string[];
    shortCuts:           any[];
    personalInfo:        PersonalInfo;
    contractPermissions: ContractPermissions;
    isActive:            boolean;
    isCompanyAdmin:      boolean;
    plantId:             null;
    hasCard:             boolean;
    isFarmPurchases:     boolean;
    passwordStatus:      string;
    phone:               string;
    username:            string;
    email:               string;
    id:                  string;
    iosAppLink:          null;
    prevBranch:          string;
    newPassword:         boolean;
    isOwndeals:          string;
    isNew:               boolean;
    category:            string;
    lastConection:       Date;
}

export interface ContractPermissions {
    create: boolean;
    read:   boolean;
    update: boolean;
    delete: boolean;
}

export interface PersonalInfo {
    department:        string;
    location:          string;
    employeeNumber:    string;
    addressStreetLine: string;
    city:              string;
    postalCode:        string;
    province:          string;
    country:           string;
    dateofJoining:     string;
    positionTitle:     string;
    employeeType:      string;
}
