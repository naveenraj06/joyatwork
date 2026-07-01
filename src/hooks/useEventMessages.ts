import { useMemo } from 'react';
import { CelebrationEvent } from '../types';
import { useEmployeeMoments } from '../providers/EmployeeMomentsProvider';

export function useEventMessages(event: CelebrationEvent) {
  const { t } = useEmployeeMoments();

  return useMemo(() => {
    const type = event.type;
    const name = event.name;
    const years = event.years ?? 0;
    const designation = event.designation ?? '';
    const department = event.department ?? '';
    const achievement = event.achievement ?? '';

    const titleText = t(type, { name, years, designation, department, achievement });
    const subText = t(`${type}_sub`, { name, years, designation, department, achievement });

    return {
      title: titleText,
      subtitle: event.customMessage || subText,
    };
  }, [event, t]);
}

export default useEventMessages;
