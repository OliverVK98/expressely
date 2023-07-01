import { ScrollSaveSchema } from './model/types/scrollSaveSchema';
import { getScrollSaveByPath } from './model/selectors/scrollSaveSelector';
import {
    scrollSaveActions,
    scrollSaveReducer,
} from './model/slices/scrollSaveSlice';

export {
    type ScrollSaveSchema,
    getScrollSaveByPath,
    scrollSaveActions,
    scrollSaveReducer,
};
