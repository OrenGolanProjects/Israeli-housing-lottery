import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({ error, errorInfo });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <Paper 
          elevation={3} 
          sx={{ 
            p: 4, 
            m: 2, 
            textAlign: 'center',
            bgcolor: 'error.50',
            border: 2,
            borderColor: 'error.main'
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <AlertTriangle size={48} color="#ef4444" />
            
            <Typography variant="h5" color="error.main" fontWeight={600}>
              משהו השתבש
            </Typography>
            
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 500 }}>
              אירעה שגיאה בלתי צפויה באפליקציה. אנא נסה לרענן את הדף או לחזור מאוחר יותר.
            </Typography>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <Box sx={{ 
                mt: 2, 
                p: 2, 
                bgcolor: 'grey.100', 
                borderRadius: 1, 
                textAlign: 'left',
                fontFamily: 'monospace',
                fontSize: '0.875rem',
                maxWidth: '100%',
                overflow: 'auto'
              }}>
                <Typography variant="body2" fontWeight={600} mb={1}>
                  Error Details (Development):
                </Typography>
                <Typography variant="body2" component="pre" sx={{ whiteSpace: 'pre-wrap' }}>
                  {this.state.error.toString()}
                </Typography>
              </Box>
            )}

            <Button
              variant="contained"
              color="primary"
              startIcon={<RefreshCw />}
              onClick={this.handleReset}
              sx={{ mt: 2 }}
            >
              נסה שוב
            </Button>
          </Box>
        </Paper>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
