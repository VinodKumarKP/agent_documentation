import React, { useState, useContext } from 'react';
import Layout from '@theme/Layout';
import useBaseUrl from '@docusaurus/useBaseUrl';

import Step1 from '../components/ProjectGenerator/steps/Step1';
import Step2 from '../components/ProjectGenerator/steps/Step2';
import Step3 from '../components/ProjectGenerator/steps/Step3';
import Step3_Mcp from '../components/ProjectGenerator/steps/Step3_Mcp';
import Step4 from '../components/ProjectGenerator/steps/Step4';
import { FormProvider, FormContext } from '../components/ProjectGenerator/components/FormContext';

const AppContent = () => {
  const [step, setStep] = useState(1);
  const { formData } = useContext(FormContext);
  const logoUrl = useBaseUrl('/img/logo.png');

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);
  const goToStep = (stepNumber) => setStep(stepNumber);

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1 nextStep={nextStep} />;
      case 2:
        return <Step2 goToStep={goToStep} prevStep={prevStep} />;
      case 3:
        if (formData.templateType === 'mcp') {
          return <Step3_Mcp goToStep={goToStep} />;
        }
        return <Step3 goToStep={goToStep} />;
      case 4:
        return <Step4 prevStep={prevStep} />;
      default:
        return <Step1 nextStep={nextStep} />;
    }
  };

  const steps = [
    { num: 1, label: 'Details' },
    { num: 2, label: formData.templateType === 'agent' ? 'Agents' : 'Servers' },
    { num: 3, label: 'Configure' },
    { num: 4, label: 'Generate' }
  ];

  return (
    <div className="bg-slate-950 min-h-screen text-slate-200 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="w-full max-w-4xl space-y-8 relative">
        {/* Header Section */}
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-4">
             <div className="p-3 bg-slate-900/50 rounded-3xl shadow-lg ring-1 ring-slate-700/50 backdrop-blur-sm flex items-center justify-center">
                <img src={logoUrl} alt="OAI Logo" className="h-16 w-auto object-contain drop-shadow-xl" />
             </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent pb-2">
            OAI Project Generator
          </h1>
          <p className="text-slate-400 text-lg">Build modern AI architectures in minutes</p>
        </div>

        {/* Progress Bar */}
        <div className="px-4 py-6">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-800 rounded-full overflow-hidden z-0">
               <div 
                  className="h-full bg-gradient-to-r from-sky-500 to-indigo-500 transition-all duration-500 ease-in-out"
                  style={{ width: `${((step - 1) / 3) * 100}%` }}
               />
            </div>
            {steps.map((s, index) => (
              <div key={s.num} className="relative z-10 flex flex-col items-center gap-2 group">
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 shadow-lg ${
                    step >= s.num 
                      ? 'bg-gradient-to-br from-sky-500 to-indigo-600 text-white ring-4 ring-slate-900' 
                      : 'bg-slate-800 text-slate-400 border-2 border-slate-700'
                  } ${step === s.num ? 'ring-4 ring-sky-500/30 scale-110' : ''}`}
                >
                  {step > s.num ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    s.num
                  )}
                </div>
                <span className={`absolute -bottom-7 text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-colors duration-300 ${
                  step >= s.num ? 'text-sky-400' : 'text-slate-500'
                }`}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="bg-slate-800/60 backdrop-blur-xl border border-slate-700/60 rounded-3xl shadow-2xl overflow-hidden mt-12">
          <div className="p-6 md:p-10">
             {renderStep()}
          </div>
        </div>
        
        {/* Footer */}
        <div className="text-center pt-8 text-slate-500 text-sm">
          Copyright © 2026 OAI Agent Development Kit, Capgemini.
        </div>
      </div>
    </div>
  );
};

export default function Generator() {
  return (
    <Layout title="Project Generator" description="Build modern AI architectures in minutes">
      <FormProvider>
        <AppContent />
      </FormProvider>
    </Layout>
  );
}
