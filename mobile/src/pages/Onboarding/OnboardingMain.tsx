import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { View, Image, TouchableOpacity } from "react-native";

import Onboarding, { DotProps } from "react-native-onboarding-swiper";

const Advance = ({ ...props }) => (
  <TouchableOpacity onPress={props.onPress}>
    <View
      style={{
        flex: 1,
        width: 64,
        height: 64,
        backgroundColor: "#D1EDF2",
        borderRadius: 20,
        marginRight: 42,
        bottom: 10,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image
        style={{ width: 24, height: 24 }}
        source={require("../../../assets/onboarding/link.png")}
      />
    </View>
  </TouchableOpacity>
);

const Square = ({ selected }: DotProps) => {
  let backgroundColor;

  backgroundColor = selected ? "#FFD152" : "#BECFD8";

  return (
    <View
      style={{
        left: -130,
        width: selected ? 18 : 10,
        height: 4,
        borderRadius: 4,
        marginHorizontal: 3,
        backgroundColor,
      }}
    />
  );
};

const OnboardingMain: React.FC = () => {
  async function onDone() {
    await AsyncStorage.setItem("onboardingDone", "true");
  }

  return (
    <Onboarding
      bottomBarColor="#CEDEE5"
      showSkip={false}
      DotComponent={Square}
      onDone={onDone}
      NextButtonComponent={Advance}
      DoneButtonComponent={Advance}
      containerStyles={{
        flex: 1,
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: 30,
      }}
      imageContainerStyles={{
        padding: 2,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
      titleStyles={{
        color: "#0089A5",
        fontWeight: "bold",
        fontSize: 48,
        fontFamily: "Nunito_800ExtraBold",
        textAlign: "justify",
        lineHeight: 52,
      }}
      subTitleStyles={{
        color: "#5C8599",
        fontSize: 20,
        fontFamily: "Nunito_600SemiBold",
        textAlign: "justify",
      }}
      pages={[
        {
          backgroundColor: "#CEDEE5",
          image: (
            <Image source={require("../../../assets/onboarding/01.png")} />
          ),
          title: "Leve\nfelicidade\npara o\nmundo",
          subtitle: "Visite orfanatos e mude o\ndia de muitas crianças.",
        },
        {
          backgroundColor: "#CEDEE5",
          image: (
            <Image source={require("../../../assets/onboarding/02.png")} />
          ),
          title: "Escolha um orfanato no mapa e faça uma visita",
          subtitle: "",
          titleStyles: {
            color: "#0089A5",
            fontWeight: "bold",
            fontSize: 32,
            fontFamily: "Nunito_800ExtraBold",
            textAlign: "right",
            lineHeight: 36,
            paddingLeft: 20,
          },
        },
      ]}
    />
  );
};

export default OnboardingMain;
