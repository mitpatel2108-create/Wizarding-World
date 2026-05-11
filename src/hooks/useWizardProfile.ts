// src/hooks/useWizardProfile.ts
// Drop this file into your src/hooks/ folder.
// Provides persistent wizard profile via localStorage.

import { useState, useCallback } from "react";

export type House = "gryffindor" | "slytherin" | "ravenclaw" | "hufflepuff" | null;
export type Patronus =
  | "stag"
  | "otter"
  | "jack-russell-terrier"
  | "phoenix"
  | "doe"
  | "wolf"
  | "hare"
  | "cat"
  | "swan"
  | "dolphin"
  | "fox"
  | "owl"
  | null;

export interface WizardProfile {
  house: House;
  wand: string | null;
  patronus: Patronus;
  magicEarned: number;
  visitedPages: string[];
  sortedAt: string | null;
}

const STORAGE_KEY = "wizarding-world-profile";

const DEFAULT_PROFILE: WizardProfile = {
  house: null,
  wand: null,
  patronus: null,
  magicEarned: 0,
  visitedPages: [],
  sortedAt: null,
};

function loadProfile(): WizardProfile {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROFILE;
    return { ...DEFAULT_PROFILE, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_PROFILE;
  }
}

function saveProfile(profile: WizardProfile): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  } catch {
    // localStorage unavailable — silently fail
  }
}

// Magic rewards for actions
export const MAGIC_REWARDS: Record<string, number> = {
  sorted: 50,
  wand_chosen: 40,
  patronus_revealed: 60,
  visited_hogwarts: 10,
  visited_spells: 10,
  visited_potions: 10,
  visited_dark_arts: 20,
  visited_characters: 10,
  visited_wands: 10,
  visited_houses: 10,
  visited_map: 15,
  spell_page_turned: 5,
};

export function useWizardProfile() {
  const [profile, setProfileState] = useState<WizardProfile>(loadProfile);

  const updateProfile = useCallback((updates: Partial<WizardProfile>) => {
    setProfileState((prev) => {
      const next = { ...prev, ...updates };
      saveProfile(next);
      return next;
    });
  }, []);

  /** Call when user completes sorting hat */
  const setHouse = useCallback(
    (house: House) => {
      const current = loadProfile();
      const alreadySorted = !!current.house;
      updateProfile({
        house,
        sortedAt: new Date().toISOString(),
        magicEarned: alreadySorted
          ? current.magicEarned
          : current.magicEarned + MAGIC_REWARDS.sorted,
      });
    },
    [updateProfile]
  );

  /** Call when user picks a wand */
  const setWand = useCallback(
    (wand: string) => {
      const current = loadProfile();
      const alreadyChosen = !!current.wand;
      updateProfile({
        wand,
        magicEarned: alreadyChosen
          ? current.magicEarned
          : current.magicEarned + MAGIC_REWARDS.wand_chosen,
      });
    },
    [updateProfile]
  );

  /** Call when patronus quiz completes */
  const setPatronus = useCallback(
    (patronus: Patronus) => {
      const current = loadProfile();
      const alreadyRevealed = !!current.patronus;
      updateProfile({
        patronus,
        magicEarned: alreadyRevealed
          ? current.magicEarned
          : current.magicEarned + MAGIC_REWARDS.patronus_revealed,
      });
    },
    [updateProfile]
  );

  /** Call on page mount with a page key from MAGIC_REWARDS */
  const trackPageVisit = useCallback(
    (pageKey: string) => {
      const current = loadProfile();
      if (current.visitedPages.includes(pageKey)) return; // already rewarded
      const reward = MAGIC_REWARDS[`visited_${pageKey}`] ?? 0;
      updateProfile({
        visitedPages: [...current.visitedPages, pageKey],
        magicEarned: current.magicEarned + reward,
      });
    },
    [updateProfile]
  );

  /** Add arbitrary magic (e.g. per spell page turned) */
  const addMagic = useCallback(
    (amount: number) => {
      const current = loadProfile();
      updateProfile({ magicEarned: current.magicEarned + amount });
    },
    [updateProfile]
  );

  /** Full reset */
  const resetProfile = useCallback(() => {
    saveProfile(DEFAULT_PROFILE);
    setProfileState(DEFAULT_PROFILE);
  }, []);

  return {
    profile,
    setHouse,
    setWand,
    setPatronus,
    trackPageVisit,
    addMagic,
    resetProfile,
  };
}
