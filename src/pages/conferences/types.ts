export interface Conference {
    id: number;
    name: string;
    start: string;
    end: string;
    description: string;
    visitorRatingSchemaId: number;
}

export interface ConferenceRequest {
    name: string;
    start: string;
    end: string;
    description: string;
    visitorRatingSchemaId: number;
}
