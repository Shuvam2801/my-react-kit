import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface JsonRendererParams {
  client_id: string;
  [key: string]: string;
}

export const JsonRenderer: React.FC = () => {
  const { client_id } = useParams<JsonRendererParams>();
  const [jsonData, setJsonData] = useState<any>(null); // Use appropriate type

  useEffect(() => {
    const fetchJsonData = async () => {
      try {
        const res = await fetch(`/${client_id}.json`);
        const data = await res.json();
        setJsonData(data);
      } catch (e) {
        const res = await fetch(`/default.json`);
        const data = await res.json();
        setJsonData(data);
      }
    };
    fetchJsonData();
  }, [client_id]);

  return (
    <>
      {jsonData && (
        <code>
          <pre className="code-format">{JSON.stringify(jsonData, null, 2)}</pre>
        </code>
      )}
    </>
  );
};

