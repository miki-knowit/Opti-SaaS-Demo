import { StartPageDocument } from '~/graphql/generated';
import { runGraphQuery } from '../utils/optimizely-graph';

export default defineEventHandler(async () => {
    return await runGraphQuery(StartPageDocument, {});
});
