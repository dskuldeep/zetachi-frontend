import { useCallback } from 'react';
import { Handle, Position } from '@xyflow/react';

function SearchNode() {
    const onChange = useCallback((evt: { target: { value: any; }; }) => {
        console.log(evt.target.value);
    }, []);

    return (
        <div className="bg-white p-4 rounded-md shadow-md border-2 border-gray-200">
            <Handle style={{ backgroundColor: 'green' }} type="target" position={Position.Left} isConnectable={true}/>
            <div>
            <label htmlFor="text">Search: </label>
            <input id="text" name="text" onChange={onChange} className="nodrag border-2 border-gray-300 rounded-md p-1" />
            </div>
            <Handle style={{ backgroundColor: 'red' }} type="source" position={Position.Right} isConnectable={true}/>
            <span className='text-xs text-gray-400 flex justify-center mt-4'>Search the Web using DuckDuckGo</span>
        </div>
        
    )
}

export default SearchNode;