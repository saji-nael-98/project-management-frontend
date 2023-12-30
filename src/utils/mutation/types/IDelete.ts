import { RESOURCES, RESOURCES_TYPE } from 'utils/constant';

interface UseDelete {
    type: RESOURCES_TYPE
}

export interface UseDeleteResource extends UseDelete {
    type: 'resource';
    resource: keyof typeof RESOURCES;
}

