import { User } from '../../../../../common/types';
import { Location } from '../../../../locations/types';

export interface Session {
    id: number;
    name: string;
    start: string;
    end: string;
    active: boolean;
    conferenceId: number;
    moderator: User;
}

export interface SessionRequest {
    name: string;
    start: string;
    end: string;
    active: boolean;
    conferenceId: number;
    moderatorId: number;
}

export interface Event {
    id: number;
    name: string;
    active: boolean;
    start: string;
    end: string;
    accessCode: string;
    location: Location;
    sessionId: number;
    moderator: User;
    eventType: EventType;
}

export interface EventRequest {
    name: string;
    active: boolean;
    start: string;
    end: string;
    accessCode: string;
    locationId: number;
    sessionId: number;
    moderatorId: number;
    eventTypeId: number;
}

export interface EventType {
    id: number;
    name: string;
}

export interface EventTypeRequest {
    name: string;
}
