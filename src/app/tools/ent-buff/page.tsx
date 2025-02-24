


// 'use client';

import { useEffect, useState, Suspense } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation'


import EntBuff from '../../../components/ent-buff';
type Option = { id: string, name: string, group: string, description: string, points: number, max: number, per: number, stats: number, statsText: string, checked: boolean }

export default function Page() {

    function SuspenseFallback() {
        return <>placeholder</>
    }

    return (
        <Suspense fallback={<SuspenseFallback />}>
            <div className="w-full mx-auto max-w-7xl p-5">
                <EntBuff />
            </div>
        </Suspense>
    )
}