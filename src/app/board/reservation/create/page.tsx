'use client';

import { useRouter } from 'next/navigation';
import FormInput from '@/components/FormInput';
import { useScheduleForm } from '@/hooks/useScheduleForm';
import { getScheduleFormFields } from '@/components/schedule/ScheduleFormFields';

export default function CreateSchedulePage() {
  const router = useRouter();
  const { formData, loading, error, handleSubmit, handleChange } = useScheduleForm();
  const formFields = getScheduleFormFields(formData);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-500">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8">
          <div className="space-y-6">
            {formFields.map((field) => (
              <FormInput
                key={field.name}
                {...field}
                onChange={handleChange}
              />
            ))}

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => router.push('/board/reservation')}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                disabled={loading}
              >
                취소
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
                disabled={loading}
              >
                {loading ? '등록 중...' : '등록하기'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
} 