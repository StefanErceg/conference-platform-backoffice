import { useState } from 'react';

export type SortDirection = 'asc' | 'desc';

export interface SortingProps {
    sortProperty: string;
    sortDirection: SortDirection;
    changeProperty: (property: string) => void;
    toggleDirection: () => void;
}

export function useSorting(defaultProperty: string = 'id', defaultDirection: SortDirection = 'asc'): SortingProps {
    const [sortProperty, setSortProperty] = useState<string>(defaultProperty);
    const [sortDirection, setSortDirection] = useState<SortDirection>(defaultDirection);

    const changeProperty = (property: string) => {
        setSortProperty(property);
        setSortDirection(defaultDirection);
    };

    const toggleDirection = () => {
        setSortDirection((direction) => (direction === 'asc' ? 'desc' : 'asc'));
    };

    return { sortProperty, sortDirection, changeProperty, toggleDirection };
}
