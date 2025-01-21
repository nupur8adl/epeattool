import React, { useState, useCallback } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { AlertCircle, CheckCircle2, MinusCircle } from 'lucide-react';

const AssessmentTool = () => {
  const [docStatus, setDocStatus] = useState({});
  const [selfRating, setSelfRating] = useState({});
  const [risks, setRisks] = useState([]);
  const [activeTab, setActiveTab] = useState('documentation');

  const documentationOptions = [
    { value: 'complete', label: 'Complete & Ready', desc: 'No extra work needed' },
    { value: 'partial', label: 'Partial', desc: 'Needs some additional gathering' },
    { value: 'notStarted', label: 'Not Started', desc: 'Requires full preparation' },
    { value: 'notApplicable', label: 'Not Applicable', desc: 'Not required' }
  ];

  const documentSections = {
    environmentalMaterials: {
      title: "Environmental Materials Documentation",
      items: [
        { name: "RoHS Compliance (Required)", desc: "Test reports and supplier declarations showing compliance" },
        { name: "Cadmium Content", desc: "Documentation of no added cadmium" },
        { name: "Mercury in Light Sources (Required)", desc: "Mercury content reporting and documentation" },
        { name: "Lead Usage", desc: "Documentation of lead elimination in specified applications" },
        { name: "Hexavalent Chromium", desc: "Documentation of chromium elimination" },
        { name: "SCCP Flame Retardants (Required)", desc: "Documentation showing no SCCP flame retardants" },
        { name: "Battery Composition", desc: "Documentation of battery material content" },
        { name: "PVC Content", desc: "Documentation of PVC content in large plastic parts" }
      ]
    },
    materialSelection: {
      title: "Materials Selection Documentation",
      items: [
        { name: "Recycled Content Declaration (Required)", desc: "Documentation of recycled plastic content" },
        { name: "Bio-based Material Declaration (Required)", desc: "Documentation of renewable/bio-based content" },
        { name: "Product Weight Declaration (Required)", desc: "Documentation of product weight" },
        { name: "Recyclability Documentation", desc: "Evidence of recyclability percentage" }
      ]
    },
    designEndOfLife: {
      title: "Design for End of Life Documentation",
      items: [
        { name: "Special Handling Documentation (Required)", desc: "Materials requiring special handling" },
        { name: "Coating Compatibility (Required)", desc: "Paint/coating recycling compatibility" },
        { name: "Disassembly Instructions (Required)", desc: "External enclosure disassembly" },
        { name: "Component Marking (Required)", desc: "Plastic component marking documentation" },
        { name: "Hazardous Materials (Required)", desc: "Hazardous component identification" }
      ]
    },
    productLongevity: {
      title: "Product Longevity Documentation",
      items: [
        { name: "Warranty Documentation (Required)", desc: "Three-year warranty details" },
        { name: "Upgrade Documentation (Required)", desc: "Common tools upgrade instructions" },
        { name: "Modular Design", desc: "Documentation of modular components" },
        { name: "Replacement Parts", desc: "Spare parts availability documentation" }
      ]
    },
    energyConservation: {
      title: "Energy Conservation Documentation",
      items: [
        { name: "Energy Star Certification (Required)", desc: "ENERGY STAR compliance documentation" },
        { name: "Renewable Energy", desc: "Documentation of renewable energy options" }
      ]
    },
    endOfLife: {
      title: "End of Life Management Documentation",
      items: [
        { name: "Take-back Service (Required)", desc: "Product take-back program documentation" },
        { name: "Battery Take-back (Required)", desc: "Battery recycling program documentation" },
        { name: "Recycling Vendor Audits", desc: "Recycling vendor certification documentation" }
      ]
    },
    corporatePerformance: {
      title: "Corporate Performance Documentation",
      items: [
        { name: "ISO 14001 Policy (Required)", desc: "Environmental management system documentation" },
        { name: "Environmental Management (Required)", desc: "Self-certified system documentation" },
        { name: "Corporate Reporting (Required)", desc: "Environmental performance reporting" }
      ]
    },
    packaging: {
      title: "Packaging Documentation",
      items: [
        { name: "Packaging Toxics (Required)", desc: "Reduced toxics documentation" },
        { name: "Material Separation (Required)", desc: "Separable materials documentation" },
        { name: "Recycled Content (Required)", desc: "Recycled content declaration" },
        { name: "Take-back Program", desc: "Packaging take-back documentation" }
      ]
    }
  };

  const selfRatingSections = {
    materialContent: {
      title: "Material Content",
      description: "Rate your material compliance and documentation status",
      items: [
        {
          name: "RoHS Compliance Status",
          desc: "Level of RoHS testing and documentation completion",
          example: "Example: Score 4 for full RoHS testing completion, 0 for no testing started"
        },
        {
          name: "Mercury Content Documentation",
          desc: "Status of mercury content documentation and control",
          example: "Example: Score 5 for comprehensive mercury documentation, 2 for partial records"
        },
        {
          name: "Flame Retardant Compliance",
          desc: "Level of flame retardant documentation and testing",
          example: "Example: Score 0 if flame retardant documentation hasn't been started"
        },
        {
          name: "Material Declaration Completeness",
          desc: "Overall status of material content documentation",
          example: "Example: Score 4 for full RoHS but 0 for flame retardants shows varying completion"
        }
      ]
    },
    designFeatures: {
      title: "Design Features",
      description: "Rate your product's design for sustainability features",
      items: [
        {
          name: "Design for Recycling Features",
          desc: "How well product is designed for end-of-life recycling",
          example: "Example: Score 4 if product can be easily disassembled"
        },
        {
          name: "Durability Measures",
          desc: "Design features that enhance product longevity",
          example: "Example: Score 3 for standard durability features"
        },
        {
          name: "Repair Accessibility",
          desc: "Ease of product repair and maintenance",
          example: "Example: Score 2 for limited repair options"
        },
        {
          name: "Warranty Coverage",
          desc: "Comprehensiveness of warranty protection",
          example: "Example: Score 4 for strong warranty but 2 for limited serviceability"
        }
      ]
    },
    manufacturingProcesses: {
      title: "Manufacturing Processes",
      description: "Rate your manufacturing process controls and systems",
      items: [
        {
          name: "Energy Management System",
          desc: "System for monitoring and optimizing energy usage",
          example: "Example: Score 5 for certified system, 2 for basic consumption tracking"
        },
        {
          name: "Water Conservation Measures",
          desc: "Programs and systems for water usage reduction",
          example: "Example: Score 5 for comprehensive water recycling, 2 for basic monitoring"
        },
        {
          name: "Waste Reduction Programs",
          desc: "Initiatives to minimize manufacturing waste",
          example: "Example: Score 5 for zero-waste program, 2 for basic waste handling"
        },
        {
          name: "Chemical Handling Procedures",
          desc: "Protocols for safe chemical management",
          example: "Example: Score 5 for advanced tracking system, 2 for basic procedures"
        }
      ]
    },
    performanceStandards: {
      title: "Performance Standards",
      description: "Rate your quality and performance monitoring systems",
      items: [
        {
          name: "Efficiency Measurements",
          desc: "Systems for measuring and tracking efficiency",
          example: "Example: Score 5 for comprehensive efficiency testing, 2 for basic metrics"
        },
        {
          name: "Quality Control Processes",
          desc: "Procedures for ensuring product quality",
          example: "Example: Score 2 for limited quality control systems"
        },
        {
          name: "Testing Procedures",
          desc: "Methods for product testing and validation",
          example: "Example: Score 5 for comprehensive test protocols, 2 for basic testing"
        },
        {
          name: "Performance Documentation",
          desc: "Performance data management systems",
          example: "Example: Score 5 for comprehensive testing but 2 for limited quality control"
        }
      ]
    }
  };

  const criticalRisks = [
    { id: 'testingGaps', label: 'Missing or incomplete test capabilities' },
    { id: 'staffShortages', label: 'Critical personnel gaps' },
    { id: 'resourceLimits', label: 'Significant resource constraints' },
    { id: 'technicalIssues', label: 'Major technical challenges' }
  ];

  const renderDocumentSection = (key, section) => (
    <Card key={key} className="mb-6">
      <CardHeader>
        <CardTitle>{section.title}</CardTitle>
      </CardHeader>
      <CardContent>
        {section.items.map((item, idx) => (
          <div key={idx} className="mb-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-medium">{item.name}</h4>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
              <div className="flex gap-2">
                {documentationOptions.map((option) => (
                  <Button
                    key={option.value}
                    variant={docStatus[`${key}-${idx}`] === option.value ? "default" : "outline"}
                    className="whitespace-nowrap"
                    onClick={() => {
                      setDocStatus(prev => ({
                        ...prev,
                        [`${key}-${idx}`]: option.value
                      }));
                    }}
                    title={option.desc}
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );

  const renderSelfRatingGuide = () => (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Self-Rating Scale Guide</CardTitle>
        <CardDescription>Rate your implementation level using this 0-5 scale</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {[
            {
              score: 0,
              title: "Not Implemented",
              desc: ["No work started", "No documentation exists", "No processes in place"]
            },
            {
              score: 1,
              title: "Initial Planning",
              desc: ["Basic planning started", "Some documentation drafted", "Initial discussions held"]
            },
            {
              score: 2,
              title: "Partial Implementation",
              desc: ["Some work completed", "Basic documentation exists", "Some processes established"]
            },
            {
              score: 3,
              title: "Mostly Implemented",
              desc: ["Most work completed", "Most documentation ready", "Most processes working"]
            },
            {
              score: 4,
              title: "Fully Implemented",
              desc: ["All requirements met", "All documentation complete", "All processes functioning"]
            },
            {
              score: 5,
              title: "Exceeds Requirements",
              desc: ["Goes beyond requirements", "Extra documentation provided", "Advanced processes in place"]
            }
          ].map((level) => (
            <div key={level.score} className="p-4 border rounded-lg">
              <h3 className="font-bold mb-2">{level.score} - {level.title}</h3>
              <ul className="list-disc pl-5">
                {level.desc.map((point, idx) => (
                  <li key={idx} className="text-sm text-gray-600">{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  const renderSelfRatingSection = (key, section) => (
    <Card key={key} className="mb-6">
      <CardHeader>
        <CardTitle>{section.title}</CardTitle>
      </CardHeader>
      <CardContent>
        {section.items.map((item, idx) => (
          <div key={idx} className="mb-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-medium">{item.name}</h4>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
              <div className="flex gap-1">
                {[0, 1, 2, 3, 4, 5].map((score) => (
                  <Button
                    key={score}
                    variant={selfRating[`${key}-${idx}`] === score ? "default" : "outline"}
                    className="w-10 h-10"
                    onClick={() => {
                      setSelfRating(prev => ({
                        ...prev,
                        [`${key}-${idx}`]: score
                      }));
                    }}
                  >
                    {score}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );

  const calculateScores = useCallback(() => {
    // Calculate documentation score
    const docTotal = Object.values(docStatus).filter(v => v === 'complete').length;
    const docApplicable = Object.values(docStatus).filter(v => v !== 'notApplicable').length;
    const docScore = docApplicable > 0 ? (docTotal / docApplicable) * 100 : 0;

    // Calculate self-rating score
    const ratingValues = Object.values(selfRating);
    const ratingScore = ratingValues.length > 0 
      ? (ratingValues.reduce((a, b) => a + b, 0) / ratingValues.length) * 20 
      : 0;

    return {
      docScore,
      ratingScore,
      overall: (docScore + ratingScore) / 2
    };
  }, [docStatus, selfRating]);

  const makeDecision = useCallback(() => {
    const scores = calculateScores();
    const minScore = Math.min(scores.docScore, scores.ratingScore);

    if (scores.overall >= 60 && minScore >= 50 && risks.length === 0) {
      return {
        decision: 'GO',
        color: 'text-green-600',
        icon: CheckCircle2,
        explanation: 'Ready for EPEAT certification submission'
      };
    } else if (scores.overall >= 40 && minScore >= 40 && risks.length <= 1) {
      return {
        decision: 'DEFER',
        color: 'text-yellow-600',
        icon: MinusCircle,
        explanation: 'Additional preparation needed before submission'
      };
    } else {
      return {
        decision: 'NO-GO',
        color: 'text-red-600',
        icon: AlertCircle,
        explanation: 'Significant improvements required before submission'
      };
    }
  }, [calculateScores, risks.length]);

  const decision = makeDecision();
  const scores = calculateScores();

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>EPEAT Manufacturer Self-Assessment Tool</CardTitle>
          <CardDescription>
            Evaluate your readiness for EPEAT certification by assessing your current status across all required areas.
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="documentation">Documentation</TabsTrigger>
          <TabsTrigger value="selfRating">Self Rating</TabsTrigger>
          <TabsTrigger value="risks">Risks</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
        </TabsList>

        <TabsContent value="documentation">
          {Object.entries(documentSections).map(([key, section]) => 
            renderDocumentSection(key, section)
          )}
        </TabsContent>

        <TabsContent value="selfRating">
          {renderSelfRatingGuide()}
          {Object.entries(selfRatingSections).map(([key, section]) => 
            renderSelfRatingSection(key, section)
          )}
        </TabsContent>

        <TabsContent value="risks">
          <Card>
            <CardHeader>
              <CardTitle>Critical Risk Assessment</CardTitle>
              <CardDescription>Identify any critical risks that could impact certification</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-2">
                {criticalRisks.map(risk => (
                  <Button
                    key={risk.id}
                    variant={risks.includes(risk.id) ? "default" : "outline"}
                    className="justify-start"
                    onClick={() => {
                      setRisks(prev => 
                        prev.includes(risk.id) 
                          ? prev.filter(id => id !== risk.id)
                          : [...prev, risk.id]
                      );
                    }}
                  >
                    {risk.label}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="results">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <h2 className="text-xl font-bold mb-4">Assessment Results</h2>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <h3 className="font-semibold mb-2">Documentation Status</h3>
                    <div className="text-3xl font-bold">{Math.round(scores.docScore)}%</div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Implementation Level</h3>
                    <div className="text-3xl font-bold">{Math.round(scores.ratingScore)}%</div>
                  </div>
                </div>
                <div className={`text-2xl font-bold ${decision.color} flex items-center justify-center gap-2`}>
                  <decision.icon className="w-6 h-6" />
                  <span>{decision.decision}</span>
                </div>
                <div className="mt-2 text-gray-600">{decision.explanation}</div>
                {risks.length > 0 && (
                  <div className="mt-4 text-red-600">
                    Critical Risks Identified: {risks.length}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AssessmentTool;
