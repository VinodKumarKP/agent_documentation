import React, { useContext } from 'react';
import { FormContext } from './FormContext';
import TextInput from './TextInput';

const SkillConfig = () => {
  const { formData, setFormData } = useContext(FormContext);

  if (!formData.useSkills) return null;

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, skill_list: e.target.value }));
  };

  return (
    <div className="space-y-4 p-4 border border-slate-700 rounded-md">
      <h3 className="text-lg font-medium text-sky-400">Skill Configuration</h3>
      <TextInput
        label="Skill Names (comma-separated)"
        name="skill_list"
        value={formData.skill_list}
        onChange={handleChange}
      />
    </div>
  );
};

export default SkillConfig;
