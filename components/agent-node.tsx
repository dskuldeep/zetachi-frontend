import { useCallback, useEffect } from 'react';
import { Handle, Position, useReactFlow } from '@xyflow/react';
import { Textarea } from './ui/textarea'; // Import the Textarea component

function AgentNode({ id, data }: { id: string; data: any }) {
    const { getEdges, getNodes } = useReactFlow();

    const onChange = useCallback((evt: { target: { value: any } }) => {
        console.log(evt.target.value);
        // Update data if needed
    }, []);

    const run = useCallback((context_data?: String) => {
        // console.log('Agent Node Running:', id);
        console.log('Data:', data);
        console.log('Context Data:', context_data);

        // Find the edges where this node is the source
        const edges = getEdges().filter(edge => edge.source === id);

        // Trigger the run function on each target node
        edges.forEach(edge => {
            const targetNode = getNodes().find(node => node.id === edge.target);
            if (targetNode && typeof targetNode.data?.run === 'function') {
                targetNode.data.run();
            } else {
                console.log(`Run function is not available on the target node with id ${edge.target}.`);
            }
        });
    }, [id, data, getEdges, getNodes]);

    useEffect(() => {
        if (data) {
            data.run = run; // Attach run to the data object
        }
    }, [data, run]);

    return (
        <div className="bg-white p-4 rounded-md shadow-md border-2 border-gray-200">
            <Handle style={{ backgroundColor: 'green' }} type="target" position={Position.Left} isConnectable={true} />
            <div>
                <label htmlFor="role">Role</label>
                <Textarea id="role" name="role" onChange={onChange} className="nodrag border-2 border-gray-300 rounded-md p-1 w-full" placeholder="Enter role" />
            </div>
            <br />
            <div>
                <label htmlFor="prompt">Prompt</label>
                <Textarea id="prompt" name="prompt" onChange={onChange} className="nodrag border-2 border-gray-300 rounded-md p-1 w-full" placeholder="Enter prompt" />
            </div>
            <Handle style={{ backgroundColor: 'red' }} type="source" position={Position.Right} isConnectable={true} />
            <span className='text-xs text-gray-400 flex justify-center mt-4'>Agent: Llama 3.1 8b</span>
        </div>
    );
}

export default AgentNode;
