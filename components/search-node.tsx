import { useCallback, useEffect } from 'react';
import { Handle, Position, useReactFlow } from '@xyflow/react';

function SearchNode({ id, data }: { id: string; data: any }) {
    const { getEdges, getNodes } = useReactFlow();

    const onChange = useCallback((evt: { target: { value: any } }) => {
        data.searchTerm = evt.target.value;
    }, [data]);

    // Define the run function
    const run = useCallback(() => {
        // console.log('Search Node Running:', id);
        console.log('Search Term:', data.searchTerm);

        // Find the edges where this node is the source
        const edges = getEdges().filter(edge => edge.source === id);

        // Trigger the run function on each target node
        edges.forEach(edge => {
            const targetNode = getNodes().find(node => node.id === edge.target);
            if (targetNode && typeof targetNode.data?.run === 'function') {
                targetNode.data.run(data.searchTerm);
            } else {
                console.log(`Run function is not available on the target node with id ${edge.target}.`);
            }
        });
    }, [id, data, getEdges, getNodes]);

    // Use useEffect to ensure that run is updated in data
    useEffect(() => {
        if (data) {
            data.run = run; // Attach run to the data object
        }
    }, [data, run]);

    return (
        <div className="bg-white p-4 rounded-md shadow-md border-2 border-gray-200">
            <Handle style={{ backgroundColor: 'green' }} type="target" position={Position.Left} isConnectable={true} />
            <div>
                <label htmlFor="text">Search: </label>
                <input id="text" name="text" onChange={onChange} className="nodrag border-2 border-gray-300 rounded-md p-1" />
            </div>
            <Handle style={{ backgroundColor: 'red' }} type="source" position={Position.Right} isConnectable={true} />
            <span className="text-xs text-gray-400 flex justify-center mt-4">Search the Web using DuckDuckGo</span>
        </div>
    );
}

export default SearchNode;
