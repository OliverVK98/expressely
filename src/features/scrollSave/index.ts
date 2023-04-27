import { ScrollSaveSchema } from 'features/scrollSave/model/types/scrollSaveSchema';
import { getScrollSaveByPath } from 'features/scrollSave/model/selectors/scrollSaveSelector';
import {
    scrollSaveActions,
    scrollSaveReducer,
} from 'features/scrollSave/model/slices/scrollSaveSlice';

export {
    ScrollSaveSchema,
    getScrollSaveByPath,
    scrollSaveActions,
    scrollSaveReducer,
};
