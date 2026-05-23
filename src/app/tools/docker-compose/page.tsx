"use client";

import { useState, useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Badge } from "@/components/ui/Badge";
import { 
  DockerService, 
  generateDockerComposeYaml, 
  COMMON_TEMPLATES,
  DockerPort,
  DockerEnvVar,
  DockerVolume
} from "@/utils/dockerUtils";

// Helper for generating unique IDs
const generateId = () => Math.random().toString(36).substring(2, 9);

export default function DockerComposePage() {
  const [services, setServices] = useState<DockerService[]>([]);
  const [yamlOutput, setYamlOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [activeServiceId, setActiveServiceId] = useState<string | null>(null);

  // Update YAML whenever services change
  useEffect(() => {
    setYamlOutput(generateDockerComposeYaml(services));
  }, [services]);

  const addService = (templateKey?: keyof typeof COMMON_TEMPLATES) => {
    const id = generateId();
    if (templateKey) {
      const template = COMMON_TEMPLATES[templateKey];
      setServices([...services, {
        id,
        name: `${template.name}_${generateId().substring(0, 4)}`,
        image: template.image,
        ports: template.ports.map(p => ({ ...p, id: generateId() })),
        environment: template.environment.map(e => ({ ...e, id: generateId() })),
        volumes: template.volumes.map(v => ({ ...v, id: generateId() })),
        depends_on: []
      }]);
    } else {
      setServices([...services, {
        id,
        name: `service_${generateId().substring(0, 4)}`,
        image: 'alpine:latest',
        ports: [],
        environment: [],
        volumes: [],
        depends_on: []
      }]);
    }
    setActiveServiceId(id);
  };

  const removeService = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setServices(services.filter(s => s.id !== id));
    if (activeServiceId === id) {
      setActiveServiceId(null);
    }
  };

  const updateService = (id: string, updates: Partial<DockerService>) => {
    setServices(services.map(s => s.id === id ? { ...s, ...updates } : s));
  };

  const activeService = services.find(s => s.id === activeServiceId);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(yamlOutput);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const downloadYaml = () => {
    const blob = new Blob([yamlOutput], { type: "text/yaml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "docker-compose.yml";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <AppLayout mainClassName="relative" fullWidth={true}>
      <div className="mx-auto max-w-[1400px] px-6 pt-10 pb-20 flex flex-col min-h-[calc(100vh-80px)]">
        <div className="mb-8 flex flex-col justify-start items-start gap-2">
          <Badge variant="info" className="mb-2 bg-blue-500/10 text-blue-400 border-blue-500/20">YAML Builder</Badge>
          <h1 className="text-3xl font-black text-white mb-2 tracking-tight">
            Docker Compose Architect
          </h1>
          <p className="text-gray-400 max-w-2xl">
            Visually design your containerized infrastructure. Drag, drop, and configure services to instantly generate a valid <code className="text-blue-300">docker-compose.yml</code> file entirely in your browser.
          </p>
        </div>

        <div className="flex-1 grid lg:grid-cols-12 gap-6 h-[700px] min-h-[700px]">
          
          {/* Left Column: Services List */}
          <div className="lg:col-span-3 bg-[#121214] border border-white/10 rounded-2xl flex flex-col overflow-hidden">
            <div className="p-4 border-b border-white/10 bg-black/40">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Add Template</h2>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={() => addService('postgres')} className="py-2 px-3 text-xs font-bold bg-white/5 hover:bg-blue-500/20 text-gray-300 hover:text-blue-400 rounded-lg transition-colors border border-white/5 hover:border-blue-500/30 flex items-center justify-center">PostgreSQL</button>
                <button onClick={() => addService('redis')} className="py-2 px-3 text-xs font-bold bg-white/5 hover:bg-red-500/20 text-gray-300 hover:text-red-400 rounded-lg transition-colors border border-white/5 hover:border-red-500/30 flex items-center justify-center">Redis</button>
                <button onClick={() => addService('node')} className="py-2 px-3 text-xs font-bold bg-white/5 hover:bg-green-500/20 text-gray-300 hover:text-green-400 rounded-lg transition-colors border border-white/5 hover:border-green-500/30 flex items-center justify-center">Node.js</button>
                <button onClick={() => addService('nginx')} className="py-2 px-3 text-xs font-bold bg-white/5 hover:bg-emerald-500/20 text-gray-300 hover:text-emerald-400 rounded-lg transition-colors border border-white/5 hover:border-emerald-500/30 flex items-center justify-center">Nginx</button>
              </div>
              <button onClick={() => addService()} className="w-full mt-2 py-2 px-3 text-xs font-bold bg-white/5 hover:bg-white/10 text-white rounded-lg transition-colors border border-white/10 flex items-center justify-center gap-2">
                + Custom Service
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2">
              {services.length === 0 ? (
                <div className="text-sm text-gray-500 text-center mt-10">No services added yet.</div>
              ) : (
                services.map(service => (
                  <div 
                    key={service.id}
                    onClick={() => setActiveServiceId(service.id)}
                    className={`p-3 rounded-xl border cursor-pointer transition-colors group flex justify-between items-center ${
                      activeServiceId === service.id 
                        ? 'bg-blue-500/10 border-blue-500/50' 
                        : 'bg-black/40 border-white/5 hover:border-white/20 hover:bg-white/5'
                    }`}
                  >
                    <div className="flex flex-col overflow-hidden">
                      <span className={`text-sm font-bold truncate ${activeServiceId === service.id ? 'text-blue-400' : 'text-gray-300'}`}>
                        {service.name}
                      </span>
                      <span className="text-xs text-gray-500 truncate">{service.image}</span>
                    </div>
                    <button 
                      onClick={(e) => removeService(service.id, e)}
                      className="text-gray-600 hover:text-red-400 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Middle Column: Configuration Editor */}
          <div className="lg:col-span-5 bg-[#121214] border border-white/10 rounded-2xl flex flex-col overflow-hidden">
            {activeService ? (
              <div className="flex-1 overflow-y-auto flex flex-col">
                <div className="p-6 border-b border-white/10 bg-black/20 flex flex-col gap-4">
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase block mb-1">Service Name</label>
                    <input 
                      type="text" 
                      value={activeService.name} 
                      onChange={(e) => updateService(activeService.id, { name: e.target.value })}
                      className="w-full bg-black/60 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500/50"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase block mb-1">Image Name</label>
                    <input 
                      type="text" 
                      value={activeService.image} 
                      onChange={(e) => updateService(activeService.id, { image: e.target.value })}
                      className="w-full bg-black/60 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500/50 font-mono"
                    />
                  </div>
                  
                  {services.length > 1 && (
                    <div>
                      <label className="text-xs font-bold text-gray-400 uppercase block mb-2">Depends On</label>
                      <div className="flex flex-wrap gap-2">
                        {services.filter(s => s.id !== activeService.id).map(s => {
                          const isDependent = activeService.depends_on.includes(s.id);
                          return (
                            <button
                              key={s.id}
                              onClick={() => {
                                const newDepends = isDependent 
                                  ? activeService.depends_on.filter(id => id !== s.id)
                                  : [...activeService.depends_on, s.id];
                                updateService(activeService.id, { depends_on: newDepends });
                              }}
                              className={`px-3 py-1 text-xs font-bold rounded-full border transition-colors ${
                                isDependent 
                                  ? 'bg-blue-500/20 text-blue-300 border-blue-500/50' 
                                  : 'bg-black/40 text-gray-500 border-white/10 hover:border-white/30 hover:text-gray-300'
                              }`}
                            >
                              {s.name}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* Ports */}
                <div className="p-6 border-b border-white/10">
                  <div className="flex justify-between items-center mb-4">
                    <label className="text-sm font-bold text-white flex items-center gap-2">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M6 8h.01"/><path d="M10 8h.01"/><path d="M14 8h.01"/><path d="M18 8h.01"/><path d="M8 12h8"/><path d="M10 16h4"/></svg>
                      Ports
                    </label>
                    <button 
                      onClick={() => updateService(activeService.id, { ports: [...activeService.ports, { id: generateId(), host: '8080', container: '80' }] })}
                      className="text-xs text-blue-400 hover:text-blue-300 font-bold"
                    >+ Add Port</button>
                  </div>
                  <div className="flex flex-col gap-2">
                    {activeService.ports.map((port, idx) => (
                      <div key={port.id} className="flex gap-2 items-center">
                        <input 
                          type="text" 
                          value={port.host}
                          onChange={(e) => {
                            const newPorts = [...activeService.ports];
                            newPorts[idx].host = e.target.value;
                            updateService(activeService.id, { ports: newPorts });
                          }}
                          className="flex-1 bg-black/40 border border-white/5 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500/50 font-mono"
                          placeholder="Host"
                        />
                        <span className="text-gray-600">:</span>
                        <input 
                          type="text" 
                          value={port.container}
                          onChange={(e) => {
                            const newPorts = [...activeService.ports];
                            newPorts[idx].container = e.target.value;
                            updateService(activeService.id, { ports: newPorts });
                          }}
                          className="flex-1 bg-black/40 border border-white/5 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500/50 font-mono"
                          placeholder="Container"
                        />
                        <button 
                          onClick={() => updateService(activeService.id, { ports: activeService.ports.filter(p => p.id !== port.id) })}
                          className="text-gray-600 hover:text-red-400 p-1"
                        ><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg></button>
                      </div>
                    ))}
                    {activeService.ports.length === 0 && <span className="text-xs text-gray-600 italic">No ports exposed</span>}
                  </div>
                </div>

                {/* Environment Variables */}
                <div className="p-6 border-b border-white/10">
                  <div className="flex justify-between items-center mb-4">
                    <label className="text-sm font-bold text-white flex items-center gap-2">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-400"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                      Environment Variables
                    </label>
                    <button 
                      onClick={() => updateService(activeService.id, { environment: [...activeService.environment, { id: generateId(), key: 'KEY', value: 'value' }] })}
                      className="text-xs text-blue-400 hover:text-blue-300 font-bold"
                    >+ Add Env Var</button>
                  </div>
                  <div className="flex flex-col gap-2">
                    {activeService.environment.map((env, idx) => (
                      <div key={env.id} className="flex gap-2 items-center">
                        <input 
                          type="text" 
                          value={env.key}
                          onChange={(e) => {
                            const newEnv = [...activeService.environment];
                            newEnv[idx].key = e.target.value;
                            updateService(activeService.id, { environment: newEnv });
                          }}
                          className="flex-1 bg-black/40 border border-white/5 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500/50 font-mono"
                          placeholder="KEY"
                        />
                        <span className="text-gray-600">=</span>
                        <input 
                          type="text" 
                          value={env.value}
                          onChange={(e) => {
                            const newEnv = [...activeService.environment];
                            newEnv[idx].value = e.target.value;
                            updateService(activeService.id, { environment: newEnv });
                          }}
                          className="flex-1 bg-black/40 border border-white/5 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500/50 font-mono"
                          placeholder="value"
                        />
                        <button 
                          onClick={() => updateService(activeService.id, { environment: activeService.environment.filter(e => e.id !== env.id) })}
                          className="text-gray-600 hover:text-red-400 p-1"
                        ><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg></button>
                      </div>
                    ))}
                    {activeService.environment.length === 0 && <span className="text-xs text-gray-600 italic">No environment variables</span>}
                  </div>
                </div>

                {/* Volumes */}
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <label className="text-sm font-bold text-white flex items-center gap-2">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-400"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
                      Volumes
                    </label>
                    <button 
                      onClick={() => updateService(activeService.id, { volumes: [...activeService.volumes, { id: generateId(), host: './data', container: '/data' }] })}
                      className="text-xs text-blue-400 hover:text-blue-300 font-bold"
                    >+ Add Volume</button>
                  </div>
                  <div className="flex flex-col gap-2">
                    {activeService.volumes.map((vol, idx) => (
                      <div key={vol.id} className="flex gap-2 items-center">
                        <input 
                          type="text" 
                          value={vol.host}
                          onChange={(e) => {
                            const newVol = [...activeService.volumes];
                            newVol[idx].host = e.target.value;
                            updateService(activeService.id, { volumes: newVol });
                          }}
                          className="flex-1 bg-black/40 border border-white/5 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500/50 font-mono"
                          placeholder="./host-path"
                        />
                        <span className="text-gray-600">:</span>
                        <input 
                          type="text" 
                          value={vol.container}
                          onChange={(e) => {
                            const newVol = [...activeService.volumes];
                            newVol[idx].container = e.target.value;
                            updateService(activeService.id, { volumes: newVol });
                          }}
                          className="flex-1 bg-black/40 border border-white/5 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500/50 font-mono"
                          placeholder="/container-path"
                        />
                        <button 
                          onClick={() => updateService(activeService.id, { volumes: activeService.volumes.filter(v => v.id !== vol.id) })}
                          className="text-gray-600 hover:text-red-400 p-1"
                        ><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg></button>
                      </div>
                    ))}
                    {activeService.volumes.length === 0 && <span className="text-xs text-gray-600 italic">No volumes mapped</span>}
                  </div>
                </div>

              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-6 text-center bg-black/20">
                <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">No Service Selected</h3>
                <p className="text-sm text-gray-400 max-w-sm">
                  Select a service from the left sidebar or add a new one to start configuring ports, environments, and volumes.
                </p>
              </div>
            )}
          </div>

          {/* Right Column: Output YAML */}
          <div className="lg:col-span-4 bg-[#121214] border border-white/10 rounded-2xl flex flex-col overflow-hidden relative group">
            <div className="pointer-events-none absolute right-[-10%] top-[-10%] h-[50%] w-[50%] rounded-full bg-blue-500/10 blur-[80px] transition-all group-hover:bg-blue-500/20" />
            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-black/40 z-10">
              <span className="text-sm font-bold text-gray-300 font-mono">docker-compose.yml</span>
              <div className="flex gap-2">
                <button 
                  onClick={copyToClipboard}
                  className="p-2 bg-white/5 hover:bg-white/10 rounded text-gray-400 hover:text-white transition-colors"
                  title="Copy YAML"
                >
                  {copied ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-emerald-400"><polyline points="20 6 9 17 4 12"></polyline></svg> : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path></svg>}
                </button>
                <button 
                  onClick={downloadYaml}
                  className="p-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 rounded text-blue-300 transition-colors"
                  title="Download File"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                </button>
              </div>
            </div>
            <div className="flex-1 bg-black/60 p-4 overflow-hidden flex flex-col z-10">
              <textarea 
                readOnly
                value={yamlOutput}
                className="flex-1 w-full bg-transparent text-blue-300/90 font-mono text-xs resize-none focus:outline-none whitespace-pre leading-relaxed"
              />
            </div>
          </div>

        </div>
      </div>
    </AppLayout>
  );
}
