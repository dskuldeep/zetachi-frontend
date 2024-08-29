import React, { useState } from 'react';
import { ReactFlow, addEdge, Background, applyNodeChanges, applyEdgeChanges, BackgroundVariant } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const initialNodes = [
    // Define your initial nodes and edges here
    {
        id: '1',
        data: { label: 'Lead Qualification' },
        position: { x: 250, y: 5 },
    },
    {
        id: '2',
        data: { label: 'Send Marketing Email' },
        position: { x: 250, y: 100 },
    },
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

export default function App() {
    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);

    const onNodesChange = (changes: any) => setNodes((nds) => applyNodeChanges(changes, nds));
    const onEdgesChange = (changes: any) => setEdges((eds) => applyEdgeChanges(changes, eds));

    const addNode = () => {
        const newNode = {
            id: `${nodes.length + 1}`,
            data: { label: `Node ${nodes.length + 1}` },
            position: { x: Math.random() * 400, y: Math.random() * 400 },
        };
        setNodes((nds) => nds.concat(newNode));
    };

    const onConnect = (params: any) => setEdges((eds) => addEdge(params, eds));

    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <button onClick={addNode}>Add Node</button>
            <ReactFlow 
                nodes={nodes} 
                edges={edges} 
                onNodesChange={onNodesChange} 
                onEdgesChange={onEdgesChange}
                onConnect={onConnect} // Add this prop
            >
                <Background variant={BackgroundVariant.Dots} gap={12} />
            </ReactFlow>
        </div>
    );
}