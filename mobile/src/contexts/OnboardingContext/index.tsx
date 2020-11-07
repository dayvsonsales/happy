import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

interface OnboardContextProps {
  onboardingDone: Boolean;
  updateOnboardingDone(value: Boolean): Promise<void>;
}

const OnboardingContext = createContext<OnboardContextProps>(
  {} as OnboardContextProps
);

export const OnboardingProvider: React.FC = ({ children }) => {
  const [onboardingDone, setOnboardingDone] = useState<Boolean>(false);

  async function updateOnboardingDone(value: Boolean) {
    await AsyncStorage.setItem("onboardingDone", JSON.stringify(value));
    setOnboardingDone(value);
  }

  useEffect(() => {
    async function checkOnboarding() {
      const done = await AsyncStorage.getItem("onboardingDone");

      setOnboardingDone(JSON.parse(done as string));
    }

    checkOnboarding();
  }, []);

  return (
    <OnboardingContext.Provider
      value={{ onboardingDone, updateOnboardingDone }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

export function useOnboardingContext() {
  const context = useContext(OnboardingContext);

  return context;
}

export default OnboardingContext;
