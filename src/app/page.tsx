'use client';

import React from 'react';
import { ConfigProvider } from '@/context/ConfigContext';
import { ExperienceProvider } from '@/context/ExperienceContext';
import { ExperienceShell } from '@/components/layout/ExperienceShell';

export default function BirthdaySurprisePage() {
  return (
    <ConfigProvider>
      <ExperienceProvider>
        <ExperienceShell />
      </ExperienceProvider>
    </ConfigProvider>
  );
}
