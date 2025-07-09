import { ParaType } from '@/utils/supabase/api/project';

export const getParaTypeFromParamValue = (paramParaType: string): ParaType => {
  if (paramParaType === 'projects') return 'project';
  else if (paramParaType === 'areas') return 'area';
  else if (paramParaType === 'resources') return 'resource';
  return 'archive';
};
