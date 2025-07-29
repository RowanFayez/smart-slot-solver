import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { 
  Network, 
  Brain, 
  Layers, 
  GitBranch, 
  Database,
  Cpu,
  ChevronDown,
  ChevronRight
} from "lucide-react";

const AlgorithmBreakdown = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(0);

  const algorithms = [
    {
      name: "Constraint Satisfaction Algorithm",
      icon: Network,
      description: "Uses CSP techniques to find optimal solutions within defined constraints",
      complexity: "O(d^n)",
      details: [
        "Backtracking with forward checking",
        "Arc consistency preprocessing", 
        "Domain reduction techniques",
        "Conflict-directed backjumping"
      ]
    },
    {
      name: "Hungarian Assignment Algorithm",
      icon: GitBranch,
      description: "Optimally assigns participants to time slots minimizing total cost",
      complexity: "O(n³)",
      details: [
        "Bipartite graph matching",
        "Cost matrix optimization",
        "Augmenting path detection",
        "Minimum weight assignment"
      ]
    },
    {
      name: "Genetic Algorithm Optimizer",
      icon: Brain,
      description: "Evolutionary approach for complex multi-constraint scenarios",
      complexity: "O(g × p × f)",
      details: [
        "Population-based search",
        "Crossover and mutation operators",
        "Fitness function optimization",
        "Elite selection strategy"
      ]
    },
    {
      name: "Graph Coloring Algorithm",
      icon: Layers,
      description: "Models scheduling as graph coloring for conflict-free assignments",
      complexity: "O(V × E)",
      details: [
        "Vertex conflict detection",
        "Greedy coloring heuristics",
        "Backtracking refinement",
        "Chromatic number optimization"
      ]
    }
  ];

  const dataStructures = [
    { name: "Priority Queues", usage: "Event scheduling and deadline management" },
    { name: "Hash Tables", usage: "Fast availability lookup and conflict detection" },
    { name: "Adjacency Lists", usage: "Modeling participant relationships and dependencies" },
    { name: "Red-Black Trees", usage: "Maintaining sorted time slots and efficient insertions" }
  ];

  return (
    <section className="py-20 bg-gradient-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Algorithm Architecture
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Deep dive into the computational intelligence powering our scheduling system
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
          {/* Algorithm Selection */}
          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Cpu className="h-5 w-5 mr-2" />
                Core Algorithms
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {algorithms.map((algorithm, index) => (
                <div 
                  key={index}
                  className={`p-4 rounded-lg border cursor-pointer transition-all duration-300 hover:shadow-md ${
                    selectedAlgorithm === index ? 
                    'bg-primary/10 border-primary/30 shadow-md' : 
                    'hover:bg-muted/50'
                  }`}
                  onClick={() => setSelectedAlgorithm(index)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        selectedAlgorithm === index ? 'bg-primary text-primary-foreground' : 'bg-muted'
                      }`}>
                        <algorithm.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="font-medium">{algorithm.name}</div>
                        <div className="text-sm text-muted-foreground">
                          Complexity: <code className="bg-muted px-1 rounded">{algorithm.complexity}</code>
                        </div>
                      </div>
                    </div>
                    {selectedAlgorithm === index ? 
                      <ChevronDown className="h-4 w-4" /> : 
                      <ChevronRight className="h-4 w-4" />
                    }
                  </div>
                  
                  {selectedAlgorithm === index && (
                    <div className="mt-4 animate-fade-in">
                      <p className="text-sm text-muted-foreground mb-3">{algorithm.description}</p>
                      <div className="space-y-1">
                        {algorithm.details.map((detail, detailIndex) => (
                          <div key={detailIndex} className="flex items-center text-sm">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                            {detail}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Data Structures & Performance */}
          <div className="space-y-6">
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Database className="h-5 w-5 mr-2" />
                  Data Structures
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {dataStructures.map((structure, index) => (
                  <div 
                    key={index}
                    className="p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="font-medium text-sm">{structure.name}</div>
                    <div className="text-xs text-muted-foreground">{structure.usage}</div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Average Resolution Time</span>
                    <Badge variant="secondary">{`< 200ms`}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Conflict Detection Rate</span>
                    <Badge variant="secondary">99.9%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Scalability</span>
                    <Badge variant="secondary">10K+ participants</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Memory Efficiency</span>
                    <Badge variant="secondary">O(n log n)</Badge>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-3">Algorithm Selection Logic</h4>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <div>• <strong>Small groups ({`<`}50):</strong> Hungarian Algorithm</div>
                    <div>• <strong>Medium groups (50-500):</strong> CSP with heuristics</div>
                    <div>• <strong>Large groups ({`>`}500):</strong> Genetic Algorithm</div>
                    <div>• <strong>Real-time updates:</strong> Graph Coloring</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AlgorithmBreakdown;