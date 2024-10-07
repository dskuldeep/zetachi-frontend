import React, { useState } from 'react';
import { ReactFlow, addEdge, Background, applyNodeChanges, applyEdgeChanges, BackgroundVariant, MiniMap, Controls, Node, Edge, Connection, NodeChange, EdgeChange, NodeTypes, NodeProps } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { CirclePlayIcon, SearchIcon, BrainIcon, FileSpreadsheet } from 'lucide-react';
import { Button } from './ui/button';
import SearchNode from './search-node';
import TriggerNode from './trigger-node';
import AgentNode from './agent-node';
import CSVNode from './csv-node';

const nodeTypes: NodeTypes = {
    manualTrigger: TriggerNode,
    search: SearchNode,
    agent: AgentNode,
    generateCSV: CSVNode,
};

const initialNodes: Node[] = [
    {
        id: '1',
        type: 'manualTrigger',
        data: { id: '1', label: 'Manual Trigger' }, // Pass id here
        position: { x: 250, y: 5 },
    },
    {
        id: '2',
        type: 'search',
        data: { id: '2', label: 'Search', searchTerm: '' }, // Pass id here
        position: { x: 250, y: 100 },
    },
    // Add other initial nodes as needed
];

const initialEdges: Edge[] = [{ id: 'e1-2', source: '1', target: '2', animated: true }];

export default function App() {
    const [nodes, setNodes] = useState<Node[]>(initialNodes);
    const [edges, setEdges] = useState<Edge[]>(initialEdges);
    const [selectedNode, setSelectedNode] = useState<Node | null>(null);
    const defaultEdgeOptions = { animated: true };

    const onNodesChange = (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds));
    const onEdgesChange = (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds));
    const onEdgesDelete = (edgesToDelete: Edge[]) => setEdges((eds) => eds.filter((e) => !edgesToDelete.includes(e)));
    const onNodesDelete = (nodesToDelete: Node[]) => {
        setNodes((nds) => nds.filter((n) => !nodesToDelete.includes(n)));
        setEdges((eds) => eds.filter((e) => !nodesToDelete.some((n) => n.id === e.source || n.id === e.target)));
    };

    const addNode = (type: keyof typeof nodeTypes) => {
        const newNodeId = `${nodes.length + 1}`;
        const newNode: Node = {
            id: newNodeId,
            type: type,
            data: { id: newNodeId, label: type }, 
            position: { x: Math.random() * 400, y: Math.random() * 400 },
        };
        setNodes((nds) => nds.concat(newNode));
    };

    const onConnect = (params: Connection | Edge) => {
        const { source, target } = params;
        const hasConnection = edges.some(edge => edge.target === target);

        // Prevent connection if target already has a connection
        if (!hasConnection) {
            setEdges((eds) => addEdge(params, eds));
        } else {
            console.log(`Target node with id ${target} already has a connection.`);
        }
    };

    const handleNodeClick = (_: React.MouseEvent, node: Node) => {
        setSelectedNode(node);
        console.log('Node clicked:', node); // Debugging log
    };

    const handleNodeChange = (id: string, data: any) => {
        setNodes((nds) => nds.map((node) => 
            node.id === id ? { ...node, data, type: node.type } : node // Ensure type is correctly maintained
        ));
    };

    return (
        <div className="w-screen h-screen flex flex-col">
            <div className="toolbar">
                <Button variant="outline" onClick={() => addNode('manualTrigger')}>
                    <CirclePlayIcon className="mr-2 h-4 w-4" />
                    Manual Trigger
                </Button>
                <Button variant="outline" onClick={() => addNode('search')}>
                    <SearchIcon className="mr-2 h-4 w-4" />
                    Search Tool
                </Button>
                <Button variant="outline" onClick={() => addNode('agent')}>
                    <BrainIcon className="mr-2 h-4 w-4" />
                    Agent Node
                </Button>
                <Button variant="outline" onClick={() => addNode('generateCSV')}>
                    <FileSpreadsheet className="mr-2 h-4 w-4" />
                    CSV Tool
                </Button>
            </div>
            <div className="flex-1">
                <ReactFlow 
                    nodes={nodes} 
                    edges={edges} 
                    onNodesChange={onNodesChange} 
                    onEdgesChange={onEdgesChange}
                    onEdgesDelete={onEdgesDelete}
                    onNodesDelete={onNodesDelete}
                    onConnect={onConnect}
                    onNodeClick={handleNodeClick}
                    defaultEdgeOptions={defaultEdgeOptions}
                    nodeTypes={nodeTypes} // Register custom node types here
                    className="h-full" // Ensure ReactFlow takes full height
                >
                    <Background variant={BackgroundVariant.Dots} gap={12} />
                    <MiniMap />
                    <Controls style={{ bottom: '20px' }}/>
                </ReactFlow>
            </div>
        </div>
    );
}

// Use Strict Mode to remove the React Flow text at the bottom