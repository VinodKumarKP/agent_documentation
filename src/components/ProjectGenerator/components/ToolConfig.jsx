import React, { useContext } from 'react';
import { FormContext } from './FormContext';
import TextInput from './TextInput';

const ToolConfig = () => {
  const { formData, setFormData } = useContext(FormContext);

  if (!formData.useTools) return null;

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, tool_list: e.target.value }));
  };

  return (
    <div className="space-y-4 p-4 border border-slate-700 rounded-md">
      <h3 className="text-lg font-medium text-sky-400">Tool Configuration</h3>
      <TextInput
        label="Tool Names (comma-separated)"
        name="tool_list"
        value={formData.tool_list}
        onChange={handleChange}
      />
    </div>
  );
};

export default ToolConfig;
