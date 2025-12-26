import { onFlow, noAuth } from '@genkit-ai/firebase/functions'
import { m2_3mFlow, researchDataFlow } from '../../lib/m2-3m-genkit'
import { omnicogFlow } from '../../lib/omnicog-genkit'
import { wellnessFlow } from '../../lib/wellness-genkit'
import { tutorFlow } from '../../lib/ai-tutor-genkit'
import { telemedicineFlow } from '../../lib/telemedicine-genkit'
import { healthcareEcosystemFlow } from '../../lib/healthcare-ecosystem-genkit'
import { educationalSystemFlow } from '../../lib/educational-system-genkit'
import { aiAgentGlobeFlow } from '../../lib/ai-agent-globe-genkit'
import { databaseMaestroFlow } from '../../lib/database-maestro-genkit'
import { globalHubExplorerFlow } from '../../lib/global-hub-explorer-genkit'
import { manusRegistryFlow } from '../../lib/manus-registry-genkit'
import { processHubRequest } from '../../lib/hub-coordinator'

// Deploy all hub flows as Firebase Functions
export const m2_3mFunction = onFlow({ name: 'm2_3mResearch', authPolicy: noAuth() }, m2_3mFlow)
export const omnicogFunction = onFlow({ name: 'omnicogCoordination', authPolicy: noAuth() }, omnicogFlow)
export const wellnessFunction = onFlow({ name: 'wellnessAnalysis', authPolicy: noAuth() }, wellnessFlow)
export const tutorFunction = onFlow({ name: 'aiTutoring', authPolicy: noAuth() }, tutorFlow)
export const telemedicineFunction = onFlow({ name: 'telemedicineConsultation', authPolicy: noAuth() }, telemedicineFlow)
export const healthcareFunction = onFlow({ name: 'healthcareEcosystem', authPolicy: noAuth() }, healthcareEcosystemFlow)
export const educationFunction = onFlow({ name: 'educationalSystem', authPolicy: noAuth() }, educationalSystemFlow)
export const aiGlobeFunction = onFlow({ name: 'aiAgentGlobe', authPolicy: noAuth() }, aiAgentGlobeFlow)
export const databaseFunction = onFlow({ name: 'databaseMaestro', authPolicy: noAuth() }, databaseMaestroFlow)
export const hubExplorerFunction = onFlow({ name: 'globalHubExplorer', authPolicy: noAuth() }, globalHubExplorerFlow)
export const manusFunction = onFlow({ name: 'manusRegistry', authPolicy: noAuth() }, manusRegistryFlow)

// Unified hub coordinator function
export const hubCoordinatorFunction = onFlow(
  { name: 'hubCoordinator', authPolicy: noAuth() },
  async (request) => processHubRequest(request)
)