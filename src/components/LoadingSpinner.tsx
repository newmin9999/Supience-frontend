export default function LoadingSpinner() {
  return (
    <div className="text-center py-8">
      <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
      <p className="mt-2 text-gray-500">로딩 중...</p>
    </div>
  );
} 