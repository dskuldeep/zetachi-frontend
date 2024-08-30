import React, { useState } from 'react';
import { ReactFlow, addEdge, Background, applyNodeChanges, applyEdgeChanges, BackgroundVariant } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const initialNodes = [
    // Define your initial nodes and edges here
    {
        id: '1',
        data: { label: 'Node 1' },
        position: { x: 250, y: 5 },
    },
    {
        id: '2',
        data: { label: 'Node 2' },
        position: { x: 250, y: 100 },
    },
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

export default function App() {
    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);

    const onNodesChange = (changes: any) => setNodes((nds) => applyNodeChanges(changes, nds));
    const onEdgesChange = (changes: any) => setEdges((eds) => applyEdgeChanges(changes, eds));
    const onEdgesDelete = (edgesToDelete: any) => setEdges((eds) => eds.filter((e) => !edgesToDelete.includes(e)));
    const onNodesDelete = (nodesToDelete: any) => {
        setNodes((nds) => nds.filter((n) => !nodesToDelete.includes(n)));
        setEdges((eds) => eds.filter((e) => !nodesToDelete.some((n: any) => n.id === e.source || n.id === e.target)));
    };

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
                onEdgesDelete={onEdgesDelete} // Add this prop
                onNodesDelete={onNodesDelete} // Add this prop
                onConnect={onConnect}
            >
                <Background variant={BackgroundVariant.Dots} gap={12} />
            </ReactFlow>
        </div>
    );
}