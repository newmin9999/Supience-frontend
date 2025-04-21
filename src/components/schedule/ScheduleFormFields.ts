import { FaCalendarAlt, FaClock, FaUsers } from 'react-icons/fa';
import { FormInputProps } from '@/components/FormInput';
import { MAX_PARTICIPANTS_OPTIONS } from '@/constants/schedule';

export const getScheduleFormFields = (formData: any): FormInputProps[] => [
  {
    label: '제목',
    name: 'title',
    type: 'text',
    value: formData.title,
    required: true,
  },
  {
    label: '시작 시간',
    name: 'startTime',
    type: 'datetime-local',
    value: formData.startTime,
    required: true,
    min: new Date().toISOString().slice(0, 16),
    icon: FaCalendarAlt,
  },
  {
    label: '종료 시간 (선택)',
    name: 'endTime',
    type: 'datetime-local',
    value: formData.endTime,
    required: false,
    min: new Date().toISOString().slice(0, 16),
    icon: FaClock,
    placeholder: '종료 시간을 선택하지 않으면 시작 시간으로 설정됩니다',
  },
  {
    label: '최대 참여 인원',
    name: 'maxParticipants',
    type: 'select',
    value: formData.maxParticipants,
    required: true,
    icon: FaUsers,
    options: MAX_PARTICIPANTS_OPTIONS
  },
  {
    label: '설명',
    name: 'description',
    type: 'textarea',
    value: formData.description,
    required: true,
    rows: 4,
  },
]; 