export const INITIAL_FORM_DATA = {
  title: '',
  description: '',
  startTime: '',
  endTime: '',
  maxParticipants: 0 // 0은 제한 없음을 의미
};

export const MAX_PARTICIPANTS_OPTIONS = [
  { value: 0, label: '제한 없음' },
  ...Array.from({ length: 30 }, (_, i) => ({
    value: i + 1,
    label: `${i + 1}명`
  }))
]; 