import { useCallback } from 'react';
import { Handle, Position } from '@xyflow/react';

function CSVNode() {
    const onChange = useCallback((evt: { target: { value: any; }; }) => {
        console.log(evt.target.value);
    }, []);

    return (
        <div className="bg-white p-4 rounded-md shadow-md border-2 border-gray-200">
            <Handle style={{ backgroundColor: 'green' }} type="target" position={Position.Left} isConnectable={true}/>
            <div>
            <label htmlFor="text">Generate CSV</label>
            </div>
            <Handle style={{ backgroundColor: 'red' }} type="source" position={Position.Right} isConnectable={true}/>
        </div>
        
    )
}

export default CSVNode;