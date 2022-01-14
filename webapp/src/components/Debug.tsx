import React, { useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Card } from './Elements';

const Debug = () => {
    const [id, setId] = useState<any>(0);
    useEffect(() => {
        axios.post('http://192.168.1.136/setColor', JSON.stringify({ id: parseInt(id), color: 0xff0000 }))
    }, [id])
    return (
        <Card>
            <input type="number" value={id} onChange={(e: any) => setId(e?.target?.value)} />
        </Card>
    )
}

export default Debug;