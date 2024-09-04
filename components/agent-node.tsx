import { useCallback } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Textarea } from './ui/textarea'; // Import the Textarea component

function AgentNode() {
    const onChange = useCallback((evt: { target: { value: any; }; }) => {
        console.log(evt.target.value);
    }, []);

    return (
        <div className="bg-white p-4 rounded-md shadow-md border-2 border-gray-200">
            <Handle style={{ backgroundColor: 'green' }} type="target" position={Position.Left} isConnectable={true}/>
            <div>
                <label htmlFor="role">Role</label>
                <Textarea id="role" name="role" onChange={onChange} className="nodrag border-2 border-gray-300 rounded-md p-1 w-full" placeholder="Enter role" />
            </div>
            <br />
            <div>
                <label htmlFor="prompt">Prompt</label>
                <Textarea id="prompt" name="prompt" onChange={onChange} className="nodrag border-2 border-gray-300 rounded-md p-1 w-full" placeholder="Enter prompt" />
            </div>
            <Handle style={{ backgroundColor: 'red' }} type="source" position={Position.Right} isConnectable={true}/>
            <span className='text-xs text-gray-400 flex justify-center mt-4'>Agent: Llama 3.1 8b</span>
        </div>
    )
}

export default AgentNode;