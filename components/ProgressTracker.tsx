import React from 'react';
import { Check, ClipboardCheck, Settings, Box, UserCheck, ShoppingCart, Wrench, CheckCircle, Rocket } from 'lucide-react';

export interface TrackingStage {
  title: string;
  subTitle: string;
  icon: React.ElementType;
}

export const ORDER_STAGES: TrackingStage[] = [
  { title: 'Verification', subTitle: 'ORDER CHECK', icon: ClipboardCheck },
  { title: 'Processing', subTitle: 'SYSTEM ENTRY', icon: Settings },
  { title: 'Inventory', subTitle: 'STOCK CHECK', icon: Box },
  { title: 'Agent Assign', subTitle: 'STAFFING', icon: UserCheck },
  { title: 'Procurement', subTitle: 'PURCHASING', icon: ShoppingCart },
  { title: 'Setup', subTitle: 'CONFIGURATION', icon: Wrench },
  { title: 'Done', subTitle: 'QUALITY CHECK', icon: CheckCircle },
  { title: 'Activated', subTitle: 'SERVICE LIVE', icon: Rocket },
];

interface ProgressTrackerProps {
  currentStage: number; // 0 to 7
}

export const ProgressTracker: React.FC<ProgressTrackerProps> = ({ currentStage }) => {
  return (
    <div className="w-full py-12 px-4 overflow-x-auto">
      <div className="relative flex justify-between items-start min-w-[800px]">
        {/* Grey Background Line */}
        <div className="absolute top-7 left-0 w-full h-1.5 bg-gray-200 dark:bg-[#330072] -z-10" />
        
        {/* Active Green Progress Line */}
        <div 
          className="absolute top-7 left-0 h-1.5 bg-[#6CBC35] -z-10 transition-all duration-1000 ease-in-out" 
          style={{ width: `${(currentStage / (ORDER_STAGES.length - 1)) * 100}%` }}
        />

        {ORDER_STAGES.map((stage, idx) => {
          const isCompleted = idx < currentStage;
          const isActive = idx === currentStage;
          const Icon = stage.icon;

          return (
            <div key={idx} className="flex flex-col items-center flex-1 group relative">
              {/* Step Circle */}
              <div 
                className={`
                  w-14 h-14 rounded-full flex items-center justify-center transition-all duration-700
                  ${isCompleted ? 'bg-[#008a00] text-white shadow-md' : ''}
                  ${isActive ? 'bg-white dark:bg-[#1a003a] border-[3.5px] border-[#6CBC35] text-[#6CBC35] shadow-[0_0_20px_rgba(108,188,53,0.4)] ring-4 ring-[#6CBC35]/10' : ''}
                  ${!isCompleted && !isActive ? 'bg-white dark:bg-[#250055] border-2 border-gray-200 dark:border-[#4c1d95] text-gray-300 dark:text-gray-600' : ''}
                `}
              >
                {isCompleted ? (
                    <Check className="w-7 h-7 stroke-[3px]" />
                ) : (
                    <Icon className={`w-7 h-7 ${isActive ? 'text-[#6CBC35]' : 'text-current'}`} />
                )}
              </div>
              
              {/* Labels */}
              <div className="mt-5 text-center px-1">
                <p className={`text-sm font-extrabold tracking-tight ${isActive || isCompleted ? 'text-gray-900 dark:text-[#f9fafb]' : 'text-gray-400 dark:text-gray-600'}`}>
                  {stage.title}
                </p>
                <p className={`text-[10px] font-bold tracking-widest mt-1 uppercase ${isActive ? 'text-[#6CBC35]' : 'text-gray-400 dark:text-gray-600'}`}>
                  {stage.subTitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};