'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { BirthdayConfig } from '@/types/config.types';
import { DEFAULT_BIRTHDAY_CONFIG } from '@/config/birthday.defaults';
import { validateBirthdayConfig, mergeWithDefaults } from '@/config/birthday.schema';

const STORAGE_KEY = 'bday_customizer_config';

export interface ConfigContextValue {
  config: BirthdayConfig;
  updateConfig: (newConfig: BirthdayConfig) => void;
  resetConfig: () => void;
  exportConfigJSON: () => string;
  importConfigJSON: (jsonString: string) => { success: boolean; errors?: string[] };
  isCustomized: boolean;
}

export const ConfigContext = createContext<ConfigContextValue | null>(null);

export function ConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<BirthdayConfig>(DEFAULT_BIRTHDAY_CONFIG);
  const [isCustomized, setIsCustomized] = useState(false);

  // Initialize from client localStorage if available
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        const result = validateBirthdayConfig(parsed);
        if (result.isValid && result.validatedConfig) {
          setConfig(result.validatedConfig);
          setIsCustomized(true);
        }
      }
    } catch {
      // Fallback cleanly to default
    }
  }, []);

  const updateConfig = useCallback((newConfig: BirthdayConfig) => {
    const validated = mergeWithDefaults(newConfig);
    setConfig(validated);
    setIsCustomized(true);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(validated));
    } catch {
      // Ignore storage write errors
    }
  }, []);

  const resetConfig = useCallback(() => {
    setConfig(DEFAULT_BIRTHDAY_CONFIG);
    setIsCustomized(false);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore storage remove errors
    }
  }, []);

  const exportConfigJSON = useCallback((): string => {
    return JSON.stringify(config, null, 2);
  }, [config]);

  const importConfigJSON = useCallback((jsonString: string) => {
    try {
      const parsed = JSON.parse(jsonString);
      const validation = validateBirthdayConfig(parsed);
      if (!validation.isValid || !validation.validatedConfig) {
        return { success: false, errors: validation.errors };
      }
      updateConfig(validation.validatedConfig);
      return { success: true };
    } catch (err) {
      return {
        success: false,
        errors: [(err as Error).message || 'Invalid JSON syntax.'],
      };
    }
  }, [updateConfig]);

  return (
    <ConfigContext.Provider
      value={{
        config,
        updateConfig,
        resetConfig,
        exportConfigJSON,
        importConfigJSON,
        isCustomized,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
}

export function useBirthdayConfig(): BirthdayConfig {
  const context = useContext(ConfigContext);
  if (!context) {
    return DEFAULT_BIRTHDAY_CONFIG;
  }
  return context.config;
}

export function useConfigController(): ConfigContextValue {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error('useConfigController must be used within a <ConfigProvider>');
  }
  return context;
}
