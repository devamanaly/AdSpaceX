"use client"
import { useState } from 'react';
import axios from 'axios';

// Define the shape of your API response
interface ApiResult {
  message: string;
  timestamp: string;
  environment: string;
}

export default function TestAPI() {
  const [result, setResult] = useState<ApiResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const styles: Record<string, React.CSSProperties> = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
      padding: '20px'
    },
    card: {
      background: 'white',
      padding: '40px',
      borderRadius: '15px',
      boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
      textAlign: 'center',        // ✅ now correctly typed
      maxWidth: '600px',
      width: '100%'
    },
    title: {
      color: '#1a1a2e',
      marginBottom: '30px',
      fontSize: '28px'
    },
    button: {
      background: '#e94560',
      color: 'white',
      border: 'none',
      padding: '15px 40px',
      fontSize: '18px',
      borderRadius: '8px',
      cursor: 'pointer',
      marginBottom: '30px',
      transition: 'all 0.3s',
      opacity: loading ? 0.7 : 1
    },
    error: {
      background: '#ffe6e6',
      color: '#d63031',
      padding: '15px',
      borderRadius: '8px',
      marginBottom: '20px',
      textAlign: 'left'           // ✅ now correctly typed
    },
    success: {
      background: '#e6ffe6',
      padding: '20px',
      borderRadius: '8px',
      marginBottom: '20px',
      textAlign: 'left'           // ✅ now correctly typed
    },
    pre: {
      background: '#f5f5f5',
      padding: '15px',
      borderRadius: '5px',
      overflow: 'auto',
      fontSize: '14px'
    },
    details: {
      background: '#f0f0f0',
      padding: '20px',
      borderRadius: '8px',
      textAlign: 'left'           // ✅ now correctly typed
    }
  };
  
  const testBackend = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
  
    try {
      const response = await axios.get<ApiResult>(`${process.env.NEXT_PUBLIC_API_URL}/api/test`);
      setResult(response.data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || err.message);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>🔗 AdSpaceX API Test</h1>
        
        <button 
          onClick={testBackend} 
          style={styles.button}
          disabled={loading}
        >
          {loading ? '⏳ Testing...' : '🚀 Test Backend Connection'}
        </button>

        {error && (
          <div style={styles.error}>
            <strong>Error:</strong> {error}
          </div>
        )}

        {result && (
          <div style={styles.success}>
            <h3>✅ Backend Response:</h3>
            <pre style={styles.pre}>
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}

        {result && (
          <div style={styles.details}>
            <p><strong>Message:</strong> {result.message}</p>
            <p><strong>Timestamp:</strong> {new Date(result.timestamp).toLocaleString()}</p>
            <p><strong>Environment:</strong> {result.environment}</p>
          </div>
        )}
      </div>
    </div>
  );
}