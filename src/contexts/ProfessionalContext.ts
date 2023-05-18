import { Professional } from '@/types';
import { createContext } from 'react';

const ProfessionalContext = createContext<Professional>({} as Professional);

export default ProfessionalContext;
