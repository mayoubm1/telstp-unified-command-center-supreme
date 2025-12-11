// M2-3M Firebase Genkit Integration
// Real-time connection to Firebase Firestore and Genkit AI

import { db, functions } from './lib/firebase';
import { collection, doc, getDoc, getDocs, query, where, orderBy } from 'firebase/firestore';
import { httpsCallable } from 'firebase/functions';

interface ResearchProject {
  id: string;
  title: string;
  status: 'Active' | 'Completed' | 'Paused';
  progress: number;
  lead_researcher: string;
  team_members: string[];
  budget_allocated: number;
  budget_used: number;
  next_milestone: string;
  collaboration_partners: string[];
  created_at: Date;
  last_updated: Date;
}

interface Researcher {
  id: string;
  name: string;
  title: string;
  specializations: string[];
  current_projects: string[];
  email: string;
  availability: Record<string, { start: string; end: string }>;
  certifications: string[];
  publications: number;
  h_index: number;
}

interface Dataset {
  id: string;
  name: string;
  size: string;
  type: string;
  access_level: string;
  last_updated: Date;
  contributing_institutions: string[];
  sample_count: number;
  species_covered: number;
}

class M2_3MResearchSystem {
  // Firebase Cloud Functions
  private getProjectStatusFn = httpsCallable(functions, 'getProjectStatus');
  private queryDatasetFn = httpsCallable(functions, 'queryDataset');
  private analyzeQuantumBiologyFn = httpsCallable(functions, 'analyzeQuantumBiology');
  private facilitateCollaborationFn = httpsCallable(functions, 'facilitateCollaboration');
  private predictBreakthroughFn = httpsCallable(functions, 'predictBreakthrough');
  private m2_3mChatFn = httpsCallable(functions, 'm2_3mChat');

  // Real Firebase Firestore operations
  async getProjectStatus(projectId: string, detailLevel: 'summary' | 'full' = 'summary') {
    try {
      const projectRef = doc(db, 'research_projects', projectId);
      const projectSnap = await getDoc(projectRef);
      
      if (!projectSnap.exists()) {
        throw new Error(`Project ${projectId} not found`);
      }

      const project = projectSnap.data() as ResearchProject;
      
      if (detailLevel === 'summary') {
        return {
          id: project.id,
          title: project.title,
          status: project.status,
          progress: project.progress,
          next_milestone: project.next_milestone
        };
      }

      return project;
    } catch (error) {
      console.error('Error fetching project:', error);
      throw error;
    }
  }

  async queryDataset(datasetId: string, queryType: 'summary' | 'detailed' = 'summary') {
    try {
      const datasetRef = doc(db, 'datasets', datasetId);
      const datasetSnap = await getDoc(datasetRef);
      
      if (!datasetSnap.exists()) {
        throw new Error(`Dataset ${datasetId} not found`);
      }

      const dataset = datasetSnap.data() as Dataset;
      
      return {
        id: dataset.id,
        name: dataset.name,
        size: dataset.size,
        type: dataset.type,
        sample_count: dataset.sample_count,
        last_updated: dataset.last_updated
      };
    } catch (error) {
      console.error('Error fetching dataset:', error);
      throw error;
    }
  }

  async analyzeQuantumBiology(sampleData: any) {
    try {
      const result = await this.analyzeQuantumBiologyFn({ sampleData });
      return result.data;
    } catch (error) {
      console.error('Error in quantum biology analysis:', error);
      throw error;
    }
  }

  async facilitateCollaboration(institutionId: string, projectId: string) {
    try {
      const result = await this.facilitateCollaborationFn({ institutionId, projectId });
      return result.data;
    } catch (error) {
      console.error('Error facilitating collaboration:', error);
      throw error;
    }
  }

  async predictBreakthrough(researchArea: string) {
    try {
      const result = await this.predictBreakthroughFn({ researchArea });
      return result.data;
    } catch (error) {
      console.error('Error predicting breakthrough:', error);
      throw error;
    }
  }

  async getAllProjects() {
    try {
      const projectsRef = collection(db, 'research_projects');
      const q = query(projectsRef, orderBy('last_updated', 'desc'));
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error fetching projects:', error);
      throw error;
    }
  }

  async getAllDatasets() {
    try {
      const datasetsRef = collection(db, 'datasets');
      const querySnapshot = await getDocs(datasetsRef);
      
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error fetching datasets:', error);
      throw error;
    }
  }
}

// Main M2-3M Research Flow - Firebase Genkit Integration
export const m2_3mResearchFlow = async (input: {
  query: string;
  context: {
    user_id: string;
    research_area: string;
    priority_level: string;
  };
}) => {
  const system = new M2_3MResearchSystem();
  
  try {
    // Use Firebase Cloud Function for M2-3M AI Chat
    const m2_3mChatFn = httpsCallable(functions, 'm2_3mChat');
    const result = await m2_3mChatFn({
      query: input.query,
      context: input.context,
      timestamp: new Date().toISOString()
    });
    
    return result.data;
    
  } catch (error) {
    console.error('M2-3M Research Flow Error:', error);
    
    // Fallback to local processing if Firebase is unavailable
    const query = input.query.toLowerCase();
    
    if (query.includes('project status')) {
      try {
        const result = await system.getProjectStatus('QBP-2025-001');
        return {
          response: `Project Status: ${result.title} is ${result.status} with ${result.progress}% completion. Next milestone: ${result.next_milestone}`,
          data: result,
          timestamp: new Date()
        };
      } catch (err) {
        return {
          response: "Unable to fetch project status. Please check your connection.",
          error: true,
          timestamp: new Date()
        };
      }
    }
    
    return {
      response: "M2-3M system temporarily unavailable. Please try again later.",
      error: true,
      timestamp: new Date()
    };
  }
};

// Initialize Firebase collections (run once)
export const initializeFirebaseCollections = async () => {
  try {
    const { setDoc } = await import('firebase/firestore');
    
    // Create research projects collection
    await setDoc(doc(db, 'research_projects', 'QBP-2025-001'), {
      title: 'Quantum Biology Evolution Patterns',
      status: 'Active',
      progress: 78,
      lead_researcher: 'Dr. Elena Vasquez',
      team_members: ['dr.elena.vasquez', 'dr.marcus.chen'],
      budget_allocated: 2500000,
      budget_used: 1950000,
      next_milestone: 'Final validation phase',
      collaboration_partners: ['MIT', 'Cambridge', 'Max Planck'],
      created_at: new Date(),
      last_updated: new Date()
    });

    // Create researchers collection
    await setDoc(doc(db, 'researchers', 'dr.elena.vasquez'), {
      name: 'Dr. Elena Vasquez',
      title: 'Lead Quantum Biologist',
      specializations: ['Quantum Biology', 'Consciousness Research', 'Neural Interfaces'],
      current_projects: ['QBP-2025-001', 'CNM-2024-003'],
      email: 'elena.vasquez@telstp.org',
      availability: {
        monday: { start: '09:00', end: '17:00' },
        tuesday: { start: '09:00', end: '17:00' }
      },
      certifications: ['Quantum Physics PhD', 'Neuroscience Certification'],
      publications: 47,
      h_index: 23
    });

    // Create datasets collection
    await setDoc(doc(db, 'datasets', 'QBP-Dataset-Alpha'), {
      name: 'Quantum Biology Primary Dataset',
      size: '15.7 TB',
      type: 'Quantum Coherence Measurements',
      access_level: 'Level 5',
      last_updated: new Date(),
      contributing_institutions: ['TELSTP', 'MIT', 'Cambridge'],
      sample_count: 847,
      species_covered: 234
    });

    console.log('Firebase collections initialized successfully');
  } catch (error) {
    console.error('Error initializing Firebase collections:', error);
  }
};

export { M2_3MResearchSystem };