import { View, Text, ScrollView } from "react-native";
import React from "react";
import AFFIRMATION_GALLERY from "@/constants/affirmation-gallery";
import GuidedAffirmationsGallery from "@/components/GuidedAffirmationsGallery";
import AppGradient from "@/components/AppGradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Page = () => {

  return (
    <View className="flex-1">
      <AppGradient
        colors={["#2e1f5a", "#54426b", "#a790af"]} >
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
