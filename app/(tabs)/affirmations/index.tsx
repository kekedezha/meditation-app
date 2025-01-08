import { View, Text, ScrollView } from "react-native";
import React from "react";
import AFFIRMATION_GALLERY from "@/constants/affirmation-gallery";
import GuidedAffirmationsGallery from "@/components/GuidedAffirmationsGallery";
import AppGradient from "@/components/AppGradient";

const Page = () => {

  return (
    <View className="flex-1">
      <AppGradient
        colors={["#f6c4ed", "#eccfea", "#e1dae6"]} >
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text className="text-zinc-50 text-3xl font-bold">
            Change your beliefs with affirmations
          </Text>
          <View>
            {AFFIRMATION_GALLERY.map((g) => (
              <GuidedAffirmationsGallery key={g.title} title={g.title} previews={g.data} />
            ))}
          </View>
        </ScrollView>
      </AppGradient>
    </View>
  );
};

export default Page;
