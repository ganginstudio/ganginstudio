import React, { ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught runtime system error:", error, errorInfo);
    (this as any).setState({ errorInfo });
  }

  private handleRecovery = () => {
    try {
      // Emergency recovery: Clear any legacy legacy browser states and do soft reload
      localStorage.clear();
      window.location.reload();
    } catch (_) {
      window.location.href = window.location.pathname;
    }
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-white flex flex-col justify-center items-center p-8 selection:bg-[#111111] selection:text-white" style={{ fontFamily: '"Inter", sans-serif' }}>
          <div className="max-w-md w-full border border-black p-10 text-left space-y-6">
            <span className="text-[10px] tracking-[0.3em] text-[#e11d48] font-bold block flex items-center gap-1.5 leading-none">
              ● Technical Recovery Active
            </span>
            <div className="space-y-2">
              <h2 className="text-sm font-light uppercase tracking-[0.2em] text-[#111111] leading-relaxed">
                시스템 복구 모드 가동 중
              </h2>
              <p className="text-[11px] font-light text-[#6B6B6B] leading-relaxed tracking-wide">
                포트폴리오 기록 구성 또는 이미지 가공 과정에서 비정상적인 데이터 결함이나 Uncaught 에러가 감지되어 렌더링 무력화 현상을 방지하고자 실시간 안전 수복 프로토콜이 개시되었습니다.
              </p>
            </div>

            {this.state.error && (
              <div className="bg-[#FBFBFB] border border-brand-border/40 p-3 h-20 overflow-y-auto">
                <p className="text-[9px] font-mono text-[#e11d48] leading-tight">
                  {this.state.error.toString()}
                </p>
              </div>
            )}

            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={this.handleRecovery}
                className="w-full py-3 bg-[#111111] hover:bg-black text-white text-[10px] tracking-[0.2em] font-bold uppercase transition-colors text-center cursor-pointer"
              >
                클린 복구 및 대지 리셋 (Clean Recovery)
              </button>
              <button
                type="button"
                onClick={() => {
                  (this as any).setState({ hasError: false, error: null, errorInfo: null });
                  window.location.reload();
                }}
                className="w-full py-2.5 bg-transparent hover:bg-[#F2EFE9]/40 text-[#6B6B6B] hover:text-[#111111] text-[9px] tracking-widest uppercase transition-all text-center cursor-pointer font-light"
              >
                단순 새로고침 시도
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (this as any).props.children;
  }
}
