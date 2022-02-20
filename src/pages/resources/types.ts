export interface Resource {
    id: number;
    name: string;
    identifier: string;
    description: string;
    resourceType: ResourceType;
}

export interface ResourceRequest {
    name: string;
    identifier: string;
    description: string;
    resourceTypeId: number;
}

export interface ResourceType {
    id: number;
    name: string;
}
