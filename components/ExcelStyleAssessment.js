import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { CheckCircle2, AlertCircle, MinusCircle } from 'lucide-react';

const ExcelStyleAssessment = () => {
  const [responses, setResponses] = useState({});
  const [expandedSection, setExpandedSection] = useState(null);

  const sections = {
    environmental: {
      title: "Environmental Materials",
      items: [
        { id: "rohs", name: "RoHS Compliance", required: true },
        { id: "mercury", name: "Mercury Content", required: true },
        { id: "lead", name: "Lead Usage", required: false },
        { id: "battery", name: "Battery Composition", required: false }
      ]
    },
    materials: {
      title: "Materials Selection",
      items: [
        { id: "recycled", name: "Recycled Content", required: true },
        { id: "biobased", name: "Bio-based Material", required: true },
        { id: "weight", name: "Product Weight", required: true }
      ]
    },
    design: {
      title: "Design for End of Life",
      items: [
        { id: "disassembly", name: "Disassembly Instructions", required: true },
        { id: "marking", name: "Component Marking", required: true },
        { id: "hazardous", name: "Hazardous Materials", required: true }
      ]
    }
  };

  const statuses = [
    { value: 'complete', label: 'Complete', color: 'bg-green-100 hover:bg-green-200' },
    { value: 'partial', label: 'In Progress', color: 'bg-yellow-100 hover:bg-yellow-200' },
    { value: 'notStarted', label: 'Not Started', color: 'bg-gray-100 hover:bg-gray-200' }
  ];

  const calculateProgress = () => {
    const total = Object.values(sections).reduce((acc, section) => 
      acc + section.items.filter(item => item.required).length, 0);
    
    const completed = Object.values(responses).filter(r => r === 'complete').length;
    return Math.round((completed / total) * 100);
  };

  const getComplianceStatus = () => {
    const progress = calculateProgress();
    if (progress === 100) return { icon: CheckCircle2, color: 'text-green-600', text: 'Ready for Submission' };
    if (progress >= 60) return { icon: MinusCircle, color: 'text-yellow-600', text: 'In Progress' };
    return { icon: AlertCircle, color: 'text-red-600', text: 'More Work Needed' };
  };

  const status = getComplianceStatus();

  return (
    <div className="max-w-5xl mx-auto p-4">
      <Card className="mb-6">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>EPEAT Assessment Tracker</CardTitle>
            <div className="flex items-center gap-2">
              <status.icon className={`w-6 h-6 ${status.color}`} />
              <span className={`font-medium ${status.color}`}>{status.text}</span>
              <span className="text-sm text-gray-600">({calculateProgress()}% Complete)</span>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="space-y-4">
        {Object.entries(sections).map(([sectionId, section]) => (
          <Card key={sectionId} 
                className={`transition-all duration-200 ${expandedSection === sectionId ? 'ring-2 ring-blue-200' : ''}`}>
            <div className="cursor-pointer p-4 flex justify-between items-center"
                 onClick={() => setExpandedSection(expandedSection === sectionId ? null : sectionId)}>
              <div className="flex items-center gap-2">
                <h3 className="font-medium">{section.title}</h3>
                <span className="text-sm text-gray-600">
                  ({section.items.filter(item => responses[item.id] === 'complete').length}/{section.items.length})
                </span>
              </div>
            </div>

            {expandedSection === sectionId && (
              <CardContent className="border-t">
                <div className="grid gap-2">
                  {section.items.map((item) => (
                    <div key={item.id} 
                         className="grid grid-cols-[1fr,auto] gap-4 items-center p-2 hover:bg-gray-50 rounded-md">
                      <div>
                        <span className="font-medium">{item.name}</span>
                        {item.required && 
                          <span className="ml-2 text-sm text-red-600">*Required</span>
                        }
                      </div>
                      <div className="flex gap-1">
                        {statuses.map((status) => (
                          <Button
                            key={status.value}
                            variant="ghost"
                            className={`px-3 py-1 ${status.color} ${
                              responses[item.id] === status.value ? 'ring-2 ring-blue-500' : ''
                            }`}
                            onClick={() => setResponses(prev => ({
                              ...prev,
                              [item.id]: status.value
                            }))}
                          >
                            {status.label}
                          </Button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ExcelStyleAssessment;
