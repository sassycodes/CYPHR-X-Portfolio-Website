"use client";

import { lazy, Suspense } from "react";

const Spline = lazy(() => import("@splinetool/react-spline"));

export default function SplineScene() {
    return (
        <Suspense
            fallback={
                <div className="w-full h-full flex items-center justify-center">
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-8 h-8 border-2 border-zinc-800 border-t-zinc-400 rounded-full animate-spin" />
                        <span className="font-mono text-xs text-zinc-600 tracking-wider">
                            LOADING_3D_SCENE...
                        </span>
                    </div>
                </div>
            }
        >
            <Spline
                scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode"
                className="w-full h-full"
            />
        </Suspense>
    );
}
