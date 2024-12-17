import { View, Text } from "react-native";
import React from "react";
import { GalleryPreviewData } from "@/constants/models/AffirmationCategory";

interface GuidedAffirmationsGalleryProps {
  title: string;
  previews: GalleryPreviewData[];
}

const GuidedAffirmationsGallery = ({ title, previews }: GalleryPreviewData) => {
  return (
    <View>
      <Text>GuidedAffirmationsGallery</Text>
    </View>
  );
};

export default GuidedAffirmationsGallery;
