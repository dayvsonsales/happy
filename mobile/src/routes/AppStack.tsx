import React, { useContext } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import OrphanagesMap from "../pages/OrphanagesMap";
import SelectMapPosition from "../pages/CreateOrphanage/SelectMapPosition";
import OrphanageData from "../pages/CreateOrphanage/OrphanageData";
import OrphanageDetails from "../pages/OrphanageDetails";
import Header from "../components/Header";

import OnboardingMain from "../pages/Onboarding/OnboardingMain";
import OnboardingContext from "../contexts/OnboardingContext";

const Stack = createStackNavigator();

export default function Routes() {
  const { onboardingDone } = useContext(OnboardingContext);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: "#F2F3F5" },
        }}
        initialRouteName="OrphanagesMap"
      >
        {!onboardingDone ? (
          <Stack.Screen name="Onboarding" component={OnboardingMain} />
        ) : (
          <>
            <Stack.Screen name="OrphanagesMap" component={OrphanagesMap} />
            <Stack.Screen
              name="SelectMapPosition"
              component={SelectMapPosition}
              options={{
                headerShown: true,
                header: (props) => (
                  <Header title="Selecione no mapa" {...props} />
                ),
              }}
            />
            <Stack.Screen
              name="OrphanageData"
              component={OrphanageData}
              options={{
                headerShown: true,
                header: (props) => (
                  <Header title="Dados do orfanato" {...props} />
                ),
              }}
            />
            <Stack.Screen
              name="OrphanageDetails"
              component={OrphanageDetails}
              options={{
                headerShown: true,
                header: (props) => (
                  <Header title="Orfanato" showCancel={false} {...props} />
                ),
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
