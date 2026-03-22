import React from 'react';
import TextInput from './TextInput';

const EnvVarsConfig = ({ envVars, onEnvVarChange }) => {
  const handleEnvChange = (index, field, value) => {
    const newEnvVars = [...envVars];
    newEnvVars[index][field] = value;
    onEnvVarChange(newEnvVars);
  };

  const addEnvVar = () => {
    onEnvVarChange([...envVars, { key: '', value: '' }]);
  };

  const removeEnvVar = (index) => {
    const newEnvVars = envVars.filter((_, i) => i !== index);
    onEnvVarChange(newEnvVars);
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-slate-300">Environment Variables</label>
      {envVars.map((env, index) => (
        <div key={index} className="flex items-end gap-2">
          <div className="flex-grow">
            <TextInput
              label={index === 0 ? 'Key' : ''}
              name={`env-key-${index}`}
              value={env.key}
              onChange={(e) => handleEnvChange(index, 'key', e.target.value)}
              placeholder="e.g., API_KEY"
            />
          </div>
          <div className="flex-grow">
            <TextInput
              label={index === 0 ? 'Value' : ''}
              name={`env-value-${index}`}
              value={env.value}
              onChange={(e) => handleEnvChange(index, 'value', e.target.value)}
              placeholder="e.g., sk-..."
            />
          </div>
          <button
            type="button"
            onClick={() => removeEnvVar(index)}
            className="p-2.5 bg-slate-800/50 hover:bg-red-500/20 text-slate-400 hover:text-red-400 rounded-xl border border-slate-700 transition-colors"
            title="Remove Variable"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6" />
            </svg>
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addEnvVar}
        className="w-full flex items-center justify-center gap-2 p-2.5 border-2 border-dashed border-slate-700 hover:border-sky-500/50 hover:bg-sky-500/5 text-slate-400 hover:text-sky-400 rounded-xl font-medium transition-all duration-300"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Add Environment Variable
      </button>
    </div>
  );
};

export default EnvVarsConfig;
