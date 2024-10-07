import { useCallback } from 'react';
import { useReactFlow } from '@xyflow/react';
import { Handle, Position } from '@xyflow/react';
import { Button } from './ui/button';
import { Play } from 'lucide-react';

function TriggerNode({ id }: { id: string }) {
    const { getEdges, getNodes } = useReactFlow();

    const handleRun = useCallback(() => {
        // console.log('Trigger Node Running:', id);
        
        const edges = getEdges().filter(edge => edge.source === id); // Get edges where this node is the source
        
        if (edges.length > 0) {
            edges.forEach(edge => {
                const targetNode = getNodes().find(node => node.id === edge.target);

                if (targetNode && typeof targetNode.data?.run === 'function') {
                    console.log(`Triggering run on connected node: ${targetNode.id}`);
                    targetNode.data.run();  // Call the run method of the connected node
                } else {
                    console.log(`Run function is not available on the target node with id ${edge.target}.`);
                }
            });
        } else {
            console.log('No connected nodes to run.');
        }
    }, [getEdges, getNodes, id]);

    return (
        <div className="bg-white p-4 rounded-md border-2 border-gray-200">
            <Button color="green" onClick={handleRun}>
                Run <Play className="ml-2 w-4 h-4" />
            </Button>
            <Handle style={{ backgroundColor: 'red' }} type="source" position={Position.Right} isConnectable={true} />
        </div>
    );
}

export default TriggerNode;
