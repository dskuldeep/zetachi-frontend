import { useCallback } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Button } from './ui/button';
import { Play } from 'lucide-react';

function TriggerNode() {
    const onChange = useCallback((evt: { target: { value: any; }; }) => {
        console.log(evt.target.value);
    }, []);

    return (
        <div className="bg-white p-4 rounded-md shadow-md border-2 border-gray-200">
            <Button color='green'>Run <Play className='ml-2 w-4 h-4'/></Button>
            
            <Handle style={{ backgroundColor: 'red' }} type="source" position={Position.Right} isConnectable={true}/>
        </div>
        
    )
}

export default TriggerNode;