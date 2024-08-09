// components/LoadingSpinner.tsx
import { ClipLoader } from 'react-spinners';

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-full w-full">
      <ClipLoader size={70} color={"#000"} loading={true} speedMultiplier={0.7}/>
    </div>
  );
}